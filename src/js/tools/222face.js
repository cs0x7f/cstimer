"use strict";

var pocketface = execMain(function() {

	var faceStr = ["U", "R", "F", "D", "L", "B"];

	var moveData = {
		"U": [
			[0, 1, 3, 2],
			[4, 8, 16, 20],
			[5, 9, 17, 21]
		],
		"R": [
			[4, 5, 7, 6],
			[1, 22, 13, 9],
			[3, 20, 15, 11]
		],
		"F": [
			[8, 9, 11, 10],
			[2, 4, 13, 19],
			[3, 6, 12, 17]
		]
	};

	function pocketFaceletMove(state, move) {
		var ret = state.split('');
		for (var i = 0; i < 3; i++) {
			mathlib.acycle(ret, moveData[move[0]][i], "? 2'".indexOf(move[1]));
		}
		return ret.join('');
	}

	var curScramble;
	var solv = new mathlib.gSolver([
		'XXXX????????????????????',
		'????XXXX????????????????',
		'????????XXXX????????????',
		'????????????XXXX????????',
		'????????????????XXXX????',
		'????????????????????XXXX',
	], pocketFaceletMove, {
		"U ": 1,
		"U2": 1,
		"U'": 1,
		"R ": 2,
		"R2": 2,
		"R'": 2,
		"F ": 3,
		"F2": 3,
		"F'": 3
	});

	function execPocketFace(scramble, fdiv) {
		fdiv.empty();
		curScramble = kernel.parseScramble(scramble, "URF");
		var state = 'UUUURRRRFFFFDDDDLLLLBBBB';
		for (var i = 0; i < curScramble.length; i++) {
			var m = curScramble[i];
			state = pocketFaceletMove(state, "URF".charAt(m[0]) + " 2'".charAt(m[2] - 1));
		}
		for (var face = 0; face < 6; face++) {
			var faceState = [];
			for (var i = 0; i < 24; i++) {
				faceState.push(state[i] == "URFDLB".charAt(face) ? 'X' : '?');
			}
			var sol = solv.search(faceState.join(''), 0)[0];
			var span = $('<span class="sol"/>');
			span.append(faceStr[face] + ": ", tools.getSolutionSpan(sol), '<br>');
			fdiv.append(span);
		}
	}

	function execFunc(fdiv) {
		if (!fdiv) {
			return;
		}
		var scramble = tools.getCurScramble();
		if (tools.puzzleType(scramble[0]) == '222' ||
			scramble[0] == "input" && "|222o|".indexOf('|' + tools.scrambleType(scramble[1]) + '|') != -1) {
			execPocketFace(scramble[1], fdiv);
		} else {
			fdiv.html(IMAGE_UNAVAILABLE);
		}
	}

	$(function() {
		tools.regTool('222face', TOOLS_222FACE, execFunc);
	});

}, []);

