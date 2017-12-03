"use strict";

(function() {
	var constants = ['OK_LANG', 'CANCEL_LANG', 'RESET_LANG', 'ABOUT_LANG', 'ZOOM_LANG', 'BUTTON_TIME_LIST', 'BUTTON_OPTIONS', 'BUTTON_EXPORT', 'BUTTON_DONATE', 'PROPERTY_USEINS', 'PROPERTY_VOICEINS', 'PROPERTY_VOICEINS_STR', 'PROPERTY_USECFM', 'PROPERTY_PHASES', 'PROPERTY_TIMERSIZE', 'CFMDIV_CURTIME', 'PROPERTY_USEMILLI', 'PROPERTY_SMALLADP', 'PROPERTY_SCRSIZE', 'PROPERTY_SCRMONO', 'PROPERTY_SCRLIM', 'PROPERTY_SCRALIGN', 'PROPERTY_SCRALIGN_STR', 'EXPORT_DATAEXPORT', 'EXPORT_TOFILE', 'EXPORT_FROMFILE', 'EXPORT_TOSERV', 'EXPORT_FROMSERV', 'EXPORT_USERID', 'EXPORT_INVID', 'EXPORT_ERROR', 'EXPORT_NODATA', 'EXPORT_UPLOADED', 'BUTTON_SCRAMBLE', 'BUTTON_TOOLS', 'IMAGE_UNAVAILABLE', 'TOOLS_SELECTFUNC', 'TOOLS_CROSS', 'TOOLS_EOLINE', 'TOOLS_IMAGE', 'TOOLS_STATS', 'TOOLS_DISTRIBUTION', 'TOOLS_TREND', 'PROPERTY_IMGSIZE', 'TIMER_INSPECT', 'TIMER_SOLVE', 'PROPERTY_USEMOUSE', 'PROPERTY_TIMEU', 'PROPERTY_TIMEU_STR', 'PROPERTY_PRETIME', 'PROPERTY_ENTERING', 'PROPERTY_ENTERING_STR', 'PROPERTY_COLOR', 'PROPERTY_COLORS', 'PROPERTY_VIEW', 'PROPERTY_VIEW_STR', 'COLOR_EXPORT', 'COLOR_IMPORT', 'COLOR_FAIL', 'PROPERTY_FONTCOLOR_STR', 'PROPERTY_COLOR_STR', 'PROPERTY_FONT', 'PROPERTY_FONT_STR', 'PROPERTY_FORMAT', 'PROPERTY_USEKSC', 'PROPERTY_NTOOLS', 'PROPERTY_AHIDE', 'SCRAMBLE_LAST', 'SCRAMBLE_NEXT', 'SCRAMBLE_SCRAMBLE', 'SCRAMBLE_LENGTH', 'SCRAMBLE_INPUT', 'scrdata', 'SCRAMBLE_NOOBST', 'SCRAMBLE_NOOBSS', 'STATS_CFM_RESET', 'STATS_CFM_DELSS', 'STATS_CFM_DELMUL', 'STATS_CFM_DELETE', 'STATS_COMMENT', 'STATS_CURROUND', 'STATS_CURSESSION', 'STATS_AVG', 'STATS_SOLVE', 'STATS_TIME', 'STATS_SESSION', 'STATS_SESSION_NAME', 'STATS_STRING', 'STATS_PREC', 'STATS_PREC_STR', 'STATS_TYPELEN', 'PROPERTY_PRINTSCR', 'PROPERTY_SUMMARY', 'PROPERTY_IMRENAME', 'PROPERTY_SCR2SS', 'PROPERTY_SS2SCR', 'PROPERTY_STATAL', 'PROPERTY_DELMUL', 'MODULE_NAMES', 'BGIMAGE_URL', 'BGIMAGE_INVALID', 'BGIMAGE_OPACITY', 'BGIMAGE_IMAGE', 'BGIMAGE_IMAGE_STR', 'SHOW_AVG_LABEL', 'TOOLS_SCRGEN', 'SCRGEN_NSCR', 'SCRGEN_PRE', 'SCRGEN_GEN'];
	for (var i=0; i<constants.length; i++) {
		window[constants[i]] = window[constants[i]] || '';
	}
})();

