'use strict';

var isInWorker = (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope);

function execBoth(funcMain, funcWorker, params) {
	if (!isInWorker && funcMain) {
		return funcMain.apply(this, params || []);
	}
	if (isInWorker && funcWorker) {
		return funcWorker.apply(this, params || []);
	}
	return {};
}

//execute function only in worker
function execWorker(func, params) {
	return execBoth(undefined, func, params);
}

//execute function only in main
function execMain(func, params) {
	return execBoth(func, undefined, params);
}

execWorker(function() {
	self.$ = {
		isArray: Array.isArray || function(obj) {
			return jQuery.type(obj) === "array";
		},
		noop: function() {}
	};
});

execMain(function() {
	window.onerror = function(msg, url, line, col, error) {
		if (error == undefined) {
			error = {};
		}
		$.get('bugReport', {
			'version': CSTIMER_VERSION,
			'msg': msg,
			'url': url,
			'line': line,
			'col': col,
			'stack': error.stack
		});
		console.log(msg, url, line, col, error);
	};

	var constants = ['CSIMER_VERSION', 'LANG_SET', 'LANG_STR', 'LANG_CUR', 'OK_LANG', 'CANCEL_LANG', 'RESET_LANG', 'ABOUT_LANG', 'ZOOM_LANG', 'BUTTON_TIME_LIST', 'BUTTON_OPTIONS', 'BUTTON_EXPORT', 'BUTTON_DONATE', 'PROPERTY_SR', 'PROPERTY_USEINS', 'PROPERTY_USEINS_STR', 'PROPERTY_VOICEINS', 'PROPERTY_VOICEINS_STR', 'PROPERTY_VOICEVOL', 'PROPERTY_PHASES', 'PROPERTY_TIMERSIZE', 'PROPERTY_USEMILLI', 'PROPERTY_SMALLADP', 'PROPERTY_SCRSIZE', 'PROPERTY_SCRMONO', 'PROPERTY_SCRLIM', 'PROPERTY_SCRALIGN', 'PROPERTY_SCRALIGN_STR', 'PROPERTY_SCRFAST', 'PROPERTY_SCRKEYM', 'PROPERTY_WNDSCR', 'PROPERTY_WNDSTAT', 'PROPERTY_WNDTOOL', 'PROPERTY_WND_STR', 'EXPORT_DATAEXPORT', 'EXPORT_TOFILE', 'EXPORT_FROMFILE', 'EXPORT_TOSERV', 'EXPORT_FROMSERV', 'EXPORT_FROMOTHER', 'EXPORT_USERID', 'EXPORT_INVID', 'EXPORT_ERROR', 'EXPORT_NODATA', 'EXPORT_UPLOADED', 'EXPORT_CODEPROMPT', 'EXPORT_ONLYOPT', 'EXPORT_ACCOUNT', 'EXPORT_LOGINGGL', 'EXPORT_LOGINWCA', 'EXPORT_LOGOUTCFM', 'EXPORT_LOGINAUTHED', 'IMPORT_FINAL_CONFIRM', 'BUTTON_SCRAMBLE', 'BUTTON_TOOLS', 'IMAGE_UNAVAILABLE', 'TOOLS_SELECTFUNC', 'TOOLS_CROSS', 'TOOLS_EOLINE', 'TOOLS_ROUX1', 'TOOLS_GIIKER', 'TOOLS_IMAGE', 'TOOLS_STATS', 'TOOLS_HUGESTATS', 'TOOLS_DISTRIBUTION', 'TOOLS_TREND', 'TOOLS_METRONOME', 'TOOLS_CFMTIME', 'PROPERTY_IMGSIZE', 'TIMER_INSPECT', 'TIMER_SOLVE', 'PROPERTY_USEMOUSE', 'PROPERTY_TIMEU', 'PROPERTY_TIMEU_STR', 'PROPERTY_PRETIME', 'PROPERTY_ENTERING', 'PROPERTY_ENTERING_STR', 'PROPERTY_INTUNIT', 'PROPERTY_INTUNIT_STR', 'PROPERTY_COLOR', 'PROPERTY_COLORS', 'PROPERTY_VIEW', 'PROPERTY_VIEW_STR', 'PROPERTY_UIDESIGN', 'PROPERTY_UIDESIGN_STR', 'COLOR_EXPORT', 'COLOR_IMPORT', 'COLOR_FAIL', 'PROPERTY_FONTCOLOR_STR', 'PROPERTY_COLOR_STR', 'PROPERTY_FONT', 'PROPERTY_FONT_STR', 'PROPERTY_FORMAT', 'PROPERTY_USEKSC', 'PROPERTY_NTOOLS', 'PROPERTY_AHIDE', 'SCRAMBLE_LAST', 'SCRAMBLE_NEXT', 'SCRAMBLE_SCRAMBLE', 'SCRAMBLE_LENGTH', 'SCRAMBLE_INPUT', 'PROPERTY_VRCSPEED', 'PROPERTY_VRCMP', 'PROPERTY_VRCMPS', 'PROPERTY_GIIKERVRC', 'PROPERTY_GIISOK_DELAY', 'PROPERTY_GIISOK_DELAYS', 'PROPERTY_GIISOK_KEY', 'PROPERTY_GIISOK_MOVE', 'PROPERTY_GIISOK_MOVES', 'PROPERTY_GIISBEEP', 'PROPERTY_GIIRST', 'PROPERTY_GIIRSTS', 'CONFIRM_GIIRST', 'PROPERTY_GIIAED', 'scrdata', 'SCRAMBLE_NOOBST', 'SCRAMBLE_NOOBSS', 'STATS_CFM_RESET', 'STATS_CFM_DELSS', 'STATS_CFM_DELMUL', 'STATS_CFM_DELETE', 'STATS_COMMENT', 'STATS_DATE', 'STATS_CURROUND', 'STATS_CURSESSION', 'STATS_CURSPLIT', 'STATS_EXPORTCSV', 'STATS_SSMGR_TITLE', 'STATS_SSMGR_NAME', 'STATS_SSMGR_DETAIL', 'STATS_SSMGR_OPS', 'STATS_SSMGR_ORDER', 'STATS_SSMGR_ODCFM', 'STATS_ALERTMG', 'STATS_PROMPTSPL', 'STATS_ALERTSPL', 'STATS_AVG', 'STATS_SOLVE', 'STATS_TIME', 'STATS_SESSION', 'STATS_SESSION_NAME', 'STATS_SESSION_NAMEC', 'STATS_STRING', 'STATS_PREC', 'STATS_PREC_STR', 'STATS_TYPELEN', 'STATS_STATCLR', 'STATS_ABSIDX', 'STATS_XSESSION_DATE', 'STATS_XSESSION_NAME', 'STATS_XSESSION_SCR', 'STATS_XSESSION_CALC', 'PROPERTY_PRINTSCR', 'PROPERTY_PRINTDATE', 'PROPERTY_SUMMARY', 'PROPERTY_IMRENAME', 'PROPERTY_SCR2SS', 'PROPERTY_SS2SCR', 'PROPERTY_SS2PHASES', 'PROPERTY_STATINV', 'PROPERTY_STATAL', 'PROPERTY_STATALU', 'PROPERTY_DELMUL', 'PROPERTY_TOOLSFUNC', 'PROPERTY_TRIM', 'PROPERTY_TRIM_MED', 'PROPERTY_STKHEAD', 'MODULE_NAMES', 'BGIMAGE_URL', 'BGIMAGE_INVALID', 'BGIMAGE_OPACITY', 'BGIMAGE_IMAGE', 'BGIMAGE_IMAGE_STR', 'SHOW_AVG_LABEL', 'USE_LOGOHINT', 'TOOLS_SCRGEN', 'SCRGEN_NSCR', 'SCRGEN_PRE', 'SCRGEN_GEN'];
	for (var i = 0; i < constants.length; i++) {
		window[constants[i]] = window[constants[i]] || '|||||||||||||||';
	}

	window.requestAnimFrame = (function() {
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function( /* function */ callback, /* DOMElement */ element) {
				return window.setTimeout(callback, 1000 / 60);
			};
	})();

	if (!window.localStorage) {
		window.localStorage = {}
	}

	if (!('properties' in localStorage) && location.protocol != 'https:' && location.hostname != 'localhost') {
		location.href = 'https:' + location.href.substring(location.protocol.length);
	}

	if (window.performance && window.performance.now) {
		$.now = function() {
			return Math.floor(window.performance.now());
		}
	}

	$.urlParam = function(name) {
		var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		if (results == null) {
			return null;
		} else {
			return results[1] || 0;
		}
	}

	$.hashParam = function(name) {
		var results = new RegExp('[#&]' + name + '=([^&#]*)').exec(window.location.hash);
		if (results == null) {
			return null;
		} else {
			return results[1] || 0;
		}
	}

	$.clearUrl = function(name) {
		var results = new RegExp('[\?&](' + name + '=[^&#]*&?)').exec(window.location.href);
		var result = name ?
			location.href.replace(results[1], '').replace(/\?$/, '') :
			location.pathname;
		if (history && history.replaceState) {
			history.replaceState(undefined, undefined, result);
		} else {
			location.href = result;
		}
	}

	$.clearHash = function(name) {
		var results = new RegExp('[#&](' + name + '=[^&#]*&?)').exec(window.location.href);
		var result = name ?
			location.href.replace(results[1], '').replace(/#$/, '') :
			location.pathname + location.search;
		if (history && history.replaceState) {
			history.replaceState(undefined, undefined, result);
		} else {
			location.href = result;
		}
	}

	if ('serviceWorker' in navigator) {
		$(function() {
			navigator.serviceWorker.register('sw.js');
		});
	} else if (window.applicationCache) {
		$(function() {
			applicationCache.addEventListener('updateready', function(e) {
				if (applicationCache.status == applicationCache.UPDATEREADY) {
					applicationCache.swapCache();
					location.reload();
				}
			}, false);
		});
	}

});

/** @define {boolean} */
var DEBUGM = true;
/** @define {boolean} */
var DEBUGWK = false;
var DEBUG = isInWorker ? DEBUGWK : (DEBUGM && !!$.urlParam('debug'));

if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(item) {
		for (var i = 0; i < this.length; i++) {
			if (this[i] == item) {
				return i;
			}
		}
		return -1;
	}
}

if (!Function.prototype.bind) {
	Function.prototype.bind = function(oThis) {
		if (typeof this !== 'function') {
			throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
		}
		var aArgs = Array.prototype.slice.call(arguments, 1),
			fToBind = this,
			fNOP = function() {},
			fBound = function() {
				return fToBind.apply(this instanceof fNOP ?
					this :
					oThis,
					aArgs.concat(Array.prototype.slice.call(arguments)));
			};
		if (this.prototype) {
			fNOP.prototype = this.prototype;
		}
		fBound.prototype = new fNOP();
		return fBound;
	};
}
