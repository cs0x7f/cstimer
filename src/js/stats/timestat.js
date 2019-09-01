"use strict";

var TimeStat = execMain(function() {

	function TimeStat(avgSizes, timesLen, timeAt, timeSort) {
		this.avgSizes = avgSizes.slice();
		this.timeAt = timeAt;
		this.timeSort = timeSort || TimeStat.dnfsort;
		this.reset(timesLen);
	}

	function getNTrim(n) {
		var ntrim = kernel.getProp('trim', 'p5');
		if (ntrim[0] == 'p') {
			return Math.ceil(n / 100 * ntrim.slice(1));
		} else if (ntrim == 'm') {
			return Math.max(0, (n - 1) >> 1);
		} else {
			return ~~ntrim;
		}
	}

	TimeStat.dnfsort = function(a, b) {
		if (a == b) return 0;
		if (a < 0) return 1;
		if (b < 0) return -1;
		return a - b;
	}

	TimeStat.prototype.reset = function(timesLen) {
		this.timesLen = timesLen;
		this.shouldRecalc = true;
	}

	TimeStat.prototype.getAllStats = function() {
		this.genStats();
		var numdnf = this.timesLen - this.tree.rankOf(-1);
		return [numdnf, (numdnf == this.timesLen) ? -1 : kernel.round(this.tree.cumSum(this.timesLen - numdnf) / (this.timesLen - numdnf))];
	}

	TimeStat.prototype.genStats = function() {
		if (!this.shouldRecalc) {
			return;
		}
		this.bestAvg = [];
		this.lastAvg = [];
		this.bestAvgIndex = [];
		this.treesAvg = [];
		this.tree = sbtree.tree(this.timeSort);
		this.bestTime = this.worstTime = -1;
		this.bestTimeIndex = this.worstTimeIndex = 0;

		var curTimesLen = this.timesLen;
		this.timesLen = 0;
		while (this.timesLen < curTimesLen) {
			this.doPushed(true, this.timesLen != curTimesLen - 1);
		}
		this.shouldRecalc = false;
	}

	TimeStat.prototype.pushed = function(silent) {
		this.genStats(); // make sure all statistics are available, then update
		this.doPushed(silent);
	}

	TimeStat.prototype.doPushed = function(silent, next) {
		var bestHintList = [];

		this.timesLen++;
		var i = this.timesLen - 1;
		var t = this.timeAt(i);
		this.tree.insert(t, i);

		if (!next) {
			var prevBest = this.bestTime;
			this.bestTime = this.timesLen == 0 ? -1 : this.tree.rank(0);
			this.bestTimeIndex = this.tree.find(this.bestTime);
			this.worstTime = this.timesLen == 0 ? -1 : this.tree.rank(Math.max(0, this.tree.rankOf(-1) - 1));
			this.worstTimeIndex = this.tree.find(this.worstTime);

			if (this.timeSort(t, prevBest) < 0 && prevBest != -1) {
				bestHintList.push('single');
			}
		}

		for (var j = 0; j < this.avgSizes.length; j++) {
			var size = Math.abs(this.avgSizes[j]);
			if (this.timesLen < size) {
				break;
			}
			var trim = this.avgSizes[j] < 0 ? 0 : getNTrim(size);
			var neff = size - 2 * trim;
			var rbt = this.treesAvg[j] || sbtree.tree(this.timeSort);
			if (this.timesLen == size) {
				for (var k = 0; k < size; k++) {
					rbt.insert(this.timeAt(k), k);
				}
				this.bestAvg[j] = [-1, 0, -1, -1];
				this.bestAvgIndex[j] = 0;
				this.lastAvg[j] = [-1, 0, -1, -1];
			} else {
				rbt.remove(this.timeAt(i - size)).insert(t, i);
			}
			var sum = rbt.cumSum(size - trim) - rbt.cumSum(trim);
			var variance = Math.sqrt((rbt.cumSk2(size - trim) - rbt.cumSk2(trim) - sum * sum / neff) / (neff - 1)) / 1000;
			var curVal = [(rbt.rankOf(-1) < size - trim) ? -1 : sum / neff, variance, rbt.rank(trim - 1), rbt.rank(size - trim)];
			if (this.timeSort(curVal[0], this.bestAvg[j][0]) < 0) {
				if (this.bestAvg[j][0] >= 0 && !next) {
					bestHintList.push((this.avgSizes[j] > 0 ? "ao" : "mo") + size);
				}
				this.bestAvg[j] = curVal;
				this.bestAvgIndex[j] = i - size + 1;
			}
			this.lastAvg[j] = curVal;
			this.treesAvg[j] = rbt;
		}
		if (bestHintList.length != 0 && !silent) {
			logohint.push("Session best " + bestHintList.join(" ") + "!");
		}
	}

	TimeStat.prototype.getMinMaxInt = function() {
		var theStats = this.getAllStats();
		if (theStats[0] == this.timesLen) {
			return null;
		}
		var diffValues = [100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000];
		var diff;
		if (kernel.getProp('disPrec') == 'a') {
			diff = (this.worstTime - this.bestTime) / 10;
			for (var i = 0; i < diffValues.length; i++) {
				if (diff < diffValues[i]) {
					diff = diffValues[i];
					break;
				}
			}
		} else {
			diff = diffValues[kernel.getProp('disPrec')];
		}
		return [this.worstTime, this.bestTime, diff];
	}

	//ret length: length - nsolves + 1
	TimeStat.prototype.runAvgMean = function(start, length, size, trim) {
		size = size || length;
		if (trim === undefined) {
			trim = getNTrim(size);
		}
		if (start < 0 || start + length > this.timesLen) {
			return;
		}
		if (size - trim <= 0) {
			return [-1, 0, -1, -1];
		}
		var rbt = sbtree.tree(this.timeSort);
		for (var j = 0; j < size; j++) {
			rbt.insert(this.timeAt(start + j), j);
		}
		var neff = size - 2 * trim;
		var sum = rbt.cumSum(size - trim) - rbt.cumSum(trim);
		var variance = Math.sqrt((rbt.cumSk2(size - trim) - rbt.cumSk2(trim) - sum * sum / neff) / (neff - 1)) / 1000;
		var ret = [
			[(rbt.rankOf(-1) < size - trim) ? -1 : sum / neff, variance, rbt.rank(trim - 1), rbt.rank(size - trim)]
		];
		var start0 = start - size;
		for (var i = size; i < length; i++) {
			rbt.remove(this.timeAt(start0 + i)).insert(this.timeAt(start + i), j);
			sum = rbt.cumSum(size - trim) - rbt.cumSum(trim);
			variance = Math.sqrt((rbt.cumSk2(size - trim) - rbt.cumSk2(trim) - sum * sum / neff) / (neff - 1)) / 1000;
			ret.push([(rbt.rankOf(-1) < size - trim) ? -1 : sum / neff, variance, rbt.rank(trim - 1), rbt.rank(size - trim)]);
		}
		return ret;
	}

	TimeStat.prototype.getTrimList = function(start, nsolves, thresL, thresR) {
		var trimlList = [];
		var trimrList = [];
		var trim = getNTrim(nsolves);
		for (var i = 0; i < nsolves; i++) {
			var t = this.timeAt(start + i);
			var cmpl = this.timeSort(t, thresL);
			var cmpr = this.timeSort(thresR, t);
			if (cmpl < 0) {
				trimlList.push(i);
			} else if (cmpr < 0) {
				trimrList.push(i);
			} else if (cmpl == 0 && trimlList.length < trim) {
				trimlList.unshift(i);
			} else if (cmpr == 0 && trimrList.length < trim) {
				trimrList.unshift(i);
			}
		}
		return trimlList.slice(-trim).concat(trimrList.slice(-trim));
	}

	return TimeStat;
});