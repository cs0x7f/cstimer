var OK_LANG = 'OK';
var CANCEL_LANG = 'Cancelar';
var RESET_LANG = 'Resetear';
var ABOUT_LANG = 'Acerca de';
var ZOOM_LANG = 'Zoom';
var BUTTON_TIME_LIST = 'LISTA DE<br>TIEMPOS';
var BUTTON_OPTIONS = 'OPCIO-<br>NES';
var BUTTON_EXPORT = 'EXPORT';
var BUTTON_DONATE = 'DONATE';
var PROPERTY_USEINS = 'Usar inspección de WCA';
var PROPERTY_VOICEINS = 'voice alert of WCA inspection: ';
var PROPERTY_VOICEINS_STR = 'none|male voice|female voice';
var PROPERTY_PHASES = 'Multi-fase: ';
var PROPERTY_TIMERSIZE = 'Tamaño del cronómetro: ';
var PROPERTY_USEMILLI = 'Usar milisegundos';
var PROPERTY_SMALLADP = 'use small font after decimal point';
var PROPERTY_SCRSIZE = 'Tamaño de la mezcla: ';
var PROPERTY_SCRMONO = 'Mezcla monoespaciada';
var PROPERTY_SCRLIM = 'Limitar la altura de la zona de mezcla';
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
var BUTTON_SCRAMBLE = 'MEZCLA';
var BUTTON_TOOLS = 'HERRA-<br>MIENTAS';
var IMAGE_UNAVAILABLE = 'No disponible para este tipo de mezclas';
var TOOLS_SELECTFUNC = 'Función: ';
var TOOLS_CROSS = 'Resolver cruz';
var TOOLS_EOLINE = 'Resolver EOLine';
var TOOLS_ROUX1 = 'Resolver Roux S1';
var TOOLS_GIIKER = 'Giiker Cube';
var TOOLS_IMAGE = 'Imagen de la mezcla';
var TOOLS_STATS = 'Estadísticas';
var TOOLS_DISTRIBUTION = 'Distribución de tiempos';
var TOOLS_TREND = 'time trend';
var PROPERTY_IMGSIZE = 'Tamaño de la imagen de la mezcla: ';
var TIMER_INSPECT = 'Inspección';
var TIMER_SOLVE = 'Resolución';
var PROPERTY_USEMOUSE = 'use mouse timer';
var PROPERTY_TIMEU = 'Frecuencia del cronómetro: ';
var PROPERTY_TIMEU_STR = 'normal|0.1s|segundos|solo inspección|nada';
var PROPERTY_PRETIME = 'Tiempo manteniendo la barra espaciadora (en segundo(s)): ';
var PROPERTY_ENTERING = 'Introducir tiempos con ';
var PROPERTY_ENTERING_STR = 'teclado|manualmente|stackmat|MoYuTimer|virtual|Giiker';
var PROPERTY_COLOR = 'Selecciona el color: ';
var PROPERTY_COLORS = 'font color: |background color: |board color: |button color: |link color: |Logo color: |Logo bgcolor: ';
var PROPERTY_VIEW = 'UI style is:';
var PROPERTY_VIEW_STR = 'Auto|Mobile|Desktop';
var COLOR_EXPORT = 'Please save the string for import: ';
var COLOR_IMPORT = 'Please input the string exported: ';
var COLOR_FAIL = 'Incorrect Data, Import Failed';
var PROPERTY_FONTCOLOR_STR = 'black|white';
var PROPERTY_COLOR_STR = 'Aleatorio|Estilo 1|Estilo 2|Estilo 3|Negro|Blanco|Estilo 6|manual|export...|import...';
var PROPERTY_FONT = 'Selecciona la fuente del cronómetro: ';
var PROPERTY_FONT_STR = 'Digital aleatorio|Normal|Digital 1|Digital 2|Digital 3|Digital 4|Digital 5';
var PROPERTY_FORMAT = 'Formato de tiempos: '
var PROPERTY_USEKSC = 'Usar atajos de teclado';
var PROPERTY_NTOOLS = 'Número de herramientas';
var PROPERTY_AHIDE = 'Hide All Elements When Timing';
var SCRAMBLE_LAST = 'última';
var SCRAMBLE_NEXT = 'siguiente';
var SCRAMBLE_SCRAMBLE = ' mezcla';
var SCRAMBLE_LENGTH = 'Longitud';
var SCRAMBLE_INPUT = 'Introducir mezcla(s)';
var PROPERTY_VRCMP = 'multi-phase: ';
var PROPERTY_VRCMPS = 'None|CFOP';
var PROPERTY_GIIKERVRC = 'Show virtual Giiker cube';
var PROPERTY_GIISOK_DELAY = 'Mark scrambled if stay: ';
var PROPERTY_GIISOK_DELAYS = '2s|3s|4s|5s|Never';
var PROPERTY_GIISOK_KEY = 'Mark scrambled with spacebar';
var PROPERTY_GIISOK_MOVE = 'Mark scrambled by doing: ';
var PROPERTY_GIISOK_MOVES = 'U4, etc|(U U\')2, (U\' U)2, etc|Never';
var PROPERTY_GIIRST = 'Reset Giiker cube when connect: ';
var PROPERTY_GIIRSTS = 'Always|Prompt|Never';
var CONFIRM_GIIRST = 'Reset Giiker cube as solved?';
var PROPERTY_GIIAED = 'Auto hardware error detection';
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
		['clock', "clkwca", 0],
		['skewb', "skbso", 0],
		['6x6x6', "666wca", -80],
		['7x7x7', "777wca", -100],
		['4x4 bld', "444bld", -40],
		['5x5 bld', "555bld", -60],
		['3x3 mbld', "r3ni", 5]
	]],
	['Introducir', [
		['外部', "input", 0]
	]],
	['===WCA===', [
		['--', "blank", 0]
	]],
	['2x2x2', [
		["WCA", "222so", 0],
		['Aleatorio óptimo', "222o", 0],
		['3-gen', "2223", 25],
		['EG', "222eg", 0],
		['EG0', "222eg0", 0],
		['EG1', "222eg1", 0],
		['EG2', "222eg2", 0]
	]],
	['3x3x3', [
		["WCA", "333", 0],
		['Antiguo estilo', "333o", 25],
		['Para principiantes', "333noob", 25],
		['Sólo aristas', "edges", 0],
		['Sólo esquinas', "corners", 0],
		['Última capa', "ll", 0],
		['zb last layer', "zbll", 0],
		['Esquinas de la última capa', "cll", 0],
		['Aristas de la última capa', "ell", 0],
		['Últimas seis aristas', "lse", 0],
		['Últimas seis aristas&ltM,U&gt', "lsemu", 0],
		['Roux L10P', "cmll", 0],
		['Cruz resuelta', "f2l", 0],
		['Última capa y último par', "lsll2", 0],
		['2GLL', "2gll", 0],
		['ZBLS', "zbls", 0],
		['ZZLL', "zzll", 0],
		['PLL', "pll", 0],
		['EOLine', "eoline", 0],
		['Cruz sencilla', 'easyc', 3]
	]],
	['4x4x4', [
		["WCA", "444wca", 40],
		['SiGN', "444", 40],
		['Aleatorio', "444o", 0],
		['YJ', "444yj", 40],
		['Aristas 4x4', "4edge", 8],
		['R,r,U,u', "RrUu", 40]
	]],
	['5x5x5', [
		["WCA", "555wca", 60],
		['SiGN', "555", 60],
		['Aristas de 5x5x5', "5edge", 8]
	]],
	['6x6x6', [
		["WCA", "666wca", 80],
		['SiGN', "666si", 80],
		['prefix', "666p", 80],
		['suffix', "666s", 80],
		['Aristas de 6x6x6', "6edge", 8]
	]],
	['7x7x7', [
		["WCA", "777wca", 100],
		['SiGN', "777si", 100],
		['prefix', "777p", 100],
		['suffix', "777s", 100],
		['Aristas de 7x7x7', "7edge", 8]
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
		['Antiguo estilo', "mgmo", 70]
	]],
	['Pyraminx', [
		["WCA", "pyrso", 10],
		['Aleatorio óptimo', "pyro", 0],
		['Aleatorio', "pyrm", 25]
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
	['===OTROS===', [
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
		['Aleatorio', "gearso", 0],
		['Aleatorio óptimo', "gearo", 0],
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
	['Redi Cube', [
		['MoYu', "redim", 8],
		['old', "redi", 20]
	]],
	['Pyraminx Crystal', [
		['Pochmann', "prcp", 70],
		['Antiguo estilo', "prco", 70]
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
	['Otro', [
		['FTO (Face-Turning Octahedron)', "fto", 25]
	]],
	['===ESPECIAL===', [
		['--', "blank", 0]
	]],
	['Subconjuntos de 3x3x3', [
		['Sólo movimientos R,U', "2gen", 25],
		['Sólo movimientos L,U', "2genl", 25],
		['Sólo movimientos de Roux M,U', "roux", 25],
		['Sólo movimiéntos F,R,U', "3gen_F", 25],
		['Sólo movimientos R,U,L', "3gen_L", 25],
		['Sólo movimientos R,r,U', "RrU", 25],
		['Sólo giros a medias', "half", 25],
		['última capa + último hueco (antiguo)', "lsll", 15]
	]],
	['Bandaged Cube', [
		['Bicube', "bic", 30],
		['Square-1 /,(1,0)', "bsq", 25]
	]],
	['Subconjuntos de megaminx', [
		['Sólo movimientos R,U', "minx2g", 30],
		['última capa + último hueco', "mlsll", 20]
	]],
	['Relays', [
		['Muchos 3x3x3s', "r3", 5],
		['234 relay', "r234", 0],
		['2345 relay', "r2345", 0],
		['23456 relay', "r23456", 0],
		['234567 relay', "r234567", 0]
	]],
	['===BROMAS===', [
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
	['gira la capa superior', 'gira la capa inferior'],
	['gira la capa derecha', 'gira la capa izquierda'],
	['gira la capa frontal', 'gira la capa trasera']
];
var SCRAMBLE_NOOBSS = ' en sentido horario 90 grados,| en sentido antihorario 90 grados,| 180 grados,';
var STATS_CFM_RESET = '¿Desea reiniciar todos los tiempos de la sesión?';
var STATS_CFM_DELSS = 'delete this session?';
var STATS_CFM_DELMUL = 'The Number Of Deleted Values From Current Index?';
var STATS_CFM_DELETE = '¿Desea eliminar este tiempo?';
var STATS_COMMENT = 'Comentario:';
var STATS_CURROUND = 'Estadísticas de la ronda actual';
var STATS_CURSESSION = 'Estadísticas de la sesión actual';
var STATS_AVG = 'Media';
var STATS_SOLVE = 'Resolución';
var STATS_TIME = 'Tiempo';
var STATS_SESSION = 'Sesión';
var STATS_SESSION_NAME = 'Session Name';
var STATS_STRING = 'Mejor|Actual|Peor|Generado por csTimer el %Y-%M-%D|resoluciones/total: %d|Single|Media de %mk|Avg de %mk|Average: %v{ (σ = %sgm)}|Media: %v|Lista de tiempos:';
var STATS_PREC = 'Precisión de la distribución de tiempos: ';
var STATS_PREC_STR = 'auto|0.1s|0.2s|0.5s|1s|2s|5s|10s|20s|50s|100s';
var STATS_TYPELEN = 'list %d type|list %d length|average|mean';
var PROPERTY_PRINTSCR = 'Publicar mezcla(s) en las estadísticas.';
var PROPERTY_SUMMARY = 'show summary before time list';
var PROPERTY_IMRENAME = 'rename session immediately after creation';
var PROPERTY_SCR2SS = 'create new session when switching scramble type';
var PROPERTY_SS2SCR = 'restore scramble type when switching session';
var PROPERTY_SS2PHASES = 'restore multi-phase timing when switching session';
var PROPERTY_STATINV = 'Inverse time list';
var PROPERTY_STATAL = 'Statistical indicators: ';
var PROPERTY_DELMUL = 'Enable Multiple Deletion';
var MODULE_NAMES = {
	"ui": 'Interfaz',
	"color": 'Color',
	"timer": 'Cronómetro',
	"vrc": 'virtual&<br>Giiker',
	"kernel": 'Global',
	"scramble": 'Mezclas',
	"stats": 'Estadísticas',
	"tools": 'Herramientas'
};
var BGIMAGE_URL = 'Por favor, introduce la url de la imagen';
var BGIMAGE_INVALID = 'Url inválida';
var BGIMAGE_OPACITY = 'Opacidad de la imagen de fondo: ';
var BGIMAGE_IMAGE = 'Imagen de fondo: ';
var BGIMAGE_IMAGE_STR = 'ninguna|manual|CCT';
var SHOW_AVG_LABEL = 'Mostrar la información de avg';
var TOOLS_SCRGEN = 'ScrambleGenerator';
var SCRGEN_NSCR = 'Number of scrambles: ';
var SCRGEN_PRE = 'prefix: ';
var SCRGEN_GEN = 'Generate Scrambles!';