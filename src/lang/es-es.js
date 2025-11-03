var OK_LANG = 'Aceptar';
var CANCEL_LANG = 'Cancelar';
var RESET_LANG = 'Resetear';
var ABOUT_LANG = 'Acerca de';
var ZOOM_LANG = 'Distancia de visión';
var COPY_LANG = 'Copiar';
var BUTTON_TIME_LIST = 'LISTA DE<br>TIEMPOS';
var BUTTON_OPTIONS = 'OPCIO-<br>NES';
var BUTTON_EXPORT = 'EXPORTAR';
var BUTTON_DONATE = 'DONAR';
var PROPERTY_SR = 'Con sesión';
var PROPERTY_USEINS = 'Usar inspección de WCA';
var PROPERTY_USEINS_STR = 'Siempre (abajo) | Siempre (arriba) | Excepto BLD (abajo) | Excepto BLD (arriba) | Nunca';
var PROPERTY_SHOWINS = 'Show an icon when inspection is enabled';
var PROPERTY_VOICEINS = 'voz de alerta en la inspección de la WCA';
var PROPERTY_VOICEINS_STR = 'Ninguna | Voz masculina | Voz femenina';
var PROPERTY_VOICEVOL = 'Volumen de voz';
var PROPERTY_PHASES = 'Multi-fase';
var PROPERTY_TIMERSIZE = 'Tamaño del cronómetro';
var PROPERTY_USEMILLI = 'Usar milisegundos';
var PROPERTY_SMALLADP = 'Usar fuente pequeña después del punto decimal';
var PROPERTY_SCRSIZE = 'Tamaño de la mezcla';
var PROPERTY_SCRMONO = 'Mezcla monoespaciada';
var PROPERTY_SCRLIM = 'Limitar la altura de la zona de mezcla';
var PROPERTY_SCRALIGN = 'Alineación del área de scramble';
var PROPERTY_SCRALIGN_STR = 'Centro | Izquierda | Derecha';
var PROPERTY_SCRWRAP = 'Scramble Wrap';
var PROPERTY_SCRWRAP_STR = 'Equilibrado|Normal';
var PROPERTY_SCRNEUT = 'Color neutral';
var PROPERTY_SCRNEUT_STR = 'None|Single face|Double faces|Six faces';
var PROPERTY_SCREQPR = 'Probabilities for training-scramble states';
var PROPERTY_SCREQPR_STR = 'Actual|Equal|Random order';
var PROPERTY_SCRFAST = 'Usar scramble rápido para 4x4x4 (no oficial)';
var PROPERTY_SCRKEYM = 'Movimiento(s) clave de la etiqueta en el scramble';
var PROPERTY_SCRCLK = 'Acción al hacer clic en mezcla';
var PROPERTY_SCRCLK_STR = 'Ninguno|Copiar|Siguiente mezcla';
var PROPERTY_WNDSCR = 'Estilo de la visualización del panel del scramble';
var PROPERTY_WNDSTAT = 'Estilo de visualización del panel de las estadísticas';
var PROPERTY_WNDTOOL = 'Estilo de la visualización del panel de las herramientas';
var PROPERTY_WND_STR = 'Normal | Plano';
var EXPORT_DATAEXPORT = 'Exportación/importación de datos';
var EXPORT_TOFILE = 'Exportar al archivo';
var EXPORT_FROMFILE = 'Importar del archivo';
var EXPORT_TOSERV = 'Exportar al servidor';
var EXPORT_FROMSERV = 'Importar del servidor';
var EXPORT_FROMOTHER = 'Importar sesión(es) de otros cronómetros';
var EXPORT_USERID = 'Por favor, introduzca su cuenta (sólo letras o números)';
var EXPORT_INVID = '¡Sólo se permiten letras o números!';
var EXPORT_ERROR = 'Ha ocurrido un error...';
var EXPORT_NODATA = 'No se encontraron datos para tu cuenta';
var EXPORT_UPLOADED = 'Subido exitosamente';
var EXPORT_CODEPROMPT = 'Guardar este código, o escriba el código guardado para importar';
var EXPORT_ONLYOPT = 'Opciones de sólo exportar/importar';
var EXPORT_ACCOUNT = 'Exportar cuentas';
var EXPORT_LOGINGGL = 'Iniciar sesión usando la cuenta de Google';
var EXPORT_LOGINWCA = 'Iniciar sesión usando su cuenta de WCA';
var EXPORT_LOGOUTCFM = '¿Confirmar para cerrar sesión?';
var EXPORT_LOGINAUTHED = 'Autorizado<br>Recolectando información...';
var EXPORT_AEXPALERT = 'More than %d solves since last backup';
var EXPORT_WHICH = 'You have %d file(s), which one should be imported?';
var EXPORT_WHICH_ITEM = '%s solución/es, subidas al %t';
var IMPORT_FINAL_CONFIRM = '¡Esto sobreescribirá todos los datos locales! Modificará %d sesiones, añadirá %a y quitará %r resoluciones. ¿Seguro que quieres importar los datos?';
var BUTTON_SCRAMBLE = 'MEZCLA';
var BUTTON_TOOLS = 'HERRA-<br>MIENTAS';
var IMAGE_UNAVAILABLE = 'No disponible para este tipo de mezclas';
var TOOLS_SELECTFUNC = 'Función';
var TOOLS_CROSS = 'Resolver cruz';
var TOOLS_EOLINE = 'Resolver EOLine';
var TOOLS_ROUX1 = 'Resolver Roux S1';
var TOOLS_222FACE = 'Cara 2x2x2';
var TOOLS_GIIKER = 'Cubo Giiker';
var TOOLS_IMAGE = 'Imagen de la mezcla';
var TOOLS_STATS = 'Estadísticas';
var TOOLS_HUGESTATS = 'estadísticas de la sesión de cruz';
var TOOLS_DISTRIBUTION = 'Distribución de tiempos';
var TOOLS_TREND = 'Tendencia del tiempo';
var TOOLS_METRONOME = 'Metrónomo';
var TOOLS_RECONS = 'Reconstruir';
var TOOLS_RECONS_NODATA = 'No se encontró ninguna solución.';
var TOOLS_RECONS_TITLE = 'insp|exec|turn|tps';
var TOOLS_TRAINSTAT = 'Training Stat.';
var TOOLS_BLDHELPER = 'BLD Helper';
var TOOLS_CFMTIME = 'Confirmar tiempo ';
var TOOLS_SOLVERS = 'Solucionadores';
var TOOLS_DLYSTAT = 'Estadísticas diarias';
var TOOLS_DLYSTAT1 = 'Period|Start of Day|Week';
var TOOLS_DLYSTAT_OPT1 = 'day|week|month|year';
var TOOLS_DLYSTAT_OPT2 = 'Sun|Mon|Tue|Wed|Thu|Fri|Sat';
var TOOLS_SYNCSEED = 'Mezclado común';
var TOOLS_SYNCSEED_SEED = 'Semilla';
var TOOLS_SYNCSEED_INPUT = 'Ingreso de semilla';
var TOOLS_SYNCSEED_30S = 'Usar semilla de 30s';
var TOOLS_SYNCSEED_HELP = 'If enabled, scramble will only depend on the seed and scramble settings.';
var TOOLS_SYNCSEED_DISABLE = '¿Desactivar la semilla actual?';
var TOOLS_SYNCSEED_INPUTA = 'Ingrese un valor (a-zA-Z0-9) como semilla';
var TOOLS_BATTLE = 'Batalla en línea';
var TOOLS_BATTLE_HEAD = 'Room|Join Room';
var TOOLS_BATTLE_TITLE = 'Rank|Status|Time';
var TOOLS_BATTLE_STATUS = 'Ready|Inspect|Solving|Solved|Lost';
var TOOLS_BATTLE_INFO = 'Join a battle room with your friend, then you will battle together.';
var TOOLS_BATTLE_JOINALERT = 'Introduzca el ID de la sala por favor';
var TOOLS_BATTLE_LEAVEALERT = 'Leave current room';
var OLCOMP_UPDATELIST = 'Actualizar Lista de Competición';
var OLCOMP_VIEWRESULT = 'Ver resultado';
var OLCOMP_VIEWMYRESULT = 'Mi historia';
var OLCOMP_START = '¡Empezar!';
var OLCOMP_SUBMIT = '¡Enviar!';
var OLCOMP_SUBMITAS = 'Enviar como: ';
var OLCOMP_WCANOTICE = '¿Enviar como su cuenta WCA? (Recargar si no es reconocido después del envío)';
var OLCOMP_OLCOMP = 'Competición en línea';
var OLCOMP_ANONYM = 'Anónimo';
var OLCOMP_ME = 'Yo';
var OLCOMP_WCAACCOUNT = 'Cuenta WCA';
var OLCOMP_ABORT = '¿Abortar la competencia y mostrar resultados?';
var OLCOMP_WITHANONYM = 'Con anónimo';
var PROPERTY_IMGSIZE = 'Tamaño de la imagen de la mezcla';
var PROPERTY_IMGREP = 'Show virtual cube animation when clicking scramble image';
var TIMER_INSPECT = 'Inspección';
var TIMER_SOLVE = 'Resolución';
var PROPERTY_USEMOUSE = 'Usar cronómetro del ratón';
var PROPERTY_TIMEU = 'Frecuencia del cronómetro';
var PROPERTY_TIMEU_STR = 'normal|0.1s|segundos|solo inspección|nada';
var PROPERTY_PRETIME = 'Tiempo manteniendo la barra espaciadora (en segundo(s))';
var PROPERTY_ENTERING = 'Introducir tiempos con';
var PROPERTY_ENTERING_STR = 'teclado|manualmente|stackmat|MoYuTimer|virtual|Bluetooth Cube|qCube|Bluetooth Timer|last layer training';
var PROPERTY_INTUNIT = 'Unidad al introducir un entero';
var PROPERTY_INTUNIT_STR = 'segundo|centísegundo|milisegundo';
var PROPERTY_COLOR = 'Selecciona el color';
var PROPERTY_COLORS = 'Color de la fuente | Color del fondo | Color del tablero | Color de los botones | Color del link | Color del logo | Color del fondo del logo';
var PROPERTY_VIEW = 'Estilo de la interfaz del usuario';
var PROPERTY_VIEW_STR = 'Automática | Móvil | Escritorio';
var PROPERTY_UIDESIGN = 'El diseño de interfaz de usuario es';
var PROPERTY_UIDESIGN_STR = 'Normal|Diseño material|Normal sin sombras|Diseño material sin sombras';
var COLOR_EXPORT = 'Por favor, guarde el código para importar';
var COLOR_IMPORT = 'Por favor inserte el código exportado';
var COLOR_FAIL = 'Datos incorrectos, importación fallida';
var PROPERTY_FONTCOLOR_STR = 'Negro | Blanco';
var PROPERTY_COLOR_STR = 'manual|import/export...|Aleatorio|Estilo 1|Estilo 2|Estilo 3|Negro|Blanco|Estilo 6|solarized dark|solarized light';
var PROPERTY_FONT = 'Selecciona la fuente del cronómetro';
var PROPERTY_FONT_STR = 'Digital aleatorio|Normal|Digital 1|Digital 2|Digital 3|Digital 4|Digital 5';
var PROPERTY_FORMAT = 'Formato de tiempos';
var PROPERTY_USEKSC = 'Usar atajos de teclado';
var PROPERTY_USEGES = 'use gesture control';
var PROPERTY_NTOOLS = 'Número de herramientas';
var PROPERTY_AHIDE = 'Ocultar todos los elementos cuando se cronometra';
var SCRAMBLE_LAST = 'última';
var SCRAMBLE_NEXT = 'siguiente';
var SCRAMBLE_SCRAMBLE = ' mezcla';
var SCRAMBLE_SCRAMBLING = 'Scrambling';
var SCRAMBLE_LENGTH = 'Longitud';
var SCRAMBLE_INPUT = 'Introducir mezcla(s)';
var SCRAMBLE_INPUTTYPE = 'Scramble type';
var PROPERTY_VRCSPEED = 'Velocidad base VRC (Giros por segundo)';
var PROPERTY_VRCORI = 'Orientación del cubo virtual';
var PROPERTY_VRCMP = 'Multi-fase';
var PROPERTY_VRCMPS = 'Ninguno | CFOP | CF+OP| CFFFFOP|CFFFFOOPP| Roux';
var PROPERTY_GIIKERVRC = 'Mostral cubo Giiker virtual';
var PROPERTY_GIISOK_DELAY = 'Indicar el final del scramble por el tiempo de espera';
var PROPERTY_GIISOK_DELAYS = '2s | 3s | 4s | 5s | Nunca | Revuelto correctament';
var PROPERTY_GIISOK_KEY = 'Indicar fin del scramble con la barra espaciadora';
var PROPERTY_GIISOK_MOVE = 'Indicar fin del scramble haciendo';
var PROPERTY_GIISOK_MOVES = 'U4, R4, etc | (U U\')2, (U\' U)2, etc. | Nunca';
var PROPERTY_GIISBEEP = 'Sonar cuando el cubo esté scrambleado';
var PROPERTY_GIIRST = 'Resetear el cubo Bluetooth cuando se conecte';
var PROPERTY_GIIRSTS = 'Siempre|Rápido|Nunca';
var PROPERTY_GIIMODE = 'Bluetooth Cube Mode';
var PROPERTY_GIIMODES = 'Normal|Training|Continuous training';
var PROPERTY_VRCAH = 'Useless pieces in huge cube';
var PROPERTY_VRCAHS = 'Hide|Border|Color|Show';
var CONFIRM_GIIRST = '¿Marcar cubo Bluetooth como resuelto?';
var PROPERTY_GIIAED = 'Detección de errores de hardware automática';
var scrdata = [
	['WCA', [
		['3x3x3', "333", 0],
		['2x2x2', "222so", 0],
		['4x4x4', "444wca", -40],
		['5x5x5', "555wca", -60],
		['6x6x6', "666wca", -80],
		['7x7x7', "777wca", -100],
		['3x3x3 BLD', "333ni", 0],
		['3x3 fm', "333fm", 0],
		['3x3 OH', "333oh", 0],
		['Clock', "clkwca", 0],
		['Megaminx', "mgmp", -70],
		['Pyraminx', "pyrso", -10],
		['Skewb', "skbso", 0],
		['Sq-1', "sqrs", 0],
		['4x4 BLD', "444bld", -40],
		['5x5 BLD', "555bld", -60],
		['MBLD', "r3ni", 5]
	]],
	['Introducir', [
		['外部', "input", 0],
		['Competencia', "remoteComp", 0],
		['Batalla en línea', "remoteBattle", 0],
		['Remote', "remoteOther", 0]
	]],
	['===WCA===', [
		['--', "blank", 0]
	]],
	['Cubo de 333', [
		["estado aleatorio (WCA)", "333", 0],
		['movimiento aleatorio', "333o", 25],
		['Para principiantes', "333noob", 25],
		['Sólo aristas', "edges", 0],
		['Sólo esquinas', "corners", 0],
		['BLD Helper', "nocache_333bldspec", 0],
		['Pattern Tool', "nocache_333patspec", 0],
		['3x3 ft', "333ft", 0],
		['Custom', "333custom", 0]
	]],
	['Cubo de 333 CFOP', [
		['PLL', "pll", 0],
		['OLL', "oll", 0],
		['Última capa y último par', "lsll2", 0],
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
		['Cruz resuelta', "f2l", 0],
		['EOLine(EOLínea)', "eoline", 0],
		['EO Cross', "eocross", 0],
		['Cruz sencilla', "easyc", 3],
		['easy xcross', "easyxc", 4]
	]],
	['Cubo de 333 Roux', [
		['2nd Block', "sbrx", 0],
		['CMLL', "cmll", 0],
		['LSE', "lse", 0],
		['LSE &lt;M, U&gt;', "lsemu", 0]
	]],
	['Cubo de 333 Mehta', [
		['3QB', "mt3qb", 0],
		['EOLE', "mteole", 0],
		['TDR', "mttdr", 0],
		['6CP', "mt6cp", 0],
		['CDRLL', "mtcdrll", 0],
		['L5EP', "mtl5ep", 0],
		['TTLL', "ttll", 0]
	]],
	['2x2x2', [
		["estado aleatorio (WCA)", "222so", 0],
		['óptimo', "222o", 0],
		['3-gen', "2223", 25],
		['EG', "222eg", 0],
		['CLL', "222eg0", 0],
		['EG1', "222eg1", 0],
		['EG2', "222eg2", 0],
		['TCLL+', "222tcp", 0],
		['TCLL-', "222tcn", 0],
		['TCLL', "222tc", 0],
		['LS', "222lsall", 0],
		['Sin barra', "222nb", 0]
	]],
	['Cubo de 444', [
		["WCA", "444wca", -40],
		['aleatorio mover', "444m", 40],
		['SiGN', "444", 40],
		['YJ', "444yj", 40],
		['Aristas 4x4', "4edge", 0],
		['R,r,U,u', "RrUu", 40],
		['Last layer', "444ll", 0],
		['ELL', "444ell", 0],
		['Edge only', "444edo", 0],
		['Center only', "444cto", 0]
	]],
	['Cubo de 444 Yau/Hoya', [
		['UD center solved', "444ctud", 0],
		['UD+3E solved', "444ud3c", 0],
		['Last 8 dedges', "444l8e", 0],
		['RL center solved', "444ctrl", 0],
		['RLDX center solved', "444rlda", 0],
		['RLDX cross solved', "444rlca", 0]
	]],
	['Cubo de 555', [
		["WCA", "555wca", 60],
		['SiGN', "555", 60],
		['Aristas de 5x5x5', "5edge", 8]
	]],
	['Cubo de 666', [
		["WCA", "666wca", 80],
		['SiGN', "666si", 80],
		['Prefijo', "666p", 80],
		['Sufijo', "666s", 80],
		['Aristas de 6x6x6', "6edge", 8]
	]],
	['Cubo de 777', [
		["WCA", "777wca", 100],
		['SiGN', "777si", 100],
		['prefix', "777p", 100],
		['suffix', "777s", 100],
		['Aristas de 7x7x7', "7edge", 8]
	]],
	['Reloj de Rubi', [
		['WCA', "clkwca", 0],
		['wca (old)', "clkwcab", 0],
		['WCA w/o y2', "clknf", 0],
		['jaap', "clk", 0],
		['óptimo', "clko", 0],
		['conciso', "clkc", 0],
		['orden de pin eficiente', "clke", 0]
	]],
	['Magaminx', [
		["WCA", "mgmp", 70],
		['Carrot', "mgmc", 70],
		['Antiguo estilo', "mgmo", 70],
		['Sólo movimientos R,U', "minx2g", 30],
		['última capa + último hueco', "mlsll", 0],
		['PLL', "mgmpll", 0],
		['Last Layer', "mgmll", 0]
	]],
	['Pyraminx', [
		["estado aleatorio (WCA)", "pyrso", 10],
		['óptimo', "pyro", 0],
		['movimiento aleatorio', "pyrm", 25],
		['L4E', "pyrl4e", 0],
		['4 tips', "pyr4c", 0],
		['No bar', "pyrnb", 0]
	]],
	['Skewb', [
		["estado aleatorio (WCA)", "skbso", 0],
		['óptimo', "skbo", 0],
		['movimiento aleatorio', "skb", 25],
		['No bar', "skbnb", 0]
	]],
	['Square-1', [
		["estado aleatorio (WCA)", "sqrs", 0],
		["CSP", "sqrcsp", 0],
		["PLL", "sq1pll", 0],
		['cara vuelta métrica', "sq1h", 40],
		['giro métrico', "sq1t", 20]
	]],
	['===OTROS===', [
		['--', "blank", 0]
	]],
	['15 puzzle', [
		['estado aleatorio URLD', "15prp", 0],
		['estado aleatorio ^<>v', "15prap", 0],
		['estado aleatorio Blank', "15prmp", 0],
		['movimiento aleatorio URLD', "15p", 80],
		['movimiento aleatorio ^<>v', "15pat", 80],
		['movimiento aleatorio Blank', "15pm", 80]
	]],
	['8 puzzle', [
		['estado aleatorio URLD', "8prp", 0],
		['estado aleatorio ^<>v', "8prap", 0],
		['estado aleatorio Blank', "8prmp", 0]
	]],
	['LxMxN', [
		['1x3x3 (Cubo Flexible)', "133", 0],
		['2x2x3 (Cubo Torre)', "223", 0],
		['2x3x3 (Domino)', "233", 25],
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
	['Cubo de engranajes', [
		['estado aleatorio', "gearso", 0],
		['óptimo', "gearo", 0],
		['movimiento aleatorio', "gear", 10]
	]],
	['Kilominx', [
		['estado aleatorio', "klmso", 0],
		['Pochmann', "klmp", 30]
	]],
	['Gigaminx', [
		['Pochmann', "giga", 300]
	]],
	['Crazy Puzzle', [
		['Crazy 3x3x3', "crz3a", 30]
	]],
	['Cmetrico', [
		['Cmetrico', "cm3", 25],
		['Mini Cmetrick', "cm2", 25]
	]],
	['Cubo helicóptero', [
		['Heli copter', "heli", 40],
		['Curvy copter', "helicv", 40],
		['2x2 Heli random move', "heli2x2", 70],
		['2x2 Heli by group', "heli2x2g", 5]
	]],
	['Redi Cube', [
		['estado aleatorio', "rediso", 0],
		['MoYu', "redim", 8],
		['movimiento aleatorio', "redi", 20]
	]],
	['Dino Cube', [
		['estado aleatorio', "dinoso", 0],
		['óptimo', "dinoo", 0]
	]],
	['cubo Ivy', [
		['estado aleatorio', "ivyso", 0],
		['óptimo', "ivyo", 0],
		['movimiento aleatorio', "ivy", 10]
	]],
	['Master Pyraminx', [
		['estado aleatorio', "mpyrso", 0],
		['movimiento aleatorio', "mpyr", 42]
	]],
	['Pyraminx Crystal', [
		['Pochmann', "prcp", 70],
		['Antiguo estilo', "prco", 70]
	]],
	['Cubo Siamés', [
		['Bloque 1x1x3', "sia113", 25],
		['Bloque 1x2x3', "sia123", 25],
		['Bloque 2x2x2', "sia222", 25]
	]],
	['Square', [
		['Square-2', "sq2", 20],
		['Super Square-1', "ssq1t", 20]
	]],
	['Super Floppy', [
		[' ', "sfl", 25]
	]],
	['UFO', [
		['Estilo Jaap', "ufo", 25]
	]],
	['FTO (Octaedro de giro por caras)', [
		['estado aleatorio', "ftoso", 0],
		['movimiento aleatorio', "fto", 30],
		['L3T', "ftol3t", 0],
		['L3T+LBT', "ftol4t", 0],
		['TCP', "ftotcp", 0],
		['edges only', "ftoedge", 0],
		['centers only', "ftocent", 0],
		['corners only', "ftocorn", 0],
		['Diamond estado aleatorio', "dmdso", 0]
	]],
	['Icosahedron', [
		['Icosamate movimiento aleatorio', "ctico", 60]
	]],
	['===ESPECIAL===', [
		['--', "blank", 0]
	]],
	['Subconjuntos de 3x3x3', [
		['Sólo movimientos R,U', "2gen", 0],
		['Sólo movimientos L,U', "2genl", 0],
		['Sólo movimientos de Roux M,U', "roux", 0],
		['Sólo movimiéntos F,R,U', "3gen_F", 0],
		['Sólo movimientos R,U,L', "3gen_L", 0],
		['Sólo movimientos R,r,U', "RrU", 0],
		['Domino Subgroup', "333drud", 0],
		['Sólo giros a medias', "half", 0],
		['última capa + último hueco (antiguo)', "lsll", 15]
	]],
	['Cubo con bloqueos', [
		['Bicube', "bic", 30],
		['Square-1/,(1,0)', "bsq", 25]
	]],
	['Relays', [
		['Muchos 3x3x3s', "r3", 5],
		['Relay 2-3-4', "r234", 0],
		['Relay 2-3-4-5', "r2345", 0],
		['Relay 2-3-4-5-6', "r23456", 0],
		['Relay 2-3-4-5-6-7', "r234567", 0],
		['Relay 2-3-4 (WCA)', "r234w", 0],
		['Relay 2-3-4-5 (WCA)', "r2345w", 0],
		['Relay 2-3-4-5-6 (WCA)', "r23456w", 0],
		['Relay 2-3-4-5-6-7 (WCA)', "r234567w", 0],
		['Mini Guildford', "rmngf", 0]
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
var SCROPT_TITLE = 'Scramble Options';
var SCROPT_BTNALL = 'Full';
var SCROPT_BTNNONE = 'Clear';
var SCROPT_EMPTYALT = 'Por favor, seleccione al menos un caso';
var STATS_CFM_RESET = '¿Desea reiniciar todos los tiempos de la sesión?';
var STATS_CFM_DELSS = '¿Seguro que quieres eliminar la sesión [%s]?';
var STATS_CFM_DELMUL = '¿Cuántos valores quieres eliminar desde este tiempo?';
var STATS_CFM_DELETE = '¿Desea eliminar este tiempo?';
var STATS_COMMENT = 'Comentario';
var STATS_REVIEW = 'Revisión';
var STATS_DATE = 'Fecha';
var STATS_SSSTAT = 'Estadística de 1 solución.';
var STATS_SSRETRY = 'Retry';
var STATS_CURROUND = 'Estadísticas de la ronda actual';
var STATS_CURSESSION = 'Estadísticas de la sesión actual';
var STATS_CURSPLIT = 'Fase %d de las estadísticas de la sesión actual';
var STATS_EXPORTCSV = 'Exportar CSV';
var STATS_SSMGR_TITLE = 'Gestor de sesiones';
var STATS_SSMGR_NAME = 'Nombre';
var STATS_SSMGR_DETAIL = 'Detalles de la sesión';
var STATS_SSMGR_OPS = 'Renombrar|Crear|Dividir|Fusionar|Borrar|Ordenar|Merge&Dedupe';
var STATS_SSMGR_ORDER = 'Ordenar por mezclas';
var STATS_SSMGR_ODCFM = '¿Ordenar todas las sesiones por mezcla?';
var STATS_SSMGR_SORTCFM = '%d solución(es) serán reordenadas, ¿confirmar?';
var STATS_ALERTMG = 'Fusionar todas las horas de la sesión [%f] al final de la sesión [%t]?';
var STATS_PROMPTSPL = '¿Número de últimas veces dividido de la sesión [%s]?';
var STATS_ALERTSPL = 'Debe dividirse o dejar 1 vez al menos';
var STATS_AVG = 'Media';
var STATS_SUM = 'sum';
var STATS_SOLVE = 'Resolución';
var STATS_TIME = 'Tiempo';
var STATS_SESSION = 'Sesión';
var STATS_SESSION_NAME = 'Editar nombre de sesión';
var STATS_SESSION_NAMEC = 'Nombre de la nueva sesión';
var STATS_STRING = 'Mejor|Actual|Peor|Generado por csTimer el %Y-%M-%D|resoluciones/total: %d|Single|Media de %mk|Avg de %mk|Average: %v{ (σ = %sgm)}|Media: %v|Lista de tiempos:|solving from %s to %e|Totally spent: %d|target';
var STATS_PREC = 'Precisión de la distribución de tiempos';
var STATS_PREC_STR = 'auto|0.1s|0.2s|0.5s|1s|2s|5s|10s|20s|50s|100s';
var STATS_TYPELEN = 'lista %d tipo|lista %d longitud|promedio|media';
var STATS_STATCLR = 'Habilitar vaciado de sesión';
var STATS_ABSIDX = 'Mostrar índice absoluto en el informe de estadísticas';
var STATS_XSESSION_DATE = 'Cualquier fecha|Últimas 24 horas|Últimos 7 días|Últimos 30 días|Últimos 365 días';
var STATS_XSESSION_NAME = 'cualquier nombre';
var STATS_XSESSION_SCR = 'cualquier mezcla';
var STATS_XSESSION_CALC = 'Cálculo';
var STATS_RSFORSS = 'Mostrar estadística al hacer clic en resolver número';
var PROPERTY_PRINTSCR = 'Publicar mezcla(s) en las estadísticas.';
var PROPERTY_PRINTCOMM = 'print comment(s) in statistics';
var PROPERTY_PRINTDATE = 'imprimir fecha de resolución en estadísticas';
var PROPERTY_SUMMARY = 'mostrar resumen antes de la lista de tiempos';
var PROPERTY_IMRENAME = 'renombrar sesión inmediatamente después de la creación';
var PROPERTY_SCR2SS = 'crear una nueva sesión al cambiar el tipo de scramble';
var PROPERTY_SS2SCR = 'restaurar el tipo de mezcla al cambiar de sesión';
var PROPERTY_SS2PHASES = 'Conservar tiempo multi-fase al cambiar de sesión';
var PROPERTY_STATINV = 'Lista de tiempo inversa';
var PROPERTY_STATSSUM = 'Mostrar suma en la lista de tiempos';
var PROPERTY_STATTHRES = 'Show target time for session best';
var PROPERTY_STATBPA = 'Show best possible average (BPA)';
var PROPERTY_STATWPA = 'Show worst possible average (WPA)';
var PROPERTY_STATAL = 'Indicadores estáticos';
var PROPERTY_STATALU = 'Indicador estadístico personalizado';
var PROPERTY_HLPBS = 'Highlight PBs';
var PROPERTY_HLPBS_STR = 'Dark orange as WCA|As link color|Bolder|None';
var PROPERTY_DELMUL = 'Habilitar eliminación múltiple';
var PROPERTY_TOOLSFUNC = 'Funciones seleccionadas';
var PROPERTY_TRIM = 'Cantidad de soluciones recortadas a cada lado';
var PROPERTY_TRIMR = 'Number of solves trimmed at worse side';
var PROPERTY_TRIM_MED = 'Media';
var PROPERTY_STKHEAD = 'Usar información de estado de Stackmat';
var PROPERTY_TOOLPOS = 'Tools panel position';
var PROPERTY_TOOLPOS_STR = 'Bottom|Float|Top';
var PROPERTY_HIDEFULLSOL = 'Mostrar la solución progresivamente';
var PROPERTY_IMPPREV = 'Importar datos no actualizados';
var PROPERTY_AUTOEXP = 'Auto Exportación (por 100 soluciones)';
var PROPERTY_AUTOEXP_OPT = 'Nunca|A archivo|Con csTimer ID|Con cuenta WCA|Con cuenta Google|Alert Only';
var PROPERTY_SCRASIZE = 'Tamaño de la mezcla automático';
var MODULE_NAMES = {
	"kernel": 'Global',
	"ui": 'Interfaz',
	"color": 'Color',
	"timer": 'Cronómetro',
	"scramble": 'Mezclas',
	"stats": 'Estadísticas',
	"tools": 'Herramientas',
	"vrc": 'virtual&<br>bluetooth'
};
var BGIMAGE_URL = 'Por favor, introduce la url de la imagen';
var BGIMAGE_INVALID = 'Url inválida';
var BGIMAGE_OPACITY = 'Opacidad de la imagen de fondo';
var BGIMAGE_IMAGE = 'Imagen de fondo';
var BGIMAGE_IMAGE_STR = 'ninguna|manual|CCT';
var SHOW_AVG_LABEL = 'Mostrar la información de avg';
var SHOW_DIFF_LABEL = 'Show Difference Label';
var SHOW_DIFF_LABEL_STR = '-Green+Red|-Red+Green|Normal|None';
var USE_LOGOHINT = 'Mensajes de sugerencias en el logo';
var TOOLS_SCRGEN = 'Generador de mezcla';
var SCRGEN_NSCR = 'Número de mezclas';
var SCRGEN_PRE = 'Prefijo';
var SCRGEN_GEN = 'Generar mezclas';
var VRCREPLAY_TITLE = 'Virtual Replay';
var VRCREPLAY_ORI = 'raw ori|auto ori';
var VRCREPLAY_SHARE = 'compartir enlace';
var GIIKER_CONNECT = 'Clica aquí para conectar';
var GIIKER_RESET = 'Reset (Mark Solved)';
var GIIKER_REQMACMSG = 'Please enter the MAC address of your smart hardware (xx:xx:xx:xx:xx:xx). You can find the MAC address through chrome://bluetooth-internals/#devices, or modify following options to let csTimer automatically obtain it:\nChrome: Turn on chrome://flags/#enable-experimental-web-platform-features\nBluefy: Turn on Enable BLE Advertisements';
var GIIKER_NOBLEMSG = 'Bluetooth API is not available. Ensure https access, check bluetooth is enabled on your device, and try chrome with chrome://flags/#enable-experimental-web-platform-features enabled';
var PROPERTY_SHOWAD = 'Show advertisements (take effect after reload)';
var PROPERTY_GIIORI = 'Orientación del cubo';
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
