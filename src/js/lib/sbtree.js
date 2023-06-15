"use strict";

// simplified size-balanced tree introduced by Qifeng Chen
var sbtree = (function() {

	var NULL_NODE = null;

	function Node(key, value, left, right) {
		this.k = key;
		this.v = value;
		this.left = left || NULL_NODE;
		this.right = right || NULL_NODE;
		this.size = 1;
		this.sum = key;
		this.sk2 = Math.pow(key, 2);
	}

	NULL_NODE = new Node(0, 0);
	NULL_NODE.left = NULL_NODE;
	NULL_NODE.right = NULL_NODE;
	NULL_NODE.size = 0;

	Node.prototype.get = function(dir) {
		return dir ? this.right : this.left;
	};

	Node.prototype.set = function(dir, val) {
		if (dir) {
			this.right = val;
		} else {
			this.left = val;
		}
	};

	function SBTree(comparator) {
		this.root = NULL_NODE;
		this.cmp = comparator;
	}

	SBTree.prototype.find = function(key) {
		var node = this.root;
		while (node != NULL_NODE) {
			if (key == node.k) {
				return node.v;
			}
			node = node.get(this.cmp(node.k, key) < 0 ^ 0);
		}
		return undefined;
	};

	SBTree.prototype.cumSum = function(n_value) {
		if (n_value >= this.root.size || this.root.size == 0) {
			return this.root.sum;
		}
		var node = this.root;
		var ret = 0;
		while (n_value > 0) {
			var leftSize = node.get(0).size;
			if (n_value < leftSize) {
				node = node.get(0);
				continue;
			}
			ret += node.get(0).sum;
			if (n_value == leftSize) {
				return ret;
			}
			ret += node.k;
			n_value -= leftSize + 1;
			node = node.get(1);
		}
		return ret;
	};

	SBTree.prototype.cumSk2 = function(n_value) {
		if (n_value >= this.root.size || this.root.size == 0) {
			return this.root.sk2;
		}
		var node = this.root;
		var ret = 0;
		while (n_value > 0) {
			var leftSize = node.get(0).size;
			if (n_value < leftSize) {
				node = node.get(0);
				continue;
			}
			ret += node.get(0).sk2;
			if (n_value == leftSize) {
				return ret;
			}
			ret += Math.pow(node.k, 2);
			n_value -= leftSize + 1;
			node = node.get(1);
		}
		return ret;
	};

	SBTree.prototype.rank = function(nth) {
		var node = this.root;
		while (node != NULL_NODE) {
			var leftSize = node.get(0).size;
			if (nth < leftSize) {
				node = node.get(0);
			} else if (nth == leftSize) {
				return node.k;
			} else {
				nth -= leftSize + 1;
				node = node.get(1);
			}
		}
		return nth < 0 ? -1e300 : 1e300;
	};

	SBTree.prototype.rankOf = function(key) {
		var node = this.root;
		var rank = 0;
		while (node != NULL_NODE) {
			var cmp = this.cmp(node.k, key);
			if (cmp < 0) {
				rank += node.get(0).size + 1;
				node = node.get(1);
			} else {
				node = node.get(0);
			}
		}
		return rank;
	};

	SBTree.prototype.traverse = function(func, reverse) {
		return traverseDir(this.root, func, reverse ^ 0);
	};

	function traverseDir(node, func, dir) {
		return node == NULL_NODE || traverseDir(node.get(dir), func, dir) && func(node) && traverseDir(node.get(dir ^ 1), func, dir);
	}

	SBTree.prototype.insertR = function(node, key, value) {
		if (node == NULL_NODE) { // empty tree
			return new Node(key, value);
		}
		node.size += 1;
		node.sum += key;
		node.sk2 += Math.pow(key, 2);
		var dir = this.cmp(node.k, key) < 0 ^ 0;
		node.set(dir, this.insertR(node.get(dir), key, value));
		if (node.get(dir).get(dir).size > node.get(dir ^ 1).size) {
			node = single_rotate(node, dir ^ 1);
		} else if (node.get(dir).get(dir ^ 1).size > node.get(dir ^ 1).size) {
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
		if (node == NULL_NODE) {
			return NULL_NODE;
		}
		node.size -= 1;
		node.sum -= key;
		node.sk2 -= Math.pow(key, 2);
		if (node.k == key) {
			if (node.get(0) == NULL_NODE || node.get(1) == NULL_NODE) {
				return node.get(node.get(0) == NULL_NODE ^ 0);
			} else {
				var heir = node.get(0);
				while (heir.get(1) != NULL_NODE) {
					heir = heir.get(1);
				}
				node.k = heir.k;
				node.v = heir.v;
				key = heir.k;
			}
		}
		var dir = this.cmp(node.k, key) < 0 ^ 0;
		node.set(dir, this.removeR(node.get(dir), key));
		return node;
	};

	function single_rotate(node, dir) {
		var save = node.get(dir ^ 1);
		node.set(dir ^ 1, save.get(dir));
		save.set(dir, node);

		save.size = node.size;
		node.size = node.get(0).size + node.get(1).size + 1;
		save.sum = node.sum;
		node.sum = node.get(0).sum + node.get(1).sum + node.k;
		save.sk2 = node.sk2;
		node.sk2 = node.get(0).sk2 + node.get(1).sk2 + Math.pow(node.k, 2);

		return save;
	}

	function double_rotate(node, dir) {
		node.set(dir ^ 1, single_rotate(node.get(dir ^ 1), dir ^ 1));
		return single_rotate(node, dir);
	}

	return {
		tree: function(cmp) {
			return new SBTree(cmp);
		}
	};
})();
