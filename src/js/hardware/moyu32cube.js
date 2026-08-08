execMain(function() {
	var _gatt;
	var _service;
	var _chrct_read;
	var _chrct_write;
	var deviceName;
	var deviceMac = null;
	var prevMoves = [];
	var timeOffs = [];
	var prevCubie = new mathlib.CubieCube();
	var curCubie = new mathlib.CubieCube();
	var latestFacelet = mathlib.SOLVED_FACELET;
	var deviceTime = 0;
	var deviceTimeOffset = 0;
	var moveCnt = -1;
	var prevMoveCnt = -1;
	var batteryLevel = 0;

	var SERVICE_UUID = '0783b03e-7735-b5a0-1760-a305d2795cb0';
	var CHRT_UUID_READ = '0783b03e-7735-b5a0-1760-a305d2795cb1';
	var CHRT_UUID_WRITE = '0783b03e-7735-b5a0-1760-a305d2795cb2';

	var decoder = null;
	var KEYS = [
		'NoJgjANGYJwQrADgjEUAMBmKAWCP4JNIRswt81Yp5DztE1EB2AXSA',
		'NoRg7ANAzArNAc1IigFgqgTB9MCcE8cAbBCJpKgeaSAAxTSPxgC6QA'
	];

	/**
	 * Uses the same encryption scheme as GAN Gen2/3
	 */

	function getKeyAndIv(value) {
		var key = JSON.parse(LZString.decompressFromEncodedURIComponent(KEYS[0]));
		var iv = JSON.parse(LZString.decompressFromEncodedURIComponent(KEYS[1]));
		for (var i = 0; i < 6; i++) {
			key[i] = (key[i] + value[5 - i]) % 255;
			iv[i] = (iv[i] + value[5 - i]) % 255;
		}
		return [key, iv];
	}

	function initDecoder(mac) {
		var value = [];
		for (var i = 0; i < 6; i++) {
			value.push(parseInt(mac.slice(i * 3, i * 3 + 2), 16));
		}
		var keyiv = getKeyAndIv(value);
		decoder = $.aes128(keyiv[0]);
		decoder.iv = keyiv[1];
	}

	function decode(value) {
		var ret = [];
		for (var i = 0; i < value.byteLength; i++) {
			ret[i] = value.getUint8(i);
		}
		if (decoder == null) {
			return ret;
		}
		var iv = decoder.iv || [];
		if (ret.length > 16) {
			var offset = ret.length - 16;
			var block = decoder.decrypt(ret.slice(offset));
			for (var i = 0; i < 16; i++) {
				ret[i + offset] = block[i] ^ (~~iv[i]);
			}
		}
		decoder.decrypt(ret);
		for (var i = 0; i < 16; i++) {
			ret[i] ^= (~~iv[i]);
		}
		return ret;
	}

	function encode(ret) {
		if (decoder == null) {
			return ret;
		}
		var iv = decoder.iv || [];
		for (var i = 0; i < 16; i++) {
			ret[i] ^= ~~iv[i];
		}
		decoder.encrypt(ret);
		if (ret.length > 16) {
			var offset = ret.length - 16;
			var block = ret.slice(offset);
			for (var i = 0; i < 16; i++) {
				block[i] ^= ~~iv[i];
			}
			decoder.encrypt(block);
			for (var i = 0; i < 16; i++) {
				ret[i + offset] = block[i];
			}
		}
		return ret;
	}

	function sendRequest(req) {
		if (!_chrct_write) {
			giikerutil.log('[Moyu32Cube] sendRequest cannot find write chrct');
			return;
		}
		var encodedReq = encode(req.slice());
		giikerutil.log('[Moyu32Cube] sendRequest', req, encodedReq);
		return _chrct_write.writeValue(new Uint8Array(encodedReq).buffer);
	}

	function sendSimpleRequest(opcode) {
		var req = mathlib.valuedArray(20, 0);
		req[0] = opcode;
		return sendRequest(req);
	}

	function requestCubeInfo() {
		return sendSimpleRequest(161);
	}

	function requestCubeStatus() {
		return sendSimpleRequest(163);
	}

	function requestCubePower() {
		return sendSimpleRequest(164);
	}

	function getManufacturerDataBytes(mfData) {
		if (mfData instanceof DataView) { // this is workaround for Bluefy browser
			return new DataView(mfData.buffer.slice(2));
		}
		for (var id of MOYU32_CIC_LIST) {
			if (mfData.has(id)) {
				giikerutil.log('[Moyu32Cube] found Manufacturer Data under CIC = 0x' + id.toString(16).padStart(4, '0'));
				return mfData.get(id);
			}
		}
		giikerutil.log('[Moyu32Cube] Looks like this cube has new unknown CIC');
	}

	/**
	 * The MoYu MAC is recovered from the advertisement's manufacturer-specific data,
	 * but Web Bluetooth only delivers manufacturer data for company ids (CICs) declared
	 * up front (see cics / optionalManufacturerData), so we enumerate every CIC a cube
	 * might use.
	 *
	 * When the cube is "bound" in the WCU Cube app, the CIC equals the high bytes of the
	 * account ID (32-bit int), little-endian (account ID 0xaabbccdd -> CIC 0xbbaa). An
	 * *unbound* cube uses CIC 0x0000.
	 *
	 * CIC 0x0000 used to be unusable in Chromium: its manufacturer-data map rejected 0 as
	 * a key (WTF::HashMap IntHashTraits empty_value = 0), so a 0x0000 advertisement failed
	 * deserialization and took gatt.connect() down with it:
	 *
	 *   ERROR:map_traits_wtf_hash_map.h(52)] The key value is disallowed by WTF::HashMap
	 *   ERROR:validation_errors.cc(117)] Invalid message: VALIDATION_ERROR_DESERIALIZATION_FAILED
	 *   ERROR:interface_endpoint_client.cc(722)] Message 0 rejected by interface blink.mojom.WebBluetoothAdvertisementClient
	 *   FATAL:script_promise_resolver.cc(72)] ScriptPromiseResolverBase was not properly detached
	 *     ... blink::BluetoothRemoteGATTServer::connect ...
	 *
	 * This was Chromium-only and is fixed as of Chrome 130 (stable), which switched the
	 * manufacturer-data map key to WebBluetoothCompanyPtr:
	 *   - crbug.com/356891475
	 *   - https://chromiumdash.appspot.com/commit/0d5a45bd61cbe3e5fd5356ff23e357ce64d444d5
	 *
	 * So we include 0x0000 by default and only omit it on a build we can positively identify
	 * as pre-130 Chromium (see moyu32SkipCic0000) - unbound cubes then auto-detect on modern
	 * Chrome and on non-Chromium clients such as Bluefy.
	 *
	 * CICs range 0x0000-0xFFFF; we only enumerate up to 0xFF00, as account IDs aren't expected
	 * to reach 0x01000000 (16777216) anytime soon.
	 */
	function moyu32SkipCic0000() {
		// Skip 0x0000 ONLY on a build positively identified as pre-130 Chromium (the crash
		// was Chromium-only, fixed in Chrome 130 - see comment above). Allow it everywhere
		// else: modern Chromium, and non-Chromium clients (e.g. Bluefy) that never had the bug.
		var brands = navigator.userAgentData && navigator.userAgentData.brands;
		if (!brands) return false; // non-Chromium / no UA-CH -> never buggy
		for (var b of brands) {
			if ((b.brand == 'Google Chrome' || b.brand == 'Chromium')
					&& parseInt(b.version, 10) < 130) {
				return true;
			}
		}
		return false;
	}

	// CICs 0x0000..0xFF00 (0x0000 omitted on pre-130 Chromium; see moyu32SkipCic0000)
	var MOYU32_CIC_LIST = mathlib.valuedArray(255, function (i) { return (i + 1) << 8 });
	if (!moyu32SkipCic0000()) {
		MOYU32_CIC_LIST.unshift(0x0000);
	}

	function initMac(forcePrompt, isWrongKey) {
		var defaultMac = null;
		if (/^WCU_MY32_[0-9A-F]{4}$/.exec(deviceName)) {
			defaultMac = 'CF:30:16:00:' + deviceName.slice(9, 11) + ':' + deviceName.slice(11, 13);
		}
		deviceMac = giikerutil.reqMacAddr(forcePrompt, isWrongKey, deviceMac, defaultMac);
		if (!deviceMac) {
			decoder = null;
			return;
		}
		initDecoder(deviceMac);
	}

	function init(device) {
		clear();
		deviceName = device.name.trim();
		giikerutil.log('[Moyu32Cube] start init device');
		return GiikerCube.waitForAdvs().then(function(mfData) {
			var dataView = getManufacturerDataBytes(mfData);
			if (dataView && dataView.byteLength >= 6) {
				var mac = [];
				for (var i = 0; i < 6; i++) {
					mac.push((dataView.getUint8(dataView.byteLength - i - 1) + 0x100).toString(16).slice(1));
				}
				return Promise.resolve(mac.join(':'));
			}
			return Promise.reject(-3);
		}).then(function (mac) {
			giikerutil.log('[Moyu32Cube] init, found cube bluetooth hardware MAC = ' + mac);
			deviceMac = mac;
		}, function (err) {
			giikerutil.log('[Moyu32Cube] init, unable to automatically determine cube MAC, error code = ' + err);
		}).then(function () {
			return device.gatt.connect();
		}).then(function (gatt) {
			_gatt = gatt;
			return gatt.getPrimaryService(SERVICE_UUID);
		}).then(function (service) {
			_service = service;
			giikerutil.log('[Moyu32Cube] got primary service', SERVICE_UUID);
			return _service.getCharacteristics();
		}).then(function (chrcts) {
			giikerutil.log('[Moyu32Cube] find chrcts', chrcts);
			_chrct_read = GiikerCube.findUUID(chrcts, CHRT_UUID_READ);
			_chrct_write = GiikerCube.findUUID(chrcts, CHRT_UUID_WRITE);
			if (!_chrct_read) {
				return Promise.reject('[Moyu32Cube] Cannot find required characteristics');
			}
			_chrct_read.addEventListener('characteristicvaluechanged', onStateChanged);
			return _chrct_read.startNotifications();
		}).then(function () {
			initMac(true);
			return requestCubeInfo();
		}).then(function () {
			return requestCubeStatus();
		}).then(function () {
			return requestCubePower();
		});
	}

	function onStateChanged(event) {
		var value = event.target.value;
		if (decoder == null) {
			return;
		}
		parseData(value);
	}

	function initCubeState() {
		var locTime = $.now();
		giikerutil.log('[Moyu32Cube] initialising cube state');
		GiikerCube.callback(latestFacelet, [], [null, locTime], deviceName);
		prevCubie.fromFacelet(latestFacelet);
		prevMoveCnt = moveCnt;
		if (latestFacelet != kernel.getProp('giiSolved', mathlib.SOLVED_FACELET)) {
			var rst = kernel.getProp('giiRST');
			if (rst == 'a' || rst == 'p' && confirm(CONFIRM_GIIRST)) {
				giikerutil.markSolved();
			}
		}
	}

	function parseData(value) {
		var locTime = $.now();
		value = decode(value);
		for (var i = 0; i < value.length; i++) {
			value[i] = (value[i] + 256).toString(2).slice(1);
		}
		value = value.join('');
		var msgType = parseInt(value.slice(0, 8), 2);
		if (msgType == 161) { // info
			giikerutil.log('[Moyu32Cube] received hardware info event', value);
			var devName = '';
			for (var i = 0; i < 8; i++)
				devName += String.fromCharCode(parseInt(value.slice(8 + i * 8, 16 + i * 8), 2));
			var hardwareVersion = parseInt(value.slice(72, 80), 2) + "." + parseInt(value.slice(80, 88), 2);
			var softwareVersion = parseInt(value.slice(88, 96), 2) + "." + parseInt(value.slice(96, 104), 2);
			giikerutil.log('[Moyu32Cube] Hardware Version', hardwareVersion);
			giikerutil.log('[Moyu32Cube] Software Version', softwareVersion);
			giikerutil.log('[Moyu32Cube] Device Name', devName);
		} else if (msgType == 163) { // state (facelets)
			if (prevMoveCnt == -1) { // we only care about the initial cube state, ignore any other state messages
				moveCnt = parseInt(value.slice(152, 160), 2);
				latestFacelet = parseFacelet(value.slice(8, 152));
				initCubeState();
			}
		} else if (msgType == 164) { // battery level
			batteryLevel = parseInt(value.slice(8, 16), 2);
			giikerutil.updateBattery([batteryLevel, deviceName]);
		} else if (msgType == 165) { // move
			moveCnt = parseInt(value.slice(88, 96), 2);
			if (moveCnt == prevMoveCnt || prevMoveCnt == -1) {
				return;
			}
			timeOffs = [];
			prevMoves = [];
			var invalidMove = false;
			for (var i = 0; i < 5; i++) {
				var m = parseInt(value.slice(96 + i * 5, 101 + i * 5), 2);
				timeOffs[i] = parseInt(value.slice(8 + i * 16, 24 + i * 16), 2);
				prevMoves[i] = "FBUDLR".charAt(m >> 1) + " '".charAt(m & 1);
				if (m >= 12) {
					prevMoves[i] = "U ";
					invalidMove = true;
				}
			}
			if (!invalidMove) {
				updateMoveTimes(locTime);
			}
		// } else if (msgType == 171) { // gyro
		}
	}

	function updateMoveTimes(locTime) {
		var moveDiff = (moveCnt - prevMoveCnt) & 0xff;
		moveDiff > 1 && giikerutil.log('[Moyu32Cube] bluetooth event was lost, moveDiff = ' + moveDiff);
		prevMoveCnt = moveCnt;
		if (moveDiff > prevMoves.length) {
			moveDiff = prevMoves.length;
		}
		var calcTs = deviceTime + deviceTimeOffset;
		for (var i = moveDiff - 1; i >= 0; i--) {
			calcTs += timeOffs[i];
		}
		if (!deviceTime || Math.abs(locTime - calcTs) > 2000) {
			giikerutil.log('[Moyu32Cube] time adjust', locTime - calcTs, '@', locTime);
			deviceTime += locTime - calcTs;
		}
		for (var i = moveDiff - 1; i >= 0; i--) {
			var m = "URFDLB".indexOf(prevMoves[i][0]) * 3 + " 2'".indexOf(prevMoves[i][1]);
			mathlib.CubieCube.CubeMult(prevCubie, mathlib.CubieCube.moveCube[m], curCubie);
			deviceTime += timeOffs[i];
			GiikerCube.callback(curCubie.toFaceCube(), prevMoves.slice(i), [deviceTime, i == 0 ? locTime : null], deviceName);
			var tmp = curCubie;
			curCubie = prevCubie;
			prevCubie = tmp;
			giikerutil.log('[Moyu32Cube] move', prevMoves[i], timeOffs[i]);
		}
		deviceTimeOffset = locTime - deviceTime;
	}

	function parseFacelet(faceletBits) {
		var state = [];
		var faces = [2, 5, 0, 3, 4, 1] // parse in order URFDLB instead of FBUDLR
		for (var i = 0; i < 6; i += 1) {
			var face = faceletBits.slice(faces[i] * 24, 24 + faces[i] * 24);
			for (var j = 0; j < 8; j += 1) {
				state.push("FBUDLR".charAt(parseInt(face.slice(j * 3, 3 + j * 3), 2)));
				if (j == 3) {
					state.push("FBUDLR".charAt(faces[i]));
				}
			}
		}
		return state.join('');
	}

	function getBatteryLevel() {
		return requestCubePower().then(function () {
			return Promise.resolve([batteryLevel, deviceName])
		});
	}

	function clear() {
		var result = Promise.resolve();
		_gatt = null;
		_service = null;
		if (_chrct_read) {
			_chrct_read.removeEventListener('characteristicvaluechanged', onStateChanged);
			result = _chrct_read.stopNotifications().catch($.noop);
			_chrct_read = null;
		}
		_chrct_write = null;
		deviceName = null;
		deviceMac = null;
		prevMoves = [];
		timeOffs = [];
		prevCubie = new mathlib.CubieCube();
		curCubie = new mathlib.CubieCube();
		latestFacelet = mathlib.SOLVED_FACELET;
		deviceTime = 0;
		deviceTimeOffset = 0;
		moveCnt = -1;
		prevMoveCnt = -1;
		batteryLevel = 0;

		return result;
	}

	GiikerCube.regCubeModel({
		prefix: 'WCU_MY3',
		init: init,
		opservs: [SERVICE_UUID],
		cics: MOYU32_CIC_LIST,
		getBatteryLevel: getBatteryLevel,
		clear: clear
	});
});