var mathlib = (function() {

	var Cnk = [], fact = [1];
	for (var i=0; i<32; ++i) {
		Cnk[i] = [];
		for (var j=0; j<32; ++j) {
			Cnk[i][j] = 0;
		}
	}
	for (var i=0; i<32; ++i) {
		Cnk[i][0] = Cnk[i][i] = 1;
		fact[i + 1] = fact[i] * (i + 1);
		for (var j=1; j<i; ++j) {
			Cnk[i][j] = Cnk[i-1][j-1] + Cnk[i-1][j];
		}
	}

	function circleOri(arr, a, b, c, d, ori) {
		var temp = arr[a];
		arr[a] = arr[d] ^ ori;
		arr[d] = arr[c] ^ ori;
		arr[c] = arr[b] ^ ori;
		arr[b] = temp ^ ori;
	}

	function circle(arr) {
		var length = arguments.length - 1, temp = arr[arguments[length]];
		for (var i=length; i>1; i--) {
			arr[arguments[i]] = arr[arguments[i-1]];
		}
		arr[arguments[1]] = temp;
		return circle;
	}

	function getPruning(table, index) {
		return table[index >> 3] >> ((index & 7) << 2) & 15;
	}

	function setNPerm(arr, idx, n) {
		var i, j;
		arr[n - 1] = 0;
		for (i = n - 2; i >= 0; --i) {
			arr[i] = idx % (n - i);
			idx = ~~(idx / (n - i));
			for (j = i + 1; j < n; ++j) {
				arr[j] >= arr[i] && ++arr[j];
			}
		}
	}

	function getNPerm(arr, n) {
		var i, idx, j;
		idx = 0;
		for (i = 0; i < n; ++i) {
			idx *= n - i;
			for (j = i + 1; j < n; ++j) {
				arr[j] < arr[i] && ++idx;
			}
		}
		return idx;
	}

	function getNParity(idx, n) {
		var i, p;
		p = 0;
		for (i = n - 2; i >= 0; --i) {
			p ^= idx % (n - i);
			idx = ~~(idx / (n - i));
		}
		return p & 1;
	}

	function get8Perm(arr, n) {
		if (n === undefined) {
			n = 8;
		}
		var i, idx, v, val;
		idx = 0;
		val = 1985229328;
		for (i = 0; i < n - 1; ++i) {
			v = arr[i] << 2;
			idx = (n - i) * idx + (val >> v & 7);
			val -= 286331152 << v;
		}
		return idx;
	}

	function set8Perm(arr, idx, n) {
		if (n === undefined) {
			n = 8;
		}
		n--;
		var i, m, p, v, val;
		val = 1985229328;
		for (i = 0; i < n; ++i) {
			p = fact[n - i];
			v = ~~(idx / p);
			idx %= p;
			v <<= 2;
			arr[i] = val >> v & 7;
			m = (1 << v) - 1;
			val = (val & m) + (val >> 4 & ~m);
		}
		arr[n] = val & 7;
	}

	function createMove(moveTable, size, doMove, N_MOVES) {
		N_MOVES = N_MOVES || 6;
		for (var j=0; j<N_MOVES; j++) {
			moveTable[j] = [];
			for (var i=0; i<size; i++) {
				moveTable[j][i] = doMove(i, j);
			}
		}
	}

	function edgeMove(arr, m) {
		if (m==0) {//F
			circleOri(arr, 0, 7, 8, 4, 1);
		} else if (m==1) {//R
			circleOri(arr, 3, 6, 11, 7, 0);
		} else if (m==2) {//U
			circleOri(arr, 0, 1, 2, 3, 0);
		} else if (m==3) {//B
			circleOri(arr, 2, 5, 10, 6, 1);
		} else if (m==4) {//L
			circleOri(arr, 1, 4, 9, 5, 0);
		} else if (m==5) {//D
			circleOri(arr, 11, 10, 9, 8, 0);
		}
	}

	function createPrun(prun, init, size, maxd, doMove, N_MOVES, N_POWER, N_INV) {
		var isMoveTable = $.isArray(doMove);
		N_MOVES = N_MOVES || 6;
		N_POWER = N_POWER || 3;
		N_INV = N_INV || 256;
		maxd = maxd || 256;
		for (var i=0, len=(size + 7)>>>3; i<len; i++) {
			prun[i] = -1;
		}
		prun[init >> 3] ^= 15 << ((init & 7) << 2);
		// var t = +new Date;
		for (var l=0; l<=maxd; l++) {
			var done = 0;
			var inv = l >= N_INV;
			var fill = (l + 1) ^ 15;
			var find = inv ? 0xf : l;
			var check = inv ? l : 0xf;
			out: for (var p=0; p<size; p++){
				if (getPruning(prun, p) != find) {
					continue;
				}
				for (var m=0; m<N_MOVES; m++){
					var q=p;
					for (var c=0; c<N_POWER; c++){
						q = isMoveTable ? doMove[m][q] : doMove(q, m);
						if (getPruning(prun, q) != check) {
							continue;
						}
						++done;
						if (inv) {
							prun[p >> 3] ^= fill << ((p & 7) << 2);
							continue out;
						}
						prun[q >> 3] ^= fill << ((q & 7) << 2);
					}
				}
			}
			if (done == 0) {
				break;
			}
			// console.log(done);
		}
	}

	//state_params: [[init, doMove, size, [maxd], [N_INV]], [...]...]
	function Solver(N_MOVES, N_POWER, state_params) {
		this.N_STATES = state_params.length;
		this.N_MOVES = N_MOVES;
		this.N_POWER = N_POWER;
		this.state_params = state_params;
		this.inited = false;
	}

	var _ = Solver.prototype;

	_.search = function(state, minl, MAXL) {
		MAXL = (MAXL || 99) + 1;
		if (!this.inited) {
			this.move = [];
			this.prun = [];
			for (var i = 0; i < this.N_STATES; i++) {
				var state_param = this.state_params[i];
				var init = state_param[0];
				var doMove = state_param[1];
				var size = state_param[2];
				var maxd = state_param[3];
				var N_INV = state_param[4];
				this.move[i] = [];
				this.prun[i] = [];
				createMove(this.move[i], size, doMove, this.N_MOVES);
				createPrun(this.prun[i], init, size, maxd, this.move[i], this.N_MOVES, this.N_POWER, N_INV);
			}
			this.inited = true;
		}
		this.sol = [];
		for (var maxl = minl; maxl < MAXL; maxl++) {
			if (this.idaSearch(state, maxl, -1)) {
				break;
			}
		}
		return maxl == MAXL ? null : this.sol.reverse();
	}

	_.toStr = function(sol, move_map, power_map) {
		var ret = [];
		for (var i = 0; i < sol.length; i++) {
			ret.push(move_map[sol[i][0]] + power_map[sol[i][1]]);
		}
		return ret.join(' ').replace(/ +/g, ' ');
	}

	_.idaSearch = function(state, maxl, lm) {
		var N_STATES = this.N_STATES;
		if (maxl == 0) {
			for (var i = 0; i < N_STATES; i++) {
				if (state[i] != 0) {
					return false;
				}
			}
			return true;
		}
		for (var i = 0; i < N_STATES; i++) {
			if (getPruning(this.prun[i], state[i]) > maxl) {
				return false;
			}
		}
		for (var move = 0; move < this.N_MOVES; move++) {
			if (move == lm) {
				continue;
			}
			var cur_state = state.slice();
			for (var power = 0; power < this.N_POWER; power++) {
				for (var i = 0; i < N_STATES; i++) {
					cur_state[i] = this.move[i][move][cur_state[i]];
				}
				if (this.idaSearch(cur_state, maxl - 1, move)) {
					this.sol.push([move, power]);
					return true;
				}
			}
		}
		return false;
	}

	function rndEl(x) {
		return x[~~(Math.random()*x.length)];
	}

	function rn(n) {
		return ~~(Math.random()*n)
	}

	function rndProb(plist) {
		var cum = 0;
		var curIdx = 0;
		for (var i = 0; i < plist.length; i++) {
			if (plist[i] == 0) {
				continue;
			}
			// console.log(plist, plist[i] / (cum + plist[i]));
			if (Math.random() < plist[i] / (cum + plist[i])) {
				curIdx = i;
			}
			cum += plist[i];
		}
		return curIdx;
	}

	return {
		Cnk: Cnk,
		fact: fact,
		getPruning: getPruning,
		setNPerm: setNPerm,
		getNPerm: getNPerm,
		getNParity: getNParity,
		get8Perm: get8Perm,
		set8Perm: set8Perm,
		createMove: createMove,
		edgeMove: edgeMove,
		circle: circle,
		circleOri: circleOri,
		createPrun: createPrun,
		rn: rn,
		rndEl: rndEl, 
		rndProb: rndProb, 
		Solver: Solver
	}

})();

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	jQuery.fx.off = true;
}

if (window.performance && window.performance.now) {
	$.now = function() {
		return Math.floor(window.performance.now());
	}
}

$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if (results==null){
		return null;
	}
	else{
		return results[1] || 0;
	}
}