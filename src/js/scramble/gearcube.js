(function() {
	var cmv = [];
	var emv = [];
	var prun = [[], [], []];

	var moveEdges = [
		[0, 3, 2, 1],
		[0, 1],
		[0, 3]
	];

	function cornerMove(arr, m) {
		mathlib.acycle(arr, [0, m + 1]);
	}

	function edgeMove(idx, m) {
		var arr = mathlib.set8Perm([], ~~(idx / 3), 4);
		mathlib.acycle(arr, moveEdges[m]);
		return mathlib.get8Perm(arr, 4) * 3 + (idx % 3 + (m == 0 ? 1 : 0)) % 3;
	}

	function doMove(off, idx, m) {
		var edge = idx % 72;
		var corner = ~~(idx / 72);
		corner = cmv[m][corner];
		edge = emv[(m + off) % 3][edge];
		return corner * 72 + edge;
	}

	function getPrun(state) {
		return Math.max(
			mathlib.getPruning(prun[0], state[0] * 72 + state[1]),
			mathlib.getPruning(prun[1], state[0] * 72 + state[2]),
			mathlib.getPruning(prun[2], state[0] * 72 + state[3]));
	}

	function search(state, maxl, lm, sol) {
		if (maxl == 0) {
			return state[0] == 0 && state[1] == 0 && state[2] == 0 && state[3] == 0;
		}
		if (getPrun(state) > maxl) {
			return false;
		}
		for (var m = 0; m < 3; m++) {
			if (m == lm) {
				continue
			}
			var statex = state.slice();
			for (var a = 0; a < 11; a++) {
				statex[0] = cmv[m][statex[0]];
				for (var i = 1; i < 4; i++) {
					statex[i] = emv[(m + i - 1) % 3][statex[i]];
				}
				if (search(statex, maxl - 1, m, sol)) {
					sol.push("URF".charAt(m) + ["'", "2'", "3'", "4'", "5'", "6", "5", "4", "3", "2", ""][a]);
					return true;
				}
			}
		}
	}

	function init() {
		init = $.noop;
		mathlib.createMove(emv, 72, edgeMove, 3);
		mathlib.createMove(cmv, 24, [cornerMove, 'p', 4], 3);
		for (var i = 0; i < 3; i++) {
			mathlib.createPrun(prun[i], 0, 24 * 72, 5, doMove.bind(null, i), 3, 12, 0);
		}
	}

	function getRandomState() {
		var ret = [mathlib.rn(24)];
		for (var i = 0; i < 3; i++) {
			do {
				ret[i + 1] = mathlib.rn(72);
			} while (mathlib.getPruning(prun[i], ret[0] * 72 + ret[i + 1]) == 15);
		}
		return ret;
	}

	function generateScramble(type) {
		init();
		var state;
		do {
			state = getRandomState();
		} while (state == 0);
		var len = type == 'gearso' ? 4 : 0;
		var sol = [];
		while (true) {
			if (search(state, len, -1, sol)) {
				break;
			}
			len++;
		}
		return sol.reverse().join(" ");
	}
	scrMgr.reg(['gearo', 'gearso'], generateScramble);
})();
