execMain(function(timer) {
	var enable = false;
	var enableVRC = false;
	var waitReadyTid = 0;
	var moveReadyTid = 0;
	var insTime = 0;
	var div = $('<div />');
	var totPhases = 1;
	var currentFacelet = mathlib.SOLVED_FACELET;
	var rawMoves = [];

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
				style: kernel.getProp('giiVRC')
			};
			puzzleFactory.init(options, $.noop, div, function(ret, isInit) {
				puzzleObj = ret;
				if (isInit && !puzzleObj) {
					div.css('height', '');
					div.html('--:--');
				}
				if (!temp || isInit) {
					timer.lcd.fixDisplay(false, true);
					setSize(kernel.getProp('timerSize'));
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
				var targetOri = kernel.getProp('giiOri');
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
				scramble = puzzleObj.parseScramble(cubeutil.getConjMoves(todoMoves, true, curVRCCubie.ori));
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
		var solvingMethod = kernel.getProp('vrcMP', 'n');
		if (timer.status() == -1) {
			if (canStart(currentFacelet)) {
				var delayStart = kernel.getProp('giiSD');
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
				var moveStart = kernel.getProp('giiSM');
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
		} else if (timer.status() == -3 || timer.status() == -2) {
			if (timer.checkUseIns()) {
				insTime = locTime - timer.startTime();
			} else {
				insTime = 0;
			}
			timer.startTime(locTime);
			timer.curTime([insTime > 17000 ? -1 : (insTime > 15000 ? 2000 : 0)]);
			timer.status(cubeutil.getStepCount(solvingMethod));
			rawMoves = [];
			for (var i = 0; i < timer.status(); i++) {
				rawMoves[i] = [];
			}
			totPhases = timer.status();
			var initialProgress = cubeutil.getProgress(prevFacelet, solvingMethod);
			timer.updateMulPhase(totPhases, initialProgress, locTime);
			timer.lcd.reset(enableVRC);
			timer.lcd.fixDisplay(false, true);
		}
		if (timer.status() >= 1) {
			if (prevMoves.length > 0)
				rawMoves[timer.status() - 1].push([prevMoves[0], lastTs[0], lastTs[1]]);
			var curProgress = cubeutil.getProgress(facelet, solvingMethod);
			timer.updateMulPhase(totPhases, curProgress, locTime);

			if (isGiiSolved(currentFacelet)) {
				rawMoves.reverse();
				var pretty = cubeutil.getPrettyReconstruction(rawMoves, solvingMethod);
				var moveCnt = pretty.totalMoves;
				giikerutil.setLastSolve(pretty.prettySolve);
				timer.curTime()[1] = locTime - timer.startTime();
				timer.status(-1);
				giikerutil.reSync();
				timer.lcd.fixDisplay(false, true);
				if (timer.curTime()[1] != 0) {
					var sol = giikerutil.tsLinearFix(rawMoves.flat()); // fit deviceTime to locTime
					var cnt = 0;
					DEBUG && console.log('time fit, old=', timer.curTime());
					for (var i = 0; i < rawMoves.length; i++) {
						cnt += rawMoves[i].length;
						timer.curTime()[rawMoves.length - i] = cnt == 0 ? 0 : sol[cnt - 1][1];
					}
					DEBUG && console.log('time fit, new=', timer.curTime());
					sol = cubeutil.getConjMoves(cubeutil.moveSeq2str(sol), true);
					kernel.pushSignal('time', ["", 0, timer.curTime(), 0, [sol, '333']]);
				} else if (kernel.getProp('giiMode') != 'n') {
					kernel.pushSignal('ctrl', ['scramble', 'next']);
				}
			}
		}
	}

	function canStart(facelet) {
		return facelet != mathlib.SOLVED_FACELET || kernel.getProp('giiMode') != 'n';
	}

	function isGiiSolved(facelet) {
		if (kernel.getProp('giiMode') != 'n') {
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
		if (timer.status() == -1) {
			if (kernel.getProp('giiMode') == 'n') {
				if (!giikerutil.checkScramble()) {
					var gen = scramble_333.genFacelet(currentFacelet);
					kernel.pushSignal('scramble', ['333', cubeutil.getConjMoves(gen, true), 0]);
				}
				giikerutil.markScrambled();
			} else {
				giikerutil.markScrambled(true);
			}
			timer.status(-2);
			timer.startTime(now);
			timer.lcd.reset(enableVRC);
			timer.lcd.fixDisplay(true, true);
			if (kernel.getProp('giiBS')) {
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
		kernel.regListener('giikerVRC', 'property', function(signal, value) {
			if (enableVRC) {
				giikerVRC.resetVRC(true, true);
				giikerVRC.setState(currentFacelet, ['U2', 'U2'], false);
			}
		}, /^(?:preScrT?|isTrainScr|giiOri)$/);
		kernel.regListener('giikerVRC', 'scramble', function(signal, value) {
			if (enableVRC && timer.status() == -1 && kernel.getProp('giiMode') == 'at' && GiikerCube.isConnected()) {
				clearReadyTid();
				waitReadyTid = setTimeout(function() {
					markScrambled($.now());
				}, 500);
			}
		});
	});

	function startConnect() {
		giikerutil.setCallback(giikerCallback);
		kernel.showDialog([$('<div>Press OK To Connect To Bluetooth Cube</div>').append(timer.getBTDiv()), function () {
			giikerutil.init().catch(function(error) {
				giikerutil.log('[giiker] init failed', error);
				alert(error);
			});
		}, 0, 0], 'share', 'Bluetooth Connect');
	}

	timer.giiker = {
		setEnable: function(input) { //s: stackmat, m: moyu
			enable = input == 'g';
			if (enable && !GiikerCube.isConnected()) {
				startConnect();
			} else if (!enable) {
				giikerutil.stop();
			}
			setVRC(enable && kernel.getProp('giiVRC') != 'n');
		},
		onkeydown: function(keyCode) {
			var now = $.now();
			if (keyCode == 27 || keyCode == 28) {
				var recordDNF = timer.status() >= 1;
				clearReadyTid();
				timer.status(-1);
				giikerutil.reSync();
				timer.lcd.fixDisplay(false, true);
				if (recordDNF) {
					timer.curTime()[0] = -1;
					rawMoves.reverse();
					var sol = giikerutil.tsLinearFix(rawMoves.flat()); // fit deviceTime to locTime
					var cnt = 0;
					DEBUG && console.log('time fit, old=', timer.curTime());
					for (var i = 0; i < rawMoves.length; i++) {
						cnt += rawMoves[i].length;
						timer.curTime()[rawMoves.length - i] = cnt == 0 ? 0 : sol[cnt - 1][1];
					}
					DEBUG && console.log('time fit, new=', timer.curTime());
					sol = cubeutil.getConjMoves(cubeutil.moveSeq2str(sol), true);
					kernel.pushSignal('time', ["", 0, timer.curTime(), 0, [sol, '333']]);
				}
			} else if (keyCode == 32 && timer.status() == -1 && kernel.getProp('giiSK') && canStart(currentFacelet)) {
				markScrambled($.now());
			}
		},
		onkeyup: function(keyCode) {
			if (enable && keyCode == 32 && !GiikerCube.isConnected()) {
				startConnect();
			}
		},
		setVRC: setVRC,
		setSize: giikerVRC.setSize
	};
}, [timer]);
