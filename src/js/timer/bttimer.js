// Timer Implementation that uses QIYI Smart Timer via its Bluetooth protocol
execMain(function(timer) {
	"use strict";

	var enable = false;
	var inspectionTime = 0;

	function onQiyiTimerEvent(timerEvent) {
		if (!enable)
			return;
		DEBUG && console.log('[qiyitimer] timer event received', timerEvent);
		var CONST = BluetoothTimer.CONST;
		switch (timerEvent.state) {
			case CONST.HANDS_ON: // both hands placed on timer
				timer.lcd.color('r');
				break;
			case CONST.HANDS_OFF: // hands removed from timer before grace period expired
				timer.lcd.fixDisplay(false, true);
				break;
			case CONST.GAN_RESET: // timer reset button pressed
			case CONST.IDLE: // timer reset button pressed
				inspectionTime = 0;
				if (timer.hardTime() > 0 || timer.status() != -1) { // reset timer / cancel inspection timer
					timer.hardTime(0);
					timer.status(-1);
					timer.lcd.reset();
					timer.lcd.fixDisplay(false, true);
				} else if (timer.status() == -1 && timer.checkUseIns() && timerEvent.state == CONST.GAN_RESET) { // start inspection timer if was idle and inspection enabled in settings
					timer.status(-3);
					timer.startTime($.now());
					timer.lcd.fixDisplay(false, true);
				}
				timer.lcd.renderUtil();
				break;
			case CONST.GET_SET:   // grace period expired and timer is ready to start
				timer.lcd.color('g');
				break;
			case CONST.RUNNING: // timer is started
				if (timer.status() == -3) { // if inspection timer was running, record elapsed inspection time
					inspectionTime = $.now() - timer.startTime();
					// 0 == Normal, 2000 == +2, -1 == DNF
					inspectionTime = timer.checkUseIns() ? inspectionTime > 17000 ? -1 : (inspectionTime > 15000 ? 2000 : 0) : 0;
				}
				timer.startTime($.now() - ~~timerEvent.solveTime);
				timer.lcd.reset();
				timer.curTime([inspectionTime]);
				timer.status(1);
				timer.lcd.fixDisplay(false, true);
				break;
			case CONST.STOPPED: // timer is stopped, recorded time returned from timer
				timer.hardTime(timerEvent.solveTime);
				timer.curTime()[1] = timer.hardTime();
				timer.status(-1);
				timer.lcd.renderUtil();
				timer.lcd.fixDisplay(false, true);
				kernel.pushSignal('time', timer.curTime());
				break;
			case CONST.DISCONNECT: // timer is switched off or something else
				timer.hardTime(null);
				timer.status(-1);
				timer.lcd.renderUtil();
				timer.lcd.fixDisplay(false, true);
				reconnectTimer();
				break;
		}
	}

	function reconnectTimer() {
		$.delayExec('bluetoothTimerReconnect', function () {
			DEBUG && console.log('[qiyitimer] attempting to reconnect timer device');
			connectTimer(true);
		}, 2500);
	}

	function connectTimer(reconnect) {
		BluetoothTimer.setCallback(onQiyiTimerEvent);
		BluetoothTimer.init().then(function () {
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
		var dialogMsg = $('<div>')
			.append('<br><br>')
			.append('<b>Press OK to connect to Bluetooth Timer</b>')
			.append('<br><br>')
			.append(timer.getBTDiv());
		BluetoothTimer.stop().then(function () {
			kernel.showDialog([dialogMsg, function () {
				connectTimer();
			}, 0, 0], 'share', 'Bluetooth Timer');
		});
	}

	function setEnable(input) {
		enable = input == 'b';
		if (enable) {
			timer.hardTime(null);
			showConnectionDialog();
		} else {
			BluetoothTimer.stop();
		}
	}

	function onKeyUp(keyCode) {
		if (enable && keyCode == 32 && !BluetoothTimer.isConnected()) {
			showConnectionDialog();
		}
	}

	timer.bttimer = {
		setEnable: setEnable,
		onkeyup: onKeyUp,
		onkeydown: $.noop
	};
}, [timer]);
