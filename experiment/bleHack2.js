DEBUGBL = true;

var bleHacker2 = (function() {
	// V4 move event (mode 0x01):
	// [mode:8][len:8][ts:32 LE][moveCnt:16 LE][pow:2][faceHot:6]
	// faceHot one-hot: U=2 R=32 F=8 D=1 L=16 B=4 (see decodeV4Move)
	function buildMoveMsg(cnt, move, ts) {
		var axis = ~~(move / 3);
		// csTimer move pow: 0=CW, 1=double, 2=prime (moveCube[a+1]=double, moveCube[a+2]=prime)
		// V4 wire pow:      0=CW, 1=prime,  2=double (decodeV4Move)
		var pow = [0, 2, 1][move % 3];
		var faceHot = [2, 32, 8, 1, 16, 4][axis];
		var ret = [];
		ret.push((0x01 | 0x100).toString(2).slice(1)); // mode
		ret.push((0x07 | 0x100).toString(2).slice(1)); // len = 7
		ret.push((ts & 0xff | 0x100).toString(2).slice(1)); // ts byte0 (LSB)
		ret.push((ts >> 8 & 0xff | 0x100).toString(2).slice(1)); // ts byte1
		ret.push((ts >> 16 & 0xff | 0x100).toString(2).slice(1)); // ts byte2
		ret.push((ts >> 24 & 0xff | 0x100).toString(2).slice(1)); // ts byte3 (MSB)
		ret.push((cnt & 0xff | 0x100).toString(2).slice(1)); // moveCnt low byte
		ret.push((0 | 0x100).toString(2).slice(1)); // moveCnt high byte
		ret.push((pow << 6 | faceHot | 0x100).toString(2).slice(1)); // pow(2) + faceHot(6)
		return ret.join('');
	}

	// V4 cube state event (mode 0xED):
	// [mode:8][len:8][moveCnt:16 LE][cornerPerm:21][cornerOri:14][pad:2][edgePerm:44][edgeOri:11][pad:4]
	function buildCubeMsg(cnt, cc) {
		var ret = [];
		ret.push((0xED | 0x100).toString(2).slice(1)); // mode
		ret.push((0x0E | 0x100).toString(2).slice(1)); // len = 14
		ret.push((cnt & 0xff | 0x100).toString(2).slice(1)); // moveCnt low byte
		ret.push((0 | 0x100).toString(2).slice(1)); // moveCnt high byte
		for (var i = 0; i < 7; i++) { // corner perm, 3 bits each
			ret.push((cc.ca[i] & 0x7 | 0x8).toString(2).slice(1));
		}
		for (var i = 0; i < 7; i++) { // corner ori, 2 bits each
			ret.push((cc.ca[i] >> 3 & 0x3 | 0x4).toString(2).slice(1));
		}
		ret.push('00'); // 2 bits padding
		for (var i = 0; i < 11; i++) { // edge perm, 4 bits each
			ret.push((cc.ea[i] >> 1 & 0xf | 0x10).toString(2).slice(1));
		}
		for (var i = 0; i < 11; i++) { // edge ori, 1 bit each
			ret.push((cc.ea[i] & 0x1 | 0x2).toString(2).slice(1));
		}
		ret.push('0000'); // 4 bits padding
		return ret.join('');
	}

	//moves = [[move, timestamp], [], ..., []]
	//return [finalState, msgs]
	function moves2rawmsg(moves, initState) {
		var cc1 = new mathlib.CubieCube();
		var cc2 = new mathlib.CubieCube();
		cc1.fromFacelet(initState);
		var ret = [];
		var cnt = 0;
		ret.push(buildCubeMsg(cnt, cc1)); // init cube state (sets prevMoveCnt)
		for (var i = 0; i < moves.length; i++) {
			var m = moves[i][0];
			var ts = moves[i][1] || 0;
			mathlib.CubieCube.EdgeMult(cc1, mathlib.CubieCube.moveCube[m], cc2);
			mathlib.CubieCube.CornMult(cc1, mathlib.CubieCube.moveCube[m], cc2);
			var tmp = cc1;
			cc1 = cc2;
			cc2 = tmp;
			cnt = (cnt + 1) & 0xff;
			ret.push(buildMoveMsg(cnt, m, ts));
		}
		return [cc1.toFaceCube(), ret];
	}

	var cc1 = new mathlib.CubieCube();
	var cc2 = new mathlib.CubieCube();
	var moveCnt = 0;
	var state = mathlib.SOLVED_FACELET;
	var initialized = false;

	function procMove(move, state) {
		cc1.fromFacelet(state);
		var ts = $.now() & 0xffffffff;
		var ret = [];
		if (!initialized) {
			// V4 move events are ignored until a cube state event initializes prevMoveCnt,
			// so inject one (pre-move state) on the first keypress.
			ret.push(buildCubeMsg(moveCnt, cc1));
			initialized = true;
		}
		mathlib.CubieCube.EdgeMult(cc1, mathlib.CubieCube.moveCube[move], cc2);
		mathlib.CubieCube.CornMult(cc1, mathlib.CubieCube.moveCube[move], cc2);
		var tmp = cc1;
		cc1 = cc2;
		cc2 = tmp;
		moveCnt = (moveCnt + 1) & 0xff;
		ret.push(buildMoveMsg(moveCnt, move, ts));
		return [cc1.toFaceCube(), ret];
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
				$.parseV4Data(bin2arr(val[1][i]));
			}
		}
	}

	$(function() {
		kernel.regListener('bleHacker2', 'keydown', keydown);
	});
})();
