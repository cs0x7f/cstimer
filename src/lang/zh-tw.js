var OK_LANG = '確定';
var CANCEL_LANG = '取消';
var RESET_LANG = '重設';
var ABOUT_LANG = '關於';
var ZOOM_LANG = '縮放';
var BUTTON_TIME_LIST = '成績<br>列表';
var BUTTON_OPTIONS = '設定';
var BUTTON_EXPORT = '匯出';
var BUTTON_DONATE = '資助<br>我們';
var PROPERTY_SR = '隨階段調整';
var PROPERTY_USEINS = '使用WCA觀察';
var PROPERTY_USEINS_STR = '永遠|除了盲解|永不';
var PROPERTY_VOICEINS = 'WCA觀察人聲提醒';
var PROPERTY_VOICEINS_STR = '無|男聲|女聲';
var PROPERTY_VOICEVOL = '語音音量';
var PROPERTY_PHASES = '多階段計時';
var PROPERTY_TIMERSIZE = '計時器大小';
var PROPERTY_USEMILLI = '精確到毫秒';
var PROPERTY_SMALLADP = '小數點後使用小型字體';
var PROPERTY_SCRSIZE = '打亂字體大小';
var PROPERTY_SCRMONO = '等寬字體打亂';
var PROPERTY_SCRLIM = '限制打亂區高度';
var PROPERTY_SCRALIGN = '打亂對齊';
var PROPERTY_SCRALIGN_STR = '置中|靠左|靠右';
var PROPERTY_SCRFAST = '4x4x4使用快速打亂(非官方)';
var PROPERTY_SCRKEYM = '打亂中標記關鍵步驟';
var PROPERTY_SCRCLK = '點擊打亂時的動作';
var PROPERTY_SCRCLK_STR = '無|複製打亂|下一個打亂';
var PROPERTY_WNDSCR = '打亂面板顯示樣式';
var PROPERTY_WNDSTAT = '統計面板顯示樣式';
var PROPERTY_WNDTOOL = '工具面板顯示樣式';
var PROPERTY_WND_STR = '一般|平面';
var EXPORT_DATAEXPORT = '成績匯入/匯出';
var EXPORT_TOFILE = '匯出到檔案';
var EXPORT_FROMFILE = '從檔案匯入';
var EXPORT_TOSERV = '匯出到伺服器';
var EXPORT_FROMSERV = '從伺服器匯入';
var EXPORT_FROMOTHER = '從其他計時器匯入';
var EXPORT_USERID = '輸入帳號(僅限英文與數字)';
var EXPORT_INVID = '只能輸入英文字母與數字！';
var EXPORT_ERROR = '似乎出了點問題...';
var EXPORT_NODATA = '你的帳號中沒有任何資料';
var EXPORT_UPLOADED = '更新成功';
var EXPORT_CODEPROMPT = '複製這組代碼，或鍵入代碼以導入';
var EXPORT_ONLYOPT = '僅匯入/匯出設定';
var EXPORT_ACCOUNT = '匯出帳戶';
var EXPORT_LOGINGGL = '使用Google帳號登入';
var EXPORT_LOGINWCA = '使用WCA帳戶登入';
var EXPORT_LOGOUTCFM = '確定要登出?';
var EXPORT_LOGINAUTHED = '授權完成<br>正在取得數據...';
var IMPORT_FINAL_CONFIRM = '這個動作會覆蓋所有儲存的數據！更動範圍包括%d個階段，至少增加%a、減少%r條紀錄。確定要載入資料嗎？';
var BUTTON_SCRAMBLE = '打亂';
var BUTTON_TOOLS = '工具';
var IMAGE_UNAVAILABLE = '不適用於這個打亂形式';
var TOOLS_SELECTFUNC = '功能';
var TOOLS_CROSS = '解好十字';
var TOOLS_EOLINE = '解好EOLine';
var TOOLS_ROUX1 = '解好橋式左橋';
var TOOLS_222FACE = '2x2x2 一面';
var TOOLS_GIIKER = '計客魔方';
var TOOLS_IMAGE = '畫出打亂圖形';
var TOOLS_STATS = '統計';
var TOOLS_HUGESTATS = '跨階段統計';
var TOOLS_DISTRIBUTION = '分階段計時';
var TOOLS_TREND = '時間趨勢';
var TOOLS_METRONOME = '節拍器';
var TOOLS_CFMTIME = '確認時間';
var TOOLS_SOLVERS = '速解小幫手';
var TOOLS_SYNCSEED = '共同打亂';
var TOOLS_SYNCSEED_SEED = '種子碼';
var TOOLS_SYNCSEED_INPUT = '輸入種子碼';
var TOOLS_SYNCSEED_30S = '使用30秒種子碼';
var TOOLS_SYNCSEED_HELP = '如果使用這個選項的話，就會以輸入的種子碼來生成打亂。也就是說，如果有兩個玩家用同一個種子碼的話，他們會得到一樣的打亂。底下的30秒種子碼是以現在的時刻生成種子碼，如果兩個玩家按下按鈕的時間相近，他們就會得到一樣的種子碼。';
var TOOLS_SYNCSEED_DISABLE = '是否停用目前的種子碼？';
var TOOLS_SYNCSEED_INPUTA = '輸入種子碼 (可以包含a-zA-Z0-9)';
var OLCOMP_UPDATELIST = '更新比賽列表';
var OLCOMP_VIEWRESULT = '查看結果';
var OLCOMP_VIEWMYRESULT = '歷史紀錄';
var OLCOMP_START = '開始！';
var OLCOMP_SUBMIT = '提交！';
var OLCOMP_SUBMITAS = '提交ID：';
var OLCOMP_WCANOTICE = '以WCA帳號提交？（如果提交後未識別，重新登錄即可）';
var OLCOMP_OLCOMP = '線上比賽';
var OLCOMP_ANONYM = '匿名';
var OLCOMP_ME = '我';
var OLCOMP_WCAACCOUNT = 'WCA帳號';
var OLCOMP_ABORT = '中止比賽並顯示結果？';
var OLCOMP_WITHANONYM = '包含匿名玩家';
var PROPERTY_IMGSIZE = '打亂圖示大小';
var TIMER_INSPECT = '觀察中';
var TIMER_SOLVE = '還原中';
var PROPERTY_USEMOUSE = '使用滑鼠計時';
var PROPERTY_TIMEU = '時間更新頻率';
var PROPERTY_TIMEU_STR = '更新|每0.1秒|每秒|僅觀察|無';
var PROPERTY_PRETIME = '按壓空白鍵時間(秒)';
var PROPERTY_ENTERING = '輸入時間使用';
var PROPERTY_ENTERING_STR = '空白鍵|鍵入|SS計時器|魔域計時器|虛擬方塊|蓝牙魔方|qCube';
var PROPERTY_INTUNIT = '輸入整數時的單位';
var PROPERTY_INTUNIT_STR = '秒|0.01秒|0.001秒';
var PROPERTY_COLOR = '選擇色彩樣式';
var PROPERTY_COLORS = '字體顏色|背景顏色|面板顏色|按鈕顏色|超連結連色|圖標顏色|圖標背景顏色';
var PROPERTY_VIEW = 'UI 介面樣式';
var PROPERTY_VIEW_STR = '自動|攜帶式裝置|電腦';
var PROPERTY_UIDESIGN = 'UI設計';
var PROPERTY_UIDESIGN_STR = '一般|材質設計|無陰影|材質設計無陰影';
var COLOR_EXPORT = '請複製本字串以利匯入';
var COLOR_IMPORT = '請輸入匯出的字串';
var COLOR_FAIL = '資料不正確，匯入失敗';
var PROPERTY_FONTCOLOR_STR = '黑|白';
var PROPERTY_COLOR_STR = '手動|匯入/匯出|隨機|主題1|主題2|主題3|黑色|白色|主題6|未來風暗色|未來風亮色';
var PROPERTY_FONT = '計時器字體';
var PROPERTY_FONT_STR = '隨機顯示器字體|普通|顯示器1|顯示器2|顯示器3|顯示器4|顯示器5';
var PROPERTY_FORMAT = '時間格式';
var PROPERTY_USEKSC = '使用快捷鍵';
var PROPERTY_NTOOLS = '工具數量';
var PROPERTY_AHIDE = '計時期間隱藏所有物件';
var SCRAMBLE_LAST = '上一個';
var SCRAMBLE_NEXT = '下一個';
var SCRAMBLE_SCRAMBLE = ' 打亂';
var SCRAMBLE_LENGTH = '長度';
var SCRAMBLE_INPUT = '輸入打亂';
var PROPERTY_VRCSPEED = 'VRC基準速度(轉/秒)';
var PROPERTY_VRCMP = '分項計時';
var PROPERTY_VRCMPS = '關閉|CFOP|CF+OP|CFFFFOP|CFFFFOOPP|橋式';
var PROPERTY_GIIKERVRC = '顯示虛擬計客魔方';
var PROPERTY_GIISOK_DELAY = '停滯時當作已打亂';
var PROPERTY_GIISOK_DELAYS = '2秒|3秒|4秒|5秒|永不|直到準確打亂';
var PROPERTY_GIISOK_KEY = '按下空白鍵標記打亂完成';
var PROPERTY_GIISOK_MOVE = '以特殊動作標記打亂';
var PROPERTY_GIISOK_MOVES = 'U4, R4, etc|(U U\')2, (U\' U)2, etc|永不';
var PROPERTY_GIISBEEP = '打亂完成時發出聲音';
var PROPERTY_GIIRST = '連接時重置計客魔方';
var PROPERTY_GIIRSTS = '永遠|提示|永不';
var CONFIRM_GIIRST = '是否將計客重置為已還原？';
var PROPERTY_GIIAED = '自動硬體錯誤偵測';
var scrdata = [
	['WCA', [
		['3x3x3', "333", 0],
		['2x2x2', "222so", 0],
		['4x4x4', "444wca", -40],
		['5x5x5', "555wca", -60],
		['6x6x6', "666wca", -80],
		['7x7x7', "777wca", -100],
		['3x3x3盲解', "333ni", 0],
		['3x3x3最少步數解', "333fm", 0],
		['3x3x3單手', "333oh", 0],
		['魔錶', "clkwca", 0],
		['十二面體', "mgmp", -70],
		['金字塔', "pyrso", -10],
		['斜轉', "skbso", 0],
		['SQ-1', "sqrs", 0],
		['4x4x4盲解', "444bld", -40],
		['5x5x5盲解', "555bld", -60],
		['3x3x3多顆盲解', "r3ni", 5]
	]],
	['輸入', [
		['外部', "input", 0],
		['比賽', "remoteComp", 0],
		['Remote', "remoteOther", 0]
	]],
	['===WCA===', [
		['--', "blank", 0]
	]],
	['3x3x3', [
		["隨機狀態 (WCA)", "333", 0],
		['隨機步驟', "333o", 25],
		['笨蛋專用', "333noob", 25],
		['僅打亂邊塊', "edges", 0],
		['僅打亂角塊', "corners", 0],
		['僅打亂頂層', "ll", 0],
		['ZBLL', "zbll", 0],
		['CLL', "cll", 0],
		['ELL', "ell", 0],
		['LSE', "lse", 0],
		['LSE(使用MU)', "lsemu", 0],
		['橋式最後十塊', "cmll", 0],
		['預先解好十字', "f2l", 0],
		['最後一個F2L+頂層', "lsll2", 0],
		['2GLL', "2gll", 0],
		['ZBLS', "zbls", 0],
		['ZZLL', "zzll", 0],
		['OLL', "oll", 0],
		['PLL', "pll", 0],
		['EOLine', "eoline", 0],
		['簡單的十字', "easyc", 3],
		['3x3x3腳解', "333ft", 0]
	]],
	['2x2x2', [
		["隨機狀態 (WCA)", "222so", 0],
		['最佳化', "222o", 0],
		['僅使用RUF', "2223", 25],
		['EG', "222eg", 0],
		['EG0', "222eg0", 0],
		['EG1', "222eg1", 0],
		['EG2', "222eg2", 0],
		['No Bar', "222nb", 0]
	]],
	['4x4x4', [
		["WCA", "444wca", -40],
		['隨機步驟', "444m", 40],
		['SiGN', "444", 40],
		['永駿', "444yj", 40],
		['4x4x4邊塊', "4edge", 8],
		['R,r,U,u', "RrUu", 40]
	]],
	['5x5x5', [
		["WCA", "555wca", 60],
		['SiGN', "555", 60],
		['5x5x5邊塊', "5edge", 8]
	]],
	['6x6x6', [
		["WCA", "666wca", 80],
		['SiGN', "666si", 80],
		['前綴式標記', "666p", 80],
		['後綴式標記', "666s", 80],
		['6x6x6邊塊', "6edge", 8]
	]],
	['7x7x7', [
		["WCA", "777wca", 100],
		['SiGN', "777si", 100],
		['前綴式標記', "777p", 100],
		['後綴式標記', "777s", 100],
		['7x7x7邊塊', "7edge", 8]
	]],
	['魔錶', [
		['jaap', "clk", 0],
		['wca', "clkwca", 0],
		['最佳化', "clko", 0],
		['簡潔', "clkc", 0],
		['pin腳順序效率最佳化', "clke", 0]
	]],
	['十二面體', [
		["WCA", "mgmp", 70],
		['去除RD', "mgmc", 70],
		['舊版', "mgmo", 70]
	]],
	['金字塔', [
		["隨機狀態 (WCA)", "pyrso", 10],
		['最佳化', "pyro", 0],
		['隨機步驟', "pyrm", 25],
		['L4E', "pyrl4e", 0],
		['4 tips', "pyr4c", 0],
		['No bar', "pyrnb", 0]
	]],
	['斜轉', [
		["隨機狀態 (WCA)", "skbso", 0],
		['最佳化', "skbo", 0],
		['隨機步驟', "skb", 25],
		['No bar', "skbnb", 0]
	]],
	['SQ-1', [
		["隨機狀態 (WCA)", "sqrs", 0],
		["CSP", "sqrcsp", 0],
		['面轉演算法', "sq1h", 40],
		['扭轉演算法', "sq1t", 20]
	]],
	['===其他===', [
		['--', "blank", 0]
	]],
	['四階滑軌拼圖', [
		['隨機狀態 URLD', "15prp", 0],
		['隨機狀態 ^<>v', "15prap", 0],
		['隨機狀態 Blank', "15prmp", 0],
		['隨機步驟 URLD', "15p", 80],
		['隨機步驟 ^<>v', "15pat", 80],
		['隨機步驟 Blank', "15pm", 80]
	]],
	['8 puzzle', [
		['隨機狀態 URLD', "8prp", 0],
		['隨機狀態 ^<>v', "8prap", 0],
		['隨機狀態 Blank', "8prmp", 0]
	]],
	['LxMxN', [
		['1x3x3', "133", 0],
		['2x2x3 (塔形方塊)', "223", 0],
		['2x3x3 (骨牌形方塊)', "233", 25],
		['3x3x4', "334", 40],
		['3x3x5', "335", 25],
		['3x3x6', "336", 40],
		['3x3x7', "337", 40],
		['8x8x8', "888", 120],
		['9x9x9', "999", 120],
		['10x10x10', "101010", 120],
		['11x11x11', "111111", 120],
		['NxNxN', "cubennn", 12]
	]],
	['齒輪魔方', [
		['隨機狀態', "gearso", 0],
		['最佳化', "gearo", 0],
		['隨機步驟', "gear", 10]
	]],
	['Cmetric', [
		[' ', "cm3", 25]
	]],
	['小型Cmetric', [
		[' ', "cm2", 25]
	]],
	['四階十二面體', [
		['Pochmann', "giga", 300]
	]],
	['直升機方塊', [
		[' ', "heli", 40]
	]],
	['Redi Cube', [
		['魔域', "redim", 8],
		['舊版', "redi", 20]
	]],
	['楓葉方塊', [
		['隨機狀態', "ivyso", 0],
		['最佳化', "ivyo", 0],
		['隨機步驟', "ivy", 10]
	]],
	['Master Pyraminx', [
		[' ', "mpyr", 42]
	]],
	['水晶金字塔', [
		['Pochmann', "prcp", 70],
		['舊版', "prco", 70]
	]],
	['連體嬰', [
		['1x1x3 block', "sia113", 25],
		['1x2x3 block', "sia123", 25],
		['2x2x2 block', "sia222", 25]
	]],
	['SQ-2', [
		[' ', "sq2", 20]
	]],
	['超級軟碟方塊', [
		[' ', "sfl", 25]
	]],
	['超級SQ-1', [
		['扭轉演算法', "ssq1t", 20]
	]],
	['飛碟方塊', [
		['Jaap打亂法', "ufo", 25]
	]],
	['其他', [
		['面轉正八面體', "fto", 25]
	]],
	['===特殊===', [
		['--', "blank", 0]
	]],
	['3x3x3子群', [
		['僅使用RU', "2gen", 25],
		['僅使用LU', "2genl", 25],
		['橋式MU', "roux", 25],
		['僅使用FRU', "3gen_F", 25],
		['僅使用RUL', "3gen_L", 25],
		['僅使用RrU', "RrU", 25],
		['僅使用90度', "half", 25],
		['最後一個F2L+頂層(舊版)', "lsll", 15]
	]],
	['綁帶方塊', [
		['Bicube', "bic", 30],
		['SQ-1 /, (1,0)', "bsq", 25]
	]],
	['五魔方子群', [
		['僅使用RU', "minx2g", 30],
		['最後一個F2L+頂層', "mlsll", 20]
	]],
	['連解', [
		['一堆3x3x3', "r3", 5],
		['234連解', "r234", 0],
		['2345連解', "r2345", 0],
		['23456連解', "r23456", 0],
		['234567連解', "r234567", 0],
		['234連解 (WCA)', "r234w", 0],
		['2345連解 (WCA)', "r2345w", 0],
		['23456連解 (WCA)', "r23456w", 0],
		['234567連解 (WCA)', "r234567w", 0]
	]],
	['===搞笑===', [
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
	['轉動頂面', '轉動底面'],
	['轉動右面', '轉動左面'],
	['轉動前面', '轉動後面']
];
var SCRAMBLE_NOOBSS = ' 順時針九十度,| 逆時針九十度,| 一百八十度,';
var STATS_CFM_RESET = '是否重置階段中的所有時間?';
var STATS_CFM_DELSS = '刪除階段 [%s]?';
var STATS_CFM_DELMUL = '從本索引值刪除幾個成績?';
var STATS_CFM_DELETE = '是否刪除這個時間?';
var STATS_COMMENT = '附註';
var STATS_REVIEW = '結果確認';
var STATS_DATE = '日期';
var STATS_SSSTAT = '顯示統計資料';
var STATS_CURROUND = '本輪統計資料';
var STATS_CURSESSION = '本階段統計資料';
var STATS_CURSPLIT = '當前階段的第 %d區塊';
var STATS_EXPORTCSV = '匯出至CSV';
var STATS_SSMGR_TITLE = '管理階段';
var STATS_SSMGR_NAME = '名稱';
var STATS_SSMGR_DETAIL = '階段詳細資訊';
var STATS_SSMGR_OPS = '重新命名|創建|拆分|合併|刪除|排序';
var STATS_SSMGR_ORDER = '以打亂排序';
var STATS_SSMGR_ODCFM = '是否將所有階段以打亂排序?';
var STATS_SSMGR_SORTCFM = '確認改變%d條紀錄的順序？';
var STATS_ALERTMG = '將 [%f] 階段中的所有時間移至 [%t] 階段?';
var STATS_PROMPTSPL = '從階段 [%s] 分離最近幾個時間?';
var STATS_ALERTSPL = '拆開或至少留下一組時間?';
var STATS_AVG = '平均';
var STATS_SOLVE = '還原';
var STATS_TIME = '時間';
var STATS_SESSION = '階段';
var STATS_SESSION_NAME = '編輯階段名稱';
var STATS_SESSION_NAMEC = '新階段名稱';
var STATS_STRING = '最佳|本次|最差|於%Y-%M-%D使用csTimer計時|完成/總計: %d|最佳單次|%mk 次平均|%mk 次去頭尾平均|去頭尾平均:%v{(標準差=%sgm)}|平均:%v|時間列表:|從%s到%e|總共耗時:%d';
var STATS_PREC = '時間分布精確度';
var STATS_PREC_STR = '自動|0.1秒|0.2秒|0.5秒|1秒|2秒|5秒|10秒|20秒|50秒|100秒';
var STATS_TYPELEN = '清單%d類型|清單%d長度|去頭尾平均|平均';
var STATS_STATCLR = '允許階段空白';
var STATS_ABSIDX = '統計報告中顯示絕對索引';
var STATS_XSESSION_DATE = '任何日期|最近24小時|最近一周|最近一月|最近一年';
var STATS_XSESSION_NAME = '任何名稱';
var STATS_XSESSION_SCR = '任何打亂';
var STATS_XSESSION_CALC = '計算';
var STATS_RSFORSS = '點擊編號時顯示統計資料';
var PROPERTY_PRINTSCR = '在統計列表中顯示打亂';
var PROPERTY_PRINTDATE = '在統計列表中顯示日期';
var PROPERTY_SUMMARY = '在時間清單前顯示摘要';
var PROPERTY_IMRENAME = '創建後立即重新命名階段';
var PROPERTY_SCR2SS = '更換打亂模式時創建新階段';
var PROPERTY_SS2SCR = '更換階段時恢復打亂模式';
var PROPERTY_SS2PHASES = '更換階段時恢復多次計時';
var PROPERTY_STATINV = '顛倒時間清單';
var PROPERTY_STATAL = '統計指標';
var PROPERTY_STATALU = '自訂統計指標';
var PROPERTY_DELMUL = '允許同時刪除多個成績';
var PROPERTY_TOOLSFUNC = '選擇的功能';
var PROPERTY_TRIM = '刪減數據中的資料數';
var PROPERTY_TRIM_MED = '中位數';
var PROPERTY_STKHEAD = '使用stackmat狀態資訊';
var PROPERTY_HIDEFULLSOL = '逐步顯示解法';
var PROPERTY_IMPPREV = '載入更舊的數據';
var PROPERTY_AUTOEXP = '(每100轉)自動匯出';
var PROPERTY_AUTOEXP_OPT = '從不|匯出成檔案|使用csTimer ID|使用WCA帳號';
var PROPERTY_SCRASIZE = '自動調整打亂字體大小';
var MODULE_NAMES = {
	"kernel": '全域',
	"ui": '顯示',
	"color": '顏色',
	"timer": '計時器',
	"scramble": '打亂',
	"stats": '統計',
	"tools": '工具',
	"vrc": '虛擬與<br>計客'
};
var BGIMAGE_URL = '請輸入圖片超連結';
var BGIMAGE_INVALID = '無效的超連結';
var BGIMAGE_OPACITY = '背景圖片不透明度';
var BGIMAGE_IMAGE = '背景圖片';
var BGIMAGE_IMAGE_STR = '無|手動|CCT';
var SHOW_AVG_LABEL = '顯示「平均」標籤';
var USE_LOGOHINT = '圖標中的提示訊息';
var TOOLS_SCRGEN = '打亂製造器';
var SCRGEN_NSCR = '打亂總數';
var SCRGEN_PRE = '前綴';
var SCRGEN_GEN = '生成打亂!';
