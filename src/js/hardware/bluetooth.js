"use strict";

var GiikerCube = execMain(function() {

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
		if (!_device || !_device.watchAdvertisements) {
			return Promise.reject(-1);
		}
		var abortController = new AbortController();
		return new Promise(function(resolve, reject) {
			var onAdvEvent = function(event) {
				giikerutil.log('[bluetooth] receive adv event', event);
				_device && _device.removeEventListener('advertisementreceived', onAdvEvent);
				abortController.abort();
				resolve(event.manufacturerData);
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
			giikerutil.log('[bluetooth] is available', available);
			if (!available) {
				return Promise.reject(GIIKER_NOBLEMSG);
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
		},
		regCubeModel: regCubeModel,
		matchUUID: matchUUID,
		waitForAdvs: waitForAdvs,
		onDisconnect: onDisconnect,
		callback: function() {
			return callback.apply(null, arguments);
		}
	};
});
