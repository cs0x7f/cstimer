"use strict";

var cubeutil = (function() {

	var crossMask = "----U--------R--R-----F--F--D-DDD-D-----L--L-----B--B-";
	var f2l1Mask = "----U-------RR-RR-----FF-FF-DDDDD-D-----L--L-----B--B-";
	var f2l2Mask = "----U--------R--R----FF-FF-DD-DDD-D-----LL-LL----B--B-";
	var f2l3Mask = "----U--------RR-RR----F--F--D-DDD-DD----L--L----BB-BB-";
	var f2l4Mask = "----U--------R--R-----F--F--D-DDDDD----LL-LL-----BB-BB";
	var f2lMask = "----U-------RRRRRR---FFFFFFDDDDDDDDD---LLLLLL---BBBBBB";
	var ollMask = "UUUUUUUUU---RRRRRR---FFFFFFDDDDDDDDD---LLLLLL---BBBBBB";
	var roux1Mask = "---------------------F--F--D--D--D-----LLLLLL-----B--B";
	var roux2Mask = "------------RRRRRR---F-FF-FD-DD-DD-D---LLLLLL---B-BB-B";
	var roux3Mask = "U-U---U-UR-RRRRRRRF-FF-FF-FD-DD-DD-DL-LLLLLLLB-BB-BB-B";

	var cubeRotY = [2, 5, 8, 1, 4, 7, 0, 3, 6, 18, 19, 20, 21, 22, 23, 24, 25, 26, 36, 37, 38, 39, 40, 41, 42, 43, 44, 33, 30, 27, 34, 31, 28, 35, 32, 29, 45, 46, 47, 48, 49, 50, 51, 52, 53, 9, 10, 11, 12, 13, 14, 15, 16, 17];
	var cubeRotX = [53, 52, 51, 50, 49, 48, 47, 46, 45, 11, 14, 17, 10, 13, 16, 9, 12, 15, 0, 1, 2, 3, 4, 5, 6, 7, 8, 18, 19, 20, 21, 22, 23, 24, 25, 26, 42, 39, 36, 43, 40, 37, 44, 41, 38, 35, 34, 33, 32, 31, 30, 29, 28, 27];
	var cubeRotZ = [11, 14, 17, 10, 13, 16, 9, 12, 15, 29, 32, 35, 28, 31, 34, 27, 30, 33, 20, 23, 26, 19, 22, 25, 18, 21, 24, 38, 41, 44, 37, 40, 43, 36, 39, 42, 2, 5, 8, 1, 4, 7, 0, 3, 6, 51, 48, 45, 52, 49, 46, 53, 50, 47];

	function faceletRot(facelet, rot) {
		var ret = [];
		for (var i = 0; i < 54; i++) {
			ret[rot[i]] = facelet[i];
		}
		return ret.join('');
	}

	function solvedProgress(facelet, mask) {
		mask = mask || mathlib.SOLVED_FACELET;
		var colorMap = {};
		for (var i = 0; i < 54; i++) {
			if (mask[i] == '-') {
				continue;
			}
			if (facelet[i] in colorMap && colorMap[facelet[i]] != mask[i]) {
				return 1;
			}
			colorMap[facelet[i]] = mask[i];
		}
		return 0;
	}

	//return 7: nothing, 6: cross solved, 2~5: nth f2l solved, 1 oll solved, 0: solved
	function getCF4OPProgress(facelet) {
		if (solvedProgress(facelet, crossMask)) {
			return 7;
		}
		var numF2L = 0;
		numF2L += solvedProgress(facelet, f2l1Mask);
		numF2L += solvedProgress(facelet, f2l2Mask);
		numF2L += solvedProgress(facelet, f2l3Mask);
		numF2L += solvedProgress(facelet, f2l4Mask);
		if (numF2L > 0) {
			return 2 + numF2L;
		} else if (solvedProgress(facelet, ollMask)) {
			return 2;
		} else if (solvedProgress(facelet)) {
			return 1;
		}
		return 0;
	}

	//return 4: nothing, 3: cross solved, 2: f2l solved, 1 oll solved, 0: solved
	function getCFOPProgress(facelet) {
		if (solvedProgress(facelet, crossMask)) {
			return 4;
		} else if (solvedProgress(facelet, f2lMask)) {
			return 3;
		} else if (solvedProgress(facelet, ollMask)) {
			return 2;
		} else if (solvedProgress(facelet)) {
			return 1;
		}
		return 0;
	}

	//return 2: nothing, 1: f2l solved, 0: solved
	function getFPProgress(facelet) {
		if (solvedProgress(facelet, f2lMask)) {
			return 2;
		} else if (solvedProgress(facelet)) {
			return 1;
		}
		return 0;
	}

	//return 4: nothing, 3: block1, 2: block2, 1: cll, 0: solved
	function getRouxProgress(facelet) {
		if (solvedProgress(facelet, roux1Mask)) {
			return 4;
		} else if (solvedProgress(facelet, roux2Mask)) {
			return 3;
		} else if (solvedProgress(facelet, roux3Mask)) {
			return 2;
		} else if (solvedProgress(facelet)) {
			return 1;
		}
		return 0;
	}
	//6 axes: D -x-> B -z-> R -x-> U -z-> F -x-> L -z-> D
	function getProgressNAxis(facelet, process, n_axis) {
		var minRet = 99;
		for (var a = 0; a < n_axis; a++) {
			minRet = Math.min(minRet, process(facelet));
			facelet = faceletRot(facelet, (a & 1) ? cubeRotX : cubeRotZ);
			if (a % 6 == 5) {
				facelet = faceletRot(facelet, cubeRotZ);
				facelet = faceletRot(facelet, cubeRotZ);
			}
			if (a % 12 == 11) {
				facelet = faceletRot(facelet, cubeRotY);
				facelet = faceletRot(facelet, cubeRotY);
			}
		}
		return minRet;
	}

	return {
		getCFOPProgress: function(facelet) {
			return getProgressNAxis(facelet, getCFOPProgress, 6);
		},
		getCF4OPProgress: function(facelet) {
			return getProgressNAxis(facelet, getCF4OPProgress, 6);
		},
		getProgress: function(facelet, progress) {
			switch (progress) {
				case 'cfop':
					return getProgressNAxis(facelet, getCFOPProgress, 6);
				case 'fp':
					return getProgressNAxis(facelet, getFPProgress, 6);
				case 'cf4op':
					return getProgressNAxis(facelet, getCF4OPProgress, 6);
				case 'roux':
					return getProgressNAxis(facelet, getRouxProgress, 24);
				case 'n':
					return getProgressNAxis(facelet, solvedProgress, 1);
			}
		}
	}

})();