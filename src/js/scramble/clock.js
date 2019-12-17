"use strict";

var clock = (function(rn, Cnk) {
	var moveArr = [
		[0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], //UR
		[0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0], //DR
		[0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0], //DL
		[1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], //UL
		[1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], //U
		[0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0], //R
		[0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], //D
		[1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0], //L
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], //ALL
		[11, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0], //UR
		[0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 1, 1, 1], //DR
		[0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 1, 1, 0, 1], //DL
		[0, 0, 11, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0], //UL
		[11, 0, 11, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0], //U
		[11, 0, 0, 0, 0, 0, 11, 0, 0, 1, 0, 1, 1, 1], //R
		[0, 0, 0, 0, 0, 0, 11, 0, 11, 0, 1, 1, 1, 1], //D
		[0, 0, 11, 0, 0, 0, 0, 0, 11, 1, 1, 1, 0, 1], //L
		[11, 0, 11, 0, 0, 0, 11, 0, 11, 1, 1, 1, 1, 1] //ALL
	];

	function select(n, k, idx) {
		var r = k;
		var val = 0;
		for (var i = n - 1; i >= 0; i--) {
			if (idx >= Cnk[i][r]) {
				idx -= Cnk[i][r--];
				val |= 1 << i;
			}
		}
		return val;
	}

	//invert table 0  1  2  3  4  5  6  7  8  9 10 11
	var invert = [-1, 1, -1, -1, -1, 5, -1, 7, -1, -1, -1, 11];

	function randomState() {
		var ret = [];
		for (var i = 0; i < 14; i++) {
			ret[i] = rn(12);
		}
		return ret;
	}

	/**
	 *	@return the length of the solution (the number of non-zero elements in the solution array)
	 *		-1: invalid input
	 */
	function Solution(clock, solution) {
		if (clock.length != 14 || solution.length != 18) {
			return -1;
		}
		return solveIn(14, clock, solution);
	}

	function swap(arr, row1, row2) {
		var tmp = arr[row1];
		arr[row1] = arr[row2];
		arr[row2] = tmp;
	}

	function addTo(arr, row1, row2, startidx, mul) {
		var length = arr[0].length;
		for (var i = startidx; i < length; i++) {
			arr[row2][i] = (arr[row2][i] + arr[row1][i] * mul) % 12;
		}
	}

	//linearly dependent
	var ld_list = [7695, 42588, 47187, 85158, 86697, 156568, 181700, 209201, 231778];

	function solveIn(k, numbers, solution) {
		var n = 18;
		var min_nz = k + 1;

		for (var idx = 0; idx < Cnk[n][k]; idx++) {
			var val = select(n, k, idx);
			var isLD = false;
			for (var r = 0; r < ld_list.length; r++) {
				if ((val & ld_list[r]) == ld_list[r]) {
					isLD = true;
					break;
				}
			}
			if (isLD) {
				continue;
			}
			var map = [];
			var cnt = 0;
			for (var j = 0; j < n; j++) {
				if (((val >> j) & 1) == 1) {
					map[cnt++] = j;
				}
			}
			var arr = [];
			for (var i = 0; i < 14; i++) {
				arr[i] = [];
				for (var j = 0; j < k; j++) {
					arr[i][j] = moveArr[map[j]][i];
				}
				arr[i][k] = numbers[i];
			}
			var ret = GaussianElimination(arr);
			if (ret != 0) {
				continue;
			}
			var isSolved = true;
			for (var i = k; i < 14; i++) {
				if (arr[i][k] != 0) {
					isSolved = false;
					break;
				}
			}
			if (!isSolved) {
				continue;
			}
			backSubstitution(arr);
			var cnt_nz = 0;
			for (var i = 0; i < k; i++) {
				if (arr[i][k] != 0) {
					cnt_nz++;
				}
			}
			if (cnt_nz < min_nz) {
				for (var i = 0; i < 18; i++) {
					solution[i] = 0;
				}
				for (var i = 0; i < k; i++) {
					solution[map[i]] = arr[i][k];
				}
				min_nz = cnt_nz;
			}
		}
		return min_nz == k + 1 ? -1 : min_nz;
	}

	function GaussianElimination(arr) {
		var m = 14;
		var n = arr[0].length;
		for (var i = 0; i < n - 1; i++) {
			if (invert[arr[i][i]] == -1) {
				var ivtidx = -1;
				for (var j = i + 1; j < m; j++) {
					if (invert[arr[j][i]] != -1) {
						ivtidx = j;
						break;
					}
				}
				if (ivtidx == -1) {
					OUT: for (var j1 = i; j1 < m - 1; j1++) {
						for (var j2 = j1 + 1; j2 < m; j2++) {
							if (invert[(arr[j1][i] + arr[j2][i]) % 12] != -1) {
								addTo(arr, j2, j1, i, 1);
								ivtidx = j1;
								break OUT;
							}
						}
					}
				}
				if (ivtidx == -1) { //k vectors are linearly dependent
					for (var j = i + 1; j < m; j++) {
						if (arr[j][i] != 0) {
							return -1;
						}
					}
					return i + 1;
				}
				swap(arr, i, ivtidx);
			}
			var inv = invert[arr[i][i]];
			for (var j = i; j < n; j++) {
				arr[i][j] = arr[i][j] * inv % 12;
			}
			for (var j = i + 1; j < m; j++) {
				addTo(arr, i, j, i, 12 - arr[j][i]);
			}
		}
		return 0;
	}

	function backSubstitution(arr) {
		var n = arr[0].length;
		for (var i = n - 2; i > 0; i--) {
			for (var j = i - 1; j >= 0; j--) {
				if (arr[j][i] != 0) {
					addTo(arr, i, j, i, 12 - arr[j][i]);
				}
			}
		}
	}

	var turns = ["UR", "DR", "DL", "UL", "U", "R", "D", "L", "ALL"];

	function getScramble(type) {
		var rndarr = randomState();
		var solution = [];
		solution.length = 18;
		Solution(rndarr, solution);
		var scramble = "";

		for (var x = 0; x < 9; x++) {
			var turn = solution[x];
			if (turn == 0) {
				continue;
			}
			var clockwise = turn <= 6;
			if (turn > 6) {
				turn = 12 - turn;
			}
			scramble += turns[x] + turn + (clockwise ? "+" : "-") + " ";
		}
		scramble += "y2 ";
		for (var x = 0; x < 9; x++) {
			var turn = solution[x + 9];
			if (turn == 0) {
				continue;
			}
			var clockwise = turn <= 6;
			if (turn > 6) {
				turn = 12 - turn;
			}
			scramble += turns[x] + turn + (clockwise ? "+" : "-") + " ";
		}
		var isFirst = true;
		for (var x = 0; x < 4; x++) {
			if (rn(2) == 1) {
				scramble += (isFirst ? "" : " ") + turns[x];
				isFirst = false;
			}
		}
		return scramble;
	}

	scrMgr.reg('clko', getScramble);

	return {
		moveArr: moveArr
	};

})(mathlib.rn, mathlib.Cnk);
