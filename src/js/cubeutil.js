"use strict";

var cubeutil = (function() {

	var crossMask = "----U--------R--R-----F--F--D-DDD-D-----L--L-----B--B-";
	var f2l1Mask = "----U-------RR-RR-----FF-FF-DDDDD-D-----L--L-----B--B-";
	var f2l2Mask = "----U--------R--R----FF-FF-DD-DDD-D-----LL-LL----B--B-";
	var f2l3Mask = "----U--------RR-RR----F--F--D-DDD-DD----L--L----BB-BB-";
	var f2l4Mask = "----U--------R--R-----F--F--D-DDDDD----LL-LL-----BB-BB";
	var f2lMask = "----U-------RRRRRR---FFFFFFDDDDDDDDD---LLLLLL---BBBBBB";
	var ollMask = "UUUUUUUUU---RRRRRR---FFFFFFDDDDDDDDD---LLLLLL---BBBBBB";

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

	function isSolvedMask(facelet, mask, colorMap) {
		for (var i = 0; i < 54; i++) {
			if (mask[i] == '-') {
				continue;
			}
			if (colorMap[facelet[i]] != mask[i]) {
				return false;
			}
		}
		return true;
	}

	//return 0: nothing, 1: cross solved, 2~5: nth f2l solved, 6 oll solved, 7: solved
	function getCF4OPProgress(facelet, colorMap) {
		if (!isSolvedMask(facelet, crossMask, colorMap)) {
			return 0;
		}
		var numF2L = 0;
		numF2L += isSolvedMask(facelet, f2l1Mask, colorMap);
		numF2L += isSolvedMask(facelet, f2l2Mask, colorMap);
		numF2L += isSolvedMask(facelet, f2l3Mask, colorMap);
		numF2L += isSolvedMask(facelet, f2l4Mask, colorMap);
		if (numF2L < 4) {
			return numF2L + 1;
		}
		if (!isSolvedMask(facelet, ollMask, colorMap)) {
			return 5;
		}
		if (!isSolvedMask(facelet, mathlib.SOLVED_FACELET, colorMap)) {
			return 6;
		}
		return 7;
	}

	//return 0: nothing, 1: cross solved, 2~5: nth f2l solved, 6 oll solved, 7: solved
	function getCFOPProgress(facelet, colorMap) {
		if (!isSolvedMask(facelet, crossMask, colorMap)) {
			return 0;
		}
		if (!isSolvedMask(facelet, f2lMask, colorMap)) {
			return 1;
		}
		if (!isSolvedMask(facelet, ollMask, colorMap)) {
			return 2;
		}
		if (!isSolvedMask(facelet, mathlib.SOLVED_FACELET, colorMap)) {
			return 3;
		}
		return 4;
	}

	//6 axes: D -x-> B -z-> R -x-> U -z-> F -x-> L -z-> D
	function getProgress6A(facelet, process) {
		var maxRet = 0;
		for (var a = 0; a < 6; a++) {
			var colorMap = {};
			var centers = facelet[4] + facelet[13] + facelet[22] + facelet[31] + facelet[40] + facelet[49];
			for (var i = 0; i < 6; i++) {
				colorMap[centers[i]] = 'URFDLB' [i];
			}
			maxRet = Math.max(maxRet, process(facelet, colorMap));
			facelet = faceletRot(facelet, (a & 1) ? cubeRotX : cubeRotZ);
		}
		return maxRet;
	}

	return {
		getCFOPProgress: function(facelet) {
			return getProgress6A(facelet, getCFOPProgress);
		},
		getCF4OPProgress: function(facelet) {
			return getProgress6A(facelet, getCF4OPProgress);
		}
	}

})();