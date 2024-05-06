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

```javascript
var cstimer = require('cstimer_module');

// List all scramble types
console.log(cstimer.getScrambleTypes());

// Set seed of scramble generator. csTimer use a CSPRNG to generate scrambles. If not called, crypto.getRandomValues will be called if available, otherwise, current timestamp will be used to initialize the scramble generator.
// The seed should be a string, otherwise, Object.prototype.toString() will be called.
cstimer.setSeed("42");

// Generate random-state 3x3x3 scramble
console.log(cstimer.getScramble('333'));

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
	console.log(param[0] + ': ', cstimer.getScramble(param[1] /*scramble type*/, param[2] /*scramble length*/));
}
```
