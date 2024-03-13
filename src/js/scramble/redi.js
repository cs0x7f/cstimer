var redi = (function() {
	var edgeMoveSwaps = [
		[1, 0, 8], // F
		[2, 1, 9], // L
		[3, 2, 10], // B
		[0, 3, 11], // R
		[4, 5, 8], // f
		[5, 6, 9], // l
		[6, 7, 10], // b
		[7, 4, 11]  // r
	];

	var edgeMoveSwaps2 = [
		[1, 0, 4], // F
		[2, 1, 5], // L
		[3, 2, 6], // B
		[0, 3, 7]  // R
	];

	function phase2EdgeMove(arr, move) {
		mathlib.acycle(arr, edgeMoveSwaps2[move], 1);
	}

	function phase2CornMove(arr, move) {
		arr[move] = (arr[move] + 1) % 3;
	}

	function getPhase1EdgeComb(ep) {
		var idxComb = 0;
		var permR = [];
		var r = 4;
		for (var i = 11; i >= 0; i--) {
			if ((ep[i] & 0xc) == 4) {
				idxComb += mathlib.Cnk[i][r--];
				permR[r] = ep[i] & 0x3;
			}
		}
		return [idxComb, mathlib.getNPerm(permR, 4)];
	}

	function setPhase1EdgeComb(ep, idx) {
		var fill = 11;
		var r = 4;
		for (var i = 11; i >= 0; i--) {
			if (idx >= mathlib.Cnk[i][r]) {
				idx -= mathlib.Cnk[i][r--];
				ep[i] = r + 4;
			} else {
				ep[i] = fill--;
				if ((fill & 0xc) == 4) {
					fill -= 4;
				}
			}
		}
		return ep;
	}

	function phase1EdgeCombMove(idx, move) {
		var ep = setPhase1EdgeComb([], idx);
		mathlib.acycle(ep, edgeMoveSwaps[move], 1);
		return getPhase1EdgeComb(ep);
	}

	function phase1EdgeMove(idx, move) {
		var slice = ~~(idx / 24);
		var perm = idx % 24;
		var val = edgeCombMove[move][slice];
		slice = val[0];
		perm = perm4Mult[perm][val[1]];
		return slice * 24 + perm;
	}

	function phase1CornMove(idx, move) {
		if (move < 4) {
			return idx;
		}
		var co = cornCoord.set([], idx);
		co[move - 4] = (co[move - 4] + 1) % 3;
		return cornCoord.get(co);
	}

	function prettySolution(sol) {
		var ret = [];
		for (var i = 0; i < sol.length; i++) {
			ret.push('FLBRflbr'[sol[i][0]] + ["", "'"][sol[i][1]]);
		}
		return ret.join(' ');
	}

	var perm4Mult = [];
	var edgeCombMove = [];
	var cornMove = [];
	var cornCoord = null;
	var phase1EdgePrun = [];
	var phase1CornPrun = [];
	var solv1 = null;
	var solv2 = null;

	function init() {
		if (solv1) {
			return;
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

		DEBUG = true;

		cornCoord = new mathlib.coord('o', 4, 3);
		mathlib.createMove(cornMove, 81, phase1CornMove, 8);
		mathlib.createMove(edgeCombMove, 495, phase1EdgeCombMove, 8);

		mathlib.createPrun(phase1CornPrun, 0, 81, 4, cornMove, 8, 2);
		mathlib.createPrun(phase1EdgePrun, 1656, 495 * 24, 8, phase1EdgeMove, 8, 2);

		solv1 = new mathlib.Searcher(function(idx) {
			return idx[0] == 0 && idx[1] == 1656;
		}, function(idx) {
			return Math.max(mathlib.getPruning(phase1CornPrun, idx[0]), mathlib.getPruning(phase1EdgePrun, idx[1]));
		}, function(idx, move) {
			var idx1 = [cornMove[move][idx[0]], phase1EdgeMove(idx[1], move)];
			if (idx1[0] == idx[0] && idx1[1] == idx[1]) {
				return null;
			}
			return idx1;
		}, 8, 2);

		solv2 = new mathlib.Solver(4, 2, [
			[0, [phase2CornMove, 'o', 4, 3], 81],
			[0, [phase2EdgeMove, 'p', 8, -1], 20160]
		]);
	}

	function solveRedi(ep, co) {
		var p1eidx = getPhase1EdgeComb(ep);
		var p1cidx = cornCoord.get(co.slice(4));
		var sol1 = solv1.solve([p1cidx, p1eidx[0] * 24 + p1eidx[1]], 15);

		for (var i = 0; i < sol1.length; i++) {
			var axis = sol1[i][0];
			var pow = sol1[i][1] + 1;
			mathlib.acycle(ep, edgeMoveSwaps[axis], pow);
			co[axis] = (co[axis] + pow) % 3;
		}
		var ep2 = [];
		for (var i = 0; i < 8; i++) {
			var j = i < 4 ? i : i + 4;
			ep2[i] = ep[j] < 4 ? ep[j] : ep[j] - 4;
		}
		var p2eidx = mathlib.get8Perm(ep2, 8, -1);
		var p2cidx = cornCoord.get(co);
		var sol2 = solv2.search([p2cidx, p2eidx], 0);
		return prettySolution([].concat(sol1, sol2));		
	}

	function testbench() {
		init();
		var scramble = [];
		for (var i = 0; i < 20; i++) {
			scramble.push([~~(Math.random() * 8), ~~(Math.random() * 2)]);
		}

		var ep = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
		var co = [0, 0, 0, 0, 0, 0, 0, 0];
		for (var i = 0; i < scramble.length; i++) {
			var axis = scramble[i][0];
			var pow = scramble[i][1] + 1;
			mathlib.acycle(ep, edgeMoveSwaps[axis], pow);
			co[axis] = (co[axis] + pow) % 3;
		}
		console.log(prettySolution(scramble) + '   ' + solveRedi(ep, co));
	}

	function getRandomScramble() {
		init();
		var ep = mathlib.rndPerm(12, true);
		var co = [];
		for (var i = 0; i < 8; i++) {
			co[i] = mathlib.rn(3);
		}
		return solveRedi(ep, co);
	}

	scrMgr.reg('rediso', getRandomScramble);

	return {
		solveRedi: solveRedi,
		getRandomScramble: getRandomScramble,
		testbench: testbench
	}
})();
