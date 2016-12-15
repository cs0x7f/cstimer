"use strict";
var scramble = (function(rn, rndEl) {
	var div = $('<div id="scrambleDiv"/>');
	var title = $('<div />').addClass('title');
	var select = $('<select />');
	var select2 = $('<select />');
	var scrLen = $('<input type="text" maxlength="3">');
	var sdiv = $('<div id="scrambleTxt"/>');
	var alias = {
		'333fm' : '333', 
		'333oh' : '333', 
		'333ft' : '333', 
		'444bld' : '444wca', 
		'555bld' : '555wca'
	};

	var inputText = $('<textarea />');

	var inputScramble = [];

	function mega(turns, suffixes, length) {
		if (suffixes == undefined) {
			suffixes = [""];
		}
		if (length == undefined) {
			length = len;
		}
		var donemoves = 0;
		var lastaxis = -1;
		var s = [];
		var first, second;
		for (var i=0; i<length; i++) {
			do {
				first=rn(turns.length);
				second=rn(turns[first].length);
				if (first!=lastaxis) {
					donemoves = 0;
					lastaxis=first;
				}
			} while (((donemoves >> second) & 1) != 0);
			donemoves |= 1 << second;
			if (turns[first][second].constructor == Array) {
				s.push(rndEl(turns[first][second])+rndEl(suffixes));
			} else {
				s.push(turns[first][second]+rndEl(suffixes));
			}
		}
		return s.join(' ');
	}

	function genScramble() {
		kernel.blur();
		sdiv.html('Scrambling...');
		lasttype = type;
		typeExIn = (!type || type == 'input') ? typeExIn : type;
		lastscramble = scramble;

		type = select2.val();
		len = ~~scrLen.val();
		if (lasttype != type) {
			kernel.setProp('scrType', type);
		}
		if (type != 'input') {
			inputScramble = [];
		}
		scramble = "";
		setTimeout(doScrambleIt, 0);
	}

// #################### SCRAMBLING ####################


var seq=[];
var p=[];
var type, lasttype, typeExIn = '333o';
var len=0;
var cubesuff=["","2","'"];
var minxsuff=["","2","'","2'"];
var scramble, lastscramble;

function doScrambleIt() {
	calcScramble();
	if (scramble) {
		scrambleOK();
	} else {
		sdiv.html("Scramble Error. ");
	}
}

function calcScramble() {
	scramble = "";
	var realType = type;
	if (type in alias) {
		realType = alias[type];
	}

	if (realType in scramblers) {
		scramble = scramblers[realType](realType, len);
		return;
	}

	switch (realType) {
	case "335": // 3x3x5
		scramble = mega([[["U","U'","U2"],["D","D'","D2"]],["R2","L2"],["F2","B2"]])
			+ " / "
			+ scramblers['333']();
		break;
	case "337": // 3x3x7
		scramble = mega([[["U","U'","U2","u","u'","u2","U u","U u'","U u2","U' u","U' u'","U' u2","U2 u","U2 u'","U2 u2"],["D","D'","D2","d","d'","d2","D d","D d'","D d2","D' d","D' d'","D' d2","D2 d","D2 d'","D2 d2"]],["R2","L2"],["F2","B2"]])
			+ " / "
			+ scramblers['333']();
		break;
	case "15p": // 15 puzzle
		do15puzzle(false);
		break;
	case "15pm": // 15 puzzle, mirrored
		do15puzzle(true);
		break;
	case "clkwca": // Clock (WCA Notation)
		var clkapp = ["0+", "1+", "2+", "3+", "4+", "5+", "6+", "1-", "2-", "3-", "4-", "5-"];
		scramble = "UR? DR? DL? UL? U? R? D? L? ALL? y2 U? R? D? L? ALL?????";
		for (var i=0; i<14; i++) {
			scramble = scramble.replace('?', rndEl(clkapp));
		}
		scramble = scramble.replace('?', rndEl(["", " UR"])).replace('?', rndEl(["", " DR"])).replace('?', rndEl(["", " DL"])).replace('?', rndEl(["", " UL"]));
		break;
	case "clk": // Clock (Jaap order)
		scramble = "UU" + c("u") + "dU" + c("u") + "dd" + c("u") + "Ud" + c("u") + "dU" + c("u") + "Ud" + c("u") + "UU" + c("u") + "UU"
			+ c("u") + "UU" + c("u") + "dd" + c3() + c2() + "\ndd" + c("d") + "dU" + c("d") + "UU" + c("d") + "Ud" + c("d")
			+ "UU" + c3() + "UU" + c3() + "Ud" + c3() + "dU" + c3() + "UU" + c3() + "dd" + c("d") + c2();
		break;
	case "clkc": // Clock (concise)
		scramble = "";
		for (var i = 0; i < 4; i++) scramble += "(" + (rn(12) - 5) + ", " + (rn(12) - 5) + ") / ";
		for (var i = 0; i < 6; i++) scramble += "(" + (rn(12) - 5) + ") / ";
		for (var i = 0; i < 4; i++) scramble += rndEl(["d","U"]);

		break;
	case "clke": // Clock (efficient order)
		scramble = "UU" + c("u") + "dU" + c("u") + "dU" + c("u") + "UU" + c("u") + "UU" + c("u") + "UU" + c("u") + "Ud" + c("u") + "Ud"
			+ c("u") + "dd" + c("u") + "dd" + c3() + c2() + "\nUU" + c3() + "UU" + c3() + "dU" + c("d") + "dU" + c3() + "dd"
			+ c("d") + "Ud" + c3() + "Ud" + c("d") + "UU" + c3() + "UU" + c("d") + "dd" + c("d") + c2();
		break;
	case "giga": // Gigaminx
		gigascramble();
		break;
	case "mgmo": // Megaminx (old style)
		oldminxscramble();
		break;
	case "mgmp": // Megaminx (Pochmann)
		pochscramble(10, Math.ceil(len / 10));
		break;
	case "mgmc": // Megaminx (Carrot)
		carrotscramble(10, Math.ceil(len / 10));
		break;
	case "pyrm": // Pyraminx (random moves)
		scramble = mega([["U"],["L"],["R"],["B"]],["!","'"]);
		var cnt = 0;
		var rnd = [];
		for (var i = 0; i < 4; i++) {
			rnd[i] = rn(3);
			if (rnd[i] > 0) cnt++;
		}
		scramble = scramble.substr(0, scramble.length - 3 * cnt);
		scramble = ["","b ","b' "][rnd[0]] + ["","l ","l' "][rnd[1]] + ["","u ","u' "][rnd[2]] + ["","r ","r' "][rnd[3]] + scramble;
		scramble = scramble.replace(/!/g,"");
		break;
	case "prcp": // Pyraminx Crystal (Pochmann)
		pochscramble(10, Math.ceil(len / 10));
		break;
	case "r234": // 2x2x2 3x3x3 4x4x4 relay
		scramble = " 2) "
			+ scramblers['222so']('222so')
			+ "\n 3) "
			+ scramblers['333']()
			+ "\n 4) "
			+ mega([["U","D","u"],["R","L","r"],["F","B","f"]],cubesuff,40);
		break;
	case "r2345": // 2x2x2 3x3x3 4x4x4 5x5x5 relay
		scramble = " 2) "
			+ scramblers['222so']('222so')
			+ "\n 3) "
			+ scramblers['333']()
			+ "\n 4) "
			+ mega([["U","D","u"],["R","L","r"],["F","B","f"]],cubesuff,40)
			+ "\n 5) "
			+ mega([["U","D","u","d"],["R","L","r","l"],["F","B","f","b"]],cubesuff,60);
		break;
	case "r23456": // 2x2x2 3x3x3 4x4x4 5x5x5 relay
		scramble = " 2) "
			+ scramblers['222so']('222so')
			+ "\n 3) "
			+ scramblers['333']()
			+ "\n 4) "
			+ mega([["U","D","u"],["R","L","r"],["F","B","f"]],cubesuff,40)
			+ "\n 5) "
			+ mega([["U","D","u","d"],["R","L","r","l"],["F","B","f","b"]],cubesuff,60)
			+ "\n 6) "
			+ mega([["U","D","2U","2D","3U"],["R","L","2R","2L","3R"],["F","B","2F","2B","3F"]],cubesuff,80);
		break;
	case "r234567": // 2x2x2 3x3x3 4x4x4 5x5x5 relay
		scramble = " 2) "
			+ scramblers['222so']('222so')
			+ "\n 3) "
			+ scramblers['333']()
			+ "\n 4) "
			+ mega([["U","D","u"],["R","L","r"],["F","B","f"]],cubesuff,40)
			+ "\n 5) "
			+ mega([["U","D","u","d"],["R","L","r","l"],["F","B","f","b"]],cubesuff,60)
			+ "\n 6) "
			+ mega([["U","D","2U","2D","3U"],["R","L","2R","2L","3R"],["F","B","2F","2B","3F"]],cubesuff,80)
			+ "\n 7) "
			+ mega([["U","D","2U","2D","3U","3D"],["R","L","2R","2L","3R","3L"],["F","B","2F","2B","3F","3B"]],cubesuff,100);
		break;
	case "r3": // multiple 3x3x3 relay
		var ncubes = len;
		for (var i = 0; i < ncubes; i++) {
			scramble += (i==0 ? "" : "\n") + (i + 1) + ") ";
			scramble += scramblers['333']();
		}
		break;
	case "sia113": // Siamese Cube (1x1x3 block)
		scramble += mega([["U","u"],["R","r"]],cubesuff)
			+ " z2 "
			+ mega([["U","u"],["R","r"]],cubesuff);
		break;
	case "sia123": // Siamese Cube (1x2x3 block)
		scramble += mega([["U"],["R","r"]],cubesuff)
			+ " z2 "
			+ mega([["U"],["R","r"]],cubesuff);
		break;
	case "sia222": // Siamese Cube (2x2x2 block)
		scramble += mega([["U"],["R"],["F"]],cubesuff)
			+ " z2 y "
			+ mega([["U"],["R"],["F"]],cubesuff);
		break;
	case "sq1h": // Square-1 (turn metric)
		sq1_scramble(1);
		break;
	case "sq1t": // Square-1 (twist metric)
		sq1_scramble(0);
		break;
	case "sq2": // Square-2
		var i = 0;
		while (i < len) {
			var rndu = rn(12) - 5;
			var rndd = rn(12) - 5;
			if (rndu != 0 || rndd != 0) {
				i++;
				scramble += "(" + rndu + "," + rndd + ") / ";
			}
		}
		break;
	case "ssq1t": // Super Square-1 (twist metric)
		ssq1t_scramble();
		break;
	case "bsq": // Bandaged Square-1 </,(1,0)>
		sq1_scramble(2);
		break;
	case "4edge": // 4x4x4 edges
		edgescramble("r b2",["b2 r'","b2 U2 r U2 r U2 r U2 r"],["u"]);
		break;
	case "5edge": // 5x5x5 edges
		edgescramble("r R b B",["B' b' R' r'","B' b' R' U2 r U2 r U2 r U2 r"],["u","d"]);
		break;
	case "6edge": // 6x6x6 edges
		edgescramble("3r r 3b b",["3b' b' 3r' r'","3b' b' 3r' U2 r U2 r U2 r U2 r","3b' b' r' U2 3r U2 3r U2 3r U2 3r","3b' b' r2 U2 3r U2 3r U2 3r U2 3r U2 r"],["u","3u","d"]);
		break;
	case "7edge": // 7x7x7 edges
		edgescramble("3r r 3b b",["3b' b' 3r' r'","3b' b' 3r' U2 r U2 r U2 r U2 r","3b' b' r' U2 3r U2 3r U2 3r U2 3r","3b' b' r2 U2 3r U2 3r U2 3r U2 3r U2 r"],["u","3u","3d","d"]);
		break;
	case "-1": // -1x-1x-1 (micro style)
		for (var i = 0; i < len; i++) {
			scramble += String.fromCharCode(32 + rn(224));
		}
		scramble += "Error: subscript out of range";
		break;
	case "333noob": // 3x3x3 for noobs
		scramble = mega(SCRAMBLE_NOOBST, SCRAMBLE_NOOBSS.split('|')).replace(/t/,"T");
		scramble = scramble.substr(0, scramble.length - 2) + ".";
		break;
	case "lol": // LOL
		scramble = mega([["L"],["O"]]);
		scramble = scramble.replace(/ /g,"");
		break;
	case "input":
		if (inputScramble.length == 0) {
			inputText.val("");
			kernel.showDialog([inputText, inputOK, inputCancel], 'input', SCRAMBLE_INPUT);
			return;
		} else {
			scramble = inputScramble.shift();
		}
		break;
	}
}

function scrambleOK(scrStr) {
	scramble = (scrStr || scramble).replace(/(\s*)$/,"");
	sdiv.html(scramble);
	kernel.pushSignal('scramble', [type, scramble]);
}

function inputOK() {
	if (!parseInput(inputText.val())) {
		kernel.setProp('scrType', typeExIn);
	} else {
		doScrambleIt();
	}
}

function inputCancel() {
	kernel.setProp('scrType', typeExIn);
}

// Clock functions.
function c(s){
	var array=[s+"=0",s+"+1",s+"+2",s+"+3",s+"+4",s+"+5",s+"+6",s+"-5",s+"-4",s+"-3",s+"-2",s+"-1"];
	return " "+rndEl(array)+" ";
}
function c2(){return rndEl(["U","d"])+rndEl(["U","d"]);}
function c3(){return "     "}

function edgescramble(start, end, moves) {
	var u=0,d=0,movemis=[];
	var triggers=[["R","R'"],["R'","R"],["L","L'"],["L'","L"],["F'","F"],["F","F'"],["B","B'"],["B'","B"]];
	var ud=["U","D"];
	scramble = start;
	// initialize move misalignments
	for (var i=0; i<moves.length; i++) {
		movemis[i] = 0;
	}

	for (var i=0; i<len; i++) {
		// apply random moves
		var done = false;
		while (!done) {
			var v = "";
			for (var j=0; j<moves.length; j++) {
				var x = rn(4);
				movemis[j] += x;
				if (x!=0) {
					done = true;
					v += " " + moves[j] + cubesuff[x-1];
				}
			}
		}
		// apply random trigger, update U/D
		var trigger = rn(8);
		var layer = rn(2);
		var turn = rn(3);
		scramble += v + " " + triggers[trigger][0] + " " + ud[layer] + cubesuff[turn] + " " + triggers[trigger][1];
		if (layer==0) {u += turn+1;}
		if (layer==1) {d += turn+1;}
	}

	// fix everything
	for (var i=0; i<moves.length; i++) {
		var x = 4-(movemis[i]%4);
		if (x<4) {
			scramble += " " + moves[i] + cubesuff[x-1];
		}
	}
	u = 4-(u%4); d = 4-(d%4);
	if (u<4) {
		scramble += " U" + cubesuff[u-1];
	}
	if (d<4) {
		scramble += " D" + cubesuff[d-1];
	}
	scramble += " " + rndEl(end);
}

function do15puzzle(mirrored){
	var moves = (mirrored?["U","L","R","D"]:["D","R","L","U"]);
	var effect = [[0,-1],[1,0],[-1,0],[0,1]];
	var x=0,y=3,k,done,r,lastr=5;
	scramble="";
	for(k=0;k<len;k++){
		done=false;
		while(!done){
			r=rn(4);
			if (x+effect[r][0]>=0 && x+effect[r][0]<=3 && y+effect[r][1]>=0 && y+effect[r][1]<=3 && r+lastr != 3) {
				done=true;
				x+=effect[r][0];
				y+=effect[r][1];
				scramble+=moves[r]+" ";
				lastr=r;
			}
		}
	}
}

function pochscramble(x,y){
	var i,j;
	for(i=0;i<y;i++){
		scramble+="  ";
		for(j=0;j<x;j++){
			scramble+=(j%2==0?"R":"D")+rndEl(["++","--"])+" ";
		}
        scramble+="U"+(scramble.endsWith("-- ")?"'\n":" \n");
	}
}

function carrotscramble(x,y){
	var i,j;
	for(i=0;i<y;i++){
		scramble+=" ";
		for(j=0;j<x/2;j++){
			scramble+=rndEl(["+","-"])+rndEl(["+","-"])+" ";
		}
		scramble+="U"+rndEl(["'\n"," \n"]);
	}
}

function gigascramble(){
	var i,j;
	for(i=0;i<Math.ceil(len/10);i++){
		scramble+="  ";
		for(j=0;j<10;j++){
			scramble+=(j%2==0?("Rr".charAt(rn(2))):("Dd".charAt(rn(2))))+rndEl(["+ ","++","- ","--"])+" ";
		}
		scramble+="y"+rndEl(minxsuff)+"\n";
	}
}

function sq1_scramble(type){
	seq=[];
	var i,k;
	sq1_getseq(1, type);
	var s="";
	for(i=0; i<seq[0].length; i++){
		k=seq[0][i];
		if(k[0] == 7) {
			s +="/";
		} else {
			s += " (" + k[0] + "," + k[1] + ") ";
		}
	}
	scramble+=s;
}

function ssq1t_scramble(){
	seq=[];
	var i;
	sq1_getseq(2, 0);
	var s=seq[0],t=seq[1],u="";
	if (s[0][0]==7) s=[[0,0]].concat(s);
	if (t[0][0]==7) t=[[0,0]].concat(t);
	for(i=0;i<len;i++){
		u+="(" + s[2*i][0] + "," + t[2*i][0] + "," + t[2*i][1] + "," + s[2*i][1] + ") / ";
	}
	scramble+=u;
}

function sq1_getseq(num, type){
	for(var n=0; n<num; n++){
		p = [1,0,0,1,0,0,1,0,0,1,0,0,0,1,0,0,1,0,0,1,0,0,1,0];
		seq[n] = [];
		var cnt = 0;
		while (cnt < len) {
			var x = rn(12) - 5;
			var y = (type==2) ? 0 : rn(12) - 5;
			var size = (x==0?0:1) + (y==0?0:1);
			if ((cnt + size <= len || type != 1) && (size > 0 || cnt == 0)) {
				if (sq1_domove(x, y)) {
					if (type == 1) cnt += size;
					if (size > 0) seq[n][seq[n].length] = [x,y];
					if (cnt < len || type != 1) {
						cnt++;
						seq[n][seq[n].length] = [7,0];
						sq1_domove(7,0);
					}
				}
			}
		}
	}
}

function sq1_domove(x, y){
	var i, px, py;
	if (x == 7) {
		for (i=0; i<6; i++) {
			mathlib.circle(p, i+6, i+12);
		}
		return true;
	} else {
		if (p[(17-x)%12] || p[(11-x)%12] || p[12+(17-y)%12] || p[12+(11-y)%12]) {
			return false;
		} else {
			// do the move itself
			px = p.slice(0, 12);
			py = p.slice(12, 24);
			for (i=0; i<12; i++) {
				p[i] = px[(12+i-x)%12];
				p[i+12] = py[(12+i-y)%12];
			}
			return true;
		}
	}
}

function oldminxscramble(){
	var faces = ["F","B","U","D","L","DBR","DL","BR","DR","BL","R","DBL"];
	// adjacency table
	var adj = [0x554, 0xaa8, 0x691, 0x962, 0xa45, 0x58a, 0x919, 0x626, 0x469, 0x896, 0x1a5, 0x25a];
	var used = 0;
	var face;
	for(var j=0;j<len;j++){
		do {
			face = rn(12);
		} while (((used >> face) & 1) != 0);
		scramble += faces[face] + rndEl(minxsuff) + " ";
		used &= ~adj[face];
		used |= 1 << face;
	}
}

	/**
	 *	{type: callback(type, length)}
	 *	callback return: scramble string or undefined means delay
	 */
	var scramblers = {};

	function regScrambler(type, callback) {
		// console.log(type);
		if ($.isArray(type)) {
			for (var i=0; i<type.length; i++) {
				scramblers[type[i]] = callback;
			}
		} else {
			scramblers[type] = callback;
		}
		return regScrambler;
	}

	function loadSelect2(idx) {
		if (!$.isNumeric(idx)) {
			idx = 0;
			var selectedStr = scrdata[select[0].selectedIndex][0];
			if (selectedStr && selectedStr.match(/^===/)) {
				select[0].selectedIndex++;
			}
		} else {
			kernel.blur();
		}
		var box2 = scrdata[select[0].selectedIndex][1];
		select2.empty();
		for (var i=0; i<box2.length; i++) {
			select2.append('<option value="' + box2[i][1] + '">' + box2[i][0] + '</option');
		}
		select2[0].selectedIndex = idx;
		scrLen.val(Math.abs(box2[idx][2]));
		scrLen[0].disabled = box2[idx][2] <= 0;
		genScramble();
	}

	function getLastScramble() {
		return [lasttype, lastscramble];
	}

	function getCurScramble() {
		return [type, scramble];
	}

	function parseInput(str) {
		if (str.match(/^\s*$/)) {
			return false;
		}
		inputScramble = [];
		var inputs = str.split('\n');
		for (var i=0; i<inputs.length; i++) {
			var s = inputs[i];
			if (s.match(/^\s*$/) == null) {
				inputScramble.push(s.replace(/^\d+[\.\),]\s*/, ''));
			}
		}
		return inputScramble.length != 0;
	}

	var isEn = false;

	function procSignal(signal, value) {
		if (signal == 'time') {
			if (isEn) {
				genScramble();
			} else {
				sdiv.empty();
				kernel.pushSignal('scramble', ['-', '']);
			}
		} else if (signal == 'property') {
			if (value[0] == 'scrSize') {
				sdiv.css('font-size', value[1]/7 + 'em');
			} else if (value[0] == 'scrMono') {
				div.css('font-family', value[1] ? 'SimHei, Monospace' : 'Arial');
			} else if (value[0] == 'scrType') {
				if (value[1] != select2.val()) {
					loadType(value[1]);
				}
			} else if (value[0] == 'scrLim') {
				if (value[1]) {
					sdiv.addClass('limit');
				} else {
					sdiv.removeClass('limit');
				}
			} else if (value[0] == 'scrAlign') {
				if (value[1] == 'c') {
					div.css('text-align', 'center');
				} else if (value[1] == 'l') {
					div.css('text-align', 'left');
				} else if (value[1] == 'r') {
					div.css('text-align', 'right');
				}
			}
		} else if (signal == 'button' && value[0] == 'scramble') {
			isEn = value[1];
			if (isEn && sdiv.html() == '') {
				genScramble();
			}
		} else if (signal == 'ctrl' && value[0] == 'scramble') {
			if (value[1] == 'last') {
				sdiv.html(lastscramble);
			} else if (value[1] == 'next') {
				if (sdiv.html() == lastscramble) {
					sdiv.html(scramble);
				} else {
					genScramble();
				}
			}
		}
	}

	function loadType(type) {
		for (var i=0; i<scrdata.length; i++) {
			for (var j=0; j<scrdata[i][1].length; j++) {
				if (scrdata[i][1][j][1] == type) {
					select[0].selectedIndex = i;
					loadSelect2(j);
					return;
				}
			}
		}
	}

	var scrambleGenerator = (function() {
		var tdiv = $('<div />').css('text-align', 'center').css('font-size', '0.7em');
		var button = $('<span />').addClass('click').html(SCRGEN_GEN);
		var scrNum = $('<input type="text" maxlength="3">').val(5);
		var output = $('<textarea rows="10" style="width: 100%" readonly />');
		var prefix = $('<select><option value="1. ">1. </option><option value="1) ">1) </option><option value="(1) ">(1) </option><option value=""></option></select>');
		tdiv.append(SCRGEN_NSCR, scrNum, "&nbsp;", SCRGEN_PRE).append(prefix, "<br>", button, "<br>", output);

		function generate() {
			var n_scramble = ~~scrNum.val();
			var scrambles = "";
			var scramble_copy = scramble;
			var pre = prefix.val();
			for (var i=0; i<n_scramble; i++) {
				calcScramble();
				scrambles += pre.replace('1', i+1) + scramble + "\n";
			}
			// console.log(scrambles);
			scramble = scramble_copy;
			output.text(scrambles);
			output.select();
		}

		return function(fdiv) {
			if (!fdiv) {
				return;
			}
			fdiv.empty().append(tdiv.width(div.width() / 2));
			prefix.unbind("change").change(kernel.blur);
			button.unbind("click").click(generate);
		}
	})();

	$(function(){
		kernel.regListener('scramble', 'time', procSignal);
		kernel.regListener('scramble', 'property', procSignal, /^scr(?:Size|Mono|Type|Lim|Align)$/);
		kernel.regListener('scramble', 'button', procSignal, /^scramble$/);
		kernel.regListener('scramble', 'ctrl', procSignal, /^scramble$/);
		kernel.regProp('scramble', 'scrSize', 2, PROPERTY_SCRSIZE, [15, 5, 50]);
		kernel.regProp('scramble', 'scrMono', 0, PROPERTY_SCRMONO, [true]);
		kernel.regProp('scramble', 'scrLim', 0, PROPERTY_SCRLIM, [true]);
		kernel.regProp('scramble', 'scrAlign', 1, PROPERTY_SCRALIGN, ['c', ['c', 'l', 'r'], PROPERTY_SCRALIGN_STR.split('|')]);
		kernel.regProp('scramble', 'preScr', 1, "pre-scramble", ['', ['', 'z2', "z'", 'z', "x'", 'x'], ['', 'z2', "z'", 'z', "x'", 'x']]);

		for (var i=0; i<scrdata.length; i++) {
			select.append('<option>' + scrdata[i][0] + '</option>');
		}
		kernel.getProp('scrType', '333');

		select.change(loadSelect2);
		select2.change(function() {
			kernel.blur();
			scrLen.val(Math.abs(scrdata[select[0].selectedIndex][1][select2[0].selectedIndex][2]));
			scrLen[0].disabled = scrdata[select[0].selectedIndex][1][select2[0].selectedIndex][2] <= 0;
			genScramble();
		});
		scrLen.change(genScramble);

		var last = $('<span />').addClass('click').html(SCRAMBLE_LAST).click(function() {
			sdiv.html(lastscramble);
			if (lastscramble != undefined) {
				kernel.pushSignal('scrambleX', [lasttype, lastscramble]);
			}
		});
		var next = $('<span />').addClass('click').html(SCRAMBLE_NEXT).click(function() {
			if (sdiv.html() == lastscramble) {
				sdiv.html(scramble);
				kernel.pushSignal('scrambleX', [type, scramble]);
			} else {
				genScramble();
			}
		});
		title.append($('<nobr>').append(select, ' ', select2), " <wbr>");
		title.append($('<nobr>').append(SCRAMBLE_LENGTH + ': ', scrLen), " <wbr>");
		title.append($('<nobr>').append(last, '/', next, SCRAMBLE_SCRAMBLE));
		div.append(title, sdiv).appendTo('body');
		kernel.addWindow('scramble', BUTTON_SCRAMBLE, div, true, true, 3);
		tools.regTool('scrgen', TOOLS_SCRGEN, scrambleGenerator);
	});

	return {
		reg: regScrambler
	}

})(mathlib.rn, mathlib.rndEl);

