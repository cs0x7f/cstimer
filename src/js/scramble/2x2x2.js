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

	var oriCoord = new mathlib.Coord('o', 7, -3);

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
		var perm = mathlib.setNPerm([], pidx, 7);
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
		[0x3210, 0x1221, 2, 'H-1'],
		[0x3120, 0x1221, 2, 'H-2'],
		[0x2310, 0x1221, 4, 'H-3'],
		[0x3012, 0x1221, 4, 'H-4'],
		[0x0312, 0x0210, 4, 'L-1'],
		[0x2310, 0x0210, 4, 'L-2'],
		[0x0213, 0x0210, 4, 'L-3'],
		[0x3210, 0x0210, 4, 'L-4'],
		[0x2013, 0x0210, 4, 'L-5'],
		[0x3012, 0x0210, 4, 'L-6'],
		[0x3210, 0x1212, 4, 'Pi-1'],
		[0x0213, 0x1212, 4, 'Pi-2'],
		[0x2310, 0x1212, 4, 'Pi-3'],
		[0x2013, 0x1212, 4, 'Pi-4'],
		[0x3012, 0x1212, 4, 'Pi-5'],
		[0x0312, 0x1212, 4, 'Pi-6'],
		[0x3210, 0x2220, 4, 'S-1'],
		[0x0213, 0x2220, 4, 'S-2'],
		[0x0312, 0x2220, 4, 'S-3'],
		[0x3012, 0x2220, 4, 'S-4'],
		[0x2013, 0x2220, 4, 'S-5'],
		[0x2310, 0x2220, 4, 'S-6'],
		[0x2310, 0x1020, 4, 'T-1'],
		[0x2013, 0x1020, 4, 'T-2'],
		[0x0213, 0x1020, 4, 'T-3'],
		[0x3210, 0x1020, 4, 'T-4'],
		[0x3012, 0x1020, 4, 'T-5'],
		[0x0312, 0x1020, 4, 'T-6'],
		[0x0213, 0x2010, 4, 'U-1'],
		[0x3210, 0x2010, 4, 'U-2'],
		[0x0312, 0x2010, 4, 'U-3'],
		[0x3012, 0x2010, 4, 'U-4'],
		[0x2310, 0x2010, 4, 'U-5'],
		[0x2013, 0x2010, 4, 'U-6'],
		[0x3210, 0x1011, 4, 'aS-1'],
		[0x0213, 0x1011, 4, 'aS-2'],
		[0x0312, 0x1011, 4, 'aS-3'],
		[0x3012, 0x1011, 4, 'aS-4'],
		[0x2310, 0x1011, 4, 'aS-5'],
		[0x2013, 0x1011, 4, 'aS-6']
	];

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
		[0x2031, 0x0110, 2, '2Face-1'],
		[0x3102, 0x0110, 4, '2Face-2'],
		[0x0213, 0x0110, 2, '2Face-3'],
		[0x3021, 0x0110, 4, '2Face-4'],
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
		[0x2031, 0x2002, 2, '2Face-1'],
		[0x0132, 0x2002, 4, '2Face-2'],
		[0x1032, 0x2002, 2, '2Face-3'],
		[0x3021, 0x2002, 4, '2Face-4'],
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

	var tcll_map = [
		[0x0123, 0x0221, 4, 'TCLL1-Hammer'],
		[0x0123, 0x1022, 4, 'TCLL1-Spaceship'],
		[0x2031, 0x0002, 4, 'TCLL1-Stollery'],
		[0x0123, 0x2222, 1, 'TCLL1-Pinwheel'],
		[0x2031, 0x0110, 2, 'TCLL1-2Face'],
		[0x1302, 0x0122, 4, 'TCLL1-Turtle'],
		[0x3210, 0x1112, 4, 'TCLL1-Pinwheel Poser'],
		[0x2031, 0x0011, 4, 'TCLL1-Gun'],
		[0x1302, 0x1201, 4, 'TCLL2-Hammer'],
		[0x0123, 0x1012, 4, 'TCLL2-Spaceship'],
		[0x0123, 0x0001, 4, 'TCLL2-Stollery'],
		[0x0123, 0x1111, 1, 'TCLL2-Pinwheel'],
		[0x2031, 0x2002, 2, 'TCLL2-2Face'],
		[0x2031, 0x1102, 4, 'TCLL2-Turtle'],
		[0x1302, 0x2122, 4, 'TCLL2-Pinwheel Poser'],
		[0x0123, 0x0022, 4, 'TCLL2-Gun']
	];

	var lsall_map = [
		[0x00000, 'LS1-PBL'],
		[0x00222, 'LS1-Sune'],
		[0x00111, 'LS1-aSune'],
		[0x00102, 'LS1-Ua'],
		[0x00021, 'LS1-Ub'],
		[0x00120, 'LS1-La'],
		[0x00210, 'LS1-Lb'],
		[0x00201, 'LS1-Ta'],
		[0x00012, 'LS1-Tb'],
		[0x10221, 'LS2-Hammer'],
		[0x10212, 'LS2-Spaceship'],
		[0x10200, 'LS2-StolleryA'],
		[0x10002, 'LS2-StolleryB'],
		[0x10020, 'LS2-StolleryC'],
		[0x10110, 'LS2-2Face'],
		[0x10122, 'LS2-Turtle'],
		[0x10011, 'LS2-GunA'],
		[0x10101, 'LS2-GunB'],
		[0x20112, 'LS3-Hammer'],
		[0x20211, 'LS3-Spaceship'],
		[0x20100, 'LS3-StolleryA'],
		[0x20001, 'LS3-StolleryB'],
		[0x20010, 'LS3-StolleryC'],
		[0x20220, 'LS3-2Face'],
		[0x20121, 'LS3-Turtle'],
		[0x20022, 'LS3-GunA'],
		[0x20202, 'LS3-GunB'],
		[0x02022, 'LS4-SuneA'],
		[0x02220, 'LS4-SuneB'],
		[0x02202, 'LS4-SuneC'],
		[0x02211, 'LS4-PiA'],
		[0x02121, 'LS4-PiB'],
		[0x02010, 'LS4-U'],
		[0x02001, 'LS4-L'],
		[0x02100, 'LS4-T'],
		[0x02112, 'LS4-H'],
		[0x12012, 'LS5-HammerA'],
		[0x12102, 'LS5-HammerB'],
		[0x12120, 'LS5-SpaceshipA'],
		[0x12201, 'LS5-SpaceshipB'],
		[0x12000, 'LS5-Stollery'],
		[0x12222, 'LS5-Pinwheel'],
		[0x12021, 'LS5-TurtleA'],
		[0x12210, 'LS5-TurtleB'],
		[0x12111, 'LS5-Pinwheel Poser'],
		[0x22110, 'LS6-Hammer'],
		[0x22101, 'LS6-Spaceship'],
		[0x22002, 'LS6-2Face'],
		[0x22011, 'LS6-Turtle'],
		[0x22122, 'LS6-Pinwheel PoserA'],
		[0x22221, 'LS6-Pinwheel PoserB'],
		[0x22212, 'LS6-Pinwheel PoserC'],
		[0x22200, 'LS6-GunA'],
		[0x22020, 'LS6-GunB'],
		[0x01011, 'LS7-aSuneA'],
		[0x01110, 'LS7-aSuneB'],
		[0x01101, 'LS7-aSuneC'],
		[0x01212, 'LS7-PiA'],
		[0x01122, 'LS7-PiB'],
		[0x01200, 'LS7-U'],
		[0x01002, 'LS7-L'],
		[0x01020, 'LS7-T'],
		[0x01221, 'LS7-H'],
		[0x11220, 'LS8-Hammer'],
		[0x11022, 'LS8-Spaceship'],
		[0x11001, 'LS8-2Face'],
		[0x11202, 'LS8-Turtle'],
		[0x11121, 'LS8-Pinwheel PoserA'],
		[0x11112, 'LS8-Pinwheel PoserB'],
		[0x11211, 'LS8-Pinwheel PoserC'],
		[0x11010, 'LS8-GunA'],
		[0x11100, 'LS8-GunB'],
		[0x21201, 'LS9-HammerA'],
		[0x21021, 'LS9-HammerB'],
		[0x21012, 'LS9-SpaceshipA'],
		[0x21120, 'LS9-SpaceshipB'],
		[0x21000, 'LS9-Stollery'],
		[0x21111, 'LS9-Pinwheel'],
		[0x21102, 'LS9-TurtleA'],
		[0x21210, 'LS9-TurtleB'],
		[0x21222, 'LS9-Pinwheel Poser']
	];

	var egllprobs = mathlib.idxArray(egll_map, 2);
	var egllfilter = mathlib.idxArray(egll_map, 3);
	var tcllpprobs = mathlib.idxArray(tcllp_map, 2);
	var tcllpfilter = mathlib.idxArray(tcllp_map, 3);
	var tcllnprobs = mathlib.idxArray(tclln_map, 2);
	var tcllnfilter = mathlib.idxArray(tclln_map, 3);
	var tcllprobs = mathlib.idxArray(tcll_map, 2);
	var tcllfilter = mathlib.idxArray(tcll_map, 3);
	var lsallprobs = mathlib.valuedArray(lsall_map.length, 1);
	var lsallfilter = mathlib.idxArray(lsall_map, 1);

	function getLLScramble(type, length, cases) {
		var llcase = 0;
		var ncubie = 4;
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
		} else if (type == '222tc') {
			var tcllIdx = scrMgr.fixCase(cases, tcllprobs)
			llcase = tcll_map[tcllIdx].slice();
			ori = [0, 0, 0, 0, tcllIdx < 7 ? 1 : 2, 0, 0];
			perm = perm.concat(egperms[0]);
			var perm4 = mathlib.rndPerm(4);
			llcase[0] = 0;
			for (var i = 0; i < 4; i++) {
				llcase[0] |= perm4[i] << (i * 4);
			}
		} else if (type == '222eg0') {
			llcase = egll_map[scrMgr.fixCase(cases, egllprobs)];
			perm = perm.concat(egperms[0]);
		} else if (type == '222eg1') {
			llcase = egll_map[scrMgr.fixCase(cases, egllprobs)];
			perm = perm.concat(egperms[2 + rn(4)]);
		} else if (type == '222eg2') {
			llcase = egll_map[scrMgr.fixCase(cases, egllprobs)];
			perm = perm.concat(egperms[1]);
		} else  if (type == '222lsall') {
			perm = perm.concat(egperms[0]);
			var perm4 = mathlib.rndPerm(4);
			perm4.push(perm4[3]);
			perm4[3] = 4;
			llcase = [0, lsall_map[scrMgr.fixCase(cases, lsallprobs)][0]];
			for (var i = 0; i < 5; i++) {
				llcase[0] |= perm4[i] << (i * 4);
			}
			ncubie = 5;
		}
		var rndA = rn(4);
		while (rndA-- > 0) {
			doPermMove(perm, 0);
		}
		var perm0 = perm.slice();
		for (var i = 0; i < ncubie; i++) {
			perm[i] = perm0[llcase[0] >> (i * 4) & 0xf];
			ori[i] = llcase[1] >> (i * 4) & 0xf;
		}
		var rndU = rn(4);
		while (rndU-- > 0) {
			doOriMove(ori, 0);
			doPermMove(perm, 0);
		}
		perm = mathlib.getNPerm(perm, 7);
		ori = oriCoord.get(ori);
		return solv.toStr(solv.search([perm, ori], 9).reverse(), "URF", "'2 ");
	}

	function getLLImage(type, ll_map, llfilter, cases, canvas) {
		var llcase = ll_map[cases];
		var llface = [];
		for (var i = 0; i < 4; i++) {
			if (!type || type == 'all' || type == 'ori') {
				var perm = llcase[0] >> (i << 2) & 0xf;
				var ori = llcase[1] >> (i << 2) & 0xf;
				var cols = type == 'all' ? 'DLFURB' : 'DGGUGG';
				for (var j = 0; j < 3; j++) {
					var pos = llFaces.indexOf(cFacelet[i][j]);
					llface[pos] = cols.charAt(cFacelet[perm][(j + 3 - ori) % 3] >> 2);
				}
			} else if (type == 'ls') {
				var ori = llcase[0] >> (i << 2) & 0xf;
				for (var j = 0; j < 3; j++) {
					var pos = llFaces.indexOf(cFacelet[i][j]);
					llface[pos] = "DGU".charAt((j + 3 - ori) % 3 == 0 ? (i == 3 ? 2 : 0) : 1);
				}
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
				var arr = mathlib.setNPerm([0, 0, 0, 0].concat(egperms[perm]), rn(24), 4);
				perm = mathlib.getNPerm(arr, 7);
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
		('222eg0', getLLScramble, [egllfilter, egllprobs, getLLImage.bind(null, 'all', egll_map, egllfilter)])
		('222eg1', getLLScramble, [egllfilter, egllprobs, getLLImage.bind(null, 'all', egll_map, egllfilter)])
		('222eg2', getLLScramble, [egllfilter, egllprobs, getLLImage.bind(null, 'all', egll_map, egllfilter)])
		('222tcp', getLLScramble, [tcllpfilter, tcllpprobs, getLLImage.bind(null, 'all', tcllp_map, tcllpfilter)])
		('222tcn', getLLScramble, [tcllnfilter, tcllnprobs, getLLImage.bind(null, 'all', tclln_map, tcllnfilter)])
		('222tc', getLLScramble, [tcllfilter, tcllprobs, getLLImage.bind(null, 'ori', tcll_map, tcllfilter)])
		('222lsall', getLLScramble, [lsallfilter, lsallprobs, getLLImage.bind(null, 'ls', lsall_map, lsallfilter)])
		('222eg', getScramble, [egfilter, egprobs]);

	return {
		getEGLLImage: getLLImage.bind(null, false, egll_map, egllfilter)
	}
})(mathlib.rn);
