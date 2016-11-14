var OK_LANG = '확인';
var CANCEL_LANG = '취소';
var RESET_LANG = '리셋';
var ABOUT_LANG = '정보';
var ZOOM_LANG = '크기';
var BUTTON_TIME_LIST = '시간<br>목록';
var BUTTON_OPTIONS = '설정';
var BUTTON_EXPORT = 'EXPORT';
var BUTTON_DONATE = 'DONATE';
var PROPERTY_USEINS = 'WCA 인스팩션 사용';
var PROPERTY_VOICEINS = 'voice alert of WCA inspection: ';
var PROPERTY_VOICEINS_STR = 'none|male voice|female voice';
var PROPERTY_USECFM = '시간 확인(OK/+2/DNF)';
var PROPERTY_PHASES = '멈추는 횟수: ';
var PROPERTY_TIMERSIZE = '타이머 크기: ';
var CFMDIV_CURTIME = '시간: ';
var PROPERTY_USEMILLI = '천분의 일초 사용';
var PROPERTY_SMALLADP = 'use small font after decimal point';
var PROPERTY_SCRSIZE = '스크램블 크기: ';
var PROPERTY_SCRMONO = '스크램블 띄어쓰기';
var PROPERTY_SCRLIM = '스크램블 창 크기 제한 사용';
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
var BUTTON_SCRAMBLE = '스크<br>램블';
var BUTTON_TOOLS = '도구';
var CROSS_UNAVAILABLE = '이 스크램블 형식에서는 사용할 수 없습니다';
var EOLINE_UNAVAILABLE = '이 스크램블 형식에서는 사용할 수 없습니다';
var IMAGE_UNAVAILABLE = '이 스크램블 형식에서는 사용할 수 없습니다';
var TOOLS_SELECTFUNC = '기능: ';
var TOOLS_CROSS = '십자가 맞추기';
var TOOLS_EOLINE = 'EOLine 맞추기';
var TOOLS_IMAGE = '스크램블 보여주기';
var TOOLS_STATS = '통계';
var TOOLS_DISTRIBUTION = '시간 분배';
var TOOLS_TREND = 'time trend';
var PROPERTY_IMGSIZE = '스크램블 이미지 크기: ';
var TIMER_INSPECT = '보기';
var TIMER_SOLVE = '맞추기';
var PROPERTY_USEMOUSE = 'use mouse timer';
var PROPERTY_TIMEU = '타이머 업데이트: ';
var PROPERTY_TIMEU_STR = '업데이트|0.1s|초|인스펙션|없음';
var PROPERTY_PRETIME = '시작하기 전 스페이스바를 누르고 있는 시간: ';
var PROPERTY_ENTERING = '시간 입력 방법: ';
var PROPERTY_ENTERING_STR = '타이머|직접 입력|스텍매트|가상큐브';
var PROPERTY_COLOR = '색생 선택: ';
var PROPERTY_COLORS = 'font color: |background color: |board color: |button color: |link color: |Logo color: |Logo bgcolor: ';
var PROPERTY_VIEW = 'UI style is:';
var PROPERTY_VIEW_STR = 'Auto|Mobile|Desktop';
var COLOR_EXPORT = 'Please save the string for import: ';
var COLOR_IMPORT = 'Please input the string exported: ';
var COLOR_FAIL = 'Incorrect Data, Import Failed';
var PROPERTY_FONTCOLOR_STR = 'black|white';
var PROPERTY_COLOR_STR = '랜덤|스타일1|스타일2|스타일3|검은색|하양색|스타일6|수동|export...|import...';
var PROPERTY_FONT = '글꼴 선택: ';
var PROPERTY_FONT_STR = '랜덤|기본|디지털1|디지털2|디지털3|디지털4|디지털5';
var PROPERTY_FORMAT = '시간 형식: '
var PROPERTY_USEKSC = '키보드 단축키 사용';
var PROPERTY_NTOOLS = '도구 갯수';
var PROPERTY_AHIDE = 'Hide All Elements When Timing';
var SCRAMBLE_LAST = '전 스크램블';
var SCRAMBLE_NEXT = '다음 스크램블';
var SCRAMBLE_SCRAMBLE = ' 스크램블';
var SCRAMBLE_LENGTH = '스크램블 길이';
var SCRAMBLE_INPUT = '스크램블 입력';
var scrdata = [
	['WCA', [
		['3x3x3', "333", 0],
		['4x4x4', "444wca", -40],
		['5x5x5', "555wca", -60],
		['2x2x2', "222so", 0],
		['3x3 BLD', "333ni", 0],
		['3x3 OH', "333oh", 0],
		['3x3 FM', "333fm", 0],
		['3x3 FT', "333ft", 0],
		['Megaminx', "mgmp", -70],
		['Pyraminx', "pyrso", -10],
		['Square-1', "sqrs", 0],
		['Clock', "clko", 0],
		['Skewb', "skbso", 0],
		['6x6x6', "666wca", -80],
		['7x7x7', "777wca", -100],
		['4x4 BLD', "444bld", -40],
		['5x5 BLD', "555bld", -60],
		['3x3 MBLD', "r3", 5]
	]],
	['입력', [
		['입력', "input", 0]
	]],
	['===WCA===', [
		['--', "blank", 0]
	]],
	['2x2x2', [
		["WCA", "222so", 0],
		['최적의 랜덤 상태', "222o", 0],
		['3-gen', "2223", 25],
		['EG', "222eg", 0],
		['EG0', "222eg0", 0],
		['EG1', "222eg1", 0],
		['EG2', "222eg2", 0]
	]],
	['3x3x3', [
		["WCA", "333", 0],
		['오래된 스타일', "333o", 25],
		['바보들을 위한 3x3x3', "333noob", 25],
		['모서리 조각', "edges", 0],
		['코서 조각', "corners", 0],
		['마지막 층', "ll", 0],
		['zb 마지막 층', "zbll", 0],
		['마지막 층 코너 조각', "cll", 0],
		['마지막 층 모서리 조각', "ell", 0],
		['마지막 여섯 모서리', "lse", 0],
		['마지막 여섯 모서리&ltM,U&gt', "lsemu", 0],
		['Roux L10P', "cmll", 0],
		['맞춰진 십자가', "f2l", 0],
		['마지막 조각 + 마지막 층', "lsll2", 0],
		['2GLL', "2gll", 0],
		['ZBLS', "zbls", 0],
		['ZZLL', "zzll", 0],
		['PLL', "pll", 0],
		['EOLine', "eoline", 0],
		['쉬운 십자가', 'easyc', 3]
	]],
	['4x4x4', [
		["WCA", "444wca", 40],
		['SiGN', "444", 40],
		['랜덤 상태', "444o", 0],
		['YJ', "444yj", 40],
		['4x4x4 모서리 조각', "4edge", 8],
		['R,r,U,u', "RrUu", 40]
	]],
	['5x5x5', [
		["WCA", "555wca", 60],
		['SiGN', "555", 60],
		['5x5x5 모서리 조각', "5edge", 8]
	]],
	['6x6x6', [
		["WCA", "666wca", 80],
		['SiGN', "666si", 80],
		['prefix', "666p", 80],
		['suffix', "666s", 80],
		['6x6x6 모서리 조각', "6edge", 8]
	]],
	['7x7x7', [
		["WCA", "777wca", 100],
		['SiGN', "777si", 100],
		['prefix', "777p", 100],
		['suffix', "777s", 100],
		['7x7x7 모서리 조각', "7edge", 8]
	]],
	['Clock', [
		['jaap', "clk", 0],
		['wca', "clkwca", 0],
		['짧은', "clkc", 0],
		['효율적인 핀 순서', "clke", 0]
	]],
	['Megaminx', [
		["WCA", "mgmp", 70],
		['Carrot', "mgmc", 70],
		['오래된 스타일', "mgmo", 70]
	]],
	['Pyraminx', [
		["WCA", "pyrso", 10],
		['최적의 랜덤 상태', "pyro", 0],
		['랜덤 움직임', "pyrm", 25]
	]],
	['Square-1', [
		["WCA", "sqrs", 0],
		['면 회전 메트릭', "sq1h", 40],
		['트위스트 메트릭', "sq1t", 20]
	]],
	['Skewb', [
		["WCA", "skbso", 0],
		['U L R B', "skb", 25]
	]],
	['===기타===', [
		['--', "blank", 0]
	]],
	['15 퍼즐', [
		['조각 움직임', "15p", 80],
		['움직임 없음', "15pm", 80]
	]],
	['LxMxN', [
		['1x3x3 (납작 큐브)', "133", 0],
		['2x2x3 (타워 큐브)', "223", 0],
		['2x3x3 (도미노)', "233", 25],
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
		['랜덤 상태', "gearso", 0],
		['최적의 랜덤 상태', "gearo", 0],
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
		['오래된 스타일', "prco", 70]
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
		['트위스트 메트릭', "ssq1t", 20]
	]],
	['UFO', [
		['Jaap style', "ufo", 25]
	]],
	['Other', [
		['FTO (Face-Turning Octahedron)', "fto", 25]
	]],
	['===특수===', [
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
		['마지막 조각 + 마지막 층 (오래된)', "lsll", 15]
	]],
	['Bandaged Cube', [
		['Bicube', "bic", 30],
		['Square-1 /,(1,0)', "bsq", 25]
	]],
	['Megaminx subsets', [
		['2-generator R,U', "minx2g", 30],
		['마지막 조각 + 마지막 층', "mlsll", 20]
	]],
	['릴레이', [
		['3x3x3 다섯개', "r3", 5],
		['234 릴레이', "r234", 0],
		['2345 릴레이', "r2345", 0],
		['23456 릴레이', "r23456", 0],
		['234567 릴레이', "r234567", 0]
	]],
	['===농담===', [
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
	['윗면', '아랫면'],
	['오른면', '왼면'],
	['앞면', '뒷면']
];
var SCRAMBLE_NOOBSS = ' 90도 시계방향,| 90도 반시계방향,| 180도,';
var STATS_CFM_RESET = '이 세션에 있는 모든 시간을 리셋할까요?';
var STATS_CFM_DELSS = 'delete this session?';
var STATS_CFM_DELMUL = 'The Number Of Deleted Values From Current Index?';
var STATS_CFM_DELETE = '이 시간을 지울까요?';
var STATS_COMMENT = '댓글:';
var STATS_CURROUND = '현재 라운드 통계';
var STATS_CURSESSION = '현재 세션 통계';
var STATS_AVG = '평균';
var STATS_SOLVE = '완성/전체';
var STATS_TIME = '시간';
var STATS_SESSION = '세션';
var STATS_SESSION_NAME = 'Session Name';
var STATS_STRING = '최고|현제|최저|%Y년 %M월 %D일에 csTimer에 의해 만들어짐|완성/전체: %d|싱글|중간 %mk|평균 %mk|평균: %v{ (σ = %sgm)}|중간: %v|목록:';
var STATS_PREC = '시간 분포 정밀도: ';
var STATS_PREC_STR = '자동|0.1초|0.2초|0.5초|1초|2초|5초|10초|20초|50초|100초';
var STATS_TYPELEN = 'list %d type|list %d length|average|mean';
var PROPERTY_PRINTSCR = '통계에 스크램블 표시';
var PROPERTY_SUMMARY = 'show summary before time list';
var PROPERTY_IMRENAME = 'rename session immediately after creation';
var PROPERTY_SCR2SS = 'create new session when switching scramble type';
var PROPERTY_SS2SCR = 'restore scramble type when switching session';
var PROPERTY_DELMUL = 'Enable Multiple Deletion';
var MODULE_NAMES = {
	"ui": '디스플레이',
	"color": '색생',
	"timer": '타이머',
	"kernel": '글로벌',
	"scramble": '스크램블',
	"stats": '통계',
	"tools": '도구'
};
var BGIMAGE_URL = '사진 주소를 입력하세요';
var BGIMAGE_INVALID = '잘못된 주소';
var BGIMAGE_OPACITY = '배경 사진 투명도: ';
var BGIMAGE_IMAGE = '배경 사진: ';
var BGIMAGE_IMAGE_STR = '없음|수동|CCT';
var SHOW_AVG_LABEL = '평균 보기';
var TOOLS_SCRGEN = 'ScrambleGenerator';
var SCRGEN_NSCR = 'Number of scrambles: ';
var SCRGEN_PRE = 'prefix: ';
var SCRGEN_GEN = 'Generate Scrambles!';