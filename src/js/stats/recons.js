var recons = execMain(function() {
	var isEnable;

	var div = $('<div style="font-size:0.9em;" />');
	var table = $('<table class="table">');
	var rangeSelect = $('<select>');
	var methodSelect = $('<select>');
	var requestBack = $('<span class="click" />');
	var tableTh = $('<tr>').append($('<th style="padding:0;">').append(methodSelect), '<th>insp</th><th>exec</th><th>turn</th><th>fps</th>');

	function doMove(c, d, moveStr, isInv) {
		var movere = /^([URFDLB]w?|[EMSyxz]|2-2[URFDLB]w)(['2]?)@(\d+)$/;
		var m = movere.exec(moveStr);
		if (!m) {
			return;
		}
		var face = m[1];
		var pow = "2'".indexOf(m[2] || '-') + 2;
		if (isInv) {
			pow = 4 - pow;
		}
		c.tstamp = ~~m[3];
		var axis = 'URFDLB'.indexOf(face);
		if (axis != -1) {
			var m = axis * 3 + pow % 4 - 1
			m = mathlib.CubieCube.rotMulM[c.ori][m];
			mathlib.CubieCube.EdgeMult(c, mathlib.CubieCube.moveCube[m], d);
			mathlib.CubieCube.CornMult(c, mathlib.CubieCube.moveCube[m], d);
			c.init(d.ca, d.ea);
			return m;
		}
		axis = 'UwRwFwDwLwBw'.indexOf(face);
		if (axis != -1) {
			axis >>= 1;
			var m = (axis + 3) % 6 * 3 + pow % 4 - 1
			m = mathlib.CubieCube.rotMulM[c.ori][m];
			mathlib.CubieCube.EdgeMult(c, mathlib.CubieCube.moveCube[m], d);
			mathlib.CubieCube.CornMult(c, mathlib.CubieCube.moveCube[m], d);
			c.init(d.ca, d.ea);
			var rot = [3, 15, 17, 1, 11, 23][axis];
			for (var i = 0; i < pow; i++) {
				c.ori = mathlib.CubieCube.rotMult[rot][c.ori];
			}
			return m;
		}
		axis = ['2-2Uw', '2-2Rw', '2-2Fw', '2-2Dw', '2-2Lw', '2-2Bw'].indexOf(face);
		if (axis != -1) {
			var m1 = axis * 3 + (4 - pow) % 4 - 1;
			var m2 = (axis + 3) % 6 * 3 + pow % 4 - 1;
			m1 = mathlib.CubieCube.rotMulM[c.ori][m1];
			mathlib.CubieCube.EdgeMult(c, mathlib.CubieCube.moveCube[m1], d);
			mathlib.CubieCube.CornMult(c, mathlib.CubieCube.moveCube[m1], d);
			c.init(d.ca, d.ea);
			m2 = mathlib.CubieCube.rotMulM[c.ori][m2];
			mathlib.CubieCube.EdgeMult(c, mathlib.CubieCube.moveCube[m2], d);
			mathlib.CubieCube.CornMult(c, mathlib.CubieCube.moveCube[m2], d);
			c.init(d.ca, d.ea);
			var rot = [3, 15, 17, 1, 11, 23][axis];
			for (var i = 0; i < pow; i++) {
				c.ori = mathlib.CubieCube.rotMult[rot][c.ori];
			}
			return axis % 3 * 3 + 18 + pow % 4 - 1;
		}
		axis = 'yxz'.indexOf(face);
		if (axis != -1) {
			var rot = [3, 15, 17][axis];
			for (var i = 0; i < pow; i++) {
				c.ori = mathlib.CubieCube.rotMult[rot][c.ori];
			}
			return;
		}
	}

	function calcRecons(times, method) {
		if (!times || !times[4] || times[0][0] < 0) {
			return;
		}
		var solution = times[4];
		var c = new mathlib.CubieCube();
		var d = new mathlib.CubieCube();
		c.ori = 0;
		solution = solution[0].split(/ +/);
		for (var i = solution.length - 1; i >= 0; i--) {
			doMove(c, d, solution[i], true);
		}
		var facelet = c.toFaceCube();
		var data = []; //[[start, firstMove, end, moveCnt], [start, firstMove, end, moveCnt], ...]
		var lastMove = -3;
		var lastPow = 0;
		var startCubieI = new mathlib.CubieCube();
		var tsStart = 0;
		var tsFirst = 0;
		var moveCnt = 0;
		var progress = cubeutil.getProgress(facelet, method);
		for (var i = 0; i < solution.length; i++) {
			var effMove = doMove(c, d, solution[i], false);
			if (effMove != undefined) {
				tsFirst = Math.min(tsFirst, c.tstamp);
				var axis = ~~(effMove / 3);
				var amask = 1 << axis;
				if (axis % 3 != lastMove) {
					moveCnt++;
					lastMove = axis;
					lastPow = 0;
				} else {
					moveCnt += (lastPow & amask) == amask ? 0 : 1;
				}
				lastPow |= amask;
			}
			curProg = cubeutil.getProgress(c.toFaceCube(), method);
			if (curProg < progress) {
				var transCubie = new mathlib.CubieCube();
				mathlib.CubieCube.EdgeMult(startCubieI, c, transCubie);
				mathlib.CubieCube.CornMult(startCubieI, c, transCubie);
				data[--progress] = [tsStart, tsFirst, c.tstamp, moveCnt, transCubie];
				while (progress > curProg) {
					data[--progress] = [c.tstamp, c.tstamp, c.tstamp, 0, new mathlib.CubieCube()];
				}
				startCubieI.invFrom(c);
				tsStart = c.tstamp;
				moveCnt = 0;
				lastMove = -3;
				tsFirst = 1e9;
			}
		}
		return data;
	}

	// data = [[name, insp, exec, turn], ...]
	function renderResult(stepData, tidx, isPercent) {
		var maxSubt = 0;
		var sumSubt = 0;
		var stepSData = [];
		var sDataIdx = [];
		for (var i = 0; i < stepData.length; i++) {
			var subt = stepData[i][1] + stepData[i][2];
			sumSubt += subt;
			var names = stepData[i][0].split('-');
			if (stepSData.length == 0 || stepSData[stepSData.length - 1][0] != names[0]) {
				stepSData.push([names[0], 0, 0, 0]);
			}
			sDataIdx[i] = stepSData.length - 1;
			var lData = stepSData[stepSData.length - 1];
			for (var j = 1; j < 4; j++) {
				lData[j] += stepData[i][j];
			}
			maxSubt = Math.max(lData[1] + lData[2], maxSubt);
		}

		var trTpl =
			'<tr style="$0" data="$1"><td rowspan=2 class="$8" style="padding-bottom:0;padding-top:0;">$1</td><td colspan=4 style="padding:0;">' +
			'<span class="cntbar sty2" style="height:0.2em;float:left;border:none;width:$2%;">&nbsp;</span>' +
			'<span class="cntbar" style="height:0.2em;float:left;border:none;width:$3%;">&nbsp;</span></td></tr>' +
			'<tr style="$0" data="$1">' +
			'<td style="padding-bottom:0;padding-top:0;">$4</td>' +
			'<td style="padding-bottom:0;padding-top:0;">$5</td>' +
			'<td style="padding-bottom:0;padding-top:0;">$6</td>' +
			'<td style="padding-bottom:0;padding-top:0;">$7</td>' +
			'</tr>';

		var str = [];
		var totIns = 0;
		var totExec = 0;
		var totMov = 0;
		var curSIdx = -1;
		for (var i = 0; i < stepData.length; i++) {
			var val = stepData[i];
			totIns += val[1];
			totExec += val[2];
			totMov += val[3];
			var isSuperStep = sDataIdx[i] == sDataIdx[i + 1] && sDataIdx[i] != sDataIdx[i - 1];
			if (isSuperStep) {
				curSIdx = sDataIdx[i];
				var sval = stepSData[curSIdx];
				var trsdata = [
					'',
					sval[0],
					sval[1] / maxSubt * 100,
					sval[2] / maxSubt * 100,
					isPercent ? Math.round(sval[1] / sumSubt * 1000) / 10 + '%' : kernel.pretty(sval[1]),
					isPercent ? Math.round(sval[2] / sumSubt * 1000) / 10 + '%' : kernel.pretty(sval[2]),
					Math.round(sval[3] * 10) / 10,
					sval[3] > 0 && sval[1] + sval[2] > 0 ? Math.round(sval[3] / (sval[1] + sval[2]) * 10000 ) / 10 : 'N/A',
					'click sstep'
				];
				var curTr = trTpl;
				for (var j = 0; j < 9; j++) {
					curTr = curTr.replaceAll('$' + j, trsdata[j]);
				}
				str.push(curTr);
			}

			var trdata = [
				sDataIdx[i] == curSIdx ? 'display:none;' : '',
				val[0],
				val[1] / maxSubt * 100,
				val[2] / maxSubt * 100,
				isPercent ? Math.round(val[1] / sumSubt * 1000) / 10 + '%' : kernel.pretty(val[1]),
				isPercent ? Math.round(val[2] / sumSubt * 1000) / 10 + '%' : kernel.pretty(val[2]),
				Math.round(val[3] * 10) / 10,
				val[3] > 0 && val[1] + val[2] > 0 ? Math.round(val[3] / (val[1] + val[2]) * 10000 ) / 10 : 'N/A',
				''
			];
			var curTr = trTpl;
			for (var j = 0; j < 9; j++) {
				curTr = curTr.replaceAll('$' + j, trdata[j]);
			}
			str.push(curTr);
		}
		var endTr = $('<tr>').append(tidx ? $('<td>').append(requestBack) : $('<td style="padding:0;">').append(rangeSelect),
			'<td>' + (isPercent ? Math.round(totIns / sumSubt * 1000) / 10 + '%' : kernel.pretty(totIns)) + '</td>' +
			'<td>' + (isPercent ? Math.round(totExec / sumSubt * 1000) / 10 + '%' : kernel.pretty(totExec)) + '</td>' +
			'<td>' + Math.round(totMov * 10) / 10 + '</td>' +
			'<td>' + (totMov > 0 && totIns + totExec > 0 ? Math.round(totMov / (totIns + totExec) * 10000 ) / 10 : 'N/A') + '</td>');
		table.empty().append(tableTh);
		tableTh.after(str.join(''), endTr);
		rangeSelect.unbind('change').change(procClick);
		methodSelect.unbind('change').change(procClick);
		table.unbind('click').click(procClick);
		requestBack.text('No.' + tidx);
	}

	function renderEmpty(isRequest) {
		table.empty().append(tableTh);
		tableTh.after(
			$('<tr>').append(
				isRequest ? $('<td>').append(requestBack) : $('<td style="padding:0;">').append(rangeSelect),
				'<td colspan=4>' + TOOLS_RECONS_NODATA + '</td>')
		);
		rangeSelect.unbind('change').change(procClick);
		methodSelect.unbind('change').change(procClick);
		table.unbind('click').click(procClick);
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

	function reqRecons(signal, value) {
		if (!isEnable) {
			return;
		}
		var method = methodSelect.val();
		var isPercent = method.endsWith('%');
		method = method.replace('%', '');
		var times = value[0];
		var data = calcRecons(times, method);
		if (!data) {
			renderEmpty(true);
			return;
		}
		var steps = cubeutil.getStepNames(method);
		var stepData = [];
		for (var i = steps.length - 1; i >= 0; i--) {
			var curData = data[i] || [0, 0, 0, 0];
			stepData.push([steps[i], curData[1] - curData[0], curData[2] - curData[1], curData[3]]);
		}
		renderResult(stepData, value[1] + 1, isPercent);
	}

	function update() {
		if (!isEnable) {
			return;
		}
		var nsolv = stats.getTimesStatsList().timesLen;
		var nrec = rangeSelect.val();
		if (nrec == 'single') {
			nrec = Math.min(1, nsolv);
		} else if (nrec == 'mo5') {
			nrec = Math.min(5, nsolv);
		} else if (nrec == 'mo12') {
			nrec = Math.min(12, nsolv);
		} else if (nrec == 'mo100') {
			nrec = Math.min(100, nsolv);
		} else {
			nrec = nsolv;
		}
		if (!nrec) {
			renderEmpty(false);
			return;
		}
		var method = methodSelect.val();
		var isPercent = method.endsWith('%');
		method = method.replace('%', '');
		var steps = cubeutil.getStepNames(method);
		var nvalid = 0;
		var stepData = [];
		for (var s = nsolv - 1; s >= nsolv - nrec; s--) {
			var times = stats.timesAt(s);
			var data = calcRecons(times, method);
			if (!data) {
				continue;
			}
			nvalid++;
			for (var i = steps.length - 1; i >= 0; i--) {
				var curData = data[i] || [0, 0, 0, 0];
				var sidx = steps.length - i - 1;
				stepData[sidx] = stepData[sidx] || [steps[i], 0, 0, 0];
				stepData[sidx][1] += curData[1] - curData[0];
				stepData[sidx][2] += curData[2] - curData[1];
				stepData[sidx][3] += curData[3];
			}
		}
		if (nvalid == 0) {
			renderEmpty(false);
			return;
		}
		for (var i = 0; i < steps.length; i++) {
			stepData[i][1] /= nvalid;
			stepData[i][2] /= nvalid;
			stepData[i][3] /= nvalid;
		}
		renderResult(stepData, null, isPercent);
	}

	function procClick(e) {
		if (e.type == 'change') {
			update();
			return;
		}
		var target = $(e.target);
		if (!target.is('.click')) {
			return;
		}
		if (!target.is('.sstep')) {
			update();
			return;
		}
		var obj = target.parent();
		var prefix = obj.attr('data') + '-';
		obj = obj.next().next();
		while (obj && obj.attr('data').startsWith(prefix)) {
			obj.toggle();
			obj = obj.next();
		}
	}

	$(function() {
		if (typeof tools != "undefined") {
			tools.regTool('recons', TOOLS_RECONS + '>' + 'step', execFunc);
		}
		stats.regUtil('recons', update);
		kernel.regListener('recons', 'reqrec', reqRecons);
		var ranges = ['single', 'mo5', 'mo12', 'mo100', 'all'];
		for (var i = 0; i < ranges.length; i++) {
			rangeSelect.append('<option value="' + ranges[i] + '">' + ranges[i] + '</option>');
		}
		var methods = [['cf4op', 'cfop'], ['roux', 'roux']];
		for (var i = 0; i < methods.length; i++) {
			methodSelect.append('<option value="' + methods[i][0] + '">' + methods[i][1] + '</option>');
			methodSelect.append('<option value="' + methods[i][0] + '%">' + methods[i][1] + '%</option>');
		}
	});

	return {
		calcRecons: calcRecons
	}
});

var caseStat = execMain(function() {
	var isEnable;

	var div = $('<div style="font-size:0.9em;" />');
	var table = $('<table class="table">');
	var methodSelect = $('<select>');
	var tableTh = $('<tr>').append($('<th colspan=2 style="padding:0;">').append(methodSelect), '<th>N</th><th>insp</th><th>exec</th><th>turn</th><th>fps</th>');

	function update() {
		if (!isEnable) {
			return;
		}
		var nsolv = stats.getTimesStatsList().timesLen;
		var nrec = nsolv;
		var method = 'cf4op';
		var nvalid = 0;
		var caseCnts = [];
		for (var s = nsolv - 1; s >= nsolv - nrec; s--) {
			var times = stats.timesAt(s);
			var data = recons.calcRecons(times, method);
			if (!data) {
				continue;
			}
			nvalid++;
			var cur = cubeutil.identPLL(data[0][4].toFaceCube());
			caseCnts[cur] = caseCnts[cur] || [0, 0, 0, 0];
			var cumData = [1, data[0][1] - data[0][0], data[0][2] - data[0][1], data[0][3]];
			for (var i = 0; i < 4; i++) {
				caseCnts[cur][i] += cumData[i];
			}
		}

		var trTpl =
			'<tr><td rowspan=2 style="padding-bottom:0;padding-top:0;">$0</td>' +
			'<td rowspan=2 style="padding:0"><canvas/></td>' +
			'<td rowspan=2 style="padding-bottom:0;padding-top:0;">$1</td>' +
			'<td colspan=4 style="padding:0;">' +
			'<span class="cntbar sty2" style="height:0.25em;float:left;border:none;width:$2%;">&nbsp;</span>' +
			'<span class="cntbar" style="height:0.25em;float:left;border:none;width:$3%;">&nbsp;</span></td></tr>' +
			'<tr>' +
			'<td style="padding-bottom:0;padding-top:0;">$4</td>' +
			'<td style="padding-bottom:0;padding-top:0;">$5</td>' +
			'<td style="padding-bottom:0;padding-top:0;">$6</td>' +
			'<td style="padding-bottom:0;padding-top:0;">$7</td>' +
			'</tr>';

		table.empty().append(tableTh);

		var maxSubt = 0;
		for (var i = 0; i < 21; i++) {
			if (!caseCnts[i]) {
				continue;
			}
			maxSubt = Math.max(maxSubt, (caseCnts[i][1] + caseCnts[i][2]) / caseCnts[i][0]);
		}

		for (var i = 0; i < 21; i++) {
			if (!caseCnts[i]) {
				continue;
			}
			var caseCnt = caseCnts[i];
			var tr = $('<tr>');
			var param = scramble_333.getPLLImage(i);

			var trdata = [
				param[2],
				caseCnt[0],
				caseCnts[i][1] / caseCnts[i][0] / maxSubt * 100,
				caseCnts[i][2] / caseCnts[i][0] / maxSubt * 100,
				kernel.pretty(caseCnts[i][1] / caseCnts[i][0]),
				kernel.pretty(caseCnts[i][2] / caseCnts[i][0]),
				Math.round(caseCnts[i][3] / caseCnts[i][0] * 10) / 10,
				Math.round(caseCnts[i][3] / (caseCnts[i][1] + caseCnts[i][2]) * 10000) / 10
			];
			var curTr = trTpl;
			for (var j = 0; j < 8; j++) {
				curTr = curTr.replaceAll('$' + j, trdata[j]);
			}

			curTr = $(curTr);
			var canvas = curTr.find('canvas');
			canvas.css({
				'width': '2em',
				'height': '2em',
				'display': 'block'
			});
			scramble_333.getPLLImage(i, canvas);
			table.append(curTr);
		}
		if (nvalid == 0) {
			tableTh.after('<tr><td colspan=7>' + TOOLS_RECONS_NODATA + '</td></tr>');
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

	$(function() {
		if (typeof tools != "undefined") {
			tools.regTool('casestat', TOOLS_RECONS + '>' + 'cases', execFunc);
		}
		stats.regUtil('casestat', update);
		var methods = ['PLL'];
		for (var i = 0; i < methods.length; i++) {
			methodSelect.append('<option value="' + methods[i] + '">' + methods[i] + '</option>');
		}
	});
});
