"use strict";

var stackmatutil = execMain(function(CubieCube) {

	var statusSpan = $('<span>').html('status:  unknown');
	var deviceSelect = $('<select style="font-size: 1rem;">');
	var isShown = false;

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
		fdiv.empty().append(statusSpan, '<br>', 'Device:&nbsp;&nbsp;', deviceSelect);
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
