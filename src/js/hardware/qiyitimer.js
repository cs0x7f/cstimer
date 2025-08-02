"use strict";

execMain(function () {
	var CONST = BluetoothTimer.CONST;
	var SERVICE_UUID = '0000fd50-0000-1000-8000-00805f9b34fb';
	var UUID_SUFFIX = '-0000-1001-8001-00805f9b07d0';
	var CHRCT_WRITE = '00000001' + UUID_SUFFIX;
	var CHRCT_READ = '00000002' + UUID_SUFFIX;
	var QIYI_CIC_LIST = [0x0504];
	var stateUpdateCallback;

	var deviceName;
	var readChrct;
	var writeChrct;
	var decoder;
	var deviceMac;

	function getManufacturerDataBytes(mfData) {
		if (mfData instanceof DataView) { // this is workaround for Bluefy browser
			return new DataView(mfData.buffer.slice(2));
		}
		for (var id of QIYI_CIC_LIST) {
			if (mfData.has(id)) {
				giikerutil.log('[QiyiTimer] found Manufacturer Data under CIC = 0x' + id.toString(16).padStart(4, '0'));
				return mfData.get(id);
			}
		}
		giikerutil.log('[QiyiTimer] Looks like this cube has new unknown CIC');
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

	function sendMessage(sendSN, ackSN, cmd, data) {
		let msg = [];
		msg.push(sendSN >> 24 & 0xff, sendSN >> 16 & 0xff, sendSN >> 8 & 0xff, sendSN & 0xff);
		msg.push(ackSN >> 24 & 0xff, ackSN >> 16 & 0xff, ackSN >> 8 & 0xff, ackSN & 0xff);
		msg.push(cmd >> 8 & 0xff, cmd & 0xff);
		let len = data.length;
		msg.push(len >> 8 & 0xff, len & 0xff);
		msg = msg.concat(data);
		var crc = crc16modbus(msg);
		msg.push(crc >> 8, crc & 0xff);

		var ret = Promise.resolve();
		for (var i = 0; i < msg.length; i += 16) {
			var block = msg.slice(i, i + 16);
			while (block.length < 16) {
				block.push(1);
			}
			decoder.encrypt(block);
			var curBlock = i == 0 ? [0x00, msg.length + 2, 0x40, 0x00] : [i >> 4];
			for (var j = 0; j < 16; j++) {
				curBlock.push(block[j]);
			}
			ret = ret.then(function (block) {
				return writeChrct && writeChrct.writeValue(new Uint8Array(block).buffer);
			}.bind(null, curBlock));
		}
		giikerutil.log('[QiyiTimer] send message to timer', msg);
		return ret;
	}

	function sendHello(mac) {
		let content = [0, 0, 0, 0, 0, 33, 8, 0, 1, 5, 90]; // Array(11).fill(0);
		for (var i = 5; i >= 0; i--) {
			content.push(parseInt(mac.slice(i * 3, i * 3 + 2), 16));
		}
		return sendMessage(1, 0, 1, content);
	}

	function sendAck(sendSN, ackSN, cmd) {
		return sendMessage(sendSN, ackSN, cmd, [0x00]);
	}

	var waitPkg = 0;
	var payloadLen = 0;
	var payloadData = [];

	function onReadEvent(event) {
		giikerutil.log('[QiyiTimer] onReadEvent', event);
		var value = event.target.value;
		var msg = [];
		for (var i = 0; i < value.byteLength; i++) {
			msg[i] = value.getUint8(i);
		}
		if (msg[0] != waitPkg) {
			waitPkg = 0;
			payloadData = [];
			if (msg[0] != 0) {
				return;
			}
		}
		if (msg[0] == 0) {
			payloadLen = msg[1] - 2;
			msg = msg.slice(4);
		} else {
			msg = msg.slice(1);
		}
		for (var i = 0; i < msg.length; i += 16) {
			var block = msg.slice(i, i + 16);
			if (block.length < 16) {
				waitPkg = 0;
				payloadData = [];
				return;
			}
			decoder.decrypt(block);
			payloadData = payloadData.concat(block);
		}
		if (payloadData.length < payloadLen) {
			waitPkg++;
			return;
		}
		var data = payloadData.slice(0, payloadLen);
		waitPkg = 0;
		payloadData = [];

		giikerutil.log('[QiyiTimer] receive data', data);
		var len = data[10] << 8 | data[11];
		if (crc16modbus(data.slice(0, len + 12).concat([data[len + 13], data[len + 12]])) != 0) {
			giikerutil.log('[QiyiTimer] crc checked error');
			return;
		}
		var sendSN = data[0] << 24 | data[1] << 16 | data[2] << 8 | data[3];
		var ackSN = data[4] << 24 | data[5] << 16 | data[6] << 8 | data[7];
		var cmd = data[8] << 8 | data[9];
		data = data.slice(12, len + 12);
		if (cmd != 0x1003) {
			return;
		}
		giikerutil.log('[QiyiTimer] receive 1003 message', data);
		var dpId = data[0];
		var dpType = data[1];
		var dpLen = data[2] << 8 | data[3];
		if (dpId == 1 && dpType == 1) { // record time
			var solveTime = data[8] << 24 | data[9] << 16 | data[10] << 8 | data[11];
			var inspectTime = data[12] << 24 | data[13] << 16 | data[14] << 8 | data[15];
			BluetoothTimer.callback({
				state: CONST.STOPPED,
				solveTime: solveTime,
				inspectTime: inspectTime
			});
			sendAck(ackSN + 1, sendSN, 0x1003);
		} else if (dpId == 4 && dpType == 4) { // record timer status
			var state = [
				CONST.IDLE,
				CONST.INSPECTION,
				CONST.GET_SET,
				CONST.RUNNING,
				CONST.FINISHED,
				CONST.STOPPED,
				CONST.DISCONNECT
			][data[4]];
			var solveTime = data[5] << 24 | data[6] << 16 | data[7] << 8 | data[8];
			BluetoothTimer.callback({
				state: state,
				solveTime: solveTime
			});
		} else {
			giikerutil.log('[QiyiTimer] unknown data', data);
		}
	}

	$.qiyiMsgTest = function(byteArr) {
		decoder = decoder || $.aes128(Array(16).fill(0x77));
		onReadEvent({
			target: {
				value: new DataView(new Uint8Array(byteArr).buffer)
			}
		});
	};

	function clear(isHardwareEvent) {
		if (readChrct) {
			giikerutil.log('[QiyiTimer] disconnecting from timer device');
			readChrct.removeEventListener('characteristicvaluechanged', onReadEvent);
			return readChrct.stopNotifications().catch($.noop).finally(function () {
				readChrct = undefined;
				isHardwareEvent && BluetoothTimer.callback({ state: CONST.DISCONNECT });
			});
		}
		return Promise.resolve();
	}

	function init(device) {
		deviceName = device.name.trim();
		decoder = decoder || $.aes128(Array(16).fill(0x77));
		return BluetoothTimer.waitForAdvs().then(function(mfData) {
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
			giikerutil.log('[QiyiTimer] init, found cube bluetooth hardware MAC = ' + mac);
			deviceMac = mac;
		}, function(err) {
			giikerutil.log('[QiyiTimer] init, unable to automatically determine cube MAC, error code = ' + err);
		}).then(function() {
			giikerutil.log('[QiyiTimer] connecting to GATT server');
			return device.gatt.connect();
		}).then(function (gatt) {
			giikerutil.log('[QiyiTimer] getting timer primary service');
			return gatt.getPrimaryService(SERVICE_UUID);
		}).then(function (service) {
			giikerutil.log('[QiyiTimer] getting timer characteristic');
			return service.getCharacteristics();
		}).then(function(chrcts) {
			writeChrct = BluetoothTimer.findUUID(chrcts, CHRCT_WRITE);
			readChrct = BluetoothTimer.findUUID(chrcts, CHRCT_READ);
			if (!readChrct || !writeChrct) {
				return Promise.reject('[QiyiTimer] Cannot find required characteristics');
			}
			giikerutil.log('[QiyiTimer] start listening to state characteristic value updates');
			readChrct.addEventListener('characteristicvaluechanged', onReadEvent);
			return readChrct.startNotifications();
		}).then(function () {
			var defaultMac = null;
			var m = /^QY-(?:Timer|Adapter).*-([0-9A-F]{4})$/.exec(deviceName)
			if (m) {
				defaultMac = (deviceName.startsWith('QY-Adapter') ? 'CC:A8' : 'CC:A1') + ':00:00:' + m[1].slice(0, 2)  + ':' + m[1].slice(2, 4);
			}
			deviceMac = giikerutil.reqMacAddr(true, false, deviceMac, defaultMac);
			return sendHello(deviceMac);
		});
	}

	BluetoothTimer.regCubeModel({
		prefix: ['QY-Timer', 'QY-Adapter'],
		init: init,
		opservs: [SERVICE_UUID],
		cics: QIYI_CIC_LIST,
		clear: clear
	});
});
