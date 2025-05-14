"use strict";

var stats = execMain(function(kpretty, round, kpround) {
	//[[penalty, phaseN end time, phaseN-1 end time, ..., phase1 end time], scramble, comment, timestamp of start, extension]
	var times = [];
	var div = $('<div id="stats">');
	var stext = $('<textarea rows="10" readonly>');
	var scrollDiv = $('<div class="myscroll">');
	var statOptDiv = $('<div>');

	var table = $('<table>').click(procClick).addClass("table");
	var title = $('<tr>');

	var avgRow = $('<tr>');
	var showAllRow = $('<tr class="click" ><th class="click" colspan="15">...</th></tr>');

	var sumtable = $('<table class="sumtable">').click(function(e) {
		infoClick(times_stats_table, timesAt, e);
	}).addClass("table");
	var sumtableDiv = $('<div class="statc">');

	var MAX_ITEMS = 50;

	var isInit = true;

	function push(time) {
		if (typeof time[0] == "string") {
			var val = [time[2], time[1] || curScramble, time[0], time[3] || Math.round((new Date().getTime() - time[2][1]) / 1000)];
			if (time[4]) {
				val.push(time[4]);
			}
			times.push(val);
			time = time[2];
		} else {
			times.push([time, curScramble, "", Math.round((new Date().getTime() - time[1]) / 1000)]);
		}
		timesExtra.push(null);
		times_stats_table.pushed();
		times_stats_list.pushed();
		sessionManager.save(times.length - 1);
		if (time.length - 1 > curDim) {
			table_ctrl.updateTable(false);
		} else {
			table_ctrl.appendRow(times.length - 1);
		}
		updateUtil(['push']);
		kernel.pushSignal('timestd', times.at(-1));
	}

	function rollBackExec(idx, func) {
		if (idx < 0.7 * times.length) {
			func();
			times_stats_table.reset(times.length);
			times_stats_list.reset(times.length);
		} else {
			times_stats_table.toLength(idx);
			times_stats_list.toLength(idx);
			func();
			times_stats_table.toLength(times.length);
			times_stats_list.toLength(times.length);
		}
	}

	function delIdx(index) {
		var n_del;
		if (kernel.getProp("delmul")) {
			n_del = $.prompt(STATS_CFM_DELMUL, 1);
			if (n_del == null || !/^\d+$/.exec(n_del) || ~~n_del == 0) {
				return;
			}
			n_del = ~~n_del;
		} else {
			if (!$.confirm(STATS_CFM_DELETE)) {
				return;
			}
			n_del = 1;
		}
		rollBackExec(index, function() {
			times.splice(index, n_del);
			timesExtra.splice(index, n_del);
		});
		sessionManager.save(index);
		table_ctrl.updateTable(false);
		updateUtil(['delete', index, n_del]);
		return true;
	}

	function getMean(dim) {
		var sum = 0;
		var cntdnf = 0;
		for (var i = 0; i < times.length; i++) {
			var curTime = timesAt(i)[0];
			if (curTime[0] == -1 || curTime.length <= dim) {
				cntdnf += 1;
			} else {
				sum += timeAtDim(dim, i);
			}
		}
		if (cntdnf == times.length) {
			return -1;
		} else {
			return sum / (times.length - cntdnf);
		}
	}

	function pretty(time, showDNF) {
		switch (time[0]) {
		case 0: return kpretty(time[1]);
		case -1: return "DNF" + (showDNF ? `(${kpretty(time[1])})` : "");
		default: return kpretty(time[0] + time[1]) + "+";
		}
	}

	function prettyMPA(time) { // multi phase append, e.g. "=XXX+XXX+XXX..."
		if (time.length == 2) {
			return ""
		}
		var ret = [];
		ret.push(kpretty(time.at(-1)));
		for (var j = time.length - 2; j >= 1; j--) {
			ret.push(kpretty(time[j] - time[j + 1]));
		}
		return "=" + ret.join("+");
	}

	function getReviewUrl(time) {
		return 'https://alg.cubing.net/?alg=' + encodeURIComponent((time[4][0] || '').replace(/@(\d+)/g, '/*$1*/').replace(/-/g, '&#45;')) +
			'&setup=' + encodeURIComponent(time[1] || '')
	}

	var table_ctrl = (function() {

		var pattern = /.*/;
		var patstr = '.*';
		var filterTh = $('<th class="click">').html('&#8981;');
		var timeTh = $('<th class="click">');
		var len1Th = $('<th class="click">');
		var len2Th = $('<th class="click">');
		var shownIdxs = [];
		var hheadIdx = 0;
		var nextRank = null;

		function changeRank(idx) {
			if (nextRank && nextRank['idx'] == idx) {
				nextRank = null;
				updateTable(false);
				return;
			}
			var rank = [];
			for (var i = 0; i < times.length; i++) {
				rank[i] = i;
			}
			if (idx == 0) {
				rank.sort(function(a, b) {
					return TimeStat.dnfsort(times_stats_table.timeAt(a), times_stats_table.timeAt(b));
				});
			} else if (idx == 1 || idx == 2) {
				var len = idx == 1 ? len1 : len2;
				var runstat = times_stats_list.runAvgMean(0, times.length, len, (idx == 1 ? stat1 : stat2) > 0 ? undefined : 0);
				rank.sort(function(a, b) {
					if (Math.max(a, b) < len - 1) {
						return 0;
					} else if (Math.min(a, b) < len - 1) {
						return a > b ? -1 : 1;
					}
					return TimeStat.dnfsort(runstat[a - len + 1][0], runstat[b - len + 1][0]);
				});
			}
			nextRank = {};
			for (var i = 0; i < times.length - 1; i++) {
				nextRank[rank[i]] = rank[i + 1];
			}
			nextRank[-2] = rank[0];
			nextRank[rank[times.length - 1]] = -1;
			nextRank['len'] = times.length;
			nextRank['idx'] = idx;
			updateTable(false);
		}

		function nextIdx(idx) {
			if (nextRank && (idx in nextRank)) {
				return nextRank[idx];
			} else if (idx == -2) {
				return times.length - 1;
			} else {
				return idx - 1;
			}
		}

		function filter(idx) {
			var time = timesAt(idx);
			return pattern.exec(pretty(time[0], true) + prettyMPA(time[0])) ||
				pattern.exec(time[1]) ||
				pattern.exec(time[2]) ||
				pattern.exec(mathlib.time2str(time[3]));
		}

		function updateTable(allUpdate) {
			curDim = 1;
			for (var i = 0; i < times.length; i++) {
				curDim = Math.max(curDim, timesAt(i)[0].length - 1);
			}
			updateTitleRow();
			if (nextRank && nextRank['len'] != times.length) {
				clearFilter();
			}
			shownIdxs = [];
			hheadIdx = nextIdx(-2);
			if (kernel.getProp('statinv')) {
				table.empty().append(title, showAllRow, avgRow);
			} else {
				table.empty().append(avgRow, title, showAllRow);
			}
			showMoreRows();
			if (hheadIdx < 0) {
				showAllRow.unbind('click').hide();
			} else {
				showAllRow.unbind('click').click(table_ctrl.showAll).show();
			}
			filterTh.unbind('click').click(changePattern);
			timeTh.unbind('click').click(changeRank.bind(null, 0));
			len1Th.unbind('click').click(changeRank.bind(null, 1));
			len2Th.unbind('click').click(changeRank.bind(null, 2));
			updateAvgRow(curDim);
			allUpdate && updateUtil(['table']);
			scrollDiv.scrollTop(kernel.getProp('statinv') ? table[0].scrollHeight : 0);
		}

		function changePattern() {
			var newpattern = $.prompt('Filter Pattern: (23*, 15.1*, comments, scrambles, date)');
			if (newpattern == null || newpattern == patstr) {
				return;
			} else if (!newpattern) {
				patstr = '.*'
			} else {
				patstr = (newpattern + '').replace(/[.\\+*?\[\^\]$(){}=!<>|:\-]/g, '\\$&').replace(/\\\*/g, '.*').replace(/\\\?/g, '.');
			}
			pattern = new RegExp(patstr, 'g');
			updateTable(false);
		}

		function clearFilter() {
			if (patstr == '.*' && nextRank == null) {
				return false;
			}
			patstr = '.*';
			pattern = /.*/;
			nextRank = null;
			updateTable(false);
			return true;
		}

		function updateTitleRow() {
			var rankIdx = nextRank ? nextRank['idx'] : -1;
			timeTh.html(STATS_TIME + (rankIdx == 0 ? '*' : ''));
			len1Th.html((stat1 > 0 ? 'ao' : 'mo') + len1 + (rankIdx == 1 ? '*' : ''));
			len2Th.html((stat2 > 0 ? 'ao' : 'mo') + len2 + (rankIdx == 2 ? '*' : ''));
			title.empty().append(filterTh, timeTh, len1Th, len2Th);
			if (curDim > 1) {
				for (var i = 0; i < curDim; i++) {
					title.append('<th>P.' + (i + 1) + '</th>');
				}
			}
		}

		function updateFrom(idx) {
			var endIdx = Math.min(idx + Math.max(len1, len2), times.length);
			var isStatInv = kernel.getProp('statinv');
			var rows = avgRow.parent().children();
			for (var i = 0; i < shownIdxs.length; i++) {
				if (shownIdxs[i] < idx || shownIdxs[i] >= endIdx) {
					continue;
				}
				var ii = isStatInv ? shownIdxs.length + 1 - i : 2 + i;
				if (shownIdxs[i] != ~~rows.eq(ii).attr('data')) {
					console.log('[stats] update from error', shownIdxs[i], ii, rows[ii]);
					continue;
				}
				getTimeRow(shownIdxs[i], curDim, rows.eq(ii));
			}
			updateAvgRow(curDim);
		}

		function showMoreRows() {
			var targetLength = shownIdxs.length + MAX_ITEMS;
			var rows = [];
			while (hheadIdx >= 0 && shownIdxs.length < targetLength) {
				if (filter(hheadIdx)) {
					rows.push(getTimeRow(hheadIdx, curDim));
					shownIdxs.push(hheadIdx);
				}
				hheadIdx = nextIdx(hheadIdx);
			}
			if (kernel.getProp('statinv')) {
				showAllRow.after(rows.reverse().join(""));
			} else {
				showAllRow.before(rows.join(""));
			}
		}

		function showAll(e) {
			showMoreRows();
			if (hheadIdx < 0) {
				showAllRow.unbind('click').hide();
			}
		}

		function hideAll() {
			while (shownIdxs.length > MAX_ITEMS) {
				(kernel.getProp('statinv') ? showAllRow.next() : showAllRow.prev()).remove();
				hheadIdx = shownIdxs.pop();
			}
			if (nextIdx(hheadIdx) >= 0) {
				showAllRow.unbind('click').click(showAll).show();
			}
		}

		function appendRow(idx) {
			if (clearFilter()) {
				return;
			}
			var row = getTimeRow(idx, curDim);
			if (kernel.getProp('statinv')) {
				avgRow.before(row);
				scrollDiv.scrollTop(table[0].scrollHeight);
			} else {
				title.after(row);
				scrollDiv.scrollTop(0);
			}
			shownIdxs.unshift(idx);
			updateAvgRow(curDim);
			if (shownIdxs.length > MAX_ITEMS) {
				table_ctrl.hideAll();
			}
		}

		function getRowIndexOf(idx) {
			var sidx = shownIdxs.indexOf(idx);
			if (sidx == -1) {
				return null;
			}
			var ii = kernel.getProp('statinv') ? shownIdxs.length + 1 - sidx : 2 + sidx;
			var row = avgRow.parent().children().eq(ii);
			if (idx != ~~row.attr('data')) {
				console.log('[stats] table_ctrl getRowIndexOf error', sidx, idx, row);
				return null;
			}
			return row;
		}

		return {
			appendRow: appendRow,
			showAll: showAll,
			hideAll: hideAll,
			getRowIndexOf: getRowIndexOf,
			updateTable: updateTable,
			updateFrom: updateFrom
		}
	})();

	var floatCfm = (function() {
		var cfmDiv = $('<div style="text-align:center; font-family: initial;">');
		var cfmTime = $('<span style="font-size:2.5em;"/>');
		var cfmTxtR = $('<input type="text">').css('width', '8em');
		var cfmDelR = $('<input type="button" data="d">').val("X");
		var cfmScrR = $('<input type="text" readonly>').css('width', '8em');
		var cfmDate = $('<input type="text" readonly>').css('width', '8em');
		var cfmExt = $('<input type="text" readonly>').css('width', '8em');
		var cfmIdx = 0;

		function procTxt() {
			if (cfmIdx < 0 || cfmIdx >= times.length) {
				return;
			}
			if (kernel.getProp('statsrc', 't').startsWith('mcomment')) {
				rollBackExec(cfmIdx, function() {
					timesAt(cfmIdx)[2] = cfmTxtR.val();
					timesExtra[cfmIdx] = null;
				});
				sessionManager.save(cfmIdx);
				table_ctrl.updateFrom(cfmIdx);
				updateUtil(['comment', cfmIdx]);
			} else {
				timesAt(cfmIdx)[2] = cfmTxtR.val();
				timesExtra[cfmIdx] = null;
				sessionManager.save(cfmIdx);
				var cfmIdxRow = table_ctrl.getRowIndexOf(cfmIdx);
				if (cfmIdxRow) {
					getTimeRow(cfmIdx, curDim, cfmIdxRow);
				}
				updateSumTable();
			}
		}

		function procClk(e) {
			var target = $(e.target);
			var which = target.attr('data');
			if (!which) {
				return;
			}
			if (which == 'p') {
				var selected = {" OK ": 0, " +2 ": 2000, " DNF ": -1}[target.html()];
				setPenalty(selected, cfmIdx);
			} else if (which == 'd') {
				if (delIdx(cfmIdx)) {
					cfmIdx = undefined;
					hideToTools();
				}
			} else if (which == 's') {
				var time = timesAt(cfmIdx);
				$.clipboardCopy(time[1]).then(
					logohint.push.bind(logohint, LGHINT_SCRCOPY),
					logohint.push.bind(logohint, 'Copy Failed')
				);
			} else if (which == 'c') {
				var time = timesAt(cfmIdx);
				$.clipboardCopy(
					pretty(time[0], true) + prettyMPA(time[0]) + (time[2] ? "[" + time[2] + "]" : "") + "   " + time[1] + "   @" + mathlib.time2str(time[3])
				).then(
					logohint.push.bind(logohint, LGHINT_SOLVCOPY),
					logohint.push.bind(logohint, 'Copy Failed')
				);
			} else if (which == 'r') {
				var time = timesAt(cfmIdx);
				if (time[4]) {
					var puzzle = typeof time[4][1] == 'string' && time[4][1] || tools.getCurPuzzle() || '333';
					replay.popupReplay(time[1], time[4][0], puzzle);
				}
			}
		}

		function delLast() {
			if (times.length != 0 && delIdx(times.length - 1)) {
				cfmIdx = undefined;
				hideToTools();
			}
		}

		function hideToTools() {
			if (kernel.isDialogShown('cfm')) {
				kernel.hideDialog();
			}
			if (toolDiv) {
				cfmDiv.css('font-size', '0.8em');
				toolDiv.empty().append(cfmDiv);
				cfmIdx = times.length - 1;
				genDiv();
			}
		}

		function genDiv() {
			if (!times[cfmIdx]) {
				cfmDiv.empty();
				return;
			}
			var time = timesAt(cfmIdx);
			var reviewElem = '';
			if (time[4]) {
				reviewElem = $('<span class="click" data="r">' + STATS_REVIEW + '</span>');
				reviewElem = $('<tr>').append($('<td>').append(reviewElem), $('<td>').append(cfmExt));
			}
			cfmDiv.empty().append(cfmTime, '<br>', prettyMPA(time[0]), '<br>')
				.append('<span class="click" data="c"> &#128203; </span>|<span class="click" data="p"> OK </span>|<span class="click" data="p"> +2 </span>|<span class="click" data="p"> DNF </span>| ', cfmDelR)
				.append('<br>', $('<table style="display:inline-block;">').append(
					$('<tr>').append(`<td>${STATS_COMMENT}</td>`, $('<td>').append(cfmTxtR)),
					$('<tr>').append(`<td><span class="click" data="s">${SCRAMBLE_SCRAMBLE}</span></td>`, $('<td>').append(cfmScrR)),
					$('<tr>').append(`<td>${STATS_DATE}</td>`, $('<td>').append(cfmDate)),
					reviewElem
				)).unbind('click').click(procClk);
			cfmTime.html(pretty(time[0], true));
			cfmScrR.val(time[1]);
			cfmDate.val(mathlib.time2str(time[3]))
			cfmTxtR.val(time[2]).unbind('change').change(procTxt);
			cfmExt.val(time[4] ? JSON.stringify(time[4]) : "");
		}

		function proc(idx, action) {
			if (idx < 0 || idx >= times.length) {
				return;
			}
			cfmIdx = idx;
			genDiv();
			cfmDiv.css('font-size', '1.2em');
			if (action == 'comment') {
				hideToTools();
				var newComment = $.prompt('Comment for solve No. ' + (cfmIdx + 1) + ':', cfmTxtR.val());
				if (newComment == null) {
					return;
				}
				cfmTxtR.val(newComment);
				procTxt();
				return;
			}
			var params = [cfmDiv, hideToTools, undefined, hideToTools, [STATS_SSSTAT, function(cfmIdx) {
				hideToTools();
				setHighlight(times_stats_table, timesAt, cfmIdx, 1, 10, true);
			}.bind(null, cfmIdx)], [STATS_SSRETRY, function(cfmIdx) {
				hideToTools();
				var time = timesAt(cfmIdx);
				time && scramble.pushScramble(time[1]);
			}.bind(null, cfmIdx)]];
			var curTime = timesAt(cfmIdx);
			if (curTime && curTime[4]) {
				params.push([TOOLS_RECONS, function() {
					hideToTools();
					kernel.pushSignal('reqrec', [timesAt(cfmIdx), cfmIdx]);
				}]);
			}
			kernel.showDialog(params, 'cfm', 'Solves No.' + (cfmIdx + 1));
		}

		function setPenalty(value, idx) {
			if (timesAt(idx)[0][0] == value) {
				return;
			}
			rollBackExec(idx, function() {
				timesAt(idx)[0][0] = value;
				timesExtra[idx] = null;
			});
			sessionManager.save(idx);
			table_ctrl.updateFrom(idx);
			updateUtil(['penalty', idx]);
			if (idx == cfmIdx) {
				genDiv();
			}
			kernel.pushSignal('timepnt', timesAt(idx));
		}

		function setCfm(value) {
			if (times.length == 0) {
				return;
			}
			setPenalty(value, times.length - 1);
		}

		var toolDiv;

		function execFunc(fdiv, signal) {
			toolDiv = fdiv;
			if (fdiv == undefined) {
				return;
			}
			hideToTools();
		}

		$(function() {
			tools.regTool('cfm', TOOLS_CFMTIME, execFunc);
			kernel.regListener('cfm', 'session', hideToTools);
		});

		return {
			proc: proc,
			delLast: delLast,
			setCfm: setCfm
		}
	})();

	var curDim = 0;

	function procClick(e) {
		var target = $(e.target);
		if (!target.is('td,td>span') || target.html() == '-') {
			return;
		}
		if (target.is('td>span')) {
			target = target.parent();
		}
		var prev = target.prevAll();
		var row = prev.length;
		var idx = ~~(row == 0 ? target : prev.eq(-1)).html().replace("*", "") - 1;
		if (row > 4 || row < 0) {
			return;
		}
		switch (row) {
			case 0:
				if (kernel.getProp('rsfor1s')) {
					setHighlight(times_stats_table, timesAt, idx, 1, 10, true);
					break;
				}
			case 1: floatCfm.proc(idx); break;
			case 2: setHighlight(times_stats_table, timesAt, idx - len1 + 1, len1, len1 * 10, stat1 < 0); break;
			case 3: setHighlight(times_stats_table, timesAt, idx - len2 + 1, len2, len2 * 10, stat2 < 0); break;
		}
	}

	function procAvgClick(e) {
		var target = $(e.target);
		var idx = ~~target.attr('data');
		var stats = times_stats_table;
		if (idx != 0) {
			stats = new TimeStat(avgSizes, times.length, timeAtDim.bind(undefined, idx));
		}
		getStats(stats, timesAt, idx == 0 ? 0 : STATS_CURSPLIT.replace('%d', idx));
	}

	function genAvgSignal() {
		var i = times.length - 1;
		times_stats_list.genStats();
		var st1 = times_stats_list.lastAvg[0];
		var st2 = times_stats_list.lastAvg[1];
		var bpa = times_stats_list.getBWPA()[0];
		var time1 = st1 ? st1[0] : bpa[0];
		var time2 = st2 ? st2[0] : bpa[1];
		var showBP1 = !st1 && time1;
		var showBP2 = !st2 && time2;
		var ind1 = (showBP1 ? 'bp' : '') + (stat1 > 0 ? 'a' : 'm') + (showBP1 ? '' : 'o') + len1;
		var ind2 = (showBP2 ? 'bp' : '') + (stat2 > 0 ? 'a' : 'm') + (showBP2 ? '' : 'o') + len2;
		kernel.pushSignal('avg', [
			ind1 + ": " + (time1 ? kpround(time1) : "-"),
			ind2 + ": " + (time2 ? kpround(time2) : "-"),
			st1 ? [i - len1 + 1, len1, len1 * 10, stat1 < 0] : undefined,
			st2 ? [i - len2 + 1, len2, len2 * 10, stat2 < 0] : undefined,
			setHighlight.bind(undefined, times_stats_list, timesAt),
			timesAt(i),
			i == 0 ? null : timesAt(i - 1)
		]);
	}

	function getTimeRow(i, dim, tr) {
		var time = timesAt(i);
		var curTime = time[0];
		times_stats_list.genStats();
		var st0pb = times_stats_list.isBestAvg(2, i);
		var st1pb = times_stats_list.isBestAvg(0, i - len1 + 1);
		var st2pb = times_stats_list.isBestAvg(1, i - len2 + 1);
		var tdtm = '<td class="times">';
		var tdpb = '<td class="times pb">';

		var ret = [];
		ret.push(`<td class="times">${time[2] && "*"}${i + 1}</td>`);
		ret.push((st0pb ? tdpb : tdtm) + pretty(curTime, false) + '</td>');

		var statSrc = kernel.getProp('statsrc', 't');
		var prettyFunc = times_stats_table.prettyFunc || [kpretty, kpround];
		if (statSrc[0] != 't') {
			ret.pop();
			ret.push((st0pb ? tdpb : tdtm) + '<span style="opacity:0.5">' + pretty(curTime, false) + '</span> ' + prettyFunc[0](times_stats_table.timeAt(i)).split(' ')[0] + '</td>');
		}

		var st1 = times_stats_table.runAvgMean(i - len1 + 1, len1, 0, stat1 > 0 ? undefined : 0);
		var st2 = times_stats_table.runAvgMean(i - len2 + 1, len2, 0, stat2 > 0 ? undefined : 0);
		ret.push(
			(st1 ? (st1pb ? tdpb : tdtm) + prettyFunc[1](st1[0][0]) : '<td>-') + '</td>' +
			(st2 ? (st2pb ? tdpb : tdtm) + prettyFunc[1](st2[0][0]) : '<td>-') + '</td>'
		);
		if (dim > 1) {
			ret.push('<td>' + kpretty(curTime.at(-1)) + '</td>');
			for (var j = curTime.length - 2; j >= 1; j--) {
				ret.push('<td>' + kpretty(curTime[j] - curTime[j + 1]) + '</td>');
			}
			for (var j = curTime.length - 1; j < dim; j++) {
				ret.push('<td>-</td>');
			}
		}
		ret = ret.join("");
		tr && tr.html(ret);
		return '<tr data="' + i + '">' + ret + '</tr>';
	}

	function updateAvgRow(dim) {
		avgRow.empty().unbind("click").click(procAvgClick);
		var len = times.length;
		var data = times_stats_table.getAllStats();
		var prettyFunc = times_stats_table.prettyFunc || [kpretty, kpround];
		var sum = len == data[0] ? 0 : (len - data[0]) * data[1];
		avgRow.append(`<th colspan="4" data="0" class="times">${STATS_SOLVE}: ${len - data[0]}/${len}<br>` +
			STATS_AVG + ': ' + prettyFunc[1](data[1]) +
			(kernel.getProp('statssum') ? `<br>${STATS_SUM}: ${prettyFunc[0](sum)}` : '') +
			'</th>').css('font-size', '1.2em')
		if (dim > 1) {
			for (var j = 1; j <= dim; j++) {
				avgRow.append(`<th data="${j}" class="times">${kpround(getMean(j))}</th>`).css('font-size', '');
			}
		}
	}

	function genSrcSelect(statSrcSelect) {
		if (!statSrcSelect) {
			statSrcSelect = $('<select style="max-width:4em;">');
		}
		statSrcSelect.unbind('change').change(function(e) {
			kernel.setProp('statsrc', $(e.target).val());
		});
		var statSrc = kernel.getProp('statsrc', 't');
		var validOpt = [['t', STATS_TIME]];
		if (curDim != 1) {
			for (var i = 0; i < curDim; i++) {
				validOpt.push(['p' + (i + 1), 'P.' + (i + 1)]);
			}
		}
		var metrics = getValidMetrics();
		for (var metric in metrics) {
			validOpt.push(['m' + metric, metrics[metric][0]]);
		}
		var isHit = false;
		for (var i = 0; i < validOpt.length; i++) {
			statSrcSelect.append($('<option>').val(validOpt[i][0]).html(validOpt[i][1]));
			if (validOpt[i][0] == statSrc) {
				isHit = true;
			}
		}
		statSrcSelect.val(statSrc);
		if (!isHit) {
			kernel.setProp('statsrc', 't');
		}
		return validOpt.length == 1 ? STATS_TIME : statSrcSelect;
	}

	function updateSumTable() {
		if (isInit) {
			return;
		}
		if (!kernel.getProp('statsum')) {
			sumtable.empty();
			sumtableDiv.hide();
			resultsHeight();
			return;
		} else {
			sumtableDiv.css('display', 'inline-block');
		}
		times_stats_table.getAllStats();
		var statSrcSelect = genSrcSelect();
		var prettyFunc = times_stats_table.prettyFunc || [kpretty, kpround];
		var shead = [];
		if (times.length > 0) {
			var idx = times.length - 1;
			shead.push('<td class="times click" data="cs">' + prettyFunc[0](times_stats_table.timeAt(idx)) + '</td>');
			shead.push('<td class="times click" data="bs">' + prettyFunc[0](times_stats_table.bestTime) + '</td>');
		} else {
			shead.push('<td>-</td><td>-</td>');
		}
		var s = [];
		var showThres = kernel.getProp('statthres', false);
		var showBPA = kernel.getProp('statbpa', false);
		var showWPA = kernel.getProp('statwpa', false);
		var thres = showThres ? times_stats_table.getThres() : null;
		var bwpa = (showBPA || showWPA) ? times_stats_table.getBWPA() : null;
		for (var j = 0; j < avgSizes.length; j++) {
			var size = Math.abs(avgSizes[j]);
			var rowhead = '<tr><th>' + 'am' [avgSizes[j] >>> 31] + 'o' + size + '</th>';
			if (times.length >= size) {
				s.push(rowhead);
				s.push('<td class="times click" data="c' + 'am' [avgSizes[j] >>> 31] + j + '">' + prettyFunc[1](times_stats_table.lastAvg[j][0]) + '</td>');
				s.push('<td class="times click" data="b' + 'am' [avgSizes[j] >>> 31] + j + '">' + prettyFunc[1](times_stats_table.bestAvg(j, 0)) + '</td>');
				showThres && s.push('<td class="times">' + (thres[j] < 0 ? ['N/A', '\u221E'][-1 - thres[j]] : prettyFunc[0](thres[j])) + '</td>');
			} else if (times.length == size - 1 && (showBPA || showWPA)) {
				s.push(rowhead);
				s.push('<td>-</td><td>-</td>');
				showThres && s.push('<td>-</td>');
			} else {
				continue;
			}
			showBPA && s.push('<td class="times">' + prettyFunc[1](bwpa[0][j]) + '</td>');
			showWPA && s.push(avgSizes[j] < 0 ? '<td>-</td>' : ('<td class="times">' + prettyFunc[1](bwpa[1][j]) + '</td>'));
			s.push('</tr>');
		}
		var curTh = $('<tr>').append('<th></th><th>' + hlstr[1] + '</th><th>' + hlstr[0] + '</th>');
		if (showThres) {
			curTh.append('<th>' + hlstr[13] + '</th>');
			shead.push('<td>-</td>');
		}
		if (showBPA) {
			curTh.append('<th>BPA</th>');
			shead.push('<td>-</td>');
		}
		if (showWPA) {
			curTh.append('<th>WPA</th>');
			shead.push('<td>-</td>');
		}
		sumtable.empty().append(curTh,
			$('<tr>').append(
				$('<th style="padding:0">').append(statSrcSelect),
				shead.join("")
			),
			s.join("")
		);
		resultsHeight();
	}

	function updateUtil(msg) {
		if (isInit) {
			return;
		}
		updateSumTable();
		for (var util in statUtils) {
			statUtils[util](msg);
		}
		genAvgSignal();
	}

	function getTableTimeAt() {
		var statSrc = kernel.getProp('statsrc', 't');
		if (statSrc == 't') {
			return timeAt;
		} else if (statSrc[0] == 'p') {
			return timeAtDim.bind(undefined, ~~statSrc.slice(1));
		} else if (statSrc[0] == 'm') {
			var metric = statSrc.slice(1);
			return getExtraInfo.bind(null, metric);
		}
		return timeAt;
	}

	function detailTimeLine(idx, time, trimList) {
		if (!time) {
			return "N/A";
		}
		var c = pretty(time[0], true) + prettyMPA(time[0]) + (kernel.getProp('printComm') && time[2] ? "[" + time[2] + "]" : "");
		if ($.inArray(idx, trimList) != -1) {
			c = "(" + c + ")";
		}
		if (kernel.getProp('printScr')) {
			c += "   " + time[1];
		}
		if (kernel.getProp('printDate')) {
			c += "   @" + mathlib.time2str(time[3]);
		}
		if (kernel.getProp('printScr') || kernel.getProp('printDate')) {
			return (idx + 1) + ". " + c + " \n";
		} else {
			return c + ", ";
		}
	}

	function setHighlight(times_stats, timesAt, start, nsolves, id, mean) {
		if (times_stats.timesLen == 0) return;
		var data = [0, [null], [null]];
		var trimList = [];
		if (start + nsolves != 0) {
			if (mean) {
				data = times_stats.runAvgMean(start, nsolves, 0, 0)[0];
			} else {
				data = times_stats.runAvgMean(start, nsolves)[0];
				trimList = times_stats.getTrimList(start, nsolves, data[2], data[3]);
			}
		}

		var tstr = "";
		if (kernel.getProp('printDate') && nsolves > 2) {
			var tstart = timesAt(start);
			var tend = timesAt(start + nsolves - 1);
			tstr = hlstr[11].replace("%s", mathlib.time2str(tstart && tstart[3]))
				.replace("%e", mathlib.time2str(tend && tend[3]));
			tstr = " (" + tstr + ")";
		}
		var s = [mathlib.time2str(+new Date / 1000, hlstr[3]) + tstr + "\n"];
		var prettyFunc = times_stats.prettyFunc || [kpretty, kpround];
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
			s.push(": " + prettyFunc[id == 10 ? 0 : 1](data[0]));
		}

		s.push("\n\n" + hlstr[10] + "\n");
		if (kernel.getProp('absidx')) {
			for (var i = 0; i < trimList.length; i++) {
				trimList[i] += start;
			}
		}
		for (var i = 0; i < nsolves; i++) {
			s.push(detailTimeLine(kernel.getProp('absidx') ? start + i : i, timesAt(start + i), trimList));
		}
		s = s.join("").slice(0, -2);
		stext.val(s);
		kernel.showDialog([stext, clearText, undefined, clearText, [STATS_EXPORTCSV, function() {
			exportCSV(times_stats, timesAt, start, nsolves);
			return false;
		}], [COPY_LANG, function() {
			$.clipboardCopy(s).then(logohint.push.bind(logohint, COPY_LANG));
			return false;
		}]], 'stats', STATS_CURROUND);
		stext[0].select();
	}

	function csvField(val) {
		val = val.toString();
		if (val.indexOf(';') != -1 || val.indexOf('\n') != -1) {
			val = '"' + val.replace(/"/g, '""') + '"';
		}
		return val;
	}

	function exportCSV(times_stats, timesAt, start, nsolves) {
		if (times_stats.timesLen == 0) return;
		if (!window.Blob) {
			$.alert('Do not support your browser!');
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
			line.push(time[2] ? time[2] : "");
			line.push(time[1]);
			line.push(mathlib.time2str(time[3]));
			line.push(kpretty(time[0].at(-1)));
			for (var j = time[0].length - 2; j >= 1; j--) {
				line.push(kpretty(time[0][j] - time[0][j + 1]));
			}
			for (var j = time[0].length - 1; j < curDim; j++) {
				line.push('');
			}
			for (var j = 0; j < line.length; j++) {
				line[j] = csvField(line[j]);
			}
			s.push(line.join(';'));
		}
		s = s.join("\r\n");
		var blob = new Blob([s], { 'type': 'text/csv' });
		var outFile = $('<a class="click"/>').appendTo('body');
		outFile.attr('href', URL.createObjectURL(blob));
		outFile.attr('download', 'csTimerExport_' + mathlib.time2str(new Date()/1000, '%Y%M%D_%h%m%s') + '.csv');
		outFile[0].click();
		outFile.remove();
	}

	function infoClick(times_stats, timesAt, e) {
		var which = $(e.target).attr('data');
		if (which == undefined) {
			return;
		}
		var idx = ~~(which.substr(2));
		switch (which.substr(0, 2)) {
		case 'bs': setHighlight(times_stats, timesAt, times_stats.bestTimeIndex, 1, 10, true); break;
		case 'cs': setHighlight(times_stats, timesAt, times_stats.timesLen - 1, 1, 10, true); break;
		case 'ws': setHighlight(times_stats, timesAt, times_stats.worstTimeIndex, 1, 10, true); break;
		case 'bm': setHighlight(times_stats, timesAt, times_stats.bestAvg(idx, 4), -avgSizes[idx], -avgSizes[idx] * 10, true); break;
		case 'cm': setHighlight(times_stats, timesAt, times_stats.timesLen + avgSizes[idx], -avgSizes[idx], -avgSizes[idx] * 10, true); break;
		case 'ba': setHighlight(times_stats, timesAt, times_stats.bestAvg(idx, 4), avgSizes[idx], avgSizes[idx] * 10, false); break;
		case 'ca': setHighlight(times_stats, timesAt, times_stats.timesLen - avgSizes[idx], avgSizes[idx], avgSizes[idx] * 10, false); break;
		case 'tt': getStats(times_stats, timesAt); break;
		}
	}

	var hlstr = STATS_STRING.split('|');
	for (var i = 0; i < 13; i++) {
		hlstr[i] = hlstr[i] || '';
	}

	function timeAtDim(dim, idx) {
		var curTime = (times[idx] || [[-1, 1]])[0];
		if (curTime[0] == -1 || curTime.length <= dim) {
			return -1;
		}
		var ret = dim == 0 ?
			(curTime[0] + curTime[1]) :
			(curTime[curTime.length - dim] - (curTime[curTime.length - dim + 1] || 0));
		return roundMilli * ~~(ret / roundMilli);
	}

	var timeAt = timeAtDim.bind(undefined, 0);

	function timesAt(idx) {
		return times[idx];
	}

	var avgSizes = [-3, 5, 12, 50, 100, 1000];
	var times_stats_table = new TimeStat(avgSizes, 0, timeAt);
	var times_stats_list = new TimeStat([5, 12], 0, timeAt);

	function getSortedTimesByDate(times, dedup) {
		var sorted = [], ret = [];
		for (var i = 0; i < times.length; i++) {
			sorted.push(i);
		}
		sorted.sort(function(a, b) {
			var idxa = times[a][3] || 0;
			var idxb = times[b][3] || 0;
			return idxa == idxb ? (a - b) : (idxa - idxb);
		});
		var prevIdx = -1;
		for (var i = 0; i < times.length; i++) {
			var curIdx = times[sorted[i]][3] || 0;
			if (dedup && prevIdx == curIdx && curIdx != 0) {
				continue;
			}
			ret.push(times[sorted[i]]);
			prevIdx = curIdx;
		}
		return ret;
	}

	var sessionManager = (function() {

		var sessionIdxMax = 15;
		var sessionIdxMin = 1;
		var sessionIdx = -1;

		var ssmgrDiv = $('<div>');
		var ssmgrTable = $('<table>').appendTo(ssmgrDiv).addClass('table ssmgr');
		var funcButton = $('<input type="button">').val('+');

		var sessionData;
		var ssSorted;

		var newSessionOption = $('<option>').val('new').html('New..');
		var delSessionOption = $('<option>').val('del').html('Delete..');
		var select = $('<select>').change(function() {
			kernel.blur();
			if (select.val() == 'new') {
				createSession(sessionIdxMax, false);
			} else if (select.val() == 'del') {
				if (!deleteSession(sessionIdx)) {
					select.val(sessionIdx);
				}
				return;
			} else {
				loadSession(~~select.val());
			}
		});

		function loadSession(ssidx) {
			sessionIdx = ssidx;
			kernel.setProp('session', sessionIdx);
			sessionData[sessionIdx] = sessionData[sessionIdx] || {
				'name': sessionIdx,
				'opt': {}
			};
			kernel.setSProps(sessionData[sessionIdx]['opt'] || {});
			fixSessionSelect();
			return load();
		}

		function fixSessionData() {
			for (var i = 1; i <= sessionIdxMax; i++) {
				if (typeof sessionData[i] != 'object') {
					sessionData[i] = {};
				}
				var defaultKV = {
					'name': i,
					'opt': {}
				};
				for (var key in defaultKV) {
					if (sessionData[i][key] === undefined) {
						sessionData[i][key] = defaultKV[key];
					}
				}
				if (sessionData[i]['scr']) {
					sessionData[i]['opt']['scrType'] = sessionData[i]['scr'];
					delete sessionData[i]['scr'];
				}
				if (sessionData[i]['phases']) {
					sessionData[i]['opt']['phases'] = sessionData[i]['phases'];
					delete sessionData[i]['phases'];
				}
				sessionData[i]['rank'] = sessionData[i]['rank'] || i;
			}
			fixRank();
		}

		function fixSessionSelect() {
			fixSessionData();
			select.empty();
			for (var i = 0; i < ssSorted.length; i++) {
				select.append($('<option>').val(ssSorted[i]).html(sessionData[ssSorted[i]]['name']));
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

		function sessionIdent(idx) {
			return sessionData[idx]['rank'] + '-' + sessionData[idx]['name'];
		}

		function initNewSession(rank, copy) {
			if (!$.isNumeric(rank)) {
				rank = (sessionData[sessionIdx] || {})['rank'] || sessionIdxMax;
			}
			sessionIdx = ++sessionIdxMax;
			var curDate = new Date();
			var newName = (curDate.getMonth() + 1) + "." + curDate.getDate() + ' ' + curScrType;

			kernel.setProp('sessionN', sessionIdxMax);
			var prevData = sessionData[ssSorted[rank - 1]] || {};
			if (copy === undefined || copy) {
				sessionData[sessionIdx] = {
					'name': prevData['name'] || newName,
					'opt': JSON.parse(JSON.stringify(prevData['opt'] || {})),
					'rank': rank + 0.5
				};
			} else {
				sessionData[sessionIdx] = {
					'name': newName,
					'opt': kernel.getSProps(),
					'rank': rank + 0.5
				};
			}
			fixSessionSelect();
		}

		function createSession(rank, copy) {
			initNewSession(rank, copy);
			times = [];
			timesExtra = [];
			times_stats_list.reset(times.length);
			times_stats_table.reset(times.length);
			save();
			loadSession(sessionIdx);
			kernel.blur();

			if (kernel.getProp('imrename')) {
				renameSession(sessionIdx, true);
			}
		}

		function doSessionDeletion(ssidx) {
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
				loadSession(ssidx);
			}
		}

		function deleteSession(ssidx) {
			if (('stat' in sessionData[ssidx] ? sessionData[ssidx]['stat'][0] : 1) != 0 &&
				!$.confirm(STATS_CFM_DELSS.replace('%s', sessionIdent(ssidx)))) {
				return false;
			}
			doSessionDeletion(ssidx);
			return true;
		}

		function clearSession() {
			if (!$.confirm(STATS_CFM_RESET)) {
				return;
			}
			times = [];
			timesExtra = [];
			times_stats_table.reset();
			times_stats_list.reset();
			save();
			table_ctrl.updateTable(true);
			kernel.blur();
		}

		function renameSession(ssidx, isCreate) {
			if (ssidx === undefined) {
				ssidx = sessionIdx;
			}
			var sName = $.prompt(isCreate ? STATS_SESSION_NAMEC : STATS_SESSION_NAME, sessionData[ssidx]['name']);
			if (sName != null) {
				sName = $('<div/>').text(sName).html();
				sessionData[ssidx]['name'] = sName;
				kernel.setProp('sessionData', JSON.stringify(sessionData));
			}
		}

		function sessionLoaded(loadedIdx, timesNew) {
			if (loadedIdx != sessionIdx) { // session changed when loading, abort
				return;
			}
			isInit = false;
			times = timesNew;
			timesExtra = [];
			times_stats_table.reset(times.length);
			times_stats_list.reset(times.length);
			table_ctrl.updateTable(true);
			sessionData[loadedIdx] = sessionData[loadedIdx] || {
				'name': loadedIdx,
				'opt': {}
			};
			sessionData[loadedIdx]['stat'] = [times.length].concat(times_stats_list.getAllStats());
			sessionData[loadedIdx]['date'] = [(times[0] || [])[3], (times.at(-1) || [])[3]];
			kernel.setProp('sessionData', JSON.stringify(sessionData));
			if (kernel.isDialogShown('ssmgr')) {
				genMgrTable();
			}
			kernel.pushSignal('session', 'load');
		}

		function load() {
			return storage.get(sessionIdx).then(sessionLoaded.bind(undefined, sessionIdx));
		}

		function save(startIdx) {
			sessionData[sessionIdx]['stat'] = [times.length].concat(times_stats_list.getAllStats());
			sessionData[sessionIdx]['date'] = [(times[0] || [])[3], (times.at(-1) || [])[3]];
			kernel.setProp('sessionData', JSON.stringify(sessionData));
			return storage.set(sessionIdx, times, startIdx);
		}

		function mgrClick(e) {
			var target = $(e.target);
			if (!target.is('td, th, select') || !target.hasClass('click') && !target.is('select')) {
				return;
			}
			var row = target.parent();
			while (!row.is('tr')) {
				row = row.parent();
			}
			var child = row.children();
			if (child.length < 5) {
				child = row.prev().children();
			}
			var rank = ~~child.first().html().replace(/-.*$/, "");
			var idx = ssSorted[rank - 1];
			switch (target.attr('data') || target.val()) {
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
				case 'm': //append current session to
					mergeSessionTo(idx, false);
					break;
				case 'md': //merge and dedupe
					mergeSessionTo(idx, true);
					break;
				case 'o': //sort current session by date
					sortSession();
					break;
				case 'p': //split current session
					splitSession();
					break;
				case 'e':
					expandRankGroup(target.parent());
					return;
				case 'g':
					byGroup = false;
					break;
				case 'gn':
					byGroup = 'name';
					break;
				case 'gs':
					byGroup = 'scr';
					break;
				case 'v':
					storage.get(idx).then(function(newTimes) {
						exportCSV(new TimeStat([], newTimes.length, function(times, idx) {
							return (times[idx][0][0] == -1) ? -1 : (~~((times[idx][0][0] + times[idx][0][1]) / roundMilli)) * roundMilli;
						}.bind(undefined, newTimes)), function(times, idx) {
							return times[idx];
						}.bind(undefined, newTimes), 0, newTimes.length);
					});
					break;
				default:
					return;
			}
			kernel.blur();
			fixSessionSelect();
			genMgrTable();
		}

		function splitSession() {
			var n_split = $.prompt(STATS_PROMPTSPL.replace('%s', sessionIdent(sessionIdx)), ~~(times.length / 2));
			if (n_split == null) {
				return;
			}
			n_split = ~~n_split;
			if (n_split < 1 || n_split > times.length - 1) {
				$.alert(STATS_ALERTSPL);
				return;
			}
			var curSessionIdx = sessionIdx;
			var targetTimes = times.slice(-n_split);
			initNewSession();
			storage.set(sessionIdx, targetTimes).then(function() {
				sessionIdx = curSessionIdx;
				times = times.slice(0, -n_split);
				timesExtra = [];
				times_stats_table.reset();
				times_stats_list.reset();
				save();
				sessionLoaded(sessionIdx, times);
			});
		}

		function mergeSessionTo(idx, dedup) {
			if (sessionIdx == idx || !$.confirm(STATS_ALERTMG.replace('%f', sessionIdent(sessionIdx)).replace('%t', sessionIdent(idx)))) {
				return;
			}
			var prevSession = sessionIdx;
			storage.get(idx).then(function(timesNew) {
				Array.prototype.push.apply(timesNew, times);
				if (dedup) {
					timesNew = getSortedTimesByDate(timesNew, true);
				}
				return storage.set(idx, timesNew);
			}).then(function(timesNew) {
				delete sessionData[idx]['stat'];
				sessionData[sessionIdx]['date'] = [(timesNew[0] || [])[3], (timesNew.at(-1) || [])[3]];
				kernel.setProp('sessionData', JSON.stringify(sessionData));
				loadSession(idx);
				doSessionDeletion(prevSession);
			});
		}

		function sortSession() {
			var timesNew = getSortedTimesByDate(times);
			var cntdiff = 0;
			for (var i = 0; i < times.length; i++) {
				if (timesNew[i] != times[i]) {
					cntdiff++;
				}
			}
			if (cntdiff == 0) {
				logohint.push(LGHINT_SORT0);
				return;
			}
			if (!$.confirm(STATS_SSMGR_SORTCFM.replace('%d', cntdiff))) {
				return;
			}
			times = timesNew;
			timesExtra = [];
			times_stats_table.reset();
			times_stats_list.reset();
			save();
			sessionLoaded(sessionIdx, times);
		}

		function getMgrRowAtRank(rank) {
			var idx = ssSorted[rank - 1];
			var ssData = sessionData[idx];
			var ssStat = ['?/?', '?'];
			if ('stat' in ssData) {
				var s = ssData['stat'];
				ssStat[0] = (s[0] - s[1]) + '/' + s[0];
				ssStat[1] = kpround(s[2]);
			}
			var ops = STATS_SSMGR_OPS.split('|');
			var sel = '<select>' +
				'<option value="">...</option>' +
				'<option value="r">' + ops[0] + '</option>' +
				'<option value="+">' + ops[1] + '</option>' +
				'<option value="' + (idx == sessionIdx ? ('p">' + ops[2]) : ('m">' + ops[3])) + '</option>' +
				'<option value="' + (idx == sessionIdx ? ('o">' + ops[5]) : ('md">' + ops[6])) + '</option>' +
				'<option value="x">' + ops[4] + '</option>' +
				'<option value="v">' + STATS_EXPORTCSV + '</option>' +
				'</select>';
			var uClk = rank == 1 ? '<td></td>' : '<td class="click" data="u">&#8593;</td>';
			var dClk = rank == ssSorted.length ? '<td></td>' : '<td class="click" data="d">&#8595;</td>';
			var scrTd = '<td>' + scramble.getTypeName(ssData['opt']['scrType'] || '333') + '</td>';
			var ssTd0 = '<td>' + ssStat[0] + '</td>';
			var ssTd1 = '<td>' + ssStat[1] + '</td>';
			var dateVal = mathlib.time2str((sessionData[idx]['date'] || [])[1], '%Y-%M-%D');
			return '<tr class="' + (idx == sessionIdx ? 'selected mhide' : 'mhide') + '">' +
				'<td class="click" data="s">' + rank + '-' + ssData['name'] + (idx == sessionIdx ? '*' : '') + '</td>' +
				ssTd0 + ssTd1 +
				'<td>' + dateVal + '</td>' +
				scrTd +
				'<td>' + (ssData['opt']['phases'] || 1) + '</td>' +
				uClk + dClk +
				'<td class="seltd">' + sel + '</td>' +
				'</tr>' +

				'<tr class="' + (idx == sessionIdx ? 'selected ' : '') + 'mshow t">' +
				'<td class="click" data="s" rowspan=2>' + rank + '-' + ssData['name'] + (idx == sessionIdx ? '*' : '') + '</td>' +
				ssTd0 + scrTd + uClk + dClk +
				'</tr>' +
				'<tr class="' + (idx == sessionIdx ? 'selected ' : '') + 'mshow b">' +
				ssTd1 +
				'<td>' + dateVal + '&nbsp;' + (ssData['opt']['phases'] || 1) + 'P.</td>' +
				'<td class="seltd" colspan=2>' + sel + '</td>' +
				'</tr>';
		}

		function getMgrRowAtGroup(group) {
			var isInGroup = false;
			var ssNames = [];
			for (var i = 0; i < group.length; i++) {
				var idx = ssSorted[group[i]];
				isInGroup = isInGroup || sessionIdx == idx;
				ssNames.push(sessionData[idx]['name'] + '(' + scramble.getTypeName(sessionData[idx]['opt']['scrType'] || '333') + ')');
			}
			ssNames = ssNames.join(', ');
			if (ssNames.length > 45) {
				ssNames = ssNames.slice(0, 42) + '...';
			}
			return '<tr' + (isInGroup ? ' class="selected"' : '') + '>' +
				'<td class="click" data="e" colspan=9 style="text-align:left;">' +
				(isInGroup ? '*' : '') + '[+] ' + group.length + ' session(s): ' + ssNames + '</td></tr>';
		}

		function expandRankGroup(curTr) {
			for (var elem = curTr.next(); elem.is(":hidden"); elem = elem.next()) {
				elem.css('display', '');
			}
			curTr.remove();
		}

		var byGroup = false;

		function genMgrTable() {
			fixRank();
			ssmgrTable.empty().append(
				'<tr class="mhide"><th class="click" data=' + (byGroup == 'name' ? '"g">[+]' : '"gn">[-]') + ' ' + STATS_SSMGR_NAME + '</th><th>' +
				STATS_SOLVE + '</th><th>' + STATS_AVG +
				'</th><th>' + STATS_DATE +
				'</th><th class="click" data=' + (byGroup == 'scr' ? '"g">[+]' : '"gs">[-]') + ' ' + SCRAMBLE_SCRAMBLE +
				'</th><th>P.</th><th colspan=3>OP</th></tr>' +
				'<tr class="mshow t"><th rowspan=2 class="click" data=' + (byGroup == 'name' ? '"g">[+]' : '"gn">[-]') + ' ' + STATS_SSMGR_NAME + '</th><th>' +
				STATS_SOLVE + '</th><th class="click" data=' + (byGroup == 'scr' ? '"g">[+]' : '"gs">[-]') + ' ' + SCRAMBLE_SCRAMBLE +
				'</th><th colspan=2 rowspan=2>OP</th></tr>' +
				'<tr class="mshow b"><th>' + STATS_AVG + '</th><th>' + STATS_DATE + ' & P.</th></tr>'
			);

			var groups = [];
			var lastGKey = NaN;
			for (var i = 0; i < ssSorted.length; i++) {
				var ssData = sessionData[ssSorted[i]];
				var gKey = byGroup == 'scr' ? (ssData['opt'] || {})['scrType'] : ssData[byGroup];
				if (byGroup && gKey == lastGKey) {
					groups.at(-1).push(i);
				} else {
					groups.push([i]);
					lastGKey = gKey;
				}
			}
			for (var i = 0; i < groups.length; i++) {
				if (groups[i].length == 1) {
					ssmgrTable.append(getMgrRowAtRank(groups[i][0] + 1));
				} else {
					ssmgrTable.append(getMgrRowAtGroup(groups[i]));
					for (var j = 0; j < groups[i].length; j++) {
						ssmgrTable.append($(getMgrRowAtRank(groups[i][j] + 1)).hide());
					}
				}
			}
			ssmgrTable.unbind('click').click(mgrClick).unbind('change').change(mgrClick);
		}

		function showMgrTable() {
			genMgrTable();
			kernel.showDialog([ssmgrDiv, 0, undefined, 0, [STATS_SSMGR_ORDER, function() {
				if (!$.confirm(STATS_SSMGR_ODCFM)) {
					return false;
				}
				var ssSorted = [];
				for (var i = sessionIdxMin; i <= sessionIdxMax; i++) {
					ssSorted.push(i);
				}
				ssSorted.sort(function(a, b) {
					var idxa = scramble.getTypeIdx(sessionData[a]['opt']['scrType'] || '333');
					var idxb = scramble.getTypeIdx(sessionData[b]['opt']['scrType'] || '333');
					return idxa == idxb ? (sessionData[a]['rank'] - sessionData[b]['rank']) : (idxa - idxb);
				});
				for (var i = 0; i < ssSorted.length; i++) {
					sessionData[ssSorted[i]]['rank'] = i + 1;
				}
				fixRank();
				fixSessionSelect();
				genMgrTable();
				return false;
			}]], 'ssmgr', STATS_SSMGR_TITLE);
		}

		function procSignal(signal, value) {
			if (signal == 'property') {
				if (value[2] != 'set' && value[2] != 'session' && !value[0].startsWith('session')) {
					sessionData[sessionIdx]['opt'] = kernel.getSProps();
					kernel.setProp('sessionData', JSON.stringify(sessionData));
				}
				if (value[0] == 'session' && ~~value[1] != sessionIdx) {
					loadSession(value[1]);
				} else if (value[0] == 'sessionData') {
					sessionData = JSON.parse(value[1]);
					if (value[2] != 'set') {
						fixSessionSelect();
					}
				} else if (value[0] == 'sessionN') {
					sessionIdxMax = value[1];
				} else if (value[0] == 'scrType') {
					curScrType = value[1];
					if (value[2] == 'modify' && kernel.getProp('scr2ss')) {
						createSession(undefined, false);
					}
				} else if (value[0] == 'statclr') {
					if (value[1]) {
						funcButton.val('X').unbind('click').click(clearSession);
					} else {
						funcButton.val('+').unbind('click').click(createSession);
					}
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

		function importSessions(data) {
			if (!data || data.length == 0) {
				return;
			}
			var currentSessionIdx = sessionIdx;
			for (var i = 0; i < data.length; i++) {
				//session = {'name': name, 'opt': {key: value}, 'times': times}
				var sessionDetail = data[i];
				var opt = kernel.getSProps();
				for (var key in sessionDetail['opt']) {
					opt[key] = sessionDetail['opt'][key];
				}
				sessionIdx  = ++sessionIdxMax;
				sessionData[sessionIdx] = {
					'name': sessionDetail['name'] || sessionIdx,
					'opt': opt,
					'rank': sessionIdxMax
				};
				kernel.setProp('sessionN', sessionIdxMax);
				times = sessionDetail['times'];
				timesExtra = [];
				times_stats_table.reset(times.length);
				times_stats_list.reset(times.length);
				save();
			}
			fixSessionSelect();
			loadSession(currentSessionIdx);
			showMgrTable();
			logohint.push(LGHINT_IMPORTED.replace('%d', data.length));
			return data.length;
		}

		function rank2idx(rank) {
			return ssSorted[rank - 1];
		}

		$(function() {
			kernel.regListener('ssmgr', 'property', procSignal);
			kernel.regListener('ssmgr', 'ctrl', procSignal, /^stats$/);
			kernel.regProp('stats', 'sessionN', ~5, 'Number of Sessions', [15]);
			kernel.regProp('stats', 'sessionData', ~5, 'Session Data', ['{}']);
			sessionIdxMax = kernel.getProp('sessionN');
			sessionData = JSON.parse(kernel.getProp('sessionData'));
			fixSessionSelect();
			kernel.setProp('sessionData', JSON.stringify(sessionData));

			kernel.regProp('stats', 'session', ~5, 'Current Session Index', [1]);
		});

		return {
			getSelect: function() {
				return select;
			},
			showMgrTable: showMgrTable,
			importSessions: importSessions,
			getButton: function() {
				return funcButton;
			},
			rank2idx: rank2idx,
			load: load,
			save: save
		}

	})();

	function clearText() {
		stext.val('');
	}

	function getStats(times_stats, timesAt, title) {
		var theStats = times_stats.getAllStats();
		var numdnf = theStats[0];
		var sessionavg = times_stats.runAvgMean(0, times.length)[0];
		var sessionmean = theStats[1];
		var length = times_stats.timesLen;

		var tstr = "";
		if (kernel.getProp('printDate') && length > 2) {
			var tstart = timesAt(0);
			var tend = timesAt(length - 1);
			tstr = hlstr[11].replace("%s", mathlib.time2str(tstart && tstart[3]))
				.replace("%e", mathlib.time2str(tend && tend[3]));
			tstr = " (" + tstr + ")";
		}
		var prettyFunc = times_stats_table.prettyFunc || [kpretty, kpround];
		var s = [mathlib.time2str(+new Date / 1000, hlstr[3]) + tstr];
		s.push(hlstr[4].replace("%d", (length - numdnf) + "/" + length) + '\n');
		s.push(hlstr[5]);
		s.push('    ' + hlstr[0] + ": " + prettyFunc[0](times_stats.bestTime));
		s.push('    ' + hlstr[2] + ": " + prettyFunc[0](times_stats.worstTime) + "\n");
		for (var j = 0; j < avgSizes.length; j++) {
			var size = Math.abs(avgSizes[j]);
			if (length >= size) {
				s.push(hlstr[7 - (avgSizes[j] >>> 31)].replace("%mk", size));
				s.push('    ' + hlstr[1] + ": " + prettyFunc[1](times_stats.lastAvg[j][0]) + " (σ = " + trim(times_stats.lastAvg[j][1], 2) + ")");
				s.push('    ' + hlstr[0] + ": " + prettyFunc[1](times_stats.bestAvg(j, 0)) + " (σ = " + trim(times_stats.bestAvg(j, 1), 2) + ")\n");
			}
		}

		s.push(hlstr[8].replace("%v", prettyFunc[1](sessionavg[0])).replace("%sgm", trim(sessionavg[1], 2)).replace(/[{}]/g, ""));
		s.push(hlstr[9].replace("%v", prettyFunc[1](sessionmean) + '\n'));

		if (length != 0) {
			s.push(hlstr[10]);
			var timeStr = [];
			for (var i = 0; i < length; i++) {
				timeStr.push(detailTimeLine(i, timesAt(i), []));
			}
			timeStr = timeStr.join("").slice(0, -2);
			s.push(timeStr);
		}
		s = s.join("\n");
		stext.val(s);
		kernel.showDialog([stext, clearText, undefined, clearText, [STATS_EXPORTCSV, function() {
			exportCSV(times_stats, timesAt, 0, length);
			return false;
		}], [COPY_LANG, function() {
			$.clipboardCopy(s).then(logohint.push.bind(logohint, COPY_LANG));
			return false;
		}]], 'stats', title || STATS_CURSESSION);
		stext[0].select();
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

	function avgSizesStd(val) {
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
		return avgSizesNew;
	}

	function checkStatalU(force) {
		var curValue = kernel.getProp('statalu');
		if (!force && /^\s*([am]o\d+[\s,;]*)+\s*$/.exec(curValue)) {
			return;
		}
		var input = $.prompt('Statistics Details', curValue || 'mo3 ao5 ao12 ao100');
		if (/^\s*([am]o\d+[\s,;]*)+\s*$/.exec(input) && avgSizesStd(input)) {
			kernel.setProp('statalu', input);
		} else {
			if (input != null) {
				$.alert('INVALID VALUES!');
			}
			kernel.setProp('statal', 'mo3 ao5 ao12 ao100');
			kernel.reprop();
		}
	}

	function updateStatalU(statal) {
		var avgSizesNew = avgSizesStd(statal);
		if (!avgSizesNew) {
			kernel.setProp('statal', 'mo3 ao5 ao12 ao100');
			kernel.reprop();
			return;
		}
		avgSizes = avgSizesNew;
		times_stats_table = new TimeStat(avgSizes, times.length, getTableTimeAt());
		times_stats_table.prettyFunc = getMetricPretty();
		crossSessionStats.updateStatal(avgSizes);
		updateUtil(['statal', statal]);
	}

	var curScramble = "";

	var stat1 = 5, stat2 = 12, len1 = 5, len2 = 12;

	var curScrType = '333';

	var roundMilli = 1;

	function procSignal(signal, value) {
		if (signal == 'time') {
			push(value);
		} else if (signal == 'scramble' || signal == 'scrambleX') {
			curScramble = value[1];
		} else if (signal == 'property') {
			if (/^(:?useMilli|timeFormat|stat[12][tl]|statinv)$/.exec(value[0])) {
				roundMilli = kernel.getProp('useMilli') ? 1 : 10;
				if (/^stat[12][tl]$/.exec(value[0])) {
					stat1 = [1, -1][~~kernel.getProp('stat1t')] * kernel.getProp('stat1l');
					stat2 = [1, -1][~~kernel.getProp('stat2t')] * kernel.getProp('stat2l');
					len1 = Math.abs(stat1);
					len2 = Math.abs(stat2);
					times_stats_list = new TimeStat([stat1, stat2], times.length, timeAt);
				} else if (value[0] == 'useMilli') {
					times_stats_table.reset(times.length);
					times_stats_list.reset(times.length);
				}
				table_ctrl.updateTable(false);
				updateUtil(['property', value[0]]);
			} else if (/^stat(sum|thres|[bw]pa)$/.exec(value[0])) {
				updateSumTable();
			} else if (value[0] == 'statssum') {
				updateAvgRow(curDim);
				resultsHeight();
			} else if (value[0] == 'statal') {
				var statal = value[1];
				if (statal == 'u') {
					checkStatalU(value[2] == 'modify');
				}
				statal = kernel.getProp('statal');
				updateStatalU(statal == 'u' ? kernel.getProp('statalu') : statal);
			} else if (value[0] == 'statalu') {
				updateStatalU(value[1]);
			} else if (value[0] == 'trim' || value[0] == 'trimr') {
				times_stats_table.reset(times.length);
				times_stats_list.reset(times.length);
				crossSessionStats.updateStatal(avgSizes);
				table_ctrl.updateTable(false);
				updateUtil(['property', value[0]]);
			} else if (value[0] == 'view') {
				resultsHeight();
			} else if (value[0] == 'statHide') {
				if (value[1]) {
						statOptDiv.hide();
				} else {
						statOptDiv.show();
				}
			} else if (value[0] == 'statsrc') {
				times_stats_table = new TimeStat(avgSizes, times.length, getTableTimeAt());
				times_stats_table.prettyFunc = getMetricPretty();
				table_ctrl.updateTable(true);
			} else if (value[0] == 'wndStat') {
				resultsHeight();
			} else if (value[0] == 'sr_statal') {
				kernel.setProp('sr_statalu', value[1]);
			}
		} else if (signal == 'ctrl' && value[0] == 'stats') {
			if (value[1] == 'clr') {
				sessionManager.getButton().click();
			} else if (value[1] == 'undo') {
				floatCfm.delLast();
			} else if (value[1] == 'OK') {
				floatCfm.setCfm(0);
			} else if (value[1] == '+2') {
				floatCfm.setCfm(2000);
			} else if (value[1] == 'DNF') {
				floatCfm.setCfm(-1);
			} else if (value[1] == 'cfm') {
				floatCfm.proc(times.length - 1);
			} else if (value[1] == 'cmt') {
				floatCfm.proc(times.length - 1, 'comment');
			}
		} else if (signal == 'ashow' && !value) {
			table_ctrl.hideAll();
		} else if (signal == 'button' && value[0] == 'stats' && value[1]) {
			setTimeout(resultsHeight, 50);
		} else if (signal == 'giirecons') {
			var idx = times.length - 1;
			if (idx < 0 || times[idx][1] != value[0]) {
				return;
			}
			rollBackExec(idx, function() {
				times[idx][4] = value[1];
				timesExtra[idx] = null;
			});
			sessionManager.save(idx);
			updateUtil(['giirecons', idx]);
		}
	}

	function resultsHeight() {
		if ($('html').hasClass('m')) {
			scrollDiv.height(Math.max(sumtableDiv.height(), avgRow.height() + title.height() * 2));
		} else if (scrollDiv[0].offsetParent != null) {
			scrollDiv.outerHeight(~~(div.height() - (statOptDiv.is(':hidden') ? 0 : statOptDiv.outerHeight()) - sumtableDiv.outerHeight() - 5));
		}
	}

	$(function() {
		kernel.regListener('stats', 'time', procSignal);
		kernel.regListener('stats', 'scramble', procSignal);
		kernel.regListener('stats', 'scrambleX', procSignal);
		kernel.regListener('stats', 'property', procSignal, /^(:?useMilli|timeFormat|stat(:?sum|thres|[bw]pa|[12][tl]|alu?|inv|Hide|src|ssum)|session(:?Data)?|scrType|phases|trimr?|view|wndStat|sr_.*)$/);
		kernel.regListener('stats', 'ctrl', procSignal, /^stats$/);
		kernel.regListener('stats', 'ashow', procSignal);
		kernel.regListener('stats', 'button', procSignal);
		kernel.regListener('stats', 'giirecons', procSignal);
		kernel.regProp('stats', 'trim', 1, PROPERTY_TRIM, ['p5', ['0', '1', 'p1', 'p5', 'p10', 'p20', 'm'], ['0', '1', '1%', '5%', '10%', '20%', '50%/' + PROPERTY_TRIM_MED]], 1);
		kernel.regProp('stats', 'trimr', 1, PROPERTY_TRIMR, ['a', ['a', '0', '1', 'p1', 'p5', 'p10', 'p20', 'm'], ['auto', '0', '1', '1%', '5%', '10%', '20%', '50%/' + PROPERTY_TRIM_MED]], 1);
		kernel.regProp('stats', 'statsum', 0, PROPERTY_SUMMARY, [true], 1);
		kernel.regProp('stats', 'statthres', 0, PROPERTY_STATTHRES, [false], 1);
		kernel.regProp('stats', 'statbpa', 0, PROPERTY_STATBPA, [false], 1);
		kernel.regProp('stats', 'statwpa', 0, PROPERTY_STATWPA, [false], 1);
		kernel.regProp('stats', 'printScr', 0, PROPERTY_PRINTSCR, [true], 1);
		kernel.regProp('stats', 'printComm', 0, PROPERTY_PRINTCOMM, [true], 1);
		kernel.regProp('stats', 'printDate', 0, PROPERTY_PRINTDATE, [false], 1);
		kernel.regProp('stats', 'imrename', 0, PROPERTY_IMRENAME, [false], 1);
		kernel.regProp('stats', 'scr2ss', 0, PROPERTY_SCR2SS, [false]);
		kernel.regProp('stats', 'statssum', 0, PROPERTY_STATSSUM, [false], 1);
		kernel.regProp('stats', 'statinv', 0, PROPERTY_STATINV, [false], 1);
		kernel.regProp('stats', 'statclr', 0, STATS_STATCLR, [true], 1);
		kernel.regProp('stats', 'absidx', 0, STATS_ABSIDX, [false], 1);

		div.append(
			statOptDiv.append(
				$('<span class="click">').html(STATS_SESSION).click(sessionManager.showMgrTable),
				sessionManager.getSelect(), sessionManager.getButton()),
			sumtableDiv.append(sumtable),
			$('<div class="stattl">').append(scrollDiv.append(table))
		).click(function(e) {
			if ($(e.target).is('input,textarea,select,.click,.chide,.times')) {
				return;
			}
			kernel.setProp('statHide', false);
		});
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
		kernel.regProp('stats', 'stat1t', 1, stattl[0].replace('%d', 1), [0, [0, 1], stattl.slice(2)], 1);
		kernel.regProp('stats', 'stat1l', 2, stattl[1].replace('%d', 1), [5, 3, 1000], 1);
		kernel.regProp('stats', 'stat2t', 1, stattl[0].replace('%d', 2), [0, [0, 1], stattl.slice(2)], 1);
		kernel.regProp('stats', 'stat2l', 2, stattl[1].replace('%d', 2), [12, 3, 1000], 1);
		kernel.regProp('stats', 'rsfor1s', 0, STATS_RSFORSS, [false]);
		kernel.regProp('stats', 'statalu', 5, PROPERTY_STATALU, ['mo3 ao5 ao12 ao100'], 1);
		kernel.regProp('stats', 'statal', 1, PROPERTY_STATAL, ['mo3 ao5 ao12 ao100', ['mo3 ao5 ao12 ao100', 'mo3 ao5 ao12 ao25 ao50 ao100', 'mo3 ao5 ao12 ao25 ao50 ao100 ao200 ao500 ao1000 ao2000 ao5000 ao10000', 'u'],
			['mo3 ao5 ao12 ao100', 'mo3 ao5 ao12 ao25 ao50 ao100', 'mo3 ao5 ao12 ao25 ao50 ao100 ao200 ao500 ao1000 ao2000 ao5000 ao10000', 'Custom']
		], 1);
		kernel.regProp('stats', 'delmul', 0, PROPERTY_DELMUL, [true]);
		kernel.regProp('ui', 'statHide', ~0, 'Hide Session Title', [false]);

		kernel.setProp('sr_statalu', kernel.getProp('sr_statal'));
	});

	var statUtils = {};
	function regUtil(name, callback) {
		statUtils[name] = callback;
	}

	var timesExtra = [];
	var extraFuncs = {};
	var metricsExtra = {};

	// metricInfo = [name, prettySingle, prettyAverage]
	function regExtraInfo(key, genFunc, metricInfo) {
		extraFuncs[key] = genFunc;
		if (metricInfo) {
			metricsExtra[key] = [genFunc, metricInfo];
		}
	}

	function getExtraInfo(key, idx) {
		if (idx >= times.length || !(key in extraFuncs)) {
			return;
		}
		if (!timesExtra[idx]) {
			timesExtra[idx] = {};
		}
		if (!(key in timesExtra[idx])) {
			timesExtra[idx][key] = extraFuncs[key](timesAt(idx), idx);
		}
		return timesExtra[idx][key];
	}

	function getValidMetrics() {
		var metricsValid = {};
		// check 10 solves at most
		for (var metric in metricsExtra) {
			for (var i = Math.max(times.length - 10, 0); i < times.length; i++) {
				var val = getExtraInfo(metric, i);
				if (val != -1) {
					metricsValid[metric] = metricsExtra[metric][1];
					break;
				}
			}
		}
		return metricsValid;
	}

	function getMetricPretty(metric) {
		if (!metric) {
			var statSrc = kernel.getProp('statsrc', 't');
			if (statSrc[0] == 'm') {
				metric = statSrc.slice(1);
			}
		}
		if (!metricsExtra[metric]) {
			return [kpretty, kpround];
		} else {
			var info = metricsExtra[metric][1];
			return [info[1], info[2] || info[1]];
		}
	}

	function getCommentNumber(idx, times) {
		var ret = -1;
		(times[2] || "").replace(/[0-9]+(\.[0-9]+)?/g, function(m) {
			if (idx == 0) {
				ret = parseFloat(m) * 1000;
			}
			idx--;
		});
		return ret;
	}

	for (var i = 0; i < 5; i++) {
		regExtraInfo('comment' + i,
			getCommentNumber.bind(null, i),
			[STATS_COMMENT + (i + 1), function(val) {
				return "" + (val >= 0 ? (val * 1e-3).toFixed(kernel.getProp('useMilli') ? 3 : 2).replace(/\.?0+$/, '') : 'N/A');
			}, function(val) {
				return "" + (val >= 0 ? (val * 1e-3).toFixed(kernel.getProp('useMilli') ? 3 : 2) : 'DNF');
			}]
		);
	}

	regExtraInfo('commentmbld',
		function(times) {
			if (times[0][0] < 0) {
				return -1;
			}
			var data = [];
			(times[2] || "").replace(/[0-9]+/g, function(m) {
				data.push(parseInt(m));
			});
			if (data.length < 2 || data[0] < 2 || data[0] > data[1] || data[0] * 2 < data[1] || data[1] >= 255) {
				return -1;
			}
			var score = data[0] * 2 - data[1];
			var time = ~~(times[0][0] + times[0][1]);
			return (255 - score) * 1024 + time / Math.pow(2, 26) + data[0] / Math.pow(2, 34);
		}, ['MBLD', function(val) {
			if (val < 0) {
				return 'DNF';
			} else if (val > 255 * 1024 + 1) {
				return 'N/A';
			}
			var score = 255 - Math.floor(val) / 1024;
			var solved = val * Math.pow(2, 34) & 0xff;
			var time = ~~((val % 1) * Math.pow(2, 26));
			return "" + solved + "/" + (solved * 2 - score) + " " + kernel.pretty(time).split('.')[0];
		}, function(val) {
			if (val < 0) {
				return "DNF";
			}
			var score = 255 - Math.floor(val) / 1024;
			return "" + (val >= 0 ? score.toFixed(kernel.getProp('useMilli') ? 3 : 2) : 'DNF');
		}]
	);

	return {
		importSessions: sessionManager.importSessions,
		getReviewUrl: getReviewUrl,
		pretty: pretty,
		getStat12: function() {
			return [stat1, stat2, len1, len2];
		},
		getTimesStatsList: function() {
			return times_stats_list;
		},
		getTimesStatsTable: function() {
			return times_stats_table;
		},
		getSessionManager: function() {
			return sessionManager;
		},
		getSortedTimesByDate: getSortedTimesByDate,
		trim: trim,
		timesAt: timesAt,
		timeAt: timeAt,
		infoClick: infoClick,
		regUtil: regUtil,
		regExtraInfo: regExtraInfo,
		getExtraInfo: getExtraInfo
	}
}, [kernel.pretty, kernel.round, kernel.pround]);
