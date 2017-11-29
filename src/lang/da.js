var OK_LANG = 'OK';
var CANCEL_LANG = 'Fortryd';
var RESET_LANG = 'Nulstil';
var ABOUT_LANG = 'Omkring';
var ZOOM_LANG = 'Zoom';
var BUTTON_TIME_LIST = 'List tider'
var BUTTON_OPTIONS = 'Indstillinger';
var BUTTON_EXPORT = 'Upload';
var BUTTON_DONATE = 'Doner';
var PROPERTY_USEINS = 'brug WCA inspektion';
var PROPERTY_VOICEINS = 'stemme advarsel af WCA inspektion';
var PROPERTY_VOICEINS_STR = 'ingen|mandlig stemme|kvindelig stemme';
var PROPERTY_USECFM = 'bekræft tid(ok/+2/bif)';
var PROPERTY_PHASES = 'multi-fase: ';
var PROPERTY_TIMERSIZE = 'timer størrelse: ';
var CFMDIV_CURTIME = 'tiden er: ';
var PROPERTY_USEMILLI = 'brug millisekunder';
var PROPERTY_SMALLAPD = 'brug lille font efter decimal punkt';
var PROPERTY_SCRSIZE = 'blanding størrelse';
var PROPERTY_SCRMONO = 'monospaced blanding';
var PROPERTY_SCRLIM = 'Begræns højden af blandings området';
var PROPERTY_SCRALIGN = 'Justering af blandings området';
var PROPERTY_SCRALIGN_STR = 'centrum|venstre|højre';
var EXPORT_DATAEXPORT = 'Data Import/Export';
var EXPORT_TOFILE = 'Export til fil';
var EXPORT_FROMFILE = 'Import til fil';
var EXPORT_TOSERV = 'Export til server';
var EXPORT_FROMSERV = 'Import fra server';
var EXPORT_USERID = 'Vær venlig og sæt din konto ind (kun alfabetisk eller nummere) ';
var EXPORT_INVID = 'Kun alfabetiks eller nummere er tilladt!';
var EXPORT_ERROR = 'Nogle fejl opstod...';
var EXPORT_NODATA = 'Ingen data fundet på din konto';
var EXPORT_UPLOADED = 'Upload fuldført';
var BUTTON_SCRAMBLE = 'Blanding';
var BUTTON_TOOLS = 'Værktøj';
var CROSS_UNAVAILABLE = 'Utilgængelig for denne blandings type';
var EOLINE_UNAVAILABLE = 'Utilgængelig for denne blandings type';
var IMAGE_UNAVAILABLE = 'Utilgængelig for denne blandings type';
var TOOLS_SELECTFUNC = 'Funktion';
var TOOLS_CROSS = 'løs kryds';
var TOOLS_EOLINE = 'løs EOLine';
var TOOLS_IMAGE = 'tegn blanding';
var TOOLS_STATS = 'Statistiker';
var TOOLS_DISTRIBUTION = 'Tidsfordeling';
var TOOLS_TREND = 'Tidsudvikling';
var PROPERTY_IMGSIZE = 'Blandings billed størrelse';
var TIMER_INSPECT = 'Inspektion';
var TIMER_SOLVE = 'Løs';
var PROPERTY_USEMOUSE = 'Brug musetimer';
var PROPERTY_TIMEU = 'Timer opdatering er: ';
var PROPERTY_TIMEU_STR = 'Opdatering|0.1s|sekunder|inspektion|ingen';
var PROPERTY_PRETIME = 'Tid at holde mellemrumsknappen inde(sekunder(s)): ';
var PROPERTY_ENTERING = 'Put tid ind med ';
var PROPERTY_ENTERING_STR = 'timer|skrive|stackmat|virtuel';
var PROPERTY_COLOR = 'vælg farve tema: ';
var PROPERTY_COLORS = 'font farve: |baggrunds farve: |bord farve: |knappe farve: |link farve: | Logo farve: | Logo baggrundsfarve: ';
var PROPERTY_VIEW = 'UI stil er: ';
var PROPERTY_VIEW_STR = 'Automatisk|Mobil|Skrivebord';
var COLOR_EXPORT = 'Vær venlig og gem stringen for import';
var COLOR_IMPORT = 'Vær venlig og input stringen exported';
var COLOR_FAIL = 'Inkorrekt Date, Import fejlede';
var PROPERTY_FONTCOLOR_STR = 'Sort|Hvid';
var PROPERTY_COLOR_STR = 'Tilfældig|stil1|stil2|stil3|sort|hvid|stil6|manual|export...|import...';
var PROPERTY_FONT = 'Vælg timerens font: ';
var PROPERTY_FONT_STR = 'Tilfældig digital|normal|digital1|digital2|digital3|digital4|digital5';
var PROPERTY_FORMAT = 'tids format: ';
var PROPERTY_USEKSC = 'brug tastatur genvej';
var PROPERTY_NTOOLS = 'nummer af værktøj';
var PROPERTY_AHIDE = 'Gem alle elementer når du tager tid';
var SCRAMBLE_LAST = 'sidste';
var SCRAMBLE_NEXT = 'næste';
var SCRAMBLE_SCRAMBLE = 'blanding';
var SCRAMBLE_LENGTH = 'længde';
var SCRAMBLE_INPUT = 'input blanding(er)';
var scrdata = [
	['WCA', [
		['3x3x3', "333", 0],
		['4x4x4', "444wca", -40],
		['5x5x5', "555wca", -60],
		['2x2x2', "222so", 0],
		['3x3 bld', "333ni", 0],
		['3x3 eh', "333oh", 0],
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
		['3x3 mbld', "r3ni", 5]
	]],
	['Input', [
		['Extern', "input", 0]
	]],
	['===WCA===', [
		['--', "blank", 0]
	]],
	['2x2x2', [
		["WCA", "222so", 0],
		['optimal tilfældig stil', "222o", 0],
		['3-gen', "2223", 25],
		['EG', "222eg", 0],
		['EG0', "222eg0", 0],
		['EG1', "222eg1", 0],
		['EG2', "222eg2", 0]
	]],
	['3x3x3', [
		["WCA", "333", 0],
		['gammel stil', "333o", 25],
		['3x3x3 for noobs', "333noob", 25],
		['edges only', "edges", 0],
		['corners only', "corners", 0],
		['last layer', "ll", 0],
		['zb last layer', "zbll", 0],
		['corners of last layer', "cll", 0],
		['edges of last layer', "ell", 0],
		['last six edges', "lse", 0],
		['last six edges&ltM,U&gt', "lsemu", 0],
		['Roux L10P', "cmll", 0],
		['cross solved', "f2l", 0],
		['last slot + last layer', "lsll2", 0],
		['2GLL', "2gll", 0],
		['ZBLS', "zbls", 0],
		['ZZLL', "zzll", 0],
		['PLL', "pll", 0],
		['EOLine', "eoline", 0],
		['easy cross', 'easyc', 3]
	]],
	['4x4x4', [
		["WCA", "444wca", 40],
		['SiGN', "444", 40],
		['tilfældig stat', "444o", 0],
		['YJ', "444yj", 40],
		['4x4x4 edges', "4edge", 8],
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
		['concise', "clkc", 0],
		['efficient pin order', "clke", 0]
	]],
	['Megaminx', [
		["WCA", "mgmp", 70],
		['Gulerod', "mgmc", 70],
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
	['===SPECIAL===', [
		['--', "blank", 0]
	]],
	['3x3x3 subsets', [
		['2-generator R,U', "2gen", 25],
		['2-generator L,U', "2genl", 25],
		['Roux-generator M,U', "roux", 25],
		['3-generator F,R,U', "3gen_F", 25],
		['3-generator R,U,L', "3gen_L", 25],
		['3-generator R,r,U', "RrU", 25],
		['half turns only', "half", 25],
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
	['===JOKES===', [
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
	['vend top siden', ' vend bund siden'],
	['vend højre side', 'vend venstre side'],
	['vend front siden', 'vend bagsiden']
];
var SCRAMBLE_NOOBSS = 'med uret af 90 grader,| mod uret af 90 grader,| af 180 degrees,';
var STATS_CFM_RESET = 'Nulstil alle tider i denne session??';
var STATS_CFM_DELSS = 'Slet denne session?';
var STATS_CFM_DELMUL = 'Antallet af slettede værdier fra nuværende indeks?';
var STATS_CFM_DELETE = 'Slet denne tid?';
var STATS_COMMENT = 'Kommenter:';
var STATS_CURROUND = 'Nuværrende runde statistikker';
var STATS_CURSESSION = 'Nuværende session statistikker';
var STATS_AVG = 'Mean';
var STATS_SOLVE = 'Løs';
var STATS_TIME = 'Tid';
var STATS_SESSION = 'Session';
var STATS_SESSION_NAME = 'Session navn';
var STATS_STRING = 'bedste|nuværrende|værste|Genereret af csTimer på %Y-%M-%D|løsninger/total: %d|single|mean af %mk| gns af %mk|Gennemsnit: %v{ (s = %sgm)}|Mean: %v|Tid Liste:';
var STATS_PREC = 'tidsfordeling præcision: ';
var STATS_PREC_STR = 'auto|0.1s|0.2s|0.5s|1s|2s|5s|10s|20s|50s|100s';
var STATS_TYPELEN = 'liste %d type|liste %d længde|gennemsnit|mean';
var PROPERTY_PRINTSCR = 'print blanding(erne) i statistikker';
var PROPERTY_SUMMARY = 'vis sammendrag inden tidslisten';
var PROPERTY_IMRENAME = 'omdøb session umiddelbart efter oprettelsen';
var PROPERTY_SCR2SS = 'Opret ny session, når du skifter blandings type';
var PROPERTY_SS2SCR = 'Gendan blandingstype, når du skifter session';
var PROPERTY_STATAL = 'Statistiske indikatorer: ';
var PROPERTY_DELMUL = 'Tillad flere sletninger ';
var MODULE_NAMES = {
	"ui": 'skærm',
	"color": 'farve',
	"timer": 'timer',
	"kernel": 'global',
	"scramble": 'blanding',
	"stats": 'statistik',
	"tools": 'værktøj'
};
var BGIMAGE_URL = 'Vør venlig og sæt billedets url';
var BGIMAGE_INVALID = 'ugyldig url';
var BGIMAGE_OPACITY = 'baggrunds billede gennemsigtigheds: ';
var BGIMAGE_IMAGE = 'baggrunds billede: ';
var BGIMAGE_IMAGE_STR = 'ingen|manual|CCT';
var SHOW_AVG_LABEL = 'Vis Gns Etiket';
var TOOLS_SCRGEN = 'BlandingsGenerator';
var SCRGEN_NSCR = 'Nummere af blandinger: ';
var SCRGEN_PRE = 'præfiks: ';
var SCRGEN_GEN = 'Frembringe Blandinger!';