"use strict";

(function(rn, rndEl, mega) {
	var cubesuff = ["", "2", "'"];
	var minxsuff = ["", "2", "'", "2'"];
	var seq = [];
	var p = [];

	function adjScramble(faces, adj, len, suffixes) {
		if (suffixes == undefined) {
			suffixes = [""];
		}
		var used = 0;
		var face;
		var ret = [];
		for (var j = 0; j < len; j++) {
			do {
				face = rn(faces.length);
			} while ((used >> face) & 1);
			ret.push(faces[face] + rndEl(suffixes));
			used &= ~adj[face];
			used |= 1 << face;
		}
		return ret.join(" ");
	}

	function yj4x4(type, len) {
		// the idea is to keep the fixed center on U and do Rw or Lw, Fw or Bw, to not disturb it
		var turns = [
			["U", "D"],
			["R", "L", "r"],
			["F", "B", "f"]
		];
		var donemoves = [];
		var lastaxis;
		var fpos = 0; // 0 = Ufr, 1 = Ufl, 2 = Ubl, 3 = Ubr
		var j, k;
		var s = "";
		lastaxis = -1;
		for (j = 0; j < len; j++) {
			var done = 0;
			do {
				var first = rn(turns.length);
				var second = rn(turns[first].length);
				if (first != lastaxis || donemoves[second] == 0) {
					if (first == lastaxis) {
						donemoves[second] = 1;
						var rs = rn(cubesuff.length);
						if (first == 0 && second == 0) {
							fpos = (fpos + 4 + rs) % 4;
						}
						if (first == 1 && second == 2) { // r or l
							if (fpos == 0 || fpos == 3) s += "l" + cubesuff[rs] + " ";
							else s += "r" + cubesuff[rs] + " ";
						} else if (first == 2 && second == 2) { // f or b
							if (fpos == 0 || fpos == 1) s += "b" + cubesuff[rs] + " ";
							else s += "f" + cubesuff[rs] + " ";
						} else {
							s += turns[first][second] + cubesuff[rs] + " ";
						}
					} else {
						for (k = 0; k < turns[first].length; k++) {
							donemoves[k] = 0;
						}
						lastaxis = first;
						donemoves[second] = 1;
						var rs = rn(cubesuff.length);
						if (first == 0 && second == 0) {
							fpos = (fpos + 4 + rs) % 4;
						}
						if (first == 1 && second == 2) { // r or l
							if (fpos == 0 || fpos == 3) s += "l" + cubesuff[rs] + " ";
							else s += "r" + cubesuff[rs] + " ";
						} else if (first == 2 && second == 2) { // f or b
							if (fpos == 0 || fpos == 1) s += "b" + cubesuff[rs] + " ";
							else s += "f" + cubesuff[rs] + " ";
						} else {
							s += turns[first][second] + cubesuff[rs] + " ";
						}
					}
					done = 1;
				}
			} while (done == 0);
		}
		return s;
	}

	scrMgr.reg('444yj', yj4x4);

	function bicube(type, len) {
		function canMove(face) {
			var u = [],
				i, j, done, z = 0;
			for (i = 0; i < 9; i++) {
				done = 0;
				for (j = 0; j < u.length; j++) {
					if (u[j] == start[d[face][i]]) done = 1;
				}
				if (done == 0) {
					u[u.length] = start[d[face][i]];
					if (start[d[face][i]] == 0) z = 1;
				}
			}
			return (u.length == 5 && z == 1);
		}

		function doMove(face, amount) {
			for (var i = 0; i < amount; i++) {
				var t = start[d[face][0]];
				start[d[face][0]] = start[d[face][6]];
				start[d[face][6]] = start[d[face][4]];
				start[d[face][4]] = start[d[face][2]];
				start[d[face][2]] = t;
				t = start[d[face][7]];
				start[d[face][7]] = start[d[face][5]];
				start[d[face][5]] = start[d[face][3]];
				start[d[face][3]] = start[d[face][1]];
				start[d[face][1]] = t;
			}
		}

		var d = [
			[0, 1, 2, 5, 8, 7, 6, 3, 4],
			[6, 7, 8, 13, 20, 19, 18, 11, 12],
			[0, 3, 6, 11, 18, 17, 16, 9, 10],
			[8, 5, 2, 15, 22, 21, 20, 13, 14]
		];
		var start = [1, 1, 2, 3, 3, 2, 4, 4, 0, 5, 6, 7, 8, 9, 10, 10, 5, 6, 7, 8, 9, 11, 11],
			move = "UFLR",
			s = "",
			arr = [],
			poss, done, i, j, x, y;
		while (arr.length < len) {
			poss = [1, 1, 1, 1];
			for (j = 0; j < 4; j++) {
				if (poss[j] == 1 && !canMove(j))
					poss[j] = 0;
			}
			done = 0;
			while (done == 0) {
				x = rn(4);
				if (poss[x] == 1) {
					y = rn(3) + 1;
					doMove(x, y);
					done = 1;
				}
			}
			arr[arr.length] = [x, y];
			if (arr.length >= 2) {
				if (arr[arr.length - 1][0] == arr[arr.length - 2][0]) {
					arr[arr.length - 2][1] = (arr[arr.length - 2][1] + arr[arr.length - 1][1]) % 4;
					arr = arr.slice(0, arr.length - 1);
				}
			}
			if (arr.length >= 1) {
				if (arr[arr.length - 1][1] == 0) {
					arr = arr.slice(0, arr.length - 1);
				}
			}
		}
		for (i = 0; i < len; i++) {
			s += move[arr[i][0]] + cubesuff[arr[i][1] - 1] + " ";
		}
		return s;
	}

	scrMgr.reg('bic', bicube);



	// Clock functions.
	function c(s) {
		var array = [s + "=0", s + "+1", s + "+2", s + "+3", s + "+4", s + "+5", s + "+6", s + "-5", s + "-4", s + "-3", s + "-2", s + "-1"];
		return " " + rndEl(array) + " ";
	}

	function c2() {
		return rndEl(["U", "d"]) + rndEl(["U", "d"]);
	}

	function c3() {
		return "     "
	}

	function do15puzzle(mirrored, len, arrow, tiny) {
		var moves = (mirrored ? ["U", "L", "R", "D"] : ["D", "R", "L", "U"]);
		var effect = [
			[0, -1],
			[1, 0],
			[-1, 0],
			[0, 1]
		];
		var x = 0,
			y = 3,
			r, lastr = 5,
			ret = [];
		for (var i = 0; i < len; i++) {
			do {
				r = rn(4);
			} while (x + effect[r][0] < 0 || x + effect[r][0] > 3 || y + effect[r][1] < 0 || y + effect[r][1] > 3 || r + lastr == 3);
			x += effect[r][0];
			y += effect[r][1];
			if (ret.length > 0 && ret[ret.length - 1][0] == r) {
				ret[ret.length - 1][1]++;
			} else {
				ret.push([r, 1]);
			}
			lastr = r;
		}
		var retstr = '';
		for (var i = 0; i < ret.length; i++) {
			var m = mirrored ? ret[i][0] : (3 - ret[i][0]);
			m = (arrow ? "\uFFEA\uFFE9\uFFEB\uFFEC" : "ULRD").charAt(m);
			if (tiny) {
				retstr += m + (ret[i][1] == 1 ? '' : ret[i][1]) + ' ';
			} else {
				for (var j = 0; j < ret[i][1]; j++) {
					retstr += m + ' ';
				}
			}
		}
		return retstr;
	}

	function pochscramble(x, y) {
		var ret = "";
		var i, j;
		for (i = 0; i < y; i++) {
			ret += "  ";
			for (j = 0; j < x; j++) {
				ret += (j % 2 == 0 ? "R" : "D") + rndEl(["++", "--"]) + " ";
			}
			ret += "U" + (ret.endsWith("-- ") ? "'\\n" : "~\\n");
		}
		return ret;
	}

	function carrotscramble(x, y) {
		var ret = "";
		var i, j;
		for (i = 0; i < y; i++) {
			ret += " ";
			for (j = 0; j < x / 2; j++) {
				ret += rndEl(["+", "-"]) + rndEl(["+", "-"]) + " ";
			}
			ret += "U" + rndEl(["'\\n", "~\\n"]);
		}
		return ret;
	}

	function gigascramble(len) {
		var ret = "";
		var i, j;
		for (i = 0; i < Math.ceil(len / 10); i++) {
			ret += "  ";
			for (j = 0; j < 10; j++) {
				ret += (j % 2 == 0 ? ("Rr".charAt(rn(2))) : ("Dd".charAt(rn(2)))) + rndEl(["+ ", "++", "- ", "--"]) + " ";
			}
			ret += "y" + rndEl(minxsuff) + "\\n";
		}
		return ret;
	}

	function sq1_scramble(type, len) {
		seq = [];
		var i, k;
		sq1_getseq(1, type, len);
		var s = "";
		for (i = 0; i < seq[0].length; i++) {
			k = seq[0][i];
			if (k[0] == 7) {
				s += "/";
			} else {
				s += " (" + k[0] + "," + k[1] + ") ";
			}
		}
		return s;
	}

	function ssq1t_scramble(len) {
		seq = [];
		var i;
		sq1_getseq(2, 0, len);
		var s = seq[0],
			t = seq[1],
			u = "";
		if (s[0][0] == 7) s = [
			[0, 0]
		].concat(s);
		if (t[0][0] == 7) t = [
			[0, 0]
		].concat(t);
		for (i = 0; i < len; i++) {
			u += "(" + s[2 * i][0] + "," + t[2 * i][0] + "," + t[2 * i][1] + "," + s[2 * i][1] + ") / ";
		}
		return u;
	}

	function sq1_getseq(num, type, len) {
		for (var n = 0; n < num; n++) {
			p = [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0];
			seq[n] = [];
			var cnt = 0;
			while (cnt < len) {
				var x = rn(12) - 5;
				var y = (type == 2) ? 0 : rn(12) - 5;
				var size = (x == 0 ? 0 : 1) + (y == 0 ? 0 : 1);
				if ((cnt + size <= len || type != 1) && (size > 0 || cnt == 0)) {
					if (sq1_domove(x, y)) {
						if (type == 1) cnt += size;
						if (size > 0) seq[n][seq[n].length] = [x, y];
						if (cnt < len || type != 1) {
							cnt++;
							seq[n][seq[n].length] = [7, 0];
							sq1_domove(7, 0);
						}
					}
				}
			}
		}
	}

	function sq1_domove(x, y) {
		var i, px, py;
		if (x == 7) {
			for (i = 0; i < 6; i++) {
				mathlib.circle(p, i + 6, i + 12);
			}
			return true;
		} else {
			if (p[(17 - x) % 12] || p[(11 - x) % 12] || p[12 + (17 - y) % 12] || p[12 + (11 - y) % 12]) {
				return false;
			} else {
				// do the move itself
				px = p.slice(0, 12);
				py = p.slice(12, 24);
				for (i = 0; i < 12; i++) {
					p[i] = px[(12 + i - x) % 12];
					p[i + 12] = py[(12 + i - y) % 12];
				}
				return true;
			}
		}
	}

	function moyuRedi(length) {
		var ret = [];
		for (var i = 0; i < length; i++) {
			ret.push(mega([
				["R"],
				["L"]
			], ["", "'"], 3 + rn(3)));
		}
		return ret.join(' x ');
	}

	function addPyrTips(scramble, moveLen) {
		var cnt = 0;
		var rnd = [];
		for (var i = 0; i < 4; i++) {
			rnd[i] = rn(3);
			if (rnd[i] > 0) {
				rnd[i] = "ulrb".charAt(i) + ["! ", "' "][rnd[i] - 1];
				cnt++;
			} else {
				rnd[i] = "";
			}
		}
		return scramble.substr(0, scramble.length - moveLen * cnt) + " " + rnd.join("");
	}

	function utilscramble(type, len) {
		var ret = "";
		switch (type) {
			case "15p": // 15 puzzle
				return do15puzzle(false, len);
			case "15pm": // 15 puzzle, mirrored
				return do15puzzle(true, len);
			case "15pat": // 15 puzzle
				return do15puzzle(false, len, true, true);
			case "clkwca": // Clock (WCA Notation)
				var clkapp = ["0+", "1+", "2+", "3+", "4+", "5+", "6+", "1-", "2-", "3-", "4-", "5-"];
				ret = "UR? DR? DL? UL? U? R? D? L? ALL? y2 U? R? D? L? ALL?????";
				for (var i = 0; i < 14; i++) {
					ret = ret.replace('?', rndEl(clkapp));
				}
				return ret.replace('?', rndEl(["", " UR"])).replace('?', rndEl(["", " DR"])).replace('?', rndEl(["", " DL"])).replace('?', rndEl(["", " UL"]));
			case "clk": // Clock (Jaap order)
				return "UU" + c("u") + "dU" + c("u") + "dd" + c("u") + "Ud" + c("u") + "dU" + c("u") + "Ud" + c("u") + "UU" + c("u") + "UU" + c("u") + "UU" + c("u") + "dd" + c3() + c2() + "\\ndd" + c("d") + "dU" + c("d") + "UU" + c("d") + "Ud" + c("d") + "UU" + c3() + "UU" + c3() + "Ud" + c3() + "dU" + c3() + "UU" + c3() + "dd" + c("d") + c2();
			case "clkc": // Clock (concise)
				ret = "";
				for (var i = 0; i < 4; i++) ret += "(" + (rn(12) - 5) + ", " + (rn(12) - 5) + ") / ";
				for (var i = 0; i < 6; i++) ret += "(" + (rn(12) - 5) + ") / ";
				for (var i = 0; i < 4; i++) ret += rndEl(["d", "U"]);
				return ret;
			case "clke": // Clock (efficient order)
				return "UU" + c("u") + "dU" + c("u") + "dU" + c("u") + "UU" + c("u") + "UU" + c("u") + "UU" + c("u") + "Ud" + c("u") + "Ud" + c("u") + "dd" + c("u") + "dd" + c3() + c2() + "\\nUU" + c3() + "UU" + c3() + "dU" + c("d") + "dU" + c3() + "dd" + c("d") + "Ud" + c3() + "Ud" + c("d") + "UU" + c3() + "UU" + c("d") + "dd" + c("d") + c2();
			case "giga": // Gigaminx
				return gigascramble(len);
			case "mgmo": // Megaminx (old style)
				return adjScramble(["F", "B", "U", "D", "L", "DBR", "DL", "BR", "DR", "BL", "R", "DBL"], [0x554, 0xaa8, 0x691, 0x962, 0xa45, 0x58a, 0x919, 0x626, 0x469, 0x896, 0x1a5, 0x25a], len);
			case "mgmp": // Megaminx (Pochmann)
				return pochscramble(10, Math.ceil(len / 10));
			case "mgmc": // Megaminx (Carrot)
				return carrotscramble(10, Math.ceil(len / 10));
			case "heli":
				return adjScramble(["UF", "UR", "UB", "UL", "FR", "BR", "BL", "FL", "DF", "DR", "DB", "DL"], [0x09a, 0x035, 0x06a, 0x0c5, 0x303, 0x606, 0xc0c, 0x909, 0xa90, 0x530, 0xa60, 0x5c0], len);
			case "redi":
				return adjScramble(["L", "R", "F", "B", "l", "r", "f", "b"], [0x1c, 0x2c, 0x43, 0x83, 0xc1, 0xc2, 0x34, 0x38], len, ["", "'"]);
			case "redim":
				return moyuRedi(len);
			case "pyrm": // Pyraminx (random moves)
				ret = mega([
					["U"],
					["L"],
					["R"],
					["B"]
				], ["!", "'"], len);
				return addPyrTips(ret, 3).replace(/!/g, "");
			case "prcp": // Pyraminx Crystal (Pochmann)
				return pochscramble(10, Math.ceil(len / 10));
			case "mpyr": // Master Pyraminx
				ret = adjScramble(["U!", "L!", "R!", "B!", "Uw", "Lw", "Rw", "Bw"], [0xe0, 0xd0, 0xb0, 0x70, 0xee, 0xdd, 0xbb, 0x77], len, ["!", "'"]);
				return addPyrTips(ret, 4).replace(/!/g, "");
			case "r3": // multiple 3x3x3 relay
				for (var i = 0; i < len; i++) {
					ret += (i == 0 ? "" : "\\n") + (i + 1) + ") ${333}";
				}
				return scrMgr.formatScramble(ret);
			case "r3ni": // multiple 3x3x3 bld
				for (var i = 0; i < len; i++) {
					ret += (i == 0 ? "" : "\\n") + (i + 1) + ") ${333ni}";
				}
				return scrMgr.formatScramble(ret);
			case "sq1h": // Square-1 (turn metric)
				return sq1_scramble(1, len);
			case "sq1t": // Square-1 (twist metric)
				return sq1_scramble(0, len);
			case "sq2": // Square-2
				var i = 0;
				while (i < len) {
					var rndu = rn(12) - 5;
					var rndd = rn(12) - 5;
					if (rndu != 0 || rndd != 0) {
						i++;
						ret += "(" + rndu + "," + rndd + ") / ";
					}
				}
				return ret;
			case "ssq1t": // Super Square-1 (twist metric)
				return ssq1t_scramble(len);
			case "bsq": // Bandaged Square-1 </,(1,0)>
				return sq1_scramble(2, len);
			case "-1": // -1x-1x-1 (micro style)
				for (var i = 0; i < len; i++) {
					ret += String.fromCharCode(32 + rn(224));
				}
				ret += "Error: subscript out of range";
				return ret;
			case "333noob": // 3x3x3 for noobs
				ret = mega(SCRAMBLE_NOOBST, SCRAMBLE_NOOBSS.split('|'), len).replace(/t/, "T");
				return ret.substr(0, ret.length - 2) + ".";
			case "lol": // LOL
				ret = mega([
					["L"],
					["O"]
				], 0, len);
				return ret.replace(/ /g, "");
		}
		console.log('Error');
	}


	scrMgr.reg(['15p', '15pm', '15pat', 'clkwca', 'clk', 'clkc', 'clke', 'giga', 'mgmo', 'mgmp', 'mgmc', 'heli', 'redi', 'redim', 'pyrm', 'prcp', 'mpyr', 'r3', 'r3ni', 'sq1h', 'sq1t', 'sq2', 'ssq1t', 'bsq', '-1', '333noob', 'lol'], utilscramble);

})(mathlib.rn, mathlib.rndEl, scrMgr.mega);
