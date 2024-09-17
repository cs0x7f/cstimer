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

	// private property
	var f = String.fromCharCode;
	var keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
	var baseReverseDic = {};

	function bitReverse16(value) {
		value = (value << 1 & 0xaaaaaaaa) | (value >> 1 & 0x55555555);
		value = (value << 2 & 0xcccccccc) | (value >> 2 & 0x33333333);
		value = (value << 4 & 0xf0f0f0f0) | (value >> 4 & 0x0f0f0f0f);
		value = (value << 8 & 0xff00ff00) | (value >> 8 & 0x00ff00ff);
		return value;
	}

	function getBaseValue(alphabet, character) {
		if (!baseReverseDic[alphabet]) {
			baseReverseDic[alphabet] = {};
			for (var i = 0; i < alphabet.length; i++) {
				baseReverseDic[alphabet][alphabet.charAt(i)] = i;
			}
		}
		return baseReverseDic[alphabet][character];
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
			return LZString._decompress(input.length, 6, function(index) {
				return getBaseValue(keyStrBase64, input.charAt(index));
			});
		},

		compressToUTF16: function(input) {
			if (input == null) return "";
			return LZString._compress(input, 15, function(a) {
				return f(a + 32);
			}) + " ";
		},

		decompressFromUTF16: function(compressed) {
			if (compressed == null) return "";
			if (compressed == "") return null;
			return LZString._decompress(compressed.length, 15, function(index) {
				return compressed.charCodeAt(index) - 32;
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
			return LZString._decompress(input.length, 6, function(index) {
				return getBaseValue(keyStrUriSafe, input.charAt(index));
			});
		},

		compress: function(uncompressed) {
			return LZString._compress(uncompressed, 16, function(a) {
				return f(a);
			});
		},
		_compress: function(uncompressed, bitsPerChar, getCharFromInt) {
			if (uncompressed == null) return "";
			var i, value,
				context_dictionary = new Map(),
				context_dictionaryToCreate = new Map(),
				context_c = "",
				context_wc = "",
				context_w = "",
				context_enlargeIn = 2, // Compensate for the first entry which should not count
				context_dictSize = 3,
				context_numBits = 2,
				context_data = [],
				context_data_val = 0,
				context_data_position = 0,
				ii;

			var appendBits = function(nBits, value) {
				for (var i = 0; i < nBits; i++) {
					context_data_val = (context_data_val << 1) | (value & 1);
					if (context_data_position == bitsPerChar - 1) {
						context_data_position = 0;
						context_data.push(getCharFromInt(context_data_val));
						context_data_val = 0;
					} else {
						context_data_position++;
					}
					value >>= 1;
				}
			};

			for (ii = 0; ii < uncompressed.length; ii += 1) {
				context_c = uncompressed.charAt(ii);
				if (!context_dictionary.has(context_c)) {
					context_dictionary.set(context_c, context_dictSize++);
					context_dictionaryToCreate.set(context_c, true);
				}

				context_wc = context_w + context_c;
				if (context_dictionary.has(context_wc)) {
					context_w = context_wc;
				} else {
					if (context_dictionaryToCreate.has(context_w)) {
						if (context_w.charCodeAt(0) < 256) {
							appendBits(context_numBits, 0);
							appendBits(8, context_w.charCodeAt(0));
						} else {
							appendBits(context_numBits, 1);
							appendBits(16, context_w.charCodeAt(0));
						}
						context_enlargeIn--;
						if (context_enlargeIn == 0) {
							context_enlargeIn = 1 << context_numBits;
							context_numBits++;
						}
						context_dictionaryToCreate.delete(context_w);
					} else {
						appendBits(context_numBits, context_dictionary.get(context_w));
					}
					context_enlargeIn--;
					if (context_enlargeIn == 0) {
						context_enlargeIn = 1 << context_numBits;
						context_numBits++;
					}
					// Add wc to the dictionary.
					context_dictionary.set(context_wc, context_dictSize++);
					context_w = String(context_c);
				}
			}

			// Output the code for w.
			if (context_w !== "") {
				if (context_dictionaryToCreate.get(context_w)) {
					if (context_w.charCodeAt(0) < 256) {
						appendBits(context_numBits, 0);
						appendBits(8, context_w.charCodeAt(0));
					} else {
						appendBits(context_numBits, 1);
						appendBits(16, context_w.charCodeAt(0));
					}
					context_enlargeIn--;
					if (context_enlargeIn == 0) {
						context_enlargeIn = 1 << context_numBits;
						context_numBits++;
					}
					context_dictionaryToCreate.delete(context_w);
				} else {
					appendBits(context_numBits, context_dictionary.get(context_w));
				}
				context_enlargeIn--;
				if (context_enlargeIn == 0) {
					context_enlargeIn = 1 << context_numBits;
					context_numBits++;
				}
			}

			// Mark the end of the stream
			appendBits(context_numBits, 2);

			// Flush the last char
			do {
				appendBits(1, 0);
			} while (context_data_position != 0);
			return context_data.join('');
		},

		decompress: function(compressed) {
			if (compressed == null) return "";
			if (compressed == "") return null;
			return LZString._decompress(compressed.length, 16, function(index) {
				return compressed.charCodeAt(index);
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
						data.val = bitReverse16(getNextValue(data.index++)) >> (16 - bitsPerChar);
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
