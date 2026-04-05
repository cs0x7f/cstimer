"use strict";

var trainerActiveSession = execMain(function() {

	var _container = null;
	var _rendered = false;
	var _timerInterval = null;
	var _timerStartMs = null;
	var _timerElapsedMs = 0;
	var _timerRunning = false;
	var _sessionData = null;
	var _eventNamespace = ".trainerActiveSession";
	var _pllCaseIndexMap = {
		"PLL-H": 0,
		"PLL-Ua": 1,
		"PLL-Ub": 2,
		"PLL-Z": 3,
		"PLL-Aa": 4,
		"PLL-Ab": 5,
		"PLL-E": 6,
		"PLL-F": 7,
		"PLL-Ga": 8,
		"PLL-Gb": 9,
		"PLL-Gc": 10,
		"PLL-Gd": 11,
		"PLL-Ja": 12,
		"PLL-Jb": 13,
		"PLL-Na": 14,
		"PLL-Nb": 15,
		"PLL-Ra": 16,
		"PLL-Rb": 17,
		"PLL-T": 18,
		"PLL-V": 19,
		"PLL-Y": 20
	};
	var _crossDrillTypes = {
		"CROSS-WHITE": { label: "White Cross", prompt: "Solve the white cross", executionRequired: true },
		"CROSS-YELLOW": { label: "Yellow Cross", prompt: "Solve the yellow cross", executionRequired: true },
		"CROSS-CN": { label: "Color-Neutral Cross", prompt: "Solve cross on any color", executionRequired: true },
		"CROSS-PLAN": { label: "Cross Planning", prompt: "Plan the cross solution (no execution)", executionRequired: false },
		"CROSS-EXEC": { label: "Cross Execution", prompt: "Plan and execute the cross", executionRequired: true }
	};
	var _liveStats = {
		totalSolves: 0,
		totalSolveTime: 0,
		bestTime: 0,
		worstTime: 0,
		sub2Count: 0,
		dnfCount: 0,
		skipCount: 0
	};

	function _cssVar(name) {
		return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
	}

	function _formatTime(ms) {
		if (ms == null || ms < 0) return "0:00.00";
		var totalCs = Math.round(ms / 10);
		var cs = totalCs % 100;
		var totalSec = Math.floor(totalCs / 100);
		var sec = totalSec % 60;
		var min = Math.floor(totalSec / 60);
		return min + ":" + (sec < 10 ? "0" : "") + sec + "." + (cs < 10 ? "0" : "") + cs;
	}

	function _formatTimeShort(ms) {
		if (ms == null || ms <= 0) return "—";
		return (ms / 1000).toFixed(2) + "s";
	}

	function _getCaseInfo(caseId) {
		if (typeof trainerIntegration !== "undefined") {
			return trainerIntegration.getCase(caseId);
		}
		return null;
	}

	function _getAlgorithm(caseId) {
		var info = _getCaseInfo(caseId);
		if (info && info.algorithms && info.algorithms.length > 0) {
			return info.algorithms[0].notation;
		}
		return null;
	}

	function _getCaseFullName(caseId) {
		var info = _getCaseInfo(caseId);
		if (info) {
			var category = info.category || "";
			var name = info.name || caseId;
			if (category && name) {
				return category + " \u2014 " + name;
			}
			return name;
		}
		return caseId;
	}

	function _getScrambler() {
		return typeof scrMgr !== "undefined" && scrMgr.scramblers ? scrMgr.scramblers : null;
	}

	function _getCaseScrambleSpec(caseId) {
		var caseInfo = _getCaseInfo(caseId);
		if (!caseInfo) {
			return { type: "333", caseIndex: null };
		}

		if (caseInfo.category === "PLL" && _pllCaseIndexMap.hasOwnProperty(caseId)) {
			return { type: "pll", caseIndex: _pllCaseIndexMap[caseId] };
		}

		if (caseInfo.category === "OLL") {
			var ollMatch = /^OLL-(\d+)$/.exec(caseId || "");
			if (ollMatch) {
				return { type: "oll", caseIndex: Math.max(1, parseInt(ollMatch[1], 10)) };
			}
		}

		if (caseInfo.category === "cross") {
			return { type: "333", caseIndex: null, isCross: true };
		}

		return { type: "333", caseIndex: null };
	}

	function _getWeakCaseIds() {
		if (typeof trainerIntegration === "undefined") return [];
		var session = trainerIntegration.getActiveSession();
		if (!session || !session.baselineStatsMap) return [];
		var weakIds = [];
		var statsMap = session.baselineStatsMap;
		for (var key in statsMap) {
			if (statsMap.hasOwnProperty(key)) {
				var stat = statsMap[key];
				if (stat && stat.attemptCount > 0) {
					var confidence = Math.min(100, Math.round((stat.attemptCount / 20) * 100));
					if (confidence < 40) {
						weakIds.push(key);
					}
				}
			}
		}
		return weakIds;
	}

	function _isWeakCase(caseId) {
		return _getWeakCaseIds().indexOf(caseId) !== -1;
	}

	function _getSessionProgress() {
		if (typeof trainerIntegration !== "undefined") {
			return trainerIntegration.getSessionProgress();
		}
		return null;
	}

	function _getCurrentQueueItem() {
		if (typeof trainerIntegration !== "undefined") {
			return trainerIntegration.getCurrentQueueItem();
		}
		return null;
	}

	function _getActiveSession() {
		if (typeof trainerIntegration !== "undefined") {
			return trainerIntegration.getActiveSession();
		}
		return null;
	}

	function _getUpcomingQueueItems() {
		var session = _getActiveSession();
		if (!session || !session.queue) return [];
		var currentIndex = session.currentIndex;
		var upcoming = [];
		var maxShow = 6;
		for (var i = currentIndex + 1; i < session.queue.length && upcoming.length < maxShow; i++) {
			upcoming.push(session.queue[i]);
		}
		return upcoming;
	}

	function _getCompletedResults() {
		var progress = _getSessionProgress();
		if (!progress || !progress.results) return [];
		return progress.results;
	}

	function _resetLiveStats() {
		_liveStats = {
			totalSolves: 0,
			totalSolveTime: 0,
			bestTime: 0,
			worstTime: 0,
			sub2Count: 0,
			dnfCount: 0,
			skipCount: 0
		};
	}

	function _startTimer() {
		_timerStartMs = Date.now();
		_timerRunning = true;
		_timerInterval = setInterval(_updateTimerDisplay, 50);
	}

	function _stopTimer() {
		if (_timerStartMs != null) {
			_timerElapsedMs += Date.now() - _timerStartMs;
			_timerStartMs = null;
		}
		_timerRunning = false;
		if (_timerInterval) {
			clearInterval(_timerInterval);
			_timerInterval = null;
		}
	}

	function _resetTimer() {
		_stopTimer();
		_timerElapsedMs = 0;
		_updateTimerDisplay();
	}

	function _getElapsedMs() {
		var elapsed = _timerElapsedMs;
		if (_timerRunning && _timerStartMs != null) {
			elapsed += Date.now() - _timerStartMs;
		}
		return elapsed;
	}

	function _updateTimerDisplay() {
		var display = _container.find(".tas-timer-display");
		if (display.length) {
			display.text(_formatTime(_getElapsedMs()));
		}
	}

	function _buildStyles() {
		return [
			".trainer-active-session { max-width: 1000px; margin: 0 auto; padding: 0 0 24px; }",
			".tas-session-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 0; margin-bottom: 16px; }",
			".tas-session-info { display: flex; align-items: center; gap: 16px; }",
			".tas-session-name { font-family: var(--font-display, 'Instrument Serif', serif); font-size: 20px; }",
			".tas-session-controls { display: flex; align-items: center; gap: 12px; }",
			".tas-btn { font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 13px; letter-spacing: 0.03em; border: none; cursor: pointer; padding: 8px 14px; border-radius: 3px; transition: all 0.2s ease; display: inline-flex; align-items: center; justify-content: center; gap: 8px; }",
			".tas-btn:active { transform: scale(0.97); }",
			".tas-btn-primary { background: var(--saffron, #e8a620); color: var(--text-inverse, #1a1816); }",
			".tas-btn-primary:hover { background: var(--saffron-dim, #c48a18); box-shadow: 0 0 20px var(--saffron-glow, rgba(232,166,32,0.12)); }",
			".tas-btn-ghost { background: var(--surface, #272320); color: var(--text-secondary, #9b9388); border: 1px solid var(--border, rgba(237,232,225,0.08)); }",
			".tas-btn-ghost:hover { background: var(--surface-raised, #302b27); color: var(--text-primary, #ede8e1); }",
			".tas-btn-danger { background: transparent; color: var(--weak, #d4564e); border: 1px solid rgba(212,86,78,0.2); }",
			".tas-btn-danger:hover { background: rgba(212,86,78,0.1); }",
			".tas-tag { font-family: 'IBM Plex Mono', monospace; font-size: 10px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; padding: 3px 8px; border-radius: 3px; display: inline-flex; align-items: center; gap: 5px; }",
			".tas-tag-saffron { background: var(--saffron-glow, rgba(232,166,32,0.12)); color: var(--saffron, #e8a620); }",
			".tas-tag-weak { background: var(--weak-dim, rgba(212,86,78,0.15)); color: var(--weak, #d4564e); }",
			".tas-tag-good { background: var(--good-dim, rgba(107,186,98,0.15)); color: var(--good, #6bba62); }",
			".tas-status-dot { width: 6px; height: 6px; border-radius: 50%; display: inline-block; flex-shrink: 0; }",
			".tas-status-dot.good { background: var(--good, #6bba62); box-shadow: 0 0 6px var(--good, #6bba62); }",
			".tas-status-dot.weak { background: var(--weak, #d4564e); box-shadow: 0 0 6px var(--weak, #d4564e); }",
			".tas-status-dot.warn { background: var(--saffron, #e8a620); box-shadow: 0 0 6px var(--saffron, #e8a620); }",
			".tas-progress-bar-container { margin-bottom: 32px; }",
			".tas-progress-meta { display: flex; justify-content: space-between; margin-bottom: 8px; }",
			".tas-label { font-family: 'IBM Plex Mono', monospace; font-weight: 400; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-tertiary, #6b635a); }",
			".tas-data { font-family: 'IBM Plex Mono', monospace; font-weight: 400; font-variant-numeric: tabular-nums; }",
			".tas-progress-track { width: 100%; height: 4px; background: var(--border, rgba(237,232,225,0.08)); border-radius: 2px; overflow: hidden; }",
			".tas-progress-fill { height: 100%; border-radius: 2px; background: var(--saffron, #e8a620); }",
			".tas-main-layout { display: grid; grid-template-columns: 1fr 320px; gap: 24px; min-height: 500px; }",
			".tas-drill-area { display: flex; flex-direction: column; }",
			".tas-scramble-bar { background: var(--surface, #272320); border: 1px solid var(--border, rgba(237,232,225,0.08)); border-radius: 6px; padding: 16px 24px; margin-bottom: 24px; }",
			".tas-scramble-label { margin-bottom: 4px; }",
			".tas-scramble-text { font-family: 'IBM Plex Mono', monospace; font-size: 16px; color: var(--saffron, #e8a620); letter-spacing: 0.04em; word-spacing: 4px; }",
			".tas-active-case-card { flex: 1; display: flex; flex-direction: column; padding: 48px 32px; text-align: center; align-items: center; background: var(--surface, #272320); border: 1px solid var(--border, rgba(237,232,225,0.08)); border-radius: 6px; position: relative; overflow: hidden; }",
			".tas-active-case-card::before, .tas-active-case-card::after { content: ''; position: absolute; width: 8px; height: 8px; }",
			".tas-active-case-card::before { top: -1px; left: -1px; border-top: 1.5px solid var(--saffron, #e8a620); border-left: 1.5px solid var(--saffron, #e8a620); border-radius: 6px 0 0 0; }",
			".tas-active-case-card::after { bottom: -1px; right: -1px; border-bottom: 1.5px solid var(--saffron, #e8a620); border-right: 1.5px solid var(--saffron, #e8a620); border-radius: 0 0 6px 0; }",
			".tas-active-case-name { font-family: var(--font-display, 'Instrument Serif', serif); font-size: 52px; margin-bottom: 4px; }",
			".tas-active-case-fullname { color: var(--text-secondary, #9b9388); font-size: 14px; margin-bottom: 24px; }",
			".tas-active-case-visual { width: 180px; height: 180px; background: var(--bg-warm, #1f1c19); border: 1px solid var(--border, rgba(237,232,225,0.08)); border-radius: 6px; display: flex; align-items: center; justify-content: center; margin-bottom: 32px; position: relative; }",
			".tas-active-case-visual::before, .tas-active-case-visual::after { content: ''; position: absolute; background: rgba(232,166,32,0.06); }",
			".tas-active-case-visual::before { width: 1px; height: 100%; }",
			".tas-active-case-visual::after { width: 100%; height: 1px; }",
			".tas-timer-display { font-family: 'IBM Plex Mono', monospace; font-size: 72px; font-weight: 300; color: var(--text-primary, #ede8e1); letter-spacing: -0.02em; margin-bottom: 24px; line-height: 1; padding: 12px 20px; border-radius: 6px; }",
			".tas-algo-hint { background: var(--bg-warm, #1f1c19); border: 1px solid var(--border, rgba(237,232,225,0.08)); border-radius: 3px; padding: 12px 16px; margin-bottom: 24px; width: 100%; max-width: 500px; }",
			".tas-algo-text { font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: var(--text-secondary, #9b9388); letter-spacing: 0.03em; word-break: break-all; }",
			".tas-drill-actions { display: flex; gap: 12px; justify-content: center; margin-top: auto; }",
			".tas-sidebar { display: flex; flex-direction: column; gap: 24px; }",
			".tas-queue-panel { padding: 24px; flex: 1; background: var(--surface, #272320); border: 1px solid var(--border, rgba(237,232,225,0.08)); border-radius: 6px; position: relative; overflow: hidden; }",
			".tas-queue-panel::before, .tas-queue-panel::after { content: ''; position: absolute; width: 8px; height: 8px; }",
			".tas-queue-panel::before { top: -1px; left: -1px; border-top: 1.5px solid var(--saffron, #e8a620); border-left: 1.5px solid var(--saffron, #e8a620); border-radius: 6px 0 0 0; }",
			".tas-queue-panel::after { bottom: -1px; right: -1px; border-bottom: 1.5px solid var(--saffron, #e8a620); border-right: 1.5px solid var(--saffron, #e8a620); border-radius: 0 0 6px 0; }",
			".tas-queue-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }",
			".tas-queue-list { display: flex; flex-direction: column; gap: 8px; max-height: 340px; overflow-y: auto; }",
			".tas-queue-item { display: flex; align-items: center; gap: 12px; padding: 12px 16px; background: var(--bg-warm, #1f1c19); border: 1px solid var(--border, rgba(237,232,225,0.08)); border-radius: 3px; transition: all 0.2s; }",
			".tas-queue-item:hover { border-color: var(--border-accent, rgba(232,166,32,0.25)); }",
			".tas-queue-item.current { border-color: var(--saffron, #e8a620); background: var(--saffron-wash, rgba(232,166,32,0.06)); }",
			".tas-queue-item.completed { opacity: 0.4; }",
			".tas-queue-item-name { font-family: 'IBM Plex Mono', monospace; font-size: 12px; flex: 1; }",
			".tas-queue-item-time { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: var(--text-tertiary, #6b635a); }",
			".tas-queue-item-check { color: var(--good, #6bba62); font-size: 12px; }",
			".tas-session-stats { padding: 24px; background: var(--surface, #272320); border: 1px solid var(--border, rgba(237,232,225,0.08)); border-radius: 6px; position: relative; overflow: hidden; }",
			".tas-session-stats::before, .tas-session-stats::after { content: ''; position: absolute; width: 8px; height: 8px; }",
			".tas-session-stats::before { top: -1px; left: -1px; border-top: 1.5px solid var(--saffron, #e8a620); border-left: 1.5px solid var(--saffron, #e8a620); border-radius: 6px 0 0 0; }",
			".tas-session-stats::after { bottom: -1px; right: -1px; border-bottom: 1.5px solid var(--saffron, #e8a620); border-right: 1.5px solid var(--saffron, #e8a620); border-radius: 0 0 6px 0; }",
			".tas-stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }",
			".tas-mini-stat { background: var(--bg-warm, #1f1c19); border: 1px solid var(--border, rgba(237,232,225,0.08)); border-radius: 3px; padding: 12px; display: flex; flex-direction: column; gap: 2px; }",
			".tas-mini-stat-value { font-family: var(--font-display, 'Instrument Serif', serif); font-size: 22px; line-height: 1; }",
			".tas-mini-stat-label { font-family: 'IBM Plex Mono', monospace; font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-tertiary, #6b635a); }",
			".tas-divider { height: 1px; background: var(--border, rgba(237,232,225,0.08)); margin-top: 32px; }",
			".tas-footer { display: flex; justify-content: space-between; padding: 16px 0; }",
			"@media (max-width: 768px) {",
			"  .tas-main-layout { grid-template-columns: 1fr !important; }",
			"  .tas-timer-display { font-size: 52px !important; }",
			"  .tas-active-case-name { font-size: 36px !important; }",
			"  .tas-active-case-visual { width: 140px !important; height: 140px !important; }",
			"}"
		].join("");
	}

	function _injectStyles() {
		if ($("#trainer-active-session-styles").length === 0) {
			$("<style id='trainer-active-session-styles'>" + _buildStyles() + "</style>").appendTo("head");
		}
	}

	function _renderHeader(el, plan) {
		var header = $('<div class="tas-session-header">');
		var info = $('<div class="tas-session-info">');
		var planName = plan && plan.name ? plan.name : "Training Session";
		info.append($('<div class="tas-session-name">').html('<em>' + planName + '</em>'));
		var goal = plan && plan.goal ? plan.goal : "last-layer";
		if (goal === "cross") {
			info.append($('<span class="tas-tag tas-tag-saffron">').text("Cross"));
		} else {
			info.append($('<span class="tas-tag tas-tag-saffron">').text("Last Layer"));
		}
		header.append(info);

		var controls = $('<div class="tas-session-controls">');
		controls.append($('<button class="tas-btn tas-btn-ghost tas-pause-btn">').html('<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> Pause'));
		controls.append($('<button class="tas-btn tas-btn-danger tas-end-btn">').text("End Session"));
		header.append(controls);

		el.append(header);
	}

	function _renderProgressBar(el, progress, plan) {
		var container = $('<div class="tas-progress-bar-container">');
		var meta = $('<div class="tas-progress-meta">');
		var current = progress ? progress.current + 1 : 1;
		var total = progress ? progress.total : (plan && plan.totalAttempts ? plan.totalAttempts : 21);
		var percent = progress ? progress.percent : 0;
		var estRemaining = progress && progress.total > 0 ? Math.max(1, Math.round((progress.total - progress.current) * 0.7)) : "~10";
		meta.append($('<span class="tas-label">').text("Case " + current + " of " + total));
		meta.append($('<span class="tas-data" style="font-size: 11px; color: var(--text-secondary, #9b9388);">').text(percent + "% complete \u00B7 ~" + estRemaining + " min remaining"));
		container.append(meta);

		var track = $('<div class="tas-progress-track">');
		track.append($('<div class="tas-progress-fill" style="width: ' + percent + '%;">'));
		container.append(track);

		el.append(container);
	}

	function _renderScrambleBar(el, caseId) {
		var bar = $('<div class="tas-scramble-bar">');
		bar.append($('<div class="tas-label tas-scramble-label">').text("Scramble"));
		var scramble = _generateScramble(caseId);
		bar.append($('<div class="tas-scramble-text">').text(scramble));
		el.append(bar);
	}

	function _generateFallbackScramble() {
		var moves = ["R", "L", "U", "D", "F", "B"];
		var modifiers = ["", "'", "2"];
		var scramble = [];
		var lastMove = "";
		var secondLastMove = "";
		for (var i = 0; i < 20; i++) {
			var move;
			do {
				move = moves[Math.floor(Math.random() * moves.length)];
			} while (move === lastMove || (move === secondLastMove && _isOpposite(move, lastMove)));
			var mod = modifiers[Math.floor(Math.random() * modifiers.length)];
			scramble.push(move + mod);
			secondLastMove = lastMove;
			lastMove = move;
		}
		return scramble.join(" ");
	}

	function _generateScramble(caseId) {
		var scramblers = _getScrambler();
		var spec = _getCaseScrambleSpec(caseId);
		if (scramblers && scramblers[spec.type]) {
			try {
				if (spec.caseIndex != null) {
					return scramblers[spec.type](spec.type, 0, spec.caseIndex, 0);
				}
				return scramblers[spec.type](spec.type, 20, undefined, 0);
			} catch (err) {
				// Fall back to a generic 3x3 scramble if a case-specific generator fails.
			}
		}
		return _generateFallbackScramble();
	}

	function _isOpposite(a, b) {
		var opposites = { R: "L", L: "R", U: "D", D: "U", F: "B", B: "F" };
		return opposites[a] === b;
	}

	function _renderActiveCaseCard(el, caseId) {
		var card = $('<div class="tas-active-case-card">');
		var caseInfo = _getCaseInfo(caseId);
		var isWeak = _isWeakCase(caseId);
		var isCross = caseInfo && caseInfo.category === "cross";
		var crossType = isCross ? _crossDrillTypes[caseId] : null;

		var topRow = $('<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">');
		if (isCross && crossType) {
			topRow.append($('<span class="tas-tag tas-tag-saffron">').text(crossType.label));
		} else if (isWeak) {
			topRow.append($('<span class="tas-tag tas-tag-weak">').html('<span class="tas-status-dot weak"></span>Weak Case'));
		}
		card.append(topRow);

		var caseName = caseInfo ? caseInfo.name : caseId;
		var fullName = _getCaseFullName(caseId);
		card.append($('<div class="tas-active-case-name">').text(caseName));

		if (isCross && crossType) {
			card.append($('<div class="tas-active-case-fullname" style="color: var(--saffron, #e8a620);">').text(crossType.prompt));
		} else {
			card.append($('<div class="tas-active-case-fullname">').text(fullName));
		}

		var visual = $('<div class="tas-active-case-visual">');
		visual.append($('<div style="width: 64px; height: 64px; border: 2px solid var(--saffron, #e8a620); opacity: 0.25; transform: rotate(45deg);">'));
		card.append(visual);

		var timerDisplay = $('<div class="tas-timer-display">0:00.00</div>');
		card.append(timerDisplay);

		if (!isCross || !crossType || crossType.executionRequired) {
			var algo = _getAlgorithm(caseId);
			if (algo && algo !== "(scramble-generated)") {
				var algoHint = $('<div class="tas-algo-hint">');
				algoHint.append($('<div class="tas-label" style="margin-bottom: 4px;">').text("Algorithm"));
				algoHint.append($('<div class="tas-algo-text">').text(algo));
				card.append(algoHint);
			}
		}

		var actions = $('<div class="tas-drill-actions">');
		actions.append($('<button class="tas-btn tas-btn-ghost tas-rescramble-btn">').html('<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15"/></svg> Re-scramble'));
		if (isCross && crossType && !crossType.executionRequired) {
			actions.append($('<button class="tas-btn tas-btn-ghost tas-skip-btn">').text("Skip"));
			actions.append($('<button class="tas-btn tas-btn-primary tas-next-btn">').html('Planned, Next \u2192'));
		} else {
			actions.append($('<button class="tas-btn tas-btn-ghost tas-skip-btn">').text("Skip"));
			actions.append($('<button class="tas-btn tas-btn-primary tas-next-btn">').html('Next Case \u2192'));
		}
		card.append(actions);

		el.append(card);
	}

	function _getQueueDotClass(item, result) {
		if (result) {
			if (result.isDnf) return "weak";
			if (result.solveTime > 3000) return "warn";
			return "good";
		}
		if (_isWeakCase(item.caseRef)) return "weak";
		if (item.block === "focus") return "warn";
		return "good";
	}

	function _renderQueuePanel(el) {
		var panel = $('<div class="tas-queue-panel">');
		var header = $('<div class="tas-queue-header">');
		var session = _getActiveSession();
		var queue = session ? session.queue : [];
		var currentIndex = session ? session.currentIndex : 0;
		header.append($('<span class="tas-label" style="font-size: 11px; color: var(--text-secondary, #9b9388);">').text("Queue"));
		header.append($('<span class="tas-label">').text((currentIndex + 1) + " / " + queue.length));
		panel.append(header);

		var list = $('<div class="tas-queue-list">');
		var progress = _getSessionProgress();
		var results = progress ? progress.results : [];
		var resultsMap = {};
		for (var r = 0; r < results.length; r++) {
			resultsMap[results[r].caseId] = results[r];
		}

		for (var i = 0; i < queue.length; i++) {
			var item = queue[i];
			var caseInfo = _getCaseInfo(item.caseRef);
			var caseName = caseInfo ? caseInfo.name : item.caseRef;
			var result = resultsMap[item.caseRef];

			var row = $('<div class="tas-queue-item">');
			if (i < currentIndex) {
				row.addClass("completed");
				var dotClass = _getQueueDotClass(item, result);
				row.append($('<span class="tas-status-dot ' + dotClass + '">'));
				row.append($('<span class="tas-queue-item-name" style="text-decoration: line-through; opacity: 0.6;">').text(caseName));
				var timeStr = result ? _formatTimeShort(result.solveTime) : "\u2014";
				if (result && result.isDnf) timeStr = "DNF";
				row.append($('<span class="tas-queue-item-time">').text(timeStr));
				row.append($('<span class="tas-queue-item-check">').text("\u2713"));
			} else if (i === currentIndex) {
				row.addClass("current");
				var currentDotClass = _getQueueDotClass(item, null);
				row.append($('<span class="tas-status-dot ' + currentDotClass + '">'));
				row.append($('<span class="tas-queue-item-name" style="color: var(--saffron, #e8a620); font-weight: 500;">').text(caseName));
				row.append($('<span class="tas-queue-item-time" style="color: var(--saffron, #e8a620);">').text("now"));
			} else {
				var opacity = Math.max(0.2, 0.7 - (i - currentIndex) * 0.1);
				row.css("opacity", opacity);
				var upcomingDotClass = _getQueueDotClass(item, null);
				row.append($('<span class="tas-status-dot ' + upcomingDotClass + '">'));
				row.append($('<span class="tas-queue-item-name">').text(caseName));
				row.append($('<span class="tas-queue-item-time">').text("\u2014"));
			}
			list.append(row);
		}

		panel.append(list);
		el.append(panel);
	}

	function _syncQueueScroll() {
		if (!_container || !_container.length) {
			return;
		}
		var list = _container.find(".tas-queue-list");
		var current = list.find(".tas-queue-item.current");
		if (!list.length || !current.length) {
			return;
		}

		var listEl = list.get(0);
		var currentEl = current.get(0);
		var padding = 24;
		var currentTop = currentEl.offsetTop;
		var currentBottom = currentTop + currentEl.offsetHeight;
		var viewportTop = listEl.scrollTop;
		var viewportBottom = viewportTop + listEl.clientHeight;

		if (currentTop >= viewportTop + padding && currentBottom <= viewportBottom - padding) {
			return;
		}

		var centeredTop = currentTop - Math.max(0, Math.round((listEl.clientHeight - currentEl.offsetHeight) / 2));
		listEl.scrollTop = Math.max(0, centeredTop);
	}

	function _renderSessionStats(el) {
		var stats = $('<div class="tas-session-stats">');
		stats.append($('<span class="tas-label" style="font-size: 11px; color: var(--text-secondary, #9b9388); display: block; margin-bottom: 16px;">').text("Live Stats"));

		var grid = $('<div class="tas-stats-grid">');
		var avgTime = _liveStats.totalSolves > 0 ? _liveStats.totalSolveTime / _liveStats.totalSolves : 0;
		var sub2Rate = _liveStats.totalSolves > 0 ? Math.round((_liveStats.sub2Count / _liveStats.totalSolves) * 100) : 0;

		var avgColor = "";
		if (avgTime > 0 && avgTime <= 2000) avgColor = "var(--good, #6bba62)";
		else if (avgTime > 3000) avgColor = "var(--weak, #d4564e)";

		var statsData = [
			{ value: avgTime > 0 ? _formatTimeShort(avgTime) : "\u2014", label: "Avg Time", color: avgColor },
			{ value: _liveStats.bestTime > 0 ? _formatTimeShort(_liveStats.bestTime) : "\u2014", label: "Best", color: "var(--good, #6bba62)" },
			{ value: _liveStats.worstTime > 0 ? _formatTimeShort(_liveStats.worstTime) : "\u2014", label: "Worst", color: "var(--weak, #d4564e)" },
			{ value: sub2Rate > 0 ? sub2Rate + "%" : "\u2014", label: "Sub-2s Rate", color: "" }
		];

		for (var s = 0; s < statsData.length; s++) {
			var stat = $('<div class="tas-mini-stat">');
			stat.append($('<span class="tas-mini-stat-value">').css("color", statsData[s].color).text(statsData[s].value));
			stat.append($('<span class="tas-mini-stat-label">').text(statsData[s].label));
			grid.append(stat);
		}

		stats.append(grid);
		el.append(stats);
	}

	function _updateLiveStats(solveTime, isDnf) {
		if (isDnf) {
			_liveStats.dnfCount += 1;
			return;
		}
		_liveStats.totalSolves += 1;
		_liveStats.totalSolveTime += solveTime;
		if (_liveStats.bestTime === 0 || solveTime < _liveStats.bestTime) {
			_liveStats.bestTime = solveTime;
		}
		if (solveTime > _liveStats.worstTime) {
			_liveStats.worstTime = solveTime;
		}
		if (solveTime < 2000) {
			_liveStats.sub2Count += 1;
		}
	}

	function _renderMainLayout(el, caseId, plan) {
		var layout = $('<div class="tas-main-layout">');

		var drillArea = $('<div class="tas-drill-area">');
		_renderScrambleBar(drillArea, caseId);
		_renderActiveCaseCard(drillArea, caseId);
		layout.append(drillArea);

		var sidebar = $('<div class="tas-sidebar">');
		_renderQueuePanel(sidebar);
		_renderSessionStats(sidebar);
		layout.append(sidebar);

		el.append(layout);
	}

	function _renderFooter(el) {
		var footer = $('<div class="tas-divider">');
		el.append(footer);
		var foot = $('<div class="tas-footer">');
		foot.append($('<span class="tas-label">').text("csTimer Trainer v2"));
		foot.append($('<span class="tas-label">').text("Active Session Queue"));
		el.append(foot);
	}

	function _unbindActions() {
		if (_container) {
			_container.off(_eventNamespace);
		}
		$(document).off(_eventNamespace);
	}

	function _bindActions() {
		_unbindActions();
		_container.on("click" + _eventNamespace, ".tas-next-btn", _handleNextCase);
		_container.on("click" + _eventNamespace, ".tas-skip-btn", _handleSkip);
		_container.on("click" + _eventNamespace, ".tas-rescramble-btn", _handleRescramble);
		_container.on("click" + _eventNamespace, ".tas-pause-btn", _handlePause);
		_container.on("click" + _eventNamespace, ".tas-end-btn", _handleEndSession);
		$(document).on("keydown" + _eventNamespace, _handleKeyboard);
	}

	function _handleKeyboard(e) {
		if (!_rendered || !_container || !_container.length || !_container.is(":visible")) {
			return;
		}
		var target = $(e.target);
		if (target.closest("input, textarea, select, button, [contenteditable='true']").length) {
			return;
		}
		if (e.key === " " || e.code === "Space") {
			if (e.repeat) {
				e.preventDefault();
				return;
			}
			e.preventDefault();
			if (_timerRunning) {
				_handleNextCase();
			} else {
				_startTimer();
			}
		}
		if (e.key === "Escape") {
			_handleEndSession();
		}
	}

	function _handleNextCase() {
		var solveTime = _getElapsedMs();
		var currentItem = _getCurrentQueueItem();
		if (!currentItem) return;

		_stopTimer();

		if (typeof trainerIntegration !== "undefined") {
			trainerIntegration.recordAttempt({
				solveTime: solveTime,
				dnf: false,
				skipped: false
			}).then(function() {
				_updateLiveStats(solveTime, false);
				_advanceToNextCase();
			}).catch(function() {
				_advanceToNextCase();
			});
		} else {
			_advanceToNextCase();
		}
	}

	function _handleSkip() {
		_stopTimer();
		_liveStats.skipCount += 1;

		var currentItem = _getCurrentQueueItem();
		if (currentItem && typeof trainerIntegration !== "undefined") {
			trainerIntegration.recordAttempt({
				solveTime: 0,
				dnf: false,
				skipped: true
			}).then(function() {
				_advanceToNextCase();
			}).catch(function() {
				_advanceToNextCase();
			});
		} else {
			_advanceToNextCase();
		}
	}

	function _handleRescramble() {
		var currentItem = _getCurrentQueueItem();
		var scrambleBar = _container.find(".tas-scramble-text");
		if (scrambleBar.length && currentItem) {
			scrambleBar.text(_generateScramble(currentItem.caseRef));
		}
	}

	function _handlePause() {
		var btn = _container.find(".tas-pause-btn");
		if (_timerRunning) {
			_stopTimer();
			btn.html('<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg> Resume');
		} else {
			_startTimer();
			btn.html('<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> Pause');
		}
	}

	function _handleEndSession() {
		_stopTimer();
		if (typeof trainerIntegration !== "undefined") {
			trainerIntegration.endSession().then(function(result) {
				if (typeof trainerInit !== "undefined") {
					trainerInit.showSurface("review", { sessionResult: result });
				}
			}).catch(function() {
				if (typeof trainerInit !== "undefined") {
					trainerInit.showEntry();
				}
			});
		}
	}

	function _advanceToNextCase() {
		if (typeof trainerIntegration !== "undefined") {
			var nextItem = trainerIntegration.advanceQueue();
			if (!nextItem) {
				trainerIntegration.endSession().then(function(result) {
					if (typeof trainerInit !== "undefined") {
						trainerInit.showSurface("review", { sessionResult: result });
					}
				}).catch(function() {
					if (typeof trainerInit !== "undefined") {
						trainerInit.showEntry();
					}
				});
				return;
			}
		}

		_resetTimer();
		_refreshCurrentCase();
	}

	function _refreshCurrentCase() {
		var currentItem = _getCurrentQueueItem();
		var session = _getActiveSession();
		if (!currentItem || !session) return;

		var plan = session.plan;
		var progress = _getSessionProgress();

		_container.empty();
		_renderHeader(_container, plan);
		_renderProgressBar(_container, progress, plan);
		_renderMainLayout(_container, currentItem.caseRef, plan);
		_renderFooter(_container);
		_bindActions();
		if (window.requestAnimationFrame) {
			window.requestAnimationFrame(_syncQueueScroll);
		} else {
			_syncQueueScroll();
		}
	}

	function _startSessionWithPlan(planId) {
		if (typeof trainerIntegration === "undefined") return;

		var existingSession = _getActiveSession();
		if (existingSession && existingSession.planId === planId) {
			_sessionData = {
				sessionId: existingSession.sessionId,
				queue: existingSession.queue,
				plan: existingSession.plan
			};
			_resetLiveStats();
			_refreshCurrentCase();
			return;
		}

		trainerIntegration.startSession(planId).then(function(sessionData) {
			_sessionData = sessionData;
			_resetLiveStats();
			_refreshCurrentCase();
		}).catch(function(err) {
			_container.text("Failed to start session: " + err);
		});
	}

	function render(el, data) {
		_injectStyles();
		_container = $(el);
		_container.empty().addClass("trainer-active-session");

		var planId = data && data.planId ? data.planId : null;
		if (!planId) {
			_container.text("No active session. Please configure a training plan first.");
			return null;
		}

		_container.html('<div style="display:flex;align-items:center;justify-content:center;height:200px;color:var(--text-secondary,#9b9388);">Starting session...</div>');

		_startSessionWithPlan(planId);

		_rendered = true;

		return function() {
			_stopTimer();
			_unbindActions();
		};
	}

	function destroy() {
		_stopTimer();
		if (_container) {
			_unbindActions();
			_container.empty().removeClass("trainer-active-session");
			_container = null;
		}
		_rendered = false;
		_sessionData = null;
	}

	return {
		render: render,
		destroy: destroy
	};
});
