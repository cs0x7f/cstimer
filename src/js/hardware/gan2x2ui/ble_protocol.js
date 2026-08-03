/**
 * Parse / encode frames BLE Gen4 (ProtocolV3-2) pour GAN 251 UI.
 */
import { ganCrypt } from "./crypto.js";

export const FACES = "URFDLB";
export const MOVE_NAMES = ["U", "U'", "R", "R'", "F", "F'", "D", "D'", "L", "L'", "B", "B'"];

/** One-hot CubeStation/Gen4 — U=2 R=32 F=8 D=1 L=16 B=4 */
export const FACE_ONEHOT = [2, 32, 8, 1, 16, 4];

/**
 * CubeStation getSurfaceIdBy2(dir, faceHot) — switch hardcodé (pas de calib mutable)
 * dir: 0 = CW, ≠0 = CCW
 */
export function getSurfaceIdBy2(dir, faceHot) {
  const cw = dir === 0;
  switch (faceHot) {
    case 2:
      return cw ? 0 : 1; // U
    case 32:
      return cw ? 2 : 3; // R
    case 8:
      return cw ? 4 : 5; // F
    case 1:
      return cw ? 6 : 7; // D
    case 16:
      return cw ? 8 : 9; // L
    case 4:
      return cw ? 10 : 11; // B
    default:
      return -1;
  }
}

export function decodeMove(direction, faceHot) {
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
  for (let i = 0; i < n; i++) if (v & (1 << i)) r |= 1 << (n - 1 - i);
  return r;
}

function pickDecode(direction, faceHot) {
  const attempts = [
    decodeMove(direction, faceHot),
    decodeMove(direction, revBits(faceHot, 6)),
  ];
  for (const a of attempts) if (a.move !== "?") return a;
  return attempts[0];
}

function MessageView(message) {
  this.bits = Array.from(message)
    .map((b) => (b + 0x100).toString(2).slice(1))
    .join("");
}
MessageView.prototype.getBitWord = function (startBit, bitLength, littleEndian) {
  if (bitLength <= 8) return parseInt(this.bits.slice(startBit, startBit + bitLength), 2);
  if (bitLength === 16 || bitLength === 32) {
    let buf = new Uint8Array(bitLength / 8);
    for (let i = 0; i < buf.length; i++) {
      buf[i] = parseInt(this.bits.slice(8 * i + startBit, 8 * i + startBit + 8), 2);
    }
    if (littleEndian) buf = buf.reverse();
    return buf.reduce((v, b) => (v << 8) | b, 0);
  }
  throw new Error("unsupported bitLength " + bitLength);
};

const sum = (a) => a.reduce((x, y) => x + y, 0);
const signedFrac16 = (v) => ((1 - (v >> 15) * 2) * (v & 0x7fff)) / 0x7fff;

