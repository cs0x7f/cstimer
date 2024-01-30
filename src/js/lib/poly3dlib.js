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

	// assert points.length >= 3
	function Polygon(points) {
		this.vertices = points.slice();
		this.area = 0;
		var x = 0, y = 0, z = 0;
		for (var i = 2; i < points.length; i++) {
			var area = points[0].triangleArea(points[i - 1], points[i]);
			x += (points[0].x + points[i].x + points[i - 1].x) * area / 3;
			y += (points[0].y + points[i].y + points[i - 1].y) * area / 3;
			z += (points[0].z + points[i].z + points[i - 1].z) * area / 3;
			this.area += area;
		}
		this.center = new Point(x / this.area, y / this.area, z / this.area);
	}

	_ = Polygon.prototype;

	_.projection = function(norms) {
		var ret = [];
		for (var i = 0; i < this.vertices.length; i++) {
			var coord = [];
			for (var j = 0; j < norms.length; j++) {
				coord.push(this.vertices[i].inprod(norms[j]));
			}
			ret.push(coord);
		}
		return ret;
	}

	_.split = function(pl) {
		var thres = this.center.inprod(pl.norm) > pl.dis ? -EPS : EPS;
		var _point = this.vertices[this.vertices.length - 1];
		var _prod = _point.inprod(pl.norm) - pl.dis - thres;
		var polys = [[], []];
		for (var i = 0; i < this.vertices.length; i++) { // check segment (vertices[i-1], vertices[i])
			var point = this.vertices[i];
			var prod = point.inprod(pl.norm) - pl.dis - thres;
			if (prod * _prod < 0) { // cross the plane, split the segment
				var lambda = -(_prod + thres) / (prod - _prod);
				if (Math.abs(lambda) < EPS) { // cross at _point
					polys[prod > 0 ? 0 : 1].push(_point);
				} else if (Math.abs(1 - lambda) < EPS) { // cross at point
					polys[prod > 0 ? 1 : 0].push(point);
				} else {
					var crossPoint = _point.scalar(1 - lambda).add(point, lambda);
					polys[0].push(crossPoint);
					polys[1].push(crossPoint);
				}
			}
			_point = point;
			_prod = prod;
			polys[prod > 0 ? 0 : 1].push(point);
		}
		polys[0] = polys[0].length >= 3 ? new Polygon(polys[0]) : null;
		polys[1] = polys[1].length >= 3 ? new Polygon(polys[1]) : null;
		return polys;
	}

	_.trim = function(gap) {
		var toCutPlanes = [];
		var _point = this.vertices[this.vertices.length - 1];
		var polyNorm = this.vertices[0].add(_point, -1).outprod(this.vertices[1].add(this.vertices[0], -1)).normalized();
		var poly = this;
		for (var i = 0; i < this.vertices.length; i++) { // check segment (vertices[i-1], vertices[i])
			var point = this.vertices[i];
			var norm = point.add(_point, -1).outprod(polyNorm).normalized();
			var dis = norm.inprod(point);
			poly = poly.split(new Plane(norm, dis - gap / 2))[1];
			if (!poly) {
				return null;
			}
			_point = point;
		}
		return poly;
	}

	// facePlanes = [plane1, plane2, ..., planeN]
	function PolyhedronPuzzle(facePlanes, faceVs) {
		this.facePlanes = facePlanes.slice();
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
	// twistyDetails = [[name1, maxPow1], [name2, maxPow2], ...]
	_.setTwisty = function(twistyPlanes, twistyDetails) {
		this.twistyPlanes = twistyPlanes.slice();
		this.twistyDetails = twistyDetails.slice();
		this.cutFacePolygons();
		this.makeMoveTable();
	}

	_.makeFacePolygons = function() {
		this.facesPolys = [];
		for (var face = 0; face < this.facePlanes.length; face++) {
			var norm = this.facePlanes[face].norm;
			var dis = this.facePlanes[face].dis;
			var faceCenter = norm.scalar(dis);
			var faceUV = this.faceUVs[face];
			var poly = new Polygon([
				faceCenter.add(faceUV[0], 100),
				faceCenter.add(faceUV[1], 100),
				faceCenter.add(faceUV[0], -100),
				faceCenter.add(faceUV[1], -100)
			]);
			for (var fother = 0; fother < this.facePlanes.length; fother++) {
				if (fother == face) {
					continue;
				}
				poly = poly.split(this.facePlanes[fother])[1];
				if (!poly) { // all area in the plane is cut out, input is incorrect
					debugger
					break;
				}
			}
			this.facesPolys[face] = [poly];
		}
	}

	_.cutFacePolygons = function() {
		for (var i = 0; i < this.twistyPlanes.length; i++) {
			var plane = this.twistyPlanes[i];
			this.enumFacesPolys(function(face, p, poly) {
				poly = poly.split(plane);
				if (poly[0] != null & poly[1] != null) { // cut into two polys
					this.facesPolys[face][p] = poly[0];
					this.facesPolys[face].push(poly[1]);
				}
			}.bind(this));
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
		for (var i = 0; i < this.twistyPlanes.length; i++) {
			var curMove = [];
			var curPlane = this.twistyPlanes[i];
			var trans = new RotTrans(curPlane.norm, Math.PI * 2 / this.twistyDetails[i][1]);
			this.enumFacesPolys(function(face, p, poly, idx) {
				if (curPlane.norm.inprod(poly.center) < curPlane.dis) {
					curMove[idx] = idx; // not affect by this twistyPlane
					return;
				}
				var movedCenter = trans.perform(poly.center);
				this.enumFacesPolys(function(face2, p2, poly2, idx2) {
					if (movedCenter.abs(poly2.center) < EPS) {
						curMove[idx] = idx2;
						return true;
					}
				});
			}.bind(this));
			this.moveTable.push(curMove);
		}
	}

	function makePuzzle(nface, faceCuts, edgeCuts, cornCuts) {
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
			//TODO
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

		var puzzle = new PolyhedronPuzzle(facePlanes, faceVs);

		var twistyPlanes = [];
		var twistyDetails = [];

		if (faceCuts && faceCuts.length > 0) {
			for (var i = 0; i < faceNorms.length; i++) {
				for (var j = 0; j < faceCuts.length; j++) {
					twistyPlanes.push(new Plane(faceNorms[i], faceCuts[j]));
					twistyDetails.push([j + "" + faceNames[i], facePow]);
				}
			}
		}
		if (edgeCuts && edgeCuts.length > 0) {
			var edgeNorms = [];
			var edgeNames = [];
			puzzle.enumFacesPolys(function(face, p, poly) {
				var _point = poly.vertices[poly.vertices.length - 1];
				for (var i = 0; i < poly.vertices.length; i++) {
					var point = poly.vertices[i];
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
			for (var i = 0; i < edgeNorms.length; i++) {
				for (var j = 0; j < edgeCuts.length; j++) {
					twistyPlanes.push(new Plane(edgeNorms[i], edgeCuts[j]));
					twistyDetails.push([j + "" + edgeNames[i], edgePow]);
				}
			}
		}
		if (cornCuts && cornCuts.length > 0) {
			var cornNorms = [];
			var cornNames = [];
			puzzle.enumFacesPolys(function(face, p, poly) {
				for (var i = 0; i < poly.vertices.length; i++) {
					var cornNorm  = poly.vertices[i].normalized();
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
			for (var i = 0; i < cornNorms.length; i++) {
				for (var j = 0; j < cornCuts.length; j++) {
					twistyPlanes.push(new Plane(cornNorms[i], cornCuts[j]));
					twistyDetails.push([j + "" + cornNames[i], cornPow]);
				}
			}
		}

		puzzle.setTwisty(twistyPlanes, twistyDetails);

		return puzzle;
	}

	// return [sizes, polys], polys = [ [xs, ys, face], ... ]
	function renderNet(puzzle, gap, minArea) {
		var faceOffs = [];
		var nface = puzzle.facePlanes.length;
		gap = gap || 0;
		var sizes = [0, 0];
		if (nface == 4) { // tetrahedron
			var hw = Math.sqrt(6) * (1 + gap);
			var hwdsq3 = hw / Math.sqrt(3);
			faceOffs = [
				[hw * 2, hwdsq3 * 4], [hw * 1, hwdsq3 * 1],
				[hw * 3, hwdsq3 * 1], [hw * 2, hwdsq3 * 2]
			];
			sizes = [hw * 4, hwdsq3 * 6];
		} else if (nface == 6) { // cube
			var hw = (1 + gap);
			faceOffs = [
				[hw * 3, hw], [hw * 5, hw * 3], [hw * 3, hw * 3],
				[hw * 3, hw * 5], [hw, hw * 3], [hw * 7, hw * 3]
			];
			sizes = [hw * 8, hw * 6];
		} else if (nface == 8) { // octahedron
			var hwdsq3 = Math.sqrt(6) * (1 + gap) / 2 / Math.sqrt(3);
			faceOffs = [
				[hwdsq3 * 3, hwdsq3 * 1], [hwdsq3 * 5, hwdsq3 * 3],
				[hwdsq3 * 1, hwdsq3 * 3], [hwdsq3 * 3, hwdsq3 * 5],
				[hwdsq3 * 9, hwdsq3 * 5], [hwdsq3 * 11, hwdsq3 * 3],
				[hwdsq3 * 7, hwdsq3 * 3], [hwdsq3 * 9, hwdsq3 * 1]
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
			faceOffs = [];
			faceOffs[0] = [off1X, off1Y];
			faceOffs[6] = [off2X, off2Y];
			for (var i = 0; i < 5; i++) {
				faceOffs[1 + i] = [off1X + Math.cos(Math.PI * (0.5 - 0.4 * i)) * wec2, off1Y + Math.sin(Math.PI * (0.5 - 0.4 * i)) * wec2];
				faceOffs[7 + i] = [off2X + Math.cos(Math.PI * (1.5 + 0.4 * i)) * wec2, off2Y + Math.sin(Math.PI * (1.5 + 0.4 * i)) * wec2];
			}
			sizes = [off1X + off2X, off1Y + off2Y];
		} else if (nface == 20) { // icosahedron
			//TODO
		} else { // invalid input
			debugger;
		}
		var ret = [];
		puzzle.enumFacesPolys(function(face, p, poly, idx) {
			if (poly.area < minArea) {
				return;
			}
			var cords = poly.projection(puzzle.faceUVs[face]);
			var arr = [[], []];
			for (var i = 0; i < cords.length; i++) {
				arr[0][i] = faceOffs[face][0] + cords[i][0];
				arr[1][i] = faceOffs[face][1] - cords[i][1];
			}
			arr[2] = face;
			ret[idx] = arr;
		});
		return [sizes, ret];
	}

	return {
		makePuzzle: makePuzzle,
		renderNet: renderNet
	}
})();
