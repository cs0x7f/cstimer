"use strict";

execMain(function() {
	function doAlg(doMove, state, alg) {
		for (var i = 0; i < alg.length; i++) {
			state = doMove(state, alg[i]);
		}
		return state
	}

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

		function cubeMove(state, move) {
			var ret = state.split('');
			var swaps = moveData["URFDLBurfdlbMESxyz".indexOf(move[0])];
			var pow = "? 2'".indexOf(move[1]);
			for (var i = 0; i < swaps.length; i++) {
				mathlib.acycle(ret, swaps[i], pow);
			}
			return ret.join('');
		}

		var solved = 'UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB';
		var movere = /^([URFDLBurfdlbMESxyz]|[URFDLB]w)(2?)('?)$/;

		function preProcAlg(algstr) {
			var alg = algstr.split(' ');
			var ret = [];
			for (var i = 0; i < alg.length; i++) {
				if (!alg[i]) {
					continue;
				}
				var m = movere.exec(alg[i]);
				if (!m) {
					return [];
				}
				var axis = m[1].length == 1 ? m[1] : m[1].toLowerCase();
				var pow = (4 + (m[2] ? 2 : 1) * (m[3] ? -1 : 1)) % 4;
				ret.push(axis + "? 2'".charAt(pow));
			}
			return ret;
		}

		function generateConjs(state) {
			var stateList = {};
			for (var u = 0; u < 4; u++) {
				for (var y = 0; y < 4; y++) {
					stateList[state] = stateList[state] || [(y + u) % 4, u];
					state = cubeMove(state, 'y ').toLowerCase();
					state = state.replace(/u/g, 'U').replace(/r/g, 'F').replace(/f/g, 'L')
						.replace(/d/g, 'D').replace(/l/g, 'B').replace(/b/g, 'R').toUpperCase();
				}
				state = cubeMove(state, 'U ');
			}
			return stateList;
		}

		function stateMatch(state, fixed) {
			for (var i = 0; i < fixed.length; i++) {
				if (state[i] != fixed[i] && state[i] != '?') {
					return false;
				}
			}
			return true;
		}

		function findAlgByScramble(type, scramble, callback) {
			var start_state = {
				'oll': 'UUUUUUUUU???RRRRRR???FFFFFFDDDDDDDDD???LLLLLL???BBBBBB'
			} [type] || solved;
			var t = +new Date;
			var algRet = [];
			scramble = preProcAlg(scramble);
			var states = generateConjs(doAlg(cubeMove, start_state, scramble));
			var req = [];
			for (var state in states) {
				if (state == start_state) {
					callback(['Already solved']);
					return;
				}
				req.push(state);
			}
			req = req.join(',');
			$.post('https://cstimer.net/alg.php', {
				'states': req
			}, function(ret) {
				ret = JSON.parse(ret);
				if (ret['retcode'] != 0) {
					callback(['Network Error']);
					return;
				}
				ret = ret['data'];
				var algDict = {};
				for (var i = 0; i < ret.length; i++) {
					algDict[ret[i]['state']] = algDict[ret[i]['state']] || [];
					algDict[ret[i]['state']].push(ret[i]['algorithm']);
				}
				for (var state in states) {
					var conj = states[state];
					for (var target in algDict) {
						if (!stateMatch(state, target)) {
							continue;
						}
						var algs = algDict[target];
						for (var i = 0; i < algs.length; i++) {
							algRet.push((conj[0] > 0 ? '(y' + "? 2'".charAt(conj[0]) + ') ' : '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;') + algs[i]);
						}
					}
				}
				callback(algRet);
			}).error(function() {
				callback(['Network Error']);
			});
		}

		return {
			findAlgByScramble: findAlgByScramble
		};
	})();

	function execFunc(fdiv) {
		if (!fdiv) {
			return;
		}
		fdiv.empty();
		var span = $('<span class="sol"/>').html('Fetching...');
		fdiv.append(span);
		var scramble = tools.getCurScramble();
		if (tools.isPuzzle('333') && (scramble[0] == 'pll' || scramble[0] == 'oll')) {
			rubiksCube.findAlgByScramble(scramble[0], scramble[1], function(ret) {
				if (!ret) {
					span.html('N/A')
					return;
				}
				span.empty();
				for (var i = 0; i < ret.length; i++) {
					span.append(ret[i], '<br>');
				}
			});
		} else {
			fdiv.html(IMAGE_UNAVAILABLE);
		}
	}

	$(function() {
		tools.regTool('algs', 'Search Algs', execFunc);
	});
});