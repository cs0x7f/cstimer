"use strict";

(function (createMove, edgeMove, createPrun, getPruning) {
    var fmv = [];
    var pmv = [];
    var fprun = [];
    var pprun = [];

    function flipMove(idx, m) {
        var parity = 0, i, arr = [];
        for (i = 0; i < 11; ++i) {
            parity ^= arr[i] = idx & 1;
            idx >>>= 1;
        }
        arr[11] = parity;

        edgeMove(arr, m);

        idx = 0;
        for (i = 0; i < 11; ++i) {
            idx |= arr[i] << i;
        }
        return idx;
    }

    function permMove(idx, m) {
        var arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var a = idx % 12;
        var b = ~~(idx / 12);
        if (b >= a) b++;
        arr[a] = 2;
        arr[b] = 4;

        edgeMove(arr, m);

        for (var i = 0; i < 12; i++) {
            if ((arr[i] >> 1) == 1) {
                a = i;
            } else if ((arr[i] >> 1) == 2) {
                b = i;
            }
        }
        if (b > a) b--;
        return b * 12 + a;
    }

    function init() {
        init = $.noop;
        createMove(fmv, 2048, flipMove);
        createPrun(fprun, 0, 2048, 6, fmv);
        createMove(pmv, 132, permMove);
        createPrun(pprun, 9 * 12 + 8, 132, 3, pmv);
    }

    function idaeoline(q, t, l, lm, sol) {
        if (l == 0) {
            return q == 9 * 12 + 8 && t == 0;
        } else {
            if (getPruning(pprun, q) > l || getPruning(fprun, t) > l) return false;
            var p, s, a, m;
            for (m = 0; m < 6; m++) {
                if (m != lm && m != lm - 3) {
                    p = q;
                    s = t;
                    for (a = 0; a < 3; a++) {
                        p = pmv[m][p];
                        s = fmv[m][s];
                        if (idaeoline(p, s, l - 1, m, sol)) {
                            sol.push("FRUBLD".charAt(m) + " 2'".charAt(a));
                            return (true);
                        }
                    }
                }
            }
        }
        return false;
    }

    var faceStr = ["D(LR)", "D(FB)", "U(LR)", "U(FB)", "L(UD)", "L(FB)", "R(UD)", "R(FB)", "F(LR)", "F(UD)", "B(LR)", "B(UD)"];
    var moveIdx = ["FRUBLD", "RBULFD", "FLDBRU", "LBDRFU", "FDRBUL", "DBRUFL", "FULBDR", "UBLDFR", "URBDLF", "RDBLUF", "DRFULB", "RUFLDB"];
    var rotIdx = ["&nbsp;&nbsp;&nbsp;", "&nbsp;y&nbsp;", "z2&nbsp;", "z2y", "z'&nbsp;", "z'y", "&nbsp;z&nbsp;", "z&nbsp;y", "x'&nbsp;", "x'y", "&nbsp;x&nbsp;", "x&nbsp;y"];

    function solve_eoline(scramble, fdiv) {
        init();
        var moves = kernel.parseScramble(scramble, "FRUBLD");
        fdiv.empty();
        for (var face = 0; face < 12; face++) {
            var flip = 0;
            var perm = 9 * 12 + 8;
            for (var i = 0; i < moves.length; i++) {
                var m = moveIdx[face].indexOf("FRUBLD".charAt(moves[i][0]));
                var p = moves[i][2];
                for (var j = 0; j < p; j++) {
                    flip = fmv[m][flip];
                    perm = pmv[m][perm];
                }
            }
            var sol = [];
            var len = 0;
            while (true) {
                if (idaeoline(perm, flip, len, -1, sol)) {
                    break;
                }
                len++;
            }
            sol.reverse();
            fdiv.append(faceStr[face] + ": " + rotIdx[face] + " " + sol.join("&nbsp;") + '<br>');
        }
    }

    function execFunc(fdiv) {
        if (!fdiv) {
            return;
        }
        var scramble = tools.getCurScramble();
        if ("|333|333o|333oh|333fm|333ft|edges|easyc|".indexOf('|' + scramble[0] + '|') != -1
            || scramble[0] == "input" && "|333|222o|".indexOf('|' + tools.scrambleType(scramble[1]) + '|') != -1) {
            solve_eoline(scramble[1], fdiv);
        } else {
            fdiv.html(IMAGE_UNAVAILABLE);
        }
    }

    $(function () {
        tools.regTool('eoline', TOOLS_EOLINE, execFunc);
    });

    return {
        solve: solve_eoline
    }
})(mathlib.createMove, mathlib.edgeMove, mathlib.createPrun, mathlib.getPruning);

