var OK_LANG = 'OK';
var CANCEL_LANG = 'Cancelar';
var RESET_LANG = 'Reiniciar';
var ABOUT_LANG = 'Sobre';
var ZOOM_LANG = 'Zoom:';
var BUTTON_TIME_LIST = 'LISTAR<br>TEMPOS';
var BUTTON_OPTIONS = 'OPÇÕES';
var BUTTON_EXPORT = 'EXPORTAR';
var BUTTON_DONATE = 'DOAR';
var PROPERTY_USEINS = 'usar inspeção da WCA';
var PROPERTY_USEINS_STR = 'Always|Except BLD|Never';
var PROPERTY_VOICEINS = 'aviso de voz da inspeção da WCA: ';
var PROPERTY_VOICEINS_STR = 'nenhuma|voz masculina|voz feminina';
var PROPERTY_PHASES = 'fases de cronometragem ';
var PROPERTY_TIMERSIZE = 'tamanho do cronômetro: ';
var PROPERTY_USEMILLI = 'usar milisegundos';
var PROPERTY_SMALLADP = 'usar fonte pequena depois do ponto';
var PROPERTY_SCRSIZE = 'tamanho do embaralhamento: ';
var PROPERTY_SCRMONO = 'embaralhamento com espaços';
var PROPERTY_SCRLIM = 'Limitar a altura da área de embaralhamento';
var PROPERTY_SCRALIGN = 'Alinhamento da área do embaralhamento: ';
var PROPERTY_SCRALIGN_STR = 'centro|esquerda|direita';
var EXPORT_DATAEXPORT = 'Dados Importar/Exportar';
var EXPORT_TOFILE = 'Exportar como arquivo';
var EXPORT_FROMFILE = 'Importar arquivo';
var EXPORT_TOSERV = 'Exportar para o servidor';
var EXPORT_FROMSERV = 'Importar do servidor';
var EXPORT_USERID = 'Por favor coloque sua conta (apenas alfabeto ou números): ';
var EXPORT_INVID = 'Apenas alfabeto ou números são permitidos!';
var EXPORT_ERROR = 'Alguns erros ocorreram...';
var EXPORT_NODATA = 'Sem dados encontrados para sua conta';
var EXPORT_UPLOADED = 'Enviado com sucesso';
var BUTTON_SCRAMBLE = 'EMBARA-<br>LHAMENTO';
var BUTTON_TOOLS = 'FERRA-<br>MENTAS';
var IMAGE_UNAVAILABLE = 'Indisponível para esse tipo de embaralhamento!';
var TOOLS_SELECTFUNC = 'Função: ';
var TOOLS_CROSS = 'resolver a cruz';
var TOOLS_EOLINE = 'resolver a EOLine';
var TOOLS_ROUX1 = 'resolver o Roux S1';
var TOOLS_GIIKER = 'cubo Giiker';
var TOOLS_IMAGE = 'desenhar o embaralhamento';
var TOOLS_STATS = 'Estatíticas';
var TOOLS_DISTRIBUTION = 'Distribuição dos tempos';
var TOOLS_TREND = 'Gráfico dos tempos';
var TOOLS_METRONOME = 'Metrônomo';
var PROPERTY_IMGSIZE = 'Tamanho da imagem do embaralhamento: ';
var TIMER_INSPECT = 'inspecionando...';
var TIMER_SOLVE = 'resolvendo!';
var PROPERTY_USEMOUSE = 'usar mouse como cronômetro';
var PROPERTY_TIMEU = 'atualização do cronômetro: ';
var PROPERTY_TIMEU_STR = 'padrão|0.1s|segundos|inspeção|nenhuma';
var PROPERTY_PRETIME = 'tempo mantendo a barra de espaços pressionada (segundo(s)): ';
var PROPERTY_ENTERING = 'inserção de tempos: ';
var PROPERTY_ENTERING_STR = 'cronômetro|digitação|stackmat|Timer da MoYu|puzzle virtual|Giiker';
var PROPERTY_COLOR = 'escolha um tema de cores: ';
var PROPERTY_COLORS = 'cor da fonte: |cor do fundo: |cor da borda: |cor do botгo: |cor dos links: |Cor do logotipo: |cor de fundo do logotipo: ';
var PROPERTY_VIEW = 'formato do site:';
var PROPERTY_VIEW_STR = 'Automático|Mobile|Desktop';
var COLOR_EXPORT = 'Please save the string for import: ';
var COLOR_IMPORT = 'Please input the string exported: ';
var COLOR_FAIL = 'Informação Incorreta. A importação falhou! :(';
var PROPERTY_FONTCOLOR_STR = 'preto|branco';
var PROPERTY_COLOR_STR = 'aleatório|estilo 1|estilo 2|estilo 3|preto|branco|estilo 6|manual|exportar...|importar...';
var PROPERTY_FONT = 'fonte do cronômetro: ';
var PROPERTY_FONT_STR = 'digital aleatória|normal|digital 1|digital 2|digital 3|digital 4|digital 5';
var PROPERTY_FORMAT = 'formato do tempo: ';
var PROPERTY_USEKSC = 'usar atalhos do teclado';
var PROPERTY_NTOOLS = 'número de ferramentas';
var PROPERTY_AHIDE = 'Esconder TODOS os elementos enquanto se resolve';
var SCRAMBLE_LAST = 'último';
var SCRAMBLE_NEXT = 'próximo';
var SCRAMBLE_SCRAMBLE = ' embaralhamento';
var SCRAMBLE_LENGTH = 'tamanho';
var SCRAMBLE_INPUT = 'colocar embaralhamento(s)';
var PROPERTY_VRCMP = 'múltiplas fases: ';
var PROPERTY_VRCMPS = 'Nenhum|CFOP|CF+OP|CFFFFOP|Roux';
var PROPERTY_GIIKERVRC = 'Mostrar cubo Giiker virtual';
var PROPERTY_GIISOK_DELAY = 'Mark scrambled if stay: ';
var PROPERTY_GIISOK_DELAYS = '2s|3s|4s|5s|Nunca|Embaralhado corretamente';
var PROPERTY_GIISOK_KEY = 'Mark scrambled with spacebar';
var PROPERTY_GIISOK_MOVE = 'Mark scrambled by doing: ';
var PROPERTY_GIISOK_MOVES = 'U4, R4, etc|(U U\')2, (U\' U)2, etc|Nunca';
var PROPERTY_GIISBEEP = 'Apitar quando estiver embaralhado';
var PROPERTY_GIIRST = 'Resetar cubo Giiker quando conectado: ';
var PROPERTY_GIIRSTS = 'Sempre|Perguntar|Nunca';
var CONFIRM_GIIRST = 'Reset Giiker cube as solved?';
var PROPERTY_GIIAED = 'Detecção de erro de hardware automática';
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
	['===OUTRO===', [
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
		['MoYu', "redim", 8],
		['old', "redi", 20]
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
	['gire a face do topo', 'gire a face da base'],
	['gire a face da direita', 'fire a face da esquerda'],
	['gire a face da frente', 'gire a face de trás']
];
var SCRAMBLE_NOOBSS = ' 90 graus no sentido horário,| 90 graus no sentido anti-horário,|  180 graus,';
var STATS_CFM_RESET = 'apagar todos os tempos desta sessão??????';
var STATS_CFM_DELSS = 'deletar esta sessão???';
var STATS_CFM_DELMUL = 'Deletar quantas solves a partir do índice atual?';
var STATS_CFM_DELETE = 'deletar este tempo?';
var STATS_COMMENT = 'Comentário:';
var STATS_CURROUND = 'Current Round Statistics';
var STATS_CURSESSION = 'Estatísticas atuais da sessão';
var STATS_AVG = 'média';
var STATS_SOLVE = 'solve';
var STATS_TIME = 'tempo';
var STATS_SESSION = 'Sessão';
var STATS_SESSION_NAME = 'Nome da sessão';
var STATS_STRING = 'melhor|atual|pior|Gerado pelo csTimer em %Y-%M-%D|solves/total: %d|single|média de %mk|média de %mk|Média: %v{ (s = %sgm)}|Média: %v|Lista de Tempos:';
var STATS_PREC = 'precisão da distribuição de tempos: ';
var STATS_PREC_STR = 'automático|0.1s|0.2s|0.5s|1s|2s|5s|10s|20s|50s|100s';
var STATS_TYPELEN = 'tipo da lista %d: |tamanho da lista %d: |average|média';
var PROPERTY_PRINTSCR = 'mostrar embaralhamentos nas estatísticas';
var PROPERTY_PRINTDATE = 'print solving date in statistics';
var PROPERTY_SUMMARY = 'mostrar dados antes da lista de tempos';
var PROPERTY_IMRENAME = 'renomear a sessão imediatamente depois de criar';
var PROPERTY_SCR2SS = 'criar uma nova sessão quando mudar o tipo de embaralhamento';
var PROPERTY_SS2SCR = 'restaurar o tipo de embaralhamento quando mudar de sessão';
var PROPERTY_SS2PHASES = 'restaurar modadlidade de múltiplas fases quando mudar de sessão';
var PROPERTY_STATINV = 'Lista de tempos ao contrário';
var PROPERTY_STATAL = 'Indicadores estatísticos: ';
var PROPERTY_DELMUL = 'Ativar deleção múltipla';
var MODULE_NAMES = {
	"ui": 'Tela',
	"color": 'Cor',
	"timer": 'Timer',
	"vrc": 'virtual&<br>Giiker',
	"kernel": 'Global',
	"scramble": 'Embaralhamento',
	"stats": 'Estatísticas',
	"tools": 'Ferramentas'
};
var BGIMAGE_URL = 'por favor, insira o url da imagem';
var BGIMAGE_INVALID = 'url inválido!';
var BGIMAGE_OPACITY = 'opacidade da imagem de fundo: ';
var BGIMAGE_IMAGE = 'imagem de fundo: ';
var BGIMAGE_IMAGE_STR = 'nenhum|manual|CCT';
var SHOW_AVG_LABEL = 'Mostrar averages rápidas na frente';
var TOOLS_SCRGEN = 'Gerador de Embaralhamentos';
var SCRGEN_NSCR = 'Número de embaralhamentos: ';
var SCRGEN_PRE = 'prefixo: ';
var SCRGEN_GEN = 'Gerar embaralhamentos!!';