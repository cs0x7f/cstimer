"use strict";

var timer = execMain(function(regListener, regProp, getProp, pretty, ui, pushSignal) {
	var container;

	/**
	 * n: n phase(s) before stop
	 * -1: idle
	 * -2: ready to start (space pressed)
	 * -3: inspecting
	 * -4: ready to inspection (space pressed)
	 */
	var status = -1;

	function setStatus(_status) {
		if (_status == status) {
			return;
		}
		status = _status;
		lcd.renderUtil();
		kernel.pushSignal('timerStatus', status);
	}

	var curTime = []; //[inspection time, phaseN, phaseN-1, ...]
	var startTime;
	var hardTime;

	var rawMoves = [];

	function reset() {
		var type = getProp('input');
		setStatus(-1);

		virtual333.setEnable(type == 'v' || type == 'q');
		virtual333.reset();
		lcd.setEnable(type != 'i');
		lcd.reset(type == 'v' || type == 'q' || type == 'g' && getProp('giiVRC') != 'n');
		keyboardTimer.reset();
		inputTimer.setEnable(type == 'i');
		lcd.renderUtil();
		lcd.fixDisplay(false, true);
	}

	var voicen = {
		play: $.noop
	};
	var voicem8s = voicen;
	var voicem12s = voicen;
	var voicef8s = voicen;
	var voicef12s = voicen;

	if (window['Audio'] !== undefined) {
		voicem8s = new Audio("data:audio/mp3;base64,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");
		voicem12s = new Audio("data:audio/mp3;base64,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");
		voicef8s = new Audio("data:audio/mp3;base64,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");
		voicef12s = new Audio("data:audio/mp3;base64,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");
	}

	var bluetoothInstructDiv;

	function checkUseIns() {
		var ret = getProp('useIns');
		if (ret === true || ret == 'a') {
			return true;
		} else if (ret === false || ret == 'n') {
			return false;
		} else if (ret == 'b') {
			return /^(333ni|444bld|555bld|r3ni)$/.exec(getProp('scrType')) == null;
		}
	}

	function updateMulPhase(totPhases, curProgress, now) {
		if (curProgress < status) {
			for (var i = status; i > curProgress; i--) {
				curTime[i] = now - startTime;
			}
		}
		setStatus(Math.min(curProgress, status) || 1);
	}

	var lcd = (function() {

		var mainDiv;
		var rightDiv = $('<div />');
		var runningDiv;
		var runningId;
		var rightADiv = $('<div style="line-height:0.6em;" />');
		var reconsDiv = $('<div style="position:relative;font-size:0.3em;">');
		var reconsSpan = $('<span class="click" style="position:relative;z-index:20;font-family:Arial;">');

		var staticAppend = "";
		var divDict = ["", ""];
		var isRight = false;

		var lasttime = 0;

		function setRunning(run) {
			if (run && runningId == undefined) {
				requestAnimFrame(runningThread);
				runningId = 1;
				lasttime = 0;
			} else if (!run && runningId != undefined) {
				runningId = undefined;
			}
			runningDiv = isRight ? rightDiv : mainDiv;
		}

		function runningThread(timestamp) {
			if (status == 0 || status == -1 || status == -4 || runningId == undefined) {
				return;
			}
			var time = $.now() - startTime;
			if (status == -3 || (status == -2 && checkUseIns())) {
				setHtml(runningDiv, (getProp('timeU') != 'n' ? ((time > 17000) ? 'DNF' : (time > 15000) ? '+2' : 15 - ~~(time / 1000)) : TIMER_INSPECT));
			} else { //>0
				var pret = pretty(time > 0 ? time : 0, true);
				setHtml(runningDiv, {
					'u': pret,
					'c': pret.replace(/([.>])(\d)\d+(<|$)/, "$1$2$3"),
					's': pret.split(".")[0],
					'n': TIMER_SOLVE,
					'i': TIMER_SOLVE
				} [getProp('timeU')]);
			}

			if (status == -3 || status == -2) { //inspection alert
				if (runningDiv !== rightDiv) {
					if (time >= 12000) {
						setHtml(rightDiv, '<div style="font-family: Arial;">Go!!!</div>');
					} else if (time >= 8000) {
						setHtml(rightDiv, '<div style="font-family: Arial;">8s!</div>');
					}
				}
				if (getProp('voiceIns') != 'n') {
					var voice = voicen;
					if (time >= 7900 && lasttime < 7900) {
						voice = getProp('voiceIns') == '1' ? voicem8s : voicef8s;
					}
					if (time >= 11900 && lasttime < 11900) {
						voice = getProp('voiceIns') == '1' ? voicem12s : voicef12s;
					}
					voice.volume = ~~getProp('voiceVol') / 100;
					voice.play();
				}
			} else if (runningDiv !== rightDiv) {
				setHtml(rightDiv, '');
			}

			lasttime = time;
			requestAnimFrame(runningThread);
		}

		function fixDisplay(isKeyDown, isSpace) {
			var run = false;
			if (status == 0) {
				lcd.color('red');
			} else if (status == -1 || status == -4) {
				setColor(isKeyDown && isSpace ? (checkUseIns() ? '#0d0' : '#f00') : '');
			} else if (status == -2) {
				setColor(isKeyDown && isSpace ? '#0d0' : '');
				run = checkUseIns();
			} else if (status == -3) {
				setColor(isKeyDown && isSpace ? '#dd0' : '#f00');
				run = true;
			} else {
				setColor(isKeyDown ? '#0d0' : '');
				run = true;
			}
			ui.setAutoShow(status == 0 || status == -1);
			setRunning(run);
		}

		function setColor(val) {
			mainDiv.css('color', val);
			rightDiv.css('color', val);
		}

		function setValue(val) {
			setHtml(isRight ? rightDiv : mainDiv, val != undefined ? pretty(val, true) : '--:--');
		}

		function setHtml(div, val) {
			var idx = div === rightDiv ? 1 : 0;
			if (divDict[idx] === val) {
				return;
			}
			divDict[idx] = val;
			div.html(val);
		}

		function append(val) {
			setHtml(rightDiv, rightDiv.html() + val);
		}

		function setStaticAppend(val, append) {
			if (append) {
				staticAppend += val;
			} else {
				staticAppend = val;
			}
		}

		function setEnable(enable) {
			if (enable) {
				mainDiv.show();
			} else {
				mainDiv.hide();
			}
		}

		function reset(right) {
			isRight = right;
			mainDiv.empty();
			rightDiv.empty();
			if (isRight) {
				mainDiv.removeClass('activetimer');
				rightDiv.addClass('activetimer');
			} else {
				mainDiv.addClass('activetimer');
				rightDiv.removeClass('activetimer');
			}
			divDict[0] = "";
			divDict[1] = "";
			setStaticAppend("", false);
			setValue(0, isRight);
			setRunning(false);
			avgDiv.updatePos(isRight);
		}

		function getMulPhaseAppend(curProgress, totPhases) {
			var ret = [];
			for (var i = totPhases; i > curProgress; i--) {
				ret.push(pretty(curTime[i] - ~~curTime[i + 1], true));
			}
			return curProgress == totPhases || totPhases == 1 || ret.length == 0 ? '' :
				'<div style="font-size: 0.65em">' + '=' + ret.join('<br>+') + '</div>';
		}


		var value;
		function setRecons(_value) {
			value = _value;
		}

		var isCleared = false;

		function renderUtil(clear) {
			// render inspection icon
			if (checkUseIns() && [-1, -4].indexOf(status) != -1 && getProp('showIns')) {
				mainDiv.addClass('insp');
				rightDiv.addClass('insp');
			} else {
				mainDiv.removeClass('insp');
				rightDiv.removeClass('insp');
			}
			if (clear && status == -1) {
				isCleared = true;
			} else if (status != -1) {
				isCleared = false;
			}
			var mpAppend = status > -2 && !isCleared ? getMulPhaseAppend(Math.max(0, status), Math.max(curTime.length - 1, status)) : '';
			rightADiv.html(mpAppend + staticAppend);
			if (status == -1 || status == 0) {
				if ('sb'.indexOf(getProp('input')) != -1) {
					lcd.val(hardTime);
				} else {
					lcd.val(isCleared ? 0 : (curTime[1] || 0));
				}
				if (value && value[4] && !isCleared) {
					reconsDiv.show();
					var puzzle = typeof value[4][1] == 'string' && value[4][1] || tools.getCurPuzzle() || '333';
					var moveCnt = puzzle == '333' ? recons.getMoveCnt(value[4][0]) : value[4][2];
					var txt = STATS_REVIEW;
					if (moveCnt > 0) {
						txt = moveCnt + " turns<br>" + ~~(100000 * moveCnt / value[0][1]) / 100.0 + " tps";
					}
					reconsSpan.html(txt).unbind('click').click(function() {
						replay.popupReplay(value[1], value[4][0], puzzle);
					});
				} else {
					reconsDiv.hide();
				}
			} else {
				reconsDiv.hide();
			}
		}

		$(function() {
			mainDiv = $('#lcd');
			$('#multiphase').append(rightDiv, rightADiv, reconsDiv.append(reconsSpan));
		});

		return {
			setRunning: setRunning,
			color: setColor,
			val: setValue,
			setEnable: setEnable,
			append: append,
			setStaticAppend: setStaticAppend,
			fixDisplay: fixDisplay,
			renderUtil: renderUtil,
			setRecons: setRecons,
			reset: reset
		}
	})();

	var avgDiv = (function() {
		var avgDiv;
		var avgDiv1 = $('<span class="click">');
		var avgDiv2 = $('<span class="click">');

		var isShowAvgDiv = true;
		var isRight = false;
		var curValue;

		function showAvgDiv(enable) {
			if (enable && getProp('showAvg')) {
				if (!isShowAvgDiv) {
					avgDiv.show();
					isShowAvgDiv = true;
				}
			} else {
				if (isShowAvgDiv) {
					avgDiv.hide();
					isShowAvgDiv = false;
				}
			}
		}

		function setValue(value) {
			if (!value) {
				return;
			}
			avgDiv1.html(value[0]).unbind('click');
			if (value[2] != undefined) {
				avgDiv1.addClass('click').click(function() {
					value[4](value[2][0], value[2][1], value[2][2], value[2][3]);
				});
			} else {
				avgDiv1.removeClass('click');
			}
			avgDiv2.html(value[1]).unbind('click');
			if (value[3] != undefined) {
				avgDiv2.addClass('click').click(function() {
					value[4](value[3][0], value[3][1], value[3][2], value[3][3]);
				});
			} else {
				avgDiv2.removeClass('click');
			}
			if (value[5]) {
				curTime = value[5][0].slice();
			} else {
				curTime = [0];
			}
			lcd.setRecons(value[5]);
			lcd.renderUtil();
		}

		function procSignal(signal, value) {
			curValue = value;
			setValue(curValue);
		}

		function updatePos(_isRight) {
			if (isRight == !!_isRight) {
				return;
			}
			isRight = !!_isRight;
			if (isRight) {
				avgDiv.appendTo('#multiphase');
			} else {
				avgDiv.appendTo('#container');
			}
			setValue(curValue);
		}

		$(function() {
			avgDiv = $('#avgstr').append(avgDiv1, '<br>', avgDiv2);
			regListener('timer', 'avg', procSignal);
		});

		return {
			showAvgDiv: showAvgDiv,
			updatePos: updatePos
		}
	})();

	var keyboardTimer = (function() {

		var lastDown = 0;
		var lastStop = 0;
		var pressreadyId = undefined;

		function clearPressReady() {
			if (pressreadyId != undefined) {
				clearTimeout(pressreadyId);
				pressreadyId = undefined;
			}
		}

		function onkeyup(keyCode, isTrigger) {
			var now = $.now();
			if (isTrigger) {
				if (status == 0) {
					setStatus(-1);
				} else if (status == -1 || status == -3) {
					clearPressReady();
					if (now - lastStop < 500) {
						lcd.fixDisplay(false, isTrigger);
						return;
					}
				} else if (status == -2) {
					var time = now;
					var insTime = checkUseIns() ? (time - startTime) : 0;
					startTime = time;
					curTime = [insTime > 17000 ? -1 : (insTime > 15000 ? 2000 : 0)];
					setStatus(getProp('phases'));
				} else if (status == -4) {
					startTime = now;
					setStatus(-3);
				}
			}
			lcd.fixDisplay(false, isTrigger);
			if (isTrigger) {
				kernel.clrKey();
			}
		}

		function onkeydown(keyCode, isTrigger) {
			var now = $.now();
			if (now - lastDown < 200) {
				return;
			}
			if (status > 0) {
				lastDown = now;
				curTime[status] = lastDown - startTime;
				if (keyCode == 27) {
					var times = [-1],
						i = 1;
					while (status < curTime.length) {
						times[i++] = curTime[status++];
					}
					curTime = times;
					setStatus(1);
				}
				setStatus(status - 1);
				if (status == 0) {
					lastStop = lastDown;
					if (keyCode != 32) {
						setStatus(-1);
					}
					lcd.fixDisplay(false, isTrigger);
					pushSignal('time', curTime);
				}
			} else if (isTrigger) {
				if ((status == (checkUseIns() ? -3 : -1)) && pressreadyId == undefined) {
					pressreadyId = setTimeout(pressReady, getProp('preTime'));
				} else if (status == -1 && checkUseIns()) {
					setStatus(-4);
				}
			} else if (keyCode == 27 && status <= -1) { //inspection or ready to start, press ESC to reset
				clearPressReady();
				setStatus(-1);
				lcd.fixDisplay(false, false);
			}
			lcd.fixDisplay(true, isTrigger);
			if (isTrigger) {
				kernel.clrKey();
			}
		}

		function pressReady() {
			if (status == -1 || status == -3) {
				if (status == -1) {
					lcd.reset();
				}
				setStatus(-2);
				pressreadyId = undefined;
				lcd.fixDisplay(true, true);
			}
		}

		function reset() {
			if (pressreadyId != undefined) {
				clearTimeout(pressreadyId);
				pressreadyId = undefined;
			}
			lastDown = lastStop = 0;
		}

		var ctrlStatus = 0x0;

		//type: 0 down, 1 up
		function detectTrigger(keyCode, type, e) {
			var prevStatus = ctrlStatus;
			if (keyCode > 255) {
				if (type) {
					ctrlStatus &= ~(1 << keyCode);
				} else {
					ctrlStatus |= (1 << keyCode);
				}
			} else if (!e.ctrlKey) {
				ctrlStatus = 0;
			}
			return keyCode == 32 || (prevStatus == 3 && keyCode > 255) || ctrlStatus == 3;
		}

		return {
			onkeydown: function(keyCode, e) {
				if (keyCode == 28) {
					return;
				}
				return onkeydown(keyCode, detectTrigger(keyCode, 0, e));
			},
			onkeyup: function(keyCode, e) {
				return onkeyup(keyCode, detectTrigger(keyCode, 1, e));
			},
			reset: reset
		}
	})();

	var inputTimer = (function() {
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
					time = Math.round(3600000 * Math.floor(m[2]) + 60000 * Math.floor(m[3]) + 1000 * parseFloat(m[4]));
					if (time == 0) {
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
					//TODO timestamp = m[9]
					curTime = [comment, scramble, [ins, time].concat(timeSplit)];
					var timestamp = mathlib.str2time(m[9]);
					if (timestamp) {
						curTime.push(timestamp);
					}
					pushSignal('time', curTime);
					kernel.clrKey();
				}
			}
			input.val('');
		}

		function setEnable(enable) {
			enable ? input.show() : input.hide();
			if (enable) {
				fobj = input;
				input[0].select();
				input.unbind("click").click(function() {
					input[0].select();
				});
			} else {
				fobj = undefined;
			}
		}

		$(function() {
			$('#lcd').after(input);
		});

		return {
			setEnable: setEnable,
			parseInput: parseInput,
			clear: function() {
				input.val('');
			}
		}
	})();

	var stackmatTimer = (function() {
		var enable = false;
		var lastState = {};
		var inspectionTime;

		function stackmatCallback(state) {
			if (!enable) {
				return;
			}
			var now = $.now();
			if (!state.on) {
				hardTime = undefined;
				setStatus(-1);
				lcd.fixDisplay(false, true);
				lastState = state;
				return;
			}
			hardTime = state.time_milli;
			lcd.renderUtil();
			if (state.running) {
				if (status == -3 || status == -4) {
					inspectionTime = now - startTime - hardTime;
					lcd.reset();
				}
				curTime = [0];
				setStatus(1);
				startTime = now - hardTime;
				lcd.fixDisplay(false, true);
			} else if (status == -1 && checkUseIns() && hardTime == 0 && (state.signalHeader == 'R' || state.signalHeader == 'L')) {
				setStatus(-3);
				startTime = now;
				lcd.fixDisplay(false, true);
			} else if (status != -3 && status != -4) {
				setStatus(-1);
				lcd.fixDisplay(false, true);
			}
			if (lastState.running && !state.running && state.time_milli != 0) {
				inspectionTime = checkUseIns() ? inspectionTime > 17000 ? -1 : (inspectionTime > 15000 ? 2000 : 0) : 0;
				curTime = [inspectionTime, ~~hardTime];
				pushSignal('time', curTime);
			}
			timerDisplay(state);
			lastState = state;
		}

		function timerDisplay(state) {
			if (state.greenLight) {
				lcd.color('#0d0');
			} else if (state.rightHand && state.leftHand) {
				lcd.color('#f00');
			} else if (status == -4) {
				lcd.color('#0d0');
			} else {
				lcd.color('');
			}
			lcd.setRunning(status == -3 || (state.running && state.signalHeader != 67));
		}

		function onkeyup(keyCode) {
			var now = $.now();
			if (keyCode == 32 && status == -4) {
				setStatus(-3);
				lcd.reset();
				startTime = now;
				lcd.fixDisplay(false, keyCode == 32);
			}
			if (keyCode == 32) {
				kernel.clrKey();
			}
		}

		function onkeydown(keyCode) {
			var now = $.now();

			if (keyCode == 32 && status == -1 && checkUseIns() && lastState.on && lastState.time_milli == 0) {
				setStatus(-4);
				startTime = now;
				lcd.fixDisplay(true, true);
			} else if (keyCode == 27 && status <= -1) { //inspection or ready to start, press ESC to reset
				setStatus(-1);
				lcd.fixDisplay(true, false);
			}
			if (keyCode == 32) {
				kernel.clrKey();
			}
		}

		return {
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
		}
	})();

	// Timer Implementation that uses GAN Smart Timer via its Bluetooth protocol
	var ganSmartTimer = (function () {

		var enable = false;
		var inspectionTime = 0;

		function onGanTimerEvent(timerEvent) {
			if (!enable)
				return;
			switch (timerEvent.state) {
				case GanTimerState.HANDS_ON: // both hands placed on timer
					lcd.color('#f00');
					break;
				case GanTimerState.HANDS_OFF: // hands removed from timer before grace period expired
					lcd.fixDisplay(false, true);
					break;
				case GanTimerState.GET_SET:   // grace period expired and timer is ready to start
					lcd.color('#0d0');
					break;
				case GanTimerState.IDLE: // timer reset button pressed
					inspectionTime = 0;
					if (hardTime > 0 || status != -1) { // reset timer / cancel inspection timer
						hardTime = 0;
						setStatus(-1);
						lcd.reset();
						lcd.fixDisplay(false, true);
					} else if (status == -1 && checkUseIns()) { // start inspection timer if was idle and inspection enabled in settings
						setStatus(-3);
						startTime = $.now();
						lcd.fixDisplay(false, true);
					}
					lcd.renderUtil();
					break;
				case GanTimerState.RUNNING: // timer is started
					if (status == -3) { // if inspection timer was running, record elapsed inspection time
						inspectionTime = $.now() - startTime;
						// 0 == Normal, 2000 == +2, -1 == DNF
						inspectionTime = checkUseIns() ? inspectionTime > 17000 ? -1 : (inspectionTime > 15000 ? 2000 : 0) : 0;
					}
					startTime = $.now();
					lcd.reset();
					curTime = [inspectionTime];
					setStatus(1);
					lcd.fixDisplay(false, true);
					break;
				case GanTimerState.STOPPED: // timer is stopped, recorded time returned from timer
					hardTime = timerEvent.recordedTime.asTimestamp;
					curTime[1] = hardTime;
					setStatus(-1);
					lcd.renderUtil();
					lcd.fixDisplay(false, true);
					pushSignal('time', curTime);
					break;
				case GanTimerState.DISCONNECT: // timer is switched off or something else
					hardTime = undefined;
					setStatus(-1);
					lcd.renderUtil();
					lcd.fixDisplay(false, true);
					break;
			}

		}

		function setEnableImpl(input) {
			enable = input == 'b';
			if (enable) {
				hardTime = undefined;
				kernel.showDialog([$('<div><br><br><b>Press OK to connect to GAN Smart Timer</b><br><br>If you have enabled WCA inspections in settings, use GAN Smart Timer RESET button to start/cancel inspection timer.</div>').append(bluetoothInstructDiv), function () {
					GanTimerDriver.connect().then(function () {
						GanTimerDriver.setStateUpdateCallback(onGanTimerEvent);
						hardTime = 0;
						setStatus(-1);
						lcd.reset();
						lcd.renderUtil();
						lcd.fixDisplay(false, true);
					}).catch(function (err) {
						alert(err);
					});
				}, 0, 0], 'share', 'GAN Smart Timer');
			} else {
				GanTimerDriver.disconnect();
			}
		}

		return {
			setEnable: setEnableImpl,
			onkeyup: $.noop,
			onkeydown: $.noop
		};

	})();

	var virtual333 = (function() {
		var puzzleObj;
		var vrcType = '';
		var insTime = 0;
		var moveCnt = 0;
		var totPhases = 1;

		//mstep: 0 move start, 1 move doing, 2 move finish
		function moveListener(move, mstep, ts) {
			if (mstep == 1) {
				return;
			}
			var now = ts || $.now();
			if (status == -3 || status == -2) {
				if (puzzleObj.isRotation(move) && !/^(333ni|444bld|555bld)$/.exec(curScrType)) {
					if (mstep == 0) {
						rawMoves[0].push([puzzleObj.move2str(move), 0]);
					}
					return;
				} else {
					if (checkUseIns()) {
						insTime = now - startTime;
					} else {
						insTime = 0;
					}
					startTime = now;
					moveCnt = 0;
					curTime = [insTime > 17000 ? -1 : (insTime > 15000 ? 2000 : 0)];
					setStatus(curScrSize == 3 && curScrType != "r3" ? cubeutil.getStepCount(getProp('vrcMP', 'n')) : 1);
					var inspectionMoves = rawMoves[0];
					rawMoves = [];
					for (var i = 0; i < status; i++) {
						rawMoves[i] = [];
					}
					rawMoves[status] = inspectionMoves;
					totPhases = status;
					updateMulPhase(totPhases, puzzleObj.isSolved(getProp('vrcMP', 'n')), now);
					fixRelayCounter();
					lcd.fixDisplay(false, true);
				}
			}
			if (status >= 1) {
				if (/^(333ni|444bld|555bld)$/.exec(curScrType) && !puzzleObj.isRotation(move)) {
					puzzleObj.toggleColorVisible(puzzleObj.isSolved(getProp('vrcMP', 'n')) == 0);
				}
				if (mstep == 0) {
					rawMoves[status - 1].push([puzzleObj.move2str(move), now - startTime]);
				}
				var curProgress;
				if (mstep == 2) {
					curProgress = puzzleObj.isSolved(getProp('vrcMP', 'n'));
					updateMulPhase(totPhases, curProgress, now);
					fixRelayCounter();
				}
				if (mstep == 2 && curProgress == 0) {
					moveCnt += puzzleObj.moveCnt();
					if (/^r\d+$/.exec(curScrType) && curScramble.length != 0) {
						if (curScrType != "r3") {
							curScrSize++;
						}
						reset(true);
						scrambleIt();
						return;
					}
					lcd.setStaticAppend('');
					setStatus(-1);
					$('#lcd').css({'visibility': 'unset'}); // disable dragging
					lcd.fixDisplay(false, true);
					rawMoves.reverse();
					pushSignal('time', ["", 0, curTime, 0, [$.map(rawMoves, cubeutil.moveSeq2str).filter($.trim).join(' '), curPuzzle, moveCnt]]);
				}
			}
		}

		function reset(temp) {
			if (isReseted && getProp('input') == vrcType || !isEnable) {
				return;
			}
			isReseted = true;
			vrcType = getProp('input');
			var size = curScrSize;
			if (!size) {
				size = 3;
			}
			var options = {
				puzzle: "cube" + size,
				allowDragging: true
			};
			if (['skb', 'mgm', 'pyr', 'sq1', 'clk'].indexOf(curPuzzle) != -1) {
				options = {
					puzzle: curPuzzle
				};
			}
			options['style'] = getProp('input');
			puzzleFactory.init(options, moveListener, div, function(ret, isInit) {
				puzzleObj = ret;
				if (isInit && !puzzleObj) {
					div.css('height', '');
					div.html('--:--');
				}
				if (!temp || isInit) {
					lcd.setStaticAppend('');
					lcd.fixDisplay(false, true);
					lcd.renderUtil();
					setSize(getProp('timerSize'));
				}
			});
		}

		function fixRelayCounter() {
			if (/^r\d+$/.exec(curScrType)) {
				lcd.setStaticAppend((curScramble.length + 1) + "/" + relayScrs.length);
				lcd.renderUtil();
			}
		}

		function scrambleIt() {
			reset();
			var scramble = curScramble;
			if (/^r\d+$/.exec(curScrType)) {
				scramble = curScramble.shift().match(/\d+\) (.*)$/)[1];
				fixRelayCounter();
			}
			scramble = puzzleObj.parseScramble(scramble, true);
			isReseted = false;

			puzzleObj.applyMoves(scramble);
			puzzleObj.moveCnt(true);
			rawMoves = [
				[]
			];
		}

		function onkeydown(keyCode) {
			if (puzzleObj == undefined) {
				return;
			}
			var now = $.now();
			if (status == -1) { // idle
				if (keyCode == 32) {
					if (relayScrs) {
						curScramble = relayScrs.slice();
					}
					scrambleIt();
					if (checkUseIns()) {
						startTime = now;
						setStatus(-3); //inspection
					} else {
						lcd.val(0);
						setStatus(-2); //ready
					}
					$('#lcd').css({'visibility': 'hidden'}); // enable dragging
					lcd.fixDisplay(false, true);
				}
			} else if (status == -3 || status == -2 || status >= 1) { // Scrambled or Running
				if (keyCode == 27 || keyCode == 28) { //ESC
					var recordDNF = status >= 1;
					lcd.setStaticAppend('');
					setStatus(-1);
					reset();
					$('#lcd').css({'visibility': 'unset'}); // disable dragging
					lcd.fixDisplay(false, true);
					if (recordDNF) {
						rawMoves.reverse();
						pushSignal('time', ["", 0, [-1, now - startTime], 0, [$.map(rawMoves, cubeutil.moveSeq2str).filter($.trim).join(' '), curPuzzle, moveCnt]]);
					}
				} else {
					var mappedCode = help.getMappedCode(keyCode);
					var a = {
						"keyCode": mappedCode
					};
					puzzleObj.keydown(a);
				}
			}
			if (keyCode == 27 || keyCode == 32) {
				kernel.clrKey();
			}
		}

		var curScramble;
		var relayScrs;
		var curScrType;
		var curScrSize;
		var curPuzzle;
		var types = ['', 'sq1', '222', '333', '444', '555', '666', '777', '888', '999', '101010', '111111', 'skb', 'mgm', 'pyr', 'clk'];
		var isReseted = false;

		function procSignal(signal, value) {
			if (signal == 'scramble' || signal == 'scrambleX') {
				curScrType = value[0];
				curScramble = value[1];
				var puzzle = tools.puzzleType(curScrType);
				var size = types.indexOf(puzzle);
				if (puzzle == 'cubennn') {
					size = value[2];
				}
				if (size != -1 && (curScrSize != size || curPuzzle != puzzle)) {
					curScrSize = size;
					curPuzzle = puzzle;
					isReseted = false;
					reset();
				}
				var m = value[0].match(/^r(\d)\d*$/);
				if (m) {
					relayScrs = curScramble.split('\n');
					if (curScrSize != ~~m[1]) {
						curScrSize = ~~m[1];
						isReseted = false;
						reset();
					}
				} else {
					relayScrs = null;
				}
			}
		}

		var div = $('<div />');
		var isEnable = false;

		function setEnable(enable) {
			isEnable = enable;
			if (enable) {
				div.show();
			} else {
				div.hide();
				isReseted = false;
			}
		}

		function setSize(value) {
			div.css('height', value * $('#logo').width() / 9 + 'px');
			puzzleObj && puzzleObj.resize();
		}

		$(function() {
			regListener('timer', 'scramble', procSignal);
			regListener('timer', 'scrambleX', procSignal);
			div.appendTo("#container");
		});
		return {
			onkeydown: onkeydown,
			setEnable: setEnable,
			setSize: setSize,
			reset: reset
		}
	})();


	var giikerTimer = (function() {

		var enable = false;
		var enableVRC = false;
		var waitReadyTid = 0;
		var moveReadyTid = 0;
		var insTime = 0;
		var div = $('<div />');
		var totPhases = 1;
		var currentFacelet = mathlib.SOLVED_FACELET;

		var giikerVRC = (function() {
			var isReseted = false;
			var curVRCCubie = new mathlib.CubieCube();
			var tmpCubie1 = new mathlib.CubieCube();
			var puzzleObj;
			var curOri = -1;

			function resetVRC(temp, force) {
				if ((isReseted && !force) || !enableVRC) {
					return;
				}
				var options = {
					puzzle: "cube3",
					style: getProp('giiVRC')
				};
				puzzleFactory.init(options, $.noop, div, function(ret, isInit) {
					puzzleObj = ret;
					if (isInit && !puzzleObj) {
						div.css('height', '');
						div.html('--:--');
					}
					if (!temp || isInit) {
						lcd.fixDisplay(false, true);
						setSize(getProp('timerSize'));
					}
					curVRCCubie.fromFacelet(mathlib.SOLVED_FACELET);
					if (!puzzleObj) {
						return;
					}
					var preScramble = puzzleObj.parseScramble('U2 U2', true);
					curVRCCubie.ori = 0;
					for (var i = 0; i < preScramble.length; i++) {
						curVRCCubie.selfMoveStr(puzzleObj.move2str(preScramble[i]));
					}
					puzzleObj.applyMoves(preScramble); // process pre scramble (cube orientation)
					var targetOri = getProp('giiOri');
					targetOri = targetOri == 'auto' ? -1 : ~~targetOri;
					setOri(targetOri);
				});
				isReseted = true;
			}

			function setSize(value) {
				div.css('height', value * $('#logo').width() / 9 + 'px');
				puzzleObj && puzzleObj.resize();
			}

			function setState(state, prevMoves, isFast) {
				if (puzzleObj == undefined || !enableVRC) {
					return;
				}
				tmpCubie1.fromFacelet(state);
				var todoMoves = [];
				var shouldReset = true;
				for (var i = 0; i < prevMoves.length; i++) {
					todoMoves.push(prevMoves[i]);
					tmpCubie1.selfMoveStr(prevMoves[i], true);
					if (tmpCubie1.isEqual(curVRCCubie)) {
						shouldReset = false;
						break;
					}
				}
				if (shouldReset) { //cannot get current state according to prevMoves
					resetVRC(false);
					curVRCCubie.fromFacelet(mathlib.SOLVED_FACELET);
					todoMoves = scramble_333.genFacelet(state);
				} else {
					todoMoves = todoMoves.reverse().join(' ');
				}
				var scramble;
				if (todoMoves.match(/^\s*$/) || !puzzleObj) {
					scramble = [];
				} else {
					scramble = puzzleObj.parseScramble(kernel.getConjMoves(todoMoves, true, curVRCCubie.ori));
				}
				if (scramble.length < 5) {
					puzzleObj.addMoves(scramble);
				} else {
					puzzleObj.applyMoves(scramble);
				}
				isReseted = false;
				curVRCCubie.fromFacelet(state);
			}

			function setOri(ori) {
				curOri = ori;
				if (curOri == -1 || curVRCCubie.ori == curOri) {
					return;
				}
				var todoRot = mathlib.CubieCube.rotMulI[curOri][curVRCCubie.ori];
				var todoMoves = mathlib.CubieCube.rot2str[todoRot].split(/\s+/);
				for (var i = 0; i < todoMoves.length; i++) {
					curVRCCubie.selfMoveStr(todoMoves[i]);
				}
				puzzleObj.applyMoves(puzzleObj.parseScramble(todoMoves.join(' ')));
			}

			return {
				resetVRC: resetVRC, //reset to solved
				setState: setState,
				setOri: setOri,
				setSize: setSize
			}
		})();

		function clearReadyTid() {
			if (waitReadyTid) {
				clearTimeout(waitReadyTid);
				waitReadyTid = 0;
			}
			if (moveReadyTid) {
				clearTimeout(moveReadyTid);
				moveReadyTid = 0;
			}
		}

		function giikerCallback(facelet, prevMoves, lastTs) {
			var locTime = lastTs[1] || $.now();
			var prevFacelet = currentFacelet;
			currentFacelet = facelet;
			if (!enable) {
				return;
			}
			if (enableVRC) {
				giikerVRC.setState(facelet, prevMoves, false);
			}
			clearReadyTid();
			var solvingMethod = getProp('vrcMP', 'n');
			if (status == -1) {
				if (!isGiiSolved(currentFacelet, true)) {
					var delayStart = getProp('giiSD');
					if (delayStart == 's') {
						//according to scramble
						if (giikerutil.checkScramble()) {
							markScrambled(locTime);
						}
					} else if (delayStart != 'n') {
						waitReadyTid = setTimeout(function() {
							markScrambled(locTime);
						}, ~~delayStart * 1000);
					}
					var moveStart = getProp('giiSM');
					if (moveStart != 'n') {
						var movere = {
							'x4': /^([URFDLB][ '])\1\1\1/,
							'xi2': /^([URFDLB])( \1'\1 \1'|'\1 \1'\1 )/
						} [moveStart];
						if (movere.exec(prevMoves.join(''))) {
							moveReadyTid = setTimeout(function() {
								markScrambled(locTime);
							}, 1000);
						}
					}
				}
			} else if (status == -3 || status == -2) {
				if (checkUseIns()) {
					insTime = locTime - startTime;
				} else {
					insTime = 0;
				}
				startTime = locTime;
				curTime = [insTime > 17000 ? -1 : (insTime > 15000 ? 2000 : 0)];
				setStatus(cubeutil.getStepCount(solvingMethod));
				rawMoves = [];
				for (var i = 0; i < status; i++) {
					rawMoves[i] = [];
				}
				totPhases = status;
				var initialProgress = cubeutil.getProgress(prevFacelet, solvingMethod);
				updateMulPhase(totPhases, initialProgress, locTime);
				lcd.reset(enableVRC);
				lcd.fixDisplay(false, true);
			}
			if (status >= 1) {
				rawMoves[status - 1].push([prevMoves[0], lastTs[0], lastTs[1]]);
				var curProgress = cubeutil.getProgress(facelet, solvingMethod);
				updateMulPhase(totPhases, curProgress, locTime);

				if (isGiiSolved(currentFacelet, false)) {
					rawMoves.reverse();
					var pretty = cubeutil.getPrettyReconstruction(rawMoves, solvingMethod);
					var moveCnt = pretty.totalMoves;
					giikerutil.setLastSolve(pretty.prettySolve);
					curTime[1] = locTime - startTime;
					setStatus(-1);
					giikerutil.reSync();
					lcd.fixDisplay(false, true);
					if (curTime[1] != 0) {
						var sol = giikerutil.tsLinearFix(rawMoves.flat()); // fit deviceTime to locTime
						var cnt = 0;
						DEBUG && console.log('time fit, old=', curTime);
						for (var i = 0; i < rawMoves.length; i++) {
							cnt += rawMoves[i].length;
							curTime[rawMoves.length - i] = cnt == 0 ? 0 : sol[cnt - 1][1];
						}
						DEBUG && console.log('time fit, new=', curTime);
						sol = kernel.getConjMoves(cubeutil.moveSeq2str(sol), true);
						pushSignal('time', ["", 0, curTime, 0, [sol, '333']]);
					} else if (getProp('giiMode') == 't') {
						kernel.pushSignal('ctrl', ['scramble', 'next']);
					}
				}
			}
		}

		function isGiiSolved(facelet, forScr) {
			if (forScr) {
				return facelet == mathlib.SOLVED_FACELET && getProp('giiMode') == 'n';
			}
			if (getProp('giiMode') == 't') {
				var curScrType = (tools.getCurScramble() || [])[0];
				var chkstep = {
					'coll': 'cpll',
					'cmll': 'cmll',
					'oll': 'oll',
					'eols': 'oll',
					'wvls': 'oll',
					'zbls': 'eoll'
				}[curScrType];
				if (chkstep) {
					return cubeutil.getStepProgress(chkstep, facelet) == 0;
				}
			}
			return facelet == mathlib.SOLVED_FACELET;
		}

		function markScrambled(now) {
			clearReadyTid();
			if (status == -1) {
				if (kernel.getProp('giiMode') == 'n') {
					if (!giikerutil.checkScramble()) {
						var gen = scramble_333.genFacelet(currentFacelet);
						pushSignal('scramble', ['333', kernel.getConjMoves(gen, true), 0]);
					}
					giikerutil.markScrambled();
				} else {
					giikerutil.markScrambled(true);
				}
				setStatus(-2);
				startTime = now;
				lcd.reset(enableVRC);
				lcd.fixDisplay(true, true);
				if (getProp('giiBS')) {
					metronome.playTick();
				}
			}
		}

		function setVRC(enable) {
			enableVRC = enable;
			enable ? div.show() : div.hide();
			if (enable) {
				giikerVRC.resetVRC(true, true);
			}
		}

		$(function() {
			div.appendTo("#container");
			regListener('giikerVRC', 'property', function(signal, value) {
				if (enableVRC) {
					giikerVRC.resetVRC(true, true);
					giikerVRC.setState(currentFacelet, ['U2', 'U2'], false);
				}
			}, /^(?:preScr|giiOri)$/);
		});

		return {
			setEnable: function(input) { //s: stackmat, m: moyu
				enable = input == 'g';
				if (enable && !GiikerCube.isConnected()) {
					giikerutil.setCallback(giikerCallback);
					kernel.showDialog([$('<div>Press OK To Connect To Bluetooth Cube</div>').append(bluetoothInstructDiv), function () {
						giikerutil.init().catch(function(error) {
							DEBUG && console.log('[giiker] init failed', error);
						});
					}, 0, 0], 'share', 'Bluetooth Connect');
				} else if (!enable) {
					giikerutil.stop();
				}
				setVRC(enable && getProp('giiVRC') != 'n');
			},
			onkeydown: function(keyCode) {
				var now = $.now();
				if (keyCode == 27 || keyCode == 28) {
					var recordDNF = status >= 1;
					clearReadyTid();
					setStatus(-1);
					giikerutil.reSync();
					lcd.fixDisplay(false, true);
					if (recordDNF) {
						curTime[0] = -1;
						rawMoves.reverse();
						var sol = giikerutil.tsLinearFix(rawMoves.flat()); // fit deviceTime to locTime
						var cnt = 0;
						DEBUG && console.log('time fit, old=', curTime);
						for (var i = 0; i < rawMoves.length; i++) {
							cnt += rawMoves[i].length;
							curTime[rawMoves.length - i] = cnt == 0 ? 0 : sol[cnt - 1][1];
						}
						DEBUG && console.log('time fit, new=', curTime);
						sol = kernel.getConjMoves(cubeutil.moveSeq2str(sol), true);
						pushSignal('time', ["", 0, curTime, 0, [sol, '333']]);
					}
				} else if (keyCode == 32 && getProp('giiSK')) {
					if (!isGiiSolved(currentFacelet, true)) {
						if (status == -1) {
							markScrambled($.now());
						}
					}
				}
			},
			setVRC: setVRC,
			setSize: giikerVRC.setSize
		}
	})();

	function updateTimerOffset(clear) {
		DEBUG && console.log('[timer] update timer offset');
		if ($('html').hasClass('m') && !clear) {
			var isToolTop = $('html').hasClass('toolt');
			var winHeight = $('body').height();
			var calcTop = $('#scrambleDiv').is(':visible') ? $('#scrambleDiv').outerHeight() : 0;
			var calcBottom = $('#stats').offset().top || winHeight;
			if (isToolTop) {
				calcTop += $('#toolsDiv').is(':visible') ? $('#toolsDiv').outerHeight() : 0;
			} else {
				calcBottom = Math.min(calcBottom, $('#toolsDiv').offset().top || winHeight);
			}
			var offset = calcTop + calcBottom - winHeight;
			$('#timer,#rtimer').css({
				'padding-bottom': Math.max(-offset, 0),
				'padding-top': Math.max(offset, 0)
			});
		} else {
			$('#timer,#rtimer').css({
				'padding-bottom': 0,
				'padding-top': 0
			});
		}
	}

	function updateTimerOffsetAsync(clear) {
		$.delayExec('timer_offset', updateTimerOffset.bind(null, clear), 50);
	}

	function getKeyCode(e) {
		// left Ctrl: 256
		// right Ctrl: 257

		var keyCode = e.which;
		if (keyCode == 17) { // ctrl
			var origE = e.originalEvent;
			if (origE.location == 1 || origE.keyLocation == 1) {
				keyCode = 256;
			} else if (origE.location == 2 || origE.keyLocation == 2) {
				keyCode = 257;
			}
		}
		return keyCode;
	}

	function onkeydown(e) {
		if (ui.isPop()) {
			return;
		}
		var keyCode = getKeyCode(e);
		var focusObj = $(document.activeElement);
		if (focusObj.is('input, textarea, select')) {
			if (getProp('input') == 'i' && focusObj.prop('id') == 'inputTimer' && keyCode == 13) {
				inputTimer.parseInput();
			}
			return;
		} else {
			focusObj.blur();
		}
		if (status == -1 && keyCode == 27) {
			lcd.renderUtil(true);
		}
		switch (getProp('input')) {
			case 't':
				keyboardTimer.onkeydown(keyCode, e);
				break;
			case 's':
				stackmatTimer.onkeydown(keyCode, e);
				break;
			case 'b':
				ganSmartTimer.onkeydown(keyCode, e);
				break;
			case 'i':
				break;
			case 'v':
			case 'q':
				virtual333.onkeydown(keyCode, e);
				break;
			case 'g':
				giikerTimer.onkeydown(keyCode, e);
				break;
		}
	}

	function onkeyup(e) {
		if (ui.isPop()) {
			return;
		}
		var keyCode = getKeyCode(e);
		var focusObj = $(document.activeElement);
		if (focusObj.is('input, textarea, select')) {
			if (getProp('input') == 'i' && focusObj.prop('id') == 'inputTimer' && keyCode == 13) {
				inputTimer.clear();
			}
			return;
		} else {
			focusObj.blur();
		}
		switch (getProp('input')) {
			case 't':
				keyboardTimer.onkeyup(keyCode, e);
				break;
			case 's':
				stackmatTimer.onkeyup(keyCode, e);
				break;
			case 'b':
				ganSmartTimer.onkeyup(keyCode, e);
				break;
		}
	}

	var resetCondition = "input|phases|preScr|giiOri|useMilli|smallADP|giiVRC".split('|');

	$(function() {
		container = $('#container');
		bluetoothInstructDiv = $('.instruction');
		regListener('timer', 'property', function(signal, value) {
			if (value[0] == 'timerSize') {
				container.css('font-size', value[1] + 'em');
				virtual333.setSize(value[1]);
				giikerTimer.setSize(value[1]);
			}
			if (value[0] == 'timerSize' || value[0] == 'phases') {
				$('#multiphase').css('font-size', getProp('timerSize') / Math.max(getProp('phases'), 4) + 'em')
			}
			if (value[0] == 'input') {
				stackmatTimer.setEnable(value[1]);
				giikerTimer.setEnable(value[1]);
				ganSmartTimer.setEnable(value[1]);
			}
			if (value[0] == 'showAvg') {
				avgDiv.showAvgDiv(value[1]);
			}
			if (value[0] == 'giiVRC' && value[2] != 'set') {
				giikerTimer.setEnable(getProp('input'));
			}
			if (['toolPos', 'scrHide', 'toolHide', 'statHide'].indexOf(value[0]) >= 0) {
				updateTimerOffsetAsync(false);
			}
			if (['useIns', 'scrType', 'showIns'].indexOf(value[0]) >= 0) {
				lcd.renderUtil();
			}
			if ($.inArray(value[0], resetCondition) != -1) {
				reset();
			}
		}, /^(?:input|phases|scrType|preScr|giiOri|timerSize|showAvg|useMilli|smallADP|giiVRC|toolPos|scrHide|toolHide|statHide|useIns|showIns)$/);
		regListener('timer', 'ashow', function (signal, value) {
			updateTimerOffsetAsync(!value);
		});
		regListener('timer', 'button', updateTimerOffsetAsync.bind(null, false));
		regListener('timer', 'session', updateTimerOffsetAsync.bind(null, false));
		regListener('timer', 'scrfix', updateTimerOffsetAsync.bind(null, false));
		$(window).bind('resize', updateTimerOffsetAsync.bind(null, false));
		regProp('vrc', 'vrcSpeed', 1, PROPERTY_VRCSPEED, [100, [0, 50, 100, 200, 500, 1000], '\u221E|20|10|5|2|1'.split('|')], 1);
		regProp('vrc', 'vrcOri', ~1, 'PROPERTY_VRCORI', ['6,12', ['6,12', '10,11'], ['UF', 'URF']], 1);
		regProp('vrc', 'vrcMP', 1, PROPERTY_VRCMP, ['n', ['n', 'cfop', 'fp', 'cf4op', 'cf4o2p2', 'roux'], PROPERTY_VRCMPS.split('|')], 1);
		regProp('vrc', 'vrcAH', 1, PROPERTY_VRCAH, ['01', ['00', '01', '10', '11'], PROPERTY_VRCAHS.split('|')], 1);
		regProp('vrc', 'giiMode', 1, PROPERTY_GIIMODE, ['n', ['n', 't'], PROPERTY_GIIMODES.split('|')], 1);
		regProp('vrc', 'giiVRC', 1, PROPERTY_GIIKERVRC, ['v', ['n', 'v', 'q', 'ql', 'q2'], ['None', 'Virtual', 'qCube', 'qLast', 'q2Look']], 1);
		regProp('vrc', 'giiOri', 1, PROPERTY_GIIORI, ['auto',
			["auto", "0", "3", "2", "1", "4", "5", "6", "7", "23", "14", "19", "8", "17", "10", "21", "12", "11", "22", "13", "18", "15", "16", "9", "20"],
			["auto", "(UF)", "(UR) y", "(UB) y2", "(UL) y'", "(DF) z2", "(DL) z2 y", "(DB) z2 y2", "(DR) z2 y'", "(RF) z'", "(RD) z' y", "(RB) z' y2", "(RU) z' y'", "(LF) z", "(LU) z y", "(LB) z y2", "(LD) z y'", "(BU) x'", "(BR) x' y", "(BD) x' y2", "(BL) x' y'", "(FD) x", "(FR) x y", "(FU) x y2", "(FL) x y'"]
		], 1);
		regProp('vrc', 'giiSD', 1, PROPERTY_GIISOK_DELAY, ['s', ['2', '3', '4', '5', 'n', 's'], PROPERTY_GIISOK_DELAYS.split('|')], 1);
		regProp('vrc', 'giiSK', 0, PROPERTY_GIISOK_KEY, [true], 1);
		regProp('vrc', 'giiSM', 1, PROPERTY_GIISOK_MOVE, ['n', ['x4', 'xi2', 'n'], PROPERTY_GIISOK_MOVES.split('|')], 1);
		regProp('vrc', 'giiBS', 0, PROPERTY_GIISBEEP, [true], 1);
		regProp('vrc', 'giiRST', 1, PROPERTY_GIIRST, ['p', ['a', 'p', 'n'], PROPERTY_GIIRSTS.split('|')]);
		regProp('vrc', 'giiAED', 0, PROPERTY_GIIAED, [false]);
		regProp('timer', 'useMouse', 0, PROPERTY_USEMOUSE, [false], 1);
		regProp('timer', 'useIns', 1, PROPERTY_USEINS, ['n', ['a', 'b', 'n'], PROPERTY_USEINS_STR.split('|')], 1);
		regProp('timer', 'showIns', 0, PROPERTY_SHOWINS, [true], 1);
		regProp('timer', 'voiceIns', 1, PROPERTY_VOICEINS, ['1', ['n', '1', '2'], PROPERTY_VOICEINS_STR.split('|')], 1);
		regProp('timer', 'voiceVol', 2, PROPERTY_VOICEVOL, [100, 1, 100], 1);
		regProp('timer', 'input', 1, PROPERTY_ENTERING, ['t', ['t', 'i', 's', 'm', 'v', 'g', 'q', 'b'], PROPERTY_ENTERING_STR.split('|')], 1);
		regProp('timer', 'intUN', 1, PROPERTY_INTUNIT, [20100, [1, 100, 1000, 10001, 10100, 11000, 20001, 20100, 21000], 'X|X.XX|X.XXX|X:XX|X:XX.XX|X:XX.XXX|X:XX:XX|X:XX:XX.XX|X:XX:XX.XXX'.split('|')], 1);
		regProp('timer', 'timeU', 1, PROPERTY_TIMEU, ['c', ['u', 'c', 's', 'i', 'n'], PROPERTY_TIMEU_STR.split('|')], 1);
		regProp('timer', 'preTime', 1, PROPERTY_PRETIME, [300, [0, 300, 550, 1000], '0|0.3|0.55|1'.split('|')], 1);
		regProp('timer', 'phases', 2, PROPERTY_PHASES, [1, 1, 10], 3);
		regProp('kernel', 'showAvg', 0, SHOW_AVG_LABEL, [true], 1);
		regProp('ui', 'timerSize', 2, PROPERTY_TIMERSIZE, [20, 1, 100], 1);
		regProp('ui', 'smallADP', 0, PROPERTY_SMALLADP, [true], 1);
	});

	var fobj;

	function refocus() {
		if (fobj != undefined) {
			fobj.focus();
		} else {
			document.activeElement && document.activeElement.blur && document.activeElement.blur();
		}
	}

	return {
		onkeydown: onkeydown,
		onkeyup: onkeyup,
		showAvgDiv: avgDiv.showAvgDiv,
		refocus: refocus,
		getStatus: function() {
			return status;
		},
		getCurTime: function(now) {
			return status > 0 ? (now || $.now()) - startTime : 0;
		}
	};
}, [kernel.regListener, kernel.regProp, kernel.getProp, kernel.pretty, kernel.ui, kernel.pushSignal]);
