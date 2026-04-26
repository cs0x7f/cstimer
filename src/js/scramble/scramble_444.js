"use strict";

var scramble_444 = (function(Cnk, circle) {

	var PHASE1_SOLS = 10000;
	var PHASE2_ATTS = 500;
	var PHASE2_SOLS = 100;
	var MAX_SEARCH_DEPTH = 60;

	function createArray(length1, length2) {
		var result, i;
		result = new Array(length1);
		if (length2 != undefined) {
			for (i = 0; i < length1; i++) {
				result[i] = new Array(length2);
			}
		}
		return result;
	}

	var _;

	function defineClass() {
		_ = arguments[0].prototype;
		for (var i = 1; i < arguments.length; ++i) {
			arguments[i].prototype = _;
		}
	}

	function nullMethod() {}

	function $clinit_Center1() {
		$clinit_Center1 = nullMethod;
		Center1SymMove = createArray(15582, 36);
		Center1Sym2Raw = createArray(15582);
		Center1SymPrun = createArray(15582);
		SymMult = createArray(48, 48);
		SymMove = createArray(48, 36);
		SymInv = createArray(48);
		finish_0 = createArray(48);
	}

	function $equals(obj, c) {
		for (var i = 0; i < 24; ++i) {
			if (obj.ct[i] != c.ct[i]) {
				return false;
			}
		}
		return true;
	}

	function $get_1(obj) {
		var idx = 0;
		var r = 8;
		for (var i = 23; i >= 0; --i) {
			obj.ct[i] == 1 && (idx += Cnk[i][r--]);
		}
		return idx;
	}

	function getCenter1RotThres(obj, rotPerm, thres) {
		var idx = 0;
		var r = 8;
		for (var i = 23; i >= 0; --i) {
			obj.ct[rotPerm[i]] == 1 && (idx += Cnk[i][r--]);
			if (idx >= thres) {
				return -1;
			}
		}
		return idx;
	}

	function $getsym(obj) {
		var cord, j;
		var ret = 0;
		if (Center1Raw2Sym != null) {
			for (var s = 0; s < 48; s++) {
				var idx = getCenter1RotThres(obj, Center1RotPerm[s], mathlib.Cnk[21][8]);
				if (idx != -1) {
					ret = Center1Raw2Sym[idx];
					return ret & ~0x3f | SymMult[s][ret & 0x3f];
				}
			}
		}
		for (j = 0; j < 48; ++j) {
			cord = raw2sym_0($get_1(obj));
			if (cord != -1) {
				return cord * 64 + j;
			}
			$rot(obj, 0);
			j % 2 == 1 && $rot(obj, 1);
			j % 8 == 7 && $rot(obj, 2);
			j % 16 == 15 && $rot(obj, 3);
		}
	}

	function doMoveCenter1(obj, m_0) {
		doMoveCenterCube(obj, m_0);
	}

	function $rot(obj, r) {
		switch (r) {
			case 0:
				doMoveCenter1(obj, 19);
				doMoveCenter1(obj, 28);
				break;
			case 1:
				doMoveCenter1(obj, 21);
				doMoveCenter1(obj, 32);
				break;
			case 2:
				swap(obj.ct, 0, 3, 1, 2, 1);
				swap(obj.ct, 8, 11, 9, 10, 1);
				swap(obj.ct, 4, 7, 5, 6, 1);
				swap(obj.ct, 12, 15, 13, 14, 1);
				swap(obj.ct, 16, 19, 21, 22, 1);
				swap(obj.ct, 17, 18, 20, 23, 1);
				break;
			case 3:
				doMoveCenter1(obj, 18);
				doMoveCenter1(obj, 29);
				doMoveCenter1(obj, 24);
				doMoveCenter1(obj, 35);
				break;
		}
	}

	function Center1Rotate(obj, r) {
		var j;
		for (j = 0; j < r; ++j) {
			$rot(obj, 0);
			j % 2 == 1 && $rot(obj, 1);
			j % 8 == 7 && $rot(obj, 2);
			j % 16 == 15 && $rot(obj, 3);
		}
	}

	function $set_0(obj, idx) {
		var i, r;
		r = 8;
		for (i = 23; i >= 0; --i) {
			obj.ct[i] = 0;
			if (idx >= Cnk[i][r]) {
				idx -= Cnk[i][r--];
				obj.ct[i] = 1;
			}
		}
	}

	function $set_1(obj, c) {
		var i;
		for (i = 0; i < 24; ++i) {
			obj.ct[i] = c.ct[i];
		}
	}

	function Center1(cc) {
		if (cc) {
			this.ct = cc.ct.slice();
			return;
		}
		this.ct = [];
		for (var i = 0; i < 24; ++i) {
			this.ct[i] = i < 8 ? 1 : 0;
		}
	}

	Center1.prototype.fromCube = function(cc, urf) {
		for (var i = 0; i < 24; ++i) {
			this.ct[i] = cc.ct[i] % 3 == urf ? 1 : 0;
		}
		return this;
	}

	function initCenter1MoveTable() {
		var c = new Center1();
		var d = new Center1();
		for (var i = 0; i < 15582; ++i) {
			$set_0(d, Center1Sym2Raw[i]);
			for (var m = 0; m < 36; ++m) {
				if (m % 3 == 1 || Center1SymMove[i][m] !== undefined) {
					continue;
				}
				$set_1(c, d);
				doMoveCenter1(c, m);
				var idx = $getsym(c);
				Center1SymMove[i][m] = idx;
				var invM = SymMove[idx & 0x3f][~~(m / 3) * 3 + 2 - m % 3];
				if (Center1SymMove[idx >> 6][invM] === undefined) {
					Center1SymMove[idx >> 6][invM] = i << 6 | SymInv[idx & 0x3f];
				}
			}
		}
		for (var i = 0; i < 15582; i++) {
			for (var m = 0; m < 36; m += 3) {
				var idx = Center1SymMove[i][m];
				var nextM = SymMove[idx & 0x3f][m];
				var nextIdx = Center1SymMove[idx >>> 6][nextM];
				var symx = SymMult[idx & 0x3f][nextIdx & 0x3f];
				Center1SymMove[i][m + 1] = nextIdx & ~0x3f | symx;
			}
		}
	}

	function initCenter1Prun() {
		var check, depth, done, i, idx, inv, m_0, select;
		fill_0(Center1SymPrun);
		Center1SymPrun[0] = 0;
		depth = 0;
		done = 1;
		while (done != 15582) {
			inv = depth > 4;
			select = inv ? -1 : depth;
			check = inv ? depth : -1;
			++depth;
			for (i = 0; i < 15582; ++i) {
				if (Center1SymPrun[i] != select) {
					continue;
				}
				for (m_0 = 0; m_0 < 27; ++m_0) {
					idx = Center1SymMove[i][m_0] >>> 6;
					if (Center1SymPrun[idx] != check) {
						continue;
					}
					++done;
					if (inv) {
						Center1SymPrun[i] = depth;
						break;
					} else {
						Center1SymPrun[idx] = depth;
					}
				}
			}
		}
	}

	function getSolvedSym(cube) {
		var c, check, i, j;
		c = new Center1(cube);
		for (j = 0; j < 48; ++j) {
			check = true;
			for (i = 0; i < 24; ++i) {
				if (c.ct[i] != (centerFacelet[i] >> 4)) {
					check = false;
					break;
				}
			}
			if (check) {
				return j;
			}
			$rot(c, 0);
			j % 2 == 1 && $rot(c, 1);
			j % 8 == 7 && $rot(c, 2);
			j % 16 == 15 && $rot(c, 3);
		}
		return -1;
	}

	function initSymMeta() {
		var c, d, e, f, i, j, k_0;
		c = new Center1();
		for (i = 0; i < 24; ++i) {
			c.ct[i] = i;
		}
		d = new Center1(c);
		e = new Center1(c);
		f = new Center1(c);
		for (i = 0; i < 48; ++i) {
			for (j = 0; j < 48; ++j) {
				for (k_0 = 0; k_0 < 48; ++k_0) {
					if ($equals(c, d)) {
						SymMult[i][j] = k_0;
						k_0 == 0 && (SymInv[i] = j);
					}
					$rot(d, 0);
					k_0 % 2 == 1 && $rot(d, 1);
					k_0 % 8 == 7 && $rot(d, 2);
					k_0 % 16 == 15 && $rot(d, 3);
				}
				$rot(c, 0);
				j % 2 == 1 && $rot(c, 1);
				j % 8 == 7 && $rot(c, 2);
				j % 16 == 15 && $rot(c, 3);
			}
			$rot(c, 0);
			i % 2 == 1 && $rot(c, 1);
			i % 8 == 7 && $rot(c, 2);
			i % 16 == 15 && $rot(c, 3);
		}
		for (i = 0; i < 48; ++i) {
			$set_1(c, e);
			Center1Rotate(c, SymInv[i]);
			for (j = 0; j < 36; ++j) {
				$set_1(d, c);
				doMoveCenter1(d, j);
				Center1Rotate(d, i);
				for (k_0 = 0; k_0 < 36; ++k_0) {
					$set_1(f, e);
					doMoveCenter1(f, k_0);
					if ($equals(f, d)) {
						SymMove[i][j] = k_0;
						break;
					}
				}
			}
		}
		$set_0(c, 0);
		for (i = 0; i < 48; ++i) {
			finish_0[SymInv[i]] = $get_1(c);
			$rot(c, 0);
			i % 2 == 1 && $rot(c, 1);
			i % 8 == 7 && $rot(c, 2);
			i % 16 == 15 && $rot(c, 3);
		}
	}

	function initCenter1Sym2Raw() {
		var idx, j, occ;
		var c = new Center1();
		var d = new Center1();

		Center1RotPerm = [];
		for (var i = 0; i < 24; i++) {
			c.ct[i] = i;
		}
		for (var s = 0; s < 48; s++) {
			Center1RotPerm[s] = c.ct.slice();
			$rot(c, 0);
			s % 2 == 1 && $rot(c, 1);
			s % 8 == 7 && $rot(c, 2);
			s % 16 == 15 && $rot(c, 3);
		}

		occ = createArray(22984);
		for (var i = 0; i < 22984; i++) {
			occ[i] = 0;
		}
		var count = 0;
		for (var i = 0; i < mathlib.Cnk[21][8]; ++i) {
			if ((occ[i >>> 5] & 1 << (i & 31)) == 0) {
				$set_0(c, i);
				for (j = 0; j < 48; ++j) {
					idx = getCenter1RotThres(c, Center1RotPerm[j], mathlib.Cnk[21][8]);
					if (idx == -1) {
						continue;
					}
					occ[idx >>> 5] |= 1 << (idx & 31);
					Center1Raw2Sym != null && (Center1Raw2Sym[idx] = count << 6 | SymInv[j]);
				}
				Center1Sym2Raw[count++] = i;
			}
		}
	}

	function raw2sym_0(n) {
		var m_0;
		m_0 = binarySearch_0(Center1Sym2Raw, n);
		return m_0 >= 0 ? m_0 : -1;
	}

	var Center1SymPrun, Center1SymMove, finish_0, Center1Raw2Sym = null,
		Center1Sym2Raw, Center1RotPerm, SymInv, SymMove, SymMult;

	function $clinit_Center2() {
		$clinit_Center2 = nullMethod;
		rlmv = createArray(70, 28);
		ctmv = createArray(6435, 28);
		rlrot = createArray(70, 16);
		ctrot = createArray(6435, 16);
		ctprun = createArray(450450);
		pmv = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0];
	}

	function $getct(obj) {
		var i, idx, r;
		idx = 0;
		r = 8;
		for (i = 14; i >= 0; --i) {
			obj.ct[i] != obj.ct[15] && (idx += Cnk[i][r--]);
		}
		return idx;
	}

	function $getrl(obj) {
		var i, idx, r;
		idx = 0;
		r = 4;
		for (i = 6; i >= 0; --i) {
			obj.rl[i] != obj.rl[7] && (idx += Cnk[i][r--]);
		}
		return idx * 2 + obj.parity;
	}

	function doMoveCenter2(obj, m_0) {
		var key;
		obj.parity ^= pmv[m_0];
		key = m_0 % 3;
		m_0 = ~~(m_0 / 3);
		switch (m_0) {
			case 0:
				swap(obj.ct, 0, 1, 2, 3, key);
				break;
			case 1:
				swap(obj.rl, 0, 1, 2, 3, key);
				break;
			case 2:
				swap(obj.ct, 8, 9, 10, 11, key);
				break;
			case 3:
				swap(obj.ct, 4, 5, 6, 7, key);
				break;
			case 4:
				swap(obj.rl, 4, 5, 6, 7, key);
				break;
			case 5:
				swap(obj.ct, 12, 13, 14, 15, key);
				break;
			case 6:
				swap(obj.ct, 0, 1, 2, 3, key);
				swap(obj.rl, 0, 5, 4, 1, key);
				swap(obj.ct, 8, 9, 12, 13, key);
				break;
			case 7:
				swap(obj.rl, 0, 1, 2, 3, key);
				swap(obj.ct, 1, 15, 5, 9, key);
				swap(obj.ct, 2, 12, 6, 10, key);
				break;
			case 8:
				swap(obj.ct, 8, 9, 10, 11, key);
				swap(obj.rl, 0, 3, 6, 5, key);
				swap(obj.ct, 3, 2, 5, 4, key);
				break;
			case 9:
				swap(obj.ct, 4, 5, 6, 7, key);
				swap(obj.rl, 3, 2, 7, 6, key);
				swap(obj.ct, 11, 10, 15, 14, key);
				break;
			case 10:
				swap(obj.rl, 4, 5, 6, 7, key);
				swap(obj.ct, 0, 8, 4, 14, key);
				swap(obj.ct, 3, 11, 7, 13, key);
				break;
			case 11:
				swap(obj.ct, 12, 13, 14, 15, key);
				swap(obj.rl, 1, 4, 7, 2, key);
				swap(obj.ct, 1, 0, 7, 6, key);
		}
	}

	function $rot_0(obj, r) {
		switch (r) {
			case 0:
				doMoveCenter2(obj, 19);
				doMoveCenter2(obj, 28);
				break;
			case 1:
				doMoveCenter2(obj, 21);
				doMoveCenter2(obj, 32);
				break;
			case 2:
				swap(obj.ct, 0, 3, 1, 2, 1);
				swap(obj.ct, 8, 11, 9, 10, 1);
				swap(obj.ct, 4, 7, 5, 6, 1);
				swap(obj.ct, 12, 15, 13, 14, 1);
				swap(obj.rl, 0, 3, 5, 6, 1);
				swap(obj.rl, 1, 2, 4, 7, 1);
		}
	}

	function $set_2(obj, c, edgeParity) {
		var i;
		for (i = 0; i < 16; ++i) {
			obj.ct[i] = c.ct[i] % 3;
		}
		for (i = 0; i < 8; ++i) {
			obj.rl[i] = c.ct[i + 16];
		}
		obj.parity = edgeParity;
	}

	function $setct(obj, idx) {
		var i, r;
		r = 8;
		obj.ct[15] = 0;
		for (i = 14; i >= 0; --i) {
			if (idx >= Cnk[i][r]) {
				idx -= Cnk[i][r--];
				obj.ct[i] = 1;
			} else {
				obj.ct[i] = 0;
			}
		}
	}

	function $setrl(obj, idx) {
		var i, r;
		obj.parity = idx & 1;
		idx >>>= 1;
		r = 4;
		obj.rl[7] = 0;
		for (i = 6; i >= 0; --i) {
			if (idx >= Cnk[i][r]) {
				idx -= Cnk[i][r--];
				obj.rl[i] = 1;
			} else {
				obj.rl[i] = 0;
			}
		}
	}

	function Center2() {
		this.rl = createArray(8);
		this.ct = createArray(16);
		this.parity = 0;
	}

	Center2.prototype.copy = function(obj) {
		for (var i = 0; i < 8; i++) {
			this.rl[i] = obj.rl[i];
		}
		for (var i = 0; i < 16; i++) {
			this.ct[i] = obj.ct[i];
		}
		this.parity = obj.parity;
	}
	var ctmv, ctprun, ctrot, pmv, rlmv, rlrot;

	function initCenter2() {
		var ct, ctx, depth, done, i, idx, j, m_0, rl, rlx;
		var c = new Center2;
		var d = new Center2;
		for (i = 0; i < 70; ++i) {
			for (m_0 = 0; m_0 < 28; ++m_0) {
				$setrl(c, i);
				doMoveCenter2(c, move2std[m_0]);
				rlmv[i][m_0] = $getrl(c);
			}
		}
		for (i = 0; i < 70; ++i) {
			$setrl(c, i);
			for (j = 0; j < 16; ++j) {
				rlrot[i][j] = $getrl(c);
				$rot_0(c, 0);
				j % 2 == 1 && $rot_0(c, 1);
				j % 8 == 7 && $rot_0(c, 2);
			}
		}
		for (i = 0; i < 6435; ++i) {
			$setct(c, i);
			for (j = 0; j < 16; ++j) {
				ctrot[i][j] = $getct(c);
				$rot_0(c, 0);
				j % 2 == 1 && $rot_0(c, 1);
				j % 8 == 7 && $rot_0(c, 2);
			}
		}
		for (i = 0; i < 6435; ++i) {
			$setct(c, i);
			for (m_0 = 0; m_0 < 28; ++m_0) {
				d.copy(c);
				doMoveCenter2(d, move2std[m_0]);
				ctmv[i][m_0] = $getct(d);
			}
		}
		fill_0(ctprun);
		ctprun[0] = ctprun[18] = ctprun[28] = ctprun[46] = ctprun[54] = ctprun[56] = 0;
		depth = 0;
		done = 6;

		while (done != 450450) {
			var inv = depth > 6;
			var select = inv ? -1 : depth;
			var check = inv ? depth : -1;
			++depth;
			for (i = 0; i < 450450; ++i) {
				if (ctprun[i] != select) {
					continue;
				}
				ct = ~~(i / 70);
				rl = i % 70;
				for (m_0 = 0; m_0 < 23; ++m_0) {
					ctx = ctmv[ct][m_0];
					rlx = rlmv[rl][m_0];
					idx = ctx * 70 + rlx;
					if (ctprun[idx] != check) {
						continue;
					}
					++done;
					if (inv) {
						ctprun[i] = depth;
						break;
					} else {
						ctprun[idx] = depth;
					}
				}
			}
		}
	}

	function $clinit_Center3() {
		$clinit_Center3 = nullMethod;
		ctmove = createArray(29400, 20);
		pmove = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1];
		prun_0 = createArray(29400);
		rl2std = [0, 9, 14, 23, 27, 28, 41, 42, 46, 55, 60, 69];
		std2rl = createArray(70);
	}

	function $getct_0(obj) {
		var check, i, idx, idxrl, r;
		idx = 0;
		r = 4;
		for (i = 6; i >= 0; --i) {
			obj.ud[i] != obj.ud[7] && (idx += Cnk[i][r--]);
		}
		idx *= 35;
		r = 4;
		for (i = 6; i >= 0; --i) {
			obj.fb[i] != obj.fb[7] && (idx += Cnk[i][r--]);
		}
		idx *= 12;
		check = obj.fb[7] ^ obj.ud[7];
		idxrl = 0;
		r = 4;
		for (i = 7; i >= 0; --i) {
			obj.rl[i] != check && (idxrl += Cnk[i][r--]);
		}
		return obj.parity + 2 * (idx + std2rl[idxrl]);
	}

	function doMoveCenter3(obj, i) {
		obj.parity ^= pmove[i];
		switch (i) {
			case 0:
			case 1:
			case 2:
				swap(obj.ud, 0, 1, 2, 3, i % 3);
				break;
			case 3:
				swap(obj.rl, 0, 1, 2, 3, 1);
				break;
			case 4:
			case 5:
			case 6:
				swap(obj.fb, 0, 1, 2, 3, (i - 1) % 3);
				break;
			case 7:
			case 8:
			case 9:
				swap(obj.ud, 4, 5, 6, 7, (i - 1) % 3);
				break;
			case 10:
				swap(obj.rl, 4, 5, 6, 7, 1);
				break;
			case 11:
			case 12:
			case 13:
				swap(obj.fb, 4, 5, 6, 7, (i + 1) % 3);
				break;
			case 14:
				swap(obj.ud, 0, 1, 2, 3, 1);
				swap(obj.rl, 0, 5, 4, 1, 1);
				swap(obj.fb, 0, 5, 4, 1, 1);
				break;
			case 15:
				swap(obj.rl, 0, 1, 2, 3, 1);
				swap(obj.fb, 1, 4, 7, 2, 1);
				swap(obj.ud, 1, 6, 5, 2, 1);
				break;
			case 16:
				swap(obj.fb, 0, 1, 2, 3, 1);
				swap(obj.ud, 3, 2, 5, 4, 1);
				swap(obj.rl, 0, 3, 6, 5, 1);
				break;
			case 17:
				swap(obj.ud, 4, 5, 6, 7, 1);
				swap(obj.rl, 3, 2, 7, 6, 1);
				swap(obj.fb, 3, 2, 7, 6, 1);
				break;
			case 18:
				swap(obj.rl, 4, 5, 6, 7, 1);
				swap(obj.fb, 0, 3, 6, 5, 1);
				swap(obj.ud, 0, 3, 4, 7, 1);
				break;
			case 19:
				swap(obj.fb, 4, 5, 6, 7, 1);
				swap(obj.ud, 0, 7, 6, 1, 1);
				swap(obj.rl, 1, 4, 7, 2, 1);
		}
	}

	function $set_3(obj, c, eXc_parity) {
		var i, parity;
		parity = c.ct[0] % 3 > c.ct[8] % 3 ^ c.ct[8] % 3 > c.ct[16] % 3 ^ c.ct[0] % 3 > c.ct[16] % 3 ? 0 : 1;
		for (i = 0; i < 8; ++i) {
			obj.ud[i] = ~~(c.ct[i] / 3) ^ 1;
			obj.fb[i] = ~~(c.ct[i + 8] / 3) ^ 1;
			obj.rl[i] = ~~(c.ct[i + 16] / 3) ^ 1 ^ parity;
		}
		obj.parity = parity ^ eXc_parity;
	}

	function $setct_0(obj, idx) {
		var i, idxfb, idxrl, r;
		obj.parity = idx & 1;
		idx >>>= 1;
		idxrl = rl2std[idx % 12];
		idx = ~~(idx / 12);
		r = 4;
		for (i = 7; i >= 0; --i) {
			obj.rl[i] = 0;
			if (idxrl >= Cnk[i][r]) {
				idxrl -= Cnk[i][r--];
				obj.rl[i] = 1;
			}
		}
		idxfb = idx % 35;
		idx = ~~(idx / 35);
		r = 4;
		obj.fb[7] = 0;
		for (i = 6; i >= 0; --i) {
			if (idxfb >= Cnk[i][r]) {
				idxfb -= Cnk[i][r--];
				obj.fb[i] = 1;
			} else {
				obj.fb[i] = 0;
			}
		}
		r = 4;
		obj.ud[7] = 0;
		for (i = 6; i >= 0; --i) {
			if (idx >= Cnk[i][r]) {
				idx -= Cnk[i][r--];
				obj.ud[i] = 1;
			} else {
				obj.ud[i] = 0;
			}
		}
	}

	function Center3() {
		this.ud = createArray(8);
		this.rl = createArray(8);
		this.fb = createArray(8);
		this.parity = 0;
	}

	Center3.prototype.copy = function(obj) {
		for (var i = 0; i < 8; i++) {
			this.ud[i] = obj.ud[i];
			this.rl[i] = obj.rl[i];
			this.fb[i] = obj.fb[i];
		}
		this.parity = obj.parity;
	}
	var ctmove, pmove, prun_0, rl2std, std2rl;

	function initCenter3() {
		var depth, done, i, m_0;
		for (i = 0; i < 12; ++i) {
			std2rl[rl2std[i]] = i;
		}
		var c = new Center3;
		var d = new Center3;
		for (i = 0; i < 29400; ++i) {
			$setct_0(c, i);
			for (m_0 = 0; m_0 < 20; ++m_0) {
				d.copy(c);
				doMoveCenter3(d, m_0);
				ctmove[i][m_0] = $getct_0(d);
			}
		}
		fill_0(prun_0);
		prun_0[0] = 0;
		depth = 0;
		done = 1;
		while (done != 29400) {
			for (i = 0; i < 29400; ++i) {
				if (prun_0[i] != depth) {
					continue;
				}
				for (m_0 = 0; m_0 < 17; ++m_0) {
					if (prun_0[ctmove[i][m_0]] == -1) {
						prun_0[ctmove[i][m_0]] = depth + 1;
						++done;
					}
				}
			}
			++depth;
		}
	}

	function $copy_1(obj, c) {
		var i;
		for (i = 0; i < 24; ++i) {
			obj.ct[i] = c.ct[i];
		}
	}

	function doMoveCenterCube(obj, m_0) {
		var key;
		key = m_0 % 3;
		m_0 = ~~(m_0 / 3);
		switch (m_0) {
			case 6: // u
				swap(obj.ct, 8, 20, 12, 16, key);
				swap(obj.ct, 9, 21, 13, 17, key);
			case 0: // U
				swap(obj.ct, 0, 1, 2, 3, key);
				break;
			case 7: // r
				swap(obj.ct, 1, 15, 5, 9, key);
				swap(obj.ct, 2, 12, 6, 10, key);
			case 1: // R
				swap(obj.ct, 16, 17, 18, 19, key);
				break;
			case 8: // f
				swap(obj.ct, 2, 19, 4, 21, key);
				swap(obj.ct, 3, 16, 5, 22, key);
			case 2: // F
				swap(obj.ct, 8, 9, 10, 11, key);
				break;
			case 9: // d
				swap(obj.ct, 10, 18, 14, 22, key);
				swap(obj.ct, 11, 19, 15, 23, key);
			case 3: // D
				swap(obj.ct, 4, 5, 6, 7, key);
				break;
			case 10: // l
				swap(obj.ct, 0, 8, 4, 14, key);
				swap(obj.ct, 3, 11, 7, 13, key);
			case 4: // L
				swap(obj.ct, 20, 21, 22, 23, key);
				break;
			case 11: // b
				swap(obj.ct, 1, 20, 7, 18, key);
				swap(obj.ct, 0, 23, 6, 17, key);
			case 5: // B
				swap(obj.ct, 12, 13, 14, 15, key);
				break;
		}
	}

	function CenterCube() {
		this.ct = [];
		for (var i = 0; i < 24; ++i) {
			this.ct[i] = centerFacelet[i] >> 4;
		}
	}

	function $clinit_CornerCube() {
		$clinit_CornerCube = nullMethod;
		CornerMoveCube = createArray(18);
		cornerFacelet_0 = [
			[8, 9, 20],
			[6, 18, 38],
			[0, 36, 47],
			[2, 45, 11],
			[29, 26, 15],
			[27, 44, 24],
			[33, 53, 42],
			[35, 17, 51]
		];
		initMove_0();
	}

	function $$init_2(obj) {
		obj.cp = [0, 1, 2, 3, 4, 5, 6, 7];
		obj.co = [0, 0, 0, 0, 0, 0, 0, 0];
	}

	function $copy_2(obj, c) {
		var i;
		for (i = 0; i < 8; ++i) {
			obj.cp[i] = c.cp[i];
			obj.co[i] = c.co[i];
		}
	}

	function $move_3(obj, idx) {
		!obj.temps && (obj.temps = new CornerCube_0);
		CornMult_0(obj, CornerMoveCube[idx], obj.temps);
		$copy_2(obj, obj.temps);
	}

	function $setTwist_0(obj, idx) {
		var i, twst;
		twst = 0;
		for (i = 6; i >= 0; --i) {
			twst += obj.co[i] = idx % 3;
			idx = ~~(idx / 3);
		}
		obj.co[7] = (15 - twst) % 3;
	}

	function CornMult_0(a, b, prod) {
		var corn, ori, oriA, oriB;
		for (corn = 0; corn < 8; ++corn) {
			prod.cp[corn] = a.cp[b.cp[corn]];
			oriA = a.co[b.cp[corn]];
			oriB = b.co[corn];
			ori = oriA;
			ori = ori + (oriA < 3 ? oriB : 6 - oriB);
			ori = ori % 3;
			oriA >= 3 ^ oriB >= 3 && (ori = ori + 3);
			prod.co[corn] = ori;
		}
	}

	function CornerCube_0() {
		$$init_2(this);
	}

	function CornerCube_1(cperm, twist) {
		$$init_2(this);
		mathlib.setNPerm(this.cp, cperm, 8);
		$setTwist_0(this, twist);
	}

	function initMove_0() {
		var a, p_0;
		CornerMoveCube[0] = new CornerCube_1(15120, 0);
		CornerMoveCube[3] = new CornerCube_1(21021, 1494);
		CornerMoveCube[6] = new CornerCube_1(8064, 1236);
		CornerMoveCube[9] = new CornerCube_1(9, 0);
		CornerMoveCube[12] = new CornerCube_1(1230, 412);
		CornerMoveCube[15] = new CornerCube_1(224, 137);
		for (a = 0; a < 18; a += 3) {
			for (p_0 = 0; p_0 < 2; ++p_0) {
				CornerMoveCube[a + p_0 + 1] = new CornerCube_0;
				CornMult_0(CornerMoveCube[a + p_0], CornerMoveCube[a], CornerMoveCube[a + p_0 + 1]);
			}
		}
	}

	defineClass(CornerCube_0, CornerCube_1);
	_.temps = null;
	var cornerFacelet_0, CornerMoveCube;

	function $clinit_Edge3() {
		$clinit_Edge3 = nullMethod;
		prunValues = [1, 4, 16, 55, 324, 1922, 12275, 77640, 485359, 2778197, 11742425, 27492416, 31002941, 31006080];
		Edge3Prun = new Int32Array(1937880);
		Edge3Sym2Raw = createArray(1538);
		Edge3Sym2Mask = createArray(1538);
		symstate = createArray(1538);
		Edge3Raw2Sym = createArray(11880);
		syminv_0 = [0, 1, 6, 3, 4, 5, 2, 7];
		mvrot = createArray(168, 12);
		mvroto = createArray(168, 12);
		factX = [1, 1, 1, 3, 12, 60, 360, 2520, 20160, 181440, 1814400, 19958400, 239500800];
		FullEdgeMap = [0, 2, 4, 6, 1, 3, 7, 5, 8, 9, 10, 11];
	}

	function $circlex(obj, a, b, c, d) {
		var temp;
		temp = obj.edgeo[d];
		obj.edgeo[d] = obj.edge[c];
		obj.edge[c] = obj.edgeo[b];
		obj.edgeo[b] = obj.edge[a];
		obj.edge[a] = temp;
	}

	function $get_2(obj, end, returnMask) {
		obj.isStd || $std(obj);
		return get12Perm(obj.edge, end, returnMask);
	}

	function get12Perm(arr, end, returnMask) {
		var idx = 0;
		var mask = 0;
		for (var i = 0; i < end; i++) {
			var val = arr[i];
			idx = idx * (12 - i) + val - mathlib.bitCount(mask & ((1 << val) - 1));
			mask |= 1 << val;
		}
		return returnMask ? mask : idx;
	}

	function $getsym_0(obj) {
		obj.isStd || $std(obj);
		return getMvSym(obj.edge, 20) >> 3;
	}

	function $move_4(obj, i) {
		obj.isStd = false;
		switch (i) {
			case 0:
				circle(obj.edge, 0, 4, 1, 5);
				circle(obj.edgeo, 0, 4, 1, 5);
				break;
			case 1:
				$swap_0(obj.edge, 0, 4, 1, 5);
				$swap_0(obj.edgeo, 0, 4, 1, 5);
				break;
			case 2:
				circle(obj.edge, 0, 5, 1, 4);
				circle(obj.edgeo, 0, 5, 1, 4);
				break;
			case 3:
				$swap_0(obj.edge, 5, 10, 6, 11);
				$swap_0(obj.edgeo, 5, 10, 6, 11);
				break;
			case 4:
				circle(obj.edge, 0, 11, 3, 8);
				circle(obj.edgeo, 0, 11, 3, 8);
				break;
			case 5:
				$swap_0(obj.edge, 0, 11, 3, 8);
				$swap_0(obj.edgeo, 0, 11, 3, 8);
				break;
			case 6:
				circle(obj.edge, 0, 8, 3, 11);
				circle(obj.edgeo, 0, 8, 3, 11);
				break;
			case 7:
				circle(obj.edge, 2, 7, 3, 6);
				circle(obj.edgeo, 2, 7, 3, 6);
				break;
			case 8:
				$swap_0(obj.edge, 2, 7, 3, 6);
				$swap_0(obj.edgeo, 2, 7, 3, 6);
				break;
			case 9:
				circle(obj.edge, 2, 6, 3, 7);
				circle(obj.edgeo, 2, 6, 3, 7);
				break;
			case 10:
				$swap_0(obj.edge, 4, 8, 7, 9);
				$swap_0(obj.edgeo, 4, 8, 7, 9);
				break;
			case 11:
				circle(obj.edge, 1, 9, 2, 10);
				circle(obj.edgeo, 1, 9, 2, 10);
				break;
			case 12:
				$swap_0(obj.edge, 1, 9, 2, 10);
				$swap_0(obj.edgeo, 1, 9, 2, 10);
				break;
			case 13:
				circle(obj.edge, 1, 10, 2, 9);
				circle(obj.edgeo, 1, 10, 2, 9);
				break;
			case 14:
				$swap_0(obj.edge, 0, 4, 1, 5);
				$swap_0(obj.edgeo, 0, 4, 1, 5);
				circle(obj.edge, 9, 11);
				circle(obj.edgeo, 8, 10);
				break;
			case 15:
				$swap_0(obj.edge, 5, 10, 6, 11);
				$swap_0(obj.edgeo, 5, 10, 6, 11);
				circle(obj.edge, 1, 3);
				circle(obj.edgeo, 0, 2);
				break;
			case 16:
				$swap_0(obj.edge, 0, 11, 3, 8);
				$swap_0(obj.edgeo, 0, 11, 3, 8);
				circle(obj.edge, 5, 7);
				circle(obj.edgeo, 4, 6);
				break;
			case 17:
				$swap_0(obj.edge, 2, 7, 3, 6);
				$swap_0(obj.edgeo, 2, 7, 3, 6);
				circle(obj.edge, 8, 10);
				circle(obj.edgeo, 9, 11);
				break;
			case 18:
				$swap_0(obj.edge, 4, 8, 7, 9);
				$swap_0(obj.edgeo, 4, 8, 7, 9);
				circle(obj.edge, 0, 2);
				circle(obj.edgeo, 1, 3);
				break;
			case 19:
				$swap_0(obj.edge, 1, 9, 2, 10);
				$swap_0(obj.edgeo, 1, 9, 2, 10);
				circle(obj.edge, 4, 6);
				circle(obj.edgeo, 5, 7);
		}
	}

	function $rot_1(obj, r) {
		obj.isStd = false;
		switch (r) {
			case 0:
				$move_4(obj, 14);
				$move_4(obj, 17);
				break;
			case 1:
				$circlex(obj, 11, 5, 10, 6);
				$circlex(obj, 5, 10, 6, 11);
				$circlex(obj, 1, 2, 3, 0);
				$circlex(obj, 4, 9, 7, 8);
				$circlex(obj, 8, 4, 9, 7);
				$circlex(obj, 0, 1, 2, 3);
				break;
			case 2:
				$swapx(obj, 4, 5);
				$swapx(obj, 5, 4);
				$swapx(obj, 11, 8);
				$swapx(obj, 8, 11);
				$swapx(obj, 7, 6);
				$swapx(obj, 6, 7);
				$swapx(obj, 9, 10);
				$swapx(obj, 10, 9);
				$swapx(obj, 1, 1);
				$swapx(obj, 0, 0);
				$swapx(obj, 3, 3);
				$swapx(obj, 2, 2);
		}
	}

	function $rotate_0(obj, r) {
		while (r >= 2) {
			r -= 2;
			$rot_1(obj, 1);
			$rot_1(obj, 2);
		}
		r != 0 && $rot_1(obj, 0);
	}

	function $set_4(obj, idx) {
		var i, p_0, parity, v, vall, valh;
		vall = 0x76543210;
		valh = 0xba98;
		parity = 0;
		for (i = 0; i < 11; ++i) {
			p_0 = factX[11 - i];
			v = ~~(idx / p_0);
			idx = idx % p_0;
			parity ^= v;
			v <<= 2;
			if (v >= 32) {
				v = v - 32;
				obj.edge[i] = valh >> v & 15;
				var m = (1 << v) - 1;
				valh = (valh & m) + ((valh >> 4) & ~m);
			} else {
				obj.edge[i] = vall >> v & 15;
				var m = (1 << v) - 1;
				vall = (vall & m) + ((vall >>> 4) & ~m) + (valh << 28);
				valh = valh >> 4;
			}
		}
		if ((parity & 1) == 0) {
			obj.edge[11] = vall;
		} else {
			obj.edge[11] = obj.edge[10];
			obj.edge[10] = vall;
		}
		for (i = 0; i < 12; ++i) {
			obj.edgeo[i] = i;
		}
		obj.isStd = true;
	}

	function $set_5(obj, e) {
		var i;
		for (i = 0; i < 12; ++i) {
			obj.edge[i] = e.edge[i];
			obj.edgeo[i] = e.edgeo[i];
		}
		obj.isStd = e.isStd;
	}

	function $set_6(obj, c) {
		var i, parity, s, t;
		obj.temp == null && (obj.temp = createArray(12));
		for (i = 0; i < 12; ++i) {
			obj.temp[i] = i;
			obj.edge[i] = c.ep[FullEdgeMap[i] + 12] % 12;
		}
		parity = 1;
		for (i = 0; i < 12; ++i) {
			while (obj.edge[i] != i) {
				t = obj.edge[i];
				obj.edge[i] = obj.edge[t];
				obj.edge[t] = t;
				s = obj.temp[i];
				obj.temp[i] = obj.temp[t];
				obj.temp[t] = s;
				parity ^= 1;
			}
		}
		for (i = 0; i < 12; ++i) {
			obj.edge[i] = obj.temp[c.ep[FullEdgeMap[i]] % 12];
		}
		return parity;
	}

	function $std(obj) {
		var i;
		obj.temp == null && (obj.temp = createArray(12));
		for (i = 0; i < 12; ++i) {
			obj.temp[obj.edgeo[i]] = i;
		}
		for (i = 0; i < 12; ++i) {
			obj.edge[i] = obj.temp[obj.edge[i]];
			obj.edgeo[i] = i;
		}
		obj.isStd = true;
	}

	function $swap_0(arr, a, b, c, d) {
		var temp;
		temp = arr[a];
		arr[a] = arr[c];
		arr[c] = temp;
		temp = arr[b];
		arr[b] = arr[d];
		arr[d] = temp;
	}

	function $swapx(obj, x, y) {
		var temp;
		temp = obj.edge[x];
		obj.edge[x] = obj.edgeo[y];
		obj.edgeo[y] = temp;
	}

	function Edge3_0() {
		this.edge = createArray(12);
		this.edgeo = createArray(12);
		this.isStd = true;
		this.temp = null;
	}
	var FullEdgeMap,
		Edge3Prun, factX, mvrot, mvroto, prunValues, Edge3Raw2Sym, Edge3Sym2Raw, Edge3Sym2Mask, syminv_0, symstate;

	function initEdge3Prun() {
		var chk, cord1, cord1x, cord2, cord2x, e, f, find_0, g, j, symState, symcord1, val;
		e = new Edge3_0;
		f = new Edge3_0;
		g = new Edge3_0;
		fill_0(Edge3Prun);

		var depth = 0;
		var done = 1;
		var doneRaw = 1;
		setPruning(Edge3Prun, 0, 0);
		var bfsMoves = [1, 0, 2, 3, 5, 4, 6, 8, 7, 9, 10, 12, 11, 13, 14, 15, 16];
		var start = $.now();
		while (done != 31006080) {
			var inv = depth > 9;
			var depm3 = depth % 3;
			var dep1m3 = (depth + 1) % 3;
			var dep2m3 = (depth + 2) % 3;
			find_0 = inv ? 3 : depm3;
			chk = inv ? depm3 : 3;
			var find_mask = find_0 * 0x55555555;
			if (depth >= EDGE3_MAX_PRUN - 1) {
				break;
			}
			for (var i_ = 0; i_ < 31006080; i_ += 16) {
				val = Edge3Prun[i_ >> 4];
				var chkmask = val ^ find_mask;
				if  (!inv && val == -1 || ((chkmask - 0x55555555) & ~chkmask & 0xaaaaaaaa) == 0) {
					continue;
				}
				for (var i = i_, end = i_ + 16; i < end; ++i, val >>= 2) {
					if ((val & 3) != find_0) {
						continue;
					}
					symcord1 = ~~(i / 20160);
					cord1 = Edge3Sym2Raw[symcord1];
					cord2 = i % 20160;
					$set_4(e, cord1 * 20160 + cord2);
					for (var mi = 0; mi < 17; ++mi) {
						var m = bfsMoves[mi]
						var idx = getMvSym(e.edge, m, Edge3SymMove[m][symcord1]);
						var symx = idx & 7;
						idx >>= 3;
						var prun = getPruning_0(Edge3Prun, idx);
						if (prun != chk) {
							if (prun == dep2m3 || prun == depm3 && idx < i) {
								mi = skipAxis3[m];
							}
							continue;
						}
						setPruning(Edge3Prun, inv ? i : idx, dep1m3);
						++done;
						if (inv) {
							break;
						}
						var symcord1x = ~~(idx / 20160);
						symState = symstate[symcord1x];
						if (symState == 1) {
							continue;
						}
						$set_5(f, e);
						$move_4(f, m);
						$rotate_0(f, symx);
						for (j = 1;
							(symState = symState >> 1) != 0; ++j) {
							if ((symState & 1) != 1) {
								continue;
							}
							$set_5(g, f);
							$rotate_0(g, j);
							var idxx = symcord1x * 20160 + $get_2(g, 10) % 20160;
							if (getPruning_0(Edge3Prun, idxx) == chk) {
								setPruning(Edge3Prun, idxx, dep1m3);
								++done;
							}
						}
					}
				}
			}
			++depth;
			DEBUG && console.log('[scramble 444] edge3 pruning ', depth, done, $.now() - start);
		}
	}

	function getPruning_0(table, index) {
		return table[index >> 4] >> ((index & 15) << 1) & 3;
	}

	function getMvSym(ep, mv, assumeIdx) {
		var mrIdx = mv << 3;
		var movo, mov;
		var idx = 0;
		var mask = 0;
		if (assumeIdx !== undefined && move3std[mv] % 3 == 1) {
			mrIdx |= assumeIdx & 0x7;
			idx = assumeIdx >> 3;
		} else {
			movo = mvroto[mrIdx];
			mov = mvrot[mrIdx];
			for (var i = 0; i < 4; i++) {
				var val = movo[ep[mov[i]]];
				idx = idx * (12 - i) + val - mathlib.bitCount(mask & ((1 << val) - 1));
				mask |= 1 << val;
			}
			idx = Edge3Raw2Sym[idx];
			mrIdx |= idx & 7;
			idx >>= 3;
		}
		movo = mvroto[mrIdx];
		mov = mvrot[mrIdx];
		mask = Edge3Sym2Mask[idx];
		for (var i = 4; i < 10; i++) {
			var val = movo[ep[mov[i]]];
			idx = idx * (12 - i) + val - mathlib.bitCount(mask & ((1 << val) - 1));
			mask |= 1 << val;
		}
		return idx << 3 | mrIdx & 0x7;
	}

	var EDGE3_MAX_PRUN = 10;

	function getprun(edge) {
		var cord1, cord1x, cord2, cord2x, depm3, depth, e, idx, symcord1;
		e = new Edge3_0;
		depth = 0;
		depm3 = getPruning_0(Edge3Prun, edge);
		if (depm3 == 3) {
			return EDGE3_MAX_PRUN;
		}
		while (edge != 0) {
			depm3 = (depm3 + 2) % 3;
			symcord1 = ~~(edge / 20160);
			cord1 = Edge3Sym2Raw[symcord1];
			cord2 = edge % 20160;
			$set_4(e, cord1 * 20160 + cord2);
			for (var m = 0; m < 17; ++m) {
				idx = getMvSym(e.edge, m) >> 3;
				if (getPruning_0(Edge3Prun, idx) == depm3) {
					++depth;
					edge = idx;
					break;
				}
			}
		}
		return depth;
	}

	function getprun_0(edge, prun) {
		var depm3 = getPruning_0(Edge3Prun, edge);
		if (depm3 == 3) {
			return EDGE3_MAX_PRUN;
		}
		return ((0x49249249 << depm3 >> prun) & 3) + prun - 1;
		// (depm3 - prun + 16) % 3 + prun - 1;
	}

	function initEdge3MvRot() {
		var e = new Edge3_0;
		for (var m = 0; m < 21; ++m) {
			for (var r = 0; r < 8; ++r) {
				$set_4(e, 0);
				$move_4(e, m);
				$rotate_0(e, r);
				for (var i = 0; i < 12; ++i) {
					mvrot[m << 3 | r][i] = e.edge[i];
				}
				$std(e);
				for (var i = 0; i < 12; ++i) {
					mvroto[m << 3 | r][i] = e.temp[i];
				}
			}
		}
	}

	var Edge3SymMove = [];

	function initEdge3Sym2Raw() {
		var count, e, idx, j, occ;
		e = new Edge3_0;
		occ = createArray(1485);
		for (var i = 0; i < 1485; i++) {
			occ[i] = 0;
		}
		count = 0;
		for (var i = 0; i < 11880; ++i) {
			if ((occ[i >>> 3] & 1 << (i & 7)) == 0) {
				$set_4(e, i * factX[8]);
				Edge3Sym2Raw[count] = i;
				Edge3Sym2Mask[count] = $get_2(e, 4, true);
				for (j = 0; j < 8; ++j) {
					idx = $get_2(e, 4);
					idx == i && (symstate[count] = symstate[count] | 1 << j);
					occ[idx >> 3] |= 1 << (idx & 7);
					Edge3Raw2Sym[idx] = count << 3 | syminv_0[j];
					$rot_1(e, 0);
					if (j % 2 == 1) {
						$rot_1(e, 1);
						$rot_1(e, 2);
					}
				}
				count++;
			}
		}
		for (var m = 0; m < 20; m++) {
			Edge3SymMove[m] = [];
		}
		for (var i = 0; i < 1538; i++) {
			$set_4(e, Edge3Sym2Raw[i] * factX[8]);
			for (var m = 0; m < 20; ++m) {
				if (move3std[m] % 3 != 1) {
					continue;
				}
				idx = getMvSym(e.edge, m);
				Edge3SymMove[m][i] = ~~((idx >> 3) / 20160) << 3 | idx & 0x7;
			}
		}
	}

	function setPruning(table, index, value) {
		table[index >> 4] ^= (3 ^ value) << ((index & 15) << 1);
	}

	function checkPhase2Edge(epInv, moves, length) {
		var parity = 0;
		for (var i = 0; i < 12; i++) {
			var e = epInv[i];
			var eo = epInv[i + 12];
			for (var j = 0; j < length; j++) {
				var moveMap = epMoveMap[moves[j]];
				e = moveMap[e];
				eo = moveMap[eo];
			}
			if ((e < 12) != (eo >= 12)) {
				return false;
			}
			parity ^= e >= 12 ? 1 : 0
		}
		return parity == 0;
	}

	function $copy_3(obj, c) {
		var i;
		for (i = 0; i < 24; ++i) {
			obj.ep[i] = c.ep[i];
		}
	}

	function doMoveEdge(obj, m_0) {
		var key;
		key = m_0 % 3;
		m_0 = ~~(m_0 / 3);
		switch (m_0) {
			case 6:
				swap(obj.ep, 9, 22, 11, 20, key);
			case 0:
				swap(obj.ep, 0, 1, 2, 3, key);
				swap(obj.ep, 12, 13, 14, 15, key);
				break;
			case 7:
				swap(obj.ep, 2, 16, 6, 12, key);
			case 1:
				swap(obj.ep, 11, 15, 10, 19, key);
				swap(obj.ep, 23, 3, 22, 7, key);
				break;
			case 8:
				swap(obj.ep, 3, 19, 5, 13, key);
			case 2:
				swap(obj.ep, 0, 11, 6, 8, key);
				swap(obj.ep, 12, 23, 18, 20, key);
				break;
			case 9:
				swap(obj.ep, 8, 23, 10, 21, key);
			case 3:
				swap(obj.ep, 4, 5, 6, 7, key);
				swap(obj.ep, 16, 17, 18, 19, key);
				break;
			case 10:
				swap(obj.ep, 14, 0, 18, 4, key);
			case 4:
				swap(obj.ep, 1, 20, 5, 21, key);
				swap(obj.ep, 13, 8, 17, 9, key);
				break;
			case 11:
				swap(obj.ep, 7, 15, 1, 17, key);
			case 5:
				swap(obj.ep, 2, 9, 4, 10, key);
				swap(obj.ep, 14, 21, 16, 22, key);
				break;
		}
	}

	function EdgeCube() {
		this.ep = [];
		for (var i = 0; i < 24; ++i) {
			this.ep[i] = i;
		}
	}

	function $clinit_FullCube_0() {
		$clinit_FullCube_0 = nullMethod;
		move2rot = [35, 1, 34, 2, 4, 6, 22, 5, 19];
	}

	function $$init_3(obj) {
		obj.moveBuffer = createArray(60);
	}

	function $copy_4(obj, c) {
		var i;
		$copy_3(obj.edge, c.edge);
		$copy_1(obj.center, c.center);
		$copy_2(obj.corner, c.corner);
		obj.value = c.value;
		obj.add1 = c.add1;
		obj.length1 = c.length1;
		obj.length2 = c.length2;
		obj.length3 = c.length3;
		obj.sym = c.sym;
		for (i = 0; i < 60; ++i) {
			obj.moveBuffer[i] = c.moveBuffer[i];
		}
		obj.moveLength = c.moveLength;
		obj.edgeAvail = c.edgeAvail;
		obj.centerAvail = c.centerAvail;
		obj.cornerAvail = c.cornerAvail;
	}

	var centerFacelet = [5, 6, 10, 9, 53, 54, 58, 57, 37, 38, 42, 41, 85, 86, 90, 89, 21, 22, 26, 25, 69, 70, 74, 73];
	var cornerFacelet = [[15, 16, 35], [12, 32, 67], [0, 64, 83], [3, 80, 19], [51, 47, 28], [48, 79, 44], [60, 95, 76], [63, 31, 92]];
	var edgeFacelet = [[13, 33], [4, 65], [2, 81], [11, 17], [61, 94], [52, 78], [50, 46], [59, 30], [75, 40], [68, 87], [27, 88], [20, 39], [34, 14], [66, 8], [82, 1], [18, 7], [93, 62], [77, 56], [45, 49], [29, 55], [36, 71], [91, 72], [84, 23], [43, 24]];

	function $fromFacelet(obj, f) {
		var ctMask = 0;
		var edMask = 0;
		var cpMask = 0;
		var coSum = 0;
		for (var i = 0; i < 24; i++) {
			obj.center.ct[i] = f[centerFacelet[i]];
			ctMask += 1 << f[centerFacelet[i]] * 4;
		}
		for (var i = 0; i < 24; i++) {
			for (var j = 0; j < 24; j++) {
				if (f[edgeFacelet[i][0]] == (edgeFacelet[j][0] >> 4) && f[edgeFacelet[i][1]] == (edgeFacelet[j][1] >> 4)) {
					obj.edge.ep[i] = j;
					edMask |= 1 << j;
				}
			}
		}
		var col1, col2, ori;
		for (var i = 0; i<8; i++) {
			for (ori = 0; ori < 3; ori++) {
				if (f[cornerFacelet[i][ori]] == 0 || f[cornerFacelet[i][ori]] == 3) {
					break;
				}
			}
			col1 = f[cornerFacelet[i][(ori + 1) % 3]];
			col2 = f[cornerFacelet[i][(ori + 2) % 3]];
			for (var j = 0; j < 8; j++) {
				if (col1 == (cornerFacelet[j][1] >> 4) && col2 == (cornerFacelet[j][2] >> 4)) {
					obj.corner.cp[i] = j;
					obj.corner.co[i] = ori % 3;
					cpMask |= 1 << j;
					coSum += ori % 3;
					break;
				}
			}
		}
		return (cpMask != 0xff) * 1 + (coSum % 3 != 0) * 2 + (ctMask != 0x444444) * 4 + (edMask != 0xffffff) * 8;;
	}

	function toFacelet(obj) {
		getCenter(obj);
		$getCorner(obj);
		$getEdge(obj);
		var f = [];
		for (var i = 0; i < 24; i++) {
			f[centerFacelet[i]] = obj.center.ct[i];
		}
		for (var i = 0; i < 24; i++) {
			f[edgeFacelet[i][0]] = edgeFacelet[obj.edge.ep[i]][0] >> 4;
			f[edgeFacelet[i][1]] = edgeFacelet[obj.edge.ep[i]][1] >> 4;
		}
		for (var c=0; c<8; c++) {
			var j = obj.corner.cp[c];
			var ori = obj.corner.co[c];
			for (var n=0; n<3; n++) {
				f[cornerFacelet[c][(n + ori) % 3]] = cornerFacelet[j][n] >> 4;
			}
		}
		return f;
	}

	function to333Facelet(obj) {
		var f = toFacelet(obj);
		var chks = [[1, 2], [4, 8], [7, 11], [13, 14], [5, 6, 9, 10]];
		var map4to3 = [0, 1, 3, 4, 5, 7, 12, 13, 15];
		var f3 = [];
		for (var fidx = 0; fidx < 6; fidx++) {
			for (var i = 0; i < chks.length; i++) {
				var cmp = f[fidx << 4 | chks[i][0]];
				for (var j = 1; j < chks[i].length; j++) {
					if (cmp != f[fidx << 4 | chks[i][j]]) {
						console.log('reduction error', chks[i][j], chks[i][0]);
						return null;
					}
				}
			}
			for (var i = 0; i < map4to3.length; i++) {
				f3[fidx * 9 + i] = f[fidx << 4 | map4to3[i]];
			}
		}
		return f3;
	}

	function getCenter(obj) {
		while (obj.centerAvail < obj.moveLength) {
			doMoveCenterCube(obj.center, obj.moveBuffer[obj.centerAvail++]);
		}
		return obj.center;
	}

	function $getCorner(obj) {
		while (obj.cornerAvail < obj.moveLength) {
			$move_3(obj.corner, obj.moveBuffer[obj.cornerAvail++] % 18);
		}
		return obj.corner;
	}

	function $getEdge(obj) {
		while (obj.edgeAvail < obj.moveLength) {
			doMoveEdge(obj.edge, obj.moveBuffer[obj.edgeAvail++]);
		}
		return obj.edge;
	}

	function getMoveString(obj) {
		var finishSym, fixedMoves, i, i_1, idx, move, rot, ret, sym, axis, pows;
		fixedMoves = new Array(obj.moveLength - (obj.add1 ? 2 : 0));
		idx = 0;
		for (i = 0; i < obj.length1; ++i) {
			fixedMoves[idx++] = obj.moveBuffer[i];
		}
		sym = obj.sym;
		for (i = obj.length1 + (obj.add1 ? 2 : 0); i < obj.moveLength; ++i) {
			if (SymMove[sym][obj.moveBuffer[i]] >= 27) {
				fixedMoves[idx++] = SymMove[sym][obj.moveBuffer[i]] - 9;
				rot = move2rot[SymMove[sym][obj.moveBuffer[i]] - 27];
				sym = SymMult[sym][rot];
			} else {
				fixedMoves[idx++] = SymMove[sym][obj.moveBuffer[i]];
			}
		}
		finishSym = SymMult[SymInv[sym]][getSolvedSym(getCenter(obj))];
		ret = [];
		sym = finishSym;
		for (i = idx - 1; i >= 0; --i) {
			move = fixedMoves[i];
			move = ~~(move / 3) * 3 + (2 - move % 3);
			if (SymMove[sym][move] >= 27) {
				ret.push(SymMove[sym][move] - 9);
				rot = move2rot[SymMove[sym][move] - 27];
				sym = SymMult[sym][rot];
			} else {
				ret.push(SymMove[sym][move]);
			}
		}
		axis = -1;
		idx = 0;
		pows = [0, 0, 0];
		for (i = 0; i < ret.length; ++i) {
			move = ret[i];
			if (axis != ~~(move / 3) % 3) {
				for (i_1 = 0; i_1 < 3; i_1++) {
					if (pows[i_1] % 4) {
						ret[idx++] = move2str_1[i_1 * 9 + axis * 3 + pows[i_1] - 1] + ' ';
						pows[i_1] = 0;
					}
				}
				axis = ~~(move / 3) % 3;
			}
			pows[~~(move / 9)] += move % 3 + 1;
		}
		for (i_1 = 0; i_1 < 3; i_1++) {
			if (pows[i_1] % 4) {
				ret[idx++] = move2str_1[i_1 * 9 + axis * 3 + pows[i_1] - 1] + ' ';
				pows[i_1] = 0;
			}
		}
		ret = ret.slice(0, idx).join('');
		return ret;
	}

	function $move_6(obj, m_0) {
		obj.moveBuffer[obj.moveLength++] = m_0;
	}

	function FullCube_3() {
		$$init_3(this);
		this.edge = new EdgeCube();
		this.center = new CenterCube();
		this.corner = new CornerCube_0;
	}

	function FullCube_4(c) {
		FullCube_3.call(this);
		$copy_4(this, c);
	}

	defineClass(FullCube_3, FullCube_4);
	_.add1 = false;
	_.center = null;
	_.centerAvail = 0;
	_.corner = null;
	_.cornerAvail = 0;
	_.edge = null;
	_.edgeAvail = 0;
	_.length1 = 0;
	_.length2 = 0;
	_.length3 = 0;
	_.moveLength = 0;
	_.sym = 0;
	_.value = 0;
	var move2rot;

	function $compare_0(c1, c2) {
		return c2.value - c1.value;
	}

	function $clinit_Moves() {
		$clinit_Moves = nullMethod;
		var i, j;
		move2str_1 = ['U  ', 'U2 ', "U' ", 'R  ', 'R2 ', "R' ", 'F  ', 'F2 ', "F' ", 'D  ', 'D2 ', "D' ", 'L  ', 'L2 ', "L' ", 'B  ', 'B2 ', "B' ", 'Uw ', 'Uw2', "Uw'", 'Rw ', 'Rw2', "Rw'", 'Fw ', 'Fw2', "Fw'", 'Dw ', 'Dw2', "Dw'", 'Lw ', 'Lw2', "Lw'", 'Bw ', 'Bw2', "Bw'"];
		move2std = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 21, 22, 23, 25, 28, 30, 31, 32, 34, 36];
		move3std = [0, 1, 2, 4, 6, 7, 8, 9, 10, 11, 13, 15, 16, 17, 19, 22, 25, 28, 31, 34, 36];
		std2move = createArray(37);
		std3move = createArray(37);
		ckmv = createArray(37, 36);
		ckmv2_0 = createArray(29, 28);
		ckmv3 = createArray(21, 20);
		skipAxis = createArray(36);
		skipAxis2 = createArray(28);
		skipAxis3 = createArray(20);
		epMoveMap = createArray(36, 24);
		for (i = 0; i < 29; ++i) {
			std2move[move2std[i]] = i;
		}
		for (i = 0; i < 21; ++i) {
			std3move[move3std[i]] = i;
		}
		for (i = 0; i < 36; ++i) {
			for (j = 0; j < 36; ++j) {
				ckmv[i][j] = ~~(i / 3) == ~~(j / 3) || ~~(i / 3) % 3 == ~~(j / 3) % 3 && i > j;
			}
			ckmv[36][i] = false;
		}
		for (i = 0; i < 29; ++i) {
			for (j = 0; j < 28; ++j) {
				ckmv2_0[i][j] = ckmv[move2std[i]][move2std[j]];
			}
		}
		for (i = 0; i < 21; ++i) {
			for (j = 0; j < 20; ++j) {
				ckmv3[i][j] = ckmv[move3std[i]][move3std[j]];
			}
		}
		for (i = 0; i < 36; ++i) {
			skipAxis[i] = 36;
			for (j = i; j < 36; ++j) {
				if (!ckmv[i][j]) {
					skipAxis[i] = j - 1;
					break;
				}
			}
		}
		for (i = 0; i < 28; ++i) {
			skipAxis2[i] = 28;
			for (j = i; j < 28; ++j) {
				if (!ckmv2_0[i][j]) {
					skipAxis2[i] = j - 1;
					break;
				}
			}
		}
		for (i = 0; i < 20; ++i) {
			skipAxis3[i] = 20;
			for (j = i; j < 20; ++j) {
				if (!ckmv3[i][j]) {
					skipAxis3[i] = j - 1;
					break;
				}
			}
		}
		for (i = 0; i < 36; ++i) {
			var edge = new EdgeCube();
			doMoveEdge(edge, i);
			for (j = 0; j < 24; j++) {
				epMoveMap[i][edge.ep[j]] = j;
			}
		}
	}

	var ckmv, ckmv2_0, ckmv3, move2std, move2str_1, move3std, skipAxis, skipAxis2, skipAxis3, std2move, std3move, epMoveMap;

	function $doSearch(obj) {
		var MAX_LENGTH2, MAX_LENGTH3, ct, edge, eparity, fb, fbprun, index, length12, length123, p1SolsArr, prun, rl, rlprun, s2ct, s2rl, solcube, ud, udprun;
		obj.solution = '';
		var tt = $.now();
		ud = $getsym(new Center1().fromCube(getCenter(obj.c), 0));
		fb = $getsym(new Center1().fromCube(getCenter(obj.c), 1));
		rl = $getsym(new Center1().fromCube(getCenter(obj.c), 2));
		udprun = Center1SymPrun[ud >> 6];
		fbprun = Center1SymPrun[fb >> 6];
		rlprun = Center1SymPrun[rl >> 6];
		obj.p1SolsCnt = 0;
		obj.arr2idx = 0;
		$clear(obj.p1sols);
		for (obj.length1 = Math.min(udprun, fbprun, rlprun); obj.length1 < MAX_SEARCH_DEPTH; ++obj.length1) {
			if (rlprun <= obj.length1 && phase1Search(obj, rl >>> 6, rl & 63, obj.length1, -1, 0)
					|| udprun <= obj.length1 && phase1Search(obj, ud >>> 6, ud & 63, obj.length1, -1, 0)
					|| fbprun <= obj.length1 && phase1Search(obj, fb >>> 6, fb & 63, obj.length1, -1, 0)) {
				break;
			}
		}
		p1SolsArr = obj.p1sols.array.slice();
		var tt1 = $.now() - tt;
		DEBUG && console.log('[scramble 444] Phase 1 Done in', $.now() - tt);
		p1SolsArr.sort(function(a, b) {
			return a.value - b.value
		});
		MAX_LENGTH2 = 9;
		do {
			OUT: for (length12 = p1SolsArr[0].value; length12 < MAX_SEARCH_DEPTH; ++length12) {
					for (var i = 0; i < p1SolsArr.length; ++i) {
						var cc = p1SolsArr[i];
						if (cc.value > length12) {
							break;
						}
						if (length12 - cc.length1 > MAX_LENGTH2) {
							continue;
						}
						$copy_4(obj.c1, cc);
						var ep = $getEdge(obj.c1).ep;
						$set_2(obj.ct2, getCenter(obj.c1), parity_0(ep));
						s2ct = $getct(obj.ct2);
						s2rl = $getrl(obj.ct2);
						obj.length1 = cc.length1;
						obj.length2 = length12 - cc.length1;
						obj.epInv = [];
						for (var e = 0; e < 24; e++) {
							obj.epInv[ep[e]] = e;
						}
						if (phase2Search(obj, s2ct, s2rl, obj.length2, 28, 0)) {
							break OUT;
						}
					}
				}
				++MAX_LENGTH2;
		} while (length12 == MAX_SEARCH_DEPTH);
		obj.arr2.sort(function(a, b) {
			return a.value - b.value
		});
		DEBUG && console.log('[scramble 444] Phase 2 Done in', $.now() - tt);
		var tt2 = $.now() - tt - tt1;
		index = 0;
		MAX_LENGTH3 = 13;
		do {
			OUT2: for (length123 = obj.arr2[0].value; length123 < MAX_SEARCH_DEPTH; ++length123) {
					for (var i = 0; i < Math.min(obj.arr2idx, PHASE2_SOLS); ++i) {
						if (obj.arr2[i].value > length123) {
							break;
						}
						obj.arr2[i].length3 = length123 - obj.arr2[i].length1 - obj.arr2[i].length2;
						if (obj.arr2[i].length3 > MAX_LENGTH3) {
							continue;
						}
						eparity = $set_6(obj.e12, $getEdge(obj.arr2[i]));
						$set_3(obj.ct3, getCenter(obj.arr2[i]), eparity ^ parity_0($getCorner(obj.arr2[i]).cp));
						ct = $getct_0(obj.ct3);
						edge = $get_2(obj.e12, 10);
						for (var j = 0; j < 12; j++) {
							obj.tempep[0][j] = obj.e12.edge[j];
						}
						prun = getprun($getsym_0(obj.e12));
						if (prun <= obj.arr2[i].length3
								&& phase3Search(obj, obj.tempep[0], ct, prun, obj.arr2[i].length3, 20, 0)) {
							index = i;
							break OUT2;
						}
					}
				}
				++MAX_LENGTH3;
		}
		while (length123 == MAX_SEARCH_DEPTH);
		DEBUG && console.log('[scramble 444] Phase 3 Done in', $.now() - tt);
		var tt3 = $.now() - tt - tt1 - tt2;

		solcube = new FullCube_4(obj.arr2[index]);
		obj.length1 = solcube.length1;
		obj.length2 = solcube.length2;
		obj.length3 = solcube.length3;
		for (var i = 0; i < obj.length3; ++i) {
			$move_6(solcube, move3std[obj.move3[i]]);
		}
		var f3 = to333Facelet(solcube);
		if (!f3) {
			console.log('[scramble 444] Reduction Error!', toFacelet(solcube));
		}
		for (var i = 0; i < 54; i++) {
			f3[i] = "URFDLB"[f3[i]];
		}
		f3 = f3.join('');
		var sol3 = scramble_333.solvFacelet(f3).split(' ');
		var length333 = 0;
		for (var m = 0; m < sol3.length; m++) {
			if (/^[URFDLB][2']?$/.exec(sol3[m])) {
				length333++;
				$move_6(solcube, "URFDLB".indexOf(sol3[m][0]) * 3 + "2'".indexOf(sol3[m][1]) + 1);
			}
		}
		obj.solution = getMoveString(solcube);
		DEBUG && console.log('[scramble 444] 3x3x3 Done in', $.now() - tt);
		DEBUG && console.log('[scramble 444] Phase depths: ', [obj.length1, obj.length2, obj.length3, length333, tt1, tt2, tt3]);
		return [obj.length1, obj.length2, obj.length3, length333, tt1, tt2, tt3];
	}

	function printState(state) {
		var tmp =
			"          U0U1U2U3\n" +
			"          U4U5U6U7\n" +
			"          U8U9UaUb\n" +
			"          UcUdUeUf\n" +
			"L0L1L2L3  F0F1F2F3  R0R1R2R3  B0B1B2B3\n" +
			"L4L5L6L7  F4F5F6F7  R4R5R6R7  B4B5B6B7\n" +
			"L8L9LaLb  F8F9FaFb  R8R9RaRb  B8B9BaBb\n" +
			"LcLdLeLf  FcFdFeFf  RcRdReRf  BcBdBeBf\n" +
			"          D0D1D2D3\n" +
			"          D4D5D6D7\n" +
			"          D8D9DaDb\n" +
			"          DcDdDeDf\n";
		tmp = tmp.replace(/[URFDLB][0-9a-f]/g, function(m) {
			var i1 = "URFDLB".indexOf(m[0]);
			var i2 = "0123456789abcdef".indexOf(m[1]);
			var posit = state[i1 * 16 + i2];
			return "URFDLB"[posit] + ' ';
		});
	}

	function $init2_0(obj, sym) {
		var ctp, i, next, s2ct, s2rl;
		$copy_4(obj.c1, obj.c);
		for (i = 0; i < obj.length1; ++i) {
			$move_6(obj.c1, obj.move1[i]);
		}
		switch (finish_0[sym]) {
			case 0:
				$move_6(obj.c1, 24);
				$move_6(obj.c1, 35);
				obj.move1[obj.length1] = 24;
				obj.move1[obj.length1 + 1] = 35;
				obj.add1 = true;
				sym = 19;
				break;
			case 12869:
				$move_6(obj.c1, 18);
				$move_6(obj.c1, 29);
				obj.move1[obj.length1] = 18;
				obj.move1[obj.length1 + 1] = 29;
				obj.add1 = true;
				sym = 34;
				break;
			case 735470:
				obj.add1 = false;
				sym = 0;
		}
		$set_2(obj.ct2, getCenter(obj.c1), parity_0($getEdge(obj.c1).ep));
		s2ct = $getct(obj.ct2);
		s2rl = $getrl(obj.ct2);
		ctp = ctprun[s2ct * 70 + s2rl];
		obj.c1.value = ctp + obj.length1;
		obj.c1.length1 = obj.length1;
		obj.c1.add1 = obj.add1;
		obj.c1.sym = sym;
		++obj.p1SolsCnt;
		if (obj.p1sols.size < PHASE2_ATTS) {
			next = new FullCube_4(obj.c1);
		} else {
			next = $poll(obj.p1sols);
			next.value > obj.c1.value && $copy_4(next, obj.c1);
		}
		$add(obj.p1sols, next);
		return obj.p1SolsCnt == PHASE1_SOLS;
	}

	function $init3(obj) {
		if (!checkPhase2Edge(obj.epInv, obj.move2, obj.length2)) {
			return false;
		}
		var ct, eparity, i, prun;
		$copy_4(obj.c2, obj.c1);
		for (i = 0; i < obj.length2; ++i) {
			$move_6(obj.c2, obj.move2[i]);
		}
		eparity = $set_6(obj.e12, $getEdge(obj.c2));
		$set_3(obj.ct3, getCenter(obj.c2), eparity ^ parity_0($getCorner(obj.c2).cp));
		ct = $getct_0(obj.ct3);
		$get_2(obj.e12, 10);
		prun = getprun($getsym_0(obj.e12));
		!obj.arr2[obj.arr2idx] ? (obj.arr2[obj.arr2idx] = new FullCube_4(obj.c2)) : $copy_4(obj.arr2[obj.arr2idx], obj.c2);
		obj.arr2[obj.arr2idx].value = obj.length1 + obj.length2 + Math.max(prun, prun_0[ct]);
		obj.arr2[obj.arr2idx].length2 = obj.length2;
		++obj.arr2idx;
		return obj.arr2idx == obj.arr2.length;
	}

	function phase1Search(obj, ct, sym, maxl, lm, depth) {
		var axis, ctx, m_0, power, prun, symx;
		if (ct == 0) {
			return maxl == 0 && $init2_0(obj, sym);
		}
		for (axis = 0; axis < 27; axis += 3) {
			if (axis == lm || axis == lm - 9 || axis == lm - 18) {
				continue;
			}
			for (power = 0; power < 3; ++power) {
				m_0 = axis + power;
				ctx = Center1SymMove[ct][SymMove[sym][m_0]];
				prun = Center1SymPrun[ctx >>> 6];
				if (prun >= maxl) {
					if (prun > maxl) {
						break;
					}
					continue;
				}
				symx = SymMult[sym][ctx & 63];
				ctx >>>= 6;
				obj.move1[depth] = m_0;
				if (phase1Search(obj, ctx, symx, maxl - 1, axis, depth + 1)) {
					return true;
				}
			}
		}
		return false;
	}

	function phase2Search(obj, ct, rl, maxl, lm, depth) {
		var ctx, m_0, prun, rlx;
		if (ct == 0 && ctprun[rl] == 0 && maxl < 5) {
			return maxl == 0 && $init3(obj);
		}
		for (m_0 = 0; m_0 < 23; ++m_0) {
			if (ckmv2_0[lm][m_0]) {
				m_0 = skipAxis2[m_0];
				continue;
			}
			ctx = ctmv[ct][m_0];
			rlx = rlmv[rl][m_0];
			prun = ctprun[ctx * 70 + rlx];
			if (prun >= maxl) {
				prun > maxl && (m_0 = skipAxis2[m_0]);
				continue;
			}
			obj.move2[depth] = move2std[m_0];
			if (phase2Search(obj, ctx, rlx, maxl - 1, m_0, depth + 1)) {
				return true;
			}
		}
		return false;
	}

	function phase3Search(obj, eplast, ct, prun, maxl, lm, depth) {
		if (maxl == 0) {
			return true;
		}
		var ep = obj.tempep[depth];
		if (lm != 20) {
			var movo = mvroto[lm << 3];
			var mov = mvrot[lm << 3];
			for (var i = 0; i < 12; i++) {
				ep[i] = movo[eplast[mov[i]]];
			}
		}
		for (var m = 0; m < 17; m++) {
			if (ckmv3[lm][m]) {
				m = skipAxis3[m];
				continue;
			}
			var ctx = ctmove[ct][m];
			var prun1 = prun_0[ctx];
			if (prun1 >= maxl) {
				prun1 > maxl && m < 14 && (m = skipAxis3[m]);
				continue;
			}
			var prunx = getprun_0(getMvSym(ep, m) >> 3, prun);
			if (prunx >= maxl) {
				prunx > maxl && m < 14 && (m = skipAxis3[m]);
				continue;
			}
			if (phase3Search(obj, ep, ctx, prunx, maxl - 1, m, depth + 1)) {
				obj.move3[depth] = m;
				return true;
			}
		}
		return false;
	}

	function Search_4() {
		var i;
		this.p1sols = new PriorityQueue_0();
		this.move1 = createArray(15);
		this.move2 = createArray(20);
		this.move3 = createArray(20);
		this.c1 = new FullCube_3;
		this.c2 = new FullCube_3;
		this.ct2 = new Center2;
		this.ct3 = new Center3;
		this.e12 = new Edge3_0;
		this.tempep = createArray(20);
		this.arr2 = createArray(PHASE2_SOLS);
		for (i = 0; i < 20; ++i) {
			this.tempep[i] = [];
		}
		this.add1 = false;
		this.arr2idx = 0;
		this.c = null;
		this.length1 = 0;
		this.length2 = 0;
		this.p1SolsCnt = 0;
		this.solution = '';
	}

	function parity_0(arr) {
		var parity = 0;
		var mask = 0;
		for (var i = 0; i < arr.length; i++) {
			var val = arr[i];
			parity ^= val - mathlib.bitCount(mask & ((1 << val) - 1));
			mask |= 1 << val;
		}
		return parity & 1;
	}

	function swap(arr, a, b, c, d, key) {
		var temp;
		switch (key) {
			case 0:
				temp = arr[d];
				arr[d] = arr[c];
				arr[c] = arr[b];
				arr[b] = arr[a];
				arr[a] = temp;
				return;
			case 1:
				temp = arr[a];
				arr[a] = arr[c];
				arr[c] = temp;
				temp = arr[b];
				arr[b] = arr[d];
				arr[d] = temp;
				return;
			case 2:
				temp = arr[a];
				arr[a] = arr[b];
				arr[b] = arr[c];
				arr[c] = arr[d];
				arr[d] = temp;
				return;
		}
	}

	function $add(obj, o) {
		if ($offer(obj, o)) {
			return true;
		}
	}

	function $add_0(obj, o) {
		obj.array[obj.size++] = o;
		return true;
	}

	function $clear(obj) {
		obj.array = [];
		obj.size = 0;
	}

	function $get_4(obj, index) {
		return obj.array[index];
	}

	function $remove_0(obj, index) {
		var previous;
		previous = obj.array[index];
		obj.array.splice(index, 1);
		--obj.size;
		return previous;
	}

	function $set_7(obj, index, o) {
		var previous;
		previous = obj.array[index];
		obj.array[index] = o;
		return previous;
	}

	function PriorityQueue_0() {
		this.array = [];
		this.array.length = PHASE2_ATTS;
		this.size = 0;
	}

	function binarySearch_0(sortedArray, key) {
		var high, low, mid, midVal;
		low = 0;
		high = sortedArray.length - 1;
		while (low <= high) {
			mid = low + ((high - low) >> 1);
			midVal = sortedArray[mid];
			if (midVal < key) {
				low = mid + 1;
			} else if (midVal > key) {
				high = mid - 1;
			} else {
				return mid;
			}
		}
		return -low - 1;
	}

	function fill_0(a) {
		for (var i = 0; i < a.length; i++) {
			a[i] = -1;
		}
	}

	function $mergeHeaps(obj, node) {
		var heapSize, smallestChild, value, leftChild, rightChild, smallestChild_0;
		heapSize = obj.size;
		value = $get_4(obj, node);
		while (node * 2 + 1 < heapSize) {
			smallestChild = (leftChild = 2 * node + 1, rightChild = leftChild + 1, smallestChild_0 = leftChild, rightChild < heapSize && $compare_0($get_4(obj, rightChild), $get_4(obj, leftChild)) < 0 && (smallestChild_0 = rightChild), smallestChild_0);
			if ($compare_0(value, $get_4(obj, smallestChild)) < 0) {
				break;
			}
			$set_7(obj, node, $get_4(obj, smallestChild));
			node = smallestChild;
		}
		$set_7(obj, node, value);
	}

	function $offer(obj, e) {
		var childNode, node;
		node = obj.size;
		$add_0(obj, e);
		while (node > 0) {
			childNode = node;
			node = (node - 1) >> 1;
			if ($compare_0($get_4(obj, node), e) <= 0) {
				$set_7(obj, childNode, e);
				return true;
			}
			$set_7(obj, childNode, $get_4(obj, node));
		}
		$set_7(obj, node, e);
		return true;
	}

	function $poll(obj) {
		var value;
		if (obj.size == 0) {
			return null;
		}
		value = $get_4(obj, 0);
		$removeAtIndex(obj);
		return value;
	}

	function $removeAtIndex(obj) {
		var lastValue;
		lastValue = $remove_0(obj, obj.size - 1);
		if (0 < obj.size) {
			$set_7(obj, 0, lastValue);
			$mergeHeaps(obj, 0);
		}
	}

	var searcher;

	function init() {
		init = nullMethod;
		var tt = $.now();
		DEBUG && console.log('[scramble 444] start initialization');
		$clinit_Moves();
		$clinit_Center1();
		$clinit_Center2();
		$clinit_Center3();
		$clinit_Edge3();
		$clinit_CornerCube();
		$clinit_FullCube_0();
		DEBUG && console.log('[scramble 444] alloc tables', $.now() - tt);
		initSymMeta();
		DEBUG && console.log('[scramble 444] initSymMeta', $.now() - tt);
		Center1Raw2Sym = createArray(735471);
		initCenter1Sym2Raw();
		DEBUG && console.log('[scramble 444] initCenter1Sym2Raw', $.now() - tt);
		initCenter1MoveTable();
		DEBUG && console.log('[scramble 444] initCenter1MoveTable', $.now() - tt);
		Center1Raw2Sym = null;
		initCenter1Prun();
		DEBUG && console.log('[scramble 444] initCenter1Prun', $.now() - tt);

		initCenter2();
		DEBUG && console.log('[scramble 444] initCenter2', $.now() - tt);
		initCenter3();
		DEBUG && console.log('[scramble 444] initCenter3', $.now() - tt);
		initEdge3MvRot();
		DEBUG && console.log('[scramble 444] initEdge3MvRot', $.now() - tt);
		initEdge3Sym2Raw();
		DEBUG && console.log('[scramble 444] initEdge3Sym2Raw', $.now() - tt);
		initEdge3Prun();
		DEBUG && console.log('[scramble 444] initEdge3Prun', $.now() - tt);
		searcher = new Search_4();
	}

	function partialSolvedState(ctMask, edMask, cnMask, neut) {
		var facelet;
		var colmap = [0, 1, 2, 3, 4, 5];
		if (neut) {
			var ori = mathlib.rn([1, 4, 8, 1, 1, 1, 24][neut]);
			if (ori >= 8) {
				mathlib.acycle(colmap, [0, 1, 2], ori >> 3);
				mathlib.acycle(colmap, [3, 4, 5], ori >> 3);
				ori &= 0x7;
			}
			if (ori >= 4) {
				mathlib.acycle(colmap, [0, 1, 3, 4], 2);
				ori &= 0x3;
			}
			if (ori >= 1) {
				mathlib.acycle(colmap, [1, 2, 4, 5], ori);
			}
		}
		var solved = true;
		for (var _ = 0; solved && _ < 100; _++) {
			var cc = new FullCube_3;
			var ctSwaps = [];
			var edSwaps = [];
			var cnSwaps = [];
			for (var i = 0; i < 24; i++) {
				if (ctMask >> i & 1) {
					ctSwaps.push(i);
				}
				if (edMask >> i & 1) {
					edSwaps.push(i);
				}
				if (cnMask >> i & 1) {
					cnSwaps.push(i);
				}
			}
			var ctPerm = mathlib.rndPerm(ctSwaps.length);
			for (var i = 0; i < ctSwaps.length; i++) {
				cc.center.ct[ctSwaps[i]] = centerFacelet[ctSwaps[ctPerm[i]]] >> 4;
			}
			var edPerm = mathlib.rndPerm(edSwaps.length);
			for (var i = 0; i < edSwaps.length; i++) {
				cc.edge.ep[edSwaps[i]] = edSwaps[edPerm[i]];
			}
			var cnPerm = mathlib.rndPerm(cnSwaps.length);
			var coSum = 24;
			for (var i = 0; i < cnSwaps.length; i++) {
				var co = mathlib.rn(3);
				cc.corner.co[cnSwaps[i]] = co;
				cc.corner.cp[cnSwaps[i]] = cnSwaps[cnPerm[i]];
				coSum -= co;
			}
			if (coSum % 3 != 0) {
				cc.corner.co[cnSwaps[0]] = (cc.corner.co[cnSwaps[0]] + coSum) % 3;
			}
			facelet = toFacelet(cc);
			for (var i = 0; i < 96; i++) {
				facelet[i] = "URFDLB".charAt(colmap[facelet[i]]);
				if (facelet[i] != facelet[i >> 4 << 4]) {
					solved = false;
				}
			}
		}
		return facelet.join("");
	}

	function genFacelet(facelet) {
		init();
		facelet = facelet.split('');
		for (var i = 0; i < 96; i++) {
			facelet[i] = "URFDLB".indexOf(facelet[i]);
		}
		DEBUG && console.log('[scramble 444] Scramble to state:');
		DEBUG && printState(facelet);
		searcher.c = new FullCube_3;
		var chk = $fromFacelet(searcher.c, facelet);
		if (chk != 0) {
			console.log('[scramble 444] State Check Error!', chk, facelet);
		}
		$doSearch(searcher);
		return searcher.solution.replace(/\s+/g, ' ');
	}

	function testbench(nsolv) {
		init();
		nsolv = nsolv || 100;
		var avgs = [];
		for (var i = 0; i < nsolv; i++) {
			var facelet = partialSolvedState(0xffffff, 0xffffff, 0xff).split('');
			for (var j = 0; j < 96; j++) {
				facelet[j] = "URFDLB".indexOf(facelet[j]);
			}
			searcher.c = new FullCube_3;
			var chk = $fromFacelet(searcher.c, facelet);
			if (chk != 0) {
				console.log('[scramble 444] State Check Error!', chk, facelet);
			}
			var tt = $.now();
			var data = $doSearch(searcher);
			for (var j = 0; j < data.length; j++) {
				avgs[j] = (avgs[j] || 0) + data[j];
			}
			console.log(avgs.map((x) => ~~(100 * x / (i + 1)) / 100));
		}
	}

	function getPartialScramble(ctMask, edMask, cnMask, neut) {
		return genFacelet(partialSolvedState(ctMask, edMask, cnMask, neut));
	}

	function getRandomScramble() {
		return genFacelet(partialSolvedState(0xffffff, 0xffffff, 0xff));
	}

	function getYauUD3CScramble(type, length, cases, neut) {
		var unsolv = mathlib.rn(4);
		return getPartialScramble(0xffff00, 0xff0ff0 | (0x1001 << unsolv), 0xff, neut);
	}

	function getHoyaRLDAScramble(type, length, cases, neut) {
		var unsolv = mathlib.rn(2) * 4;
		return getPartialScramble(0x0000f0 | (0xf00 << unsolv), 0xffffff, 0xff, neut);
	}

	function getHoyaRLCAScramble(type, length, cases, neut) {
		var unsolv = mathlib.rn(2) * 4;
		return getPartialScramble(0x0000f0 | (0xf00 << unsolv), 0xff0ff0, 0xff, neut);
	}

	function getEdgeScramble() {
		return getPartialScramble(0x000000, 0xffffff, 0xff);
	}

	function getEdgeOnlyScramble() {
		return getPartialScramble(0x000000, 0xffffff, 0x00);
	}

	function getCenterOnlyScramble() {
		return getPartialScramble(0xffffff, 0x000000, 0x00);
	}

	function getLastLayerScramble(type, length, cases, neut) {
		return getPartialScramble(0x000000, 0x0f00f0, 0xf0, neut);
	}

	function getCenterUDSolvedScramble(type, length, cases, neut) {
		return getPartialScramble(0xffff00, 0xffffff, 0xff, neut);
	}

	function getCenterRLSolvedScramble(type, length, cases, neut) {
		return getPartialScramble(0x00ffff, 0xffffff, 0xff, neut);
	}

	function getLast8DedgeScramble(type, length, cases, neut) {
		return getPartialScramble(0x000000, 0xff0ff0, 0xff, neut);
	}

	function getELLScramble(type, length, cases, neut) {
		return getPartialScramble(0x000000, 0x0f00f0, 0x00, neut);
	}

	scrMgr.reg('444wca', getRandomScramble)
		('4edge', getEdgeScramble)
		('444edo', getEdgeOnlyScramble)
		('444cto', getCenterOnlyScramble)
		('444ll', getLastLayerScramble)
		('444ell', getELLScramble)
		('444ctud', getCenterUDSolvedScramble)
		('444ctrl', getCenterRLSolvedScramble)
		('444l8e', getLast8DedgeScramble)
		('444ud3c', getYauUD3CScramble)
		('444rlda', getHoyaRLDAScramble)
		('444rlca', getHoyaRLCAScramble)
	;

	return {
		getRandomScramble: getRandomScramble,
		getPartialScramble: getPartialScramble,
		testbench: testbench
	}
})(mathlib.Cnk, mathlib.circle);
