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
		[[U1, U3, U9, U7], [U2, U6, U8, U4], [F1, L1, B1, R1], [F2, L2, B2, R2], [F3, L3, B3, R3]], // U
		[[R1, R3, R9, R7], [R2, R6, R8, R4], [U3, B7, D3, F3], [U6, B4, D6, F6], [U9, B1, D9, F9]], // R
		[[F1, F3, F9, F7], [F2, F6, F8, F4], [U7, R1, D3, L9], [U8, R4, D2, L6], [U9, R7, D1, L3]], // F
		[[D1, D3, D9, D7], [D2, D6, D8, D4], [F7, R7, B7, L7], [F8, R8, B8, L8], [F9, R9, B9, L9]], // D
		[[L1, L3, L9, L7], [L2, L6, L8, L4], [U1, F1, D1, B9], [U4, F4, D4, B6], [U7, F7, D7, B3]], // L
		[[B1, B3, B9, B7], [B2, B6, B8, B4], [U3, L1, D7, R9], [U2, L4, D8, R6], [U1, L7, D9, R3]], // B
		[[U2, F2, D2, B8], [U5, F5, D5, B5], [U8, F8, D8, B2]], // M
		[[R1, R3, R9, R7], [R2, R6, R8, R4], [U3, B7, D3, F3], [U6, B4, D6, F6], [U9, B1, D9, F9],
		 [L1, L7, L9, L3], [L2, L4, L8, L6], [U1, B9, D1, F1], [U4, B6, D4, F4], [U7, B3, D7, F7],
		 [U2, B8, D2, F2], [U5, B5, D5, F5], [U8, B2, D8, F8]], // x
		[[R1, R3, R9, R7], [R2, R6, R8, R4], [U3, B7, D3, F3], [U6, B4, D6, F6], [U9, B1, D9, F9],
		 [U2, B8, D2, F2], [U5, B5, D5, F5], [U8, B2, D8, F8]] // r = Rw
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

	var movesRouxSB = {
		"U ": 0x00,
		"U2": 0x00,
		"U'": 0x00,
		"R ": 0x11,
		"R2": 0x11,
		"R'": 0x11,
		"M ": 0x61,
		"M2": 0x61,
		"M'": 0x61,
		"r ": 0x71,
		"r2": 0x71,
		"r'": 0x71,
	}

	var faceStr = ["U", "R", "F", "D", "L", "B"];

	function cubeFaceletMove(state, move) {
		var ret = state.split('');
		var swaps = moveData["URFDLBMxr".indexOf(move[0])];
		var pow = "? 2'".indexOf(move[1]);
		for (var i = 0; i < swaps.length; i++) {
			mathlib.acycle(ret, swaps[i], pow);
		}
		return ret.join('');
	}

	var curScramble;
	var curScrambleStr;

	var cfmeta = [
		{
			'move': moves,
			'maxl': 8,
			'head': "Cross",
			'step': {
				"----U--------R--R-----F--F--D-DDD-D-----L--L-----B--B-": 0x0
			}
		}, {
			'move': movesWithoutD,
			'head': "F2L-1",
			'step': {
				"----U-------RR-RR-----FF-FF-DDDDD-D-----L--L-----B--B-": 0x1,
				"----U--------R--R----FF-FF-DD-DDD-D-----LL-LL----B--B-": 0x2,
				"----U--------RR-RR----F--F--D-DDD-DD----L--L----BB-BB-": 0x4,
				"----U--------R--R-----F--F--D-DDDDD----LL-LL-----BB-BB": 0x8
			}
		}, {
			'move': movesWithoutD,
			'head': "F2L-2",
			'step': {
				"----U-------RR-RR----FFFFFFDDDDDD-D-----LL-LL----B--B-": 0x3,
				"----U-------RRRRRR----FF-FF-DDDDD-DD----L--L----BB-BB-": 0x5,
				"----U--------RR-RR---FF-FF-DD-DDD-DD----LL-LL---BB-BB-": 0x6,
				"----U-------RR-RR-----FF-FF-DDDDDDD----LL-LL-----BB-BB": 0x9,
				"----U--------R--R----FF-FF-DD-DDDDD----LLLLLL----BB-BB": 0xa,
				"----U--------RR-RR----F--F--D-DDDDDD---LL-LL----BBBBBB": 0xc
			}
		}, {
			'move': movesWithoutD,
			'head': "F2L-3",
			'step': {
				"----U-------RRRRRR---FFFFFFDDDDDD-DD----LL-LL---BB-BB-": 0x7,
				"----U-------RR-RR----FFFFFFDDDDDDDD----LLLLLL----BB-BB": 0xb,
				"----U-------RRRRRR----FF-FF-DDDDDDDD---LL-LL----BBBBBB": 0xd,
				"----U--------RR-RR---FF-FF-DD-DDDDDD---LLLLLL---BBBBBB": 0xe
			}
		}, {
			'move': movesWithoutD,
			'head': "F2L-4",
			'step': {
				"----U-------RRRRRR---FFFFFFDDDDDDDDD---LLLLLL---BBBBBB": 0xf
			}
		}
	];

	var sabmeta = [
		{
			'move': moves,
			'maxl': 10,
			'fmov': ["x ", "x2", "x'"],
			'head': "Step 1",
			'step': {
				"---------------------F--F--D--D--D-----LLLLLL-----B--B": 0x0
			}
		}, {
			'move': movesRouxSB,
			'maxl': 16,
			'head': "Step 2",
			'step': {
				"------------RRRRRR---F-FF-FD-DD-DD-D---LLLLLL---B-BB-B": 0x1
			}
		}
	];



	for (var i = 0; i < cfmeta.length; i++) {
		cfmeta[i]['solv'] = {};
		for (var solved in cfmeta[i]['step']) {
			cfmeta[i]['solv'][solved] = new mathlib.gSolver([solved], cubeFaceletMove, cfmeta[i]['move']);
		}
	}

	for (var i = 0; i < sabmeta.length; i++) {
		sabmeta[i]['solv'] = {};
		for (var solved in sabmeta[i]['step']) {
			sabmeta[i]['solv'][solved] = new mathlib.gSolver([solved], cubeFaceletMove, sabmeta[i]['move']);
		}
	}

	function stageInit(state, sol) {
		for (var i = 0; i < curScramble.length; i++) {
			state = cubeFaceletMove(state, "DLFURB".charAt(curScramble[i][0]) + " 2'".charAt(curScramble[i][2] - 1));
		}
		for (var i = 0; i < sol.length; i++) {
			state = cubeFaceletMove(state, sol[i]);
		}
		return state
	}

	function solveParallel(solvs, maps, fmov, sol, mask, MAXL) {
		var solcur;
		out: for (var maxl = 0; maxl < MAXL + 1; maxl++) {
			for (var solved in solvs) {
				if ((maps[solved] | mask) != maps[solved]) {
					continue;
				}
				var state = stageInit(solved, sol);
				solcur = solvs[solved].search(state, 0, maxl)[0];
				if (solcur != undefined) {
					mask |= maps[solved];
					break out;
				}
				for (var m = 0; m < fmov.length; m++) {
					var fstate = cubeFaceletMove(state, fmov[m]);
					solcur = solvs[solved].search(fstate, 0, maxl)[0];
					if (solcur != undefined) {
						solcur.unshift(fmov[m]);
						mask |= maps[solved];
						break out;
					}
				}
			}
		}
		return [solcur, mask];
	}

	function toAlgLink(meta, sols) {
		var solstr = 'z2 // orientation \n';
		for (var i = 0; i < meta.length; i++) {
			solstr += sols[i].join(' ').replace(/\s+/g, ' ') + ' // ' + meta[i]['head'] + (sols[i].length == 0 ? ' skip' : '') + '\n';
		}
		return 'https://alg.cubing.net/?alg=' + encodeURIComponent(solstr);
	}

	function solveStepByStep(meta, span) {
		var t = +new Date;
		var ret = [null, 0];
		var sols = [];
		var sol = [];
		for (var i = 0; i < meta.length; i++) {
			ret = solveParallel(meta[i]['solv'], meta[i]['step'], meta[i]['fmov'] || [], sol, ret[1], meta[i]['maxl'] || 10);
			sols[i] = ret[0];
			if (ret[0] == undefined) {
				span.append(meta[i]['head'] + ": &nbsp;(no solution found in %d moves)".replace('%d', meta[i]['maxl'] || 10), '<br>');
				break;
			}
			span.append(meta[i]['head'] + ': ', sols[i].length == 0 ? '&nbsp;(skip)' : tools.getSolutionSpan(sols[i]), '<br>');
			sol = sol.concat(sols[i]);
			DEBUG && console.log('[step solver]', meta[i]['head'] + ': ', sols[i], '->', ret[1], stageInit(mathlib.SOLVED_FACELET, sol), +new Date - t);
		}
		span.append($('<a class="click" target="_blank">alg.cubing.net</a>').attr('href', toAlgLink(meta, sols) + '&setup=' + encodeURIComponent(curScrambleStr)));
	}

	function exec333StepSolver(type, scramble, fdiv) {
		var span = $('<span class="sol"/>');
		fdiv.empty();
		if (!/^[URFDLB 2']+$/.exec(scramble)) {
			fdiv.html(IMAGE_UNAVAILABLE);
			return;
		}
		curScrambleStr = scramble;
		curScramble = kernel.parseScramble(scramble, "URFDLB");

		span.append('Orientation: &nbsp;z2<br>');
		if (type == 'cf') {
			solveStepByStep(cfmeta, span);
		}
		if (type == 'roux') {
			solveStepByStep(sabmeta, span);
		}
		fdiv.append(span);
	}

	function execFunc(type, fdiv) {
		if (!fdiv) {
			return;
		}
		var scramble = tools.getCurScramble();
		if (tools.puzzleType(scramble[0]) == '333' ||
			scramble[0] == "input" && "|333|".indexOf('|' + tools.scrambleType(scramble[1]) + '|') != -1) {
			exec333StepSolver(type, scramble[1], fdiv);
		} else {
			fdiv.html(IMAGE_UNAVAILABLE);
		}
	}

	$(function() {
		tools.regTool('333cf', 'Cross + F2L', execFunc.bind(null, 'cf'));
		tools.regTool('333roux', 'Roux step 1 + 2', execFunc.bind(null, 'roux'));
	});

}, []);