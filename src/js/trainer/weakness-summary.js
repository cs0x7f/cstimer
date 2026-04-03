"use strict";

var weaknessSummary = execMain(function() {

	var _container = null;
	var _activeCategory = "PLL";
	var _sessions = [];
	var _stats = [];
	var _catalog = [];
	var _statsSection = null;
	var _confidenceSection = null;
	var _rankingSection = null;
	var _trendsSection = null;

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
				label: "Avg Recognition Time",
				value: recognitionNow > 0 ? _formatTime(recognitionNow) : "--",
				delta: recognitionNow > 0 && recognitionStart > 0 ? (recognitionNow <= recognitionStart ? "down " : "up ") + _formatTime(Math.abs(recognitionNow - recognitionStart)) : "no history",
				deltaColor: recognitionNow <= recognitionStart ? "var(--good, #6bba62)" : "var(--weak, #d4564e)",
				bars: series.recognition,
				inverted: true
			},
			{
				label: "Session Confidence",
				value: confidenceNow + "%",
				delta: (confidenceNow >= confidenceStart ? "up " : "down ") + Math.abs(confidenceNow - confidenceStart) + "%",
				deltaColor: confidenceNow >= confidenceStart ? "var(--good, #6bba62)" : "var(--weak, #d4564e)",
				bars: series.confidence,
				inverted: false
			},
			{
				label: "Weak Case Count",
				value: String(weakNow),
				delta: weakNow <= weakStart ? "down from " + weakStart : "up from " + weakStart,
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

	function _renderStatsOverview() {
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
			{ label: "Confidence", value: _computeConfidenceScore(categoryStats) + "%", color: _computeConfidenceScore(categoryStats) >= 60 ? "var(--good, #6bba62)" : "var(--weak, #d4564e)" },
			{ label: "Weak Cases", value: categoryClassification.weak, color: categoryClassification.weak > 0 ? "var(--weak, #d4564e)" : "" }
		];

		_statsSection.empty();
		var row = $('<div class="ws-stats-row"></div>');
		for (var j = 0; j < statCells.length; j++) {
			var cell = $('<div class="ws-stat-cell"></div>');
			cell.append($('<span class="ws-stat-label"></span>').text(statCells[j].label));
			cell.append($('<span class="ws-stat-value"></span>').css("color", statCells[j].color || "").text(statCells[j].value));
			row.append(cell);
		}
		_statsSection.append(row);
	}

	function _renderConfidencePanels() {
		_confidenceSection.empty();
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
				{ label: "Weak", count: classification.weak, color: "var(--weak, #d4564e)" },
				{ label: "Untrained", count: classification.untrained, color: "var(--text-tertiary, #6b635a)" }
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
		_confidenceSection.append(grid);
	}

	function _buildRankingRow(caseRecord, stat, index) {
		var attempts = stat ? stat.attemptCount || 0 : 0;
		var confidence = attempts ? Math.min(100, Math.round((attempts / 20) * 100)) : 0;
		var confColor = confidence >= 70 ? "var(--good, #6bba62)" : confidence >= 40 ? "var(--saffron, #e8a620)" : "var(--weak, #d4564e)";
		var trend = stat && stat.trend ? stat.trend : "stable";
		var trendText = "--";
		var trendClass = "ws-trend-flat";
		if (trend === "declining") {
			trendText = "↓ declining";
			trendClass = "ws-trend-down";
		} else if (trend === "improving") {
			trendText = "↑ improving";
			trendClass = "ws-trend-up";
		}

		var row = $("<tr></tr>");
		row.append($('<td class="ws-rank-num"></td>').text(index + 1));
		row.append($('<td class="ws-case-name"></td>').html(confidence < 40 ? "<em>" + caseRecord.name + "</em>" : caseRecord.name));
		row.append($('<td class="ws-time-cell"></td>').css("color", stat && stat.avgSolveTime > 15000 ? "var(--weak, #d4564e)" : "").text(stat && stat.avgSolveTime ? _formatTime(stat.avgSolveTime) : "--"));
		row.append($('<td class="ws-time-cell"></td>').text(stat && stat.bestSolveTime ? _formatTime(stat.bestSolveTime) : "--"));
		row.append($('<td></td>').html('<span class="ws-trend-cell ' + trendClass + '">' + trendText + '</span>'));
		row.append($('<td></td>').html('<span class="ws-tag ' + (confidence >= 70 ? "ws-tag-good" : confidence >= 40 ? "ws-tag-saffron" : "ws-tag-weak") + '">' + confidence + '%</span>'));
		row.append($('<td></td>').append($('<div class="ws-conf-bar"></div>').append($('<div class="ws-conf-bar-fill"></div>').css({
			width: confidence + "%",
			background: confColor
		}))));
		row.append($('<td class="ws-data"></td>').css({ fontSize: "11px", color: "var(--text-tertiary, #6b635a)" }).text(attempts));
		row.append($('<td style="text-align:right"></td>').append($('<button class="ws-drill-btn"></button>').attr("data-case-id", caseRecord.caseId).attr("data-category", caseRecord.category).text("Drill")));
		return row;
	}

	function _renderRankingTable() {
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

		_rankingSection.empty();
		var header = $('<div class="ws-section-label"></div>');
		header.append($('<div class="ws-section-title"></div>').append($("<h3></h3>").text("Case Rankings - " + category)));
		var actions = $('<div style="display:flex;gap:12px;"></div>');
		actions.append($('<button class="ws-btn ws-btn-ghost"></button>').css({ padding: "6px 12px", fontSize: "11px" }).text("Sort: Slowest First"));
		actions.append($('<button class="ws-btn ws-btn-primary ws-drill-weak-btn"></button>').attr("data-category", category).css({ padding: "6px 14px", fontSize: "11px" }).html('<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg> Drill Weak Cases'));
		header.append(actions);
		_rankingSection.append(header);

		var card = $('<div class="ws-precision-card"></div>').css({ padding: 0, "overflow-x": "auto" });
		var table = $('<table class="ws-ranking-table"></table>');
		table.append($('<thead></thead>').html('<tr><th>#</th><th>Case</th><th>Avg Time</th><th>Best</th><th>Trend</th><th>Confidence</th><th>Distribution</th><th>Drills</th><th style="text-align:right">Action</th></tr>'));
		var tbody = $('<tbody></tbody>');
		for (var j = 0; j < ordered.length; j++) {
			tbody.append(_buildRankingRow(ordered[j].caseRecord, ordered[j].stat, j));
		}
		table.append(tbody);
		card.append(table);
		_rankingSection.append(card);
	}

	function _renderTrends() {
		_trendsSection.empty();
		var sectionLabel = $('<div class="ws-section-label"></div>');
		sectionLabel.append($('<div class="ws-section-title"></div>').append($('<h3></h3>').text("30-Day Trend")));
		_trendsSection.append(sectionLabel);

		var card = $('<div class="ws-precision-card ws-trend-card"></div>');
		var grid = $('<div class="ws-trend-grid"></div>');
		var cards = _getTrendCardData(_activeCategory);
		for (var i = 0; i < cards.length; i++) {
			var col = $('<div></div>');
			col.append($('<div class="ws-label" style="margin-bottom:12px;"></div>').text(cards[i].label));
			var valueRow = $('<div style="display:flex;align-items:baseline;gap:12px;"></div>');
			valueRow.append($('<span style="font-family:var(--font-display, Georgia, serif);font-size:32px;"></span>').text(cards[i].value));
			valueRow.append($('<span class="ws-data" style="font-size:12px;"></span>').css("color", cards[i].deltaColor).text(cards[i].delta));
			col.append(valueRow);
			_renderSparkline(col, cards[i].bars, cards[i].inverted);
			grid.append(col);
		}
		card.append(grid);
		_trendsSection.append(card);
	}

	function _refresh() {
		if (!_container) {
			return;
		}
		_renderStatsOverview();
		_renderConfidencePanels();
		_renderRankingTable();
		_renderTrends();
	}

	function _goalForCategory(category) {
		var normalizedCategory = _normalizeCategory(category);
		if (normalizedCategory === "CROSS") {
			return "cross";
		}
		if (normalizedCategory === "RETURNING") {
			return "return-to-speed";
		}
		return "last-layer";
	}

	function _bindEvents() {
		_container.on("click", ".ws-nav-tab", function() {
			_container.find(".ws-nav-tab").removeClass("active");
			$(this).addClass("active");
			_activeCategory = $(this).attr("data-category");
			_refresh();
		});

		_container.on("click", ".ws-drill-btn", function() {
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
			return {
				sessions: results[0] || [],
				stats: results[1] || [],
				catalog: results[2] || []
			};
		}).catch(function() {
			return { sessions: [], stats: [], catalog: [] };
		});
	}

	function _buildStyles() {
		return [
			".weakness-summary { max-width: 1000px; margin: 0 auto; padding: 48px 32px; }",
			".weakness-summary .ws-page-header { display:flex; align-items:flex-end; justify-content:space-between; padding-bottom:16px; border-bottom:1px solid var(--border, rgba(237,232,225,0.08)); margin-bottom:48px; }",
			".weakness-summary .ws-page-title { font-family: var(--font-display, Georgia, serif); font-size:36px; margin-bottom:8px; }",
			".weakness-summary .ws-page-title em { font-style:italic; color:var(--saffron, #e8a620); }",
			".weakness-summary .ws-page-subtitle { color:var(--text-secondary, #9b9388); font-size:14px; }",
			".weakness-summary .ws-nav-tabs { display:flex; gap:0; background:var(--surface, #272320); border:1px solid var(--border, rgba(237,232,225,0.08)); border-radius:3px; overflow:hidden; }",
			".weakness-summary .ws-nav-tab { font-size:12px; color:var(--text-tertiary, #6b635a); padding:8px 16px; cursor:pointer; border-right:1px solid var(--border, rgba(237,232,225,0.08)); }",
			".weakness-summary .ws-nav-tab:last-child { border-right:none; }",
			".weakness-summary .ws-nav-tab.active { color:var(--saffron, #e8a620); background:var(--saffron-wash, rgba(232,166,32,0.06)); }",
			".weakness-summary .ws-section-label { display:flex; align-items:center; justify-content:space-between; margin-bottom:24px; }",
			".weakness-summary .ws-section-title { display:flex; align-items:center; gap:12px; }",
			".weakness-summary .ws-section-title::before { content:''; width:16px; height:1px; background:var(--saffron, #e8a620); }",
			".weakness-summary .ws-section-title h3, .weakness-summary .ws-label, .weakness-summary .ws-data, .weakness-summary .ws-stat-label, .weakness-summary .ws-ranking-table th { font-family: var(--font-mono, 'Courier New', monospace); }",
			".weakness-summary .ws-stats-row { display:grid; grid-template-columns:repeat(5, 1fr); gap:16px; margin-bottom:48px; }",
			".weakness-summary .ws-stat-cell { background:var(--bg-warm, #1f1c19); border:1px solid var(--border, rgba(237,232,225,0.08)); border-radius:6px; padding:16px 24px; display:flex; flex-direction:column; gap:4px; }",
			".weakness-summary .ws-stat-value { font-family: var(--font-display, Georgia, serif); font-size:28px; line-height:1; }",
			".weakness-summary .ws-stat-label { font-size:9px; letter-spacing:0.1em; text-transform:uppercase; color:var(--text-tertiary, #6b635a); }",
			".weakness-summary .ws-confidence-grid { display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-bottom:48px; }",
			".weakness-summary .ws-precision-card { background:var(--surface, #272320); border:1px solid var(--border, rgba(237,232,225,0.08)); border-radius:6px; position:relative; overflow:hidden; }",
			".weakness-summary .ws-precision-card::before { content:''; position:absolute; top:-1px; left:-1px; width:8px; height:8px; border-top:1.5px solid var(--saffron, #e8a620); border-left:1.5px solid var(--saffron, #e8a620); border-radius:6px 0 0 0; }",
			".weakness-summary .ws-precision-card::after { content:''; position:absolute; right:-1px; bottom:-1px; width:8px; height:8px; border-right:1.5px solid var(--saffron, #e8a620); border-bottom:1.5px solid var(--saffron, #e8a620); border-radius:0 0 6px 0; }",
			".weakness-summary .ws-confidence-panel, .weakness-summary .ws-trend-card { padding:24px; }",
			".weakness-summary .ws-confidence-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:16px; }",
			".weakness-summary .ws-confidence-title { font-family: var(--font-display, Georgia, serif); font-size:24px; }",
			".weakness-summary .ws-confidence-score { font-family: var(--font-display, Georgia, serif); font-size:48px; line-height:1; }",
			".weakness-summary .ws-confidence-breakdown { display:flex; flex-direction:column; gap:12px; margin-top:16px; }",
			".weakness-summary .ws-confidence-row { display:flex; align-items:center; gap:12px; }",
			".weakness-summary .ws-confidence-row-label { width:80px; flex-shrink:0; font-size:12px; }",
			".weakness-summary .ws-confidence-row-bar { flex:1; }",
			".weakness-summary .ws-confidence-row-value { width:36px; text-align:right; font-size:11px; }",
			".weakness-summary .ws-progress-track, .weakness-summary .ws-conf-bar { width:100%; background:var(--border, rgba(237,232,225,0.08)); border-radius:2px; overflow:hidden; }",
			".weakness-summary .ws-progress-track { height:6px; }",
			".weakness-summary .ws-conf-bar { height:4px; }",
			".weakness-summary .ws-progress-fill, .weakness-summary .ws-conf-bar-fill { height:100%; border-radius:2px; }",
			".weakness-summary .ws-tag { font-size:10px; letter-spacing:0.06em; text-transform:uppercase; padding:3px 8px; border-radius:3px; display:inline-flex; align-items:center; gap:5px; }",
			".weakness-summary .ws-tag-good { background:rgba(107,186,98,0.15); color:var(--good, #6bba62); }",
			".weakness-summary .ws-tag-saffron { background:rgba(232,166,32,0.12); color:var(--saffron, #e8a620); }",
			".weakness-summary .ws-tag-weak { background:rgba(212,86,78,0.15); color:var(--weak, #d4564e); }",
			".weakness-summary .ws-status-dot { width:6px; height:6px; border-radius:50%; display:inline-block; }",
			".weakness-summary .ws-status-dot.good { background:var(--good, #6bba62); }",
			".weakness-summary .ws-status-dot.warn { background:var(--saffron, #e8a620); }",
			".weakness-summary .ws-status-dot.weak { background:var(--weak, #d4564e); }",
			".weakness-summary .ws-ranking-table { width:100%; border-collapse:collapse; }",
			".weakness-summary .ws-ranking-table th, .weakness-summary .ws-ranking-table td { padding:12px 16px; border-bottom:1px solid var(--border, rgba(237,232,225,0.08)); font-size:13px; text-align:left; }",
			".weakness-summary .ws-ranking-table th { font-size:10px; letter-spacing:0.08em; text-transform:uppercase; color:var(--text-tertiary, #6b635a); }",
			".weakness-summary .ws-rank-num { width:30px; color:var(--text-tertiary, #6b635a); }",
			".weakness-summary .ws-case-name { font-family: var(--font-display, Georgia, serif); font-size:16px; white-space:nowrap; }",
			".weakness-summary .ws-time-cell, .weakness-summary .ws-trend-cell { white-space:nowrap; }",
			".weakness-summary .ws-trend-up { color:var(--good, #6bba62); }",
			".weakness-summary .ws-trend-down { color:var(--weak, #d4564e); }",
			".weakness-summary .ws-trend-flat { color:var(--text-tertiary, #6b635a); }",
			".weakness-summary .ws-btn, .weakness-summary .ws-drill-btn { font-size:11px; letter-spacing:0.03em; border-radius:3px; cursor:pointer; }",
			".weakness-summary .ws-btn { border:none; padding:10px 22px; display:inline-flex; align-items:center; gap:8px; }",
			".weakness-summary .ws-btn-primary { background:var(--saffron, #e8a620); color:var(--text-inverse, #1a1816); }",
			".weakness-summary .ws-btn-ghost { background:var(--surface, #272320); color:var(--text-secondary, #9b9388); border:1px solid var(--border, rgba(237,232,225,0.08)); }",
			".weakness-summary .ws-drill-btn { background:none; color:var(--saffron, #e8a620); border:1px solid rgba(232,166,32,0.25); padding:4px 10px; text-transform:uppercase; }",
			".weakness-summary .ws-divider { height:1px; background:var(--border, rgba(237,232,225,0.08)); margin:48px 0; }",
			".weakness-summary .ws-trend-grid { display:grid; grid-template-columns:repeat(3, 1fr); gap:32px; }",
			".weakness-summary .ws-sparkline { display:flex; align-items:flex-end; gap:2px; height:24px; margin-top:16px; }",
			".weakness-summary .ws-spark-bar { width:4px; border-radius:1px; }",
			".weakness-summary .ws-footer { display:flex; justify-content:space-between; padding:16px 0; }",
			"@media (max-width: 768px) {",
			"  .weakness-summary { padding:24px 16px !important; }",
			"  .weakness-summary .ws-page-header { flex-direction:column; gap:16px; align-items:flex-start !important; }",
			"  .weakness-summary .ws-confidence-grid, .weakness-summary .ws-trend-grid { grid-template-columns:1fr !important; }",
			"  .weakness-summary .ws-stats-row { grid-template-columns:repeat(2, 1fr) !important; }",
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

		var header = $('<div class="ws-page-header"></div>');
		var headerLeft = $('<div></div>');
		headerLeft.append($('<div class="ws-page-title"></div>').html('Weakness <em>Summary</em>'));
		headerLeft.append($('<p class="ws-page-subtitle"></p>').text("Persistent training insights across all sessions - updated after each drill"));
		header.append(headerLeft);

		var tabs = $('<div class="ws-nav-tabs"></div>');
		var categories = ["PLL", "OLL", "Cross", "All"];
		for (var i = 0; i < categories.length; i++) {
			var normalized = _normalizeCategory(categories[i]);
			tabs.append($('<span class="ws-nav-tab"></span>').attr("data-category", normalized).toggleClass("active", normalized === _activeCategory).text(categories[i]));
		}
		header.append(tabs);
		_container.append(header);

		_statsSection = $('<div></div>');
		_confidenceSection = $('<div></div>');
		_rankingSection = $('<div></div>');
		_trendsSection = $('<div></div>');

		_container.append(_statsSection);
		_container.append(_confidenceSection);
		_container.append(_rankingSection);
		_container.append($('<div class="ws-divider"></div>'));
		_container.append(_trendsSection);

		var footer = $('<div class="ws-footer"></div>');
		footer.append($('<span class="ws-label"></span>').text("csTimer Trainer v2"));
		footer.append($('<span class="ws-label"></span>').text("Weakness Summary"));
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
			_container.off("click", ".ws-nav-tab");
			_container.off("click", ".ws-drill-btn");
			_container.off("click", ".ws-drill-weak-btn");
			_container.empty().removeClass("weakness-summary");
			_container = null;
		}
		_sessions = [];
		_stats = [];
		_catalog = [];
		_statsSection = null;
		_confidenceSection = null;
		_rankingSection = null;
		_trendsSection = null;
	}

	return {
		render: render,
		destroy: destroy
	};
});
