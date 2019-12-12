"use strict";

execMain(function() {

	var curScramble;
	var curScrambleStr;
	var sol;

	function stateInit(doMove, state) {
		for (var i = 0; i < curScramble.length; i++) {
			state = doMove(state, curScramble[i]);
		}
		for (var i = 0; i < sol.length; i++) {
			state = doMove(state, sol[i]);
		}
		return state
	}

	function appendSuffix(moves, suffix) {
		var ret = {};
		suffix = " 2'";
		for (var m in moves) {
			for (var i = 0; i < suffix.length; i++) {
				ret[m + suffix[i]] = moves[m];
			}
		}
		return ret;
	}

	function solveParallel(doMove, solvs, maps, fmov, mask, MAXL) {
		var solcur;
		out: for (var maxl = 0; maxl < MAXL + 1; maxl++) {
			for (var solved in solvs) {
				if ((maps[solved] | mask) != maps[solved]) {
					continue;
				}
				var state = stateInit(doMove, solved);
				solcur = solvs[solved].search(state, 0, maxl)[0];
				if (solcur != undefined) {
					mask |= maps[solved];
					break out;
				}
				for (var m = 0; m < fmov.length; m++) {
					var fstate = doMove(state, fmov[m]);
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

	var pocketCube = (function() {
		var faceStr = ["U", "R", "F", "D", "L", "B"];
		var moveData = [
			[[0, 1, 3, 2], [4, 8, 16, 20], [5, 9, 17, 21]], // U
			[[4, 5, 7, 6], [1, 22, 13, 9], [3, 20, 15, 11]], // R
			[[8, 9, 11, 10], [2, 4, 13, 19], [3, 6, 12, 17]] // F
		];

		function pocketMove(state, move) {
			var ret = state.split('');
			var swaps = moveData["URF".indexOf(move[0])];
			var pow = "? 2'".indexOf(move[1]);
			for (var i = 0; i < swaps.length; i++) {
				mathlib.acycle(ret, swaps[i], pow);
			}
			return ret.join('');
		}

		var solv = new mathlib.gSolver([
			'XXXX????????????????????',
			'????XXXX????????????????',
			'????????XXXX????????????',
			'????????????XXXX????????',
			'????????????????XXXX????',
			'????????????????????XXXX',
		], pocketMove, appendSuffix({
			"U": 1,
			"R": 2,
			"F": 3,
		}));

		function execPocketFace(scramble, span) {
			curScramble = kernel.parseScramble(scramble, "URF");
			var state = 'UUUURRRRFFFFDDDDLLLLBBBB';
			for (var i = 0; i < curScramble.length; i++) {
				var m = curScramble[i];
				state = pocketMove(state, "URF".charAt(m[0]) + " 2'".charAt(m[2] - 1));
			}
			for (var face = 0; face < 6; face++) {
				var faceState = [];
				for (var i = 0; i < 24; i++) {
					faceState.push(state[i] == "URFDLB".charAt(face) ? 'X' : '?');
				}
				var sol = solv.search(faceState.join(''), 0)[0];
				span.append(faceStr[face] + ": ", tools.getSolutionSpan(sol), '<br>');
			}
		}
		return execPocketFace;
	})();

	var rubiksCube = (function() {

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

		var moves = appendSuffix({
			"U": 0x00,
			"R": 0x11,
			"F": 0x22,
			"D": 0x30,
			"L": 0x41,
			"B": 0x52,
		});

		var movesWithoutD = appendSuffix({
			"U": 0x00,
			"R": 0x11,
			"F": 0x22,
			"L": 0x41,
			"B": 0x52
		});

		var movesRouxSB = appendSuffix({
			"U": 0x00,
			"R": 0x11,
			"M": 0x61,
			"r": 0x71
		});

		var movesZZF2L = appendSuffix({
			"U": 0x00,
			"R": 0x11,
			"L": 0x41
		});

		function cubeMove(state, move) {
			var ret = state.split('');
			var swaps = moveData["URFDLBMxr".indexOf(move[0])];
			var pow = "? 2'".indexOf(move[1]);
			for (var i = 0; i < swaps.length; i++) {
				mathlib.acycle(ret, swaps[i], pow);
			}
			return ret.join('');
		}

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

		var petrusmeta = [
			{
				'move': moves,
				'maxl': 8,
				'head': "2x2x2",
				'step': {
					"---------------------FF-FF-DD-DD--------LL-LL---------": 0x1,
					"------------------------------DD-DD----LL-LL-----BB-BB": 0x2
				}
			}, {
				'move': moves,
				'maxl': 10,
				'head': "2x2x3",
				'step': {
					"---------------------FF-FF-DD-DD-DD----LLLLLL----BB-BB": 0x3
				}
			}
		];

		var zzmeta = [
			{
				'move': moves,
				'maxl': 10,
				'head': "EOLine",
				'step': {
					"-H-HUH-H-----R-------HFH-F--D-HDH-D-----L-------HBH-B-": 0x0,
				}
			}, {
				'move': movesZZF2L,
				'maxl': 16,
				'head': "ZZF2L1",
				'step': {
					"-H-HUH-H----RRRRRR---HFF-FF-DDHDD-DD----L-------BBHBB-": 0x1,
					"-H-HUH-H-----R-------FFHFF-DD-DDHDD----LLLLLL---HBB-BB": 0x2
				}
			}, {
				'move': movesZZF2L,
				'maxl': 16,
				'head': "ZZF2L2",
				'step': {
					"-H-HUH-H----RRRRRR---FFFFFFDDDDDDDDD---LLLLLL---BBBBBB": 0x3
				}
			}
		];

		function toAlgLink(meta, sols) {
			var solstr = 'z2 // orientation \n';
			for (var i = 0; i < sols.length; i++) {
				if (sols[i] == undefined) {
					break;
				}
				solstr += sols[i].join(' ').replace(/\s+/g, ' ') + ' // ' + meta[i]['head'] + (sols[i].length == 0 ? ' skip' : '') + '\n';
			}
			return 'https://alg.cubing.net/?alg=' + encodeURIComponent(solstr);
		}

		function solveStepByStep(meta, span) {
			var t = +new Date;
			var ret = [null, 0];
			var sols = [];
			sol = [];
			for (var i = 0; i < meta.length; i++) {
				if (!meta[i]['solv']) {
					meta[i]['solv'] = {};
					for (var solved in meta[i]['step']) {
						meta[i]['solv'][solved] = new mathlib.gSolver([solved], cubeMove, meta[i]['move']);
					}
				}
				ret = solveParallel(cubeMove, meta[i]['solv'], meta[i]['step'], meta[i]['fmov'] || [], ret[1], meta[i]['maxl'] || 10);
				sols[i] = ret[0];
				if (ret[0] == undefined) {
					span.append(meta[i]['head'] + ": &nbsp;(no solution found in %d moves)".replace('%d', meta[i]['maxl'] || 10), '<br>');
					break;
				}
				span.append(meta[i]['head'] + ': ', sols[i].length == 0 ? '&nbsp;(skip)' : tools.getSolutionSpan(sols[i]), '<br>');
				sol = sol.concat(sols[i]);
				DEBUG && console.log('[step solver]', meta[i]['head'] + ': ', sols[i], '->', ret[1], stateInit(cubeMove, mathlib.SOLVED_FACELET), +new Date - t);
			}
			span.append($('<a class="click" target="_blank">alg.cubing.net</a>').attr('href', toAlgLink(meta, sols) + '&setup=' + encodeURIComponent(curScrambleStr)));
		}

		function exec333StepSolver(type, scramble, span) {
			curScramble = kernel.parseScramble(scramble, "URFDLB");
			for (var i = 0; i < curScramble.length; i++) {
				curScramble[i] = "DLFURB".charAt(curScramble[i][0]) + " 2'".charAt(curScramble[i][2] - 1);
			}
			span.append('Orientation: &nbsp;z2<br>');
			if (type == 'cf') {
				solveStepByStep(cfmeta, span);
			}
			if (type == 'roux') {
				solveStepByStep(sabmeta, span);
			}
			if (type == 'petrus') {
				solveStepByStep(petrusmeta, span);
			}
			if (type == 'zz') {
				solveStepByStep(zzmeta, span);
			}
		}

		return exec333StepSolver;
	})();

	var sq1Cube = (function() {
		var moves = {'0': 0x21};
		for (var m = 1; m < 12; m++) {
			moves['' + m] = 0x00;
			moves['' + (-m)] = 0x10;
		}

		function sq1Move(state, move) {
			if (!state) {
				return null;
			}
			move = ~~move;
			state = state.split('|');
			if (move == 0) {
				var tmp = state[0].slice(6);
				state[0] = state[0].slice(0, 6) + state[1].slice(6);
				state[1] = state[1].slice(0, 6) + tmp;
			} else {
				var idx = move > 0 ? 0 : 1;
				move = Math.abs(move);
				state[idx] = state[idx].slice(move) + state[idx].slice(0, move);
				if (/[a-h]/.exec(state[idx][0] + state[idx][6])) {
					return null;
				}
			}
			return state.join('|');
		}

		var solv1;
		var solv2;

		function prettySq1Arr(sol) {
			var u = 0;
			var d = 0;
			var ret = [];
			for (var i = 0; i < sol.length; i++) {
				if (sol[i] == 0) {
					if (u == 0 && d == 0) {
						ret.push('/');
					} else {
						ret.push(((u + 5) % 12 - 5) + ',' + ((d + 5) % 12 - 5) + '/');
					}
					u = d = 0;
				} else if (sol[i] > 0) {
					u += ~~sol[i];
				} else {
					d -= ~~sol[i];
				}
			}
			return ret;
		}

		function sq1Solver(scramble, span) {
			solv1 = solv1 || new mathlib.gSolver([
				'0Aa0Aa0Aa0Aa|Aa0Aa0Aa0Aa0',
				'0Aa0Aa0Aa0Aa|0Aa0Aa0Aa0Aa',
				'Aa0Aa0Aa0Aa0|Aa0Aa0Aa0Aa0',
				'Aa0Aa0Aa0Aa0|0Aa0Aa0Aa0Aa'
			], sq1Move, moves);
			solv2 = solv2 || new mathlib.gSolver([
				'0Aa0Aa0Aa0Aa|Bb1Bb1Bb1Bb1',
				'0Aa0Aa0Aa0Aa|1Bb1Bb1Bb1Bb',
				'Aa0Aa0Aa0Aa0|Bb1Bb1Bb1Bb1',
				'Aa0Aa0Aa0Aa0|1Bb1Bb1Bb1Bb'
			], sq1Move, moves);
			curScramble = [];
			var movere = /^\s*\(\s*(-?\d+),\s*(-?\d+)\s*\)\s*$/
			var moveseq = scramble.split('/');
			for (var i = 0; i < moveseq.length; i++) {
				if (/^\s*$/.exec(moveseq[i])) {
					curScramble.push(0);
					continue;
				}
				var m = movere.exec(moveseq[i]);
				if (~~m[1]) {
					curScramble.push((~~m[1] + 12) % 12);
				}
				if (~~m[2]) {
					curScramble.push(-(~~m[2] + 12) % 12);
				}
				curScramble.push(0);
			}
			if (curScramble.length > 0) {
				curScramble.pop();
			}
			sol = [];
			var sol1 = solv1.search(stateInit(sq1Move, '0Aa0Aa0Aa0Aa|Aa0Aa0Aa0Aa0'), 0)[0];
			span.append('Shape: ', tools.getSolutionSpan(prettySq1Arr(sol1)), '<br>');
			sol = sol.concat(sol1);
			var sol2 = solv2.search(stateInit(sq1Move, '0Aa0Aa0Aa0Aa|Bb1Bb1Bb1Bb1'), 0)[0];
			span.append('Color: ', tools.getSolutionSpan(prettySq1Arr(sol2)), '<br>');
		}

		return sq1Solver;
	})();

	var skewbCube = (function() {
		var U0 = 0,
			U1 = 1,
			U2 = 2,
			U3 = 3,
			U4 = 4,
			R0 = 5,
			R1 = 6,
			R2 = 7,
			R3 = 8,
			R4 = 9,
			F0 = 10,
			F1 = 11,
			F2 = 12,
			F3 = 13,
			F4 = 14,
			D0 = 15,
			D1 = 16,
			D2 = 17,
			D3 = 18,
			D4 = 19,
			L0 = 20,
			L1 = 21,
			L2 = 22,
			L3 = 23,
			L4 = 24,
			B0 = 25,
			B1 = 26,
			B2 = 27,
			B3 = 28,
			B4 = 29;
		/**	1 2   U
			 0  LFRB
			3 4   D  */
		var moveData = [
			[[R0, B0, D0], [R4, B3, D2], [R2, B4, D1], [R3, B1, D4], [L3, F4, U4]],//R
			[[U0, L0, B0], [U2, L1, B2], [U4, L2, B4], [U1, L3, B1], [D4, R2, F1]],//U
			[[F0, D0, L0], [F3, D3, L4], [F1, D1, L3], [F4, D4, L2], [B4, U1, R3]],//L
			[[B0, L0, D0], [B4, L3, D4], [B3, L1, D3], [B2, L4, D2], [F3, R4, U2]],//B
			[[U0, B0, R0], [U4, B1, R2], [U3, B2, R4], [U2, B3, R1], [D2, F2, L1]],//r
			[[U0, L0, B0], [U2, L1, B2], [U4, L2, B4], [U1, L3, B1], [D4, R2, F1]],//b
			[[U0, B0, D0, F0], [U1, B2, D4, F3], [U2, B4, D3, F1], [U3, B1, D2, F4], [U4, B3, D1, F2], [R1, R2, R4, R3], [L1, L3, L4, L2]],//x
			[[R0, F0, L0, B0], [R1, F1, L1, B1], [R2, F2, L2, B2], [R3, F3, L3, B3], [R4, F4, L4, B4], [U1, U2, U4, U3], [D1, D3, D4, D2]],//y
			[]
		];

		var solv;

		function skewbMove(state, move) {
			var ret = state.split('');
			var swaps = moveData["RULBrbxy".indexOf(move[0])];
			var pow = "? '*".indexOf(move[1]);
			for (var i = 0; i < swaps.length; i++) {
				mathlib.acycle(ret, swaps[i], pow);
			}
			return ret.join('');
		}

		function skewbSolver(scramble, span) {
			solv = solv || new mathlib.gSolver([
				'?L?L??B?B?UUUUU?R?R???F?F?????',
				'?F?F??L?L?UUUUU?B?B???R?R?????',
				'?R?R??F?F?UUUUU?L?L???B?B?????',
				'?B?B??R?R?UUUUU?F?F???L?L?????'
			], skewbMove, appendSuffix({
				'R': 0x0,
				'r': 0x1,
				'B': 0x2,
				'b': 0x3,
			}, " '"));
			curScramble = kernel.parseScramble(scramble, "RULB");
			for (var i = 0; i < curScramble.length; i++) {
				curScramble[i] = "RULB".charAt(curScramble[i][0]) + " 2'".charAt(curScramble[i][2] - 1);
			}
			sol = [];
			var state = stateInit(skewbMove, 'U?????????????????????????????');
			var ori = ["x*", "y ", null, "x ", "y*", "y'"];
			var uidx = ~~(state.indexOf('U') / 5);
			if (ori[uidx]) {
				sol.push(ori[uidx]);
			}
			span.append('Orientation: &nbsp;' + (ori[uidx] || '').replace("'", "2").replace("*", "'") + '<br>');
			var sol1 = solv.search(stateInit(skewbMove, 'UUUUU?RR???FF????????LL???BB??'), 0)[0];
			span.append('Face: ', tools.getSolutionSpan(sol1), '<br>');
			sol = sol.concat(sol1);
		}

		return skewbSolver;
	})();

	function execFunc(type, fdiv) {
		if (!fdiv) {
			return;
		}
		fdiv.empty();
		var span = $('<span class="sol"/>');
		var scramble = tools.getCurScramble();
		curScrambleStr = scramble[1];
		if (type == '222face' && (
				tools.puzzleType(scramble[0]) == '222' ||
				scramble[0] == "input" && tools.scrambleType(scramble[1]) == '222o')) {
			pocketCube(scramble[1], span);
		} else if (type.startsWith('333') && (
				tools.puzzleType(scramble[0]) == '333' ||
				scramble[0] == "input" && tools.scrambleType(scramble[1]) == '333') &&
				/^[URFDLB 2']+$/.exec(scramble[1])) {
			rubiksCube(type.slice(3), scramble[1], span);
		} else if (type == 'sq1cs' && (
				tools.puzzleType(scramble[0]) == 'sq1')) {
			sq1Cube(scramble[1], span);
		} else if (type == 'skbl1' && (
				tools.puzzleType(scramble[0]) == 'skb')) {
			skewbCube(scramble[1], span);
		} else {
			fdiv.html(IMAGE_UNAVAILABLE);
			return;
		}
		fdiv.append(span);
	}

	$(function() {
		tools.regTool('222face', TOOLS_SOLVERS + '>' + TOOLS_222FACE, execFunc.bind(null, '222face'));
		tools.regTool('333cf', TOOLS_SOLVERS + '>Cross + F2L', execFunc.bind(null, '333cf'));
		tools.regTool('333roux', TOOLS_SOLVERS + '>Roux S1 + S2', execFunc.bind(null, '333roux'));
		tools.regTool('333petrus', TOOLS_SOLVERS + '>2x2x2 + 2x2x3', execFunc.bind(null, '333petrus'));
		tools.regTool('333zz', TOOLS_SOLVERS + '>EOLine + ZZF2L', execFunc.bind(null, '333zz'));
		tools.regTool('sq1cs', TOOLS_SOLVERS + '>SQ1 S1 + S2', execFunc.bind(null, 'sq1cs'));
		tools.regTool('skbl1', TOOLS_SOLVERS + '>Skewb Face', execFunc.bind(null, 'skbl1'));
	});
});