execMain(function() {
	var U1 = 0,
		U2 = 1,
		U3 = 2,
		U4 = 3,
		U5 = 4,
		U6 = 5,
		U7 = 6,
		U8 = 7,
		U9 = 8,
		R1 = 9,
		R2 = 10,
		R3 = 11,
		R4 = 12,
		R5 = 13,
		R6 = 14,
		R7 = 15,
		R8 = 16,
		R9 = 17,
		F1 = 18,
		F2 = 19,
		F3 = 20,
		F4 = 21,
		F5 = 22,
		F6 = 23,
		F7 = 24,
		F8 = 25,
		F9 = 26,
		D1 = 27,
		D2 = 28,
		D3 = 29,
		D4 = 30,
		D5 = 31,
		D6 = 32,
		D7 = 33,
		D8 = 34,
		D9 = 35,
		L1 = 36,
		L2 = 37,
		L3 = 38,
		L4 = 39,
		L5 = 40,
		L6 = 41,
		L7 = 42,
		L8 = 43,
		L9 = 44,
		B1 = 45,
		B2 = 46,
		B3 = 47,
		B4 = 48,
		B5 = 49,
		B6 = 50,
		B7 = 51,
		B8 = 52,
		B9 = 53;

	var moveData = [
		[[U1, U3, U9, U7], [U2, U6, U8, U4], [F1, L1, B1, R1], [F2, L2, B2, R2], [F3, L3, B3, R3]],
		[[R1, R3, R9, R7], [R2, R6, R8, R4], [U3, B7, D3, F3], [U6, B4, D6, F6], [U9, B1, D9, F9]],
		[[F1, F3, F9, F7], [F2, F6, F8, F4], [U7, R1, D3, L9], [U8, R4, D2, L6], [U9, R7, D1, L3]],
		[[D1, D3, D9, D7], [D2, D6, D8, D4], [F7, R7, B7, L7], [F8, R8, B8, L8], [F9, R9, B9, L9]],
		[[L1, L3, L9, L7], [L2, L6, L8, L4], [U1, F1, D1, B9], [U4, F4, D4, B6], [U7, F7, D7, B3]],
		[[B1, B3, B9, B7], [B2, B6, B8, B4], [U3, L1, D7, R9], [U2, L4, D8, R6], [U1, L7, D9, R3]]
	];

	var moves = {
		"U ": 0x00,
		"U2": 0x00,
		"U'": 0x00,
		"R ": 0x11,
		"R2": 0x11,
		"R'": 0x11,
		"F ": 0x22,
		"F2": 0x22,
		"F'": 0x22,
		"D ": 0x30,
		"D2": 0x30,
		"D'": 0x30,
		"L ": 0x41,
		"L2": 0x41,
		"L'": 0x41,
		"B ": 0x52,
		"B2": 0x52,
		"B'": 0x52
	};

	var movesWithoutD = {
		"U ": 0x00,
		"U2": 0x00,
		"U'": 0x00,
		"R ": 0x11,
		"R2": 0x11,
		"R'": 0x11,
		"F ": 0x22,
		"F2": 0x22,
		"F'": 0x22,
		"L ": 0x41,
		"L2": 0x41,
		"L'": 0x41,
		"B ": 0x52,
		"B2": 0x52,
		"B'": 0x52
	}

	var faceStr = ["U", "R", "F", "D", "L", "B"];

	function pocketFaceletMove(state, move) {
		var ret = state.split('');
		var axis = "URFDLB".indexOf(move[0]);
		var pow = "? 2'".indexOf(move[1]);
		for (var i = 0; i < 5; i++) {
			mathlib.acycle(ret, moveData[axis][i], pow);
		}
		return ret.join('');
	}

	var curScramble;

	var CROSS_SOLVED = "----U--------R--R-----F--F--D-DDD-D-----L--L-----B--B-";
	var solvCross = new mathlib.gSolver([
		CROSS_SOLVED
	], pocketFaceletMove, moves);

	var f2lmaps = [{
		"----U-------RR-RR-----FF-FF-DDDDD-D-----L--L-----B--B-": 0x1,
		"----U--------R--R----FF-FF-DD-DDD-D-----LL-LL----B--B-": 0x2,
		"----U--------RR-RR----F--F--D-DDD-DD----L--L----BB-BB-": 0x4,
		"----U--------R--R-----F--F--D-DDDDD----LL-LL-----BB-BB": 0x8
	}, {
		"----U-------RR-RR----FFFFFFDDDDDD-D-----LL-LL----B--B-": 0x3,
		"----U-------RRRRRR----FF-FF-DDDDD-DD----L--L----BB-BB-": 0x5,
		"----U--------RR-RR---FF-FF-DD-DDD-DD----LL-LL---BB-BB-": 0x6,
		"----U-------RR-RR-----FF-FF-DDDDDDD----LL-LL-----BB-BB": 0x9,
		"----U--------R--R----FF-FF-DD-DDDDD----LLLLLL----BB-BB": 0xa,
		"----U--------RR-RR----F--F--D-DDDDDD---LL-LL----BBBBBB": 0xc
	}, {
		"----U-------RRRRRR---FFFFFFDDDDDD-DD----LL-LL---BB-BB-": 0x7,
		"----U-------RR-RR----FFFFFFDDDDDDDD----LLLLLL----BB-BB": 0xb,
		"----U-------RRRRRR----FF-FF-DDDDDDDD---LL-LL----BBBBBB": 0xd,
		"----U--------RR-RR---FF-FF-DD-DDDDDD---LLLLLL---BBBBBB": 0xe
	}, {
		"----U-------RRRRRR---FFFFFFDDDDDDDDD---LLLLLL---BBBBBB": 0xf
	}];

	var f2lsolvs = [];
	for (var i = 0; i < 4; i++) {
		f2lsolvs[i] = {};
		for (var solved in f2lmaps[i]) {
			f2lsolvs[i][solved] = new mathlib.gSolver([solved], pocketFaceletMove, movesWithoutD);
		}
	}

	function stageInit(state, sol) {
		for (var i = 0; i < curScramble.length; i++) {
			state = pocketFaceletMove(state, "DLFURB".charAt(curScramble[i][0]) + " 2'".charAt(curScramble[i][2] - 1));
		}
		for (var i = 0; i < sol.length; i++) {
			state = pocketFaceletMove(state, sol[i]);
		}
		return state
	}

	function solveParallel(solvs, maps, sol, mask) {
		var solcur;
		out: for (var maxl = 0; maxl < 11; maxl++) {
			for (var solved in solvs) {
				if ((maps[solved] | mask) != maps[solved]) {
					continue;
				}
				solcur = solvs[solved].search(stageInit(solved, sol), 0, maxl)[0];
				if (solcur != undefined) {
					mask |= maps[solved];
					break out;
				}
			}
		}
		return [solcur, mask];
	}

	function exec333Test(scramble, fdiv) {
		var span = $('<span class="sol"/>');
		var t = +new Date;
		var sol = [];
		fdiv.empty();
		if (!/^[URFDLB 2']+$/.exec(scramble)) {
			fdiv.html(IMAGE_UNAVAILABLE);
			return;
		}
		curScramble = kernel.parseScramble(scramble, "URFDLB");
		var solcross = solvCross.search(stageInit(CROSS_SOLVED, sol), 0, 8)[0];
		if (!solcross) {
			return;
		}
		sol = sol.concat(solcross);
		DEBUG && console.log('cross: ', solcross, '->', stageInit(mathlib.SOLVED_FACELET, sol), +new Date - t);
		span.append("Cross: &nbsp;z2", tools.getSolutionSpan(solcross), '<br>');

		var ret = [null, 0];
		var f2lsols = [];
		for (var i = 0; i < 4; i++) {
			ret = solveParallel(f2lsolvs[i], f2lmaps[i], sol, ret[1]);
			f2lsols[i] = ret[0];
			if (ret[0] == undefined) {
				span.append("F2L-" + (i + 1) + ": &nbsp;(no solution found in 10 moves)", '<br>');
				break;
			}
			span.append("F2L-" + (i + 1) + ": ", f2lsols[i].length == 0 ? '&nbsp;(skip)' : tools.getSolutionSpan(f2lsols[i]), '<br>');
			sol = sol.concat(f2lsols[i]);
			DEBUG && console.log('f2l' + (i + 1) + ': ', f2lsols[i], '->', ret[1], stageInit(mathlib.SOLVED_FACELET, sol), +new Date - t);
		}
		fdiv.append(span);
	}

	function execFunc(fdiv) {
		if (!fdiv) {
			return;
		}
		var scramble = tools.getCurScramble();
		if (tools.puzzleType(scramble[0]) == '333' ||
			scramble[0] == "input" && "|333|".indexOf('|' + tools.scrambleType(scramble[1]) + '|') != -1) {
			exec333Test(scramble[1], fdiv);
		} else {
			fdiv.html(IMAGE_UNAVAILABLE);
		}
	}

	$(function() {
		tools.regTool('333cf', 'Cross + F2L', execFunc);
	});

}, []);