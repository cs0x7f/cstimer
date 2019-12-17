"use strict";

// simplified size-balanced tree introduced by Qifeng Chen
var sbtree = (function() {

	function Node(key, value) {
		this.k = key;
		this.v = value;
		this[0] = null;
		this[1] = null;
		this.cnt = 1;
		this.sum = key;
		this.sk2 = Math.pow(key, 2);
	}

	function SBTree(comparator) {
		this.root = null;
		this.cmp = comparator;
	}

	SBTree.prototype.find = function(key) {
		var node = this.root;
		while (node !== null) {
			if (key == node.k) {
				return node.v;
			}
			node = node[this.cmp(node.k, key) < 0 ^ 0];
		}
		return undefined;
	};

	function size(node) {
		return node == null ? 0 : node.cnt;
	}

	function sum(node) {
		return node == null ? 0 : node.sum;
	}

	function sk2(node) {
		return node == null ? 0 : node.sk2;
	}

	SBTree.prototype.cumSum = function(n_value) {
		if (n_value >= size(this.root) || size(this.root) == 0) {
			return sum(this.root);
		}
		var node = this.root;
		var ret = 0;
		while (n_value > 0) {
			var leftSize = size(node[0]);
			if (n_value < leftSize) {
				node = node[0];
				continue;
			}
			ret += sum(node[0]);
			if (n_value == leftSize) {
				return ret;
			}
			ret += node.k;
			n_value -= leftSize + 1;
			node = node[1];
		}
		return ret;
	};

	SBTree.prototype.cumSk2 = function(n_value) {
		if (n_value >= size(this.root) || size(this.root) == 0) {
			return sk2(this.root);
		}
		var node = this.root;
		var ret = 0;
		while (n_value > 0) {
			var leftSize = size(node[0]);
			if (n_value < leftSize) {
				node = node[0];
				continue;
			}
			ret += sk2(node[0]);
			if (n_value == leftSize) {
				return ret;
			}
			ret += Math.pow(node.k, 2);
			n_value -= leftSize + 1;
			node = node[1];
		}
		return ret;
	};

	SBTree.prototype.rank = function(nth) {
		var node = this.root;
		while (node) {
			var leftSize = size(node[0]);
			if (nth < leftSize) {
				node = node[0];
			} else if (nth == leftSize) {
				return node.k;
			} else {
				nth -= leftSize + 1;
				node = node[1];
			}
		}
		return nth < 0 ? -1e300 : 1e300;
	};

	SBTree.prototype.rankOf = function(key) {
		var node = this.root;
		var rank = 0;
		while (node) {
			var cmp = this.cmp(node.k, key);
			if (cmp < 0) {
				rank += size(node[0]) + 1;
				node = node[1];
			} else {
				node = node[0];
			}
		}
		return rank;
	};

	SBTree.prototype.traverse = function(func, reverse) {
		return traverseDir(this.root, func, reverse ^ 0);
	};

	function traverseDir(node, func, dir) {
		return node == null || traverseDir(node[dir], func, dir) && func(node) && traverseDir(node[dir ^ 1], func, dir);
	}

	SBTree.prototype.insertR = function(node, key, value) {
		if (node === null) { // empty tree
			return new Node(key, value);
		}
		node.cnt += 1;
		node.sum += key;
		node.sk2 += Math.pow(key, 2);
		var dir = this.cmp(node.k, key) < 0 ^ 0;
		node[dir] = this.insertR(node[dir], key, value);
		if (size(node[dir][dir]) > size(node[dir ^ 1])) {
			node = single_rotate(node, dir ^ 1);
		} else if (size(node[dir][dir ^ 1]) > size(node[dir ^ 1])) {
			node = double_rotate(node, dir ^ 1);
		}
		return node;
	};

	SBTree.prototype.insert = function(key, value) {
		this.root = this.insertR(this.root, key, value);
		return this;
	};

	SBTree.prototype.remove = function(key) {
		this.root = this.removeR(this.root, key);
		return this;
	};

	SBTree.prototype.removeR = function(node, key) {
		if (node == null) {
			return null;
		}
		node.cnt -= 1;
		node.sum -= key;
		node.sk2 -= Math.pow(key, 2);
		if (node.k == key) {
			if (node[0] == null || node[1] == null) {
				return node[node[0] == null ^ 0];
			} else {
				var heir = node[0];
				while (heir[1] != null) {
					heir = heir[1];
				}
				node.k = heir.k;
				node.v = heir.v;
				key = heir.k;
			}
		}
		var dir = this.cmp(node.k, key) < 0 ^ 0;
		node[dir] = this.removeR(node[dir], key);
		return node;
	};

	function single_rotate(node, dir) {
		var save = node[dir ^ 1];
		node[dir ^ 1] = save[dir];
		save[dir] = node;

		save.cnt = node.cnt;
		node.cnt = size(node[0]) + size(node[1]) + 1;
		save.sum = node.sum;
		node.sum = sum(node[0]) + sum(node[1]) + node.k;
		save.sk2 = node.sk2;
		node.sk2 = sk2(node[0]) + sk2(node[1]) + Math.pow(node.k, 2);

		return save;
	}

	function double_rotate(node, dir) {
		node[dir ^ 1] = single_rotate(node[dir ^ 1], dir ^ 1);
		return single_rotate(node, dir);
	}

	return {
		tree: function(cmp) {
			return new SBTree(cmp);
		}
	};
})();
