"use strict";

var bldhelper = execMain(function() {

	var pieces = 'URF UFL ULB UBR DFR DLF DBL DRB UR UF UL UB DR DF DL DB FR FL BL BR';
	var ChiChu = 'JKL ABC DEF GHI XYZ WMN OPQ RST GH AB CD EF OP IJ KL MN QR ST WX YZ';
	var Speffz = 'CMJ DIF AER BQN VKP UGL XSH WOT BM CI DE AQ VO UK XG WS JP LF RH TN';
	var schemeSelect;
	var bufCornSelect;
	var bufEdgeSelect;

	function getBLDcode(c, scheme, cbuf, ebuf) {
		var corns = [];
		for (var i = 0; i < 8; i++) {
			corns[i] = scheme.slice(i * 4, i * 4 + 3);
		}
		var edges = [];
		for (var i = 0; i < 12; i++) {
			edges[i] = scheme.slice(32 + i * 3, 32 + i * 3 + 2);
		}

		var ccode = [];
		var ecode = [];
		var cc = new mathlib.CubieCube();
		cc.init(c.ca, c.ea);

		var done = 1 << cbuf;
		for (var i = 0; i < 8; i++) {
			if (cc.ca[i] == i) {
				done |= 1 << i;
			}
		}
		while (done != 0xff) {
			var target = cc.ca[cbuf] & 0x7;
			if (target == cbuf) { // buffer in place, swap with any unsolved
				var i = -1;
				while (done >> ++i & 1) {}
				mathlib.circle(cc.ca, i, cbuf);
				ccode.push(i);
				continue;
			}
			ccode.push(cc.ca[cbuf]);
			cc.ca[cbuf] = (cc.ca[target] + (cc.ca[cbuf] & 0xf8)) % 24;
			cc.ca[target] = target;
			done |= 1 << target;
		}

		done = 1 << ebuf;
		for (var i = 0; i < 12; i++) {
			if (cc.ea[i] == i * 2) {
				done |= 1 << i;
			}
		}
		while (done != 0xfff) {
			var target = cc.ea[ebuf] >> 1;
			if (target == ebuf) { // buffer in place, swap with any unsolved
				var i = -1;
				while (done >> ++i & 1) {}
				mathlib.circle(cc.ea, i, ebuf);
				ecode.push(i * 2);
				continue;
			}
			ecode.push(cc.ea[ebuf]);
			cc.ea[ebuf] = cc.ea[target] ^ (cc.ea[ebuf] & 1);
			cc.ea[target] = target << 1;
			done |= 1 << target;
		}
		var ret = [[], []];
		for (var i = 0; i < ccode.length; i++) {
			var val = ccode[i];
			ret[0].push(corns[val & 0x7].charAt((3 - (val >> 3)) % 3));
			if (i % 2 == 1) {
				ret[0].push(' ');
			}
		}
		for (var i = 0; i < ecode.length; i++) {
			var val = ecode[i];
			ret[1].push(edges[val >> 1].charAt(val & 1));
			if (i % 2 == 1) {
				ret[1].push(' ');
			}
		}
		return ret;
	}

	function procClick(e) {
		var target = $(e.target);
		kernel.blur();
		var val = target.val();
		var data = target.attr('data');
		if (data == 'scheme') {
			target.val('Scheme');
			if (val == 'speffz') {
				scheme = Speffz;
			} else if (val == 'chichu') {
				scheme = ChiChu;
			} else if (val == 'custom') {
				var ret = prompt('Code for ' + pieces, scheme);
				if (!ret) {
					return;
				}
				if (!/^([0-9A-Z]{3} ){8}([0-9A-Z]{2} ){11}[0-9A-Z]{2}$/i.exec(ret)) {
					alert('Invalid Scheme!');
					return;
				}
				scheme = ret.toUpperCase();
			}
		} else if (data == 'bufcorn') {
			bufs[0] = ~~val;
		} else if (data == 'bufedge') {
			bufs[1] = ~~val;
		}
		calcResult();
	}

	var scheme = Speffz;
	var codeDiv = $('<div>');
	var bufs = [0, 1];

	function calcResult() {
		var scramble = tools.getCurScramble();
		var state = cubeutil.getScrambledState(scramble);
		var codes = getBLDcode(state, scheme, bufs[0], bufs[1]);
		codeDiv.html('C: ' + codes[0].join('') + '<br>' + 'E: ' + codes[1].join(''));
	}

	function execFunc(fdiv) {
		if (!fdiv) {
			return;
		}
		if (!tools.isPuzzle('333')) {
			fdiv.html(IMAGE_UNAVAILABLE);
			return;
		}
		fdiv.empty().append(schemeSelect, '|', bufCornSelect, '|', bufEdgeSelect, codeDiv);
		schemeSelect.unbind('change').change(procClick);
		bufCornSelect.unbind('change').change(procClick);
		bufEdgeSelect.unbind('change').change(procClick);
		calcResult();
	}

	$(function() {
		schemeSelect = $('<select data="scheme">');
		var schemes = [['', 'Scheme'], ['speffz', 'Speffz'], ['chichu', 'ChiChu'], ['custom', 'Custom']];
		for (var i = 0; i < schemes.length; i++) {
			schemeSelect.append('<option value="' + schemes[i][0] + '">' + schemes[i][1] + '</option>');
		}
		bufCornSelect = $('<select data="bufcorn">');
		for (var i = 0; i < 8; i++) {
			var cur = pieces.slice(i * 4, i * 4 + 3);
			bufCornSelect.append('<option value="' + i + '">' + cur + '</option>');
		}
		bufEdgeSelect = $('<select data="bufedge">');
		for (var i = 0; i < 12; i++) {
			var cur = pieces.slice(32 + i * 3, 32 + i * 3 + 2);
			bufEdgeSelect.append('<option value="' + i + '">' + cur + '</option>');
		}
		tools.regTool('bldhelper', 'BLD Helper', execFunc);
	});
});
