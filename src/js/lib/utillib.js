'use strict';

const isInNode = (typeof process === 'object' && typeof require === 'function' && typeof global === 'object');
const isInWorker = (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) || isInNode;

/** @define {boolean} */
const ISCSTIMER = true;

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
	if (isInNode) {
		global['self'] = global;
	}
	self.$ = {
		isArray: Array.isArray,
		noop: function() {},
		now: function() {
			return +new Date;
		}
	};
});

ISCSTIMER && execMain(function() {
	$.beacon = function(obj, url) {
		url = url || 'stat.php';
		obj = typeof(obj) == 'string' ? obj : JSON.stringify(obj);
		if (navigator.sendBeacon) {
			navigator.sendBeacon(url, obj);
		} else {
			$.post(url, obj);
		}
	};

	window.onerror = function(msg, url, line, col, error) {
		if (!line && !col || /extension|adsbygoogle/i.exec(url) || !/\.js/i.exec(url)) {
			return;
		}
		if (error == undefined) {
			error = {};
		}
		var fingerprint = '';
		try {
			fingerprint = $.fingerprint();
		} catch (e) {}
		$.beacon({
			'version': CSTIMER_VERSION,
			'fp': fingerprint,
			'msg': msg,
			'url': url,
			'line': line,
			'col': col,
			'stack': error.stack
		}, 'bug.php');
		DEBUG && console.log(CSTIMER_VERSION, fingerprint, msg, url, line, col, error);
	};

	var constants = ['CSTIMER_VERSION', 'LANG_SET', 'LANG_STR', 'LANG_CUR', 'OK_LANG', 'CANCEL_LANG', 'RESET_LANG', 'ABOUT_LANG', 'ZOOM_LANG', 'COPY_LANG', 'BUTTON_TIME_LIST', 'BUTTON_OPTIONS', 'BUTTON_EXPORT', 'BUTTON_DONATE', 'PROPERTY_SR', 'PROPERTY_USEINS', 'PROPERTY_USEINS_STR', 'PROPERTY_SHOWINS', 'PROPERTY_VOICEINS', 'PROPERTY_VOICEINS_STR', 'PROPERTY_VOICEVOL', 'PROPERTY_PHASES', 'PROPERTY_TIMERSIZE', 'PROPERTY_USEMILLI', 'PROPERTY_SMALLADP', 'PROPERTY_SCRSIZE', 'PROPERTY_SCRMONO', 'PROPERTY_SCRLIM', 'PROPERTY_SCRALIGN', 'PROPERTY_SCRALIGN_STR', 'PROPERTY_SCRWRAP', 'PROPERTY_SCRWRAP_STR', 'PROPERTY_SCRNEUT', 'PROPERTY_SCRNEUT_STR', 'PROPERTY_SCREQPR', 'PROPERTY_SCREQPR_STR', 'PROPERTY_SCRFAST', 'PROPERTY_SCRKEYM', 'PROPERTY_SCRCLK', 'PROPERTY_SCRCLK_STR', 'PROPERTY_WNDSCR', 'PROPERTY_WNDSTAT', 'PROPERTY_WNDTOOL', 'PROPERTY_WND_STR', 'EXPORT_DATAEXPORT', 'EXPORT_TOFILE', 'EXPORT_FROMFILE', 'EXPORT_TOSERV', 'EXPORT_FROMSERV', 'EXPORT_FROMOTHER', 'EXPORT_USERID', 'EXPORT_INVID', 'EXPORT_ERROR', 'EXPORT_NODATA', 'EXPORT_UPLOADED', 'EXPORT_CODEPROMPT', 'EXPORT_ONLYOPT', 'EXPORT_ACCOUNT', 'EXPORT_LOGINGGL', 'EXPORT_LOGINWCA', 'EXPORT_LOGOUTCFM', 'EXPORT_LOGINAUTHED', 'EXPORT_AEXPALERT', 'EXPORT_WHICH', 'EXPORT_WHICH_ITEM', 'IMPORT_FINAL_CONFIRM', 'BUTTON_SCRAMBLE', 'BUTTON_TOOLS', 'IMAGE_UNAVAILABLE', 'TOOLS_SELECTFUNC', 'TOOLS_CROSS', 'TOOLS_EOLINE', 'TOOLS_ROUX1', 'TOOLS_222FACE', 'TOOLS_GIIKER', 'TOOLS_IMAGE', 'TOOLS_STATS', 'TOOLS_HUGESTATS', 'TOOLS_DISTRIBUTION', 'TOOLS_TREND', 'TOOLS_METRONOME', 'TOOLS_RECONS', 'TOOLS_RECONS_NODATA', 'TOOLS_RECONS_TITLE', 'TOOLS_TRAINSTAT', 'TOOLS_BLDHELPER', 'TOOLS_CFMTIME', 'TOOLS_SOLVERS', 'TOOLS_DLYSTAT', 'TOOLS_DLYSTAT1', 'TOOLS_DLYSTAT_OPT1', 'TOOLS_DLYSTAT_OPT2', 'TOOLS_SYNCSEED', 'TOOLS_SYNCSEED_SEED', 'TOOLS_SYNCSEED_INPUT', 'TOOLS_SYNCSEED_30S', 'TOOLS_SYNCSEED_HELP', 'TOOLS_SYNCSEED_DISABLE', 'TOOLS_SYNCSEED_INPUTA', 'TOOLS_BATTLE', 'TOOLS_BATTLE_HEAD', 'TOOLS_BATTLE_TITLE', 'TOOLS_BATTLE_STATUS', 'TOOLS_BATTLE_INFO', 'TOOLS_BATTLE_JOINALERT', 'TOOLS_BATTLE_LEAVEALERT', 'OLCOMP_UPDATELIST', 'OLCOMP_VIEWRESULT', 'OLCOMP_VIEWMYRESULT', 'OLCOMP_START', 'OLCOMP_SUBMIT', 'OLCOMP_SUBMITAS', 'OLCOMP_WCANOTICE', 'OLCOMP_OLCOMP', 'OLCOMP_ANONYM', 'OLCOMP_ME', 'OLCOMP_WCAACCOUNT', 'OLCOMP_ABORT', 'OLCOMP_WITHANONYM', 'PROPERTY_IMGSIZE', 'PROPERTY_IMGREP', 'TIMER_INSPECT', 'TIMER_SOLVE', 'PROPERTY_USEMOUSE', 'PROPERTY_TIMEU', 'PROPERTY_TIMEU_STR', 'PROPERTY_PRETIME', 'PROPERTY_ENTERING', 'PROPERTY_ENTERING_STR', 'PROPERTY_INTUNIT', 'PROPERTY_INTUNIT_STR', 'PROPERTY_COLOR', 'PROPERTY_COLORS', 'PROPERTY_VIEW', 'PROPERTY_VIEW_STR', 'PROPERTY_UIDESIGN', 'PROPERTY_UIDESIGN_STR', 'COLOR_EXPORT', 'COLOR_IMPORT', 'COLOR_FAIL', 'PROPERTY_FONTCOLOR_STR', 'PROPERTY_COLOR_STR', 'PROPERTY_FONT', 'PROPERTY_FONT_STR', 'PROPERTY_FORMAT', 'PROPERTY_USEKSC', 'PROPERTY_USEGES', 'PROPERTY_NTOOLS', 'PROPERTY_AHIDE', 'SCRAMBLE_LAST', 'SCRAMBLE_NEXT', 'SCRAMBLE_SCRAMBLE', 'SCRAMBLE_SCRAMBLING', 'SCRAMBLE_LENGTH', 'SCRAMBLE_INPUT', 'SCRAMBLE_INPUTTYPE', 'PROPERTY_VRCSPEED', 'PROPERTY_VRCORI', 'PROPERTY_VRCMP', 'PROPERTY_VRCMPS', 'PROPERTY_GIIKERVRC', 'PROPERTY_GIISOK_DELAY', 'PROPERTY_GIISOK_DELAYS', 'PROPERTY_GIISOK_KEY', 'PROPERTY_GIISOK_MOVE', 'PROPERTY_GIISOK_MOVES', 'PROPERTY_GIISBEEP', 'PROPERTY_GIIRST', 'PROPERTY_GIIRSTS', 'PROPERTY_GIIMODE', 'PROPERTY_GIIMODES', 'PROPERTY_VRCAH', 'PROPERTY_VRCAHS', 'CONFIRM_GIIRST', 'PROPERTY_GIIAED', 'scrdata', 'SCRAMBLE_NOOBST', 'SCRAMBLE_NOOBSS', 'SCROPT_TITLE', 'SCROPT_BTNALL', 'SCROPT_BTNNONE', 'SCROPT_EMPTYALT', 'STATS_CFM_RESET', 'STATS_CFM_DELSS', 'STATS_CFM_DELMUL', 'STATS_CFM_DELETE', 'STATS_COMMENT', 'STATS_REVIEW', 'STATS_DATE', 'STATS_SSSTAT', 'STATS_SSRETRY', 'STATS_CURROUND', 'STATS_CURSESSION', 'STATS_CURSPLIT', 'STATS_EXPORTCSV', 'STATS_SSMGR_TITLE', 'STATS_SSMGR_NAME', 'STATS_SSMGR_DETAIL', 'STATS_SSMGR_OPS', 'STATS_SSMGR_ORDER', 'STATS_SSMGR_ODCFM', 'STATS_SSMGR_SORTCFM', 'STATS_ALERTMG', 'STATS_PROMPTSPL', 'STATS_ALERTSPL', 'STATS_AVG', 'STATS_SUM', 'STATS_SOLVE', 'STATS_TIME', 'STATS_SESSION', 'STATS_SESSION_NAME', 'STATS_SESSION_NAMEC', 'STATS_STRING', 'STATS_PREC', 'STATS_PREC_STR', 'STATS_TYPELEN', 'STATS_STATCLR', 'STATS_ABSIDX', 'STATS_XSESSION_DATE', 'STATS_XSESSION_NAME', 'STATS_XSESSION_SCR', 'STATS_XSESSION_CALC', 'STATS_RSFORSS', 'PROPERTY_PRINTSCR', 'PROPERTY_PRINTCOMM', 'PROPERTY_PRINTDATE', 'PROPERTY_SUMMARY', 'PROPERTY_IMRENAME', 'PROPERTY_SCR2SS', 'PROPERTY_SS2SCR', 'PROPERTY_SS2PHASES', 'PROPERTY_STATINV', 'PROPERTY_STATSSUM', 'PROPERTY_STATTHRES', 'PROPERTY_STATBPA', 'PROPERTY_STATWPA', 'PROPERTY_STATAL', 'PROPERTY_STATALU', 'PROPERTY_HLPBS', 'PROPERTY_HLPBS_STR', 'PROPERTY_DELMUL', 'PROPERTY_TOOLSFUNC', 'PROPERTY_TRIM', 'PROPERTY_TRIMR', 'PROPERTY_TRIM_MED', 'PROPERTY_STKHEAD', 'PROPERTY_TOOLPOS', 'PROPERTY_TOOLPOS_STR', 'PROPERTY_HIDEFULLSOL', 'PROPERTY_IMPPREV', 'PROPERTY_AUTOEXP', 'PROPERTY_AUTOEXP_OPT', 'PROPERTY_SCRASIZE', 'MODULE_NAMES', 'BGIMAGE_URL', 'BGIMAGE_INVALID', 'BGIMAGE_OPACITY', 'BGIMAGE_IMAGE', 'BGIMAGE_IMAGE_STR', 'SHOW_AVG_LABEL', 'SHOW_DIFF_LABEL', 'SHOW_DIFF_LABEL_STR', 'USE_LOGOHINT', 'TOOLS_SCRGEN', 'SCRGEN_NSCR', 'SCRGEN_PRE', 'SCRGEN_GEN', 'VRCREPLAY_TITLE', 'VRCREPLAY_ORI', 'VRCREPLAY_SHARE', 'GIIKER_CONNECT', 'GIIKER_RESET', 'GIIKER_REQMACMSG', 'GIIKER_NOBLEMSG', 'PROPERTY_SHOWAD', 'PROPERTY_GIIORI', 'LGHINT_INVALID', 'LGHINT_NETERR', 'LGHINT_SERVERR', 'LGHINT_SUBMITED', 'LGHINT_SSBEST', 'LGHINT_SCRCOPY', 'LGHINT_LINKCOPY', 'LGHINT_SOLVCOPY', 'LGHINT_SORT0', 'LGHINT_IMPORTED', 'LGHINT_IMPORT0', 'LGHINT_BTCONSUC', 'LGHINT_BTDISCON', 'LGHINT_BTNOTSUP', 'LGHINT_BTINVMAC', 'LGHINT_AEXPABT', 'LGHINT_AEXPSUC', 'LGHINT_AEXPFAL', 'EASY_SCRAMBLE_HINT'];
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

	$.clipboardCopy = function(value) {
		if (navigator.clipboard && navigator.clipboard.writeText) {
			return navigator.clipboard.writeText(value);
		}
		DEBUG && console.log('[utillib] clipboard copy fallback');
		var textArea = $('<textarea>' + value + '</textarea>').appendTo(document.body);
		textArea.focus().select();
		var succ = false;
		try {
			succ = document.execCommand('copy');
		} catch (err) {}
		textArea.remove();
		return succ ? Promise.resolve() : Promise.reject();
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

	$.delayExec = (function() {
		var tids = {};

		return function(key, func, timeout) {
			if (tids[key]) {
				clearTimeout(tids[key][0]);
				delete tids[key];
			}
			var tid = setTimeout(func, timeout);
			tids[key] = [tid, func];
		}
	})();

	$.waitUser = (function() {
		var callbacks = [];

		function reg(func) {
			callbacks.push(func);
		}

		function call() {
			for (var i = 0; i < callbacks.length; i++) {
				callbacks[i]();
			}
			callbacks = [];
		}

		return {
			reg: reg,
			call: call
		}
	})();

	$.ppost = function(url, data, dataType) {
		return new Promise(function(resolve, reject) {
			$.post(url, data, resolve, dataType).error(reject);
		});
	};

	(function() {
		// handle blocked alert/confirm/prompt
		var lastMsg = null;

		$.alert = function(msg) {
			var tt = $.now();
			alert(msg);
			if ($.now() - tt < 20) {
				logohint.push(msg);
			}
		};

		$.confirm = function(msg) {
			var tt = $.now();
			var ret = confirm(msg);
			if (!ret && $.now() - tt < 20) {
				if (msg == lastMsg) {
					lastMsg = null;
					return true;
				}
				logohint.push(msg);
				lastMsg = msg;
			}
			return ret;
		};

		$.prompt = function(msg, val) {
			var tt = $.now();
			var ret = prompt(msg, val);
			if (!ret && $.now() - tt < 20) {
				if (msg == lastMsg) {
					lastMsg = null;
					logohint.push($.format('Use default value [{0}]', [val || '']));
					return val || null;
				}
				logohint.push('Popup dialog blocked, reclick to use default');
				lastMsg = msg;
			}
			return ret;
		};
	})();

	$.fn.reclk = function(handler) {
		return this.unbind('click').click(handler);
	};

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

	if (navigator.storage && navigator.storage.persisted) {
		navigator.storage.persisted().then(function(persistent) {
			if (persistent) {
				return Promise.resolve(persistent);
			} else if (navigator.storage.persist) {
				return navigator.storage.persist();
			}
		}).then(function(persistent) {
			$.persistent = persistent;
		});
	}
});

/** @define {boolean} */
const DEBUGM = true;
/** @define {boolean} */
const DEBUGWK = false;
const DEBUG = ISCSTIMER && (isInWorker ? DEBUGWK : (DEBUGM && !!$.urlParam('debug')));
var DEBUGBL = false; // for debugging bluetooth

(function() {
	$.svg = (function() {
		function SVG(width, height) {
			this.elems = [];
			this.width = width;
			this.height = height;
		}

		function parseNumber(f) {
			return parseFloat(f.toFixed(3)).toString();
		}

		SVG.prototype.addElem = function(xml) {
			this.elems.push(xml);
		}

		SVG.prototype.addPoly = function(points, fillStyle, strokeStyle) {
			var cords = [];
			for (var i = 0; i < points[0].length; i++) {
				cords.push(parseNumber(points[0][i]) + ',' + parseNumber(points[1][i]));
			}
			this.elems.push('<polygon points="' + cords.join(' ') +
				'" style="fill:' + fillStyle + ';stroke:' + (strokeStyle || '#000') + ';" />');
		}

		SVG.prototype.addText = function(text, points, styles, align) {
			var styleStr = "paint-order:stroke;";
			for (var key in styles) {
				styleStr += key + ':' + styles[key] + ';';
			}
			var alignKV = 'dominant-baseline="middle" text-anchor="middle"';
			if (align == 1) {
				alignKV = 'dominant-baseline="hanging" text-anchor="start"';
			}
			this.elems.push('<text x="' + parseNumber(points[0]) + '" y="' + parseNumber(points[1]) +
				'" style="' + styleStr + '" ' + alignKV + '>' +
				encodeURIComponent(text) + '</text>');
		}

		SVG.prototype.render = function() {
			return '<svg width="' + parseNumber(this.width) + '" height="' + parseNumber(this.height) +
				'" xmlns="http://www.w3.org/2000/svg">' + this.elems.join('') + '</svg>';
		}

		SVG.prototype.renderGroup = function(x, y, width, height) {
			var scale = Math.min(width / this.width, height / this.height);
			var offset = [(width - this.width * scale) / 2, (height - this.height * scale) / 2];
			return '<g transform="translate(' +
				parseNumber(x + (width - this.width * scale) / 2) + ',' +
				parseNumber(y + (height - this.height * scale) / 2) + ') scale(' +
				parseNumber(scale) + ')">' + this.elems.join('') + '</g>';
		}

		return SVG;
	})();

	// trans: [size, offx, offy] == [size, 0, offx * size, 0, size, offy * size] or [a11 a12 a13 a21 a22 a23]
	$.ctxDrawPolygon = function(ctx, color, arr, trans) {
		if (!ctx) {
			return;
		}
		trans = trans || [1, 0, 0, 0, 1, 0];
		arr = $.ctxTransform(arr, trans);
		if (ctx instanceof $.svg) {
			return ctx.addPoly(arr, color);
		}
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.moveTo(arr[0][0], arr[1][0]);
		for (var i = 1; i < arr[0].length; i++) {
			ctx.lineTo(arr[0][i], arr[1][i]);
		}
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
	};

	$.ctxRotate = function(arr, theta) {
		return $.ctxTransform(arr, [Math.cos(theta), -Math.sin(theta), 0, Math.sin(theta), Math.cos(theta), 0]);
	};

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
	};

	$.nearColor = function(color, ref, longFormat) {
		var col, m;
		m = /^#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])$/.exec(color);
		if (m) {
			col = [m[1] + m[1], m[2] + m[2], m[3] + m[3]];
		}
		m = /^#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/.exec(color);
		if (m) {
			col = [m[1], m[2], m[3]];
		}
		for (var i=0; i<3; i++) {
			col[i] = parseInt(col[i], 16) + (ref || 0);
			col[i] = Math.min(Math.max(col[i], 0), 255);
			col[i] = (Math.round(col[i]/17)).toString(16);
		}
		return "#" + (longFormat ? col[0] + col[0] + col[1] + col[1] + col[2] + col[2] : col[0] + col[1] + col[2]);
	};

	$.col2std = function(col, faceMap) {
		var ret = [];
		col = (col || '').match(/#[0-9a-fA-F]{3}/g) || [];
		for (var i = 0; i < col.length; i++) {
			ret.push(~~($.nearColor(col[faceMap[i]], 0, true).replace('#', '0x')));
		}
		return ret;
	};

	$.format = function(format, args) {
		return format.replace(/{(\d+)}/g, (m, num) => args[~~num] || '');
	};

	$.UDPOLY_RE = "skb|m?pyr|prc|heli(?:2x2|cv)?|crz3a|giga|mgm|klm|redi|dino|fto|dmd|ctico";
	$.TWISTY_RE = "sq1|clk|udpoly|" + $.UDPOLY_RE;
})();
