"use strict";

var caseCatalog = execMain(function() {

	function _countMoves(notation) {
		var trimmed = (notation || "").trim();
		if (trimmed === "" || trimmed.charAt(0) === "(") {
			return 0;
		}
		var tokens = trimmed.split(/\s+/);
		var count = 0;
		for (var i = 0; i < tokens.length; i++) {
			if (tokens[i]) {
				count++;
			}
		}
		return count;
	}

	function _clone(obj) {
		return JSON.parse(JSON.stringify(obj));
	}

	function _buildRecord(definition) {
		var record = {
			caseId: definition.caseId,
			category: definition.category,
			name: definition.name,
			groupTags: definition.groupTags || [],
			twoLookPhase: definition.twoLookPhase || null,
			difficultyTier: definition.difficultyTier,
			updatedAt: trainerCatalogData.CATALOG_BUILD_DATE
		};

		if (definition.notes) {
			record.notes = definition.notes;
		}
		if (definition.fingersTrickNotes) {
			record.fingersTrickNotes = definition.fingersTrickNotes;
		}

		record.algorithms = [];
		var provenanceIndex = {};
		record.provenance = [];

		for (var i = 0; i < definition.algorithms.length; i++) {
			var alg = _clone(definition.algorithms[i]);
			alg.algorithmId = definition.caseId + "-alg-" + (i + 1);
			alg.recommended = i === 0;
			alg.moveCount = _countMoves(alg.notation);
			record.algorithms.push(alg);

			for (var s = 0; s < alg.sourceRefs.length; s++) {
				var sourceRef = alg.sourceRefs[s];
				if (!provenanceIndex[sourceRef]) {
					var provenance = _clone(trainerCatalogData.PROVENANCE[sourceRef]);
					provenance.coversAlgorithms = [];
					provenanceIndex[sourceRef] = provenance;
					record.provenance.push(provenance);
				}
				provenanceIndex[sourceRef].coversAlgorithms.push(alg.algorithmId);
			}
		}

		return record;
	}

	var _catalog = {};
	var _byCategory = { PLL: [], OLL: [], cross: [] };

	for (var i = 0; i < trainerCatalogData.CASES.length; i++) {
		var record = _buildRecord(trainerCatalogData.CASES[i]);
		_catalog[record.caseId] = record;
		_byCategory[record.category].push(record.caseId);
	}

	function getCatalogVersion() {
		return trainerCatalogData.CATALOG_VERSION;
	}

	function getCase(caseId) {
		return _catalog[caseId] || null;
	}

	function getCasesByCategory(category) {
		var ids = _byCategory[category] || [];
		var cases = [];
		for (var i = 0; i < ids.length; i++) {
			cases.push(_catalog[ids[i]]);
		}
		return cases;
	}

	function getAllCases() {
		return getCasesByCategory("PLL").concat(getCasesByCategory("OLL")).concat(getCasesByCategory("cross"));
	}

	function getCasesByGroup(groupTag) {
		var all = getAllCases();
		var matches = [];
		for (var i = 0; i < all.length; i++) {
			if (all[i].groupTags.indexOf(groupTag) !== -1) {
				matches.push(all[i]);
			}
		}
		return matches;
	}

	function getRecommendedAlgorithm(caseId) {
		var record = getCase(caseId);
		return record && record.algorithms.length ? record.algorithms[0] : null;
	}

	function getAllAlgorithms(caseId) {
		var record = getCase(caseId);
		return record ? record.algorithms : [];
	}

	function getProvenance(caseId) {
		var record = getCase(caseId);
		return record ? record.provenance : [];
	}

	function getCaseCount() {
		return trainerCatalogData.CASES.length;
	}

	function getCaseCountByCategory(category) {
		return (_byCategory[category] || []).length;
	}

	function getGroupTags() {
		var groups = {};
		var all = getAllCases();
		for (var i = 0; i < all.length; i++) {
			for (var g = 0; g < all[i].groupTags.length; g++) {
				var tag = all[i].groupTags[g];
				if (!groups[tag]) {
					groups[tag] = [];
				}
				groups[tag].push(all[i].caseId);
			}
		}
		return groups;
	}

	function exportCatalog() {
		return {
			version: trainerCatalogData.CATALOG_VERSION,
			builtAt: trainerCatalogData.CATALOG_BUILD_DATE,
			cases: getAllCases(),
			summary: {
				total: getCaseCount(),
				PLL: getCaseCountByCategory("PLL"),
				OLL: getCaseCountByCategory("OLL"),
				cross: getCaseCountByCategory("cross")
			}
		};
	}

	return {
		getCatalogVersion: getCatalogVersion,
		getCase: getCase,
		getCasesByCategory: getCasesByCategory,
		getAllCases: getAllCases,
		getCasesByGroup: getCasesByGroup,
		getRecommendedAlgorithm: getRecommendedAlgorithm,
		getAllAlgorithms: getAllAlgorithms,
		getProvenance: getProvenance,
		getCaseCount: getCaseCount,
		getCaseCountByCategory: getCaseCountByCategory,
		getGroupTags: getGroupTags,
		exportCatalog: exportCatalog
	};
});
