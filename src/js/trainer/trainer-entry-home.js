"use strict";

var trainerEntryHome = execMain(function() {

	var _container = null;
	var _rendered = false;
	var _statsSection = null;
	var _recentSection = null;

	function _cssVar(name) {
		return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
	}

	function _formatTime(ms) {
		if (!ms || ms <= 0) return "--";
		var secs = ms / 1000;
		return secs.toFixed(1) + "s";
	}

	function _formatSessionDate(isoStr) {
		if (!isoStr) return "";
		var d = new Date(isoStr);
		var now = new Date();
		var diff = now - d;
		var dayMs = 24 * 60 * 60 * 1000;
		if (diff < dayMs && d.getDate() === now.getDate()) {
			return "Today · " + d.getHours().toString().padStart(2, "0") + ":" + d.getMinutes().toString().padStart(2, "0");
		}
		if (diff < 2 * dayMs) {
			return "Yesterday · " + d.getHours().toString().padStart(2, "0") + ":" + d.getMinutes().toString().padStart(2, "0");
		}
		var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		return months[d.getMonth()] + " " + d.getDate() + " · " + d.getHours().toString().padStart(2, "0") + ":" + d.getMinutes().toString().padStart(2, "0");
	}

	function _buildStyles() {
		return [
			".trainer-entry { max-width: 900px; margin: 0 auto; padding: 48px 32px; }",
			".trainer-entry .te-nav { display: flex; align-items: center; justify-content: space-between; padding: 24px 0; border-bottom: 1px solid var(--border, rgba(237,232,225,0.08)); margin-bottom: 48px; }",
			".trainer-entry .te-logo-group { display: flex; align-items: baseline; gap: 12px; }",
			".trainer-entry .te-logo-mark { width: 28px; height: 28px; background: var(--saffron, #e8a620); border-radius: 3px; display: flex; align-items: center; justify-content: center; position: relative; top: 2px; }",
			".trainer-entry .te-logo-text { font-family: var(--font-display, 'Instrument Serif', serif); font-size: 26px; color: var(--text-primary, #ede8e1); letter-spacing: -0.02em; }",
			".trainer-entry .te-logo-text em { color: var(--saffron, #e8a620); font-style: italic; }",
			".trainer-entry .te-nav-tabs { display: flex; gap: 24px; }",
			".trainer-entry .te-nav-tab { font-size: 13px; color: var(--text-tertiary, #6b635a); text-decoration: none; padding: 8px 0; border-bottom: 2px solid transparent; cursor: pointer; }",
			".trainer-entry .te-nav-tab:hover { color: var(--text-secondary, #9b9388); }",
			".trainer-entry .te-nav-tab.active { color: var(--saffron, #e8a620); border-bottom-color: var(--saffron, #e8a620); }",
			".trainer-entry .te-hero { text-align: center; padding: 48px 0 32px; }",
			".trainer-entry .te-hero-title { font-family: var(--font-display, 'Instrument Serif', serif); font-weight: 400; letter-spacing: -0.01em; line-height: 1.1; font-size: 48px; margin-bottom: 16px; }",
			".trainer-entry .te-hero-title em { font-style: italic; color: var(--saffron, #e8a620); }",
			".trainer-entry .te-hero-sub { color: var(--text-secondary, #9b9388); font-size: 16px; max-width: 500px; margin: 0 auto 24px; }",
			".trainer-entry .te-goal-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 48px; }",
			".trainer-entry .te-precision-card { background: var(--surface, #272320); border: 1px solid var(--border, rgba(237,232,225,0.08)); border-radius: 6px; position: relative; overflow: hidden; transition: border-color 0.3s ease, background 0.3s ease; }",
			".trainer-entry .te-precision-card:hover { border-color: var(--border-accent, rgba(232,166,32,0.25)); background: var(--surface-raised, #302b27); }",
			".trainer-entry .te-precision-card::before { content: ''; position: absolute; top: -1px; left: -1px; width: 8px; height: 8px; border-top: 1.5px solid var(--saffron, #e8a620); border-left: 1.5px solid var(--saffron, #e8a620); border-radius: 6px 0 0 0; }",
			".trainer-entry .te-precision-card::after { content: ''; position: absolute; bottom: -1px; right: -1px; width: 8px; height: 8px; border-bottom: 1.5px solid var(--saffron, #e8a620); border-right: 1.5px solid var(--saffron, #e8a620); border-radius: 0 0 6px 0; }",
			".trainer-entry .te-goal-card { padding: 32px; cursor: pointer; text-align: left; }",
			".trainer-entry .te-goal-card.selected { border-color: var(--saffron, #e8a620); background: var(--saffron-wash, rgba(232,166,32,0.06)); }",
			".trainer-entry .te-goal-icon { width: 40px; height: 40px; border-radius: 6px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }",
			".trainer-entry .te-goal-card-title { font-family: var(--font-display, 'Instrument Serif', serif); font-size: 22px; margin-bottom: 8px; }",
			".trainer-entry .te-goal-card p { font-size: 13px; color: var(--text-secondary, #9b9388); line-height: 1.5; margin-bottom: 16px; }",
			".trainer-entry .te-goal-detail { display: flex; flex-direction: column; gap: 8px; }",
			".trainer-entry .te-goal-detail-item { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--text-tertiary, #6b635a); }",
			".trainer-entry .te-cta { text-align: center; margin-bottom: 48px; }",
			".trainer-entry .te-btn { font-weight: 600; font-size: 13px; letter-spacing: 0.03em; border: none; cursor: pointer; padding: 10px 22px; border-radius: 3px; transition: all 0.2s ease; display: inline-flex; align-items: center; justify-content: center; gap: 8px; }",
			".trainer-entry .te-btn-primary { background: var(--saffron, #e8a620); color: var(--text-inverse, #1a1816); }",
			".trainer-entry .te-btn-primary:hover { background: var(--saffron-dim, #c48a18); box-shadow: 0 0 20px var(--saffron-glow, rgba(232,166,32,0.12)); }",
			".trainer-entry .te-btn-ghost { background: var(--surface, #272320); color: var(--text-secondary, #9b9388); border: 1px solid var(--border, rgba(237,232,225,0.08)); }",
			".trainer-entry .te-btn-ghost:hover { background: var(--surface-raised, #302b27); color: var(--text-primary, #ede8e1); }",
			".trainer-entry .te-btn-large { padding: 14px 40px; font-size: 15px; }",
			".trainer-entry .te-divider { height: 1px; background: var(--border, rgba(237,232,225,0.08)); margin: 48px 0; }",
			".trainer-entry .te-section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }",
			".trainer-entry .te-section-title { display: flex; align-items: center; gap: 12px; }",
			".trainer-entry .te-section-title::before { content: ''; width: 20px; height: 1px; background: var(--saffron, #e8a620); }",
			".trainer-entry .te-section-title h2 { font-family: var(--font-mono, 'IBM Plex Mono', monospace); font-size: 11px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-secondary, #9b9388); }",
			".trainer-entry .te-label { font-family: var(--font-mono, 'IBM Plex Mono', monospace); font-weight: 400; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-tertiary, #6b635a); }",
			".trainer-entry .te-quick-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 48px; }",
			".trainer-entry .te-stat-cell { background: var(--bg-warm, #1f1c19); border: 1px solid var(--border, rgba(237,232,225,0.08)); border-radius: 6px; padding: 16px 24px; display: flex; flex-direction: column; gap: 4px; }",
			".trainer-entry .te-stat-value { font-family: var(--font-display, 'Instrument Serif', serif); font-size: 32px; color: var(--text-primary, #ede8e1); line-height: 1; }",
			".trainer-entry .te-recent-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }",
			".trainer-entry .te-recent-card { padding: 24px; }",
			".trainer-entry .te-recent-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }",
			".trainer-entry .te-recent-name { font-family: var(--font-display, 'Instrument Serif', serif); font-size: 18px; }",
			".trainer-entry .te-recent-date { font-family: var(--font-mono, 'IBM Plex Mono', monospace); font-size: 10px; color: var(--text-tertiary, #6b635a); }",
			".trainer-entry .te-recent-stats { display: flex; gap: 24px; margin-bottom: 12px; }",
			".trainer-entry .te-recent-stat { display: flex; flex-direction: column; gap: 2px; }",
			".trainer-entry .te-recent-stat-value { font-family: var(--font-display, 'Instrument Serif', serif); font-size: 20px; }",
			".trainer-entry .te-recent-stat-label { font-family: var(--font-mono, 'IBM Plex Mono', monospace); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-tertiary, #6b635a); }",
			".trainer-entry .te-progress-track { width: 100%; height: 3px; background: var(--border, rgba(237,232,225,0.08)); border-radius: 2px; overflow: hidden; }",
			".trainer-entry .te-progress-fill { height: 100%; border-radius: 2px; background: var(--saffron, #e8a620); }",
			".trainer-entry .te-data { font-family: var(--font-mono, 'IBM Plex Mono', monospace); font-weight: 400; font-variant-numeric: tabular-nums; }",
			".trainer-entry .te-footer { display: flex; justify-content: space-between; padding: 16px 0; }",
			"@media (max-width: 768px) {",
			"  .trainer-entry { padding: 24px 16px !important; }",
			"  .trainer-entry .te-goal-grid { grid-template-columns: 1fr !important; }",
			"  .trainer-entry .te-recent-grid { grid-template-columns: 1fr !important; }",
			"  .trainer-entry .te-quick-stats { grid-template-columns: repeat(2, 1fr) !important; }",
			"  .trainer-entry .te-hero-title { font-size: 36px !important; }",
			"  .trainer-entry .te-nav { flex-direction: column; gap: 12px; align-items: flex-start !important; }",
			"}"
		].join("");
	}

	function _injectStyles() {
		if ($("#trainer-entry-styles").length === 0) {
			$("<style id='trainer-entry-styles'>" + _buildStyles() + "</style>").appendTo("head");
		}
	}

	function _getGoalCards() {
		return [
			{
				id: "return-to-speed",
				title: "<em>Return to Speed</em>",
				description: "Broad review of all your case families. Perfect for cubers getting back after a break.",
				icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--saffron, #e8a620)" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
				iconBg: "var(--saffron-glow, rgba(232,166,32,0.12))",
				details: ["PLL + OLL + Cross review", "~25 min session", "Adaptive weak-case weighting"],
				selected: true
			},
			{
				id: "last-layer",
				title: "Last Layer",
				description: "Focused PLL and OLL drills weighted toward your weakest recognition and execution cases.",
				icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary, #9b9388)" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/></svg>',
				iconBg: "rgba(237,232,225,0.04)",
				details: ["21 PLL + 57 OLL cases", "~15 min session"],
				selected: false
			},
			{
				id: "cross",
				title: "Cross",
				description: "Dedicated cross planning and execution drills with color-neutral support.",
				icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary, #9b9388)" stroke-width="2"><line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg>',
				iconBg: "rgba(237,232,225,0.04)",
				details: ["White + yellow cross", "~10 min session"],
				selected: false
			}
		];
	}

	function _buildGoalCard(goal) {
		var card = $('<div class="te-precision-card te-goal-card' + (goal.selected ? " selected" : "") + '" data-goal="' + goal.id + '">');
		var iconDiv = $('<div class="te-goal-icon">').css("background", goal.iconBg).html(goal.icon);
		var titleDiv = $('<div class="te-goal-card-title">').html(goal.title);
		var desc = $("<p>").text(goal.description);
		var detailDiv = $('<div class="te-goal-detail">');
		for (var i = 0; i < goal.details.length; i++) {
			detailDiv.append($('<div class="te-goal-detail-item">').html('<svg viewBox="0 0 24 24" fill="none" stroke-width="2" style="width:12px;height:12px;stroke:var(--saffron,#e8a620);flex-shrink:0"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>' + goal.details[i]));
		}
		card.append(iconDiv).append(titleDiv).append(desc).append(detailDiv);
		return card;
	}

	function _buildRecentSessionCard(session) {
		var card = $('<div class="te-precision-card te-recent-card">');
		var header = $('<div class="te-recent-header">');
		header.append($('<div class="te-recent-name">').html(session.name));
		header.append($('<div class="te-recent-date">').text(session.date));
		var stats = $('<div class="te-recent-stats">');
		for (var i = 0; i < session.stats.length; i++) {
			var stat = $('<div class="te-recent-stat">');
			stat.append($('<span class="te-recent-stat-value">').css("color", session.stats[i].color || "").text(session.stats[i].value));
			stat.append($('<span class="te-recent-stat-label">').text(session.stats[i].label));
			stats.append(stat);
		}
		var progress = $('<div class="te-progress-track">');
		progress.append($('<div class="te-progress-fill">').css({ width: session.progress + "%", background: session.progressColor || "var(--saffron, #e8a620)" }));
		card.append(header).append(stats).append(progress);
		return card;
	}

	function _renderQuickStats(container, stats) {
		var grid = $('<div class="te-quick-stats">');
		for (var i = 0; i < stats.length; i++) {
			var cell = $('<div class="te-stat-cell">');
			cell.append($('<span class="te-label">').text(stats[i].label));
			cell.append($('<span class="te-stat-value">').css("color", stats[i].color || "").text(stats[i].value));
			grid.append(cell);
		}
		container.append(grid);
	}

	function _renderRecentSessions(container, sessions) {
		var section = $('<div class="te-recent-section">');
		var header = $('<div class="te-section-header">');
		header.append($('<div class="te-section-title">').append($("<h2>").text("Recent Sessions")));
		header.append($('<button class="te-btn te-btn-ghost">').css({ padding: "6px 14px", fontSize: "12px" }).text("View All"));
		section.append(header);
		var grid = $('<div class="te-recent-grid">');
		for (var i = 0; i < sessions.length; i++) {
			grid.append(_buildRecentSessionCard(sessions[i]));
		}
		section.append(grid);
		container.append(section);
	}

	function _loadStatsFromStorage() {
		if (typeof trainerIntegration === "undefined") {
			return Promise.resolve({ sessions: [], stats: [] });
		}
		return Promise.all([
			trainerIntegration.loadSessions(),
			trainerIntegration.getAllStats()
		]).then(function(results) {
			return { sessions: results[0] || [], stats: results[1] || [] };
		}).catch(function() {
			return { sessions: [], stats: [] };
		});
	}

	function _computeQuickStats(sessions, stats) {
		var sessionCount = sessions.length;
		var totalCases = 0;
		var pllConfidence = 0;
		var ollConfidence = 0;
		var pllCount = 0;
		var ollCount = 0;
		for (var i = 0; i < stats.length; i++) {
			totalCases += stats[i].attemptCount || 0;
			if (stats[i].caseId && stats[i].caseId.indexOf("pll") === 0) {
				pllCount++;
				if (stats[i].attemptCount > 0) {
					pllConfidence += Math.min(100, Math.round((stats[i].attemptCount / 20) * 100));
				}
			}
			if (stats[i].caseId && stats[i].caseId.indexOf("oll") === 0) {
				ollCount++;
				if (stats[i].attemptCount > 0) {
					ollConfidence += Math.min(100, Math.round((stats[i].attemptCount / 20) * 100));
				}
			}
		}
		if (pllCount > 0) pllConfidence = Math.round(pllConfidence / pllCount);
		if (ollCount > 0) ollConfidence = Math.round(ollConfidence / ollCount);
		return [
			{ label: "Sessions", value: sessionCount },
			{ label: "Cases Drilled", value: totalCases },
			{ label: "PLL Confidence", value: pllConfidence + "%", color: pllConfidence >= 60 ? "var(--good, #6bba62)" : "var(--weak, #d4564e)" },
			{ label: "OLL Confidence", value: ollConfidence + "%", color: ollConfidence >= 60 ? "var(--good, #6bba62)" : "var(--weak, #d4564e)" }
		];
	}

	function _buildRecentSessionList(sessions) {
		var result = [];
		var maxSessions = Math.min(sessions.length, 4);
		for (var i = sessions.length - 1; i >= sessions.length - maxSessions && i >= 0; i--) {
			var s = sessions[i];
			var drillResults = s.drillResults || [];
			var weakCount = (s.weakCases || []).length;
			var avgTime = 0;
			var totalSolves = 0;
			for (var j = 0; j < drillResults.length; j++) {
				if (!drillResults[j].isDnf && !drillResults[j].isSkipped) {
					avgTime += drillResults[j].solveTime || 0;
					totalSolves++;
				}
			}
			if (totalSolves > 0) avgTime = avgTime / totalSolves;
			var progress = totalSolves > 0 ? Math.min(100, Math.round((totalSolves / Math.max(drillResults.length, 1)) * 100)) : 0;
			var progressColor = progress >= 70 ? "var(--good, #6bba62)" : progress >= 40 ? "var(--saffron, #e8a620)" : "var(--weak, #d4564e)";
			result.push({
				name: (s.planId || "Training Session").replace(/-/g, " ").replace(/\b\w/g, function(c) { return c.toUpperCase(); }),
				date: _formatSessionDate(s.completedAt || s.startedAt),
				stats: [
					{ value: drillResults.length, label: "Cases" },
					{ value: avgTime > 0 ? _formatTime(avgTime) : "--", label: "Avg Time", color: avgTime > 0 && avgTime < 15000 ? "var(--good, #6bba62)" : "" },
					{ value: weakCount, label: "Weak" }
				],
				progress: progress,
				progressColor: progressColor
			});
		}
		if (result.length === 0) {
			result.push({
				name: "<em>First Session</em>",
				date: "No sessions yet",
				stats: [
					{ value: "0", label: "Cases" },
					{ value: "--", label: "Avg Time" },
					{ value: "0", label: "Weak" }
				],
				progress: 0,
				progressColor: "var(--saffron, #e8a620)"
			});
		}
		return result;
	}

	function _bindGoalSelection(container) {
		container.on("click", ".te-goal-card", function() {
			container.find(".te-goal-card").removeClass("selected");
			$(this).addClass("selected");
		});
	}

	function _bindCta(container, shell) {
		container.on("click", ".te-cta-btn", function() {
			var selectedGoal = container.find(".te-goal-card.selected").attr("data-goal");
			if (typeof trainerIntegration !== "undefined") {
				trainerIntegration.navigateToSurface("setup", { selectedGoal: selectedGoal });
			}
		});
	}

	function _bindNavTabs(container) {
		container.on("click", ".te-nav-tab", function() {
			var tab = $(this).text();
			if (tab === "Stats" && typeof trainerIntegration !== "undefined") {
				trainerIntegration.navigateToSurface("review");
			}
		});
	}

	function render(el, data) {
		_injectStyles();
		_container = $(el);
		_container.empty().addClass("trainer-entry");

		var navBar = $('<nav class="te-nav">');
		var logoGroup = $('<div class="te-logo-group">');
		logoGroup.append($('<div class="te-logo-mark">').html('<svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:var(--text-inverse,#1a1816)"><path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.09-.36.18-.57.18s-.41-.09-.57-.18l-7.9-4.44A.991.991 0 013 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.09.36-.18.57-.18s.41.09.57.18l7.9 4.44c.32.17.53.5.53.88v9z"/></svg>'));
		logoGroup.append($('<div class="te-logo-text">').html('csTimer <em>Trainer</em>'));
		navBar.append(logoGroup);
		var navTabs = $('<div class="te-nav-tabs">');
		navTabs.append($('<span class="te-nav-tab active">').text("Train"));
		navTabs.append($('<span class="te-nav-tab">').text("Stats"));
		navTabs.append($('<span class="te-nav-tab">').text("Timer"));
		navBar.append(navTabs);
		_container.append(navBar);

		var hero = $('<div class="te-hero">');
		hero.append($('<div class="te-hero-title">').html('What do you want to<br><em>practice today?</em>'));
		hero.append($('<p class="te-hero-sub">').text("Choose a training goal below. The trainer will build a focused session plan based on your recent performance and weakest cases."));
		_container.append(hero);

		var goalGrid = $('<div class="te-goal-grid">');
		var goals = _getGoalCards();
		for (var i = 0; i < goals.length; i++) {
			goalGrid.append(_buildGoalCard(goals[i]));
		}
		_container.append(goalGrid);

		var cta = $('<div class="te-cta">');
		cta.append($('<button class="te-btn te-btn-primary te-btn-large te-cta-btn">').html('<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg> Begin Training Session'));
		cta.append($('<p>').css({ fontSize: "12px", color: "var(--text-tertiary, #6b635a)", marginTop: "12px" }).html('Or press <span class="te-data" style="font-size:11px;color:var(--text-secondary,#9b9388)">T</span> to start with your last configuration'));
		_container.append(cta);

		_container.append($('<div class="te-divider">'));

		var statsSection = $('<div>');
		var statsHeader = $('<div class="te-section-header">');
		statsHeader.append($('<div class="te-section-title">').append($("<h2>").text("Your Progress")));
		statsHeader.append($('<span class="te-label">').text("Last 30 days"));
		statsSection.append(statsHeader);
		_container.append(statsSection);

		var recentSection = $('<div>');
		_container.append(recentSection);

		var footer = $('<div class="te-footer">');
		footer.append($('<span class="te-label">').text("csTimer Trainer v2"));
		footer.append($('<span class="te-label">').text("Trainer Entry"));
		_container.append(footer);

		_loadStatsFromStorage().then(function(storageData) {
			var quickStats = _computeQuickStats(storageData.sessions, storageData.stats);
			_statsSection = statsSection;
			_renderQuickStats(statsSection, quickStats);
			var recentSessions = _buildRecentSessionList(storageData.sessions);
			_renderRecentSessions(recentSection, recentSessions);
		}).catch(function() {
			_renderQuickStats(statsSection, [
				{ label: "Sessions", value: "0" },
				{ label: "Cases Drilled", value: "0" },
				{ label: "PLL Confidence", value: "--" },
				{ label: "OLL Confidence", value: "--" }
			]);
			_renderRecentSessions(recentSection, [
				{
					name: "<em>First Session</em>",
					date: "No sessions yet",
					stats: [
						{ value: "0", label: "Cases" },
						{ value: "--", label: "Avg Time" },
						{ value: "0", label: "Weak" }
					],
					progress: 0,
					progressColor: "var(--saffron, #e8a620)"
				}
			]);
		});

		_bindGoalSelection(_container);
		_bindCta(_container);
		_bindNavTabs(_container);
		_rendered = true;
	}

	function destroy() {
		if (_container) {
			_container.off("click", ".te-goal-card");
			_container.off("click", ".te-cta-btn");
			_container.off("click", ".te-nav-tab");
			_container.empty().removeClass("trainer-entry");
			_container = null;
		}
		_rendered = false;
	}

	return {
		render: render,
		destroy: destroy
	};
});
