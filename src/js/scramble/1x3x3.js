(function() {
	var solv = new mathlib.Solver(4, 1, [[0, doMove, 384]]);
	var movePieces = [
		[0, 1],
		[2, 3],
		[0, 3],
		[1, 2]
	];

	function doMove(idx, m) {
		var arr = mathlib.set8Perm([], idx >> 4, 4);
		mathlib.acycle(arr, movePieces[m]);
		return (mathlib.get8Perm(arr, 4) << 4) + ((idx & 15) ^ (1 << m));
	}

	function generateScramble() {
		var c = 1 + mathlib.rn(191);
		c = c * 2 + ((mathlib.getNParity(c >> 3, 4) ^ (c >> 1) ^ (c >> 2) ^ c) & 1);
		return solv.toStr(solv.search([c], 0), "RLFB", [""]);
	}
	scrMgr.reg('133', generateScramble);
})();