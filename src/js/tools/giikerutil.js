"use strict";

var giikerutil = (function(CubieCube) {

	var connectClick = $('<span></span>');
	var resetClick = $('<span>Reset (Mark Solved)</span>').addClass('click');
	var canvas = $('<canvas>');
	var drawState = (function() {
		var faceOffsetX = [1, 2, 1, 1, 0, 3];
		var faceOffsetY = [0, 1, 1, 2, 1, 1];
		var colors = ['#fff', '#f00', '#0d0', '#ff0', '#fa0', '#00f'];
		var width = 30;
		var ctx;

		function face(f, facelet) {
			var offx = 10 / 3 * faceOffsetX[f],
				offy = 10 / 3 * faceOffsetY[f];
			for (var x = 0; x < 3; x++) {
				for (var y = 0; y < 3; y++) {
					image.drawPolygon(ctx, colors["URFDLB".indexOf(facelet[(f * 3 + y) * 3 + x])], [
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
			ctx = canvas[0].getContext('2d');
			var imgSize = kernel.getProp('imgSize') / 50;
			canvas.width(39 * imgSize + 'em');
			canvas.height(29 * imgSize + 'em');
			canvas.attr('width', 39 * 3 / 9 * width + 1);
			canvas.attr('height', 29 * 3 / 9 * width + 1);
			for (var i = 0; i < 6; i++) {
				face(i, currentState);
			}
		}
		return drawState;
	})();

	function execFunc(fdiv) {
		if (!fdiv) {
			return;
		}
		connectClick.html('Connected').removeClass('click').unbind('click');
		if (!GiikerCube.isConnected()) {
			connectClick.html('Connect').addClass('click').click(init);
		}
		fdiv.empty().append('Giiker: ', connectClick, '<br>')
			.append(resetClick.unbind('click').click(markSolved), '<br><br>', canvas);
		drawState();
	}

	$(function() {
		tools.regTool('giikerutil', TOOLS_GIIKER, execFunc);
	});

	var callback = $.noop;

	var currentRawState = mathlib.SOLVED_FACELET;
	var currentRawCubie = new CubieCube();
	var currentCubie = new CubieCube();
	var currentState = currentRawState;
	var solvedStateInv = new CubieCube();
	var scrambledCubie = new CubieCube();

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
				// if (!simpleErrorDetect(currentCubie)) {
				// 	return;
				// }
				var facelet = currentCubie.toFaceCube();
				if (cubeutil.getCFOPProgress(facelet) <= 2) { // all unsolved pieces is on same face
					return;
				}
				var gen = scramble_333.genFacelet(currentCubie.toFaceCube());
				if (gen.length / 3 < 10) {
					console.log('Possible error, gen=' + gen.replace(/ /g, '') + ', ignore');
					return;
				}
				console.log('Almost error, gen=' + gen.replace(/ /g, '') + ', mark solved');
				markSolved();
			}, 1000);
		}
	}

	var nodeSearchd = 0;

	function checkMoves(moves) {
		if (moves.length % 2 == 1) {
			return 99;
		}
		var timespend = [];
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
		solvedStateInv.invFrom(currentRawCubie);
		currentState = mathlib.SOLVED_FACELET;
		kernel.setProp('giiSolved', currentRawState);
		movesAfterSolved = [];
		drawState();
		callback(currentState, ['U '], lastTimestamp);
	}

	var movesAfterSolved = [];

	function giikerCallback(facelet, prevMoves) {
		var lastTimestamp = $.now();
		connectClick.html('Connected').removeClass('click').unbind('click');
		currentRawState = facelet;
		currentRawCubie.fromFacelet(currentRawState);
		CubieCube.EdgeMult(solvedStateInv, currentRawCubie, currentCubie);
		CubieCube.CornMult(solvedStateInv, currentRawCubie, currentCubie);
		currentState = currentCubie.toFaceCube();
		if (currentState == mathlib.SOLVED_FACELET) {
			movesAfterSolved = [];
		} else {
			movesAfterSolved.push("URFDLB".indexOf(todoMoves[i][0]) * 3 + " 2'".indexOf(todoMoves[i][1]));
		}
		drawState();
		giikerErrorDetect();
		callback(currentState, prevMoves, lastTimestamp);
	}

	function init() {
		currentRawState = kernel.getProp('giiSolved', mathlib.SOLVED_FACELET);
		currentRawCubie.fromFacelet(currentRawState);
		solvedStateInv.invFrom(currentRawCubie);
		GiikerCube.setCallBack(giikerCallback);
		if (!GiikerCube.isConnected()) {
			return GiikerCube.init();
		}
	}

	function checkScramble() {
		if (curScramble == "") {
			return false;
		}
		return scrambledCubie.isEqual(currentCubie);
	}

	var curScramble;

	function procScramble(signal, value) {
		var scrType = value[0];
		curScramble = value[1];
		if (tools.puzzleType(scrType) != '333') {
			curScramble = "";
			return;
		}
		var scr = kernel.parseScramble(curScramble, "URFDLB");
		var cd = new CubieCube();
		scrambledCubie.init(cd.ca, cd.ea);
		for (var i = 0; i < scr.length; i++) {
			var m = scr[i][0] * 3 + scr[i][2] - 1;
			if (m < 0 || m >= 18) {
				continue;
			}
			CubieCube.EdgeMult(scrambledCubie, CubieCube.moveCube[m], cd);
			CubieCube.CornMult(scrambledCubie, CubieCube.moveCube[m], cd);
			var tmp = scrambledCubie;
			scrambledCubie = cd;
			cd = tmp;
		}
	}

	$(function() {
		kernel.regListener('giiker', 'scramble', procScramble);
	});

	return {
		setCallBack: function(func) {
			callback = func;
		},
		markSolved: markSolved,
		checkScramble: checkScramble,
		init: init
	}
})(mathlib.CubieCube);