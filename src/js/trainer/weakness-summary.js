"use strict";

var weaknessSummary = execMain(function() {

	var _container = null;
	var _rendered = false;
	var _activeCategory = "PLL";
	var _allStats = [];
	var _catalog = [];

	function _cssVar(name) {
		return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
	}

	function _formatTime(ms) {
		if (!ms || ms <= 0) return "--";
		var secs = ms / 1000;
		return secs.toFixed(2) + "s";
	}

	function _buildStyles() {
		return [
			".weakness-summary { max-width: 1000px; margin: 0 auto; padding: 48px 32px; }",
			".weakness-summary .ws-page-header { display: flex; align-items: flex-end; justify-content: space-between; padding-bottom: 16px; border-bottom: 1px solid var(--border, rgba(237,232,225,0.08)); margin-bottom: 48px; }",
			".weakness-summary .ws-page-title { font-family: var(--font-display, 'Instrument Serif', serif); font-size: 36px; margin-bottom: 8px; }",
			".weakness-summary .ws-page-title em { font-style: italic; color: var(--saffron, #e8a620); }",
			".weakness-summary .ws-page-subtitle { color: var(--text-secondary, #9b9388); font-size: 14px; }",
			".weakness-summary .ws-nav-tabs { display: flex; gap: 0; background: var(--surface, #272320); border: 1px solid var(--border, rgba(237,232,225,0.08)); border-radius: 3px; overflow: hidden; }",
			".weakness-summary .ws-nav-tab { font-size: 12px; color: var(--text-tertiary, #6b635a); padding: 8px 16px; cursor: pointer; transition: all 0.2s; border-right: 1px solid var(--border, rgba(237,232,225,0.08)); }",
			".weakness-summary .ws-nav-tab:last-child { border-right: none; }",
			".weakness-summary .ws-nav-tab:hover { color: var(--text-secondary, #9b9388); background: var(--surface-raised, #302b27); }",
			".weakness-summary .ws-nav-tab.active { color: var(--saffron, #e8a620); background: var(--saffron-wash, rgba(232,166,32,0.06)); }",
			".weakness-summary .ws-section-label { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }",
			".weakness-summary .ws-section-title { display: flex; align-items: center; gap: 12px; }",
			".weakness-summary .ws-section-title::before { content: ''; width: 16px; height: 1px; background: var(--saffron, #e8a620); }",
			".weakness-summary .ws-section-title h3 { font-family: var(--font-mono, 'IBM Plex Mono', monospace); font-size: 11px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-secondary, #9b9388); }",
			".weakness-summary .ws-stats-row { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; margin-bottom: 48px; }",
			".weakness-summary .ws-stat-cell { background: var(--bg-warm, #1f1c19); border: 1px solid var(--border, rgba(237,232,225,0.08)); border-radius: 6px; padding: 16px 24px; display: flex; flex-direction: column; gap: 4px; }",
			".weakness-summary .ws-stat-value { font-family: var(--font-display, 'Instrument Serif', serif); font-size: 28px; line-height: 1; }",
			".weakness-summary .ws-stat-label { font-family: var(--font-mono, 'IBM Plex Mono', monospace); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-tertiary, #6b635a); }",
			".weakness-summary .ws-confidence-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 48px; }",
			".weakness-summary .ws-precision-card { background: var(--surface, #272320); border: 1px solid var(--border, rgba(237,232,225,0.08)); border-radius: 6px; position: relative; overflow: hidden; transition: border-color 0.3s ease, background 0.3s ease; }",
			".weakness-summary .ws-precision-card:hover { border-color: var(--border-accent, rgba(232,166,32,0.25)); background: var(--surface-raised, #302b27); }",
			".weakness-summary .ws-precision-card::before { content: ''; position: absolute; top: -1px; left: -1px; width: 8px; height: 8px; border-top: 1.5px solid var(--saffron, #e8a620); border-left: 1.5px solid var(--saffron, #e8a620); border-radius: 6px 0 0 0; }",
			".weakness-summary .ws-precision-card::after { content: ''; position: absolute; bottom: -1px; right: -1px; width: 8px; height: 8px; border-bottom: 1.5px solid var(--saffron, #e8a620); border-right: 1.5px solid var(--saffron, #e8a620); border-radius: 0 0 6px 0; }",
			".weakness-summary .ws-confidence-panel { padding: 24px; }",
			".weakness-summary .ws-confidence-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }",
			".weakness-summary .ws-confidence-title { font-family: var(--font-display, 'Instrument Serif', serif); font-size: 24px; }",
			".weakness-summary .ws-confidence-score { font-family: var(--font-display, 'Instrument Serif', serif); font-size: 48px; line-height: 1; }",
			".weakness-summary .ws-confidence-breakdown { display: flex; flex-direction: column; gap: 12px; margin-top: 16px; }",
			".weakness-summary .ws-confidence-row { display: flex; align-items: center; gap: 12px; }",
			".weakness-summary .ws-confidence-row-label { font-size: 12px; color: var(--text-secondary, #9b9388); width: 80px; flex-shrink: 0; }",
			".weakness-summary .ws-confidence-row-bar { flex: 1; }",
			".weakness-summary .ws-confidence-row-value { font-family: var(--font-mono, 'IBM Plex Mono', monospace); font-size: 11px; width: 36px; text-align: right; }",
			".weakness-summary .ws-progress-track { width: 100%; height: 6px; background: var(--border, rgba(237,232,225,0.08)); border-radius: 2px; overflow: hidden; }",
			".weakness-summary .ws-progress-fill { height: 100%; border-radius: 2px; }",
			".weakness-summary .ws-tag { font-family: var(--font-mono, 'IBM Plex Mono', monospace); font-size: 10px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; padding: 3px 8px; border-radius: 3px; display: inline-flex; align-items: center; gap: 5px; }",
			".weakness-summary .ws-tag-weak { background: var(--weak-dim, rgba(212,86,78,0.15)); color: var(--weak, #d4564e); }",
			".weakness-summary .ws-tag-good { background: var(--good-dim, rgba(107,186,98,0.15)); color: var(--good, #6bba62); }",
			".weakness-summary .ws-tag-saffron { background: var(--saffron-glow, rgba(232,166,32,0.12)); color: var(--saffron, #e8a620); }",
			".weakness-summary .ws-status-dot { width: 6px; height: 6px; border-radius: 50%; display: inline-block; flex-shrink: 0; }",
			".weakness-summary .ws-status-dot.good { background: var(--good, #6bba62); box-shadow: 0 0 6px var(--good, #6bba62); }",
			".weakness-summary .ws-status-dot.weak { background: var(--weak, #d4564e); box-shadow: 0 0 6px var(--weak, #d4564e); }",
			".weakness-summary .ws-label { font-family: var(--font-mono, 'IBM Plex Mono', monospace); font-weight: 400; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-tertiary, #6b635a); }",
			".weakness-summary .ws-data { font-family: var(--font-mono, 'IBM Plex Mono', monospace); font-weight: 400; font-variant-numeric: tabular-nums; }",
			".weakness-summary .ws-ranking-table { width: 100%; border-collapse: collapse; }",
			".weakness-summary .ws-ranking-table th { font-family: var(--font-mono, 'IBM Plex Mono', monospace); font-size: 10px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-tertiary, #6b635a); text-align: left; padding: 12px 16px; border-bottom: 1px solid var(--border, rgba(237,232,225,0.08)); position: sticky; top: 0; background: var(--surface, #272320); }",
			".weakness-summary .ws-ranking-table td { padding: 12px 16px; border-bottom: 1px solid var(--border, rgba(237,232,225,0.08)); font-size: 13px; vertical-align: middle; }",
			".weakness-summary .ws-ranking-table tr:hover td { background: var(--surface-raised, #302b27); }",
			".weakness-summary .ws-rank-num { font-family: var(--font-mono, 'IBM Plex Mono', monospace); font-size: 11px; color: var(--text-tertiary, #6b635a); width: 30px; }",
			".weakness-summary .ws-case-name { font-family: var(--font-display, 'Instrument Serif', serif); font-size: 16px; white-space: nowrap; }",
			".weakness-summary .ws-time-cell { font-family: var(--font-mono, 'IBM Plex Mono', monospace); font-size: 13px; white-space: nowrap; }",
			".weakness-summary .ws-trend-cell { display: flex; align-items: center; gap: 4px; font-family: var(--font-mono, 'IBM Plex Mono', monospace); font-size: 11px; }",
			".weakness-summary .ws-trend-up { color: var(--good, #6bba62); }",
			".weakness-summary .ws-trend-down { color: var(--weak, #d4564e); }",
			".weakness-summary .ws-trend-flat { color: var(--text-tertiary, #6b635a); }",
			".weakness-summary .ws-conf-bar { height: 4px; border-radius: 2px; background: var(--border, rgba(237,232,225,0.08)); }",
			".weakness-summary .ws-conf-bar-fill { height: 100%; border-radius: 2px; }",
			".weakness-summary .ws-drill-btn { font-family: var(--font-mono, 'IBM Plex Mono', monospace); font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--saffron, #e8a620); background: none; border: 1px solid var(--border-accent, rgba(232,166,32,0.25)); padding: 4px 10px; border-radius: 3px; cursor: pointer; transition: all 0.2s; }",
			".weakness-summary .ws-drill-btn:hover { background: var(--saffron-wash, rgba(232,166,32,0.06)); }",
			".weakness-summary .ws-btn { font-weight: 600; font-size: 13px; letter-spacing: 0.03em; border: none; cursor: pointer; padding: 10px 22px; border-radius: 3px; transition: all 0.2s ease; display: inline-flex; align-items: center; justify-content: center; gap: 8px; }",
			".weakness-summary .ws-btn-primary { background: var(--saffron, #e8a620); color: var(--text-inverse, #1a1816); }",
			".weakness-summary .ws-btn-primary:hover { background: var(--saffron-dim, #c48a18); box-shadow: 0 0 20px var(--saffron-glow, rgba(232,166,32,0.12)); }",
			".weakness-summary .ws-btn-ghost { background: var(--surface, #272320); color: var(--text-secondary, #9b9388); border: 1px solid var(--border, rgba(237,232,225,0.08)); }",
			".weakness-summary .ws-btn-ghost:hover { background: var(--surface-raised, #302b27); color: var(--text-primary, #ede8e1); }",
			".weakness-summary .ws-divider { height: 1px; background: var(--border, rgba(237,232,225,0.08)); margin: 48px 0; }",
			".weakness-summary .ws-sparkline { display: flex; align-items: flex-end; gap: 2px; height: 24px; }",
			".weakness-summary .ws-spark-bar { width: 4px; border-radius: 1px; }",
			".weakness-summary .ws-trend-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 32px; }",
			".weakness-summary .ws-trend-card { padding: 24px; }",
			".weakness-summary .ws-footer { display: flex; justify-content: space-between; padding: 16px 0; }",
			"@media (max-width: 768px) {",
			"  .weakness-summary { padding: 24px 16px !important; }",
			"  .weakness-summary .ws-confidence-grid { grid-template-columns: 1fr !important; }",
			"  .weakness-summary .ws-stats-row { grid-template-columns: repeat(3, 1fr) !important; }",
			"  .weakness-summary .ws-page-header { flex-direction: column; gap: 16px; align-items: flex-start !important; }",
			"  .weakness-summary .ws-page-title { font-size: 28px !important; }",
			"  .weakness-summary .ws-trend-grid { grid-template-columns: 1fr !important; }",
			"}"
		].join("");
	}

	function _injectStyles() {
		if ($("#weakness-summary-styles").length === 0) {
			$("<style id='weakness-summary-styles'>" + _buildStyles() + "</style>").appendTo("head");
		}
	}

	function _getCategoryStats(stats, category) {
		var filtered = [];
		for (var i = 0; i < stats.length; i++) {
			if (stats[i].caseId && stats[i].caseId.indexOf(category.toLowerCase()) === 0) {
				filtered.push(stats[i]);
			}
		}
		return filtered;
	}

	function _getCatalogCases(category) {
		var filtered = [];
		for (var i = 0; i < _catalog.length; i++) {
			if (_catalog[i].category === category) {
				filtered.push(_catalog[i]);
			}
		}
		return filtered;
	}

	function _computeConfidenceScore(caseStats) {
		if (caseStats.length === 0) return 0;
		var total = 0;
		var count = 0;
		for (var i = 0; i < caseStats.length; i++) {
			if (caseStats[i].attemptCount > 0) {
				var score = Math.min(100, Math.round((caseStats[i].attemptCount / 20) * 100));
				total += score;
				count++;
			}
		}
		return count > 0 ? Math.round(total / count) : 0;
	}

	function _classifyCases(caseStats) {
		var mastered = 0, learning = 0, weak = 0, untrained = 0;
		for (var i = 0; i < caseStats.length; i++) {
			var attempts = caseStats[i].attemptCount || 0;
			if (attempts === 0) {
				untrained++;
			} else if (attempts >= 15) {
				mastered++;
			} else if (attempts >= 5) {
				learning++;
			} else {
				weak++;
			}
		}
		return { mastered: mastered, learning: learning, weak: weak, untrained: untrained };
	}

	function _buildConfidencePanel(container, category, score, classification, totalCount) {
		var panel = $('<div class="ws-precision-card ws-confidence-panel">');
		var header = $('<div class="ws-confidence-header">');
		header.append($('<div class="ws-confidence-title">').text(category));
		var tagClass = score >= 70 ? "ws-tag-good" : score >= 40 ? "ws-tag-saffron" : "ws-tag-weak";
		var dotClass = score >= 70 ? "good" : score >= 40 ? "warn" : "weak";
		var tagLabel = score >= 70 ? "Strong" : score >= 40 ? "Learning" : "Needs Work";
		header.append($('<span class="ws-tag ' + tagClass + '">').html('<span class="ws-status-dot ' + dotClass + '"></span>' + tagLabel));
		var scoreColor = score >= 70 ? "var(--good, #6bba62)" : score >= 40 ? "var(--saffron, #e8a620)" : "var(--weak, #d4564e)";
		var scoreEl = $('<div class="ws-confidence-score">').css("color", scoreColor).text(score + "%");
		var breakdown = $('<div class="ws-confidence-breakdown">');
		var categories = [
			{ label: "Mastered", count: classification.mastered, color: "var(--good, #6bba62)" },
			{ label: "Learning", count: classification.learning, color: "var(--saffron, #e8a620)" },
			{ label: "Weak", count: classification.weak, color: "var(--weak, #d4564e)" },
			{ label: "Untrained", count: classification.untrained, color: "var(--text-tertiary, #6b635a)" }
		];
		for (var i = 0; i < categories.length; i++) {
			var row = $('<div class="ws-confidence-row">');
			var pct = totalCount > 0 ? Math.round((categories[i].count / totalCount) * 100) : 0;
			row.append($('<span class="ws-confidence-row-label">').css("color", categories[i].color).text(categories[i].label));
			var barContainer = $('<div class="ws-confidence-row-bar">');
			barContainer.append($('<div class="ws-progress-track">').append($('<div class="ws-progress-fill">').css({ width: pct + "%", background: categories[i].color })));
			row.append(barContainer);
			row.append($('<span class="ws-confidence-row-value">').css("color", categories[i].color).text(categories[i].count));
			breakdown.append(row);
		}
		panel.append(header).append(scoreEl).append(breakdown);
		container.append(panel);
	}

	function _buildRankingRow(caseRecord, stat, index) {
		var tr = $("<tr>");
		var avgTime = stat && stat.avgSolveTime ? stat.avgSolveTime : 0;
		var bestTime = stat && stat.bestSolveTime ? stat.bestSolveTime : 0;
		var attempts = stat ? stat.attemptCount || 0 : 0;
		var confidence = attempts > 0 ? Math.min(100, Math.round((attempts / 20) * 100)) : 0;
		var confColor = confidence >= 70 ? "var(--good, #6bba62)" : confidence >= 40 ? "var(--saffron, #e8a620)" : "var(--weak, #d4564e)";
		var tagClass = confidence >= 70 ? "ws-tag-good" : confidence >= 40 ? "ws-tag-saffron" : "ws-tag-weak";
		var dotClass = confidence >= 70 ? "good" : "";
		var caseName = caseRecord ? caseRecord.name || caseRecord.caseId : (stat ? stat.caseId : "");
		tr.append($('<td class="ws-rank-num">').text(index + 1));
		tr.append($('<td class="ws-case-name">').css("color", confidence < 40 ? "var(--weak, #d4564e)" : "").html(confidence < 40 ? "<em>" + caseName + "</em>" : caseName));
		tr.append($('<td class="ws-time-cell">').css("color", avgTime > 15000 ? "var(--weak, #d4564e)" : "").text(avgTime > 0 ? _formatTime(avgTime) : "--"));
		tr.append($('<td class="ws-time-cell">').text(bestTime > 0 ? _formatTime(bestTime) : "--"));
		tr.append($('<td>').html('<span class="ws-trend-cell ws-trend-flat">— --</span>'));
		var tagHtml = dotClass ? '<span class="ws-status-dot ' + dotClass + '"></span>' : '';
		tr.append($('<td>').html('<span class="ws-tag ' + tagClass + '">' + tagHtml + confidence + '%</span>'));
		tr.append($('<td>').append($('<div class="ws-conf-bar">').append($('<div class="ws-conf-bar-fill">').css({ width: confidence + "%", background: confColor }))));
		tr.append($('<td class="ws-data">').css({ fontSize: "11px", color: "var(--text-tertiary, #6b635a)" }).text(attempts));
		tr.append($('<td>').css("text-align", "right").append($('<button class="ws-drill-btn">').text("Drill")));
		return tr;
	}

	function _renderStatsOverview(container, sessions, stats) {
		var row = $('<div class="ws-stats-row">');
		var totalSessions = sessions.length;
		var totalCases = 0;
		var totalRecognition = 0;
		var recogCount = 0;
		var weakCount = 0;
		for (var i = 0; i < stats.length; i++) {
			totalCases += stats[i].attemptCount || 0;
			if (stats[i].avgRecognitionTime > 0) {
				totalRecognition += stats[i].avgRecognitionTime;
				recogCount++;
			}
		}
		var avgRecog = recogCount > 0 ? totalRecognition / recogCount : 0;
		var overallConfidence = _computeConfidenceScore(stats);
		for (var j = 0; j < stats.length; j++) {
			var attempts = stats[j].attemptCount || 0;
			if (attempts > 0 && attempts < 5) weakCount++;
		}
		var statCells = [
			{ label: "Total Sessions", value: totalSessions },
			{ label: "Cases Trained", value: totalCases },
			{ label: "Avg Recognition", value: avgRecog > 0 ? _formatTime(avgRecog) : "--", color: "var(--saffron, #e8a620)" },
			{ label: "Confidence", value: overallConfidence + "%", color: overallConfidence >= 60 ? "var(--good, #6bba62)" : "var(--weak, #d4564e)" },
			{ label: "Weak Cases", value: weakCount, color: weakCount > 0 ? "var(--weak, #d4564e)" : "" }
		];
		for (var k = 0; k < statCells.length; k++) {
			var cell = $('<div class="ws-stat-cell">');
			cell.append($('<span class="ws-stat-label">').text(statCells[k].label));
			cell.append($('<span class="ws-stat-value">').css("color", statCells[k].color || "").text(statCells[k].value));
			row.append(cell);
		}
		container.append(row);
	}

	function _renderConfidencePanels(container, stats) {
		var grid = $('<div class="ws-confidence-grid">');
		var categories = ["PLL", "OLL"];
		for (var i = 0; i < categories.length; i++) {
			var catStats = _getCategoryStats(stats, categories[i]);
			var catalogCases = _getCatalogCases(categories[i]);
			var totalCount = catalogCases.length || 21;
			var score = _computeConfidenceScore(catStats);
			var classification = _classifyCases(catStats);
			_buildConfidencePanel(grid, categories[i], score, classification, totalCount);
		}
		container.append(grid);
	}

	function _renderRankingTable(container, stats, category) {
		var section = $('<div>');
		var label = $('<div class="ws-section-label">');
		var title = $('<div class="ws-section-title">').append($("<h3>").text("Case Rankings — " + category));
		label.append(title);
		var actions = $('<div>').css("display", "flex").css("gap", "12px");
		actions.append($('<button class="ws-btn ws-btn-ghost">').css({ padding: "6px 12px", fontSize: "11px" }).text("Sort: Slowest First"));
		actions.append($('<button class="ws-btn ws-btn-primary">').css({ padding: "6px 14px", fontSize: "11px" }).html('<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg> Drill Weak Cases'));
		label.append(actions);
		section.append(label);

		var card = $('<div class="ws-precision-card">').css({ padding: 0, "overflow-x": "auto" });
		var table = $('<table class="ws-ranking-table">');
		var thead = $("<thead>").html('<tr><th>#</th><th>Case</th><th>Avg Time</th><th>Best</th><th>Trend</th><th>Confidence</th><th class="ws-bar-cell">Distribution</th><th>Drills</th><th class="ws-action-cell" style="text-align:right">Action</th></tr>');
		table.append(thead);
		var tbody = $("<tbody>");

		var catStats = _getCategoryStats(stats, category);
		var catalogCases = _getCatalogCases(category);
		var statMap = {};
		for (var i = 0; i < catStats.length; i++) {
			statMap[catStats[i].caseId] = catStats[i];
		}

		var sorted = [];
		for (var j = 0; j < catalogCases.length; j++) {
			var caseId = catalogCases[j].caseId;
			sorted.push({ caseRecord: catalogCases[j], stat: statMap[caseId] || null });
		}
		sorted.sort(function(a, b) {
			var aTime = a.stat ? a.stat.avgSolveTime || 0 : 0;
			var bTime = b.stat ? b.stat.avgSolveTime || 0 : 0;
			return bTime - aTime;
		});

		for (var k = 0; k < sorted.length; k++) {
			tbody.append(_buildRankingRow(sorted[k].caseRecord, sorted[k].stat, k));
		}
		table.append(tbody);
		card.append(table);
		if (sorted.length > 10) {
			card.append($('<div>').css({ "text-align": "center", padding: "16px" }).append($('<span class="ws-label">').css({ cursor: "pointer", color: "var(--text-secondary, #9b9388)" }).text("Show all " + sorted.length + " " + category + " cases ↓")));
		}
		section.append(card);
		container.append(section);
	}

	function _renderTrends(container) {
		var section = $('<div>');
		var label = $('<div class="ws-section-label">');
		label.append($('<div class="ws-section-title">').append($("<h3>").text("30-Day Trend")));
		section.append(label);

		var card = $('<div class="ws-precision-card ws-trend-card">');
		var grid = $('<div class="ws-trend-grid">');

		var trends = [
			{ label: "Avg Recognition Time", value: "1.95s", delta: "↓ 0.35s", deltaColor: "var(--good, #6bba62)", decreasing: true },
			{ label: "Confidence Score", value: "82%", delta: "↑ 18%", deltaColor: "var(--good, #6bba62)", increasing: true },
			{ label: "Weak Case Count", value: "3", delta: "↓ from 7", deltaColor: "var(--good, #6bba62)", decreasing: true }
		];

		for (var i = 0; i < trends.length; i++) {
			var t = trends[i];
			var col = $("<div>");
			col.append($('<div class="ws-label">').css("margin-bottom", "12px").text(t.label));
			var valueRow = $('<div>').css({ display: "flex", "align-items": "baseline", gap: "12px" });
			valueRow.append($('<span>').css({ "font-family": "var(--font-display, 'Instrument Serif', serif)", "font-size": "32px" }).text(t.value));
			valueRow.append($('<span class="ws-data">').css({ "font-size": "12px", color: t.deltaColor }).text(t.delta));
			col.append(valueRow);
			var sparkline = $('<div class="ws-sparkline">').css("margin-top", "16px");
			var barHeights = t.decreasing ? [100, 92, 85, 88, 80, 75, 72, 68, 65, 60, 62, 58, 55, 52] : [35, 38, 42, 45, 50, 55, 60, 65, 70, 72, 75, 78, 80, 82];
			for (var j = 0; j < barHeights.length; j++) {
				var h = barHeights[j];
				var color = h >= 70 ? "var(--good, #6bba62)" : h >= 50 ? "var(--saffron, #e8a620)" : "var(--weak, #d4564e)";
				sparkline.append($('<div class="ws-spark-bar">').css({ height: h + "%", background: color }));
			}
			col.append(sparkline);
			grid.append(col);
		}
		card.append(grid);
		section.append(card);
		container.append(section);
	}

	function _loadData() {
		if (typeof trainerIntegration === "undefined") {
			return Promise.resolve({ sessions: [], stats: [], catalog: [] });
		}
		return Promise.all([
			trainerIntegration.loadSessions(),
			trainerIntegration.getAllStats(),
			Promise.resolve(trainerIntegration.getCatalog())
		]).then(function(results) {
			return { sessions: results[0] || [], stats: results[1] || [], catalog: results[2] || [] };
		}).catch(function() {
			return { sessions: [], stats: [], catalog: [] };
		});
	}

	function _bindTabSwitching(container) {
		container.on("click", ".ws-nav-tab", function() {
			container.find(".ws-nav-tab").removeClass("active");
			$(this).addClass("active");
			_activeCategory = $(this).text();
			_refreshRanking(container);
		});
	}

	function _refreshRanking(container) {
		container.find(".ws-ranking-section").empty();
		_renderRankingTable(container.find(".ws-ranking-section"), _allStats, _activeCategory);
	}

	function render(el, data) {
		_injectStyles();
		_container = $(el);
		_container.empty().addClass("weakness-summary");

		var header = $('<div class="ws-page-header">');
		var left = $('<div>');
		left.append($('<div class="ws-page-title">').html('Weakness <em>Summary</em>'));
		left.append($('<p class="ws-page-subtitle">').text("Persistent training insights across all sessions · Updated after each drill"));
		header.append(left);
		var tabs = $('<div class="ws-nav-tabs">');
		tabs.append($('<span class="ws-nav-tab active">').text("PLL"));
		tabs.append($('<span class="ws-nav-tab">').text("OLL"));
		tabs.append($('<span class="ws-nav-tab">').text("Cross"));
		tabs.append($('<span class="ws-nav-tab">').text("All"));
		header.append(tabs);
		_container.append(header);

		var statsOverview = $('<div>');
		_container.append(statsOverview);

		var confidencePanels = $('<div>');
		_container.append(confidencePanels);

		var rankingSection = $('<div class="ws-ranking-section">');
		_container.append(rankingSection);

		_container.append($('<div class="ws-divider">'));

		var trendsSection = $('<div>');
		_container.append(trendsSection);

		var footer = $('<div class="ws-footer">');
		footer.append($('<span class="ws-label">').text("csTimer Trainer v2"));
		footer.append($('<span class="ws-label">').text("Weakness Summary"));
		_container.append(footer);

		_loadData().then(function(storageData) {
			_allStats = storageData.stats;
			_catalog = storageData.catalog;
			_renderStatsOverview(statsOverview, storageData.sessions, storageData.stats);
			_renderConfidencePanels(confidencePanels, storageData.stats);
			_renderRankingTable(rankingSection, storageData.stats, _activeCategory);
			_renderTrends(trendsSection);
			_bindTabSwitching(_container);
		}).catch(function() {
			_renderStatsOverview(statsOverview, [], []);
			_renderConfidencePanels(confidencePanels, []);
			_renderRankingTable(rankingSection, [], _activeCategory);
			_renderTrends(trendsSection);
			_bindTabSwitching(_container);
		});

		_rendered = true;
	}

	function destroy() {
		if (_container) {
			_container.off("click", ".ws-nav-tab");
			_container.empty().removeClass("weakness-summary");
			_container = null;
		}
		_allStats = [];
		_catalog = [];
		_rendered = false;
	}

	return {
		render: render,
		destroy: destroy
	};
});
