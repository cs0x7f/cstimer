"use strict";

var trainerIntegration = execMain(function() {

	var DEFAULT_SESSION_LENGTH = 20;
	var _activeSession = null;
	var _sessionResults = [];

	function _nowMs() {
		return Date.now();
	}

	function _nowISO() {
		return new Date().toISOString();
	}

	function _hashString(value) {
		var text = String(value || "");
		var hash = 0;
		for (var i = 0; i < text.length; i++) {
			hash = ((hash << 5) - hash + text.charCodeAt(i)) | 0;
		}
		return Math.abs(hash);
	}

	function _genId(prefix) {
		return prefix + "-" + _nowMs() + "-" + _hashString(prefix + "-" + _nowISO()).toString(36);
	}

	function _clone(value) {
		return JSON.parse(JSON.stringify(value));
	}

	function _toMs(value) {
		if (typeof value === "number" && isFinite(value)) {
			return value;
		}
		if (typeof value === "string") {
			var parsed = Date.parse(value);
			if (!isNaN(parsed)) {
				return parsed;
			}
		}
		return 0;
	}

	function _normalizeStat(stat) {
		var normalized = _clone(stat || {});
		normalized.caseId = normalized.caseId || "";
		normalized.attemptCount = normalized.attemptCount || 0;
		normalized.avgSolveTime = normalized.avgSolveTime || 0;
		normalized.avgRecognitionTime = normalized.avgRecognitionTime || 0;
		normalized.bestSolveTime = normalized.bestSolveTime || 0;
		normalized.worstSolveTime = normalized.worstSolveTime || 0;
		normalized.dnfRate = normalized.dnfRate || 0;
		normalized.skipCount = normalized.skipCount || 0;
		normalized.trend = normalized.trend || "stable";
		normalized.lastPracticedAt = _toMs(normalized.lastPracticedAt);
		return normalized;
	}

	function _normalizeStats(stats) {
		var normalized = [];
		for (var i = 0; i < stats.length; i++) {
			normalized.push(_normalizeStat(stats[i]));
		}
		return normalized;
	}

	function _statsMap(stats) {
		var map = {};
		for (var i = 0; i < stats.length; i++) {
			map[stats[i].caseId] = _clone(stats[i]);
		}
		return map;
	}

	function _catalogMap(catalog) {
		var map = {};
		for (var i = 0; i < catalog.length; i++) {
			map[catalog[i].caseId] = catalog[i];
		}
		return map;
	}

	function _buildSessionSeed(planId, startedAtMs) {
		return _hashString(String(planId || "") + ":" + String(startedAtMs));
	}

	function _getStorage() {
		return typeof trainerStorage !== "undefined" ? trainerStorage : null;
	}

	function _getPlanner() {
		return typeof trainerPlanner !== "undefined" ? trainerPlanner : null;
	}

	function _getShell() {
		return typeof trainerShell !== "undefined" ? trainerShell : null;
	}

	function loadProfile() {
		var storageApi = _getStorage();
		return storageApi ? storageApi.loadProfile() : Promise.resolve(null);
	}

	function saveProfile(profile) {
		var storageApi = _getStorage();
		if (!storageApi) {
			return Promise.resolve(false);
		}
		var nextProfile = _clone(profile || {});
		if (!nextProfile.userId) {
			nextProfile.userId = _genId("user");
		}
		if (!nextProfile.createdAt) {
			nextProfile.createdAt = _nowISO();
		}
		nextProfile.lastSessionAt = nextProfile.lastSessionAt || null;
		return storageApi.saveProfile(nextProfile);
	}

	function getOrCreateProfile() {
		return loadProfile().then(function(existingProfile) {
			if (existingProfile) {
				return existingProfile;
			}
			return saveProfile({
				userId: _genId("user"),
				preferredGoals: [],
				defaultSessionLength: DEFAULT_SESSION_LENGTH,
				createdAt: _nowISO(),
				lastSessionAt: null
			}).then(function() {
				return loadProfile();
			});
		});
	}

	function getActivePlanId() {
		var storageApi = _getStorage();
		return storageApi ? storageApi.loadActivePlanId() : Promise.resolve("");
	}

	function setActivePlanId(planId) {
		var storageApi = _getStorage();
		return storageApi ? storageApi.saveActivePlanId(planId) : Promise.resolve(false);
	}

	function getPlan(planId) {
		var storageApi = _getStorage();
		return storageApi ? storageApi.loadPlan(planId) : Promise.resolve(null);
	}

	function savePlan(plan) {
		var storageApi = _getStorage();
		if (!storageApi) {
			return Promise.resolve(false);
		}
		var nextPlan = _clone(plan || {});
		if (!nextPlan.planId) {
			nextPlan.planId = _genId("plan");
		}
		if (!nextPlan.createdAt) {
			nextPlan.createdAt = _nowISO();
		}
		return storageApi.savePlan(nextPlan).then(function() {
			return nextPlan;
		});
	}

	function getAllStats() {
		var storageApi = _getStorage();
		if (!storageApi) {
			return Promise.resolve([]);
		}
		return storageApi.loadStats().then(function(stats) {
			return _normalizeStats(stats || []);
		});
	}

	function saveAllStats(stats) {
		var storageApi = _getStorage();
		if (!storageApi) {
			return Promise.resolve(false);
		}
		return storageApi.saveStats(_normalizeStats(stats || []));
	}

	function loadSessions() {
		var storageApi = _getStorage();
		return storageApi ? storageApi.loadSessions() : Promise.resolve([]);
	}

	function getStatForCase(caseId) {
		return getAllStats().then(function(stats) {
			for (var i = 0; i < stats.length; i++) {
				if (stats[i].caseId === caseId) {
					return stats[i];
				}
			}
			return null;
		});
	}

	function updateStatForCase(caseId, attempt) {
		var safeAttempt = attempt || {};
		return getAllStats().then(function(stats) {
			var stat = null;
			for (var i = 0; i < stats.length; i++) {
				if (stats[i].caseId === caseId) {
					stat = stats[i];
					break;
				}
			}
			if (!stat) {
				stat = _normalizeStat({
					caseId: caseId,
					bestSolveTime: 0,
					worstSolveTime: 0
				});
				stats.push(stat);
			}

			var previousAttemptCount = stat.attemptCount;
			var dnfCount = Math.round(stat.dnfRate * previousAttemptCount);
			if (safeAttempt.dnf) {
				dnfCount += 1;
			}

			if (safeAttempt.skipped) {
				stat.skipCount += 1;
			} else {
				stat.attemptCount += 1;
				var solveTime = safeAttempt.solveTime || 0;
				stat.avgSolveTime = ((stat.avgSolveTime * previousAttemptCount) + solveTime) / stat.attemptCount;
				if (stat.bestSolveTime === 0 || solveTime < stat.bestSolveTime) {
					stat.bestSolveTime = solveTime;
				}
				if (solveTime > stat.worstSolveTime) {
					stat.worstSolveTime = solveTime;
				}
				if (safeAttempt.recognitionTime != null && safeAttempt.recognitionTime > 0) {
					var recognitionCount = previousAttemptCount;
					stat.avgRecognitionTime = ((stat.avgRecognitionTime * recognitionCount) + safeAttempt.recognitionTime) / Math.max(recognitionCount + 1, 1);
				}
			}

			stat.dnfRate = stat.attemptCount > 0 ? dnfCount / stat.attemptCount : 0;
			stat.lastPracticedAt = _nowMs();

			return saveAllStats(stats).then(function() {
				return _clone(stat);
			});
		});
	}

	function generateQueue(plan, stats, catalog, plannerContext) {
		var plannerApi = _getPlanner();
		return plannerApi ? plannerApi.generateQueue(plan, stats, catalog, plannerContext) : [];
	}

	function getCatalog() {
		return typeof caseCatalog !== "undefined" ? caseCatalog.getAllCases() : [];
	}

	function getCase(caseId) {
		return typeof caseCatalog !== "undefined" ? caseCatalog.getCase(caseId) : null;
	}

	function initShell(containerEl) {
		var shellApi = _getShell();
		if (!shellApi) {
			return null;
		}
		return shellApi.init(containerEl);
	}

	function showSurface(name, renderFn, data) {
		var shellApi = _getShell();
		return shellApi ? shellApi.showSurface(name, renderFn, data || null) : null;
	}

	function navigateToSurface(name, data) {
		var shellApi = _getShell();
		if (shellApi) {
			shellApi.navigateTo(name, { surfaceData: data || null });
		}
	}

	function getShellState() {
		var shellApi = _getShell();
		return shellApi ? shellApi.getState() : "idle";
	}

	function startSession(planId) {
		if (_activeSession) {
			return Promise.reject("session already active");
		}

		return Promise.all([
			getPlan(planId),
			getAllStats(),
			loadSessions(),
			Promise.resolve(getCatalog())
		]).then(function(results) {
			var plan = results[0];
			var stats = results[1];
			var priorSessions = results[2];
			var catalog = results[3];

			if (!plan) {
				return Promise.reject("plan not found: " + planId);
			}

			var startedAtMs = _nowMs();
			var queue = generateQueue(plan, stats, catalog, {
				evaluationTime: startedAtMs,
				queueSeed: _buildSessionSeed(planId, startedAtMs)
			});

			var previousDnfRate = null;
			if (priorSessions.length) {
				var lastSession = priorSessions[priorSessions.length - 1];
				var lastResults = lastSession.drillResults || [];
				var dnfCount = 0;
				for (var i = 0; i < lastResults.length; i++) {
					if (lastResults[i].isDnf) {
						dnfCount += 1;
					}
				}
				previousDnfRate = lastResults.length ? dnfCount / lastResults.length : 0;
			}

			_activeSession = {
				sessionId: _genId("session"),
				planId: planId,
				plan: plan,
				queue: queue,
				currentIndex: 0,
				startedAt: _nowISO(),
				baselineStatsMap: _statsMap(stats),
				previousDnfRate: previousDnfRate
			};
			_sessionResults = [];

			return {
				sessionId: _activeSession.sessionId,
				queue: queue,
				plan: plan
			};
		});
	}

	function getActiveSession() {
		return _activeSession ? _clone(_activeSession) : null;
	}

	function getCurrentQueueItem() {
		if (!_activeSession) {
			return null;
		}
		return _activeSession.currentIndex < _activeSession.queue.length ? _activeSession.queue[_activeSession.currentIndex] : null;
	}

	function advanceQueue() {
		if (!_activeSession) {
			return null;
		}
		_activeSession.currentIndex += 1;
		return getCurrentQueueItem();
	}

	function recordAttempt(attempt) {
		if (!_activeSession) {
			return Promise.reject("no active session");
		}
		var currentItem = getCurrentQueueItem();
		if (!currentItem) {
			return Promise.reject("no current queue item");
		}

		var result = {
			caseId: currentItem.caseRef,
			block: currentItem.block,
			solveTime: attempt && attempt.solveTime || 0,
			recognitionTime: attempt && attempt.recognitionTime != null ? attempt.recognitionTime : null,
			isDnf: !!(attempt && attempt.dnf),
			isSkipped: !!(attempt && attempt.skipped),
			timestamp: _nowISO()
		};

		_sessionResults.push(result);
		return updateStatForCase(currentItem.caseRef, {
			solveTime: result.solveTime,
			recognitionTime: result.recognitionTime,
			dnf: result.isDnf,
			skipped: result.isSkipped
		}).then(function() {
			return _clone(result);
		});
	}

	function endSession() {
		if (!_activeSession) {
			return Promise.reject("no active session");
		}

		var plannerApi = _getPlanner();
		var catalog = getCatalog();
		var catalogById = _catalogMap(catalog);
		var weakCaseIds = plannerApi ? plannerApi.tagWeakCases(_sessionResults, _activeSession.baselineStatsMap) : [];
		var strongCaseIds = plannerApi ? plannerApi.tagStrongCases(_sessionResults, _activeSession.baselineStatsMap) : [];
		var recommendation = plannerApi ? plannerApi.nextRecommendation(
			_sessionResults,
			weakCaseIds,
			strongCaseIds,
			catalog,
			{ previousDnfRate: _activeSession.previousDnfRate }
		) : "Continue with current plan";

		var weakCases = [];
		for (var i = 0; i < weakCaseIds.length; i++) {
			weakCases.push({
				caseId: weakCaseIds[i],
				category: catalogById[weakCaseIds[i]] ? catalogById[weakCaseIds[i]].category : ""
			});
		}

		var strongCases = [];
		for (var j = 0; j < strongCaseIds.length; j++) {
			strongCases.push({
				caseId: strongCaseIds[j],
				category: catalogById[strongCaseIds[j]] ? catalogById[strongCaseIds[j]].category : ""
			});
		}

		var sessionResult = {
			sessionId: _activeSession.sessionId,
			planId: _activeSession.planId,
			planName: _activeSession.plan && _activeSession.plan.name ? _activeSession.plan.name : "Training Session",
			goal: _activeSession.plan && _activeSession.plan.goal ? _activeSession.plan.goal : "last-layer",
			startedAt: _activeSession.startedAt,
			completedAt: _nowISO(),
			drillResults: _clone(_sessionResults),
			weakCases: weakCases,
			strongCases: strongCases,
			nextRecommendation: recommendation
		};

		var finishedSession = sessionResult;
		var storageApi = _getStorage();
		var savePromise = storageApi ? storageApi.saveSessionResult(sessionResult) : Promise.resolve(true);

		_activeSession = null;
		_sessionResults = [];

		return savePromise.then(function() {
			return finishedSession;
		});
	}

	function cancelSession() {
		_activeSession = null;
		_sessionResults = [];
	}

	function getSessionProgress() {
		if (!_activeSession) {
			return null;
		}
		var total = _activeSession.queue.length;
		var current = _activeSession.currentIndex;
		return {
			current: current,
			total: total,
			percent: total > 0 ? Math.round((current / total) * 100) : 0,
			results: _clone(_sessionResults)
		};
	}

	function buildReviewData(sessionResult) {
		var catalogById = _catalogMap(getCatalog());
		var results = [];
		var totalSolves = 0;
		var totalSolveTime = 0;
		var bestTime = 0;
		var worstTime = 0;
		var dnfCount = 0;
		var sub2Count = 0;

		for (var i = 0; i < sessionResult.drillResults.length; i++) {
			var result = sessionResult.drillResults[i];
			var caseRecord = catalogById[result.caseId] || {};
			var enriched = {
				caseId: result.caseId,
				caseName: caseRecord.name || result.caseId,
				category: caseRecord.category || "",
				solveTime: result.solveTime,
				isDnf: result.isDnf,
				isSkipped: result.isSkipped,
				block: result.block
			};
			results.push(enriched);

			if (enriched.isDnf) {
				dnfCount += 1;
			}
			if (!enriched.isSkipped && !enriched.isDnf) {
				totalSolves += 1;
				totalSolveTime += enriched.solveTime;
				if (bestTime === 0 || enriched.solveTime < bestTime) {
					bestTime = enriched.solveTime;
				}
				if (enriched.solveTime > worstTime) {
					worstTime = enriched.solveTime;
				}
				if (enriched.solveTime < 2000) {
					sub2Count += 1;
				}
			}
		}

		return {
			sessionId: sessionResult.sessionId,
			planId: sessionResult.planId,
			planName: sessionResult.planName || "Training Session",
			goal: sessionResult.goal || "last-layer",
			startedAt: sessionResult.startedAt,
			completedAt: sessionResult.completedAt,
			totalCases: sessionResult.drillResults.length,
			avgTime: totalSolves ? totalSolveTime / totalSolves : 0,
			bestTime: bestTime,
			worstTime: worstTime,
			sub2Rate: totalSolves ? Math.round((sub2Count / totalSolves) * 100) : 0,
			dnfCount: dnfCount,
			results: results,
			weakCases: sessionResult.weakCases,
			strongCases: sessionResult.strongCases,
			recommendation: sessionResult.nextRecommendation
		};
	}

	return {
		getProfile: loadProfile,
		saveProfile: saveProfile,
		getOrCreateProfile: getOrCreateProfile,
		getActivePlanId: getActivePlanId,
		setActivePlanId: setActivePlanId,
		getPlan: getPlan,
		savePlan: savePlan,
		getAllStats: getAllStats,
		saveAllStats: saveAllStats,
		loadSessions: loadSessions,
		getStatForCase: getStatForCase,
		updateStatForCase: updateStatForCase,
		generateQueue: generateQueue,
		getCatalog: getCatalog,
		getCase: getCase,
		initShell: initShell,
		showSurface: showSurface,
		navigateToSurface: navigateToSurface,
		getShellState: getShellState,
		startSession: startSession,
		getActiveSession: getActiveSession,
		getCurrentQueueItem: getCurrentQueueItem,
		advanceQueue: advanceQueue,
		recordAttempt: recordAttempt,
		endSession: endSession,
		cancelSession: cancelSession,
		getSessionProgress: getSessionProgress,
		buildReviewData: buildReviewData
	};
});
