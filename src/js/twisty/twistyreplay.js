var replay = execMain(function() {

	var div;
	var puzzleDiv;
	var puzzleObj;
	var puzzle;
	var options = {};;
	var rawRecons;
	var autoOri = false;

	var rangeTime;
	var txtTime;
	var speeds = [0.2, 0.3, 0.5, 0.7, 1.0, 1.5, 2.0, 3.0, 5.0];
	var speedIdx = 4;
	var txtSpeed;
	var shareURL;
	var algSpan;
	var curScramble;

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
		} else if (key == 'o') {
			autoOri = !autoOri;
			if (autoOri) {
				obj.html('auto ori');
			} else {
				obj.html('raw ori');
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
		rawRecons = recons;
		if (autoOri && puzzle == '333') {
			recons = gripRecons.updateReconsOri(recons);
		}
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

	function popupReplay(scramble, recons, _puzzle) {
		puzzle = _puzzle || tools.puzzleType(tools.getCurScramble()[0]);
		var size = ['', '', '222', '333', '444', '555', '666', '777', '888', '999', '101010', '111111'].indexOf(puzzle);
		if (!size) {
			size = 3;
		}
		curScramble = scramble;
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
		}, undefined, function() {
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

	function bindDomElem(elem, scramble, recons, puzzle) {
		if (!elem.hasClass('click')) {
			elem.addClass('click');
		}
		elem.unbind('click').click(popupReplay.bind(null, scramble, recons, puzzle));
	}

	$(function() {
		div = $('<table style="height:98%">');
		puzzleDiv = $('<div style="height:100%;">');
		var span = '<span class="click" data="%" style="display:inline-block; min-width:7%;font-family: iconfont, Arial;">&nbsp;$&nbsp;</span>';
		rangeTime = $('<input type="range" style="width:50%;" data="r">');
		txtTime = $('<span style="user-select:none;"></span>');
		txtSpeed = $('<span style="user-select:none;">1x</span>');
		algSpan = $('<a target="_blank">\u23efAlg</a>');
		div.append(
			$('<tr>').append($('<td>').append(
				span.replace('$', 'raw ori').replace('%', 'o'), '| ',
				algSpan, ' |',
				span.replace('$', 'share link').replace('%', 'a')
			)),
			$('<tr>').append($('<td>').append(puzzleDiv)),
			$('<tr>').append($('<td style="display:flex;justify-content:center;">').append(txtSpeed, ' ', rangeTime, ' ', txtTime)),
			$('<tr>').append($('<td>').append(
				span.replace('$', '\ue807').replace('%', 's-'),
				span.replace('$', '\ue806').replace('%', 's+'),
				span.replace('$', '\ue802').replace('%', 's'),
				span.replace('$', '\ue804').replace('%', 'l'),
				span.replace('$', '\ue800').replace('%', 'p'),
				span.replace('$', '\ue805').replace('%', 'n'),
				span.replace('$', '\ue803').replace('%', 'e')
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
