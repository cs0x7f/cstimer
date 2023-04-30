"use strict";

window.twistyjs.qcube = (function() {

	var qcube = {};

	var twisties = {};

	qcube.registerTwisty = function(twistyName, twistyConstructor) {
		twisties[twistyName] = twistyConstructor;
	};

	qcube.TwistyScene = function() {
		var that = this;

		var twisty;

		var twistyContainer = $('<div style="width:100%; height:100%;"/>');
		var twistyCanvas = $('<canvas>').appendTo(twistyContainer);

		this.fixSize = function(w, h) {
			var min = Math.min($(twistyContainer).width() / w, $(twistyContainer).height() / h);
			var width = Math.max(50, min);
			twistyCanvas.width(w * min);
			twistyCanvas.height(h * min);
			twistyCanvas.attr('width', w * width);
			twistyCanvas.attr('height', h * width);
			return width;
		}

		this.getDomElement = function() {
			return twistyContainer;
		};
		this.getCanvas = function() {
			return twistyCanvas;
		};
		this.getTwisty = function() {
			return twisty;
		};
		this.keydown = function(e) {
			var ret = twisty.keydown(e);
			ret && render();
		};

		function render() {
			twisty && twisty.render();
		}

		var moveListeners = [];
		this.addMoveListener = function(listener) {
			moveListeners.push(listener);
		};
		this.removeMoveListener = function(listener) {
			var index = moveListeners.indexOf(listener);
			delete moveListeners[index];
		};

		function fireMoveAdded(movets) {
			for (var i = 0; i < moveListeners.length; i++) {
				moveListeners[i](movets[0], 0, movets[1]);
			}
		}

		function fireMoveStarted(movets) {
			for (var i = 0; i < moveListeners.length; i++) {
				moveListeners[i](movets[0], 1, movets[1]);
			}
		}

		function fireMoveEnded(movets) {
			for (var i = 0; i < moveListeners.length; i++) {
				moveListeners[i](movets[0], 2, movets[1]);
			}
		}

		this.addMoves = function(moves, ts) {
			var timestamp = ts || $.now();
			for (var i = 0; i < moves.length; i++) {
				fireMoveAdded([moves[i], timestamp]);
			}
			return this.applyMoves(moves, ts);
		};

		this.applyMoves = function(moves, ts) {
			var timestamp = ts || $.now();
			var movets = [];
			for (var i = 0; i < moves.length; i++) {
				twisty.doMove(moves[i]);
				fireMoveEnded([moves[i], timestamp]);
			}
			render();
		}

		this.resize = function() {
			render();
		}

		this.initializeTwisty = function(option) {
			var twistyCreateFunction = twisties[option.type];
			if (!twistyCreateFunction) {
				return null;
			}
			twisty = new twistyCreateFunction(that, option);
		}
	}

	return qcube;
})();

