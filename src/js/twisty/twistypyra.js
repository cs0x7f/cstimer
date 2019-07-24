(function() {
	twistyjs.registerTwisty("pyr", createCubeTwisty);

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

	var amp = 2.5;

	var wg = 0.05;

	var TAU = Math.TAU;
	var sin = function(val) {
		return Math.sin(val * TAU);
	}
	var cos = function(val) {
		return Math.cos(val * TAU);
	}
	var rsqr5 = 1 / Math.sqrt(5);

	var normU = new THREE.Vector3(0, -1, 0);
	var normR = new THREE.Vector3(-Math.sqrt(6)/3, 1/3, -Math.sqrt(2)/3);
	var normL = new THREE.Vector3(Math.sqrt(6)/3, 1/3, -Math.sqrt(2)/3);
	var normB = new THREE.Vector3(0, 1/3, Math.sqrt(8)/3);

	var PI = Math.PI;
	var rsq3 = 1/Math.sqrt(3);
	var gap = 0.07;

	var piece = [
		[0, rsq3 - gap],
		[-(1 - gap / rsq3) / 2, -(rsq3 - gap) / 2],
		[(1 - gap / rsq3) / 2, -(rsq3 - gap) / 2]
	];

	var ctdis = Math.sqrt(6) / 4;

	var facelets = [
		[piece, 0, -rsq3, ctdis, 0/6],
		[piece, 0, -rsq3, ctdis, 1/6],
		[piece, 0, -rsq3, ctdis, 2/6],
		[piece, 0, -rsq3, ctdis, 3/6],
		[piece, 0, -rsq3, ctdis, 4/6],
		[piece, 0, -rsq3, ctdis, 5/6],
		[piece, 0, 2*rsq3, ctdis, 1/6],
		[piece, 0, 2*rsq3, ctdis, 3/6],
		[piece, 0, 2*rsq3, ctdis, 5/6],
	];

	// Cube Constants
	var numSides = 4;

	var normList = [
		normU,
		normR,
		normL,
		normB
	];

	var sidesUV = [
		axify(new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 1), normU),
		axify(new THREE.Vector3(-1/2, 0, Math.sqrt(3)/2), new THREE.Vector3(-Math.sqrt(3)/6, -2*Math.sqrt(2)/3, -1/6), normR),
		axify(new THREE.Vector3(-1/2, 0, -Math.sqrt(3)/2), new THREE.Vector3(Math.sqrt(3)/6, -2*Math.sqrt(2)/3, -1/6), normL),
		axify(new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, -Math.sqrt(8)/3, 1/3), normB)
	];

	var mU = 0,
		mR = 1,
		mL = 2,
		mB = 3;

	function matrixVector3Dot(m, v) {
		return (m.n14 * v.x + m.n24 * v.y + m.n34 * v.z) / amp;
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
		for (var i = 0; i < numSides; i++) {
			materials.push(new THREE.MeshBasicMaterial({
				color: cubeOptions.faceColors[i],
				opacity: cubeOptions.opacity
			}));
		}

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

				var transformationMatrix = new THREE.Matrix4().setRotationAxis(normList[i], TAU * curf[4])
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

		function animateMoveCallback(twisty, currentMove, moveProgress, moveStep) {
			var rots = new THREE.Matrix4();
			var fullstep = TAU / 3 * currentMove[1];
			var normVector = normList[currentMove[0]];

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
			var fullstep = TAU / 3 * currentMove[1];
			var normVector = normList[currentMove[0]];

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
			return [];
		}

		//[axis, power, min, max]
		//axis: 1: top, 2: bot, 0: /, 3: z2
		function generateCubeKeyMapping() {
			return {
				73: [mR, -1, -3, 0], //I R
				75: [mR, 1, -3, 0], //K R'
				87: [mB, -1, -3, 0], //W B
				79: [mB, 1, -3, 0], //O B'
				83: [mB, -1, -3, -1], //S b
				76: [mB, 1, -3, -1], //L b'
				68: [mL, -1, -3, 0], //D L
				69: [mL, 1, -3, 0], //E L'
				74: [mU, -1, -3, 0], //J U
				70: [mU, 1, -3, 0], //F U'
				72: [mU, -1, -3, -1], //H u
				71: [mU, 1, -3, -1], //G u'
				186: [mU, -1, -3, 3], //; y
				59: [mU, -1, -3, 3], //y (TODO - why is this needed for firefox?)
				65: [mU, 1, -3, 3], //A y'
				85: [mR, -1, -3, -1], //U r
				77: [mR, 1, -3, -1], //M r'
				82: [mL, 1, -3, -1], //R l'
				86: [mL, -1, -3, -1], //V l
				84: [mL, 1, -3, 3], //T x
				89: [mR, -1, -3, 3], //Y x
				78: [mR, 1, -3, 3], //N x'
				66: [mL, -1, -3, 3], //B x'
				80: [mB, 1, -3, 3], //P z
				81: [mB, -1, -3, 3] //Q z'
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
			return Math.abs(move[2]) >= 3 && Math.abs(move[3]) >= 3;
		}

		function isParallelMove(twisty, move1, move2) {
			return move1[0] == move2[0];
		}

		function parseScramble(scramble) {
			if (scramble.match(/^\s*$/)) {
				return generateScramble(this);
			} else {
				var moves = kernel.parseScramble(scramble, 'URLB')
				scramble = [];
				for (var i = 0; i < moves.length; i++) {
					scramble.push([moves[i][0], moves[i][2] - 2, -3, 1 - moves[i][1]]);
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
			var pow = move[1] == -1 ? "'" : "";
			var nlayer = move[3] - move[2];
			if (nlayer == 6) { // rotation
				return "[" + "urlb".charAt(axis) + pow + "]";
			} else if (nlayer == 2) { // small corner
				return "urlb".charAt(axis) + pow;
			} else {
				return "URLB".charAt(axis) + pow;
			}
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
