var gripRecons = (function() {
	"use strict";
	var handPosEnum = [
		0, // FL FR (left thumb, right thumb)
		1, // FL UR
		2, // FL DR
		3, // UL FR
		4, // DL FR
	];

	var costRx1 = 100;
	var costRx2 = 150;
	var costRx3 = 100;
	var costDx1 = 300;
	var costDx2 = 250;
	var costDx3 = 150;
	var costUx1 = 100;
	var costUx2 = 150;
	var costUx3 = 200;
	var costFx1 = 150;
	var costFx3 = 200;
	var costMx1 = 300;
	var costMx2 = 300;
	var costMx3 = 200;
	var costEx1 = 300;
	var costG0Y = 150;
	var costG1Y = 100;
	var costG14 =  30;
	var costG23 =  30;
	var costG01 =  80;
	var costG02 =  80;
	var costG12 = 120;
	var costHnd =  30;

	function genTransTable() {
		//	[[handPos1, handPos2, action, cost, rot, move], ...]
		var transTable = [
			[2, 0, "R ", costRx1, 3, null],
			[0, 1, "R ", costRx1, 3, null],
			[2, 1, "R2", costRx2, 4, null],
			[1, 2, "R2", costRx2, 4, null],
			[1, 0, "R'", costRx3, 5, null],
			[0, 2, "R'", costRx3, 5, null],
			[2, 2, "F ", costFx1, 6, null], // x
			[2, 2, "F'", costFx3, 8, null], // x
			[0, 0, "M ", costMx1, 3 + 18, 11],
			[0, 0, "M2", costMx2, 4 + 18, 6],
			[0, 0, "M'", costMx3, 5 + 18, 15],
			// [1, 1, "E ", costEx1, 0 + 18, 1],
			// [2, 2, "E ", costEx1, 0 + 18, 1],
			[1, 4, "x'", costG14, null, 11], // x'
			[2, 3, "x ", costG23, null, 15], // x
			[0, 0, "y ", costG0Y, null, 3],
			[0, 0, "y'", costG0Y, null, 1],
			[1, 1, "y ", costG1Y, null, 3],
			[1, 1, "y'", costG1Y, null, 1],
			[2, 2, "y ", costG1Y, null, 3],
			[2, 2, "y'", costG1Y, null, 1],
			[0, 1, "G01", costG01, null, null],
			[1, 0, "G10", costG01, null, null],
			[0, 2, "G02", costG02, null, null],
			[2, 0, "G20", costG02, null, null],
			[1, 2, "G12", costG12, null, null],
			[2, 1, "G21", costG12, null, null],
		]

		for (var i = 0; i < 3; i++) {
			var pos = [0, 3, 4][i];
			transTable.push([pos, pos, "D ", costDx1, 9, null]);
			transTable.push([pos, pos, "D2", costDx2, 10, null]);
			transTable.push([pos, pos, "D'", costDx3, 11, null]);
			transTable.push([pos, pos, "U ", costUx1, 0, null]);
			transTable.push([pos, pos, "U2", costUx2, 1, null]);
			transTable.push([pos, pos, "U'", costUx3, 2, null]);
		}
		// mirror actions
		var moveMap = {
			"U": "U",
			"R": "L",
			"D": "D",
			"F": "F",
			"E": "E",
			"S": "S",
			"y": "y"
		};
		var powMap = {
			" ": "'",
			"2": "2",
			"'": " "
		};
		var posMap = {
			0: 0,
			1: 3,
			2: 4,
			3: 1,
			4: 2
		};
		var replacer = [/^([URFDLBESyz])([ 2'])|G(\d)(\d)$/, function(m, p1, p2, p3, p4) {
			return m[0] == 'G' ? 'G' + posMap[~~p3] + posMap[~~p4] : (p1 in moveMap) ? moveMap[p1] + powMap[p2] : m;
		}];
		var mirrorMove = function(move) {
			return move == null || ~~(move / 3) == 7 ? move : [0, 4, 2, 3, 1, 5, 6, 7, 8][~~(move / 3)] * 3 + (2 - move % 3);
		};
		var mirrorRot = function(rot) {
			return rot == null ? rot : {3: 1, 1: 3}[rot] || rot;
		}
		var len = transTable.length;
		for (var i = 0; i < len; i++) {
			var trans = transTable[i];
			transTable.push([
				posMap[trans[0]],
				posMap[trans[1]],
				trans[2].replace(replacer[0], replacer[1]),
				trans[3] + costHnd,
				mirrorMove(trans[4]),
				mirrorRot(trans[5])
			]);
		}
		return transTable;
	}

	var minHeap = (function() {
		function heap() {
			this.arr = [];
		}

		heap.prototype.pop = function() {
			var arr = this.arr;
			var value = arr.pop();
			if (!arr.length) return value;
			var ret = arr[0];
			var i = 0;
			while (true) {
				var j = i * 2 + 1;
				if (j + 1 < arr.length && arr[j][0] > arr[j + 1][0]) j++;
				if (j >= arr.length || value[0] <= arr[j][0]) break;
				arr[i] = arr[j];
				i = j;
			}
			arr[i] = value;
			return ret;
		}

		heap.prototype.push = function(value) {
			var arr = this.arr;
			var i = arr.length;
			var j;
			while ((j = (i - 1) >> 1) >= 0 && value[0] < arr[j][0]) {
				arr[i] = arr[j];
				i = j;
			}
			arr[i] = value;
		}
		return heap;
	})();

	function getMinCost(src, enumNext, dest) {
		var heap = new minHeap();
		var minDist = {};
		heap.push([0, src]);
		minDist[src] = [0, src, null];
		var cnt = 0;
		while (true) {
			var node = heap.pop();
			if (!node) {
				break;
			} else if (node[1] == dest) {
				return minDist;
			} else if (node[0] > minDist[node[1]][0]) {
				continue;
			}
			cnt++;
			var cost = minDist[node[1]][0];
			var nextNodes = enumNext(node[1]);
			for (var i = 0; i < nextNodes.length; i++) {
				var info = nextNodes[i];
				if (!(info[1] in minDist) || cost + info[0] < minDist[info[1]][0]) {
					minDist[info[1]] = [cost + info[0], node[1], info[2]];
					heap.push([cost + info[0], info[1]]);
				}
			}
		}
		return minDist;
	}

	function getBestAlgorithm(moveSeq, startOriMask, endOriMask) {
		var transTable = genTransTable();

		// node: (step << 8 | ori << 3 | handPos)
		var calc = getMinCost(-1, function(node) {
			var ret = [];
			if (node == -1) {// init ori/handPos
				for (var i = 0; i < 24; i++) {
					if (startOriMask >> i & 1) {
						continue;
					}
					for (var j = 0; j < 5; j++) {
						ret.push([0, i << 3 | j, [0, 0, mathlib.CubieCube.rot2str[i]/*'start ori ' + i + ' handPos ' + j*/]]);
					}
				}
				return ret;
			}
			var step = node >> 8;
			var ori = node >> 3 & 0x1f;
			var handPos = node & 0x7;
			if (step == moveSeq.length) {
				if (!(endOriMask >> ori & 1)) {
					ret.push([0, -2, [0, 0, 'Gend ori=' + ori + ' hand=' + handPos]]);
				}
			}
			for (var i = 0; i < transTable.length; i++) {
				var trans = transTable[i];
				if (trans[0] != handPos) {
					continue;
				}
				var handPos1 = trans[1];
				var ori1 = ori;
				var step1 = step;
				if (trans[4] != null) { // real move, check match
					var effMove = mathlib.CubieCube.rotMulM[ori][trans[4] % 18] + (trans[4] >= 18 ? 18 : 0);
					if (effMove != moveSeq[step]) {
						continue;
					}
					step1++;
				}
				if (trans[5] != null) { // cube rot
					ori1 = mathlib.CubieCube.rotMult[trans[5]][ori1];
				}
				ret.push([trans[3], step1 << 8 | ori1 << 3 | handPos1, trans]);
			}
			return ret;
		}, -2);
		var node = -2;
		var ret = [];
		while (node != -1) {
			var info = calc[node];
			if (!info) {
				break;
			}
			info.splice(2, 0, node);
			ret.push(info);
			node = info[1];
		}
		ret.reverse();
		return ret;
	}

	function alg2str(alg, detail) {
		var moves = [];
		for (var i = 0; i < alg.length; i++) {
			var info = alg[i];
			if (info[3][2][0] != 'G') {
				moves.push(info[3][2]);
			} else if (detail) {
				moves.push('/*' + info[3][2] + '*/');
			}
		}
		return moves.join(' ').replace(/ +/g, ' ');
	}

	function getBestAlgorithmStr(moveStr, startOriMask, endOriMask) {
		var c = new mathlib.CubieCube();
		c.ori = 0;
		moveStr = moveStr.split(/ +/);
		var moveSeq = [];
		for (var i = 0; i < moveStr.length; i++) {
			var effMove = c.selfMoveStr(moveStr[i]);
			if (effMove != undefined) {
				moveSeq.push(effMove);
			}
		}
		return getBestAlgorithm(moveSeq, startOriMask, endOriMask);
	}

	function getPrettyReconstruction(rawMoves, method) {
		var prettySolve = "";
		var moves = [];
		var c = new mathlib.CubieCube();
		c.ori = 0;
		var stepN = [];
		rawMoves = cubeutil.getPrettyMoves(rawMoves);
		for (var i = 0; i < rawMoves.length; i++) {
			var stepMoves = rawMoves[i][0];
			for (var j = 0; j < stepMoves.length; j += 2) {
				var effMove = c.selfMoveStr(stepMoves.slice(j, j + 2));
				if (effMove != undefined) {
					moves.push(effMove);
				}
			}
			stepN.push(moves.length);
		}
		var bestAlg = getBestAlgorithm(moves);
		var sidx = 0;
		var last = 0;
		var stepNames = cubeutil.getStepNames(method).reverse();
		for (var i = 0; i < bestAlg.length; i++) {
			var idx = bestAlg[i][2];
			while ((idx >> 8) >= stepN[sidx]) {
				prettySolve += alg2str(bestAlg.slice(last, i + 1)) + (stepNames[sidx] ? " // " + stepNames[sidx] + " " + (stepN[sidx] - (stepN[sidx - 1] || 0)) + " move(s)" : "") + "\n";
				last = i + 1;
				sidx++;
			}
		}
		return {
			prettySolve: prettySolve,
			totalMoves: moves.length
		};
	}

	//replace cube rotation in recons
	function updateReconsOri(recons) {
		var movets = recons.split(' ');
		var moves = [];
		var tstamp = [];
		var c = new mathlib.CubieCube();
		c.ori = 0;
		for (var i = 0; i < movets.length; i++) {
			var m = /^(.*)@(\d+)$/.exec(movets[i]);
			if (!m) {
				continue;
			}
			var effMove = c.selfMoveStr(m[1]);
			if (effMove != undefined) {
				moves.push(effMove);
				tstamp.push(~~m[2]);
			}
		}
		var bestAlg = getBestAlgorithm(moves);
		var rets = [];
		var rots = [];
		var last = 0;
		var lastt = 0;
		for (var i = 0; i < bestAlg.length; i++) {
			var info = bestAlg[i];
			if (info[3][2][0] == 'G') {
				continue;
			}
			var idx = info[2] >> 8;
			if (idx == last) {
				var cur = info[3][2].split(' ');
				for (var j = 0; j < cur.length; j++) {
					cur[j] && rots.push(cur[j]);
				}
				continue;
			}
			var curt = tstamp[idx - 1];
			for (var j = 0; j < rots.length; j++) {
				var calctt = lastt + Math.floor((curt - lastt) * (j + 1) / (rots.length + 1));
				rets.push(rots[j].trim() + '@' + calctt);
			}
			rets.push(info[3][2].trim() + '@' + curt);
			last = idx;
			lastt = curt;
			rots = [];
		}
		return rets.join(' ').replace(/[EMS]/g, function(ch) {
			return ['2-2Dw', '2-2Lw', '2-2Fw']['EMS'.indexOf(ch)];
		});
	}

	return {
		getBestAlgorithmStr: getBestAlgorithmStr,
		getBestAlgorithm: getBestAlgorithm,
		getPrettyReconstruction: getPrettyReconstruction,
		updateReconsOri: updateReconsOri
	}
})();