export function parseFrame(plain) {
  const msg = new MessageView(plain);
  const eventType = msg.getBitWord(0, 8);
  const dataLength = msg.getBitWord(8, 8);
  const crc = (plain[plain.length - 2] << 8) | plain[plain.length - 1];

  if (eventType === 0x01) {
    const cubeTimestamp = msg.getBitWord(16, 32, true);
    const serial = msg.getBitWord(48, 16, true);
    const formulaByte = plain[8]; // bits 64..71
    // packing A: dir@64:2 + face@66:6 (Gen4 / V3-2)
    const direction = msg.getBitWord(64, 2);
    const faceHot = msg.getBitWord(66, 6);
    // packing B: face@64:6 + dir@70:2
    const faceHotB = msg.getBitWord(64, 6);
    const directionB = msg.getBitWord(70, 2);
    // bits isolés dans l'octet formula (LSB = bit0 du byte)
    const fBits = [];
    for (let i = 0; i < 8; i++) fBits.push((formulaByte >> i) & 1);

    let decoded = pickDecode(direction, faceHot);
    if (decoded.move === "?") {
      const alt = pickDecode(directionB, faceHotB);
      if (alt.move !== "?") decoded = { ...alt, via: alt.via + "+packB" };
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
      plain: Array.from(plain)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join(""),
      crc,
    };
  }

  if (eventType === 0xed) {
    const serial = msg.getBitWord(16, 16, true);
    const cp = [],
      co = [],
      ep = [],
      eo = [];
    for (let i = 0; i < 7; i++) {
      cp.push(msg.getBitWord(32 + i * 3, 3));
      co.push(msg.getBitWord(53 + i * 2, 2));
    }
    cp.push(28 - sum(cp));
    co.push((3 - (sum(co) % 3)) % 3);
    for (let i = 0; i < 11; i++) {
      ep.push(msg.getBitWord(69 + i * 4, 4));
      eo.push(msg.getBitWord(113 + i, 1));
    }
    ep.push(66 - sum(ep));
    eo.push((2 - (sum(eo) % 2)) % 2);
    return { type: "FACELETS", eventType, dataLength, serial, CP: cp, CO: co, EP: ep, EO: eo, crc };
  }

  if (eventType === 0xec) {
    const qw = msg.getBitWord(16, 16);
    const qx = msg.getBitWord(32, 16);
    const qy = msg.getBitWord(48, 16);
    const qz = msg.getBitWord(64, 16);
    const vxRaw = msg.getBitWord(80, 4);
    const vyRaw = msg.getBitWord(84, 4);
    const vzRaw = msg.getBitWord(88, 4);
    const signed4 = (v) => (1 - (v >> 3) * 2) * (v & 0x7);
    const quaternion = {
      w: signedFrac16(qw),
      x: signedFrac16(qx),
      y: signedFrac16(qy),
      z: signedFrac16(qz),
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
      crc,
    };
  }

  if (eventType === 0xef) {
    return {
      type: "BATTERY",
      eventType,
      dataLength,
      index: msg.getBitWord(16, 8),
      level: Math.min(msg.getBitWord(8 + dataLength * 8, 8), 100),
      crc,
    };
  }

  if (eventType === 0xd1) {
    const startSerial = msg.getBitWord(16, 8);
    const count = (dataLength - 1) * 2;
    const histMap = [1, 5, 3, 0, 4, 2];
    const moves = [];
    for (let i = 0; i < count; i++) {
      const fi = histMap.indexOf(msg.getBitWord(24 + 4 * i, 3));
      const direction = msg.getBitWord(27 + 4 * i, 1);
      if (fi >= 0) {
        moves.push({
          serial: (startSerial - i) & 0xff,
          face: fi,
          direction,
          move: (FACES.charAt(fi) + " '".charAt(direction)).trim(),
        });
      }
    }
    return { type: "HISTORY", eventType, dataLength, startSerial, moves, crc };
  }

  return { type: "UNKNOWN", eventType, dataLength, crc };
}

export function buildCommand(type) {
  const msg = new Uint8Array(20);
  switch (type) {
    case "FACELETS":
      msg.set([0xdd, 0x04, 0x00, 0xed, 0x00, 0x00]);
      break;
    case "BATTERY":
      msg.set([0xdd, 0x04, 0x00, 0xef, 0x00, 0x00]);
      break;
    case "HARDWARE":
      msg.set([0xdf, 0x03, 0x00, 0x00, 0x00]);
      break;
    case "RESET":
      msg.set([0xd2, 0x0d, 0x05, 0x39, 0x77, 0x00, 0x00, 0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0x00, 0x00, 0x00]);
      break;
    default:
      throw new Error("unknown cmd " + type);
  }
  return msg;
}

export function decodePacket(ct, key, iv) {
  return parseFrame(ganCrypt(ct, key, iv, true));
}

export function encodeCommand(type, key, iv) {
  return ganCrypt(buildCommand(type), key, iv, false);
}
