"use strict";

var trainerInit = execMain(function() {

	var _initialized = false;
	var _bootstrapped = false;
	var _modeActive = false;
	var _mount = null;
	var _nativeButton = null;

	function _getShell() {
		return typeof trainerShell !== "undefined" ? trainerShell : null;
	}

	function _getIntegration() {
		return typeof trainerIntegration !== "undefined" ? trainerIntegration : null;
	}

	function _ensureStyles() {
		if ($("#trainer-native-styles").length) {
			return;
		}
		$("<style id='trainer-native-styles'>" + [
			"@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap');",
			"#trainer-root-native { position:absolute; top:1rem; left:calc(13.5rem + 1.5rem); right:1rem; bottom:1rem; z-index:25; display:none; overflow:auto; border:1px solid rgba(237,232,225,0.08); border-radius:14px; background:#1a1816; box-shadow:0 28px 80px rgba(0,0,0,0.35); ms-overflow-style:none; scrollbar-width:none; }",
			"#trainer-root-native::-webkit-scrollbar { display:none; }",
			"body.trainer-mode #trainer-root-native { display:block; }",
			"body.trainer-mode #timer, body.trainer-mode #rtimer, body.trainer-mode #wndctn { display:none !important; }",
			"body.trainer-mode #bgImage { opacity:0.12; }",
			"#leftbar > div.c5.trainer-slot .icon { font-family:Arial, sans-serif; font-size:1.05em; font-weight:700; letter-spacing:0.08em; }",
			"#leftbar > div.c5.trainer-slot > div > span:first-child { font-family:Arial, sans-serif; font-size:0.9em; font-weight:700; letter-spacing:0.04em; }",
			".trainer-shell { min-height:100%; }",
			".trainer-shell-header { position:sticky; top:0; z-index:2; background:linear-gradient(180deg, rgba(26,24,22,0.98), rgba(26,24,22,0.88)); backdrop-filter:blur(8px); }",
			".trainer-shell-body { min-height:100%; padding-top:24px; }",
			".trainer-setup-placeholder { max-width:760px; margin:64px auto; padding:32px; background:#272320; border:1px solid rgba(237,232,225,0.08); border-radius:10px; color:#ede8e1; }",
			".trainer-setup-placeholder h2 { margin:0 0 12px; font-size:32px; font-family:Georgia, serif; }",
			".trainer-setup-placeholder p { color:#9b9388; margin:0 0 12px; }",
			".trainer-setup-placeholder .trainer-setup-meta { font-family:'Courier New', monospace; font-size:12px; color:#e8a620; text-transform:uppercase; letter-spacing:0.08em; }",
			".trainer-setup-placeholder .trainer-setup-actions { display:flex; gap:12px; margin-top:20px; }",
			".trainer-setup-placeholder button { border:none; border-radius:4px; padding:10px 16px; cursor:pointer; }",
			".trainer-setup-primary { background:#e8a620; color:#1a1816; }",
			".trainer-setup-ghost { background:#302b27; color:#ede8e1; }",
			"html.m #trainer-root-native { left:0.5rem; right:0.5rem; top:0.5rem; bottom:calc(11.8vw + 1rem); border-radius:12px; }",
			"html.m #leftbar > div.c5.trainer-slot .icon { font-size:0.95em; }"
		].join("") + "</style>").appendTo("head");
	}

	function _setModeActive(isActive) {
		_modeActive = !!isActive;
		$("body").toggleClass("trainer-mode", _modeActive);
		if (_nativeButton) {
			_nativeButton.toggleClass("enable", _modeActive);
		}
	}

	function _renderEntry(el, data) {
		if (typeof trainerEntryHome === "undefined") {
			el.text("Trainer entry home not available.");
			return null;
		}
		trainerEntryHome.render(el, data || null);
		return function() {
			trainerEntryHome.destroy();
		};
	}

	function _renderWeaknessSummary(el, data) {
		if (typeof weaknessSummary === "undefined") {
			el.text("Weakness summary not available.");
			return null;
		}
		weaknessSummary.render(el, data || null);
		return function() {
			weaknessSummary.destroy();
		};
	}

	function _renderSessionReview(el, data) {
		if (typeof sessionReview === "undefined") {
			el.text("Session review not available.");
			return null;
		}
		sessionReview.render(el, data || null);
		return function() {
			sessionReview.destroy();
		};
	}

	function _renderSetup(el, data) {
		if (typeof trainerSetup === "undefined") {
			_renderSetupPlaceholder(el, data);
			return null;
		}
		trainerSetup.render(el, data || null);
		return function() {
			trainerSetup.destroy();
		};
	}

	function _renderActiveSession(el, data) {
		if (typeof trainerActiveSession === "undefined") {
			el.text("Active session module not available.");
			return null;
		}
		trainerActiveSession.render(el, data || null);
		return function() {
			trainerActiveSession.destroy();
		};
	}

	function _renderSetupPlaceholder(el, data) {
		var selectedGoal = data && data.selectedGoal ? data.selectedGoal : "last-layer";
		var focusCaseId = data && data.focusCaseId ? data.focusCaseId : null;
		var focusCategory = data && data.focusCategory ? data.focusCategory : null;
		var card = $('<div class="trainer-setup-placeholder"></div>');
		card.append($('<div class="trainer-setup-meta"></div>').text("Shared trainer shell"));
		card.append($('<h2></h2>').text("Training plan setup arrives in B06"));
		card.append($('<p></p>').text("Your entry selection is captured, but the actual guided setup flow is intentionally deferred to the next packet."));
		card.append($('<p></p>').text("This placeholder prevents the entry and weakness surfaces from dead-ending while we keep the build order intact."));
		if (selectedGoal) {
			card.append($('<div class="trainer-setup-meta"></div>').text("Goal: " + selectedGoal));
		}
		if (focusCaseId) {
			card.append($('<div class="trainer-setup-meta"></div>').text("Focus case: " + focusCaseId));
		}
		if (focusCategory) {
			card.append($('<div class="trainer-setup-meta"></div>').text("Focus category: " + focusCategory));
		}
		var actions = $('<div class="trainer-setup-actions"></div>');
		actions.append($('<button class="trainer-setup-primary"></button>').text("Back to entry").on("click", function() {
			showEntry({ selectedGoal: selectedGoal });
		}));
		actions.append($('<button class="trainer-setup-ghost"></button>').text("View weakness summary").on("click", function() {
			showWeaknessSummary({ activeCategory: focusCategory || "PLL" });
		}));
		card.append(actions);
		el.empty().append(card);
		return function() {
			actions.find("button").off("click");
		};
	}

	function init(containerEl) {
		if (_initialized) {
			return;
		}
		var integration = _getIntegration();
		var shell = _getShell();
		if (!integration || !shell) {
			return;
		}
		integration.initShell(containerEl);
		_initialized = true;
	}

	function hide() {
		var shell = _getShell();
		if (shell) {
			shell.hideAllSurfaces();
		}
		_setModeActive(false);
	}

	function showEntry(data) {
		var integration = _getIntegration();
		if (!integration) {
			return;
		}
		_setModeActive(true);
		integration.showSurface("entry", _renderEntry, data || null);
	}

	function showWeaknessSummary(data) {
		var integration = _getIntegration();
		if (!integration) {
			return;
		}
		_setModeActive(true);
		integration.showSurface("review", _renderWeaknessSummary, data || null);
	}

	function showSurface(name, data) {
		var integration = _getIntegration();
		if (!integration) {
			return;
		}
		_setModeActive(true);
		if (name === "entry") {
			showEntry(data);
			return;
		}
		if (name === "weakness") {
			showWeaknessSummary(data);
			return;
		}
		if (name === "review") {
			if (data && data.sessionResult) {
				integration.showSurface("review", _renderSessionReview, data);
			} else {
				showWeaknessSummary(data);
			}
			return;
		}
		if (name === "setup") {
			integration.showSurface("setup", _renderSetup, data || null);
			return;
		}
		if (name === "active") {
			integration.showSurface("active", _renderActiveSession, data || null);
			return;
		}
		integration.showSurface(name, null, data || null);
	}

	function _ensureNativeMount() {
		if (!_mount) {
			_mount = $('<div id="trainer-root-native"></div>');
			$("body").append(_mount);
		}
		init(_mount);
	}

	function _ensureNativeButton() {
		var leftbar = $("#leftbar");
		if (!leftbar.length) {
			return;
		}
		leftbar.children(".c5").addClass("trainer-slot");
		leftbar.children(".c5").find(".icon").text("TR");
		if (typeof kernel !== "undefined" && kernel.addButton) {
			kernel.addButton("trainer", "Trainer", function() {
				showEntry();
			}, 5);
		} else {
			leftbar.children(".c5").off("click").on("click", function() {
				showEntry();
			});
		}
		_nativeButton = leftbar.children(".c5");
	}

	function bootstrap() {
		if (_bootstrapped || typeof $ === "undefined") {
			return;
		}
		_bootstrapped = true;
		_ensureStyles();

		$(function() {
			_ensureNativeMount();
			_ensureNativeButton();
		});
	}

	bootstrap();

	return {
		init: init,
		showEntry: showEntry,
		showWeaknessSummary: showWeaknessSummary,
		showSurface: showSurface,
		hide: hide,
		bootstrap: bootstrap,
		isActive: function() {
			return _modeActive;
		}
	};
});
