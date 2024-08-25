"use strict";

var thistlethwaite = (function() {

	var mul = grouplib.permMult;
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
	];
	var axisSwitch = null;
	var axisPrefix = null;
	var allowedEnds = null;
	var gens = [];
	var solvs = [];

	function move2state(moves) {
		var cc = new mathlib.CubieCube();
		moves = moves.split(' ');
		for (var i = 0; i < moves.length; i++) {
			cc.selfMoveStr(moves[i]);
		}
		return cc.toPerm();
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
		var cc = new mathlib.CubieCube();
		cc.ori = 8;
		var rotYZ = cc.toPerm(null, null, null, true);
		var rotYZi = mul(rotYZ, rotYZ);
		cc.ori = 23;
		var rotZ = cc.toPerm(null, null, null, true);
		axisSwitch = [
			[rotYZ, rotYZi],
			[rotYZ, rotYZi, rotZ, mul(rotYZi, rotZ), mul(rotYZ, rotZ)],
			[rotYZ, rotYZi],
			[]
		];
		axisPrefix = [
			['fb', 'ud', 'rl'],
			['ud', 'rl', 'fb', 'rl', 'fb', 'ud'],
			[''],
			['']
		];
		allowedEnds = [
			[2 * 4 + 1, 5 * 4 + 1],
			[1 * 4 + 1, 4 * 4 + 1],
			[0 * 4 + 1, 3 * 4 + 1],
			null
		];
	}

	function enumStepSolutions(step, scramble, useNiss, tryMultiAxis, callback) {
		initSolvers();
		var state = move2state(scramble);
		var states = [state];
		var stateCtx = [];
		if (tryMultiAxis) {
			for (var i = 0; i < axisSwitch[step].length; i++) {
				var trans = axisSwitch[step][i];
				var transi = grouplib.permInv(trans);
				states.push(mul(trans, mul(state, transi)));
			}
		}
		for (var i = 0; i < states.length; i++) {
			var check = solvs[step].checkPerm(states[i]);
			if (check == 2) {
				states[i] = null;
			} else {
				stateCtx[i] = {mask: useNiss ? 2 : 0};
			}
		}
		var first = null;
		var curStepMoves = stepMoves[step];
		var allowedEnd = allowedEnds[step];
		for (var depth = 0; depth < 20; depth++) {
			for (var stateAxis = 0; stateAxis < states.length; stateAxis++) {
				if (states[stateAxis] == null) {
					continue;
				}
				var conjMoves = ["URFDLB", "RFULBD", "FURBDL", "RDFLUB", "FRDBLU", "DFRUBL"][stateAxis];
				var ret = solvs[step].DissectionSolve(states[stateAxis], depth, depth, stateCtx[stateAxis],	(sol) => {
					if (sol.indexOf(-1) == -1) {
						sol.unshift(-1);
					}
					if (sol.length > 0 && allowedEnd != null) {
						var start = sol[0];
						var end = sol.at(-1);
						if (start != -1 && allowedEnd.indexOf(start[0] * 4 + start[1]) == -1 || end != -1 && allowedEnd.indexOf(end[0] * 4 + end[1]) == -1) {
							return;
						}
					}
					sol = sol.map((mv) => {
						if (mv == -1) {
							return '@';
						}
						var axis = mv[0];
						var pow = "0 2'".indexOf(curStepMoves[axis][1]) * mv[1] % 4;
						return conjMoves.charAt(axis) + "0 2'".charAt(pow);
					});
					if (first == null) {
						first = sol;
					}
					return callback ? callback(sol, axisPrefix[step][stateAxis]) : sol;
				});
				if (ret) {
					return first;
				}
			}
		}
		return first;
	}

	function performSolution(scramble, solution) {
		var ret = scramble + ' ' + solution;
		if (solution.indexOf('@') != -1) {
			ret = solution.replace('@', scramble);
		}
		return ret.replace(/\s+/g, ' ');
	}

	function fillStepsCandidates(scramble, skeleton, useNiss, tryMultiAxis, nSols) {
		initSolvers();
		var ret = [];
		for (var step = 0; step < 4; step++) {
			ret[step] = [];
			if (skeleton[step]) {
				ret[step].push(skeleton[step]);
			}
			enumStepSolutions(step, scramble, useNiss, tryMultiAxis, function(sol, prefix) {
				sol = (prefix ? (prefix + ': ') : '') + sol.join(' ').replace(/\s+/g, ' ');
				if (ret[step].indexOf(sol) == -1) {
					ret[step].push(sol);
				}
				return ret[step].length >= nSols;
			});
			scramble = performSolution(scramble, ret[step][0].replace(/[^ ]+:/g, ''));
		}
		return ret;
	}

	function toPrettyStyle(solution) {
		var m = /^(.*:\s*)?\s*(.*?)\s*@\s*(.*)$/.exec(solution);
		if (!m) {
			return solution;
		}
		var prefix = (m[1] ? (m[1] + ' ') : '')
		var niss = m[2].split(' ');
		var ret = [];
		for (var i = niss.length - 1; i >= 0; i--) {
			if (niss[i] == '') {
				continue;
			}
			ret.push(niss[i][0] + "' 2'".charAt("'2 ".indexOf(niss[i][1]) + 1));
		}
		if (ret.length > 0) {
			return prefix + '(' + ret.join(' ') + ')' + (m[3] ? (' ' + m[3]) : '');
		} else {
			return prefix + m[3];
		}
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
		var tryMultiAxis = true;
		var nSols = 5;

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
				stepData = fillStepsCandidates(scramble, skeleton, useNiss, tryMultiAxis, nSols);
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
				solTd[i].append($('<span class="click" data="step' + i + '">' + toPrettyStyle(skeleton[i]) + '</span>').click(procClick));
			}
			if (step != -1) {
				var stepTd = solTd[step];
				var stepSols = stepData[step];
				stepTd.empty();
				stepTd.append('<span>' + toPrettyStyle(stepSols[0]) + '</span>');
				for (var j = 1; j < stepSols.length; j++) {
					stepTd.append('<br>', $('<span class="click" data="sol' + step + '_' + j + '">' + toPrettyStyle(stepSols[j]) + '</span>').click(procClick));
				}
			}
			nisschk.unbind('click').click(procClick);
		}

		function procScramble(_scramble) {
			scramble = _scramble;
			stepData = fillStepsCandidates(scramble, [], useNiss, tryMultiAxis, nSols);
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
