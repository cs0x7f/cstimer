var stattool = execMain(function(kpretty, round, kpround) {

	var infoDiv = $('<div />').css('text-align', 'center').css('font-size', '0.7em');

	var hlstr = STATS_STRING.split('|');
	for (var i = 0; i < 13; i++) {
		hlstr[i] = hlstr[i] || '';
	}

	function updateInfo() {
		if (!isEnable) {
			return;
		}

		var times_stats_table = stats.getTimesStatsTable();
		var avgSizes = times_stats_table.avgSizes;
		var theStats = times_stats_table.getAllStats();
		var numdnf = theStats[0];
		var sessionmean = theStats[1];

		var totalTime = 0;
		for (var i = 0; i < times_stats_table.timesLen; i++) {
			totalTime += stats.timesAt(i)[0][1];
		}
		var prettyFunc = times_stats_table.prettyFunc || [kpretty, kpround];
		var s = [];
		s.push('<span class="click" data="tt">' + hlstr[4].replace("%d", (times_stats_table.timesLen - numdnf) + "/" + times_stats_table.timesLen) + ', ' + hlstr[9].replace("%v", prettyFunc[1](sessionmean)) + '</span>\n');
		s.push('<span>' + hlstr[12].replace("%d", kpretty(totalTime)) + '</span>\n');
		s.push(hlstr[0] + ": " + '<span class="click" data="bs">' + prettyFunc[0](times_stats_table.bestTime) + '</span>');
		s.push(' | ' + hlstr[2] + ": " + '<span class="click" data="ws">' + prettyFunc[0](times_stats_table.worstTime) + "</span>\n");
		var hasTable = false;
		var tableHead = '<table class="table"><tr><td></td><td>' + hlstr[1] + '</td><td>' + hlstr[0] + '</td></tr>';
		for (var j = 0; j < avgSizes.length; j++) {
			var size = Math.abs(avgSizes[j]);
			if (times_stats_table.timesLen >= size) {
				hasTable || (hasTable = true, s.push(tableHead));
				s.push('<tr><td>' + hlstr[7 - (avgSizes[j] >>> 31)].replace("%mk", size));
				s.push('<td><span class="click" data="c' + 'am' [avgSizes[j] >>> 31] + j + '">' + prettyFunc[1](times_stats_table.lastAvg[j][0]) + " (σ=" + stats.trim(times_stats_table.lastAvg[j][1], 2) +
					')</span></td>');
				s.push('<td><span class="click" data="b' + 'am' [avgSizes[j] >>> 31] + j + '">' + prettyFunc[1](times_stats_table.bestAvg(j, 0)) + " (σ=" + stats.trim(times_stats_table.bestAvg(j, 1), 2) +
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
		fdiv.empty().append(infoDiv.unbind('click').click(function(e) {
			stats.infoClick(stats.getTimesStatsTable(), stats.timesAt, e);
		}));
		updateInfo();
	}

	$(function() {
		if (typeof tools != "undefined") {
			tools.regTool('stats', TOOLS_STATS, execFunc);
		}
		stats.regUtil('stattool', updateInfo);
	});

	return {
		update: updateInfo
	}
}, [kernel.pretty, kernel.round, kernel.pround]);
