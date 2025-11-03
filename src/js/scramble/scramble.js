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
	 *  {type: func(idx) {return [filter, probs, imgGen][idx])
	 */
	var extra = {};

	/**
	 *	filter_and_probs: [[str1, ..., strN], [prob1, ..., probN], imgGen]
	 */
	function regScrambler(type, callback, filter_and_probs) {
		DEBUG && console.log('[regscr]', type);
		if ($.isArray(type)) {
			for (var i = 0; i < type.length; i++) {
				scramblers[type[i]] = callback;
			}
		} else {
			scramblers[type] = callback;
			if ($.isArray(filter_and_probs)) {
				extra[type] = function(ret, idx) { return ret[idx]; }.bind(null, filter_and_probs);
			} else if (filter_and_probs) {
				extra[type] = filter_and_probs;
			}
		}
		if (type == '333') {
			scramblers['333oh'] = scramblers['333ft'] = callback;
		}
		return regScrambler;
	}

	/**
	 *	return extra info for specific type, idx: 0 => filter, 1 => probs, 2 => imgGen
	 */
	function getExtra(type, idx) {
		if (!(type in extra)) {
			return;
		}
		return extra[type](idx);
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
		if (probs[0] == 0) {
			return filter.slice();
		}
		var valids = [];
		for (var i = 0; i < filter.length; i++) {
			valids.push(i);
			if (!filter[i]) {
				ret[i] = 0;
				valids.pop();
			} else if (equalProb == 1) {
				ret[i] = 1;
			}
		}
		if (equalProb == 2) {
			if (millerCnt++ < 0) {
				millerCnt = mathlib.rn(65536);
			}
			return valids[MillerShuffle(millerCnt % valids.length, ~~(millerCnt / valids.length), valids.length)];
		}
		return mathlib.rndProb(ret);
	}

	function fixCase(cases, probs) {
		if (cases != undefined) {
			return cases;
		}
		if (equalProb == 2) { // strict equal prob
			if (millerCnt++ < 0) {
				millerCnt = mathlib.rn(65536);
			}
			return MillerShuffle(millerCnt % probs.length, ~~(millerCnt / probs.length), probs.length);
		} else if (equalProb == 1) { // weak equal prob
			return mathlib.rn(probs.length);
		} else {
			return mathlib.rndProb(probs);
		}
	}

	var equalProb = 0;
	var millerCnt = -1;

	function toTxt(scramble) {
		return scramble.replace(/<span[^>]*>(.*?)<\/span>/ig, '$1 ').replace(/~/g, '').replace(/\\n/g, '\n').replace(/`(.*?)`/g, '$1');
	}

	function MillerShuffle(idx, permIdx, length) {
		if (length <= 0 || idx < 0 || permIdx < 0) {
			return 0;
		}
		var p1 = 24317, p2 = 32141, p3 = 63629;
		var randR = permIdx + ~~(idx / length) * 131;
		var r1 = randR % p1 + 42;
		var r2 = ((randR * 0x89) ^ r1) % p2;
		var r3 = (r1 + r2 + p3) % length;
		var r4 = r1 ^ r2 ^ r3;
		var rx = ~~(randR / length) % length + 1;
		var rx2 = ~~(randR / length / length) % length + 1;
		var sidx = (idx + randR) % length;
		if (sidx % 3 == 0) sidx = (((sidx / 3) * p1 + r1) % ~~((length + 2) / 3)) * 3;
		if (sidx % 2 == 0) sidx = (((sidx / 2) * p2 + r2) % ~~((length + 1) / 2)) * 2;
		if (sidx < ~~(length / 2)) sidx = (sidx * p3 + r4) % ~~(length / 2);
		if ((sidx ^ rx) < length) sidx ^= rx;
		sidx = (sidx * p3 + r3) % length;
		if ((sidx ^ rx2) < length) sidx ^= rx2;
		return sidx;
	}

	return {
		reg: regScrambler,
		scramblers: scramblers,
		getExtra: getExtra,
		mega: mega,
		formatScramble: formatScramble,
		rndState: rndState,
		fixCase: fixCase,
		setEqPr: function(ep) { equalProb = ~~ep; },
		getEqPr: function() { return equalProb; },
		toTxt: toTxt
	}
})(mathlib.rn, mathlib.rndEl);


