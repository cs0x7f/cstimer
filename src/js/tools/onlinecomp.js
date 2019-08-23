"use strict";

var onlinecomp = execMain(function() {
	var refreshButton = $('<input type="button" value="Get Competition List">').click(updateCompList);
	var compSelectDiv = $('<div>');
	var compSelect = $('<select>');
	var compProgressDiv = $('<div>');
	var compMainButton = $('<input type="button">');
	var viewResultButton = $('<input type="button" value="View Result">');
	var pathSelect = [];
	var pathList = [];
	var compDict = {};

	function updatePathSelect(curPath, level) {
		while (pathSelect.length > level) {
			pathSelect.pop().remove();
		}
		var ret = getSelect(curPath, level);
		if (ret) {
			pathSelect[level] = ret;
			compSelectDiv.append(pathSelect[level]);
			updatePathSelect(curPath + '|' + pathSelect[level].val(), level + 1);
		}
	}

	function selectChange(e) {
		var level = $(e.target).prevAll('select').length;
		var curPath = '';
		for (var i = 0; i <= level; i++) {
			curPath = curPath + '|' + pathSelect[i].val();
		}
		updatePathSelect(curPath, level + 1);
		kernel.blur();
	}

	function getSelect(curPath, level) {
		if (pathList.indexOf(curPath) != -1) {
			return null;
		}
		var values = [];
		curPath = curPath + '|';
		var curPathLen = curPath.length;
		var ret = $('<select>').change(selectChange);
		for (var i = 0; i < pathList.length; i++) {
			if (pathList[i].startsWith(curPath)) {
				var curValue = pathList[i].slice(curPathLen).split('|', 1)[0];
				if (values.indexOf(curValue) == -1) {
					values.push(curValue);
					ret.append($('<option>').val(curValue).html(curValue));
				}
			}
		}
		return values.length == 0 ? null : ret;
	}

	function updateCompList() {
		kernel.blur();
		$.post('https://cstimer.net/comp.php', {
			'action': 'list'
		}, function(value) {
			pathList = [];
			value = JSON.parse(value)['data'];
			for (var i = 0; i < value.length; i++) {
				var compFullName = value[i]['fullname'];
				compDict[compFullName] = value[i]['name']
				var paths = JSON.parse(value[i]['value']);
				for (var j = 0; j < paths.length; j++) {
					pathList.push('|' + compFullName + '|' + paths[j]);
				}
			}
			updatePathSelect('', 0);
			clearProgress();
		}).error(function() {
			logohint.push('Network Error');
		});
	}

	function fetchScramble() {
		var curPath = '';
		for (var i = 0; i < pathSelect.length; i++) {
			curPath += '|' + pathSelect[i].val();
		}
		if (pathList.indexOf(curPath) == -1) {
			alert('Invalid Input');
			return;
		}
		var comp = curPath.slice(1).split('|', 1)[0];
		var path = curPath.slice(comp.length + 2);
		comp = compDict[comp];
		$.post('https://cstimer.net/comp.php', {
			'action': 'scramble',
			'comp': comp,
			'path': path
		}, function(value) {
			var scrambles = JSON.parse(value)['data'];
			if (!scrambles) {
				logohint.push('Network Error');
				return;
			}
			compScrambles = scrambles;
			compTypes = $.map(scrambles, function(val) {
				var m = /^\$T([a-zA-Z0-9]+)\$\s*(.*)$/.exec(val);
				return m ? scramble.getTypeName(m[1]) : '???';
			});
			clearProgress();
			kernel.setProp('scrType', 'remoteComp');
		}).error(function() {
			logohint.push('Network Error');
		});
	}

	var isInit = false;

	function execFunc(fdiv, e) {
		if (!fdiv || isInit) {
			isInit = !!fdiv;
			return;
		}
		fdiv.empty().append(refreshButton, compSelectDiv, compProgressDiv, compMainButton, viewResultButton);
		compMainButton.hide();
		viewResultButton.hide();
		updatePathSelect('', 0);
		isInit = true;
	}

	function clearProgress() {
		solves = [];
		submitted = false;
		updateProgress();
	}

	function updateProgress() {
		compProgressDiv.empty();
		for (var i = 0; i < compTypes.length; i++) {
			var m = /^\$T([a-zA-Z0-9]+)\$\s*(.*)$/.exec(compTypes[i]);
			compProgressDiv.append((i + 1) + '. ' + (solves[i] ? stats.pretty(solves[i][0]) : compTypes[i]), '<br>');
		}
		compMainButton.show().unbind('click');
		viewResultButton.show().unbind('click').click(viewResult);
		if (compTypes.length == 0) {
			compMainButton.val('Start!').click(fetchScramble);
		} else {
			compMainButton.val('Submit!').click(submitSolves);
			if (solves.length == compTypes.length) {
				compMainButton.removeAttr('disabled');
			} else {
				compMainButton.attr('disabled', true);
			}
		}
	}

	function submitSolves() {
		console.log('submit solves', solves);
	}

	function viewResult() {
		if (solves.length == 0 || submitted || !confirm('Abort competition and show results?')) {
			return;
		}
		console.log('view result');
	}

	var solves = [];
	var submitted = false;

	function procSignal(signal, value) {
		solves.push(value);
		updateProgress();
	}


	var compScrambles = [];
	var compTypes = [];

	function getScrambles() {
		if (solves.length == 0) {
			return compScrambles;
		} else {
			return [];
		}
	}

	$(function() {
		tools.regTool('onlinecomp', 'Online Competition', execFunc);
		kernel.regListener('onlinecomp', 'timestd', procSignal);
	});

	return {
		getScrambles: getScrambles
	}
});