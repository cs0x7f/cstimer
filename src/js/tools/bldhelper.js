"use strict";

var bldhelper = execMain(function() {

	// bld scramble gen
	function enumCycles(n, k) {
		if (k == undefined) {
			var ret = [];
			for (var i = 0; i < n; i++) {
				var cur = enumCycles(n, i + 1);
				ret.push.apply(ret, cur);
			}
			return ret;
		}
		if (n < k || n < 1 || k < 1) {
			return [];
		} else if (n == k) {
			return [mathlib.valuedArray(n, 1)];
		}
		var rm1 = enumCycles(n - 1, k - 1);
		for (var i = 0; i < rm1.length; i++) {
			rm1[i].push(1);
		}
		var dec1 = enumCycles(n - k, k);
		for (var i = 0; i < dec1.length; i++) {
			var cur = dec1[i];
			for (var j = 0; j < cur.length; j++) {
				cur[j]++;
			}
		}
		return rm1.concat(dec1);
	}

	function cntPerms(cycles) {
		if (cycles.length == 0) {
			return 1;
		}
		var n = cycles[0];
		var curVal = cycles[0];
		var curCnt = 1;
		var remain = [];
		for (var i = 1; i < cycles.length; i++) {
			n += cycles[i];
			if (cycles[i] == curVal) {
				curCnt++;
			} else {
				remain.push(cycles[i]);
			}
		}
		var cur = 1;
		for (var i = 0; i < curCnt; i++) {
			cur *= mathlib.Cnk[n][curVal] * mathlib.fact[curVal - 1];
			cur /= (i + 1);
			n -= curVal;
		}
		return cur * cntPerms(remain);
	}

	function cntOris(n, base, nDone, nErr) {
		if (nDone + nErr > n) {
			return [0, null];
		}
		var cum = 0;
		var ret = [];
		for (var i = nDone; i < n - 1; i++) {
			var skip = (i < nDone + nErr) ? 1 : 0;
			var cur = mathlib.rn(base - skip) + skip;
			ret.push(cur);
			cum += cur;
		}
		if (nDone + nErr < n) { //at least 1 any
			ret.push((base * n - cum) % base);
			return [Math.pow(base - 1, nErr) * Math.pow(base, n - nDone - nErr - 1), mathlib.valuedArray(nDone, 0).concat(ret)];
		}
		var sum = mathlib.valuedArray(base, 0);
		sum[0] = 1;
		for (var i = 0; i < nErr; i++) {
			var sum2 = mathlib.valuedArray(base, 0);
			for (var j = 1; j < base; j++) {
				for (var k = 0; k < base; k++) {
					sum2[(j + k) % base] += sum[k];
				}
			}
			sum = sum2;
		}
		if (sum[0] == 0) {
			return [0, null];
		}
		var last = (base * n - cum) % base;
		while (last == 0 && nErr > 0) {
			cum = 0;
			ret = [];
			for (var i = nDone; i < n - 1; i++) {
				var skip = (i < nDone + nErr) ? 1 : 0;
				var cur = mathlib.rn(base - skip) + skip;
				ret.push(cur);
				cum += cur;
			}
			last = (base * n - cum) % base;
		}
		ret.push(last);
		return [sum[0], mathlib.valuedArray(nDone, 0).concat(ret)];
	}

	// buff: buffer cubie status bitmask (0 - done, 1 - flip, 2 - in cycles)
	// fixdone: num of fix-solved cubies (exclude buffer)
	// fixerr: num of fix-flipped cubies (exclude buffer)
	// nerrLR: total num of flipped cubies (include fixed, exclude buffer)
	// scycle: num of cycles without the buffer cubie
	// ncodeLR: num of encoded words without flips
	// return [cntValid, rndState]
	function getRandState(buff, fixDone, fixErr, nerrLR, scycleLR, ncodeLR, base, cycles, ignoreFlip) {
		var cycCnt = 0;
		var inpCnt = 0;
		var oupCnt = 0;
		for (var i = 0; i < cycles.length; i++) {
			if (cycles[i] == 1) {
				inpCnt++;
			} else {
				oupCnt += cycles[i];
				cycCnt++;
			}
		}
		if (ignoreFlip && (buff & 0x3) == 0x3) {
			buff &= ~2;
		}
		var cntValid = 0;
		var rndState = null;
		for (var i = 0; i < 3; i++) { // enum buff status
			if ((buff >> i & 1) == 0) {
				continue;
			}
			var scycle = cycCnt - (i >> 1);
			var ncode = oupCnt + cycCnt - (i >> 1) * 2;
			if (scycle < scycleLR[0] || scycle > scycleLR[1]
					|| ncode < ncodeLR[0] || ncode > ncodeLR[1]) {
				continue
			}
			var bufErr = i == 1 ? 1 : 0;
			var fixErr1 = fixErr + bufErr;
			var fixInp = fixDone + fixErr + (i < 2 ? 1 : 0);
			if (inpCnt < Math.max(fixInp, nerrLR[0] + bufErr) || fixErr > nerrLR[1]) {
				continue;
			}

			// calc oris
			var anyInp = inpCnt - fixInp;
			var cntFlip = 0;
			var flips = null;
			var anySamp = 0;
			for (var j = Math.max(nerrLR[0] - fixErr, 0); j <= Math.min(nerrLR[1] - fixErr, anyInp); j++) {
				var cur = cntOris(cycCnt + inpCnt, base, inpCnt - fixErr1 - j, fixErr1 + j);
				var curCnt = cur[0] * mathlib.Cnk[anyInp][j];
				cntFlip += curCnt;
				if (mathlib.rndHit(curCnt / cntFlip)) {
					flips = cur[1];
					anySamp = j;
				}
			}
			if (cntFlip == 0 && !ignoreFlip) {
				continue;
			}
			cntFlip *= Math.pow(base, oupCnt - cycCnt);

			// calc perms
			var cyclesR = cycles.slice(0, cycles.length - fixInp);
			var remainCnt = inpCnt + oupCnt - fixInp;
			var mulPerm = 1;
			while (cyclesR.length > 0) {
				var curLen = cyclesR.pop();
				var curCnt = 1;
				mulPerm *= mathlib.Cnk[remainCnt][curLen] * mathlib.fact[curLen - 1];
				remainCnt -= curLen;
				while (cyclesR.at(-1) == curLen) {
					cyclesR.pop();
					curCnt++;
					mulPerm *= mathlib.Cnk[remainCnt][curLen] * mathlib.fact[curLen - 1];
					mulPerm /= curCnt;
					remainCnt -= curLen;
				}
				if (curLen == 1 && i == 2) {
					mulPerm *= oupCnt;
					mulPerm /= inpCnt + oupCnt - fixInp;
				}
			}
			var curValid = (ignoreFlip ? 1 : cntFlip) * mulPerm;
			cntValid += curValid;
			if (!mathlib.rndHit(curValid / cntValid)) { // not sampled
				continue;
			}

			// flip sample
			var flipState = [];
			for (var j = 0; j < cycCnt; j++) {
				var cursum = flips.pop();
				var curLen = cycles[j];
				for (var k = 0; k < curLen - 1; k++) {
					var cur = mathlib.rn(base);
					flipState.push(cur);
					cursum += base - cur;
				}
				flipState.push(cursum % base);
			}
			var rndp = mathlib.rndPerm(anyInp);
			for (var j = 0; j < rndp.length; j++) {
				if (rndp[j] < anySamp) {
					flipState.push(flips.pop());
				} else {
					flipState.push(flips.shift());
				}
			}
			if (i < 2) {
				flipState.unshift(i == 0 ? flips.shift() : flips.pop());
				flipState.splice.apply(flipState, [1, 0].concat(flips));
			} else {
				flipState.splice.apply(flipState, [0, 0].concat(flips));
			}

			// perm sample
			cyclesR = cycles.slice(0, cycles.length - fixInp);
			var permState = [0];
			rndState = [];
			var rmap = [0];
			var k = (i == 2) ? 1 : 0;
			if (k == 0) {
				rndState[0] = [0, flipState.shift()];
			}
			for (var j = 1; j < oupCnt + inpCnt; j++) {
				permState[j] = j;
				if (j >= 1 + fixDone + fixErr) {
					rmap[k] = j;
					k++;
				} else {
					rndState[j] = [j, flipState.shift()];
				}
			}
			remainCnt = inpCnt + oupCnt - fixInp;
			var perm = mathlib.rndPerm(remainCnt);
			if (i == 2 && perm.indexOf(0) >= oupCnt) {
				var offset = (perm.indexOf(0) - mathlib.rn(oupCnt) + remainCnt) % remainCnt;
				perm = perm.slice(offset).concat(perm.slice(0, offset));
			}
			var permCycles = [];
			for (var j = 0; j < cyclesR.length; j++) {
				var cur = perm.slice(0, cyclesR[j]);
				permCycles.push(cur);
				perm = perm.slice(cyclesR[j]);
				for (var l = 0; l < cur.length; l++) {
					permState[rmap[cur[l]]] = rmap[cur[(l + 1) % cur.length]];
					rndState[rmap[cur[l]]] = [rmap[cur[(l + 1) % cur.length]], flipState.shift()];
				}
			}
		}
		return [cntValid, rndState];
	}

	function getParity(cycles) {
		var p = 0;
		for (var i = 0; i < cycles.length; i++) {
			p ^= cycles[i] + 1;
		}
		return p & 1;
	}

	function getBLDcode(c, scheme, cbuf, ebuf, order) {
		var cori = ~~(cbuf / 8);
		cbuf %= 8;
		cori ^= (0xa5 >> cbuf & 0x1) * 3;
		var eori = ~~(ebuf / 12);
		ebuf %= 12;
		var corns = [];
		var corders = [];
		for (var i = 0; i < 8; i++) {
			corns[i] = scheme.slice(i * 4, i * 4 + 3);
			corders[i] = parseInt(order[i], 24);
		}
		var edges = [];
		var eorders = [];
		for (var i = 0; i < 12; i++) {
			edges[i] = scheme.slice(32 + i * 3, 32 + i * 3 + 2);
			eorders[i] = parseInt(order[i + 8], 24);
		}

		var ccode = [];
		var ecode = [];
		var cc = new mathlib.CubieCube();
		cc.init(c.ca, c.ea);

		var done = 1 << cbuf;
		for (var i = 0; i < 8; i++) {
			if (cc.ca[i] == i) {
				done |= 1 << i;
			}
		}
		while (done != 0xff) {
			var target = cc.ca[cbuf] & 0x7;
			if (target == cbuf) { // buffer in place, swap with any unsolved
				var perm = -1;
				while (done >> (corders[++perm] % 8) & 1) {}
				perm = corders[perm];
				var ori = ~~(perm / 8);
				perm = perm % 8;
				ori ^= (0xa5 >> perm & 0x1) * 3;
				mathlib.circle(cc.ca, perm, cbuf);
				cc.ca[perm] = (cc.ca[perm] + ((6 + ori - cori) << 3)) % 24;
				cc.ca[cbuf] = (cc.ca[cbuf] + ((6 - ori + cori) << 3)) % 24;
				ccode.push((6 - ori + cori) % 3 * 8 + perm);
				continue;
			}
			ccode.push(cc.ca[cbuf]);
			cc.ca[cbuf] = (cc.ca[target] + (cc.ca[cbuf] & 0xf8)) % 24;
			cc.ca[target] = target;
			done |= 1 << target;
		}

		done = 1 << ebuf;
		for (var i = 0; i < 12; i++) {
			if (cc.ea[i] == i * 2) {
				done |= 1 << i;
			}
		}
		while (done != 0xfff) {
			var target = cc.ea[ebuf] >> 1;
			if (target == ebuf) { // buffer in place, swap with any unsolved
				var perm = -1;
				while (done >> (eorders[++perm] % 12) & 1) {}
				perm = eorders[perm];
				var ori = ~~(perm / 12) ^ eori;
				perm = perm % 12;
				mathlib.circle(cc.ea, perm, ebuf);
				cc.ea[perm] ^= ori;
				cc.ea[ebuf] ^= ori;
				ecode.push(perm * 2 + ori);
				continue;
			}
			ecode.push(cc.ea[ebuf]);
			cc.ea[ebuf] = cc.ea[target] ^ (cc.ea[ebuf] & 1);
			cc.ea[target] = target << 1;
			done |= 1 << target;
		}
		var ret = [[], []];
		for (var i = 0; i < ccode.length; i++) {
			var val = ccode[i] & 0x7;
			var ori = (6 - (ccode[i] >> 3) + cori) % 3;
			ori ^= (0xa5 >> val & 0x1) * 3;
			ret[0].push(corns[val].charAt(ori % 3));
			if (i % 2 == 1) {
				ret[0].push(' ');
			}
		}
		for (var i = 0; i < ecode.length; i++) {
			var val = ecode[i] ^ eori;
			ret[1].push(edges[val >> 1].charAt(val & 1));
			if (i % 2 == 1) {
				ret[1].push(' ');
			}
		}
		return ret;
	}

	function checkBLDcode(codes, scheme, cbuf, ebuf) {
		var c = new mathlib.CubieCube();
		for (var i = 0; i < 8; i++) {
			c.ca[i] = i;
		}
		for (var i = 0; i < 12; i++) {
			c.ea[i] = i * 2;
		}
		var cori = ~~(cbuf / 8);
		cbuf %= 8;
		cori ^= (0xa5 >> cbuf & 0x1) * 3;
		var eori = ~~(ebuf / 12);
		ebuf %= 12;
		for (var i = 0; i < codes[0].length; i++) {
			var perm = scheme.indexOf(codes[0][i]);
			var ori = perm & 3;
			perm >>= 2;
			mathlib.circle(c.ca, perm, cbuf);
			ori ^= (0xa5 >> perm & 0x1) * 3;
			c.ca[perm] = (c.ca[perm] + ((6 + ori - cori) << 3)) % 24;
			c.ca[cbuf] = (c.ca[cbuf] + ((6 - ori + cori) << 3)) % 24;
		}
		for (var i = 0; i < codes[1].length; i++) {
			var perm = scheme.indexOf(codes[1][i], 32) - 32;
			var ori = perm % 3;
			perm = ~~(perm / 3);
			mathlib.circle(c.ea, perm, ebuf);
			c.ea[perm] ^= eori ^ ori;
			c.ea[ebuf] ^= eori ^ ori;
		}
		var cc = new mathlib.CubieCube();
		cc.invFrom(c);
		return scramble_333.genFacelet(cc.toFaceCube());
	}

	function genBLDRndState(bldSets, doScramble) {
		var cfixs = bldSets['cfix'].split(' ');
		var cfixDones = [];
		var cfixErrs = [];
		var fixRe = /^(UFR|UFL|UBL|UBR|DFR|DFL|DBL|DBR)(\+?)$/i;
		var cubies = pieces.split(' ');
		for (var i = 0; i < cfixs.length; i++) {
			var m = fixRe.exec(cfixs[i]);
			if (!m) {
				continue;
			} else if (m[1] == cubies[bldSets['cbuff'][0] % 8]) { // buffer
				continue;
			} else if (m[2]) {
				cfixErrs.push(cubies.indexOf(m[1]));
			} else {
				cfixDones.push(cubies.indexOf(m[1]));
			}
		}
		var efixs = bldSets['efix'].split(' ');
		var efixDones = [];
		var efixErrs = [];
		fixRe = /^(UR|UF|UL|UB|DR|DF|DL|DB|FR|FL|BL|BR)(\+?)$/i;
		for (var i = 0; i < efixs.length; i++) {
			var m = fixRe.exec(efixs[i]);
			if (!m) {
				continue;
			} else if (m[1] == cubies[bldSets['ebuff'][0] % 12 + 8]) { // buffer
				continue;
			} else if (m[2]) {
				efixErrs.push(cubies.indexOf(m[1]) - 8);
			} else {
				efixDones.push(cubies.indexOf(m[1]) - 8);
			}
		}

		var parityMask = bldSets['ceparity'];
		// corner count, group by parity
		var cvalid = [0, 0];
		var cSample = [null, null];
		var enum8 = enumCycles(8);
		for (var i = 0; i < enum8.length; i++) {
			var parity = getParity(enum8[i]);
			if ((parityMask >> parity & 1) == 0) {
				continue;
			}
			var ret = getRandState(bldSets['cbuff'][1], cfixDones.length, cfixErrs.length,
				bldSets['cnerrLR'], bldSets['cscycLR'], bldSets['cncodeLR'], 3, enum8[i]);
			cvalid[parity] += ret[0];
			if (mathlib.rndHit(ret[0] / cvalid[parity])) {
				cSample[parity] = ret[1];
			}
		}
		// edge count
		var evalid = [0, 0];
		var eSample = [null, null];
		var enum12 = enumCycles(12);
		for (var i = 0; i < enum12.length; i++) {
			var parity = getParity(enum12[i]);
			if ((parityMask >> parity & 1) == 0) {
				continue;
			}
			var ret = getRandState(bldSets['ebuff'][1], efixDones.length, efixErrs.length,
				bldSets['enerrLR'], bldSets['escycLR'], bldSets['encodeLR'], 2, enum12[i]);
			evalid[parity] += ret[0];
			if (mathlib.rndHit(ret[0] / evalid[parity])) {
				eSample[parity] = ret[1];
			}
		}
		var validCnt = cvalid[0] * evalid[0] + cvalid[1] * evalid[1];
		var ret = [validCnt, cSample[1], eSample[1]];
		if (mathlib.rndHit(cvalid[0] * evalid[0] / validCnt)) {
			ret = [validCnt, cSample[0], eSample[0]];
		}
		if (!doScramble) {
			return ret;
		}
		if (ret[0] == 0) {
			return "N/A";
		}
		var cornMap = [bldSets['cbuff'][0] % 8].concat(cfixDones, cfixErrs);
		var edgeMap = [bldSets['ebuff'][0] % 12].concat(efixDones, efixErrs);
		var cornIMap = [];
		var edgeIMap = [];
		for (var i = 0; i < 8; i++) {
			if (cornMap.indexOf(i) == -1) {
				cornMap.push(i);
			}
			cornIMap[cornMap[i]] = i;
		}
		for (var i = 0; i < 12; i++) {
			if (edgeMap.indexOf(i) == -1) {
				edgeMap.push(i);
			}
			edgeIMap[edgeMap[i]] = i;
		}
		var ca = [];
		var ea = [];
		for (var i = 0; i < 8; i++) {
			ca[cornMap[i]] = cornMap[ret[1][i][0]] | ret[1][i][1] << 3;
		}
		for (var i = 0; i < 12; i++) {
			ea[edgeMap[i]] = edgeMap[ret[2][i][0]] << 1 | ret[2][i][1];
		}
		var cc = new mathlib.CubieCube();
		var rndX = bldSets['ceori'] ? mathlib.rndEl(["", "Rw", "Rw2", "Rw'", "Fw", "Fw'"]) : "";
		var rndY = bldSets['ceori'] ? mathlib.rndEl(["", "Uw", "Uw2", "Uw'"]) : "";
		var move1 = cc.selfMoveStr(rndX);
		var move2 = cc.selfMoveStr(rndY);
		cc.init(ca, ea);
		cc.ori = 0;
		if (cc.isEqual()) {
			return "U U'";
		}
		//state = toGen * rotX * rotY => toGen = state * rotY^-1 * rotX^-1
		if (move2 != null) {
			cc.selfMoveStr("URFDLB".charAt(~~(move2 / 3)) + " 2'".charAt(move2 % 3), true);
		}
		if (move1 != null) {
			cc.selfMoveStr("URFDLB".charAt(~~(move1 / 3)) + " 2'".charAt(move1 % 3), true);
		}
		var facelet = cc.toFaceCube();
		return (scramble_333.genFacelet(facelet) + ' ' + rndX + ' ' + rndY).replace(/ +/g, ' ') || "U U'";
	}

	scrMgr.reg('nocache_333bldspec', function() {
		return genBLDRndState(bldSets, true);
	});

	var pieces = 'UFR UFL UBL UBR DFR DFL DBL DBR UR UF UL UB DR DF DL DB FR FL BL BR';
	var ChiChu = 'JLK ABC DFE GHI XYZ WNM OPQ RTS GH AB CD EF OP IJ KL MN QR ST WX YZ';
	var Speffz = 'CJM DIF ARE BQN VKP ULG XSH WTO BM CI DE AQ VO UK XG WS JP LF RH TN';
	var OrdUDE = '012345670123456789ab';
	var bldSets = {
		'cbuff': [0, 0x7],
		'cfix': "",
		'cnerrLR': [0, 7],
		'cscycLR': [0, 3],
		'cncodeLR': [0, 10],
		'ebuff': [1, 0x7],
		'efix': "",
		'enerrLR': [0, 11],
		'escycLR': [0, 5],
		'encodeLR': [0, 16],
		'ceparity': 0x3,
		'ceori': true,
		'scheme': Speffz,
		'order': OrdUDE
	};

	function procBLDSetEvent(e) {
		var obj = $(e.target);
		var key = obj.attr('id')
		if (!key) {
			return;
		}
		if (/^[ce]buff[01]$/.exec(key)) {
			bldSets[key.slice(0, 5)][~~key[5]] = ~~obj.val();
			calcResult();
		} else if (key.endsWith('LR')) {
			var m = /^(\d{1,2})-(\d{1,2})$/.exec(obj.val()) || /^((\d{1,2}))$/.exec(obj.val());
			if (!m) {
				return;
			}
			var v1 = ~~m[1];
			var v2 = ~~m[2];
			bldSets[key] = [Math.min(v1, v2), Math.max(v1, v2)];
		} else if (key == 'ceparity') {
			bldSets[key] = ~~obj.val();
		} else if (key == 'ceori') {
			bldSets[key] = obj[0].checked;
		} else if (key.endsWith('fix')){
			var fixs = obj.val().toUpperCase().split(' ');
			var fixMap = {};
			var fixRe = key == 'cfix' ? (/^(UFR|UFL|UBL|UBR|DFR|DFL|DBL|DBR)(\+?)$/) : (/^(UR|UF|UL|UB|DR|DF|DL|DB|FR|FL|BL|BR)(\+?)$/);
			for (var i = 0; i < fixs.length; i++) {
				var m = fixRe.exec(fixs[i]);
				if (m) {
					fixMap[m[1]] = m[2]
				}
			}
			var val = [];
			for (var cubie in fixMap) {
				val.push(cubie + fixMap[cubie]);
			}
			bldSets[key] = val.join(' ');
		} else if (key == 'bldsClr' || key == 'bldsEg') {
			var updates = {
				'cnerrLR': [0, 7],
				'cscycLR': [0, 3],
				'cncodeLR': [0, 10],
				'enerrLR': [0, 11],
				'escycLR': [0, 5],
				'encodeLR': [0, 16]
			}
			if (key == 'bldsClr') {
				updates['cfix'] = "",
				updates['efix'] = "",
				updates['ceparity'] = 0x3
			} else {
				updates['cfix'] = "UBL DFR+",
				updates['efix'] = "DR DF+",
				updates['ceparity'] = 0x1
			}
			for (var k in updates) {
				bldSets[k] = updates[k];
			}
		} else if (key == 'bldsEdge' || key == 'bldsCorn') {
			var val = ~~obj.val();
			var pre = key == 'bldsEdge' ? 'e' : 'c';
			bldSets[pre + 'fix'] = "";
			bldSets[pre + 'scycLR'] = pre == 'e' ? [0, 5] : [0, 3];
			if (val == 1) { // solved
				bldSets[pre + 'buff'] = [bldSets[pre + 'buff'][0], 0x1];
				bldSets[pre + 'nerrLR'] = [0, 0];
				bldSets[pre + 'ncodeLR'] = [0, 0];
			} else if (val == 2) { // any
				bldSets[pre + 'buff'] = [bldSets[pre + 'buff'][0], 0x7];
				bldSets[pre + 'nerrLR'] = pre == 'e' ? [0, 11] : [0, 7];
				bldSets[pre + 'ncodeLR'] = pre == 'e' ? [0, 16] : [0, 10];
			}
		} else if (key == 'scheme') {
			var val = obj.val();
			if (val == 'speffz') {
				bldSets['scheme'] = Speffz;
			} else if (val == 'chichu') {
				bldSets['scheme'] = ChiChu;
			} else if (val == 'custom' || val == 'customed') {
				var ret = prompt('Code for ' + pieces, bldSets['scheme']);
				if (!ret) {
					updateSchemeSelect();
					return;
				}
				if (!/^([^\s]{3} ){8}([^\s]{2} ){11}[^\s]{2}$/i.exec(ret)) {
					alert('Invalid Scheme!');
					updateSchemeSelect();
					return;
				}
				bldSets['scheme'] = ret;
			}
			calcResult();
		} else if (key == 'order') {
			var val = obj.val();
			if (val == 'default') {
				bldSets['order'] = OrdUDE;
			} else if (val == 'custom' || val == 'customed') {
				var ordStr = "";
				var scheme = bldSets['scheme'];
				for (var i = 0; i < 20; i++) {
					var ord = parseInt(bldSets['order'][i], 24);
					ordStr += i < 8
						? scheme[ord % 8 * 4 + ~~(ord / 8)]
						: scheme[32 + ord % 12 * 3 + ~~(ord / 12)];
				}
				var ret = prompt('Code order', ordStr.slice(0, 8) + ' ' + ordStr.slice(8));
				if (!ret) {
					updateSchemeSelect();
					return;
				}
				ret = ret.replace(/\s+/g, "");
				var corders = [];
				var eorders = [];
				var mask = 0;
				for (var i = 0; i < ret.length; i++) {
					var offset = i < 8 ? 0 : 32;
					var idx = scheme.indexOf(ret[i], offset) - offset;
					if (idx < 0) {
						mask = 0;
						break;
					}
					if (i < 8) { // corner
						idx = (idx & 3) * 8 + (idx >> 2);
						corders.push(idx.toString(24));
						mask |= 1 << (idx % 8);
					} else { // edge
						idx = (idx % 3) * 12 + ~~(idx / 3);
						eorders.push(idx.toString(24));
						mask |= 1 << (idx % 12 + 8);
					}
				}
				if (corders.length != 8 || eorders.length != 12 || mask != 0xfffff) {
					alert('Invalid Order!');
					updateSchemeSelect();
					return;
				}
				bldSets['order'] = corders.join("") + eorders.join("");
			}
			calcResult();
		} else if (key == 'scr') {
			kernel.setProp('scrType', 'nocache_333bldspec');
		}
		kernel.setProp('bldSets', JSON.stringify(bldSets));
		genBLDSetTable(bldSets, setDiv);
	}

	var schSel;
	var ordSel;
	var cPreSel;
	var cbufSel;
	var cbufFlt;
	var cFixTxt;
	var cErrTxt;
	var cNScTxt;
	var cNCoTxt;
	var ePreSel;
	var ebufSel;
	var ebufFlt;
	var eFixTxt;
	var eErrTxt;
	var eNScTxt;
	var eNCoTxt;
	var parityFlt;
	var oriFlt;

	function key2Range(bldSets, key) {
		return bldSets[key][0] + '-' + bldSets[key][1];
	};

	function genBLDSetTable(bldSets, setDiv) {
		setDiv.empty();
		updateBufSelect();
		cFixTxt.val(bldSets['cfix']);
		cErrTxt.val(key2Range(bldSets, 'cnerrLR'));
		cNScTxt.val(key2Range(bldSets, 'cscycLR'));
		cNCoTxt.val(key2Range(bldSets, 'cncodeLR'));
		eFixTxt.val(bldSets['efix']);
		eErrTxt.val(key2Range(bldSets, 'enerrLR'));
		eNScTxt.val(key2Range(bldSets, 'escycLR'));
		eNCoTxt.val(key2Range(bldSets, 'encodeLR'));
		cPreSel.val(0);
		ePreSel.val(0);
		cbufSel.val(bldSets['cbuff'][0]);
		ebufSel.val(bldSets['ebuff'][0]);
		cbufFlt.val(bldSets['cbuff'][1]);
		ebufFlt.val(bldSets['ebuff'][1]);
		parityFlt.val(bldSets['ceparity']);
		oriFlt[0].checked = bldSets['ceori'];
		var ret = genBLDRndState(bldSets);
		setDiv.append($('<tr>').append($('<th>Coder</th>'), $('<td colspan=2>').append(schSel, ordSel)));
		setDiv.append($('<tr>').append($('<td colspan=3 style="width:0;">').append(codeDiv)));
		setDiv.append($('<tr>').append($('<td colspan=3 style="height:0.2em;border:none;">')));
		setDiv.append($('<tr>').append('<th colspan=3>Scrambler|<span class="click" id="bldsClr">clr</span>|<span class="click" id="bldsEg">eg.</span></th>'));
		setDiv.append($('<tr>').append($('<td>').append(parityFlt), $('<td>').append(cPreSel), $('<td>').append(ePreSel)));
		setDiv.append($('<tr>').append('<td>buffer</td>', $('<td>').append(cbufSel, cbufFlt), $('<td>').append(ebufSel, ebufFlt)));
		setDiv.append($('<tr>').append('<td>fixed</td>', $('<td>').append(cFixTxt), $('<td>').append(eFixTxt)));
		setDiv.append($('<tr>').append('<td>flip</td>', $('<td>').append(cErrTxt), $('<td>').append(eErrTxt)));
		setDiv.append($('<tr>').append('<td>ex-cyc</td>', $('<td>').append(cNScTxt), $('<td>').append(eNScTxt)));
		setDiv.append($('<tr>').append('<td>#codes</td>', $('<td>').append(cNCoTxt), $('<td>').append(eNCoTxt)));
		var prob = ret[0] / 43252003274489856000;
		setDiv.append($('<tr>').append('<td>probs</td>', $('<td colspan=2>').append(
			(ret[0] == 0 ? 0 : prob < 1e-3 ? prob.toExponential(3) : Math.round(prob * 1000000) / 10000 + '%') +
			(prob < 1e-8 ? ('<br>N=' + (ret[0] > 1e8 ? ret[0].toExponential(3) : ret[0])) : '')
		)));
		setDiv.append($('<tr>').append(
			$('<td>').append($('<label>').append(oriFlt, 'ori')),
			'<td colspan=2><span id="scr">' + SCRGEN_GEN + '</span></td>'
		));
		if (kernel.getProp('scrType') != 'nocache_333bldspec') {
			setDiv.find('#scr').addClass('click');
		}
		setDiv.find('input,select').css({'padding':0}).unbind('change').change(procBLDSetEvent);
		setDiv.find('span.click').unbind('click').click(procBLDSetEvent);
		setDiv.find('td,th').css({'padding':0});
		updateSchemeSelect();
		return setDiv;
	}

	function updateSchemeSelect() {
		var scheme = bldSets['scheme'];
		if (scheme == Speffz) {
			schSel.val('speffz');
		} else if (scheme == ChiChu) {
			schSel.val('chichu');
		} else {
			schSel.val('customed');
		}
		var order = bldSets['order'];
		if (order == OrdUDE) {
			ordSel.val('default');
		} else {
			ordSel.val('customed');
		}
	}

	function updateBufSelect() {
		cbufSel.empty();
		ebufSel.empty();
		var scheme = bldSets['scheme'];
		for (var i = 0; i < 24; i++) {
			var ori = ~~(i / 8);
			var perm = i % 8;
			var cur = pieces.slice(perm * 4, perm * 4 + 3);
			cur = cur.slice(ori) + cur.slice(0, ori) + ' [' + scheme.charAt(perm * 4 + ori) + ']';
			cbufSel.append('<option value="' + i + '">' + cur + '</option>');
		}
		for (var i = 0; i < 24; i++) {
			var ori = ~~(i / 12);
			var perm = i % 12;
			var cur = pieces.slice(32 + perm * 3, 32 + perm * 3 + 2);
			cur = cur.slice(ori) + cur.slice(0, ori) + ' [' + scheme.charAt(32 + perm * 3 + ori) + ']';
			ebufSel.append('<option value="' + i + '">' + cur + '</option>');
		}
	}

	var codeDiv = $('<div style="text-align:left;">');
	var setDiv = $('<table style="border-spacing:0; border:none;" class="table">');

	function calcResult() {
		var scramble = tools.getCurScramble();
		var state = cubeutil.getScrambledState(scramble);
		var codes = getBLDcode(state, bldSets['scheme'], bldSets['cbuff'][0], bldSets['ebuff'][0], bldSets['order']);
		codeDiv.html('C: ' + codes[0].join('') + '<br>' + 'E: ' + codes[1].join(''));
		if (DEBUG) {
			var regen = checkBLDcode(
				[codes[0].join('').replace(/\s/g, ''), codes[1].join('').replace(/\s/g, '')],
				bldSets['scheme'], bldSets['cbuff'][0], bldSets['ebuff'][0]);
			if (regen.replace(/\s/g, '') != scramble[1].replace(/\s/g, '')) {
				console.log('[bldhelper] bld code check error', regen);
			}
		}
	}

	function execFunc(fdiv) {
		if (!fdiv) {
			return;
		}
		if (!tools.isPuzzle('333')) {
			fdiv.html(IMAGE_UNAVAILABLE);
			return;
		}
		fdiv.empty().append(setDiv);
		genBLDSetTable(bldSets, setDiv);
		calcResult();
	}

	$(function() {
		var inputNumTpl = $.format.bind(null, '<input id="{0}" type="text" style="width:4em" value="" pattern="\d{1,2}-\d{1,2}">');
		var optTpl = $.format.bind(null, '<option value="{1}">{0}</option>');
		var savedSets = JSON.parse(kernel.getProp('bldSets', '{}'));
		for (var key in bldSets) {
			if (key in savedSets) {
				bldSets[key] = savedSets[key];
			}
		}
		var schemes = [['Customed', 'customed'], ['Speffz', 'speffz'], ['ChiChu', 'chichu'], ['Custom', 'custom']];
		schSel = $('<select id="scheme" style="max-width:4em">');
		schSel.append(schemes.map(optTpl).join(''));
		var orders = [['Customed', 'customed'], ['U>D>E', 'default'], ['Custom', 'custom']];
		ordSel = $('<select id="order" style="max-width:4em">');
		ordSel.append(orders.map(optTpl).join(''));
		cPreSel = $('<select id="bldsCorn">');
		cbufSel = $('<select data="bufcorn" id="cbuff0" style="width:2em">');
		cbufFlt = $('<select id="cbuff1" style="width:2em">');
		cFixTxt = $('<input id="cfix" type="text" style="width:4em" value="" pattern="[URFDLBurfdlb +]*">');
		cErrTxt = $(inputNumTpl(["cnerrLR"]));
		cNScTxt = $(inputNumTpl(["cscycLR"]));
		cNCoTxt = $(inputNumTpl(["cncodeLR"]));
		ePreSel = $('<select id="bldsEdge">');
		ebufSel = $('<select data="bufedge" id="ebuff0" style="width:2em">');
		ebufFlt = $('<select id="ebuff1" style="width:2em">');
		eFixTxt = $('<input id="efix" type="text" style="width:4em" value="" pattern="[URFDLBurfdlb +]*">');
		eErrTxt = $(inputNumTpl(["enerrLR"]));
		eNScTxt = $(inputNumTpl(["escycLR"]));
		eNCoTxt = $(inputNumTpl(["encodeLR"]));
		parityFlt = $('<select id="ceparity">');
		oriFlt = $('<input type="checkbox" id="ceori">');
		var bflts = [['any', 0x7], ['ok', 0x1], ['flip', 0x2], ['move', 0x4], ['not ok', 0x6], ['ok/flip', 0x3], ['ok/move', 0x5]];
		var bfltOps = bflts.map(optTpl).join('');
		cbufFlt.append(bfltOps);
		ebufFlt.append(bfltOps);
		var pflts = [['parity', 0x3], ['even', 0x1], ['odd', 0x2]];
		parityFlt.append(pflts.map(optTpl).join(''));
		var pres = [['$', 0], ['solved', 1], ['any', 2]];
		for (var i = 0; i < pres.length; i++) {
			cPreSel.append('<option value="' + pres[i][1] + '">' + pres[i][0].replace('$', 'Corner') + '</option>');
			ePreSel.append('<option value="' + pres[i][1] + '">' + pres[i][0].replace('$', 'Edge') + '</option>');
		}
		tools.regTool('bldhelper', TOOLS_BLDHELPER, execFunc);
	});
});
