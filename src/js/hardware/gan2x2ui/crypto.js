/**
 * AES-128-CBC + dérivation de clés ProtocolV3-2 (salt = MAC reversed).
 */

export const ROOT_KEY = new Uint8Array([
  0x58, 0x98, 0x61, 0xfc, 0x1f, 0xec, 0xd7, 0x60, 0x9f, 0x85, 0xd3, 0x62, 0xbe, 0x37, 0x17, 0x2c,
]);
export const ROOT_IV = new Uint8Array([
  0x7f, 0x61, 0xd0, 0x52, 0x75, 0xc1, 0x39, 0x52, 0x08, 0x2e, 0x54, 0x1d, 0x8a, 0x78, 0x63, 0x4d,
]);

export const SERVICE = "00000010-0000-fff7-fff6-fff5fff4fff0";
export const CHAR_RX = "0000fff6-0000-1000-8000-00805f9b34fb";
export const CHAR_TX = "0000fff5-0000-1000-8000-00805f9b34fb";
export const CHAR_TX_ALT = "0000fff7-0000-1000-8000-00805f9b34fb";

const SBOX = [
  0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76, 0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0, 0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15, 0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75, 0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84, 0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf, 0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8, 0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2, 0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73, 0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb, 0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79, 0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08, 0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a, 0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e, 0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf, 0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16,
];
const INV_SBOX = (() => {
  const t = new Uint8Array(256);
  for (let i = 0; i < 256; i++) t[SBOX[i]] = i;
  return t;
})();
const RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];
const xt = (a) => ((a << 1) ^ (a & 0x80 ? 0x1b : 0)) & 0xff;

export function parseMac(mac) {
  if (mac instanceof Uint8Array) return Uint8Array.from(mac);
  const s = String(mac).replace(/[^0-9a-f]/gi, "");
  if (s.length !== 12) throw new Error("MAC invalide: " + mac);
  const out = new Uint8Array(6);
  for (let i = 0; i < 6; i++) out[i] = parseInt(s.slice(i * 2, i * 2 + 2), 16);
  return out;
}

export function deriveKeyIv(mac) {
  const salt = Uint8Array.from(parseMac(mac)).reverse();
  const key = new Uint8Array(ROOT_KEY);
  const iv = new Uint8Array(ROOT_IV);
  for (let i = 0; i < 6; i++) {
    key[i] = (ROOT_KEY[i] + salt[i]) % 0xff;
    iv[i] = (ROOT_IV[i] + salt[i]) % 0xff;
  }
  return { key, iv, salt };
}

function expandKey(keyBytes) {
  const w = new Uint8Array(176);
  w.set(keyBytes);
  for (let i = 4; i < 44; i++) {
    let t0 = w[4 * (i - 1)],
      t1 = w[4 * (i - 1) + 1],
      t2 = w[4 * (i - 1) + 2],
      t3 = w[4 * (i - 1) + 3];
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
        const i = 4 * c,
          a = s[i],
          b = s[i + 1],
          c2 = s[i + 2],
          d = s[i + 3];
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
      const hi = a & 0x80;
      a = (a << 1) & 0xff;
      if (hi) a ^= 0x1b;
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
        const i = 4 * c,
          a = s[i],
          b = s[i + 1],
          c2 = s[i + 2],
          d = s[i + 3];
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

/** GAN dual-align AES-128-CBC */
export function ganCrypt(data, key, iv, decrypt) {
  const res = new Uint8Array(data);
  if (res.length < 16) throw new Error("need ≥16 bytes");
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

export function toHex(buf) {
  return Array.from(buf)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function fromHex(hex) {
  const s = hex.replace(/[^0-9a-f]/gi, "");
  const out = new Uint8Array(s.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(s.slice(i * 2, i * 2 + 2), 16);
  return out;
}

export function createSession(mac) {
  const { key, iv, salt } = deriveKeyIv(mac);
  return {
    mac: parseMac(mac),
    key,
    iv,
    salt,
    decrypt: (ct) => ganCrypt(ct, key, iv, true),
    encrypt: (pt) => ganCrypt(pt, key, iv, false),
  };
}
