var recons = execMain(function() {
	var isEnable;

	var div = $('<div style="font-size:0.65em;" />');
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
		var tsStart = 0;
		var tsFirst = 0;
		var moveCnt = 0;
		var moveSeq = [];
		var progress = cubeutil.getProgress(facelet, method);
		for (var i = 0; i < solution.length; i++) {
			moveSeq.push(solution[i].split('@')[0]);
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
				data[--progress] = [tsStart, tsFirst, c.tstamp, moveCnt, moveSeq];
				while (progress > curProg) {
					data[--progress] = [c.tstamp, c.tstamp, c.tstamp, 0];
				}
				tsStart = c.tstamp;
				moveCnt = 0;
				moveSeq = [];
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
		for (var i = 0; i < stepData.length; i++) {
			var subt = stepData[i][1] + stepData[i][2];
			maxSubt = Math.max(subt, maxSubt);
			sumSubt += subt;
		}
		var str = [];
		var totIns = 0;
		var totExec = 0;
		var totMov = 0;
		for (var i = 0; i < stepData.length; i++) {
			var val = stepData[i];
			totIns += val[1];
			totExec += val[2];
			totMov += val[3];
			str.push('<tr><td rowspan=2 style="padding-bottom:0;padding-top:0;">' + val[0] + '</td><td colspan=4 style="padding:0;">' +
				'<span class="cntbar sty2" style="height:0.2em;float:left;border:none;width: ' + val[1] / maxSubt * 100 + '%;">&nbsp;</span>' +
				'<span class="cntbar" style="height:0.2em;float:left;border:none;width: ' + val[2] / maxSubt * 100 + '%;">&nbsp;</span></td></tr>' +
				'<tr style="">' +
				'<td style="padding-bottom:0;padding-top:0;">' + (isPercent ? Math.round(val[1] / sumSubt * 1000) / 10 + '%' : kernel.pretty(val[1])) + '</td>' +
				'<td style="padding-bottom:0;padding-top:0;">' + (isPercent ? Math.round(val[2] / sumSubt * 1000) / 10 + '%' :     kernel.pretty(val[2])) + '</td>' +
				'<td style="padding-bottom:0;padding-top:0;">' + Math.round(val[3] * 10) / 10 + '</td>' +
				'<td style="padding-bottom:0;padding-top:0;">' + (val[3] > 0 && val[1] + val[2] > 0 ? Math.round(val[3] / (val[1] + val[2]) * 10000 ) / 10 : 'N/A') + '</td>' +
				'</tr>');
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
		requestBack.text('No.' + tidx).unbind('click').click(procClick);
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
		requestBack.unbind('click').click(procClick);
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
		update();
	}

	$(function() {
		if (typeof tools != "undefined") {
			tools.regTool('recons', TOOLS_RECONS, execFunc);
		}
		stats.regUtil('recons', update);
		kernel.regListener('recons', 'reqrec', reqRecons);
		var ranges = ['single', 'mo5', 'mo12', 'all'];
		for (var i = 0; i < ranges.length; i++) {
			rangeSelect.append('<option value="' + ranges[i] + '">' + ranges[i] + '</option>');
		}
		var methods = ['cf4op', 'roux'];
		for (var i = 0; i < methods.length; i++) {
			methodSelect.append('<option value="' + methods[i] + '">' + methods[i] + '</option>');
			methodSelect.append('<option value="' + methods[i] + '%">' + methods[i] + '%</option>');
		}
	});
});
