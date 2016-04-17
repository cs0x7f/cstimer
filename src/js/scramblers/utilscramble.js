(function(rn) {
var cubesuff=["","2","'"];

function helicubescramble(type, len) {
	var faces = ["UF", "UR", "UB", "UL", "FR", "BR", "BL", "FL", "DF", "DR", "DB", "DL"];
	// adjacency table
	var adj = [0x09a, 0x035, 0x06a, 0x0c5, 0x303, 0x606, 0xc0c, 0x909, 0xa90, 0x530, 0xa60, 0x5c0];
	var used = 0;
	var face;
	scramble = [];
	for(var j=0;j<len;j++){
		do {
			face = rn(12);
		} while (((used >> face) & 1) != 0);
		scramble.push(faces[face]);
		used &= ~adj[face];
		used |= 1 << face;
	}
	return scramble.join(" ");
}
scramble.reg('heli', helicubescramble);

function yj4x4(type, len){
	// the idea is to keep the fixed center on U and do Rw or Lw, Fw or Bw, to not disturb it
	var turns = [["U","D"],["R","L","r"],["F","B","f"]];
	var donemoves=[];
	var lastaxis;
	var fpos = 0; // 0 = Ufr, 1 = Ufl, 2 = Ubl, 3 = Ubr
	var j,k;
	var s="";
	lastaxis=-1;
	for(j=0;j<len;j++){
		var done=0;
		do{
			var first=rn(turns.length);
			var second=rn(turns[first].length);
			if(first!=lastaxis||donemoves[second]==0){
				if(first==lastaxis){
					donemoves[second]=1;
					var rs = rn(cubesuff.length);
					if(first==0&&second==0){fpos = (fpos + 4 + rs)%4;}
					if(first==1&&second==2){ // r or l
						if(fpos==0||fpos==3) s+="l"+cubesuff[rs]+" ";
						else s+="r"+cubesuff[rs]+" ";
					} else if(first==2&&second==2){ // f or b
						if(fpos==0||fpos==1) s+="b"+cubesuff[rs]+" ";
						else s+="f"+cubesuff[rs]+" ";
					} else {
						s+=turns[first][second]+cubesuff[rs]+" ";
					}
				}else{
					for(k=0;k<turns[first].length;k++){donemoves[k]=0;}
					lastaxis=first;
					donemoves[second]=1;
					var rs = rn(cubesuff.length);
					if(first==0&&second==0){fpos = (fpos + 4 + rs)%4;}
					if(first==1&&second==2){ // r or l
						if(fpos==0||fpos==3) s+="l"+cubesuff[rs]+" ";
						else s+="r"+cubesuff[rs]+" ";
					} else if(first==2&&second==2){ // f or b
						if(fpos==0||fpos==1) s+="b"+cubesuff[rs]+" ";
						else s+="f"+cubesuff[rs]+" ";
					} else {
						s+=turns[first][second]+cubesuff[rs]+" ";
					}
				}
				done=1;
			}
		}while(done==0);
	}
	return s;
}

scramble.reg('444yj', yj4x4);

function bicube(type, len){
	function canMove(face) {
		var u=[], i, j, done, z=0;
		for (i=0; i<9; i++) {
			done = 0;
			for (j=0; j<u.length; j++) {
				if (u[j]==start[d[face][i]]) done = 1;
			}
			if (done==0) {
				u[u.length] = start[d[face][i]];
				if (start[d[face][i]] == 0) z = 1;
			}
		}
		return (u.length==5 && z==1);
	}

	function doMove(face, amount) {
		for (var i=0; i<amount; i++) {
			var t = start[d[face][0]];
			start[d[face][0]] = start[d[face][6]];
			start[d[face][6]] = start[d[face][4]];
			start[d[face][4]] = start[d[face][2]];
			start[d[face][2]] = t;
			t = start[d[face][7]];
			start[d[face][7]] = start[d[face][5]];
			start[d[face][5]] = start[d[face][3]];
			start[d[face][3]] = start[d[face][1]];
			start[d[face][1]] = t;
		}
	}

	var d = [[0,1,2,5,8,7,6,3,4],[6,7,8,13,20,19,18,11,12],[0,3,6,11,18,17,16,9,10],[8,5,2,15,22,21,20,13,14]];
	var start=[1,1,2,3,3,2,4,4,0,5,6,7,8,9,10,10,5,6,7,8,9,11,11], move="UFLR", s="", arr=[], poss, done, i, j, x, y;
	while (arr.length < len) {
		poss = [1,1,1,1];
		for (j=0; j<4; j++) {
			if (poss[j]==1 && !canMove(j))
				poss[j]=0;
		}
		done = 0;
		while (done==0) {
			x = rn(4);
			if (poss[x]==1) {
				y = rn(3)+1;
				doMove(x, y);
				done = 1;
			}
		}
		arr[arr.length] = [x,y];
		if (arr.length >= 2) {
			if (arr[arr.length-1][0] == arr[arr.length-2][0]) {
				arr[arr.length-2][1] = (arr[arr.length-2][1] + arr[arr.length-1][1])%4;
				arr = arr.slice(0,arr.length - 1);
			}
		}
		if (arr.length >= 1) {
			if (arr[arr.length-1][1] == 0) {
				arr = arr.slice(0,arr.length - 1);
			}
		}
	}
	for (i=0; i<len; i++) {
		s += move[arr[i][0]] + cubesuff[arr[i][1]-1] + " ";
	}
	return s;
}

scramble.reg('bic', bicube);



})(mathlib.rn);
