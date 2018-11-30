(function (circle, circleOri) {
    var inited = false;
    var prun = [];
    var permmove = [];
    var orimove = [];

    function init() {
        if (inited) {
            return;
        }
        inited = true;
        mathlib.createMove(permmove, 5760, doPermMove, 2);
        mathlib.createMove(orimove, 32, doOriMove, 2);
        mathlib.createPrun(prun, 0, 5760 * 32, 14, function (idx, m) {
            return permmove[m][idx >> 5] << 5 | orimove[m][idx & 31];
        }, 2);
    }

    function search(perm, ori, maxl, lm, sol) {
        if (maxl == 0) {
            return ori + perm == 0;
        }
        if (mathlib.getPruning(prun, perm << 5 | ori) > maxl) return false;
        var h, g, f, i;
        for (i = 0; i < 2; i++)
            if (i != lm) {
                h = perm;
                g = ori;
                for (f = 0; f < 3; f++) {
                    h = permmove[i][h];
                    g = orimove[i][g];
                    if (search(h, g, maxl - 1, i, sol)) {
                        sol.push("UM".charAt(i) + "'2 ".charAt(f));
                        return true;
                    }
                }
            }
    }

    function doPermMove(idx, m) {
        var edge = idx >> 3;
        var corn = idx;
        var epar = mathlib.getNParity(edge, 6);
        var cent = idx << 1 | (epar ^ ((corn >> 1) & 1));
        var g = [];
        mathlib.setNPerm(g, edge, 6);
        if (m == 0) { //U
            circle(g, 0, 1, 2, 3);
            corn = corn + 2;
        } else if (m == 1) { //M
            circle(g, 0, 2, 5, 4);
            cent = cent + 1;
        }
        return (mathlib.getNPerm(g, 6) << 3) | (corn & 6) | ((cent >> 1) & 1);
    }

    function doOriMove(idx, m) {
        var i, fpar = 0,
            g = [];
        for (i = 4; i >= 0; --i) {
            fpar ^= g[i] = (idx & 1);
            idx >>= 1;
        }
        g[5] = fpar;
        if (m == 0) {
            circle(g, 0, 1, 2, 3);
        } else if (m == 1) {
            circleOri(g, 0, 2, 5, 4, 1);
        }
        idx = 0;
        for (i = 0; i < 5; ++i) {
            idx = idx << 1 | g[i];
        }
        return idx;
    }

    function generateScramble() {
        init();
        var d = [],
            a, b, c;
        do {
            c = mathlib.rn(5760) & 0xfff9;
            b = mathlib.rn(32);
        } while (b + c == 0);
        for (a = 0; a < 99; a++) {
            if (search(c, b, a, -1, d)) {
                break;
            }
        }
        return d.reverse().join(" ").replace(/ +/g, ' ');
    }

    scramble.reg('lsemu', generateScramble);
})(mathlib.circle, mathlib.circleOri);
