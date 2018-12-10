"use strict";

var TimerDataConverter = (function() {

	function readCSV(data, spliter) {
		data = data.split(/\r?\n/g);
		for (var i = 0; i < data.length; i++) {
			var rawLine = data[i].split(spliter);
			var line = [];
			var curValue = [];
			var cntQuote = 0;
			for (var j = 0; j < rawLine.length; j++) {
				curValue.push(rawLine[j]);
				cntQuote += (rawLine[j].match(/"/g) || []).length;
				if (cntQuote % 2 == 0) {
					var append = curValue.join(',');
					if (append[0] == '"') {
						append = append.replace(/""/g, '"').slice(1, -1);
					}
					line.push(append);
					curValue = [];
				}
			}
			data[i] = line;
		}
		return data;
	}

	// {'name': [regex, converter]}
	var Timers = {}

	Timers['csTimer'] = [/^{"session1"/i, function(data) {
		data = JSON.parse(data);
		var sessionData = {};
		try {
			sessionData = JSON.parse(JSON.parse(data['properties'])['sessionData']);
		} catch (e) {}

		var ret = [];
		for (var key in data) {
			var m = /^session(\d+)$/.exec(key);
			if (!m) {
				continue;
			}
			var curSession = {};
			var times = [];
			try {
				times = JSON.parse(data[key]);
			} catch (e) {}
			// ensure valid times, and do not import empty sessions
			if (!$.isArray(times) || times.length == 0) {
				continue;
			}
			var validTimes = [];
			for (var i = 0; i < times.length; i++) {
				var time = times[i];
				if (!$.isArray(time) || !$.isArray(time[0])) {
					continue;
				}
				time[0] = $.map(time[0], Number);
				validTimes.push(time);
			}
			curSession['times'] = validTimes;
			if (~~m[1] in sessionData) {
				var curData = sessionData[~~m[1]];
				curSession['name'] = curData['name'] || m[1];
				curSession['scr'] = curData['scr'];
				curSession['phases'] = curData['phases'];
				curSession['rank'] = curData['rank'];
			} else {
				curSession['name'] = m[1];
				curSession['rank'] = ret.length + 1;
			}
			ret.push(curSession);
		}
		ret.sort(function(a, b) {
			return a['rank'] - b['rank'];
		});
		return ret;
	}];

	Timers['ZYXTimer'] = [/^Session: /i, function(data) {

	}];

	Timers['TwistyTimer'] = [/^Puzzle,Category,Time\(millis\),Date\(millis\),Scramble,Penalty,Comment/i, function(data) {
		data = readCSV(data, ';');
		var ScrambleMap = {
			'333': '333',
			'222': '222so',
			'444': '444wca',
			'555': '555wca',
			'pyra': 'pyrso',
			'skewb': 'skbso',
			'mega': 'mgmp',
			'sq1': 'sqrs',
			'clock': 'clkwca',
			'666': '666wca',
			'777': '777wca'
		};
		var name2idx = {};
		var ret = [];
		for (var i = 1; i < data.length; i++) {
			var line = data[i];
			if (line.length != 7) {
				continue;
			}
			var name = line[0] + '-' + line[1];
			var time = [{
				'0': 0,
				'1': 2000,
				'2': -1
			}[line[5]], Math.round(line[2])];
			if (!(name in name2idx)) {
				name2idx[name] = ret.length;
				ret.push({
					'name': name,
					'phases': 1,
					'scr': ScrambleMap[line[0]] || '333',
					'times': []
				});
			}
			ret[name2idx[name]]['times'].push([time, line[4], line[6], Math.round(line[3] / 1000)]);
		}
		return ret;
	}];

	Timers['BlockKeeper'] = [/^{"puzzles":\[{"name":/i, function(data) {
		data = JSON.parse(data)["puzzles"];
		var ScrambleMap = {
			'3x3x3': '333',
			'2x2x2': '222so',
			'4x4x4': '444wca',
			'5x5x5': '555wca',
			'Pyraminx': 'pyrso',
			'Skewb': 'skbso',
			'Megaminx': 'mgmp',
			'Square-1': 'sqrs',
			'Clock': 'clkwca',
			'6x6x6': '666wca',
			'7x7x7': '777wca',
			'3x3x3 BLD': '333ni',
			'4x4x4 BLD': '444bld',
			'5x5x5 BLD': '555bld'
		};

		var ret = [];
		$.each(data, function(idx, puzzle) {
			var puzzleName = puzzle['name'];
			var puzzleScr = puzzle['scrambler'];
			var puzzleSplit = puzzle['splits'];
			$.each(puzzle['sessions'], function(idx, session) {
				var sessionName = session['name'];
				var timeList = [];
				$.each(session['records'], function(idx, val) {
					var time = [{
						'OK': 0,
						'+2': 2000,
						'DNF': -1
					}[val['result']], Math.round(val['time'] * 1000)];
					Array.prototype.push.apply(time, $.map(val['split'].reverse(), function(value) {
						return Math.round(value * 1000);
					}));
					timeList.push([time, val['scramble'], val['comment'] || '', Math.round(val['date'] / 1000)]);
				});
				if (timeList.length == 0) {
					return;
				}
				ret.push({
					'name': (puzzleName + '-' + sessionName),
					'phases': puzzleSplit,
					'scr': ScrambleMap[puzzleScr] || '333',
					'times': timeList
				})
			});
		});
		return ret;
	}];

	Timers['PrismaTimer'] = [/^[^\t\n]*\t[^\t\n]*\t[^\t\n]*\t[^\t\n]*\t[^\t\n]*\n/i, function(data) {

	}];

	function convert(data) {
		var ret = undefined;
		for (var timer in Timers) {
			if (Timers[timer][0].exec(data)) {
				console.log('try read by ' + timer);
				try {
					ret = Timers[timer][1](data);
					break;
				} catch (e) {}
			}
		}
		return ret;
	}

	//return [session1, session2, session3, ...]
	//session = {'name': name, 'scr': scr, 'phases': phases, 'times': times}
	return convert;
})();