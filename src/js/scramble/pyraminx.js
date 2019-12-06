(function(circle) {
	var solv = new mathlib.Solver(4, 2, [
		[0, epermMove, 360],
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

	function epermMove(a, c) {
		var arr = mathlib.set8Perm([], a, 6, true);
		mathlib.acycle(arr, movePieces[c]);
		return mathlib.get8Perm(arr, 6, true);
	}

	function oriMove(a, c) {
		var edgeOri = mathlib.setNOri([], a & 0x1f, 6, 2, true);
		var cornOri = mathlib.setNOri([], a >> 5, 4, 3, false);
		cornOri[c]++;
		mathlib.acycle(edgeOri, movePieces[c], 1, moveOris[c]);
		return mathlib.getNOri(cornOri, 4, 3, false) << 5 | mathlib.getNOri(edgeOri, 6, 2, true);
	}

	function getScramble(type) {
		var l = type == 'pyrso' ? 8 : 0;

		var len = 0;
		do {
			var st = mathlib.rn(360 * 2592 - 1) + 1;
			var i = st % 360;
			var g = ~~(st / 360);

			len = solv.search([i, g], 0).length;
			k = solv.toStr(solv.search([i, g], l), "ULRB", ["", "'"]) + ' ';
			for (g = 0; g < 4; g++) {
				i = mathlib.rn(3);
				if (i < 2) {
					k += "lrbu".charAt(g) + [" ", "' "][i];
					len++;
				}
			}
		} while (len < 6);
		return k
	}
	scrMgr.reg(['pyro', 'pyrso'], getScramble);
})(mathlib.circle);