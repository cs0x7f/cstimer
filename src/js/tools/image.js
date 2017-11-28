var image = (function() {

    var canvas, ctx;
    var hsq3 = Math.sqrt(3) / 2;

    function Rotate(arr, theta) {
        return Transform(arr, [Math.cos(theta), -Math.sin(theta), 0, Math.sin(theta), Math.cos(theta), 0]);
    }

    function Transform(arr) {
        var ret;
        for (var i = 1; i < arguments.length; i++) {
            var trans = arguments[i];
            if (trans.length == 3) {
                trans = [trans[0], 0, trans[1] * trans[0], 0, trans[0], trans[2] * trans[0]];
            }
            ret = [[], []];
            for (var i = 0; i < arr[0].length; i++) {
                ret[0][i] = arr[0][i] * trans[0] + arr[1][i] * trans[1] + trans[2];
                ret[1][i] = arr[0][i] * trans[3] + arr[1][i] * trans[4] + trans[5];
            }
        }
        return ret;
    }

    // trans: [size, offx, offy] == [size, 0, offx * size, 0, size, offy * size] or [a11 a12 a13 a21 a22 a23]
    function drawPolygon(color, arr, trans) {
        if (!ctx) {
            return;
        }
        trans = trans || [1, 0, 0, 0, 1, 0];
        arr = Transform(arr, trans);
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.moveTo(arr[0][0], arr[1][0]);
        for (var i = 1; i < arr[0].length; i++) {
            ctx.lineTo(arr[0][i], arr[1][i]);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }


    var sq1Image = (function() {
        var posit = [];
        var mid = 0;

        //(move[0], move[1]) (/ = move[2])
        function doMove(move) {
            var newposit = [];

            //top move
            for (var i = 0; i < 12; i++) {
                newposit[(i + move[0]) % 12] = posit[i];
            }

            //bottom move
            for (var i = 0; i < 12; i++) {
                newposit[i + 12] = posit[(i + move[1]) % 12 + 12];
            }

            if (move[2]) {
                mid = 1 - mid;
                for (var i = 0; i < 6; i++) {
                    mathlib.circle(newposit, i + 6, 23 - i);
                }
            }
            posit = newposit;
        }

        var ep = [
            [0, -0.5, 0.5],
            [0, -hsq3 - 1, -hsq3 - 1]
        ];
        var cp = [
            [0, -0.5, -hsq3 - 1, -hsq3 - 1],
            [0, -hsq3 - 1, -hsq3 - 1, -0.5]
        ];
        var cpr = [
            [0, -0.5, -hsq3 - 1],
            [0, -hsq3 - 1, -hsq3 - 1]
        ];
        var cpl = [
            [0, -hsq3 - 1, -hsq3 - 1],
            [0, -hsq3 - 1, -0.5]
        ];

        var eps = Transform(ep, [0.66, 0, 0]);
        var cps = Transform(cp, [0.66, 0, 0]);

        var udcol = 'UD';
        var ecol = '-B-R-F-L-B-R-F-L';
        var ccol = 'LBBRRFFLBLRBFRLF';
        var colors = {'U': '#ff0', 'R': '#f80', 'F': '#0f0', 'D': '#fff', 'L': '#f00', 'B': '#00f'};

        var width = 45;

        var movere = /^\s*\(\s*(-?\d+),\s*(-?\d+)\s*\)\s*$/

        return function(moveseq) {
            posit = [0, 0, 1, 2, 2, 3, 4, 4, 5, 6, 6, 7, 8, 8, 9, 10, 10, 11, 12, 12, 13, 14, 14, 15];
            mid = 0;
            var moves = moveseq.split('/');
            for (var i = 0; i < moves.length; i++) {
                if (/^\s*$/.exec(moves[i])) {
                    doMove([0, 0, 1]);
                    continue;
                }
                var m = movere.exec(moves[i]);
                doMove([~~m[1] + 12, ~~m[2] + 12, 1]);
            }
            doMove([0, 0, 1]);


            var imgSize = kernel.getProp('imgSize') / 10;
            canvas.width(11 * imgSize / 1.3 + 'em');
            canvas.height(5.4 * imgSize / 1.3 + 'em');

            canvas.attr('width', 11 * width);
            canvas.attr('height', 5.4 * width);

            var trans = [width, 2.7, 2.7];
            //draw top
            for (var i = 0; i < 12; i++) {
                if (posit[i] % 2 == 0) { //corner piece
                    if (posit[i] != posit[(i + 1) % 12]) {
                        continue;
                    }
                    drawPolygon(colors[ccol[posit[i]]],
                        Rotate(cpl, (i - 3) * Math.PI / 6), trans);
                    drawPolygon(colors[ccol[posit[i] + 1]],
                        Rotate(cpr, (i - 3) * Math.PI / 6), trans);
                    drawPolygon(colors[udcol[posit[i] >= 8 ? 1 : 0]],
                        Rotate(cps, (i - 3) * Math.PI / 6), trans);
                } else { //edge piece
                    drawPolygon(colors[ecol[posit[i]]],
                        Rotate(ep, (i - 5) * Math.PI / 6), trans);
                    drawPolygon(colors[udcol[posit[i] >= 8 ? 1 : 0]],
                        Rotate(eps, (i - 5) * Math.PI / 6), trans);
                }
            }

            var trans = [width, 2.7 + 5.4, 2.7];
            //draw bottom
            for (var i = 12; i < 24; i++) {
                if (posit[i] % 2 == 0) { //corner piece
                    if (posit[i] != posit[(i + 1) % 12 + 12]) {
                        continue;
                    }
                    drawPolygon(colors[ccol[posit[i]]],
                        Rotate(cpl, -i * Math.PI / 6), trans);
                    drawPolygon(colors[ccol[posit[i] + 1]],
                        Rotate(cpr, -i * Math.PI / 6), trans);
                    drawPolygon(colors[udcol[posit[i] >= 8 ? 1 : 0]],
                        Rotate(cps, -i * Math.PI / 6), trans);
                } else { //edge piece
                    drawPolygon(colors[ecol[posit[i]]],
                        Rotate(ep, (-1 - i) * Math.PI / 6), trans);
                    drawPolygon(colors[udcol[posit[i] >= 8 ? 1 : 0]],
                        Rotate(eps, (-1 - i) * Math.PI / 6), trans);
                }
            }
        }
    })();

    var skewbImage = (function() {
        var width = 45;
        var gap = width / 10;
        var posit = [];
        var colors = ['#fff', '#00f', '#f00', '#ff0', '#0f0', '#f80'];

        var ftrans = [
            [width * hsq3, width * hsq3, (width * 4 + gap * 1.5) * hsq3, -width / 2, width / 2, width],
            [width * hsq3, 0, (width * 7 + gap * 3) * hsq3, -width / 2, width, width * 1.5],
            [width * hsq3, 0, (width * 5 + gap * 2) * hsq3, -width / 2, width, width * 2.5 + 0.5 * gap],
            [0, -width * hsq3, (width * 3 + gap * 1) * hsq3, width, -width / 2, width * 4.5 + 1.5 * gap],
            [width * hsq3, 0, (width * 3 + gap * 1) * hsq3, width / 2, width, width * 2.5 + 0.5 * gap],
            [width * hsq3, 0, width * hsq3, width / 2, width, width * 1.5]
        ];

        function doMove(axis, power) {
            for (var p = 0; p < power; p++) {
                switch (axis) {
                    case 0: //R
                        mathlib.circle(posit, 2 * 5 + 0, 1 * 5 + 0, 3 * 5 + 0);
                        mathlib.circle(posit, 2 * 5 + 4, 1 * 5 + 3, 3 * 5 + 2);
                        mathlib.circle(posit, 2 * 5 + 2, 1 * 5 + 4, 3 * 5 + 1);
                        mathlib.circle(posit, 2 * 5 + 3, 1 * 5 + 1, 3 * 5 + 4);
                        mathlib.circle(posit, 4 * 5 + 4, 0 * 5 + 4, 5 * 5 + 3);
                        break;
                    case 1: //U
                        mathlib.circle(posit, 0 * 5 + 0, 5 * 5 + 0, 1 * 5 + 0);
                        mathlib.circle(posit, 0 * 5 + 2, 5 * 5 + 1, 1 * 5 + 2);
                        mathlib.circle(posit, 0 * 5 + 4, 5 * 5 + 2, 1 * 5 + 4);
                        mathlib.circle(posit, 0 * 5 + 1, 5 * 5 + 3, 1 * 5 + 1);
                        mathlib.circle(posit, 4 * 5 + 1, 3 * 5 + 4, 2 * 5 + 2);
                        break;
                    case 2: //L
                        mathlib.circle(posit, 4 * 5 + 0, 3 * 5 + 0, 5 * 5 + 0);
                        mathlib.circle(posit, 4 * 5 + 3, 3 * 5 + 3, 5 * 5 + 4);
                        mathlib.circle(posit, 4 * 5 + 1, 3 * 5 + 1, 5 * 5 + 3);
                        mathlib.circle(posit, 4 * 5 + 4, 3 * 5 + 4, 5 * 5 + 2);
                        mathlib.circle(posit, 2 * 5 + 3, 1 * 5 + 4, 0 * 5 + 1);
                        break;
                    case 3: //B
                        mathlib.circle(posit, 1 * 5 + 0, 5 * 5 + 0, 3 * 5 + 0);
                        mathlib.circle(posit, 1 * 5 + 4, 5 * 5 + 3, 3 * 5 + 4);
                        mathlib.circle(posit, 1 * 5 + 3, 5 * 5 + 1, 3 * 5 + 3);
                        mathlib.circle(posit, 1 * 5 + 2, 5 * 5 + 4, 3 * 5 + 2);
                        mathlib.circle(posit, 0 * 5 + 2, 4 * 5 + 3, 2 * 5 + 4);
                        break;
                }
            }
        }

        function face(f) {
            var transform = ftrans[f];
            drawPolygon(colors[posit[f * 5 + 0]], [[-1, 0, 1, 0], [0, 1, 0, -1]], transform);
            drawPolygon(colors[posit[f * 5 + 1]], [[-1, -1, 0], [0, -1, -1]], transform);
            drawPolygon(colors[posit[f * 5 + 2]], [[0, 1, 1], [-1, -1, 0]], transform);
            drawPolygon(colors[posit[f * 5 + 3]], [[-1, -1, 0], [0, 1, 1]], transform);
            drawPolygon(colors[posit[f * 5 + 4]], [[0, 1, 1], [1, 1, 0]], transform);
        }

        return function(moveseq) {
            var cnt = 0;
            for (var i = 0; i < 6; i++) {
                for (var f = 0; f < 5; f++) {
                    posit[cnt++] = i;
                }
            }
            var scramble = kernel.parseScramble(moveseq, 'RULB');
            for (var i = 0; i < scramble.length; i++) {
                doMove(scramble[i][0], scramble[i][2] == 1 ? 1 : 2);
            }
            var imgSize = kernel.getProp('imgSize') / 10;
            canvas.width((8 * hsq3 + 0.3) * imgSize + 'em');
            canvas.height(6.2 * imgSize + 'em');

            canvas.attr('width', (8 * hsq3 + 0.3) * width + 1);
            canvas.attr('height', 6.2 * width + 1);

            for (var i = 0; i < 6; i++) {
                face(i);
            }
        }
    })();

    /*

face:   
1 0 2
  3

posit: 
2 8 3 7 1    0    2 8 3 7 1
  4 6 5    5 6 4    4 6 5  
    0    1 7 3 8 2    0    

         2 8 3 7 1
           4 6 5  
             0    

     */

    var pyraImage = (function() {
        var width = 45;
        var posit = [];
        var colors = ['#0f0', '#f00', '#00f', '#ff0'];
        var faceoffx = [3.5, 1.5, 5.5, 3.5];
        var faceoffy = [0, 3 * hsq3, 3 * hsq3, 6.5 * hsq3];
        var g1 = [0, 6, 5, 4];
        var g2 = [1, 7, 3, 5];
        var g3 = [2, 8, 4, 3];
        var flist = [
            [0, 1, 2],
            [2, 3, 0],
            [1, 0, 3],
            [3, 2, 1]
        ];
        var arrx = [-0.5, 0.5, 0];
        var arry1 = [hsq3, hsq3, 0];
        var arry2 = [-hsq3, -hsq3, 0];

        function doMove(axis, power) {
            var len = axis >= 4 ? 1 : 4;
            var f = flist[axis % 4];
            for (var i = 0; i < len; i++) {
                for (var p = 0; p < power; p++) {
                    mathlib.circle(posit, f[0] * 9 + g1[i], f[1] * 9 + g2[i], f[2] * 9 + g3[i]);
                }
            }
        }

        function face(f) {
            var inv = f != 0;
            var arroffx = [0, -1, 1, 0, 0.5, -0.5, 0, -0.5, 0.5];
            var arroffy = [0, 2, 2, 2, 1, 1, 2, 3, 3];

            for (var i = 0; i < arroffy.length; i++) {
                arroffy[i] *= inv ? -hsq3 : hsq3;
                arroffx[i] *= inv ? -1 : 1;
            }
            for (var idx = 0; idx < 9; idx++) {
                drawPolygon(colors[posit[f * 9 + idx]], [arrx, (idx >= 6 != inv) ? arry2 : arry1], [width, faceoffx[f] + arroffx[idx], faceoffy[f] + arroffy[idx]]);
            }
        }

        return function(moveseq) {
            var cnt = 0;
            for (var i = 0; i < 4; i++) {
                for (var f = 0; f < 9; f++) {
                    posit[cnt++] = i;
                }
            }
            var scramble = kernel.parseScramble(moveseq, 'URLB');
            for (var i = 0; i < scramble.length; i++) {
                doMove(scramble[i][0] + (scramble[i][1] == 2 ? 4 : 0), scramble[i][2] == 1 ? 1 : 2);
            }
            var imgSize = kernel.getProp('imgSize') / 10;
            canvas.width(7 * imgSize + 'em');
            canvas.height(6.5 * hsq3 * imgSize + 'em');

            canvas.attr('width', 7 * width);
            canvas.attr('height', 6.5 * hsq3 * width);

            for (var i = 0; i < 4; i++) {
                face(i);
            }
        }
    })();

    var nnnImage = (function() {
        var width = 30;

        var posit = [];
        var colors = ['#ff0', '#fa0', '#00f', '#fff', '#f00', '#0d0'];

        function face(f, size) {
            var offx = 10 / 9,
                offy = 10 / 9;
            if (f == 0) { //D
                offx *= size;
                offy *= size * 2;
            } else if (f == 1) { //L
                offx *= 0;
                offy *= size;
            } else if (f == 2) { //B
                offx *= size * 3;
                offy *= size;
            } else if (f == 3) { //U
                offx *= size;
                offy *= 0;
            } else if (f == 4) { //R
                offx *= size * 2;
                offy *= size;
            } else if (f == 5) { //F
                offx *= size;
                offy *= size;
            }

            for (var i = 0; i < size; i++) {
                var x = (f == 1 || f == 2) ? size - 1 - i : i;
                for (var j = 0; j < size; j++) {
                    var y = (f == 0) ? size - 1 - j : j;
                    drawPolygon(colors[posit[(f * size + y) * size + x]], [[i, i, i + 1, i + 1], [j, j + 1, j + 1, j]], [width, offx, offy]);
                }
            }
        }

        /**
         *  f: face, [ D L B U R F ]
         *  d: which slice, in [0, size-1)
         *  q: [  2 ']
         */
        function doslice(f, d, q, size) {
            var f1, f2, f3, f4;
            var s2 = size * size;
            var c, i, j, k;
            if (f > 5) f -= 6;
            for (k = 0; k < q; k++) {
                for (i = 0; i < size; i++) {
                    if (f == 0) {
                        f1 = 6 * s2 - size * d - size + i;
                        f2 = 2 * s2 - size * d - 1 - i;
                        f3 = 3 * s2 - size * d - 1 - i;
                        f4 = 5 * s2 - size * d - size + i;
                    } else if (f == 1) {
                        f1 = 3 * s2 + d + size * i;
                        f2 = 3 * s2 + d - size * (i + 1);
                        f3 = s2 + d - size * (i + 1);
                        f4 = 5 * s2 + d + size * i;
                    } else if (f == 2) {
                        f1 = 3 * s2 + d * size + i;
                        f2 = 4 * s2 + size - 1 - d + size * i;
                        f3 = d * size + size - 1 - i;
                        f4 = 2 * s2 - 1 - d - size * i;
                    } else if (f == 3) {
                        f1 = 4 * s2 + d * size + size - 1 - i;
                        f2 = 2 * s2 + d * size + i;
                        f3 = s2 + d * size + i;
                        f4 = 5 * s2 + d * size + size - 1 - i;
                    } else if (f == 4) {
                        f1 = 6 * s2 - 1 - d - size * i;
                        f2 = size - 1 - d + size * i;
                        f3 = 2 * s2 + size - 1 - d + size * i;
                        f4 = 4 * s2 - 1 - d - size * i;
                    } else if (f == 5) {
                        f1 = 4 * s2 - size - d * size + i;
                        f2 = 2 * s2 - size + d - size * i;
                        f3 = s2 - 1 - d * size - i;
                        f4 = 4 * s2 + d + size * i;
                    }
                    c = posit[f1];
                    posit[f1] = posit[f2];
                    posit[f2] = posit[f3];
                    posit[f3] = posit[f4];
                    posit[f4] = c;
                }
                if (d == 0) {
                    for (i = 0; i + i < size; i++) {
                        for (j = 0; j + j < size - 1; j++) {
                            f1 = f * s2 + i + j * size;
                            f3 = f * s2 + (size - 1 - i) + (size - 1 - j) * size;
                            if (f < 3) {
                                f2 = f * s2 + (size - 1 - j) + i * size;
                                f4 = f * s2 + j + (size - 1 - i) * size;
                            } else {
                                f4 = f * s2 + (size - 1 - j) + i * size;
                                f2 = f * s2 + j + (size - 1 - i) * size;
                            }
                            c = posit[f1];
                            posit[f1] = posit[f2];
                            posit[f2] = posit[f3];
                            posit[f3] = posit[f4];
                            posit[f4] = c;
                        }
                    }
                }
            }
        }

        return function(size, moveseq) {
            var cnt = 0;
            for (var i = 0; i < 6; i++) {
                for (var f = 0; f < size * size; f++) {
                    posit[cnt++] = i;
                }
            }
            var moves = kernel.parseScramble(moveseq, "DLBURF");
            for (var s = 0; s < moves.length; s++) {
                for (var d = 0; d < moves[s][1]; d++) {
                    doslice(moves[s][0], d, moves[s][2], size)
                }
                if (moves[s][1] == -1) {
                    for (var d = 0; d < size - 1; d++) {
                        doslice(moves[s][0], d, -moves[s][2], size);
                    }
                    doslice((moves[s][0] + 3) % 6, 0, moves[s][2] + 4, size);
                }
            }

            var imgSize = kernel.getProp('imgSize') / 50;
            canvas.width(39 * imgSize + 'em');
            canvas.height(29 * imgSize + 'em');

            canvas.attr('width', 39 * size / 9 * width + 1);
            canvas.attr('height', 29 * size / 9 * width + 1);

            for (var i = 0; i < 6; i++) {
                face(i, size);
            }
        }
    })();

    var types_nnn = ['', '', '222', '333', '444', '555', '666', '777', '888', '999', '101010', '111111'];

    function genImage(scramble) {
        var type = scramble[0];
        if (type == 'input') {
            type = tools.scrambleType(scramble[1]);
        }
        type = tools.puzzleType(type);
        var size;
        for (size = 0; size < 12; size++) {
            if (type == types_nnn[size]) {
                nnnImage(size, scramble[1]);
                return true;
            }
        }
        if (type == "pyr") {
            pyraImage(scramble[1]);
            return true;
        }
        if (type == "skb") {
            skewbImage(scramble[1]);
            return true;
        }
        if (type == "sq1") {
            sq1Image(scramble[1]);
            return true;
        }
        return false;
    }

    function execFunc(fdiv) {
        if (!fdiv) {
            return;
        }
        canvas = $('<canvas>');
        ctx = canvas[0].getContext('2d');
        fdiv.empty().append(canvas);
        if (!genImage(tools.getCurScramble())) {
            fdiv.html(IMAGE_UNAVAILABLE);
        }
    }

    $(function() {
        canvas = $('<canvas>');
        if (canvas[0].getContext) {
            tools.regTool('image', TOOLS_IMAGE, execFunc);
        }
    });

    return {
        draw: genImage
    }
})();
