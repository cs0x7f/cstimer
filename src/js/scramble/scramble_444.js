"use strict";

var scramble_444 = (function(Cnk, circle) {

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
		ctsmv = createArray(15582, 36);
		sym2raw = createArray(15582);
		csprun = createArray(15582);
		symmult = createArray(48, 48);
		symmove = createArray(48, 36);
		syminv = createArray(48);
		finish_0 = createArray(48);
	}

	function $$init_1(obj) {
		obj.ct = createArray(24);
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
		var i_0, idx, r;
		idx = 0;
		r = 8;
		for (i_0 = 23; i_0 >= 0; --i_0) {
			obj.ct[i_0] == 1 && (idx += Cnk[i_0][r--]);
		}
		return idx;
	}

	function $getsym(obj) {
		var cord, j;
		if (raw2sym != null) {
			return raw2sym[$get_1(obj)];
		}
		for (j = 0; j < 48; ++j) {
			cord = raw2sym_0($get_1(obj));
			if (cord != -1)
				return cord * 64 + j;
			$rot(obj, 0);
			j % 2 == 1 && $rot(obj, 1);
			j % 8 == 7 && $rot(obj, 2);
			j % 16 == 15 && $rot(obj, 3);
		}
	}

	function $move(obj, m_0) {
		var key;
		key = m_0 % 3;
		m_0 = ~~(m_0 / 3);
		switch (m_0) {
			case 0:
				swap(obj.ct, 0, 1, 2, 3, key);
				break;
			case 1:
				swap(obj.ct, 16, 17, 18, 19, key);
				break;
			case 2:
				swap(obj.ct, 8, 9, 10, 11, key);
				break;
			case 3:
				swap(obj.ct, 4, 5, 6, 7, key);
				break;
			case 4:
				swap(obj.ct, 20, 21, 22, 23, key);
				break;
			case 5:
				swap(obj.ct, 12, 13, 14, 15, key);
				break;
			case 6:
				swap(obj.ct, 0, 1, 2, 3, key);
				swap(obj.ct, 8, 20, 12, 16, key);
				swap(obj.ct, 9, 21, 13, 17, key);
				break;
			case 7:
				swap(obj.ct, 16, 17, 18, 19, key);
				swap(obj.ct, 1, 15, 5, 9, key);
				swap(obj.ct, 2, 12, 6, 10, key);
				break;
			case 8:
				swap(obj.ct, 8, 9, 10, 11, key);
				swap(obj.ct, 2, 19, 4, 21, key);
				swap(obj.ct, 3, 16, 5, 22, key);
				break;
			case 9:
				swap(obj.ct, 4, 5, 6, 7, key);
				swap(obj.ct, 10, 18, 14, 22, key);
				swap(obj.ct, 11, 19, 15, 23, key);
				break;
			case 10:
				swap(obj.ct, 20, 21, 22, 23, key);
				swap(obj.ct, 0, 8, 4, 14, key);
				swap(obj.ct, 3, 11, 7, 13, key);
				break;
			case 11:
				swap(obj.ct, 12, 13, 14, 15, key);
				swap(obj.ct, 1, 20, 7, 18, key);
				swap(obj.ct, 0, 23, 6, 17, key);
		}
	}

	function $rot(obj, r) {
		switch (r) {
			case 0:
				$move(obj, 19);
				$move(obj, 28);
				break;
			case 1:
				$move(obj, 21);
				$move(obj, 32);
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
				$move(obj, 18);
				$move(obj, 29);
				$move(obj, 24);
				$move(obj, 35);
		}
	}

	function $rotate(obj, r) {
		var j;
		for (j = 0; j < r; ++j) {
			$rot(obj, 0);
			j % 2 == 1 && $rot(obj, 1);
			j % 8 == 7 && $rot(obj, 2);
			j % 16 == 15 && $rot(obj, 3);
		}
	}

	function $set_0(obj, idx) {
		var i_0, r;
		r = 8;
		for (i_0 = 23; i_0 >= 0; --i_0) {
			obj.ct[i_0] = 0;
			if (idx >= Cnk[i_0][r]) {
				idx -= Cnk[i_0][r--];
				obj.ct[i_0] = 1;
			}
		}
	}

	function $set_1(obj, c) {
		var i_0;
		for (i_0 = 0; i_0 < 24; ++i_0) {
			obj.ct[i_0] = c.ct[i_0];
		}
	}

	function Center1_0() {
		var i_0;
		$$init_1(this);
		for (i_0 = 0; i_0 < 8; ++i_0) {
			this.ct[i_0] = 1;
		}
		for (i_0 = 8; i_0 < 24; ++i_0) {
			this.ct[i_0] = 0;
		}
	}

	function Center1_1(c, urf) {
		var i_0;
		$$init_1(this);
		for (i_0 = 0; i_0 < 24; ++i_0) {
			this.ct[i_0] = c.ct[i_0] % 3 == urf ? 1 : 0;
		}
	}

	function Center1_2(ct) {
		var i_0;
		$$init_1(this);
		for (i_0 = 0; i_0 < 24; ++i_0) {
			this.ct[i_0] = ct[i_0];
		}
	}

	function createMoveTable() {
		var c, d, i_0, m_0;
		c = new Center1_0;
		d = new Center1_0;
		for (i_0 = 0; i_0 < 15582; ++i_0) {
			$set_0(d, sym2raw[i_0]);
			for (m_0 = 0; m_0 < 36; ++m_0) {
				$set_1(c, d);
				$move(c, m_0);
				ctsmv[i_0][m_0] = $getsym(c);
			}
		}
	}

	function createPrun() {
		var check, depth, done, i_0, idx, inv, m_0, select;
		fill_0(csprun);
		csprun[0] = 0;
		depth = 0;
		done = 1;
		while (done != 15582) {
			inv = depth > 4;
			select = inv ? -1 : depth;
			check = inv ? depth : -1;
			++depth;
			for (i_0 = 0; i_0 < 15582; ++i_0) {
				if (csprun[i_0] != select) {
					continue;
				}
				for (m_0 = 0; m_0 < 27; ++m_0) {
					idx = ~~ctsmv[i_0][m_0] >>> 6;
					if (csprun[idx] != check) {
						continue;
					}
					++done;
					if (inv) {
						csprun[i_0] = depth;
						break;
					} else {
						csprun[idx] = depth;
					}
				}
			}
		}
	}

	function getSolvedSym(cube) {
		var c, check, i_0, j;
		c = new Center1_2(cube.ct);
		for (j = 0; j < 48; ++j) {
			check = true;
			for (i_0 = 0; i_0 < 24; ++i_0) {
				if (c.ct[i_0] != (centerFacelet[i_0] >> 4)) {
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

	function initSym_0() {
		var c, d, e, f, i_0, j, k_0;
		c = new Center1_0;
		for (i_0 = 0; i_0 < 24; ++i_0) {
			c.ct[i_0] = i_0;
		}
		d = new Center1_2(c.ct);
		e = new Center1_2(c.ct);
		f = new Center1_2(c.ct);
		for (i_0 = 0; i_0 < 48; ++i_0) {
			for (j = 0; j < 48; ++j) {
				for (k_0 = 0; k_0 < 48; ++k_0) {
					if ($equals(c, d)) {
						symmult[i_0][j] = k_0;
						k_0 == 0 && (syminv[i_0] = j);
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
			i_0 % 2 == 1 && $rot(c, 1);
			i_0 % 8 == 7 && $rot(c, 2);
			i_0 % 16 == 15 && $rot(c, 3);
		}
		for (i_0 = 0; i_0 < 48; ++i_0) {
			$set_1(c, e);
			$rotate(c, syminv[i_0]);
			for (j = 0; j < 36; ++j) {
				$set_1(d, c);
				$move(d, j);
				$rotate(d, i_0);
				for (k_0 = 0; k_0 < 36; ++k_0) {
					$set_1(f, e);
					$move(f, k_0);
					if ($equals(f, d)) {
						symmove[i_0][j] = k_0;
						break;
					}
				}
			}
		}
		$set_0(c, 0);
		for (i_0 = 0; i_0 < 48; ++i_0) {
			finish_0[syminv[i_0]] = $get_1(c);
			$rot(c, 0);
			i_0 % 2 == 1 && $rot(c, 1);
			i_0 % 8 == 7 && $rot(c, 2);
			i_0 % 16 == 15 && $rot(c, 3);
		}
	}

	function initSym2Raw() {
		var c, count, i_0, idx, j, occ;
		c = new Center1_0;
		occ = createArray(22984);
		for (i_0 = 0; i_0 < 22984; i_0++) {
			occ[i_0] = 0;
		}
		count = 0;
		for (i_0 = 0; i_0 < 735471; ++i_0) {
			if ((occ[~~i_0 >>> 5] & 1 << (i_0 & 31)) == 0) {
				$set_0(c, i_0);
				for (j = 0; j < 48; ++j) {
					idx = $get_1(c);
					occ[~~idx >>> 5] |= 1 << (idx & 31);
					raw2sym != null && (raw2sym[idx] = count << 6 | syminv[j]);
					$rot(c, 0);
					j % 2 == 1 && $rot(c, 1);
					j % 8 == 7 && $rot(c, 2);
					j % 16 == 15 && $rot(c, 3);
				}
				sym2raw[count++] = i_0;
			}
		}
	}

	function raw2sym_0(n) {
		var m_0;
		m_0 = binarySearch_0(sym2raw, n);
		return m_0 >= 0 ? m_0 : -1;
	}

	defineClass(Center1_0, Center1_1, Center1_2);

	var csprun, ctsmv, finish_0, raw2sym = null,
		sym2raw, syminv, symmove, symmult;

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
		var i_0, idx, r;
		idx = 0;
		r = 8;
		for (i_0 = 14; i_0 >= 0; --i_0) {
			obj.ct[i_0] != obj.ct[15] && (idx += Cnk[i_0][r--]);
		}
		return idx;
	}

	function $getrl(obj) {
		var i_0, idx, r;
		idx = 0;
		r = 4;
		for (i_0 = 6; i_0 >= 0; --i_0) {
			obj.rl[i_0] != obj.rl[7] && (idx += Cnk[i_0][r--]);
		}
		return idx * 2 + obj.parity;
	}

	function $move_0(obj, m_0) {
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
				$move_0(obj, 19);
				$move_0(obj, 28);
				break;
			case 1:
				$move_0(obj, 21);
				$move_0(obj, 32);
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
		var i_0;
		for (i_0 = 0; i_0 < 16; ++i_0) {
			obj.ct[i_0] = c.ct[i_0] % 3;
		}
		for (i_0 = 0; i_0 < 8; ++i_0) {
			obj.rl[i_0] = c.ct[i_0 + 16];
		}
		obj.parity = edgeParity;
	}

	function $setct(obj, idx) {
		var i_0, r;
		r = 8;
		obj.ct[15] = 0;
		for (i_0 = 14; i_0 >= 0; --i_0) {
			if (idx >= Cnk[i_0][r]) {
				idx -= Cnk[i_0][r--];
				obj.ct[i_0] = 1;
			} else {
				obj.ct[i_0] = 0;
			}
		}
	}

	function $setrl(obj, idx) {
		var i_0, r;
		obj.parity = idx & 1;
		idx >>>= 1;
		r = 4;
		obj.rl[7] = 0;
		for (i_0 = 6; i_0 >= 0; --i_0) {
			if (idx >= Cnk[i_0][r]) {
				idx -= Cnk[i_0][r--];
				obj.rl[i_0] = 1;
			} else {
				obj.rl[i_0] = 0;
			}
		}
	}

	function Center2_0() {
		this.rl = createArray(8);
		this.ct = createArray(16);
	}

	function init_3() {
		var c, ct, ctx, depth, done, i_0, idx, j, m_0, rl, rlx;
		c = new Center2_0;
		for (i_0 = 0; i_0 < 70; ++i_0) {
			for (m_0 = 0; m_0 < 28; ++m_0) {
				$setrl(c, i_0);
				$move_0(c, move2std[m_0]);
				rlmv[i_0][m_0] = $getrl(c);
			}
		}
		for (i_0 = 0; i_0 < 70; ++i_0) {
			$setrl(c, i_0);
			for (j = 0; j < 16; ++j) {
				rlrot[i_0][j] = $getrl(c);
				$rot_0(c, 0);
				j % 2 == 1 && $rot_0(c, 1);
				j % 8 == 7 && $rot_0(c, 2);
			}
		}
		for (i_0 = 0; i_0 < 6435; ++i_0) {
			$setct(c, i_0);
			for (j = 0; j < 16; ++j) {
				ctrot[i_0][j] = $getct(c) & 65535;
				$rot_0(c, 0);
				j % 2 == 1 && $rot_0(c, 1);
				j % 8 == 7 && $rot_0(c, 2);
			}
		}
		for (i_0 = 0; i_0 < 6435; ++i_0) {
			for (m_0 = 0; m_0 < 28; ++m_0) {
				$setct(c, i_0);
				$move_0(c, move2std[m_0]);
				ctmv[i_0][m_0] = $getct(c) & 65535;
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
			for (i_0 = 0; i_0 < 450450; ++i_0) {
				if (ctprun[i_0] != select) {
					continue;
				}
				ct = ~~(i_0 / 70);
				rl = i_0 % 70;
				for (m_0 = 0; m_0 < 23; ++m_0) {
					ctx = ctmv[ct][m_0];
					rlx = rlmv[rl][m_0];
					idx = ctx * 70 + rlx;
					if (ctprun[idx] != check) {
						continue;
					}
					++done;
					if (inv) {
						ctprun[i_0] = depth;
						break;
					} else {
						ctprun[idx] = depth;
					}
				}
			}
		}
	}

	defineClass(Center2_0);
	_.parity = 0;
	var ctmv, ctprun, ctrot, pmv, rlmv, rlrot;

	function $clinit_Center3() {
		$clinit_Center3 = nullMethod;
		ctmove = createArray(29400, 20);
		pmove = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1];
		prun_0 = createArray(29400);
		rl2std = [0, 9, 14, 23, 27, 28, 41, 42, 46, 55, 60, 69];
		std2rl = createArray(70);
	}

	function $getct_0(obj) {
		var check, i_0, idx, idxrl, r;
		idx = 0;
		r = 4;
		for (i_0 = 6; i_0 >= 0; --i_0) {
			obj.ud[i_0] != obj.ud[7] && (idx += Cnk[i_0][r--]);
		}
		idx *= 35;
		r = 4;
		for (i_0 = 6; i_0 >= 0; --i_0) {
			obj.fb[i_0] != obj.fb[7] && (idx += Cnk[i_0][r--]);
		}
		idx *= 12;
		check = obj.fb[7] ^ obj.ud[7];
		idxrl = 0;
		r = 4;
		for (i_0 = 7; i_0 >= 0; --i_0) {
			obj.rl[i_0] != check && (idxrl += Cnk[i_0][r--]);
		}
		return obj.parity + 2 * (idx + std2rl[idxrl]);
	}

	function $move_1(obj, i_0) {
		obj.parity ^= pmove[i_0];
		switch (i_0) {
			case 0:
			case 1:
			case 2:
				swap(obj.ud, 0, 1, 2, 3, i_0 % 3);
				break;
			case 3:
				swap(obj.rl, 0, 1, 2, 3, 1);
				break;
			case 4:
			case 5:
			case 6:
				swap(obj.fb, 0, 1, 2, 3, (i_0 - 1) % 3);
				break;
			case 7:
			case 8:
			case 9:
				swap(obj.ud, 4, 5, 6, 7, (i_0 - 1) % 3);
				break;
			case 10:
				swap(obj.rl, 4, 5, 6, 7, 1);
				break;
			case 11:
			case 12:
			case 13:
				swap(obj.fb, 4, 5, 6, 7, (i_0 + 1) % 3);
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
		var i_0, parity;
		parity = c.ct[0] % 3 > c.ct[8] % 3 ^ c.ct[8] % 3 > c.ct[16] % 3 ^ c.ct[0] % 3 > c.ct[16] % 3 ? 0 : 1;
		for (i_0 = 0; i_0 < 8; ++i_0) {
			obj.ud[i_0] = ~~(c.ct[i_0] / 3) ^ 1;
			obj.fb[i_0] = ~~(c.ct[i_0 + 8] / 3) ^ 1;
			obj.rl[i_0] = ~~(c.ct[i_0 + 16] / 3) ^ 1 ^ parity;
		}
		obj.parity = parity ^ eXc_parity;
	}

	function $setct_0(obj, idx) {
		var i_0, idxfb, idxrl, r;
		obj.parity = idx & 1;
		idx >>>= 1;
		idxrl = rl2std[idx % 12];
		idx = ~~(idx / 12);
		r = 4;
		for (i_0 = 7; i_0 >= 0; --i_0) {
			obj.rl[i_0] = 0;
			if (idxrl >= Cnk[i_0][r]) {
				idxrl -= Cnk[i_0][r--];
				obj.rl[i_0] = 1;
			}
		}
		idxfb = idx % 35;
		idx = ~~(idx / 35);
		r = 4;
		obj.fb[7] = 0;
		for (i_0 = 6; i_0 >= 0; --i_0) {
			if (idxfb >= Cnk[i_0][r]) {
				idxfb -= Cnk[i_0][r--];
				obj.fb[i_0] = 1;
			} else {
				obj.fb[i_0] = 0;
			}
		}
		r = 4;
		obj.ud[7] = 0;
		for (i_0 = 6; i_0 >= 0; --i_0) {
			if (idx >= Cnk[i_0][r]) {
				idx -= Cnk[i_0][r--];
				obj.ud[i_0] = 1;
			} else {
				obj.ud[i_0] = 0;
			}
		}
	}

	function Center3_0() {
		this.ud = createArray(8);
		this.rl = createArray(8);
		this.fb = createArray(8);
	}

	function init_4() {
		var c, depth, done, i_0, m_0;
		for (i_0 = 0; i_0 < 12; ++i_0) {
			std2rl[rl2std[i_0]] = i_0;
		}
		c = new Center3_0;
		for (i_0 = 0; i_0 < 29400; ++i_0) {
			for (m_0 = 0; m_0 < 20; ++m_0) {
				$setct_0(c, i_0);
				$move_1(c, m_0);
				ctmove[i_0][m_0] = $getct_0(c) & 65535;
			}
		}
		fill_0(prun_0);
		prun_0[0] = 0;
		depth = 0;
		done = 1;
		while (done != 29400) {
			for (i_0 = 0; i_0 < 29400; ++i_0) {
				if (prun_0[i_0] != depth) {
					continue;
				}
				for (m_0 = 0; m_0 < 17; ++m_0) {
					if (prun_0[ctmove[i_0][m_0]] == -1) {
						prun_0[ctmove[i_0][m_0]] = depth + 1;
						++done;
					}
				}
			}
			++depth;
		}
	}

	defineClass(Center3_0);
	_.parity = 0;
	var ctmove, pmove, prun_0, rl2std, std2rl;

	function $copy_1(obj, c) {
		var i_0;
		for (i_0 = 0; i_0 < 24; ++i_0) {
			obj.ct[i_0] = c.ct[i_0];
		}
	}

	function $move_2(obj, m_0) {
		var key;
		key = m_0 % 3;
		m_0 = ~~(m_0 / 3);
		switch (m_0) {
			case 0:
				swap(obj.ct, 0, 1, 2, 3, key);
				break;
			case 1:
				swap(obj.ct, 16, 17, 18, 19, key);
				break;
			case 2:
				swap(obj.ct, 8, 9, 10, 11, key);
				break;
			case 3:
				swap(obj.ct, 4, 5, 6, 7, key);
				break;
			case 4:
				swap(obj.ct, 20, 21, 22, 23, key);
				break;
			case 5:
				swap(obj.ct, 12, 13, 14, 15, key);
				break;
			case 6:
				swap(obj.ct, 0, 1, 2, 3, key);
				swap(obj.ct, 8, 20, 12, 16, key);
				swap(obj.ct, 9, 21, 13, 17, key);
				break;
			case 7:
				swap(obj.ct, 16, 17, 18, 19, key);
				swap(obj.ct, 1, 15, 5, 9, key);
				swap(obj.ct, 2, 12, 6, 10, key);
				break;
			case 8:
				swap(obj.ct, 8, 9, 10, 11, key);
				swap(obj.ct, 2, 19, 4, 21, key);
				swap(obj.ct, 3, 16, 5, 22, key);
				break;
			case 9:
				swap(obj.ct, 4, 5, 6, 7, key);
				swap(obj.ct, 10, 18, 14, 22, key);
				swap(obj.ct, 11, 19, 15, 23, key);
				break;
			case 10:
				swap(obj.ct, 20, 21, 22, 23, key);
				swap(obj.ct, 0, 8, 4, 14, key);
				swap(obj.ct, 3, 11, 7, 13, key);
				break;
			case 11:
				swap(obj.ct, 12, 13, 14, 15, key);
				swap(obj.ct, 1, 20, 7, 18, key);
				swap(obj.ct, 0, 23, 6, 17, key);
		}
	}

	function CenterCube_0() {
		var i_0;
		this.ct = createArray(24);
		for (i_0 = 0; i_0 < 24; ++i_0) {
			this.ct[i_0] = centerFacelet[i_0] >> 4;
		}
	}

	function CenterCube_1(rn) {
		var i_0, m_0, t;
		CenterCube_0.call(this);
		for (i_0 = 0; i_0 < 23; ++i_0) {
			t = i_0 + rn(24 - i_0);
			if (this.ct[t] != this.ct[i_0]) {
				m_0 = this.ct[i_0];
				this.ct[i_0] = this.ct[t];
				this.ct[t] = m_0;
			}
		}
	}

	defineClass(CenterCube_0, CenterCube_1);

	function $clinit_CornerCube() {
		$clinit_CornerCube = nullMethod;
		moveCube_0 = createArray(18);
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
		var i_0;
		for (i_0 = 0; i_0 < 8; ++i_0) {
			obj.cp[i_0] = c.cp[i_0];
			obj.co[i_0] = c.co[i_0];
		}
	}

	function $move_3(obj, idx) {
		!obj.temps && (obj.temps = new CornerCube_0);
		CornMult_0(obj, moveCube_0[idx], obj.temps);
		$copy_2(obj, obj.temps);
	}

	function $setTwist_0(obj, idx) {
		var i_0, twst;
		twst = 0;
		for (i_0 = 6; i_0 >= 0; --i_0) {
			twst += obj.co[i_0] = idx % 3;
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
		mathlib.set8Perm(this.cp, cperm);
		$setTwist_0(this, twist);
	}

	function CornerCube_2(rn) {
		CornerCube_1.call(this, rn(40320), rn(2187));
	}

	function initMove_0() {
		var a, p_0;
		moveCube_0[0] = new CornerCube_1(15120, 0);
		moveCube_0[3] = new CornerCube_1(21021, 1494);
		moveCube_0[6] = new CornerCube_1(8064, 1236);
		moveCube_0[9] = new CornerCube_1(9, 0);
		moveCube_0[12] = new CornerCube_1(1230, 412);
		moveCube_0[15] = new CornerCube_1(224, 137);
		for (a = 0; a < 18; a += 3) {
			for (p_0 = 0; p_0 < 2; ++p_0) {
				moveCube_0[a + p_0 + 1] = new CornerCube_0;
				CornMult_0(moveCube_0[a + p_0], moveCube_0[a], moveCube_0[a + p_0 + 1]);
			}
		}
	}

	defineClass(CornerCube_0, CornerCube_1, CornerCube_2);
	_.temps = null;
	var cornerFacelet_0, moveCube_0;

	function $clinit_Edge3() {
		$clinit_Edge3 = nullMethod;
		prunValues = [1, 4, 16, 55, 324, 1922, 12275, 77640, 485359, 2778197, 11742425, 27492416, 31002941, 31006080];
		eprun = createArray(1937880);
		sym2raw_0 = createArray(1538);
		symstate = createArray(1538);
		raw2sym_1 = createArray(11880);
		syminv_0 = [0, 1, 6, 3, 4, 5, 2, 7];
		mvrot = createArray(160, 12);
		mvroto = createArray(160, 12);
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

	function $get_2(obj, end) {
		var i_0, idx, v, valh, vall;
		obj.isStd || $std(obj);
		idx = 0;
		vall = 1985229328;
		valh = 47768;
		for (i_0 = 0; i_0 < end; ++i_0) {
			v = obj.edge[i_0] << 2;
			idx *= 12 - i_0;
			if (v >= 32) {
				idx += valh >> v - 32 & 15;
				valh -= 4368 << v - 32;
			} else {
				idx += vall >> v & 15;
				valh -= 4369;
				vall -= 286331152 << v;
			}
		}
		return idx;
	}

	function $getsym_0(obj) {
		var cord1x, cord2x, symcord1x, symx;
		cord1x = $get_2(obj, 4);
		symcord1x = raw2sym_1[cord1x];
		symx = symcord1x & 7;
		symcord1x >>= 3;
		$rotate_0(obj, symx);
		cord2x = $get_2(obj, 10) % 20160;
		return symcord1x * 20160 + cord2x;
	}

	function $move_4(obj, i_0) {
		obj.isStd = false;
		switch (i_0) {
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
		var i_0, p_0, parity, v, vall, valh;
		vall = 0x76543210;
		valh = 0xba98;
		parity = 0;
		for (i_0 = 0; i_0 < 11; ++i_0) {
			p_0 = factX[11 - i_0];
			v = ~~(idx / p_0);
			idx = idx % p_0;
			parity ^= v;
			v <<= 2;
			if (v >= 32) {
				v = v - 32;
				obj.edge[i_0] = valh >> v & 15;
				var m = (1 << v) - 1;
				valh = (valh & m) + ((valh >> 4) & ~m);
			} else {
				obj.edge[i_0] = vall >> v & 15;
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
		for (i_0 = 0; i_0 < 12; ++i_0) {
			obj.edgeo[i_0] = i_0;
		}
		obj.isStd = true;
	}

	function $set_5(obj, e) {
		var i_0;
		for (i_0 = 0; i_0 < 12; ++i_0) {
			obj.edge[i_0] = e.edge[i_0];
			obj.edgeo[i_0] = e.edgeo[i_0];
		}
		obj.isStd = e.isStd;
	}

	function $set_6(obj, c) {
		var i_0, parity, s, t;
		obj.temp == null && (obj.temp = createArray(12));
		for (i_0 = 0; i_0 < 12; ++i_0) {
			obj.temp[i_0] = i_0;
			obj.edge[i_0] = c.ep[FullEdgeMap[i_0] + 12] % 12;
		}
		parity = 1;
		for (i_0 = 0; i_0 < 12; ++i_0) {
			while (obj.edge[i_0] != i_0) {
				t = obj.edge[i_0];
				obj.edge[i_0] = obj.edge[t];
				obj.edge[t] = t;
				s = obj.temp[i_0];
				obj.temp[i_0] = obj.temp[t];
				obj.temp[t] = s;
				parity ^= 1;
			}
		}
		for (i_0 = 0; i_0 < 12; ++i_0) {
			obj.edge[i_0] = obj.temp[c.ep[FullEdgeMap[i_0]] % 12];
		}
		return parity;
	}

	function $std(obj) {
		var i_0;
		obj.temp == null && (obj.temp = createArray(12));
		for (i_0 = 0; i_0 < 12; ++i_0) {
			obj.temp[obj.edgeo[i_0]] = i_0;
		}
		for (i_0 = 0; i_0 < 12; ++i_0) {
			obj.edge[i_0] = obj.temp[obj.edge[i_0]];
			obj.edgeo[i_0] = i_0;
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
	}

	function createPrun_0() {
		var chk, cord1, cord1x, cord2, cord2x, dep1m3, depm3, depth, e, end, f, find_0, g, i_0, i_, idx, idxx, inv, j, m_0, symState, symcord1, symcord1x, symx, val;
		e = new Edge3_0;
		f = new Edge3_0;
		g = new Edge3_0;
		fill_0(eprun);
		depth = 0;
		done_0 = 1;
		setPruning_0(eprun, 0, 0);
		// var start = +new Date;
		while (done_0 != 31006080) {
			inv = depth > 9;
			depm3 = depth % 3;
			dep1m3 = (depth + 1) % 3;
			find_0 = inv ? 3 : depm3;
			chk = inv ? depm3 : 3;
			if (depth >= 9) {
				break;
			}
			for (i_ = 0; i_ < 31006080; i_ += 16) {
				val = eprun[~~i_ >> 4];
				if (!inv && val == -1) {
					continue;
				}
				for (i_0 = i_, end = i_ + 16; i_0 < end; ++i_0, val >>= 2) {
					if ((val & 3) != find_0) {
						continue;
					}
					symcord1 = ~~(i_0 / 20160);
					cord1 = sym2raw_0[symcord1];
					cord2 = i_0 % 20160;
					$set_4(e, cord1 * 20160 + cord2);
					for (m_0 = 0; m_0 < 17; ++m_0) {
						cord1x = getmvrot(e.edge, m_0 << 3, 4);
						symcord1x = raw2sym_1[cord1x];
						symx = symcord1x & 7;
						symcord1x >>= 3;
						cord2x = getmvrot(e.edge, m_0 << 3 | symx, 10) % 20160;
						idx = symcord1x * 20160 + cord2x;
						if (getPruning_0(eprun, idx) != chk) {
							continue;
						}
						setPruning_0(eprun, inv ? i_0 : idx, dep1m3);
						++done_0;
						if (inv) {
							break;
						}
						symState = symstate[symcord1x];
						if (symState == 1) {
							continue;
						}
						$set_5(f, e);
						$move_4(f, m_0);
						$rotate_0(f, symx);
						for (j = 1;
							(symState = ~~symState >> 1 & 65535) != 0; ++j) {
							if ((symState & 1) != 1) {
								continue;
							}
							$set_5(g, f);
							$rotate_0(g, j);
							idxx = symcord1x * 20160 + $get_2(g, 10) % 20160;
							if (getPruning_0(eprun, idxx) == chk) {
								setPruning_0(eprun, idxx, dep1m3);
								++done_0;
							}
						}
					}
				}
			}
			++depth;
			// console.log(depth + '\t' + done_0 + '\t' + (+new Date - start));
		}
	}

	function getPruning_0(table, index) {
		return table[index >> 4] >> ((index & 15) << 1) & 3;
	}

	function getmvrot(ep, mrIdx, end) {
		var i_0, idx, mov, movo, v, valh, vall;
		movo = mvroto[mrIdx];
		mov = mvrot[mrIdx];
		idx = 0;
		vall = 1985229328;
		valh = 47768;
		for (i_0 = 0; i_0 < end; ++i_0) {
			v = movo[ep[mov[i_0]]] << 2;
			idx *= 12 - i_0;
			if (v >= 32) {
				idx += valh >> v - 32 & 15;
				valh -= 4368 << v - 32;
			} else {
				idx += vall >> v & 15;
				valh -= 4369;
				vall -= 286331152 << v;
			}
		}
		return idx;
	}

	function getprun(edge) {
		var cord1, cord1x, cord2, cord2x, depm3, depth, e, idx, m_0, symcord1, symcord1x, symx;
		e = new Edge3_0;
		depth = 0;
		depm3 = getPruning_0(eprun, edge);
		if (depm3 == 3) {
			return 10;
		}
		while (edge != 0) {
			depm3 == 0 ? (depm3 = 2) : --depm3;
			symcord1 = ~~(edge / 20160);
			cord1 = sym2raw_0[symcord1];
			cord2 = edge % 20160;
			$set_4(e, cord1 * 20160 + cord2);
			for (m_0 = 0; m_0 < 17; ++m_0) {
				cord1x = getmvrot(e.edge, m_0 << 3, 4);
				symcord1x = raw2sym_1[cord1x];
				symx = symcord1x & 7;
				symcord1x >>= 3;
				cord2x = getmvrot(e.edge, m_0 << 3 | symx, 10) % 20160;
				idx = symcord1x * 20160 + cord2x;
				if (getPruning_0(eprun, idx) == depm3) {
					++depth;
					edge = idx;
					break;
				}
			}
		}
		return depth;
	}

	function getprun_0(edge, prun) {
		var depm3;
		depm3 = getPruning_0(eprun, edge);
		if (depm3 == 3) {
			return 10;
		}
		return ((0x49249249 << depm3 >> prun) & 3) + prun - 1;
		// (depm3 - prun + 16) % 3 + prun - 1;
	}

	function initMvrot() {
		var e, i_0, m_0, r;
		e = new Edge3_0;
		for (m_0 = 0; m_0 < 20; ++m_0) {
			for (r = 0; r < 8; ++r) {
				$set_4(e, 0);
				$move_4(e, m_0);
				$rotate_0(e, r);
				for (i_0 = 0; i_0 < 12; ++i_0) {
					mvrot[m_0 << 3 | r][i_0] = e.edge[i_0];
				}
				$std(e);
				for (i_0 = 0; i_0 < 12; ++i_0) {
					mvroto[m_0 << 3 | r][i_0] = e.temp[i_0];
				}
			}
		}
	}

	function initRaw2Sym() {
		var count, e, i_0, idx, j, occ;
		e = new Edge3_0;
		occ = createArray(1485);
		for (i_0 = 0; i_0 < 1485; i_0++) {
			occ[i_0] = 0;
		}
		count = 0;
		for (i_0 = 0; i_0 < 11880; ++i_0) {
			if ((occ[~~i_0 >>> 3] & 1 << (i_0 & 7)) == 0) {
				$set_4(e, i_0 * factX[8]);
				for (j = 0; j < 8; ++j) {
					idx = $get_2(e, 4);
					idx == i_0 && (symstate[count] = (symstate[count] | 1 << j) & 65535);
					occ[~~idx >> 3] = (occ[~~idx >> 3] | 1 << (idx & 7));
					raw2sym_1[idx] = count << 3 | syminv_0[j];
					$rot_1(e, 0);
					if (j % 2 == 1) {
						$rot_1(e, 1);
						$rot_1(e, 2);
					}
				}
				sym2raw_0[count++] = i_0;
			}
		}
	}

	function setPruning_0(table, index, value) {
		table[index >> 4] ^= (3 ^ value) << ((index & 15) << 1);
	}

	defineClass(Edge3_0);
	_.isStd = true;
	_.temp = null;
	var FullEdgeMap, done_0 = 0,
		eprun, factX, mvrot, mvroto, prunValues, raw2sym_1, sym2raw_0, syminv_0, symstate;

	function $checkEdge(obj) {
		var ck, i_0, parity;
		ck = 0;
		parity = false;
		for (i_0 = 0; i_0 < 12; ++i_0) {
			ck |= 1 << obj.ep[i_0];
			parity = parity != obj.ep[i_0] >= 12;
		}
		ck &= ~~ck >> 12;
		return ck == 0 && !parity;
	}

	function $copy_3(obj, c) {
		var i_0;
		for (i_0 = 0; i_0 < 24; ++i_0) {
			obj.ep[i_0] = c.ep[i_0];
		}
	}

	function $move_5(obj, m_0) {
		var key;
		key = m_0 % 3;
		m_0 = ~~(m_0 / 3);
		switch (m_0) {
			case 0:
				swap(obj.ep, 0, 1, 2, 3, key);
				swap(obj.ep, 12, 13, 14, 15, key);
				break;
			case 1:
				swap(obj.ep, 11, 15, 10, 19, key);
				swap(obj.ep, 23, 3, 22, 7, key);
				break;
			case 2:
				swap(obj.ep, 0, 11, 6, 8, key);
				swap(obj.ep, 12, 23, 18, 20, key);
				break;
			case 3:
				swap(obj.ep, 4, 5, 6, 7, key);
				swap(obj.ep, 16, 17, 18, 19, key);
				break;
			case 4:
				swap(obj.ep, 1, 20, 5, 21, key);
				swap(obj.ep, 13, 8, 17, 9, key);
				break;
			case 5:
				swap(obj.ep, 2, 9, 4, 10, key);
				swap(obj.ep, 14, 21, 16, 22, key);
				break;
			case 6:
				swap(obj.ep, 0, 1, 2, 3, key);
				swap(obj.ep, 12, 13, 14, 15, key);
				swap(obj.ep, 9, 22, 11, 20, key);
				break;
			case 7:
				swap(obj.ep, 11, 15, 10, 19, key);
				swap(obj.ep, 23, 3, 22, 7, key);
				swap(obj.ep, 2, 16, 6, 12, key);
				break;
			case 8:
				swap(obj.ep, 0, 11, 6, 8, key);
				swap(obj.ep, 12, 23, 18, 20, key);
				swap(obj.ep, 3, 19, 5, 13, key);
				break;
			case 9:
				swap(obj.ep, 4, 5, 6, 7, key);
				swap(obj.ep, 16, 17, 18, 19, key);
				swap(obj.ep, 8, 23, 10, 21, key);
				break;
			case 10:
				swap(obj.ep, 1, 20, 5, 21, key);
				swap(obj.ep, 13, 8, 17, 9, key);
				swap(obj.ep, 14, 0, 18, 4, key);
				break;
			case 11:
				swap(obj.ep, 2, 9, 4, 10, key);
				swap(obj.ep, 14, 21, 16, 22, key);
				swap(obj.ep, 7, 15, 1, 17, key);
		}
	}

	function EdgeCube_0() {
		var i_0;
		this.ep = createArray(24);
		for (i_0 = 0; i_0 < 24; ++i_0) {
			this.ep[i_0] = i_0;
		}
	}

	function EdgeCube_1(rn) {
		var i_0, m_0, t;
		EdgeCube_0.call(this);
		for (i_0 = 0; i_0 < 23; ++i_0) {
			t = i_0 + rn(24 - i_0);
			if (t != i_0) {
				m_0 = this.ep[i_0];
				this.ep[i_0] = this.ep[t];
				this.ep[t] = m_0;
			}
		}
	}

	defineClass(EdgeCube_0, EdgeCube_1);

	function $clinit_FullCube_0() {
		$clinit_FullCube_0 = nullMethod;
		move2rot = [35, 1, 34, 2, 4, 6, 22, 5, 19];
	}

	function $$init_3(obj) {
		obj.moveBuffer = createArray(60);
	}

	function $copy_4(obj, c) {
		var i_0;
		$copy_3(obj.edge, c.edge);
		$copy_1(obj.center, c.center);
		$copy_2(obj.corner, c.corner);
		obj.value = c.value;
		obj.add1 = c.add1;
		obj.length1 = c.length1;
		obj.length2 = c.length2;
		obj.length3 = c.length3;
		obj.sym = c.sym;
		for (i_0 = 0; i_0 < 60; ++i_0) {
			obj.moveBuffer[i_0] = c.moveBuffer[i_0];
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

	function $toFacelet(obj) {
		$getCenter(obj);
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

	function $to333Facelet(obj) {
		var f = $toFacelet(obj);
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

	function $getCenter(obj) {
		while (obj.centerAvail < obj.moveLength) {
			$move_2(obj.center, obj.moveBuffer[obj.centerAvail++]);
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
			$move_5(obj.edge, obj.moveBuffer[obj.edgeAvail++]);
		}
		return obj.edge;
	}

	function $getMoveString(obj) {
		var finishSym, fixedMoves, i_0, i_1, idx, move, rot, ret, sym, axis, pows;
		fixedMoves = new Array(obj.moveLength - (obj.add1 ? 2 : 0));
		idx = 0;
		for (i_0 = 0; i_0 < obj.length1; ++i_0) {
			fixedMoves[idx++] = obj.moveBuffer[i_0];
		}
		sym = obj.sym;
		for (i_0 = obj.length1 + (obj.add1 ? 2 : 0); i_0 < obj.moveLength; ++i_0) {
			if (symmove[sym][obj.moveBuffer[i_0]] >= 27) {
				fixedMoves[idx++] = symmove[sym][obj.moveBuffer[i_0]] - 9;
				rot = move2rot[symmove[sym][obj.moveBuffer[i_0]] - 27];
				sym = symmult[sym][rot];
			} else {
				fixedMoves[idx++] = symmove[sym][obj.moveBuffer[i_0]];
			}
		}
		finishSym = symmult[syminv[sym]][getSolvedSym($getCenter(obj))];
		ret = [];
		sym = finishSym;
		for (i_0 = idx - 1; i_0 >= 0; --i_0) {
			move = fixedMoves[i_0];
			move = ~~(move / 3) * 3 + (2 - move % 3);
			if (symmove[sym][move] >= 27) {
				ret.push(symmove[sym][move] - 9);
				rot = move2rot[symmove[sym][move] - 27];
				sym = symmult[sym][rot];
			} else {
				ret.push(symmove[sym][move]);
			}
		}
		axis = -1;
		idx = 0;
		pows = [0, 0, 0];
		for (i_0 = 0; i_0 < ret.length; ++i_0) {
			move = ret[i_0];
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
		this.edge = new EdgeCube_0;
		this.center = new CenterCube_0;
		this.corner = new CornerCube_0;
	}

	function FullCube_4(c) {
		FullCube_3.call(this);
		$copy_4(this, c);
	}

	function FullCube_5(rn) {
		$$init_3(this);
		this.edge = new EdgeCube_1(rn);
		this.center = new CenterCube_1(rn);
		this.corner = new CornerCube_2(rn);
	}

	defineClass(FullCube_3, FullCube_4, FullCube_5);
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
		var i_0, j;
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
		for (i_0 = 0; i_0 < 29; ++i_0) {
			std2move[move2std[i_0]] = i_0;
		}
		for (i_0 = 0; i_0 < 21; ++i_0) {
			std3move[move3std[i_0]] = i_0;
		}
		for (i_0 = 0; i_0 < 36; ++i_0) {
			for (j = 0; j < 36; ++j) {
				ckmv[i_0][j] = ~~(i_0 / 3) == ~~(j / 3) || ~~(i_0 / 3) % 3 == ~~(j / 3) % 3 && i_0 > j;
			}
			ckmv[36][i_0] = false;
		}
		for (i_0 = 0; i_0 < 29; ++i_0) {
			for (j = 0; j < 28; ++j) {
				ckmv2_0[i_0][j] = ckmv[move2std[i_0]][move2std[j]];
			}
		}
		for (i_0 = 0; i_0 < 21; ++i_0) {
			for (j = 0; j < 20; ++j) {
				ckmv3[i_0][j] = ckmv[move3std[i_0]][move3std[j]];
			}
		}
		for (i_0 = 0; i_0 < 36; ++i_0) {
			skipAxis[i_0] = 36;
			for (j = i_0; j < 36; ++j) {
				if (!ckmv[i_0][j]) {
					skipAxis[i_0] = j - 1;
					break;
				}
			}
		}
		for (i_0 = 0; i_0 < 28; ++i_0) {
			skipAxis2[i_0] = 28;
			for (j = i_0; j < 28; ++j) {
				if (!ckmv2_0[i_0][j]) {
					skipAxis2[i_0] = j - 1;
					break;
				}
			}
		}
		for (i_0 = 0; i_0 < 20; ++i_0) {
			skipAxis3[i_0] = 20;
			for (j = i_0; j < 20; ++j) {
				if (!ckmv3[i_0][j]) {
					skipAxis3[i_0] = j - 1;
					break;
				}
			}
		}
	}

	var ckmv, ckmv2_0, ckmv3, move2std, move2str_1, move3std, skipAxis, skipAxis2, skipAxis3, std2move, std3move;

	function $doSearch(obj) {
		var MAX_LENGTH2, MAX_LENGTH3, ct, edge, eparity, fb, fbprun, i_0, index, length_0, length12, length123, p1SolsArr, prun, rl, rlprun, s2ct, s2rl, solcube, ud, udprun;
		obj.solution = '';
		var tt = +new Date;
		ud = $getsym(new Center1_1($getCenter(obj.c), 0));
		fb = $getsym(new Center1_1($getCenter(obj.c), 1));
		rl = $getsym(new Center1_1($getCenter(obj.c), 2));
		udprun = csprun[~~ud >> 6];
		fbprun = csprun[~~fb >> 6];
		rlprun = csprun[~~rl >> 6];
		obj.p1SolsCnt = 0;
		obj.arr2idx = 0;
		$clear(obj.p1sols);
		for (obj.length1 = (udprun < fbprun ? udprun : fbprun) < rlprun ? udprun < fbprun ? udprun : fbprun : rlprun; obj.length1 < 100; ++obj.length1) {
			if (rlprun <= obj.length1 && $search1(obj, ~~rl >>> 6, rl & 63, obj.length1, -1, 0) || udprun <= obj.length1 && $search1(obj, ~~ud >>> 6, ud & 63, obj.length1, -1, 0) || fbprun <= obj.length1 && $search1(obj, ~~fb >>> 6, fb & 63, obj.length1, -1, 0)) {
				break;
			}
		}
		p1SolsArr = obj.p1sols.array.slice();
		DEBUG && console.log('[scramble 444] Phase 1 Done in', +new Date - tt);
		p1SolsArr.sort(function(a, b) {
			return a.value - b.value
		});
		MAX_LENGTH2 = 9;
		do {
			OUT: for (length12 = p1SolsArr[0].value; length12 < 100; ++length12) {
					for (i_0 = 0; i_0 < p1SolsArr.length; ++i_0) {
						if (p1SolsArr[i_0].value > length12) {
							break;
						}
						if (length12 - p1SolsArr[i_0].length1 > MAX_LENGTH2) {
							continue;
						}
						$copy_4(obj.c1, p1SolsArr[i_0]);
						$set_2(obj.ct2, $getCenter(obj.c1), parity_0($getEdge(obj.c1).ep));
						s2ct = $getct(obj.ct2);
						s2rl = $getrl(obj.ct2);
						obj.length1 = p1SolsArr[i_0].length1;
						obj.length2 = length12 - p1SolsArr[i_0].length1;
						if ($search2(obj, s2ct, s2rl, obj.length2, 28, 0)) {
							break OUT;
						}
					}
				}
				++MAX_LENGTH2;
		} while (length12 == 100);
		obj.arr2.sort(function(a, b) {
			return a.value - b.value
		});
		DEBUG && console.log('[scramble 444] Phase 2 Done in', +new Date - tt);
		index = 0;
		MAX_LENGTH3 = 13;
		do {
			OUT2: for (length123 = obj.arr2[0].value; length123 < 100; ++length123) {
					for (i_0 = 0; i_0 < Math.min(obj.arr2idx, 100); ++i_0) {
						if (obj.arr2[i_0].value > length123) {
							break;
						}
						if (length123 - obj.arr2[i_0].length1 - obj.arr2[i_0].length2 > MAX_LENGTH3) {
							continue;
						}
						eparity = $set_6(obj.e12, $getEdge(obj.arr2[i_0]));
						$set_3(obj.ct3, $getCenter(obj.arr2[i_0]), eparity ^ parity_0($getCorner(obj.arr2[i_0]).cp));
						ct = $getct_0(obj.ct3);
						edge = $get_2(obj.e12, 10);
						prun = getprun($getsym_0(obj.e12));
						if (prun <= length123 - obj.arr2[i_0].length1 - obj.arr2[i_0].length2 && $search3(obj, edge, ct, prun, length123 - obj.arr2[i_0].length1 - obj.arr2[i_0].length2, 20, 0)) {
							index = i_0;
							break OUT2;
						}
					}
				}
				++MAX_LENGTH3;
		}
		while (length123 == 100);
		DEBUG && console.log('[scramble 444] Phase 3 Done in', +new Date - tt);
		solcube = new FullCube_4(obj.arr2[index]);
		obj.length1 = solcube.length1;
		obj.length2 = solcube.length2;
		length_0 = length123 - obj.length1 - obj.length2;
		for (i_0 = 0; i_0 < length_0; ++i_0) {
			$move_6(solcube, move3std[obj.move3[i_0]]);
		}
		var f3 = $to333Facelet(solcube);
		if (!f3) {
			console.log('[scramble 444] Reduction Error!', $toFacelet(solcube));
		}
		for (var i = 0; i < 54; i++) {
			f3[i] = "URFDLB"[f3[i]];
		}
		f3 = f3.join('');
		var sol3 = scramble_333.solvFacelet(f3);
		sol3 = sol3.split(' ');
		for (var m = 0; m < sol3.length; m++) {
			if (/^[URFDLB][2']?$/.exec(sol3[m])) {
				$move_6(solcube, "URFDLB".indexOf(sol3[m][0]) * 3 + "2'".indexOf(sol3[m][1]) + 1);
			}
		}
		obj.solution = $getMoveString(solcube);
		DEBUG && console.log('[scramble 444] 3x3x3 Done in', +new Date - tt);
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
		console.log(tmp);
	}

	function $init2_0(obj, sym) {
		var ctp, i_0, next, s2ct, s2rl;
		$copy_4(obj.c1, obj.c);
		for (i_0 = 0; i_0 < obj.length1; ++i_0) {
			$move_6(obj.c1, obj.move1[i_0]);
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
		$set_2(obj.ct2, $getCenter(obj.c1), parity_0($getEdge(obj.c1).ep));
		s2ct = $getct(obj.ct2);
		s2rl = $getrl(obj.ct2);
		ctp = ctprun[s2ct * 70 + s2rl];
		obj.c1.value = ctp + obj.length1;
		obj.c1.length1 = obj.length1;
		obj.c1.add1 = obj.add1;
		obj.c1.sym = sym;
		++obj.p1SolsCnt;
		if (obj.p1sols.size < 500) {
			next = new FullCube_4(obj.c1);
		} else {
			next = $poll(obj.p1sols);
			next.value > obj.c1.value && $copy_4(next, obj.c1);
		}
		$add(obj.p1sols, next);
		return obj.p1SolsCnt == 10000;
	}

	function $init3(obj) {
		var ct, eparity, i_0, prun;
		$copy_4(obj.c2, obj.c1);
		for (i_0 = 0; i_0 < obj.length2; ++i_0) {
			$move_6(obj.c2, obj.move2[i_0]);
		}
		if (!$checkEdge($getEdge(obj.c2))) {
			return false;
		}
		eparity = $set_6(obj.e12, $getEdge(obj.c2));
		$set_3(obj.ct3, $getCenter(obj.c2), eparity ^ parity_0($getCorner(obj.c2).cp));
		ct = $getct_0(obj.ct3);
		$get_2(obj.e12, 10);
		prun = getprun($getsym_0(obj.e12));
		!obj.arr2[obj.arr2idx] ? (obj.arr2[obj.arr2idx] = new FullCube_4(obj.c2)) : $copy_4(obj.arr2[obj.arr2idx], obj.c2);
		obj.arr2[obj.arr2idx].value = obj.length1 + obj.length2 + Math.max(prun, prun_0[ct]);
		obj.arr2[obj.arr2idx].length2 = obj.length2;
		++obj.arr2idx;
		return obj.arr2idx == obj.arr2.length;
	}

	function $search1(obj, ct, sym, maxl, lm, depth) {
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
				ctx = ctsmv[ct][symmove[sym][m_0]];
				prun = csprun[~~ctx >>> 6];
				if (prun >= maxl) {
					if (prun > maxl) {
						break;
					}
					continue;
				}
				symx = symmult[sym][ctx & 63];
				ctx >>>= 6;
				obj.move1[depth] = m_0;
				if ($search1(obj, ctx, symx, maxl - 1, axis, depth + 1)) {
					return true;
				}
			}
		}
		return false;
	}

	function $search2(obj, ct, rl, maxl, lm, depth) {
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
			if ($search2(obj, ctx, rlx, maxl - 1, m_0, depth + 1)) {
				return true;
			}
		}
		return false;
	}

	function $search3(obj, edge, ct, prun, maxl, lm, depth) {
		var cord1x, cord2x, ctx, edgex, m_0, prun1, prunx, symcord1x, symx;
		if (maxl == 0) {
			return edge == 0 && ct == 0;
		}
		$set_4(obj.tempe[depth], edge);
		for (m_0 = 0; m_0 < 17; ++m_0) {
			if (ckmv3[lm][m_0]) {
				m_0 = skipAxis3[m_0];
				continue;
			}
			ctx = ctmove[ct][m_0];
			prun1 = prun_0[ctx];
			if (prun1 >= maxl) {
				prun1 > maxl && m_0 < 14 && (m_0 = skipAxis3[m_0]);
				continue;
			}
			edgex = getmvrot(obj.tempe[depth].edge, m_0 << 3, 10);
			cord1x = ~~(edgex / 20160);
			symcord1x = raw2sym_1[cord1x];
			symx = symcord1x & 7;
			symcord1x >>= 3;
			cord2x = getmvrot(obj.tempe[depth].edge, m_0 << 3 | symx, 10) % 20160;
			prunx = getprun_0(symcord1x * 20160 + cord2x, prun);
			if (prunx >= maxl) {
				prunx > maxl && m_0 < 14 && (m_0 = skipAxis3[m_0]);
				continue;
			}
			if ($search3(obj, edgex, ctx, prunx, maxl - 1, m_0, depth + 1)) {
				obj.move3[depth] = m_0;
				return true;
			}
		}
		return false;
	}

	function Search_4() {
		var i_0;
		this.p1sols = new PriorityQueue_0();
		this.move1 = createArray(15);
		this.move2 = createArray(20);
		this.move3 = createArray(20);
		this.c1 = new FullCube_3;
		this.c2 = new FullCube_3;
		this.ct2 = new Center2_0;
		this.ct3 = new Center3_0;
		this.e12 = new Edge3_0;
		this.tempe = createArray(20);
		this.arr2 = createArray(100);
		for (i_0 = 0; i_0 < 20; ++i_0) {
			this.tempe[i_0] = new Edge3_0;
		}
	}

	function init_5() {
		if (inited_2) {
			return;
		}
		initSym_0();
		raw2sym = createArray(735471);
		initSym2Raw();
		createMoveTable();
		raw2sym = null;
		createPrun();
		init_3();
		init_4();
		initMvrot();
		initRaw2Sym();
		createPrun_0();
		inited_2 = true;
	}

	defineClass(Search_4);
	_.add1 = false;
	_.arr2idx = 0;
	_.c = null;
	_.length1 = 0;
	_.length2 = 0;
	_.p1SolsCnt = 0;
	_.solution = '';
	var inited_2 = false;

	function parity_0(arr) {
		var i_0, j, len, parity;
		parity = 0;
		for (i_0 = 0, len = arr.length; i_0 < len; ++i_0) {
			for (j = i_0; j < len; ++j) {
				arr[i_0] > arr[j] && (parity ^= 1);
			}
		}
		return parity;
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
		this.array.length = 500;
		this.size = 0;
	}

	function binarySearch_0(sortedArray, key) {
		var high, low, mid, midVal;
		low = 0;
		high = sortedArray.length - 1;
		while (low <= high) {
			mid = low + (~~(high - low) >> 1);
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
		fill_1(a, a.length);
	}

	function fill_1(a, toIndex) {
		var i_0;
		for (i_0 = 0; i_0 < toIndex; ++i_0) {
			a[i_0] = -1;
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
			node = ~~((node - 1) / 2);
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
		$clinit_Moves();
		$clinit_Center1();
		$clinit_Center2();
		$clinit_Center3();
		$clinit_Edge3();
		$clinit_CornerCube();
		$clinit_FullCube_0();
		init_5();
		searcher = new Search_4();
	}

	function randomState() {
		init();
		var facelet = $toFacelet(new FullCube_5(mathlib.rn));
		for (var i = 0; i < 96; i++) {
			facelet[i] = "URFDLB".charAt(facelet[i]);
		}
		return facelet.join("");
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
			facelet = $toFacelet(cc);
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

	scrMgr.reg('444wca', getRandomScramble)
		('4edge', getEdgeScramble)
		('444edo', getEdgeOnlyScramble)
		('444cto', getCenterOnlyScramble)
		('444ll', getLastLayerScramble)
		('444ctud', getCenterUDSolvedScramble)
		('444ctrl', getCenterRLSolvedScramble)
		('444l8e', getLast8DedgeScramble)
		('444ud3c', getYauUD3CScramble)
		('444rlda', getHoyaRLDAScramble)
		('444rlca', getHoyaRLCAScramble)
	;

	return {
		getRandomScramble: getRandomScramble,
		getPartialScramble: getPartialScramble
	}
})(mathlib.Cnk, mathlib.circle);
