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
	 * Automatic MAC address discovery only works when the cube is "bound" and has an account ID above 65535 (0xFFFF)
	 * 
	 * Explanation:
	 *
	 * When the cube is "bound" in the WCU Cube app, the CIC is equal to the high bytes of the account ID (32-bit int).
	 * The CIC is interpreted as little-endian (i.e. an account ID of 0xaabbccdd being bound to the cube results in a CIC of 0xbbaa).
	 * 
	 * Unfortunately, Chromium has an issue when receiving advertisements with CIC 0x0000
	 * seemingly related to its use of WTF::HashMap which disallows 0 as a key in this case (IntHashTraits: empty_value = 0).
	 * 
	 * ERROR:map_traits_wtf_hash_map.h(52)] The key value is disallowed by WTF::HashMap
	 * ERROR:validation_errors.cc(117)] Invalid message: VALIDATION_ERROR_DESERIALIZATION_FAILED
	 * ERROR:interface_endpoint_client.cc(722)] Message 0 rejected by interface blink.mojom.WebBluetoothAdvertisementClient
	 * 
	 * This issue then also causes device.gatt.connect() to fail, seemingly causing the promise to get abandoned and cube initialisation to fail:
	 * 
	 * FATAL:script_promise_resolver.cc(72)] Check failed: false. ScriptPromiseResolverBase was not properly detached; created at
	 *  base::debug::CollectStackTrace [0x00007FF9401EEFD7+39]
	 *  base::debug::StackTrace::StackTrace [0x00007FF9401A5E76+118]
	 *  blink::ScriptPromiseResolverBase::ScriptPromiseResolverBase [0x00007FF8F733040D+877]
	 *  blink::ScriptPromiseResolver<blink::BluetoothRemoteGATTServer>::ScriptPromiseResolver [0x00007FF8DBA0B93D+45]
	 *  cppgc::MakeGarbageCollectedTrait<blink::ScriptPromiseResolver<blink::BluetoothRemoteGATTServer> >::Call<blink::ScriptState *&,const blink::ExceptionContext &> [0x00007FF8DBA0B8D4+116]
	 *  blink::MakeGarbageCollected<blink::ScriptPromiseResolver<blink::BluetoothRemoteGATTServer>,blink::ScriptState *&,const blink::ExceptionContext &> [0x00007FF8DBA0449B+107]
	 *  blink::BluetoothRemoteGATTServer::connect [0x00007FF8DBA03EF5+133]
	 *  blink::`anonymous namespace'::v8_bluetooth_remote_gatt_server::ConnectOperationCallback [0x00007FF8DA8C69A4+1076]
	 * 
	 * Therefore, unbound cubes (bound account ID 0x00) and cubes with bound account IDs between 1 (0x01) and 65535 (0xFF) will not have automatic MAC address detection (even in Bluefy,
	 * as including 0x0000 in the CIC list will completely break Chrome support for this cube).
	 * Furthermore, the possible range of CICs is 0x0000 - 0xFFFF (65536 values). For now, we can just include CICs between 0x0100 and 0xFF00, as it is not likely that the account IDs
	 * will reach 16777216 (0x01000000) anytime soon.
	 */

	// CICs 0x(01..=FF)00
	var MOYU32_CIC_LIST = mathlib.valuedArray(255, function (i) { return (i + 1) << 8 });

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
			var hardwareVersion = parseInt(value.slice(88, 96), 2) + "." + parseInt(value.slice(96, 104), 2);
			var softwareVersion = parseInt(value.slice(72, 80), 2) + "." + parseInt(value.slice(80, 88), 2);
			giikerutil.log('[Moyu32Cube] Hardware Version (?)', hardwareVersion);
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
