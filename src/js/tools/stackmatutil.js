"use strict";

var stackmatutil = execMain(function(CubieCube) {

	var statusSpan = $('<span>').html('status:  unknown');
	var deviceSelect = $('<select style="font-size: 1rem;">');
	var debugClick = $('<span class="click" style="font-family:iconfont;padding-left:0.5em;">\ue69d</span>');
	var isShown = false;

	var debugDiv;
	var debugCanvas;
	var debugText;
	var debugSampleClick;
	var debugIsShow = false;

	function doDebugSample() {
		if (!debugDiv) {
			return;
		}
		stackmat.getSample(0.2, function(data) {
			if (!debugIsShow) {
				return;
			}
			debugText.html(
				'RxBits: [' + data['bits'].join('') + ']<br>' +
				'RxBytes: [' + escape(data['bytes'].join('')) + ']');
			var width = Math.max(debugCanvas.width(), 1024);
			var height = width * 0.3;
			debugCanvas.attr('width', width);
			debugCanvas.attr('height', height);
			var ctx = debugCanvas[0].getContext('2d');
			ctx.fillStyle = '#fff';
			ctx.fillRect(0, 0, width, height);
			var raw = data['raw'];
			var bin = data['bin'];

			ctx.strokeStyle = '#ccc';
			ctx.beginPath();
			ctx.moveTo(0, height * 0.5);
			ctx.lineTo(width, height * 0.5);
			ctx.stroke();

			ctx.strokeStyle = '#444';
			ctx.beginPath();
			ctx.moveTo(0, height * 0.5 - height * 0.3 * raw[0]);
			for (var i = 1; i < raw.length; i++) {
				ctx.lineTo(i * width / (raw.length - 1), height * 0.5 - height * 0.3 * raw[i]);
			}
			ctx.stroke();

			ctx.strokeStyle = '#00f';
			ctx.beginPath();
			ctx.moveTo(0, height * 0.8 - height * 0.6 * bin[0]);
			for (var i = 1; i < bin.length; i++) {
				ctx.lineTo(i * width / (bin.length - 1), height * 0.8 - height * 0.6 * bin[i]);
			}
			ctx.stroke();
		});
	}

	function clearDebug() {
		debugIsShow = false;
	}

	function showDebugDialog() {
		if (!debugDiv) {
			debugDiv = $('<div>');
			debugCanvas = $('<canvas style="display:block; width:95%; margin:auto;">');
			debugText = $('<span style="word-break:break-all;">');
			debugSampleClick = $('<span class="click">Sample!</span>');
			debugDiv.append(debugSampleClick, debugCanvas, debugText);
		}
		debugIsShow = true;
		debugSampleClick.reclk(showDebugDialog);
		kernel.showDialog([debugDiv, clearDebug, clearDebug, clearDebug], 'share', 'Stackmat Debug', doDebugSample);
	}

	function updateStatus(value) {
		if (!isShown) {
			return;
		}
		var status = '';
		status += 'status:  ' + (value.on ? 'on' : 'off') + '<br>';
		status += 'noise:   ' + ~~(value.noise * 100) + '%<br>';
		status += 'power:   ' + (~~(Math.log10(value.power) * 100) / 10) + 'dB<br>';
		status += 'header:  ' + (value.signalHeader) + '<br>';
		status += 'pad:     ' + (value.leftHand ? 'L' : ' ') + (value.rightHand ? 'R' : ' ') + '<br>';
		status += 'running: ' + (value.running ? 'yes' : 'no');
		statusSpan.html(status.replace(/ /g, '&nbsp;'));
	}

	function execFunc(fdiv) {
		if (!fdiv) {
			isShown = false;
			return;
		}
		isShown = true;
		fdiv.empty().append(statusSpan, '<br>', 'Device:&nbsp;&nbsp;', deviceSelect, debugClick);
		debugClick.reclk(showDebugDialog);
	}

	function updateDevices() {
		stackmat.updateInputDevices().then(function(devices) {
			deviceSelect.empty();
			for (var i = 0; i < devices.length; i++) {
				deviceSelect.append($('<option>').val(devices[i][0]).text(devices[i][1]));
			}
			deviceSelect.unbind('change').change(function() {
				stackmat.stop();
				console.log('select device ', deviceSelect.val());
				stackmat.init(undefined, deviceSelect.val(), true);
				kernel.blur();
			});
		});
	}

	$(function() {
		tools.regTool('stackmatutil', 'stackmat', execFunc);
		kernel.regProp('timer', 'stkHead', 0, PROPERTY_STKHEAD, [true]);
		updateDevices();
	});

	return {
		init: function(timer, force) {
			return stackmat.init(timer, undefined, force).then(updateDevices);
		},
		stop: stackmat.stop,
		setCallBack: function(func) {
			stackmat.setCallBack(function(value) {
				updateStatus(value);
				func && func(value);
			});
		}
	};
});
