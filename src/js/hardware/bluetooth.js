"use strict";

function BtDeviceGroupFactory() {

	/* { prefix: cubeModel } */
	var cubeModels = {};

	function regCubeModel(cubeModel) {
		if ($.isArray(cubeModel.prefix)) {
			cubeModel.prefix.map((prefix) => {
				cubeModels[prefix] = cubeModel;
			});
		} else {
			cubeModels[cubeModel.prefix] = cubeModel;
		}
	}

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

	function waitForAdvs() {
		return giikerutil.waitForAdvs(function() {
			return _device;
		});
	}

	function onHardwareEvent(info, event) {
		var res = Promise.resolve();
		if (info == 'disconnect') {
			res = Promise.resolve(stop(true));
		}
		return res.then(function () {
			return typeof evtCallback == 'function' && evtCallback(info, event);
		});
	}

	var onDisconnect = onHardwareEvent.bind(null, 'disconnect');

	function init(reconnect) {
		return giikerutil.chkAvail().then(function() {
			if (_device && reconnect) {
				giikerutil.log('[bluetooth]', 'reconnecting...', _device);
				return waitUntilDeviceAvailable(_device);
			}
			var filters = Object.keys(cubeModels).map((prefix) => ({ namePrefix: prefix }));
			var opservs = [...new Set(Array.prototype.concat.apply([], Object.values(cubeModels).map((cubeModel) => cubeModel.opservs || [])))];
			var cics = [...new Set(Array.prototype.concat.apply([], Object.values(cubeModels).map((cubeModel) => cubeModel.cics || [])))];
			giikerutil.log('[bluetooth]', 'scanning...', Object.keys(cubeModels));
			return window.navigator.bluetooth.requestDevice({
				filters: filters,
				optionalServices: opservs,
				optionalManufacturerData: cics
			});
		}).then(function(device) {
			giikerutil.log('[bluetooth]', 'BLE device is selected, name=' + device.name, device);
			_device = device;
			device.addEventListener('gattserverdisconnected', onDisconnect);
			cube = null;
			for (var prefix in cubeModels) {
				if (device.name.startsWith(prefix)) {
					cube = cubeModels[prefix];
					break;
				}
			}
			if (!cube) {
				return Promise.reject('Cannot detect device type');
			}
			return cube.init(device);
		});
	}

	// Wait until target device start sending bluetooth advertisiment packets
	function waitUntilDeviceAvailable(device) {
		var abortController = new AbortController();
		return new Promise(function (resolve, reject) {
			if (!device.watchAdvertisements) {
				reject("Bluetooth Advertisements API is not supported by this browser");
			} else {
				var onAdvEvent = function (event) {
					DEBUG && console.log('[bluetooth] received advertisement packet from device', event);
					delete device.stopWaiting;
					device.removeEventListener('advertisementreceived', onAdvEvent);
					abortController.abort();
					resolve(device);
				};
				device.stopWaiting = function () {
					DEBUG && console.log('[bluetooth] cancel waiting for device advertisements');
					delete device.stopWaiting;
					device.removeEventListener('advertisementreceived', onAdvEvent);
					abortController.abort();
				}
				device.addEventListener('advertisementreceived', onAdvEvent);
				device.watchAdvertisements({ signal: abortController.signal });
				DEBUG && console.log('[bluetooth] start waiting for device advertisement packet');
			}
		});
	}

	function stop(isHardwareEvent) {
		if (!_device) {
			return Promise.resolve();
		}
		return Promise.resolve(cube && cube.clear(isHardwareEvent)).then(function () {
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
		},
		regCubeModel: regCubeModel,
		matchUUID: matchUUID,
		waitForAdvs: waitForAdvs,
		onDisconnect: onDisconnect,
		callback: function() {
			return callback.apply(null, arguments);
		}
	};
}

var GiikerCube = execMain(BtDeviceGroupFactory);

var BluetoothTimer = execMain(BtDeviceGroupFactory);

BluetoothTimer.CONST = (function() {
	var State = {};
	State.DISCONNECT = 0;  // Fired when timer is disconnected from bluetooth
	State.GET_SET = 1;     // Grace delay is expired and timer is ready to start
	State.HANDS_OFF = 2;   // Hands removed from the timer before grace delay expired
	State.RUNNING = 3;     // Timer is running
	State.STOPPED = 4;     // Timer is stopped, this event includes recorded time
	State.IDLE = 5;        // Timer is reset and idle
	State.HANDS_ON = 6;    // Hands are placed on the timer
	State.FINISHED = 7;    // Timer moves to this state immediately after STOPPED
	State.INSPECTION = 8;
	State.GAN_RESET = 9;
	return State;
})();
