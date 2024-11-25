(function() {
	twistyjs.registerTwisty("clk", createCubeTwisty);

	function axify(v1, v2, v3) {
		var ax = new THREE.Matrix4();
		ax.set(
			v1.x, v2.x, v3.x, 0,
			v1.y, v2.y, v3.y, 0,
			v1.z, v2.z, v3.z, 0,
			0, 0, 0, 1
		);
		return ax;
	}

	var amp = 1.2;

	var wg = 0.1;

	var TAU = Math.TAU;
	var sin = function(val) {
		return Math.sin(val * TAU);
	}
	var cos = function(val) {
		return Math.cos(val * TAU);
	}
	var rsqr5 = 1 / Math.sqrt(5);

	var normU = new THREE.Vector3(0, 1, 0);
	var normUi = new THREE.Vector3(0, -1, 0);

	var PI = Math.PI;

	// // Cube Constants
	var numSides = 2;

	var marker = [
		[cos(5 / 24), sin(5 / 24)],
		[cos(6 / 24), sin(6 / 24)],
		[cos(7 / 24), sin(7 / 24)],
		[0, 0],
	];

	var point0 = [
		[cos(1 / 12), sin(1 / 12)],
		[cos(5 / 12), sin(5 / 12)],
		[cos(9 / 12), sin(9 / 12)]
	];

	var point1 = [
		[cos(1 / 12 + 0 / 9), sin(1 / 12 + 0 / 9)],
		[cos(1 / 12 + 1 / 9), sin(1 / 12 + 1 / 9)],
		[cos(1 / 12 + 2 / 9), sin(1 / 12 + 2 / 9)],
		[cos(1 / 12 + 3 / 9), sin(1 / 12 + 3 / 9)]
	];

	var point2 = [
		[cos(1 / 12 + 0 / 9), sin(1 / 12 + 0 / 9)],
		[cos(1 / 12 + 1.45 / 9), 4.0],
		[cos(1 / 12 + 1.55 / 9), 4.0],
		[cos(1 / 12 + 3 / 9), sin(1 / 12 + 3 / 9)]
	];

	var point = [point0, point1, point1, point2];
	var button = [point0, point1, point1, point1];

	var xx = new THREE.Vector3(1, 0, 0);
	var yy = new THREE.Vector3(0, 1, 0);
	var zz = new THREE.Vector3(0, 0, 1);
	var xxi = new THREE.Vector3(-1, 0, 0);
	var yyi = new THREE.Vector3(0, -1, 0);
	var zzi = new THREE.Vector3(0, 0, -1);

	var yz = new THREE.Vector3(0, cos(1 / 8), sin(1 / 8));
	var zyi = new THREE.Vector3(0, -cos(3 / 8), -sin(3 / 8));
	var zy = new THREE.Vector3(0, cos(3 / 8), sin(3 / 8));
	var yzi = new THREE.Vector3(0, -cos(1 / 8), -sin(1 / 8));

	var side_index = {
		"U": 0,
		"D": 1
	};
	var index_side = ["U", "D"];

	var sidesNorm = {
		"U": yy,
		"D": yyi
	};
	var sidesUV = [
		axify(xx, zyi, yz),
		axify(xxi, zyi, yzi)
	];

	var mUR = 0, mUL = 1, mDR = 2, mDL = 3,
		mbUR = 4, mbUL = 5, mbDR = 6, mbDL = 7,
		mY = 8, mF = 10, mB = 11;

	var buttonAffects = [
		[1, 2, 4, 5, 9],
		[0, 1, 3, 4, 11],
		[4, 5, 7, 8, 15],
		[3, 4, 6, 7, 17]
	];

	var faceYMap = [
		11, 10, 9, 14, 13, 12, 17, 16, 15, 2, 1, 0, 5, 4, 3, 8, 7, 6
	];

	function matrixVector3Dot(m, v) {
		return (m.n14 * v.x + m.n24 * v.y + m.n34 * v.z) / amp;
	}

	function createCubeTwisty(twistyScene, twistyParameters) {

		// console.log("Creating clk twisty.");

		// Cube Variables
		var cubeObject = new THREE.Object3D();
		var cubePieces = [];

		//Defaults
		var cubeOptions = {
			stickerBorder: true,
			stickerWidth: 1.8,
			doubleSided: true,
			opacity: 1,
			dimension: 3,
			faceColors: [],
			scale: 1
		};

		// Passed Parameters
		for (var option in cubeOptions) {
			if (option in twistyParameters) {
				cubeOptions[option] = twistyParameters[option];
			}
		}

		// Cube Materials
		var materials = [];
		var borderMaterial = new THREE.MeshBasicMaterial({
			color: 0x000000,
			wireframe: true,
			wireframeLinewidth: 1,
			opacity: cubeOptions.opacity
		});
		for (var i = 0; i < numSides + 3; i++) {
			materials.push(new THREE.MeshBasicMaterial({
				color: cubeOptions.faceColors[i],
				opacity: cubeOptions.opacity
			}));
		}

		var fixedPieces = [];

		for (var i = 0; i < numSides; i++) {
			for (var xy = 0; xy < 9; xy++) {
				var x = xy % 3 - 1;
				var y = ~~(xy / 3) - 1;

				var facePieces = [];
				cubePieces.push(facePieces);
				var meshes = [materials[i]];
				if (cubeOptions.stickerBorder) {
					meshes.push(borderMaterial);
				}

				for (var theta = 0; theta < 12; theta++) {
					var curf = [];
					for (var k = 0; k < marker.length; k++) {
						curf[k] = [marker[k][0] * amp, marker[k][1] * amp];
					}
					var sticker = new THREE.Object3D();
					var stickerInterior = new THREE.Mesh(new THREE.Ploy(curf), meshes);
					stickerInterior.doubleSided = cubeOptions.doubleSided;
					sticker.addChild(stickerInterior);

					var transformationMatrix = sidesUV[i].clone().multiplySelf(
						new THREE.Matrix4().setTranslation(x * amp * (2 + wg), -y * amp * (2 + wg), 0.9 * amp)
					).multiplySelf(
						new THREE.Matrix4().setRotationAxis(zz, Math.TAU / 12 * theta)
					);

					sticker.matrix.copy(transformationMatrix);
					sticker.matrixAutoUpdate = false;
					sticker.update();

					fixedPieces.push([transformationMatrix, sticker]);
					cubeObject.addChild(sticker);
				}

				meshes = [materials[2]];
				if (cubeOptions.stickerBorder) {
					meshes.push(borderMaterial);
				}

				for (var tidx = 0; tidx < 4; tidx++) {
					var curf = [];
					for (var k = 0; k < point[tidx].length; k++) {
						curf[k] = [point[tidx][k][0] * 0.2 * amp, point[tidx][k][1] * 0.2 * amp];
					}

					var sticker = new THREE.Object3D();
					var stickerInterior = new THREE.Mesh(new THREE.Ploy(curf), meshes);
					stickerInterior.doubleSided = cubeOptions.doubleSided;
					sticker.addChild(stickerInterior);

					var transformationMatrix = sidesUV[i].clone().multiplySelf(
						new THREE.Matrix4().setTranslation(x * amp * (2 + wg), -y * amp * (2 + wg), 1 * amp)
					).multiplySelf(
						new THREE.Matrix4().setRotationAxis(zz, Math.TAU / 3 * tidx)
					);

					sticker.matrix.copy(transformationMatrix);
					sticker.matrixAutoUpdate = false;
					sticker.update();

					facePieces.push([transformationMatrix, sticker]);
					cubeObject.addChild(sticker);
				}
			}
		}
		for (var i = 0; i < numSides; i++) {
			for (var xy = 0; xy < 4; xy++) {
				var x = xy % 2 - 0.5;
				var y = ~~(xy / 2) - 0.5;
				var facePieces = [];
				cubePieces.push(facePieces);
				var meshes = [new THREE.MeshBasicMaterial({
					color: cubeOptions.faceColors[i + 3],
					opacity: cubeOptions.opacity
				})];
				if (cubeOptions.stickerBorder) {
					meshes.push(borderMaterial);
				}
				for (var tidx = 0; tidx < 4; tidx++) {
					var curf = [];
					for (var k = 0; k < button[tidx].length; k++) {
						curf[k] = [button[tidx][k][0] * 0.2 * amp, button[tidx][k][1] * 0.2 * amp];
					}
					var sticker = new THREE.Object3D();
					var stickerInterior = new THREE.Mesh(new THREE.Ploy(curf), meshes);
					stickerInterior.doubleSided = cubeOptions.doubleSided;
					sticker.addChild(stickerInterior);
					var transformationMatrix = sidesUV[i].clone().multiplySelf(
						new THREE.Matrix4().setTranslation(-x * amp * (2 + wg), -y * amp * (2 + wg), 1 * amp)
					).multiplySelf(
						new THREE.Matrix4().setRotationAxis(zz, Math.TAU / 3 * tidx + Math.TAU / 2 * i)
					);
					sticker.matrix.copy(transformationMatrix);
					sticker.matrixAutoUpdate = false;
					sticker.update();
					facePieces.push([transformationMatrix, sticker]);
					cubeObject.addChild(sticker);
				}
			}
		}

		cubePieces.push(fixedPieces);

		var internalState = [
			0, 0, 0, 0, 0, 0, 0, 0, 0, //front
			0, 0, 0, 0, 0, 0, 0, 0, 0, //back
			0, 0, 0, 0, //button
			0 //orientation
		];

		function internalDoMove(twisty, currentMove, doMove) {
			var axis = currentMove[0];
			if (axis == mY) {
				if (doMove) {
					internalState[22] ^= 1;
				}
				return [];
			}
			axis ^= twisty.internalState[22];
			if (axis >= mbUR && axis <= mbDL) { //button move
				if (doMove) {
					internalState[18 + axis - mbUR] ^= 1;
				}
				return [];
			}
			var face = twisty.internalState[18 + axis];
			if (axis >= mF) { // specific face
				face = axis & 1;
			}
			var affect = [];
			for (var i = 0; i < 4; i++) {
				if (twisty.internalState[18 + i] != face) {
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
			if (doMove) {
				for (var i = 0; i < 18; i++) {
					var pow = (i < 9 ^ twisty.internalState[22]) ? currentMove[1] : -currentMove[1];
					if (affect[i]) {
						twisty.internalState[i] += pow;
					}
				}
			}
			return affect;
		}

		var actualScale = cubeOptions.scale * 0.5 / cubeOptions.dimension;
		cubeObject.scale = new THREE.Vector3(actualScale, actualScale, actualScale);

		function animateMoveCallback(twisty, currentMove, moveProgress, moveStep) {
			var rots = new THREE.Matrix4();
			var rotsi = new THREE.Matrix4();
			var fullstep = TAU / 12 * currentMove[1];
			var affect = internalDoMove(twisty, currentMove, false);
			var axis = currentMove[0];
			var state = twisty.cubePieces;
			if (axis == mY) {
				rots.setRotationAxis(zyi, -moveStep * fullstep);
				for (var i = 0; i < state.length; i++) {
					for (var j = 0; j < state[i].length; j++) {
						var sticker = state[i][j];
						sticker[1].matrix.multiply(rots, sticker[1].matrix);
						sticker[1].update();
					}
				}
			} else if (axis >= mbUR && axis <= mbDL) {
				rots.setRotationAxis(zz, -moveStep * fullstep);
				rotsi.setRotationAxis(zz, moveStep * fullstep);
				axis ^= twisty.internalState[22];
				for (var i = 0; i < 2; i++) {
					var idx = 18 + ((axis - mbUR + i * 4) ^ (i % 2));
					for (var j = 0; j < state[idx].length; j++) {
						var sticker = state[idx][j];
						sticker[1].matrix.multiply(sticker[1].matrix, i < 1 ? rots : rotsi);
						sticker[1].update();
					}
				}
			} else {
				rots.setRotationAxis(zz, -moveStep * fullstep);
				rotsi.setRotationAxis(zz, moveStep * fullstep);
				for (var i = 0; i < 18; i++) {
					if (!affect[i]) {
						continue;
					}
					for (var j = 0; j < state[i].length; j++) {
						var sticker = state[i][j];
						sticker[1].matrix.multiply(sticker[1].matrix, (i < 9 ^ twisty.internalState[22]) ? rots : rotsi);
						sticker[1].update();
					}
				}
			}
		}


		function advanceMoveCallback(twisty, currentMove) {

			cntMove(twisty, currentMove);

			var rots = new THREE.Matrix4();
			var rotsi = new THREE.Matrix4();
			var fullstep = TAU / 12 * currentMove[1];
			var affect = internalDoMove(twisty, currentMove, true);
			var axis = currentMove[0];
			var state = twisty.cubePieces;
			if (axis == mY) {
				rots.setRotationAxis(zyi, -fullstep);
				for (var i = 0; i < state.length; i++) {
					for (var j = 0; j < state[i].length; j++) {
						var sticker = state[i][j];
						sticker[0].multiply(rots, sticker[0]);
						sticker[1].matrix.copy(sticker[0]);
						sticker[1].update();
					}
				}
			} else if (axis >= mbUR && axis <= mbDL) {
				rots.setRotationAxis(zz, -fullstep);
				rotsi.setRotationAxis(zz, fullstep);
				axis ^= twisty.internalState[22];
				for (var i = 0; i < 2; i++) {
					var idx = 18 + ((axis - mbUR + i * 4) ^ (i % 2));
					for (var j = 0; j < state[idx].length; j++) {
						var sticker = state[idx][j];
						sticker[0].multiply(sticker[0], i < 1 ? rots : rotsi);
						sticker[1].matrix.copy(sticker[0]);
						sticker[1].update();
						var color = cubeOptions.faceColors[3 + (twisty.internalState[18 + axis - mbUR] ^ i)];
						sticker[1].children[0].materials[0].color.setHex(color);

					}
				}
			} else {
				rots.setRotationAxis(zz, -fullstep);
				rotsi.setRotationAxis(zz, fullstep);
				for (var i = 0; i < 18; i++) {
					if (!affect[i]) {
						continue;
					}
					for (var j = 0; j < state[i].length; j++) {
						var sticker = state[i][j];
						sticker[0].multiply(sticker[0], (i < 9 ^ twisty.internalState[22]) ? rots : rotsi);
						sticker[1].matrix.copy(sticker[0]);
						sticker[1].update();
					}
				}
			}
		}

		function matrix4Power(inMatrix, power) {
			var matrix = null;
			if (power < 0) {
				var matrixIdentity = new THREE.Matrix4();
				matrix = THREE.Matrix4.makeInvert(inMatrix, matrixIdentity);
			} else {
				matrix = inMatrix.clone();
			}

			var out = new THREE.Matrix4();
			for (var i = 0; i < Math.abs(power); i++) {
				out.multiplySelf(matrix);
			}
			return out;
		}

		function generateScramble(twisty) {
			return [];
		}

		function generateCubeKeyMapping() {
			return {
				89: [mbUR, 6], //Y buttons
				84: [mbUL, 6], //T buttons
				72: [mbDR, 6], //H buttons
				71: [mbDL, 6], //G buttons
				85: [mUR, -2], //U r
				73: [mUR, -1], //I R
				79: [mUR, 1], //O B'
				80: [mUR, 2], //P z
				74: [mDR, -2], //J U
				75: [mDR, -1], //K R'
				76: [mDR, 1], //L D'
				186: [mDR, 2], //; y
				82: [mUL, 2], //R l'
				69: [mUL, 1], //E L'
				87: [mUL, -1], //W B
				81: [mUL, -2], //Q z'
				70: [mDL, 2], //F U'
				68: [mDL, 1], //D L
				83: [mDL, -1], //S D
				65: [mDL, -2], //A y'
				66: [mY, 6], //B x'
				78: [mY, -6], //N x'
				// 77: [mL, 1, -3, 1], //M r'
				// 86: [mR, -1, -3, 1], //V l
			}
		}

		var cubeKeyMapping = generateCubeKeyMapping();

		function keydownCallback(twisty, e) {
			if (e.altKey || e.ctrlKey) {
				return;
			}
			var keyCode = e.keyCode;
			if (keyCode in cubeKeyMapping) {
				twistyScene.addMoves([cubeKeyMapping[keyCode]]);
			}
		}

		function isSolved(twisty) {
			if (!twistyScene.isMoveFinished()) {
				return 1;
			}
			for (var i = 0; i < 18; i++) {
				if (twisty.internalState[i] % 12 != 0) {
					return 1;
				}
			}
			return 0;
		}

		function isInspectionLegalMove(twisty, move) {
			return move[0] == mY || move[0] >= mbUR && move[0] <= mbDL;
		}

		function isParallelMove(twisty, move1, move2) {
			return move1[0] < mY && ~~(move1[0] / 4) == ~~(move2[0] / 4);
		}

		function parseScramble(scramble) {
			if (!scramble || /^\s*$/.exec(scramble)) {
				return generateScramble(this);
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
		}

		var counter = 0;
		var lastMove = -1;

		function cntMove(twisty, move) {
			if (!isInspectionLegalMove(twisty, move) && move[0] != lastMove) {
				counter++;
			}
			lastMove = move[0];
		}

		function moveCnt(clr) {
			if (clr) {
				counter = 0;
				lastMove = -1
			}
			return counter;
		}

		function move2str(move) {
			var axis = ['mUR', 'mUL', 'mDR', 'mDL', 'mbUR', 'mbUL', 'mbDR', 'mbDL', 'mY', 'mY', 'mF', 'mB'][move[0]];
			return axis + move[1];
		}

		function moveInv(move) {
			move = move.slice();
			move[1] = -move[1];
			return move;
		}

		return {
			type: twistyParameters,
			options: cubeOptions,
			_3d: cubeObject,
			cubePieces: cubePieces,
			internalState: internalState,
			animateMoveCallback: animateMoveCallback,
			advanceMoveCallback: advanceMoveCallback,
			keydownCallback: keydownCallback,
			isSolved: isSolved,
			isInspectionLegalMove: isInspectionLegalMove,
			isParallelMove: isParallelMove,
			generateScramble: generateScramble,
			parseScramble: parseScramble,
			moveCnt: moveCnt,
			move2str: move2str,
			moveInv: moveInv
		};
	}
})();
