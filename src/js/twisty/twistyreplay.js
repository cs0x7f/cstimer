var replay = execMain(function() {

	var div;
	var puzzleDiv;
	var puzzleObj;
	var puzzle;
	var options = {};;
	var rawRecons;
	var autoOri = true;

	var rangeTime;
	var txtTime;
	var speeds = [0.2, 0.3, 0.5, 0.7, 1.0, 1.5, 2.0, 3.0, 5.0];
	var speedIdx = 4;
	var txtSpeed;
	var shareURL;
	var algSpan;
	var playSpan;
	var curScramble;
	var moveSeqTd;

	var startTs = 0;
	var activeTid = 0;
	var scrMoves = [];
	var playMoves = []; //[[move, time], ...]
	var curPlayIdx = 0;
	var curTime = 0;
	var status = 0; // 0 - idle, 1 - play
	var maxMoveLen = 0;

	var vrcOriStr = VRCREPLAY_ORI.split('|');

	function setStatus(_status) {
		if (_status != status) {
			status = _status;
			playSpan.html(status ? '\ue801' : '\ue800');
		}
	}

	function startPlayMoves() {
		if (activeTid) {
			clearTimeout(activeTid);
			activeTid = 0;
		}
		startTs = +new Date - curTime;
		setStatus(1);
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
				var move = puzzleObj.moveInv(playMoves[i][0])
				if (Math.abs(step - 1 - i) > 3) {
					puzzleObj.applyMoves([move]);
				} else {
					puzzleObj.addMoves([move]);
				}
			}
		}
		curPlayIdx = step;
		var movets = playMoves[Math.max(0, step - 1)];
		curTime = normTime(movets ? movets[1] : 0);
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
		setStatus(0);
		if (key == 'l') {
			if (curPlayIdx > 0) {
				goToStep(curPlayIdx - 1);
			}
		} else if (key == 'n') {
			if (curPlayIdx < playMoves.length) {
				goToStep(curPlayIdx + 1);
			}
		} else if (key == 'p') {
			if (_status == 0 && playMoves.length > 0 && curTime >= normTime(playMoves.at(-1)[1])) {
				goToStep(0);
			}
			setStatus(1 - _status);
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
			$.clipboardCopy(shareURL).then(
				logohint.push.bind(logohint, LGHINT_LINKCOPY),
				logohint.push.bind(logohint, 'Copy Failed')
			);
		} else if (key == 'o') {
			autoOri = !autoOri;
			if (autoOri) {
				obj.html(vrcOriStr[1]);
			} else {
				obj.html(vrcOriStr[0]);
			}
			goToStep(0);
			parseRecons(rawRecons);
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
		var lastTs = playMoves.length > 0 ? playMoves.at(-1)[1] : 0;
		curTime = Math.min(curTime, normTime(lastTs));
		rangeTime.val(normTime(curTime, true));
		txtTime.html((curTime >= 0 ? kernel.pretty(normTime(curTime, true)) : '--') + '/' + kernel.pretty(lastTs));
		updateMoveTd();
		if (curTime >= normTime(lastTs)) {
			setStatus(0);
		}
		if (status == 1) {
			requestAnimFrame(updateTime);
		}
	}

	function updateMoveTd() {
		var startIdx = Math.max(curPlayIdx - 4, 0);
		var endIdx = Math.min(curPlayIdx + 5, playMoves.length);
		var moves = [];
		for (var i = -4; i < 5; i++) {
			var idx = i + curPlayIdx;
			var pad;
			if (idx < 0 || idx >= playMoves.length) {
				moves[i + 4] = '<span style="color:#888;">~</span>';
				pad = mathlib.valuedArray(maxMoveLen - 1, ' ').join('');
			} else {
				var move = puzzleObj.move2str(playMoves[idx][0]);
				pad = mathlib.valuedArray(maxMoveLen - move.length, ' ').join('');
				var isRot = puzzleObj.isRotation(playMoves[idx][0]);
				if (isRot) {
					move = '<span style="color:#888;">' + move + '</span>';
				}
				moves[i + 4] = move;
			}
			if (i == 0) {
				moves[i + 4] = '<b><u>' + moves[i + 4] + '</u></b>';
			}
			moves[i + 4] = pad + moves[i + 4];
		}
		moveSeqTd.empty();
		moveSeqTd.html(moves.join('<br>'));
	}

	function fixMoveOri(move, isInit) {
		if (!autoOri || !/^\d+$/.exec(puzzle)) {
			return isInit ? [] : move;
		}
		var targetOri = kernel.getProp('giiOri');
		if (targetOri == 'auto') {
			return isInit ? [] : move;
		}
		if (isInit) {
			return puzzleObj.parseScramble(mathlib.CubieCube.rot2str[targetOri]);
		}
		targetOri = mathlib.CubieCube.rotMulI[0][~~targetOri];
		var axis = 'URFDLB'.indexOf(move[2]);
		axis = mathlib.CubieCube.rotMulM[targetOri][axis * 3] / 3;
		move = move.slice();
		move[2] = 'URFDLB'.charAt(axis);
		return move;
	}

	function parseRecons(recons) {
		rawRecons = recons;
		algSpan.attr('href', 'https://alg.cubing.net/?alg=' + encodeURIComponent((recons || '').replace(/@(\d+)/g, '/*$1*/').replace(/-/g, '&#45;')) + '&setup=' + encodeURIComponent(curScramble || ''));
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
		rangeTime.attr('max', tstamp.at(-1));
		playMoves = fixMoveOri(null, true);
		for (var i = 0; i < playMoves.length; i++) {
			playMoves[i] = [playMoves[i], -1];
		}
		for (var i = 0; i < puzzleMoves.length; i++) {
			if (tstamp[i] == 0 && puzzleObj.isRotation(puzzleMoves[i])) {
				tstamp[i] -= 1;
			}
			playMoves.push([fixMoveOri(puzzleMoves[i]), tstamp[i]]);
		}
		maxMoveLen = 0;
		for (var i = 0; i < playMoves.length; i++) {
			maxMoveLen = Math.max(maxMoveLen, ("" + puzzleObj.move2str(playMoves[i][0])).length);
		}
		curPlayIdx = 0;
		curTime = normTime(-1);
		startPlayMoves();
	}

	function popupReplay(scramble, recons, _puzzle) {
		puzzle = _puzzle || tools.puzzleType(tools.getCurScramble()[0]);
		var size = ['222', '333', '444', '555', '666', '777', '888', '999', '101010', '111111'].indexOf(puzzle);
		curScramble = scramble;
		shareURL = new URL('?vrcreplay=' + LZString.compressToEncodedURIComponent(JSON.stringify([scramble, recons, puzzle])), location).toString();
		var options = {
			puzzle: 'cube3',
		};
		if (size != -1) {
			options['puzzle'] = 'cube' + (size + 2);
		} else if (/^udpoly$/.exec(puzzle)) {
			options.puzzle = puzzle;
			options.scramble = scramble;
		} else if (puzzleFactory.twistyre.exec(puzzle)) {
			options.puzzle = puzzle;
		}
		kernel.showDialog([div, function() {
			setStatus(0);
		}, undefined, function() {
			setStatus(0);
		}], 'share', VRCREPLAY_TITLE, function() {
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

	function bindDomElem(elem, scramble, recons, puzzle) {
		if (!elem.hasClass('click')) {
			elem.addClass('click');
		}
		elem.unbind('click').click(popupReplay.bind(null, scramble, recons, puzzle));
	}

	$(function() {
		div = $('<table style="height:98%">');
		puzzleDiv = $('<td style="height:80%">');
		var spanTpl = $.format.bind(null, '<span class="click playbutton" data="{0}">{1}</span>');
		rangeTime = $('<input type="range" style="width:50%;" data="r">');
		txtTime = $('<span style="user-select:none;"></span>');
		txtSpeed = $('<span style="user-select:none;">1x</span>');
		algSpan = $('<a target="_blank">\u23efAlg</a>');
		playSpan = $(spanTpl(['p', '\ue800']));
		moveSeqTd = $('<td style="width:0%;font-family:monospace;white-space:pre;">');
		div.append(
			$('<tr>').append($('<td>').append(
				spanTpl(['o', vrcOriStr[1]]), '| ',
				algSpan, ' |',
				spanTpl(['a', VRCREPLAY_SHARE])
			)),
			$('<tr>').append(puzzleDiv, moveSeqTd),
			$('<tr>').append($('<td style="display:flex;justify-content:center;">').append(txtSpeed, ' ', rangeTime, ' ', txtTime)),
			$('<tr>').append($('<td>').append(
				spanTpl(['s-', '\ue807']),
				spanTpl(['s+', '\ue806']),
				spanTpl(['s', '\ue802']),
				spanTpl(['l', '\ue804']),
				playSpan,
				spanTpl(['n', '\ue805']),
				spanTpl(['e', '\ue803'])
			))
		);
		var req = $.urlParam('vrcreplay');
		if (req) {
			$.clearUrl('vrcreplay');
			try {
				req = JSON.parse(LZString.decompressFromEncodedURIComponent(decodeURIComponent(req)));
				setTimeout(function() {
					popupReplay(req[0], req[1], req[2]);
				}, 500);
			} catch (e) {
				console.log(e);
			}
		}
	});

	return {
		popupReplay: popupReplay,
		bindDomElem: bindDomElem
	}
});
