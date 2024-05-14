"use strict";

(function() {
	twistyjs.qcube.registerTwisty("cube", initQCube);

	var drawPolygon = $.ctxDrawPolygon;

	/**
	 *  f: face, [ D L B U R F ]
	 *  d: which slice, in [0, size-1)
	 *  q: [  2 ']
	 */
	function doslice(f, d, q, size, posit) {
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

	var colors = [];

	function render(twisty) {
		if (!twisty.twistyScene.getCanvas()) {
			return;
		}
		colors = kernel.getProp('colcube').match(/#[0-9a-fA-F]{3}/g);
		if (twisty.style == 'q2') {
			renderTopCube(true, twisty);
		} else if (twisty.style == 'ql') {
			renderTopCube(false, twisty);
		} else {
			renderQCube(twisty);
		}
	}

	function renderTopCube(isTwoLook, twisty) {
		var size = twisty.size;
		var gap = Math.sqrt(size / 3) * 0.1;
		var offset = isTwoLook ? 0 : (gap + 1);
		var width = twisty.twistyScene.fixSize(size + 1 + gap * 3 + offset, size * 2 + gap * 3 - 1 + offset);
		var ctx = twisty.twistyScene.getCanvas()[0].getContext('2d');
		var posit = twisty.posit;
		for (var i = 0; i < size; i++) {
			var ii = size - 1 - i;
			var piece = [[0, 0, 1, 1], [i, i + 1, i + 1, i]];
			// R
			drawPolygon(ctx, colors[posit[(4 * size + 0) * size + ii]], piece, [width, size + gap * 2 + offset, gap + offset]);
			// B and L
			if (!isTwoLook) {
				drawPolygon(ctx, colors[posit[(1 * size + 0) * size + ii]], piece, [width, gap + 0, gap * 2 + 1]);
				piece = [[i, i, i + 1, i + 1], [0, 1, 1, 0]];
				drawPolygon(ctx, colors[posit[(2 * size + 0) * size + i]], piece, [width, 1 + gap * 2, gap]);
			}
			for (var j = 0; j < size; j++) { // U and F
				piece = [[i, i, i + 1, i + 1], [j, j + 1, j + 1, j]];
				drawPolygon(ctx, colors[posit[(3 * size + j) * size + i]], piece, [width, gap + offset, gap + offset]);
				if (j < 2) {
					drawPolygon(ctx, colors[posit[(5 * size + j) * size + i]], piece, [width, gap + offset, size + gap * 2 + offset]);
				}
			}
		}
		if (size > 5) {
			drawPolygon(ctx, '#fff', [[-0.1, -0.1, 0.1, 0.1], [-0.1, 0.1, 0.1, -0.1]], [width, size * 0.5 + 1 + gap * 2, size * 0.5 + gap * 2 + 1]);
		}
	}

	function renderQCube(twisty) {
		var size = twisty.size;
		var gap = Math.sqrt(size / 3) * 0.1;
		var width = twisty.twistyScene.fixSize(size + 2 + gap * 4, size * 2 + gap * 3);
		var ctx = twisty.twistyScene.getCanvas()[0].getContext('2d');
		var posit = twisty.posit;
		for (var i = 0; i < size; i++) {
			var ii = size - 1 - i;
			var piece = [[0, 0, 1, 1], [i, i + 1, i + 1, i]];
			// L and R
			if (i != 0) {
				drawPolygon(ctx, colors[posit[(1 * size + i) * size + 0]], piece, [width, gap, size + gap * 2]);
				drawPolygon(ctx, colors[posit[(4 * size + i) * size + 0]], piece, [width, size + 1 + gap * 3, size + gap * 2]);
			}
			if (i != size - 1) {
				drawPolygon(ctx, colors[posit[(1 * size + 0) * size + ii]], piece, [width, gap + 0, gap + 0]);
				drawPolygon(ctx, colors[posit[(4 * size + 0) * size + ii]], piece, [width, gap + size + 1 + gap * 2, gap]);
			}
			for (var j = 0; j < size; j++) {
				piece = [[i, i, i + 1, i + 1], [j, j + 1, j + 1, j]];
				// U and F
				drawPolygon(ctx, colors[posit[(3 * size + j) * size + i]], piece, [width, 1 + gap * 2, gap]);
				drawPolygon(ctx, colors[posit[(5 * size + j) * size + i]], piece, [width, 1 + gap * 2, size + gap * 2]);
			}
		}
		var piece2 = [[0, 0, 1, 1], [0, 2 + gap, 2 + gap, 0]];
		drawPolygon(ctx, colors[posit[(1 * size + 0) * size + 0]], piece2, [width, gap, gap + size - 1]);
		drawPolygon(ctx, colors[posit[(4 * size + 0) * size + 0]], piece2, [width, size + 1 + gap * 3, gap + size - 1]);
		if (size > 5) {
			drawPolygon(ctx, '#fff', [[-0.1, -0.1, 0.1, 0.1], [-0.1, 0.1, 0.1, -0.1]], [width, size * 0.5 + 1 + gap * 2, size * 0.5 + gap]);
			drawPolygon(ctx, '#fff', [[-0.1, -0.1, 0.1, 0.1], [-0.1, 0.1, 0.1, -0.1]], [width, size * 0.5 + 1 + gap * 2, size * 1.5 + gap * 2]);
		}
	}

	function generateCubeKeyMapping(oSl, oSr, iSi) {
		return {
			73: [1, oSr, "R", 1], //I R
			75: [1, oSr, "R", -1], //K R'
			87: [1, 1, "B", 1], //W B
			79: [1, 1, "B", -1], //O B'
			83: [1, 1, "D", 1], //S D
			76: [1, 1, "D", -1], //L D'
			68: [1, oSl, "L", 1], //D L
			69: [1, oSl, "L", -1], //E L'
			74: [1, 1, "U", 1], //J U
			70: [1, 1, "U", -1], //F U'
			72: [1, 1, "F", 1], //H F
			71: [1, 1, "F", -1], //G F'
			186: [1, iSi, "U", 1], //; y
			65: [1, iSi, "U", -1], //A y'
			85: [1, oSr + 1, "R", 1], //U r
			82: [1, oSl + 1, "L", -1], //R l'
			77: [1, oSr + 1, "R", -1], //M r'
			86: [1, oSl + 1, "L", 1], //V l
			84: [1, iSi, "L", -1], //T x
			89: [1, iSi, "R", 1], //Y x
			78: [1, iSi, "R", -1], //N x'
			66: [1, iSi, "L", 1], //B x'
			190: [2, 2, "R", 1], //. M'
			88: [2, 2, "L", -1], //X M'
			53: [2, 2, "L", 1], //5 M
			54: [2, 2, "R", -1], //6 M
			49: [2, iSi - 1, "F", -1], //1 S'
			50: [2, iSi - 1, "U", -1], //2 E
			57: [2, iSi - 1, "U", 1], //9 E'
			48: [2, iSi - 1, "F", 1], //0 S
			80: [1, iSi, "F", 1], //P z
			81: [1, iSi, "F", -1], //Q z'
			90: [1, 2, "D", 1], //Z d
			67: [1, 2, "U", -1], //C u'
			188: [1, 2, "U", 1], //, u
			191: [1, 2, "D", -1] /// d'
		}
	}

	function generateScramble(twisty) {
		var n = 32;
		var newMoves = [];
		for (var i = 0; i < n; i++) {
			var random1 = 1 + ~~(Math.random() * twisty.size / 2);
			var random2 = random1 + ~~(Math.random() * twisty.size / 2);
			var random3 = ~~(Math.random() * 6);
			var random4 = [-2, -1, 1, 2][~~(Math.random() * 4)];
			var newMove = [random1, random2, ["U", "L", "F", "R", "B", "D"][random3], random4];
			newMoves.push(newMove);
		}
		return newMoves;
	}

	function initQCube(scene, options) {
		this.size = options.dimension;
		this.style = options.style;
		this.oSl = 1;
		this.oSr = 1;
		this.iSi = this.size;
		this.cubeKeyMapping = generateCubeKeyMapping(this.oSl, this.oSr, this.iSi);
		this.twistyScene = scene;
		this.posit = [];
		this.counter = 0;
		this.lastMove = -1;
		var size = this.size;
		var cnt = 0;
		for (var i = 0; i < 6; i++) {
			for (var f = 0; f < size * size; f++) {
				this.posit[cnt++] = i;
			}
		}
		this.cntMove = function(move) {
			if (!this.isInspectionLegalMove(this, move) && move[2] != this.lastMove) {
				this.counter++;
			}
			this.lastMove = move[2];
		}

		this.render = function() {
			render(this);
		};

		this.parseScramble = function(scramble, addPreScr) {
			if (!scramble || /^\s*$/.exec(scramble)) {
				return generateScramble(this);
			} else {
				var moves = cubeutil.parseScramble(scramble, "URFDLB", addPreScr);
				scramble = [];
				for (var i = 0; i < moves.length; i++) {
					if (moves[i][1] > 0) {
						scramble.push([1, moves[i][1], "URFDLB".charAt(moves[i][0]), [1, 2, -1][moves[i][2] - 1]]);
					} else {
						scramble.push([1, 3, "URFDLB".charAt(moves[i][0]), [1, 2, -1][-moves[i][2] - 1]]);
					}
				}
				return scramble;
			}
		};

		this.isSolved = function(args) {
			if (size == 3) {
				var facelet = [];
				var s2 = size * size;
				for (var f = 0; f < 6; f++) {
					for (var j = 0; j < size; j++) {
						var y = (f == 0) ? size - 1 - j : j;
						for (var i = 0; i < size; i++) {
							var x = (f == 1 || f == 2) ? size - 1 - i : i;
							facelet[(f + 3) % 6 * s2 + j * size + i] = "DLBURF".charAt(this.posit[f * s2 + y * size + x]);
						}
					}
				}
				return cubeutil.getProgress(facelet.join(''), kernel.getProp('vrcMP', 'n'));
			}
			var cnt = 0;
			for (var i = 0; i < 6; i++) {
				var std = this.posit[cnt];
				for (var f = 0; f < size * size; f++) {
					if (this.posit[cnt++] != std) {
						return 1;
					}
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
			var move = move.slice();
			move[3] = -move[3];
			return move;
		}

		this.isInspectionLegalMove = function(twisty, move) {
			return move[0] == 1 && move[1] == size;
		}

		this.move2str = function(move) {
			var axis = move[2];
			var nlayer = move[1];
			var pow = (move[3] + 3) % 4;
			if (nlayer == this.iSi) {
				return "yxz".charAt("URFDLB".indexOf(move[2]) % 3) +
					" 2'".charAt("URF".indexOf(move[2]) == -1 ? (2 - pow) : pow);
			} else if (move[0] == 2) { //M or M'
				return '2-2' + move[2] + 'w' + " 2'".charAt(pow);
			} else {
				return (nlayer > 2 ? nlayer : '') + axis + (nlayer >= 2 ? 'w' : '') + " 2'".charAt(pow);
			}
		};

		this.doMove = function(move) {
			var face = "DLBURF".indexOf(move[2]);
			var pow = (move[3] + 3) % 4 + 1;
			for (var j = move[0]; j < move[1]; j++) {
				doslice(face, j - 1, pow, this.size, this.posit);
			}
			if (move[1] == size) {
				doslice((face + 3) % 6, 0, 4 - pow, this.size, this.posit);
			} else {
				doslice(face, move[1] - 1, pow, this.size, this.posit);
			}
			this.cntMove(move);
		};

		this.keydown = function(e) {
			if (e.altKey || e.ctrlKey) {
				return;
			}
			var keyCode = e.keyCode;
			var ret = false;
			if (keyCode == 51 || keyCode == 52 || keyCode == 55 || keyCode == 56 || keyCode == 32) {
				if (keyCode == 51) {
					this.oSl = Math.max(1, this.oSl - 1);
				} else if (keyCode == 52) {
					this.oSl = Math.min(this.oSl + 1, this.iSi - 1);
				} else if (keyCode == 55) {
					this.oSr = Math.min(this.oSr + 1, this.iSi - 1);
				} else if (keyCode == 56) {
					this.oSr = Math.max(1, this.oSr - 1);
				} else if (keyCode == 32) {
					this.oSl = this.oSr = 1;
				}
				this.cubeKeyMapping = generateCubeKeyMapping(this.oSl, this.oSr, this.iSi);
				// updateHandMarks(twisty.handMarks, iSi, oSl, oSr);
				ret = true;
			}
			if (keyCode in this.cubeKeyMapping) {
				this.twistyScene.addMoves([this.cubeKeyMapping[keyCode]]);
			}
			return ret;
		}

		this.toggleColorVisible = $.noop;
	}

})();
