"use strict";

var shortcuts= execMain(function(){
	
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
		51: [['stats', 'DNF'], 'ctrl']//3	
	}

	var ctrlAltMap = {
		84: [['input', 't']], //t
		73: [['input', 'i']], //i
		83: [['input', 's']], //s
		77: [['input', 'm']], //m
		86: [['input', 'v']], //v
		71: [['input', 'g']] //g
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
		if (action != undefined) {
			if (action[1] == undefined) {
				kernel.setProp(action[0][0], action[0][1]);
			} else {
				kernel.pushSignal(action[1], action[0]);
			}
			kernel.clrKey();
			kernel.blur();
		}
	}
	
	$(function() {
		kernel.regListener('shortcut', 'keydown', onkeydown);
		kernel.regProp('tools', 'useKSC', 0, PROPERTY_USEKSC, [true]);
	});
});
