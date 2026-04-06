"use strict";

var weaknessSummary = execMain(function() {

	var _container = null;
	var _activeCategory = "PLL";
	var _sessions = [];
	var _stats = [];
	var _catalog = [];
	var _mainContent = null;
	var _sidebar = null;

	function _formatTime(ms) {
		if (!ms || ms <= 0) {
			return "--";
		}
		return (ms / 1000).toFixed(2) + "s";
	}

	function _normalizeCategory(category) {
		return String(category || "ALL").toUpperCase();
	}

	function _matchesCategory(caseId, category) {
		var normalizedCategory = _normalizeCategory(category);
		var normalizedCaseId = String(caseId || "").toUpperCase();
		if (normalizedCategory === "ALL") {
			return true;
		}
		if (normalizedCategory === "CROSS") {
			return normalizedCaseId.indexOf("CROSS-") === 0;
		}
		return normalizedCaseId.indexOf(normalizedCategory + "-") === 0;
	}

	function _getCategoryStats(category) {
		var filtered = [];
		for (var i = 0; i < _stats.length; i++) {
			if (_matchesCategory(_stats[i].caseId, category)) {
				filtered.push(_stats[i]);
			}
		}
		return filtered;
	}

	function _getCatalogCases(category) {
		var filtered = [];
		for (var i = 0; i < _catalog.length; i++) {
			if (_matchesCategory(_catalog[i].caseId, category) || _normalizeCategory(_catalog[i].category) === _normalizeCategory(category)) {
				filtered.push(_catalog[i]);
			}
		}
		return filtered;
	}

	function _getStatsMap(stats) {
		var map = {};
		for (var i = 0; i < stats.length; i++) {
			map[stats[i].caseId] = stats[i];
		}
		return map;
	}

	function _computeConfidenceScore(stats) {
		if (!stats.length) {
			return 0;
		}
		var total = 0;
		var count = 0;
		for (var i = 0; i < stats.length; i++) {
			if ((stats[i].attemptCount || 0) > 0) {
				total += Math.min(100, Math.round((stats[i].attemptCount / 20) * 100));
				count += 1;
			}
		}
		return count ? Math.round(total / count) : 0;
	}

	function _classifyCases(catalogCases, stats) {
		var statsMap = _getStatsMap(stats);
		var result = {
			mastered: 0,
			learning: 0,
			weak: 0,
			untrained: 0
		};

		for (var i = 0; i < catalogCases.length; i++) {
			var stat = statsMap[catalogCases[i].caseId];
			var attempts = stat ? stat.attemptCount || 0 : 0;
			if (attempts === 0) {
				result.untrained += 1;
			} else if (attempts >= 15) {
				result.mastered += 1;
			} else if (attempts >= 5) {
				result.learning += 1;
			} else {
				result.weak += 1;
			}
		}

		return result;
	}

	function _countRelevantSessions(category) {
		var total = 0;
		for (var i = 0; i < _sessions.length; i++) {
			var drillResults = _sessions[i].drillResults || [];
			for (var j = 0; j < drillResults.length; j++) {
				if (_matchesCategory(drillResults[j].caseId, category)) {
					total += 1;
					break;
				}
			}
		}
		return total;
	}

	function _buildTrendSeries(category) {
		var relevantSessions = [];
		for (var i = 0; i < _sessions.length; i++) {
			var drillResults = _sessions[i].drillResults || [];
			var filtered = [];
			for (var j = 0; j < drillResults.length; j++) {
				if (_matchesCategory(drillResults[j].caseId, category)) {
					filtered.push(drillResults[j]);
				}
			}
			if (filtered.length) {
				relevantSessions.push({
					session: _sessions[i],
					results: filtered
				});
			}
		}

		relevantSessions = relevantSessions.slice(-12);
		if (!relevantSessions.length) {
			return {
				recognition: [0],
				confidence: [0],
				weakCount: [0]
			};
		}

		var recognition = [];
		var confidence = [];
		var weakCount = [];

		for (var k = 0; k < relevantSessions.length; k++) {
			var results = relevantSessions[k].results;
			var recognitionTotal = 0;
			var recognitionCount = 0;
			var successCount = 0;
			for (var r = 0; r < results.length; r++) {
				if (results[r].recognitionTime > 0) {
					recognitionTotal += results[r].recognitionTime;
					recognitionCount += 1;
				}
				if (!results[r].isDnf && !results[r].isSkipped) {
					successCount += 1;
				}
			}
			recognition.push(recognitionCount ? Math.round(recognitionTotal / recognitionCount) : 0);
			confidence.push(results.length ? Math.round((successCount / results.length) * 100) : 0);

			var sessionWeakCases = relevantSessions[k].session.weakCases || [];
			var weakForCategory = 0;
			for (var w = 0; w < sessionWeakCases.length; w++) {
				if (_matchesCategory(sessionWeakCases[w].caseId, category)) {
					weakForCategory += 1;
				}
			}
			weakCount.push(weakForCategory);
		}

		return {
			recognition: recognition,
			confidence: confidence,
			weakCount: weakCount
		};
	}

	function _getTrendCardData(category) {
		var series = _buildTrendSeries(category);
		var recognitionNow = series.recognition[series.recognition.length - 1] || 0;
		var recognitionStart = series.recognition[0] || 0;
		var confidenceNow = series.confidence[series.confidence.length - 1] || 0;
		var confidenceStart = series.confidence[0] || 0;
		var weakNow = series.weakCount[series.weakCount.length - 1] || 0;
		var weakStart = series.weakCount[0] || 0;

		return [
			{
				label: "Recognition",
				value: recognitionNow > 0 ? _formatTime(recognitionNow) : "--",
				deltaColor: recognitionNow <= recognitionStart ? "var(--good, #6bba62)" : "var(--weak, #d4564e)",
				bars: series.recognition,
				inverted: true
			},
			{
				label: "Confidence",
				value: confidenceNow + "%",
				deltaColor: confidenceNow >= confidenceStart ? "var(--good, #6bba62)" : "var(--weak, #d4564e)",
				bars: series.confidence,
				inverted: false
			},
			{
				label: "Weak Cases",
				value: String(weakNow),
				deltaColor: weakNow <= weakStart ? "var(--good, #6bba62)" : "var(--weak, #d4564e)",
				bars: series.weakCount,
				inverted: true
			}
		];
	}

	function _renderSparkline(container, values, inverted) {
		var sparkline = $('<div class="ws-sparkline"></div>');
		var maxValue = 0;
		for (var i = 0; i < values.length; i++) {
			maxValue = Math.max(maxValue, values[i]);
		}
		if (maxValue <= 0) {
			maxValue = 1;
		}

		for (var j = 0; j < values.length; j++) {
			var pct = Math.round((values[j] / maxValue) * 100);
			var normalizedHeight = inverted ? Math.max(30, 100 - pct + 20) : Math.max(30, pct);
			var color = normalizedHeight >= 70 ? "var(--good, #6bba62)" : normalizedHeight >= 45 ? "var(--saffron, #e8a620)" : "var(--weak, #d4564e)";
			sparkline.append($('<div class="ws-spark-bar"></div>').css({
				height: normalizedHeight + "%",
				background: color
			}));
		}

		container.append(sparkline);
	}

	function _renderStatsOverview(container) {
		container.empty();
		var categoryStats = _getCategoryStats(_activeCategory);
		var categoryCatalog = _getCatalogCases(_activeCategory);
		var categoryClassification = _classifyCases(categoryCatalog, categoryStats);
		var totalRecognition = 0;
		var recognitionCount = 0;
		var trainedCount = 0;
		for (var i = 0; i < categoryStats.length; i++) {
			if ((categoryStats[i].attemptCount || 0) > 0) {
				trainedCount += 1;
			}
			if ((categoryStats[i].avgRecognitionTime || 0) > 0) {
				totalRecognition += categoryStats[i].avgRecognitionTime;
				recognitionCount += 1;
			}
		}

		var statCells = [
			{ label: "Total Sessions", value: _countRelevantSessions(_activeCategory) },
			{ label: "Cases Trained", value: _normalizeCategory(_activeCategory) === "ALL" ? String(trainedCount) : trainedCount + " / " + categoryCatalog.length },
			{ label: "Avg Recognition", value: recognitionCount ? _formatTime(totalRecognition / recognitionCount) : "--", color: "var(--saffron, #e8a620)" },
			{ label: "Confidence Score", value: _computeConfidenceScore(categoryStats) + "%", color: _computeConfidenceScore(categoryStats) >= 60 ? "var(--good, #6bba62)" : "var(--weak, #d4564e)" },
			{ label: "Active Weak Spots", value: categoryClassification.weak, color: categoryClassification.weak > 0 ? "var(--weak, #d4564e)" : "" }
		];

		container.append($('<div class="ws-section-label">').append($('<h3>').text("Global Outlook")));
		var grid = $('<div class="ws-stats-vertical"></div>');
		for (var j = 0; j < statCells.length; j++) {
			var cell = $('<div class="ws-stat-cell-compact"></div>');
			cell.append($('<span class="ws-stat-label-tiny"></span>').text(statCells[j].label));
			cell.append($('<span class="ws-stat-value-mid"></span>').css("color", statCells[j].color || "").text(statCells[j].value));
			grid.append(cell);
		}
		container.append(grid);
	}

	function _renderConfidencePanels(container) {
		container.empty();
		container.append($('<div class="ws-section-label">').append($('<h3>').text("Mastery Calibration")));
		var grid = $('<div class="ws-confidence-grid"></div>');
		var categories = ["PLL", "OLL"];
		for (var i = 0; i < categories.length; i++) {
			var category = categories[i];
			var categoryStats = _getCategoryStats(category);
			var categoryCatalog = _getCatalogCases(category);
			var score = _computeConfidenceScore(categoryStats);
			var classification = _classifyCases(categoryCatalog, categoryStats);
			var tagClass = score >= 70 ? "ws-tag-good" : score >= 40 ? "ws-tag-saffron" : "ws-tag-weak";
			var dotClass = score >= 70 ? "good" : score >= 40 ? "warn" : "weak";
			var tagText = score >= 70 ? "Strong" : score >= 40 ? "Learning" : "Needs Work";
			var scoreColor = score >= 70 ? "var(--good, #6bba62)" : score >= 40 ? "var(--saffron, #e8a620)" : "var(--weak, #d4564e)";

			var panel = $('<div class="ws-precision-card ws-confidence-panel"></div>');
			var header = $('<div class="ws-confidence-header"></div>');
			header.append($('<div class="ws-confidence-title"></div>').text(category));
			header.append($('<span class="ws-tag ' + tagClass + '"></span>').html('<span class="ws-status-dot ' + dotClass + '"></span>' + tagText));
			panel.append(header);
			panel.append($('<div class="ws-confidence-score"></div>').css("color", scoreColor).text(score + "%"));

			var breakdown = $('<div class="ws-confidence-breakdown"></div>');
			var rows = [
				{ label: "Mastered", count: classification.mastered, color: "var(--good, #6bba62)" },
				{ label: "Learning", count: classification.learning, color: "var(--saffron, #e8a620)" },
				{ label: "Weak", count: classification.weak, color: "var(--weak, #d4564e)" }
			];
			for (var r = 0; r < rows.length; r++) {
				var pct = categoryCatalog.length ? Math.round((rows[r].count / categoryCatalog.length) * 100) : 0;
				var row = $('<div class="ws-confidence-row"></div>');
				row.append($('<span class="ws-confidence-row-label"></span>').css("color", rows[r].color).text(rows[r].label));
				row.append($('<div class="ws-confidence-row-bar"></div>').append($('<div class="ws-progress-track"></div>').append($('<div class="ws-progress-fill"></div>').css({
					width: pct + "%",
					background: rows[r].color
				}))));
				row.append($('<span class="ws-confidence-row-value"></span>').css("color", rows[r].color).text(rows[r].count));
				breakdown.append(row);
			}
			panel.append(breakdown);
			grid.append(panel);
		}
		container.append(grid);
	}

	function _buildRankingRow(caseRecord, stat, index) {
		var attempts = stat ? stat.attemptCount || 0 : 0;
		var confidence = attempts ? Math.min(100, Math.round((attempts / 20) * 100)) : 0;
		var confColor = confidence >= 70 ? "var(--good, #6bba62)" : confidence >= 40 ? "var(--saffron, #e8a620)" : "var(--weak, #d4564e)";
		var trendIcons = { "stable": "···", "declining": "↓", "improving": "↑" };
		var trend = stat && stat.trend ? stat.trend : "stable";
		var trendText = trendIcons[trend] || "···";
		var trendClass = "ws-trend-" + (trend === "improving" ? "up" : trend === "declining" ? "down" : "flat");

		var row = $("<tr></tr>");
		row.append($('<td class="ws-rank-num"></td>').text(index + 1));
		row.append($('<td class="ws-case-name"></td>').html(caseRecord.name));
		row.append($('<td class="ws-time-cell"></td>').css("color", stat && stat.avgSolveTime > 4000 ? "var(--weak, #d4564e)" : "var(--text-primary)").text(stat && stat.avgSolveTime ? _formatTime(stat.avgSolveTime) : "--"));
		row.append($('<td class="ws-time-cell ws-data-dim"></td>').text(stat && stat.bestSolveTime ? _formatTime(stat.bestSolveTime) : "--"));
		row.append($('<td></td>').html('<span class="ws-trend-indicator ' + trendClass + '">' + trendText + '</span>'));
		row.append($('<td></td>').html('<div class="ws-conf-pill ' + (confidence >= 70 ? "good" : confidence >= 40 ? "warn" : "weak") + '">' + confidence + '%</div>'));
		row.append($('<td class="ws-rank-actions"></td>').append($('<button class="ws-mini-drill-btn"></button>').attr("data-case-id", caseRecord.caseId).attr("data-category", caseRecord.category).text("DRILL")));
		return row;
	}

	function _renderRankingTable(container) {
		container.empty();
		var category = _activeCategory;
		var categoryStats = _getCategoryStats(category);
		var categoryCatalog = _getCatalogCases(category);
		var statsMap = _getStatsMap(categoryStats);
		var ordered = [];
		for (var i = 0; i < categoryCatalog.length; i++) {
			ordered.push({
				caseRecord: categoryCatalog[i],
				stat: statsMap[categoryCatalog[i].caseId] || null
			});
		}
		ordered.sort(function(a, b) {
			var aTime = a.stat ? a.stat.avgSolveTime || 0 : 0;
			var bTime = b.stat ? b.stat.avgSolveTime || 0 : 0;
			if (bTime !== aTime) {
				return bTime - aTime;
			}
			return a.caseRecord.caseId < b.caseRecord.caseId ? -1 : (a.caseRecord.caseId > b.caseRecord.caseId ? 1 : 0);
		});

		var header = $('<div class="ws-section-label"></div>');
		header.append($('<div class="ws-section-title"></div>').append($('<h3>').text("Targeted Case Rankings")));
		var actions = $('<div style="display:flex;gap:12px;"></div>');
		actions.append($('<button class="ws-btn-ghost-tiny ws-drill-weak-btn"></button>').attr("data-category", category).html('<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polygon points="5 3 19 12 5 21 5 3"/></svg> Drill Weakest'));
		header.append(actions);
		container.append(header);

		var card = $('<div class="ws-precision-card" style="padding: 0;"></div>');
		var table = $('<table class="ws-ranking-table"></table>');
		table.append($('<thead></thead>').html('<tr><th>#</th><th>Case</th><th>Avg Time</th><th>Best</th><th>Trend</th><th>Conf.</th><th style="text-align:right"></th></tr>'));
		var tbody = $('<tbody></tbody>');
		var limit = category === "ALL" ? 20 : ordered.length;
		for (var j = 0; j < Math.min(ordered.length, limit); j++) {
			tbody.append(_buildRankingRow(ordered[j].caseRecord, ordered[j].stat, j));
		}
		table.append(tbody);
		card.append(table);
		container.append(card);
	}

	function _renderTrends(container) {
		container.empty();
		container.append($('<div class="ws-section-label" style="margin-top:32px;">').append($('<h3>').text("Performance Trends")));

		var grid = $('<div class="ws-trend-grid-sidebar"></div>');
		var cards = _getTrendCardData(_activeCategory);
		for (var i = 0; i < cards.length; i++) {
			var block = $('<div class="ws-trend-block"></div>');
			var header = $('<div class="ws-trend-header-sidebar"></div>');
			header.append($('<span class="ws-stat-label-tiny"></span>').text(cards[i].label));
			header.append($('<span class="ws-stat-value-tiny"></span>').text(cards[i].value));
			block.append(header);
			_renderSparkline(block, cards[i].bars, cards[i].inverted);
			grid.append(block);
		}
		container.append(grid);
	}

	function _refresh() {
		if (!_container) return;
		_renderStatsOverview(_sidebar.find(".ws-stats-container"));
		_renderTrends(_sidebar.find(".ws-trends-container"));
		_renderConfidencePanels(_mainContent.find(".ws-confidence-container"));
		_renderRankingTable(_mainContent.find(".ws-ranking-container"));
	}

	function _goalForCategory(category) {
		var normalizedCategory = _normalizeCategory(category);
		if (normalizedCategory === "CROSS") return "cross";
		if (normalizedCategory === "RETURNING") return "return-to-speed";
		return "last-layer";
	}

	function _bindEvents() {
		_container.on("click", ".te-nav-tab", function() {
			var tab = $(this).text();
			if (tab === "Train") {
				if (typeof trainerInit !== "undefined") trainerInit.showEntry();
			} else if (tab === "Timer") {
				if (typeof trainerInit !== "undefined") trainerInit.hide();
			}
		});

		_container.on("click", ".ws-sub-nav-tab", function() {
			_container.find(".ws-sub-nav-tab").removeClass("active");
			$(this).addClass("active");
			_activeCategory = $(this).attr("data-category");
			_refresh();
		});

		_container.on("click", ".ws-mini-drill-btn", function() {
			if (typeof trainerInit !== "undefined") {
				trainerInit.showSurface("setup", {
					selectedGoal: _goalForCategory($(this).attr("data-category")),
					focusCaseId: $(this).attr("data-case-id"),
					focusCategory: $(this).attr("data-category")
				});
			}
		});

		_container.on("click", ".ws-drill-weak-btn", function() {
			if (typeof trainerInit !== "undefined") {
				trainerInit.showSurface("setup", {
					selectedGoal: _goalForCategory($(this).attr("data-category")),
					focusCategory: $(this).attr("data-category")
				});
			}
		});
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

	function _buildStyles() {
		return [
			".weakness-summary { max-width: 1200px; margin: 0 auto; padding: 0 32px 64px; color: var(--text-primary, #ede8e1); font-family: var(--font-sans, 'Inter', sans-serif); }",
			".weakness-summary .te-nav { display: flex; align-items: center; justify-content: space-between; padding: 24px 0; border-bottom: 1px solid var(--border, rgba(237,232,225,0.08)); margin-bottom: 48px; position: sticky; top: 0; background: var(--bg-dark, #1a1816); z-index: 10; }",
			".weakness-summary .te-logo-group { display: flex; align-items: baseline; gap: 12px; }",
			".weakness-summary .te-logo-mark { width: 28px; height: 28px; background: var(--saffron, #e8a620); border-radius: 3px; display: flex; align-items: center; justify-content: center; }",
			".weakness-summary .te-logo-text { font-family: var(--font-display, 'Instrument Serif', Georgia, serif); font-size: 26px; color: var(--text-primary, #ede8e1); letter-spacing: -0.02em; }",
			".weakness-summary .te-logo-text em { color: var(--saffron, #e8a620); font-style: italic; }",
			".weakness-summary .te-nav-tabs { display: flex; gap: 24px; }",
			".weakness-summary .te-nav-tab { font-size: 13px; color: var(--text-tertiary, #6b635a); text-decoration: none; padding: 8px 0; border-bottom: 2px solid transparent; cursor: pointer; transition: all 0.2s; }",
			".weakness-summary .te-nav-tab.active { color: var(--saffron, #e8a620); border-bottom-color: var(--saffron, #e8a620); }",
			
			".ws-layout { display: flex; gap: 48px; align-items: flex-start; }",
			".ws-main { flex: 1; min-width: 0; }",
			".ws-sidebar { width: 300px; flex-shrink: 0; position: sticky; top: 100px; }",

			".ws-page-header-minimal { margin-bottom: 32px; }",
			".ws-page-title { font-family: var(--font-display, 'Instrument Serif', Georgia, serif); font-size: 48px; line-height: 1.1; margin-bottom: 8px; }",
			".ws-page-title em { font-style: italic; color: var(--saffron, #e8a620); }",
			".ws-page-subtitle { color: var(--text-secondary, #9b9388); font-size: 16px; font-family: var(--font-sans, sans-serif); }",

			".ws-sub-nav { display: flex; gap: 16px; margin-bottom: 32px; padding: 4px; background: rgba(237,232,225,0.03); border-radius: 6px; width: fit-content; }",
			".ws-sub-nav-tab { font-size: 11px; font-family: var(--font-mono, monospace); text-transform: uppercase; letter-spacing: 0.1em; padding: 6px 14px; cursor: pointer; border-radius: 4px; color: var(--text-tertiary, #6b635a); transition: all 0.2s; }",
			".ws-sub-nav-tab:hover { color: var(--text-secondary, #9b9388); }",
			".ws-sub-nav-tab.active { background: var(--surface-raised, #302b27); color: var(--saffron, #e8a620); box-shadow: 0 2px 8px rgba(0,0,0,0.2); }",

			".ws-section-label { display: flex; align-items: center; justify-content: space-between; margin: 32px 0 16px; }",
			".ws-section-label h3 { font-family: var(--font-mono, monospace); font-size: 10px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: var(--text-tertiary, #6b635a); }",
			".ws-section-label::after { content: ''; flex: 1; height: 1px; background: var(--border, rgba(237,232,225,0.08)); margin-left:12px; }",

			".ws-precision-card { background: var(--surface, #272320); border: 1px solid var(--border, rgba(237,232,225,0.08)); border-radius: 8px; position: relative; overflow: hidden; padding: 24px; }",
			".ws-precision-card::before { content: ''; position: absolute; top: -1px; left: -1px; width: 10px; height: 10px; border-top: 2px solid var(--saffron, #e8a620); border-left: 2px solid var(--saffron, #e8a620); border-radius: 8px 0 0 0; opacity: 0.6; }",

			".ws-confidence-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 32px; }",
			".ws-confidence-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }",
			".ws-confidence-title { font-family: var(--font-display, Georgia, serif); font-size: 20px; }",
			".ws-confidence-score { font-family: var(--font-display, Georgia, serif); font-size: 36px; margin-bottom: 16px; }",
			".ws-confidence-breakdown { display: flex; flex-direction: column; gap: 8px; }",
			".ws-confidence-row { display: flex; align-items: center; gap: 10px; font-size: 11px; }",
			".ws-confidence-row-label { width: 64px; color: var(--text-tertiary, #6b635a); font-family: var(--font-mono, monospace); text-transform: uppercase; font-size: 9px; }",
			".ws-confidence-row-bar { flex: 1; height: 4px; background: rgba(237,232,225,0.05); border-radius: 2px; overflow: hidden; }",
			".ws-progress-fill { height: 100%; border-radius: 2px; transition: width 0.6s ease; }",
			".ws-confidence-row-value { width: 24px; text-align: right; font-family: var(--font-mono, monospace); }",

			".ws-stats-vertical { display: flex; flex-direction: column; gap: 10px; }",
			".ws-stat-cell-compact { background: var(--bg-warm, #1f1c19); border: 1px solid var(--border, rgba(237,232,225,0.05)); border-radius: 6px; padding: 12px 16px; display: flex; justify-content: space-between; align-items: baseline; }",
			".ws-stat-label-tiny { font-family: var(--font-mono, monospace); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-tertiary, #6b635a); }",
			".ws-stat-value-mid { font-family: var(--font-display, Georgia, serif); font-size: 22px; color: var(--text-primary, #ede8e1); }",
			".ws-stat-value-tiny { font-family: var(--font-mono, monospace); font-size: 14px; font-weight: 500; }",

			".ws-trend-grid-sidebar { display: flex; flex-direction: column; gap: 16px; }",
			".ws-trend-block { background: rgba(237,232,225,0.02); padding: 12px; border-radius: 6px; border: 1px solid rgba(237,232,225,0.04); }",
			".ws-trend-header-sidebar { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px; }",
			".ws-sparkline { display: flex; align-items: flex-end; gap: 2px; height: 20px; }",
			".ws-spark-bar { width: 3px; border-radius: 0.5px; min-height: 2px; }",

			".ws-ranking-table { width: 100%; border-collapse: collapse; }",
			".ws-ranking-table th { text-align: left; padding: 12px 16px; font-family: var(--font-mono, monospace); font-size: 9px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--text-tertiary, #6b635a); border-bottom: 1px solid var(--border, rgba(237,232,225,0.06)); }",
			".ws-ranking-table td { padding: 10px 16px; border-bottom: 1px solid rgba(237,232,225,0.03); font-size: 13px; vertical-align: middle; }",
			".ws-ranking-table tr:hover td { background: rgba(237,232,225,0.02); }",
			".ws-rank-num { width: 30px; font-family: var(--font-mono, monospace); color: var(--text-tertiary, #6b635a); font-size: 11px; }",
			".ws-case-name { font-family: var(--font-display, Georgia, serif); font-size: 16px; color: var(--text-primary); }",
			".ws-time-cell { font-family: var(--font-mono, monospace); font-size: 13px; font-weight: 500; }",
			".ws-data-dim { color: var(--text-tertiary, #6b635a); }",
			".ws-trend-indicator { font-family: var(--font-mono, monospace); font-weight: bold; }",
			".ws-trend-up { color: var(--good, #6bba62); }",
			".ws-trend-down { color: var(--weak, #d4564e); }",
			".ws-trend-flat { color: var(--text-tertiary, #6b635a); }",
			".ws-conf-pill { display: inline-block; padding: 2px 6px; border-radius: 3px; font-family: var(--font-mono, monospace); font-size: 10px; font-weight: 600; }",
			".ws-conf-pill.good { background: rgba(107,186,98,0.12); color: var(--good, #6bba62); }",
			".ws-conf-pill.warn { background: rgba(232,166,32,0.12); color: var(--saffron, #e8a620); }",
			".ws-conf-pill.weak { background: rgba(212,86,78,0.12); color: var(--weak, #d4564e); }",

			".ws-tag { font-family: var(--font-mono, monospace); font-size: 9px; text-transform: uppercase; letter-spacing: 0.05em; padding: 2px 8px; border-radius: 3px; display: inline-flex; align-items: center; gap: 6px; }",
			".ws-tag-good { background: rgba(107,186,98,0.1); color: var(--good, #6bba62); }",
			".ws-tag-saffron { background: rgba(232,166,32,0.1); color: var(--saffron, #e8a620); }",
			".ws-tag-weak { background: rgba(212,86,78,0.1); color: var(--weak, #d4564e); }",
			".ws-status-dot { width: 5px; height: 5px; border-radius: 50%; }",
			".ws-status-dot.good { background: var(--good, #6bba62); }",
			".ws-status-dot.warn { background: var(--saffron, #e8a620); }",
			".ws-status-dot.weak { background: var(--weak, #d4564e); }",

			".ws-mini-drill-btn { background: none; border: 1px solid var(--border-accent, rgba(232,166,32,0.25)); color: var(--saffron, #e8a620); font-family: var(--font-mono, monospace); font-size: 9px; font-weight: 600; padding: 3px 8px; border-radius: 3px; cursor: pointer; transition: all 0.2s; visibility: hidden; }",
			".ws-ranking-table tr:hover .ws-mini-drill-btn { visibility: visible; }",
			".ws-mini-drill-btn:hover { background: var(--saffron-wash, rgba(232,166,32,0.08)); border-color: var(--saffron, #e8a620); }",
			".ws-btn-ghost-tiny { background: none; border: 1px solid var(--border, rgba(237,232,225,0.08)); color: var(--text-tertiary, #6b635a); font-family: var(--font-mono, monospace); font-size: 9px; text-transform: uppercase; padding: 4px 10px; border-radius: 3px; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: all 0.2s; }",
			".ws-btn-ghost-tiny:hover { border-color: var(--text-secondary, #9b9388); color: var(--text-primary); }",

			".ws-footer { margin-top: 64px; padding: 24px 0; border-top: 1px solid var(--border, rgba(237,232,225,0.08)); display: flex; justify-content: space-between; }",
			".ws-footer-label { font-family: var(--font-mono, monospace); font-size: 10px; color: var(--text-tertiary, #6b635a); text-transform: uppercase; letter-spacing: 0.1em; }",

			"@media (max-width: 1024px) {",
			"  .ws-layout { flex-direction: column; }",
			"  .ws-sidebar { width: 100%; position: static; }",
			"  .ws-confidence-grid { grid-template-columns: 1fr; }",
			"}"
		].join("");
	}

	function _injectStyles() {
		if ($("#weakness-summary-styles").length === 0) {
			$("<style id='weakness-summary-styles'>" + _buildStyles() + "</style>").appendTo("head");
		}
	}

	function render(el, data) {
		_injectStyles();
		_container = $(el);
		_activeCategory = data && data.activeCategory ? _normalizeCategory(data.activeCategory) : "PLL";
		_container.empty().addClass("weakness-summary");

		// SHARED NAVIGATION
		var navBar = $('<nav class="te-nav">');
		var logoGroup = $('<div class="te-logo-group">');
		logoGroup.append($('<div class="te-logo-mark">').html('<svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:var(--text-inverse,#1a1816)"><path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.09-.36.18-.57.18s-.41-.09-.57-.18l-7.9-4.44A.991.991 0 013 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.09.36-.18.57-.18s.41.09.57.18l7.9 4.44c.32.17.53.5.53.88v9z"/></svg>'));
		logoGroup.append($('<div class="te-logo-text">').html('csTimer <em>Trainer</em>'));
		navBar.append(logoGroup);
		var navTabs = $('<div class="te-nav-tabs">');
		navTabs.append($('<span class="te-nav-tab">').text("Train"));
		navTabs.append($('<span class="te-nav-tab active">').text("Stats"));
		navTabs.append($('<span class="te-nav-tab">').text("Timer"));
		navBar.append(navTabs);
		_container.append(navBar);

		// WORKBENCH LAYOUT
		var layout = $('<div class="ws-layout">');
		_mainContent = $('<div class="ws-main">');
		_sidebar = $('<div class="ws-sidebar">');
		layout.append(_mainContent).append(_sidebar);
		_container.append(layout);

		// MAIN CONTENT: Header
		var headerGroup = $('<div class="ws-page-header-minimal">');
		headerGroup.append($('<div class="ws-page-title">').html('Weakness <em>Summary</em>'));
		headerGroup.append($('<p class="ws-page-subtitle">').text("Global mastery analytics and prioritized targeted drills."));
		_mainContent.append(headerGroup);

		// MAIN CONTENT: Sub Navigation (Category Tabs)
		var subNav = $('<div class="ws-sub-nav">');
		var categories = ["PLL", "OLL", "Cross", "All"];
		for (var i = 0; i < categories.length; i++) {
			var normalized = _normalizeCategory(categories[i]);
			subNav.append($('<span class="ws-sub-nav-tab">').attr("data-category", normalized).toggleClass("active", normalized === _activeCategory).text(categories[i]));
		}
		_mainContent.append(subNav);

		// Containers for refresh logic
		_mainContent.append($('<div class="ws-confidence-container">'));
		_mainContent.append($('<div class="ws-ranking-container">'));

		_sidebar.append($('<div class="ws-stats-container">'));
		_sidebar.append($('<div class="ws-trends-container">'));

		// FOOTER
		var footer = $('<div class="ws-footer">');
		footer.append($('<span class="ws-footer-label">').text("csTimer Trainer v2.1"));
		footer.append($('<span class="ws-footer-label">').text("Deep Analytics Engine"));
		_container.append(footer);

		_bindEvents();
		_loadData().then(function(payload) {
			_sessions = payload.sessions;
			_stats = payload.stats;
			_catalog = payload.catalog;
			_refresh();
		}).catch(function() {
			_sessions = [];
			_stats = [];
			_catalog = [];
			_refresh();
		});
	}

	function destroy() {
		if (_container) {
			_container.off("click", ".te-nav-tab");
			_container.off("click", ".ws-sub-nav-tab");
			_container.off("click", ".ws-mini-drill-btn");
			_container.off("click", ".ws-drill-weak-btn");
			_container.empty().removeClass("weakness-summary");
			_container = null;
		}
		_sessions = [];
		_stats = [];
		_catalog = [];
	}

	return {
		render: render,
		destroy: destroy
	};
});
