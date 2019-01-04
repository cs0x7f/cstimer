# Using cstimer.js as scramble provider webworker

[cstimer.js](https://cstimer.net/js/cstimer.js) can also work as a scramble-provider webworker. Here is a simple demo.
I recommend you to deploy the js file on your own server instead of directly linking from cstimer for avoiding affecting the service of cstimer. 

```javascript

//initialize the scramble provider worker
var cstimerScrambler = (function() {
	if (!window.Worker) { // not available due to browser capability
		return {};
	}
	var worker = new Worker('cstimer.js');
	var callbacks = {};
	var msgid = 0;

	worker.onmessage = function(e) {
		//data: [msgid, type, ret]
		var data = e.data;
		var callback = callbacks[data[0]];
		delete callbacks[data[0]];
		callback && callback(data[2]);
	}

	//[type, length, state]
	function getScramble(args, callback) {
		++msgid;
		callbacks[msgid] = callback;
		worker.postMessage([msgid, 'scramble', args]);
		return msgid;
	}

	return {
		getScramble: getScramble
	}
})();

// cstimerScrambler.getScramble(scrambleArgs, callback);
// scrambleArgs: [scramble type, scramble length (can be ignored for some scramble types), specific state (for oll, pll, etc) or undefined]
// callback: callback function with one parameter, which is the generated scramble.

// Example
cstimerScrambler.getScramble(['333'], function(scramble) {
	console.log(scramble); //should return a 3x3x3 random state scramble
});

cstimerScrambler.getScramble(['444wca'], function(scramble) {
	console.log(scramble); //this will take several seconds
});

cstimerScrambler.getScramble(['555wca', 60], function(scramble) {
	console.log(scramble); //In this example, scramble length is required.
});

// Type    Description
// 333     3x3x3 random state scramble
// 222so   2x2x2 random state scramble with wca restriction
// 444wca  4x4x4 random state scramble, WCA Notation
// 555wca  5x5x5 random move scramble, WCA Notation
// 666wca  6x6x6 random move scramble, WCA Notation
// 777wca  7x7x7 random move scramble, WCA Notation
// 333ni   3x3x3 random move scramble with random orientation
// clkwca  clock random state scramble, wca notation
// mgmp    megaminx random move scramble, wca notation
// pyrso   pyraminx random state scramble with wca restriction
// skbso   skewb random state scramble with wca restriction
// 444bld  4x4x4 random state scramble with random orientation, WCA Notation
// 555bld  5x5x5 random move scramble with random orientation, WCA Notation
// r3ni    multiple 3x3x3 random state scramble with random orientation, use length to indicate number of cubes.

```
