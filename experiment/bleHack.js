DEBUGBL = true;

var bleHacker = (function() {
	//moves = [[move, timestamp], [], ..., []]
	//return [finalState, msgs]
	function moves2rawmsg(moves, initState) {
		var cc1 = new mathlib.CubieCube();
		var cc2 = new mathlib.CubieCube();
		cc1.fromFacelet(initState);
		var prevMoves = [0, 0, 0, 0, 0, 0, 0];
		var prevStamp = [0, 0, 0, 0, 0, 0, 0];
		var ret = [];
		var cnt = 100;
		var prevts = 0;
		for (var i = 0; i < moves.length; i++) {
			var m = moves[i][0];
			var curTs = moves[i][1]; 
			mathlib.CubieCube.EdgeMult(cc1, mathlib.CubieCube.moveCube[m], cc2);
			mathlib.CubieCube.CornMult(cc1, mathlib.CubieCube.moveCube[m], cc2);
			var tmp = cc1;
			cc1 = cc2;
			cc2 = tmp;
			var axis = ~~(m / 3);
			var pow = m % 3;
			if (pow == 0 || pow == 2) {
				prevMoves.unshift(axis << 1 | pow >> 1);
				prevStamp.unshift(curTs - prevts);
				cnt++;
			} else {
				prevMoves.unshift(axis << 1 | 0);
				prevMoves.unshift(axis << 1 | 0);
				prevStamp.unshift(curTs - prevts);
				prevStamp.unshift(curTs - prevts);
				cnt += 2;
			}
			prevMoves.length = 7;
			prevStamp.length = 7;
			ret.push(buildMoveMsg(cnt, prevMoves, prevStamp));
			if (i % 2 == 1) {
				ret.push(buildCubeMsg(cnt, cc1));
			}
		}
		return [cc1.toFaceCube(), ret];
	}

	var prevMoves = [0, 0, 0, 0, 0, 0, 0];
	var prevStamp = [0, 0, 0, 0, 0, 0, 0];
	var cc1 = new mathlib.CubieCube();
	var cc2 = new mathlib.CubieCube();
	var moveCnt = 0;
	var prevTs = 0;
	var state = mathlib.SOLVED_FACELET;

	function procMove(move, state) {
		cc1.fromFacelet(state);
		var curTs = $.now(); 
		mathlib.CubieCube.EdgeMult(cc1, mathlib.CubieCube.moveCube[move], cc2);
		mathlib.CubieCube.CornMult(cc1, mathlib.CubieCube.moveCube[move], cc2);
		var tmp = cc1;
		cc1 = cc2;
		cc2 = tmp;
		var axis = ~~(move / 3);
		var pow = move % 3;
		var ret = [];
		if (pow == 0 || pow == 2) {
			prevMoves.unshift(axis << 1 | pow >> 1);
			prevStamp.unshift(curTs - prevTs);
			moveCnt++;
		} else {
			prevMoves.unshift(axis << 1 | 0);
			prevMoves.unshift(axis << 1 | 0);
			prevStamp.unshift(curTs - prevTs);
			prevStamp.unshift(curTs - prevTs);
			moveCnt += 2;
		}
		prevTs = curTs;
		prevMoves.length = 7;
		prevStamp.length = 7;
		ret.push(buildMoveMsg(moveCnt, prevMoves, prevStamp));
		if (moveCnt % 5 == 4) {
			ret.push(buildCubeMsg(moveCnt, cc1));
		}
		return [cc1.toFaceCube(), ret];
	}

	function buildMoveMsg(cnt, prevMoves, prevStamp) {
		var ret = [];
		ret.push('0010');
		ret.push((cnt & 0xff | 0x100).toString(2).slice(1));
		for (var i = 0; i < 7; i++) {
			ret.push((prevMoves[i] & 0x1f | 0x20).toString(2).slice(1));
		}
		for (var i = 0; i < 7; i++) {
			ret.push((prevStamp[i] & 0xffff | 0x10000).toString(2).slice(1));
		}
		ret.push('0');
		return ret.join('');
	}

	function buildCubeMsg(cnt, cc) {
		var ret = [];
		ret.push('0100');
		ret.push((cnt & 0xff | 0x100).toString(2).slice(1));
		for (var i = 0; i < 7; i++) {
			ret.push((cc.ca[i] & 0x7 | 0x8).toString(2).slice(1));
		}
		for (var i = 0; i < 7; i++) {
			ret.push((cc.ca[i] >> 3 & 0x3 | 0x4).toString(2).slice(1));
		}
		for (var i = 0; i < 11; i++) {
			ret.push((cc.ea[i] >> 1 & 0xf | 0x10).toString(2).slice(1));
		}
		for (var i = 0; i < 11; i++) {
			ret.push((cc.ea[i] & 0x1 | 0x2).toString(2).slice(1));
		}
		for (var i = 0; i < 58; i++) {
			ret.push('0');
		}
		return ret.join('');
	}

	function bin2arr(val) {
		var ret = [];
		for (var i = 0; i < val.length; i+=8) {
			ret.push(parseInt(val.slice(i, i + 8), 2));
		}
		return new DataView(new Uint8Array(ret).buffer);
	}

	var keymap = {
		74:  0, //U 
		70:  2, //U'
		73:  3, //R 
		75:  5, //R'
		72:  6, //F 
		71:  8, //F'
		83:  9, //D 
		76: 11, //D'
		68: 12, //L 
		69: 14, //L'
		87: 15, //B 
		79: 17  //B'
	}

	function keydown(signal, value) {
		var code = value.which;
		var m = keymap[code];
		if (m !== undefined) {
			var val = procMove(m, state);
			state = val[0];
			for (var i = 0; i < val[1].length; i++) {
				// console.log(bin2arr(val[1][i]));
				$.parseV2Data(bin2arr(val[1][i]));
			}
		}
	}
	
	$(function() {
		kernel.regListener('bleHacker', 'keydown', keydown);
	});
})();
