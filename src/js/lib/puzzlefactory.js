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
		if (style == 'q') {
			child[2].init(options);
		} else {
			child[2].twistyScene.initializeTwisty(options);
			child[2].twisty = child[2].twistyScene.getTwisty();
		}
		child[2].resize();
		callback(child[2], isInit);
	}

	return {
		init: init
	}
});
