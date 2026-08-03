/**
 * 2×2 — CP/CO only
 * Positions: 0 UFR, 1 UFL, 2 UBL, 3 UBR, 4 DFR, 5 DFL, 6 DBL, 7 DBR
 */
export const U = 0,
  R = 1,
  F = 2,
  D = 3,
  L = 4,
  B = 5;

/** cycle + ori delta when piece arrives at each cycle slot */
const DEFS = {
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
  B2: { swaps: [[2, 7], [3, 6]] },
};

const CORNER_COLS = [
  [U, R, F],
  [U, F, L],
  [U, L, B],
  [U, B, R],
  [D, F, R],
  [D, L, F],
  [D, B, L],
  [D, R, B],
];
const SLOT_FACES = CORNER_COLS;

export class Cube2x2 {
  constructor() {
    this.reset();
  }

  reset() {
    this.cp = [0, 1, 2, 3, 4, 5, 6, 7];
    this.co = [0, 0, 0, 0, 0, 0, 0, 0];
  }

  clone() {
    const c = new Cube2x2();
    c.cp = this.cp.slice();
    c.co = this.co.slice();
    return c;
  }

  equals(other) {
    if (!other?.cp) return false;
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
    const parts = String(alg)
      .trim()
      .split(/\s+/)
      .filter(Boolean);
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
    if (!after?.cp) return null;
    let found = null;
    for (const m of Cube2x2.allMoves()) {
      const c = this.clone();
      c.applyMove(m);
      if (c.equals(after)) {
        if (found) return null; // ambigu
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
}

export const FACE_HEX = {
  [U]: "#f2f2f0",
  [R]: "#d62828",
  [F]: "#2a9d4a",
  [D]: "#e6c200",
  [L]: "#e07a1f",
  [B]: "#1f6feb",
};