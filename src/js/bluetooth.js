"use strict";

var GiikerCube = execMain(function() {

	var cube = undefined;
	var _device = null;

	var GiikerCube = (function() {

		var _server = null;
		var _chrct = null;

		var UUID_SUFFIX = '-0000-1000-8000-00805f9b34fb';

		var SERVICE_UUID_DATA = '0000aadb' + UUID_SUFFIX;
		var CHRCT_UUID_DATA = '0000aadc' + UUID_SUFFIX;

		var SERVICE_UUID_RW = '0000aaaa' + UUID_SUFFIX;
		var CHRCT_UUID_READ = '0000aaab' + UUID_SUFFIX;
		var CHRCT_UUID_WRITE = '0000aaac' + UUID_SUFFIX;

		var deviceName;

		function init(device) {
			deviceName = device.name.startsWith('Gi') ? 'Giiker' : 'Mi Smart';
			return device.gatt.connect().then(function(server) {
				_server = server;
				return server.getPrimaryService(SERVICE_UUID_DATA);
			}).then(function(service) {
				return service.getCharacteristic(CHRCT_UUID_DATA);
			}).then(function(chrct) {
				_chrct = chrct;
				return _chrct.startNotifications();
			}).then(function() {
				return _chrct.readValue();
			}).then(function(value) {
				var initState = parseState(value);
				if (initState[0] != kernel.getProp('giiSolved', mathlib.SOLVED_FACELET)) {
					var rst = kernel.getProp('giiRST');
					if (rst == 'a' || rst == 'p' && confirm(CONFIRM_GIIRST)) {
						giikerutil.markSolved();
					}
				}
				return _chrct.addEventListener('characteristicvaluechanged', onStateChanged);
			});
		}

		function onStateChanged(event) {
			var value = event.target.value;
			parseState(value);
		}

		var cFacelet = [
			[26, 15, 29],
			[20, 8, 9],
			[18, 38, 6],
			[24, 27, 44],
			[51, 35, 17],
			[45, 11, 2],
			[47, 0, 36],
			[53, 42, 33]
		];

		var eFacelet = [
			[25, 28],
			[23, 12],
			[19, 7],
			[21, 41],
			[32, 16],
			[5, 10],
			[3, 37],
			[30, 43],
			[52, 34],
			[48, 14],
			[46, 1],
			[50, 39]
		];

		function toHexVal(value) {
			var raw = [];
			for (var i = 0; i < 20; i++) {
				raw.push(value.getUint8(i));
			}
			if (raw[18] == 0xa7) { // decrypt
				var key = [176, 81, 104, 224, 86, 137, 237, 119, 38, 26, 193, 161, 210, 126, 150, 81, 93, 13, 236, 249, 89, 235, 88, 24, 113, 81, 214, 131, 130, 199, 2, 169, 39, 165, 171, 41];
				var k1 = raw[19] >> 4 & 0xf;
				var k2 = raw[19] & 0xf;
				for (var i = 0; i < 18; i++) {
					raw[i] += key[i + k1] + key[i + k2];
				}
				raw = raw.slice(0, 18);
			}
			var valhex = [];
			for (var i = 0; i < raw.length; i++) {
				valhex.push(raw[i] >> 4 & 0xf);
				valhex.push(raw[i] & 0xf);
			}
			return valhex;
		}

		function parseState(value) {
			var timestamp = $.now();

			var valhex = toHexVal(value);
			var eo = [];
			for (var i = 0; i < 3; i++) {
				for (var mask = 8; mask != 0; mask >>= 1) {
					eo.push((valhex[i + 28] & mask) ? 1 : 0);
				}
			}
			var cc = new mathlib.CubieCube();
			var coMask = [-1, 1, -1, 1, 1, -1, 1, -1];
			for (var i = 0; i < 8; i++) {
				cc.ca[i] = (valhex[i] - 1) | ((3 + valhex[i + 8] * coMask[i]) % 3) << 3;
			}
			for (var i = 0; i < 12; i++) {
				cc.ea[i] = (valhex[i + 16] - 1) << 1 | eo[i];
			}
			var facelet = cc.toFaceCube(cFacelet, eFacelet);

			var moves = valhex.slice(32, 40);
			var prevMoves = [];
			for (var i = 0; i < moves.length; i += 2) {
				prevMoves.push("BDLURF".charAt(moves[i] - 1) + " 2'".charAt((moves[i + 1] - 1) % 7));
			}
			if (DEBUG) {
				var hexstr = [];
				for (var i = 0; i < 40; i++) {
					hexstr.push("0123456789abcdef".charAt(valhex[i]));
				}
				console.log('[giiker]', "Raw Data: ", valhex.join(""));
				console.log('[giiker]', "Current State: ", facelet);
				console.log('[giiker]', "A Valid Generator: ", scramble_333.genFacelet(facelet));
				console.log('[giiker]', "Previous Moves: ", prevMoves.reverse().join(" "));
				prevMoves.reverse();
			}
			callback(facelet, prevMoves, timestamp, deviceName);
			return [facelet, prevMoves];
		}

		function getBatteryLevel() {
			var _service;
			var _read;
			var _resolve;
			var listener = function(event) {
				_resolve([event.target.value.getUint8(1), deviceName]);
				_read.removeEventListener('characteristicvaluechanged', listener);
				_read.stopNotifications();
			};
			return _server.getPrimaryService(SERVICE_UUID_RW).then(function(service) {
				_service = service;
				return service.getCharacteristic(CHRCT_UUID_READ);
			}).then(function(chrct) {
				_read = chrct;
				return _read.startNotifications();
			}).then(function() {
				return _read.addEventListener('characteristicvaluechanged', listener);
			}).then(function() {
				return _service.getCharacteristic(CHRCT_UUID_WRITE);
			}).then(function(chrct) {
				chrct.writeValue(new Uint8Array([0xb5]).buffer);
				return new Promise(function(resolve) {
					_resolve = resolve;
				});
			});
		}

		return {
			init: init,
			opservs: [SERVICE_UUID_DATA, SERVICE_UUID_RW],
			getBatteryLevel: getBatteryLevel
		}
	})();

	var GanCube = (function() {

		var _server;
		var _service_data;
		var _service_meta;
		var _chrct_f2;
		var _chrct_f5;
		var _chrct_f6;
		var _chrct_f7;

		var UUID_SUFFIX = '-0000-1000-8000-00805f9b34fb';
		var SERVICE_UUID_META = '0000180a' + UUID_SUFFIX;
		var CHRCT_UUID_VERSION = '00002a28' + UUID_SUFFIX;
		var CHRCT_UUID_HARDWARE = '00002a23' + UUID_SUFFIX;
		var SERVICE_UUID_DATA = '0000fff0' + UUID_SUFFIX;
		var CHRCT_UUID_F2 = '0000fff2' + UUID_SUFFIX; // cube state, (54 - 6) facelets, 3 bit per facelet
		var CHRCT_UUID_F3 = '0000fff3' + UUID_SUFFIX; // prev moves
		var CHRCT_UUID_F5 = '0000fff5' + UUID_SUFFIX; // gyro state, move counter, pre moves
		var CHRCT_UUID_F6 = '0000fff6' + UUID_SUFFIX; // move counter, time offsets between premoves
		var CHRCT_UUID_F7 = '0000fff7' + UUID_SUFFIX;

		var decoder = null;

		var KEYS = [
			"NoRgnAHANATADDWJYwMxQOxiiEcfYgSK6Hpr4TYCs0IG1OEAbDszALpA",
			"NoNg7ANATFIQnARmogLBRUCs0oAYN8U5J45EQBmFADg0oJAOSlUQF0g"
		];

		function getKey(version, value) {
			var key = KEYS[version >> 8 & 0xff];
			if (!key) {
				return;
			}
			key = JSON.parse(LZString.decompressFromEncodedURIComponent(key));
			for (var i = 0; i < 6; i++) {
				key[i] = (key[i] + value.getUint8(5 - i)) & 0xff;
			}
			return key;
		}

		function decode(value) {
			var ret = [];
			for (var i = 0; i < value.byteLength; i++) {
				ret[i] = value.getUint8(i);
			}
			if (decoder == null) {
				return ret;
			}
			if (ret.length > 16) {
				ret = ret.slice(0, ret.length - 16).concat(
					decoder.decrypt(ret.slice(ret.length - 16))
				);
			}
			decoder.decrypt(ret);
			return ret;
		}

		function checkHardware(server) {
			return server.getPrimaryService(SERVICE_UUID_META).then(function(service_meta) {
				_service_meta = service_meta;
				return service_meta.getCharacteristic(CHRCT_UUID_VERSION);
			}).then(function(chrct) {
				return chrct.readValue();
			}).then(function(value) {
				var version = value.getUint8(0) << 16 | value.getUint8(1) << 8 | value.getUint8(2);
				DEBUG && console.log('[gancube] version', JSON.stringify(version));
				decoder = null;
				if (version > 0x010007 && (version & 0xfffe00) == 0x010000) {
					return _service_meta.getCharacteristic(CHRCT_UUID_HARDWARE).then(function(chrct) {
						return chrct.readValue();
					}).then(function(value) {
						var key = getKey(version, value);
						if (!key) {
							logohint.push('Not support your Gan cube');
							return;
						}
						DEBUG && console.log('[gancube] key', JSON.stringify(key));
						decoder = new aes128(key);
					});
				} else { //not support
					logohint.push('Not support your Gan cube');
				}
			});
		}

		function init(device) {
			return device.gatt.connect().then(function(server) {
				_server = server;
				return checkHardware(server);
			}).then(function() {
				return _server.getPrimaryService(SERVICE_UUID_DATA);
			}).then(function(service_data) {
				_service_data = service_data;
				return _service_data.getCharacteristic(CHRCT_UUID_F2);
			}).then(function(chrct) {
				_chrct_f2 = chrct;
				return _service_data.getCharacteristic(CHRCT_UUID_F5);
			}).then(function(chrct) {
				_chrct_f5 = chrct;
				return _service_data.getCharacteristic(CHRCT_UUID_F6);
			}).then(function(chrct) {
				_chrct_f6 = chrct;
				return _service_data.getCharacteristic(CHRCT_UUID_F7);
			}).then(function(chrct) {
				_chrct_f7 = chrct;
			}).then(loopRead);
		}

		var prevMoves;
		var prevCubie = new mathlib.CubieCube();
		var curCubie = new mathlib.CubieCube();
		var latestFacelet;
		var timestamp;
		var prevTimestamp = 0;
		var moveCnt = -1;
		var prevMoveCnt = -1;
		var movesFromLastCheck = 1000;

		function checkState() {
			if (movesFromLastCheck < 50) {
				return new Promise(function(resolve) {
					resolve(false);
				});
			}
			return _chrct_f2.readValue().then(function(value) {
				value = decode(value);
				var state = [];
				for (var i = 0; i < value.length - 2; i += 3) {
					var face = value[i ^ 1] << 16 | value[i + 1 ^ 1] << 8 | value[i + 2 ^ 1];
					for (var j = 21; j >= 0; j -= 3) {
						state.push("URFDLB".charAt(face >> j & 0x7));
						if (j == 12) {
							state.push("URFDLB".charAt(i / 3));
						}
					}
				}
				latestFacelet = state.join("");
				movesFromLastCheck = 0;
				return new Promise(function(resolve) {
					resolve(true);
				});
			});
		}

		function loopRead() {
			if (!_device) {
				return;
			}
			return _chrct_f5.readValue().then(function(value) {
				value = decode(value);
				timestamp = $.now();
				moveCnt = value[12];
				if (moveCnt == prevMoveCnt) {
					return;
				}
				prevMoves = [];
				for (var i = 0; i < 6; i++) {
					var m = value[13 + i];
					prevMoves.unshift("URFDLB".charAt(~~(m / 3)) + " 2'".charAt(m % 3));
				}
				var f6val;
				return _chrct_f6.readValue().then(function(value) {
					value = decode(value);
					f6val = value;
					return checkState();
				}).then(function(isUpdated) {
					if (isUpdated && prevMoveCnt == -1) {
						callback(latestFacelet, prevMoves, timestamp, 'Gan 356i');
						prevCubie.fromFacelet(latestFacelet);
						prevMoveCnt = moveCnt;
						if (latestFacelet != kernel.getProp('giiSolved', mathlib.SOLVED_FACELET)) {
							var rst = kernel.getProp('giiRST');
							if (rst == 'a' || rst == 'p' && confirm(CONFIRM_GIIRST)) {
								giikerutil.markSolved();
							}
						}
						return;
					}

					var timeOffs = [];
					for (var i = 0; i < 9; i++) {
						var off = f6val[i * 2 + 1] | f6val[i * 2 + 2] << 8;
						timeOffs.unshift(~~(off / 0.95));
					}

					var moveDiff = (moveCnt - prevMoveCnt) & 0xff;
					prevMoveCnt = moveCnt;
					movesFromLastCheck += moveDiff;
					if (moveDiff > 6) {
						movesFromLastCheck = 50;
						moveDiff = 6;
					}
					var _timestamp = prevTimestamp;
					for (var i = moveDiff - 1; i >= 0; i--) {
						_timestamp += timeOffs[i];
					}
					if (Math.abs(_timestamp - timestamp) > 2000) {
						console.log('[gancube]', 'time adjust', timestamp - _timestamp, '@', timestamp);
						prevTimestamp += timestamp - _timestamp;
					}

					for (var i = moveDiff - 1; i >= 0; i--) {
						var m = "URFDLB".indexOf(prevMoves[i][0]) * 3 + " 2'".indexOf(prevMoves[i][1]);
						mathlib.CubieCube.EdgeMult(prevCubie, mathlib.CubieCube.moveCube[m], curCubie);
						mathlib.CubieCube.CornMult(prevCubie, mathlib.CubieCube.moveCube[m], curCubie);
						prevTimestamp += timeOffs[i];
						callback(curCubie.toFaceCube(), prevMoves.slice(i), prevTimestamp, 'Gan 356i');
						var tmp = curCubie;
						curCubie = prevCubie;
						prevCubie = tmp;
					}
					if (isUpdated && prevCubie.toFaceCube() != latestFacelet) {
						console.log('[gancube]', 'Cube state check error');
						console.log('[gancube]', 'calc', prevCubie.toFaceCube());
						console.log('[gancube]', 'read', latestFacelet);
						prevCubie.fromFacelet(latestFacelet);
					}
				});
			}).then(loopRead);
		}

		function getBatteryLevel() {
			return _chrct_f7.readValue().then(function(value) {
				value = decode(value);
				return new Promise(function(resolve) {
					resolve([value[7], 'Gan 356i']);
				});
			});
		}

		var aes128 = (function() {
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

			return AES128;
		})();

		return {
			init: init,
			opservs: [SERVICE_UUID_DATA, SERVICE_UUID_META],
			getBatteryLevel: getBatteryLevel
		}
	})();

	var GoCube = (function() {

		var _server;
		var _service;
		var _read;
		var _write;

		var UUID_SUFFIX = '-b5a3-f393-e0a9-e50e24dcca9e';
		var SERVICE_UUID = '6e400001' + UUID_SUFFIX;
		var CHRCT_UUID_WRITE = '6e400002' + UUID_SUFFIX;
		var CHRCT_UUID_READ = '6e400003' + UUID_SUFFIX;

		var WRITE_BATTERY = 50;
		var WRITE_STATE = 51;

		function init(device) {
			return device.gatt.connect().then(function(server) {
				_server = server;
				return server.getPrimaryService(SERVICE_UUID);
			}).then(function(service) {
				_service = service;
				return _service.getCharacteristic(CHRCT_UUID_WRITE);
			}).then(function(chrct) {
				_write = chrct;
				return _service.getCharacteristic(CHRCT_UUID_READ);
			}).then(function(chrct) {
				_read = chrct;
				return _read.startNotifications();
			}).then(function() {
				return _read.addEventListener('characteristicvaluechanged', onStateChanged);
			}).then(function() {
				return _write.writeValue(new Uint8Array([WRITE_STATE]).buffer);
			});
		}

		function onStateChanged(event) {
			var value = event.target.value;
			parseData(value);
		}

		function toHexVal(value) {
			var valhex = [];
			for (var i = 0; i < value.byteLength; i++) {
				valhex.push(value.getUint8(i) >> 4 & 0xf);
				valhex.push(value.getUint8(i) & 0xf);
			}
			return valhex;
		}

		var axisPerm = [5, 2, 0, 3, 1, 4];
		var facePerm = [0, 1, 2, 5, 8, 7, 6, 3];
		var faceOffset = [0, 0, 6, 2, 0, 0];
		var curBatteryLevel = -1;
		var batteryResolveList = [];
		var moveCntFree = 100;
		var curFacelet = mathlib.SOLVED_FACELET;
		var curCubie = new mathlib.CubieCube();
		var prevCubie = new mathlib.CubieCube();

		function parseData(value) {
			var timestamp = $.now();
			if (value.byteLength < 4) {
				return;
			}
			if (value.getUint8(0) != 0x2a ||
				value.getUint8(value.byteLength - 2) != 0x0d ||
				value.getUint8(value.byteLength - 1) != 0x0a) {
				return;
			}
			var msgType = value.getUint8(2);
			var msgLen = value.byteLength - 6;
			if (msgType == 1) { // move
				// console.log(toHexVal(value));
				for (var i = 0; i < msgLen; i += 2) {
					var axis = axisPerm[value.getUint8(3 + i) >> 1];
					var power = [0, 2][value.getUint8(3 + i) & 1];
					var m = axis * 3 + power;
					console.log('move', "URFDLB".charAt(axis) + " 2'".charAt(power));
					mathlib.CubieCube.EdgeMult(prevCubie, mathlib.CubieCube.moveCube[m], curCubie);
					mathlib.CubieCube.CornMult(prevCubie, mathlib.CubieCube.moveCube[m], curCubie);
					curFacelet = curCubie.toFaceCube();
					callback(curFacelet, ["URFDLB".charAt(axis) + " 2'".charAt(power)], timestamp, 'GoCube');
					var tmp = curCubie;
					curCubie = prevCubie;
					prevCubie = tmp;
					if (++moveCntFree > 20) {
						moveCntFree = 0;
						_write.writeValue(new Uint8Array([WRITE_STATE]).buffer);
					}
				}
			} else if (msgType == 2) { // cube state
				var facelet = [];
				for (var a = 0; a < 6; a++) {
					var axis = axisPerm[a] * 9;
					var aoff = faceOffset[a];
					facelet[axis + 4] = "BFUDRL".charAt(value.getUint8(3 + a * 9));
					for (var i = 0; i < 8; i++) {
						facelet[axis + facePerm[(i + aoff) % 8]] = "BFUDRL".charAt(value.getUint8(3 + a * 9 + i + 1));
					}
				}
				var newFacelet = facelet.join('');
				if (newFacelet != curFacelet) {
					console.log('facelet', newFacelet);
					curCubie.fromFacelet(newFacelet);
				}
			} else if (msgType == 3) { // quaternion
			} else if (msgType == 5) { // battery level
				console.log('battery level', toHexVal(value));
				curBatteryLevel = value.getUint8(3);
				while (batteryResolveList.length != 0) {
					batteryResolveList.shift()(curBatteryLevel);
				}
			} else if (msgType == 7) { // offline stats
				console.log('offline stats', toHexVal(value));
			} else if (msgType == 8) { // cube type
				console.log('cube type', toHexVal(value));
			}
		}

		function getBatteryLevel() {
			_write.writeValue(new Uint8Array([WRITE_BATTERY]).buffer);
			return new Promise(function(resolve) {
				batteryResolveList.push(resolve);
			});
		}

		return {
			init: init,
			opservs: [SERVICE_UUID],
			getBatteryLevel: getBatteryLevel
		};
	})();

	function init(timer) {

		if (!window.navigator || !window.navigator.bluetooth) {
			alert("Bluetooth API is not available. Ensure https access, and try chrome with chrome://flags/#enable-experimental-web-platform-features enabled");
			return Promise.resolve();
		}

		return window.navigator.bluetooth.requestDevice({
			filters: [{
				namePrefix: 'Gi'
			}, {
				namePrefix: 'Mi Smart Magic Cube'
			}, {
				namePrefix: 'GAN'
			}, {
				namePrefix: 'GoCube'
			}, {
				services: ['0000fe95-0000-1000-8000-00805f9b34fb']
			}, {
				services: [GiikerCube.opservs[0]]
			}],
			optionalServices: [].concat(GiikerCube.opservs, GanCube.opservs, GoCube.opservs),
		}).then(function(device) {
			console.log(device);
			_device = device;
			if (device.name.startsWith('Gi') || device.name.startsWith('Mi Smart Magic Cube')) {
				cube = GiikerCube;
				return GiikerCube.init(device);
			} else if (device.name.startsWith('GAN')) {
				cube = GanCube;
				return GanCube.init(device);
			} else if (device.name.startsWith('GoCube')) {
				cube = GoCube;
				return GoCube.init(device);
			} else {
				return Promise.resolve();
			}
		});
	}

	function stop() {
		if (!_device) {
			return;
		}
		_device.gatt.disconnect();
		_device = null;
	}

	var callback = $.noop;

	return {
		init: init,
		stop: stop,
		isConnected: function() {
			return _device != null;
		},
		setCallBack: function(func) {
			callback = func;
		},
		getCube: function() {
			return cube;
		}
	};
});
