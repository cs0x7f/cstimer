(function() {
	twistyjs.registerTwisty("mgm", createCubeTwisty);

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

	var amp = 2.8;

	var wg = 0.05;

	var TAU = Math.TAU;
	var sin = function(val) {
		return Math.sin(val * TAU);
	}
	var cos = function(val) {
		return Math.cos(val * TAU);
	}
	var rsqr5 = 1 / Math.sqrt(5);

	var normU = new THREE.Vector3(0, 1, 0);
	var normF = new THREE.Vector3(0, rsqr5, 2 * rsqr5);
	var normR = new THREE.Vector3(2 * rsqr5 * sin(0.2), rsqr5, 2 * rsqr5 * cos(0.2));
	var normBr = new THREE.Vector3(2 * rsqr5 * sin(0.4), rsqr5, 2 * rsqr5 * cos(0.4));
	var normBl = new THREE.Vector3(2 * rsqr5 * sin(0.6), rsqr5, 2 * rsqr5 * cos(0.6));
	var normL = new THREE.Vector3(2 * rsqr5 * sin(0.8), rsqr5, 2 * rsqr5 * cos(0.8));
	var normUi = new THREE.Vector3(0, -1, 0);
	var normFi = new THREE.Vector3(0, -rsqr5, -2 * rsqr5);
	var normRi = new THREE.Vector3(-2 * rsqr5 * sin(0.2), -rsqr5, -2 * rsqr5 * cos(0.2));
	var normBri = new THREE.Vector3(-2 * rsqr5 * sin(0.4), -rsqr5, -2 * rsqr5 * cos(0.4));
	var normBli = new THREE.Vector3(-2 * rsqr5 * sin(0.6), -rsqr5, -2 * rsqr5 * cos(0.6));
	var normLi = new THREE.Vector3(-2 * rsqr5 * sin(0.8), -rsqr5, -2 * rsqr5 * cos(0.8));


	var cfrac = 0.45;
	var PI = Math.PI;
	var efrac2 = (Math.sqrt(5) + 1) / 2;
	var d2x = (1 - cfrac) / 2 / Math.tan(PI / 5);

	var ct = [
		[Math.sin(PI * 0.0) * cfrac, -Math.cos(PI * 0.0) * cfrac],
		[Math.sin(PI * 0.4) * cfrac, -Math.cos(PI * 0.4) * cfrac],
		[Math.sin(PI * 0.8) * cfrac, -Math.cos(PI * 0.8) * cfrac],
		[Math.sin(PI * 1.2) * cfrac, -Math.cos(PI * 1.2) * cfrac]
		// [Math.sin(PI * 1.6) * cfrac, -Math.cos(PI * 1.6) * cfrac]
	];
	var ct2 = [
		[Math.sin(PI * 0.0) * cfrac, -Math.cos(PI * 0.0) * cfrac],
		// [Math.sin(PI * 0.4) * cfrac, -Math.cos(PI * 0.4) * cfrac],
		// [Math.sin(PI * 0.8) * cfrac, -Math.cos(PI * 0.8) * cfrac],
		[Math.sin(PI * 1.2) * cfrac, -Math.cos(PI * 1.2) * cfrac],
		[Math.sin(PI * 1.6) * cfrac, -Math.cos(PI * 1.6) * cfrac]
	];

	var edge = [
		[cfrac * sin(0.1) - wg * sin(0.05), (1 - cfrac) * cos(0.1) - wg - 0.2],
		[-cfrac * sin(0.1) + wg * sin(0.05), (1 - cfrac) * cos(0.1) - wg - 0.2],
		[sin(-0.1) - (1 - cfrac) / 2 / sin(-0.1) - wg * sin(0.05), wg - 0.2],
		[sin(0.1) - (1 - cfrac) / 2 / sin(0.1) + wg * sin(0.05), wg - 0.2]
	]

	var corn = [
		[0, wg / cos(0.1) - 0.2],
		[d2x - wg / sin(0.1), (1 - cfrac) / 2 - 0.2],
		[0, 1 - cfrac - wg / cos(0.1) - 0.2],
		[-d2x + wg / sin(0.1), (1 - cfrac) / 2 - 0.2]
	];

	var ctdis = (Math.cos(Math.PI / 5) + Math.cos(Math.PI / 5) * Math.cos(Math.PI / 5) - wg) * 2 / Math.sqrt(5);
	var facelets = [
		[edge, 0, 0.2 - cos(0.1), ctdis, 0.1],
		[edge, 0, 0.2 - cos(0.1), ctdis, 0.3],
		[edge, 0, 0.2 - cos(0.1), ctdis, 0.5],
		[edge, 0, 0.2 - cos(0.1), ctdis, 0.7],
		[edge, 0, 0.2 - cos(0.1), ctdis, 0.9],
		[corn, 0, -0.8, ctdis, 0.0],
		[corn, 0, -0.8, ctdis, 0.2],
		[corn, 0, -0.8, ctdis, 0.4],
		[corn, 0, -0.8, ctdis, 0.6],
		[corn, 0, -0.8, ctdis, 0.8],
		[ct, 0, 0, ctdis, 0],
		[ct2, 0, 0, ctdis, 0]
	];

	// Cube Constants
	var numSides = 12;

	var normList = [
		normU,
		normF,
		normR,
		normBr,
		normBl,
		normL,
		normUi,
		normFi,
		normRi,
		normBri,
		normBli,
		normLi
	];

	var sidesUV = [
		axify(new THREE.Vector3(-1, 0, 0), new THREE.Vector3(0, 0, 1), normU),
		axify(new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 2 * rsqr5, -rsqr5), normF),
		axify(new THREE.Vector3(cos(0.2), 0, -sin(0.2)), new THREE.Vector3(-sin(0.2) * rsqr5, 2 * rsqr5, -rsqr5 * cos(0.2)), normR),
		axify(new THREE.Vector3(cos(0.4), 0, -sin(0.4)), new THREE.Vector3(-sin(0.4) * rsqr5, 2 * rsqr5, -rsqr5 * cos(0.4)), normBr),
		axify(new THREE.Vector3(cos(0.6), 0, -sin(0.6)), new THREE.Vector3(-sin(0.6) * rsqr5, 2 * rsqr5, -rsqr5 * cos(0.6)), normBl),
		axify(new THREE.Vector3(cos(0.8), 0, -sin(0.8)), new THREE.Vector3(-sin(0.8) * rsqr5, 2 * rsqr5, -rsqr5 * cos(0.8)), normL),
		axify(new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, -1), normUi),
		axify(new THREE.Vector3(-1, 0, 0), new THREE.Vector3(0, -2 * rsqr5, rsqr5), normFi),
		axify(new THREE.Vector3(-cos(0.2), 0, sin(0.2)), new THREE.Vector3(sin(0.2) * rsqr5, -2 * rsqr5, rsqr5 * cos(0.2)), normRi),
		axify(new THREE.Vector3(-cos(0.4), 0, sin(0.4)), new THREE.Vector3(sin(0.4) * rsqr5, -2 * rsqr5, rsqr5 * cos(0.4)), normBri),
		axify(new THREE.Vector3(-cos(0.6), 0, sin(0.6)), new THREE.Vector3(sin(0.6) * rsqr5, -2 * rsqr5, rsqr5 * cos(0.6)), normBli),
		axify(new THREE.Vector3(-cos(0.8), 0, sin(0.8)), new THREE.Vector3(sin(0.8) * rsqr5, -2 * rsqr5, rsqr5 * cos(0.8)), normLi),
	];

	var mU = 0,
		mF = 1,
		mR = 2,
		mBr = 3,
		mBl = 4,
		mL = 5,
		mUi = 6,
		mFi = 7,
		mRi = 8,
		mBri = 9,
		mBli = 10,
		mLi = 11;

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
			var fullstep = TAU / 5 * currentMove[1];
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
			var fullstep = TAU / 5 * currentMove[1];
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
				73: [mR, 1, 1, 3], //I R
				75: [mR, -1, 1, 3], //K R'
				// 87: [mB, 4, 1, 3], //W B
				// 79: [mB, -4, 1, 3], //O B'
				// 83: [mD, 4, 1, 3], //S D
				// 76: [mD, -4, 1, 3], //L D'
				68: [mL, 1, 1, 3], //D L
				69: [mL, -1, 1, 3], //E L'
				74: [mU, 1, 1, 3], //J U
				70: [mU, -1, 1, 3], //F U'
				72: [mF, 1, 1, 3], //H F
				71: [mF, -1, 1, 3], //G F'
				186: [mU, 1, -3, 3], //; y
				59: [mU, 1, -3, 3], //y (TODO - why is this needed for firefox?)
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
				var moves = scramble.match(/[RD](?:\+\+|--)|U'?/g);
				scramble = [];
				for (var i = 0; i < moves.length; i++) {
					switch (moves[i]) {
						case "R++":
							scramble.push([mL, -2, -3, 1]);
							break;
						case "R--":
							scramble.push([mL, 2, -3, 1]);
							break;
						case "D++":
							scramble.push([mU, -2, -3, 1]);
							break;
						case "D--":
							scramble.push([mU, 2, -3, 1]);
							break;
						case "U":
							scramble.push([mU, 1, 1, 3]);
							break;
						case "U'":
							scramble.push([mU, -1, 1, 3]);
							break;
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
			var axis = move[0];
			var pow = move[1];
			var nlayer = move[3] - move[2];
			if (nlayer == 6) {
				return "[" + "ufr??l??????".charAt(axis) + (pow > 0 ? "" : "'") + "]";
			} else if (nlayer == 4) {
				return "D?L??R??????".charAt(axis) + (pow > 0 ? "-" : "+");
			} else if (nlayer == 2) {
				return "UFR??L??????".charAt(axis) + (pow > 0 ? "" : "'");
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
