"use strict";

var periodStats = execMain(function() {
	var dateSelect = $('<select>').append(
		$('<option>').val('d').html('day'),
		$('<option>').val('w').html('week'),
		$('<option>').val('m').html('month'),
		$('<option>').val('y').html('year')
	).val('d');

	var sodSelect = $('<select>');
	for (var i = 0; i < 24; i++) {
		var hh = ('0' + i).slice(-2) + ':00';
		sodSelect.append($('<option>').val(i).html(hh));
	}

	var sowSelect = $('<select>').append(
		$('<option>').val(3).html('Sun'),
		$('<option>').val(4).html('Mon'),
		$('<option>').val(5).html('Tue'),
		$('<option>').val(6).html('Wed'),
		$('<option>').val(0).html('Thu'),
		$('<option>').val(1).html('Fri'),
		$('<option>').val(2).html('Sat')
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
		toolDiv.empty().append(
			'Period', dateSelect.unbind('change').change(update),
			' Start of day', sodSelect.unbind('change').change(update),
			' week', sowSelect.unbind('change').change(update),
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
			tools.regTool('dlystat', 'Daily Statistics', execFunc);
		}
		kernel.regListener('dlystat', 'property', genDiv, /^sessionData$/);
		stats.regUtil('dlystat', update);
	});

	return {
		update: update
	}
});
