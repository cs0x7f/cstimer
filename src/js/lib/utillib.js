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
		var fingerprint = '';
		try {
			fingerprint = $.fingerprint();
		} catch (e) {}
		var prop = '';
		try {
			prop = LZString.compressToEncodedURIComponent(localStorage['properties']);
		} catch (e) {}
		$.post('bug.php', {
			'version': CSTIMER_VERSION,
			'fp': fingerprint,
			'msg': msg,
			'url': url,
			'line': line,
			'col': col,
			'stack': error.stack,
			'prop': prop
		});
		console.log(CSTIMER_VERSION, fingerprint, msg, url, line, col, error);
	};

	var constants = ['CSTIMER_VERSION', 'LANG_SET', 'LANG_STR', 'LANG_CUR', 'OK_LANG', 'CANCEL_LANG', 'RESET_LANG', 'ABOUT_LANG', 'ZOOM_LANG', 'BUTTON_TIME_LIST', 'BUTTON_OPTIONS', 'BUTTON_EXPORT', 'BUTTON_DONATE', 'PROPERTY_SR', 'PROPERTY_USEINS', 'PROPERTY_USEINS_STR', 'PROPERTY_VOICEINS', 'PROPERTY_VOICEINS_STR', 'PROPERTY_VOICEVOL', 'PROPERTY_PHASES', 'PROPERTY_TIMERSIZE', 'PROPERTY_USEMILLI', 'PROPERTY_SMALLADP', 'PROPERTY_SCRSIZE', 'PROPERTY_SCRMONO', 'PROPERTY_SCRLIM', 'PROPERTY_SCRALIGN', 'PROPERTY_SCRALIGN_STR', 'PROPERTY_SCRFAST', 'PROPERTY_SCRKEYM', 'PROPERTY_SCRCLK', 'PROPERTY_SCRCLK_STR', 'PROPERTY_WNDSCR', 'PROPERTY_WNDSTAT', 'PROPERTY_WNDTOOL', 'PROPERTY_WND_STR', 'EXPORT_DATAEXPORT', 'EXPORT_TOFILE', 'EXPORT_FROMFILE', 'EXPORT_TOSERV', 'EXPORT_FROMSERV', 'EXPORT_FROMOTHER', 'EXPORT_USERID', 'EXPORT_INVID', 'EXPORT_ERROR', 'EXPORT_NODATA', 'EXPORT_UPLOADED', 'EXPORT_CODEPROMPT', 'EXPORT_ONLYOPT', 'EXPORT_ACCOUNT', 'EXPORT_LOGINGGL', 'EXPORT_LOGINWCA', 'EXPORT_LOGOUTCFM', 'EXPORT_LOGINAUTHED', 'IMPORT_FINAL_CONFIRM', 'BUTTON_SCRAMBLE', 'BUTTON_TOOLS', 'IMAGE_UNAVAILABLE', 'TOOLS_SELECTFUNC', 'TOOLS_CROSS', 'TOOLS_EOLINE', 'TOOLS_ROUX1', 'TOOLS_222FACE', 'TOOLS_GIIKER', 'TOOLS_IMAGE', 'TOOLS_STATS', 'TOOLS_HUGESTATS', 'TOOLS_DISTRIBUTION', 'TOOLS_TREND', 'TOOLS_METRONOME', 'TOOLS_CFMTIME', 'TOOLS_SOLVERS', 'TOOLS_SYNCSEED', 'TOOLS_SYNCSEED_SEED', 'TOOLS_SYNCSEED_INPUT', 'TOOLS_SYNCSEED_30S', 'TOOLS_SYNCSEED_HELP', 'TOOLS_SYNCSEED_DISABLE', 'TOOLS_SYNCSEED_INPUTA', 'OLCOMP_UPDATELIST', 'OLCOMP_VIEWRESULT', 'OLCOMP_VIEWMYRESULT', 'OLCOMP_START', 'OLCOMP_SUBMIT', 'OLCOMP_SUBMITAS', 'OLCOMP_WCANOTICE', 'OLCOMP_OLCOMP', 'OLCOMP_ANONYM', 'OLCOMP_ME', 'OLCOMP_WCAACCOUNT', 'OLCOMP_ABORT', 'OLCOMP_WITHANONYM', 'PROPERTY_IMGSIZE', 'TIMER_INSPECT', 'TIMER_SOLVE', 'PROPERTY_USEMOUSE', 'PROPERTY_TIMEU', 'PROPERTY_TIMEU_STR', 'PROPERTY_PRETIME', 'PROPERTY_ENTERING', 'PROPERTY_ENTERING_STR', 'PROPERTY_INTUNIT', 'PROPERTY_INTUNIT_STR', 'PROPERTY_COLOR', 'PROPERTY_COLORS', 'PROPERTY_VIEW', 'PROPERTY_VIEW_STR', 'PROPERTY_UIDESIGN', 'PROPERTY_UIDESIGN_STR', 'COLOR_EXPORT', 'COLOR_IMPORT', 'COLOR_FAIL', 'PROPERTY_FONTCOLOR_STR', 'PROPERTY_COLOR_STR', 'PROPERTY_FONT', 'PROPERTY_FONT_STR', 'PROPERTY_FORMAT', 'PROPERTY_USEKSC', 'PROPERTY_NTOOLS', 'PROPERTY_AHIDE', 'SCRAMBLE_LAST', 'SCRAMBLE_NEXT', 'SCRAMBLE_SCRAMBLE', 'SCRAMBLE_LENGTH', 'SCRAMBLE_INPUT', 'PROPERTY_VRCSPEED', 'PROPERTY_VRCMP', 'PROPERTY_VRCMPS', 'PROPERTY_GIIKERVRC', 'PROPERTY_GIISOK_DELAY', 'PROPERTY_GIISOK_DELAYS', 'PROPERTY_GIISOK_KEY', 'PROPERTY_GIISOK_MOVE', 'PROPERTY_GIISOK_MOVES', 'PROPERTY_GIISBEEP', 'PROPERTY_GIIRST', 'PROPERTY_GIIRSTS', 'CONFIRM_GIIRST', 'PROPERTY_GIIAED', 'scrdata', 'SCRAMBLE_NOOBST', 'SCRAMBLE_NOOBSS', 'STATS_CFM_RESET', 'STATS_CFM_DELSS', 'STATS_CFM_DELMUL', 'STATS_CFM_DELETE', 'STATS_COMMENT', 'STATS_REVIEW', 'STATS_DATE', 'STATS_SSSTAT', 'STATS_CURROUND', 'STATS_CURSESSION', 'STATS_CURSPLIT', 'STATS_EXPORTCSV', 'STATS_SSMGR_TITLE', 'STATS_SSMGR_NAME', 'STATS_SSMGR_DETAIL', 'STATS_SSMGR_OPS', 'STATS_SSMGR_ORDER', 'STATS_SSMGR_ODCFM', 'STATS_SSMGR_SORTCFM', 'STATS_ALERTMG', 'STATS_PROMPTSPL', 'STATS_ALERTSPL', 'STATS_AVG', 'STATS_SOLVE', 'STATS_TIME', 'STATS_SESSION', 'STATS_SESSION_NAME', 'STATS_SESSION_NAMEC', 'STATS_STRING', 'STATS_PREC', 'STATS_PREC_STR', 'STATS_TYPELEN', 'STATS_STATCLR', 'STATS_ABSIDX', 'STATS_XSESSION_DATE', 'STATS_XSESSION_NAME', 'STATS_XSESSION_SCR', 'STATS_XSESSION_CALC', 'STATS_RSFORSS', 'PROPERTY_PRINTSCR', 'PROPERTY_PRINTDATE', 'PROPERTY_SUMMARY', 'PROPERTY_IMRENAME', 'PROPERTY_SCR2SS', 'PROPERTY_SS2SCR', 'PROPERTY_SS2PHASES', 'PROPERTY_STATINV', 'PROPERTY_STATAL', 'PROPERTY_STATALU', 'PROPERTY_DELMUL', 'PROPERTY_TOOLSFUNC', 'PROPERTY_TRIM', 'PROPERTY_TRIM_MED', 'PROPERTY_STKHEAD', 'PROPERTY_HIDEFULLSOL', 'PROPERTY_IMPPREV', 'PROPERTY_AUTOEXP', 'PROPERTY_AUTOEXP_OPT', 'PROPERTY_SCRASIZE', 'MODULE_NAMES', 'BGIMAGE_URL', 'BGIMAGE_INVALID', 'BGIMAGE_OPACITY', 'BGIMAGE_IMAGE', 'BGIMAGE_IMAGE_STR', 'SHOW_AVG_LABEL', 'USE_LOGOHINT', 'TOOLS_SCRGEN', 'SCRGEN_NSCR', 'SCRGEN_PRE', 'SCRGEN_GEN'];
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
		window.localStorage = {};
	}

	if (!('properties' in localStorage) && location.protocol != 'https:' && location.hostname != 'localhost') {
		location.href = 'https:' + location.href.substring(location.protocol.length);
	}

	if (window.performance && window.performance.now) {
		$.now = function() {
			return Math.floor(window.performance.now());
		};
	}

	$.urlParam = function(name) {
		var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		if (results == null) {
			return null;
		} else {
			return results[1] || 0;
		}
	};

	$.hashParam = function(name) {
		var results = new RegExp('[#&]' + name + '=([^&#]*)').exec(window.location.hash);
		if (results == null) {
			return null;
		} else {
			return results[1] || 0;
		}
	};

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
	};

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
	};

	$.clipboardCopy = function(value, callback) {
		var textArea = $('<textarea>' + value + '</textarea>').appendTo(document.body);
		textArea.focus().select();
		var succ = false;
		try {
			succ = document.execCommand('copy');
		} catch (err) {}
		textArea.remove();
		return succ;
	};

	$.fingerprint = function() {
		var fp_screen = window.screen && [Math.max(screen.height, screen.width), Math.min(screen.height, screen.width), screen.colorDepth].join("x");
		var fp_tzoffset = new Date().getTimezoneOffset();
		var fp_plugins = $.map(navigator.plugins, function(p) {
			return [
				p.name,
				p.description,
				$.map(p, function(mt) {
					return [mt.type, mt.suffixes].join("~");
				}).sort().join(",")
			].join("::");
		}).sort().join(";");
		var rawFP = [
			navigator.userAgent,
			navigator.language,
			!!window.sessionStorage,
			!!window.localStorage,
			!!window.indexedDB,
			navigator.doNotTrack,
			fp_screen,
			fp_tzoffset,
			fp_plugins
		].join("###");
		return $.sha256(rawFP);
	};

	// trans: [size, offx, offy] == [size, 0, offx * size, 0, size, offy * size] or [a11 a12 a13 a21 a22 a23]
	$.ctxDrawPolygon = function(ctx, color, arr, trans) {
		if (!ctx) {
			return;
		}
		trans = trans || [1, 0, 0, 0, 1, 0];
		arr = $.ctxTransform(arr, trans);
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.moveTo(arr[0][0], arr[1][0]);
		for (var i = 1; i < arr[0].length; i++) {
			ctx.lineTo(arr[0][i], arr[1][i]);
		}
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
	}

	$.ctxRotate = function(arr, theta) {
		return Transform(arr, [Math.cos(theta), -Math.sin(theta), 0, Math.sin(theta), Math.cos(theta), 0]);
	}

	$.ctxTransform = function(arr) {
		var ret;
		for (var i = 1; i < arguments.length; i++) {
			var trans = arguments[i];
			if (trans.length == 3) {
				trans = [trans[0], 0, trans[1] * trans[0], 0, trans[0], trans[2] * trans[0]];
			}
			ret = [[], []];
			for (var i = 0; i < arr[0].length; i++) {
				ret[0][i] = arr[0][i] * trans[0] + arr[1][i] * trans[1] + trans[2];
				ret[1][i] = arr[0][i] * trans[3] + arr[1][i] * trans[4] + trans[5];
			}
		}
		return ret;
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
	};
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