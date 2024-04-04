var ftosolver = (function() {
	"use strict";
	//face-turning octahedron cube w/o identical pieces
	function FtoCubie(cp, co, ep, uf, rl) {
		this.cp = (cp && cp.slice()) || [0, 1, 2, 3, 4, 5];
		this.co = (co && co.slice()) || [0, 0, 0, 0, 0, 0];
		this.ep = (ep && ep.slice()) || [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
		this.uf = (uf && uf.slice()) || [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
		this.rl = (rl && rl.slice()) || [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
	}

	var U = 0, F = 9, r = 18, l = 27, D = 36, B = 45, R = 54, L = 63;

	var cornFacelets = [
		[U + 0, R + 0, F + 0, L + 0],
		[U + 4, B + 8, r + 4, R + 8],
		[U + 8, L + 4, l + 8, B + 4],
		[l + 0, D + 0, r + 0, B + 0],
		[F + 4, D + 8, l + 4, L + 8],
		[r + 8, D + 4, F + 8, R + 4]
	];

	var edgeFacelets = [
		[U + 1, R + 3], [U + 3, L + 1], [U + 6, B + 6],
		[l + 1, D + 3], [r + 3, D + 1], [F + 6, D + 6],
		[F + 3, R + 1], [F + 1, L + 3], [l + 6, L + 6],
		[l + 3, B + 1], [r + 1, B + 3], [r + 6, R + 6]
	];

	var ctufFacelets = [
		U + 2, U + 5, U + 7,
		F + 2, F + 5, F + 7,
		r + 2, r + 5, r + 7,
		l + 2, l + 5, l + 7
	];

	var ctrlFacelets = [
		D + 2, D + 5, D + 7,
		B + 2, B + 5, B + 7,
		L + 2, L + 5, L + 7,
		R + 2, R + 5, R + 7
	];

	FtoCubie.prototype.isEqual = function(fc) {
		for (var i = 0; i < 12; i++) {
			if (this.ep[i] != fc.ep[i] || this.uf[i] != fc.uf[i] || this.rl[i] != fc.rl[i]
					|| i < 6 && (this.cp[i] != fc.cp[i] || this.co[i] != fc.co[i])) {
				return false;
			}
		}
		return true;
	}

	FtoCubie.prototype.toFaceCube = function(todiv) {
		var f = [];
		todiv = todiv || 9;
		var co = [];
		for (var i = 0; i < 6; i++) {
			co[i] = this.co[i] * 2;
		}
		mathlib.fillFacelet(cornFacelets, f, this.cp, co, todiv);
		mathlib.fillFacelet(edgeFacelets, f, this.ep, [], todiv);
		mathlib.fillFacelet(ctufFacelets, f, this.uf, null, todiv);
		mathlib.fillFacelet(ctrlFacelets, f, this.rl, null, todiv);
		return f;
	}

	FtoCubie.prototype.fromFacelet = function(facelet) {
		var count = 0;
		var f = [];
		for (var i = 0; i < 72; ++i) {
			f[i] = facelet[i];
			count += Math.pow(16, f[i]);
		}
		if (count != 0x99999999) {
			return -1;
		}
		var co = [];
		if (mathlib.detectFacelet(cornFacelets, f, this.cp, co, 9) == -1
				|| mathlib.detectFacelet(edgeFacelets, f, this.ep, [], 9) == -1) {
			return -1;
		}
		for (var i = 0; i < 6; i++) {
			this.co[i] = co[i] >> 1;
		}
		var remainCnts = [3, 3, 3, 3];
		for (var i = 0; i < 12; i++) {
			var col = f[ctufFacelets[i]];
			if (!(remainCnts[col] > 0)) {
				return -1;
			}
			this.uf[i] = col * 3 + 3 - remainCnts[col];
			remainCnts[col]--;
		}
		remainCnts = [3, 3, 3, 3];
		for (var i = 0; i < 12; i++) {
			var col = [0, 1, 3, 2][f[ctrlFacelets[i]] - 4];
			if (!(remainCnts[col] > 0)) {
				return -1;
			}
			this.rl[i] = col * 3 + 3 - remainCnts[col];
			remainCnts[col]--;
		}
		if (mathlib.getNParity(mathlib.getNPerm(this.uf, 12), 12) != 0) {
			for (var i = 0; i < 12; i++) { // swap 0 and 1 to fix parity
				this.uf[i] ^= this.uf[i] < 2 ? 1 : 0;
			}
		}
		if (mathlib.getNParity(mathlib.getNPerm(this.rl, 12), 12) != 0) {
			for (var i = 0; i < 12; i++) { // swap 0 and 1 to fix parity
				this.rl[i] ^= this.rl[i] < 2 ? 1 : 0;
			}
		}
		return this;
	}

	FtoCubie.prototype.toString = function(todiv) {
		var f = this.toFaceCube(todiv);
		var ret = '' +
			'  U8 U7 U6 U5 U4      B8 B7 B6 B5 B4\n' +
			'L4   U3 U2 U1   R8  r4   B3 B2 B1   l8\n' +
			'L5 L1   U0   R3 R7  r5 r1   B0   l3 l7\n' +
			'L6 L2 L0  R0 R2 R6  r6 r2 r0  l0 l2 l6\n' +
			'L7 L3   F0   R1 R5  r7 r3   D0   l1 l5\n' +
			'L8   F1 F2 F3   R4  r8   D1 D2 D3   l4\n' +
			'  F4 F5 F6 F7 F8      D4 D5 D6 D7 D8';
		ret = ret.replace(/([UFrlDBRL])([0-8])/g, function(m, p1, p2) {
			var i = 'UFrlDBRL'.indexOf(p1) * 9 + (~~p2);
			return 'UFrlDBRL' [~~(f[i] / 9)] + (f[i] % 9);
		});
		return ret;
	}

	FtoCubie.permMult = function(a, b, ab) {
		for (var i = 0; i < b.length; i++) {
			ab[i] = a[b[i]];
		}
	}

	FtoCubie.FtoMult = function() {
		var prod = arguments[arguments.length - 1] || new FtoCubie();
		for (var k = 0; k < arguments.length; k++) {
			var a = arguments[arguments.length - 1 - k];
			for (var i = 0; i < 6; i++) {
				prod.co[i] = k == 0 ? 0 : (a.co[prod.cp[i]] ^ prod.co[i]);
				prod.cp[i] = k == 0 ? i : a.cp[prod.cp[i]];
			}
			for (var i = 0; i < 12; i++) {
				prod.ep[i] = k == 0 ? i : a.ep[prod.ep[i]];
				prod.uf[i] = k == 0 ? i : a.uf[prod.uf[i]];
				prod.rl[i] = k == 0 ? i : a.rl[prod.rl[i]];
			}
		}
		return prod;
	}

	function initMoveCube() {
		var rotU = new FtoCubie( //move[U]
			[1, 2, 0, 4, 5, 3], [0, 0, 0, 0, 0, 0], [2, 0, 1, 5, 3, 4, 10, 11, 6, 7, 8, 9],
			[1, 2, 0, 7, 8, 6, 10, 11, 9, 4, 5, 3], [2, 0, 1, 8, 6, 7, 11, 9, 10, 5, 3, 4]);
		var rotR = new FtoCubie( //move[R]
			[5, 0, 4, 2, 3, 1], [1, 1, 0, 1, 1, 0], [6, 5, 7, 9, 2, 10, 11, 4, 3, 8, 1, 0],
			[5, 3, 4, 8, 6, 7, 2, 0, 1, 11, 9, 10], [4, 5, 3, 7, 8, 6, 1, 2, 0, 10, 11, 9]);

		var rotUi = FtoCubie.FtoMult(rotU, rotU, null);
		var rotRi = FtoCubie.FtoMult(rotR, rotR, null);
		var rotL = FtoCubie.FtoMult(rotUi, rotR, rotU, null);
		var rotF = FtoCubie.FtoMult(rotR, rotU, rotRi, null);

		var moveCube = [];
		moveCube[0] = new FtoCubie( //moveU
			[1, 2, 0, 3, 4, 5], [0, 0, 0, 0, 0, 0], [2, 0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11],
			[1, 2, 0, 3, 4, 5, 6, 7, 8, 9, 10, 11], [0, 1, 2, 3, 6, 7, 11, 9, 8, 5, 10, 4]);
		moveCube[2] = new FtoCubie( //moveF
			[4, 1, 2, 3, 5, 0], [1, 0, 0, 0, 1, 0], [0, 1, 2, 3, 4, 6, 7, 5, 8, 9, 10, 11],
			[0, 1, 2, 4, 5, 3, 6, 7, 8, 9, 10, 11], [0, 9, 10, 3, 4, 5, 2, 7, 1, 8, 6, 11]);
		moveCube[4] = new FtoCubie( //mover
			[0, 5, 2, 1, 4, 3], [0, 1, 0, 0, 0, 1], [0, 1, 2, 3, 10, 5, 6, 7, 8, 9, 11, 4],
			[0, 1, 2, 3, 4, 5, 7, 8, 6, 9, 10, 11], [5, 3, 2, 11, 4, 10, 6, 7, 8, 9, 0, 1]);
		moveCube[6] = new FtoCubie( //movel
			[0, 1, 3, 4, 2, 5], [0, 0, 1, 1, 0, 0], [0, 1, 2, 8, 4, 5, 6, 7, 9, 3, 10, 11],
			[0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 9], [8, 1, 7, 2, 0, 5, 6, 3, 4, 9, 10, 11]);
		moveCube[8] = new FtoCubie( //moveD
			[0, 1, 2, 5, 3, 4], [0, 0, 0, 0, 0, 0], [0, 1, 2, 4, 5, 3, 6, 7, 8, 9, 10, 11],
			[0, 1, 2, 3, 9, 10, 5, 7, 4, 8, 6, 11], [1, 2, 0, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
		moveCube[10] = new FtoCubie( //moveB
			[0, 3, 1, 2, 4, 5], [0, 1, 1, 0, 0, 0], [0, 1, 10, 3, 4, 5, 6, 7, 8, 2, 9, 11],
			[0, 6, 7, 3, 4, 5, 11, 9, 8, 2, 10, 1], [0, 1, 2, 4, 5, 3, 6, 7, 8, 9, 10, 11]);
		moveCube[12] = new FtoCubie( //moveR
			[5, 0, 2, 3, 4, 1], [1, 1, 0, 0, 0, 0], [6, 1, 2, 3, 4, 5, 11, 7, 8, 9, 10, 0],
			[5, 3, 2, 8, 4, 7, 6, 0, 1, 9, 10, 11], [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 9]);
		moveCube[14] = new FtoCubie( //moveL
			[2, 1, 4, 3, 0, 5], [1, 0, 1, 0, 0, 0], [0, 8, 2, 3, 4, 5, 6, 1, 7, 9, 10, 11],
			[11, 1, 10, 2, 0, 5, 6, 7, 8, 9, 3, 4], [0, 1, 2, 3, 4, 5, 7, 8, 6, 9, 10, 11]);
		moveCube[16] = FtoCubie.FtoMult(rotU, moveCube[8], null); // moveUw = [U] * D
		moveCube[18] = FtoCubie.FtoMult(rotF, moveCube[10], null); // moveFw = [F] * B
		moveCube[20] = FtoCubie.FtoMult(rotR, moveCube[6], null); // moveRw = [R] * l
		moveCube[22] = FtoCubie.FtoMult(rotL, moveCube[4], null); // moveLw = [L] * r

		for (var i = 1; i < 24; i += 2) {
			moveCube[i] = new FtoCubie();
			FtoCubie.FtoMult(moveCube[i - 1], moveCube[i - 1], moveCube[i]);
		}

		var moveHash = [];
		for (var i = 0; i < 24; i ++) {
			moveHash[i] = moveCube[i].ep.join(',');
		}
		//init sym
		var symCube = [];
		var symMult = [];
		var symMulI = [];
		var symMulM = [];
		var symHash = [];
		var fc = new FtoCubie();
		var fc2 = new FtoCubie();
		var tmp;
		for (var s = 0; s < 12; s++) {
			symCube[s] = new FtoCubie(fc.cp, fc.co, fc.ep, fc.uf, fc.rl);
			symHash[s] = symCube[s].ep.join(',');
			symMult[s] = [];
			symMulI[s] = [];
			fc = FtoCubie.FtoMult(fc, rotU, null);
			if (s % 3 == 2) { // [F] or [R]
				fc = FtoCubie.FtoMult(fc, rotR, rotU, null);
			}
			if (s % 6 == 5) {
				fc = FtoCubie.FtoMult(fc, rotU, rotR, null);
			}
		}
		for (var i = 0; i < 12; i++) {
			for (var j = 0; j < 12; j++) {
				FtoCubie.FtoMult(symCube[i], symCube[j], fc);
				var k = symHash.indexOf(fc.ep.join(','));
				symMult[i][j] = k;
				symMulI[k][j] = i;
			}
		}
		for (var s = 0; s < 12; s++) {
			symMulM[s] = [];
			for (var j = 0; j < 8; j++) {
				FtoCubie.FtoMult(symCube[symMulI[0][s]], moveCube[j * 2], symCube[s], fc);
				var k = moveHash.indexOf(fc.ep.join(','));
				symMulM[s][j] = k >> 1;
			}
		}
		FtoCubie.moveCube = moveCube;
		FtoCubie.symCube = symCube;
		FtoCubie.symMult = symMult;
		FtoCubie.symMulI = symMulI;
		FtoCubie.symMulM = symMulM;
	};

	initMoveCube();

	function ftoPermMove(key, perm, move) {
		var ret = [];
		var movePerm = FtoCubie.moveCube[move][key];
		for (var i = 0; i < 12; i++) {
			ret[i] = perm[movePerm[i]];
		}
		return ret;
	}

	function ftoFullMove(fc, move) {
		return FtoCubie.FtoMult(fc, FtoCubie.moveCube[move], null);
	}

	function phase1EdgeHash(ep) {
		var ret = 0;
		var e3fst = -1;
		for (var i = 0; i < 12; i++) {
			if ((0x638 >> ep[i] & 1) == 0) {
				continue;
			}
			if ((0x38 >> ep[i] & 1) != 0) {
				if (e3fst == -1) {
					e3fst = ep[i]
				}
				ret += Math.pow(16, i) * ((ep[i] - e3fst + 3) % 3 + 3);
			} else {
				ret += Math.pow(16, i) * ep[i];
			}
		}
		return ret;
	}

	function phase1CcufHash(fc) {
		var ret = 0;
		for (var i = 0; i < 12; i++) {
			if (fc.uf[i] == 6 || fc.uf[i] == 9) {
				ret |= (fc.uf[i] == 6 ? 1 : 2) << (i * 2);
			}
		}
		var cidx = fc.cp.indexOf(3);
		ret |= cidx << 25 | fc.co[cidx] << 24;
		return ret;
	}

	function phase1CtrlHash(rl) {
		var ret = 0;
		for (var i = 0; i < 12; i++) {
			if (rl[i] < 4) {
				ret |= (rl[i] < 3 ? 1 : 2) << (i * 2);
			}
		}
		return ret;
	}

	function phase2EdgeHash(ep) {
		var edge2group = [0, 1, 2, 3, 3, 3, 0, 1, 1, 2, 2, 0];
		var groups = [[0, 6, 11], [1, 7, 8], [2, 9, 10], [3, 4, 5]];
		var ret = 0;
		var egoff = [-1, -1, -1, -1];
		for (var i = 0; i < 12; i++) {
			var g = edge2group[ep[i]];
			var gidx = groups[g].indexOf(ep[i]);
			if (egoff[g] == -1) {
				egoff[g] = gidx;
			}
			ret += (g * 4 + (gidx - egoff[g] + 3) % 3) * Math.pow(16, i);
		}
		return ret;
	}

	function phase2CtHash(ct) {
		var ret = 0;
		for (var i = 0; i < 12; i++) {
			ret |= ~~(ct[i] / 3) << (i * 2);
		}
		return ret;
	}

	function phase3EdgeHash(ep) {
		return String.fromCharCode.apply(null, ep);
	}

	function phase3CcufHash(fc) {
		return String.fromCharCode.apply(null, [].concat(fc.cp, fc.co));
	}

	function randomMoves(validMoves, len) {
		var scramble = [];
		for (var i = 0; i < len; i++) {
			scramble.push(validMoves[~~(Math.random() * validMoves.length)]);
		}
		var fc = new FtoCubie();
		for (var i = 0; i < scramble.length; i++) {
			fc = FtoCubie.FtoMult(fc, FtoCubie.moveCube[scramble[i]], null);
		}
		return [fc, scramble];
	}

	function genCkmv(moves) {
		var ckmv = [];
		var tmp1 = new FtoCubie();
		var tmp2 = new FtoCubie();
		for (var m1 = 0; m1 < moves.length; m1++) {
			ckmv[m1] = 1 << m1;
			for (var m2 = 0; m2 < m1; m2++) {
				FtoCubie.FtoMult(FtoCubie.moveCube[moves[m1]], FtoCubie.moveCube[moves[m2]], tmp1);
				FtoCubie.FtoMult(FtoCubie.moveCube[moves[m2]], FtoCubie.moveCube[moves[m1]], tmp2);
				if (tmp1.isEqual(tmp2)) {
					ckmv[m1] |= 1 << m2;
				}
			}
		}
		return ckmv;
	}

	var phase1Moves = [0, 2, 12, 14, 16, 18, 20, 22];
	var p1epMoves = null;
	var p1rlMoves = null;
	var p1ufMoves = null;
	var ckmv1 = null;
	var solv1 = null;

	var pyraSymCube = [];
	for (var i = 0; i < 12; i++) {
		pyraSymCube.push(new FtoCubie(
			FtoCubie.symCube[i].cp,
			FtoCubie.symCube[i].co,
			null,
			FtoCubie.symCube[i].uf,
			null
		));
	}

	function phase1Init() {
		var fc = new FtoCubie();
		p1epMoves = mathlib.createMoveHash(fc.ep.slice(), phase1Moves, phase1EdgeHash, ftoPermMove.bind(null, 'ep'));
		p1rlMoves = mathlib.createMoveHash(fc.rl.slice(), phase1Moves, phase1CtrlHash, ftoPermMove.bind(null, 'rl'));
		p1ufMoves = mathlib.createMoveHash(new FtoCubie(), phase1Moves, phase1CcufHash, ftoFullMove);
		var p1epPrun = [];
		var p1ctPrun = [];
		var p1cePrun = [];
		mathlib.createPrun(p1epPrun, 0, 31680, 14, p1epMoves[0], 8, 2);
		mathlib.createPrun(p1ctPrun, 0, 1980 * 132, 14, function(idx, move) {
			var rl = ~~(idx / 132);
			var uf = idx % 132;
			return p1rlMoves[0][move][rl] * 132 + p1ufMoves[0][move][uf];
		}, 8, 2);
		mathlib.createPrun(p1cePrun, 0, 31680 * 132, 5, function(idx, move) {
			var ep = ~~(idx / 132);
			var uf = idx % 132;
			return p1epMoves[0][move][ep] * 132 + p1ufMoves[0][move][uf];
		}, 8, 2);
		ckmv1 = genCkmv(phase1Moves);
		solv1 = new mathlib.Searcher(null, function(idx) {
			return Math.max(
				mathlib.getPruning(p1epPrun, idx[0]),
				mathlib.getPruning(p1ctPrun, idx[1] * 132 + idx[2]),
				Math.min(7, mathlib.getPruning(p1cePrun, idx[0] * 132 + idx[2]))
			);
		}, function(idx, move) {
			return [
				p1epMoves[0][move][idx[0]],
				p1rlMoves[0][move][idx[1]],
				p1ufMoves[0][move][idx[2]]
			];
		}, 8, 2, ckmv1);
	}

	function phase1GenIdxs(fc) {
		var idxs = [];
		var syms = [];
		var fc2 = new FtoCubie();
		var fc3 = new FtoCubie();

		var rlbmap = [0, 1, 2, 4, 5, 3, 6, 7, 8, 9, 10, 11];
		var emap = [0, 1, 9, 3, 4, 5, 6, 7, 8, 10, 2, 11];

		for (var sidx = 0; sidx < 12 * pyraSymCube.length; sidx++) {
			FtoCubie.FtoMult(pyraSymCube[~~(sidx / 12)], FtoCubie.symCube[sidx % 12], fc, fc2);
			var rot;
			for (rot = 0; rot < 12; rot++) {
				FtoCubie.FtoMult(fc2, FtoCubie.symCube[rot], fc3);
				if (fc3.cp[3] == 3 && fc3.co[3] == 0) {
					break;
				}
			}
			var epidxs = [];
			var rlidxs = [];
			var ufidxs = [];
			for (var i = 0; i < 3; i++) {
				epidxs.push(p1epMoves[1][phase1EdgeHash(fc3.ep)]);
				rlidxs.push(p1rlMoves[1][phase1CtrlHash(fc3.rl)]);
				FtoCubie.permMult(emap, fc3.ep, fc3.ep);
				FtoCubie.permMult(rlbmap, fc3.rl, fc3.rl);
			}
			for (var ufi = 0; ufi < 9; ufi++) {
				ufidxs.push(p1ufMoves[1][phase1CcufHash(fc3)]);
				FtoCubie.permMult(p1uflmap, fc3.uf, fc3.uf);
				if (ufi % 3 == 2) {
					FtoCubie.permMult(p1ufrmap, fc3.uf, fc3.uf);
				}
			}
			for (var ctidx = 0; ctidx < 81; ctidx++) {
				idxs.push([
					epidxs[~~(ctidx / 9 / 3)],
					rlidxs[~~(ctidx / 9) % 3],
					ufidxs[ctidx % 9]
				]);
				syms.push([sidx, rot]);
			}
		}
		return [idxs, syms];
	}

	function phase1ProcSol(sol, solsym, fc) {
		for (var i = 0; i < sol.length; i++) {
			sol[i] = phase1Moves[sol[i][0]] + sol[i][1];
		}
		var std = move2std(sol);
		for (var i = 0; i < std[0].length; i++) {
			var move = std[0][i];
			sol[i] = FtoCubie.symMulM[FtoCubie.symMulI[0][solsym[1]]][move >> 1] * 2 + (move & 1);
			fc = FtoCubie.FtoMult(fc, FtoCubie.moveCube[sol[i]], null);
		}
		solsym[1] = FtoCubie.symMulI[solsym[1]][std[1]];
		fc = FtoCubie.FtoMult(
			pyraSymCube[~~(solsym[0] / 12)], FtoCubie.symCube[solsym[0] % 12],
			fc, FtoCubie.symCube[solsym[1]], null
		);

		if (~~(fc.uf[6] / 3) != 2 || ~~(fc.uf[9] / 3) != 3) {
			debugger;
		}
		while (fc.uf[6] != 6) {
			FtoCubie.permMult(p1uflmap, fc.uf, fc.uf);
		}
		while (fc.uf[9] != 9) {
			FtoCubie.permMult(p1ufrmap, fc.uf, fc.uf);
		}
		return [fc, sol, solsym[0], solsym[1]];
	}

	var p1uflmap = [0, 1, 2, 3, 4, 5, 7, 8, 6, 9, 10, 11];
	var p1ufrmap = [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 9];
	var N_PHASE1_SOLS = 10;

	function solvePhase1(fc) {
		if (!solv1) {
			phase1Init();
		}

		var tt = +new Date();
		var idxs = phase1GenIdxs(fc);
		var syms = idxs[1];
		idxs = idxs[0];

		var p1sols = [];

		var sol1s = solv1.solveMulti(idxs, 12, function(sol, sidx) {
			var param = phase1ProcSol(sol.slice(), syms[sidx].slice(), fc);
			p1sols.push(param);
			return p1sols.length >= N_PHASE1_SOLS;
		});

		var tt = +new Date - tt;
		for (var i = 0; i < p1sols.length; i++) {
			p1sols[i].push(tt);
		}
		return p1sols;
	}

	var phase2Moves = [0, 12, 14];
	var p2epMoves = null;
	var p2rlMoves = null;
	var p2ufMoves = null;
	var p2ccMoves = null;
	var ckmv2 = null;
	var solv2 = null;

	var cornExFacelets = [
		[U + 2, R + 2, F + 2, L + 2],
		[U + 5, B + 7, r + 5, R + 7],
		[U + 7, L + 5, l + 7, B + 5],
		[l + 2, D + 2, r + 2, B + 2],
		[F + 5, D + 7, l + 5, L + 7],
		[r + 7, D + 5, F + 7, R + 5]
	];

	function phase2CpcoHash(fc) {
		var co = [];
		for (var i = 0; i < 6; i++) {
			co[i] = fc.co[i] * 2;
		}
		var facelet = fc.toFaceCube();
		mathlib.fillFacelet(cornExFacelets, facelet, fc.cp, co, 9);
		var fc2 = new FtoCubie();
		fc2.fromFacelet(facelet);
		return [].concat(fc2.cp, fc2.co, p2ufMoves[1][phase2CtHash(fc2.uf)]).join(',');
	}

	function phase2Init() {
		var fc = new FtoCubie();
		p2epMoves = mathlib.createMoveHash(fc.ep.slice(), phase2Moves, phase2EdgeHash, ftoPermMove.bind(null, 'ep'));
		p2rlMoves = mathlib.createMoveHash(fc.rl.slice(), phase2Moves, phase2CtHash, ftoPermMove.bind(null, 'rl'));
		p2ufMoves = mathlib.createMoveHash(fc.uf.slice(), phase2Moves, phase2CtHash, ftoPermMove.bind(null, 'uf'));
		p2ccMoves = mathlib.createMoveHash(fc, phase2Moves, phase2CpcoHash, ftoFullMove);

		var solved = {};
		var solvedc0 = [];
		var p2c0Map = [[], []]
		for (var key in p2ccMoves[1]) {
			var cc = p2ccMoves[1][key];
			key = key.split(',');
			var uf = parseInt(key[12]);
			solved[uf * 960 + cc] = true;
			var pos0 = key.indexOf('0');
			var subidx = pos0 * 2 + parseInt(key[pos0 + 6]);
			p2c0Map[0][subidx] = cc;
			p2c0Map[1][cc] = subidx;
			solvedc0.push(uf * 12 + subidx);
		}

		var p2subPrun = [];
		mathlib.createPrun(p2subPrun, solvedc0, 25200 * 12, 14, function(idx, move) {
			var uf = ~~(idx / 12);
			var cc = p2c0Map[0][idx % 12];
			return p2ufMoves[0][move][uf] * 12 + p2c0Map[1][p2ccMoves[0][move][cc]];
		}, 3, 2);

		var p2eprlPrun = [];
		mathlib.createPrun(p2eprlPrun, 0, 280 * 560, 14, function(idx, move) {
			var rl = ~~(idx / 280);
			var ep = idx % 280;
			return p2rlMoves[0][move][rl] * 280 + p2epMoves[0][move][ep];
		}, 3, 2);
		ckmv2 = genCkmv(phase2Moves);

		solv2 = new mathlib.Searcher(function(idx) {
			return solved[idx[3] * 960 + idx[2]];
		}, function(idx) {
			return Math.max(
				mathlib.getPruning(p2eprlPrun, idx[1] * 280 + idx[0]),
				mathlib.getPruning(p2subPrun, idx[3] * 12 + p2c0Map[1][idx[2]])
			);
		}, function(idx, move) {
			return [
				p2epMoves[0][move][idx[0]],
				p2rlMoves[0][move][idx[1]],
				p2ccMoves[0][move][idx[2]],
				p2ufMoves[0][move][idx[3]],
			];
		}, 3, 2, ckmv2);
	}

	function solvePhase2(solvInfos) {
		if (!solv2) {
			phase2Init();
		}
		var tt = +new Date();
		var idxs = [];
		for (var i = 0; i < solvInfos.length; i++) {
			idxs.push([
				p2epMoves[1][phase2EdgeHash(solvInfos[i][0].ep)],
				p2rlMoves[1][phase2CtHash(solvInfos[i][0].rl)],
				p2ccMoves[1][phase2CpcoHash(solvInfos[i][0])],
				p2ufMoves[1][phase2CtHash(solvInfos[i][0].uf)],
			]);
		}
		var sol2s = solv2.solveMulti(idxs, 25);
		var sol = sol2s[0];
		var src = sol2s[1];
		var solvInfo = solvInfos[src];
		var fc = solvInfo[0];
		for (var i = 0; i < sol.length; i++) {
			var move = phase2Moves[sol[i][0]] + sol[i][1];
			sol[i] = FtoCubie.symMulM[FtoCubie.symMulI[0][solvInfo[3]]][move >> 1] * 2 + (move & 1);
			fc = FtoCubie.FtoMult(fc, FtoCubie.moveCube[move], null);
		}
		return [fc, sol, solvInfo[2], solvInfo[3], src, +new Date - tt];
	}

	var phase3Moves = [8, 10, 12, 14];
	var p3epMoves = null;
	var p3ufMoves = null;
	var p3epPrun = null;
	var p3ufPrun = null;
	var ckmv3 = null;
	var solv3 = null;

	function phase3Init() {
		var fc = new FtoCubie();
		p3epMoves = mathlib.createMoveHash(fc.ep.slice(), phase3Moves, phase3EdgeHash, ftoPermMove.bind(null, 'ep'));
		p3ufMoves = mathlib.createMoveHash(new FtoCubie(), phase3Moves, phase3CcufHash, ftoFullMove);
		p3epPrun = [];
		p3ufPrun = [];
		mathlib.createPrun(p3epPrun, 0, 81, 14, p3epMoves[0], 4, 2);
		mathlib.createPrun(p3ufPrun, 0, 11520, 14, p3ufMoves[0], 4, 2);
		ckmv3 = genCkmv(phase3Moves);

		solv3 = new mathlib.Searcher(function(idx) {
			return idx[0] == 0 && idx[1] == 0;
		}, function(idx) {
			return Math.max(
				mathlib.getPruning(p3epPrun, idx[0]),
				mathlib.getPruning(p3ufPrun, idx[1])
			);
		}, function(idx, move) {
			return [p3epMoves[0][move][idx[0]], p3ufMoves[0][move][idx[1]]];
		}, 4, 2, ckmv3);
	}

	function solvePhase3(solvInfo) {
		var fc = solvInfo[0];
		if (!p3epPrun) {
			phase3Init();
		}

		var tt = +new Date();
		var p3epidx = p3epMoves[1][phase3EdgeHash(fc.ep)];
		var p3ufidx = p3ufMoves[1][phase3CcufHash(fc)];

		var sol = solv3.solve([p3epidx, p3ufidx], 25);

		for (var i = 0; i < sol.length; i++) {
			var move = phase3Moves[sol[i][0]] + sol[i][1];
			sol[i] = FtoCubie.symMulM[FtoCubie.symMulI[0][solvInfo[3]]][move >> 1] * 2 + (move & 1);

			fc = FtoCubie.FtoMult(fc, FtoCubie.moveCube[move], null);
		}
		return [fc, sol, solvInfo[2], solvInfo[3], +new Date - tt];
	}

	// convert wide moves to face moves
	function move2std(moves) {
		var sym = 0;
		var ret = [];
		// Uw = [U] * D, Fw = [F] * B, Rw = [R] * l, Lw = [L] * r
		var w2axis = [4, 5, 3, 2];
		var w2rot = [1, 10, 5, 11];
		for (var i = 0; i < moves.length; i++) {
			var rot = 0;
			var axis = moves[i] >> 1;
			var pow = moves[i] & 1;
			if (axis >= 8) {
				rot = w2rot[axis - 8];
				axis = w2axis[axis - 8];
			}
			if (!pow) {
				rot = FtoCubie.symMult[rot][rot];
			}
			ret.push(FtoCubie.symMulM[sym][axis] * 2 + pow);
			sym = FtoCubie.symMult[rot][sym];
		}
		return [ret, sym];
	}

	function applyMoves(fc, moves) {
		for (var i = 0; i < moves.length; i++) {
			fc = FtoCubie.FtoMult(fc, FtoCubie.moveCube[moves[i]], null);
		}
		return fc;
	}

	var move2str = ["U", "U'", "F", "F'", "r", "r'", "l", "l'", "D", "D'", "B", "B'", "R", "R'", "L", "L'"]

	function prettyMoves(moves) {
		var buf = [];
		for (var i = 0; i < moves.length; i++) {
			buf[i] = move2str[moves[i]];
		}
		return buf.join(' ').replace(/l/g, 'BL').replace(/r/g, 'BR');
	}

	function FtoSolver() {}

	FtoSolver.prototype.solveFto = function(fc, invSol) {
		if (!solv1) {
			var tt = +new Date;
			phase1Init();
			phase2Init();
			phase3Init();
			DEBUG && console.log('[ftosolver] init time:', +new Date - tt);
		}
		var solvInfos = solvePhase1(fc);

		var solvInfo2 = solvePhase2(solvInfos);

		var solvInfo1 = solvInfos[solvInfo2[4]];
		this.sol1 = solvInfo1[1].slice();
		this.tt1 = solvInfo1[4];
		var sym1Idx = solvInfo1[2];

		this.sol2 = solvInfo2[1].slice();
		this.tt2 = solvInfo2[5];
		solvInfo2[0] = FtoCubie.FtoMult(pyraSymCube[FtoCubie.symMulI[0][~~(sym1Idx / 12)]], solvInfo2[0], null);

		var solvInfo3 = solvePhase3(solvInfo2);
		this.sol3 = solvInfo3[1].slice();
		this.tt3 = solvInfo3[4];

		var sol = [].concat(this.sol1, this.sol2, this.sol3);
		if (invSol) {
			for (var i = 0; i < sol.length; i++) {
				sol[i] ^= 1;
			}
			sol.reverse();
		}
		return prettyMoves(sol);
	}

	var solver = new FtoSolver();

	function solveTest(n_moves) {
		var solvInfo = randomMoves([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], n_moves);

		var scramble = prettyMoves(solvInfo[1].slice());
		var solution = solver.solveFto(solvInfo[0]);

		var fc = solvInfo[0];
		DEBUG && console.log('scrambled state\n', fc.toString(1));
		fc = applyMoves(fc, solver.sol1);
		DEBUG && console.log('after phase 1 (' + prettyMoves(solver.sol1) + '):\n', fc.toString(1));
		fc = applyMoves(fc, solver.sol2);
		DEBUG && console.log('after phase 2 (' + prettyMoves(solver.sol2) + '):\n', fc.toString(1));
		fc = applyMoves(fc, solver.sol3);
		DEBUG && console.log('after phase 3 (' + prettyMoves(solver.sol3) + '):\n', fc.toString(1));

		var facelets = fc.toFaceCube();
		var isSolved = true;
		out: for (var i = 0; i < 8; i++) {
			for (var j = 1; j < 9; j++) {
				if (facelets[i * 9 + j] != facelets[i * 9]) {
					isSolved = false;
					break out;
				}
			}
		}
		if (!isSolved) {
			console.log('error, FTO not solved!!!');
		}

		DEBUG && console.log(scramble, solution);
		return [
			solver.sol1.length + solver.sol2.length + solver.sol3.length,
			solver.sol1.length,
			solver.sol2.length,
			solver.sol3.length,
			solver.tt1,
			solver.tt2,
			solver.tt3
		];
	}

	function testbench(ntest) {
		var ntest = ntest || 100;
		var cumlen = [];
		for (var nsolv = 0; nsolv < ntest; nsolv++) {
			var lengths = solveTest(200);
			for (var i = 0; i < lengths.length; i++) {
				cumlen[i] = (cumlen[i] || 0) + lengths[i];
			}
			console.log('AvgL: ', cumlen[0] / (nsolv + 1));
		}
		console.log('AvgL1:', cumlen[1] / ntest);
		console.log('AvgL2:', cumlen[2] / ntest);
		console.log('AvgL3:', cumlen[3] / ntest);
		console.log('AvgT1:', cumlen[4] / ntest);
		console.log('AvgT2:', cumlen[5] / ntest);
		console.log('AvgT3:', cumlen[6] / ntest);
	}

	function solveFacelet(facelet, invSol) {
		var fc = new FtoCubie();
		if (fc.fromFacelet(facelet) == -1) {
			return "FTO Solver ERROR!";
		}
		return solver.solveFto(fc, invSol);
	}

	function getRandomScramble() {
		var fc = new ftosolver.FtoCubie();
		fc.ep = mathlib.rndPerm(12, true);
		fc.uf = mathlib.rndPerm(12, true);
		fc.rl = mathlib.rndPerm(12, true);
		fc.cp = mathlib.rndPerm(6, true);
		mathlib.setNOri(fc.co, mathlib.rn(32), 6, -2);
		return ftosolver.solveFacelet(fc.toFaceCube(), true);
	}

	function getLNTScramble(ufs) {
		var solved = false;
		var nCorn = ufs.length >> 1;
		var fc = new ftosolver.FtoCubie();
		var cp, co, uf;
		do {
			cp = mathlib.rndPerm(nCorn, true);
			co = mathlib.setNOri([], mathlib.rn(1 << nCorn >> 1), nCorn, -2);
			uf = mathlib.rndPerm(ufs.length, true);
			solved = true;
			for (var i = 0; i < ufs.length; i++) {
				solved = solved && (~~(ufs[uf[i]] / 3) == ~~(ufs[i] / 3));
			}
			for (var i = 0; i < nCorn; i++) {
				solved = solved && cp[i] == i && co[i] == 0;
			}
		} while (solved);
		for (var i = 0; i < nCorn; i++) {
			fc.cp[i] = cp[i];
			fc.co[i] = co[i];
		}
		for (var i = 0; i < ufs.length; i++) {
			fc.uf[ufs[i]] = ufs[uf[i]];
		}
		return ftosolver.solveFacelet(fc.toFaceCube(), true);
	}

	scrMgr.reg('ftoso', getRandomScramble)
		('ftol3t', getLNTScramble.bind(null, [0, 1, 2, 3, 7, 11]))
		('ftol4t', getLNTScramble.bind(null, [0, 1, 2, 3, 6, 7, 9, 11]));

	return {
		getRandomScramble: getRandomScramble,
		solveFacelet: solveFacelet,
		FtoCubie: FtoCubie,
		testbench: testbench
	}
})();
