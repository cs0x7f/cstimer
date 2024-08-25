execMain(function(timer) {
	var input = $('<textarea id="inputTimer" rows="1" />');
	var lastEmptyTrigger = 0;

	function parseInput() {
		//                          |1st     |2nd    |3rd    |4th        |5th        |6th              |7th                    |8th              |9th
		var reg = /^\s*(?:[\d]+\. )?\(?(DNF)?\(?(\d*?):?(\d*?):?(\d*\.?\d*?)(\+)?\)?(?:=([\d:.+]+?))?(?:\[([^\]]+)\])?\)?\s*(?:   ([^@].*?))?(?:   @(.*?))?\s*$/;
		var timeRe = /^(\d*?):?(\d*?):?(\d*\.?\d*?)$/;
		var arr = input.val();
		var now = $.now();
		if (/^[\s\n]*$/.exec(arr) && now > lastEmptyTrigger + 500) {
			kernel.pushSignal('ctrl', ['scramble', 'next']);
			lastEmptyTrigger = now;
			input.val('');
			return;
		}
		arr = arr.split(/\s*[,\n]\s*/);
		var time, ins, comment, scramble;
		for (var i = 0; i < arr.length; i++) {
			var m = reg.exec(arr[i]);
			if (m != null && m[4] != "") {
				time = ~~Math.round(3600000 * Math.floor(m[2]) + 60000 * Math.floor(m[3]) + 1000 * parseFloat(m[4]));
				if (time <= 0) {
					continue;
				}
				if (m[2] == '' && m[3] == '' && /^\d+$/.exec(m[4])) {
					var intUN = kernel.getProp('intUN') || 20100;
					var modUN = intUN % 10000;
					time = Math.floor(time / modUN);
					var hh = Math.floor(time / 10000000);
					var mi = Math.floor(time / 100000) % 100;
					var ss = time % 100000;
					if (intUN > 20000) {
						time = (60 * hh + mi) * 60000 + ss;
					} else if (intUN > 10000) {
						time = (100 * hh + mi) * 60000 + ss;
					}
				}
				if (m[1] == "DNF") {
					ins = -1;
				} else if (m[5] == "+" && time > 2000) {
					ins = 2000;
					time -= 2000;
				} else {
					ins = 0;
				}
				var timeSplit = [];
				if (m[6]) { //multi-phase timing
					timeSplit = m[6].split('+').reverse();
					var timeRemain = time;
					for (var j = 0; j < timeSplit.length; j++) {
						var mt = timeRe.exec(timeSplit[j]);
						if (mt == null) {
							timeRemain = 1e8;
							break;
						}
						timeRemain -= Math.round(3600000 * Math.floor(mt[1]) + 60000 * Math.floor(mt[2]) + 1000 * parseFloat(mt[3]));
						timeSplit[j] = Math.max(0, timeRemain);
					}
					if (Math.abs(timeRemain) > 10 * timeSplit.length) {
						timeSplit = [];
					} else {
						timeSplit.pop();
					}
				}
				comment = m[7] || "";
				scramble = m[8];
				var curTime = [comment, scramble, [ins, time].concat(timeSplit)];
				var timestamp = mathlib.str2time(m[9]);
				if (timestamp) {
					curTime.push(timestamp);
				}
				timer.curTime(curTime);
				kernel.pushSignal('time', curTime);
				kernel.clrKey();
			}
		}
		input.val('');
	}

	function setEnable(enable) {
		enable ? input.show() : input.hide();
		if (enable) {
			timer.setFobj(input);
			input[0].select();
			input.unbind("click").click(function() {
				input[0].select();
			});
		} else {
			timer.setFobj();
		}
	}

	var lastDown = 0;
	var lastStop = 0;
	function onkeyup(keyCode, isTrigger) {
		var now = $.now();
		if (!timer.checkUseIns()) {
			return;
		} else if (isTrigger) {
			if (timer.status() == 0) {
				timer.status(-1);
			} else if (timer.status() == -1 || timer.status() == -3) {
				if (now - lastStop < 500) {
					timer.lcd.fixDisplay(false, isTrigger);
					return;
				}
			} else if (timer.status() == -4) {
				timer.startTime(now);
				timer.status(-3);
			}
		}
		timer.lcd.fixDisplay(false, isTrigger);
		if (isTrigger) {
			kernel.clrKey();
		}
	}

	function onkeydown(keyCode, isTrigger) {
		var now = $.now();
		if (!timer.checkUseIns()) {
			return;
		} else if (now - lastDown < 200) {
			return;
		} else if (timer.status() == -3 || keyCode == 27) {
			timer.status(isTrigger ? 0 : -1);
			timer.lcd.fixDisplay(false, false);
		} else if (isTrigger && timer.status() == -1) {
			timer.status(-4);
		}
		timer.lcd.fixDisplay(true, isTrigger);
		if (isTrigger) {
			kernel.clrKey();
		}
	}

	$(function() {
		$('#lcd').after(input);
	});

	timer.input = {
		setEnable: setEnable,
		parseInput: parseInput,
		onkeydown: function(keyCode, e) {
			if (keyCode == 28) {
				return;
			}
			return onkeydown(keyCode, timer.keyboard.detectTrigger(keyCode, 0, e));
		},
		onkeyup: function(keyCode, e) {
			return onkeyup(keyCode, timer.keyboard.detectTrigger(keyCode, 1, e));
		},
		clear: function() {
			input.val('');
		}
	};
}, [timer]);
