var slideCube = (function() {
	var sol;

	function slideMove(state, m) {
		var blank = state.indexOf('-');
		var x = blank >> 2;
		var y = blank & 3;

		var ret = state.split('');
		var ori = m[0];
		var target = ~~m[1];
		var arr = [x << 2 | y];
		if (ori == 'V') {
			if (ret[x << 2 | target] == '$') {
				return null;
			}
			var inc = y > target ? -1 : 1;
			while (y != target) {
				y += inc;
				arr.push(x << 2 | y);
			}
		} else {
			if (ret[target << 2 | y] == '$') {
				return null;
			}
			var inc = x > target ? -1 : 1;
			while (x != target) {
				x += inc;
				arr.push(x << 2 | y);
			}
		}
		arr.reverse();
		mathlib.acycle(ret, arr);
		return ret.join('');
	}

	function mirror(perm) {
		var ret = [];
		var mirrorPerm = [0, 4, 8, 12, 1, 5, 9, 13, 2, 6, 10, 14, 3, 7, 11, 15];
		for (var i = 0; i < 16; i++) {
			ret[i] = mirrorPerm[perm[mirrorPerm[i]]];
		}
		return ret;
	}

	function fixBlank(state) {
		var ret = [];
		state = state.split('');
		for (var i = 0; i < state.length; i++) {
			if (state[i] == '?') {
				state[i] = '-';
				ret.push(state.join(''));
				state[i] = '?';
			}
		}
		return ret;
	}

	var moves = {
		'V0': 0x0,
		'V1': 0x0,
		'V2': 0x0,
		'V3': 0x0,
		'H0': 0x1,
		'H1': 0x1,
		'H2': 0x1,
		'H3': 0x1
	};

	var solv1 = new mathlib.gSolver(
		fixBlank('0123????????????'),
		slideMove,
		moves
	);

	var solv2 = new mathlib.gSolver(
		fixBlank('$$$$4???8???c???'),
		slideMove,
		moves
	);

	var solv3 = new mathlib.gSolver(
		['$$$$$567$9ab$de-'],
		slideMove,
		moves
	);

	function stateInit(state, perm) {
		var ret = [];
		for (var i = 0; i < perm.length; i++) {
			ret[i] = state[perm[i]];
		}
		state = ret.join('');
		for (var i = 0; i < sol.length; i++) {
			state = slideMove(state, sol[i]);
		}
		return state
	}

	function randPerm(size) {
		var perm = [];
		var inv;
		do {
			perm = mathlib.rndPerm(size * size);
			inv = (size - 1 - ~~(perm.indexOf(perm.length - 1) / size)) * (size - 1);
			for (var i = 0; i < perm.length; i++) {
				for (var j = i + 1; j < perm.length; j++) {
					if (perm[i] > perm[j] && perm[i] != perm.length - 1) {
						inv++;
					}
				}
			}
		} while (inv % 2 != 0);
		return perm;
	}

	function prettySol(settings, size, midx) {
		var ret = [];
		var moveRef = midx == 1 ? 'VH' : 'HV';
		var symbol = settings.indexOf('a') == -1 ? ['DR', 'UL'] : ['\uFFEC\uFFEB', '\uFFEA\uFFE9'];
		var isBlankMove = settings.indexOf('m') != -1;
		var compress = settings.indexOf('p') != -1;
		var pos = [-1, -1];
		for (var i = 0; i < sol.length; i++) {
			var val = ~~sol[i][1];
			var m = moveRef.indexOf(sol[i][0]);
			if (pos[m] == -1 || pos[m] == val) {
				pos[m] = val;
				continue;
			}
			if (ret.length > 0 && ret.at(-1)[0] == m) {
				var move = ret.at(-1);
				move[1] += val - pos[m];
				if (move[1] == 0) {
					ret.pop();
				}
			} else {
				ret.push([m, val - pos[m]]);
			}
			pos[m] = val;
		}
		for (var i = 0; i < ret.length; i++) {
			var move = ret[i];
			var axis = symbol[isBlankMove != (move[1] > 0) ? 0 : 1][move[0]];
			var pow = Math.abs(move[1]);
			ret[i] = [];
			if (compress) {
				ret[i].push(axis + pow);
			} else {
				while (pow-- > 0) {
					ret[i].push(axis);
				}
			}
			ret[i] = ret[i].join(' ');
		}
		ret.reverse();
		return ret.join(' ').replace(/1/g, '');
	}

	function getScramble(size, type) {
		var t = +new Date;
		var perm = [];
		var midx = 0;
		if (size == 4) {
			perm[0] = randPerm(4);
			perm[1] = mirror(perm[0]);
			out: for (var d = 0; d < 99; d++) {
				for (midx = 0; midx < 2; midx++) {
					var blank = perm[midx].indexOf(perm[midx].length - 1);
					sol = ['V' + (blank & 3), 'H' + (blank >> 2)];
					var sol1 = solv1.search(stateInit('0123???????????-', perm[midx]), d, d);
					if (sol1) {
						sol = sol.concat(sol1);
						break out;
					}
				}
			}
			var sol2 = solv2.search(stateInit('01234???8???c??-', perm[midx]).replace(/[0123]/g, '$'), 0);
			sol = sol.concat(sol2);
		} else if (size == 3) {
			var perm8 = randPerm(3);
			var slide8 = [5, 6, 7, 9, 10, 11, 13, 14, 15];
			for (var i = 0; i < 16; i++) {
				perm[i] = slide8[perm8[slide8.indexOf(i)]] || i;
			}
			var blank = perm.indexOf(perm.length - 1);
			sol = ['V' + (blank & 3), 'H' + (blank >> 2)];
			perm = [perm];
		}
		var sol3 = solv3.search(stateInit('0123456789abcde-', perm[midx]).replace(/[012348c]/g, '$'), 0);
		sol = sol.concat(sol3);
		DEBUG && console.log('[15p solver]', midx, stateInit('0123456789abcde-', perm[midx]), sol.join(''), sol.length, +new Date - t);
		return prettySol(type.slice(size == 3 ? 3 : 4), 4, midx);
	}
	scrMgr.reg(['15prp', '15prap', '15prmp'], getScramble.bind(null, 4))
		(['8prp', '8prap', '8prmp'], getScramble.bind(null, 3));

})();
