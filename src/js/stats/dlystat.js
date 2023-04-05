"use strict";

var periodStats = execMain(function() {
	var dlyOStr1 = TOOLS_DLYSTAT_OPT1.split('|');
	var dateSelect = $('<select>').append(
		$('<option>').val('d').html(dlyOStr1[0]),
		$('<option>').val('w').html(dlyOStr1[1]),
		$('<option>').val('m').html(dlyOStr1[2]),
		$('<option>').val('y').html(dlyOStr1[3])
	).val('d');

	var sodSelect = $('<select>');
	for (var i = 0; i < 24; i++) {
		var hh = ('0' + i).slice(-2) + ':00';
		sodSelect.append($('<option>').val(i).html(hh));
	}

	var dlyOStr2 = TOOLS_DLYSTAT_OPT2.split('|');
	var sowSelect = $('<select>').append(
		$('<option>').val(3).html(dlyOStr2[0]),
		$('<option>').val(4).html(dlyOStr2[1]),
		$('<option>').val(5).html(dlyOStr2[2]),
		$('<option>').val(6).html(dlyOStr2[3]),
		$('<option>').val(0).html(dlyOStr2[4]),
		$('<option>').val(1).html(dlyOStr2[5]),
		$('<option>').val(2).html(dlyOStr2[6])
	).val(3);

	var statResult = [];
	var offset;
	var period;
	var curPidx;
	var idxPrev = 0;
	var n_col = 3;

	var nextTd = $('<td class="click">').html('&gt;');
	var prevTd = $('<td class="click">').html('&lt;');
	var incTd = $('<td class="click">').html('+');
	var decTd = $('<td class="click">').html('-');
	var emptyTd = $('<td colspan=1>');

	function getPidx(timestamp) {
		timestamp -= offset;
		var date = new Date(timestamp * 1000);
		switch (period) {
			case 'd':
				return ~~(timestamp / 86400);
			case 'w':
				return ~~((timestamp / 86400 - sowSelect.val()) / 7);
			case 'm':
				return date.getFullYear() * 12 + date.getMonth();
			case 'y':
				return date.getFullYear();
		}
	}

	function pidx2str(pidx) {
		switch (period) {
			case 'd':
				return mathlib.time2str(pidx * 86400 + offset, '%Y-%M-%D');
			case 'w':
				return mathlib.time2str((pidx * 7 + ~~sowSelect.val()) * 86400 + offset, 'Start@ %Y-%M-%D');
			case 'm':
				return ~~(pidx / 12) + "-" + ("0" + (pidx % 12 + 1)).slice(-2);
			case 'y':
				return "" + pidx;
		}
	}

	function genPeriodStat() {
		var loadproc = Promise.resolve();
		var sessionN = ~~kernel.getProp('sessionN');
		for (var i = 0; i < sessionN; i++) {
			var idx = stats.getSessionManager().rank2idx(i + 1);
			loadproc = loadproc.then((function(idx) {
				return new Promise(function(resolve) {
					storage.get(idx).then(function(newTimes) {
						stats[idx] = {}
						for (var i = 0; i < newTimes.length; i++) {
							if (!newTimes[i][3]) {
								continue;
							}
							var periodIdx = getPidx(newTimes[i][3]);
							stats[idx][periodIdx] = stats[idx][periodIdx] || [0, 0];
							stats[idx][periodIdx][0] += 1;
							stats[idx][periodIdx][1] += newTimes[i][0][0] != -1;
						}
						resolve();
					});
				});
			}).bind(undefined, idx));
		}
		return loadproc.then(function() {
			statResult = stats;
		});
	}

	function procClick(e) {
		var val = $(e.target).html();
		if (val == '&gt;') {
			idxPrev--;
		} else if (val == '&lt;') {
			idxPrev = Math.min(idxPrev + 1, 0);
		} else if (val == '+') {
			n_col++;
		} else if (val == '-') {
			n_col = Math.max(1, n_col - 1);
		}
		genDiv();
	}

	function genDiv() {
		if (!enabled) {
			return;
		}
		var table = $('<table class="table">');
		var dlyStr = TOOLS_DLYSTAT1.split('|');
		toolDiv.empty().append(
			dlyStr[0], dateSelect.unbind('change').change(update),
			' ' + dlyStr[1], sodSelect.unbind('change').change(update),
			' ' + dlyStr[2], sowSelect.unbind('change').change(update),
			'<br>', table);
		var sessionData = JSON.parse(kernel.getProp('sessionData'));
		var sessionN = ~~kernel.getProp('sessionN');

		var tr0 = $('<tr>').append(prevTd.unbind('click').click(procClick), nextTd.unbind('click').click(procClick));
		var tr1 = $('<tr>').append(incTd.unbind('click').click(procClick), decTd.unbind('click').click(procClick));
		for (var i = 0; i < n_col; i++) {
			tr0.append($('<td rowspan=2>').html(pidx2str(curPidx - i + idxPrev).replace(' ', '<br>')));
		}
		table.append(tr0, tr1);
		for (var i = 0; i < sessionN; i++) {
			var idx = stats.getSessionManager().rank2idx(i + 1);
			if (Object.keys(statResult[idx] || {}).length == 0) {
				continue;
			}
			var tr = $('<tr>').append($('<td colspan=2>').html(sessionData[idx]['name']));
			for (var j = 0; j < n_col; j++) {
				var data = statResult[idx][curPidx - j + idxPrev];
				tr.append($('<td>').html(data ? (data[1] + '/' + data[0]) : '-'));
			}
			table.append(tr);
		}
	}

	var enabled = false;

	function execFunc(fdiv, signal) {
		enabled = !!fdiv;
		if (!fdiv || /^scr/.exec(signal)) {
			return;
		}
		fdiv.empty().append(toolDiv);
		update();
	}

	function update() {
		if (enabled) {
			period = dateSelect.val();
			offset = sodSelect.val() * 3600 + (new Date().getTimezoneOffset() * 60);
			curPidx = getPidx(+new Date / 1000);
			genPeriodStat().then(genDiv);
		}
	}

	var toolDiv = $('<div />').css('text-align', 'center').css({
		'font-size': '0.7em',
		'max-height': '20em',
		'overflow-y': 'auto'
	});

	$(function() {
		if (typeof tools != "undefined") {
			tools.regTool('dlystat', TOOLS_DLYSTAT, execFunc);
		}
		kernel.regListener('dlystat', 'property', genDiv, /^sessionData$/);
		stats.regUtil('dlystat', update);
	});

	return {
		update: update
	}
});
