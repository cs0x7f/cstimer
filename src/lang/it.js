var OK_LANG = 'OK';
var CANCEL_LANG = 'Annulla';
var RESET_LANG = 'Azzera';
var ABOUT_LANG = 'About';
var ZOOM_LANG = 'Zoom';
var BUTTON_TIME_LIST = 'LISTA<br>TEMPI';
var BUTTON_OPTIONS = 'OPZIONI';
var BUTTON_EXPORT = 'EXPORT';
var BUTTON_DONATE = 'DONATE';
var PROPERTY_USEINS = 'Usa ispezione (WCA)';
var PROPERTY_VOICEINS = 'voice alert of WCA inspection: ';
var PROPERTY_VOICEINS_STR = 'none|male voice|female voice';
var PROPERTY_USECFM = 'Conferma tempo(ok/+2/dnf)';
var PROPERTY_PHASES = 'Multi-fase: ';
var PROPERTY_TIMERSIZE = 'Dimensione cronometro: ';
var CFMDIV_CURTIME = 'Il tempo e\': ';
var PROPERTY_USEMILLI = 'Usa millisecondi';
var PROPERTY_SMALLADP = 'Usa font piccolo dopo il punto decimale';
var PROPERTY_SCRSIZE = 'Lunghezza scramble: ';
var PROPERTY_SCRMONO = 'Scramble con singolo spazio';
var PROPERTY_SCRLIM = 'Limita l\'altezza dell\'area di scramble';
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
var BUTTON_TOOLS = 'STRU-<br>MENTI';
var CROSS_UNAVAILABLE = 'Non disponibile per questo tipo di scramble';
var EOLINE_UNAVAILABLE = 'Non disponibile per questo tipo di scramble';
var IMAGE_UNAVAILABLE = 'Non disponibile per questo tipo di scramble';
var TOOLS_SELECTFUNC = 'Funzione: ';
var TOOLS_CROSS = 'Risoluzione croce';
var TOOLS_EOLINE = 'Risoluzione EOLine';
var TOOLS_IMAGE = 'Disegna scramble';
var TOOLS_STATS = 'Statistiche';
var TOOLS_DISTRIBUTION = 'Distribuzione temporale';
var TOOLS_TREND = 'time trend';
var PROPERTY_IMGSIZE = 'Dimensione della visualizzazione dello scramble: ';
var TIMER_INSPECT = 'Ispezione	';
var TIMER_SOLVE = 'Risoluzione';
var PROPERTY_USEMOUSE = 'use mouse timer';
var PROPERTY_TIMEU = 'L\'aggiornamento del cronometro e\': ';
var PROPERTY_TIMEU_STR = 'Aggiorna|0.1s|secondi|inspezione|none';
var PROPERTY_PRETIME = 'Tempo di attesa dopo la pressione del tasto spazio (secondo(i)): ';
var PROPERTY_ENTERING = 'Inizia a cronometrare in';
var PROPERTY_ENTERING_STR = 'cronometro|digita|stackmat|virtuale';
var PROPERTY_COLOR = 'Seleziona tema colori: ';
var PROPERTY_COLORS = 'colore del testo: |coloro dello sfondo: |board color: |colore bottoni: |colore links: |colore del Logo: |colore di sfondo del Logo: ';
var PROPERTY_VIEW = 'UI style is:';
var PROPERTY_VIEW_STR = 'Auto|Mobile|Desktop';
var COLOR_EXPORT = 'Please save the string for import: ';
var COLOR_IMPORT = 'Please input the string exported: ';
var COLOR_FAIL = 'Incorrect Data, Import Failed';
var PROPERTY_FONTCOLOR_STR = 'nero|bianco';
var PROPERTY_COLOR_STR = 'casuale|stile1|stile2|stile3|nero|bianco|stile6|manuale|export...|import...';
var PROPERTY_FONT = 'Seleziona il carattere del cronometro: ';
var PROPERTY_FONT_STR = 'digitale casuale|normale|digitale1|digitale2|digitale3|digitale4|digitale5';
var PROPERTY_FORMAT = 'Formato tempo: '
var PROPERTY_USEKSC = 'Usa abbreviazioni da tastiea';
var PROPERTY_NTOOLS = 'Numero di strumenti';
var PROPERTY_AHIDE = 'Hide All Elements When Timing';
var SCRAMBLE_LAST = 'Ultimo';
var SCRAMBLE_NEXT = 'Prossimo';
var SCRAMBLE_SCRAMBLE = ' scramble';
var SCRAMBLE_LENGTH = 'Lunghezza';
var SCRAMBLE_INPUT = 'Inserisci Scramble';
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
	['Input', [
		['外部', "input", 0]
	]],
	['===WCA===', [
		['--', "blank", 0]
	]],
	['2x2x2', [
		["WCA", "222so", 0],
		['optimal random state', "222o", 0],
		['3-gen', "2223", 25],
		['EG', "222eg", 0],
		['EG0', "222eg0", 0],
		['EG1', "222eg1", 0],
		['EG2', "222eg2", 0]
	]],
	['3x3x3', [
		["WCA", "333", 0],
		['old style', "333o", 25],
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
		['random state', "444o", 0],
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
	['ruota la faccia in alto', 'ruota la faccia in basso'],
	['ruota la faccia a destra', 'ruota la faccia a sinistra'],
	['ruota la faccia frontale', 'ruota la faccia posteriore']
];
var SCRAMBLE_NOOBSS = ' ruota orario 90 gradi,| ruota antiorario 90 gradi,| ruota 180 gradi,';
var STATS_CFM_RESET = 'Azzera tutti i tempi in questa sessione?';
var STATS_CFM_DELSS = 'delete this session?';
var STATS_CFM_DELMUL = 'The Number Of Deleted Values From Current Index?';
var STATS_CFM_DELETE = 'Camcella questo tempo?';
var STATS_COMMENT = 'Commento:';
var STATS_CURROUND = 'Statistiche del Turno Corrente';
var STATS_CURSESSION = 'Statistiche della Sessione Corrente';
var STATS_AVG = 'media';
var STATS_SOLVE = 'risoluzione';
var STATS_TIME = 'tempo';
var STATS_SESSION = 'Sessione';
var STATS_SESSION_NAME = 'Session Name';
var STATS_STRING = 'migliore|corrente|peggiore|Generato Da csTimer il %Y-%M-%D|risoluzioni/totale: %d|singolo|media di %mk|avg su %mk|Avg   : %v{ (σ = %sgm)}|Media : %v|Lista Tempi:';
var STATS_PREC = 'Precisione distribuzione temporale: ';
var STATS_PREC_STR = 'auto|0.1s|0.2s|0.5s|1s|2s|5s|10s|20s|50s|100s';
var STATS_TYPELEN = 'list %d type|list %d length|average|mean';
var PROPERTY_PRINTSCR = 'Stampa scramble(s) con le statistiche';
var PROPERTY_SUMMARY = 'show summary before time list';
var PROPERTY_IMRENAME = 'rename session immediately after creation';
var PROPERTY_SCR2SS = 'create new session when switching scramble type';
var PROPERTY_SS2SCR = 'restore scramble type when switching session';
var PROPERTY_DELMUL = 'Enable Multiple Deletion';
var MODULE_NAMES = {
	"ui": 'schermo',
	"color": 'colori',
	"timer": 'cronometro',
	"kernel": 'globale',
	"scramble": 'scramble',
	"stats": 'statistiche',
	"tools": 'strumenti'
};
var BGIMAGE_URL = 'Inserire url dell\'immagine';
var BGIMAGE_INVALID = 'URL non valida';
var BGIMAGE_OPACITY = 'Opacità immagine di sfondo: ';
var BGIMAGE_IMAGE = 'Immagine di sfondo: ';
var BGIMAGE_IMAGE_STR = 'nessuna|manuale|CCT';
var SHOW_AVG_LABEL = 'Mostra svg sotto al cronometro';
var TOOLS_SCRGEN = 'Generatore di scramble';
var SCRGEN_NSCR = 'Numbero di scrambles: ';
var SCRGEN_PRE = 'Prefisso: ';
var SCRGEN_GEN = 'Genera Scrambles!';