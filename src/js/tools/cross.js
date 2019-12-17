"use strict";

var cross = (function(createMove, edgeMove, createPrun, setNPerm, getNPerm, Cnk, getPruning) {
	var permPrun, flipPrun, ecPrun, fullPrun;
	var cmv = [];
	var pmul = [];
	var fmul = [];

	var e1mv = [];
	var c1mv = [];

	function pmv(a, c) {
		var b = cmv[c][~~(a / 24)];
		return 24 * ~~(b / 384) + pmul[a % 24][(b >> 4) % 24]
	}

	function fmv(b, c) {
		var a = cmv[c][b >> 4];
		return ~~(a / 384) << 4 | fmul[b & 15][(a >> 4) % 24] ^ a & 15
	}

	function i2f(a, c) {
		for (var b = 3; 0 <= b; b--) c[b] = a & 1, a >>= 1
	}

	function f2i(c) {
		for (var a = 0, b = 0; 4 > b; b++) a <<= 1, a |= c[b];
		return a
	}

	function fullmv(idx, move) {
		var slice = cmv[move][~~(idx / 384)];
		var flip = fmul[idx & 15][(slice >> 4) % 24] ^ slice & 15;
		var perm = pmul[(idx >> 4) % 24][(slice >> 4) % 24];
		return (~~(slice / 384)) * 384 + 16 * perm + flip;
	}

	function init() {
		init = $.noop;
		for (var i = 0; i < 24; i++) {
			pmul[i] = [];
		}
		for (var i = 0; i < 16; i++) {
			fmul[i] = [];
		}
		var pm1 = [];
		var pm2 = [];
		var pm3 = [];
		for (var i = 0; i < 24; i++) {
			for (var j = 0; j < 24; j++) {
				setNPerm(pm1, i, 4);
				setNPerm(pm2, j, 4);
				for (var k = 0; k < 4; k++) {
					pm3[k] = pm1[pm2[k]];
				}
				pmul[i][j] = getNPerm(pm3, 4);
				if (i < 16) {
					i2f(i, pm1);
					for (var k = 0; k < 4; k++) {
						pm3[k] = pm1[pm2[k]];
					}
					fmul[i][j] = f2i(pm3);
				}
			}
		}
		createMove(cmv, 495, getmv);

		permPrun = [];
		flipPrun = [];
		createPrun(permPrun, 0, 11880, 5, pmv);
		createPrun(flipPrun, 0, 7920, 6, fmv);

		//combMove[comb][m] = comb*, flip*, perm*
		//newcomb = comb*, newperm = perm x perm*, newflip = flip x perm* ^ flip*
		function getmv(comb, m) {
			var arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			var r = 4;
			for (var i = 0; i < 12; i++) {
				if (comb >= Cnk[11 - i][r]) {
					comb -= Cnk[11 - i][r--];
					arr[i] = r << 1;
				} else {
					arr[i] = -1;
				}
			}
			edgeMove(arr, m);
			comb = 0, r = 4;
			var t = 0;
			var pm = [];
			for (var i = 0; i < 12; i++) {
				if (arr[i] >= 0) {
					comb += Cnk[11 - i][r--];
					pm[r] = arr[i] >> 1;
					t |= (arr[i] & 1) << (3 - r);
				}
			}
			return (comb * 24 + getNPerm(pm, 4)) << 4 | t;
		}
	}

	function xinit() {
		xinit = $.noop;
		init();
		for (var i = 0; i < 24; i++) {
			c1mv[i] = [];
			e1mv[i] = [];
			for (var m = 0; m < 6; m++) {
				c1mv[i][m] = cornMove(i, m);
				var edge = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
				edge[i >> 1] = i & 1;
				edgeMove(edge, m);
				for (var e = 0; e < 12; e++) {
					if (edge[e] >= 0) {
						e1mv[i][m] = e << 1 | edge[e];
						break;
					}
				}
			}
		}
		ecPrun = [];
		for (var obj = 0; obj < 4; obj++) {
			var prun = [];
			createPrun(prun, (obj + 4) * 3 * 24 + (obj + 4) * 2, 576, 5, function(q, m) {
				return c1mv[~~(q / 24)][m] * 24 + e1mv[q % 24][m]
			});
			ecPrun[obj] = prun;
		}

		function cornMove(corn, m) {
			var idx = ~~(corn / 3);
			var twst = corn % 3;
			var idxt = [
				[3, 1, 2, 7, 0, 5, 6, 4],
				[0, 1, 6, 2, 4, 5, 7, 3],
				[1, 2, 3, 0, 4, 5, 6, 7],
				[0, 5, 1, 3, 4, 6, 2, 7],
				[4, 0, 2, 3, 5, 1, 6, 7],
				[0, 1, 2, 3, 7, 4, 5, 6]
			];
			var twstt = [
				[2, 0, 0, 1, 1, 0, 0, 2],
				[0, 0, 1, 2, 0, 0, 2, 1],
				[0, 0, 0, 0, 0, 0, 0, 0],
				[0, 1, 2, 0, 0, 2, 1, 0],
				[1, 2, 0, 0, 2, 1, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0]
			];
			twst = (twst + twstt[m][idx]) % 3;
			return idxt[m][idx] * 3 + twst;
		}
	}

	//e4perm, e4flip, e1, c1
	//obj: -1:only cross.
	//	i-4: end when e==i*2, c==i*3
	function idaxcross(q, t, e, c, obj, l, lm, sol) {
		if (l == 0) {
			return q == 0 && t == 0 && e == (obj + 4) * 2 && c == (obj + 4) * 3;
		} else {
			if (getPruning(permPrun, q) > l || getPruning(flipPrun, t) > l || getPruning(ecPrun[obj], c * 24 + e) > l) return false;
			var p, s, ex, cx, a, m;
			for (m = 0; m < 6; m++) {
				if (m != lm && m != lm - 3) {
					p = q;
					s = t;
					ex = e;
					cx = c;
					for (a = 0; a < 3; a++) {
						p = pmv(p, m);
						s = fmv(s, m);
						ex = e1mv[ex][m];
						cx = c1mv[cx][m];
						if (idaxcross(p, s, ex, cx, obj, l - 1, m, sol)) {
							sol.push("FRUBLD".charAt(m) + " 2'".charAt(a));
							return (true);
						}
					}
				}
			}
		}
		return false;
	}

	//e4perm, e4flip
	function idacross(q, t, l, lm, sol) {
		if (l == 0) {
			return q == 0 && t == 0;
		} else {
			if (getPruning(permPrun, q) > l || getPruning(flipPrun, t) > l) return false;
			var p, s, a, m;
			for (m = 0; m < 6; m++) {
				if (m != lm && m != lm - 3) {
					p = q;
					s = t;
					for (a = 0; a < 3; a++) {
						p = pmv(p, m);
						s = fmv(s, m);
						if (idacross(p, s, l - 1, m, sol)) {
							sol.push("FRUBLD".charAt(m) + " 2'".charAt(a));
							return (true);
						}
					}
				}
			}
		}
		return false;
	}

	var faceStr = ["D", "U", "L", "R", "F", "B"];
	var moveIdx = ["FRUBLD", "FLDBRU", "FDRBUL", "FULBDR", "URBDLF", "DRFULB"]
	var rotIdx = ["&nbsp;&nbsp;", "z2", "z'", "z&nbsp;", "x'", "x&nbsp;"];

	var curScramble;

	function solve_cross(moves) {
		init();
		var ret = [];
		for (var face = 0; face < 6; face++) {
			var flip = 0;
			var perm = 0;
			for (var i = 0; i < moves.length; i++) {
				var m = moveIdx[face].indexOf("FRUBLD".charAt(moves[i][0]));
				var p = moves[i][2];
				for (var j = 0; j < p; j++) {
					flip = fmv(flip, m);
					perm = pmv(perm, m);
				}
			}
			var sol = [];
			var len = 0;
			for (var len = 0; len < 100; len++) {
				if (idacross(perm, flip, len, -1, sol)) {
					break;
				}
			}
			sol.reverse();
			ret.push(sol);
		}
		return ret;
	}

	function solve_xcross(moves, face) {
		xinit();
		var flip = 0;
		var perm = 0;
		var e1 = [8, 10, 12, 14];
		var c1 = [12, 15, 18, 21];
		for (var i = 0; i < moves.length; i++) {
			var m = moveIdx[face].indexOf("FRUBLD".charAt(moves[i][0]));
			var p = moves[i][2];
			for (var j = 0; j < p; j++) {
				flip = fmv(flip, m);
				perm = pmv(perm, m);
				for (var obj = 0; obj < 4; obj++) {
					e1[obj] = e1mv[e1[obj]][m];
					c1[obj] = c1mv[c1[obj]][m];
				}
			}
		}
		var sol = [];
		var found = false;
		var len = 0;
		while (!found) {
			for (var obj = 0; obj < 4; obj++) {
				if (idaxcross(perm, flip, e1[obj], c1[obj], obj, len, -1, sol)) {
					found = true;
					break;
				}
			}
			len++;
		}
		sol.reverse();
		return sol;
	}

	function fullInit() {
		fullInit = $.noop;
		init();
		fullPrun = [];
		createPrun(fullPrun, 0, 190080, 7, fullmv, 6, 3, 6);
	}

	function getEasyCross(length) {
		fullInit();
		if (length > 8) {
			length = 8;
		}
		var cases = mathlib.rn([1, 16, 174, 1568, 11377, 57758, 155012, 189978, 190080][length]) + 1;
		var i;
		for (i = 0; i < 190080; i++) {
			if (getPruning(fullPrun, i) <= length && --cases == 0) {
				break;
			}
		}
		var comb = ~~(i / 384);
		var perm = (i >> 4) % 24;
		var flip = i & 15;

		var arrp = [];
		var arrf = [];
		var pm = [];
		var fl = [];
		i2f(flip, fl);
		setNPerm(pm, perm, 4);
		var r = 4;
		var map = [7, 6, 5, 4, 10, 9, 8, 11, 3, 2, 1, 0];
		for (i = 0; i < 12; i++) {
			if (comb >= Cnk[11 - i][r]) {
				comb -= Cnk[11 - i][r--];
				arrp[map[i]] = pm[r];
				arrf[map[i]] = fl[r];
			} else {
				arrp[map[i]] = arrf[map[i]] = -1;
			}
		}
		return [arrp, arrf];
	}


	execMain(function() {

		function execCross(scramble, fdiv) {
			fdiv.empty();
			curScramble = kernel.parseScramble(scramble, "FRUBLD");
			var solutions = solve_cross(curScramble);
			for (var face = 0; face < 6; face++) {
				var span = $('<span class="sol"/>');
				var clk = $('<span />').html('ec').addClass('click').click(ecClick);
				span.append(faceStr[face] + "(", clk, "): " + rotIdx[face], tools.getSolutionSpan(solutions[face]), '<br>');
				fdiv.append(span);
			}
		}

		function ecClick() {
			var span = $(this).parent();
			var face = "DULRFB".indexOf(span.html()[0]);
			var sol = solve_xcross(curScramble, face);
			var clktxt = $(this).html();
			if (clktxt == 'ec') {
				sol = solve_xcross(curScramble, face);
				clktxt = '<<';
			} else {
				sol = solve_cross(curScramble)[face];
				clktxt = 'ec';
			}
			var clk = $('<span />').html(clktxt).addClass('click').click(ecClick);
			span.empty().append(faceStr[face] + "(", clk, "): " + rotIdx[face], tools.getSolutionSpan(sol), '<br>');
		}

		function execFunc(fdiv) {
			if (!fdiv) {
				return;
			}
			if (tools.isPuzzle('333')) {
				var scramble = tools.getCurScramble();
				execCross(scramble[1], fdiv);
			} else {
				fdiv.html(IMAGE_UNAVAILABLE);
			}
		}

		$(function() {
			tools.regTool('cross', TOOLS_SOLVERS + '>' + TOOLS_CROSS, execFunc);
		});
	});

	return {
		solve: solve_cross,
		getEasyCross: getEasyCross
	}
})(mathlib.createMove, mathlib.edgeMove, mathlib.createPrun, mathlib.setNPerm, mathlib.getNPerm, mathlib.Cnk, mathlib.getPruning);
