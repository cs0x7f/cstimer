"use strict";

var exportFunc = execMain(function() {
	var wcaLoginUrl = 'https://www.worldcubeassociation.org/oauth/authorize?client_id=63a89d6694b1ea2d7b7cbbe174939a4d2adf8dd26e69acacd1280af7e7727554&response_type=code&scope=public&redirect_uri=' + encodeURI(location.href.split('?')[0]);
	var gglLoginUrl = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=738060786798-octf9tngnn8ibd6kau587k34au263485.apps.googleusercontent.com&response_type=token&scope=https://www.googleapis.com/auth/drive.appdata&redirect_uri=' + encodeURI(location.href.split('?')[0]);

	var exportDiv = $('<div />');
	var exportTable = $('<table class="expOauth expUpDown">');

	var wcaDataTd = $('<td></td>');
	var wcaDataTr = $('<tr>').append('<td class="img"/>', wcaDataTd);
	var inServWCA = $('<a class="click"/>').html(EXPORT_FROMSERV + ' (csTimer)').click(downloadData);
	var outServWCA = $('<a class="click"/>').html(EXPORT_TOSERV + ' (csTimer)').click(uploadDataClk);

	var gglDataTd = $('<td></td>');
	var gglDataTr = $('<tr>').append('<td class="img"/>', gglDataTd);
	var inServGGL = $('<a class="click"/>');
	var outServGGL = $('<a class="click"/>');

	var inFile = $('<input type="file" id="file" accept="text/*"/>');
	var inOtherFile = $('<input type="file" id="file" accept="text/*"/>');
	var outFile = $('<a class="click"/>').html(EXPORT_TOFILE);

	var inServ = $('<a class="click"/>').html(EXPORT_FROMSERV + ' (csTimer)').click(downloadData);
	var outServ = $('<a class="click"/>').html(EXPORT_TOSERV + ' (csTimer)').click(uploadDataClk);

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

	function updateExpString() {
		return storage.exportAll().then(function(exportObj) {
			exportObj['properties'] = mathlib.str2obj(localStorage['properties']);
			expString = JSON.stringify(exportObj);
		});
	}

	function importData() {
		var dataobj = null;
		try {
			dataobj = JSON.parse(this.result);
		} catch (e) {
			logohint.push('Invalid Data');
			return;
		}
		loadData(dataobj);
	}

	function loadData(data) {
		var sessionDelta = 0;
		var solveAdd = 0;
		var solveRm = 0;
		storage.exportAll().then(function(exportObj) {
			for (var sessionIdx = 1; sessionIdx <= ~~kernel.getProp('sessionN'); sessionIdx++) {
				var times = mathlib.str2obj(exportObj['session' + sessionIdx] || []);
				var timesNew = mathlib.str2obj(data['session' + sessionIdx] || []);
				if (times.length != timesNew.length) {
					sessionDelta++;
					solveAdd += Math.max(timesNew.length - times.length, 0);
					solveRm += Math.max(times.length - timesNew.length, 0);
				}
			}
			if (confirm(IMPORT_FINAL_CONFIRM
					.replace("%d", sessionDelta)
					.replace("%a", solveAdd)
					.replace("%r", solveRm)
				)) {
				return Promise.resolve();
			} else {
				return Promise.reject();
			}
		}).then(function() {
			if ('properties' in data) {
				var devData = localStorage['devData'] || '{}';
				var wcaData = localStorage['wcaData'] || '{}';
				var gglData = localStorage['gglData'] || '{}';
				var locData = localStorage['locData'] || '{}';
				localStorage.clear();
				localStorage['devData'] = devData;
				localStorage['wcaData'] = wcaData;
				localStorage['gglData'] = gglData;
				localStorage['locData'] = locData;
				localStorage['properties'] = mathlib.obj2str(data['properties']);
				kernel.loadProp();
			}
			storage.importAll(data).then(function() {
				location.reload();
			});
		}, $.noop);
	}

	function importFile(reader) {
		if (this.files.length) {
			var f = this.files[0];
			reader.readAsBinaryString(f);
		}
	}

	function isValidId(id) {
		return id && /^[A-Za-z0-9]+$/.exec(id);
	}

	function getDataId(key1, key2) {
		try {
			return JSON.parse(localStorage[key1])[key2] || '';
		} catch (err) {
			return '';
		}
	}

	function getId(e) {
		var id = null;
		if (e.target === outServWCA[0] || e.target === inServWCA[0]) {
			id = getDataId('wcaData', 'cstimer_token');
		} else {
			id = prompt(EXPORT_USERID, getDataId('locData', 'id'));
			if (id == null) {
				return;
			}
			localStorage['locData'] = JSON.stringify({ id: id, compid: getDataId('locData', 'compid') });
			kernel.pushSignal('export', ['account', 'locData']);
		}
		if (!isValidId(id)) {
			alert(EXPORT_INVID);
			return;
		}
		return id;
	}

	function uploadData(id) {
		return new Promise(function(resolve, reject) {
			var compExpString = LZString.compressToEncodedURIComponent(expString);
			$.post('https://cstimer.net/userdata.php', {
				'id': id,
				'data': compExpString
			}, function(val) {
				if (val['retcode'] == 0) {
					resolve(val);
				} else {
					reject(val);
				}
			}, 'json').error(reject);
		});
	}

	function uploadDataClk(e) {
		var id = getId(e);
		if (!id) {
			return;
		}
		var target = $(e.target);
		var rawText = target.html();
		target.html('...');
		uploadData(id).then(function() {
			alert(EXPORT_UPLOADED);
		}, function() {
			alert(EXPORT_ERROR);
		}).then(function() {
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
		target.html('Check File List...');

		var onerr = function() {
			alert(EXPORT_ERROR);
		};

		var revert = function() {
			target.html(rawText);
		};

		var cntCallback = function(val) {
			var cnt = ~~val['data'];
			if (cnt == 0) {
				alert('No Data Found');
				return revert();
			}
			var idx = 1;
			if (kernel.getProp('expp')) {
				idx = ~~prompt('You have %d file(s), load (1 - lastest one, 2 - lastest but one, etc) ?'.replace('%d', cnt), '1');
				if (idx <= 0 || idx > cnt) {
					return revert();
				}
			}
			target.html('Import Data...');
			$.post('https://cstimer.net/userdata.php', {
				'id': id,
				'offset': idx - 1
			}, dataCallback, 'json').error(onerr).always(revert);
		};

		var dataCallback = function(val) {
			var retcode = val['retcode'];
			if (retcode == 0) {
				try {
					loadData(JSON.parse(LZString.decompressFromEncodedURIComponent(val['data'])));
				} catch (err) {
					alert(EXPORT_ERROR);
				}
			} else if (retcode == 404) {
				alert(EXPORT_NODATA);
			} else {
				alert(EXPORT_ERROR);
			}
			revert();
		};

		if (kernel.getProp('expp')) {
			$.post('https://cstimer.net/userdata.php', {
				'id': id,
				'cnt': 1
			}, cntCallback, 'json').error(onerr).always(revert);
		} else {
			cntCallback({'data':1});
		}
	}

	function downloadDataGGL() {
		var gglToken = getDataId('gglData', 'access_token');
		if (!gglToken) {
			return;
		}
		inServGGL.html('Check File List...');
		$.ajax('https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&orderBy=modifiedTime desc&q=name%3D%27cstimer.txt%27', {
			'type': 'GET',
			'beforeSend': function(xhr) {
				xhr.setRequestHeader("Authorization", "Bearer " + gglToken);
			}
		}).success(function(data, status, xhr) {
			var files = data['files'];
			if (files.length == 0) {
				alert('No Data Found');
				return updateUserInfoFromGGL();
			}
			var idx = 1;
			if (kernel.getProp('expp')) {
				idx = ~~prompt('You have %d file(s), load (1 - lastest one, 2 - lastest but one, etc) ?'.replace('%d', files.length), '1');
				if (idx <= 0 || idx > files.length) {
					return updateUserInfoFromGGL();
				}
			}
			inServGGL.html('Import Data...');
			var fileId = files[idx - 1]['id'];
			$.ajax('https://www.googleapis.com/drive/v3/files/' + fileId + '?alt=media', {
				'type': 'GET',
				'beforeSend': function(xhr) {
					xhr.setRequestHeader("Authorization", "Bearer " + gglToken);
				}
			}).success(function(data) {
				try {
					data = JSON.parse(LZString.decompressFromEncodedURIComponent(data));
				} catch (e) {
					alert('No Valid Data Found');
					return updateUserInfoFromGGL();
				}
				updateUserInfoFromGGL();
				loadData(data);
			}).error(function() {
				alert(EXPORT_ERROR + '\nPlease Re-login');
				logoutFromGGL();
			});

			// removeRedundantGoogleFiles
			for (var i = 10; i < files.length; i++) {
				$.ajax('https://www.googleapis.com/drive/v3/files/' + files[i]['id'], {
					'type': 'DELETE',
					'beforeSend': function(xhr) {
						xhr.setRequestHeader("Authorization", "Bearer " + gglToken);
					}
				});
			}
		}).error(function() {
			alert(EXPORT_ERROR + '\nPlease Re-login');
			logoutFromGGL();
		});
	}

	function uploadDataGGL() {
		var gglToken = getDataId('gglData', 'access_token');
		if (!gglToken) {
			return;
		}
		outServGGL.html('Create File...');
		$.ajax('https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable', {
			'type': 'POST',
			'contentType': 'application/json',
			'data': JSON.stringify({
				'parents': ['appDataFolder'],
				'name': 'cstimer.txt'
			}),
			'beforeSend': function(xhr) {
				xhr.setRequestHeader("Authorization", "Bearer " + gglToken);
			}
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
		updateExpString().then(function() {
			if (window.Blob) {
				var blob = new Blob([expString], {
					'type': 'text/plain'
				});
				outFile.attr('href', URL.createObjectURL(blob));
				outFile.attr('download', 'cstimer_' + mathlib.time2str(new Date() / 1000, '%Y%M%D_%h%m%s') + '.txt');
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
		data = JSON.parse(localStorage['properties']);
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
		};
		var newOpt = exportByPrompt(expOpt);
		if (!newOpt) {
			return false;
		}
		for (var key in expOpt) {
			if (newOpt[key]) {
				localStorage[key] = newOpt[key];
				kernel.pushSignal('export', ['account', key]);
			}
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
			wcaDataTr.click(logoutFromWCA.bind(undefined, true)).addClass('click');
			inServWCA.addClass('click').click(downloadData);
			outServWCA.addClass('click').click(uploadDataClk);
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
			gglDataTr.click(logoutFromGGL.bind(undefined, true)).addClass('click');
			inServGGL.addClass('click').click(downloadDataGGL);
			outServGGL.addClass('click').click(uploadDataGGL);
		}
	}

	function logoutFromWCA(cfm) {
		if (cfm && !confirm(EXPORT_LOGOUTCFM)) {
			return;
		}
		delete localStorage['wcaData'];
		kernel.pushSignal('export', ['account', 'wcaData']);
	}

	function logoutFromGGL(cfm) {
		if (cfm && !confirm(EXPORT_LOGOUTCFM)) {
			return;
		}
		delete localStorage['gglData'];
		kernel.pushSignal('export', ['account', 'gglData']);
	}

	function procSignal(signal, value) {
		if (signal == 'atexpa') {
			if (value[1] == 'id') {
				var id = getDataId('locData', 'id');
				if (!isValidId(id) || value[2] == 'modify') {
					id = prompt(EXPORT_USERID, id);
					if (!isValidId(id)) {
						if (id != null) {
							alert(EXPORT_INVID);
						}
						kernel.setProp('atexpa', 'n');
						return;
					}
					localStorage['locData'] = JSON.stringify({ id: id, compid: getDataId('locData', 'compid') });
					kernel.pushSignal('export', ['account', 'locData']);
				}
			} else if (value[1] == 'wca') {
				if (!isValidId(getDataId('wcaData', 'cstimer_token'))) {
					alert('Please Login with WCA Account in Export Panel First');
					kernel.setProp('atexpa', 'n');
					return;
				}
			}
		} else if (signal == 'export') {
			if (value[1] == 'wcaData') {
				updateUserInfoFromWCA();
			} else if (value[1] == 'gglData') {
				updateUserInfoFromGGL();
			}
		}
	}

	var exportTid;

	function startBackExport() {
		if (exportTid) {
			clearTimeout(exportTid);
		}
		exportTid = setTimeout(doBackExport, 1000);
	}

	function doBackExport() {
		var atexpa = kernel.getProp('atexpa', 'n');
		if (atexpa == 'n') {
			return;
		}
		updateExpString().then(function() {
			if (atexpa == 'id' || atexpa == 'wca') {
				var id = atexpa == 'id' ? getDataId('locData', 'id') : getDataId('wcaData', 'cstimer_token');
				if (!isValidId(id)) {
					logohint.push('Auto Export Abort');
					kernel.setProp('atexpa', 'n');
					return;
				}
				uploadData(id).then(function() {
					logohint.push('Auto Export Success');
				}, function() {
					logohint.push('Auto Export Failed');
				});
			} else if (atexpa == 'f') {
				if (window.Blob) {
					var blob = new Blob([expString], {
						'type': 'text/plain'
					});
					var tmpFile = $('<a class="click"/>');
					tmpFile.attr('href', URL.createObjectURL(blob));
					tmpFile.attr('download', 'cstimer_' + mathlib.time2str(new Date() / 1000, '%Y%M%D_%h%m%s') + '.txt');
					tmpFile.appendTo('body');
					tmpFile[0].click();
					tmpFile.remove();
				}
			}
		});
		exportTid = 0;
		solvesAfterExport = 0;
	}

	var solvesAfterExport = 0;

	function newTimePushed() {
		if (kernel.getProp('atexpa', 'n') == 'n') {
			return;
		}
		solvesAfterExport += 1;
		if (solvesAfterExport >= kernel.getProp('atexpi', 100)) {
			startBackExport();
		}
	}

	$(function() {
		kernel.regListener('export', 'time', newTimePushed);
		kernel.regListener('export', 'property', procSignal, /^atexpa$/);
		kernel.regListener('export', 'export', procSignal, /^account$/);
		kernel.regProp('kernel', 'atexpa', 1, PROPERTY_AUTOEXP, ['n', ['n', 'f', 'id', 'wca'], PROPERTY_AUTOEXP_OPT.split('|')]);
		kernel.regProp('kernel', 'atexpi', ~1, 'Auto Export Interval (Solves)', [100, [50, 100, 200, 500], ['50', '100', '200', '500']]);
		kernel.regProp('kernel', 'expp', 0, PROPERTY_IMPPREV, [false]);

		kernel.addButton('export', BUTTON_EXPORT, showExportDiv, 2);
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
			inFile.change(importFile.bind(inFile[0], reader));
			inOtherFile.change(importFile.bind(inOtherFile[0], readerOther));
		}

		if ($.urlParam('code')) { //WCA oauth
			wcaDataTd.html(EXPORT_LOGINAUTHED);
			$.post('oauthwca.php', {
				'code': $.urlParam('code')
			}, function(val) {
				if ('access_token' in val) {
					localStorage['wcaData'] = JSON.stringify(val);
					kernel.pushSignal('export', ['account', 'wcaData']);
				} else {
					alert(EXPORT_ERROR);
					logoutFromWCA();
				}
			}, 'json').error(function() {
				alert(EXPORT_ERROR);
				logoutFromWCA();
			}).always(function() {
				updateUserInfoFromWCA();
				$.clearUrl('code');
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
					kernel.pushSignal('export', ['account', 'gglData']);
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
				updateUserInfoFromGGL();
				$.clearHash();
			});
			showExportDiv();
		} else {
			updateUserInfoFromGGL();
		}
	});

	return {
		exportProperties: exportProperties,
		isValidId: isValidId,
		getDataId: getDataId,
		logoutFromWCA: logoutFromWCA,
		wcaLoginUrl: wcaLoginUrl
	};
});
