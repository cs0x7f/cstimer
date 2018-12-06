"use strict";

var stats = (function(kpretty, round) {
	var times = [];
	var div = $('<div id="stats" />');
	var stext = $('<textarea rows="10" readonly />');
	var scrollDiv = $('<div class="myscroll" />');

	var table = $('<table />').click(procClick).addClass("table");
	var title = $('<tr />');

	var avgRow = $('<tr class="times" />');
	var showAllRow = $('<tr class="click" ><th class="click" colspan="15">...</th></tr>');

	var sumtable = $('<table class="sumtable" />').click(infoClick).addClass("table");
	var sumtableDiv = $('<div class="statc" />');

	var MAX_ITEMS = 50;

	function push(time) {
		if (typeof time[0] == "string") {
			// times.push([time[2], time[1] || curScramble, time[0]]);
			times_stats.push([time[2], time[1] || curScramble, time[0], Math.round((new Date().getTime() - time[2][1]) / 1000)]);
			time = time[2];
		} else {
			// times.push([time, curScramble, ""]);
			times_stats.push([time, curScramble, "", Math.round((new Date().getTime() - time[1]) / 1000)]);
		}
		sessionManager.save(times.length - 1);
		if (time.length - 1 > curDim) {
			updateTable(true);
		} else {
			if (kernel.getProp('statinv')) {
				avgRow.before(getTimeRow(times.length - 1, curDim));
				scrollDiv.scrollTop(table[0].scrollHeight);
			} else {
				title.after(getTimeRow(times.length - 1, curDim));
				scrollDiv.scrollTop(0);
			}
			updateAvgRow(curDim);
			if (times.length > MAX_ITEMS) {
				(kernel.getProp('statinv') ? showAllRow.next() : showAllRow.prev()).remove();
				hideAll();
			}
		}
		updateUtil();
	}

	function reset() {
		if (!confirm(STATS_CFM_RESET)) {
			return;
		}
		times = [];
		times_stats.reset();
		sessionManager.save();
		updateTable(false);
		kernel.blur();
	}

	function delIdx(index) {
		var n_del;
		if (kernel.getProp("delmul")) {
			n_del = prompt(STATS_CFM_DELMUL, 1);
			if (n_del == null || !/^\d+$/.exec(n_del) || ~~n_del == 0) {
				return;
			}
		} else {
			if (!confirm(STATS_CFM_DELETE)) {
				return;
			}
			n_del = 1;
		}
		times.splice(index, ~~n_del);
		times_stats.reset();
		sessionManager.save(index);
		updateTable(false);
		return true;
	}

	function getMean(dim) {
		var sum = 0;
		var cntdnf = 0;
		for (var i = 0; i < times.length; i++) {
			var curTime = timesAt(i)[0];
			if (curTime[0] == -1 || curTime.length <= dim) {
				cntdnf += 1;
			} else if (dim == 0) {
				sum += timeAt(i);
			} else if (dim == 1) {
				sum += curTime[curTime.length - dim];
			} else {
				sum += curTime[curTime.length - dim] - curTime[curTime.length - dim + 1];
			}
		}
		if (cntdnf == times.length) {
			return -1;
		} else {
			return sum / (times.length - cntdnf);
		}
	}

	/**
	 * return [best, avg, mean, avgExceptDNF, cntDNF], -1 == unknown or DNF
	 */
	function getBestAvgIdx(idx, len) {
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
			var time = timeAt(i);
			if (time == -1) {
				cntDNF++;
				time_list[i - idx] = -1;
			} else {
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
			return [best, -1, -1, round(total / (len - cntDNF)), cntDNF];
		} else if (cntDNF <= trim && cntDNF != 0) {
			return [best, round(totaltrim / (len - 2 * trim)), -1, round(total / (len - cntDNF)), cntDNF];
		} else {
			return [best, round(totaltrim / (len - 2 * trim)), round(total / len), round(total / len), cntDNF];
		}
	}

	function pretty(time, showDNF) {
		switch (time[0]) {
		case 0: return kpretty(time[1]);
		case -1: return "DNF" + (showDNF ? ("(" + kpretty(time[1]) + ")") : "");
		default: return kpretty(time[0] + time[1]) + "+";
		}
	}

	function prettyMPA(time) { // multi phase append, e.g. "=XXX+XXX+XXX..."
		if (time.length == 2) {
			return ""
		}
		var ret = [];
		ret.push(kpretty(time[time.length - 1]));
		for (var j = time.length - 2; j >= 1; j--) {
			ret.push(kpretty(time[j] - time[j + 1]));
		}
		return "=" + ret.join("+");
	}

	var floatCfm = (function() {
		var floatDiv = $('<div />').addClass('popup').mouseleave(hideFloat);
		var cfmTime = $('<span style="font-size:1.2em"/>');
		var cfmOKR = $('<span class="click">').html("OK").click(procClk);
		var cfmP2R = $('<span class="click">').html("+2").click(procClk);
		var cfmDNFR = $('<span class="click">').html("DNF").click(procClk);
		var cfmTxtR = $('<input type="text">').css('width', '8em').change(procTxt);
		var cfmDelR = $('<input type="button">').val("X").click(procClk);
		var cfmIdx;
		var cfmIdxRow;

		var hideId;

		var button2time = {"OK": 0, "+2": 2000, "DNF": -1};

		function hideFloat() {
			if (cfmIdx != undefined && hideId == undefined) {
				procTxt();
			}
			if (hideId != undefined) {
				floatDiv.hide();
				hideId = undefined;
			} else {
				hideId = setTimeout(hideFloat, 100);
			}
		}

		function procTxt() {
			timesAt(cfmIdx) && (timesAt(cfmIdx)[2] = cfmTxtR.val());
			sessionManager.save(cfmIdx);
			getTimeRow(cfmIdx, curDim, cfmIdxRow);
		}

		function procClk(selected) {
			if (!$.isNumeric(selected)) {
				var value = $(this).val();
				if (value == 'X') {
					if (delIdx(cfmIdx)) {
						cfmIdx = undefined;
						hideFloat();
					}
					return;
				}
				selected = button2time[$(this).html()];
			}
			if (timesAt(cfmIdx)[0][0] != selected) {
				timesAt(cfmIdx)[0][0] = selected;
				times_stats.reset();
				sessionManager.save(cfmIdx);
				updateFrom(cfmIdx, cfmIdxRow);
				updateUtil();
			}
			getTimeRow(cfmIdx, curDim, cfmIdxRow);
			cfmTime.html(pretty(timesAt(cfmIdx)[0], true));
		}

		function procMouse(e) {
			var target = $(e.target)
			var prev = target.prevAll();
			var row = prev.length;
			var idx = ~~(row == 0 ? target : prev.eq(-1)).html().replace("*", "") - 1;
			if (row > 1 || !target.is('td')) {
				cfmIdx = undefined;
				hideFloat();
				return;
			}
			if (row == 0) {
				target = target.next();
			}
			cfmIdx = idx;
			cfmIdxRow = target.parent();
			var position = target.offset();
			position.left += target.outerWidth();
			position.top -= 30;
			var time = timesAt(cfmIdx);
			cfmTime.html(pretty(time[0], true));
			cfmTxtR.val(time[2]);
			switch (time[0][0]) {
			case 0: cfmOKR.prop("checked", true); break;
			case 2000: cfmP2R.prop("checked", true); break;
			case -1: cfmDNFR.prop("checked", true); break;
			}
			hideId && clearTimeout(hideId);
			hideId = undefined;
			floatDiv.show().offset(position);
		}

		$(function() {
			scrollDiv.mouseover(procMouse);
			floatDiv.appendTo('body').append(cfmTime, " ", cfmDelR, "<br>", cfmOKR, " | ", cfmP2R, " | ", cfmDNFR, "<br>" + STATS_COMMENT, cfmTxtR);
		});

		return {
			setCfm: function(value) {
				if (times.length == 0) {
					return;
				}
				hideFloat();
				cfmIdx = times.length - 1;
				cfmIdxRow = kernel.getProp('statinv') ? avgRow.prev() : title.next();
				procClk(value);
				cfmIdx = undefined;
			},
			hide: hideFloat
		}
	})();

	function showAll(e) {
		var len = (kernel.getProp('statinv') ? avgRow : showAllRow).index() - 2;
		var end = Math.max(0, times.length - len);
		var start = Math.max(0, times.length - len - MAX_ITEMS);

		var rows = [];
		for (var i = start; i < end; i++) {
			rows.push(getTimeRow(i, curDim));
		}
		if (kernel.getProp('statinv')) {
			showAllRow.after(rows.join(""));
		} else {
			showAllRow.before(rows.reverse().join(""));
		}
		if (start == 0) {
			showAllRow.unbind('click').hide();
		}
	}

	function hideAll() {
		var target = kernel.getProp('statinv') ? avgRow : showAllRow;
		for (var len = target.index() - 2; len > MAX_ITEMS; len--) {
			(kernel.getProp('statinv') ? showAllRow.next() : showAllRow.prev()).remove();
		}
		if (times.length > MAX_ITEMS) {
			showAllRow.unbind('click').click(showAll).show();
		}
	}

	function updateFrom(idx, idxRow) {
		for (var i = idx + 1; i < idx + Math.max(len1, len2) && i < times.length; i++) {
			idxRow = kernel.getProp('statinv') ? idxRow.next() : idxRow.prev();
			getTimeRow(i, curDim, idxRow);
		}
		updateAvgRow(curDim);
	}

	var curDim = 0;

	function procClick(e) {
		var target = $(e.target);
		if (!target.is('td') || target.html() == '-') {
			return;
		}
		var prev = target.prevAll();
		var row = prev.length;
		var idx = ~~(row == 0 ? target : prev.eq(-1)).html().replace("*", "") - 1;
		if (row > 4 || row < 0) {
			return;
		}
		switch (row) {
			case 0: setHighlight(idx, 1, 10, true); floatCfm.hide(); break;
			case 1: break;
			case 2: setHighlight(idx - len1 + 1, len1, len1 * 10, stat1 < 0); break;
			case 3: setHighlight(idx - len2 + 1, len2, len2 * 10, stat2 < 0); break;
		}
	}

	function getAvgSignal(i) {
		var st1 = getBestAvgIdx(i - len1 + 1, len1);
		var st2 = getBestAvgIdx(i - len2 + 1, len2);
		kernel.pushSignal('avg', [
			(stat1 > 0 ? 'ao' : 'mo') + len1 + ": " + (st1 ? kpretty(st1[stat1 > 0 ? 1 : 2]) : "-"),
			(stat2 > 0 ? 'ao' : 'mo') + len2 + ": " + (st2 ? kpretty(st2[stat2 > 0 ? 1 : 2]) : "-"),
			st1 ? [i - len1 + 1, len1, len1 * 10, stat1 < 0] : undefined,
			st2 ? [i - len2 + 1, len2, len2 * 10, stat2 < 0] : undefined,
			setHighlight
		]);
	}

	function getTimeRow(i, dim, tr) {
		var time = timesAt(i);
		var curTime = time[0];

		var ret = [];

		ret.push(
			'<td class="times">' + (time[2] && "*") + (i + 1) + '</td>' +
			'<td class="times">' + pretty(curTime, false) + '</td>'
		);

		var st1 = getBestAvgIdx(i - len1 + 1, len1);
		var st2 = getBestAvgIdx(i - len2 + 1, len2);
		ret.push(
			'<td' + (st1 ? ' class="times"' : "") + '>' + (st1 ? kpretty(st1[stat1 > 0 ? 1 : 2]) : "-") + '</td>' +
			'<td' + (st2 ? ' class="times"' : "") + '>' + (st2 ? kpretty(st2[stat2 > 0 ? 1 : 2]) : "-") + '</td>'
		);
		if (dim > 1) {
			ret.push('<td>' + kpretty(curTime[curTime.length - 1]) + '</td>');
			for (var j = curTime.length - 2; j >= 1; j--) {
				ret.push('<td>' + kpretty(curTime[j] - curTime[j + 1]) + '</td>');
			}
			for (var j = curTime.length - 1; j < dim; j++) {
				ret.push('<td>-</td>');
			}
		}
		ret = ret.join("");
		tr && tr.html(ret);
		return '<tr>' + ret + '</tr>';
	}

	function updateAvgRow(dim) {
		avgRow.empty().unbind("click").click(getStats);
		var len = times.length;
		var data = times_stats.getAllStats();
		avgRow.append('<th colspan="4">' + STATS_SOLVE + ': ' + (len - data[0]) + '/' + len + '<br>' +
			STATS_AVG + ': ' + kpretty(data[1]) + '</th>').css('font-size', '1.2em')
		if (dim > 1) {
			for (var j = 1; j <= dim; j++) {
				avgRow.append('<th>' + kpretty(getMean(j)) + '</th>').css('font-size', '');
			}
		}
	}

	function updateTable(scroll) {
		var dim = 1;
		for (var i = 0; i < times.length; i++) {
			dim = Math.max(dim, timesAt(i)[0].length - 1);
		}
		title.empty().append(
			'<th></th><th>' + STATS_TIME + '</th><th>' + (stat1 > 0 ? 'ao' : 'mo') + len1 + '</th><th>' + (stat2 > 0 ? 'ao' : 'mo') + len2 + '</th>'
		);
		if (dim > 1) {
			for (var i = 0; i < dim; i++) {
				title.append('<th>P.' + (i + 1) + '</th>');
			}
		}
		var rows = [];
		for (var i = Math.max(0, times.length - MAX_ITEMS), len = times.length; i < len; i++) {
			rows.push(getTimeRow(i, dim));
		}
		if (kernel.getProp('statinv')) {
			table.empty().append(title, showAllRow, rows.join(""), avgRow);
		} else {
			table.empty().append(avgRow, title, rows.reverse().join(""), showAllRow);
		}
		if (times.length > MAX_ITEMS) {
			showAllRow.unbind('click').click(showAll).show();
		} else {
			showAllRow.unbind('click').hide();
		}
		updateAvgRow(dim);
		curDim = dim;
		updateUtil();
		scrollDiv.scrollTop(kernel.getProp('statinv') ? table[0].scrollHeight : 0);
	}

	function updateSumTable() {
		if (!kernel.getProp('statsum')) {
			sumtable.empty();
			sumtableDiv.hide();
			resultsHeight();
			return;
		} else {
			sumtableDiv.css('display', 'inline-block');
		}
		times_stats.getAllStats();
		var s = [];
		s.push('<tr><th></th><th>' + hlstr[1] + '</th><th>' + hlstr[0] + '</th></tr>');
		s.push('<tr><th>time</th>');
		if (times.length > 0) {
			var idx = times.length - 1;
			s.push('<td class="times click" data="cs">' + kpretty(timeAt(idx)) + '</td>');
			s.push('<td class="times click" data="bs">' + kpretty(bestTime) + '</td></tr>');
		} else {
			s.push('<td><span>-</span></td>');
			s.push('<td><span>-</span></td></tr>');
		}
		for (var j = 0; j < avgSizes.length; j++) {
			var size = Math.abs(avgSizes[j]);
			if (times.length >= size) {
				s.push('<tr><th>' + 'am' [avgSizes[j] >>> 31] + 'o' + size + '</th>');
				s.push('<td class="times click" data="c' + 'am' [avgSizes[j] >>> 31] + j + '">' + kpretty(lastAvg[j][0]) + '</td>');
				s.push('<td class="times click" data="b' + 'am' [avgSizes[j] >>> 31] + j + '">' + kpretty(bestAvg[j][0]) + '</td></tr>');
			}
		}
		s = s.join("");
		sumtable.html(s);
		resultsHeight();
	}

	function updateUtil() {
		updateSumTable();
		assistant.update();
		distribution.update();
		trend.update();
		getAvgSignal(times.length - 1);
	}

	var avgSizes = [-3, 5, 12, 50, 100, 1000];
	var bestAvg = [];
	var lastAvg = [];
	var bestAvgIndex = [];
	var bestTime = -1;
	var bestTimeIndex = 0;
	var worstTime = -1;
	var worstTimeIndex = 0;

	var times_stats = (function() {
		var avgTrees = [];
		var n_dnf = [];
		var numdnf;
		var sessionsum;
		var shouldRecalc = true;

		function reset() {
			shouldRecalc = true;
		}

		function getAllStats() {
			if (shouldRecalc) {
				genStats();
				shouldRecalc = false;
			}
			return [numdnf, (numdnf == times.length) ? -1 : round(sessionsum / (times.length - numdnf))];
		}

		function genStats() {
			bestAvg = [];
			lastAvg = [];
			bestAvgIndex = [];
			avgTrees = [];
			n_dnf = [];
			bestTime = -1;
			bestTimeIndex = 0;
			worstTime = -1;
			worstTimeIndex = 0;
			numdnf = 0;
			sessionsum = 0;

			for (var j = 0; j < avgSizes.length; j++) {
				var size = Math.abs(avgSizes[j]);
				if (times.length < size) {
					break;
				}
				var trim = avgSizes[j] < 0 ? 0 : Math.ceil(size / 20);
				var rbt = sbtree.tree(dnfsort);
				n_dnf[j] = 0;
				for (var i = 0; i < size; i++) {
					var t = timeAt(i);
					rbt.insert(t, i);
					n_dnf[j] += t == -1;
				}
				var neff = size - 2 * trim;
				bestAvg[j] = n_dnf[j] > trim ? -1 : round((rbt.cumSum(size - trim) - rbt.cumSum(trim)) / neff);
				lastAvg[j] = bestAvg[j];
				bestAvgIndex[j] = 0;
				for (var i = size; i < times.length; i++) {
					var t = timeAt(i);
					var t0 = timeAt(i - size);
					rbt.remove(t0);
					rbt.insert(t, j);
					n_dnf[j] += (t == -1) - (t0 == -1);
					var curVal = n_dnf[j] > trim ? -1 : round((rbt.cumSum(size - trim) - rbt.cumSum(trim)) / neff);
					if (bestAvg[j] < 0 || (curVal != -1 && curVal < bestAvg[j])) {
						bestAvg[j] = curVal;
						bestAvgIndex[j] = i - size + 1;
					}
					lastAvg[j] = curVal;
				}
				bestAvg[j] = [bestAvg[j]];
				lastAvg[j] = [lastAvg[j]];
				avgTrees[j] = rbt;

				// console.log(avgTrees[j].root);
				// console.log(JSON.stringify(avgTrees[j].root).length);
			}
			for (var i = 0; i < times.length; i++) {
				var thisTime = timeAt(i);
				if (bestTime < 0 || (thisTime != -1 && thisTime < bestTime)) {
					bestTime = thisTime;
					bestTimeIndex = i;
				}
				if (thisTime > worstTime) {
					worstTime = thisTime;
					worstTimeIndex = i;
				}
				if (thisTime == -1) { numdnf++; } else { sessionsum += thisTime; }
			}
			return [numdnf, (numdnf == times.length) ? -1 : round(sessionsum / (times.length - numdnf))];
		}

		function push(val) {
			getAllStats(); // make sure all statistics are available, then update

			times.push(val);

			var i = times.length - 1;
			var t = timeAt(i);
			for (var j = 0; j < avgSizes.length; j++) {
				var size = Math.abs(avgSizes[j]);
				if (times.length < size) {
					break;
				}
				var trim = avgSizes[j] < 0 ? 0 : Math.ceil(size / 20);
				var neff = size - 2 * trim;
				var rbt = avgTrees[j] || sbtree.tree(dnfsort);
				n_dnf[j] = n_dnf[j] || 0;
				if (times.length == size) {
					for (var k = 0; k < size; k++) {
						var t0 = timeAt(k);
						rbt.insert(t0, k);
						n_dnf[j] += t0 == -1;
					}
					bestAvg[j] = [-1];
					lastAvg[j] = [];
				} else {
					var t0 = timeAt(i - size);
					rbt.remove(t0);
					rbt.insert(t, i);
					n_dnf[j] += t == -1;
					n_dnf[j] -= t0 == -1;
				}
				// if (rbt.root.count != size) {
				// 	console.log("ERROR");
				// }
				var curVal = n_dnf[j] > trim ? -1 : round((rbt.cumSum(size - trim) - rbt.cumSum(trim)) / neff);
				if (bestAvg[j][0] < 0 || (curVal != -1 && curVal < bestAvg[j][0])) {
					bestAvg[j][0] = curVal;
					bestAvgIndex[j] = i - size + 1;
				}
				lastAvg[j][0] = curVal;
				avgTrees[j] = rbt;
			}
			if (bestTime < 0 || (t != -1 && t < bestTime)) {
				bestTime = t;
				bestTimeIndex = i;
			}
			if (t > worstTime) {
				worstTime = t;
				worstTimeIndex = i;
			}
			if (t == -1) { numdnf++; } else { sessionsum += t; }
		}

		return {
			reset: reset,
			getAllStats: getAllStats,
			push: push
		}
	})();

	function setHighlight(start, nsolves, id, mean) {
		if (times.length == 0) return;
		var data = [0, [null], [null]];
		if (start + nsolves != 0) {
			if (mean) {
				data = runAvgMean(start, nsolves, 0, 0);
			} else {
				data = runAvgMean(start, nsolves);
			}
		}

		var now = new Date();
		var s = [hlstr[3]
			.replace("%Y", now.getFullYear())
			.replace("%M", now.getMonth() + 1)
			.replace("%D", now.getDate()) + "\n"];
		if (id > 1) {
			if (id == 2) {
				s.push(hlstr[8]); //"Session average";
			} else if (id == 10) {
				s.push(hlstr[5]);
			} else if (mean) {
				s.push(hlstr[6].replace("%mk", ~~(id / 10))); //"Mean of "+~~(id/10);
			} else {
				s.push(hlstr[7].replace("%mk", ~~(id / 10))); //"Average of "+~~(id/10);
			}
			s.push(": " + kpretty(data[0]));
		}

		s.push("\n\n" + hlstr[10] + "\n");
		for (var i = 0; i < nsolves; i++) {
			var time = timesAt(start + i);
			var c = pretty(time[0], true) + prettyMPA(time[0]) + (time[2] ? "[" + time[2] + "]" : "");
			if ($.inArray(i, data[2]) > -1 || $.inArray(i, data[3]) > -1) {
				c = "(" + c + ")";
			}
			if (kernel.getProp('printScr')) {
				c += "   " + time[1];
			}
			if (kernel.getProp('printDate')) {
				c += "   @" + (time[3] ? (new Date(time[3] * 1000).toLocaleString()) : 'N/A');
			}
			if (kernel.getProp('printScr') || kernel.getProp('printDate')) {
				s.push((i + 1) + ". " + c + " \n");
			} else {
				s.push(c + ", ")
			}
		}
		s = s.join("");
		s = s.substr(0, s.length - 2);
		stext.val(s);
		kernel.showDialog([stext, 0, undefined, 0, ['Export CSV', function() {
			exportCSV(start, nsolves);
			return false;
		}]], 'stats', STATS_CURROUND);
		stext[0].select();
	}

	function csvField(val) {
		if (val.indexOf(';') != -1) {
			val = '"' + val.replace(/"/g, '""') + '"';
		}
		return val;
	}

	function exportCSV(start, nsolves) {
		if (times.length == 0) return;
		if (!window.Blob) {
			alert('Do not support your browser!');
		}
		var s = ["No.;Time;Comment;Scramble;Date"];
		for (var i = 0; i < curDim; i++) {
			s[0] += ";P." + (i + 1);
		}
		for (var i = 0; i < nsolves; i++) {
			var time = timesAt(start + i);
			var line = [];
			line.push(i + 1);
			line.push(pretty(time[0], true));
			line.push(csvField(time[2] ? time[2] : ""));
			line.push(time[1]);
			line.push(time[3] ? (new Date(time[3] * 1000).toLocaleString()) : 'N/A');
			line.push(kpretty(time[0][time[0].length - 1]));
			for (var j = time[0].length - 2; j >= 1; j--) {
				line.push(kpretty(time[0][j] - time[0][j + 1]));
			}
			for (var j = time[0].length - 1; j < curDim; j++) {
				line.push('');
			}
			s.push(line.join(';'));
		}
		s = s.join("\r\n");
		var blob = new Blob([s], { 'type': 'text/csv' });
		var outFile = $('<a class="click"/>').appendTo('body');
		outFile.attr('href', URL.createObjectURL(blob));
		outFile.attr('download', 'csTimerExport.csv');
		outFile[0].click();
		outFile.remove();
	}

	function infoClick(e) {
		var which = $(e.target).attr('data');
		if (which == undefined) {
			return;
		}
		var idx = ~~(which.substr(2));
		switch (which.substr(0, 2)) {
		case 'bs': setHighlight(bestTimeIndex, 1, 10, true); break;
		case 'cs': setHighlight(times.length - 1, 1, 10, true); break;
		case 'bm': setHighlight(bestAvgIndex[idx], -avgSizes[idx], -avgSizes[idx] * 10, true); break;
		case 'cm': setHighlight(times.length + avgSizes[idx], -avgSizes[idx], -avgSizes[idx] * 10, true); break;
		case 'ba': setHighlight(bestAvgIndex[idx], avgSizes[idx], avgSizes[idx] * 10, false); break;
		case 'ca': setHighlight(times.length - avgSizes[idx], avgSizes[idx], avgSizes[idx] * 10, false); break;
		case 'tt': getStats(); break;
		}
	}

	var hlstr = STATS_STRING.split('|');

	var assistant = (function() {

		var infoDiv = $('<div />').css('text-align', 'center');

		function updateInfo() {
			if (!isEnable) {
				return;
			}
			var theStats = times_stats.getAllStats();
			var numdnf = theStats[0];
			var sessionmean = theStats[1];

			var s = [];
			s.push('<span class="click" data="tt">' + hlstr[4].replace("%d", (times.length - numdnf) + "/" + times.length) + ', ' + hlstr[9].replace("%v", kpretty(sessionmean)) + '</span>\n');
			s.push(hlstr[0] + ": " + kpretty(bestTime));
			s.push(' | ' + hlstr[2] + ": " + kpretty(worstTime) + "\n");
			var hasTable = false;
			var tableHead = '<table class="table"><tr><td></td><td>' + hlstr[1] + '</td><td>' + hlstr[0] + '</td></tr>';
			for (var j = 0; j < avgSizes.length; j++) {
				var size = Math.abs(avgSizes[j]);
				if (times.length >= size) {
					if (bestAvg[j].length < 2) {
						lastAvg[j] = runAvgMean(times.length - size, size, 0, avgSizes[j] < 0 ? 0 : undefined);
						bestAvg[j] = runAvgMean(bestAvgIndex[j], size, 0, avgSizes[j] < 0 ? 0 : undefined);
					}
					hasTable || (hasTable = true, s.push(tableHead));
					s.push('<tr><td>' + hlstr[7 - (avgSizes[j] >>> 31)].replace("%mk", size));
					s.push('<td><span class="click" data="c' + 'am' [avgSizes[j] >>> 31] + j + '">' + kpretty(lastAvg[j][0]) + " (σ=" + trim(lastAvg[j][1], 2) +
						')</span></td>');
					s.push('<td><span class="click" data="b' + 'am' [avgSizes[j] >>> 31] + j + '">' + kpretty(bestAvg[j][0]) + " (σ=" + trim(bestAvg[j][1], 2) +
						')</span></td></tr>');
				}
			}
			hasTable && s.push('</table>');
			s = s.join("");
			infoDiv.html(s.replace(/\n/g, '<br>'));
		}

		var isEnable = false;

		function execFunc(fdiv, signal) {
			if (!(isEnable = (fdiv != undefined))) {
				return;
			}
			if (/^scr/.exec(signal)) {
				return;
			}
			fdiv.empty().append(infoDiv.unbind('click').click(infoClick));
			updateInfo();
		}

		$(function() {
			if (typeof tools != "undefined") {
				tools.regTool('stats', TOOLS_STATS, execFunc);
			}
		});

		return {
			update: updateInfo
		}

	})();

	function getMinMaxInt() {
		var diffValues = [100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000];
		var max = 0,
			min = 0x7fffffff,
			n_solve = 0,
			diff;
		for (var i = 0; i < times.length; i++) {
			if (timeAt(i) != -1) {
				var value = timeAt(i);
				max = Math.max(value, max);
				min = Math.min(value, min);
				n_solve++;
			}
		}
		if (n_solve == 0) {
			return null;
		}
		if (kernel.getProp('disPrec') == 'a') {
			diff = (max - min) / 10;
			for (var i = 0; i < diffValues.length; i++) {
				if (diff < diffValues[i]) {
					diff = diffValues[i];
					break;
				}
			}
		} else {
			diff = diffValues[kernel.getProp('disPrec')];
		}
		return [max, min, diff];
	}

	function timeAt(idx) {
		return (times[idx][0][0] == -1) ? -1 : (~~((times[idx][0][0] + times[idx][0][1]) / roundMilli)) * roundMilli;
	}

	function timesAt(idx) {
		return times[idx];
	}

	var distribution = (function() {
		var div = $('<div />');

		var isEnable = false;

		var diffValues = [100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000];

		function updateDistribution() {
			if (!isEnable) {
				return;
			}
			div.empty();

			var data = getMinMaxInt();

			if (!data) {
				return;
			}

			var max = data[0],
				min = data[1],
				diff = data[2];

			var dis = {};

			var cntmax = 0;

			for (var i = 0; i < times.length; i++) {
				var value = timeAt(i);
				if (value != -1) {
					var cur = ~~(value / diff);
					dis[cur] = (dis[cur] || 0) + 1;
					cntmax = Math.max(dis[cur], cntmax);
				}
			}

			var str = [];
			var pattern = diff >= 1000 ? /[^\.]+(?=\.)/ : /[^\.]+\.[\d]/;
			var lablen = kpretty(~~(max / diff) * diff).match(pattern)[0].length;
			for (var i = ~~(min / diff); i <= ~~(max / diff); i++) {
				var label = kpretty(i * diff).match(pattern)[0];
				var len = label.length;
				for (var j = 0; j < lablen - len; j++) {
					label = "&nbsp;" + label;
				}
				str.push(label + "+: " + '<span class="cntbar" style="width: ' + (dis[i] || 0) / cntmax * 10 + 'em;">' + (dis[i] || 0) + "</span>");
			}
			div.html(str.join("<br>"));
		}

		function execFunc(fdiv, signal) {
			if (!(isEnable = (fdiv != undefined))) {
				return;
			}
			if (/^scr/.exec(signal)) {
				return;
			}
			fdiv.empty().append(div);
			updateDistribution();
		}

		$(function() {
			if (typeof tools != "undefined") {
				kernel.regListener('distribution', 'property', function(signal, value) {
					if (value[0] == 'disPrec') {
						updateDistribution();
					}
				}, /^disPrec$/);
				kernel.regProp('tools', 'disPrec', 1, STATS_PREC, ['a', ['a', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9], STATS_PREC_STR.split('|')]);
				tools.regTool('distribution', TOOLS_DISTRIBUTION, execFunc);
			}
		});

		return {
			update: updateDistribution
		}
	})();

	var trend = (function() {
		var canvas = $('<canvas />'), ctx;

		var isEnable = false;

		var offx = 35,
			offy = 25;
		var width, height;

		function updateTrend() {
			if (!isEnable) {
				return;
			}
			if (!canvas[0].getContext) {
				return;
			}
			ctx = canvas[0].getContext('2d');
			var imgSize = kernel.getProp('imgSize') / 10;
			width = 50;
			canvas.width(10 * imgSize * 1.2 + 'em');
			canvas.height(5 * imgSize * 1.2 + 'em');

			canvas.attr('width', 10 * width + 1);
			canvas.attr('height', 5 * width + 5);

			height = 5 * width;
			width = 10 * width;

			ctx.lineWidth = 2;

			ctx.font = '12pt Arial';
			ctx.fillText("time", 50, 13);
			ctx.strokeStyle = '#888'; ctx.beginPath(); ctx.moveTo(90, 7); ctx.lineTo(150, 7); ctx.stroke();
			ctx.fillText((stat1 > 0 ? "ao" : "mo") + len1, 200, 13);
			ctx.strokeStyle = '#f00'; ctx.beginPath(); ctx.moveTo(240, 7); ctx.lineTo(300, 7); ctx.stroke();
			ctx.fillText((stat2 > 0 ? "ao" : "mo") + len2, 350, 13);
			ctx.strokeStyle = '#00f'; ctx.beginPath(); ctx.moveTo(390, 7); ctx.lineTo(450, 7); ctx.stroke();

			var data = getMinMaxInt();
			if (!data) {
				return;
			}

			var diff = data[2];
			var plotmax = Math.ceil(data[0] / diff) * diff;
			var plotmin = ~~(data[1] / diff) * diff;
			var ploth = plotmax - plotmin;
			var pattern = diff >= 1000 ? /[^\.]+(?=\.)/ : /[^\.]+\.[\d]/;

			fill([0, 1, 1, 0, 0], [0, 0, 1, 1, 0], '#fff');

			ctx.fillStyle = '#000';
			ctx.strokeStyle = '#ccc';
			ctx.lineWidth = 1;
			ctx.textAlign = 'right';
			for (var i = plotmin; i <= plotmax; i += diff) {
				plot([0, 1], [(i - plotmin) / ploth, (i - plotmin) / ploth], '#ccc');

				var label = kpretty(i).match(pattern)[0];
				ctx.fillText(label, offx - 5, (plotmax - i) / ploth * (height - offy) + offy + 5);
			}

			ctx.lineWidth = 2;
			var x, y;
			if (times.length > 1) {
				x = []; y = [];
				for (var i = 0; i < times.length; i++) {
					var t = timeAt(i);
					if (t != -1) {
						x.push(i / (times.length - 1));
						y.push(Math.max(0, Math.min(1, (t - plotmin) / ploth)));
					}
				}
				plot(x, y, '#888');
			}
			if (times.length > len1) {
				x = []; y = [];
				var ao5 = runAvgMean(0, times.length, len1, stat1 > 0 ? undefined : 0)[0];
				for (var i = 0; i < ao5.length; i++) {
					if (ao5[i] != -1) {
						x.push((i + len1 - 1) / (times.length - 1));
						y.push(Math.max(0, Math.min(1, (ao5[i] - plotmin) / ploth)));
					}
				}
				plot(x, y, '#f00');
			}
			if (times.length > len2) {
				x = []; y = [];
				var ao12 = runAvgMean(0, times.length, len2, stat2 > 0 ? undefined : 0)[0];
				for (var i = 0; i < ao12.length; i++) {
					if (ao12[i] != -1) {
						x.push((i + len2 - 1) / (times.length - 1));
						y.push(Math.max(0, Math.min(1, (ao12[i] - plotmin) / ploth)));
					}
				}
				plot(x, y, '#00f');
			}

			plot([0, 1, 1, 0, 0], [0, 0, 1, 1, 0], '#000');
		}

		function plot(x, y, color) {
			ctx.strokeStyle = color;
			ctx.beginPath();
			ctx.moveTo(x[0] * (width - offx) + offx, (1 - y[0]) * (height - offy) + offy);
			for (var i = 1; i < x.length; i++) {
				ctx.lineTo(x[i] * (width - offx) + offx, (1 - y[i]) * (height - offy) + offy);
			}
			ctx.stroke();
			ctx.closePath();
		}

		function fill(x, y, color) {
			ctx.fillStyle = color;
			ctx.beginPath();
			ctx.moveTo(x[0] * (width - offx) + offx, (1 - y[0]) * (height - offy) + offy);
			for (var i = 1; i < x.length; i++) {
				ctx.lineTo(x[i] * (width - offx) + offx, (1 - y[i]) * (height - offy) + offy);
			}
			ctx.fill();
			ctx.closePath();
		}

		function execFunc(fdiv, signal) {
			if (!(isEnable = (fdiv != undefined))) {
				return;
			}
			if (/^scr/.exec(signal)) {
				return;
			}
			fdiv.empty().append(canvas);
			updateTrend();
		}

		$(function() {
			if (typeof tools != "undefined") {
				kernel.regListener('trend', 'property', function(signal, value) {
					if (value[0] == 'disPrec') {
						updateTrend();
					}
				}, /^disPrec$/);
				if (canvas[0].getContext) {
					tools.regTool('trend', TOOLS_TREND, execFunc);;
				}
			}
		});

		return {
			update: updateTrend
		}
	})();


	var sessionManager = (function() {

		var sessionIdxMax = 15;
		var sessionIdxMin = 1;
		var sessionIdx = -1;

		var ssmgrDiv = $('<div />');
		var ssmgrTable = $('<table />').appendTo(ssmgrDiv).addClass('table ssmgr');

		var newSessionOption = $('<option />').val('new').html('New..');
		var delSessionOption = $('<option />').val('del').html('Delete..');
		var sessionData;
		var ssSorted;

		var select = $('<select />').change(function() {
			kernel.blur();
			if (select.val() == 'new') {
				createSession();
			} else if (select.val() == 'del') {
				if (!deleteSession(sessionIdx)) {
					select.val(sessionIdx);
				}
				return;
			} else {
				sessionIdx = ~~select.val();
			}
			loadSession(sessionIdx);
		});

		function loadSession(ssidx) {
			sessionIdx = ssidx;
			kernel.setProp('session', sessionIdx);
			load();
			var curSessionData = sessionData[sessionIdx];
			if (kernel.getProp('ss2scr')) {
				kernel.setProp('scrType', curSessionData['scr']);
			}
			if (kernel.getProp('ss2phases')) {
				kernel.setProp('phases', curSessionData['phases']);
			}
			select.val(sessionIdx);
		}

		function genSelect() {
			select.empty();
			for (var i = 1; i <= sessionIdxMax; i++) {
				if (sessionData[i] == undefined) {
					sessionData[i] = {
						'name': i,
						'scr': '333',
						'phases': 1,
						'rank': i
					};
				}
			}
			fixRank();
			for (var i = 0; i < ssSorted.length; i++) {
				select.append($('<option />').val(ssSorted[i]).html(sessionData[ssSorted[i]]['name']));
			}
			select.append(newSessionOption, delSessionOption);
			select.val(sessionIdx);
		}

		function fixRank() {
			ssSorted = [];
			for (var i = sessionIdxMin; i <= sessionIdxMax; i++) {
				ssSorted.push(i);
			}
			ssSorted.sort(function(a, b) {
				return sessionData[a]['rank'] - sessionData[b]['rank']
			});
			for (var i = 0; i < ssSorted.length; i++) {
				sessionData[ssSorted[i]]['rank'] = i + 1;
			}
			kernel.setProp('sessionData', JSON.stringify(sessionData));
		}

		function createSession(rank) {
			if (rank == undefined) {
				rank = sessionIdxMax;
			}
			sessionIdx = ++sessionIdxMax;
			var curDate = new Date();
			var newName = (curDate.getMonth() + 1) + "." + curDate.getDate() + ' ' + curScrType;

			kernel.setProp('sessionN', sessionIdxMax);
			sessionData[sessionIdx] = {
				'name': newName,
				'scr': curScrType,
				'phases': 1,
				'rank': rank + 0.5
			};
			fixRank();
			times = [];
			save();
			genSelect();
			loadSession(sessionIdx);

			if (kernel.getProp('imrename')) {
				renameSession();
			}
		}

		function deleteSession(ssidx) {
			if (!confirm(STATS_CFM_DELSS)) {
				return false;
			}
			// if not the last session, then swap to last session
			if (ssidx != sessionIdxMax) {
				sessionData[ssidx] = sessionData[sessionIdxMax];
			}
			delete sessionData[sessionIdxMax];
			storage.del(ssidx, sessionIdxMax);

			sessionIdxMax--;
			kernel.setProp('sessionN', sessionIdxMax);
			kernel.setProp('sessionData', JSON.stringify(sessionData));
			if (sessionIdxMax == 0) {
				createSession();
			} else if (sessionIdx == ssidx) {
				kernel.setProp('session', 1);
			} else if (sessionIdx == sessionIdxMax + 1) {
				select.val(ssidx);
				select.change();
			}
			return true;
		}

		function renameSession(ssidx) {
			if (ssidx === undefined) {
				ssidx = sessionIdx;
			}
			var sName = prompt(STATS_SESSION_NAME, sessionData[ssidx]['name']);
			if (sName != null) {
				sName = $('<div/>').text(sName).html();
				sessionData[ssidx]['name'] = sName;
				kernel.setProp('sessionData', JSON.stringify(sessionData));
			}
		}

		function load() {
			storage.get(sessionIdx, function(timesNew) {
				times = timesNew;
				times_stats.reset();
				updateTable(false);
				sessionData[sessionIdx]['stat'] = [times.length].concat(times_stats.getAllStats());
				kernel.setProp('sessionData', JSON.stringify(sessionData));
			})
		}

		function save(startIdx) {
			sessionData[sessionIdx]['stat'] = [times.length].concat(times_stats.getAllStats());
			kernel.setProp('sessionData', JSON.stringify(sessionData));
			storage.set(sessionIdx, times, undefined, startIdx);
		}

		function mgrClick(e) {
			var target = $(e.target);
			if (!target.is('td') || !target.hasClass('click')) {
				return;
			}
			var rank = ~~target.prevAll().eq(-1).html();
			var idx = ssSorted[rank - 1];
			switch (target.attr('data')) {
				case 'r':
					renameSession(idx);
					break;
				case 'u':
					if (rank != 1) {
						sessionData[idx]['rank']--;
						sessionData[ssSorted[rank - 2]]['rank']++;
						kernel.setProp('sessionData', JSON.stringify(sessionData));
					}
					break;
				case 'd': //swap
					if (rank != ssSorted.length) {
						sessionData[idx]['rank']++;
						sessionData[ssSorted[rank]]['rank']--;
						kernel.setProp('sessionData', JSON.stringify(sessionData));
					}
					break;
				case 's':
					loadSession(idx);
					break;
				case '+':
					createSession(rank);
					break;
				case 'x': //delete session
					deleteSession(idx);
					break;
			}
			genSelect();
			genMgrTable();
		}

		function genMgrTable() {
			fixRank();
			ssmgrTable.empty().append('<tr><th></th><th>' +
				STATS_SSMGR_NAME + '</th><th>' +
				STATS_SSMGR_DETAIL + '</th><th colspan=5>' +
				STATS_SSMGR_OP + '</th></tr>');
			for (var i = 0; i < ssSorted.length; i++) {
				var ssData = sessionData[ssSorted[i]];
				var ssStat = '';
				if ('stat' in ssData) {
					var s = ssData['stat'];
					ssStat = STATS_SOLVE + ': ' + (s[0] - s[1]) + '/' + s[0] + ' ' + STATS_AVG + ': ' + kpretty(s[2]) + ' &nbsp; ';
				}
				ssmgrTable.append('<tr><td>' + (i + 1) + '</td>' +
					'<td class="click" data="s">' + ssData['name'] + '</td>' +
					'<td>' + ssStat + scramble.getTypeName(ssData['scr']) + ' &nbsp; ' + ssData['phases'] + ' phase(s)</td>' +
					'<td class="click" data="u">&#8593;</td>' +
					'<td class="click" data="d">&#8595;</td>' +
					'<td class="click" data="r">&#9997;</td>' +
					'<td class="click" data="+">+</td>' +
					'<td class="click" data="x">X</td>' + '</tr>');
			}
			ssmgrTable.unbind('click').click(mgrClick);
		}

		function showMgrTable() {
			genMgrTable();
			kernel.showDialog([ssmgrDiv, 0, undefined, 0], 'stats', STATS_SSMGR_TITLE);
		}

		function procSignal(signal, value) {
			if (signal == 'property') {
				if (value[0] == 'session' && ~~value[1] != sessionIdx) {
					select.val(value[1]);
					select.change();
				} else if (value[0] == 'sessionData') {
					sessionData = JSON.parse(value[1]);
					genSelect();
				} else if (value[0] == 'scrType' || value[0] == 'phases') {
					curScrType = value[1];
					if (value[0] == 'scrType') {
						if (sessionData[sessionIdx]['scr'] != value[1] && kernel.getProp('scr2ss')) {
							createSession();
						} else {
							sessionData[sessionIdx]['scr'] = value[1];
						}
					} else if (value[0] == 'phases') {
						sessionData[sessionIdx]['phases'] = value[1];
					}
					kernel.setProp('sessionData', JSON.stringify(sessionData));
				}
			} else if (signal == 'ctrl' && value[0] == 'stats') {
				var rank = sessionData[sessionIdx]['rank'];
				if (value[1] == '+' && rank < sessionIdxMax) {
					kernel.setProp('session', ssSorted[rank]);
				} else if (value[1] == '-' && rank > sessionIdxMin) {
					kernel.setProp('session', ssSorted[rank - 2]);
				}
			}
		}

		$(function() {
			kernel.regListener('ssmgr', 'property', procSignal, /^(:?session(:?Data)?|scrType|phases)$/);
			kernel.regListener('ssmgr', 'ctrl', procSignal, /^stats$/);

			sessionIdxMax = kernel.getProp('sessionN', 15);
			sessionData = JSON.parse(kernel.getProp('sessionData', '{}'));
			for (var i = 1; i <= sessionIdxMax; i++) {
				sessionData[i] = sessionData[i] || {
					'name': (JSON.parse(kernel.getProp('sessionName') || '{}'))[i] || i,
					'scr': (JSON.parse(kernel.getProp('sessionScr') || '{}'))[i] || '333',
					'phases': 1,
					'rank': i
				};
				sessionData[i]['rank'] = sessionData[i]['rank'] || i;
			}
			kernel.setProp('sessionData', JSON.stringify(sessionData));
			genSelect();
			kernel.getProp('session', 1);
		});

		return {
			getSelect: function() {
				return select;
			},
			showMgrTable: showMgrTable,
			genSelect: genSelect,
			load: load,
			save: save
		}

	})();


	function getStats() {
		var theStats = times_stats.getAllStats();
		var numdnf = theStats[0];
		var sessionavg = runAvgMean(0, times.length);
		var sessionmean = theStats[1];
		var length = times.length;

		var now = new Date();
		var s = [hlstr[3]
			.replace("%Y", now.getFullYear())
			.replace("%M", now.getMonth() + 1)
			.replace("%D", now.getDate())
		];
		s.push(hlstr[4].replace("%d", (length - numdnf) + "/" + length) + '\n');
		s.push(hlstr[5]);
		s.push('    ' + hlstr[0] + ": " + kpretty(bestTime));
		s.push('    ' + hlstr[2] + ": " + kpretty(worstTime) + "\n");
		for (var j = 0; j < avgSizes.length; j++) {
			var size = Math.abs(avgSizes[j]);
			if (length >= size) {
				if (bestAvg[j].length < 2) {
					lastAvg[j] = runAvgMean(times.length - size, size, 0, avgSizes[j] < 0 ? 0 : undefined);
					bestAvg[j] = runAvgMean(bestAvgIndex[j], size, 0, avgSizes[j] < 0 ? 0 : undefined);
				}
				s.push(hlstr[7 - (avgSizes[j] >>> 31)].replace("%mk", size));
				s.push('    ' + hlstr[1] + ": " + kpretty(lastAvg[j][0]) + " (σ = " + trim(lastAvg[j][1], 2) + ")");
				s.push('    ' + hlstr[0] + ": " + kpretty(bestAvg[j][0]) + " (σ = " + trim(bestAvg[j][1], 2) + ")\n");
			}
		}

		s.push(hlstr[8].replace("%v", kpretty(sessionavg[0])).replace("%sgm", trim(sessionavg[1], 2)).replace(/[{}]/g, ""));
		s.push(hlstr[9].replace("%v", kpretty(sessionmean) + '\n'));

		if (length != 0) {
			s.push(hlstr[10]);
			var timeStr = [];
			for (var i = 0; i < length; i++) {
				var time = timesAt(i);
				var c = pretty(time[0], true) + prettyMPA(time[0]) + (time[2] ? "[" + time[2] + "]" : "");
				if (kernel.getProp('printScr')) {
					c += "   " + time[1];
				}
				if (kernel.getProp('printDate')) {
					c += "   @" + (time[3] ? (new Date(time[3] * 1000).toLocaleString()) : 'N/A');
				}
				if (kernel.getProp('printScr') || kernel.getProp('printDate')) {
					timeStr.push((i + 1) + ". " + c + " \n");
				} else {
					timeStr.push(c + ", ")
				}
			}
			timeStr = timeStr.join("");
			timeStr = timeStr.substr(0, timeStr.length - 2);
			s.push(timeStr);
		}
		s = s.join("\n");
		stext.val(s);
		kernel.showDialog([stext, 0, undefined, 0, ['Export CSV', function() {
			exportCSV(0, length);
			return false;
		}]], 'stats', STATS_CURSESSION);
		stext[0].select();
	}

	function dnfsort(a, b) {
		if (a < 0) return 1;
		if (b < 0) return -1;
		return a - b;
	}

	//ret length: length - nsolves + 1
	function runAvgMean(start, length, nsolves, trim, onlyavg) {
		nsolves = nsolves || length;
		if (trim === undefined) {
			trim = Math.ceil(nsolves / 20);
		}
		if (nsolves - trim <= 0) {
			return [-1, 0, [], []];
		}
		var rbt = sbtree.tree(dnfsort);
		var n_dnf = 0;
		for (var j = 0; j < nsolves; j++) {
			var t = timeAt(start + j);
			rbt.insert(t, j);
			n_dnf += t == -1;
		}
		var neff = nsolves - 2 * trim;
		var retAvg = [n_dnf > trim ? -1 : round((rbt.cumSum(nsolves - trim) - rbt.cumSum(trim)) / neff)];
		var start0 = start - nsolves;
		for (var i = nsolves; i < length; i++) {
			var t = timeAt(start + i);
			var t0 = timeAt(start0 + i);
			rbt.remove(t0);
			rbt.insert(t, j);
			n_dnf += t == -1;
			n_dnf -= t0 == -1;
			retAvg.push(n_dnf > trim ? -1 : round((rbt.cumSum(nsolves - trim) - rbt.cumSum(trim)) / neff));
		}
		var mintList = [];
		var maxtList = [];
		var variance = 0;
		if (!onlyavg && length == nsolves) {
			retAvg = retAvg[0];
			var timeArr = [];
			for (var j = 0; j < nsolves; j++) {
				var t = timeAt(start + j);
				timeArr.push(t);
				n_dnf += t == -1;
			}
			if (trim != 0) {
				rbt.traverse(function(node) {
					timeArr[node.v] = 0;
					return mintList.push(node.v) < trim;
				}, false);
				rbt.traverse(function(node) {
					timeArr[node.v] = 0;
					return maxtList.push(node.v) < trim;
				}, true);
			}
			for (var j = 0; j < nsolves; j++) {
				variance += Math.pow(timeArr[j], 2);
			}
			var avg = (rbt.cumSum(nsolves - trim) - rbt.cumSum(trim));
			variance = Math.sqrt((variance - avg * avg / neff) / (neff - 1)) / 1000;
		}
		return [retAvg, variance, mintList, maxtList];
	}

	function trim(number, nDigits) {
		if (!number || number == Number.POSITIVE_INFINITY || number == Number.NEGATIVE_INFINITY) number = 0;
		var power = Math.pow(10, nDigits);
		var trimmed = "" + Math.round(number * power);
		while (trimmed.length < nDigits + 1) {
			trimmed = "0" + trimmed;
		}
		var len = trimmed.length;
		return trimmed.substr(0, len - nDigits) + "." + trimmed.substr(len - nDigits, nDigits);
	}

	function loadAllSizes(val) {
		val = val.split(/[\s,;]+/);
		var sizere = /([am])o(\d+)/;
		var avgSizesNew = [];
		for (var i = 0; i < val.length; i++) {
			var m = sizere.exec(val[i])
			if (!m) {
				return false;
			}
			avgSizesNew.push((m[1] == 'a' ? 1 : -1) * ~~m[2]);
		}
		avgSizesNew.sort(function(a, b) { return Math.abs(a) - Math.abs(b) });
		avgSizes = avgSizesNew;
		times_stats.reset();
		return true;
	}

	var curScramble = "";

	var stat1, stat2, len1, len2;

	var curScrType = '333';
	var curPhases = 1;

	var roundMilli = 1;

	function procSignal(signal, value) {
		if (signal == 'time') {
			push(value);
		} else if (signal == 'scramble') {
			curScramble = value[1];
		} else if (signal == 'property') {
			if (/^(:?useMilli|timeFormat|stat[12][tl]|statinv)$/.exec(value[0])) {
				roundMilli = kernel.getProp('useMilli') ? 1 : 10;
				stat1 = [1, -1][~~kernel.getProp('stat1t')] * kernel.getProp('stat1l');
				stat2 = [1, -1][~~kernel.getProp('stat2t')] * kernel.getProp('stat2l');
				len1 = Math.abs(stat1);
				len2 = Math.abs(stat2);
				updateTable(false);
			} else if (value[0] == 'statsum') {
				updateSumTable();
			} else if (value[0] == 'statal') {
				var statal = value[1];
				if (statal == 'u') {
					if (value[2] == 'modify') {
						var input = prompt('Statistics Details', 'mo3 ao5 ao12 ao100');
						if (/([am]o\d+[\s,;]*)+/.exec(input)) {
							kernel.setProp('statalu', input);
							statal = input;
						} else {
							if (input != null) {
								alert('INVALID VALUES!');
							}
							kernel.setProp('statal', 'mo3 ao5 ao12 ao100');
							kernel.reprop();
						}
					} else {
						statal = kernel.getProp('statalu');
					}
				}
				loadAllSizes(statal);
				updateUtil();
			} else if (value[0] == 'view') {
				resultsHeight();
			}
		} else if (signal == 'ctrl' && value[0] == 'stats') {
			if (value[1] == 'clr') {
				reset();
			} else if (value[1] == 'undo') {
				if (times.length != 0) {
					delIdx(times.length - 1);
				}
			} else if (value[1] == 'OK') {
				floatCfm.setCfm(0);
			} else if (value[1] == '+2') {
				floatCfm.setCfm(2000);
			} else if (value[1] == 'DNF') {
				floatCfm.setCfm(-1);
			}
		} else if (signal == 'ashow' && !value) {
			hideAll();
		} else if (signal == 'button' && value[0] == 'stats' && value[1]) {
			setTimeout(resultsHeight, 50);
		}
	}

	function resultsHeight() {
		if ($('html').hasClass('m')) {
			scrollDiv.height(Math.max(sumtableDiv.height(), avgRow.height() + title.height() * 2));
		} else if (scrollDiv[0].offsetParent != null) {
			scrollDiv.outerHeight(~~(div.height() - sessionManager.getSelect().parent().outerHeight() - sumtableDiv.outerHeight() - 5));
		}
	}

	$(function() {
		kernel.regListener('stats', 'time', procSignal);
		kernel.regListener('stats', 'scramble', procSignal);
		kernel.regListener('stats', 'property', procSignal, /^(:?useMilli|timeFormat|stat(:?sum|[12][tl]|al|inv)|session(:?Data)?|scrType|phases|view)$/);
		kernel.regListener('stats', 'ctrl', procSignal, /^stats$/);
		kernel.regListener('stats', 'ashow', procSignal);
		kernel.regListener('stats', 'button', procSignal);

		kernel.regProp('stats', 'statsum', 0, PROPERTY_SUMMARY, [true]);
		kernel.regProp('stats', 'printScr', 0, PROPERTY_PRINTSCR, [true]);
		kernel.regProp('stats', 'printDate', 0, PROPERTY_PRINTDATE, [false]);
		kernel.regProp('stats', 'imrename', 0, PROPERTY_IMRENAME, [false]);
		kernel.regProp('stats', 'scr2ss', 0, PROPERTY_SCR2SS, [false]);
		kernel.regProp('stats', 'ss2scr', 0, PROPERTY_SS2SCR, [true]);
		kernel.regProp('stats', 'ss2phases', 0, PROPERTY_SS2PHASES, [true]);
		kernel.regProp('stats', 'statinv', 0, PROPERTY_STATINV, [false]);

		div.appendTo('body').append(
			$('<div>').append(
				$('<span class="click" />').html(STATS_SESSION).click(sessionManager.showMgrTable),
				sessionManager.getSelect(), $('<input type="button">').val('X').click(reset)),
			sumtableDiv.append(sumtable),
			scrollDiv.append(table));
		$(window).bind('resize', resultsHeight);
		table.append(title, avgRow);
		kernel.addWindow('stats', BUTTON_TIME_LIST, div, true, true, 4);
		scrollDiv.bind('scroll', function() {
			var elem = scrollDiv[0];
			if (elem.scrollHeight - elem.scrollTop < elem.clientHeight + 5 && !kernel.getProp('statinv')) {
				showAllRow.click();
			}
		});

		var stattl = STATS_TYPELEN.split('|');
		kernel.regProp('stats', 'stat1t', 1, stattl[0].replace('%d', 1), [0, [0, 1], stattl.slice(2)]);
		kernel.regProp('stats', 'stat1l', 2, stattl[1].replace('%d', 1), [5, 3, 1000]);
		kernel.regProp('stats', 'stat2t', 1, stattl[0].replace('%d', 2), [0, [0, 1], stattl.slice(2)]);
		kernel.regProp('stats', 'stat2l', 2, stattl[1].replace('%d', 2), [12, 3, 1000]);
		kernel.regProp('stats', 'statal', 1, PROPERTY_STATAL, ['mo3 ao5 ao12 ao100', ['mo3 ao5 ao12 ao100', 'mo3 ao5 ao12 ao25 ao50 ao100', 'mo3 ao5 ao12 ao25 ao50 ao100 ao200 ao500 ao1000 ao2000 ao5000 ao10000', 'u'],
			['mo3 ao5 ao12 ao100', 'mo3 ao5 ao12 ao25 ao50 ao100', 'mo3 ao5 ao12 ao25 ao50 ao100 ao200 ao500 ao1000 ao2000 ao5000 ao10000', 'Custom']
		]);
		kernel.regProp('stats', 'delmul', 0, PROPERTY_DELMUL, [true]);
	});
})(kernel.pretty, kernel.round);