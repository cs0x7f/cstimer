"use strict";

(function() {
	twistyjs.qcube.registerTwisty("mgm", initQMinx);

	var drawPolygon = $.ctxDrawPolygon;
	var Rotate = $.ctxRotate;

	var colors = [];

	var PI = Math.PI;
	var cfrac = 0.5;
	var efrac2 = (Math.sqrt(5) + 1) / 2;
	var d2x = (1 - cfrac) / 2 / Math.tan(PI / 5);
	var off1X = efrac2 * 1.05;
	var off1Y = efrac2 * 1.05;

	var off2X = off1X + Math.cos(PI * 0.1) * 3 * efrac2;
	var off2Y = off1Y + Math.sin(PI * 0.1) * 1 * efrac2;
	var cornX = [0, d2x, 0, -d2x];
	var cornY = [-1, -(1 + cfrac) / 2, -cfrac, -(1 + cfrac) / 2];
	var edgeX = [Math.cos(PI * 0.1) - d2x, d2x, 0, Math.sin(PI * 0.4) * cfrac];
	var edgeY = [-Math.sin(PI * 0.1) + (cfrac - 1) / 2, -(1 + cfrac) / 2, -cfrac, -Math.cos(PI * 0.4) * cfrac];
	var centX = [Math.sin(PI * 0.0) * cfrac, Math.sin(PI * 0.4) * cfrac, Math.sin(PI * 0.8) * cfrac, Math.sin(PI * 1.2) * cfrac, Math.sin(PI * 1.6) * cfrac];
	var centY = [-Math.cos(PI * 0.0) * cfrac, -Math.cos(PI * 0.4) * cfrac, -Math.cos(PI * 0.8) * cfrac, -Math.cos(PI * 1.2) * cfrac, -Math.cos(PI * 1.6) * cfrac];

	function faceTrans(width, theta) {
		var hc = Math.tan(Math.PI * 0.3) / Math.tan(Math.PI * 0.4);
		return [
			width * Math.cos(theta + 0.5 * PI), -width * Math.sin(theta + 0.5 * PI) * hc, width * (off1X + Math.cos(theta) * efrac2 / 2 * (1 + hc)),
			width * Math.sin(theta + 0.5 * PI), width * hc * Math.cos(theta + 0.5 * PI), width * (off1Y + Math.sin(theta) * efrac2 / 2 * (1 + hc))
		];
	}

	function renderQMinx(twisty) {
		if (!twisty.twistyScene.getCanvas()) {
			return;
		}
		var state = twisty.state;
		var ctx = twisty.twistyScene.getCanvas()[0].getContext('2d');
		colors = kernel.getProp('colmgm').match(/#[0-9a-fA-F]{3}/g);
		var width = twisty.twistyScene.fixSize(off1X * 2, off1Y * 2);
		drawFace(state, 22, [width, off1X + 0 * efrac2, off1Y + 0 * efrac2], PI * 0.6, ctx);
		drawFace(state, 0, faceTrans(width, PI * 1.5), PI * 0, ctx);
		drawFace(state, 11, faceTrans(width, PI * 1.9), PI * 0, ctx);
		drawFace(state, 66, faceTrans(width, PI * 0.3), PI * 0, ctx);
		drawFace(state, 77, faceTrans(width, PI * 0.7), -PI * 0.4, ctx);
		drawFace(state, 33, faceTrans(width, PI * 1.1), -PI * 0.8, ctx);
	}

	function drawFace(state, baseIdx, trans, rot, ctx) {
		for (var i = 0; i < 5; i++) {
			drawPolygon(ctx, colors[state[baseIdx + i]], Rotate([cornX, cornY], PI * 2 / 5 * i + rot), trans);
			drawPolygon(ctx, colors[state[baseIdx + i + 5]], Rotate([edgeX, edgeY], PI * 2 / 5 * i + rot), trans);
		}
		drawPolygon(ctx, colors[state[baseIdx + 10]], Rotate([centX, centY], rot), trans);
	}

	var U = 0, R = 1, F = 2, L = 3, BL = 4, BR = 5, DR = 6, DL = 7, DBL = 8, B = 9, DBR = 10, D = 11;

	function generateCubeKeyMapping() {
		var mU = 0, mF = 1, mR = 2, mBr = 3, mBl = 4, mL = 5, mUi = 6, mFi = 7, mRi = 8, mBri = 9, mBli = 10, mLi = 11;
		return {
			73: [mR, 1, 1, 3], //I R
			75: [mR, -1, 1, 3], //K R'
			87: [mBr, 1, 1, 3], //W Br
			79: [mBr, -1, 1, 3], //O Br'
			83: [mBli, 1, 1, 3], //S Dr
			76: [mBli, -1, 1, 3], //L Dr'
			67: [mBri, 1, 1, 3], //C Dl
			188: [mBri, -1, 1, 3], //, Dl'
			68: [mL, 1, 1, 3], //D L
			69: [mL, -1, 1, 3], //E L'
			74: [mU, 1, 1, 3], //J U
			70: [mU, -1, 1, 3], //F U'
			72: [mF, 1, 1, 3], //H F
			71: [mF, -1, 1, 3], //G F'
			186: [mU, 1, -3, 3], //; y
			65: [mU, -1, -3, 3], //A y'
			85: [mL, -1, -3, 1], //U r
			82: [mR, 1, -3, 1], //R l'
			77: [mL, 1, -3, 1], //M r'
			86: [mR, -1, -3, 1], //V l
			84: [mL, -1, -3, 3], //T x
			89: [mR, 1, -3, 3], //Y x
			78: [mR, -1, -3, 3], //N x'
			66: [mL, 1, -3, 3], //B x'
			80: [mF, 1, -3, 3], //P z
			81: [mF, -1, -3, 3] //Q z'
		}
	}

	function generateScramble(twisty) {
		return [];
	}

	function initQMinx(scene, options) {
		this.style = options.style;
		this.cubeKeyMapping = generateCubeKeyMapping();
		this.twistyScene = scene;
		this.state = [];
		this.counter = 0;
		this.lastMove = -1;
		var cnt = 0;
		for (var i = 0; i < 12; i++) {
			for (var f = 0; f < 11; f++) {
				this.state[cnt++] = i;
			}
		}

		this.cntMove = function(move) {
			if (!this.isInspectionLegalMove(this, move) && move[0] != this.lastMove) {
				this.counter++;
			}
			this.lastMove = move[0];
		}

		this.render = function() {
			renderQMinx(this);
		};

		this.parseScramble = function(scramble, addPreScr) {
			if (!scramble || /^\s*$/.exec(scramble)) {
				return generateScramble(this);
			} else {
				var ret = [];
				if (/^(\s*([+-]{2}\s*)+U'?\s*\n)*$/.exec(scramble)) {
					scramble = tools.carrot2poch(scramble);
				}
				scramble.replace(/(?:^|\s*)(?:([DLR])(\+\+?|--?)|(U|F|D?B?R|D?B?L|D|B)(\d?)('?)|\[([ufrl])('?)\])(?:$|\s*)/g, function(m, p1, p2, p3, p4, p5, p6, p7) {
					if (p1) {
						ret.push(['D?L??R'.indexOf(p1), (p2[0] == '+' ? -1 : 1) * p2.length, -3, 1]);
					} else if (p3) {
						ret.push([["U", "F", "R", "BR", "BL", "L", "D", "B", "DBL", "DL", "DR", "DBR"].indexOf(p3), (p5 ? -1 : 1) * (~~p4 || 1), 1, 3]);
					} else {
						ret.push(['ufr??l'.indexOf(p6), p7 ? -1 : 1, -3, 3]);
					}
				});
				if (ret.length == 0) {
					return generateScramble(this);
				}
				return ret;
			}
		};

		this.isSolved = function(args) {
			var cnt = 0;
			for (var i = 0; i < 12; i++) {
				var std = this.state[cnt];
				for (var f = 0; f < 11; f++) {
					if (this.state[cnt++] != std) {
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
			move = move.slice();
			move[1] = -move[1];
			return move;
		}

		this.isInspectionLegalMove = function(twisty, move) {
			return Math.abs(move[2]) >= 3 && Math.abs(move[3]) >= 3;
		}

		this.move2str = function(move) {
			var axis = move[0];
			var pow = move[1];
			var nlayer = move[3] - move[2];
			if (nlayer == 6) {
				return "[" + "ufr??l??????".charAt(axis) + (pow > 0 ? "" : "'") + "]";
			} else if (nlayer == 4) {
				return "D?L??R??????".charAt(axis) + (pow > 0 ? "-" : "+");
			} else if (nlayer == 2) {
				return ["U", "F", "R", "BR", "BL", "L", "D", "B", "DBL", "DL", "DR", "DBR"][axis] + (pow > 0 ? "" : "'");
			}
		};

		this.doMove = function(move) {
			//var mU = 0, mF = 1, mR = 2, mBr = 3, mBl = 4, mL = 5, mUi = 6, mFi = 7, mRi = 8, mBri = 9, mBli = 10, mLi = 11;
			var axis2move = [U, F, R, BR, BL, L, D, B, DBL, DL, DR, DBR];
			if (move[2] == -3 && move[3] == 1) { //R++/D++
				mathlib.minx.doMove(this.state, axis2move[move[0]], move[1], 2);
			} else if (move[2] == -3 && move[3] == 3) {
				mathlib.minx.doMove(this.state, axis2move[move[0]], move[1], 1);
			} else {
				mathlib.minx.doMove(this.state, axis2move[move[0]], move[1], 0);
			}
			this.cntMove(move);
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

