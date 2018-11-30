(function (circle) {
    var solv = new mathlib.Solver(4, 1, [[0, doMove, 384]]);

    function doMove(idx, m) {
        var perm = idx >> 4;
        var ori = idx & 15;
        var g = [];
        mathlib.set8Perm(g, perm, 4);
        if (m == 0) {
            circle(g, 0, 1);
        } else if (m == 1) {
            circle(g, 2, 3);
        } else if (m == 2) {
            circle(g, 0, 3);
        } else if (m == 3) {
            circle(g, 1, 2);
        }
        return (mathlib.get8Perm(g, 4) << 4) + (ori ^ (1 << m));
    }

    function generateScramble() {
        var c = 1 + mathlib.rn(191);
        c = c * 2 + ((mathlib.getNParity(c >> 3, 4) ^ (c >> 1) ^ (c >> 2) ^ c) & 1);
        return solv.toStr(solv.search([c], 0), "RLFB", [""]);
    }

    scramble.reg('133', generateScramble);
})(mathlib.circle);
