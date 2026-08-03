/**
 * Scramble 2×2 random-state style WCA (URF, coin DBL fixe).
 * État aléatoire + IDA* → inverse. Filtre distance ≥ 4.
 */
import { Cube2x2 } from "./cube2x2.js";

const MOVES = ["U", "U'", "U2", "R", "R'", "R2", "F", "F'", "F2"];
const MIN_DIST = 4;

export function invertMove(m) {
  if (m.endsWith("2")) return m;
  if (m.endsWith("'")) return m.slice(0, -1);
  return m + "'";
}

export function invertAlg(alg) {
  return String(alg)
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .reverse()
    .map(invertMove)
    .join(" ");
}

export function parseAlg(alg) {
  return String(alg)
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

export function applyAlg(cube, alg) {
  for (const m of parseAlg(alg)) cube.applyMove(m);
  return cube;
}

function moveAmt(m) {
  if (m.endsWith("2")) return 2;
  if (m.endsWith("'")) return 3;
  return 1;
}

function moveFromAmt(face, a) {
  a = ((a % 4) + 4) % 4;
  if (a === 0) return null;
  if (a === 1) return face;
  if (a === 2) return face + "2";
  return face + "'";
}

/**
 * Compress HTM consecutive same-face: U U → U2, F' F' → F2, R R' → ∅.
 * @param {string[]} list
 * @returns {string[]}
 */
export function mergeMoves(list) {
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
    const j = (rng() * (i + 1)) | 0;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** état aléatoire avec DBL (pos 6) résolu — atteignable en URF */
export function randomState(rng = defaultRng) {
  const mobiles = [0, 1, 2, 3, 4, 5, 7];
  const perm = shuffle(mobiles.slice(), rng);
  const cp = [0, 0, 0, 0, 0, 0, 6, 0];
  const slots = [0, 1, 2, 3, 4, 5, 7];
  for (let i = 0; i < 7; i++) cp[slots[i]] = perm[i];

  const co = [0, 0, 0, 0, 0, 0, 0, 0];
  let sum = 0;
  for (let i = 0; i < 6; i++) {
    co[slots[i]] = (rng() * 3) | 0;
    sum += co[slots[i]];
  }
  co[slots[6]] = (3 - (sum % 3)) % 3;
  return { cp, co };
}

function isSolvedCpCo(cp, co) {
  for (let i = 0; i < 8; i++) if (cp[i] !== i || co[i] !== 0) return false;
  return true;
}

/** #coins non résolus (hors DBL fixe) — borne inférieure HTM */
function h(cp, co) {
  let bad = 0;
  for (let i = 0; i < 8; i++) {
    if (i === 6) continue;
    if (cp[i] !== i || co[i] !== 0) bad++;
  }
  return (bad + 3) >> 2; // ceil(bad/4)
}

/** IDA* URF → solved */
export function solveURF(cp0, co0, maxDepth = 11) {
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

/**
 * Random-state URF (comme TNoodle 2×2, filtre dist ≥ 4).
 * @returns {{ scramble: string, state: {cp:number[], co:number[]}, dist: number }}
 */
export function scramble2x2Official(rng = defaultRng) {
  for (let attempt = 0; attempt < 40; attempt++) {
    const st = randomState(rng);
    const sol = solveURF(st.cp, st.co, 11);
    if (!sol || sol.length < MIN_DIST) continue;
    const scramble = invertAlg(sol.join(" "));
    return {
      scramble,
      state: { cp: st.cp.slice(), co: st.co.slice() },
      dist: sol.length,
    };
  }
  const st = randomState(rng);
  const sol = solveURF(st.cp, st.co, 11) || ["R", "U", "R'", "U'", "F", "R", "U", "R'", "U'", "F'"];
  return {
    scramble: invertAlg(sol.join(" ")),
    state: { cp: st.cp.slice(), co: st.co.slice() },
    dist: sol.length,
  };
}

export function scramble2x2() {
  return scramble2x2Official().scramble;
}

export function statesEqual(a, b) {
  if (!a?.cp || !b?.cp) return false;
  for (let i = 0; i < 8; i++) {
    if (a.cp[i] !== b.cp[i] || a.co[i] !== b.co[i]) return false;
  }
  return true;
}

export function stateAfterScramble(scramble) {
  const c = new Cube2x2();
  applyAlg(c, scramble);
  return { cp: c.cp.slice(), co: c.co.slice() };
}
