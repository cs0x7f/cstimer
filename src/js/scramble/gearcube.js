(function(circle) {
	var cmv = [];
	var emv = [];
	var prun = [];
	
	function cornerMove(idx, m) {
		var arr = [];
		mathlib.setNPerm(arr, idx, 4);
		circle(arr, 0, m+1);
		return mathlib.getNPerm(arr, 4);
	}
	function edgeMove(idx, m) {
		var arr = [], ori;
		ori = idx % 3;
		mathlib.setNPerm(arr, ~~(idx / 3), 4);
		if (m == 0) {
			circle(arr, 0, 3, 2, 1);
			ori = (ori + 1) % 3;
		} else if (m == 1) {
			circle(arr, 0, 1);
		} else if (m == 2) {
			circle(arr, 0, 3);
		}
		return mathlib.getNPerm(arr, 4) * 3 + ori;	
	}
/*	function doMove2(idx, m) {
		var edge1 = idx % 72;
		var edge2 = ~~(idx / 72) % 72;
		var edge3 = ~~(idx / 72 / 72) % 72;
		var corner = ~~(idx / 72 / 72 / 72);
		corner = cornerMove(corner, m);
		edge1 = edgeMove(edge1, m);
		edge2 = edgeMove(edge2, (m+1)%3);
		edge3 = edgeMove(edge3, (m+2)%3);
		return ((corner * 72 + edge3) * 72 + edge2) * 72 + edge1;
	}
*/	function doMove(idx, m, off) {
		var edge = idx % 72;
		var corner = ~~(idx / 72);
		corner = cmv[corner][m];
		edge = emv[edge][(m + off) % 3];
		return corner * 72 + edge;
	}
	function getPrun(c, e1, e2, e3) {
		return Math.max(prun[0][c * 72 + e1], prun[1][c * 72 + e2], prun[2][c * 72 + e3]);
	}
	function search(c, e1, e2, e3, maxl, lm, sol) {
		if (maxl == 0) {
			return c == 0 && e1 == 0 && e2 == 0 && e3 == 0;
		}
		if (getPrun(c, e1, e2, e3) > maxl) {
			return false;
		}
		var cx, e1x, e2x, e3x;
		for (var m=0; m<3; m++) {
			if (m != lm) {
				cx = c;
				e1x = e1;
				e2x = e2;
				e3x = e3;
				for (var a=0; a<11; a++) {
					cx = cmv[cx][m];
					e1x = emv[e1x][m];
					e2x = emv[e2x][(m+1)%3];
					e3x = emv[e3x][(m+2)%3];
					if (search(cx, e1x, e2x, e3x, maxl-1, m, sol)) {
						sol.push("URF".charAt(m) + ["'", "2'", "3'", "4'", "5'", "6", "5", "4", "3", "2", ""][a]);
						return true;
					}
				}
			}
		}
	}
	function init() {
		init = $.noop;
		for (var i=0; i<72; i++) {
			emv[i] = [];
			for (var m=0; m<3; m++) {
				emv[i][m] = edgeMove(i, m);
			}
		}
		for (var i=0; i<24; i++) {
			cmv[i] = [];
			for (var m=0; m<3; m++) {
				cmv[i][m] = cornerMove(i, m);
			}
		}
		for (var i=0; i<3; i++) {
			var dist = {};
			dist[0] = 0;
//			var done = 1;
			for (var depth=0; depth<5; depth++) {
//				done = 0;
				for (var idx in dist) {
					if (dist[idx] == depth) {
						for (var m=0; m<3; m++){
							var q = idx;
							for (var c=0; c<12; c++){
								q = doMove(q, m, i);
								if (dist[q] == undefined) {
									dist[q] = depth + 1;
//									++done;
								}
							}
						}
					}
				}
//				console.log(done);
			}
			prun[i] = dist;
		}
	}
	function getRandomState() {
		var ret = [mathlib.rn(24)];
		for (var i=0; i<3; i++) {
			do {
				ret[i+1] = mathlib.rn(72);
			} while (prun[i][ret[0] * 72 + ret[i+1]] == undefined);
		}
		return ret;
	}
	function generateScramble(type) {
		init();
		var state;
		do {
			state = getRandomState();
		} while (state == 0);
		var len = type == 'gearso' ? 4 : 0;
		var sol = [];
		while (true) {
			if (search(state[0], state[1], state[2], state[3], len, -1, sol)) {
				break;
			}				
			len++;
		}
		return sol.reverse().join(" ");
	}
	scramble.reg(['gearo', 'gearso'], generateScramble);
	return generateScramble;
})(mathlib.circle);
