execMain(function() {
	var _gatt = null;
	var _chrct = null;

	var UUID_SUFFIX = '-0000-1000-8000-00805f9b34fb';

	var SERVICE_UUID_DATA = '0000aadb' + UUID_SUFFIX;
	var CHRCT_UUID_DATA = '0000aadc' + UUID_SUFFIX;

	var SERVICE_UUID_RW = '0000aaaa' + UUID_SUFFIX;
	var CHRCT_UUID_READ = '0000aaab' + UUID_SUFFIX;
	var CHRCT_UUID_WRITE = '0000aaac' + UUID_SUFFIX;

	var deviceName;

	function init(device) {
		clear();
		deviceName = device.name.startsWith('Gi') ? 'Giiker' : 'Mi Smart';
		return device.gatt.connect().then(function(gatt) {
			_gatt = gatt;
			return gatt.getPrimaryService(SERVICE_UUID_DATA);
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
		var locTime = $.now();

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
			giikerutil.log('[giiker] Raw Data: ', valhex.join(""));
			giikerutil.log('[giiker] Current State: ', facelet);
			giikerutil.log('[giiker] A Valid Generator: ', scramble_333.genFacelet(facelet));
			giikerutil.log('[giiker] Previous Moves: ', prevMoves.slice().reverse().join(" "));
		}
		GiikerCube.callback(facelet, prevMoves, [locTime, locTime], deviceName);
		return [facelet, prevMoves];
	}

	function getBatteryLevel() {
		if (!_gatt) {
			return Promise.reject("Bluetooth Cube is not connected");
		}
		var _service;
		var _read;
		var _resolve;
		var listener = function(event) {
			_resolve([event.target.value.getUint8(1), deviceName]);
			_read.removeEventListener('characteristicvaluechanged', listener);
			_read.stopNotifications();
		};
		return _gatt.getPrimaryService(SERVICE_UUID_RW).then(function(service) {
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

	function clear() {
		var result = Promise.resolve();
		if (_chrct) {
			_chrct.removeEventListener('characteristicvaluechanged', onStateChanged);
			result = _chrct.stopNotifications().catch($.noop);
			_chrct = null;
		}
		_gatt = null;
		deviceName = null;
		return result;
	}

	GiikerCube.regCubeModel({
		prefix: ['Gi', 'Mi Smart Magic Cube', 'Hi-'],
		init: init,
		opservs: [SERVICE_UUID_DATA, SERVICE_UUID_RW],
		getBatteryLevel: getBatteryLevel,
		clear: clear
	});
});
