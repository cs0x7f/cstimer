"use strict";

var trainerShell = execMain(function() {

	var STATE = {
		IDLE: "idle",
		ENTRY: "entry",
		SETUP: "setup",
		ACTIVE: "active",
		REVIEW: "review"
	};

	var SURFACE_ORDER = ["entry", "setup", "active", "review"];

	var _state = STATE.IDLE;
	var _container = null;
	var _shellRoot = null;
	var _shellHeader = null;
	var _shellBody = null;
	var _mountPoints = {};
	var _currentSurface = null;
	var _listeners = {};

	function _log(message) {
		DEBUG && console.log("[trainer-shell]", message);
	}

	function _fire(eventName, payload) {
		var handlers = _listeners[eventName] || [];
		for (var i = 0; i < handlers.length; i++) {
			handlers[i](payload);
		}
	}

	function _setState(nextState) {
		var previousState = _state;
		_state = nextState;
		if (_shellRoot) {
			_shellRoot.attr("data-trainer-state", nextState);
		}
		_fire("stateChange", { from: previousState, to: nextState });
	}

	function _createMountPoint(name) {
		return {
			name: name,
			el: $('<div class="trainer-surface trainer-surface-' + name + '" data-trainer-surface="' + name + '"></div>'),
			onUnmount: null
		};
	}

	function _clearMount(name) {
		var mountPoint = _mountPoints[name];
		if (!mountPoint) {
			return;
		}
		if (mountPoint.onUnmount) {
			mountPoint.onUnmount();
			mountPoint.onUnmount = null;
		}
		mountPoint.el.empty();
		mountPoint.el.hide();
	}

	function _hideInactiveSurfaces(activeName) {
		for (var i = 0; i < SURFACE_ORDER.length; i++) {
			var name = SURFACE_ORDER[i];
			if (name === activeName) {
				continue;
			}
			var mountPoint = _mountPoints[name];
			if (mountPoint) {
				mountPoint.el.hide();
			}
		}
	}

	function _ensureShellRoot() {
		if (_shellRoot) {
			return _shellRoot;
		}

		_shellRoot = $('<div class="trainer-shell" data-trainer-state="' + _state + '"></div>');
		_shellHeader = $('<div class="trainer-shell-header"></div>');
		_shellBody = $('<div class="trainer-shell-body"></div>');
		_shellRoot.append(_shellHeader).append(_shellBody);

		for (var i = 0; i < SURFACE_ORDER.length; i++) {
			var name = SURFACE_ORDER[i];
			_mountPoints[name] = _createMountPoint(name);
			_mountPoints[name].el.hide();
			_shellBody.append(_mountPoints[name].el);
		}

		if (_container && _shellRoot.parent().length === 0) {
			_container.append(_shellRoot);
		}

		return _shellRoot;
	}

	function init(containerEl) {
		if (_container) {
			return _shellRoot;
		}
		_container = $(containerEl);
		_ensureShellRoot();
		_setState(STATE.IDLE);
		_log("initialized");
		return _shellRoot;
	}

	function getMountPoint(name) {
		var mountPoint = _mountPoints[name];
		return mountPoint ? mountPoint.el : null;
	}

	function registerMount(name, el, options) {
		options = options || {};
		_ensureShellRoot();
		if (!_mountPoints[name]) {
			_mountPoints[name] = {
				name: name,
				el: $(el),
				onUnmount: options.onUnmount || null
			};
			_shellBody.append(_mountPoints[name].el);
		} else {
			_mountPoints[name].el = $(el);
			_mountPoints[name].onUnmount = options.onUnmount || null;
		}
		_mountPoints[name].el.attr("data-trainer-surface", name).hide();
		if (SURFACE_ORDER.indexOf(name) === -1) {
			SURFACE_ORDER.push(name);
		}
		return _mountPoints[name].el;
	}

	function setHeader(content) {
		_ensureShellRoot();
		_shellHeader.empty();
		if (content != null) {
			_shellHeader.append(content);
		}
	}

	function showSurface(name, renderFn, surfaceData) {
		_ensureShellRoot();
		var mountPoint = _mountPoints[name];
		if (!mountPoint) {
			return null;
		}

		if (_currentSurface && _currentSurface !== name) {
			_clearMount(_currentSurface);
		}

		_hideInactiveSurfaces(name);
		mountPoint.el.empty().show();
		mountPoint.onUnmount = null;
		_currentSurface = name;

		if (renderFn) {
			var maybeUnmount = renderFn(mountPoint.el, surfaceData || null);
			if (typeof maybeUnmount === "function") {
				mountPoint.onUnmount = maybeUnmount;
			}
		}

		_setState(STATE[name.toUpperCase()] || STATE.IDLE);
		_fire("surfaceChange", { surface: name, data: surfaceData || null });
		return mountPoint.el;
	}

	function hideSurface(name) {
		var surfaceName = name || _currentSurface;
		if (!surfaceName) {
			return;
		}
		_clearMount(surfaceName);
		if (_currentSurface === surfaceName) {
			_currentSurface = null;
			_setState(STATE.IDLE);
		}
	}

	function hideAllSurfaces() {
		for (var i = 0; i < SURFACE_ORDER.length; i++) {
			_clearMount(SURFACE_ORDER[i]);
		}
		_currentSurface = null;
		_setState(STATE.IDLE);
	}

	function getState() {
		return _state;
	}

	function is(stateName) {
		return _state === STATE[String(stateName || "").toUpperCase()];
	}

	function on(eventName, handler) {
		if (!_listeners[eventName]) {
			_listeners[eventName] = [];
		}
		_listeners[eventName].push(handler);
		return function() {
			var index = _listeners[eventName].indexOf(handler);
			if (index !== -1) {
				_listeners[eventName].splice(index, 1);
			}
		};
	}

	function navigateTo(stateName, data) {
		var nextState = stateName || STATE.IDLE;
		if (nextState === STATE.IDLE) {
			hideAllSurfaces();
			return;
		}
		showSurface(nextState, null, data && data.surfaceData ? data.surfaceData : null);
	}

	function getContainer() {
		return _container;
	}

	function getShellRoot() {
		return _shellRoot;
	}

	return {
		STATE: STATE,
		init: init,
		getMountPoint: getMountPoint,
		registerMount: registerMount,
		setHeader: setHeader,
		showSurface: showSurface,
		hideSurface: hideSurface,
		hideAllSurfaces: hideAllSurfaces,
		getState: getState,
		is: is,
		on: on,
		navigateTo: navigateTo,
		getContainer: getContainer,
		getShellRoot: getShellRoot
	};
});
