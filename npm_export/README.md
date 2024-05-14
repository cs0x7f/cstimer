# csTimer module
The csTimer module is a function library that individually package some functions in csTimer.

Currently it only includes some of the scrambl functions supported by csTimer, and more functions will be supported later.

The csTimer module is part of csTimer and shares the same source code as csTimer: https://github.com/cs0x7f/cstimer

## Install

```bash
# install
npm i cstimer_module
```

## Usage

You can use these functions directly in nodejs, here is a simple example.

```javascript
var cstimer = require('cstimer_module');

// List all scramble types
console.log(cstimer.getScrambleTypes());

// Set seed of scramble generator. csTimer use a CSPRNG to generate scrambles. If not called, crypto.getRandomValues will be called if available, otherwise, current timestamp will be used to initialize the scramble generator.
// The seed should be a string, otherwise, Object.prototype.toString() will be called.
cstimer.setSeed("42");

// Generate random-state 3x3x3 scramble
var scrStr = cstimer.getScramble('333');
console.log(scrStr);

// Generate scramble image for previous scramble (in svg)
var scrImg = cstimer.getImage(scrStr, '333');
console.log(scrImg);

// Generate scrambles for all wca events, all supported scrambles can be found in https://github.com/cs0x7f/cstimer/blob/master/src/lang/en-us.js
var wca_events = [
	["3x3x3", "333", 0],
	["2x2x2", "222so", 0],
	["4x4x4", "444wca", 0],
	["5x5x5", "555wca", 60],
	["6x6x6", "666wca", 80],
	["7x7x7", "777wca", 100],
	["3x3 bld", "333ni", 0],
	["3x3 fm", "333fm", 0],
	["3x3 oh", "333", 0],
	["clock", "clkwca", 0],
	["megaminx", "mgmp", 70],
	["pyraminx", "pyrso", 10],
	["skewb", "skbso", 0],
	["sq1", "sqrs", 0],
	["4x4 bld", "444bld", 40],
	["5x5 bld", "555bld", 60],
	["3x3 mbld", "r3ni", 5]
];

for (var i = 0; i < wca_events.length; i++) {
	var param = wca_events[i];
	console.log('Generate scramble for ' + param[0]);
	scrStr = cstimer.getScramble(param[1] /*scramble type*/, param[2] /*scramble length*/);
	console.log('Generated: ', scrStr);
	console.log('Scramble image: ', cstimer.getImage(scrStr /*generated scramble*/, param[1] /*scramble type*/));
}
```

If you want to use it in browser, you can use it directly as a webworker and then call it asynchronously. A simple example is as follows.
```javascript
// Add the following code to introduce cstimer_module as a webworker. Thus, we will communicate with cstimer through message, and package this process into an asynchronous function.
var cstimerWorker = (function() {
	var worker = new Worker('cstimer_module.js');

	var callbacks = {};
	var msgid = 0;

	worker.onmessage = function(e) {
		var data = e.data; //data: [msgid, type, ret]
		var callback = callbacks[data[0]];
		delete callbacks[data[0]];
		callback && callback(data[2]);
	}

	function callWorkerAsync(type, details) {
		return new Promise(function(type, details, resolve) {
			++msgid;
			callbacks[msgid] = resolve;
			worker.postMessage([msgid, type, details]);
		}.bind(null, type, details));
	}

	return {
		getScrambleTypes: function() {
			return callWorkerAsync('scrtype');
		},
		getScramble: function() {
			return callWorkerAsync('scramble', Array.prototype.slice.apply(arguments));
		},
		setSeed: function(seed) {
			return callWorkerAsync('seed', [seed]);
		},
		setGlobal: function(key, value) {
			return callWorkerAsync('set', [key, value]);
		},
		getImage: function(scramble, type) {
			return callWorkerAsync('image', [scramble, type]);
		}
	}
})();



console.log('Generate scramble for 3x3x3');

var scrStr = "";
var queue = cstimerWorker.getScramble('333').then(function(_scrStr) {
	scrStr = _scrStr;
	console.log('Scramble generated: ', scrStr);
	return cstimerWorker.getImage(scrStr, '333');
}).then(function(svgImage) {
	console.log('Scramble image[0, 100): ', svgImage.slice(0, 100));
});

var wca_events = [
	["3x3x3", "333", 0],
	["2x2x2", "222so", 0],
	["4x4x4", "444wca", 0],
	["5x5x5", "555wca", 60],
	["6x6x6", "666wca", 80],
	["7x7x7", "777wca", 100],
	["3x3 bld", "333ni", 0],
	["3x3 fm", "333fm", 0],
	["3x3 oh", "333", 0],
	["clock", "clkwca", 0],
	["megaminx", "mgmp", 70],
	["pyraminx", "pyrso", 10],
	["skewb", "skbso", 0],
	["sq1", "sqrs", 0],
	["4x4 bld", "444bld", 40],
	["5x5 bld", "555bld", 60],
	["3x3 mbld", "r3ni", 5]
];

for (var i = 0; i < wca_events.length; i++) {
	var param = wca_events[i];
	queue = queue.then(function(type, length) {
		console.log('Generate scramble for ' + type);
		return cstimerWorker.getScramble(type, length);
	}.bind(null, param[1], param[2])).then(function(type, scrStr) {
		console.log('Generated: ', scrStr);
		return cstimerWorker.getImage(scrStr, type);
	}.bind(null, param[1])).then(function(imageSvg) {
		console.log('Scramble image[0, 100): ', imageSvg && imageSvg.slice(0, 100));
	});
}

```
