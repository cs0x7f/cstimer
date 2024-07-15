"use strict";

var csTimerWorker = execBoth(ISCSTIMER && function() {
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
	};

	//[realType, len, state]
	function getScramble(args, callback) {
		++msgid;
		callbacks[msgid] = callback;
		worker.postMessage([msgid, 'scramble', args]);
		return msgid;
	}

	worker.postMessage([0, 'set', ['SCRAMBLE_NOOBST', SCRAMBLE_NOOBST]]);
	worker.postMessage([0, 'set', ['SCRAMBLE_NOOBSS', SCRAMBLE_NOOBSS]]);

	return {
		getScramble: getScramble
	};
}, function() {
	self.kernel = {
		getProp: function(key, def) {
			return self[key] == undefined ? def : self[key];
		},
		setProp: function(key, value) {
			self[key] = value;
		}
	};
	var configs = {
		'colcube': '#ff0#fa0#00f#fff#f00#0d0',
		'colpyr': '#0f0#f00#00f#ff0',
		'colskb': '#fff#00f#f00#ff0#0f0#f80',
		'colmgm': '#fff#d00#060#81f#fc0#00b#ffb#8df#f83#7e0#f9f#999',
		'colsq1': '#ff0#f80#0f0#fff#f00#00f',
		'colclk': '#f00#37b#5cf#ff0#850',
		'col15p': '#f99#9f9#99f#fff',
		'colfto': '#fff#808#0d0#f00#00f#bbb#ff0#fa0',
		'colico': '#fff#084#b36#a85#088#811#e71#b9b#05a#ed1#888#6a3#e8b#a52#6cb#c10#fa0#536#49c#ec9'
	};
	for (var key in configs) {
		self.kernel.setProp(key, configs[key]);
	}
	var funcs = {
		getScrambleTypes: function() {
			var keys = [];
			for (var key in scrMgr.scramblers) {
				keys.push(key);
			}
			return keys;
		},
		getScramble: function() {
			var scrambler = scrMgr.scramblers[arguments[0]];
			var scramble = scrambler.apply(scrambler, arguments);
			if (!ISCSTIMER) {
				scramble = scrMgr.toTxt(scramble);
			}
			return scramble;
		},
		setSeed: function(seed) {
			mathlib.setSeed(256, seed.toString());
		},
		setGlobal: function(key, value) {
			self.kernel.setProp(key, value);
		},
		getImage: function(scramble, type) {
			var ret = image.draw([type || '333', scramble]);
			return ret && ret.render();
		}
	};
	self.onmessage = function(e) {
		var data = e.data;
		var msgid = data[0];
		var type = data[1];
		var details = data[2];
		var ret = undefined;
		switch (type) {
			case 'scrtype': // get scramble types
				ret = funcs.getScrambleTypes();
				break;
			case 'scramble': //generate scramble cache
				ret = funcs.getScramble.apply(null, details);
				break;
			case 'seed': // set seed
				funcs.setSeed(details[0]);
				break;
			case 'image': //generate scramble image
				ret = funcs.getImage.apply(null, details)
				break;
			case 'set': //set global values
				funcs.setGlobal.apply(null, details);
				break;
			default:
				break;
		}
		postMessage([msgid, type, ret]);
	};
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = funcs;
	}
});
