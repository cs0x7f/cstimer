(function() {
	// keyMaps = "key:movestr key:movestr key:movestr..."
	// movestr: move|[+-]key1key2..., do move or adjust layer of keys
	function bindKeyMap(keyMaps, twisty) {
		keyMaps = keyMaps.split(' ');
		var moveActions = {}; // {keyCode: move}
		var touchActions = {}; // {gesture: [moveStr, move]}
		var hasTouch = false;
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
			if (keyMap.length != 2 || !/^(.|\d\d)$/.exec(keyMap[0])) {
				continue;
			}
			if (keyMap[0].length == 2) { // gestures
				var action = twisty.parseScramble(keyMap[1]);
				if (action.length == 1) {
					touchActions[keyMap[0]] = [keyMap[1], action[0]];
					hasTouch = true;
				}
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
					if (m[1] != '0' && newAxis[0] != '0' && puzzle.getTwistyIdx(newAxis) != -1) {
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
				for (maxLayer = ~~m[1]; puzzle.getTwistyIdx(maxLayer + 1 + m[2]) != -1; maxLayer++) {}
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

		if (hasTouch) {
			twisty.getTouchMoves = function(touchActions) {
				return touchActions;
			}.bind(null, touchActions);
		}
	}

	twistyjs.registerTwisty("udpoly", function(scene, param) {
		var params = param.scramble.split('|');
		param.polyParam = poly3d.parsePolyParam(params[0]);
		var nFace = param.polyParam[0];
		if (nFace == 4) {
			param.faceColors = $.col2std(kernel.getProp("colpyr"), [3, 1, 2, 0]);
			param.scale *= 0.51;
		} else if (nFace == 6) {
			param.faceColors = $.col2std(kernel.getProp("colcube"), [3, 4, 5, 0, 1, 2]);
		} else if (nFace == 8) {
			param.faceColors = $.col2std(kernel.getProp("colfto"), [0, 3, 1, 2, 6, 7, 5, 4]);
		} else if (nFace == 12) {
			param.faceColors = $.col2std(kernel.getProp("colmgm"), [0, 2, 1, 5, 4, 3, 11, 9, 8, 7, 6, 10]);
			param.scale *= 1.18;
		} else if (nFace == 20) {
			param.faceColors = $.col2std(kernel.getProp("colico"), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
			param.scale *= 1.25;
		}
		var m = /gap:(0\.\d+)/.exec(params[1]);
		if (m) {
			param.pieceGap = parseFloat(m[1]);
		}
		var twisty = createCubeTwisty(scene, param);
		bindKeyMap(params[1], twisty);
		return twisty;
	});

	function mgmTwisty(type, scene, param) {
		poly3d.getFamousPuzzle(type, param);
		if (type == "klm") {
			param.minArea = 0.1;
		}
		var twisty = createCubeTwisty(scene, param);
		bindKeyMap(type != "giga"
			? "I:R K:R' W:BR O:BR' S:DR L:DR' C:DL ,:DL' D:L E:L' J:U F:U' H:F G:F' ;:[u] A:[u'] U:R+ R:L- M:R- V:L+ T:[l'] Y:[r] N:[r'] B:[l] P:[f] Q:[f'] 62:BR 63:R 64:[u2] 65:[u] 67:F2 69:F 41:L' 42:BR' 45:[u'] 46:[u2'] 47:F' 49:F2' 31:U2 32:U 36:R' 37:[f'] 39:R2' 12:U' 13:U2' 14:L 17:L2 19:[f] 91:[f'] 92:BR2 93:R2 94:F2' 96:F' 97:DR2' 98:DR' 73:[f] 72:BR2' 71:L2' 76:F2 74:F 79:DR2 78:DR 21:U 23:U' 24:BR 25:[r'] 26:BR' 27:BR2 28:[r2'] 29:BR2' 52:[r] 54:[u] 56:[u'] 58:[r'] 82:[r2] 85:[r] 87:DR' 89:DR"
			: "I:R K:R' W:BR O:BR' S:DR L:DR' C:DL ,:DL' D:L E:L' J:U F:U' H:F G:F' ;:[u] A:[u'] U:r R:l' M:r' V:l T:[l'] Y:[r] N:[r'] B:[l] P:[f] Q:[f'] 61:u2 62:BR 63:R 64:[u2] 65:[u] 67:F2 69:F 41:L' 42:BR' 43:u2' 45:[u'] 46:[u2'] 47:F' 49:F2' 31:U2 32:U 34:u2 35:u 36:R' 37:[f'] 39:R2' 12:U' 13:U2' 14:L 15:u' 16:u2' 17:L2 19:[f] 91:[f'] 92:BR2 93:R2 94:F2' 95:r 96:F' 97:DR2' 98:DR' 73:[f] 72:BR2' 71:L2' 76:F2 75:l' 74:F 79:DR2 78:DR 21:U 23:U' 24:BR 25:[r'] 26:BR' 27:BR2 28:[r2'] 29:BR2' 51:u 52:[r] 53:u' 54:[u] 56:[u'] 57:l 58:[r'] 59:r' 82:[r2] 85:[r] 87:DR' 89:DR", twisty);
		return twisty;
	}

	twistyjs.registerTwisty("klm", mgmTwisty.bind(null, "klm"));
	twistyjs.registerTwisty("mgm", mgmTwisty.bind(null, "mgm"));
	twistyjs.registerTwisty("prc", mgmTwisty.bind(null, "prc"));
	twistyjs.registerTwisty("giga", mgmTwisty.bind(null, "giga"));

	twistyjs.registerTwisty("pyr", function(scene, param) {
		poly3d.getFamousPuzzle("pyr", param);
		var twisty = createCubeTwisty(scene, param);
		bindKeyMap("I:R K:R' W:B O:B' S:b L:b' D:L E:L' J:U F:U' H:u G:u' ;:[u] A:[u'] U:r M:r' R:l' V:l T:[l'] Y:[r] N:[r'] B:[l] P:[b'] Q:[b] 61:u2 62:B 63:R 64:[u2] 65:[u] 67:F2 69:F 41:L' 42:B' 43:u2' 45:[u'] 46:[u2'] 47:F' 49:F2' 31:U2 32:U 34:u2 35:u 36:R' 37:[f'] 39:R2' 12:U' 13:U2' 14:L 15:u' 16:u2' 17:L2 19:[f] 91:[f'] 92:B2 93:R2 94:F2' 95:r 96:F' 97:D2' 98:D' 73:[f] 72:B2' 71:L2' 76:F2 75:l' 74:F 79:D2 78:D 21:U 23:U' 24:B 25:[r'] 26:B' 27:B2 28:[r2'] 29:B2' 51:u 52:[r] 53:u' 54:[u] 56:[u'] 57:l 58:[r'] 59:r' 82:[r2] 85:[r] 87:D' 89:D", twisty);
		return twisty;
	});

	twistyjs.registerTwisty("mpyr", function(scene, param) {
		poly3d.getFamousPuzzle("mpyr", param);
		var twisty = createCubeTwisty(scene, param);
		bindKeyMap("I:R K:R' W:B O:B' S:Bw L:Bw' D:L E:L' J:U F:U' H:Uw G:Uw' ;:[u] A:[u'] U:Rw M:Rw' R:Lw' V:Lw T:[l'] Y:[r] N:[r'] B:[l] P:[b'] Q:[b] 5:u' 6:u X:b .:b' 1:l 2:l' 9:r 0:r'", twisty);
		return twisty;
	});

	twistyjs.registerTwisty("redi", function(scene, param) {
		poly3d.getFamousPuzzle("redi", param);
		var twisty = createCubeTwisty(scene, param);
		bindKeyMap("I:R K:R' E:L' D:L H:F G:F' J:B F:B' L:f' S:f ;:y A:y' U:r M:r' R:l' V:l T:x Y:x N:x' B:x' P:z Q:z'", twisty);
		return twisty;
	});

	twistyjs.registerTwisty("dino", function(scene, param) {
		poly3d.getFamousPuzzle("dino", param);
		var twisty = createCubeTwisty(scene, param);
		bindKeyMap("I:R K:R' E:L' D:L H:F G:F' J:B F:B' L:f' S:f ;:y A:y' U:r M:r' R:l' V:l T:x Y:x N:x' B:x' P:z Q:z'", twisty);
		return twisty;
	});

	twistyjs.registerTwisty("fto", function(scene, param) {
		poly3d.getFamousPuzzle("fto", param);
		var twisty = createCubeTwisty(scene, param);
		bindKeyMap("I:R K:R' D:L E:L' J:U F:U' H:F G:F' S:D L:D' W:B O:B' 8:BR ,:BR' C:BL 3:BL' U:Rw M:Rw' R:Lw' V:Lw Y:[R] N:[R'] T:[L'] B:[L] ;:[U] A:[U'] P:T Q:T' 62:BR 63:R 64:[U2] 65:[U] 67:F2 69:F 41:L' 42:BR' 45:[U'] 46:[U2'] 47:F' 49:F2' 31:U2 32:U 36:R' 37:[F'] 39:R2' 12:U' 13:U2' 14:L 17:L2 19:[F] 91:[F'] 92:BR2 93:R2 94:F2' 96:F' 97:D2' 98:D' 73:[F] 72:BR2' 71:L2' 76:F2 74:F 79:D2 78:D 21:U 23:U' 24:BR 25:[R'] 26:BR' 27:BR2 28:[R2'] 29:BR2' 52:[R] 54:[U] 56:[U'] 58:[R'] 82:[R2] 85:[R] 87:D' 89:D", twisty);
		return twisty;
	});

	twistyjs.registerTwisty("dmd", function(scene, param) {
		poly3d.getFamousPuzzle("dmd", param);
		var twisty = createCubeTwisty(scene, param);
		bindKeyMap("I:R K:R' D:L E:L' J:U F:U' H:F G:F' S:D L:D' W:B O:B' 8:BR ,:BR' C:BL 3:BL' Y:[R] N:[R'] T:[L'] B:[L] ;:[U] A:[U'] P:T Q:T' 62:BR 63:R 64:[U2] 65:[U] 67:F2 69:F 41:L' 42:BR' 45:[U'] 46:[U2'] 47:F' 49:F2' 31:U2 32:U 36:R' 37:[F'] 39:R2' 12:U' 13:U2' 14:L 17:L2 19:[F] 91:[F'] 92:BR2 93:R2 94:F2' 96:F' 97:D2' 98:D' 73:[F] 72:BR2' 71:L2' 76:F2 74:F 79:D2 78:D 21:U 23:U' 24:BR 25:[R'] 26:BR' 27:BR2 28:[R2'] 29:BR2' 52:[R] 54:[U] 56:[U'] 58:[R'] 82:[R2] 85:[R] 87:D' 89:D", twisty);
		return twisty;
	});

	function heliTwisty(type, scene, param) {
		param.polyParam = [6, [-5], {
			"heli": [-5, Math.sqrt(0.5)],
			"helicv": [-5, [2 * Math.sqrt(2), -Math.sqrt(5)]],
		}[type]];
		if (type == "helicv") {
			param.minArea = 0.15;
		}
		param.pieceGap = 0.075;
		var twisty = createCubeTwisty(scene, param);
		bindKeyMap("I:UR K:UR' W:BD O:BD' S:FD L:FD' D:UL E:UL' J:UB F:UB' H:UF G:UF' U:FR M:FR' R:FL' V:FL ;:[U] A:[U'] T:[L'] Y:[R] N:[R'] B:[L] P:[F] Q:[F'] 62:BD 63:UR 64:[U2] 65:[U] 67:UF2 69:UF 41:UL' 42:BD' 45:[U'] 46:[U2'] 47:UF' 49:UF2' 31:UB2 32:UB 36:UR' 37:[F'] 39:UR2' 12:UB' 13:UB2' 14:UL 17:UL2 19:[F] 91:[F'] 92:BD2 93:UR2 94:UF2' 96:UF' 97:FD2' 98:FD' 73:[F] 72:BD2' 71:UL2' 76:UF2 74:UF 79:FD2 78:FD 21:UB 23:UB' 24:BD 25:[R'] 26:BD' 27:BD2 28:[R2'] 29:BD2' 52:[R] 54:[U] 56:[U'] 58:[R'] 82:[R2] 85:[R] 87:FD' 89:FD", twisty);
		return twisty;
	}

	twistyjs.registerTwisty("heli", heliTwisty.bind(null, "heli"));
	twistyjs.registerTwisty("helicv", heliTwisty.bind(null, "helicv"));
	twistyjs.registerTwisty("heli2x2", function(scene, param) {
		param.polyParam = [6, [-5, 0], [-5, [Math.sqrt(2), -0.6]], [-5, [Math.sqrt(3), -0.7]]];
		param.minArea = 0.01;
		param.pieceGap = 0.05;
		var twisty = createCubeTwisty(scene, param);
		bindKeyMap("I:UR K:UR' W:F' O:F S:U' L:U X:R .:R' D:UL E:UL' J:UB F:UB' H:UF G:UF' U:URF M:URF' R:UFL' V:UFL ;:[U] A:[U'] T:[L'] Y:[R] N:[R'] B:[L] P:[F] Q:[F']", twisty);
		return twisty;
	});

	twistyjs.registerTwisty("crz3a", function(scene, param) {
		poly3d.getFamousPuzzle("crz3a", param);
		var twisty = createCubeTwisty(scene, param);
		bindKeyMap("I:R K:R' W:B O:B' S:D L:D' D:L E:L' J:U F:U' H:F G:F' ;:y A:y' T:x Y:x N:x' B:x' P:z Q:z' 62:B 63:R 64:y2 65:y 67:F2 69:F 41:L' 42:B' 45:y' 46:y2' 47:F' 49:F2' 31:U2 32:U 36:R' 37:z' 39:R2' 12:U' 13:U2' 14:L 17:L2 19:z 91:z' 92:B2 93:R2 94:F2' 96:F' 97:D2' 98:D' 73:z 72:B2' 71:L2' 76:F2 74:F 79:D2 78:D 21:U 23:U' 24:B 25:x' 26:B' 27:B2 28:x2' 29:B2' 52:x 54:y 56:y' 58:x' 82:x2 85:x 87:D' 89:D", twisty);
		return twisty;
	});

	twistyjs.registerTwisty("ctico", function(scene, param) {
		poly3d.getFamousPuzzle("ctico", param);
		param.pieceGap = 0.05;
		return createCubeTwisty(scene, param);
	});

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

		var puzzle = poly3d.makePuzzle.apply(poly3d, twistyParameters.polyParam);
		DEBUG && console.log('[twistypoly] Create Puzzle', puzzle);
		var parser = twistyParameters.parser || poly3d.makePuzzleParser(puzzle);
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
			var moveIdx = puzzle.getTwistyIdx(currentMove[0]);
			if (moveIdx == undefined) {
				debugger; // invalid move
				return;
			}
			var rots = new THREE.Matrix4();
			var twistyPlane = puzzle.twistyPlanes[puzzle.twistyDetails[moveIdx][2]];
			var perm = puzzle.moveTable[moveIdx];
			rots.setRotationAxis(twistyPlane.norm, -moveStep * Math.TAU * currentMove[1] / puzzle.twistyDetails[moveIdx][1]);

			puzzle.enumFacesPolys(function(face, p, poly, idx) {
				if (perm[idx] < 0) {
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
			var moveIdx = puzzle.getTwistyIdx(currentMove[0]);
			if (moveIdx == undefined) {
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
					val = perm[val] < 0 ? val : perm[val];
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

		function parseScramble(scramble) {
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
				var iscache = isaac.internals();
				isaac.seed(seed);
				var ret = [];
				for (var i = 0; i < 100; i++) {
					ret.push(validMoves[~~(validMoves.length * isaac.random())]);
				}
				isaac.internals(iscache);
				return ret;
			}
			return this.parser.parseScramble(scramble);
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
			parser: parser,
			animateMoveCallback: animateMoveCallback,
			advanceMoveCallback: advanceMoveCallback,
			keydownCallback: keydownCallback,
			isSolved: isSolved,
			isInspectionLegalMove: isInspectionLegalMove,
			isParallelMove: isParallelMove,
			generateScramble: generateScramble,
			parseScramble: parseScramble,
			moveCnt: moveCnt,
			move2str: parser.move2str,
			moveInv: moveInv
		};
	}
})();
