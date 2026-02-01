"use strict";

var mgmsolver = (function() {

	function MgmCubie() {
		this.corn = [];
		this.twst = [];
		this.edge = [];
		this.flip = [];
		for (var i = 0; i < 20; i++) {
			this.corn[i] = i;
			this.twst[i] = 0;
		}
		for (var i = 0; i < 30; i++) {
			this.edge[i] = i;
			this.flip[i] = 0;
		}
	}

	MgmCubie.SOLVED = new MgmCubie();

	var U = 0, R = 10, F = 20, L = 30, BL = 40, BR = 50, DR = 60, DL = 70, DBL = 80, B = 90, DBR = 100, D = 110;
	var cornFacelet = [
		[U + 2, R + 3, F + 4], // 0
		[U + 3, F + 3, L + 4], // 1
		[U + 4, L + 3, BL + 4], // 2
		[U + 0, BL + 3, BR + 4], // 3
		[U + 1, BR + 3, R + 4], // 4
		[D + 3, B + 0, DBL + 1], // 5
		[D + 2, DBR + 0, B + 1], // 6
		[D + 1, DR + 0, DBR + 1], // 7
		[D + 0, DL + 0, DR + 1], // 8
		[D + 4, DBL + 0, DL + 1], // 9
		[DR + 3, F + 0, R + 2], // [F + 0, R + 2, DR + 3], // 10
		[L + 0, F + 2, DL + 3], // 11
		[BL + 0, L + 2, DBL + 3], // 12
		[BR + 0, BL + 2, B + 3], // 13
		[R + 0, BR + 2, DBR + 3], // 14
		[B + 4, BL + 1, DBL + 2], // 15
		[DBR + 4, BR + 1, B + 2], // 16
		[DR + 4, R + 1, DBR + 2], // 17
		[DL + 4, F + 1, DR + 2], // 18
		[DBL + 4, L + 1, DL + 2] // 19
	];
	var edgeFacelet = [ // edge orientation s.t. all EOs in <U, R> are 0
		[U + 6, R + 8], // 0
		[U + 7, F + 8], // 1
		[U + 8, L + 8], // 2
		[U + 9, BL + 8], // 3
		[U + 5, BR + 8], // 4
		[D + 8, DBL + 5], // 5
		[D + 7, B + 5], // 6
		[D + 6, DBR + 5], // 7
		[D + 5, DR + 5], // 8
		[D + 9, DL + 5], // 9
		[F + 9, R + 7], // 10
		[F + 5, DR + 7], // 11
		[L + 9, F + 7], // 12
		[L + 5, DL + 7], // 13
		[BL + 9, L + 7], // 14
		[BL + 5, DBL + 7], // 15
		[BR + 9, BL + 7], // 16
		[BR + 5, B + 7], // 17
		[BR + 7, R + 9], // [R + 9, BR + 7], // 18
		[DBR + 7, R + 5], // [R + 5, DBR + 7], // 19
		[B + 9, DBL + 6], // 20
		[B + 8, BL + 6], // 21
		[DBR + 9, B + 6], // 22
		[DBR + 8, BR + 6], // 23
		[DR + 9, DBR + 6], // 24
		[DR + 8, R + 6], // 25
		[DL + 9, DR + 6], // 26
		[DL + 8, F + 6], // 27
		[DBL + 9, DL + 6], // 28
		[DBL + 8, L + 6] // 29
	];

	MgmCubie.prototype.toFaceCube = function(cFacelet, eFacelet) {
		cFacelet = cFacelet || cornFacelet;
		eFacelet = eFacelet || edgeFacelet;
		var f = [];
		mathlib.fillFacelet(cFacelet, f, this.corn, this.twst, 10);
		mathlib.fillFacelet(eFacelet, f, this.edge, this.flip, 10);
		return f;
	}

	MgmCubie.prototype.fromFacelet = function(facelet, cFacelet, eFacelet) {
		cFacelet = cFacelet || cornFacelet;
		eFacelet = eFacelet || edgeFacelet;
		var count = 0;
		var f = [];
		for (var i = 0; i < 120; ++i) {
			f[i] = facelet[i];
			count += Math.pow(16, f[i]);
		}
		if (count != 0xaaaaaaaaaaaa) {
			return -1;
		}
		if (mathlib.detectFacelet(cFacelet, f, this.corn, this.twst, 10) == -1
				|| mathlib.detectFacelet(eFacelet, f, this.edge, this.flip, 10) == -1) {
			return -1;
		}
		return this;
	}

	MgmCubie.prototype.hashCode = function() {
		var ret = 0;
		for (var i = 0; i < 20; i++) {
			ret = 0 | (ret * 31 + this.corn[i] * 3 + this.twst[i]);
			ret = 0 | (ret * 31 + this.edge[i] * 2 + this.flip[i]);
		}
		return ret;
	}

	MgmCubie.MgmMult = function(a, b, prod) {
		for (var i = 0; i < 20; i++) {
			prod.corn[i] = a.corn[b.corn[i]];
			prod.twst[i] = (a.twst[b.corn[i]] + b.twst[i]) % 3;
		}
		for (var i = 0; i < 30; i++) {
			prod.edge[i] = a.edge[b.edge[i]];
			prod.flip[i] = a.flip[b.edge[i]] ^ b.flip[i];
		}
	};

	MgmCubie.MgmMult3 = function(a, b, c, prod) {
		for (var i = 0; i < 20; i++) {
			prod.corn[i] = a.corn[b.corn[c.corn[i]]];
			prod.twst[i] = (a.twst[b.corn[c.corn[i]]] + b.twst[c.corn[i]] + c.twst[i]) % 3;
		}
		for (var i = 0; i < 30; i++) {
			prod.edge[i] = a.edge[b.edge[c.edge[i]]];
			prod.flip[i] = a.flip[b.edge[c.edge[i]]] ^ b.flip[c.edge[i]] ^ c.flip[i];
		}
	};

	MgmCubie.prototype.invFrom = function(cc) {
		for (var i = 0; i < 20; i++) {
			this.corn[cc.corn[i]] = i;
			this.twst[cc.corn[i]] = (3 - cc.twst[i]) % 3;
		}
		for (var i = 0; i < 30; i++) {
			this.edge[cc.edge[i]] = i;
			this.flip[cc.edge[i]] = cc.flip[i];
		}
		return this;
	}

	MgmCubie.prototype.copy = function(cc) {
		this.corn = cc.corn.slice();
		this.twst = cc.twst.slice();
		this.edge = cc.edge.slice();
		this.flip = cc.flip.slice();
		return this;
	};

	MgmCubie.prototype.isEqual = function(c) {
		for (var i = 0; i < 20; i++) {
			if (this.corn[i] != c.corn[i] || this.twst[i] != c.twst[i]) {
				return false;
			}
		}
		for (var i = 0; i < 30; i++) {
			if (this.edge[i] != c.edge[i] || this.flip[i] != c.flip[i]) {
				return false;
			}
		}
		return true;
	};

	function getComb(perm, ori, n, r, base) {
		var thres = r;
		var idxComb = 0;
		var idxOri = 0;
		var permR = [];
		for (var i = n - 1; i >= 0; i--) {
			if (perm[i] < thres) {
				idxComb += mathlib.Cnk[i][r--];
				idxOri = idxOri * base + ori[i];
				permR[r] = perm[i];
			}
		}
		return [idxComb, mathlib.getNPerm(permR, thres), idxOri];
	}

	function setComb(perm, ori, idx, n, r) {
		var fill = n - 1;
		for (var i = n - 1; i >= 0; i--) {
			if (idx >= mathlib.Cnk[i][r]) {
				idx -= mathlib.Cnk[i][r--];
				perm[i] = r;
			} else {
				perm[i] = fill--;
			}
			ori[i] = 0;
		}
	}

	function doCombMove4(moveTable, N_PERM, N_ORI, TT_OFFSET, idx, move) {
		var slice = ~~(idx / N_ORI / N_PERM);
		var perm = ~~(idx / N_ORI) % N_PERM;
		var twst = idx % N_ORI;
		var val = moveTable[move][slice];
		slice = val[0];
		perm = perm4Mult[perm][val[1]];
		twst = (N_ORI & 1) // is corner coord?
			? perm4TT[perm4MulT[val[1]][twst * TT_OFFSET] / TT_OFFSET][val[2]]
			: (perm4MulF[val[1]][twst * TT_OFFSET] / TT_OFFSET ^ val[2]);
		return (slice * N_PERM + perm) * N_ORI + twst;
	}

	MgmCubie.prototype.setCComb = function(idx, r) {
		setComb(this.corn, this.twst, idx, 20, r || 4);
	}

	MgmCubie.prototype.getCComb = function(r) {
		return getComb(this.corn, this.twst, 20, r || 4, 3);
	}

	MgmCubie.prototype.setEComb = function(idx, r) {
		setComb(this.edge, this.flip, idx, 30, r || 4);
	}

	MgmCubie.prototype.getEComb = function(r) {
		return getComb(this.edge, this.flip, 30, r || 4, 2);
	}

	MgmCubie.prototype.faceletMove = function(face, pow, wide) {
		var facelet = this.toFaceCube();
		var state = [];
		for (var i = 0; i < 12; i++) {
			for (var j = 0; j < 10; j++) {
				state[i * 11 + j] = facelet[i * 10 + j];
			}
			state[i * 11 + 10] = 0;
		}
		mathlib.minx.doMove(state, face, pow, wide);
		for (var i = 0; i < 12; i++) {
			for (var j = 0; j < 10; j++) {
				facelet[i * 10 + j] = state[i * 11 + j];
			}
		}
		this.fromFacelet(facelet);
	}

	function createMoveCube() {
		//init move
		var moveCube = [];
		var moveHash = [];
		for (var i = 0; i < 12 * 4; i++) {
			moveCube[i] = new MgmCubie();
		}
		for (var a = 0; a < 48; a += 4) {
			moveCube[a].faceletMove(a >> 2, 1, 0);
			moveHash[a] = moveCube[a].hashCode();
			for (var p = 0; p < 3; p++) {
				MgmCubie.MgmMult(moveCube[a + p], moveCube[a], moveCube[a + p + 1]);
				moveHash[a + p + 1] = moveCube[a + p + 1].hashCode();
			}
		}
		MgmCubie.moveCube = moveCube;

		//init sym
		var symCube = [];
		var symMult = [];
		var symMulI = [];
		var symMulM = [];
		var symHash = [];
		var tmp = new MgmCubie();
		for (var s = 0; s < 60; s++) {
			symCube[s] = new MgmCubie().copy(tmp);
			symHash[s] = symCube[s].hashCode();
			symMult[s] = [];
			symMulI[s] = [];
			tmp.faceletMove(0, 1, 1); // [U]
			if (s % 5 == 4) { // [F] or [R]
				tmp.faceletMove(s % 10 == 4 ? 1 : 2, 1, 1);
			}
			if (s % 30 == 29) {
				tmp.faceletMove(1, 2, 1);
				tmp.faceletMove(2, 1, 1);
				tmp.faceletMove(0, 3, 1);
			}
		}
		for (var i = 0; i < 60; i++) {
			for (var j = 0; j < 60; j++) {
				MgmCubie.MgmMult(symCube[i], symCube[j], tmp);
				var k = symHash.indexOf(tmp.hashCode());
				symMult[i][j] = k;
				symMulI[k][j] = i;
			}
		}
		for (var s = 0; s < 60; s++) {
			symMulM[s] = [];
			for (var j = 0; j < 12; j++) {
				MgmCubie.MgmMult3(symCube[symMulI[0][s]], moveCube[j * 4], symCube[s], tmp);
				var k = moveHash.indexOf(tmp.hashCode());
				symMulM[s][j] = k >> 2;
			}
		}
		MgmCubie.symCube = symCube;
		MgmCubie.symMult = symMult;
		MgmCubie.symMulI = symMulI;
		MgmCubie.symMulM = symMulM;
	}

	function CCombCoord(cubieMap) {
		this.map = new MgmCubie();
		this.imap = new MgmCubie();
		this.map.corn = cubieMap.slice();
		for (var i = 0; i < 20; i++) {
			if (cubieMap.indexOf(i) == -1) {
				this.map.corn.push(i);
			}
		}
		this.imap.invFrom(this.map);
		this.tmp = new MgmCubie();
	}

	CCombCoord.prototype.get = function(cc, r) {
		MgmCubie.MgmMult3(this.imap, cc, this.map, this.tmp);
		return this.tmp.getCComb(r);
	}

	CCombCoord.prototype.set = function(cc, idx, r) {
		this.tmp.setCComb(idx, r);
		MgmCubie.MgmMult3(this.map, this.tmp, this.imap, cc);
	}

	MgmCubie.CCombCoord = CCombCoord;

	function ECombCoord(cubieMap) {
		this.map = new MgmCubie();
		this.imap = new MgmCubie();
		this.map.edge = cubieMap.slice();
		for (var i = 0; i < 30; i++) {
			if (cubieMap.indexOf(i) == -1) {
				this.map.edge.push(i);
			}
		}
		this.imap.invFrom(this.map);
		this.tmp = new MgmCubie();
	}

	ECombCoord.prototype.get = function(cc, r) {
		MgmCubie.MgmMult3(this.imap, cc, this.map, this.tmp);
		return this.tmp.getEComb(r);
	}

	ECombCoord.prototype.set = function(cc, idx, r) {
		this.tmp.setEComb(idx, r);
		MgmCubie.MgmMult3(this.map, this.tmp, this.imap, cc);
	}

	MgmCubie.ECombCoord = ECombCoord;

	function EOriCoord(cubieMap) {
		ECombCoord.call(this, cubieMap);
	}
	EOriCoord.prototype = {
		get: function(cc, r) {
			var idx = 0;
			MgmCubie.MgmMult3(this.imap, cc, this.map, this.tmp);
			for (var i = 0; i < r; i++) {
				idx = idx | (this.tmp.flip[i] << i);
			}
			return idx;
		},
		set: function(cc, idx, r) {
			for (var i = 0; i < 30; i++) {
				this.tmp.flip[i] = i < r ? (idx >> i) & 1 : 0;
			}
			MgmCubie.MgmMult3(this.map, this.tmp, this.imap, cc);
		}
	};
	MgmCubie.EOriCoord = EOriCoord;

	function EPermCoord(cubieMap) {
		ECombCoord.call(this, cubieMap);
	}
	EPermCoord.prototype = {
		get: function(cc, r) {
			MgmCubie.MgmMult3(this.imap, cc, this.map, this.tmp);
			return mathlib.getNPerm(this.tmp.edge, r);
		},
		set: function(cc, idx, r) {
			var edge = [];
			mathlib.setNPerm(edge, idx, r);
			for (var i = 0; i < 30; i++) {
				this.tmp.edge[i] = i < r ? edge[i] : i;
			}
			MgmCubie.MgmMult3(this.map, this.tmp, this.imap, cc);
		}
	};
	MgmCubie.EPermCoord = EPermCoord;

	function COriCoord(cubieMap) {
		CCombCoord.call(this, cubieMap);
	}
	COriCoord.prototype = {
		get: function(cc, r) {
			var idx = 0;
			MgmCubie.MgmMult3(this.imap, cc, this.map, this.tmp);
			for (var i = 0, base = 1; i < r; i++, base *= 3) {
				idx += this.tmp.twst[i] * base;
			}
			return idx;
		},
		set: function(cc, idx, r) {
			for (var i = 0; i < 30; i++) {
				this.tmp.twst[i] = i < r ? idx % 3 : 0;
				idx = ~~(idx / 3);
			}
			MgmCubie.MgmMult3(this.map, this.tmp, this.imap, cc);
		}
	}
	MgmCubie.COriCoord = COriCoord;

	function CPermCoord(cubieMap) {
		CCombCoord.call(this, cubieMap);
	}
	CPermCoord.prototype = {
		get: function(cc, r) {
			MgmCubie.MgmMult3(this.imap, cc, this.map, this.tmp);
			return mathlib.getNPerm(this.tmp.corn, r);
		},
		set: function(cc, idx, r) {
			var corn = [];
			mathlib.setNPerm(corn, idx, r);
			for (var i = 0; i < 20; i++) {
				this.tmp.corn[i] = i < r ? corn[i] : i;
			}
			MgmCubie.MgmMult3(this.map, this.tmp, this.imap, cc);
		}
	}
	MgmCubie.CPermCoord = CPermCoord;

	var perm4Mult = [];
	var perm4MulT = [];
	var perm4MulF = [];
	var perm4TT = [];

	var ckmv = [];

	var urfMove = [1, 2, 0, 5, 10, 6, 3, 4, 9, 11, 7, 8];
	var y2Move = [0, 3, 4, 5, 1, 2, 8, 9, 10, 6, 7, 11];
	var yMove = [0, 2, 3, 4, 5, 1, 7, 8, 9, 10, 6, 11];

	function comb4FullMove(moveTable, idx, move) {
		var slice = ~~(idx / 81 / 24);
		var perm = ~~(idx / 81) % 24;
		var twst = idx % 81;
		var val = moveTable[move][slice];
		slice = val[0];
		perm = perm4Mult[perm][val[1]];
		twst = perm4TT[perm4MulT[val[1]][twst]][val[2]];
		return slice * 81 * 24 + perm * 81 + twst;
	}

	function comb3FullMove(moveTable, idx, move) {
		var slice = ~~(idx / 27 / 6);
		var perm = ~~(idx / 27) % 6;
		var twst = idx % 27;
		var val = moveTable[move][slice];
		slice = val[0];
		perm = perm4Mult[perm][val[1]];
		twst = perm4TT[perm4MulT[val[1]][twst * 3] / 3][val[2]];
		return slice * 27 * 6 + perm * 27 + twst;
	}

	function init() {
		init = $.noop;
		var tt = $.now();
		createMoveCube();

		function setTwst4(arr, idx, base) {
			for (var k = 0; k < 4; k++) {
				arr[k] = idx % base;
				idx = ~~(idx / base);
			}
		}

		function getTwst4(arr, base) {
			var idx = 0;
			for (var k = 3; k >= 0; k--) {
				idx = idx * base + arr[k];
			}
			return idx;
		}

		var perm1 = [];
		var perm2 = [];
		var perm3 = [];
		for (var i = 0; i < 24; i++) {
			perm4Mult[i] = [];
			mathlib.setNPerm(perm1, i, 4);
			for (var j = 0; j < 24; j++) {
				mathlib.setNPerm(perm2, j, 4);
				for (var k = 0; k < 4; k++) {
					perm3[k] = perm1[perm2[k]];
				}
				perm4Mult[i][j] = mathlib.getNPerm(perm3, 4);
			}
		}
		for (var j = 0; j < 24; j++) {
			mathlib.setNPerm(perm2, j, 4);
			perm4MulT[j] = [];
			for (var i = 0; i < 81; i++) {
				setTwst4(perm1, i, 3);
				for (var k = 0; k < 4; k++) {
					perm3[k] = perm1[perm2[k]];
				}
				perm4MulT[j][i] = getTwst4(perm3, 3);
			}
			perm4MulF[j] = [];
			for (var i = 0; i < 16; i++) {
				setTwst4(perm1, i, 2);
				for (var k = 0; k < 4; k++) {
					perm3[k] = perm1[perm2[k]];
				}
				perm4MulF[j][i] = getTwst4(perm3, 2);
			}
		}
		for (var j = 0; j < 81; j++) {
			perm4TT[j] = [];
			setTwst4(perm2, j, 3);
			for (var i = 0; i < 81; i++) {
				setTwst4(perm1, i, 3);
				for (var k = 0; k < 4; k++) {
					perm3[k] = (perm1[k] + perm2[k]) % 3;
				}
				perm4TT[j][i] = getTwst4(perm3, 3);
			}
		}
		var tmp1 = new MgmCubie();
		var tmp2 = new MgmCubie();
		for (var m1 = 0; m1 < 12; m1++) {
			ckmv[m1] = 1 << m1;
			for (var m2 = 0; m2 < m1; m2++) {
				MgmCubie.MgmMult(MgmCubie.moveCube[m1 * 4], MgmCubie.moveCube[m2 * 4], tmp1);
				MgmCubie.MgmMult(MgmCubie.moveCube[m2 * 4], MgmCubie.moveCube[m1 * 4], tmp2);
				if (tmp1.isEqual(tmp2)) {
					ckmv[m1] |= 1 << m2;
				}
			}
		}
		DEBUG && console.log('[mgmsolver] base init finished, tt=', $.now() - tt);
	}

	function move2str(moves) {
		var ret = [];
		for (var i = 0; i < moves.length; i++) {
			ret.push(["U", "R", "F", "L", "BL", "BR", "DR", "DL", "DBL", "B", "DBR", "D"][moves[i][0]] + ["", "2", "2'", "'"][moves[i][1]]);
		}
		return ret.join(' ');
	}

	function move2strRURp(moves) {
		var ret = [];
		for (var i = 0; i < moves.length; i++) {
			let suffix = ["", "2", "2'", "'"][moves[i][1]];
			ret.push(moves[i][0] == 0 ? "U" + suffix : "R U" + suffix + " R'");
		}
		return ret.join(' ');
	}

	// klmminx solver
	var KlmPhase1Move = [];
	var KlmPhase2Move = [];
	var KlmPhase3Move = [];
	var KlmPhase1Prun = [];
	var KlmPhase2Prun = [];
	var KlmPhase3Prun = [];
	var klmPhase1Coord;
	var klmPhase2Coord;
	var klmPhase3Coord;
	var klmSolv1 = null;
	var klmSolv2 = null;
	var klmSolv3 = null;

	function initKlmPhase1() {
		klmPhase1Coord = new CCombCoord([5, 6, 7, 8, 9]);
		var tmp1 = new MgmCubie();
		var tmp2 = new MgmCubie();
		mathlib.createMove(KlmPhase1Move, 1140, function(idx, move) {
			klmPhase1Coord.set(tmp1, idx, 3);
			MgmCubie.MgmMult(tmp1, MgmCubie.moveCube[move * 4], tmp2);
			return klmPhase1Coord.get(tmp2, 3);
		}, 12);
		mathlib.createPrun(KlmPhase1Prun, 0, 1140 * 27 * 6, 8, comb3FullMove.bind(null, KlmPhase1Move), 12, 4, 5);
		var doKlmPhase1Move = comb3FullMove.bind(null, KlmPhase1Move);
		klmSolv1 = new mathlib.Searcher(null, function(idx) {
			return Math.max(mathlib.getPruning(KlmPhase1Prun, idx[0]), mathlib.getPruning(KlmPhase1Prun, idx[1]));
		}, function(idx, move) {
			var idx1 = [doKlmPhase1Move(idx[0], move), doKlmPhase1Move(idx[1], y2Move[move])];
			if (idx1[0] == idx[0] && idx1[1] == idx[1]) {
				return null;
			}
			return idx1;
		}, 12, 4, 9);
	}

	function initKlmPhase2() {
		klmPhase2Coord = new CCombCoord([13, 15, 16, 0, 1, 2, 3, 4, 10, 11, 12, 14, 17, 18, 19]);
		var tmp1 = new MgmCubie();
		var tmp2 = new MgmCubie();
		mathlib.createMove(KlmPhase2Move, 455, function(idx, move) {
			klmPhase2Coord.set(tmp1, idx, 3);
			MgmCubie.MgmMult(tmp1, MgmCubie.moveCube[move * 4], tmp2);
			return klmPhase2Coord.get(tmp2, 3);
		}, 6);
		mathlib.createPrun(KlmPhase2Prun, 0, 455 * 27 * 6, 8, comb3FullMove.bind(null, KlmPhase2Move), 6, 4, 4);
		var doKlmPhase2Move = comb3FullMove.bind(null, KlmPhase2Move);
		klmSolv2 = new mathlib.Searcher(null, function(idx) {
			return Math.max(mathlib.getPruning(KlmPhase2Prun, idx[0]), mathlib.getPruning(KlmPhase2Prun, idx[1]));
		}, function(idx, move) {
			var idx1 = [doKlmPhase2Move(idx[0], move), doKlmPhase2Move(idx[1], yMove[move])];
			if (idx1[0] == idx[0] && idx1[1] == idx[1]) {
				return null;
			}
			return idx1;
		}, 6, 4);
	}

	function initKlmPhase3() {
		klmPhase3Coord = new CCombCoord([0, 1, 2, 3, 4, 10, 11, 14, 17, 18]);
		var tmp1 = new MgmCubie();
		var tmp2 = new MgmCubie();
		mathlib.createMove(KlmPhase3Move, 210, function(idx, move) {
			klmPhase3Coord.set(tmp1, idx);
			MgmCubie.MgmMult(tmp1, MgmCubie.moveCube[move * 4], tmp2);
			return klmPhase3Coord.get(tmp2);
		}, 3);
		var doKlmPhase3Move = comb4FullMove.bind(null, KlmPhase3Move);
		mathlib.createPrun(KlmPhase3Prun, 0, 210 * 81 * 24, 14, doKlmPhase3Move, 3, 4, 6);
		klmSolv3 = new mathlib.Searcher(null, function(idx) {
			return Math.max(mathlib.getPruning(KlmPhase3Prun, idx[0]), mathlib.getPruning(KlmPhase3Prun, idx[1]), mathlib.getPruning(KlmPhase3Prun, idx[2]));
		}, function(idx, move) {
			return [doKlmPhase3Move(idx[0], move), doKlmPhase3Move(idx[1], (move + 1) % 3), doKlmPhase3Move(idx[2], (move + 2) % 3)];
		}, 3, 4);
	}

	function initKlm() {
		initKlm = $.noop;
		init();
		var tt = $.now();
		initKlmPhase1();
		initKlmPhase2();
		initKlmPhase3();
		DEBUG && console.log('[mgmsolver] klm init finished, tt=', $.now() - tt);
	}

	function solveKlmCubie(cc, useSym) {
		initKlm();
		var kc0 = new MgmCubie();
		var kc1 = new MgmCubie();
		var kc2 = new MgmCubie();

		kc0.copy(cc);

		var idx;
		var tt = $.now();
		var sols = [];
		var solsym = 0;

		//klmPhase1
		var idx1s = [];
		for (var s = 0; s < (useSym ? 12 : 1); s++) {
			MgmCubie.MgmMult3(MgmCubie.symCube[MgmCubie.symMulI[0][s * 5]], kc0, MgmCubie.symCube[s * 5], kc1);
			var val0 = klmPhase1Coord.get(kc1, 3);
			MgmCubie.MgmMult3(MgmCubie.symCube[MgmCubie.symMulI[0][2]], kc1, MgmCubie.symCube[2], kc2);
			var val1 = klmPhase1Coord.get(kc2, 3);
			idx1s.push([val0[0] * 27 * 6 + val0[1] * 27 + val0[2], val1[0] * 27 * 6 + val1[1] * 27 + val1[2]]);
		}
		var sol1s = klmSolv1.solveMulti(idx1s, 0, 9);
		var ksym = sol1s[1] * 5;
		var sol1 = sol1s[0];
		MgmCubie.MgmMult3(MgmCubie.symCube[MgmCubie.symMulI[0][ksym]], kc0, MgmCubie.symCube[ksym], kc1);
		kc0.copy(kc1);
		solsym = MgmCubie.symMult[solsym][ksym];
		for (var i = 0; i < sol1.length; i++) {
			var move = sol1[i];
			MgmCubie.MgmMult(kc0, MgmCubie.moveCube[move[0] * 4 + move[1]], kc1);
			kc0.copy(kc1);
			move[0] = MgmCubie.symMulM[MgmCubie.symMulI[0][solsym]][move[0]];
		}
		DEBUG && console.log('[mgmsolver] KlmPhase1s in ', $.now() - tt, 'ms', sol1.length, 'move(s) sym=', ksym);

		//klmPhase2
		tt = $.now();
		var idx2s = [];
		for (var s = 0; s < (useSym ? 5 : 1); s++) {
			MgmCubie.MgmMult3(MgmCubie.symCube[MgmCubie.symMulI[0][s]], kc0, MgmCubie.symCube[s], kc1);
			var val0 = klmPhase2Coord.get(kc1, 3);
			MgmCubie.MgmMult3(MgmCubie.symCube[MgmCubie.symMulI[0][1]], kc1, MgmCubie.symCube[1], kc2);
			var val1 = klmPhase2Coord.get(kc2, 3);
			idx2s.push([val0[0] * 27 * 6 + val0[1] * 27 + val0[2], val1[0] * 27 * 6 + val1[1] * 27 + val1[2]]);
		}
		var sol2s = klmSolv2.solveMulti(idx2s, 0, 14);
		ksym = sol2s[1];
		var sol2 = sol2s[0];
		MgmCubie.MgmMult3(MgmCubie.symCube[MgmCubie.symMulI[0][ksym]], kc0, MgmCubie.symCube[ksym], kc1);
		kc0.copy(kc1);
		solsym = MgmCubie.symMult[solsym][ksym];
		for (var i = 0; i < sol2.length; i++) {
			var move = sol2[i];
			MgmCubie.MgmMult(kc0, MgmCubie.moveCube[move[0] * 4 + move[1]], kc1);
			kc0.copy(kc1);
			move[0] = MgmCubie.symMulM[MgmCubie.symMulI[0][solsym]][move[0]];
		}
		DEBUG && console.log('[mgmsolver] KlmPhase2s in ', $.now() - tt, 'ms', sol2.length, 'move(s) sym=', ksym);

		//klmPhase3
		val0 = klmPhase3Coord.get(kc0);
		MgmCubie.MgmMult3(MgmCubie.symCube[MgmCubie.symMulI[0][6]], kc0, MgmCubie.symCube[6], kc1);
		val1 = klmPhase3Coord.get(kc1);
		MgmCubie.MgmMult3(MgmCubie.symCube[MgmCubie.symMulI[0][29]], kc0, MgmCubie.symCube[29], kc1);
		var val2 = klmPhase3Coord.get(kc1);
		idx = [(val0[0] * 24 + val0[1]) * 81 + val0[2], (val1[0] * 24 + val1[1]) * 81 + val1[2], (val2[0] * 24 + val2[1]) * 81 + val2[2]];
		tt = $.now();
		var sol3 = klmSolv3.solve(idx, 0, 14);
		DEBUG && console.log('[mgmsolver] KlmPhase3 in ', $.now() - tt, 'ms', sol3.length, 'move(s)');
		for (var i = 0; i < sol3.length; i++) {
			var move = sol3[i];
			move[0] = MgmCubie.symMulM[MgmCubie.symMulI[0][solsym]][move[0]];
		}
		DEBUG && console.log('[mgmsolver] klm total length: ', sol1.length + sol2.length + sol3.length);
		return move2str(Array.prototype.concat(sol1, sol2, sol3));
	}


	var mgmSolv1 = null;
	var mgmSolv2 = null;
	var mgmSolv3 = null;
	var mgmSolv4 = null;
	var mgmSolv5 = null;
	var mgmSolv6 = null;
	var mgmSolv7 = null;
	var mgmSolv8 = null;
	var mgmSolv9 = null;
	var mgmSolv10 = null;

	/**
	 * SOLE_EO: 0 = no ori, 1 = edge ori, 2 = corner ori
	 */
	function BlockSolver(edges, corns, N_EDGE, N_CORN, N_MOVE, SOLV_ORI) {
		var tt = $.now();

		var mgmECoord = new ECombCoord(edges);
		var mgmCCoord = new CCombCoord(corns);
		// var mgmOCoord = SOLV_ORI ? new EOriCoord(edges) : null;
		var mgmOCoord = SOLV_ORI == 1 ? new EOriCoord(edges) : SOLV_ORI == 2 ? new COriCoord(corns) : null;

		var MgmEMove = [];
		var MgmCMove = [];
		var MgmOMove = [];
		var MgmEPrun = [];
		var MgmCPrun = [];
		var MgmOPrun = [];

		var N_ECOMB = mathlib.Cnk[edges.length][N_EDGE];
		var N_CCOMB = mathlib.Cnk[corns.length][N_CORN];
		var N_EPERM = mathlib.fact[N_EDGE];
		var N_CPERM = mathlib.fact[N_CORN];
		var N_EORI = Math.pow(2, N_EDGE);
		var N_CORI = Math.pow(3, N_CORN);
		var N_ORI = Math.pow(1 + SOLV_ORI, SOLV_ORI == 1 ? edges.length : corns.length);

		var tmp1 = new MgmCubie();
		var tmp2 = new MgmCubie();

		mathlib.createMove(MgmEMove, N_ECOMB, function(idx, move) {
			mgmECoord.set(tmp1, idx, N_EDGE);
			MgmCubie.MgmMult(tmp1, MgmCubie.moveCube[move * 4], tmp2);
			return mgmECoord.get(tmp2, N_EDGE);
		}, N_MOVE);

		mathlib.createMove(MgmCMove, N_CCOMB, function(idx, move) {
			mgmCCoord.set(tmp1, idx, N_CORN);
			MgmCubie.MgmMult(tmp1, MgmCubie.moveCube[move * 4], tmp2);
			return mgmCCoord.get(tmp2, N_CORN);
		}, N_MOVE);

		SOLV_ORI && mathlib.createMove(MgmOMove, N_ORI, function(idx, move) {
			mgmOCoord.set(tmp1, idx, edges.length);
			MgmCubie.MgmMult(tmp1, MgmCubie.moveCube[move * 4], tmp2);
			return mgmOCoord.get(tmp2, edges.length);
		}, N_MOVE);

		var doMgmEMove = doCombMove4.bind(null, MgmEMove, N_EPERM, N_EORI, 16 / N_EORI);
		var doMgmCMove = doCombMove4.bind(null, MgmCMove, N_CPERM, N_CORI, 81 / N_CORI);

		mathlib.createPrun(MgmEPrun, 0, N_ECOMB * N_EPERM * N_EORI, 14, doMgmEMove, N_MOVE, 4);
		mathlib.createPrun(MgmCPrun, 0, N_CCOMB * N_CPERM * N_CORI, 14, doMgmCMove, N_MOVE, 4);
		SOLV_ORI && mathlib.createPrun(MgmOPrun, 0, N_ORI, 14, MgmOMove, N_MOVE, 4);

		var MgmECPrun = [];
		mathlib.createPrun(MgmECPrun, 0, N_ECOMB * N_CCOMB, 14, function(idx, move) {
			var idxE = ~~(idx / N_CCOMB);
			var idxC = idx % N_CCOMB;
			return MgmEMove[move][idxE][0] * N_CCOMB + MgmCMove[move][idxC][0];
		}, N_MOVE, 4);

		this.solv = new mathlib.Searcher(null, function(idx) {
			return Math.max(
				mathlib.getPruning(MgmEPrun, idx[0]),
				mathlib.getPruning(MgmCPrun, idx[1]),
				SOLV_ORI ? mathlib.getPruning(MgmOPrun, idx[2]) : 0,
				mathlib.getPruning(MgmECPrun, ~~(idx[0] / N_EPERM / N_EORI) * N_CCOMB + ~~(idx[1] / N_CPERM / N_CORI))
			);
		}, function(idx, move) {
			var idx1 = [
				doMgmEMove(idx[0], move),
				doMgmCMove(idx[1], move),
				SOLV_ORI ? MgmOMove[move][idx[2]] : 0
			];
			if (idx1[0] == idx[0] && idx1[1] == idx[1] && idx1[2] == idx[2]) {
				return null;
			}
			return idx1;
		}, N_MOVE, 4, 100);
		this.mgmECoord = mgmECoord;
		this.mgmCCoord = mgmCCoord;
		this.mgmOCoord = mgmOCoord;
		this.N_EDGE = N_EDGE;
		this.N_CORN = N_CORN;
		this.N_ELEN = edges.length;
		DEBUG && console.log('[mgmsolver] mgm init, tt=', $.now() - tt);
	}

	BlockSolver.prototype.getIdx = function(cc) {
		var idxE = this.mgmECoord.get(cc, this.N_EDGE);
		var idxC = this.mgmCCoord.get(cc, this.N_CORN);
		var idxO = this.mgmOCoord ? this.mgmOCoord.get(cc, this.N_ELEN) : 0;
		return [
			(idxE[0] * mathlib.fact[this.N_EDGE] + idxE[1]) * Math.pow(2, this.N_EDGE) + idxE[2],
			(idxC[0] * mathlib.fact[this.N_CORN] + idxC[1]) * Math.pow(3, this.N_CORN) + idxC[2],
			idxO
		];
	}

	BlockSolver.prototype.solve = function(kc0) {
		var tt = $.now();
		var kc1 = new MgmCubie();
		var idx = this.getIdx(kc0);
		var sol = this.solv.solve(idx, 0, 30);
		for (var i = 0; i < sol.length; i++) {
			var move = sol[i];
			MgmCubie.MgmMult(kc0, MgmCubie.moveCube[move[0] * 4 + move[1]], kc1);
			kc0.copy(kc1);
		}
		DEBUG && console.log('[mgmsolver] block solved, tt=', $.now() - tt);
		return sol;
	}

	function BlockRURpSolver(edges, corns, N_EDGE, N_CORN, N_MOVE) {
		var tt = $.now();

		var mgmEPCoord = new EPermCoord(edges);
		var mgmCPCoord = new CPermCoord(corns);
		var mgmEOCoord = new EOriCoord(edges);
		var mgmCOCoord = new COriCoord(corns);

		var MgmEPMove = [];
		var MgmCPMove = [];
		var MgmEOMove = [];
		var MgmCOMove = [];
		var MgmEPrun = [];
		var MgmCPrun = [];

		var N_EPERM = mathlib.fact[N_EDGE];
		var N_CPERM = mathlib.fact[N_CORN];
		var N_EORI = Math.pow(2, N_EDGE);
		var N_CORI = Math.pow(3, N_CORN);

		var tmp1 = new MgmCubie();
		var tmp2 = new MgmCubie();
		var moveRURp = new MgmCubie();
		MgmCubie.MgmMult3(MgmCubie.moveCube[4], MgmCubie.moveCube[0], MgmCubie.moveCube[7], moveRURp);

		var CoordMove = function(coord, N_PIECE, idx, move) {
			coord.set(tmp1, idx, N_PIECE);
			MgmCubie.MgmMult(tmp1, move == 0 ? MgmCubie.moveCube[0] : moveRURp, tmp2);
			return coord.get(tmp2, N_PIECE);
		};

		mathlib.createMove(MgmEPMove, N_EPERM, CoordMove.bind(null, mgmEPCoord, N_EDGE), N_MOVE);
		mathlib.createMove(MgmCPMove, N_CPERM, CoordMove.bind(null, mgmCPCoord, N_CORN), N_MOVE);
		mathlib.createMove(MgmEOMove, N_EORI, CoordMove.bind(null, mgmEOCoord, N_EDGE), N_MOVE);
		mathlib.createMove(MgmCOMove, N_CORI, CoordMove.bind(null, mgmCOCoord, N_CORN), N_MOVE);

		var doXMove = function(PMove, OMove, N_ORI, idx, move) {
			let perm = ~~(idx / N_ORI);
			let ori = idx % N_ORI;
			perm = PMove[move][perm];
			ori = OMove[move][ori];
			return perm * N_ORI + ori;
		};

		var doMgmEMove = doXMove.bind(null, MgmEPMove, MgmEOMove, N_EORI);
		var doMgmCMove = doXMove.bind(null, MgmCPMove, MgmCOMove, N_CORI);

		mathlib.createPrun(MgmEPrun, 0, N_EPERM * N_EORI, 14, doMgmEMove, N_MOVE, 4);
		mathlib.createPrun(MgmCPrun, 0, N_CPERM * N_CORI, 14, doMgmCMove, N_MOVE, 4);

		this.solv = new mathlib.Searcher(null, function(idx) {
			return Math.max(
				mathlib.getPruning(MgmEPrun, idx[0]),
				mathlib.getPruning(MgmCPrun, idx[1])
			);
		}, function(idx, move) {
			return [
				doMgmEMove(idx[0], move),
				doMgmCMove(idx[1], move)
			];
		}, N_MOVE, 4, 100);
		this.mgmECoord = { get: (cc) => mgmEPCoord.get(cc, N_EDGE) * N_EORI + mgmEOCoord.get(cc, N_EDGE) };
		this.mgmCCoord = { get: (cc) => mgmCPCoord.get(cc, N_CORN) * N_CORI + mgmCOCoord.get(cc, N_CORN) };
		this.N_EDGE = N_EDGE;
		this.N_CORN = N_CORN;
		DEBUG && console.log('[mgmsolver] mgm init, tt=', $.now() - tt);
	}

	BlockRURpSolver.prototype.getIdx = function(cc) {
		var idxE = this.mgmECoord.get(cc);
		var idxC = this.mgmCCoord.get(cc);
		return [idxE, idxC];
	};

	BlockRURpSolver.prototype.solve = BlockSolver.prototype.solve;

	function initMgm() {
		initMgm = $.noop;
		init();
		var tt = $.now();
		var edgeOrder = [6, 7, 22,  5, 20,  9, 28,  8, 24, 26,  17, 23,  15, 16, 21,  13, 14, 29,  11, 12, 27,  18, 19, 25,  0, 1, 2, 3, 4, 10];
		var cornOrder = [6,         5,      9,      7, 8,       16,      13, 15,      12, 19,      11, 18,      14, 17,      0, 1, 2, 3, 4, 10];
		mgmSolv1 = new BlockSolver(edgeOrder, cornOrder, 3, 1, 12);
		mgmSolv2 = new BlockSolver(edgeOrder.slice(3), cornOrder.slice(1), 2, 1, 9);
		mgmSolv3 = new BlockSolver(edgeOrder.slice(5), cornOrder.slice(2), 2, 1, 8);
		mgmSolv4 = new BlockSolver(edgeOrder.slice(7), cornOrder.slice(3), 3, 2, 7);
		mgmSolv5 = new BlockSolver(edgeOrder.slice(10), cornOrder.slice(5), 2, 1, 6);
		mgmSolv6 = new BlockSolver(edgeOrder.slice(12), cornOrder.slice(6), 3, 2, 5);
		mgmSolv7 = new BlockSolver(edgeOrder.slice(15), cornOrder.slice(8), 3, 2, 4);
		mgmSolv8 = new BlockSolver(edgeOrder.slice(18), cornOrder.slice(10), 3, 2, 3, 1);
		mgmSolv9 = new BlockSolver(edgeOrder.slice(21), cornOrder.slice(12), 3, 2, 2);
		mgmSolv10 = new BlockRURpSolver(edgeOrder.slice(24), cornOrder.slice(14), 6, 6, 2);
		DEBUG && console.log('[mgmsolver] mgm init finished, tt=', $.now() - tt);
		return;
	}

	function solveMgmCubie(cc, useSym) {
		initMgm();
		var kc0 = new MgmCubie();
		var kc1 = new MgmCubie();
		var kc2 = new MgmCubie();

		kc0.copy(cc);

		var idx;
		var tt = $.now();
		var sols = [];
		var solsym = 0;
		var idxE, idxC;

		var sol1 = mgmSolv1.solve(kc0);
		var sol2 = mgmSolv2.solve(kc0);
		var sol3 = mgmSolv3.solve(kc0);
		var sol4 = mgmSolv4.solve(kc0);
		var sol5 = mgmSolv5.solve(kc0);
		var sol6 = mgmSolv6.solve(kc0);
		var sol7 = mgmSolv7.solve(kc0);
		var sol8 = mgmSolv8.solve(kc0);
		var sol9 = mgmSolv9.solve(kc0);
		var sol10 = mgmSolv10.solve(kc0);
		DEBUG && console.log(sol1, sol2, sol3, sol4, sol5, sol6, sol7, sol8, sol9, sol10);
		return [move2str([].concat(sol1, sol2, sol3, sol4, sol5, sol6, sol7, sol8, sol9)), move2strRURp(sol10)].join(' ');
	}

	function checkSolver(isKlm) {
		init();
		var kc0 = new MgmCubie();
		var kc1 = new MgmCubie();
		var gen = [];
		for (var i = 0; i < 500; i++) {
			var move = mathlib.rn(12);
			gen.push([move, 0]);
			MgmCubie.MgmMult(kc0, MgmCubie.moveCube[move * 4], kc1);
			kc0.copy(kc1);
		}
		return move2str(gen) + '   ' + (isKlm ? solveKlmCubie : solveMgmCubie)(kc0, true);
	}

	return {
		MgmCubie: MgmCubie,
		solveKlmCubie: solveKlmCubie,
		solveMgmCubie: solveMgmCubie,
		checkSolver: DEBUG && checkSolver
	};
})();
