var replay = execMain(function() {

	var div;
	var puzzleDiv;
	var puzzleObj;
	var options = {};;

	var rangeTime;
	var txtTime;
	var speeds = [0.2, 0.3, 0.5, 0.7, 1.0, 1.5, 2.0, 3.0, 5.0];
	var speedIdx = 4;
	var txtSpeed;
	var shareURL;

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
	var scrMoves = [];
	var playMoves = []; //[[move, time], ...]
	var curPlayIdx = 0;
	var curTime = 0;
	var status = 0; // 0 - idle, 1 - play

	function startPlayMoves() {
		if (activeTid) {
			clearTimeout(activeTid);
			activeTid = 0;
		}
		startTs = +new Date - curTime;
		status = 1;
		updateTime();
	}

	function normTime(ts, inv) {
		if (inv) {
			return ts < 0 ? -1 : ts * speeds[speedIdx];
		} else {
			return ts < 0 ? -2000 : ts / speeds[speedIdx];
		}
	}

	function goToTime(tt) {
		for (var i = 0; i < playMoves.length; i++) {
			if (playMoves[i][1] >= tt) {
				return goToStep(i);
			}
		}
		return goToStep(playMoves.length);
	}

	function goToStep(step) {
		if (step > curPlayIdx) {
			for (var i = curPlayIdx; i < step; i++) {
				if (Math.abs(step - 1 - i) > 3) {
					puzzleObj.applyMoves([playMoves[i][0]]);
				} else {
					puzzleObj.addMoves([playMoves[i][0]]);
				}
			}
		} else if (step < curPlayIdx) {
			for (var i = curPlayIdx - 1; i >= step; i--) {
				var move = playMoves[i][0].slice();
				move[3] = -move[3];
				if (Math.abs(step - 1 - i) > 3) {
					puzzleObj.applyMoves([move]);
				} else {
					puzzleObj.addMoves([move]);
				}
			}
		}
		curPlayIdx = step;
		curTime = normTime(playMoves[Math.max(0, step - 1)][1]);
		updateTime();
	}

	function procClick(e) {
		var obj = $(e.target);
		if (!obj.hasClass('click') && !obj.is('input')) {
			return;
		}
		var key = obj.attr('data');
		var _status = status;
		var ctime = normTime(curTime, true);
		status = 0;
		if (key == 'l') {
			if (curPlayIdx > 0) {
				goToStep(curPlayIdx - 1);
			}
		} else if (key == 'n') {
			if (curPlayIdx < playMoves.length) {
				goToStep(curPlayIdx + 1);
			}
		} else if (key == 'p') {
			status = 1 - _status;
			if (status == 1) {
				startPlayMoves();
			}
		} else if (key == 's') {
			goToStep(0);
		} else if (key == 'e') {
			goToStep(playMoves.length);
		} else if (key == 'r') {
			goToTime(rangeTime.val());
		} else if (key == 's+') {
			speedIdx = Math.min(speedIdx + 1, speeds.length - 1);
			txtSpeed.html(speeds[speedIdx] + 'x');
			curTime = normTime(ctime);
		} else if (key == 's-') {
			speedIdx = Math.max(speedIdx - 1, 0);
			txtSpeed.html(speeds[speedIdx] + 'x');
			curTime = normTime(ctime);
		} else if (key == 'a') {
			if ($.clipboardCopy(shareURL)) {
				logohint.push('share link copied');
			}
		}
	}

	function execLoop() {
		var ts = +new Date - startTs;
		if (activeTid) {
			clearTimeout(activeTid);
			activeTid = 0;
		}
		if (status == 0) {
			return curTime;
		}
		while (curPlayIdx < playMoves.length && normTime(playMoves[curPlayIdx][1]) <= ts) {
			puzzleObj.addMoves([playMoves[curPlayIdx][0]]);
			curPlayIdx++;
		}
		if (curPlayIdx >= playMoves.length) {
			return ts;
		}
		activeTid = setTimeout(execLoop, normTime(playMoves[curPlayIdx][1]) - ts);
		return ts;
	}

	function updateTime() {
		curTime = execLoop();
		curTime = Math.min(curTime, normTime(playMoves[playMoves.length - 1][1]));
		rangeTime.val(normTime(curTime, true));
		txtTime.html(kernel.pretty(normTime(curTime, true)));
		if (curTime >= normTime(playMoves[playMoves.length - 1][1])) {
			status = 0;
		}
		if (status == 1) {
			requestAnimFrame(updateTime);
		}
	}

	function parseRecons(recons) {
		var movets = recons.split(' ');
		var moves = [];
		var tstamp = [];
		for (var i = 0; i < movets.length; i++) {
			var m = /^(.*)@(\d+)$/.exec(movets[i]);
			if (!m) {
				continue;
			}
			moves.push(m[1]);
			tstamp.push(~~m[2]);
		}
		var puzzleMoves = puzzleObj.parseScramble(moves.join(' '));
		if (puzzleMoves.length != tstamp.length) {
			console.log('parse error');
			return;
		}
		rangeTime.attr('min', -1);
		rangeTime.attr('max', tstamp[tstamp.length - 1]);
		playMoves = [];
		for (var i = 0; i < puzzleMoves.length; i++) {
			if (tstamp[i] == 0 && puzzleObj.isRotation(puzzleMoves[i])) {
				tstamp[i] -= 1;
			}
			playMoves.push([puzzleMoves[i], tstamp[i]]);
		}
		curPlayIdx = 0;
		curTime = normTime(-1);
		startPlayMoves();
	}

	function popupReplay(scramble, recons, puzzle) {
		puzzle = puzzle || tools.puzzleType(tools.getCurScramble()[0]);
		var size = ['', '', '222', '333', '444', '555', '666', '777', '888', '999', '101010', '111111'].indexOf(puzzle);
		if (!size) {
			size = 3;
		}
		shareURL = new URL('?vrcreplay=' + LZString.compressToEncodedURIComponent(JSON.stringify([scramble, recons, puzzle])), location).toString();
		options = {
			type: "cube",
			faceColors: col2std(kernel.getProp('colcube'), [3, 4, 5, 0, 1, 2]), // U L F D L B
			dimension: size,
			stickerWidth: 1.7,
			scale: 0.9
		};
		kernel.showDialog([div, function() {
			status = 0;
		}], 'share', 'Virtual Replay', function() {
			puzzleFactory.init(options, $.noop, puzzleDiv, function(ret, isInit) {
				div.unbind('click').click(procClick);
				rangeTime.unbind('input click').bind('input', procClick);
				puzzleObj = ret;
				puzzleObj && puzzleObj.resize();
				scrMoves = puzzleObj.parseScramble(scramble);
				puzzleObj.applyMoves(scrMoves);
				parseRecons(recons);
			});
		});
	}

	$(function() {
		div = $('<table style="height:98%">');
		puzzleDiv = $('<div style="height:100%;">');
		var span = '<span class="click" data="%" style="display:inline-block; width:7%;">&nbsp;$&nbsp;</span>';
		rangeTime = $('<input type="range" style="width:50%;" data="r">');
		txtTime = $('<span>');
		txtSpeed = $('<span>1x</span>');
		div.append(
			$('<tr>').append($('<td>').append(puzzleDiv)),
			$('<tr>').append($('<td>').append(txtSpeed, ' ', rangeTime, ' ', txtTime)),
			$('<tr>').append($('<td>').append(
				span.replace('$', '\u23ee').replace('%', 's'),
				span.replace('$', '&lt;').replace('%', 'l'),
				span.replace('$', '\u23f5').replace('%', 'p'),
				span.replace('$', '&gt;').replace('%', 'n'),
				span.replace('$', '\u23ed').replace('%', 'e'),
				span.replace('$', '\u23eb').replace('%', 's+'),
				span.replace('$', '\u23ec').replace('%', 's-'),
				span.replace('$', '&#128203;').replace('%', 'a')
			))
		);
		var req = $.urlParam('vrcreplay');
		if (req) {
			$.clearUrl('vrcreplay');
			try {
				req = JSON.parse(LZString.decompressFromEncodedURIComponent(req));
				setTimeout(function() {
					popupReplay(req[0], req[1], req[2]);
				}, 500);
			} catch (e) {
				console.log(e);
			}
		}
	});

	return {
		popupReplay: popupReplay
	}
});
