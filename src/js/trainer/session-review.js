"use strict";

var sessionReview = execMain(function() {

	var _container = null;
	var _rendered = false;
	var _eventNamespace = ".sessionReview";

	function _cssVar(name) {
		return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
	}

	function _formatTime(ms) {
		if (ms == null || ms < 0) return "0:00.00";
		var totalCs = Math.round(ms / 10);
		var cs = totalCs % 100;
		var totalSec = Math.floor(totalCs / 100);
		var sec = totalSec % 60;
		var min = Math.floor(totalSec / 60);
		return min + ":" + (sec < 10 ? "0" : "") + sec + "." + (cs < 10 ? "0" : "") + cs;
	}

	function _formatTimeShort(ms) {
		if (ms == null || ms <= 0) return "—";
		return (ms / 1000).toFixed(2) + "s";
	}

	function _formatDuration(ms) {
		if (!ms || ms <= 0) return "0s";
		var totalSec = Math.round(ms / 1000);
		var min = Math.floor(totalSec / 60);
		var sec = totalSec % 60;
		if (min > 0) {
			return min + "m " + sec + "s";
		}
		return sec + "s";
	}

	function _formatDate(isoString) {
		if (!isoString) return "";
		var d = new Date(isoString);
		var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		return months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
	}

	function _getCaseFullName(caseId) {
		if (typeof trainerIntegration !== "undefined") {
			var info = trainerIntegration.getCase(caseId);
			if (info) {
				var category = info.category || "";
				var name = info.name || caseId;
				if (category && name) {
					return category + " \u2014 " + name;
				}
				return name;
			}
		}
		return caseId;
	}

	function _getCaseName(caseId) {
		if (typeof trainerIntegration !== "undefined") {
			var info = trainerIntegration.getCase(caseId);
			if (info) return info.name || caseId;
		}
		return caseId;
	}

	function _getPreviousAvg(caseId) {
		if (typeof trainerIntegration !== "undefined") {
			var info = trainerIntegration.getCase(caseId);
			if (info && typeof trainerIntegration.getStatForCase === "function") {
				return trainerIntegration.getStatForCase(caseId).then(function(stat) {
					return stat && stat.avgSolveTime ? stat.avgSolveTime : null;
				});
			}
		}
		return Promise.resolve(null);
	}

	function _buildStyles() {
		return [
			".session-review { max-width: 900px; margin: 0 auto; padding: 48px 32px; }",
			".sr-display { font-family: var(--font-display, 'Instrument Serif', serif); font-weight: 400; letter-spacing: -0.01em; line-height: 1.1; }",
			".sr-display em { font-style: italic; }",
			".sr-label { font-family: 'IBM Plex Mono', monospace; font-weight: 400; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-tertiary, #6b635a); }",
			".sr-data { font-family: 'IBM Plex Mono', monospace; font-weight: 400; font-variant-numeric: tabular-nums; }",
			".sr-precision-card { background: var(--surface, #272320); border: 1px solid var(--border, rgba(237,232,225,0.08)); border-radius: 6px; position: relative; overflow: hidden; transition: border-color 0.3s ease, background 0.3s ease; }",
			".sr-precision-card:hover { border-color: var(--border-accent, rgba(232,166,32,0.25)); background: var(--surface-raised, #302b27); }",
			".sr-precision-card::before, .sr-precision-card::after { content: ''; position: absolute; width: 8px; height: 8px; }",
			".sr-precision-card::before { top: -1px; left: -1px; border-top: 1.5px solid var(--saffron, #e8a620); border-left: 1.5px solid var(--saffron, #e8a620); border-radius: 6px 0 0 0; }",
			".sr-precision-card::after { bottom: -1px; right: -1px; border-bottom: 1.5px solid var(--saffron, #e8a620); border-right: 1.5px solid var(--saffron, #e8a620); border-radius: 0 0 6px 0; }",
			".sr-btn { font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 13px; letter-spacing: 0.03em; border: none; cursor: pointer; padding: 10px 22px; border-radius: 3px; transition: all 0.2s ease; display: inline-flex; align-items: center; justify-content: center; gap: 8px; }",
			".sr-btn:active { transform: scale(0.97); }",
			".sr-btn-primary { background: var(--saffron, #e8a620); color: var(--text-inverse, #1a1816); }",
			".sr-btn-primary:hover { background: var(--saffron-dim, #c48a18); box-shadow: 0 0 20px var(--saffron-glow, rgba(232,166,32,0.12)); }",
			".sr-btn-outline { background: transparent; color: var(--saffron, #e8a620); border: 1px solid var(--border-accent, rgba(232,166,32,0.25)); }",
			".sr-btn-outline:hover { background: var(--saffron-wash, rgba(232,166,32,0.06)); }",
			".sr-btn-ghost { background: var(--surface, #272320); color: var(--text-secondary, #9b9388); border: 1px solid var(--border, rgba(237,232,225,0.08)); }",
			".sr-btn-ghost:hover { background: var(--surface-raised, #302b27); color: var(--text-primary, #ede8e1); }",
			".sr-tag { font-family: 'IBM Plex Mono', monospace; font-size: 10px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; padding: 3px 8px; border-radius: 3px; display: inline-flex; align-items: center; gap: 5px; }",
			".sr-tag-weak { background: var(--weak-dim, rgba(212,86,78,0.15)); color: var(--weak, #d4564e); }",
			".sr-tag-good { background: var(--good-dim, rgba(107,186,98,0.15)); color: var(--good, #6bba62); }",
			".sr-tag-saffron { background: var(--saffron-glow, rgba(232,166,32,0.12)); color: var(--saffron, #e8a620); }",
			".sr-status-dot { width: 6px; height: 6px; border-radius: 50%; display: inline-block; flex-shrink: 0; }",
			".sr-status-dot.good { background: var(--good, #6bba62); box-shadow: 0 0 6px var(--good, #6bba62); }",
			".sr-status-dot.weak { background: var(--weak, #d4564e); box-shadow: 0 0 6px var(--weak, #d4564e); }",
			".sr-progress-track { width: 100%; height: 3px; background: var(--border, rgba(237,232,225,0.08)); border-radius: 2px; overflow: hidden; }",
			".sr-progress-fill { height: 100%; border-radius: 2px; }",
			".sr-divider { height: 1px; background: var(--border, rgba(237,232,225,0.08)); margin: 48px 0; }",
			".sr-review-header { text-align: center; padding: 48px 0; margin-bottom: 32px; border-bottom: 1px solid var(--border, rgba(237,232,225,0.08)); }",
			".sr-review-badge { display: inline-flex; align-items: center; gap: 8px; background: var(--good-dim, rgba(107,186,98,0.15)); color: var(--good, #6bba62); padding: 6px 14px; border-radius: 6px; font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 16px; }",
			".sr-review-title { font-size: 40px; margin-bottom: 8px; }",
			".sr-review-subtitle { color: var(--text-secondary, #9b9388); font-size: 15px; }",
			".sr-summary-row { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; margin-bottom: 32px; }",
			".sr-summary-cell { background: var(--bg-warm, #1f1c19); border: 1px solid var(--border, rgba(237,232,225,0.08)); border-radius: 6px; padding: 16px 24px; display: flex; flex-direction: column; gap: 4px; text-align: center; }",
			".sr-summary-value { font-family: var(--font-display, 'Instrument Serif', serif); font-size: 28px; line-height: 1; }",
			".sr-summary-label { font-family: 'IBM Plex Mono', monospace; font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-tertiary, #6b635a); }",
			".sr-section-label { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }",
			".sr-section-label::before { content: ''; width: 16px; height: 1px; background: var(--saffron, #e8a620); }",
			".sr-section-label h3 { font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-secondary, #9b9388); }",
			".sr-hardest-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 32px; }",
			".sr-hardest-card { padding: 24px; text-align: center; }",
			".sr-hardest-rank { font-family: 'IBM Plex Mono', monospace; font-size: 10px; color: var(--weak, #d4564e); margin-bottom: 12px; letter-spacing: 0.1em; }",
			".sr-hardest-name { font-family: var(--font-display, 'Instrument Serif', serif); font-size: 24px; margin-bottom: 8px; }",
			".sr-hardest-time { font-family: 'IBM Plex Mono', monospace; font-size: 20px; color: var(--weak, #d4564e); margin-bottom: 12px; }",
			".sr-hardest-detail { font-size: 12px; color: var(--text-tertiary, #6b635a); }",
			".sr-results-table { width: 100%; border-collapse: collapse; margin-bottom: 32px; }",
			".sr-results-table th { font-family: 'IBM Plex Mono', monospace; font-size: 10px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-tertiary, #6b635a); text-align: left; padding: 12px 16px; border-bottom: 1px solid var(--border, rgba(237,232,225,0.08)); }",
			".sr-results-table td { padding: 12px 16px; border-bottom: 1px solid var(--border, rgba(237,232,225,0.08)); font-size: 13px; }",
			".sr-results-table tr:hover td { background: var(--surface, #272320); }",
			".sr-results-table .sr-case-name-cell { font-family: var(--font-display, 'Instrument Serif', serif); font-size: 16px; }",
			".sr-results-table .sr-time-cell { font-family: 'IBM Plex Mono', monospace; font-size: 13px; }",
			".sr-results-table .sr-bar-cell { width: 120px; }",
			".sr-time-bar { height: 4px; border-radius: 2px; background: var(--border, rgba(237,232,225,0.08)); }",
			".sr-time-bar-fill { height: 100%; border-radius: 2px; }",
			".sr-recommendation { padding: 32px; margin-bottom: 24px; }",
			".sr-rec-header { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }",
			".sr-rec-icon { width: 36px; height: 36px; background: var(--saffron-glow, rgba(232,166,32,0.12)); border-radius: 6px; display: flex; align-items: center; justify-content: center; }",
			".sr-rec-title { font-family: var(--font-display, 'Instrument Serif', serif); font-size: 22px; }",
			".sr-rec-body { color: var(--text-secondary, #9b9388); font-size: 14px; line-height: 1.6; margin-bottom: 20px; }",
			".sr-rec-cases { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; }",
			".sr-rec-chip { padding: 6px 12px; background: var(--weak-dim, rgba(212,86,78,0.15)); border: 1px solid rgba(212,86,78,0.2); border-radius: 3px; font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: var(--weak, #d4564e); display: flex; align-items: center; gap: 6px; }",
			".sr-actions { display: flex; gap: 16px; justify-content: center; }",
			"@media (max-width: 768px) {",
			"  .session-review { padding: 32px 16px; }",
			"  .sr-summary-row { grid-template-columns: repeat(3, 1fr); }",
			"  .sr-hardest-grid { grid-template-columns: 1fr; }",
			"  .sr-review-title { font-size: 28px; }",
			"  .sr-results-table .sr-bar-cell { display: none; }",
			"}"
		].join("");
	}

	function _injectStyles() {
		if ($("#session-review-styles").length === 0) {
			$("<style id='session-review-styles'>" + _buildStyles() + "</style>").appendTo("head");
		}
	}

	function _renderHeader(el, reviewData) {
		var header = $('<div class="sr-review-header">');
		var badge = $('<div class="sr-review-badge">');
		badge.append('<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 11l3 3L22 4"/></svg>');
		badge.append("Session Complete");
		header.append(badge);

		var planName = reviewData.planName || "Training Session";
		header.append($('<div class="sr-display sr-review-title">').html('<em>' + planName + '</em>'));

		var subtitle = reviewData.totalCases + " cases drilled";
		if (reviewData.durationMs) {
			subtitle += " \u00B7 " + _formatDuration(reviewData.durationMs);
		}
		if (reviewData.completedAt) {
			subtitle += " \u00B7 " + _formatDate(reviewData.completedAt);
		}
		header.append($('<p class="sr-review-subtitle">').text(subtitle));

		el.append(header);
	}

	function _renderSummaryStats(el, reviewData) {
		var row = $('<div class="sr-summary-row">');

		var cells = [
			{ value: String(reviewData.totalCases || 0), label: "Cases" },
			{ value: reviewData.avgTime > 0 ? _formatTimeShort(reviewData.avgTime) : "—", label: "Avg Time", color: "var(--saffron, #e8a620)" },
			{ value: reviewData.bestTime > 0 ? _formatTimeShort(reviewData.bestTime) : "—", label: "Best", color: "var(--good, #6bba62)" },
			{ value: reviewData.worstTime > 0 ? _formatTimeShort(reviewData.worstTime) : "—", label: "Worst", color: "var(--weak, #d4564e)" },
			{ value: (reviewData.sub2Rate || 0) + "%", label: "Sub-2s Rate" }
		];

		for (var i = 0; i < cells.length; i++) {
			var cell = $('<div class="sr-summary-cell">');
			cell.append($('<span class="sr-summary-value">').css("color", cells[i].color || "").text(cells[i].value));
			cell.append($('<span class="sr-summary-label">').text(cells[i].label));
			row.append(cell);
		}

		el.append(row);
	}

	function _renderHardestCases(el, reviewData) {
		var section = $('<div>');
		section.append($('<div class="sr-section-label">').append($('<h3>').text("Hardest Cases This Session")));

		var grid = $('<div class="sr-hardest-grid">');
		var results = reviewData.results || [];
		var sorted = results.slice().sort(function(a, b) {
			return (b.solveTime || 0) - (a.solveTime || 0);
		});

		var top3 = sorted.slice(0, 3);
		var rankLabels = ["#1 Slowest", "#2 Slowest", "#3 Slowest"];

		for (var i = 0; i < top3.length; i++) {
			var result = top3[i];
			var card = $('<div class="sr-precision-card sr-hardest-card">');
			card.append($('<div class="sr-hardest-rank">').text(rankLabels[i]));
			card.append($('<div class="sr-hardest-name">').html('<em>' + result.caseName + '</em>'));
			card.append($('<div class="sr-hardest-time">').text(_formatTimeShort(result.solveTime)));

			var detail = "";
			if (result.previousAvg != null) {
				var diff = result.solveTime - result.previousAvg;
				if (diff > 0) {
					detail = "Previous avg: " + _formatTimeShort(result.previousAvg) + " \u00B7 Still struggling";
				} else {
					detail = "Previous avg: " + _formatTimeShort(result.previousAvg) + " \u00B7 Improving \u2191";
				}
			}
			if (detail) {
				card.append($('<div class="sr-hardest-detail">').text(detail));
			}

			var tagClass = result.isDnf ? "sr-tag-weak" : (result.solveTime > reviewData.avgTime * 1.3 ? "sr-tag-weak" : "sr-tag-saffron");
			var tagText = result.isDnf ? "DNF" : (result.solveTime > reviewData.avgTime * 1.3 ? "Needs Work" : "Getting Better");
			var tag = $('<span class="sr-tag ' + tagClass + '">');
			if (tagClass === "sr-tag-saffron") {
				tag.append('<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19V5m0 0l-7 7m7-7l7 7"/></svg>');
			} else {
				tag.append($('<span class="sr-status-dot weak">'));
			}
			tag.append(tagText);
			card.append(tag);

			grid.append(card);
		}

		section.append(grid);
		el.append(section);
	}

	function _renderResultsTable(el, reviewData) {
		var section = $('<div>');
		section.append($('<div class="sr-section-label">').append($('<h3>').text("All Results")));

		var card = $('<div class="sr-precision-card" style="padding: 16px; overflow-x: auto;">');
		var table = $('<table class="sr-results-table">');
		table.append($('<thead>').html('<tr><th>#</th><th>Case</th><th>Time</th><th>vs. Avg</th><th>Status</th><th class="sr-bar-cell">Distribution</th></tr>'));

		var tbody = $('<tbody>');
		var results = reviewData.results || [];
		var avgTime = reviewData.avgTime || 0;
		var worstTime = reviewData.worstTime || 0;

		for (var i = 0; i < results.length; i++) {
			var result = results[i];
			var row = $("<tr>");

			row.append($('<td class="sr-data" style="font-size: 11px; color: var(--text-tertiary, #6b635a);">').text(i + 1));

			var nameCell = $('<td class="sr-case-name-cell">').text(result.caseName);
			if (result.isDnf || (avgTime > 0 && result.solveTime > avgTime * 1.5)) {
				nameCell.css("color", "var(--weak, #d4564e)").html('<em>' + result.caseName + '</em>');
			}
			row.append(nameCell);

			var timeCell = $('<td class="sr-time-cell">');
			if (result.isDnf) {
				timeCell.text("DNF").css("color", "var(--weak, #d4564e)");
			} else if (result.isSkipped) {
				timeCell.text("Skipped").css("color", "var(--text-tertiary, #6b635a)");
			} else {
				timeCell.text(_formatTimeShort(result.solveTime));
				if (avgTime > 0 && result.solveTime > avgTime * 1.3) {
					timeCell.css("color", "var(--weak, #d4564e)");
				} else if (avgTime > 0 && result.solveTime < avgTime * 0.85) {
					timeCell.css("color", "var(--good, #6bba62)");
				}
			}
			row.append(timeCell);

			var vsCell = $('<td class="sr-data" style="font-size: 12px;">');
			if (!result.isSkipped && !result.isDnf && avgTime > 0) {
				var diff = result.solveTime - avgTime;
				var sign = diff >= 0 ? "+" : "";
				vsCell.text(sign + _formatTimeShort(diff));
				vsCell.css("color", diff <= 0 ? "var(--good, #6bba62)" : "var(--weak, #d4564e)");
			} else {
				vsCell.text("—").css("color", "var(--text-tertiary, #6b635a)");
			}
			row.append(vsCell);

			var statusCell = $("<td>");
			if (result.isDnf) {
				statusCell.append($('<span class="sr-tag sr-tag-weak">').html('<span class="sr-status-dot weak"></span>DNF'));
			} else if (result.isSkipped) {
				statusCell.append($('<span class="sr-tag sr-tag-saffron">').text("Skipped"));
			} else if (avgTime > 0 && result.solveTime > avgTime * 1.3) {
				statusCell.append($('<span class="sr-tag sr-tag-weak">').html('<span class="sr-status-dot weak"></span>Weak'));
			} else if (avgTime > 0 && result.solveTime < avgTime * 0.85) {
				statusCell.append($('<span class="sr-tag sr-tag-good">').html('<span class="sr-status-dot good"></span>Good'));
			} else {
				statusCell.append($('<span class="sr-tag sr-tag-good">').html('<span class="sr-status-dot good"></span>Ok'));
			}
			row.append(statusCell);

			var barCell = $('<td class="sr-bar-cell">');
			if (!result.isSkipped && !result.isDnf && worstTime > 0) {
				var pct = Math.round((result.solveTime / worstTime) * 100);
				var barColor = avgTime > 0 && result.solveTime > avgTime * 1.3 ? "var(--weak, #d4564e)" : (avgTime > 0 && result.solveTime < avgTime * 0.85 ? "var(--good, #6bba62)" : "var(--saffron, #e8a620)");
				barCell.append($('<div class="sr-time-bar">').append($('<div class="sr-time-bar-fill">').css({ width: pct + "%", background: barColor })));
			}
			row.append(barCell);

			tbody.append(row);
		}

		table.append(tbody);
		card.append(table);

		if (results.length > 10) {
			card.append($('<div style="text-align: center; padding: 12px;">').append($('<span class="sr-label" style="cursor: pointer; color: var(--text-secondary, #9b9388);">').text("Show all " + results.length + " results \u2193")));
		}

		section.append(card);
		el.append(section);
	}

	function _renderRecommendation(el, reviewData) {
		if (!reviewData.recommendation && (!reviewData.weakCases || !reviewData.weakCases.length)) {
			return;
		}

		var card = $('<div class="sr-precision-card sr-recommendation">');
		var recHeader = $('<div class="sr-rec-header">');
		recHeader.append($('<div class="sr-rec-icon">').html('<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--saffron, #e8a620)" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>'));
		recHeader.append($('<div class="sr-rec-title sr-display">').html('<em>Recommended Next Session</em>'));
		card.append(recHeader);

		var recBody = reviewData.recommendation || "Continue practicing your weak cases for improvement.";
		card.append($('<p class="sr-rec-body">').text(recBody));

		if (reviewData.weakCases && reviewData.weakCases.length > 0) {
			var chipsContainer = $('<div class="sr-rec-cases">');
			var weakCaseIds = reviewData.weakCases.slice(0, 5);
			for (var i = 0; i < weakCaseIds.length; i++) {
				var weakCase = weakCaseIds[i];
				var caseId = typeof weakCase === "string" ? weakCase : (weakCase.caseId || "");
				var caseName = _getCaseName(caseId);
				var chip = $('<div class="sr-rec-chip">');
				chip.append($('<span class="sr-status-dot weak">'));
				chip.append(caseName);
				chipsContainer.append(chip);
			}
			card.append(chipsContainer);
		}

		var actions = $('<div>');
		actions.append($('<button class="sr-btn sr-btn-primary sr-drill-weak-btn">').html('<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg> Drill Weak Cases'));
		card.append(actions);

		el.append(card);
	}

	function _renderActions(el) {
		var actions = $('<div class="sr-actions">');
		actions.append($('<button class="sr-btn sr-btn-outline sr-repeat-btn">').text("Repeat This Session"));
		actions.append($('<button class="sr-btn sr-btn-ghost sr-back-btn">').text("Back to Trainer"));
		el.append(actions);
	}

	function _renderFooter(el) {
		el.append($('<div class="sr-divider">'));
		var footer = $('<div style="display: flex; justify-content: space-between; padding: 16px 0;">');
		footer.append($('<span class="sr-label">').text("csTimer Trainer v2"));
		footer.append($('<span class="sr-label">').text("Session Review"));
		el.append(footer);
	}

	function _bindEvents() {
		_container.on("click" + _eventNamespace, ".sr-back-btn", function() {
			if (typeof trainerInit !== "undefined") {
				trainerInit.showEntry();
			}
		});

		_container.on("click" + _eventNamespace, ".sr-repeat-btn", function() {
			if (typeof trainerInit !== "undefined" && _rendered && _rendered.planId) {
				trainerInit.showSurface("active", { planId: _rendered.planId });
			}
		});

		_container.on("click" + _eventNamespace, ".sr-drill-weak-btn", function() {
			if (typeof trainerInit !== "undefined" && _rendered && _rendered.weakCaseIds && _rendered.weakCaseIds.length > 0) {
				trainerInit.showSurface("setup", {
					selectedGoal: _rendered.goal || "last-layer",
					focusCaseIds: _rendered.weakCaseIds
				});
			}
		});
	}

	function _unbindEvents() {
		if (_container) {
			_container.off(_eventNamespace);
		}
	}

	function render(el, data) {
		_injectStyles();
		_container = $(el);
		_container.empty().addClass("session-review");

		var sessionResult = data && data.sessionResult ? data.sessionResult : null;
		if (!sessionResult) {
			_container.text("No session data available.");
			return null;
		}

		if (typeof trainerIntegration === "undefined") {
			_container.text("Trainer integration not available.");
			return null;
		}

		var reviewData = trainerIntegration.buildReviewData(sessionResult);

		var planName = reviewData.planName || "Training Session";
		var goal = reviewData.goal || "last-layer";
		if (sessionResult.planId && typeof trainerIntegration.getPlan === "function") {
			trainerIntegration.getPlan(sessionResult.planId).then(function(p) {
				if (p) {
					_container.find(".sr-review-title").html('<em>' + (p.name || planName) + '</em>');
				}
			});
		}

		reviewData.planName = planName;
		reviewData.durationMs = sessionResult.startedAt && sessionResult.completedAt ?
			new Date(sessionResult.completedAt).getTime() - new Date(sessionResult.startedAt).getTime() : 0;

		_renderHeader(_container, reviewData);
		_renderSummaryStats(_container, reviewData);
		_renderHardestCases(_container, reviewData);
		_renderResultsTable(_container, reviewData);
		_renderRecommendation(_container, reviewData);
		_renderActions(_container);
		_renderFooter(_container);

		_bindEvents();

		_rendered = {
			planId: sessionResult.planId,
			weakCaseIds: (reviewData.weakCases || []).map(function(c) {
				return typeof c === "string" ? c : c.caseId;
			}),
			goal: goal
		};

		return function() {
			_unbindEvents();
		};
	}

	function destroy() {
		_unbindEvents();
		if (_container) {
			_container.empty().removeClass("session-review");
			_container = null;
		}
		_rendered = null;
	}

	return {
		render: render,
		destroy: destroy
	};
});
