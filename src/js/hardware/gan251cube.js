/**
 * GAN 251 UI (2x2) Bluetooth driver for csTimer.
 * Protocol/state: vendored gan2x2ui (MIT) — see gan2x2uilib.js
 */
execMain(function() {
	var SOLVED_EA = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22];
	var SERVICE_UUID = '00000010-0000-fff7-fff6-fff5fff4fff0';
	var GAN_CIC_LIST = mathlib.valuedArray(256, function(i) { return (i << 8) | 0x01; });

	var _cube = null;
	var _deviceName = null;
	var _cubie = new mathlib.CubieCube();
	var _prevMoves = [];
	var _unsubs = [];

	function toCstimerMove(m) {
		if (!m || m == '?') {
			return null;
		}
		if (m.length == 1) {
			return m + ' ';
		}
		return m;
	}

	function faceletNow() {
		_cubie.ea = SOLVED_EA.slice();
		return _cubie.toFaceCube();
	}

	function applyMove(cst) {
		var axis = 'URFDLB'.indexOf(cst[0]);
		var pow = " 2'".indexOf(cst[1] || ' ');
		if (axis < 0 || pow < 0) {
			return;
		}
		var m = axis * 3 + pow;
		var next = new mathlib.CubieCube();
		mathlib.CubieCube.CornMult(_cubie, mathlib.CubieCube.moveCube[m], next);
		next.ea = SOLVED_EA.slice();
		_cubie = next;
	}

	function emit(moves, ts, locTime) {
		GiikerCube.callback(faceletNow(), moves || [], [ts == null ? null : ts, locTime], _deviceName + '*');
	}

	function resetLocal(reason) {
		giikerutil.log('[gan251]', 'local solved', reason || '');
		_cubie = new mathlib.CubieCube();
		_cubie.ea = SOLVED_EA.slice();
		_prevMoves = [];
		emit([], null, $.now());
	}

	function detach() {
		for (var i = 0; i < _unsubs.length; i++) {
			try {
				_unsubs[i]();
			} catch (e) {}
		}
		_unsubs = [];
		_cube = null;
	}

	function attach(cube) {
		_cube = cube;
		_deviceName = cube.deviceName || (cube.device && cube.device.name) || 'GAN251Ui';
		_unsubs.push(cube.on('move', function(e) {
			var cst = toCstimerMove(e.move);
			giikerutil.log('[gan251]', 'move', e.serial, e.move, e.hwMove, e.via);
			if (!cst) {
				return;
			}
			applyMove(cst);
			_prevMoves.unshift(cst);
			if (_prevMoves.length > 8) {
				_prevMoves = _prevMoves.slice(0, 8);
			}
			emit(_prevMoves, e.cubeTimestamp, $.now());
		}));
		_unsubs.push(cube.on('battery', function(e) {
			giikerutil.updateBattery([e.level, _deviceName + '*']);
		}));
		_unsubs.push(cube.on('disconnect', function() {
			giikerutil.log('[gan251]', 'disconnect event');
		}));
		_unsubs.push(cube.on('error', function(e) {
			giikerutil.log('[gan251]', 'error', e && e.error);
		}));
		_unsubs.push(cube.on('connect', function(e) {
			giikerutil.log('[gan251]', 'connect', e.name, e.mac, e.macSource, 'solved=', e.solved);
			resetLocal('lib connect');
		}));
	}

	function init(device) {
		giikerutil.log('[gan251] init', device && device.name);
		if (typeof gan2x2ui == 'undefined' || !gan2x2ui['Gan2x2UI']) {
			return Promise.reject('gan2x2ui library not loaded');
		}
		return clear().then(function() {
			return gan2x2ui['Gan2x2UI'].connect({
				device: device,
				resetOnConnect: true,
				autoMac: true,
				cacheMac: true
			});
		}).then(function(cube) {
			attach(cube);
			resetLocal('after connect');
			if (typeof giikerutil.markSolvedSoft == 'function') {
				giikerutil.markSolvedSoft();
			}
			if (typeof cube.battery == 'number') {
				giikerutil.updateBattery([cube.battery, _deviceName + '*']);
			} else {
				cube.send('BATTERY').catch($.noop);
			}
		});
	}

	function clear() {
		var p = Promise.resolve();
		if (_cube) {
			var c = _cube;
			detach();
			p = Promise.resolve(c.disconnect()).catch($.noop);
		}
		_cubie = new mathlib.CubieCube();
		_cubie.ea = SOLVED_EA.slice();
		_prevMoves = [];
		_deviceName = null;
		return p;
	}

	function getBatteryLevel() {
		if (!_cube) {
			return Promise.reject('Bluetooth Cube is not connected');
		}
		var level = _cube.battery;
		_cube.send('BATTERY').catch($.noop);
		return Promise.resolve([level != null ? level : 100, _deviceName + '*']);
	}

	function markHardwareSolved() {
		if (!_cube) {
			return Promise.resolve();
		}
		return _cube.markSolved().then(function() {
			resetLocal('markSolved');
			if (typeof giikerutil.markSolvedSoft == 'function') {
				giikerutil.markSolvedSoft();
			}
		});
	}

	GiikerCube.regCubeModel({
		prefix: ['GAN251Ui', 'GAN251UI', 'gan251ui', 'GANic251', 'ganic251'],
		init: init,
		opservs: [SERVICE_UUID],
		cics: GAN_CIC_LIST,
		getBatteryLevel: getBatteryLevel,
		clear: clear,
		markHardwareSolved: markHardwareSolved
	});
});
