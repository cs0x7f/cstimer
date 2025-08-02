"use strict";

var kernel = execMain(function() {
	$.ajaxSetup({'cache':true});

	var temp = $('<div />').css('visibility', 'hidden');
	var wndCtn = $('<div id="wndctn" />');

	/**
	 * {signal:{ module: [callback(signal, value), value[0]filter], ...}, ...}
	 */
	var listeners = {};

	function pushSignal(signal, value) {
		DEBUG && console.log('[signal]', signal, value);
		if (listeners[signal] != undefined) {
			for (var module in listeners[signal]) {
				//TODO if module is enabled or disabled
				if (listeners[signal][module][1] === undefined || listeners[signal][module][1].exec(value[0])) {
					listeners[signal][module][0](signal, value);
				}
			}
		}
	}

	function regListener(module, signal, callback, filter) {
		if (listeners[signal] == undefined) {
			listeners[signal] = {};
		}
		listeners[signal][module] = [callback, filter];
	}

	var property = (function() {

		var properties = {};//{key: value}

		var defaultProps = {};

		/**
		 * {module: {key: [form, type, discribe, values]}}
		 * values:
		 *	0 -- bool -- [default]
		 *	1 -- sel  -- [default, [val1, val2, ...], [str1, str2, ...]]
		 *	2 -- intI -- [default, min, max]
		 *	3 -- color-- [default]
		 */
		var proSets = {};

		/**
		 * {module: [leftDiv, rightDiv]}
		 */
		var subDivs = {};
		var isDivOut = true;

		var scrollDiv = $('<div class="noScrollBar">');
		var optTable = $('<table class="opttable">');

		function resetPropertyes() {
			for (var key in defaultProps) {
				var newVal = defaultProps[key];
				if (newVal !== undefined && getProp(key) !== newVal && !key.startsWith('session')) {
					delete properties[key];
					pushSignal('property', [key, newVal, 'reset']);
				}
			}
		}

		var table = $('<table class="options" />');
		var left = $('<td />');
		var right = $('<td />').addClass('tabValue');
		table.append($('<tr />').append(left, right.append(scrollDiv.append(optTable))));

		var selectedTab = 0;
		var prevScrollTop = 0;

		function tabClick() {
			var module = $(this).data('module');
			switchLeftModule(module);
			scrollToModule(module);
		}

		function switchLeftModule(module) {
			if (!subDivs[module][0].hasClass('enable')) {
				for (var m in subDivs) {
					subDivs[m][0].removeClass('enable');
				}
				subDivs[module][0].addClass('enable');
				selectedTab = module;
			}
		}

		function scrollToModule(module) {
			setTimeout(function() {
				scrollDiv.scrollTop(module ? scrollDiv.scrollTop() + subDivs[module][1].position().top - 3 : prevScrollTop);
			}, 0);
		}

		function onOptScroll() {
			prevScrollTop = scrollDiv.scrollTop();
			var curModule = 'kernel';
			for (var m in subDivs) {
				if (subDivs[m][1].position().top > 50) {
					continue;
				}
				curModule = m;
			}
			switchLeftModule(curModule);
		}

		var DEFAULT_HELP_SPAN = ' [?] ';

		function procClick(e) {
			var target = $(this);
			var key = target.prop('name');
			if (target.is('.opthelp')) {
				if (target.html() == DEFAULT_HELP_SPAN) {
					target.html('<br>' + DEFAULT_HELP_SPAN + $('strong[data="opt_' + target.attr('data') + '"]').parent().html().split('</strong>. ')[1]);
				} else {
					target.html(DEFAULT_HELP_SPAN);
				}
			} else if (target.is('select')) {
				setProp(key, target.val());
			} else {
				switch (target.prop('type')) {
				case 'checkbox':
					setProp(key, target.prop('checked'));
					break;
				case 'color':
					if (!target.attr('data')) {
						setProp(key, target.val());
					} else {
						var idx = ~~target.attr('data') * 4 - 4;
						var val = getProp(key);
						setProp(key, [val.slice(0, idx), $.nearColor(target.val()), val.slice(idx + 4)].join(''));
					}
					break;
				case 'text':
				case 'button':
					for (var module in proSets) if (key in proSets[module]) {
						var obj = proSets[module][key];
						var newVal = getProp(key);
						switch (target.val()) {
						case '+': newVal = Math.min(newVal+1, obj[3][2]); break;
						case '-': newVal = Math.max(newVal-1, obj[3][1]); break;
						default:
							if (target.val().match(/^\d+$/)) {
								newVal = +target.val().match(/^0*(.+)$/)[1];
								newVal = Math.max(Math.min(newVal, obj[3][2]), obj[3][1]);
							}
						}
						obj[0].val(newVal);
						setProp(key, newVal);
						break;
					}
				}
			}
		}

		var moduleIcon = {
			"kernel": '\ue8ce',
			"ui": '\ue60d',
			"color": '\ueae9',
			"timer": '\ue6b6',
			"scramble": '\ue900',
			"stats": '\ue9bb',
			"tools": '\ue993',
			"vrc": '\ue69d'
		};

		function generateDiv() {
			subDivs = {};
			left.empty();
			optTable.empty();
			scrollDiv.unbind('scroll').scroll(onOptScroll);
			for (var module in MODULE_NAMES) {
				if (selectedTab === 0) {
					selectedTab = module;
				}
				var curDiv = subDivs[module] = [$('<div>'), $('<tr>')];
				curDiv[0].html('<span class="icon" style="font-size:1em;">' + moduleIcon[module] + '</span><span>' + MODULE_NAMES[module] + '</span>').addClass('tab').data('module', module).click(tabClick).appendTo(left);
				curDiv[1].append(
					$('<th>').html('<span class="icon">' + moduleIcon[module] + '</span> ' + MODULE_NAMES[module].replace(/-?<br>-?/g, '')),
					$('<th class="sr">').html(PROPERTY_SR),
					$('<th class="sr">').html('<span class="icon">\ue9bb</span>')
				);
				optTable.append(curDiv[1]);

				for (var key in proSets[module]) {
					var proSet = proSets[module][key];
					var curVal = getProp(key);
					var type = proSet[1];

					var srChecked = getProp('sr_' + key);
					var srTd = $('<td class="sr">');
					if (proSet[4] & 1) {
						srTd.append($('<input type="checkbox" name="sr_' + key + '"' + (srChecked ? ' checked' : '') + '>').click(procClick));
					}
					var valTd = $('<td colspan=2>');

					if (type < 0) {
						if ($.urlParam('debug')) {
							type = ~type;
						} else {
							continue;
						}
					}

					if (type == 0) { //checkbox
						proSet[0] = $('<input type="checkbox" name="' + key + '">').prop('checked', curVal).click(procClick);
						valTd.append($('<label>').append(proSet[0], proSet[2]));
					} else if (type == 1) { //select
						proSet[0] = $('<select name="' + key + '">');
						var vals = proSet[3][1];
						var strs = proSet[3][2];
						for (var i = 0; i < vals.length; i++) {
							proSet[0].append($('<option />').val(vals[i]).html(strs[i]));
						}
						proSet[0].val(curVal);
						proSet[0].change(procClick);
						valTd.append(proSet[2], ': ', proSet[0]);
					} else if (type == 2) { //range
						proSet[0] = $('<input type="text" maxlength="4" name="' + key + '">').val(curVal).change(procClick);
						var inc = $('<input type="button" style="width: 1.5em;" value="+" name="' + key + '">').click(procClick);
						var dec = $('<input type="button" style="width: 1.5em;" value="-" name="' + key + '">').click(procClick);
						valTd.append(proSet[2] + '(' + proSet[3][1] + '~' + proSet[3][2] + ')', $('<span>').css('white-space', 'nowrap').append(dec, proSet[0], inc));
					} else if (type == 3) { //color
						proSet[0] = $('<input type="color" name="' + key + '">').val(curVal).change(procClick);
						valTd.append(proSet[2], ': ', proSet[0]);
					} else if (type == 4) { //multiple colors
						var val = curVal.match(/#[0-9a-fA-F]{3}/g) || [];
						proSet[0] = $('<input type="text" name="' + key + '" style="display:none">').val(curVal);
						var colorsInput = [];
						for (var i = 0; i < val.length; i++) {
							colorsInput.push($('<input type="color" name="' + key + '" data="' + (i + 1) + '" class="mulcolor">').val($.nearColor(val[i], 0, true)).change(procClick));
						}
						valTd.append(proSet[2], ': ', proSet[0], colorsInput);
					} else if (type == 5) { //internal
						if ($.urlParam('debug')) {
							proSet[0] = $('<input type="text" name="' + key + '" readonly>').val(curVal);
							valTd.append(proSet[2] + ' (' + key + '): ', proSet[0]);
						} else {
							proSet[0] = $('<input type="text" name="' + key + '" style="display:none">').val(curVal);
							valTd.append(proSet[2], proSet[0]);
						}
					}
					if ($('strong[data="opt_' + key + '"]').length > 0) {
						valTd.append($('<span class="click opthelp" data="' + key + '"/>').html(DEFAULT_HELP_SPAN).click(procClick));
					}
					optTable.append($('<tr>').append(valTd, srTd));
				}
			}
			optTable.append($('<tr style="height: 10em;">'));
			subDivs[selectedTab][0].click();
		}

		function showDiv() {
			if (isDivOut) {
				generateDiv();
				isDivOut = false;
			}
			$('.opthelp').html(DEFAULT_HELP_SPAN);
			scrollToModule();

			ui.showDialog([table, $.noop, undefined, $.noop, [RESET_LANG, function(){
				if ($.confirm("Are you sure to reset all options?")) {
					return false;
				}
				resetPropertyes();
				generateDiv();
				return false;
			}], [BUTTON_EXPORT.replace(/-?<br>-?/g, ''), exportFunc.exportProperties]], 'option', BUTTON_OPTIONS.replace(/-?<br>-?/g, ''), function() {
				right.find('select[name="lang"]').focus().blur();
				scrollToModule();
			});
			return;
		}

		function getProp(key, set) {
			if (set != undefined && defaultProps[key] == undefined) {
				defaultProps[key] = set;
				pushSignal('property', [key, getProp(key), 'set']);
			}
			if (properties[key] === defaultProps[key]) {
				delete properties[key];
			}
			return (key in properties) ? properties[key] : defaultProps[key];
		}

		function setProp(key, value, signalType) {
			for (var module in proSets) {
				if (key in proSets[module] && proSets[module][key][0] !== undefined && proSets[module][key][0].val() != value) {
					proSets[module][key][0].val(value);
					break;
				}
			}
			if (getProp(key) !== value) {
				properties[key] = value;
				pushSignal('property', [key, getProp(key), signalType || 'modify']);
			}
		}

		function regProp(module, key, type, discribe, values, sessionRelated) {
			isDivOut = true;
			if (proSets[module] == undefined) {
				proSets[module] = {};
			}
			proSets[module][key] = [undefined, type, discribe, values, sessionRelated];
			defaultProps[key] = values[0];
			defaultProps['sr_' + key] = (sessionRelated & 2) == 2;
			pushSignal('property', [key, getProp(key), 'set']);
		}

		function getSProps() {
			var ret = {};
			for (var key in properties) {
				if (key.indexOf('sr_') == 0 || !getProp('sr_' + key, false)) {
					continue;
				}
				ret[key] = getProp(key);
			}
			return ret;
		}

		function setSProps(val) {
			for (var key in defaultProps) {
				if (key.indexOf('sr_') == 0 || !getProp('sr_' + key, false)) {
					continue;
				}
				if (key in val) {
					setProp(key, val[key], 'session');
				} else {
					setProp(key, defaultProps[key], 'session');
				}
			}
		}

		function save() {
			localStorage['properties'] = JSON.stringify(properties);
		}

		function load() {
			var proStr = localStorage['properties'];
			if (proStr != undefined && proStr != '') {
				properties = JSON.parse(proStr);
			}
		}

		$(function() {
			load();
			ui.addButton('property', BUTTON_OPTIONS, showDiv, 1);
			regListener('property', 'property', save);
		});

		return {
			get : getProp,
			set : setProp,
			reg : regProp,
			getSProps: getSProps,
			setSProps: setSProps,
			load : load,
			reload: generateDiv
		};
	})();

	var getProp = property.get;
	var setProp = property.set;
	var regProp = property.reg;

	$(function() {
		var curLang = LANG_CUR || 'en-us';
		regProp('kernel', 'lang', 1, 'Language', [curLang, (LANG_SET + '|h').split('|').slice(1), (LANG_STR + '|help translation').split('|')]);
		setProp('lang', curLang);
		regProp('kernel', 'showad', 0, PROPERTY_SHOWAD, [true]);
		regListener('kernel', 'property', function(signal, value) {
			if (value[1] == curLang || value[2] != "modify") {
				return;
			} else if (value[1] == 'h') {
				if ($.confirm('Press OK to redirect to crowdin for translating cstimer')) {
					window.location.href = 'https://crowdin.com/project/cstimer';
				}
			} else {
				window.location.href = '?lang=' + value[1];
			}
			setProp('lang', curLang);
		}, /^lang$/);
		if ($.urlParam('lang')) {
			var langParam = "lang=" + $.urlParam('lang');
			document.cookie = langParam + "; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
			$.clearUrl('lang');
		}
	});

	var ui = (function() {

		var modules = {};//{module: {button: enable/disable, div: divObj, auto: autohide/none}}
		var isHide = false;
		var isPopup = false;
		var gray;
		var leftbar;

		function addButton(module, button, callback, index) {
			leftbar = leftbar || $('#leftbar');
			leftbar.children('.c' + index).click(callback).find('span:first').html(button);
		}

		function windowClick() {
			var mybutton = $(this);
			var module = mybutton.data('module');
			if (modules[module].button) {//enable
				mybutton.removeClass("enable");
				if (!isHide || !modules[module].auto) {
					modules[module].div.stop(true, true).fadeOut(200, (function(module) {
						return function() {pushSignal('button', [module, false]);};
					})(module));
				}
			} else {
				mybutton.addClass("enable");
				pushSignal('button', [module, true]);
				modules[module].div.stop(true, true).fadeIn(200);
				if (isHide && modules[module].auto) {
					modules[module].div.hide();
				}
			}
			modules[module].button = !modules[module].button;
			setProp(module, modules[module].button);
		}

		var hideMap = {
			'scramble': 'scrHide',
			'tools': 'toolHide',
			'stats': 'statHide'
		};

		function toggleHide() {
			var data = $(this).attr('data');
			setProp(data, !getProp(data, false));
		}

		function addWindow(module, button, div, enable, auto, index) {
			div.appendTo(wndCtn);
			div.addClass("mywindow");
			div.append($('<span class="chide" data="' + hideMap[module] + '"></span>').click(toggleHide));
			enable = getProp(module, enable);
			leftbar = leftbar || $('#leftbar');
			leftbar.children('.c' + index).addClass(enable ? "enable" : "").data('module', module).click(windowClick).find('span:first').html(button);
			modules[module] = {button: enable, div: div, auto: auto};
			enable ? div.show() : div.hide();
			pushSignal('button', [module, enable]);
		}

		/**
		 * value = [obj, ok, cancel, gray, [name, bool click()]]
		 */
		var dialog = $('<div class="dialog">');
		var title = $('<div class="title">');
		var value = $('<div class="value">');
		var buttons = $('<div class="button">');
		var OK = $('<input type="button" class="buttonOK">').val(OK_LANG);
		var CAN = $('<input type="button" class="buttonOK">').val(CANCEL_LANG);
		dialog.append(
			$('<table>').append(
				$('<tr style="height:0%;">').append(
					$('<td>').append(title)
				),
				$('<tr style="height:100%;">').append(
					$('<td style="position:relative;">').append(value)
				),
				$('<tr style="height:0%;">').append(
					$('<td>').append(buttons)
				)
			)
		);

		var fullButton = $('<span style="position:absolute;left:0.5em" class="click">&nbsp;\u21f1&nbsp;</span>');
		var refreshButton = $('<span style="float:left;" class="click">&nbsp;\u21bb&nbsp;</span>');

		function toggleFullScreen() {
			if (!document.fullscreenElement) {
				var obj = $('body')[0];
				obj.requestFullscreen && obj.requestFullscreen();
			} else {
				document.exitFullscreen && document.exitFullscreen();
			}
		}

		// values = [elemToPopup, callbackOk, callbackCancel, callbackGray, extraButton1, extraButton2, ...]
		// callback: when popped up
		// callback(Ok|Cancel|Gray): undefined => no such button (keep dialog open), $.noop => empty callback (hide the dialog)
		// extraButton: [text, callbackWhenClicked]
		function showDialog(values, diagclass, titlestr, callback) {
			isPopup = true;
			dialog.removeClass().addClass('dialog').addClass('dialog' + diagclass);
			title.html(titlestr);
			if (diagclass == 'option') {
				title.prepend(fullButton.unbind('click').click(toggleFullScreen));
			} else if (diagclass == 'logo') {
				title.prepend(refreshButton.unbind('click').click(function() {
					location.reload(true);
				}));
			}
			value.children().appendTo(temp);
			values[0].appendTo(value.empty());
			buttons.empty();
			if (values[1] != undefined) {
				buttons.append(OK.unbind("click").click(function() {
					$.waitUser.call();
					values[1] && values[1]();
					hideDialog();
				}));
			}
			if (values[2] != undefined) {
				buttons.append(CAN.unbind("click").click(function() {
					$.waitUser.call();
					values[2] && values[2]();
					hideDialog();
				}));
			}
			gray.unbind("click");
			if (values[3] != undefined) {
				gray.click(function() {
					$.waitUser.call();
					values[3] && values[3]();
					hideDialog();
				});
			}
			for (var i=4; i<values.length; i++) {
				buttons.append($('<input type="button" class="buttonOK">').val(values[i][0]).unbind("click").click((function(func) {
					return function() {
						$.waitUser.call();
						if (func()) {
							hideDialog();
						}
					};
				})(values[i][1])));
			}

			dialog.stop(true, true).fadeTo(100, 0.98, function() {
				values[0].focus();
				callback && callback();
			});
			gray.stop(true, true).fadeIn(100, function(diagclass) {
				pushSignal('dialog', diagclass);
			}.bind(null, diagclass));
		}

		function hideDialog() {
			dialog.stop(true, true).fadeOut(100, function() {
				if (isPopup) {
					return;
				}
				value.children().appendTo(temp);
				dialog.removeClass();
				refocus();
			});
			pushSignal('dialog', null);
			gray.hide();
			isPopup = false;
		}

		function hide() {
			if (isHide) {
				return;
			}
			isHide = true;
			toggleLeftBar();
			for (var module in modules) {
				if (modules[module].auto && modules[module].button) {
					modules[module].div.stop(true, true).fadeOut(100);
				}
			}
			pushSignal('ashow', false);
		}

		function show() {
			if (!isHide) {
				return;
			}
			isHide = false;
			toggleLeftBar();
			for (var module in modules) {
				if (modules[module].auto && modules[module].button) {
					modules[module].div.stop(true, true).fadeIn(100);
				}
			}
			pushSignal('ashow', true);
		}

		function toggleLeftBar(show) {
			var avail = false;
			for (var module in modules) {
				if (modules[module].button) {
					avail = true;
					break;
				}
			}
			if (avail && !isHide || show || $.fx.off) {
				leftbar.stop(true, true).fadeTo(200, 1);
			} else {
				leftbar.stop(true, true).fadeTo(200, 0.01);
			}
		}

		function isDialogShown(diagclass) {
			return dialog.hasClass('dialog' + diagclass);
		}

		var colorTag = $('<style>').appendTo('head');

		var csstmp =
			"html,body,textarea,#leftbar{color:?;background-color:?}" +
			".smrtScrCur{color:?;background-color:?}" +
			"#leftbar{border-color:?}" +
			"#logo,#astouch>span{color:?;border-color:?;background-color:?}" +
			".mybutton,.tab,.cntbar{border-color:?}" +
			"html:not(.m) .mybutton:hover,.mybutton:active,.tab:active,.mywindow,.popup,.dialog{background-color:?}" +
			".mybutton.enable,.tab.enable,.cntbar,.selected,table.opttable tr th:first-child,div.helptable h2,div.helptable h3,.sflt div.sgrp{background-color:?}" +
			"#gray{background-color:?4}" +
			"html:not(.m) .times:hover,html:not(.m) .click:hover,.times:active,.click:active,textarea{background-color:?}" +
			".click{color:?}" +
			".mywindow,.popup,.dialog,.table,.table td,.table th,textarea,.tabValue,.opttable td.sr,.sflt .bimg{border-color:?}" +
			"html:not(.m) #avgstr .click:hover,#avgstr .click:active{background-color:?}" +
			"select,input[type='button'],input[type='text']{color:?;background:?;border-color:?}" +
			"input:disabled,table.opttable tr:nth-child(odd) td:first-child,div.helptable li:nth-child(odd){background:?}" +
			".times.pb{color:?}" +
			".mywindow::before,.popup,.dialog,#leftbar::before";
		csstmp = [
			csstmp + "{box-shadow:0 0 .6em ?}",
			csstmp + "{box-shadow:none}"
		];

		var styles = [
			"#000#efc#fdd#fbb#00f#ff0#000",
			"#000#ffe#ff9#ff0#00f#fa0#000",
			"#fff#600#668#408#ccf#0ff#000",
			"#fff#000#555#888#aaa#000#aaa",
			"#000#fff#ccc#ddd#555#fff#888",
			"#fff#227#9c3#563#580#dad#000",
			"#9aa#023#034#b80#28d#678#034",
			"#678#ffe#eed#ffe#28d#678#eed"
		];


		// var cur_color = ["#000", "#efc", "#cda", "#ff0", "#dd0", "#000", "#dbb", "#fdd", "#fbb", "#000", "#dbb", "#00f", "#dbb"];
		var cur_color = ["#000", "#efc", "#fdd", "#fbb", "#dbb", "#ff0", "#000", "#f40"];
		var col_map = [0, 1, 2, 0, 1|0x220, 5, 5|0x220, 6, 2|0x220, 2, 3, 0, 2|0x220, 4, 2|0x220, 1|0x220, 0, 2|0xef0, 2|0x220, 2|0x110, 7, 0];
		var col_props = ['font', 'back', 'board', 'button', 'link', 'logo', 'logoback', 'pbs'];

		function useColorTemplate(value) {
			if (value.length == 28) {
				value += "#f40";
			}
			for (var i = 0; i < 8; i++) {
				cur_color[i] = $.nearColor(value.substr(i * 4, 4));
			}
			setProp('col-font', $.nearColor(cur_color[0], 0, true));
			setProp('col-back', $.nearColor(cur_color[1], 0, true));
			setProp('col-board', $.nearColor(cur_color[2], 0, true));
			setProp('col-button', $.nearColor(cur_color[3], 0, true));
			setProp('col-link', $.nearColor(cur_color[4], 0, true));
			setProp('col-logo', $.nearColor(cur_color[5], 0, true));
			setProp('col-logoback', $.nearColor(cur_color[6], 0, true));
			setProp('col-pbs', $.nearColor(cur_color[7], 0, true));
			releaseColor();
		}

		function setColor(idx, val) {
			val = $.nearColor(val);
			if (cur_color[idx] == val) {
				return;
			}
			cur_color[idx] = val;
			setProp('color', 'u');
			releaseColor();
		}

		function releaseColor() {
			var cssval = getProp('uidesign') == 'ns' || getProp('uidesign') == 'mtns' ? csstmp[1] : csstmp[0];
			var sgn = $.nearColor(cur_color[0]) == '#000' ? -1: 1;
			for (var i = 0; i < col_map.length; i++) {
				var stdcolor = $.nearColor(cur_color[col_map[i] & 0xf], (col_map[i] << 20 >> 24) * sgn);
				cssval = cssval.replace('?', stdcolor);
			}
			if (colorTag[0].styleSheet) {
				colorTag[0].styleSheet.cssText = cssval;
			} else {
				colorTag[0].innerHTML = cssval;
			}
		}

		function importColor(val) {
			var colstr_re = /^\s*((#[0-9a-fA-F]{3}){7,8})\s*$/;
			var m = colstr_re.exec(val);
			if (m) {
				useColorTemplate(m[1]);
				return true;
			} else {
				return false;
			}
		}

		function exportColor() {
			return cur_color.join('');
		}

		var isMobileView = false;

		function updateUIDesign() {
			$('html').removeClass('mtds cspt');
			if (getProp('uidesign') == 'mt' || getProp('uidesign') == 'mtns') {
				$('html').addClass('mtds');
			} else if (getProp('uidesign') == 'cspt') {
				$('html').addClass('cspt');
			}
		}

		function fixOrient() {
			var width = $(window).width();
			var height = $(window).height();
			var view = getProp('view');
			if (view == 'm') {
				isMobileView = true;
			} else if (view == 'd') {
				isMobileView = false;
			} else {
				isMobileView = width / height < 6/5;
			}
			if (isMobileView) {
				$('html').addClass('m');
			} else {
				$('html').removeClass('m');
			}
		}

		function procSignal(signal, value) {
			if (signal == 'property') {
				switch (value[0]) {
				case 'color':
					if (value[1] == 'u') {//user defined
						return;
					} else if (value[1] == 'i' || value[1] == 'e') {
						var val = exportColor();
						var ret = prompt(EXPORT_CODEPROMPT, val);
						if (ret && ret != val && !importColor(ret)) {
							$.alert(COLOR_FAIL);
						}
						property.set('color', 'u');
					} else {
						useColorTemplate(styles[value[1] == 'r' ? ~~(Math.random() * styles.length) : (value[1] - 1)]);
					}
					break;
				case 'font':
					if (value[1] == 'r') {
						$('#container, #multiphase').css('font-family', ['lcd', 'lcd2', 'lcd3', 'lcd4', 'lcd5'][~~(Math.random() * 5)]);
					} else {
						$('#container, #multiphase').css('font-family', value[1]);
					}
					break;
				case 'col-font':
				case 'col-back':
				case 'col-board':
				case 'col-button':
				case 'col-link':
				case 'col-logo':
				case 'col-logoback':
				case 'col-pbs':
					setColor(col_props.indexOf(value[0].substring(4, value[0].length)), value[1]);
					break;
				case 'zoom':
					$('html').removeClass('p70 p80 p90 p100 p110 p125 p150').addClass('p' + ~~(value[1] * 100));
					$(window).trigger('resize');
					updateUIDesign();
				case 'view':
					fixOrient();
					break;
				case 'uidesign':
					updateUIDesign();
					releaseColor();
					break;
				case 'wndScr':
					setWndFixed('scramble', value[1] == 'f');
					break;
				case 'wndStat':
					setWndFixed('stats', value[1] == 'f');
					break;
				case 'wndTool':
					setWndFixed('tools', value[1] == 'f');
					break;
				default:
				}
			}
		}

		function setWndFixed(module, fixed) {
			if (!modules[module]) {
				$(setWndFixed.bind(undefined, module, fixed));
				return;
			}
			if (fixed) {
				modules[module].div.addClass('fixed');
			} else {
				modules[module].div.removeClass('fixed');
			}
		}

		function hashChange() {
			if (importColor(window.location.hash)) {
				property.set('color', 'u');
				$.clearHash();
			}
		}

		$(function() {
			gray = $('#gray');
			regListener('ui', 'property', procSignal, /^(?:color|font|col-.+|zoom|view|uidesign|wnd(?:Scr|Stat|Tool))/);
			regProp('ui', 'zoom', 1, ZOOM_LANG, ['1', ['0.7', '0.8', '0.9', '1', '1.1', '1.25', '1.5'], ['70%', '80%', '90%', '100%', '110%', '125%', '150%']], 1);
			regProp('ui', 'font', 1, PROPERTY_FONT, ['lcd', ['r', 'Arial', 'lcd', 'lcd2', 'lcd3', 'lcd4', 'lcd5', 'Roboto'], PROPERTY_FONT_STR.split('|').concat('Roboto')]);
			regProp('kernel', 'ahide', 0, PROPERTY_AHIDE, [true], 1);
			regProp('ui', 'uidesign', 1, PROPERTY_UIDESIGN, ['n', ['n', 'mt', 'ns', 'mtns', 'cspt'], PROPERTY_UIDESIGN_STR.split('|').concat('csTimer+')]);
			regProp('ui', 'view', 1, PROPERTY_VIEW, ['a', ['a', 'm', 'd'], PROPERTY_VIEW_STR.split('|')]);
			regProp('color', 'color', 1, PROPERTY_COLOR, ['1', ['u', 'e', 'r', '1', '2', '3', '4', '5', '6', '7', '8'], PROPERTY_COLOR_STR.split('|')]);
			var parr = PROPERTY_COLORS.split('|');
			regProp('color', 'col-font', 3, parr[0], ['#000000']);
			regProp('color', 'col-back', 3, parr[1], ['#eeffcc']);
			regProp('color', 'col-board', 3, parr[2], ['#ffdddd']);
			regProp('color', 'col-button', 3, parr[3], ['#ffbbbb']);
			regProp('color', 'col-link', 3, parr[4], ['#0000ff']);
			regProp('color', 'col-logo', 3, parr[5], ['#ffff00']);
			regProp('color', 'col-logoback', 3, parr[6], ['#000000']);
			regProp('color', 'col-pbs', 3, 'PBs', ['#ff4400']);
			regProp('color', 'col-timer', 4, 'Timer', ['#f00#0d0#dd0#080#f00']);
			regProp('color', 'colcube', 4, 'Cube', ['#ff0#fa0#00f#fff#f00#0d0']);
			regProp('color', 'colpyr', 4, 'Pyraminx', ['#0f0#f00#00f#ff0']);
			regProp('color', 'colskb', 4, 'Skewb', ['#fff#00f#f00#ff0#0f0#f80']);
			regProp('color', 'colmgm', 4, 'Megaminx', ['#fff#d00#060#81f#fc0#00b#ffb#8df#f83#7e0#f9f#999']);
			regProp('color', 'colsq1', 4, 'SQ1', ['#ff0#f80#0f0#fff#f00#00f']);
			regProp('color', 'colclk', 4, 'Clock', ['#f00#37b#5cf#ff0#850']);
			regProp('color', 'col15p', 4, '15 Puzzle', ['#f99#9f9#99f#fff']);
			regProp('color', 'colfto', 4, 'FTO', ['#fff#808#0d0#f00#00f#bbb#ff0#fa0']);
			regProp('color', 'colico', 4, 'ICO', ['#fff#084#b36#a85#088#811#e71#b9b#05a#ed1#888#6a3#e8b#a52#6cb#c10#fa0#536#49c#ec9']);

			regProp('ui', 'wndScr', 1, PROPERTY_WNDSCR, ['n', ['n', 'f'], PROPERTY_WND_STR.split('|')]);
			regProp('ui', 'wndStat', 1, PROPERTY_WNDSTAT, ['n', ['n', 'f'], PROPERTY_WND_STR.split('|')]);
			regProp('ui', 'wndTool', 1, PROPERTY_WNDTOOL, ['n', ['n', 'f'], PROPERTY_WND_STR.split('|')]);

			leftbar.appendTo(wndCtn).mouseenter(function() {
				toggleLeftBar(true);
			}).mouseleave(function() {
				toggleLeftBar();
			});//.delay(3000).fadeTo(100, 0.1);
			setTimeout(toggleLeftBar, 3000);
			dialog.appendTo('body');
			$(window).resize(fixOrient);
			$(window).bind('hashchange', hashChange);
			hashChange();
			if (location.protocol != 'https:') {
				document.title = '[UNSAFE] ' + document.title;
			}
			if (navigator.wakeLock && navigator.wakeLock.request) {
				var requestWakeLock = function () {
					if (document.visibilityState != 'visible') {
						return;
					}
					navigator.wakeLock.request('screen').then(function (lock) {
						DEBUG && console.log('[ui]', 'Screen Wake Lock is active');
						lock.addEventListener('release', function () {
							DEBUG && console.log('[ui]', 'Screen Wake Lock is released');
						});
					});
				};
				requestWakeLock();
				document.addEventListener('visibilitychange', requestWakeLock);
			}
		});

		return {
			addWindow: addWindow,
			addButton: addButton,
			showDialog: showDialog,
			hideDialog: hideDialog,
			isDialogShown: isDialogShown,
			exportColor: exportColor,
			setAutoShow: function(visible) {
				visible = visible || !getProp('ahide');
				if (visible) {
					show();
				} else {
					hide();
				}
				timer.showAvgDiv(visible);
			},
			hide: hide,
			show: show,
			isPop: function(){return isPopup;},
			toggleLeftBar: toggleLeftBar
		};
	})();

	var TwoLvMenu = (function() {
		/**
		 *  data = [[text1, value1], [text2, value2], ...]
		 *  value = 'value' or [[texta, valuea], [textb, valueb]] or null (disabled)
		 */
		function TwoLvMenu(data, callback, select1, select2, val) {
			this.data = data;
			this.callback = callback;
			this.select1 = select1;
			this.select2 = select2;
			this.reset(val);
		}

		function procOnVal(data, val, func) {
			for (var idx1 = 0; idx1 < data.length; idx1++) {
				if (!$.isArray(data[idx1][1])) {
					if (data[idx1][1] == val) {
						func(idx1, null);
						return;
					}
					continue;
				}
				for (var idx2 = 0; idx2 < data[idx1][1].length; idx2++) {
					if (data[idx1][1][idx2][1] == val) {
						func(idx1, idx2);
						return;
					}
				}
			}
		}

		var _ = TwoLvMenu.prototype;

		_.loadSelect2 = function(idx2) {
			refocus();
			idx2 = idx2 || 0;
			var idx1 = ~~this.select1.prop('selectedIndex');
			var data2 = (this.data[idx1] || [])[1];
			this.select2.empty();
			if (!$.isArray(data2)) { // no 2-level data
				this.select1.removeClass('twolv1');
				this.select2.hide().removeClass('twolv2');
			} else {
				this.select1.addClass('twolv1');
				this.select2.show().addClass('twolv2');
				for (var i = 0; i < data2.length; i++) {
					this.select2.append($('<option>').html(data2[i][0]).val(data2[i][1]));
				}
				this.select2.prop('selectedIndex', idx2);
			}
			this.onSelect2Change();
		};

		_.onSelect1Change = function() {
			this.loadSelect2();
		};

		_.onSelect2Change = function() {
			this.callback && this.callback(this.getSelected());
		};

		_.getSelIdx = function() {
			var idx1 = ~~this.select1.prop('selectedIndex');
			var data2 = (this.data[idx1] || [])[1];
			if (!$.isArray(data2)) {
				return [idx1];
			}
			var idx2 = ~~this.select2.prop('selectedIndex');
			return [idx1, idx2];
		};

		_.getSelected = function() {
			var idx = this.getSelIdx();
			var data = (this.data[idx[0]] || [])[1];
			return idx.length == 1 ? data : (data && data[idx[1]] || [])[1];
		};

		_.reset = function(val) {
			val = val || this.getSelected();
			this.select1.empty();
			for (var i = 0; i < this.data.length; i++) {
				this.select1.append($('<option>').html(this.data[i][0]).val(
					$.isArray(this.data[i][1]) ? i : this.data[i][1]
				).attr('disabled', /===/.exec(this.data[i][0]) ? true : false));
			}
			this.select1.unbind('change').change(this.onSelect1Change.bind(this));
			this.select2.unbind('change').change(this.onSelect2Change.bind(this));
			if (val) {
				this.loadVal(val);
			}
		};

		_.loadVal = function(val) {
			var callback = this.callback;
			this.callback = null; // disable callback
			procOnVal(this.data, val, (idx1, idx2) => {
				this.select1.prop('selectedIndex', idx1);
				this.loadSelect2(idx2);
			});
			this.callback = callback;
		};

		_.getValName = function(val) {
			var name = null;
			procOnVal(this.data, val, (idx1, idx2) => {
				name = this.data[idx1][0];
				if (idx2 != null) {
					name += '>' + this.data[idx1][1][idx2][0];
				}
			});
			return name;
		};

		_.getValIdx = function(val) {
			var idx = null;
			procOnVal(this.data, val, function(idx1, idx2) {
				idx = idx1 * 100 + (idx2 == null ? idx2 : 99);
			});
			return idx;
		};

		return TwoLvMenu;
	})();

	var bgImage = (function() {
		var src = "";
		var images = ["https://i.imgur.com/X7Xi7D1.png", "https://i.imgur.com/K4zbMsu.png", "https://i.imgur.com/Fsh6MaM.png"];
		var img;
		var lastidx = 0;
		var urlre = /^((http|https|ftp):\/\/)?(\w(\:\w)?@)?([0-9a-z_-]+\.)*?([a-z0-9-]+\.[a-z]{2,6}(\.[a-z]{2})?(\:[0-9]{2,6})?)((\/[^?#<>\/\\*":]*)+(\?[^#]*)?(#.*)?)?$/i;
		var uploadImageFile = $('<input type="file" id="imgfile" accept="image/*"/>');

		function procSignal(signal, value) {
			if (value[0] == "bgImgO") {
				img.stop(true, true).fadeTo(0, value[1]/100);
			} else if (value[0] == "bgImgS") {
				if (value[1] == 'n') {
					img.hide();
					lastidx = 'n';
					return;
				} else {
					img.show();
				}

				if (value[1] == 'u') {
					if (value[2] == 'modify') {
						var input = prompt(BGIMAGE_URL, src);
						if (urlre.exec(input) && input.length < 2048) {
							src = input;
							img.attr("src", src);
							setProp('bgImgSrc', src);
						} else {
							$.alert(BGIMAGE_INVALID);
							setProp('bgImgS', lastidx);
							property.reload();
						}
					} else {
						src = getProp('bgImgSrc', src);
						img.attr("src", src);
					}
				} else if (value[1] == 'f') {
					storage.getKey("bgImgFile").then(function(file) {
						if (file) {
							img.attr("src", URL.createObjectURL(file));
						} else if (value[2] != 'modify') {
							setProp('bgImgS', 'n');
							property.reload();
						}
					});
					if (value[2] == 'modify') {
						uploadImageFile.unbind('change').change(function() {
							if (!uploadImageFile[0].files.length) {
								return;
							}
							var file = uploadImageFile[0].files[0];
							img.attr("src", URL.createObjectURL(file));
							storage.setKey("bgImgFile", file);
						});
						uploadImageFile.click();
					}
				} else {
					lastidx = value[1];
					img.attr("src", images[value[1]]);
				}
			}
		}

		$(function() {
			img = $('#bgImage');
			regListener('bgImage', 'property', procSignal, /^bgImg[OS]$/);
			regProp('ui', 'bgImgO', 2, BGIMAGE_OPACITY, [25, 0, 100]);
			regProp('ui', 'bgImgS', 1, BGIMAGE_IMAGE, ['n', ['n', 'u', 0, 1, 2, 'f'], BGIMAGE_IMAGE_STR.split('|').slice(0, -1).concat(1, 2, 3, 'upload')]);
		});
	})();

	function pretty(time, small) {
		// console.log(time);
		if (time < 0) {return 'DNF';}
		var useMilli = getProp('useMilli');
		time = Math.floor(time / (useMilli ? 1 : 10));
		var bits = time % (useMilli ? 1000 : 100);
		time = Math.floor(time / (useMilli ? 1000 : 100));
		var format = getProp('timeFormat');
		var secs, mins=0, hours=0;
		if (format == 'h') {
			secs = time % 60;
			mins = Math.floor(time/60) % 60;
			hours = Math.floor(time/3600);
		} else if (format == 'm') {
			secs = time % 60;
			mins = Math.floor(time/60);
		} else {
			secs = time;
		}
		small = small && getProp('smallADP');
		var s = small ? ['</span>'] : [];
		s.push(bits);
		if (bits < 10) {s.push('0');}
		if (bits < 100 && useMilli) {s.push('0');}
		s.push(secs + '.' + (small ? '<span style="font-size:0.75em;">' : ''));
		if (secs < 10 && (mins + hours > 0)) {s.push('0');}
		if (mins + hours > 0) {s.push(mins + ':');}
		if (mins < 10 && hours > 0) {s.push('0');}
		if (hours > 0) {s.push(hours + ':');}
		return s.reverse().join("");
	}

	function prettyRound(time, small) {
		return pretty(round(time), small);
	}

	var keyback = true;

	$(function() {
		regProp('kernel', 'useMilli', 0, PROPERTY_USEMILLI, [false], 1);
		regProp('kernel', 'timeFormat', 1, PROPERTY_FORMAT, ['h', ['h', 'm', 's'], ['hh:mm:ss.XX(X)', 'mm:ss.XX(X)', 'ss.XX(X)']], 1);
		temp.appendTo('body');
		wndCtn.appendTo('body');

		$(document).keydown(function(e) {
			$.waitUser.call();
			keyback = true;
			pushSignal('keydown', e);
			timer.onkeydown(e);
			return keyback;
		});
		$(document).keyup(function(e) {
			keyback = true;
			pushSignal('keyup', e);
			timer.onkeyup(e);
			return keyback;
		});

		$('#container').bind('touchstart', function(e) {
			$.waitUser.call();
			if ($(e.target).is('.click')) {
				return;
			}
			shortcuts.onTouchStart(e);
			refocus();
			timer.onkeydown({which: 32});
			e.preventDefault && e.preventDefault();
		});
		$('#container').bind('touchmove', function(e) {
			shortcuts.onTouchMove(e);
		});
		$('#container').bind('touchend', function(e) {
			shortcuts.onTouchEnd(e);
			if ($(e.target).is('.click')) {
				return;
			}
			refocus();
			timer.onkeyup({which: 32});
			e.preventDefault && e.preventDefault();
		});
		$('#container').bind('touch', function(e){
			if ($(e.target).is('.click')) {
				return;
			}
			e.preventDefault && e.preventDefault();
		});
		$('#touch').remove();

		/**
		 * ontouch events might not work on microsoft surface pad or laptop,
		 * so we add the mouse timer function to support such devices.
		 */
		var isValidDown = false;
		$('#container').mousedown(function(e) {
			$.waitUser.call();
			if ($(e.target).is('.click')) {
				return;
			}
			if (e.which == 1 && getProp('useMouse')) { //left button only
				isValidDown = true;
				shortcuts.onTouchStart(e);
				timer.onkeydown({which: 32});
				e.preventDefault && e.preventDefault();
			}
		});
		$('body').mousemove(function(e) {
			if (e.which == 1 && isValidDown && getProp('useMouse')) {
				shortcuts.onTouchMove(e);
			}
		});
		$('body').mouseup(function(e) {
			if (e.which == 1 && isValidDown && getProp('useMouse')) {
				shortcuts.onTouchEnd(e);
				timer.onkeyup({which: 32});
				e.preventDefault && e.preventDefault();
				isValidDown = false;
			}
		});

		try {
			document.cookie = "fp=" + $.fingerprint() + "; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
		} catch (e) {}

		// var externJS = $.urlParam('extjs');
		// if (externJS) {
		// 	externJS = JSON.parse(decodeURIComponent(externJS));
		// 	var prev_val = property.get('extjs');
		// 	if (externJS == prev_val || confirm('You are loading external JS file(s), are you sure? (Press CANCEL if you do not know what it means)')) {
		// 		property.set('extjs', externJS);
		// 		for (var i = 0; i < externJS.length; i++) {
		// 			var url = externJS[i];
		// 			$.getScript(url);
		// 		}
		// 	}
		// }
	});

	function cleanLocalStorage() {
		var validKeys = ['properties', 'cachedScr', 'devData', 'wcaData', 'gglData', 'locData'];

		for (var i = 0; i < validKeys.length; i++) {
			try {
				var val = localStorage[validKeys[i]] || '{}';
				JSON.parse(val);
			} catch (err) {
				delete localStorage[validKeys[i]];
			}
		}

		var removeItems = [];
		for (var i = 1; i <= ~~getProp('sessionN', 15); i++) {
			validKeys.push('session' + i);
		}
		for (var i = 0; i<localStorage.length; i++) {
			var key = localStorage.key(i);
			if (validKeys.indexOf(key) == -1) {
				removeItems.push(key);
			}
		}
		for (var i = 0; i < removeItems.length; i++) {
			delete localStorage[removeItems[i]];
		}
	}

	$(cleanLocalStorage);

	function round(val) {
		if (val <= 0) {
			return val;
		}
		var mul = getProp('useMilli') ? 1 : 10;
		return Math.round(val / mul) * mul;
	}

	function refocus() {
		timer.refocus();
	}

	return {
		pretty: pretty,
		getProp: getProp,
		setProp: setProp,
		regProp: regProp,
		getSProps: property.getSProps,
		setSProps: property.setSProps,
		regListener: regListener,
		addWindow: ui.addWindow,
		addButton: ui.addButton,
		pushSignal: pushSignal,
		showDialog: ui.showDialog,
		hideDialog: ui.hideDialog,
		isDialogShown: ui.isDialogShown,
		exportColor: ui.exportColor,
		clrKey: function(){keyback = false;},
		temp: temp,
		reprop: property.reload,
		loadProp: property.load,
		blur: refocus,
		ui: ui,
		TwoLvMenu: TwoLvMenu,
		pround: prettyRound,
		round: round
	};
});
