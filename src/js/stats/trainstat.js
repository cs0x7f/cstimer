var trainStat = execMain(function() {
	var isEnable;

	var div = $('<div style="font-size:0.9em;" />');
	var table = $('<table class="table">');
	var methodSelect = $('<select>');
	var tableTh = $('<tr>').append($('<th colspan=2 style="padding:0;">').append(methodSelect), '<th>N</th><th>best</th><th>mean</th>');

	function timeMapAt(idxMap, idx) {
		return stats.timeAt(idxMap[idx]);
	}

	function update() {
		if (!isEnable) {
			return;
		}
		var nsolv = stats.getTimesStatsTable().timesLen;
		var nrec = nsolv;
		var method = methodSelect.val() || 'PLL';
		var ident = cubeutil.getIdentData(method);
		var nvalid = 0;
		var caseCnts = [];
		for (var s = nsolv - 1; s >= nsolv - nrec; s--) {
			var caseData = stats.getExtraInfo('scramcase_' + method, s)
			if (!caseData) {
				continue;
			}
			var cur = caseData[0];
			caseCnts[cur] = caseCnts[cur] || [];
			caseCnts[cur].push(s);
		}

		var trTpl =
			'<tr><td rowspan=2 style="padding-bottom:0;padding-top:0;">$0</td>' +
			'<td rowspan=2 style="padding:0"><img/></td>' +
			'<td rowspan=2 style="padding-bottom:0;padding-top:0;">$1</td>' +
			'<td colspan=4 style="padding:0;">' +
			'<span class="cntbar" style="height:0.25em;float:left;border:none;width:$2%;">&nbsp;</span>' +
			'<span class="cntbar sty2" style="height:0.25em;float:left;border:none;width:$3%;">&nbsp;</span></td></tr>' +
			'<tr>' +
			'<td style="padding-bottom:0;padding-top:0;">$4</td>' +
			'<td style="padding-bottom:0;padding-top:0;">$5</td>' +
			'</tr>';

		table.empty().append(tableTh);

		var maxSubt = 0;
		for (var i = ident[2]; i < ident[3]; i++) {
			if (!caseCnts[i]) {
				continue;
			}
			var statObj = new TimeStat([], caseCnts[i].length, timeMapAt.bind(null, caseCnts[i]));
			var statRet = statObj.getAllStats();
			var nsuc = caseCnts[i].length - statRet[0];
			if (nsuc == 0) {
				caseCnts[i] = null;
				continue;
			}
			var mean = statRet[1];
			var best = statObj.bestTime;
			caseCnts[i] = [best, mean, nsuc, caseCnts[i].length];
			maxSubt = Math.max(maxSubt, mean);
		}

		for (var i = ident[2]; i < ident[3]; i++) {
			if (!caseCnts[i]) {
				continue;
			}
			var caseCnt = caseCnts[i];
			var tr = $('<tr>');
			var param = ident[1](i);

			var trdata = [
				param[2],
				caseCnt[2] + '/' + caseCnt[3],
				caseCnt[0] / maxSubt * 100,
				(caseCnt[1] - caseCnt[0]) / maxSubt * 100,
				kernel.pretty(caseCnt[0]),
				kernel.pround(caseCnt[1])
			];
			var curTr = trTpl;
			for (var j = 0; j < 6; j++) {
				curTr = curTr.replace(new RegExp('\\$' + j, 'g'), trdata[j]);
			}
			curTr = $(curTr);
			var img = curTr.find('img');
			img.css({
				'width': '2em',
				'height': '2em',
				'display': 'block'
			});
			ident[1](i, img);
			table.append(curTr);
			nvalid++;
		}
		methodSelect.unbind('change').change(procClick);
		if (nvalid == 0) {
			tableTh.after('<tr><td colspan=5>' + TOOLS_RECONS_NODATA + '</td></tr>');
			return;
		}
	}

	function procClick(e) {
		if (e.type == 'change') {
			update();
			return;
		}
	}

	function execFunc(fdiv, signal) {
		if (!(isEnable = (fdiv != undefined))) {
			return;
		}
		if (/^scr/.exec(signal)) {
			return;
		}
		fdiv.empty().append(div.append(table));
		update();
	}

	function calcCaseExtra(method, time, idx) {
		var data = cubeutil.getScrambledState([null, time[1]]);
		if (!data) {
			return;
		}
		var cur = cubeutil.getIdentData(method)[0](data.toFaceCube());
		return [cur];
	}

	$(function() {
		if (typeof tools != "undefined") {
			tools.regTool('trainstat', TOOLS_TRAINSTAT, execFunc);
		}
		stats.regUtil('trainstat', update);
		var methods = ['PLL', 'OLL', 'COLL', 'ZBLL', 'CLL'];
		for (var i = 0; i < methods.length; i++) {
			methodSelect.append('<option value="' + methods[i] + '">' + methods[i] + '</option>');
			stats.regExtraInfo('scramcase_' + methods[i], calcCaseExtra.bind(null, methods[i]));
		}
	});
});
