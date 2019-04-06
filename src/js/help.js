"use strict";

var help = execMain(function() {

	var docs = {};

	var table = $('<table class="options" />');
	var left = $('<td />');
	var right = $('<td />').addClass('tabValue');

	table.append($('<tr />').append(left, right));

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
		right.html(docs[val1]);
		return true;
	}

	function generateDocs() {
		docs[ABOUT_LANG] = $('<div />');
		var elems = $('#about').children();
		for (var i = 0; i < elems.length; i++) {
			var elem = elems.eq(i);
			if (elem.is('ul')) {
				var type = elems.eq(i - 1).appendTo(kernel.temp).html();
				docs[type] = elem.appendTo(kernel.temp);
			} else if (i >= 1 && !elems.eq(i - 1).is('h2, ul')) {
				elems.eq(i - 1).appendTo(docs[ABOUT_LANG]);
			}
		}
	}

	$(function() {
		generateDocs();
		updateTable();
		$('#about').html(table);
	});
});