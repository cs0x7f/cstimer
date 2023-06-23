"use strict";

var battle = execMain(function() {
	var accountDiv = $('<div>');
	var wcaSpan = $('<span class="click">');
	var uidSpan = $('<span class="click">');
	var headStr = TOOLS_BATTLE_HEAD.split('|');
	var joinRoomSpan = $('<span class="click">').html(headStr[1]);
	var leaveRoomSpan = $('<span class="click">').html('[X]');

	var conn = (function() {

		var socket;
		var isOpen = false;
		var idseq = 1;
		var waitList = [];
		var TIMEOUT = 5000;
		var callback = null;
		var toResolves = [];

		function connect() {
			if (isOpen) {
				return Promise.resolve();
			}
			return new Promise(function(resolve, reject) {
				toResolves.push(resolve);
				socket = new WebSocket('wss://cstimer.net/ws20230409');
				socket.onopen = onopen;
				socket.onclose = onclose;
				socket.onerror = onerror;
				socket.onmessage = onmessage;
			});
		}

		function remoteCall(msg) {
			return new Promise(function(resolve, reject) {
				if (!isOpen) {
					reject(-1);
					return;
				}
				msg['msgid'] = idseq;
				waitList[idseq] = resolve;
				idseq++;
				socket.send(JSON.stringify(msg));
				setTimeout(function(reject) {
					reject(-2);
				}.bind(null, reject), TIMEOUT);
			});
		}

		function pushMsg(msg) {
			if (!isOpen) {
				return -1;
			}
			socket.send(JSON.stringify(msg));
			return 0;
		}

		function onopen(e) {
			isOpen = true;
			while (toResolves.length > 0) {
				toResolves.pop()();
			}
		}

		function onclose(e) {
			isOpen = false;
			callback && callback('close');
		}

		function onerror(e) {
			isOpen = false;
			callback && callback('error');
		}

		function onmessage(e) {
			var msg = JSON.parse(e.data);
			var msgid = msg['msgid'];
			if (msgid in waitList) {
				var resolve = waitList[msgid];
				delete waitList[msgid];
				resolve(msg);
			} else {
				callback && callback('msg', msg);
			}
		}

		function setCallback(_callback) {
			callback = _callback;
		}

		function isConnected() {
			return isOpen;
		}

		function close() {
			if (!isOpen) {
				return -1;
			}
			socket.close();
			isOpen = false;
			return 0;
		}

		return {
			connect: connect,
			close: close,
			isConnected: isConnected,
			setCallback: setCallback,
			pushMsg: pushMsg,
			remoteCall: remoteCall
		}
	})();

	var heartBeatTid = 0;

	function resetHeartBeat(isTimeout) {
		if (!roomId || !compId || !conn.isConnected()) {
			return;
		}
		if (!isTimeout && heartBeatTid) {
			clearTimeout(heartBeatTid);
			heartBeatTid = 0;
		}
		if (isTimeout) {
			conn.pushMsg({
				'action': 'heartBeat',
				'roomId': roomId,
				'accountId': compId
			});
		}
		heartBeatTid = setTimeout(resetHeartBeat.bind(null, true), 15000);
	}

	function joinRoom(rstRoomId) {
		if (rstRoomId || !roomId) {
			var val = prompt(TOOLS_BATTLE_JOINALERT + ' [a-zA-Z0-9]', roomId || (100 + ~~(Math.random() * 900)));
			if (!/^[0-9a-zA-Z]{3,20}$/.exec(val)) {
				alert('invalid room ID');
				return;
			}
			roomId = val;
		}
		if (!conn.isConnected()) {
			conn.connect().then(joinRoom.bind(null, false));
			return;
		}
		if (!checkConnState() || !roomId) {
			return;
		}
		conn.remoteCall({
			'action': 'joinRoom',
			'roomId': roomId,
			'accountId': compId,
			'scramble': scramble_333.getRandomScramble().trim()
		}).then(function(ret) {
			DEBUG && console.log('[battle] joinRoom ret=', JSON.stringify(ret));
			resetHeartBeat();
		});
	}

	function leaveRoom(direct) {
		if (!checkConnState(true) || !roomId) {
			return;
		}
		if (!direct) {
			if (!confirm(TOOLS_BATTLE_LEAVEALERT + '?')) {
				return;
			}
		}
		conn.remoteCall({
			'action': 'leaveRoom',
			'roomId': roomId,
			'accountId': compId
		}).then(conn.close, conn.close);
		roomInfo = null;
		renderRoom();
		resetHeartBeat();
	}

	function checkConnState(checkRoom) {
		if ((!roomInfo && checkRoom) || !conn.isConnected()) {
			compId = null;
			return compId;
		}
		compId = exportFunc.getDataId('wcaData', 'cstimer_token') || exportFunc.getDataId('locData', 'compid') || setCompId();
		return compId;
	}

	function submitStatus(status) {
		if (!checkConnState(true) || !roomId) {
			return;
		}
		conn.remoteCall({
			'action': 'updateStatus',
			'roomId': roomId,
			'accountId': compId,
			'status': status
		}).then(function(ret) {
			DEBUG && console.log('[battle] update status ret=', ret);
			resetHeartBeat();
		});
	}

	function submitSolve(time, isLast) {
		if (!checkConnState(true) || !roomId) {
			return;
		}
		var solvScr = time[1];
		if (solvScr != roomInfo['cur'][1] && solvScr != roomInfo['last'][1]) {
			return;
		}
		if (localLastSolve && localLastSolve[1] == time[1] && (!isLast || time[0][1] != localLastSolve[0][1])) {
			return;
		}
		localLastSolve = time;
		var solveId = solvScr == roomInfo['cur'][1] ? roomInfo['cur'][0] : roomInfo['last'][0];
		conn.remoteCall({
			'action': 'uploadSolve',
			'roomId': roomId,
			'accountId': compId,
			'solveId': solveId,
			'time': time,
			'scramble': scramble_333.getRandomScramble().trim()
		}).then(function(ret) {
			DEBUG && console.log('[battle] upload solve ret=', ret);
			resetHeartBeat();
		});
	}

	var roomId;
	var compId;
	var roomInfo;
	var toStart = false;
	var localLastSolve = [[-1, 1], null];

	function onNotify(event, obj) {
		if (event == 'msg') {
			if ('roomInfo' in obj) {
				roomInfo = obj['roomInfo'];
				onRoomInfo();
			}
		} else {
			roomInfo = null;
			if (kernel.getProp('scrType') == 'remoteBattle') {
				kernel.pushSignal('ctrl', ['scramble', 'next']);
			}
		}
		renderRoom();
	}

	conn.setCallback(onNotify);

	function onRoomInfo() {
		if (!roomInfo) {
			return;
		}
		if (roomInfo['cur'][1] && roomInfo['cur'][1] != localLastSolve[1]) {
			scrResolve && scrResolve(['$T333$' + roomInfo['cur'][1]]);
			scrResolve = null;
			if (kernel.getProp('scrType') != 'remoteBattle') {
				kernel.setProp('scrType', 'remoteBattle');
			}
		}
	}

	var roomTable;

	function renderRoom() {
		DEBUG && console.log('[battle] render room', roomInfo);
		if (roomInfo) {
			accountDiv.hide();
		} else {
			accountDiv.show();
		}
		roomTable.empty();
		var titles = TOOLS_BATTLE_TITLE.split('|').slice(0, 3);
		titles.splice(1, 0, 'ELO');

		roomTable.append($('<tr>').append($('<td colspan=5>').append(headStr[0] + ': ', joinRoomSpan, '&nbsp;', leaveRoomSpan)));
		roomTable.append('<tr><td colspan=2>' + titles.join('</td><td>') + '</td></tr>');
		joinRoomSpan.unbind('click');
		leaveRoomSpan.unbind('click');
		if (!roomInfo) {
			roomTable.append('<tr><td colspan=5 style="width:0;">' + TOOLS_BATTLE_INFO + '</td></tr>');
			joinRoomSpan.addClass('click').html(headStr[1]).click(joinRoom.bind(null, true));
			leaveRoomSpan.hide();
		} else {
			joinRoomSpan.removeClass('click').html(roomInfo['roomId']);
			leaveRoomSpan.click(leaveRoom.bind(null, false)).show();
			var players = roomInfo['players'];
			var solves = roomInfo['solves'];
			var solveDict = {};
			var hasSolved = false;
			var statusMap = ('???|' + TOOLS_BATTLE_STATUS).split('|');
			for (var i = 0; i < solves.length; i++) {
				var solveObj = solves[i];
				var accountId = solveObj['accountId'];
				solveDict[accountId] = solveDict[accountId] || {};
				solveDict[accountId][solveObj['solveId']] = [solveObj['time'], solveObj['soltime']];
				if (solveObj['solveId'] == roomInfo['cur'][0]) {
					hasSolved = true;
				}
			}
			players.sort(function(a, b) {
				return b['elo'] - a['elo'];
			});
			var curSolveId = roomInfo['cur'][0];
			for (var i = 0; i < players.length; i++) {
				var player = players[i];
				var account = player['accountId'];
				if (account.indexOf('|') != -1) {
					account = '<b>' + account.split('|')[1] + '</b>';
				} else if (account.length > 10) {
					account = account.slice(0, 4) + '...' + account.slice(account.length - 3);
				}
				var curTime = (solveDict[player['accountId']] || {})[curSolveId];
				var isSolved = player['status'] == 'SOLVED';
				var lastTime = (solveDict[player['accountId']] || {})[curSolveId - 1];
				lastTime = isSolved ? curTime : lastTime;
				lastTime = lastTime ? stats.pretty(lastTime[0], true) : 'N/A';
				if (hasSolved && !isSolved) {
					lastTime = '<span style="color:#888">' + lastTime + '</span>';
				}
				roomTable.append('<tr><td>' + (i + 1) + '</td><td>' + account +
					'</td><td>' + player['elo'] +
					'</td><td>' + statusMap[['READY', 'INSPECT', 'SOLVING', 'SOLVED', 'LOSS'].indexOf(player['status']) + 1] +
					'</td><td>' + lastTime + '</td></tr>');
			}
		}
	}

	function updateAccountDiv() {
		accountDiv.empty().append('ID: ');
		wcaSpan.empty();
		uidSpan.empty();

		var wcauid = exportFunc.getDataId('wcaData', 'cstimer_token');
		if (wcauid) {
			var wcaid = exportFunc.getDataId('wcaData', 'wca_me')['wca_id'];
			wcaSpan.append(wcaid || 'WCA Account', ' (WCA)').click(function() {
				exportFunc.logoutFromWCA(true);
				updateAccountDiv();
			});
			accountDiv.append(wcaSpan);
			return;
		} else {
			wcaSpan.append(EXPORT_LOGINWCA);
			wcaSpan.click(function() {
				location.href = exportFunc.wcaLoginUrl;
			});
		}
		var compid = exportFunc.getDataId('locData', 'compid');
		uidSpan.append((compid || 'N/A') + ' (' + OLCOMP_ANONYM + ')');
		accountDiv.append(uidSpan.unbind('click').click(setCompId), ' | ', wcaSpan);
	}

	function setCompId() {
		var compid = prompt(OLCOMP_SUBMITAS, exportFunc.getDataId('locData', 'compid'));
		if (compid == null) {
			return false;
		} else if (!exportFunc.isValidId(compid)) {
			alert(EXPORT_INVID);
			return false;
		}
		localStorage['locData'] = JSON.stringify({ id: exportFunc.getDataId('locData', 'id'), compid: compid });
		updateAccountDiv();
		return compid;
	}

	var isInit = false;

	function execFunc(fdiv, e) {
		if (!fdiv || isInit) {
			isInit = !!fdiv;
			if (!fdiv) {
				conn.close();
			}
			return;
		}
		fdiv.empty().append($('<div style="font-size: 0.75em; text-align: center;">')
			.append(accountDiv, roomTable));
		updateAccountDiv();
		renderRoom();
		isInit = true;
	}

	var solves = [];
	var submitted = false;
	var lastStatus = 'READY';

	function procSignal(signal, value) {
		if (!isInit) {
			return;
		}
		if (signal == 'export') {
			updateAccountDiv();
			return;
		}
		if (signal == 'timerStatus') {
			var status = 'READY';
			if (value > 0) {
				status = 'SOLVING';
			} else if (value < -2) {
				status = 'INSPECT';
			}
			if (status != lastStatus) {
				lastStatus = status;
				submitStatus(status);
			}
			return;
		}
		value = JSON.parse(JSON.stringify(value));
		if (signal == 'timestd') {
			submitSolve(value, false);
		} else if (signal == 'timepnt') {
			submitSolve(value, true);
		}
	}

	var scrResolve;

	function getScrambles() {
		if (!roomInfo) {
			return Promise.reject();
		}
		if (roomInfo['cur'][1] && roomInfo['cur'][1] != localLastSolve[1]) {
			return Promise.resolve(['$T333$' + roomInfo['cur'][1]]);
		}
		return new Promise(function(resolve, reject) {
			scrResolve = resolve;
		});
	}

	$(function() {
		roomTable = $('<table class="table">');
		tools.regTool('battle', TOOLS_BATTLE, execFunc);
		kernel.regListener('battle', 'timestd', procSignal);
		kernel.regListener('battle', 'timepnt', procSignal);
		kernel.regListener('battle', 'timerStatus', procSignal);
		kernel.regListener('battle', 'export', procSignal, /^account$/);
	});

	return {
		getScrambles: getScrambles
	}
});
