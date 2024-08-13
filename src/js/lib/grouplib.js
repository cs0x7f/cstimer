"use strict";

var grouplib = (function(rn) {

	function permMult(permA, permB) { // different from cube mult
		var ret = [];
		for (var i = 0; i < permA.length; i++) {
			ret[i] = permB[permA[i]];
		}
		return ret;
	}

	function permInv(perm) {
		var ret = [];
		for (var i = 0; i < perm.length; i++) {
			ret[perm[i]] = i;
		}
		return ret;
	}

	function permCmp(perm1, perm2) {
		if (perm1.length != perm2.length) {
			return perm1.length - perm2.length;
		}
		for (var i = perm1.length - 1; i >= 0; i--) {
			if (perm1[i] != perm2[i]) {
				return perm1[i] - perm2[i];
			}
		}
		return 0;
	}

	function SchreierSims(gen, shuffle) {
		if (gen.sgs) {
			this.copy(gen);
			return;
		}
		this.sgs = [];
		this.sgsi = [];
		this.t2i = [];
		this.i2t = [];
		this.keyIdx = [];
		this.Tk = [];
		this.e = [];
		var n = gen[0].length;
		for (var i = 0; i < n; i++) {
			this.e[i] = i;
		}
		for (var i = 0; i < n; i++) {
			this.sgs.push([]);
			this.sgsi.push([]);
			this.t2i.push([]);
			this.i2t.push([i]);
			this.Tk.push([]);
			this.sgs[i][i] = this.e;
			this.sgsi[i][i] = this.e;
			this.t2i[i][i] = 0;
		}
		this.extend(gen, shuffle);
	}

	SchreierSims.prototype.extend = function(gen, shuffle) {
		for (var i = 0; i < gen.length; i++) {
			var g = gen[i];
			if (shuffle) {
				g = permMult(permMult(permInv(shuffle), g), shuffle);
			}
			if (this.isMember(g) < 0) {
				this.knutha(this.e.length - 1, g);
			}
		}
	}

	SchreierSims.prototype.copy = function(obj) {
		this.sgs = [];
		this.sgsi = [];
		this.t2i = [];
		this.i2t = [];
		this.keyIdx = obj.keyIdx.slice();
		this.Tk = [];
		this.e = obj.e;
		var n = this.e.length;
		for (var i = 0; i < n; i++) {
			this.sgs[i] = obj.sgs[i].slice();
			this.sgsi[i] = obj.sgsi[i].slice();
			this.t2i[i] = obj.t2i[i].slice();
			this.i2t[i] = obj.i2t[i].slice();
			this.Tk[i] = obj.Tk[i].slice();
		}
	}

	SchreierSims.prototype.toKeyIdx = function(perm) {
		var ret = [];
		perm = perm || this.e;
		for (var i = 0; i < this.keyIdx.length; i++) {
			ret[i] = perm[this.keyIdx[i]];
		}
		return ret;
	}

	SchreierSims.prototype.isMember = function(p, depth) {
		depth = depth || 0;
		var idx = 0;
		var ps = [];
		for (var i = p.length - 1; i >= depth; i--) {
			var j = p[i];
			for (var k = 0; k < ps.length; k++) {
				j = ps[k][j];
			}
			if (j !== i) {
				if (!this.sgs[i][j]) {
					return -1;
				}
				ps.push(this.sgsi[i][j]);
			}
			idx = idx * this.i2t[i].length + this.t2i[i][j];
		}
		return idx;
	}

	SchreierSims.prototype.isSubgroupMemberByKey = function(permKey, sgsH) {
		var idx = 0;
		var ps = [];
		for (var ii = 0; ii < this.keyIdx.length; ii++) {
			var i = this.keyIdx[ii];
			var j = permKey[ii];
			for (var k = 0; k < ps.length; k++) {
				j = ps[k][j];
			}
			if (j !== i) {
				if (!sgsH.sgs[i][j]) {
					return -1;
				}
				ps.push(sgsH.sgsi[i][j]);
			}
			idx = idx * sgsH.i2t[i].length + sgsH.t2i[i][j];
		}
		return idx;
	}

	SchreierSims.prototype.knutha = function(k, p) {
		this.Tk[k].push(p);
		for (var i = 0; i < this.sgs[k].length; i++) {
			if (this.sgs[k][i]) {
				this.knuthb(k, permMult(this.sgs[k][i], p));
			}
		}
	}

	SchreierSims.prototype.knuthb = function(k, p) {
		var j = p[k];
		if (!this.sgs[k][j]) {
			this.sgs[k][j] = p;
			this.sgsi[k][j] = permInv(p);
			this.t2i[k][j] = this.i2t[k].length;
			this.i2t[k].push(j);
			if (this.i2t[k].length == 2) {
				this.keyIdx.push(k);
				this.keyIdx.sort(function(a, b) { return b - a; });
			}
			for (var i = 0; i < this.Tk[k].length; i++) {
				this.knuthb(k, permMult(p, this.Tk[k][i]));
			}
			return;
		}
		var p2 = permMult(p, this.sgsi[k][j]);
		if (this.isMember(p2) < 0) {
			this.knutha(k - 1, p2);
		}
	}

	SchreierSims.prototype.size = function(accuracy) {
		var n = this.sgs.length;
		var size = accuracy ? BigInt(1) : 1;
		for (var j = 0; j < n; j++) {
			size *= accuracy ? BigInt(this.i2t[j].length) : this.i2t[j].length;
		}
		return size;
	}

	SchreierSims.prototype.minElem = function(p, depth) {
		p = permInv(p);
		for (var ii = 0; ii < this.keyIdx.length; ii++) {
			var i = this.keyIdx[ii];
			var maxi = p[i];
			var j = i;
			for (var k = 1; k < this.i2t[i].length; k++) {
				var m = this.i2t[i][k];
				if (p[m] > maxi) {
					maxi = p[m];
					j = m;
				}
			}
			if (j !== i) {
				p = permMult(this.sgs[i][j], p);
			}
		}
		return permInv(p);
	}

	/*
	// to enumerate perm[depth]
	// checkFunction(depth + 1, perm): perm[depth + 1] is set
	// callback(perm), return true if break
	SchreierSims.prototype.backtrack = function(depth, perm, callback, checkFunc) {
		while (depth >= 1 && this.i2t[depth].length == 1) { // skip redaudant base
			depth--;
		}
		if (!checkFunc(depth + 1, perm)) {
			return;
		}
		if (depth == 0) {
			return callback(perm);
		}
		for (var jj = 0; jj < this.i2t[depth].length; jj++) {
			var j = this.i2t[depth][jj];
			var ret = this.backtrack(depth - 1,
				permMult(this.sgs[depth][j], perm), callback, checkFunc);
			if (ret) {
				return ret;
			}
		}
	}
	*/

	// list all coset representative of subH in G, algorithm in Handbook of Computational Group Theory, pp128
	SchreierSims.prototype.listCoset = function(subH) {
		var cosetReps = [this.e.slice()];
		var targetSize = 1;
		out: for (var ii = this.keyIdx.length - 1; ii >= 0; ii--) {
			var i = this.keyIdx[ii];
			if (this.i2t[i].length == subH.i2t[i].length) { // no new coset
				continue;
			}
			targetSize *= this.i2t[i].length;
			targetSize /= subH.i2t[i].length;
			for (var ci = 0, len = cosetReps.length; ci < len; ci++) {
				var coset = cosetReps[ci];
				expand: for (var jj = 1; jj < this.i2t[i].length; jj++) {
					var j = this.i2t[i][jj];
					var newCoset = permMult(coset, this.sgs[i][j]);
					for (var ss = 1; ss < subH.i2t[i].length; ss++) {
						if (newCoset[subH.i2t[i][ss]] > j) {
							continue expand;
						}
					}
					cosetReps.push(newCoset);
					if (cosetReps.length >= targetSize) {
						continue out;
					}
				}
			}
			console.log('[grouplib] listCoset ERROR, Not enough coset representatives');
		}
		return cosetReps;
	}

	SchreierSims.prototype.rndElem = function() {
		var perm = this.e.slice();
		for (var i = this.e.length - 1; i >= 0; i--) {
			var cnt = 0;
			var p = 0;
			for (var j = 0; j <= i; j++) {
				if (!this.sgs[i][j]) {
					continue;
				}
				if (rn(++cnt) < 1) {
					p = j;
				}
			}
			if (p !== i) {
				perm = permMult(perm, this.sgsi[i][p]);
			}
		}
		return perm;
	}

	function CanonSeqGen(gens) {
		this.gens = gens;
		this.glen = gens.length;
		this.trieNodes = [null];
		this.trieNodes.push([]);
		this.skipSeqs = [];
	}

	CanonSeqGen.prototype.addSkipSeq = function(seq) {
		this.skipSeqs.push(seq.slice());
		var node = 1;
		for (var i = 0; i < seq.length; i++) {
			var next = ~~this.trieNodes[node][seq[i]];
			if (next == -1) {
				return;
			}
			if (i == seq.length - 1) {
				this.trieNodes[node][seq[i]] = -1;
				break;
			}
			if (next <= 0) { // empty node, create a new node
				next = this.trieNodes.length;
				this.trieNodes.push([]);
				this.trieNodes[node][seq[i]] = next;
				for (var m = 0; m < this.glen; m++) {
					this.updateNext(seq.slice(0, i + 1).concat(m));
				}
			}
			node = next;
		}
	}

	CanonSeqGen.prototype.traversalTrie = function(node, seq, callback) {
		if (node <= 0) {
			return;
		}
		for (var i = 0; i < this.glen; i++) {
			seq.push(i);
			this.traversalTrie(~~this.trieNodes[node][i], seq, callback)
			seq.pop();
		}
		callback(node, seq);
	}

	CanonSeqGen.prototype.updateNext = function(seq) {
		var node = 1;
		for (var i = 0; i < seq.length; i++) {
			var next = ~~this.trieNodes[node][seq[i]];
			if (next == 0) {
				next = this.updateNext(seq.slice(1, i + 1));
				next = next > 0 ? ~next : next;
				this.trieNodes[node][seq[i]] = next;
			}
			if (next == -1) {
				return -1;
			} else if (next < 0) {
				next = ~next;
			}
			node = next;
		}
		return node;
	}

	CanonSeqGen.prototype.refillNext = function() {
		// clear next nodes
		this.traversalTrie(1, [], (node, seq) => {
			for (var i = 0; i < this.glen; i++) {
				var next = ~~this.trieNodes[node][i];
				if (next != -1 && next <= node) { // skip or to sub-trie
					this.trieNodes[node][i] = 0;
				}
			}
		});
		// calculate next nodes
		this.traversalTrie(1, [], (node, seq) => {
			for (var i = 0; i < this.glen; i++) {
				if ((i & 0x1f) == 0) {
					this.trieNodes[node][this.glen + (i >> 5)] = 0;
				}
				var next = ~~this.trieNodes[node][i];
				if (next != -1 && next <= node) { // skip or to sub-trie
					this.updateNext(seq.concat(i));
				}
				if (~~this.trieNodes[node][i] == -1) {
					this.trieNodes[node][this.glen + (i >> 5)] |= 1 << (i & 0x1f);
				}
			}
		});
	}

	CanonSeqGen.prototype.countSeq = function(depth, accuracy) {
		var ZERO = accuracy ? BigInt(0) : 0;
		var counts = accuracy ? [BigInt(0), BigInt(1)] : [0, 1];
		var ret = accuracy ? [BigInt(0), BigInt(1)] : [1];
		for (var d = 0; d < depth; d++) {
			var newCounts = [];
			var depthCnt = ZERO;
			for (var node = 1; node < this.trieNodes.length; node++) {
				var curCount = counts[node] || ZERO;
				if (curCount == 0) {
					continue;
				}
				for (var i = 0; i < this.glen; i++) {
					var next = ~~this.trieNodes[node][i];
					if (next != -1) {
						next = next < 0 ? ~next : next;
						newCounts[next] = (newCounts[next] || ZERO) + curCount;
						depthCnt += curCount;
					}
				}
			}
			counts = newCounts;
			ret.push(depthCnt);
		}
		return ret;
	}

	CanonSeqGen.prototype.countSeqMove = function(depth, moveTable, initState) {
		var counts = [];
		counts[initState * this.trieNodes.length + 1 - 1] = 1;
		var ret = [];
		for (var d = 0; d < depth; d++) {
			var newCounts = [];
			var depthCnts = [];
			var depthCnt = 0;
			for (var state = 0; state < moveTable[0].length; state++) {
				for (var node = 1; node < this.trieNodes.length; node++) {
					var curCount = counts[state * this.trieNodes.length + node - 1] || 0;
					if (curCount == 0) {
						continue;
					}
					for (var i = 0; i < this.glen; i++) {
						var next = ~~this.trieNodes[node][i];
						if (next != -1) {
							next = next < 0 ? ~next : next;
							var newState = moveTable[i][state];
							var idx = newState * this.trieNodes.length + next - 1;
							newCounts[idx] = (newCounts[idx] || 0) + curCount;
							depthCnts[newState] = (depthCnts[newState] || 0) + curCount;
							depthCnt += curCount;
						}
					}
				}
			}
			counts = newCounts;
			ret.push(depthCnts, depthCnt);
		}
		return ret;
	}

	CanonSeqGen.prototype.initTrie = function(depth) {
		this.trieNodes = [null];
		this.trieNodes.push([]);
		this.refillNext();
		var e = [];
		for (var i = 0; i < this.gens[0].length; i++) {
			e[i] = i;
		}
		var visited = new Map();
		for (var seqlen = 0; seqlen <= depth; seqlen++) {
			this.searchSkip(e, seqlen, [], 1, visited);
			this.refillNext();
		}
	}

	CanonSeqGen.prototype.searchSkip = function(perm, maxl, seq, node, visited) {
		if (maxl == 0) {
			var key = String.fromCharCode.apply(null, perm);
			if (visited.has(key)) {
				// console.log('find skip seq', seq, 'replaced by', visited.get(key));
				this.addSkipSeq(seq);
			} else {
				visited.set(key, seq.slice());
			}
			return;
		}
		for (var i = 0; i < this.glen; i++) {
			var next = this.trieNodes[node][i];
			if (next == -1) {
				continue;
			} else if (next < 0) {
				next = ~next;
			}
			var gen = this.gens[i];
			var permNew = permMult(gen, perm);
			seq.push(i);
			this.searchSkip(permNew, maxl - 1, seq, next, visited);
			seq.pop();
		}
	}

	/*
	CanonSeqGen.prototype.finalize = function() {
		var diff = [];
		for (var i = 1; i < this.trieNodes.length; i++) {
			diff[i] = [];
		}
		var changed = true;
		while (changed) {
			changed = false;
			for (var node1 = 1; node1 < this.trieNodes.length; node1++) {
				for (var node2 = 1; node2 < node1; node2++) {
					if (diff[node1][node2]) {
						continue;
					}
					for (var i = 0; i < this.glen; i++) {
						var next1 = ~~this.trieNodes[node1][i];
						var next2 = ~~this.trieNodes[node2][i];
						if (next1 == -1 && next2 == -1) {
							continue;
						}
						if ((next1 == -1) != (next2 == -1)) {
							diff[node1][node2] = true;
							changed = true;
							break;
						}
						next1 ^= next1 >> 31;
						next2 ^= next2 >> 31;
						if (next1 != next2 && diff[Math.max(next1, next2)][Math.min(next1, next2)]) {
							diff[node1][node2] = true;
							changed = true;
							break;
						}
					}
				}
			}
		}
		var nodeMap = [0];
		var idx = 1;
		for (var i = 1; i < this.trieNodes.length; i++) {
			nodeMap[i] = i;
			for (var j = 1; j < i; j++) {
				if (!diff[i][j]) {
					nodeMap[i] = nodeMap[j];
				}
			}
			if (nodeMap[i] == i) {
				nodeMap[i] = idx;
				idx++;
			}
		}
		for (var node = 1; node < this.trieNodes.length; node++) {
			for (var i = 0; i < this.glen; i++) {
				var next = ~~this.trieNodes[node][i];
				var old = next ^ (next >> 31);
				this.trieNodes[node][i] = nodeMap[old] ^ (next >> 31);
			}
		}
		for (var i = 1; i < this.trieNodes.length; i++) {
			this.trieNodes[nodeMap[i]] = this.trieNodes[i];
		}
		while (this.trieNodes.length > idx) {
			this.trieNodes.pop();
		}
		console.log(diff, nodeMap, idx);
	}
	*/

	function SubgroupSolver(genG, genH, genM) {
		//assert <genH>  <=  <genM>  <=  <genG>
		this.genG = genG;
		this.genH = genH;
		this.genM = genM;
		if (!genH) {
			var e = [];
			for (var i = 0; i < genG[0].length; i++) {
				e[i] = i;
			}
			this.genH = [e];
		}
	}

	SubgroupSolver.prototype.permHash = function(perm) {
		return String.fromCharCode.apply(null, perm);
	}

	SubgroupSolver.prototype.midCosetHash = function(perm) {
		return this.sgsM == null ? this.sgsG.isMember(permInv(perm), this.sgsMdepth) : this.permHash(this.sgsM.minElem(perm));
	}

	SubgroupSolver.prototype.initTables = function(maxCosetSize) {
		if (this.coset2idx) {
			return;
		}
		maxCosetSize = maxCosetSize || 100000;

		this.sgsH = new SchreierSims(this.genH);
		this.sgsG = new SchreierSims(this.sgsH);
		this.sgsG.extend(this.genG);
		var cosetSize = this.sgsG.size() / this.sgsH.size();
		this.isCosetSearch = this.sgsH.size() > 1;

		var midCosetSize = 1;
		if (this.genM) {
			this.sgsM = new SchreierSims(this.genM);
			midCosetSize = this.sgsG.size() / this.sgsM.size();
		} else if (this.sgsH.size() == 1) {
			this.sgsM = null;
			this.sgsMdepth = 0;
			for (var i = this.sgsG.e.length - 1; i >= 0; i--) {
				if (midCosetSize * this.sgsG.i2t[i].length > maxCosetSize) {
					break;
				}
				this.sgsMdepth = i;
				midCosetSize *= this.sgsG.i2t[i].length;
			}
		} else if (cosetSize <= maxCosetSize) { // subgroup <H>
			this.sgsM = new SchreierSims(this.genH);
			midCosetSize = cosetSize;
		} else { // trivial subgroup <G>
			this.sgsM = null;
			this.sgsMdepth = this.sgsG.e.length;
		}
		this.clen = midCosetSize;
		DEBUG && console.log('[Subgroup Solver] coset space:', cosetSize, 'mid coset size:', midCosetSize);

		this.genEx = [];
		this.genExi = [];
		this.genExMap = [];
		var genExSet = new Map();
		genExSet.set(this.permHash(this.sgsG.e), -1);
		for (var i = 0; i < this.genG.length; i++) {
			var perm = this.genG[i];
			var pow = 1;
			while (true) {
				var key = this.permHash(perm);
				if (genExSet.has(key)) {
					break;
				}
				genExSet.set(key, this.genEx.length);
				this.genEx.push(perm);
				this.genExi.push(permInv(perm));
				this.genExMap.push([i, pow]);
				perm = permMult(this.genG[i], perm);
				pow++;
			}
		}
		this.glen = this.genEx.length;
		for (var i = 0; i < this.glen; i++) {
			var genInv = permInv(this.genEx[i]);
			this.genExMap[i][2] = genExSet.get(this.permHash(genInv));
		}

		this.canon = new CanonSeqGen(this.genEx);
		this.canon.initTrie(2);
		this.canoni = new CanonSeqGen(this.genEx);
		for (var i = 0; i < this.canon.skipSeqs.length; i++) {
			var seq = this.canon.skipSeqs[i].slice();
			seq.reverse();
			for (var j = 0; j < seq.length; j++) {
				seq[j] = this.genExMap[seq[j]][2];
			}
			this.canoni.addSkipSeq(seq);
		}
		this.canoni.refillNext();

		// move table, {coset <=> representative} for G/M
		this.moveTable = [];
		this.idx2coset = [this.sgsG.e];
		this.coset2idx = {};
		this.coset2idx[this.midCosetHash(this.sgsG.e)] = 0;
		var sumPrun = 0;
		for (var i = 0; i < this.idx2coset.length; i++) {
			if (i >= midCosetSize) {
				console.log('ERROR!');
				break;
			}
			var perm = this.idx2coset[i];
			for (var j = 0; j < this.glen; j++) {
				if (this.genExMap[j][1] != 1) {
					continue;
				}
				var newp = permMult(this.genEx[j], perm);
				var key = this.midCosetHash(newp);
				if (!(key in this.coset2idx)) {
					this.coset2idx[key] = this.idx2coset.length;
					this.idx2coset.push(newp);
				}
				this.moveTable[i * this.glen + j] = this.coset2idx[key];
			}
		}
		var stdMove = null;
		for (var j = 0; j < this.glen; j++) {
			if (this.genExMap[j][1] == 1) {
				stdMove = j;
				continue;
			}
			for (var i = 0; i < this.clen; i++) {
				this.moveTable[i * this.glen + j] = this.moveTable[this.moveTable[i * this.glen + j - 1] * this.glen + stdMove];
			}
		}
		this.prunTable = this.initPrunTable(this.sgsG.e);
		DEBUG && console.log('[Subgroup Solver] prun table size:', this.prunTable[0].length);
	}

	SubgroupSolver.prototype.idaMidSearch = function(pidx, maxl, lm, trieNodes, moves, curPerm, insertPerm, prunTable, callback) {
		var nodePrun = prunTable[0][pidx];
		if (nodePrun > maxl) {
			return false;
		}
		if (maxl == 0) {
			if (pidx >= this.clen) {
				moves.push(-1);
				var newPerm = permMult(curPerm, insertPerm);
				var ret = callback(moves, newPerm);
				moves.pop();
				return ret;
			}
			return callback(moves, curPerm);
		}

		if (pidx >= this.clen && lm != 0) {
			var newpidx = prunTable[3][pidx - this.clen];
			moves.push(-1);
			var newPerm = permMult(curPerm, insertPerm);
			var ret = this.idaMidSearch(newpidx, maxl, 1, trieNodes, moves, newPerm, insertPerm, prunTable, callback);
			moves.pop();
			if (ret) {
				return ret;
			}
		}

		var node = trieNodes[lm || 1];
		var glenBase = pidx * ((this.glen + 31) >> 5);

		for (var mbase = 0; mbase < this.glen; mbase += 32) {
			var mask = node[this.glen + (mbase >> 5)];
			mask |= (nodePrun >= maxl - 1) ? prunTable[nodePrun - maxl + 2][glenBase + (mbase >> 5)] : 0;
			mask = ~mask & (this.glen - mbase >= 32 ? -1 : ((1 << this.glen - mbase) - 1));
			while (mask != 0) {
				var midx = 31 - Math.clz32(mask);
				mask -= 1 << midx;
				midx += mbase;

				var cidx = pidx % this.clen;
				var newpidx = this.moveTable[cidx * this.glen + midx] + pidx - cidx;
				if (DEBUG && prunTable[0][newpidx] >= maxl) {
					debugger;
				}
				var nextCanon = node[midx];
				moves.push(midx);
				var newPerm = permMult(curPerm, this.genExi[midx]);
				var ret = this.idaMidSearch(newpidx, maxl - 1, nextCanon ^ (nextCanon >> 31), trieNodes, moves, newPerm, insertPerm, prunTable, callback);
				moves.pop();
				if (ret) {
					return ret;
				}
			}
		}
		return false;
	}

	SubgroupSolver.prototype.initPrunTable = function(perm, tryNISS) {
		var pidx = this.coset2idx[this.midCosetHash(perm)];
		var prunTable = [];
		var fartherMask = [];
		var nocloserMask = [];
		var maskBase = (this.glen + 31) >> 5;
		for (var i = 0; i < this.clen; i++) {
			prunTable[i] = -1;
		}
		var permMove = [];
		if (tryNISS) {
			for (var i = 0; i < this.clen; i++) {
				prunTable.push(-1, -1);
				permMove[i] = this.coset2idx[this.midCosetHash(permMult(perm, this.idx2coset[i]))];
				permMove[permMove[i] + this.clen] = i;
			}
			prunTable[0] = 0;
		} else {
			prunTable[pidx] = 0;
		}
		var fill = 1;
		var lastfill = 0;
		var curDepth = 0;
		while (fill != lastfill) {
			lastfill = fill;
			for (var idx = 0; idx < prunTable.length; idx++) {
				if (prunTable[idx] != curDepth) {
					continue;
				}
				var cidx = idx % this.clen;
				var midx = idx - cidx; // 0 - normal, 1 - after perm inserted, 2 - after permi inserted
				for (var m = 0; m < this.glen; m++) {
					var newIdx = this.moveTable[cidx * this.glen + m] + midx;
					var newPrun = prunTable[newIdx];
					if (prunTable[newIdx] == -1) {
						prunTable[newIdx] = curDepth + 1;
						newPrun = curDepth + 1;
						fill++;
					}
					if (newPrun > curDepth) {
						fartherMask[idx * maskBase + (m >> 5)] |= 1 << (m & 0x1f);
					}
					if (newPrun >= curDepth) {
						nocloserMask[idx * maskBase + (m >> 5)] |= 1 << (m & 0x1f);
					}
				}
				if (!tryNISS || midx != 0) {
					continue;
				}
				// insert perm/permi
				for (var m = 0; m < 2; m++) {
					var newIdx = permMove[cidx + (1 - m) * this.clen] + (m + 1) * this.clen;
					if (prunTable[newIdx] == -1) {
						prunTable[newIdx] = curDepth;
						fill++;
					}
				}
			}
			curDepth++;
		}
		return [prunTable, fartherMask, nocloserMask, permMove, curDepth];
	}

	// 0 - normal, 1 - solved, 2 - unsolvable
	SubgroupSolver.prototype.checkPerm = function(perm) {
		this.initTables();
		if (this.sgsH.isMember(perm) >= 0) {
			return 1;
		} else if (this.sgsG.isMember(perm) < 0) {
			return 2;
		} else {
			return 0;
		}
	}

	SubgroupSolver.ONLY_IDA = 0x1;
	SubgroupSolver.ALLOW_PRE = 0x2;

	SubgroupSolver.prototype.DissectionSolve = function(perm, minl, maxl, permCtx, solCallback) {
		permCtx = permCtx || {};
		var tt = $.now();
		this.initTables();
		DEBUG && console.log('[Subgroup Solver] finished init tables, tt=', $.now() - tt);
		if (this.sgsG.isMember(perm) < 0) {
			console.log('[Subgroup Solver] NOT A MEMBER OF G');
			return;
		}
		var pidx = this.coset2idx[this.midCosetHash(perm)];
		if (!pidx && pidx !== 0) {
			console.log('[Subgroup Solver] ERROR!');
			return;
		}
		var onlyIDA = (permCtx.mask & SubgroupSolver.ONLY_IDA) != 0;
		var tryNISS = (permCtx.mask & SubgroupSolver.ALLOW_PRE) != 0 && this.isCosetSearch;
		var ret = null;
		var prunTable1 = this.prunTable;
		var prunTable2 = null;
		if (tryNISS) {
			permCtx.prunTable = permCtx.prunTable || this.initPrunTable(perm, tryNISS);
			prunTable2 = permCtx.prunTable;
			prunTable1 = prunTable2;
			pidx = this.clen;
		}
		DEBUG && console.log('[Subgroup Solver] finish init searching, prun value:', prunTable1[0][pidx], 'tt=', $.now() - tt);
		for (var depth = Math.max(minl, prunTable1[0][pidx]); depth <= maxl; depth++) {
			var s1tot = 0;
			var s2tot = 0;
			var permi = permInv(perm);
			if (onlyIDA || depth <= this.prunTable[4]) {
				ret = this.idaMidSearch(tryNISS ? this.clen : pidx, depth,
						1, this.canon.trieNodes, [],
						this.sgsG.toKeyIdx(tryNISS ? null : permi), permi, prunTable1,
						(moves, permKey) => {
					s1tot++;
					if (this.sgsG.isSubgroupMemberByKey(permKey, this.sgsH) < 0) {
						return;
					}
					var solution = [];
					for (var i = 0; i < moves.length; i++) {
						solution.push(moves[i] == -1 ? -1 : this.genExMap[moves[i]].slice(0, 2));
					}
					return solCallback ? solCallback(solution) : solution;
				});
				DEBUG && console.log('[Subgroup Solver] ida ', s1tot + s2tot, 'node(s) checked at', depth, 'tt=', $.now() - tt);
				if (ret) {
					return ret;
				}
				continue;
			}
			var mid = ~~(depth / 2);
			if (!prunTable2) {
				prunTable2 = this.initPrunTable(perm, tryNISS);
			}
			var preSize = tryNISS ? 2 : 1;
			var mpcnt = 0;
			var mpsizes = [];
			for (var mpidx = 0; mpidx < this.clen * preSize; mpidx++) {
				//pidx at mid == mpidx
				var mpidx1 = mpidx;
				var mpidx2 = mpidx + (tryNISS ? (mpidx >= this.clen ? -this.clen : this.clen * 2) : 0);
				if (prunTable1[0][mpidx1] > mid || prunTable2[0][mpidx2] > depth - mid) {
					continue;
				}
				mpcnt++;

				// search from mpidx to 0
				var visited = new Map();
				var size1 = 0;
				var size2 = 0;
				var perm0 = this.isCosetSearch ? this.sgsG.e : this.sgsG.toKeyIdx();
				this.idaMidSearch(mpidx1, mid,
						0, this.canon.trieNodes, [],
						perm0, permi, prunTable1,
						(moves, permKey) => {
					var key;
					if (this.isCosetSearch) {
						var permRep = this.sgsH.minElem(permKey);
						key = this.permHash(permRep);
					} else {
						key = this.permHash(permKey);
					}
					size1++;
					var sols1h = visited.get(key) || [];
					sols1h.push(moves.slice());
					visited.set(key, sols1h);
				});

				//search from mpidx to pidx
				ret = this.idaMidSearch(mpidx2, depth - mid,
						1, this.canoni.trieNodes, [],
						perm0, perm, prunTable2,
						(moves, permKey) => {
					// mp * move2 = perm, mp * move1 = I  =>  perm * move2' * move1 = I  =>  move1 = move2 * perm'
					var finalPermKey = tryNISS ? permKey : permMult(permKey, perm);
					var key;
					if (this.isCosetSearch) {
						var permRep = this.sgsH.minElem(finalPermKey);
						key = this.permHash(permRep);
					} else {
						key = this.permHash(finalPermKey);
					}

					size2++;
					if (visited.has(key)) {
						var sols2h = [];
						var node = 1;
						for (var i = 0; i < moves.length; i++) {
							var move = moves[moves.length - 1 - i];
							move = move == -1 ? -1 : this.genExMap[move][2];
							node = move == -1 ? 1 : this.canon.trieNodes[node][move];
							if (DEBUG && node == -1) {
								debugger;
							}
							node ^= node >> 31;
							sols2h.push(move == -1 ? -1 : this.genExMap[move].slice(0, 2));
						}
						var sols1h = visited.get(key);
						for (var i = 0; i < sols1h.length; i++) {
							var solution = sols2h.slice();
							var node2 = node;
							for (var j = 0; j < sols1h[i].length; j++) {
								var move = sols1h[i][j];
								node2 = move == -1 ? 1 : this.canon.trieNodes[node2][move];
								if (node2 == -1) {
									break;
								}
								node2 ^= node2 >> 31;
								solution.push(move == -1 ? -1 : this.genExMap[move].slice(0, 2));
							}
							if (node2 == -1) {
								continue;
							}
							var chk = solCallback ? solCallback(solution) : solution;
							if (chk) {
								return chk;
							}
						}
					}
				});
				mpsizes.push([mpidx, size1, size2]);
				s1tot += size1;
				s2tot += size2;
				if (ret) {
					break;
				}
			}
			DEBUG && console.log('[Subgroup Solver] dis ', s1tot + s2tot, 'node(s) checked at', depth, 'tt=', $.now() - tt);
			if (ret) {
				break;
			}
		}
		return ret;
	}

	SubgroupSolver.prototype.godsAlgo = function(depth) {
		this.initTables();
		var stateCnt = 0;
		for (var i = 0; i < this.clen; i++) {
			var perm = this.idx2coset[i];
			var visited = new Set();
			for (var maxl = 0; maxl <= depth; maxl++) {
				var perm0 = this.isCosetSearch ? this.sgsG.e : this.sgsG.toKeyIdx();
				this.idaMidSearch(i, maxl,
						1, this.canon.trieNodes, [],
						perm0, null, this.prunTable,
						(moves, permKey) => {
					var key;
					if (this.isCosetSearch) {
						var permRep = this.sgsH.minElem(permKey);
						key = this.permHash(permRep);
					} else {
						key = this.permHash(permKey);
					}
					if (!visited.has(key)) {
						stateCnt++;
						visited.add(key);
					}
				});
			}
		}
		return stateCnt;
	}

	return {
		permMult: permMult,
		permInv: permInv,
		permCmp: permCmp,
		CanonSeqGen: CanonSeqGen,
		SchreierSims: SchreierSims,
		SubgroupSolver: SubgroupSolver
	}
})(mathlib.rn);
