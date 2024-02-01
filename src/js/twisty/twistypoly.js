(function() {
	// keyMaps = "key:movestr key:movestr key:movestr..."
	function parseKeyMap(keyMaps, twisty) {
		keyMaps = keyMaps.split(' ');
		var ret = {};
		var char2code = {
			39: 222, 44: 188, 45: 189, 46: 190,
			47: 191, 59: 186, 61: 187, 91: 219,
			92: 220, 93: 221, 96: 192
		};
		for (var i = 0; i < keyMaps.length; i++) {
			var keyMap = keyMaps[i].split(':');
			if (keyMap.length != 2 || keyMap[0].length != 1) {
				continue;
			}
			var keyCode = keyMap[0].charCodeAt(0);
			keyCode = char2code[keyCode] || keyCode;
			var action = twisty.parseScramble(keyMap[1]);
			if (action.length == 1) {
				ret[keyCode] = action[0];
			}
		}
		return ret;
	}

	twistyjs.registerTwisty("udpoly", function(scene, param) {
		var params = param.scramble.split('|');
		var paramCmd = params[0].split(/\s+/g);
		var polyIdx = 'tcodi'.indexOf(paramCmd[0]);
		param.scale *= [0.51, 1, 1, 1.18, 1.25][polyIdx];
		var nFace = [4, 6, 8, 12, 20][polyIdx];
		param.polyParam = [nFace, [-2], [-2], [-2]];
		if (nFace == 4) {
			param["faceColors"] = puzzleFactory.col2std(kernel.getProp("colpyr"), [3, 1, 2, 0]);
		} else if (nFace == 6) {
			param["faceColors"] = puzzleFactory.col2std(kernel.getProp("colcube"), [3, 4, 5, 0, 1, 2]);
		} else if (nFace == 8) {
			param["faceColors"] = puzzleFactory.col2std(kernel.getProp("colfto"), [0, 3, 1, 2, 6, 7, 5, 4]);
		} else if (nFace == 12) {
			param["faceColors"] = puzzleFactory.col2std(kernel.getProp("colmgm"), [0, 2, 1, 5, 4, 3, 11, 9, 8, 7, 6, 10]);
		}
		var curIdx = 0;
		for (var i = 1; i < paramCmd.length; i++) {
			if (/^[cvf]$/.exec(paramCmd[i])) {
				cutIdx = ' fev'.indexOf(paramCmd[i]);
				continue;
			} else if (/^[+-]?\d+(?:\.\d+)$/.exec(paramCmd[i])) {
				param.polyParam[cutIdx].push(parseFloat(paramCmd[i]));
			}
		}
		var m = /gap:(0\.\d+)/.exec(params[1]);
		if (m) {
			param.pieceGap = parseFloat(m[1]);
		}
		var twisty = createCubeTwisty(scene, param, {
			getCubeKeyMapping: function() {
				return cubeKeyMapping;
			}
		});
		var cubeKeyMapping = parseKeyMap(params[1], twisty);
		return twisty;
	});

	twistyjs.registerTwisty("mgm", function(scene, param) {
		param.polyParam = [12, [-2, 0.72, -0.72]];
		param.scale *= 1.18;
		param.pieceGap = 0.05;
		var twisty = createCubeTwisty(scene, param, {
			parseScramble: function(scramble) {
				if (!scramble || /^\s*$/.exec(scramble)) {
					return [];
				}
				var ret = [];
				if (/^(\s*([+-]{2}\s*)+U'?\s*\n)*$/.exec(scramble)) {
					scramble = tools.carrot2poch(scramble);
				}
				scramble.replace(/(?:^|\s*)(?:([DLR])(\+\+?|--?)|(U|F|D?B?R|D?B?L|D|B)(\d?)('?)|\[([ufrl])('?)\])(?:$|\s*)/g, function(m, p1, p2, p3, p4, p5, p6, p7) {
					var move;
					if (p1) {
						move = ['2' + ["D", "Dbl", "Dbr"]["DLR".indexOf(p1)], (p2[0] == '-' ? -1 : 1) * p2.length];
					} else if (p3) {
						move = ['1' + p3[0] + p3.slice(1).toLowerCase(), (p5 ? -1 : 1) * (~~p4 || 1)];
					} else {
						move = ['0' + p6.toUpperCase(), p7 ? -1 : 1];
					}
					ret.push(move);
				});
				return ret;
			},
			move2str: function(move) {
				var axis = move[0];
				var pow = (move[1] + 7) % 5 - 2;
				var powfix = (Math.abs(pow) == 1 ? "" : Math.abs(pow)) + (pow >= 0 ? "" : "'");
				if (axis[0] == '0') {
					return "[" + axis.slice(1).toLowerCase() + powfix + "]";
				} else if (axis[0] == '2') {
					powfix = pow > 0 ? "+" : "-";
					return "DLR".charAt(["2D", "2Dbl", "2Dbr"].indexOf(axis)) + powfix + (Math.abs(pow) == 2 ? powfix : '');
				} else if (axis[0] == '1') {
					return axis.slice(1).toUpperCase() + powfix;
				}
			},
			getCubeKeyMapping: function() {
				return cubeKeyMapping;
			}
		});
		var cubeKeyMapping = parseKeyMap("I:R K:R' W:BR O:BR' S:DR L:DR' C:DL ,:DL' D:L E:L' J:U F:U' H:F G:F' ;:[u] A:[u'] U:R+ R:L- M:R- V:L+ T:[l'] Y:[r] N:[r'] B:[l] P:[f] Q:[f']", twisty);
		return twisty;
	});

	twistyjs.registerTwisty("pyr", function(scene, param) {
		param.polyParam = [4, [], [], [-2, 1/3, 5/3]];
		param.scale *= 0.51;
		param.pieceGap = 0.14;
		var twisty = createCubeTwisty(scene, param, {
			parseScramble: function(scramble) {
				if (!scramble || /^\s*$/.exec(scramble)) {
					return [];
				}
				var ret = [];
				scramble.replace(/(?:^|\s*)(?:([URLBurlb])(')?|\[([urlb])(')?\])(?:$|\s*)/g, function(m, p1, p2, p3, p4) {
					var face = ["LRF", "DRF", "DLF", "DLR"]["URLB".indexOf((p1 || p3).toUpperCase())];
					ret.push([(p3 ? '0' : p1 == p1.toUpperCase() ? '1' : '2') + face, (p2 || p4) ? -1 : 1]);
				});
				return ret;
			},
			move2str: function(move) {
				var face = "urlb".charAt(["LRF", "DRF", "DLF", "DLR"].indexOf(move[0].slice(1)));
				var pow = move[1] < 0 ? "'" : "";
				return ["[" + face + pow + "]", face.toUpperCase() + pow, face + pow][~~move[0][0]];
			},
			getCubeKeyMapping: function() {
				return cubeKeyMapping;
			}
		});
		var cubeKeyMapping = parseKeyMap("I:R K:R' W:B O:B' S:b L:b' D:L E:L' J:U F:U' H:u G:u' ;:[u] A:[u'] U:r M:r' R:l' V:l T:[l'] Y:[r] N:[r'] B:[l] P:[b'] Q:[b]", twisty);
		return twisty;
	});

	twistyjs.registerTwisty("fto", function(scene, param) {
		param.polyParam = [8, [-2, 1/3]];
		param.pieceGap = 0.075;
		var twisty = createCubeTwisty(scene, param, {
			parseScramble: function(scramble) {
				if (!scramble || /^\s*$/.exec(scramble)) {
					return [];
				}
				var ret = [];
				scramble.replace(/(?:^|\s*)\[?([URFDL]|(?:B[RL]?))(')?(\])?(?:$|\s*)/g, function(m, p1, p2, p3) {
					ret.push(["" + (p3 ? 0 : 1) + p1[0] + p1.slice(1).toLowerCase(), p2 ? -1 : 1]);
				});
				return ret;
			},
			move2str: function(move) {
				var move = move[0].toUpperCase() + (move[1] == 1 ? "" : "'");
				if (move[0] == '0') {
					return '[' + move.slice(1) + ']';
				}
				return move.slice(1);
			},
			getCubeKeyMapping: function() {
				return cubeKeyMapping;
			}
		});
		var cubeKeyMapping = parseKeyMap("I:R K:R' W:BR O:BR' S:D L:D' D:L E:L' J:U F:U' H:F G:F' ;:[U] A:[U'] T:[L'] Y:[R] N:[R'] B:[L] P:[F] Q:[F']", twisty);
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

		function keydownCallback(twisty, e) {
			if (e.altKey || e.ctrlKey) {
				return;
			}
			var keyCode = e.keyCode;
			var cubeKeyMapping = twisty.getCubeKeyMapping();
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
				var validMoves = [];
				var cubeKeyMapping = this.getCubeKeyMapping();
				for (var key in cubeKeyMapping) {
					validMoves.push(cubeKeyMapping[key]);
				}
				if (validMoves.length == 0) {
					return 0;
				}
				var rndFunc = new MersenneTwisterObject(seed[0], seed);
				for (var i = 0; i < 100; i++) {
					ret.push(validMoves[~~(validMoves.length * rndFunc())]);
				}
				return ret;

			}
			scramble.replace(/(?:^|\s*)(?:\[([a-zA-Z]+)(\d*)('?)\]|(\d*)([a-zA-Z]+)(\d*)('?))(?:$|\s*)/g, function(m, p1, p2, p3, p4, p5, p6, p7) {
				var axis, pow;
				if (p1) {
					axis = '0' + p1;
					pow = (p2 == '' ? 1 : ~~p2) * (p3 ? -1 : 1);
				} else {
					axis = (p4 == '' ? '1' : p4) + p5;
					pow = (p6 == '' ? 1 : ~~p6) * (p7 ? -1 : 1);
				}
				if (!(axis in puzzle.twistyIdx)) {
					return;
				}
				ret.push([axis, pow]);
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
			var move = move[0].toUpperCase() + (move[1] == 1 ? "" : "'");
			if (move[0] == '0') {
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
			puzzle: puzzle,
			animateMoveCallback: animateMoveCallback,
			advanceMoveCallback: advanceMoveCallback,
			keydownCallback: keydownCallback,
			isSolved: isSolved,
			isInspectionLegalMove: isInspectionLegalMove,
			isParallelMove: isParallelMove,
			generateScramble: generateScramble,
			parseScramble: twistyFuncs.parseScramble || defaultParseScramble,
			getCubeKeyMapping: twistyFuncs.getCubeKeyMapping || function() { return {}; },
			moveCnt: moveCnt,
			move2str: twistyFuncs.move2str || defaultMove2str,
			moveInv: moveInv
		};
	}
})();
