(function(rn) {
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
		[0x3210, 0x1221, 'FFBBLRDDRLDD'], // H-BBFF
		[0x1032, 0x2112, 'RLRLBBDDFFDD'], // H-FBFB
		[0x3021, 0x2112, 'RBLBFRDDLFDD'], // H-RFLF
		[0x0231, 0x2112, 'LRFFRLDDBBDD'], // H-RLFF
		[0x1032, 0x1002, 'DBLDFRFRDLBD'], // L-FBRL
		[0x0312, 0x0210, 'DLRDBRFBDFLD'], // L-LBFF
		[0x0231, 0x2001, 'DRRDBLBFDFLD'], // L-LFFB
		[0x2013, 0x0210, 'DLLDFBRBDRFD'], // L-LFFR
		[0x3210, 0x0210, 'DLFDRFLBDBRD'], // L-LRFF
		[0x3021, 0x2001, 'DRLDFBRFDLBD'], // L-RFBL
		[0x2013, 0x1212, 'BFFBRDLLDRDD'], // Pi-BFFB
		[0x3021, 0x2211, 'RLRLBDFBDFDD'], // Pi-FBFB
		[0x1032, 0x1122, 'FLFRRDBBDLDD'], // Pi-FRFL
		[0x0312, 0x1212, 'BRLBFDLFDRDD'], // Pi-FRLF
		[0x3210, 0x1212, 'LFRFBDRLDBDD'], // Pi-LFRF
		[0x0231, 0x2211, 'BLLFFDRBDRDD'], // Pi-RFFL
		[0x3021, 0x2022, 'LRFDRLBDBDFD'], // S-FBBF
		[0x2013, 0x2220, 'FBLDFBRDLDRD'], // S-FBFB
		[0x3210, 0x2220, 'RBFDRFLDLDBD'], // S-FLFR
		[0x0231, 0x2022, 'RBLDFRFDLDBD'], // S-FLRF
		[0x0312, 0x2220, 'BRFDRFLDBDLD'], // S-LFFR
		[0x1032, 0x2202, 'BRLDFRFDBDLD'], // S-LFRF
		[0x3210, 0x1020, 'FFDDBBRDRLDL'], // T-BBFF
		[0x1032, 0x2100, 'BFDDBFLDRRDL'], // T-FBFB
		[0x0231, 0x0012, 'BBDDLRFDLRDF'], // T-FFLR
		[0x3021, 0x0012, 'BLDDBRFDFRDL'], // T-FLFR
		[0x2013, 0x1020, 'RBDDLBRDLFDF'], // T-RFLF
		[0x0312, 0x1020, 'FBDDRRFDLLDB'], // T-RLFF
		[0x0312, 0x2010, 'FFDDBBRLDDRL'], // D-BBFF
		[0x0231, 0x0021, 'BFDDFBRLDDLR'], // D-BFFB
		[0x1032, 0x1200, 'LLDDFBRBDDFR'], // D-FFLR
		[0x3021, 0x0021, 'RFDDBRFLDDBL'], // D-FRLF
		[0x2013, 0x2010, 'LBDDBRFRDDFL'], // D-LFFR
		[0x3210, 0x2010, 'LRDDBBRFDDFL'], // D-LRFF
		[0x2013, 0x1011, 'FBDRBFDRDLDL'], // aS-FBBF
		[0x3021, 0x0111, 'FBDLFBDRDLDR'], // aS-FBFB
		[0x1032, 0x1110, 'RFDLRBDLDFDB'], // aS-FRFL
		[0x0312, 0x1011, 'LBDFFLDRDBDR'], // aS-FRLF
		[0x3210, 0x1011, 'LFDRRFDLDBDB'], // aS-LFRF
		[0x0231, 0x0111, 'LFDBFRDLDBDR']  // aS-RFFL
	];

	var egllprobs = [2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];

	var egllfilter = ['H-BBFF', 'H-FBFB', 'H-RFLF', 'H-RLFF', 'L-FBRL', 'L-LBFF', 'L-LFFB', 'L-LFFR', 'L-LRFF', 'L-RFBL', 'Pi-BFFB', 'Pi-FBFB', 'Pi-FRFL', 'Pi-FRLF', 'Pi-LFRF', 'Pi-RFFL', 'S-FBBF', 'S-FBFB', 'S-FLFR', 'S-FLRF', 'S-LFFR', 'S-LFRF', 'T-BBFF', 'T-FBFB', 'T-FFLR', 'T-FLFR', 'T-RFLF', 'T-RLFF', 'U-BBFF', 'U-BFFB', 'U-FFLR', 'U-FRLF', 'U-LFFR', 'U-LRFF', 'aS-FBBF', 'aS-FBFB', 'aS-FRFL', 'aS-FRLF', 'aS-LFRF', 'aS-RFFL'];

	function getEGScramble(type, length, cases) {
		var egcase = egll_map[scrMgr.fixCase(cases, egllprobs)];
		var perm = [0, 0, 0, 0];
		var ori = [0, 0, 0, 0, 0, 0, 0];
		if (type == '222eg0') {
			perm = perm.concat(egperms[0]);
		} else if (type == '222eg1') {
			perm = perm.concat(egperms[2 + rn(4)]);
		} else {
			perm = perm.concat(egperms[1]);
		}
		for (var i = 0; i < 4; i++) {
			perm[i] = egcase[0] >> (i * 4) & 0xf;
			ori[i] = egcase[1] >> (i * 4) & 0xf;
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

	function getEGLLImage(cases, canvas) {
		var egcase = egll_map[cases];
		image.llImage(egcase[2], null, canvas);
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
		('222eg0', getEGScramble, [egllfilter, egllprobs, getEGLLImage])
		('222eg1', getEGScramble, [egllfilter, egllprobs, getEGLLImage])
		('222eg2', getEGScramble, [egllfilter, egllprobs, getEGLLImage])
		('222eg', getScramble, [egfilter, egprobs]);

})(mathlib.rn);
