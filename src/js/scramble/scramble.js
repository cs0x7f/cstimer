"use strict";

var scrMgr = (function(rn, rndEl) {

	function mega(turns, suffixes, length) {
		turns = turns || [[""]];
		suffixes = suffixes || [""];
		length = length || 0;
		var donemoves = 0;
		var lastaxis = -1;
		var s = [];
		var first, second;
		for (var i = 0; i < length; i++) {
			do {
				first = rn(turns.length);
				second = rn(turns[first].length);
				if (first != lastaxis) {
					donemoves = 0;
					lastaxis = first;
				}
			} while (((donemoves >> second) & 1) != 0);
			donemoves |= 1 << second;
			if (turns[first][second].constructor == Array) {
				s.push(rndEl(turns[first][second]) + rndEl(suffixes));
			} else {
				s.push(turns[first][second] + rndEl(suffixes));
			}
		}
		return s.join(' ');
	}

	/**
	 *	{type: callback(type, length, state)}
	 *	callback return: scramble string or undefined means delay
	 */
	var scramblers = {
		"blank": function() {
			return "N/A";
		}
	};

	/**
	 *	{type: [str1, str2, ..., strN]}
	 */
	var filters = {};

	/**
	 *	{type: [prob1, prob2, ..., probN]}
	 */
	var probs = {};

	/**
	 *	filter_and_probs: [[str1, ..., strN], [prob1, ..., probN]]
	 */
	function regScrambler(type, callback, filter_and_probs) {
		DEBUG && console.log('[regscr]', type);
		if ($.isArray(type)) {
			for (var i = 0; i < type.length; i++) {
				scramblers[type[i]] = callback;
			}
		} else {
			scramblers[type] = callback;
			if (filter_and_probs != undefined) {
				filters[type] = filter_and_probs[0];
				probs[type] = filter_and_probs[1];
			}
		}
		return regScrambler;
	}

	/**
	 *	format string,
	 *		${args} => scramblers[scrType](scrType, scrArg)
	 *		#{args} => mega(args)
	 */
	function formatScramble(str) {
		var repfunc = function(match, p1) {
			if (match[0] == '$') {
				var args = [p1];
				if (p1[0] == '[') {
					args = JSON.parse(p1);
				}
				return scramblers[args[0]].apply(this, args);
			} else if (match[0] == '#') {
				return mega.apply(this, JSON.parse('[' + p1 + ']'));
			} else {
				return '';
			}
		};
		var re1 = /[$#]\{([^\}]+)\}/g;
		return str.replace(re1, repfunc);
	}

	function rndState(filter, probs) {
		if (probs == undefined) {
			return undefined;
		}
		var ret = probs.slice();
		if (filter == undefined) {
			filter = ret;
		}
		for (var i = 0; i < filter.length; i++) {
			if (!filter[i]) {
				ret[i] = 0;
			}
		}
		return mathlib.rndProb(ret);
	}

	function fixCase(cases, probs) {
		return cases == undefined ? mathlib.rndProb(probs) : cases;
	}

	return {
		reg: regScrambler,
		scramblers: scramblers,
		filters: filters,
		probs: probs,
		mega: mega,
		formatScramble: formatScramble,
		rndState: rndState,
		fixCase: fixCase
	}
})(mathlib.rn, mathlib.rndEl);


var scramble = execMain(function(rn, rndEl) {
	var scramblers = scrMgr.scramblers;
	var filters = scrMgr.filters;
	var probs = scrMgr.probs;

	var div = $('<div id="scrambleDiv"/>');
	var title = $('<div />').addClass('title');
	var selects = [$('<select />'), $('<select />')];
	var menu = new kernel.TwoLvMenu(scrdata, loadScrOptsAndGen, selects[0], selects[1], '333');
	var scrOpt = $('<input type="button" class="icon">').val('\ue994');
	var scrOptDiv = $('<div>');
	var scrFltDiv = $('<div class="sflt">');
	var scrFltSelAll = $('<input type="button">').val('Select All');
	var scrFltSelNon = $('<input type="button">').val('Select None');
	var scrLen = $('<input type="text" maxlength="3">');
	var sdiv = $('<div>');
	var ssdiv = $('<div id="scrambleTxt"/>');
	var alias = {
		'333oh': '333',
		'333ft': '333'
	};

	var scrFlt = "";
	var inputText = $('<textarea />');

	function genScramble() {
		kernel.blur();
		sdiv.html('Scrambling...');
		typeExIn = (!type || /^(remote|input$)/.exec(type)) ? typeExIn : type;
		if (!isDisplayLast) {
			lasttype = type;
			lastscramble = scramble;
			lastlen = len;
		}
		isDisplayLast = false;
		if (lastscramble) {
			lastClick.addClass('click').unbind('click').click(procLastClick);
		}

		type = menu.getSelected();
		len = ~~scrLen.val();
		if (lasttype != type) {
			kernel.setProp('scrType', type);
		}
		scramble = "";
		requestAnimFrame(doScrambleIt);
	}


	var type, scramble, len = 0;
	var lasttype, lastscramble, lastlen = 0;
	var typeExIn = '333';
	var isDisplayLast = false;
	var lastClick = $('<span />').html(SCRAMBLE_LAST);
	var nextClick = $('<span />').addClass('click').html(SCRAMBLE_NEXT).click(procNextClick);

	function procLastClick() {
		isDisplayLast = true;
		sdiv.html(scrStd(lasttype, lastscramble, lastlen, true));
		lastClick.removeClass('click').unbind('click');
		if (lastscramble != undefined) {
			kernel.pushSignal('scrambleX', scrStd(lasttype, lastscramble, lastlen));
		}
	}

	function procNextClick() {
		if (isDisplayLast) {
			isDisplayLast = false;
			sdiv.html(scrStd(type, scramble, len, true));
			lastClick.addClass('click').unbind('click').click(procLastClick);
			kernel.pushSignal('scrambleX', scrStd(type, scramble, len));
		} else {
			genScramble();
		}
	}

	function procScrambleClick() {
		if (!scramble) {
			return;
		}
		var act = kernel.getProp('scrClk', 'n');
		if (act == 'c') {
			var succ = $.clipboardCopy(sdiv.text());
			if (succ) {
				logohint.push('scramble copied');
			}
		} else if (act == '+') {
			procNextClick();
		}
	}

	function scrStd(type, scramble, len, forDisplay) {
		scramble = scramble || '';
		len = len || 0;
		var m = /^\$T([a-zA-Z0-9]+)(-[0-9]+)?\$\s*(.*)$/.exec(scramble);
		if (m) {
			type = m[1];
			scramble = m[3];
			len = ~~m[2];
		}
		if (forDisplay) {
			var fontSize = kernel.getProp('scrASize') ? Math.max(0.25, Math.round(Math.pow(50 / Math.max(scramble.length, 10), 0.30) * 20) / 20) : 1;
			sdiv.css('font-size', fontSize + 'em');
			DEBUG && console.log('[scrFontSize]', fontSize);
			return scramble.replace(/~/g, '&nbsp;').replace(/\\n/g, '\n')
				.replace(/`([^']*)`/g, kernel.getProp('scrKeyM', false) ? '<u>$1</u>' : '$1');
		} else {
			return [type, scramble.replace(/~/g, '').replace(/\\n/g, '\n').replace(/`([^']*)`/g, '$1'), len];
		}
	}

	function doScrambleIt() {
		calcScramble();
		if (scramble) {
			scrambleOK();
		} else {
			sdiv.html("Scrambling... ");
		}
	}

	var enableCache = true;

	function setCacheEnable(enable) {
		enableCache = enable;
	}

	var cacheTid = 0;

	function genCachedScramble(args, detailType, isPredict) {
		if (!enableCache) {
			return;
		}
		if (csTimerWorker && csTimerWorker.getScramble) {
			cacheTid = cacheTid || csTimerWorker.getScramble(args, function(detailType, scramble) {
				DEBUG && console.log('[scrcache]', detailType + ' cached by csTimerWorker');
				saveCachedScramble(detailType, scramble);
			}.bind(undefined, detailType));
		} else if (!isPredict) {
			cacheTid = cacheTid || setTimeout(function(detailType, args) {
				var scrambler = scramblers[args[0]];
				saveCachedScramble(detailType, scrambler.apply(scrambler, args));
			}.bind(undefined, detailType, args), 500);
		}
	}

	function saveCachedScramble(detailType, scramble) {
		var cachedScr = JSON.parse(localStorage['cachedScr'] || null) || {};
		if ($.isArray(cachedScr)) {
			cachedScr = {};
		}
		cachedScr[detailType] = scramble;
		localStorage['cachedScr'] = JSON.stringify(cachedScr);
		cacheTid = 0;
	}

	$(function() {
		if (!csTimerWorker || !csTimerWorker.getScramble) {
			return;
		}
		var forceCached = ['["444wca",40,null]'];
		var cachedScr = JSON.parse(localStorage['cachedScr'] || null) || {};
		if ($.isArray(cachedScr)) {
			cachedScr = {};
		}
		for (var i = 0; i < forceCached.length; i++) {
			if (!(forceCached[i] in cachedScr)) {
				setTimeout(genCachedScramble.bind(undefined, JSON.parse(forceCached[i]), forceCached[i], true), 2500 + ~~(Math.random() * 5000));
			}
		}
	});

	function calcScramble() {
		if (!type) {
			return;
		}
		scramble = "";
		var realType = alias[type] || type;

		if (realType == 'input') {
			scramble = inputScrambleGen.next();
			return;
		} else {
			inputScrambleGen.clear();
		}

		if (realType.startsWith('remote')) {
			scramble = remoteScrambleGen.next(realType);
			return;
		} else {
			remoteScrambleGen.clear();
		}

		if (realType in scramblers) {
			var cachedScr = JSON.parse(localStorage['cachedScr'] || null) || {};
			var detailType = JSON.stringify([realType, len, scrFlt[1]]);
			if (enableCache && detailType in cachedScr) {
				scramble = cachedScr[detailType];
				delete cachedScr[detailType];
				localStorage['cachedScr'] = JSON.stringify(cachedScr);
			} else {
				scramble = scramblers[realType](realType, len, rndState(scrFlt[1], probs[realType]));
			}
			genCachedScramble([realType, len, rndState(scrFlt[1], probs[realType])], detailType);
			return;
		}

		requestAnimFrame(doScrambleIt);
	}

	function scrambleOK(scrStr) {
		scramble = (scrStr || scramble).replace(/(\s*)$/, "");
		sdiv.html(scrStd(type, scramble, len, true));
		kernel.pushSignal('scramble', scrStd(type, scramble, len));
	}

	var remoteScrambleGen = (function() {
		var remoteScramble = [];
		var remoteURL = 'https://cstimer.net/testRemoteScramble.php';

		function next(type) {
			var ret = null;
			while (!ret && remoteScramble.length != 0) {
				ret = remoteScramble.shift();
			}
			if (ret) {
				return ret;
			}
			if (type == 'remoteComp') {
				if (!onlinecomp) {
					remoteFail();
				}
				ret = onlinecomp.getScrambles();
				if (!parseInput(ret)) {
					remoteFail();
				} else {
					requestAnimFrame(doScrambleIt);
				}
			} else if (type == 'remoteURL') {
				$.getJSON(remoteURL, function(ret) {
					if (!parseInput(ret)) {
						remoteFail();
					} else {
						requestAnimFrame(doScrambleIt);
					}
				}).error(remoteFail);
			}
			return "";
		}

		function remoteFail() {
			kernel.setProp('scrType', typeExIn);
		}

		function clear() {
			remoteScramble = [];
		}

		function parseInput(ret) {
			if (!$.isArray(ret)) {
				return false;
			}
			remoteScramble = ret;
			return remoteScramble.length != 0;
		}

		return {
			next: next,
			clear: clear
		};
	})();

	var inputScrambleGen = (function() {

		var inputScramble = [];

		function next() {
			var ret = null;
			while (!ret && inputScramble.length != 0) {
				ret = inputScramble.shift();
			}
			if (ret) {
				return ret;
			}
			inputText.val("");
			kernel.showDialog([inputText, inputOK, inputCancel], 'input', SCRAMBLE_INPUT);
			return "";
		}

		function clear() {
			inputScramble = [];
		}

		function inputOK() {
			if (!parseInput(inputText.val())) {
				kernel.setProp('scrType', typeExIn);
			} else {
				doScrambleIt();
			}
		}

		function inputCancel() {
			kernel.setProp('scrType', typeExIn);
		}

		function parseInput(str) {
			if (str.match(/^\s*$/)) {
				return false;
			}
			inputScramble = [];
			var inputs = str.split('\n');
			for (var i = 0; i < inputs.length; i++) {
				var s = inputs[i];
				if (s.match(/^\s*$/) == null) {
					inputScramble.push(s.replace(/^\d+[\.\),]\s*/, ''));
				}
			}
			return inputScramble.length != 0;
		}

		return {
			next: next,
			clear: clear
		};
	})();

	function loadScrOpts() {
		kernel.blur();
		var idx = menu.getSelIdx();
		var len = scrdata[idx[0]][1][idx[1]][2];
		scrLen.val(Math.abs(len));
		scrLen[0].disabled = len <= 0;
		var curType = menu.getSelected();
		scrFlt = JSON.parse(kernel.getProp('scrFlt', JSON.stringify([curType, filters[curType]])));
		scrOpt[0].disabled = scrLen[0].disabled && !(curType in filters);
		if (scrFlt[0] != curType) {
			scrFlt = [curType, filters[curType] && mathlib.valuedArray(filters[curType].length, 1)];
			kernel.setProp('scrFlt', JSON.stringify(scrFlt), 'session');
		}
	}

	function loadScrOptsAndGen() {
		loadScrOpts();
		genScramble();
	}

	function showScrOpt() {
		scrFltDiv.empty();
		var chkBoxList = [];
		var chkLabelList = [];
		var modified = false;
		if (type in filters) {
			var data = filters[type];
			var curData = data;
			if (scrFlt[0] == type) {
				curData = scrFlt[1] || data;
			}
			// console.log(scrFlt, curData);
			scrFltDiv.append('<br>', scrFltSelAll, scrFltSelNon, '<br><br>');
			var dataGroup = {};
			for (var i = 0; i < data.length; i++) {
				var spl = data[i].indexOf('-');
				if (spl == -1) {
					dataGroup[data[i]] = [i];
					continue;
				}
				var group = data[i].slice(0, spl);
				dataGroup[group] = dataGroup[group] || [];
				dataGroup[group].push(i);
			}
			for (var i = 0; i < data.length; i++) {
				var chkBox = $('<input type="checkbox">').val(i);
				if (curData[i]) {
					chkBox[0].checked = true;
				}
				chkBoxList.push(chkBox);
				chkLabelList.push($('<label>').append(chkBox, data[i]));
			}

			var cntSel = function(g) {
				var cnt = 0;
				$.each(dataGroup[g], function(idx, val) {
					cnt += chkBoxList[val][0].checked ? 1 : 0;
				});
				return cnt + '/' + dataGroup[g].length;
			};

			for (var g in dataGroup) {
				if (dataGroup[g].length == 1) {
					scrFltDiv.append(chkLabelList[dataGroup[g][0]]);
				}
			}
			for (var g in dataGroup) {
				if (dataGroup[g].length == 1) {
					continue;
				}
				scrFltDiv.append($('<div>').attr('data', g).append(
					$('<span>').html(g + ' ' + cntSel(g)), ' | ',
					$('<span class="click">').html('All').click(function() {
						var g = $(this).parent().attr('data');
						$.each(dataGroup[g], function(idx, val) {
							chkBoxList[val][0].checked = true;
						});
						$(this).parent().children().first().html(g + ' ' + cntSel(g));
					}), ' | ',
					$('<span class="click">').html('None').click(function() {
						var g = $(this).parent().attr('data');
						$.each(dataGroup[g], function(idx, val) {
							chkBoxList[val][0].checked = false;
						});
						$(this).parent().children().first().html(g + ' ' + cntSel(g));
					}), ' | ',
					$('<span class="click">[+]</span>').click(function() {
						$(this).next().toggle();
					}),
					$('<div>').append($.map(dataGroup[g], function(val) {
						chkBoxList[val].change(function() {
							var g = $(this).parent().parent().parent().attr('data');
							$(this).parent().parent().parent().children().first().html(g + ' ' + cntSel(g));
						});
						return chkLabelList[val];
					})).hide())
				);
			}

			scrFltSelAll.unbind('click').click(function() {
				for (var i = 0; i < chkBoxList.length; i++) {
					if (!chkBoxList[i][0].checked) {
						chkBoxList[i][0].checked = true;
					}
					chkBoxList[i].change();
				}
			});
			scrFltSelNon.unbind('click').click(function() {
				for (var i = 0; i < chkBoxList.length; i++) {
					if (chkBoxList[i][0].checked) {
						chkBoxList[i][0].checked = false;
					}
					chkBoxList[i].change();
				}
			});
		}

		function procDialog() {
			if (type in filters) {
				var data = mathlib.valuedArray(filters[type].length, 1);
				var hasVal = false;
				for (var i = 0; i < chkBoxList.length; i++) {
					if (!chkBoxList[i][0].checked) {
						data[i] = 0;
					} else {
						hasVal = true;
					}
				}
				if (!hasVal) {
					alert('Should Select At Least One Case');
				} else {
					scrFlt = [type, data];
					var scrFltStr = JSON.stringify(scrFlt);
					if (kernel.getProp('scrFlt') != scrFltStr) {
						modified = true;
						kernel.setProp('scrFlt', scrFltStr);
					}
				}
				if (modified) {
					genScramble();
				}
			}
		}
		kernel.showDialog([scrOptDiv, procDialog, null, procDialog], 'scropt', 'Scramble Options');
	}

	var isEn = false;

	function procSignal(signal, value) {
		if (signal == 'time') {
			if (isEn) {
				genScramble();
			} else {
				sdiv.empty();
				kernel.pushSignal('scramble', ['-', '', 0]);
			}
		} else if (signal == 'property') {
			if (value[0] == 'scrSize') {
				ssdiv.css('font-size', value[1] / 7 + 'em');
			} else if (value[0] == 'scrMono') {
				div.css('font-family', value[1] ? 'SimHei, Monospace' : 'Arial');
			} else if (value[0] == 'scrType') {
				if (value[1] != menu.getSelected()) {
					loadType(value[1]);
				}
			} else if (value[0] == 'scrLim') {
				if (value[1]) {
					ssdiv.addClass('limit');
				} else {
					ssdiv.removeClass('limit');
				}
			} else if (value[0] == 'scrAlign') {
				if (value[1] == 'c') {
					div.css('text-align', 'center');
				} else if (value[1] == 'l') {
					div.css('text-align', 'left');
				} else if (value[1] == 'r') {
					div.css('text-align', 'right');
				}
			} else if (value[0] == 'scrFast') {
				alias['444wca'] = value[1] ? '444m' : '444wca';
				if (type == '444wca') {
					genScramble();
				}
			} else if (value[0] == 'scrKeyM') {
				sdiv.html(isDisplayLast ? scrStd(lasttype, lastscramble || '', lastlen || 0, true) : scrStd(type, scramble || '', len, true));
			} else if (value[0] == 'scrHide') {
				if (value[1]) {
					title.hide();
				} else {
					title.show();
				}
			}
		} else if (signal == 'button' && value[0] == 'scramble') {
			isEn = value[1];
			if (isEn && sdiv.html() == '') {
				genScramble();
			}
		} else if (signal == 'ctrl' && value[0] == 'scramble') {
			if (value[1] == 'last') {
				procLastClick();
			} else if (value[1] == 'next') {
				procNextClick();
			}
		}
	}

	function procOnType(type, func) {
		for (var i = 0; i < scrdata.length; i++) {
			for (var j = 0; j < scrdata[i][1].length; j++) {
				if (scrdata[i][1][j][1] == type) {
					func(i, j);
					return;
				}
			}
		}
	}

	function loadType(type) {
		menu.loadVal(type);
		loadScrOptsAndGen();
	}

	function getTypeName(type) {
		var name = '';
		procOnType(type, function(i, j) {
			name = scrdata[i][0] + '>' + scrdata[i][1][j][0];
		});
		return name;
	}

	function getTypeIdx(type) {
		var idx = 1e300;
		procOnType(type, function(i, j) {
			idx = i * 100 + j;
		});
		return idx;
	}

	var scrambleGenerator = (function() {
		var tdiv = $('<div />').css('text-align', 'center').css('font-size', '0.7em');
		var button = $('<span />').addClass('click').html(SCRGEN_GEN);
		var scrNum = $('<input type="text" maxlength="3">').val(5);
		var output = $('<textarea rows="10" style="width: 100%" readonly />');
		var prefix = $('<select><option value="1. ">1. </option><option value="1) ">1) </option><option value="(1) ">(1) </option><option value=""></option></select>');
		tdiv.append(SCRGEN_NSCR, scrNum, "&nbsp;", SCRGEN_PRE).append(prefix, "<br>", button, "<br>", output);

		function generate() {
			var n_scramble = ~~scrNum.val();
			var scrambles = "";
			var scramble_copy = scramble;
			var pre = prefix.val();
			for (var i = 0; i < n_scramble; i++) {
				calcScramble();
				scrambles += pre.replace('1', i + 1) + scramble + "\n";
			}
			// console.log(scrambles);
			scramble = scramble_copy;
			output.text(scrambles);
			output.select();
		}

		return function(fdiv) {
			if (!fdiv) {
				return;
			}
			fdiv.empty().append(tdiv.width(div.width() / 2));
			prefix.unbind("change").change(kernel.blur);
			button.unbind("click").click(generate);
		}
	})();

	var rndState = scrMgr.rndState;

	$(function() {
		kernel.regListener('scramble', 'time', procSignal);
		kernel.regListener('scramble', 'property', procSignal, /^scr(?:Size|Mono|Type|Lim|Align|Fast|KeyM|Hide)$/);
		kernel.regListener('scramble', 'button', procSignal, /^scramble$/);
		kernel.regListener('scramble', 'ctrl', procSignal, /^scramble$/);
		kernel.regProp('scramble', 'scrSize', 2, PROPERTY_SCRSIZE, [15, 5, 50], 1);
		kernel.regProp('scramble', 'scrASize', 0, PROPERTY_SCRASIZE, [true], 1);
		kernel.regProp('scramble', 'scrMono', 0, PROPERTY_SCRMONO, [true], 1);
		kernel.regProp('scramble', 'scrLim', 0, PROPERTY_SCRLIM, [false], 1);
		kernel.regProp('scramble', 'scrAlign', 1, PROPERTY_SCRALIGN, ['c', ['c', 'l', 'r'], PROPERTY_SCRALIGN_STR.split('|')], 1);
		kernel.regProp('scramble', 'preScr', 1, "pre-scramble", ['', ['', 'z2', "z'", 'z', "x'", 'x'],
			['', 'z2', "z'", 'z', "x'", 'x']
		], 1);
		kernel.regProp('scramble', 'scrFast', 0, PROPERTY_SCRFAST, [false]);
		kernel.regProp('scramble', 'scrKeyM', 0, PROPERTY_SCRKEYM, [false], 1);
		kernel.regProp('scramble', 'scrClk', 1, PROPERTY_SCRCLK, ['n', ['n', 'c', '+'], PROPERTY_SCRCLK_STR.split('|')], 1);
		kernel.regProp('scramble', 'scrType', ~5, 'Scramble Type', ['333'], 3);

		scrLen.change(genScramble);
		scrOpt.click(showScrOpt);
		scrOptDiv.append($('<div>').append(SCRAMBLE_LENGTH + ': ', scrLen), scrFltDiv);

		title.append($('<nobr>').append(selects[0], ' ', selects[1], ' ', scrOpt), " <wbr>");
		title.append($('<nobr>').append(lastClick, '/', nextClick, SCRAMBLE_SCRAMBLE));
		div.append(title, ssdiv.append(sdiv).click(procScrambleClick));
		tools.regTool('scrgen', TOOLS_SCRGEN, scrambleGenerator);
		ssdiv.click(function() {
			title.show();
			kernel.blur();
			kernel.setProp('scrHide', false);
		});
		kernel.regProp('ui', 'scrHide', ~0, 'Hide Scramble Selector', [false]);
		kernel.addWindow('scramble', BUTTON_SCRAMBLE, div, true, true, 3);
		loadScrOpts();
	});

	return {
		getTypeName: getTypeName,
		getTypeIdx: getTypeIdx,
		scrStd: scrStd,
		setCacheEnable: setCacheEnable
	}
}, [mathlib.rn, mathlib.rndEl]);
