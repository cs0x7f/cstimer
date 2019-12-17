"use strict";

var help = execMain(function() {

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
			rightDiv.scrollTop(rightDiv.scrollTop() + docs[val1].position().top - 3);
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

	$(function() {
		generateDocs();
		updateTable();
		$('#about').html(table);
		rightDiv.scrollTop();
		rightDiv.unbind('scroll').scroll(onOptScroll);
	});
});
