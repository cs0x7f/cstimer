"use strict";

var help = execMain(function(regProp, setProp, getProp) {

	var docs = {};

	var table = $('<table class="options" />');
	var left = $('<td />');
	var right = $('<td />').addClass('tabValue');
	var rightDiv = $('<div class="noScrollBar helptable">');

	table.append($('<tr />').append(left, right.append(rightDiv)));

	function leftClick() {
		if ($(this).hasClass('enable')) {
			return;
		}
		updateTable($(this).html());
	}

	function updateTable(val) {
		if (val === undefined) {
			for (val in docs) {
				break;
			}
		}
		updateRight(val) && updateLeft(val);
	}

	function updateLeft(val1, val2) {
		left.children().appendTo(kernel.temp);
		for (var type in docs) {
			$('<div />').html(type).addClass(type == val1 ? 'tab enable' : 'tab disable').click(leftClick).appendTo(left);
		}
	}

	function updateRight(val1, val2) {
		setTimeout(function() {
			if (docs[val1]) {
				rightDiv.scrollTop(rightDiv.scrollTop() + docs[val1].position().top - 3);
			}
		}, 0);
		return true;
	}

	function onOptScroll() {
		var type = ABOUT_LANG;
		for (var m in docs) {
			if (docs[m].position().top > 50) {
				continue;
			}
			type = docs[m].is('h1, h2, h3') ? docs[m].html() : ABOUT_LANG;
		}
		updateLeft(type);
	}

	function generateDocs() {
		var elems = $('#about').children();
		for (var i = 0; i < elems.length; i++) {
			var elem = elems.eq(i);
			var type = elem.appendTo(rightDiv).html();
			if (elem.is('h1, h2, h3') && !elems.eq(i + 1).is('h1, h2, h3')) {
				docs[type] = elem;
			} else {
				docs[ABOUT_LANG] = docs[ABOUT_LANG] || elem;
			}
		}
	}


	var layouts = {
		"qwerty": "`1234567890-=qwertyuiop[]\\asdfghjkl;'zxcvbnm,./",
		"dvorak": "`1234567890[]',.pyfgcrl/=\\aoeuidhtns-;qjkxbmwvz",
		"colemak": "`1234567890-=qwfpgjluy;[]\\arstdhneio'zxcvbkm,./"
	}

	var keymap = [
		[1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		[13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
		[26, 27, 28, 29, 30, 31, 32, 33, 34, 35],
		[37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
	];

	var funcmap = [
		[" S'", "  E", "&lt;", "&gt;", "  M", "  M", "&lt;", "&gt;", " E'", "  S"],
		[" z'", "  B", " L'", "Lw'", "  x", "  x", " Rw", "  R", " B'", "  z"],
		[" y'", "  D", "  L", " U'", " F'", "  F", "  U", " R'", " D'", "  y"],
		[" Dw", " M'", "Uw'", " Lw", " x'", " x'", "Rw'", " Uw", " M'", "Dw'"],
	];

	var codeMap = {};

	function procClick(e) {
		var val = $(e.target).val();
		kernel.blur();
		$(e.target).val('...');
		if (val in layouts) {
			setProp('vrcKBL', val);
			genKeymapTable(val);
			return;
		}
		if (val != 'other') {
			return;
		}
		var prev = getProp('vrcKBL');
		prev = layouts[prev] || prev;
		var ret = prompt('input keyboard layout', prev);
		if (!ret) {
			return;
		}
		if (ret.length != 47) {
			alert('Invalid Keyboard Layout');
		}
		for (var i=0; i<ret.length; i++) {
			if (ret.indexOf(layouts['qwerty'].charAt(i)) == -1) {
				alert('Invalid Keyboard Layout');
				return;
			}
		}
		setProp('vrcKBL', ret);
		genKeymapTable(ret);
	}

	function genKeymapTable(layout) {
		if (layout in layouts) {
			layout = layouts[layout];
		}
		var ret = [];
		layout = layout.toUpperCase();
		for (var i = 0; i < keymap.length; i++) {
			ret.push('<tr>')
			for (var j = 0; j < keymap[i].length; j++) {
				var keyIdx = keymap[i][j];
				ret.push("<td>" + layout[keyIdx] + "<br><span>" + funcmap[i][j] + "</span></td>");
			}
			ret.push('</tr>')
		}
		var table = $("#vrckey");
		table.find('tr:not(:first)').remove();
		var selectTr = $('<tr>');
		var select = $('<select id="vrckeylayout">');
		select.append($('<option />').val('...').html('select layout'));
		for (var name in layouts) {
			select.append($('<option />').val(name).html(name));
		}
		select.append($('<option />').val('other').html('...'));
		select.unbind('change').change(procClick);
		table.append(selectTr.append($('<th colspan="10">').append('Layout: ', select)));
		table.append(ret.join(''));
		genCodeMap(layout);
	}

	function genCodeMap(layout) {
		var layout0 = layouts['qwerty'].toUpperCase();
		layout = layout.toUpperCase();
		var char2code = {
			96: 192,
			45: 189,
			61: 187,
			91: 219,
			93: 221,
			92: 220,
			59: 186,
			39: 222,
			44: 188,
			46: 190,
			47: 191
		};
		codeMap = {}
		for (var i = 0; i < layout0.length; i++) {
			var raw = layout0.charCodeAt(i);
			var cur = layout.charCodeAt(i);
			raw = char2code[raw] || raw;
			cur = char2code[cur] || cur;
			if (raw != cur) {
				codeMap[cur] = raw;
			}
			if (cur == 186) {
				codeMap[59] = raw;
			}
		}
	}

	function getMappedCode(keyCode) {
		return codeMap[keyCode] || keyCode;
	}

	$(function() {
		generateDocs();
		updateTable();
		$('#about').html(table);
		rightDiv.scrollTop();
		rightDiv.unbind('scroll').scroll(onOptScroll);
		regProp('vrc', 'vrcKBL', ~5, 'VRC Keyboard Layout', ['qwerty']);
		var layout = getProp('vrcKBL');
		genKeymapTable(layout);
	});

	return {
		getMappedCode: getMappedCode
	}
}, [kernel.regProp, kernel.setProp, kernel.getProp]);
