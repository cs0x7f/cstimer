"use strict";

var crossSessionStats = execMain(function(kpretty, round, kpround) {
	var langStr = STATS_XSESSION_DATE.split('|');
	var toolDiv = $('<div />').css('text-align', 'center').css('font-size', '0.7em')
	var infoDiv = $('<div />');
	var nameSelect = $('<select>');
	var dateSelect = $('<select>').append(
		$('<option>').val(-1).html(langStr[0]),
		$('<option>').val(1).html(langStr[1]),
		$('<option>').val(7).html(langStr[2]),
		$('<option>').val(30).html(langStr[3]),
		$('<option>').val(365).html(langStr[4])
	).val(-1);
	var scrSelect = $('<select>');
	var calcSpan = $('<span class="click">' + STATS_XSESSION_CALC + '</span>');
	var hugeStats = new TimeStat([], 0, hugeTimeAt);
	var hugeTimes = [];
	var roundMilli = 1;

	var hlstr = STATS_STRING.split('|');
	for (var i = 0; i < 13; i++) {
		hlstr[i] = hlstr[i] || '';
	}

	function hugeTimeAt(idx) {
		return (hugeTimes[idx][0][0] == -1) ? -1 : (~~((hugeTimes[idx][0][0] + hugeTimes[idx][0][1]) / roundMilli)) * roundMilli;
	}

	function hugeTimesAt(idx) {
		return hugeTimes[idx];
	}

	function updateInfo() {
		hugeTimes = [];
		roundMilli = kernel.getProp('useMilli') ? 1 : 10;
		var loadproc = Promise.resolve();
		var sessionN = ~~kernel.getProp('sessionN');
		var sessionData = JSON.parse(kernel.getProp('sessionData'));
		var selectedName = nameSelect.val();
		var selectedScr = scrSelect.val();
		var dateThreshold = dateSelect.val() == -1 ? -1 : (~~(+new Date / 1000) - dateSelect.val() * 86400);
		for (var i = 0; i < sessionN; i++) {
			var idx = stats.getSessionManager().rank2idx(i + 1);
			if (selectedName != '*' && sessionData[idx]['name'] != selectedName) {
				continue;
			}
			if (selectedScr != '*' && (sessionData[idx]['opt']['scrType'] || '333') != selectedScr) {
				continue;
			}
			loadproc = loadproc.then((function(idx) {
				return new Promise(function(resolve) {
					storage.get(idx).then(function(newTimes) {
						for (var i = 0; i < newTimes.length; i++) {
							if ((newTimes[i][3] || 0) < dateThreshold) {
								continue;
							}
							hugeTimes.push(newTimes[i]);
						}
						resolve();
					});
				});
			}).bind(undefined, idx));
		}
		loadproc.then(function() {
			hugeTimes = stats.getSortedTimesByDate(hugeTimes);
			hugeStats.reset(hugeTimes.length);
			updateSpan();
		});
	}

	function updateSpan() {
		var theStats = hugeStats.getAllStats();
		var numdnf = theStats[0];
		var sessionmean = theStats[1];

		var totalTime = 0;
		for (var i = 0; i < hugeTimes.length; i++) {
			totalTime += hugeTimes[i][0][1];
		}

		var s = [];
		s.push('<span class="click" data="tt">' + hlstr[4].replace("%d", (hugeStats.timesLen - numdnf) + "/" + hugeStats.timesLen) + ', ' + hlstr[9].replace("%v", kpround(sessionmean)) + '</span>\n');
		s.push('<span>' + hlstr[12].replace("%d", kpretty(totalTime)) + '</span>\n');
		s.push(hlstr[0] + ": " + '<span class="click" data="bs">' + kpretty(hugeStats.bestTime) + '</span>');
		s.push(' | ' + hlstr[2] + ": " + '<span class="click" data="ws">' + kpretty(hugeStats.worstTime) + "</span>\n");
		var hasTable = false;
		var tableHead = '<table class="table"><tr><td></td><td>' + hlstr[1] + '</td><td>' + hlstr[0] + '</td></tr>';
		var avgSizes = hugeStats.avgSizes;
		for (var j = 0; j < avgSizes.length; j++) {
			var size = Math.abs(avgSizes[j]);
			if (hugeStats.timesLen >= size) {
				hasTable || (hasTable = true, s.push(tableHead));
				s.push('<tr><td>' + hlstr[7 - (avgSizes[j] >>> 31)].replace("%mk", size));
				s.push('<td><span class="click" data="c' + 'am' [avgSizes[j] >>> 31] + j + '">' + kpround(hugeStats.lastAvg[j][0]) + " (σ=" + stats.trim(hugeStats.lastAvg[j][1], 2) +
					')</span></td>');
				s.push('<td><span class="click" data="b' + 'am' [avgSizes[j] >>> 31] + j + '">' + kpround(hugeStats.bestAvg(j, 0)) + " (σ=" + stats.trim(hugeStats.bestAvg(j, 1), 2) +
					')</span></td></tr>');
			}
		}
		hasTable && s.push('</table>');
		s = s.join("");
		infoDiv.html(s.replace(/\n/g, '<br>'));
	}

	function updateSelector() {
		var isModified = false;
		var curSessionData = JSON.parse(kernel.getProp('sessionData'));
		$.each(curSessionData, function(idx, val) {
			if (!prevSessionData[idx] ||
				val['name'] != prevSessionData[idx]['name'] ||
				(val['opt'] || {})['scrType'] != (prevSessionData[idx]['opt'] || {})['scrType']) {
				isModified = true;
			}
		});
		prevSessionData = curSessionData;
		if (!isModified) {
			return;
		}
		var nameList = [];
		var scrList = [];
		nameSelect.empty().append($('<option />').val('*').html(STATS_XSESSION_NAME));
		scrSelect.empty().append($('<option />').val('*').html(STATS_XSESSION_SCR));
		$.each(curSessionData, function(idx, val) {
			var curLabel = val['name'];
			if ($.inArray(curLabel, nameList) == -1) {
				nameList.push(curLabel);
				nameSelect.append($('<option />').val(curLabel).html(curLabel));
			}
			var curScr = (val['opt'] || {})['scrType'] || '333';
			if ($.inArray(curScr, scrList) == -1) {
				scrList.push(curScr);
				scrSelect.append($('<option />').val(curScr).html(scramble.getTypeName(curScr)));
			}
		});
	}
	var myfdiv = null;

	function execFunc(fdiv, signal) {
		myfdiv = fdiv;
		if (!fdiv) {
			return;
		}
		if (/^scr/.exec(signal)) {
			return;
		}
		updateSelector();
		fdiv.empty().append(toolDiv);
		calcSpan.unbind('click').click(updateInfo);
		infoDiv.unbind('click').click(function(e) {
			stats.infoClick(hugeStats, hugeTimesAt, e);
		});
	}

	var prevSessionData = {};
	function procSignal(signal, value) {
		if (value[0] == 'sessionData' && myfdiv) {
			updateSelector();
		}
	}

	$(function() {
		toolDiv.append(nameSelect, dateSelect, scrSelect, ' ', calcSpan, '<br>', infoDiv);
		if (typeof tools != "undefined") {
			tools.regTool('hugestats', TOOLS_HUGESTATS, execFunc);
		}
		kernel.regListener('labelstat', 'property', procSignal, /^sessionData$/);
	});

	return {
		update: $.noop,
		updateStatal: function(avgSizes) {
			hugeStats = new TimeStat(avgSizes, 0, hugeTimeAt);
		}
	}
}, [kernel.pretty, kernel.round, kernel.pround]);
