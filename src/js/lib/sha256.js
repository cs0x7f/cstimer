(function() {
	'use strict';
	var safe_add = function(x, y) {
		var lsw = (x & 0xFFFF) + (y & 0xFFFF);
		var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
		return (msw << 16) | (lsw & 0xFFFF);
	};

	var S = function(X, n) {
		return (X >>> n) | (X << (32 - n));
	};

	var R = function(X, n) {
		return (X >>> n);
	};

	var Ch = function(x, y, z) {
		return ((x & y) ^ ((~x) & z));
	};

	var Maj = function(x, y, z) {
		return ((x & y) ^ (x & z) ^ (y & z));
	};

	var Sigma0256 = function(x) {
		return (S(x, 2) ^ S(x, 13) ^ S(x, 22));
	};

	var Sigma1256 = function(x) {
		return (S(x, 6) ^ S(x, 11) ^ S(x, 25));
	};

	var Gamma0256 = function(x) {
		return (S(x, 7) ^ S(x, 18) ^ R(x, 3));
	};

	var Gamma1256 = function(x) {
		return (S(x, 17) ^ S(x, 19) ^ R(x, 10));
	};

	var core_sha256 = function(m, l) {
		var K = [0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2];
		var HASH = [0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19];
		var W = [64];
		m[l >> 5] |= 0x80 << (24 - l % 32);
		m[((l + 64 >> 9) << 4) + 15] = l;
		for (var i = 0; i < m.length; i += 16) {
			var a = HASH[0];
			var b = HASH[1];
			var c = HASH[2];
			var d = HASH[3];
			var e = HASH[4];
			var f = HASH[5];
			var g = HASH[6];
			var h = HASH[7];
			for (var j = 0; j < 64; j++) {
				W[j] = j < 16 ? m[i + j] : safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
				var T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
				var T2 = safe_add(Sigma0256(a), Maj(a, b, c));
				h = g;
				g = f;
				f = e;
				e = safe_add(d, T1);
				d = c;
				c = b;
				b = a;
				a = safe_add(T1, T2);
			}
			HASH[0] = safe_add(a, HASH[0]);
			HASH[1] = safe_add(b, HASH[1]);
			HASH[2] = safe_add(c, HASH[2]);
			HASH[3] = safe_add(d, HASH[3]);
			HASH[4] = safe_add(e, HASH[4]);
			HASH[5] = safe_add(f, HASH[5]);
			HASH[6] = safe_add(g, HASH[6]);
			HASH[7] = safe_add(h, HASH[7]);
		}
		return HASH;
	};

	var str2binb = function(str) {
		var bin = [];
		var mask = (1 << 8) - 1;
		for (var i = 0; i < str.length * 8; i += 8) {
			bin[i >> 5] |= (str.charCodeAt(i / 8) & mask) << (24 - i % 32);
		}
		return bin;
	};

	var binb2hex = function(barr) {
		var hex_tab = "0123456789abcdef";
		var str = "";
		for (var i = 0; i < barr.length * 4; i++) {
			str += hex_tab.charAt((barr[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) + hex_tab.charAt((barr[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
		}
		return str;
	};

	$.sha256 = function(string) {
		if (/[\x80-\xFF]/.test(string)) {
			string = unescape(encodeURI(string));
		}
		return binb2hex(core_sha256(str2binb(string), string.length * 8));
	};
})();

(function() {
	"use strict";
	var Sbox = [99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22];
	var SboxI = [];
	var ShiftTabI = [0, 13, 10, 7, 4, 1, 14, 11, 8, 5, 2, 15, 12, 9, 6, 3];
	var xtime = [];

	function addRoundKey(state, rkey) {
		for (var i = 0; i < 16; i++) {
			state[i] ^= rkey[i];
		}
	}

	function shiftSubAdd(state, rkey) {
		var state0 = state.slice();
		for (var i = 0; i < 16; i++) {
			state[i] = SboxI[state0[ShiftTabI[i]]] ^ rkey[i];
		}
	}

	function shiftSubAddI(state, rkey) {
		var state0 = state.slice();
		for (var i = 0; i < 16; i++) {
			state[ShiftTabI[i]] = Sbox[state0[i] ^ rkey[i]];
		}
	}

	function mixColumns(state) {
		for (var i = 12; i >= 0; i -= 4) {
			var s0 = state[i + 0];
			var s1 = state[i + 1];
			var s2 = state[i + 2];
			var s3 = state[i + 3];
			var h = s0 ^ s1 ^ s2 ^ s3;
			state[i + 0] ^= h ^ xtime[s0 ^ s1];
			state[i + 1] ^= h ^ xtime[s1 ^ s2];
			state[i + 2] ^= h ^ xtime[s2 ^ s3];
			state[i + 3] ^= h ^ xtime[s3 ^ s0];
		}
	}

	function mixColumnsInv(state) {
		for (var i = 0; i < 16; i += 4) {
			var s0 = state[i + 0];
			var s1 = state[i + 1];
			var s2 = state[i + 2];
			var s3 = state[i + 3];
			var h = s0 ^ s1 ^ s2 ^ s3;
			var xh = xtime[h];
			var h1 = xtime[xtime[xh ^ s0 ^ s2]] ^ h;
			var h2 = xtime[xtime[xh ^ s1 ^ s3]] ^ h;
			state[i + 0] ^= h1 ^ xtime[s0 ^ s1];
			state[i + 1] ^= h2 ^ xtime[s1 ^ s2];
			state[i + 2] ^= h1 ^ xtime[s2 ^ s3];
			state[i + 3] ^= h2 ^ xtime[s3 ^ s0];
		}
	}

	function init() {
		if (xtime.length != 0) {
			return;
		}
		for (var i = 0; i < 256; i++) {
			SboxI[Sbox[i]] = i;
		}
		for (var i = 0; i < 128; i++) {
			xtime[i] = i << 1;
			xtime[128 + i] = (i << 1) ^ 0x1b;
		}
	}

	function AES128(key) {
		init();
		var exKey = key.slice();
		var Rcon = 1;
		for (var i = 16; i < 176; i += 4) {
			var tmp = exKey.slice(i - 4, i);
			if (i % 16 == 0) {
				tmp = [Sbox[tmp[1]] ^ Rcon, Sbox[tmp[2]], Sbox[tmp[3]], Sbox[tmp[0]]];
				Rcon = xtime[Rcon];
			}
			for (var j = 0; j < 4; j++) {
				exKey[i + j] = exKey[i + j - 16] ^ tmp[j];
			}
		}
		this.key = exKey;
	}

	AES128.prototype.decrypt = function(block) {
		addRoundKey(block, this.key.slice(160, 176));
		for (var i = 144; i >= 16; i -= 16) {
			shiftSubAdd(block, this.key.slice(i, i + 16));
			mixColumnsInv(block);
		}
		shiftSubAdd(block, this.key.slice(0, 16));
		return block;
	};

	AES128.prototype.encrypt = function(block) {
		shiftSubAddI(block, this.key.slice(0, 16));
		for (var i = 16; i < 160; i += 16) {
			mixColumns(block);
			shiftSubAddI(block, this.key.slice(i, i + 16));
		}
		addRoundKey(block, this.key.slice(160, 176));
		return block;
	}

	$.aes128 = function(key) {
		return new AES128(key);
	}
})();
