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
	var currentRawCubie = new mathlib.CubieCube();
	var currentCubie = new mathlib.CubieCube();
	var currentState = currentRawState;
	var solvedStateInv = new mathlib.CubieCube();

	function markSolved() {
		//mark current state as solved
		solvedStateInv.invFrom(currentRawCubie);
		currentState = mathlib.SOLVED_FACELET;
		kernel.setProp('giiSolved', currentRawState);
		drawState();
		callback(currentState, []);
	}

	function giikerCallback(facelet, prevMoves) {
		connectClick.html('Connected').removeClass('click').unbind('click');
		currentRawState = facelet;
		currentRawCubie.fromFacelet(currentRawState);
		mathlib.CubieCube.EdgeMult(solvedStateInv, currentRawCubie, currentCubie);
		mathlib.CubieCube.CornMult(solvedStateInv, currentRawCubie, currentCubie);
		currentState = currentCubie.toFaceCube();
		drawState();
		callback(currentState, prevMoves);
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

	return {
		setCallBack: function(func) {
			callback = func;
		},
		markSolved: markSolved,
		init: init
	}
})(mathlib.CubieCube);