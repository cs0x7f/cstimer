(function() {
	// keyMaps = "key:movestr key:movestr key:movestr..."
	// movestr: move|[+-]key1key2..., do move or adjust layer of keys
	function bindKeyMap(keyMaps, twisty) {
		keyMaps = keyMaps.split(' ');
		var moveActions = {}; // {keyCode: move}
		var layerActions = {}; // {keyCode: [layerDiff, keyCode1, keyCode2, ...]}, layerDiff = 1/-1
		var layerOffs = {}; // {keyCode: layerOffset, ...}
		var char2code = {
			39: 222, 44: 188, 45: 189, 46: 190,
			47: 191, 59: 186, 61: 187, 91: 219,
			92: 220, 93: 221, 96: 192
		};
		var layerActionsPre = {};
		for (var i = 0; i < keyMaps.length; i++) {
			var keyMap = keyMaps[i].split(':');
			if (keyMap.length != 2 || keyMap[0].length != 1) {
				continue;
			}
			var keyCode = keyMap[0].toUpperCase().charCodeAt(0);
			keyCode = char2code[keyCode] || keyCode;
			if (/^[+-]$/.exec(keyMap[1][0])) { // layerActions
				layerActionsPre[keyCode] = keyMap[1].toUpperCase(); // handle keyCodes later for move check
				continue;
			}
			var action = twisty.parseScramble(keyMap[1]);
			if (action.length != 1) {
				continue;
			}
			moveActions[keyCode] = action[0];
			layerOffs[keyCode] = 0;
		}
		for (var keyCode in layerActionsPre) {
			var layerAction = layerActionsPre[keyCode];
			var nIncs = [layerAction[0] == '+' ? 1 : -1];
			for (var i = 1; i < layerAction.length; i++) {
				var incKeyCode = layerAction.charCodeAt(i);
				incKeyCode = char2code[incKeyCode] || incKeyCode;
				if (incKeyCode in moveActions) {
					nIncs.push(incKeyCode);
				}
			}
			if (nIncs.length > 1) {
				layerActions[keyCode] = nIncs;
			}
		}
		twisty.handleKeyCode = function(puzzle, moveActions, layerActions, layerOffs, keyCode) {
			if (keyCode in moveActions) {
				var move = moveActions[keyCode].slice();
				if (layerOffs[keyCode]) { // change layer
					var m = /^(\d+)([a-zA-Z]+)$/.exec(move[0]);
					move[0] = "" + (~~m[1] + layerOffs[keyCode]) + m[2];
				}
				return move;
			} else if (keyCode in layerActions) {
				var nIncs = layerActions[keyCode];
				var nInc = nIncs[0];
				for (var i = 1; i < nIncs.length; i++) {
					var incKeyCode = nIncs[i];
					var m = /^(\d+)([a-zA-Z]+)$/.exec(moveActions[incKeyCode][0]);
					var newAxis = "" + (~~m[1] + layerOffs[incKeyCode] + nInc) + m[2];
					if (m[1] != '0' && newAxis[0] != '0' && (newAxis in puzzle.twistyIdx)) {
						layerOffs[incKeyCode] += nInc;
					}
				}
			}
		}.bind(null, twisty.puzzle, moveActions, layerActions, layerOffs);
		twisty.getAllMoves = function(puzzle, moveActions, layerActions) {
			var ret = [];
			var moveSets = {};
			for (var key in moveActions) { // each move might be adjusted by layer actions
				var move = moveActions[key];
				moveSets[move[0] + move[1]] = move;
				var m = /^(\d+)([a-zA-Z]+)$/.exec(move[0]);
				if (m[1] == '0') {
					continue;
				}
				var maxLayer;
				for (maxLayer = ~~m[1]; (maxLayer + 1 + m[2]) in puzzle.twistyIdx; maxLayer++) {}
				var layerIncs = {};
				for (var key2 in layerActions) { // cache the effective of all layerActions
					var nIncs = layerActions[key2];
					var layerInc = 0;
					for (var i = 1; i < nIncs.length; i++) {
						if (nIncs[i] == key) {
							layerInc += nIncs[0];
						}
					}
					if (layerInc != 0) {
						layerIncs[layerInc] = 1;
					}
				}
				var layers = {};
				layers[m[1]] = 1;
				var isUpdated;
				do {
					isUpdated = false;
					for (var layer in layers) {
						for (var layerInc in layerIncs) {
							var newLayer = "" + Math.max(1, Math.min(maxLayer, ~~layer + ~~layerInc));
							if (!(newLayer in layers)) {
								layers[newLayer] = 1;
								moveSets[newLayer + m[2] + move[1]] = [newLayer + m[2], move[1]];
								isUpdated = true;
							}
						}
					}
				} while (isUpdated);
			}
			for (var key in moveSets) {
				ret.push(moveSets[key]);
			}
			return ret;
		}.bind(null, twisty.puzzle, moveActions, layerActions);
	}

	twistyjs.registerTwisty("udpoly", function(scene, param) {
		var params = param.scramble.split('|');
		param.polyParam = poly3d.parsePolyParam(params[0]);
		var nFace = param.polyParam[0];
		if (nFace == 4) {
			param.faceColors = puzzleFactory.col2std(kernel.getProp("colpyr"), [3, 1, 2, 0]);
			param.scale *= 0.51;
		} else if (nFace == 6) {
			param.faceColors = puzzleFactory.col2std(kernel.getProp("colcube"), [3, 4, 5, 0, 1, 2]);
		} else if (nFace == 8) {
			param.faceColors = puzzleFactory.col2std(kernel.getProp("colfto"), [0, 3, 1, 2, 6, 7, 5, 4]);
		} else if (nFace == 12) {
			param.faceColors = puzzleFactory.col2std(kernel.getProp("colmgm"), [0, 2, 1, 5, 4, 3, 11, 9, 8, 7, 6, 10]);
			param.scale *= 1.18;
		} else if (nFace == 20) {
			param.faceColors = puzzleFactory.col2std(kernel.getProp("colico"), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
			param.scale *= 1.25;
		}
		var m = /gap:(0\.\d+)/.exec(params[1]);
		if (m) {
			param.pieceGap = parseFloat(m[1]);
		}
		var twisty = createCubeTwisty(scene, param, {});
		bindKeyMap(params[1], twisty);
		return twisty;
	});

	function mgmTwisty(type, scene, param) {
		poly3d.getFamousPuzzle(type, param);
		if (type == "klm") {
			param.minArea = 0.1;
		}
		var twisty = createCubeTwisty(scene, param, param.parser);
		bindKeyMap("I:R K:R' W:BR O:BR' S:DR L:DR' C:DL ,:DL' D:L E:L' J:U F:U' H:F G:F' ;:[u] A:[u'] U:R+ R:L- M:R- V:L+ T:[l'] Y:[r] N:[r'] B:[l] P:[f] Q:[f']", twisty);
		return twisty;
	}

	twistyjs.registerTwisty("klm", mgmTwisty.bind(null, "klm"));
	twistyjs.registerTwisty("mgm", mgmTwisty.bind(null, "mgm"));
	twistyjs.registerTwisty("prc", mgmTwisty.bind(null, "prc"));

	twistyjs.registerTwisty("pyr", function(scene, param) {
		poly3d.getFamousPuzzle("pyr", param);
		var twisty = createCubeTwisty(scene, param, param.parser);
		bindKeyMap("I:R K:R' W:B O:B' S:b L:b' D:L E:L' J:U F:U' H:u G:u' ;:[u] A:[u'] U:r M:r' R:l' V:l T:[l'] Y:[r] N:[r'] B:[l] P:[b'] Q:[b]", twisty);
		return twisty;
	});

	twistyjs.registerTwisty("fto", function(scene, param) {
		poly3d.getFamousPuzzle("fto", param);
		var twisty = createCubeTwisty(scene, param, param.parser);
		bindKeyMap("I:R K:R' W:BR O:BR' S:D L:D' D:L E:L' J:U F:U' H:F G:F' ;:[U] A:[U'] T:[L'] Y:[R] N:[R'] B:[L] P:[F] Q:[F']", twisty);
		return twisty;
	});

	function heliTwisty(type, scene, param) {
		param.polyParam = [6, [-2], {
			"heli": [-2, Math.sqrt(0.5)],
			"helicv": [-2, [2 * Math.sqrt(2), -Math.sqrt(5)]],
		}[type]];
		if (type == "helicv") {
			param.minArea = 0.15;
		}
		param.pieceGap = 0.075;
		var twisty = createCubeTwisty(scene, param, {});
		bindKeyMap("I:UR K:UR' W:BD O:BD' S:FD L:FD' D:UL E:UL' J:UB F:UB' H:UF G:UF' U:FR M:FR' R:FL' V:FL ;:[U] A:[U'] T:[L'] Y:[R] N:[R'] B:[L] P:[F] Q:[F']", twisty);
		return twisty;
	}

	twistyjs.registerTwisty("heli", heliTwisty.bind(null, "heli"));
	twistyjs.registerTwisty("helicv", heliTwisty.bind(null, "helicv"));
	twistyjs.registerTwisty("heli2x2", function(scene, param) {
		param.polyParam = [6, [-2, 0], [-2, [Math.sqrt(2), -0.6]], [-2, [Math.sqrt(3), -0.7]]];
		param.minArea = 0.01;
		param.pieceGap = 0.05;
		var twisty = createCubeTwisty(scene, param, {});
		bindKeyMap("I:UR K:UR' W:F' O:F S:U' L:U X:R .:R' D:UL E:UL' J:UB F:UB' H:UF G:UF' U:URF M:URF' R:UFL' V:UFL ;:[U] A:[U'] T:[L'] Y:[R] N:[R'] B:[L] P:[F] Q:[F']", twisty);
		return twisty;
	});

	function createCubeTwisty(twistyScene, twistyParameters, twistyFuncs) {

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

		var puzzle = poly3d.makePuzzle.apply(poly3d, twistyParameters.polyParam);
		DEBUG && console.log('[twistypoly] Create Puzzle', puzzle);
		var numSides = twistyParameters.polyParam[0];

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
			if (poly.area < (twistyParameters.minArea || 0)) {
				return;
			}
			var sticker = new THREE.Object3D();

			var meshes = [materials[face]];
			if (cubeOptions.stickerBorder) {
				meshes.push(borderMaterial);
			}
			var trimed = poly.trim(twistyParameters.pieceGap || 0.01);
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
			var puzzle = twisty.puzzle
			var moveIdx = puzzle.twistyIdx[currentMove[0]];
			if (moveIdx == undefined) {
				debugger; // invalid move
				return;
			}
			var rots = new THREE.Matrix4();
			var twistyPlane = puzzle.twistyPlanes[moveIdx];
			rots.setRotationAxis(twistyPlane.norm, -moveStep * Math.TAU * currentMove[1] / puzzle.twistyDetails[moveIdx][1]);

			puzzle.enumFacesPolys(function(face, p, poly, idx) {
				if (twistyPlane.side(poly.center) < 0) {
					return;
				}
				var sticker = twisty.cubePieces[idx];
				if (!sticker) {
					return;
				}
				sticker[1].matrix.multiply(rots, sticker[1].matrix);
				sticker[1].update();
			});
		}

		function advanceMoveCallback(twisty, currentMove) {

			cntMove(twisty, currentMove);
			var puzzle = twisty.puzzle;
			var moveIdx = puzzle.twistyIdx[currentMove[0]];
			if (moveIdx == undefined) {
				debugger; // invalid move
				return;
			}
			var twistyPlane = puzzle.twistyPlanes[moveIdx];
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
				if (!sticker) {
					continue;
				}
				nextState[i] = [sticker[2], sticker[1].children[0].materials];
			}
			for (var i = 0; i < perm.length; i++) {
				var sticker = twisty.cubePieces[i];
				if (!sticker) {
					continue;
				}
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

		function keydownCallback(twisty, e) {
			if (e.altKey || e.ctrlKey) {
				return;
			}
			var keyCode = e.keyCode;
			var move = twisty.handleKeyCode(keyCode);
			if (move) {
				twistyScene.addMoves([move]);
			}
		}

		function isSolved(twisty) {
			if (!twistyScene.isMoveFinished()) {
				return 1;
			}
			var faceMap = {};
			var ret = 0;
			puzzle.enumFacesPolys(function(face, p, poly, idx) {
				if (!twisty.cubePieces[idx]) {
					return;
				}
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
			return move[0][0] == '0';
		}

		function isParallelMove(twisty, move1, move2) {
			return move1[0] == move2[0];
		}

		function defaultParseScramble(scramble) {
			if (!scramble || /^\s*$/.exec(scramble)) {
				return [];
			}
			var ret = [];
			var puzzle = this.puzzle;
			var m = /seed:([0-9a-zA-Z]+)/.exec(scramble);
			if (m) {
				var seed = [];
				for (var i = 0; i < m[1].length; i++) {
					seed[i] = m[1].charCodeAt(i);
				}
				var validMoves = this.getAllMoves();
				if (validMoves.length == 0) {
					return [];
				}
				var rndFunc = new MersenneTwisterObject(seed[0], seed);
				for (var i = 0; i < 100; i++) {
					ret.push(validMoves[~~(validMoves.length * rndFunc())]);
				}
				return ret;

			}
			scramble.replace(/(?:^|\s*)(?:\[([a-zA-Z]+)(\d*)('?)\]|(\d*)([A-Z][a-zA-Z]*)(\d*)('?))(?:$|\s*)/g, function(m, p1, p2, p3, p4, p5, p6, p7) {
				var layer, axis, pow;
				if (p1) {
					layer = '0';
					axis = p1;
					pow = (p2 == '' ? 1 : ~~p2) * (p3 ? -1 : 1);
				} else {
					layer = p4 == '' ? '1' : p4;
					axis = p5;
					pow = (p6 == '' ? 1 : ~~p6) * (p7 ? -1 : 1);
				}
				var faces = axis.match(/[A-Z][a-z]*/g);
				var tmp;
				for (var i = 0; i < [0, 1, 2, 6][faces.length]; i++) {
					axis = faces.join('');
					if ((layer + axis) in puzzle.twistyIdx) {
						ret.push([layer + axis, pow]);
						break;
					}
					tmp = faces[0]; faces[0] = faces[1]; faces[1] = tmp;
					if (i % 2 == 1) {
						tmp = faces[0]; faces[0] = faces[1]; faces[1] = faces[2]; faces[2] = tmp;
					}
				}
			});
			return ret;
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

		function defaultMove2str(move) {
			var m = /^(\d+)([a-zA-Z]+)$/.exec(move[0]);
			var move = move[0] + (Math.abs(move[1]) == 1 ? "" : Math.abs(move[1])) + (move[1] < 0 ? "'" : "");
			if (m[1] == '0') {
				return '[' + move.slice(1) + ']';
			} else if (m[1] == '1') {
				return move.slice(1);
			}
			return move;
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
			puzzle: puzzle,
			animateMoveCallback: animateMoveCallback,
			advanceMoveCallback: advanceMoveCallback,
			keydownCallback: keydownCallback,
			isSolved: isSolved,
			isInspectionLegalMove: isInspectionLegalMove,
			isParallelMove: isParallelMove,
			generateScramble: generateScramble,
			parseScramble: twistyFuncs.parseScramble || defaultParseScramble,
			moveCnt: moveCnt,
			move2str: twistyFuncs.move2str || defaultMove2str,
			moveInv: moveInv
		};
	}
})();
