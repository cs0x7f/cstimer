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
            for (var su = 0; su < cubeOptions.dimension; su++) {
                for (var sv = 0; sv < cubeOptions.dimension; sv++) {

                    var sticker = new THREE.Object3D();

                    var meshes = [materials[i]];
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

        var iS = 1;
        var oS = 1;

        var oSl = 1;
        var oSr = 1;

        var iSi = cubeOptions.dimension;

        function generateCubeKeyMapping(iS, oS, oSl, oSr, iSi) {
            return {
                73: [iS, oSr, "R", 1], //I R
                75: [iS, oSr, "R", -1], //K R'
                87: [iS, oS, "B", 1], //W B
                79: [iS, oS, "B", -1], //O B'
                83: [iS, oS, "D", 1], //S D
                76: [iS, oS, "D", -1], //L D'
                68: [iS, oSl, "L", 1], //D L
                69: [iS, oSl, "L", -1], //E L'
                74: [iS, oS, "U", 1], //J U
                70: [iS, oS, "U", -1], //F U'
                72: [iS, oS, "F", 1], //H F
                71: [iS, oS, "F", -1], //G F'
                186: [iS, iSi, "U", 1], //; y
                59: [iS, iSi, "U", 1], //y (TODO - why is this needed for firefox?)
                65: [iS, iSi, "U", -1], //A y'
                85: [iS, oSr + 1, "R", 1], //U r
                82: [iS, oSl + 1, "L", -1], //R l'
                77: [iS, oSr + 1, "R", -1], //M r'
                86: [iS, oSl + 1, "L", 1], //V l
                84: [iS, iSi, "L", -1], //T x
                89: [iS, iSi, "R", 1], //Y x
                78: [iS, iSi, "R", -1], //N x'
                66: [iS, iSi, "L", 1], //B x'
                190: [2, 2, "R", 1], //. M'
                88: [2, 2, "L", -1], //X M'
                53: [2, 2, "R", -1], //5 M
                54: [2, 2, "L", 1], //6 M
                80: [iS, iSi, "F", 1], //P z
                81: [iS, iSi, "F", -1], //Q z'
                90: [iS, iS + 1, "D", 1], //Z d
                67: [iS, iS + 1, "U", -1], //C u'
                188: [iS, iS + 1, "U", 1], //, u
                191: [iS, iS + 1, "D", -1] /// d'
            }
        }

        var cubeKeyMapping = generateCubeKeyMapping(iS, oS, oSl, oSr, iSi);

        function keydownCallback(twisty, e) {
            if (e.altKey || e.ctrlKey) {
                return;
            }
            var keyCode = e.keyCode;
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
                cubeKeyMapping = generateCubeKeyMapping(iS, oS, oSl, oSr, iSi);
            }
            if (keyCode in cubeKeyMapping) {
                twistyScene.addMoves([cubeKeyMapping[keyCode]]);
            }
        }

        //return 0 if solved
        //return n if n step remained
        function isSolved(twisty) {
            if (!twistyScene.isAnimationFinished()) {
                return 4;
            }
            if (twisty.options.dimension == 3) {
                var curProgress = 4 - cubeutil.getCFOPProgress(getFacelet(twisty));
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
                    var axis = (dimension - coord[idx]) / 2 + idx;
                    coord.splice(idx, 1);
                    var xy = xyXchg[axis];
                    x = (coord[xy] * xInv[axis] + dimension - 1) / 2;
                    y = (coord[1 - xy] * yInv[axis] + dimension - 1) / 2;
                    ret[axis * dimension * dimension + x * dimension + y] = index_side[faceIndex];
                }
            }
            return ret.join("");
        }

        function isInspectionLegalMove(twisty, move) {
            return move[0] == 1 && move[1] == twisty.options.dimension;
        }

        function isParallelMove(twisty, move1, move2) {
            return "URFDLB".indexOf(move1[2]) % 3 == "URFDLB".indexOf(move2[2]) % 3;
        }

        function parseScramble(scramble) {
            if (scramble.match(/^\s*$/)) {
                return generateScramble(this);
            } else {
                var moves = kernel.parseScramble(scramble, "URFDLB");
                scramble = [];
                for (var i = 0; i < moves.length; i++) {
                    if (moves[i][1] > 0) {
                        scramble.push([1, moves[i][1], "URFDLB".charAt(moves[i][0]), [1, 2, -1][moves[i][2] - 1]]);
                    } else {
                        scramble.push([1, 3, "URFDLB".charAt(moves[i][0]), [1, 2, -1][-moves[i][2] - 1]]);
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
            getFacelet: getFacelet,
            moveCnt: moveCnt
        };
    }
})();