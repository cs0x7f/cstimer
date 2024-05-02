var pat3x3gen = (function() {

	var cornerFacelet = [
		[8, 9, 20], // URF
		[6, 18, 38], // UFL
		[0, 36, 47], // ULB
		[2, 45, 11], // UBR
		[29, 26, 15], // DFR
		[27, 44, 24], // DLF
		[33, 53, 42], // DBL
		[35, 17, 51] // DRB
	];

	var edgeFacelet = [
		[5, 10], // UR
		[7, 19], // UF
		[3, 37], // UL
		[1, 46], // UB
		[32, 16], // DR
		[28, 25], // DF
		[30, 43], // DL
		[34, 52], // DB
		[23, 12], // FR
		[21, 41], // FL
		[50, 39], // BL
		[48, 14] // BR
	];

	var bitCount = mathlib.bitCount;

	function iterFill(depth, mask, ori, parity, memo, candidates, nOri, sampleArr) {
		var key = (mask * nOri + ori) * 2 + parity;
		if (!sampleArr && key in memo) {
			return memo[key];
		}
		if (depth == candidates.length) {
			if (ori == 0 && parity == 0) {
				memo[key] = 1;
			} else {
				memo[key] = 0;
			}
			return memo[key];
		}
		var cnt = 0;
		var probs = [];
		for (var i = 0; i < candidates[depth].length; i++) {
			probs[i] = 0;
			var piece = candidates[depth][i][0];
			if (mask >> piece & 1) {
				continue;
			}
			probs[i] = iterFill(depth + 1,
				mask | 1 << piece,
				(ori + candidates[depth][i][1]) % nOri,
				parity ^ (bitCount(mask >> piece) & 1),
				memo, candidates, nOri
			);
			cnt += probs[i];
		}
		if (sampleArr) {
			var action = candidates[depth][mathlib.rndProb(probs)];
			sampleArr[depth] = action;
			return iterFill(depth + 1,
				mask | 1 << action[0],
				(ori + action[1]) % nOri,
				parity ^ (bitCount(mask >> action[0]) & 1),
				memo, candidates, nOri, sampleArr
			);
		}
		memo[key] = cnt;
		return memo[key];
	}

	function genCandidates(facelet, solved, pieces) {
		var nPiece = pieces.length;
		var nOri = pieces[0].length;
		var candidates = [];
		for (var pos = 0; pos < nPiece; pos++) {
			candidates[pos] = [];
			for (var piece = 0; piece < nPiece; piece++) {
				for (var ori = 0; ori < nOri; ori++) {
					var isValid = true;
					for (var chk = 0; chk < nOri; chk++) {
						var target = facelet[pieces[pos][chk]]
						if (target != -1 && target != solved[pieces[piece][(nOri - ori + chk) % nOri]]) {
							isValid = false;
							break;
						}
					}
					if (isValid) {
						candidates[pos].push([piece, ori]);
					}
				}
			}
		}
		return candidates;
	}

	function calcPattern(facelet, solved) {
		facelet = facelet.split("");
		solved = (solved || mathlib.SOLVED_FACELET).split("");
		for (var i = 0; i < facelet.length; i++) {
			facelet[i] = "URFDLB-XYZ".indexOf(facelet[i]);
			solved[i] = "URFDLB-XYZ".indexOf(solved[i]);
		}
		var cornCandidates = genCandidates(facelet, solved, cornerFacelet);
		var edgeCandidates = genCandidates(facelet, solved, edgeFacelet);
		var cornCnts = [];
		var edgeCnts = [];
		var cornMemo = {};
		var edgeMemo = {};
		for (var parity = 0; parity < 2; parity++) {
			cornCnts[parity] = iterFill(0, 0, 0, parity, cornMemo, cornCandidates, 3);
			edgeCnts[parity] = iterFill(0, 0, 0, parity, edgeMemo, edgeCandidates, 2);
		}
		return [cornCnts, edgeCnts, cornMemo, edgeMemo, cornCandidates, edgeCandidates];
	}

	function genPattern(cornCnts, edgeCnts, cornMemo, edgeMemo, cornCandidates, edgeCandidates) {
		var parity = ~~mathlib.rndHit(cornCnts[1] * edgeCnts[1] / (cornCnts[0] * edgeCnts[0] + cornCnts[1] * edgeCnts[1]));
		var cornArr = [];
		var edgeArr = [];
		iterFill(0, 0, 0, parity, cornMemo, cornCandidates, 3, cornArr);
		iterFill(0, 0, 0, parity, edgeMemo, edgeCandidates, 2, edgeArr);
		var cc = new mathlib.CubieCube();
		for (var i = 0; i < 8; i++) {
			cc.ca[i] = cornArr[i][1] * 8 + cornArr[i][0];
		}
		for (var i = 0; i < 12; i++) {
			cc.ea[i] = edgeArr[i][0] * 2 + edgeArr[i][1];
		}
		return cc.toFaceCube();
	}

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
				params = pat3x3gen.calcPattern(solvedState);
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
			var facelet;
			if (totalCnts == 0) {
				return scramble_333.getRandomScramble();
			}
			var facelet = pat3x3gen.genPattern.apply(null, params);
			if (totalCnts == 1 && facelet == mathlib.SOLVED_FACELET) {
				return scramble_333.getRandomScramble();
			}
			while (facelet == mathlib.SOLVED_FACELET) {
				facelet = pat3x3gen.genPattern.apply(null, params);
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

		return execFunc;

	});

	return {
		calcPattern: calcPattern,
		genPattern: genPattern
	}
})();
