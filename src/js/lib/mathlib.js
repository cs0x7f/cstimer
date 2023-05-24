"use strict";

var mathlib = (function() {
	var Cnk = [],
		fact = [1];
	for (var i = 0; i < 32; ++i) {
		Cnk[i] = [];
		for (var j = 0; j < 32; ++j) {
			Cnk[i][j] = 0;
		}
	}
	for (var i = 0; i < 32; ++i) {
		Cnk[i][0] = Cnk[i][i] = 1;
		fact[i + 1] = fact[i] * (i + 1);
		for (var j = 1; j < i; ++j) {
			Cnk[i][j] = Cnk[i - 1][j - 1] + Cnk[i - 1][j];
		}
	}

	function circleOri(arr, a, b, c, d, ori) {
		var temp = arr[a];
		arr[a] = arr[d] ^ ori;
		arr[d] = arr[c] ^ ori;
		arr[c] = arr[b] ^ ori;
		arr[b] = temp ^ ori;
	}

	function circle(arr) {
		var length = arguments.length - 1,
			temp = arr[arguments[length]];
		for (var i = length; i > 1; i--) {
			arr[arguments[i]] = arr[arguments[i - 1]];
		}
		arr[arguments[1]] = temp;
		return circle;
	}

	//perm: [idx1, idx2, ..., idxn]
	//pow: 1, 2, 3, ...
	//ori: ori1, ori2, ..., orin, base
	// arr[perm[idx2]] = arr[perm[idx1]] + ori[idx2] - ori[idx1] + base
	function acycle(arr, perm, pow, ori) {
		pow = pow || 1;
		var plen = perm.length;
		var tmp = [];
		for (var i = 0; i < plen; i++) {
			tmp[i] = arr[perm[i]];
		}
		for (var i = 0; i < plen; i++) {
			var j = (i + pow) % plen;
			arr[perm[j]] = tmp[i];
			if (ori) {
				arr[perm[j]] += ori[j] - ori[i] + ori[ori.length - 1];
			}
		}
		return acycle;
	}

	function getPruning(table, index) {
		return table[index >> 3] >> ((index & 7) << 2) & 15;
	}

	function setNPerm(arr, idx, n) {
		var i, j;
		arr[n - 1] = 0;
		for (i = n - 2; i >= 0; --i) {
			arr[i] = idx % (n - i);
			idx = ~~(idx / (n - i));
			for (j = i + 1; j < n; ++j) {
				arr[j] >= arr[i] && ++arr[j];
			}
		}
	}

	function getNPerm(arr, n) {
		var i, idx, j;
		idx = 0;
		for (i = 0; i < n; ++i) {
			idx *= n - i;
			for (j = i + 1; j < n; ++j) {
				arr[j] < arr[i] && ++idx;
			}
		}
		return idx;
	}

	function getNParity(idx, n) {
		var i, p;
		p = 0;
		for (i = n - 2; i >= 0; --i) {
			p ^= idx % (n - i);
			idx = ~~(idx / (n - i));
		}
		return p & 1;
	}

	function get8Perm(arr, n, even) {
		n = n || 8;
		var idx = 0;
		var val = 0x76543210;
		for (var i = 0; i < n - 1; ++i) {
			var v = arr[i] << 2;
			idx = (n - i) * idx + (val >> v & 7);
			val -= 0x11111110 << v;
		}
		return even < 0 ? (idx >> 1) : idx;
	}

	function set8Perm(arr, idx, n, even) {
		n = (n || 8) - 1;
		var val = 0x76543210;
		var prt = 0;
		if (even < 0) {
			idx <<= 1;
		}
		for (var i = 0; i < n; ++i) {
			var p = fact[n - i];
			var v = ~~(idx / p);
			prt ^= v;
			idx %= p;
			v <<= 2;
			arr[i] = val >> v & 7;
			var m = (1 << v) - 1;
			val = (val & m) + (val >> 4 & ~m);
		}
		if (even < 0 && (prt & 1) != 0) {
			arr[n] = arr[n - 1];
			arr[n - 1] = val & 7;
		} else {
			arr[n] = val & 7;
		}
		return arr;
	}

	function getNOri(arr, n, evenbase) {
		var base = Math.abs(evenbase);
		var idx = evenbase < 0 ? 0 : arr[0] % base;
		for (var i = n - 1; i > 0; i--) {
			idx = idx * base + arr[i] % base;
		}
		return idx;
	}

	function setNOri(arr, idx, n, evenbase) {
		var base = Math.abs(evenbase);
		var parity = base * n;
		for (var i = 1; i < n; i++) {
			arr[i] = idx % base;
			parity -= arr[i];
			idx = ~~(idx / base);
		}
		arr[0] = (evenbase < 0 ? parity : idx) % base;
		return arr;
	}

	// type: 'p', 'o'
	// evenbase: base for ori, sign for even parity
	function coord(type, length, evenbase) {
		this.length = length;
		this.evenbase = evenbase;
		this.get = type == 'p' ?
			function(arr) {
				return get8Perm(arr, this.length, this.evenbase);
			} : function(arr) {
				return getNOri(arr, this.length, this.evenbase);
			};
		this.set = type == 'p' ?
			function(arr, idx) {
				return set8Perm(arr, idx, this.length, this.evenbase);
			} : function(arr, idx) {
				return setNOri(arr, idx, this.length, this.evenbase);
			};
	}

	function fillFacelet(facelets, f, perm, ori, divcol) {
		for (var i = 0; i < facelets.length; i++) {
			for (var j = 0; j < facelets[i].length; j++) {
				f[facelets[i][(j + ori[i]) % facelets[i].length]] = ~~(facelets[perm[i]][j] / divcol);
			}
		}
	}

	function createMove(moveTable, size, doMove, N_MOVES) {
		N_MOVES = N_MOVES || 6;
		if ($.isArray(doMove)) {
			var cord = new coord(doMove[1], doMove[2], doMove[3]);
			doMove = doMove[0];
			for (var j = 0; j < N_MOVES; j++) {
				moveTable[j] = [];
				for (var i = 0; i < size; i++) {
					var arr = cord.set([], i);
					doMove(arr, j);
					moveTable[j][i] = cord.get(arr);
				}
			}
		} else {
			for (var j = 0; j < N_MOVES; j++) {
				moveTable[j] = [];
				for (var i = 0; i < size; i++) {
					moveTable[j][i] = doMove(i, j);
				}
			}
		}
	}

	function edgeMove(arr, m) {
		if (m == 0) { //F
			circleOri(arr, 0, 7, 8, 4, 1);
		} else if (m == 1) { //R
			circleOri(arr, 3, 6, 11, 7, 0);
		} else if (m == 2) { //U
			circleOri(arr, 0, 1, 2, 3, 0);
		} else if (m == 3) { //B
			circleOri(arr, 2, 5, 10, 6, 1);
		} else if (m == 4) { //L
			circleOri(arr, 1, 4, 9, 5, 0);
		} else if (m == 5) { //D
			circleOri(arr, 11, 10, 9, 8, 0);
		}
	}

	function CubieCube() {
		this.ca = [0, 1, 2, 3, 4, 5, 6, 7];
		this.ea = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22];
	}

	CubieCube.SOLVED = new CubieCube();

	CubieCube.EdgeMult = function(a, b, prod) {
		for (var ed = 0; ed < 12; ed++) {
			prod.ea[ed] = a.ea[b.ea[ed] >> 1] ^ (b.ea[ed] & 1);
		}
	};

	CubieCube.CornMult = function(a, b, prod) {
		for (var corn = 0; corn < 8; corn++) {
			var ori = ((a.ca[b.ca[corn] & 7] >> 3) + (b.ca[corn] >> 3)) % 3;
			prod.ca[corn] = a.ca[b.ca[corn] & 7] & 7 | ori << 3;
		}
	};

	CubieCube.CubeMult = function(a, b, prod) {
		CubieCube.CornMult(a, b, prod);
		CubieCube.EdgeMult(a, b, prod);
	};

	CubieCube.prototype.init = function(ca, ea) {
		this.ca = ca.slice();
		this.ea = ea.slice();
		return this;
	};

	CubieCube.prototype.hashCode = function() {
		var ret = 0;
		for (var i = 0; i < 20; i++) {
			ret = 0 | (ret * 31 + (i < 12 ? this.ea[i] : this.ca[i - 12]));
		}
		return ret;
	}

	CubieCube.prototype.isEqual = function(c) {
		c = c || CubieCube.SOLVED;
		for (var i = 0; i < 8; i++) {
			if (this.ca[i] != c.ca[i]) {
				return false;
			}
		}
		for (var i = 0; i < 12; i++) {
			if (this.ea[i] != c.ea[i]) {
				return false;
			}
		}
		return true;
	};

	var cornerFacelet = [
		[8, 9, 20], // URF
		[6, 18, 38], // UFL
		[0, 36, 47], // ULB
		[2, 45, 11], // UBR
		[29, 26, 15], // DFR
		[27, 44, 24], // DLF
		[33, 53, 42], // DBL
		[35, 17, 51]  // DRB
	];
	var edgeFacelet = [
		[5, 10], // UR
		[7, 19], // UF
		[3, 37], // UL
		[1, 46], // UB
		[32, 16], // DR
		[28, 25], // DF
		[30, 43], // DL
		[34, 52], // DB
		[23, 12], // FR
		[21, 41], // FL
		[50, 39], // BL
		[48, 14]  // BR
	];

	CubieCube.prototype.toFaceCube = function(cFacelet, eFacelet) {
		cFacelet = cFacelet || cornerFacelet;
		eFacelet = eFacelet || edgeFacelet;
		var ts = "URFDLB";
		var f = [];
		for (var i = 0; i < 54; i++) {
			f[i] = ts[~~(i / 9)];
		}
		for (var c = 0; c < 8; c++) {
			var j = this.ca[c] & 0x7; // cornercubie with index j is at
			var ori = this.ca[c] >> 3; // Orientation of this cubie
			for (var n = 0; n < 3; n++)
				f[cFacelet[c][(n + ori) % 3]] = ts[~~(cFacelet[j][n] / 9)];
		}
		for (var e = 0; e < 12; e++) {
			var j = this.ea[e] >> 1; // edgecubie with index j is at edgeposition
			var ori = this.ea[e] & 1; // Orientation of this cubie
			for (var n = 0; n < 2; n++)
				f[eFacelet[e][(n + ori) % 2]] = ts[~~(eFacelet[j][n] / 9)];
		}
		return f.join("");
	}

	CubieCube.prototype.invFrom = function(cc) {
		for (var edge = 0; edge < 12; edge++) {
			this.ea[cc.ea[edge] >> 1] = edge << 1 | cc.ea[edge] & 1;
		}
		for (var corn = 0; corn < 8; corn++) {
			this.ca[cc.ca[corn] & 0x7] = corn | 0x20 >> (cc.ca[corn] >> 3) & 0x18;
		}
		return this;
	}

	CubieCube.prototype.fromFacelet = function(facelet, cFacelet, eFacelet) {
		cFacelet = cFacelet || cornerFacelet;
		eFacelet = eFacelet || edgeFacelet;
		var count = 0;
		var f = [];
		var centers = facelet[4] + facelet[13] + facelet[22] + facelet[31] + facelet[40] + facelet[49];
		for (var i = 0; i < 54; ++i) {
			f[i] = centers.indexOf(facelet[i]);
			if (f[i] == -1) {
				return -1;
			}
			count += 1 << (f[i] << 2);
		}
		if (count != 0x999999) {
			return -1;
		}
		var col1, col2, i, j, ori;
		for (i = 0; i < 8; ++i) {
			for (ori = 0; ori < 3; ++ori)
				if (f[cFacelet[i][ori]] == 0 || f[cFacelet[i][ori]] == 3)
					break;
			col1 = f[cFacelet[i][(ori + 1) % 3]];
			col2 = f[cFacelet[i][(ori + 2) % 3]];
			for (j = 0; j < 8; ++j) {
				if (col1 == ~~(cFacelet[j][1] / 9) && col2 == ~~(cFacelet[j][2] / 9)) {
					this.ca[i] = j | ori % 3 << 3;
					break;
				}
			}
		}
		for (i = 0; i < 12; ++i) {
			for (j = 0; j < 12; ++j) {
				if (f[eFacelet[i][0]] == ~~(eFacelet[j][0] / 9) && f[eFacelet[i][1]] == ~~(eFacelet[j][1] / 9)) {
					this.ea[i] = j << 1;
					break;
				}
				if (f[eFacelet[i][0]] == ~~(eFacelet[j][1] / 9) && f[eFacelet[i][1]] == ~~(eFacelet[j][0] / 9)) {
					this.ea[i] = j << 1 | 1;
					break;
				}
			}
		}
		return this;
	}

	CubieCube.prototype.verify = function() {
		var mask = 0;
		var sum = 0;
		for (var e = 0; e < 12; e++) {
			mask |= 1 << 8 << (this.ea[e] >> 1);
			sum ^= this.ea[e] & 1;
		}
		var cp = [];
		for (var c = 0; c < 8; c++) {
			mask |= 1 << (this.ca[c] & 7);
			sum += this.ca[c] >> 3 << 1;
			cp.push(this.ca[c] & 0x7);
		}
		if (mask != 0xfffff || sum % 6 != 0
				|| getNParity(getNPerm(this.ea, 12), 12) != getNParity(getNPerm(cp, 8), 8)) {
			return -1;
		}
		return 0;
	}

	CubieCube.moveCube = (function() {
		var moveCube = [];
		for (var i = 0; i < 18; i++) {
			moveCube[i] = new CubieCube();
		}
		moveCube[0].init([3, 0, 1, 2, 4, 5, 6, 7], [6, 0, 2, 4, 8, 10, 12, 14, 16, 18, 20, 22]);
		moveCube[3].init([20, 1, 2, 8, 15, 5, 6, 19], [16, 2, 4, 6, 22, 10, 12, 14, 8, 18, 20, 0]);
		moveCube[6].init([9, 21, 2, 3, 16, 12, 6, 7], [0, 19, 4, 6, 8, 17, 12, 14, 3, 11, 20, 22]);
		moveCube[9].init([0, 1, 2, 3, 5, 6, 7, 4], [0, 2, 4, 6, 10, 12, 14, 8, 16, 18, 20, 22]);
		moveCube[12].init([0, 10, 22, 3, 4, 17, 13, 7], [0, 2, 20, 6, 8, 10, 18, 14, 16, 4, 12, 22]);
		moveCube[15].init([0, 1, 11, 23, 4, 5, 18, 14], [0, 2, 4, 23, 8, 10, 12, 21, 16, 18, 7, 15]);
		for (var a = 0; a < 18; a += 3) {
			for (var p = 0; p < 2; p++) {
				CubieCube.EdgeMult(moveCube[a + p], moveCube[a], moveCube[a + p + 1]);
				CubieCube.CornMult(moveCube[a + p], moveCube[a], moveCube[a + p + 1]);
			}
		}
		return moveCube;
	})();

	CubieCube.rotCube = (function() {
		var u4 = new CubieCube().init([3, 0, 1, 2, 7, 4, 5, 6], [6, 0, 2, 4, 14, 8, 10, 12, 23, 17, 19, 21]);
		var f2 = new CubieCube().init([5, 4, 7, 6, 1, 0, 3, 2], [12, 10, 8, 14, 4, 2, 0, 6, 18, 16, 22, 20]);
		var urf = new CubieCube().init([8, 20, 13, 17, 19, 15, 22, 10], [3, 16, 11, 18, 7, 22, 15, 20, 1, 9, 13, 5]);
		var c = new CubieCube();
		var d = new CubieCube();
		var rotCube = [];
		for (var i = 0; i < 24; i++) {
			rotCube[i] = new CubieCube().init(c.ca, c.ea);
			CubieCube.CornMult(c, u4, d);
			CubieCube.EdgeMult(c, u4, d);
			c.init(d.ca, d.ea);
			if (i % 4 == 3) {
				CubieCube.CornMult(c, f2, d);
				CubieCube.EdgeMult(c, f2, d);
				c.init(d.ca, d.ea);
			}
			if (i % 8 == 7) {
				CubieCube.CornMult(c, urf, d);
				CubieCube.EdgeMult(c, urf, d);
				c.init(d.ca, d.ea);
			}
		}

		var movHash = [];
		var rotHash = [];
		var rotMult = [];
		var rotMulI = [];
		var rotMulM = [];
		for (var i = 0; i < 24; i++) {
			rotHash[i] = rotCube[i].hashCode();
			rotMult[i] = [];
			rotMulI[i] = [];
			rotMulM[i] = [];
		}
		for (var i = 0; i < 18; i++) {
			movHash[i] = CubieCube.moveCube[i].hashCode();
		}
		for (var i = 0; i < 24; i++) {
			for (var j = 0; j < 24; j++) {
				CubieCube.CornMult(rotCube[i], rotCube[j], c);
				CubieCube.EdgeMult(rotCube[i], rotCube[j], c);
				var k = rotHash.indexOf(c.hashCode());
				rotMult[i][j] = k;
				rotMulI[k][j] = i;
			}
		}
		for (var i = 0; i < 24; i++) {
			for (var j = 0; j < 18; j++) {
				CubieCube.CornMult(rotCube[rotMulI[0][i]], CubieCube.moveCube[j], c);
				CubieCube.EdgeMult(rotCube[rotMulI[0][i]], CubieCube.moveCube[j], c);
				CubieCube.CornMult(c, rotCube[i], d);
				CubieCube.EdgeMult(c, rotCube[i], d);
				var k = movHash.indexOf(d.hashCode());
				rotMulM[i][j] = k;
			}
		}

		var rot2str = [
			"", "y'", "y2", "y",
			"z2", "y' z2", "y2 z2", "y z2",
			"y' x'", "y2 x'", "y x'", "x'",
			"y' x", "y2 x", "y x", "x",
			"y z", "z", "y' z", "y2 z",
			"y' z'", "y2 z'", "y z'", "z'"
		];

		CubieCube.rotMult = rotMult;
		CubieCube.rotMulI = rotMulI;
		CubieCube.rotMulM = rotMulM;
		CubieCube.rot2str = rot2str;
		return rotCube;
	})();

	CubieCube.prototype.edgeCycles = function() {
		var visited = [];
		var small_cycles = [0, 0, 0];
		var cycles = 0;
		var parity = false;
		for (var x = 0; x < 12; ++x) {
			if (visited[x]) {
				continue
			}
			var length = -1;
			var flip = false;
			var y = x;
			do {
				visited[y] = true;
				++length;
				flip ^= this.ea[y] & 1;
				y = this.ea[y] >> 1;
			} while (y != x);
			cycles += length >> 1;
			if (length & 1) {
				parity = !parity;
				++cycles;
			}
			if (flip) {
				if (length == 0) {
					++small_cycles[0];
				} else if (length & 1) {
					small_cycles[2] ^= 1;
				} else {
					++small_cycles[1];
				}
			}
		}
		small_cycles[1] += small_cycles[2];
		if (small_cycles[0] < small_cycles[1]) {
			cycles += (small_cycles[0] + small_cycles[1]) >> 1;
		} else {
			var flip_cycles = [0, 2, 3, 5, 6, 8, 9];
			cycles += small_cycles[1] + flip_cycles[(small_cycles[0] - small_cycles[1]) >> 1];
		}
		return cycles - parity;
	};

	var CubeMoveRE = /^\s*([URFDLB]w?|[EMSyxz]|2-2[URFDLB]w)(['2]?)(@\d+)?\s*$/;
	var tmpCubie = new CubieCube();
	CubieCube.prototype.selfMoveStr = function(moveStr, isInv) {
		var m = CubeMoveRE.exec(moveStr);
		if (!m) {
			return;
		}
		var face = m[1];
		var pow = "2'".indexOf(m[2] || '-') + 2;
		if (isInv) {
			pow = 4 - pow;
		}
		if (m[3]) {
			this.tstamp = ~~m[3].slice(1);
		}
		this.ori = this.ori || 0;
		var axis = 'URFDLB'.indexOf(face);
		if (axis != -1) {
			m = axis * 3 + pow % 4 - 1
			m = CubieCube.rotMulM[this.ori][m];
			CubieCube.EdgeMult(this, CubieCube.moveCube[m], tmpCubie);
			CubieCube.CornMult(this, CubieCube.moveCube[m], tmpCubie);
			this.init(tmpCubie.ca, tmpCubie.ea);
			return m;
		}
		axis = 'UwRwFwDwLwBw'.indexOf(face);
		if (axis != -1) {
			axis >>= 1;
			m = (axis + 3) % 6 * 3 + pow % 4 - 1
			m = CubieCube.rotMulM[this.ori][m];
			CubieCube.EdgeMult(this, CubieCube.moveCube[m], tmpCubie);
			CubieCube.CornMult(this, CubieCube.moveCube[m], tmpCubie);
			this.init(tmpCubie.ca, tmpCubie.ea);
			var rot = [3, 15, 17, 1, 11, 23][axis];
			for (var i = 0; i < pow; i++) {
				this.ori = CubieCube.rotMult[rot][this.ori];
			}
			return m;
		}
		axis = ['2-2Uw', '2-2Rw', '2-2Fw', '2-2Dw', '2-2Lw', '2-2Bw'].indexOf(face);
		if (axis == -1) {
			axis = [null, null, 'S', 'E', 'M', null].indexOf(face);
		}
		if (axis != -1) {
			var m1 = axis * 3 + (4 - pow) % 4 - 1;
			var m2 = (axis + 3) % 6 * 3 + pow % 4 - 1;
			m1 = CubieCube.rotMulM[this.ori][m1];
			CubieCube.EdgeMult(this, CubieCube.moveCube[m1], tmpCubie);
			CubieCube.CornMult(this, CubieCube.moveCube[m1], tmpCubie);
			this.init(tmpCubie.ca, tmpCubie.ea);
			m2 = CubieCube.rotMulM[this.ori][m2];
			CubieCube.EdgeMult(this, CubieCube.moveCube[m2], tmpCubie);
			CubieCube.CornMult(this, CubieCube.moveCube[m2], tmpCubie);
			this.init(tmpCubie.ca, tmpCubie.ea);
			var rot = [3, 15, 17, 1, 11, 23][axis];
			for (var i = 0; i < pow; i++) {
				this.ori = CubieCube.rotMult[rot][this.ori];
			}
			return m1 + 18;
		}
		axis = 'yxz'.indexOf(face);
		if (axis != -1) {
			var rot = [3, 15, 17][axis];
			for (var i = 0; i < pow; i++) {
				this.ori = CubieCube.rotMult[rot][this.ori];
			}
			return;
		}
	}

	CubieCube.prototype.selfConj = function(conj) {
		if (conj === undefined) {
			conj = this.ori;
		}
		if (conj != 0) {
			CubieCube.CornMult(CubieCube.rotCube[conj], this, tmpCubie);
			CubieCube.EdgeMult(CubieCube.rotCube[conj], this, tmpCubie);
			CubieCube.CornMult(tmpCubie, CubieCube.rotCube[CubieCube.rotMulI[0][conj]], this);
			CubieCube.EdgeMult(tmpCubie, CubieCube.rotCube[CubieCube.rotMulI[0][conj]], this);
			this.ori = CubieCube.rotMulI[this.ori][conj] || 0;
		}
	}

	var minx = (function() {
		var U = 0, R = 1, F = 2, L = 3, BL = 4, BR = 5, DR = 6, DL = 7, DBL = 8, B = 9, DBR = 10, D = 11;
		var oppFace = [D, DBL, B, DBR, DR, DL, BL, BR, R, F, L, U];
		var adjFaces = [
			[BR, R, F, L, BL], //U
			[DBR, DR, F, U, BR], //R
			[DR, DL, L, U, R], //F
			[DL, DBL, BL, U, F], //L
			[DBL, B, BR, U, L], //BL
			[B, DBR, R, U, BL], //BR
			[D, DL, F, R, DBR], //DR
			[D, DBL, L, F, DR], //DL
			[D, B, BL, L, DL], //DBL
			[D, DBR, BR, BL, DBL], //B
			[D, DR, R, BR, B], //DBR
			[DR, DBR, B, DBL, DL]  //D
		];

		// wide: 0=single, 1=all, 2=all but single
		// state: corn*5, edge*5, center*1
		function doMove(state, face, pow, wide) {
			pow = (pow % 5 + 5) % 5;
			if (pow == 0) {
				return;
			}
			var base = face * 11;
			var adjs = [];
			var swaps = [[], [], [], [], []];
			for (var i = 0; i < 5; i++) {
				var aface = adjFaces[face][i];
				var ridx = adjFaces[aface].indexOf(face);
				if (wide == 0 || wide == 1) {
					swaps[i].push(base + i);
					swaps[i].push(base + i + 5);
					swaps[i].push(aface * 11 + ridx % 5 + 5);
					swaps[i].push(aface * 11 + ridx % 5);
					swaps[i].push(aface * 11 + (ridx + 1) % 5);
				}
				if (wide == 1 || wide == 2) {
					swaps[i].push(aface * 11 + 10);
					for (var j = 1; j < 5; j++) {
						swaps[i].push(aface * 11 + (ridx + j) % 5 + 5);
					}
					for (var j = 2; j < 5; j++) {
						swaps[i].push(aface * 11 + (ridx + j) % 5);
					}
					var ii = 4 - i;
					var opp = oppFace[face];
					var oaface = adjFaces[opp][ii];
					var oridx = adjFaces[oaface].indexOf(opp);
					swaps[i].push(opp * 11 + ii);
					swaps[i].push(opp * 11 + ii + 5);
					swaps[i].push(oaface * 11 + 10);
					for (var j = 0; j < 5; j++) {
						swaps[i].push(oaface * 11 + (oridx + j) % 5 + 5);
						swaps[i].push(oaface * 11 + (oridx + j) % 5);
					}
				}
			}
			for (var i = 0; i < swaps[0].length; i++) {
				mathlib.acycle(state, [swaps[0][i], swaps[1][i], swaps[2][i], swaps[3][i], swaps[4][i]], pow);
			}
		}

		return {
			doMove: doMove,
			oppFace: oppFace,
			adjFaces: adjFaces
		}
	})();

	function schreierSims(gen, shuffle) {
		this.sgs = [];
		this.sgsi = [];
		this.Tk = [];
		this.gen = gen;
		this.invMap = {};
		var n = gen[0].length;
		this.e = [];
		for (var i = 0; i < n; i++) {
			this.e[i] = i;
		}
		for (var i = 0; i < n; i++) {
			this.sgs.push([]);
			this.sgsi.push([]);
			this.Tk.push([]);
			this.sgs[i][i] = this.e;
			this.sgsi[i][i] = this.e;
		}
		for (var i = 0; i < gen.length; i++) {
			var g = gen[i];
			if (shuffle) {
				g = this.permMult(this.permMult(this.permInv(shuffle), g), shuffle);
			}
			this.knutha(n - 1, g);
		}
	}

	schreierSims.prototype.permMult = function(permA, permB) {
		var ret = [];
		for (var i = 0; i < permA.length; i++) {
			ret[i] = permB[permA[i]];
		}
		return ret;
	}

	schreierSims.prototype.permInv = function(perm) {
		var ret = [];
		for (var i = 0; i < perm.length; i++) {
			ret[perm[i]] = i;
		}
		return ret;
	}

	schreierSims.prototype.isMember = function(p, depth) {
		depth = depth || 0;
		for (var i = p.length - 1; i >= depth; i--) {
			var j = p[i];
			if (!this.sgs[i][j]) {
				return false;
			}
			if (j !== i) {
				p = this.permMult(p, this.sgsi[i][j]);
			}
		}
		return true;
	}

	schreierSims.prototype.minkwitz = function() {
		var words = [];
		var maxl = 8;
		var toFill = 0;
		var newDelay = 3;
		this.words = [];
		this.isNew = [];
		for (var i = 0; i < this.e.length; i++) {
			this.words[i] = [];
			this.words[i][i] = [];
			this.isNew[i] = [];
			for (var j = 0; j < i; j++) {
				if (this.sgs[i][j] && !this.words[i][j]) {
					this.words[i][j] = null;
					toFill++;
				}
			}
		}

		this.invMap = {};
		for (var i = 0; i < this.gen.length; i++) {
			var g = this.gen[i];
			for (var j = i; j < this.gen.length; j++) {
				var isEq = true;
				for (var k = 0; k < this.e.length; k++) {
					if (g[this.gen[j][k]] != k) {
						isEq = false;
						break;
					}
				}
				if (isEq) {
					this.invMap[i] = j;
					this.invMap[j] = i;
				}
			}
			if (this.invMap[i] == undefined) {
				this.invMap[i] = ~i;
				this.invMap[~i] = i;
			}
		}

		var addWords = function(p, words) {
			var ret = -1;
			for (var i = p.length - 1; i >= 0; i--) {
				var j = p[i];
				if (!this.sgs[i][j]) {
					return -2;
				}
				if (!this.words[i][j]) {
					this.words[i][j] = words;
					this.isNew[i][j] = newDelay;
					this.sgs[i][j] = p;
					this.sgsi[i][j] = this.permInv(p);
					return 1;
				}
				if (words.length < this.words[i][j].length) {
					var _p = this.sgs[i][j];
					this.sgs[i][j] = p;
					this.sgsi[i][j] = this.permInv(p);
					p = _p;
					var _words = this.words[i][j];
					this.words[i][j] = words;
					this.isNew[i][j] = newDelay;
					words = _words;
					ret = 0;
				}
				if (words.length + this.words[i][j].length > maxl) {
					return ret;
				}
				p = this.permMult(p, this.sgsi[i][j]);
				for (var k = this.words[i][j].length - 1; k >= 0; k--) {
					words.push(this.invMap[this.words[i][j][k]]);
				}
			}
		}

		var iterGens = function(p, remain, func) {
			if (remain <= 0) {
				return func.call(this, p, words);
			}
			for (var i = 0; i < this.gen.length && toFill > 0; i++) {
				words.push(i);
				var ret = iterGens.call(this, this.permMult(p, this.gen[i]), remain - 1, func);
				words.pop();
				if (ret < 0) { // no improve
					continue;
				}
				words.push(this.invMap[i]);
				iterGens.call(this, this.permMult(p, this.permInv(this.gen[i])), remain - 1, func);
				words.pop();
			}
		}

		var improve = function() {
			var n = 0;
			var newCnt = 0;
			for (var i1 = 0; i1 < this.e.length; i1++) {
				for (var j1 = 0; j1 < i1; j1++) {
					if (this.isNew[i1][j1] > 0) {
						this.isNew[i1][j1]--;
					}
					if (this.isNew[i1][j1]) {
						newCnt++;
					}
				}
			}
			console.log('newCnt', newCnt);
			for (var i1 = 0; i1 < this.e.length; i1++) {
				var isFilled = true;
				for (var j1 = 0; j1 < i1; j1++) {
					if (this.sgs[i1][j1] && !this.words[i1][j1]) {
						isFilled = false;
						break;
					}
				}
				for (var j1 = 0; j1 < i1; j1++) {
					if (!this.words[i1][j1]) {
						continue;
					}
					for (var i2 = i1; i2 < this.e.length; i2++) {
						if (isFilled && i1 != i2) {
							continue;
						}
						for (var j2 = (i1 == i2 ? j1 : 0); j2 < i2; j2++) {
							if (!this.words[i2][j2]) {
								continue;
							}
							var cuml = this.words[i1][j1].length + this.words[i2][j2].length;
							if (cuml > maxl) {
								continue;
							}
							if (this.isNew[i1][j1] == 0 && this.isNew[i2][j2] == 0 && i1 == i2) {
								continue;
							}
							var cc = this.sgs[i1][j1][this.sgs[i2][j2][i1]];
							if (this.words[i1][cc] && this.words[i1][cc].length < cuml * 1.5 && i1 != i2) {
								continue;
							}
							var ret = addWords.call(this,
								this.permMult(this.sgs[i2][j2], this.sgs[i1][j1]),
								this.words[i2][j2].concat(this.words[i1][j1])
							);
							if (ret > -1) {
								n++;
							}
							if (ret > 0) {
								toFill--;
							}
							// console.log(i1, i2, ret);
						}
					}
				}
			}
			return n;
		}
		var start = $.now();
		var cnt = 0;
		for (var i = 1; i < 100 && toFill > 0; i++) {
			iterGens.call(this, this.e, i, function(p, words) {
				var ret = addWords.call(this, p, words.slice());
				cnt++;
				if (ret > 0) {
					toFill--;
				}
				if (cnt % 1000 == 0) {
					var ret2 = improve.call(this);
					maxl = Math.round(maxl * 1.25);
					console.log(ret2, toFill, maxl);
				}
				return ret;
			});
		}
		console.log('final', $.now() - start);
		improve.call(this);
		console.log('init minkwitz', $.now() - start);
		window.sgs1 = this;
	}

	schreierSims.prototype.getGen = function(p) {
		var ret = [];
		for (var i = p.length - 1; i >= 0; i--) {
			var j = p[i];
			if (!this.sgs[i][j]) {
				return null;
			}
			if (j !== i) {
				p = this.permMult(p, this.sgsi[i][j]);
				ret.push(this.words[i][j]);
			}
		}
		return ret.reverse();
	}

	schreierSims.prototype.knutha = function(k, p) {
		this.Tk[k].push(p);
		for (var i = 0; i < this.sgs[k].length; i++) {
			if (this.sgs[k][i]) {
				this.knuthb(k, this.permMult(this.sgs[k][i], p));
			}
		}
	}

	schreierSims.prototype.knuthb = function(k, p) {
		var j = p[k];
		if (!this.sgs[k][j]) {
			this.sgs[k][j] = p;
			this.sgsi[k][j] = this.permInv(p);
			for (var i = 0; i < this.Tk[k].length; i++) {
				this.knuthb(k, this.permMult(p, this.Tk[k][i]));
			}
			return;
		}
		var p2 = this.permMult(p, this.sgsi[k][j]);
		if (!this.isMember(p2)) {
			this.knutha(k - 1, p2);
		}
	}

	schreierSims.prototype.size = function() {
		var n = this.sgs.length;
		var size = 1;
		for (var j = 0; j < n; j++) {
			var cnt = 0;
			for (var k = 0; k < n; k++) {
				if (this.sgs[j][k]) {
					cnt++;
				}
			}
			size *= cnt;
		}
		return size;
	}

	schreierSims.prototype.intersect = function(other, thres) {
		if (this.size() > other.size()) {
			return other.intersect(this, thres);
		}
		thres = thres || 100000;
		var ret = new schreierSims([this.sgs[0][0]]);
		var n = this.sgs.length;
		ret.cnt = 0;
		for (var i = 0; i < n; i++) {
			for (var j = 0; j < i; j++) {
				if (!this.sgs[i][j] || ret.sgs[i][j]) {
					continue;
				}
				// console.log(i, j);
				this.enumDFS(i - 1, this.sgs[i][j], function(perm) {
					ret.knutha(n - 1, perm);
					// console.log(i, j, ret.size(), perm);
					return true;
				}, function(depth, perm) {
					if (ret.cnt > thres || ret.cnt == -1) {
						ret.cnt = -1;
						return false;
					}
					ret.cnt++;
					var mchk = other.isMember(perm, depth);
					if (!mchk) {
						return false;
					}
					for (var i = 0; i < ret.sgs[depth].length - 1; i++) {
						if (ret.sgs[depth][i]) {
							var pp = ret.permMult(perm, ret.sgs[depth][i]);
							if (pp[depth] < perm[depth]) {
								return false;
							}
						}
					}
					return true;
				});
				if (ret.cnt == -1) {
					return ret;
				}
			}
		}
		return ret;
	}

	schreierSims.prototype.enumDFS = function(depth, perm, callback, checkFunc) {
		if (checkFunc && !checkFunc(depth + 1, perm)) {
			return;
		}
		if (depth == 0) {
			return callback(perm);
		}
		for (var j = 0; j <= depth; j++) {
			if (this.sgs[depth][j]) {
				var ret = this.enumDFS(depth - 1, this.permMult(this.sgs[depth][j], perm), callback, checkFunc);
				if (ret) {
					// console.log(depth, j, this.sgs[depth][j])
					return ret;
				}
			}
		}
	}

	schreierSims.prototype.enum = function(callback) {
		this.enumDFS(this.sgs.length - 1, this.sgs[0][0], callback);
	}

	schreierSims.prototype.rndElem = function() {
		var perm = this.e.slice();
		for (var i = this.e.length - 1; i >= 0; i--) {
			var cnt = 0;
			var p = 0;
			for (var j = 0; j <= i; j++) {
				if (!this.sgs[i][j]) {
					continue;
				}
				if (rn(++cnt) < 1) {
					p = j;
				}
			}
			if (p !== i) {
				perm = this.permMult(perm, this.sgsi[i][p]);
			}
		}
		return perm;
	}

	function createPrun(prun, init, size, maxd, doMove, N_MOVES, N_POWER, N_INV) {
		var isMoveTable = $.isArray(doMove);
		N_MOVES = N_MOVES || 6;
		N_POWER = N_POWER || 3;
		N_INV = N_INV || 256;
		maxd = maxd || 256;
		for (var i = 0, len = (size + 7) >>> 3; i < len; i++) {
			prun[i] = -1;
		}
		prun[init >> 3] ^= 15 << ((init & 7) << 2);
		var val = 0;
		// var t = +new Date;
		for (var l = 0; l <= maxd; l++) {
			var done = 0;
			var inv = l >= N_INV;
			var fill = (l + 1) ^ 15;
			var find = inv ? 0xf : l;
			var check = inv ? l : 0xf;

			out: for (var p = 0; p < size; p++, val >>= 4) {
				if ((p & 7) == 0) {
					val = prun[p >> 3];
					if (!inv && val == -1) {
						p += 7;
						continue;
					}
				}
				if ((val & 0xf) != find) {
					continue;
				}
				for (var m = 0; m < N_MOVES; m++) {
					var q = p;
					for (var c = 0; c < N_POWER; c++) {
						q = isMoveTable ? doMove[m][q] : doMove(q, m);
						if (getPruning(prun, q) != check) {
							continue;
						}
						++done;
						if (inv) {
							prun[p >> 3] ^= fill << ((p & 7) << 2);
							continue out;
						}
						prun[q >> 3] ^= fill << ((q & 7) << 2);
					}
				}
			}
			if (done == 0) {
				break;
			}
			DEBUG && console.log('[prun]', done);
		}
	}

	//state_params: [[init, doMove, size, [maxd], [N_INV]], [...]...]
	function Solver(N_MOVES, N_POWER, state_params) {
		this.N_STATES = state_params.length;
		this.N_MOVES = N_MOVES;
		this.N_POWER = N_POWER;
		this.state_params = state_params;
		this.inited = false;
	}

	var _ = Solver.prototype;

	_.search = function(state, minl, MAXL) {
		MAXL = (MAXL || 99) + 1;
		if (!this.inited) {
			this.move = [];
			this.prun = [];
			for (var i = 0; i < this.N_STATES; i++) {
				var state_param = this.state_params[i];
				var init = state_param[0];
				var doMove = state_param[1];
				var size = state_param[2];
				var maxd = state_param[3];
				var N_INV = state_param[4];
				this.move[i] = [];
				this.prun[i] = [];
				createMove(this.move[i], size, doMove, this.N_MOVES);
				createPrun(this.prun[i], init, size, maxd, this.move[i], this.N_MOVES, this.N_POWER, N_INV);
			}
			this.inited = true;
		}
		this.sol = [];
		for (var maxl = minl; maxl < MAXL; maxl++) {
			if (this.idaSearch(state, maxl, -1)) {
				break;
			}
		}
		return maxl == MAXL ? null : this.sol.reverse();
	};

	_.toStr = function(sol, move_map, power_map) {
		var ret = [];
		for (var i = 0; i < sol.length; i++) {
			ret.push(move_map[sol[i][0]] + power_map[sol[i][1]]);
		}
		return ret.join(' ').replace(/ +/g, ' ');
	};

	_.idaSearch = function(state, maxl, lm) {
		var N_STATES = this.N_STATES;
		for (var i = 0; i < N_STATES; i++) {
			if (getPruning(this.prun[i], state[i]) > maxl) {
				return false;
			}
		}
		if (maxl == 0) {
			return true;
		}
		var offset = state[0] + maxl + lm + 1;
		for (var move0 = 0; move0 < this.N_MOVES; move0++) {
			var move = (move0 + offset) % this.N_MOVES;
			if (move == lm) {
				continue;
			}
			var cur_state = state.slice();
			for (var power = 0; power < this.N_POWER; power++) {
				for (var i = 0; i < N_STATES; i++) {
					cur_state[i] = this.move[i][move][cur_state[i]];
				}
				if (this.idaSearch(cur_state, maxl - 1, move)) {
					this.sol.push([move, power]);
					return true;
				}
			}
		}
		return false;
	};

	function identity(state) {
		return state;
	}

	function phSolver(solvedStates, doMove, moves, prunHashs, isPartial) {
		this.solvedStates = solvedStates;
		this.doMove = doMove;
		this.movesList = [];
		for (var move in moves) {
			this.movesList.push([move, moves[move]]);
		}
		this.state2Idxs = [];
		this.moveTables = [];
		this.prunTables = [];
		this.isPartial = isPartial || false;
		this.prunHashs = prunHashs || [identity];
	}

	_ = phSolver.prototype;

	_.initPrun = function() {
		if (this.moveTables.length != 0) {
			return;
		}
		for (var idx = 0; idx < this.prunHashs.length; idx++) {
			var state2Idx = {};
			var moveTable = [null];
			var prunTable = [];
			for(var i = 0; i < this.solvedStates.length; i++) {
				var state = this.prunHashs[idx](this.solvedStates[i]);
				if (state in state2Idx) {
					continue;
				}
				state2Idx[state] = moveTable.length << 8;
				moveTable.push(state);
			}
			var head = 1;
			var curDepth = 0;
			var t = +new Date;
			while (head != moveTable.length) {
				var state = moveTable[head];
				var prun = (state2Idx[state] & 0xff) + 1;
				if (prun != curDepth) {
					DEBUG && console.log('[phSolver] initPrun', curDepth, moveTable.length - 1, +new Date - t);
					curDepth = prun;
					prunTable.push(moveTable.length - 1); // if idx > prunTable[i] then prun(idx) > i
				}
				var curTable = [];
				for (var moveIdx = 0; moveIdx < this.movesList.length; moveIdx++) {
					var newState = this.doMove(state, this.movesList[moveIdx][0]);
					if (!newState) {
						continue;
					}
					if (!(newState in state2Idx)) {
						state2Idx[newState] = moveTable.length << 8 | prun;
						moveTable.push(newState);
					}
					var newIdx = state2Idx[newState] >> 8;
					curTable[moveIdx] = newIdx;
				}
				moveTable[head] = curTable;
				head++;
			}
			this.moveTables[idx] = moveTable;
			this.prunTables[idx] = prunTable;
			this.state2Idxs[idx] = state2Idx;
		}
	}

	_.search = function(state, minl, MAXL) {
		this.initPrun();
		this.sol = [];
		this.subOpt = false;
		this.rawState = state;
		this.state = [];
		for (var idx = 0; idx < this.prunHashs.length; idx++) {
			var hstate = this.prunHashs[idx](state);
			this.state.push(this.state2Idxs[idx][hstate] >> 8);
		}
		this.visited = {};
		this.maxl = minl = minl || 0;
		return this.searchNext(MAXL);
	};

	_.searchNext = function(MAXL, cost) {
		this.initPrun();
		MAXL = (MAXL + 1) || 99;
		this.prevSolStr = this.solArr ? this.solArr.join(',') : null;
		this.solArr = null;
		this.cost = cost || -1;
		for (; this.maxl < MAXL; this.maxl++) {
			if (this.cost == 0) {
				return null;
			}
			if (this.idaSearch(this.state, this.maxl, null, 0)) {
				break;
			}
		}
		return this.solArr;
	}

	_.idaSearch = function(state, maxl, lm, depth) {
		if (this.getPruning(state) > maxl) {
			return false;
		}
		if (maxl == 0) {
			var rawState = this.rawState;
			var solArr = [];
			var curVisited = [];
			for (var i = 0; i < this.sol.length; i++) {
				var move = this.movesList[this.sol[i]][0];
				rawState = this.doMove(rawState, move);
				solArr.push(move);
				curVisited.push(rawState);
				if (!this.subOpt && rawState in this.visited && this.visited[state] < depth) {
					return false;
				}
			}
			if (this.solvedStates.indexOf(rawState) == -1) {
				return false;
			}
			for (var i = 0; i < curVisited.length; i++) {
				this.visited[curVisited[i]] = i;
			}
			this.subOpt = true;
			if (solArr.join(',') == this.prevSolStr) {
				return false;
			}
			this.solArr = solArr;
			return true;
		}
		if (this.cost >= 0) {
			if (this.cost == 0) {
				return true;
			}
			this.cost--;
		}
		var lastMove = lm == null ? '' : this.movesList[lm][0];
		var lastAxisFace = lm == null ? -1 : this.movesList[lm][1];
		for (var moveIdx = this.sol[depth] || 0; moveIdx < this.movesList.length; moveIdx++) {
			var moveArgs = this.movesList[moveIdx];
			var axisface = moveArgs[1] ^ lastAxisFace;
			var move = moveArgs[0];
			if (axisface == 0 ||
				(axisface & 0xf) == 0 && move <= lastMove) {
				continue;
			}
			var isSkip = false;
			var isEqual = true;
			var newState = [];
			for (var i = 0; i < state.length; i++) {
				var val = this.moveTables[i][state[i]][moveIdx];
				if (!val) {
					isSkip = true;
					break;
				} else if (val != state[i]) {
					isEqual = false;
				}
				newState.push(val);
			}
			if (isSkip || isEqual && !this.isPartial) {
				continue;
			}
			this.sol[depth] = moveIdx;
			if (this.idaSearch(newState, maxl - 1, moveIdx, depth + 1)) {
				return true;
			}
			this.sol.pop();
		}
		return false;
	};

	_.getPruning = function(state) {
		var prun = 0;
		for (var i = 0; i < state.length; i++) {
			var prunTable = this.prunTables[i];
			while (prunTable[prun] < state[i]) {
				prun++;
			}
		}
		return prun;
	};

	// state: string not null
	// solvedStates: [solvedstate, solvedstate, ...], string not null
	// moveFunc: function(state, move);
	// moves: {move: face0 | axis0}, face0 | axis0 = 4 + 4 bits
	function gSolver(solvedStates, doMove, moves) {
		this.solvedStates = solvedStates;
		this.doMove = doMove;
		this.movesList = [];
		for (var move in moves) {
			this.movesList.push([move, moves[move]]);
		}
		this.prunTable = {};
		this.toUpdateArr = null;
		this.prunTableSize = 0;
		this.prunDepth = -1;
		this.cost = 0;
		this.MAX_PRUN_SIZE = 100000;
	}

	_ = gSolver.prototype;

	_.calcNumOfStates = function() {
		var len = this.solvedStates[0].length;
		var genMove = [];
		for (var moveIdx = 0; moveIdx < this.movesList.length; moveIdx++) {
			var state = [];
			for (var i=0; i<len; i++) {
				state.push(i + 32);
			}
			var newState = this.doMove(String.fromCharCode.apply(null, state), this.movesList[moveIdx][0]);
			if (!newState || newState in this.prunTable) {
				continue;
			}
			for (var i=0; i<len; i++) {
				state[i] = newState.charCodeAt(i) - 32;
			}
			genMove.push(state);
		}
		var genColor = [];
		var state = this.solvedStates[0];
		var e = [];
		for (var i = 0; i < len; i++) {
			e[i] = i;
		}
		var checked = [];
		for (var i = 0; i < len; i++) {
			if (checked[i]) {
				continue;
			}
			for (var j = i + 1; j < len; j++) {
				if (state[i] == state[j] && (i % 9 % 2) == (j % 9 % 2)) {
					var perm = e.slice();
					perm[i] = j;
					perm[j] = i;
					checked[j] = 1;
					genColor.push(perm);
				}
			}
		}
		/*
		var sgsObj = new schreierSims(genMove);
		sgsObj.minkwitz();
		var perm = e.slice();
		var initMv = [];
		for (var i = 0; i < 50; i++) {
			var mv = rn(genMove.length);
			perm = sgsObj.permMult(genMove[mv], perm);
			initMv.push(sgsObj.invMap[mv]);
		}
		var sol = sgsObj.getGen(perm);
		var move2str = function(v) { return "URFDLB"[~~(v/3)] + " 2'"[v%3]; };
		sol = $.map(Array.prototype.concat.apply([], sol).reverse(), move2str).join(' ');
		console.log($.map(initMv.reverse(), move2str).join(' '), '\n', sol);
		*/
		var sgs0, sgs1, sgs01;
		for (var r = 0; r < 100; r++) {
			var shuffle = [];
			for (var i = 0; i < len; i++) {
				shuffle[i] = i;
			}
			for (var i = 0; i < len; i++) {
				var j = ~~(Math.random() * (len - i)) + i;
				var tmp = shuffle[i];
				shuffle[i] = shuffle[j];
				shuffle[j] = tmp;
			}
			sgs0 = new schreierSims(genColor, shuffle);
			sgs1 = new schreierSims(genMove, shuffle);
			sgs01 = sgs0.intersect(sgs1);
			if (sgs01.cnt != -1) {
				console.log(r);
				break;
			}
		}
		console.log(sgs01.cnt, sgs0.size(), sgs1.size(), sgs01.size(), sgs1.size() / sgs01.size());
	};

	_.updatePrun = function(targetDepth) {
		targetDepth = targetDepth === undefined ? this.prunDepth + 1 : targetDepth;
		for (var depth = this.prunDepth + 1; depth <= targetDepth; depth++) {
			if (this.prevSize >= this.MAX_PRUN_SIZE) {
				DEBUG && console.log('[gSolver] skipPrun', depth, this.prunTableSize);
				break;
			}
			var t = +new Date;
			if (depth < 1) {
				this.prevSize = 0;
				for (var i = 0; i < this.solvedStates.length; i++) {
					var state = this.solvedStates[i];
					if (!(state in this.prunTable)) {
						this.prunTable[state] = depth;
						this.prunTableSize++;
					}
				}
			} else {
				this.updatePrunBFS(depth - 1);
			}
			if (this.cost == 0) {
				return;
			}
			this.prunDepth = depth;
			DEBUG && console.log('[gSolver] updatePrun', depth, this.prunTableSize - this.prevSize, +new Date - t);
			this.prevSize = this.prunTableSize;
		}
	};

	_.updatePrunBFS = function(fromDepth) {
		if (this.toUpdateArr == null) {
			this.toUpdateArr = [];
			for (var state in this.prunTable) {
				if (this.prunTable[state] != fromDepth) {
					continue;
				}
				this.toUpdateArr.push(state);
			}
		}
		while (this.toUpdateArr.length != 0) {
			var state = this.toUpdateArr.pop();
			for (var moveIdx = 0; moveIdx < this.movesList.length; moveIdx++) {
				var newState = this.doMove(state, this.movesList[moveIdx][0]);
				if (!newState || newState in this.prunTable) {
					continue;
				}
				this.prunTable[newState] = fromDepth + 1;
				this.prunTableSize++;
			}
			if (this.cost >= 0) {
				if (this.cost == 0) {
					return;
				}
				this.cost--;
			}
		}
		this.toUpdateArr = null;
	};

	_.search = function(state, minl, MAXL) {
		this.sol = [];
		this.subOpt = false;
		this.state = state;
		this.visited = {};
		this.maxl = minl = minl || 0;
		return this.searchNext(MAXL);
	};

	_.searchNext = function(MAXL, cost) {
		MAXL = (MAXL + 1) || 99;
		this.prevSolStr = this.solArr ? this.solArr.join(',') : null;
		this.solArr = null;
		this.cost = cost || -1;
		for (; this.maxl < MAXL; this.maxl++) {
			this.updatePrun(Math.ceil(this.maxl / 2));
			if (this.cost == 0) {
				return null;
			}
			if (this.idaSearch(this.state, this.maxl, null, 0)) {
				break;
			}
		}
		return this.solArr;
	}

	_.getPruning = function(state) {
		var prun = this.prunTable[state];
		return prun === undefined ? this.prunDepth + 1 : prun;
	};

	_.idaSearch = function(state, maxl, lm, depth) {
		if (this.getPruning(state) > maxl) {
			return false;
		}
		if (maxl == 0) {
			if (this.solvedStates.indexOf(state) == -1) {
				return false;
			}
			var solArr = this.getSolArr();
			this.subOpt = true;
			if (solArr.join(',') == this.prevSolStr) {
				return false;
			}
			this.solArr = solArr;
			return true;
		}
		if (!this.subOpt) {
			if (state in this.visited && this.visited[state] < depth) {
				return false;
			}
			this.visited[state] = depth;
		}
		if (this.cost >= 0) {
			if (this.cost == 0) {
				return true;
			}
			this.cost--;
		}
		var lastMove = lm == null ? '' : this.movesList[lm][0];
		var lastAxisFace = lm == null ? -1 : this.movesList[lm][1];
		for (var moveIdx = this.sol[depth] || 0; moveIdx < this.movesList.length; moveIdx++) {
			var moveArgs = this.movesList[moveIdx];
			var axisface = moveArgs[1] ^ lastAxisFace;
			var move = moveArgs[0];
			if (axisface == 0 ||
				(axisface & 0xf) == 0 && move <= lastMove) {
				continue;
			}
			var newState = this.doMove(state, move);
			if (!newState || newState == state) {
				continue;
			}
			this.sol[depth] = moveIdx;
			if (this.idaSearch(newState, maxl - 1, moveIdx, depth + 1)) {
				return true;
			}
			this.sol.pop();
		}
		return false;
	};

	_.getSolArr = function() {
		var solArr = [];
		for (var i = 0; i < this.sol.length; i++) {
			solArr.push(this.movesList[this.sol[i]][0]);
		}
		return solArr;
	}

	var randGen = (function() {
		var rndFunc;
		var rndCnt;
		var seedStr; // '' + new Date().getTime();

		function random() {
			rndCnt++;
			// console.log(rndCnt);
			return rndFunc();
		}

		function getSeed() {
			return [rndCnt, seedStr];
		}

		function setSeed(_rndCnt, _seedStr) {
			if (_seedStr && (_seedStr != seedStr || rndCnt > _rndCnt)) {
				var seed = [];
				for (var i = 0; i < _seedStr.length; i++) {
					seed[i] = _seedStr.charCodeAt(i);
				}
				rndFunc = new MersenneTwisterObject(seed[0], seed);
				rndCnt = 0;
				seedStr = _seedStr;
			}
			while (rndCnt < _rndCnt) {
				rndFunc();
				rndCnt++;
			}
		}

		// setSeed(0, '1576938267035');
		setSeed(0, '' + new Date().getTime());

		return {
			random: random,
			getSeed: getSeed,
			setSeed: setSeed
		};
	})();

	function rndEl(x) {
		return x[~~(randGen.random() * x.length)];
	}

	function rn(n) {
		return ~~(randGen.random() * n)
	}

	function rndHit(prob) {
		return randGen.random() < prob;
	}

	function rndPerm(n, isEven) {
		var p = 0;
		var arr = [];
		for (var i = 0; i < n; i++) {
			arr[i] = i;
		}
		for (var i = 0; i < n - 1; i++) {
			var k = rn(n - i);
			circle(arr, i, i + k);
			p ^= k != 0;
		}
		if (isEven && p) {
			circle(arr, 0, 1);
		}
		return arr;
	}

	function rndProb(plist) {
		var cum = 0;
		var curIdx = 0;
		for (var i = 0; i < plist.length; i++) {
			if (plist[i] == 0) {
				continue;
			}
			if (randGen.random() < plist[i] / (cum + plist[i])) {
				curIdx = i;
			}
			cum += plist[i];
		}
		return curIdx;
	}

	function time2str(unix, format) {
		if (!unix) {
			return 'N/A';
		}
		format = format || '%Y-%M-%D %h:%m:%s';
		var date = new Date(unix * 1000);
		return format
			.replace('%Y', date.getFullYear())
			.replace('%M', ('0' + (date.getMonth() + 1)).slice(-2))
			.replace('%D', ('0' + date.getDate()).slice(-2))
			.replace('%h', ('0' + date.getHours()).slice(-2))
			.replace('%m', ('0' + date.getMinutes()).slice(-2))
			.replace('%s', ('0' + date.getSeconds()).slice(-2));
	}

	var timeRe = /^\s*(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+)\s*$/;

	function str2time(val) {
		var m = timeRe.exec(val);
		if (!m) {
			return null;
		}
		var date = new Date(0);
		date.setFullYear(~~m[1]);
		date.setMonth(~~m[2] - 1);
		date.setDate(~~m[3]);
		date.setHours(~~m[4]);
		date.setMinutes(~~m[5]);
		date.setSeconds(~~m[6]);
		return ~~(date.getTime() / 1000);
	}

	function obj2str(val) {
		if (typeof val == 'string') {
			return val;
		}
		return JSON.stringify(val);
	}

	function str2obj(val) {
		if (typeof val != 'string') {
			return val;
		}
		return JSON.parse(val);
	}

	function valuedArray(len, val) {
		var ret = [];
		for (var i = 0; i < len; i++) {
			ret[i] = val;
		}
		return ret;
	}

	Math.TAU = Math.PI * 2;

	return {
		Cnk: Cnk,
		fact: fact,
		getPruning: getPruning,
		setNPerm: setNPerm,
		getNPerm: getNPerm,
		getNParity: getNParity,
		get8Perm: get8Perm,
		set8Perm: set8Perm,
		coord: coord,
		createMove: createMove,
		edgeMove: edgeMove,
		circle: circle,
		circleOri: circleOri,
		acycle: acycle,
		schreierSims: schreierSims,
		createPrun: createPrun,
		CubieCube: CubieCube,
		minx: minx,
		SOLVED_FACELET: "UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB",
		fillFacelet: fillFacelet,
		rn: rn,
		rndEl: rndEl,
		rndProb: rndProb,
		rndHit: rndHit,
		time2str: time2str,
		str2time: str2time,
		obj2str: obj2str,
		str2obj: str2obj,
		valuedArray: valuedArray,
		Solver: Solver,
		rndPerm: rndPerm,
		gSolver: gSolver,
		phSolver: phSolver,
		getSeed: randGen.getSeed,
		setSeed: randGen.setSeed
	};
})();
