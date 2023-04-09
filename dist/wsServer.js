var log4js = require('log4js');
var logger = log4js.getLogger();



function BattleRoom(roomId) {
	this.roomId = roomId;
	this.changed = true;
	this.cur = [0, null]; // [solveId, scramble]
	this.last = [-1, null];
	this.next = [1, null];

	// [{
	//	"accountId":accountId,
	//	"solveId":solveId, //integer
	//	"time":time,
	// }, {}, ...]
	this.solves = [];

	// [{
	//	"accountId":accountId,
	//	"elo":elo, //integer
	//	"wins":wins, //integer
	//	"p_elo":prev_elo, //for +2/DNF
	//	"p_wins":prev_wins,
	//	"status":status, //string
	//	"active":timestamp,
	//	"ws":websocket_object
	// }, {}, ...]
	this.players = [];
}

//someone request to join the room
BattleRoom.prototype.reqJoin = function(accountId, nextScramble, ws) {
	var accountObj = this.getAccount(accountId, ws);
	if (accountObj) { // already in the room
		return 1;
	}
	if (this.players.length > 2) {
		return -403;
	}
	this.players.push({
		"accountId": accountId,
		"elo": 1000,
		"wins": 0,
		"p_elo": 1000,
		"p_wins": 0,
		"status": "READY",
		"active": +new Date,
		"soltime": +new Date,
		"ws": ws,
	});
	if (!this.cur[1]) {
		this.cur[1] = nextScramble;
	}
	this.changed = true;
	return 0;
}

BattleRoom.prototype.getAccount = function(accountId, ws) {
	var accountObj = null;
	for (var i = 0; i < this.players.length; i++) {
		if (accountId == this.players[i]['accountId']) {
			accountObj = this.players[i];
			if (ws) {
				accountObj['active'] = +new Date;
				accountObj['ws'] = ws;
			}
			break;
		}
	}
	return accountObj;
}

//someone upload his status
BattleRoom.prototype.updateStatus = function(accountId, status, ws) {
	var accountObj = this.getAccount(accountId, ws);
	if (!accountObj) {
		return -403;
	}
	if (accountObj["status"] == status) {
		return -405;
	}
	if (accountObj["status"] != 'SOLVED' && status != 'SOLVED') {
		accountObj["status"] = status;
		this.changed = true;
	}
	return 0;
}

//someone upload a solve
BattleRoom.prototype.uploadSolve = function(accountId, solveId, time, nextScramble, ws) {
	var accountObj = this.getAccount(accountId, ws);
	if (!accountObj) {
		return -403;
	}
	solveId = ~~solveId;
	this.solves.push({
		"accountId": accountId,
		"solveId": solveId,
		"time": time[0],
		"soltime": +new Date,
	});
	if (solveId != this.cur[0]) {
		this.changed = true;
		return 1;
	}
	if (!this.next[1]) {
		this.next[1] = nextScramble;
	}
	accountObj["status"] = 'SOLVED';
	accountObj["soltime"] = +new Date;
	this.updateSolve();
	this.changed = true;
	return 0;
}

// go next solve if all players are finished
BattleRoom.prototype.updateSolve = function() {
	var reqWait = false;
	for (var i = 0; i < this.players.length; i++) {
		var accountObj = this.players[i];
		if (accountObj["status"] != 'SOLVED') {
			reqWait = true;
			break;
		}
	}
	if (reqWait) {
		return 1;
	}
	//all players are solved: 1) clear solves before 5 solves. 2) update last/cur/next. 3) calculate scores. 4) update players' status
	this.last = this.cur;
	this.cur = this.next;
	this.next = [this.cur[0] + 1, null];
	var curSolves = [];
	for (var i = 0; i < this.solves.length; i++) {
		var solveObj = this.solves[i];
		if (solveObj['solveId'] < this.cur[0] - 5) {
			continue;
		}
		curSolves.push(solveObj);
	}
	this.solves = curSolves;
	for (var i = 0; i < this.players.length; i++) {
		var accountObj = this.players[i];
		accountObj["status"] = 'READY';
	}
}

// check whether someone is offline
BattleRoom.prototype.checkPlayers = function() {
	var ts = +new Date;
	var toLeave = [];
	for (var i = 0; i < this.players.length; i++) {
		var accountObj = this.players[i];
		if (ts - accountObj['active'] > 60000) {
			toLeave.push(accountObj['accountId']);
		}
	}
	if (toLeave.length == 0) {
		return -405;
	}
	for (var i = 0; i < toLeave.length; i++) {
		this.leaveRoom(toLeave[i]);
	}
	this.changed = true;
	return 0;
}

BattleRoom.prototype.kickPlayer = function(accountId, toKick, ws) {
	if (accountId == toKick) {
		return this.leaveRoom(accountId);
	}
	var tokickObj = this.getAccount(toKick);
	if (tokickObj['status'] == 'SOLVES') {
		return -403;
	}
	var accountObj = this.getAccount(accountId, ws);
	if (+new Date - accountObj['soltime'] <= 15000) {
		return -403;
	}
	return this.leaveRoom(tiKick);
}

