/*

scramble_sq1.js

Square-1 Solver / Scramble Generator in Javascript.

Ported from PPT, written Walter Souza: https://bitbucket.org/walter/puzzle-timer/src/7049018bbdc7/src/com/puzzletimer/solvers/Square1Solver.java
Ported by Lucas Garron, November 16, 2011.

TODO:
- Try to ini using pregenerated JSON.
- Try to optimize arrays (byte arrays?).

*/
"use strict";

(function(set8Perm, get8Perm, circle, rn) {

	function FullCube_copy(obj, c) {
		obj.ul = c.ul;
		obj.ur = c.ur;
		obj.dl = c.dl;
		obj.dr = c.dr;
		obj.ml = c.ml;
	}

	function FullCube_doMove(obj, move) {
		var temp;
		move <<= 2;
		if (move > 24) {
			move = 48 - move;
			temp = obj.ul;
			obj.ul = (obj.ul >> move | obj.ur << 24 - move) & 16777215;
			obj.ur = (obj.ur >> move | temp << 24 - move) & 16777215;
		} else if (move > 0) {
			temp = obj.ul;
			obj.ul = (obj.ul << move | obj.ur >> 24 - move) & 16777215;
			obj.ur = (obj.ur << move | temp >> 24 - move) & 16777215;
		} else if (move == 0) {
			temp = obj.ur;
			obj.ur = obj.dl;
			obj.dl = temp;
			obj.ml = 1 - obj.ml;
		} else if (move >= -24) {
			move = -move;
			temp = obj.dl;
			obj.dl = (obj.dl << move | obj.dr >> 24 - move) & 16777215;
			obj.dr = (obj.dr << move | temp >> 24 - move) & 16777215;
		} else if (move < -24) {
			move = 48 + move;
			temp = obj.dl;
			obj.dl = (obj.dl >> move | obj.dr << 24 - move) & 16777215;
			obj.dr = (obj.dr >> move | temp << 24 - move) & 16777215;
		}
	}

	function FullCube_getParity(obj) {
		var a, b, cnt, i, p;
		cnt = 0;
		obj.arr[0] = FullCube_pieceAt(obj, 0);
		for (i = 1; i < 24; ++i) {
			FullCube_pieceAt(obj, i) != obj.arr[cnt] && (obj.arr[++cnt] = FullCube_pieceAt(obj, i));
		}
		p = 0;
		for (a = 0; a < 16; ++a) {
			for (b = a + 1; b < 16; ++b) {
				obj.arr[a] > obj.arr[b] && (p ^= 1);
			}
		}
		return p;
	}

	function FullCube_getShapeIdx(obj) {
		var dlx, drx, ulx, urx;
		urx = obj.ur & 1118481;
		urx |= urx >> 3;
		urx |= urx >> 6;
		urx = urx & 15 | urx >> 12 & 48;
		ulx = obj.ul & 1118481;
		ulx |= ulx >> 3;
		ulx |= ulx >> 6;
		ulx = ulx & 15 | ulx >> 12 & 48;
		drx = obj.dr & 1118481;
		drx |= drx >> 3;
		drx |= drx >> 6;
		drx = drx & 15 | drx >> 12 & 48;
		dlx = obj.dl & 1118481;
		dlx |= dlx >> 3;
		dlx |= dlx >> 6;
		dlx = dlx & 15 | dlx >> 12 & 48;
		return Shape_getShape2Idx(FullCube_getParity(obj) << 24 | ulx << 18 | urx << 12 | dlx << 6 | drx);
	}

	function FullCube_getSquare(obj, sq) {
		var a, b;
		for (a = 0; a < 8; ++a) {
			obj.prm[a] = FullCube_pieceAt(obj, a * 3 + 1) >> 1;
		}
		sq.cornperm = get8Perm(obj.prm);
		sq.topEdgeFirst = FullCube_pieceAt(obj, 0) == FullCube_pieceAt(obj, 1);
		a = sq.topEdgeFirst ? 2 : 0;
		for (b = 0; b < 4; a += 3, ++b)
			obj.prm[b] = FullCube_pieceAt(obj, a) >> 1;
		sq.botEdgeFirst = FullCube_pieceAt(obj, 12) == FullCube_pieceAt(obj, 13);
		a = sq.botEdgeFirst ? 14 : 12;
		for (; b < 8; a += 3, ++b)
			obj.prm[b] = FullCube_pieceAt(obj, a) >> 1;
		sq.edgeperm = get8Perm(obj.prm);
		sq.ml = obj.ml;
	}

	function FullCube_pieceAt(obj, idx) {
		var ret;
		idx < 6 ? (ret = obj.ul >> (5 - idx << 2)) : idx < 12 ? (ret = obj.ur >> (11 - idx << 2)) : idx < 18 ? (ret = obj.dl >> (17 - idx << 2)) : (ret = obj.dr >> (23 - idx << 2));
		return (ret & 15);
	}

	function FullCube_setPiece(obj, idx, value) {
		if (idx < 6) {
			obj.ul &= ~(0xf << ((5 - idx) << 2));
			obj.ul |= value << ((5 - idx) << 2);
		} else if (idx < 12) {
			obj.ur &= ~(0xf << ((11 - idx) << 2));
			obj.ur |= value << ((11 - idx) << 2);
		} else if (idx < 18) {
			obj.dl &= ~(0xf << ((17 - idx) << 2));
			obj.dl |= value << ((17 - idx) << 2);
		} else {
			obj.dr &= ~(0xf << ((23 - idx) << 2));
			obj.dr |= value << ((23 - idx) << 2);
		}
	}

	function FullCube_FullCube__Ljava_lang_String_2V() {
		this.arr = [];
		this.prm = [];
	}

	function FullCube_randomEP() {
		var f, i, shape, edge, n_edge, n_corner, rnd, m;
		f = new FullCube_FullCube__Ljava_lang_String_2V;
		shape = Shape_ShapeIdx[FullCube_getShapeIdx(f) >> 1];
		edge = 0x01234567 << 1;
		n_edge = 8;
		for (i = 0; i < 24; i++) {
			if (((shape >> i) & 1) == 0) { //edge
				rnd = rn(n_edge) << 2;
				FullCube_setPiece(f, 23 - i, (edge >> rnd) & 0xf);
				m = (1 << rnd) - 1;
				edge = (edge & m) + ((edge >> 4) & ~m);
				--n_edge;
			} else {
				++i;
			}
		}
		f.ml = rn(2);
		return f;
	}

	function FullCube_randomCube(indice) {
		var f, i, shape, edge, corner, n_edge, n_corner, rnd, m;
		if (indice === undefined) {
			indice = rn(3678);
		}
		f = new FullCube_FullCube__Ljava_lang_String_2V;
		shape = Shape_ShapeIdx[indice];
		corner = 0x01234567 << 1 | 0x11111111;
		edge = 0x01234567 << 1;
		n_corner = n_edge = 8;
		for (i = 0; i < 24; i++) {
			if (((shape >> i) & 1) == 0) { //edge
				rnd = rn(n_edge) << 2;
				FullCube_setPiece(f, 23 - i, (edge >> rnd) & 0xf);
				m = (1 << rnd) - 1;
				edge = (edge & m) + ((edge >> 4) & ~m);
				--n_edge;
			} else { //corner
				rnd = rn(n_corner) << 2;
				FullCube_setPiece(f, 23 - i, (corner >> rnd) & 0xf);
				FullCube_setPiece(f, 22 - i, (corner >> rnd) & 0xf);
				m = (1 << rnd) - 1;
				corner = (corner & m) + ((corner >> 4) & ~m);
				--n_corner;
				++i;
			}
		}
		f.ml = rn(2);
		return f;
	}

	function FullCube() {}

	var _ = FullCube_FullCube__Ljava_lang_String_2V.prototype = FullCube.prototype;
	_.dl = 10062778;
	_.dr = 14536702;
	_.ml = 0;
	_.ul = 70195;
	_.ur = 4544119;

	function Search_init2(obj) {
		var corner, edge, i, j, ml, prun;
		FullCube_copy(obj.Search_d, obj.Search_c);
		for (i = 0; i < obj.Search_length1; ++i) {
			FullCube_doMove(obj.Search_d, obj.Search_move[i]);
		}
		FullCube_getSquare(obj.Search_d, obj.Search_sq);
		edge = obj.Search_sq.edgeperm;
		corner = obj.Search_sq.cornperm;
		ml = obj.Search_sq.ml;
		prun = Math.max(SquarePrun[obj.Search_sq.edgeperm << 1 | ml], SquarePrun[obj.Search_sq.cornperm << 1 | ml]);
		for (i = prun; i < obj.Search_maxlen2; ++i) {
			if (Search_phase2(obj, edge, corner, obj.Search_sq.topEdgeFirst, obj.Search_sq.botEdgeFirst, ml, i, obj.Search_length1, 0)) {
				for (j = 0; j < i; ++j) {
					FullCube_doMove(obj.Search_d, obj.Search_move[obj.Search_length1 + j]);
				}
				obj.Search_sol_string = Search_move2string(obj, i + obj.Search_length1);
				return true;
			}
		}
		return false;
	}

	function Search_move2string(obj, len) {
		var s = "";
		var top = 0,
			bottom = 0;
		for (var i = len - 1; i >= 0; i--) {
			var val = obj.Search_move[i];
			if (i == obj.Search_length1 - 1 && obj.sq1lvcb) {
				s += "//";
			}
			//console.log(val);
			if (val > 0) {
				val = 12 - val;
				top = (val > 6) ? (val - 12) : val;
			} else if (val < 0) {
				val = 12 + val;
				bottom = (val > 6) ? (val - 12) : val;
			} else {
				if (top == 0 && bottom == 0) {
					s += "/"
				} else {
					s += " (" + top + "," + bottom + ")/";
				}
				top = bottom = 0;
			}
		}
		if (top == 0 && bottom == 0) {} else {
			s += " (" + top + "," + bottom + ") ";
		}
		return s; // + " (" + len + "t)";
	}

	function Search_phase1(obj, shape, prunvalue, maxl, depth, lm) {
		var m, prunx, shapex;
		if (prunvalue == 0 && maxl < 4) {
			return maxl == 0 && Search_init2(obj);
		}
		if (lm != 0) {
			shapex = Shape_TwistMove[shape];
			prunx = ShapePrun[shapex];
			if (prunx < maxl) {
				obj.Search_move[depth] = 0;
				if (Search_phase1(obj, shapex, prunx, maxl - 1, depth + 1, 0)) {
					return true;
				}
			}
		}
		shapex = shape;
		if (lm <= 0) {
			m = 0;
			while (true) {
				m += Shape_TopMove[shapex];
				shapex = m >> 4;
				m &= 15;
				if (m >= 12) {
					break;
				}
				prunx = ShapePrun[shapex];
				if (prunx > maxl) {
					break;
				} else if (prunx < maxl) {
					obj.Search_move[depth] = m;
					if (Search_phase1(obj, shapex, prunx, maxl - 1, depth + 1, 1)) {
						return true;
					}
				}
			}
		}
		shapex = shape;
		if (lm <= 1) {
			m = 0;
			while (true) {
				m += Shape_BottomMove[shapex];
				shapex = m >> 4;
				m &= 15;
				if (m >= 6) {
					break;
				}
				prunx = ShapePrun[shapex];
				if (prunx > maxl) {
					break;
				} else if (prunx < maxl) {
					obj.Search_move[depth] = -m;
					if (Search_phase1(obj, shapex, prunx, maxl - 1, depth + 1, 2)) {
						return true;
					}
				}
			}
		}
		return false;
	}

	function Search_phase2(obj, edge, corner, topEdgeFirst, botEdgeFirst, ml, maxl, depth, lm) {
		var botEdgeFirstx, cornerx, edgex, m, prun1, prun2, topEdgeFirstx;
		if (maxl == 0 && !topEdgeFirst && botEdgeFirst) {
			return true;
		}
		if (lm != 0 && topEdgeFirst == botEdgeFirst) {
			edgex = Square_TwistMove[edge];
			cornerx = Square_TwistMove[corner];
			if (SquarePrun[edgex << 1 | 1 - ml] < maxl && SquarePrun[cornerx << 1 | 1 - ml] < maxl) {
				obj.Search_move[depth] = 0;
				if (Search_phase2(obj, edgex, cornerx, topEdgeFirst, botEdgeFirst, 1 - ml, maxl - 1, depth + 1, 0)) {
					return true;
				}
			}
		}
		if (lm <= 0) {
			topEdgeFirstx = !topEdgeFirst;
			edgex = topEdgeFirstx ? Square_TopMove[edge] : edge;
			cornerx = topEdgeFirstx ? corner : Square_TopMove[corner];
			m = topEdgeFirstx ? 1 : 2;
			prun1 = SquarePrun[edgex << 1 | ml];
			prun2 = SquarePrun[cornerx << 1 | ml];
			while (m < 12 && prun1 <= maxl && prun1 <= maxl) {
				if (prun1 < maxl && prun2 < maxl) {
					obj.Search_move[depth] = m;
					if (Search_phase2(obj, edgex, cornerx, topEdgeFirstx, botEdgeFirst, ml, maxl - 1, depth + 1, 1)) {
						return true;
					}
				}
				topEdgeFirstx = !topEdgeFirstx;
				if (topEdgeFirstx) {
					edgex = Square_TopMove[edgex];
					prun1 = SquarePrun[edgex << 1 | ml];
					m += 1;
				} else {
					cornerx = Square_TopMove[cornerx];
					prun2 = SquarePrun[cornerx << 1 | ml];
					m += 2;
				}
			}
		}
		if (lm <= 1) {
			botEdgeFirstx = !botEdgeFirst;
			edgex = botEdgeFirstx ? Square_BottomMove[edge] : edge;
			cornerx = botEdgeFirstx ? corner : Square_BottomMove[corner];
			m = botEdgeFirstx ? 1 : 2;
			prun1 = SquarePrun[edgex << 1 | ml];
			prun2 = SquarePrun[cornerx << 1 | ml];
			while (m < (maxl > 6 ? 6 : 12) && prun1 <= maxl && prun1 <= maxl) {
				if (prun1 < maxl && prun2 < maxl) {
					obj.Search_move[depth] = -m;
					if (Search_phase2(obj, edgex, cornerx, topEdgeFirst, botEdgeFirstx, ml, maxl - 1, depth + 1, 2)) {
						return true;
					}
				}
				botEdgeFirstx = !botEdgeFirstx;
				if (botEdgeFirstx) {
					edgex = Square_BottomMove[edgex];
					prun1 = SquarePrun[edgex << 1 | ml];
					m += 1;
				} else {
					cornerx = Square_BottomMove[cornerx];
					prun2 = SquarePrun[cornerx << 1 | ml];
					m += 2;
				}
			}
		}
		return false;
	}

	function Search_solution(obj, c) {
		var shape;
		obj.Search_c = c;
		shape = FullCube_getShapeIdx(c);
		//console.log(shape);
		for (obj.Search_length1 = ShapePrun[shape]; obj.Search_length1 < 100; ++obj.Search_length1) {
			//console.log(obj.Search_length1);
			obj.Search_maxlen2 = Math.min(32 - obj.Search_length1, 17);
			if (Search_phase1(obj, shape, ShapePrun[shape], obj.Search_length1, 0, -1)) {
				break;
			}
		}
		return obj.Search_sol_string;
	}

	function Search_Search() {
		this.Search_move = [];
		this.Search_d = new FullCube_FullCube__Ljava_lang_String_2V;
		this.Search_sq = new Square_Square;
	}

	function Search() {}

	_ = Search_Search.prototype = Search.prototype;
	_.Search_c = null;
	_.Search_length1 = 0;
	_.Search_maxlen2 = 0;
	_.Search_sol_string = null;

	function Shape_$clinit() {
		Shape_$clinit = $.noop;
		Shape_halflayer = [0, 3, 6, 12, 15, 24, 27, 30, 48, 51, 54, 60, 63];
		Shape_ShapeIdx = [];
		ShapePrun = [];
		Shape_TopMove = [];
		Shape_BottomMove = [];
		Shape_TwistMove = [];
		Shape_init();
	}

	function Shape_bottomMove(obj) {
		var move, moveParity;
		move = 0;
		moveParity = 0;
		do {
			if ((obj.bottom & 2048) == 0) {
				move += 1;
				obj.bottom = obj.bottom << 1;
			} else {
				move += 2;
				obj.bottom = obj.bottom << 2 ^ 12291;
			}
			moveParity = 1 - moveParity;
		}
		while ((bitCount(obj.bottom & 63) & 1) != 0);
		(bitCount(obj.bottom) & 2) == 0 && (obj.Shape_parity ^= moveParity);
		return move;
	}

	function Shape_getIdx(obj) {
		var ret;
		ret = binarySearch(Shape_ShapeIdx, obj.top << 12 | obj.bottom) << 1 | obj.Shape_parity;
		return ret;
	}

	function Shape_setIdx(obj, idx) {
		obj.Shape_parity = idx & 1;
		obj.top = Shape_ShapeIdx[idx >> 1];
		obj.bottom = obj.top & 4095;
		obj.top >>= 12;
	}

	function Shape_topMove(obj) {
		var move, moveParity;
		move = 0;
		moveParity = 0;
		do {
			if ((obj.top & 2048) == 0) {
				move += 1;
				obj.top = obj.top << 1;
			} else {
				move += 2;
				obj.top = obj.top << 2 ^ 12291;
			}
			moveParity = 1 - moveParity;
		}
		while ((bitCount(obj.top & 63) & 1) != 0);
		(bitCount(obj.top) & 2) == 0 && (obj.Shape_parity ^= moveParity);
		return move;
	}

	function Shape_Shape() {}

	function Shape_getShape2Idx(shp) {
		var ret;
		ret = binarySearch(Shape_ShapeIdx, shp & 16777215) << 1 | shp >> 24;
		return ret;
	}

	function Shape_init() {
		var count, depth, dl, done, done0, dr, i, idx, m, s, ul, ur, value, p1, p3, temp;
		count = 0;
		for (i = 0; i < 28561; ++i) {
			dr = Shape_halflayer[i % 13];
			dl = Shape_halflayer[~~(i / 13) % 13];
			ur = Shape_halflayer[~~(~~(i / 13) / 13) % 13];
			ul = Shape_halflayer[~~(~~(~~(i / 13) / 13) / 13)];
			value = ul << 18 | ur << 12 | dl << 6 | dr;
			bitCount(value) == 16 && (Shape_ShapeIdx[count++] = value);
		}
		s = new Shape_Shape;
		for (i = 0; i < 7356; ++i) {
			Shape_setIdx(s, i);
			Shape_TopMove[i] = Shape_topMove(s);
			Shape_TopMove[i] |= Shape_getIdx(s) << 4;
			Shape_setIdx(s, i);
			Shape_BottomMove[i] = Shape_bottomMove(s);
			Shape_BottomMove[i] |= Shape_getIdx(s) << 4;
			Shape_setIdx(s, i);
			temp = s.top & 63;
			p1 = bitCount(temp);
			p3 = bitCount(s.bottom & 4032);
			s.Shape_parity ^= 1 & (p1 & p3) >> 1;
			s.top = s.top & 4032 | s.bottom >> 6 & 63;
			s.bottom = s.bottom & 63 | temp << 6;
			Shape_TwistMove[i] = Shape_getIdx(s);
		}
		for (i = 0; i < 7536; ++i) {
			ShapePrun[i] = -1;
		}
		ShapePrun[Shape_getShape2Idx(14378715)] = 0;
		ShapePrun[Shape_getShape2Idx(31157686)] = 0;
		ShapePrun[Shape_getShape2Idx(23967451)] = 0;
		ShapePrun[Shape_getShape2Idx(7191990)] = 0;
		done = 4;
		done0 = 0;
		depth = -1;
		while (done != done0) {
			done0 = done;
			++depth;
			for (i = 0; i < 7536; ++i) {
				if (ShapePrun[i] == depth) {
					m = 0;
					idx = i;
					do {
						idx = Shape_TopMove[idx];
						m += idx & 15;
						idx >>= 4;
						if (ShapePrun[idx] == -1) {
							++done;
							ShapePrun[idx] = depth + 1;
						}
					}
					while (m != 12);
					m = 0;
					idx = i;
					do {
						idx = Shape_BottomMove[idx];
						m += idx & 15;
						idx >>= 4;
						if (ShapePrun[idx] == -1) {
							++done;
							ShapePrun[idx] = depth + 1;
						}
					}
					while (m != 12);
					idx = Shape_TwistMove[i];
					if (ShapePrun[idx] == -1) {
						++done;
						ShapePrun[idx] = depth + 1;
					}
				}
			}
		}
	}

	function Shape() {}

	_ = Shape_Shape.prototype = Shape.prototype;
	_.bottom = 0;
	_.Shape_parity = 0;
	_.top = 0;
	var Shape_BottomMove, Shape_ShapeIdx, ShapePrun, Shape_TopMove, Shape_TwistMove, Shape_halflayer;

	function Square_$clinit() {
		Square_$clinit = $.noop;
		SquarePrun = [];
		Square_TwistMove = [];
		Square_TopMove = [];
		Square_BottomMove = [];
		Square_init();
	}

	function Square_Square() {}

	function Square_init() {
		var check, depth, done, find, i, idx, idxx, inv, m, ml, pos;
		pos = [];
		for (i = 0; i < 40320; ++i) {
			set8Perm(pos, i);
			circle(pos, 2, 4)(pos, 3, 5);
			Square_TwistMove[i] = get8Perm(pos);
			set8Perm(pos, i);
			circle(pos, 0, 3, 2, 1);
			Square_TopMove[i] = get8Perm(pos);
			set8Perm(pos, i);
			circle(pos, 4, 7, 6, 5);
			Square_BottomMove[i] = get8Perm(pos);
		}
		for (i = 0; i < 80640; ++i) {
			SquarePrun[i] = -1;
		}
		SquarePrun[0] = 0;
		depth = 0;
		done = 1;
		while (done < 80640) {
			//console.log(done);
			inv = depth >= 11;
			find = inv ? -1 : depth;
			check = inv ? depth : -1;
			++depth;
			OUT: for (i = 0; i < 80640; ++i) {
				if (SquarePrun[i] == find) {
					idx = i >> 1;
					ml = i & 1;
					idxx = Square_TwistMove[idx] << 1 | 1 - ml;
					if (SquarePrun[idxx] == check) {
						++done;
						SquarePrun[inv ? i : idxx] = depth;
						if (inv)
							continue OUT;
					}
					idxx = idx;
					for (m = 0; m < 4; ++m) {
						idxx = Square_TopMove[idxx];
						if (SquarePrun[idxx << 1 | ml] == check) {
							++done;
							SquarePrun[inv ? i : idxx << 1 | ml] = depth;
							if (inv)
								continue OUT;
						}
					}
					for (m = 0; m < 4; ++m) {
						idxx = Square_BottomMove[idxx];
						if (SquarePrun[idxx << 1 | ml] == check) {
							++done;
							SquarePrun[inv ? i : idxx << 1 | ml] = depth;
							if (inv)
								continue OUT;
						}
					}
				}
			}
		}
	}

	function Square() {}

	_ = Square_Square.prototype = Square.prototype;
	_.botEdgeFirst = false;
	_.cornperm = 0;
	_.edgeperm = 0;
	_.ml = 0;
	_.topEdgeFirst = false;
	var Square_BottomMove, SquarePrun, Square_TopMove, Square_TwistMove;

	function bitCount(x) {
		x -= x >> 1 & 1431655765;
		x = (x >> 2 & 858993459) + (x & 858993459);
		x = (x >> 4) + x & 252645135;
		x += x >> 8;
		x += x >> 16;
		return x & 63;
	}

	function binarySearch(sortedArray, key) {
		var high, low, mid, midVal;
		low = 0;
		high = sortedArray.length - 1;
		while (low <= high) {
			mid = low + ((high - low) >> 1);
			midVal = sortedArray[mid];
			if (midVal < key) {
				low = mid + 1;
			} else if (midVal > key) {
				high = mid - 1;
			} else {
				return mid;
			}
		}
		return -low - 1;
	}

	var x44_STAR = [18];
	var x53_STAR = [19];
	var x62_STAR = [3];
	var x71_STAR = [1];
	var x8_STAR = [0];

	var x222_PAIRED = [305];
	var x222_PERPENDICULAR = [306];
	var x222_PARALLEL = [307];

	var x33_PAIRED = [144];
	var x33_PERPENDICULAR = [145];
	var x33_PARALLEL = [146];

	var x321_PAIRED = [182];
	var x321_PERPENDICULAR = [183];
	var x321_PARALLEL = [184];

	var x312_PAIRED = [157];
	var x312_PERPENDICULAR = [158];
	var x312_PARALLEL = [159];

	var L42_PAIRED = [59];
	var L42_PERPENDICULAR = [60];
	var L42_PARALLEL = [61];

	var R42_PAIRED = [21];
	var R42_PERPENDICULAR = [22];
	var R42_PARALLEL = [23];

	var x411_PAIRED = [34];
	var x411_PERPENDICULAR = [35];
	var x411_PARALLEL = [36];

	var L51_PAIRED = [71];
	var L51_PERPENDICULAR = [72];
	var L51_PARALLEL = [73];

	var R51_PAIRED = [46];
	var R51_PERPENDICULAR = [47];
	var R51_PARALLEL = [48];

	var x6_PAIRED = [6];
	var x6_PERPENDICULAR = [7];
	var x6_PARALLEL = [8];

	var SQUARE_SQUARE = [1015];
	var SQUARE_KITE = [1018];
	var SQUARE_BARREL = [1007];
	var SQUARE_SHIELD = [1006];
	var SQUARE_lFIST = [1016];
	var SQUARE_rFIST = [1008];
	var SQUARE_lPAW = [1011];
	var SQUARE_rPAW = [1005];
	var SQUARE_MUSHROOM = [1009];
	var SQUARE_SCALLOP = [1004];

	var KITE_KITE = [1168];
	var KITE_BARREL = [1157];
	var KITE_SHIELD = [1156];
	var KITE_lFIST = [1166];
	var KITE_rFIST = [1158];
	var KITE_lPAW = [1161];
	var KITE_rPAW = [1155];
	var KITE_MUSHROOM = [1159];
	var KITE_SCALLOP = [1154];

	var BARREL_BARREL = [427];
	var BARREL_SHIELD = [426];
	var BARREL_lFIST = [436];
	var BARREL_rFIST = [428];
	var BARREL_lPAW = [431];
	var BARREL_rPAW = [425];
	var BARREL_MUSHROOM = [429];
	var BARREL_SCALLOP = [424];

	var SHIELD_SHIELD = [343];
	var SHIELD_lFIST = [353];
	var SHIELD_rFIST = [345];
	var SHIELD_lPAW = [348];
	var SHIELD_rPAW = [342];
	var SHIELD_MUSHROOM = [346];
	var SHIELD_SCALLOP = [341];

	var llFIST_lFIST = [1062];
	var lFIST_rFIST = [1054];
	var lFIST_lPAW = [1057];
	var lFIST_rPAW = [1051];
	var lFIST_MUSHROOM = [1055];
	var lFIST_SCALLOP = [1050];

	var rFIST_rFIST = [486];
	var rFIST_lPAW = [489];
	var rFIST_rPAW = [483];
	var rFIST_MUSHROOM = [487];
	var rFIST_SCALLOP = [482];

	var lPAW_lPAW = [639];
	var lPAW_rPAW = [225];
	var lPAW_MUSHROOM = [535];
	var lPAW_SCALLOP = [632];

	var rPAW_rPAW = [219];
	var rPAW_MUSHROOM = [223];
	var rPAW_SCALLOP = [218];

	var MUSHROOM_MUSHROOM = [533];
	var MUSHROOM_SCALLOP = [528];

	var SCALLOP_SCALLOP = [95];

	var scpcases = [x44_STAR, x53_STAR, x62_STAR, x71_STAR, x8_STAR, x222_PAIRED, x222_PERPENDICULAR, x222_PARALLEL, x33_PAIRED, x33_PERPENDICULAR, x33_PARALLEL, x321_PAIRED, x321_PERPENDICULAR, x321_PARALLEL, x312_PAIRED, x312_PERPENDICULAR, x312_PARALLEL, L42_PAIRED, L42_PERPENDICULAR, L42_PARALLEL, R42_PAIRED, R42_PERPENDICULAR, R42_PARALLEL, x411_PAIRED, x411_PERPENDICULAR, x411_PARALLEL, L51_PAIRED, L51_PERPENDICULAR, L51_PARALLEL, R51_PAIRED, R51_PERPENDICULAR, R51_PARALLEL, x6_PAIRED, x6_PERPENDICULAR, x6_PARALLEL, SQUARE_SQUARE, SQUARE_KITE, SQUARE_BARREL, SQUARE_SHIELD, SQUARE_lFIST, SQUARE_rFIST, SQUARE_lPAW, SQUARE_rPAW, SQUARE_MUSHROOM, SQUARE_SCALLOP, KITE_KITE, KITE_BARREL, KITE_SHIELD, KITE_lFIST, KITE_rFIST, KITE_lPAW, KITE_rPAW, KITE_MUSHROOM, KITE_SCALLOP, BARREL_BARREL, BARREL_SHIELD, BARREL_lFIST, BARREL_rFIST, BARREL_lPAW, BARREL_rPAW, BARREL_MUSHROOM, BARREL_SCALLOP, SHIELD_SHIELD, SHIELD_lFIST, SHIELD_rFIST, SHIELD_lPAW, SHIELD_rPAW, SHIELD_MUSHROOM, SHIELD_SCALLOP, llFIST_lFIST, lFIST_rFIST, lFIST_lPAW, lFIST_rPAW, lFIST_MUSHROOM, lFIST_SCALLOP, rFIST_rFIST, rFIST_lPAW, rFIST_rPAW, rFIST_MUSHROOM, rFIST_SCALLOP, lPAW_lPAW, lPAW_rPAW, lPAW_MUSHROOM, lPAW_SCALLOP, rPAW_rPAW, rPAW_MUSHROOM, rPAW_SCALLOP, MUSHROOM_MUSHROOM, MUSHROOM_SCALLOP, SCALLOP_SCALLOP];

	function SCPInit() {
		SCPInit = $.noop;
		var s = new Shape_Shape;
		for (var scp = 0; scp < scpcases.length; scp++) {
			var curCases = scpcases[scp];
			for (var i = 0; i < curCases.length; i++) {
				var shape = curCases[i];
				do {
					shape = Shape_TopMove[shape << 1] >> 5;
					if (curCases.indexOf(shape) == -1) {
						curCases.push(shape);
					}
				} while (shape != curCases[i]);
				do {
					shape = Shape_BottomMove[shape << 1] >> 5;
					if (curCases.indexOf(shape) == -1) {
						curCases.push(shape);
					}
				} while (shape != curCases[i]);
				Shape_setIdx(s, shape << 1);
				var tmp = s.top;
				s.top = s.bottom;
				s.bottom = tmp;
				shape = Shape_getIdx(s) >> 1;
				if (curCases.indexOf(shape) == -1) {
					curCases.push(shape);
				}
			}
		}
	}

	var scpfilter = ['x44-STAR', 'x53-STAR', 'x62-STAR', 'x71-STAR', 'x8-STAR', 'x222-PAIRED', 'x222-PERPENDICULAR', 'x222-PARALLEL', 'x33-PAIRED', 'x33-PERPENDICULAR', 'x33-PARALLEL', 'x321-PAIRED', 'x321-PERPENDICULAR', 'x321-PARALLEL', 'x312-PAIRED', 'x312-PERPENDICULAR', 'x312-PARALLEL', 'L42-PAIRED', 'L42-PERPENDICULAR', 'L42-PARALLEL', 'R42-PAIRED', 'R42-PERPENDICULAR', 'R42-PARALLEL', 'x411-PAIRED', 'x411-PERPENDICULAR', 'x411-PARALLEL', 'L51-PAIRED', 'L51-PERPENDICULAR', 'L51-PARALLEL', 'R51-PAIRED', 'R51-PERPENDICULAR', 'R51-PARALLEL', 'x6-PAIRED', 'x6-PERPENDICULAR', 'x6-PARALLEL', 'SQUARE-SQUARE', 'SQUARE-KITE', 'SQUARE-BARREL', 'SQUARE-SHIELD', 'SQUARE-lFIST', 'SQUARE-rFIST', 'SQUARE-lPAW', 'SQUARE-rPAW', 'SQUARE-MUSHROOM', 'SQUARE-SCALLOP', 'KITE-KITE', 'KITE-BARREL', 'KITE-SHIELD', 'KITE-lFIST', 'KITE-rFIST', 'KITE-lPAW', 'KITE-rPAW', 'KITE-MUSHROOM', 'KITE-SCALLOP', 'BARREL-BARREL', 'BARREL-SHIELD', 'BARREL-lFIST', 'BARREL-rFIST', 'BARREL-lPAW', 'BARREL-rPAW', 'BARREL-MUSHROOM', 'BARREL-SCALLOP', 'SHIELD-SHIELD', 'SHIELD-lFIST', 'SHIELD-rFIST', 'SHIELD-lPAW', 'SHIELD-rPAW', 'SHIELD-MUSHROOM', 'SHIELD-SCALLOP', 'llFIST-lFIST', 'lFIST-rFIST', 'lFIST-lPAW', 'lFIST-rPAW', 'lFIST-MUSHROOM', 'lFIST-SCALLOP', 'rFIST-rFIST', 'rFIST-lPAW', 'rFIST-rPAW', 'rFIST-MUSHROOM', 'rFIST-SCALLOP', 'lPAW-lPAW', 'lPAW-rPAW', 'lPAW-MUSHROOM', 'lPAW-SCALLOP', 'rPAW-rPAW', 'rPAW-MUSHROOM', 'rPAW-SCALLOP', 'MUSHROOM-MUSHROOM', 'MUSHROOM-SCALLOP', 'SCALLOP-SCALLOP'];
	var scpprobs = [10, 16, 16, 16, 16, 24, 16, 8, 72, 48, 24, 72, 48, 24, 72, 48, 24, 96, 64, 32, 96, 64, 32, 96, 64, 32, 72, 48, 24, 72, 48, 24, 72, 48, 24, 4, 16, 16, 24, 24, 24, 16, 16, 16, 24, 16, 32, 48, 48, 48, 32, 32, 32, 48, 16, 48, 48, 48, 32, 32, 32, 48, 36, 72, 72, 48, 48, 48, 72, 36, 72, 48, 48, 48, 72, 36, 48, 48, 48, 72, 16, 32, 32, 48, 16, 32, 48, 16, 48, 36];

	var search = new Search_Search;

	function square1SolverGetRandomScramble(type, length, cases) {
		Shape_$clinit();
		Square_$clinit();
		SCPInit();
		search.sq1lvcb = type == 'sqrs1';
		var idx = mathlib.rndEl(scpcases[cases]);
		var scrambleString = Search_solution(search, FullCube_randomCube(idx));
		return scrambleString;
	}

	scrMgr.reg('sqrs', square1SolverGetRandomScramble, [scpfilter, scpprobs])
		('sqrs1', square1SolverGetRandomScramble, [scpfilter, scpprobs]);


	return {
		initialize: $.noop,
		getRandomScramble: square1SolverGetRandomScramble
	};

})(mathlib.set8Perm, mathlib.get8Perm, mathlib.circle, mathlib.rn);