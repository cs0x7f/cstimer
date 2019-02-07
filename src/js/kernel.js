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
		// console.log(signal, value);
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
		table.append($('<tr />').append(left, right));

		var selectedTab = 0;

		function tabClick() {
			var module = $(this).data('module');
			if (!subDivs[module][0].hasClass('enable')) {
				for (var m in subDivs) {
					subDivs[m][0].removeClass('enable');
				}
				subDivs[module][0].addClass('enable');
				selectedTab = module;
				right.children().appendTo(temp);
				right.html(subDivs[module][1]);
			}
		}

		function procClick(e) {
			var target = $(this);
			var key = target.prop('name');
			if (target.is('select')) {
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
						setProp(key, [val.slice(0, idx), ui.nearColor(target.val()), val.slice(idx + 4)].join(''));
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

		function generateDiv() {
			subDivs = {};
			left.empty();
			right.empty();
			for (var module in MODULE_NAMES) {
				if (selectedTab === 0) {
					selectedTab = module;
				}
				var curDiv = subDivs[module] = [$('<div />'), $('<ul />')];
				curDiv[0].html(MODULE_NAMES[module]).addClass('tab').data('module', module).click(tabClick).appendTo(left);

				for (var key in proSets[module]) {
					var proSet = proSets[module][key];
					var curVal = getProp(key);
					var type = proSet[1];
					if (type == 0) { //checkbox
						proSet[0] = $('<input type="checkbox" name="' + key + '">').prop('checked', curVal).click(procClick);
						curDiv[1].append($('<li />').append($('<label>').append(proSet[0], proSet[2])));
					} else if (type == 1) { //select
						proSet[0] = $('<select name="' + key + '">');
						var vals = proSet[3][1];
						var strs = proSet[3][2];
						for (var i = 0; i < vals.length; i++) {
							proSet[0].append($('<option />').val(vals[i]).html(strs[i]));
						}
						proSet[0].val(getProp(key));
						proSet[0].change(procClick);
						curDiv[1].append($('<li />').append(proSet[2], ': ', proSet[0]));
					} else if (type == 2) { //range
						proSet[0] = $('<input type="text" maxlength="4" name="' + key + '">').val(getProp(key)).change(procClick);
						var inc = $('<input type="button" value="+" name="' + key + '">').click(procClick);
						var dec = $('<input type="button" value="-" name="' + key + '">').click(procClick);
						curDiv[1].append($('<li />').append(proSet[2], '(' + proSet[3][1] + '~' + proSet[3][2] + ')',
							$('<span>').css('white-space', 'nowrap').append(dec, proSet[0], inc)));
					} else if (type == 3) { //color
						proSet[0] = $('<input type="color" name="' + key + '">').val(getProp(key)).change(procClick);
						curDiv[1].append($('<li />').append(proSet[2], ': ', proSet[0]));
					} else if (type == 4) { //multiple colors
						var val = getProp(key).match(/#[0-9a-fA-F]{3}/g);
						proSet[0] = $('<input type="text" name="' + key + '" style="display:none">').val(getProp(key));
						var colorsInput = [];
						for (var i = 0; i < val.length; i++) {
							colorsInput.push($('<input type="color" name="' + key + '" data="' + (i + 1) + '" class="mulcolor">').val(ui.nearColor(val[i], 0, true)).change(procClick));
						}
						curDiv[1].append($('<li />').append(proSet[2], ': ', proSet[0], colorsInput));
					} else if (type == 5) { //select using a href
						var item = $('<li />').append(proSet[2], ': ');
						var vals = proSet[3][1];
						var strs = proSet[3][2];
						for (var i = 0; i < vals.length; i++) {
							item.append('<a class="click" href="' + vals[i] + '">' + strs[i] + '</a> ');
						}
						curDiv[1].append(item);
					}
				}
			}
			subDivs[selectedTab][0].click();
		}

		function showDiv() {
			if (isDivOut) {
				generateDiv();
				isDivOut = false;
			}

			ui.showDialog([table, $.noop, undefined, $.noop, [RESET_LANG, function(){
				resetPropertyes();
				generateDiv();
				return false;
			}], [BUTTON_EXPORT.replace('<br', ''), exportFunc.exportProperties]], 'option', BUTTON_OPTIONS.replace('-<br>', ''));
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

		function setProp(key, value) {
			for (var module in proSets) {
				if (key in proSets[module] && proSets[module][key][0] !== undefined && proSets[module][key][0].val() != value) {
					proSets[module][key][0].val(value);
					break;
				}
			}
			if (getProp(key) !== value) {
				properties[key] = value;
				pushSignal('property', [key, getProp(key), 'modify']);
			}
		}

		function regProp(module, key, type, discribe, values) {
			isDivOut = true;
			if (proSets[module] == undefined) {
				proSets[module] = {};
			}
			proSets[module][key] = [undefined, type, discribe, values];
			defaultProps[key] = values[0];
			pushSignal('property', [key, getProp(key), 'set']);
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
			load : load,
			reload: generateDiv
		}
	})();

	var getProp = property.get;
	var setProp = property.set;
	var regProp = property.reg;

	$(function() {
		var curLang = LANG_CUR || 'en-us';
		regProp('kernel', 'lang', 1, 'Language', [curLang, (LANG_SET + '|h').split('|').slice(1), (LANG_STR + '|help translation').split('|')]);
		setProp('lang', curLang);
		regListener('kernel', 'property', function(signal, value) {
			if (value[1] == curLang || value[2] != "modify") {
				return;
			} else if (value[1] == 'h') {
				if (confirm('Press OK to redirect to crowdin for translating cstimer')) {
					window.location.href = 'https://crowdin.com/project/cstimer';
				}
			} else {
				window.location.href = '?lang=' + value[1];
			}
			setProp('lang', curLang);
		}, /^lang$/);
	})

	var ui = (function() {

		var modules = {};//{module: {button: enable/disable, div: divObj, auto: autohide/none}}
		var isHide = false;
		var isPopup = false;
		var gray;
		var leftbar;
		var donateDiv = $('<div />');

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
						return function() {pushSignal('button', [module, false]);}
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
		var dialog = $('<div />').addClass('dialog');
		var title = $('<div />').addClass('title');
		var value = $('<div />').addClass('value');
		var buttons = $('<div />').addClass('button');
		var OK = $('<input type="button" class="buttonOK">').val(OK_LANG);
		var CAN = $('<input type="button" class="buttonOK">').val(CANCEL_LANG);
		dialog.append(title, value, buttons);

		function showDialog(values, diagclass, titlestr) {
			dialog.removeClass().addClass('dialog').addClass('dialog' + diagclass);
			title.html(titlestr);
			value.children().appendTo(temp);
			values[0].appendTo(value.empty());
			buttons.empty();
			if (values.length < 2) {
				value.css('bottom', '0');
			} else {
				value.css('bottom', '2.5em');
			}
			if (values[1] != undefined) {
				buttons.append(OK.unbind("click").click(function() {
					values[1] && values[1]();
					hideDialog();
				}));
			}
			if (values[2] != undefined) {
				buttons.append(CAN.unbind("click").click(function() {
					values[2] && values[2]();
					hideDialog();
				}));
			}
			gray.unbind("click");
			if (values[3] != undefined) {
				gray.click(function() {
					values[3] && values[3]();
					hideDialog();
				});
			}
			for (var i=4; i<values.length; i++) {
				buttons.append($('<input type="button" class="buttonOK">').val(values[i][0]).unbind("click").click((function(func) {
					return function() {
						if (func()) {
							hideDialog();
						}
					}
				})(values[i][1])));
			}

			dialog.stop(true, true).fadeTo(100, 0.98);
			gray.stop(true, true).fadeTo(100, 0.25);
			isPopup = true;
			values[0].focus();
		}

		function hideDialog() {
			value.children().appendTo(temp);
			dialog.stop(true, true).fadeOut(100).removeClass();
			gray.hide();
			isPopup = false;
			refocus();
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
			if (avail && !isHide || show || jQuery.fx.off) {
				leftbar.stop(true, true).fadeTo(200, 1);
			} else {
				leftbar.stop(true, true).fadeTo(200, 0.01);
			}
		}

		function isDialogShown(diagclass) {
			return dialog.hasClass('dialog' + diagclass);
		}

		var color = $('<style>').appendTo('head');

		var csstmp =
			"html,body,textarea,#leftbar{color:?;background-color:?}" +
			"#leftbar{border-color:?}" +
			"#logo{color:?;border-color:?;background-color:?}" +
			".mybutton,.tab,.cntbar{border-color:?}" +
			"html:not(.m) .mybutton:hover,.mybutton:active,.tab:active,.mywindow,.popup,.dialog{background-color:?}" +
			".mybutton.enable,.tab.enable,.cntbar,.selected{background-color:?}" +
			"#gray{background-color:?}" +
			"html:not(.m) .times:hover,html:not(.m) .click:hover,.times:active,.click:active,textarea{background-color:?}" +
			".click{color:?}" +
			".mywindow,.popup,.dialog,.table,.table td,.table th,textarea,.tabValue{border-color:?}" +
			"html:not(.m) #avgstr .click:hover,#avgstr .click:active{background-color:?}" +
			"select,input[type='button'],input[type='text']{color:?;background:?;border-color:?}" +
			"input:disabled{background:?}" +
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
			"#fff#227#9c3#563#580#dad#000"
		];


		// var cur_color = ["#000", "#efc", "#cda", "#ff0", "#dd0", "#000", "#dbb", "#fdd", "#fbb", "#000", "#dbb", "#00f", "#dbb"];
		var cur_color = ["#000", "#efc", "#fdd", "#fbb", "#dbb", "#ff0", "#000"];
		var col_map = [0, 1, 1|0x220, 5, 5|0x220, 6, 2|0x220, 2, 3, 0, 2|0x220, 4, 2|0x220, 1|0x220, 0, 2|0xef0, 2|0x220, 2|0x110, 0];
		var col_props = ['font', 'back', 'board', 'button', 'link', 'logo', 'logoback'];

		function useColorTemplate(value) {
			for (var i=0; i<7; i++) {
				cur_color[i] = nearColor(value.substr(i*4, 4));
			}

			setProp('col-font', nearColor(cur_color[0], 0, true));
			setProp('col-back', nearColor(cur_color[1], 0, true));
			setProp('col-board', nearColor(cur_color[2], 0, true));
			setProp('col-button', nearColor(cur_color[3], 0, true));
			setProp('col-link', nearColor(cur_color[4], 0, true));
			setProp('col-logo', nearColor(cur_color[5], 0, true));
			setProp('col-logoback', nearColor(cur_color[6], 0, true));

			releaseColor();
		}

		function setColor(idx, val) {
			val = nearColor(val);
			if (cur_color[idx] == val) {
				return;
			}
			cur_color[idx] = val;
			setProp('color', 'u');
			releaseColor();
		}

		function releaseColor() {
			var cssval = getProp('uidesign') == 'ns' ? csstmp[1] : csstmp[0];
			var sgn = nearColor(cur_color[0]) == '#000' ? -1: 1;
			for (var i=0; i<col_map.length; i++) {
				cssval = cssval.replace('?', nearColor(cur_color[col_map[i] & 0xf], (col_map[i] << 20 >> 24) * sgn));
			}
			if (color[0].styleSheet) {
				color[0].styleSheet.cssText = cssval;
			} else {
				color[0].innerHTML = cssval;
			}
		}

		function nearColor(color, ref, longFormat) {
			var col, m;
			ref = ref || 0;
			m = /^#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])$/.exec(color)
			if (m) {
				col = [m[1] + m[1], m[2] + m[2], m[3] + m[3]];
			}
			m = /^#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/.exec(color)
			if (m) {
				col = [m[1], m[2], m[3]];
			}
			for (var i=0; i<3; i++) {
				col[i] = parseInt(col[i], 16);
				col[i] += ref;
				col[i] = Math.min(Math.max(col[i], 0), 255);
				col[i] = (Math.round(col[i]/17)).toString(16);
			}
			return "#" + (longFormat ? col[0] + col[0] + col[1] + col[1] + col[2] + col[2] : col[0] + col[1] + col[2]);
		}

		function importColor(val) {
			var colstr_re = /^\s*((#[0-9a-fA-F]{3}){7})\s*$/
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
			if (getProp('uidesign') == 'mt') {
				$('html').addClass('mtds');
			} else {
				$('html').removeClass('mtds');
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
							alert(COLOR_FAIL);
						}
						property.set('color', 'u');
					} else {
						useColorTemplate(styles[value[1] == 'r' ? ~~(Math.random() * 6) : (value[1] - 1)]);
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
					setColor(col_props.indexOf(value[0].substring(4, value[0].length)), value[1]);
					break;
				case 'zoom':
					$('html').attr('class', 'p' + ~~(value[1] * 100));
					$(window).trigger('resize');
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
				if (history && history.replaceState) {
					history.replaceState(undefined, undefined, window.location.pathname + window.location.search);
				} else {
					window.location.hash = '';
				}
			}
		}

		$(function() {
			regListener('ui', 'property', procSignal, /^(?:color|font|col-.+|zoom|view|uidesign|wnd(?:Scr|Stat|Tool))/);
			regProp('ui', 'zoom', 1, ZOOM_LANG, ['1', ['0.7', '0.8', '0.9', '1', '1.1', '1.25', '1.5'], ['70%', '80%', '90%', '100%', '110%', '125%', '150%']]);
			regProp('ui', 'font', 1, PROPERTY_FONT, ['lcd', ['r', 'Arial', 'lcd', 'lcd2', 'lcd3', 'lcd4', 'lcd5'], PROPERTY_FONT_STR.split('|')]);
			regProp('kernel', 'ahide', 0, PROPERTY_AHIDE, [true]);
			regProp('ui', 'uidesign', 1, PROPERTY_UIDESIGN, ['n', ['n', 'mt', 'ns'], PROPERTY_UIDESIGN_STR.split('|')]);
			regProp('ui', 'view', 1, PROPERTY_VIEW, ['a', ['a', 'm', 'd'], PROPERTY_VIEW_STR.split('|')]);
			regProp('color', 'color', 1, PROPERTY_COLOR, ['1', ['r', '1', '2', '3', '4', '5', '6', 'u', 'e'], PROPERTY_COLOR_STR.split('|')]);
			var parr = PROPERTY_COLORS.split('|');
			regProp('color', 'col-font', 3, parr[0], ['#000000']);
			regProp('color', 'col-back', 3, parr[1], ['#eeffcc']);
			regProp('color', 'col-board', 3, parr[2], ['#ffdddd']);
			regProp('color', 'col-button', 3, parr[3], ['#ffbbbb']);
			regProp('color', 'col-link', 3, parr[4], ['#0000ff']);
			regProp('color', 'col-logo', 3, parr[5], ['#ffff00']);
			regProp('color', 'col-logoback', 3, parr[6], ['#000000']);
			regProp('color', 'colcube', 4, 'Cube', ['#ff0#fa0#00f#fff#f00#0d0']);
			regProp('color', 'colpyr', 4, 'Pyraminx', ['#0f0#f00#00f#ff0']);
			regProp('color', 'colskb', 4, 'Skewb', ['#fff#00f#f00#ff0#0f0#f80']);
			regProp('color', 'colmgm', 4, 'Megaminx', ['#fff#d00#060#81f#fc0#00b#ffb#8df#f83#7e0#f9f#999']);
			regProp('color', 'colsq1', 4, 'SQ1', ['#ff0#f80#0f0#fff#f00#00f']);

			regProp('ui', 'wndScr', 1, PROPERTY_WNDSCR, ['n', ['n', 'f'], PROPERTY_WND_STR.split('|')]);
			regProp('ui', 'wndStat', 1, PROPERTY_WNDSTAT, ['n', ['n', 'f'], PROPERTY_WND_STR.split('|')]);
			regProp('ui', 'wndTool', 1, PROPERTY_WNDTOOL, ['n', ['n', 'f'], PROPERTY_WND_STR.split('|')]);

			gray = $('#gray');

			$('.donate').appendTo(donateDiv);
			addButton('donate', BUTTON_DONATE, function() {
				showDialog([donateDiv, 0, undefined, 0], 'stats', BUTTON_DONATE);
			}, 5);
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
		});

		return {
			addWindow: addWindow,
			addButton: addButton,
			showDialog: showDialog,
			hideDialog: hideDialog,
			isDialogShown: isDialogShown,
			exportColor: exportColor,
			nearColor: nearColor,
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
		}
	})();


	var bgImage = (function() {
		var src = "";
		var images = ["http://fmn.rrimg.com/fmn063/xiaozhan/20120815/0025/x_large_FX3O_12190000160a1261.jpg"];
		var img;
		var lastidx = 0;
		var urlre = /^((http|https|ftp):\/\/)?(\w(\:\w)?@)?([0-9a-z_-]+\.)*?([a-z0-9-]+\.[a-z]{2,6}(\.[a-z]{2})?(\:[0-9]{2,6})?)((\/[^?#<>\/\\*":]*)+(\?[^#]*)?(#.*)?)?$/i;

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
						if (urlre.exec(input)) {
							src = input;
							img.attr("src", src);
							setProp('bgImgSrc', src);
						} else {
							alert(BGIMAGE_INVALID);
							setProp('bgImgS', lastidx);
							property.reload();
						}
					} else {
						src = getProp('bgImgSrc', src);
						img.attr("src", src);
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
			regProp('ui', 'bgImgS', 1, BGIMAGE_IMAGE, ['n', ['n', 'u', 0], BGIMAGE_IMAGE_STR.split('|')]);
		});
	})();

	var exportFunc = (function() {
		var wcaLoginUrl = 'https://www.worldcubeassociation.org/oauth/authorize?client_id=63a89d6694b1ea2d7b7cbbe174939a4d2adf8dd26e69acacd1280af7e7727554&response_type=code&scope=public&redirect_uri=' + encodeURI(location.href.split('?')[0]);
		var gglLoginUrl = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=738060786798-octf9tngnn8ibd6kau587k34au263485.apps.googleusercontent.com&response_type=token&scope=https://www.googleapis.com/auth/drive.appdata&redirect_uri=' + encodeURI(location.href.split('?')[0]);

		var exportDiv = $('<div />');
		var exportTable = $('<table class="expOauth expUpDown">');

		var wcaDataTd = $('<td></td>');
		var wcaDataTr = $('<tr>').append('<td class="img"/>', wcaDataTd);
		var inServWCA = $('<a class="click"/>').html(EXPORT_FROMSERV + ' (csTimer)').click(downloadData);
		var outServWCA = $('<a class="click"/>').html(EXPORT_TOSERV + ' (csTimer)').click(uploadData);

		var gglDataTd = $('<td></td>');
		var gglDataTr = $('<tr>').append('<td class="img"/>', gglDataTd);
		var inServGGL = $('<a class="click"/>');
		var outServGGL = $('<a class="click"/>');

		var inFile = $('<input type="file" id="file" accept="text/*"/>');
		var inOtherFile = $('<input type="file" id="file" accept="text/*"/>');
		var outFile = $('<a class="click"/>').html(EXPORT_TOFILE);

		var inServ = $('<a class="click"/>').html(EXPORT_FROMSERV + ' (csTimer)').click(downloadData);
		var outServ = $('<a class="click"/>').html(EXPORT_TOSERV + ' (csTimer)').click(uploadData);

		var expString;

		exportTable.append(
			$('<tr>').append(
				$('<td>').append($('<a class="click"/>').html(EXPORT_FROMFILE).click(function() {
					inFile.click();
				})),
				$('<td>').append(outFile)),
			$('<tr>').append(
				$('<td>').append(inServ),
				$('<td>').append(outServ)),
			$('<tr>').append(
				$('<td colspan=2>').append($('<a class="click"/>').html(EXPORT_FROMOTHER).click(function() {
					inOtherFile.click();
				}))
			)
		);

		function importData() {
			loadData(JSON.parse(this.result));
		}

		function loadData(data) {
			if (!confirm(IMPORT_FINAL_CONFIRM)) {
				return;
			}
			if ('properties' in data) {
				var wcaData = localStorage['wcaData'] || '{}';
				var gglData = localStorage['gglData'] || '{}';
				var locData = localStorage['locData'] || '';
				localStorage.clear();
				localStorage['wcaData'] = wcaData;
				localStorage['gglData'] = gglData;
				localStorage['locData'] = locData;
				localStorage['properties'] = mathlib.obj2str(data['properties']);
				property.load();
			}
			storage.importAll(data, function() {
				location.reload();
			});
		}

		function importFile(reader) {
			if (this.files.length) {
				var f = this.files[0];
				reader.readAsBinaryString(f);
			}
		}

		function getId(e) {
			var id = null;
			if (e.target === outServWCA[0] || e.target === inServWCA[0]) {
				id = JSON.parse(localStorage['wcaData'] || '{}')['cstimer_token'];
			} else {
				id = prompt(EXPORT_USERID, localStorage['locData'] || '');
				if (id == null) {
					return;
				}
				localStorage['locData'] = id;
			}
			if (!id || !/^[A-Za-z0-9]+$/.exec(id)) {
				alert(EXPORT_INVID);
				return;
			}
			return id;
		}

		function uploadData(e) {
			var id = getId(e);
			if (!id) {
				return;
			}
			var compExpString = LZString.compressToEncodedURIComponent(expString);
			var target = $(e.target);
			var rawText = target.html();
			target.html('...');
			$.post('https://cstimer.net/userdata.php', {
				'id': id,
				'data': compExpString
			}, function(val) {
				if (val['retcode'] == 0) {
					alert(EXPORT_UPLOADED);
				} else {
					alert(EXPORT_ERROR);
				}
				target.html(rawText);
			}, 'json').always(function() {
				target.html(rawText);
			});
		}

		function downloadData(e) {
			var id = getId(e);
			if (!id) {
				return;
			}
			var target = $(e.target);
			var rawText = target.html();
			target.html('...');
			$.post('https://cstimer.net/userdata.php', {
				'id': id
			}, function(val) {
				target.html('......');
				var retcode = val['retcode'];
				if (retcode == 0) {
					try {
						loadData(JSON.parse(LZString.decompressFromEncodedURIComponent(val['data'])));
					} catch(err) {
						alert(EXPORT_ERROR);
					}
				} else if (retcode == 404) {
					alert(EXPORT_NODATA);
				} else {
					alert(EXPORT_ERROR);
				}
				target.html(rawText);
			}, 'json').error(function() {
				alert(EXPORT_ERROR);
			}).always(function() {
				target.html(rawText);
			});
		}

		function downloadDataGGL() {
			var gglData = JSON.parse(localStorage['gglData'] || '{}');
			if (!gglData['access_token']) {
				return;
			}
			inServGGL.html('Check File List...');
			$.ajax('https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&orderBy=modifiedTime desc&q=name%3D%27cstimer.txt%27&access_token=' + gglData['access_token'], {
				'type': 'GET'
			}).success(function(data, status, xhr) {
				var files = data['files'];
				if (files.length == 0) {
					alert('No Data Found');
					updateUserInfoFromGGL();
					return;
				}
				inServGGL.html('Import Data...');
				var fileId = files[0]['id'];
				$.get('https://www.googleapis.com/drive/v3/files/' + fileId + '?alt=media&access_token=' + gglData['access_token']).success(function(data) {
					try {
						data = JSON.parse(LZString.decompressFromEncodedURIComponent(data));
					} catch (e) {
						alert('No Valid Data Found');
						updateUserInfoFromGGL();
						return;
					}
					loadData(data);
				}).error(function() {
					alert(EXPORT_ERROR + '\nPlease Re-login');
					logoutFromGGL();
				});

				// removeRedundantGoogleFiles
				for (var i = 10; i < files.length; i++) {
					$.ajax('https://www.googleapis.com/drive/v3/files/' + files[i]['id'] + '?access_token=' + gglData['access_token'], {
						'type': 'DELETE'
					});
				}
			}).error(function() {
				alert(EXPORT_ERROR + '\nPlease Re-login');
				logoutFromGGL();
			});
		}

		function uploadDataGGL() {
			var gglData = JSON.parse(localStorage['gglData'] || '{}');
			if (!gglData['access_token']) {
				return;
			}
			outServGGL.html('Create File...');
			$.ajax('https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable&access_token=' + gglData['access_token'], {
				'type': 'POST',
				'contentType': 'application/json',
				'data': JSON.stringify({
					'parents': ['appDataFolder'],
					'name': 'cstimer.txt'
				})
			}).success(function(data, status, xhr) {
				var uploadUrl = xhr.getResponseHeader('location');
				outServGGL.html('Uploading Data...');
				$.ajax(uploadUrl, {
					'type': 'PUT',
					'contentType': 'text/plain',
					'data': LZString.compressToEncodedURIComponent(expString)
				}).success(function(data, status, xhr) {
					alert('Export Success');
					updateUserInfoFromGGL();
				}).error(function(data, status, xhr) {
					alert(EXPORT_ERROR);
					logoutFromGGL();
				});
			}).error(function(data, status, xhr) {
				if (data.status == 401) {
					alert('Timeout, Please Re-login');
				} else {
					alert(EXPORT_ERROR);
				}
				logoutFromGGL();
			});
		}

		function showExportDiv() {
			storage.exportAll(function(exportObj) {
				exportObj['properties'] = mathlib.str2obj(localStorage['properties']);
				expString = JSON.stringify(exportObj);

				if (window.Blob) {
					var blob = new Blob([expString], {
						'type': 'text/plain'
					});
					outFile.attr('href', URL.createObjectURL(blob));
					outFile.attr('download', 'cstimer_' + mathlib.time2str(new Date()/1000, '%Y%M%D_%h%m%s') + '.txt');
				}
				kernel.showDialog([exportDiv, 0, undefined, 0, [EXPORT_ONLYOPT, exportProperties], [EXPORT_ACCOUNT, exportAccounts]], 'export', EXPORT_DATAEXPORT);
			});
		}

		function exportByPrompt(expOpt) {
			var compOpt = LZString.compressToEncodedURIComponent(JSON.stringify(expOpt));
			var ret = prompt(EXPORT_CODEPROMPT, compOpt);
			if (!ret || ret == compOpt) {
				return;
			}
			try {
				ret = JSON.parse(LZString.decompressFromEncodedURIComponent(ret));
			} catch (e) {
				return;
			}
			return ret;
		}

		function exportProperties() {
			var data = JSON.parse(localStorage['properties']);
			var expOpt = {};
			for (var key in data) {
				if (!key.startsWith('session')) {
					expOpt[key] = data[key];
				}
			}
			var newOpt = exportByPrompt(expOpt);
			if (!newOpt) {
				return false;
			}
			var data = JSON.parse(localStorage['properties']);
			for (var key in data) {
				if (key.startsWith('session')) {
					newOpt[key] = data[key];
				}
			}
			localStorage['properties'] = mathlib.obj2str(newOpt);
			location.reload();
			return false;
		}

		function exportAccounts() {
			var expOpt = {
				'wcaData': localStorage['wcaData'],
				'gglData': localStorage['gglData'],
				'locData': localStorage['locData']
			}
			var newOpt = exportByPrompt(expOpt);
			if (!newOpt) {
				return false;
			}
			if (newOpt['wcaData']) {
				localStorage['wcaData'] = newOpt['wcaData'];
			}
			if (newOpt['gglData']) {
				localStorage['gglData'] = newOpt['gglData'];
			}
			if (newOpt['locData']) {
				localStorage['locData'] = newOpt['locData'];
			}
			location.reload();
			return false;
		}

		function updateUserInfoFromWCA() {
			var wcaData = JSON.parse(localStorage['wcaData'] || '{}');
			wcaDataTr.unbind('click');
			inServWCA.unbind('click').removeClass('click');
			outServWCA.unbind('click').removeClass('click');
			if (!wcaData['access_token']) {
				wcaDataTd.html(EXPORT_LOGINWCA);
				wcaDataTr.click(function() {
					location.href = wcaLoginUrl;
				}).addClass('click');
			} else {
				var me = wcaData['wca_me'];
				wcaDataTd.html('WCAID: ' + me['wca_id'] + '<br>' + 'Name: ' + me['name']);
				wcaDataTr.click(function() {
					if (confirm(EXPORT_LOGOUTCFM)) {
						logoutFromWCA();
					}
				}).addClass('click');
				inServWCA.addClass('click').click(downloadData);
				outServWCA.addClass('click').click(uploadData);
			}
		}

		function updateUserInfoFromGGL() {
			var gglData = JSON.parse(localStorage['gglData'] || '{}');
			gglDataTr.unbind('click');
			inServGGL.unbind('click').removeClass('click').html(EXPORT_FROMSERV + ' (Google)');
			outServGGL.unbind('click').removeClass('click').html(EXPORT_TOSERV + ' (Google)');
			if (!gglData['access_token']) {
				gglDataTd.html(EXPORT_LOGINGGL);
				gglDataTr.click(function() {
					location.href = gglLoginUrl;
				}).addClass('click');
			} else {
				var me = gglData['ggl_me'];
				gglDataTd.html('Name: ' + me['displayName'] + '<br>' + 'Email: ' + me['emailAddress']);
				gglDataTr.click(function() {
					if (confirm(EXPORT_LOGOUTCFM)) {
						logoutFromGGL();
					}
				}).addClass('click');
				inServGGL.addClass('click').click(downloadDataGGL);
				outServGGL.addClass('click').click(uploadDataGGL);
			}
		}

		function logoutFromWCA() {
			delete localStorage['wcaData'];
			updateUserInfoFromWCA();
		}

		function logoutFromGGL() {
			delete localStorage['gglData'];
			updateUserInfoFromGGL();
		}

		function cleanupWCACode(code) {
			var curLoc = location.href.replace('code=' + code, '').replace(/\?$/, '');
			if (history && history.pushState) {
				history.pushState(undefined, undefined, curLoc);
			} else {
				location.href = curLoc;
			}
			updateUserInfoFromWCA();
		}

		function cleanupGGLHash() {
			if (history && history.replaceState) {
				history.replaceState(undefined, undefined, window.location.pathname + window.location.search);
			} else {
				window.location.hash = '';
			}
			updateUserInfoFromGGL();
		}

		$(function() {
			ui.addButton('export', BUTTON_EXPORT, showExportDiv, 2);
			exportDiv.append('<br>',
				$('<div class="expOauth">').append(
					$('<table id="wcaLogin">').append(wcaDataTr),
					$('<table class="expUpDown">').append($('<tr>').append(
						$('<td>').append(inServWCA),
						$('<td>').append(outServWCA)))),
				$('<div class="expOauth">').append(
					$('<table id="gglLogin">').append(gglDataTr),
					$('<table class="expUpDown">').append($('<tr>').append(
						$('<td>').append(inServGGL),
						$('<td>').append(outServGGL)))),
				exportTable);
			if (window.FileReader && window.Blob) {
				var reader = new FileReader();
				reader.onload = importData;
				var readerOther = new FileReader();
				readerOther.onload = function() {
					var n_import = stats.importSessions(TimerDataConverter(this.result));
					if (n_import == 0) {
						logohint.push('No session imported');
					}
				};
				inFile.change(importFile.bind(inFile[0], reader))
				inOtherFile.change(importFile.bind(inOtherFile[0], readerOther));
			}

			if ($.urlParam('code')) { //WCA oauth
				var code = $.urlParam('code');
				wcaDataTd.html(EXPORT_LOGINAUTHED);
				$.post('oauthwca.php', {
					'code': $.urlParam('code')
				}, function(val) {
					if ('access_token' in val) {
						localStorage['wcaData'] = JSON.stringify(val);
					} else {
						alert(EXPORT_ERROR);
						logoutFromWCA();
					}
				}, 'json').error(function() {
					alert(EXPORT_ERROR);
					logoutFromWCA();
				}).always(function() {
					cleanupWCACode(code);
				});
				showExportDiv();
			} else {
				updateUserInfoFromWCA();
			}

			if ($.hashParam('access_token')) { //Google oauth
				var access_token = $.hashParam('access_token');
				gglDataTd.html(EXPORT_LOGINAUTHED);
				$.get('https://www.googleapis.com/drive/v3/about', {
					'fields': 'user',
					'access_token': access_token
				}, function(val) {
					if ('user' in val) {
						localStorage['gglData'] = JSON.stringify({
							'access_token': access_token,
							'ggl_me': val['user']
						});
					} else {
						alert(EXPORT_ERROR);
						logoutFromGGL();
					}
				}, 'json').error(function(data, status, xhr) {
					if (data.status == 401) {
						alert('Timeout, Please Re-login');
					} else {
						alert(EXPORT_ERROR);
					}
					logoutFromGGL();
				}).always(function() {
					cleanupGGLHash(code);
				});
				showExportDiv();
			} else {
				updateUserInfoFromGGL();
			}
		});

		return {
			exportProperties: exportProperties
		}
	})();

	function pretty(time, small) {
		// console.log(time);
		if (time < 0) {return 'DNF';}
		var useMilli = getProp('useMilli');
		time = ~~(time / (useMilli ? 1 : 10));
		var bits = time % (useMilli ? 1000 : 100);
		time = ~~(time / (useMilli ? 1000 : 100));
		var format = getProp('timeFormat');
		var secs, mins=0, hours=0;
		if (format == 'h') {
			secs = time % 60;
			mins = ~~(time/60) % 60;
			hours = ~~(time/3600);
		} else if (format == 'm') {
			secs = time % 60;
			mins = ~~(time/60);
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

	var scrambleReg = /^([\d])?([FRUBLDfrubldzxySME])(?:([w])|&sup([\d]);)?([2'])?$/;

	function parseScramble(scramble, moveMap) {
		var moveseq = [];
		var moves = (getProp('preScr') + ' ' + scramble).split(' ');
		var m, w, f, p;
		for (var s=0; s<moves.length; s++) {
			m = scrambleReg.exec(moves[s]);
			if (m == null) {
				continue;
			}
			f = "FRUBLDfrubldzxySME".indexOf(m[2]);
			if (f > 14) {
				p = "2'".indexOf(m[5] || 'X') + 2;
				f = [0, 4, 5][f % 3];
				moveseq.push([moveMap.indexOf("FRUBLD".charAt(f)), 2, p]);
				moveseq.push([moveMap.indexOf("FRUBLD".charAt(f)), 1, 4-p]);
				continue;
			}
			w = f < 12 ? (~~m[1] || ~~m[4] || ((m[3] == "w" || f > 5) && 2) || 1) : -1;
			p = (f < 12 ? 1 : -1) * ("2'".indexOf(m[5] || 'X') + 2);
			moveseq.push([moveMap.indexOf("FRUBLD".charAt(f % 6)), w, p]);
		}
		return moveseq;
	}


	var keyback = true;

	$(function() {
		regProp('kernel', 'useMilli', 0, PROPERTY_USEMILLI, [false]);
		regProp('kernel', 'timeFormat', 1, PROPERTY_FORMAT, ['h', ['h', 'm', 's'], ['hh:mm:ss.XX(X)', 'mm:ss.XX(X)', 'ss.XX(X)']]);
		temp.appendTo('body');
		wndCtn.appendTo('body');

		$(document).keydown(function(e) {
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

		$('#touch').bind('touchstart', function(e) {
			refocus();
			timer.onkeydown({which: 32});
			e.preventDefault && e.preventDefault();
		});
		$('#touch').bind('touchend', function(e) {
			refocus();
			timer.onkeyup({which: 32});
			e.preventDefault && e.preventDefault();
		});
		$('#touch').bind('touch', function(e){
			e.preventDefault && e.preventDefault();
		});

		/**
		 * ontouch events might not work on microsoft surface pad or laptop,
		 * so we add the mouse timer function to support such devices.
		 */
		$('#touch').mousedown(function(e) {
			if (e.which == 1 && getProp('useMouse')) { //left button only
				timer.onkeydown({which: 32});
				e.preventDefault && e.preventDefault();
			}
		});
		$('#touch').mouseup(function(e) {
			if (e.which == 1 && getProp('useMouse')) {
				timer.onkeyup({which: 32});
				e.preventDefault && e.preventDefault();
			}
		});

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
		var validKeys = ['properties', 'cachedScr', 'wcaData', 'gglData', 'locData'];

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
		parseScramble: parseScramble,
		blur: refocus,
		ui: ui,
		pround: prettyRound,
		round: round
	};
});
 
