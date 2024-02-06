"use strict";

var image = execMain(function() {

	var canvas, ctx;
	var hsq3 = Math.sqrt(3) / 2;
	var PI = Math.PI;

	var Rotate = $.ctxRotate;
	var Transform = $.ctxTransform;
	var drawPolygon = $.ctxDrawPolygon;

	var mgmImage = (function() {

		var width = 40;
		var cfrac = 0.5;
		var efrac2 = (Math.sqrt(5) + 1) / 2;
		var d2x = (1 - cfrac) / 2 / Math.tan(PI / 5);
		var off1X = 2.6;
		var off1Y = 2.2;
		var off2X = off1X + Math.cos(PI * 0.1) * 3 * efrac2;
		var off2Y = off1Y + Math.sin(PI * 0.1) * 1 * efrac2;
		var cornX = [0, d2x, 0, -d2x];
		var cornY = [-1, -(1 + cfrac) / 2, -cfrac, -(1 + cfrac) / 2];
		var cornX2 = [0, Math.sin(PI * 0.4) / 2, 0, -Math.sin(PI * 0.4) / 2];
		var cornY2 = [-1, -(1 + Math.cos(PI * 0.4)) / 2, -Math.cos(PI * 0.4), -(1 + Math.cos(PI * 0.4)) / 2];
		var edgeX = [Math.cos(PI * 0.1) - d2x, d2x, 0, Math.sin(PI * 0.4) * cfrac];
		var edgeY = [-Math.sin(PI * 0.1) + (cfrac - 1) / 2, -(1 + cfrac) / 2, -cfrac, -Math.cos(PI * 0.4) * cfrac];
		var centX = [Math.sin(PI * 0.0) * cfrac, Math.sin(PI * 0.4) * cfrac, Math.sin(PI * 0.8) * cfrac, Math.sin(PI * 1.2) * cfrac, Math.sin(PI * 1.6) * cfrac];
		var centY = [-Math.cos(PI * 0.0) * cfrac, -Math.cos(PI * 0.4) * cfrac, -Math.cos(PI * 0.8) * cfrac, -Math.cos(PI * 1.2) * cfrac, -Math.cos(PI * 1.6) * cfrac];
		var colors = ['#fff', '#d00', '#060', '#81f', '#fc0', '#00b', '#ffb', '#8df', '#f83', '#7e0', '#f9f', '#999'];

		function drawFace(state, baseIdx, trans, rot, isKLO) {
			if (isKLO) {
				for (var i = 0; i < 5; i++) {
					drawPolygon(ctx, colors[state[baseIdx + i]], Rotate([cornX2, cornY2], PI * 2 / 5 * i + rot), trans);
				}
				return;
			}
			for (var i = 0; i < 5; i++) {
				drawPolygon(ctx, colors[state[baseIdx + i]], Rotate([cornX, cornY], PI * 2 / 5 * i + rot), trans);
				drawPolygon(ctx, colors[state[baseIdx + i + 5]], Rotate([edgeX, edgeY], PI * 2 / 5 * i + rot), trans);
			}
			drawPolygon(ctx, colors[state[baseIdx + 10]], Rotate([centX, centY], rot), trans);
		}

		return function(moveseq, isKLO) {
			colors = kernel.getProp('colmgm').match(colre);
			var state = [];
			for (var i = 0; i < 12; i++) {
				for (var j = 0; j < 11; j++) {
					state[i * 11 + j] = i;
				}
			}
			if (/^(\s*([+-]{2}\s*)+U'?\s*\n)*$/.exec(moveseq)) {
				moveseq = tools.carrot2poch(moveseq);
			}
			moveseq.replace(/(?:^|\s*)(?:([DLR])(\+\+?|--?)|(U|F|D?B?R|D?B?L|D|B)(\d?)('?)|\[([ufrl])('?)\])(?:$|\s*)/g, function(m, p1, p2, p3, p4, p5, p6, p7) {
				if (p1) {
					mathlib.minx.doMove(state, 'DL?R'.indexOf(p1), (p2[0] == '+' ? -1 : 1) * p2.length, 2);
				} else if (p3) {
					mathlib.minx.doMove(state, ["U", "R", "F", "L", "BL", "BR", "DR", "DL", "DBL", "B", "DBR", "D"].indexOf(p3), (p5 ? -1 : 1) * (~~p4 || 1), 0);
				} else {
					mathlib.minx.doMove(state, 'urfl'.indexOf(p6), p7 ? -1 : 1, 1);
				}
			});
			var imgSize = kernel.getProp('imgSize') / 7.5;
			canvas.width(7 * imgSize + 'em');
			canvas.height(3.5 * imgSize + 'em');
			canvas.attr('width', 9.8 * width);
			canvas.attr('height', 4.9 * width);
			drawFace(state, 0, [width, off1X + 0 * efrac2, off1Y + 0 * efrac2], PI * 0.0, isKLO);
			drawFace(state, 11, [width, off1X + Math.cos(PI * 0.1) * efrac2, off1Y + Math.sin(PI * 0.1) * efrac2], PI * 0.2, isKLO);
			drawFace(state, 22, [width, off1X + Math.cos(PI * 0.5) * efrac2, off1Y + Math.sin(PI * 0.5) * efrac2], PI * 0.6, isKLO);
			drawFace(state, 33, [width, off1X + Math.cos(PI * 0.9) * efrac2, off1Y + Math.sin(PI * 0.9) * efrac2], PI * 1.0, isKLO);
			drawFace(state, 44, [width, off1X + Math.cos(PI * 1.3) * efrac2, off1Y + Math.sin(PI * 1.3) * efrac2], PI * 1.4, isKLO);
			drawFace(state, 55, [width, off1X + Math.cos(PI * 1.7) * efrac2, off1Y + Math.sin(PI * 1.7) * efrac2], PI * 1.8, isKLO);
			drawFace(state, 66, [width, off2X + Math.cos(PI * 0.7) * efrac2, off2Y + Math.sin(PI * 0.7) * efrac2], PI * 0.0, isKLO);
			drawFace(state, 77, [width, off2X + Math.cos(PI * 0.3) * efrac2, off2Y + Math.sin(PI * 0.3) * efrac2], PI * 1.6, isKLO);
			drawFace(state, 88, [width, off2X + Math.cos(PI * 1.9) * efrac2, off2Y + Math.sin(PI * 1.9) * efrac2], PI * 1.2, isKLO);
			drawFace(state, 99, [width, off2X + Math.cos(PI * 1.5) * efrac2, off2Y + Math.sin(PI * 1.5) * efrac2], PI * 0.8, isKLO);
			drawFace(state, 110, [width, off2X + Math.cos(PI * 1.1) * efrac2, off2Y + Math.sin(PI * 1.1) * efrac2], PI * 0.4, isKLO);
			drawFace(state, 121, [width, off2X + 0 * efrac2, off2Y + 0 * efrac2], PI * 1.0, isKLO);
			if (ctx) {
				ctx.fillStyle = "#000";
				ctx.font = "20px serif";
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				ctx.fillText("U", width * off1X, width * off1Y);
				ctx.fillText("F", width * off1X, width * (off1Y + Math.sin(PI * 0.5) * efrac2));
			}
		};
	})();

	var clkImage = (function() {
		function drawClock(color, trans, time) {
			if (!ctx) {
				return;
			}
			var points = Transform(Rotate([
				[1, 1, 0, -1, -1, -1, 1, 0],
				[0, -1, -8, -1, 0, 1, 1, 0]
			], time / 6 * PI), trans);
			var x = points[0];
			var y = points[1];

			ctx.beginPath();
			ctx.fillStyle = color;
			ctx.arc(x[7], y[7], trans[0] * 9, 0, 2 * PI);
			ctx.fill();

			ctx.beginPath();
			ctx.fillStyle = colors[3];
			ctx.strokeStyle = colors[0];
			ctx.moveTo(x[0], y[0]);
			ctx.bezierCurveTo(x[1], y[1], x[1], y[1], x[2], y[2]);
			ctx.bezierCurveTo(x[3], y[3], x[3], y[3], x[4], y[4]);
			ctx.bezierCurveTo(x[5], y[5], x[6], y[6], x[0], y[0]);
			ctx.closePath();
			ctx.fill();
			ctx.stroke();
		}

		function drawButton(color, trans) {
			if (!ctx) {
				return;
			}
			var points = Transform([
				[0],
				[0]
			], trans);
			ctx.beginPath();
			ctx.fillStyle = color;
			ctx.strokeStyle = '#000';
			ctx.arc(points[0][0], points[1][0], trans[0] * 3, 0, 2 * PI);
			ctx.fill();
			ctx.stroke();
		}

		var width = 3;
		var movere = /([UD][RL]|ALL|[UDRLy])(\d[+-]?)?/
		var movestr = ['UR', 'DR', 'DL', 'UL', 'U', 'R', 'D', 'L', 'ALL']
		var colors = ['#f00', '#37b', '#5cf', '#ff0', '#850'];

		return function(moveseq) {
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
					flip = 0;
					continue;
				}
				var axis = movestr.indexOf(m[1]) + flip;
				if (m[2] == undefined) {
					buttons[axis % 9] = 1;
					continue;
				}
				var power = ~~m[2][0];
				power = m[2][1] == '+' ? power : 12 - power;
				for (var j = 0; j < 14; j++) {
					clks[j] = (clks[j] + moveArr[axis][j] * power) % 12;
				}
			}
			clks = [clks[0], clks[3], clks[6], clks[1], clks[4], clks[7], clks[2], clks[5], clks[8],
				12 - clks[2], clks[10], 12 - clks[8], clks[9], clks[11], clks[13], 12 - clks[0], clks[12], 12 - clks[6]
			];
			buttons = [buttons[3], buttons[2], buttons[0], buttons[1], 1 - buttons[0], 1 - buttons[1], 1 - buttons[3], 1 - buttons[2]];

			var imgSize = kernel.getProp('imgSize') / 7.5;
			canvas.width(6.25 * imgSize + 'em');
			canvas.height(3 * imgSize + 'em');
			canvas.attr('width', 6.25 * 20 * width);
			canvas.attr('height', 3 * 20 * width);

			var y = [10, 30, 50];
			var x = [10, 30, 50, 75, 95, 115];
			for (var i = 0; i < 18; i++) {
				drawClock([colors[1], colors[2]][~~(i / 9)], [width, x[~~(i / 3)], y[i % 3]], clks[i]);
			}

			y = [20, 40];
			x = [20, 40, 85, 105];
			for (var i = 0; i < 8; i++) {
				drawButton([colors[4], colors[3]][buttons[i]], [width, x[~~(i / 2)], y[i % 2]]);
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

		return function(moveseq, isSQ2) {
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

			var imgSize = kernel.getProp('imgSize') / 10;
			canvas.width(11 * imgSize / 1.3 + 'em');
			canvas.height(6.3 * imgSize / 1.3 + 'em');

			canvas.attr('width', 11 * width);
			canvas.attr('height', 6.3 * width);

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
						drawPolygon(ctx, colors[ccol[val + cLR]],
							Rotate(cLR ? cpr : cpl, cRot), trans);
						drawPolygon(ctx, colorUD,
							Rotate(cLR ? cprs : cpls, cRot), trans);
					} else if (val == (posit[j] >> 1)) {
						drawPolygon(ctx, colors[ccol[val]],
							Rotate(cpl, cRot), trans);
						drawPolygon(ctx, colors[ccol[val + 1]],
							Rotate(cpr, cRot), trans);
						drawPolygon(ctx, colorUD,
							Rotate(cps, cRot), trans);
					}
				} else { //edge piece
					drawPolygon(ctx, colors[ecol[val]],
						Rotate(ep, eRot), trans);
					drawPolygon(ctx, colorUD,
						Rotate(eps, eRot), trans);
				}
			}

			var trans = [width, 2.7 + 2.7, 2.7 + 3.0];
			//draw middle
			drawPolygon(ctx, colors['L'], [[-hsq3 - 1, -hsq3 - 1, -0.5, -0.5], [0.5, -0.5, -0.5, 0.5]], trans);
			if (mid == 0) {
				drawPolygon(ctx, colors['L'], [[hsq3 + 1, hsq3 + 1, -0.5, -0.5], [0.5, -0.5, -0.5, 0.5]], trans);
			} else {
				drawPolygon(ctx, colors['R'], [[hsq3, hsq3, -0.5, -0.5], [0.5, -0.5, -0.5, 0.5]], trans);
			}
		}
	})();

	var skewbImage = (function() {
		var width = 45;
		var gap = width / 10;
		var posit = [];
		var colors = ['#fff', '#00f', '#f00', '#ff0', '#0f0', '#f80'];

		var ftrans = [
			[width * hsq3, width * hsq3, (width * 4 + gap * 1.5) * hsq3, -width / 2, width / 2, width],
			[width * hsq3, 0, (width * 7 + gap * 3) * hsq3, -width / 2, width, width * 1.5],
			[width * hsq3, 0, (width * 5 + gap * 2) * hsq3, -width / 2, width, width * 2.5 + 0.5 * gap],
			[0, -width * hsq3, (width * 3 + gap * 1) * hsq3, width, -width / 2, width * 4.5 + 1.5 * gap],
			[width * hsq3, 0, (width * 3 + gap * 1) * hsq3, width / 2, width, width * 2.5 + 0.5 * gap],
			[width * hsq3, 0, width * hsq3, width / 2, width, width * 1.5]
		];

		function doMove(axis, power) {
			for (var p = 0; p < power; p++) {
				switch (axis) {
					case 0: //R
						mathlib.circle(posit, 2 * 5 + 0, 1 * 5 + 0, 3 * 5 + 0);
						mathlib.circle(posit, 2 * 5 + 4, 1 * 5 + 3, 3 * 5 + 2);
						mathlib.circle(posit, 2 * 5 + 2, 1 * 5 + 4, 3 * 5 + 1);
						mathlib.circle(posit, 2 * 5 + 3, 1 * 5 + 1, 3 * 5 + 4);
						mathlib.circle(posit, 4 * 5 + 4, 0 * 5 + 4, 5 * 5 + 3);
						break;
					case 1: //U
						mathlib.circle(posit, 0 * 5 + 0, 5 * 5 + 0, 1 * 5 + 0);
						mathlib.circle(posit, 0 * 5 + 2, 5 * 5 + 1, 1 * 5 + 2);
						mathlib.circle(posit, 0 * 5 + 4, 5 * 5 + 2, 1 * 5 + 4);
						mathlib.circle(posit, 0 * 5 + 1, 5 * 5 + 3, 1 * 5 + 1);
						mathlib.circle(posit, 4 * 5 + 1, 3 * 5 + 4, 2 * 5 + 2);
						break;
					case 2: //L
						mathlib.circle(posit, 4 * 5 + 0, 3 * 5 + 0, 5 * 5 + 0);
						mathlib.circle(posit, 4 * 5 + 3, 3 * 5 + 3, 5 * 5 + 4);
						mathlib.circle(posit, 4 * 5 + 1, 3 * 5 + 1, 5 * 5 + 3);
						mathlib.circle(posit, 4 * 5 + 4, 3 * 5 + 4, 5 * 5 + 2);
						mathlib.circle(posit, 2 * 5 + 3, 1 * 5 + 4, 0 * 5 + 1);
						break;
					case 3: //B
						mathlib.circle(posit, 1 * 5 + 0, 5 * 5 + 0, 3 * 5 + 0);
						mathlib.circle(posit, 1 * 5 + 4, 5 * 5 + 3, 3 * 5 + 4);
						mathlib.circle(posit, 1 * 5 + 3, 5 * 5 + 1, 3 * 5 + 3);
						mathlib.circle(posit, 1 * 5 + 2, 5 * 5 + 4, 3 * 5 + 2);
						mathlib.circle(posit, 0 * 5 + 2, 4 * 5 + 3, 2 * 5 + 4);
						break;
				}
			}
		}

		function face(f) {
			var transform = ftrans[f];
			drawPolygon(ctx, colors[posit[f * 5 + 0]], [
				[-1, 0, 1, 0],
				[0, 1, 0, -1]
			], transform);
			drawPolygon(ctx, colors[posit[f * 5 + 1]], [
				[-1, -1, 0],
				[0, -1, -1]
			], transform);
			drawPolygon(ctx, colors[posit[f * 5 + 2]], [
				[0, 1, 1],
				[-1, -1, 0]
			], transform);
			drawPolygon(ctx, colors[posit[f * 5 + 3]], [
				[-1, -1, 0],
				[0, 1, 1]
			], transform);
			drawPolygon(ctx, colors[posit[f * 5 + 4]], [
				[0, 1, 1],
				[1, 1, 0]
			], transform);
		}

		return function(moveseq) {
			colors = kernel.getProp('colskb').match(colre);
			var cnt = 0;
			for (var i = 0; i < 6; i++) {
				for (var f = 0; f < 5; f++) {
					posit[cnt++] = i;
				}
			}
			var scramble = kernel.parseScramble(moveseq, 'RULB');
			for (var i = 0; i < scramble.length; i++) {
				doMove(scramble[i][0], scramble[i][2] == 1 ? 1 : 2);
			}
			var imgSize = kernel.getProp('imgSize') / 10;
			canvas.width((8 * hsq3 + 0.3) * imgSize + 'em');
			canvas.height(6.2 * imgSize + 'em');

			canvas.attr('width', (8 * hsq3 + 0.3) * width + 1);
			canvas.attr('height', 6.2 * width + 1);

			for (var i = 0; i < 6; i++) {
				face(i);
			}
		}
	})();

	var nnnImage = (function() {
		var width = 30;

		var posit = [];
		var colors = ['#ff0', '#fa0', '#00f', '#fff', '#f00', '#0d0'];

		function face(f, size) {
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
					drawPolygon(ctx, colors[posit[(f * size + y) * size + x]], [
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
			var moves = kernel.parseScramble(moveseq, "DLBURF", true);
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

		function draw(size, moveseq) {
			genPosit(size, moveseq);

			var imgSize = kernel.getProp('imgSize') / 50;
			canvas.width(39 * imgSize + 'em');
			canvas.height(29 * imgSize + 'em');

			canvas.attr('width', (39 * size / 9 + 0.2) * width);
			canvas.attr('height', (29 * size / 9 + 0.2) * width);

			colors = kernel.getProp('colcube').match(colre);
			for (var i = 0; i < 6; i++) {
				face(i, size);
			}
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
		function drawImage(pieces, arrows, _canvas) {
			var canvas = $(_canvas);
			var colors = kernel.getProp('colcube').match(colre);
			var ctx = canvas[0].getContext('2d');
			var dim = 3;
			if (pieces.length == 12) {
				dim = 2;
			}
			var width = 50;
			canvas.attr('width', (dim + 1.2) * width);
			canvas.attr('height', (dim + 1.2) * width);
			for (var i = 0; i < dim * dim; i++) {
				var x = i % dim + 0.5;
				var y = ~~(i / dim) + 0.5;
				drawPolygon(ctx, colors["DLBURF".indexOf(pieces[i])] || '#888', [
					[x, x + 1, x + 1, x],
					[y, y, y + 1, y + 1]
				], [width, 0.1, 0.1]);
			}
			for (var i = 0; i < dim * 4; i++) {
				var x = i % dim;
				var rot = ~~(i / dim);
				drawPolygon(ctx, colors["DLBURF".indexOf(pieces[i + dim * dim])] || '#888', Rotate([
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
				drawPolygon(ctx, '#000', Rotate([
					[0.2, length - 0.4, length - 0.4, length - 0.1, length - 0.4, length - 0.4, 0.2],
					[0.05, 0.05, 0.15, 0, -0.15, -0.05, -0.05]
				], Math.atan2(y2 - y1, x2 - x1)), [width, x1, y1]);
			}
		}

		function draw(size, moveseq, _canvas) {
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
			drawImage(pieces.join(''), [], _canvas);
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
		function drawImage(pieces, _canvas) {
			var canvas = $(_canvas);
			var colors = kernel.getProp('colcube').match(colre);
			var ctx = canvas[0].getContext('2d');
			canvas.attr('width', (6 * width + gap * 2) * hsq3 + 1);
			canvas.attr('height', (6 * width + gap * 1.5) + 1);
			for (var i = 0; i < 27; i++) {
				var x = i % 3;
				var y = ~~(i / 3) % 3;
				drawPolygon(ctx, colors["DLBURF".indexOf(pieces[i])] || '#888', [
					[x, x + 1, x + 1, x],
					[y, y, y + 1, y + 1]
				], ftrans[~~(i / 9)]);
			}
		}
		return drawImage;
	})();

	/**
	 *  F1 R1 L1 F2 F3 F4 R L F5..
	 */
	var pyrllImage = (function() {
		var width = 20;

		function drawImage(pieces, _canvas) {
			var canvas = $(_canvas);
			canvas.attr('width', 6 * hsq3 * width + 1);
			canvas.attr('height', 6 * hsq3 * width + 1);
			var colors = kernel.getProp('colpyr').match(colre);
			var ctx = canvas[0].getContext('2d');
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
						drawPolygon(ctx, colors["FLRD".indexOf(pieces[idx])] || '#888', Rotate(piece, PI / 3 * 4 * f), [width, 3 * hsq3, 3 + (6 * hsq3 - 4.5) / 2]);
						idx++;
					}
				}
			}
		}
		return drawImage;
	})();

	var ftoImage = (function() {
		var posit = [];
		// Based on LanLan's FTO color scheme, with white top, red front, green right
		// Order is    U       L          F       R       B       BR         D       BL
		var colors = ['#fff', '#808', '#f00', '#0d0', '#00f', '#bbb', '#ff0', '#fa0'];

		function doMove(move) {
			if (move == 'U') {
				var stripL = [9, 10, 14, 15, 17];  // L face strip shared with U
				var stripB = [36, 37, 38, 39, 40]; // B face strip shared with U
				var stripR = [27, 29, 28, 32, 31]; // R face strip shared with U

				for (var i = 0; i < 5; i++) {
					mathlib.circle(posit, stripL[i], stripB[i], stripR[i]);
				}

				mathlib.circle(posit, 18, 67, 45); // Shared-colors corner triangles
				mathlib.circle(posit, 0, 4, 8);    // Face corners
				mathlib.circle(posit, 1, 3, 6);    // Face centers
				mathlib.circle(posit, 2, 7, 5);    // Face edges
			}

			if (move == 'L') {
				var stripU  = [0, 1, 5, 6, 8];      // U face strip shared with L
				var stripF  = [18, 20, 19, 23, 22]; // F face strip shared with L
				var stripBL = [71, 70, 69, 68, 67]; // BL face strip shared with L

				for (var i = 0; i < 5; i++) {
					mathlib.circle(posit, stripU[i], stripF[i], stripBL[i]);
				}

				mathlib.circle(posit, 27, 62, 40); // Shared-colors corner triangles
				mathlib.circle(posit, 9, 17, 13);  // Face corners
				mathlib.circle(posit, 10, 15, 12); // Face centers
				mathlib.circle(posit, 14, 16, 11); // Face edges
			}

			if (move == 'R') {
				var stripU  = [8, 6, 7, 3, 4];      // U face strip shared with R
				var stripBR = [45, 46, 47, 48, 49]; // BR face strip shared with R
				var stripF  = [26, 25, 21, 20, 18]; // F face strip shared with R

				for (var i = 0; i < 5; i++) {
					mathlib.circle(posit, stripU[i], stripBR[i], stripF[i]);
				}

				mathlib.circle(posit, 17, 36, 58); // Shared-colors corner triangles
				mathlib.circle(posit, 27, 31, 35);  // Face corners
				mathlib.circle(posit, 29, 32, 34); // Face centers
				mathlib.circle(posit, 28, 33, 30); // Face edges
			}

			if (move == 'F') {
				var stripR = [27, 29, 30, 34, 35]; // R face strip shared with F
				var stripD = [58, 59, 60, 61, 62]; // D face strip shared with F
				var stripL = [13, 12, 16, 15, 17]; // L face strip shared with F

				for (var i = 0; i < 5; i++) {
					mathlib.circle(posit, stripR[i], stripD[i], stripL[i]);
				}

				mathlib.circle(posit, 8, 49, 71);  // Shared-colors corner triangles
				mathlib.circle(posit, 18, 26, 22); // Face corners
				mathlib.circle(posit, 20, 25, 23); // Face centers
				mathlib.circle(posit, 19, 21, 24); // Face edges
			}

			if (move == 'B') {
				var stripU  = [4, 3, 2, 1, 0];      // U face strip shared with B
				var stripBL = [67, 68, 64, 65, 63]; // BL face strip shared with B
				var stripBR = [53, 51, 50, 46, 45]; // BR face strip shared with B

				for (var i = 0; i < 5; i++) {
					mathlib.circle(posit, stripU[i], stripBL[i], stripBR[i]);
				}

				mathlib.circle(posit, 54, 31, 9);  // Shared-colors corner triangles
				mathlib.circle(posit, 36, 40, 44); // Face corners
				mathlib.circle(posit, 37, 39, 42); // Face centers
				mathlib.circle(posit, 38, 43, 41); // Face edges
			}

			if (move == 'BR') {
				var stripB = [36, 37, 41, 42, 44]; // B face strip shared with BR
				var stripD = [54, 56, 55, 59, 58]; // D face strip shared with BR
				var stripR = [35, 34, 33, 32, 31]; // R face strip shared with BR

				for (var i = 0; i < 5; i++) {
					mathlib.circle(posit, stripB[i], stripD[i], stripR[i]);
				}

				mathlib.circle(posit, 63, 26, 4);  // Shared-colors corner triangles
				mathlib.circle(posit, 45, 53, 49); // Face corners
				mathlib.circle(posit, 46, 51, 48); // Face centers
				mathlib.circle(posit, 50, 52, 47); // Face edges
			}

			if (move == 'BL') {
				var stripB = [44, 42, 43, 39, 40]; // B face strip shared with BL
				var stripL = [9, 10, 11, 12, 13];  // L face strip shared with BL
				var stripD = [62, 61, 57, 56, 54]; // D face strip shared with BL

				for (var i = 0; i < 5; i++) {
					mathlib.circle(posit, stripB[i], stripL[i], stripD[i]);
				}

				mathlib.circle(posit, 53, 0, 22);  // Shared-colors corner triangles
				mathlib.circle(posit, 63, 67, 71); // Face corners
				mathlib.circle(posit, 65, 68, 70); // Face centers
				mathlib.circle(posit, 64, 69, 66); // Face edges
			}

			if (move == 'D') {
				var stripBR = [49, 48, 52, 51, 53]; // BR face strip shared with D
				var stripBL = [63, 65, 66, 70, 71];  // BL face strip shared with D
				var stripF = [22, 23, 24, 25, 26];  // F face strip shared with D

				for (var i = 0; i < 5; i++) {
					mathlib.circle(posit, stripBR[i], stripBL[i], stripF[i]);
				}

				mathlib.circle(posit, 44, 13, 35);  // Shared-colors corner triangles
				mathlib.circle(posit, 54, 62, 58); // Face corners
				mathlib.circle(posit, 56, 61, 59); // Face centers
				mathlib.circle(posit, 55, 57, 60); // Face edges
			}
		}

		function renderChar(width, x, y, value) {
			ctx.fillStyle = kernel.getProp('col-font');
			ctx.font = "33px Calibri";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillText(value, width * x, width * y);
		}

		function drawHeavyLine(x1, y1, x2, y2, scale) {
			ctx.beginPath();
			ctx.moveTo(x1*scale, y1*scale);
			ctx.lineTo(x2*scale, y2*scale);
			ctx.lineWidth = 3;
			ctx.stroke();
			ctx.lineWidth = 1;
		}

		function render() {
			var width = 650;
			var fraction = width/13;

			// Coordinates to facilitate drawing half the puzzle.
			// Each key is a "piece number", and its value is a list of (x, y coordinates) to draw
			// that piece's triangle in the appropriate place.
			var half_coords = {
				// U face (or B face if key is +36)
				0: [[0, 2, 1], [0, 0, 1]],
				1: [[2, 3, 1], [0, 1, 1]],
				2: [[2, 4, 3], [0, 0, 1]],
				3: [[4, 5, 3], [0, 1, 1]],
				4: [[4, 6, 5], [0, 0, 1]],
				5: [[1, 3, 2], [1, 1, 2]],
				6: [[3, 4, 2], [1, 2, 2]],
				7: [[3, 5, 4], [1, 1, 2]],
				8: [[2, 4, 3], [2, 2, 3]],

				// L face (or BR face if key is +36)
				9: [[0, 1, 0], [0, 1, 2]],
				10: [[0, 1, 1], [2, 1, 3]],
				11: [[0, 1, 0], [2, 3, 4]],
				12: [[0, 1, 1], [4, 3, 5]],
				13: [[0, 1, 0], [4, 5, 6]],
				14: [[1, 2, 1], [1, 2, 3]],
				15: [[1, 2, 2], [3, 2, 4]],
				16: [[1, 2, 1], [3, 4, 5]],
				17: [[2, 3, 2], [2, 3, 4]],

				// F face (or D face if key is +36)
				18: [[2, 3, 4], [4, 3, 4]],
				19: [[1, 2, 3], [5, 4, 5]],
				20: [[2, 4, 3], [4, 4, 5]],
				21: [[3, 4, 5], [5, 4, 5]],
				22: [[0, 1, 2], [6, 5, 6]],
				23: [[1, 3, 2], [5, 5, 6]],
				24: [[2, 3, 4], [6, 5, 6]],
				25: [[3, 5, 4], [5, 5, 6]],
				26: [[4, 5, 6], [6, 5, 6]],

				// R face (or BL face if key is +36)
				27: [[3, 4, 4], [3, 2, 4]],
				28: [[4, 5, 5], [2, 1, 3]],
				29: [[4, 5, 4], [2, 3, 4]],
				30: [[4, 5, 5], [4, 3, 5]],
				31: [[5, 6, 6], [1, 0, 2]],
				32: [[5, 6, 5], [1, 2, 3]],
				33: [[5, 6, 6], [3, 2, 4]],
				34: [[5, 6, 5], [3, 4, 5]],
				35: [[5, 6, 6], [5, 4, 6]],
			}

			for (var i = 0; i < 72; i++) {
				var coords = half_coords[i % 36];
				var x = coords[0];
				var y = coords[1];
				var xoff = i >= 36 ? 7 : 0;
				var shifted = [[x[0] + xoff, x[1] + xoff, x[2] + xoff], y];

				drawPolygon(ctx, colors[posit[i]], shifted, [fraction, 0, 0]);
			}

			drawHeavyLine(0, 0, 6, 6, fraction);
			drawHeavyLine(6, 0, 0, 6, fraction);
			drawHeavyLine(7, 0, 13, 6, fraction);
			drawHeavyLine(13, 0, 7, 6, fraction);

			ctx.fillStyle = kernel.getProp('col-font');  // support theme font color here, since it's text on canvas
			ctx.strokeStyle = kernel.getProp('col-font');
			ctx.font = fraction * 0.5 + "px monospace";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillText("U", fraction * 3, fraction * 1.6);
			ctx.fillText("R", fraction * 4.4, fraction * 3);
			ctx.fillText("F", fraction * 3, fraction * 4.4);
			ctx.fillText("L", fraction * 1.6, fraction * 3);
			ctx.fillText("B", fraction * 10, fraction * 1.6);
			ctx.fillText("BL", fraction * 11.4, fraction * 3);
			ctx.fillText("D", fraction * 10, fraction * 4.4);
			ctx.fillText("BR", fraction * 8.6, fraction * 3);
		}

		return function(moveseq) {
			colors = kernel.getProp('colfto').match(colre);
			var cnt = 0;
			var faceSize = 9;
			for (var i = 0; i < 8; i++) {
				for (var f = 0; f < faceSize; f++) {
					posit[cnt++] = i;
				}
			}

			var scramble = moveseq.split(' ');
			for (var i = 0; i < scramble.length; i++) {
				var move = scramble[i];
				if (move.endsWith("'")) {
					move = move.replace("'", "");
					// U' == U U
					doMove(move);
					doMove(move);
				} else {
					doMove(move);
				}
			}

			var imgSize = kernel.getProp('imgSize') / 50;
			canvas.width(39 * imgSize + 'em');
			canvas.height(18 * imgSize + 'em');

			canvas.attr('width', 651);
			canvas.attr('height', 301);

			render();
		}
	})();

	var polyhedronImage = (function() {
		var puzzleCache = {};

		return function(type, moveseq) {
			var colors = [];
			var moves = [];
			var minArea = 0;
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
			var ret = poly3d.renderNet(puzzle, gap, minArea);
			var sizes = ret[0];
			var polys = ret[1];
			var posit = [];
			for (var i = 0; i < polys.length; i++) {
				posit[i] = polys[i] && polys[i][2];
			}
			for (var midx = 0; midx < moves.length; midx++) {
				var move = moves[midx];;
				if (!(move[0] in puzzle.twistyIdx)) {
					debugger; // error, cannot find move permutations
				}
				var moveIdx = puzzle.twistyIdx[move[0]];
				var perm = puzzle.moveTable[moveIdx];
				var maxPow = puzzle.twistyDetails[moveIdx][1];
				var pow = (move[1] % maxPow + maxPow) % maxPow;
				var posit2 = [];
				for (var i = 0; i < posit.length; i++) {
					var val = i;
					for (var j = 0; j < pow; j++) {
						val = perm[val];
					}
					posit2[i] = posit[val];
				}
				posit = posit2;
			}

			var scale = Math.min(1.6 / sizes[0], 1.0 / sizes[1]) * kernel.getProp('imgSize') * 0.6;
			canvas.width(sizes[0] * scale + 'em');
			canvas.height(sizes[1] * scale + 'em');
			canvas.attr('width', sizes[0] * scale * 30 + 1);
			canvas.attr('height', sizes[1] * scale * 30 + 1);
			for (var i = 0; i < colors.length; i++) {
				colors[i] = '#' + colors[i].toString(16).padStart(6, '0');
			}
			for (var i = 0; i < posit.length; i++) {
				polys[i] && $.ctxDrawPolygon(ctx, colors[posit[i]], polys[i], [scale * 30, 0, 0, 0, scale * 30, 0]);
			}
		}

	})();


	var sldImage = (function() {

		return function(type, size, moveseq) {
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

			var imgSize = kernel.getProp('imgSize') / 50;
			canvas.width(30 * imgSize + 'em');
			canvas.height(30 * imgSize + 'em');

			canvas.attr('width', (size + gap * 4) * width);
			canvas.attr('height', (size + gap * 4) * width);

			var cols = kernel.getProp('col15p').match(colre);
			cols[size - 1] = cols[cols.length - 1];
			for (var i = 0; i < size; i++) {
				for (var j = 0; j < size; j++) {
					var val = state[j * size + i];
					var colorIdx = Math.min(~~(val / size), val % size);
					val++;
					drawPolygon(ctx, cols[colorIdx], [
						[i + gap, i + gap, i + 1 - gap, i + 1 - gap],
						[j + gap, j + 1 - gap, j + 1 - gap, j + gap]
					], [width, gap * 2, gap * 2]);
					if (val == size * size) {
						continue;
					}
					ctx.fillStyle = "#000";
					ctx.font = width * 0.6 + "px monospace";
					ctx.textAlign = "center";
					ctx.textBaseline = "middle";
					ctx.fillText(val, width * (i + 0.5 + gap * 2), width * (j + 0.5 + gap * 2));
				}
			}
		}
	})();

	var types_nnn = ['', '', '222', '333', '444', '555', '666', '777', '888', '999', '101010', '111111'];

	function genImage(scramble) {
		var type = scramble[0];
		if (type == 'input') {
			type = tools.scrambleType(scramble[1]);
		}
		type = tools.puzzleType(type);
		var size;
		for (size = 0; size < 12; size++) {
			if (type == types_nnn[size]) {
				nnnImage.draw(size, scramble[1]);
				return true;
			}
		}
		if (type == "cubennn") {
			nnnImage.draw(scramble[2], scramble[1]);
			return true;
		}
		if (/^pyr|prc|heli(?:2x2|cv)?$/.exec(type)) {
			polyhedronImage(type, scramble[1]);
			return true;
		}
		if (type == "skb") {
			skewbImage(scramble[1]);
			return true;
		}
		if (type == "sq1" || type == "sq2") {
			sq1Image(scramble[1], type == "sq2");
			return true;
		}
		if (type == "clk") {
			clkImage(scramble[1]);
			return true;
		}
		if (type == "mgm" || type == "klm") {
			mgmImage(scramble[1], type == "klm");
			return true;
		}
		if (type == "fto") {
			ftoImage(scramble[1]);
			return true;
		}
		if (type == "15b" || type == "15p") {
			sldImage(type[2], 4, scramble[1]);
			return true;
		}
		if (type == "8b" || type == "8p") {
			sldImage(type[1], 3, scramble[1]);
			return true;
		}
		return false;
	}

	function execFunc(fdiv) {
		if (!fdiv) {
			return;
		}
		canvas = $('<canvas>');
		ctx = canvas[0].getContext('2d');
		fdiv.empty().append(canvas);
		if (!genImage(tools.getCurScramble())) {
			fdiv.html(IMAGE_UNAVAILABLE);
		}
	}

	var colre = /#[0-9a-fA-F]{3}/g;

	$(function() {
		canvas = $('<canvas>');
		if (canvas[0].getContext) {
			tools.regTool('image', TOOLS_IMAGE, execFunc);
		}
	});

	return {
		draw: genImage,
		llImage: llImage,
		pyrllImage: pyrllImage,
		face3Image: face3Image
	}
});
