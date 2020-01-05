"use strict";

var tools = execMain(function() {
	var curScramble = ['-', '', 0];
	var isEn = false;

	var divs = [];

	function execFunc(idx, signal) {
		if (idx == -1) {
			for (var i = 0; i < kernel.getProp('NTools'); i++) {
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
			return '-';
		}
	}

	function isPuzzle(puzzle, scramble) {
		scramble = scramble || curScramble;
		var scrPuzzle = puzzleType(scramble[0]);
		scramble = scramble[1];
		if (scrPuzzle) {
			return scrPuzzle == puzzle;
		} else if (puzzle == '222') {
			return scramble.match(/^([xyzFRU][2']?\s*)+$/);
		} else if (puzzle == '333') {
			return scramble.match(/^([xyzFRUBLDSME][2']?\s*)+$/);
		} else if (puzzle == '444') {
			return scramble.match(/^(([xyzFRUBLDfru]|[FRU]w)[2']?\s*)+$/);
		} else if (puzzle == '555') {
			return scramble.match(/^(([xyzFRUBLDfrubld])[w]?[2']?\s*)+$/);
		} else if (puzzle == 'skb') {
			return scramble.match(/^([RLUB]'?\s*)+$/);
		} else if (puzzle == 'pyr') {
			return scramble.match(/^([RLUBrlub]'?\s*)+$/);
		} else if (puzzle == 'sq1') {
			return scramble.match(/^$/);
		}
		return false;
	}

	function puzzleType(scrambleType) {
		if (/^222(so|[236o]|eg[012]?|nb)$/.exec(scrambleType)) {
			return "222";
		} else if (/^(333(oh?|ni|f[mt])?|(z[zb]|[coep]|cm|2g|ls)?ll|lse(mu)?|2genl?|3gen_[LF]|edges|corners|f2l|lsll2|zbls|roux|RrU|half|easyc|eoline)$/.exec(scrambleType)) {
			return "333";
		} else if (/^(444([mo]|wca|yj|bld)?|4edge|RrUu)$/.exec(scrambleType)) {
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
		} else if (/^cubennn$/.exec(scrambleType)) {
			return "cubennn";
		} else if (/^pyr(s?[om]|l4e|nb|4c)$/.exec(scrambleType)) {
			return "pyr";
		} else if (/^skb(s?o|nb)?$/.exec(scrambleType)) {
			return "skb";
		} else if (/^sq(rs|1[ht]|rcsp)$/.exec(scrambleType)) {
			return "sq1";
		} else if (/^clk(wca|o)$/.exec(scrambleType)) {
			return "clk";
		} else if (/^mgmp$/.exec(scrambleType)) {
			return "mgm";
		} else if (/^15p(at|ra?p?)?$/.exec(scrambleType)) {
			return "15p";
		} else if (/^15p(rmp|m)$/.exec(scrambleType)) {
			return "15b";
		} else if (/^8p(at|ra?p?)?$/.exec(scrambleType)) {
			return "8p";
		} else if (/^8p(rmp|m)$/.exec(scrambleType)) {
			return "8b";
		}
	}

	var fdivs = [];
	var funcs = ['image', 'stats', 'cross'];
	var funcSpan = [];
	var funcMenu = [];
	var funcData = [];

	for (var i = 0; i < 4; i++) {
		fdivs[i] = $('<div />');
		funcSpan[i] = $('<span />');
		funcMenu[i] = new kernel.TwoLvMenu(funcData, onFuncSelected.bind(null, i), $('<select />'), $('<select />'));
		divs[i] = $('<div />').css('display', 'inline-block');
	}

	function onFuncSelected(idx, val) {
		DEBUG && console.log('[func select]', idx, val);
        kernel.blur();
		var start = idx === undefined ? 0 : idx;
		var end = idx === undefined ? 4 : idx + 1;
        for (var i = start; i < end; i++) {
			var newVal = funcMenu[i].getSelected();
            if (funcs[i] != newVal) {
                disableFunc(i, 'property');
                funcs[i] = newVal;
                kernel.setProp('toolsfunc', JSON.stringify(funcs));
                execFunc(i, 'property');
            }
        }
	}

	function procSignal(signal, value) {
		if (signal == 'property') {
			if (value[0] == 'imgSize' || /^col/.exec(value[0])) {
				for (var i = 0; i < kernel.getProp('NTools'); i++) {
					if (funcs[i] == 'image') {
						execFunc(i, signal);
					}
				}
			} else if (value[0] == 'NTools') {
				for (var i = 0; i < 4; i++) {
					if (i < value[1]) {
						divs[i].show();
						if (fdivs[i].html() == '') {
							execFunc(i, signal);
						}
					} else {
						divs[i].hide();
						disableFunc(i, signal);
					}
				}
			} else if (value[0] == 'toolHide') {
				toggleFuncSpan(!value[1]);
			} else if (value[0] == 'toolsfunc' && value[2] == 'session') {
				var newfuncs = JSON.parse(value[1]);
				for (var i = 0; i < 4; i++) {
					funcMenu[i].loadVal(newfuncs[i]);
				}
				onFuncSelected();
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
			for (var i = 0; i < kernel.getProp('NTools'); i++) {
				if (isEn && fdivs[i].html() == '') {
					execFunc(i, signal);
				}
			}
		}
	}

	function toggleFuncSpan(isShow) {
		for (var i = 0; i < 4; i++) {
			if (isShow) {
				funcSpan[i].show();
			} else {
				funcSpan[i].hide();
			}
		}
	}

	function showFuncSpan(e) {
		if ($(e.target).hasClass('click') || $(e.target).is('input, textarea, select')) {
			return;
		}
		kernel.setProp('toolHide', false);
	}

	$(function() {
		kernel.regListener('tools', 'property', procSignal, /^(?:imgSize|image|toolsfunc|NTools|col(?:cube|pyr|skb|sq1|mgm)|toolHide)$/);
		kernel.regListener('tools', 'scramble', procSignal);
		kernel.regListener('tools', 'scrambleX', procSignal);
		kernel.regListener('tools', 'button', procSignal, /^tools$/);

		var mainDiv = $('<div id="toolsDiv"/>');
		for (var i = 0; i < 4; i++) {
			fdivs[i].click(showFuncSpan);
			funcSpan[i].append("<br>", TOOLS_SELECTFUNC, funcMenu[i].select1, funcMenu[i].select2);
			divs[i].append(fdivs[i], funcSpan[i]).appendTo(mainDiv);
			if (i == 1) {
				mainDiv.append('<br>');
			}
		}

		kernel.regProp('tools', 'solSpl', 0, PROPERTY_HIDEFULLSOL, [false]);
		kernel.regProp('tools', 'imgSize', 2, PROPERTY_IMGSIZE, [15, 5, 50]);
		kernel.regProp('tools', 'NTools', 2, PROPERTY_NTOOLS, [1, 1, 4]);
		var defaultFunc = JSON.stringify(['image', 'stats', 'cross', 'distribution']);
		kernel.regProp('tools', 'toolsfunc', 5, PROPERTY_TOOLSFUNC, [defaultFunc], 1);
		var funcStr = kernel.getProp('toolsfunc', defaultFunc);
		if (funcStr.indexOf('[') == -1) {
			funcStr = defaultFunc.replace('image', funcStr);
			kernel.setProp('toolsfunc', funcStr);
		}
		funcs = JSON.parse(funcStr);
		kernel.addWindow('tools', BUTTON_TOOLS, mainDiv, false, true, 6);
		kernel.regProp('ui', 'toolHide', ~0, 'Hide Tools Selector', [false]);
	});

	/**
	 *	{name: function(fdiv, updateAll) , }
	 */
	var toolBox = {};

	function regTool(name, str, execFunc) {
		DEBUG && console.log('[regtool]', name, str);
		toolBox[name] = execFunc;
		str = str.split('>');
		if (str.length == 2) {
			var idx1 = -1;
			for (var i = 0; i < funcData.length; i++) {
				if (funcData[i][0] == str[0] && $.isArray(funcData[i][1])) {
					idx1 = i;
					break;
				}
			}
			if (idx1 != -1) {
				funcData[idx1][1].push([str[1], name]);
			} else {
				funcData.push([str[0], [[str[1], name]]]);
			}
		} else {
			funcData.push([str[0], name]);
		}
		for (var i = 0; i < 4; i++) {
			funcMenu[i].reset(funcs[i]);
		}
	}

	function getSolutionSpan(solution) {
		var span = $('<span />');
		for (var i = 0; i < solution.length; i++) {
			span.append('<span style="display:none;">&nbsp;' + solution[i] + '</span>');
		}
		if (kernel.getProp('solSpl')) {
			span.append($('<span class="click" data="n">[+1]</span>').click(procSolutionClick));
			span.append($('<span class="click" data="a">[' + solution.length + 'f]</span>').click(procSolutionClick));
		} else {
			span.children().show();
		}
		return span;
	}

	function procSolutionClick(e) {
		var span = $(this);
		if (span.attr('data') == 'a') {
			span.prevAll().show();
			span.prev().hide();
			span.hide();
		} else if (span.attr('data') == 'n') {
			var unshown = span.prevAll(':hidden');
			unshown.last().show();
			if (unshown.length == 1) {
				span.next().hide();
				span.hide();
			}
		}
	}

	return {
		regTool: regTool,
		getCurScramble: function() {
			return curScramble;
		},
		getSolutionSpan: getSolutionSpan,
		scrambleType: scrambleType,
		puzzleType: puzzleType,
		isPuzzle: isPuzzle
	};
});
