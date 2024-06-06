var puzzleAnalyzer = (function() {
	"use strict";

	var EPS = 1e-6;

	function getPuzzle(puzzle) {
		if (typeof(puzzle) == 'string') {
			var chk = poly3d.getFamousPuzzle(puzzle);
			var param = chk ? chk.polyParam : poly3d.parsePolyParam(puzzle);
			puzzle = poly3d.makePuzzle.apply(poly3d, param);
		}
		makeCenterMoveTable(puzzle);
		makeMirrorMoveTable(puzzle);
		return puzzle;
	}

	function fixMoveTable(moveTable0, moveTable, rotTable) {
		for (var i = 0; i < moveTable0.length; i++) {
			var curPerm = moveTable0[i];
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
		fixMoveTable(puzzle.moveTable, moveTable, rotTable);
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
		var canon = new grouplib.CanonSeqGen(validMoves);
		canon.initTrie(canonDepth || 2);
		var ret = canon.countSeq(depth, true);
		return ret;
	}

	function makeCenterMoveTable(puzzle) {
		puzzle.centerMoveTable = [];
		var proj1d = [];
		var projNorm = new poly3d.Point(1, 2, 3).normalized();
		var centers = [];
		puzzle.enumFacesPolys(function(face, p, poly, idx) {
			var uv = this.faceUVs[face];
			if (Math.abs(uv[0].inprod(poly.center)) >= EPS || Math.abs(uv[1].inprod(poly.center)) >= EPS) {
				return;
			}
			for (var i = 0; i < poly.paths.length; i++) {
				var pp = poly.center.add(poly.paths[i].p1).scalar(0.5);
				centers.push([face, i, pp, centers.length]);
				proj1d.push([proj1d.length, projNorm.inprod(pp), pp]);
			}
		}.bind(puzzle));
		proj1d.sort(function(a, b) { return a[1] - b[1]; });
		for (var i = 0; i < puzzle.twistyDetails.length; i++) {
			var curMove = [];
			var planes = [];
			for (var j = 2; j < puzzle.twistyDetails[i].length; j++) {
				planes.push(puzzle.twistyPlanes[puzzle.twistyDetails[i][j]]);
			}
			var trans = new poly3d.RotTrans(planes[0].norm, Math.PI * 2 / puzzle.twistyDetails[i][1]);
			out: for (var idx = 0; idx < centers.length; idx++) {
				var pp = centers[idx][2];
				for (var j = 0; j < planes.length; j++) {
					if (planes[j].side(pp) < 0) {
						curMove[idx] = -1; // not affect by this twisty
						continue out;
					}
				}
				var movedCenter = trans.perform(pp);
				var movedProj = projNorm.inprod(movedCenter);
				var left = 0, right = proj1d.length - 1;
				while (right > left) {
					var mid = (right + left) >> 1;
					var midval = proj1d[mid][1];
					if (midval < movedProj - EPS) {
						left = mid + 1;
					} else {
						right = mid;
					}
				}
				for (var j = left; j < proj1d.length; j++) {
					if (proj1d[j][1] > movedProj + EPS) {
						debugger; // no moves found
					}
					if (movedCenter.abs(proj1d[j][2]) < EPS) {
						curMove[idx] = proj1d[j][0];
						break;
					}
				}
			}
			puzzle.centerMoveTable.push(curMove);
		}
	}

	function MirrorTrans(norm) {
		var x = norm.x,
			y = norm.y,
			z = norm.z;
		this.mat = [
			1 - 2 * x * x, -2 * x * y, -2 * x * z,
			-2 * x * y, 1 - 2 * y * y, -2 * y * z,
			-2 * x * z, -2 * y * z, 1 - 2 * z * z
		];
	}

	MirrorTrans.prototype.perform = function(p) {
		var mat = this.mat;
		return new poly3d.Point(
			mat[0] * p.x + mat[1] * p.y + mat[2] * p.z,
			mat[3] * p.x + mat[4] * p.y + mat[5] * p.z,
			mat[6] * p.x + mat[7] * p.y + mat[8] * p.z
		);
	}

	function makeMirrorMoveTable(puzzle) {
		puzzle.mirrorMoveTable = [];
		var proj1d = [];
		var projNorm = new poly3d.Point(1, 2, 3).normalized();
		puzzle.enumFacesPolys(function(face, p, poly, idx) {
			proj1d[idx] = [idx, projNorm.inprod(poly.center), poly.center];
		}.bind(puzzle));
		proj1d.sort(function(a, b) { return a[1] - b[1]; });
		var curMove = [];
		var trans = new MirrorTrans(puzzle.facePlanes[0].norm.add(puzzle.facePlanes[1].norm, -1).normalized());
		puzzle.enumFacesPolys(function(face, p, poly, idx) {
			var movedCenter = trans.perform(poly.center);
			var movedProj = projNorm.inprod(movedCenter);
			var left = 0, right = proj1d.length - 1;
			while (right > left) {
				var mid = (right + left) >> 1;
				var midval = proj1d[mid][1];
				if (midval < movedProj - EPS) {
					left = mid + 1;
				} else {
					right = mid;
				}
			}
			for (var j = left; j < proj1d.length; j++) {
				if (proj1d[j][1] > movedProj + EPS) {
					debugger; // no moves found
				}
				if (movedCenter.abs(proj1d[j][2]) < EPS) {
					curMove[idx] = proj1d[j][0];
					break;
				}
			}
		}.bind(puzzle));
		puzzle.mirrorMoveTable.push(curMove);
	}

	function makeCenterMoveTable(puzzle) {
		puzzle.centerMoveTable = [];
		var proj1d = [];
		var projNorm = new poly3d.Point(1, 2, 3).normalized();
		var centers = [];
		puzzle.enumFacesPolys(function(face, p, poly, idx) {
			var uv = this.faceUVs[face];
			if (Math.abs(uv[0].inprod(poly.center)) >= EPS || Math.abs(uv[1].inprod(poly.center)) >= EPS) {
				return;
			}
			for (var i = 0; i < poly.paths.length; i++) {
				var pp = poly.center.add(poly.paths[i].p1).scalar(0.5);
				centers.push([face, i, pp, centers.length]);
				proj1d.push([proj1d.length, projNorm.inprod(pp), pp]);
			}
		}.bind(puzzle));
		proj1d.sort(function(a, b) { return a[1] - b[1]; });
		for (var i = 0; i < puzzle.twistyDetails.length; i++) {
			var curMove = [];
			var planes = [];
			for (var j = 2; j < puzzle.twistyDetails[i].length; j++) {
				planes.push(puzzle.twistyPlanes[puzzle.twistyDetails[i][j]]);
			}
			var trans = new poly3d.RotTrans(planes[0].norm, Math.PI * 2 / puzzle.twistyDetails[i][1]);
			out: for (var idx = 0; idx < centers.length; idx++) {
				var pp = centers[idx][2];
				for (var j = 0; j < planes.length; j++) {
					if (planes[j].side(pp) < 0) {
						curMove[idx] = -1; // not affect by this twisty
						continue out;
					}
				}
				var movedCenter = trans.perform(pp);
				var movedProj = projNorm.inprod(movedCenter);
				var left = 0, right = proj1d.length - 1;
				while (right > left) {
					var mid = (right + left) >> 1;
					var midval = proj1d[mid][1];
					if (midval < movedProj - EPS) {
						left = mid + 1;
					} else {
						right = mid;
					}
				}
				for (var j = left; j < proj1d.length; j++) {
					if (proj1d[j][1] > movedProj + EPS) {
						debugger; // no moves found
					}
					if (movedCenter.abs(proj1d[j][2]) < EPS) {
						curMove[idx] = proj1d[j][0];
						break;
					}
				}
			}
			puzzle.centerMoveTable.push(curMove);
		}
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

	grouplib.SchreierSims.prototype.subgroupProp = function(propFunc, thres) {
		thres = thres || 100000;
		var ret = new grouplib.SchreierSims([this.e]);
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
						return false;
					}
					ret.cnt++;
					if (!propFunc(depth, perm)) {
						return false;
					}
					for (var i = 0; i < ret.sgs[depth].length - 1; i++) {
						if (ret.sgs[depth][i]) {
							// var pp = ret.permMult(perm, ret.sgs[depth][i]);
							var pp = ret.sgs[depth][i][perm[depth]];
							if (pp < perm[depth]) {
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

	grouplib.SchreierSims.prototype.intersect = function(other, thres) {
		if (this.size() > other.size()) {
			return other.intersect(this, thres);
		}
		var ret = this.subgroupProp(function(depth, perm) {
			return other.isMember(perm, depth) >= 0;
		}, thres);
		return ret;
	}

	grouplib.SchreierSims.prototype.centralizer = function(perm, thres) {
		var obits = Array.prototype.concat.apply([], getOrbits([perm]));
		var pp2 = this.permMult(obits, this.permMult(perm, this.permInv(obits)));
		var sgs2 = new grouplib.SchreierSims([this.e]);
		var size = this.size();
		do {
			var g = this.rndElem();
			g = this.permMult(obits, this.permMult(g, this.permInv(obits)));
			g = sgs2.sift(g);
			if (g != null) {
				sgs2.addTk(this.e.length - 1, g);
			}
		} while (g != null || sgs2.size(true) != this.size(true));
		var n = this.e.length;
		var ret = sgs2.subgroupProp(function(depth, perm) {
			for (var i = n - 1; i >= depth; i--) {
				if (pp2[i] >= depth && perm[pp2[i]] != pp2[perm[i]]) {
					return false;
				}
			}
			return true;
		}, thres);
		return ret;
	}

	grouplib.SchreierSims.prototype.conjugate = function(perm1, perm2, thres) {
		var obits = getOrbits([perm1]);
		obits.sort(function(a, b) { return a.length - b.length; });
		var obits = Array.prototype.concat.apply([], obits);
		var pp1 = this.permMult(obits, this.permMult(perm1, this.permInv(obits)));
		var pp2 = this.permMult(obits, this.permMult(perm2, this.permInv(obits)));
		var sgs2 = new grouplib.SchreierSims([this.e]);
		var size = this.size();
		do {
			var g = this.rndElem();
			g = this.permMult(obits, this.permMult(g, this.permInv(obits)));
			g = sgs2.sift(g);
			if (g != null) {
				sgs2.addTk(this.e.length - 1, g);
			}
		} while (g != null || sgs2.size(true) != this.size(true));
		var n = this.e.length;
		var ref = null;
		var ret = sgs2.subgroupProp(function(depth, perm) {
			if (ref) {
				return false;
			}
			for (var i = n - 1; i >= depth; i--) {
				if (pp1[i] >= depth && perm[pp1[i]] != pp2[perm[i]]) {
					return false;
				}
			}
			if (depth == 1) {
				ref = perm;
				return false;
			}
			return true;
		}, thres);
		return ref;
	}

	grouplib.SchreierSims.prototype.enumDFS = function(depth, perm, callback, checkFunc) {
		while (depth >= 1 && this.i2t[depth].length == 1) {
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
			var ret = this.enumDFS(depth - 1,
				this.permMult(this.sgs[depth][j], perm), callback, checkFunc);
			if (ret) {
				return ret;
			}
		}
	}

	grouplib.SchreierSims.prototype.enum = function(callback) {
		this.enumDFS(this.sgs.length - 1, this.e, callback, function() {
			return true;
		});
	}

	function countState(puzzle, isSuper) {
		puzzle = getPuzzle(puzzle);
		var moveTable0 = puzzle.moveTable;
		var moveTable = [];
		var rotTable = [];
		if (isSuper) {
			moveTable0 = [];
			for (var i = 0; i < puzzle.moveTable.length; i++) {
				moveTable0[i] = puzzle.moveTable[i].slice();
				for (var j = 0; j < puzzle.centerMoveTable[0].length; j++) {
					moveTable0[i].push(
						puzzle.centerMoveTable[i][j] == -1 ? -1 : 
						(puzzle.centerMoveTable[i][j] + puzzle.moveTable[0].length));
				}
			}
		}
		fixMoveTable(moveTable0, moveTable, rotTable);
		var move = new grouplib.SchreierSims(moveTable);
		DEBUG && console.log('Move=', move.size(true));
		var rot = new grouplib.SchreierSims(rotTable);
		DEBUG && console.log('Rot=', rot.size(true));
		var moverot = new grouplib.SchreierSims(move);
		moverot.extend(rotTable);
		DEBUG && console.log('Move+Rot=', moverot.size(true));
		if (isSuper) {
			DEBUG && console.log('state = (Move+Rot)/Rot = ', moverot.size(true) / rot.size(true));
			return moverot.size(true) / rot.size(true);
		}

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
		DEBUG && console.log('raw colors=', sgsColor.size(true));
		var stabColor = sgsColor.intersect(move);

		if (stabColor.cnt == -1) {
			DEBUG && console.log('stabColor invalid');
			DEBUG && console.log('state = (Move+Rot)/Rot = ', moverot.size(true) / rot.size(true));
			return moverot.size(true) / rot.size(true);
		} else {
			DEBUG && console.log('stab colors=', stabColor.size(true));
			DEBUG && console.log('state = (Move+Rot)/Rot/stabColor = ', moverot.size(true) / rot.size(true) / stabColor.size(true));
			return moverot.size(true) / rot.size(true) / stabColor.size(true);

			// calculate number of cube states in conjugation of rotations and mirrors
			var modCnt = 0n;
			var rotmir = new grouplib.SchreierSims(rot);
			rotmir.extend(rotTable.concat(puzzle.mirrorMoveTable));
			rotmir.enum(function(perm) {
				var ct = moverot.centralizer(perm, 1e10);
				var ct2 = stabColor.centralizer(perm, 1e10);
				var ct3 = rot.centralizer(perm, 1e10);
				modCnt += ct.size(true) / (ct2.size(true) * ct3.size(true));
				if (ct.size(true) % (ct2.size(true) * ct3.size(true)) != 0) {
					console.log('Centralizer ERROR!');
				}
			});

			modCnt = 0n;
			var ccidx = 0;
			var done = {};
			var i1 = 0;
			rotmir.enum(function(perm1) {
				if (perm1.join(',') in done) {
					return;
				}
				var mult = 0n;
				rotmir.enum(function(perms) {
					var key = rotmir.permMult(perms, rotmir.permMult(perm1, rotmir.permInv(perms))).join(',');
					if (!(key in done)) {
						done[key] = mult++;
					}
				});
				var ct = moverot.centralizer(perm1, 1e10);
				var ct2 = stabColor.centralizer(perm1, 1e10);
				var curCnt = 0n;
				rot.enum(function(perm2) {
					var ret = moverot.conjugate(perm1, rot.permMult(perm1, perm2), 1e10);
					if (ret) {
						curCnt++;
					}
				});
				modCnt += curCnt * mult * ct.size(true) / ct2.size(true);
			});

			if (modCnt % (rotmir.size(true) * rot.size(true)) != 0) {
				console.log('Centralizer ERROR!');
			}
			modCnt = modCnt / (rotmir.size(true) * rot.size(true));
			DEBUG && console.log('Move+Rot/Rot/stabColor mod ^Rot=', modCnt);
			return [moverot.size(true) / rot.size(true) / stabColor.size(true), modCnt];
		}
	}

	grouplib.SchreierSims.prototype.extend = function(gen, shuffle) {
		var naCnt = 0;
		for (var i = 0; i < gen.length; i++) {
			var g = gen[i];
			if (shuffle) {
				g = this.permMult(this.permMult(this.permInv(shuffle), g), shuffle);
			}
			g = this.sift(g);
			if (g == null) {
				continue;
			}
			this.addTk(this.e.length - 1, g);
		}

		while (naCnt < Math.max(32, gen.length)) {
			var g = this.rndElem();
			g = this.sift(g);
			if (g == null) {
				naCnt++;
				continue;
			}
			if (naCnt > 0) {
				DEBUG && console.log(naCnt);
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
