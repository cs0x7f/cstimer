"use strict";

var image = (function() {

	var img;
	var hsq3 = Math.sqrt(3) / 2;
	var PI = Math.PI;

	var Rotate = $.ctxRotate;
	var Transform = $.ctxTransform;
	var drawPolygon = $.ctxDrawPolygon;

	var clkImage = (function() {
		function drawClock(svg, color, trans, time) {
			var points = Transform(Rotate([
				[1, 1, 0, -1, -1, -1, 1, 0],
				[0, -1, -8, -1, 0, 1, 1, 0]
			], time / 6 * PI), trans);
			var x = points[0];
			var y = points[1];
			svg.addElem('<circle cx="' + x[7] + '" cy="' + y[7] + '" r="' + trans[0] * 9 + '" style="fill:' + color + '" />');
			var path = [];
			path.push('M' + x[0] + ' ' + y[0]);
			path.push('Q' + x[1] + ' ' + y[1] + ',' + x[2] + ' ' + y[2]);
			path.push('Q' + x[3] + ' ' + y[3] + ',' + x[4] + ' ' + y[4]);
			path.push('C' + x[5] + ' ' + y[5] + ',' + x[6] + ' ' + y[6] + ',' + x[0] + ' ' + y[0]);
			svg.addElem('<path d="' + path.join(' ') + '" style="fill:' + colors[3] + ';stroke:' + colors[0] + '" />');
		}

		function drawButton(svg, color, trans) {
			var points = Transform([[0],[0]], trans);
			svg.addElem('<circle cx="' + points[0][0] + '" cy="' + points[1][0] +
				'" r="' + trans[0] * 3 + '" style="fill:' + color + ';stroke:#000;" />');
		}

		var width = 3;
		var movere = /([UD][RL]|ALL|[UDRLy]|all)(?:(\d[+-]?)|\((\d[+-]?),(\d[+-]?)\))?/
		var movestr = ['UR', 'DR', 'DL', 'UL', 'U', 'R', 'D', 'L', 'ALL']
		var colors = ['#f00', '#37b', '#5cf', '#ff0', '#850'];

		return function(svg, moveseq) {
			colors = kernel.getProp('colclk').match(colre);
			var moves = moveseq.split(/\s+/);
			var moveArr = clock.moveArr;
			var flip = 9;
			var buttons = [0, 0, 0, 0];
			var clks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			for (var i = 0; i < moves.length; i++) {
				var m = movere.exec(moves[i]);
				if (!m) {
					continue;
				}
				if (m[0] == 'y2') {
					flip = 9 - flip;
					continue;
				}
				var axis = movestr.indexOf(m[1]) + flip;
				if (m[2] == undefined && m[3] == undefined) {
					buttons[axis % 9] = 1;
					continue;
				}
				var power;
				var actions = [];
				if (m[1] == 'all') {
					power = ~~m[2][0] * (m[2][1] == '+' ? -1 : 1) + 12;
					actions.push(8 + 9 - flip, power);
				} else if (m[2]) {
					power = ~~m[2][0] * (m[2][1] == '+' ? 1 : -1) + 12;
					actions.push(axis, power);
				} else {
					power = ~~m[3][0] * (m[3][1] == '+' ? 1 : -1) + 12;
					actions.push(axis, power);
					power = ~~m[4][0] * (m[4][1] == '+' ? -1 : 1) + 12;
					axis = (10 - axis % 9) % 4 + 4 + 9 - flip;
					actions.push(axis, power);
				}
				for (var k = 0; k < actions.length; k += 2) {
					for (var j = 0; j < 14; j++) {
						clks[j] = (clks[j] + moveArr[actions[k]][j] * actions[k + 1]) % 12;
					}
				}
			}
			clks = [clks[0], clks[3], clks[6], clks[1], clks[4], clks[7], clks[2], clks[5], clks[8],
				12 - clks[2], clks[10], 12 - clks[8], clks[9], clks[11], clks[13], 12 - clks[0], clks[12], 12 - clks[6]
			];
			buttons = [buttons[3], buttons[2], buttons[0], buttons[1], 1 - buttons[0], 1 - buttons[1], 1 - buttons[3], 1 - buttons[2]];

			svg.width = 6.25 * 20 * width;
			svg.height = 3 * 20 * width;

			var y = [10, 30, 50];
			var x = [10, 30, 50, 75, 95, 115];
			for (var ii = 0; ii < 18; ii++) {
				var i = (ii + flip) % 18;
				drawClock(svg, [colors[1], colors[2]][~~(ii / 9)], [width, x[~~(i / 3)], y[i % 3]], clks[ii]);
			}

			y = [20, 40];
			x = [20, 40, 85, 105];
			for (var i = 0; i < 8; i++) {
				drawButton(svg, [colors[4], colors[3]][buttons[i]], [width, x[~~(i / 2)], y[i % 2]]);
			}
		};
	})();

	var sq1Image = (function() {
		var posit = [];
		var mid = 0;

		//(move[0], move[1]) (/ = move[2])
		function doMove(move) {
			var newposit = [];

			//top move
			for (var i = 0; i < 12; i++) {
				newposit[(i + move[0]) % 12] = posit[i];
			}

			//bottom move
			for (var i = 0; i < 12; i++) {
				newposit[i + 12] = posit[(i + move[1]) % 12 + 12];
			}

			if (move[2]) {
				mid = 1 - mid;
				for (var i = 0; i < 6; i++) {
					mathlib.circle(newposit, i + 6, 23 - i);
				}
			}
			posit = newposit;
		}

		var ep = [
			[0, -0.5, 0.5],
			[0, -hsq3 - 1, -hsq3 - 1]
		];
		var cp = [
			[0, -0.5, -hsq3 - 1, -hsq3 - 1],
			[0, -hsq3 - 1, -hsq3 - 1, -0.5]
		];
		var cpr = [
			[0, -0.5, -hsq3 - 1],
			[0, -hsq3 - 1, -hsq3 - 1]
		];
		var cpl = [
			[0, -hsq3 - 1, -hsq3 - 1],
			[0, -hsq3 - 1, -0.5]
		];

		var eps = Transform(ep, [0.66, 0, 0]);
		var cps = Transform(cp, [0.66, 0, 0]);
		var cprs = Transform(cpr, [0.66, 0, 0]);
		var cpls = Transform(cpl, [0.66, 0, 0]);

		var udcol = 'UD';
		var ecol = '-B-R-F-L-B-R-F-L';
		var ccol = 'LBBRRFFLBLRBFRLF';
		var colors = {
			'U': '#ff0',
			'R': '#f80',
			'F': '#0f0',
			'D': '#fff',
			'L': '#f00',
			'B': '#00f'
		};

		var width = 45;

		var movere = /^\s*\(\s*(-?\d+),\s*(-?\d+)\s*\)\s*$/;

		return function(svg, moveseq, isSQ2) {
			var cols = kernel.getProp('colsq1').match(colre);
			colors = {
				'U': cols[0],
				'R': cols[1],
				'F': cols[2],
				'D': cols[3],
				'L': cols[4],
				'B': cols[5]
			};
			posit = [0, 1, 2, 4, 5, 6, 8, 9, 10, 12, 13, 14, 17, 16, 18, 21, 20, 22, 25, 24, 26, 29, 28, 30];
			mid = 0;
			var moves = moveseq.split('/');
			for (var i = 0; i < moves.length; i++) {
				if (/^\s*$/.exec(moves[i])) {
					doMove([0, 0, 1]);
					continue;
				}
				var m = movere.exec(moves[i]);
				doMove([~~m[1] + 12, ~~m[2] + 12, 1]);
			}
			doMove([0, 0, 1]);

			svg.width = 11 * width;
			svg.height = 6.3 * width;

			//draw top
			for (var i = 0; i < 24; i++) {
				var cLR = (posit[i] & 1);
				var cRot = (i < 12 ? (i - 3) : (-i)) * PI / 6;
				var eRot = (i < 12 ? (i - 5) : (-1 - i)) * PI / 6;
				var trans = i < 12 ? [width, 2.7, 2.7] : [width, 2.7 + 5.4, 2.7];
				var j = (i + 1) % 12 + (i < 12 ? 0 : 12);
				var val = posit[i] >> 1;
				var colorUD = colors[udcol[val >= 8 ? 1 : 0]];

				if (val % 2 == 0) { //corner piece
					if (isSQ2) {
						if (!cLR && i >= 12) {
							cRot += PI / 6;
						} else if (cLR && i < 12) {
							cRot -= PI / 6;
						}
						drawPolygon(svg, colors[ccol[val + cLR]],
							Rotate(cLR ? cpr : cpl, cRot), trans);
						drawPolygon(svg, colorUD,
							Rotate(cLR ? cprs : cpls, cRot), trans);
					} else if (val == (posit[j] >> 1)) {
						drawPolygon(svg, colors[ccol[val]],
							Rotate(cpl, cRot), trans);
						drawPolygon(svg, colors[ccol[val + 1]],
							Rotate(cpr, cRot), trans);
						drawPolygon(svg, colorUD,
							Rotate(cps, cRot), trans);
					}
				} else { //edge piece
					drawPolygon(svg, colors[ecol[val]],
						Rotate(ep, eRot), trans);
					drawPolygon(svg, colorUD,
						Rotate(eps, eRot), trans);
				}
			}

			var trans = [width, 2.7 + 2.7, 2.7 + 3.0];
			//draw middle
			drawPolygon(svg, colors['L'], [[-hsq3 - 1, -hsq3 - 1, -0.5, -0.5], [0.5, -0.5, -0.5, 0.5]], trans);
			if (mid == 0) {
				drawPolygon(svg, colors['L'], [[hsq3 + 1, hsq3 + 1, -0.5, -0.5], [0.5, -0.5, -0.5, 0.5]], trans);
			} else {
				drawPolygon(svg, colors['R'], [[hsq3, hsq3, -0.5, -0.5], [0.5, -0.5, -0.5, 0.5]], trans);
			}

			var recons = [];
			for (var i = 0; i < moves.length; i++) {
				if (/^\s*$/.exec(moves[i])) {
					recons.push('/');
					continue;
				}
				var m = movere.exec(moves[i]);
				if (~~m[1]) {
					recons.push('(' + m[1] + ',0)');
				}
				if (~~m[2]) {
					recons.push('(0,' + m[2] + ')');
				}
				recons.push('/');
			}
			if (recons[recons.length - 1] == '/') {
				recons.pop();
			} else {
				recons.push('/');
			}
			return ["~", recons, 'sq1'];
		}
	})();

	var nnnImage = (function() {
		var width = 30;

		var posit = [];
		var colors = ['#ff0', '#fa0', '#00f', '#fff', '#f00', '#0d0'];

		function face(svg, f, size) {
			var offx = 10 / 9,
				offy = 10 / 9;
			if (f == 0) { //D
				offx *= size;
				offy *= size * 2;
			} else if (f == 1) { //L
				offx *= 0;
				offy *= size;
			} else if (f == 2) { //B
				offx *= size * 3;
				offy *= size;
			} else if (f == 3) { //U
				offx *= size;
				offy *= 0;
			} else if (f == 4) { //R
				offx *= size * 2;
				offy *= size;
			} else if (f == 5) { //F
				offx *= size;
				offy *= size;
			}

			for (var i = 0; i < size; i++) {
				var x = (f == 1 || f == 2) ? size - 1 - i : i;
				for (var j = 0; j < size; j++) {
					var y = (f == 0) ? size - 1 - j : j;
					drawPolygon(svg, colors[posit[(f * size + y) * size + x]], [
						[i, i, i + 1, i + 1],
						[j, j + 1, j + 1, j]
					], [width, offx + 0.1, offy + 0.1]);
				}
			}
		}

		/**
		 *  f: face, [ D L B U R F ]
		 *  d: which slice, in [0, size-1)
		 *  q: [  2 ']
		 */
		function doslice(f, d, q, size) {
			var f1, f2, f3, f4;
			var s2 = size * size;
			var c, i, j, k;
			if (f > 5) f -= 6;
			for (k = 0; k < q; k++) {
				for (i = 0; i < size; i++) {
					if (f == 0) {
						f1 = 6 * s2 - size * d - size + i;
						f2 = 2 * s2 - size * d - 1 - i;
						f3 = 3 * s2 - size * d - 1 - i;
						f4 = 5 * s2 - size * d - size + i;
					} else if (f == 1) {
						f1 = 3 * s2 + d + size * i;
						f2 = 3 * s2 + d - size * (i + 1);
						f3 = s2 + d - size * (i + 1);
						f4 = 5 * s2 + d + size * i;
					} else if (f == 2) {
						f1 = 3 * s2 + d * size + i;
						f2 = 4 * s2 + size - 1 - d + size * i;
						f3 = d * size + size - 1 - i;
						f4 = 2 * s2 - 1 - d - size * i;
					} else if (f == 3) {
						f1 = 4 * s2 + d * size + size - 1 - i;
						f2 = 2 * s2 + d * size + i;
						f3 = s2 + d * size + i;
						f4 = 5 * s2 + d * size + size - 1 - i;
					} else if (f == 4) {
						f1 = 6 * s2 - 1 - d - size * i;
						f2 = size - 1 - d + size * i;
						f3 = 2 * s2 + size - 1 - d + size * i;
						f4 = 4 * s2 - 1 - d - size * i;
					} else if (f == 5) {
						f1 = 4 * s2 - size - d * size + i;
						f2 = 2 * s2 - size + d - size * i;
						f3 = s2 - 1 - d * size - i;
						f4 = 4 * s2 + d + size * i;
					}
					c = posit[f1];
					posit[f1] = posit[f2];
					posit[f2] = posit[f3];
					posit[f3] = posit[f4];
					posit[f4] = c;
				}
				if (d == 0) {
					for (i = 0; i + i < size; i++) {
						for (j = 0; j + j < size - 1; j++) {
							f1 = f * s2 + i + j * size;
							f3 = f * s2 + (size - 1 - i) + (size - 1 - j) * size;
							if (f < 3) {
								f2 = f * s2 + (size - 1 - j) + i * size;
								f4 = f * s2 + j + (size - 1 - i) * size;
							} else {
								f4 = f * s2 + (size - 1 - j) + i * size;
								f2 = f * s2 + j + (size - 1 - i) * size;
							}
							c = posit[f1];
							posit[f1] = posit[f2];
							posit[f2] = posit[f3];
							posit[f3] = posit[f4];
							posit[f4] = c;
						}
					}
				}
			}
		}

		function genPosit(size, moveseq) {
			var cnt = 0;
			posit = [];
			for (var i = 0; i < 6; i++) {
				for (var f = 0; f < size * size; f++) {
					posit[cnt++] = i;
				}
			}
			var moves = cubeutil.parseScramble(moveseq, "DLBURF", true);
			for (var s = 0; s < moves.length; s++) {
				for (var d = 0; d < moves[s][1]; d++) {
					doslice(moves[s][0], d, moves[s][2], size)
				}
				if (moves[s][1] == -1) {
					for (var d = 0; d < size - 1; d++) {
						doslice(moves[s][0], d, -moves[s][2], size);
					}
					doslice((moves[s][0] + 3) % 6, 0, moves[s][2] + 4, size);
				}
			}
			return posit;
		}

		function draw(svg, size, moveseq) {
			genPosit(size, moveseq);

			svg.width = (39 * size / 9 + 0.2) * width;
			svg.height = (29 * size / 9 + 0.2) * width;

			colors = kernel.getProp('colcube').match(colre);
			for (var i = 0; i < 6; i++) {
				face(svg, i, size);
			}

			var moves = moveseq.split(/\s+/);
			var recons = [];
			for (var i = 0; i < moves.length; i++) {
				if (moves[i]) {
					recons.push(moves[i]);
				}
			}
			return ["~", recons, [size, size, size].join('')];
		}

		return {
			draw: draw,
			genPosit: genPosit
		}
	})();

	/**
	 *	last layer image
	 *	pieces = U1U2...U9F1..F3R1..L3
	 *	   B3 B2 B1
	 *	L1 U1 U2 U3 R3
	 *	L2 U4 U5 U6 R2
	 *	L3 U7 U8 U9 R1
	 *	   F1 F2 F3
	 */
	var llImage = (function() {
		function drawImage(pieces, arrows, img) {
			var svg = new $.svg();
			var colors = kernel.getProp('colcube').match(colre);
			var dim = 3;
			if (pieces.length == 12) {
				dim = 2;
			}
			var width = 50;
			svg.width = (dim + 1.2) * width;
			svg.height = (dim + 1.2) * width;
			for (var i = 0; i < dim * dim; i++) {
				var x = i % dim + 0.5;
				var y = ~~(i / dim) + 0.5;
				drawPolygon(svg, colors["DLBURF".indexOf(pieces[i])] || '#888', [
					[x, x + 1, x + 1, x],
					[y, y, y + 1, y + 1]
				], [width, 0.1, 0.1]);
			}
			for (var i = 0; i < dim * 4; i++) {
				var x = i % dim;
				var rot = ~~(i / dim);
				drawPolygon(svg, colors["DLBURF".indexOf(pieces[i + dim * dim])] || '#888', Rotate([
					[x - dim / 2, x - dim / 2 + 1, (x - dim / 2 + 1) * 0.9, (x - dim / 2) * 0.9],
					[dim / 2 + 0.05, dim / 2 + 0.05, dim / 2 + 0.5, dim / 2 + 0.5]
				], -rot * PI / 2), [width, 0.6 + dim / 2, 0.6 + dim / 2]);
			}
			arrows = arrows || [];
			for (var i = 0; i < arrows.length; i++) {
				var arrow = arrows[i];
				var x1 = arrow[0] % dim + 1.1;
				var y1 = ~~(arrow[0] / dim) + 1.1;
				var x2 = arrow[1] % dim + 1.1;
				var y2 = ~~(arrow[1] / dim) + 1.1;
				var length = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
				drawPolygon(svg, '#000', Rotate([
					[0.2, length - 0.4, length - 0.4, length - 0.1, length - 0.4, length - 0.4, 0.2],
					[0.05, 0.05, 0.15, 0, -0.15, -0.05, -0.05]
				], Math.atan2(y2 - y1, x2 - x1)), [width, x1, y1]);
			}
			if (img) {
				img.attr('src', 'data:image/svg+xml;base64,' + btoa(svg.render()));
			}
			return svg;
		}

		function draw(size, moveseq, img) {
			var state = nnnImage.genPosit(size, moveseq);
			var pieces = [];
			for (var i = 0; i < size * size; i++) {
				pieces.push("DLBURF"[state[3 * size * size + i]]);
			}
			for (var j = 0; j < 4; j++) {
				var offset = [5, 4, 2, 1][j] * size * size;
				for (var i = 0; i < size; i++) {
					var ii = [i, i, size - 1 - i, size - 1 - i][j];
					pieces.push("DLBURF"[state[offset + ii]]);
				}
			}
			return drawImage(pieces.join(''), [], img);
		}

		return {
			drawImage: drawImage,
			draw: draw
		}
	})();

	/**
	 *	cube image of URF faces
	 *	pieces = U1U2...U9R1..R9F1..F9
	 *	U1 U3 R3 R9
	 *	U7 U9 R1 R7
	 *	F1 F3
	 * 	F7 F9
	 */
	var face3Image = (function() {
		var width = 20;
		var gap = 1;
		var ftrans = [
			[width * hsq3, -width * hsq3, (width * 3 + gap) * hsq3, width / 2, width / 2, 0],
			[width * hsq3, 0, (width * 3 + gap * 2) * hsq3, -width / 2, width, width * 3 + gap * 1.5],
			[width * hsq3, 0, 0, width / 2, width, width * 1.5 + gap * 1.5],
		]
		function drawImage(pieces, img) {
			var svg = new $.svg();
			var colors = kernel.getProp('colcube').match(colre);
			svg.width = (6 * width + gap * 2) * hsq3;
			svg.height = (6 * width + gap * 1.5);
			for (var i = 0; i < 27; i++) {
				var x = i % 3;
				var y = ~~(i / 3) % 3;
				drawPolygon(svg, colors["DLBURF".indexOf(pieces[i])] || '#888', [
					[x, x + 1, x + 1, x],
					[y, y, y + 1, y + 1]
				], ftrans[~~(i / 9)]);
			}
			if (img) {
				img.attr('src', 'data:image/svg+xml;base64,' + btoa(svg.render()));
			}
			return svg;
		}
		return drawImage;
	})();

	/**
	 *  F1 R1 L1 F2 F3 F4 R L F5..
	 */
	var pyrllImage = (function() {
		var width = 20;

		function drawImage(pieces, img) {
			var svg = new $.svg();
			svg.width = 6 * hsq3 * width;
			svg.height = 6 * hsq3 * width;
			var colors = kernel.getProp('colpyr').match(colre);
			var idx = 0;
			for (var i = 0; i < 3; i++) {
				for (var f = 0; f < 3; f++) {
					for (var j = 0; j < (i * 2 + 1); j++) {
						var piece;
						var x = -hsq3 * i + hsq3 * j;
						var y = i / 2;
						if (j % 2 == 0) {
							piece = [[x, x - hsq3, x + hsq3], [y, y + 0.5, y + 0.5]];
						} else {
							piece = [[x - hsq3, x, x + hsq3], [y, y + 0.5, y]];
						}
						drawPolygon(svg, colors["FLRD".indexOf(pieces[idx])] || '#888', Rotate(piece, PI / 3 * 4 * f), [width, 3 * hsq3, 3 + (6 * hsq3 - 4.5) / 2]);
						idx++;
					}
				}
			}
			if (img) {
				img.attr('src', 'data:image/svg+xml;base64,' + btoa(svg.render()));
			}
			return svg;
		}
		return drawImage;
	})();

	var polyhedronImage = (function() {
		var puzzleCache = {};

		return function(svg, type, moveseq, faceNameMask, minArea) {
			var colors = [];
			var moves = [];
			var minArea = minArea || 0;
			var gap = 0.05;
			var puzzle = puzzleCache[type];

			var params = poly3d.getFamousPuzzle(type);
			if (params != null) {
				puzzle = puzzle || poly3d.makePuzzle.apply(poly3d, params.polyParam);
				params.parser = params.parser || poly3d.makePuzzleParser(puzzle);
				moves = params.parser.parseScramble(moveseq);
				gap = params.pieceGap;
				colors = params.colors;
			} else {
				debugger; // unknown puzzle
			}

			DEBUG && console.log('[polyhedron image] puzzle=', puzzle, 'moves=', moves);
			puzzleCache[type] = puzzle;
			var poly2d = poly3d.renderNet(puzzle, gap, minArea);
			var sizes = poly2d[0];
			var polys = poly2d[1];
			var faces = poly2d[2];
			var posit = [];
			for (var i = 0; i < polys.length; i++) {
				posit[i] = polys[i] && polys[i][2];
			}
			for (var midx = 0; midx < moves.length; midx++) {
				var move = moves[midx];
				var moveIdx = puzzle.getTwistyIdx(move[0]);
				if (moveIdx == -1) {
					debugger; // error, cannot find move permutations
				}
				var perm = puzzle.moveTable[moveIdx];
				var maxPow = puzzle.twistyDetails[moveIdx][1];
				var pow = (move[1] % maxPow + maxPow) % maxPow;
				var posit2 = [];
				for (var i = 0; i < posit.length; i++) {
					var val = i;
					for (var j = 0; j < pow; j++) {
						val = perm[val] < 0 ? val : perm[val];
					}
					posit2[i] = posit[val];
				}
				posit = posit2;
			}
			if (type == 'skb') {
				colors = $.col2std(kernel.getProp("colskb"), [0, 2, 4, 3, 5, 1])
				var trans = [
					[hsq3, -hsq3, hsq3 * 2, 0.5, 0.5, -1],
					[hsq3, 0, 0, -0.5, 1, 2],
					[hsq3, 0, 0, 0.5, 1, -2],
					[hsq3, 0, 0, 0.5, 1, -2],
					[hsq3, 0, 0, 0.5, 1, -2],
					[hsq3, 0, 0, -0.5, 1, 2]
				];
				for (var i = 0; i < 6; i++) {
					for (var j = 0; j < 6; j++) {
						if (j % 3 != 2) {
							trans[i][j] *= 8 / sizes[0];
						}
					}
				}
				for (var i = 0; i < polys.length; i++) {
					if (!polys[i]) {
						continue;
					}
					var poly = Transform(polys[i], trans[polys[i][2]]);
					polys[i][0] = poly[0];
					polys[i][1] = poly[1];
				}
				sizes = [8 * hsq3, 6];
			}
			var scale = Math.min(1.6 / sizes[0], 1.0 / sizes[1]) * 300;
			svg.width = sizes[0] * scale;
			svg.height = sizes[1] * scale;
			for (var i = 0; i < colors.length; i++) {
				colors[i] = '#' + colors[i].toString(16).padStart(6, '0');
			}
			for (var i = 0; i < posit.length; i++) {
				polys[i] && drawPolygon(svg, colors[posit[i]], polys[i], [scale, 0, 0, 0, scale, 0]);
			}
			for (var i = 0; i < faces.length; i++) {
				if ((faceNameMask >> i & 1) == 0) {
					continue;
				}
				var face = faces[i];
				svg.addText(face[2].toUpperCase(), [face[0] * scale, face[1] * scale], {
					'font': '20px Arial',
					'fill': kernel.getProp('col-font'),
					'stroke': kernel.getProp('col-board'),
					'stroke-width': '3px'
				});
			}
			var recons = [];
			for (var midx = 0; midx < moves.length; midx++) {
				recons.push(params.parser.move2str(moves[midx]));
			}
			return ["~", recons, type];
		}
	})();


	var sldImage = (function() {

		return function(svg, type, size, moveseq) {
			var width = 50;
			var gap = 0.05;

			var state = [];
			var effect = [
				[1, 0],
				[0, 1],
				[0, -1],
				[-1, 0]
			];
			for (var i = 0; i < size * size; i++) {
				state[i] = i;
			}
			var x = size - 1;
			var y = size - 1;

			var movere = /([ULRD\uFFEA\uFFE9\uFFEB\uFFEC])([\d]?)/;
			moveseq = moveseq.split(' ');
			for (var s = 0; s < moveseq.length; s++) {
				var m = movere.exec(moveseq[s]);
				if (!m) {
					continue;
				}
				var turn = 'ULRD\uFFEA\uFFE9\uFFEB\uFFEC'.indexOf(m[1]) % 4;
				var pow = ~~m[2] || 1;
				var eff = effect[type == 'b' ? 3 - turn : turn];
				for (var p = 0; p < pow; p++) {
					mathlib.circle(state, x * size + y, (x + eff[0]) * size + y + eff[1]);
					x += eff[0];
					y += eff[1];
				}
			}

			svg.width = (size + gap * 4) * width;
			svg.height = (size + gap * 4) * width;

			var cols = kernel.getProp('col15p').match(colre);
			cols[size - 1] = cols[cols.length - 1];
			for (var i = 0; i < size; i++) {
				for (var j = 0; j < size; j++) {
					var val = state[j * size + i];
					var colorIdx = Math.min(~~(val / size), val % size);
					val++;
					drawPolygon(svg, cols[colorIdx], [
						[i + gap, i + gap, i + 1 - gap, i + 1 - gap],
						[j + gap, j + 1 - gap, j + 1 - gap, j + gap]
					], [width, gap * 2, gap * 2]);
					if (val == size * size) {
						continue;
					}
					svg.addText(val, [width * (i + 0.5 + gap * 2), width * (j + 0.5 + gap * 2)], {
						'font': width * 0.6 + 'px Arial',
						'fill': '#000'
					});
				}
			}
		}
	})();

	var types_nnn = ['222', '333', '444', '555', '666', '777', '888', '999', '101010', '111111'];

	function genImage(scramble, renderTool) {
		var svg = new $.svg();

		var type = scramble[0];
		if (type == 'input') {
			type = tools.scrambleType(scramble[1]);
		}
		type = tools.puzzleType(type);
		var size = types_nnn.indexOf(type);
		var recons;
		if (size >= 0) {
			recons = nnnImage.draw(svg, size + 2, scramble[1]);
		} else if (type == "cubennn") {
			nnnImage.draw(svg, scramble[2], scramble[1]);
		} else if (poly3d.udpolyre.exec(type)) {
			var faceNameMask = 0;
			if (/^prc|giga|mgm|klm$/.exec(type)) {
				faceNameMask = 0x3;
			} else if (type == 'fto') {
				faceNameMask = 0xff;
			} else if (type == 'ctico') {
				faceNameMask = 0xfffff;
			}
			recons = polyhedronImage(svg, type, scramble[1], faceNameMask, type == 'klm' ? 0.1 : 0);
		} else if (type == "sq1" || type == "sq2") {
			recons = sq1Image(svg, scramble[1], type == "sq2");
		} else if (type == "clk") {
			clkImage(svg, scramble[1]);
		} else if (type == "15b" || type == "15p") {
			sldImage(svg, type[2], 4, scramble[1]);
		} else if (type == "8b" || type == "8p") {
			sldImage(svg, type[1], 3, scramble[1]);
		} else {
			return false;
		}
		if (!renderTool) {
			return svg;
		}
		var scale = Math.min(1.6 / svg.width, 1.0 / svg.height) * kernel.getProp('imgSize') * 0.6;
		img.attr('src', 'data:image/svg+xml;base64,' + btoa(svg.render()));
		img.width(svg.width * scale + 'em');
		img.height(svg.height * scale + 'em');

		if (recons && kernel.getProp('imgRep')) {
			for (var i = 0; i < recons[1].length; i++) {
				recons[1][i] = recons[1][i] + '@' + (i + 1) * 1000;
			}
			recons[1] = recons[1].join(' ');
			img.click(function(recons) {
				replay.popupReplay.apply(null, recons);
			}.bind(null, recons));
		}
		return true;
	}

	execMain(function() {
		function execFunc(fdiv) {
			if (!fdiv) {
				return;
			}
			img = img || $('<img style="display:block;">');
			fdiv.empty().append(img);
			if (!genImage(tools.getCurScramble(), true)) {
				fdiv.html(IMAGE_UNAVAILABLE);
			}
		}

		$(function() {
			tools.regTool('image', TOOLS_IMAGE, execFunc);
		});
	});

	var colre = /#[0-9a-fA-F]{3}/g;

	return {
		draw: genImage,
		llImage: llImage,
		pyrllImage: pyrllImage,
		face3Image: face3Image
	}
})();
