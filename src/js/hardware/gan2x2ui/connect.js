/**
 * gan2x2UI — connexion Web Bluetooth au GAN 251 UI (2×2).
 *
 * Events : `connect` | `move` | `gyro` | `facelets` | `battery` | `disconnect` | `error`
 */

import { createSession, SERVICE, CHAR_RX, CHAR_TX, CHAR_TX_ALT, toHex } from "./crypto.js";
import { decodePacket, encodeCommand } from "./ble_protocol.js";
import { Cube2x2 } from "./cube2x2.js";
import { GAN_COMPANY_IDS, resolveMac } from "./mac.js";

/**
 * @typedef {object} ConnectOptions
 * @property {string|Uint8Array} [mac]  MAC Bluetooth — optionnel si auto via advertisements
 * @property {boolean} [autoMac=true]  Si pas de `mac`, lit manufacturer data (flag Chrome experimental)
 * @property {number} [macTimeoutMs=10000]  Timeout watchAdvertisements
 * @property {boolean} [cacheMac=true]  Persiste MAC dans localStorage
 * @property {boolean} [resetOnConnect=true]  RESET firmware + modèle local = résolu
 * @property {boolean} [requestFacelets=true]  Demande FACELETS si pas de reset
 * @property {boolean} [preferAltTx=false]  Écrire sur FFF7 au lieu de FFF5
 * @property {BluetoothDevice} [device]  Device déjà choisi (sinon `requestDevice`)
 * @property {AbortSignal} [signal]
 */

function emit(listeners, type, payload) {
  for (const fn of listeners.get(type) || []) {
    try {
      fn(payload);
    } catch (err) {
      console.error(`[gan2x2ui] listener "${type}"`, err);
    }
  }
}

