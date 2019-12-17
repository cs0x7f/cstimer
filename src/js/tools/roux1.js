"use strict";

execMain(function(CubieCube) {

	var cc = new CubieCube();
	var cd = new CubieCube();

	function cMove(idx, m) {
		cc.ca = [0, 0, 0, 0, 0, 0, 0, 0];
		for (var i = 1; i < 3; i++) {
			var val = idx % 24;
			idx = ~~(idx / 24);
			cc.ca[val & 0x7] = i | val & 0x18;
		}
		CubieCube.CornMult(cc, CubieCube.moveCube[m * 3], cd);
		var ret = [];
		for (var i = 0; i < 8; i++) {
			ret[cd.ca[i] & 0x7] = i | cd.ca[i] & 0x18;
		}
		idx = 0;
		for (var i = 2; i > 0; i--) {
			idx = idx * 24 + ret[i];
		}
		return idx;
	}

	function eMove(idx, m) {
		cc.ea = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		for (var i = 1; i < 4; i++) {
			var val = idx % 24;
			idx = ~~(idx / 24);
			cc.ea[val >> 1] = i << 1 | val & 1;
		}
		CubieCube.EdgeMult(cc, CubieCube.moveCube[m * 3], cd);
		var ret = [];
		for (var i = 0; i < 12; i++) {
			ret[cd.ea[i] >> 1] = i << 1 | cd.ea[i] & 1;
		}
		idx = 0;
		for (var i = 3; i > 0; i--) {
			idx = idx * 24 + ret[i];
		}
		return idx;
	}
	var SOLVED_CORN = 5 * 24 + 6;
	var SOLVED_EDGE = 20 * 24 * 24 + 18 * 24 + 12;
	var solv = new mathlib.Solver(6, 3, [
		[SOLVED_CORN, cMove, 24 * 24],
		[SOLVED_EDGE, eMove, 24 * 24 * 24]
	]);

	var faceStr = ["LU", "LD", "FU", "FD"];
	var moveIdx = ["DRBULF", "URFDLB", "DBLUFR", "UBRDFL"];
	var rotIdx = ["&nbsp;&nbsp;", "&nbsp;&nbsp;", "y&nbsp;", "y&nbsp;"];

	function solveRoux1Ori(scramble, solvOri) {
		var corn = [SOLVED_CORN];
		var edge = [SOLVED_EDGE];
		for (var i = 1; i < 4; i++) {
			corn[i] = cMove(corn[i - 1], 4);
			edge[i] = eMove(edge[i - 1], 4);
		}
		var moveConj = [];
		solvOri = solvOri.split('');
		for (var s = 0; s < 4; s++) {
			moveConj[s] = solvOri.join('');
			var moves = kernel.parseScramble(scramble, moveConj[s]);
			for (var i = 0; i < moves.length; i++) {
				var m = moves[i][0];
				for (var j = 0; j < moves[i][2]; j++) {
					corn[s] = cMove(corn[s], m);
					edge[s] = eMove(edge[s], m);
				}
			}
			mathlib.circle(solvOri, 0, 2, 3, 5);
		}
		var sol = null;
		for (var maxl = 1; maxl < 12; maxl++) {
			for (var s = 0; s < 4; s++) {
				sol = solv.search([corn[s], edge[s]], maxl == 1 ? 0 : maxl, maxl);
				if (sol) {
					sol.push(s);
					return sol;
				}
			}
		}
	}

	function solveRoux1(scramble, fdiv) {
		fdiv.empty();
		for (var face = 0; face < 4; face++) {
			var sol = solveRoux1Ori(scramble, moveIdx[face]);
			var ori = sol.pop();
			if (face % 2 == 0) {
				ori = (ori + 2) % 4;
			}
			for (var i = 0; i < sol.length; i++) {
				sol[i] = "URFDLB".charAt(sol[i][0]) + " 2'".charAt(sol[i][1]);
			}
			fdiv.append($('<span class="sol">').append(faceStr[face] + ": " + rotIdx[face] + ["&nbsp;&nbsp;&nbsp;", "x'&nbsp;", "x2&nbsp;", "x&nbsp;&nbsp;"][ori], tools.getSolutionSpan(sol)), '<br>');
		}
	}

	function execFunc(fdiv) {
		if (!fdiv) {
			return;
		}
		if (tools.isPuzzle('333')) {
			var scramble = tools.getCurScramble();
			solveRoux1(scramble[1], fdiv);
		} else {
			fdiv.html(IMAGE_UNAVAILABLE);
		}
	}

	$(function() {
		tools.regTool('roux1', TOOLS_SOLVERS + '>' + TOOLS_ROUX1, execFunc);
	});

	return {
		solve: solveRoux1
	};
}, [mathlib.CubieCube]);
