(function() {
	var moveCenters = [
		[0, 3, 1],
		[0, 2, 4],
		[1, 5, 2],
		[3, 4, 5]
	];

	var moveCorners = [
		[0, 1, 2],
		[0, 3, 1],
		[0, 2, 3],
		[1, 3, 2]
	];

	var ctcord = new mathlib.coord('p', 6, -1);
	var cpcord = new mathlib.coord('p', 4, -1);
	var ftcord = new mathlib.coord('o', 4, 3);
	var twcord = new mathlib.coord('o', 4, -3);

	function ctcpMove(idx, m) {
		var corner = cpcord.set([], idx % 12);
		var center = ctcord.set([], ~~(idx / 12));
		mathlib.acycle(center, moveCenters[m]);
		mathlib.acycle(corner, moveCorners[m]);
		return ctcord.get(center) * 12 + cpcord.get(corner);
	}

	function twstMove(idx, move) {
		var fixedtwst = ftcord.set([], idx % 81);
		var twst = twcord.set([], ~~(idx / 81));
		fixedtwst[move]++;
		mathlib.acycle(twst, moveCorners[move], 1, [0, 2, 1, 3]);
		return twcord.get(twst) * 81 + ftcord.get(fixedtwst);
	}

	var solv = new mathlib.Solver(4, 2, [
		[0, ctcpMove, 4320],
		[0, twstMove, 2187]
	]);

	var solvivy = new mathlib.Solver(4, 2, [
		[0, function(idx, m) {
			return ~~(ctcpMove(idx * 12, m) / 12);
		}, 360],
		[0, function(idx, m) {
			return twstMove(idx, m) % 81;
		}, 81]
	]);


	function sol2str(sol) {
		var ret = [];
		var move2str = ["L", "R", "B", "U"]; //RLDB (in jaap's notation) rotated by z2
		for (var i = 0; i < sol.length; i++) {
			var axis = sol[i][0];
			var pow = 1 - sol[i][1];
			if (axis == 2) { //step two.
				mathlib.acycle(move2str, [0, 3, 1], pow + 1);
			}
			ret.push(move2str[axis] + ((pow == 1) ? "'" : ""));
		}
		return ret.join(" ");
	}

	var ori = [0, 1, 2, 0, 2, 1, 1, 2, 0, 2, 1, 0];

	function getScramble(type) {
		var perm, twst, lim = 6,
			maxl = type == 'skbso' ? 8 : 0;
		do {
			perm = mathlib.rn(4320);
			twst = mathlib.rn(2187);
		} while (perm == 0 && twst == 0 || ori[perm % 12] != (twst + ~~(twst / 3) + ~~(twst / 9) + ~~(twst / 27)) % 3 || solv.search([perm, twst], 0, lim) != null);
		return sol2str(solv.search([perm, twst], maxl).reverse());
	}

	function getScrambleIvy(type) {
		var perm, twst, lim = 1,
			maxl = type == 'ivyso' ? 6 : 0;
		do {
			perm = mathlib.rn(360);
			twst = mathlib.rn(81);
		} while (perm == 0 && twst == 0 || solvivy.search([perm, twst], 0, lim) != null);
		return solvivy.toStr(solvivy.search([perm, twst], maxl).reverse(), "RLDB", "' ");
	}

	scrMgr.reg(['skbo', 'skbso'], getScramble)(['ivyo', 'ivyso'], getScrambleIvy);

})();