var scramble = ISCSTIMER && execMain(function(rn, rndEl) {
	var scramblers = scrMgr.scramblers;
	var getExtra = scrMgr.getExtra;

	var div = $('<div id="scrambleDiv"/>');
	var title = $('<div />').addClass('title');
	var selects = [$('<select />'), $('<select />')];
	var menu = new kernel.TwoLvMenu(scrdata, loadScrOptsAndGen, selects[0], selects[1], '333');
	var scrOpt = $('<input type="button" class="icon">').val('\ue994');
	var scrOptDiv = $('<div>');
	var scrFltDiv = $('<div class="sflt">');
	var scrFltSelAll = $('<input type="button">').val(SCROPT_BTNALL);
	var scrFltSelNon = $('<input type="button">').val(SCROPT_BTNNONE);
	var scrLen = $('<input type="text" maxlength="3">');
	var scrHelp = $('<span>');
	var sdiv = $('<div>');
	var ssdiv = $('<div id="scrambleTxt"/>');
	var alias = {
		'333oh': '333',
		'333ft': '333',
		'mrbl': '333'
	};
	var helpMsg = {
		'easyc': EASY_SCRAMBLE_HINT,
		'easyxc': EASY_SCRAMBLE_HINT
	};

	var scrFlt = "";
	var scrTPRe = /^\$T([a-zA-Z0-9]+)(-[0-9]+)?\$\s*(.*)$/;

	function genScramble() {
		kernel.blur();
		kernel.pushSignal('scrambling', type);
		sdiv.html(SCRAMBLE_SCRAMBLING + '...');
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

		type = menu.getSelected() || '333';
		len = ~~scrLen.val();
		if (lasttype != type) {
			kernel.setProp('scrType', type);
		}
		scramble = "";
		requestAnimFrame(doScrambleIt);
	}


	var type, scramble, len = 0;
	var lasttype, lastscramble, lastlen = 0;
	var neutLevel = 0;
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

	function pushScramble(_scramble) {
		if (!isDisplayLast) {
			lasttype = type;
			lastscramble = scramble;
			lastlen = len;
		}
		isDisplayLast = false;
		scramble = _scramble;
		sdiv.html(scrStd(type, scramble, len, true));
		lastClick.addClass('click').unbind('click').click(procLastClick);
		kernel.pushSignal('scrambleX', scrStd(type, scramble, len));
	}

	function procScrambleClick() {
		if (!scramble) {
			return;
		}
		var act = kernel.getProp('scrClk', 'n');
		if (act == 'c') {
			var scrTxt = (tools.getCurScramble()[1]).trim();
			$.clipboardCopy(scrTxt).then(
				logohint.push.bind(logohint, LGHINT_SCRCOPY),
				logohint.push.bind(logohint, 'Copy Failed')
			);
		} else if (act == '+') {
			procNextClick();
		}
	}

	function scrStd(type, scramble, len, forDisplay, forceKeyM) {
		scramble = scramble || '';
		len = len || 0;
		var m = scrTPRe.exec(scramble);
		if (m) {
			type = m[1];
			scramble = m[3];
			len = ~~m[2];
		}
		var scrTxt = scrMgr.toTxt(scramble);
		if (forDisplay) {
			var fontSize = kernel.getProp('scrASize') ? Math.max(0.25, Math.round(Math.pow(50 / Math.max(scrTxt.length, 10), 0.30) * 20) / 20) : 1;
			sdiv.css('font-size', fontSize + 'em');
			DEBUG && console.log('[scrFontSize]', fontSize);
			return scramble.replace(/~/g, '&nbsp;').replace(/\\n/g, '\n')
				.replace(/`(.*?)`/g, forceKeyM || kernel.getProp('scrKeyM', false) ? '<u>$1</u>' : '$1');
		} else {
			return [type, scrTxt, len];
		}
	}

	function doScrambleIt() {
		calcScramble();
		if (scramble) {
			scrambleOK();
		} else {
			sdiv.html(SCRAMBLE_SCRAMBLING + "... ");
		}
	}

	var enableCache = true;

	function setCacheEnable(enable) {
		enableCache = enable;
	}

	var cacheTid = 0;

	function genCachedScramble(args, detailType, isPredict) {
		if (!enableCache || args[0].startsWith('nocache_')) {
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
			var detailType = JSON.stringify([realType, len, scrFlt[1], neutLevel]);
			if (enableCache && detailType in cachedScr && !realType.startsWith('nocache_')) {
				scramble = cachedScr[detailType];
				delete cachedScr[detailType];
				localStorage['cachedScr'] = JSON.stringify(cachedScr);
			} else {
				scramble = scramblers[realType](realType, len, rndState(scrFlt[1], getExtra(realType, 1)), neutLevel);
			}
			genCachedScramble([realType, len, rndState(scrFlt[1], getExtra(realType, 1)), neutLevel], detailType);
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

		function next(type) {
			var ret = null;
			while (!ret && remoteScramble.length != 0) {
				ret = remoteScramble.shift();
			}
			if (ret) {
				return ret;
			}
			if (type == 'remoteComp') {
				if (!window['onlinecomp']) {
					remoteFail();
				} else {
					onlinecomp.getScrambles().then(function(ret) {
						if (!parseInput(ret)) {
							remoteFail();
						} else {
							requestAnimFrame(doScrambleIt);
						}
					}, remoteFail);
				}
			} else if (type == 'remoteBattle') {
				if (!window['battle']) {
					remoteFail();
				} else {
					battle.getScrambles().then(function(ret) {
						if (!parseInput(ret)) {
							remoteFail();
						} else {
							requestAnimFrame(doScrambleIt);
						}
					}, remoteFail);
				}
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
		var inputDiv;
		var inputText;
		var puzzleSelect;

		function init() {
			inputDiv = $('<table>');
			inputText = $('<textarea style="width:100%;height:100%;">');
			puzzleSelect = $('<select>');
			var puzzles = ["333", "222so", "444wca", "555wca", "666wca", "777wca", "clkwca", "mgmp", "pyrso", "skbso", "sqrs"];
			for (var i = 0; i < puzzles.length; i++) {
				puzzleSelect.append($('<option>').val(puzzles[i]).html(menu.getValName(puzzles[i])));
			}
			inputDiv.append(
				$('<tr height=0%>').append($('<td>').append(SCRAMBLE_INPUTTYPE + ':', puzzleSelect)),
				$('<tr height=100%>').append($('<td>').append(inputText))
			);
			puzzleSelect.val('333');
		}

		function next() {
			var ret = null;
			while (!ret && inputScramble.length != 0) {
				ret = inputScramble.shift();
			}
			if (ret) {
				return ret;
			}
			if (!puzzleSelect) {
				init();
			}
			inputText.val("");
			kernel.showDialog([inputDiv, inputOK, inputCancel], 'input', SCRAMBLE_INPUT);
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
			var typePrefix = '$T' + puzzleSelect.val() + '$';
			for (var i = 0; i < inputs.length; i++) {
				var s = inputs[i];
				if (s.match(/^\s*$/) == null) {
					s = s.replace(/^\d+[\.\),]\s*/, '');
					if (!scrTPRe.exec(s)) {
						s = typePrefix + s;
					}
					inputScramble.push(s);
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
		if (!scrdata[idx[0]] || !scrdata[idx[0]][1] || !scrdata[idx[0]][1][idx[1]]) {
			idx = [0, 0];
		}
		var len = scrdata[idx[0]][1][idx[1]][2];
		scrLen.val(Math.abs(len));
		scrLen[0].disabled = len <= 0;
		var curType = menu.getSelected();
		if (curType in helpMsg) {
			scrHelp.text(helpMsg[curType]).show();
		} else {
			scrHelp.hide();
		}
		scrFlt = JSON.parse(kernel.getProp('scrFlt', JSON.stringify([curType, getExtra(curType, 0)])));
		scrOpt[0].disabled = scrLen[0].disabled && !getExtra(curType, 0);
		if (scrFlt[0] != curType) {
			scrFlt = [curType, getExtra(curType, 0) && mathlib.valuedArray(getExtra(curType, 0).length, 1)];
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
		var data = getExtra(type, 0);
		if (data) {
			var imgGen = getExtra(type, 2);
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
				var label = $('<label>').append(chkBox, data[i]);
				if (imgGen) {
					var img = $('<img style="display:block;">');
					imgGen(i, img);
					img.width('5em');
					img.height('5em');
					label.append('<br>', img);
					label.addClass('bimg');
				}
				chkLabelList.push(label);
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
					$('<div class="sgrp">').append(
						$('<span>').html(g + ' ' + cntSel(g)), ' | ',
						$('<span class="click">').html(SCROPT_BTNALL).click(function() {
							var g = $(this).parent().parent().attr('data');
							$.each(dataGroup[g], function(idx, val) {
								chkBoxList[val][0].checked = true;
							});
							$(this).parent().children().first().html(g + ' ' + cntSel(g));
						}), ' | ',
						$('<span class="click">').html(SCROPT_BTNNONE).click(function() {
							var g = $(this).parent().parent().attr('data');
							$.each(dataGroup[g], function(idx, val) {
								chkBoxList[val][0].checked = false;
							});
							$(this).parent().children().first().html(g + ' ' + cntSel(g));
						}), ' | ',
						$('<span class="click">[+]</span>').click(function() {
							$(this).parent().next().toggle();
						})),
					$('<div>').append($.map(dataGroup[g], function(val) {
						chkBoxList[val].change(function() {
							var g = $(this).parent().parent().parent().attr('data');
							$(this).parent().parent().parent().find('span:first').html(g + ' ' + cntSel(g));
						});
						return chkLabelList[val];
					})))
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
			var data = getExtra(type, 0);
			if (data) {
				data = mathlib.valuedArray(data.length, 1);
				var hasVal = false;
				for (var i = 0; i < chkBoxList.length; i++) {
					if (!chkBoxList[i][0].checked) {
						data[i] = 0;
					} else {
						hasVal = true;
					}
				}
				if (!hasVal) {
					alert(SCROPT_EMPTYALT);
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
		kernel.showDialog([scrOptDiv, procDialog, null, procDialog], 'scropt', SCROPT_TITLE);
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
				div.css('font-family', value[1] ? 'Monospace' : 'Arial');
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
				div.css('text-align', {'c': 'center', 'l': 'left', 'r': 'right'}[value[1]]);
			} else if (value[0] == 'scrWrap') {
				ssdiv.css('text-wrap', {'n': 'unset', 'b': 'balance'}[value[1]]);
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
			} else if (value[0] == 'scrNeut') {
				neutLevel = ~~value[1];
				if (value[2] == 'modify') {
					genScramble();
				}
			} else if (value[0] == 'scrEqPr') {
				scrMgr.setEqPr(~~value[1]);
			} else if (value[0] == 'scrClk') {
				ssdiv.css('cursor', {
					'n': 'default',
					'c': 'copy',
					'+': 'pointer'
				}[value[1]]);
				if (value[1] == 'n') {
					ssdiv.removeClass('noselect');
				} else {
					ssdiv.addClass('noselect');
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
		} else if (signal == 'scrfix') {
			if (!value) {
				return;
			}
			sdiv.html(scrStd(type, value, len, true, true));
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
		var downclk = $('<span class="click">').html('Download');
		tdiv.append(SCRGEN_NSCR, scrNum, "&nbsp;", SCRGEN_PRE).append(prefix, "<br>", button, ' | ', downclk, "<br>", output);
		var genScrambles = "";

		function generate() {
			var n_scramble = ~~scrNum.val();
			genScrambles = "";
			var scramble_copy = scramble;
			var pre = prefix.val();
			for (var i = 0; i < n_scramble; i++) {
				calcScramble();
				genScrambles += pre.replace('1', i + 1) + scramble + "\n";
			}
			scramble = scramble_copy;
			output.text(genScrambles);
			$.clipboardCopy(genScrambles).then(
				logohint.push.bind(logohint, LGHINT_SCRCOPY),
				logohint.push.bind(logohint, 'Copy Failed')
			);
			output.select();
		}

		function downClk(e) {
			if (!genScrambles) {
				return;
			}
			var blob = new Blob([genScrambles], {'type': 'text/plain'});
			var outFile = $('<a class="click"/>').appendTo('body');
			outFile.attr('href', URL.createObjectURL(blob));
			outFile.attr('download', 'Scrambles_' + mathlib.time2str(new Date()/1000, '%Y%M%D_%h%m%s') + '.txt');
			outFile[0].click();
			outFile.remove();
		}

		return function(fdiv) {
			if (!fdiv) {
				return;
			}
			fdiv.empty().append(tdiv.width(div.width() / 2));
			prefix.unbind("change").change(kernel.blur);
			button.unbind("click").click(generate);
			downclk.unbind("click").click(downClk);
		}
	})();

	var rndState = scrMgr.rndState;

	$(function() {
		kernel.regListener('scramble', 'time', procSignal);
		kernel.regListener('scramble', 'property', procSignal, /^scr(?:Size|Mono|Type|Lim|Align|Wrap|Fast|KeyM|Hide|Neut|EqPr|Clk)$/);
		kernel.regListener('scramble', 'button', procSignal, /^scramble$/);
		kernel.regListener('scramble', 'ctrl', procSignal, /^scramble$/);
		kernel.regListener('scramble', 'scrfix', procSignal);
		kernel.regProp('scramble', 'scrSize', 2, PROPERTY_SCRSIZE, [15, 5, 50], 1);
		kernel.regProp('scramble', 'scrASize', 0, PROPERTY_SCRASIZE, [true], 1);
		kernel.regProp('scramble', 'scrMono', 0, PROPERTY_SCRMONO, [true], 1);
		kernel.regProp('scramble', 'scrLim', 0, PROPERTY_SCRLIM, [false], 1);
		kernel.regProp('scramble', 'scrAlign', 1, PROPERTY_SCRALIGN, ['c', ['c', 'l', 'r'], PROPERTY_SCRALIGN_STR.split('|')], 1);
		kernel.regProp('scramble', 'scrWrap', 1, PROPERTY_SCRWRAP, ['b', ['b', 'n'], PROPERTY_SCRWRAP_STR.split('|')], 1);
		kernel.regProp('scramble', 'preScr', 1, "pre-scramble", ['',
			["", "y", "y2", "y'", "z2", "z2 y", "z2 y2", "z2 y'", "z'", "z' y", "z' y2", "z' y'", "z", "z y", "z y2", "z y'", "x'", "x' y", "x' y2", "x' y'", "x", "x y", "x y2", "x y'"],
			["(UF)", "(UR) y", "(UB) y2", "(UL) y'", "(DF) z2", "(DL) z2 y", "(DB) z2 y2", "(DR) z2 y'", "(RF) z'", "(RD) z' y", "(RB) z' y2", "(RU) z' y'", "(LF) z", "(LU) z y", "(LB) z y2", "(LD) z y'", "(BU) x'", "(BR) x' y", "(BD) x' y2", "(BL) x' y'", "(FD) x", "(FR) x y", "(FU) x y2", "(FL) x y'"]
		], 1);
		kernel.regProp('scramble', 'preScrT', 1, "training pre-scramble", ['z2',
			["", "y", "y2", "y'", "z2", "z2 y", "z2 y2", "z2 y'", "z'", "z' y", "z' y2", "z' y'", "z", "z y", "z y2", "z y'", "x'", "x' y", "x' y2", "x' y'", "x", "x y", "x y2", "x y'"],
			["(UF)", "(UR) y", "(UB) y2", "(UL) y'", "(DF) z2", "(DL) z2 y", "(DB) z2 y2", "(DR) z2 y'", "(RF) z'", "(RD) z' y", "(RB) z' y2", "(RU) z' y'", "(LF) z", "(LU) z y", "(LB) z y2", "(LD) z y'", "(BU) x'", "(BR) x' y", "(BD) x' y2", "(BL) x' y'", "(FD) x", "(FR) x y", "(FU) x y2", "(FL) x y'"]
		], 1);
		kernel.regProp('scramble', 'scrNeut', 1, PROPERTY_SCRNEUT, ['n', ['n', '1', '2', '6'], PROPERTY_SCRNEUT_STR.split('|')], 1);
		kernel.regProp('scramble', 'scrEqPr', 1, PROPERTY_SCREQPR, ['0', ['0', '1', '2'], PROPERTY_SCREQPR_STR.split('|')], 1);
		kernel.regProp('scramble', 'scrFast', 0, PROPERTY_SCRFAST, [false]);
		kernel.regProp('scramble', 'scrKeyM', 0, PROPERTY_SCRKEYM, [false], 1);
		kernel.regProp('scramble', 'scrClk', 1, PROPERTY_SCRCLK, ['c', ['n', 'c', '+'], PROPERTY_SCRCLK_STR.split('|')], 1);
		kernel.regProp('scramble', 'scrType', ~5, 'Scramble Type', ['333'], 3);

		scrLen.change(genScramble);
		scrOpt.click(showScrOpt);
		scrOptDiv.append($('<div>').append(SCRAMBLE_LENGTH + ': ', scrLen), scrHelp, scrFltDiv);

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
		pushScramble: pushScramble,
		setCacheEnable: setCacheEnable
	}
}, [mathlib.rn, mathlib.rndEl]);
