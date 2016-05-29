var OK_LANG = 'OK';
var CANCEL_LANG = 'Annuleren';
var RESET_LANG = 'Reset';
var ABOUT_LANG = 'Over';
var ZOOM_LANG = 'Zoom';
var BUTTON_TIME_LIST = 'Lijst<br>Tijden';
var BUTTON_OPTIONS = 'Opties';
var BUTTON_EXPORT = 'EXPORT';
var BUTTON_BLOG = 'BLOG';
var PROPERTY_USEINS = 'Gebruik WCA inspectie';
var PROPERTY_VOICEINS = 'voice alert of WCA inspection: ';
var PROPERTY_VOICEINS_STR = 'none|male voice|female voice';
var PROPERTY_USECFM = 'Bevestig tijd(OK/+2/DNF)';
var PROPERTY_PHASES = 'Meerfasig: ';
var PROPERTY_TIMERSIZE = 'Grootte timer: ';
var CFMDIV_CURTIME = 'De tijd is: ';
var PROPERTY_USEMILLI = 'Gebruik milliseconden';
var PROPERTY_SMALLADP = 'Gebruik klein lettertype na de komma';
var PROPERTY_SCRSIZE = 'Grootte scramble: ';
var PROPERTY_SCRMONO = 'Monospace scramble';
var PROPERTY_SCRLIM = 'Limiteer de hoogte van scramble vlak';
var PROPERTY_SCRALIGN = 'Alignment of scramble area: ';
var PROPERTY_SCRALIGN_STR = 'center|left|right';
var EXPORT_DATAEXPORT = 'Data Import/Export';
var EXPORT_TOFILE = 'Export to file';
var EXPORT_FROMFILE = 'Import from file';
var EXPORT_TOSERV = 'Export to server';
var EXPORT_FROMSERV = 'Import from server';
var EXPORT_USERID = 'Please input your account (only alphabet or number): ';
var EXPORT_INVID = 'Only alphabet or number is allowed!';
var EXPORT_ERROR = 'Some errors occurred...';
var EXPORT_NODATA = 'No data found for your account';
var EXPORT_UPLOADED = 'Uploaded successfully';
var BUTTON_SCRAMBLE = 'SCRA-<br>MBLE';
var BUTTON_TOOLS = 'Hulpmi-<br>ddelen';
var CROSS_UNAVAILABLE = 'Niet beschikbaar voor dit type scramble';
var EOLINE_UNAVAILABLE = 'Niet beschikbaar voor dit type scramble';
var IMAGE_UNAVAILABLE = 'Niet beschikbaar voor dit type scramble';
var TOOLS_SELECTFUNC = 'Functie: ';
var TOOLS_CROSS = 'Los kruis op';
var TOOLS_EOLINE = 'Los EOLine op';
var TOOLS_IMAGE = 'Teken scramble';
var TOOLS_STATS = 'Statistiek';
var TOOLS_DISTRIBUTION = 'Verdeling tijden';
var TOOLS_TREND = 'time trend';
var PROPERTY_IMGSIZE = 'Tekstgrootte scramble: ';
var TIMER_INSPECT = 'Inspectie';
var TIMER_SOLVE = 'Oplossen';
var PROPERTY_USEMOUSE = 'use mouse timer';
var PROPERTY_TIMEU = 'Timer update is: ';
var PROPERTY_TIMEU_STR = 'update|0.1s|seconden|inspectie|geen';
var PROPERTY_PRETIME = 'Spatiebalk ingedrukt houden voor (seconde(n)): ';
var PROPERTY_ENTERING = 'Tijden meten met';
var PROPERTY_ENTERING_STR = 'timer|typen|stackmat|virtueel';
var PROPERTY_COLOR = 'Selecteer kleurenthema: ';
var PROPERTY_COLORS = 'Lettertype kleur: |Kleur achtergrond: |Board kleur: |Kleur knop: |Kleur link: |Kleur logo: |Logo bgkleur: ';
var PROPERTY_FONTCOLOR_STR = 'Zwart|Wit';
var PROPERTY_COLOR_STR = 'Willekeurig|Stijl1|Stijl2|Stijl3|Zwart|Wit|Stijl6|Handmatig';
var PROPERTY_FONT = 'Selecteer lettertype timer: ';
var PROPERTY_FONT_STR = 'Willekeurig digitaal|Normaal|Digitaal1|Digitaal2|Digitaal3|Digitaal4|Digitaal5';
var PROPERTY_FORMAT = 'Tijdsindeling: '
var PROPERTY_USEKSC = 'Gebruik sneltoetsen';
var PROPERTY_NTOOLS = 'Aantal hulpmiddelen';
var PROPERTY_AHIDE = 'Hide All Elements When Timing';
var SCRAMBLE_LAST = 'Laatste';
var SCRAMBLE_NEXT = 'Volgende';
var SCRAMBLE_SCRAMBLE = ' Scramble';
var SCRAMBLE_LENGTH = 'Lengte';
var SCRAMBLE_INPUT = 'Scramble(s) invoeren';
var scrdata = [
	['WCA', [
		['3x3x3', "333", 0],
		['4x4x4', "444wca", -40],
		['5x5x5', "555wca", -60],
		['2x2x2', "222so", 0],
		['3x3 bld', "333ni", 0],
		['3x3 oh', "333oh", 0],
		['3x3 fm', "333fm", 0],
		['3x3 ft', "333ft", 0],
		['megaminx', "mgmp", -70],
		['pyraminx', "pyrso", -10],
		['sq1', "sqrs", 0],
		['clock', "clko", 0],
		['skewb', "skbso", 0],
		['6x6x6', "666wca", -80],
		['7x7x7', "777wca", -100],
		['4x4 bld', "444bld", -40],
		['5x5 bld', "555bld", -60],
		['3x3 mbld', "r3", 5]
	]],
	['Invoer', [
		['??', "input", 0]
	]],
	['===WCA===', [
		['--', "blank", 0]
	]],
	['2x2x2', [
		["WCA", "222so", 0],
		['Optimale willekeurige staat', "222o", 0],
		['3-gen', "2223", 25],
		['EG', "222eg", 0],
		['EG0', "222eg0", 0],
		['EG1', "222eg1", 0],
		['EG2', "222eg2", 0]
	]],
	['3x3x3', [
		["WCA", "333", 0],
		['Oude methode', "333o", 25],
		['3x3x3 voor beginners', "333noob", 25],
		['Alleen randen', "edges", 0],
		['Alleen hoeken', "corners", 0],
		['Laatste laag', "ll", 0],
		['zb laatste laag', "zbll", 0],
		['Hoeken laatste laag', "cll", 0],
		['Randen laatste laag', "ell", 0],
		['Laatste zes randen', "lse", 0],
		['Laatste zes randen&ltM,U&gt', "lsemu", 0],
		['Roux L10P', "cmll", 0],
		['Kruis opgelost', "f2l", 0],
		['Laatste slot + laatste laag', "lsll2", 0],
		['2GLL', "2gll", 0],
		['ZBLS', "zbls", 0],
		['ZZLL', "zzll", 0],
		['PLL', "pll", 0],
		['Makkelijk kruis', 'easyc', 3]
	]],
	['4x4x4', [
		["WCA", "444wca", 40],
		['SiGN', "444", 40],
		['Willekeurige staat', "444o", 0],
		['YJ', "444yj", 40],
		['4x4x4 randen', "4edge", 8],
		['R,r,U,u', "RrUu", 40]
	]],
	['5x5x5', [
		["WCA", "555wca", 60],
		['SiGN', "555", 60],
		['5x5x5 randen', "5edge", 8]
	]],
	['6x6x6', [
		["WCA", "666wca", 80],
		['SiGN', "666si", 80],
		['prefix', "666p", 80],
		['suffix', "666s", 80],
		['6x6x6 randen', "6edge", 8]
	]],
	['7x7x7', [
		["WCA", "777wca", 100],
		['SiGN', "777si", 100],
		['prefix', "777p", 100],
		['suffix', "777s", 100],
		['7x7x7 randen', "7edge", 8]
	]],
	['Clock', [
		['jaap', "clk", 0],
		['wca', "clkwca", 0],
		['concise', "clkc", 0],
		['Efficiencte knop orde', "clke", 0]
	]],
	['Megaminx', [
		["WCA", "mgmp", 70],
		['Carrot', "mgmc", 70],
		['Oude methode', "mgmo", 70]
	]],
	['Pyraminx', [
		["WCA", "pyrso", 10],
		['Optimale willekeurige staat', "pyro", 0],
		['Willekeurige  zetten', "pyrm", 25]
	]],
	['Square-1', [
		["WCA", "sqrs", 0],
		['face draait metrisch', "sq1h", 40],
		['twist metrisch', "sq1t", 20]
	]],
	['Skewb', [
		["WCA", "skbso", 0],
		['U L R B', "skb", 25]
	]],
	['===OVERIGE===', [
		['--', "blank", 0]
	]],
	['15 puzzle', [
		['Zetten', "15p", 80],
		['Blanko zetten', "15pm", 80]
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
		['Willekeurige staat', "gearso", 0],
		['Optimale willekeurige stat', "gearo", 0],
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
	['Pyraminx Crystal', [
		['Pochmann', "prcp", 70],
		['old style', "prco", 70]
	]],
	['Siamese Cube', [
		['1x1x3 block', "sia113", 25],
		['1x2x3 block', "sia123", 25],
		['2x2x2 block', "sia222", 25]
	]],
	['Square-2', [
		[' ', "sq2", 20]
	]],
	['Super Floppy', [
		[' ', "sfl", 25]
	]],
	['Super Square-1', [
		['twist metric', "ssq1t", 20]
	]],
	['UFO', [
		['Jaap style', "ufo", 25]
	]],
	['Other', [
		['FTO (Face-Turning Octahedron)', "fto", 25]
	]],
	['===SPECIAAL===', [
		['--', "blank", 0]
	]],
	['3x3x3 subsets', [
		['2-generator R,U', "2gen", 25],
		['2-generator L,U', "2genl", 25],
		['Roux-generator M,U', "roux", 25],
		['3-generator F,R,U', "3gen_F", 25],
		['3-generator R,U,L', "3gen_L", 25],
		['3-generator R,r,U', "RrU", 25],
		['Alleen halve draaien', "half", 25],
		['last slot + last layer (old)', "lsll", 15]
	]],
	['Bandaged Cube', [
		['Bicube', "bic", 30],
		['Square-1 /,(1,0)', "bsq", 25]
	]],
	['Megaminx subsets', [
		['2-generator R,U', "minx2g", 30],
		['last slot + last layer', "mlsll", 20]
	]],
	['Relays', [
		['lots of 3x3x3s', "r3", 5],
		['234 relay', "r234", 0],
		['2345 relay', "r2345", 0],
		['23456 relay', "r23456", 0],
		['234567 relay', "r234567", 0]
	]],
	['===GRAPPEN===', [
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
	['Draai de bovenkant', 'Draai de onderkant'],
	['Draai de rechterkant', 'Draai de onderkant'],
	['Draai de voorkant', 'Draai de achterkant']
];
var SCRAMBLE_NOOBSS = ' 90 graden met de klok mee,| 90 graden tegen de klok in,| 180 graden,';
var STATS_CFM_RESET = 'Reset alle tijden van deze sessie?';
var STATS_CFM_DELSS = 'delete this session?';
var STATS_CFM_DELMUL = 'The Number Of Deleted Values From Current Index?';
var STATS_CFM_DELETE = 'Deze tijd verwijderen?';
var STATS_COMMENT = 'Opmerking:';
var STATS_CURROUND = 'Gegevens actuele ronde';
var STATS_CURSESSION = 'Gegevens actuele sessie';
var STATS_AVG = 'Gemiddelde';
var STATS_SOLVE = 'Opgelost';
var STATS_TIME = 'Tijd';
var STATS_SESSION = 'Sessie';
var STATS_SESSION_NAME = 'Session Name';
var STATS_STRING = 'Beste|Actuele|Slechtste|Gegenereerd door csTimer op %Y-%M-%D|solves/totaal: %d|enkele|mean van %mk|avg of %mk|Gemiddelde: %v{ (s = %sgm)}|Mean: %v|Lijst met tijden:';
var STATS_PREC = 'precisie tijdsverdeling: ';
var STATS_PREC_STR = 'auto|0.1s|0.2s|0.5s|1s|2s|5s|10s|20s|50s|100s';
var STATS_TYPELEN = 'list %d type|list %d length|average|mean';
var PROPERTY_PRINTSCR = 'print scramble(s) in statistieken';
var PROPERTY_SUMMARY = 'show summary before time list';
var PROPERTY_IMRENAME = 'rename session immediately after creation';
var PROPERTY_SCR2SS = 'create new session when switching scramble type';
var PROPERTY_SS2SCR = 'restore scramble type when switching session';
var PROPERTY_DELMUL = 'Enable Multiple Deletion';
var MODULE_NAMES = {
	"ui": 'display',
	"color": 'Kleur',
	"timer": 'Timer',
	"kernel": 'Global',
	"scramble": 'scramble',
	"stats": 'Statistiek',
	"tools": 'Hulpmiddelen'
};
var BGIMAGE_URL = 'Voer URL in';
var BGIMAGE_INVALID = 'Ongeldige URL';
var BGIMAGE_OPACITY = 'Doorschijnheid achtergrondafbeelding: ';
var BGIMAGE_IMAGE = 'Achtergrondafbeelding: ';
var BGIMAGE_IMAGE_STR = 'GeenAutomatischl|CCT';
var SHOW_AVG_LABEL = 'Toon gemiddelde';
var TOOLS_SCRGEN = 'ScrambleGenerator';
var SCRGEN_NSCR = 'Aantal scrambles: ';
var SCRGEN_PRE = 'prefix: ';
var SCRGEN_GEN = 'Genereer scrambles!';