var puzzleAnalyzer = (function() {
	"use strict";

	function getPuzzle(puzzle) {
		if (typeof(puzzle) == 'string') {
			var chk = poly3d.getFamousPuzzle(puzzle);
			var param = chk ? chk.polyParam : poly3d.parsePolyParam(puzzle);
			puzzle = poly3d.makePuzzle.apply(poly3d, param);
		}
		return puzzle;
	}

	function fixMoveTable(puzzle, moveTable, rotTable) {
		for (var i = 0; i < puzzle.moveTable.length; i++) {
			var curPerm = puzzle.moveTable[i];
			var isRotate = true;
			for (var j = 0; j < curPerm.length; j++) {
				if (curPerm[j] == -1) {
					curPerm[j] = j;
					isRotate = false;
				}
			}
			if (isRotate) {
				rotTable.push(curPerm);
			} else {
				moveTable.push(curPerm);
			}
		}
		return [moveTable, rotTable];
	}

	function countCanonSeqs(puzzle, depth, canonDepth) {
		puzzle = getPuzzle(puzzle);
		var moveTable = [];
		var rotTable = [];
		fixMoveTable(puzzle, moveTable, rotTable);
		//expand move table
		var validMoves = [];
		var isVisited = {};
		for (var i = 0; i < moveTable.length; i++) {
			var curPerm = moveTable[i];
			var perm = curPerm.slice();
			var pow = 1;
			while (true) {
				var hash = perm.join(',');
				if (!(hash in isVisited)) {
					isVisited[hash] = 1;
					validMoves.push(perm.slice());
				}
				var isIdent = true;
				for (var j = 0; j < curPerm.length; j++) {
					perm[j] = curPerm[perm[j]];
					if (perm[j] != j) {
						isIdent = false;
					}
				}
				if (isIdent) {
					break;
				}
				pow++;
			}
		}
		console.log(validMoves);
		var canon = new grouplib.CanonSeqGen(validMoves);
		canon.initTrie(canonDepth || 2);
		var ret = canon.countSeq(depth, true);
		console.log(ret);
		return ret;
	}


	function DisJoint(n) {
		this.fa = [];
		for (var i = 0; i < n; i++) {
			this.fa[i] = i;
		}
	}

	DisJoint.prototype.find = function(x) {
		return x == this.fa[x] ? x : (this.fa[x] = this.find(this.fa[x]));
	};

	DisJoint.prototype.merge = function(i, j) {
		this.fa[this.find(j)] = this.find(i);
	};

	DisJoint.prototype.export = function() {
		var ret = [];
		var mapIdx = [];
		for (var i = 0; i < this.fa.length; i++) {
			var root = this.find(i);
			if (mapIdx[root] == undefined) {
				mapIdx[root] = ret.push([]) - 1;
			}
			ret[mapIdx[root]].push(i);
		}
		return ret;
	}

	//assert moveTable.length > 0
	function getOrbits(moveTable) {
		var orbits = new DisJoint(moveTable[0].length);
		for (var i = 0; i < moveTable.length; i++) {
			for (var j = 0; j < moveTable[i].length; j++) {
				orbits.merge(j, moveTable[i][j]);
			}
		}
		return orbits.export();
	}

	grouplib.SchreierSims.prototype.intersect = function(other, thres) {
		if (this.size() > other.size()) {
			return other.intersect(this, thres);
		}
		thres = thres || 100000;
		var ret = new grouplib.SchreierSims([this.sgs[0][0]]);
		var n = this.sgs.length;
		ret.cnt = 0;
		for (var i = 0; i < n; i++) {
			for (var j = 0; j < i; j++) {
				if (!this.sgs[i][j] || ret.sgs[i][j]) {
					continue;
				}
				this.enumDFS(i - 1, this.sgs[i][j], function(perm) {
					ret.knutha(n - 1, perm);
					return true;
				}, function(depth, perm) {
					if (ret.cnt > thres || ret.cnt == -1) {
						ret.cnt = -1;
						return false;
					}
					ret.cnt++;
					var mchk = other.isMember(perm, depth);
					if (mchk < 0) {
						return false;
					}
					for (var i = 0; i < ret.sgs[depth].length - 1; i++) {
						if (ret.sgs[depth][i]) {
							var pp = ret.permMult(perm, ret.sgs[depth][i]);
							if (pp[depth] < perm[depth]) {
								return false;
							}
						}
					}
					return true;
				});
				if (ret.cnt == -1) {
					return ret;
				}
			}
		}
		return ret;
	}

	grouplib.SchreierSims.prototype.enumDFS = function(depth, perm, callback, checkFunc) {
		if (checkFunc && !checkFunc(depth + 1, perm)) {
			return;
		}
		if (depth == 0) {
			return callback(perm);
		}
		for (var j = 0; j <= depth; j++) {
			if (this.sgs[depth][j]) {
				var ret = this.enumDFS(depth - 1,
					this.permMult(this.sgs[depth][j], perm), callback, checkFunc);
				if (ret) {
					return ret;
				}
			}
		}
	}

	grouplib.SchreierSims.prototype.enum = function(callback) {
		this.enumDFS(this.sgs.length - 1, this.sgs[0][0], callback);
	}

	function countState(puzzle) {
		puzzle = getPuzzle(puzzle);
		var moveTable = [];
		var rotTable = [];
		fixMoveTable(puzzle, moveTable, rotTable);
		var move = new grouplib.SchreierSims(moveTable);
		console.log('Move=', move.size(true));
		var rot = new grouplib.SchreierSims(rotTable);
		console.log('Rot=', rot.size(true));
		var moverot = new grouplib.SchreierSims(move);
		moverot.extend(rotTable);
		console.log('Move+Rot=', moverot.size(true));


		var faceColors = [];
		puzzle.enumFacesPolys(function(face, p, poly, idx) {
			faceColors[idx] = face;
		});
		var orbits = getOrbits(moveTable.concat(rotTable));

		// find distingrishable pieces by blocks
		var pieceFea = [];
		for (var i = 0; i < moveTable[0].length; i++) {
			var aff = [];
			for (var j = 0; j < moveTable.length; j++) {
				aff[j >> 5] |= (moveTable[j][i] != i) << (j & 0x1f);
			}
			pieceFea.push(aff.join(','));
		}
		var feaIdxs = moverot.e.slice();
		feaIdxs.sort(function(i, j) {
			return pieceFea[i] > pieceFea[j] ? 1 : pieceFea[i] == pieceFea[j] ? 0 : -1;
		});
		var skipPieces = {};
		for (var i = 0; i < feaIdxs.length - 1; i++) {
			if (pieceFea[feaIdxs[i]] == pieceFea[feaIdxs[i + 1]]) {
				skipPieces[feaIdxs[i]] = 1;
				skipPieces[feaIdxs[i + 1]] = 1;
			}
		}

		var genColor = [moverot.e.slice()];
		for (var o = 0; o < orbits.length; o++) {
			var orbit = orbits[o];
			for (var i = 0; i < orbit.length; i++) {
				if (orbit[i] in skipPieces) {
					continue;
				}
				for (var j = i + 1; j < orbit.length; j++) {
					if (orbit[j] in skipPieces) {
						continue;
					}
					if (faceColors[orbit[i]] == faceColors[orbit[j]]) {
						var perm = moverot.e.slice();
						perm[orbit[i]] = orbit[j];
						perm[orbit[j]] = orbit[i];
						genColor.push(perm);
					}
				}
			}
		}
		var sgsColor = new grouplib.SchreierSims(genColor);
		console.log('raw colors=', sgsColor.size(true));
		var stabColor = sgsColor.intersect(move);
		if (stabColor.cnt == -1) {
			console.log('stabColor invalid');
			console.log('state = (Move+Rot)/Rot = ', moverot.size(true) / rot.size(true));
			return moverot.size(true) / rot.size(true);
		} else {
			console.log('stab colors=', stabColor.size(true));
			console.log('state = (Move+Rot)/Rot/stabColor = ', moverot.size(true) / rot.size(true) / stabColor.size(true));
			return moverot.size(true) / rot.size(true) / stabColor.size(true);
		}
	}

	function RandElem(gens) {
		if (gens.length == 0) {
			debugger;
		}
		this.gens = gens.slice();
		if (gens.length < 20) {
			for (var i = 0; i < 20 - gens.length; i++) {
				this.gens.push(this.gens[i]);
			}
		}
		for (var i = 0; i < Math.max(20, gens.length); i++) {
			this.next();
		}
	}

	function permMult(permA, permB) {
		var ret = [];
		for (var i = 0; i < permA.length; i++) {
			ret[i] = permB[permA[i]];
		}
		return ret;
	}

	RandElem.prototype.next = function() {
		var k = this.gens.length;
		var n = this.gens[0].length;
		var i1 = ~~(Math.random() * (k - 1)) + 1;
		var j1 = ~~(Math.random() * (k - 2)) + 1;
		if (i1 == j1) {
			j1++;
		}
		var mul = [];
		if (Math.random() < 0.5) {
			for (var i = 0; i < n; i++) {
				mul[this.gens[j1][i]] = i;
			}
		} else {
			mul = this.gens[j1];
		}
		if (Math.random() < 0.5) {
			this.gens[i1] = permMult(this.gens[i1], mul);
			this.gens[0] = permMult(this.gens[0], this.gens[i1]);
		} else {
			this.gens[i1] = permMult(mul, this.gens[i1]);
			this.gens[0] = permMult(this.gens[i1], this.gens[0]);
		}
		return this.gens[0];
	}

	grouplib.SchreierSims.prototype.extend = function(gen, shuffle) {
		var pr = new RandElem(gen);
		var naCnt = 0;
		while (naCnt < 32) {
			var g = pr.next();
			if (shuffle) {
				g = this.permMult(this.permMult(this.permInv(shuffle), g), shuffle);
			}
			g = this.sift(g);
			if (g == null) {
				naCnt++;
				continue;
			}
			this.addTk(this.e.length - 1, g);
		}
	}

	grouplib.SchreierSims.prototype.sift = function(p) {
		for (var i = p.length - 1; i >= 0; i--) {
			var j = p[i];
			if (j != i) {
				if (!this.sgs[i][j]) {
					return p;
				}
				p = this.permMult(p, this.sgsi[i][j]);
			}
		}
		return null;
	}

	grouplib.SchreierSims.prototype.addSGS = function(k, p) {
		var j = p[k];
		if (this.sgs[k][j]) {
			return -1;
		}
		this.sgs[k][j] = p;
		this.sgsi[k][j] = this.permInv(p);
		this.t2i[k][j] = this.i2t[k].length;
		this.i2t[k].push(j);
		if (this.i2t[k].length == 2) {
			this.keyIdx.push(k);
			this.keyIdx.sort(function(a, b) { return b - a; });
		}
		return 0;
	}

	grouplib.SchreierSims.prototype.addTk = function(k, p) {
		while (p[k] == k) {
			k--;
		}
		// assert !this.sgs[k][p[k]]
		this.Tk[k].push(p);
		this.addSGS(k, p);

		for (var i = 0; i < this.i2t[k].length; i++) { // continue bfs for schreier tree
			var i1 = this.i2t[k][i];
			for (var j = 0; j < this.Tk[k].length; j++) {
				this.addSGS(k, this.permMult(this.sgs[k][i1], this.Tk[k][j]));
			}
		}
	}

	return {
		countState: countState,
		countCanonSeqs: countCanonSeqs,
		getPuzzle: getPuzzle
	}
})();
