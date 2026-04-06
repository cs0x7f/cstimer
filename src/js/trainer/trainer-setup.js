"use strict";

var trainerSetup = execMain(function() {

	var _container = null;
	var _rendered = false;
	var _selectedTemplate = null;
	var _selectedGoal = "last-layer";
	var _sessionName = "";
	var _caseSet = "PLL";
	var _sessionLength = 21;
	var _adaptiveWeighting = true;
	var _showHints = true;
	var _repeatFailed = false;
	var _randomizeOrder = false;
	var _casePreview = [];
	var _statsData = null;

	var TEMPLATES = [
		{
			id: "quick-review",
			name: "Quick Review",
			description: "Top 10 weakest cases from PLL and OLL. Fast, focused session.",
			meta: ["~8 min", "10 cases"],
			caseSet: "Both",
			totalAttempts: 10,
			weakOnly: false,
			highlighted: false
		},
		{
			id: "full-rotation",
			name: "<em>Full Rotation</em>",
			description: "All 21 PLL cases with weak-case weighting. Comprehensive coverage.",
			meta: ["~15 min", "21 cases"],
			caseSet: "PLL",
			totalAttempts: 21,
			weakOnly: false,
			highlighted: true
		},
		{
			id: "weakness-blitz",
			name: "Weakness Blitz",
			description: "Only cases below 60% confidence. High reps on your worst performers.",
			meta: ["~12 min", "Weak only"],
			caseSet: "PLL",
			totalAttempts: 10,
			weakOnly: true,
			highlighted: false
		}
	];

	function _cssVar(name) {
		return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
	}

	function _getTemplateSet() {
		if (_selectedGoal !== "cross") {
			return TEMPLATES;
		}
		return [
			{
				id: "quick-review",
				name: "Quick Review",
				description: "A short cross refresher that prioritizes weaker planning and execution drill types.",
				meta: ["~8 min", "10 drills"],
				caseSet: "Cross",
				totalAttempts: 10,
				weakOnly: false,
				highlighted: false
			},
			{
				id: "full-rotation",
				name: "<em>Cross Rotation</em>",
				description: "Cycle across the full cross drill set with extra weight on weaker drill types.",
				meta: ["~10 min", "5 drill types"],
				caseSet: "Cross",
				totalAttempts: 10,
				weakOnly: false,
				highlighted: true
			},
			{
				id: "weakness-blitz",
				name: "Weakness Blitz",
				description: "Repeat the cross drill types where your recent confidence is lowest.",
				meta: ["~10 min", "Weak focus"],
				caseSet: "Cross",
				totalAttempts: 10,
				weakOnly: true,
				highlighted: false
			}
		];
	}

	function _getSelectedTemplateRecord() {
		var templates = _getTemplateSet();
		for (var i = 0; i < templates.length; i++) {
			if (templates[i].id === _selectedTemplate) {
				return templates[i];
			}
		}
		return templates.length ? templates[0] : null;
	}

	function _getGoalLabel() {
		var planGoal = _resolvePlanGoal();
		if (planGoal === "cross") {
			return "Cross";
		}
		if (planGoal === "returning") {
			return "Returning";
		}
		return "Last Layer";
	}

	function _getGoalTagClass() {
		return _resolvePlanGoal() === "cross" ? "ts-tag-neutral" : "ts-tag-saffron";
	}

	function _getCaseSetOptions() {
		if (_selectedGoal === "cross") {
			return ["Cross"];
		}
		return ["PLL", "OLL", "Both"];
	}

	function _getCaseSetConfig(caseSet) {
		if (caseSet === "OLL") {
			return {
				maxCases: 57,
				displayMax: "All 57"
			};
		}
		if (caseSet === "Both") {
			return {
				maxCases: 78,
				displayMax: "All 78"
			};
		}
		if (caseSet === "Cross") {
			return {
				maxCases: 20,
				displayMax: "Up to 20"
			};
		}
		return {
			maxCases: 21,
			displayMax: "All 21"
		};
	}

	function _matchesCaseSet(caseSet, category) {
		if (caseSet === "PLL") {
			return category === "PLL";
		}
		if (caseSet === "OLL") {
			return category === "OLL";
		}
		if (caseSet === "Both") {
			return category === "PLL" || category === "OLL";
		}
		if (caseSet === "Cross") {
			return category === "cross";
		}
		return false;
	}

	function _resolvePlanGoal() {
		if (_selectedGoal === "cross" || _caseSet === "Cross") {
			return "cross";
		}
		if (_selectedGoal === "return-to-speed" || _caseSet === "Both" || _selectedTemplate === "quick-review") {
			return "returning";
		}
		return "last-layer";
	}

	function _buildStyles() {
		return [
			".trainer-setup { max-width: 1400px; margin: 0 auto; padding: 64px 48px; position: relative; -webkit-font-smoothing: antialiased; }",
			".trainer-setup::before { content: ''; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(circle at 50% -20%, rgba(232,166,32,0.05) 0%, transparent 70%); pointer-events: none; z-index: -1; }",
			".trainer-setup .ts-layout { display: flex; gap: 48px; align-items: flex-start; }",
			".trainer-setup .ts-main { flex: 1; min-width: 0; }",
			".trainer-setup .ts-sidebar { width: 340px; flex-shrink: 0; position: sticky; top: 32px; }",
			".trainer-setup .ts-page-header { display: flex; align-items: center; justify-content: space-between; padding-bottom: 24px; border-bottom: 1px solid var(--border, rgba(237,232,225,0.08)); margin-bottom: 48px; }",
			".trainer-setup .ts-back-link { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--text-tertiary, #8a8177); cursor: pointer; transition: all 0.2s; text-decoration: none; background: none; border: none; padding: 0; font-family: var(--font-mono, 'IBM Plex Mono', monospace); text-transform: uppercase; letter-spacing: 0.05em; }",
			".trainer-setup .ts-back-link:hover { color: var(--saffron, #e8a620); transform: translateX(-4px); }",
			".trainer-setup .ts-back-link svg { width: 14px; height: 14px; }",
			".trainer-setup .ts-page-title-group { margin-bottom: 48px; }",
			".trainer-setup .ts-page-title { font-family: var(--font-display, 'Instrument Serif', serif); font-size: 42px; margin-bottom: 12px; letter-spacing: -0.015em; line-height: 1.1; color: var(--text-primary, #ede8e1); }",
			".trainer-setup .ts-page-title em { font-style: italic; color: var(--saffron, #e8a620); }",
			".trainer-setup .ts-page-subtitle { color: var(--text-secondary, #9b9388); font-size: 16px; max-width: 600px; line-height: 1.5; }",
			".trainer-setup .ts-section-label { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }",
			".trainer-setup .ts-section-label::before { content: ''; width: 16px; height: 1px; background: var(--saffron, #e8a620); }",
			".trainer-setup .ts-section-label h3 { font-family: var(--font-mono, 'IBM Plex Mono', monospace); font-size: 11px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: var(--text-secondary, #b5aea5); }",
			".trainer-setup .ts-template-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 48px; }",
			".trainer-setup .ts-precision-card { background: var(--surface, #272320); border: 1px solid var(--border, rgba(237,232,225,0.08)); border-radius: 6px; position: relative; overflow: hidden; transition: border-color 0.3s ease, background 0.3s ease; cursor: pointer; padding: 24px; }",
			".trainer-setup .ts-precision-card:hover { border-color: var(--border-accent, rgba(232,166,32,0.25)); background: var(--surface-raised, #302b27); }",
			".trainer-setup .ts-precision-card::before { content: ''; position: absolute; top: -1px; left: -1px; width: 8px; height: 8px; border-top: 1.5px solid var(--saffron, #e8a620); border-left: 1.5px solid var(--saffron, #e8a620); border-radius: 6px 0 0 0; }",
			".trainer-setup .ts-precision-card::after { content: ''; position: absolute; bottom: -1px; right: -1px; width: 8px; height: 8px; border-bottom: 1.5px solid var(--saffron, #e8a620); border-right: 1.5px solid var(--saffron, #e8a620); border-radius: 0 0 6px 0; }",
			".trainer-setup .ts-precision-card.ts-selected { border-color: var(--saffron, #e8a620); background: var(--saffron-wash, rgba(232,166,32,0.06)); }",
			".trainer-setup .ts-template-name { font-family: var(--font-display, 'Instrument Serif', serif); font-size: 20px; margin-bottom: 10px; color: var(--text-primary, #ede8e1); }",
			".trainer-setup .ts-template-desc { font-size: 14px; color: var(--text-secondary, #9b9388); line-height: 1.5; margin-bottom: 16px; }",
			".trainer-setup .ts-template-meta { display: flex; gap: 12px; flex-wrap: wrap; }",
			".trainer-setup .ts-tag { font-family: var(--font-mono, 'IBM Plex Mono', monospace); font-size: 10px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; padding: 3px 8px; border-radius: 3px; display: inline-flex; align-items: center; gap: 5px; }",
			".trainer-setup .ts-tag-neutral { background: rgba(237,232,225,0.06); color: var(--text-secondary, #9b9388); }",
			".trainer-setup .ts-tag-saffron { background: var(--saffron-glow, rgba(232,166,32,0.12)); color: var(--saffron, #e8a620); }",
			".trainer-setup .ts-tag-weak { background: var(--weak-dim, rgba(212,86,78,0.15)); color: var(--weak, #d4564e); }",
			".trainer-setup .ts-config-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 32px; }",
			".trainer-setup .ts-config-group { display: flex; flex-direction: column; gap: 8px; }",
			".trainer-setup .ts-config-label { font-family: var(--font-mono, 'IBM Plex Mono', monospace); font-size: 10px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-tertiary, #8a8177); }",
			".trainer-setup .ts-input { font-family: 'DM Sans', sans-serif; font-size: 14px; background: var(--bg-warm, #1f1c19); border: 1px solid var(--border, rgba(237,232,225,0.08)); border-radius: 3px; padding: 10px 14px; color: var(--text-primary, #ede8e1); outline: none; transition: border-color 0.2s; width: 100%; }",
			".trainer-setup .ts-input:focus { border-color: var(--saffron, #e8a620); box-shadow: 0 0 0 3px var(--saffron-glow, rgba(232,166,32,0.12)); }",
			".trainer-setup .ts-input::placeholder { color: var(--text-tertiary, #6b635a); }",
			".trainer-setup .ts-btn-group { display: flex; gap: 8px; }",
			".trainer-setup .ts-btn { font-weight: 600; font-size: 12px; letter-spacing: 0.03em; border: none; cursor: pointer; padding: 8px 16px; border-radius: 3px; transition: all 0.2s ease; }",
			".trainer-setup .ts-btn-primary { background: var(--saffron, #e8a620); color: var(--text-inverse, #1a1816); width: 100%; }",
			".trainer-setup .ts-btn-primary:hover { background: var(--saffron-dim, #c48a18); box-shadow: 0 0 20px var(--saffron-glow, rgba(232,166,32,0.12)); }",
			".trainer-setup .ts-btn-ghost { background: var(--surface, #272320); color: var(--text-secondary, #9b9388); border: 1px solid var(--border, rgba(237,232,225,0.08)); }",
			".trainer-setup .ts-btn-ghost:hover { background: var(--surface-raised, #302b27); color: var(--text-primary, #ede8e1); }",
			".trainer-setup .ts-btn-outline { background: transparent; color: var(--saffron, #e8a620); border: 1px solid var(--border-accent, rgba(232,166,32,0.25)); width: 100%; }",
			".trainer-setup .ts-btn-outline:hover { background: var(--saffron-wash, rgba(232,166,32,0.06)); }",
			".trainer-setup .ts-btn-large { padding: 12px 32px; font-size: 14px; }",
			".trainer-setup .ts-range-wrapper { margin-bottom: 20px; }",
			".trainer-setup .ts-range-display { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }",
			".trainer-setup .ts-range-track { width: 100%; height: 4px; background: var(--border, rgba(237,232,225,0.08)); border-radius: 2px; position: relative; cursor: pointer; transition: background 0.2s; }",
			".trainer-setup .ts-range-track::before { content: ''; position: absolute; top: -12px; bottom: -12px; left: 0; right: 0; z-index: 1; }",
			".trainer-setup .ts-range-track:hover { background: rgba(237,232,225,0.15); }",
			".trainer-setup .ts-range-fill { height: 100%; background: var(--saffron, #e8a620); border-radius: 2px; position: relative; z-index: 2; }",
			".trainer-setup .ts-range-thumb { width: 16px; height: 16px; background: var(--saffron, #e8a620); border: 3px solid var(--bg-warm, #1f1c19); border-radius: 50%; position: absolute; top: 50%; transform: translate(-50%, -50%); cursor: grab; box-shadow: 0 2px 8px rgba(0,0,0,0.3); z-index: 3; transition: transform 0.15s cubic-bezier(0.2, 0, 0.2, 1), box-shadow 0.15s; }",
			".trainer-setup .ts-range-thumb:active { cursor: grabbing; transform: translate(-50%, -50%) scale(1.15); box-shadow: 0 4px 12px rgba(0,0,0,0.4), 0 0 12px var(--saffron-glow, rgba(232,166,32,0.2)); }",
			".trainer-setup .ts-range-labels { display: flex; justify-content: space-between; margin-top: 12px; }",
			".trainer-setup .ts-divider { height: 1px; background: var(--border, rgba(237,232,225,0.08)); margin: 20px 0; }",
			".trainer-setup .ts-toggle-row { display: flex; align-items: center; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid var(--border, rgba(237,232,225,0.08)); }",
			".trainer-setup .ts-toggle-row:last-child { border-bottom: none; }",
			".trainer-setup .ts-toggle-info { display: flex; flex-direction: column; gap: 2px; }",
			".trainer-setup .ts-toggle-label { font-size: 15px; font-weight: 500; color: var(--text-primary, #ede8e1); }",
			".trainer-setup .ts-toggle-desc { font-size: 13px; color: var(--text-tertiary, #8a8177); }",
			".trainer-setup .ts-toggle-track { width: 36px; height: 20px; background: var(--surface-raised, #302b27); border: 1px solid var(--border, rgba(237,232,225,0.08)); border-radius: 10px; cursor: pointer; position: relative; transition: background 0.2s; flex-shrink: 0; }",
			".trainer-setup .ts-toggle-track.ts-on { background: var(--saffron, #e8a620); border-color: var(--saffron, #e8a620); }",
			".trainer-setup .ts-toggle-knob { width: 14px; height: 14px; background: var(--text-primary, #ede8e1); border-radius: 50%; position: absolute; top: 2px; left: 2px; transition: transform 0.2s ease; }",
			".trainer-setup .ts-toggle-track.ts-on .ts-toggle-knob { transform: translateX(16px); background: #ffffff; }",
			".trainer-setup .ts-case-preview { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 48px; }",
			".trainer-setup .ts-case-chip { padding: 6px 12px; background: var(--bg-warm, #1f1c19); border: 1px solid var(--border, rgba(237,232,225,0.08)); border-radius: 3px; font-family: var(--font-mono, 'IBM Plex Mono', monospace); font-size: 11px; color: var(--text-secondary, #9b9388); display: flex; align-items: center; gap: 6px; transition: all 0.2s; }",
			".trainer-setup .ts-case-chip:hover { border-color: var(--border-accent, rgba(232,166,32,0.25)); }",
			".trainer-setup .ts-case-chip.ts-weak { border-color: rgba(212,86,78,0.3); }",
			".trainer-setup .ts-case-chip.ts-good { border-color: rgba(107,186,98,0.3); opacity: 0.6; }",
			".trainer-setup .ts-status-dot { width: 6px; height: 6px; border-radius: 50%; display: inline-block; flex-shrink: 0; }",
			".trainer-setup .ts-status-dot.ts-good { background: var(--good, #6bba62); box-shadow: 0 0 6px var(--good, #6bba62); }",
			".trainer-setup .ts-status-dot.ts-weak { background: var(--weak, #d4564e); box-shadow: 0 0 6px var(--weak, #d4564e); }",
			".trainer-setup .ts-status-dot.ts-warn { background: var(--saffron, #e8a620); box-shadow: 0 0 6px var(--saffron, #e8a620); }",
			".trainer-setup .ts-summary-card { padding: 24px; margin-bottom: 24px; background: linear-gradient(145deg, var(--surface, #272320), var(--bg-warm, #1f1c19)); }",
			".trainer-setup .ts-summary-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-bottom: 24px; }",
			".trainer-setup .ts-summary-stat { display: flex; flex-direction: column; gap: 4px; }",
			".trainer-setup .ts-summary-stat-value { font-family: var(--font-display, 'Instrument Serif', serif); font-size: 32px; line-height: 1; color: var(--text-primary, #ede8e1); }",
			".trainer-setup .ts-summary-stat-label { font-family: var(--font-mono, 'IBM Plex Mono', monospace); font-size: 9px; opacity: 0.8; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-tertiary, #6b635a); }",
			".trainer-setup .ts-progress-track { width: 100%; height: 4px; background: var(--border, rgba(237,232,225,0.06)); border-radius: 2px; overflow: hidden; margin-bottom: 24px; position: relative; }",
			".trainer-setup .ts-progress-fill { height: 100%; border-radius: 2px; transition: width 1s cubic-bezier(0.4, 0, 0.2, 1); }",
			".trainer-setup .ts-actions { display: flex; flex-direction: column; gap: 12px; margin-top: 16px; margin-bottom: 32px; }",
			".trainer-setup .ts-label { font-family: var(--font-mono, 'IBM Plex Mono', monospace); font-size: 10px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-secondary, #9b9388); }",
			".trainer-setup .ts-data { font-family: var(--font-mono, 'IBM Plex Mono', monospace); font-weight: 400; font-variant-numeric: tabular-nums; }",
			".trainer-setup .ts-footer { display: flex; justify-content: space-between; padding: 48px 0 16px; border-top: 1px solid var(--border, rgba(237,232,225,0.06)); margin-top: 32px; }",
			".trainer-setup .ts-footer .ts-label { font-size: 11px; color: var(--text-tertiary, #8a8177); letter-spacing: 0.15em; opacity: 0.6; }",
			"@media (max-width: 1200px) {",
			"  .trainer-setup .ts-template-grid { grid-template-columns: repeat(2, 1fr); }",
			"  .trainer-setup .ts-config-grid { grid-template-columns: 1fr; }",
			"}",
			"@media (max-width: 1024px) {",
			"  .trainer-setup .ts-layout { flex-direction: column; align-items: stretch; gap: 32px; }",
			"  .trainer-setup .ts-sidebar { width: 100%; position: static; }",
			"}",
			"@media (max-width: 640px) {",
			"  .trainer-setup { padding: 24px 16px !important; }",
			"  .trainer-setup .ts-template-grid { grid-template-columns: 1fr; }",
			"  .trainer-setup .ts-summary-grid { grid-template-columns: repeat(2, 1fr); }",
			"  .trainer-setup .ts-page-title { font-size: 32px; }",
			"}",
			"@media (hover: hover) {",
			"  .ts-dragging, .ts-dragging * { user-select: none !important; -webkit-user-select: none !important; cursor: grabbing !important; }",
			"}"
		].join("");
	}

	function _injectStyles() {
		if ($("#trainer-setup-styles").length === 0) {
			$("<style id='trainer-setup-styles'>" + _buildStyles() + "</style>").appendTo("head");
		}
	}

	function _getOrCreateProfile() {
		if (typeof trainerIntegration === "undefined") {
			return Promise.resolve(null);
		}
		return trainerIntegration.getOrCreateProfile().catch(function() { return null; });
	}

	function _loadStats() {
		if (typeof trainerIntegration === "undefined") {
			return Promise.resolve([]);
		}
		return trainerIntegration.getAllStats().catch(function() { return []; });
	}

	function _getCatalog() {
		if (typeof trainerIntegration === "undefined") {
			return [];
		}
		return trainerIntegration.getCatalog();
	}

	function _caseIdStartsWith(caseId, prefix) {
		var normalizedCaseId = String(caseId || "").toUpperCase();
		var normalizedPrefix = String(prefix || "").toUpperCase();
		return normalizedCaseId.indexOf(normalizedPrefix) === 0;
	}

	function _getConfidenceTier(stat) {
		if (!stat || stat.attemptCount === 0) {
			return "untrained";
		}
		var confidence = Math.min(100, Math.round((stat.attemptCount / 20) * 100));
		if (confidence >= 70) return "good";
		if (confidence >= 40) return "warn";
		if (confidence < 40) return "weak";
		return "untrained";
	}

	function _buildCasePreview(caseSet, weakOnly) {
		var catalog = _getCatalog();
		var statsMap = {};
		if (_statsData) {
			for (var i = 0; i < _statsData.length; i++) {
				statsMap[_statsData[i].caseId] = _statsData[i];
			}
		}

		var filtered = [];
		for (var j = 0; j < catalog.length; j++) {
			var cat = catalog[j].category;
			if (!_matchesCaseSet(caseSet, cat)) continue;
			if (catalog[j].caseId === "OLL-20") continue;

			var stat = statsMap[catalog[j].caseId];
			var tier = _getConfidenceTier(stat);

			if (weakOnly && tier !== "weak") continue;

			filtered.push({
				caseId: catalog[j].caseId,
				name: catalog[j].name || catalog[j].caseId,
				tier: tier
			});
		}

		filtered.sort(function(a, b) {
			var tierOrder = { weak: 0, warn: 1, untrained: 2, good: 3 };
			var aOrder = tierOrder[a.tier] || 2;
			var bOrder = tierOrder[b.tier] || 2;
			if (aOrder !== bOrder) return aOrder - bOrder;
			return a.caseId < b.caseId ? -1 : (a.caseId > b.caseId ? 1 : 0);
		});

		if (weakOnly && filtered.length === 0) {
			return _buildCasePreview(caseSet, false);
		}

		return filtered.slice(0, Math.max(_sessionLength, 1));
	}

	function _renderCasePreview(container) {
		var preview = _casePreview;
		var el = $('<div class="ts-case-preview">');
		for (var i = 0; i < preview.length; i++) {
			var chip = $('<div class="ts-case-chip">');
			var dotClass = "ts-warn";
			if (preview[i].tier === "weak") {
				chip.addClass("ts-weak");
				dotClass = "ts-weak";
			} else if (preview[i].tier === "good") {
				chip.addClass("ts-good");
				dotClass = "ts-good";
			}
			var dot = $('<span class="ts-status-dot ' + dotClass + '">');
			chip.append(dot).append(preview[i].name);
			el.append(chip);
		}
		container.find(".ts-case-preview").remove();
		container.append(el);
	}

	function _renderTemplateGrid(container) {
		var grid = $('<div class="ts-template-grid">');
		var templates = _getTemplateSet();
		for (var i = 0; i < templates.length; i++) {
			var tmpl = templates[i];
			var card = $('<div class="ts-precision-card' + (_selectedTemplate === tmpl.id ? " ts-selected" : "") + '" data-template="' + tmpl.id + '">');
			card.append($('<div class="ts-template-name">').html(tmpl.name));
			card.append($('<div class="ts-template-desc">').text(tmpl.description));
			var meta = $('<div class="ts-template-meta">');
			for (var m = 0; m < tmpl.meta.length; m++) {
				var tagClass = tmpl.highlighted ? "ts-tag-saffron" : (tmpl.weakOnly ? "ts-tag-weak" : "ts-tag-neutral");
				meta.append($('<span class="ts-tag ' + tagClass + '">').text(tmpl.meta[m]));
			}
			card.append(meta);
			grid.append(card);
		}
		container.append(grid);
	}

	function _renderConfigSection(container) {
		var card = $('<div class="ts-precision-card" style="padding: 24px; margin-bottom: 32px;">');

		var configGrid = $('<div class="ts-config-grid">');
		var nameGroup = $('<div class="ts-config-group">');
		nameGroup.append($('<div class="ts-config-label">').text("Session Name"));
		var nameInput = $('<input type="text" class="ts-input" placeholder="e.g. PLL Full Rotation — Evening">').val(_sessionName);
		nameGroup.append(nameInput);
		configGrid.append(nameGroup);

		var caseSetGroup = $('<div class="ts-config-group">');
		caseSetGroup.append($('<div class="ts-config-label">').text("Case Set"));
		var btnGroup = $('<div class="ts-btn-group">');
		var caseSets = _getCaseSetOptions();
		for (var i = 0; i < caseSets.length; i++) {
			var btnClass = _caseSet === caseSets[i] ? "ts-btn-primary" : "ts-btn-ghost";
			btnGroup.append($('<button class="ts-btn ' + btnClass + '" data-caseset="' + caseSets[i] + '">').text(caseSets[i]));
		}
		caseSetGroup.append(btnGroup);
		configGrid.append(caseSetGroup);
		card.append(configGrid);

		var caseSetConfig = _getCaseSetConfig(_caseSet);
		var maxCases = caseSetConfig.maxCases;
		var displayMax = caseSetConfig.displayMax;
		var rangePercent = maxCases > 5 ? ((_sessionLength - 5) / (maxCases - 5)) * 100 : 0;
		rangePercent = Math.max(0, Math.min(100, rangePercent));

		var rangeWrapper = $('<div class="ts-range-wrapper">');
		var rangeDisplay = $('<div class="ts-range-display">');
		rangeDisplay.append($('<span class="ts-config-label">').text("Session Length"));
		rangeDisplay.append($('<span class="ts-data" style="font-size: 13px; color: var(--saffron, #e8a620);">').text(_sessionLength + " cases"));
		rangeWrapper.append(rangeDisplay);

		var rangeTrack = $('<div class="ts-range-track">');
		rangeTrack.append($('<div class="ts-range-fill" style="width: ' + rangePercent + '%;">'));
		rangeTrack.append($('<div class="ts-range-thumb" style="left: ' + rangePercent + '%;">'));
		rangeWrapper.append(rangeTrack);

		var rangeLabels = $('<div class="ts-range-labels">');
		rangeLabels.append($('<span class="ts-label">').text("5 cases"));
		rangeLabels.append($('<span class="ts-label">').text(displayMax));
		rangeWrapper.append(rangeLabels);
		card.append(rangeWrapper);

		card.append($('<div class="ts-divider">'));

		var toggles = [
			{ key: "adaptiveWeighting", label: "Adaptive Weighting", desc: "Weak cases appear more frequently in the queue", value: _adaptiveWeighting },
			{ key: "showHints", label: "Show Algorithm Hints", desc: "Display algorithm notation during drills", value: _showHints },
			{ key: "repeatFailed", label: "Repeat Failed Cases", desc: "Re-queue cases where recognition time exceeds 3s", value: _repeatFailed },
			{ key: "randomizeOrder", label: "Randomize Order", desc: "Shuffle case order instead of priority-based sorting", value: _randomizeOrder }
		];

		for (var t = 0; t < toggles.length; t++) {
			var row = $('<div class="ts-toggle-row">');
			var info = $('<div class="ts-toggle-info">');
			info.append($('<span class="ts-toggle-label">').text(toggles[t].label));
			info.append($('<span class="ts-toggle-desc">').text(toggles[t].desc));
			row.append(info);

			var trackClass = toggles[t].value ? "ts-toggle-track ts-on" : "ts-toggle-track";
			var track = $('<div class="' + trackClass + '" data-toggle="' + toggles[t].key + '">');
			track.append($('<div class="ts-toggle-knob">'));
			row.append(track);
			card.append(row);
		}

		container.find(".ts-precision-card").remove();
		container.append(card);
	}

	function _renderSummaryCard(container) {
		var card = $('<div class="ts-precision-card ts-summary-card">');
		card.append($('<div class="ts-section-label" style="margin-bottom: 20px;">').append($('<h3>').text("Session Plan Summary")));

		var weakCount = 0;
		var warnCount = 0;
		var goodCount = 0;
		var untrainedCount = 0;
		for (var i = 0; i < _casePreview.length; i++) {
			var tier = _casePreview[i].tier;
			if (tier === "weak") weakCount++;
			else if (tier === "warn") warnCount++;
			else if (tier === "good") goodCount++;
			else untrainedCount++;
		}

		var totalCases = _casePreview.length;
		var estMinutes = Math.max(1, Math.round(totalCases * 0.7));
		var weakWeighting = _adaptiveWeighting && weakCount > 0 ? (1 + (weakCount / Math.max(totalCases, 1))).toFixed(1) + "×" : "1.0×";

		var plannedAttempts = _sessionLength;
		var previewCases = _casePreview.length;
		estMinutes = Math.max(1, Math.round(plannedAttempts * 0.7));
		weakWeighting = _adaptiveWeighting && weakCount > 0 ? (1 + (weakCount / Math.max(previewCases, 1))).toFixed(1) + "x" : "1.0x";

		var grid = $('<div class="ts-summary-grid">');
		var stats = [
			{ value: plannedAttempts, label: "Planned Attempts" },
			{ value: weakCount, label: "Weak Cases", color: "var(--weak, #d4564e)" },
			{ value: "~" + estMinutes, label: "Est. Minutes" },
			{ value: weakWeighting, label: "Weak Weighting", color: "var(--saffron, #e8a620)" }
		];
		for (var s = 0; s < stats.length; s++) {
			var stat = $('<div class="ts-summary-stat">');
			stat.append($('<span class="ts-summary-stat-value">').css("color", stats[s].color || "").text(stats[s].value));
			stat.append($('<span class="ts-summary-stat-label">').text(stats[s].label));
			grid.append(stat);
		}
		card.append(grid);

		var weakPercent = previewCases > 0 ? Math.round((weakCount / previewCases) * 100) : 0;
		var progress = $('<div class="ts-progress-track">');
		progress.append($('<div class="ts-progress-fill" style="width: ' + weakPercent + '%; background: var(--weak, #d4564e);">'));
		card.append(progress);

		var legend = $('<div style="display: flex; gap: 16px; flex-wrap: wrap; margin-top: 8px;">');
		legend.append($('<span class="ts-label" style="display: flex; align-items: center; gap: 6px; color: var(--weak, #d4564e);">').append($('<span class="ts-status-dot ts-weak" style="width: 5px; height: 5px;">')).text(" " + weakCount + " Weak"));
		legend.append($('<span class="ts-label" style="display: flex; align-items: center; gap: 6px; color: var(--saffron, #e8a620);">').append($('<span class="ts-status-dot ts-warn" style="width: 5px; height: 5px;">')).text(" " + warnCount + " Learning"));
		legend.append($('<span class="ts-label" style="display: flex; align-items: center; gap: 6px; color: var(--good, #6bba62);">').append($('<span class="ts-status-dot ts-good" style="width: 5px; height: 5px;">')).text(" " + goodCount + " Confident"));
		legend.append($('<span class="ts-label" style="display: flex; align-items: center; gap: 6px; color: var(--text-tertiary, #8a8177);">').append($('<span class="ts-status-dot" style="background: var(--text-tertiary, #6b635a); width: 5px; height: 5px;">')).text(" " + untrainedCount + " Untrained"));
		card.append(legend);

		container.find(".ts-summary-card").remove();
		container.append(card);
	}

	function _bindTemplateSelection(container) {
		container.on("click", ".ts-precision-card[data-template]", function() {
			container.find(".ts-precision-card[data-template]").removeClass("ts-selected");
			$(this).addClass("ts-selected");
			_selectedTemplate = $(this).attr("data-template");
			_applyTemplateDefaults();
			_refreshPreview(container);
		});
	}

	function _bindCaseSetButtons(container) {
		container.on("click", "[data-caseset]", function() {
			container.find("[data-caseset]").removeClass("ts-btn-primary").addClass("ts-btn-ghost");
			$(this).removeClass("ts-btn-ghost").addClass("ts-btn-primary");
			_caseSet = $(this).attr("data-caseset");
			_refreshPreview(container);
		});
	}

	function _bindToggles(container) {
		container.on("click", "[data-toggle]", function() {
			var key = $(this).attr("data-toggle");
			var isOn = $(this).hasClass("ts-on");
			$(this).toggleClass("ts-on");
			if (key === "adaptiveWeighting") _adaptiveWeighting = !isOn;
			if (key === "showHints") _showHints = !isOn;
			if (key === "repeatFailed") _repeatFailed = !isOn;
			if (key === "randomizeOrder") _randomizeOrder = !isOn;
			_refreshPreview(container);
		});
	}

	function _bindSessionName(container) {
		container.on("input", ".ts-input", function() {
			_sessionName = $(this).val();
		});
	}

	function _bindRangeSlider(container) {
		var isDragging = false;
		var _dragDebounce = null;

		function updateFromEvent(e, track) {
			var rect = track.getBoundingClientRect();
			var x = e.clientX || (e.originalEvent && e.originalEvent.touches && e.originalEvent.touches[0] && e.originalEvent.touches[0].clientX);
			if (x === undefined && e.touches && e.touches[0]) x = e.touches[0].clientX;
			if (x === undefined) return;
			
			var percent = (x - rect.left) / rect.width;
			percent = Math.max(0, Math.min(1, percent));
			var maxCases = _getCaseSetConfig(_caseSet).maxCases;
			var newVal = Math.max(5, Math.round(5 + percent * (maxCases - 5)));
			
			if (newVal !== _sessionLength) {
				_sessionLength = newVal;
				// Immediate visual update for the slider components only to avoid heavy re-render during drag
				var $track = $(track);
				var displayPct = ((_sessionLength - 5) / (maxCases - 5)) * 100;
				$track.find(".ts-range-fill").css("width", displayPct + "%");
				$track.find(".ts-range-thumb").css("left", displayPct + "%");
				container.find(".ts-range-display .ts-data").text(_sessionLength + " cases");
				
				// Debounce the full refresh which re-renders case preview and summary cards
				if (_dragDebounce) clearTimeout(_dragDebounce);
				_dragDebounce = setTimeout(function() {
					_refreshPreview(container);
				}, 16); // ~60fps target
			}
		}

		container.on("mousedown touchstart", ".ts-range-track", function(e) {
			isDragging = true;
			$("body").addClass("ts-dragging");
			updateFromEvent(e, this);
			// Prevent text selection and scrolling
			e.preventDefault();
		});

		$(window).on("mousemove.tsRange touchmove.tsRange", function(e) {
			if (!isDragging) return;
			var track = container.find(".ts-range-track")[0];
			if (track) updateFromEvent(e, track);
			if (e.type === "touchmove") e.preventDefault();
		});

		$(window).on("mouseup.tsRange touchend.tsRange", function() {
			if (isDragging) {
				isDragging = false;
				$("body").removeClass("ts-dragging");
				_refreshPreview(container);
			}
		});
	}

	function _bindBackButton(container) {
		container.on("click", ".ts-back-link", function() {
			if (typeof trainerInit !== "undefined") {
				trainerInit.showEntry({ selectedGoal: _selectedGoal });
			} else if (typeof trainerIntegration !== "undefined") {
				trainerIntegration.navigateToSurface("entry", { selectedGoal: _selectedGoal });
			}
		});
	}

	function _bindStartSession(container) {
		container.on("click", ".ts-start-btn", function() {
			_startSession();
		});
	}

	function _bindSaveTemplate(container) {
		container.on("click", ".ts-save-btn", function() {
			_saveAsTemplate();
		});
	}

	function _applyTemplateDefaults() {
		var tmpl = _getSelectedTemplateRecord();
		if (!tmpl) return;

		_caseSet = tmpl.caseSet;
		_sessionLength = tmpl.totalAttempts;

		if (!_sessionName) {
			_sessionName = tmpl.name.replace(/<[^>]*>/g, "");
		}
	}

	function _refreshPreview(container) {
		_sessionLength = Math.max(5, Math.min(_sessionLength, _getCaseSetConfig(_caseSet).maxCases));
		_casePreview = _buildCasePreview(_caseSet, _selectedTemplate === "weakness-blitz");
		_renderCasePreview($(".ts-case-preview-section", container));
		_renderConfigSection($(".ts-config-section", container));
		_renderSummaryCard($(".ts-summary-section", container));
		$(".ts-page-header .ts-tag", container).attr("class", "ts-tag " + _getGoalTagClass()).text(_getGoalLabel());
	}

	function _buildTrainingPlan() {
		var goal = _resolvePlanGoal();

		var caseIds = [];
		for (var j = 0; j < _casePreview.length; j++) {
			caseIds.push(_casePreview[j].caseId);
		}

		var plan = {
			planId: "plan-" + Date.now() + "-" + Math.random().toString(36).substr(2, 6),
			templateId: _selectedTemplate || "custom",
			name: _sessionName || "Training Session",
			goal: goal,
			totalAttempts: _sessionLength,
			drillBlocks: [
				{
					blockId: "main",
					type: "case-drill",
					caseSet: _caseSet === "Cross" ? "cross" : _caseSet,
					caseIds: caseIds,
					targetCount: _sessionLength
				}
			],
			focusSettings: {
				weakCaseBias: _adaptiveWeighting ? 1.0 : 0.5,
				coverageFloor: 0.20,
				sessionMode: "standard",
				showHints: _showHints,
				repeatFailed: _repeatFailed,
				randomizeOrder: _randomizeOrder
			},
			createdAt: new Date().toISOString()
		};

		return plan;
	}

	function _startSession() {
		var plan = _buildTrainingPlan();

		if (typeof trainerIntegration !== "undefined") {
			trainerIntegration.savePlan(plan).then(function(savedPlan) {
				trainerIntegration.setActivePlanId(savedPlan.planId).then(function() {
					if (typeof trainerIntegration.startSession === "function") {
						trainerIntegration.startSession(savedPlan.planId).then(function(session) {
							if (typeof trainerInit !== "undefined") {
								trainerInit.showSurface("active", { planId: savedPlan.planId, sessionId: session.sessionId });
							}
						}).catch(function() {
							if (typeof trainerInit !== "undefined") {
								trainerInit.showSurface("active", { planId: savedPlan.planId });
							}
						});
					} else if (typeof trainerInit !== "undefined") {
						trainerInit.showSurface("active", { planId: savedPlan.planId });
					}
				});
			}).catch(function() {
				if (typeof trainerInit !== "undefined") {
					trainerInit.showSurface("active", { planId: plan.planId });
				}
			});
		}
	}

	function _saveAsTemplate() {
		var plan = _buildTrainingPlan();
		if (typeof trainerIntegration !== "undefined") {
			trainerIntegration.savePlan(plan).then(function() {
			});
		}
	}

	function _getSelectedGoalFromData(data) {
		if (data && data.selectedGoal) {
			return data.selectedGoal;
		}
		return null;
	}

	function render(el, data) {
		_injectStyles();
		_container = $(el);
		_container.empty().addClass("trainer-setup");

		_selectedTemplate = "full-rotation";
		_selectedGoal = "last-layer";
		_sessionName = "";
		_caseSet = "PLL";
		_sessionLength = 21;
		_adaptiveWeighting = true;
		_showHints = true;
		_repeatFailed = false;
		_randomizeOrder = false;

		var selectedGoal = _getSelectedGoalFromData(data);
		if (selectedGoal) {
			_selectedGoal = selectedGoal;
		}
		if (selectedGoal === "cross") {
			_caseSet = "Cross";
			_selectedTemplate = "full-rotation";
			_sessionLength = 10;
		} else if (selectedGoal === "return-to-speed") {
			_selectedTemplate = "quick-review";
			_caseSet = "Both";
			_sessionLength = 10;
		}

		var layout = $('<div class="ts-layout">');
		var main = $('<div class="ts-main">');
		var sidebar = $('<div class="ts-sidebar">');
		layout.append(main).append(sidebar);
		_container.append(layout);

		var header = $('<div class="ts-page-header">');
		header.append($('<button class="ts-back-link">').html('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5m0 0l7 7m-7-7l7-7"/></svg> Back to Trainer'));
		header.append($('<span class="ts-tag ' + _getGoalTagClass() + '">').text(_getGoalLabel()));
		main.append(header);

		var titleGroup = $('<div class="ts-page-title-group">');
		titleGroup.append($('<div class="ts-page-title">').html('Configure your <em>session</em>'));
		titleGroup.append($('<p class="ts-page-subtitle">').text("Pick a template or customize your own drill plan. Settings are saved between sessions."));
		main.append(titleGroup);

		var templateSection = $('<div>');
		templateSection.append($('<div class="ts-section-label">').append($('<h3>').text("Templates")));
		_renderTemplateGrid(templateSection);
		main.append(templateSection);

		var configSection = $('<div class="ts-config-section">');
		configSection.append($('<div class="ts-section-label">').append($('<h3>').text("Session Settings")));
		_renderConfigSection(configSection);
		main.append(configSection);

		var summarySection = $('<div class="ts-summary-section">');
		sidebar.append(summarySection);

		var previewSection = $('<div class="ts-case-preview-section">');
		previewSection.append($('<div class="ts-section-label">').append($('<h3>').text("Drill Queue Preview")));
		sidebar.append(previewSection);

		var actions = $('<div class="ts-actions">');
		actions.append($('<button class="ts-btn ts-btn-primary ts-btn-large ts-start-btn">').html('<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg> Start Session'));
		actions.append($('<button class="ts-btn ts-btn-outline ts-save-btn">').text("Save as Template"));
		sidebar.append(actions);

		var footer = $('<div class="ts-footer">');
		footer.append($('<span class="ts-label">').text("csTimer Trainer v2"));
		footer.append($('<span class="ts-label">').text("Training Plan Setup"));
		_container.append(footer);

		_bindBackButton(_container);
		_bindTemplateSelection(_container);
		_bindCaseSetButtons(_container);
		_bindToggles(_container);
		_bindSessionName(_container);
		_bindRangeSlider(_container);
		_bindStartSession(_container);
		_bindSaveTemplate(_container);

		Promise.all([_getOrCreateProfile(), _loadStats()]).then(function(results) {
			_statsData = results[1] || [];
			_refreshPreview(_container);
		}).catch(function() {
			_statsData = [];
			_refreshPreview(_container);
		});

		_rendered = true;
	}

	function destroy() {
		if (_container) {
			_container.off("click", ".ts-precision-card[data-template]");
			_container.off("click", "[data-caseset]");
			_container.off("click", "[data-toggle]");
			_container.off("click", ".ts-back-link");
			_container.off("click", ".ts-start-btn");
			_container.off("click", ".ts-save-btn");
			_container.off("input", ".ts-input");
			$(window).off(".tsRange");
			_container.empty().removeClass("trainer-setup");
			_container = null;
		}
		_rendered = false;
	}

	return {
		render: render,
		destroy: destroy
	};
});