BattleRoom.prototype.leaveRoom = function(accountId) {
	var accountObj = null;
	var idx = -1;
	for (var i = 0; i < this.players.length; i++) {
		if (accountId == this.players[i]['accountId']) {
			accountObj = this.players[i];
			idx = i;
			break;
		}
	}
	if (idx == -1) {
		return -403;
	}
	this.players.splice(idx, 1);
	var newSolves = [];
	for (var i = 0; i < this.solves.length; i++) {
		if (this.solves[i]['accountId'] != accountId) {
			newSolves.push(this.solves[i]);
		}
	}
	this.solves = newSolves;
	this.changed = true;
	return 0;
}

BattleRoom.prototype.getInfo = function() {
	var ret = {};
	ret['roomId'] = this.roomId;
	ret['cur'] = this.cur;
	ret['last'] = this.last;
	ret['solves'] = this.solves;
	var players = [];
	for (var i = 0; i < this.players.length; i++) {
		var player = {};
		var accountObj = this.players[i];
		player['accountId'] = accountObj['accountId'];
		player['status'] = accountObj['status'];
		player['active'] = accountObj['active'];
		player['wins'] = accountObj['wins'];
		players.push(player);
	}
	ret['players'] = players;
	return JSON.parse(JSON.stringify(ret));
}

BattleRoom.prototype.notifyAll = function() {
	if (!this.changed) {
		return;
	}
	var ret = {};
	ret['roomInfo'] = this.getInfo();
	ret = JSON.stringify(ret);
	for (var i = 0; i < this.players.length; i++) {
		var accountObj = this.players[i];
		accountObj['ws'].send(ret);
	}
	this.changed = false;
}

BattleRoom.prototype.isClear = function() {
	return this.players.length == 0;
}

var rooms = {};

function onMessage(ws, data) {
	var req = {};
	try {
		req = JSON.parse(data);
	} catch (e) {
		logger.info('error', e);
		return;
	}
	logger.info('receive', JSON.stringify(req));
	var action = req['action'];
	var accountId = req['accountId'];
	if (!action || !accountId) {
		logger.info('no action or accountId', action, accountId);
		return;
	}
	var ret = {};
	if ('msgid' in req) {
		ret['msgid'] = req['msgid'];
	}
	
	if (action == 'findRoom') {
		var rms = [];
		for (var roomId in rooms) {
			rms.push(key);
		}
		ret['rooms'] = rms;
		ws.send(JSON.stringify(ret));
		return;
	}

	var roomId = req['roomId'];
	if (!roomId || !(roomId in rooms) && action != 'joinRoom') {
		ret['code'] = -403;
		ws.send(JSON.stringify(ret));
		return;
	}
	var roomObj = rooms[roomId];
	if (action == 'joinRoom') {
		if (!roomObj) {
			rooms[roomId] = new BattleRoom(roomId);
			roomObj = rooms[roomId];
		}
		ret['code'] = roomObj.reqJoin(accountId, req['scramble'], ws);
		ws.send(JSON.stringify(ret));
		if (ret['code'] == 1) {
			ret['roomInfo'] = roomObj.getInfo();
			ws.send(JSON.stringify(ret));
		}
	} else if (action == 'updateStatus') {
		ret['code'] = roomObj.updateStatus(accountId, req['status'], ws);
		ws.send(JSON.stringify(ret));
	} else if (action == 'uploadSolve') {
		ret['code'] = roomObj.uploadSolve(accountId, req['solveId'], req['time'], req['scramble'], ws);
		ws.send(JSON.stringify(ret));
	} else if (action == 'leaveRoom') {
		ret['code'] = roomObj.leaveRoom(accountId);
		ws.send(JSON.stringify(ret));
	} else if (action == 'kickPlayer') {
		ret['code'] = roomObj.kickPlayer(accountId, req['toKick'], ws);
		ws.send(JSON.stringify(ret));
	} else if (action == 'getInfo') {
		ret['roomInfo'] = roomObj.getInfo();
		ws.send(JSON.stringify(ret));
	} else if (action == 'heartBeat') {
		var accountObj = roomObj.getAccount(accountId, ws);
		if (!accountObj) {
			ret['code'] = -403;
		} else {
			ret['code'] = 0;
		}
		ws.send(JSON.stringify(ret));
	}
	roomObj.notifyAll();
}

function intervalCheck() {
	try {
		var toClear = [];
		for (var roomId in rooms) {
			var room = rooms[roomId];
			room.checkPlayers();
			if (room.isClear()) {
				toClear.push(roomId);
			} else {
				room.notifyAll();
			}
		}
		while (toClear.length > 0) {
			var roomId = toClear.pop();
			delete rooms[roomId];
			logger.info('clear roomId: ', roomId);
		}
	} catch (e) {
		logger.info('interval error', e);
	}
}

var ws = require('ws');

const wss = new ws.WebSocketServer({ port: 7999 });

wss.on('connection', function connection(ws) {
	ws.on('error', logger.info);
	ws.on('message', onMessage.bind(null, ws));
});

setInterval(intervalCheck, 1000);
