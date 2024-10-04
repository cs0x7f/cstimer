"use strict";

var help = execMain(function(regProp, setProp, getProp) {

	var docs = {};

	var table = $('<table class="options" />');
	var left = $('<td />');
	var right = $('<td />').addClass('tabValue');
	var rightDiv = $('<div class="noScrollBar helptable">');
	var donateDiv = $('<div />');

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

	function updateLeft(val) {
		var elems = left.children();
		if (elems.length == 0) {
			for (var type in docs) {
				$('<div />').html(type).addClass(type == val ? 'tab enable' : 'tab disable').click(leftClick).appendTo(left);
			}
			elems = left.children();
		}
		elems.each(function(idx, elem) {
			elem = $(elem);
			if (elem.html() == val) {
				elem.removeClass('disable').addClass('enable');
			} else {
				elem.removeClass('enable').addClass('disable');
			}
		});
	}

	function updateRight(val) {
		setTimeout(function() {
			if (docs[val]) {
				rightDiv.scrollTop(rightDiv.scrollTop() + docs[val].position().top - 3);
			}
		}, 0);
		return true;
	}

	function onOptScroll() {
		var type = ABOUT_LANG;
		for (var m in docs) {
			if (docs[m].position().top > 10) {
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

	function improveColorPreview() {
		var links = rightDiv.find('.click');
		for (var i = 0; i < links.length; i++) {
			var obj = links.eq(i);
			if (!colstr_re.exec(obj.attr('href'))) {
				continue;
			}
			obj.parent().after(genColorPreview(obj.attr('href')));
			obj.parent().remove();
		}
	}

	var colstr_re = /^\s*((#[0-9a-fA-F]{3}){7})\s*$/;

	function genColorPreview(colScheme) {
		var m = colstr_re.exec(colScheme);
		if (!m) {
			return;
		}
		var colors = [];
		for (var i = 0; i < 7; i++) {
			colors[i] = colScheme.substr(i * 4, 4);
		}
		var obj = $(
			'<div class="colorPrevV" style="width:10em; height:14em;">' +
			'<table style="width:100%; height:100%; border-collapse: collapse;"><tbody>' +
			'<tr style="height:15%;"><td class="clpr-bd" colspan=8>U R F D L B</td></tr>' +
			'<tr style="height:50%;"><td colspan=8><span class="clpr-tm" style="font-size:2em; font-family:lcd;">0.00</span><br><span class="clpr-lk">ao5: xx.xx<br>ao12: xx.xx</span></td></tr>' +
			'<tr style="height:25%;"><td class="clpr-bd" colspan=4>XXxXX<br>XXxXX</td><td class="bgcolor"></td></tr>' +
			'<tr style="height:10%;"><td class="clpr-bt0"/><td class="clpr-bt0"/><td class="clpr-bt1"/>' +
			'<td class="clpr-lg" style="width:33%; font-family:MyImpact;" colspan=2>csTimer</td>' +
			'<td class="clpr-bt1"/><td class="clpr-bt0"/><td class="clpr-bt0"/></tr>' +
			'</tbody></table></div>' +
			'<div class="colorPrevH" style="width:15em; height:11em;">' +
			'<table style="width:100%; height:100%; border-collapse: collapse;"><tbody>' +
			'<tr style="height:15%;"><td class="clpr-bt0"/><td class="clpr-bt0"/><td class="clpr-bt1"/>' +
			'	<td class="clpr-bd" rowspan=2>U R F D L B</td></tr>' +
			'<tr style="height:15%;"><td class="clpr-lg" style="font-family:MyImpact;" colspan=3>csTimer</td></tr>' +
			'<tr style="height:15%;"><td class="clpr-bt1"/><td class="clpr-bt0"/><td class="clpr-bt0"/>' +
			'	<td rowspan=2><span class="clpr-tm" style="font-size:2em; font-family:lcd;">0.00</span><br>' +
			'		<span class="clpr-lk">ao5: xx.xx<br>ao12: xx.xx</span></td></tr>' +
			'<tr style="height:45%;"><td class="clpr-bd" colspan=3>XXxXX<br>XXxXX</td></tr>' +
			'</tbody></table>'
		);
		obj.css({'color': colors[0], 'background-color': colors[1]});
		obj.find('.clpr-bt0').css({'width': '11%'}).html('O');
		obj.find('.clpr-bt1').css({'width': '11%', 'background-color': colors[3]}).html('O');
		obj.find('.clpr-bd').css({'background-color': colors[2]});
		obj.find('.clpr-lk').css({'color': colors[4]});
		obj.find('.clpr-lg').css({'color': colors[5], 'background-color': colors[6]});
		obj.click(function(url) {
			if ($.confirm('Change color scheme?')) {
				window.location.href = url;
			}
		}.bind(null, colScheme));
		return obj;
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
		improveColorPreview();
		updateTable();
		$('#about').html(table);
		rightDiv.scrollTop();
		rightDiv.unbind('scroll').scroll(onOptScroll);
		regProp('vrc', 'vrcKBL', ~5, 'VRC Keyboard Layout', ['qwerty']);
		var layout = getProp('vrcKBL');
		genKeymapTable(layout);
		$('.donate').appendTo(donateDiv);
		donateDiv.find('a').each(function(idx, elem) {
			$(elem).attr('target', '_blank');
		});
		kernel.addButton('donate', BUTTON_DONATE, function() {
			kernel.showDialog([donateDiv, 0, undefined, 0], 'donate', BUTTON_DONATE.replace(/-?<br>-?/g, ''));
		}, 5);
	});

	return {
		genColorPreview: genColorPreview,
		getMappedCode: getMappedCode
	}
}, [kernel.regProp, kernel.setProp, kernel.getProp]);
