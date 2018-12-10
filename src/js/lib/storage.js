"use strict";

var storage = (function() {
	function num2str(val) {
		val = '' + val;
		return String.fromCharCode(47 + val.length) + val;
	}

	function getID(sessionIdx, timeIdx) {
		return 'session_' + num2str(sessionIdx) + (timeIdx == undefined ? '' : ('_' + num2str(timeIdx)));
	}
	// IndexedDB
	var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB;
	var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.OIDBTransaction || window.msIDBTransaction;

	var db;

	var keyre = /^session_\d(\d+)_\d(\d+)$/;

	function logerr(event) {
		console.log('IndexedDB Error', event || 'undefined');
	}

	function getTrans(mode, obj_callback, suc_callback, curDB) {
		curDB = curDB || db;
		if (!curDB) { // wait for db ok
			requestAnimFrame(function() {
				getTrans(mode, obj_callback, suc_callback);
			});
			return;
		}
		var transaction = curDB.transaction(["sessions"], mode);
		transaction.oncomplete = suc_callback || $.noop;
		transaction.onerror = logerr;
		var objectStore = transaction.objectStore("sessions");
		obj_callback(objectStore);
	}

	if (indexedDB) {
		$(function() {
			var request = indexedDB.open("cstimer", 1);
			request.onerror = logerr;
			//id: session_XX_XX, val: times
			request.onupgradeneeded = function(event) {
				console.log("Update Data From LocalStorage");
				var curDB = event.target.result;
				curDB.createObjectStore("sessions").transaction.oncomplete = function(event) {
					importAll(localStorage, function() {}, curDB);
				};
			};
			request.onsuccess = function(event) {
				// console.log("Success opening DB");
				db = event.target.result;
			}
		});
	}

	function set(sessionIdx, times, callback, startIdx) {
		if (indexedDB) {
			getTrans("readwrite", function(objectStore) {
				var startTID = ~~(startIdx / 100); //update from startTID (default: 0)
				var boundKeyRange = IDBKeyRange.bound(getID(sessionIdx, startTID), getID(sessionIdx + 1), false, true);
				objectStore["delete"](boundKeyRange);
				for (var i = startTID; i < (Math.ceil(times.length / 100) || 1); i++) {
					objectStore.put(times.slice(i * 100, (i + 1) * 100), getID(sessionIdx, i));
				}
			}, function() {
				callback && callback();
			});
		} else {
			localStorage['session' + sessionIdx] = JSON.stringify(times);
			callback && requestAnimFrame(callback);
		}
	}

	function get(sessionIdx, callback, startIdx, endIdx) {
		var times = [];
		if (indexedDB) {
			getTrans("readonly", function(objectStore) {
				var boundKeyRange = IDBKeyRange.bound(getID(sessionIdx), getID(sessionIdx + 1), false, true);
				objectStore.openCursor(boundKeyRange).onsuccess = function(event) {
					var cursor = event.target.result;
					if (cursor) {
						Array.prototype.push.apply(times, cursor.value);
						cursor["continue"]();
					}
				}
			}, function() {
				startIdx = startIdx || 0;
				endIdx = endIdx || times.length;
				if (startIdx != 0 || endIdx != times.length) {
					times = times.slice(startIdx, endIdx);
				}
				callback && callback(times);
			});
		} else {
			var timeStr = localStorage['session' + sessionIdx];
			var times = [];
			if (timeStr != undefined && timeStr != '') {
				times = JSON.parse(timeStr);
			}
			if (startIdx != 0 || endIdx != times.length) {
				times = times.slice(startIdx, endIdx);
			}
			requestAnimFrame(function() {
				callback && callback(times);
			});
		}
	}

	//delete sessionIdx, and replace with sessionIdxMax
	function del(sessionIdx, sessionIdxMax, callback) {
		if (indexedDB) {
			getTrans("readwrite", function(objectStore) {
				objectStore["delete"](IDBKeyRange.bound(getID(sessionIdx), getID(sessionIdx + 1), false, true));
				var range = IDBKeyRange.bound(getID(sessionIdxMax), getID(sessionIdxMax + 1), false, true);
				objectStore.openCursor(range).onsuccess = function(event) {
					var cursor = event.target.result;
					if (cursor) {
						var m = keyre.exec(cursor.key);
						objectStore.put(cursor.value, getID(sessionIdx, ~~m[2]));
						objectStore["delete"](cursor.key);
						cursor["continue"]();
					}
				}
			}, callback);
		} else {
			localStorage['session' + sessionIdx] = localStorage['session' + sessionIdxMax]
			delete localStorage['session' + sessionIdxMax];
			callback && requestAnimFrame(callback);
		}
	}

	function exportAll(callback) {
		var exportObj = {};
		if (indexedDB) {
			getTrans("readonly", function(objectStore) {
				objectStore.openCursor().onsuccess = function(event) {
					var cursor = event.target.result;
					if (cursor) {
						var m = keyre.exec(cursor.key);
						var sessionIdx = ~~m[1];
						exportObj['session' + sessionIdx] = exportObj['session' + sessionIdx] || [];
						Array.prototype.push.apply(exportObj['session' + sessionIdx], cursor.value);
						cursor["continue"]();
					}
				}
			}, function() {
				for (var key in exportObj) {
					exportObj[key] = JSON.stringify(exportObj[key]);
				}
				callback && callback(exportObj);
			});
		} else {
			for (var i = 1; i <= ~~kernel.getProp('sessionN'); i++) {
				if (localStorage['session' + i] != undefined) {
					exportObj['session' + i] = localStorage['session' + i];
				}
			}
			requestAnimFrame(function() {
				callback && callback(exportObj);
			});
		}
	}

	//assume properties have already been imported, e.g. kernel.getProp('sessionN') is available
	function importAll(obj, callback, curDB) {
		if (indexedDB) {
			getTrans("readwrite", function(objectStore) {
				objectStore.clear();
				for (var sessionIdx = 1; sessionIdx <= ~~kernel.getProp('sessionN'); sessionIdx++) {
					var timeStr = obj['session' + sessionIdx];
					var times = [];
					if (timeStr != undefined && timeStr != '') {
						times = JSON.parse(timeStr);
					}
					for (var i = 0; i < (Math.ceil(times.length / 100) || 1); i++) {
						objectStore.put(times.slice(i * 100, (i + 1) * 100), getID(sessionIdx, i));
					}
				}
			}, callback, curDB);
		} else {
			for (var sessionIdx = 1; sessionIdx <= ~~kernel.getProp('sessionN'); sessionIdx++) {
				localStorage['session' + sessionIdx] = obj['session' + sessionIdx];
			}
		}
	}

	return {
		set: set,
		get: get,
		del: del,
		importAll: importAll,
		exportAll: exportAll
	}
})();