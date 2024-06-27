"use strict";
execMain(function() {
	var selectPre = $('<select style="font-size:0.75em;">');
	var resultSpan = $('<span>');
	var presets = {
		'3x3x3': mathlib.SOLVED_FACELET,
		'Empty': '****U********R********F********D********L********B****',
		'U&D': 'UUUUUUUUU****R********F****DDDDDDDDD****L********B****',
	};
	var canvas, ctx;
	var solvedState = mathlib.SOLVED_FACELET;
	var colors = {
		'U': '#fff',
		'R': '#f00',
		'F': '#0d0',
		'D': '#ff0',
		'L': '#fa0',
		'B': '#00f',
		'*': '#777'
	};
	var selColor = '*';
	var width = 30;
	var offxs = [1, 2, 1, 1, 0, 3, 7.25];
	var offys = [0, 1, 1, 2, 1, 1, 0.50];
	var selXYs = [[-0.7, -0.7, 0.7, 0.7], [-0.7, 0.7, 0.7, -0.7]];
	var offw = 3.3;
	var stateRE = /^[URFDLB*]{54}$/;

	function procClick(e) {
		var rect = canvas[0].getBoundingClientRect();
		var cordX = e.offsetX / width * canvas[0].width / rect.width;
		var cordY = e.offsetY / width * canvas[0].height / rect.height;

		for (var face = 0; face < 6; face++) {
			if (cordX >= offxs[face] * offw &&
				cordX <= offxs[face] * offw + 3 &&
				cordY >= offys[face] * offw &&
				cordY <= offys[face] * offw + 3) {
				var i = ~~(cordX - offxs[face] * offw);
				var j = ~~(cordY - offys[face] * offw);
				if (i == 1 && j == 1) { // ignore center
					return;
				}
				var tmp = solvedState.split('');
				tmp[face * 9 + 3 * j + i] = selColor;
				setState(tmp.join(''));
			}
		}
		if (cordX >= offxs[6] &&
			cordX <= offxs[6] + 5 &&
			cordY >= offys[6] &&
			cordY <= offys[6] + 2) {
			var i = ~~(cordX - offxs[6]);
			var j = ~~(cordY - offys[6]);
			selColor = 'URFDLB****'.charAt(i * 2 + j);
			$.ctxDrawPolygon(ctx, colors[selColor], selXYs, [width, 1.5, 1.5]);
		}
	}

	function drawFacelet(ctx, face, i, j, state) {
		$.ctxDrawPolygon(ctx, colors[state[face * 9 + j * 3 + i]], [
			[i, i, i + 1, i + 1],
			[j, j + 1, j + 1, j]
		], [width, offxs[face] * offw + 0.1, offys[face] * offw + 0.1]);
	}

	function drawCube(ctx, state) {
		var imgSize = kernel.getProp('imgSize') / 48;
		canvas.width(39 * imgSize + 'em');
		canvas.height(29 * imgSize + 'em');

		canvas.attr('width', 39 * 3 / 9 * width + 2);
		canvas.attr('height', 29 * 3 / 9 * width + 2);

		for (var face = 0; face < 6; face++) {
			for (var i = 0; i < 3; i++) {
				for (var j = 0; j < 3; j++) {
					drawFacelet(ctx, face, i, j, state);
				}
			}
		}
		for (var i = 0; i < 5; i++) {
			for (var j = 0; j < 2; j++) {
				$.ctxDrawPolygon(ctx, colors['URFDLB****'.charAt(i * 2 + j)], [
					[i, i, i + 1, i + 1],
					[j, j + 1, j + 1, j]
				], [width, 7.25, 0.5]);
			}
		}
		$.ctxDrawPolygon(ctx, colors[selColor], selXYs, [width, 1.5, 1.5]);
	}

	function selectChange(e) {
		var state = selectPre.val();
		selectPre.val('');
		kernel.blur();
		if (state == 'input') {
			state = prompt('U1U2...U9R1..R9F1..D1..L1..B1..B9', solvedState);
			if (state == null) {
				return;
			}
			if (!stateRE.exec(state)) {
				logohint.push(LGHINT_INVALID);
				return;
			}
			setState(state);
		} else if (state != '') {
			setState(state);
		}
		calcParams();
	}

	function setState(state) {
		if (solvedState == state) {
			return;
		}
		solvedState = state;
		drawCube(ctx, solvedState);
		calcParams();
	}

	var params = [[0, 0], [0, 0]];

	function calcParams() {
		if (params[6] != solvedState) {
			params = pat3x3.calcPattern(solvedState);
			params[6] = solvedState;
		}
		var totalCnts = params[0][0] * params[1][0] + params[0][1] * params[1][1];
		var prob = totalCnts / 43252003274489856000;
		resultSpan.html(
			'p=' + (totalCnts == 0 ? 0 : prob < 1e-3 ? prob.toExponential(3) : Math.round(prob * 1000000) / 10000 + '%') +
			(prob < 1e-8 ? ('<br>N=' + (totalCnts > 1e8 ? totalCnts.toExponential(3) : totalCnts)) : '')
		).unbind('click');
		if (kernel.getProp('scrType') != 'nocache_333patspec') {
			resultSpan.addClass('click').click(function() {
				kernel.setProp('scrType', 'nocache_333patspec');
			});
		} else {
			resultSpan.removeClass('click');
		}
	}

	function genPatRndState() {
		var totalCnts = params[0][0] * params[1][0] + params[0][1] * params[1][1];
		if (totalCnts == 0) {
			return scramble_333.getRandomScramble();
		}
		var facelet = pat3x3.genPattern.apply(null, params);
		if (totalCnts == 1 && facelet == mathlib.SOLVED_FACELET) {
			return scramble_333.getRandomScramble();
		}
		while (facelet == mathlib.SOLVED_FACELET) {
			facelet = pat3x3.genPattern.apply(null, params);
		}
		var solution = scramble_333.genFacelet(facelet);
		return solution.replace(/ +/g, ' ');
	}

	function execFunc(fdiv) {
		if (!fdiv) {
			return;
		}
		if (!tools.isPuzzle('333')) {
			fdiv.html(IMAGE_UNAVAILABLE);
			return;
		}
		fdiv.empty().append($('<table>').append(
			$('<tr>').append(
				$('<td>').append(selectPre.unbind('change').change(selectChange)),
				$('<td>').append(resultSpan)
			),
			$('<tr>').append(
				$('<td colspan=2>').append(canvas.unbind('mousedown').bind('mousedown', procClick))
			)
		));
		calcParams();
	}

	scrMgr.reg('nocache_333patspec', genPatRndState);

	$(function() {
		canvas = $('<canvas>');
		if (!canvas[0].getContext) {
			return;
		}
		ctx = canvas[0].getContext('2d');
		selectPre.append($('<option>').val('').html('Edit subset'));
		for (var subset in presets) {
			selectPre.append($('<option>').val(presets[subset]).html(subset));
		}
		selectPre.append($('<option>').val('input').html('...'));
		setState(presets['U&D']);
		tools.regTool('pat3x3', TOOLS_SOLVERS + '>' + '3x3x3 Pattern', execFunc);
	});
});
