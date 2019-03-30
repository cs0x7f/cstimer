"use strict";

var DEBUG = false;

var GiikerCube = execMain(function() {

	var SERVICE_UUID = '0000aadb-0000-1000-8000-00805f9b34fb';
	var CHARACTERISTIC_UUID = '0000aadc-0000-1000-8000-00805f9b34fb';

	var SYSTEM_SERVICE_UUID = '0000aaaa-0000-1000-8000-00805f9b34fb';
	var SYSTEM_READ_UUID = '0000aaab-0000-1000-8000-00805f9b34fb';
	var SYSTEM_WRITE_UUID = '0000aaac-0000-1000-8000-00805f9b34fb';

	var _device = null;
	var _server = null;
	var _characteristic = null;

	function init(timer) {

		if (!window.navigator || !window.navigator.bluetooth) {
			alert("Bluetooth API is not available. Ensure https access, and try chrome with chrome://flags/#enable-experimental-web-platform-features enabled");
			return;
		}

		return window.navigator.bluetooth.requestDevice({
			filters: [{
				namePrefix: 'Gi',
			}],
			optionalServices: [SERVICE_UUID, SYSTEM_SERVICE_UUID],
		}).then(function(device) {
			_device = device;
			return device.gatt.connect();
		}).then(function(server) {
			_server = server;
			return server.getPrimaryService(SERVICE_UUID);
		}).then(function(service) {
			return service.getCharacteristic(CHARACTERISTIC_UUID);
		}).then(function(characteristic) {
			_characteristic = characteristic;
			return characteristic.readValue();
		}).then(function(value) {
			var initState = parseState(value);
			if (initState[0] != kernel.getProp('giiSolved', mathlib.SOLVED_FACELET)) {
				var rst = kernel.getProp('giiRST');
				if (rst == 'a' || rst == 'p' && confirm(CONFIRM_GIIRST)) {
					giikerutil.markSolved();
				}
			}
			_characteristic.addEventListener('characteristicvaluechanged', onStateChanged);
			return _characteristic.startNotifications();
		});
	}

	function updateBatteryLevel(event) {
		console.log(event.target.value.getUint8(1));
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
			_read.addEventListener('characteristicvaluechanged', listener);
			return _read.startNotifications();
		}).then(function() {
			return _service.getCharacteristic(SYSTEM_WRITE_UUID);
		}).then(function(writeCharacteristic) {
			writeCharacteristic.writeValue(new Uint8Array([0xb5]).buffer);
			return new Promise(function(resolve) {
				_resolve = resolve;
			});
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
		if (DEBUG) {
			var giikerState = [];
			for (var i = 0; i < 20; i++) {
				giikerState.push("0123456789abcdef" [~~(value.getUint8(i) / 16)]);
				giikerState.push("0123456789abcdef" [value.getUint8(i) % 16]);
			}
			console.log("Raw Data: ", giikerState.join(""));
		}

		var giikerState = [];
		for (var i = 0; i < 20; i++) {
			giikerState.push(~~(value.getUint8(i) / 16));
			giikerState.push(value.getUint8(i) % 16);
		}
		var cp = giikerState.slice(0, 8);
		var co = giikerState.slice(8, 16);
		var ep = giikerState.slice(16, 28);
		var eo0 = giikerState.slice(28, 31);
		var moves = giikerState.slice(32, 40);
		var eo = [];
		for (var i = 0; i < 3; i++) {
			for (var mask = 8; mask != 0; mask >>= 1) {
				eo.push((eo0[i] & mask) ? 1 : 0);
			}
		}
		var cc = new mathlib.CubieCube();
		var coMask = [-1, 1, -1, 1, 1, -1, 1, -1];
		for (var i = 0; i < 8; i++) {
			cc.ca[i] = (cp[i] - 1) | ((3 + co[i] * coMask[i]) % 3) << 3;
		}
		for (var i = 0; i < 12; i++) {
			cc.ea[i] = (ep[i] - 1) << 1 | eo[i];
		}
		var facelet = cc.toFaceCube(cFacelet, eFacelet);
		var prevMoves = [];
		for (var i = 0; i < 4; i++) {
			prevMoves.push("BDLURF" [moves[i * 2] - 1] + " 2'" [(moves[i * 2 + 1] - 1) % 7]);
		}
		if (DEBUG) {
			console.log("Current State: ", facelet);
			console.log("A Valid Generator: ", scramble_333.genFacelet(facelet));
			console.log("Previous Moves: ", prevMoves.reverse().join(" "));
			prevMoves.reverse();
		}
		callback(facelet, prevMoves);
		return [facelet, prevMoves];
	}

	function stop() {
		if (!_device) {
			return;
		}
		_device.gatt.disconnect();
		_device = null;
	}

	var callback = $.noop;

	function parseStateTest(valueHex) {
		var ab = new ArrayBuffer(20);
		var dv = new DataView(ab);
		for (var i = 0; i < 20; i++) {
			dv.setUint8(i,
				"0123456789abcdef".indexOf(valueHex[i * 2]) * 16 +
				"0123456789abcdef".indexOf(valueHex[i * 2 + 1]));
		}
		return parseState(dv);
	}

	return {
		init: init,
		stop: stop,
		isConnected: function() {
			return _device != null;
		},
		setCallBack: function(func) {
			callback = func;
		},
		getBatteryLevel: getBatteryLevel,
		parseStateTest: parseStateTest
	}
});