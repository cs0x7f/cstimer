/**
 * gan2x2ui - Web Bluetooth driver for GAN 251 UI (2x2).
 * Vendored into csTimer as an IIFE for Closure Compiler.
 *
 * Upstream: https://github.com/thomaslekieffre/gan2x2ui (MIT)
 * Copyright (c) 2026 Thomas Lekieffre
 *
 * Regenerate:
 *   npx esbuild src/js/hardware/gan2x2ui/index.js --bundle --format=iife --global-name=gan2x2ui --target=es2017 --outfile=src/js/hardware/gan2x2uilib.js
 */
var gan2x2ui = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/js/hardware/gan2x2ui/index.js
  var index_exports = {};
  __export(index_exports, {
    B: () => B,
    CHAR_RX: () => CHAR_RX,
    CHAR_TX: () => CHAR_TX,
    CHAR_TX_ALT: () => CHAR_TX_ALT,
    Cube2x2: () => Cube2x2,
    D: () => D,
    F: () => F,
    FACES: () => FACES,
    FACE_HEX: () => FACE_HEX,
    FACE_ONEHOT: () => FACE_ONEHOT,
    GAN_COMPANY_IDS: () => GAN_COMPANY_IDS,
    Gan251Cube: () => Gan2x2UI,
    Gan2x2UI: () => Gan2x2UI,
    IDENTITY: () => IDENTITY,
    L: () => L,
    MOVE_NAMES: () => MOVE_NAMES,
    OrientationTracker: () => OrientationTracker,
    R: () => R,
    ROOT_IV: () => ROOT_IV,
    ROOT_KEY: () => ROOT_KEY,
    SERVICE: () => SERVICE,
    U: () => U,
    applyAlg: () => applyAlg,
    buildCommand: () => buildCommand,
    createSession: () => createSession,
    decodeMove: () => decodeMove,
    decodePacket: () => decodePacket,
    deriveKeyIv: () => deriveKeyIv,
    encodeCommand: () => encodeCommand,
    extractMacFromDataView: () => extractMacFromDataView,
    extractMacFromDeviceName: () => extractMacFromDeviceName,
    extractMacFromManufacturerData: () => extractMacFromManufacturerData,
    fromHex: () => fromHex,
    ganCrypt: () => ganCrypt,
    ganToThree: () => ganToThree,
    getSurfaceIdBy2: () => getSurfaceIdBy2,
    invertAlg: () => invertAlg,
    invertMove: () => invertMove,
    loadCachedMac: () => loadCachedMac,
    mergeMoves: () => mergeMoves,
    parseAlg: () => parseAlg,
    parseFrame: () => parseFrame,
    parseMac: () => parseMac,
    quatConj: () => quatConj,
    quatMul: () => quatMul,
    quatNorm: () => quatNorm,
    randomState: () => randomState,
    resolveMac: () => resolveMac,
    resolveMacFromAdvertisements: () => resolveMacFromAdvertisements,
    saveCachedMac: () => saveCachedMac,
    scramble2x2: () => scramble2x2,
    scramble2x2Official: () => scramble2x2Official,
    solveURF: () => solveURF,
    stateAfterScramble: () => stateAfterScramble,
    statesEqual: () => statesEqual,
    toHex: () => toHex
  });

  // src/js/hardware/gan2x2ui/crypto.js
  var ROOT_KEY = new Uint8Array([
    88,
    152,
    97,
    252,
    31,
    236,
    215,
    96,
    159,
    133,
    211,
    98,
    190,
    55,
    23,
    44
  ]);
  var ROOT_IV = new Uint8Array([
    127,
    97,
    208,
    82,
    117,
    193,
    57,
    82,
    8,
    46,
    84,
    29,
    138,
    120,
    99,
    77
  ]);
  var SERVICE = "00000010-0000-fff7-fff6-fff5fff4fff0";
  var CHAR_RX = "0000fff6-0000-1000-8000-00805f9b34fb";
  var CHAR_TX = "0000fff5-0000-1000-8000-00805f9b34fb";
  var CHAR_TX_ALT = "0000fff7-0000-1000-8000-00805f9b34fb";
  var SBOX = [
    99,
    124,
    119,
    123,
    242,
    107,
    111,
    197,
    48,
    1,
    103,
    43,
    254,
    215,
    171,
    118,
    202,
    130,
    201,
    125,
    250,
    89,
    71,
    240,
    173,
    212,
    162,
    175,
    156,
    164,
    114,
    192,
    183,
    253,
    147,
    38,
    54,
    63,
    247,
    204,
    52,
    165,
    229,
    241,
    113,
    216,
    49,
    21,
    4,
    199,
    35,
    195,
    24,
    150,
    5,
    154,
    7,
    18,
    128,
    226,
    235,
    39,
    178,
    117,
    9,
    131,
    44,
    26,
    27,
    110,
    90,
    160,
    82,
    59,
    214,
    179,
    41,
    227,
    47,
    132,
    83,
    209,
    0,
    237,
    32,
    252,
    177,
    91,
    106,
    203,
    190,
    57,
    74,
    76,
    88,
    207,
    208,
    239,
    170,
    251,
    67,
    77,
    51,
    133,
    69,
    249,
    2,
    127,
    80,
    60,
    159,
    168,
    81,
    163,
    64,
    143,
    146,
    157,
    56,
    245,
    188,
    182,
    218,
    33,
    16,
    255,
    243,
    210,
    205,
    12,
    19,
    236,
    95,
    151,
    68,
    23,
    196,
    167,
    126,
    61,
    100,
    93,
    25,
    115,
    96,
    129,
    79,
    220,
    34,
    42,
    144,
    136,
    70,
    238,
    184,
    20,
    222,
    94,
    11,
    219,
    224,
    50,
    58,
    10,
    73,
    6,
    36,
    92,
    194,
    211,
    172,
    98,
    145,
    149,
    228,
    121,
    231,
    200,
    55,
    109,
    141,
    213,
    78,
    169,
    108,
    86,
    244,
    234,
    101,
    122,
    174,
    8,
    186,
    120,
    37,
    46,
    28,
    166,
    180,
    198,
    232,
    221,
    116,
    31,
    75,
    189,
    139,
    138,
    112,
    62,
    181,
    102,
    72,
    3,
    246,
    14,
    97,
    53,
    87,
    185,
    134,
    193,
    29,
    158,
    225,
    248,
    152,
    17,
    105,
    217,
    142,
    148,
    155,
    30,
    135,
    233,
    206,
    85,
    40,
    223,
    140,
    161,
    137,
    13,
    191,
    230,
    66,
    104,
    65,
    153,
    45,
    15,
    176,
    84,
    187,
    22
  ];
  var INV_SBOX = (() => {
    const t = new Uint8Array(256);
    for (let i = 0; i < 256; i++) t[SBOX[i]] = i;
    return t;
  })();
  var RCON = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
  var xt = (a) => (a << 1 ^ (a & 128 ? 27 : 0)) & 255;
  function parseMac(mac) {
    if (mac instanceof Uint8Array) return Uint8Array.from(mac);
    const s = String(mac).replace(/[^0-9a-f]/gi, "");
    if (s.length !== 12) throw new Error("MAC invalide: " + mac);
    const out = new Uint8Array(6);
    for (let i = 0; i < 6; i++) out[i] = parseInt(s.slice(i * 2, i * 2 + 2), 16);
    return out;
  }
  function deriveKeyIv(mac) {
    const salt = Uint8Array.from(parseMac(mac)).reverse();
    const key = new Uint8Array(ROOT_KEY);
    const iv = new Uint8Array(ROOT_IV);
    for (let i = 0; i < 6; i++) {
      key[i] = (ROOT_KEY[i] + salt[i]) % 255;
      iv[i] = (ROOT_IV[i] + salt[i]) % 255;
    }
    return { key, iv, salt };
  }
  function expandKey(keyBytes) {
    const w = new Uint8Array(176);
    w.set(keyBytes);
    for (let i = 4; i < 44; i++) {
      let t0 = w[4 * (i - 1)], t1 = w[4 * (i - 1) + 1], t2 = w[4 * (i - 1) + 2], t3 = w[4 * (i - 1) + 3];
      if (i % 4 === 0) {
        const t = t0;
        t0 = SBOX[t1] ^ RCON[i / 4];
        t1 = SBOX[t2];
        t2 = SBOX[t3];
        t3 = SBOX[t];
      }
      w[4 * i] = w[4 * (i - 4)] ^ t0;
      w[4 * i + 1] = w[4 * (i - 4) + 1] ^ t1;
      w[4 * i + 2] = w[4 * (i - 4) + 2] ^ t2;
      w[4 * i + 3] = w[4 * (i - 4) + 3] ^ t3;
    }
    return w;
  }
  function aesEncryptBlock(w, plain16) {
    const s = new Uint8Array(plain16);
    const addKey = (r) => {
      for (let i = 0; i < 16; i++) s[i] ^= w[r * 16 + i];
    };
    addKey(0);
    for (let round = 1; round <= 10; round++) {
      for (let i = 0; i < 16; i++) s[i] = SBOX[s[i]];
      let t = s[1];
      s[1] = s[5];
      s[5] = s[9];
      s[9] = s[13];
      s[13] = t;
      t = s[2];
      s[2] = s[10];
      s[10] = t;
      t = s[6];
      s[6] = s[14];
      s[14] = t;
      t = s[15];
      s[15] = s[11];
      s[11] = s[7];
      s[7] = s[3];
      s[3] = t;
      if (round < 10) {
        for (let c = 0; c < 4; c++) {
          const i = 4 * c, a = s[i], b = s[i + 1], c2 = s[i + 2], d = s[i + 3];
          s[i] = xt(a) ^ xt(b) ^ b ^ c2 ^ d;
          s[i + 1] = a ^ xt(b) ^ xt(c2) ^ c2 ^ d;
          s[i + 2] = a ^ b ^ xt(c2) ^ xt(d) ^ d;
          s[i + 3] = xt(a) ^ a ^ b ^ c2 ^ xt(d);
        }
      }
      addKey(round);
    }
    return s;
  }
  function aesDecryptBlock(w, cipher16) {
    const s = new Uint8Array(cipher16);
    const addKey = (r) => {
      for (let i = 0; i < 16; i++) s[i] ^= w[r * 16 + i];
    };
    const mul = (a, b) => {
      let p = 0;
      for (let i = 0; i < 8; i++) {
        if (b & 1) p ^= a;
        const hi = a & 128;
        a = a << 1 & 255;
        if (hi) a ^= 27;
        b >>= 1;
      }
      return p;
    };
    addKey(10);
    for (let round = 9; round >= 0; round--) {
      let t = s[13];
      s[13] = s[9];
      s[9] = s[5];
      s[5] = s[1];
      s[1] = t;
      t = s[2];
      s[2] = s[10];
      s[10] = t;
      t = s[6];
      s[6] = s[14];
      s[14] = t;
      t = s[3];
      s[3] = s[7];
      s[7] = s[11];
      s[11] = s[15];
      s[15] = t;
      for (let i = 0; i < 16; i++) s[i] = INV_SBOX[s[i]];
      addKey(round);
      if (round > 0) {
        for (let c = 0; c < 4; c++) {
          const i = 4 * c, a = s[i], b = s[i + 1], c2 = s[i + 2], d = s[i + 3];
          s[i] = mul(a, 14) ^ mul(b, 11) ^ mul(c2, 13) ^ mul(d, 9);
          s[i + 1] = mul(a, 9) ^ mul(b, 14) ^ mul(c2, 11) ^ mul(d, 13);
          s[i + 2] = mul(a, 13) ^ mul(b, 9) ^ mul(c2, 14) ^ mul(d, 11);
          s[i + 3] = mul(a, 11) ^ mul(b, 13) ^ mul(c2, 9) ^ mul(d, 14);
        }
      }
    }
    return s;
  }
  function cbcCryptBlock(w, iv, block, decrypt) {
    if (decrypt) {
      const plain = aesDecryptBlock(w, block);
      for (let i = 0; i < 16; i++) plain[i] ^= iv[i];
      return plain;
    }
    const xored = new Uint8Array(16);
    for (let i = 0; i < 16; i++) xored[i] = block[i] ^ iv[i];
    return aesEncryptBlock(w, xored);
  }
  function ganCrypt(data, key, iv, decrypt) {
    const res = new Uint8Array(data);
    if (res.length < 16) throw new Error("need \u226516 bytes");
    const w = expandKey(key);
    const run = (offset) => {
      res.set(cbcCryptBlock(w, iv, res.subarray(offset, offset + 16), decrypt), offset);
    };
    if (decrypt) {
      if (res.length > 16) run(res.length - 16);
      run(0);
    } else {
      run(0);
      if (res.length > 16) run(res.length - 16);
    }
    return res;
  }
  function toHex(buf) {
    return Array.from(buf).map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  function fromHex(hex) {
    const s = hex.replace(/[^0-9a-f]/gi, "");
    const out = new Uint8Array(s.length / 2);
    for (let i = 0; i < out.length; i++) out[i] = parseInt(s.slice(i * 2, i * 2 + 2), 16);
    return out;
  }
  function createSession(mac) {
    const { key, iv, salt } = deriveKeyIv(mac);
    return {
      mac: parseMac(mac),
      key,
      iv,
      salt,
      decrypt: (ct) => ganCrypt(ct, key, iv, true),
      encrypt: (pt) => ganCrypt(pt, key, iv, false)
    };
  }

  // src/js/hardware/gan2x2ui/ble_protocol.js
  var FACES = "URFDLB";
  var MOVE_NAMES = ["U", "U'", "R", "R'", "F", "F'", "D", "D'", "L", "L'", "B", "B'"];
  var FACE_ONEHOT = [2, 32, 8, 1, 16, 4];
  function getSurfaceIdBy2(dir, faceHot) {
    const cw = dir === 0;
    switch (faceHot) {
      case 2:
        return cw ? 0 : 1;
      // U
      case 32:
        return cw ? 2 : 3;
      // R
      case 8:
        return cw ? 4 : 5;
      // F
      case 1:
        return cw ? 6 : 7;
      // D
      case 16:
        return cw ? 8 : 9;
      // L
      case 4:
        return cw ? 10 : 11;
      // B
      default:
        return -1;
    }
  }
  function decodeMove(direction, faceHot) {
    const face = FACE_ONEHOT.indexOf(faceHot);
    const formulaIndex = getSurfaceIdBy2(direction, faceHot);
    if (face < 0 || formulaIndex < 0) {
      return { face: -1, formulaIndex: -1, move: "?", via: "fail", faceHot, direction };
    }
    const move = direction === 2 ? FACES[face] + "2" : MOVE_NAMES[formulaIndex];
    return { face, formulaIndex, move, via: "onehot", faceHot, direction };
  }
  function revBits(v, n) {
    let r = 0;
    for (let i = 0; i < n; i++) if (v & 1 << i) r |= 1 << n - 1 - i;
    return r;
  }
  function pickDecode(direction, faceHot) {
    const attempts = [
      decodeMove(direction, faceHot),
      decodeMove(direction, revBits(faceHot, 6))
    ];
    for (const a of attempts) if (a.move !== "?") return a;
    return attempts[0];
  }
  function MessageView(message) {
    this.bits = Array.from(message).map((b) => (b + 256).toString(2).slice(1)).join("");
  }
  MessageView.prototype.getBitWord = function(startBit, bitLength, littleEndian) {
    if (bitLength <= 8) return parseInt(this.bits.slice(startBit, startBit + bitLength), 2);
    if (bitLength === 16 || bitLength === 32) {
      let buf = new Uint8Array(bitLength / 8);
      for (let i = 0; i < buf.length; i++) {
        buf[i] = parseInt(this.bits.slice(8 * i + startBit, 8 * i + startBit + 8), 2);
      }
      if (littleEndian) buf = buf.reverse();
      return buf.reduce((v, b) => v << 8 | b, 0);
    }
    throw new Error("unsupported bitLength " + bitLength);
  };
  var sum = (a) => a.reduce((x, y) => x + y, 0);
  var signedFrac16 = (v) => (1 - (v >> 15) * 2) * (v & 32767) / 32767;
  function parseFrame(plain) {
    const msg = new MessageView(plain);
    const eventType = msg.getBitWord(0, 8);
    const dataLength = msg.getBitWord(8, 8);
    const crc = plain[plain.length - 2] << 8 | plain[plain.length - 1];
    if (eventType === 1) {
      const cubeTimestamp = msg.getBitWord(16, 32, true);
      const serial = msg.getBitWord(48, 16, true);
      const formulaByte = plain[8];
      const direction = msg.getBitWord(64, 2);
      const faceHot = msg.getBitWord(66, 6);
      const faceHotB = msg.getBitWord(64, 6);
      const directionB = msg.getBitWord(70, 2);
      const fBits = [];
      for (let i = 0; i < 8; i++) fBits.push(formulaByte >> i & 1);
      let decoded = pickDecode(direction, faceHot);
      if (decoded.move === "?") {
        const alt = pickDecode(directionB, faceHotB);
        if (alt.move !== "?") decoded = __spreadProps(__spreadValues({}, alt), { via: alt.via + "+packB" });
      }
      return {
        type: "MOVE",
        eventType,
        dataLength,
        cubeTimestamp,
        serial,
        face: decoded.face,
        faceHot,
        faceHotB,
        direction,
        directionB,
        formulaByte,
        formulaBits: fBits.join(""),
        move: decoded.move,
        formulaIndex: decoded.formulaIndex,
        via: decoded.via,
        plain: Array.from(plain).map((b) => b.toString(16).padStart(2, "0")).join(""),
        crc
      };
    }
    if (eventType === 237) {
      const serial = msg.getBitWord(16, 16, true);
      const cp = [], co = [], ep = [], eo = [];
      for (let i = 0; i < 7; i++) {
        cp.push(msg.getBitWord(32 + i * 3, 3));
        co.push(msg.getBitWord(53 + i * 2, 2));
      }
      cp.push(28 - sum(cp));
      co.push((3 - sum(co) % 3) % 3);
      for (let i = 0; i < 11; i++) {
        ep.push(msg.getBitWord(69 + i * 4, 4));
        eo.push(msg.getBitWord(113 + i, 1));
      }
      ep.push(66 - sum(ep));
      eo.push((2 - sum(eo) % 2) % 2);
      return { type: "FACELETS", eventType, dataLength, serial, CP: cp, CO: co, EP: ep, EO: eo, crc };
    }
    if (eventType === 236) {
      const qw = msg.getBitWord(16, 16);
      const qx = msg.getBitWord(32, 16);
      const qy = msg.getBitWord(48, 16);
      const qz = msg.getBitWord(64, 16);
      const vxRaw = msg.getBitWord(80, 4);
      const vyRaw = msg.getBitWord(84, 4);
      const vzRaw = msg.getBitWord(88, 4);
      const signed4 = (v) => (1 - (v >> 3) * 2) * (v & 7);
      const quaternion = {
        w: signedFrac16(qw),
        x: signedFrac16(qx),
        y: signedFrac16(qy),
        z: signedFrac16(qz)
      };
      return {
        type: "GYRO",
        eventType,
        dataLength,
        quaternion,
        vx: signed4(vxRaw),
        vy: signed4(vyRaw),
        vz: signed4(vzRaw),
        vxRaw,
        vyRaw,
        vzRaw,
        crc
      };
    }
    if (eventType === 239) {
      return {
        type: "BATTERY",
        eventType,
        dataLength,
        index: msg.getBitWord(16, 8),
        level: Math.min(msg.getBitWord(8 + dataLength * 8, 8), 100),
        crc
      };
    }
    if (eventType === 209) {
      const startSerial = msg.getBitWord(16, 8);
      const count = (dataLength - 1) * 2;
      const histMap = [1, 5, 3, 0, 4, 2];
      const moves = [];
      for (let i = 0; i < count; i++) {
        const fi = histMap.indexOf(msg.getBitWord(24 + 4 * i, 3));
        const direction = msg.getBitWord(27 + 4 * i, 1);
        if (fi >= 0) {
          moves.push({
            serial: startSerial - i & 255,
            face: fi,
            direction,
            move: (FACES.charAt(fi) + " '".charAt(direction)).trim()
          });
        }
      }
      return { type: "HISTORY", eventType, dataLength, startSerial, moves, crc };
    }
    return { type: "UNKNOWN", eventType, dataLength, crc };
  }
  function buildCommand(type) {
    const msg = new Uint8Array(20);
    switch (type) {
      case "FACELETS":
        msg.set([221, 4, 0, 237, 0, 0]);
        break;
      case "BATTERY":
        msg.set([221, 4, 0, 239, 0, 0]);
        break;
      case "HARDWARE":
        msg.set([223, 3, 0, 0, 0]);
        break;
      case "RESET":
        msg.set([210, 13, 5, 57, 119, 0, 0, 1, 35, 69, 103, 137, 171, 0, 0, 0]);
        break;
      default:
        throw new Error("unknown cmd " + type);
    }
    return msg;
  }
  function decodePacket(ct, key, iv) {
    return parseFrame(ganCrypt(ct, key, iv, true));
  }
  function encodeCommand(type, key, iv) {
    return ganCrypt(buildCommand(type), key, iv, false);
  }

  // src/js/hardware/gan2x2ui/cube2x2.js
  var U = 0;
  var R = 1;
  var F = 2;
  var D = 3;
  var L = 4;
  var B = 5;
  var DEFS = {
    U: { cyc: [0, 3, 2, 1], ori: [0, 0, 0, 0] },
    "U'": { cyc: [0, 1, 2, 3], ori: [0, 0, 0, 0] },
    U2: { swaps: [[0, 2], [3, 1]] },
    R: { cyc: [0, 4, 7, 3], ori: [1, 2, 1, 2] },
    "R'": { cyc: [0, 3, 7, 4], ori: [1, 2, 1, 2] },
    R2: { swaps: [[0, 7], [4, 3]] },
    F: { cyc: [0, 1, 5, 4], ori: [2, 1, 2, 1] },
    "F'": { cyc: [0, 4, 5, 1], ori: [2, 1, 2, 1] },
    F2: { swaps: [[0, 5], [1, 4]] },
    D: { cyc: [4, 5, 6, 7], ori: [0, 0, 0, 0] },
    "D'": { cyc: [4, 7, 6, 5], ori: [0, 0, 0, 0] },
    D2: { swaps: [[4, 6], [5, 7]] },
    L: { cyc: [1, 2, 6, 5], ori: [1, 2, 1, 2] },
    "L'": { cyc: [1, 5, 6, 2], ori: [1, 2, 1, 2] },
    L2: { swaps: [[1, 6], [2, 5]] },
    B: { cyc: [2, 3, 7, 6], ori: [2, 1, 2, 1] },
    "B'": { cyc: [2, 6, 7, 3], ori: [2, 1, 2, 1] },
    B2: { swaps: [[2, 7], [3, 6]] }
  };
  var CORNER_COLS = [
    [U, R, F],
    [U, F, L],
    [U, L, B],
    [U, B, R],
    [D, F, R],
    [D, L, F],
    [D, B, L],
    [D, R, B]
  ];
  var SLOT_FACES = CORNER_COLS;
  var Cube2x2 = class _Cube2x2 {
    constructor() {
      this.reset();
    }
    reset() {
      this.cp = [0, 1, 2, 3, 4, 5, 6, 7];
      this.co = [0, 0, 0, 0, 0, 0, 0, 0];
    }
    clone() {
      const c = new _Cube2x2();
      c.cp = this.cp.slice();
      c.co = this.co.slice();
      return c;
    }
    equals(other) {
      if (!(other == null ? void 0 : other.cp)) return false;
      for (let i = 0; i < 8; i++) {
        if (this.cp[i] !== other.cp[i] || this.co[i] !== other.co[i]) return false;
      }
      return true;
    }
    setFromFacelets(cp, co) {
      this.cp = cp.slice(0, 8);
      this.co = co.slice(0, 8);
    }
    applyAlg(alg) {
      const parts = String(alg).trim().split(/\s+/).filter(Boolean);
      for (const m of parts) this.applyMove(m);
      return this;
    }
    /** Toutes les moves quarter/half pour diff d'état */
    static allMoves() {
      return Object.keys(DEFS);
    }
    /**
     * Move unique qui transforme `this` → `after` (CP/CO), ou null.
     * Sert à désambiguïser R↔L / U↔D / F↔B quand le BLE partage le même one-hot.
     */
    findMoveTo(after) {
      if (!(after == null ? void 0 : after.cp)) return null;
      let found = null;
      for (const m of _Cube2x2.allMoves()) {
        const c = this.clone();
        c.applyMove(m);
        if (c.equals(after)) {
          if (found) return null;
          found = m;
        }
      }
      return found;
    }
    applyMove(move) {
      const def = DEFS[move];
      if (!def) return false;
      if (def.swaps) {
        for (const [a, b] of def.swaps) {
          const t = this.cp[a];
          this.cp[a] = this.cp[b];
          this.cp[b] = t;
          const o = this.co[a];
          this.co[a] = this.co[b];
          this.co[b] = o;
        }
        return true;
      }
      const { cyc, ori } = def;
      const ncp = this.cp.slice();
      const nco = this.co.slice();
      for (let i = 0; i < 4; i++) {
        const dest = cyc[i];
        const src = cyc[(i + 3) % 4];
        ncp[dest] = this.cp[src];
        nco[dest] = (this.co[src] + ori[i]) % 3;
      }
      this.cp = ncp;
      this.co = nco;
      return true;
    }
    isSolved() {
      return this.cp.every((v, i) => v === i) && this.co.every((v) => v === 0);
    }
    /** 8 cubies with face→colorId map for the slot faces */
    cubies() {
      const out = [];
      for (let pos = 0; pos < 8; pos++) {
        const id = this.cp[pos];
        const ori = this.co[pos];
        const cols = CORNER_COLS[id];
        const slots = SLOT_FACES[pos];
        const colors = {};
        for (let k = 0; k < 3; k++) colors[slots[k]] = cols[(k - ori + 3) % 3];
        out.push({ pos, id, ori, colors });
      }
      return out;
    }
  };
  var FACE_HEX = {
    [U]: "#f2f2f0",
    [R]: "#d62828",
    [F]: "#2a9d4a",
    [D]: "#e6c200",
    [L]: "#e07a1f",
    [B]: "#1f6feb"
  };

  // src/js/hardware/gan2x2ui/mac.js
  var GAN_COMPANY_IDS = Array.from({ length: 256 }, (_, i) => i << 8 | 1);
  var CACHE_PREFIX = "gan2x2ui.mac.";
  function extractMacFromDataView(dataView) {
    if (!dataView || dataView.byteLength < 6) return null;
    const mac = [];
    for (let i = 1; i <= 6; i++) {
      mac.push(dataView.getUint8(dataView.byteLength - i).toString(16).padStart(2, "0"));
    }
    return mac.join(":");
  }
  function extractMacFromManufacturerData(manufacturerData) {
    if (!manufacturerData) return null;
    for (const [, view] of manufacturerData) {
      const mac = extractMacFromDataView(view);
      if (mac) return mac;
    }
    return null;
  }
  function extractMacFromDeviceName(name) {
    if (!name) return null;
    const m = String(name).match(/([0-9a-f]{12})\s*$/i);
    if (!m) return null;
    const h2 = m[1].toLowerCase();
    return h2.match(/.{2}/g).join(":");
  }
  function loadCachedMac(deviceId, deviceName) {
    try {
      if (typeof localStorage === "undefined") return null;
      if (deviceId) {
        const v = localStorage.getItem(CACHE_PREFIX + "id." + deviceId);
        if (v) return v;
      }
      if (deviceName) {
        const v = localStorage.getItem(CACHE_PREFIX + "name." + deviceName);
        if (v) return v;
      }
    } catch (e) {
    }
    return null;
  }
  function saveCachedMac(mac, deviceId, deviceName) {
    try {
      if (typeof localStorage === "undefined" || !mac) return;
      if (deviceId) localStorage.setItem(CACHE_PREFIX + "id." + deviceId, mac);
      if (deviceName) localStorage.setItem(CACHE_PREFIX + "name." + deviceName, mac);
    } catch (e) {
    }
  }
  async function resolveMacFromAdvertisements(device, opts = {}) {
    var _a, _b;
    if (typeof device.watchAdvertisements !== "function") {
      throw new Error(
        "watchAdvertisements indisponible \u2014 active chrome://flags/#enable-experimental-web-platform-features puis relance Chrome"
      );
    }
    const timeoutMs = (_a = opts.timeoutMs) != null ? _a : 1e4;
    const ac = new AbortController();
    const onAbort = () => ac.abort();
    (_b = opts.signal) == null ? void 0 : _b.addEventListener("abort", onAbort, { once: true });
    return new Promise((resolve, reject) => {
      let settled = false;
      const timer = setTimeout(() => {
        finish(
          () => reject(
            new Error(
              "Timeout advertisements \u2014 flag Chrome experimental + cube allum\xE9 \xE0 proximit\xE9, ou passe opts.mac"
            )
          )
        );
      }, timeoutMs);
      function finish(fn) {
        var _a2;
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        (_a2 = opts.signal) == null ? void 0 : _a2.removeEventListener("abort", onAbort);
        try {
          ac.abort();
        } catch (e) {
        }
        fn();
      }
      const onAdv = (ev) => {
        const mac = extractMacFromManufacturerData(ev.manufacturerData);
        if (mac) finish(() => resolve(mac));
      };
      device.addEventListener("advertisementreceived", onAdv);
      device.watchAdvertisements({ signal: ac.signal }).catch((err) => {
        finish(
          () => reject(
            (err == null ? void 0 : err.name) === "NotFoundError" || /experimental|permission/i.test(String((err == null ? void 0 : err.message) || err)) ? new Error(
              "Advertisements bloqu\xE9s \u2014 chrome://flags/#enable-experimental-web-platform-features (ou new-permissions-backend)"
            ) : err
          )
        );
      });
      ac.signal.addEventListener(
        "abort",
        () => {
          var _a2;
          device.removeEventListener("advertisementreceived", onAdv);
          if (!settled && ((_a2 = opts.signal) == null ? void 0 : _a2.aborted)) {
            finish(() => reject(new DOMException("Aborted", "AbortError")));
          }
        },
        { once: true }
      );
    });
  }
  async function resolveMac(device, opts = {}) {
    if (opts.mac) {
      const mac = opts.mac instanceof Uint8Array ? [...opts.mac].map((b) => b.toString(16).padStart(2, "0")).join(":") : String(opts.mac).trim();
      if (opts.cache !== false) saveCachedMac(mac, device.id, device.name);
      return { mac, source: "opts" };
    }
    if (opts.autoMac === false) {
      throw new Error("opts.mac requis (autoMac d\xE9sactiv\xE9)");
    }
    try {
      const mac = await resolveMacFromAdvertisements(device, {
        timeoutMs: opts.macTimeoutMs,
        signal: opts.signal
      });
      if (opts.cache !== false) saveCachedMac(mac, device.id, device.name);
      return { mac, source: "advertisement" };
    } catch (err) {
      const fromName = extractMacFromDeviceName(device.name);
      if (fromName) {
        if (opts.cache !== false) saveCachedMac(fromName, device.id, device.name);
        return { mac: fromName, source: "name" };
      }
      const cached = loadCachedMac(device.id, device.name);
      if (cached) return { mac: cached, source: "cache" };
      throw err;
    }
  }

  // src/js/hardware/gan2x2ui/connect.js
  function emit(listeners, type, payload) {
    for (const fn of listeners.get(type) || []) {
      try {
        fn(payload);
      } catch (err) {
        console.error(`[gan2x2ui] listener "${type}"`, err);
      }
    }
  }
  var Gan2x2UI = class _Gan2x2UI {
    /**
     * Ouvre le picker Bluetooth puis initialise GATT + crypto.
     * Doit être appelé depuis un geste utilisateur (Chrome).
     * @param {ConnectOptions} opts
     * @returns {Promise<Gan2x2UI>}
     */
    static async connect(opts = {}) {
      if (!navigator.bluetooth) {
        throw new Error("Web Bluetooth indisponible \u2014 Chrome / Edge desktop requis");
      }
      const optionalServices = [
        SERVICE,
        "0000fee0-0000-1000-8000-00805f9b34fb",
        "generic_access",
        "device_information",
        "battery_service"
      ];
      const device = opts.device || await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices,
        optionalManufacturerData: GAN_COMPANY_IDS
      });
      const resolved = await resolveMac(device, {
        mac: opts.mac,
        autoMac: opts.autoMac,
        macTimeoutMs: opts.macTimeoutMs,
        signal: opts.signal,
        cache: opts.cacheMac !== false
      });
      const cube = new _Gan2x2UI(device, __spreadProps(__spreadValues({}, opts), { mac: resolved.mac }));
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
      this.mac = [...this.session.mac].map((b) => b.toString(16).padStart(2, "0")).join(":");
      this.macSource = null;
      this.cube = new Cube2x2();
      this.listeners = /* @__PURE__ */ new Map();
      this.lastSerial = -1;
      this.battery = null;
      this.gyro = null;
      this.applyMoves = true;
      this.remapMove = null;
      this._chars = /* @__PURE__ */ new Map();
      this._txUuid = opts.preferAltTx ? CHAR_TX_ALT : CHAR_TX;
      this._writeChain = Promise.resolve();
      this._gyroRing = [];
      this._gyroRingMax = 40;
      this._faceletsReqAt = 0;
    }
    /** Nom annoncé BLE */
    get deviceName() {
      var _a;
      return ((_a = this.device) == null ? void 0 : _a.name) || "";
    }
    /**
     * @param {'connect'|'move'|'gyro'|'facelets'|'battery'|'disconnect'|'error'|'*'} type
     * @param {Function} fn
     * @returns {() => void} unsubscribe
     */
    on(type, fn) {
      if (!this.listeners.has(type)) this.listeners.set(type, /* @__PURE__ */ new Set());
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
      this._writeChain = p.catch(() => {
      });
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
        via: "reset"
      });
      return this;
    }
    async disconnect() {
      var _a, _b;
      if ((_b = (_a = this.device) == null ? void 0 : _a.gatt) == null ? void 0 : _b.connected) this.device.gatt.disconnect();
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
      } catch (e) {
        this._txUuid = CHAR_TX_ALT;
        await this.send("FACELETS").catch(() => {
        });
      }
      if (this.opts.resetOnConnect !== false) {
        await this.markSolved();
      } else if (this.opts.requestFacelets !== false) {
        await this.send("FACELETS").catch(() => {
        });
      }
      emit(this.listeners, "connect", {
        name: this.deviceName,
        mac: this.mac,
        macSource: this.macSource,
        key: toHex(this.session.key),
        solved: this.cube.isSolved()
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
          q: __spreadValues({}, pkt.quaternion)
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
        if (move && move !== "?" && this.applyMoves) {
          this.cube.applyMove(move);
        }
        const tNow = performance.now();
        const gyroLast = this._gyroRing[this._gyroRing.length - 1] || null;
        emit(this.listeners, "move", __spreadProps(__spreadValues({}, pkt), {
          hwMove,
          move,
          via: "onehot",
          gyroLast,
          gyroAround: this._gyroRing.filter((g) => Math.abs(g.t - tNow) < 80),
          q: (gyroLast == null ? void 0 : gyroLast.q) || this.gyro,
          solved: this.cube.isSolved(),
          state: this.cube
        }));
        this._requestFaceletsThrottled();
        return;
      }
      if (pkt.type === "FACELETS") {
        if (this.lastSerial < 0) this.lastSerial = pkt.serial;
        this.cube.setFromFacelets(pkt.CP, pkt.CO);
        emit(this.listeners, "facelets", __spreadProps(__spreadValues({}, pkt), {
          solved: this.cube.isSolved(),
          state: this.cube
        }));
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
      this.send("FACELETS").catch(() => {
      });
    }
  };

  // src/js/hardware/gan2x2ui/orientation.js
  function quatMul(a, b) {
    return {
      w: a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z,
      x: a.w * b.x + a.x * b.w + a.y * b.z - a.z * b.y,
      y: a.w * b.y - a.x * b.z + a.y * b.w + a.z * b.x,
      z: a.w * b.z + a.x * b.y - a.y * b.x + a.z * b.w
    };
  }
  function quatConj(q) {
    return { w: q.w, x: -q.x, y: -q.y, z: -q.z };
  }
  function quatNorm(q) {
    const n = Math.hypot(q.x, q.y, q.z, q.w) || 1;
    return { x: q.x / n, y: q.y / n, z: q.z / n, w: q.w / n };
  }
  var IDENTITY = { x: 0, y: 0, z: 0, w: 1 };
  var FACES2 = "URFDLB";
  var HW_NORMALS = [
    [0, 1, 0],
    // U
    [1, 0, 0],
    // R
    [0, 0, 1],
    // F
    [0, -1, 0],
    // D
    [-1, 0, 0],
    // L
    [0, 0, -1]
    // B
  ];
  var AXIS_FACES = HW_NORMALS;
  function ganToThree(q) {
    const n = quatNorm(q);
    return quatNorm({ x: -n.y, y: n.z, z: -n.x, w: n.w });
  }
  function rotateVec(q, v) {
    const p = { w: 0, x: v[0], y: v[1], z: v[2] };
    const r = quatMul(quatMul(q, p), quatConj(q));
    return [r.x, r.y, r.z];
  }
  function nearestFace(v) {
    let best = 0, bestDot = -Infinity;
    for (let i = 0; i < 6; i++) {
      const a = AXIS_FACES[i];
      const d = v[0] * a[0] + v[1] * a[1] + v[2] * a[2];
      if (d > bestDot) {
        bestDot = d;
        best = i;
      }
    }
    return { face: best, dot: bestDot };
  }
  var OrientationTracker = class {
    constructor() {
      this._rawGan = IDENTITY;
      this._three = IDENTITY;
      this._homeInv = IDENTITY;
      this._calibrated = false;
      this.faceMap = [0, 1, 2, 3, 4, 5];
      this.dirFlip = [false, false, false, false, false, false];
    }
    push(rawGan) {
      this._rawGan = quatNorm(rawGan);
      this._three = ganToThree(this._rawGan);
    }
    /**
     * Tiens blanc↑ vert→ puis appelle.
     * Construit faceMap : quelle face hardware pointe U/R/F/D/L/B dans ce repère.
     */
    calibrate() {
      this._homeInv = quatConj(this._three);
      this._calibrated = true;
      const map = [0, 1, 2, 3, 4, 5];
      for (let hw = 0; hw < 6; hw++) {
        const nWorld = rotateVec(this._three, HW_NORMALS[hw]);
        map[hw] = nearestFace(nWorld).face;
      }
      this.faceMap = map;
      for (let hw = 0; hw < 6; hw++) {
        const nWorld = rotateVec(this._three, HW_NORMALS[hw]);
        const axis = AXIS_FACES[map[hw]];
        const dot = nWorld[0] * axis[0] + nWorld[1] * axis[1] + nWorld[2] * axis[2];
        this.dirFlip[hw] = dot < 0;
      }
      return { display: this.display(), faceMap: map.slice(), faces: map.map((f) => FACES2[f]) };
    }
    get calibrated() {
      return this._calibrated;
    }
    display() {
      if (!this._calibrated) return this._three;
      return quatNorm(quatMul(this._homeInv, this._three));
    }
    /**
     * @param {number} hwFace index URFDLB hardware (0..5)
     * @param {number} direction 0=CW, 1=CCW, 2=180
     * @returns {{ move: string, spatialFace: number, hwFace: number }}
     */
    remapMove(hwFace, direction) {
      if (hwFace < 0 || hwFace > 5) {
        return { move: "?", spatialFace: -1, hwFace };
      }
      const spatial = this._calibrated ? this.faceMap[hwFace] : hwFace;
      let dir = direction;
      if (this._calibrated && this.dirFlip[hwFace] && dir !== 2) {
        dir = dir === 0 ? 1 : 0;
      }
      const faceCh = FACES2[spatial];
      let move;
      if (dir === 2) move = faceCh + "2";
      else if (dir === 0) move = faceCh;
      else move = faceCh + "'";
      return { move, spatialFace: spatial, hwFace };
    }
    reset() {
      this._homeInv = IDENTITY;
      this._calibrated = false;
      this.faceMap = [0, 1, 2, 3, 4, 5];
      this.dirFlip = [false, false, false, false, false, false];
    }
  };

  // src/js/hardware/gan2x2ui/scramble.js
  var MOVES = ["U", "U'", "U2", "R", "R'", "R2", "F", "F'", "F2"];
  var MIN_DIST = 4;
  function invertMove(m) {
    if (m.endsWith("2")) return m;
    if (m.endsWith("'")) return m.slice(0, -1);
    return m + "'";
  }
  function invertAlg(alg) {
    return String(alg).trim().split(/\s+/).filter(Boolean).reverse().map(invertMove).join(" ");
  }
  function parseAlg(alg) {
    return String(alg).trim().split(/\s+/).filter(Boolean);
  }
  function applyAlg(cube, alg) {
    for (const m of parseAlg(alg)) cube.applyMove(m);
    return cube;
  }
  function moveAmt(m) {
    if (m.endsWith("2")) return 2;
    if (m.endsWith("'")) return 3;
    return 1;
  }
  function moveFromAmt(face, a) {
    a = (a % 4 + 4) % 4;
    if (a === 0) return null;
    if (a === 1) return face;
    if (a === 2) return face + "2";
    return face + "'";
  }
  function mergeMoves(list) {
    const out = [];
    for (const m of list) {
      if (!m || m === "?" || String(m).startsWith("?")) continue;
      if (!out.length || out[out.length - 1][0] !== m[0]) {
        out.push(m);
        continue;
      }
      const face = m[0];
      const merged = moveFromAmt(face, moveAmt(out.pop()) + moveAmt(m));
      if (merged) out.push(merged);
    }
    return out;
  }
  function faceOf(m) {
    return m[0];
  }
  function defaultRng() {
    return Math.random();
  }
  function shuffle(arr, rng) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = rng() * (i + 1) | 0;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  function randomState(rng = defaultRng) {
    const mobiles = [0, 1, 2, 3, 4, 5, 7];
    const perm = shuffle(mobiles.slice(), rng);
    const cp = [0, 0, 0, 0, 0, 0, 6, 0];
    const slots = [0, 1, 2, 3, 4, 5, 7];
    for (let i = 0; i < 7; i++) cp[slots[i]] = perm[i];
    const co = [0, 0, 0, 0, 0, 0, 0, 0];
    let sum2 = 0;
    for (let i = 0; i < 6; i++) {
      co[slots[i]] = rng() * 3 | 0;
      sum2 += co[slots[i]];
    }
    co[slots[6]] = (3 - sum2 % 3) % 3;
    return { cp, co };
  }
  function isSolvedCpCo(cp, co) {
    for (let i = 0; i < 8; i++) if (cp[i] !== i || co[i] !== 0) return false;
    return true;
  }
  function h(cp, co) {
    let bad = 0;
    for (let i = 0; i < 8; i++) {
      if (i === 6) continue;
      if (cp[i] !== i || co[i] !== 0) bad++;
    }
    return bad + 3 >> 2;
  }
  function solveURF(cp0, co0, maxDepth = 11) {
    if (isSolvedCpCo(cp0, co0)) return [];
    const path = [];
    let found = null;
    function search(cube, depth, depthLimit, lastFace) {
      if (found) return true;
      if (cube.isSolved()) {
        found = path.slice();
        return true;
      }
      if (depth >= depthLimit) return false;
      if (depth + h(cube.cp, cube.co) > depthLimit) return false;
      for (const mv of MOVES) {
        if (lastFace && faceOf(mv) === lastFace) continue;
        const n = cube.clone();
        n.applyMove(mv);
        path.push(mv);
        if (search(n, depth + 1, depthLimit, faceOf(mv))) return true;
        path.pop();
      }
      return false;
    }
    const start = new Cube2x2();
    start.cp = cp0.slice();
    start.co = co0.slice();
    for (let limit = Math.max(h(cp0, co0), 1); limit <= maxDepth; limit++) {
      path.length = 0;
      found = null;
      if (search(start, 0, limit, null)) return found;
    }
    return null;
  }
  function scramble2x2Official(rng = defaultRng) {
    for (let attempt = 0; attempt < 40; attempt++) {
      const st2 = randomState(rng);
      const sol2 = solveURF(st2.cp, st2.co, 11);
      if (!sol2 || sol2.length < MIN_DIST) continue;
      const scramble = invertAlg(sol2.join(" "));
      return {
        scramble,
        state: { cp: st2.cp.slice(), co: st2.co.slice() },
        dist: sol2.length
      };
    }
    const st = randomState(rng);
    const sol = solveURF(st.cp, st.co, 11) || ["R", "U", "R'", "U'", "F", "R", "U", "R'", "U'", "F'"];
    return {
      scramble: invertAlg(sol.join(" ")),
      state: { cp: st.cp.slice(), co: st.co.slice() },
      dist: sol.length
    };
  }
  function scramble2x2() {
    return scramble2x2Official().scramble;
  }
  function statesEqual(a, b) {
    if (!(a == null ? void 0 : a.cp) || !(b == null ? void 0 : b.cp)) return false;
    for (let i = 0; i < 8; i++) {
      if (a.cp[i] !== b.cp[i] || a.co[i] !== b.co[i]) return false;
    }
    return true;
  }
  function stateAfterScramble(scramble) {
    const c = new Cube2x2();
    applyAlg(c, scramble);
    return { cp: c.cp.slice(), co: c.co.slice() };
  }
  return __toCommonJS(index_exports);
})();
