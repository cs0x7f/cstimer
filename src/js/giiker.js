"use strict";

var GiikerCube = execMain(function() {

	var cube = undefined;
	var _device = null;

	var GiikerCube = (function() {

		var _server = null;
		var _characteristic = null;

		var SERVICE_UUID = '0000aadb-0000-1000-8000-00805f9b34fb';
		var CHARACTERISTIC_UUID = '0000aadc-0000-1000-8000-00805f9b34fb';

		var SYSTEM_SERVICE_UUID = '0000aaaa-0000-1000-8000-00805f9b34fb';
		var SYSTEM_READ_UUID = '0000aaab-0000-1000-8000-00805f9b34fb';
		var SYSTEM_WRITE_UUID = '0000aaac-0000-1000-8000-00805f9b34fb';

		function init(device) {
			return device.gatt.connect().then(function(server) {
				_server = server;
				return server.getPrimaryService(SERVICE_UUID);
			}).then(function(service) {
				return service.getCharacteristic(CHARACTERISTIC_UUID);
			}).then(function(characteristic) {
				_characteristic = characteristic;
				return _characteristic.startNotifications();
			}).then(function() {
				return _characteristic.readValue();
			}).then(function(value) {
				var initState = parseState(value);
				if (initState[0] != kernel.getProp('giiSolved', mathlib.SOLVED_FACELET)) {
					var rst = kernel.getProp('giiRST');
					if (rst == 'a' || rst == 'p' && confirm(CONFIRM_GIIRST)) {
						giikerutil.markSolved();
					}
				}
				return _characteristic.addEventListener('characteristicvaluechanged', onStateChanged);
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

		function parseState(value) {
			var timestamp = $.now();

			var valhex = [];
			for (var i = 0; i < 20; i++) {
				valhex.push(~~(value.getUint8(i) / 16));
				valhex.push(value.getUint8(i) % 16);
			}
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
			for (var i = 0; i < 4; i++) {
				prevMoves.push("BDLURF" [moves[i * 2] - 1] + " 2'" [(moves[i * 2 + 1] - 1) % 7]);
			}
			if (DEBUG) {
				var valhex = [];
				for (var i = 0; i < 20; i++) {
					valhex.push("0123456789abcdef" [~~(value.getUint8(i) / 16)]);
					valhex.push("0123456789abcdef" [value.getUint8(i) % 16]);
				}
				console.log('[giiker]', "Raw Data: ", valhex.join(""));
				console.log('[giiker]', "Current State: ", facelet);
				console.log('[giiker]', "A Valid Generator: ", scramble_333.genFacelet(facelet));
				console.log('[giiker]', "Previous Moves: ", prevMoves.reverse().join(" "));
				prevMoves.reverse();
			}
			callback(facelet, prevMoves, timestamp);
			return [facelet, prevMoves];
		}

		function getBatteryLevel() {
			var _service;
			var _read;
			var _resolve;
			var listener = function(event) {
				_resolve(event.target.value.getUint8(1));
				_read.removeEventListener('characteristicvaluechanged', listener);
				_read.stopNotifications();
			};
			return _server.getPrimaryService(SYSTEM_SERVICE_UUID).then(function(service) {
				_service = service;
				return service.getCharacteristic(SYSTEM_READ_UUID);
			}).then(function(readCharacteristic) {
				_read = readCharacteristic;
				return _read.startNotifications();
			}).then(function() {
				return _read.addEventListener('characteristicvaluechanged', listener);
			}).then(function() {
				return _service.getCharacteristic(SYSTEM_WRITE_UUID);
			}).then(function(writeCharacteristic) {
				writeCharacteristic.writeValue(new Uint8Array([0xb5]).buffer);
				return new Promise(function(resolve) {
					_resolve = resolve;
				});
			});
		}

		return {
			init: init,
			opservs: [SERVICE_UUID, SYSTEM_SERVICE_UUID],
			getBatteryLevel: getBatteryLevel
		}
	})();

	var GanCube = (function() {

		var _server;
		var _service;
		var _characteristic_f2;
		var _characteristic_f5;
		var _characteristic_f6;
		var _characteristic_f7;

		var SERVICE_UUID = '0000fff0-0000-1000-8000-00805f9b34fb';
		var CHARACTERISTIC_UUID_F2 = '0000fff2-0000-1000-8000-00805f9b34fb'; // cube state, (54 - 6) facelets, 3 bit per facelet
		var CHARACTERISTIC_UUID_F5 = '0000fff5-0000-1000-8000-00805f9b34fb'; // gyro state, move counter, pre moves
		var CHARACTERISTIC_UUID_F6 = '0000fff6-0000-1000-8000-00805f9b34fb'; // move counter, time offsets between premoves
		var CHARACTERISTIC_UUID_F7 = '0000fff7-0000-1000-8000-00805f9b34fb';

		function init(device) {
			return device.gatt.connect().then(function(server) {
				_server = server;
				return server.getPrimaryService(SERVICE_UUID);
			}).then(function(service) {
				_service = service;
				return _service.getCharacteristic(CHARACTERISTIC_UUID_F2);
			}).then(function(characteristic) {
				_characteristic_f2 = characteristic;
				return _service.getCharacteristic(CHARACTERISTIC_UUID_F5);
			}).then(function(characteristic) {
				_characteristic_f5 = characteristic;
				return _service.getCharacteristic(CHARACTERISTIC_UUID_F6);
			}).then(function(characteristic) {
				_characteristic_f6 = characteristic;
				return _service.getCharacteristic(CHARACTERISTIC_UUID_F7);
			}).then(function(characteristic) {
				_characteristic_f7 = characteristic;
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
			return _characteristic_f2.readValue().then(function(value) {
				var state = [];
				for (var i = 0; i < value.byteLength - 2; i += 3) {
					var face = value.getUint8(i ^ 1) << 16 | value.getUint8(i + 1 ^ 1) << 8 | value.getUint8(i + 2 ^ 1);
					for (var j = 21; j >= 0; j -= 3) {
						state.push("URFDLB".charAt([face >> j & 0x7]));
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
			return _characteristic_f5.readValue().then(function(value) {
				timestamp = $.now();
				moveCnt = value.getUint8(12);
				if (moveCnt == prevMoveCnt) {
					return;
				}
				prevMoves = [];
				for (var i = 0; i < 6; i++) {
					var m = value.getUint8(13 + i);
					prevMoves.unshift("URFDLB".charAt(~~(m / 3)) + " 2'".charAt(m % 3));
				}
				var f6val;
				return _characteristic_f6.readValue().then(function(value) {
					f6val = value;
					return checkState();
				}).then(function(isUpdated) {
					if (isUpdated && prevMoveCnt == -1) {
						callback(latestFacelet, prevMoves, timestamp);
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
						var off = f6val.getUint8(i * 2 + 1) | f6val.getUint8(i * 2 + 2) << 8;
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
						callback(curCubie.toFaceCube(), prevMoves.slice(i), prevTimestamp);
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
			}).then(loopRead);;
		}

		function getBatteryLevel() {
			return _characteristic_f7.readValue().then(function(value) {
				return new Promise(function(resolve) {
					resolve(value.getUint8(7));
				});
			});
		}

		return {
			init: init,
			opservs: [SERVICE_UUID],
			getBatteryLevel: getBatteryLevel
		}
	})();

	function init(timer) {

		if (!window.navigator || !window.navigator.bluetooth) {
			alert("Bluetooth API is not available. Ensure https access, and try chrome with chrome://flags/#enable-experimental-web-platform-features enabled");
			return;
		}

		return window.navigator.bluetooth.requestDevice({
			filters: [{
				namePrefix: 'Gi',
			}, {
				namePrefix: 'GAN',
			}],
			optionalServices: [].concat(GiikerCube.opservs, GanCube.opservs),
		}).then(function(device) {
			_device = device;
			if (device.name.startsWith('Gi')) {
				cube = GiikerCube;
				return GiikerCube.init(device);
			} else if (device.name.startsWith('GAN')) {
				cube = GanCube;
				return GanCube.init(device);
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
	}
});
