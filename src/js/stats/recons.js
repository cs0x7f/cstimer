var recons = execMain(function() {
	var isEnable;

	var div = $('<div style="font-size:0.65em;" />');
	var table = $('<table class="table">');
	var rangeSelect = $('<select>');
	var methodSelect = $('<select>');

	function doMove(c, d, moveStr, isInv) {
		var movere = /^([URFDLB]w?|[EMSyxz])(['2]?)@(\d+)$/;
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
			axis = [1, 11, 23, 3, 15, 17][axis]; //y x z y' x' z'
			axis = mathlib.CubieCube.rotMulI[0][axis];
			for (var i = 0; i < pow; i++) {
				c.ori = mathlib.CubieCube.rotMult[axis][c.ori];
			}
			return m;
		}
		axis = 'yxz'.indexOf(face);
		if (axis != -1) {
			axis = [1, 11, 23][axis];
			axis = mathlib.CubieCube.rotMulI[0][axis];
			for (var i = 0; i < pow; i++) {
				c.ori = mathlib.CubieCube.rotMult[axis][c.ori];
			}
			return;
		}
	}

	function calcRecons(times, method) {
		var scramble = times[1];
		var solution = times[4];
		if (!solution) {
			return;
		}
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
				var amask = [0x1, 0x2, 0x4, 0x8, 0x10, 0x20, 0x9, 0x12, 0x24][axis];
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
	function renderResult(stepData) {
		var maxSubt = 0;
		for (var i = 0; i < stepData.length; i++) {
			maxSubt = Math.max(stepData[i][1] + stepData[i][2]);
		}
		var str = [];
		var totIns = 0;
		var totExec = 0;
		var totMov = 0;
		str.push('<tr><th>step</th><th>insp</th><th>exec</th><th>turn</th><th>fps</th></tr>');
		for (var i = 0; i < stepData.length; i++) {
			var val = stepData[i];
			totIns += val[1];
			totExec += val[2];
			totMov += val[3];
			str.push('<tr><td rowspan=2 style="padding-bottom:0;padding-top:0;">' + val[0] + '</td><td colspan=4 style="font-size:0.2em;text-align:left;padding:0;">' + 
				'<span class="cntbar sty2" style="border:none;width: ' + val[1] / maxSubt * 100 + '%;">&nbsp;</span>' + 
				'<span class="cntbar" style="border:none;width: ' + val[2] / maxSubt * 100 + '%;">&nbsp;</span></td></tr>' +
				'<tr style="">' + 
				'<td style="padding-bottom:0;padding-top:0;">' + kernel.pretty(val[1]) + '</td>' + 
				'<td style="padding-bottom:0;padding-top:0;">' + kernel.pretty(val[2]) + '</td>' + 
				'<td style="padding-bottom:0;padding-top:0;">' + val[3] + '</td>' + 
				'<td style="padding-bottom:0;padding-top:0;">' + (val[3] > 0 && val[1] + val[2] > 0 ? Math.round(val[3] / (val[1] + val[2]) * 10000 ) / 10 : 'N/A') + '</td>' + 
				'</tr>');
		}
		str.push('<tr><td>=</td>' + 
			'<td>' + kernel.pretty(totIns) + '</td>' + 
			'<td>' + kernel.pretty(totExec) + '</td>' + 
			'<td>' + totMov + '</td>' + 
			'<td>' + (totMov > 0 && totIns + totExec > 0 ? Math.round(totMov / (totIns + totExec) * 10000 ) / 10 : 'N/A') + '</td></tr>');
		table.html(str.join(''));
	}

	function execFunc(fdiv, signal) {
		if (!(isEnable = (fdiv != undefined))) {
			return;
		}
		if (/^scr/.exec(signal)) {
			return;
		}
		fdiv.empty().append(div.append('Range:', rangeSelect, 'Method:', methodSelect, table));
		update();
	}

	function reqRecons(signal, value) {
		table.empty();
		var times = value[0];
		if (!times) {
			return;
		}
		var num = value[1];
		var method = 'cf4op';
		var data = calcRecons(times, method);
		var steps = cubeutil.getStepNames(method);
		var stepData = [];
		for (var i = steps.length - 1; i >= 0; i--) {
			var curData = data[i] || [0, 0, 0, 0];
			stepData.push([steps[i], curData[1] - curData[0], curData[2] - curData[1], curData[3]]);
		}
		renderResult(stepData);
	}

	function update() {
		table.empty();
		var nsolv = stats.getTimesStatsList().timesLen;
		var times = stats.timesAt(nsolv - 1);
		if (!times || !times[4]) {
			return;
		}
		var method = 'cf4op';
		var data = calcRecons(times, method);
		var steps = cubeutil.getStepNames(method);
		var stepData = [];
		for (var i = steps.length - 1; i >= 0; i--) {
			var curData = data[i] || [0, 0, 0, 0];
			stepData.push([steps[i], curData[1] - curData[0], curData[2] - curData[1], curData[3]]);
		}
		renderResult(stepData);
	}

	$(function() {
		if (typeof tools != "undefined") {
			tools.regTool('recons', 'Reconstruction', execFunc);
		}
		stats.regUtil('recons', update);
		kernel.regListener('recons', 'reqrec', reqRecons);
	});
});
