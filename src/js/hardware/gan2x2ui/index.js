/**
 * gan2x2UI — driver Web Bluetooth open-source pour GAN 251 UI (2×2).
 * @module gan2x2ui
 */

export {
  Gan2x2UI,
  Gan251Cube,
  createSession,
  SERVICE,
  CHAR_RX,
  CHAR_TX,
  CHAR_TX_ALT,
  toHex,
  GAN_COMPANY_IDS,
  resolveMac,
  resolveMacFromAdvertisements,
  extractMacFromManufacturerData,
  extractMacFromDataView,
  extractMacFromDeviceName,
  loadCachedMac,
  saveCachedMac,
} from "./connect.js";

export { fromHex, deriveKeyIv, parseMac, ROOT_KEY, ROOT_IV, ganCrypt } from "./crypto.js";

export {
  parseFrame,
  decodePacket,
  encodeCommand,
  buildCommand,
  MOVE_NAMES,
  getSurfaceIdBy2,
  decodeMove,
  FACE_ONEHOT,
  FACES,
} from "./ble_protocol.js";

export { Cube2x2, FACE_HEX, U, R, F, D, L, B } from "./cube2x2.js";

export {
  OrientationTracker,
  ganToThree,
  quatMul,
  quatConj,
  quatNorm,
  IDENTITY,
} from "./orientation.js";

export {
  scramble2x2,
  scramble2x2Official,
  statesEqual,
  stateAfterScramble,
  invertAlg,
  invertMove,
  parseAlg,
  applyAlg,
  mergeMoves,
  randomState,
  solveURF,
} from "./scramble.js";
