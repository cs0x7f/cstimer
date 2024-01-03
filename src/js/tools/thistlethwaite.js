"use strict";

var thistlethwaite = (function() {

	var stepMoves = [
		["U ", "R ", "F ", "D ", "L ", "B "],
		["U ", "R ", "F2", "D ", "L ", "B2"],
		["U ", "R2", "F2", "D ", "L2", "B2"],
		["U2", "R2", "F2", "D2", "L2", "B2"]
	];
	var middleGroup = [
		null,
		["U ", "R2", "F2", "D ", "L2", "B2", "R U R U R U' R' U' R' U'"],
		["U2", "R2", "F2", "D2", "L2", "B2", "U D"],
		null
	]
	var gens = [];
	var solvs = [];

	function move2state(moves) {
		var perm = [];
		for (var j = 0; j < 54; j++) {
			perm[j] = j + 32;
		}
		perm = String.fromCharCode.apply(null, perm);
		moves = moves.split(' ');
		for (var i = 0; i < moves.length; i++) {
			if (!/^\s*$/.exec(moves[i])) {
				perm = gsolver.rubiksCube.move(perm, (moves[i] + ' ').slice(0, 2));
			}
		}
		perm = perm.split('');
		for (var j = 0; j < 54; j++) {
			perm[j] = perm[j].charCodeAt(0) - 32;
		}
		return perm;
	}

	function move2gen(moves) {
		var gen = [];
		for (var i = 0; i < moves.length; i++) {
			gen.push(move2state(moves[i]));
		}
		return gen;
	}

	function initSolvers() {
		if (gens.length > 0) {
			return;
		}
		for (var i = 0; i < stepMoves.length; i++) {
			gens[i] = move2gen(stepMoves[i]);
		}
		for (var i = 0; i < stepMoves.length; i++) {
			solvs[i] = new grouplib.SubgroupSolver(gens[i], gens[i + 1], middleGroup[i] && move2gen(middleGroup[i]));
			solvs[i].initTables();
		}
	}

	function enumStepSolutions(step, scramble, useNiss, callback) {
		initSolvers();
		var state = move2state(scramble);
		var check = solvs[step].checkPerm(state);
		if (check == 2) {
			return null;
		}
		var first = null;
		solvs[step].DissectionSolve(state, 20, useNiss ? 2 : 0, function(sol) {
			for (var i = 0; i < sol.length; i++) {
				if (sol[i] == -1) {
					sol[i] = '@';
					continue;
				}
				var axis = sol[i][0];
				var pow = "0 2'".indexOf(stepMoves[step][axis][1]) * sol[i][1] % 4;
				sol[i] = "URFDLB".charAt(axis) + "0 2'".charAt(pow);
			}
			if (!first) {
				first = sol;
			}
			return callback ? callback(sol) : sol;
		});
		return first;
	}

	function performSolution(scramble, solution) {
		var ret = scramble + ' ' + solution;
		if (solution.indexOf('@') != -1) {
			ret = solution.replace('@', scramble);
		}
		return ret.replace(/\s+/g, ' ');
	}

	function fillStepsCandidates(scramble, skeleton, useNiss, nSols) {
		initSolvers();
		var ret = [];
		for (var step = 0; step < 4; step++) {
			ret[step] = [];
			if (skeleton[step]) {
				var state = move2state(performSolution(scramble, skeleton[step]));
				if (solvs[step].checkPerm(state) == 1) { // valid skeleton
					ret[step].push(skeleton[step]);
				} else {
					console.log('[Thistlethwaite] skeleton', scramble, skeleton[step], 'invalid');
				}
			}
			enumStepSolutions(step, scramble, useNiss, function(sol) {
				sol = sol.join(' ').replace(/\s+/g, ' ');
				if (ret[step].indexOf(sol) == -1) {
					ret[step].push(sol);
				}
				return ret[step].length >= nSols;
			});
			scramble = performSolution(scramble, ret[step][0]);
		}
		return ret;
	}

	execMain(function() {

		var table = $('<table class="table">');
		var nisschk;
		var solTd = [];
		var stepNames = ['EO', 'DR', 'HTR', 'OK'];
		var skeleton = [];
		var scramble = "";
		var stepData = [];
		var useNiss = false;

		function procClick(e) {
			var elem = $(e.target);
			var data = elem.attr('data');
			if (!data) {
				return;
			} else if (data == 'niss') {
				if (useNiss != (!!nisschk.prop('checked'))) {
					useNiss = !useNiss;
					procScramble(scramble);
				}
			} else if (data.startsWith('step')) {
				renderTable(~~data.slice(4));
			} else if (data.startsWith('sol')) {
				data = data.slice(3).split('_');
				var step = ~~data[0];
				var sol = ~~data[1];
				skeleton[step] = stepData[step][sol];
				skeleton.length = step + 1;
				stepData = fillStepsCandidates(scramble, skeleton, useNiss, 5);
				for (var i = 0; i < 4; i++) {
					skeleton[i] = stepData[i][0];
				}
				renderTable(step);
			}
		}

		function renderTable(step) {
			table.empty();
			nisschk = $('<input type="checkbox" data="niss">').prop('checked', useNiss);
			table.append($('<tr>').append('<th>Step</th><th>Solution</th>', $('<th>').append($('<label>').append('NISS', nisschk))));
			for (var i = 0; i < 4; i++) {
				var tr = $('<tr>').append('<td>' + stepNames[i] + '</td>');
				solTd[i] = $('<td style="text-align:left" colspan=2>');
				tr.append(solTd[i]);
				tr.appendTo(table);
				solTd[i].append($('<span class="click" data="step' + i + '">' + skeleton[i] + '</span>').click(procClick));
			}
			if (step != -1) {
				var stepTd = solTd[step];
				var stepSols = stepData[step];
				stepTd.empty();
				stepTd.append('<span>' + stepSols[0] + '</span>');
				for (var j = 1; j < stepSols.length; j++) {
					stepTd.append('<br>', $('<span class="click" data="sol' + step + '_' + j + '">' + stepSols[j] + '</span>').click(procClick));
				}
			}
			nisschk.unbind('click').click(procClick);
		}

		function procScramble(_scramble) {
			scramble = _scramble;
			stepData = fillStepsCandidates(scramble, [], useNiss, 5);
			for (var i = 0; i < 4; i++) {
				skeleton[i] = stepData[i][0];
			}
			renderTable(-1);
		}

		function execFunc(fdiv) {
			if (!fdiv) {
				return;
			}
			fdiv.empty();
			var scramble = tools.getCurScramble();
			if (tools.isPuzzle('333') && /^[URFDLB 2']+$/.exec(scramble[1])) {
				fdiv.append(table);
				procScramble(scramble[1]);
			} else {
				fdiv.html(IMAGE_UNAVAILABLE);
				return;
			}
		}

		$(function() {
			tools.regTool('333thistle', TOOLS_SOLVERS + '>EO DR HTR OK', execFunc);
		});
	});

	return {
		fillStepsCandidates: fillStepsCandidates
	}
})();
