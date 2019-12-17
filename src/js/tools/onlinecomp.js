"use strict";

var onlinecomp = execMain(function() {
	var accountDiv = $('<div>');
	var wcaSpan = $('<span class="click">');
	var uidSpan = $('<span class="click">');
	var refreshButton = $('<input type="button">').val(OLCOMP_UPDATELIST).click(updateCompList);
	var compSelectDiv = $('<div>');
	var compProgressDiv = $('<div class="noScrollBar" style="max-height: 8em; overflow-y: auto;">');
	var compMainButton = $('<input type="button">');
	var viewResultButton = $('<input type="button">').val(OLCOMP_VIEWRESULT);
	var viewMyResultButton = $('<input type="button">').val(OLCOMP_VIEWMYRESULT);
	var anonymInput = $('<input type="checkbox">');
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
		resetProgress();
		if (curPath == '|' + OLCOMP_UPDATELIST + '...') {
			updateCompList();
		}
	}

	function getSelect(curPath, level) {
		if (pathList.indexOf(curPath) != -1) {
			return null;
		}
		var values = [];
		curPath = curPath + '|';
		var curPathLen = curPath.length;
		var ret = $('<select style="max-width: unset;">');
		for (var i = 0; i < pathList.length; i++) {
			if (pathList[i].startsWith(curPath)) {
				var curValue = pathList[i].slice(curPathLen).split('|', 1)[0];
				if (values.indexOf(curValue) == -1) {
					values.push(curValue);
					ret.append($('<option>').val(curValue).html(curValue));
				}
			}
		}
		return values.length == 0 ? null : ret.change(selectChange);;
	}

	function updateCompList() {
		refreshButton.val('...');
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
			pathList.push('|' + OLCOMP_UPDATELIST + '...');
			compDict[OLCOMP_UPDATELIST + '...'] = 'update';
			updatePathSelect('', 0);
			resetProgress();
			refreshButton.hide();
		}).error(function() {
			logohint.push('Network Error');
			refreshButton.val(OLCOMP_UPDATELIST);
		});
	}

	function getCompPath() {
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
		return [comp, path];
	}

	function fetchScramble() {
		var comppath = getCompPath();
		$.post('https://cstimer.net/comp.php', {
			'action': 'scramble',
			'comp': comppath[0],
			'path': comppath[1]
		}, function(value) {
			value = JSON.parse(value);
			if (value['retcode'] != 0 || !value['data']) {
				logohint.push(value['reason'] || 'Server Error');
				return;
			}
			var scrambles = value['data'];
			compScrambles = scrambles;
			compTypes = $.map(scrambles, function(val) {
				var m = /^\$T([a-zA-Z0-9]+)\$\s*(.*)$/.exec(val);
				return m ? scramble.getTypeName(m[1]) : '???';
			});
			resetProgress(true);
			kernel.setProp('scrType', 'remoteComp');
		}).error(function() {
			logohint.push('Network Error');
		});
	}

	function setCompId() {
		var compid = prompt(OLCOMP_SUBMITAS, exportFunc.getDataId('locData', 'compid'));
		if (compid == null) {
			return false;
		} else if (!exportFunc.isValidId(compid)) {
			alert(EXPORT_INVID);
			return false;
		}
		localStorage['locData'] = JSON.stringify({ id: exportFunc.getDataId('locData', 'id'), compid: compid });
		updateAccountDiv();
		return compid;
	}

	function updateAccountDiv() {
		accountDiv.empty().append('ID: ');
		wcaSpan.empty();
		uidSpan.empty();

		var wcauid = exportFunc.getDataId('wcaData', 'cstimer_token');
		if (wcauid) {
			var wcaid = exportFunc.getDataId('wcaData', 'wca_me')['wca_id'];
			wcaSpan.append(wcaid || 'WCA Account', ' (WCA)').click(function() {
				exportFunc.logoutFromWCA(true);
				updateAccountDiv();
			});
			accountDiv.append(wcaSpan);
			return;
		} else {
			wcaSpan.append(EXPORT_LOGINWCA);
			wcaSpan.click(function() {
				location.href = exportFunc.wcaLoginUrl;
			});
		}
		var compid = exportFunc.getDataId('locData', 'compid');
		if (compid) {
			uidSpan.append(compid + ' (' + OLCOMP_ANONYM + ')');
		} else {
			uidSpan.append('N/A (' + OLCOMP_ANONYM + ')');
		}
		accountDiv.append(uidSpan.unbind('click').click(setCompId), ' | ', wcaSpan);
	}

	var isInit = false;

	function execFunc(fdiv, e) {
		if (!fdiv || isInit) {
			isInit = !!fdiv;
			return;
		}
		fdiv.empty().append($('<div style="font-size: 0.75em; text-align: center;">')
			.append(accountDiv, refreshButton, compSelectDiv)
			.append(compProgressDiv)
			.append(compMainButton, ' ', viewResultButton, ' ')
			.append($('<label>').append(anonymInput, OLCOMP_WITHANONYM), ' ', viewMyResultButton));
		updatePathSelect('', 0);
		updateAccountDiv();
		resetProgress();
		isInit = true;
	}

	function resetProgress(keepScr, keepSubmit) {
		solves = [];
		if (!keepScr) {
			compScrambles = [];
			compTypes = [];
		}
		if (!keepSubmit) {
			submitted = false;
		}
		updateProgress();
	}

	function updateProgress() {
		compMainButton.unbind('click');
		viewResultButton.unbind('click');
		viewMyResultButton.unbind('click').click(viewMyResult);
		if (pathSelect.length < 2) {
			compMainButton.attr('disabled', true).val(OLCOMP_START);
			viewResultButton.attr('disabled', true);
		} else {
			compProgressDiv.empty();
			if (compTypes.length == 0) {
				if (!pathSelect[0].val().startsWith('*') && !pathSelect[0].val().startsWith('+') && !submitted) {
					compMainButton.removeAttr('disabled').val(OLCOMP_START).click(fetchScramble);
				} else if (submitted) {
					compMainButton.attr('disabled', true).val(OLCOMP_SUBMIT);
				} else {
					compMainButton.attr('disabled', true).val(OLCOMP_START);
				}
			} else {
				for (var i = 0; i < compTypes.length; i++) {
					var m = /^\$T([a-zA-Z0-9]+)\$\s*(.*)$/.exec(compTypes[i]);
					compProgressDiv.append((i + 1) + '. ' + (solves[i] ? stats.pretty(solves[i][0]) : compTypes[i]), '<br>');
				}
				if (solves.length == compTypes.length && !submitted) {
					compMainButton.removeAttr('disabled');
					compMainButton.val(OLCOMP_SUBMIT).click(submitSolves);
				} else {
					compMainButton.attr('disabled', true);
				}
			}
			viewResultButton.removeAttr('disabled').click(viewResult);
		}
		kernel.blur();
	}

	function submitSolves() {
		if (submitted) {
			return;
		}
		var uid = exportFunc.getDataId('wcaData', 'cstimer_token') || exportFunc.getDataId('locData', 'compid') || setCompId();
		if (!uid) {
			return;
		}
		var comppath = getCompPath();
		$.post('https://cstimer.net/comp.php', {
			'action': 'submit',
			'comp': comppath[0],
			'path': comppath[1],
			'uid': uid,
			'value': JSON.stringify(solves)
		}, function(value) {
			if (value == '{"retcode":0}') {
				submitted = true;
				logohint.push('Submitted');
			} else {
				logohint.push('Network Error');
			}
			updateProgress();
		}).error(function() {
			logohint.push('Network Error');
		});
	}

	function viewResult() {
		if (solves.length != 0 && !submitted && !confirm(OLCOMP_ABORT)) {
			return;
		}
		resetProgress(false, true);
		var comppath = getCompPath();
		var showAnonym = anonymInput.prop('checked') ? 1 : 0;
		$.post('https://cstimer.net/comp.php', {
			'action': 'result',
			'comp': comppath[0],
			'path': comppath[1],
			'anonym': showAnonym
		}, function(value) {
			try {
				value = JSON.parse(value);
			} catch (e) {
				value = {};
			}
			if (value['retcode'] !== 0) {
				logohint.push('Server Error');
				return;
			}
			var myid = $.sha256('cstimer_public_salt_' + exportFunc.getDataId('locData', 'compid'));
			var mywcaid = (exportFunc.getDataId('wcaData', 'wca_me') || {})['wca_id'];
			var curScrambles = value['scramble'];
			value = $.map(value['data'], function(val) {
				var solves = JSON.parse(val['value']);
				if (solves.length != 5) { //invalid data
					return;
				}
				var timestat = new TimeStat([5], solves.length, function(idx) {
					return solves[idx][0][0] == -1 ? -1 : (solves[idx][0][0] + solves[idx][0][1]);
				});
				timestat.getAllStats();
				return {
					'uid': val['uid'],
					'wca_id': val['wca_id'],
					'value': solves,
					'ao5': timestat.lastAvg[0][0],
					'bo5': timestat.bestTime
				};
			});
			value.sort(function(a, b) {
				var cmp1 = TimeStat.dnfsort(a['ao5'], b['ao5']);
				return cmp1 == 0 ? TimeStat.dnfsort(a['bo5'], b['bo5']) : cmp1;
			});

			var ret = ['<table class="table"><tr><th></th><th>User</th><th>ao5</th><th>bo5</th><th>Results</th></tr>'];
			for (var i = 0; i < value.length; i++) {
				var uid = value[i]['uid'];
				var solves = value[i]['value'];
				var ao5 = value[i]['ao5'];
				var bo5 = value[i]['bo5'];
				var wcaid = value[i]['wca_id'];
				ret.push('<tr><td>' + (i + 1) + '</td>');
				if (wcaid !== undefined) {
					if (!wcaid) {
						uid = OLCOMP_WCAACCOUNT;
					} else {
						uid = '<a target="_blank" href="https://www.worldcubeassociation.org/persons/' + wcaid + '">' + wcaid + '</a>';
					}
					ret.push(wcaid == mywcaid ? '<th>' + OLCOMP_ME + ':' + uid + '</th><td>' : '<td>' + uid + '</td><td>');
				} else {
					ret.push(uid == myid ? '<th>' + OLCOMP_ME + '</th><td>' : '<td>' + OLCOMP_ANONYM + '</td><td>');
				}
				ret.push(kernel.pretty(ao5) + '</td><td>' + kernel.pretty(bo5) + '</td><td>');
				for (var j = 0; j < solves.length; j++) {
					if (solves[j].length > 4) { // from vrc or bluetooth
						solves[j][1] = scramble.scrStd('', curScrambles[j] || '')[1];
						ret.push('<a target="_blank" class="click" href="' + stats.getReviewUrl(solves[j]) + '">' + stats.pretty(solves[j][0]) + '</a> ');
					} else {
						ret.push(stats.pretty(solves[j][0]) + ' ');
					}
				}
				ret.push('</td>');
				ret.push('</tr>');
			}
			ret.push('</table>');
			compProgressDiv.empty().html(ret.join(''));
		}).error(function() {
			logohint.push('Network Error');
		});
	}

	function viewMyResult() {
		if (solves.length != 0 && !submitted && !confirm(OLCOMP_ABORT)) {
			return;
		}
		resetProgress(false, true);
		var uid = exportFunc.getDataId('wcaData', 'cstimer_token') || exportFunc.getDataId('locData', 'compid') || setCompId();
		if (!uid) {
			return;
		}
		$.post('https://cstimer.net/comp.php', {
			'action': 'myresult',
			'uid': uid
		}, function(value) {
			try {
				value = JSON.parse(value);
			} catch (e) {
				value = {};
			}
			if (value['retcode'] !== 0) {
				logohint.push('Server Error');
				return;
			}
			value = value['data'];
			var ret = ['<table class="table"><tr><th></th><th>Comp.</th><th>ao5</th><th>bo5</th><th>Results</th></tr>'];
			for (var i = 0; i < value.length; i++) {
				var solves = JSON.parse(value[i]['value']);
				if (solves.length != 5) { //invalid data
					return;
				}
				var timestat = new TimeStat([5], solves.length, function(idx) {
					return solves[idx][0][0] == -1 ? -1 : (solves[idx][0][0] + solves[idx][0][1]);
				});
				timestat.getAllStats();
				ret.push('<tr><td>' + (i + 1) + '</td>');
				ret.push('<td>' + value[i]['fullname'] + '|' + value[i]['path'] + '</td>');
				ret.push('<td>' + kernel.pretty(timestat.lastAvg[0][0]) + '</td>');
				ret.push('<td>' + kernel.pretty(timestat.bestTime) + '</td><td>');
				for (var j = 0; j < solves.length; j++) {
					if (solves[j].length > 4) { // from vrc or bluetooth
						solves[j][1] = scramble.scrStd('', JSON.parse(value[i]['scramble'])[j] || '')[1];
						ret.push('<a target="_blank" class="click" href="' + stats.getReviewUrl(solves[j]) + '">' + stats.pretty(solves[j][0]) + '</a> ');
					} else {
						ret.push(stats.pretty(solves[j][0]) + ' ');
					}
				}
				ret.push('</td>');
				ret.push('</tr>');
			}
			ret.push('</table>');
			compProgressDiv.empty().html(ret.join(''));
		}).error(function() {
			logohint.push('Network Error');
		});
	}

	var solves = [];
	var submitted = false;

	function procSignal(signal, value) {
		if (!isInit) {
			return;
		}
		if (signal == 'export') {
			updateAccountDiv();
			return;
		}
		value = JSON.parse(JSON.stringify(value));
		var curScr = value[1];
		value[1] = '';
		value[2] = '';
		if (signal == 'timestd') {
			for (var i = solves.length; i < compScrambles.length; i++) {
				var targetScr = scramble.scrStd('', compScrambles[i])[1];
				if (targetScr != curScr) {
					value[0] = [-1, 1];
					solves.push(value);
				} else {
					solves.push(value);
					break;
				}
			}
		} else if (signal == 'timepnt') {
			for (var i = 0; i < solves.length; i++) {
				var targetScr = scramble.scrStd('', compScrambles[i])[1];
				if (targetScr == curScr) {
					solves[i] = value;
					break;
				}
			}
		}
		updateProgress();
	}

	var compScrambles = [];
	var compTypes = [];

	function getScrambles() {
		if (solves.length == 0) {
			return compScrambles.slice();
		} else {
			return [];
		}
	}

	$(function() {
		tools.regTool('onlinecomp', OLCOMP_OLCOMP, execFunc);
		kernel.regListener('onlinecomp', 'timestd', procSignal);
		kernel.regListener('onlinecomp', 'timepnt', procSignal);
		kernel.regListener('onlinecomp', 'export', procSignal, /^account$/);
	});

	return {
		getScrambles: getScrambles
	}
});
