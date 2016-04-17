(function() {
	var cubesuff=["","2","'"];
	var minxsuff=["","2","'","2'"];
	var args = {
		"111": [[["x"],["y"],["z"]],cubesuff], // 1x1x1
		"2223": [[["U"],["R"],["F"]],cubesuff], // 2x2x2 (3-gen)
		"2226": [[[["U","D"]],[["R","L"]],[["F","B"]]],cubesuff], // 2x2x2 (6-gen)
		"333o": [[["U","D"],["R","L"],["F","B"]],cubesuff], // 3x3x3 (old style)
		"334": [[[["U","U'","U2"],["u","u'","u2"]],[["R2","L2","M2"]],[["F2","B2","S2"]]]], // 3x3x4
		"336": [[[["U","U'","U2"],["u","u'","u2"],["3u","3u2","3u'"]],[["R2","L2","M2"]],[["F2","B2","S2"]]]], // 3x3x6
		"888": [[["U","D","u","d","3u","3d","4u"],["R","L","r","l","3r","3l","4r"],["F","B","f","b","3f","3b","4f"]],cubesuff], // 8x8x8 (SiGN)
		"999": [[["U","D","u","d","3u","3d","4u","4d"],["R","L","r","l","3r","3l","4r","4l"],["F","B","f","b","3f","3b","4f","4b"]],cubesuff], // 9x9x9 (SiGN)
		"101010": [[["U","D","u","d","3u","3d","4u","4d","5u"],["R","L","r","l","3r","3l","4r","4l","5r"],["F","B","f","b","3f","3b","4f","4b","5f"]],cubesuff], // 10x10x10 (SiGN)
		"111111": [[["U","D","u","d","3u","3d","4u","4d","5u","5d"],["R","L","r","l","3r","3l","4r","4l","5r","5l"],["F","B","f","b","3f","3b","4f","4b","5f","5b"]],cubesuff], // 11x11x11 (SiGN)
		"444": [[["U","D","u"],["R","L","r"],["F","B","f"]],cubesuff], // 4x4x4 (SiGN)
		"444wca": [[["U","D","Uw"],["R","L","Rw"],["F","B","Fw"]],cubesuff], // 4x4x4 (WCA)
		"555": [[["U","D","u","d"],["R","L","r","l"],["F","B","f","b"]],cubesuff], // 5x5x5 (SiGN)
		"555wca": [[["U","D","Uw","Dw"],["R","L","Rw","Lw"],["F","B","Fw","Bw"]],cubesuff], // 5x5x5 (WCA)
		"666p": [[["U","D","2U","2D","3U"],["R","L","2R","2L","3R"],["F","B","2F","2B","3F"]],cubesuff], // 6x6x6 (prefix)
		"666wca": [[["U","D","Uw","Dw","3Uw"],["R","L","Rw","Lw","3Rw"],["F","B","Fw","Bw","3Fw"]],cubesuff], // 6x6x6 (WCA)
		"666s": [[["U","D","U&sup2;","D&sup2;","U&sup3;"],["R","L","R&sup2;","L&sup2;","R&sup3;"],["F","B","F&sup2;","B&sup2;","F&sup3;"]],cubesuff], // 6x6x6 (suffix)
		"666si": [[["U","D","u","d","3u"],["R","L","r","l","3r"],["F","B","f","b","3f"]],cubesuff], // 6x6x6 (SiGN)
		"777p": [[["U","D","2U","2D","3U","3D"],["R","L","2R","2L","3R","3L"],["F","B","2F","2B","3F","3B"]],cubesuff], // 7x7x7 (prefix)
		"777wca": [[["U","D","Uw","Dw","3Uw","3Dw"],["R","L","Rw","Lw","3Rw","3Lw"],["F","B","Fw","Bw","3Fw","3Bw"]],cubesuff], // 7x7x7 (prefix)
		"777s": [[["U","D","U&sup2;","D&sup2;","U&sup3;","D&sup3;"],["R","L","R&sup2;","L&sup2;","R&sup3;","L&sup3;"],["F","B","F&sup2;","B&sup2;","F&sup3;","B&sup3;"]],cubesuff], // 7x7x7 (suffix)
		"777si": [[["U","D","u","d","3u","3d"],["R","L","r","l","3r","3l"],["F","B","f","b","3f","3b"]],cubesuff], // 7x7x7 (SiGN)
		"cm3": [[[["U<","U>","U2"],["E<","E>","E2"],["D<","D>","D2"]],[["R^","Rv","R2"],["M^","Mv","M2"],["L^","Lv","L2"]]]], // Cmetrick
		"cm2": [[[["U<","U>","U2"],["D<","D>","D2"]],[["R^","Rv","R2"],["L^","Lv","L2"]]]], // Cmetrick Mini
		"233": [[[["U","U'","U2"]],["R2","L2"],["F2","B2"]]], // Domino/2x3x3
		"fto": [[["U","D"],["F","B"],["L","BR"],["R","BL"]],["","'"]], // FTO/Face-Turning Octa
		"gear": [[["U"],["R"],["F"]],["","2","3","4","5","6","'","2'","3'","4'","5'"]],
		"sfl": [[["R","L"],["U","D"]],cubesuff], // Super Floppy Cube
		"ufo": [[["A"],["B"],["C"],[["U","U'","U2'","U2","U3"]]]], // UFO
		"2gen": [[["U"],["R"]],cubesuff], // 2-generator <R,U>
		"2genl": [[["U"],["L"]],cubesuff], // 2-generator <L,U>
		"roux": [[["U"],["M"]],cubesuff], // Roux-generator <M,U>
		"3gen_F": [[["U"],["R"],["F"]],cubesuff], // 3-generator <F,R,U>
		"3gen_L": [[["U"],["R","L"]],cubesuff], // 3-generator <R,U,L>
		"RrU": [[["U"],["R","r"]],cubesuff], // 3-generator <R,r,U>
		"RrUu": [[["U","u"],["R","r"]],cubesuff], // <R,r,U,u>
		"minx2g": [[["U"],["R"]],minxsuff], // megaminx 2-gen
		"mlsll": [[[["R U R'","R U2 R'","R U' R'","R U2' R'"]],[["F' U F","F' U2 F","F' U' F","F' U2' F"]],[["U","U2","U'","U2'"]]]], // megaminx LSLL
		"half": [[["U","D"],["R","L"],["F","B"]],["2"]], // 3x3x3 half turns
		"lsll": [[[["R U R'","R U2 R'","R U' R'"]],[["F' U F","F' U2 F","F' U' F"]],[["U","U2","U'"]]]], // 3x3x3 last slot + last layer (old)
		"prco": [[["F","B"],["U","D"],["L","DBR"],["R","DBL"],["BL","DR"],["BR","DL"]],minxsuff], // Pyraminx Crystal (old style)
		"skb": [[["R"],["L"],["B"],["U"]],["","'"]], // Skewb
		"112": [[["R"],["R"]],cubesuff], // 1x1x2
		"eide": [[["OMG"],["WOW"],["WTF"],[["WOO-HOO","WOO-HOO","MATYAS","YES","YES","YAY","YEEEEEEEEEEEES"]],["HAHA"],["XD"],[":D"],["LOL"]],["","","","!!!"]] // Derrick Eide	
	}
	
	function mega(turns, suffixes, length) {
		if (suffixes == undefined) {
			suffixes = [""];
		}
		if (length == undefined) {
			length = 0;
		}
		var donemoves = 0;
		var lastaxis = -1;
		var s = [];
		var first, second;
		for (var i=0; i<length; i++) {
			do {
				first=mathlib.rn(turns.length);
				second=mathlib.rn(turns[first].length);
				if (first!=lastaxis) {
					donemoves = 0;
					lastaxis=first;
				}
			} while (((donemoves >> second) & 1) != 0);
			donemoves |= 1 << second;
			if (turns[first][second].constructor == Array) {
				s.push(mathlib.rndEl(turns[first][second])+mathlib.rndEl(suffixes));
			} else {
				s.push(turns[first][second]+mathlib.rndEl(suffixes));
			}
		}
		return s.join(' ');
	}
	
	function megascramble(type, length) {
		var value = args[type];
		switch (value.length) {
			case 1: return mega(value[0], [""], length);
			case 2: return mega(value[0], value[1], length);
			case 3: return mega(value[0], value[1], value[2]);
		}
	}
	
	for (var i in args) {
		scramble.reg(i, megascramble);
	}
})();
