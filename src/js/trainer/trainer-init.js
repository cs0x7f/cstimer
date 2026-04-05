"use strict";

var trainerInit = execMain(function() {

	var _initialized = false;
	var _bootstrapped = false;
	var _overlay = null;
	var _mount = null;

	function _getShell() {
		return typeof trainerShell !== "undefined" ? trainerShell : null;
	}

	function _getIntegration() {
		return typeof trainerIntegration !== "undefined" ? trainerIntegration : null;
	}

	function _ensureStyles() {
		if ($("#trainer-launcher-styles").length) {
			return;
		}
		$("<style id='trainer-launcher-styles'>" + [
			".trainer-launcher-btn { position:fixed; right:16px; bottom:16px; z-index:10002; background:#e8a620; color:#1a1816; border:none; border-radius:999px; padding:10px 16px; font-size:12px; font-weight:600; letter-spacing:0.04em; text-transform:uppercase; cursor:pointer; box-shadow:0 10px 24px rgba(0,0,0,0.25); }",
			".trainer-overlay { position:fixed; inset:0; z-index:10001; display:none; }",
			".trainer-overlay.is-open { display:block; }",
			".trainer-overlay-backdrop { position:absolute; inset:0; background:rgba(12,10,8,0.72); }",
			".trainer-overlay-panel { position:relative; width:min(1100px, calc(100vw - 32px)); height:min(860px, calc(100vh - 32px)); margin:16px auto; background:#1a1816; border:1px solid rgba(237,232,225,0.08); border-radius:14px; overflow:auto; box-shadow:0 28px 80px rgba(0,0,0,0.45); }",
			".trainer-overlay-close { position:absolute; top:14px; right:14px; z-index:2; background:rgba(237,232,225,0.08); color:#ede8e1; border:1px solid rgba(237,232,225,0.12); border-radius:999px; width:36px; height:36px; cursor:pointer; }",
			".trainer-shell-body { padding-top:24px; }",
			".trainer-setup-placeholder { max-width:760px; margin:64px auto; padding:32px; background:#272320; border:1px solid rgba(237,232,225,0.08); border-radius:10px; color:#ede8e1; }",
			".trainer-setup-placeholder h2 { margin:0 0 12px; font-size:32px; font-family:Georgia, serif; }",
			".trainer-setup-placeholder p { color:#9b9388; margin:0 0 12px; }",
			".trainer-setup-placeholder .trainer-setup-meta { font-family:'Courier New', monospace; font-size:12px; color:#e8a620; text-transform:uppercase; letter-spacing:0.08em; }",
			".trainer-setup-placeholder .trainer-setup-actions { display:flex; gap:12px; margin-top:20px; }",
			".trainer-setup-placeholder button { border:none; border-radius:4px; padding:10px 16px; cursor:pointer; }",
			".trainer-setup-primary { background:#e8a620; color:#1a1816; }",
			".trainer-setup-ghost { background:#302b27; color:#ede8e1; }"
		].join("") + "</style>").appendTo("head");
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

	function _openOverlay() {
		if (_overlay) {
			_overlay.addClass("is-open");
		}
	}

	function hide() {
		var shell = _getShell();
		if (shell) {
			shell.hideAllSurfaces();
		}
		if (_overlay) {
			_overlay.removeClass("is-open");
		}
	}

	function showEntry(data) {
		var integration = _getIntegration();
		if (!integration) {
			return;
		}
		_openOverlay();
		integration.showSurface("entry", _renderEntry, data || null);
	}

	function showWeaknessSummary(data) {
		var integration = _getIntegration();
		if (!integration) {
			return;
		}
		_openOverlay();
		integration.showSurface("review", _renderWeaknessSummary, data || null);
	}

	function showSurface(name, data) {
		var integration = _getIntegration();
		if (!integration) {
			return;
		}
		_openOverlay();
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

	function bootstrap() {
		if (_bootstrapped || typeof $ === "undefined") {
			return;
		}
		_bootstrapped = true;
		_ensureStyles();

		$(function() {
			if (_overlay) {
				return;
			}

			_overlay = $('<div class="trainer-overlay"></div>');
			var backdrop = $('<div class="trainer-overlay-backdrop"></div>');
			var panel = $('<div class="trainer-overlay-panel"></div>');
			var closeBtn = $('<button class="trainer-overlay-close" aria-label="Close trainer">×</button>');
			_mount = $('<div id="trainer-root-overlay"></div>');
			panel.append(closeBtn).append(_mount);
			_overlay.append(backdrop).append(panel);
			$("body").append(_overlay);

			var launcher = $('<button class="trainer-launcher-btn">Trainer</button>');
			$("body").append(launcher);

			init(_mount);

			launcher.on("click", function() {
				showEntry();
			});
			backdrop.on("click", hide);
			closeBtn.on("click", hide);
		});
	}

	bootstrap();

	return {
		init: init,
		showEntry: showEntry,
		showWeaknessSummary: showWeaknessSummary,
		showSurface: showSurface,
		hide: hide,
		bootstrap: bootstrap
	};
});
