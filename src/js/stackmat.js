"use strict";

var stackmat = (function() {

	//========== Hardware Part ==========
	var audio_context;
	var audio_stream, source, node;
	var sample_rate;

	function init() {
		var getUserMedia = (window.navigator["getUserMedia"] ||
			window.navigator["webkitGetUserMedia"] ||
			window.navigator["mozGetUserMedia"] ||
			window.navigator["msGetUserMedia"]);

		var AudioContext = (window["AudioContext"] || window["webkitAudioContext"]);

		audio_context = new AudioContext();

		sample_rate = audio_context["sampleRate"] / 1200;

		edgeIdxDiff = Math.ceil(sample_rate / 6);
		lastVal.length = edgeIdxDiff;
		edgeIdxCur = 0;

		getUserMedia.call(window.navigator, {
			"audio": {"optional": [{"echoCancellation": false}]}
		}, success, $.noop);
	}

	function stop() {
		if (audio_stream != undefined) {
			source["disconnect"](node);
			node["disconnect"](audio_context["destination"]);
			audio_stream["stop"]();
			audio_stream = undefined;
		}
	}

	var pwr_list = [0,0,0,0,0,0,0,0,0];
	var last_gain = 1;

	function success(stream) {
		audio_stream = stream;
		source = audio_context["createMediaStreamSource"](stream);
		node = audio_context["createScriptProcessor"](1024, 1, 1);

		node["onaudioprocess"] = function(e) {
			// console.log(+new Date);
			var input = e["inputBuffer"]["getChannelData"](0);
			var output = e["outputBuffer"]["getChannelData"](0);
			//AGC
			var power = 0;
			for (var i=0; i<input.length; i++) {
				power += input[i] * input[i];
			}
			power = Math.sqrt(power / input.length);
			pwr_list.push(power);
			var sum = 0;
			for (var i=0; i<pwr_list.length; i++) {
				sum += pwr_list[i];
			}
			sum /= pwr_list.length;
			var fix = Math.min(100, 1 / sum);

			var cur_gain = Math.min(last_gain * 0.8 + fix * 0.2, fix);

			for (var i = 0; i < input.length; i++) {
				// output[i] = input[i] * (cur_gain + (last_gain - cur_gain) * (i / input.length)) / 500;
				procSignal(input[i] * (last_gain + (cur_gain - last_gain) * (i / input.length)));
			}
			last_gain = cur_gain;
			// console.log(cur_gain);
			pwr_list = pwr_list.slice(1);
			return;
		};
		source["connect"](node);
		node["connect"](audio_context["destination"]);
	}

	//========== Audio2Bits Part ==========
	var lastVal = [];
	var lastSgn = 0;
	var edgeIdxDiff = 0;
	var edgeIdxCur = 0;
	var THRESHOLD_SCHM = 0.2;
	var THRESHOLD_EDGE = 0.7;
	var lenVoltageKeep = 0;

	function procSignal(signal) {
		// signal = Math.max(Math.min(signal, 1), -1);
		// Schmidt trigger

		var isEdge = Math.abs(lastVal[edgeIdxCur] - signal) > THRESHOLD_EDGE;
		lastVal[edgeIdxCur] = signal;
		edgeIdxCur = (edgeIdxCur + 1) % edgeIdxDiff;

		var diff = Math.abs(signal - (lastSgn ? 1 : -1)) - 1;
		if (isEdge && diff > THRESHOLD_SCHM && lenVoltageKeep > sample_rate * 0.6) {
			for (var i=0; i<Math.round(lenVoltageKeep/sample_rate); i++) {
				appendBit(lastSgn);
			}
			lastSgn ^= 1;
			lenVoltageKeep = 0;
		} else if (lenVoltageKeep > sample_rate * 6) {
			for (var i=0; i<5; i++) {
				appendBit(lastSgn);
			}
			lenVoltageKeep -= sample_rate * 5;
		}

		lenVoltageKeep++;
	}


	//========== Bits Analyzer ==========
	var bitBuffer = [];
	var byteBuffer = [];
	var idle_val = 0;
	var last_bit = 0;
	var last_bit_length = 0;

	function appendBit(bit) {
		bitBuffer.push(bit);
		if (bit != last_bit) {
			last_bit = bit;
			last_bit_length = 1;
		} else {
			last_bit_length++;
		}
		if (last_bit_length > 10) {	//IDLE
			idle_val = bit;
			// console.log(bitBuffer.length);
			bitBuffer = [];

			if (byteBuffer.length != 0) {
				// console.log(byteBuffer, idle_val);
				byteBuffer = [];
			}

			if (last_bit_length > 100 && stackmat_state.on) {
				stackmat_state.on = false;
				callback(stackmat_state);
				// console.log('off');
			} else if (last_bit_length > 700) {
				last_bit_length = 100;
				callback(stackmat_state);
			}
		} else {
			if (bitBuffer.length == 10) {
				if (bitBuffer[0] == idle_val || bitBuffer[9] != idle_val) {
					bitBuffer = bitBuffer.slice(1);
				} else {
					var val = 0;
					for (var i=8; i>0; i--) {
						val = val << 1 | (bitBuffer[i] == idle_val ? 1 : 0);
					}
					byteBuffer.push(String.fromCharCode(val));
					decode(byteBuffer);
					bitBuffer = [];
				}
			}
		}
	}

	var last_suc_time = 0;

	function decode(byteBuffer) {
		if (byteBuffer.length != 9 && byteBuffer.length != 10) {
			return;
		}
		var re_head = /[ SILRCA]/;
		var re_number = /\d/;
		var head = byteBuffer[0];
		if (!re_head.exec(head)) {
			return;
		}
		var time_milli = 0;
		var checksum = 64;
		if (byteBuffer.length == 9) {
			for (var i=1; i<6; i++) {
				if (!re_number.exec(byteBuffer[i])) {
					return;
				}
				checksum += ~~(byteBuffer[i]);
			}
			if (checksum != byteBuffer[6].charCodeAt(0)) {
				return;
			}
			time_milli = ~~byteBuffer[1] * 60000 + ~~(byteBuffer[2] + byteBuffer[3]) * 1000 + ~~(byteBuffer[4] + byteBuffer[5]) * 10;
		} else if (byteBuffer.length == 10) {
			for (var i=1; i<7; i++) {
				if (!re_number.exec(byteBuffer[i])) {
					return;
				}
				checksum += ~~(byteBuffer[i]);
			}
			if (checksum != byteBuffer[7].charCodeAt(0)) {
				return;
			}
			time_milli = ~~byteBuffer[1] * 60000 + ~~(byteBuffer[2] + byteBuffer[3]) * 1000 + ~~(byteBuffer[4] + byteBuffer[5] + byteBuffer[6]);
		}
		var suc_time = $.now();
		if (suc_time - last_suc_time > 200) {
			console.log(suc_time - last_suc_time);
		}
		last_suc_time = suc_time;
		var new_state = {}
		new_state.time_milli = time_milli;
		new_state.on = true;
		new_state.greenLight = head == 'A';
		new_state.leftHand = head == 'L' || head == 'A' || head == 'C';
		new_state.rightHand = head == 'R' || head == 'A' || head == 'C';
		new_state.running = (head != 'S' || stackmat_state.signalHeader == 'S') 
			&& (head == ' ' || new_state.time_milli > stackmat_state.time_milli);
		new_state.signalHeader = head;
		new_state.unknownRunning = !stackmat_state.on;

		stackmat_state = new_state;

		callback(stackmat_state);
	}

	var stackmat_state = {
		time_milli: 0,
		on: false,
		greenLight: false,
		leftHand: false, 
		rightHand: false,
		running: false,
		unknownRunning: true,
		signalHeader: 'I'
	};

	var callback = $.noop;

	return {
		init: init,
		stop: stop, 
		setCallBack: function(func) {
			callback = func;
		}
	}
})();


