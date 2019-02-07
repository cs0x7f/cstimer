/*

scramble_333.js

3x3x3 Solver / Scramble Generator in Javascript.

The core 3x3x3 code is from a min2phase solver by Shuang Chen.
Compiled to Javascript using GWT.
(There may be a lot of redundant code right now, but it's still really fast.)

 */
"use strict";

var scramble_333 = (function(getNPerm, setNPerm, set8Perm, getNParity, rn, rndEl) {

	var Ux1 = 0,
		Ux2 = 1,
		Ux3 = 2,
		Rx1 = 3,
		Rx2 = 4,
		Rx3 = 5,
		Fx1 = 6,
		Fx2 = 7,
		Fx3 = 8,
		Dx1 = 9,
		Dx2 = 10,
		Dx3 = 11,
		Lx1 = 12,
		Lx2 = 13,
		Lx3 = 14,
		Bx1 = 15,
		Bx2 = 16,
		Bx3 = 17;

	function CubieCube_$$init(obj) {
		obj.cp = [0, 1, 2, 3, 4, 5, 6, 7];
		obj.co = [0, 0, 0, 0, 0, 0, 0, 0];
		obj.ep = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
		obj.eo = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	}

	function $setFlip(obj, idx) {
		var i, parity;
		parity = 0;
		for (i = 10; i >= 0; --i) {
			parity ^= obj.eo[i] = (idx & 1);
			idx >>= 1;
		}
		obj.eo[11] = parity;
	}

	function $setTwist(obj, idx) {
		var i, twst;
		twst = 0;
		for (i = 6; i >= 0; --i) {
			twst += obj.co[i] = idx % 3;
			idx = ~~(idx / 3);
		}
		obj.co[7] = (15 - twst) % 3;
	}

	function CornMult(a, b, prod) {
		var corn, ori, oriA, oriB;
		for (corn = 0; corn < 8; ++corn) {
			prod.cp[corn] = a.cp[b.cp[corn]];
			oriA = a.co[b.cp[corn]];
			oriB = b.co[corn];
			ori = oriA;
			ori += oriA < 3 ? oriB : 6 - oriB;
			ori %= 3;
			((oriA >= 3) !== (oriB >= 3)) && (ori += 3);
			prod.co[corn] = ori;
		}
	}

	function CubieCube() {
		CubieCube_$$init(this);
	}

	function CubieCube1(cperm, twist, eperm, flip) {
		CubieCube_$$init(this);
		set8Perm(this.cp, cperm);
		$setTwist(this, twist);
		setNPerm(this.ep, eperm, 12);
		$setFlip(this, flip);
	}

	function EdgeMult(a, b, prod) {
		var ed;
		for (ed = 0; ed < 12; ++ed) {
			prod.ep[ed] = a.ep[b.ep[ed]];
			prod.eo[ed] = b.eo[ed] ^ a.eo[b.ep[ed]];
		}
	}

	function initMove() {
		initMove = $.noop;
		var a, p;
		moveCube[0] = new CubieCube1(15120, 0, 119750400, 0);
		moveCube[3] = new CubieCube1(21021, 1494, 323403417, 0);
		moveCube[6] = new CubieCube1(8064, 1236, 29441808, 550);
		moveCube[9] = new CubieCube1(9, 0, 5880, 0);
		moveCube[12] = new CubieCube1(1230, 412, 2949660, 0);
		moveCube[15] = new CubieCube1(224, 137, 328552, 137);
		for (a = 0; a < 18; a += 3) {
			for (p = 0; p < 2; ++p) {
				moveCube[a + p + 1] = new CubieCube;
				EdgeMult(moveCube[a + p], moveCube[a], moveCube[a + p + 1]);
				CornMult(moveCube[a + p], moveCube[a], moveCube[a + p + 1]);
			}
		}
	}

	var _ = CubieCube1.prototype = CubieCube.prototype;
	var moveCube = [];
	var cornerFacelet = [
		[8, 9, 20],
		[6, 18, 38],
		[0, 36, 47],
		[2, 45, 11],
		[29, 26, 15],
		[27, 44, 24],
		[33, 53, 42],
		[35, 17, 51]
	];
	var edgeFacelet = [
		[5, 10],
		[7, 19],
		[3, 37],
		[1, 46],
		[32, 16],
		[28, 25],
		[30, 43],
		[34, 52],
		[23, 12],
		[21, 41],
		[50, 39],
		[48, 14]
	];

	function toFaceCube(cc) {
		var c, e, f, i, j, n, ori, ts;
		f = [];
		ts = [85, 82, 70, 68, 76, 66];
		for (i = 0; i < 54; ++i) {
			f[i] = ts[~~(i / 9)];
		}
		for (c = 0; c < 8; ++c) {
			j = cc.cp[c];
			ori = cc.co[c];
			for (n = 0; n < 3; ++n)
				f[cornerFacelet[c][(n + ori) % 3]] = ts[~~(cornerFacelet[j][n] / 9)];
		}
		for (e = 0; e < 12; ++e) {
			j = cc.ep[e];
			ori = cc.eo[e];
			for (n = 0; n < 2; ++n)
				f[edgeFacelet[e][(n + ori) % 2]] = ts[~~(edgeFacelet[j][n] / 9)];
		}
		return String.fromCharCode.apply(null, f);
	}


	// SCRAMBLERS

	var search = new min2phase.Search();

	function getRandomScramble() {
		return getAnyScramble(0xffffffffffff, 0xffffffffffff, 0xffffffff, 0xffffffff);
	}

	function getFMCScramble() {
		var scramble = "",
			axis1, axis2, axisl1, axisl2;
		do {
			scramble = getRandomScramble();
			var moveseq = scramble.split(' ');
			if (moveseq.length < 3) {
				continue;
			}
			axis1 = moveseq[0][0];
			axis2 = moveseq[1][0];
			axisl1 = moveseq[moveseq.length - 2][0];
			axisl2 = moveseq[moveseq.length - 3][0];
		} while (
			axis1 == 'F' || axis1 == 'B' && axis2 == 'F' ||
			axisl1 == 'R' || axisl1 == 'L' && axisl2 == 'R');
		return "R' U' F " + scramble + "R' U' F";
	}

	function cntU(b) {
		for (var c = 0, a = 0; a < b.length; a++) - 1 == b[a] && c++;
		return c
	}

	function fixOri(arr, cntU, base) {
		var sum = 0;
		var idx = 0;
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] != -1) {
				sum += arr[i];
			}
		}
		sum %= base;
		for (var i = 0; i < arr.length - 1; i++) {
			if (arr[i] == -1) {
				if (cntU-- == 1) {
					arr[i] = ((base << 4) - sum) % base;
				} else {
					arr[i] = rn(base);
					sum += arr[i];
				}
			}
			idx *= base;
			idx += arr[i];
		}
		return idx;
	}

	function fixPerm(arr, cntU, parity) {
		var val = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] != -1) {
				val[arr[i]] = -1;
			}
		}
		for (var i = 0, j = 0; i < val.length; i++) {
			if (val[i] != -1) {
				val[j++] = val[i];
			}
		}
		var last;
		for (var i = 0; i < arr.length && cntU > 0; i++) {
			if (arr[i] == -1) {
				var r = rn(cntU);
				arr[i] = val[r];
				for (var j = r; j < 11; j++) {
					val[j] = val[j + 1];
				}
				if (cntU-- == 2) {
					last = i;
				}
			}
		}
		if (getNParity(getNPerm(arr, arr.length), arr.length) == 1 - parity) {
			var temp = arr[i - 1];
			arr[i - 1] = arr[last];
			arr[last] = temp;
		}
		return getNPerm(arr, arr.length);
	}

	//arr: 53 bit integer
	function parseMask(arr, length) {
		if ('number' !== typeof arr) {
			return arr;
		}
		var ret = [];
		for (var i = 0; i < length; i++) {
			var val = arr & 0xf; // should use "/" instead of ">>" to avoid unexpected type conversion
			ret[i] = val == 15 ? -1 : val;
			arr /= 16;
		}
		return ret;
	}

	var aufsuff = [
		[],
		[Ux1],
		[Ux2],
		[Ux3]
	];

	var rlpresuff = [
		[],
		[Rx1, Lx3],
		[Rx2, Lx2],
		[Rx3, Lx1]
	];

	var rlappsuff = ["", "x'", "x2", "x"];

	var emptysuff = [
		[]
	];

	function getAnyScramble(_ep, _eo, _cp, _co, _rndapp, _rndpre) {
		initMove();
		_rndapp = _rndapp || emptysuff;
		_rndpre = _rndpre || emptysuff;
		_ep = parseMask(_ep, 12);
		_eo = parseMask(_eo, 12);
		_cp = parseMask(_cp, 8);
		_co = parseMask(_co, 8);
		var solution = "";
		do {
			var eo = _eo.slice();
			var ep = _ep.slice();
			var co = _co.slice();
			var cp = _cp.slice();
			var neo = fixOri(eo, cntU(eo), 2);
			var nco = fixOri(co, cntU(co), 3);
			var nep, ncp;
			var ue = cntU(ep);
			var uc = cntU(cp);
			if (ue == 0 && uc == 0) {
				nep = getNPerm(ep, 12);
				ncp = getNPerm(cp, 8);
			} else if (ue != 0 && uc == 0) {
				ncp = getNPerm(cp, 8);
				nep = fixPerm(ep, ue, getNParity(ncp, 8));
			} else if (ue == 0 && uc != 0) {
				nep = getNPerm(ep, 12);
				ncp = fixPerm(cp, uc, getNParity(nep, 12));
			} else {
				nep = fixPerm(ep, ue, -1);
				ncp = fixPerm(cp, uc, getNParity(nep, 12));
			}
			if (ncp + nco + nep + neo == 0) {
				continue;
			}
			var cc = new CubieCube1(ncp, nco, nep, neo);
			var cc2 = new CubieCube;
			var rndpre = rndEl(_rndpre);
			var rndapp = rndEl(_rndapp);
			for (var i = 0; i < rndpre.length; i++) {
				CornMult(moveCube[rndpre[i]], cc, cc2);
				EdgeMult(moveCube[rndpre[i]], cc, cc2);
				var tmp = cc2;
				cc2 = cc;
				cc = tmp;
			}
			for (var i = 0; i < rndapp.length; i++) {
				CornMult(cc, moveCube[rndapp[i]], cc2);
				EdgeMult(cc, moveCube[rndapp[i]], cc2);
				var tmp = cc2;
				cc2 = cc;
				cc = tmp;
			}
			var posit = toFaceCube(cc);
			var search0 = new min2phase.Search();
			solution = search0.solution(posit, 21, 1e9, 50, 2);
		} while (solution.length <= 3);
		return solution.replace(/ +/g, ' ');
	}

	function getEdgeScramble() {
		return getAnyScramble(0xffffffffffff, 0xffffffffffff, 0x76543210, 0x00000000);
	}

	function getCornerScramble() {
		return getAnyScramble(0xba9876543210, 0x000000000000, 0xffffffff, 0xffffffff);
	}

	function getLLScramble() {
		return getAnyScramble(0xba987654ffff, 0x00000000ffff, 0x7654ffff, 0x0000ffff);
	}

	var f2l_map = [
		0x2000, // Easy-01
		0x1011, // Easy-02
		0x2012, // Easy-03
		0x1003, // Easy-04
		0x2003, // RE-05
		0x1012, // RE-06
		0x2002, // RE-07
		0x1013, // RE-08
		0x2013, // REFC-09
		0x1002, // REFC-10
		0x2010, // REFC-11
		0x1001, // REFC-12
		0x2011, // REFC-13
		0x1000, // REFC-14
		0x2001, // SPGO-15
		0x1010, // SPGO-16
		0x0000, // SPGO-17
		0x0011, // SPGO-18
		0x0003, // PMS-19
		0x0012, // PMS-20
		0x0002, // PMS-21
		0x0013, // PMS-22
		0x0001, // Weird-23
		0x0010, // Weird-24
		0x0400, // CPEU-25
		0x0411, // CPEU-26
		0x1400, // CPEU-27
		0x2411, // CPEU-28
		0x1411, // CPEU-29
		0x2400, // CPEU-30
		0x0018, // EPCU-31
		0x0008, // EPCU-32
		0x2008, // EPCU-33
		0x1008, // EPCU-34
		0x2018, // EPCU-35
		0x1018, // EPCU-36
		0x0418, // ECP-37
		0x1408, // ECP-38
		0x2408, // ECP-39
		0x1418, // ECP-40
		0x2418, // ECP-41
		0x0408	// Solved-42
	];

	var f2lprobs = [
		4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1
	];

	var f2lfilter = [
		'Easy-01', 'Easy-02', 'Easy-03', 'Easy-04', 'RE-05', 'RE-06', 'RE-07', 'RE-08', 'REFC-09', 'REFC-10', 'REFC-11', 'REFC-12', 'REFC-13', 'REFC-14', 'SPGO-15', 'SPGO-16', 'SPGO-17', 'SPGO-18', 'PMS-19', 'PMS-20', 'PMS-21', 'PMS-22', 'Weird-23', 'Weird-24', 'CPEU-25', 'CPEU-26', 'CPEU-27', 'CPEU-28', 'CPEU-29', 'CPEU-30', 'EPCU-31', 'EPCU-32', 'EPCU-33', 'EPCU-34', 'EPCU-35', 'EPCU-36', 'ECP-37', 'ECP-38', 'ECP-39', 'ECP-40', 'ECP-41', 'Solved-42'
	];

	function getLSLLScramble(type, length, cases) {
		var caze = f2l_map[scrMgr.fixCase(cases, f2lprobs)];
		var ep = Math.pow(16, caze & 0xf);
		var eo = 0xf ^ (caze >> 4 & 1);
		var cp = Math.pow(16, caze >> 8 & 0xf);
		var co = 0xf ^ (caze >> 12 & 3);
		return getAnyScramble(0xba9f7654ffff - 7 * ep, 0x000f0000ffff - eo * ep, 0x765fffff - 0xb * cp, 0x000fffff - co * cp);
	}

	function getF2LScramble() {
		return getAnyScramble(0xffff7654ffff, 0xffff0000ffff, 0xffffffff, 0xffffffff);
	}

	var zbll_map = [
		[0x3210, 0x2121], // H-BBFF
		[0x3012, 0x2121], // H-FBFB
		[0x3120, 0x2121], // H-RFLF
		[0x3201, 0x2121], // H-RLFF
		[0x3012, 0x1020], // L-FBRL
		[0x3021, 0x1020], // L-LBFF
		[0x3201, 0x1020], // L-LFFB
		[0x3102, 0x1020], // L-LFFR
		[0x3210, 0x1020], // L-LRFF
		[0x3120, 0x1020], // L-RFBL
		[0x3102, 0x1122], // Pi-BFFB
		[0x3120, 0x1122], // Pi-FBFB
		[0x3012, 0x1122], // Pi-FRFL
		[0x3021, 0x1122], // Pi-FRLF
		[0x3210, 0x1122], // Pi-LFRF
		[0x3201, 0x1122], // Pi-RFFL
		[0x3120, 0x2220], // S-FBBF
		[0x3102, 0x2220], // S-FBFB
		[0x3210, 0x2220], // S-FLFR
		[0x3201, 0x2220], // S-FLRF
		[0x3021, 0x2220], // S-LFFR
		[0x3012, 0x2220], // S-LFRF
		[0x3210, 0x2100], // T-BBFF
		[0x3012, 0x2100], // T-FBFB
		[0x3201, 0x2100], // T-FFLR
		[0x3120, 0x2100], // T-FLFR
		[0x3102, 0x2100], // T-RFLF
		[0x3021, 0x2100], // T-RLFF
		[0x3021, 0x1200], // U-BBFF
		[0x3201, 0x1200], // U-BFFB
		[0x3012, 0x1200], // U-FFLR
		[0x3120, 0x1200], // U-FRLF
		[0x3102, 0x1200], // U-LFFR
		[0x3210, 0x1200], // U-LRFF
		[0x3102, 0x1101], // aS-FBBF
		[0x3120, 0x1101], // aS-FBFB
		[0x3012, 0x1101], // aS-FRFL
		[0x3021, 0x1101], // aS-FRLF
		[0x3210, 0x1101], // aS-LFRF
		[0x3201, 0x1101], // aS-RFFL
		[0xffff, 0x0000] // PLL
	];

	var zbprobs = [1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3];

	var zbfilter = ['H-BBFF', 'H-FBFB', 'H-RFLF', 'H-RLFF', 'L-FBRL', 'L-LBFF', 'L-LFFB', 'L-LFFR', 'L-LRFF', 'L-RFBL', 'Pi-BFFB', 'Pi-FBFB', 'Pi-FRFL', 'Pi-FRLF', 'Pi-LFRF', 'Pi-RFFL', 'S-FBBF', 'S-FBFB', 'S-FLFR', 'S-FLRF', 'S-LFFR', 'S-LFRF', 'T-BBFF', 'T-FBFB', 'T-FFLR', 'T-FLFR', 'T-RFLF', 'T-RLFF', 'U-BBFF', 'U-BFFB', 'U-FFLR', 'U-FRLF', 'U-LFFR', 'U-LRFF', 'aS-FBBF', 'aS-FBFB', 'aS-FRFL', 'aS-FRLF', 'aS-LFRF', 'aS-RFFL', 'PLL'];

	function getZBLLScramble(type, length, cases) {
		var zbcase = zbll_map[scrMgr.fixCase(cases, zbprobs)];
		return getAnyScramble(0xba987654ffff, 0, zbcase[0] + 0x76540000, zbcase[1], aufsuff, aufsuff);
	}

	function getZZLLScramble() {
		return getAnyScramble(0xba9876543f1f, 0x000000000000, 0x7654ffff, 0x0000ffff, aufsuff);
	}

	function getZBLSScramble() {
		return getAnyScramble(0xba9f7654ffff, 0x000000000000, 0x765fffff, 0x000fffff);
	}

	function getLSEScramble() {
		var rnd4 = rn(4);
		return getAnyScramble(0xba98f6f4ffff, 0x0000f0f0ffff, 0x76543210, 0x00000000, [rlpresuff[rnd4]], aufsuff) + rlappsuff[rnd4];
	}

	var cmll_map = [
		0x0000, // O or solved
		0x1212, // H
		0x0102, // L
		0x1122, // Pi
		0x0222, // S
		0x0021, // T
		0x0012, // U
		0x0111 // aS
	];
	var cmprobs = [6, 12, 24, 24, 24, 24, 24, 24];
	var cmfilter = ['O', 'H', 'L', 'Pi', 'S', 'T', 'U', 'aS'];

	function getCMLLScramble(type, length, cases) {
		var rnd4 = rn(4);
		var presuff = [];
		for (var i = 0; i < aufsuff.length; i++) {
			presuff.push(aufsuff[i].concat(rlpresuff[rnd4]));
		}
		return getAnyScramble(0xba98f6f4ffff, 0x0000f0f0ffff, 0x7654ffff, cmll_map[scrMgr.fixCase(cases, cmprobs)], presuff, aufsuff) + rlappsuff[rnd4];
	}

	function getCLLScramble() {
		return getAnyScramble(0xba9876543210, 0x000000000000, 0x7654ffff, 0x0000ffff);
	}

	function getELLScramble() {
		return getAnyScramble(0xba987654ffff, 0x00000000ffff, 0x76543210, 0x00000000);
	}

	function get2GLLScramble() {
		return getAnyScramble(0xba987654ffff, 0x000000000000, 0x76543210, 0x0000ffff, aufsuff);
	}

	var pll_map = [
		[0x1032, 0x3210], // H
		[0x3102, 0x3210], // Ua
		[0x3021, 0x3210], // Ub
		[0x2301, 0x3210], // Z
		[0x3210, 0x3021], // Aa
		[0x3210, 0x3102], // Ab
		[0x3210, 0x2301], // E
		[0x3012, 0x3201], // F
		[0x2130, 0x3021], // Gb
		[0x1320, 0x3102], // Ga
		[0x3021, 0x3102], // Gc
		[0x3102, 0x3021], // Gd
		[0x3201, 0x3201], // Ja
		[0x3120, 0x3201], // Jb
		[0x1230, 0x3012], // Na
		[0x3012, 0x3012], // Nb
		[0x0213, 0x3201], // Ra
		[0x2310, 0x3201], // Rb
		[0x1230, 0x3201], // T
		[0x3120, 0x3012], // V
		[0x3201, 0x3012] // Y
	];

	var pllprobs = [
		1, 4, 4, 2,
		4, 4, 2, 4,
		4, 4, 4, 4,
		4, 4, 1, 1,
		4, 4, 4, 4, 4
	];

	var pllfilter = [
		'H', 'Ua', 'Ub', 'Z',
		'Aa', 'Ab', 'E', 'F',
		'Ga', 'Gb', 'Gc', 'Gd',
		'Ja', 'Jb', 'Na', 'Nb',
		'Ra', 'Rb', 'T', 'V', 'Y'
	];

	function getPLLScramble(type, length, cases) {
		var pllcase = pll_map[scrMgr.fixCase(cases, pllprobs)];
		return getAnyScramble(pllcase[0] + 0xba9876540000, 0x000000000000, pllcase[1] + 0x76540000, 0x00000000, aufsuff, aufsuff);
	}

	var oll_map = [
		[0x0000, 0x0000], // PLL
		[0x1111, 0x1212], // Point-1
		[0x1111, 0x1122], // Point-2
		[0x1111, 0x0222], // Point-3
		[0x1111, 0x0111], // Point-4
		[0x0011, 0x2022], // Square-5
		[0x0011, 0x1011], // Square-6
		[0x0011, 0x2202], // SLBS-7
		[0x0011, 0x0111], // SLBS-8
		[0x0011, 0x1110], // Fish-9
		[0x0011, 0x2220], // Fish-10
		[0x0011, 0x0222], // SLBS-11
		[0x0011, 0x1101], // SLBS-12
		[0x0101, 0x2022], // Knight-13
		[0x0101, 0x0111], // Knight-14
		[0x0101, 0x0222], // Knight-15
		[0x0101, 0x1011], // Knight-16
		[0x1111, 0x0102], // Point-17
		[0x1111, 0x0012], // Point-18
		[0x1111, 0x0021], // Point-19
		[0x1111, 0x0000], // CO-20
		[0x0000, 0x1212], // OCLL-21
		[0x0000, 0x1122], // OCLL-22
		[0x0000, 0x0012], // OCLL-23
		[0x0000, 0x0021], // OCLL-24
		[0x0000, 0x0102], // OCLL-25
		[0x0000, 0x0111], // OCLL-26
		[0x0000, 0x0222], // OCLL-27
		[0x0011, 0x0000], // CO-28
		[0x0011, 0x0210], // Awkward-29
		[0x0011, 0x2100], // Awkward-30
		[0x0011, 0x0021], // P-31
		[0x0011, 0x1002], // P-32
		[0x0101, 0x0021], // T-33
		[0x0101, 0x0210], // C-34
		[0x0011, 0x1020], // Fish-35
		[0x0011, 0x0102], // W-36
		[0x0011, 0x2010], // Fish-37
		[0x0011, 0x0201], // W-38
		[0x0101, 0x1020], // BLBS-39
		[0x0101, 0x0102], // BLBS-40
		[0x0011, 0x1200], // Awkward-41
		[0x0011, 0x0120], // Awkward-42
		[0x0011, 0x0012], // P-43
		[0x0011, 0x2001], // P-44
		[0x0101, 0x0012], // T-45
		[0x0101, 0x0120], // C-46
		[0x0011, 0x1221], // L-47
		[0x0011, 0x1122], // L-48
		[0x0011, 0x2112], // L-49
		[0x0011, 0x2211], // L-50
		[0x0101, 0x1221], // I-51
		[0x0101, 0x1122], // I-52
		[0x0011, 0x2121], // L-53
		[0x0011, 0x1212], // L-54
		[0x0101, 0x2121], // I-55
		[0x0101, 0x1212], // I-56
		[0x0101, 0x0000], // CO-57
	];
	var ollprobs = [1, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2];
	var ollfilter = ['PLL', 'Point-1', 'Point-2', 'Point-3', 'Point-4', 'Square-5', 'Square-6', 'SLBS-7', 'SLBS-8', 'Fish-9', 'Fish-10', 'SLBS-11', 'SLBS-12', 'Knight-13', 'Knight-14', 'Knight-15', 'Knight-16', 'Point-17', 'Point-18', 'Point-19', 'CO-20', 'OCLL-21', 'OCLL-22', 'OCLL-23', 'OCLL-24', 'OCLL-25', 'OCLL-26', 'OCLL-27', 'CO-28', 'Awkward-29', 'Awkward-30', 'P-31', 'P-32', 'T-33', 'C-34', 'Fish-35', 'W-36', 'Fish-37', 'W-38', 'BLBS-39', 'BLBS-40', 'Awkward-41', 'Awkward-42', 'P-43', 'P-44', 'T-45', 'C-46', 'L-47', 'L-48', 'L-49', 'L-50', 'I-51', 'I-52', 'L-53', 'L-54', 'I-55', 'I-56', 'CO-57'];

	function getOLLScramble(type, length, cases) {
		var ollcase = oll_map[scrMgr.fixCase(cases, ollprobs)];
		return getAnyScramble(0xba987654ffff, ollcase[0], 0x7654ffff, ollcase[1], aufsuff, aufsuff);
	}

	function getEOLineScramble() {
		return getAnyScramble(0xffff7f5fffff, 0x000000000000, 0xffffffff, 0xffffffff);
	}

	function getEasyCrossScramble(type, length) {
		var cases = cross.getEasyCross(length);
		return getAnyScramble(cases[0], cases[1], 0xffffffff, 0xffffffff);
	}

	function genFacelet(facelet) {
		return search.solution(facelet, 21, 1e9, 50, 2);
	}

	function solvFacelet(facelet) {
		return search.solution(facelet, 21, 1e9, 50, 0);
	}

	scrMgr.reg('333', getRandomScramble)
		('333fm', getFMCScramble)
		('edges', getEdgeScramble)
		('corners', getCornerScramble)
		('ll', getLLScramble)
		('lsll2', getLSLLScramble, [f2lfilter, f2lprobs])
		('f2l', getF2LScramble)
		('zbll', getZBLLScramble, [zbfilter, zbprobs])
		('zzll', getZZLLScramble)
		('zbls', getZBLSScramble)
		('lse', getLSEScramble)
		('cmll', getCMLLScramble, [cmfilter, cmprobs])
		('cll', getCLLScramble)
		('ell', getELLScramble)
		('pll', getPLLScramble, [pllfilter, pllprobs])
		('oll', getOLLScramble, [ollfilter, ollprobs])
		('2gll', get2GLLScramble)
		('easyc', getEasyCrossScramble)
		('eoline', getEOLineScramble);

	return {
		/* mark2 interface */
		getRandomScramble: getRandomScramble, //getRandomScramble,

		/* added methods */
		getEdgeScramble: getEdgeScramble,
		getCornerScramble: getCornerScramble,
		getLLScramble: getLLScramble,
		getLSLLScramble: getLSLLScramble,
		getZBLLScramble: getZBLLScramble,
		getZZLLScramble: getZZLLScramble,
		getF2LScramble: getF2LScramble,
		getLSEScramble: getLSEScramble,
		getCMLLScramble: getCMLLScramble,
		getCLLScramble: getCLLScramble,
		getELLScramble: getELLScramble,
		getAnyScramble: getAnyScramble,
		genFacelet: genFacelet,
		solvFacelet: solvFacelet
	};

})(mathlib.getNPerm, mathlib.setNPerm, mathlib.set8Perm, mathlib.getNParity, mathlib.rn, mathlib.rndEl);