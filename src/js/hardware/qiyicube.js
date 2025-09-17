execMain(function() {
	var _gatt;
	var _service;
	var _deviceName;
	var _chrct_cube;
	var UUID_SUFFIX = '-0000-1000-8000-00805f9b34fb';
	var SERVICE_UUID = '0000fff0' + UUID_SUFFIX;
	var CHRCT_UUID_CUBE = '0000fff6' + UUID_SUFFIX;

	var QIYI_CIC_LIST = [0x0504];

	var decoder = null;
	var deviceMac = null;
	var KEYS = ['NoDg7ANAjGkEwBYCc0xQnADAVgkzGAzHNAGyRTanQi5QIFyHrjQMQgsC6QA'];

	function initMac(forcePrompt, isWrongKey) {
		var defaultMac = null;
		if (/^(QY-QYSC|XMD-TornadoV4-i)-.-[0-9A-F]{4}$/.exec(_deviceName)) {
			defaultMac = 'CC:A3:00:00:' + _deviceName.slice(-4, -2) + ':' + _deviceName.slice(-2);
		}
		deviceMac = giikerutil.reqMacAddr(forcePrompt, isWrongKey, deviceMac, defaultMac);
	}

	function crc16modbus(data) {
		var crc = 0xFFFF;
		for (var i = 0; i < data.length; i++) {
			crc ^= data[i];
			for (var j = 0; j < 8; j++) {
				crc = (crc & 0x1) > 0 ? (crc >> 1) ^ 0xa001 : crc >> 1;
			}
		}
		return crc;
	}

	// content: [u8, u8, ..]
	function sendMessage(content) {
		if (!_chrct_cube || DEBUGBL) {
			return DEBUGBL ? Promise.resolve() : Promise.reject();
		}
		var msg = [0xfe];
		msg.push(4 + content.length); // length = 1 (op) + cont.length + 2 (crc)
		for (var i = 0; i < content.length; i++) {
			msg.push(content[i]);
		}
		var crc = crc16modbus(msg);
		msg.push(crc & 0xff, crc >> 8);
		var npad = (16 - msg.length % 16) % 16;
		for (var i = 0; i < npad; i++) {
			msg.push(0);
		}
		var encMsg = [];
		decoder = decoder || $.aes128(JSON.parse(LZString.decompressFromEncodedURIComponent(KEYS[0])));
		for (var i = 0; i < msg.length; i += 16) {
			var block = msg.slice(i, i + 16);
			decoder.encrypt(block);
			for (var j = 0; j < 16; j++) {
				encMsg[i + j] = block[j];
			}
		}
		giikerutil.log('[qiyicube] send message to cube', msg, encMsg);
		return _chrct_cube.writeValue(new Uint8Array(encMsg).buffer);
	}

	function sendHello(mac) {
		if (!mac) {
			return Promise.reject('empty mac');
		}
		var content = [0x00, 0x6b, 0x01, 0x00, 0x00, 0x22, 0x06, 0x00, 0x02, 0x08, 0x00];
		for (var i = 5; i >= 0; i--) {
			content.push(parseInt(mac.slice(i * 3, i * 3 + 2), 16));
		}
		return sendMessage(content);
	}

	function getManufacturerDataBytes(mfData) {
		if (mfData instanceof DataView) { // this is workaround for Bluefy browser
			return new DataView(mfData.buffer.slice(2));
		}
		for (var id of QIYI_CIC_LIST) {
			if (mfData.has(id)) {
				giikerutil.log('[qiyicube] found Manufacturer Data under CIC = 0x' + id.toString(16).padStart(4, '0'));
				return mfData.get(id);
			}
		}
		giikerutil.log('[qiyicube] Looks like this cube has new unknown CIC');
	}

	function init(device) {
		clear();
		_deviceName = device.name.trim();
		giikerutil.log('[qiyicube] start init device');
		return GiikerCube.waitForAdvs().then(function(mfData) {
			var dataView = getManufacturerDataBytes(mfData);
			if (dataView && dataView.byteLength >= 6) {
				var mac = [];
				for (var i = 5; i >= 0; i--) {
					mac.push((dataView.getUint8(i) + 0x100).toString(16).slice(1));
				}
				return Promise.resolve(mac.join(':'));
			}
			return Promise.reject(-3);
		}).then(function(mac) {
			giikerutil.log('[qiyicube] init, found cube bluetooth hardware MAC = ' + mac);
			deviceMac = mac;
		}, function(err) {
			giikerutil.log('[qiyicube] init, unable to automatically determine cube MAC, error code = ' + err);
		}).then(function() {
			return device.gatt.connect();
		}).then(function(gatt) {
			_gatt = gatt;
			return gatt.getPrimaryService(SERVICE_UUID);
		}).then(function(service) {
			_service = service;
			giikerutil.log('[qiyicube] got primary service', SERVICE_UUID);
			return _service.getCharacteristics();
		}).then(function(chrcts) {
			giikerutil.log('[qiyicube] find chrcts', chrcts);
			_chrct_cube = GiikerCube.findUUID(chrcts, CHRCT_UUID_CUBE);
		}).then(function() {
			_chrct_cube.addEventListener('characteristicvaluechanged', onCubeEvent);
			return _chrct_cube.startNotifications();
		}).then(function() {
			initMac(true);
			return sendHello(deviceMac);
		});
	}

	function onCubeEvent(event) {
		var value = event.target.value;
		var encMsg = [];
		for (var i = 0; i < value.byteLength; i++) {
			encMsg[i] = value.getUint8(i);
		}
		giikerutil.log('[qiyicube] receive enc data', encMsg);
		decoder = decoder || $.aes128(JSON.parse(LZString.decompressFromEncodedURIComponent(KEYS[0])));
		var msg = [];
		for (var i = 0; i < encMsg.length; i += 16) {
			var block = encMsg.slice(i, i + 16);
			decoder.decrypt(block);
			for (var j = 0; j < 16; j++) {
				msg[i + j] = block[j];
			}
		}
		giikerutil.log('[qiyicube] decrypted msg', msg);
		msg = msg.slice(0, msg[1]);
		if (msg.length < 3 || crc16modbus(msg) != 0) {
			giikerutil.log('[qiyicube] crc checked error');
			return;
		}
		parseCubeData(msg);
	}

	var curCubie = new mathlib.CubieCube();
	var prevCubie = new mathlib.CubieCube();
	var prevMoves = [];
	var lastTs = 0;
	var batteryLevel = 0;

	function parseCubeData(msg) {
		var locTime = $.now();
		if (msg[0] != 0xfe) {
			giikerutil.log('[qiyicube] error cube data', msg);
			return;
		}
		var opcode = msg[2];
		var ts = (msg[3] << 24 | msg[4] << 16 | msg[5] << 8 | msg[6]);
		if (opcode == 0x2) { // cube hello
			batteryLevel = msg[35];
			sendMessage(msg.slice(2, 7));
			var newFacelet = parseFacelet(msg.slice(7, 34));
			GiikerCube.callback(newFacelet, [], [Math.trunc(ts / 1.6), locTime], _deviceName);
			prevCubie.fromFacelet(newFacelet);
			if (newFacelet != kernel.getProp('giiSolved', mathlib.SOLVED_FACELET)) {
				var rst = kernel.getProp('giiRST');
				if (rst == 'a' || rst == 'p' && confirm(CONFIRM_GIIRST)) {
					giikerutil.markSolved();
				}
			}
		} else if (opcode == 0x3) { // state change
			sendMessage(msg.slice(2, 7));
			// check timestamps
			var todoMoves = [[msg[34], ts]];
			while (todoMoves.length < 10) {
				var off = 91 - 5 * todoMoves.length;
				var hisTs = (msg[off] << 24 | msg[off + 1] << 16 | msg[off + 2] << 8 | msg[off + 3]);
				var hisMv = msg[off + 4];
				if (hisTs <= lastTs) {
					break;
				}
				todoMoves.push([hisMv, hisTs]);
			}
			if (todoMoves.length > 1) {
				giikerutil.log('[qiyicube] miss history moves', JSON.stringify(todoMoves), lastTs);
			}
			var toCallback = [];
			var curFacelet;
			for (var i = todoMoves.length - 1; i >= 0; i--) {
				var axis = [4, 1, 3, 0, 2, 5][(todoMoves[i][0] - 1) >> 1];
				var power = [0, 2][todoMoves[i][0] & 1];
				var m = axis * 3 + power;
				mathlib.CubieCube.CubeMult(prevCubie, mathlib.CubieCube.moveCube[m], curCubie);
				prevMoves.unshift("URFDLB".charAt(axis) + " 2'".charAt(power));
				prevMoves = prevMoves.slice(0, 8);
				curFacelet = curCubie.toFaceCube();
				toCallback.push([curFacelet, prevMoves.slice(), [Math.trunc(todoMoves[i][1] / 1.6), locTime], _deviceName]);
				var tmp = curCubie;
				curCubie = prevCubie;
				prevCubie = tmp;
			}
			var newFacelet = parseFacelet(msg.slice(7, 34));
			if (newFacelet != curFacelet) {
				giikerutil.log('[qiyicube] facelet', newFacelet);
				curCubie.fromFacelet(newFacelet);
				GiikerCube.callback(newFacelet, prevMoves, [Math.trunc(ts / 1.6), locTime], _deviceName);
				var tmp = curCubie;
				curCubie = prevCubie;
				prevCubie = tmp;
			} else {
				for (var i = 0; i < toCallback.length; i++) {
					GiikerCube.callback.apply(null, toCallback[i]);
				}
			}
			var newBatteryLevel = msg[35];
			if (newBatteryLevel != batteryLevel) {
				batteryLevel = newBatteryLevel;
				giikerutil.updateBattery([batteryLevel, _deviceName]);
			}
		}
		lastTs = ts;
	}

	$.parseQYData = parseCubeData; // for debug

	function parseFacelet(faceMsg) {
		var ret = [];
		for (var i = 0; i < 54; i++) {
			ret.push("LRDUFB".charAt(faceMsg[i >> 1] >> (i % 2 << 2) & 0xf));
		}
		ret = ret.join("");
		// giikerutil.log('[qiyicube]', 'parsedFacelet', ret);
		return ret;
	}

	function clear() {
		var result = Promise.resolve();
		if (_chrct_cube) {
			_chrct_cube.removeEventListener('characteristicvaluechanged', onCubeEvent);
			result = _chrct_cube.stopNotifications().catch($.noop);
			_chrct_cube = null;
		}
		_service = null;
		_gatt = null;
		_deviceName = null;
		deviceMac = null;
		curCubie = new mathlib.CubieCube();
		prevCubie = new mathlib.CubieCube();
		prevMoves = [];
		lastTs = 0;
		batteryLevel = 0;
		return result;
	}

	GiikerCube.regCubeModel({
		prefix: ['QY-QYSC', 'XMD-TornadoV4-i'],
		init: init,
		opservs: [SERVICE_UUID],
		cics: QIYI_CIC_LIST,
		getBatteryLevel: function() { return Promise.resolve([batteryLevel, _deviceName]); },
		clear: clear
	});
});
