/**
 * 
 * Driver for GAN Smart Timer using Web Bluetooth API
 * Credits: Andy Fedotov, https://github.com/afedotov
 * Based on modern typescript version of this stuff: https://github.com/afedotov/gan-web-bluetooth
 * 
 */

"use strict";

var GanTimerDriver = execMain(function () {
	var CONST = BluetoothTimer.CONST;
	var SERVICE_UUID = '0000fff0-0000-1000-8000-00805f9b34fb';
	var READ_CHRCT_UUID = '0000fff5-0000-1000-8000-00805f9b34fb';
	var readChrct;

	// dump DataView object as hex string
	function hexdump(dataView) {
		var hexdata = [];
		if (dataView) {
			for (var i = 0; i < dataView.byteLength; i++) {
				hexdata.push(dataView.getUint8(i).toString(16).padStart(2, '0'));
			}
		}
		return hexdata.join(" ");
	}

	// build event from raw data
	function buildTimerEvent(data) {
		var state = [
			CONST.DISCONNECT,
			CONST.GET_SET,
			CONST.HANDS_OFF,
			CONST.RUNNING,
			CONST.STOPPED,
			CONST.GAN_RESET,
			CONST.HANDS_ON,
			CONST.FINISHED
		][data.getUint8(3)] || 0;
		var evt = { state: state };
		if (evt.state == CONST.STOPPED) {
			var min = data.getUint8(4);
			var sec = data.getUint8(5);
			var msec = data.getUint16(6, true);
			evt.solveTime = 60000 * min + 1000 * sec + msec;
		}
		return evt;
	}

	// Ensure received bluetooth event has valid data: check data magic and CRC
	function validateEventData(data) {
		try {
			if (!data || data.byteLength == 0 || data.getUint8(0) != 0xFE) {
				return false;
			}
			var dataCRC = data.getUint16(data.byteLength - 2, true);
			var calculatedCRC = BluetoothTimer.crc16ccit(new Uint8Array(data.buffer, data.byteOffset + 2, data.byteLength - 4));
			return dataCRC == calculatedCRC;
		} catch (err) {
			return false;
		}
	}

	// handle value update of the timer state bluetooth characteristic
	function onReadEvent(event) {
		var data = event.target.value;
		if (!validateEventData(data)) {
			console.log("[GanTimer] Invalid event data received from Timer: " + hexdump(data));
		}
		BluetoothTimer.callback(buildTimerEvent(data));
	}

	function init(device) {
		giikerutil.log('[GanTimer] connecting to GATT server');
		return device.gatt.connect().then(function (gatt) {
			giikerutil.log('[GanTimer] getting timer primary service');
			return gatt.getPrimaryService(SERVICE_UUID);
		}).then(function (service) {
			giikerutil.log('[GanTimer] getting timer state characteristic');
			return service.getCharacteristic(READ_CHRCT_UUID);
		}).then(function (characteristic) {
			giikerutil.log('[GanTimer] start listening to state characteristic value updates');
			readChrct = characteristic;
			readChrct.addEventListener('characteristicvaluechanged', onReadEvent);
			return readChrct.startNotifications();
		});
	}

	function clear(isHardwareEvent) {
		if (readChrct) {
			giikerutil.log('[GanTimer] disconnecting from timer device');
			readChrct.removeEventListener('characteristicvaluechanged', onReadEvent);
			return readChrct.stopNotifications().catch($.noop).finally(function () {
				readChrct = undefined;
				isHardwareEvent && BluetoothTimer.callback({ state: CONST.DISCONNECT });
			});
		} else {
			return Promise.resolve();
		}
	}

	BluetoothTimer.regCubeModel({
		prefix: ['GAN', 'Gan', 'gan'],
		init: init,
		opservs: [SERVICE_UUID],
		servFilters: [SERVICE_UUID],
		clear: clear
	});
});
