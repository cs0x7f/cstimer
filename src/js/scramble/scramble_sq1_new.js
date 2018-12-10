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
			if (i == obj.Search_length1 - 1) {
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

	var x44_STAR = [18, 142, 266, 801, 1747, 3647, 3653, 3659, 3666, 3674];
	var x53_STAR = [19, 141, 143, 265, 279, 788, 826, 1722, 3648, 3652, 3654, 3658, 3660, 3665, 3667, 3673];
	var x62_STAR = [3, 20, 156, 264, 304, 787, 1709, 1830, 3644, 3649, 3655, 3657, 3661, 3664, 3672, 3675];
	var x71_STAR = [1, 4, 33, 181, 786, 909, 1708, 2229, 3642, 3645, 3650, 3656, 3663, 3668, 3671, 3676];
	var x8_STAR = [0, 2, 5, 58, 387, 1308, 1707, 2628, 3641, 3643, 3646, 3651, 3662, 3669, 3670, 3677];

	var x222_PAIRED = [305, 308, 310, 311, 314, 316, 1855, 1858, 1860, 1861, 1864, 1866, 740, 772, 2183, 2215, 2981, 3013, 3193, 3225, 3471, 3503, 3595, 3627];
	var x222_PERPENDICULAR = [306, 309, 312, 315, 1856, 1859, 1862, 1865, 1262, 1294, 2582, 2614, 3301, 3333, 3533, 3565];
	var x222_PARALLEL = [307, 313, 1857, 1863, 1661, 1693, 3363, 3395];

	var x33_PAIRED = [144, 147, 149, 150, 153, 155, 292, 295, 297, 298, 301, 303, 400, 403, 405, 406, 409, 411, 851, 854, 856, 857, 860, 862, 1333, 1336, 1338, 1339, 1342, 1344, 2711, 2714, 2716, 2717, 2720, 2722, 731, 739, 744, 753, 761, 783, 2174, 2182, 2187, 2196, 2204, 2226, 2972, 2980, 2985, 2994, 3002, 3024, 3184, 3192, 3197, 3206, 3214, 3236, 3462, 3470, 3475, 3484, 3492, 3514, 3586, 3594, 3599, 3608, 3616, 3638];
	var x33_PERPENDICULAR = [145, 148, 151, 154, 293, 296, 299, 302, 401, 404, 407, 410, 852, 855, 858, 861, 1334, 1337, 1340, 1343, 2712, 2715, 2718, 2721, 1253, 1261, 1266, 1275, 1283, 1305, 2573, 2581, 2586, 2595, 2603, 2625, 3292, 3300, 3305, 3314, 3322, 3344, 3524, 3532, 3537, 3546, 3554, 3576];
	var x33_PARALLEL = [146, 152, 294, 300, 402, 408, 853, 859, 1335, 1341, 2713, 2719, 1652, 1660, 1665, 1674, 1682, 1704, 3354, 3362, 3367, 3376, 3384, 3406];

	var x321_PAIRED = [182, 185, 187, 188, 191, 193, 280, 283, 285, 286, 289, 291, 839, 842, 844, 845, 848, 850, 934, 937, 939, 940, 943, 945, 1843, 1846, 1848, 1849, 1852, 1854, 2312, 2315, 2317, 2318, 2321, 2323, 734, 738, 752, 756, 771, 778, 2177, 2181, 2195, 2199, 2214, 2221, 2975, 2979, 2993, 2997, 3012, 3019, 3187, 3191, 3205, 3209, 3224, 3231, 3465, 3469, 3483, 3487, 3502, 3509, 3589, 3593, 3607, 3611, 3626, 3633];
	var x321_PERPENDICULAR = [183, 186, 189, 192, 281, 284, 287, 290, 840, 843, 846, 849, 935, 938, 941, 944, 1844, 1847, 1850, 1853, 2313, 2316, 2319, 2322, 1256, 1260, 1274, 1278, 1293, 1300, 2576, 2580, 2594, 2598, 2613, 2620, 3295, 3299, 3313, 3317, 3332, 3339, 3527, 3531, 3545, 3549, 3564, 3571];
	var x321_PARALLEL = [184, 190, 282, 288, 841, 847, 936, 942, 1845, 1851, 2314, 2320, 1655, 1659, 1673, 1677, 1692, 1699, 3357, 3361, 3375, 3379, 3394, 3401];

	var x312_PAIRED = [157, 160, 162, 163, 166, 168, 317, 320, 322, 323, 326, 328, 827, 830, 832, 833, 836, 838, 922, 925, 927, 928, 931, 933, 1913, 1916, 1918, 1919, 1922, 1924, 2254, 2257, 2259, 2260, 2263, 2265, 732, 741, 751, 755, 773, 777, 2175, 2184, 2194, 2198, 2216, 2220, 2973, 2982, 2992, 2996, 3014, 3018, 3185, 3194, 3204, 3208, 3226, 3230, 3463, 3472, 3482, 3486, 3504, 3508, 3587, 3596, 3606, 3610, 3628, 3632];
	var x312_PERPENDICULAR = [158, 161, 164, 167, 318, 321, 324, 327, 828, 831, 834, 837, 923, 926, 929, 932, 1914, 1917, 1920, 1923, 2255, 2258, 2261, 2264, 1254, 1263, 1273, 1277, 1295, 1299, 2574, 2583, 2593, 2597, 2615, 2619, 3293, 3302, 3312, 3316, 3334, 3338, 3525, 3534, 3544, 3548, 3566, 3570];
	var x312_PARALLEL = [159, 165, 319, 325, 829, 835, 924, 930, 1915, 1921, 2256, 2262, 1653, 1662, 1672, 1676, 1694, 1698, 3355, 3364, 3374, 3378, 3396, 3400];

	var L42_PAIRED = [59, 62, 64, 65, 68, 70, 267, 270, 272, 273, 276, 278, 412, 415, 417, 418, 421, 423, 814, 817, 819, 820, 823, 825, 1391, 1394, 1396, 1397, 1400, 1402, 1772, 1775, 1777, 1778, 1781, 1783, 1831, 1834, 1836, 1837, 1840, 1842, 2815, 2818, 2820, 2821, 2824, 2826, 728, 737, 745, 750, 762, 769, 770, 784, 2171, 2180, 2188, 2193, 2205, 2212, 2213, 2227, 2969, 2978, 2986, 2991, 3003, 3010, 3011, 3025, 3181, 3190, 3198, 3203, 3215, 3222, 3223, 3237, 3459, 3468, 3476, 3481, 3493, 3500, 3501, 3515, 3583, 3592, 3600, 3605, 3617, 3624, 3625, 3639];
	var L42_PERPENDICULAR = [60, 63, 66, 69, 268, 271, 274, 277, 413, 416, 419, 422, 815, 818, 821, 824, 1392, 1395, 1398, 1401, 1773, 1776, 1779, 1782, 1832, 1835, 1838, 1841, 2816, 2819, 2822, 2825, 1250, 1259, 1267, 1272, 1284, 1291, 1292, 1306, 2570, 2579, 2587, 2592, 2604, 2611, 2612, 2626, 3289, 3298, 3306, 3311, 3323, 3330, 3331, 3345, 3521, 3530, 3538, 3543, 3555, 3562, 3563, 3577];
	var L42_PARALLEL = [61, 67, 269, 275, 414, 420, 816, 822, 1393, 1399, 1774, 1780, 1833, 1839, 2817, 2823, 1649, 1658, 1666, 1671, 1683, 1690, 1691, 1705, 3351, 3360, 3368, 3373, 3385, 3392, 3393, 3407];

	var R42_PAIRED = [21, 24, 26, 27, 30, 32, 169, 172, 174, 175, 178, 180, 329, 332, 334, 335, 338, 340, 388, 391, 393, 394, 397, 399, 1321, 1324, 1326, 1327, 1330, 1332, 1748, 1751, 1753, 1754, 1757, 1759, 2017, 2020, 2022, 2023, 2026, 2028, 2653, 2656, 2658, 2659, 2662, 2664, 725, 733, 742, 743, 760, 767, 774, 782, 2168, 2176, 2185, 2186, 2203, 2210, 2217, 2225, 2966, 2974, 2983, 2984, 3001, 3008, 3015, 3023, 3178, 3186, 3195, 3196, 3213, 3220, 3227, 3235, 3456, 3464, 3473, 3474, 3491, 3498, 3505, 3513, 3580, 3588, 3597, 3598, 3615, 3622, 3629, 3637];
	var R42_PERPENDICULAR = [22, 25, 28, 31, 170, 173, 176, 179, 330, 333, 336, 339, 389, 392, 395, 398, 1322, 1325, 1328, 1331, 1749, 1752, 1755, 1758, 2018, 2021, 2024, 2027, 2654, 2657, 2660, 2663, 1247, 1255, 1264, 1265, 1282, 1289, 1296, 1304, 2567, 2575, 2584, 2585, 2602, 2609, 2616, 2624, 3286, 3294, 3303, 3304, 3321, 3328, 3335, 3343, 3518, 3526, 3535, 3536, 3553, 3560, 3567, 3575];
	var R42_PARALLEL = [23, 29, 171, 177, 331, 337, 390, 396, 1323, 1329, 1750, 1756, 2019, 2025, 2655, 2661, 1646, 1654, 1663, 1664, 1681, 1688, 1695, 1703, 3348, 3356, 3365, 3366, 3383, 3390, 3397, 3405];

	var x411_PAIRED = [34, 37, 39, 40, 43, 45, 194, 197, 199, 200, 203, 205, 802, 805, 807, 808, 811, 813, 910, 913, 915, 916, 919, 921, 992, 995, 997, 998, 1001, 1003, 1760, 1763, 1765, 1766, 1769, 1771, 2242, 2245, 2247, 2248, 2251, 2253, 2416, 2419, 2421, 2422, 2425, 2427, 726, 735, 749, 754, 757, 768, 776, 779, 2169, 2178, 2192, 2197, 2200, 2211, 2219, 2222, 2967, 2976, 2990, 2995, 2998, 3009, 3017, 3020, 3179, 3188, 3202, 3207, 3210, 3221, 3229, 3232, 3457, 3466, 3480, 3485, 3488, 3499, 3507, 3510, 3581, 3590, 3604, 3609, 3612, 3623, 3631, 3634];
	var x411_PERPENDICULAR = [35, 38, 41, 44, 195, 198, 201, 204, 803, 806, 809, 812, 911, 914, 917, 920, 993, 996, 999, 1002, 1761, 1764, 1767, 1770, 2243, 2246, 2249, 2252, 2417, 2420, 2423, 2426, 1248, 1257, 1271, 1276, 1279, 1290, 1298, 1301, 2568, 2577, 2591, 2596, 2599, 2610, 2618, 2621, 3287, 3296, 3310, 3315, 3318, 3329, 3337, 3340, 3519, 3528, 3542, 3547, 3550, 3561, 3569, 3572];
	var x411_PARALLEL = [36, 42, 196, 202, 804, 810, 912, 918, 994, 1000, 1762, 1768, 2244, 2250, 2418, 2424, 1647, 1656, 1670, 1675, 1678, 1689, 1697, 1700, 3349, 3358, 3372, 3377, 3380, 3391, 3399, 3402];

	var L51_PAIRED = [71, 74, 76, 77, 80, 82, 470, 473, 475, 476, 479, 481, 789, 792, 794, 795, 798, 800, 1495, 1498, 1500, 1501, 1504, 1506, 1735, 1738, 1740, 1741, 1744, 1746, 2230, 2233, 2235, 2236, 2239, 2241, 729, 746, 748, 763, 766, 775, 2172, 2189, 2191, 2206, 2209, 2218, 2970, 2987, 2989, 3004, 3007, 3016, 3182, 3199, 3201, 3216, 3219, 3228, 3460, 3477, 3479, 3494, 3497, 3506, 3584, 3601, 3603, 3618, 3621, 3630];
	var L51_PERPENDICULAR = [72, 75, 78, 81, 471, 474, 477, 480, 790, 793, 796, 799, 1496, 1499, 1502, 1505, 1736, 1739, 1742, 1745, 2231, 2234, 2237, 2240, 1251, 1268, 1270, 1285, 1288, 1297, 2571, 2588, 2590, 2605, 2608, 2617, 3290, 3307, 3309, 3324, 3327, 3336, 3522, 3539, 3541, 3556, 3559, 3568];
	var L51_PARALLEL = [73, 79, 472, 478, 791, 797, 1497, 1503, 1737, 1743, 2232, 2238, 1650, 1667, 1669, 1684, 1687, 1696, 3352, 3369, 3371, 3386, 3389, 3398];

	var R51_PAIRED = [46, 49, 51, 52, 55, 57, 206, 209, 211, 212, 215, 217, 1096, 1099, 1101, 1102, 1105, 1107, 1309, 1312, 1314, 1315, 1318, 1320, 1723, 1726, 1728, 1729, 1732, 1734, 2641, 2644, 2646, 2647, 2650, 2652, 727, 736, 758, 759, 765, 781, 2170, 2179, 2201, 2202, 2208, 2224, 2968, 2977, 2999, 3000, 3006, 3022, 3180, 3189, 3211, 3212, 3218, 3234, 3458, 3467, 3489, 3490, 3496, 3512, 3582, 3591, 3613, 3614, 3620, 3636];
	var R51_PERPENDICULAR = [47, 50, 53, 56, 207, 210, 213, 216, 1097, 1100, 1103, 1106, 1310, 1313, 1316, 1319, 1724, 1727, 1730, 1733, 2642, 2645, 2648, 2651, 1249, 1258, 1280, 1281, 1287, 1303, 2569, 2578, 2600, 2601, 2607, 2623, 3288, 3297, 3319, 3320, 3326, 3342, 3520, 3529, 3551, 3552, 3558, 3574];
	var R51_PARALLEL = [48, 54, 208, 214, 1098, 1104, 1311, 1317, 1725, 1731, 2643, 2649, 1648, 1657, 1679, 1680, 1686, 1702, 3350, 3359, 3381, 3382, 3388, 3404];

	var x6_PAIRED = [6, 9, 11, 12, 15, 17, 83, 86, 88, 89, 92, 94, 574, 577, 579, 580, 583, 585, 1710, 1713, 1715, 1716, 1719, 1721, 2629, 2632, 2634, 2635, 2638, 2640, 3027, 3030, 3032, 3033, 3036, 3038, 724, 730, 747, 764, 780, 785, 2167, 2173, 2190, 2207, 2223, 2228, 2965, 2971, 2988, 3005, 3021, 3026, 3177, 3183, 3200, 3217, 3233, 3238, 3455, 3461, 3478, 3495, 3511, 3516, 3579, 3585, 3602, 3619, 3635, 3640];
	var x6_PERPENDICULAR = [7, 10, 13, 16, 84, 87, 90, 93, 575, 578, 581, 584, 1711, 1714, 1717, 1720, 2630, 2633, 2636, 2639, 3028, 3031, 3034, 3037, 1246, 1252, 1269, 1286, 1302, 1307, 2566, 2572, 2589, 2606, 2622, 2627, 3285, 3291, 3308, 3325, 3341, 3346, 3517, 3523, 3540, 3557, 3573, 3578];
	var x6_PARALLEL = [8, 14, 85, 91, 576, 582, 1712, 1718, 2631, 2637, 3029, 3035, 1645, 1651, 1668, 1685, 1701, 1706, 3347, 3353, 3370, 3387, 3403, 3408];

	var SQUARE_SQUARE = [1015, 1037, 2485, 2507];
	var SQUARE_KITE = [1018, 1023, 1029, 1034, 2488, 2493, 2499, 2504, 1165, 1187, 1518, 1540, 1982, 2004, 2335, 2357];
	var SQUARE_BARREL = [1007, 1022, 1030, 1044, 2477, 2492, 2500, 2514, 435, 457, 1460, 1482, 2040, 2062, 2930, 2952];
	var SQUARE_SHIELD = [1006, 1010, 1027, 1032, 1042, 1047, 2476, 2480, 2497, 2502, 2512, 2517, 352, 374, 597, 619, 1878, 1900, 2132, 2154, 2838, 2860, 3142, 3164];
	var SQUARE_lFIST = [1016, 1017, 1021, 1028, 1038, 1043, 2486, 2487, 2491, 2498, 2508, 2513, 1061, 1083, 1119, 1141, 1414, 1436, 1936, 1958, 2531, 2553, 2884, 2906];
	var SQUARE_rFIST = [1008, 1014, 1024, 1031, 1035, 1036, 2478, 2484, 2494, 2501, 2505, 2506, 493, 515, 957, 979, 1564, 1586, 2086, 2108, 2381, 2403, 2439, 2461];
	var SQUARE_lPAW = [1011, 1013, 1033, 1048, 2481, 2483, 2503, 2518, 643, 665, 874, 896, 2277, 2299, 3250, 3272];
	var SQUARE_rPAW = [1005, 1019, 1040, 1046, 2475, 2489, 2510, 2516, 229, 251, 1211, 1233, 2734, 2756, 3096, 3118];
	var SQUARE_MUSHROOM = [1009, 1020, 1025, 1041, 2479, 2490, 2495, 2511, 539, 561, 1356, 1378, 1610, 1632, 2780, 2802];
	var SQUARE_SCALLOP = [1004, 1012, 1026, 1039, 1045, 1049, 2474, 2482, 2496, 2509, 2515, 2519, 106, 128, 689, 711, 1795, 1817, 2676, 2698, 3050, 3072, 3420, 3442];

	var KITE_KITE = [1168, 1173, 1179, 1184, 1521, 1526, 1532, 1537, 1985, 1990, 1996, 2001, 2338, 2343, 2349, 2354];
	var KITE_BARREL = [1157, 1172, 1180, 1194, 1510, 1525, 1533, 1547, 1974, 1989, 1997, 2011, 2327, 2342, 2350, 2364, 438, 443, 449, 454, 1463, 1468, 1474, 1479, 2043, 2048, 2054, 2059, 2933, 2938, 2944, 2949];
	var KITE_SHIELD = [1156, 1160, 1177, 1182, 1192, 1197, 1509, 1513, 1530, 1535, 1545, 1550, 1973, 1977, 1994, 1999, 2009, 2014, 2326, 2330, 2347, 2352, 2362, 2367, 355, 360, 366, 371, 600, 605, 611, 616, 1881, 1886, 1892, 1897, 2135, 2140, 2146, 2151, 2841, 2846, 2852, 2857, 3145, 3150, 3156, 3161];
	var KITE_lFIST = [1166, 1167, 1171, 1178, 1188, 1193, 1519, 1520, 1524, 1531, 1541, 1546, 1983, 1984, 1988, 1995, 2005, 2010, 2336, 2337, 2341, 2348, 2358, 2363, 1064, 1069, 1075, 1080, 1122, 1127, 1133, 1138, 1417, 1422, 1428, 1433, 1939, 1944, 1950, 1955, 2534, 2539, 2545, 2550, 2887, 2892, 2898, 2903];
	var KITE_rFIST = [1158, 1164, 1174, 1181, 1185, 1186, 1511, 1517, 1527, 1534, 1538, 1539, 1975, 1981, 1991, 1998, 2002, 2003, 2328, 2334, 2344, 2351, 2355, 2356, 496, 501, 507, 512, 960, 965, 971, 976, 1567, 1572, 1578, 1583, 2089, 2094, 2100, 2105, 2384, 2389, 2395, 2400, 2442, 2447, 2453, 2458];
	var KITE_lPAW = [1161, 1163, 1183, 1198, 1514, 1516, 1536, 1551, 1978, 1980, 2000, 2015, 2331, 2333, 2353, 2368, 646, 651, 657, 662, 877, 882, 888, 893, 2280, 2285, 2291, 2296, 3253, 3258, 3264, 3269];
	var KITE_rPAW = [1155, 1169, 1190, 1196, 1508, 1522, 1543, 1549, 1972, 1986, 2007, 2013, 2325, 2339, 2360, 2366, 232, 237, 243, 248, 1214, 1219, 1225, 1230, 2737, 2742, 2748, 2753, 3099, 3104, 3110, 3115];
	var KITE_MUSHROOM = [1159, 1170, 1175, 1191, 1512, 1523, 1528, 1544, 1976, 1987, 1992, 2008, 2329, 2340, 2345, 2361, 542, 547, 553, 558, 1359, 1364, 1370, 1375, 1613, 1618, 1624, 1629, 2783, 2788, 2794, 2799];
	var KITE_SCALLOP = [1154, 1162, 1176, 1189, 1195, 1199, 1507, 1515, 1529, 1542, 1548, 1552, 1971, 1979, 1993, 2006, 2012, 2016, 2324, 2332, 2346, 2359, 2365, 2369, 109, 114, 120, 125, 692, 697, 703, 708, 1798, 1803, 1809, 1814, 2679, 2684, 2690, 2695, 3053, 3058, 3064, 3069, 3423, 3428, 3434, 3439];

	var BARREL_BARREL = [427, 442, 450, 464, 1452, 1467, 1475, 1489, 2032, 2047, 2055, 2069, 2922, 2937, 2945, 2959];
	var BARREL_SHIELD = [426, 430, 447, 452, 462, 467, 1451, 1455, 1472, 1477, 1487, 1492, 2031, 2035, 2052, 2057, 2067, 2072, 2921, 2925, 2942, 2947, 2957, 2962, 344, 359, 367, 381, 589, 604, 612, 626, 1870, 1885, 1893, 1907, 2124, 2139, 2147, 2161, 2830, 2845, 2853, 2867, 3134, 3149, 3157, 3171];
	var BARREL_lFIST = [436, 437, 441, 448, 458, 463, 1461, 1462, 1466, 1473, 1483, 1488, 2041, 2042, 2046, 2053, 2063, 2068, 2931, 2932, 2936, 2943, 2953, 2958, 1053, 1068, 1076, 1090, 1111, 1126, 1134, 1148, 1406, 1421, 1429, 1443, 1928, 1943, 1951, 1965, 2523, 2538, 2546, 2560, 2876, 2891, 2899, 2913];
	var BARREL_rFIST = [428, 434, 444, 451, 455, 456, 1453, 1459, 1469, 1476, 1480, 1481, 2033, 2039, 2049, 2056, 2060, 2061, 2923, 2929, 2939, 2946, 2950, 2951, 485, 500, 508, 522, 949, 964, 972, 986, 1556, 1571, 1579, 1593, 2078, 2093, 2101, 2115, 2373, 2388, 2396, 2410, 2431, 2446, 2454, 2468];
	var BARREL_lPAW = [431, 433, 453, 468, 1456, 1458, 1478, 1493, 2036, 2038, 2058, 2073, 2926, 2928, 2948, 2963, 635, 650, 658, 672, 866, 881, 889, 903, 2269, 2284, 2292, 2306, 3242, 3257, 3265, 3279];
	var BARREL_rPAW = [425, 439, 460, 466, 1450, 1464, 1485, 1491, 2030, 2044, 2065, 2071, 2920, 2934, 2955, 2961, 221, 236, 244, 258, 1203, 1218, 1226, 1240, 2726, 2741, 2749, 2763, 3088, 3103, 3111, 3125];
	var BARREL_MUSHROOM = [429, 440, 445, 461, 1454, 1465, 1470, 1486, 2034, 2045, 2050, 2066, 2924, 2935, 2940, 2956, 531, 546, 554, 568, 1348, 1363, 1371, 1385, 1602, 1617, 1625, 1639, 2772, 2787, 2795, 2809];
	var BARREL_SCALLOP = [424, 432, 446, 459, 465, 469, 1449, 1457, 1471, 1484, 1490, 1494, 2029, 2037, 2051, 2064, 2070, 2074, 2919, 2927, 2941, 2954, 2960, 2964, 98, 113, 121, 135, 681, 696, 704, 718, 1787, 1802, 1810, 1824, 2668, 2683, 2691, 2705, 3042, 3057, 3065, 3079, 3412, 3427, 3435, 3449];

	var SHIELD_SHIELD = [343, 347, 364, 369, 379, 384, 588, 592, 609, 614, 624, 629, 1869, 1873, 1890, 1895, 1905, 1910, 2123, 2127, 2144, 2149, 2159, 2164, 2829, 2833, 2850, 2855, 2865, 2870, 3133, 3137, 3154, 3159, 3169, 3174];
	var SHIELD_lFIST = [353, 354, 358, 365, 375, 380, 598, 599, 603, 610, 620, 625, 1879, 1880, 1884, 1891, 1901, 1906, 2133, 2134, 2138, 2145, 2155, 2160, 2839, 2840, 2844, 2851, 2861, 2866, 3143, 3144, 3148, 3155, 3165, 3170, 1052, 1056, 1073, 1078, 1088, 1093, 1110, 1114, 1131, 1136, 1146, 1151, 1405, 1409, 1426, 1431, 1441, 1446, 1927, 1931, 1948, 1953, 1963, 1968, 2522, 2526, 2543, 2548, 2558, 2563, 2875, 2879, 2896, 2901, 2911, 2916];
	var SHIELD_rFIST = [345, 351, 361, 368, 372, 373, 590, 596, 606, 613, 617, 618, 1871, 1877, 1887, 1894, 1898, 1899, 2125, 2131, 2141, 2148, 2152, 2153, 2831, 2837, 2847, 2854, 2858, 2859, 3135, 3141, 3151, 3158, 3162, 3163, 484, 488, 505, 510, 520, 525, 948, 952, 969, 974, 984, 989, 1555, 1559, 1576, 1581, 1591, 1596, 2077, 2081, 2098, 2103, 2113, 2118, 2372, 2376, 2393, 2398, 2408, 2413, 2430, 2434, 2451, 2456, 2466, 2471];
	var SHIELD_lPAW = [348, 350, 370, 385, 593, 595, 615, 630, 1874, 1876, 1896, 1911, 2128, 2130, 2150, 2165, 2834, 2836, 2856, 2871, 3138, 3140, 3160, 3175, 634, 638, 655, 660, 670, 675, 865, 869, 886, 891, 901, 906, 2268, 2272, 2289, 2294, 2304, 2309, 3241, 3245, 3262, 3267, 3277, 3282];
	var SHIELD_rPAW = [342, 356, 377, 383, 587, 601, 622, 628, 1868, 1882, 1903, 1909, 2122, 2136, 2157, 2163, 2828, 2842, 2863, 2869, 3132, 3146, 3167, 3173, 220, 224, 241, 246, 256, 261, 1202, 1206, 1223, 1228, 1238, 1243, 2725, 2729, 2746, 2751, 2761, 2766, 3087, 3091, 3108, 3113, 3123, 3128];
	var SHIELD_MUSHROOM = [346, 357, 362, 378, 591, 602, 607, 623, 1872, 1883, 1888, 1904, 2126, 2137, 2142, 2158, 2832, 2843, 2848, 2864, 3136, 3147, 3152, 3168, 530, 534, 551, 556, 566, 571, 1347, 1351, 1368, 1373, 1383, 1388, 1601, 1605, 1622, 1627, 1637, 1642, 2771, 2775, 2792, 2797, 2807, 2812];
	var SHIELD_SCALLOP = [341, 349, 363, 376, 382, 386, 586, 594, 608, 621, 627, 631, 1867, 1875, 1889, 1902, 1908, 1912, 2121, 2129, 2143, 2156, 2162, 2166, 2827, 2835, 2849, 2862, 2868, 2872, 3131, 3139, 3153, 3166, 3172, 3176, 97, 101, 118, 123, 133, 138, 680, 684, 701, 706, 716, 721, 1786, 1790, 1807, 1812, 1822, 1827, 2667, 2671, 2688, 2693, 2703, 2708, 3041, 3045, 3062, 3067, 3077, 3082, 3411, 3415, 3432, 3437, 3447, 3452];

	var llFIST_lFIST = [1062, 1063, 1067, 1074, 1084, 1089, 1120, 1121, 1125, 1132, 1142, 1147, 1415, 1416, 1420, 1427, 1437, 1442, 1937, 1938, 1942, 1949, 1959, 1964, 2532, 2533, 2537, 2544, 2554, 2559, 2885, 2886, 2890, 2897, 2907, 2912];
	var lFIST_rFIST = [1054, 1060, 1070, 1077, 1081, 1082, 1112, 1118, 1128, 1135, 1139, 1140, 1407, 1413, 1423, 1430, 1434, 1435, 1929, 1935, 1945, 1952, 1956, 1957, 2524, 2530, 2540, 2547, 2551, 2552, 2877, 2883, 2893, 2900, 2904, 2905, 494, 495, 499, 506, 516, 521, 958, 959, 963, 970, 980, 985, 1565, 1566, 1570, 1577, 1587, 1592, 2087, 2088, 2092, 2099, 2109, 2114, 2382, 2383, 2387, 2394, 2404, 2409, 2440, 2441, 2445, 2452, 2462, 2467];
	var lFIST_lPAW = [1057, 1059, 1079, 1094, 1115, 1117, 1137, 1152, 1410, 1412, 1432, 1447, 1932, 1934, 1954, 1969, 2527, 2529, 2549, 2564, 2880, 2882, 2902, 2917, 644, 645, 649, 656, 666, 671, 875, 876, 880, 887, 897, 902, 2278, 2279, 2283, 2290, 2300, 2305, 3251, 3252, 3256, 3263, 3273, 3278];
	var lFIST_rPAW = [1051, 1065, 1086, 1092, 1109, 1123, 1144, 1150, 1404, 1418, 1439, 1445, 1926, 1940, 1961, 1967, 2521, 2535, 2556, 2562, 2874, 2888, 2909, 2915, 230, 231, 235, 242, 252, 257, 1212, 1213, 1217, 1224, 1234, 1239, 2735, 2736, 2740, 2747, 2757, 2762, 3097, 3098, 3102, 3109, 3119, 3124];
	var lFIST_MUSHROOM = [1055, 1066, 1071, 1087, 1113, 1124, 1129, 1145, 1408, 1419, 1424, 1440, 1930, 1941, 1946, 1962, 2525, 2536, 2541, 2557, 2878, 2889, 2894, 2910, 540, 541, 545, 552, 562, 567, 1357, 1358, 1362, 1369, 1379, 1384, 1611, 1612, 1616, 1623, 1633, 1638, 2781, 2782, 2786, 2793, 2803, 2808];
	var lFIST_SCALLOP = [1050, 1058, 1072, 1085, 1091, 1095, 1108, 1116, 1130, 1143, 1149, 1153, 1403, 1411, 1425, 1438, 1444, 1448, 1925, 1933, 1947, 1960, 1966, 1970, 2520, 2528, 2542, 2555, 2561, 2565, 2873, 2881, 2895, 2908, 2914, 2918, 107, 108, 112, 119, 129, 134, 690, 691, 695, 702, 712, 717, 1796, 1797, 1801, 1808, 1818, 1823, 2677, 2678, 2682, 2689, 2699, 2704, 3051, 3052, 3056, 3063, 3073, 3078, 3421, 3422, 3426, 3433, 3443, 3448];

	var rFIST_rFIST = [486, 492, 502, 509, 513, 514, 950, 956, 966, 973, 977, 978, 1557, 1563, 1573, 1580, 1584, 1585, 2079, 2085, 2095, 2102, 2106, 2107, 2374, 2380, 2390, 2397, 2401, 2402, 2432, 2438, 2448, 2455, 2459, 2460];
	var rFIST_lPAW = [489, 491, 511, 526, 953, 955, 975, 990, 1560, 1562, 1582, 1597, 2082, 2084, 2104, 2119, 2377, 2379, 2399, 2414, 2435, 2437, 2457, 2472, 636, 642, 652, 659, 663, 664, 867, 873, 883, 890, 894, 895, 2270, 2276, 2286, 2293, 2297, 2298, 3243, 3249, 3259, 3266, 3270, 3271];
	var rFIST_rPAW = [483, 497, 518, 524, 947, 961, 982, 988, 1554, 1568, 1589, 1595, 2076, 2090, 2111, 2117, 2371, 2385, 2406, 2412, 2429, 2443, 2464, 2470, 222, 228, 238, 245, 249, 250, 1204, 1210, 1220, 1227, 1231, 1232, 2727, 2733, 2743, 2750, 2754, 2755, 3089, 3095, 3105, 3112, 3116, 3117];
	var rFIST_MUSHROOM = [487, 498, 503, 519, 951, 962, 967, 983, 1558, 1569, 1574, 1590, 2080, 2091, 2096, 2112, 2375, 2386, 2391, 2407, 2433, 2444, 2449, 2465, 532, 538, 548, 555, 559, 560, 1349, 1355, 1365, 1372, 1376, 1377, 1603, 1609, 1619, 1626, 1630, 1631, 2773, 2779, 2789, 2796, 2800, 2801];
	var rFIST_SCALLOP = [482, 490, 504, 517, 523, 527, 946, 954, 968, 981, 987, 991, 1553, 1561, 1575, 1588, 1594, 1598, 2075, 2083, 2097, 2110, 2116, 2120, 2370, 2378, 2392, 2405, 2411, 2415, 2428, 2436, 2450, 2463, 2469, 2473, 99, 105, 115, 122, 126, 127, 682, 688, 698, 705, 709, 710, 1788, 1794, 1804, 1811, 1815, 1816, 2669, 2675, 2685, 2692, 2696, 2697, 3043, 3049, 3059, 3066, 3070, 3071, 3413, 3419, 3429, 3436, 3440, 3441];

	var lPAW_lPAW = [639, 641, 661, 676, 870, 872, 892, 907, 2273, 2275, 2295, 2310, 3246, 3248, 3268, 3283];
	var lPAW_rPAW = [225, 227, 247, 262, 633, 647, 668, 674, 864, 878, 899, 905, 1207, 1209, 1229, 1244, 2267, 2281, 2302, 2308, 2730, 2732, 2752, 2767, 3092, 3094, 3114, 3129, 3240, 3254, 3275, 3281];
	var lPAW_MUSHROOM = [535, 537, 557, 572, 637, 648, 653, 669, 868, 879, 884, 900, 1352, 1354, 1374, 1389, 1606, 1608, 1628, 1643, 2271, 2282, 2287, 2303, 2776, 2778, 2798, 2813, 3244, 3255, 3260, 3276];
	var lPAW_SCALLOP = [632, 640, 654, 667, 673, 677, 863, 871, 885, 898, 904, 908, 2266, 2274, 2288, 2301, 2307, 2311, 3239, 3247, 3261, 3274, 3280, 3284, 102, 104, 124, 139, 685, 687, 707, 722, 1791, 1793, 1813, 1828, 2672, 2674, 2694, 2709, 3046, 3048, 3068, 3083, 3416, 3418, 3438, 3453];

	var rPAW_rPAW = [219, 233, 254, 260, 1201, 1215, 1236, 1242, 2724, 2738, 2759, 2765, 3086, 3100, 3121, 3127];
	var rPAW_MUSHROOM = [223, 234, 239, 255, 1205, 1216, 1221, 1237, 2728, 2739, 2744, 2760, 3090, 3101, 3106, 3122, 529, 543, 564, 570, 1346, 1360, 1381, 1387, 1600, 1614, 1635, 1641, 2770, 2784, 2805, 2811];
	var rPAW_SCALLOP = [218, 226, 240, 253, 259, 263, 1200, 1208, 1222, 1235, 1241, 1245, 2723, 2731, 2745, 2758, 2764, 2768, 3085, 3093, 3107, 3120, 3126, 3130, 96, 110, 131, 137, 679, 693, 714, 720, 1785, 1799, 1820, 1826, 2666, 2680, 2701, 2707, 3040, 3054, 3075, 3081, 3410, 3424, 3445, 3451];

	var MUSHROOM_MUSHROOM = [533, 544, 549, 565, 1350, 1361, 1366, 1382, 1604, 1615, 1620, 1636, 2774, 2785, 2790, 2806];
	var MUSHROOM_SCALLOP = [528, 536, 550, 563, 569, 573, 1345, 1353, 1367, 1380, 1386, 1390, 1599, 1607, 1621, 1634, 1640, 1644, 2769, 2777, 2791, 2804, 2810, 2814, 100, 111, 116, 132, 683, 694, 699, 715, 1789, 1800, 1805, 1821, 2670, 2681, 2686, 2702, 3044, 3055, 3060, 3076, 3414, 3425, 3430, 3446];

	var SCALLOP_SCALLOP = [95, 103, 117, 130, 136, 140, 678, 686, 700, 713, 719, 723, 1784, 1792, 1806, 1819, 1825, 1829, 2665, 2673, 2687, 2700, 2706, 2710, 3039, 3047, 3061, 3074, 3080, 3084, 3409, 3417, 3431, 3444, 3450, 3454];


	var scpfilter = ['x44-STAR', 'x53-STAR', 'x62-STAR', 'x71-STAR', 'x8-STAR', 'x222-PAIRED', 'x222-PERPENDICULAR', 'x222-PARALLEL', 'x33-PAIRED', 'x33-PERPENDICULAR', 'x33-PARALLEL', 'x321-PAIRED', 'x321-PERPENDICULAR', 'x321-PARALLEL', 'x312-PAIRED', 'x312-PERPENDICULAR', 'x312-PARALLEL', 'L42-PAIRED', 'L42-PERPENDICULAR', 'L42-PARALLEL', 'R42-PAIRED', 'R42-PERPENDICULAR', 'R42-PARALLEL', 'x411-PAIRED', 'x411-PERPENDICULAR', 'x411-PARALLEL', 'L51-PAIRED', 'L51-PERPENDICULAR', 'L51-PARALLEL', 'R51-PAIRED', 'R51-PERPENDICULAR', 'R51-PARALLEL', 'x6-PAIRED', 'x6-PERPENDICULAR', 'x6-PARALLEL', 'SQUARE-SQUARE', 'SQUARE-KITE', 'SQUARE-BARREL', 'SQUARE-SHIELD', 'SQUARE-lFIST', 'SQUARE-rFIST', 'SQUARE-lPAW', 'SQUARE-rPAW', 'SQUARE-MUSHROOM', 'SQUARE-SCALLOP', 'KITE-KITE', 'KITE-BARREL', 'KITE-SHIELD', 'KITE-lFIST', 'KITE-rFIST', 'KITE-lPAW', 'KITE-rPAW', 'KITE-MUSHROOM', 'KITE-SCALLOP', 'BARREL-BARREL', 'BARREL-SHIELD', 'BARREL-lFIST', 'BARREL-rFIST', 'BARREL-lPAW', 'BARREL-rPAW', 'BARREL-MUSHROOM', 'BARREL-SCALLOP', 'SHIELD-SHIELD', 'SHIELD-lFIST', 'SHIELD-rFIST', 'SHIELD-lPAW', 'SHIELD-rPAW', 'SHIELD-MUSHROOM', 'SHIELD-SCALLOP', 'llFIST-lFIST', 'lFIST-rFIST', 'lFIST-lPAW', 'lFIST-rPAW', 'lFIST-MUSHROOM', 'lFIST-SCALLOP', 'rFIST-rFIST', 'rFIST-lPAW', 'rFIST-rPAW', 'rFIST-MUSHROOM', 'rFIST-SCALLOP', 'lPAW-lPAW', 'lPAW-rPAW', 'lPAW-MUSHROOM', 'lPAW-SCALLOP', 'rPAW-rPAW', 'rPAW-MUSHROOM', 'rPAW-SCALLOP', 'MUSHROOM-MUSHROOM', 'MUSHROOM-SCALLOP', 'SCALLOP-SCALLOP'];
	var scpprobs = [10, 16, 16, 16, 16, 24, 16, 8, 72, 48, 24, 72, 48, 24, 72, 48, 24, 96, 64, 32, 96, 64, 32, 96, 64, 32, 72, 48, 24, 72, 48, 24, 72, 48, 24, 4, 16, 16, 24, 24, 24, 16, 16, 16, 24, 16, 32, 48, 48, 48, 32, 32, 32, 48, 16, 48, 48, 48, 32, 32, 32, 48, 36, 72, 72, 48, 48, 48, 72, 36, 72, 48, 48, 48, 72, 36, 48, 48, 48, 72, 16, 32, 32, 48, 16, 32, 48, 16, 48, 36];
	var scpcases = [x44_STAR, x53_STAR, x62_STAR, x71_STAR, x8_STAR, x222_PAIRED, x222_PERPENDICULAR, x222_PARALLEL, x33_PAIRED, x33_PERPENDICULAR, x33_PARALLEL, x321_PAIRED, x321_PERPENDICULAR, x321_PARALLEL, x312_PAIRED, x312_PERPENDICULAR, x312_PARALLEL, L42_PAIRED, L42_PERPENDICULAR, L42_PARALLEL, R42_PAIRED, R42_PERPENDICULAR, R42_PARALLEL, x411_PAIRED, x411_PERPENDICULAR, x411_PARALLEL, L51_PAIRED, L51_PERPENDICULAR, L51_PARALLEL, R51_PAIRED, R51_PERPENDICULAR, R51_PARALLEL, x6_PAIRED, x6_PERPENDICULAR, x6_PARALLEL, SQUARE_SQUARE, SQUARE_KITE, SQUARE_BARREL, SQUARE_SHIELD, SQUARE_lFIST, SQUARE_rFIST, SQUARE_lPAW, SQUARE_rPAW, SQUARE_MUSHROOM, SQUARE_SCALLOP, KITE_KITE, KITE_BARREL, KITE_SHIELD, KITE_lFIST, KITE_rFIST, KITE_lPAW, KITE_rPAW, KITE_MUSHROOM, KITE_SCALLOP, BARREL_BARREL, BARREL_SHIELD, BARREL_lFIST, BARREL_rFIST, BARREL_lPAW, BARREL_rPAW, BARREL_MUSHROOM, BARREL_SCALLOP, SHIELD_SHIELD, SHIELD_lFIST, SHIELD_rFIST, SHIELD_lPAW, SHIELD_rPAW, SHIELD_MUSHROOM, SHIELD_SCALLOP, llFIST_lFIST, lFIST_rFIST, lFIST_lPAW, lFIST_rPAW, lFIST_MUSHROOM, lFIST_SCALLOP, rFIST_rFIST, rFIST_lPAW, rFIST_rPAW, rFIST_MUSHROOM, rFIST_SCALLOP, lPAW_lPAW, lPAW_rPAW, lPAW_MUSHROOM, lPAW_SCALLOP, rPAW_rPAW, rPAW_MUSHROOM, rPAW_SCALLOP, MUSHROOM_MUSHROOM, MUSHROOM_SCALLOP, SCALLOP_SCALLOP];

	function square1SolverGetRandomScramble(type, length, cases) {
		Shape_$clinit();
		Square_$clinit();
		var idx = mathlib.rndEl(scpcases[cases]);
		var scrambleString = Search_solution(new Search_Search, FullCube_randomCube(idx));
		return scrambleString;
	}

	scramble.reg('sqrs', square1SolverGetRandomScramble, [scpfilter, scpprobs]);


	return {
		initialize: $.noop,
		getRandomScramble: square1SolverGetRandomScramble
	};

})(mathlib.set8Perm, mathlib.get8Perm, mathlib.circle, mathlib.rn);