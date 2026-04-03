"use strict";

var trainerInit = execMain(function() {

	var _initialized = false;

	function _getShell() {
		return typeof trainerShell !== "undefined" ? trainerShell : null;
	}

	function _getIntegration() {
		return typeof trainerIntegration !== "undefined" ? trainerIntegration : null;
	}

	function _renderEntry(el, data) {
		if (typeof trainerEntryHome !== "undefined") {
			trainerEntryHome.render(el, data);
			return function() {
				trainerEntryHome.destroy();
			};
		}
		el.text("Trainer entry home not available.");
		return null;
	}

	function _renderWeaknessSummary(el, data) {
		if (typeof weaknessSummary !== "undefined") {
			weaknessSummary.render(el, data);
			return function() {
				weaknessSummary.destroy();
			};
		}
		el.text("Weakness summary not available.");
		return null;
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

		shell.registerMount("entry", shell.getMountPoint("entry"), {
			onUnmount: null
		});

		shell.registerMount("review", shell.getMountPoint("review"), {
			onUnmount: null
		});

		_initialized = true;
	}

	function showEntry(data) {
		var integration = _getIntegration();
		if (integration) {
			integration.showSurface("entry", _renderEntry, data);
		}
	}

	function showWeaknessSummary(data) {
		var integration = _getIntegration();
		if (integration) {
			integration.showSurface("review", _renderWeaknessSummary, data);
		}
	}

	function showSurface(name, data) {
		if (name === "entry") {
			showEntry(data);
		} else if (name === "review" || name === "weakness") {
			showWeaknessSummary(data);
		} else {
			var integration = _getIntegration();
			if (integration) {
				integration.showSurface(name, null, data);
			}
		}
	}

	return {
		init: init,
		showEntry: showEntry,
		showWeaknessSummary: showWeaknessSummary,
		showSurface: showSurface
	};
});
