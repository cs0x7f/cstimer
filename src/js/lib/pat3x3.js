var pat3x3 = (function() {

	var bitCount = mathlib.bitCount;

	function iterFill(depth, mask, ori, parity, memo, candidates, nOri, sampleArr) {
		var key = (mask * nOri + ori) * 2 + parity;
		if (!sampleArr && key in memo) {
			return memo[key];
		}
		if (depth == candidates.length) {
			if (ori == 0 && parity == 0) {
				memo[key] = 1;
			} else {
				memo[key] = 0;
			}
			return memo[key];
		}
		var cnt = 0;
		var probs = [];
		for (var i = 0; i < candidates[depth].length; i++) {
			probs[i] = 0;
			var piece = candidates[depth][i][0];
			if (mask >> piece & 1) {
				continue;
			}
			probs[i] = iterFill(depth + 1,
				mask | 1 << piece,
				(ori + candidates[depth][i][1]) % nOri,
				parity ^ (bitCount(mask >> piece) & 1),
				memo, candidates, nOri
			);
			cnt += probs[i];
		}
		if (sampleArr) {
			var action = candidates[depth][mathlib.rndProb(probs)];
			sampleArr[depth] = action;
			return iterFill(depth + 1,
				mask | 1 << action[0],
				(ori + action[1]) % nOri,
				parity ^ (bitCount(mask >> action[0]) & 1),
				memo, candidates, nOri, sampleArr
			);
		}
		memo[key] = cnt;
		return memo[key];
	}

	function genCandidates(facelet, solved, pieces) {
		var nPiece = pieces.length;
		var nOri = pieces[0].length;
		var candidates = [];
		for (var pos = 0; pos < nPiece; pos++) {
			candidates[pos] = [];
			for (var piece = 0; piece < nPiece; piece++) {
				for (var ori = 0; ori < nOri; ori++) {
					var isValid = true;
					for (var chk = 0; chk < nOri; chk++) {
						var target = facelet[pieces[pos][chk]]
						if (target != -1 && target != solved[pieces[piece][(nOri - ori + chk) % nOri]]) {
							isValid = false;
							break;
						}
					}
					if (isValid) {
						candidates[pos].push([piece, ori]);
					}
				}
			}
		}
		return candidates;
	}

	function calcPattern(facelet, solved) {
		facelet = facelet.split("");
		solved = (solved || mathlib.SOLVED_FACELET).split("");
		for (var i = 0; i < facelet.length; i++) {
			facelet[i] = "URFDLB-XYZ".indexOf(facelet[i]);
			solved[i] = "URFDLB-XYZ".indexOf(solved[i]);
		}
		var cornCandidates = genCandidates(facelet, solved, mathlib.CubieCube.cFacelet);
		var edgeCandidates = genCandidates(facelet, solved, mathlib.CubieCube.eFacelet);
		var cornCnts = [];
		var edgeCnts = [];
		var cornMemo = {};
		var edgeMemo = {};
		for (var parity = 0; parity < 2; parity++) {
			cornCnts[parity] = iterFill(0, 0, 0, parity, cornMemo, cornCandidates, 3);
			edgeCnts[parity] = iterFill(0, 0, 0, parity, edgeMemo, edgeCandidates, 2);
		}
		return [cornCnts, edgeCnts, cornMemo, edgeMemo, cornCandidates, edgeCandidates];
	}

	function genPattern(cornCnts, edgeCnts, cornMemo, edgeMemo, cornCandidates, edgeCandidates) {
		var parity = ~~mathlib.rndHit(cornCnts[1] * edgeCnts[1] / (cornCnts[0] * edgeCnts[0] + cornCnts[1] * edgeCnts[1]));
		var cornArr = [];
		var edgeArr = [];
		iterFill(0, 0, 0, parity, cornMemo, cornCandidates, 3, cornArr);
		iterFill(0, 0, 0, parity, edgeMemo, edgeCandidates, 2, edgeArr);
		var cc = new mathlib.CubieCube();
		for (var i = 0; i < 8; i++) {
			cc.ca[i] = cornArr[i][1] * 8 + cornArr[i][0];
		}
		for (var i = 0; i < 12; i++) {
			cc.ea[i] = edgeArr[i][0] * 2 + edgeArr[i][1];
		}
		return cc.toFaceCube();
	}

	function genPatternGroup(solved) {
		var params = calcPattern(solved, solved);
		var cornCnts = params[0];
		var edgeCnts = params[1];
		var cornMemo = params[2];
		var edgeMemo = params[3];
		var cornCandidates = params[4];
		var edgeCandidates = params[5];
		var targetSize = cornCnts[0] * edgeCnts[0] + cornCnts[1] * edgeCnts[1];
		var sgs = null;
		do {
			var parity = Math.random() < cornCnts[1] * edgeCnts[1] / (cornCnts[0] * edgeCnts[0] + cornCnts[1] * edgeCnts[1]) ? 1 : 0;
			var cornArr = [];
			var edgeArr = [];
			iterFill(0, 0, 0, parity, cornMemo, cornCandidates, 3, cornArr);
			iterFill(0, 0, 0, parity, edgeMemo, edgeCandidates, 2, edgeArr);
			var cc = new mathlib.CubieCube();
			for (var i = 0; i < 8; i++) {
				cc.ca[i] = cornArr[i][1] * 8 + cornArr[i][0];
			}
			for (var i = 0; i < 12; i++) {
				cc.ea[i] = edgeArr[i][0] * 2 + edgeArr[i][1];
			}
			var perm = cc.toPerm();
			if (!sgs) {
				sgs = new grouplib.SchreierSims([perm]);
			} else {
				sgs.extend([perm]);
			}
			DEBUG && console.log('[pat3x3] gen group ', sgs.size(), targetSize);
		} while (sgs.size() < targetSize);
		return sgs;
	}

	return {
		calcPattern: calcPattern,
		genPattern: genPattern,
		genPatternGroup: genPatternGroup
	}
})();
