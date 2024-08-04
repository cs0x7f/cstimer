"use strict";

var GiikerCube = execMain(function() {

	var cube = undefined;
	var _device = null;

	function toUuid128(uuid) {
		if (/^[0-9A-Fa-f]{4}$/.exec(uuid)) {
			uuid = "0000" + uuid + "-0000-1000-8000-00805F9B34FB";
		}
		return uuid.toUpperCase();
	}

	function matchUUID(uuid1, uuid2) {
		return toUuid128(uuid1) == toUuid128(uuid2);
	}

	var GiikerCube = (function() {

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
				console.log('[giiker]', "Raw Data: ", valhex.join(""));
				console.log('[giiker]', "Current State: ", facelet);
				console.log('[giiker]', "A Valid Generator: ", scramble_333.genFacelet(facelet));
				console.log('[giiker]', "Previous Moves: ", prevMoves.slice().reverse().join(" "));
			}
			callback(facelet, prevMoves, [locTime, locTime], deviceName);
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

		return {
			init: init,
			opservs: [SERVICE_UUID_DATA, SERVICE_UUID_RW],
			getBatteryLevel: getBatteryLevel,
			clear: clear
		}
	})();

	var GanCube = (function() {

		var _gatt;
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

		var _service_v2data;
		var _chrct_v2read;
		var _chrct_v2write;
		var SERVICE_UUID_V2DATA = '6e400001-b5a3-f393-e0a9-e50e24dc4179';
		var CHRCT_UUID_V2READ = '28be4cb6-cd67-11e9-a32f-2a2ae2dbcce4';
		var CHRCT_UUID_V2WRITE = '28be4a4a-cd67-11e9-a32f-2a2ae2dbcce4';

		var _service_v3data;
		var _chrct_v3read;
		var _chrct_v3write;
		var SERVICE_UUID_V3DATA = '8653000a-43e6-47b7-9cb0-5fc21d4ae340';
		var CHRCT_UUID_V3READ = '8653000b-43e6-47b7-9cb0-5fc21d4ae340';
		var CHRCT_UUID_V3WRITE = '8653000c-43e6-47b7-9cb0-5fc21d4ae340';

		// List of Company Identifier Codes, fill with all values range [0x0001, 0xFF01] possible for GAN cubes
		var GAN_CIC_LIST = mathlib.valuedArray(256, function (i) { return (i << 8) | 0x01 });

		var decoder = null;
		var deviceName = null;
		var deviceMac = null;

		var KEYS = [
			"NoRgnAHANATADDWJYwMxQOxiiEcfYgSK6Hpr4TYCs0IG1OEAbDszALpA",
			"NoNg7ANATFIQnARmogLBRUCs0oAYN8U5J45EQBmFADg0oJAOSlUQF0g",
			"NoRgNATGBs1gLABgQTjCeBWSUDsYBmKbCeMADjNnXxHIoIF0g",
			"NoRg7ANAzBCsAMEAsioxBEIAc0Cc0ATJkgSIYhXIjhMQGxgC6QA",
			"NoVgNAjAHGBMYDYCcdJgCwTFBkYVgAY9JpJYUsYBmAXSA",
			"NoRgNAbAHGAsAMkwgMyzClH0LFcArHnAJzIqIBMGWEAukA"
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

		function getKeyV2(value, ver) {
			ver = ver || 0;
			var key = JSON.parse(LZString.decompressFromEncodedURIComponent(KEYS[2 + ver * 2]));
			var iv = JSON.parse(LZString.decompressFromEncodedURIComponent(KEYS[3 + ver * 2]));
			for (var i = 0; i < 6; i++) {
				key[i] = (key[i] + value[5 - i]) % 255;
				iv[i] = (iv[i] + value[5 - i]) % 255;
			}
			return [key, iv];
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

		function v1init() {
			DEBUG && console.log('[gancube] v1init start');
			return _service_meta.getCharacteristic(CHRCT_UUID_VERSION).then(function(chrct) {
				return chrct.readValue();
			}).then(function(value) {
				var version = value.getUint8(0) << 16 | value.getUint8(1) << 8 | value.getUint8(2);
				DEBUG && console.log('[gancube] version', version.toString(16));
				decoder = null;
				if (version > 0x010007 && (version & 0xfffe00) == 0x010000) {
					return _service_meta.getCharacteristic(CHRCT_UUID_HARDWARE).then(function(chrct) {
						return chrct.readValue();
					}).then(function(value) {
						var key = getKey(version, value);
						if (!key) {
							logohint.push(LGHINT_BTNOTSUP);
							return;
						}
						DEBUG && console.log('[gancube] key', JSON.stringify(key));
						decoder = $.aes128(key);
					});
				} else { //not support
					logohint.push(LGHINT_BTNOTSUP);
				}
			}).then(function() {
				return _service_data.getCharacteristics();
			}).then(function(chrcts) {
				for (var i = 0; i < chrcts.length; i++) {
					var chrct = chrcts[i]
					DEBUG && console.log('[gancube] v1init find chrct', chrct.uuid);
					if (matchUUID(chrct.uuid, CHRCT_UUID_F2)) {
						_chrct_f2 = chrct;
					} else if (matchUUID(chrct.uuid, CHRCT_UUID_F5)) {
						_chrct_f5 = chrct;
					} else if (matchUUID(chrct.uuid, CHRCT_UUID_F6)) {
						_chrct_f6 = chrct;
					} else if (matchUUID(chrct.uuid, CHRCT_UUID_F7)) {
						_chrct_f7 = chrct;
					}
				}
			}).then(loopRead);
		}

		function getManufacturerDataBytes(mfData) {
			if (mfData instanceof DataView) { // this is workaround for Bluefy browser
				return mfData;
			}
			for (var id of GAN_CIC_LIST) {
				if (mfData.has(id)) {
					DEBUG && console.log('[gancube] found Manufacturer Data under CIC = 0x' + id.toString(16).padStart(4, '0'));
					return mfData.get(id);
				}
			}
			DEBUG && console.log('[gancube] Looks like this cube has new unknown CIC');
		}

		function waitForAdvs() {
			if (!_device || !_device.watchAdvertisements) {
				return Promise.reject(-1);
			}
			var abortController = new AbortController();
			return new Promise(function(resolve, reject) {
				var onAdvEvent = function(event) {
					DEBUG && console.log('[gancube] receive adv event', event);
					var mfData = event.manufacturerData;
					var dataView = getManufacturerDataBytes(mfData);
					if (dataView && dataView.byteLength >= 6) {
						var mac = [];
						for (var i = 0; i < 6; i++) {
							mac.push((dataView.getUint8(dataView.byteLength - i - 1) + 0x100).toString(16).slice(1));
						}
						_device && _device.removeEventListener('advertisementreceived', onAdvEvent);
						abortController.abort();
						resolve(mac.join(':'));
					}
				};
				_device.addEventListener('advertisementreceived', onAdvEvent);
				_device.watchAdvertisements({ signal: abortController.signal });
				setTimeout(function() { // reject if no mac found
					_device && _device.removeEventListener('advertisementreceived', onAdvEvent);
					abortController.abort();
					reject(-2);
				}, 10000);
			});
		}

		function v2initKey(forcePrompt, isWrongKey, ver) {
			if (deviceMac) {
				var savedMacMap = JSON.parse(kernel.getProp('giiMacMap', '{}'));
				var prevMac = savedMacMap[deviceName];
				if (prevMac && prevMac.toUpperCase() == deviceMac.toUpperCase()) {
					DEBUG && console.log('[gancube] v2init mac matched');
				} else {
					DEBUG && console.log('[gancube] v2init mac updated');
					savedMacMap[deviceName] = deviceMac;
					kernel.setProp('giiMacMap', JSON.stringify(savedMacMap));
				}
				v2initDecoder(deviceMac, ver);
			} else {
				var savedMacMap = JSON.parse(kernel.getProp('giiMacMap', '{}'));
				var mac = savedMacMap[deviceName];
				if (!mac || forcePrompt) {
					mac = prompt((isWrongKey ? 'The MAC provided might be wrong!\n' : '') + GIIKER_REQMACMSG, mac || 'xx:xx:xx:xx:xx:xx');
				}
				var m = /^([0-9a-f]{2}[:-]){5}[0-9a-f]{2}$/i.exec(mac);
				if (!m) {
					logohint.push(LGHINT_BTINVMAC);
					decoder = null;
					return;
				}
				if (mac != savedMacMap[deviceName]) {
					savedMacMap[deviceName] = mac;
					kernel.setProp('giiMacMap', JSON.stringify(savedMacMap));
				}
				v2initDecoder(mac, ver);
			}
		}

		function v2initDecoder(mac, ver) {
			var value = [];
			for (var i = 0; i < 6; i++) {
				value.push(parseInt(mac.slice(i * 3, i * 3 + 2), 16));
			}
			var keyiv = getKeyV2(value, ver);
			DEBUG && console.log('[gancube] ver=', ver, ' key=', JSON.stringify(keyiv));
			decoder = $.aes128(keyiv[0]);
			decoder.iv = keyiv[1];
		}

		function v2sendRequest(req) {
			if (!_chrct_v2write) {
				DEBUG && console.log('[gancube] v2sendRequest cannot find v2write chrct');
				return;
			}
			var encodedReq = encode(req.slice());
			DEBUG && console.log('[gancube] v2sendRequest', req, encodedReq);
			return _chrct_v2write.writeValue(new Uint8Array(encodedReq).buffer);
		}

		function v2sendSimpleRequest(opcode) {
			var req = mathlib.valuedArray(20, 0);
			req[0] = opcode;
			return v2sendRequest(req);
		}

		function v2requestFacelets() {
			return v2sendSimpleRequest(4);
		}

		function v2requestBattery() {
			return v2sendSimpleRequest(9);
		}

		function v2requestHardwareInfo() {
			return v2sendSimpleRequest(5);
		}

		function v2requestReset() {
			return v2sendRequest([10, 5, 57, 119, 0, 0, 1, 35, 69, 103, 137, 171, 0, 0, 0, 0, 0, 0, 0, 0]);
		}

		function v2init(ver) {
			DEBUG && console.log('[gancube] v2init start');
			keyCheck = 0;
			v2initKey(true, false, ver);
			return _service_v2data.getCharacteristics().then(function(chrcts) {
				DEBUG && console.log('[gancube] v2init find chrcts', chrcts);
				for (var i = 0; i < chrcts.length; i++) {
					var chrct = chrcts[i]
					DEBUG && console.log('[gancube] v2init find chrct', chrct.uuid);
					if (matchUUID(chrct.uuid, CHRCT_UUID_V2READ)) {
						_chrct_v2read = chrct;
					} else if (matchUUID(chrct.uuid, CHRCT_UUID_V2WRITE)) {
						_chrct_v2write = chrct;
					}
				}
				if (!_chrct_v2read) {
					DEBUG && console.log('[gancube] v2init cannot find v2read chrct');
				}
			}).then(function() {
				DEBUG && console.log('[gancube] v2init v2read start notifications');
				return _chrct_v2read.startNotifications();
			}).then(function() {
				DEBUG && console.log('[gancube] v2init v2read notification started');
				return _chrct_v2read.addEventListener('characteristicvaluechanged', onStateChangedV2);
			}).then(function() {
				return v2requestHardwareInfo();
			}).then(function() {
				return v2requestFacelets();
			}).then(function() {
				return v2requestBattery();
			});
		}

		function v3sendRequest(req) {
			if (!_chrct_v3write) {
				DEBUG && console.log('[gancube] v3sendRequest cannot find v3write chrct');
				return;
			}
			var encodedReq = encode(req.slice());
			DEBUG && console.log('[gancube] v3sendRequest', req, encodedReq);
			return _chrct_v3write.writeValue(new Uint8Array(encodedReq).buffer);
		}

		function v3sendSimpleRequest(opcode) {
			var req = mathlib.valuedArray(16, 0);
			req[0] = 0x68;
			req[1] = opcode;
			return v3sendRequest(req);
		}

		function v3requestFacelets() {
			return v3sendSimpleRequest(1);
		}

		function v3requestBattery() {
			return v3sendSimpleRequest(7);
		}

		function v3requestHardwareInfo() {
			return v3sendSimpleRequest(4);
		}

		function v3init() {
			DEBUG && console.log('[gancube] v3init start');
			keyCheck = 0;
			v2initKey(true, false, 0);
			return _service_v3data.getCharacteristics().then(function(chrcts) {
				DEBUG && console.log('[gancube] v3init find chrcts', chrcts);
				for (var i = 0; i < chrcts.length; i++) {
					var chrct = chrcts[i]
					DEBUG && console.log('[gancube] v3init find chrct', chrct.uuid);
					if (matchUUID(chrct.uuid, CHRCT_UUID_V3READ)) {
						_chrct_v3read = chrct;
					} else if (matchUUID(chrct.uuid, CHRCT_UUID_V3WRITE)) {
						_chrct_v3write = chrct;
					}
				}
				if (!_chrct_v3read) {
					DEBUG && console.log('[gancube] v3init cannot find v3read chrct');
				}
			}).then(function() {
				DEBUG && console.log('[gancube] v3init v3read start notifications');
				return _chrct_v3read.startNotifications();
			}).then(function() {
				DEBUG && console.log('[gancube] v3init v3read notification started');
				return _chrct_v3read.addEventListener('characteristicvaluechanged', onStateChangedV3);
			}).then(function() {
				return v3requestHardwareInfo();
			}).then(function() {
				return v3requestFacelets();
			}).then(function() {
				return v3requestBattery();
			});
		}

		function init(device) {
			clear();
			deviceName = device.name;
			DEBUG && console.log('[gancube] init gan cube start');
			return waitForAdvs().then(function(mac) {
				DEBUG && console.log('[gancube] init, found cube bluetooth hardware MAC = ' + mac);
				deviceMac = mac;
			}, function(err) {
				DEBUG && console.log('[gancube] init, unable to automatically determine cube MAC, error code = ' + err);
			}).then(function() {
				return device.gatt.connect();
			}).then(function(gatt) {
				_gatt = gatt;
				return gatt.getPrimaryServices();
			}).then(function(services) {
				for (var i = 0; i < services.length; i++) {
					var service = services[i];
					DEBUG && console.log('[gancube] checkHardware find service', service.uuid);
					if (matchUUID(service.uuid, SERVICE_UUID_META)) {
						_service_meta = service;
					} else if (matchUUID(service.uuid, SERVICE_UUID_DATA)) {
						_service_data = service;
					} else if (matchUUID(service.uuid, SERVICE_UUID_V2DATA)) {
						_service_v2data = service;
					} else if (matchUUID(service.uuid, SERVICE_UUID_V3DATA)) {
						_service_v3data = service;
					}
				}
				if (_service_v2data) {
					return v2init((deviceName || '').startsWith('AiCube') ? 1 : 0);
				} else if (_service_v3data) {
					return v3init();
				} else if (_service_data && _service_meta) {
					return v1init();
				}
				logohint.push(LGHINT_BTNOTSUP);
			});
		}

		var prevMoves = [];
		var timeOffs = [];
		var moveBuffer = []; // [ [moveCnt, move, ts, locTime], ... ]
		var prevCubie = new mathlib.CubieCube();
		var curCubie = new mathlib.CubieCube();
		var latestFacelet = mathlib.SOLVED_FACELET;
		var deviceTime = 0;
		var deviceTimeOffset = 0;
		var moveCnt = -1;
		var prevMoveCnt = -1;
		var movesFromLastCheck = 1000;
		var batteryLevel = 100;

		function initCubeState() {
			var locTime = $.now();
			DEBUG && console.log('[gancube]', 'init cube state');
			callback(latestFacelet, [], [null, locTime], deviceName);
			prevCubie.fromFacelet(latestFacelet);
			prevMoveCnt = moveCnt;
			if (latestFacelet != kernel.getProp('giiSolved', mathlib.SOLVED_FACELET)) {
				var rst = kernel.getProp('giiRST');
				if (rst == 'a' || rst == 'p' && confirm(CONFIRM_GIIRST)) {
					giikerutil.markSolved();
				}
			}
		}

		function checkState() {
			if (movesFromLastCheck < 50) {
				return Promise.resolve(false);
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
				if (prevMoveCnt == -1) {
					initCubeState();
					return;
				}
				return Promise.resolve(true);
			});
		}

		function updateMoveTimes(locTime, isV2) {
			var moveDiff = (moveCnt - prevMoveCnt) & 0xff;
			DEBUG && moveDiff > 1 && console.log('[gancube]', 'bluetooth event was lost, moveDiff = ' + moveDiff);
			prevMoveCnt = moveCnt;
			movesFromLastCheck += moveDiff;
			if (moveDiff > prevMoves.length) {
				movesFromLastCheck = 50;
				moveDiff = prevMoves.length;
			}
			var calcTs = deviceTime + deviceTimeOffset;
			for (var i = moveDiff - 1; i >= 0; i--) {
				calcTs += timeOffs[i];
			}
			if (!deviceTime || Math.abs(locTime - calcTs) > 2000) {
				DEBUG && console.log('[gancube]', 'time adjust', locTime - calcTs, '@', locTime);
				deviceTime += locTime - calcTs;
			}
			for (var i = moveDiff - 1; i >= 0; i--) {
				var m = "URFDLB".indexOf(prevMoves[i][0]) * 3 + " 2'".indexOf(prevMoves[i][1]);
				mathlib.CubieCube.CubeMult(prevCubie, mathlib.CubieCube.moveCube[m], curCubie);
				deviceTime += timeOffs[i];
				callback(curCubie.toFaceCube(), prevMoves.slice(i), [deviceTime, i == 0 ? locTime : null], deviceName + (isV2 ? '*' : ''));
				var tmp = curCubie;
				curCubie = prevCubie;
				prevCubie = tmp;
				DEBUG && console.log('[gancube] move', prevMoves[i], timeOffs[i]);
			}
			deviceTimeOffset = locTime - deviceTime;
		}

		function loopRead() {
			if (!_device) {
				return;
			}
			return _chrct_f5.readValue().then(function(value) {
				value = decode(value);
				var locTime = $.now();
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

					if (isUpdated) {
						DEBUG && console.log('[gancube]', 'facelet state calc', prevCubie.toFaceCube());
						DEBUG && console.log('[gancube]', 'facelet state read', latestFacelet);
						if (prevCubie.toFaceCube() != latestFacelet) {
							DEBUG && console.log('[gancube]', 'Cube state check error');
						}
						return;
					}

					timeOffs = [];
					for (var i = 0; i < 9; i++) {
						var off = f6val[i * 2 + 1] | f6val[i * 2 + 2] << 8;
						timeOffs.unshift(off);
					}
					updateMoveTimes(locTime, 0);

				});
			}).then(loopRead);
		}

		function getBatteryLevel() {
			if (!_gatt) {
				return Promise.reject("Bluetooth Cube is not connected");
			}
			if (_service_v2data || _service_v3data) {
				return Promise.resolve([batteryLevel, deviceName + '*']);
			} else if (_chrct_f7) {
				return _chrct_f7.readValue().then(function(value) {
					value = decode(value);
					return Promise.resolve([value[7], deviceName]);
				});
			} else {
				return Promise.resolve([batteryLevel, deviceName]);
			}
		}

		var keyCheck = 0;

		function onStateChangedV2(event) {
			var value = event.target.value;
			if (decoder == null) {
				return;
			}
			parseV2Data(value);
		}

		function parseV2Data(value) {
			var locTime = $.now();
			// DEBUG && console.log('[gancube]', 'dec v2', value);
			value = decode(value);
			for (var i = 0; i < value.length; i++) {
				value[i] = (value[i] + 256).toString(2).slice(1);
			}
			value = value.join('');
			var mode = parseInt(value.slice(0, 4), 2);
			if (mode == 1) { // gyro
			} else if (mode == 2) { // cube move
				DEBUG && console.log('[gancube]', 'v2 received move event', value);
				moveCnt = parseInt(value.slice(4, 12), 2);
				if (moveCnt == prevMoveCnt || prevMoveCnt == -1) {
					return;
				}
				timeOffs = [];
				prevMoves = [];
				var keyChkInc = 0;
				for (var i = 0; i < 7; i++) {
					var m = parseInt(value.slice(12 + i * 5, 17 + i * 5), 2);
					timeOffs[i] = parseInt(value.slice(47 + i * 16, 63 + i * 16), 2);
					prevMoves[i] = "URFDLB".charAt(m >> 1) + " '".charAt(m & 1);
					if (m >= 12) { // invalid data
						prevMoves[i] = "U ";
						keyChkInc = 1;
					}
				}
				keyCheck += keyChkInc;
				if (keyChkInc == 0) {
					updateMoveTimes(locTime, 1);
				}
			} else if (mode == 4) { // cube state
				DEBUG && console.log('[gancube]', 'v2 received facelets event', value);
				moveCnt = parseInt(value.slice(4, 12), 2);
				var cc = new mathlib.CubieCube();
				var echk = 0;
				var cchk = 0xf00;
				for (var i = 0; i < 7; i++) {
					var perm = parseInt(value.slice(12 + i * 3, 15 + i * 3), 2);
					var ori = parseInt(value.slice(33 + i * 2, 35 + i * 2), 2);
					cchk -= ori << 3;
					cchk ^= perm;
					cc.ca[i] = ori << 3 | perm;
				}
				cc.ca[7] = (cchk & 0xff8) % 24 | cchk & 0x7;
				for (var i = 0; i < 11; i++) {
					var perm = parseInt(value.slice(47 + i * 4, 51 + i * 4), 2);
					var ori = parseInt(value.slice(91 + i, 92 + i), 2);
					echk ^= perm << 1 | ori;
					cc.ea[i] = perm << 1 | ori;
				}
				cc.ea[11] = echk;
				if (cc.verify() != 0) {
					keyCheck++;
					DEBUG && console.log('[gancube]', 'v2 facelets state verify error');
					return;
				}
				latestFacelet = cc.toFaceCube();
				DEBUG && console.log('[gancube]', 'v2 facelets event state parsed', latestFacelet);
				if (prevMoveCnt == -1) {
					initCubeState();
				}
			} else if (mode == 5) { // hardware info
				DEBUG && console.log('[gancube]', 'v2 received hardware info event', value);
				var hardwareVersion = parseInt(value.slice(8, 16), 2) + "." + parseInt(value.slice(16, 24), 2);
				var softwareVersion = parseInt(value.slice(24, 32), 2) + "." + parseInt(value.slice(32, 40), 2);
				var devName = '';
				for (var i = 0; i < 8; i++)
					devName += String.fromCharCode(parseInt(value.slice(40 + i * 8, 48 + i * 8), 2));
				var gyroEnabled = 1 === parseInt(value.slice(104, 105), 2);
				DEBUG && console.log('[gancube]', 'Hardware Version', hardwareVersion);
				DEBUG && console.log('[gancube]', 'Software Version', softwareVersion);
				DEBUG && console.log('[gancube]', 'Device Name', devName);
				DEBUG && console.log('[gancube]', 'Gyro Enabled', gyroEnabled);
			} else if (mode == 9) { // battery
				DEBUG && console.log('[gancube]', 'v2 received battery event', value);
				batteryLevel = parseInt(value.slice(8, 16), 2);
				giikerutil.updateBattery([batteryLevel, deviceName + '*']);
			} else {
				DEBUG && console.log('[gancube]', 'v2 received unknown event', value);
			}
		}

		$.parseV2Data = parseV2Data; // for debug

		// Check if circular move number (modulo 256) fits into (start,end) range exclusive.
		function isMoveNumberInRange(start, end, moveCnt) {
			return ((end - start) & 0xFF) > ((moveCnt - start) & 0xFF)
				&& ((start - moveCnt) & 0xFF) > 0
				&& ((end - moveCnt) & 0xFF) > 0;
		}

		function v3InjectLostMoveToBuffer(move) {
			if (moveBuffer.length > 0) {
				// Skip if move with the same number already in the buffer
				if (moveBuffer.some(function (e) { return e[0] == move[0] }))
					return;
				// Skip if move number does not fit in range between last evicted move number and move number on buffer head, i.e. move must be one of missed
				if (!isMoveNumberInRange(prevMoveCnt, moveBuffer[0][0], move[0]))
					return;
				// Lost moves should be injected in reverse order, so just put suitable move on buffer head
				if (move[0] == ((moveBuffer[0][0] - 1) & 0xFF)) {
					move[2] = moveBuffer[0][2] - 10; // Set lost move device hardware timestamp near to next move event
					moveBuffer.unshift(move);
					DEBUG && console.log('[gancube]', 'v3 lost move recovered', move[0], move[1]);
				}
			}
		}

		function v3requestMoveHistory(startMoveCnt, numberOfMoves) {
			var req = mathlib.valuedArray(16, 0);
			// Move history response data is byte-aligned, and moves always starting with near-ceil odd serial number, regardless of requested.
			// Adjust start move and number of moves to get odd number aligned history window with even number of moves inside.
			if (startMoveCnt % 2 == 0)
				startMoveCnt = (startMoveCnt - 1) & 0xFF;
			if (numberOfMoves % 2 == 1)
				numberOfMoves++;
			// Never overflow requested history window beyond the move number cycle edge 255 -> 0.
			// Because due to iCarry2 firmware bug the moves beyond the edge spoofed with 'D' (just zero bytes).
			numberOfMoves = Math.min(numberOfMoves, startMoveCnt + 1);
			req[0] = 0x68;
			req[1] = 0x03;
			req[2] = startMoveCnt;
			req[3] = 0;
			req[4] = numberOfMoves;
			req[5] = 0;
			// We can safely suppress and ignore possible GATT write errors, v3requestMoveHistory command is automatically retried on each move event if needed
			return v3sendRequest(req).catch($.noop);
		}

		function v3EvictMoveBuffer(reqLostMoves) {
			while (moveBuffer.length > 0) {
				var diff = (moveBuffer[0][0] - prevMoveCnt) & 0xFF;
				if (diff > 1) {
					DEBUG && console.log('[gancube]', 'v3 lost move detected', prevMoveCnt, moveBuffer[0][0], diff);
					if (reqLostMoves) {
						v3requestMoveHistory(moveBuffer[0][0], diff);
					}
					break;
				} else {
					var move = moveBuffer.shift();
					var m = "URFDLB".indexOf(move[1][0]) * 3 + " 2'".indexOf(move[1][1]);
					mathlib.CubieCube.CubeMult(prevCubie, mathlib.CubieCube.moveCube[m], curCubie);
					prevMoves.unshift(move[1]);
					if (prevMoves.length > 8)
						prevMoves = prevMoves.slice(0, 8);
					callback(curCubie.toFaceCube(), prevMoves, [move[2], move[3]], deviceName + '*');
					var tmp = curCubie;
					curCubie = prevCubie;
					prevCubie = tmp;
					prevMoveCnt = move[0];
					DEBUG && console.log('[gancube]', 'v3 move evicted from fifo buffer', move[0], move[1], move[2], move[3]);
				}
			}
			if (moveBuffer.length > 32) { // Something wrong, moves are not evicted from buffer, force cube disconnection
				onDisconnect();
			}
		}

		function onStateChangedV3(event) {
			var value = event.target.value;
			if (decoder == null) {
				return;
			}
			parseV3Data(value);
		}

		function parseV3Data(value) {
			var locTime = $.now();
			DEBUG && console.log('[gancube]', 'v3 raw message', value);
			value = decode(value);
			for (var i = 0; i < value.length; i++) {
				value[i] = (value[i] + 256).toString(2).slice(1);
			}
			value = value.join('');
			DEBUG && console.log('[gancube]', 'v3 decrypted message', value);
			var magic = parseInt(value.slice(0, 8), 2);
			var mode = parseInt(value.slice(8, 16), 2);
			var len = parseInt(value.slice(16, 24), 2);
			if (magic != 0x55 || len <= 0) {
				DEBUG && console.log('[gancube]', 'v3 invalid magic or len', value);
				return;
			}
			if (mode == 1) { // cube move
				DEBUG && console.log('[gancube]', 'v3 received move event', value);
				moveCnt = parseInt(value.slice(64, 72) + value.slice(56, 64), 2);
				if (moveCnt == prevMoveCnt || prevMoveCnt == -1) {
					return;
				}
				var ts = parseInt(value.slice(48, 56) + value.slice(40, 48) + value.slice(32, 40) + value.slice(24, 32), 2);
				var pow = parseInt(value.slice(72, 74), 2);
				var axis = [2, 32, 8, 1, 16, 4].indexOf(parseInt(value.slice(74, 80), 2));
				if (axis == -1) {
					DEBUG && console.log('[gancube]', 'v3 move event invalid axis');
					return;
				}
				var move = "URFDLB".charAt(axis) + " '".charAt(pow);
				moveBuffer.push([moveCnt, move, ts, locTime]);
				DEBUG && console.log('[gancube]', 'v3 move placed to fifo buffer', moveCnt, move, ts, locTime);
				v3EvictMoveBuffer(true);
			} else if (mode == 2) {  // cube state
				DEBUG && console.log('[gancube]', 'v3 received facelets event', value);
				moveCnt = parseInt(value.slice(32, 40) + value.slice(24, 32), 2);
				var cc = new mathlib.CubieCube();
				var echk = 0;
				var cchk = 0xf00;
				for (var i = 0; i < 7; i++) {
					var perm = parseInt(value.slice(40 + i * 3, 43 + i * 3), 2);
					var ori = parseInt(value.slice(61 + i * 2, 63 + i * 2), 2);
					cchk -= ori << 3;
					cchk ^= perm;
					cc.ca[i] = ori << 3 | perm;
				}
				cc.ca[7] = (cchk & 0xff8) % 24 | cchk & 0x7;
				for (var i = 0; i < 11; i++) {
					var perm = parseInt(value.slice(77 + i * 4, 81 + i * 4), 2);
					var ori = parseInt(value.slice(121 + i, 122 + i), 2);
					echk ^= perm << 1 | ori;
					cc.ea[i] = perm << 1 | ori;
				}
				cc.ea[11] = echk;
				if (cc.verify() != 0) {
					keyCheck++;
					DEBUG && console.log('[gancube]', 'v3 facelets state verify error');
					return;
				}
				latestFacelet = cc.toFaceCube();
				DEBUG && console.log('[gancube]', 'v3 facelets event state parsed', latestFacelet);
				if (prevMoveCnt == -1) {
					initCubeState();
				}
			} else if (mode == 6) { // move history
				DEBUG && console.log('[gancube]', 'v3 received move history event', value);
				var startMoveCnt = parseInt(value.slice(24, 32), 2);
				var numberOfMoves = (len - 1) * 2;
				for (var i = 0; i < numberOfMoves; i++) {
					var axis = parseInt(value.slice(32 + 4 * i, 35 + 4 * i), 2);
					var pow = parseInt(value.slice(35 + 4 * i, 36 + 4 * i), 2);
					if (axis < 6) {
						var move = "DUBFLR".charAt(axis) + " '".charAt(pow);
						v3InjectLostMoveToBuffer([(startMoveCnt - i) & 0xFF, move, null, null]);
					}
				}
				v3EvictMoveBuffer(false);
			} else if (mode == 7) { // hardware info
				DEBUG && console.log('[gancube]', 'v3 received hardware info event', value);
				var hardwareVersion = parseInt(value.slice(80, 84), 2) + "." + parseInt(value.slice(84, 88), 2);
				var softwareVersion = parseInt(value.slice(72, 76), 2) + "." + parseInt(value.slice(76, 80), 2);
				var devName = '';
				for (var i = 0; i < 5; i++)
					devName += String.fromCharCode(parseInt(value.slice(32 + i * 8, 40 + i * 8), 2));
				DEBUG && console.log('[gancube]', 'Hardware Version', hardwareVersion);
				DEBUG && console.log('[gancube]', 'Software Version', softwareVersion);
				DEBUG && console.log('[gancube]', 'Device Name', devName);
			} else if (mode == 16) { // battery
				DEBUG && console.log('[gancube]', 'v3 received battery event', value);
				batteryLevel = parseInt(value.slice(24, 32), 2);
				giikerutil.updateBattery([batteryLevel, deviceName + '*']);
			} else {
				DEBUG && console.log('[gancube]', 'v3 received unknown event', value);
			}
		}

		$.parseV3Data = parseV3Data; // for debug

		function clear() {
			var result = Promise.resolve();
			if (_chrct_v2read) {
				_chrct_v2read.removeEventListener('characteristicvaluechanged', onStateChangedV2);
				result = _chrct_v2read.stopNotifications().catch($.noop);
				_chrct_v2read = null;
			}
			if (_chrct_v3read) {
				_chrct_v3read.removeEventListener('characteristicvaluechanged', onStateChangedV3);
				result = _chrct_v3read.stopNotifications().catch($.noop);
				_chrct_v3read = null;
			}
			_service_data = null;
			_service_meta = null;
			_service_v2data = null;
			_service_v3data = null;
			_gatt = null;
			deviceName = null;
			deviceMac = null;
			prevMoves = [];
			timeOffs = [];
			moveBuffer = [];
			prevCubie = new mathlib.CubieCube();
			curCubie = new mathlib.CubieCube();
			latestFacelet = mathlib.SOLVED_FACELET;
			deviceTime = 0;
			deviceTimeOffset = 0;
			moveCnt = -1;
			prevMoveCnt = -1;
			movesFromLastCheck = 1000;
			batteryLevel = 100;
			return result;
		}

		return {
			init: init,
			opservs: [SERVICE_UUID_DATA, SERVICE_UUID_META, SERVICE_UUID_V2DATA, SERVICE_UUID_V3DATA],
			cics: GAN_CIC_LIST,
			getBatteryLevel: getBatteryLevel,
			clear: clear
		};
	})();

	var GoCube = (function() {

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
				// console.log(toHexVal(value));
				for (var i = 0; i < msgLen; i += 2) {
					var axis = axisPerm[value.getUint8(3 + i) >> 1];
					var power = [0, 2][value.getUint8(3 + i) & 1];
					var m = axis * 3 + power;
					DEBUG && console.log('move', "URFDLB".charAt(axis) + " 2'".charAt(power));
					mathlib.CubieCube.CubeMult(prevCubie, mathlib.CubieCube.moveCube[m], curCubie);
					curFacelet = curCubie.toFaceCube();
					prevMoves.unshift("URFDLB".charAt(axis) + " 2'".charAt(power));
					if (prevMoves.length > 8)
						prevMoves = prevMoves.slice(0, 8);
					callback(curFacelet, prevMoves, [locTime, locTime], _deviceName);
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
					DEBUG && console.log('facelet', newFacelet);
					curCubie.fromFacelet(newFacelet);
				}
			} else if (msgType == 3) { // quaternion
			} else if (msgType == 5) { // battery level
				_batteryLevel = value.getUint8(3);
				DEBUG && console.log('battery level', _batteryLevel);
			} else if (msgType == 7) { // offline stats
				DEBUG && console.log('offline stats', toHexVal(value));
			} else if (msgType == 8) { // cube type
				DEBUG && console.log('cube type', toHexVal(value));
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

		return {
			init: init,
			opservs: [SERVICE_UUID],
			getBatteryLevel: getBatteryLevel,
			clear: clear
		};
	})();

	var MoyuCube = (function() {

		var _gatt;
		var _service;
		var _deviceName;
		var _chrct_write;
		var _chrct_read;
		var _chrct_turn;
		var _chrct_gyro;
		var UUID_SUFFIX = '-0000-1000-8000-00805f9b34fb';
		var SERVICE_UUID = '00001000' + UUID_SUFFIX;
		var CHRCT_UUID_WRITE = '00001001' + UUID_SUFFIX;
		var CHRCT_UUID_READ = '00001002' + UUID_SUFFIX;
		var CHRCT_UUID_TURN = '00001003' + UUID_SUFFIX;
		var CHRCT_UUID_GYRO = '00001004' + UUID_SUFFIX;

		function init(device) {
			clear();
			_deviceName = device.name;
			return device.gatt.connect().then(function(gatt) {
				_gatt = gatt;
				return gatt.getPrimaryService(SERVICE_UUID);
			}).then(function(service) {
				_service = service;
				return _service.getCharacteristics();
			}).then(function(chrcts) {
				for (var i = 0; i < chrcts.length; i++) {
					var chrct = chrcts[i]
					DEBUG && console.log('[moyucube]', 'init find chrct', chrct.uuid);
					if (matchUUID(chrct.uuid, CHRCT_UUID_WRITE)) {
						_chrct_write = chrct;
					} else if (matchUUID(chrct.uuid, CHRCT_UUID_READ)) {
						_chrct_read = chrct;
					} else if (matchUUID(chrct.uuid, CHRCT_UUID_TURN)) {
						_chrct_turn = chrct;
					} else if (matchUUID(chrct.uuid, CHRCT_UUID_GYRO)) {
						_chrct_gyro = chrct;
					}
				}
			}).then(function() {
				_chrct_read.addEventListener('characteristicvaluechanged', onReadEvent);
				_chrct_turn.addEventListener('characteristicvaluechanged', onTurnEvent);
				_chrct_gyro.addEventListener('characteristicvaluechanged', onGyroEvent);
				_chrct_read.startNotifications();
				_chrct_turn.startNotifications();
				_chrct_gyro.startNotifications();
			});
		}

		var faceStatus = [0, 0, 0, 0, 0, 0];
		var curFacelet = mathlib.SOLVED_FACELET;
		var curCubie = new mathlib.CubieCube();
		var prevCubie = new mathlib.CubieCube();
		var prevMoves = [];

		function onReadEvent(event) {
			var value = event.target.value;
			DEBUG && console.log('[moyucube]', 'Received read event', value);
		}

		function onGyroEvent(event) {
			var value = event.target.value;
			DEBUG && console.log('[moyucube]', 'Received gyro event', value);
		}

		function onTurnEvent(event) {
			var value = event.target.value;
			DEBUG && console.log('[moyucube]', 'Received turn event', value);
			parseTurn(value);
		}

		function parseTurn(data) {
			var locTime = $.now();
			if (data.byteLength < 1) {
				return;
			}
			var n_moves = data.getUint8(0);
			if (data.byteLength < 1 + n_moves * 6) {
				return;
			}
			for (var i = 0; i < n_moves; i++) {
				var offset = 1 + i * 6;
				var ts =  data.getUint8(offset + 1) << 24
						| data.getUint8(offset + 0) << 16
						| data.getUint8(offset + 3) << 8
						| data.getUint8(offset + 2);
				ts = Math.round(ts / 65536 * 1000);
				var face = data.getUint8(offset + 4);
				var dir = Math.round(data.getUint8(offset + 5) / 36);
				var prevRot = faceStatus[face];
				var curRot = faceStatus[face] + dir;
				faceStatus[face] = (curRot + 9) % 9;
				var axis = [3, 4, 5, 1, 2, 0][face];
				var pow = 0;
				if (prevRot >= 5 && curRot <= 4) {
					pow = 2;
				} else if (prevRot <= 4 && curRot >= 5) {
					pow = 0;
				} else {
					continue;
				}
				var m = axis * 3 + pow;
				DEBUG && console.log('[moyucube]', 'move', "URFDLB".charAt(axis) + " 2'".charAt(pow));
				mathlib.CubieCube.CubeMult(prevCubie, mathlib.CubieCube.moveCube[m], curCubie);
				curFacelet = curCubie.toFaceCube();
				prevMoves.unshift("URFDLB".charAt(axis) + " 2'".charAt(pow));
				if (prevMoves.length > 8)
					prevMoves = prevMoves.slice(0, 8);
				callback(curFacelet, prevMoves, [ts, locTime], _deviceName);
				var tmp = curCubie;
				curCubie = prevCubie;
				prevCubie = tmp;
			}
		}

		function getBatteryLevel() {
			if (!_gatt) {
				return Promise.reject("Bluetooth Cube is not connected");
			}
			Promise.resolve([100, _deviceName]);
		}

		function clear() {
			var result = Promise.resolve();
			if (_chrct_read || _chrct_turn || _chrct_gyro) {
				_chrct_read && _chrct_read.removeEventListener('characteristicvaluechanged', onReadEvent);
				_chrct_turn && _chrct_turn.removeEventListener('characteristicvaluechanged', onTurnEvent);
				_chrct_gyro && _chrct_gyro.removeEventListener('characteristicvaluechanged', onGyroEvent);
				result = Promise.all([
					_chrct_read && _chrct_read.stopNotifications().catch($.noop),
					_chrct_turn && _chrct_turn.stopNotifications().catch($.noop),
					_chrct_gyro && _chrct_gyro.stopNotifications().catch($.noop),
				]);
				_chrct_read = null;
				_chrct_turn = null;
				_chrct_gyro = null;
			}
			_chrct_write = null;
			_service = null;
			_gatt = null;
			_deviceName = null;
			faceStatus = [0, 0, 0, 0, 0, 0];
			curFacelet = mathlib.SOLVED_FACELET;
			curCubie = new mathlib.CubieCube();
			prevCubie = new mathlib.CubieCube();
			prevMoves = [];
			return result;
		}

		return {
			init: init,
			opservs: [SERVICE_UUID],
			getBatteryLevel: getBatteryLevel,
			clear: clear
		}
	})();

	var Moyu32Cube = (function () {
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
		var batteryLevel = 100;

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
			DEBUG && console.log('[Moyu32Cube] key=', JSON.stringify(keyiv));
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
				DEBUG && console.log('[Moyu32Cube] sendRequest cannot find write chrct');
				return;
			}
			var encodedReq = encode(req.slice());
			DEBUG && console.log('[Moyu32Cube] sendRequest', req, encodedReq);
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
					DEBUG && console.log('[Moyu32Cube] found Manufacturer Data under CIC = 0x' + id.toString(16).padStart(4, '0'));
					return mfData.get(id);
				}
			}
			DEBUG && console.log('[Moyu32Cube] Looks like this cube has new unknown CIC');
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

		function waitForAdvs() {
			if (!_device || !_device.watchAdvertisements) {
				return Promise.reject(-1);
			}
			var abortController = new AbortController();
			return new Promise(function (resolve, reject) {
				var onAdvEvent = function (event) {
					DEBUG && console.log('[Moyu32Cube] receive adv event', event);
					var mfData = event.manufacturerData;
					var dataView = getManufacturerDataBytes(mfData);
					if (dataView && dataView.byteLength >= 6) {
						var mac = [];
						for (var i = 0; i < 6; i++) {
							mac.push((dataView.getUint8(dataView.byteLength - i - 1) + 0x100).toString(16).slice(1));
						}
						_device && _device.removeEventListener('advertisementreceived', onAdvEvent);
						abortController.abort();
						resolve(mac.join(':'));
					}
				};
				_device.addEventListener('advertisementreceived', onAdvEvent);
				_device.watchAdvertisements({ signal: abortController.signal });
				setTimeout(function () { // reject if no mac found
					_device && _device.removeEventListener('advertisementreceived', onAdvEvent);
					abortController.abort();
					reject(-2);
				}, 10000);
			});
		}

		function initMac(forcePrompt, isWrongKey) {
			if (deviceMac) {
				var savedMacMap = JSON.parse(kernel.getProp('giiMacMap', '{}'));
				var prevMac = savedMacMap[deviceName];
				if (prevMac && prevMac.toUpperCase() == deviceMac.toUpperCase()) {
					DEBUG && console.log('[Moyu32Cube] mac matched');
				} else {
					DEBUG && console.log('[Moyu32Cube] mac updated');
					savedMacMap[deviceName] = deviceMac;
					kernel.setProp('giiMacMap', JSON.stringify(savedMacMap));
				}
				initDecoder(deviceMac);
			} else {
				var savedMacMap = JSON.parse(kernel.getProp('giiMacMap', '{}'));
				var mac = savedMacMap[deviceName];
				if (!mac || forcePrompt) {
					if (!mac && /^WCU_MY32_[0-9A-F]{4}$/.exec(deviceName)) {
						mac = 'CF:30:16:00:' + deviceName.slice(9, 11) + ':' + deviceName.slice(11, 13);
					}
					mac = prompt((isWrongKey ? 'The MAC provided might be wrong!\n' : '') + GIIKER_REQMACMSG, mac || 'xx:xx:xx:xx:xx:xx');
				}
				var m = /^([0-9a-f]{2}[:-]){5}[0-9a-f]{2}$/i.exec(mac);
				if (!m) {
					logohint.push(LGHINT_BTINVMAC);
					decoder = null;
					return;
				}
				if (mac != savedMacMap[deviceName]) {
					savedMacMap[deviceName] = mac;
					kernel.setProp('giiMacMap', JSON.stringify(savedMacMap));
				}
				deviceMac = mac;
				initDecoder(deviceMac);
			}
		}

		function init(device) {
			clear();
			deviceName = device.name.trim();
			DEBUG && console.log('[Moyu32Cube]', 'start init device');
			return waitForAdvs().then(function (mac) {
				DEBUG && console.log('[Moyu32Cube] init, found cube bluetooth hardware MAC = ' + mac);
				deviceMac = mac;
			}, function (err) {
				DEBUG && console.log('[Moyu32Cube] init, unable to automatically determine cube MAC, error code = ' + err);
			}).then(function () {
				return device.gatt.connect();
			}).then(function (gatt) {
				_gatt = gatt;
				return gatt.getPrimaryService(SERVICE_UUID);
			}).then(function (service) {
				_service = service;
				DEBUG && console.log('[Moyu32Cube]', 'got primary service', SERVICE_UUID);
				return _service.getCharacteristics();
			}).then(function (chrcts) {
				for (var i = 0; i < chrcts.length; i++) {
					var chrct = chrcts[i];
					DEBUG && console.log('[Moyu32Cube]', 'init find chrct', chrct.uuid);
					if (matchUUID(chrct.uuid, CHRT_UUID_READ)) {
						_chrct_read = chrct;
					} else if (matchUUID(chrct.uuid, CHRT_UUID_WRITE)) {
						_chrct_write = chrct;
					}
				}
			}).then(function () {
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
			DEBUG && console.log('[Moyu32Cube]', 'initialising cube state');
			callback(latestFacelet, [], [null, locTime], deviceName);
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
				DEBUG && console.log('[Moyu32Cube]', 'received hardware info event', value);
				var devName = '';
				for (var i = 0; i < 8; i++)
					devName += String.fromCharCode(parseInt(value.slice(8 + i * 8, 16 + i * 8), 2));
				var hardwareVersion = parseInt(value.slice(88, 96), 2) + "." + parseInt(value.slice(96, 104), 2);
				var softwareVersion = parseInt(value.slice(72, 80), 2) + "." + parseInt(value.slice(80, 88), 2);
				DEBUG && console.log('[Moyu32Cube]', 'Hardware Version (?)', hardwareVersion);
				DEBUG && console.log('[Moyu32Cube]', 'Software Version', softwareVersion);
				DEBUG && console.log('[Moyu32Cube]', 'Device Name', devName);
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
			DEBUG && moveDiff > 1 && console.log('[Moyu32Cube]', 'bluetooth event was lost, moveDiff = ' + moveDiff);
			prevMoveCnt = moveCnt;
			if (moveDiff > prevMoves.length) {
				moveDiff = prevMoves.length;
			}
			var calcTs = deviceTime + deviceTimeOffset;
			for (var i = moveDiff - 1; i >= 0; i--) {
				calcTs += timeOffs[i];
			}
			if (!deviceTime || Math.abs(locTime - calcTs) > 2000) {
				DEBUG && console.log('[Moyu32Cube]', 'time adjust', locTime - calcTs, '@', locTime);
				deviceTime += locTime - calcTs;
			}
			for (var i = moveDiff - 1; i >= 0; i--) {
				var m = "URFDLB".indexOf(prevMoves[i][0]) * 3 + " 2'".indexOf(prevMoves[i][1]);
				mathlib.CubieCube.CubeMult(prevCubie, mathlib.CubieCube.moveCube[m], curCubie);
				deviceTime += timeOffs[i];
				callback(curCubie.toFaceCube(), prevMoves.slice(i), [deviceTime, i == 0 ? locTime : null], deviceName);
				var tmp = curCubie;
				curCubie = prevCubie;
				prevCubie = tmp;
				DEBUG && console.log('[Moyu32Cube] move', prevMoves[i], timeOffs[i]);
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
			batteryLevel = 100;

			return result;
		}

		return {
			init: init,
			opservs: [SERVICE_UUID],
			cics: MOYU32_CIC_LIST,
			getBatteryLevel: getBatteryLevel,
			clear: clear
		}
	})();

	var QiyiCube = (function() {

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
			if (deviceMac) {
				var savedMacMap = JSON.parse(kernel.getProp('giiMacMap', '{}'));
				var prevMac = savedMacMap[_deviceName];
				if (prevMac && prevMac.toUpperCase() == deviceMac.toUpperCase()) {
					DEBUG && console.log('[qiyicube] mac matched');
				} else {
					DEBUG && console.log('[qiyicube] mac updated');
					savedMacMap[_deviceName] = deviceMac;
					kernel.setProp('giiMacMap', JSON.stringify(savedMacMap));
				}
			} else {
				var savedMacMap = JSON.parse(kernel.getProp('giiMacMap', '{}'));
				var mac = savedMacMap[_deviceName];
				if (!mac || forcePrompt) {
					if (!mac && /^QY-QYSC-.-[0-9A-F]{4}$/.exec(_deviceName)) {
						mac = 'CC:A3:00:00:' + _deviceName.slice(10, 12) + ':' + _deviceName.slice(12, 14);
					}
					mac = prompt((isWrongKey ? 'The MAC provided might be wrong!\n' : '') + GIIKER_REQMACMSG, mac || 'xx:xx:xx:xx:xx:xx');
				}
				var m = /^([0-9a-f]{2}[:-]){5}[0-9a-f]{2}$/i.exec(mac);
				if (!m) {
					logohint.push(LGHINT_BTINVMAC);
					return;
				}
				if (mac != savedMacMap[_deviceName]) {
					savedMacMap[_deviceName] = mac;
					kernel.setProp('giiMacMap', JSON.stringify(savedMacMap));
				}
				deviceMac = mac;
			}
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
			DEBUG && console.log('[qiyicube]', 'send message to cube', msg, encMsg);
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
					DEBUG && console.log('[qiyicube] found Manufacturer Data under CIC = 0x' + id.toString(16).padStart(4, '0'));
					return mfData.get(id);
				}
			}
			DEBUG && console.log('[qiyicube] Looks like this cube has new unknown CIC');
		}

		function waitForAdvs() {
			if (!_device || !_device.watchAdvertisements) {
				return Promise.reject(-1);
			}
			var abortController = new AbortController();
			return new Promise(function(resolve, reject) {
				var onAdvEvent = function(event) {
					DEBUG && console.log('[qiyicube] receive adv event', event);
					var mfData = event.manufacturerData;
					var dataView = getManufacturerDataBytes(mfData);
					if (dataView && dataView.byteLength >= 6) {
						var mac = [];
						for (var i = 5; i >= 0; i--) {
							mac.push((dataView.getUint8(i) + 0x100).toString(16).slice(1));
						}
						_device && _device.removeEventListener('advertisementreceived', onAdvEvent);
						abortController.abort();
						resolve(mac.join(':'));
					}
				};
				_device.addEventListener('advertisementreceived', onAdvEvent);
				_device.watchAdvertisements({ signal: abortController.signal });
				setTimeout(function() { // reject if no mac found
					_device && _device.removeEventListener('advertisementreceived', onAdvEvent);
					abortController.abort();
					reject(-2);
				}, 10000);
			});
		}

		function init(device) {
			clear();
			_deviceName = device.name.trim();
			DEBUG && console.log('[qiyicube]', 'start init device');
			return waitForAdvs().then(function (mac) {
				DEBUG && console.log('[qiyicube] init, found cube bluetooth hardware MAC = ' + mac);
				deviceMac = mac;
			}, function(err) {
				DEBUG && console.log('[qiyicube] init, unable to automatically determine cube MAC, error code = ' + err);
			}).then(function() {
				return device.gatt.connect();
			}).then(function(gatt) {
				_gatt = gatt;
				return gatt.getPrimaryService(SERVICE_UUID);
			}).then(function(service) {
				_service = service;
				DEBUG && console.log('[qiyicube]', 'got primary service', SERVICE_UUID);
				return _service.getCharacteristics();
			}).then(function(chrcts) {
				for (var i = 0; i < chrcts.length; i++) {
					var chrct = chrcts[i];
					DEBUG && console.log('[qiyicube]', 'init find chrct', chrct.uuid);
					if (matchUUID(chrct.uuid, CHRCT_UUID_CUBE)) {
						_chrct_cube = chrct;
					}
				}
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
			DEBUGBL && console.log('[qiyicube]', 'Received read event', value, value.byteLength);
			var encMsg = [];
			for (var i = 0; i < value.byteLength; i++) {
				encMsg[i] = value.getUint8(i);
			}
			DEBUGBL && console.log('[qiyicube]', 'receive enc data', JSON.stringify(encMsg));
			decoder = decoder || $.aes128(JSON.parse(LZString.decompressFromEncodedURIComponent(KEYS[0])));
			var msg = [];
			for (var i = 0; i < encMsg.length; i += 16) {
				var block = encMsg.slice(i, i + 16);
				decoder.decrypt(block);
				for (var j = 0; j < 16; j++) {
					msg[i + j] = block[j];
				}
			}
			DEBUGBL && console.log('[qiyicube]', 'decrypted msg', msg);
			msg = msg.slice(0, msg[1]);
			if (msg.length < 3 || crc16modbus(msg) != 0) {
				DEBUG && console.log('[qiyicube]', 'crc checked error');
				return;
			}
			parseCubeData(msg);
		}

		var curCubie = new mathlib.CubieCube();
		var prevCubie = new mathlib.CubieCube();
		var prevMoves = [];
		var lastTs = 0;
		var batteryLevel = 100;

		function parseCubeData(msg) {
			var locTime = $.now();
			if (msg[0] != 0xfe) {
				DEBUG && console.log('[qiyicube]', 'error cube data', msg);
			}
			var opcode = msg[2];
			var ts = (msg[3] << 24 | msg[4] << 16 | msg[5] << 8 | msg[6]);
			if (opcode == 0x2) { // cube hello
				sendMessage(msg.slice(2, 7));
				var newFacelet = parseFacelet(msg.slice(7, 34));
				callback(newFacelet, [], [Math.trunc(ts / 1.6), locTime], _deviceName);
				prevCubie.fromFacelet(newFacelet);
				batteryLevel = msg[35];
				giikerutil.updateBattery([batteryLevel, _deviceName]);
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
					DEBUG && console.log('[qiyicube]', 'miss history moves', JSON.stringify(todoMoves), lastTs);
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
					DEBUG && console.log('[qiyicube]', 'facelet', newFacelet);
					curCubie.fromFacelet(newFacelet);
					callback(newFacelet, prevMoves, [Math.trunc(ts / 1.6), locTime], _deviceName);
					var tmp = curCubie;
					curCubie = prevCubie;
					prevCubie = tmp;
				} else {
					for (var i = 0; i < toCallback.length; i++) {
						callback.apply(null, toCallback[i]);
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
			// console.log('[qiyicube]', 'parsedFacelet', ret);
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
			batteryLevel = 100;
			return result;
		}

		return {
			init: init,
			opservs: [SERVICE_UUID],
			cics: QIYI_CIC_LIST,
			getBatteryLevel: function() { return Promise.resolve([batteryLevel, _deviceName]); },
			clear: clear
		}
	})();

	function onHardwareEvent(info, event) {
		var res = Promise.resolve();
		if (info == 'disconnect') {
			res = Promise.resolve(stop());
		}
		return res.then(function () {
			return typeof evtCallback == 'function' && evtCallback(info, event);
		});
	}

	var onDisconnect = onHardwareEvent.bind(null, 'disconnect');

	function init(timer) {

		if (!window.navigator || !window.navigator.bluetooth) {
			alert(GIIKER_NOBLEMSG);
			return Promise.reject();
		}
		var chkAvail = Promise.resolve(true);
		if (window.navigator.bluetooth.getAvailability) {
			chkAvail = window.navigator.bluetooth.getAvailability();
		}

		return chkAvail.then(function(available) {
			DEBUG && console.log('[bluetooth]', 'is available', available);
			if (!available) {
				return Promise.reject(GIIKER_NOBLEMSG);
			}
			return window.navigator.bluetooth.requestDevice({
				filters: [{
					namePrefix: 'Gi'
				}, {
					namePrefix: 'Mi Smart'
				}, {
					namePrefix: 'Hi-'
				}, {
					namePrefix: 'GAN'
				}, {
					namePrefix: 'MG'
				}, {
					namePrefix: 'AiCube'
				}, {
					namePrefix: 'GoCube'
				}, {
					namePrefix: 'Rubiks'
				}, {
					namePrefix: 'MHC'
				}, {
					namePrefix: 'QY-QYSC'
				}, {
					namePrefix: 'WCU_MY32'
				}],
				optionalServices: [...new Set([].concat(GiikerCube.opservs, GanCube.opservs, GoCube.opservs, MoyuCube.opservs, QiyiCube.opservs, Moyu32Cube.opservs))],
				optionalManufacturerData: [...new Set([].concat(GanCube.cics, QiyiCube.cics, Moyu32Cube.cics))]
			});
		}).then(function(device) {
			DEBUG && console.log('[bluetooth]', device);
			_device = device;
			device.addEventListener('gattserverdisconnected', onDisconnect);
			if (device.name.startsWith('Gi') || device.name.startsWith('Mi Smart Magic Cube') || device.name.startsWith('Hi-')) {
				cube = GiikerCube;
				return GiikerCube.init(device);
			} else if (device.name.startsWith('GAN') || device.name.startsWith('MG') || device.name.startsWith('AiCube')) {
				cube = GanCube;
				return GanCube.init(device);
			} else if (device.name.startsWith('GoCube') || device.name.startsWith('Rubiks')) {
				cube = GoCube;
				return GoCube.init(device);
			} else if (device.name.startsWith('MHC')) {
				cube = MoyuCube;
				return MoyuCube.init(device);
			} else if (device.name.startsWith('QY-QYSC')) {
				cube = QiyiCube;
				return QiyiCube.init(device);
			} else if (device.name.startsWith('WCU_MY32')) {
				cube = Moyu32Cube;
				return Moyu32Cube.init(device);
			} else {
				return Promise.reject('Cannot detect device type');
			}
		});
	}

	function stop() {
		if (!_device) {
			return Promise.resolve();
		}
		return Promise.resolve(cube && cube.clear()).then(function () {
			_device.removeEventListener('gattserverdisconnected', onDisconnect);
			_device.gatt.disconnect();
			_device = null;
		});
	}

	var callback = $.noop;
	var evtCallback = $.noop;

	return {
		init: init,
		stop: stop,
		isConnected: function() {
			return _device != null || DEBUGBL;
		},
		setCallback: function(func) {
			callback = func;
		},
		setEventCallback: function(func) {
			evtCallback = func;
		},
		getCube: function() {
			return cube || (DEBUGBL && {
				getBatteryLevel: function() { return Promise.resolve(80); }
			});
		}
	};
});
