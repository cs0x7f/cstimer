"use strict";

var cross = (function(createMove, edgeMove, createPrun, setNPerm, getNPerm, Cnk, getPruning) {
	var permPrun, flipPrun, ecPrun, fullPrun;
	var cmv = [];
	var pmul = [];
	var fmul = [];

	var e1mv = [];
	var c1mv = [];
	var xxPrun01 = [];
	var xxPrun02 = [];

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

	function xxinit() {
		xxinit = $.noop;
		xinit();
		var obj1 = 4;
		var obj2 = 5;
		createPrun(xxPrun01, obj1 * 3 * 24 + obj1 * 2 + 576 * (obj2 * 3 * 24 + obj2 * 2), 576 * 576, 7, function(q, m) {
			var ec1 = q % 576;
			var ec2 = ~~(q / 576);
			return c1mv[~~(ec1 / 24)][m] * 24 + e1mv[ec1 % 24][m] + 576 * (c1mv[~~(ec2 / 24)][m] * 24 + e1mv[ec2 % 24][m])
		});
		obj2 = 6;
		createPrun(xxPrun02, obj1 * 3 * 24 + obj1 * 2 + 576 * (obj2 * 3 * 24 + obj2 * 2), 576 * 576, 7, function(q, m) {
			var ec1 = q % 576;
			var ec2 = ~~(q / 576);
			return c1mv[~~(ec1 / 24)][m] * 24 + e1mv[ec1 % 24][m] + 576 * (c1mv[~~(ec2 / 24)][m] * 24 + e1mv[ec2 % 24][m])
		});
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

	var solvCross = new mathlib.Searcher(
		(idx) => idx[0] + idx[1] == 0,
		(idx) => Math.max(getPruning(permPrun, idx[0]), getPruning(flipPrun, idx[1])),
		(idx, move) => [pmv(idx[0], move), fmv(idx[1], move)],
		6, 3, [1, 2, 4, 9, 18, 36]
	);

	var solvXCross = new mathlib.Searcher(
		(idx) => idx[0] + idx[1] == 0 && idx[2] == (idx[4] + 4) * 2 && idx[3] == (idx[4] + 4) * 3,
		(idx) => Math.max(
			getPruning(permPrun, idx[0]),
			getPruning(flipPrun, idx[1]),
			getPruning(ecPrun[idx[4]], idx[3] * 24 + idx[2])
		),
		(idx, move) => [pmv(idx[0], move), fmv(idx[1], move), e1mv[idx[2]][move], c1mv[idx[3]][move], idx[4]],
		6, 3, [1, 2, 4, 9, 18, 36]
	);

	var solvXXCross = new mathlib.Searcher(
		(idx) => idx[0] + idx[1] == 0 && idx[2] == 4 * 2 && idx[3] == 4 * 3
				&& (idx[4] == 5 * 2 && idx[5] == 5 * 3 || idx[4] == 6 * 2 && idx[5] == 6 * 3),
		(idx) => Math.max(
			getPruning(permPrun, idx[0]),
			getPruning(flipPrun, idx[1]),
			getPruning(idx[6], idx[3] * 24 + idx[2] + 576 * (idx[5] * 24 + idx[4]))
		),
		(idx, move) => [
			pmv(idx[0], move), fmv(idx[1], move),
			e1mv[idx[2]][move], c1mv[idx[3]][move],
			e1mv[idx[4]][move], c1mv[idx[5]][move],
			idx[6]
		],
		6, 3, [1, 2, 4, 9, 18, 36]
	);

	var solvXXXCross = new mathlib.Searcher(
		(idx) => idx[0] + idx[1] == 0 && idx[2] == 4 * 2 && idx[3] == 4 * 3
				&& idx[4] == 5 * 2 && idx[5] == 5 * 3 && idx[6] == 6 * 2 && idx[7] == 6 * 3,
		(idx) => Math.max(
			getPruning(permPrun, idx[0]),
			getPruning(flipPrun, idx[1]),
			getPruning(xxPrun01, idx[3] * 24 + idx[2] + 576 * (idx[5] * 24 + idx[4])),
			getPruning(xxPrun02, idx[3] * 24 + idx[2] + 576 * (idx[7] * 24 + idx[6]))
		),
		(idx, move) => [
			pmv(idx[0], move), fmv(idx[1], move),
			e1mv[idx[2]][move], c1mv[idx[3]][move],
			e1mv[idx[4]][move], c1mv[idx[5]][move],
			e1mv[idx[6]][move], c1mv[idx[7]][move]
		],
		6, 3, [1, 2, 4, 9, 18, 36]
	);

	var faceStr = ["D", "U", "L", "R", "F", "B"];
	var moveIdx = ["FRUBLD", "FLDBRU", "FDRBUL", "FULBDR", "URBDLF", "DRFULB"]
	var rotIdx = ["&nbsp;&nbsp;", "z2", "z'", "z&nbsp;", "x'", "x&nbsp;"];
	var yrotIdx = ["FRUBLD", "RBULFD", "BLUFRD", "LFURBD"];

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
			var sol = solvCross.solve([perm, flip], 0, 50);
			for (var i = 0; i < sol.length; i++) {
				sol[i] = "FRUBLD".charAt(sol[i][0]) + " 2'".charAt(sol[i][1])
			}
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
		var idxs = [];
		for (var i = 0; i < 4; i++) {
			idxs.push([perm, flip, e1[i], c1[i], i]);
		}
		var sol = solvXCross.solveMulti(idxs, 0, 20)[0];
		for (var i = 0; i < sol.length; i++) {
			sol[i] = "FRUBLD".charAt(sol[i][0]) + " 2'".charAt(sol[i][1])
		}
		return sol;
	}

	function solve_xxcross(moves, face, is3x) {
		xxinit();
		var idxs = [];
		var id3s = [];
		var yrot = 0;
		for (yrot = 0; yrot < 4; yrot++) {
			var flip = 0;
			var perm = 0;
			var e1 = [8, 10, 12];
			var c1 = [12, 15, 18];
			for (var i = 0; i < moves.length; i++) {
				var m = yrotIdx[yrot].indexOf("FRUBLD".charAt(moveIdx[face].indexOf("FRUBLD".charAt(moves[i][0]))));
				var p = moves[i][2];
				for (var j = 0; j < p; j++) {
					flip = fmv(flip, m);
					perm = pmv(perm, m);
					e1 = [e1mv[e1[0]][m], e1mv[e1[1]][m], e1mv[e1[2]][m]];
					c1 = [c1mv[c1[0]][m], c1mv[c1[1]][m], c1mv[c1[2]][m]];
				}
			}
			idxs.push([perm, flip, e1[0], c1[0], e1[1], c1[1], xxPrun01]);
			idxs.push([perm, flip, e1[0], c1[0], e1[2], c1[2], xxPrun02]);
			id3s.push([perm, flip, e1[0], c1[0], e1[1], c1[1], e1[2], c1[2]]);
		}
		var tt = +new Date;
		var sol = is3x ? solvXXXCross.solveMulti(id3s, 0, 20) : solvXXCross.solveMulti(idxs, 0, 20);
		var yrot = is3x ? sol[1] : (sol[1] >> 1);
		return sol[0].map((move) => yrotIdx[yrot][move[0]] + " 2'"[move[1]]);
	}

	function fullInit() {
		fullInit = $.noop;
		init();
		fullPrun = [];
		createPrun(fullPrun, 0, 190080, 7, fullmv, 6, 3, 6);
	}

	function mapCross(idx) {
		var comb = ~~(idx / 384);
		var perm = (idx >> 4) % 24;
		var flip = idx & 15;

		var arrp = [];
		var arrf = [];
		var pm = [];
		var fl = [];
		i2f(flip, fl);
		setNPerm(pm, perm, 4);
		var r = 4;
		var map = [7, 6, 5, 4, 10, 9, 8, 11, 3, 2, 1, 0];
		for (var i = 0; i < 12; i++) {
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

	function getEasyCross(length) {
		fullInit();
		var lenA = Math.min(length % 10, 8);
		var lenB = Math.min(~~(length / 10), 8);
		var minLen = Math.min(lenA, lenB);
		var maxLen = Math.max(lenA, lenB);
		var ncase = [0, 1, 16, 174, 1568, 11377, 57758, 155012, 189978, 190080];
		var cases = mathlib.rn(ncase[maxLen + 1] - ncase[minLen]) + 1;
		var i;
		for (i = 0; i < 190080; i++) {
			var prun = getPruning(fullPrun, i);
			if (prun <= maxLen && prun >= minLen && --cases == 0) {
				break;
			}
		}
		return mapCross(i);
	}

	function getEasyXCross(length) {
		fullInit();
		xinit();
		var lenA = length % 10;
		var lenB = ~~(length / 10);
		var minLen = Math.min(lenA, lenB, 8);
		var maxLen = Math.max(lenA, lenB);
		var ncase = [1, 16, 174, 1568, 11377, 57758, 155012, 189978, 190080];
		length = Math.max(0, Math.min(maxLen, 8)); // cross length
		var remain = ncase[length];
		var isFound = false;
		var testCnt = 0;
		while (!isFound) {
			var rndIdx = [];
			var sample = 500;
			for (var i = 0; i < sample; i++) {
				rndIdx.push(mathlib.rn(remain));
			}
			rndIdx.sort(function(a, b) { return b - a; });
			var rndCases = [];
			var cnt = 0;
			for (var i = 0; i < 190080; i++) {
				var prun = getPruning(fullPrun, i);
				if (prun > length) {
					continue;
				}
				while (rndIdx.at(-1) == cnt) {
					rndCases.push(i);
					rndIdx.pop();
				}
				if (rndIdx.length == 0) {
					break;
				}
				cnt++;
			}
			rndIdx = mathlib.rndPerm(sample);
			for (var i = 0; i < sample; i++) {
				var caze = rndCases[rndIdx[i]];
				var comb = ~~(caze / 384);
				var perm = comb * 24 + (caze >> 4) % 24;
				var flip = comb << 4 | caze & 15;
				var sol = [];
				var corns = mathlib.rndPerm(8).slice(4);
				var edges = mathlib.rndPerm(8);

				var arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
				var r = 4;
				for (var j = 0; j < 12; j++) {
					if (comb >= Cnk[11 - j][r]) {
						comb -= Cnk[11 - j][r--];
						arr[j] = -1;
					} else {
						arr[j] = edges.pop();
					}
				}
				for (var j = 0; j < 4; j++) {
					corns[j] = corns[j] * 3 + mathlib.rn(3);
					edges[j] = arr.indexOf(j) * 2 + mathlib.rn(2);
					var sol = solvXCross.solve([perm, flip, edges[j], corns[j], j], 0, isFound ? minLen - 1 : maxLen);
					if (sol == null) {
						continue;
					} else if (sol.length < minLen) {
						isFound = false; // too short
						break;
					} else if (sol.length <= maxLen) {
						isFound = true;
					}
				}
				if (!isFound) {
					continue;
				}
				var crossArr = mapCross(caze);
				crossArr[2] = mathlib.valuedArray(8, -1);
				crossArr[3] = mathlib.valuedArray(8, -1);
				var map = [7, 6, 5, 4, 10, 9, 8, 11, 3, 2, 1, 0];
				var map2 = [6, 5, 4, 7, 2, 1, 0, 3];
				for (var i = 0; i < 4; i++) {
					crossArr[0][map[edges[i] >> 1]] = map[i + 4];
					crossArr[1][map[edges[i] >> 1]] = edges[i] % 2;
					crossArr[2][map2[~~(corns[i] / 3)]] = map2[i + 4];
					crossArr[3][map2[~~(corns[i] / 3)]] = (30 - corns[i]) % 3;
				}
				return crossArr;
			}
		}
	}


	ISCSTIMER && execMain(function() {

		function execCross(scramble, fdiv) {
			fdiv.empty();
			curScramble = cubeutil.parseScramble(scramble, "FRUBLD");
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
				clktxt = 'xx';
			} else if (clktxt == 'xx') {
				sol = solve_xxcross(curScramble, face);
				clktxt = '3x';
			} else if (clktxt == '3x') {
				sol = solve_xxcross(curScramble, face, true);
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
		getEasyCross: getEasyCross,
		getEasyXCross: getEasyXCross
	}
})(mathlib.createMove, mathlib.edgeMove, mathlib.createPrun, mathlib.setNPerm, mathlib.getNPerm, mathlib.Cnk, mathlib.getPruning);
