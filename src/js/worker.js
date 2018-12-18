"use strict";

var csTimerWorker = execBoth(function() {
	if (!window.Worker) {
		return {};
	}
	var worker = new Worker('js/cstimer.js');
	var callbacks = {};
	var msgid = 0;

	worker.onmessage = function(e) {
		//data: [msgid, type, ret]
		var data = e.data;
		var callback = callbacks[data[0]];
		delete callbacks[data[0]];
		callback && callback(data[2]);
	}

	//[realType, len, state]
	function getScramble(args, callback) {
		++msgid;
		callbacks[msgid] = callback;
		worker.postMessage([msgid, 'scramble', args]);
		return msgid;
	}

	return {
		getScramble: getScramble
	}
}, function() {
	self.onmessage = function(e) {
		var data = e.data;
		var msgid = data[0];
		var type = data[1];
		var details = data[2];
		var ret = undefined;
		switch (type) {
			case 'scramble': //TODO
				var scrambler = scramble.scramblers[details[0]];
				ret = scrambler.apply(scrambler, details);
				break;
			default:
				break;
		}
		postMessage([msgid, type, ret]);
	}
});