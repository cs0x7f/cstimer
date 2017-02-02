/*

scramble_333.js

3x3x3 Solver / Scramble Generator in Javascript.

The core 3x3x3 code is from a min2phase solver by Shuang Chen.
Compiled to Javascript using GWT.
(There may be a lot of redundant code right now, but it's still really fast.)

 */
"use strict";

var scramble_333 = (function(getNPerm, get8Perm, setNPerm, set8Perm, getNParity, getPruning, Cnk, fact, rn, rndEl) {

	var Ux1 = 0, Ux2 = 1, Ux3 = 2, 
		Rx1 = 3, Rx2 = 4, Rx3 = 5, 
		Fx1 = 6, Fx2 = 7, Fx3 = 8, 
		Dx1 = 9, Dx2 = 10, Dx3 = 11, 
		Lx1 = 12, Lx2 = 13, Lx3 = 14, 
		Bx1 = 15, Bx2 = 16, Bx3 = 17;

	function createArray(length1, length2) {
		var result, i;
		result = [];
		if (length2 != undefined) {
			for (i = 0; i < length1; i++) {
				result[i] = [];
			}
		}
		return result;
	}

	function CoordCube_$clinit() {
		UDSliceMove = createArray(495, 18);
		TwistMove = createArray(324, 18);
		FlipMove = createArray(336, 18);
		UDSliceConj = createArray(495, 8);
		UDSliceTwistPrun = createArray(20048);
		UDSliceFlipPrun = createArray(20790);
		CPermMove = createArray(2768, 18);
		EPermMove = createArray(2768, 10);
		MPermMove = createArray(24, 10);
		MPermConj = createArray(24, 16);
		MCPermPrun = createArray(8304);
		MEPermPrun = createArray(8304);
	}

	function initMPermMoveConj() {
		var c, d, i, j;
		c = new CubieCube;
		d = new CubieCube;
		for (i = 0; i < 24; ++i) {
			setComb(c.ep, i << 9);
			for (j = 0; j < 10; ++j) {
				EdgeMult(c, moveCube[ud2std[j]], d);
				MPermMove[i][j] = getComb(d.ep, 8) >> 9;
			}
			for (j = 0; j < 16; ++j) {
				EdgeConjugate(c, SymInv[j], d);
				MPermConj[i][j] = getComb(d.ep, 8) >> 9;
			}
		}
	}

	function initRawSymPrun(PrunTable, INV_DEPTH, RawMove, RawConj, SymMove, SymState, SymSwitch, moveMap, SYM_SHIFT) {
		var N_MOVES, N_RAW, N_SIZE, N_SYM, SYM_MASK, check, depth, done, end, i, idx, idxx, inv, j, m, raw, rawx, select, sym, symState, symx, val, fill, len;
		SYM_MASK = (1 << SYM_SHIFT) - 1;
		N_RAW = RawMove.length;
		N_SYM = SymMove.length;
		N_SIZE = N_RAW * N_SYM;
		N_MOVES = RawMove[0].length;
		for (i = 0, len = (N_RAW * N_SYM + 7) >> 3; i < len; ++i) {
			PrunTable[i] = -1;
		}
		PrunTable[0] ^= 15;
		depth = 0;
		done = 1;
		while (done < N_SIZE) {
			inv = depth > INV_DEPTH;
			select = inv ? 15 : depth;
			check = inv ? depth : 15;
			++depth;
			fill = depth ^ 15;
			for (i = 0; i < N_SIZE;) {
				val = PrunTable[i >> 3];
				if (!inv && val == -1) {
					i += 8;
					continue;
				}
				for (end = i + 8 < N_SIZE ? i + 8 : N_SIZE; i < end; ++i, val >>= 4) {
					if ((val & 15) != select) {
						continue;
					}
					raw = i % N_RAW;
					sym = ~~(i / N_RAW);
					for (m = 0; m < N_MOVES; ++m) {
						symx = SymMove[sym][moveMap == null ? m : moveMap[m]];
						rawx = RawConj[RawMove[raw][m] & 511][symx & SYM_MASK];
						symx >>>= SYM_SHIFT;
						idx = symx * N_RAW + rawx;
						if ((PrunTable[idx >> 3] >> ((idx & 7) << 2) & 15) != check) {
							continue;
						}
						++done;
						if (inv) {
							PrunTable[i >> 3] ^= fill << ((i & 7) << 2);
							break;
						}
						PrunTable[idx >> 3] ^= fill << ((idx & 7) << 2);
						for (j = 1, symState = SymState[symx];
							(symState >>= 1) != 0; ++j) {
							if ((symState & 1) == 1) {
								idxx = symx * N_RAW + RawConj[rawx][j ^ (SymSwitch == null ? 0 : SymSwitch[j])];
								if ((PrunTable[idxx >> 3] >> ((idxx & 7) << 2) & 15) == 15) {
									PrunTable[idxx >> 3] ^= fill << ((idxx & 7) << 2);
									++done;
								}
							}
						}
					}
				}
			}
			//		console.log(done);
		}
	}

	function initMoveTable(MoveTable, SIZE, S2RArray, setIdx, getIdx, isEdge, isPhase2) {
		var c, d, i, j, N_MOVES = isPhase2 ? 10 : 18;
		c = new CubieCube;
		d = new CubieCube;
		for (i = 0; i < SIZE; ++i) {
			setIdx(c, S2RArray[i]);
			for (j = 0; j < N_MOVES; ++j) {
				(isEdge ? EdgeMult : CornMult)(c, moveCube[isPhase2 ? ud2std[j] : j], d);
				MoveTable[i][j] = getIdx(d);
			}
		}
	}

	function initUDSliceMoveConj() {
		var c, cx, d, i, j, k, udslice;
		c = new CubieCube;
		d = new CubieCube;
		for (i = 0; i < 495; ++i) {
			setComb(c.ep, i);
			for (j = 0; j < 18; j += 3) {
				EdgeMult(c, moveCube[j], d);
				UDSliceMove[i][j] = getComb(d.ep, 8);
			}
			for (j = 0; j < 16; j += 2) {
				EdgeConjugate(c, SymInv[j], d);
				UDSliceConj[i][j >>> 1] = getComb(d.ep, 8) & 511;
			}
		}
		for (i = 0; i < 495; ++i) {
			for (j = 0; j < 18; j += 3) {
				udslice = UDSliceMove[i][j];
				for (k = 1; k < 3; ++k) {
					cx = UDSliceMove[udslice & 511][j];
					udslice = permMult[udslice >>> 9][cx >>> 9] << 9 | cx & 511;
					UDSliceMove[i][j + k] = udslice;
				}
			}
		}
	}

	var CPermMove, EPermMove, FlipMove, MCPermPrun, MEPermPrun, MPermConj, MPermMove, TwistMove, UDSliceConj, UDSliceFlipPrun, UDSliceMove, UDSliceTwistPrun;

	function CubieCube_$clinit() {
		CubeSym = createArray(16);
		moveCube = createArray(18);
		SymInv = createArray(16);
		SymMult = createArray(16, 16);
		SymMove = createArray(16, 18);
		Sym8Mult = createArray(8, 8);
		Sym8Move = createArray(8, 18);
		Sym8MultInv = createArray(8, 8);
		SymMoveUD = createArray(16, 10);
		FlipS2R = createArray(336);
		TwistS2R = createArray(324);
		epermS2R = createArray(2768);
		e2c = [0, 0, 0, 0, 1, 3, 1, 3, 1, 3, 1, 3, 0, 0, 0, 0];
		MtoEPerm = createArray(70, 576);
		SymStateTwist = createArray(324);
		SymStateFlip = createArray(336);
		SymStatePerm = createArray(2768);
		urf1 = new CubieCube1(2531, 1373, 67026819, 1367);
		urf2 = new CubieCube1(2089, 1906, 322752913, 2040);
		urfMove = [
			[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
			[6, 7, 8, 0, 1, 2, 3, 4, 5, 15, 16, 17, 9, 10, 11, 12, 13, 14],
			[3, 4, 5, 6, 7, 8, 0, 1, 2, 12, 13, 14, 15, 16, 17, 9, 10, 11],
			[2, 1, 0, 5, 4, 3, 8, 7, 6, 11, 10, 9, 14, 13, 12, 17, 16, 15],
			[8, 7, 6, 2, 1, 0, 5, 4, 3, 17, 16, 15, 11, 10, 9, 14, 13, 12],
			[5, 4, 3, 8, 7, 6, 2, 1, 0, 14, 13, 12, 17, 16, 15, 11, 10, 9]
		];
	}

	function CubieCube_$$init(obj) {
		obj.cp = [0, 1, 2, 3, 4, 5, 6, 7];
		obj.co = [0, 0, 0, 0, 0, 0, 0, 0];
		obj.ep = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
		obj.eo = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	}

	function $copy(obj, c) {
		var i;
		for (i = 0; i < 8; ++i) {
			obj.cp[i] = c.cp[i];
			obj.co[i] = c.co[i];
		}
		for (i = 0; i < 12; ++i) {
			obj.ep[i] = c.ep[i];
			obj.eo[i] = c.eo[i];
		}
	}

	function $getCPermSym(obj) {
		var idx, k;
		if (epermR2S !== null) {
			idx = epermR2S[get8Perm(obj.cp)];
			return idx ^ e2c[idx & 15];
		}
		obj.temps || (obj.temps = new CubieCube);
		for (k = 0; k < 16; ++k) {
			cornConjugate(obj, SymInv[k], obj.temps);
			idx = binarySearch(epermS2R, get8Perm(obj.temps.cp));
			if (idx != 65535) {
				return (idx << 4 | k);
			}
		}
		return 0;
	}

	function $getEPermSym(obj) {
		return epermR2S[get8Perm(obj.ep)];
	}

	function $getFlip(obj) {
		var i, idx;
		idx = 0;
		for (i = 0; i < 11; ++i) {
			idx <<= 1;
			idx |= obj.eo[i];
		}
		return idx;
	}

	function $getFlipSym(obj) {
		return FlipR2S[$getFlip(obj)];
	}

	function $getTwist(obj) {
		var i, idx;
		idx = 0;
		for (i = 0; i < 7; ++i) {
			idx *= 3;
			idx += obj.co[i];
		}
		return idx;
	}

	function $getTwistSym(obj) {
		return TwistR2S[$getTwist(obj)];
	}

	function $invCubieCube(obj) {
		var corn, edge, ori;
		for (edge = 0; edge < 12; ++edge)
			obj.temps.ep[obj.ep[edge]] = edge;
		for (edge = 0; edge < 12; ++edge)
			obj.temps.eo[edge] = obj.eo[obj.temps.ep[edge]];
		for (corn = 0; corn < 8; ++corn)
			obj.temps.cp[obj.cp[corn]] = corn;
		for (corn = 0; corn < 8; ++corn) {
			ori = obj.co[obj.temps.cp[corn]];
			obj.temps.co[corn] = -ori;
			obj.temps.co[corn] < 0 && (obj.temps.co[corn] = obj.temps.co[corn] + 3);
		}
		$copy(obj, obj.temps);
	}

	function $setCPerm(obj, idx) {
		set8Perm(obj.cp, idx);
	}

	function $setEPerm(obj, idx) {
		set8Perm(obj.ep, idx);
	}

	function $setFlip(obj, idx) {
		var i, parity;
		parity = 0;
		for (i = 10; i >= 0; --i) {
			parity ^= obj.eo[i] = (idx & 1);
			idx >>= 1;
		}
		obj.eo[11] = parity;
	}

	function $setTwist(obj, idx) {
		var i, twst;
		twst = 0;
		for (i = 6; i >= 0; --i) {
			twst += obj.co[i] = idx % 3;
			idx = ~~(idx / 3);
		}
		obj.co[7] = (15 - twst) % 3;
	}

	function cornConjugate(a, idx, b) {
		var corn, oriA, oriB, s, sinv;
		sinv = CubeSym[SymInv[idx]];
		s = CubeSym[idx];
		for (corn = 0; corn < 8; ++corn) {
			b.cp[corn] = sinv.cp[a.cp[s.cp[corn]]];
			oriA = sinv.co[a.cp[s.cp[corn]]];
			oriB = a.co[s.cp[corn]];
			b.co[corn] = oriA < 3 ? oriB : (3 - oriB) % 3;
		}
	}

	function CornMult(a, b, prod) {
		var corn, ori, oriA, oriB;
		for (corn = 0; corn < 8; ++corn) {
			prod.cp[corn] = a.cp[b.cp[corn]];
			oriA = a.co[b.cp[corn]];
			oriB = b.co[corn];
			ori = oriA;
			ori += oriA < 3 ? oriB : 6 - oriB;
			ori %= 3;
			((oriA >= 3) !== (oriB >= 3)) && (ori += 3);
			prod.co[corn] = ori;
		}
	}

	function CubieCube() {
		CubieCube_$$init(this);
	}

	function CubieCube1(cperm, twist, eperm, flip) {
		CubieCube_$$init(this);
		set8Perm(this.cp, cperm);
		$setTwist(this, twist);
		setNPerm(this.ep, eperm, 12);
		$setFlip(this, flip);
	}

	function CubieCube2(c) {
		CubieCube_$$init(this);
		$copy(this, c);
	}

	function EdgeConjugate(a, idx, b) {
		var ed, s, sinv;
		sinv = CubeSym[SymInv[idx]];
		s = CubeSym[idx];
		for (ed = 0; ed < 12; ++ed) {
			b.ep[ed] = sinv.ep[a.ep[s.ep[ed]]];
			b.eo[ed] = s.eo[ed] ^ a.eo[s.ep[ed]] ^ sinv.eo[a.ep[s.ep[ed]]];
		}
	}

	function EdgeMult(a, b, prod) {
		var ed;
		for (ed = 0; ed < 12; ++ed) {
			prod.ep[ed] = a.ep[b.ep[ed]];
			prod.eo[ed] = b.eo[ed] ^ a.eo[b.ep[ed]];
		}
	}

	function initFlipSym2Raw() {
		var c, count, d, i, idx, occ, s;
		c = new CubieCube;
		d = new CubieCube;
		occ = createArray(64);
		count = 0;
		for (i = 0; i < 64; occ[i++] = 0) {}
		FlipR2S = createArray(2048);
		for (i = 0; i < 2048; ++i) {
			if ((occ[i >> 5] & 1 << (i & 31)) == 0) {
				$setFlip(c, i);
				for (s = 0; s < 16; s += 2) {
					EdgeConjugate(c, s, d);
					idx = $getFlip(d);
					idx == i && (SymStateFlip[count] |= 1 << (s >> 1));
					occ[idx >> 5] |= 1 << (idx & 31);
					FlipR2S[idx] = count << 3 | s >> 1;
				}
				FlipS2R[count++] = i;
			}
		}
	}

	function initMove() {
		var a, p;
		moveCube[0] = new CubieCube1(15120, 0, 119750400, 0);
		moveCube[3] = new CubieCube1(21021, 1494, 323403417, 0);
		moveCube[6] = new CubieCube1(8064, 1236, 29441808, 550);
		moveCube[9] = new CubieCube1(9, 0, 5880, 0);
		moveCube[12] = new CubieCube1(1230, 412, 2949660, 0);
		moveCube[15] = new CubieCube1(224, 137, 328552, 137);
		for (a = 0; a < 18; a += 3) {
			for (p = 0; p < 2; ++p) {
				moveCube[a + p + 1] = new CubieCube;
				EdgeMult(moveCube[a + p], moveCube[a], moveCube[a + p + 1]);
				CornMult(moveCube[a + p], moveCube[a], moveCube[a + p + 1]);
			}
		}
	}

	function initPermSym2Raw() {
		var a, b, c, count, d, i, idx, occ, s;
		c = new CubieCube;
		d = new CubieCube;
		occ = createArray(1260);
		count = 0;
		for (i = 0; i < 1260; occ[i++] = 0) {}
		epermR2S = createArray(40320);
		for (i = 0; i < 40320; ++i) {
			if ((occ[i >> 5] & 1 << (i & 31)) == 0) {
				set8Perm(c.ep, i);
				for (s = 0; s < 16; ++s) {
					EdgeConjugate(c, s, d);
					idx = get8Perm(d.ep);
					idx == i && (SymStatePerm[count] |= 1 << s);
					occ[idx >> 5] |= 1 << (idx & 31);
					a = getComb(d.ep, 0);
					b = getComb(d.ep, 4) >> 9;
					MtoEPerm[494 - (a & 511)][(a >> 9) + b * 24] = epermR2S[idx] = count << 4 | s;
				}
				epermS2R[count++] = i;
			}
		}
	}

	function initSym() {
		var c, d, f2, i, j, k, lr2, m, s, t, u4;
		c = new CubieCube;
		d = new CubieCube;
		f2 = new CubieCube1(28783, 0, 259268407, 0);
		u4 = new CubieCube1(15138, 0, 119765538, 7);
		lr2 = new CubieCube1(5167, 0, 83473207, 0);
		lr2.co = [3, 3, 3, 3, 3, 3, 3, 3];
		for (i = 0; i < 16; ++i) {
			CubeSym[i] = new CubieCube2(c);
			CornMult(c, u4, d);
			EdgeMult(c, u4, d);
			t = d;
			d = c;
			c = t;
			if (i % 4 == 3) {
				CornMult(t, lr2, d);
				EdgeMult(t, lr2, d);
				t = d;
				d = c;
				c = t;
			}
			if (i % 8 == 7) {
				CornMult(t, f2, d);
				EdgeMult(t, f2, d);
				t = d;
				d = c;
				c = t;
			}
		}
		for (i = 0; i < 16; ++i) {
			for (j = 0; j < 16; ++j) {
				CornMult(CubeSym[i], CubeSym[j], c);
				for (k = 0; k < 16; ++k) {
					if (CubeSym[k].cp[0] == c.cp[0] && CubeSym[k].cp[1] == c.cp[1] && CubeSym[k].cp[2] == c.cp[2]) {
						SymMult[i][j] = k;
						k == 0 && (SymInv[i] = j);
						break;
					}
				}
			}
		}
		for (j = 0; j < 18; ++j) {
			for (s = 0; s < 16; ++s) {
				cornConjugate(moveCube[j], SymInv[s], c);
				CONTINUE: for (m = 0; m < 18; ++m) {
					for (i = 0; i < 8; i += 2) {
						if (c.cp[i] != moveCube[m].cp[i]) {
							continue CONTINUE;
						}
					}
					SymMove[s][j] = m;
					break;
				}
			}
		}
		for (j = 0; j < 10; ++j) {
			for (s = 0; s < 16; ++s) {
				SymMoveUD[s][j] = std2ud[SymMove[s][ud2std[j]]];
			}
		}
		for (j = 0; j < 8; ++j) {
			for (s = 0; s < 8; ++s) {
				Sym8Mult[j][s] = SymMult[j << 1][s << 1] >> 1;
				Sym8MultInv[j][s] = SymMult[j << 1][SymInv[s << 1]] >> 1;
			}
		}
		for (j = 0; j < 18; ++j) {
			for (s = 0; s < 8; ++s) {
				Sym8Move[s][j] = SymMove[s << 1][j];
			}
		}
	}

	function initTwistSym2Raw() {
		var c, count, d, i, idx, occ, s;
		c = new CubieCube;
		d = new CubieCube;
		occ = createArray(69);
		count = 0;
		for (i = 0; i < 69; occ[i++] = 0) {}
		TwistR2S = createArray(2187);
		for (i = 0; i < 2187; ++i) {
			if ((occ[i >> 5] & 1 << (i & 31)) == 0) {
				$setTwist(c, i);
				for (s = 0; s < 16; s += 2) {
					cornConjugate(c, s, d);
					idx = $getTwist(d);
					idx == i && (SymStateTwist[count] = (SymStateTwist[count] | 1 << (s >> 1)));
					occ[idx >> 5] |= 1 << (idx & 31);
					TwistR2S[idx] = (count << 3 | s >> 1);
				}
				TwistS2R[count++] = i;
			}
		}
	}

	var _ = CubieCube2.prototype = CubieCube1.prototype = CubieCube.prototype;
	_.temps = null;
	var CubeSym, epermR2S = null,
		epermS2R, FlipR2S = null,
		FlipS2R, MtoEPerm, Sym8Move, Sym8Mult, Sym8MultInv, SymInv, SymMove, SymMoveUD, SymMult, SymStateFlip, SymStatePerm, SymStateTwist, TwistR2S = null,
		TwistS2R, e2c, moveCube, urf1, urf2, urfMove;

	function $initPhase2(obj) {
		var cidx, csym, cx, d4e, depth2, edge, esym, i, lm, m, mid, prun, u4e;
		if (+new Date > (obj.solution == null ? obj.timeOut : obj.timeMin)) {
			return 0;
		}
		obj.valid2 = Math.min(obj.valid2, obj.valid1);
		cidx = obj.corn[obj.valid1] >>> 4;
		csym = obj.corn[obj.valid1] & 15;
		for (i = obj.valid1; i < obj.depth1; ++i) {
			m = obj.move[i];
			cidx = CPermMove[cidx][SymMove[csym][m]];
			csym = SymMult[cidx & 15][csym];
			cidx >>>= 4;
			obj.corn[i + 1] = cidx << 4 | csym;
			cx = UDSliceMove[obj.mid4[i] & 511][m];
			obj.mid4[i + 1] = permMult[obj.mid4[i] >>> 9][cx >>> 9] << 9 | cx & 511;
		}
		obj.valid1 = obj.depth1;
		mid = obj.mid4[obj.depth1] >>> 9;
		prun = getPruning(MCPermPrun, cidx * 24 + MPermConj[mid][csym]);
		if (prun >= obj.maxDep2) {
			return prun > obj.maxDep2 ? 2 : 1;
		}
		u4e = obj.ud8e[obj.valid2] >>> 16;
		d4e = obj.ud8e[obj.valid2] & 65535;
		for (i = obj.valid2; i < obj.depth1; ++i) {
			m = obj.move[i];
			cx = UDSliceMove[u4e & 511][m];
			u4e = permMult[u4e >>> 9][cx >>> 9] << 9 | cx & 511;
			cx = UDSliceMove[d4e & 511][m];
			d4e = permMult[d4e >>> 9][cx >>> 9] << 9 | cx & 511;
			obj.ud8e[i + 1] = u4e << 16 | d4e;
		}
		obj.valid2 = obj.depth1;
		edge = MtoEPerm[494 - (u4e & 511)][(u4e >>> 9) + (d4e >>> 9) * 24];
		esym = edge & 15;
		edge >>>= 4;
		prun = Math.max(getPruning(MEPermPrun, edge * 24 + MPermConj[mid][esym]), prun);
		if (prun >= obj.maxDep2) {
			return prun > obj.maxDep2 ? 2 : 1;
		}

		lm = 10;
		if (obj.depth1 > 2 && ~~(obj.move[obj.depth1 - 1] / 3) % 3 == ~~(obj.move[obj.depth1 - 2] / 3) % 3) {
			lm = std2ud[~~(Math.max(obj.move[obj.depth1 - 1], obj.move[obj.depth1 - 2]) / 3) * 3 + 1];
		} else if (obj.depth1 > 1) {
			lm = std2ud[~~(obj.move[obj.depth1 - 1] / 3) * 3 + 1];
			if (obj.move[obj.depth1 - 1] > 8) {
				lm = -lm;
			}
		}

		for (depth2 = obj.maxDep2 - 1; depth2 >= prun; --depth2) {
			var ret = $phase2(obj, edge, esym, cidx, csym, mid, depth2, obj.depth1, lm);
			if (ret < 0) {
				break;
			}
			depth2 = depth2 - ret;
			obj.sol = obj.depth1 + depth2;
			if (obj.preIdx != 0) {
				var preMove = [-1, 3, 5, 6, 8, 12, 14, 15, 17];
				var axisPre = ~~(preMove[obj.preIdx] / 3);
				var axisLast = ~~(obj.move[obj.sol - 1] / 3);
				if (axisPre == axisLast) {
					var pow = (preMove[obj.preIdx] % 3 + obj.move[obj.sol - 1] % 3 + 1) % 4;
					obj.move[obj.sol - 1] = axisPre * 3 + pow;
				} else if (depth2 > 1 && axisPre % 3 == axisLast % 3 && ~~(obj.move[obj.sol - 2] / 3) == axisPre) {
					var pow = (preMove[obj.preIdx] % 3 + obj.move[obj.sol - 2] % 3 + 1) % 4;
					obj.move[obj.sol - 2] = axisPre * 3 + pow;
				} else {
					obj.move[obj.sol++] = preMove[obj.preIdx];
				}
			}
			obj.solution = $solutionToString(obj);
		}

		if (depth2 != obj.maxDep2 - 1) { //At least one solution has been found.
			obj.maxDep2 = Math.min(12, obj.sol - obj.depth1);
			return (+new Date > obj.timeMin) ? 0 : 1;
		} else {
			return 1;
		}
	}

	function $phase1(obj, twist, tsym, flip, fsym, slice, maxl, lm) {
		var axis, flipx, fsymx, m, power, prun, ret, slicex, tsymx, twistx;
		if (twist == 0 && flip == 0 && slice == 0 && maxl < 5) {
			return maxl == 0 ? $initPhase2(obj) : 1;
		}
		for (axis = 0; axis < 18; axis += 3) {
			if (axis == lm || axis == lm - 9) {
				continue;
			}
			for (power = 0; power < 3; ++power) {
				m = axis + power;
				slicex = UDSliceMove[slice][m] & 511;
				twistx = TwistMove[twist][Sym8Move[tsym][m]];
				tsymx = Sym8Mult[twistx & 7][tsym];
				twistx >>>= 3;
				prun = getPruning(UDSliceTwistPrun, twistx * 495 + UDSliceConj[slicex][tsymx]);
				if (prun > maxl) {
					break;
				} else if (prun == maxl) {
					continue;
				}
				flipx = FlipMove[flip][Sym8Move[fsym][m]];
				fsymx = Sym8Mult[flipx & 7][fsym];
				flipx >>>= 3;
				prun = getPruning(UDSliceFlipPrun, flipx * 495 + UDSliceConj[slicex][fsymx]);
				if (prun > maxl) {
					break;
				} else if (prun == maxl) {
					continue;
				}
				obj.move[obj.depth1 - maxl] = m;
				obj.valid1 = Math.min(obj.valid1, obj.depth1 - maxl);
				ret = $phase1(obj, twistx, tsymx, flipx, fsymx, slicex, maxl - 1, axis);
				if (ret != 1) {
					return ret >> 1;
				}
			}
		}
		return 1;
	}

	function $phase2(obj, eidx, esym, cidx, csym, mid, maxl, depth, lm) {
		var cidxx, csymx, eidxx, esymx, m, midx;
		if (eidx == 0 && cidx == 0 && mid == 0) {
			return maxl;
		}
		for (m = 0; m < 10; ++m) {
			if (lm < 0 ? (m == -lm) : ckmv2[lm][m]) {
				continue;
			}
			midx = MPermMove[mid][m];
			cidxx = CPermMove[cidx][SymMove[csym][ud2std[m]]];
			csymx = SymMult[cidxx & 15][csym];
			cidxx >>>= 4;
			if (getPruning(MCPermPrun, cidxx * 24 + MPermConj[midx][csymx]) >= maxl) {
				continue;
			}
			eidxx = EPermMove[eidx][SymMoveUD[esym][m]];
			esymx = SymMult[eidxx & 15][esym];
			eidxx >>>= 4;
			if (getPruning(MEPermPrun, eidxx * 24 + MPermConj[midx][esymx]) >= maxl) {
				continue;
			}
			var ret = $phase2(obj, eidxx, esymx, cidxx, csymx, midx, maxl - 1, depth + 1, (lm < 0 && m + lm == -5) ? -lm : m);
			if (ret >= 0) {
				obj.move[depth] = ud2std[m];
				return ret;
			}
		}
		return -1;
	}

	function $solution(obj, facelets, maxDepth, timeOut, timeMin, verbose) {
		Search_$verify(obj, facelets);
		obj.sol = (maxDepth || 21) + 1;
		obj.timeOut = +new Date + (timeOut || 10000);
		obj.timeMin = obj.timeOut + Math.min((timeMin || 50) - (timeOut || 10000), 0);
		obj.verbose = verbose || 2;
		obj.solution = null;
		return $solve(obj, obj.cc);
	}

	function $solutionToString(obj) {
		var s, sb, urf;
		sb = '';
		urf = (obj.verbose & 2) != 0 ? (obj.urfIdx + 3) % 6 : obj.urfIdx;
		if (urf < 3) {
			for (s = 0; s < obj.sol; ++s) {
				sb += move2str[urfMove[urf][obj.move[s]]] + ' ';
			}
		} else {
			for (s = obj.sol - 1; s >= 0; --s) {
				sb += move2str[urfMove[urf][obj.move[s]]] + ' ';
			}
		}
		return sb;
	}

	function $solve(obj, c) {
		var conjMask, i, j;
		conjMask = 0;

		var pc = new CubieCube;
		var preList = [
			new CubieCube, moveCube[3], moveCube[5],
			moveCube[6], moveCube[8], moveCube[12],
			moveCube[14], moveCube[15], moveCube[17]
		];

		for (i = 0; i < 6; ++i) {

			for (j = 0; j < 9; j++) {
				CornMult(preList[j], c, pc);
				EdgeMult(preList[j], c, pc);
				obj.twist[i][j] = $getTwistSym(pc);
				obj.flip[i][j] = $getFlipSym(pc);
				obj.slice[i][j] = getComb(pc.ep, 8);
				obj.corn0[i][j] = $getCPermSym(pc);
				obj.ud8e0[i][j] = getComb(pc.ep, 0) << 16 | getComb(pc.ep, 4);
			}

			!c.temps && (c.temps = new CubieCube);
			CornMult(urf2, c, c.temps);
			CornMult(c.temps, urf1, c);
			EdgeMult(urf2, c, c.temps);
			EdgeMult(c.temps, urf1, c);
			(i % 3 == 2) && $invCubieCube(c);
		}

		for (i = 0; i < 6; i++) {
			for (j = 0; j < i; j++) { //If S_i^-1 * C * S_i == C, It's unnecessary to compute it again.
				if (obj.twist[i][0] == obj.twist[j][0] && obj.flip[i][0] == obj.flip[j][0] && obj.slice[i][0] == obj.slice[j][0] && obj.corn0[i][0] == obj.corn0[j][0] && obj.ud8e0[i][0] == obj.ud8e0[j][0]) {
					conjMask |= 1 << i;
					break;
				}
			}
			if ((conjMask & (1 << i)) != 0) {
				continue;
			}
			for (j = 0; j < 9; j++) {
				obj.prun[i][j] = Math.max(
					getPruning(UDSliceTwistPrun, (obj.twist[i][j] >>> 3) * 495 + UDSliceConj[obj.slice[i][j] & 0x1ff][obj.twist[i][j] & 7]),
					getPruning(UDSliceFlipPrun, (obj.flip[i][j] >>> 3) * 495 + UDSliceConj[obj.slice[i][j] & 0x1ff][obj.flip[i][j] & 7]));
			}
		}

		for (obj.depth1 = 0; obj.depth1 < obj.sol; ++obj.depth1) {
			obj.maxDep2 = Math.min(12, obj.sol - obj.depth1);
			for (obj.urfIdx = 0; obj.urfIdx < 6; ++obj.urfIdx) {
				if ((conjMask & 1 << obj.urfIdx) != 0) {
					continue;
				}

				for (obj.preIdx = 0; obj.preIdx < 9; obj.preIdx++) {
					obj.corn[0] = obj.corn0[obj.urfIdx][obj.preIdx];
					obj.mid4[0] = obj.slice[obj.urfIdx][obj.preIdx];
					obj.ud8e[0] = obj.ud8e0[obj.urfIdx][obj.preIdx];
					obj.valid1 = obj.valid2 = 0;
					if (obj.preIdx != 0) {
						obj.depth1--;
					}
					if ((obj.prun[obj.urfIdx][obj.preIdx] <= obj.depth1) && $phase1(obj, obj.twist[obj.urfIdx][obj.preIdx] >>> 3, obj.twist[obj.urfIdx][obj.preIdx] & 7,
							obj.flip[obj.urfIdx][obj.preIdx] >>> 3, obj.flip[obj.urfIdx][obj.preIdx] & 7,
							obj.slice[obj.urfIdx][obj.preIdx] & 0x1ff, obj.depth1, -1) == 0) {
						return obj.solution == null ? "Error 8" : obj.solution;
					}
					if (obj.preIdx != 0) {
						obj.depth1++;
					}
				}
			}
		}
		return obj.solution == null ? 'Error 7' : obj.solution;
	}

	function Search_$verify(obj, facelets) {
		var count = 0, i;
		for (i = 0; i < 54; ++i) {
			switch (facelets.charCodeAt(i)) {
				case 85:
					obj.f[i] = 0;
					break;
				case 82:
					obj.f[i] = 1;
					break;
				case 70:
					obj.f[i] = 2;
					break;
				case 68:
					obj.f[i] = 3;
					break;
				case 76:
					obj.f[i] = 4;
					break;
				case 66:
					obj.f[i] = 5;
					break;
				default:
					return -1;
			}
			count += 1 << (obj.f[i] << 2);
		}
		if (count != 10066329) {
			return -1;
		}
		toCubieCube(obj.f, obj.cc);
	}

	function Search() {
		this.move = [];
		this.corn = [];
		this.mid4 = [];
		this.ud8e = [];
		this.twist = createArray(6, 9);
		this.flip = createArray(6, 9);
		this.slice = createArray(6, 9);
		this.corn0 = createArray(6, 9);
		this.ud8e0 = createArray(6, 9);
		this.prun = createArray(6, 9);
		this.f = createArray(6, 9);
		this.cc = new CubieCube;
	}

	_ = Search.prototype;
	_.depth1 = 0;
	_.maxDep2 = 0;
	_.sol = 0;
	_.solution = null;
	_.timeMin = 0;
	_.timeOut = 0;
	_.urfIdx = 0;
	_.preIdx = 0;
	_.valid1 = 0;
	_.valid2 = 0;
	_.verbose = 0;

	function Util_$clinit() {
		var arr1, arr2, arr3, i, ix, j, jx, k;
		cornerFacelet = [
			[8, 9, 20],
			[6, 18, 38],
			[0, 36, 47],
			[2, 45, 11],
			[29, 26, 15],
			[27, 44, 24],
			[33, 53, 42],
			[35, 17, 51]
		];
		edgeFacelet = [
			[5, 10],
			[7, 19],
			[3, 37],
			[1, 46],
			[32, 16],
			[28, 25],
			[30, 43],
			[34, 52],
			[23, 12],
			[21, 41],
			[50, 39],
			[48, 14]
		];
		permMult = createArray(24, 24);
		move2str = ['U ', 'U2', "U'", 'R ', 'R2', "R'", 'F ', 'F2', "F'", 'D ', 'D2', "D'", 'L ', 'L2', "L'", 'B ', 'B2', "B'"];
		ud2std = [0, 1, 2, 4, 7, 9, 10, 11, 13, 16];
		std2ud = createArray(18);
		ckmv2 = createArray(11, 10);
		for (i = 0; i < 10; ++i) {
			std2ud[ud2std[i]] = i;
		}
		for (i = 0; i < 10; ++i) {
			for (j = 0; j < 10; ++j) {
				ix = ud2std[i];
				jx = ud2std[j];
				ckmv2[i][j] = ~~(ix / 3) == ~~(jx / 3) || ~~(ix / 3) % 3 == ~~(jx / 3) % 3 && ix >= jx;
			}
			ckmv2[10][i] = false;
		}
		arr1 = createArray(4);
		arr2 = createArray(4);
		arr3 = createArray(4);
		for (i = 0; i < 24; ++i) {
			for (j = 0; j < 24; ++j) {
				setNPerm(arr1, i, 4);
				setNPerm(arr2, j, 4);
				for (k = 0; k < 4; ++k) {
					arr3[k] = arr1[arr2[k]];
				}
				permMult[i][j] = getNPerm(arr3, 4);
			}
		}
	}

	function binarySearch(arr, key) {
		var l, length, mid, r, val;
		length = arr.length;
		if (key <= arr[length - 1]) {
			l = 0;
			r = length - 1;
			while (l <= r) {
				mid = (l + r) >>> 1;
				val = arr[mid];
				if (key > val) {
					l = mid + 1;
				} else if (key < val) {
					r = mid - 1;
				} else {
					return mid;
				}
			}
		}
		return 65535;
	}

	function getComb(arr, mask) {
		var i, idxC, idxP, r, v, val;
		idxC = 0;
		idxP = 0;
		r = 4;
		val = 291;
		for (i = 11; i >= 0; --i) {
			if ((arr[i] & 12) == mask) {
				v = (arr[i] & 3) << 2;
				idxP = r * idxP + (val >> v & 15);
				val -= 273 >> 12 - v;
				idxC += Cnk[i][r--];
			}
		}
		return idxP << 9 | 494 - idxC;
	}

	function setComb(arr, idx) {
		var fill, i, idxC, idxP, m, p, r, v, val;
		r = 4;
		fill = 11;
		val = 291;
		idxC = 494 - (idx & 511);
		idxP = idx >>> 9;
		for (i = 11; i >= 0; --i) {
			if (idxC >= Cnk[i][r]) {
				idxC -= Cnk[i][r--];
				p = fact[r & 3];
				v = ~~(idxP / p) << 2;
				idxP %= p;
				arr[i] = val >> v & 3 | 8;
				m = (1 << v) - 1;
				val = (val & m) + (val >> 4 & ~m);
			} else {
				(fill & 12) == 8 && (fill -= 4);
				arr[i] = fill--;
			}
		}
	}

	function toCubieCube(f, ccRet) {
		var col1, col2, i, j, ori;
		for (i = 0; i < 8; ++i)
			ccRet.cp[i] = 0;
		for (i = 0; i < 12; ++i)
			ccRet.ep[i] = 0;
		for (i = 0; i < 8; ++i) {
			for (ori = 0; ori < 3; ++ori)
				if (f[cornerFacelet[i][ori]] == 0 || f[cornerFacelet[i][ori]] == 3)
					break;
			col1 = f[cornerFacelet[i][(ori + 1) % 3]];
			col2 = f[cornerFacelet[i][(ori + 2) % 3]];
			for (j = 0; j < 8; ++j) {
				if (col1 == ~~(cornerFacelet[j][1] / 9) && col2 == ~~(cornerFacelet[j][2] / 9)) {
					ccRet.cp[i] = j;
					ccRet.co[i] = ori % 3;
					break;
				}
			}
		}
		for (i = 0; i < 12; ++i) {
			for (j = 0; j < 12; ++j) {
				if (f[edgeFacelet[i][0]] == ~~(edgeFacelet[j][0] / 9) && f[edgeFacelet[i][1]] == ~~(edgeFacelet[j][1] / 9)) {
					ccRet.ep[i] = j;
					ccRet.eo[i] = 0;
					break;
				}
				if (f[edgeFacelet[i][0]] == ~~(edgeFacelet[j][1] / 9) && f[edgeFacelet[i][1]] == ~~(edgeFacelet[j][0] / 9)) {
					ccRet.ep[i] = j;
					ccRet.eo[i] = 1;
					break;
				}
			}
		}
	}

	function toFaceCube(cc) {
		var c, e, f, i, j, n, ori, ts;
		f = createArray(54);
		ts = [85, 82, 70, 68, 76, 66];
		for (i = 0; i < 54; ++i) {
			f[i] = ts[~~(i / 9)];
		}
		for (c = 0; c < 8; ++c) {
			j = cc.cp[c];
			ori = cc.co[c];
			for (n = 0; n < 3; ++n)
				f[cornerFacelet[c][(n + ori) % 3]] = ts[~~(cornerFacelet[j][n] / 9)];
		}
		for (e = 0; e < 12; ++e) {
			j = cc.ep[e];
			ori = cc.eo[e];
			for (n = 0; n < 2; ++n)
				f[edgeFacelet[e][(n + ori) % 2]] = ts[~~(edgeFacelet[j][n] / 9)];
		}
		return String.fromCharCode.apply(null, f);
	}

	var ckmv2, cornerFacelet, edgeFacelet, move2str, permMult, std2ud, ud2std;

	function initialize() {
		//	var startTime = +new Date;
		Util_$clinit();
		CubieCube_$clinit();
		CoordCube_$clinit();
		initMove();
		initSym();
		initFlipSym2Raw();
		initTwistSym2Raw();
		initPermSym2Raw();
		initMoveTable(FlipMove, 336, FlipS2R, $setFlip, $getFlipSym, true, false);
		initMoveTable(TwistMove, 324, TwistS2R, $setTwist, $getTwistSym, false, false);
		initUDSliceMoveConj();
		initMoveTable(CPermMove, 2768, epermS2R, $setCPerm, $getCPermSym, false, false);
		initMoveTable(EPermMove, 2768, epermS2R, $setEPerm, $getEPermSym, true, true);
		initMPermMoveConj();
		epermR2S = null;
		//	console.log(+new Date - startTime);
		initRawSymPrun(UDSliceTwistPrun, 6, UDSliceMove, UDSliceConj, TwistMove, SymStateTwist, null, null, 3);
		initRawSymPrun(UDSliceFlipPrun, 6, UDSliceMove, UDSliceConj, FlipMove, SymStateFlip, null, null, 3);
		initRawSymPrun(MEPermPrun, 7, MPermMove, MPermConj, EPermMove, SymStatePerm, null, null, 4);
		initRawSymPrun(MCPermPrun, 10, MPermMove, MPermConj, CPermMove, SymStatePerm, e2c, ud2std, 4);
		//	console.log(+new Date - startTime);
	}

	var initialized = false;

	function ini() {
		if (!initialized) {
			initialize();
			search = new Search;
			initialized = true;
		}
	}


	// SCRAMBLERS

	var search;

	function getRandomOriScramble() {
		return getAnyScramble(0xfff, 0xfff, 0xff, 0xff) + rndEl(["", "Rw ", "Rw2 ", "Rw' ", "Fw ", "Fw' "]) + rndEl(["", "Uw", "Uw2", "Uw'"]);
	}

	function getRandomScramble() {
		return getAnyScramble(0xfff, 0xfff, 0xff, 0xff);
	}

	function cntU(b) {
		for (var c = 0, a = 0; a < b.length; a++) - 1 == b[a] && c++;
		return c
	}

	function fixOri(arr, cntU, base) {
		var sum = 0;
		var idx = 0;
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] != -1) {
				sum += arr[i];
			}
		}
		sum %= base;
		for (var i = 0; i < arr.length - 1; i++) {
			if (arr[i] == -1) {
				if (cntU-- == 1) {
					arr[i] = ((base << 4) - sum) % base;
				} else {
					arr[i] = rn(base);
					sum += arr[i];
				}
			}
			idx *= base;
			idx += arr[i];
		}
		return idx;
	}

	function fixPerm(arr, cntU, parity) {
		var val = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] != -1) {
				val[arr[i]] = -1;
			}
		}
		for (var i = 0, j = 0; i < val.length; i++) {
			if (val[i] != -1) {
				val[j++] = val[i];
			}
		}
		var last;
		for (var i = 0; i < arr.length && cntU > 0; i++) {
			if (arr[i] == -1) {
				var r = rn(cntU);
				arr[i] = val[r];
				for (var j = r; j < 11; j++) {
					val[j] = val[j + 1];
				}
				if (cntU-- == 2) {
					last = i;
				}
			}
		}
		if (getNParity(getNPerm(arr, arr.length), arr.length) == 1 - parity) {
			var temp = arr[i - 1];
			arr[i - 1] = arr[last];
			arr[last] = temp;
		}
		return getNPerm(arr, arr.length);
	}

	function parseMask(arr, length, ori) {
		if ($.isNumeric(arr)) {
			var ret = [];
			for (var i = 0; i < length; i++) {
				ret[i] = (arr & 1) ? -1 : (ori ? 0 : i);
				arr >>= 1;
			}
			return ret;
		} else {
			return arr;
		}
	}

	function getAnyScramble(_ep, _eo, _cp, _co, _rndapp) {
		ini();
		_rndapp = _rndapp || [-1];
		_ep = parseMask(_ep, 12, false);
		_eo = parseMask(_eo, 12, true);
		_cp = parseMask(_cp, 8, false);
		_co = parseMask(_co, 8, true);
		var solution = "";
		do {
			var eo = _eo.slice();
			var ep = _ep.slice();
			var co = _co.slice();
			var cp = _cp.slice();
			var neo = fixOri(eo, cntU(eo), 2);
			var nco = fixOri(co, cntU(co), 3);
			var nep, ncp;
			var ue = cntU(ep);
			var uc = cntU(cp);
			if (ue == 0 && uc == 0) {
				nep = getNPerm(ep, 12);
				ncp = getNPerm(cp, 8);
			} else if (ue != 0 && uc == 0) {
				ncp = getNPerm(cp, 8);
				nep = fixPerm(ep, ue, getNParity(ncp, 8));
			} else if (ue == 0 && uc != 0) {
				nep = getNPerm(ep, 12);
				ncp = fixPerm(cp, uc, getNParity(nep, 12));
			} else {
				nep = fixPerm(ep, ue, -1);
				ncp = fixPerm(cp, uc, getNParity(nep, 12));
			}
			if (ncp + nco + nep + neo == 0) {
				continue;
			}
			var cc = new CubieCube1(ncp, nco, nep, neo);
			var cc2 = new CubieCube;
			var rndMove = rndEl(_rndapp);
			if (rndMove != -1) {
				for (var i = 0; i < rndMove.length; i++) {
					CornMult(cc, moveCube[rndMove[i]], cc2);
					EdgeMult(cc, moveCube[rndMove[i]], cc2);
					var tmp = cc2;
					cc2 = cc;
					cc = tmp;
				}
			}
			var posit = toFaceCube(cc);
			solution = $solution(search, posit);
		} while (solution.length <= 3);
		return solution.replace(/ +/g, ' ');
	}

	function getEdgeScramble() {
		return getAnyScramble(0xfff, 0xfff, 0, 0);
	}

	function getCornerScramble() {
		return getAnyScramble(0, 0, 0xff, 0xff);
	}

	function getLLScramble() {
		return getAnyScramble(0xf, 0xf, 0xf, 0xf);
	}

	function getLSLLScramble() {
		return getAnyScramble(0x10f, 0x10f, 0x1f, 0x1f);
	}

	function getF2LScramble() {
		return getAnyScramble(0xf0f, 0xf0f, 0xff, 0xff);
	}

	function getZBLLScramble() {
		return getAnyScramble(0xf, 0, 0xf, 0xf);
	}

	function getZZLLScramble() {
		return getAnyScramble(0x5, 0, 0xf, 0xf, [-1, [Ux1], [Ux2], [Ux3]]);
	}

	function getZBLSScramble() {
		return getAnyScramble(0x10f, 0, 0x1f, 0x1f);
	}

	function getLSEScramble() {
		switch (rn(4)) {
		case 0:
			return getAnyScramble(0xaf, 0xaf, 0, 0);
		case 1:
			return getAnyScramble(0xaf, 0xaf, 0, 0, [[Rx1, Lx3]]) + "x'";
		case 2:
			return getAnyScramble(0xaf, 0xaf, 0, 0, [[Rx2, Lx2]]) + "x2";
		case 3:
			return getAnyScramble(0xaf, 0xaf, 0, 0, [[Rx3, Lx1]]) + "x";
		}
	}

	function getCMLLScramble() {
		switch (rn(4)) {
		case 0:
			return getAnyScramble(0xaf, 0xaf, 0xf, 0xf);
		case 1:
			return getAnyScramble(0xaf, 0xaf, 0xf, 0xf, [[Rx1, Lx3]]) + "x'";
		case 2:
			return getAnyScramble(0xaf, 0xaf, 0xf, 0xf, [[Rx2, Lx2]]) + "x2";
		case 3:
			return getAnyScramble(0xaf, 0xaf, 0xf, 0xf, [[Rx3, Lx1]]) + "x";
		}
	}

	function getCLLScramble() {
		return getAnyScramble(0, 0, 0xf, 0xf);
	}

	function getELLScramble() {
		return getAnyScramble(0xf, 0xf, 0, 0);
	}

	function get2GLLScramble() {
		return getAnyScramble(0xf, 0, 0, 0xf, [-1, [Ux1], [Ux2], [Ux3]]);
	}

	function getPLLScramble() {
		return getAnyScramble(0xf, 0, 0xf, 0);
	}

	function getEOLineScramble() {
		return getAnyScramble(0xf5f, 0x000, 0xff, 0xff);
	}

	function getEasyCrossScramble(type, length) {
		var cases = cross.getEasyCross(length);
		return getAnyScramble(cases[0], cases[1], 0xff, 0xff);
	}

	scramble.reg('333', getRandomScramble)
		('333ni', getRandomOriScramble)
		('edges', getEdgeScramble)
		('corners', getCornerScramble)
		('ll', getLLScramble)
		('lsll2', getLSLLScramble)
		('f2l', getF2LScramble)
		('zbll', getZBLLScramble)
		('zzll', getZZLLScramble)
		('zbls', getZBLSScramble)
		('lse', getLSEScramble)
		('cmll', getCMLLScramble)
		('cll', getCLLScramble)
		('ell', getELLScramble)
		('pll', getPLLScramble)
		('2gll', get2GLLScramble)
		('easyc', getEasyCrossScramble)
		('eoline', getEOLineScramble);

	return {
		/* mark2 interface */
		getRandomScramble: getRandomScramble, //getRandomScramble,

		/* added methods */
		getEdgeScramble: getEdgeScramble,
		getCornerScramble: getCornerScramble,
		getLLScramble: getLLScramble,
		getLSLLScramble: getLSLLScramble,
		getZBLLScramble: getZBLLScramble,
		getZZLLScramble: getZZLLScramble,
		getF2LScramble: getF2LScramble,
		getLSEScramble: getLSEScramble,
		getCMLLScramble: getCMLLScramble,
		getCLLScramble: getCLLScramble,
		getELLScramble: getELLScramble,
		getAnyScramble: getAnyScramble
	};

})(mathlib.getNPerm, mathlib.get8Perm, mathlib.setNPerm, mathlib.set8Perm, mathlib.getNParity, mathlib.getPruning, mathlib.Cnk, mathlib.fact, mathlib.rn, mathlib.rndEl);