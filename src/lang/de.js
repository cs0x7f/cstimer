var OK_LANG = 'OK';
var CANCEL_LANG = 'Abbrechen';
var RESET_LANG = 'Zurücksetzen';
var ABOUT_LANG = 'Über uns';
var ZOOM_LANG = 'Vergrößerung';
var BUTTON_TIME_LIST = 'Liste der<br>Zeiten';
var BUTTON_OPTIONS = 'Optionen';
var BUTTON_EXPORT = 'Export';
var BUTTON_DONATE = 'Spenden';
var PROPERTY_USEINS = 'WCA-Inspektion benutzen';
var PROPERTY_USEINS_STR = 'Immer|Ausgenommen blind|Nie';
var PROPERTY_VOICEINS = 'Sprachansage für WCA-Inspektion';
var PROPERTY_VOICEINS_STR = 'keine|männliche Stimme|weibliche Stimme';
var PROPERTY_PHASES = 'Multi-Phase';
var PROPERTY_TIMERSIZE = 'Timer-Größe';
var PROPERTY_USEMILLI = 'Millisekunden benutzen';
var PROPERTY_SMALLADP = 'kleine Schrift nach dem Komma benutzen';
var PROPERTY_SCRSIZE = 'Scramble-Größe';
var PROPERTY_SCRMONO = 'Monospace-Scramble';
var PROPERTY_SCRLIM = 'Die Höhe des Scramble-Bereichs begrenzen';
var PROPERTY_SCRALIGN = 'Aurichtung des Scramble-Bereichs';
var PROPERTY_SCRALIGN_STR = 'mittig|links|rechts';
var PROPERTY_SCRFAST = 'schnellen Scramble für 4x4x4 verwenden (inoffiziell)';
var PROPERTY_SCRKEYM = 'Schlüssel-Züge im Scramble hervorheben';
var PROPERTY_WNDSCR = 'Scramble-Panel Anzeige-Stil';
var PROPERTY_WNDSTAT = 'Statistik-Panel Anzeige-Stil';
var PROPERTY_WNDTOOL = 'Werkzeug-Panel Anzeige-Stil';
var PROPERTY_WND_STR = 'Normal|Flach';
var EXPORT_DATAEXPORT = 'Daten-Import/Export';
var EXPORT_TOFILE = 'in Datei exportieren';
var EXPORT_FROMFILE = 'von Datei importieren';
var EXPORT_TOSERV = 'auf Server exportieren';
var EXPORT_FROMSERV = 'von Server importieren';
var EXPORT_FROMOTHER = 'Sitzung(en) von anderen Timern importieren';
var EXPORT_USERID = 'Bitte trage deinen Account ein (nur Buchstaben und Zahlen)';
var EXPORT_INVID = 'Nur Buchstaben und Zahlen sind erlaubt!';
var EXPORT_ERROR = 'Ein Fehler ist aufgetreten.';
var EXPORT_NODATA = 'Für deinen Account wurden keine Daten gefunden.';
var EXPORT_UPLOADED = 'Erfolgreich hochgeladen';
var BUTTON_SCRAMBLE = 'SCRA<br>MBLE';
var BUTTON_TOOLS = 'Werkzeuge';
var IMAGE_UNAVAILABLE = 'Für diesen Scramble-Typ nicht verfügbar';
var TOOLS_SELECTFUNC = 'Funktion';
var TOOLS_CROSS = 'Kreuz lösen';
var TOOLS_EOLINE = 'EOLine Lösen';
var TOOLS_ROUX1 = 'Roux ersten Block lösen';
var TOOLS_GIIKER = 'Giiker Cube';
var TOOLS_IMAGE = 'Scramble zeichnen';
var TOOLS_STATS = 'Statistiken';
var TOOLS_HUGESTATS = 'sitzungsübergreifende Statistiken';
var TOOLS_DISTRIBUTION = 'time distribution';
var TOOLS_TREND = 'time trend';
var TOOLS_METRONOME = 'metronome';
var TOOLS_CFMTIME = 'Confirm time';
var PROPERTY_IMGSIZE = 'Scramble Image Size';
var TIMER_INSPECT = 'inspect';
var TIMER_SOLVE = 'solve';
var PROPERTY_USEMOUSE = 'use mouse timer';
var PROPERTY_TIMEU = 'timer update is';
var PROPERTY_TIMEU_STR = 'update|0.1s|seconds|inspection|none';
var PROPERTY_PRETIME = 'time of keeping space down(second(s))';
var PROPERTY_ENTERING = 'entering in times with';
var PROPERTY_ENTERING_STR = 'timer|typing|stackmat|MoYuTimer|virtual|Giiker';
var PROPERTY_COLOR = 'select color theme';
var PROPERTY_COLORS = 'font color|background color|board color|button color|link color|Logo color|Logo bgcolor';
var PROPERTY_VIEW = 'UI style is';
var PROPERTY_VIEW_STR = 'Auto|Mobile|Desktop';
var COLOR_EXPORT = 'Please save the string for import';
var COLOR_IMPORT = 'Please input the string exported';
var COLOR_FAIL = 'Incorrect Data, Import Failed';
var PROPERTY_FONTCOLOR_STR = 'black|white';
var PROPERTY_COLOR_STR = 'random|style1|style2|style3|black|white|style6|manual|export...|import...';
var PROPERTY_FONT = 'select timer\'s font';
var PROPERTY_FONT_STR = 'random digital|normal|digital1|digital2|digital3|digital4|digital5';
var PROPERTY_FORMAT = 'time format';
var PROPERTY_USEKSC = 'use keyboard shortcut';
var PROPERTY_NTOOLS = 'number of tools';
var PROPERTY_AHIDE = 'Hide All Elements When Timing';
var SCRAMBLE_LAST = 'last';
var SCRAMBLE_NEXT = 'next';
var SCRAMBLE_SCRAMBLE = ' scramble';
var SCRAMBLE_LENGTH = 'length';
var SCRAMBLE_INPUT = 'Input Scramble(s)';
var PROPERTY_VRCSPEED = 'VRC base speed (tps)';
var PROPERTY_VRCMP = 'multi-phase';
var PROPERTY_VRCMPS = 'None|CFOP|CF+OP|CFFFFOP|Roux';
var PROPERTY_GIIKERVRC = 'Show virtual Giiker cube';
var PROPERTY_GIISOK_DELAY = 'Mark scrambled if stay';
var PROPERTY_GIISOK_DELAYS = '2s|3s|4s|5s|Never|Correctly scrambled';
var PROPERTY_GIISOK_KEY = 'Mark scrambled with spacebar';
var PROPERTY_GIISOK_MOVE = 'Mark scrambled by doing';
var PROPERTY_GIISOK_MOVES = 'U4, R4, etc|(U U\')2, (U\' U)2, etc|Never';
var PROPERTY_GIISBEEP = 'Beep when mark scrambled';
var PROPERTY_GIIRST = 'Reset Giiker cube when connect';
var PROPERTY_GIIRSTS = 'Always|Prompt|Never';
var CONFIRM_GIIRST = 'Reset Giiker cube as solved?';
var PROPERTY_GIIAED = 'Auto hardware error detection';
var scrdata = [
	['WCA', [
		['3x3x3', "333", 0],
		['2x2x2', "222so", 0],
		['4x4x4', "444wca", -40],
		['5x5x5', "555wca", -60],
		['6x6x6', "666wca", -80],
		['7x7x7', "777wca", -100],
		['3x3 blind', "333ni", 0],
		['3x3 Fewest Moves', "333fm", 0],
		['3x3 einhändig', "333oh", 0],
		['3x3 mit Füßen', "333ft", 0],
		['Clock', "clkwca", 0],
		['Megaminx', "mgmp", -70],
		['Pyraminx', "pyrso", -10],
		['Skewb', "skbso", 0],
		['Square-1', "sqrs", 0],
		['4x4 blind', "444bld", -40],
		['5x5 blind', "555bld", -60],
		['3x3 Multiblind', "r3ni", 5]
	]],
	['Eingabe', [
		['Extern', "input", 0]
	]],
	['===WCA===', [
		['--', "blank", 0]
	]],
	['2x2x2', [
		["WCA", "222so", 0],
		['optimaler Zufallszustand', "222o", 0],
		['3-gen', "2223", 25],
		['EG', "222eg", 0],
		['EG0', "222eg0", 0],
		['EG1', "222eg1", 0],
		['EG2', "222eg2", 0]
	]],
	['3x3x3', [
		["WCA", "333", 0],
		['alter Stil', "333o", 25],
		['3x3x3 für Anfänger', "333noob", 25],
		['nur Kanten', "edges", 0],
		['nur Ecken', "corners", 0],
		['letze Schicht', "ll", 0],
		['ZB letzte Schicht', "zbll", 0],
		['Ecken der letzten Schicht', "cll", 0],
		['Kanten der letzen Schicht', "ell", 0],
		['letzten sechs Kanten', "lse", 0],
		['letzten sechs Kanten&ltM,U&gt', "lsemu", 0],
		['Roux L10P', "cmll", 0],
		['Kreuz gelöst', "f2l", 0],
		['letzter Slot + letzte Schicht', "lsll2", 0],
		['2GLL', "2gll", 0],
		['ZBLS', "zbls", 0],
		['ZZLL', "zzll", 0],
		['OLL', "oll", 0],
		['PLL', "pll", 0],
		['EOLine', "eoline", 0],
		['einfaches Kreuz', "easyc", 3]
	]],
	['4x4x4', [
		["WCA", "444wca", -40],
		['Zufalls-Zugfolge', "444m", 40],
		['SiGN', "444", 40],
		['YJ', "444yj", 40],
		['4x4x4 Kanten', "4edge", 8],
		['R,r,U,u', "RrUu", 40]
	]],
	['5x5x5', [
		["WCA", "555wca", 60],
		['SiGN', "555", 60],
		['5x5x5 edges', "5edge", 8]
	]],
	['6x6x6', [
		["WCA", "666wca", 80],
		['SiGN', "666si", 80],
		['prefix', "666p", 80],
		['suffix', "666s", 80],
		['6x6x6 edges', "6edge", 8]
	]],
	['7x7x7', [
		["WCA", "777wca", 100],
		['SiGN', "777si", 100],
		['prefix', "777p", 100],
		['suffix', "777s", 100],
		['7x7x7 edges', "7edge", 8]
	]],
	['Clock', [
		['jaap', "clk", 0],
		['wca', "clkwca", 0],
		['optimal', "clko", 0],
		['concise', "clkc", 0],
		['efficient pin order', "clke", 0]
	]],
	['Megaminx', [
		["WCA", "mgmp", 70],
		['Carrot', "mgmc", 70],
		['old style', "mgmo", 70]
	]],
	['Pyraminx', [
		["WCA", "pyrso", 10],
		['optimal random state', "pyro", 0],
		['random moves', "pyrm", 25]
	]],
	['Square-1', [
		["WCA", "sqrs", 0],
		['face turn metric', "sq1h", 40],
		['twist metric', "sq1t", 20]
	]],
	['Skewb', [
		["WCA", "skbso", 0],
		['U L R B', "skb", 25]
	]],
	['===OTHER===', [
		['--', "blank", 0]
	]],
	['15 puzzle', [
		['piece moves', "15p", 80],
		['blank moves', "15pm", 80]
	]],
	['LxMxN', [
		['1x3x3 (Floppy Cube)', "133", 0],
		['2x2x3 (Tower Cube)', "223", 0],
		['2x3x3 (Domino)', "233", 25],
		['3x3x4', "334", 40],
		['3x3x5', "335", 25],
		['3x3x6', "336", 40],
		['3x3x7', "337", 40],
		['8x8x8', "888", 120],
		['9x9x9', "999", 120],
		['10x10x10', "101010", 120],
		['11x11x11', "111111", 120]
	]],
	['Gear Cube', [
		['random state', "gearso", 0],
		['optimal random state', "gearo", 0],
		['3-gen', "gear", 10]
	]],
	['Cmetrick', [
		[' ', "cm3", 25]
	]],
	['Cmetrick Mini', [
		[' ', "cm2", 25]
	]],
	['Gigaminx', [
		['Pochmann', "giga", 300]
	]],
	['Helicopter Cube', [
		[' ', "heli", 40]
	]],
	['c', [
		['MoYu', "redim", 8],
		['alt', "redi", 20]
	]],
	['Pyraminx Crystal', [
		['Pochmann', "prcp", 70],
		['alter Stil', "prco", 70]
	]],
	['Siamesischer Cube', [
		['1x1x3 Block', "sia113", 25],
		['1x2x3 Block', "sia123", 25],
		['2x2x2 Block', "sia222", 25]
	]],
	['Square-2', [
		[' ', "sq2", 20]
	]],
	['Super Floppy', [
		[' ', "sfl", 25]
	]],
	['Super Square-1', [
		['Drehmetrik', "ssq1t", 20]
	]],
	['UFO', [
		['Jaap Stil', "ufo", 25]
	]],
	['Andere', [
		['FTO (Face-Turning Octahedron)', "fto", 25]
	]],
	['===Spezial===', [
		['--', "blank", 0]
	]],
	['3x3x3 Teilmengen', [
		['2-generator R,U', "2gen", 25],
		['2-generator L,U', "2genl", 25],
		['Roux-generator M,U', "roux", 25],
		['3-generator F,R,U', "3gen_F", 25],
		['3-generator R,U,L', "3gen_L", 25],
		['3-generator R,r,U', "RrU", 25],
		['nur 180°-Drehungen', "half", 25],
		['letzter Slot + letzte Schicht (alt)', "lsll", 15]
	]],
	['Bandagierter Cube', [
		['Bicube', "bic", 30],
		['Square-1 /,(1,0)', "bsq", 25]
	]],
	['Megaminx Teilmengen', [
		['2-generator R,U', "minx2g", 30],
		['letzer Slot + letzte Schicht', "mlsll", 20]
	]],
	['Staffeln', [
		['viele 3x3x3', "r3", 5],
		['234 Staffel', "r234", 0],
		['2345 Staffel', "r2345", 0],
		['23456 Staffel', "r23456", 0],
		['234567 Staffel', "r234567", 0]
	]],
	['===Witze===', [
		['--', "blank", 0]
	]],
	['1x1x1', [
		['x y z', "111", 25]
	]],
	['-1x-1x-1', [
		[' ', "-1", 25]
	]],
	['1x1x2', [
		[' ', "112", 25]
	]],
	['LOL', [
		[' ', "lol", 25]
	]],
	['Derrick Eide', [
		[' ', "eide", 25]
	]]
];
var SCRAMBLE_NOOBST = [
	['turn the top face', 'turn the bottom face'],
	['turn the right face', 'turn the left face'],
	['turn the front face', 'turn the back face']
];
var SCRAMBLE_NOOBSS = ' clockwise by 90 degrees,| counterclockwise by 90 degrees,| by 180 degrees,';
var STATS_CFM_RESET = 'reset all times in this session?';
var STATS_CFM_DELSS = 'delete session [%s]?';
var STATS_CFM_DELMUL = 'The Number Of Deleted Values From Current Index?';
var STATS_CFM_DELETE = 'delete this time?';
var STATS_COMMENT = 'Comment';
var STATS_DATE = 'Date';
var STATS_CURROUND = 'Current Round Statistics';
var STATS_CURSESSION = 'Current Session Statistics';
var STATS_CURSPLIT = 'Phase %d of Current Session Statistics';
var STATS_EXPORTCSV = 'Export CSV';
var STATS_SSMGR_TITLE = 'Session Manager';
var STATS_SSMGR_NAME = 'Name';
var STATS_SSMGR_DETAIL = 'Session Details';
var STATS_SSMGR_OPS = 'Rename|Create|Split|Merge|Delete';
var STATS_SSMGR_ORDER = 'Order by scramble';
var STATS_SSMGR_ODCFM = 'Sort all sessions by scramble?';
var STATS_ALERTMG = 'Merge all times in session [%f] to the end of session [%t]?';
var STATS_PROMPTSPL = 'Number of latest times split from session [%s]?';
var STATS_ALERTSPL = 'Should split or leave 1 time at least';
var STATS_AVG = 'mean';
var STATS_SOLVE = 'solve';
var STATS_TIME = 'time';
var STATS_SESSION = 'Session';
var STATS_SESSION_NAME = 'Edit session name';
var STATS_SESSION_NAMEC = 'Name of the new session';
var STATS_STRING = 'best|current|worst|Generated By csTimer on %Y-%M-%D|solves/total: %d|single|mean of %mk|avg of %mk|Average: %v{ (σ = %sgm)}|Mean: %v|Time List:|solving from %s to %e|Totally spent: %d';
var STATS_PREC = 'time distribution precision';
var STATS_PREC_STR = 'auto|0.1s|0.2s|0.5s|1s|2s|5s|10s|20s|50s|100s';
var STATS_TYPELEN = 'list %d type|list %d length|average|mean';
var STATS_STATCLR = 'Enable session emptying';
var STATS_ABSIDX = 'Show absolute index in statistics report';
var PROPERTY_PRINTSCR = 'print scramble(s) in statistics';
var PROPERTY_PRINTDATE = 'print solving date in statistics';
var PROPERTY_SUMMARY = 'show summary before time list';
var PROPERTY_IMRENAME = 'rename session immediately after creation';
var PROPERTY_SCR2SS = 'create new session when switching scramble type';
var PROPERTY_SS2SCR = 'restore scramble type when switching session';
var PROPERTY_SS2PHASES = 'restore multi-phase timing when switching session';
var PROPERTY_STATINV = 'Inverse time list';
var PROPERTY_STATAL = 'Statistical indicators';
var PROPERTY_DELMUL = 'Mehrfach-Löschung aktivieren';
var MODULE_NAMES = {
	"kernel": 'global',
	"ui": 'Anzeige',
	"color": 'Farbe',
	"timer": 'Stoppuhr',
	"scramble": 'Scramble',
	"stats": 'Statistiken',
	"tools": 'Werkzeuge',
	"vrc": 'virtueller<br>Giiker'
};
var BGIMAGE_URL = 'Bitte Bild-URL eingeben';
var BGIMAGE_INVALID = 'Ungültige URL';
var BGIMAGE_OPACITY = 'Deckkraft des Hintergrundbilds';
var BGIMAGE_IMAGE = 'Hintergrundbild';
var BGIMAGE_IMAGE_STR = 'keine|manuell|CCT';
var SHOW_AVG_LABEL = 'Show Avg Label';
var USE_LOGOHINT = 'Hint messages in logo';
var TOOLS_SCRGEN = 'ScrambleGenerator';
var SCRGEN_NSCR = 'Number of scrambles';
var SCRGEN_PRE = 'prefix';
var SCRGEN_GEN = 'Generate Scrambles!';
