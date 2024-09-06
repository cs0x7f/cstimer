/*

scramble_333.js

3x3x3 Solver / Scramble Generator in Javascript.

The core 3x3x3 code is from a min2phase solver by Shuang Chen.
Compiled to Javascript using GWT.
(There may be a lot of redundant code right now, but it's still really fast.)

 */
"use strict";

var scramble_333 = (function(getNPerm, setNPerm, getNParity, rn, rndEl) {

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

	function renderFacelet(solved, cc, resultMap) {
		var f = cc.toPerm();
		var ret = [];
		for (var i = 0; i < resultMap.length; i++) {
			ret[i] = solved[f[resultMap[i]]];
		}
		return ret.join('');
	}

	// SCRAMBLERS

	var search = new min2phase.Search();

	function getRandomScramble() {
		return getAnyScramble(0xffffffffffff, 0xffffffffffff, 0xffffffff, 0xffffffff);
	}

	function getFMCScramble() {
		var scramble = getAnyScramble(0xffffffffffff, 0xffffffffffff, 0xffffffff, 0xffffffff, 0, undefined, undefined, 2, 1);
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
		if (cntU == 1) {
			arr.splice(-1, 1, ((base << 4) - sum) % base);
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

	function getAnyScramble(_ep, _eo, _cp, _co, neut, _rndapp, _rndpre, firstAxisFilter, lastAxisFilter) {
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
			if (ue == 1) {
				fixPerm(ep, ue, -1);
				ue = 0;
			}
			if (uc == 1) {
				fixPerm(cp, uc, -1);
				uc = 0;
			}
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
			var rndpre = rndEl(_rndpre);
			var rndapp = rndEl(_rndapp);
			var cc = new mathlib.CubieCube();
			var cd = new mathlib.CubieCube();
			for (var i = 0; i < 12; i++) {
				cc.ea[i] = ep[i] << 1 | eo[i];
				if (i < 8) {
					cc.ca[i] = co[i] << 3 | cp[i];
				}
			}
			for (var i = 0; i < rndpre.length; i++) {
				mathlib.CubieCube.CubeMult(mathlib.CubieCube.moveCube[rndpre[i]], cc, cd);
				cc.init(cd.ca, cd.ea);
			}
			for (var i = 0; i < rndapp.length; i++) {
				mathlib.CubieCube.CubeMult(cc, mathlib.CubieCube.moveCube[rndapp[i]], cd);
				cc.init(cd.ca, cd.ea);
			}
			if (neut) {
				cc.ori = mathlib.rn([1, 4, 8, 1, 1, 1, 24][neut]);
				cc.selfConj();
				cc.ori = 0;
			}
			var posit = cc.toFaceCube();
			solution = search.solution(posit, 21, 1e9, 50, 2, lastAxisFilter, firstAxisFilter);
		} while (solution.length <= 3);
		return solution.replace(/ +/g, ' ');
	}

	function getEdgeScramble() {
		return getAnyScramble(0xffffffffffff, 0xffffffffffff, 0x76543210, 0x00000000);
	}

	function getCornerScramble() {
		return getAnyScramble(0xba9876543210, 0x000000000000, 0xffffffff, 0xffffffff);
	}

	function getLLScramble(type, length, cases, neut) {
		return getAnyScramble(0xba987654ffff, 0x00000000ffff, 0x7654ffff, 0x0000ffff, neut);
	}

	var f2l_map = [
		[0x2000, 4, 'Easy-01'],
		[0x1011, 4, 'Easy-02'],
		[0x2012, 4, 'Easy-03'],
		[0x1003, 4, 'Easy-04'],
		[0x2003, 4, 'RE-05'],
		[0x1012, 4, 'RE-06'],
		[0x2002, 4, 'RE-07'],
		[0x1013, 4, 'RE-08'],
		[0x2013, 4, 'REFC-09'],
		[0x1002, 4, 'REFC-10'],
		[0x2010, 4, 'REFC-11'],
		[0x1001, 4, 'REFC-12'],
		[0x2011, 4, 'REFC-13'],
		[0x1000, 4, 'REFC-14'],
		[0x2001, 4, 'SPGO-15'],
		[0x1010, 4, 'SPGO-16'],
		[0x0000, 4, 'SPGO-17'],
		[0x0011, 4, 'SPGO-18'],
		[0x0003, 4, 'PMS-19'],
		[0x0012, 4, 'PMS-20'],
		[0x0002, 4, 'PMS-21'],
		[0x0013, 4, 'PMS-22'],
		[0x0001, 4, 'Weird-23'],
		[0x0010, 4, 'Weird-24'],
		[0x0400, 4, 'CPEU-25'],
		[0x0411, 4, 'CPEU-26'],
		[0x1400, 4, 'CPEU-27'],
		[0x2411, 4, 'CPEU-28'],
		[0x1411, 4, 'CPEU-29'],
		[0x2400, 4, 'CPEU-30'],
		[0x0018, 4, 'EPCU-31'],
		[0x0008, 4, 'EPCU-32'],
		[0x2008, 4, 'EPCU-33'],
		[0x1008, 4, 'EPCU-34'],
		[0x2018, 4, 'EPCU-35'],
		[0x1018, 4, 'EPCU-36'],
		[0x0418, 1, 'ECP-37'],
		[0x1408, 1, 'ECP-38'],
		[0x2408, 1, 'ECP-39'],
		[0x1418, 1, 'ECP-40'],
		[0x2418, 1, 'ECP-41'],
		[0x0408, 1, 'Solved-42']
	];
	var f2lprobs = mathlib.idxArray(f2l_map, 1);
	var f2lfilter = mathlib.idxArray(f2l_map, 2);

	function getLSLLScramble(type, length, cases, neut) {
		var caze = f2l_map[scrMgr.fixCase(cases, f2lprobs)][0];
		var ep = Math.pow(16, caze & 0xf);
		var eo = 0xf ^ (caze >> 4 & 1);
		var cp = Math.pow(16, caze >> 8 & 0xf);
		var co = 0xf ^ (caze >> 12 & 3);
		return getAnyScramble(0xba9f7654ffff - 7 * ep, 0x000f0000ffff - eo * ep, 0x765fffff - 0xb * cp, 0x000fffff - co * cp, neut, aufsuff);
	}

	var eols_map = [];
	var eolsprobs = [];
	var eolsfilter = [];
	for (var i = 0; i < f2l_map.length; i++) {
		if (f2l_map[i][0] & 0xf0) {
			continue;
		}
		eols_map.push(f2l_map[i]);
		eolsprobs.push(f2lprobs[i]);
		eolsfilter.push(f2lfilter[i]);
	}

	function getEOLSScramble(type, length, cases, neut) {
		var caze = eols_map[scrMgr.fixCase(cases, eolsprobs)][0];
		var ep = Math.pow(16, caze & 0xf);
		var cp = Math.pow(16, caze >> 8 & 0xf);
		var co = 0xf ^ (caze >> 12 & 3);
		return getAnyScramble(0xba9f7654ffff - 7 * ep, 0x000000000000, 0x765fffff - 0xb * cp, 0x000fffff - co * cp, neut, aufsuff);
	}

	function getF2LImage(piece0, stmap, stprobs, cases, canvas) {
		var emap = [[5, 10], [7, 19], [3, -1], [1, -1], null, null, null, null, [23, 12]];
		var cmap = [[8, 20, 9], [6, -1, 18], [0, -1, -1], [2, 11, -1], [-1, 15, 26]];
		var caze = stmap[scrMgr.fixCase(cases, stprobs)][0];
		var ep = emap[caze & 0xf];
		var eo = caze >> 4 & 1;
		var cp = cmap[caze >> 8 & 0xf];
		var co = caze >> 12 & 3;
		var pieces = piece0.split('');
		for (var i1 = 0; i1 < 3; i1++) {
			if (i1 < 2 && ep[i1] >= 0) {
				pieces[ep[i1]] = 'BR'.charAt(eo ^ i1);
			}
			if (cp[i1] >= 0) {
				pieces[cp[i1]] = 'URB'.charAt((co + 3 + i1) % 3);
			}
		}
		image.face3Image(pieces.join(''), canvas);
	}

	var wvls_map = [];
	var wvlsprobs = [];
	var wvlsfilter = [
		'Oriented', 'Rectangle-1', 'Rectangle-2', 'Tank-1', 'Bowtie-1', 'Bowtie-3', 'Tank-2', 'Bowtie-2', 'Bowtie-4', 'Snake-1', 'Adjacent-1', 'Adjacent-2', 'Gun-Far', 'Sune-1', 'Pi-Near', 'Gun-Back', 'Pi-Front', 'H-Side', 'Snake-2', 'Adjacent-3', 'Adjacent-4', 'Gun-Sides', 'H-Front', 'Pi-Back', 'Gun-Near', 'Pi-Far', 'Sune-2'
	];

	for (var i = 0; i < 27; i++) {
		wvls_map[i] = ~~(i / 9) << 12 | ~~(i / 3) % 3 << 8 | i % 3;
		wvlsprobs[i] = 1;
	}

	function getWVLSScramble(type, length, cases, neut) {
		var caze = wvls_map[scrMgr.fixCase(cases, wvlsprobs)];
		return getAnyScramble(0xba9f7654ff8f, 0x000000000000, 0x765fff4f, 0x000f0020 | caze, neut);
	}

	function getWVLSImage(cases, canvas) {
		var caze = wvls_map[scrMgr.fixCase(cases, wvlsprobs)];
		var fill = ['DGG', 'GDG', 'GGD'];
		fill = fill[caze & 3] + fill[caze >> 8 & 3] + fill[caze >> 12 & 3];
		image.llImage.drawImage('3D6DDDBB0RR21G87G54GU'.replace(/[0-9]/g, function(v) {
			return fill[~~v];
		}), null, canvas);
	}

	var vls_map = [];
	var vlsprobs = [];
	var vlsfilter = [];

	for (var i = 0; i < 27 * 8; i++) {
		var co = i % 27;
		var eo = ~~(i / 27);
		vls_map[i] = [~~(co / 9) % 3 << 12 | ~~(co / 3) % 3 << 8 | co % 3, (eo >> 2 & 1) << 12 | (eo >> 1 & 1) << 8 | eo & 1];
		vlsprobs[i] = 1;
		vlsfilter[i] = ["WVLS", "UB", "UF", "UF UB", "UL", "UB UL", "UF UL", "No Edge"][eo] + "-" + (co + 1);
	}

	function getVLSScramble(type, length, cases, neut) {
		var caze = vls_map[scrMgr.fixCase(cases, vlsprobs)];
		return getAnyScramble(0xba9f7654ff8f, 0x000f00000000 + caze[1], 0x765fff4f, 0x000f0020 + caze[0], neut, [[Ux3]]);
	}

	function getVLSImage(cases, canvas) {
		var caze = vls_map[scrMgr.fixCase(cases, vlsprobs)];
		var fillc = ['DGG', 'GDG', 'GGD'];
		fillc = fillc[caze[0] & 3] + fillc[caze[0] >> 8 & 3] + fillc[caze[0] >> 12 & 3];
		var fille = ['DG', 'GD'];
		fille = fille[caze[1] & 3] + fille[caze[1] >> 8 & 3] + fille[caze[1] >> 12 & 3];
		image.llImage.drawImage('6a0eDR3cR4dUFF21b87f5'.replace(/[0-9]/g, function(v) {
			return fillc[~~v];
		}).replace(/[a-z]/g, function(v) {
			return fille[v.charCodeAt(0) - 'a'.charCodeAt(0)];
		}), null, canvas);
	}

	function getF2LScramble(type, length, cases, neut) {
		return getAnyScramble(0xffff7654ffff, 0xffff0000ffff, 0xffffffff, 0xffffffff, neut);
	}

	function genZBLLMap() {
		var isVisited = [];
		var zbll_map = [];
		var cc = new mathlib.CubieCube();
		for (var idx = 0; idx < 27 * 24 * 24; idx++) {
			if (isVisited[idx >> 5] >> (idx & 0x1f) & 1) {
				continue;
			}
			var epi = idx % 24;
			var cpi = ~~(idx / 24) % 24;
			var coi = ~~(idx / 24 / 24);
			if (mathlib.getNParity(cpi, 4) != mathlib.getNParity(epi, 4)) {
				continue;
			}
			var co = mathlib.setNOri([], coi, 4, -3);
			var cp = mathlib.setNPerm([], cpi, 4, 0);
			var ep = mathlib.setNPerm([], epi, 4, 0);
			var zbcase = [0, 0, 0, null, 0, null];
			for (var i = 0; i < 4; i++) {
				zbcase[0] += cp[i] << i * 4;
				zbcase[1] += co[i] << i * 4;
				zbcase[2] += ep[i] << i * 4;
			}
			for (var conj = 0; conj < 16; conj++) {
				var c0 = conj >> 2;
				var c1 = conj & 3;
				var co2 = [], cp2 = [], ep2 = [];
				for (var i = 0; i < 4; i++) {
					co2[(i + c0) & 3] = co[i];
					cp2[(i + c0) & 3] = (cp[i] + c1) & 3;
					ep2[(i + c0) & 3] = (ep[i] + c1) & 3;
				}
				var co2i = mathlib.getNOri(co2, 4, -3);
				var cp2i = mathlib.getNPerm(cp2, 4, 0);
				var ep2i = mathlib.getNPerm(ep2, 4, 0);
				var idx2 = (co2i * 24 + cp2i) * 24 + ep2i;
				if (isVisited[idx2 >> 5] >> (idx2 & 0x1f) & 1) {
					continue;
				}
				isVisited[idx2 >> 5] |= 1 << (idx2 & 0x1f);
				zbcase[4]++;
			}
			for (var i = 0; i < 12; i++) {
				cc.ea[i] = ep[i] << 1;
				if (i < 8) {
					cc.ca[i] = co[i] << 3 | cp[i];
				}
			}
			zbcase[3] = renderFacelet("DDDDDDDDDLLLLLLLLLFFFFFFFFFUUUUUUUUURRRRRRRRRBBBBBBBBB",
				cc, [0, 1, 2, 3, 4, 5, 6, 7, 8, 18, 19, 20, 9, 10, 11, 45, 46, 47, 36, 37, 38]);
			if (idx > 0) { // skip solved state
				zbll_map.push(zbcase);
			}
		}

		var coNames = {}
		coNames[0x0000] = 'O';
		coNames[0x0012] = 'U';
		coNames[0x0021] = 'T';
		coNames[0x0102] = 'L';
		coNames[0x0111] = 'aS';
		coNames[0x0222] = 'S';
		coNames[0x1122] = 'Pi';
		coNames[0x1212] = 'H';
		var coCnts = {};
		for (var i = 0; i < zbll_map.length; i++) {
			var zbcase = zbll_map[i];
			var coName = coNames[zbcase[1]];
			coCnts[coName] = coCnts[coName] || [];
			var coCnt = coCnts[coName];
			var cpIdx = coCnt.indexOf(zbcase[0]);
			if (cpIdx == -1) {
				cpIdx = coCnt.length;
				coCnt.push(zbcase[0], 1);
			} else {
				coCnt[cpIdx + 1]++;
			}
			zbcase[5] = coName + ((cpIdx >> 1) + 1) + '-' + coCnts[coName][cpIdx + 1];
		}
		return zbll_map;
	}

	var zbll_map = genZBLLMap();
	var zbprobs = mathlib.idxArray(zbll_map, 4);
	var zbfilter = mathlib.idxArray(zbll_map, 5);

	function getZBLLScramble(type, length, cases, neut) {
		var zbcase = zbll_map[scrMgr.fixCase(cases, zbprobs)];
		return getAnyScramble(zbcase[2] + 0xba9876540000, 0, zbcase[0] + 0x76540000, zbcase[1], neut, aufsuff, aufsuff);
	}

	function getZBLLImage(cases, canvas) {
		var face = zbll_map[cases][3];
		if (!canvas) {
			return [face, null, zbfilter[cases]];
		}
		image.llImage.drawImage(face, null, canvas);
	}

	var coll_map = [
		[0x3210, 0x2121, 'FeFeeeBeBLGRDGDRGLDGD', 2, 'H-1'],
		[0x2301, 0x1212, 'ReLeeeReLBGBDGDFGFDGD', 2, 'H-2'],
		[0x1203, 0x1212, 'ReBeeeLeBFGRDGDLGFDGD', 4, 'H-3'],
		[0x2013, 0x1212, 'LeReeeFeFRGLDGDBGBDGD', 4, 'H-4'],
		[0x3021, 0x1020, 'DeLeeeReDBGRFGBDGFLGD', 4, 'L-1'],
		[0x1203, 0x0201, 'DeReeeLeDFGBRGFDGLBGD', 4, 'L-2'],
		[0x2301, 0x0102, 'DeBeeeLeDFGRFGRDGLBGD', 4, 'L-3'],
		[0x3210, 0x1020, 'DeLeeeFeDRGFLGBDGBRGD', 4, 'L-4'],
		[0x3102, 0x1020, 'DeLeeeLeDFGBRGBDGRFGD', 4, 'L-5'],
		[0x2013, 0x0201, 'DeReeeReDBGLBGFDGFLGD', 4, 'L-6'],
		[0x3210, 0x1122, 'LeFeeeReFBGDRGLDGBDGD', 4, 'Pi-1'],
		[0x2301, 0x2112, 'FeLeeeFeRRGDBGBDGLDGD', 4, 'Pi-2'],
		[0x1203, 0x1221, 'ReLeeeReLBGDFGBDGFDGD', 4, 'Pi-3'],
		[0x3102, 0x1122, 'BeFeeeFeBRGDLGLDGRDGD', 4, 'Pi-4'],
		[0x2013, 0x1221, 'BeLeeeLeFFGDRGBDGRDGD', 4, 'Pi-5'],
		[0x3021, 0x1122, 'BeReeeLeBFGDLGFDGRDGD', 4, 'Pi-6'],
		[0x3210, 0x2220, 'ReBeeeFeDRGFLGDLGDBGD', 4, 'S-1'],
		[0x2301, 0x0222, 'BeReeeLeDFGRFGDBGDLGD', 4, 'S-2'],
		[0x3021, 0x2220, 'BeReeeFeDRGFLGDBGDLGD', 4, 'S-3'],
		[0x2013, 0x2202, 'ReBeeeLeDFGRFGDLGDBGD', 4, 'S-4'],
		[0x3102, 0x2220, 'FeBeeeLeDFGBRGDLGDRGD', 4, 'S-5'],
		[0x1203, 0x2202, 'LeReeeFeDRGLBGDBGDFGD', 4, 'S-6'],
		[0x1203, 0x1002, 'BeLeeeDeDBGRFGDFGRDGL', 4, 'T-1'],
		[0x3102, 0x2100, 'ReBeeeDeDLGBRGDLGFDGF', 4, 'T-2'],
		[0x2301, 0x0210, 'BeFeeeDeDBGFLGDRGRDGL', 4, 'T-3'],
		[0x3210, 0x2100, 'FeFeeeDeDBGBRGDRGLDGL', 4, 'T-4'],
		[0x2013, 0x1002, 'BeBeeeDeDLGRFGDLGRDGF', 4, 'T-5'],
		[0x3021, 0x2100, 'FeBeeeDeDRGRFGDLGLDGB', 4, 'T-6'],
		[0x2301, 0x0120, 'LeLeeeDeDFGBRGBDGDFGR', 4, 'U-1'],
		[0x3210, 0x1200, 'LeReeeDeDBGBRGFDGDFGL', 4, 'U-2'],
		[0x3021, 0x1200, 'FeFeeeDeDBGBRGLDGDRGL', 4, 'U-3'],
		[0x2013, 0x2001, 'BeFeeeDeDFGBRGLDGDLGR', 4, 'U-4'],
		[0x1203, 0x2001, 'ReFeeeDeDBGRFGLDGDBGL', 4, 'U-5'],
		[0x3102, 0x1200, 'LeBeeeDeDBGRFGRDGDFGL', 4, 'U-6'],
		[0x3210, 0x1101, 'LeFeeeDeRRGFDGLDGBDGB', 4, 'aS-1'],
		[0x2301, 0x1110, 'ReFeeeDeLRGBDGLDGFDGB', 4, 'aS-2'],
		[0x3021, 0x1101, 'LeBeeeDeFFGLDGRDGBDGR', 4, 'aS-3'],
		[0x2013, 0x1011, 'LeFeeeDeBFGRDGLDGBDGR', 4, 'aS-4'],
		[0x1203, 0x1011, 'FeBeeeDeLFGBDGRDGLDGR', 4, 'aS-5'],
		[0x3102, 0x1101, 'FeBeeeDeRBGFDGRDGLDGL', 4, 'aS-6'],
		[0x3021, 0x0000, 'DeDeeeDeDBGRFGBRGFLGL', 4, 'O-Adj'],
		[0x2301, 0x0000, 'DeDeeeDeDBGFLGRFGBRGL', 1, 'O-Diag'],
		[0x3210, 0x0000, 'DeDeeeDeDBGBRGRFGFLGL', 1, 'O-AUF']
	];
	var coprobs = mathlib.idxArray(coll_map, 3);
	var cofilter = mathlib.idxArray(coll_map, 4);

	function getCOLLScramble(type, length, cases, neut) {
		var cocase = coll_map[scrMgr.fixCase(cases, coprobs)];
		return getAnyScramble(0xba987654ffff, 0, cocase[0] + 0x76540000, cocase[1], neut, aufsuff, aufsuff);
	}

	function getCMLLScramble(type, length, cases) {
		var cocase = coll_map[scrMgr.fixCase(cases, coprobs)];
		var rnd4 = rn(4);
		var presuff = [];
		for (var i = 0; i < aufsuff.length; i++) {
			presuff.push(aufsuff[i].concat(rlpresuff[rnd4]));
		}
		return getAnyScramble(0xba98f6f4ffff, 0x0000f0f0ffff, cocase[0] + 0x76540000, cocase[1], 0, presuff, aufsuff) + rlappsuff[rnd4];
	}

	function getSBRouxScramble(type, length, cases) {
		var rnd4 = rn(4);
		return getAnyScramble(0xfa9ff6ffffff, 0xf00ff0ffffff, 0xf65fffff, 0xf00fffff, 0, [rlpresuff[rnd4]]) + rlappsuff[rnd4];
	}

	function getCOLLImage(efill, cases, canvas) {
		var face = coll_map[cases][2].replace(/e/g, efill || 'U');
		if (!canvas) {
			return [face, null, cofilter[cases]];
		}
		image.llImage.drawImage(face, null, canvas);
	}

	function getZZLLScramble(type, length, cases, neut) {
		return getAnyScramble(0xba9876543f1f, 0x000000000000, 0x7654ffff, 0x0000ffff, neut, aufsuff);
	}

	var ttll_map = [
		[0x32410, 0x3210, 'FBar-1'],
		[0x32410, 0x3102, 'FBar-2'],
		[0x32410, 0x3021, 'FBar-3'],
		[0x32410, 0x2301, 'FBar-4'],
		[0x32410, 0x2130, 'FBar-5'],
		[0x32410, 0x2013, 'FBar-6'],
		[0x32410, 0x1320, 'FBar-7'],
		[0x32410, 0x1203, 'FBar-8'],
		[0x32410, 0x1032, 'FBar-9'],
		[0x32410, 0x0312, 'FBar-10'],
		[0x32410, 0x0231, 'FBar-11'],
		[0x32410, 0x0123, 'FBar-12'],
		[0x32401, 0x3201, '2Opp-1'],
		[0x32401, 0x3120, '2Opp-2'],
		[0x32401, 0x3012, '2Opp-3'],
		[0x32401, 0x2310, '2Opp-4'],
		[0x32401, 0x2103, '2Opp-5'],
		[0x32401, 0x2031, '2Opp-6'],
		[0x32401, 0x1302, '2Opp-7'],
		[0x32401, 0x1230, '2Opp-8'],
		[0x32401, 0x1023, '2Opp-9'],
		[0x32401, 0x0321, '2Opp-10'],
		[0x32401, 0x0213, '2Opp-11'],
		[0x32401, 0x0132, '2Opp-12'],
		[0x31420, 0x3201, 'ROpp-1'],
		[0x31420, 0x3120, 'ROpp-2'],
		[0x31420, 0x3012, 'ROpp-3'],
		[0x31420, 0x2310, 'ROpp-4'],
		[0x31420, 0x2103, 'ROpp-5'],
		[0x31420, 0x2031, 'ROpp-6'],
		[0x31420, 0x1302, 'ROpp-7'],
		[0x31420, 0x1230, 'ROpp-8'],
		[0x31420, 0x1023, 'ROpp-9'],
		[0x31420, 0x0321, 'ROpp-10'],
		[0x31420, 0x0213, 'ROpp-11'],
		[0x31420, 0x0132, 'ROpp-12'],
		[0x31402, 0x3210, 'RBar-1'],
		[0x31402, 0x3102, 'RBar-2'],
		[0x31402, 0x3021, 'RBar-3'],
		[0x31402, 0x2301, 'RBar-4'],
		[0x31402, 0x2130, 'RBar-5'],
		[0x31402, 0x2013, 'RBar-6'],
		[0x31402, 0x1320, 'RBar-7'],
		[0x31402, 0x1203, 'RBar-8'],
		[0x31402, 0x1032, 'RBar-9'],
		[0x31402, 0x0312, 'RBar-10'],
		[0x31402, 0x0231, 'RBar-11'],
		[0x31402, 0x0123, 'RBar-12'],
		[0x30421, 0x3210, '2Bar-1'],
		[0x30421, 0x3102, '2Bar-2'],
		[0x30421, 0x3021, '2Bar-3'],
		[0x30421, 0x2301, '2Bar-4'],
		[0x30421, 0x2130, '2Bar-5'],
		[0x30421, 0x2013, '2Bar-6'],
		[0x30421, 0x1320, '2Bar-7'],
		[0x30421, 0x1203, '2Bar-8'],
		[0x30421, 0x1032, '2Bar-9'],
		[0x30421, 0x0312, '2Bar-10'],
		[0x30421, 0x0231, '2Bar-11'],
		[0x30421, 0x0123, '2Bar-12'],
		[0x30412, 0x3201, 'FOpp-1'],
		[0x30412, 0x3120, 'FOpp-2'],
		[0x30412, 0x3012, 'FOpp-3'],
		[0x30412, 0x2310, 'FOpp-4'],
		[0x30412, 0x2103, 'FOpp-5'],
		[0x30412, 0x2031, 'FOpp-6'],
		[0x30412, 0x1302, 'FOpp-7'],
		[0x30412, 0x1230, 'FOpp-8'],
		[0x30412, 0x1023, 'FOpp-9'],
		[0x30412, 0x0321, 'FOpp-10'],
		[0x30412, 0x0213, 'FOpp-11'],
		[0x30412, 0x0132, 'FOpp-12']
	];
	var ttllprobs = [];
	var ttllfilter = [];
	for (var i = 0; i < ttll_map.length; i++) {
		ttllprobs[i] = 1;
		ttllfilter[i] = ttll_map[i][2];
	}

	function getTTLLScramble(type, length, cases, neut) {
		var ttllcase = ttll_map[scrMgr.fixCase(cases, ttllprobs)];
		return getAnyScramble(0xba9876540000 + ttllcase[1], 0x000000000000, 0x76500000 + ttllcase[0], 0x00000000, neut, aufsuff, aufsuff);
	}

	function getTTLLImage(cases, canvas) {
		var ret = [];
		var ttllcase = ttll_map[cases];
		for (var i = 3; i >= 0; i--) {
			ret.push(["FR", "LF", "BL", "RB", "GG"][ttllcase[0] >> (i * 4) & 0xf]);
			ret.push("RFLB".charAt(ttllcase[1] >> (i * 4) & 0xf));
		}
		ret = ret.join('');
		ret = ret.slice(7) + ret.slice(0, 7);
		var llParam = ['GDDDDDDDD' + ret, null]
		if (!canvas) {
			return llParam.concat([ttllfilter[cases]]);
		}
		image.llImage.drawImage(llParam[0], llParam[1], canvas);
	}

	function getLSEScramble() {
		var rnd4 = rn(4);
		return getAnyScramble(0xba98f6f4ffff, 0x0000f0f0ffff, 0x76543210, 0x00000000, 0, [rlpresuff[rnd4]], aufsuff) + rlappsuff[rnd4];
	}

	function getCLLScramble(type, length, cases, neut) {
		var cocase = coll_map[scrMgr.fixCase(cases, coprobs)];
		return getAnyScramble(0xba987654ffff, 0x00000000ffff, cocase[0] + 0x76540000, cocase[1], neut, aufsuff, aufsuff);
	}

	function getELLScramble(type, length, cases, neut) {
		return getAnyScramble(0xba987654ffff, 0x00000000ffff, 0x76543210, 0x00000000, neut);
	}

	function get2GLLScramble(type, length, cases, neut) {
		return getAnyScramble(0xba987654ffff, 0x000000000000, 0x76543210, 0x0000ffff, neut, aufsuff);
	}

	var pll_map = [
		[0x1032, 0x3210, 1, 'H'],
		[0x3102, 0x3210, 4, 'Ua'],
		[0x3021, 0x3210, 4, 'Ub'],
		[0x2301, 0x3210, 2, 'Z'],
		[0x3210, 0x3021, 4, 'Aa'],
		[0x3210, 0x3102, 4, 'Ab'],
		[0x3210, 0x2301, 2, 'E'],
		[0x3012, 0x3201, 4, 'F'],
		[0x2130, 0x3021, 4, 'Ga'],
		[0x1320, 0x3102, 4, 'Gb'],
		[0x3021, 0x3102, 4, 'Gc'],
		[0x3102, 0x3021, 4, 'Gd'],
		[0x3201, 0x3201, 4, 'Ja'],
		[0x3120, 0x3201, 4, 'Jb'],
		[0x1230, 0x3012, 1, 'Na'],
		[0x3012, 0x3012, 1, 'Nb'],
		[0x0213, 0x3201, 4, 'Ra'],
		[0x2310, 0x3201, 4, 'Rb'],
		[0x1230, 0x3201, 4, 'T'],
		[0x3120, 0x3012, 4, 'V'],
		[0x3201, 0x3012, 4, 'Y']
	];
	var pllprobs = mathlib.idxArray(pll_map, 2);
	var pllfilter = mathlib.idxArray(pll_map, 3);
	var pllImgParam = [
		['BFBRLRFBFLRL', [1, 7], [3, 5]],
		['BRBRLRFFFLBL', [3, 7], [7, 5], [5, 3]],
		['BLBRBRFFFLRL', [3, 5], [5, 7], [7, 3]],
		['LFLBRBRBRFLF', [1, 5], [3, 7]],
		['LBBRRLBFRFLF', [0, 2], [2, 6], [6, 0]],
		['RBFLRRFFLBLB', [0, 6], [6, 8], [8, 0]],
		['LBRFRBRFLBLF', [0, 6], [2, 8]],
		['BFRFRBRBFLLL', [1, 7], [2, 8]],
		['BRRFLBRBFLFL'],
		['BFRFBBRLFLRL'],
		['BFRFLBRRFLBL'],
		['BLRFFBRBFLRL'],
		['BBRFFBRRFLLL', [1, 5], [2, 8]],
		['LBBRLLBRRFFF', [2, 8], [5, 7]],
		['FBBRLLBFFLRR', [2, 6], [3, 5]],
		['BBFLLRFFBRRL', [0, 8], [3, 5]],
		['LLBRBLBFRFRF', [1, 3], [2, 8]],
		['RBFLFRFLLBRB', [2, 8], [3, 7]],
		['BBRFLBRFFLRL', [2, 8], [3, 5]],
		['BBFLFRFRBRLL', [0, 8], [1, 5]],
		['BBFLRRFLBRFL', [0, 8], [1, 3]]
	];

	function getPLLScramble(type, length, cases, neut) {
		var pllcase = pll_map[scrMgr.fixCase(cases, pllprobs)];
		return getAnyScramble(pllcase[0] + 0xba9876540000, 0x000000000000, pllcase[1] + 0x76540000, 0x00000000, neut, aufsuff, aufsuff);
	}

	function getPLLImage(cases, canvas) {
		var arrows = pllImgParam[cases].slice(1);
		if (arrows.length == 2) {
			arrows = arrows.concat([[arrows[0][1], arrows[0][0]], [arrows[1][1], arrows[1][0]]])
		}
		var llParam = ['DDDDDDDDD' + pllImgParam[cases][0], arrows]
		if (!canvas) {
			return llParam.concat([pllfilter[cases]]);
		}
		image.llImage.drawImage(llParam[0], llParam[1], canvas);
	}

	var oll_map = [
		[0x0000, 0x0000, 1, 'PLL', 0x000ff],
		[0x1111, 0x1212, 2, 'Point-1', 0xeba00],
		[0x1111, 0x1122, 4, 'Point-2', 0xdda00],
		[0x1111, 0x0222, 4, 'Point-3', 0x5b620],
		[0x1111, 0x0111, 4, 'Point-4', 0x6d380],
		[0x0011, 0x2022, 4, 'Square-5', 0x8360b],
		[0x0011, 0x1011, 4, 'Square-6', 0x60b16],
		[0x0011, 0x2202, 4, 'SLBS-7', 0x1362a],
		[0x0011, 0x0111, 4, 'SLBS-8', 0x64392],
		[0x0011, 0x1110, 4, 'Fish-9', 0x2538a],
		[0x0011, 0x2220, 4, 'Fish-10', 0x9944c],
		[0x0011, 0x0222, 4, 'SLBS-11', 0x9160e],
		[0x0011, 0x1101, 4, 'SLBS-12', 0x44b13],
		[0x0101, 0x2022, 4, 'Knight-13', 0x1a638],
		[0x0101, 0x0111, 4, 'Knight-14', 0x2c398],
		[0x0101, 0x0222, 4, 'Knight-15', 0x8a619],
		[0x0101, 0x1011, 4, 'Knight-16', 0x28b1c],
		[0x1111, 0x0102, 4, 'Point-17', 0x4b381],
		[0x1111, 0x0012, 4, 'Point-18', 0x49705],
		[0x1111, 0x0021, 4, 'Point-19', 0xc9a05],
		[0x1111, 0x0000, 1, 'CO-20', 0x492a5],
		[0x0000, 0x1212, 2, 'OCLL-21', 0x1455a],
		[0x0000, 0x1122, 4, 'OCLL-22', 0xa445a],
		[0x0000, 0x0012, 4, 'OCLL-23', 0x140fa],
		[0x0000, 0x0021, 4, 'OCLL-24', 0x101de],
		[0x0000, 0x0102, 4, 'OCLL-25', 0x2047e],
		[0x0000, 0x0111, 4, 'OCLL-26', 0x2095e],
		[0x0000, 0x0222, 4, 'OCLL-27', 0x1247a],
		[0x0011, 0x0000, 4, 'CO-28', 0x012af],
		[0x0011, 0x0210, 4, 'Awkward-29', 0x1138e],
		[0x0011, 0x2100, 4, 'Awkward-30', 0x232aa],
		[0x0011, 0x0021, 4, 'P-31', 0x50396],
		[0x0011, 0x1002, 4, 'P-32', 0x0562b],
		[0x0101, 0x0021, 4, 'T-33', 0x1839c],
		[0x0101, 0x0210, 4, 'C-34', 0x2a2b8],
		[0x0011, 0x1020, 4, 'Fish-35', 0x4a1d1],
		[0x0011, 0x0102, 4, 'W-36', 0xc4293],
		[0x0011, 0x2010, 4, 'Fish-37', 0x0338b],
		[0x0011, 0x0201, 4, 'W-38', 0x11a2e],
		[0x0101, 0x1020, 4, 'BLBS-39', 0x18a3c],
		[0x0101, 0x0102, 4, 'BLBS-40', 0x8c299],
		[0x0011, 0x1200, 4, 'Awkward-41', 0x152aa],
		[0x0011, 0x0120, 4, 'Awkward-42', 0x0954d],
		[0x0011, 0x0012, 4, 'P-43', 0xe0296],
		[0x0011, 0x2001, 4, 'P-44', 0x03a2b],
		[0x0101, 0x0012, 4, 'T-45', 0xa829c],
		[0x0101, 0x0120, 4, 'C-46', 0x43863],
		[0x0011, 0x1221, 4, 'L-47', 0x52b12],
		[0x0011, 0x1122, 4, 'L-48', 0xa560a],
		[0x0011, 0x2112, 4, 'L-49', 0xe4612],
		[0x0011, 0x2211, 4, 'L-50', 0xec450],
		[0x0101, 0x1221, 4, 'I-51', 0x1ab18],
		[0x0101, 0x1122, 4, 'I-52', 0x53942],
		[0x0011, 0x2121, 4, 'L-53', 0x54712],
		[0x0011, 0x1212, 4, 'L-54', 0x1570a],
		[0x0101, 0x2121, 2, 'I-55', 0x1c718],
		[0x0101, 0x1212, 2, 'I-56', 0xaaa18],
		[0x0101, 0x0000, 2, 'CO-57', 0x082bd]
	];
	var ollprobs = mathlib.idxArray(oll_map, 2);
	var ollfilter = mathlib.idxArray(oll_map, 3);

	function getOLLScramble(type, length, cases, neut) {
		var ollcase = oll_map[scrMgr.fixCase(cases, ollprobs)];
		return getAnyScramble(0xba987654ffff, ollcase[0], 0x7654ffff, ollcase[1], neut, aufsuff, aufsuff);
	}

	function getOLLImage(cases, canvas) {
		var face = '';
		var val = oll_map[cases][4];
		for (var i = 0; i < 21; i++) {
			if (i == 4) {
				face += 'D';
			} else {
				face += (val & 1) ? 'D' : 'G';
				val >>= 1;
			}
		}
		if (!canvas) {
			return [face, null, ollfilter[cases]];
		}
		image.llImage.drawImage(face, null, canvas);
	}

	function getEOLineScramble(type, length, cases, neut) {
		return getAnyScramble(0xffff7f5fffff, 0x000000000000, 0xffffffff, 0xffffffff, neut);
	}

	function getEOCrossScramble(type, length, cases, neut) {
		return getAnyScramble(0xffff7654ffff, 0x000000000000, 0xffffffff, 0xffffffff, neut);
	}

	var daufsuff = [[], [Dx1], [Dx2], [Dx3]];
	var daufrot = ["", "y", "y2", "y'"];
	function getMehta3QBScramble() {
		var rnd4 = mathlib.rn(4);
		return getAnyScramble(0xffff765fffff, 0xffff000fffff, 0xf65fffff, 0xf00fffff, 0, [daufsuff[rnd4]]) + daufrot[rnd4];
	}

	function getMehtaEOLEScramble() {
		var skip = mathlib.rn(4);
		var rnd4 = mathlib.rn(4);
		return getAnyScramble(0xba98765fffff + (0x4567 & (0xf << skip * 4)) * 0x100000000, 0x0000000fffff + (0xf << skip * 4) * 0x100000000, 0xf65fffff, 0xf00fffff, 0, [daufsuff[rnd4]]) + daufrot[rnd4];
	}

	function getMehtaTDRScramble() {
		return getAnyScramble(0xba98765fffff, 0x000000000000, 0xf65fffff, 0xf00fffff);
	}

	function getMehta6CPScramble() {
		return getAnyScramble(0xba98765fffff, 0x000000000000, 0xf65fffff, 0x00000000);
	}

	function getMehtaL5EPScramble() {
		return getAnyScramble(0xba98765fffff, 0x000000000000, 0x76543210, 0x00000000);
	}

	function getMehtaCDRLLScramble() {
		return getAnyScramble(0xba98765fffff, 0x000000000000, 0x7654ffff, 0x0000ffff);
	}

	var customfilter = ['UR', 'UF', 'UL', 'UB', 'DR', 'DF', 'DL', 'DB', 'RF', 'LF', 'LB', 'RB', 'URF', 'UFL', 'ULB', 'UBR', 'DFR', 'DLF', 'DBL', 'DRB'];
	for (var i = 0; i < 20; i++) {
		var piece = customfilter[i];
		customfilter[i + 20] = (piece.length == 2 ? 'OriE-' : 'OriC-') + piece;
		customfilter[i] = (piece.length == 2 ? 'PermE-' : 'PermC-') + piece;
	}
	var customprobs = mathlib.valuedArray(40, 0);

	function getCustomScramble(type, length, cases, neut) {
		var ep = 0;
		var eo = 0;
		var cp = 0;
		var co = 0;
		var chk = 0x1100; //ep+cp|ep+1|cp+1|eo|co
		cases = cases || mathlib.valuedArray(40, 1);
		for (var i = 0; i < 12; i++) {
			chk += (cases[i] ? 0x11000 : 0) + (cases[i + 20] ? 0x10 : 0);
			ep += (cases[i] ? 0xf : i) * Math.pow(16, i);
			eo += (cases[i + 20] ? 0xf : 0) * Math.pow(16, i);
		}
		for (var i = 0; i < 8; i++) {
			chk += (cases[i + 12] ? 0x10100 : 0) + (cases[i + 32] ? 0x1 : 0);
			cp += (cases[i + 12] ? 0xf : i) * Math.pow(16, i);
			co += (cases[i + 32] ? 0xf : 0) * Math.pow(16, i);
		}
		if ((chk & 0x1cccee) == 0) {
			return "U' U ";
		}
		return getAnyScramble(ep, eo, cp, co, neut);
	}

	function getEasyCrossScramble(type, length, _, neut) {
		var cases = cross.getEasyCross(length);
		return getAnyScramble(cases[0], cases[1], 0xffffffff, 0xffffffff, neut);
	}

	function getEasyXCrossScramble(type, length, _, neut) {
		var cases = cross.getEasyXCross(length);
		return getAnyScramble(cases[0], cases[1], cases[2], cases[3], neut);
	}

	var normTrans = [];

	function normOrient(facelet, toAppend) {
		var rotMoves1 = ["", "x", "x2", "x'", "z", "z'"];
		var rotMoves2 = ["", "y", "y2", "y'"];
		if (normTrans.length == 0) {
			for (var i = 0; i < 24; i++) {
				var cc = new mathlib.CubieCube();
				cc.selfMoveStr(rotMoves2[i & 3]);
				cc.selfMoveStr(rotMoves1[i >> 2]);
				normTrans.push(cc.toPerm(null, null, null, true));
			}
		}
		var ori = 0;
		out: for (var i = 0; i < 24; i++) {
			for (var j = 0; j < 6; j++) {
				if (facelet[normTrans[i][j * 9 + 4]] != "URFDLB".charAt(j)) {
					continue out;
				}
			}
			var ret = [];
			for (var j = 0; j < 54; j++) {
				ret[j] = facelet[normTrans[i][j]];
			}
			facelet = ret.join('');
			ori = i;
			break;
		}
		var mv1 = rotMoves1[ori >> 2];
		if (mv1 != "") {
			toAppend.push(mv1[0] + "'2 ".charAt("2'".indexOf(mv1[1]) + 1));
		}
		var mv2 = rotMoves2[ori & 3];
		if (mv2 != "") {
			toAppend.push(mv2[0] + "'2 ".charAt("2'".indexOf(mv2[1]) + 1));
		}
		return facelet;
	}

	var subsetSolvs = {};

	function subsetScramble(moves) {
		var key = moves.join('|');
		if (!subsetSolvs[key]) {
			var gens = [];
			for (var m = 0; m < moves.length; m++) {
				var cc = new mathlib.CubieCube();
				cc.selfMoveStr(moves[m]);
				gens.push(cc.toPerm(null, null, null, true));
			}
			subsetSolvs[key] = new grouplib.SubgroupSolver(gens);
			subsetSolvs[key].initTables();
		}
		var solv = subsetSolvs[key];
		var solution = "";
		if (solv.sgsG.size() < 1e8) {
			do {
				var state = subsetSolvs[key].sgsG.rndElem();
				var sol = subsetSolvs[key].DissectionSolve(state, 12, 20);
				solution = sol.map((mvpow) => moves[mvpow[0]] + ["", "2", "'"][mvpow[1] - 1]).join(" ");
			} while (solution.length <= 2);
			return solution.replace(/ +/g, ' ');
		}
		var toAppend;
		do {
			var state = subsetSolvs[key].sgsG.rndElem();
			for (var i = 0; i < state.length; i++) {
				state[i] = "URFDLB".charAt(~~(state[i] / 9));
			}
			toAppend = [];
			state = normOrient(state.join(''), toAppend);
			solution = search.solution(state, 21, 1e9, 50, 2);
		} while (solution.length <= 3);
		toAppend.unshift(solution);
		return toAppend.join(' ').replace(/ +/g, ' ');
	}

	function genFacelet(facelet) {
		return search.solution(facelet, 21, 1e9, 50, 2);
	}

	function solvFacelet(facelet) {
		return search.solution(facelet, 21, 1e9, 50, 0);
	}

	/*

	// gens: pattern (string) or [perm1, perm2, ...]
	// assert <iniGens> >= <endGens> <> {e}
	function CommonStep(iniGens, endGens, imgInfo, names) {
		this.iniGens = iniGens;
		this.endGens = endGens;
		this.imgInfo = imgInfo;
		this.names = names || [];
	}

	CommonStep.prototype.init = function() {
		if (this.iniG) {
			return;
		}
		this.iniG = $.isArray(this.iniGens) ? new grouplib.SchreierSims(this.iniGens) : pat3x3.genPatternGroup(this.iniGens);
		this.endG = $.isArray(this.endGens) ? new grouplib.SchreierSims(this.endGens) : pat3x3.genPatternGroup(this.endGens);
		var genAUF = mathlib.CubieCube.moveCube[0].toPerm();
		this.endG.extend([genAUF]);
		this.iniG.extend([genAUF]);
		var cosets = this.iniG.listCoset(this.endG);
		var probs = [];
		for (var i = 0; i < cosets.length; i++) {
			cosets[i] = this.endG.minElem(grouplib.permInv(cosets[i]));
		}
		cosets.sort(grouplib.permCmp);
		var visited = new Set();
		this.movePerm = [];
		var uniqCosets = [];
		for (var i = 0; i < cosets.length; i++) { // handle <U> equivalence
			var coset = cosets[i];
			if (visited.has(coset.join(','))) {
				continue;
			}
			visited.add(coset.join(','));
			var idx = uniqCosets.length;
			this.names[idx] = this.names[idx] || (idx + 1 + "");
			probs[idx] = 1;
			uniqCosets.push(coset);
			for (var m = 0; m < 3; m++) {
				this.movePerm[m] = this.movePerm[m] || mathlib.CubieCube.moveCube[m].toPerm();
				var key = this.endG.minElem(grouplib.permMult(this.movePerm[m], coset)).join(',');
				if (!visited.has(key)) {
					visited.add(key);
					probs[idx]++;
				}
			}
		}
		this.cosets = uniqCosets;
		this.probs = probs;
		DEBUG && console.log('[scramble_333] common step filter init', this);
	}

	CommonStep.prototype.getScramble = function(type, length, cases, neut) { // currently not support neut
		this.init();
		var caze = scrMgr.fixCase(cases, this.probs);
		var perm = grouplib.permMult(this.cosets[caze], this.endG.rndElem());
		var auf = mathlib.rn(4);
		if (auf != 3) {
			perm = grouplib.permMult(this.movePerm[auf], perm);
		}
		var posit = "";
		for (var i = 0; i < perm.length; i++) {
			posit += mathlib.SOLVED_FACELET.charAt(perm[i]);
		}
		return search.solution(posit, 21, 1e9, 50, 2);
	}

	CommonStep.prototype.getImage = function(caze, canvas) {
		this.init();
		var perm = this.cosets[caze];
		var posit = "";
		var llIdx = [0, 1, 2, 3, 4, 5, 6, 7, 8, 18, 19, 20, 9, 10, 11, 45, 46, 47, 36, 37, 38];
		var target = "DDDDDDDDDLLLLLLLLLFFFFFFFFFUUUUUUUUURRRRRRRRRBBBBBBBBB";
		if (this.imgInfo) {
			target = this.imgInfo[1];
		} else if (!$.isArray(this.endGens)) {
			target = this.endGens;
		}
		for (var i = 0; i < llIdx.length; i++) {
			posit += target.charAt(perm[llIdx[i]]);
		}
		if (!canvas) {
			return [posit, null, this.names[caze]];
		}
		image.llImage.drawImage(posit, null, canvas);
	}

	CommonStep.prototype.regScr = function(type) {
		scrMgr.reg(type, this.getScramble.bind(this), this.getExtra.bind(this));
	}

	CommonStep.prototype.getExtra = function(idx) {
		this.init();
		return [this.names, this.probs, this.getImage.bind(this)][idx];
	}

	var CLL_SOLVED = "DGDGDGDGDLGLLLLLLLFGFFFFFFFUUUUUUUUURGRRRRRRRBGBBBBBBB";
	var F2L_SOLVED = "GGGGDGGGGGGGLLLLLLGGGFFFFFFUUUUUUUUUGGGRRRRRRGGGBBBBBB";
	new CommonStep(F2L_SOLVED, CLL_SOLVED).regScr('cll');
	*/

	scrMgr.reg('333', getRandomScramble)
		('333fm', getFMCScramble)
		('edges', getEdgeScramble)
		('corners', getCornerScramble)
		('333custom', getCustomScramble, [customfilter, customprobs])
		('ll', getLLScramble)
		('lsll2', getLSLLScramble, [f2lfilter, f2lprobs, getF2LImage.bind(null, 'GGGGDGGGGGGGGRRGRRGGGBBGBBG', f2l_map, f2lprobs)])
		('f2l', getF2LScramble)
		('zbll', getZBLLScramble, [zbfilter, zbprobs, getZBLLImage])
		('zzll', getZZLLScramble)
		('zbls', getLSLLScramble, [f2lfilter, f2lprobs, getF2LImage.bind(null, 'GGGGDGGGGGGGGRRGRRGGGBBGBBG', f2l_map, f2lprobs)])
		('ttll', getTTLLScramble, [ttllfilter, ttllprobs, getTTLLImage])
		('eols', getEOLSScramble, [eolsfilter, eolsprobs, getF2LImage.bind(null, 'GDGDDDGDGGGGGRRGRRGGGBBDBBG', eols_map, eolsprobs)])
		('wvls', getWVLSScramble, [wvlsfilter, wvlsprobs, getWVLSImage])
		('vls', getVLSScramble, [vlsfilter, vlsprobs, getVLSImage])
		('lse', getLSEScramble)
		('cmll', getCMLLScramble, [cofilter, coprobs, getCOLLImage.bind(null, 'G')])
		('cll', getCLLScramble, [cofilter, coprobs, getCOLLImage.bind(null, 'G')])
		('coll', getCOLLScramble, [cofilter, coprobs, getCOLLImage.bind(null, 'D')])
		('ell', getELLScramble)
		('pll', getPLLScramble, [pllfilter, pllprobs, getPLLImage])
		('oll', getOLLScramble, [ollfilter, ollprobs, getOLLImage])
		('2gll', get2GLLScramble)
		('sbrx', getSBRouxScramble)
		('half', subsetScramble.bind(null, ["U2", "R2", "F2", "D2", "L2", "B2"]))
		('333drud', subsetScramble.bind(null, ["U", "R2", "F2", "D", "L2", "B2"]))
		('3gen_F', subsetScramble.bind(null, ["U", "R", "F"]))
		('3gen_L', subsetScramble.bind(null, ["U", "R", "L"]))
		('2gen', subsetScramble.bind(null, ["U", "R"]))
		('2genl', subsetScramble.bind(null, ["U", "L"]))
		('RrU', subsetScramble.bind(null, ["R", "Rw", "U"]))
		('roux', subsetScramble.bind(null, ["M", "U"]))
		('mt3qb', getMehta3QBScramble)
		('mteole', getMehtaEOLEScramble)
		('mttdr', getMehtaTDRScramble)
		('mt6cp', getMehta6CPScramble)
		('mtl5ep', getMehtaL5EPScramble)
		('mtcdrll', getMehtaCDRLLScramble)
		('easyc', getEasyCrossScramble)
		('easyxc', getEasyXCrossScramble)
		('eoline', getEOLineScramble)
		('eocross', getEOCrossScramble);

	return {
		/* mark2 interface */
		getRandomScramble: getRandomScramble, //getRandomScramble,

		/* added methods */
		getEdgeScramble: getEdgeScramble,
		getCornerScramble: getCornerScramble,
		getLLScramble: getLLScramble,
		getLSLLScramble: getLSLLScramble,
		getCOLLScramble: getCOLLScramble,
		getZBLLScramble: getZBLLScramble,
		getZZLLScramble: getZZLLScramble,
		getTTLLScramble: getTTLLScramble,
		getF2LScramble: getF2LScramble,
		getLSEScramble: getLSEScramble,
		getCMLLScramble: getCMLLScramble,
		getCLLScramble: getCLLScramble,
		getELLScramble: getELLScramble,
		getAnyScramble: getAnyScramble,
		getPLLImage: getPLLImage,
		getOLLImage: getOLLImage,
		getCOLLImage: getCOLLImage,
		getZBLLImage: getZBLLImage,
		genFacelet: genFacelet,
		solvFacelet: solvFacelet
	};

})(mathlib.getNPerm, mathlib.setNPerm, mathlib.getNParity, mathlib.rn, mathlib.rndEl);
