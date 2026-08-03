/**
 * Orientation cube → Three.js + remap moves dans le repère blanc↑ / vert→
 *
 * Convention spatiale (après calib) :
 *   U = up (blanc)   D = down
 *   R = right        L = left
 *   F = front (vert) B = back
 *
 * GAN gyro : +X rouge, +Y bleu, +Z blanc
 * Three    : +X rouge, +Y blanc, +Z vert
 */

export function quatMul(a, b) {
  return {
    w: a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z,
    x: a.w * b.x + a.x * b.w + a.y * b.z - a.z * b.y,
    y: a.w * b.y - a.x * b.z + a.y * b.w + a.z * b.x,
    z: a.w * b.z + a.x * b.y - a.y * b.x + a.z * b.w,
  };
}

export function quatConj(q) {
  return { w: q.w, x: -q.x, y: -q.y, z: -q.z };
}

export function quatNorm(q) {
  const n = Math.hypot(q.x, q.y, q.z, q.w) || 1;
  return { x: q.x / n, y: q.y / n, z: q.z / n, w: q.w / n };
}

export const IDENTITY = { x: 0, y: 0, z: 0, w: 1 };
export const FACES = "URFDLB";

/** normales outward des faces hardware, dans l'espace Three (après ganToThree) */
const HW_NORMALS = [
  [0, 1, 0], // U
  [1, 0, 0], // R
  [0, 0, 1], // F
  [0, -1, 0], // D
  [-1, 0, 0], // L
  [0, 0, -1], // B
];

/** axes spatiaux = mêmes normales pour URFDLB dans le repère home */
const AXIS_FACES = HW_NORMALS;

/**
 * GAN → Three (Y-up blanc, Z-front vert).
 * Remap composants (cubing.js) : [x,y,z] = [-y, z, -x]
 * Évite les bugs de change-of-basis matriciel.
 */
export function ganToThree(q) {
  const n = quatNorm(q);
  return quatNorm({ x: -n.y, y: n.z, z: -n.x, w: n.w });
}

function rotateVec(q, v) {
  // q * (0,v) * q^{-1}
  const p = { w: 0, x: v[0], y: v[1], z: v[2] };
  const r = quatMul(quatMul(q, p), quatConj(q));
  return [r.x, r.y, r.z];
}

function nearestFace(v) {
  let best = 0,
    bestDot = -Infinity;
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

/**
 * Tracker d'orientation + table hw→spatial (blanc↑ vert→).
 */
export class OrientationTracker {
  constructor() {
    this._rawGan = IDENTITY;
    this._three = IDENTITY;
    this._homeInv = IDENTITY;
    this._calibrated = false;
    /** @type {number[]} hwFace → spatialFace (URFDLB index) */
    this.faceMap = [0, 1, 2, 3, 4, 5];
    /** flip sens CW/CCW par face hw si besoin */
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

    // Chaque normale hw dans le world Three → axe spatial le plus proche
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

    return { display: this.display(), faceMap: map.slice(), faces: map.map((f) => FACES[f]) };
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
    const faceCh = FACES[spatial];
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
}
