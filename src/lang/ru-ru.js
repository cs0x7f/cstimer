var OK_LANG = 'ОК';
var CANCEL_LANG = 'Отмена';
var RESET_LANG = 'Сбросить';
var ABOUT_LANG = 'О csTimer';
var ZOOM_LANG = 'Увеличить';
var COPY_LANG = 'Copy';
var BUTTON_TIME_LIST = 'СПИСОК<br>ВРЕМЕНИ';
var BUTTON_OPTIONS = 'НАСТ-<br>РОЙКИ';
var BUTTON_EXPORT = 'ЗАГРУ-<br>ЗИТЬ';
var BUTTON_DONATE = 'ПОЖЕРТ-<br>ВОВАТЬ';
var PROPERTY_SR = 'С сессией';
var PROPERTY_USEINS = 'использовать WCA инспекцию';
var PROPERTY_USEINS_STR = 'Always (down)|Always (up)|Except BLD (down)|Except BLD (up)|Never';
var PROPERTY_SHOWINS = 'Показывать значок, когда проверка включена';
var PROPERTY_VOICEINS = 'голосовое предупреждение при инспекции';
var PROPERTY_VOICEINS_STR = 'нет|мужской голос|женский голос';
var PROPERTY_VOICEVOL = 'Громкость голоса';
var PROPERTY_PHASES = 'число этапов';
var PROPERTY_TIMERSIZE = 'размер таймера';
var PROPERTY_USEMILLI = 'использовать миллисекунды';
var PROPERTY_SMALLADP = 'использовать маленький шрифт после десятичной точки';
var PROPERTY_SCRSIZE = 'размер скрамбла';
var PROPERTY_SCRMONO = 'моноширинный скрамбл';
var PROPERTY_SCRLIM = 'Ограничить высоту зоны скрамбла';
var PROPERTY_SCRALIGN = 'Выравнивание зоны скрамбла';
var PROPERTY_SCRALIGN_STR = 'центр|лево|право';
var PROPERTY_SCRWRAP = 'Scramble Wrap';
var PROPERTY_SCRWRAP_STR = 'Balanced|Normal';
var PROPERTY_SCRNEUT = 'Color neutral';
var PROPERTY_SCRNEUT_STR = 'None|Single face|Double faces|Six faces';
var PROPERTY_SCREQPR = 'Probabilities for training-scramble states';
var PROPERTY_SCREQPR_STR = 'Actual|Equal|Random order';
var PROPERTY_SCRFAST = 'Использовать быстрый скрамбл для 4х4х4(неофициально)';
var PROPERTY_SCRKEYM = 'Главный(ые) ход(ы) в скрамбле';
var PROPERTY_SCRCLK = 'Действие при нажатии на скрамбл';
var PROPERTY_SCRCLK_STR = 'Ничего|Копировать|Следущий скрамбл';
var PROPERTY_WNDSCR = 'Стиль панели со скрамблом';
var PROPERTY_WNDSTAT = 'Стиль панели статистики';
var PROPERTY_WNDTOOL = 'Стиль отображения панели инструментов';
var PROPERTY_WND_STR = 'Нормальный|плоский';
var EXPORT_DATAEXPORT = 'Сохранить/Загрузить';
var EXPORT_TOFILE = 'Сохранить в';
var EXPORT_FROMFILE = 'Загрузить из';
var EXPORT_TOSERV = 'Сохранить на сервер';
var EXPORT_FROMSERV = 'Загрузить из сервера';
var EXPORT_FROMOTHER = 'Импорт сессии(й) из других таймеров';
var EXPORT_USERID = 'Пожалуйста введите свой аккаунт (только алфавит или цифры)';
var EXPORT_INVID = 'Разрешены только алфавит и цифры!';
var EXPORT_ERROR = 'Произошли некоторые ошибки...';
var EXPORT_NODATA = 'Не найдено данных вашего аккаунта';
var EXPORT_UPLOADED = 'Загружено успешно';
var EXPORT_CODEPROMPT = 'Сохрани этот код, или напиши сохранённый код для импорта';
var EXPORT_ONLYOPT = 'Настройки только для экспорта/импорта';
var EXPORT_ACCOUNT = 'Экспорт аккаунтов';
var EXPORT_LOGINGGL = 'Войти используя аккаунт Google';
var EXPORT_LOGINWCA = 'Войти используя аккаунт WCA';
var EXPORT_LOGOUTCFM = 'Подтвердить для выхода?';
var EXPORT_LOGINAUTHED = 'Авторизовано<br>Получение данных...';
var EXPORT_AEXPALERT = 'More than %d solves since last backup';
var EXPORT_WHICH = 'You have %d file(s), which one should be imported?';
var EXPORT_WHICH_ITEM = '%s solve(s), uploaded at %t';
var IMPORT_FINAL_CONFIRM = 'Это перезапишет все локальные данные! Будет перезаписано как минимум %d сессий, добавлено %a и удалено %r сборок. Продолжить?';
var BUTTON_SCRAMBLE = 'СКРА-<br>МБЛ';
var BUTTON_TOOLS = 'ИНСТРУ-<br>МЕНТЫ';
var IMAGE_UNAVAILABLE = 'Невозможно для этого типа скрамбла';
var TOOLS_SELECTFUNC = 'Функция';
var TOOLS_CROSS = 'собрать крест';
var TOOLS_EOLINE = 'собрать EOLine';
var TOOLS_ROUX1 = 'собрать Roux S1';
var TOOLS_222FACE = 'Сторона 2х2х2';
var TOOLS_GIIKER = 'Giiker Cube';
var TOOLS_IMAGE = 'нарисовать скрамбл';
var TOOLS_STATS = 'Статистика';
var TOOLS_HUGESTATS = 'межсессионная статистика';
var TOOLS_DISTRIBUTION = 'распределение времени';
var TOOLS_TREND = 'тенденция времени';
var TOOLS_METRONOME = 'метроном';
var TOOLS_RECONS = 'Реконструкция';
var TOOLS_RECONS_NODATA = 'Решение не найдено.';
var TOOLS_RECONS_TITLE = 'осмотр|сборка|вращений|тпс';
var TOOLS_TRAINSTAT = 'Статистика практики';
var TOOLS_BLDHELPER = 'Помощник для слепой сборки';
var TOOLS_CFMTIME = 'Подтвердить время';
var TOOLS_SOLVERS = 'Cборщики';
var TOOLS_DLYSTAT = 'Ежедневная статистика';
var TOOLS_DLYSTAT1 = 'Период|Начало дня|Неделя';
var TOOLS_DLYSTAT_OPT1 = 'день|неделя|месяц|год';
var TOOLS_DLYSTAT_OPT2 = 'Вс|Пн|Вт|Ср|Чт|Пт|Сб';
var TOOLS_SYNCSEED = 'Обычный скрамбл';
var TOOLS_SYNCSEED_SEED = 'Ключ';
var TOOLS_SYNCSEED_INPUT = 'Введите ключ';
var TOOLS_SYNCSEED_30S = 'Используйте 30-секундный ключ';
var TOOLS_SYNCSEED_HELP = 'Если включено, скрамбл будет зависеть только от сида и настроек скрамбла.';
var TOOLS_SYNCSEED_DISABLE = 'Выключить текущий ключ?';
var TOOLS_SYNCSEED_INPUTA = 'Введите значение (a-zA-Z0-9) (сид)';
var TOOLS_BATTLE = 'Онлайн битва';
var TOOLS_BATTLE_HEAD = 'Комната|Присоединиться к комнате';
var TOOLS_BATTLE_TITLE = 'Ранг|Статус|Время';
var TOOLS_BATTLE_STATUS = 'Готово|Осмотр|Решение|Решено|Потеряно';
var TOOLS_BATTLE_INFO = 'Присоединяйтесь к комнате для баттла со своим другом, тогда вы будете сражаться вместе.';
var TOOLS_BATTLE_JOINALERT = 'Пожалуйста, введите ID комнаты';
var TOOLS_BATTLE_LEAVEALERT = 'Покинуть текущую комнату';
var OLCOMP_UPDATELIST = 'Обновить список соревнований';
var OLCOMP_VIEWRESULT = 'Посмотреть результат';
var OLCOMP_VIEWMYRESULT = 'Моя история';
var OLCOMP_START = 'Начать!';
var OLCOMP_SUBMIT = 'Отправить!';
var OLCOMP_SUBMITAS = 'Отправить как: ';
var OLCOMP_WCANOTICE = 'Отправить от лица своего WCA аккаунта? (Перезайдите если вы не распознаетесь после отправки)';
var OLCOMP_OLCOMP = 'Онлайн соревнование';
var OLCOMP_ANONYM = 'Аноним';
var OLCOMP_ME = 'Я';
var OLCOMP_WCAACCOUNT = 'WCA Аккаунт';
var OLCOMP_ABORT = 'Прервать соревнование и показать результаты?';
var OLCOMP_WITHANONYM = 'Анонимно';
var PROPERTY_IMGSIZE = 'Размер изображения скрамбла';
var PROPERTY_IMGREP = 'Show virtual cube animation when clicking scramble image';
var TIMER_INSPECT = 'рассмотр';
var TIMER_SOLVE = 'сборка';
var PROPERTY_USEMOUSE = 'использовать таймер мышкой';
var PROPERTY_TIMEU = 'обновление таймера';
var PROPERTY_TIMEU_STR = 'обновление|0.1с|секунды|рассмотр|нет';
var PROPERTY_PRETIME = 'время пространства(секунд)';
var PROPERTY_ENTERING = 'вставлять время с';
var PROPERTY_ENTERING_STR = 'таймер|писать|stackmat|MoYuTimer|виртуально|Bluetooth Cube|qCube|Bluetooth Timer|last layer training';
var PROPERTY_INTUNIT = 'Единица измерения при вводе целого числа';
var PROPERTY_INTUNIT_STR = 'секунда|наносекунда|миллисекунда';
var PROPERTY_COLOR = 'выбрать цветовую тему';
var PROPERTY_COLORS = 'цвет шрифта|цвет фона|цвет стола|цвет кнопок|цвет ссылки|цвет Лого|фоновый цвет Лого';
var PROPERTY_VIEW = 'Стиль интерфейса';
var PROPERTY_VIEW_STR = 'Авто|Мобильный|ПК';
var PROPERTY_UIDESIGN = 'Дизайн интерфейса';
var PROPERTY_UIDESIGN_STR = 'Обычный|Материал|Обычный без теней|Материал без теней';
var COLOR_EXPORT = 'Пожалуйста сохраните строку для загрузки';
var COLOR_IMPORT = 'Пожалуйста загрузите сохраненную строку';
var COLOR_FAIL = 'Неправильные данные, Загрузка не удалась';
var PROPERTY_FONTCOLOR_STR = 'черный|белый';
var PROPERTY_COLOR_STR = 'мануал|загрузить/сохранить...|случайно|стиль1|стиль2|стиль3|черный|белый|стиль6|solarized dark|solarized light';
var PROPERTY_FONT = 'выберите шрифт таймера';
var PROPERTY_FONT_STR = 'случайный цифровойl|нормальный|цифровой1|цифровой2|цифровой3|цифровой4|цифровой5';
var PROPERTY_FORMAT = 'формат времени';
var PROPERTY_USEKSC = 'использовать сокращение на клавиатуре';
var PROPERTY_USEGES = 'use gesture control';
var PROPERTY_NTOOLS = 'количество инструментов';
var PROPERTY_AHIDE = 'скрывать все элементы когда идёт время';
var SCRAMBLE_LAST = 'последний';
var SCRAMBLE_NEXT = 'следующий';
var SCRAMBLE_SCRAMBLE = ' скрамбл';
var SCRAMBLE_SCRAMBLING = 'Скрамблинг';
var SCRAMBLE_LENGTH = 'длина';
var SCRAMBLE_INPUT = 'Вставить Скрамбл(ы)';
var SCRAMBLE_INPUTTYPE = 'Scramble type';
var PROPERTY_VRCSPEED = 'Стандартная скорость вращение виртуального куба(вращений в секунду)';
var PROPERTY_VRCORI = 'Virtual cube orientation';
var PROPERTY_VRCMP = 'мульти-фаза';
var PROPERTY_VRCMPS = 'Ничего|CFOP|CF+OP|CFFFFOP|CFFFFOOPP|Roux';
var PROPERTY_GIIKERVRC = 'Показать виртуальный Giiker Cube';
var PROPERTY_GIISOK_DELAY = 'Отметить заскрамбленным если';
var PROPERTY_GIISOK_DELAYS = '2с|3с|4с|5с|никогда|правильно заскрамблен';
var PROPERTY_GIISOK_KEY = 'Отметить заскрамбленным с помощью пробела';
var PROPERTY_GIISOK_MOVE = 'Отметить заскрамбленным, делая';
var PROPERTY_GIISOK_MOVES = 'U4, R4 и т.д.|(U U\')2, (U\' U)2 и т.д.|Никогда';
var PROPERTY_GIISBEEP = 'Бикать, когда помечено заскрамбленным';
var PROPERTY_GIIRST = 'Сбросить Giiker куб при подключении';
var PROPERTY_GIIRSTS = 'Всегда|оперативно|никогда';
var PROPERTY_GIIMODE = 'Режим Bluetooth Cube';
var PROPERTY_GIIMODES = 'Normal|Training|Continuous training';
var PROPERTY_VRCAH = 'Бесполезные части в огромном кубе';
var PROPERTY_VRCAHS = 'Спрятать|Окаймление|Цвет|Показать';
var CONFIRM_GIIRST = 'Сбросить Giiker куб как собранный?';
var PROPERTY_GIIAED = 'Автоопределение аппаратной ошибки';
var scrdata = [
	['WCA', [
		['3х3х3', "333", 0],
		['2x2x2', "222so", 0],
		['4x4x4', "444wca", -40],
		['5x5x5', "555wca", -60],
		['6x6x6', "666wca", -80],
		['7x7x7', "777wca", -100],
		['3x3 вслепую', "333ni", 0],
		['3х3 кх', "333fm", 0],
		['3х3 одной рукой', "333oh", 0],
		['клок', "clkwca", 0],
		['мегаминкс', "mgmp", -70],
		['пирамидка', "pyrso", -10],
		['скьюб', "skbso", 0],
		['скв', "sqrs", 0],
		['4х4 вслепую', "444bld", -40],
		['5х5 вслепую', "555bld", -60],
		['несколько 3х3 вслепую', "r3ni", 5]
	]],
	['Загрузить', [
		['Внешний', "input", 0],
		['Соревнование', "remoteComp", 0],
		['Онлайн битва', "remoteBattle", 0],
		['Remote', "remoteOther", 0]
	]],
	['===WCA===', [
		['--', "blank", 0]
	]],
	['3х3х3', [
		["случайное состояние (WCA)", "333", 0],
		['случайный ход', "333o", 25],
		['3x3x3 для нубов', "333noob", 25],
		['только ребра', "edges", 0],
		['только углы', "corners", 0],
		['Помощник для слепой сборки', "nocache_333bldspec", 0],
		['Pattern Tool', "nocache_333patspec", 0],
		['3х3 ногами', "333ft", 0],
		['Пользовательское', "333custom", 0]
	]],
	['3х3х3 CFOP', [
		['PLL', "pll", 0],
		['OLL', "oll", 0],
		['последний слот + последний слой', "lsll2", 0],
		['последний слой', "ll", 0],
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
		['собранный крест', "f2l", 0],
		['EOLine', "eoline", 0],
		['EO Cross', "eocross", 0],
		['легкий крест', "easyc", 3],
		['легкий икс-кросс', "easyxc", 4]
	]],
	['3х3х3 Roux', [
		['2nd Block', "sbrx", 0],
		['CMLL', "cmll", 0],
		['LSE', "lse", 0],
		['LSE &lt;M, U&gt;', "lsemu", 0]
	]],
	['3х3х3 Mehta', [
		['3QB', "mt3qb", 0],
		['EOLE', "mteole", 0],
		['TDR', "mttdr", 0],
		['6CP', "mt6cp", 0],
		['CDRLL', "mtcdrll", 0],
		['L5EP', "mtl5ep", 0],
		['TTLL', "ttll", 0]
	]],
	['2х2х2', [
		["случайное состояние (WCA)", "222so", 0],
		['оптимально', "222o", 0],
		['3-поколен', "2223", 25],
		['EG', "222eg", 0],
		['CLL', "222eg0", 0],
		['EG1', "222eg1", 0],
		['EG2', "222eg2", 0],
		['TCLL+', "222tcp", 0],
		['TCLL-', "222tcn", 0],
		['TCLL', "222tc", 0],
		['LS', "222lsall", 0],
		['Без панели', "222nb", 0]
	]],
	['4x4x4', [
		["WCA", "444wca", -40],
		['случайное движение', "444m", 40],
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
		['5x5x5 ребра', "5edge", 8]
	]],
	['6x6x6', [
		["WCA", "666wca", 80],
		['SiGN', "666si", 80],
		['prefix', "666p", 80],
		['suffix', "666s", 80],
		['6x6x6 ребра', "6edge", 8]
	]],
	['7x7x7', [
		["WCA", "777wca", 100],
		['SiGN', "777si", 100],
		['prefix', "777p", 100],
		['suffix', "777s", 100],
		['7x7x7 ребра', "7edge", 8]
	]],
	['Клок', [
		['WCA', "clkwca", 0],
		['wca (old)', "clkwcab", 0],
		['WCA w/o y2', "clknf", 0],
		['jaap', "clk", 0],
		['оптимально', "clko", 0],
		['сжатие', "clkc", 0],
		['эффективный порядок контактов', "clke", 0]
	]],
	['Мегаминкс', [
		["WCA", "mgmp", 70],
		['Морковь', "mgmc", 70],
		['старый стиль', "mgmo", 70],
		['2-генератор R,U', "minx2g", 30],
		['последний слот + последний слой', "mlsll", 0],
		['PLL', "mgmpll", 0],
		['Last Layer', "mgmll", 0]
	]],
	['Пирамидка', [
		["случайное состояние (WCA)", "pyrso", 10],
		['оптимально', "pyro", 0],
		['случайный ход', "pyrm", 25],
		['L4E', "pyrl4e", 0],
		['4 tips', "pyr4c", 0],
		['No bar', "pyrnb", 0]
	]],
	['Скьюб', [
		["случайное состояние (WCA)", "skbso", 0],
		['оптимально', "skbo", 0],
		['случайный ход', "skb", 25],
		['No bar', "skbnb", 0]
	]],
	['Скваер', [
		["случайное состояние (WCA)", "sqrs", 0],
		["CSP", "sqrcsp", 0],
		["PLL", "sq1pll", 0],
		['метрическое вращение граней', "sq1h", 40],
		['метрическое вращение', "sq1t", 20]
	]],
	['===ДРУГОЕ===', [
		['--', "blank", 0]
	]],
	['Пятнашки', [
		['случайное состояние URLD', "15prp", 0],
		['случайное состояние ^<>v', "15prap", 0],
		['случайное состояние Blank', "15prmp", 0],
		['случайный ход URLD', "15p", 80],
		['случайный ход ^<>v', "15pat", 80],
		['случайный ход Blank', "15pm", 80]
	]],
	['8 puzzle', [
		['случайное состояние URLD', "8prp", 0],
		['случайное состояние ^<>v', "8prap", 0],
		['случайное состояние Blank', "8prmp", 0]
	]],
	['LxMxN', [
		['1x3x3 (Флоппи Куб)', "133", 0],
		['2x2x3 (Башня Куб)', "223", 0],
		['2x3x3 (Домино)', "233", 25],
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
	['Шестеренчатый куб', [
		['случайное состояние', "gearso", 0],
		['оптимально', "gearo", 0],
		['случайный ход', "gear", 10]
	]],
	['Kilominx', [
		['случайное состояние', "klmso", 0],
		['Pochmann', "klmp", 30]
	]],
	['Гигаминкс', [
		['Pochmann', "giga", 300]
	]],
	['Crazy Puzzle', [
		['Crazy 3x3x3', "crz3a", 30]
	]],
	['Cmetrick', [
		['Cmetrick', "cm3", 25],
		['Cmetrick Mini', "cm2", 25]
	]],
	['Вертолетный куб', [
		['Heli copter', "heli", 40],
		['Curvy copter', "helicv", 40],
		['2x2 Heli random move', "heli2x2", 70],
		['2x2 Heli by group', "heli2x2g", 5]
	]],
	['Реди куб', [
		['случайное состояние', "rediso", 0],
		['Moyu', "redim", 8],
		['случайный ход', "redi", 20]
	]],
	['Dino Cube', [
		['случайное состояние', "dinoso", 0],
		['оптимально', "dinoo", 0]
	]],
	['Иви-куб', [
		['случайное состояние', "ivyso", 0],
		['оптимально', "ivyo", 0],
		['случайный ход', "ivy", 10]
	]],
	['Master Pyraminx', [
		['случайное состояние', "mpyrso", 0],
		['случайный ход', "mpyr", 42]
	]],
	['Кристалл Пираминкса', [
		['Pochmann', "prcp", 70],
		['старый стиль', "prco", 70]
	]],
	['Сиамские Кубы', [
		['1x1x3 блок', "sia113", 25],
		['1x2x3 блок', "sia123", 25],
		['2x2x2 блок', "sia222", 25]
	]],
	['Square', [
		['Скваер-2', "sq2", 20],
		['Супер Скваер', "ssq1t", 20]
	]],
	['Супер Флоппи', [
		[' ', "sfl", 25]
	]],
	['НЛО', [
		['Стиль Jaap', "ufo", 25]
	]],
	['ОВГ (Октаэдр вращения граней)', [
		['случайное состояние', "ftoso", 0],
		['случайный ход', "fto", 30],
		['L3T', "ftol3t", 0],
		['L3T+LBT', "ftol4t", 0],
		['TCP', "ftotcp", 0],
		['edges only', "ftoedge", 0],
		['centers only', "ftocent", 0],
		['corners only', "ftocorn", 0],
		['Diamond случайное состояние', "dmdso", 0]
	]],
	['Icosahedron', [
		['Icosamate случайный ход', "ctico", 60]
	]],
	['===СПЕЦИАЛЬНОЕ===', [
		['--', "blank", 0]
	]],
	['Подразделы 3x3x3', [
		['2-генератор R,U', "2gen", 0],
		['2-генератор L,U', "2genl", 0],
		['Roux-генератор M,U', "roux", 0],
		['3-генератор F,R,U', "3gen_F", 0],
		['3-генератор R,U,L', "3gen_L", 0],
		['3-генератор R,r,U', "RrU", 0],
		['Domino Subgroup', "333drud", 0],
		['только половины движений', "half", 0],
		['последний слот + последний слой (старый)', "lsll", 15]
	]],
	['Куб с бандажем', [
		['Бикьюб', "bic", 30],
		['Скваер /,(1,0)', "bsq", 25]
	]],
	['Рилей', [
		['множество 3x3x3', "r3", 5],
		['234 рилей', "r234", 0],
		['2345 рилей', "r2345", 0],
		['23456 рилей', "r23456", 0],
		['234567 рилей', "r234567", 0],
		['234 рилей (WCA)', "r234w", 0],
		['2345 рилей (WCA)', "r2345w", 0],
		['23456 рилей (WCA)', "r23456w", 0],
		['234567 рилей (WCA)', "r234567w", 0],
		['Mini Guildford', "rmngf", 0]
	]],
	['===ШУТКИ===', [
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
	['повернуть нижнюю грань', 'повернуть нижнюю грань'],
	['повернуть левую грань', 'повернуть левую грань'],
	['повернуть заднюю грань', 'повернуть заднюю грань']
];
var SCRAMBLE_NOOBSS = ' по часовой стрелке на 90 градусов,| против часовой стрелки на 90 градусов,| на 180 градусов,';
var SCROPT_TITLE = 'Параметры скрамбла';
var SCROPT_BTNALL = 'Полный';
var SCROPT_BTNNONE = 'Очистить';
var SCROPT_EMPTYALT = 'Пожалуйста, выберите по крайней мере один случай';
var STATS_CFM_RESET = 'перезагрузить все время в этой сессии?';
var STATS_CFM_DELSS = 'удалить сессию[%s]?';
var STATS_CFM_DELMUL = 'Количество Удаленных Величин В Текущем Индексе?';
var STATS_CFM_DELETE = 'удалить это время?';
var STATS_COMMENT = 'Комментарий';
var STATS_REVIEW = 'Обзор';
var STATS_DATE = 'Дата';
var STATS_SSSTAT = 'Статистика 1 сборки';
var STATS_SSRETRY = 'Retry';
var STATS_CURROUND = 'Статистика Текущего Раунда';
var STATS_CURSESSION = 'Статистика Текущей Сессии';
var STATS_CURSPLIT = 'Фаза %d текущей статистики сеанса';
var STATS_EXPORTCSV = 'Экспортировать в CSV';
var STATS_SSMGR_TITLE = 'Менеджер сессий';
var STATS_SSMGR_NAME = 'Название';
var STATS_SSMGR_DETAIL = 'Подробности сессии';
var STATS_SSMGR_OPS = 'Переименовать|Создать|Разделить|Объединить|Удалить|Sort|Merge&Dedupe';
var STATS_SSMGR_ORDER = 'Сортировать по скрамблу';
var STATS_SSMGR_ODCFM = 'Сортировать все сессии по скрамблу?';
var STATS_SSMGR_SORTCFM = '%d решения(й) будут переупорядочен, подтвердить?';
var STATS_ALERTMG = 'Объединить все времена в сеансе [%f] до конца сеанса [%t]?';
var STATS_PROMPTSPL = 'Количество последних сборок, отделенных от сессии [%s]?';
var STATS_ALERTSPL = 'Разделить или оставить хотя-бы одно время';
var STATS_AVG = 'среднее';
var STATS_SUM = 'сумма';
var STATS_SOLVE = 'сборка';
var STATS_TIME = 'время';
var STATS_SESSION = 'Сессия';
var STATS_SESSION_NAME = 'Редактировать название сессии';
var STATS_SESSION_NAMEC = 'Имя новой сессии';
var STATS_STRING = 'лучшее|текущее|худшее|Сгенерираванно csTimer\'ом на %Y-%M-%D|сборок/всего: %d|один|средний %mk|срд of %mk|Средний: %v{ (σ = %sgm)}|Средний: %v|Time List:|solving from %s to %e|Totally spent: %d|target';
var STATS_PREC = 'точное распределение времени';
var STATS_PREC_STR = 'авто|0.1с|0.2с|0.5с|1с|2с|5с|10с|20с|50с|100с';
var STATS_TYPELEN = 'список %d тип|список %d ширина|средний|средний';
var STATS_STATCLR = 'Включить удаление сессии';
var STATS_ABSIDX = 'Показать абсолютный индекс в отчете статистики';
var STATS_XSESSION_DATE = 'любое время|за последние 24 часа|за последнюю неделю|за последний месяц|за последний год';
var STATS_XSESSION_NAME = 'любое название';
var STATS_XSESSION_SCR = 'любой скрамбл';
var STATS_XSESSION_CALC = 'Калькулятор';
var STATS_RSFORSS = 'Показывать статистику при нажатии на номер сборки';
var PROPERTY_PRINTSCR = 'печатать скрамблы в статистику';
var PROPERTY_PRINTCOMM = 'print comment(s) in statistics';
var PROPERTY_PRINTDATE = 'Добавлять дату сборки в статистику';
var PROPERTY_SUMMARY = 'как суммарный после списка времени';
var PROPERTY_IMRENAME = 'переименовать сессию сразу же после создания';
var PROPERTY_SCR2SS = 'создавать новую сессию при измене типа скрамбла';
var PROPERTY_SS2SCR = 'восстанавливать тип скрамбла при измене типа сессии';
var PROPERTY_SS2PHASES = 'восстанавливать время мульти-фазы при смене сессии';
var PROPERTY_STATINV = 'обратный список времени';
var PROPERTY_STATSSUM = 'Показать сумму в списке времени';
var PROPERTY_STATTHRES = 'Показывать целевое время лучшей сборки сеанса';
var PROPERTY_STATBPA = 'Показать лучшее возможное среднее время(BPA)';
var PROPERTY_STATWPA = 'Show worst possible average (WPA)';
var PROPERTY_STATAL = 'Статистические индикаторы';
var PROPERTY_STATALU = 'Настраиваемый индикатор статистики';
var PROPERTY_HLPBS = 'Выделить все PB';
var PROPERTY_HLPBS_STR = 'Dark orange as WCA|As link color|Bolder|None';
var PROPERTY_DELMUL = 'Включить множественное удаление';
var PROPERTY_TOOLSFUNC = 'Выбранные функции';
var PROPERTY_TRIM = 'Кол-во лучших сборок, не учитываемых при подсчете среднего времени';
var PROPERTY_TRIMR = 'Кол-во худших сборок, не учитываемых при подсчете среднего времени';
var PROPERTY_TRIM_MED = 'Среднее';
var PROPERTY_STKHEAD = 'Использовать информацию о статусе Stackmat';
var PROPERTY_TOOLPOS = 'Положение панели инструментов';
var PROPERTY_TOOLPOS_STR = 'Снизу|Плавающее|Сверху';
var PROPERTY_HIDEFULLSOL = 'Показывать решение постепенно';
var PROPERTY_IMPPREV = 'Импортировать не новейшие данные';
var PROPERTY_AUTOEXP = 'Авто-экспорт (по 100 сборок)';
var PROPERTY_AUTOEXP_OPT = 'Никогда|В Файл|С csTimer ID|С аккаунтом WCA|С аккаунтом Google|Alert Only';
var PROPERTY_SCRASIZE = 'Размер автоматического скрамбла';
var MODULE_NAMES = {
	"kernel": 'глобальный',
	"ui": 'дисплей',
	"color": 'цвет',
	"timer": 'таймер',
	"scramble": 'скрамбл',
	"stats": 'статистика',
	"tools": 'инструменты',
	"vrc": 'виртуальное и<br>Giiker'
};
var BGIMAGE_URL = 'пожалуйста вставьте url изображения';
var BGIMAGE_INVALID = 'неверный url';
var BGIMAGE_OPACITY = 'прозрачность фонового изображения';
var BGIMAGE_IMAGE = 'фоновое изображение';
var BGIMAGE_IMAGE_STR = 'нет|мануал|CCT';
var SHOW_AVG_LABEL = 'Показывать Таблицу Avg';
var SHOW_DIFF_LABEL = 'Показать метку разницы';
var SHOW_DIFF_LABEL_STR = '-Зеленый+Красный|-Красный+Зеленый|Нормальный|Нет';
var USE_LOGOHINT = 'Подсказки в логотипе';
var TOOLS_SCRGEN = 'ГенераторСкрамблов';
var SCRGEN_NSCR = 'Количество скрамблов';
var SCRGEN_PRE = 'префикс';
var SCRGEN_GEN = 'Генерировать скрамблы!';
var VRCREPLAY_TITLE = 'Виртуальный повтор';
var VRCREPLAY_ORI = 'свежее ori|автоматическое ori';
var VRCREPLAY_SHARE = 'поделиться ссылкой';
var GIIKER_CONNECT = 'Нажмите, чтобы подключиться';
var GIIKER_RESET = 'Сбросить (отметить как собранный)';
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
var LGHINT_SOLVCOPY = 'Сборка скопирована';
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
