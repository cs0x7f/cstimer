"use strict";

execMain(function() {

	var seedSpan = $('<span>').html('N/A');
	var helpSpan = $('<span class="click">').html('[?]');
	var seedInput = $('<input type="button">').val(TOOLS_SYNCSEED_INPUT);
	var seedButton = $('<input type="button">').val(TOOLS_SYNCSEED_30S);

	var seedMode = false;
	var rawSeed;
	var prevWorker;
	var hackedData = {};

	function inputSeed() {
		var val = prompt(TOOLS_SYNCSEED_INPUTA);
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
		rawSeed = undefined;
		scramble.setCacheEnable(true);
		kernel.pushSignal('ctrl', ['scramble', 'next']);
	}

	function clearSeedClick() {
		if (seedMode && confirm(TOOLS_SYNCSEED_DISABLE)) {
			clearSeed();
			seedSpan.html('N/A').unbind('click').removeClass('click');
		}
	}

	function timeSeedClick() {
		setSeed('' + ~~(new Date().getTime() / 1000 / 30));
		kernel.blur();
	}

	function clickHelp() {
		alert(TOOLS_SYNCSEED_HELP);
	}

	function execFunc(fdiv) {
		if (!fdiv) {
			return;
		}
		fdiv.empty().append(TOOLS_SYNCSEED_SEED, helpSpan.unbind('click').click(clickHelp), ': ', seedSpan.unbind('click').click(clearSeedClick))
			.append('<br><br>', seedInput.unbind('click').click(inputSeed))
			.append('<br>', seedButton.unbind('click').click(timeSeedClick));
	}

	$(function() {
		tools.regTool('syncseed', TOOLS_SYNCSEED, execFunc);
	});
});