"use strict";

var trainerExport = execMain(function() {

	var TRAINER_EXPORT_VERSION = 1;

	function buildTrainerExportBlock() {
		return trainerStorage.exportTrainerData().then(function(payload) {
			if (!payload.profile && Object.keys(payload.plans).length === 0 &&
				payload.stats.length === 0 && payload.sessions.length === 0) {
				return null;
			}
			return {
				version: TRAINER_EXPORT_VERSION,
				exportedAt: new Date().toISOString(),
				profile: payload.profile,
				plans: payload.plans,
				stats: payload.stats,
				sessions: payload.sessions
			};
		}).catch(function(err) {
			console.warn('[trainer] export block build failed:', err.message);
			return null;
		});
	}

	function readTrainerExportBlock(rawImport) {
		if (rawImport == null || typeof rawImport !== 'object') {
			return null;
		}
		if (!('trainer' in rawImport)) {
			return null;
		}
		var block = rawImport['trainer'];
		if (block == null || typeof block !== 'object') {
			return null;
		}
		return block;
	}

	function isEmptyTrainerExportBlock(payload) {
		return payload != null && typeof payload === 'object' && Object.keys(payload).length === 0;
	}

	function validateTrainerExportBlock(payload) {
		var errors = [];

		if (payload == null || typeof payload !== 'object') {
			return { valid: false, errors: ['payload is null or not an object'] };
		}

		if (payload.version == null) {
			errors.push('missing version field');
		} else if (typeof payload.version !== 'number' || payload.version < 1 || payload.version > TRAINER_EXPORT_VERSION) {
			errors.push('unrecognized version: ' + payload.version);
		}

		if (payload.profile != null && typeof payload.profile !== 'object') {
			errors.push('profile is not an object');
		}

		if (payload.plans != null && (typeof payload.plans !== 'object' || Array.isArray(payload.plans))) {
			errors.push('plans is not an object (expected Record<string, TrainingPlan>)');
		}

		if (payload.stats != null && !Array.isArray(payload.stats)) {
			errors.push('stats is not an array');
		}

		if (payload.sessions != null && !Array.isArray(payload.sessions)) {
			errors.push('sessions is not an array');
		}

		var jsonStr;
		try {
			jsonStr = JSON.stringify(payload);
		} catch (e) {
			errors.push('payload contains circular references');
			return { valid: false, errors: errors };
		}

		if (jsonStr && jsonStr.length > 1048576) {
			errors.push('payload exceeds 1MB size limit');
		}

		return { valid: errors.length === 0, errors: errors };
	}

	function mergeExportObj(exportObj) {
		return buildTrainerExportBlock().then(function(block) {
			if (block !== null) {
				exportObj['trainer'] = block;
			}
			return exportObj;
		}).catch(function() {
			return exportObj;
		});
	}

	function processImportData(data) {
		var block = readTrainerExportBlock(data);
		if (block === null) {
			return Promise.resolve(null);
		}

		if (isEmptyTrainerExportBlock(block)) {
			return trainerStorage.clearTrainerData().then(function() {
				return {
					imported: 0,
					skipped: 0,
					warnings: ['empty trainer block imported; trainer data reset to defaults']
				};
			});
		}

		var validation = validateTrainerExportBlock(block);
		if (!validation.valid) {
			console.warn('[trainer] import validation failed:', validation.errors.join('; '));
			return Promise.resolve({ imported: 0, skipped: 0, warnings: validation.errors });
		}

		return trainerStorage.importTrainerData(block);
	}

	return {
		TRAINER_EXPORT_VERSION: TRAINER_EXPORT_VERSION,
		buildTrainerExportBlock: buildTrainerExportBlock,
		readTrainerExportBlock: readTrainerExportBlock,
		isEmptyTrainerExportBlock: isEmptyTrainerExportBlock,
		validateTrainerExportBlock: validateTrainerExportBlock,
		mergeExportObj: mergeExportObj,
		processImportData: processImportData
	};
});
