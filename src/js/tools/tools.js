"use strict";

var tools = (function() {
	var curScramble = ['-', '', 0];

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

	function carrot2poch(scramble) {
		return scramble.replace(/([+-])([+-]) /g, function(m, p1, p2) {
			return 'R' + p1 + p1 + ' D' + p2 + p2 + ' ';
		});
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
		} else if (puzzle == 'fto') {
			return scramble.match(/^(([FRUBLD]|(?:BL)|(?:BR))[']?\s*)+$/);
		}
		return false;
	}

	function puzzleType(scrambleType) {
		if (/^222(so|[236o]|eg[012]?|tc[np]?|lsall|nb)$/.exec(scrambleType)) {
			return "222";
		} else if (/^(333(oh?|ni|f[mt]|drud|custom)?|(z[zb]|[coep]|c[om]|2g|ls|tt)?ll|lse(mu)?|2genl?|3gen_[LF]|edges|corners|f2l|lsll2|(zb|w?v|eo)ls|roux|RrU|half|easyx?c|eoline|eocross|sbrx|mt(3qb|eole|tdr|6cp|l5ep|cdrll)|nocache_333(bld|pat)spec)$/.exec(scrambleType)) {
			return "333";
		} else if (/^(444([mo]|wca|yj|bld|ctud|ctrl|ud3c|l8e|rlda|rlca|edo|cto|e?ll)?|4edge|RrUu)$/.exec(scrambleType)) {
			return "444";
		} else if (/^(555(wca|bld)?|5edge)$/.exec(scrambleType)) {
			return "555";
		} else if (/^(666(si|[sp]|wca)?|6edge)$/.exec(scrambleType)) {
			return "666";
		} else if (/^(777(si|[sp]|wca)?|7edge)$/.exec(scrambleType)) {
			return "777";
		} else if (/^pyr(s?[om]|l4e|nb|4c)$/.exec(scrambleType)) {
			return "pyr";
		} else if (/^skb(s?o|nb)?$/.exec(scrambleType)) {
			return "skb";
		} else if (/^sq(rs|1pll|1[ht]|rcsp)$/.exec(scrambleType)) {
			return "sq1";
		} else if (/^clk(wcab?|o|nf)$/.exec(scrambleType)) {
			return "clk";
		} else if (/^(mgmp|mgmo|mgmc|minx2g|mlsll|mgmpll|mgmll)$/.exec(scrambleType)) {
			return "mgm";
		} else if (/^(klmso|klmp)$/.exec(scrambleType)) {
			return "klm";
		} else if (/^(fto|fto(so|l[34]t|tcp|edge|cent|corn))$/.exec(scrambleType)) {
			return "fto";
		} else if (/^(dmdso)$/.exec(scrambleType)) {
			return "dmd";
		} else if (/^(mpyr|mpyrso)$/.exec(scrambleType)) {
			return "mpyr";
		} else if (/^15p(at|ra?p?)?$/.exec(scrambleType)) {
			return "15p";
		} else if (/^15p(rmp|m)$/.exec(scrambleType)) {
			return "15b";
		} else if (/^8p(at|ra?p?)?$/.exec(scrambleType)) {
			return "8p";
		} else if (/^8p(rmp|m)$/.exec(scrambleType)) {
			return "8b";
		} else if (/^heli2x2g?$/.exec(scrambleType)) {
			return "heli2x2";
		} else if (/^prc[po]$/.exec(scrambleType)) {
			return "prc";
		} else if (/^redi(m|so)?$/.exec(scrambleType)) {
			return "redi";
		} else if (/^dino(o|so)?$/.exec(scrambleType)) {
			return "dino";
		} else if (/^gear(o|so)?$/.exec(scrambleType)) {
			return "gear";
		} else {
			return scrambleType;
		}
	}

	var ret = ISCSTIMER ? execMain(function() {
		var divs = [];
		var isEn = false;

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
				if (/^(img|col).*/.exec(value[0])) {
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
				} else if (value[0] == 'toolPos') {
					$('html').removeClass('toolf toolt');
					if ('ft'.indexOf(value[1]) != -1) {
						$('html').addClass('tool' + value[1]);
					}
				}
			} else if (signal == 'scramble' || signal == 'scrambleX') {
				curScramble = value;
				kernel.setProp('isTrainScr', !!trainScrambleRe.exec((curScramble || [])[0]));
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
			if ($(e.target).is('input,textarea,select,.click')) {
				return;
			}
			kernel.setProp('toolHide', false);
		}

		$(function() {
			kernel.regListener('tools', 'property', procSignal, /^(?:img(Size|Rep)|image|toolsfunc|NTools|col(?:cube|pyr|skb|sq1|mgm|fto|clk|15p|ico)|toolHide|toolPos)$/);
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

			kernel.regProp('tools', 'toolPos', 1, PROPERTY_TOOLPOS, ['b', ['b', 'f', 't'], PROPERTY_TOOLPOS_STR.split('|')], 1);
			kernel.regProp('tools', 'solSpl', 0, PROPERTY_HIDEFULLSOL, [false]);
			kernel.regProp('tools', 'imgSize', 2, PROPERTY_IMGSIZE, [15, 5, 50], 1);
			kernel.regProp('tools', 'imgRep', 0, PROPERTY_IMGREP, [true], 1);
			kernel.regProp('tools', 'NTools', 2, PROPERTY_NTOOLS, [1, 1, 4], 1);
			var defaultFunc = JSON.stringify(['image', 'stats', 'cross', 'distribution']);
			kernel.regProp('tools', 'toolsfunc', 5, PROPERTY_TOOLSFUNC, [defaultFunc], 1);
			kernel.regProp('tools', 'isTrainScr', ~5, 'Is Train Scramble', [false], 0);
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
			$.delayExec('toolreset', function() {
				for (var i = 0; i < 4; i++) {
					funcMenu[i].reset(funcs[i]);
				}
			}, 0);
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
			getSolutionSpan: getSolutionSpan,
		}
	}) : {};

	var lastTrain = null;
	var trainScrambleRe = /^((z[zb]|[coep]|c[om]|2g|ls|tt)?ll|lse(mu)?|2genl?|3gen_[LF]|333drud|f2l|lsll2|(zb|w?v|eo)ls|roux|eoline|eocross|sbrx|mt(3qb|eole|tdr|6cp|l5ep|cdrll)|222(eg[012]?|tc[np]|lsall))$/;

	function isCurTrainScramble(scramble) {
		return !!trainScrambleRe.exec((scramble || curScramble || [])[0]);
	}

	var ret2 = {
		getCurScramble: function() {
			return curScramble;
		},
		getCurPuzzle: function() {
			return puzzleType(curScramble[0]);
		},
		scrambleType: scrambleType,
		puzzleType: puzzleType,
		carrot2poch: carrot2poch,
		isCurTrainScramble: isCurTrainScramble,
		isPuzzle: isPuzzle
	};
	for (var key in ret2) {
		ret[key] = ret2[key];
	}
	return ret;
})();
