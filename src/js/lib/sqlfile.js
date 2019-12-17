"use strict";

var SQLFile = execMain(function() {

	function getInt(data, offset, length) {
		var ret = 0;
		if (length) {
			for (var i = 0; i < length; i++) {
				ret = ret << 8 | data[offset[0]++];
			}
		} else {
			do {
				ret = ret << 7 | data[offset[0]] & 0x7f;
			} while (data[offset[0]++] >= 128);
		}
		return ret;
	}

	function procPayload(data, offset, length, callback) {
		var tmp = [offset];
		var headerLen = getInt(data, tmp);
		var headerEnd = offset + headerLen;
		offset = tmp;
		var serialTypes = [];
		var serialData = [];
		while (offset[0] < headerEnd) {
			serialTypes.push(getInt(data, offset));
		}
		for (var i = 0; i < serialTypes.length; i++) {
			var serialType = serialTypes[i];
			if (serialType == 0) {
				serialData[i] = null;
			} else if (serialType >= 1 && serialType <= 4) {
				serialData[i] = getInt(data, offset, serialType);
			} else if (serialType == 5) {
				serialData[i] = undefined;
				getInt(data, offset, 6);
			} else if (serialType == 6) {
				serialData[i] = undefined;
				getInt(data, offset, 8);
			} else if (serialType == 7) {
				serialData[i] = undefined;
				getInt(data, offset, 8);
			} else if (serialType == 8) {
				serialData[i] = 0;
			} else if (serialType == 9) {
				serialData[i] = 1;
			} else if (serialType == 10 || serialType == 11) {
			} else if (serialTypes[i] % 2 == 0) {
				serialData[i] = data.slice(offset[0], offset[0] + (serialType - 12) / 2);
				offset[0] += (serialType - 12) / 2;
			} else {
				serialData[i] = String.fromCharCode.apply(null, data.slice(offset[0], offset[0] + (serialType - 13) / 2));
				offset[0] += (serialType - 13) / 2;
			}
		}
		callback(serialData);
	}

	function loadPage(data, page, callback) {
		var offset = page == 1 ? 100 : (page - 1) * getInt(data, [16], 2);
		var pageType = data[offset];
		var numOfCell = data[offset + 3] << 8 | data[offset + 4];
		var caoff = [offset + 8];
		var rightMost = -1;
		if (pageType & 0x8) {} else {
			rightMost = getInt(data, caoff, 4);
		}
		for (var i = 0; i < numOfCell; i++) {
			var coffset = [(offset == 100 ? 0 : offset) + getInt(data, [caoff[0] + i * 2], 2)];
			if (pageType == 0x2 || pageType == 0xa) {
			} else if (pageType == 0x5) {
				var leftChild = getInt(data, coffset, 4);
				loadPage(data, leftChild, callback);
			} else if (pageType == 0xd) {
				var nBytes = getInt(data, coffset);
				procPayload(data, coffset[0], nBytes, callback);
				coffset[0] += nBytes;
			}
		}
		if (rightMost != -1) {
			loadPage(data, rightMost, callback);
		}
	}

	function loadTableList(data) {
		var tables = {};
		loadPage(data, 1, function(value) {
			tables[value[2]] = [value[3], value[4]];
		});
		return tables;
	}

	return {
		loadTableList: loadTableList,
		loadPage: loadPage
	};
});
