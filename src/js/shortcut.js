"use strict";

var shortcuts = execMain(function(){
	
	/**
	 * {keycode: [value, signal]}
	 */
	var altMap = {
		49: [['scrType', 'sqrs']],//1
		50: [['scrType', '222so']],//2
		51: [['scrType', '333']],//3
		52: [['scrType', '444wca']],//4
		53: [['scrType', '555wca']],//5
		54: [['scrType', '666wca']],//6
		55: [['scrType', '777wca']],//7
		67: [['scrType', 'clkwca']],//c
		77: [['scrType', 'mgmp']],//m
		80: [['scrType', 'pyrso']],//p
		83: [['scrType', 'skbso']],//s
		73: [['scrType', 'input']],//i

		37: [['scramble', 'last'], 'ctrl'],//left
		39: [['scramble', 'next'], 'ctrl'],//right

		38: [['stats', '-'], 'ctrl'],//up
		40: [['stats', '+'], 'ctrl'],//down
		68: [['stats', 'clr'], 'ctrl'],//d
		90: [['stats', 'undo'], 'ctrl']//z
	}

	var ctrlMap = {
		49: [['stats', 'OK'], 'ctrl'],//1
		50: [['stats', '+2'], 'ctrl'],//2
		51: [['stats', 'DNF'], 'ctrl'],//3	
		90: [['stats', 'undo'], 'ctrl'],//z
	}

	var ctrlAltMap = {
		84: [['input', 't']], //timer
		73: [['input', 'i']], //input
		83: [['input', 's']], //stackmat
		77: [['input', 'm']], //moyu
		86: [['input', 'v']], //virtual
		71: [['input', 'g']], //smart cube
		81: [['input', 'q']], //qcube
		66: [['input', 'b']], //bluetooth timer
		76: [['input', 'l']]  //last layer
	}

	function onkeydown(signal, e) {
		if (!kernel.getProp('useKSC')) {
			return;
		}
		var action;
		if (e.altKey && e.ctrlKey) {
			action = ctrlAltMap[e.which];
		} else if (e.altKey) {
			action = altMap[e.which];
		} else if (e.ctrlKey) {
			action = ctrlMap[e.which];
		}
		performAction(action);
	}

	function performAction(action) {
		if (!action) {
			return;
		}
		if (action[1] == undefined) {
			kernel.setProp(action[0][0], action[0][1]);
		} else {
			kernel.pushSignal(action[1], action[0]);
		}
		kernel.clrKey();
		kernel.blur();
	}

	var longTouchTid = 0;
	var touchPoint = null;
	var hitGesture = -1;

	function getOffXY(e) {
		var offX = e.pageX;
		var offY = e.pageY;
		if (e.type.startsWith('touch')) {
			var ep = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
			offX = ep.pageX;
			offY = ep.pageY;
		}
		return [offX, offY]
	}

	function onTouchStart(e) {
		DEBUG && console.log('[shortcut] touch start', e);
		clearLongTouch();
		longTouchTid = setTimeout(longTouchCallback, 2000);
		if (timer.status() != -1 || !kernel.getProp('useGES')) {
			return;
		}
		touchPoint = getOffXY(e);
		astDiv && astDiv.css({
			'left': touchPoint[0],
			'top': touchPoint[1],
			'opacity': 0.0
		}).show();
	}

	function onTouchEnd(e) {
		DEBUG && console.log('[shortcut] touch end', e);
		clearLongTouch();
		astDiv && astDiv.hide();
		if (hitGesture != -1) {
			touchElem[hitGesture].removeClass('hit');
			timer.softESC();
			Promise.resolve().then(performAction.bind(null, gestures[hitGesture]));
		}
		touchPoint = null;
		hitGesture = -1;
	}

	function onTouchMove(e) {
		DEBUG && console.log('[shortcut] touch move', e);
		if (!touchPoint) {
			return;
		}
		var movePoint = getOffXY(e);
		var moveDis = Math.hypot(movePoint[0] - touchPoint[0], movePoint[1] - touchPoint[1]);
		if (hitGesture != -1) {
			touchElem[hitGesture].removeClass('hit');
		}
		if (moveDis <= touchElem[0].width()) {
			hitGesture = -1;
			astDiv && astDiv.css('opacity', moveDis / touchElem[0].width());
		} else {
			var theta = -Math.atan2(movePoint[1] - touchPoint[1], movePoint[0] - touchPoint[0]);
			hitGesture = Math.floor(theta / Math.PI * 4 + 8.5) % 8;
			astDiv && astDiv.css('opacity', 1);
			touchElem[hitGesture].addClass('hit');
			timer.softESC();
		}
	}

	function clearLongTouch() {
		longTouchTid && clearTimeout(longTouchTid);
	}

	function longTouchCallback() {
		//todo
		DEBUG && console.log('[shortcut] long touch callback');
		clearLongTouch();
		timer.onkeydown({which: 28});
	}

	var gestures = [
		[['scramble', 'next'], 'ctrl', '->'],
		[['stats', 'OK'], 'ctrl', 'OK'],
		[['stats', '+2'], 'ctrl', '+2'],
		[['stats', 'DNF'], 'ctrl', 'DNF'],
		[['scramble', 'last'], 'ctrl', '<-'],
		[['stats', 'cmt'], 'ctrl', '*'],
		[['stats', 'undo'], 'ctrl', '\u232b'],
		[['stats', 'cfm'], 'ctrl', '\u2315']
	];
	var touchElem = [];
	var astDiv;

	$(function() {
		kernel.regListener('shortcut', 'keydown', onkeydown);
		kernel.regProp('tools', 'useKSC', 0, PROPERTY_USEKSC, [true]);
		kernel.regProp('tools', 'useGES', 0, PROPERTY_USEGES, [true]);
		astDiv = $('<div id="astouch">').appendTo('body');
		var r = 1.5 / Math.sin(Math.PI / 8);
		for (var i = 0; i < 8; i++) {
			touchElem[i] = touchElem[i] || $('<span class="astouch"/>').appendTo(astDiv);
			touchElem[i].css({
				'left': r * Math.cos(i * Math.PI / 4) + 'em',
				'top': -r * Math.sin(i * Math.PI / 4) + 'em'
			}).text(gestures[i][2]);
		}
	});

	return {
		onTouchStart: onTouchStart,
		onTouchMove: onTouchMove,
		onTouchEnd: onTouchEnd
	}
});
