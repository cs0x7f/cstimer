"use strict";

var stackmatutil = execMain(function(CubieCube) {

	var statusSpan = $('<span>').html('status:  unknown');
	var isShown = false;

	function updateStatus(value) {
		if (!isShown) {
			return;
		}
		var status = '';
		status += 'status:  ' + (value.on ? 'on' : 'off') + '<br>';
		status += 'noise:   ' + ~~(value.noise * 100) + '%<br>';
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
		fdiv.empty().append(statusSpan);
	}

	$(function() {
		tools.regTool('stackmatutil', 'stackmat', execFunc);
		kernel.regProp('timer', 'stkHead', 0, PROPERTY_STKHEAD, [true]);
	});

	return {
		init: stackmat.init,
		stop: stackmat.stop,
		setCallBack: function(func) {
			stackmat.setCallBack(function(value) {
				updateStatus(value);
				func && func(value);
			})
		}
	}
});