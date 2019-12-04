"use strict";

var pocketface = execMain(function() {

	var faceStr = ["U", "R", "F", "D", "L", "B"];

	var moveData = {
		"U": [
			[0, 1, 3, 2],
			[4, 8, 16, 20],
			[5, 9, 17, 21]
		],
		"R": [
			[4, 5, 7, 6],
			[1, 22, 13, 9],
			[3, 20, 15, 11]
		],
		"F": [
			[8, 9, 11, 10],
			[2, 4, 13, 19],
			[3, 6, 12, 17]
		]
	};
	
	function pocketFaceletMove(state, move) {
		var turn = moveData[move[0]];
		var ret = state.split('');
		for (var i = 0; i < 3; i++) {
			switch (move[1]) {
				case " ":
					mathlib.circle(ret, turn[i][0], turn[i][1], turn[i][2], turn[i][3]);
					break;
				case "2":
					mathlib.circle(ret, turn[i][0], turn[i][2])(ret, turn[i][1], turn[i][3]);
					break;
				case "'":
					mathlib.circle(ret, turn[i][0], turn[i][3], turn[i][2], turn[i][1]);
					break;
			}
		}
		return ret.join('');
	}

	var curScramble;
	var solv = new mathlib.gSolver([
		'XXXX????????????????????',
		'????XXXX????????????????',
		'????????XXXX????????????',
		'????????????XXXX????????',
		'????????????????XXXX????',
		'????????????????????XXXX',
	], pocketFaceletMove, {
		"U ": 1,
		"U2": 1,
		"U'": 1,
		"R ": 2,
		"R2": 2,
		"R'": 2,
		"F ": 3,
		"F2": 3,
		"F'": 3
	});

	function execPocketFace(scramble, fdiv) {
		fdiv.empty();
		curScramble = kernel.parseScramble(scramble, "URF");
		var state = 'UUUURRRRFFFFDDDDLLLLBBBB';
		for (var i = 0; i < curScramble.length; i++) {
			var m = curScramble[i];
			state = pocketFaceletMove(state, "URF".charAt(m[0]) + " 2'".charAt(m[2] - 1));
		}
		for (var face = 0; face < 6; face++) {
			var faceState = [];
			for (var i = 0; i < 24; i++) {
				faceState.push(state[i] == "URFDLB".charAt(face) ? 'X' : '?');
			}
			var sol = solv.search(faceState.join(''), 0)[0];
			var span = $('<span class="sol"/>');
			span.append(faceStr[face] + ": ", tools.getSolutionSpan(sol), '<br>');
			fdiv.append(span);
		}
	}

	function execFunc(fdiv) {
		if (!fdiv) {
			return;
		}
		var scramble = tools.getCurScramble();
		if (tools.puzzleType(scramble[0]) == '222' ||
			scramble[0] == "input" && "|222o|".indexOf('|' + tools.scrambleType(scramble[1]) + '|') != -1) {
			execPocketFace(scramble[1], fdiv);
		} else {
			fdiv.html(IMAGE_UNAVAILABLE);
		}
	}

	$(function() {
		tools.regTool('222face', '2x2x2 Face', execFunc);
	});

}, []);
