"use strict";

function TimeList(times) {
    this.times = times;
}

TimeList.prototype.get = function(idx) {
    return this.times[idx];
}

TimeList.prototype.set = function(idx, val) {
    this.times[idx] = val;
}

TimeList.prototype.comment = function(idx, val) {
    this.times[idx][2] = val;
}

TimeList.prototype.penalty = function(idx, val) {
    this.times[idx][0][0] = val;
}

TimeList.prototype.time = function(idx) {
    return this.times[idx][0][0] == -1 ? -1 : times[idx][0][0] + times[idx][0][1];
}

TimeList.prototype.push = function(val) {
    return this.times.push(val);
}

TimeList.prototype.reset = function(times) {
    this.times = times;
}

TimeList.prototype.clear = function() {
    this.times.splice(0, this.times.length);
}

TimeList.prototype.getBestAvgIdx = function(idx, len) {
    if (!(idx >= 0 && idx + len <= times.length)) {
        return;
    } else if (len == 0) {
        return [-1, -1, -1, -1, 0];
    }
    var total = 0;
    var best = 0x7fffffff;
    var worst = 0;
    var cntDNF = 0;
    var trim = Math.ceil(len / 20);
    var time_list = new Array(len);
    for (var i = idx; i < idx + len; i++) {
        if (times[i][0][0] == -1) {
            cntDNF++;
            time_list[i - idx] = -1;
        } else {
            var time = times[i][0][0] + times[i][0][1];
            best = Math.min(best, time);
            worst = Math.max(worst, time);
            total += time;
            time_list[i - idx] = time;
        }
    }
    time_list.sort(dnfsort);
    var totaltrim = 0;
    for (var i = trim; i < len - trim; i++) {
        totaltrim += time_list[i];
    }
    if (cntDNF == len) {
        return [-1, -1, -1, -1, cntDNF];
    } else if (cntDNF > trim) {
        return [best, -1, -1, total / (len - cntDNF), cntDNF];
    } else if (cntDNF <= trim && cntDNF != 0) {
        return [best, totaltrim / (len - 2 * trim), -1, total / (len - cntDNF), cntDNF];
    } else {
        return [best, totaltrim / (len - 2 * trim), total / len, total / len, cntDNF];
    }
}
