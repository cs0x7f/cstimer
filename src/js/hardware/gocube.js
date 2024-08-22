execMain(function() {
	var _gatt;
	var _service;
	var _read;
	var _write;
	var _deviceName;
	var UUID_SUFFIX = '-b5a3-f393-e0a9-e50e24dcca9e';
	var SERVICE_UUID = '6e400001' + UUID_SUFFIX;
	var CHRCT_UUID_WRITE = '6e400002' + UUID_SUFFIX;
	var CHRCT_UUID_READ = '6e400003' + UUID_SUFFIX;

	var WRITE_BATTERY = 50;
	var WRITE_STATE = 51;

	function init(device) {
		clear();
		_deviceName = device.name.startsWith('GoCube') ? 'GoCube' : 'Rubiks Connected'
		return device.gatt.connect().then(function(gatt) {
			_gatt = gatt;
			return gatt.getPrimaryService(SERVICE_UUID);
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
	var _batteryLevel;

	var axisPerm = [5, 2, 0, 3, 1, 4];
	var facePerm = [0, 1, 2, 5, 8, 7, 6, 3];
	var faceOffset = [0, 0, 6, 2, 0, 0];
	var moveCntFree = 100;
	var curFacelet = mathlib.SOLVED_FACELET;
	var curCubie = new mathlib.CubieCube();
	var prevCubie = new mathlib.CubieCube();
	var prevMoves = [];

	function parseData(value) {
		var locTime = $.now();
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
			// giikerutil.log(toHexVal(value));
			for (var i = 0; i < msgLen; i += 2) {
				var axis = axisPerm[value.getUint8(3 + i) >> 1];
				var power = [0, 2][value.getUint8(3 + i) & 1];
				var m = axis * 3 + power;
				giikerutil.log('[gocube] move', "URFDLB".charAt(axis) + " 2'".charAt(power));
				mathlib.CubieCube.CubeMult(prevCubie, mathlib.CubieCube.moveCube[m], curCubie);
				curFacelet = curCubie.toFaceCube();
				prevMoves.unshift("URFDLB".charAt(axis) + " 2'".charAt(power));
				if (prevMoves.length > 8)
					prevMoves = prevMoves.slice(0, 8);
				GiikerCube.callback(curFacelet, prevMoves, [locTime, locTime], _deviceName);
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
				giikerutil.log('[gocube] facelet', newFacelet);
				curCubie.fromFacelet(newFacelet);
			}
		} else if (msgType == 3) { // quaternion
		} else if (msgType == 5) { // battery level
			_batteryLevel = value.getUint8(3);
			giikerutil.log('[gocube] battery level', _batteryLevel);
		} else if (msgType == 7) { // offline stats
			giikerutil.log('[gocube] offline stats', toHexVal(value));
		} else if (msgType == 8) { // cube type
			giikerutil.log('[gocube] cube type', toHexVal(value));
		}
	}


	function getBatteryLevel() {
		if (!_write) {
			return Promise.reject("Bluetooth Cube is not connected");
		}
		_write.writeValue(new Uint8Array([WRITE_BATTERY]).buffer);
		return new Promise(function (resolve) {
			$.delayExec('getBatteryLevel', function () {
				resolve([_batteryLevel, _deviceName]);
			}, 1000);
		});
	}

	function clear() {
		var result = Promise.resolve();
		if (_read) {
			_read.removeEventListener('characteristicvaluechanged', onStateChanged);
			result = _read.stopNotifications().catch($.noop);
			_read = null;
		}
		_write = null;
		_service = null;
		_gatt = null;
		_deviceName = null;
		moveCntFree = 100;
		curFacelet = mathlib.SOLVED_FACELET;
		curCubie = new mathlib.CubieCube();
		prevCubie = new mathlib.CubieCube();
		prevMoves = [];
		return result;
	}

	GiikerCube.regCubeModel({
		prefix: ['GoCube', 'Rubiks'],
		init: init,
		opservs: [SERVICE_UUID],
		getBatteryLevel: getBatteryLevel,
		clear: clear
	});
});
