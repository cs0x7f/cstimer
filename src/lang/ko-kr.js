var OK_LANG = '확인';
var CANCEL_LANG = '취소';
var RESET_LANG = '초기화';
var ABOUT_LANG = '정보';
var ZOOM_LANG = '확대/축소';
var COPY_LANG = 'Copy';
var BUTTON_TIME_LIST = '시간<br>목록';
var BUTTON_OPTIONS = '설정';
var BUTTON_EXPORT = '내보내기';
var BUTTON_DONATE = '후원';
var PROPERTY_SR = 'With session';
var PROPERTY_USEINS = 'WCA 미리보기 사용';
var PROPERTY_USEINS_STR = 'Always (down)|Always (up)|Except BLD (down)|Except BLD (up)|Never';
var PROPERTY_SHOWINS = 'Show an icon when inspection is enabled';
var PROPERTY_VOICEINS = 'WCA 미리보기 음성 알림';
var PROPERTY_VOICEINS_STR = '없음|남성|여성';
var PROPERTY_VOICEVOL = '음성 볼륨';
var PROPERTY_PHASES = '다단계 측정';
var PROPERTY_TIMERSIZE = '초시계 크기';
var PROPERTY_USEMILLI = '0.001초 단위 사용';
var PROPERTY_SMALLADP = '소수점 뒤 작은 글꼴 사용';
var PROPERTY_SCRSIZE = '섞기 글꼴 크기';
var PROPERTY_SCRMONO = '섞기 글자간 띄어쓰기';
var PROPERTY_SCRLIM = '섞기 창 높이 제한';
var PROPERTY_SCRALIGN = '섞기 창 정렬 방식';
var PROPERTY_SCRALIGN_STR = '가운데|왼쪽|오른쪽';
var PROPERTY_SCRWRAP = 'Scramble Wrap';
var PROPERTY_SCRWRAP_STR = 'Balanced|Normal';
var PROPERTY_SCRNEUT = 'Color neutral';
var PROPERTY_SCRNEUT_STR = 'None|Single face|Double faces|Six faces';
var PROPERTY_SCREQPR = 'Probabilities for training-scramble states';
var PROPERTY_SCREQPR_STR = 'Actual|Equal|Random order';
var PROPERTY_SCRFAST = '빠른 4x4x4 섞기 사용 (비공인)';
var PROPERTY_SCRKEYM = 'Label key move(s) in scramble';
var PROPERTY_SCRCLK = '섞기를 클릭할 때 동작';
var PROPERTY_SCRCLK_STR = '없음|복사|다음 섞기';
var PROPERTY_WNDSCR = '섞기창 표시 스타일';
var PROPERTY_WNDSTAT = '통계창 표시 스타일';
var PROPERTY_WNDTOOL = '도구창 표시 스타일';
var PROPERTY_WND_STR = '기본|플랫';
var EXPORT_DATAEXPORT = '데이터 가져오기/내보내기';
var EXPORT_TOFILE = '파일로 내보내기';
var EXPORT_FROMFILE = '파일로부터 가져오기';
var EXPORT_TOSERV = '서버로 내보내기';
var EXPORT_FROMSERV = '서버로부터 가져오기';
var EXPORT_FROMOTHER = '다른 타이머로부터 모둠 가져오기';
var EXPORT_USERID = '계정을 입력해주세요 (영문, 숫자만 사용 가능)';
var EXPORT_INVID = '계정 이름에는 영문과 숫자만 사용할 수 있다구욧!';
var EXPORT_ERROR = '알 수 없는 오류가 발생했나봐요... ㅠㅠ';
var EXPORT_NODATA = '데이터를 발견하지 못했어요... (아직 사용된 적이 없는 계정인 것 같네요)';
var EXPORT_UPLOADED = '올리기 성공';
var EXPORT_CODEPROMPT = 'Save this code, or type saved code to import';
var EXPORT_ONLYOPT = '모든 설정 가져오기/내보내기';
var EXPORT_ACCOUNT = '계정 내보내기';
var EXPORT_LOGINGGL = '구글 계정을 사용하여 로그인';
var EXPORT_LOGINWCA = 'WCA 계정을 사용하여 로그인';
var EXPORT_LOGOUTCFM = '로그아웃하시겠습니까?';
var EXPORT_LOGINAUTHED = 'Authorized<br>Fetching Data...';
var EXPORT_AEXPALERT = 'More than %d solves since last backup';
var EXPORT_WHICH = 'You have %d file(s), which one should be imported?';
var EXPORT_WHICH_ITEM = '%s solve(s), uploaded at %t';
var IMPORT_FINAL_CONFIRM = 'This will override all local data! It will modify %d sessions, add %a and remove %r solves at least. Confirm to import data?';
var BUTTON_SCRAMBLE = '섞기<br>공식';
var BUTTON_TOOLS = '도구';
var IMAGE_UNAVAILABLE = '해당 유형은 섞기 그림이 지원되지 않습니다.';
var TOOLS_SELECTFUNC = '기능';
var TOOLS_CROSS = '십자/Xcross 도우미';
var TOOLS_EOLINE = 'EOLine 도우미';
var TOOLS_ROUX1 = 'Roux S1 도우미';
var TOOLS_222FACE = '2x2x2 face';
var TOOLS_GIIKER = '블루투스 큐브';
var TOOLS_IMAGE = '섞기 그림';
var TOOLS_STATS = '통계 정보';
var TOOLS_HUGESTATS = '세션간 교차 통계';
var TOOLS_DISTRIBUTION = '시간 분포';
var TOOLS_TREND = '시간 추이';
var TOOLS_METRONOME = '메트로놈';
var TOOLS_RECONS = 'Reconstruct';
var TOOLS_RECONS_NODATA = 'No solution found.';
var TOOLS_RECONS_TITLE = 'insp|exec|turn|tps';
var TOOLS_TRAINSTAT = 'Training Stat.';
var TOOLS_BLDHELPER = 'BLD Helper';
var TOOLS_CFMTIME = '시간 확인';
var TOOLS_SOLVERS = '해법';
var TOOLS_DLYSTAT = 'Daily Statistics';
var TOOLS_DLYSTAT1 = 'Period|Start of Day|Week';
var TOOLS_DLYSTAT_OPT1 = 'day|week|month|year';
var TOOLS_DLYSTAT_OPT2 = 'Sun|Mon|Tue|Wed|Thu|Fri|Sat';
var TOOLS_SYNCSEED = '공통 섞기';
var TOOLS_SYNCSEED_SEED = '시드';
var TOOLS_SYNCSEED_INPUT = '시드 입력';
var TOOLS_SYNCSEED_30S = '30초 시드 사용';
var TOOLS_SYNCSEED_HELP = 'If enabled, scramble will only depend on the seed and scramble settings.';
var TOOLS_SYNCSEED_DISABLE = '현재 시드를 사용하지 않을까요?';
var TOOLS_SYNCSEED_INPUTA = '시드 값 입력 (a-zA-Z0-9)';
var TOOLS_BATTLE = 'Online battle';
var TOOLS_BATTLE_HEAD = 'Room|Join Room';
var TOOLS_BATTLE_TITLE = 'Rank|Status|Time';
var TOOLS_BATTLE_STATUS = 'Ready|Inspect|Solving|Solved|Lost';
var TOOLS_BATTLE_INFO = 'Join a battle room with your friend, then you will battle together.';
var TOOLS_BATTLE_JOINALERT = 'Please input the room ID';
var TOOLS_BATTLE_LEAVEALERT = 'Leave current room';
var OLCOMP_UPDATELIST = '대회 목록 업데이트';
var OLCOMP_VIEWRESULT = '결과 보기';
var OLCOMP_VIEWMYRESULT = '내 기록';
var OLCOMP_START = '시작!';
var OLCOMP_SUBMIT = '제출!';
var OLCOMP_SUBMITAS = 'Submit As: ';
var OLCOMP_WCANOTICE = 'WCA 계정으로 제출하시겠습니까? (제출 후 인식되지 않으면 다시 로그인)';
var OLCOMP_OLCOMP = '온라인 대회';
var OLCOMP_ANONYM = '익명';
var OLCOMP_ME = '나';
var OLCOMP_WCAACCOUNT = 'WCA 계정';
var OLCOMP_ABORT = '대회를 중단하고 결과를 표시할까요?';
var OLCOMP_WITHANONYM = '익명으로';
var PROPERTY_IMGSIZE = '섞기 그림 크기';
var PROPERTY_IMGREP = 'Show virtual cube animation when clicking scramble image';
var TIMER_INSPECT = '준비';
var TIMER_SOLVE = '시작';
var PROPERTY_USEMOUSE = '마우스로 초시계 사용';
var PROPERTY_TIMEU = '초시계 갱신 방식';
var PROPERTY_TIMEU_STR = '실시간|0.1초|1초|미리보기만|숨기기';
var PROPERTY_PRETIME = '측정 시작 전 스페이스바를 길게 누르기(초)';
var PROPERTY_ENTERING = '시간 입력 방법';
var PROPERTY_ENTERING_STR = '초시계|직접 입력|스택매트|모위(MoYu)|가상 큐브|Bluetooth Cube|qCube|Bluetooth Timer|last layer training';
var PROPERTY_INTUNIT = '숫자 입력할 때 단위';
var PROPERTY_INTUNIT_STR = '초|센티초|밀리초';
var PROPERTY_COLOR = '색 주제';
var PROPERTY_COLORS = '글꼴 색|배경 색|창 색|단추 색|링크 색|로고 색|로고 배경 색';
var PROPERTY_VIEW = '화면 최적화';
var PROPERTY_VIEW_STR = '자동|모바일|데스크톱';
var PROPERTY_UIDESIGN = 'UI 디자인';
var PROPERTY_UIDESIGN_STR = 'Normal|Material design|Normal w/o shadows|Material design w/o shadows';
var COLOR_EXPORT = '아래의 문자열을 복사하여 저장하세요';
var COLOR_IMPORT = '이전에 저장해둔 문자열을 입력하세요';
var COLOR_FAIL = '올바르지 않은 데이터, 가져오기 실패';
var PROPERTY_FONTCOLOR_STR = '검정|하양';
var PROPERTY_COLOR_STR = '직접 설정|가져오기/내보내기...|무작위로|봄볕|바나나|악마성|수묵화|눈길|달빛|solarized dark|solarized light';
var PROPERTY_FONT = '초시계 글꼴';
var PROPERTY_FONT_STR = '무작위로|기본|디지털1|디지털2|디지털3|디지털4|디지털5';
var PROPERTY_FORMAT = '시간 표시 형식';
var PROPERTY_USEKSC = '키보드 단축키 사용';
var PROPERTY_USEGES = 'use gesture control';
var PROPERTY_NTOOLS = '도구 창 개수';
var PROPERTY_AHIDE = '시간 측정 중 모든 창 숨기기';
var SCRAMBLE_LAST = '이전';
var SCRAMBLE_NEXT = '다음';
var SCRAMBLE_SCRAMBLE = ' 섞기';
var SCRAMBLE_SCRAMBLING = 'Scrambling';
var SCRAMBLE_LENGTH = '길이';
var SCRAMBLE_INPUT = '섞기 공식 입력';
var SCRAMBLE_INPUTTYPE = 'Scramble type';
var PROPERTY_VRCSPEED = 'VRC 기본 속도(tps)';
var PROPERTY_VRCORI = 'Virtual cube orientation';
var PROPERTY_VRCMP = '다단계 측정';
var PROPERTY_VRCMPS = '없음|CFOP|CF+OP|CFFFFOP|CFFFFOOPP|Roux';
var PROPERTY_GIIKERVRC = '가상 블루투스 큐브 표시';
var PROPERTY_GIISOK_DELAY = 'Mark scrambled if stay';
var PROPERTY_GIISOK_DELAYS = '2s|3s|4s|5s|Never|Correctly scrambled';
var PROPERTY_GIISOK_KEY = 'Mark scrambled with spacebar';
var PROPERTY_GIISOK_MOVE = 'Mark scrambled by doing';
var PROPERTY_GIISOK_MOVES = 'U4, R4, etc|(U U\')2, (U\' U)2, etc|Never';
var PROPERTY_GIISBEEP = 'Beep when mark scrambled';
var PROPERTY_GIIRST = '연결할 때 블루투 큐브 초기화';
var PROPERTY_GIIRSTS = '항상|표시|안함';
var PROPERTY_GIIMODE = 'Bluetooth Cube Mode';
var PROPERTY_GIIMODES = 'Normal|Training|Continuous training';
var PROPERTY_VRCAH = 'Useless pieces in huge cube';
var PROPERTY_VRCAHS = 'Hide|Border|Color|Show';
var CONFIRM_GIIRST = '블루투스 큐브를 초기 상태로 재설정하시겠습니까?';
var PROPERTY_GIIAED = '자동 하드웨어 오류 감지';
var scrdata = [
	['WCA', [
		['3x3x3', "333", 0],
		['2x2x2', "222so", 0],
		['4x4x4', "444wca", -40],
		['5x5x5', "555wca", -60],
		['6x6x6', "666wca", -80],
		['7x7x7', "777wca", -100],
		['3x3 눈가리기', "333ni", 0],
		['3x3 최소회전', "333fm", 0],
		['3x3 한손', "333oh", 0],
		['클락', "clkwca", 0],
		['메가밍크스', "mgmp", -70],
		['피라밍크스', "pyrso", -10],
		['스큐브', "skbso", 0],
		['스퀘어-1', "sqrs", 0],
		['4x4 눈가리기', "444bld", -40],
		['5x5 눈가리기', "555bld", -60],
		['3x3 복수 눈가리기', "r3ni", 5]
	]],
	['입력', [
		['직접 입력', "input", 0],
		['대회', "remoteComp", 0],
		['Online battle', "remoteBattle", 0],
		['Remote', "remoteOther", 0]
	]],
	['===WCA===', [
		['--', "blank", 0]
	]],
	['3x3x3', [
		["무작위 상태 (WCA)", "333", 0],
		['무작위 수순', "333o", 25],
		['바보', "333noob", 25],
		['모서리만', "edges", 0],
		['귀퉁이만', "corners", 0],
		['BLD Helper', "nocache_333bldspec", 0],
		['Pattern Tool', "nocache_333patspec", 0],
		['3x3 발', "333ft", 0],
		['Custom', "333custom", 0]
	]],
	['3x3x3 CFOP', [
		['PLL', "pll", 0],
		['OLL', "oll", 0],
		['맨 위층+홈통 1개', "lsll2", 0],
		['맨 위층만', "ll", 0],
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
		['맨 위층+홈통 4개', "f2l", 0],
		['EOLine', "eoline", 0],
		['EO Cross', "eocross", 0],
		['간단한 십자', "easyc", 3],
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
		["무작위 상태 (WCA)", "222so", 0],
		['최적', "222o", 0],
		['3-생성', "2223", 25],
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
		['무작위 수순', "444m", 40],
		['SiGN', "444", 40],
		['YJ', "444yj", 40],
		['모서리부터', "4edge", 0],
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
		['모서리부터', "5edge", 8]
	]],
	['6x6x6', [
		["WCA", "666wca", 80],
		['SiGN', "666si", 80],
		['접두식', "666p", 80],
		['접미식', "666s", 80],
		['모서리부터', "6edge", 8]
	]],
	['7x7x7', [
		["WCA", "777wca", 100],
		['SiGN', "777si", 100],
		['접두식', "777p", 100],
		['접미식', "777s", 100],
		['모서리부터', "7edge", 8]
	]],
	['클락', [
		['WCA', "clkwca", 0],
		['WCA (old)', "clkwcab", 0],
		['WCA w/o y2', "clknf", 0],
		['얍(Jaap)', "clk", 0],
		['최적', "clko", 0],
		['약식 표기', "clkc", 0],
		['효율적 핀 순서', "clke", 0]
	]],
	['메가밍크스', [
		["WCA", "mgmp", 70],
		['Carrot (Oskar)', "mgmc", 70],
		['구 방식', "mgmo", 70],
		['2원 생성자: R,U', "minx2g", 30],
		['맨 위층+홈통 1개', "mlsll", 0],
		['PLL', "mgmpll", 0],
		['Last Layer', "mgmll", 0]
	]],
	['피라밍크스', [
		["무작위 상태 (WCA)", "pyrso", 10],
		['최적', "pyro", 0],
		['무작위 수순', "pyrm", 25],
		['L4E', "pyrl4e", 0],
		['4 tips', "pyr4c", 0],
		['No bar', "pyrnb", 0]
	]],
	['스큐브', [
		["무작위 상태 (WCA)", "skbso", 0],
		['최적', "skbo", 0],
		['무작위 수순', "skb", 25],
		['No bar', "skbnb", 0]
	]],
	['스퀘어-1', [
		["무작위 상태 (WCA)", "sqrs", 0],
		["CSP", "sqrcsp", 0],
		["PLL", "sq1pll", 0],
		['면회전 계량', "sq1h", 40],
		['연회전 계량', "sq1t", 20]
	]],
	['===기타===', [
		['--', "blank", 0]
	]],
	['15 퍼즐', [
		['무작위 상태 URLD', "15prp", 0],
		['무작위 상태 ^<>v', "15prap", 0],
		['무작위 상태 Blank', "15prmp", 0],
		['무작위 수순 URLD', "15p", 80],
		['무작위 수순 ^<>v', "15pat", 80],
		['무작위 수순 Blank', "15pm", 80]
	]],
	['8 puzzle', [
		['무작위 상태 URLD', "8prp", 0],
		['무작위 상태 ^<>v', "8prap", 0],
		['무작위 상태 Blank', "8prmp", 0]
	]],
	['LxMxN', [
		['1x3x3 (플로피 큐브)', "133", 0],
		['2x2x3 (타워 큐브)', "223", 0],
		['2x3x3 (도미노 큐브)', "233", 25],
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
	['기어 큐브', [
		['무작위 상태', "gearso", 0],
		['최적', "gearo", 0],
		['무작위 수순', "gear", 10]
	]],
	['Kilominx', [
		['무작위 상태', "klmso", 0],
		['Pochmann', "klmp", 30]
	]],
	['기가밍크스', [
		['포흐만(Pochmann)', "giga", 300]
	]],
	['Crazy Puzzle', [
		['Crazy 3x3x3', "crz3a", 30]
	]],
	['C메트릭', [
		['C메트릭', "cm3", 25],
		['C메트릭 미니', "cm2", 25]
	]],
	['헬리콥터 큐브', [
		['Heli copter', "heli", 40],
		['Curvy copter', "helicv", 40],
		['2x2 Heli random move', "heli2x2", 70],
		['2x2 Heli by group', "heli2x2g", 5]
	]],
	['레디 큐브', [
		['무작위 상태', "rediso", 0],
		['모위(MoYu)', "redim", 8],
		['무작위 수순', "redi", 20]
	]],
	['Dino Cube', [
		['무작위 상태', "dinoso", 0],
		['최적', "dinoo", 0]
	]],
	['Ivy cube', [
		['무작위 상태', "ivyso", 0],
		['최적', "ivyo", 0],
		['무작위 수순', "ivy", 10]
	]],
	['Master Pyraminx', [
		['무작위 상태', "mpyrso", 0],
		['무작위 수순', "mpyr", 42]
	]],
	['피라밍크스 크리스털', [
		['포흐만(Pochmann)', "prcp", 70],
		['구 방식', "prco", 70]
	]],
	['샴 큐브', [
		['1x1x3 덩이', "sia113", 25],
		['1x2x3 덩이', "sia123", 25],
		['2x2x2 덩이', "sia222", 25]
	]],
	['Square', [
		['스퀘어-2', "sq2", 20],
		['슈퍼 스퀘어-1', "ssq1t", 20]
	]],
	['슈퍼 플로피', [
		[' ', "sfl", 25]
	]],
	['UFO', [
		['얍(Jaap)', "ufo", 25]
	]],
	['FTO (면 회전식 옥타헤드런)', [
		['무작위 상태', "ftoso", 0],
		['무작위 수순', "fto", 30],
		['L3T', "ftol3t", 0],
		['L3T+LBT', "ftol4t", 0],
		['TCP', "ftotcp", 0],
		['edges only', "ftoedge", 0],
		['centers only', "ftocent", 0],
		['corners only', "ftocorn", 0],
		['Diamond 무작위 상태', "dmdso", 0]
	]],
	['Icosahedron', [
		['Icosamate 무작위 수순', "ctico", 60]
	]],
	['===연습용===', [
		['--', "blank", 0]
	]],
	['3x3x3 부분집합', [
		['2원 생성자: R,U', "2gen", 0],
		['2원 생성자: L,U', "2genl", 0],
		['루(Roux) 생성자: M,U', "roux", 0],
		['3원 생성자: F,R,U', "3gen_F", 0],
		['3원 생성자: R,U,L', "3gen_L", 0],
		['3원 생성자: R,r,U', "RrU", 0],
		['Domino Subgroup', "333drud", 0],
		['반 바퀴 회전만', "half", 0],
		['맨 위층+홈통 1개 (구 방식)', "lsll", 15]
	]],
	['묶인 큐브', [
		['바이큐브', "bic", 30],
		['스퀘어-1 /,(1,0)', "bsq", 25]
	]],
	['이어맞추기', [
		['3x3x3 복수', "r3", 5],
		['234 계주', "r234", 0],
		['2345 계주', "r2345", 0],
		['23456 계주', "r23456", 0],
		['234567 계주', "r234567", 0],
		['234 계주 (WCA)', "r234w", 0],
		['2345 계주 (WCA)', "r2345w", 0],
		['23456 계주 (WCA)', "r23456w", 0],
		['234567 계주 (WCA)', "r234567w", 0],
		['Mini Guildford', "rmngf", 0]
	]],
	['===ㅁㄴㅇㄹ===', [
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
	['윗면을', '아랫면을'],
	['오른면을', '왼면을'],
	['앞면을', '뒷면을']
];
var SCRAMBLE_NOOBSS = ' 시계 방향으로 90도 돌리기,| 반시계 방향으로 90도 돌리기,| 180도 돌리기,';
var SCROPT_TITLE = 'Scramble Options';
var SCROPT_BTNALL = 'Full';
var SCROPT_BTNNONE = 'Clear';
var SCROPT_EMPTYALT = 'Please select at least one case';
var STATS_CFM_RESET = '이 모둠의 시간목록을 초기화할까요?';
var STATS_CFM_DELSS = '[%s] 모둠을 삭제하시겠습니까?';
var STATS_CFM_DELMUL = '해당 위치에서 몇 개의 값을 지울까요?';
var STATS_CFM_DELETE = '이 시간을 지울까요?';
var STATS_COMMENT = '설명';
var STATS_REVIEW = '리뷰';
var STATS_DATE = '날짜';
var STATS_SSSTAT = '1-solve stat.';
var STATS_SSRETRY = 'Retry';
var STATS_CURROUND = '회차 통계 정보';
var STATS_CURSESSION = '모둠 통계 정보';
var STATS_CURSPLIT = 'Phase %d of Current Session Statistics';
var STATS_EXPORTCSV = 'CSV로 내보내기';
var STATS_SSMGR_TITLE = '모둠 관리자';
var STATS_SSMGR_NAME = '이름';
var STATS_SSMGR_DETAIL = '모둠 정보';
var STATS_SSMGR_OPS = '이름 바꾸기|생성|나누기|합치기|삭제|정렬|Merge&Dedupe';
var STATS_SSMGR_ORDER = '섞기별 순서';
var STATS_SSMGR_ODCFM = '모든 모둠을 섞기에 따라 정렬하시겠습니까?';
var STATS_SSMGR_SORTCFM = '%d solve(s) will be reordered, confirm?';
var STATS_ALERTMG = ' [%f] 모둠의 모든 시간을 [%t] 모둠의 끝으로 합치시겠습니까?';
var STATS_PROMPTSPL = '[%s] 모둠으로부터 최근 시간 몇 개를 분할하시겠습니까?';
var STATS_ALERTSPL = '적어도 1개는 나누거나 남겨놔야 합니다';
var STATS_AVG = '평균';
var STATS_SUM = 'sum';
var STATS_SOLVE = '완료';
var STATS_TIME = '시간';
var STATS_SESSION = '모둠';
var STATS_SESSION_NAME = '모둠 이름 수정';
var STATS_SESSION_NAMEC = '새 모둠의 이름';
var STATS_STRING = '최고|현재|최저|이 통계는 %Y년 %M월 %D일 csTimer에서 자동으로 생성되었습니다.|완성/전체: %d|단일|%mk회 평균|%mk회 절단평균|전체 절단평균: %v{ (σ = %sgm)}|전체 평균: %v|상세 목록:|solving from %s to %e|Totally spent: %d|target';
var STATS_PREC = '시간 분포 정밀도';
var STATS_PREC_STR = '자동|0.1초|0.2초|0.5초|1초|2초|5초|10초|20초|50초|100초';
var STATS_TYPELEN = '목록%d 유형|목록%d 길이|절단평균|평균';
var STATS_STATCLR = 'Enable session emptying';
var STATS_ABSIDX = 'Show absolute index in statistics report';
var STATS_XSESSION_DATE = 'any date|past 24 hours|past 7 days|past 30 days|past 365 days';
var STATS_XSESSION_NAME = 'any name';
var STATS_XSESSION_SCR = 'any scramble';
var STATS_XSESSION_CALC = '계산';
var STATS_RSFORSS = 'Show stat. when clicking solve number';
var PROPERTY_PRINTSCR = '통계 정보에 섞기 포함';
var PROPERTY_PRINTCOMM = 'print comment(s) in statistics';
var PROPERTY_PRINTDATE = 'print solving date in statistics';
var PROPERTY_SUMMARY = '시간목록 위에 통계 요약 표시';
var PROPERTY_IMRENAME = '새 모둠을 만들 때마다 이름 바꾸기';
var PROPERTY_SCR2SS = '섞기 유형을 바꿀 때마다 새 모둠 만들기';
var PROPERTY_SS2SCR = '각 모둠의 섞기 유형 유지';
var PROPERTY_SS2PHASES = '각 모둠의 다단계 측정 설정 유지';
var PROPERTY_STATINV = '시간목록 역순으로 표시';
var PROPERTY_STATSSUM = 'Show sum in time list';
var PROPERTY_STATTHRES = 'Show target time for session best';
var PROPERTY_STATBPA = 'Show best possible average (BPA)';
var PROPERTY_STATWPA = 'Show worst possible average (WPA)';
var PROPERTY_STATAL = '통계지표';
var PROPERTY_STATALU = 'Customized statistical indicator';
var PROPERTY_HLPBS = 'Highlight PBs';
var PROPERTY_HLPBS_STR = 'Dark orange as WCA|As link color|Bolder|None';
var PROPERTY_DELMUL = '일괄 삭제 허용';
var PROPERTY_TOOLSFUNC = '선택된 기능';
var PROPERTY_TRIM = 'Number of solves trimmed at better side';
var PROPERTY_TRIMR = 'Number of solves trimmed at worse side';
var PROPERTY_TRIM_MED = '중간값';
var PROPERTY_STKHEAD = '스택매트 상태 정보 사용';
var PROPERTY_TOOLPOS = 'Tools panel position';
var PROPERTY_TOOLPOS_STR = 'Bottom|Float|Top';
var PROPERTY_HIDEFULLSOL = 'Show solution progressively';
var PROPERTY_IMPPREV = '최신이 아닌 데이터 가져오기';
var PROPERTY_AUTOEXP = '자동 내보내기 (해법 100개 마다)';
var PROPERTY_AUTOEXP_OPT = 'Never|To File|With csTimer ID|With WCA Account|With Google Account|Alert Only';
var PROPERTY_SCRASIZE = '자동 섞기 크기';
var MODULE_NAMES = {
	"kernel": '전역',
	"ui": '사용자 환경',
	"color": '색채 배합',
	"timer": '초시계',
	"scramble": '섞기',
	"stats": '통계',
	"tools": '도구',
	"vrc": '가상&<br>블루투스'
};
var BGIMAGE_URL = '그림 파일 주소를 입력하세요(URL)';
var BGIMAGE_INVALID = '잘못된 주소';
var BGIMAGE_OPACITY = '배경 그림 투명도';
var BGIMAGE_IMAGE = '배경 그림';
var BGIMAGE_IMAGE_STR = '없음|직접 입력|CCT';
var SHOW_AVG_LABEL = '초시계 아래에 평균 정보 표시';
var SHOW_DIFF_LABEL = 'Show Difference Label';
var SHOW_DIFF_LABEL_STR = '-Green+Red|-Red+Green|Normal|None';
var USE_LOGOHINT = '로고에 힌트 메시지';
var TOOLS_SCRGEN = '섞기 생성기';
var SCRGEN_NSCR = '섞기 개수';
var SCRGEN_PRE = '번호 표기';
var SCRGEN_GEN = '섞기 공식 생성하기!';
var VRCREPLAY_TITLE = 'Virtual Replay';
var VRCREPLAY_ORI = 'raw ori|auto ori';
var VRCREPLAY_SHARE = 'share link';
var GIIKER_CONNECT = 'Click to connect';
var GIIKER_RESET = 'Reset (Mark Solved)';
var GIIKER_REQMACMSG = 'Please enter the MAC address of your smart hardware (xx:xx:xx:xx:xx:xx). You can find the MAC address through chrome://bluetooth-internals/#devices, or modify following options to let csTimer automatically obtain it:\nChrome: Turn on chrome://flags/#enable-experimental-web-platform-features\nBluefy: Turn on Enable BLE Advertisements';
var GIIKER_NOBLEMSG = 'Bluetooth API is not available. Ensure https access, check bluetooth is enabled on your device, and try chrome with chrome://flags/#enable-experimental-web-platform-features enabled';
var PROPERTY_SHOWAD = '광고 보이기 (새로고침 시 적용)';
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
