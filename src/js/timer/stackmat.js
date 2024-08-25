execMain(function(timer) {
	var enable = false;
	var lastState = {};
	var inspectionTime;

	function stackmatCallback(state) {
		if (!enable) {
			return;
		}
		var now = $.now();
		if (!state.on) {
			timer.hardTime(null);
			timer.status(-1);
			timer.lcd.fixDisplay(false, true);
			lastState = state;
			return;
		}
		timer.hardTime(state.time_milli);
		timer.lcd.renderUtil();
		if (state.running) {
			if (timer.status() == -3 || timer.status() == -4) {
				inspectionTime = now - timer.startTime() - timer.hardTime();
				timer.lcd.reset();
			}
			timer.curTime([0]);
			timer.status(1);
			timer.startTime(now - timer.hardTime());
			timer.lcd.fixDisplay(false, true);
		} else if (timer.status() == -1 && timer.checkUseIns() && timer.hardTime() == 0 && (state.signalHeader == 'R' || state.signalHeader == 'L')) {
			timer.status(-3);
			timer.startTime(now);
			timer.lcd.fixDisplay(false, true);
		} else if (timer.status() != -3 && timer.status() != -4) {
			timer.status(-1);
			timer.lcd.fixDisplay(false, true);
		}
		if (lastState.running && !state.running && state.time_milli != 0) {
			inspectionTime = timer.checkUseIns() ? inspectionTime > 17000 ? -1 : (inspectionTime > 15000 ? 2000 : 0) : 0;
			timer.curTime([inspectionTime, ~~timer.hardTime()]);
			kernel.pushSignal('time', timer.curTime());
		}
		timerDisplay(state);
		lastState = state;
	}

	function timerDisplay(state) {
		if (state.greenLight) {
			timer.lcd.color('g');
		} else if (state.rightHand && state.leftHand) {
			timer.lcd.color('r');
		} else if (timer.status() == -4) {
			timer.lcd.color('g');
		} else {
			timer.lcd.color('');
		}
		timer.lcd.setRunning(timer.status() == -3 || (state.running && state.signalHeader != 67));
	}

	function onkeyup(keyCode) {
		var now = $.now();
		if (keyCode == 32 && timer.status() == -4) {
			timer.status(-3);
			timer.lcd.reset();
			timer.startTime(now);
			timer.lcd.fixDisplay(false, keyCode == 32);
		}
		if (keyCode == 32) {
			kernel.clrKey();
		}
	}

	function onkeydown(keyCode) {
		var now = $.now();

		if (keyCode == 32 && timer.status() == -1 && timer.checkUseIns() && lastState.on && lastState.time_milli == 0) {
			timer.status(-4);
			timer.startTime(now);
			timer.lcd.fixDisplay(true, true);
		} else if (keyCode == 27 && timer.status() <= -1) { //inspection or ready to start, press ESC to reset
			timer.status(-1);
			timer.lcd.fixDisplay(true, false);
		}
		if (keyCode == 32) {
			kernel.clrKey();
		}
	}

	timer.stackmat = {
		setEnable: function(input) { //s: stackmat, m: moyu
			enable = input == 's' || input == 'm';
			if (enable) {
				stackmatutil.setCallBack(stackmatCallback);
				stackmatutil.init(input, false).then($.noop, function() {
					kernel.showDialog([$('<div>Press OK To Connect To Stackmat</div>'), function() {
						stackmatutil.init(input, true).then($.noop, console.log);
					}, 0, 0], 'share', 'Stackmat Connect');
				});
			} else {
				stackmatutil.stop();
			}
		},
		onkeyup: onkeyup,
		onkeydown: onkeydown
	};
}, [timer]);
