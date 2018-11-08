"use strict";

var metronome = (function() {

	var context;

	var button = $('<span />').addClass('click').html('Start!');
	var bpmInput = $('<input type="range" value="60" min="10" max="360" />');
	var volInput = $('<input type="range" value="30" min="0" max="100" />');
	var bgmOutput = $('<span />').addClass('click').html(' 60');
	var vol;

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
		fdiv.empty().append("BPM: ", bpmInput, bgmOutput, '<br />', 'Vol: ', volInput, '<br />', button);

		bpmInput.unbind().on("input", function() {
			bgmOutput.html(format(bpmInput.val()));
			playAudio();
		});
		volInput.unbind().on("input", function() {
			vol.gain.value = volInput.val() / 100.0;
		});
		button.html('Start!');
		button.unbind().click(function() {
			button.html(isEnable ? 'Start!' : 'Stop!');
			isEnable = !isEnable;
			playAudio();
		});
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

	function playTick() {
		var osc = context.createOscillator();
		osc.type = 'sine';
		osc.frequency.value = 440;
		osc.connect(vol);
		osc.start(context.currentTime);
		osc.stop(context.currentTime + 0.1);
	}

	$(function() {
		var AudioContext = (window["AudioContext"] || window["webkitAudioContext"]);
		if (AudioContext !== undefined) {
			context = new AudioContext();
			vol = context.createGain()
			vol.gain.value = 0.3;
			vol.connect(context.destination);
			tools.regTool('mtrnm', TOOLS_METRONOME, execFunc);
		}
	});

	return {
		playTick: playTick
	}
})();