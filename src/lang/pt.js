var OK_LANG = 'OK';
var CANCEL_LANG = 'Cancelar';
var RESET_LANG = 'Reiniciar';
var ABOUT_LANG = 'Sobre';
var ZOOM_LANG = 'Zoom';
var BUTTON_TIME_LIST = 'LISTAR<br>TEMPOS';
var BUTTON_OPTIONS = 'OPÇÕES';
var BUTTON_EXPORT = 'EXPORTAR';
var BUTTON_DONATE = 'DOAR';
var PROPERTY_USEINS = 'usar inspeзгo da WCA';
var PROPERTY_VOICEINS = 'aviso de voz da inspeзгo da WCA: ';
var PROPERTY_VOICEINS_STR = 'nenhuma|voz masculina|voz feminina';
var PROPERTY_USECFM = 'confirmar tempo(ok/+2/dnf)';
var PROPERTY_PHASES = 'vбrias fases: ';
var PROPERTY_TIMERSIZE = 'tamanho do cronфmetro: ';
var CFMDIV_CURTIME = 'o tempo é: ';
var PROPERTY_USEMILLI = 'usar milisegundos';
var PROPERTY_SMALLADP = 'usar fonte pequena depois do ponto';
var PROPERTY_SCRSIZE = 'tamanho do embaralhamento: ';
var PROPERTY_SCRMONO = 'embaralhamento com espaзo';
var PROPERTY_SCRLIM = 'Limitar a altura da бrea de embaralhamento';
var PROPERTY_SCRALIGN = 'Alinhamento da бrea do embaralhamento: ';
var PROPERTY_SCRALIGN_STR = 'centro|esquerda|direita';
var EXPORT_DATAEXPORT = 'Dados Importar/Exportar';
var EXPORT_TOFILE = 'Exportar como arquivo';
var EXPORT_FROMFILE = 'Importar arquivo';
var EXPORT_TOSERV = 'Exportar para o servidor';
var EXPORT_FROMSERV = 'Importar do servidor';
var EXPORT_USERID = 'Por favor coloque sua conta (apenas alfabeto ou nъmeros): ';
var EXPORT_INVID = 'Apenas alfabeto ou nъmero sгo permitidos!';
var EXPORT_ERROR = 'Alguns erros ocorreram...';
var EXPORT_NODATA = 'Sem dados encontrados para sua conta';
var EXPORT_UPLOADED = 'Enviado com sucesso';
var BUTTON_SCRAMBLE = 'EMBARA-<br>LHAMENTO';
var BUTTON_TOOLS = 'FERRA-<br>MENTAS';
var IMAGE_UNAVAILABLE = 'Indisponнvel para esse tipo de embaralhamento';
var TOOLS_SELECTFUNC = 'Funзгo: ';
var TOOLS_CROSS = 'resolver a cruz';
var TOOLS_EOLINE = 'resolver EOLine';
var TOOLS_IMAGE = 'desenhar o embaralhamento';
var TOOLS_STATS = 'Estatнsticas';
var TOOLS_DISTRIBUTION = 'distribuiзгo de tempos';
var TOOLS_TREND = 'grбfico de tempos';
var PROPERTY_IMGSIZE = 'Tamanho da imagem do scramble: ';
var TIMER_INSPECT = 'inspecionando';
var TIMER_SOLVE = 'resolvendo';
var PROPERTY_USEMOUSE = 'usar mouse como cronфmetro';
var PROPERTY_TIMEU = 'atualizaзгo do cronфmetro é: ';
var PROPERTY_TIMEU_STR = 'atualizado|0.1s|segundos|inspeзгo|nenhuma';
var PROPERTY_PRETIME = 'tempo de manter a barra de espaзo pressionada(segundo(s)): ';
var PROPERTY_ENTERING = 'colocar tempos ';
var PROPERTY_ENTERING_STR = 'cronфmetro|digitando|stackmat|virtual';
var PROPERTY_COLOR = 'escolha um tema de cores: ';
var PROPERTY_COLORS = 'cor da fonte: |cor do fundo: |cor da borda: |cor do botгo: |cor dos links: |Cor da logo: |cor de fundo da logo: ';
var PROPERTY_VIEW = 'estilo do site é:';
var PROPERTY_VIEW_STR = 'Automбtico|Mobile|Desktop';
var COLOR_EXPORT = 'Please save the string for import: ';
var COLOR_IMPORT = 'Please input the string exported: ';
var COLOR_FAIL = 'Informaзгo Incorreta, Importaзгo Falhou';
var PROPERTY_FONTCOLOR_STR = 'preto|branco';
var PROPERTY_COLOR_STR = 'aleatуrio|estilo1|estilo2|estilo3|preto|branco|estilo6|manual|exportar...|importar...';
var PROPERTY_FONT = 'selecionar fonte do timer: ';
var PROPERTY_FONT_STR = 'digital aleatуria|normal|digital1|digital2|digital3|digital4|digital5';
var PROPERTY_FORMAT = 'formato do tempo: '
var PROPERTY_USEKSC = 'usar atalhos do teclado';
var PROPERTY_NTOOLS = 'nъmero de ferramentas';
var PROPERTY_AHIDE = 'Esconder TODOS os elementos quando resolver';
var SCRAMBLE_LAST = 'ъltimo';
var SCRAMBLE_NEXT = 'prуximo';
var SCRAMBLE_SCRAMBLE = ' embaralhamento';
var SCRAMBLE_LENGTH = 'tamanho';
var SCRAMBLE_INPUT = 'colocar embaralhamento(s)';
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
	['Input', [
		['??', "input", 0]
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
	['Redi Cube', [
		[' ', "redi", 20]
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
	['turn the top face', 'turn the bottom face'],
	['turn the right face', 'turn the left face'],
	['turn the front face', 'turn the back face']
];
var SCRAMBLE_NOOBSS = ' 90 graus no sentido horбrio,| 90 graus no sentido antihorбrio,|  180 graus,';
var STATS_CFM_RESET = 'apagar todos os tempos nessa sessгo?';
var STATS_CFM_DELSS = 'deletar essa sessгo?';
var STATS_CFM_DELMUL = 'The Number Of Deleted Values From Current Index?';
var STATS_CFM_DELETE = 'deletar este tempo?';
var STATS_COMMENT = 'Comentбrio:';
var STATS_CURROUND = 'Current Round Statistics';
var STATS_CURSESSION = 'Estatнsticas atuais da sessгo';
var STATS_AVG = 'mean';
var STATS_SOLVE = 'solve';
var STATS_TIME = 'time';
var STATS_SESSION = 'Sessгo';
var STATS_SESSION_NAME = 'Nome da sessгo';
var STATS_STRING = 'melhor|atual|pior|Gerado pelo csTimer em %Y-%M-%D|solves/total: %d|single|mean of %mk|média de %mk|Média: %v{ (s = %sgm)}|Mean: %v|Lista de Tempos:';
var STATS_PREC = 'precisгo da distribuiзгo de tempos: ';
var STATS_PREC_STR = 'automбtico|0.1s|0.2s|0.5s|1s|2s|5s|10s|20s|50s|100s';
var STATS_TYPELEN = 'list %d type|list %d length|average|mean';
var PROPERTY_PRINTSCR = 'print scramble(s) in statistics';
var PROPERTY_SUMMARY = 'mostrar dados antes da lista de tempos';
var PROPERTY_IMRENAME = 'renomear a sessгo imediatamente depois de criar';
var PROPERTY_SCR2SS = 'criar uma nova sessгo quando mudar o tipo de embaralhamento';
var PROPERTY_SS2SCR = 'restaurar o tipo de embaralhamento quando mudar de sessгo';
var PROPERTY_SS2PHASES = 'restore multi-phase timing when switching session';
var PROPERTY_STATAL = 'Statistical indicators: ';
var PROPERTY_DELMUL = 'Ativar deleзгo multipla';
var MODULE_NAMES = {
	"ui": 'display',
	"color": 'color',
	"timer": 'timer',
	"kernel": 'global',
	"scramble": 'scramble',
	"stats": 'statistics',
	"tools": 'tools'
};
var BGIMAGE_URL = 'please input image\'s url';
var BGIMAGE_INVALID = 'invalid url';
var BGIMAGE_OPACITY = 'background image opacity: ';
var BGIMAGE_IMAGE = 'background image: ';
var BGIMAGE_IMAGE_STR = 'none|manual|CCT';
var SHOW_AVG_LABEL = 'Show Avg Label';
var TOOLS_SCRGEN = 'ScrambleGenerator';
var SCRGEN_NSCR = 'Number of scrambles: ';
var SCRGEN_PRE = 'prefix: ';
var SCRGEN_GEN = 'Generate Scrambles!';