(function() {
	twistyjs.registerTwisty("cube", createCubeTwisty);

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

	// Cube Constants
	var numSides = 6;

	var xx = new THREE.Vector3(1, 0, 0);
	var yy = new THREE.Vector3(0, 1, 0);
	var zz = new THREE.Vector3(0, 0, 1);
	var xxi = new THREE.Vector3(-1, 0, 0);
	var yyi = new THREE.Vector3(0, -1, 0);
	var zzi = new THREE.Vector3(0, 0, -1);

	var side_index = {
		"U": 0,
		"R": 1,
		"F": 2,
		"D": 3,
		"L": 4,
		"B": 5
	};
	var index_side = ["U", "R", "F", "D", "L", "B"];

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
		axify(xx, zzi, yy), //U
		axify(zzi, yy, xx), //R
		axify(xx, yy, zz), //F
		axify(xx, zz, yyi), //D
		axify(zz, yy, xxi), //L
		axify(xxi, yy, zzi) //B
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
			faceColors: [0xffffff, 0xff0000, 0x00ff00, 0xffff00, 0xff9000, 0x0000ff],
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
		var materials = {};
		var borderMaterial = new THREE.MeshBasicMaterial({
			color: 0x000000,
			wireframe: true,
			wireframeLinewidth: 1,
			opacity: cubeOptions.opacity
		});
		for (var i = 0; i < numSides; i++) {
			materials[i] = new THREE.MeshBasicMaterial({
				color: cubeOptions.faceColors[i],
				opacity: cubeOptions.opacity
			});
		}
		// Cube Helper Linear Algebra

		//Cube Object Generation
		for (var i = 0; i < numSides; i++) {
			var facePieces = [];
			cubePieces.push(facePieces);
			for (var su = 0; su < cubeOptions.dimension; su++) {
				for (var sv = 0; sv < cubeOptions.dimension; sv++) {

					var sticker = new THREE.Object3D();

					var key = i;
					if (cubeOptions.dimension > 7) {
						var su1 = Math.min(su, cubeOptions.dimension - 1 - su);
						var sv1 = Math.min(sv, cubeOptions.dimension - 1 - sv);
						key += ',' + (su1 + sv1) + ',' + (su1 * sv1);
					}
					materials[key] = materials[key] || new THREE.MeshBasicMaterial({
						color: cubeOptions.faceColors[i],
						opacity: cubeOptions.opacity
					});
					var meshes = [materials[key]];
					if (cubeOptions.stickerBorder) {
						meshes.push(borderMaterial);
					}
					var stickerInterior = new THREE.Mesh(new THREE.Plane(cubeOptions.stickerWidth, cubeOptions.stickerWidth), meshes);
					stickerInterior.doubleSided = cubeOptions.doubleSided;
					sticker.addChild(stickerInterior);

					var transformationMatrix = new THREE.Matrix4().multiply(sidesUV[i], new THREE.Matrix4().setTranslation(
						su * 2 - cubeOptions.dimension + 1, -(sv * 2 - cubeOptions.dimension + 1),
						cubeOptions.dimension
					));

					sticker.matrix.copy(transformationMatrix);

					sticker.matrixAutoUpdate = false;
					sticker.update();

					facePieces.push([transformationMatrix, sticker]);
					cubeObject.addChild(sticker);

				}
			}
		}

		var handMarks = [];

		function updateHandMarks(handMarks, dimension, oSl, oSr) {
			for (var i = 0; i < handMarks.length; i++) {
				var sticker = handMarks[i];
				var offset = (i + 1 & 2) ? oSl : oSr;
				var su = (i & 1) ? 1 : -1;
				var sv = (i & 2) ? 1 : -1;
				var hsq2 = Math.sqrt(2) / 2;
				sticker.matrix.copy(new THREE.Matrix4().multiply(axify(
					new THREE.Vector3(1 * sv, 0, 0),
					new THREE.Vector3(0, hsq2 * sv, -hsq2 * sv),
					new THREE.Vector3(0, hsq2, hsq2)), new THREE.Matrix4().setTranslation(
					su * (dimension - 2 * offset), dimension * (hsq2 * 2 + 0.05), 0
				)));
				sticker.update();
			}
		}

		if (cubeOptions.dimension > 5) {
			var markwidth = cubeOptions.dimension / 15;
			for (var i = 0; i < 4; i++) {
				var sticker = new THREE.Object3D();
				var stickerInterior = new THREE.Mesh(new THREE.Ploy(
					[[0, 0], [markwidth / 2, markwidth], [-markwidth / 2, markwidth]]
				), [(i + 1 & 2) ? materials[4] : materials[1], borderMaterial]);
				stickerInterior.doubleSided = cubeOptions.doubleSided;
				sticker.addChild(stickerInterior);
				sticker.matrixAutoUpdate = false;
				handMarks.push(sticker);
				cubeObject.addChild(sticker);
			}
		}

		var actualScale = cubeOptions.scale * 0.5 / cubeOptions.dimension;
		cubeObject.scale = new THREE.Vector3(actualScale, actualScale, actualScale);

		function animateMoveCallback(twisty, currentMove, moveProgress, moveStep) {

			//          var rott = new THREE.Matrix4();
			//          rott.setRotationAxis(sidesRotAxis[currentMove[2]], moveProgress * currentMove[3] * Math.TAU/4);

			var rots = new THREE.Matrix4();
			rots.setRotationAxis(sidesRotAxis[currentMove[2]], moveStep * currentMove[3] * Math.TAU / 4);

			var state = twisty.cubePieces;

			// Support negative layer indices (e.g. for rotations)
			//TODO: Bug 20110906, if negative index ends up the same as start index, the animation is iffy.
			var layerStart = currentMove[0];
			var layerEnd = currentMove[1];
			if (layerEnd < 0) {
				layerEnd = twisty.options.dimension + 1 + layerEnd;
			}
			var maxLayer = twisty.options.dimension - 2 * layerStart + 2.5;
			var minLayer = twisty.options.dimension - 2 * layerEnd - 0.5;
			var normVector = sidesNorm[currentMove[2]];

			for (var faceIndex = 0; faceIndex < numSides; faceIndex++) {
				var faceStickers = state[faceIndex];
				for (var stickerIndex = 0, faceStickerslength = faceStickers.length; stickerIndex < faceStickerslength; stickerIndex++) {
					// TODO - sticker isn't really a good name for this --jfly
					var sticker = faceStickers[stickerIndex];

					var layer = matrixVector3Dot(sticker[1].matrix, normVector);
					if (layer < maxLayer && layer > minLayer) {
						sticker[1].matrix.multiply(rots, sticker[1].matrix);
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

		function advanceMoveCallback(twisty, currentMove) {
			cntMove(twisty, currentMove);

			var rott = matrix4Power(sidesRot[currentMove[2]], currentMove[3]);

			var state = twisty.cubePieces;

			var maxLayer = twisty.options.dimension - 2 * currentMove[0] + 2.5;
			var minLayer = twisty.options.dimension - 2 * currentMove[1] - 0.5;
			var normVector = sidesNorm[currentMove[2]];

			for (var faceIndex = 0; faceIndex < numSides; faceIndex++) {
				var faceStickers = state[faceIndex];
				for (var stickerIndex = 0, faceStickerslength = faceStickers.length; stickerIndex < faceStickerslength; stickerIndex++) {
					// TODO - sticker isn't really a good name for this --jfly
					var sticker = faceStickers[stickerIndex];

					var layer = matrixVector3Dot(sticker[1].matrix, normVector);
					if (layer < maxLayer && layer > minLayer) {
						sticker[0].multiply(rott, sticker[0]);
						sticker[1].matrix.copy(sticker[0]);
						sticker[1].update();
					}
				}
			}
		}

		function toggleColorVisible(twisty, visible) {
			if (twisty.visible == visible) {
				return;
			}
			var state = twisty.cubePieces;
			for (var faceIndex = 0; faceIndex < numSides; faceIndex++) {
				var faceStickers = state[faceIndex];
				var faceColor = visible ? cubeOptions.faceColors[faceIndex] : 0x7f7f7f;
				for (var stickerIndex = 0, faceStickerslength = faceStickers.length; stickerIndex < faceStickerslength; stickerIndex++) {
					var sticker = faceStickers[stickerIndex];
					sticker[1].children[0].materials[0].color.setHex(faceColor);
				}
			}
		}

		function toggleColorVisibleHuge(twisty, colorVisible, borderVisible) {
			var dim = twisty.options.dimension;
			var state = twisty.cubePieces;
			var effLayers = {};
			effLayers[0] = 0;
			effLayers[1] = 0;
			effLayers[oSl - 1] = 0;
			effLayers[oSl + 0] = 0;
			effLayers[oSl + 1] = 0;
			effLayers[oSr - 1] = 0;
			effLayers[oSr + 0] = 0;
			effLayers[oSr + 1] = 0;
			for (var faceIndex = 0; faceIndex < numSides; faceIndex++) {
				var faceStickers = state[faceIndex];
				for (var stickerIndex = 0, faceStickerslength = faceStickers.length; stickerIndex < faceStickerslength; stickerIndex++) {
					var cord1 = stickerIndex % dim;
					var cord2 = ~~(stickerIndex / dim);
					var materials = faceStickers[stickerIndex][1].children[0].materials;
					var hit = cord1 in effLayers || (dim - 1 - cord1) in effLayers || cord2 in effLayers || (dim - 1 - cord2) in effLayers;
					materials[0].color.setHex(hit || colorVisible ? cubeOptions.faceColors[faceIndex] : 0x7f7f7f);
					if (hit || borderVisible) {
						materials[1] = twisty.borderMaterial;
					} else {
						materials.length = 1;
					}
				}
			}
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

		var oSl = 1;
		var oSr = 1;

		var iSi = cubeOptions.dimension;

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
				190: [oSr + 1, oSr + 1, "R", 1], //. M'
				88: [oSl + 1, oSl + 1, "L", -1], //X M'
				53: [oSl + 1, oSl + 1, "L", 1], //5 M
				54: [oSr + 1, oSr + 1, "R", -1], //6 M
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

		var cubeKeyMapping = generateCubeKeyMapping(oSl, oSr, iSi);

		updateHandMarks(handMarks, iSi, oSl, oSr);

		function keydownCallback(twisty, e) {
			if (e.altKey || e.ctrlKey) {
				return;
			}
			var keyCode = e.keyCode;
			var ret = false;
			if (keyCode == 51 || keyCode == 52 || keyCode == 55 || keyCode == 56 || keyCode == 32) {
				if (keyCode == 51) {
					oSl = Math.max(1, oSl - 1);
				} else if (keyCode == 52) {
					oSl = Math.min(oSl + 1, iSi - 1);
				} else if (keyCode == 55) {
					oSr = Math.min(oSr + 1, iSi - 1);
				} else if (keyCode == 56) {
					oSr = Math.max(1, oSr - 1);
				} else if (keyCode == 32) {
					oSl = oSr = 1;
				}
				cubeKeyMapping = generateCubeKeyMapping(oSl, oSr, iSi);
				updateHandMarks(twisty.handMarks, iSi, oSl, oSr);
				if (twisty.options.dimension > 7) {
					toggleColorVisibleHuge(twisty,
						kernel.getProp('vrcAH', '01')[0] == '0' ? false : true,
						kernel.getProp('vrcAH', '01')[1] == '0' ? false : true);
				}
				ret = true;
			}
			if (keyCode in cubeKeyMapping) {
				twistyScene.addMoves([cubeKeyMapping[keyCode]]);
			}
			return ret;
		}

		// return [[move1, tag1, vec1], [move2, tag2, vec2], ...]
		function getRaycastMoves(twisty, intObjs) {
			if (intObjs.length == 0) {
				return [];
			}
			var dimension = twisty.options.dimension;
			var coord = [];
			var xyXchg = [1, 0, 0, 1, 0, 0];
			var xInv = [1, -1, -1, -1, -1, -1];
			var yInv = [1, -1, 1, 1, 1, -1];
			var sticker = intObjs[0].object.parent;
			coord.push(Math.round(matrixVector3Dot(sticker.matrix, sidesNorm['U'])));
			coord.push(Math.round(matrixVector3Dot(sticker.matrix, sidesNorm['R'])));
			coord.push(Math.round(matrixVector3Dot(sticker.matrix, sidesNorm['F'])));
			var idx = coord.indexOf(dimension) + coord.indexOf(-dimension) + 1;
			var axis = idx + (coord[idx] > 0 ? 0 : 3);
			coord.splice(idx, 1);
			var xy = xyXchg[axis];
			var x = (coord[xy] * xInv[axis] + dimension - 1) / 2;
			var y = (coord[1 - xy] * yInv[axis] + dimension - 1) / 2;
			var axisNorm = sidesNorm[index_side[axis]];

			var ret = [];
			var move;
			for (var i = 0; i < 3; i++) {
				if (i == axis % 3) {
					continue;
				}
				var dvec3 = new THREE.Vector3().cross(sidesNorm[index_side[i]], intObjs[0].point);
				var ddot = dvec3.dot(axisNorm);
				dvec3.subSelf(axisNorm.clone().multiplyScalar(ddot));
				var xo = dimension - 1 - x;
				var yo = dimension - 1 - y;
				if (xo == x && yo == y) { // cube rotate
					move = [1, iSi, index_side[i], -1];
					ret.push([move, move2str(move), dvec3]);
					continue;
				}
				xy ^= 1;
				var d1 = xy ? x : y;
				var d2 = xy ? xo : yo;
				var opp = d1 > d2 ? -1 : 1;
				opp *= xy ? xInv[axis] : yInv[axis];
				move = [1, Math.min(d1, d2) + 1, index_side[opp < 0 ? i : (i + 3)], opp];
				if (d1 == d2) {
					move[0] = d1 + 1;
				}
				ret.push([move, move2str(move), dvec3]);
			}
			return ret;
		}

		//return 0 if solved
		//return n if n step remained
		function isSolved(twisty) {
			if (!twistyScene.isAnimationFinished()) {
				return 99;
			}
			if (twisty.options.dimension == 3) {
				var curProgress = cubeutil.getProgress(getFacelet(twisty), kernel.getProp('vrcMP', 'n'));
				return twistyScene.isMoveFinished() ? curProgress : Math.max(1, curProgress);
			}

			if (!twistyScene.isMoveFinished()) {
				return 1;
			}

			var state = twisty.cubePieces;
			var dimension = twisty.options.dimension;

			var maxLayer = twisty.options.dimension + 0.5;
			var minLayer = twisty.options.dimension - 0.5;

			for (var faceIndex = 0; faceIndex < numSides - 1; faceIndex++) {
				var normVector;
				var faceStickers = state[faceIndex];
				for (var faceSideIndex = 0; faceSideIndex < numSides; faceSideIndex++) {
					if (0.5 > Math.abs(matrixVector3Dot(faceStickers[0][0], normVector = sidesNorm[index_side[faceSideIndex]]) - dimension)) {
						break;
					}
				}
				for (var stickerIndex = 1, faceStickerslength = faceStickers.length; stickerIndex < faceStickerslength; stickerIndex++) {
					var sticker = faceStickers[stickerIndex];
					if (0.5 < Math.abs(matrixVector3Dot(sticker[0], normVector) - dimension)) {
						return 1;
					}
				}
			}
			return 0;
		}

		function getFacelet(twisty) {
			twisty = twisty || this;
			var ret = [];
			var state = twisty.cubePieces;
			var dimension = twisty.options.dimension;
			var xyXchg = [1, 0, 0, 1, 0, 0];
			var xInv = [1, -1, -1, -1, -1, -1];
			var yInv = [1, -1, 1, 1, 1, -1];
			for (var faceIndex = 0; faceIndex < numSides; faceIndex++) {
				var faceStickers = state[faceIndex];
				for (var stickerIndex = 0; stickerIndex < faceStickers.length; stickerIndex++) {
					var sticker = faceStickers[stickerIndex];
					var coord = [];
					coord.push(Math.round(matrixVector3Dot(sticker[0], sidesNorm['U'])));
					coord.push(Math.round(matrixVector3Dot(sticker[0], sidesNorm['R'])));
					coord.push(Math.round(matrixVector3Dot(sticker[0], sidesNorm['F'])));
					var idx = coord.indexOf(dimension) + coord.indexOf(-dimension) + 1;
					var axis = idx + (coord[idx] > 0 ? 0 : 3);
					coord.splice(idx, 1);
					var xy = xyXchg[axis];
					var x = (coord[xy] * xInv[axis] + dimension - 1) / 2;
					var y = (coord[1 - xy] * yInv[axis] + dimension - 1) / 2;
					ret[axis * dimension * dimension + x * dimension + y] = index_side[faceIndex];
				}
			}
			return ret.join("");
		}

		function isInspectionLegalMove(twisty, move) {
			return move[0] <= 1 && move[1] >= twisty.options.dimension;
		}

		function isParallelMove(twisty, move1, move2) {
			return "URFDLB".indexOf(move1[2]) % 3 == "URFDLB".indexOf(move2[2]) % 3;
		}

		function parseScramble(scramble, addPreScr) {
			if (!scramble || /^\s*$/.exec(scramble)) {
				return generateScramble(this);
			} else {
				var moves = cubeutil.parseScramble(scramble, "URFDLB", addPreScr);
				scramble = [];
				for (var i = 0; i < moves.length; i++) {
					if (moves[i][1] > 0) {
						var l1 = moves[i][1];
						var l2 = moves[i][3] == -1 ? 1 : moves[i][3];
						scramble.push([Math.min(l1, l2), Math.max(l1, l2), "URFDLB".charAt(moves[i][0]), [1, 2, -1][moves[i][2] - 1]]);
					} else {
						scramble.push([1, 100, "URFDLB".charAt(moves[i][0]), [1, 2, -1][-moves[i][2] - 1]]);
					}
				}
				return scramble;
			}
		}

		var counter = 0;
		var lastMove = -1;

		function cntMove(twisty, move) {
			if (!isInspectionLegalMove(twisty, move) && move[2] != lastMove) {
				counter++;
			}
			lastMove = move[2];
		}

		function moveCnt(clr) {
			if (clr) {
				counter = 0;
				lastMove = -1;
			}
			return counter;
		}

		function move2str(move) {
			var axis = move[2];
			var nlayer = move[1];
			var pow = (move[3] + 3) % 4;
			if (nlayer >= iSi) {
				return "yxz".charAt("URFDLB".indexOf(move[2]) % 3) +
					" 2'".charAt("URF".indexOf(move[2]) == -1 ? (2 - pow) : pow);
			} else if (move[0] == 1) {
				return (nlayer > 2 ? nlayer : '') + axis + (nlayer >= 2 ? 'w' : '') + " 2'".charAt(pow);
			} else {
				return move[0] + '-' + move[1] + move[2] + 'w' + " 2'".charAt(pow);
			}
		}

		function moveInv(move) {
			move = move.slice();
			move[3] = -move[3];
			return move;
		}

		function getTouchMoves() {
			return {
				61: ["u2", [1, 2, "U", 2]],
				62: ["B", [1, 1, "B", 1]],
				63: ["R", [1, oSr, "R", 1]],
				64: ["y2", [1, iSi, "U", 2]],
				65: ["y", [1, iSi, "U", 1]],
				67: ["F2", [1, 1, "F", 2]],
				68: ["M", [oSr + 1, oSr + 1, "R", -1]],
				69: ["F", [1, 1, "F", 1]],

				41: ["L'", [1, oSl, "L", -1]],
				42: ["B'", [1, 1, "B", -1]],
				43: ["u2'", [1, 2, "U", -2]],
				45: ["y'", [1, iSi, "U", -1]],
				46: ["y2'", [1, iSi, "U", -2]],
				47: ["F'", [1, 1, "F", -1]],
				48: ["M", [oSl + 1, oSl + 1, "L", 1]],
				49: ["F2'", [1, 1, "F", -2]],

				31: ["U2", [1, 1, "U", 2]],
				32: ["U", [1, 1, "U", 1]],
				34: ["u2", [1, 2, "U", 2]],
				35: ["u", [1, 2, "U", 1]],
				36: ["R'", [1, oSr, "R", -1]],
				37: ["z'", [1, iSi, "F", -1]],
				38: ["M2", [oSr + 1, oSr + 1, "R", -2]],
				39: ["R2'", [1, oSr, "R", -2]],

				12: ["U'", [1, 1, "U", -1]],
				13: ["U2'", [1, 1, "U", -2]],
				14: ["L", [1, oSl, "L", 1]],
				15: ["u'", [1, 2, "U", -1]],
				16: ["u2'", [1, 2, "U", -2]],
				17: ["L2", [1, oSl, "L", 2]],
				18: ["M2", [oSl + 1, oSl + 1, "L", 2]],
				19: ["z", [1, iSi, "F", 1]],

				91: ["z'", [1, iSi, "F", -1]],
				92: ["B2", [1, 1, "B", 2]],
				93: ["R2", [1, oSr, "R", 2]],
				94: ["F2'", [1, 1, "F", -2]],
				95: ["r", [1, oSr + 1, "R", 1]],
				96: ["F'", [1, 1, "F", -1]],
				97: ["D2'", [1, 1, "D", -2]],
				98: ["D'", [1, 1, "D", -1]],

				73: ["z", [1, iSi, "F", 1]],
				72: ["B2'", [1, 1, "B", -2]],
				71: ["L2'", [1, oSl, "L", -2]],
				76: ["F2", [1, 1, "F", 2]],
				75: ["l'", [1, oSl + 1, "L", -1]],
				74: ["F", [1, 1, "F", 1]],
				79: ["D2", [1, 1, "D", 2]],
				78: ["D", [1, 1, "D", 1]],

				21: ["U", [1, 1, "U", 1]],
				23: ["U'", [1, 1, "U", -1]],
				24: ["B", [1, 1, "B", 1]],
				25: ["x'", [1, iSi, "R", -1]],
				26: ["B'", [1, 1, "B", -1]],
				27: ["B2", [1, 1, "B", 2]],
				28: ["x2'", [1, iSi, "R", -2]],
				29: ["B2'", [1, 1, "B", -2]],

				51: ["u", [1, 2, "U", 1]],
				52: ["x", [1, iSi, "R", 1]],
				53: ["u'", [1, 2, "U", -1]],
				54: ["y", [1, iSi, "U", 1]],
				56: ["y'", [1, iSi, "U", -1]],
				57: ["l", [1, oSl + 1, "L", 1]],
				58: ["x'", [1, iSi, "R", -1]],
				59: ["r'", [1, oSr + 1, "R", -1]],

				81: ["M2'", [oSl + 1, oSl + 1, "L", -2]],
				82: ["x2", [1, iSi, "R", 2]],
				83: ["M2'", [oSr + 1, oSr + 1, "R", 2]],
				84: ["M'", [oSl + 1, oSl + 1, "L", -1]],
				85: ["x", [1, iSi, "R", 1]],
				86: ["M'", [oSr + 1, oSr + 1, "R", 1]],
				87: ["D'", [1, 1, "D", -1]],
				89: ["D", [1, 1, "D", 1]],
			};
		}

		return {
			type: twistyParameters,
			options: cubeOptions,
			_3d: cubeObject,
			cubePieces: cubePieces,
			handMarks: handMarks,
			animateMoveCallback: animateMoveCallback,
			advanceMoveCallback: advanceMoveCallback,
			toggleColorVisible: toggleColorVisible,
			keydownCallback: keydownCallback,
			getRaycastMoves: getRaycastMoves,
			getTouchMoves: getTouchMoves,
			isSolved: isSolved,
			isInspectionLegalMove: isInspectionLegalMove,
			isParallelMove: isParallelMove,
			generateScramble: generateScramble,
			parseScramble: parseScramble,
			getFacelet: getFacelet,
			moveCnt: moveCnt,
			borderMaterial: borderMaterial,
			move2str: move2str,
			moveInv: moveInv
		};
	}
})();
