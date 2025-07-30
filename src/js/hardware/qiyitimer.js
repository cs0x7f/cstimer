"use strict";

var QiyiTimerState = {};
QiyiTimerState[QiyiTimerState["IDLE"] = 0] = "IDLE";
QiyiTimerState[QiyiTimerState["INSPECTION"] = 1] = "INSPECTION";
QiyiTimerState[QiyiTimerState["GET_SET"] = 2] = "GET_SET";
QiyiTimerState[QiyiTimerState["RUNNING"] = 3] = "RUNNING";		// Timer is running
QiyiTimerState[QiyiTimerState["FINISHED"] = 4] = "FINISHED";	  // Timer moves to this state immediately after STOPPED
QiyiTimerState[QiyiTimerState["STOPPED"] = 5] = "STOPPED";		// Timer is stopped, this event includes recorded time

var QiyiTimerDriver = execMain(function () {
	var UUID_SUFFIX = '-0000-1001-8001-00805f9b07d0';
	var QIYI_TIMER_SERVICE = '0000fd50' + UUID_SUFFIX;
	var QIYI_TIMER_CHRCT_WRITE = '00000001' + UUID_SUFFIX;
	var QIYI_TIMER_CHRCT_READ = '00000002' + UUID_SUFFIX;
	var stateUpdateCallback;

	var bluetoothDevice;
	var service;
	var readChrct;
	var writeChrct;
	var decoder;

	function connect(reconnect) {
		if (!window.navigator.bluetooth) {
			return Promise.reject("Bluetooth API is not supported by this browser. Try fresh Chrome version!");
		}
		var chkAvail = Promise.resolve(true);
		if (window.navigator.bluetooth.getAvailability) {
			chkAvail = window.navigator.bluetooth.getAvailability();
		}
		decoder	= decoder || $.aes128([0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77]);

		return chkAvail.then(function(available) {
			if (!available)
				return Promise.reject("Bluetooth is not available. Ensure HTTPS access, and check bluetooth is enabled on your device");
		}).then(function () {
			DEBUG && console.log('[QiyiTimerDriver] requesting for bluetooth device, reconnect = ' + !!reconnect);
			if (bluetoothDevice && reconnect) {
				return waitUntilDeviceAvailable(bluetoothDevice);
			}
			return navigator.bluetooth.requestDevice({
				filters: [
					{ namePrefix: "QY-Timer" }
				],
				optionalServices: [QIYI_TIMER_SERVICE]
			});
		}).then(function (device) {
			DEBUG && console.log('[QiyiTimerDriver] connecting to GATT server');
			bluetoothDevice = device;
			device.addEventListener('gattserverdisconnected', handleUnexpectedDisconnection);
			return device.gatt.connect();
		}).then(function (gatt) {
			DEBUG && console.log('[QiyiTimerDriver] getting timer primary service');
			return gatt.getPrimaryService(QIYI_TIMER_SERVICE);
		}).then(function (_service) {
			DEBUG && console.log('[QiyiTimerDriver] getting timer write characteristic');
			service = _service;
			return service.getCharacteristic(QIYI_TIMER_CHRCT_WRITE);
		}).then(function (characteristic) {
			DEBUG && console.log('[QiyiTimerDriver] start listening to state characteristic value updates');
			writeChrct = characteristic;
			return service.getCharacteristic(QIYI_TIMER_CHRCT_READ);
		}).then(function (characteristic) {
			DEBUG && console.log('[QiyiTimerDriver] start listening to state characteristic value updates');
			readChrct = characteristic;
			readChrct.addEventListener('characteristicvaluechanged', onReadEvent);
			readChrct.startNotifications();
		});
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
		msg.push(crc & 0xff, crc >> 8);

		var ret = Promise.resolve();
		for (var i = 0; i < msg.length; i += 16) {
			var block = msg.slice(i, i + 16);
			while (block.length < 16) {
				block.push(0);
			}
			decoder.encrypt(block);
			var curBlock = i == 0 ? [0x00, msg.length, 0x40, 0x00] : [i >> 4];
			for (var j = 0; j < 16; j++) {
				curBlock.push(block[j]);
			}
			ret = ret.then(function (block) {
				writeChrct.writeValue(new Uint8Array(encMsg).buffer);
			}.bind(null, curBlock));
		}
		giikerutil.log('[QiyiTimerDriver] send message to timer', msg);
		return ret;
	}

	function sendBind(mac) {
		let content = Array(11).fill(0);
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
		DEBUG && console.log('[QiyiTimerDriver] onReadEvent', event);
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
			payloadLen = msg[1];
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
		giikerutil.log('[QiyiTimerDriver] receive data', payloadData);
		if (crc16modbus(data) != 0) {
			giikerutil.log('[QiyiTimerDriver] crc checked error');
			return;
		}
		waitPkg = 0;
		payloadData = [];

		var sendSN = data[0] << 24 | data[1] << 16 | data[2] << 8 | data[3];
		var ackSN = data[4] << 24 | data[5] << 16 | data[6] << 8 | data[7];
		var cmd = data[8] << 8 | data[9];
		var len = data[10] << 8 | data[11];
		data = data.slice(12);
		if (cmd != 0x1003) {
			return;
		}
		var dpId = data[0];
		var dpType = data[1];
		var dpLen = data[2] << 8 | data[3];
		if (dpId == 1 && dpType == 1) { // record time
			var inspecTime = data[8] << 24 | data[9] << 16 | data[10] << 8 | data[11];
			var solveTime = data[12] << 24 | data[13] << 16 | data[14] << 8 | data[15];
			stateUpdateCallback && stateUpdateCallback({
				state: state,
				recordedTime: {
					asTimestamp: solveTime
				},
				inspectTime: inspecTime
			});
			sendAck(ackSN + 1, sendSN, 0x1003);
		} else if (dpId == 4 && dpType == 4) { // record timer status
			var state = data[4];
			var value = data[5] << 24 | data[6] << 16 | data[7] << 8 | data[8];
			stateUpdateCallback && stateUpdateCallback({
				state: state,
				recordedTime: {
					asTimestamp: value
				}
			});
		} else {
			console.log('[QiyiTimerDriver] unknown data', data);
		}
	}

	function disconnect() {
		if (bluetoothDevice && bluetoothDevice.stopWaiting) {
			bluetoothDevice.stopWaiting();
		}
		if (readChrct) {
			DEBUG && console.log('[GanTimerDriver] disconnecting from timer device');
			readChrct.service.device.removeEventListener('gattserverdisconnected', handleUnexpectedDisconnection);
			readChrct.removeEventListener('characteristicvaluechanged', handleStateCharacteristicUpdate);
			return readChrct.stopNotifications().catch($.noop).finally(function () {
				readChrct.service.device.gatt.disconnect();
				readChrct = undefined;
			});
		} else {
			return Promise.resolve();
		}
	}

	function isConnected() {
		return !!readChrct;
	}
	
	function setStateUpdateCallback() {
		stateUpdateCallback = callback;
	}

	return {
		connect: connect,
		isConnected: isConnected,
		disconnect: disconnect,
		setStateUpdateCallback: setStateUpdateCallback
	};
});
