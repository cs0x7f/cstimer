"use strict";

var trainerStorage = execMain(function() {

	var TRAINER_KEYS = [
		'trainer:profile',
		'trainer:plans',
		'trainer:activePlanId',
		'trainer:stats',
		'trainer:sessions',
		'trainer:catalogVersion'
	];

	function _safeParse(str, fallback) {
		if (str == null || str === '') {
			return fallback;
		}
		try {
			return JSON.parse(str);
		} catch (err) {
			console.warn('[trainer] parse error, resetting key:', err.message);
			return fallback;
		}
	}

	function _safeStringify(obj) {
		try {
			return JSON.stringify(obj);
		} catch (err) {
			console.warn('[trainer] stringify error:', err.message);
			return null;
		}
	}

	function loadProfile() {
		return storage.getKey('trainer:profile').then(function(val) {
			return _safeParse(val, null);
		});
	}

	function saveProfile(profile) {
		var str = _safeStringify(profile);
		if (str !== null) {
			return storage.setKey('trainer:profile', str);
		}
		return Promise.resolve(false);
	}

	function loadPlans() {
		return storage.getKey('trainer:plans').then(function(val) {
			return _safeParse(val, {});
		});
	}

	function loadPlan(planId) {
		return loadPlans().then(function(plans) {
			return plans[planId] || null;
		});
	}

	function savePlan(plan) {
		return loadPlans().then(function(plans) {
			plans[plan.planId] = plan;
			var str = _safeStringify(plans);
			if (str !== null) {
				return storage.setKey('trainer:plans', str);
			}
			return false;
		});
	}

	function deletePlan(planId) {
		return loadPlans().then(function(plans) {
			delete plans[planId];
			var str = _safeStringify(plans);
			if (str !== null) {
				return storage.setKey('trainer:plans', str);
			}
			return false;
		});
	}

	function loadActivePlanId() {
		return storage.getKey('trainer:activePlanId').then(function(val) {
			return _safeParse(val, '');
		});
	}

	function saveActivePlanId(planId) {
		return storage.setKey('trainer:activePlanId', JSON.stringify(planId || ''));
	}

	function loadStats() {
		return storage.getKey('trainer:stats').then(function(val) {
			return _safeParse(val, []);
		});
	}

	function saveStats(stats) {
		var str = _safeStringify(stats);
		if (str !== null) {
			return storage.setKey('trainer:stats', str);
		}
		return Promise.resolve(false);
	}

	function loadSessions() {
		return storage.getKey('trainer:sessions').then(function(val) {
			return _safeParse(val, []);
		});
	}

	function saveSessionResult(result) {
		return loadSessions().then(function(sessions) {
			sessions.push(result);
			var str = _safeStringify(sessions);
			if (str !== null) {
				return storage.setKey('trainer:sessions', str);
			}
			return false;
		});
	}

	function loadCatalogVersion() {
		return storage.getKey('trainer:catalogVersion').then(function(val) {
			return _safeParse(val, '');
		});
	}

	function saveCatalogVersion(version) {
		return storage.setKey('trainer:catalogVersion', JSON.stringify(version || ''));
	}

	function exportTrainerData() {
		return Promise.all([
			loadProfile(),
			loadPlans(),
			loadStats(),
			loadSessions()
		]).then(function(results) {
			return {
				profile: results[0],
				plans: results[1],
				stats: results[2],
				sessions: results[3]
			};
		});
	}

	function clearTrainerData() {
		return Promise.all([
			storage.setKey('trainer:profile', ''),
			storage.setKey('trainer:plans', '{}'),
			saveActivePlanId(''),
			saveStats([]),
			storage.setKey('trainer:sessions', '[]'),
			saveCatalogVersion('')
		]).then(function() {
			return true;
		});
	}

	function importTrainerData(payload) {
		var imported = 0;
		var skipped = 0;
		var warnings = [];

		var jobs = [];

		if (payload.profile != null) {
			jobs.push(saveProfile(payload.profile).then(function() { imported++; }));
		} else {
			if (!('profile' in payload)) {
				warnings.push('profile missing; reset to default');
			}
			jobs.push(storage.setKey('trainer:profile', '').then(function() { imported++; }));
		}

		var plansPayload = {};
		if (payload.plans != null && typeof payload.plans === 'object' && !Array.isArray(payload.plans)) {
			plansPayload = payload.plans;
		} else if ('plans' in payload) {
			warnings.push('plans invalid; reset to default');
		} else {
			warnings.push('plans missing; reset to default');
		}
		var plansStr = _safeStringify(plansPayload);
		if (plansStr !== null) {
			jobs.push(storage.setKey('trainer:plans', plansStr).then(function() { imported++; }));
		} else {
			warnings.push('plans serialization failed');
			skipped++;
		}

		var statsPayload = [];
		if (payload.stats != null && Array.isArray(payload.stats)) {
			statsPayload = payload.stats;
		} else if ('stats' in payload) {
			warnings.push('stats invalid; reset to default');
		} else {
			warnings.push('stats missing; reset to default');
		}
		jobs.push(saveStats(statsPayload).then(function() { imported++; }));

		var sessionsPayload = [];
		if (payload.sessions != null && Array.isArray(payload.sessions)) {
			sessionsPayload = payload.sessions;
		} else if ('sessions' in payload) {
			warnings.push('sessions invalid; reset to default');
		} else {
			warnings.push('sessions missing; reset to default');
		}
		var sessionsStr = _safeStringify(sessionsPayload);
		if (sessionsStr !== null) {
			jobs.push(storage.setKey('trainer:sessions', sessionsStr).then(function() { imported++; }));
		} else {
			warnings.push('sessions serialization failed');
			skipped++;
		}

		jobs.push(saveActivePlanId(''));
		jobs.push(saveCatalogVersion(''));

		return Promise.all(jobs).then(function() {
			return { imported: imported, skipped: skipped, warnings: warnings };
		});
	}

	function hasTrainerData() {
		return storage.getKey('trainer:profile').then(function(val) {
			return val != null && val !== '';
		});
	}

	return {
		TRAINER_KEYS: TRAINER_KEYS,
		loadProfile: loadProfile,
		saveProfile: saveProfile,
		loadPlans: loadPlans,
		loadPlan: loadPlan,
		savePlan: savePlan,
		deletePlan: deletePlan,
		loadActivePlanId: loadActivePlanId,
		saveActivePlanId: saveActivePlanId,
		loadStats: loadStats,
		saveStats: saveStats,
		loadSessions: loadSessions,
		saveSessionResult: saveSessionResult,
		loadCatalogVersion: loadCatalogVersion,
		saveCatalogVersion: saveCatalogVersion,
		exportTrainerData: exportTrainerData,
		clearTrainerData: clearTrainerData,
		importTrainerData: importTrainerData,
		hasTrainerData: hasTrainerData
	};
});
