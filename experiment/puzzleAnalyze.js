var puzzleAnalyzer = (function() {
	"use strict";

	function getPuzzle(puzzle) {
		if (typeof(puzzle) == 'string') {
			var chk = poly3d.getFamousPuzzle(puzzle);
			var param = chk ? chk.polyParam : poly3d.parsePolyParam(puzzle);
			puzzle = poly3d.makePuzzle.apply(poly3d, param);
		}
		return puzzle;
	}

	function fixMoveTable(puzzle, moveTable, rotTable) {
		for (var i = 0; i < puzzle.moveTable.length; i++) {
			var curPerm = puzzle.moveTable[i];
			var isRotate = true;
			for (var j = 0; j < curPerm.length; j++) {
				if (curPerm[j] == -1) {
					curPerm[j] = j;
					isRotate = false;
				}
			}
			if (isRotate) {
				rotTable.push(curPerm);
			} else {
				moveTable.push(curPerm);
			}
		}
		return [moveTable, rotTable];
	}

	function countState(puzzle) {
		puzzle = getPuzzle(puzzle);
		var moveTable = [];
		var rotTable = [];
		fixMoveTable(puzzle, moveTable, rotTable);
		var moverot = new grouplib.SchreierSims(moveTable.concat(rotTable));
		console.log('Move+Rot=', moverot.size(true));
		var move = new grouplib.SchreierSims(moveTable);
		console.log('Move=', move.size(true));
		var rot = new grouplib.SchreierSims(rotTable);
		console.log('Rot=', rot.size(true));
		console.log('(Move+Rot)/Rot=', moverot.size(true) / rot.size(true));
		return moverot.size(true) / rot.size(true);
	}

	function countCanonSeqs(puzzle, depth, canonDepth) {
		puzzle = getPuzzle(puzzle);
		var moveTable = [];
		var rotTable = [];
		fixMoveTable(puzzle, moveTable, rotTable);
		//expand move table
		var validMoves = [];
		var isVisited = {};
		for (var i = 0; i < moveTable.length; i++) {
			var curPerm = moveTable[i];
			var perm = curPerm.slice();
			var pow = 1;
			while (true) {
				var hash = perm.join(',');
				if (!(hash in isVisited)) {
					isVisited[hash] = 1;
					validMoves.push(perm.slice());
				}
				var isIdent = true;
				for (var j = 0; j < curPerm.length; j++) {
					perm[j] = curPerm[perm[j]];
					if (perm[j] != j) {
						isIdent = false;
					}
				}
				if (isIdent) {
					break;
				}
				pow++;
			}
		}
		console.log(validMoves);
		var canon = new grouplib.CanonSeqGen(validMoves);
		canon.initTrie(canonDepth || 2);
		console.log(canon.countSeq(depth, true));
	}

	return {
		countState: countState,
		countCanonSeqs: countCanonSeqs
	}
})();
