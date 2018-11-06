var OK_LANG = 'ОК';
var CANCEL_LANG = 'Отмена';
var RESET_LANG = 'Заново';
var ABOUT_LANG = 'О csTimer';
var ZOOM_LANG = 'Увеличить';
var BUTTON_TIME_LIST = 'СПИСОК<br>ВРЕМЕНИ';
var BUTTON_OPTIONS = 'НАСТ-<br>РОЙКИ';
var BUTTON_EXPORT = 'ЗАГРУ-<br>ЗИТЬ';
var BUTTON_DONATE = 'ПОЖЕРТ-<br>ВОВАТЬ';
var PROPERTY_USEINS = 'использовать WCA рассмотор';
var PROPERTY_VOICEINS = 'голосовое предупреждение WCA рассмотра: ';
var PROPERTY_VOICEINS_STR = 'нет|мужской голос|женский голос';
var PROPERTY_PHASES = 'мульти-фаза: ';
var PROPERTY_TIMERSIZE = 'размер таймера: ';
var PROPERTY_USEMILLI = 'использовать милисекунды';
var PROPERTY_SMALLADP = 'использовать маленький шрифт после десятичной точки';
var PROPERTY_SCRSIZE = 'размер скрамбла: ';
var PROPERTY_SCRMONO = 'моноширнный скрамбл';
var PROPERTY_SCRLIM = 'Ограничить высоту зоны скрамбла';
var PROPERTY_SCRALIGN = 'Выравнивание зоны скрамбла: ';
var PROPERTY_SCRALIGN_STR = 'центр|лево|право';
var EXPORT_DATAEXPORT = 'Сохранить/Загрузить';
var EXPORT_TOFILE = 'Сохранить в';
var EXPORT_FROMFILE = 'Загрузить из';
var EXPORT_TOSERV = 'Сохранить на сервер';
var EXPORT_FROMSERV = 'Загрузить из сервера';
var EXPORT_USERID = 'Пожалуйста введите свой аккаунт (только алфавит или числа): ';
var EXPORT_INVID = 'Разрешены только алфавит и числа!';
var EXPORT_ERROR = 'Произошли некоторые ошибки...';
var EXPORT_NODATA = 'Не найдено данных твоего аккаунта';
var EXPORT_UPLOADED = 'Загружено успешно';
var BUTTON_SCRAMBLE = 'СКРА-<br>МБЛ';
var BUTTON_TOOLS = 'ИНСТРУ-<br>МЕНТЫ';
var IMAGE_UNAVAILABLE = 'Невозможно для этого типа скрамбла';
var TOOLS_SELECTFUNC = 'Функция: ';
var TOOLS_CROSS = 'собрать крест';
var TOOLS_EOLINE = 'собрать EOLine';
var TOOLS_ROUX1 = 'собрать Roux S1';
var TOOLS_GIIKER = 'Giiker Cube';
var TOOLS_IMAGE = 'нарисовать скрамбл';
var TOOLS_STATS = 'Статистика';
var TOOLS_DISTRIBUTION = 'распределение времени';
var TOOLS_TREND = 'тенденция времени';
var PROPERTY_IMGSIZE = 'Изображение Картинки Скрамбла: ';
var TIMER_INSPECT = 'рассмотр';
var TIMER_SOLVE = 'сборка';
var PROPERTY_USEMOUSE = 'использовать таймер мышкой';
var PROPERTY_TIMEU = 'обновление таймера: ';
var PROPERTY_TIMEU_STR = 'обновление|0.1с|секунды|рассмотр|нет';
var PROPERTY_PRETIME = 'время пространства(секунд): ';
var PROPERTY_ENTERING = 'вставлять время с ';
var PROPERTY_ENTERING_STR = 'таймер|писать|stackmat|MoYuTimer|виртуально|Giiker';
var PROPERTY_COLOR = 'выбрать цветовую тему: ';
var PROPERTY_COLORS = 'цвет шрифта: |цвет фона: |цвет стола: |цвет кнопок: |цвет ссылки: |цвет Лого: |фоновый цвет Лого: ';
var PROPERTY_VIEW = 'Стиль интерфейса:';
var PROPERTY_VIEW_STR = 'Авто|Мобильный|Рабочий стол';
var COLOR_EXPORT = 'Пожалуйста сохраните строку для загрузки: ';
var COLOR_IMPORT = 'Пожалуйста загрузите сохраненную строку: ';
var COLOR_FAIL = 'Неправильные данные, Загрузка неудалась';
var PROPERTY_FONTCOLOR_STR = 'черный|белый';
var PROPERTY_COLOR_STR = 'случайно|стиль1|стиль2|стиль3|черный|белый|стиль6|мануал|сохранить...|загрузить...';
var PROPERTY_FONT = 'выберите шрифт таймера: ';
var PROPERTY_FONT_STR = 'случайный цифровойl|нормальный|цифровой1|цифровой2|цифровой3|цифровой4|цифровой5';
var PROPERTY_FORMAT = 'формат времени: '
var PROPERTY_USEKSC = 'использовать сокращение на клавиатуре';
var PROPERTY_NTOOLS = 'количество инструментов';
var PROPERTY_AHIDE = 'Спрятать Все Элементы Когда Идет Время';
var SCRAMBLE_LAST = 'последний';
var SCRAMBLE_NEXT = 'следующий';
var SCRAMBLE_SCRAMBLE = ' скрамбл';
var SCRAMBLE_LENGTH = 'длинна';
var SCRAMBLE_INPUT = 'Вставить Скрамбл(ы)';
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
		['мегаминкс', "mgmp", -70],
		['пирамидка', "pyrso", -10],
		['скв', "sqrs", 0],
		['клок', "clkwca", 0],
		['скьюб', "skbso", 0],
		['6x6x6', "666wca", -80],
		['7x7x7', "777wca", -100],
		['4x4 bld', "444bld", -40],
		['5x5 bld', "555bld", -60],
		['3x3 mbld', "r3ni", 5]
	]],
	['Загрузить', [
		['Внешний', "input", 0]
	]],
	['===WCA===', [
		['--', "blank", 0]
	]],
	['2x2x2', [
		["WCA", "222so", 0],
		['оптимальная случайная позиция', "222o", 0],
		['3-поколен', "2223", 25],
		['EG', "222eg", 0],
		['EG0', "222eg0", 0],
		['EG1', "222eg1", 0],
		['EG2', "222eg2", 0]
	]],
	['3x3x3', [
		["WCA", "333", 0],
		['старый стиль', "333o", 25],
		['3x3x3 для нубов', "333noob", 25],
		['только ребра', "edges", 0],
		['только углы', "corners", 0],
		['последний слой', "ll", 0],
		['zb последний слой', "zbll", 0],
		['углы последнего слоя', "cll", 0],
		['ребра последнего слоя', "ell", 0],
		['последние шесть ребер', "lse", 0],
		['последние шесть ребер&ltM,U&gt', "lsemu", 0],
		['Roux L10P', "cmll", 0],
		['собранный крест', "f2l", 0],
		['последний слот + последний слой', "lsll2", 0],
		['2GLL', "2gll", 0],
		['ZBLS', "zbls", 0],
		['ZZLL', "zzll", 0],
		['PLL', "pll", 0],
		['EOLine', "eoline", 0],
		['легкий крест', 'easyc', 3]
	]],
	['4x4x4', [
		["WCA", "444wca", 40],
		['SiGN', "444", 40],
		['случайная позиция', "444o", 0],
		['YJ', "444yj", 40],
		['4x4x4 ребра', "4edge", 8],
		['R,r,U,u', "RrUu", 40]
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
		['jaap', "clk", 0],
		['wca', "clkwca", 0],
		['оптимально', "clko", 0],
		['concise', "clkc", 0],
		['эффективный порядок контактов', "clke", 0]
	]],
	['Мегаминкс', [
		["WCA", "mgmp", 70],
		['Морковь', "mgmc", 70],
		['старый стиль', "mgmo", 70]
	]],
	['Пирамидка', [
		["WCA", "pyrso", 10],
		['оптимальная случайная позиция', "pyro", 0],
		['случайные движения', "pyrm", 25]
	]],
	['Скваер', [
		["WCA", "sqrs", 0],
		['метрическое вращение граней', "sq1h", 40],
		['метрическое вращение', "sq1t", 20]
	]],
	['Скьюб', [
		["WCA", "skbso", 0],
		['U L R B', "skb", 25]
	]],
	['===ДРУГОЕ===', [
		['--', "blank", 0]
	]],
	['Пятнашки', [
		['движение частей', "15p", 80],
		['пустое движение', "15pm", 80]
	]],
	['LxMxN', [
		['1x3x3 (Floppy Cube)', "133", 0],
		['2x2x3 (Башня Куб)', "223", 0],
		['2x3x3 (Домино)', "233", 25],
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
		['случайная позиция', "gearso", 0],
		['оптимальная случайная позиция', "gearo", 0],
		['3-поколен', "gear", 10]
	]],
	['Cmetrick', [
		[' ', "cm3", 25]
	]],
	['Cmetrick Mini', [
		[' ', "cm2", 25]
	]],
	['Гигаминкс', [
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
		['старый стиль', "prco", 70]
	]],
	['Сиамские Кубы', [
		['1x1x3 блок', "sia113", 25],
		['1x2x3 блок', "sia123", 25],
		['2x2x2 блок', "sia222", 25]
	]],
	['Square-2', [
		[' ', "sq2", 20]
	]],
	['Super Floppy', [
		[' ', "sfl", 25]
	]],
	['Супер Скваер', [
		['метрическое вращение', "ssq1t", 20]
	]],
	['НЛО', [
		['Jaap style', "ufo", 25]
	]],
	['Другое', [
		['ОВГ (Октаэдр вращения граней)', "fto", 25]
	]],
	['===СПЕЦИАЛЬНОЕ===', [
		['--', "blank", 0]
	]],
	['3x3x3 subsets', [
		['2-генератор R,U', "2gen", 25],
		['2-генератор L,U', "2genl", 25],
		['Roux-генератор M,U', "roux", 25],
		['3-генератор F,R,U', "3gen_F", 25],
		['3-генератор R,U,L', "3gen_L", 25],
		['3-генератор R,r,U', "RrU", 25],
		['только половины движений', "half", 25],
		['последний слот + последний слой (старый)', "lsll", 15]
	]],
	['Bandaged Cube', [
		['Bicube', "bic", 30],
		['Скваер /,(1,0)', "bsq", 25]
	]],
	['Мегаминкс subsets', [
		['2-генератор R,U', "minx2g", 30],
		['последний слот + последний слой', "mlsll", 20]
	]],
	['Relays', [
		['множество 3x3x3', "r3", 5],
		['234 relay', "r234", 0],
		['2345 relay', "r2345", 0],
		['23456 relay', "r23456", 0],
		['234567 relay', "r234567", 0]
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
	['Деррик Эйде', [
		[' ', "eide", 25]
	]]
];
var SCRAMBLE_NOOBST = [
	['повернуть нижнюю грань', 'повернуть нижнюю грань'],
	['повернуть левую грань', 'повернуть левую грань'],
	['повернуть заднюю грань', 'повернуть заднюю грань']
];
var SCRAMBLE_NOOBSS = ' по часовой стрелке на 90 градусов,| против часовой стрелки на 90 градусов,| на 180 градусов,';
var STATS_CFM_RESET = 'перезагрузить все время в этой сессии?';
var STATS_CFM_DELSS = 'уалить эту сессию?';
var STATS_CFM_DELMUL = 'Количество Удаленных Величин В Текущем Индексе?';
var STATS_CFM_DELETE = 'удалить это время?';
var STATS_COMMENT = 'Комментарий:';
var STATS_CURROUND = 'Статистика Текущего Раунда';
var STATS_CURSESSION = 'Статистика Текущей Сессии';
var STATS_AVG = 'среднее';
var STATS_SOLVE = 'сборка';
var STATS_TIME = 'время';
var STATS_SESSION = 'Сессия';
var STATS_SESSION_NAME = 'Название Сессии';
var STATS_STRING = 'лучшее|текущее|худшее|Сгенерираванно csTimer\'ом на %Y-%M-%D|сборок/всего: %d|один|средний  %mk|срд of %mk|Средний: %v{ (σ = %sgm)}|Средний: %v|Time List:';
var STATS_PREC = 'точное распределение времени: ';
var STATS_PREC_STR = 'авто|0.1с|0.2с|0.5с|1с|2с|5с|10с|20с|50с|100с';
var STATS_TYPELEN = 'список %d тип|список %d ширина|средний|средний';
var PROPERTY_PRINTSCR = 'печатать скрамблы в статистику';
var PROPERTY_SUMMARY = 'как суммарный после списка времени';
var PROPERTY_IMRENAME = 'переименовать сессию сразу же после создания';
var PROPERTY_SCR2SS = 'создавать новую сессию при измене типа скрамбла';
var PROPERTY_SS2SCR = 'восстанавливать тип скрамбла при измене типа сессии';
var PROPERTY_SS2PHASES = 'восстанавливать время мульти-фазы при смене сессии';
var PROPERTY_STATINV = 'обратный список времени';
var PROPERTY_STATAL = 'Статистические индикаторы: ';
var PROPERTY_DELMUL = 'Включить множественное удаление';
var MODULE_NAMES = {
	"ui": 'дисплей',
	"color": 'цвет',
	"timer": 'таймер',
	"vrc": 'virtual&<br>Giiker',
	"kernel": 'глобальный',
	"scramble": 'скрамбл',
	"stats": 'статистика',
	"tools": 'инструменты'
};
var BGIMAGE_URL = 'пожалуйста вставьте изображение\'я url';
var BGIMAGE_INVALID = 'неверный url';
var BGIMAGE_OPACITY = 'помутнение фонового изображения: ';
var BGIMAGE_IMAGE = 'фоновое изображение: ';
var BGIMAGE_IMAGE_STR = 'нет|мануал|CCT';
var SHOW_AVG_LABEL = 'Показывать Таблицу Avg';
var TOOLS_SCRGEN = 'ГенераторСкрамблов';
var SCRGEN_NSCR = 'Количество скрамблов: ';
var SCRGEN_PRE = 'prefix: ';
var SCRGEN_GEN = 'Генерировать скрамблы!';
