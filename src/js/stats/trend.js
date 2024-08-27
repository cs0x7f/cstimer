var trend = execMain(function(kpretty) {
	var canvas = $('<canvas style="margin-bottom:-0.4em"/>'), ctx;
	var trendDiv = $('<div style="text-align:center">');

	var isEnable = false;

	var offx = 35,
		offy = 25;
	var width, height;

	var offtx = 0;
	var amptx = 1;
	var offty = 0;
	var ampty = 1;

	function updateTrend() {
		if (!isEnable) {
			return;
		}
		if (!canvas[0].getContext) {
			return;
		}
		var param = stats.getStat12();
		var stat1 = param[0];
		var stat2 = param[1];
		var len1 = param[2];
		var len2 = param[3];
		ctx = canvas[0].getContext('2d');
		var imgSize = kernel.getProp('imgSize') / 10;
		width = 50;
		canvas.width(8 * imgSize * 1.2 + 'em');
		canvas.height(5 * imgSize * 1.2 + 'em');

		canvas.attr('width', 8 * width + 1);
		canvas.attr('height', 5 * width + 5);

		height = 5 * width;
		width = 8 * width;

		var times_stats_list = stats.getTimesStatsTable();
		var data = times_stats_list.getMinMaxInt();
		if (!data) {
			return;
		}
		var timesLen = times_stats_list.timesLen;

		var diff = times_stats_list.getBestDiff((data[0] - data[1]) * ampty);
		var plotmax = Math.ceil(data[0] / diff) * diff;
		var plotmin = ~~(data[1] / diff) * diff;
		var ploth = plotmax - plotmin;

		fill([0, 1, 1, 0, 0], [0, 0, 1, 1, 0], '#fff');
		ctx.lineWidth = 2;
		var x, y;
		if (timesLen > 1) {
			x = []; y = [];
			for (var i = 0; i < timesLen; i++) {
				var t = times_stats_list.timeAt(i);
				if (t != -1) {
					x.push(i / (timesLen - 1));
					y.push(Math.max(0, Math.min(1, (t - plotmin) / ploth)));
				}
			}
			plot(x, y, '#888');
		}
		if (timesLen > len1) {
			x = []; y = [];
			var ao5 = times_stats_list.runAvgMean(0, timesLen, len1, stat1 > 0 ? undefined : 0);
			for (var i = 0; i < ao5.length; i++) {
				if (ao5[i][0] != -1) {
					x.push((i + len1 - 1) / (timesLen - 1));
					y.push(Math.max(0, Math.min(1, (ao5[i][0] - plotmin) / ploth)));
				}
			}
			plot(x, y, '#f00');
		}
		if (timesLen > len2) {
			x = []; y = [];
			var ao12 = times_stats_list.runAvgMean(0, timesLen, len2, stat2 > 0 ? undefined : 0);
			for (var i = 0; i < ao12.length; i++) {
				if (ao12[i][0] != -1) {
					x.push((i + len2 - 1) / (timesLen - 1));
					y.push(Math.max(0, Math.min(1, (ao12[i][0] - plotmin) / ploth)));
				}
			}
			plot(x, y, '#00f');
		}

		ctx.clearRect(0, 0, width, offy);
		ctx.clearRect(0, 0, offx, height);
		ctx.clearRect(0, height, width + 1, height + 5);
		ctx.lineWidth = 2;
		ctx.font = '12pt Arial';
		ctx.fillStyle = kernel.getProp('col-font');
		ctx.fillText("time", 50, 13);
		ctx.strokeStyle = '#888'; ctx.beginPath(); ctx.moveTo(90, 7); ctx.lineTo(130, 7); ctx.stroke();
		ctx.fillText((stat1 > 0 ? "ao" : "mo") + len1, 160, 13);
		ctx.strokeStyle = '#f00'; ctx.beginPath(); ctx.moveTo(200, 7); ctx.lineTo(240, 7); ctx.stroke();
		ctx.fillText((stat2 > 0 ? "ao" : "mo") + len2, 270, 13);
		ctx.strokeStyle = '#00f'; ctx.beginPath(); ctx.moveTo(310, 7); ctx.lineTo(350, 7); ctx.stroke();

		ctx.fillStyle = kernel.getProp('col-font');
		ctx.strokeStyle = '#ccc';
		ctx.lineWidth = 1;
		ctx.textAlign = 'right';
		var pattern = diff >= 1000 ? /[^\.]+(?=\.)/ : /[^\.]+\.[\d]/;
		for (var i = plotmin; i <= plotmax; i += diff) {
			var label = kpretty(i).match(pattern)[0];
			var txty = (plotmax - i) / ploth;
			txty = 1 - (1 - txty - offty) / ampty;
			if (txty < 0 || txty > 1) {
				continue;
			}
			ctx.fillText(label, offx - 5, txty * (height - offy) + offy + 5);
			plot([offtx, offtx + amptx], [(i - plotmin) / ploth, (i - plotmin) / ploth], '#ccc');
		}
		plot([offtx, offtx + amptx, offtx + amptx, offtx, offtx], [offty, offty, offty + ampty, offty + ampty, offty], '#000');
	}

	function plot(x, y, color) {
		ctx.strokeStyle = color;
		ctx.beginPath();
		for (var i = 0; i < x.length; i++) {
			x[i] = (x[i] - offtx) / amptx;
			y[i] = (y[i] - offty) / ampty;
		}
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

	var curAdj = 'x';

	function procClick(e) {
		var target = $(e.target);
		if (!target.hasClass('click')) {
			return;
		}
		var key = target.attr('data');
		if (key == 'x') {
			curAdj = 'y';
			target.attr('data', 'y');
			target.html('\ue80d');
			return;
		} else if (key == 'y') {
			curAdj = 'x';
			target.attr('data', 'x');
			target.html('\ue80e');
			return;
		}
		var off = {'p': 1, 'm': -1}[key] || 0;
		var amp = {'l': Math.sqrt(0.5), 's': Math.sqrt(2)}[key] || 1;
		if (curAdj == 'x') {
			offtx += off * amptx * 0.25 + amptx * (1 - amp);
			amptx *= amp;
			amptx = Math.min(Math.max(amptx, 0.1), 1.0);
			offtx = Math.min(Math.max(offtx, 0), 1 - amptx);
		} else {
			offty += off * ampty * 0.25 + ampty * (1 - amp) / 2;
			ampty *= amp;
			ampty = Math.min(Math.max(ampty, 0.1), 1.0);
			offty = Math.min(Math.max(offty, 0), 1 - ampty);
		}
		updateTrend();
	}

	function execFunc(fdiv, signal) {
		if (!(isEnable = (fdiv != undefined))) {
			return;
		}
		if (/^scr/.exec(signal)) {
			return;
		}
		var spanTpl = $.format.bind(null, '<span class="click" data="{0}" style="font-family:iconfont,Arial;display:inline-block;width:2em;">{1}</span>');
		fdiv.empty().append(trendDiv.empty().append(canvas, '<br>', [
			spanTpl(['x', '\ue80e']),
			spanTpl(['p', '&lt;']),
			spanTpl(['m', '&gt;']),
			spanTpl(['l', '\ue80f']),
			spanTpl(['s', '\ue810'])
		].join('')).unbind('click').click(procClick));
		updateTrend();
	}

	$(function() {
		if (typeof tools != "undefined") {
			kernel.regListener('trend', 'property', function(signal, value) {
				if (value[0] == 'disPrec') {
					updateTrend();
				}
			}, /^disPrec|col-font$/);
			if (canvas[0].getContext) {
				tools.regTool('trend', TOOLS_TREND, execFunc);
			}
		}
		stats.regUtil('trend', updateTrend);
	});

	return {
		update: updateTrend
	}
}, [kernel.pretty]);
