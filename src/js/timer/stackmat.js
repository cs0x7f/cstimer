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
			timer.setHard();
			timer.setStatus(-1);
			timer.lcd.fixDisplay(false, true);
			lastState = state;
			return;
		}
		timer.setHard(state.time_milli);
		timer.lcd.renderUtil();
		if (state.running) {
			if (timer.getStatus() == -3 || timer.getStatus() == -4) {
				inspectionTime = now - timer.getStart() - timer.getHard();
				timer.lcd.reset();
			}
			timer.setCur([0]);
			timer.setStatus(1);
			timer.setStart(now - timer.getHard());
			timer.lcd.fixDisplay(false, true);
		} else if (timer.getStatus() == -1 && timer.checkUseIns() && timer.getHard() == 0 && (state.signalHeader == 'R' || state.signalHeader == 'L')) {
			timer.setStatus(-3);
			timer.setStart(now);
			timer.lcd.fixDisplay(false, true);
		} else if (timer.getStatus() != -3 && timer.getStatus() != -4) {
			timer.setStatus(-1);
			timer.lcd.fixDisplay(false, true);
		}
		if (lastState.running && !state.running && state.time_milli != 0) {
			inspectionTime = timer.checkUseIns() ? inspectionTime > 17000 ? -1 : (inspectionTime > 15000 ? 2000 : 0) : 0;
			timer.setCur([inspectionTime, ~~timer.getHard()]);
			kernel.pushSignal('time', timer.getCur());
		}
		timerDisplay(state);
		lastState = state;
	}

	function timerDisplay(state) {
		if (state.greenLight) {
			timer.lcd.color('g');
		} else if (state.rightHand && state.leftHand) {
			timer.lcd.color('r');
		} else if (timer.getStatus() == -4) {
			timer.lcd.color('g');
		} else {
			timer.lcd.color('');
		}
		timer.lcd.setRunning(timer.getStatus() == -3 || (state.running && state.signalHeader != 67));
	}

	function onkeyup(keyCode) {
		var now = $.now();
		if (keyCode == 32 && timer.getStatus() == -4) {
			timer.setStatus(-3);
			timer.lcd.reset();
			timer.setStart(now);
			timer.lcd.fixDisplay(false, keyCode == 32);
		}
		if (keyCode == 32) {
			kernel.clrKey();
		}
	}

	function onkeydown(keyCode) {
		var now = $.now();

		if (keyCode == 32 && timer.getStatus() == -1 && timer.checkUseIns() && lastState.on && lastState.time_milli == 0) {
			timer.setStatus(-4);
			timer.setStart(now);
			timer.lcd.fixDisplay(true, true);
		} else if (keyCode == 27 && timer.getStatus() <= -1) { //inspection or ready to start, press ESC to reset
			timer.setStatus(-1);
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
