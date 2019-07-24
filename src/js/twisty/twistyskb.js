(function() {
	twistyjs.registerTwisty("skewb", createCubeTwisty);

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

	var amp = 1.4;

	var wg = 0.1;

	var ss = [
		[-(0.5 - wg), -(0.5 - wg)],
		[(1.5 - wg), -(0.5 - wg)],
		[-(0.5 - wg), (1.5 - wg)]
	];
	var ls = [
		[(2 - wg * 2), 0],
		[0, (2 - wg * 2)],
		[-(2 - wg * 2), 0],
		[0, -(2 - wg * 2)]
	];

	var facelets = [
		[ss, -1.5, -1.5, 2, 0],
		[ss, -1.5, -1.5, 2, 1],
		[ss, -1.5, -1.5, 2, 2],
		[ss, -1.5, -1.5, 2, 3],
		[ls, 0, 0, 2, 0]
	];



	// Cube Constants
	var numSides = 6;

	var xx = new THREE.Vector3(Math.sqrt(2) / 2, 0, Math.sqrt(2) / 2);
	var yy = new THREE.Vector3(0, 1, 0);
	var zz = new THREE.Vector3(-Math.sqrt(2) / 2, 0, Math.sqrt(2) / 2);
	var xxi = new THREE.Vector3(-Math.sqrt(2) / 2, 0, -Math.sqrt(2) / 2);
	var yyi = new THREE.Vector3(0, -1, 0);
	var zzi = new THREE.Vector3(Math.sqrt(2) / 2, 0, -Math.sqrt(2) / 2);

	var side_index = {
		"U": 0,
		"L": 1,
		"F": 2,
		"R": 3,
		"B": 4,
		"D": 5
	};
	var index_side = ["U", "L", "F", "R", "B", "D"];

	var sidesRot = {
		"U": axify(zz, yy, xxi),
		"L": axify(xx, zz, yyi),
		"F": axify(yyi, xx, zz),
		"R": axify(xx, zzi, yy),
		"B": axify(yy, xxi, zz),
		"D": axify(zzi, yy, xx)
	};
	var sidesNorm = {
		"U": yy,
		"L": xxi,
		"F": zz,
		"R": xx,
		"B": zzi,
		"D": yyi
	};
	var sidesRotAxis = {
		"U": yyi,
		"L": xx,
		"F": zzi,
		"R": xxi,
		"B": zz,
		"D": yy
	};
	var sidesUV = [
		axify(xx, zzi, yy),
		axify(zz, yy, xxi),
		axify(xx, yy, zz),
		axify(zzi, yy, xx),
		axify(xxi, yy, zzi),
		axify(xx, zz, yyi)
	];

	function matrixVector3Dot(m, v) {
		return m.n14 * v.x + m.n24 * v.y + m.n34 * v.z;
	}

	/*
	 * Rubik's Cube NxNxN
	 */
	function createCubeTwisty(twistyScene, twistyParameters) {

		// console.log("Creating cube twisty.");

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
			faceColors: [0xffffff, 0xff8800, 0x00ff00, 0xff0000, 0x0000ff, 0xffff00],
			scale: 1
		};

		// Passed Parameters
		for (var option in cubeOptions) {
			if (option in twistyParameters) {
				//              console.log("Setting option \"" + option + "\" to " + twistyParameters[option]);
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
		for (var i = 0; i < numSides; i++) {
			materials.push(new THREE.MeshBasicMaterial({
				color: cubeOptions.faceColors[i],
				opacity: cubeOptions.opacity
			}));
		}

		// Cube Helper Linear Algebra

		//Cube Object Generation
		for (var i = 0; i < numSides; i++) {
			var facePieces = [];
			cubePieces.push(facePieces);

			for (var j = 0; j < facelets.length; j++) {
				curf = facelets[j];
				var sticker = new THREE.Object3D();

				var meshes = [materials[i]];
				if (cubeOptions.stickerBorder) {
					meshes.push(borderMaterial);
				}
				var curf0 = [];
				for (var k = 0; k < curf[0].length; k++) {
					curf0[k] = [curf[0][k][0] * amp, curf[0][k][1] * amp];
				};
				var stickerInterior = new THREE.Mesh(new THREE.Ploy(curf0), meshes);
				stickerInterior.doubleSided = cubeOptions.doubleSided;
				sticker.addChild(stickerInterior);

				var transformationMatrix = new THREE.Matrix4().setRotationAxis(sidesRotAxis[index_side[i]], Math.TAU / 4 * curf[4])
					.multiplySelf(sidesUV[i])
					.multiplySelf(new THREE.Matrix4().setTranslation(curf[1] * amp, curf[2] * amp,
						curf[3] * amp
					));

				sticker.matrix.copy(transformationMatrix);

				sticker.matrixAutoUpdate = false;
				sticker.update();

				facePieces.push([transformationMatrix, sticker]);
				cubeObject.addChild(sticker);
			};
		}

		var actualScale = cubeOptions.scale * 0.5 / cubeOptions.dimension;
		cubeObject.scale = new THREE.Vector3(actualScale, actualScale, actualScale);

		var mU = 0,
			mR = 7,
			mF = 9,
			mD = 10,
			mL = 8,
			mB = 3,
			mX = 4,
			mY = 5,
			mZ = 6;

		var axisList = [
			new THREE.Vector3(0, Math.sqrt(1 / 3), -Math.sqrt(2 / 3)), //U
			new THREE.Vector3(Math.sqrt(2 / 3), -Math.sqrt(1 / 3), 0), //R0
			new THREE.Vector3(-Math.sqrt(2 / 3), -Math.sqrt(1 / 3), 0), //L0
			new THREE.Vector3(0, -Math.sqrt(1 / 3), -Math.sqrt(2 / 3)), //B
			xx, //x
			yy, //y
			zzi, //z
			new THREE.Vector3(Math.sqrt(2 / 3), Math.sqrt(1 / 3), 0), //R
			new THREE.Vector3(-Math.sqrt(2 / 3), Math.sqrt(1 / 3), 0), //L
			new THREE.Vector3(0, Math.sqrt(1 / 3), Math.sqrt(2 / 3)), //F
			new THREE.Vector3(0, -Math.sqrt(1 / 3), Math.sqrt(2 / 3)) //D
		];

		function animateMoveCallback(twisty, currentMove, moveProgress, moveStep) {
			var rots = new THREE.Matrix4();
			var fullstep = Math.TAU / 12 * currentMove[1];
			var normVector = axisList[currentMove[0]];

			rots.setRotationAxis(normVector, -moveStep * fullstep);

			var state = twisty.cubePieces;

			for (var faceIndex = 0; faceIndex < numSides; faceIndex++) {
				var faceStickers = state[faceIndex];
				for (var stickerIndex = 0, faceStickerslength = faceStickers.length; stickerIndex < faceStickerslength; stickerIndex++) {
					// TODO - sticker isn't really a good name for this --jfly
					var sticker = faceStickers[stickerIndex];

					var layer = matrixVector3Dot(sticker[1].matrix, normVector);
					if (layer > currentMove[2] && layer < currentMove[3]) {
						sticker[1].matrix.multiply(rots, sticker[1].matrix);
						sticker[1].update();
					}
				}
			}
		}

		function advanceMoveCallback(twisty, currentMove) {

			cntMove(twisty, currentMove);

			var rots = new THREE.Matrix4();
			var fullstep = Math.TAU / 12 * currentMove[1];
			var normVector = axisList[currentMove[0]];

			rots.setRotationAxis(normVector, -fullstep);

			var state = twisty.cubePieces;

			for (var faceIndex = 0; faceIndex < numSides; faceIndex++) {
				var faceStickers = state[faceIndex];
				for (var stickerIndex = 0, faceStickerslength = faceStickers.length; stickerIndex < faceStickerslength; stickerIndex++) {
					// TODO - sticker isn't really a good name for this --jfly
					var sticker = faceStickers[stickerIndex];

					var layer = matrixVector3Dot(sticker[1].matrix, normVector);
					if (layer > currentMove[2] && layer < currentMove[3]) {
						sticker[0].multiply(rots, sticker[0]);
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
			var dim = twisty.options.dimension;
			var n = 32;
			var newMoves = [];

			for (var i = 0; i < n; i++) {

				var random1 = 1 + ~~(Math.random() * dim / 2);
				var random2 = random1 + ~~(Math.random() * dim / 2);
				var random3 = ~~(Math.random() * 6);
				var random4 = [-2, -1, 1, 2][~~(Math.random() * 4)];

				var newMove = [random1, random2, ["U", "L", "F", "R", "B", "D"][random3], random4];

				newMoves.push(newMove);

			}

			return newMoves;
		}


		//[axis, power, min, max]
		//axis: 1: top, 2: bot, 0: /, 3: z2
		function generateCubeKeyMapping() {
			return {
				73: [mR, 4, 0, 5], //I R
				75: [mR, -4, 0, 5], //K R'
				87: [mB, 4, 0, 5], //W B
				79: [mB, -4, 0, 5], //O B'
				83: [mD, 4, 0, 5], //S D
				76: [mD, -4, 0, 5], //L D'
				68: [mL, 4, 0, 5], //D L
				69: [mL, -4, 0, 5], //E L'
				74: [mU, 4, 0, 5], //J U
				70: [mU, -4, 0, 5], //F U'
				72: [mF, 4, 0, 5], //H F
				71: [mF, -4, 0, 5], //G F'
				186: [mY, 3, -5, 5], //; y
				59: [mY, 3, -5, 5], //y (TODO - why is this needed for firefox?)
				65: [mY, -3, -5, 5], //A y'
				84: [mX, 3, -5, 5], //T x
				89: [mX, 3, -5, 5], //Y x
				78: [mX, -3, -5, 5], //N x'
				66: [mX, -3, -5, 5], //B x'
				80: [mZ, -3, -5, 5], //P z
				81: [mZ, 3, -5, 5] //Q z'
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
			var state = twisty.cubePieces;

			for (var faceIndex = 0; faceIndex < numSides - 1; faceIndex++) {
				var faceStickers = state[faceIndex];
				var normVector = new THREE.Vector3(faceStickers[0][0].n13, faceStickers[0][0].n23, faceStickers[0][0].n33);
				var stdVal = matrixVector3Dot(faceStickers[0][0], normVector);
				for (var stickerIndex = 1, faceStickerslength = faceStickers.length; stickerIndex < faceStickerslength; stickerIndex++) {
					var sticker = faceStickers[stickerIndex];
					if (0.1 < Math.abs(matrixVector3Dot(sticker[0], normVector) - stdVal)) {
						return 1;
					}
				}
			}
			return 0;
		}

		function isInspectionLegalMove(twisty, move) {
			return move[0] >= 4 && move[0] <= 6;
		}

		function isParallelMove(twisty, move1, move2) {
			return move1[0] == move2[0];
		}

		function parseScramble(scramble) {
			if (scramble.match(/^\s*$/)) {
				return generateScramble(this);
			} else {
				var moves = kernel.parseScramble(scramble, "URLB");
				scramble = [];
				for (var i = 0; i < moves.length; i++) {
					scramble.push([moves[i][0],
						[4, 0, -4][moves[i][2] - 1], 0, 5
					]);
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
			var axis = move[0];
			var pow = move[1];
			var nlayer = move[3] - move[2];
			return "U??BxyzRLFD".charAt(axis) + (pow > 0 ? "" : "'");
		}

		return {
			type: twistyParameters,
			options: cubeOptions,
			_3d: cubeObject,
			cubePieces: cubePieces,
			animateMoveCallback: animateMoveCallback,
			advanceMoveCallback: advanceMoveCallback,
			keydownCallback: keydownCallback,
			isSolved: isSolved,
			isInspectionLegalMove: isInspectionLegalMove,
			isParallelMove: isParallelMove,
			generateScramble: generateScramble,
			parseScramble: parseScramble,
			moveCnt: moveCnt,
			move2str: move2str
		};
	}
})();
