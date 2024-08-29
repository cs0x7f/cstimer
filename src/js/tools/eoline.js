"use strict";

execMain(function(createMove, edgeMove, createPrun, getPruning) {
	var fmv = [];
	var pmv = [];

	function permMove(idx, m) {
		var arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		var a = idx % 12;
		var b = ~~(idx / 12);
		if (b >= a) b++;
		arr[a] = 2;
		arr[b] = 4;

		edgeMove(arr, m);

		for (var i = 0; i < 12; i++) {
			if ((arr[i] >> 1) == 1) {
				a = i;
			} else if ((arr[i] >> 1) == 2) {
				b = i;
			}
		}
		if (b > a) b--;
		return b * 12 + a;
	}

	function init() {
		init = $.noop;
		createMove(fmv, 2048, [edgeMove, 'o', 12, -2]);
		createMove(pmv, 132, permMove);
	}

	var solv = new mathlib.Solver(6, 3, [
		[0, [edgeMove, 'o', 12, -2], 2048],
		[9 * 12 + 8, permMove, 132]
	]);

	var solv2 = new mathlib.Solver(6, 3, [
		[0, [edgeMove, 'o', 12, -2], 2048],
		[9 * 12 + 8, permMove, 132],
		[10 * 12 + 9, permMove, 132]
	]);

	var faceStr = ["D(LR)", "D(FB)", "U(LR)", "U(FB)", "L(UD)", "L(FB)", "R(UD)", "R(FB)", "F(LR)", "F(UD)", "B(LR)", "B(UD)"];
	var moveIdx = ["FRUBLD", "RBULFD", "FLDBRU", "LBDRFU", "FDRBUL", "DBRUFL", "FULBDR", "UBLDFR", "URBDLF", "RDBLUF", "DRFULB", "RUFLDB"];
	var rotIdx = ["&nbsp;&nbsp;&nbsp;", "&nbsp;y&nbsp;", "z2&nbsp;", "z2y", "z'&nbsp;", "z'y", "&nbsp;z&nbsp;", "z&nbsp;y", "x'&nbsp;", "x'y", "&nbsp;x&nbsp;", "x&nbsp;y"];

	function solveEOLine(scramble, isCross, fdiv) {
		init();
		var moves = cubeutil.parseScramble(scramble, "FRUBLD");
		fdiv.empty();
		for (var face = 0; face < 12; face++) {
			var flip = 0;
			var perm1 = 9 * 12 + 8;
			var perm2 = 10 * 12 + 9;
			for (var i = 0; i < moves.length; i++) {
				var m = moveIdx[face].indexOf("FRUBLD".charAt(moves[i][0]));
				var p = moves[i][2];
				for (var j = 0; j < p; j++) {
					flip = fmv[m][flip];
					perm1 = pmv[m][perm1];
					perm2 = pmv[m][perm2];
				}
			}
			var sol = isCross ? solv2.search([flip, perm1, perm2], 0) : solv.search([flip, perm1], 0);
			sol = sol.map((move) => "FRUBLD".charAt(move[0]) + " 2'".charAt(move[1]));
			fdiv.append($('<span class="sol">').append(faceStr[face] + ": " + rotIdx[face], tools.getSolutionSpan(sol)), '<br>');
		}
	}

	function execFunc(type, fdiv) {
		if (!fdiv) {
			return;
		}
		if (tools.isPuzzle('333')) {
			var scramble = tools.getCurScramble();
			solveEOLine(scramble[1], type == 'eocross', fdiv);
		} else {
			fdiv.html(IMAGE_UNAVAILABLE);
		}
	}

	$(function() {
		tools.regTool('eoline', TOOLS_SOLVERS + '>' + TOOLS_EOLINE, execFunc.bind(null, 'eoline'));
		tools.regTool('eocross', TOOLS_SOLVERS + '>' + 'EOCross', execFunc.bind(null, 'eocross'));
	});
}, [mathlib.createMove, mathlib.edgeMove, mathlib.createPrun, mathlib.getPruning]);