export class Gan2x2UI {
  /**
   * Ouvre le picker Bluetooth puis initialise GATT + crypto.
   * Doit être appelé depuis un geste utilisateur (Chrome).
   * @param {ConnectOptions} opts
   * @returns {Promise<Gan2x2UI>}
   */
  static async connect(opts = {}) {
    if (!navigator.bluetooth) {
      throw new Error("Web Bluetooth indisponible — Chrome / Edge desktop requis");
    }

    const optionalServices = [
      SERVICE,
      "0000fee0-0000-1000-8000-00805f9b34fb",
      "generic_access",
      "device_information",
      "battery_service",
    ];

    const device =
      opts.device ||
      (await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices,
        optionalManufacturerData: GAN_COMPANY_IDS,
      }));

    const resolved = await resolveMac(device, {
      mac: opts.mac,
      autoMac: opts.autoMac,
      macTimeoutMs: opts.macTimeoutMs,
      signal: opts.signal,
      cache: opts.cacheMac !== false,
    });

    const cube = new Gan2x2UI(device, { ...opts, mac: resolved.mac });
    cube.macSource = resolved.source;
    await cube._init();
    return cube;
  }

  /**
   * @param {BluetoothDevice} device
   * @param {ConnectOptions} opts
   */
  constructor(device, opts) {
    this.device = device;
    this.opts = opts;
    if (!opts.mac) throw new Error("opts.mac requis (passe par Gan2x2UI.connect pour l'auto)");
    this.session = createSession(opts.mac);
    /** @type {string} */
    this.mac = [...this.session.mac].map((b) => b.toString(16).padStart(2, "0")).join(":");
    /** @type {'opts'|'advertisement'|'name'|'cache'|null} */
    this.macSource = null;
    this.cube = new Cube2x2();
    this.listeners = new Map();
    this.lastSerial = -1;
    this.battery = null;
    /** @type {object|null} dernier quaternion GAN */
    this.gyro = null;
    /**
     * Si `false`, les MOVE n'appellent pas `cube.applyMove`
     * (utile pendant un scramble piloté par l'UI).
     */
    this.applyMoves = true;
    /** @type {null | ((face: number, direction: number, rawMove: string) => string)} */
    this.remapMove = null;

    this._chars = new Map();
    this._txUuid = opts.preferAltTx ? CHAR_TX_ALT : CHAR_TX;
    this._writeChain = Promise.resolve();
    this._gyroRing = [];
    this._gyroRingMax = 40;
    this._faceletsReqAt = 0;
  }

  /** Nom annoncé BLE */
  get deviceName() {
    return this.device?.name || "";
  }

  /**
   * @param {'connect'|'move'|'gyro'|'facelets'|'battery'|'disconnect'|'error'|'*'} type
   * @param {Function} fn
   * @returns {() => void} unsubscribe
   */
  on(type, fn) {
    if (!this.listeners.has(type)) this.listeners.set(type, new Set());
    this.listeners.get(type).add(fn);
    return () => this.listeners.get(type).delete(fn);
  }

  /**
   * @param {'FACELETS'|'BATTERY'|'HARDWARE'|'RESET'} type
   */
  async send(type) {
    const run = async () => {
      const ch = this._chars.get(this._txUuid.toLowerCase());
      if (!ch) throw new Error("TX characteristic introuvable: " + this._txUuid);
      const ct = encodeCommand(type, this.session.key, this.session.iv);
      if (ch.properties.writeWithoutResponse) await ch.writeValueWithoutResponse(ct);
      else await ch.writeValueWithResponse(ct);
      return ct;
    };
    const p = this._writeChain.then(run, run);
    this._writeChain = p.catch(() => {});
    return p;
  }

  /** Déclare l'orientation physique actuelle comme résolu (cmd RESET + modèle). */
  async markSolved() {
    await this.send("RESET");
    this.cube.reset();
    this.lastSerial = -1;
    emit(this.listeners, "facelets", {
      type: "FACELETS",
      serial: 0,
      CP: this.cube.cp.slice(),
      CO: this.cube.co.slice(),
      solved: true,
      state: this.cube,
      via: "reset",
    });
    return this;
  }

  async disconnect() {
    if (this.device?.gatt?.connected) this.device.gatt.disconnect();
  }

  // —— internal ——

  async _init() {
    this.device.addEventListener("gattserverdisconnected", () => {
      emit(this.listeners, "disconnect", {});
    });

    let server;
    for (let attempt = 1; attempt <= 5; attempt++) {
      try {
        server = await this.device.gatt.connect();
        break;
      } catch (err) {
        if (attempt === 5) throw err;
        await new Promise((r) => setTimeout(r, 700));
      }
    }

    for (const svc of await server.getPrimaryServices()) {
      for (const ch of await svc.getCharacteristics()) {
        this._chars.set(ch.uuid.toLowerCase(), ch);
        if (ch.properties.notify) {
          ch.addEventListener("characteristicvaluechanged", (ev) => this._onNotify(ev));
          await ch.startNotifications();
        }
      }
    }

    try {
      await this.send("FACELETS");
    } catch {
      this._txUuid = CHAR_TX_ALT;
      await this.send("FACELETS").catch(() => {});
    }

    if (this.opts.resetOnConnect !== false) {
      await this.markSolved();
    } else if (this.opts.requestFacelets !== false) {
      await this.send("FACELETS").catch(() => {});
    }

    emit(this.listeners, "connect", {
      name: this.deviceName,
      mac: this.mac,
      macSource: this.macSource,
      key: toHex(this.session.key),
      solved: this.cube.isSolved(),
    });
  }

  _onNotify(ev) {
    const ct = new Uint8Array(ev.target.value.buffer);
    let pkt;
    try {
      pkt = decodePacket(ct, this.session.key, this.session.iv);
    } catch (err) {
      emit(this.listeners, "error", { error: err, ct: toHex(ct) });
      return;
    }

    if (pkt.type === "GYRO") {
      this.gyro = pkt.quaternion;
      this._gyroRing.push({
        t: performance.now(),
        vx: pkt.vx,
        vy: pkt.vy,
        vz: pkt.vz,
        q: { ...pkt.quaternion },
      });
      if (this._gyroRing.length > this._gyroRingMax) this._gyroRing.shift();
      emit(this.listeners, "gyro", pkt);
      return;
    }

    if (pkt.type === "MOVE") {
      if (pkt.serial === this.lastSerial) return;
      this.lastSerial = pkt.serial;

      const hwMove = pkt.move;
      let move = hwMove;
      if (this.remapMove && pkt.face >= 0) {
        const remapped = this.remapMove(pkt.face, pkt.direction, hwMove);
        if (remapped && remapped !== "?") move = remapped;
      }

      // Firmware 251 UI : MOVE = axes U/R/F uniquement (comme CubeStation).
      if (move && move !== "?" && this.applyMoves) {
        this.cube.applyMove(move);
      }

      const tNow = performance.now();
      const gyroLast = this._gyroRing[this._gyroRing.length - 1] || null;
      emit(this.listeners, "move", {
        ...pkt,
        hwMove,
        move,
        via: "onehot",
        gyroLast,
        gyroAround: this._gyroRing.filter((g) => Math.abs(g.t - tNow) < 80),
        q: gyroLast?.q || this.gyro,
        solved: this.cube.isSolved(),
        state: this.cube,
      });

      this._requestFaceletsThrottled();
      return;
    }

    if (pkt.type === "FACELETS") {
      if (this.lastSerial < 0) this.lastSerial = pkt.serial;
      this.cube.setFromFacelets(pkt.CP, pkt.CO);
      emit(this.listeners, "facelets", {
        ...pkt,
        solved: this.cube.isSolved(),
        state: this.cube,
      });
      return;
    }

    if (pkt.type === "BATTERY") {
      this.battery = pkt.level;
      emit(this.listeners, "battery", pkt);
      return;
    }

    emit(this.listeners, "packet", pkt);
  }

  _requestFaceletsThrottled() {
    const now = performance.now();
    if (now - this._faceletsReqAt < 250) return;
    this._faceletsReqAt = now;
    this.send("FACELETS").catch(() => {});
  }
}

/** @deprecated alias — préférer `Gan2x2UI` */
export { Gan2x2UI as Gan251Cube };

export { SERVICE, CHAR_RX, CHAR_TX, CHAR_TX_ALT, createSession, toHex };
export {
  GAN_COMPANY_IDS,
  resolveMac,
  resolveMacFromAdvertisements,
  extractMacFromManufacturerData,
  extractMacFromDataView,
  extractMacFromDeviceName,
  loadCachedMac,
  saveCachedMac,
} from "./mac.js";
