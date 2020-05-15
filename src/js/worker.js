"use strict";

var csTimerWorker = execBoth(() => {
	if (!window.Worker) return {};
	var worker = new Worker('js/cstimer.js');
	var callbacks = {};
	var msgid = 0;

	worker.onmessage = (e) => {
		//data: [msgid, type, ret]
		var data = e.data;
		var callback = callbacks[data[0]];
		delete callbacks[data[0]];
		callback && callback(data[2]);
	};

	//[realType, len, state]
	let getScramble = (args, callback) => {
		++msgid;
		callbacks[msgid] = callback;
		worker.postMessage([msgid, 'scramble', args]);
		return msgid;
	}

	worker.postMessage([0, 'set', ['SCRAMBLE_NOOBST', SCRAMBLE_NOOBST]]);
	worker.postMessage([0, 'set', ['SCRAMBLE_NOOBSS', SCRAMBLE_NOOBSS]]);

	return {
		getScramble
	};
}, function() {
	self.onmessage = (e) => {
		var data = e.data;
		var msgid = data[0];
		var type = data[1];
		var details = data[2];
		var ret = undefined;
		switch (type) {
			case 'scramble': //generate scramble cache
				var scrambler = scrMgr.scramblers[details[0]];
				ret = scrambler.apply(scrambler, details);
				break;
			case 'set': //set global values
				self[details[0]] = details[1];
				break;
			default:
				break;
		}
		postMessage([msgid, type, ret]);
	};
});
