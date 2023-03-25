(function() {
	/*
	x504x x x504x
	 132 231 132
	  x x405x x
	    x504x
	     132
	      x  */
	var cFacelet = [
		[3, 16, 11], // F3, L4, R5
		[4, 23, 15], // F4, D5, L3
		[5, 9, 22], // F5, R3, D4
		[10, 17, 21] // R4, L5, D3
	];

	var eFacelet = [
		[1, 7], // F1, R1
		[2, 14], // F2, L2
		[0, 18], // F0, D0
		[6, 12], // R0, L0
		[8, 20], // R2, D2
		[13, 19] // L1, D1
	];

	function checkNoBar(perm, ori) {
		var edgeOri = eocoord.set([], ori & 0x1f);
		var cornOri = cocoord.set([], ori >> 5);
		var edgePerm = epcoord.set([], perm);
		var f = [];
		mathlib.fillFacelet(cFacelet, f, [0, 1, 2, 3], cornOri, 6);
		mathlib.fillFacelet(eFacelet, f, edgePerm, edgeOri, 6);
		var pieces = [4, 2, 3, 1, 5, 0];
		for (var i = 0; i < 6; i++) {
			for (var j = 0; j < 2; j++) {
				var p1 = eFacelet[i][0 ^ j];
				var p2 = eFacelet[i][1 ^ j];
				var nb1 = ~~(p1 / 6) * 6 + pieces[(pieces.indexOf(p1 % 6) + 5) % 6];
				var nb2 = ~~(p2 / 6) * 6 + pieces[(pieces.indexOf(p2 % 6) + 1) % 6];
				if (f[nb1] == f[p1] && f[nb2] == f[p2]) {
					return false;
				}
			}
		}
		return true;
	}

	var solv = new mathlib.Solver(4, 2, [
		[0, [epermMove, 'p', 6, -1], 360],
		[0, oriMove, 2592]
	]);

	var movePieces = [
		[0, 1, 3],
		[1, 2, 5],
		[0, 4, 2],
		[3, 5, 4]
	];

	var moveOris = [
		[0, 1, 0, 2],
		[0, 1, 0, 2],
		[0, 0, 1, 2],
		[0, 0, 1, 2]
	];

	function epermMove(arr, m) {
		mathlib.acycle(arr, movePieces[m]);
	}

	var eocoord = new mathlib.coord('o', 6, -2);
	var epcoord = new mathlib.coord('p', 6, -1);
	var cocoord = new mathlib.coord('o', 4, 3);

	function oriMove(a, c) {
		var edgeOri = eocoord.set([], a & 0x1f);
		var cornOri = cocoord.set([], a >> 5);
		cornOri[c]++;
		mathlib.acycle(edgeOri, movePieces[c], 1, moveOris[c]);
		return cocoord.get(cornOri) << 5 | eocoord.get(edgeOri);
	}

	function pyrMult(state0, state1) {
		var ep0 = epcoord.set([], state0[0]);
		var eo0 = eocoord.set([], state0[1] & 0x1f);
		var co0 = cocoord.set([], state0[1] >> 5);
		var ep1 = epcoord.set([], state1[0]);
		var eo1 = eocoord.set([], state1[1] & 0x1f);
		var co1 = cocoord.set([], state1[1] >> 5);
		var ep2 = [];
		var eo2 = [];
		var co2 = [];
		for (var i = 0; i < 6; i++) {
			ep2[i] = ep0[ep1[i]];
			eo2[i] = eo0[ep1[i]] ^ eo1[i];
		}
		for (var i = 0; i < 4; i++) {
			co2[i] = co0[i] + co1[i];
		}
		return [epcoord.get(ep2), cocoord.get(co2) << 5 | eocoord.get(eo2)];
	}

	var aufs = [[0, 0], [183, 869], [87, 1729]];

	var l4e_map = [
		//[ 0, 1, '1'],
		[ 1, 3, 'L3Bar-1', 'LLDGFFRRG'],
		[59, 3, 'L3Bar-2', 'DLLGFFRRG'],
		[25, 3, 'L3Bar-3', 'FFGDRRLLG'],
		[35, 3, 'L3Bar-4', 'GRRGLLFFD'],
		[12, 3, 'LL-1',    'LLGFFGGGG'],
		[10, 3, 'LL-2',    'GLLGGGGRR'],
		[ 2, 1, 'LL-3',    'RLRLFLFRF'],
		[ 4, 1, 'LL-4',    'FLFRFRLRL'],
		[ 3, 3, 'L4NB-1',  'FGGGGDGFGGGF'],
		[57, 3, 'L4NB-2',  'GGRGRGDGGGGR'],
		[53, 3, 'L4NB-3',  'GGDGRGGGRGGR'],
		[45, 3, 'L4NB-4',  'DGGFGGGFGGGF'],
		[33, 3, 'L4NB-5',  'GGDGGGGRGGGR'],
		[27, 3, 'L4NB-6',  'DGGGFGGGGGGF'],
		[49, 3, 'L3NB-1',  'RRGGGDGFF'],
		[43, 3, 'L3NB-2',  'GFFRRGDGG'],
		[41, 3, 'L3NB-3',  'GGGDLLFFG'],
		[51, 3, 'L3NB-4',  'GGGGRRLLD'],
		[ 8, 3, 'Flip-1',  'RLFLFFRRL'],
		[16, 3, 'Flip-2',  'LFFRRRLLFGGD'],
		[56, 1, 'Flip-3',  'RLFLFRFRLGGD'],
		[21, 3, 'L4Blk-1', 'GGDGGGLLL'],
		[13, 3, 'L4Blk-2', 'DGGLLLGGG'],
		[29, 3, 'L4Bar-1', 'GGGDGGGRR'],
		[37, 3, 'L4Bar-2', 'GGGFFGGGD'],
		[61, 3, 'L4Bar-3', 'GGGDGGLLG'],
		[ 5, 3, 'L4Bar-4', 'GGGGLLGGD'],
		[17, 3, 'L4Bar-5', 'GGGLLDGGG'],
		[11, 3, 'L4Bar-6', 'GGGGGGDLL'],
		[ 9, 3, 'L4Bar-7', 'RRGDGGGGG'],
		[19, 3, 'L4Bar-8', 'GFFGGGGGD'],
		[20, 3, 'DFlip-1', 'GGGRRGGGGGGD'],
		[18, 3, 'DFlip-2', 'GGGGGGGFFGGD'],
		[60, 1, 'DFlip-3', 'FFGRRGLLGGGD'],
		[58, 1, 'DFlip-4', 'GRRGLLGFFGGD']
	];

	var l4eprobs = [];
	var l4efilter = [];
	for (var i = 0; i < l4e_map.length; i++) {
		l4eprobs.push(l4e_map[i][1]);
		l4efilter.push(l4e_map[i][2]);
	}

	function getL4EScramble(type, length, cases) {
		var l4ecase = l4e_map[scrMgr.fixCase(cases, l4eprobs)][0];
		var perm = mathlib.get8Perm(mathlib.set8Perm([], l4ecase & 1, 4, -1).concat([4, 5]), 6, -1);
		var ori = (l4ecase >> 1 & 0x3) * 864 + (l4ecase >> 3);
		var state = pyrMult(mathlib.rndEl(aufs), pyrMult([perm, ori], mathlib.rndEl(aufs)));
		var sol = solv.toStr(solv.search(state, 8).reverse(), "ULRB", ["'", ""]) + ' ';
		for (var i = 0; i < 4; i++) {
			var r = mathlib.rn(3);
			if (r < 2) {
				sol += "lrbu".charAt(i) + [" ", "' "][r];
			}
		}
		return sol;
	}

	function getL4EImage(cases, canvas) {
		var l4ecase = l4e_map[cases];
		if (!canvas) {
			return ['GGG' + l4ecase[3], null, l4ecase[2]];
		}
		image.pyrllImage('GGG' + l4ecase[3], canvas);
	}

	function getScramble(type) {
		var minl = type == 'pyro' ? 0 : 8;
		var limit = type == 'pyrl4e' ? 2 : 7;
		var len = 0;
		var sol;
		var perm;
		var ori;
		do {
			if (type == 'pyro' || type == 'pyrso' || type == 'pyr4c') {
				perm = mathlib.rn(360);
				ori = mathlib.rn(2592);
			} else if (type == 'pyrl4e') {
				perm = mathlib.get8Perm(mathlib.set8Perm([], mathlib.rn(12), 4, -1).concat([4, 5]), 6, -1);
				ori = mathlib.rn(3) * 864 + mathlib.rn(8);
			} else if (type == 'pyrnb') {
				do {
					perm = mathlib.rn(360);
					ori = mathlib.rn(2592);
				} while (!checkNoBar(perm, ori));
			}
			len = solv.search([perm, ori], 0).length;
			sol = solv.toStr(solv.search([perm, ori], minl).reverse(), "ULRB", ["'", ""]) + ' ';
			for (var i = 0; i < 4; i++) {
				var r = mathlib.rn(type == 'pyr4c' ? 2 : 3);
				if (r < 2) {
					sol += "lrbu".charAt(i) + [" ", "' "][r];
					len++;
				}
			}
		} while (len < limit);
		return sol;
	}
	scrMgr.reg(['pyro', 'pyrso', 'pyrnb', 'pyr4c'], getScramble)
		('pyrl4e', getL4EScramble, [l4efilter, l4eprobs, getL4EImage]);
})();
