"use strict";

var trainerPlanner = execMain(function() {

	var DEFAULT_QUEUE_SEED = 42;
	var DEFAULT_EVALUATION_TIME = 0;
	var RECENCY_DECAY_DAYS = 7;
	var MAX_CONSECUTIVE_REPEATS = 3;
	var PER_SESSION_CAP_PCT = 0.30;

	var WEIGHTS_BY_MODE = {
		"standard": { w1: 0.30, w2: 0.15, w3: 0.20, w4: 0.15, w5: 0.10, w6: 0.10 },
		"speed": { w1: 0.40, w2: 0.20, w3: 0.15, w4: 0.10, w5: 0.05, w6: 0.10 },
		"accuracy": { w1: 0.20, w2: 0.20, w3: 0.15, w4: 0.25, w5: 0.10, w6: 0.10 }
	};

	function _clamp(value, minimum, maximum) {
		return Math.max(minimum, Math.min(maximum, value));
	}

	function _median(values) {
		if (!values.length) {
			return null;
		}
		var sorted = values.slice().sort(function(a, b) {
			return a - b;
		});
		var middle = Math.floor(sorted.length / 2);
		if (sorted.length % 2) {
			return sorted[middle];
		}
		return (sorted[middle - 1] + sorted[middle]) / 2;
	}

	function _normalizeSeed(seed) {
		if (typeof seed === "number" && isFinite(seed)) {
			return seed | 0;
		}
		var text = String(seed == null ? DEFAULT_QUEUE_SEED : seed);
		var hash = 0;
		for (var i = 0; i < text.length; i++) {
			hash = ((hash << 5) - hash + text.charCodeAt(i)) | 0;
		}
		return hash;
	}

	function _mulberry32(seed) {
		return function() {
			seed |= 0;
			seed = seed + 0x6D2B79F5 | 0;
			var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
			t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
			return ((t ^ t >>> 14) >>> 0) / 4294967296;
		};
	}

	function _shuffle(items, seed) {
		var random = _mulberry32(_normalizeSeed(seed));
		var shuffled = items.slice();
		for (var i = shuffled.length - 1; i > 0; i--) {
			var index = Math.floor(random() * (i + 1));
			var current = shuffled[i];
			shuffled[i] = shuffled[index];
			shuffled[index] = current;
		}
		return shuffled;
	}

	function _sortCaseIds(caseIds) {
		return caseIds.slice().sort(function(a, b) {
			return a < b ? -1 : (a > b ? 1 : 0);
		});
	}

	function _buildStatsMap(stats) {
		var map = {};
		for (var i = 0; i < stats.length; i++) {
			if (stats[i] && stats[i].caseId) {
				map[stats[i].caseId] = stats[i];
			}
		}
		return map;
	}

	function _buildCategoryBuckets(catalog) {
		var buckets = { PLL: [], OLL: [], cross: [] };
		for (var i = 0; i < catalog.length; i++) {
			var record = catalog[i];
			if (record && buckets[record.category]) {
				buckets[record.category].push(record);
			}
		}
		return buckets;
	}

	function _getCategoryMedian(categoryCases, statsMap, metric) {
		var values = [];
		for (var i = 0; i < categoryCases.length; i++) {
			var stat = statsMap[categoryCases[i].caseId];
			if (stat && stat[metric] != null && stat[metric] > 0) {
				values.push(stat[metric]);
			}
		}
		return _median(values);
	}

	function _solveTimeScore(caseStat, categoryMedian) {
		if (categoryMedian == null || categoryMedian <= 0) {
			return 0.5;
		}
		var average = caseStat && caseStat.avgSolveTime != null ? caseStat.avgSolveTime : categoryMedian;
		return _clamp((average - categoryMedian) / categoryMedian, 0, 1);
	}

	function _recognitionScore(caseStat, categoryMedian) {
		if (categoryMedian == null || categoryMedian <= 0) {
			return 0.5;
		}
		var average = caseStat && caseStat.avgRecognitionTime != null ? caseStat.avgRecognitionTime : categoryMedian;
		return _clamp((average - categoryMedian) / categoryMedian, 0, 1);
	}

	function _recencyScore(caseStat, evaluationTime, attemptCount) {
		if (attemptCount === 0) {
			return 1.0;
		}
		if (!caseStat || !caseStat.lastPracticedAt) {
			return 0.5;
		}
		var daysSince = (evaluationTime - caseStat.lastPracticedAt) / (1000 * 60 * 60 * 24);
		return _clamp(daysSince / RECENCY_DECAY_DAYS, 0, 1);
	}

	function _failureScore(caseStat) {
		var dnfRate = caseStat && caseStat.dnfRate != null ? caseStat.dnfRate : 0;
		return _clamp(dnfRate * 2, 0, 1);
	}

	function _skipScore(caseStat) {
		var skipCount = caseStat && caseStat.skipCount != null ? caseStat.skipCount : 0;
		var attemptCount = caseStat && caseStat.attemptCount != null ? caseStat.attemptCount : 0;
		return _clamp(skipCount / Math.max(attemptCount, 1), 0, 1);
	}

	function _trendScore(caseStat) {
		var trend = caseStat && caseStat.trend ? caseStat.trend : "stable";
		if (trend === "declining") {
			return 1.0;
		}
		if (trend === "improving") {
			return 0.0;
		}
		return 0.5;
	}

	function _coldStartScore(categoryCases) {
		var tiers = [];
		for (var i = 0; i < categoryCases.length; i++) {
			tiers.push(categoryCases[i].difficultyTier || 1);
		}
		var medianTier = _median(tiers);
		if (medianTier == null) {
			medianTier = 3;
		}
		return _clamp((medianTier - 1) / 4, 0, 1);
	}

	function _computeWeaknessScore(caseRecord, caseStat, categoryCases, statsMap, evaluationTime, weights) {
		var attemptCount = caseStat && caseStat.attemptCount != null ? caseStat.attemptCount : 0;
		if (attemptCount === 0) {
			return _coldStartScore(categoryCases);
		}

		var categoryMedianSolve = _getCategoryMedian(categoryCases, statsMap, "avgSolveTime");
		var categoryMedianRecognition = _getCategoryMedian(categoryCases, statsMap, "avgRecognitionTime");
		var activeWeights = weights || WEIGHTS_BY_MODE.standard;

		var rawScore = activeWeights.w1 * _solveTimeScore(caseStat, categoryMedianSolve)
			+ activeWeights.w2 * _recognitionScore(caseStat, categoryMedianRecognition)
			+ activeWeights.w3 * _recencyScore(caseStat, evaluationTime, attemptCount)
			+ activeWeights.w4 * _failureScore(caseStat)
			+ activeWeights.w5 * _skipScore(caseStat)
			+ activeWeights.w6 * _trendScore(caseStat);

		return _clamp(rawScore, 0, 1);
	}

	function _effectiveWeight(weaknessScore, weakCaseBias) {
		return weaknessScore * weakCaseBias + (1 - weakCaseBias) * 0.5;
	}

	function _resolveFocusSettings(plan, goal) {
		var settings = {};
		var source = plan && plan.focusSettings ? plan.focusSettings : {};
		for (var key in source) {
			if (source.hasOwnProperty(key)) {
				settings[key] = source[key];
			}
		}
		if (settings.weakCaseBias == null) {
			settings.weakCaseBias = goal === "returning" ? 0.5 : 1.0;
		}
		if (settings.coverageFloor == null) {
			settings.coverageFloor = goal === "returning" ? 0.30 : 0.20;
		}
		if (!settings.sessionMode) {
			settings.sessionMode = "standard";
		}
		return settings;
	}

	function _blockSizes(goal, totalAttempts) {
		if (goal === "cross") {
			var crossFocus = Math.max(Math.round(totalAttempts * 0.70), 0);
			crossFocus = Math.min(crossFocus, totalAttempts);
			return {
				warmup: 0,
				focus: crossFocus,
				integration: totalAttempts - crossFocus,
				review: 0
			};
		}

		var warmupRatio = goal === "returning" ? 0.20 : 0.15;
		var focusRatio = goal === "returning" ? 0.50 : 0.55;

		var warmup = Math.min(Math.max(Math.round(totalAttempts * warmupRatio), 0), totalAttempts);
		var focus = Math.min(Math.max(Math.round(totalAttempts * focusRatio), 0), totalAttempts - warmup);

		return {
			warmup: warmup,
			focus: focus,
			integration: totalAttempts - warmup - focus,
			review: 0
		};
	}

	function _collectActiveCaseIds(plan) {
		var activeCaseIds = {};
		var drillBlocks = plan && plan.drillBlocks ? plan.drillBlocks : [];
		for (var i = 0; i < drillBlocks.length; i++) {
			var block = drillBlocks[i];
			if (block && block.caseIds) {
				for (var j = 0; j < block.caseIds.length; j++) {
					activeCaseIds[block.caseIds[j]] = true;
				}
			}
		}
		return activeCaseIds;
	}

	function _matchesGoal(goal, record) {
		if (goal === "cross") {
			return record.category === "cross";
		}
		if (goal === "returning") {
			return record.category === "OLL";
		}
		return record.category === "PLL" || record.category === "OLL";
	}

	function _resolveActiveCases(plan, catalog) {
		var goal = plan && plan.goal ? plan.goal : "last-layer";
		var explicitCaseIds = _collectActiveCaseIds(plan);
		var hasExplicitCaseIds = Object.keys(explicitCaseIds).length > 0;
		var activeCases = [];

		for (var i = 0; i < catalog.length; i++) {
			var record = catalog[i];
			if (!record || record.caseId === "OLL-20") {
				continue;
			}
			if (hasExplicitCaseIds) {
				if (explicitCaseIds[record.caseId]) {
					activeCases.push(record);
				}
				continue;
			}
			if (_matchesGoal(goal, record)) {
				activeCases.push(record);
			}
		}

		activeCases.sort(function(a, b) {
			return a.caseId < b.caseId ? -1 : (a.caseId > b.caseId ? 1 : 0);
		});
		return activeCases;
	}

	function _buildScoredEntries(activeCases, categoryBuckets, statsMap, evaluationTime, weakCaseBias, weights) {
		var entries = [];
		var map = {};

		for (var i = 0; i < activeCases.length; i++) {
			var record = activeCases[i];
			var categoryCases = categoryBuckets[record.category] || [record];
			var weaknessScore = _computeWeaknessScore(record, statsMap[record.caseId], categoryCases, statsMap, evaluationTime, weights);
			var entry = {
				caseId: record.caseId,
				caseRecord: record,
				weaknessScore: weaknessScore,
				effectiveWeight: _effectiveWeight(weaknessScore, weakCaseBias)
			};
			entries.push(entry);
			map[record.caseId] = entry;
		}

		entries.sort(function(a, b) {
			if (b.effectiveWeight !== a.effectiveWeight) {
				return b.effectiveWeight - a.effectiveWeight;
			}
			if (b.weaknessScore !== a.weaknessScore) {
				return b.weaknessScore - a.weaknessScore;
			}
			if ((a.caseRecord.difficultyTier || 0) !== (b.caseRecord.difficultyTier || 0)) {
				return (a.caseRecord.difficultyTier || 0) - (b.caseRecord.difficultyTier || 0);
			}
			return a.caseId < b.caseId ? -1 : (a.caseId > b.caseId ? 1 : 0);
		});

		return { entries: entries, map: map };
	}

	function _buildWarmupCandidates(scoredEntries) {
		var candidates = [];
		for (var i = 0; i < scoredEntries.length; i++) {
			if ((scoredEntries[i].caseRecord.difficultyTier || 0) <= 2) {
				candidates.push(scoredEntries[i]);
			}
		}
		if (!candidates.length) {
			candidates = scoredEntries.slice();
		}
		candidates.sort(function(a, b) {
			if ((a.caseRecord.difficultyTier || 0) !== (b.caseRecord.difficultyTier || 0)) {
				return (a.caseRecord.difficultyTier || 0) - (b.caseRecord.difficultyTier || 0);
			}
			if (a.weaknessScore !== b.weaknessScore) {
				return a.weaknessScore - b.weaknessScore;
			}
			return a.caseId < b.caseId ? -1 : (a.caseId > b.caseId ? 1 : 0);
		});
		var caseIds = [];
		for (var j = 0; j < candidates.length; j++) {
			caseIds.push(candidates[j].caseId);
		}
		return caseIds;
	}

	function _createQueueState(totalAttempts, sessionCap) {
		return {
			totalAttempts: totalAttempts,
			sessionCap: sessionCap,
			counts: {},
			seen: {},
			lastCaseRef: null,
			lastRunLength: 0
		};
	}

	function _markCase(state, caseId) {
		state.counts[caseId] = (state.counts[caseId] || 0) + 1;
		state.seen[caseId] = true;
		if (state.lastCaseRef === caseId) {
			state.lastRunLength += 1;
		} else {
			state.lastCaseRef = caseId;
			state.lastRunLength = 1;
		}
	}

	function _canUseCase(caseId, state, respectCap, respectConsecutive) {
		if (respectCap && state.sessionCap != null && (state.counts[caseId] || 0) >= state.sessionCap) {
			return false;
		}
		if (respectConsecutive && state.lastCaseRef === caseId && state.lastRunLength >= MAX_CONSECUTIVE_REPEATS) {
			return false;
		}
		return true;
	}

	function _findEligibleCase(caseIds, state, respectCap, respectConsecutive) {
		for (var i = 0; i < caseIds.length; i++) {
			if (_canUseCase(caseIds[i], state, respectCap, respectConsecutive)) {
				return caseIds[i];
			}
		}
		return null;
	}

	function _chooseCase(candidateIds, allCaseIds, state) {
		var passes = state.sessionCap == null ? [
			{ cap: false, consecutive: true },
			{ cap: false, consecutive: false }
		] : [
			{ cap: true, consecutive: true },
			{ cap: false, consecutive: true },
			{ cap: false, consecutive: false }
		];

		for (var i = 0; i < passes.length; i++) {
			var chosen = _findEligibleCase(candidateIds, state, passes[i].cap, passes[i].consecutive);
			if (chosen) {
				return chosen;
			}
			chosen = _findEligibleCase(allCaseIds, state, passes[i].cap, passes[i].consecutive);
			if (chosen) {
				return chosen;
			}
		}
		return allCaseIds.length ? allCaseIds[0] : null;
	}

	function _getPromptMode(goal) {
		return goal === "cross" ? "full-solve" : "from-case";
	}

	function _getTargetMetric(goal) {
		return goal === "cross" ? "planTime" : "solveTime";
	}

	function _pushQueueItem(queue, state, caseId, block, goal) {
		queue.push({
			queueIndex: queue.length,
			drillId: block + "-" + caseId + "-" + queue.length,
			caseRef: caseId,
			promptMode: _getPromptMode(goal),
			targetMetric: _getTargetMetric(goal),
			block: block
		});
		_markCase(state, caseId);
	}

	function _buildWarmupBlock(queue, count, candidateIds, allCaseIds, state, goal) {
		for (var i = 0; i < count; i++) {
			var caseId = _chooseCase(candidateIds, allCaseIds, state);
			if (!caseId) {
				break;
			}
			_pushQueueItem(queue, state, caseId, "warmup", goal);
		}
	}

	function _buildCoveragePlan(scoredEntries, focusCount, coverageFloor) {
		var topCount = Math.max(Math.ceil(scoredEntries.length * 0.30), 1);
		var topIds = {};
		var topCaseIds = [];
		var nonTopCaseIds = [];

		for (var i = 0; i < scoredEntries.length; i++) {
			if (i < topCount) {
				topIds[scoredEntries[i].caseId] = true;
				topCaseIds.push(scoredEntries[i].caseId);
			} else {
				nonTopCaseIds.push(scoredEntries[i].caseId);
			}
		}

		return {
			topIds: topIds,
			topCaseIds: topCaseIds,
			nonTopCaseIds: nonTopCaseIds.length ? nonTopCaseIds : topCaseIds.slice(),
			floorCount: Math.min(Math.ceil(focusCount * coverageFloor), focusCount),
			spacing: coverageFloor > 0 ? Math.max(Math.floor(focusCount / Math.max(Math.ceil(focusCount * coverageFloor), 1)), 1) : focusCount + 1
		};
	}

	function _buildFocusBlock(queue, count, scoredEntries, state, goal, coverageFloor) {
		var allCaseIds = [];
		for (var i = 0; i < scoredEntries.length; i++) {
			allCaseIds.push(scoredEntries[i].caseId);
		}
		if (!allCaseIds.length) {
			return;
		}

		var coveragePlan = _buildCoveragePlan(scoredEntries, count, coverageFloor);
		var nonTopUsed = 0;

		for (var slot = 0; slot < count; slot++) {
			var slotsRemaining = count - slot;
			var coverageSlotsNeeded = coveragePlan.floorCount - nonTopUsed;
			var forceNonTop = coverageSlotsNeeded > 0 && (slotsRemaining === coverageSlotsNeeded || slot % coveragePlan.spacing === 0);
			var preferredCaseIds = forceNonTop ? coveragePlan.nonTopCaseIds : allCaseIds;
			var caseId = _chooseCase(preferredCaseIds, allCaseIds, state);
			if (!caseId) {
				break;
			}
			if (!coveragePlan.topIds[caseId]) {
				nonTopUsed += 1;
			}
			_pushQueueItem(queue, state, caseId, "focus", goal);
		}
	}

	function _buildIntegrationBlock(queue, count, allCaseIds, state, goal, queueSeed) {
		if (!allCaseIds.length) {
			return;
		}
		var shuffledCaseIds = _shuffle(_sortCaseIds(allCaseIds), queueSeed);
		for (var slot = 0; slot < count; slot++) {
			var rotated = [];
			for (var i = 0; i < shuffledCaseIds.length; i++) {
				rotated.push(shuffledCaseIds[(slot + i) % shuffledCaseIds.length]);
			}
			var caseId = _chooseCase(rotated, shuffledCaseIds, state);
			if (!caseId) {
				break;
			}
			_pushQueueItem(queue, state, caseId, "integration", goal);
		}
	}

	function _createCounts(queue) {
		var counts = {};
		for (var i = 0; i < queue.length; i++) {
			counts[queue[i].caseRef] = (counts[queue[i].caseRef] || 0) + 1;
		}
		return counts;
	}

	function _canReplaceAt(queue, index, replacementCaseId) {
		var start = Math.max(index - MAX_CONSECUTIVE_REPEATS, 0);
		var end = Math.min(index + MAX_CONSECUTIVE_REPEATS, queue.length - 1);
		var run = 0;

		for (var i = start; i <= end; i++) {
			var caseId = i === index ? replacementCaseId : queue[i].caseRef;
			if (caseId === replacementCaseId) {
				run += 1;
				if (run > MAX_CONSECUTIVE_REPEATS) {
					return false;
				}
			} else {
				run = 0;
			}
		}

		return true;
	}

	function _applyGlobalSessionCap(queue, activeCaseIds, scoredMap, totalAttempts, goal) {
		if (goal === "cross" || !queue.length) {
			return queue;
		}

		var cap = Math.max(Math.floor(totalAttempts * PER_SESSION_CAP_PCT), 1);
		if (cap * activeCaseIds.length < queue.length) {
			return queue;
		}

		var counts = _createCounts(queue);
		var sortedCaseIds = activeCaseIds.slice().sort(function(a, b) {
			if ((counts[a] || 0) !== (counts[b] || 0)) {
				return (counts[a] || 0) - (counts[b] || 0);
			}
			if (scoredMap[a].effectiveWeight !== scoredMap[b].effectiveWeight) {
				return scoredMap[b].effectiveWeight - scoredMap[a].effectiveWeight;
			}
			return a < b ? -1 : (a > b ? 1 : 0);
		});

		for (var index = queue.length - 1; index >= 0; index--) {
			var currentCaseId = queue[index].caseRef;
			if ((counts[currentCaseId] || 0) <= cap) {
				continue;
			}
			for (var i = 0; i < sortedCaseIds.length; i++) {
				var replacementCaseId = sortedCaseIds[i];
				if (replacementCaseId === currentCaseId || (counts[replacementCaseId] || 0) >= cap) {
					continue;
				}
				if (_canReplaceAt(queue, index, replacementCaseId)) {
					counts[currentCaseId] -= 1;
					counts[replacementCaseId] = (counts[replacementCaseId] || 0) + 1;
					queue[index].caseRef = replacementCaseId;
					break;
				}
			}
		}

		return queue;
	}

	function _ensureCoverage(queue, activeCaseIds) {
		if (queue.length < activeCaseIds.length) {
			return queue;
		}

		var counts = _createCounts(queue);
		var missingCaseIds = [];
		for (var i = 0; i < activeCaseIds.length; i++) {
			if (!counts[activeCaseIds[i]]) {
				missingCaseIds.push(activeCaseIds[i]);
			}
		}

		for (var m = 0; m < missingCaseIds.length; m++) {
			for (var index = queue.length - 1; index >= 0; index--) {
				var currentCaseId = queue[index].caseRef;
				if ((counts[currentCaseId] || 0) <= 1 || queue[index].block === "warmup") {
					continue;
				}
				if (_canReplaceAt(queue, index, missingCaseIds[m])) {
					counts[currentCaseId] -= 1;
					counts[missingCaseIds[m]] = 1;
					queue[index].caseRef = missingCaseIds[m];
					break;
				}
			}
		}

		return queue;
	}

	function _enforceMaxConsecutive(queue) {
		for (var index = MAX_CONSECUTIVE_REPEATS; index < queue.length; index++) {
			var caseId = queue[index].caseRef;
			var isOverflowRun = true;
			for (var offset = 1; offset <= MAX_CONSECUTIVE_REPEATS; offset++) {
				if (queue[index - offset].caseRef !== caseId) {
					isOverflowRun = false;
					break;
				}
			}
			if (!isOverflowRun) {
				continue;
			}

			for (var swapIndex = index + 1; swapIndex < queue.length; swapIndex++) {
				if (queue[swapIndex].caseRef === caseId) {
					continue;
				}
				var swapCaseId = queue[swapIndex].caseRef;
				if (_canReplaceAt(queue, index, swapCaseId) && _canReplaceAt(queue, swapIndex, caseId)) {
					var current = queue[index];
					queue[index] = queue[swapIndex];
					queue[swapIndex] = current;
					break;
				}
			}
		}
		return queue;
	}

	function _reindexQueue(queue) {
		for (var i = 0; i < queue.length; i++) {
			queue[i].queueIndex = i;
			queue[i].drillId = queue[i].block + "-" + queue[i].caseRef + "-" + i;
		}
		return queue;
	}

	function generateQueue(plan, stats, catalog, plannerContext) {
		var safePlan = plan || {};
		var goal = safePlan.goal || "last-layer";
		var totalAttempts = Math.max(safePlan.totalAttempts || 20, 0);
		var evaluationTime = plannerContext && plannerContext.evaluationTime != null ? plannerContext.evaluationTime : DEFAULT_EVALUATION_TIME;
		var queueSeed = plannerContext && plannerContext.queueSeed != null ? plannerContext.queueSeed : DEFAULT_QUEUE_SEED;
		var focusSettings = _resolveFocusSettings(safePlan, goal);
		var weights = WEIGHTS_BY_MODE[focusSettings.sessionMode] || WEIGHTS_BY_MODE.standard;

		var activeCases = _resolveActiveCases(safePlan, catalog || []);
		var activeCaseIds = [];
		for (var i = 0; i < activeCases.length; i++) {
			activeCaseIds.push(activeCases[i].caseId);
		}
		if (!activeCaseIds.length || totalAttempts === 0) {
			return [];
		}

		var categoryBuckets = _buildCategoryBuckets(catalog || []);
		var statsMap = _buildStatsMap(stats || []);
		var scored = _buildScoredEntries(activeCases, categoryBuckets, statsMap, evaluationTime, focusSettings.weakCaseBias, weights);
		var sessionCap = goal === "cross" ? null : Math.max(Math.floor(totalAttempts * PER_SESSION_CAP_PCT), 1);

		if (sessionCap != null && sessionCap * activeCaseIds.length < totalAttempts) {
			sessionCap = null;
		}

		var queue = [];
		var state = _createQueueState(totalAttempts, sessionCap);
		var blockSizes = _blockSizes(goal, totalAttempts);
		var warmupCaseIds = _buildWarmupCandidates(scored.entries);

		_buildWarmupBlock(queue, blockSizes.warmup, warmupCaseIds, activeCaseIds, state, goal);
		_buildFocusBlock(queue, blockSizes.focus, scored.entries, state, goal, focusSettings.coverageFloor);
		_buildIntegrationBlock(queue, blockSizes.integration, activeCaseIds, state, goal, queueSeed);

		queue = _applyGlobalSessionCap(queue, activeCaseIds, scored.map, totalAttempts, goal);
		queue = _ensureCoverage(queue, activeCaseIds);
		queue = _enforceMaxConsecutive(queue);

		if (queue.length > totalAttempts) {
			queue = queue.slice(0, totalAttempts);
		}

		return _reindexQueue(queue);
	}

	function tagWeakCases(sessionResults, statsMap) {
		var weakCaseIds = [];
		var seen = {};
		for (var i = 0; i < sessionResults.length; i++) {
			var result = sessionResults[i];
			var stat = statsMap[result.caseId];
			if (!stat || seen[result.caseId]) {
				continue;
			}
			if (result.solveTime > stat.avgSolveTime * 1.5 || result.isDnf) {
				seen[result.caseId] = true;
				weakCaseIds.push(result.caseId);
			}
		}
		return weakCaseIds;
	}

	function tagStrongCases(sessionResults, statsMap) {
		var strongCaseIds = [];
		var seen = {};
		for (var i = 0; i < sessionResults.length; i++) {
			var result = sessionResults[i];
			var stat = statsMap[result.caseId];
			if (!stat || seen[result.caseId]) {
				continue;
			}
			if (result.solveTime < stat.avgSolveTime * 0.85 && !result.isDnf) {
				seen[result.caseId] = true;
				strongCaseIds.push(result.caseId);
			}
		}
		return strongCaseIds;
	}

	function nextRecommendation(sessionResults, weakCaseIds, strongCaseIds, catalog, reviewContext) {
		var groupCounts = {};
		var focusCaseIds = {};
		var dnfCount = 0;
		var warmupSlow = false;
		var caseGroups = {};

		for (var i = 0; i < catalog.length; i++) {
			caseGroups[catalog[i].caseId] = catalog[i].groupTags || [];
		}

		for (var j = 0; j < weakCaseIds.length; j++) {
			var groups = caseGroups[weakCaseIds[j]] || [];
			for (var g = 0; g < groups.length; g++) {
				groupCounts[groups[g]] = (groupCounts[groups[g]] || 0) + 1;
			}
		}
		for (var tag in groupCounts) {
			if (groupCounts.hasOwnProperty(tag) && groupCounts[tag] >= 3) {
				return "Focus on " + tag + " recognition patterns next session";
			}
		}

		for (var k = 0; k < sessionResults.length; k++) {
			if (sessionResults[k].block === "focus") {
				focusCaseIds[sessionResults[k].caseId] = true;
			}
			if (sessionResults[k].isDnf) {
				dnfCount += 1;
			}
			if (sessionResults[k].block === "warmup" && sessionResults[k].solveTime > 10000) {
				warmupSlow = true;
			}
		}

		var currentDnfRate = sessionResults.length ? dnfCount / sessionResults.length : 0;
		var previousDnfRate = reviewContext && reviewContext.previousDnfRate != null ? reviewContext.previousDnfRate : null;
		if (previousDnfRate != null && currentDnfRate > previousDnfRate) {
			return "Slow down on recognition - prioritize accuracy over speed";
		}
		if (previousDnfRate == null && currentDnfRate > 0.20) {
			return "Slow down on recognition - prioritize accuracy over speed";
		}

		var focusCount = 0;
		var strongFocusCount = 0;
		for (var caseId in focusCaseIds) {
			if (focusCaseIds.hasOwnProperty(caseId)) {
				focusCount += 1;
			}
		}
		for (var s = 0; s < strongCaseIds.length; s++) {
			if (focusCaseIds[strongCaseIds[s]]) {
				strongFocusCount += 1;
			}
		}
		if (focusCount > 0 && strongFocusCount === focusCount && weakCaseIds.length === 0) {
			return "Increase difficulty tier or add new cases";
		}

		if (warmupSlow) {
			return "Practice low-tier cases before jumping into focus";
		}

		return "Continue with current plan";
	}

	return {
		generateQueue: generateQueue,
		tagWeakCases: tagWeakCases,
		tagStrongCases: tagStrongCases,
		nextRecommendation: nextRecommendation,
		_computeWeaknessScore: _computeWeaknessScore,
		_effectiveWeight: _effectiveWeight,
		_blockSizes: _blockSizes,
		_enforceMaxConsecutive: _enforceMaxConsecutive,
		_buildWarmupBlock: _buildWarmupBlock,
		_buildFocusBlock: _buildFocusBlock,
		_buildIntegrationBlock: _buildIntegrationBlock,
		WEIGHTS_BY_MODE: WEIGHTS_BY_MODE
	};
});
