"use strict";

var image = execMain(function() {

	var canvas, ctx;
	var hsq3 = Math.sqrt(3) / 2;
	var PI = Math.PI;

	var Rotate = $.ctxRotate;
	var Transform = $.ctxTransform;
	var drawPolygon = $.ctxDrawPolygon;

	var mgmImage = (function() {
		var moveU = [4, 0, 1, 2, 3, 9, 5, 6, 7, 8, 10, 11, 12, 13, 58, 59, 16, 17, 18, 63, 20, 21, 22, 23, 24, 14, 15, 27, 28, 29, 19, 31, 32, 33, 34, 35, 25, 26, 38, 39, 40, 30, 42, 43, 44, 45, 46, 36, 37, 49, 50, 51, 41, 53, 54, 55, 56, 57, 47, 48, 60, 61, 62, 52, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131];
		var moveR = [81, 77, 78, 3, 4, 86, 82, 83, 8, 85, 87, 122, 123, 124, 125, 121, 127, 128, 129, 130, 126, 131, 89, 90, 24, 25, 88, 94, 95, 29, 97, 93, 98, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 26, 22, 23, 48, 30, 31, 27, 28, 53, 32, 69, 70, 66, 67, 68, 74, 75, 71, 72, 73, 76, 101, 102, 103, 99, 100, 106, 107, 108, 104, 105, 109, 46, 47, 79, 80, 45, 51, 52, 84, 49, 50, 54, 0, 1, 2, 91, 92, 5, 6, 7, 96, 9, 10, 15, 11, 12, 13, 14, 20, 16, 17, 18, 19, 21, 113, 114, 110, 111, 112, 118, 119, 115, 116, 117, 120, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65];
		var moveD = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 33, 34, 35, 14, 15, 38, 39, 40, 19, 42, 43, 44, 45, 46, 25, 26, 49, 50, 51, 30, 53, 54, 55, 56, 57, 36, 37, 60, 61, 62, 41, 64, 65, 11, 12, 13, 47, 48, 16, 17, 18, 52, 20, 21, 22, 23, 24, 58, 59, 27, 28, 29, 63, 31, 32, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 124, 125, 121, 122, 123, 129, 130, 126, 127, 128, 131];
		var moveMaps = [moveU, moveR, moveD];

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
		var edgeX = [Math.cos(PI * 0.1) - d2x, d2x, 0, Math.sin(PI * 0.4) * cfrac];
		var edgeY = [-Math.sin(PI * 0.1) + (cfrac - 1) / 2, -(1 + cfrac) / 2, -cfrac, -Math.cos(PI * 0.4) * cfrac];
		var centX = [Math.sin(PI * 0.0) * cfrac, Math.sin(PI * 0.4) * cfrac, Math.sin(PI * 0.8) * cfrac, Math.sin(PI * 1.2) * cfrac, Math.sin(PI * 1.6) * cfrac];
		var centY = [-Math.cos(PI * 0.0) * cfrac, -Math.cos(PI * 0.4) * cfrac, -Math.cos(PI * 0.8) * cfrac, -Math.cos(PI * 1.2) * cfrac, -Math.cos(PI * 1.6) * cfrac];
		var colors = ['#fff', '#d00', '#060', '#81f', '#fc0', '#00b', '#ffb', '#8df', '#f83', '#7e0', '#f9f', '#999'];

		function drawFace(state, baseIdx, trans, rot) {
			for (var i = 0; i < 5; i++) {
				drawPolygon(ctx, colors[state[baseIdx + i]], Rotate([cornX, cornY], PI * 2 / 5 * i + rot), trans);
				drawPolygon(ctx, colors[state[baseIdx + i + 5]], Rotate([edgeX, edgeY], PI * 2 / 5 * i + rot), trans);
			}
			drawPolygon(ctx, colors[state[baseIdx + 10]], Rotate([centX, centY], rot), trans);
		}

		function doMove(state, axis, inv) {
			var moveMap = moveMaps[axis];
			var oldState = state.slice();
			if (inv) {
				for (var i = 0; i < 132; i++) {
					state[moveMap[i]] = oldState[i];
				}
			} else {
				for (var i = 0; i < 132; i++) {
					state[i] = oldState[moveMap[i]];
				}
			}
		}

		var movere = /[RD][+-]{2}|U'?/
		return function(moveseq) {
			colors = kernel.getProp('colmgm').match(colre);
			var state = [];
			for (var i = 0; i < 12; i++) {
				for (var j = 0; j < 11; j++) {
					state[i * 11 + j] = i;
				}
			}
			var moves = moveseq.split(/\s+/);
			for (var i = 0; i < moves.length; i++) {
				var m = movere.exec(moves[i]);
				if (!m) {
					continue;
				}
				var axis = "URD".indexOf(m[0][0]);
				var inv = /[-']/.exec(m[0][1]);
				doMove(state, axis, inv);
			}
			var imgSize = kernel.getProp('imgSize') / 7.5;
			canvas.width(7 * imgSize + 'em');
			canvas.height(3.5 * imgSize + 'em');
			canvas.attr('width', 9.8 * width);
			canvas.attr('height', 4.9 * width);
			drawFace(state, 0, [width, off1X + 0 * efrac2, off1Y + 0 * efrac2], PI * 0.0);
			drawFace(state, 11, [width, off1X + Math.cos(PI * 0.1) * efrac2, off1Y + Math.sin(PI * 0.1) * efrac2], PI * 0.2);
			drawFace(state, 22, [width, off1X + Math.cos(PI * 0.5) * efrac2, off1Y + Math.sin(PI * 0.5) * efrac2], PI * 0.6);
			drawFace(state, 33, [width, off1X + Math.cos(PI * 0.9) * efrac2, off1Y + Math.sin(PI * 0.9) * efrac2], PI * 1.0);
			drawFace(state, 44, [width, off1X + Math.cos(PI * 1.3) * efrac2, off1Y + Math.sin(PI * 1.3) * efrac2], PI * 1.4);
			drawFace(state, 55, [width, off1X + Math.cos(PI * 1.7) * efrac2, off1Y + Math.sin(PI * 1.7) * efrac2], PI * 1.8);
			drawFace(state, 66, [width, off2X + Math.cos(PI * 0.7) * efrac2, off2Y + Math.sin(PI * 0.7) * efrac2], PI * 0.0);
			drawFace(state, 77, [width, off2X + Math.cos(PI * 0.3) * efrac2, off2Y + Math.sin(PI * 0.3) * efrac2], PI * 1.6);
			drawFace(state, 88, [width, off2X + Math.cos(PI * 1.9) * efrac2, off2Y + Math.sin(PI * 1.9) * efrac2], PI * 1.2);
			drawFace(state, 99, [width, off2X + Math.cos(PI * 1.5) * efrac2, off2Y + Math.sin(PI * 1.5) * efrac2], PI * 0.8);
			drawFace(state, 110, [width, off2X + Math.cos(PI * 1.1) * efrac2, off2Y + Math.sin(PI * 1.1) * efrac2], PI * 0.4);
			drawFace(state, 121, [width, off2X + 0 * efrac2, off2Y + 0 * efrac2], PI * 1.0);
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
			ctx.fillStyle = '#ff0';
			ctx.strokeStyle = '#f00';
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

		return function(moveseq) {
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
				drawClock(['#37b', '#5cf'][~~(i / 9)], [width, x[~~(i / 3)], y[i % 3]], clks[i]);
			}

			var y = [20, 40];
			var x = [20, 40, 85, 105];
			for (var i = 0; i < 8; i++) {
				drawButton(['#850', '#ff0'][buttons[i]], [width, x[~~(i / 2)], y[i % 2]]);
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

		var movere = /^\s*\(\s*(-?\d+),\s*(-?\d+)\s*\)\s*$/

		return function(moveseq) {
			var cols = kernel.getProp('colsq1').match(colre);
			colors = {
				'U': cols[0],
				'R': cols[1],
				'F': cols[2],
				'D': cols[3],
				'L': cols[4],
				'B': cols[5]
			};
			posit = [0, 0, 1, 2, 2, 3, 4, 4, 5, 6, 6, 7, 8, 8, 9, 10, 10, 11, 12, 12, 13, 14, 14, 15];
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

			var trans = [width, 2.7, 2.7];
			//draw top
			for (var i = 0; i < 12; i++) {
				if (posit[i] % 2 == 0) { //corner piece
					if (posit[i] != posit[(i + 1) % 12]) {
						continue;
					}
					drawPolygon(ctx, colors[ccol[posit[i]]],
						Rotate(cpl, (i - 3) * PI / 6), trans);
					drawPolygon(ctx, colors[ccol[posit[i] + 1]],
						Rotate(cpr, (i - 3) * PI / 6), trans);
					drawPolygon(ctx, colors[udcol[posit[i] >= 8 ? 1 : 0]],
						Rotate(cps, (i - 3) * PI / 6), trans);
				} else { //edge piece
					drawPolygon(ctx, colors[ecol[posit[i]]],
						Rotate(ep, (i - 5) * PI / 6), trans);
					drawPolygon(ctx, colors[udcol[posit[i] >= 8 ? 1 : 0]],
						Rotate(eps, (i - 5) * PI / 6), trans);
				}
			}

			var trans = [width, 2.7 + 5.4, 2.7];
			//draw bottom
			for (var i = 12; i < 24; i++) {
				if (posit[i] % 2 == 0) { //corner piece
					if (posit[i] != posit[(i + 1) % 12 + 12]) {
						continue;
					}
					drawPolygon(ctx, colors[ccol[posit[i]]],
						Rotate(cpl, -i * PI / 6), trans);
					drawPolygon(ctx, colors[ccol[posit[i] + 1]],
						Rotate(cpr, -i * PI / 6), trans);
					drawPolygon(ctx, colors[udcol[posit[i] >= 8 ? 1 : 0]],
						Rotate(cps, -i * PI / 6), trans);
				} else { //edge piece
					drawPolygon(ctx, colors[ecol[posit[i]]],
						Rotate(ep, (-1 - i) * PI / 6), trans);
					drawPolygon(ctx, colors[udcol[posit[i] >= 8 ? 1 : 0]],
						Rotate(eps, (-1 - i) * PI / 6), trans);
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

	/*

face:   
1 0 2
  3

posit: 
2 8 3 7 1    0    2 8 3 7 1
  4 6 5    5 6 4    4 6 5  
    0    1 7 3 8 2    0    

         2 8 3 7 1
           4 6 5  
             0    

     */

	var pyraImage = (function() {
		var width = 45;
		var posit = [];
		var colors = ['#0f0', '#f00', '#00f', '#ff0'];
		var faceoffx = [3.5, 1.5, 5.5, 3.5];
		var faceoffy = [0, 3 * hsq3, 3 * hsq3, 6.5 * hsq3];
		var g1 = [0, 6, 5, 4];
		var g2 = [1, 7, 3, 5];
		var g3 = [2, 8, 4, 3];
		var flist = [
			[0, 1, 2],
			[2, 3, 0],
			[1, 0, 3],
			[3, 2, 1]
		];
		var arrx = [-0.5, 0.5, 0];
		var arry1 = [hsq3, hsq3, 0];
		var arry2 = [-hsq3, -hsq3, 0];

		function doMove(axis, power) {
			var len = axis >= 4 ? 1 : 4;
			var f = flist[axis % 4];
			for (var i = 0; i < len; i++) {
				for (var p = 0; p < power; p++) {
					mathlib.circle(posit, f[0] * 9 + g1[i], f[1] * 9 + g2[i], f[2] * 9 + g3[i]);
				}
			}
		}

		function face(f) {
			var inv = f != 0;
			var arroffx = [0, -1, 1, 0, 0.5, -0.5, 0, -0.5, 0.5];
			var arroffy = [0, 2, 2, 2, 1, 1, 2, 3, 3];

			for (var i = 0; i < arroffy.length; i++) {
				arroffy[i] *= inv ? -hsq3 : hsq3;
				arroffx[i] *= inv ? -1 : 1;
			}
			for (var idx = 0; idx < 9; idx++) {
				drawPolygon(ctx, colors[posit[f * 9 + idx]], [arrx, (idx >= 6 != inv) ? arry2 : arry1], [width, faceoffx[f] + arroffx[idx], faceoffy[f] + arroffy[idx]]);
			}
		}

		return function(moveseq) {
			colors = kernel.getProp('colpyr').match(colre);
			var cnt = 0;
			for (var i = 0; i < 4; i++) {
				for (var f = 0; f < 9; f++) {
					posit[cnt++] = i;
				}
			}
			var scramble = kernel.parseScramble(moveseq, 'URLB');
			for (var i = 0; i < scramble.length; i++) {
				doMove(scramble[i][0] + (scramble[i][1] == 2 ? 4 : 0), scramble[i][2] == 1 ? 1 : 2);
			}
			var imgSize = kernel.getProp('imgSize') / 10;
			canvas.width(7 * imgSize + 'em');
			canvas.height(6.5 * hsq3 * imgSize + 'em');

			canvas.attr('width', 7 * width);
			canvas.attr('height', 6.5 * hsq3 * width);

			for (var i = 0; i < 4; i++) {
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
					], [width, offx, offy]);
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

		return function(size, moveseq) {
			colors = kernel.getProp('colcube').match(colre);
			var cnt = 0;
			for (var i = 0; i < 6; i++) {
				for (var f = 0; f < size * size; f++) {
					posit[cnt++] = i;
				}
			}
			var moves = kernel.parseScramble(moveseq, "DLBURF");
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

			var imgSize = kernel.getProp('imgSize') / 50;
			canvas.width(39 * imgSize + 'em');
			canvas.height(29 * imgSize + 'em');

			canvas.attr('width', 39 * size / 9 * width + 1);
			canvas.attr('height', 29 * size / 9 * width + 1);

			for (var i = 0; i < 6; i++) {
				face(i, size);
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
			// console.log(moves.findall)
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
				nnnImage(size, scramble[1]);
				return true;
			}
		}
		if (type == "cubennn") {
			nnnImage(scramble[2], scramble[1]);
			return true;
		}
		if (type == "pyr") {
			pyraImage(scramble[1]);
			return true;
		}
		if (type == "skb") {
			skewbImage(scramble[1]);
			return true;
		}
		if (type == "sq1") {
			sq1Image(scramble[1]);
			return true;
		}
		if (type == "clk") {
			clkImage(scramble[1]);
			return true;
		}
		if (type == "mgm") {
			mgmImage(scramble[1]);
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
		draw: genImage
	}
});