(function() {
	var solv = new mathlib.Solver(4, 2, [
		[0, [epermMove, 'p', 6, -1], 360],
		[0, oriMove, 2592]
	]);

	var movePieces = [
		[0, 1, 3],
		[1, 2, 5],
		[0, 4, 2],
		[3, 5, 4]
	];

	var moveOris = [
		[0, 1, 0, 2],
		[0, 1, 0, 2],
		[0, 0, 1, 2],
		[0, 0, 1, 2]
	];

	function epermMove(arr, m) {
		mathlib.acycle(arr, movePieces[m]);
	}

	var eocoord = new mathlib.coord('o', 6, -2);
	var cocoord = new mathlib.coord('o', 4, 3);

	function oriMove(a, c) {
		var edgeOri = eocoord.set([], a & 0x1f);
		var cornOri = cocoord.set([], a >> 5);
		cornOri[c]++;
		mathlib.acycle(edgeOri, movePieces[c], 1, moveOris[c]);
		return cocoord.get(cornOri) << 5 | eocoord.get(edgeOri);
	}

	function getScramble(type) {
		var minl = type == 'pyro' ? 0 : 8;
		var limit = type == 'pyrl4e' ? 2 : 7;
		var len = 0;
		var sol;
		var perm;
		var ori;
		do {
			if (type == 'pyro' || type == 'pyrso') {
				perm = mathlib.rn(360);
				ori = mathlib.rn(2592);
			} else if (type == 'pyrl4e') {
				perm = mathlib.get8Perm(mathlib.set8Perm([], mathlib.rn(12), 4, -1).concat([4, 5]), 6, -1);
				ori = mathlib.rn(3) * 864 + mathlib.rn(8);
			}
			len = solv.search([perm, ori], 0).length;
			sol = solv.toStr(solv.search([perm, ori], minl), "ULRB", ["", "'"]) + ' ';
			for (var i = 0; i < 4; i++) {
				var r = mathlib.rn(3);
				if (r < 2) {
					sol += "lrbu".charAt(i) + [" ", "' "][r];
					len++;
				}
			}
		} while (len < limit);
		return sol;
	}
	scrMgr.reg(['pyro', 'pyrso', 'pyrl4e'], getScramble);
})();
