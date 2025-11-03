var OK_LANG = 'Добре';
var CANCEL_LANG = 'Відмінити';
var RESET_LANG = 'Скинути';
var ABOUT_LANG = 'Більше про це';
var ZOOM_LANG = 'Масштабування';
var COPY_LANG = 'Скопіювати';
var BUTTON_TIME_LIST = 'Список<br>РАЗІВ';
var BUTTON_OPTIONS = 'ПАРАМЕТР';
var BUTTON_EXPORT = 'ЕКСПОРТ';
var BUTTON_DONATE = 'ПОЖЕРТВУВАТИ';
var PROPERTY_SR = 'З сесією';
var PROPERTY_USEINS = 'використовувати WCA інспекцію';
var PROPERTY_USEINS_STR = 'Always (down)|Always (up)|Except BLD (down)|Except BLD (up)|Never';
var PROPERTY_SHOWINS = 'Показувати іконку, коли інспекція увімкнена';
var PROPERTY_VOICEINS = 'голосове попередження інспекції WCA';
var PROPERTY_VOICEINS_STR = 'Не використовується | чоловічий голос | жіночий голос';
var PROPERTY_VOICEVOL = 'Voice volume';
var PROPERTY_PHASES = 'мультифаза';
var PROPERTY_TIMERSIZE = 'Розмір таймеру';
var PROPERTY_USEMILLI = 'Використовувати мілісекунди';
var PROPERTY_SMALLADP = 'використовувати малий шрифт після десяткової точки';
var PROPERTY_SCRSIZE = 'Розмір скрамблу';
var PROPERTY_SCRMONO = 'monospaced scramble';
var PROPERTY_SCRLIM = 'Limit the height of scramble area';
var PROPERTY_SCRALIGN = 'Alignment of scramble area';
var PROPERTY_SCRALIGN_STR = 'Центр|ліворуч|праворуч';
var PROPERTY_SCRWRAP = 'Scramble Wrap';
var PROPERTY_SCRWRAP_STR = 'Balanced|Normal';
var PROPERTY_SCRNEUT = 'Color neutral';
var PROPERTY_SCRNEUT_STR = 'None|Single face|Double faces|Six faces';
var PROPERTY_SCREQPR = 'Probabilities for training-scramble states';
var PROPERTY_SCREQPR_STR = 'Actual|Equal|Random order';
var PROPERTY_SCRFAST = 'Використання швидкого скрамблу для 4х4х4 (неофіційно)';
var PROPERTY_SCRKEYM = 'Label key move(s) in scramble';
var PROPERTY_SCRCLK = 'Action when clicking scramble';
var PROPERTY_SCRCLK_STR = 'None|Copy|Next scramble';
var PROPERTY_WNDSCR = 'Scramble panel display style';
var PROPERTY_WNDSTAT = 'Statistics panel display style';
var PROPERTY_WNDTOOL = 'Tools panel display style';
var PROPERTY_WND_STR = 'Нормальний|Плаский';
var EXPORT_DATAEXPORT = 'Імпорт/Експорт даних';
var EXPORT_TOFILE = 'Експортувати до файлу';
var EXPORT_FROMFILE = 'Імпортувати з файлу';
var EXPORT_TOSERV = 'Експортувати на сервер';
var EXPORT_FROMSERV = 'Експортувати з серверу';
var EXPORT_FROMOTHER = 'Імпорт сеансу(-ів) з інших таймерів';
var EXPORT_USERID = 'Please input your account (only alphabet or number)';
var EXPORT_INVID = 'Only alphabet or number is allowed!';
var EXPORT_ERROR = 'Сталася помилка';
var EXPORT_NODATA = 'Немає даних для вашого облікового запису';
var EXPORT_UPLOADED = 'Успішно завантажено';
var EXPORT_CODEPROMPT = 'Save this code, or type saved code to import';
var EXPORT_ONLYOPT = 'Export/Import only Options';
var EXPORT_ACCOUNT = 'Експортувати облікові записи';
var EXPORT_LOGINGGL = 'Увійти за допомогою облікового запису Google';
var EXPORT_LOGINWCA = 'Увійти за допомогою облікового запису WCA';
var EXPORT_LOGOUTCFM = 'Підтвердити вихід?';
var EXPORT_LOGINAUTHED = 'Authorized<br>Fetching Data...';
var EXPORT_AEXPALERT = 'More than %d solves since last backup';
var EXPORT_WHICH = 'Ви маєте %d файл(ів), який необхідно імпортувати?';
var EXPORT_WHICH_ITEM = '%s solve(s), uploaded at %t';
var IMPORT_FINAL_CONFIRM = 'This will override all local data! It will modify %d sessions, add %a and remove %r solves at least. Confirm to import data?';
var BUTTON_SCRAMBLE = 'SCRA-<br>MBLE';
var BUTTON_TOOLS = 'ІНСТРУМЕНТИ';
var IMAGE_UNAVAILABLE = 'Недоступний для цього типу скрамблу';
var TOOLS_SELECTFUNC = 'Функція';
var TOOLS_CROSS = 'Хрест';
var TOOLS_EOLINE = 'EOLine';
var TOOLS_ROUX1 = 'Roux S1';
var TOOLS_222FACE = '2x2x2 face';
var TOOLS_GIIKER = 'Bluetooth Куб';
var TOOLS_IMAGE = 'Зобразити скрамбл';
var TOOLS_STATS = 'Статистика';
var TOOLS_HUGESTATS = 'cross-session stats';
var TOOLS_DISTRIBUTION = 'розподіл часу';
var TOOLS_TREND = 'тенденція часу';
var TOOLS_METRONOME = 'Метроном';
var TOOLS_RECONS = 'Реконструювати';
var TOOLS_RECONS_NODATA = 'No solution found.';
var TOOLS_RECONS_TITLE = 'insp|exec|turn|tps';
var TOOLS_TRAINSTAT = 'Стат. тренування';
var TOOLS_BLDHELPER = 'BLD Helper';
var TOOLS_CFMTIME = 'Підтвердити час';
var TOOLS_SOLVERS = 'Solvers';
var TOOLS_DLYSTAT = 'Daily Statistics';
var TOOLS_DLYSTAT1 = 'Period|Start of Day|Week';
var TOOLS_DLYSTAT_OPT1 = 'day|week|month|year';
var TOOLS_DLYSTAT_OPT2 = 'Sun|Mon|Tue|Wed|Thu|Fri|Sat';
var TOOLS_SYNCSEED = 'Common Scramble';
var TOOLS_SYNCSEED_SEED = 'Seed';
var TOOLS_SYNCSEED_INPUT = 'Input Seed';
var TOOLS_SYNCSEED_30S = 'Use 30s Seed';
var TOOLS_SYNCSEED_HELP = 'If enabled, scramble will only depend on the seed and scramble settings.';
var TOOLS_SYNCSEED_DISABLE = 'Disable current seed?';
var TOOLS_SYNCSEED_INPUTA = 'Input a value (a-zA-Z0-9) as seed';
var TOOLS_BATTLE = 'Online battle';
var TOOLS_BATTLE_HEAD = 'Room|Join Room';
var TOOLS_BATTLE_TITLE = 'Rank|Status|Time';
var TOOLS_BATTLE_STATUS = 'Ready|Inspect|Solving|Solved|Lost';
var TOOLS_BATTLE_INFO = 'Join a battle room with your friend, then you will battle together.';
var TOOLS_BATTLE_JOINALERT = 'Please input the room ID';
var TOOLS_BATTLE_LEAVEALERT = 'Leave current room';
var OLCOMP_UPDATELIST = 'Update Competition List';
var OLCOMP_VIEWRESULT = 'View Result';
var OLCOMP_VIEWMYRESULT = 'My History';
var OLCOMP_START = 'Start!';
var OLCOMP_SUBMIT = 'Submit!';
var OLCOMP_SUBMITAS = 'Submit As: ';
var OLCOMP_WCANOTICE = 'Submit As Your WCA Account? (Relogin if not recognized after submitting)';
var OLCOMP_OLCOMP = 'Online Competition';
var OLCOMP_ANONYM = 'Anonym';
var OLCOMP_ME = 'Me';
var OLCOMP_WCAACCOUNT = 'WCA Account';
var OLCOMP_ABORT = 'Abort competition and show results?';
var OLCOMP_WITHANONYM = 'With Anonym';
var PROPERTY_IMGSIZE = 'Розмір зображення скрамблу';
var PROPERTY_IMGREP = 'Show virtual cube animation when clicking scramble image';
var TIMER_INSPECT = 'Оглянути';
var TIMER_SOLVE = 'Рішення';
var PROPERTY_USEMOUSE = 'використовувати мишу як таймер';
var PROPERTY_TIMEU = 'timer update is';
var PROPERTY_TIMEU_STR = 'update|0.1s|seconds|inspection|none';
var PROPERTY_PRETIME = 'time of keeping space down(second(s))';
var PROPERTY_ENTERING = 'entering in times with';
var PROPERTY_ENTERING_STR = 'timer|typing|stackmat|MoYuTimer|virtual|Bluetooth Cube|qCube|Bluetooth Timer|last layer training';
var PROPERTY_INTUNIT = 'Unit when entering an integer';
var PROPERTY_INTUNIT_STR = 'second|centisecond|millisecond';
var PROPERTY_COLOR = 'Обрати колірну тему';
var PROPERTY_COLORS = 'колір шрифту|колір фону|колір рамки|колір кнопок|колір посилань|колір лого|фоновий колір лого';
var PROPERTY_VIEW = 'Стиль інтерфейсу є';
var PROPERTY_VIEW_STR = 'Авто|Телефон|Комп\'ютер';
var PROPERTY_UIDESIGN = 'UI design is';
var PROPERTY_UIDESIGN_STR = 'Normal|Material design|Normal w/o shadows|Material design w/o shadows';
var COLOR_EXPORT = 'Будь ласка, збережіть строку для імпорту';
var COLOR_IMPORT = 'Please input the string exported';
var COLOR_FAIL = 'Incorrect Data, Import Failed';
var PROPERTY_FONTCOLOR_STR = 'чорний|білий';
var PROPERTY_COLOR_STR = 'manual|import/export...|random|style1|style2|style3|black|white|style6|solarized dark|solarized light';
var PROPERTY_FONT = 'Вибрати шрифт таймера';
var PROPERTY_FONT_STR = 'random digital|normal|digital1|digital2|digital3|digital4|digital5';
var PROPERTY_FORMAT = 'Формат часу';
var PROPERTY_USEKSC = 'використовувати гарячі клавіші';
var PROPERTY_USEGES = 'use gesture control';
var PROPERTY_NTOOLS = 'кількість інструментів';
var PROPERTY_AHIDE = 'Hide All Elements When Timing';
var SCRAMBLE_LAST = 'останній';
var SCRAMBLE_NEXT = 'наступний';
var SCRAMBLE_SCRAMBLE = 'розібрати';
var SCRAMBLE_SCRAMBLING = 'Розбирання...';
var SCRAMBLE_LENGTH = 'довжина';
var SCRAMBLE_INPUT = 'Input Scramble(s)';
var SCRAMBLE_INPUTTYPE = 'Scramble type';
var PROPERTY_VRCSPEED = 'VRC base speed (tps)';
var PROPERTY_VRCORI = 'Virtual cube orientation';
var PROPERTY_VRCMP = 'multi-phase';
var PROPERTY_VRCMPS = 'None|CFOP|CF+OP|CFFFFOP|CFFFFOOPP|Roux';
var PROPERTY_GIIKERVRC = 'Show virtual bluetooth cube';
var PROPERTY_GIISOK_DELAY = 'Mark scrambled if stay';
var PROPERTY_GIISOK_DELAYS = '2s|3s|4s|5s|Never|Correctly scrambled';
var PROPERTY_GIISOK_KEY = 'Mark scrambled with spacebar';
var PROPERTY_GIISOK_MOVE = 'Mark scrambled by doing';
var PROPERTY_GIISOK_MOVES = 'U4, R4, etc|(U U\')2, (U\' U)2, etc|Never';
var PROPERTY_GIISBEEP = 'Beep when mark scrambled';
var PROPERTY_GIIRST = 'Reset bluetooth cube when connect';
var PROPERTY_GIIRSTS = 'Завжди|Питати|Ніколи';
var PROPERTY_GIIMODE = 'Bluetooth Cube Mode';
var PROPERTY_GIIMODES = 'Normal|Training|Continuous training';
var PROPERTY_VRCAH = 'Useless pieces in huge cube';
var PROPERTY_VRCAHS = 'Hide|Border|Color|Show';
var CONFIRM_GIIRST = 'Скинути bluetooth куб як зібраний?';
var PROPERTY_GIIAED = 'Auto hardware error detection';
var scrdata = [
	['WCA', [
		['3x3x3', "333", 0],
		['2x2x2', "222so", 0],
		['4x4x4', "444wca", -40],
		['5x5x5', "555wca", -60],
		['6x6x6', "666wca", -80],
		['7x7x7', "777wca", -100],
		['3x3 наосліп', "333ni", 0],
		['3x3 fm', "333fm", 0],
		['3x3 oh', "333oh", 0],
		['годинник', "clkwca", 0],
		['мегамінкс', "mgmp", -70],
		['пірамінкс', "pyrso", -10],
		['ск\'юб', "skbso", 0],
		['скв1', "sqrs", 0],
		['4x4 наосліп', "444bld", -40],
		['5x5 наосліп', "555bld", -60],
		['3x3 мульти-блайнд', "r3ni", 5]
	]],
	['Ввід', [
		['Extern', "input", 0],
		['Competition', "remoteComp", 0],
		['Online battle', "remoteBattle", 0],
		['Remote', "remoteOther", 0]
	]],
	['===WCA===', [
		['--', "blank", 0]
	]],
	['3x3x3', [
		["random state (WCA)", "333", 0],
		['random move', "333o", 25],
		['3x3x3 для початківців', "333noob", 25],
		['тільки ребра', "edges", 0],
		['тільки кути', "corners", 0],
		['BLD Helper', "nocache_333bldspec", 0],
		['Pattern Tool', "nocache_333patspec", 0],
		['3x3 ft', "333ft", 0],
		['Користувацький', "333custom", 0]
	]],
	['3x3x3 CFOP', [
		['PLL', "pll", 0],
		['OLL', "oll", 0],
		['останній слот + останній шар', "lsll2", 0],
		['останній шар', "ll", 0],
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
		['хрест зібрано', "f2l", 0],
		['EOLine', "eoline", 0],
		['EO Cross', "eocross", 0],
		['легкий хрест', "easyc", 3],
		['easy xcross', "easyxc", 4]
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
		["random state (WCA)", "222so", 0],
		['optimal', "222o", 0],
		['3-gen', "2223", 25],
		['EG', "222eg", 0],
		['CLL', "222eg0", 0],
		['EG1', "222eg1", 0],
		['EG2', "222eg2", 0],
		['TCLL+', "222tcp", 0],
		['TCLL-', "222tcn", 0],
		['TCLL', "222tc", 0],
		['LS', "222lsall", 0],
		['No Bar', "222nb", 0]
	]],
	['4x4x4', [
		["WCA", "444wca", -40],
		['випадковий хід', "444m", 40],
		['SiGN', "444", 40],
		['YJ', "444yj", 40],
		['4x4x4 ребра', "4edge", 0],
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
		['SiGN', "555", 60],
		['кути 5x5x5', "5edge", 8]
	]],
	['6x6x6', [
		["WCA", "666wca", 80],
		['SiGN', "666si", 80],
		['prefix', "666p", 80],
		['suffix', "666s", 80],
		['кути 6x6x6', "6edge", 8]
	]],
	['7x7x7', [
		["WCA", "777wca", 100],
		['SiGN', "777si", 100],
		['prefix', "777p", 100],
		['suffix', "777s", 100],
		['кути 7x7x7', "7edge", 8]
	]],
	['Годинник', [
		['WCA', "clkwca", 0],
		['WCA (old)', "clkwcab", 0],
		['WCA w/o y2', "clknf", 0],
		['jaap', "clk", 0],
		['optimal', "clko", 0],
		['concise', "clkc", 0],
		['efficient pin order', "clke", 0]
	]],
	['Мегамінкс', [
		["WCA", "mgmp", 70],
		['Carrot', "mgmc", 70],
		['old style', "mgmo", 70],
		['2-generator R,U', "minx2g", 30],
		['останній слот + останній шар', "mlsll", 0],
		['PLL', "mgmpll", 0],
		['Last Layer', "mgmll", 0]
	]],
	['Пірамінкс', [
		["random state (WCA)", "pyrso", 10],
		['optimal', "pyro", 0],
		['random move', "pyrm", 25],
		['L4E', "pyrl4e", 0],
		['4 tips', "pyr4c", 0],
		['No bar', "pyrnb", 0]
	]],
	['Ск\'юб', [
		["random state (WCA)", "skbso", 0],
		['optimal', "skbo", 0],
		['random move', "skb", 25],
		['No bar', "skbnb", 0]
	]],
	['Скваєр-1', [
		["random state (WCA)", "sqrs", 0],
		["CSP", "sqrcsp", 0],
		["PLL", "sq1pll", 0],
		['face turn metric', "sq1h", 40],
		['twist metric', "sq1t", 20]
	]],
	['===ІНШЕ===', [
		['--', "blank", 0]
	]],
	['15 puzzle', [
		['random state URLD', "15prp", 0],
		['random state ^<>v', "15prap", 0],
		['random state Blank', "15prmp", 0],
		['random move URLD', "15p", 80],
		['random move ^<>v', "15pat", 80],
		['random move Blank', "15pm", 80]
	]],
	['8 puzzle', [
		['random state URLD', "8prp", 0],
		['random state ^<>v', "8prap", 0],
		['random state Blank', "8prmp", 0]
	]],
	['LxMxN', [
		['1x3x3 (Floppy Cube)', "133", 0],
		['2x2x3 (Tower Cube)', "223", 0],
		['2x3x3 (Доміно)', "233", 25],
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
		['random state', "gearso", 0],
		['optimal', "gearo", 0],
		['random move', "gear", 10]
	]],
	['Kilominx', [
		['random state', "klmso", 0],
		['Pochmann', "klmp", 30]
	]],
	['Гігамінкс', [
		['Pochmann', "giga", 300]
	]],
	['Crazy Puzzle', [
		['Crazy 3x3x3', "crz3a", 30]
	]],
	['Cmetrick', [
		['Cmetrick', "cm3", 25],
		['Cmetrick Mini', "cm2", 25]
	]],
	['Куб-гвинтокрил', [
		['Heli copter', "heli", 40],
		['Curvy copter', "helicv", 40],
		['2x2 Heli random move', "heli2x2", 70],
		['2x2 Heli by group', "heli2x2g", 5]
	]],
	['Redi Cube', [
		['random state', "rediso", 0],
		['MoYu', "redim", 8],
		['random move', "redi", 20]
	]],
	['Dino Cube', [
		['random state', "dinoso", 0],
		['optimal', "dinoo", 0]
	]],
	['Ivy cube', [
		['random state', "ivyso", 0],
		['optimal', "ivyo", 0],
		['random move', "ivy", 10]
	]],
	['Master Pyraminx', [
		['random state', "mpyrso", 0],
		['random move', "mpyr", 42]
	]],
	['Pyraminx Crystal', [
		['Pochmann', "prcp", 70],
		['старий стиль', "prco", 70]
	]],
	['Сіамський Куб', [
		['Блок 1х1х3', "sia113", 25],
		['Блок 1х2х3', "sia123", 25],
		['Блок 2х2х2', "sia222", 25]
	]],
	['Square', [
		['Square-2', "sq2", 20],
		['Super Square-1', "ssq1t", 20]
	]],
	['Super Floppy', [
		[' ', "sfl", 25]
	]],
	['НЛО', [
		['Jaap style', "ufo", 25]
	]],
	['FTO (Face-Turning Octahedron)', [
		['random state', "ftoso", 0],
		['random move', "fto", 30],
		['L3T', "ftol3t", 0],
		['L3T+LBT', "ftol4t", 0],
		['TCP', "ftotcp", 0],
		['edges only', "ftoedge", 0],
		['centers only', "ftocent", 0],
		['corners only', "ftocorn", 0],
		['Diamond random state', "dmdso", 0]
	]],
	['Icosahedron', [
		['Icosamate random move', "ctico", 60]
	]],
	['===СПЕЦІАЛЬНЕ===', [
		['--', "blank", 0]
	]],
	['3x3x3 subsets', [
		['2-generator R,U', "2gen", 0],
		['2-generator L,U', "2genl", 0],
		['Roux-generator M,U', "roux", 0],
		['3-generator F,R,U', "3gen_F", 0],
		['3-generator R,U,L', "3gen_L", 0],
		['3-generator R,r,U', "RrU", 0],
		['Domino Subgroup', "333drud", 0],
		['half turns only', "half", 0],
		['last slot + last layer (old)', "lsll", 15]
	]],
	['Bandaged Cube', [
		['Bicube', "bic", 30],
		['Square-1 /,(1,0)', "bsq", 25]
	]],
	['Relays', [
		['lots of 3x3x3s', "r3", 5],
		['234 relay', "r234", 0],
		['2345 relay', "r2345", 0],
		['23456 relay', "r23456", 0],
		['234567 relay', "r234567", 0],
		['234 relay (WCA)', "r234w", 0],
		['2345 relay (WCA)', "r2345w", 0],
		['23456 relay (WCA)', "r23456w", 0],
		['234567 relay (WCA)', "r234567w", 0],
		['Mini Guildford', "rmngf", 0]
	]],
	['===ЖАРТИ===', [
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
var SCRAMBLE_NOOBSS = ' за годинниковою стрілкою на 90 градусів,| проти годинникової стрілки на 90 градусів,| на 180 градусів,';
var SCROPT_TITLE = 'Scramble Options';
var SCROPT_BTNALL = 'Full';
var SCROPT_BTNNONE = 'Clear';
var SCROPT_EMPTYALT = 'Please select at least one case';
var STATS_CFM_RESET = 'reset all times in this session?';
var STATS_CFM_DELSS = 'видалити сесію [%s]?';
var STATS_CFM_DELMUL = 'The Number Of Deleted Values From Current Index?';
var STATS_CFM_DELETE = 'видалити цей час?';
var STATS_COMMENT = 'Коментар';
var STATS_REVIEW = 'Review';
var STATS_DATE = 'Дата';
var STATS_SSSTAT = '1-solve stat.';
var STATS_SSRETRY = 'Retry';
var STATS_CURROUND = 'Поточна статистика раунду';
var STATS_CURSESSION = 'Поточна статистика сесії';
var STATS_CURSPLIT = 'Фаза %d поточної статистики сесії';
var STATS_EXPORTCSV = 'Експортувати CSV';
var STATS_SSMGR_TITLE = 'Менеджер сесій';
var STATS_SSMGR_NAME = 'Назва';
var STATS_SSMGR_DETAIL = 'Деталі сесії';
var STATS_SSMGR_OPS = 'Rename|Create|Split|Merge|Delete|Sort|Merge&Dedupe';
var STATS_SSMGR_ORDER = 'Order by scramble';
var STATS_SSMGR_ODCFM = 'Sort all sessions by scramble?';
var STATS_SSMGR_SORTCFM = '%d solve(s) will be reordered, confirm?';
var STATS_ALERTMG = 'Merge all times in session [%f] to the end of session [%t]?';
var STATS_PROMPTSPL = 'Number of latest times split from session [%s]?';
var STATS_ALERTSPL = 'Should split or leave 1 time at least';
var STATS_AVG = 'mean';
var STATS_SUM = 'sum';
var STATS_SOLVE = 'solve';
var STATS_TIME = 'час';
var STATS_SESSION = 'Сесія';
var STATS_SESSION_NAME = 'Змінити назву сесії';
var STATS_SESSION_NAMEC = 'Назва нової сесії';
var STATS_STRING = 'best|current|worst|Generated By csTimer on %Y-%M-%D|solves/total: %d|single|mean of %mk|avg of %mk|Average: %v{ (σ = %sgm)}|Mean: %v|Time List:|solving from %s to %e|Totally spent: %d|target';
var STATS_PREC = 'time distribution precision';
var STATS_PREC_STR = 'auto|0.1s|0.2s|0.5s|1s|2s|5s|10s|20s|50s|100s';
var STATS_TYPELEN = 'list %d type|list %d length|average|mean';
var STATS_STATCLR = 'Enable session emptying';
var STATS_ABSIDX = 'Show absolute index in statistics report';
var STATS_XSESSION_DATE = 'будь-яка дата|за останні 24 години|за останні 7 днів|за останні 30 днів|за останні 365 днів';
var STATS_XSESSION_NAME = 'будь-яка назва';
var STATS_XSESSION_SCR = 'any scramble';
var STATS_XSESSION_CALC = 'Calc';
var STATS_RSFORSS = 'Show stat. when clicking solve number';
var PROPERTY_PRINTSCR = 'print scramble(s) in statistics';
var PROPERTY_PRINTCOMM = 'print comment(s) in statistics';
var PROPERTY_PRINTDATE = 'print solving date in statistics';
var PROPERTY_SUMMARY = 'show summary before time list';
var PROPERTY_IMRENAME = 'rename session immediately after creation';
var PROPERTY_SCR2SS = 'create new session when switching scramble type';
var PROPERTY_SS2SCR = 'restore scramble type when switching session';
var PROPERTY_SS2PHASES = 'restore multi-phase timing when switching session';
var PROPERTY_STATINV = 'Inverse time list';
var PROPERTY_STATSSUM = 'Show sum in time list';
var PROPERTY_STATTHRES = 'Show target time for session best';
var PROPERTY_STATBPA = 'Show best possible average (BPA)';
var PROPERTY_STATWPA = 'Show worst possible average (WPA)';
var PROPERTY_STATAL = 'Statistical indicators';
var PROPERTY_STATALU = 'Customized statistical indicator';
var PROPERTY_HLPBS = 'Підсвічувати особисті рекорди';
var PROPERTY_HLPBS_STR = 'Dark orange as WCA|As link color|Bolder|None';
var PROPERTY_DELMUL = 'Enable Multiple Deletion';
var PROPERTY_TOOLSFUNC = 'Selected Functions';
var PROPERTY_TRIM = 'Number of solves trimmed at better side';
var PROPERTY_TRIMR = 'Number of solves trimmed at worse side';
var PROPERTY_TRIM_MED = 'Median';
var PROPERTY_STKHEAD = 'Use Stackmat Status Information';
var PROPERTY_TOOLPOS = 'Tools panel position';
var PROPERTY_TOOLPOS_STR = 'Bottom|Float|Top';
var PROPERTY_HIDEFULLSOL = 'Show solution progressively';
var PROPERTY_IMPPREV = 'Import non-latest data';
var PROPERTY_AUTOEXP = 'Auto Export (per 100 solves)';
var PROPERTY_AUTOEXP_OPT = 'Never|To File|With csTimer ID|With WCA Account|With Google Account|Alert Only';
var PROPERTY_SCRASIZE = 'Auto scramble size';
var MODULE_NAMES = {
	"kernel": 'загальне',
	"ui": 'дисплей',
	"color": 'колір',
	"timer": 'таймер',
	"scramble": 'scramble',
	"stats": 'статистика',
	"tools": 'інструменти',
	"vrc": 'virtual&<br>bluetooth'
};
var BGIMAGE_URL = 'please input image\'s url';
var BGIMAGE_INVALID = 'invalid url';
var BGIMAGE_OPACITY = 'background image opacity';
var BGIMAGE_IMAGE = 'background image';
var BGIMAGE_IMAGE_STR = 'none|manual|CCT';
var SHOW_AVG_LABEL = 'Show Avg Label';
var SHOW_DIFF_LABEL = 'Show Difference Label';
var SHOW_DIFF_LABEL_STR = '-Green+Red|-Red+Green|Normal|None';
var USE_LOGOHINT = 'Hint messages in logo';
var TOOLS_SCRGEN = 'ScrambleGenerator';
var SCRGEN_NSCR = 'Number of scrambles';
var SCRGEN_PRE = 'prefix';
var SCRGEN_GEN = 'Generate Scrambles!';
var VRCREPLAY_TITLE = 'Virtual Replay';
var VRCREPLAY_ORI = 'raw ori|auto ori';
var VRCREPLAY_SHARE = 'поширити посилання';
var GIIKER_CONNECT = 'Натисніть для підключення';
var GIIKER_RESET = 'Скинути (Позначити як вирішене)';
var GIIKER_REQMACMSG = 'Please enter the MAC address of your smart hardware (xx:xx:xx:xx:xx:xx). You can find the MAC address through chrome://bluetooth-internals/#devices, or modify following options to let csTimer automatically obtain it:\nChrome: Turn on chrome://flags/#enable-experimental-web-platform-features\nBluefy: Turn on Enable BLE Advertisements';
var GIIKER_NOBLEMSG = 'Bluetooth API is not available. Ensure https access, check bluetooth is enabled on your device, and try chrome with chrome://flags/#enable-experimental-web-platform-features enabled';
var PROPERTY_SHOWAD = 'Show advertisements (take effect after reload)';
var PROPERTY_GIIORI = 'Орієнтація куба';
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
