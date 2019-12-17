"use strict";

var TimerDataConverter = execMain(function() {

	var timeRE = /^(DNF)?\(?(\d*?):?(\d*?):?(\d*\.?\d*?)(\+)?\)?$/;

	function stdStr(val) {
		try {
			return decodeURIComponent(escape(val));
		} catch (e) {}
		return val;
	}

	function readCSV(data, spliter) {
		data = stdStr(data).split(/\r?\n/g);
		var ret = [];
		var line = [];
		var curValue = [];
		var cntQuote = 0;
		for (var i = 0; i < data.length; i++) {
			var rawLine = data[i].split(spliter);
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
			if (cntQuote % 2 == 0) {
				ret.push(line);
				line = [];
				curValue = [];
				cntQuote = 0;
			}
		}
		return ret;
	}

	// {'name': [regex, converter]}
	var Timers = {};

	Timers['csTimer'] = [/^{"session1"/i, function(data) {
		data = JSON.parse(stdStr(data));
		var sessionData = {};
		try {
			sessionData = mathlib.str2obj(mathlib.str2obj(data['properties'])['sessionData']);
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
				times = mathlib.str2obj(data[key]);
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
				curSession['opt'] = curData['opt'] || {
					'scrType': curData['scr'] || '333',
					'phases': curData['phases'] || 1
				};
				curSession['rank'] = curData['rank'];
			} else {
				curSession['name'] = m[1];
				curSession['opt'] = {};
				curSession['rank'] = ret.length + 1;
			}
			ret.push(curSession);
		}
		ret.sort(function(a, b) {
			return a['rank'] - b['rank'];
		});
		return ret;
	}];

	Timers['csTimerCSV'] = [/^No\.;Time;Comment;Scramble;Date;P\.1/i, function(data) {
		data = readCSV(data, ';');
		var times = [];
		var n_phases = data[0].length - 5;
		for (var i = 1; i < data.length; i++) {
			var line = data[i];
			var time = []; // use multi-phase time instead of that recorded in 'Time'
			var m = timeRE.exec(line[1]); // detect penalty only
			if (!m) { //invalid
				console.log('Invalid data detected');
				continue;
			} else if (m[1]) {
				time[0] = -1;
			} else if (m[5]) {
				time[0] = 2000;
			} else {
				time[0] = 0;
			}
			while (line[line.length - 1] == '') {
				line.pop();
			}
			for (var j = 5; j < line.length; j++) {
				m = timeRE.exec(line[j]);
				var val = Math.round(3600000 * ~~(m[2]) + 60000 * ~~(m[3]) + 1000 * parseFloat(m[4]));
				time[line.length - j] = (time[line.length - j + 1] || 0) + val;
			}
			time = [time, line[3], line[2], mathlib.str2time(line[4])];
			times.push(time);
		}
		return [{
			'name': 'import',
			'opt': {
				'phases': n_phases
			},
			'times': times
		}];
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
			} [line[5]], Math.round(line[2])];
			if (!(name in name2idx)) {
				name2idx[name] = ret.length;
				ret.push({
					'name': name,
					'opt': {
						'scrType': ScrambleMap[line[0]] || '333'
					},
					'times': []
				});
			}
			ret[name2idx[name]]['times'].push([time, line[4], line[6], Math.round(line[3] / 1000)]);
		}
		return ret;
	}];

	Timers['BlockKeeper'] = [/^{"puzzles":\[{"name":/i, function(data) {
		data = JSON.parse(stdStr(data))["puzzles"];
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
					} [val['result']], Math.round(val['time'] * 1000)];
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
					'opt': {
						'phases': puzzleSplit,
						'scrType': ScrambleMap[puzzleScr] || '333'
					},
					'times': timeList
				});
			});
		});
		return ret;
	}];

	Timers['PrismaTimer'] = [/^[^\t\n]*(\t[^\t\n]*){4}\n/i, function(data) {}];

	Timers['DCTimer.raw'] = [/^\d+[\r\n]+[^\t\n]*(\t[^\t\n]*){11}[\r\n]+/i, function(data) {
		data = stdStr(data).split(/[\r\n]+/);
		var name2idx = {};
		var curSession = 0;
		var ret = [];
		for (var i = 0; i < data.length; i++) {
			if (/^\d+$/.exec(data[i])) {
				curSession = ~~(data[i]);
				name2idx[curSession] = ret.length;
				ret.push({
					'name': curSession,
					'opt': {},
					'times': []
				});
				continue;
			}
			var line = data[i].split('\t');
			if (line.length < 6) {
				continue;
			}
			ret[name2idx[curSession]]['times'].push([
				[line[2] == '1' ? (line[1] == '1' ? 2000 : 0) : -1, ~~line[0]], line[3], line[5], mathlib.str2time(line[4])
			]);
		}
		return ret;
	}];

	Timers['DCTimer.sqlite'] = [/^SQLite format 3\0/i, function(data) {
		var uint8arr = new Uint8Array(data.length);
		for (var i = 0; i < data.length; i++) {
			uint8arr[i] = data.charCodeAt(i);
		}
		var tables = SQLFile.loadTableList(uint8arr);
		var sidx2idx = {};
		var ret = [];
		var checkExistSidx = function(sidx, name) {
			if (!(sidx in sidx2idx)) {
				sidx2idx[sidx] = ret.length;
				ret.push({
					'name': (name || (sidx + 1)),
					'opt': {},
					'times': []
				});
			}
		};
		SQLFile.loadPage(uint8arr, tables['sessiontb'][0], function(value) {
			checkExistSidx(value[0], stdStr(value[1]));
		});
		for (var tname in tables) {
			var m = /^result(\d+|tb)$/.exec(tname);
			if (!m) {
				continue;
			}
			var sidx = (m[1] == 'tb' ? 1 : ~~m[1]) - 1;
			SQLFile.loadPage(uint8arr, tables[tname][0], function(value) {
				checkExistSidx(sidx);
				ret[sidx2idx[sidx]]['times'].push([
					[value[3] == '1' ? (value[2] == '1' ? 2000 : 0) : -1, ~~value[1]], stdStr(value[4] || ''), stdStr(value[6] || ''), mathlib.str2time(value[5])
				]);
			});
		}
		SQLFile.loadPage(uint8arr, tables['resultstb'][0], function(value) {
			var sidx = value[1];
			checkExistSidx(sidx);
			ret[sidx2idx[sidx]]['times'].push([
				[value[4] == '1' ? (value[3] == '1' ? 2000 : 0) : -1, ~~value[2]], stdStr(value[5] || ''), stdStr(value[7] || ''), mathlib.str2time(value[6])
			]);
		});
		return ret;
	}];

	Timers['mateus.cubetimer'] = [/^"Category";"Time \(MM:SS\.SSS\)";"Scrambler";"Date";"Penalty \+2 \(yes or no\)";"DNF \(yes or no\)";"Section"\n/i, function(data) {
		data = readCSV(data, ';');
		var ScrambleMap = {
			'3x3x3': '333',
			'2x2x2': '222so',
			'4x4x4': '444wca',
			'5x5x5': '555wca',
			'Pyraminx': 'pyrso',
			'Skewb': 'skbso',
			'Megaminx': 'mgmp',
			'Square-1': 'sqrs',
			'Rubik\'s Clock': 'clkwca',
			'6x6x6': '666wca',
			'7x7x7': '777wca',
			'3x3x3 Blindfolded': '333ni',
			'4x4x4 Blindfolded': '444bld',
			'5x5x5 Blindfolded': '555bld',
			'3x3x3 One-Handed': '333oh',
			'3x3x3 Multi-Blindfolded': 'r3ni',
			'3x3x3 With Feet': '333ft',
			'3x3x3 Fewest Moves': '333fm'
		};
		var name2idx = {};
		var ret = [];
		for (var i = 1; i < data.length; i++) {
			var line = data[i];
			if (line.length < 7) {
				continue;
			}
			var name = line[0] + '-' + line[6];
			var m = timeRE.exec(line[1]); // detect penalty only
			if (!m) { //invalid
				console.log('Invalid data detected');
				continue;
			}
			var val = Math.round(3600000 * ~~(m[2]) + 60000 * ~~(m[3]) + 1000 * parseFloat(m[4]));
			var scramble = line[2];
			var penalty = 0;
			if (line[5] == 'yes') {
				penalty = -1;
			} else if (line[4] == 'yes') {
				penalty = 2000;
			}
			if (!(name in name2idx)) {
				name2idx[name] = ret.length;
				ret.push({
					'name': name,
					'opt': {
						'scrType': ScrambleMap[line[0]] || '333',
					},
					'times': []
				});
			}
			ret[name2idx[name]]['times'].push([
				[penalty, val], scramble, '', mathlib.str2time(line[3] + ':00')
			]);
		}
		return ret;
	}];

	function convert(data) {
		var ret = undefined;
		for (var timer in Timers) {
			if (Timers[timer][0].exec(data)) {
				console.log('try read by ' + timer);
				try {
					ret = Timers[timer][1](data);
					break;
				} catch (e) {
					console.log(e);
				}
			}
		}
		return ret;
	}

	//return [session1, session2, session3, ...]
	//session = {'name': name, 'opt': {key: value}, 'times': times}
	return convert;
});
