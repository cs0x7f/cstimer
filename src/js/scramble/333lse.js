(function() {

	var edgePerms = [
		[0, 1, 2, 3],
		[0, 2, 5, 4]
	];

	var edgeOris = [
		[0, 0, 0, 0, 2],
		[0, 1, 0, 1, 2]
	];

	function doPermMove(idx, m) {
		var edge = idx >> 3;
		var corn = idx;
		var cent = idx << 1 | (mathlib.getNParity(edge, 6) ^ ((corn >> 1) & 1));
		var g = mathlib.set8Perm([], edge, 6);
		mathlib.acycle(g, edgePerms[m]);
		if (m == 0) { //U
			corn = corn + 2;
		}
		if (m == 1) { //M
			cent = cent + 1;
		}
		return (mathlib.getNPerm(g, 6) << 3) | (corn & 6) | ((cent >> 1) & 1);
	}

	function doOriMove(arr, m) {
		mathlib.acycle(arr, edgePerms[m], 1, edgeOris[m]);
	}

	var solv = new mathlib.Solver(2, 3, [
		[0, doPermMove, 5760],
		[0, [doOriMove, 'o', 6, -2], 32]
	]);

	function generateScramble() {
		var b, c;
		do {
			c = mathlib.rn(5760);
			b = mathlib.rn(32);
		} while (b + c == 0);
		return solv.toStr(solv.search([c, b], 0), "UM", " 2'").replace(/ +/g, ' ');
	}
	scrMgr.reg('lsemu', generateScramble);
})();
