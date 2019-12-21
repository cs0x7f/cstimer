"use strict";

execMain(function() {

	var seedSpan = $('<span>').html('Disabled');
	var seedInput = $('<input type="button">').val('Input Seed');
	var seedButton = $('<input type="button">').val('Use 30s Seed');

	var seedMode = false;
	var rawSeed;
	var prevWorker;
	var hackedData = {};

	function inputSeed() {
		var val = prompt('Input a value (a-zA-Z0-9) as seed');
		kernel.blur();
		if (val == null) {
			return;
		}
		if (!/^[a-zA-Z0-9]+$/.exec(val)) {
			logohint.push('Invalid Value');
			return;
		}
		setSeed(val);
	}

	function setSeed(seed) {
		seedMode = true;
		rawSeed = rawSeed || mathlib.getSeed();
		mathlib.setSeed(0, 'syncseed' + seed);
		scramble.setCacheEnable(false);
		seedSpan.html(seed).addClass('click');
		kernel.pushSignal('ctrl', ['scramble', 'next']);
	}

	function clearSeed() {
		if (!seedMode) {
			return;
		}
		seedMode = false;
		mathlib.setSeed(0, rawSeed[1] + '' + rawSeed[0]);
		scramble.setCacheEnable(true);
		kernel.pushSignal('ctrl', ['scramble', 'next']);
	}

	function clearSeedClick() {
		if (seedMode && confirm('Disable current seed?')) {
			clearSeed();
			seedSpan.html('Disabled').unbind('click').removeClass('click');
		}
	}

	function timeSeedClick() {
		setSeed('' + ~~(new Date().getTime() / 1000 / 30));
		kernel.blur();
	}

	function execFunc(fdiv) {
		if (!fdiv) {
			return;
		}
		fdiv.empty().append('Seed: ', seedSpan.unbind('click').click(clearSeedClick), '<br><br>')
			.append(seedInput.unbind('click').click(inputSeed),
				'<br>', seedButton.unbind('click').click(timeSeedClick));
	}

	$(function() {
		tools.regTool('syncseed', 'Seed Mode', execFunc);
	});
});