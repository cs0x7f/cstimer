(function() {
	twistyjs.registerTwisty("fto", createCubeTwisty);

	var TAU = Math.TAU;

	function createCubeTwisty(twistyScene, twistyParameters) {

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

		var numSides = 8;
		var puzzle = poly3d.makePuzzle(numSides, [1 / 3, -2]);

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

		puzzle.enumFacesPolys(function(face, p, poly, idx) {
			var sticker = new THREE.Object3D();

			var meshes = [materials[face]];
			if (cubeOptions.stickerBorder) {
				meshes.push(borderMaterial);
			}
			var trimed = poly.trim(0.075);
			if (trimed) {
				poly = trimed;
			}
			var cords = poly.projection(puzzle.faceUVs[face]);
			var stickerInterior = new THREE.Mesh(new THREE.Ploy(cords), meshes);
			stickerInterior.doubleSided = cubeOptions.doubleSided;
			stickerInterior.overdraw = true;
			sticker.addChild(stickerInterior);

			var transformationMatrix = twistyjs.axify(puzzle.faceUVs[face][0], puzzle.faceUVs[face][1], puzzle.facePlanes[face].norm)
				.multiplySelf(new THREE.Matrix4().setTranslation(0, 0, 1));
			sticker.matrix.copy(transformationMatrix);
			sticker.matrixAutoUpdate = false;
			sticker.update();

			cubePieces[idx] = [transformationMatrix, sticker, face];
			cubeObject.addChild(sticker);
		});

		var actualScale = cubeOptions.scale * 0.5;
		cubeObject.scale = new THREE.Vector3(actualScale, actualScale, actualScale);

		function animateMoveCallback(twisty, currentMove, moveProgress, moveStep) {
			var rots;
			var twistyPlane;
			for (var i = 0; i < puzzle.twistyPlanes.length; i++) {
				if (puzzle.twistyDetails[i][0] == currentMove[0]) {
					rots = new THREE.Matrix4();
					twistyPlane = puzzle.twistyPlanes[i];
					rots.setRotationAxis(twistyPlane.norm, -moveStep * TAU * currentMove[1] / puzzle.twistyDetails[i][1]);
				}
			}
			if (!rots) {
				debugger; // invalid move
				return;
			}
			puzzle.enumFacesPolys(function(face, p, poly, idx) {
				if (twistyPlane.norm.inprod(poly.center) < twistyPlane.dis) {
					return;
				}
				var sticker = twisty.cubePieces[idx];
				sticker[1].matrix.multiply(rots, sticker[1].matrix);
				sticker[1].update();
			});
		}

		function advanceMoveCallback(twisty, currentMove) {

			cntMove(twisty, currentMove);

			var twistyPlane;
			var moveIdx = 0;
			for (var i = 0; i < puzzle.twistyPlanes.length; i++) {
				if (puzzle.twistyDetails[i][0] == currentMove[0]) {
					moveIdx = i;
					twistyPlane = puzzle.twistyPlanes[i];
				}
			}
			if (!twistyPlane) {
				debugger; // invalid move
				return;
			}
			var maxPow = puzzle.twistyDetails[moveIdx][1];
			var pow = (currentMove[1] % maxPow + maxPow) % maxPow;
			var perm = puzzle.moveTable[moveIdx];
			var nextState = [];
			for (var i = 0; i < perm.length; i++) {
				var val = i;
				for (var j = 0; j < pow; j++) {
					val = perm[val];
				}
				var sticker = twisty.cubePieces[val];
				nextState[i] = [sticker[2], sticker[1].children[0].materials];
			}
			for (var i = 0; i < perm.length; i++) {
				var sticker = twisty.cubePieces[i];
				sticker[2] = nextState[i][0];
				sticker[1].children[0].materials = nextState[i][1];
				sticker[1].matrix.copy(sticker[0]);
				sticker[1].update();
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
				73: ["0R", 1], //I R
				75: ["0R", -1], //K R'
				87: ["0B", 1], //W Br
				79: ["0B", -1], //O Br'
				83: ["0D", 1], //S Dr
				76: ["0D", -1], //L Dr'
				68: ["0L", 1], //D L
				69: ["0L", -1], //E L'
				74: ["0U", 1], //J U
				70: ["0U", -1], //F U'
				72: ["0F", 1], //H F
				71: ["0F", -1], //G F'
				186: ["1U", 1], //; y
				65: ["1U", -1], //A y'
				84: ["1L", -1], //T x
				89: ["1R", 1], //Y x
				78: ["1R", -1], //N x'
				66: ["1L", 1], //B x'
				80: ["1F", 1], //P z
				81: ["1F", -1] //Q z'
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
			var faceMap = {};
			var ret = 0;
			puzzle.enumFacesPolys(function(face, p, poly, idx) {
				var stateFace = twisty.cubePieces[idx][2];
				if (!(stateFace in faceMap)) {
					faceMap[stateFace] = face;
				} else if (faceMap[stateFace] != face) {
					ret = 1;
					return true;
				}
			});
			return ret;
		}

		function isInspectionLegalMove(twisty, move) {
			return move[0][0] == '1';
		}

		function isParallelMove(twisty, move1, move2) {
			return move1[0] == move2[0];
		}

		function parseScramble(scramble) {
			if (!scramble || /^\s*$/.exec(scramble)) {
				return generateScramble(this);
			} else {
				var ret = [];
				scramble.replace(/(?:^|\s*)\[?([URFDL]|(?:B[RL]?))(')?(\])?(?:$|\s*)/g, function(m, p1, p2, p3) {
					ret.push(["" + (p3 ? 1 : 0) + p1[0] + p1.slice(1).toLowerCase(), p2 ? -1 : 1]);
				});
				if (ret.length == 0) {
					return generateScramble(this);
				}
				return ret;
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
			var move = move[0].toUpperCase() + (move[1] == 1 ? "" : "'");
			if (move[0] == '1') {
				return '[' + move.slice(1) + ']';
			}
			return move.slice(1);
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
