var OK_LANG = 'D\'acord';
var CANCEL_LANG = 'Cancelar';
var RESET_LANG = 'Restablir valors predeterminats';
var ABOUT_LANG = 'Informació';
var ZOOM_LANG = 'Zoom';
var COPY_LANG = 'Copia';
var BUTTON_TIME_LIST = 'Llista de temps';
var BUTTON_OPTIONS = 'Opcions';
var BUTTON_EXPORT = 'Exportar';
var BUTTON_DONATE = 'Donacions';
var PROPERTY_SR = 'Amb sessió';
var PROPERTY_USEINS = 'Inspecions WCA';
var PROPERTY_USEINS_STR = 'Always (down)|Always (up)|Except BLD (down)|Except BLD (up)|Never';
var PROPERTY_SHOWINS = 'Mostrar una icona quan la inspecció és habilitada';
var PROPERTY_VOICEINS = 'Alerta d\'inspecció WCA';
var PROPERTY_VOICEINS_STR = 'Mai|Veu masculina|Veu femenina';
var PROPERTY_VOICEVOL = 'Volum de Veu';
var PROPERTY_PHASES = 'Multiples fases';
var PROPERTY_TIMERSIZE = 'Mida del cronòmetre';
var PROPERTY_USEMILLI = 'Milisegons';
var PROPERTY_SMALLADP = 'Fer servir lletra petita després del punt decimal';
var PROPERTY_SCRSIZE = 'Mida de la barreja';
var PROPERTY_SCRMONO = 'Barreja Mono-espai';
var PROPERTY_SCRLIM = 'Limitar l\'altura de l\'àrea de barreja';
var PROPERTY_SCRALIGN = 'Aliniament de l\'àrea de barreja';
var PROPERTY_SCRALIGN_STR = 'Centre|Esquerra|Dreta';
var PROPERTY_SCRWRAP = 'Scramble Wrap';
var PROPERTY_SCRWRAP_STR = 'Balancejat |Normal';
var PROPERTY_SCRNEUT = 'Color neutral';
var PROPERTY_SCRNEUT_STR = 'Cap |Una |Dues |Sis cares';
var PROPERTY_SCREQPR = 'Probabilities for training-scramble states';
var PROPERTY_SCREQPR_STR = 'Actual |Igual |Ordre aleatori';
var PROPERTY_SCRFAST = 'Fer servir barreja ràpida per 4x4x4 (no-oficial)';
var PROPERTY_SCRKEYM = 'Marcar moviment(s) clau en la barreja';
var PROPERTY_SCRCLK = 'Acció a la hora de fer clic a la barreja';
var PROPERTY_SCRCLK_STR = 'Cap|Copiar barreja|Següent barreja';
var PROPERTY_WNDSCR = 'Tipus de panell de barreja';
var PROPERTY_WNDSTAT = 'Tipus de panell d\'estadístiques';
var PROPERTY_WNDTOOL = 'Tipus de panell d\'eines';
var PROPERTY_WND_STR = 'Normal|Pla';
var EXPORT_DATAEXPORT = 'Importar/Exportar dades';
var EXPORT_TOFILE = 'Exportar a arxiu';
var EXPORT_FROMFILE = 'Importar d\'un arxiu';
var EXPORT_TOSERV = 'Exportar al servidor';
var EXPORT_FROMSERV = 'Importar del servidor';
var EXPORT_FROMOTHER = 'Importar sessió(ns) d\'altres cronòmetres';
var EXPORT_USERID = 'Si us plau introduïu el vostre compte (només lletres o nombres)';
var EXPORT_INVID = 'Només lletres o nombres!';
var EXPORT_ERROR = 'S\'han produït alguns uns errors...';
var EXPORT_NODATA = 'No s\'ha trobat dades per el teu compte';
var EXPORT_UPLOADED = 'S\'ha pujat correctament';
var EXPORT_CODEPROMPT = 'Guardeu aquest codi, o escriviu codi per a importar';
var EXPORT_ONLYOPT = 'Exportar/Importar només opcions';
var EXPORT_ACCOUNT = 'Exportar comptes';
var EXPORT_LOGINGGL = 'Entrar amb compte de Google';
var EXPORT_LOGINWCA = 'Entrar amb compte de WCA';
var EXPORT_LOGOUTCFM = 'Confirmar desconnexió?';
var EXPORT_LOGINAUTHED = 'Autoritzat<br>s\'estan obtenint dades...';
var EXPORT_AEXPALERT = 'More than %d solves since last backup';
var EXPORT_WHICH = 'You have %d file(s), which one should be imported?';
var EXPORT_WHICH_ITEM = '%s solve(s), uploaded at %t';
var IMPORT_FINAL_CONFIRM = 'Això anul·larà les dades locals! Es modificaran %d sessions, s\'afegiran %a i s\'eliminaran %r resolucions. Confirmar per a importar les dades?';
var BUTTON_SCRAMBLE = 'Barre-<br>ja';
var BUTTON_TOOLS = 'Eines';
var IMAGE_UNAVAILABLE = 'No disponible per aquest tipus de barreja';
var TOOLS_SELECTFUNC = 'Funció';
var TOOLS_CROSS = 'Solucionar creu';
var TOOLS_EOLINE = 'Solucionar línia EO';
var TOOLS_ROUX1 = 'Solucionar S1 Roux';
var TOOLS_222FACE = 'Cara de 2x2x2';
var TOOLS_GIIKER = 'Cub Giiker';
var TOOLS_IMAGE = 'Dibuixar barreja';
var TOOLS_STATS = 'Estadístiques';
var TOOLS_HUGESTATS = 'Estadístiques absolutes';
var TOOLS_DISTRIBUTION = 'Distribució de temps';
var TOOLS_TREND = 'Tendència de temps';
var TOOLS_METRONOME = 'Metrònom';
var TOOLS_RECONS = 'Reconstruir';
var TOOLS_RECONS_NODATA = 'No s\'ha trobat cap solució';
var TOOLS_RECONS_TITLE = 'insp|exec|girs|tps';
var TOOLS_TRAINSTAT = 'Estadístiques d\'entrenament';
var TOOLS_BLDHELPER = 'Ajudant per a BLD';
var TOOLS_CFMTIME = 'Confirmar temps';
var TOOLS_SOLVERS = 'Solucionadors';
var TOOLS_DLYSTAT = 'Estadístiques Diàries';
var TOOLS_DLYSTAT1 = 'Periode|Començament de Dia|Setmana';
var TOOLS_DLYSTAT_OPT1 = 'dia|setmana|mes|any';
var TOOLS_DLYSTAT_OPT2 = 'Sun|Mon|Tue|Wed|Thu|Fri|Sat';
var TOOLS_SYNCSEED = 'Barreja Comuna';
var TOOLS_SYNCSEED_SEED = 'Seed';
var TOOLS_SYNCSEED_INPUT = 'Escriure Seed';
var TOOLS_SYNCSEED_30S = 'Utilitzar Seed de 30s';
var TOOLS_SYNCSEED_HELP = 'Si s\'habilita, la barreja dependrà només de la seed i les opcions de barreja';
var TOOLS_SYNCSEED_DISABLE = 'Deshabilitar seed actual?';
var TOOLS_SYNCSEED_INPUTA = 'Escriu un valor (a-zA-Z0-9) com a seed';
var TOOLS_BATTLE = 'Partida En línia';
var TOOLS_BATTLE_HEAD = 'Room|Join Room';
var TOOLS_BATTLE_TITLE = 'Rank|Status|Time';
var TOOLS_BATTLE_STATUS = 'Ready|Inspect|Solving|Solved|Lost';
var TOOLS_BATTLE_INFO = 'Join a battle room with your friend, then you will battle together.';
var TOOLS_BATTLE_JOINALERT = 'Please input the room ID';
var TOOLS_BATTLE_LEAVEALERT = 'Leave current room';
var OLCOMP_UPDATELIST = 'Actualitzar Llista de Competicions';
var OLCOMP_VIEWRESULT = 'Veure Resultat';
var OLCOMP_VIEWMYRESULT = 'Els meus resultats';
var OLCOMP_START = 'Començar!';
var OLCOMP_SUBMIT = 'Enviar!';
var OLCOMP_SUBMITAS = 'Enviar Com: ';
var OLCOMP_WCANOTICE = 'Enviar Com el Teu Compte WCA? (Torna a iniciar sessió si no es reconeix després d\'enviar)';
var OLCOMP_OLCOMP = 'Competició En Línia';
var OLCOMP_ANONYM = 'Anònim';
var OLCOMP_ME = 'Jo';
var OLCOMP_WCAACCOUNT = 'Compte WCA';
var OLCOMP_ABORT = 'Avortar la competició i mostrar resultats?';
var OLCOMP_WITHANONYM = 'Amb Anònim';
var PROPERTY_IMGSIZE = 'Mida de l\'imatge de barreja';
var PROPERTY_IMGREP = 'Show virtual cube animation when clicking scramble image';
var TIMER_INSPECT = 'Inspecciona';
var TIMER_SOLVE = 'Resol';
var PROPERTY_USEMOUSE = 'Utilitzar el ratolí com a cronòmetre';
var PROPERTY_TIMEU = 'Actualització de temporitzador';
var PROPERTY_TIMEU_STR = 'Continu|0,1s|Segons|Inspecció|Res';
var PROPERTY_PRETIME = 'Temps d\'espera de l\'espai(Segon(s))';
var PROPERTY_ENTERING = 'Entrar temps amb';
var PROPERTY_ENTERING_STR = 'Cronòmetre|Manual|StackMat|Cronòmetre MoYu|Virtual|Bluetooth Cube|qCube|Bluetooth Timer|last layer training';
var PROPERTY_INTUNIT = 'Unitat en registrar un nombre enter';
var PROPERTY_INTUNIT_STR = 'segon|centsegon|mil·lisegon';
var PROPERTY_COLOR = 'Seleciona tema de color';
var PROPERTY_COLORS = 'Color de la font|Color de fons|Color de taulers|Color dels botons|Color dels enllaços|Color del logo|Color de fons del logo';
var PROPERTY_VIEW = 'Estil de la IU';
var PROPERTY_VIEW_STR = 'Automàtic|Mòbil|Escriptori';
var PROPERTY_UIDESIGN = 'Disseny d\'interfície d\'usuari és';
var PROPERTY_UIDESIGN_STR = 'Normal|Disseny de material|Normal sense ombres|Disseny de material sense ombres';
var COLOR_EXPORT = 'Si us plau guardeu el fil per importar';
var COLOR_IMPORT = 'Si us plau entreu el fil exportat';
var COLOR_FAIL = 'Dades incorrectes, importació fallada';
var PROPERTY_FONTCOLOR_STR = 'Negre|Blanc';
var PROPERTY_COLOR_STR = 'Manual|Importar/Exportar...|Aleatori|Estil 1|Estil 2|Estil 3|Negre|Blanc|Estil 6|solarized dark|solarized light';
var PROPERTY_FONT = 'Seleccionar font del cronòmetre';
var PROPERTY_FONT_STR = 'Digital aleatori|Normal|Digital 1|Digital 2|Digital 3|Digital 4|Digital 5';
var PROPERTY_FORMAT = 'Format de temps';
var PROPERTY_USEKSC = 'Fer servir dreceres del teclat';
var PROPERTY_USEGES = 'use gesture control';
var PROPERTY_NTOOLS = 'Nombre d\'eines';
var PROPERTY_AHIDE = 'Amagar tots els elements en el cronometratge';
var SCRAMBLE_LAST = 'Anterior';
var SCRAMBLE_NEXT = 'Següent';
var SCRAMBLE_SCRAMBLE = 'Barreja';
var SCRAMBLE_SCRAMBLING = 'Barrejant';
var SCRAMBLE_LENGTH = 'Llargada';
var SCRAMBLE_INPUT = 'Importar barreja';
var SCRAMBLE_INPUTTYPE = 'Scramble type';
var PROPERTY_VRCSPEED = 'Velocitat base VRC (tps)';
var PROPERTY_VRCORI = 'Virtual cube orientation';
var PROPERTY_VRCMP = 'Multi-fase';
var PROPERTY_VRCMPS = 'Cap|CFOP|CF+OP|CFFFFOP|CFFFFOOPP|Roux';
var PROPERTY_GIIKERVRC = 'Mostrar cub Giiker virtual';
var PROPERTY_GIISOK_DELAY = 'Marcar com a barrejat si passen';
var PROPERTY_GIISOK_DELAYS = '2s|3s|4s|5s|Mai|Barrejat correctament';
var PROPERTY_GIISOK_KEY = 'Marcar barrejat amb espai';
var PROPERTY_GIISOK_MOVE = 'Marcar barrejat fent';
var PROPERTY_GIISOK_MOVES = 'U4, R4, etc|(U\' U)2, etc|Res';
var PROPERTY_GIISBEEP = 'Emet so quan es marqui barrejat';
var PROPERTY_GIIRST = 'Reiniciar cub Giiker quan es connecti';
var PROPERTY_GIIRSTS = 'Sempre|Preguntar|Mai';
var PROPERTY_GIIMODE = 'Mode Cub Bluetooth';
var PROPERTY_GIIMODES = 'Normal|Training|Continuous training';
var PROPERTY_VRCAH = 'Peces inútils en cub gros';
var PROPERTY_VRCAHS = 'Amagar|Marge|Color|Ensenyar';
var CONFIRM_GIIRST = 'Reiniciar cub Giiker com a solucionat?';
var PROPERTY_GIIAED = 'Detecció automàtica d\'errors físics';
var scrdata = [
	['WCA', [
		['3x3x3', "333", 0],
		['2x2x2', "222so", 0],
		['4x4x4', "444wca", -40],
		['5x5x5', "555wca", -60],
		['6x6x6', "666wca", -80],
		['7x7x7', "777wca", -100],
		['3x3 A cegues', "333ni", 0],
		['3x3 Moviments Mínims', "333fm", 0],
		['3x3 Una mà', "333oh", 0],
		['Rellotge', "clkwca", 0],
		['Megaminx', "mgmp", -70],
		['Pyraminx', "pyrso", -10],
		['Skewb', "skbso", 0],
		['Sq1', "sqrs", 0],
		['4x4 A cegues', "444bld", -40],
		['5x5 A cegues', "555bld", -60],
		['3x3 A cegues multi', "r3ni", 5]
	]],
	['Per Entrada', [
		['Extern', "input", 0],
		['Competició', "remoteComp", 0],
		['Partida En línia', "remoteBattle", 0],
		['Remote', "remoteOther", 0]
	]],
	['===WCA===', [
		['--', "blank", 0]
	]],
	['3x3x3', [
		["estat aleatori (WCA)", "333", 0],
		['moviment aleatori', "333o", 25],
		['3x3x3 per a novicis', "333noob", 25],
		['Només arestes', "edges", 0],
		['Només cantonades', "corners", 0],
		['Ajudant per a BLD', "nocache_333bldspec", 0],
		['Pattern Tool', "nocache_333patspec", 0],
		['3x3 Peus', "333ft", 0],
		['Personalitzat', "333custom", 0]
	]],
	['3x3x3 CFOP', [
		['PLL', "pll", 0],
		['OLL', "oll", 0],
		['Últim espai + Última capa', "lsll2", 0],
		['Última capa', "ll", 0],
		['ZBLL', "zbll", 0],
		['COLL', "coll", 0],
		['CLL', "cll", 0],
		['ELL', "ell", 0],
		['2GLL', "2gll", 0],
		['ZZLL', "zzll", 0],
		['ZBLS', "zbls", 0],
		['EOLS', "eols", 0],
		['WVLS', "wvls", 0],
		['VLS', "vls", 0],
		['Creu resolta', "f2l", 0],
		['Línia EO', "eoline", 0],
		['EO Cross', "eocross", 0],
		['Creu fàcil', "easyc", 3],
		['Xcreu fàcil', "easyxc", 4]
	]],
	['3x3x3 Roux', [
		['2nd Block', "sbrx", 0],
		['CMLL', "cmll", 0],
		['LSE', "lse", 0],
		['LSE &lt;M, U&gt;', "lsemu", 0]
	]],
	['3x3x3 Mehta', [
		['3QB', "mt3qb", 0],
		['EOLE', "mteole", 0],
		['TDR', "mttdr", 0],
		['6CP', "mt6cp", 0],
		['CDRLL', "mtcdrll", 0],
		['L5EP', "mtl5ep", 0],
		['TTLL', "ttll", 0]
	]],
	['2x2x2', [
		["estat aleatori (WCA)", "222so", 0],
		['òptim', "222o", 0],
		['3-gen', "2223", 25],
		['EG', "222eg", 0],
		['CLL', "222eg0", 0],
		['EG1', "222eg1", 0],
		['EG2', "222eg2", 0],
		['TCLL+', "222tcp", 0],
		['TCLL-', "222tcn", 0],
		['TCLL', "222tc", 0],
		['LS', "222lsall", 0],
		['Cap Barra', "222nb", 0]
	]],
	['4x4x4', [
		["WCA", "444wca", -40],
		['Moviments aleatoris', "444m", 40],
		['Signe', "444", 40],
		['YJ', "444yj", 40],
		['4x4x4 Arestes', "4edge", 0],
		['R,r,U,u', "RrUu", 40],
		['Last layer', "444ll", 0],
		['ELL', "444ell", 0],
		['Edge only', "444edo", 0],
		['Center only', "444cto", 0]
	]],
	['4x4x4 Yau/Hoya', [
		['UD center solved', "444ctud", 0],
		['UD+3E solved', "444ud3c", 0],
		['Last 8 dedges', "444l8e", 0],
		['RL center solved', "444ctrl", 0],
		['RLDX center solved', "444rlda", 0],
		['RLDX cross solved', "444rlca", 0]
	]],
	['5x5x5', [
		["WCA", "555wca", 60],
		['Signe', "555", 60],
		['5x5x5 Arestes', "5edge", 8]
	]],
	['6x6x6', [
		["WCA", "666wca", 80],
		['Signe', "666si", 80],
		['Prefix', "666p", 80],
		['Sufix', "666s", 80],
		['6x6x6 Arestes', "6edge", 8]
	]],
	['7x7x7', [
		["WCA", "777wca", 100],
		['Signe', "777si", 100],
		['Prefix', "777p", 100],
		['Sufix', "777s", 100],
		['7x7x7 Arestes', "7edge", 8]
	]],
	['Rellotge', [
		['WCA', "clkwca", 0],
		['WCA (old)', "clkwcab", 0],
		['WCA w/o y2', "clknf", 0],
		['jaap', "clk", 0],
		['òptim', "clko", 0],
		['Concís', "clkc", 0],
		['Ordre eficient de clavilles', "clke", 0]
	]],
	['Megaminx', [
		["WCA", "mgmp", 70],
		['Carrot', "mgmc", 70],
		['Estil antic', "mgmo", 70],
		['2-gen R,U', "minx2g", 30],
		['Últim espai + Última capa', "mlsll", 0],
		['PLL', "mgmpll", 0],
		['Last Layer', "mgmll", 0]
	]],
	['Pyraminx', [
		["estat aleatori (WCA)", "pyrso", 10],
		['òptim', "pyro", 0],
		['moviment aleatori', "pyrm", 25],
		['L4E', "pyrl4e", 0],
		['4 tips', "pyr4c", 0],
		['No bar', "pyrnb", 0]
	]],
	['Skewb', [
		["estat aleatori (WCA)", "skbso", 0],
		['òptim', "skbo", 0],
		['moviment aleatori', "skb", 25],
		['No bar', "skbnb", 0]
	]],
	['Square-1', [
		["estat aleatori (WCA)", "sqrs", 0],
		["CSP", "sqrcsp", 0],
		["PLL", "sq1pll", 0],
		['Mètrica de gir de cara', "sq1h", 40],
		['Mètrica de gir', "sq1t", 20]
	]],
	['===Altres===', [
		['--', "blank", 0]
	]],
	['Puzzle de 15 peces', [
		['estat aleatori URLD', "15prp", 0],
		['estat aleatori ^<>v', "15prap", 0],
		['estat aleatori Blank', "15prmp", 0],
		['moviment aleatori URLD', "15p", 80],
		['moviment aleatori ^<>v', "15pat", 80],
		['moviment aleatori Blank', "15pm", 80]
	]],
	['8 puzzle', [
		['estat aleatori URLD', "8prp", 0],
		['estat aleatori ^<>v', "8prap", 0],
		['estat aleatori Blank', "8prmp", 0]
	]],
	['LxMxN', [
		['1x3x3 (Floppy)', "133", 0],
		['2x2x3 (Tower)', "223", 0],
		['2x3x3 (Dòmino)', "233", 25],
		['3x3x4', "334", 40],
		['3x3x5', "335", 25],
		['3x3x6', "336", 40],
		['3x3x7', "337", 40],
		['8x8x8', "888", 120],
		['9x9x9', "999", 120],
		['10x10x10', "101010", 120],
		['11x11x11', "111111", 120],
		['NxNxN', "cubennn", 12],
		['Mirror Blocks', "mrbl", 0]
	]],
	['Gear Cube', [
		['estat aleatori', "gearso", 0],
		['òptim', "gearo", 0],
		['moviment aleatori', "gear", 10]
	]],
	['Kilominx', [
		['estat aleatori', "klmso", 0],
		['Pochmann', "klmp", 30]
	]],
	['Gigaminx', [
		['Pochmann', "giga", 300]
	]],
	['Crazy Puzzle', [
		['Crazy 3x3x3', "crz3a", 30]
	]],
	['Cmetrick', [
		['Cmetrick', "cm3", 25],
		['Cmetrick Mini', "cm2", 25]
	]],
	['Cub Helicòpter', [
		['Heli copter', "heli", 40],
		['Curvy copter', "helicv", 40],
		['2x2 Heli random move', "heli2x2", 70],
		['2x2 Heli by group', "heli2x2g", 5]
	]],
	['Cub Redi', [
		['estat aleatori', "rediso", 0],
		['MoYu', "redim", 8],
		['moviment aleatori', "redi", 20]
	]],
	['Dino Cube', [
		['estat aleatori', "dinoso", 0],
		['òptim', "dinoo", 0]
	]],
	['Ivy Cube', [
		['estat aleatori', "ivyso", 0],
		['òptim', "ivyo", 0],
		['moviment aleatori', "ivy", 10]
	]],
	['Master Pyraminx', [
		['estat aleatori', "mpyrso", 0],
		['moviment aleatori', "mpyr", 42]
	]],
	['Pyraminx Crystal', [
		['Pochmann', "prcp", 70],
		['estil vell', "prco", 70]
	]],
	['Cub Siamès', [
		['1x1x3', "sia113", 25],
		['1x2x3', "sia123", 25],
		['2x2x2', "sia222", 25]
	]],
	['Square', [
		['Square-2', "sq2", 20],
		['Super Square-1', "ssq1t", 20]
	]],
	['Super Floppy', [
		[' ', "sfl", 25]
	]],
	['OVNI', [
		['Estil Jaap', "ufo", 25]
	]],
	['FTO (Octaedre amb cares rotatòries)', [
		['estat aleatori', "ftoso", 0],
		['moviment aleatori', "fto", 30],
		['L3T', "ftol3t", 0],
		['L3T+LBT', "ftol4t", 0],
		['TCP', "ftotcp", 0],
		['edges only', "ftoedge", 0],
		['centers only', "ftocent", 0],
		['corners only', "ftocorn", 0],
		['Diamond estat aleatori', "dmdso", 0]
	]],
	['Icosahedron', [
		['Icosamate moviment aleatori', "ctico", 60]
	]],
	['===Especials===', [
		['--', "blank", 0]
	]],
	['3x3x3 Subtipus', [
		['2-gen R,U', "2gen", 0],
		['2-gen L,U', "2genl", 0],
		['Generador Roux M,U', "roux", 0],
		['3-gen F,R,U', "3gen_F", 0],
		['3-gen R,U,L', "3gen_L", 0],
		['3-gen R,r,U', "RrU", 0],
		['Domino Subgroup', "333drud", 0],
		['Només mitjes voltes', "half", 0],
		['Últim espai+Última capa (Antic)', "lsll", 15]
	]],
	['Cub embenat', [
		['Bicub', "bic", 30],
		['Square-1 /,(1,0)', "bsq", 25]
	]],
	['Relays', [
		['Molts 3x3x3s', "r3", 5],
		['Relay 234', "r234", 0],
		['Relay 2345', "r2345", 0],
		['Relay 23456', "r23456", 0],
		['Relay 234567', "r234567", 0],
		['Relay 234 (WCA)', "r234w", 0],
		['Relay 2345 (WCA)', "r2345w", 0],
		['Relay 23456 (WCA)', "r23456w", 0],
		['Relay 234567 (WCA)', "r234567w", 0],
		['Mini Guildford', "rmngf", 0]
	]],
	['===Bromes===', [
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
	['Giri la cara superior', 'Giri la cara inferior'],
	['Giri la cara dreta', 'Giri la cara esquerra'],
	['Giri la cara frontal', 'Giri la cara posterior']
];
var SCRAMBLE_NOOBSS = 'En sentit horari 90 graus,| En sentit anti-horari 90 graus| 180 graus';
var SCROPT_TITLE = 'Opcions de barreja';
var SCROPT_BTNALL = 'Sencer';
var SCROPT_BTNNONE = 'Buidar';
var SCROPT_EMPTYALT = 'Seleccioni com a mínim un cas';
var STATS_CFM_RESET = 'Reiniciar tots els els temps en aquesta sessió?';
var STATS_CFM_DELSS = 'Eliminar sessió [%s]?';
var STATS_CFM_DELMUL = 'El nombre de valors eliminats de l\'índex actual?';
var STATS_CFM_DELETE = 'Eliminar aquest temps?';
var STATS_COMMENT = 'Comentar';
var STATS_REVIEW = 'Revisar';
var STATS_DATE = 'Data';
var STATS_SSSTAT = 'Estadística de resolució';
var STATS_SSRETRY = 'Retry';
var STATS_CURROUND = 'Estadístiques de la ronda actual';
var STATS_CURSESSION = 'Estadístiques de la sessió actual';
var STATS_CURSPLIT = 'Fase %d d\'estadístiques de la sessió actual';
var STATS_EXPORTCSV = 'Exporta en format CSV';
var STATS_SSMGR_TITLE = 'Gestor de sessions';
var STATS_SSMGR_NAME = 'Nom';
var STATS_SSMGR_DETAIL = 'Detalls de sessió';
var STATS_SSMGR_OPS = 'Renombrar|Crear|Dividir|Combinar|Eliminar|Sort|Merge&Dedupe';
var STATS_SSMGR_ORDER = 'Ordenar per barreja';
var STATS_SSMGR_ODCFM = 'Ordenar totes les sessions per barreja?';
var STATS_SSMGR_SORTCFM = '%d resolució/ns seran reodrenats, confirmar?';
var STATS_ALERTMG = 'Combinar tots els temps de la sessió [%f] al final de la sessió [%t]?';
var STATS_PROMPTSPL = 'Nombre de temps dividits de la sessió [%s]?';
var STATS_ALERTSPL = 'Cal dividir o deixar com a mínim 1 vegada';
var STATS_AVG = 'Mitjana';
var STATS_SUM = 'suma';
var STATS_SOLVE = 'Resol';
var STATS_TIME = 'Temps';
var STATS_SESSION = 'Sessió';
var STATS_SESSION_NAME = 'Modificar el nom de la sessió';
var STATS_SESSION_NAMEC = 'Nom de la nova sessió';
var STATS_STRING = 'millor|actual|pitjor|Generat Per csTimer el %D-%M-%Y|resolucions/total: %d|single|mean de %mk|mitja de %mk|Mitjana: %v{ (σ = %sgm)}|Mean: %v|Llista de temps:|resolent des de %s fins a %e|Temps total resolent: %d|objectiu';
var STATS_PREC = 'precisió de distribució de temps';
var STATS_PREC_STR = 'automàtic|0.1s|0.2s|0.5s|1s|2s|5s|10s|20s|50s|100s';
var STATS_TYPELEN = 'llista %d tipus|llista %d longitud|mitjana|mean';
var STATS_STATCLR = 'Opció de buidar sessions';
var STATS_ABSIDX = 'Mostrar índex absolut a l\'informe d\'estadístiques';
var STATS_XSESSION_DATE = 'qualsevol data|últimes 24 hores|últims 7 dies|últms 30 dies|últims 365 dies';
var STATS_XSESSION_NAME = 'qualsevol nom';
var STATS_XSESSION_SCR = 'qualsevol barreja';
var STATS_XSESSION_CALC = 'Calcular';
var STATS_RSFORSS = 'Mostrar estadístiques quan es fa clic al número de la resolució';
var PROPERTY_PRINTSCR = 'imprimir barreja/es a estadístiques';
var PROPERTY_PRINTCOMM = 'print comment(s) in statistics';
var PROPERTY_PRINTDATE = 'imprimir data de resolució a estadístiques';
var PROPERTY_SUMMARY = 'mostrar resum abans de llista de temps';
var PROPERTY_IMRENAME = 'canviar el nom de la sessió immediatament després de creació';
var PROPERTY_SCR2SS = 'crear nova sessió després de canviar tipus de barreja';
var PROPERTY_SS2SCR = 'restaurar tipus de barreja en canviar de sessió';
var PROPERTY_SS2PHASES = 'restaurar multi-fase quan canvii de sessió';
var PROPERTY_STATINV = 'Llista de temps invers';
var PROPERTY_STATSSUM = 'Show sum in time list';
var PROPERTY_STATTHRES = 'Mostrar objectiu de temps per al millor de sessió';
var PROPERTY_STATBPA = 'Show best possible average (BPA)';
var PROPERTY_STATWPA = 'Show worst possible average (WPA)';
var PROPERTY_STATAL = 'Indicadors d\'estadística';
var PROPERTY_STATALU = 'Indicador d\'estadística personalitzat';
var PROPERTY_HLPBS = 'Highlight PBs';
var PROPERTY_HLPBS_STR = 'Dark orange as WCA|As link color|Bolder|None';
var PROPERTY_DELMUL = 'Habilitar Esborrat Multiple';
var PROPERTY_TOOLSFUNC = 'Funcions seleccionades';
var PROPERTY_TRIM = 'Nombre de resolucions no contants a cada costat';
var PROPERTY_TRIMR = 'Number of solves trimmed at worse side';
var PROPERTY_TRIM_MED = 'Mitjana';
var PROPERTY_STKHEAD = 'Utilitzar Informació d\'Estat de Stackmat';
var PROPERTY_TOOLPOS = 'Tools panel position';
var PROPERTY_TOOLPOS_STR = 'Bottom|Float|Top';
var PROPERTY_HIDEFULLSOL = 'Mostrar resolució progressivament';
var PROPERTY_IMPPREV = 'Importar dades no més recents';
var PROPERTY_AUTOEXP = 'Exportar automàticament (per cada 100 resolucions)';
var PROPERTY_AUTOEXP_OPT = 'Mai|A un Arxiu|Amb ID csTimer|Amb un compte WCA|Amb un compte Google|Alert Only';
var PROPERTY_SCRASIZE = 'Tamany automàtic de barreja';
var MODULE_NAMES = {
	"kernel": 'Global',
	"ui": 'visualització',
	"color": 'color',
	"timer": 'cronòmetre',
	"scramble": 'barreja',
	"stats": 'estadística',
	"tools": 'eines',
	"vrc": 'virtual i<br>bluetooth'
};
var BGIMAGE_URL = 'enganxeu URL de la imatge';
var BGIMAGE_INVALID = 'url invàlid';
var BGIMAGE_OPACITY = 'opacitat de la imatge de fons';
var BGIMAGE_IMAGE = 'imatge de fons';
var BGIMAGE_IMAGE_STR = 'cap|manual|CCT';
var SHOW_AVG_LABEL = 'Mostrar Mitjanes';
var SHOW_DIFF_LABEL = 'Show Difference Label';
var SHOW_DIFF_LABEL_STR = '-Green+Red|-Red+Green|Normal|None';
var USE_LOGOHINT = 'missatges de pista al logo';
var TOOLS_SCRGEN = 'Generador de Barrejes';
var SCRGEN_NSCR = 'Número de barrejes';
var SCRGEN_PRE = 'prefix';
var SCRGEN_GEN = 'Generar Barrejes!';
var VRCREPLAY_TITLE = 'Virtual Replay';
var VRCREPLAY_ORI = 'raw ori|auto ori';
var VRCREPLAY_SHARE = 'share link';
var GIIKER_CONNECT = 'Click to connect';
var GIIKER_RESET = 'Reset (Mark Solved)';
var GIIKER_REQMACMSG = 'Please enter the MAC address of your smart hardware (xx:xx:xx:xx:xx:xx). You can find the MAC address through chrome://bluetooth-internals/#devices, or modify following options to let csTimer automatically obtain it:\nChrome: Turn on chrome://flags/#enable-experimental-web-platform-features\nBluefy: Turn on Enable BLE Advertisements';
var GIIKER_NOBLEMSG = 'Bluetooth API is not available. Ensure https access, check bluetooth is enabled on your device, and try chrome with chrome://flags/#enable-experimental-web-platform-features enabled';
var PROPERTY_SHOWAD = 'Show advertisements (take effect after reload)';
var PROPERTY_GIIORI = 'Cube orientation';
var LGHINT_INVALID = 'Invalid Value!';
var LGHINT_NETERR = 'Network Error!';
var LGHINT_SERVERR = 'Server Error!';
var LGHINT_SUBMITED = 'Submitted';
var LGHINT_SSBEST = 'Session best %s!';
var LGHINT_SCRCOPY = 'Scramble copied';
var LGHINT_LINKCOPY = 'Share link copied';
var LGHINT_SOLVCOPY = 'Solve copied';
var LGHINT_SORT0 = 'Already sorted';
var LGHINT_IMPORTED = 'Import %d session(s)';
var LGHINT_IMPORT0 = 'No session imported';
var LGHINT_BTCONSUC = 'Bluetooth successfully connected';
var LGHINT_BTDISCON = 'Bluetooth disconnected';
var LGHINT_BTNOTSUP = 'Not support your smart cube';
var LGHINT_BTINVMAC = 'Not a valid mac address, cannot connect to your smart cube';
var LGHINT_AEXPABT = 'Auto export abort';
var LGHINT_AEXPSUC = 'Auto export success';
var LGHINT_AEXPFAL = 'Auto export failed';
var EASY_SCRAMBLE_HINT = 'Change length to limit upper bound of solution length, input 2 digits to limit both lower (<= 8) and upper bound';
