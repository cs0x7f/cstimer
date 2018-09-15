"use strict";

var tools = (function() {
	var curScramble = ['-', ''];
	var isEn = false;
	// var func = 'cross';

	var divs = [];

	function execFunc(idx, signal) {
		if (idx == -1) {
			for (var i=0; i<kernel.getProp('NTools'); i++) {
				execFunc(i, signal);
			}
			return;
		}
		if (!isEn) {
			for (var tool in toolBox) {
				toolBox[tool]();
			}
			fdivs[idx].empty();
			return;
		}

		for (var tool in toolBox) {
			if (tool == funcs[idx]) {
				toolBox[tool](fdivs[idx], signal);
			}
		}
	}

	function disableFunc(idx, signal) {
		for (var tool in toolBox) {
			if (tool == funcs[idx]) {
				toolBox[tool](undefined, signal);
			}
		}		
	}

	function scrambleType(scramble) {
		if (scramble.match(/^([\d]?[xyzFRUBLDfrubldSME]([w]|&sup[\d];)?[2']?\s*)+$/) == null) {
			return '-';
		} else if (scramble.match(/^([xyzFRU][2']?\s*)+$/)) {
			return '222o';
		} else if (scramble.match(/^([xyzFRUBLDSME][2']?\s*)+$/)) {
			return '333';
		} else if (scramble.match(/^(([xyzFRUBLDfru]|[FRU]w)[2']?\s*)+$/)) {
			return '444';
		} else if (scramble.match(/^(([xyzFRUBLDfrubld])[w]?[2']?\s*)+$/)) {
			return '555';
		} else {
			return '-'
		}
	}

	function puzzleType(scrambleType) {
		if (/^222(so|[236o]|eg[012]?)$/.exec(scrambleType)) {
			return "222";
		} else if (/^(333(oh?|ni|f[mt])?|(z[zb]|[cep]|cm|2g|ls)?ll|lse(mu)?|2genl?|3gen_[LF]|edges|corners|f2l|lsll2|zbls|roux|RrU|half|easyc|eoline)$/.exec(scrambleType)) {
			return "333";
		} else if (/^(444(o|wca|yj|bld)?|4edge|RrUu)$/.exec(scrambleType)) {
			return "444";
		} else if (/^(555(wca|bld)?|5edge)$/.exec(scrambleType)) {
			return "555";
		} else if (/^(666(si|[sp]|wca)?|6edge)$/.exec(scrambleType)) {
			return "666";
		} else if (/^(777(si|[sp]|wca)?|7edge)$/.exec(scrambleType)) {
			return "777";
		} else if (/^888$/.exec(scrambleType)) {
			return "888";
		} else if (/^999$/.exec(scrambleType)) {
			return "999";
		} else if (/^101010$/.exec(scrambleType)) {
			return "101010";
		} else if (/^111111$/.exec(scrambleType)) {
			return "111111";
		} else if (/^pyrs?[om]$/.exec(scrambleType)) {
			return "pyr";
		} else if (/^skb(so)?$/.exec(scrambleType)) {
			return "skb";
		} else if (/^sq(rs|1[ht])$/.exec(scrambleType)) {
			return "sq1";
		} else if (/^clk(wca|o)$/.exec(scrambleType)) {
			return "clk";
		} else if (/^mgmp$/.exec(scrambleType)) {
			return "mgm";
		}
	}

	var fdivs = [];
	var funcs = ['image', 'stats', 'cross'];
	var funcSelects = [];
	for (var i=0; i<4; i++) {
		fdivs[i] = $('<div />');
		funcSelects[i] = $('<select />');
		divs[i] = $('<div />');
	}
	// var fdiv = fdivs[0];
	// var funcSelect = funcSelects[0];

	function procSignal(signal, value) {
		if (signal == 'property') {
			// if (value[0] == 'toolsfunc') {
				// func = value[1];
			// }
			if (value[0] == 'imgSize') {
				for (var i=0; i<kernel.getProp('NTools'); i++) {
					if (funcs[i] == 'image') {
						execFunc(i, signal);
					}
				}
			} else if (value[0] == 'NTools') {
				for (var i=0; i<4; i++) {
					if (i<value[1]) {
						divs[i].show();
						if (fdivs[i].html() == '') {
							execFunc(i, signal);
						}
					} else {
						divs[i].hide();
						disableFunc(i, signal);
					}
				}
			}
		} else if (signal == 'scramble' || signal == 'scrambleX') {
			curScramble = value;
			execFunc(-1, signal);
		} else if (signal == 'button' && value[0] == 'tools') {
			isEn = value[1];
			if (!isEn) {
				execFunc(-1, signal);
				return;
			}
			for (var i=0; i<kernel.getProp('NTools'); i++) {
				if (isEn && fdivs[i].html() == '') {
					execFunc(i, signal);
				}
			}
		}
		// robot.procSignal(signal, value);
	}

	$(function() {
		kernel.regListener('tools', 'property', procSignal, /^(?:imgSize|image|toolsfunc|NTools)$/);
		kernel.regListener('tools', 'scramble', procSignal);
		kernel.regListener('tools', 'scrambleX', procSignal);
		kernel.regListener('tools', 'button', procSignal, /^tools$/);

		var mainDiv = $('<div id="toolsDiv"/>').appendTo('body');
		for (var i=0; i<4; i++) {
			funcSelects[i].change(changeSelect);
			divs[i].append(fdivs[i], "<br>", TOOLS_SELECTFUNC, funcSelects[i]).appendTo(mainDiv);
			if (i == 1) {
				mainDiv.append('<br>');
			}
		}

		kernel.regProp('tools', 'imgSize', 2, PROPERTY_IMGSIZE, [15, 5, 50]);
		kernel.regProp('tools', 'NTools', 2, PROPERTY_NTOOLS, [1, 1, 4]);
		var defaultFunc = JSON.stringify(['image', 'stats', 'cross', 'distribution']);
		var funcStr = kernel.getProp('toolsfunc', defaultFunc);
		if (funcStr.indexOf('[') == -1) {
			funcStr = defaultFunc.replace('image', funcStr);
			kernel.setProp('toolsfunc', funcStr);
		}
		funcs = JSON.parse(funcStr);
		kernel.addWindow('tools', BUTTON_TOOLS, mainDiv, false, true, 6);
	});

	/**
	 *	{name: function(fdiv, updateAll) , }
	 */
	var toolBox = {};

	function regTool(name, str, execFunc) {
		toolBox[name] = execFunc;
		for (var i=0; i<4; i++) {
			funcSelects[i].append($('<option />').val(name).html(str)).val(funcs[i]);
		}
	}

	function changeSelect() {
		kernel.blur();
		for (var i=0; i<4; i++) {
			var newVal = funcSelects[i].val();
			if (funcs[i] != newVal) {
				disableFunc(i, 'property');
				funcs[i] = newVal;
				kernel.setProp('toolsfunc', JSON.stringify(funcs));
				execFunc(i, 'property');
			}
		}
	}

	return {
		regTool: regTool,
		getCurScramble: function() {
			return curScramble;
		},
		scrambleType: scrambleType, 
		puzzleType: puzzleType
	}

})();
