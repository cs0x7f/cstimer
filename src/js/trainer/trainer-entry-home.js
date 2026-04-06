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

	function _caseIdStartsWith(caseId, prefix) {
		var normalizedCaseId = String(caseId || "").toUpperCase();
		var normalizedPrefix = String(prefix || "").toUpperCase();
		return normalizedCaseId.indexOf(normalizedPrefix) === 0;
	}

	function _buildStyles() {
		return [
			".trainer-entry { max-width: 1200px; margin: 0 auto; padding: 0 32px 48px; }",
			".trainer-entry .te-nav { display: flex; align-items: center; justify-content: space-between; padding: 24px 0; border-bottom: 1px solid var(--border, rgba(237,232,225,0.08)); margin-bottom: 32px; position: sticky; top: 0; background: var(--bg-dark, #1a1816); z-index: 10; }",
			".trainer-entry .te-logo-group { display: flex; align-items: baseline; gap: 12px; }",
			".trainer-entry .te-logo-mark { width: 28px; height: 28px; background: var(--saffron, #e8a620); border-radius: 3px; display: flex; align-items: center; justify-content: center; position: relative; top: 2px; }",
			".trainer-entry .te-logo-text { font-family: var(--font-display, 'Instrument Serif', serif); font-size: 26px; color: var(--text-primary, #ede8e1); letter-spacing: -0.02em; }",
			".trainer-entry .te-logo-text em { color: var(--saffron, #e8a620); font-style: italic; }",
			".trainer-entry .te-nav-tabs { display: flex; gap: 24px; }",
			".trainer-entry .te-nav-tab { font-size: 13px; color: var(--text-tertiary, #6b635a); text-decoration: none; padding: 8px 0; border-bottom: 2px solid transparent; cursor: pointer; }",
			".trainer-entry .te-nav-tab:hover { color: var(--text-secondary, #9b9388); }",
			".trainer-entry .te-nav-tab.active { color: var(--saffron, #e8a620); border-bottom-color: var(--saffron, #e8a620); }",

			".te-layout { display: flex; gap: 48px; align-items: flex-start; }",
			".te-main { flex: 1; min-width: 0; }",
			".te-sidebar { width: 320px; flex-shrink: 0; position: sticky; top: 100px; }",

			".trainer-entry .te-hero { text-align: left; padding: 0 0 40px; }",
			".trainer-entry .te-hero-title { font-family: var(--font-display, 'Instrument Serif', serif); font-weight: 400; letter-spacing: -0.01em; line-height: 1.05; font-size: 56px; margin-bottom: 20px; color: var(--text-primary, #ede8e1); }",
			".trainer-entry .te-hero-title em { font-style: italic; color: var(--saffron, #e8a620); opacity: 0.9; }",
			".trainer-entry .te-hero-sub { color: var(--text-secondary, #9b9388); font-size: 17px; max-width: 540px; line-height: 1.5; margin-bottom: 0; }",
			
			".trainer-entry .te-goal-grid { display: grid; grid-template-columns: 1fr; gap: 16px; margin-bottom: 32px; }",
			".trainer-entry .te-precision-card { background: var(--surface, #272320); border: 1px solid var(--border, rgba(237,232,225,0.08)); border-radius: 8px; position: relative; overflow: hidden; transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); }",
			".trainer-entry .te-precision-card:hover { border-color: var(--border-accent, rgba(232,166,32,0.35)); background: var(--surface-raised, #302b27); transform: translateY(-2px); box-shadow: 0 12px 30px rgba(0,0,0,0.2); }",
			".trainer-entry .te-precision-card::before { content: ''; position: absolute; top: -1px; left: -1px; width: 12px; height: 12px; border-top: 2px solid var(--saffron, #e8a620); border-left: 2px solid var(--saffron, #e8a620); border-radius: 8px 0 0 0; opacity: 0.5; }",
			
			".trainer-entry .te-goal-card { padding: 24px; cursor: pointer; text-align: left; display: flex; gap: 24px; align-items: center; }",
			".trainer-entry .te-goal-card.selected { border-color: var(--saffron, #e8a620); background: var(--saffron-wash, rgba(232,166,32,0.04)); }",
			".trainer-entry .te-goal-card.selected::before { opacity: 1; }",
			".trainer-entry .te-goal-icon { width: 48px; height: 48px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }",
			".trainer-entry .te-goal-content { flex: 1; }",
			".trainer-entry .te-goal-card-title { font-family: var(--font-display, 'Instrument Serif', serif); font-size: 24px; margin-bottom: 4px; color: var(--text-primary, #ede8e1); }",
			".trainer-entry .te-goal-card p { font-size: 14px; color: var(--text-secondary, #9b9388); line-height: 1.4; margin-bottom: 12px; }",
			".trainer-entry .te-goal-detail { display: flex; flex-wrap: wrap; gap: 12px; }",
			".trainer-entry .te-goal-detail-item { display: flex; align-items: center; gap: 6px; font-size: 11px; color: var(--text-tertiary, #6b635a); font-family: var(--font-mono, 'IBM Plex Mono', monospace); text-transform: uppercase; letter-spacing: 0.05em; }",
			
			".trainer-entry .te-cta { text-align: left; margin-top: 40px; padding-top: 32px; border-top: 1px solid var(--border, rgba(237,232,225,0.08)); }",
			".trainer-entry .te-btn { font-weight: 600; font-size: 13px; letter-spacing: 0.03em; border: none; cursor: pointer; padding: 10px 22px; border-radius: 4px; transition: all 0.2s ease; display: inline-flex; align-items: center; justify-content: center; gap: 8px; }",
			".trainer-entry .te-btn-primary { background: var(--saffron, #e8a620); color: var(--text-inverse, #1a1816); }",
			".trainer-entry .te-btn-primary:hover { background: var(--saffron-dim, #c48a18); transform: translateY(-1px); box-shadow: 0 4px 20px var(--saffron-glow, rgba(232,166,32,0.2)); }",
			".trainer-entry .te-btn-ghost { background: transparent; color: var(--text-tertiary, #6b635a); border: 1px solid var(--border, rgba(237,232,225,0.08)); }",
			".trainer-entry .te-btn-ghost:hover { background: var(--surface-raised, #302b27); color: var(--text-primary, #ede8e1); border-color: var(--text-tertiary, #6b635a); }",
			".trainer-entry .te-btn-large { padding: 14px 32px; font-size: 15px; border-radius: 6px; }",
			
			".trainer-entry .te-section-title { display: flex; align-items: center; gap: 10px; margin: 32px 0 16px; }",
			".trainer-entry .te-section-title:first-child { margin-top: 0; }",
			".trainer-entry .te-section-title h2 { font-family: var(--font-mono, 'IBM Plex Mono', monospace); font-size: 10px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: var(--text-tertiary, #6b635a); }",
			".trainer-entry .te-section-title::after { content: ''; flex: 1; height: 1px; background: var(--border, rgba(237,232,225,0.08)); }",

			".trainer-entry .te-quick-stats { display: flex; flex-direction: column; gap: 8px; margin-bottom: 0; }",
			".trainer-entry .te-stat-cell { background: var(--bg-warm, #1f1c19); border: 1px solid var(--border, rgba(237,232,225,0.08)); border-radius: 8px; padding: 12px 16px; display: flex; justify-content: space-between; align-items: baseline; transition: border-color 0.2s ease; }",
			".trainer-entry .te-stat-cell:hover { border-color: rgba(237,232,225,0.15); }",
			".trainer-entry .te-stat-label { font-family: var(--font-mono, 'IBM Plex Mono', monospace); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-tertiary, #6b635a); }",
			".trainer-entry .te-stat-value { font-family: var(--font-display, 'Instrument Serif', serif); font-size: 20px; color: var(--text-primary, #ede8e1); }",
			".trainer-entry .te-stat-value.te-data { font-family: var(--font-mono, 'IBM Plex Mono', monospace); font-size: 15px; font-weight: 500; }",
			
			".trainer-entry .te-weak-list { display: flex; flex-direction: column; gap: 8px; }",
			".trainer-entry .te-weak-item { background: rgba(212,86,78,0.03); border: 1px solid rgba(212,86,78,0.1); border-radius: 6px; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center; }",
			".trainer-entry .te-weak-info { display: flex; flex-direction: column; }",
			".trainer-entry .te-weak-name { font-family: var(--font-display, 'Instrument Serif', serif); font-size: 16px; color: var(--text-primary, #ede8e1); }",
			".trainer-entry .te-weak-meta { font-family: var(--font-mono, 'IBM Plex Mono', monospace); font-size: 9px; color: var(--text-tertiary, #6b635a); text-transform: uppercase; }",
			".trainer-entry .te-weak-time { font-family: var(--font-mono, 'IBM Plex Mono', monospace); font-size: 13px; color: var(--weak, #d4564e); font-weight: 500; }",

			".trainer-entry .te-recent-grid { display: flex; flex-direction: column; gap: 10px; }",
			".trainer-entry .te-recent-card { padding: 14px; border-color: rgba(237,232,225,0.06); }",
			".trainer-entry .te-recent-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px; }",
			".trainer-entry .te-recent-name { font-family: var(--font-display, 'Instrument Serif', serif); font-size: 15px; color: var(--text-secondary, #9b9388); }",
			".trainer-entry .te-recent-date { font-family: var(--font-mono, 'IBM Plex Mono', monospace); font-size: 9px; color: var(--text-tertiary, #6b635a); }",
			".trainer-entry .te-recent-stats { display: flex; gap: 12px; margin-bottom: 10px; }",
			".trainer-entry .te-recent-stat { display: flex; flex-direction: column; }",
			".trainer-entry .te-recent-stat-value { font-family: var(--font-mono, 'IBM Plex Mono', monospace); font-size: 13px; color: var(--text-primary, #ede8e1); font-weight: 500; }",
			".trainer-entry .te-recent-stat-label { font-family: var(--font-mono, 'IBM Plex Mono', monospace); font-size: 8px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-tertiary, #6b635a); }",
			".trainer-entry .te-progress-track { width: 100%; height: 2px; background: var(--border, rgba(237,232,225,0.08)); border-radius: 1px; }",
			".trainer-entry .te-progress-fill { height: 100%; background: var(--saffron, #e8a620); border-radius: 1px; }",

			".trainer-entry .te-data { font-family: var(--font-mono, 'IBM Plex Mono', monospace); }",
			".trainer-entry .te-footer { margin-top: 64px; padding: 24px 0; border-top: 1px solid var(--border, rgba(237,232,225,0.08)); display: flex; justify-content: space-between; }",
			".trainer-entry .te-footer-label { font-family: var(--font-mono, 'IBM Plex Mono', monospace); font-size: 10px; color: var(--text-tertiary, #6b635a); text-transform: uppercase; letter-spacing: 0.1em; }",
			
			"@media (max-width: 1024px) {",
			"  .te-layout { flex-direction: column; }",
			"  .te-sidebar { width: 100%; position: static; }",
			"  .trainer-entry .te-hero-title { font-size: 42px; }",
			"}",
			"@media (max-width: 768px) {",
			"  .trainer-entry { padding: 0 16px 24px !important; }",
			"  .trainer-entry .te-goal-card { flex-direction: column; align-items: flex-start; gap: 16px; }",
			"  .trainer-entry .te-nav { flex-direction: column; gap: 16px; align-items: flex-start !important; }",
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
		var contentDiv = $('<div class="te-goal-content">');
		var titleDiv = $('<div class="te-goal-card-title">').html(goal.title);
		var desc = $("<p>").text(goal.description);
		var detailDiv = $('<div class="te-goal-detail">');
		for (var i = 0; i < goal.details.length; i++) {
			detailDiv.append($('<div class="te-goal-detail-item">').html('<svg viewBox="0 0 24 24" fill="none" stroke-width="2.5" style="width:10px;height:10px;stroke:var(--saffron,#e8a620);flex-shrink:0"><path d="M5 13l4 4L19 7"/></svg>' + goal.details[i]));
		}
		contentDiv.append(titleDiv).append(desc).append(detailDiv);
		card.append(iconDiv).append(contentDiv);
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
		var section = $('<div class="te-stats-section">');
		section.append($('<div class="te-section-title">').append($("<h2>").text("Global Outlook")));
		var grid = $('<div class="te-quick-stats">');
		for (var i = 0; i < stats.length; i++) {
			var cell = $('<div class="te-stat-cell">');
			cell.append($('<span class="te-stat-label">').text(stats[i].label));
			var valClass = typeof stats[i].value === "number" ? " te-data" : "";
			cell.append($('<span class="te-stat-value' + valClass + '">').css("color", stats[i].color || "").text(stats[i].value));
			grid.append(cell);
		}
		section.append(grid);
		container.append(section);
	}

	function _renderWeakSpots(container, stats) {
		var weakCases = _getTopWeakCases(stats);
		if (weakCases.length === 0) return;

		var section = $('<div class="te-weak-section">');
		section.append($('<div class="te-section-title">').append($("<h2>").text("Critical Weaknesses")));
		var list = $('<div class="te-weak-list">');
		for (var i = 0; i < weakCases.length; i++) {
			var item = $('<div class="te-weak-item">');
			var info = $('<div class="te-weak-info">');
			info.append($('<span class="te-weak-name">').text(weakCases[i].name));
			info.append($('<span class="te-weak-meta">').text(weakCases[i].category));
			item.append(info).append($('<span class="te-weak-time">').text(_formatTime(weakCases[i].time)));
			list.append(item);
		}
		section.append(list);
		container.append(section);
	}

	function _getTopWeakCases(stats) {
		var list = [];
		for (var i = 0; i < stats.length; i++) {
			if ((stats[i].avgSolveTime || 0) > 0) {
				list.push({
					name: stats[i].caseId.replace(/^[^-]+-/, ""),
					category: stats[i].caseId.split("-")[0],
					time: stats[i].avgSolveTime
				});
			}
		}
		list.sort(function(a, b) { return b.time - a.time; });
		return list.slice(0, 3);
	}

	function _renderRecentSessions(container, sessions) {
		var section = $('<div class="te-recent-section">');
		section.append($('<div class="te-section-title">').append($("<h2>").text("Performance History")));
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
			if (_caseIdStartsWith(stats[i].caseId, "PLL-")) {
				pllCount++;
				if (stats[i].attemptCount > 0) {
					pllConfidence += Math.min(100, Math.round((stats[i].attemptCount / 20) * 100));
				}
			}
			if (_caseIdStartsWith(stats[i].caseId, "OLL-")) {
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
		var maxSessions = Math.min(sessions.length, 3);
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
			
			var displayName = "Training Session";
			if (s.planId) {
				displayName = s.planId.replace(/-/g, " ").replace(/\b\w/g, function(c) { return c.toUpperCase(); });
				if (displayName.length > 20) displayName = displayName.substring(0, 18) + "...";
			}

			result.push({
				name: displayName,
				date: _formatSessionDate(s.completedAt || s.startedAt),
				stats: [
					{ value: drillResults.length, label: "Cases" },
					{ value: avgTime > 0 ? _formatTime(avgTime) : "--", label: "Avg" },
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
					{ value: "--", label: "Avg" },
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
			if (typeof trainerInit !== "undefined") {
				trainerInit.showSurface("setup", { selectedGoal: selectedGoal });
			} else if (typeof trainerIntegration !== "undefined") {
				trainerIntegration.navigateToSurface("setup", { selectedGoal: selectedGoal });
			}
		});
	}

	function _bindNavTabs(container) {
		container.on("click", ".te-nav-tab", function() {
			var tab = $(this).text();
			if (tab === "Train") {
				container.find(".te-nav-tab").removeClass("active");
				$(this).addClass("active");
				return;
			}
			if (tab === "Stats") {
				if (typeof trainerInit !== "undefined") {
					trainerInit.showWeaknessSummary();
				} else if (typeof trainerIntegration !== "undefined") {
					trainerIntegration.navigateToSurface("review");
				}
			}
			if (tab === "Timer") {
				if (typeof trainerInit !== "undefined") {
					trainerInit.hide();
				} else if (typeof trainerIntegration !== "undefined") {
					trainerIntegration.navigateToSurface("idle");
				}
			}
		});
	}

	function render(el, data) {
		_injectStyles();
		_container = $(el);
		_container.empty().addClass("trainer-entry");

		// Top Navigation
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

		// Layout Wrapper
		var layout = $('<div class="te-layout">');
		var main = $('<div class="te-main">');
		var sidebar = $('<div class="te-sidebar">');
		layout.append(main).append(sidebar);
		_container.append(layout);

		// MAIN CONTENT
		var hero = $('<div class="te-hero">');
		hero.append($('<h1 class="te-hero-title">').html('What do you want to<br><em>practice today?</em>'));
		hero.append($('<p class="te-hero-sub">').text("The trainer helps you master cases through deliberate, data-driven practice. Choose a focus area below to begin."));
		main.append(hero);

		var goalGrid = $('<div class="te-goal-grid">');
		var goals = _getGoalCards();
		if (data && data.selectedGoal) {
			for (var g = 0; g < goals.length; g++) {
				goals[g].selected = goals[g].id === data.selectedGoal;
			}
		}
		for (var i = 0; i < goals.length; i++) {
			goalGrid.append(_buildGoalCard(goals[i]));
		}
		main.append(goalGrid);

		var cta = $('<div class="te-cta">');
		cta.append($('<button class="te-btn te-btn-primary te-btn-large te-cta-btn">').html('<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg> Begin Training Session'));
		main.append(cta);

		// FOOTER
		var footer = $('<div class="te-footer">');
		footer.append($('<span class="te-footer-label">').text("csTimer Trainer v2.1"));
		footer.append($('<span class="te-footer-label">').text("Precision Drill Engine"));
		_container.append(footer);

		// SIDEBAR CONTENT
		_loadStatsFromStorage().then(function(storageData) {
			var quickStats = _computeQuickStats(storageData.sessions, storageData.stats);
			_renderQuickStats(sidebar, quickStats);
			_renderWeakSpots(sidebar, storageData.stats);
			var recentSessions = _buildRecentSessionList(storageData.sessions);
			_renderRecentSessions(sidebar, recentSessions);
		}).catch(function() {
			_renderQuickStats(sidebar, [
				{ label: "Sessions", value: "0" },
				{ label: "Cases Drilled", value: "0" },
				{ label: "Confidence", value: "--" }
			]);
			_renderRecentSessions(sidebar, [
				{
					name: "<em>First Session</em>",
					date: "No history",
					stats: [
						{ value: "0", label: "Cases" },
						{ value: "--", label: "Avg" }
					],
					progress: 0
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
