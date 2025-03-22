var poly3d = (function() {
	var EPS = 1e-6;

	function Point(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	var _ = Point.prototype;

	_.abs = function(p) {
		return p ? Math.hypot(this.x - p.x, this.y - p.y, this.z - p.z) : Math.hypot(this.x, this.y, this.z);
	}

	_.add = function(p, scalar) {
		if (scalar === undefined) {
			scalar = 1;
		}
		return new Point(this.x + p.x * scalar, this.y + p.y * scalar, this.z + p.z * scalar);
	}

	_.scalar = function(w) {
		return new Point(this.x * w, this.y * w, this.z * w);
	}

	_.normalized = function() {
		var abs = Math.hypot(this.x, this.y, this.z);
		return abs < EPS ? new Point(1, 0, 0) : new Point(this.x / abs, this.y / abs, this.z / abs);
	}

	_.inprod = function(p) {
		return this.x * p.x + this.y * p.y + this.z * p.z;
	}

	_.outprod = function(p) {
		return new Point(
			this.y * p.z - this.z * p.y,
			this.z * p.x - this.x * p.z,
			this.x * p.y - this.y * p.x
		);
	}

	_.triangleArea = function(p1, p2) {
		var v10x = p1.x - this.x;
		var v10y = p1.y - this.y;
		var v10z = p1.z - this.z;
		var v20x = p2.x - this.x;
		var v20y = p2.y - this.y;
		var v20z = p2.z - this.z;
		return Math.hypot(
			v10y * v20z - v10z * v20y,
			v10z * v20x - v10x * v20z,
			v10x * v20y - v10y * v20x
		) / 2;
	}

	function RotTrans(norm, theta) {
		var c = Math.cos(theta),
			s = Math.sin(theta),
			t = 1 - c,
			x = norm.x,
			y = norm.y,
			z = norm.z,
			tx = t * x,
			ty = t * y;
		this.mat = [
			tx * x + c, tx * y - s * z, tx * z + s * y,
			tx * y + s * z, ty * y + c, ty * z - s * x,
			tx * z - s * y, ty * z + s * x, t * z * z + c
		];
	}

	_ = RotTrans.prototype;

	_.perform = function(p) {
		var mat = this.mat;
		return new Point(
			mat[0] * p.x + mat[1] * p.y + mat[2] * p.z,
			mat[3] * p.x + mat[4] * p.y + mat[5] * p.z,
			mat[6] * p.x + mat[7] * p.y + mat[8] * p.z
		);
	}

	// {(x, y, z) | x * norm.x + y * norm.y + z * norm.z = dis}
	function Plane(norm, dis) {
		this.norm = norm;
		this.dis = typeof(dis) == 'number' ? dis : 1;
	}

	Plane.prototype.side = function(point) {
		return this.norm.inprod(point) - this.dis;
	}

	function Sphere(ct, radius, norm) {
		this.ct = ct;
		this.radius = radius;
		if (norm) {
			this.norm = norm;
		}
	}

	Sphere.prototype.side = function(point) { // when radius > 0, >0: outside, <0: inside
		return (this.ct.abs(point) - Math.abs(this.radius)) * (this.radius > 0 ? 1 : -1);
	}

	function Segment(p1, p2) {
		this.p1 = p1;
		this.p2 = p2;
	}

	_ = Segment.prototype;

	_.getMid = function() {
		return this.p1.add(this.p2).scalar(0.5);;
	}

	_.genMids = function() {
		return [];
	}

	_.slice = function(p1, p2) {
		return new Segment(p1, p2);
	}

	_.revert = function() {
		return new Segment(this.p2, this.p1);
	}

	_.rankKey = function(p) {
		return this.p2.add(this.p1, -1).inprod(p);
	}

	_.intersect = function(obj) {
		var ret = [];
		if (obj instanceof Plane) {
			var prod1 = this.p1.inprod(obj.norm) - obj.dis;
			var prod2 = this.p2.inprod(obj.norm) - obj.dis;
			if (Math.abs(prod1 - prod2) < EPS) {
				return [];
			}
			var lambda = -prod1 / (prod2 - prod1);
			if (Math.abs(lambda) < EPS || Math.abs(lambda - 1) < EPS) {
				ret.push(Math.abs(lambda) < EPS ? this.p1 : this.p2);
			} else if (lambda > 0 && lambda < 1) {
				ret.push(this.p1.scalar(1 - lambda).add(this.p2, lambda));
			}
		} else if (obj instanceof Sphere) {
			// p = (1 - lambda) * p1 + lambda * p2, ||p - ct||^2 = radius^2
			// ||p1 - ct + lambda * (p2 - p1) ||^2 = radius^2
			// ||p2 - p1||^2 lambda^2 + 2 * <p2 - p1, p1 - ct> lambda + ||p1 - ct||^2 - radius^2 = 0
			var a = Math.pow(this.p1.abs(this.p2), 2);
			var b = this.p2.add(this.p1, -1).inprod(this.p1.add(obj.ct, -1)) * 2;
			var c = Math.pow(this.p1.abs(obj.ct), 2) - Math.pow(obj.radius, 2);
			var delta = b * b - 4 * a * c;
			if (delta <= 0) { // tangency or not intersected
				return [];
			}
			for (var sign = -1; sign < 2; sign += 2) {
				var lambda = (-b + sign * Math.sqrt(delta)) / (2 * a)
				if (Math.abs(lambda) < EPS || Math.abs(lambda - 1) < EPS) {
					ret.push(Math.abs(lambda) < EPS ? this.p1 : this.p2);
				} else if (lambda > 0 && lambda < 1) {
					ret.push(this.p1.scalar(1 - lambda).add(this.p2, lambda));
				}
			}
		}
		return ret;
	}

	function Arc(p1, p2, ct, norm) {
		this.p1 = p1;
		this.p2 = p2;
		this.ct = ct;
		this.norm = norm;
		this._fu = this.p1.add(this.ct, -1).normalized();
		this._fv = this.norm.outprod(this._fu);
		this._radius = this.ct.abs(p1);
		var ctp2 = this.p2.add(this.ct, -1);
		this._ang = (Math.atan2(this._fv.inprod(ctp2), this._fu.inprod(ctp2)) + Math.PI * 2 + EPS) % (Math.PI * 2) - EPS;
	}

	_ = Arc.prototype;

	_.getMid = function() {
		return this.ct.add(this._fu, Math.cos(this._ang / 2) * this._radius).add(this._fv, Math.sin(this._ang / 2) * this._radius);
	}

	_.genMids = function() {
		var nSegs = Math.ceil(this._ang / Math.PI * 180 / 10);
		var mids = [];
		for (var i = 0; i < nSegs - 1; i++) {
			var theta = this._ang / nSegs * (i + 1);
			mids.push(this.ct.add(this._fu, Math.cos(theta) * this._radius).add(this._fv, Math.sin(theta) * this._radius));
		}
		return mids;
	}

	_.slice = function(p1, p2) {
		return new Arc(p1, p2, this.ct, this.norm);
	}

	_.revert = function() {
		return new Arc(this.p2, this.p1, this.ct, this.norm.scalar(-1));
	}

	_.rankKey = function(p) {
		var vec1 = p.add(this.ct, -1);
		return Math.atan2(this._fv.inprod(vec1), this._fu.inprod(vec1));
	}

	_.intersect = function(obj) {
		var a, b, c;
		// p = ct + radius * (fu * cos(t) + fv * sin(t)), 0 <= t <= atan2(<p2 - ct , fv>, <p2 - ct, fu>);
		if (obj instanceof Plane) {
			// <p, norm> = dis => radius * <fu, norm> * cos(t) + radius * <fv, norm> * sin(t) = dis - <ct, norm>
			// t = +- acos(a / c) - phi
			a = this._radius * obj.norm.inprod(this._fv);
			b = this._radius * obj.norm.inprod(this._fu);
			c = obj.dis - obj.norm.inprod(this.ct);
		} else if (obj instanceof Sphere) {
			// ||p - ct2|| = radius2 => ||ct - ct2 + radius * (fu * cos(t) + fv * sin(t))|| = radius2
			// => ||ct - ct2||^2 + radius ^ 2 + 2 * <ct - ct2, radius * (fu * cos(t) + fv * sin(t))> = radius2^2
			// => <ct - ct2, radius * (fu * cos(t) + fv * sin(t))> = (radius2 ^ 2 - radius ^ 2 - ||ct - ct2||^2) / 2;
			var vec1 = this.ct.add(obj.ct, -1);
			a = this._radius * vec1.inprod(this._fv);
			b = this._radius * vec1.inprod(this._fu);
			c = ((obj.radius + this._radius) * (obj.radius - this._radius) - Math.pow(this.ct.abs(obj.ct), 2)) / 2;
		}
		// console.log(a, b, c, this, obj);
		//solve: b cos(t) + a sin(t) = c => sqrt(a*a+b*b) cos(t + phi) = c, phi = atan2(-a, b)
		var phi = Math.atan2(-a, b);
		var cos_t = c / Math.hypot(a, b);
		if (Math.abs(cos_t) >= 1) { // tangency or not intersected
			return [];
		}
		var ret = [];
		var t0 = Math.acos(cos_t);
		for (var sign = -1; sign < 2; sign += 2) {
			var t = (sign * t0 - phi + Math.PI * 4 + EPS) % (Math.PI * 2) - EPS;
			if (t > -EPS && t < this._ang + EPS) {
				ret.push(t);
			}
		}
		ret.sort(function(a, b) { return a - b; });
		for (var i = 0; i < ret.length; i++) {
			if (Math.abs(ret[i]) < EPS || Math.abs(ret[i] - this._ang) < EPS) {
				ret[i] = Math.abs(ret[i]) < EPS ? this.p1 : this.p2;
			} else {
				ret[i] = this.ct.add(this._fu, Math.cos(ret[i]) * this._radius).add(this._fv, Math.sin(ret[i]) * this._radius);
			}
		}
		for (var i = 0; i < ret.length; i++) {
			if (Math.abs(obj.side(ret[i])) > EPS) {
				debugger;
			}
			if (Math.abs(this.ct.abs(ret[i]) - this._radius) > EPS) {
				debugger;
			}
			if (Math.abs(this.norm.inprod(this.ct) - this.norm.inprod(ret[i])) > EPS) {
				debugger;
			}
		}
		// console.log(ret, this._radius);
		return ret;
	}

	// assert points.length >= 3, assume paths[i].p2 = paths[i + ].p1
	function Polygon(paths) {
		this.paths = paths.slice();
		var norm;
		for (var i = 0; i < paths.length; i++) {
			if (paths[i].ct) {
				norm = paths[i].norm;
				break;
			}
			var candNorm = paths[0].p2.add(paths[0].p1, -1).outprod(paths[1].p2.add(paths[1].p1, -1));
			if (candNorm.abs() > EPS * 10) {
				norm = candNorm.normalized();
				break;
			}
		}
		this.area = 0;
		if (!norm) {
			return;
		}
		var center = new Point(0, 0, 0);
		for (var i = 1; i < paths.length - 1; i++) {
			var area = paths[i].p1.add(paths[0].p1, -1).outprod(paths[i].p2.add(paths[i].p1, -1)).inprod(norm) / 2;
			center = center.add(paths[0].p1, area / 3);
			center = center.add(paths[i].p1, area / 3);
			center = center.add(paths[i].p2, area / 3);
			this.area += area;
		}
		for (var i = 0; i < paths.length; i++) {
			if (!paths[i].ct) {
				continue;
			}
			var arc = paths[i];
			var theta = arc._ang / 2;
			var h = 4 * arc._radius * Math.pow(Math.sin(arc._ang / 2), 3) / 3 / (arc._ang - Math.sin(arc._ang));
			area = Math.pow(arc._radius, 2) * (arc._ang - Math.sin(arc._ang)) / 2 * arc.norm.inprod(norm);
			var centroid = arc.ct.add(arc.norm.outprod(arc.p2.add(arc.p1, -1)).normalized(), -h);
			center = center.add(centroid, area);
			this.area += area;
		}
		this.center = center.scalar(1 / this.area);
		this.norm = this.area > 0 ? norm : norm.scalar(-1);
		this.area = Math.abs(this.area);
		this.dis = this.norm.inprod(paths[0].p1);
	}

	_ = Polygon.prototype;

	Polygon.fromVertices = function(vertices) {
		var paths = [];
		for (var i = 0; i < vertices.length; i++) {
			paths.push(new Segment(vertices[i], vertices[(i + 1) % vertices.length]));
		}
		return new Polygon(paths);
	}

	_.projection = function(norms) {
		var ret = [];
		for (var i = 0; i < this.paths.length; i++) {
			var points = [this.paths[i].p1].concat(this.paths[i].genMids());
			for (var k = 0; k < points.length; k++) {
				var coord = [];
				for (var j = 0; j < norms.length; j++) {
					coord.push(points[k].inprod(norms[j]));
				}
				ret.push(coord);
			}
		}
		return ret;
	}

	_.split = function(obj) {
		// calculate all intersects
		var paths = [[], []];
		var nCuts = 0;
		var refSide = obj.side(this.center) < 0 ? 1 : 0; // 0 outside, 1 inside
		for (var i = 0; i < this.paths.length; i++) {
			var path = this.paths[i];
			var points = path.intersect(obj);
			nCuts += points.length;
			var start = path.p1;
			for (var j = 0; j < points.length; j++) {
				if (start.abs(points[j]) > EPS) {
					var newPath = path.slice(start, points[j]);
					paths[obj.side(newPath.getMid()) < 0 ? 1 : 0].push(newPath);
					start = points[j];
				}
			}
			if (start.abs(path.p2) > EPS) {
				var remainPath = start == path.p1 ? path : path.slice(start, path.p2);
				var sideFloat = obj.side(remainPath.getMid());
				paths[Math.abs(sideFloat) < EPS ? refSide : sideFloat < 0 ? 1 : 0].push(remainPath);
			}
		}

		var cutBound;
		if (obj instanceof Plane) {
			if (nCuts == 0) {
				return paths[0].length == 0 ? [[], [this]] : [[this], []];
			}
			cutBound = new Segment(new Point(0, 0, 0), obj.norm.outprod(this.norm));
		} else if (obj instanceof Sphere) {
			var ct = obj.ct.add(this.norm, -this.norm.inprod(obj.ct) + this.dis);
			var radius = Math.pow(obj.radius, 2) - Math.pow(this.dis - this.norm.inprod(obj.ct), 2);
			if (radius <= 0) {
				return paths[0].length == 0 ? [[], [this]] : [[this], []];
			}
			radius = Math.sqrt(radius);
			var p1 = this.paths[1].p1.add(this.paths[0].p1, -1).normalized().scalar(radius).add(ct);
			cutBound = new Arc(p1, p1, ct, this.norm.scalar(obj.radius > 0 ? -1 : 1));
		}

		var polys = [[], []];
		// DEBUG && console.log('cut bound=', JSON.stringify(cutBound));

		for (var side = 0; side < 2; side++) {
			// mark all near-bound points
			var sign = side * 2 - 1;
			var pathStart = [];
			var pathsSide = paths[side];
			for (var i = 0, len = pathsSide.length; i < len; i++) {
				var nextIdx = (i + 1) % len;
				if (pathsSide[i].p2.abs(pathsSide[nextIdx].p1) > EPS) {
					pathStart.push([nextIdx, cutBound.rankKey(pathsSide[nextIdx].p1), pathsSide[nextIdx].p1]);
				}
			}
			pathStart.sort((a, b) => a[1] - b[1]);
			// DEBUG && console.log('sort result', JSON.stringify(pathStart));
			var usedCnt = 0;
			var used = [];
			// DEBUG && console.log('handle side', side, 'pathsSide.length=', pathsSide.length, JSON.stringify(pathsSide));
			while (usedCnt < pathsSide.length) {
				var curPaths = [];
				var idx = 0;
				while (used[idx]) {
					idx++;
				}
				// DEBUG && console.log('handle side', side, 'start idx=', idx);
				while (true) {
					var path = pathsSide[idx];
					curPaths.push(path);
					used[idx] = 1;
					usedCnt++;
					// DEBUG && console.log('path add', JSON.stringify(path), 'used=', JSON.stringify(used), 'usedCnt=', usedCnt, curPaths.length);
					if (path.p2.abs(curPaths[0].p1) < EPS) { // close path
						break;
					}
					idx = (idx + 1) % len;
					if (path.p2.abs(pathsSide[idx].p1) < EPS) {
						continue;
					}
					var key = cutBound.rankKey(path.p2);
					var next = 0;
					for (var i = 0; i < pathStart.length; i++) {
						if (pathStart[i][1] > key) {
							next = i;
							break;
						}
					}
					idx = pathStart[next][0];
					pathStart.splice(next, 1);
					curPaths.push(cutBound.slice(path.p2, pathsSide[idx].p1));
					// DEBUG && console.log('path addcut', JSON.stringify(cutBound.slice(path.p2, pathsSide[idx].p1)), 'remain start=', pathStart, curPaths.length);
					if (pathsSide[idx].p1.abs(curPaths[0].p1) < EPS) { // close path
						break;
					}
				}
				// DEBUG && console.log('close path=', JSON.stringify(curPaths));
				var poly = new Polygon(curPaths);
				if (poly.area > EPS) {
					polys[side].push(poly);
				} else {
					console.log('invalid path length', curPaths, poly);
				}
			}
			cutBound = cutBound.revert();
		}
		return polys;
	}

	_.trim = function(gap) {
		var toCutPlanes = [];
		var _point = this.paths.at(-1).p1;
		var poly = this;
		for (var i = 0; i < this.paths.length; i++) { // check paths[i]
			var path = this.paths[i];
			if (path instanceof Arc) {
				var radius = (this.norm.inprod(path.norm) > 0 ? 1 : -1) * path._radius; 
				poly = poly.split(new Sphere(path.ct, radius - gap / 2))[1][0];
			} else {
				var norm = path.p2.add(path.p1, -1).outprod(this.norm).normalized();
				var dis = norm.inprod(path.p2);
				poly = poly.split(new Plane(norm, dis - gap / 2))[1][0];
			}
			if (!poly) {
				return null;
			}
		}
		return poly;
	}

	// facePlanes = [plane1, plane2, ..., planeN]
	function PolyhedronPuzzle(facePlanes, faceVs, faceNames) {
		this.facePlanes = facePlanes.slice();
		this.faceNames = faceNames.slice();
		this.faceUVs = [];
		for (var i = 0; i < facePlanes.length; i++) {
			var faceNorm = facePlanes[i].norm;
			var faceV = faceVs[i];
			faceV = faceV.add(faceNorm, -faceV.inprod(faceNorm)).normalized();
			var faceU = faceV.outprod(faceNorm);
			this.faceUVs[i] = [faceU, faceV];
		}
		this.makeFacePolygons();
	}

	_ = PolyhedronPuzzle.prototype;

	// twistyPlanes = [plane1, plane2, ..., planeN]
	// twistyDetails = [[name1, maxPow1, planeIdx1_1, planeIdx1_2, ...], [name2, maxPow2, planeIdx2_1, ...], ...]
	_.setTwisty = function(twistyPlanes, twistyDetails) {
		this.twistyPlanes = twistyPlanes.slice();
		this.twistyDetails = twistyDetails.slice();
		this._twistyCache = {};
		for (var i = 0; i < twistyDetails.length; i++) {
			if (this.twistyDetails[i].length == 2) {
				this.twistyDetails[i].push(i);
			}
		}
		this.cutFacePolygons();
		this.makeMoveTable();
	}

	_.getTwistyIdx = function(laxis) {
		if (laxis in this._twistyCache) {
			return this._twistyCache[laxis];
		}
		var m = /^(\d*)([A-Z][A-Za-z]*)$/.exec(laxis);
		if (!m) {
			return -1;
		}
		var layerRe = new RegExp(m[1] + "(?=[A-Z])");
		var axis = m[2].split(/(?=[A-Z])/g);
		var faceSet = {};
		var faceCnt = 0;
		for (var i = 0; i < axis.length; i++) {
			if (faceSet[axis[i]] == undefined) {
				faceSet[axis[i]] = new RegExp(axis[i] + "(?=[A-Z]|$)");
				faceCnt++;
			}
		}
		var minRemain = [99, -1];
		var minIdx = -1;
		for (var i = 0; i < this.twistyDetails.length; i++) {
			var chkAxis = this.twistyDetails[i][0];
			if (!layerRe.exec(chkAxis)) {
				continue;
			}
			var remain = chkAxis.length - m[1].length;
			for (var face in faceSet) {
				if (faceSet[face].exec(chkAxis)) {
					remain -= face.length;
				} else {
					remain = 99;
					break;
				}
			}
			if (remain < minRemain[0]) {
				minRemain = [remain, i];
			}
		}
		this._twistyCache[laxis] = faceCnt == 1 && minRemain[0] != 0 ? -1 : minRemain[1];
		return this._twistyCache[laxis];
	}

	_.makeFacePolygons = function() {
		this.facesPolys = [];
		for (var face = 0; face < this.facePlanes.length; face++) {
			var norm = this.facePlanes[face].norm;
			var dis = this.facePlanes[face].dis;
			var faceCenter = norm.scalar(dis);
			var faceUV = this.faceUVs[face];
			var poly = Polygon.fromVertices([
				faceCenter.add(faceUV[0], 100),
				faceCenter.add(faceUV[1], 100),
				faceCenter.add(faceUV[0], -100),
				faceCenter.add(faceUV[1], -100)
			]);
			for (var fother = 0; fother < this.facePlanes.length; fother++) {
				if (fother == face) {
					continue;
				}
				poly = poly.split(this.facePlanes[fother])[1][0];
				if (!poly) { // all area in the plane is cut out, input is incorrect
					debugger
					break;
				}
			}
			this.facesPolys[face] = [poly];
		}
	}

	_.cutFacePolygons = function() {
		var cuts = this.twistyPlanes.slice();
		cuts.sort(function(a, b) { return (a.ct ? 1 : 0) - (b.ct ? 1 : 0); });
		// TODO we are not able to handle holes, so cut plane first
		for (var i = 0; i < cuts.length; i++) {
			var plane = cuts[i];
			this.enumFacesPolys((face, p, poly) => {
				var polys = poly.split(plane);
				polys = Array.prototype.concat.apply([], polys);
				this.facesPolys[face][p] = polys[0];
				for (var j = 1; j < polys.length; j++) {
					this.facesPolys[face].push(polys[j]);
				}
			});
		}
	}

	_.enumFacesPolys = function(callback) {
		var idx = 0;
		for (var face = 0; face < this.facesPolys.length; face++) {
			var facePolys = this.facesPolys[face];
			var polyLen = facePolys.length;
			for (var p = 0; p < polyLen; p++) {
				if (callback(face, p, facePolys[p], idx)) {
					return;
				}
				idx++;
			}
		}
	}

	_.makeMoveTable = function() {
		this.moveTable = [];
		var proj1d = [];
		var projNorm = new Point(1, 2, 3).normalized();
		this.enumFacesPolys((face, p, poly, idx) => {
			proj1d[idx] = [idx, projNorm.inprod(poly.center), poly.center];
		});
		proj1d.sort(function(a, b) { return a[1] - b[1]; });
		for (var i = 0; i < this.twistyDetails.length; i++) {
			var curMove = [];
			var planes = [];
			for (var j = 2; j < this.twistyDetails[i].length; j++) {
				planes.push(this.twistyPlanes[this.twistyDetails[i][j]]);
			}
			var trans = new RotTrans(planes[0].norm, Math.PI * 2 / this.twistyDetails[i][1]);
			this.enumFacesPolys((face, p, poly, idx) => {
				for (var j = 0; j < planes.length; j++) {
					if (planes[j].side(poly.center) < 0) {
						curMove[idx] = -1; // not affect by this twisty
						return;
					}
				}
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
			});
			this.moveTable.push(curMove);
		}
	}

	function makePuzzle(nface, faceCuts, edgeCuts, cornCuts, faceMoves, edgeMoves, cornMoves) {
		var faceNorms = [];
		var faceVs = [];
		var faceNames = [];
		var facePow = 3;
		var edgePow = 2;
		var cornPow = 3;
		if (nface == 4) { // tetrahedron
			faceNorms = [
				new Point(0, -1, 0),
				new Point(-Math.sqrt(6) / 3, 1 / 3, -Math.sqrt(2) / 3),
				new Point(Math.sqrt(6) / 3, 1 / 3, -Math.sqrt(2) / 3),
				new Point(0, 1 / 3, Math.sqrt(8) / 3)
			];
			faceVs = [3, 2, 1, new Point(0, 1, 0)];
			faceNames = ["D", "L", "R", "F"];
		} else if (nface == 6) { // cube
			faceNorms = [
				new Point(0, 1, 0),
				new Point(1, 0, 0),
				new Point(0, 0, 1)
			];
			faceVs = [5, 0, 0, 2, 0, 0];
			faceNames = ["U", "R", "F", "D", "L", "B"];
			facePow = 4;
		} else if (nface == 8) { // octahedron
			faceNorms = [
				new Point(0, 1, 0),
				new Point(Math.sqrt(6) / 3, 1 / 3, Math.sqrt(2) / 3),
				new Point(-Math.sqrt(6) / 3, 1 / 3, Math.sqrt(2) / 3),
				new Point(0, -1 / 3, Math.sqrt(8) / 3)
			];
			var UBEdge = faceNorms[0].add(faceNorms[3], -1);
			faceVs = [7, UBEdge, UBEdge, 0, 7, UBEdge, UBEdge, 0];
			faceNames = ["U", "R", "L", "F", "D", "Bl", "Br", "B"];
			cornPow = 4;
		} else if (nface == 12) { // dodecahedron
			faceNorms = [
				new Point(0, Math.sqrt(5), 0)
			];
			for (var i = 0; i < 5; i++) {
				faceNorms.push(new Point(2 * Math.sin(0.4 * i * Math.PI), 1, 2 * Math.cos(0.4 * i * Math.PI)));
			}
			faceVs = [7, 0, 3, 7, 7, 4, 7, 0, 3, 7, 7, 4];
			faceNames = ["U", "F", "R", "Br", "Bl", "L", "D", "B", "Dbl", "Dl", "Dr", "Dbr"];
			facePow = 5;
		} else if (nface == 20) { // icosahedron
			for (var i = 0; i < 5; i++) {
				var r1 = Math.sqrt(5) + 1;
				var r2 = Math.sqrt(5) + 3;
				faceNorms.push(new Point(r1 * Math.sin(0.4 * i * Math.PI), Math.sqrt(5) + 2, r1 * Math.cos(0.4 * i * Math.PI)));
				faceNorms.push(new Point(r2 * Math.sin(0.4 * i * Math.PI), 1, r2 * Math.cos(0.4 * i * Math.PI)));
				faceVs[i * 2] = i * 2 + 11;
				faceVs[i * 2 + 1] = i * 2
				faceVs[i * 2 + 10] = i * 2 + 11;
				faceVs[i * 2 + 11] = i * 2
			}
			faceNames = ["U", "F", "Ur", "R", "Ubr", "Br", "Ubl", "Bl", "Ul", "L", "D", "B", "Dl", "Lb", "Dfl", "Fl", "Dfr", "Fr", "Dr", "Rb"];
			cornPow = 5;
		} else { // invalid input
			debugger;
		}
		if (nface != 4) {
			for (var i = 0, length = faceNorms.length; i < length; i++) {
				faceNorms[i] = faceNorms[i].normalized();
				faceNorms.push(faceNorms[i].scalar(-1));
			}
		}

		var facePlanes = [];
		for (var i = 0; i < faceNorms.length; i++) {
			facePlanes.push(new Plane(faceNorms[i]));
			if (typeof(faceVs[i]) == 'number') {
				faceVs[i] = faceNorms[faceVs[i]];
			}
		}

		var puzzle = new PolyhedronPuzzle(facePlanes, faceVs, faceNames);

		var twistyPlanes = [];
		var twistyDetails = [];

		function addAxes(norms, names, pow, cuts, moves) {
			if (!cuts || cuts.length == 0) {
				return;
			}
			if (!moves) {
				moves = [];
				for (var i = 0; i < cuts.length; i++) {
					moves[i] = i;
				}
			}
			for (var i = 0; i < norms.length; i++) {
				var planeBase = twistyPlanes.length;
				for (var j = 0; j < cuts.length; j++) {
					if (typeof(cuts[j]) == 'number') { // plane
						twistyPlanes.push(new Plane(norms[i], cuts[j]));
					} else { // sphere
						twistyPlanes.push(new Sphere(norms[i].scalar(cuts[j][0]), cuts[j][1], norms[i]));
					}
				}
				for (var j = 0; j < moves.length; j++) {
					var detail = [j + "" + names[i], pow];
					var planes = typeof(moves[j]) == 'number' ? [moves[j]] : moves[j];
					for (var k = 0; k < planes.length; k++) {
						detail.push(planes[k] + planeBase);
					}
					twistyDetails.push(detail);
				}
			}
		}

		addAxes(faceNorms, faceNames, facePow, faceCuts, faceMoves);

		if (edgeCuts && edgeCuts.length > 0) {
			var edgeNorms = [];
			var edgeNames = [];
			puzzle.enumFacesPolys(function(face, p, poly) {
				var _point = poly.paths.at(-1).p1;
				for (var i = 0; i < poly.paths.length; i++) {
					var point = poly.paths[i].p1;
					var edgeNorm = point.add(_point).normalized();
					for (var j = 0; j < edgeNorms.length; j++) {
						if (edgeNorm.abs(edgeNorms[j]) < EPS) {
							edgeNames[j] += faceNames[face];
							edgeNorm = null;
							break;
						}
					}
					if (edgeNorm) {
						edgeNorms.push(edgeNorm);
						edgeNames.push(faceNames[face]);
					}
					_point = point;
				}
			});
			addAxes(edgeNorms, edgeNames, edgePow, edgeCuts, edgeMoves);
		}
		if (cornCuts && cornCuts.length > 0) {
			var cornNorms = [];
			var cornNames = [];
			puzzle.enumFacesPolys(function(face, p, poly) {
				for (var i = 0; i < poly.paths.length; i++) {
					var cornNorm  = poly.paths[i].p1.normalized();
					for (var j = 0; j < cornNorms.length; j++) {
						if (cornNorm.abs(cornNorms[j]) < EPS) {
							cornNames[j] += faceNames[face];
							cornNorm = null;
							break;
						}
					}
					if (cornNorm) {
						cornNorms.push(cornNorm);
						cornNames.push(faceNames[face]);
					}
				}
			});
			addAxes(cornNorms, cornNames, cornPow, cornCuts, cornMoves);
		}

		puzzle.setTwisty(twistyPlanes, twistyDetails);

		DEBUG && console.log('[poly3dlib] create puzzle: ', puzzle);

		return puzzle;
	}

	// return [sizes, polys], polys = [ [xs, ys, face], ... ]
	function renderNet(puzzle, gap, minArea) {
		var faceTrans = [];
		var nface = puzzle.facePlanes.length;
		gap = gap || 0;
		var sizes = [0, 0];
		if (nface == 4) { // tetrahedron
			var hw = Math.sqrt(6) * (1 + gap);
			var hwdsq3 = hw / Math.sqrt(3);
			faceTrans = [
				[hw * 2, hwdsq3 * 4], [hw * 1, hwdsq3 * 1],
				[hw * 3, hwdsq3 * 1], [hw * 2, hwdsq3 * 2]
			];
			sizes = [hw * 4, hwdsq3 * 6];
		} else if (nface == 6) { // cube
			var hw = (1 + gap);
			faceTrans = [
				[hw * 3, hw], [hw * 5, hw * 3], [hw * 3, hw * 3],
				[hw * 3, hw * 5], [hw, hw * 3], [hw * 7, hw * 3]
			];
			sizes = [hw * 8, hw * 6];
		} else if (nface == 8) { // octahedron
			var hwdsq3 = Math.sqrt(6) * (1 + gap) / 2 / Math.sqrt(3);
			var sq3 = Math.sqrt(3);
			faceTrans = [
				[hwdsq3 * 3, hwdsq3 * 1, sq3, 1], [hwdsq3 * 5, hwdsq3 * 3, 1, sq3],
				[hwdsq3 * 1, hwdsq3 * 3, 1, sq3], [hwdsq3 * 3, hwdsq3 * 5, sq3, 1],
				[hwdsq3 * 9, hwdsq3 * 5, sq3, 1], [hwdsq3 * 11, hwdsq3 * 3, 1, sq3],
				[hwdsq3 * 7, hwdsq3 * 3, 1, sq3], [hwdsq3 * 9, hwdsq3 * 1, sq3, 1]
			];
			sizes = [hwdsq3 * 12, hwdsq3 * 6];
		} else if (nface == 12) { // dodecahedron
			var phi = (Math.sqrt(5) + 1) / 2;
			var hw = Math.sqrt(3 - phi) / Math.pow(phi, 2) * (1 + gap);
			var wec2 = hw * Math.tan(Math.PI * 0.3) * 2;
			var off1X = hw * (1 + 2 * phi);
			var off1Y = hw * (1 / Math.sin(Math.PI * 0.2) + Math.cos(Math.PI * 0.1) * 2);
			var off2X = hw * (4 + 5 * phi);
			var off2Y = wec2 + hw / Math.cos(Math.PI * 0.3);;
			faceTrans[0] = [off1X, off1Y];
			faceTrans[6] = [off2X, off2Y];
			for (var i = 0; i < 5; i++) {
				faceTrans[1 + i] = [off1X + Math.cos(Math.PI * (0.5 - 0.4 * i)) * wec2, off1Y + Math.sin(Math.PI * (0.5 - 0.4 * i)) * wec2];
				faceTrans[7 + i] = [off2X + Math.cos(Math.PI * (1.5 + 0.4 * i)) * wec2, off2Y + Math.sin(Math.PI * (1.5 + 0.4 * i)) * wec2];
			}
			sizes = [off1X + off2X, off1Y + off2Y];
		} else if (nface == 20) { // icosahedron
			var phi = (Math.sqrt(5) + 1) / 2;
			var hw = Math.sqrt(3) / Math.pow(phi, 2) * (1 + gap);
			for (var i = 0; i < 5; i++) {
				faceTrans[i * 2] = [((5 + i * 2) % 10 + 1) * hw, 2 * hw / Math.sqrt(3)];
				faceTrans[i * 2 + 1] = [((5 + i * 2) % 10 + 1) * hw, 4 * hw / Math.sqrt(3)];
				faceTrans[i * 2 + 10] = [(1 + i * 2) % 10 * hw, 7 * hw / Math.sqrt(3)];
				faceTrans[i * 2 + 11] = [(1 + i * 2) % 10 * hw, 5 * hw / Math.sqrt(3)];
			}
			sizes = [hw * 11, 9 * hw / Math.sqrt(3)];
		} else { // invalid input
			debugger;
		}
		var ret = [];
		var faceMeta = [];
		puzzle.enumFacesPolys(function(face, p, poly, idx) {
			if (poly.area < minArea) {
				return;
			}
			var cords = poly.projection(puzzle.faceUVs[face]);
			var trans = faceTrans[face];
			var arr = [[], []];
			for (var i = 0; i < cords.length; i++) {
				arr[0][i] = trans[0] + cords[i][0] * (trans[2] || 1);
				arr[1][i] = trans[1] - cords[i][1] * (trans[3] || 1);
			}
			arr[2] = face;
			ret[idx] = arr;
			faceMeta[face] = faceMeta[face] || [trans[0], trans[1], puzzle.faceNames[face]];
		});
		return [sizes, ret, faceMeta];
	}

	// parseFunc(m, p1, p2, ..) -> [layer, axis, pow] or null, toStrFunc(layer:int, axis:str, pow:int) -> moveString
	function makeParser(regexp, parseFunc, toStrFunc, preProcess) {
		return {
			parseScramble: function(regexp, parseFunc, preProcess, scramble) {
				if (!scramble || /^\s*$/.exec(scramble)) {
					return [];
				}
				if (preProcess) {
					scramble = preProcess(scramble);
				}
				var ret = [];
				scramble.replace(regexp, function() {
					var move = parseFunc.apply(null, arguments);
					if (move) {
						ret.push(["" + move[0] + move[1], move[2]]);
					}
				});
				return ret;
			}.bind(null, regexp, parseFunc, preProcess),
			move2str: function(toStrFunc, move) {
				var m = /^(\d+)([a-zA-Z]+)$/.exec(move[0]);
				if (!m) { // invalid move
					debugger;
					return "";
				}
				return toStrFunc(~~m[1], m[2], move[1]);
			}.bind(null, toStrFunc)
		}
	}

	function makePuzzleParser(puzzle) {
		return makeParser(/(?:^|\s*)(?:\[([a-zA-Z]+)(\d*)(')?\]|(\d*)([A-Z][a-zA-Z]*)(\d*)(')?)(?:$|\s*)/g, function(puzzle, m, p1, p2, p3, p4, p5, p6, p7) {
			var layer = p1 ? '0' : p4 == '' ? '1' : p4;
			var axis = p1 || p5;
			var pow = (p1 ? (p2 == '' ? 1 : ~~p2) : (p6 == '' ? 1 : ~~p6)) * ((p3 || p7) ? -1 : 1);
			var faces = axis.match(/[A-Z][a-z]*/g);
			if (puzzle.getTwistyIdx(layer + axis) != -1) {
				return [layer, axis, pow];
			}
		}.bind(null, puzzle), function(layer, axis, pow) {
			var move = axis + (Math.abs(pow) == 1 ? "" : Math.abs(pow)) + (pow < 0 ? "'" : "");
			return layer == 0 ? ('[' + move + ']') : move;
		});
	}

	function parsePolyParam(polyDef) {
		var paramCmd = polyDef.split(/\s+/g);
		var nFace = [4, 6, 8, 12, 20]['tcodi'.indexOf(paramCmd[0])];
		var polyParam = [nFace, [-5], [-5], [-5]];
		var cutIdx = 1;
		var m;
		for (var i = 1; i < paramCmd.length; i++) {
			if (/^[fev]$/.exec(paramCmd[i])) {
				cutIdx = ' fev'.indexOf(paramCmd[i]);
			} else if (/^[+-]?\d+(?:\.\d+)?$/.exec(paramCmd[i])) {
				polyParam[cutIdx].push(parseFloat(paramCmd[i]));
			} else if (/^\d+(?:\.\d+)?r[+-]?\d+(?:\.\d+)?$/.exec(paramCmd[i])) {
				var sphereCmd = paramCmd[i].split('r');
				polyParam[cutIdx].push([parseFloat(sphereCmd[0]), -parseFloat(sphereCmd[1])]);
			}
		}
		return polyParam;
	}

	function getFamousPuzzle(name, bindObj) {
		var polyParam, parser, scale = 1, pieceGap = 0.075, colors = [];
		if (/^(\d)\1\1$/.exec(name)) {
			var dim = /^(\d)\1\1$/.exec(name);
			dim = ~~dim[1];
			polyParam = [6, [-5]];
			for (var i = 0; i < (dim >> 1); i++) {
				polyParam[1].push(1 - (i + 1) * 2 / dim);
			}
		} else if (name == "pyr" || name == "mpyr") {
			polyParam = [4, [], [], {
				"pyr": [-5, 5/3, 1/3],
				"mpyr": [-5, 2, 1, 0]
			}[name]];
			scale = 0.51;
			pieceGap = 0.14;
			parser = makeParser(/(?:^|\s*)(?:([URLBurlb])(w?)(')?|\[([urlb])(')?\])(?:$|\s*)/g, function(m, p1, p2, p3, p4, p5) {
				var face = ["LRF", "DRF", "DLF", "DLR"]["URLB".indexOf((p1 || p4).toUpperCase())];
				return [p4 ? 0 : p2 ? 3 : p1 == p1.toUpperCase() ? 2 : 1, face, (p3 || p5) ? -1 : 1];
			}, function(layer, axis, pow) {
				var move = "urlb".charAt(["LRF", "DRF", "DLF", "DLR"].indexOf(axis));
				var powfix = pow < 0 ? "'" : "";
				return ["[" + move + powfix + "]", move + powfix, move.toUpperCase() + powfix, move.toUpperCase() + 'w' + powfix][layer];
			});
		} else if (name == "fto" || name == "dmd") {
			polyParam = {
				"fto": [8, [-5, 1/3, -1/3], [], [-5]],
				"dmd": [8, [-5, 0], [], [-5]]
			}[name];
			parser = makeParser(/(?:^|\s*)\[?([URFDLT]|(?:B[RL]?))(w)?(')?(\])?(?:$|\s*)/g, function(m, p1, p2, p3, p4) {
				return [p4 || p1 == 'T' ? 0 : p2 ? 2 : 1, p1 == 'T' ? 'URLF' : (p1[0] + p1.slice(1).toLowerCase()), p3 ? -1 : 1];
			}, function(layer, axis, pow) {
				var move = (axis.length > 3 ? 'T' : axis.toUpperCase()) + (layer == 2 ? 'w' : '') + (pow > 0 ? "" : "'");
				return layer == 0 ? ('[' + move + ']') : move;
			});
		} else if (name == "klm" || name == "mgm" || name == "prc" || name == "giga") {
			polyParam = [12, {
				"klm": [-5, 0.57, -0.57],
				"mgm": [-5, 0.72, -0.72],
				"giga": [-5, 0.83, -0.83, 0.66, -0.66],
				"prc": [-5, 0.4472136, -0.4472136]
			}[name]];
			scale = 1.18;
			pieceGap = 0.05;
			parser = makeParser(/(?:^|\s*)(?:([DLRdlr])(\+\+?|--?)|([UuFfy]|D?B?[RL]|d?b?[rl]|[DdBb])(\d?)('?)|\[([ufrl])(\d?)('?)\])(?:$|\s*)/g, function(m, p1, p2, p3, p4, p5, p6, p7, p8) {
				if (p1) {
					var fidx = "DLRdlr".indexOf(p1);
					return [fidx > 2 ? 4 : 2, ["D", "Dbl", "Dbr"][fidx % 3], (p2[0] == '-' ? -1 : 1) * p2.length];
				} else if (p3) {
					var pow = (p5 ? -1 : 1) * (~~p4 || 1);
					return p3[0] == 'y' ? [0, 'U', pow] :
						[p3[0] >= 'a' ? 3 : 1, p3[0].toUpperCase() + p3.slice(1).toLowerCase(), pow];
				} else {
					return [0, p6.toUpperCase(), (p8 ? -1 : 1) * (~~p7 || 1)];
				}
			}, function(layer, axis, pow) {
				pow = (pow + 7) % 5 - 2;
				var powfix = (Math.abs(pow) == 1 ? "" : Math.abs(pow)) + (pow >= 0 ? "" : "'");
				if (layer == 0) {
					return "[" + axis.toLowerCase() + powfix + "]";
				} else if (layer == 2 || layer == 4) {
					powfix = pow > 0 ? "+" : "-";
					axis = "DLR".charAt(["D", "Dbl", "Dbr"].indexOf(axis));
					return (layer == 4 ? axis.toLowerCase() : axis) + powfix + (Math.abs(pow) == 2 ? powfix : '');
				} else if (layer == 1) {
					return axis.toUpperCase() + powfix;
				} else if (layer == 3) {
					return axis.toLowerCase() + powfix;
				}
			}, function(scramble) {
				if (/^(\s*([+-]{2}\s*)+U'?\s*\n?)*$/.exec(scramble)) {
					scramble = tools.carrot2poch(scramble);
				}
				return scramble;
			});
		} else if (name == "heli" || name == "helicv" || name == "heli2x2") {
			polyParam = {
				"heli": [6, [-5], [-5, Math.sqrt(0.5)], [-5]],
				"helicv": [6, [-5], [-5, [2 * Math.sqrt(2), -Math.sqrt(5)]], [-5]],
				"heli2x2": [6, [-5, 0], [-5, [Math.sqrt(2), -0.6]], [-5, [Math.sqrt(3), -0.7]]]
			}[name];
			pieceGap = 0.05;
		} else if (/^crz3a$/.exec(name)) {
			polyParam = [6, [-5, 0.3333, [1, 0.75]], [], [], [0, [1, 2]]];
			parser = makeParser(/(?:^|\s*)([URFDLBxyz])(\d*)(')?(?:$|\s*)/g, function(m, p1, p2, p3) {
				var pow = (p2 == '' ? 1 : ~~p2) * (p3 ? -1 : 1);
				if ("xyz".indexOf(p1) != -1) {
					return [0, "RUF".charAt("xyz".indexOf(p1)), pow];
				}
				return [1, p1, pow];
			}, function(layer, axis, pow) {
				var powfix = (Math.abs(pow) == 1 ? "" : Math.abs(pow)) + (pow >= 0 ? "" : "'");
				return (layer == 0 ? "xyz".charAt("RUF".indexOf(axis)) : axis) + powfix;
			});
		} else if (/^(redi|dino)$/.exec(name)) {
			polyParam = name == 'redi' ? [6, [-5], [], [-5, 0.85]] : [6, [-5], [], [-5, Math.sqrt(1/3)]];
			var rediShort = 'FLBRflbrxyz';
			var rediLong = ['URF', 'UFL', 'ULB', 'URB', 'RFD', 'FDL', 'DLB', 'RDB', 'R', 'U', 'F'];
			parser = makeParser(/(?:^|\s*)([FLBRflbrxyz])(')?(?:$|\s*)/g, function(m, p1, p2, p3) {
				var midx = rediShort.indexOf(p1);
				return [midx >= 8 ? 0 : 1, rediLong[midx], p2 ? -1 : 1];
			}, function(layer, axis, pow) {
				return rediShort.charAt(rediLong.indexOf(axis)) + (pow >= 0 ? "" : "'");
			}, function(scramble) {
				if (/^(([LR]'? ){3,}x ){3,}/.exec(scramble)) {
					return scramble.replace(/L/g, 'B');
				}
				return scramble;
			});
		} else if (/^skb$/.exec(name)) {
			polyParam = [6, [-5], [], [-5, 0]];
			var skbShort = 'FlUrDLBRxyz';
			var skbLong = ['URF', 'UFL', 'ULB', 'URB', 'RFD', 'FDL', 'DLB', 'RDB', 'R', 'U', 'F'];
			parser = makeParser(/(?:^|\s*)([FlUrDLBRxyz])(')?(?:$|\s*)/g, function(m, p1, p2, p3) {
				var midx = skbShort.indexOf(p1);
				return [midx >= 8 ? 0 : 1, skbLong[midx], p2 ? -1 : 1];
			}, function(layer, axis, pow) {
				return skbShort.charAt(skbLong.indexOf(axis)) + (pow >= 0 ? "" : "'");
			});
		} else if (name == 'ctico') {
			polyParam = [20, [], [], [-5, 0]];
		} else {
			return null;
		}
		var nFace = polyParam[0];
		if (nFace == 4) {
			colors = $.col2std(kernel.getProp("colpyr"), [3, 1, 2, 0]);
		} else if (nFace == 6) {
			colors = $.col2std(kernel.getProp("colcube"), [3, 4, 5, 0, 1, 2]);
		} else if (nFace == 8) {
			colors = $.col2std(kernel.getProp("colfto"), [0, 3, 1, 2, 6, 7, 5, 4]);
		} else if (nFace == 12) {
			colors = $.col2std(kernel.getProp("colmgm"), [0, 2, 1, 5, 4, 3, 11, 9, 8, 7, 6, 10]);
		} else if (nFace == 20) {
			colors = $.col2std(kernel.getProp("colico"), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
		}

		bindObj = bindObj || {};
		bindObj.parser = parser;
		bindObj.polyParam = polyParam;
		bindObj.scale = (bindObj.scale || 1) * scale;
		bindObj.pieceGap = pieceGap;
		bindObj.colors = colors;
		return bindObj;
	}

	return {
		Point: Point,
		RotTrans: RotTrans,
		Plane: Plane,
		Sphere: Sphere,
		Segment: Segment,
		Arc: Arc,
		Polygon: Polygon,
		makePuzzle: makePuzzle,
		renderNet: renderNet,
		makeParser: makeParser,
		makePuzzleParser: makePuzzleParser,
		getFamousPuzzle: getFamousPuzzle,
		udpolyre: new RegExp("^(" + $.UDPOLY_RE + ")$"),
		parsePolyParam: parsePolyParam
	}
})();
