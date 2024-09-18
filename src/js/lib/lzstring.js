// Copyright (c) 2013 Pieroxy <pieroxy@pieroxy.net>
// This work is free. You can redistribute it and/or modify it
// under the terms of the WTFPL, Version 2
// For more information see LICENSE.txt or http://www.wtfpl.net/
//
// For more information, the home page:
// http://pieroxy.net/blog/pages/lz-string/testing.html
//
// LZ-based compression algorithm, version 1.4.4
var LZString = (function() {
	"use strict";
	// private property
	var f = String.fromCharCode;
	var keyStrBase64 = alphaReverse("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=");
	var keyStrUriSafe = alphaReverse("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$");
	var baseReverseDic = {};

	function bitReverse16(value) {
		value = (value << 1 & 0xaaaa) | (value >> 1 & 0x5555);
		value = (value << 2 & 0xcccc) | (value >> 2 & 0x3333);
		value = (value << 4 & 0xf0f0) | (value >> 4 & 0x0f0f);
		value = (value << 8 & 0xff00) | (value >> 8 & 0x00ff);
		return value;
	}

	function alphaReverse(alphabet) {
		var rev = [];
		for (var i = 0; i < 64; i++) {
			rev[i] = alphabet.charAt(bitReverse16(i) >> 10);
		}
		return rev.join('');
	}

	function getBaseValue(alphabet) {
		if (!baseReverseDic[alphabet]) {
			baseReverseDic[alphabet] = {};
			for (var i = 0; i < alphabet.length; i++) {
				baseReverseDic[alphabet][alphabet.charAt(i)] = i;
			}
		}
		return baseReverseDic[alphabet];
	}

	var LZString = {
		compressToBase64: function(input) {
			if (input == null) return "";
			var res = LZString._compress(input, 6, function(a) {
				return keyStrBase64.charAt(a);
			});
			switch (res.length % 4) { // To produce valid Base64
				default: // When could this happen ?
					case 0:
					return res;
				case 1:
						return res + "===";
				case 2:
						return res + "==";
				case 3:
						return res + "=";
			}
		},

		decompressFromBase64: function(input) {
			if (input == null) return "";
			if (input == "") return null;
			var charMap = getBaseValue(keyStrBase64)
			return LZString._decompress(input.length, 6, function(index) {
				return charMap[input.charAt(index)];
			});
		},

		compressToUTF16: function(input) {
			if (input == null) return "";
			return LZString._compress(input, 15, function(a) {
				return f((bitReverse16(a) >> 1) + 32);
			}) + " ";
		},

		decompressFromUTF16: function(compressed) {
			if (compressed == null) return "";
			if (compressed == "") return null;
			return LZString._decompress(compressed.length, 15, function(index) {
				return bitReverse16(compressed.charCodeAt(index) - 32) >> 1;
			});
		},

		//compress into uint8array (UCS-2 big endian format)
		compressToUint8Array: function(uncompressed) {
			var compressed = LZString.compress(uncompressed);
			var buf = new Uint8Array(compressed.length * 2); // 2 bytes per character

			for (var i = 0, TotalLen = compressed.length; i < TotalLen; i++) {
				var current_value = compressed.charCodeAt(i);
				buf[i * 2] = current_value >>> 8;
				buf[i * 2 + 1] = current_value % 256;
			}
			return buf;
		},

		//decompress from uint8array (UCS-2 big endian format)
		decompressFromUint8Array: function(compressed) {
			if (compressed === null || compressed === undefined) {
				return LZString.decompress(compressed);
			} else {
				var buf = new Array(compressed.length / 2); // 2 bytes per character
				for (var i = 0, TotalLen = buf.length; i < TotalLen; i++) {
					buf[i] = compressed[i * 2] * 256 + compressed[i * 2 + 1];
				}

				var result = [];
				buf.forEach(function(c) {
					result.push(f(c));
				});
				return LZString.decompress(result.join(''));
			}
		},

		//compress into a string that is already URI encoded
		compressToEncodedURIComponent: function(input) {
			if (input == null) return "";
			return LZString._compress(input, 6, function(a) {
				return keyStrUriSafe.charAt(a);
			});
		},

		//decompress from an output of compressToEncodedURIComponent
		decompressFromEncodedURIComponent: function(input) {
			if (input == null) return "";
			if (input == "") return null;
			input = input.replace(/ /g, "+");
			var charMap = getBaseValue(keyStrUriSafe)
			return LZString._decompress(input.length, 6, function(index) {
				return charMap[input.charAt(index)];
			});
		},

		compress: function(uncompressed) {
			return LZString._compress(uncompressed, 16, function(a) {
				return f(bitReverse16(a));
			});
		},
		_compress: function(uncompressed, bitsPerChar, getCharFromInt) {
			if (uncompressed == null) return "";
			var i, value,
				root = Object.create(null), // Use trie to store the dictionary
				node = null,
				context_c = "",
				context_enlargeIn = 2, // Compensate for the first entry which should not count
				context_dictSize = 3,
				context_numBits = 2,
				context_data = [],
				data = {
					val: 0,
					remain: bitsPerChar
				};

			var appendBits = function(nBits, value) {
				while (nBits > 0) {
					var nFill = Math.min(nBits, data.remain);
					data.val |= (value & ((1 << nFill) - 1)) << (bitsPerChar - data.remain);
					data.remain -= nFill;
					nBits -= nFill;
					value >>= nFill;
					if (data.remain == 0) {
						context_data.push(getCharFromInt(data.val));
						data.val = 0;
						data.remain = bitsPerChar;
					}
				}
			};

			var writeNode = function(node) {
				if (node.code !== undefined) {
					if (node.code < 256) {
						appendBits(context_numBits, 0);
						appendBits(8, node.code);
					} else {
						appendBits(context_numBits, 1);
						appendBits(16, node.code);
					}
					context_enlargeIn--;
					if (context_enlargeIn == 0) {
						context_enlargeIn = 1 << context_numBits;
						context_numBits++;
					}
					delete node.code;
				} else {
					appendBits(context_numBits, node.id);
				}
				context_enlargeIn--;
				if (context_enlargeIn == 0) {
					context_enlargeIn = 1 << context_numBits;
					context_numBits++;
				}
			};

			node = root;

			for (i = 0; i < uncompressed.length; i += 1) {
				context_c = uncompressed.charAt(i);
				if (!root[context_c]) {
					root[context_c] = Object.create(null);
					root[context_c].id = context_dictSize++;
					root[context_c].code = context_c.charCodeAt(0);
				}

				if (node[context_c]) {
					node = node[context_c];
				} else {
					writeNode(node);
					// Add wc to the dictionary.
					node[context_c] = Object.create(null);
					node[context_c].id = context_dictSize++;
					node = root[context_c];
				}
			}

			// Output the code for w.
			if (node.id) {
				writeNode(node);
			}

			// Mark the end of the stream
			appendBits(context_numBits, 2);

			// Flush the last char
			appendBits(data.remain, 0);
			return context_data.join('');
		},

		decompress: function(compressed) {
			if (compressed == null) return "";
			if (compressed == "") return null;
			return LZString._decompress(compressed.length, 16, function(index) {
				return bitReverse16(compressed.charCodeAt(index));
			});
		},

		_decompress: function(length, bitsPerChar, getNextValue) {
			var dictionary = [],
				next,
				enlargeIn = 4,
				dictSize = 4,
				numBits = 3,
				entry = "",
				result = [],
				i,
				w,
				c,
				data = {
					val: 0,
					remain: 0,
					index: 0
				};

			var nextBits = function(nBits) {
				var bits = 0;
				var offset = 0;
				while (nBits > offset) {
					var nFill = Math.min(nBits - offset, data.remain);
					bits |= (data.val & ((1 << nFill) - 1)) << offset;
					offset += nFill;
					data.remain -= nFill;
					data.val >>= nFill;
					if (data.remain == 0) {
						data.remain = bitsPerChar;
						data.val = getNextValue(data.index++);
					}
				}
				return bits;
			};

			for (i = 0; i < 3; i++) {
				dictionary[i] = i;
			}

			switch (next = nextBits(2)) {
				case 0:
					c = f(nextBits(8));
					break;
				case 1:
					c = f(nextBits(16));
					break;
				case 2:
					return "";
			}
			dictionary[3] = c;
			w = c;
			result.push(c);
			while (true) {
				if (data.index > length) {
					return "";
				}

				switch (c = nextBits(numBits)) {
					case 0:
						dictionary[dictSize++] = f(nextBits(8));
						c = dictSize - 1;
						enlargeIn--;
						break;
					case 1:
						dictionary[dictSize++] = f(nextBits(16));
						c = dictSize - 1;
						enlargeIn--;
						break;
					case 2:
						return result.join('');
				}

				if (enlargeIn == 0) {
					enlargeIn = 1 << numBits;
					numBits++;
				}

				if (c < dictSize) {
					entry = dictionary[c];
				} else {
					if (c === dictSize) {
						entry = w + w.charAt(0);
					} else {
						return null;
					}
				}
				result.push(entry);

				// Add w+entry[0] to the dictionary.
				dictionary[dictSize++] = w + entry.charAt(0);
				enlargeIn--;

				w = entry;

				if (enlargeIn == 0) {
					enlargeIn = 1 << numBits;
					numBits++;
				}
			}
		}
	};
	return LZString;
})();
