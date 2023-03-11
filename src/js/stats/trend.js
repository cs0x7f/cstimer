var trend = execMain(function(kpretty) {
	var canvas = $('<canvas />'), ctx;

	var isEnable = false;

	var offx = 35,
		offy = 25;
	var width, height;

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
		canvas.width(10 * imgSize * 1.2 + 'em');
		canvas.height(5 * imgSize * 1.2 + 'em');

		canvas.attr('width', 10 * width + 1);
		canvas.attr('height', 5 * width + 5);

		height = 5 * width;
		width = 10 * width;

		ctx.lineWidth = 2;

		ctx.font = '12pt Arial';
		ctx.fillStyle = kernel.getProp('col-font');
		ctx.fillText("time", 50, 13);
		ctx.strokeStyle = '#888'; ctx.beginPath(); ctx.moveTo(90, 7); ctx.lineTo(150, 7); ctx.stroke();
		ctx.fillText((stat1 > 0 ? "ao" : "mo") + len1, 200, 13);
		ctx.strokeStyle = '#f00'; ctx.beginPath(); ctx.moveTo(240, 7); ctx.lineTo(300, 7); ctx.stroke();
		ctx.fillText((stat2 > 0 ? "ao" : "mo") + len2, 350, 13);
		ctx.strokeStyle = '#00f'; ctx.beginPath(); ctx.moveTo(390, 7); ctx.lineTo(450, 7); ctx.stroke();

		var times_stats_list = stats.getTimesStatsList();
		var data = times_stats_list.getMinMaxInt();
		if (!data) {
			return;
		}
		var timesLen = times_stats_list.timesLen;

		var diff = data[2];
		var plotmax = Math.ceil(data[0] / diff) * diff;
		var plotmin = ~~(data[1] / diff) * diff;
		var ploth = plotmax - plotmin;
		var pattern = diff >= 1000 ? /[^\.]+(?=\.)/ : /[^\.]+\.[\d]/;

		fill([0, 1, 1, 0, 0], [0, 0, 1, 1, 0], '#fff');

		ctx.fillStyle = kernel.getProp('col-font');
		ctx.strokeStyle = '#ccc';
		ctx.lineWidth = 1;
		ctx.textAlign = 'right';
		for (var i = plotmin; i <= plotmax; i += diff) {
			plot([0, 1], [(i - plotmin) / ploth, (i - plotmin) / ploth], '#ccc');

			var label = kpretty(i).match(pattern)[0];
			ctx.fillText(label, offx - 5, (plotmax - i) / ploth * (height - offy) + offy + 5);
		}

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

		plot([0, 1, 1, 0, 0], [0, 0, 1, 1, 0], '#000');
	}

	function plot(x, y, color) {
		ctx.strokeStyle = color;
		ctx.beginPath();
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

	function execFunc(fdiv, signal) {
		if (!(isEnable = (fdiv != undefined))) {
			return;
		}
		if (/^scr/.exec(signal)) {
			return;
		}
		fdiv.empty().append(canvas);
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
				tools.regTool('trend', TOOLS_TREND, execFunc);;
			}
		}
		stats.regUtil('trend', updateTrend);
	});

	return {
		update: updateTrend
	}
}, [kernel.pretty]);
