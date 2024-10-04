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
			logohint.push(LGHINT_INVALID);
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
			if ($.confirm(IMPORT_FINAL_CONFIRM
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
			reader.readAsText(f, "UTF-8")
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
			id = $.prompt(EXPORT_USERID, getDataId('locData', 'id'));
			if (id == null) {
				return;
			}
			localStorage['locData'] = JSON.stringify({ id: id, compid: getDataId('locData', 'compid') });
			kernel.pushSignal('export', ['account', 'locData']);
		}
		if (!isValidId(id)) {
			$.alert(EXPORT_INVID);
			return;
		}
		return id;
	}

	function getLocalDataSliced(id) {
		return storage.exportAll().then(function(exportObj) {
			var slices = {};
			var baseObj = {};
			baseObj['properties'] = mathlib.str2obj(localStorage['properties']);
			for (var key in exportObj) {
				baseObj[key] = [];
				var times = exportObj[key];
				for (var i = 0; i < times.length; i+= 1000) {
					var timesSlice = LZString.compressToEncodedURIComponent(JSON.stringify(times.slice(i, i + 1000)));
					var sliceHash = $.sha256(timesSlice);
					slices['slice' + sliceHash] = timesSlice;
					baseObj[key].push(sliceHash);
				}
			}
			if (id != undefined) {
				slices[id] = LZString.compressToEncodedURIComponent(JSON.stringify(baseObj));
			}
			return slices;
		}).catch(console.log);
	}

	function uploadData(id) {
		return getLocalDataSliced(id).then(function(slices) {
			var ids = [];
			for (var key in slices) {
				if (key == id) {
					continue;
				}
				ids.push(key);
			}
			return $.ppost('https://cstimer.net/userdata2.php', {
				'id': id,
				'exists': ids.join(',')
			}, 'json').then(function(val) {
				if (val['retcode'] != 0) {
					Promise.reject();
				}
				var exists = val['datas'];
				var ids = [];
				var datas = [];
				for (var key in slices) {
					if (exists.indexOf(key) != -1 && key != id) {
						continue;
					}
					ids.push(key);
					datas.push(slices[key]);
				}
				return $.ppost('https://cstimer.net/userdata2.php', {
					'id': id,
					'ids': ids.join(','),
					'datas': datas.join(',')
				}, 'json');
			}).then(function(val) {
				return val['retcode'] == 0 ? Promise.resolve() : Promise.reject();
			});
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
			$.alert(EXPORT_UPLOADED);
		}, function() {
			$.alert(EXPORT_ERROR);
		}).then(function() {
			target.html(rawText);
		});
	}

	// files = [{nsolv: xx, size: xx, modifiedTime: xx}]
	function promptWhichFile(files) {
		var msg = EXPORT_WHICH.replace('%d', files.length);
		var msgfmt = EXPORT_WHICH_ITEM;
		var msgf = [msg];
		for (var ff = 0; ff < files.length; ff++) {
			var nsolv = Math.max(0, ~~files[ff].nsolv);
			var size = ~~files[ff].size;
			msgf.push((ff + 1) + '. ' + msgfmt.replace('%s', nsolv || (size ? Math.ceil(size / 1024) + ' KB' : 'N/A'))
				.replace('%t', new Date(files[ff].modifiedTime).toLocaleString()));
		}
		return ~~$.prompt(msgf.join('\n'), '1');
	}

	function downloadData(e) {
		var id = getId(e);
		if (!id) {
			return;
		}
		var target = $(e.target);
		var rawText = target.html();
		target.html('Check File List...');

		var cntCallback = function(val) {
			var cnt = ~~val['data'];
			if (cnt == 0) {
				return Promise.reject('No Data Found');
			}
			var idx = 1;
			if (kernel.getProp('expp')) {
				idx = promptWhichFile(val['files'] || mathlib.valuedArray(cnt, {}));
				if (idx <= 0 || idx > cnt) {
					return Promise.reject('Invalid input');
				}
			}
			target.html('Import Data...');
			return $.ppost('https://cstimer.net/userdata2.php', {
				'id': id,
				'offset': idx - 1
			}, 'json').then(dataCallback);
		};

		var dataCallback = function(val) {
			var retcode = val['retcode'];
			if (retcode == 404) {
				return Promise.reject(EXPORT_NODATA);
			} else if (retcode != 0) {
				return Promise.reject('');
			}

			var metaObj = {};
			var baseObj = {};
			var jobs = Promise.resolve(baseObj);
			try {
				metaObj = JSON.parse(LZString.decompressFromEncodedURIComponent(val['data']));
			} catch (err) {
				DEBUG && console.log('[export] error', err);
				return Promise.reject('');
			}
			var keys = [];
			var arrs = [];
			for (var key in metaObj) {
				if (!key.startsWith('session') || metaObj[key].length == 0 || $.isArray(metaObj[key][0])) {
					baseObj[key] = metaObj[key];
					continue;
				}
				var times = [];
				baseObj[key] = times;
				for (var i = 0; i < metaObj[key].length; i++) {
					keys.push('slice' + metaObj[key][i]);
					arrs.push(times);
				}
			}
			if (keys.length > 0) {
				var localSlices = {};
				jobs = jobs.then(function() {
					return getLocalDataSliced();
				}).then(function(slices) {
					localSlices = slices;
					var reqKeys = keys.filter(function(elem) { return !(elem in localSlices); });
					if (reqKeys.length == 0) {
						return {'retcode':0,'datas':{}};
					}
					return $.ppost('https://cstimer.net/userdata2.php', {
						'id': id,
						'ids': reqKeys.join(',')
					}, 'json');
				}).then(function(val) {
					if (val['retcode'] != 0) {
						return Promise.reject('retcode=' + val['retcode']);
					}
					var datas = [];
					for (var key in val['datas']) {
						datas[keys.indexOf(key)] = val['datas'][key];
					};
					for (var i = 0; i < keys.length; i++) {
						datas[i] = datas[i] || localSlices[keys[i]];
						if (datas[i] == undefined) {
							return Promise.reject('error, incorrect data');
						}
						Array.prototype.push.apply(arrs[i], JSON.parse(LZString.decompressFromEncodedURIComponent(datas[i])));
					}
					return baseObj;
				});
			}
			return jobs.then(loadData);
		};

		var jobs = Promise.resolve({'data':1});
		if (kernel.getProp('expp')) {
			jobs = $.ppost('https://cstimer.net/userdata2.php', {
				'id': id,
				'cnt': 1
			}, 'json');
		}
		return jobs.then(cntCallback).catch(function(msg) {
			$.alert(EXPORT_ERROR + (msg ? ': ' + msg : ''));
		}).then(function() {
			target.html(rawText);
		});
	}

	function downloadDataGGL() {
		var gglToken = getDataId('gglData', 'access_token');
		if (!gglToken) {
			return;
		}
		inServGGL.html('Check File List...');
		$.ajax('https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&orderBy=modifiedTime desc&q=name%3D%27cstimer.txt%27&fields=files%28id%2Csize%2CmodifiedTime%29', {
			'type': 'GET',
			'beforeSend': function(xhr) {
				xhr.setRequestHeader("Authorization", "Bearer " + gglToken);
			}
		}).success(function(data, status, xhr) {
			var files = data['files'];
			if (files.length == 0) {
				$.alert('No Data Found');
				return updateUserInfoFromGGL();
			}
			var idx = 1;
			if (kernel.getProp('expp')) {
				idx = promptWhichFile(files);
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
					$.alert('No Valid Data Found');
					return updateUserInfoFromGGL();
				}
				updateUserInfoFromGGL();
				loadData(data);
			}).error(function() {
				$.alert(EXPORT_ERROR + '\nPlease Re-login');
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
			$.alert(EXPORT_ERROR + '\nPlease Re-login');
			logoutFromGGL();
		});
	}

	function uploadDataGGL(gglToken) {
		gglToken = gglToken || getDataId('gglData', 'access_token');
		if (!gglToken) {
			return Promise.reject('Invalid Account');
		}
		outServGGL.html('Create File...');
		return new Promise(function(resolve, reject) {
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
					updateUserInfoFromGGL();
					resolve();
				}).error(function(data, status, xhr) {
					logoutFromGGL();
					reject(EXPORT_ERROR);
				});
			}).error(function(data, status, xhr) {
				logoutFromGGL();
				if (data.status == 401) {
					reject('Timeout, Please Re-login');
				} else {
					reject(EXPORT_ERROR);
				}
			});
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
		solvesAfterExport = 0;
	}

	function exportByPrompt(expOpt) {
		var compOpt = LZString.compressToEncodedURIComponent(JSON.stringify(expOpt));
		var ret = $.prompt(EXPORT_CODEPROMPT, compOpt);
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
			outServGGL.addClass('click').click(function() {
				uploadDataGGL().then(function() {
					$.alert(EXPORT_UPLOADED);
				}, function(errmsg) {
					$.alert(errmsg);
				});
			});
		}
	}

	function logoutFromWCA(cfm) {
		if (cfm && !$.confirm(EXPORT_LOGOUTCFM)) {
			return;
		}
		delete localStorage['wcaData'];
		kernel.pushSignal('export', ['account', 'wcaData']);
	}

	function logoutFromGGL(cfm) {
		if (cfm && !$.confirm(EXPORT_LOGOUTCFM)) {
			return;
		}
		delete localStorage['gglData'];
		kernel.pushSignal('export', ['account', 'gglData']);
	}

	function procSignal(signal, value) {
		if (value[0] == 'atexpa') {
			if (value[1] == 'id') {
				var id = getDataId('locData', 'id');
				if (!isValidId(id) || value[2] == 'modify') {
					id = $.prompt(EXPORT_USERID, id);
					if (!isValidId(id)) {
						if (id != null) {
							$.alert(EXPORT_INVID);
						}
						kernel.setProp('atexpa', 'a');
						return;
					}
					localStorage['locData'] = JSON.stringify({ id: id, compid: getDataId('locData', 'compid') });
					kernel.pushSignal('export', ['account', 'locData']);
				}
			} else if (value[1] == 'wca') {
				if (!isValidId(getDataId('wcaData', 'cstimer_token'))) {
					$.alert('Please Login with WCA Account in Export Panel First');
					kernel.setProp('atexpa', 'a');
					return;
				}
			} else if (value[1] == 'ggl') {
				if (!getDataId('gglData', 'access_token')) {
					$.alert('Please Login with Google Account in Export Panel First');
					kernel.setProp('atexpa', 'a');
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
		var atexpa = kernel.getProp('atexpa', 'a');
		if (atexpa == 'n' || atexpa == 'a') {
			return;
		}
		updateExpString().then(function() {
			if (atexpa == 'id' || atexpa == 'wca') {
				var id = atexpa == 'id' ? getDataId('locData', 'id') : getDataId('wcaData', 'cstimer_token');
				if (!isValidId(id)) {
					logohint.push(LGHINT_AEXPABT);
					kernel.setProp('atexpa', 'a');
					return;
				}
				uploadData(id).then(function() {
					logohint.push(LGHINT_AEXPSUC);
				}, function() {
					logohint.push(LGHINT_AEXPFAL);
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
			} else if (atexpa == 'ggl') {
				var gglToken = getDataId('gglData', 'access_token');
				if (!gglToken) {
					logohint.push(LGHINT_AEXPABT);
					kernel.setProp('atexpa', 'a');
					return;
				}
				uploadDataGGL(gglToken).then(function() {
					logohint.push(LGHINT_AEXPSUC);
				}, function() {
					logohint.push(LGHINT_AEXPFAL);
				});
			}
		});
		exportTid = 0;
		solvesAfterExport = 0;
	}

	var solvesAfterExport = 0;

	function newTimePushed() {
		solvesAfterExport += 1;
		if (solvesAfterExport >= kernel.getProp('atexpi', 100)) {
			var atexpa = kernel.getProp('atexpa', 'a');
			if (atexpa == 'n') {
				return;
			} else if (atexpa == 'a') {
				if (solvesAfterExport % 100 == 0) {
					logohint.push(EXPORT_AEXPALERT.replace('%d', solvesAfterExport));
				}
				return;
			}
			startBackExport();
		}
	}

	$(function() {
		kernel.regListener('export', 'time', newTimePushed);
		kernel.regListener('export', 'property', procSignal, /^atexpa$/);
		kernel.regListener('export', 'export', procSignal, /^account$/);
		kernel.regProp('kernel', 'atexpa', 1, PROPERTY_AUTOEXP, ['a', ['n', 'f', 'id', 'wca', 'ggl', 'a'], PROPERTY_AUTOEXP_OPT.split('|')]);
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
					logohint.push(LGHINT_IMPORT0);
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
					$.alert(EXPORT_ERROR);
					logoutFromWCA();
				}
			}, 'json').error(function() {
				$.alert(EXPORT_ERROR);
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
					$.alert(EXPORT_ERROR);
					logoutFromGGL();
				}
			}, 'json').error(function(data, status, xhr) {
				if (data.status == 401) {
					$.alert('Timeout, Please Re-login');
				} else {
					$.alert(EXPORT_ERROR);
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
