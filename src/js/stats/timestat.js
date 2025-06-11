"use strict";

var TimeStat = execMain(function() {

	function TimeStat(avgSizes, timesLen, timeAt, timeSort) {
		this.avgSizes = avgSizes.slice();
		this.timeAt = timeAt;
		this.timeSort = timeSort || TimeStat.dnfsort;
		this.reset(timesLen);
	}

	function getNTrim(n, ntrim) {
		if (ntrim[0] == 'p') {
			return Math.ceil(n / 100 * ntrim.slice(1));
		} else if (ntrim == 'm') {
			return Math.max(0, n >> 1);
		} else {
			return ~~ntrim;
		}
	}

	function getNTrimLR(n) {
		var ntrim = kernel.getProp('trim', 'p5');
		var ntrimr = kernel.getProp('trimr', 'a');
		var triml = getNTrim(n, ntrim);
		var trimr = getNTrim(n, ntrimr == 'a' ? ntrim : ntrimr);
		if (triml + trimr == n) {
			return [Math.max(triml - 1, 0), Math.max(trimr - 1, 0)]
		}
		return [triml, trimr];
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
		return [numdnf, (numdnf == this.timesLen) ? -1 : this.tree.avgstd(0, this.timesLen - numdnf)[0]];
	}

	TimeStat.prototype.genStats = function() {
		if (!this.shouldRecalc) {
			return;
		}
		this._bestAvg = [];
		this._bestAvg[this.avgSizes.length] = [];
		this.lastAvg = [];
		this.treesAvg = [];
		this.tree = sbtree.tree(this.timeSort);
		this.bestTime = this.worstTime = -1;
		this.bestTimeIndex = this.worstTimeIndex = 0;

		var curTimesLen = this.timesLen;
		this.timesLen = 0;
		this.toLength(curTimesLen);
		this.shouldRecalc = false;
	}

	TimeStat.prototype.pushed = function(silent) {
		this.genStats(); // make sure all statistics are available, then update
		this.doPushed(silent);
	}

	TimeStat.prototype.bestAvg = function(idx, subIdx) {
		var arr = this._bestAvg[idx] || [];
		var ret = arr.at(-1) || [-1, 0, -1, -1, 0];
		if (subIdx !== undefined) {
			return ret[subIdx];
		}
		return ret;
	}

	TimeStat.prototype.isBestAvg = function(idx, start) {
		if (!this._bestAvg) {
			return false;
		}
		var arr = this._bestAvg[idx] || [];
		var l = 0;
		var r = arr.length - 1;
		while (l <= r) {
			var m = (l + r) >> 1;
			var ref = arr[m][4];
			if (ref > start) {
				r = m - 1;
			} else if (ref < start) {
				l = m + 1;
			} else {
				return true;
			}
		}
		return false;
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
		if (this.timeSort(t, this.bestAvg(this.avgSizes.length, 0)) < 0) {
			this._bestAvg[this.avgSizes.length].push([t, 0, t, t, i]);
		}

		for (var j = 0; j < this.avgSizes.length; j++) {
			var size = Math.abs(this.avgSizes[j]);
			if (this.timesLen < size - 1) {
				continue;
			}
			var rbt = this.treesAvg[j] || sbtree.tree(this.timeSort);
			if (this.timesLen == size - 1) {
				for (var k = 0; k < size - 1; k++) {
					rbt.insert(this.timeAt(k), k);
				}
				this.treesAvg[j] = rbt;
				continue;
			} else if (this.timesLen == size) {
				this._bestAvg[j] = [];
				rbt.insert(t, i);
			} else {
				rbt.remove(this.timeAt(i - size)).insert(t, i);
			}
			var trimlr = this.avgSizes[j] < 0 ? [0, 0] : getNTrimLR(size);
			var avgstd = rbt.avgstd(trimlr[0], size - trimlr[1]);
			var curVal = [(rbt.rankOf(-1) < size - trimlr[1]) ? -1 : avgstd[0], avgstd[1] / 1000, rbt.rank(trimlr[0] - 1), rbt.rank(size - trimlr[1])];
			if (this.timeSort(curVal[0], this.bestAvg(j, 0)) < 0) {
				if (this.bestAvg(j, 0) >= 0 && !next) {
					bestHintList.push((this.avgSizes[j] > 0 ? "ao" : "mo") + size);
				}
				this._bestAvg[j].push(curVal.concat([i - size + 1]));
			}
			this.lastAvg[j] = curVal;
			this.treesAvg[j] = rbt;
		}
		if (bestHintList.length != 0 && !silent) {
			logohint.push(LGHINT_SSBEST.replace('%s', bestHintList.join(" ")));
		}
	}

	// pop or push solves
	TimeStat.prototype.toLength = function(target) {
		while (this.timesLen > target) {
			this.toPop(this.timesLen - 1 != target);
		}
		while (this.timesLen < target) {
			this.doPushed(true, this.timesLen + 1 != target);
		}
	}

	TimeStat.prototype.toPop = function(next) {
		var i = this.timesLen - 1;
		var t = this.timeAt(i);
		this.tree.remove(t);
		if (!next) {
			this.bestTime = this.timesLen == 0 ? -1 : this.tree.rank(0);
			this.bestTimeIndex = this.tree.find(this.bestTime);
			this.worstTime = this.timesLen == 0 ? -1 : this.tree.rank(Math.max(0, this.tree.rankOf(-1) - 1));
			this.worstTimeIndex = this.tree.find(this.worstTime);
		}
		for (var j = 0; j < this.avgSizes.length; j++) {
			var size = Math.abs(this.avgSizes[j]);
			var rbt = this.treesAvg[j];
			if (this.timesLen < size - 1) {
				continue;
			} else if (this.timesLen == size - 1) {
				this.treesAvg[j] = null;
				continue;
			} else if (this.timesLen == size) {
				this.lastAvg[j] = null;
				this._bestAvg[j] = null;
				rbt.remove(t);
				continue;
			}
			rbt.remove(t).insert(this.timeAt(i - size), i - size);
			if (!next) {
				var trimlr = this.avgSizes[j] < 0 ? [0, 0] : getNTrimLR(size);
				var avgstd = rbt.avgstd(trimlr[0], size - trimlr[1]);
				var curVal = [(rbt.rankOf(-1) < size - trimlr[1]) ? -1 : avgstd[0], avgstd[1] / 1000, rbt.rank(trimlr[0] - 1), rbt.rank(size - trimlr[1])];
				this.lastAvg[j] = curVal;
			}
			if (this.bestAvg(j, 4) == i - size + 1) {
				this._bestAvg[j].pop();
			}
		}
		if (this.bestAvg(this.avgSizes.length, 4) == i) {
			this._bestAvg[this.avgSizes.length].pop();
		}
		this.timesLen--;
	}

	// threshold to break best, -1 => never, -2 => always
	TimeStat.prototype.getThres = function() {
		var thres = [];
		for (var j = 0; j < this.avgSizes.length; j++) {
			var size = Math.abs(this.avgSizes[j]);
			if (this.timesLen < size) {
				continue;
			}
			var trimlr = this.avgSizes[j] < 0 ? [0, 0] : getNTrimLR(size);
			var neff = size - trimlr[0] - trimlr[1];
			var rbt = this.treesAvg[j] || sbtree.tree(this.timeSort);
			var toRemove = this.timeAt(this.timesLen - size);
			var left = trimlr[0];
			var right = size - trimlr[1] - 1;
			if (this.timeSort(toRemove, rbt.rank(left)) <= 0) {
				left += 1;
				toRemove = 0;
			} else if (this.timeSort(rbt.rank(right), toRemove) <= 0) {
				right -= 1;
				toRemove = 0;
			}
			var tgtAvg = this.bestAvg(j, 0);
			if (rbt.rankOf(-1) <= right) { //next avg is always DNF
				thres[j] = -1;
				continue;
			} else if (tgtAvg == -1) {
				thres[j] = -2;
				continue;
			}
			var tgt = tgtAvg * neff - (rbt.sum(left, right + 1) - toRemove);
			var minVal = left == 0 ? 0 : rbt.rank(left - 1);
			var maxVal = right == size - 1 ? -1 : rbt.rank(right + 1);
			if (tgt <= 0 || this.timeSort(tgt, minVal) < 0) {
				thres[j] = -1;
			} else if (this.timeSort(maxVal, tgt) < 0) {
				thres[j] = -2;
			} else {
				thres[j] = tgt;
			}
		}
		return thres;
	}

	TimeStat.prototype.getBWPA = function() {
		var bpa = [];
		var wpa = [];
		var toRemove;
		for (var j = 0; j < this.avgSizes.length; j++) {
			var size = Math.abs(this.avgSizes[j]);
			if (this.timesLen < size - 1) {
				continue;
			}
			var trimlr = this.avgSizes[j] < 0 ? [0, 0] : getNTrimLR(size);
			var neff = size - trimlr[0] - trimlr[1];
			var rbt = this.treesAvg[j] || sbtree.tree(this.timeSort);
			if (this.timesLen != size - 1) {
				toRemove = this.timeAt(this.timesLen - size);
				rbt.remove(toRemove);
			}
			rbt.insert(0, 0);
			bpa[j] = (rbt.rankOf(-1) < size - trimlr[1]) ? -1 : rbt.avgstd(trimlr[0], size - trimlr[1])[0];
			rbt.remove(0).insert(-1, 0);
			wpa[j] = (rbt.rankOf(-1) < size - trimlr[1]) ? -1 : rbt.avgstd(trimlr[0], size - trimlr[1])[0];
			rbt.remove(-1);
			if (this.timesLen != size - 1) {
				rbt.insert(toRemove, this.timesLen - size);
			}
		}
		return [bpa, wpa];
	}

	TimeStat.prototype.getMinMaxInt = function() {
		var theStats = this.getAllStats();
		if (theStats[0] == this.timesLen) {
			return null;
		}
		return [this.worstTime, this.bestTime, this.getBestDiff(this.worstTime - this.bestTime)];
	}

	TimeStat.prototype.getBestDiff = function(gap) {
		var diffValues = [100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000];
		var diff;
		if (kernel.getProp('disPrec') == 'a') {
			diff = gap / 10;
			for (var i = 0; i < diffValues.length; i++) {
				if (diff < diffValues[i]) {
					diff = diffValues[i];
					break;
				}
			}
		} else {
			diff = diffValues[kernel.getProp('disPrec')];
		}
		return diff;
	}

	//ret length: length - nsolves + 1
	TimeStat.prototype.runAvgMean = function(start, length, size, trim) {
		size = size || length;
		if (start < 0 || start + length > this.timesLen) {
			return;
		}
		var trimlr = trim == 0 ? [0, 0] : getNTrimLR(size);
		if (size - trimlr[0] - trimlr[1] <= 0) {
			return [-1, 0, -1, -1];
		}
		var rbt = sbtree.tree(this.timeSort);
		for (var j = 0; j < size; j++) {
			rbt.insert(this.timeAt(start + j), j);
		}
		var avgstd = rbt.avgstd(trimlr[0], size - trimlr[1]);
		var ret = [
			[(rbt.rankOf(-1) < size - trimlr[1]) ? -1 : avgstd[0], avgstd[1] / 1000, rbt.rank(trimlr[0] - 1), rbt.rank(size - trimlr[1])]
		];
		var start0 = start - size;
		for (var i = size; i < length; i++) {
			rbt.remove(this.timeAt(start0 + i)).insert(this.timeAt(start + i), j);
			avgstd = rbt.avgstd(trimlr[0], size - trimlr[1]);
			ret.push([(rbt.rankOf(-1) < size - trimlr[1]) ? -1 : avgstd[0], avgstd[1] / 1000, rbt.rank(trimlr[0] - 1), rbt.rank(size - trimlr[1])]);
		}
		return ret;
	}

	TimeStat.prototype.getTrimList = function(start, nsolves, thresL, thresR) {
		var trimlList = [];
		var trimrList = [];
		var trimlr = getNTrimLR(nsolves);
		thresL = thresL < -2 ? 0 : thresL;
		for (var i = 0; i < nsolves; i++) {
			var t = this.timeAt(start + i);
			var cmpl = this.timeSort(t, thresL);
			var cmpr = this.timeSort(thresR, t);
			if (cmpl < 0) {
				trimlList.push(i);
			} else if (cmpr < 0) {
				trimrList.push(i);
			} else if (cmpl == 0 && trimlList.length < trimlr[0]) {
				trimlList.unshift(i);
			} else if (cmpr == 0 && trimrList.length < trimlr[1]) {
				trimrList.unshift(i);
			}
		}
		return trimlList.slice(trimlList.length - trimlr[0]).concat(trimrList.slice(trimrList.length - trimlr[1]));
	}

	return TimeStat;
});
