(function() {
	/*
	x504x x x504x
	 132 231 132
	  x x405x x
	    x504x
	     132
	      x  */
	var cFacelet = [
		[3, 16, 11], // F3, L4, R5
		[4, 23, 15], // F4, D5, L3
		[5, 9, 22], // F5, R3, D4
		[10, 17, 21] // R4, L5, D3
	];

	var eFacelet = [
		[1, 7], // F1, R1
		[2, 14], // F2, L2
		[0, 18], // F0, D0
		[6, 12], // R0, L0
		[8, 20], // R2, D2
		[13, 19] // L1, D1
	];

	function checkNoBar(perm, ori) {
		var edgeOri = eocoord.set([], ori & 0x1f);
		var cornOri = cocoord.set([], ori >> 5);
		var edgePerm = epcoord.set([], perm);
		var f = [];
		mathlib.fillFacelet(cFacelet, f, [0, 1, 2, 3], cornOri, 6);
		mathlib.fillFacelet(eFacelet, f, edgePerm, edgeOri, 6);
		var pieces = [4, 2, 3, 1, 5, 0];
		for (var i = 0; i < 6; i++) {
			for (var j = 0; j < 2; j++) {
				var p1 = eFacelet[i][0 ^ j];
				var p2 = eFacelet[i][1 ^ j];
				var nb1 = ~~(p1 / 6) * 6 + pieces[(pieces.indexOf(p1 % 6) + 5) % 6];
				var nb2 = ~~(p2 / 6) * 6 + pieces[(pieces.indexOf(p2 % 6) + 1) % 6];
				if (f[nb1] == f[p1] && f[nb2] == f[p2]) {
					return false;
				}
			}
		}
		return true;
	}

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
	var epcoord = new mathlib.coord('p', 6, -1);
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
			if (type == 'pyro' || type == 'pyrso' || type == 'pyr4c') {
				perm = mathlib.rn(360);
				ori = mathlib.rn(2592);
			} else if (type == 'pyrl4e') {
				perm = mathlib.get8Perm(mathlib.set8Perm([], mathlib.rn(12), 4, -1).concat([4, 5]), 6, -1);
				ori = mathlib.rn(3) * 864 + mathlib.rn(8);
			} else if (type == 'pyrnb') {
				do {
					perm = mathlib.rn(360);
					ori = mathlib.rn(2592);
				} while (!checkNoBar(perm, ori));
			}
			len = solv.search([perm, ori], 0).length;
			sol = solv.toStr(solv.search([perm, ori], minl).reverse(), "ULRB", ["'", ""]) + ' ';
			for (var i = 0; i < 4; i++) {
				var r = mathlib.rn(type == 'pyr4c' ? 2 : 3);
				if (r < 2) {
					sol += "lrbu".charAt(i) + [" ", "' "][r];
					len++;
				}
			}
		} while (len < limit);
		return sol;
	}
	scrMgr.reg(['pyro', 'pyrso', 'pyrl4e', 'pyrnb', 'pyr4c'], getScramble);
})();