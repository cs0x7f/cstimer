"use strict";

var min2phase = (function() {
	var USE_TWIST_FLIP_PRUN = true;
	var PARTIAL_INIT_LEVEL = 2;

	var MAX_PRE_MOVES = 20;
	var TRY_INVERSE = true;
	var TRY_THREE_AXES = true;

	var USE_COMBP_PRUN = true; //USE_TWIST_FLIP_PRUN;
	var USE_CONJ_PRUN = USE_TWIST_FLIP_PRUN;
	var MIN_P1LENGTH_PRE = 7;
	var MAX_DEPTH2 = 13;

	var INVERSE_SOLUTION = 0x2;

	function Search() {
		this.move = [];
		this.moveSol = [];

		this.nodeUD = [];

		this.valid1 = 0;
		this.allowShorter = false;
		this.cc = new CubieCube();
		this.urfCubieCube = [];
		this.urfCoordCube = [];
		this.phase1Cubie = [];

		this.preMoveCubes = [];
		this.preMoves = [];
		this.preMoveLen = 0;
		this.maxPreMoves = 0;

		this.isRec = false;
		for (var i = 0; i < 21; i++) {
			this.nodeUD[i] = new CoordCube();
			this.phase1Cubie[i] = new CubieCube();
		}
		for (var i = 0; i < 6; i++) {
			this.urfCubieCube[i] = new CubieCube();
			this.urfCoordCube[i] = new CoordCube();
		}
		for (var i = 0; i < MAX_PRE_MOVES; i++) {
			this.preMoveCubes[i + 1] = new CubieCube();
		}
	}

	var Ux1 = 0;
	var Ux2 = 1;
	var Ux3 = 2;
	var Rx1 = 3;
	var Rx2 = 4;
	var Rx3 = 5;
	var Fx1 = 6;
	var Fx2 = 7;
	var Fx3 = 8;
	var Dx1 = 9;
	var Dx2 = 10;
	var Dx3 = 11;
	var Lx1 = 12;
	var Lx2 = 13;
	var Lx3 = 14;
	var Bx1 = 15;
	var Bx2 = 16;
	var Bx3 = 17;

	var N_MOVES = 18;
	var N_MOVES2 = 10;
	var N_FLIP = 2048;
	var N_FLIP_SYM = 336;
	var N_TWIST = 2187;
	var N_TWIST_SYM = 324;
	var N_PERM = 40320;
	var N_PERM_SYM = 2768;
	var N_MPERM = 24;
	var N_SLICE = 495;
	var N_COMB = USE_COMBP_PRUN ? 140 : 70;
	var P2_PARITY_MOVE = USE_COMBP_PRUN ? 0xA5 : 0;

	var SYM_E2C_MAGIC = 0x00DDDD00;
	var Cnk = [];
	var fact = [1];
	var move2str = [
		"U ", "U2", "U'", "R ", "R2", "R'", "F ", "F2", "F'",
		"D ", "D2", "D'", "L ", "L2", "L'", "B ", "B2", "B'"
	];
	var ud2std = [Ux1, Ux2, Ux3, Rx2, Fx2, Dx1, Dx2, Dx3, Lx2, Bx2, Rx1, Rx3, Fx1, Fx3, Lx1, Lx3, Bx1, Bx3];
	var std2ud = [];
	var ckmv2bit = [];
	var urfMove = [
		[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
		[6, 7, 8, 0, 1, 2, 3, 4, 5, 15, 16, 17, 9, 10, 11, 12, 13, 14],
		[3, 4, 5, 6, 7, 8, 0, 1, 2, 12, 13, 14, 15, 16, 17, 9, 10, 11],
		[2, 1, 0, 5, 4, 3, 8, 7, 6, 11, 10, 9, 14, 13, 12, 17, 16, 15],
		[8, 7, 6, 2, 1, 0, 5, 4, 3, 17, 16, 15, 11, 10, 9, 14, 13, 12],
		[5, 4, 3, 8, 7, 6, 2, 1, 0, 14, 13, 12, 17, 16, 15, 11, 10, 9]
	];

	{ // init util
		for (var i = 0; i < 18; i++) {
			std2ud[ud2std[i]] = i;
		}
		for (var i = 0; i < 10; i++) {
			var ix = ~~(ud2std[i] / 3);
			ckmv2bit[i] = 0;
			for (var j = 0; j < 10; j++) {
				var jx = ~~(ud2std[j] / 3);
				ckmv2bit[i] |= ((ix == jx) || ((ix % 3 == jx % 3) && (ix >= jx)) ? 1 : 0) << j;
			}
		}
		ckmv2bit[10] = 0;
		for (var i = 0; i < 13; i++) {
			Cnk[i] = [];
			fact[i + 1] = fact[i] * (i + 1);
			Cnk[i][0] = Cnk[i][i] = 1;
			for (var j = 1; j < 13; j++) {
				Cnk[i][j] = j <= i ? Cnk[i - 1][j - 1] + Cnk[i - 1][j] : 0;
			}
		}
	}

	function setVal(val0, val, isEdge) {
		return isEdge ? (val << 1 | val0 & 1) : (val | val0 & 0xf8);
	}

	function getVal(val0, isEdge) {
		return isEdge ? val0 >> 1 : val0 & 7;
	}

	function setPruning(table, index, value) {
		table[index >> 3] ^= value << (index << 2); // index << 2 <=> (index & 7) << 2
	}

	function getPruning(table, index) {
		return table[index >> 3] >> (index << 2) & 0xf; // index << 2 <=> (index & 7) << 2
	}

	function getPruningMax(maxValue, table, index) {
		return Math.min(maxValue, table[index >> 3] >> (index << 2) & 0xf);
	}

	function hasZero(val) {
		return ((val - 0x11111111) & ~val & 0x88888888) != 0;
	}

	function ESym2CSym(idx) {
		return idx ^ (SYM_E2C_MAGIC >> ((idx & 0xf) << 1) & 3);
	}

	function getPermSymInv(idx, sym, isCorner) {
		var idxi = PermInvEdgeSym[idx];
		if (isCorner) {
			idxi = ESym2CSym(idxi);
		}
		return idxi & 0xfff0 | SymMult[idxi & 0xf][sym];
	}

	function CubieCube() {
		this.ca = [0, 1, 2, 3, 4, 5, 6, 7];
		this.ea = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22];
	}

	function setNPerm(arr, idx, n, isEdge) {
		n--;
		var val = 0x76543210;
		for (var i = 0; i < n; ++i) {
			var p = fact[n - i];
			var v = ~~(idx / p);
			idx %= p;
			v <<= 2;
			arr[i] = setVal(arr[i], val >> v & 0xf, isEdge);
			var m = (1 << v) - 1;
			val = (val & m) + (val >> 4 & ~m);
		}
		arr[n] = setVal(arr[n], val & 0xf, isEdge);
	}

	function getNPerm(arr, n, isEdge) {
		var idx = 0,
			val = 0x76543210;
		for (var i = 0; i < n - 1; ++i) {
			var v = getVal(arr[i], isEdge) << 2;
			idx = (n - i) * idx + (val >> v & 0xf);
			val -= 0x11111110 << v;
		}
		return idx;
	}

	function setNPermFull(arr, idx, n, isEdge) {
		arr[n - 1] = setVal(arr[n - 1], 0, isEdge);;
		for (var i = n - 2; i >= 0; --i) {
			arr[i] = setVal(arr[i], idx % (n - i), isEdge);
			idx = ~~(idx / (n - i));
			for (var j = i + 1; j < n; ++j) {
				if (getVal(arr[j], isEdge) >= getVal(arr[i], isEdge)) {
					arr[j] = setVal(arr[j], getVal(arr[j], isEdge) + 1, isEdge);
				}
			}
		}
	}

	function getNPermFull(arr, n, isEdge) {
		var idx = 0;
		for (var i = 0; i < n; ++i) {
			idx *= n - i;
			for (var j = i + 1; j < n; ++j) {
				if (getVal(arr[j], isEdge) < getVal(arr[i], isEdge)) {
					++idx;
				}
			}
		}
		return idx;
	}

	function getComb(arr, mask, isEdge) {
		var end = arr.length - 1;
		var idxC = 0,
			r = 4;
		for (var i = end; i >= 0; i--) {
			var perm = getVal(arr[i], isEdge);
			if ((perm & 0xc) == mask) {
				idxC += Cnk[i][r--];
			}
		}
		return idxC;
	}

	function setComb(arr, idxC, mask, isEdge) {
		var end = arr.length - 1;
		var r = 4,
			fill = end;
		for (var i = end; i >= 0; i--) {
			if (idxC >= Cnk[i][r]) {
				idxC -= Cnk[i][r--];
				arr[i] = setVal(arr[i], r | mask, isEdge);
			} else {
				if ((fill & 0xc) == mask) {
					fill -= 4;
				}
				arr[i] = setVal(arr[i], fill--, isEdge);
			}
		}
	}

	function getNParity(idx, n) {
		var p = 0;
		for (var i = n - 2; i >= 0; i--) {
			p ^= idx % (n - i);
			idx = ~~(idx / (n - i));
		}
		return p & 1;
	}
	CubieCube.EdgeMult = function(a, b, prod) {
		for (var ed = 0; ed < 12; ed++) {
			prod.ea[ed] = a.ea[b.ea[ed] >> 1] ^ (b.ea[ed] & 1);
		}
	}
	CubieCube.CornMult = function(a, b, prod) {
		for (var corn = 0; corn < 8; corn++) {
			var ori = ((a.ca[b.ca[corn] & 7] >> 3) + (b.ca[corn] >> 3)) % 3;
			prod.ca[corn] = a.ca[b.ca[corn] & 7] & 7 | ori << 3;
		}
	}
	CubieCube.CornMultFull = function(a, b, prod) {
		for (var corn = 0; corn < 8; corn++) {
			var oriA = a.ca[b.ca[corn] & 7] >> 3;
			var oriB = b.ca[corn] >> 3;
			var ori = oriA + ((oriA < 3) ? oriB : 6 - oriB);
			ori = ori % 3 + ((oriA < 3) == (oriB < 3) ? 0 : 3);
			prod.ca[corn] = a.ca[b.ca[corn] & 7] & 7 | ori << 3;
		}
	}
	CubieCube.CornConjugate = function(a, idx, b) {
		var sinv = SymCube[SymMultInv[0][idx]];
		var s = SymCube[idx];
		for (var corn = 0; corn < 8; corn++) {
			var oriA = sinv.ca[a.ca[s.ca[corn] & 7] & 7] >> 3;
			var oriB = a.ca[s.ca[corn] & 7] >> 3;
			var ori = (oriA < 3) ? oriB : (3 - oriB) % 3;
			b.ca[corn] = sinv.ca[a.ca[s.ca[corn] & 7] & 7] & 7 | ori << 3;
		}
	}
	CubieCube.EdgeConjugate = function(a, idx, b) {
		var sinv = SymCube[SymMultInv[0][idx]];
		var s = SymCube[idx];
		for (var ed = 0; ed < 12; ed++) {
			b.ea[ed] = sinv.ea[a.ea[s.ea[ed] >> 1] >> 1] ^ (a.ea[s.ea[ed] >> 1] & 1) ^ (s.ea[ed] & 1);
		}
	}
	CubieCube.prototype.init = function(ca, ea) {
		this.ca = ca.slice();
		this.ea = ea.slice();
		return this;
	}
	CubieCube.prototype.initCoord = function(cperm, twist, eperm, flip) {
		setNPerm(this.ca, cperm, 8, false);
		this.setTwist(twist);
		setNPermFull(this.ea, eperm, 12, true);
		this.setFlip(flip);
		return this;
	}
	CubieCube.prototype.isEqual = function(c) {
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
	}
	CubieCube.prototype.setFlip = function(idx) {
		var parity = 0,
			val;
		for (var i = 10; i >= 0; i--, idx >>= 1) {
			parity ^= (val = idx & 1);
			this.ea[i] = this.ea[i] & 0xfe | val;
		}
		this.ea[11] = this.ea[11] & 0xfe | parity;
	}
	CubieCube.prototype.getFlip = function() {
		var idx = 0;
		for (var i = 0; i < 11; i++) {
			idx = idx << 1 | this.ea[i] & 1;
		}
		return idx;
	}
	CubieCube.prototype.getFlipSym = function() {
		return FlipR2S[this.getFlip()];
	}
	CubieCube.prototype.setTwist = function(idx) {
		var twst = 15,
			val;
		for (var i = 6; i >= 0; i--, idx = ~~(idx / 3)) {
			twst -= (val = idx % 3);
			this.ca[i] = this.ca[i] & 0x7 | val << 3;
		}
		this.ca[7] = this.ca[7] & 0x7 | (twst % 3) << 3;
	}
	CubieCube.prototype.getTwist = function() {
		var idx = 0;
		for (var i = 0; i < 7; i++) {
			idx += (idx << 1) + (this.ca[i] >> 3);
		}
		return idx;
	}
	CubieCube.prototype.getTwistSym = function() {
		return TwistR2S[this.getTwist()];

	}
	CubieCube.prototype.setCPerm = function(idx) {
		setNPerm(this.ca, idx, 8, false);
	}
	CubieCube.prototype.getCPerm = function() {
		return getNPerm(this.ca, 8, false);
	}
	CubieCube.prototype.getCPermSym = function() {
		return ESym2CSym(EPermR2S[getNPerm(this.ca, 8, false)]);
	}
	CubieCube.prototype.setEPerm = function(idx) {
		setNPerm(this.ea, idx, 8, true);
	}
	CubieCube.prototype.getEPerm = function() {
		return getNPerm(this.ea, 8, true);
	}
	CubieCube.prototype.getEPermSym = function() {
		return EPermR2S[getNPerm(this.ea, 8, true)];
	}
	CubieCube.prototype.getUDSlice = function() {
		return 494 - getComb(this.ea, 8, true);
	}
	CubieCube.prototype.setUDSlice = function(idx) {
		setComb(this.ea, 494 - idx, 8, true);
	}
	CubieCube.prototype.getMPerm = function() {
		return getNPermFull(this.ea, 12, true) % 24;
	}
	CubieCube.prototype.setMPerm = function(idx) {
		setNPermFull(this.ea, idx, 12, true);
	}
	CubieCube.prototype.getCComb = function() {
		return getComb(this.ca, 0, false);
	}
	CubieCube.prototype.setCComb = function(idx) {
		setComb(this.ca, idx, 0, false);
	}
	CubieCube.prototype.URFConjugate = function() {
		var temps = new CubieCube();
		CubieCube.CornMult(CubieCube.urf2, this, temps);
		CubieCube.CornMult(temps, CubieCube.urf1, this);
		CubieCube.EdgeMult(CubieCube.urf2, this, temps);
		CubieCube.EdgeMult(temps, CubieCube.urf1, this);
	}
	var cornerFacelet = [
		[8, 9, 20],
		[6, 18, 38],
		[0, 36, 47],
		[2, 45, 11],
		[29, 26, 15],
		[27, 44, 24],
		[33, 53, 42],
		[35, 17, 51]
	];
	var edgeFacelet = [
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
	}

	function CoordCube() {
		this.twist = 0;
		this.tsym = 0;
		this.flip = 0;
		this.fsym = 0;
		this.slice = 0;
		this.prun = 0;
		this.twistc = 0;
		this.flipc = 0;
	}
	CoordCube.prototype.set = function(node) {
		this.twist = node.twist;
		this.tsym = node.tsym;
		this.flip = node.flip;
		this.fsym = node.fsym;
		this.slice = node.slice;
		this.prun = node.prun;
		if (USE_CONJ_PRUN) {
			this.twistc = node.twistc;
			this.flipc = node.flipc;
		}
	}
	CoordCube.prototype.calcPruning = function(isPhase1) {
		this.prun = Math.max(
			Math.max(
				getPruningMax(UDSliceTwistPrunMax, UDSliceTwistPrun,
					this.twist * N_SLICE + UDSliceConj[this.slice][this.tsym]),
				getPruningMax(UDSliceFlipPrunMax, UDSliceFlipPrun,
					this.flip * N_SLICE + UDSliceConj[this.slice][this.fsym])),
			Math.max(
				USE_CONJ_PRUN ? getPruningMax(TwistFlipPrunMax, TwistFlipPrun,
					(this.twistc >> 3) << 11 | FlipS2RF[this.flipc ^ (this.twistc & 7)]) : 0,
				USE_TWIST_FLIP_PRUN ? getPruningMax(TwistFlipPrunMax, TwistFlipPrun,
					this.twist << 11 | FlipS2RF[this.flip << 3 | (this.fsym ^ this.tsym)]) : 0));
	}
	CoordCube.prototype.setWithPrun = function(cc, depth) {
		this.twist = cc.getTwistSym();
		this.flip = cc.getFlipSym();
		this.tsym = this.twist & 7;
		this.twist = this.twist >> 3;
		this.prun = USE_TWIST_FLIP_PRUN ? getPruningMax(TwistFlipPrunMax, TwistFlipPrun,
			this.twist << 11 | FlipS2RF[this.flip ^ this.tsym]) : 0;
		if (this.prun > depth) {
			return false;
		}
		this.fsym = this.flip & 7;
		this.flip = this.flip >> 3;
		this.slice = cc.getUDSlice();
		this.prun = Math.max(this.prun, Math.max(
			getPruningMax(UDSliceTwistPrunMax, UDSliceTwistPrun,
				this.twist * N_SLICE + UDSliceConj[this.slice][this.tsym]),
			getPruningMax(UDSliceFlipPrunMax, UDSliceFlipPrun,
				this.flip * N_SLICE + UDSliceConj[this.slice][this.fsym])));
		if (this.prun > depth) {
			return false;
		}
		if (USE_CONJ_PRUN) {
			var pc = new CubieCube();
			CubieCube.CornConjugate(cc, 1, pc);
			CubieCube.EdgeConjugate(cc, 1, pc);
			this.twistc = pc.getTwistSym();
			this.flipc = pc.getFlipSym();
			this.prun = Math.max(this.prun,
				getPruningMax(TwistFlipPrunMax, TwistFlipPrun,
					(this.twistc >> 3) << 11 | FlipS2RF[this.flipc ^ (this.twistc & 7)]));
		}
		return this.prun <= depth;
	}
	CoordCube.prototype.doMovePrun = function(cc, m, isPhase1) {
		this.slice = UDSliceMove[cc.slice][m];
		this.flip = FlipMove[cc.flip][Sym8Move[m << 3 | cc.fsym]];
		this.fsym = (this.flip & 7) ^ cc.fsym;
		this.flip >>= 3;
		this.twist = TwistMove[cc.twist][Sym8Move[m << 3 | cc.tsym]];
		this.tsym = (this.twist & 7) ^ cc.tsym;
		this.twist >>= 3;
		this.prun = Math.max(
			Math.max(
				getPruningMax(UDSliceTwistPrunMax, UDSliceTwistPrun,
					this.twist * N_SLICE + UDSliceConj[this.slice][this.tsym]),
				getPruningMax(UDSliceFlipPrunMax, UDSliceFlipPrun,
					this.flip * N_SLICE + UDSliceConj[this.slice][this.fsym])),
			USE_TWIST_FLIP_PRUN ? getPruningMax(TwistFlipPrunMax, TwistFlipPrun,
				this.twist << 11 | FlipS2RF[this.flip << 3 | (this.fsym ^ this.tsym)]) : 0);
		return this.prun;
	}
	CoordCube.prototype.doMovePrunConj = function(cc, m) {
		m = SymMove[3][m];
		this.flipc = FlipMove[cc.flipc >> 3][Sym8Move[m << 3 | cc.flipc & 7]] ^ (cc.flipc & 7);
		this.twistc = TwistMove[cc.twistc >> 3][Sym8Move[m << 3 | cc.twistc & 7]] ^ (cc.twistc & 7);
		return getPruningMax(TwistFlipPrunMax, TwistFlipPrun,
			(this.twistc >> 3) << 11 | FlipS2RF[this.flipc ^ (this.twistc & 7)]);
	}
	Search.prototype.solution = function(facelets, maxDepth, probeMax, probeMin, verbose) {
		initPrunTables();
		var check = this.verify(facelets);
		if (check != 0) {
			return "Error " + Math.abs(check);
		}
		if (maxDepth === undefined) {
			maxDepth = 21;
		}
		if (probeMax === undefined) {
			probeMax = 1e9;
		}
		if (probeMin === undefined) {
			probeMin = 0;
		}
		if (verbose === undefined) {
			verbose = 0;
		}
		this.sol = maxDepth + 1;
		this.probe = 0;
		this.probeMax = probeMax;
		this.probeMin = Math.min(probeMin, probeMax);
		this.verbose = verbose;
		this.moveSol = null;
		this.isRec = false;
		this.initSearch();
		return this.search();
	}

	Search.prototype.initSearch = function() {
		this.conjMask = (TRY_INVERSE ? 0 : 0x38) | (TRY_THREE_AXES ? 0 : 0x36);
		this.maxPreMoves = this.conjMask > 7 ? 0 : MAX_PRE_MOVES;

		for (var i = 0; i < 6; i++) {
			this.urfCubieCube[i].init(this.cc.ca, this.cc.ea);
			this.urfCoordCube[i].setWithPrun(this.urfCubieCube[i], 20);
			this.cc.URFConjugate();
			if (i % 3 == 2) {
				var tmp = new CubieCube().invFrom(this.cc);
				this.cc.init(tmp.ca, tmp.ea);
			}
		}
	}

	Search.prototype.next = function(probeMax, probeMin, verbose) {
		this.probe = 0;
		this.probeMax = probeMax;
		this.probeMin = Math.min(probeMin, probeMax);
		this.moveSol = null;
		this.isRec = true;
		this.verbose = verbose;
		return search();
	}

	Search.prototype.verify = function(facelets) {
		if (this.cc.fromFacelet(facelets) == -1) {
			return -1;
		}
		var sum = 0;
		var edgeMask = 0;
		for (var e = 0; e < 12; e++) {
			edgeMask |= 1 << (this.cc.ea[e] >> 1);
			sum ^= this.cc.ea[e] & 1;
		}
		if (edgeMask != 0xfff) {
			return -2; // missing edges
		}
		if (sum != 0) {
			return -3;
		}
		var cornMask = 0;
		sum = 0;
		for (var c = 0; c < 8; c++) {
			cornMask |= 1 << (this.cc.ca[c] & 7);
			sum += this.cc.ca[c] >> 3;
		}
		if (cornMask != 0xff) {
			return -4; // missing corners
		}
		if (sum % 3 != 0) {
			return -5; // twisted corner
		}
		if ((getNParity(getNPermFull(this.cc.ea, 12, true), 12) ^ getNParity(this.cc.getCPerm(), 8)) != 0) {
			return -6; // parity error
		}
		return 0; // cube ok
	}

	Search.prototype.phase1PreMoves = function(maxl, lm, cc) {
		this.preMoveLen = this.maxPreMoves - maxl;
		if (this.isRec ? (this.depth1 == this.length1 - this.preMoveLen) :
			(this.preMoveLen == 0 || (0x36FB7 >> lm & 1) == 0)) {
			this.depth1 = this.length1 - this.preMoveLen;
			this.phase1Cubie[0].init(cc.ca, cc.ea) /* = cc*/ ;
			this.allowShorter = this.depth1 == MIN_P1LENGTH_PRE && this.preMoveLen != 0;

			if (this.nodeUD[this.depth1 + 1].setWithPrun(cc, this.depth1) &&
				this.phase1(this.nodeUD[this.depth1 + 1], this.depth1, -1) == 0) {
				return 0;
			}
		}

		if (maxl == 0 || this.preMoveLen + MIN_P1LENGTH_PRE >= this.length1) {
			return 1;
		}

		var skipMoves = 0;
		if (maxl == 1 || this.preMoveLen + 1 + MIN_P1LENGTH_PRE >= this.length1) { //last pre move
			skipMoves |= 0x36FB7; // 11 0110 1111 1011 0111
		}

		lm = ~~(lm / 3) * 3;
		for (var m = 0; m < 18; m++) {
			if (m == lm || m == lm - 9 || m == lm + 9) {
				m += 2;
				continue;
			}
			if (this.isRec && m != this.preMoves[this.maxPreMoves - maxl] || (skipMoves & 1 << m) != 0) {
				continue;
			}
			CubieCube.CornMult(moveCube[m], cc, this.preMoveCubes[maxl]);
			CubieCube.EdgeMult(moveCube[m], cc, this.preMoveCubes[maxl]);
			this.preMoves[this.maxPreMoves - maxl] = m;
			var ret = this.phase1PreMoves(maxl - 1, m, this.preMoveCubes[maxl]);
			if (ret == 0) {
				return 0;
			}
		}
		return 1;
	}

	Search.prototype.search = function() {
		for (this.length1 = this.isRec ? this.length1 : 0; this.length1 < this.sol; this.length1++) {
			for (this.urfIdx = this.isRec ? this.urfIdx : 0; this.urfIdx < 6; this.urfIdx++) {
				if ((this.conjMask & 1 << this.urfIdx) != 0) {
					continue;
				}
				if (this.phase1PreMoves(this.maxPreMoves, -30, this.urfCubieCube[this.urfIdx], 0) == 0) {
					return this.moveSol == null ? "Error 8" : this.moveSol;
				}
			}
		}
		return this.moveSol == null ? "Error 7" : this.moveSol;
	}

	Search.prototype.initPhase2Pre = function() {
		this.isRec = false;
		if (this.probe >= (this.moveSol == null ? this.probeMax : this.probeMin)) {
			return 0;
		}
		++this.probe;

		for (var i = this.valid1; i < this.depth1; i++) {
			CubieCube.CornMult(this.phase1Cubie[i], moveCube[this.move[i]], this.phase1Cubie[i + 1]);
			CubieCube.EdgeMult(this.phase1Cubie[i], moveCube[this.move[i]], this.phase1Cubie[i + 1]);
		}
		this.valid1 = this.depth1;

		var ret = this.initPhase2(this.phase1Cubie[this.depth1]);
		if (ret == 0 || this.preMoveLen == 0 || ret == 2) {
			return ret;
		}

		var m = ~~(this.preMoves[this.preMoveLen - 1] / 3) * 3 + 1;
		CubieCube.CornMult(moveCube[m], this.phase1Cubie[this.depth1], this.phase1Cubie[this.depth1 + 1]);
		CubieCube.EdgeMult(moveCube[m], this.phase1Cubie[this.depth1], this.phase1Cubie[this.depth1 + 1]);

		this.preMoves[this.preMoveLen - 1] += 2 - this.preMoves[this.preMoveLen - 1] % 3 * 2;
		ret = this.initPhase2(this.phase1Cubie[this.depth1 + 1]);
		this.preMoves[this.preMoveLen - 1] += 2 - this.preMoves[this.preMoveLen - 1] % 3 * 2;
		return ret;
	}
	Search.prototype.initPhase2 = function(phase2Cubie) {
		var p2corn = phase2Cubie.getCPermSym();
		var p2csym = p2corn & 0xf;
		p2corn >>= 4;
		var p2edge = phase2Cubie.getEPermSym();
		var p2esym = p2edge & 0xf;
		p2edge >>= 4;
		var p2mid = phase2Cubie.getMPerm();
		var prun = Math.max(
			getPruningMax(EPermCCombPPrunMax, EPermCCombPPrun,
				p2edge * N_COMB + CCombPConj[Perm2CombP[p2corn] & 0xff][SymMultInv[p2esym][p2csym]]),
			getPruningMax(MCPermPrunMax, MCPermPrun,
				p2corn * N_MPERM + MPermConj[p2mid][p2csym]));
		var maxDep2 = Math.min(MAX_DEPTH2, this.sol - this.length1);
		if (prun >= maxDep2) {
			return prun > maxDep2 ? 2 : 1;
		}
		var depth2;
		for (depth2 = maxDep2 - 1; depth2 >= prun; depth2--) {
			var ret = this.phase2(p2edge, p2esym, p2corn, p2csym, p2mid, depth2, this.depth1, 10);
			if (ret < 0) {
				break;
			}
			depth2 -= ret;
			this.moveSol = [];
			for (var i = 0; i < this.depth1 + depth2; i++) {
				this.appendSolMove(this.move[i]);
			}
			for (var i = this.preMoveLen - 1; i >= 0; i--) {
				this.appendSolMove(this.preMoves[i]);
			}
			this.sol = this.moveSol.length;
			this.moveSol = this.solutionToString();
		}
		if (depth2 != maxDep2 - 1) { //At least one solution has been found.
			return this.probe >= this.probeMin ? 0 : 1;
		} else {
			return 1;
		}
	}
	Search.prototype.phase1 = function(node, maxl, lm) {
		if (node.prun == 0 && maxl < 5) {
			if (this.allowShorter || maxl == 0) {
				this.depth1 -= maxl;
				var ret = this.initPhase2Pre();
				this.depth1 += maxl;
				return ret;
			} else {
				return 1;
			}
		}
		for (var axis = 0; axis < 18; axis += 3) {
			if (axis == lm || axis == lm - 9) {
				continue;
			}
			for (var power = 0; power < 3; power++) {
				var m = axis + power;

				if (this.isRec && m != this.move[this.depth1 - maxl]) {
					continue;
				}

				var prun = this.nodeUD[maxl].doMovePrun(node, m, true);
				if (prun > maxl) {
					break;
				} else if (prun == maxl) {
					continue;
				}

				if (USE_CONJ_PRUN) {
					prun = this.nodeUD[maxl].doMovePrunConj(node, m);
					if (prun > maxl) {
						break;
					} else if (prun == maxl) {
						continue;
					}
				}
				this.move[this.depth1 - maxl] = m;
				this.valid1 = Math.min(this.valid1, this.depth1 - maxl);
				var ret = this.phase1(this.nodeUD[maxl], maxl - 1, axis);
				if (ret == 0) {
					return 0;
				} else if (ret == 2) {
					break;
				}
			}
		}
		return 1;
	}
	Search.prototype.appendSolMove = function(curMove) {
		if (this.moveSol.length == 0) {
			this.moveSol.push(curMove);
			return;
		}
		var axisCur = ~~(curMove / 3);
		var axisLast = ~~(this.moveSol[this.moveSol.length - 1] / 3);
		if (axisCur == axisLast) {
			var pow = (curMove % 3 + this.moveSol[this.moveSol.length - 1] % 3 + 1) % 4;
			if (pow == 3) {
				this.moveSol.pop();
			} else {
				this.moveSol[this.moveSol.length - 1] = axisCur * 3 + pow;
			}
			return;
		}
		if (this.moveSol.length > 1 &&
			axisCur % 3 == axisLast % 3 &&
			axisCur == ~~(this.moveSol[this.moveSol.length - 2] / 3)) {
			var pow = (curMove % 3 + this.moveSol[this.moveSol.length - 2] % 3 + 1) % 4;
			if (pow == 3) {
				this.moveSol[this.moveSol.length - 2] = this.moveSol[this.moveSol.length - 1];
				this.moveSol.pop();
			} else {
				this.moveSol[this.moveSol.length - 2] = axisCur * 3 + pow;
			}
			return;
		}
		this.moveSol.push(curMove);
	}
	Search.prototype.phase2 = function(edge, esym, corn, csym, mid, maxl, depth, lm) {
		if (edge == 0 && corn == 0 && mid == 0) {
			return maxl;
		}
		var moveMask = ckmv2bit[lm];
		for (var m = 0; m < 10; m++) {
			if ((moveMask >> m & 1) != 0) {
				m += 0x42 >> m & 3;
				continue;
			}
			var midx = MPermMove[mid][m];
			var cornx = CPermMove[corn][SymMoveUD[csym][m]];
			var csymx = SymMult[cornx & 0xf][csym];
			cornx >>= 4;
			if (getPruningMax(MCPermPrunMax, MCPermPrun,
					cornx * N_MPERM + MPermConj[midx][csymx]) >= maxl) {
				continue;
			}
			var edgex = EPermMove[edge][SymMoveUD[esym][m]];
			var esymx = SymMult[edgex & 0xf][esym];
			edgex >>= 4;
			if (getPruningMax(EPermCCombPPrunMax, EPermCCombPPrun,
					edgex * N_COMB + CCombPConj[Perm2CombP[cornx] & 0xff][SymMultInv[esymx][csymx]]) >= maxl) {
				continue;
			}
			var edgei = getPermSymInv(edgex, esymx, false);
			var corni = getPermSymInv(cornx, csymx, true);
			if (getPruningMax(EPermCCombPPrunMax, EPermCCombPPrun,
					(edgei >> 4) * N_COMB + CCombPConj[Perm2CombP[corni >> 4] & 0xff][SymMultInv[edgei & 0xf][corni & 0xf]]) >= maxl) {
				continue;
			}

			var ret = this.phase2(edgex, esymx, cornx, csymx, midx, maxl - 1, depth + 1, m);
			if (ret >= 0) {
				this.move[depth] = ud2std[m];
				return ret;
			}
		}
		return -1;
	}
	Search.prototype.solutionToString = function() {
		var sb = '';
		var urf = (this.verbose & INVERSE_SOLUTION) != 0 ? (this.urfIdx + 3) % 6 : this.urfIdx;
		if (urf < 3) {
			for (var s = 0; s < this.moveSol.length; ++s) {
				sb += move2str[urfMove[urf][this.moveSol[s]]] + ' ';
			}
		} else {
			for (var s = this.moveSol.length - 1; s >= 0; --s) {
				sb += move2str[urfMove[urf][this.moveSol[s]]] + ' ';
			}
		}
		return sb;
	}

	var moveCube = [];
	var SymCube = [];
	var SymMult = [];
	var SymMultInv = [];
	var SymMove = [];
	var SymMoveUD = [];
	var Sym8Move = [];
	var FlipS2R = [];
	var FlipR2S = [];
	var TwistS2R = [];
	var TwistR2S = [];
	var EPermS2R = [];
	var EPermR2S = [];
	var SymStateFlip = [];
	var SymStateTwist = [];
	var SymStatePerm = [];
	var FlipS2RF = [];
	var Perm2CombP = [];
	var PermInvEdgeSym = [];
	var UDSliceMove = [];
	var TwistMove = [];
	var FlipMove = [];
	var UDSliceConj = [];
	var UDSliceTwistPrun = [];
	var UDSliceFlipPrun = [];
	var TwistFlipPrun = [];

	//phase2
	var CPermMove = [];
	var EPermMove = [];
	var MPermMove = [];
	var MPermConj = [];
	var CCombPMove = []; // = new char[N_COMB][N_MOVES2];
	var CCombPConj = [];
	var MCPermPrun = [];
	var EPermCCombPPrun = [];

	var TwistFlipPrunMax = 15;
	var UDSliceTwistPrunMax = 15;
	var UDSliceFlipPrunMax = 15;
	var MCPermPrunMax = 15;
	var EPermCCombPPrunMax = 15;

	{ //init move cubes
		for (var i = 0; i < 18; i++) {
			moveCube[i] = new CubieCube()
		}
		moveCube[0].initCoord(15120, 0, 119750400, 0);
		moveCube[3].initCoord(21021, 1494, 323403417, 0);
		moveCube[6].initCoord(8064, 1236, 29441808, 550);
		moveCube[9].initCoord(9, 0, 5880, 0);
		moveCube[12].initCoord(1230, 412, 2949660, 0);
		moveCube[15].initCoord(224, 137, 328552, 137);
		for (var a = 0; a < 18; a += 3) {
			for (var p = 0; p < 2; p++) {
				CubieCube.EdgeMult(moveCube[a + p], moveCube[a], moveCube[a + p + 1]);
				CubieCube.CornMult(moveCube[a + p], moveCube[a], moveCube[a + p + 1]);
			}
		}
		CubieCube.urf1 = new CubieCube().initCoord(2531, 1373, 67026819, 1367);
		CubieCube.urf2 = new CubieCube().initCoord(2089, 1906, 322752913, 2040);
	}

	function initBasic() {
		{ //init sym cubes
			var c = new CubieCube();
			var d = new CubieCube();
			var t;

			var f2 = new CubieCube().initCoord(28783, 0, 259268407, 0);
			var u4 = new CubieCube().initCoord(15138, 0, 119765538, 7);
			var lr2 = new CubieCube().initCoord(5167, 0, 83473207, 0);
			for (var i = 0; i < 8; i++) {
				lr2.ca[i] |= 3 << 3;
			}
			for (var i = 0; i < 16; i++) {
				SymCube[i] = new CubieCube().init(c.ca, c.ea);
				CubieCube.CornMultFull(c, u4, d);
				CubieCube.EdgeMult(c, u4, d);
				c.init(d.ca, d.ea);
				if (i % 4 == 3) {
					CubieCube.CornMultFull(c, lr2, d);
					CubieCube.EdgeMult(c, lr2, d);
					c.init(d.ca, d.ea);
				}
				if (i % 8 == 7) {
					CubieCube.CornMultFull(c, f2, d);
					CubieCube.EdgeMult(c, f2, d);
					c.init(d.ca, d.ea);
				}
			}
		} { // gen sym tables


			for (var i = 0; i < 16; i++) {
				SymMult[i] = [];
				SymMultInv[i] = [];
				SymMove[i] = [];
				Sym8Move[i] = [];
				SymMoveUD[i] = [];
			}
			for (var i = 0; i < 16; i++) {
				for (var j = 0; j < 16; j++) {
					SymMult[i][j] = i ^ j ^ (0x14ab4 >> j & i << 1 & 2); // SymMult[i][j] = (i ^ j ^ (0x14ab4 >> j & i << 1 & 2)));
					SymMultInv[SymMult[i][j]][j] = i;
				}
			}

			var c = new CubieCube();
			for (var s = 0; s < 16; s++) {
				for (var j = 0; j < 18; j++) {
					CubieCube.CornConjugate(moveCube[j], SymMultInv[0][s], c);
					outloop: for (var m = 0; m < 18; m++) {
						for (var t = 0; t < 8; t++) {
							if (moveCube[m].ca[t] != c.ca[t]) {
								continue outloop;
							}
						}
						SymMove[s][j] = m;
						SymMoveUD[s][std2ud[j]] = std2ud[m];
						break;
					}
					if (s % 2 == 0) {
						Sym8Move[j << 3 | s >> 1] = SymMove[s][j];
					}
				}
			}
		} { // init sym 2 raw tables
			function initSym2Raw(N_RAW, Sym2Raw, Raw2Sym, SymState, coord, setFunc, getFunc) {
				var N_RAW_HALF = (N_RAW + 1) >> 1;
				var c = new CubieCube();
				var d = new CubieCube();
				var count = 0;
				var sym_inc = coord >= 2 ? 1 : 2;
				var conjFunc = coord != 1 ? CubieCube.EdgeConjugate : CubieCube.CornConjugate;

				for (var i = 0; i < N_RAW; i++) {
					if (Raw2Sym[i] !== undefined) {
						continue;
					}
					setFunc.call(c, i);
					for (var s = 0; s < 16; s += sym_inc) {
						conjFunc(c, s, d);
						var idx = getFunc.call(d);
						if (USE_TWIST_FLIP_PRUN && coord == 0) {
							FlipS2RF[count << 3 | s >> 1] = idx;
						}
						if (idx == i) {
							SymState[count] |= 1 << (s / sym_inc);
						}
						Raw2Sym[idx] = (count << 4 | s) / sym_inc;
					}
					Sym2Raw[count++] = i;
				}
				return count;
			}

			initSym2Raw(N_FLIP, FlipS2R, FlipR2S, SymStateFlip, 0, CubieCube.prototype.setFlip, CubieCube.prototype.getFlip);
			initSym2Raw(N_TWIST, TwistS2R, TwistR2S, SymStateTwist, 1, CubieCube.prototype.setTwist, CubieCube.prototype.getTwist);
			initSym2Raw(N_PERM, EPermS2R, EPermR2S, SymStatePerm, 2, CubieCube.prototype.setEPerm, CubieCube.prototype.getEPerm);
			var cc = new CubieCube();
			for (var i = 0; i < N_PERM_SYM; i++) {
				setNPerm(cc.ea, EPermS2R[i], 8, true);
				Perm2CombP[i] = getComb(cc.ea, 0, true) + (USE_COMBP_PRUN ? getNParity(EPermS2R[i], 8) * 70 : 0);
				c.invFrom(cc);
				PermInvEdgeSym[i] = EPermR2S[c.getEPerm()];
			}
		} { // init coord tables

			var c = new CubieCube();
			var d = new CubieCube();

			function initSymMoveTable(moveTable, SymS2R, N_SIZE, N_MOVES, setFunc, getFunc, multFunc, ud2std) {
				for (var i = 0; i < N_SIZE; i++) {
					moveTable[i] = [];
					setFunc.call(c, SymS2R[i]);
					for (var j = 0; j < N_MOVES; j++) {
						multFunc(c, moveCube[ud2std ? ud2std[j] : j], d);
						moveTable[i][j] = getFunc.call(d);
					}
				}
			}

			initSymMoveTable(FlipMove, FlipS2R, N_FLIP_SYM, N_MOVES,
				CubieCube.prototype.setFlip, CubieCube.prototype.getFlipSym, CubieCube.EdgeMult);
			initSymMoveTable(TwistMove, TwistS2R, N_TWIST_SYM, N_MOVES,
				CubieCube.prototype.setTwist, CubieCube.prototype.getTwistSym, CubieCube.CornMult);
			initSymMoveTable(EPermMove, EPermS2R, N_PERM_SYM, N_MOVES2,
				CubieCube.prototype.setEPerm, CubieCube.prototype.getEPermSym, CubieCube.EdgeMult, ud2std);
			initSymMoveTable(CPermMove, EPermS2R, N_PERM_SYM, N_MOVES2,
				CubieCube.prototype.setCPerm, CubieCube.prototype.getCPermSym, CubieCube.CornMult, ud2std);

			for (var i = 0; i < N_SLICE; i++) {
				UDSliceMove[i] = [];
				UDSliceConj[i] = [];
				c.setUDSlice(i);
				for (var j = 0; j < N_MOVES; j++) {
					CubieCube.EdgeMult(c, moveCube[j], d);
					UDSliceMove[i][j] = d.getUDSlice();
				}
				for (var j = 0; j < 16; j += 2) {
					CubieCube.EdgeConjugate(c, SymMultInv[0][j], d);
					UDSliceConj[i][j >> 1] = d.getUDSlice();
				}
			}

			for (var i = 0; i < N_MPERM; i++) {
				MPermMove[i] = [];
				MPermConj[i] = [];
				c.setMPerm(i);
				for (var j = 0; j < N_MOVES2; j++) {
					CubieCube.EdgeMult(c, moveCube[ud2std[j]], d);
					MPermMove[i][j] = d.getMPerm();
				}
				for (var j = 0; j < 16; j++) {
					CubieCube.EdgeConjugate(c, SymMultInv[0][j], d);
					MPermConj[i][j] = d.getMPerm();
				}
			}

			for (var i = 0; i < N_COMB; i++) {
				CCombPMove[i] = [];
				CCombPConj[i] = [];
				c.setCComb(i % 70);
				for (var j = 0; j < N_MOVES2; j++) {
					CubieCube.CornMult(c, moveCube[ud2std[j]], d);
					CCombPMove[i][j] = d.getCComb() + 70 * ((P2_PARITY_MOVE >> j & 1) ^ ~~(i / 70));
				}
				for (var j = 0; j < 16; j++) {
					CubieCube.CornConjugate(c, SymMultInv[0][j], d);
					CCombPConj[i][j] = d.getCComb() + 70 * ~~(i / 70);
				}
			}
		}
	}

	//init pruning tables
	var InitPrunProgress = -1;

	function initRawSymPrun(PrunTable, N_RAW, N_SYM, RawMove, RawConj, SymMove, SymState, PrunFlag) {
		var SYM_SHIFT = PrunFlag & 0xf;
		var SYM_E2C_MAGIC = ((PrunFlag >> 4) & 1) == 1 ? 0x00DDDD00 : 0x00000000;
		var IS_PHASE2 = ((PrunFlag >> 5) & 1) == 1;
		var INV_DEPTH = PrunFlag >> 8 & 0xf;
		var MAX_DEPTH = PrunFlag >> 12 & 0xf;
		var MIN_DEPTH = PrunFlag >> 16 & 0xf;

		var SYM_MASK = (1 << SYM_SHIFT) - 1;
		var ISTFP = RawMove == null;
		var N_SIZE = N_RAW * N_SYM;
		var N_MOVES = IS_PHASE2 ? 10 : 18;
		var NEXT_AXIS_MAGIC = N_MOVES == 10 ? 0x42 : 0x92492;

		var depth = getPruning(PrunTable, N_SIZE) - 1;

		if (depth == -1) {
			for (var i = 0; i < (N_SIZE >> 3) + 1; i++) {
				PrunTable[i] = 0xffffffff;
			}
			setPruning(PrunTable, 0, 0 ^ 0xf);
			depth = 0;
		} else {
			setPruning(PrunTable, N_SIZE, 0xf ^ (depth + 1));
		}

		var SEARCH_DEPTH = PARTIAL_INIT_LEVEL > 0 ?
			Math.min(Math.max(depth + 1, MIN_DEPTH), MAX_DEPTH) : MAX_DEPTH;

		while (depth < SEARCH_DEPTH) {
			var inv = depth > INV_DEPTH;
			var select = inv ? 0xf : depth;
			var selArrMask = select * 0x11111111;
			var check = inv ? depth : 0xf;
			depth++;
			InitPrunProgress++;
			var xorVal = depth ^ 0xf;
			var done = 0;
			var val = 0;
			for (var i = 0; i < N_SIZE; i++, val >>= 4) {
				if ((i & 7) == 0) {
					val = PrunTable[i >> 3];
					if (!hasZero(val ^ selArrMask)) {
						i += 7;
						continue;
					}
				}
				if ((val & 0xf) != select) {
					continue;
				}
				var raw = i % N_RAW;
				var sym = ~~(i / N_RAW);
				var flip = 0,
					fsym = 0;
				if (ISTFP) {
					flip = FlipR2S[raw];
					fsym = flip & 7;
					flip >>= 3;
				}

				for (var m = 0; m < N_MOVES; m++) {
					var symx = SymMove[sym][m];
					var rawx;
					if (ISTFP) {
						rawx = FlipS2RF[
							FlipMove[flip][Sym8Move[m << 3 | fsym]] ^
							fsym ^ (symx & SYM_MASK)];
					} else {
						rawx = RawConj[RawMove[raw][m]][symx & SYM_MASK];
					}
					symx >>= SYM_SHIFT;
					var idx = symx * N_RAW + rawx;
					var prun = getPruning(PrunTable, idx);
					if (prun != check) {
						if (prun < depth - 1) {
							m += NEXT_AXIS_MAGIC >> m & 3;
						}
						continue;
					}
					done++;
					if (inv) {
						setPruning(PrunTable, i, xorVal);
						break;
					}
					setPruning(PrunTable, idx, xorVal);
					for (var j = 1, symState = SymState[symx];
						(symState >>= 1) != 0; j++) {
						if ((symState & 1) != 1) {
							continue;
						}
						var idxx = symx * N_RAW;
						if (ISTFP) {
							idxx += FlipS2RF[FlipR2S[rawx] ^ j];
						} else {
							idxx += RawConj[rawx][j ^ (SYM_E2C_MAGIC >> (j << 1) & 3)];
						}
						if (getPruning(PrunTable, idxx) == check) {
							setPruning(PrunTable, idxx, xorVal);
							done++;
						}
					}
				}
			}
			// console.log(depth, done, InitPrunProgress);
		}
		setPruning(PrunTable, N_SIZE, (depth + 1) ^ 0xf);
		return depth + 1;
	}

	function doInitPrunTables(targetProgress) {
		if (USE_TWIST_FLIP_PRUN) {
			TwistFlipPrunMax = initRawSymPrun(
				TwistFlipPrun, 2048, 324,
				null, null,
				TwistMove, SymStateTwist, 0x19603
			);
		}
		if (InitPrunProgress > targetProgress) {
			return;
		}
		UDSliceTwistPrunMax = initRawSymPrun(
			UDSliceTwistPrun, 495, 324,
			UDSliceMove, UDSliceConj,
			TwistMove, SymStateTwist, 0x69603
		);
		if (InitPrunProgress > targetProgress) {
			return;
		}
		UDSliceFlipPrunMax = initRawSymPrun(
			UDSliceFlipPrun, 495, 336,
			UDSliceMove, UDSliceConj,
			FlipMove, SymStateFlip, 0x69603
		);
		if (InitPrunProgress > targetProgress) {
			return;
		}
		MCPermPrunMax = initRawSymPrun(
			MCPermPrun, 24, 2768,
			MPermMove, MPermConj,
			CPermMove, SymStatePerm, 0x8ea34
		);
		if (InitPrunProgress > targetProgress) {
			return;
		}
		EPermCCombPPrunMax = initRawSymPrun(
			EPermCCombPPrun, N_COMB, 2768,
			CCombPMove, CCombPConj,
			EPermMove, SymStatePerm, 0x7d824
		);
	}

	function initPrunTables() {
		if (InitPrunProgress < 0) {
			initBasic();
			InitPrunProgress = 0;
		}
		if (InitPrunProgress == 0) {
			doInitPrunTables(99);
		} else if (InitPrunProgress < 54) {
			doInitPrunTables(InitPrunProgress);
		} else {
			return true;
		}
		return false;
	}

	function randomCube() {
		var ep, cp;
		var eo = ~~(Math.random() * 2048);
		var co = ~~(Math.random() * 2187);
		do {
			ep = ~~(Math.random() * fact[12]);
			cp = ~~(Math.random() * fact[8]);
		} while (getNParity(cp, 8) != getNParity(ep, 12));
		var cc = new CubieCube().initCoord(cp, co, ep, eo);
		return cc.toFaceCube();
	}
	return {
		Search: Search,
		solve: function(facelet) {
			return new Search().solution(facelet);
		},
		randomCube: randomCube,
		initFull: function() {
			PARTIAL_INIT_LEVEL = 0;
			initPrunTables();
		}
	}
})();

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	module.exports = min2phase;
}