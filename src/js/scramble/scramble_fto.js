(function() {
	"use strict";

	var l3t_cp = [0x543210, 0x543102, 0x543021];
	var l3t_base = [
		[0x0, 0xba9876543210, 1, "O"],
		[0x0, 0x7a98b6543120, 3, "Oc"],
		[0x0, 0x3a98b6547210, 1, "Oa"],
		[0x0, 0x7a983654b210, 1, "Ob"],
		[0x110, 0xba9876543210, 3, "V"],
		[0x110, 0x7a98b6543120, 9, "Vc"],
		[0x110, 0x3a98b6547210, 3, "Va"],
		[0x110, 0x7a983654b210, 3, "Vb"],
		[0x0, 0xba9876541320, 9, "Q"],
		[0x0, 0x7a98b6542310, 9, "Qc"],
		[0x0, 0xba9826547310, 9, "Qa"],
		[0x0, 0x1a98b6547320, 9, "Qb"],
		[0x0, 0x7a981654b320, 9, "Qr"],
		[0x0, 0x2a987654b310, 9, "Ql"],
		[0x110, 0xba9876541320, 9, "W"],
		[0x110, 0x7a98b6542310, 9, "Wc"],
		[0x110, 0xba9826547310, 9, "Wa"],
		[0x110, 0x1a98b6547320, 9, "Wb"],
		[0x110, 0x7a981654b320, 9, "Wr"],
		[0x110, 0x2a987654b310, 9, "Wl"],
		[0x110, 0xba9876542130, 9, "J"],
		[0x110, 0x7a98b6541230, 9, "Jc"],
		[0x110, 0xba9816547230, 9, "Ja"],
		[0x110, 0x2a98b6547130, 9, "Jb"],
		[0x110, 0x7a982654b130, 9, "Jr"],
		[0x110, 0x1a987654b230, 9, "Jl"],
		[0x110, 0xba9876541203, 9, "L"],
		[0x110, 0x7a98b6542103, 9, "Lc"],
		[0x110, 0xba9826547103, 9, "La"],
		[0x110, 0x1a98b6547203, 9, "Lb"],
		[0x110, 0x7a981654b203, 9, "Lr"],
		[0x110, 0x2a987654b103, 9, "Ll"],
		[0x0, 0xba9826541730, 9, "B"],
		[0x0, 0x1a98b6542730, 9, "Bc"],
		[0x0, 0x2a981654b730, 9, "Ba"],
		[0x0, 0x7a9816542b30, 9, "Bb"],
		[0x0, 0x2a9876541b30, 9, "Br"],
		[0x0, 0x1a9826547b30, 9, "Bl"],
		[0x110, 0xba9826541730, 9, "T"],
		[0x110, 0x1a98b6542730, 9, "Tc"],
		[0x110, 0x2a981654b730, 9, "Ta"],
		[0x110, 0x7a9816542b30, 9, "Tb"],
		[0x110, 0x2a9876541b30, 9, "Tr"],
		[0x110, 0x1a9826547b30, 9, "Tl"],
		[0x110, 0xba9816542703, 9, "Z"],
		[0x110, 0x2a98b6541703, 9, "Zc"],
		[0x110, 0x1a982654b703, 9, "Za"],
		[0x110, 0x7a9826541b03, 9, "Zb"],
		[0x110, 0x1a9876542b03, 9, "Zr"],
		[0x110, 0x2a9816547b03, 9, "Zl"],
		[0x110, 0xba9826541073, 9, "S"],
		[0x110, 0x1a98b6542073, 9, "Sc"],
		[0x110, 0x2a981654b073, 9, "Sa"],
		[0x110, 0x7a98165420b3, 9, "Sb"],
		[0x110, 0x2a98765410b3, 9, "Sr"],
		[0x110, 0x1a98265470b3, 9, "Sl"],
		[0x0, 0x1a9826540b73, 3, "X"],
		[0x0, 0x2a98165407b3, 3, "Xb"],
		[0x110, 0x1a9826540b73, 9, "Y"],
		[0x110, 0x2a98165407b3, 9, "Yb"]
	];
	// count 60


	var ep0 = 0xba9876543210;
	var cp0 = 0x543210;
	var co0 = 0x000000;
	var uf0 = 0xba9876543210;
	var rl0 = 0xba9876543210;
	var epf = 0xffffffffffff;
	var cpf = 0xffffff;
	var cof = 0xffffff;
	var uff = 0xffffffffffff;
	var rlf = 0xffffffffffff;
	var tcpco = 0x000110;
	var l4tcp = 0x54ffff;
	var l4tco = 0x00ffff;
	var l4tuf = 0xfaf8ff54ffff;

	function parseMask(mask, len) {
		var ret = [];
		for (var i = 0; i < len; i++) {
			var val = mask & 0xf;
			ret[i] = val == 15 ? -1 : val == 14 ? -2 : val;
			mask /= 16;
		}
		return ret;
	}

	function fixPerm(arr) {
		var val = [];
		var free = [];
		for (var i = 0; i < arr.length; i++) {
			val[i] = i;
		}
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] == -1) {
				free.push(i);
			} else {
				val[arr[i]] = -1;
			}
		}
		for (var i = 0, j = 0; i < val.length; i++) {
			if (val[i] != -1) {
				val[j++] = val[i];
			}
		}
		var cntU = free.length;
		for (var i = 0; i < free.length; i++) {
			var r = mathlib.rn(cntU);
			arr[free[i]] = val[r];
			for (var j = r; j < cntU - 1; j++) {
				val[j] = val[j + 1];
			}
			cntU--;
		}
		if (free.length > 1 && mathlib.getNParity(mathlib.getNPerm(arr, arr.length), arr.length) != 0) {
			var temp = arr[free[0]];
			arr[free[0]] = arr[free[1]];
			arr[free[1]] = temp;
		}
	}

	function fixOri(arr, base) {
		var cntU = 0;
		var sum = 0;
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] == -1) {
				cntU++;
			} else {
				sum += arr[i];
			}
		}
		sum %= base;
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] == -1) {
				if (cntU-- == 1) {
					arr[i] = (base - sum) % base;
				} else {
					arr[i] = mathlib.rn(base);
					sum = (sum + arr[i]) % base;
				}
			}
		}
	}

	function genL3TMap() {
		var ret = [];
		for (var i = 0; i < l3t_base.length; i++) {
			var co = l3t_base[i][0];
			var uf = l3t_base[i][1];
			var probs = l3t_base[i][2];
			var base = l3t_base[i][3];
			for (var k = 0; k < 3; k++) {
				var cp = l3t_cp[k];
				if (cp == 0x543210 && co == 0 && uf == 0xba9876543210) {
					continue;
				}
				var name = base.charAt(0) + '-' + base + (k == 0 ? '' : k == 1 ? '+' : '-');
				ret.push([cp, co, uf, probs, name]);
			}
		}
		return ret;
	}

	var l3t_map = genL3TMap();
	var l3tprobs = mathlib.idxArray(l3t_map, 3);
	var l3tfilter = mathlib.idxArray(l3t_map, 4);

	function genTCPMap() {
		var ret = [];
		for (var i = 0; i < l3t_map.length; i++) {
			var name = l3t_map[i][4];
			if (name.charAt(0) != 'T') {
				continue;
			}
			var base = name.slice(2);
			var suffix = '';
			var last = base.charAt(base.length - 1);
			if (last == '+' || last == '-') {
				suffix = last;
				base = base.slice(0, -1);
			}
			ret.push([l3t_map[i][0], l3t_map[i][2], 1, base + '-' + base + suffix, i]);
		}
		return ret;
	}

	var tcp_map = genTCPMap();
	var tcpprobs = mathlib.idxArray(tcp_map, 2);
	var tcpfilter = mathlib.idxArray(tcp_map, 3);
	var tcp_l3t = mathlib.idxArray(tcp_map, 4);

	function getAnyState(_ep, _cp, _co, _uf, _rl, auf) {
		var ep = parseMask(_ep, 12);
		var cp = parseMask(_cp, 6);
		var co = parseMask(_co, 6);
		var uf = parseMask(_uf, 12);
		var rl = parseMask(_rl, 12);
		fixPerm(ep);
		fixPerm(cp);
		fixOri(co, 2);
		fixPerm(uf);
		fixPerm(rl);
		var cc = new ftosolver.FtoCubie(cp, co, ep, uf, rl);
		if (auf) {
			var a = mathlib.rn(3);
			var b = mathlib.rn(3);
			cc = ftosolver.FtoCubie.FtoMult(ftosolver.FtoCubie.symCube[a], cc, null);
			for (var i = 0; i < b; i++) {
				cc = ftosolver.FtoCubie.FtoMult(cc, ftosolver.FtoCubie.moveCube[0], null);
			}
			cc = ftosolver.FtoCubie.FtoMult(cc, ftosolver.FtoCubie.symCube[(3 - a) % 3], null);
		}
		return cc;
	}

	function getAnyScramble(_ep, _cp, _co, _uf, _rl, auf) {
		var solution;
		do {
			var cc = getAnyState(_ep, _cp, _co, _uf, _rl, auf);
			solution = ftosolver.solveFacelet(cc.toFaceCube(), true);
		} while (solution.length <= 3);
		return solution;
	}

	function getL3TScramble(type, length, cases) {
		var l3tcase = l3t_map[scrMgr.fixCase(cases, l3tprobs)] || l3t_map[0];
		return getAnyScramble(ep0, l3tcase[0], l3tcase[1], l3tcase[2], rl0, true);
	}

	function getL4TScramble() {
		return getAnyScramble(ep0, l4tcp, l4tco, l4tuf, rl0, true);
	}

	function getTCPScramble(type, length, cases) {
		return getL3TScramble(type, length, tcp_l3t[scrMgr.fixCase(cases, tcpprobs)]);
	}

	function getL3TImage(cases, img) {
		var l3tcase = l3t_map[cases];
		if (l3tcase) {
			image.ftollImage.drawFace(getAnyState(ep0, l3tcase[0], l3tcase[1], l3tcase[2], rl0, false).toFaceCube(), img);
		}
	}

	function getTCPImage(cases, img) {
		var tcpcase = tcp_map[cases];
		if (tcpcase) {
			image.ftollImage.drawFace(getAnyState(ep0, tcpcase[0], tcpco, tcpcase[1], rl0, false).toFaceCube(), img);
		}
	}


	scrMgr.reg('ftoso', getAnyScramble.bind(null, epf, cpf, cof, uff, rlf, false))
		('ftol3t', getL3TScramble, [l3tfilter, l3tprobs, getL3TImage])
		('ftol4t', getL4TScramble)
		('ftotcp', getTCPScramble, [tcpfilter, tcpprobs, getTCPImage])
		('ftoedge', getAnyScramble.bind(null, epf, cp0, co0, uf0, rl0, false))
		('ftocent', getAnyScramble.bind(null, ep0, cp0, co0, uff, rlf, false))
		('ftocorn', getAnyScramble.bind(null, ep0, cpf, cof, uf0, rl0, false));
})();
