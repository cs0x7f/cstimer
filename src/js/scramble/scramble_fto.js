(function() {
	"use strict";

	function getRandomScramble(solvedEdge, solvedCenter, solvedCorner) {
		var fc = new ftosolver.FtoCubie();
		if (!solvedEdge) {
			fc.ep = mathlib.rndPerm(12, true);
		}
		if (!solvedCenter) {
			fc.uf = mathlib.rndPerm(12, true);
			fc.rl = mathlib.rndPerm(12, true);
		}
		if (!solvedCorner) {
			fc.cp = mathlib.rndPerm(6, true);
			mathlib.setNOri(fc.co, mathlib.rn(32), 6, -2);
		}
		return ftosolver.solveFacelet(fc.toFaceCube(), true);
	}

	function getLNTScramble(ufs) {
		var solved = false;
		var nCorn = ufs.length >> 1;
		var fc = new ftosolver.FtoCubie();
		var cp, co, uf;
		do {
			cp = mathlib.rndPerm(nCorn, true);
			co = mathlib.setNOri([], mathlib.rn(1 << nCorn >> 1), nCorn, -2);
			uf = mathlib.rndPerm(ufs.length, true);
			solved = true;
			for (var i = 0; i < ufs.length; i++) {
				solved = solved && (~~(ufs[uf[i]] / 3) == ~~(ufs[i] / 3));
			}
			for (var i = 0; i < nCorn; i++) {
				solved = solved && cp[i] == i && co[i] == 0;
			}
		} while (solved);
		for (var i = 0; i < nCorn; i++) {
			fc.cp[i] = cp[i];
			fc.co[i] = co[i];
		}
		for (var i = 0; i < ufs.length; i++) {
			fc.uf[ufs[i]] = ufs[uf[i]];
		}
		return ftosolver.solveFacelet(fc.toFaceCube(), true);
	}

	function getTCPScramble() {
		var fc = new ftosolver.FtoCubie();
		var cp, co, uf;
		var ufs = [1, 2, 3, 7, 11];
		do {
			cp = mathlib.rndPerm(3, true);
			co = [0].concat(mathlib.setNOri([], mathlib.rn(2), 2, -2));
			uf = mathlib.rndPerm(5, true);
		} while (ufs[uf[0]] < 3 || ufs[uf[1]] < 3);
		for (var i = 0; i < 3; i++) {
			fc.cp[i] = cp[i];
			fc.co[i] = co[i];
		}
		for (var i = 0; i < ufs.length; i++) {
			fc.uf[ufs[i]] = ufs[uf[i]];
		}
		return ftosolver.solveFacelet(fc.toFaceCube(), true);
	}

	scrMgr.reg('ftoso', getRandomScramble.bind(null, false, false, false))
		('ftol3t', getLNTScramble.bind(null, [0, 1, 2, 3, 7, 11]))
		('ftol4t', getLNTScramble.bind(null, [0, 1, 2, 3, 6, 7, 9, 11]))
		('ftotcp', getTCPScramble)
		('ftoedge', getRandomScramble.bind(null, false, true, true))
		('ftocent', getRandomScramble.bind(null, true, false, true))
		('ftocorn', getRandomScramble.bind(null, true, true, false));
})();
