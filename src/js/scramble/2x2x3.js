(function(circle, get8Perm) {
	var cmv = [];
	var cprun = [];

	function initCornerMoveTable() {
		var g = [],
			temp;
		for (var i = 0; i < 40320; i++) {
			cmv[i] = [];
		}
		for (var i = 0; i < 40320; i++) {
			mathlib.set8Perm(g, i);
			circle(g, 0, 1, 2, 3);
			temp = cmv[0][i] = get8Perm(g); //U
			circle(g, 4, 5, 6, 7);
			temp = cmv[1][temp] = get8Perm(g); //D
			circle(g, 2, 5)(g, 3, 6);
			temp = cmv[2][temp] = get8Perm(g); //R
			circle(g, 0, 5)(g, 3, 4);
			cmv[3][temp] = get8Perm(g); //F
		}
	}

	function doEdgeMove(idx, m) {
		if (m < 2) {
			return idx;
		}
		var g = mathlib.set8Perm([], idx, 3);
		if (m == 2) {
			circle(g, 0, 1);
		} else if (m == 3) {
			circle(g, 0, 2);
		}
		return get8Perm(g, 3);
	}
	//	function doMv(idx, m) {
	//		return cmv[~~(idx / 6)][m] * 6 + doEdgeMove(idx % 6, m);
	//	}
	function init() {
		init = $.noop;
		initCornerMoveTable();
		mathlib.createPrun(cprun, 0, 40320, 12, cmv, 4, 3);
		//		mathlib.createPrun([], 0, 40320 * 6, 15, doMv, 4, 3);
	}

	function search(corner, edge, maxl, lm, sol) {
		if (maxl == 0) {
			return corner + edge == 0;
		}
		if (mathlib.getPruning(cprun, corner) > maxl) return false;
		var h, g, f, i;
		for (i = 0; i < 4; i++) {
			if (i != lm) {
				h = corner;
				g = edge;
				for (f = 0; f < (i < 2 ? 3 : 1); f++) {
					h = cmv[i][h];
					g = doEdgeMove(g, i);
					if (search(h, g, maxl - 1, i, sol)) {
						sol.push(["U", "D", "R2", "F2"][i] + (i < 2 ? " 2'".charAt(f) : ""));
						return true;
					}
				}
			}
		}
	}

	function generateScramble() {
		init();
		var b, c;
		do {
			c = mathlib.rn(40320);
			b = mathlib.rn(6);
		} while (b + c == 0);
		var d = [];
		for (var a = 0; a < 99; a++) {
			if (search(c, b, a, -1, d)) {
				break;
			}
		}
		return d.reverse().join(" ");
	}
	scrMgr.reg('223', generateScramble);
})(mathlib.circle, mathlib.get8Perm);
