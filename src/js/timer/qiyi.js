// Timer Implementation that uses QIYI Smart Timer via its Bluetooth protocol
execMain(function(timer) {
	"use strict";

	var enable = false;
	var inspectionTime = 0;

	function onQiyiTimerEvent(timerEvent) {
		if (!enable)
			return;
		DEBUG && console.log('[qiyitimer] timer event received', QiyiTimerState[timerEvent.state], timerEvent);
		switch (timerEvent.state) {
			case QiyiTimerState.GET_SET:   // grace period expired and timer is ready to start
				timer.lcd.color('g');
				break;
			case QiyiTimerState.RUNNING: // timer is started
				if (timer.status() == -3) { // if inspection timer was running, record elapsed inspection time
					inspectionTime = $.now() - timer.startTime();
					// 0 == Normal, 2000 == +2, -1 == DNF
					inspectionTime = timer.checkUseIns() ? inspectionTime > 17000 ? -1 : (inspectionTime > 15000 ? 2000 : 0) : 0;
				}
				timer.startTime($.now() - timerEvent.recordedTime.asTimestamp);
				timer.lcd.reset();
				timer.curTime([inspectionTime]);
				timer.status(1);
				timer.lcd.fixDisplay(false, true);
				break;
			case QiyiTimerState.STOPPED: // timer is stopped, recorded time returned from timer
				timer.hardTime(timerEvent.recordedTime.asTimestamp);
				timer.curTime()[1] = timer.hardTime();
				timer.status(-1);
				timer.lcd.renderUtil();
				timer.lcd.fixDisplay(false, true);
				kernel.pushSignal('time', timer.curTime());
				break;
			case QiyiTimerState.DISCONNECT: // timer is switched off or something else
				timer.hardTime(null);
				timer.status(-1);
				timer.lcd.renderUtil();
				timer.lcd.fixDisplay(false, true);
				reconnectTimer();
				break;
		}
	}

	function reconnectTimer() {
		$.delayExec('qiyiTimerReconnect', function () {
			DEBUG && console.log('[qiyitimer] attempting to reconnect timer device');
			connectTimer(true);
		}, 2500);
	}

	function connectTimer(reconnect) {
		QiyiTimerDriver.setStateUpdateCallback(onQiyiTimerEvent);
		QiyiTimerDriver.connect(reconnect).then(function () {
			DEBUG && console.log('[qiyitimer] timer device successfully connected');
			timer.hardTime(0);
			timer.status(-1);
			timer.lcd.reset();
			timer.lcd.renderUtil();
			timer.lcd.fixDisplay(false, true);
		}).catch(function (err) {
			DEBUG && console.log('[qiyitimer] failed to connect to timer', err);
			if (!reconnect) {
				alert(err);
			}
		});
	}

	function showConnectionDialog() {
		var inspMsg = $('<div>').addClass('click')
			.append('If you have enabled WCA inspection in settings,<br>use QIYI logo button right on the timer to start/cancel inspection.');
		var dialogMsg = $('<div>')
			.append('<br><br>')
			.append('<b>Press OK to connect to QIYI Smart Timer</b>')
			.append('<br><br>')
			.append(inspMsg)
			.append(timer.getBTDiv());
		disconnectTimer().then(function () {
			kernel.showDialog([dialogMsg, function () {
				connectTimer();
			}, 0, 0], 'share', 'QIYI Smart Timer');
		});
	}

	function disconnectTimer() {
		return QiyiTimerDriver.disconnect();
	}

	function setEnableImpl(input) {
		enable = input == 'y';
		if (enable) {
			timer.hardTime(null);
			showConnectionDialog();
		} else {
			disconnectTimer();
		}
	}

	function onKeyUpImpl(keyCode) {
		if (keyCode == 32 && !QiyiTimerDriver.isConnected()) {
			showConnectionDialog();
		}
	}

	timer.qiyi = {
		setEnable: setEnableImpl,
		onkeyup: onKeyUpImpl,
		onkeydown: $.noop
	};
}, [timer]);
