(function() {
"use strict";

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
		suffix = suffix || " 2'";
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
				solcur = solvs[solved].search(state, 0, maxl);
				if (solcur != undefined) {
					mask |= maps[solved];
					break out;
				}
				for (var m = 0; m < fmov.length; m++) {
					var fstate = doMove(state, fmov[m]);
					solcur = solvs[solved].search(fstate, 0, maxl);
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
			'????????????????????XXXX'
		], pocketMove, appendSuffix({
			"U": 1,
			"R": 2,
			"F": 3
		}));

		function execPocketFace(scramble, span) {
			curScramble = cubeutil.parseScramble(scramble, "URF");
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
				var sol = solv.search(faceState.join(''), 0);
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
			[[U1, U3, U9, U7], [U2, U6, U8, U4], [F1, L1, B1, R1], [F2, L2, B2, R2], [F3, L3, B3, R3],
			 [F4, L4, B4, R4], [F5, L5, B5, R5], [F6, L6, B6, R6]], // u = Uw
			[[R1, R3, R9, R7], [R2, R6, R8, R4], [U3, B7, D3, F3], [U6, B4, D6, F6], [U9, B1, D9, F9],
			 [U2, B8, D2, F2], [U5, B5, D5, F5], [U8, B2, D8, F8]], // r = Rw
			[[F1, F3, F9, F7], [F2, F6, F8, F4], [U7, R1, D3, L9], [U8, R4, D2, L6], [U9, R7, D1, L3],
			 [U4, R2, D6, L8], [U5, R5, D5, L5], [U6, R8, D4, L2]], // f = Fw
			[[D1, D3, D9, D7], [D2, D6, D8, D4], [F7, R7, B7, L7], [F8, R8, B8, L8], [F9, R9, B9, L9],
			 [F4, R4, B4, L4], [F5, R5, B5, L5], [F6, R6, B6, L6]], // d = Dw
			[[L1, L3, L9, L7], [L2, L6, L8, L4], [U1, F1, D1, B9], [U4, F4, D4, B6], [U7, F7, D7, B3],
			 [U2, F2, D2, B8], [U5, F5, D5, B5], [U8, F8, D8, B2]], // l = Lw
			[[B1, B3, B9, B7], [B2, B6, B8, B4], [U3, L1, D7, R9], [U2, L4, D8, R6], [U1, L7, D9, R3],
			 [U6, L2, D4, R8], [U5, L5, D5, R5], [U4, L8, D6, R2]], // b = Bw
			[[U2, F2, D2, B8], [U5, F5, D5, B5], [U8, F8, D8, B2]], // M
			[[F4, R4, B4, L4], [F5, R5, B5, L5], [F6, R6, B6, L6]], // E
			[[U4, R2, D6, L8], [U5, R5, D5, L5], [U6, R8, D4, L2]], // S
			[[R1, R3, R9, R7], [R2, R6, R8, R4], [U3, B7, D3, F3], [U6, B4, D6, F6], [U9, B1, D9, F9],
			 [L1, L7, L9, L3], [L2, L4, L8, L6], [U1, B9, D1, F1], [U4, B6, D4, F4], [U7, B3, D7, F7],
			 [U2, B8, D2, F2], [U5, B5, D5, F5], [U8, B2, D8, F8]], // x
			[[U1, U3, U9, U7], [U2, U6, U8, U4], [F1, L1, B1, R1], [F2, L2, B2, R2], [F3, L3, B3, R3],
			 [D1, D7, D9, D3], [D2, D4, D8, D6], [F7, L7, B7, R7], [F8, L8, B8, R8], [F9, L9, B9, R9],
			 [F4, L4, B4, R4], [F5, L5, B5, R5], [F6, L6, B6, R6]], // y
			[[F1, F3, F9, F7], [F2, F6, F8, F4], [U7, R1, D3, L9], [U8, R4, D2, L6], [U9, R7, D1, L3],
			 [B1, B7, B9, B3], [B2, B4, B8, B6], [U3, R9, D7, L1], [U2, R6, D8, L4], [U1, R3, D9, L7],
			 [U4, R2, D6, L8], [U5, R5, D5, L5], [U6, R8, D4, L2]] // z
		];

		var moves = appendSuffix({
			"U": 0x00,
			"R": 0x11,
			"F": 0x22,
			"D": 0x30,
			"L": 0x41,
			"B": 0x52
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
			var swaps = moveData["URFDLBurfdlbMESxyz".indexOf(move[0])];
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
					"-H-HUH-H-----R-------HFH-F--D-HDH-D-----L-------HBH-B-": 0x0
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

		var eodrmeta = [
			{
				'move': moves,
				'maxl': 7,
				'head': "EO",
				'step': {
					"-H-HUH-H-----R-------HFH----H-HDH-H-----L-------HBH---": 0x0
				}
			}, {
				'move': moves,
				'maxl': 10,
				'head': "DR",
				'step': {
					"UUUUUUUUU---RRR------FFF---UUUUUUUUU---RRR------FFF---": 0x1
				}
			}
		];

		function toAlgLink(meta, sols, ori) {
			var solstr = ori + ' // orientation \n';
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
			span.append($('<a class="click" target="_blank">alg.cubing.net</a>').attr('href', toAlgLink(meta, sols, curOri) + '&setup=' + encodeURIComponent(curScrambleStr)));
		}

		var block222solv;

		function block222Solver(scramble, span) {
			curScramble = cubeutil.parseScramble(scramble, "URFDLB");
			for (var i = 0; i < curScramble.length; i++) {
				curScramble[i] = "URFDLB".charAt(curScramble[i][0]) + " 2'".charAt(curScramble[i][2] - 1);
			}
			var faceStr = ["URF", "UFL", "ULB", "UBR", "DFR", "DLF", "DBL", "DRB"];
			var faceSolved = [
				'----UU-UURR-RR-----FF-FF------------------------------',
				'---UU-UU----------FF-FF--------------LL-LL------------',
				'UU-UU-------------------------------LL-LL-----BB-BB---',
				'-UU-UU----RR-RR------------------------------BB-BB----',
				'------------RR-RR-----FF-FF-DD-DD---------------------',
				'---------------------FF-FF-DD-DD--------LL-LL---------',
				'------------------------------DD-DD----LL-LL-----BB-BB',
				'-------------RR-RR-------------DD-DD------------BB-BB-'
			];
			block222solv = block222solv || new mathlib.gSolver(faceSolved, cubeMove, moves);
			for (var i = 0; i < 8; i++) {
				span.append(faceStr[i] + ': ');
				sol = [];
				var sol1 = block222solv.search(stateInit(cubeMove, faceSolved[i]), 0);
				if (sol1) {
					span.append(tools.getSolutionSpan(sol1), '<br>');
				} else {
					span.append('no solution found<br>');
				}
			}
		}

		function getMoveMap(ori) {
			var rot = ori.split(' ');
			var map = [0, 1, 2, 3, 4, 5];
			var rotMap = [
				[5, 1, 0, 2, 4, 3], //x
				[0, 2, 4, 3, 5, 1], //y
				[1, 3, 2, 4, 0, 5] //z
			];
			for (var i = 0; i < rot.length; i++) {
				if (!rot[i][0]) {
					continue;
				}
				var axis = "xyz".indexOf(rot[i][0]);
				var pow = "? 2'".indexOf(rot[i][1] || ' ');
				for (var p = 0; p < pow; p++) {
					for (var j = 0; j < 6; j++) {
						map[j] = rotMap[axis][map[j]];
					}
				}
			}
			for (var j = 0; j < 6; j++) {
				map[j] = "URFDLB".charAt(map[j]);
			}
			return map.join('');
		}

		var oriSelect;
		var curType;
		var curSpan;
		var curOri = 'z2';

		function oriChange() {
			curOri = oriSelect.val();
			rubiksCube.exec(curType, curScrambleStr, curSpan.empty());
		}

		execMain(function() {
			var cubeOris = ["z2", "", "z ", "z'", "x ", "x'"];
			for (var i = 0; i < 6; i++) {
				for (var j = 0; j < 3; j++) {
					cubeOris.push(cubeOris[i] + " y" + " 2'".charAt(j));
				}
			}
			oriSelect = $('<select>');
			for (var i = 0; i < cubeOris.length; i++) {
				oriSelect.append($('<option>').val(cubeOris[i]).html(cubeOris[i]));
			}
		});

		function exec333StepSolver(type, scramble, span) {
			if (type == '222') {
				block222Solver(scramble, span);
				return;
			}
			curSpan = span;
			curType = type;
			var moveMap = getMoveMap(curOri);
			curScramble = cubeutil.parseScramble(scramble, "URFDLB");
			for (var i = 0; i < curScramble.length; i++) {
				curScramble[i] = moveMap.charAt(curScramble[i][0]) + " 2'".charAt(curScramble[i][2] - 1);
			}
			span.append('Orientation:', oriSelect.unbind('change').change(oriChange), '<br>');
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
			if (type == 'eodr') {
				solveStepByStep(eodrmeta, span);
			}
		}

		return {
			exec: exec333StepSolver,
			move: cubeMove
		};
	})();

	var sq1Cube = (function() {
		var moves = { '0': 0x21 };
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
			var sol1 = solv1.search(stateInit(sq1Move, '0Aa0Aa0Aa0Aa|Aa0Aa0Aa0Aa0'), 0);
			span.append('Shape: ', tools.getSolutionSpan(prettySq1Arr(sol1)), '<br>');
			sol = sol.concat(sol1);
			var sol2 = solv2.search(stateInit(sq1Move, '0Aa0Aa0Aa0Aa|Bb1Bb1Bb1Bb1'), 0);
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
			[[R0, B0, D0], [R4, B3, D2], [R2, B4, D1], [R3, B1, D4], [L3, F4, U4]], //R
			[[U0, L0, B0], [U2, L1, B2], [U4, L2, B4], [U1, L3, B1], [D4, R2, F1]], //U
			[[F0, D0, L0], [F3, D3, L4], [F1, D1, L3], [F4, D4, L2], [B4, U1, R3]], //L
			[[B0, L0, D0], [B4, L3, D4], [B3, L1, D3], [B2, L4, D2], [F3, R4, U2]], //B
			[[U0, B0, R0], [U4, B1, R2], [U3, B2, R4], [U2, B3, R1], [D2, F2, L1]], //r
			[[U0, L0, B0], [U2, L1, B2], [U4, L2, B4], [U1, L3, B1], [D4, R2, F1]], //b
			[[U0, B0, D0, F0], [U1, B2, D4, F3], [U2, B4, D3, F1], [U3, B1, D2, F4], [U4, B3, D1, F2], [R1, R2, R4, R3], [L1, L3, L4, L2]], //x
			[[R0, F0, L0, B0], [R1, F1, L1, B1], [R2, F2, L2, B2], [R3, F3, L3, B3], [R4, F4, L4, B4], [U1, U2, U4, U3], [D1, D3, D4, D2]], //y
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
				'b': 0x3
			}, " '"));
			curScramble = cubeutil.parseScramble(scramble, "RULB");
			for (var i = 0; i < curScramble.length; i++) {
				curScramble[i] = "RULB".charAt(curScramble[i][0]) + " 2'".charAt(curScramble[i][2] - 1);
			}
			var faceStr = ["U", "R", "F", "D", "L", "B"];
			var faceSolved = [
				'UUUUU?RR???FF????????LL???BB??',
				'???BBUUUUU??L?L?FF????????R?R?',
				'?B?B??R?R?UUUUU?F?F???L?L?????',
				'????????RR???BBUUUUU???LL???FF',
				'?BB????????R?R????FFUUUUU??L?L',
				'??F?F??R?R???????B?B?L?L?UUUUU'
			];
			for (var i = 0; i < 6; i++) {
				sol = [];
				var state = stateInit(skewbMove, 'U????R????F????D????L????B????');
				var ori = ["x*", "y ", null, "x ", "y*", "y'"];
				var uidx = ~~(state.indexOf(faceStr[i]) / 5);
				if (ori[uidx]) {
					sol.push(ori[uidx]);
				}
				var sol1 = solv.search(stateInit(skewbMove, faceSolved[i]), 0);
				if (sol1) {
					span.append(faceStr[i] + ': ');
					if (sol[0]) {
						span.append('&nbsp;' + sol[0].replace("'", "2").replace("*", "'"));
					}
					span.append(tools.getSolutionSpan(sol1), '<br>');
				} else {
					span.append(faceStr[i] + ': no solution found<br>');
				}
			}
		}

		return skewbSolver;
	})();

	var pyraCube = (function() {
		var F0 = 0,
			F1 = 1,
			F2 = 2,
			F3 = 3,
			F4 = 4,
			F5 = 5,
			R0 = 6,
			R1 = 7,
			R2 = 8,
			R3 = 9,
			R4 = 10,
			R5 = 11,
			L0 = 12,
			L1 = 13,
			L2 = 14,
			L3 = 15,
			L4 = 16,
			L5 = 17,
			D0 = 18,
			D1 = 19,
			D2 = 20,
			D3 = 21,
			D4 = 22,
			D5 = 23;
		/*
		L F R
		  D
		x504x x x504x
		 132 231 132
		  x x405x x

		    x504x
		     132
		      x  */
		var moveData = [
			[[F5, R3, D4], [F0, R1, D2], [F1, R2, D0]], //R
			[[F3, L4, R5], [F1, L2, R0], [F2, L0, R1]], //U
			[[F4, D5, L3], [F2, D0, L1], [F0, D1, L2]], //L
			[[R4, L5, D3], [R2, L0, D1], [R0, L1, D2]] //B
		];

		function pyraMove(state, move) {
			var ret = state.split('');
			var swaps = moveData["RULB".indexOf(move[0])];
			var pow = "? '".indexOf(move[1]);
			for (var i = 0; i < swaps.length; i++) {
				mathlib.acycle(ret, swaps[i], pow);
			}
			return ret.join('');
		}

		var solv;

		function pyraSolver(scramble, span) {
			solv = solv || new mathlib.gSolver([
				'????FF??RRR??L?L?L?DDDDD'
			], pyraMove, appendSuffix({
				'R': 0x0,
				'U': 0x1,
				'L': 0x2,
				'B': 0x3
			}, " '"));
			curScramble = cubeutil.parseScramble(scramble, "RULBrulb");
			scramble = [];
			for (var i = 0; i < curScramble.length; i++) {
				if (curScramble[i][1] == 1) {
					scramble.push("RULB".charAt(curScramble[i][0]) + " 2'".charAt(curScramble[i][2] - 1));
				}
			}
			var faceStr = ["D", "L", "R", "F"];
			var rawMap = "RULB";
			var moveMaps = [["RULB", "LUBR", "BURL"], ["URBL", "LRUB", "BRLU"], ["RLBU", "ULRB", "BLUR"], ["RBUL", "UBLR", "LBRU"]];
			for (var i = 0; i < 4; i++) {
				sol = [];
				var sol1;
				out: for (var depth = 0; depth < 99; depth++) {
					for (var j = 0; j < 3; j++) {
						var moveMap = moveMaps[i][j];
						curScramble = [];
						for (var m = 0; m < scramble.length; m++) {
							curScramble.push(rawMap[moveMap.indexOf(scramble[m][0])] + scramble[m][1]);
						}
						sol1 = solv.search(stateInit(pyraMove, '????FF??RRR??L?L?L?DDDDD'), depth, depth);
						if (!sol1) {
							continue;
						}
						for (var m = 0; m < sol1.length; m++) {
							sol1[m] = moveMap[rawMap.indexOf(sol1[m][0])] + sol1[m][1];
						}
						break out;
					}
				}
				if (sol1) {
					span.append(faceStr[i] + ': ', tools.getSolutionSpan(sol1), '<br>');
				} else {
					span.append(faceStr[i] + ': no solution found<br>');
				}
			}
		}

		return pyraSolver;
	})();

	var general333Solver = execMain(function() {
		var isSolving = 0; //0 - idle, 1 - single, 2 - batch
		var selectPre = $('<select style="font-size:0.75em;">');
		var selectMode = $('<select style="font-size:0.75em;">');
		var solveButton = $('<input type="button" value="Solve!" style="font-size:0.75em;">');
		var resultText = $('<textarea wrap=off rows="8" cols="30" style="font-size:0.75em; display:none;">');
		var resultSpan = $('<span>');
		var subsetInfo = $('<span style="display:block;">');
		var resultArr = [];
		var presets = {
			'3x3x3': mathlib.SOLVED_FACELET,
			'Empty': '----U--------R--------F--------D--------L--------B----',
			'2x2x2': '----UU-UURR-RR-----FF-FF------------------------------',
			'2x2x3': '---UUUUUURR-RR----FFFFFF-------------LL-LL------------',
			'Cross': '----U--------R--R-----F--F--D-DDD-D-----L--L-----B--B-',
			'XCross': '----U-------RR-RR-----FF-FF-DDDDD-D-----L--L-----B--B-',
			'EOLine': '-X-XUX-X-----R-------XFX-F--D-XDX-D-----L-------XBX-B-',
			'Roux1': '---------------------F--F--D--D--D-----LLLLLL-----B--B',
			'Domino': 'UUUUUUUUU---RRR------FFF---UUUUUUUUU---RRR------FFF---',
			'EO&CO': 'XYXYUYXYX----R-------YFY---XYXYDYXYX----L-------YBY---',
			'Corner': 'U-U---U-UR-R---R-RF-F---F-FD-D---D-DL-L---L-LB-B---B-B'
		};
		var canvas, ctx;
		var solvedState = mathlib.SOLVED_FACELET;
		var colors = {
			'U': '#fff',
			'R': '#f00',
			'F': '#0d0',
			'D': '#ff0',
			'L': '#fa0',
			'B': '#00f',
			'-': '#777',
			'X': '#0ff',
			'Y': '#f0f',
			'Z': '#000'
		};
		var selColor = '-';
		var width = 30;
		var offxs = [1, 2, 1, 1, 0, 3, 7.25];
		var offys = [0, 1, 1, 2, 1, 1, 0.50];
		var selXYs = [[-0.7, -0.7, 0.7, 0.7], [-0.7, 0.7, 0.7, -0.7]];
		var offw = 3.3;
		var stateRE = /^[URFDLBXYZ-]{54}$/;

		function procClick(e) {
			clearSolve();
			var rect = canvas[0].getBoundingClientRect();
			var cordX = e.offsetX / width * canvas[0].width / rect.width;
			var cordY = e.offsetY / width * canvas[0].height / rect.height;

			for (var face = 0; face < 6; face++) {
				if (cordX >= offxs[face] * offw &&
					cordX <= offxs[face] * offw + 3 &&
					cordY >= offys[face] * offw &&
					cordY <= offys[face] * offw + 3) {
					var i = ~~(cordX - offxs[face] * offw);
					var j = ~~(cordY - offys[face] * offw);
					var tmp = solvedState.split('');
					tmp[face * 9 + 3 * j + i] = selColor;
					setState(tmp.join(''));
					drawFacelet(ctx, face, i, j, solvedState);
				}
			}
			if (cordX >= offxs[6] &&
				cordX <= offxs[6] + 5 &&
				cordY >= offys[6] &&
				cordY <= offys[6] + 2) {
				var i = ~~(cordX - offxs[6]);
				var j = ~~(cordY - offys[6]);
				selColor = 'URFDLB-XYZ'.charAt(i * 2 + j);
				$.ctxDrawPolygon(ctx, colors[selColor], selXYs, [width, 1.5, 1.5]);
			}
		}

		function drawFacelet(ctx, face, i, j, state) {
			$.ctxDrawPolygon(ctx, colors[state[face * 9 + j * 3 + i]], [
				[i, i, i + 1, i + 1],
				[j, j + 1, j + 1, j]
			], [width, offxs[face] * offw + 0.1, offys[face] * offw + 0.1]);
		}

		function drawCube(ctx, state) {
			var imgSize = kernel.getProp('imgSize') / 48;
			canvas.width(39 * imgSize + 'em');
			canvas.height(29 * imgSize + 'em');

			canvas.attr('width', 39 * 3 / 9 * width + 1);
			canvas.attr('height', 29 * 3 / 9 * width + 1);

			for (var face = 0; face < 6; face++) {
				for (var i = 0; i < 3; i++) {
					for (var j = 0; j < 3; j++) {
						drawFacelet(ctx, face, i, j, state);
					}
				}
			}
			for (var i = 0; i < 5; i++) {
				for (var j = 0; j < 2; j++) {
					$.ctxDrawPolygon(ctx, colors['URFDLB-XYZ'.charAt(i * 2 + j)], [
						[i, i, i + 1, i + 1],
						[j, j + 1, j + 1, j]
					], [width, 7.25, 0.5]);
				}
			}
			$.ctxDrawPolygon(ctx, colors[selColor], selXYs, [width, 1.5, 1.5]);
		}

		function selectChange(e) {
			var state = selectPre.val();
			selectPre.val('');
			kernel.blur();
			if (state == 'input') {
				state = prompt('U1U2...U9R1..R9F1..D1..L1..B1..B9', solvedState);
				if (state == null) {
					return;
				}
				if (!stateRE.exec(state)) {
					logohint.push(LGHINT_INVALID);
					return;
				}
				setState(state);
			} else if (state != '') {
				setState(state);
			}
		}

		function setState(state) {
			if (solvedState == state) {
				return;
			}
			solvedState = state;
			drawCube(ctx, solvedState);
			params = pat3x3.calcPattern(solvedState, solvedState);
			var sizeH = params[0][0] * params[1][0] + params[0][1] * params[1][1];
			var indexH = 43252003274489856000 / sizeH;
			subsetInfo.html(
				// '|H|=' + (sizeH > 1e8 ? sizeH.toExponential(3) : sizeH) + '<br>' +
				'|G:H|=' + (indexH > 1e8 ? indexH.toExponential(3) : indexH)
			);
			clearSolve();
		}

		var curSolver = ['', null];
		var params = [[0, 0], [0, 0]];
		var startTime = 0;
		var solveTid = 0;

		function searchThread() {
			if (!isSolving) {
				return;
			}
			var ret = curSolver[1].searchNext(1000, 1000);
			var curStatus = '';
			curStatus = resultArr.length + ' sol(s), @' + ~~((+new Date - startTime) / 1000) + 's|' + curSolver[1].maxl + 'f';
			if (ret) {
				resultArr.push(ret.join(' ') + ' (' + ret.length + 'f)');
			}
			if (isSolving == 1) {
				resultSpan.html(ret ? resultArr.join('\n') : curStatus);
				if (ret) {
					solveTid = 0;
					return;
				}
			} else {
				resultText.html(resultArr.join('\n') + '\n' + curStatus);
				resultText[0].scrollTop = resultText[0].scrollHeight;
			}
			solveTid = setTimeout(searchThread, 1);
		}

		function clearSolve() {
			if (isSolving == 1 || isSolving == 2) {
				toggleSolve();
			}
		}

		function startSolve() {
			if (curSolver[0] != solvedState) {
				curSolver[0] = solvedState;
				curSolver[1] = new mathlib.gSolver([solvedState], rubiksCube.move, appendSuffix({
					"U": 0x00,
					"R": 0x11,
					"F": 0x22,
					"D": 0x30,
					"L": 0x41,
					"B": 0x52
				}));
			}
			if (isSolving == 2) {
				canvas.hide();
				subsetInfo.addClass('click');
				resultSpan.hide();
				resultText.show();
			} else {
				canvas.show();
				subsetInfo.removeClass('click');
				resultSpan.html('Searching...').show();
				resultText.hide();
			}
			var startState = stateInit(rubiksCube.move, solvedState);
			var ret = curSolver[1].search(startState, 0, 0);
			startTime = +new Date;
			resultArr = [];
			searchThread();
		}

		function toggleSolve() {
			if (isSolving == 0) {
				solveButton.val('Stop!');
				selectMode.prop('disabled', true);
				isSolving = selectMode.val() == 'batch' ? 2 : 1;
			} else {
				solveButton.val('Solve!');
				selectMode.prop('disabled', false);
				isSolving = 0;
			}
			kernel.blur();
			if (!isSolving) {
				return;
			}
			startSolve();
		}

		function execFunc(scramble, span) {
			curScramble = cubeutil.parseScramble(scramble, "URFDLB");
			for (var i = 0; i < curScramble.length; i++) {
				curScramble[i] = "URFDLB".charAt(curScramble[i][0]) + " 2'".charAt(curScramble[i][2] - 1);
			}
			sol = [];
			span.empty().append($('<table class="table">').append(
				$('<tr>').append(
					$('<td style="padding:0;">').append(
						selectPre.unbind('change').change(selectChange),
						selectMode,
						solveButton.unbind('click').click(toggleSolve)),
				),
				$('<tr>').append(
					$('<td>').append(resultText.empty(), resultSpan)
				),
				$('<tr>').append(
					$('<td style="padding:0;">').append(
						canvas.unbind('mousedown').bind('mousedown', procClick), subsetInfo.unbind('click').click(function() {
							clearSolve();
							canvas.show();
							subsetInfo.removeClass('click');
						})
					)
				)
			));

			if (isSolving) {
				if (solveTid) {
					clearTimeout(solveTid);
					solveTid = 0;
				}
				startSolve();
			}
		}

		$(function() {
			canvas = $('<canvas>');
			if (!canvas[0].getContext) {
				return;
			}
			ctx = canvas[0].getContext('2d');
			selectPre.append($('<option>').val('').html('Edit subset'));
			for (var subset in presets) {
				selectPre.append($('<option>').val(presets[subset]).html(subset));
			}
			selectPre.append($('<option>').val('input').html('...'));
			selectMode.append($('<option>').val('single').html('Single'));
			selectMode.append($('<option>').val('batch').html('Batch'));
			setState(presets['Cross']);
		});

		return execFunc;
	});

	var twophase = execMain(function() {
		var isSolving = 0; //0 - idle, 1 - single, 2 - batch
		var selectMode = $('<select style="font-size:0.75em;">');
		var solveButton = $('<input type="button" value="Solve!" style="font-size:0.75em;">');
		var resultText = $('<textarea rows="8" cols="30" style="font-size:0.75em;">');
		var resultArr = [];
		var canvas, ctx;
		var solvedState = mathlib.SOLVED_FACELET;
		var selColor = '-';

		var search = new min2phase.Search();
		var startTime = 0;
		var solveTid = 0;

		function searchThread() {
			if (!isSolving) {
				return;
			}
			var ret = search.next(1000, 0);
			var curStatus = resultArr.length + ' sol(s), @' + ~~((+new Date - startTime) / 1000) + 's|' + search.length1 + 'f';
			if (ret.startsWith('Error 7')) {
				resultText.html(resultArr.join('\n') + '\n' + curStatus + '*');
				solveTid = 0;
				return;
			} else if (!ret.startsWith('Error')) {
				resultArr.push(ret.replace(/ +/g, ' ') + ' (' + ~~(ret.length / 3) + 'f)');
			}
			resultText.html(resultArr.join('\n') + '\n' + curStatus);
			if (isSolving == 1) {
				if (ret) {
					solveTid = 0;
					return;
				}
			} else {
				resultText[0].scrollTop = resultText[0].scrollHeight;
			}
			solveTid = setTimeout(searchThread, 1);
		}

		function clearSolve() {
			if (isSolving == 1 || isSolving == 2) {
				toggleSolve();
			}
		}

		function startSolve() {
			var startState = stateInit(rubiksCube.move, solvedState);
			var ret = search.solution(startState, 30, 0, 0);
			startTime = +new Date;
			resultArr = [];
			searchThread();
		}

		function toggleSolve() {
			if (isSolving == 0) {
				solveButton.val('Stop!');
				selectMode.prop('disabled', true);
				isSolving = selectMode.val() == 'batch' ? 2 : 1;
			} else {
				solveButton.val('Solve!');
				selectMode.prop('disabled', false);
				isSolving = 0;
			}
			kernel.blur();
			if (!isSolving) {
				return;
			}
			startSolve();
		}

		function execFunc(scramble, span) {
			curScramble = cubeutil.parseScramble(scramble, "URFDLB");
			for (var i = 0; i < curScramble.length; i++) {
				curScramble[i] = "URFDLB".charAt(curScramble[i][0]) + " 2'".charAt(curScramble[i][2] - 1);
			}
			sol = [];
			span.empty().append($('<table class="table">').append(
				$('<tr>').append(
					$('<td style="padding:0;">').append(
						selectMode,
						solveButton.unbind('click').click(toggleSolve)),
				),
				$('<tr>').append(
					$('<td>').append(resultText.empty())
				)
			));

			if (isSolving) {
				if (solveTid) {
					clearTimeout(solveTid);
					solveTid = 0;
				}
				startSolve();
			}
		}

		$(function() {
			canvas = $('<canvas>');
			if (!canvas[0].getContext) {
				return;
			}
			ctx = canvas[0].getContext('2d');
			selectMode.append($('<option>').val('single').html('Single'));
			selectMode.append($('<option>').val('batch').html('Batch'));
		});

		return execFunc;
	});

	execMain(function() {
		function execFunc(type, fdiv) {
			if (!fdiv) {
				return;
			}
			fdiv.empty();
			var span = $('<span class="sol"/>');
			var scramble = tools.getCurScramble();
			curScrambleStr = scramble[1];
			if (type == '222face' && tools.isPuzzle('222')) {
				pocketCube(scramble[1], span);
			} else if (type == '333udf' && tools.isPuzzle('333') && /^[URFDLB 2']+$/.exec(scramble[1])) {
				general333Solver(scramble[1], span);
			} else if (type == '333koc' && tools.isPuzzle('333') && /^[URFDLB 2']+$/.exec(scramble[1])) {
				twophase(scramble[1], span);
			} else if (type.startsWith('333') && tools.isPuzzle('333') && /^[URFDLB 2']+$/.exec(scramble[1])) {
				rubiksCube.exec(type.slice(3), scramble[1], span);
			} else if (type == 'sq1cs' && tools.isPuzzle('sq1')) {
				sq1Cube(scramble[1], span);
			} else if (type == 'skbl1' && tools.isPuzzle('skb')) {
				skewbCube(scramble[1], span);
			} else if (type == 'pyrv' && tools.isPuzzle('pyr')) {
				pyraCube(scramble[1], span);
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
			tools.regTool('333222', TOOLS_SOLVERS + '>2x2x2', execFunc.bind(null, '333222'));
			tools.regTool('333eodr', TOOLS_SOLVERS + '>EO + DR', execFunc.bind(null, '333eodr'));
			tools.regTool('sq1cs', TOOLS_SOLVERS + '>SQ1 S1 + S2', execFunc.bind(null, 'sq1cs'));
			tools.regTool('pyrv', TOOLS_SOLVERS + '>Pyraminx V', execFunc.bind(null, 'pyrv'));
			tools.regTool('skbl1', TOOLS_SOLVERS + '>Skewb Face', execFunc.bind(null, 'skbl1'));
			tools.regTool('333udf', TOOLS_SOLVERS + '>3x3x3 General', execFunc.bind(null, '333udf'));
			tools.regTool('333koc', TOOLS_SOLVERS + '>3x3x3 TwoPhase', execFunc.bind(null, '333koc'));
		});
	});
})();
