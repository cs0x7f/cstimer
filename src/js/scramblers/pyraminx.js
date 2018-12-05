(function(circle) {
	var solv = new mathlib.Solver(4, 2, [
		[0, l, 360],
		[0, i, 2592]
	]);

	function l(a, c) {
		var e = [];
		mathlib.set8Perm(e, a << 1, 6);
		1 == mathlib.getNParity(a << 1, 6) && circle(e, 4, 5);
		0 == c && circle(e, 0, 1, 3);
		1 == c && circle(e, 1, 2, 5);
		2 == c && circle(e, 0, 4, 2);
		3 == c && circle(e, 3, 5, 4);
		return mathlib.get8Perm(e, 6) >> 1;
	}

	function i(a, c) {
		var e, d, f;
		d = 0;
		var b = [],
			h = a;
		for (e = 0; 4 >= e; e++) b[e] = h & 1,
			h >>= 1,
			d ^= b[e];
		b[5] = d;
		for (e = 6; 9 >= e; e++) f = ~~(h / 3),
			d = h - 3 * f,
			h = f,
			b[e] = d;
		b[c + 6] = (b[c + 6] + 1) % 3;
		0 == c && (circle(b, 0, 1, 3), b[1] ^= 1, b[3] ^= 1);
		1 == c && (circle(b, 1, 2, 5), b[2] ^= 1, b[5] ^= 1);
		2 == c && (circle(b, 0, 4, 2), b[0] ^= 1, b[2] ^= 1);
		3 == c && (circle(b, 3, 5, 4), b[3] ^= 1, b[4] ^= 1);
		h = 0;
		for (e = 9; 6 <= e; e--) h = 3 * h + b[e];
		for (e = 4; 0 <= e; e--) h = 2 * h + b[e];
		return h
	}
	var k = [1, 1, 1, 3, 12, 60, 360];

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
					k += "lrbu".charAt(g) + [" ", "' "][i] + " ";
					len++;
				}
			}
		} while (len < 6);
		return k
	}
	scramble.reg(['pyro', 'pyrso'], getScramble);
})(mathlib.circle);