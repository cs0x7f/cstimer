"use strict";

var klmsolver = (function() {

	function KiloCubie() {
		this.perm = [];
		this.twst = [];
		for (var i = 0; i < 20; i++) {
			this.perm[i] = i;
			this.twst[i] = 0;
		}
	}

	KiloCubie.SOLVED = new KiloCubie();

	var U = 0, R = 5, F = 10, L = 15, BL = 20, BR = 25, DR = 30, DL = 35, DBL = 40, B = 45, DBR = 50, D = 55;
	var kiloFacelet = [
		[U + 2, R + 3, F + 4],
		[U + 3, F + 3, L + 4],
		[U + 4, L + 3, BL + 4],
		[U + 0, BL + 3, BR + 4],
		[U + 1, BR + 3, R + 4],
		[D + 3, B + 0, DBL + 1],
		[D + 2, DBR + 0, B + 1],
		[D + 1, DR + 0, DBR + 1],
		[D + 0, DL + 0, DR + 1],
		[D + 4, DBL + 0, DL + 1],
		[F + 0, R + 2, DR + 3],
		[L + 0, F + 2, DL + 3],
		[BL + 0, L + 2, DBL + 3],
		[BR + 0, BL + 2, B + 3],
		[R + 0, BR + 2, DBR + 3],
		[B + 4, BL + 1, DBL + 2],
		[DBR + 4, BR + 1, B + 2],
		[DR + 4, R + 1, DBR + 2],
		[DL + 4, F + 1, DR + 2],
		[DBL + 4, L + 1, DL + 2]
	];

	KiloCubie.prototype.toFaceCube = function(kFacelet) {
		kFacelet = kFacelet || kiloFacelet;
		var f = [];
		mathlib.fillFacelet(kFacelet, f, this.perm, this.twst, 5);
		return f;
	}

	KiloCubie.prototype.fromFacelet = function(facelet, kFacelet) {
		kFacelet = kFacelet || kiloFacelet;
		var count = 0;
		var f = [];
		for (var i = 0; i < 60; ++i) {
			f[i] = facelet[i];
			count += Math.pow(16, f[i]);
		}
		if (count != 0x555555555555) {
			return -1;
		}
		if (mathlib.detectFacelet(kFacelet, f, this.perm, this.twst, 5) == -1) {
			return -1;
		}
		return this;
	}

	KiloCubie.prototype.hashCode = function() {
		var ret = 0;
		for (var i = 0; i < 20; i++) {
			ret = 0 | (ret * 31 + this.perm[i] * 3 + this.twst[i]);
		}
		return ret;
	}

	KiloCubie.KiloMult = function(a, b, prod) {
		for (var i = 0; i < 20; i++) {
			prod.perm[i] = a.perm[b.perm[i]];
			prod.twst[i] = (a.twst[b.perm[i]] + b.twst[i]) % 3;
		}
	};

	KiloCubie.KiloMult3 = function(a, b, c, prod) {
		for (var i = 0; i < 20; i++) {
			prod.perm[i] = a.perm[b.perm[c.perm[i]]];
			prod.twst[i] = (a.twst[b.perm[c.perm[i]]] + b.twst[c.perm[i]] + c.twst[i]) % 3;
		}
	};

	KiloCubie.prototype.invFrom = function(cc) {
		for (var i = 0; i < 20; i++) {
			this.perm[cc.perm[i]] = i;
			this.twst[cc.perm[i]] = (3 - cc.twst[i]) % 3;
		}
		return this;
	}

	KiloCubie.prototype.init = function(perm, twst) {
		this.perm = perm.slice();
		this.twst = twst.slice();
		return this;
	};

	KiloCubie.prototype.isEqual = function(c) {
		for (var i = 0; i < 20; i++) {
			if (this.perm[i] != c.perm[i] || this.twst[i] != c.twst[i]) {
				return false;
			}
		}
		return true;
	};

	KiloCubie.prototype.setComb = function(idx, r) {
		r = r || 4;
		var fill = 19;
		for (var i = 19; i >= 0; i--) {
			if (idx >= mathlib.Cnk[i][r]) {
				idx -= mathlib.Cnk[i][r--];
				this.perm[i] = r;
			} else {
				this.perm[i] = fill--;
			}
			this.twst[i] = 0;
		}
	}

	KiloCubie.prototype.getComb = function(r) {
		r = r || 4;
		var thres = r;
		var idxComb = 0;
		var idxPerm = 0;
		var idxOri = 0;
		var permR = [];
		for (var i = 19; i >= 0; i--) {
			if (this.perm[i] < thres) {
				idxComb += mathlib.Cnk[i][r--];
				idxOri = idxOri * 3 + this.twst[i];
				permR[r] = this.perm[i];
			}
		}
		return [idxComb, mathlib.getNPerm(permR, thres), idxOri];
	}

	KiloCubie.prototype.faceletMove = function(face, pow, wide) {
		var facelet = this.toFaceCube();
		var state = [];
		for (var i = 0; i < 12; i++) {
			for (var j = 0; j < 5; j++) {
				state[i * 11 + j] = facelet[i * 5 + j];
				state[i * 11 + j + 5] = 0;
			}
			state[i * 11 + 10] = 0;
		}
		mathlib.minx.doMove(state, face, pow, wide);
		for (var i = 0; i < 12; i++) {
			for (var j = 0; j < 5; j++) {
				facelet[i * 5 + j] = state[i * 11 + j];
			}
		}
		this.fromFacelet(facelet);
	}

	function createMoveCube() {
		//init move
		var moveCube = [];
		var moveHash = [];
		for (var i = 0; i < 12 * 4; i++) {
			moveCube[i] = new KiloCubie();
		}
		for (var a = 0; a < 48; a += 4) {
			moveCube[a].faceletMove(a >> 2, 1, 0);
			moveHash[a] = moveCube[a].hashCode();
			for (var p = 0; p < 3; p++) {
				KiloCubie.KiloMult(moveCube[a + p], moveCube[a], moveCube[a + p + 1]);
				moveHash[a + p + 1] = moveCube[a + p + 1].hashCode();
			}
		}
		KiloCubie.moveCube = moveCube;

		//init sym
		var symCube = [];
		var symMult = [];
		var symMulI = [];
		var symMulM = [];
		var symHash = [];
		var tmp = new KiloCubie();
		for (var s = 0; s < 60; s++) {
			symCube[s] = new KiloCubie().init(tmp.perm, tmp.twst);
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
				KiloCubie.KiloMult(symCube[i], symCube[j], tmp);
				var k = symHash.indexOf(tmp.hashCode());
				symMult[i][j] = k;
				symMulI[k][j] = i;
			}
		}
		for (var s = 0; s < 60; s++) {
			symMulM[s] = [];
			for (var j = 0; j < 12; j++) {
				KiloCubie.KiloMult3(symCube[symMulI[0][s]], moveCube[j * 4], symCube[s], tmp);
				var k = moveHash.indexOf(tmp.hashCode());
				symMulM[s][j] = k >> 2;
			}
		}
		KiloCubie.symCube = symCube;
		KiloCubie.symMult = symMult;
		KiloCubie.symMulI = symMulI;
		KiloCubie.symMulM = symMulM;
	}

	function CombCoord(cubieMap) {
		this.map = new KiloCubie();
		this.imap = new KiloCubie();
		this.map.perm = cubieMap.slice();
		for (var i = 0; i < 20; i++) {
			if (cubieMap.indexOf(i) == -1) {
				this.map.perm.push(i);
			}
		}
		this.imap.invFrom(this.map);
		this.tmp = new KiloCubie();
	}

	CombCoord.prototype.get = function(cc, r) {
		KiloCubie.KiloMult3(this.imap, cc, this.map, this.tmp);
		return this.tmp.getComb(r);
	}

	CombCoord.prototype.set = function(cc, idx, r) {
		this.tmp.setComb(idx, r);
		KiloCubie.KiloMult3(this.map, this.tmp, this.imap, cc);
	}

	KiloCubie.CombCoord = CombCoord;

	var perm4Mult = [];
	var perm4MulT = [];
	var perm4TT = [];

	var perm3Mult = [];
	var perm3MulT = [];
	var perm3TT = [];

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

		function setTwst4(arr, idx) {
			for (var k = 0; k < 4; k++) {
				arr[k] = idx % 3;
				idx = ~~(idx / 3);
			}
		}

		function getTwst4(arr) {
			var idx = 0;
			for (var k = 3; k >= 0; k--) {
				idx = idx * 3 + arr[k];
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
			perm4MulT[j] = [];
			mathlib.setNPerm(perm2, j, 4);
			for (var i = 0; i < 81; i++) {
				setTwst4(perm1, i);
				for (var k = 0; k < 4; k++) {
					perm3[k] = perm1[perm2[k]];
				}
				perm4MulT[j][i] = getTwst4(perm3);
			}
		}
		for (var j = 0; j < 81; j++) {
			perm4TT[j] = [];
			setTwst4(perm2, j);
			for (var i = 0; i < 81; i++) {
				setTwst4(perm1, i);
				for (var k = 0; k < 4; k++) {
					perm3[k] = (perm1[k] + perm2[k]) % 3;
				}
				perm4TT[j][i] = getTwst4(perm3);
			}
		}
		var tmp1 = new KiloCubie();
		var tmp2 = new KiloCubie();
		for (var m1 = 0; m1 < 12; m1++) {
			ckmv[m1] = 1 << m1;
			for (var m2 = 0; m2 < m1; m2++) {
				KiloCubie.KiloMult(KiloCubie.moveCube[m1 * 4], KiloCubie.moveCube[m2 * 4], tmp1);
				KiloCubie.KiloMult(KiloCubie.moveCube[m2 * 4], KiloCubie.moveCube[m1 * 4], tmp2);
				if (tmp1.isEqual(tmp2)) {
					ckmv[m1] |= 1 << m2;
				}
			}
		}

		initPhase1();
		initPhase2();
		initPhase3();
		DEBUG && console.log('[kilo] init finished, tt=', $.now() - tt);
	}

	var Phase1Move = [];
	var Phase2Move = [];
	var Phase3Move = [];
	var Phase1Prun = [];
	var Phase2Prun = [];
	var Phase3Prun = [];
	var phase1Coord;
	var phase2Coord;
	var phase3Coord;
	var solv1 = null;
	var solv2 = null;
	var solv3 = null;

	function initPhase1() {
		phase1Coord = new CombCoord([5, 6, 7, 8, 9]);
		var tmp1 = new KiloCubie();
		var tmp2 = new KiloCubie();
		mathlib.createMove(Phase1Move, 1140, function(idx, move) {
			phase1Coord.set(tmp1, idx, 3);
			KiloCubie.KiloMult(tmp1, KiloCubie.moveCube[move * 4], tmp2);
			return phase1Coord.get(tmp2, 3);
		}, 12);
		mathlib.createPrun(Phase1Prun, 0, 1140 * 27 * 6, 8, comb3FullMove.bind(null, Phase1Move), 12, 4, 5);
		var doPhase1Move = comb3FullMove.bind(null, Phase1Move);
		solv1 = new mathlib.Searcher(null, function(idx) {
			return Math.max(mathlib.getPruning(Phase1Prun, idx[0]), mathlib.getPruning(Phase1Prun, idx[1]));
		}, function(idx, move) {
			var idx1 = [doPhase1Move(idx[0], move), doPhase1Move(idx[1], y2Move[move])];
			if (idx1[0] == idx[0] && idx1[1] == idx[1]) {
				return null;
			}
			return idx1;
		}, 12, 4, 9);
	}

	function initPhase2() {
		phase2Coord = new CombCoord([13, 15, 16, 0, 1, 2, 3, 4, 10, 11, 12, 14, 17, 18, 19]);
		var tmp1 = new KiloCubie();
		var tmp2 = new KiloCubie();
		mathlib.createMove(Phase2Move, 455, function(idx, move) {
			phase2Coord.set(tmp1, idx, 3);
			KiloCubie.KiloMult(tmp1, KiloCubie.moveCube[move * 4], tmp2);
			return phase2Coord.get(tmp2, 3);
		}, 6);
		mathlib.createPrun(Phase2Prun, 0, 455 * 27 * 6, 8, comb3FullMove.bind(null, Phase2Move), 6, 4, 4);
		var doPhase2Move = comb3FullMove.bind(null, Phase2Move);
		solv2 = new mathlib.Searcher(null, function(idx) {
			return Math.max(mathlib.getPruning(Phase2Prun, idx[0]), mathlib.getPruning(Phase2Prun, idx[1]));
		}, function(idx, move) {
			var idx1 = [doPhase2Move(idx[0], move), doPhase2Move(idx[1], yMove[move])];
			if (idx1[0] == idx[0] && idx1[1] == idx[1]) {
				return null;
			}
			return idx1;
		}, 6, 4);
	}

	function initPhase3() {
		phase3Coord = new CombCoord([0, 1, 2, 3, 4, 10, 11, 14, 17, 18]);
		var tmp1 = new KiloCubie();
		var tmp2 = new KiloCubie();
		mathlib.createMove(Phase3Move, 210, function(idx, move) {
			phase3Coord.set(tmp1, idx);
			KiloCubie.KiloMult(tmp1, KiloCubie.moveCube[move * 4], tmp2);
			return phase3Coord.get(tmp2);
		}, 3);
		var doPhase3Move = comb4FullMove.bind(null, Phase3Move);
		mathlib.createPrun(Phase3Prun, 0, 210 * 81 * 24, 14, doPhase3Move, 3, 4, 6);
		solv3 = new mathlib.Searcher(null, function(idx) {
			return Math.max(mathlib.getPruning(Phase3Prun, idx[0]), mathlib.getPruning(Phase3Prun, idx[1]), mathlib.getPruning(Phase3Prun, idx[2]));
		}, function(idx, move) {
			return [doPhase3Move(idx[0], move), doPhase3Move(idx[1], (move + 1) % 3), doPhase3Move(idx[2], (move + 2) % 3)];
		}, 3, 4);
	}

	function move2str(moves) {
		var ret = [];
		for (var i = 0; i < moves.length; i++) {
			ret.push(["U", "R", "F", "L", "BL", "BR", "DR", "DL", "DBL", "B", "DBR", "D"][moves[i][0]] + ["", "2", "2'", "'"][moves[i][1]]);
		}
		return ret.join(' ');
	}

	function solveKiloCubie(cc, useSym) {
		init();
		var kc0 = new KiloCubie();
		var kc1 = new KiloCubie();
		var kc2 = new KiloCubie();

		kc0.init(cc.perm, cc.twst);

		var idx;
		var tt = $.now();
		var sols = [];
		var solsym = 0;

		//phase1
		var idx1s = [];
		for (var s = 0; s < (useSym ? 12 : 1); s++) {
			KiloCubie.KiloMult3(KiloCubie.symCube[KiloCubie.symMulI[0][s * 5]], kc0, KiloCubie.symCube[s * 5], kc1);
			var val0 = phase1Coord.get(kc1, 3);
			KiloCubie.KiloMult3(KiloCubie.symCube[KiloCubie.symMulI[0][2]], kc1, KiloCubie.symCube[2], kc2);
			var val1 = phase1Coord.get(kc2, 3);
			idx1s.push([val0[0] * 27 * 6 + val0[1] * 27 + val0[2], val1[0] * 27 * 6 + val1[1] * 27 + val1[2]]);
		}
		var sol1s = solv1.solveMulti(idx1s, 0, 9);
		var ksym = sol1s[1] * 5;
		var sol1 = sol1s[0];
		KiloCubie.KiloMult3(KiloCubie.symCube[KiloCubie.symMulI[0][ksym]], kc0, KiloCubie.symCube[ksym], kc1);
		kc0.init(kc1.perm, kc1.twst);
		solsym = KiloCubie.symMult[solsym][ksym];
		for (var i = 0; i < sol1.length; i++) {
			var move = sol1[i];
			KiloCubie.KiloMult(kc0, KiloCubie.moveCube[move[0] * 4 + move[1]], kc1);
			kc0.init(kc1.perm, kc1.twst);
			move[0] = KiloCubie.symMulM[KiloCubie.symMulI[0][solsym]][move[0]];
		}
		DEBUG && console.log('[kilo] Phase1s in ', $.now() - tt, 'ms', sol1.length, 'move(s) sym=', ksym);

		//phase2
		tt = $.now();
		var idx2s = [];
		for (var s = 0; s < (useSym ? 5 : 1); s++) {
			KiloCubie.KiloMult3(KiloCubie.symCube[KiloCubie.symMulI[0][s]], kc0, KiloCubie.symCube[s], kc1);
			var val0 = phase2Coord.get(kc1, 3);
			KiloCubie.KiloMult3(KiloCubie.symCube[KiloCubie.symMulI[0][1]], kc1, KiloCubie.symCube[1], kc2);
			var val1 = phase2Coord.get(kc2, 3);
			idx2s.push([val0[0] * 27 * 6 + val0[1] * 27 + val0[2], val1[0] * 27 * 6 + val1[1] * 27 + val1[2]]);
		}
		var sol2s = solv2.solveMulti(idx2s, 0, 14);
		ksym = sol2s[1];
		var sol2 = sol2s[0];
		KiloCubie.KiloMult3(KiloCubie.symCube[KiloCubie.symMulI[0][ksym]], kc0, KiloCubie.symCube[ksym], kc1);
		kc0.init(kc1.perm, kc1.twst);
		solsym = KiloCubie.symMult[solsym][ksym];
		for (var i = 0; i < sol2.length; i++) {
			var move = sol2[i];
			KiloCubie.KiloMult(kc0, KiloCubie.moveCube[move[0] * 4 + move[1]], kc1);
			kc0.init(kc1.perm, kc1.twst);
			move[0] = KiloCubie.symMulM[KiloCubie.symMulI[0][solsym]][move[0]];
		}
		DEBUG && console.log('[kilo] Phase2s in ', $.now() - tt, 'ms', sol2.length, 'move(s) sym=', ksym);

		//phase3
		val0 = phase3Coord.get(kc0);
		KiloCubie.KiloMult3(KiloCubie.symCube[KiloCubie.symMulI[0][6]], kc0, KiloCubie.symCube[6], kc1);
		val1 = phase3Coord.get(kc1);
		KiloCubie.KiloMult3(KiloCubie.symCube[KiloCubie.symMulI[0][29]], kc0, KiloCubie.symCube[29], kc1);
		var val2 = phase3Coord.get(kc1);
		idx = [(val0[0] * 24 + val0[1]) * 81 + val0[2], (val1[0] * 24 + val1[1]) * 81 + val1[2], (val2[0] * 24 + val2[1]) * 81 + val2[2]];
		tt = $.now();
		var sol3 = solv3.solve(idx, 0, 14);
		DEBUG && console.log('[kilo] Phase3 in ', $.now() - tt, 'ms', sol3.length, 'move(s)');
		for (var i = 0; i < sol3.length; i++) {
			var move = sol3[i];
			move[0] = KiloCubie.symMulM[KiloCubie.symMulI[0][solsym]][move[0]];
		}
		DEBUG && console.log('[kilo] total length: ', sol1.length + sol2.length + sol3.length);
		return move2str(Array.prototype.concat(sol1, sol2, sol3));
	}

	function checkSolver() {
		init();
		var kc0 = new KiloCubie();
		var kc1 = new KiloCubie();
		var gen = [];
		for (var i = 0; i < 200; i++) {
			var move = mathlib.rn(12);
			gen.push([move, 0]);
			KiloCubie.KiloMult(kc0, KiloCubie.moveCube[move * 4], kc1);
			kc0.init(kc1.perm, kc1.twst);
		}
		return move2str(gen) + '   ' + solveKiloCubie(kc0, true);
	}

	return {
		KiloCubie: KiloCubie,
		solveKiloCubie: solveKiloCubie,
		checkSolver: DEBUG && checkSolver
	};
})();
