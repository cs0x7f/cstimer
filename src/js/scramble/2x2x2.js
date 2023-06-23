var scramble_222 = (function(rn) {
	var solv = new mathlib.Solver(3, 3, [[0, [doPermMove, 'p', 7], 5040], [0, [doOriMove, 'o', 7, -3], 729]]);

	var movePieces = [
		[0, 2, 3, 1],
		[0, 1, 5, 4],
		[0, 4, 6, 2]
	];

	var moveOris = [
		null,
		[0, 1, 0, 1, 3],
		[1, 0, 1, 0, 3]
	];

	var oriCoord = new mathlib.coord('o', 7, -3);

	function doPermMove(arr, m) {
		mathlib.acycle(arr, movePieces[m]);
	}

	function doOriMove(arr, m) {
		mathlib.acycle(arr, movePieces[m], 1, moveOris[m]);
	}

	var cFacelet = [
		[3, 4, 9],
		[1, 20, 5],
		[2, 8, 17],
		[0, 16, 21],
		[13, 11, 6],
		[15, 7, 22],
		[12, 19, 10]
	];

	var llFaces = [0, 1, 2, 3, 8, 9, 4, 5, 20, 21, 16, 17];

	function checkNoBar(pidx, oidx) {
		var perm = mathlib.set8Perm([], pidx, 7);
		var ori = oriCoord.set([], oidx);
		var f = [];
		for (var i = 0; i < 24; i++) {
			f[i] = i >> 2;
		}
		mathlib.fillFacelet(cFacelet, f, perm, ori, 4);
		for (var i = 0; i < 24; i += 4) {
			if ((1 << f[i] | 1 << f[i + 3]) & (1 << f[i + 1] | 1 << f[i + 2])) {
				return false;
			}
		}
		return true;
	}

	var egprobs = [1, 2, 4, 4, 4, 4, 4, 4, 1, 2, 4, 4, 4, 4, 4, 4, 1, 2, 4, 4, 4, 4, 4, 4, 1, 2, 4, 4, 4, 4, 4, 4, 1, 2, 4, 4, 4, 4, 4, 4, 1, 2, 4, 4, 4, 4, 4, 4];
	var egmap = [0, 17, 5, 14, 8, 1, 2, 4];
	var egfilter = ['EG0-O', 'EG0-H', 'EG0-L', 'EG0-Pi', 'EG0-S', 'EG0-T', 'EG0-U', 'EG0-aS', 'EG1B-O', 'EG1B-H', 'EG1B-L', 'EG1B-Pi', 'EG1B-S', 'EG1B-T', 'EG1B-U', 'EG1B-aS', 'EG1L-O', 'EG1L-H', 'EG1L-L', 'EG1L-Pi', 'EG1L-S', 'EG1L-T', 'EG1L-U', 'EG1L-aS', 'EG1F-O', 'EG1F-H', 'EG1F-L', 'EG1F-Pi', 'EG1F-S', 'EG1F-T', 'EG1F-U', 'EG1F-aS', 'EG1R-O', 'EG1R-H', 'EG1R-L', 'EG1R-Pi', 'EG1R-S', 'EG1R-T', 'EG1R-U', 'EG1R-aS', 'EG2-O', 'EG2-H', 'EG2-L', 'EG2-Pi', 'EG2-S', 'EG2-T', 'EG2-U', 'EG2-aS'];
	var egperms = [
		[4, 5, 6],
		[4, 6, 5],
		[6, 5, 4],
		[5, 4, 6],
		[5, 6, 4],
		[6, 4, 5]
	];

	var egll_map = [
		[0x3210, 0x1221], // H-BBFF
		[0x3120, 0x1221], // H-FBFB
		[0x2310, 0x1221], // H-RFLF
		[0x3012, 0x1221], // H-RLFF
		[0x0213, 0x0210], // L-FBRL
		[0x0312, 0x0210], // L-LBFF
		[0x3012, 0x0210], // L-LFFB
		[0x2013, 0x0210], // L-LFFR
		[0x3210, 0x0210], // L-LRFF
		[0x2310, 0x0210], // L-RFBL
		[0x2013, 0x1212], // Pi-BFFB
		[0x2310, 0x1212], // Pi-FBFB
		[0x0213, 0x1212], // Pi-FRFL
		[0x0312, 0x1212], // Pi-FRLF
		[0x3210, 0x1212], // Pi-LFRF
		[0x3012, 0x1212], // Pi-RFFL
		[0x2310, 0x2220], // S-FBBF
		[0x2013, 0x2220], // S-FBFB
		[0x3210, 0x2220], // S-FLFR
		[0x3012, 0x2220], // S-FLRF
		[0x0312, 0x2220], // S-LFFR
		[0x0213, 0x2220], // S-LFRF
		[0x3210, 0x1020], // T-BBFF
		[0x0213, 0x1020], // T-FBFB
		[0x3012, 0x1020], // T-FFLR
		[0x2310, 0x1020], // T-FLFR
		[0x2013, 0x1020], // T-RFLF
		[0x0312, 0x1020], // T-RLFF
		[0x0312, 0x2010], // U-BBFF
		[0x3012, 0x2010], // U-BFFB
		[0x0213, 0x2010], // U-FFLR
		[0x2310, 0x2010], // U-FRLF
		[0x2013, 0x2010], // U-LFFR
		[0x3210, 0x2010], // U-LRFF
		[0x2013, 0x1011], // aS-FBBF
		[0x2310, 0x1011], // aS-FBFB
		[0x0213, 0x1011], // aS-FRFL
		[0x0312, 0x1011], // aS-FRLF
		[0x3210, 0x1011], // aS-LFRF
		[0x3012, 0x1011]  // aS-RFFL
	];

	var egllprobs = [2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];

	var egllfilter = ['H-BBFF', 'H-FBFB', 'H-RFLF', 'H-RLFF', 'L-FBRL', 'L-LBFF', 'L-LFFB', 'L-LFFR', 'L-LRFF', 'L-RFBL', 'Pi-BFFB', 'Pi-FBFB', 'Pi-FRFL', 'Pi-FRLF', 'Pi-LFRF', 'Pi-RFFL', 'S-FBBF', 'S-FBFB', 'S-FLFR', 'S-FLRF', 'S-LFFR', 'S-LFRF', 'T-BBFF', 'T-FBFB', 'T-FFLR', 'T-FLFR', 'T-RFLF', 'T-RLFF', 'U-BBFF', 'U-BFFB', 'U-FFLR', 'U-FRLF', 'U-LFFR', 'U-LRFF', 'aS-FBBF', 'aS-FBFB', 'aS-FRFL', 'aS-FRLF', 'aS-LFRF', 'aS-RFFL'];

	var tcllp_map = [
		[0x0123, 0x0221, 4, 'Hammer-1'],
		[0x3021, 0x0221, 4, 'Hammer-2'],
		[0x0132, 0x0221, 4, 'Hammer-3'],
		[0x0231, 0x0221, 4, 'Hammer-4'],
		[0x0321, 0x0221, 4, 'Hammer-5'],
		[0x2301, 0x0221, 4, 'Hammer-6'],
		[0x0123, 0x1022, 4, 'Spaceship-1'],
		[0x2301, 0x1022, 4, 'Spaceship-2'],
		[0x1320, 0x1022, 4, 'Spaceship-3'],
		[0x3021, 0x1022, 4, 'Spaceship-4'],
		[0x3012, 0x1022, 4, 'Spaceship-5'],
		[0x0231, 0x1022, 4, 'Spaceship-6'],
		[0x2031, 0x0002, 4, 'Stollery-1'],
		[0x3120, 0x0002, 4, 'Stollery-2'],
		[0x3201, 0x0002, 4, 'Stollery-3'],
		[0x2103, 0x0002, 4, 'Stollery-4'],
		[0x0231, 0x0002, 4, 'Stollery-5'],
		[0x2130, 0x0002, 4, 'Stollery-6'],
		[0x0123, 0x2222, 1, 'Pinwheel-1'],
		[0x1032, 0x2222, 1, 'Pinwheel-2'],
		[0x3201, 0x2222, 4, 'Pinwheel-3'],
		[0x2031, 0x0110, 2, 'TwoFace-1'],
		[0x3102, 0x0110, 4, 'TwoFace-2'],
		[0x0213, 0x0110, 2, 'TwoFace-3'],
		[0x3021, 0x0110, 4, 'TwoFace-4'],
		[0x1302, 0x0122, 4, 'Turtle-1'],
		[0x1032, 0x0122, 4, 'Turtle-2'],
		[0x3201, 0x0122, 4, 'Turtle-3'],
		[0x1230, 0x0122, 4, 'Turtle-4'],
		[0x2310, 0x0122, 4, 'Turtle-5'],
		[0x0321, 0x0122, 4, 'Turtle-6'],
		[0x3210, 0x1112, 4, 'Pinwheel Poser-1'],
		[0x3120, 0x1112, 4, 'Pinwheel Poser-2'],
		[0x3201, 0x1112, 4, 'Pinwheel Poser-3'],
		[0x2103, 0x1112, 4, 'Pinwheel Poser-4'],
		[0x2310, 0x1112, 4, 'Pinwheel Poser-5'],
		[0x2130, 0x1112, 4, 'Pinwheel Poser-6'],
		[0x2031, 0x0011, 4, 'Gun-1'],
		[0x1032, 0x0011, 4, 'Gun-2'],
		[0x0132, 0x0011, 4, 'Gun-3'],
		[0x3021, 0x0011, 4, 'Gun-4'],
		[0x2310, 0x0011, 4, 'Gun-5'],
		[0x2130, 0x0011, 4, 'Gun-6']
	];

	var tclln_map = [
		[0x1302, 0x1201, 4, 'Hammer-1'],
		[0x3021, 0x1201, 4, 'Hammer-2'],
		[0x2310, 0x1201, 4, 'Hammer-3'],
		[0x3201, 0x1201, 4, 'Hammer-4'],
		[0x1203, 0x1201, 4, 'Hammer-5'],
		[0x3120, 0x1201, 4, 'Hammer-6'],
		[0x0123, 0x1012, 4, 'Spaceship-1'],
		[0x1032, 0x1012, 4, 'Spaceship-2'],
		[0x0312, 0x1012, 4, 'Spaceship-3'],
		[0x3201, 0x1012, 4, 'Spaceship-4'],
		[0x1023, 0x1012, 4, 'Spaceship-5'],
		[0x2130, 0x1012, 4, 'Spaceship-6'],
		[0x0123, 0x0001, 4, 'Stollery-1'],
		[0x3120, 0x0001, 4, 'Stollery-2'],
		[0x0132, 0x0001, 4, 'Stollery-3'],
		[0x2103, 0x0001, 4, 'Stollery-4'],
		[0x3102, 0x0001, 4, 'Stollery-5'],
		[0x1203, 0x0001, 4, 'Stollery-6'],
		[0x0123, 0x1111, 1, 'Pinwheel-1'],
		[0x1032, 0x1111, 1, 'Pinwheel-2'],
		[0x1320, 0x1111, 4, 'Pinwheel-3'],
		[0x2031, 0x2002, 2, 'TwoFace-1'],
		[0x0132, 0x2002, 4, 'TwoFace-2'],
		[0x1032, 0x2002, 2, 'TwoFace-3'],
		[0x3021, 0x2002, 4, 'TwoFace-4'],
		[0x2031, 0x1102, 4, 'Turtle-1'],
		[0x3120, 0x1102, 4, 'Turtle-2'],
		[0x1023, 0x1102, 4, 'Turtle-3'],
		[0x3021, 0x1102, 4, 'Turtle-4'],
		[0x0132, 0x1102, 4, 'Turtle-5'],
		[0x1203, 0x1102, 4, 'Turtle-6'],
		[0x1302, 0x2122, 4, 'Pinwheel Poser-1'],
		[0x0213, 0x2122, 4, 'Pinwheel Poser-2'],
		[0x2013, 0x2122, 4, 'Pinwheel Poser-3'],
		[0x0312, 0x2122, 4, 'Pinwheel Poser-4'],
		[0x2310, 0x2122, 4, 'Pinwheel Poser-5'],
		[0x0321, 0x2122, 4, 'Pinwheel Poser-6'],
		[0x0123, 0x0022, 4, 'Gun-1'],
		[0x1032, 0x0022, 4, 'Gun-2'],
		[0x0132, 0x0022, 4, 'Gun-3'],
		[0x2310, 0x0022, 4, 'Gun-4'],
		[0x0312, 0x0022, 4, 'Gun-5'],
		[0x2130, 0x0022, 4, 'Gun-6']
	];

	var tcllpprobs = [];
	var tcllpfilter = [];
	var tcllnprobs = [];
	var tcllnfilter = [];
	for (var i = 0; i < tcllp_map.length; i++) {
		tcllpprobs[i] = tcllp_map[i][2];
		tcllpfilter[i] = tcllp_map[i][3];
		tcllnprobs[i] = tclln_map[i][2];
		tcllnfilter[i] = tclln_map[i][3];
	}

	function getLLScramble(type, length, cases) {
		var llcase = egll_map[scrMgr.fixCase(cases, egllprobs)];
		var perm = [0, 1, 2, 3];
		var ori = [0, 0, 0, 0, 0, 0, 0];
		if (type == '222tcp') {
			llcase = tcllp_map[scrMgr.fixCase(cases, tcllpprobs)];
			ori = [0, 0, 0, 0, 1, 0, 0];
			perm = perm.concat(egperms[0]);
		} else if (type == '222tcn') {
			llcase = tclln_map[scrMgr.fixCase(cases, tcllnprobs)];
			ori = [0, 0, 0, 0, 2, 0, 0];
			perm = perm.concat(egperms[0]);
		} else if (type == '222eg0') {
			llcase = egll_map[scrMgr.fixCase(cases, egllprobs)];
			perm = perm.concat(egperms[0]);
		} else if (type == '222eg1') {
			llcase = egll_map[scrMgr.fixCase(cases, egllprobs)];
			perm = perm.concat(egperms[2 + rn(4)]);
		} else {
			llcase = egll_map[scrMgr.fixCase(cases, egllprobs)];
			perm = perm.concat(egperms[1]);
		}
		var rndA = rn(4);
		while (rndA-- > 0) {
			doPermMove(perm, 0);
		}
		var perm0 = perm.slice();
		for (var i = 0; i < 4; i++) {
			perm[i] = perm0[llcase[0] >> (i * 4) & 0xf];
			ori[i] = llcase[1] >> (i * 4) & 0xf;
		}
		var rndU = rn(4);
		while (rndU-- > 0) {
			doOriMove(ori, 0);
			doPermMove(perm, 0);
		}
		perm = mathlib.get8Perm(perm, 7);
		ori = oriCoord.get(ori);
		return solv.toStr(solv.search([perm, ori], 9).reverse(), "URF", "'2 ");
	}

	function getLLImage(ll_map, llfilter, cases, canvas) {
		var llcase = ll_map[cases];
		var llface = [];
		for (var i = 0; i < 4; i++) {
			var perm = llcase[0] >> (i << 2) & 0xf;
			var ori = llcase[1] >> (i << 2) & 0xf;
			for (var j = 0; j < 3; j++) {
				var pos = llFaces.indexOf(cFacelet[i][j]);
				llface[pos] = "DLFURB".charAt(cFacelet[perm][(j + 3 - ori) % 3] >> 2);
			}
		}
		llface = llface.join('');
		if (!canvas) {
			return [llface, null, llfilter[cases]];
		}
		image.llImage.drawImage(llface, null, canvas);
	}

	function getScramble(type, length, state) {
		var ori, perm, lim;
		var maxl = type == '222o' ? 0 : 9;
		do {
			lim = 2;
			if (type == '222o' || type == '222so') {
				perm = rn(5040);
				ori = rn(729);
				lim = 3;
			} else if (type == '222eg') {
				ori = egmap[state & 0x7];
				perm = [0, 2, 3, 4, 5, 1][state >> 3];
				var arr = mathlib.set8Perm([0, 0, 0, 0].concat(egperms[perm]), rn(24), 4);
				perm = mathlib.get8Perm(arr, 7);
				var rndU = rn(4);
				ori = oriCoord.set([], ori);
				while (rndU-- > 0) {
					doOriMove(ori, 0);
				}
				ori = oriCoord.get(ori);
			} else if (/^222eg[012]$/.exec(type)) {
				return getScramble('222eg', length, [0, 8, 40][~~type[5]] + state);
			} else if (type == '222nb') {
				do {
					perm = rn(5040);
					ori = rn(729);
				} while (!checkNoBar(perm, ori));
			}
		} while (perm == 0 && ori == 0 || solv.search([perm, ori], 0, lim) != null);
		return solv.toStr(solv.search([perm, ori], maxl).reverse(), "URF", "'2 ");
	}

	scrMgr.reg(['222o', '222so', '222nb'], getScramble)
		('222eg0', getLLScramble, [egllfilter, egllprobs, getLLImage.bind(null, egll_map, egllfilter)])
		('222eg1', getLLScramble, [egllfilter, egllprobs, getLLImage.bind(null, egll_map, egllfilter)])
		('222eg2', getLLScramble, [egllfilter, egllprobs, getLLImage.bind(null, egll_map, egllfilter)])
		('222tcp', getLLScramble, [tcllpfilter, tcllpprobs, getLLImage.bind(null, tcllp_map, tcllpfilter)])
		('222tcn', getLLScramble, [tcllnfilter, tcllnprobs, getLLImage.bind(null, tclln_map, tcllnfilter)])
		('222eg', getScramble, [egfilter, egprobs]);

	return {
		getEGLLImage: getLLImage.bind(null, egll_map, egllfilter)
	}
})(mathlib.rn);
