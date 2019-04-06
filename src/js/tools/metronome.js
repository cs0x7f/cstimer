"use strict";

var metronome = execMain(function() {

	var context;

	var button = $('<span style="display:inline-block; text-align:center; width:100%;"/>').addClass('click');
	var bpmInput = $('<input type="range" value="60" min="10" max="360" style="width:7em;" />');
	var volInput = $('<input type="range" value="30" min="0" max="100" style="width:7em;" />');
	var bgmOutput = $('<span />').html(' 60');
	var volOutput = $('<span />').html(' 30');
	var vol;

	var beepInput = $('<input type="text" style="width:7em;" />');
	var beepButton = $('<input type="checkbox" />');

	var isEnable = false;

	function format(val) {
		return val > 99 ? val : ' ' + val;
	}

	function execFunc(fdiv) {
		if (!fdiv) {
			stopAudio();
			isEnable = false;
			return;
		}
		fdiv.empty().append("BPM: ", bpmInput, bgmOutput, '<br />')
			.append('Vol: ', volInput, volOutput, '<br />', button, '<br />')
			.append('<br />', $('<label>').append(beepButton, '<span class="click"> Beep at</span>'), '<br />', beepInput);

		bpmInput.unbind().on("input", function() {
			bgmOutput.html(format(bpmInput.val()));
			playAudio();
		});
		volInput.unbind().on("input", function() {
			volOutput.html(format(volInput.val()));
			vol.gain.value = volInput.val() / 100.0;
		});
		button.html(isEnable ? 'Stop!' : 'Start!');
		button.unbind().click(function() {
			isEnable = !isEnable;
			button.html(isEnable ? 'Stop!' : 'Start!');
			playAudio();
		});

		initBeep();
	}

	function initBeep() {
		beepButton.unbind('change').change(beepChange).prop('checked', kernel.getProp('beepEn'));
		beepInput.unbind('change').change(beepChange).val(kernel.getProp('beepAt'));
		beepChange();
	}

	var playId = null;

	function stopAudio() {
		if (playId != null) {
			clearInterval(playId);
			playId = null;
		}
	}

	function playAudio() {
		stopAudio();
		if (isEnable) {
			var interval = 60000 / (~~bpmInput.val());
			playId = setInterval(playTick, interval);
		}
	}

	function playTick(freq) {
		var osc = context.createOscillator();
		osc.type = 'sine';
		osc.frequency.value = freq || 440;
		osc.connect(vol);
		osc.start(context.currentTime);
		osc.stop(context.currentTime + 0.1);
	}

	var beepId = null;
	var beepTimes = [];
	var beepIdx = 0;

	function beepChange() {
		if (!beepButton.prop('checked')) {
			stopBeep();
		} else {
			startBeep(beepInput.val());
		}
		kernel.setProp('beepEn', beepButton.prop('checked'))
		kernel.blur();
	}

	function startBeep(times) {
		stopBeep();
		times = times.split(',');
		for (var i = 0; i < times.length; i++) {
			times[i] = ~~(times[i].trim() * 1000) / 1000.0;
		}
		times = times.filter(Number);
		times.sort(function(a, b) {
			return a - b
		});
		beepTimes = times;
		beepInput.val(times.join(','));
		kernel.setProp('beepAt', times.join(','));
		beepId = setInterval(beepLoop, 100);
	}

	function stopBeep() {
		if (beepId != null) {
			clearInterval(beepId);
			beepId = null;
		}
	}

	function beepLoop() {
		var curTime = ~~timer.getCurTime() / 1000.0;
		if (curTime == 0) {
			beepIdx = 0;
			return;
		}
		var doBeep = false;
		while (beepIdx < beepTimes.length && curTime > beepTimes[beepIdx] - 0.05) {
			++beepIdx;
			doBeep = true;
		}
		if (doBeep) {
			playTick(550);
		}
	}

	$(function() {
		kernel.regProp('tools', 'beepEn', ~5, 'Beep Enable', [false]);
		kernel.regProp('tools', 'beepAt', ~5, 'Beep At', ['5,10,15,20']);
		var AudioContext = (window["AudioContext"] || window["webkitAudioContext"]);
		if (AudioContext !== undefined) {
			context = new AudioContext();
			vol = context.createGain()
			vol.gain.value = 0.3;
			vol.connect(context.destination);
			tools.regTool('mtrnm', TOOLS_METRONOME, execFunc);
		}
		initBeep();
	});

	return {
		playTick: playTick
	}
});