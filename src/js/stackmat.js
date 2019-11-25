"use strict";

var stackmat = execMain(function() {

	//========== Hardware Part ==========
	var audio_context;
	var audio_stream, source, node;
	var sample_rate;
	var bitAnalyzer;
	var curTimer;

	function updateInputDevices() {
		var devices = [];
		var retobj = new Promise(function(resolve, reject) {
			resolve(devices);
		});
		if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
			return retobj;
		}

		return navigator.mediaDevices.enumerateDevices().then(function(deviceInfos) {
			for (var i = 0; i < deviceInfos.length; i++) {
				var deviceInfo = deviceInfos[i];
				if (deviceInfo.kind === 'audioinput') {
					devices.push([deviceInfo.deviceId, deviceInfo.label || 'microphone ' + (devices.length + 1)]);
				}
			}
			return retobj;
		});
	}

	function init(timer, deviceId, force) {
		curTimer = timer;

		if (navigator.mediaDevices === undefined) {
			navigator.mediaDevices = {};
		}

		if (navigator.mediaDevices.getUserMedia === undefined) {
			navigator.mediaDevices.getUserMedia = function(constraints) {
				var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
				if (!getUserMedia) {
					return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
				}
				return new Promise(function(resolve, reject) {
					getUserMedia.call(navigator, constraints, resolve, reject);
				});
			}
		}

		var AudioContext = (window["AudioContext"] || window["webkitAudioContext"]);

		audio_context = new AudioContext();

		if (curTimer == 'm') {
			sample_rate = audio_context["sampleRate"] / 8000;
			bitAnalyzer = appendBitMoyu;
		} else {
			sample_rate = audio_context["sampleRate"] / 1200;
			bitAnalyzer = appendBit;
		}
		agc_factor = 0.001 / sample_rate;
		lastVal.length = Math.ceil(sample_rate / 6);
		bitBuffer = [];
		byteBuffer = [];

		var selectObj = {
			"echoCancellation": false,
			"noiseSuppression": false
		};

		if (deviceId) {
			selectObj["deviceId"] = {
				"exact": deviceId
			};
		}

		if (audio_stream == undefined) {
			return navigator.mediaDevices.getUserMedia({
				"audio": selectObj
			}).then(function(stream) {
				if (audio_context.state == 'suspended' && !force) {
					return Promise.reject();
				}
				success(stream);
			}, console.log);
		} else {
			return Promise.resolve();
		}
	}

	function stop() {
		if (audio_stream != undefined) {
			source["disconnect"](node);
			node["disconnect"](audio_context["destination"]);
			audio_stream["stop"] && audio_stream["stop"]();
			audio_stream = undefined;
		}
	}

	var last_power = 1;
	var agc_factor = 0.0001;

	function success(stream) {
		audio_stream = stream;
		source = audio_context["createMediaStreamSource"](stream);
		node = audio_context["createScriptProcessor"](1024, 1, 1);

		node["onaudioprocess"] = function(e) {
			// console.log(+new Date);
			var input = e["inputBuffer"]["getChannelData"](0);
			// var output = e["outputBuffer"]["getChannelData"](0);
			//AGC
			for (var i = 0; i < input.length; i++) {
				var power = input[i] * input[i];
				last_power = Math.max(0.0001, last_power + (power - last_power) * agc_factor);
				var gain = 1 / Math.sqrt(last_power);
				procSignal(input[i] * gain);
				// output[i] = input[i] * gain / 500;
			}
			return;
		};
		source["connect"](node);
		node["connect"](audio_context["destination"]);
	}

	//========== Audio2Bits Part ==========
	var lastVal = [];
	var lastSgn = 0;
	var THRESHOLD_SCHM = 0.2;
	var THRESHOLD_EDGE = 0.7;
	var lenVoltageKeep = 0;
	var distortionStat = 0;

	function procSignal(signal) {
		// signal = Math.max(Math.min(signal, 1), -1);
		// Schmidt trigger

		lastVal.unshift(signal);
		var isEdge = (lastVal.pop() - signal) * (lastSgn ? 1 : -1) > THRESHOLD_EDGE &&
			Math.abs(signal - (lastSgn ? 1 : -1)) - 1 > THRESHOLD_SCHM &&
			lenVoltageKeep > sample_rate * 0.6;

		if (isEdge) {
			for (var i = 0; i < Math.round(lenVoltageKeep / sample_rate); i++) {
				bitAnalyzer(lastSgn);
			}
			lastSgn ^= 1;
			lenVoltageKeep = 0;
		} else if (lenVoltageKeep > sample_rate * 2) {
			bitAnalyzer(lastSgn);
			lenVoltageKeep -= sample_rate;
		}
		lenVoltageKeep++;

		//note: signal power has already been normalized. So distortionStat will tends to zero ideally.
		if (last_bit_length < 10) {
			distortionStat = Math.max(0.0001, distortionStat + (Math.pow(signal - (lastSgn ? 1 : -1), 2) - distortionStat) * agc_factor);
		} else if (last_bit_length > 100) {
			distortionStat = 1;
		}
	}


	//========== Bits Analyzer ==========
	var bitBuffer = [];
	var byteBuffer = [];
	var idle_val = 0;
	var last_bit = 0;
	var last_bit_length = 0;
	var no_state_length = 0;

	function appendBit(bit) {
		bitBuffer.push(bit);
		if (bit != last_bit) {
			last_bit = bit;
			last_bit_length = 1;
		} else {
			last_bit_length++;
		}
		no_state_length++;
		if (last_bit_length > 10) { //IDLE
			idle_val = bit;
			// console.log(bitBuffer.length);
			bitBuffer = [];

			if (byteBuffer.length != 0) {
				// console.log(byteBuffer, idle_val);
				byteBuffer = [];
			}

			if (last_bit_length > 100 && stackmat_state.on) {
				stackmat_state.on = false;
				stackmat_state.noise = Math.min(1, distortionStat) || 0;
				stackmat_state.power = last_power;
				callback(stackmat_state);
				// console.log('off');
			} else if (no_state_length > 700) {
				no_state_length = 100;
				stackmat_state.noise = Math.min(1, distortionStat) || 0;
				stackmat_state.power = last_power;
				callback(stackmat_state);
			}
		} else if (bitBuffer.length == 10) {
			if (bitBuffer[0] == idle_val || bitBuffer[9] != idle_val) {
				bitBuffer = bitBuffer.slice(1);
			} else {
				var val = 0;
				for (var i = 8; i > 0; i--) {
					val = val << 1 | (bitBuffer[i] == idle_val ? 1 : 0);
				}
				byteBuffer.push(String.fromCharCode(val));
				decode(byteBuffer);
				bitBuffer = [];
			}
		}
	}

	function decode(byteBuffer) {
		if (byteBuffer.length != 9 && byteBuffer.length != 10) {
			return;
		}
		DEBUG && console.log('[stackmat]', byteBuffer);
		var re_head = /[ SILRCA]/;
		var re_number = /[0-9]/;
		var head = byteBuffer[0];
		if (!re_head.exec(head)) {
			return;
		}
		var checksum = 64;
		for (var i = 1; i < byteBuffer.length - 3; i++) {
			if (!re_number.exec(byteBuffer[i])) {
				return;
			}
			checksum += ~~(byteBuffer[i]);
		}
		if (checksum != byteBuffer[byteBuffer.length - 3].charCodeAt(0)) {
			return;
		}
		var time_milli = ~~byteBuffer[1] * 60000 +
			~~(byteBuffer[2] + byteBuffer[3]) * 1000 +
			~~(byteBuffer[4] + byteBuffer[5] + (byteBuffer.length == 10 ? byteBuffer[6] : '0'));
		pushNewState(head, time_milli, byteBuffer.length == 9 ? 10 : 1);
	}

	var last_suc_time = 0;

	function pushNewState(head, time_milli, unit) {
		var suc_time = $.now();
		if (suc_time - last_suc_time > 200) {
			DEBUG && console.log('[stackmat] signal miss ', suc_time - last_suc_time);
		}
		last_suc_time = suc_time;
		var new_state = {}
		new_state.time_milli = time_milli;
		new_state.unit = unit;
		new_state.on = true;
		if (!kernel.getProp('stkHead')) {
			head = 'S';
		}
		var is_time_inc = unit == stackmat_state.unit ?
			new_state.time_milli > stackmat_state.time_milli :
			Math.floor(new_state.time_milli / 10) > Math.floor(stackmat_state.time_milli / 10);
		new_state.greenLight = head == 'A';
		new_state.leftHand = head == 'L' || head == 'A' || head == 'C';
		new_state.rightHand = head == 'R' || head == 'A' || head == 'C';
		new_state.running = (head != 'S' || stackmat_state.signalHeader == 'S') &&
			(head == ' ' || is_time_inc);
		new_state.signalHeader = head;
		new_state.unknownRunning = !stackmat_state.on;
		new_state.noise = Math.min(1, distortionStat) || 0;
		new_state.power = last_power;

		stackmat_state = new_state;

		no_state_length = 0;
		callback(stackmat_state);
	}

	function appendBitMoyu(bit) {
		if (last_bit != idle_val && last_bit_length == 1) {
			bitBuffer.push(bit);
			if (bitBuffer.length == 24) {
				var time_milli = 0;
				for (var i = 5; i >= 0; i--) {
					time_milli *= 10;
					for (var j = 0; j < 4; j++) {
						time_milli += bitBuffer[i * 4 + j] << j;
					}
				}
				bitBuffer = [];
				pushNewState('S', time_milli, 1);
			}
		}
		if (bit != last_bit) {
			last_bit = bit;
			last_bit_length = 1;
		} else {
			last_bit_length++;
		}
		if (last_bit_length > 10) { //IDLE
			idle_val = bit;
			bitBuffer = [];
			byteBuffer = [];
			if (last_bit_length > 1000 && stackmat_state.on) {
				stackmat_state.on = false;
				stackmat_state.noise = Math.min(1, distortionStat) || 0;
				stackmat_state.power = last_power;
				callback(stackmat_state);
			} else if (last_bit_length > 4000) {
				last_bit_length = 1000;
				stackmat_state.noise = Math.min(1, distortionStat) || 0;
				stackmat_state.power = last_power;
				callback(stackmat_state);
			}
		}
	}

	var stackmat_state = {
		time_milli: 0,
		unit: 10,
		on: false,
		greenLight: false,
		leftHand: false,
		rightHand: false,
		running: false,
		unknownRunning: true,
		signalHeader: 'I',
		noise: 1,
		power: 1
	};

	var callback = $.noop;

	return {
		init: init,
		stop: stop,
		updateInputDevices: updateInputDevices,
		setCallBack: function(func) {
			callback = func;
		}
	}
});

execMain(function() {
	if (!window.nativeStackmat) {
		return;
	}
	stackmat = (function() {
		DEBUG && console.log('Use Native Stackmat');
		var callbackName = 'stackmat_callback_' + ~~(Math.random() * 10000000);
		var callback;
		nativeStackmat.setCallback(callbackName);
		window[callbackName] = function(obj) {
			DEBUG && console.log(JSON.stringify(obj));
			callback && callback(obj);
		}
		return {
			init: function() {
				nativeStackmat.init();
				return Promise.resolve();
			},
			stop: function() {
				nativeStackmat.stop();
				return Promise.resolve();
			},
			updateInputDevices: function() {
				return new Promise(function(resolve, reject) {
					resolve([[undefined, 'native']]);
				});
			},
			setCallBack: function(func) {
				callback = func;
			}
		}
	})();
});
