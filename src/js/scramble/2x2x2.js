(function(circle, rn) {
	var solv = new mathlib.Solver(3, 3, [[0, doPermMove, 5040], [0, doOriMove, 729]]);
	function doPermMove(idx, m) {
		var g = [];
		mathlib.set8Perm(g, idx, 7);
		if (m == 0) {
			circle(g, 0, 2, 3, 1);
		} else if (m == 1) {
			circle(g, 0, 1, 5, 4);
		} else if (m == 2) {
			circle(g, 0, 4, 6, 2);
		}
		return mathlib.get8Perm(g, 7);
	}
	function doOriMove(a, c) {
		var b, d, e, h = 0,
		g = a,
		f = [];
		for (b = 1; 6 >= b; b++) e = ~~ (g / 3),
		d = g - 3 * e,
		g = e,
		f[b] = d,
		h -= d,
		0 > h && (h += 3);
		f[0] = h;
		0 == c ? circle(f, 0, 2, 3, 1) : 1 == c ? (circle(f, 0, 1, 5, 4), f[0] += 2, f[1]++, f[5] += 2, f[4]++) : 2 == c && (circle(f, 0, 4, 6, 2), f[2] += 2, f[0]++, f[4] += 2, f[6]++);
		g = 0;
		for (b = 6; 1 <= b; b--) g = 3 * g + f[b] % 3;
		return g
	}

	var egcases = [[0], [2, 3, 4, 5], [1]];
	var egprobs = [1, 2, 4, 4, 4, 4, 4, 4, 1, 2, 4, 4, 4, 4, 4, 4, 1, 2, 4, 4, 4, 4, 4, 4];
	var egmap = [0, 17, 5, 14, 8, 1, 2, 4];
	var egfilter = ['EG0-O', 'EG0-H', 'EG0-L', 'EG0-Pi', 'EG0-S', 'EG0-T', 'EG0-U', 'EG0-aS', 'EG1-O', 'EG1-H', 'EG1-L', 'EG1-Pi', 'EG1-S', 'EG1-T', 'EG1-U', 'EG1-aS', 'EG2-O', 'EG2-H', 'EG2-L', 'EG2-Pi', 'EG2-S', 'EG2-T', 'EG2-U', 'EG2-aS'];
	function getScramble(type, length, state) {
		var a, b, c, g, lim;
		a = type == '222o' ? 0 : 9;
		g = [[0, 0, 0, 0, 4, 5, 6],
			 [0, 0, 0, 0, 4, 6, 5],
			 [0, 0, 0, 0, 5, 4, 6],
			 [0, 0, 0, 0, 5, 6, 4],
			 [0, 0, 0, 0, 6, 4, 5],
			 [0, 0, 0, 0, 6, 5, 4]];
		do {
			lim = 2;
			if (type == '222o' || type == '222so') {
				c = rn(5040);
				b = rn(729);
				lim = 3;
			} else if (type == '222eg') {
				b = egmap[state & 0x7];
				c = mathlib.rndEl(egcases[state >> 3]);
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
			}
		} while (c == 0 && b == 0 || solv.search([c, b], 0, lim) != null);
		return solv.toStr(solv.search([c, b], a).reverse(), "URF", "'2 ");
	}
	scrMgr.reg(['222o', '222so', '222eg0', '222eg1', '222eg2'], getScramble)('222eg', getScramble, [egfilter, egprobs]);
}) (mathlib.circle, mathlib.rn);
