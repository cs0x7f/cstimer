(function() {
	/*
           3
		2     4
         1 0 0
             5
	move: 0=U, 1=R U R', 2=F' U F
	*/

	var epcord = new mathlib.Coord('p', 6, -1);
	var eocord = new mathlib.Coord('o', 6, -2);
	var cpcord = new mathlib.Coord('p', 6, -1);
	var cocord = new mathlib.Coord('o', 6, -3);

	function eMove(idx, m) {
		var perm = epcord.set([], idx >> 5);
		var twst = eocord.set([], idx & 0x1f);
		if (m == 0) {
			mathlib.acycle(twst, [0, 1, 2, 3, 4], 1);
			mathlib.acycle(perm, [0, 1, 2, 3, 4], 1);
		} else if (m == 1) {
			mathlib.acycle(twst, [0, 1, 2, 3, 5], 1);
			mathlib.acycle(perm, [0, 1, 2, 3, 5], 1);
		} else if (m == 2) {
			mathlib.acycle(twst, [1, 2, 3, 4, 5], 1, [0, 0, 0, 0, 1, 2]);
			mathlib.acycle(perm, [1, 2, 3, 4, 5]);
		}
		return epcord.get(perm) << 5 | eocord.get(twst);
	}

	function cMove(idx, m) {
		var perm = cpcord.set([], ~~(idx / 243));
		var twst = cocord.set([], idx % 243);
		if (m == 0) {
			mathlib.acycle(twst, [0, 1, 2, 3, 4], 1);
			mathlib.acycle(perm, [0, 1, 2, 3, 4], 1);
		} else if (m == 1) {
			mathlib.acycle(twst, [0, 5, 1, 2, 3], 1, [2, 0, 0, 0, 0, 3]);
			mathlib.acycle(perm, [0, 5, 1, 2, 3]);
		} else if (m == 2) {
			mathlib.acycle(twst, [0, 2, 3, 4, 5], 1, [1, 0, 0, 0, 1, 3]);
			mathlib.acycle(perm, [0, 2, 3, 4, 5]);
		}
		return cpcord.get(perm) * 243 + cocord.get(twst);
	}

	var solv = new mathlib.Solver(3, 4, [
		[0, eMove, 32 * 360],
		[0, cMove, 243 * 360]
	]);

	function getMinxLSScramble(type, length, cases) {
		var edge = 0;
		var corn = 0;
		do {
			if (type == 'mlsll') {
				edge = mathlib.rn(32 * 360);
				corn = mathlib.rn(243 * 360);
			} else if (type == 'mgmpll') {
				edge = epcord.get(mathlib.rndPerm(5, true).concat([5])) * 32;
				corn = cpcord.get(mathlib.rndPerm(5, true).concat([5])) * 243;
			} else if (type == 'mgmll') {
				var eo = eocord.set([], mathlib.rn(32)); eo[0] += eo[5]; eo[5] = 0;
				var co = cocord.set([], mathlib.rn(243)); co[0] += co[5]; co[5] = 0;
				edge = epcord.get(mathlib.rndPerm(5, true).concat([5])) * 32 + eocord.get(eo);
				corn = cpcord.get(mathlib.rndPerm(5, true).concat([5])) * 243 + cocord.get(co);
			}
		} while (edge == 0 && corn == 0);
		var sol = solv.search([edge, corn], 0);
		var ret = [];
		for (var i = 0; i < sol.length; i++) {
			var move = sol[i];
			ret.push(["U", "R U", "F' U"][move[0]] + ["", "2", "2'", "'"][move[1]] + ["", " R'", " F"][move[0]]);
		}
		return ret.join(" ").replace(/ +/g, ' ');
	}

	scrMgr.reg('mlsll', getMinxLSScramble)
		('mgmpll', getMinxLSScramble)
		('mgmll', getMinxLSScramble);

})();
