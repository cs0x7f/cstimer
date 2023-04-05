"use strict";

var scrHinter = execMain(function(CubieCube) {
	var rawScr = [];
	var rawScrTxt = null;
	var genState = null;
	var genScr = null;
	var scrState = new CubieCube();
	var preConj = 0;

	function setScramble(scramble) {
		rawScrTxt = scramble;
		scramble = kernel.getConjMoves(scramble);
		var scr = kernel.parseScramble(scramble, "URFDLB");
		rawScr = scr.slice();
		genState = null;
		genScr = null;

		scrState = new mathlib.CubieCube();
		for (var i = 0; i < scr.length; i++) {
			var m = scr[i][0] * 3 + scr[i][2] - 1;
			if (m < 0 || m >= 18) { //TODO wide move convert
				continue;
			}
			scrState.selfMoveStr('URFDLB'.charAt(scr[i][0]) + " 2'".charAt(scr[i][2] - 1));
		}
	}

	function checkInSeq(state, gen, seq) {
		var c = new CubieCube();
		var d = new CubieCube();
		if (gen) {
			c.init(gen.ca, gen.ea);
		}
		var next = 99;
		if (c.isEqual(state)) {
			next = 0;
		}
		var pow;
		for (var i = 0; i < seq.length; i++) {
			var a = seq[i][0] * 3;
			for (pow = 0; pow < 3; pow++) {
				CubieCube.EdgeMult(c, CubieCube.moveCube[a + pow], d);
				CubieCube.CornMult(c, CubieCube.moveCube[a + pow], d);
				if (d.isEqual(state)) {
					next = (pow == seq[i][2] - 1) ? i + 1 : i;
					break;
				}
			}
			if (next == i) {
				break;
			}
			var m = seq[i][0] * 3 + seq[i][2] - 1;
			CubieCube.EdgeMult(c, CubieCube.moveCube[m], d);
			CubieCube.CornMult(c, CubieCube.moveCube[m], d);
			c.init(d.ca, d.ea);
		}
		if (next == 99) {
			return null;
		}
		var ret = [];
		for (var i = 0; i < seq.length; i++) {
			var m = seq[i];
			if (next == 0 && i == 0) {
				m = [m[0], m[1], (m[2] - pow + 7) % 4];
			}
			ret.push((i == next ? '`' : '') + 'URFDLB'.charAt(m[0]) + [null, "", "2", "'"][m[2]]);
		}
		ret = ret.join(' ');
		if (next != seq.length) {
			ret += '`';
		}
		ret = kernel.getConjMoves(ret, true);
		return ret;
	}

	function checkState(state) {
		var toMoveFix = null;
		var toMoveRaw = null;
		if (genState) {
			toMoveFix = checkInSeq(state, genState, genScr);
		}
		if (toMoveFix == null) {
			toMoveRaw = checkInSeq(state, null, rawScr);
			genState = null;
		}
		if (toMoveRaw == null && toMoveFix == null) {
			genState = new CubieCube();
			genState.init(state.ca, state.ea);
			var stateInv = new CubieCube();
			stateInv.invFrom(state);
			var toSolve = new CubieCube();
			CubieCube.EdgeMult(stateInv, scrState, toSolve);
			CubieCube.CornMult(stateInv, scrState, toSolve);
			genScr = scramble_333.genFacelet(toSolve.toFaceCube());
			genScr = kernel.parseScramble(genScr, "URFDLB");
			toMoveFix = checkInSeq(state, genState, genScr);
		}
		kernel.pushSignal('scrfix', toMoveFix ? (rawScrTxt + '\n=> ' + toMoveFix) : toMoveRaw);
	}

	function checkScramble(curCubie) {
		if (rawScrTxt == "") {
			return false;
		}
		return scrState.isEqual(curCubie);
	}

	function getScrCubie() {
		return scrState;
	}

	return {
		setScramble: setScramble,
		getScrCubie: getScrCubie,
		checkScramble: checkScramble,
		checkState: checkState
	}
}, [mathlib.CubieCube]);

