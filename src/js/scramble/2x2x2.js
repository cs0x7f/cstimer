(function(rn) {
	var solv = new mathlib.Solver(3, 3, [[0, doPermMove, 5040], [0, doOriMove, 729]]);

	var movePieces = [
		[0, 2, 3, 1],
		[0, 1, 5, 4],
		[0, 4, 6, 2]
	];

	var moveOris = [
		null,
		[0, 1, 0, 1, 3],
		[1, 0, 1, 0, 3]
	];

	function doPermMove(idx, m) {
		var arr = [];
		mathlib.set8Perm(arr, idx, 7);
		mathlib.acycle(arr, movePieces[m]);
		return mathlib.get8Perm(arr, 7);
	}

	function doOriMove(oidx, m) {
		var ori = [15];
		for (var i = 1; i < 7; i++) {
			ori[i] = oidx % 3;
			oidx = ~~(oidx / 3);
			ori[0] -= ori[i];
		}
		mathlib.acycle(ori, movePieces[m], 1, moveOris[m]);
		oidx = 0;
		for (var i = 6; i > 0; i--) {
			oidx = oidx * 3 + ori[i] % 3;
		}
		return oidx;
	}

	var cFacelet = [
		[3, 4, 9],
		[1, 20, 5],
		[2, 8, 17],
		[0, 16, 21],
		[13, 11, 6],
		[15, 7, 22],
		[12, 19, 10]
	];

	function checkNoBar(pidx, oidx) {
		var perm = [];
		var ori = [15];
		mathlib.set8Perm(perm, pidx, 7);
		for (var i = 1; i < 7; i++) {
			ori[i] = oidx % 3;
			oidx = ~~(oidx / 3);
			ori[0] -= ori[i];
		}
		var f = [];
		for (var i = 0; i < 24; i++) {
			f[i] = i >> 2;
		}
		for (var i = 0; i < 7; i++) {
			for (var n = 0; n < 3; n++) {
				f[cFacelet[i][(n + ori[i]) % 3]] = cFacelet[perm[i]][n] >> 2;
			}
		}
		for (var i = 0; i < 24; i += 4) {
			if ((1 << f[i] | 1 << f[i + 3]) & (1 << f[i + 1] | 1 << f[i + 2])) {
				return false;
			}
		}
		return true;
	}

	var egcases = [[0], [2, 3, 4, 5], [1]];
	var egprobs = [1, 2, 4, 4, 4, 4, 4, 4, 1, 2, 4, 4, 4, 4, 4, 4, 1, 2, 4, 4, 4, 4, 4, 4, 1, 2, 4, 4, 4, 4, 4, 4, 1, 2, 4, 4, 4, 4, 4, 4, 1, 2, 4, 4, 4, 4, 4, 4];
	var egmap = [0, 17, 5, 14, 8, 1, 2, 4];
	var egfilter = ['EG0-O', 'EG0-H', 'EG0-L', 'EG0-Pi', 'EG0-S', 'EG0-T', 'EG0-U', 'EG0-aS', 'EG1B-O', 'EG1B-H', 'EG1B-L', 'EG1B-Pi', 'EG1B-S', 'EG1B-T', 'EG1B-U', 'EG1B-aS', 'EG1L-O', 'EG1L-H', 'EG1L-L', 'EG1L-Pi', 'EG1L-S', 'EG1L-T', 'EG1L-U', 'EG1L-aS', 'EG1F-O', 'EG1F-H', 'EG1F-L', 'EG1F-Pi', 'EG1F-S', 'EG1F-T', 'EG1F-U', 'EG1F-aS', 'EG1R-O', 'EG1R-H', 'EG1R-L', 'EG1R-Pi', 'EG1R-S', 'EG1R-T', 'EG1R-U', 'EG1R-aS', 'EG2-O', 'EG2-H', 'EG2-L', 'EG2-Pi', 'EG2-S', 'EG2-T', 'EG2-U', 'EG2-aS'];

	function getScramble(type, length, state) {
		var a, b, c, g, lim;
		a = type == '222o' ? 0 : 9;
		g = [[0, 0, 0, 0, 4, 5, 6],
			 [0, 0, 0, 0, 4, 6, 5],
			 [0, 0, 0, 0, 6, 5, 4],
			 [0, 0, 0, 0, 5, 4, 6],
			 [0, 0, 0, 0, 5, 6, 4],
			 [0, 0, 0, 0, 6, 4, 5]];
		do {
			lim = 2;
			if (type == '222o' || type == '222so') {
				c = rn(5040);
				b = rn(729);
				lim = 3;
			} else if (type == '222eg') {
				b = egmap[state & 0x7];
				c = [0, 2, 3, 4, 5, 1][state >> 3];
				mathlib.set8Perm(g[c], rn(24), 4);
				c = mathlib.get8Perm(g[c], 7);
				var rndU = rn(4);
				while (rndU-- > 0) {
					b = doOriMove(b, 0);
				}
			} else if (/^222eg[012]$/.exec(type)) {
				b = rn(27);
				c = mathlib.rndEl(egcases[~~type[5]]);
				mathlib.set8Perm(g[c], rn(24), 4);
				c = mathlib.get8Perm(g[c], 7);
			} else if (type == '222nb') {
				do {
					c = rn(5040);
					b = rn(729);
				} while (!checkNoBar(c, b));
			}
		} while (c == 0 && b == 0 || solv.search([c, b], 0, lim) != null);
		return solv.toStr(solv.search([c, b], a).reverse(), "URF", "'2 ");
	}

	scrMgr.reg(['222o', '222so', '222eg0', '222eg1', '222eg2', '222nb'], getScramble)('222eg', getScramble, [egfilter, egprobs]);
})(mathlib.rn);