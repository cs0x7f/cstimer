"use strict";

execMain(function(cubeMove) {
	function doAlg(doMove, state, alg) {
		for (var i = 0; i < alg.length; i++) {
			state = doMove(state, alg[i]);
		}
		return state
	}

	var rubiksCube = (function() {
		var solved = mathlib.SOLVED_FACELET;
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
}, [gsolver.rubiksCube.move]);