var giikerutil = execMain(function(CubieCube) {

	var connectClick = $('<span></span>');
	var resetClick = $('<span>Reset (Mark Solved)</span>').addClass('click');
	var algCubingClick = $('<a target="_blank">0 move(s)</a>').addClass('click');
	var lastSolveClick = $('<a target="_blank">N/A</a>').addClass('click');
	var canvas = $('<canvas>');
	var connectedStr = 'Connected | ??%';
	var drawState = (function() {
		var faceOffsetX = [1, 2, 1, 1, 0, 3];
		var faceOffsetY = [0, 1, 1, 2, 1, 1];
		var colors = ['#ff0', '#fa0', '#00f', '#fff', '#f00', '#0d0'];
		var width = 30;
		var ctx;

		function face(f, facelet) {
			var offx = 10 / 3 * faceOffsetX[f],
				offy = 10 / 3 * faceOffsetY[f];
			for (var x = 0; x < 3; x++) {
				for (var y = 0; y < 3; y++) {
					$.ctxDrawPolygon(ctx, colors["DLBURF".indexOf(facelet[(f * 3 + y) * 3 + x])], [
						[x, x, x + 1, x + 1],
						[y, y + 1, y + 1, y]
					], [width, offx, offy]);
				}
			}
		}

		function drawState() {
			if (!canvas) {
				return;
			}
			if (kernel.getProp('giiVRC') != 'n') {
				canvas.hide();
				return;
			}
			colors = kernel.getProp('colcube').match(/#[0-9a-fA-F]{3}/g);
			canvas.show();
			ctx = canvas[0].getContext('2d');
			var imgSize = kernel.getProp('imgSize') / 50;
			canvas.width(39 * imgSize + 'em');
			canvas.height(29 * imgSize + 'em');
			canvas.attr('width', 39 * 3 / 9 * width + 1);
			canvas.attr('height', 29 * 3 / 9 * width + 1);
			canvas.css('margin', '0.5em 0 0 0');
			for (var i = 0; i < 6; i++) {
				face(i, curState);
			}
		}
		return drawState;
	})();

	function execFunc(fdiv) {
		if (!fdiv) {
			return;
		}
		connectClick.html(connectedStr).removeClass('click').unbind('click');
		if (!GiikerCube.isConnected()) {
			connectClick.html('Bluetooth: Connect').addClass('click').click(init);
		}
		var content = $('<div></div>');
		if (!(kernel.getProp('giiVRC') != 'n')) {
			content.css('font-size', 'calc(100% / 1.5)');
		}
		content.append(connectClick, '<br>')
			.append(resetClick.unbind('click').click(markSolved), '<br>')
			.append('Raw Data: ', algCubingClick, '<br>')
			.append('Last Solve: ', lastSolveClick, '<br>')
			.append($('<div>').append(canvas).css('text-align', 'center'));
		fdiv.empty().append(content);
		drawState();
	}

	var batId = 0;
	var batValue = 0;

	function updateBattery(value) {
		batValue = value[0];
		connectedStr = value[1] + ': Connected | ' + (batValue || '??') + '%';
		connectClick.html(connectedStr);
	}

	function pollUpdateBattery() {
		if (GiikerCube.isConnected()) {
			GiikerCube.getCube().getBatteryLevel().then(function(value) {
				updateBattery(value);
			});
			batId = setTimeout(pollUpdateBattery, 60000);
		} else {
			batId = 0;
		}
	}

	var callback = $.noop;

	var curRawState = mathlib.SOLVED_FACELET;
	var curRawCubie = new CubieCube();
	var curCubie = new CubieCube();
	var curState = curRawState;
	var solvedStateInv = new CubieCube();

	var lastTimestamp = $.now();
	var detectTid = 0;

	function giikerErrorDetect() {
		if (detectTid) {
			clearTimeout(detectTid);
			detectTid = 0;
		}
		if (kernel.getProp('giiAED')) {
			detectTid = setTimeout(function() {
				if (checkMoves(movesAfterSolved) == 99) {
					return;
				}
				// if (!simpleErrorDetect(curCubie)) {
				// 	return;
				// }
				var facelet = curCubie.toFaceCube();
				if (cubeutil.getProgress(facelet, 'cfop') <= 2) { // all unsolved pieces is on same face
					return;
				}
				var gen = scramble_333.genFacelet(curCubie.toFaceCube());
				if (gen.length / 3 < 10) {
					DEBUG && console.log('[giiker]', 'Possible error, gen=' + gen.replace(/ /g, '') + ', ignore');
					return;
				}
				DEBUG && console.log('[giiker]', 'Almost error, gen=' + gen.replace(/ /g, '') + ', mark solved');
				markSolved();
			}, 1000);
		}
	}

	var nodeSearchd = 0;

	function checkMoves(moves) {
		if (moves.length % 2 == 1) {
			return 99;
		}
		var stateToEnd = [];
		stateToEnd[moves.length] = new CubieCube();
		for (var i = moves.length - 1; i >= 0; i--) {
			stateToEnd[i] = new CubieCube();
			CubieCube.CubeMult(CubieCube.moveCube[moves[i]], stateToEnd[i + 1], stateToEnd[i]);
		}
		for (var i = 1; i < 3; i++) {
			nodeSearchd = 0;
			if (checkSwap(moves, 0, i, new CubieCube(), stateToEnd)) {
				return i;
			} else if (nodeSearchd > 9999) {
				return 99;
			}
		}
		return 99;
	}

	function checkSwap(moves, start, nswap, stateFromStart, stateToEnd) {
		if (nswap == 0) {
			return stateFromStart.isEqual(new CubieCube().invFrom(stateToEnd[start]));
		}
		var cctmp = new CubieCube();
		for (var i = start; i < moves.length - 1; i++) {
			// try to swap moves[i] and moves[i + 1]
			if (~~(moves[i] / 3) % 3 == ~~(moves[i + 1] / 3) % 3) {
				CubieCube.CubeMult(stateFromStart, CubieCube.moveCube[moves[i]], cctmp);
				stateFromStart.init(cctmp.ca, cctmp.ea);
				continue;
			}
			var state = new CubieCube().init(stateFromStart.ca, stateFromStart.ea);
			CubieCube.CubeMult(state, CubieCube.moveCube[moves[i + 1]], cctmp);
			CubieCube.CubeMult(cctmp, CubieCube.moveCube[moves[i]], state);
			CubieCube.CubeMult(state, stateToEnd[i + 2], cctmp);
			if (++nodeSearchd > 9999) {
				return false;
			}
			if (cctmp.edgeCycles() < nswap) {
				var ret = checkSwap(moves, i + 2, nswap - 1, state, stateToEnd);
			}
			if (ret) {
				return true;
			}
			CubieCube.CubeMult(stateFromStart, CubieCube.moveCube[moves[i]], cctmp);
			stateFromStart.init(cctmp.ca, cctmp.ea);
		}
		return false;
	}

	function markSolved() {
		//mark current state as solved
		solvedStateInv.invFrom(curRawCubie);
		curState = mathlib.SOLVED_FACELET;
		kernel.setProp('giiSolved', curRawState);
		movesAfterSolved = [];
		movesTimestamp = [];
		scrambleLength = 0;
		drawState();
		callback(curState, ['U '], lastTimestamp);
	}

	var movesAfterSolved = [];
	var movesTimestamp = [];

	function giikerCallback(facelet, prevMoves, lastTimestamp, hardware) {
		lastTimestamp = lastTimestamp || $.now();
		connectedStr = hardware + ': Connected | ' + (batValue || '??') + '%';
		connectClick.html(connectedStr).removeClass('click').unbind('click');
		curRawState = facelet;
		curRawCubie.fromFacelet(curRawState);
		CubieCube.EdgeMult(solvedStateInv, curRawCubie, curCubie);
		CubieCube.CornMult(solvedStateInv, curRawCubie, curCubie);
		curState = curCubie.toFaceCube();

		if (prevMoves.length > 0) {
			movesAfterSolved.push("URFDLB".indexOf(prevMoves[0][0]) * 3 + " 2'".indexOf(prevMoves[0][1]));
			movesTimestamp.push(timer.getCurTime(lastTimestamp));
		}
		if (scrambleLength > 0) {
			updateRawMovesClick();
		}
		if (curState == mathlib.SOLVED_FACELET) {
			movesAfterSolved = [];
			movesTimestamp = [];
			scrambleLength = 0;
		}
		drawState();
		batId == 0 && pollUpdateBattery();
		giikerErrorDetect();
		var retState = curState;
		if (hackedSolvedCubieInv) {
			CubieCube.EdgeMult(hackedSolvedCubieInv, curCubie, hackedCubie);
			CubieCube.CornMult(hackedSolvedCubieInv, curCubie, hackedCubie);
			retState = hackedCubie.toFaceCube();
		}
		callback(retState, prevMoves, lastTimestamp);
		if (curScramble && kernel.getProp('input') == 'g' && timer.getCurTime() == 0) {
			scrHinter.checkState(curCubie);
		}
	}

	function updateRawMovesClick() {
		var moveCount = movesAfterSolved.length;
		var scrambleStr = "";
		for (var i = 0; i < scrambleLength; i++) {
			var move = movesAfterSolved[i];
			scrambleStr += "URFDLB".charAt(~~(move / 3)) + " 2'".charAt(move % 3); // + "/*" + movesTimestamp[i] + "*/";
		}
		var solveStr = "";
		for (var i = scrambleLength; i < movesAfterSolved.length; i++) {
			var move = movesAfterSolved[i];
			solveStr += "URFDLB".charAt(~~(move / 3)) + " 2'".charAt(move % 3) + "/*" + movesTimestamp[i] + "*/";
		}
		updateAlgClick(algCubingClick, moveCount + ' move(s)', scrambleStr, solveStr)
	}

	function updateAlgClick(click, text, setup, alg) {
		if (setup || alg) {
			click.attr('href',
				'https://alg.cubing.net/?alg=' + encodeURIComponent(alg) +
				'&setup=' + encodeURIComponent(setup)
			);
		} else {
			click.removeAttr('href');
		}
		click.html(text);
	}

	function setLastSolve(solve) {
		updateAlgClick(lastSolveClick, "Ready", kernel.getConjMoves(curScramble), solve)
	}

	function evtCallback(info, event) {
		if (info == 'disconnect') {
			connectClick.html(connectedStr).removeClass('click').unbind('click');
			if (!GiikerCube.isConnected()) {
				connectClick.html('Bluetooth: Connect').addClass('click').click(init);
			}
		}
	}

	function init() {
		curRawState = kernel.getProp('giiSolved', mathlib.SOLVED_FACELET);
		curRawCubie.fromFacelet(curRawState);
		solvedStateInv.invFrom(curRawCubie);
		GiikerCube.setCallback(giikerCallback);
		GiikerCube.setEventCallback(evtCallback);
		if (!GiikerCube.isConnected()) {
			return GiikerCube.init();
		} else {
			return Promise.resolve();
		}
	}

	function checkScramble() {
		return scrHinter.checkScramble(curCubie);
	}

	var curScramble;

	function procSignal(signal, value) {
		if (signal == 'scramble' || signal == 'scrambleX') {
			var scrType = value[0];
			curScramble = value[1];
			if (tools.puzzleType(scrType) != '333') {
				curScramble = "";
			}
			scrHinter.setScramble(curScramble);
			if (curScramble && kernel.getProp('input') == 'g') {
				scrHinter.checkState(curCubie);
			}
		} else if (signal == 'property') {
			if (value[0] == 'giiVRC') {
				drawState();
			} else if (value[0] == 'preScr') {
				scrHinter.setScramble(curScramble);
				if (curScramble && kernel.getProp('input') == 'g') {
					scrHinter.checkState(curCubie);
				}
			}
		}
	}

	var scrambleLength = 0;

	function markScrambled(virtual) {
		var targetCubie = curCubie;
		if (virtual) {
			targetCubie = scrHinter.getScrCubie();
		}
		if (!targetCubie.isEqual(curCubie)) {
			DEBUG && console.log('[bluetooth] scramble equal, start hack!');
			hackedSolvedCubieInv = new mathlib.CubieCube();
			hackedCubie.invFrom(curCubie);
			CubieCube.EdgeMult(targetCubie, hackedCubie, hackedSolvedCubieInv);
			CubieCube.CornMult(targetCubie, hackedCubie, hackedSolvedCubieInv);
			movesAfterSolved = [];
			callback(targetCubie.toFaceCube(), ['U '], $.now());
		}
		scrambleLength = movesAfterSolved.length;
		updateRawMovesClick();
		updateAlgClick(lastSolveClick, "In Progress");
	}

	var hackedSolvedCubieInv = null;
	var hackedCubie = new CubieCube();

	function isSync() {
		return hackedSolvedCubieInv == null;
	}

	function reSync() {
		if (!hackedSolvedCubieInv) {
			return;
		}
		hackedSolvedCubieInv = null;
		callback(curState, ['U '], lastTimestamp);
	}

	$(function() {
		kernel.regListener('giiker', 'scramble', procSignal);
		kernel.regListener('giiker', 'scrambleX', procSignal);
		kernel.regListener('giiker', 'property', procSignal, /^(?:giiVRC|preScr)$/);
		tools.regTool('giikerutil', TOOLS_GIIKER, execFunc);
	});

	return {
		setCallback: function(func) {
			callback = func;
		},
		markSolved: markSolved,
		checkScramble: checkScramble,
		markScrambled: markScrambled,
		init: init,
		isSync: isSync,
		reSync: reSync,
		updateBattery: updateBattery,
		setLastSolve: setLastSolve
	}
}, [mathlib.CubieCube]);
