var puzzleFactory = execMain(function() {
	var isLoading = false;

	var twistyScene;
	var twisty;
	var qcubeObj;

	function Puzzle(twistyScene, twisty) {
		this.twistyScene = twistyScene;
		this.twisty = twisty;
	}

	Puzzle.prototype.keydown = function(args) {
		return this.twistyScene.keydown(args);
	};

	Puzzle.prototype.resize = function() {
		return this.twistyScene.resize();
	};

	Puzzle.prototype.addMoves = function(args) {
		return this.twistyScene.addMoves(args);
	};

	Puzzle.prototype.applyMoves = function(args) {
		return this.twistyScene.applyMoves(args);
	};

	Puzzle.prototype.addMoveListener = function(listener) {
		return this.twistyScene.addMoveListener(listener);
	};

	Puzzle.prototype.getDomElement = function() {
		return this.twistyScene.getDomElement();
	};

	Puzzle.prototype.isRotation = function(move) {
		return this.twisty.isInspectionLegalMove(this.twisty, move);
	};

	Puzzle.prototype.move2str = function(move) {
		return this.twisty.move2str(move);
	};

	Puzzle.prototype.moveInv = function(move) {
		return this.twisty.moveInv(move);
	};

	Puzzle.prototype.toggleColorVisible = function(args) {
		return this.twisty.toggleColorVisible(this.twisty, args);
	};

	Puzzle.prototype.isSolved = function(args) {
		return this.twisty.isSolved(this.twisty, args);
	};

	Puzzle.prototype.moveCnt = function(clr) {
		return this.twisty.moveCnt(clr);
	};

	Puzzle.prototype.parseScramble = function(scramble, addPreScr) {
		return this.twisty.parseScramble(scramble, addPreScr);
	};

	var toInitCalls = null;

	var prevParents = [];

	function init(options, moveListener, parent, callback) {
		if (window.twistyjs == undefined) {
			toInitCalls = init.bind(null, options, moveListener, parent, callback);
			if (!isLoading && document.createElement('canvas').getContext) {
				isLoading = true;
				$.getScript("js/twisty.js", function() {
					toInitCalls && toInitCalls();
				});
			} else {
				callback(undefined, true);
			}
			return;
		}
		var style = /^q[2l]?$/.exec(options['style']) ? 'q' : 'v';
		var child = null;
		for (var i = 0; i < prevParents.length; i++) {
			if (prevParents[i][0] == parent) {
				child = prevParents[i];
				break;
			}
		}
		var isInit = !child || child[1] != style;
		if (isInit) {
			if (!child) {
				child = [parent, style];
				prevParents.push(child);
			} else {
				child[1] = style;
			}
			if (style == 'q') {
				child[2] = new twistyjs.qcube();
			} else {
				twistyScene = new twistyjs.TwistyScene();
				child[2] = new Puzzle(twistyScene, null);
			}
			parent.empty().append(child[2].getDomElement());
			child[2].addMoveListener(moveListener);
		}
		var puzzle = options['puzzle'];
		if (puzzle.startsWith("cube")) {
			options["type"] = "cube";
			options["faceColors"] = col2std(kernel.getProp("colcube"), [3, 4, 5, 0, 1, 2]); // U L F D L B
			options["dimension"] = ~~puzzle.slice(4) || 3;
			options["stickerWidth"] = 1.7;
		} else if (puzzle == "skb") {
			options["type"] = "skewb";
			options["faceColors"] = col2std(kernel.getProp("colskb"), [0, 5, 4, 2, 1, 3]);
		} else if (puzzle == "mgm") {
			options["type"] = "mgm";
			options["faceColors"] = col2std(kernel.getProp("colmgm"), [0, 2, 1, 5, 4, 3, 11, 9, 8, 7, 6, 10]);
		} else if (puzzle == "pyr") {
			options["type"] = "pyr";
			options["faceColors"] = col2std(kernel.getProp("colpyr"), [3, 1, 2, 0]);
		} else if (puzzle == "sq1") {
			options["type"] = "sq1";
			options["faceColors"] = col2std(kernel.getProp("colsq1"), [0, 5, 4, 2, 1, 3]);
		} else if (puzzle == "clk") {
			options["type"] = "clk";
			options["faceColors"] = col2std(kernel.getProp("colclk"), [1, 2, 0, 3, 4]);
		}
		options['scale'] = 0.9;
		if (style == 'q') {
			child[2].init(options);
		} else {
			child[2].twistyScene.initializeTwisty(options);
			child[2].twisty = child[2].twistyScene.getTwisty();
		}
		child[2].resize();
		callback(child[2], isInit);
	}

	function col2std(col, faceMap) {
		var ret = [];
		col = (col || '').match(/#[0-9a-fA-F]{3}/g) || [];
		for (var i = 0; i < col.length; i++) {
			ret.push(~~(kernel.ui.nearColor(col[faceMap[i]], 0, true).replace('#', '0x')));
		}
		return ret;
	}

	return {
		init: init
	}
});