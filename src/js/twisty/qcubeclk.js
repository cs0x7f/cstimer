"use strict";

(function() {
	twistyjs.qcube.registerTwisty("clk", initQClock);

	var drawPolygon = $.ctxDrawPolygon;
	var Transform = $.ctxTransform;
	var Rotate = $.ctxRotate;
	var colors = [];

	function drawClock(ctx, color, trans, time) {
		var points = Transform(Rotate([
			[1, 1, 0, -1, -1, -1, 1, 0],
			[0, -1, -8, -1, 0, 1, 1, 0]
		], time / 6 * Math.PI), trans);
		var x = points[0];
		var y = points[1];
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.arc(x[7], y[7], trans[0] * 9, 0, 2 * Math.PI);
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

	function drawButton(ctx, color, trans) {
		if (!ctx) {
			return;
		}
		var points = Transform([[0], [0]], trans);
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.strokeStyle = '#000';
		ctx.arc(points[0][0], points[1][0], trans[0] * 3, 0, 2 * Math.PI);
		ctx.fill();
		ctx.stroke();
	}

	function renderQClock(twisty) {
		if (!twisty.twistyScene.getCanvas()) {
			return;
		}
		var canvas = twisty.twistyScene.getCanvas();
		var ctx = canvas[0].getContext('2d');
		var clks = twisty.state.slice(0, 18);
		var buttons = twisty.state.slice(18, 22);
		var flip = twisty.state[22];

		buttons = [buttons[1], buttons[0], buttons[3], buttons[2], 1 - buttons[0], 1 - buttons[1], 1 - buttons[2], 1 - buttons[3]];

		var width = twisty.twistyScene.fixSize(60, 60);
		ctx.lineWidth = width * 0.3;
		colors = kernel.getProp('colclk').match(/#[0-9a-fA-F]{3}/g);
		var y = [10, 30, 50];
		var x = [10, 30, 50, 75, 95, 115];
		for (var i = 0; i < 9; i++) {
			var ii = (i + flip * 9) % 18;
			drawClock(ctx, [colors[1], colors[2]][~~(ii / 9)], [width, x[i % 3], y[~~(i / 3)]], clks[ii]);
		}

		y = [20, 40];
		x = [20, 40, 85, 105];
		for (var i = 0; i < 4; i++) {
			var ii = (i + flip * 4) % 8;
			drawButton(ctx, colors[3 + buttons[ii]], [width, x[i % 2], y[~~(i / 2)]]);
		}
	};

	var mUR = 0, mUL = 1, mDR = 2, mDL = 3,
		mbUR = 4, mbUL = 5, mbDR = 6, mbDL = 7,
		mY = 8, mF = 10, mB = 11;

	var buttonAffects = [
		[1, 2, 4, 5, 9],
		[0, 1, 3, 4, 11],
		[4, 5, 7, 8, 15],
		[3, 4, 6, 7, 17]
	];

	var faceYMap = [11, 10, 9, 14, 13, 12, 17, 16, 15, 2, 1, 0, 5, 4, 3, 8, 7, 6];

	function generateCubeKeyMapping() {
		return {
			74: [mF, 1], //J u+1
			75: [mF, 2], //K u+2
			76: [mF, 4], //L u+4
			85: [mF, -1], //U u-1
			73: [mF, -2], //I u-2
			79: [mF, -4], //O u-4
			186: [mY, 6], //; y
			32: [mY, 6], //space y
			81: [mbUL, 6], //Q
			87: [mbUR, 6], //W
			65: [mbDL, 6], //A
			83: [mbDR, 6], //S
		}
	}

	function initQClock(scene, options) {
		this.style = options.style;
		this.cubeKeyMapping = generateCubeKeyMapping();
		this.twistyScene = scene;
		this.state = [
			0, 0, 0, 0, 0, 0, 0, 0, 0, //front
			0, 0, 0, 0, 0, 0, 0, 0, 0, //back
			0, 0, 0, 0, //button
			0 //orientation
		];
		this.counter = 0;
		this.lastMove = -1;

		this.cntMove = function(move) {
			if (!this.isInspectionLegalMove(this, move) && move[0] != this.lastMove) {
				this.counter++;
			}
			this.lastMove = move[0];
		}

		this.render = function() {
			renderQClock(this);
		};

		this.parseScramble = function(scramble) {
			if (!scramble || /^\s*$/.exec(scramble)) {
				return [];
			} else {
				var clkre = /^(([URDL]{1,2}|ALL)(\d+)?([+-])?|y2)$/;
				var clkmre = /^m(b?[UD][RL]|[YFB])(-?\d+)$/;
				var button = [1, 1, 1, 1];
				var finalButton = [1, 1, 1, 1];
				var moves = scramble.split(/\s/);
				var isFlip = 1;
				scramble = [[mY, 6]];
				var isRecons = false;
				for (var i = 0; i < moves.length; i++) {
					var move = moves[i];
					var m = clkmre.exec(move);
					if (m) {
						isRecons = true;
						scramble.push([['UR', 'UL', 'DR', 'DL', 'bUR', 'bUL', 'bDR', 'bDL', 'Y', '~', 'F', 'B'].indexOf(m[1]), ~~m[2]]);
						continue;
					}
					m = clkre.exec(move);
					if (!m) {
						return [];
					}
					if (!m[3]) {
						switch (m[1]) {
							case 'y2':
								scramble.push([mY, 6]);
								button = [1 - button[1], 1 - button[0], 1 - button[3], 1 - button[2]];
								isFlip = 1 - isFlip;
								break;
							case 'UR':
							case 'UL':
							case 'DR':
							case 'DL':
								finalButton['URULDRDL'.indexOf(m[1]) >> 1] = 0;
								break;
						}
						continue;
					}
					var pow = ~~m[3] * (m[4] == '-' ? -1 : 1);
					if (pow == 0) {
						continue;
					}
					var curButton = {
						'U': [0, 0, 1, 1],
						'R': [0, 1, 0, 1],
						'D': [1, 1, 0, 0],
						'L': [1, 0, 1, 0],
						'UR': [0, 1, 1, 1],
						'UL': [1, 0, 1, 1],
						'DR': [1, 1, 0, 1],
						'DL': [1, 1, 1, 0],
						'ALL': [0, 0, 0, 0],
					}[m[2]];
					var axis = 0;
					for (var j = 0; j < 4; j++) {
						if (button[j] != curButton[j]) {
							scramble.push([j + mbUR, 6]);
							button[j] = curButton[j];
						}
						if (!button[j]) {
							axis = j;
						}
					}
					scramble.push([axis + mUR, pow]);
				}
				if (isRecons) {
					scramble.shift();
					return scramble;
				}
				if (isFlip) {
					scramble.push([mY, 6]);
					button = [1 - button[1], 1 - button[0], 1 - button[3], 1 - button[2]];
				}
				for (var j = 0; j < 4; j++) {
					if (button[j] != finalButton[j]) {
						scramble.push([j + mbUR, 6]);
					}
				}
				return scramble;
			}
		};

		this.isSolved = function(args) {
			for (var i = 0; i < 18; i++) {
				if (this.state[i] % 12 != 0) {
					return 1;
				}
			}
			return 0;
		}

		this.moveCnt = function(clr) {
			if (clr) {
				this.counter = 0;
				this.lastMove = -1;
			}
			return this.counter;
		}

		this.moveInv = function(move) {
			move = move.slice();
			move[1] = -move[1];
			return move;
		}

		this.isInspectionLegalMove = function(twisty, move) {
			return move[0] == mY || move[0] >= mbUR && move[0] <= mbDL;
		}

		this.move2str = function(move) {
			var axis = ['mUR', 'mUL', 'mDR', 'mDL', 'mbUR', 'mbUL', 'mbDR', 'mbDL', 'mY', 'mY', 'mF', 'mB'][move[0]];
			return axis + move[1];
		};

		this.doMove = function(move) {
			var axis = move[0];
			if (axis == mY) {
				this.state[22] ^= 1;
				return;
			}
			axis ^= this.state[22];
			if (axis >= mbUR && axis <= mbDL) { //button move
				this.state[18 + axis - mbUR] ^= 1;
				return;
			}
			var face = this.state[18 + axis];
			if (axis >= mF) { // specific face
				face = axis & 1;
			}
			var affect = [];
			for (var i = 0; i < 4; i++) {
				if (this.state[18 + i] != face) {
					continue;
				}
				for (var j = 0; j < buttonAffects[i].length; j++) {
					affect[buttonAffects[i][j]] = 1;
				}
			}
			if (face) {
				var tmp = [];
				for (var i = 0; i < affect.length; i++) {
					if (affect[i]) {
						tmp[faceYMap[i]] = 1;
					}
				}
				affect = tmp;
			}
			for (var i = 0; i < 18; i++) {
				var pow = (i < 9 ^ this.state[22]) ? move[1] : -move[1];
				if (affect[i]) {
					this.state[i] += pow;
				}
			}
		};

		this.keydown = function(e) {
			if (e.altKey || e.ctrlKey) {
				return;
			}
			var keyCode = e.keyCode;
			if (keyCode in this.cubeKeyMapping) {
				this.twistyScene.addMoves([this.cubeKeyMapping[keyCode]]);
			}
			return false;
		}

		this.toggleColorVisible = $.noop;
	}

})();
