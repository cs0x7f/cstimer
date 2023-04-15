var replay = (function() {

	var div;
	var puzzleDiv;
	var puzzleObj;

	function col2std(col, faceMap) {
		var ret = [];
		col = (col || '').match(/#[0-9a-fA-F]{3}/g) || [];
		for (var i = 0; i < col.length; i++) {
			ret.push(~~(kernel.ui.nearColor(col[faceMap[i]], 0, true).replace('#', '0x')));
		}
		return ret;
	}

	var startTs = 0;
	var activeTid = 0;
	var toTriggers = []; //[[func, timeout], ...]

	function timedSeqExec(_toTriggers) {
		if (activeTid) {
			clearTimeout(activeTid);
		}
		toTriggers = _toTriggers.slice();
		toTriggers.reverse();
		startTs = +new Date;
		execLoop();
	}

	function execLoop() {
		var ts = +new Date - startTs;
		if (toTriggers.length == 0) {
			return;
		}
		var end = toTriggers.pop();
		while (end[1] <= ts) {
			end[0]();
			if (toTriggers.length == 0) {
				return;
			}
			end = toTriggers.pop();
		}
		toTriggers.push(end);
		activeTid = setTimeout(execLoop, end[1] - ts);
	}

	function parseRecons(recons) {
		var movets = recons.split(' ');
		var moves = [];
		var tstamp = [];
		console.log(movets);
		for (var i = 0; i < movets.length; i++) {
			var m = /^(.*)@(\d+)$/.exec(movets[i]);
			if (!m) {
				continue;
			}
			moves.push(m[1]);
			tstamp.push(~~m[2]);
			console.log(m[1], m[2]);
		}
		var puzzleMoves = puzzleObj.parseScramble(moves.join(' '));
		if (puzzleMoves.length != tstamp.length) {
			console.log('parse error');
			return;
		}
		var triggers = [];
		for (var i = 0; i < puzzleMoves.length; i++) {
			triggers.push([function(move) {
				console.log('triggered', move);
				puzzleObj.addMoves([move]);
			}.bind(null, puzzleMoves[i]), tstamp[i]]);
		}
		timedSeqExec(triggers);
	}

	function popupReplay(options, scramble, recons) {
		var size = 3;
		var options = {
			type: "cube",
			faceColors: col2std(kernel.getProp('colcube'), [3, 4, 5, 0, 1, 2]), // U L F D L B
			dimension: size,
			stickerWidth: 1.7,
			scale: 0.9
		};
		puzzleFactory.init(options, $.noop, puzzleDiv, function(ret, isInit) {
			puzzleObj = ret;
		});
		var scrMoves = puzzleObj.parseScramble(scramble);
		puzzleObj.applyMoves(scrMoves);

		kernel.showDialog([div, function() {
		}, 0, 0], 'share', 'Virtual Replay', function() {
			console.log('callback');
			puzzleObj && puzzleObj.resize();
			parseRecons(recons);
		});
	}

	$(function() {
		div = $('<div>');
		puzzleDiv = $('<div style="height:90%">');
		div.append(puzzleDiv);
	});

	return {
		popupReplay: popupReplay
	}
})();
