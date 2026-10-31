"use strict";

var TimeAgg = execMain(function() {

	function TimeAgg(timesAt, timeAt) {
		this.timesAt = timesAt;
		this.timeAt = timeAt;
		this.reset(0);
	}

	TimeAgg.prototype.reset = function(timesLen) {
		this.timesLen = timesLen;
		this.totalTime = 0;
		this.dirtyTime = true;
		this.distCnt = {};
		this.distLast = {};
		this.distSame = null;
		this.dirtyDis = true;
	};

	TimeAgg.prototype.pushed = function() {
		var idx = this.timesLen++;
		if (!this.dirtyTime) {
			this.totalTime += this.timesAt(idx)[0][1];
		}
		if (!this.dirtyDis) {
			this.distAdd(idx);
		}
	};

	TimeAgg.prototype.toPop = function() {
		var idx = --this.timesLen;
		if (!this.dirtyTime) {
			this.totalTime -= this.timesAt(idx)[0][1];
		}
		if (!this.dirtyDis) {
			this.distPop(idx);
		}
	};

	TimeAgg.prototype.toLength = function(target) {
		while (this.timesLen > target) {
			this.toPop();
		}
		while (this.timesLen < target) {
			this.pushed();
		}
	};

	TimeAgg.prototype.ensureSame = function(idx) {
		if (this.distSame && idx < this.distSame.length) {
			return;
		}
		var size = Math.max(idx + 1, this.distSame ? this.distSame.length * 2 : 1024);
		var arr = new Int32Array(size);
		if (this.distSame) {
			arr.set(this.distSame);
		}
		this.distSame = arr;
	};

	TimeAgg.prototype.distKey = function(idx) {
		var value = this.timeAt(idx);
		return value == -1 ? -1 : ~~(value / 100);
	};

	TimeAgg.prototype.distAdd = function(idx) {
		var key = this.distKey(idx);
		var last = this.distLast[key];
		this.ensureSame(idx);
		this.distSame[idx] = (last === undefined) ? -1 : last;
		this.distLast[key] = idx;
		if (key != -1) {
			this.distCnt[key] = (this.distCnt[key] || 0) + 1;
		}
	};

	TimeAgg.prototype.distPop = function(idx) {
		var key = this.distKey(idx);
		var prev = this.distSame[idx];
		if (prev < 0) {
			delete this.distLast[key];
		} else {
			this.distLast[key] = prev;
		}
		if (key != -1 && --this.distCnt[key] == 0) {
			delete this.distCnt[key];
		}
	};

	TimeAgg.prototype.rebuildDis = function() {
		this.distCnt = {};
		this.distLast = {};
		this.distSame = new Int32Array(this.timesLen);
		for (var i = 0; i < this.timesLen; i++) {
			var key = this.distKey(i);
			var last = this.distLast[key];
			this.distSame[i] = (last === undefined) ? -1 : last;
			this.distLast[key] = i;
			if (key != -1) {
				this.distCnt[key] = (this.distCnt[key] || 0) + 1;
			}
		}
		this.dirtyDis = false;
	};

	TimeAgg.prototype.getDistribution = function() {
		if (this.dirtyDis) {
			this.rebuildDis();
		}
		return {
			timesLen: this.timesLen,
			unit: 100,
			cnt: this.distCnt,
			last: this.distLast
		};
	};

	TimeAgg.prototype.getTotalTime = function() {
		if (this.dirtyTime) {
			this.totalTime = 0;
			for (var i = 0; i < this.timesLen; i++) {
				this.totalTime += this.timesAt(i)[0][1];
			}
			this.dirtyTime = false;
		}
		return this.totalTime;
	};

	return TimeAgg;
});
