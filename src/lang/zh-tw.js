var OK_LANG = '確定';
var CANCEL_LANG = '取消';
var RESET_LANG = '重設';
var ABOUT_LANG = '關於';
var ZOOM_LANG = '縮放';
var COPY_LANG = '複製';
var BUTTON_TIME_LIST = '成績<br>列表';
var BUTTON_OPTIONS = '設定';
var BUTTON_EXPORT = '匯出';
var BUTTON_DONATE = '資助<br>我們';
var PROPERTY_SR = '隨階段調整';
var PROPERTY_USEINS = '使用WCA觀察';
var PROPERTY_USEINS_STR = '永遠 (倒數)|永遠 (正數)|除了盲解 (倒數)|除了盲解 (正數)|永不';
var PROPERTY_SHOWINS = '在檢查開啟時顯示圖示';
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
var PROPERTY_SCRWRAP = 'Scramble Wrap';
var PROPERTY_SCRWRAP_STR = '折衷|一般';
var PROPERTY_SCRNEUT = '中性色';
var PROPERTY_SCRNEUT_STR = '無|單面|雙面|六面';
var PROPERTY_SCREQPR = 'Probabilities for training-scramble states';
var PROPERTY_SCREQPR_STR = 'Actual|Equal|Random order';
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
var EXPORT_AEXPALERT = 'More than %d solves since last backup';
var EXPORT_WHICH = '您提供了%d個檔案, 您想要匯入哪一個?';
var EXPORT_WHICH_ITEM = '解開 %s 次, %t 時上傳';
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
var TOOLS_RECONS = '重建';
var TOOLS_RECONS_NODATA = '找不到解法';
var TOOLS_RECONS_TITLE = '觀察|轉動|步數|手速';
var TOOLS_TRAINSTAT = '訓練資料';
var TOOLS_BLDHELPER = '盲解小幫手';
var TOOLS_CFMTIME = '確認時間';
var TOOLS_SOLVERS = '速解小幫手';
var TOOLS_DLYSTAT = '每日數據';
var TOOLS_DLYSTAT1 = 'Period|Start of Day|Week';
var TOOLS_DLYSTAT_OPT1 = '天|週|月|年';
var TOOLS_DLYSTAT_OPT2 = '日|一|二|三|四|五|六';
var TOOLS_SYNCSEED = '共同打亂';
var TOOLS_SYNCSEED_SEED = '種子碼';
var TOOLS_SYNCSEED_INPUT = '輸入種子碼';
var TOOLS_SYNCSEED_30S = '使用30秒種子碼';
var TOOLS_SYNCSEED_HELP = 'If enabled, scramble will only depend on the seed and scramble settings.';
var TOOLS_SYNCSEED_DISABLE = '是否停用目前的種子碼？';
var TOOLS_SYNCSEED_INPUTA = '輸入種子碼 (可以包含a-zA-Z0-9)';
var TOOLS_BATTLE = '線上對戰';
var TOOLS_BATTLE_HEAD = '房間|加入房間';
var TOOLS_BATTLE_TITLE = '排名|狀態|時間';
var TOOLS_BATTLE_STATUS = '就緒|觀察|還原|完成|掉線';
var TOOLS_BATTLE_INFO = '和朋友們加入同一個房間，你們就可以進行對戰。';
var TOOLS_BATTLE_JOINALERT = '請輸入房間ID';
var TOOLS_BATTLE_LEAVEALERT = '離開目前房間';
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
var PROPERTY_IMGREP = '在點擊打亂圖片時示虛擬魔方動畫';
var TIMER_INSPECT = '觀察中';
var TIMER_SOLVE = '還原中';
var PROPERTY_USEMOUSE = '使用滑鼠計時';
var PROPERTY_TIMEU = '時間更新頻率';
var PROPERTY_TIMEU_STR = '更新|每0.1秒|每秒|僅觀察|無';
var PROPERTY_PRETIME = '按壓空白鍵時間(秒)';
var PROPERTY_ENTERING = '輸入時間使用';
var PROPERTY_ENTERING_STR = '空白鍵|鍵入|SS計時器|魔域計時器|虛擬方塊|蓝牙魔方|qCube|蓝牙計時器|頂層訓練';
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
var PROPERTY_USEGES = '手勢控制';
var PROPERTY_NTOOLS = '工具數量';
var PROPERTY_AHIDE = '計時期間隱藏所有物件';
var SCRAMBLE_LAST = '上一個';
var SCRAMBLE_NEXT = '下一個';
var SCRAMBLE_SCRAMBLE = ' 打亂';
var SCRAMBLE_SCRAMBLING = '打亂';
var SCRAMBLE_LENGTH = '長度';
var SCRAMBLE_INPUT = '輸入打亂';
var SCRAMBLE_INPUTTYPE = '打亂種類';
var PROPERTY_VRCSPEED = 'VRC基準速度(轉/秒)';
var PROPERTY_VRCORI = '虛擬魔方的方向';
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
var PROPERTY_GIIMODE = '藍芽魔方模式';
var PROPERTY_GIIMODES = '一般|練習|持續練習';
var PROPERTY_VRCAH = '大魔方中没用的方塊';
var PROPERTY_VRCAHS = '隱藏|邊線|顏色|顥示';
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
		['線上對戰', "remoteBattle", 0],
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
		['盲解小幫手', "nocache_333bldspec", 0],
		['Pattern Tool', "nocache_333patspec", 0],
		['3x3x3腳解', "333ft", 0],
		['自訂', "333custom", 0]
	]],
	['3x3x3 CFOP', [
		['PLL', "pll", 0],
		['OLL', "oll", 0],
		['最後一個F2L+頂層', "lsll2", 0],
		['僅打亂頂層', "ll", 0],
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
		['預先解好十字', "f2l", 0],
		['EOLine', "eoline", 0],
		['EO Cross', "eocross", 0],
		['簡單的十字', "easyc", 3],
		['簡單的xcross', "easyxc", 4]
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
		["隨機狀態 (WCA)", "222so", 0],
		['最佳化', "222o", 0],
		['僅使用RUF', "2223", 25],
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
		['隨機步驟', "444m", 40],
		['SiGN', "444", 40],
		['永駿', "444yj", 40],
		['4x4x4邊塊', "4edge", 0],
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
		['WCA', "clkwca", 0],
		['wca (old)', "clkwcab", 0],
		['WCA w/o y2', "clknf", 0],
		['jaap', "clk", 0],
		['最佳化', "clko", 0],
		['簡潔', "clkc", 0],
		['pin腳順序效率最佳化', "clke", 0]
	]],
	['十二面體', [
		["WCA", "mgmp", 70],
		['去除RD', "mgmc", 70],
		['舊版', "mgmo", 70],
		['僅使用RU', "minx2g", 30],
		['最後一個F2L+頂層', "mlsll", 0],
		['PLL', "mgmpll", 0],
		['Last Layer', "mgmll", 0]
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
		["PLL", "sq1pll", 0],
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
		['NxNxN', "cubennn", 12],
		['Mirror Blocks', "mrbl", 0]
	]],
	['齒輪魔方', [
		['隨機狀態', "gearso", 0],
		['最佳化', "gearo", 0],
		['隨機步驟', "gear", 10]
	]],
	['Kilominx', [
		['隨機狀態', "klmso", 0],
		['Pochmann', "klmp", 30]
	]],
	['四階十二面體', [
		['Pochmann', "giga", 300]
	]],
	['Crazy Puzzle', [
		['Crazy 3x3x3', "crz3a", 30]
	]],
	['Cmetric', [
		['Cmetric', "cm3", 25],
		['小型Cmetric', "cm2", 25]
	]],
	['直升機方塊', [
		['Heli copter', "heli", 40],
		['Curvy copter', "helicv", 40],
		['2x2 Heli random move', "heli2x2", 70],
		['2x2 Heli by group', "heli2x2g", 5]
	]],
	['Redi Cube', [
		['隨機狀態', "rediso", 0],
		['魔域', "redim", 8],
		['隨機步驟', "redi", 20]
	]],
	['Dino Cube', [
		['隨機狀態', "dinoso", 0],
		['最佳化', "dinoo", 0]
	]],
	['楓葉方塊', [
		['隨機狀態', "ivyso", 0],
		['最佳化', "ivyo", 0],
		['隨機步驟', "ivy", 10]
	]],
	['Master Pyraminx', [
		['隨機狀態', "mpyrso", 0],
		['隨機步驟', "mpyr", 42]
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
	['Square', [
		['SQ-2', "sq2", 20],
		['超級SQ-1', "ssq1t", 20]
	]],
	['超級軟碟方塊', [
		[' ', "sfl", 25]
	]],
	['飛碟方塊', [
		['Jaap打亂法', "ufo", 25]
	]],
	['面轉正八面體', [
		['隨機狀態', "ftoso", 0],
		['隨機步驟', "fto", 30],
		['L3T', "ftol3t", 0],
		['L3T+LBT', "ftol4t", 0],
		['TCP', "ftotcp", 0],
		['edges only', "ftoedge", 0],
		['centers only', "ftocent", 0],
		['corners only', "ftocorn", 0],
		['Diamond 隨機狀態', "dmdso", 0]
	]],
	['Icosahedron', [
		['Icosamate 隨機步驟', "ctico", 60]
	]],
	['===特殊===', [
		['--', "blank", 0]
	]],
	['3x3x3子群', [
		['僅使用RU', "2gen", 0],
		['僅使用LU', "2genl", 0],
		['橋式MU', "roux", 0],
		['僅使用FRU', "3gen_F", 0],
		['僅使用RUL', "3gen_L", 0],
		['僅使用RrU', "RrU", 0],
		['Domino Subgroup', "333drud", 0],
		['僅使用90度', "half", 0],
		['最後一個F2L+頂層(舊版)', "lsll", 15]
	]],
	['綁帶方塊', [
		['Bicube', "bic", 30],
		['SQ-1 /, (1,0)', "bsq", 25]
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
		['234567連解 (WCA)', "r234567w", 0],
		['Mini Guildford', "rmngf", 0]
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
var SCROPT_TITLE = '打亂選項';
var SCROPT_BTNALL = '全部';
var SCROPT_BTNNONE = '清除';
var SCROPT_EMPTYALT = '請選擇至少一個案例';
var STATS_CFM_RESET = '是否重置階段中的所有時間?';
var STATS_CFM_DELSS = '刪除階段 [%s]?';
var STATS_CFM_DELMUL = '從本索引值刪除幾個成績?';
var STATS_CFM_DELETE = '是否刪除這個時間?';
var STATS_COMMENT = '附註';
var STATS_REVIEW = '結果確認';
var STATS_DATE = '日期';
var STATS_SSSTAT = '顯示統計資料';
var STATS_SSRETRY = '重試';
var STATS_CURROUND = '本輪統計資料';
var STATS_CURSESSION = '本階段統計資料';
var STATS_CURSPLIT = '當前階段的第 %d區塊';
var STATS_EXPORTCSV = '匯出至CSV';
var STATS_SSMGR_TITLE = '管理階段';
var STATS_SSMGR_NAME = '名稱';
var STATS_SSMGR_DETAIL = '階段詳細資訊';
var STATS_SSMGR_OPS = '重新命名|創建|拆分|合併|刪除|排序|Merge&Dedupe';
var STATS_SSMGR_ORDER = '以打亂排序';
var STATS_SSMGR_ODCFM = '是否將所有階段以打亂排序?';
var STATS_SSMGR_SORTCFM = '確認改變%d條紀錄的順序？';
var STATS_ALERTMG = '將 [%f] 階段中的所有時間移至 [%t] 階段?';
var STATS_PROMPTSPL = '從階段 [%s] 分離最近幾個時間?';
var STATS_ALERTSPL = '拆開或至少留下一組時間?';
var STATS_AVG = '平均';
var STATS_SUM = '總和';
var STATS_SOLVE = '還原';
var STATS_TIME = '時間';
var STATS_SESSION = '階段';
var STATS_SESSION_NAME = '編輯階段名稱';
var STATS_SESSION_NAMEC = '新階段名稱';
var STATS_STRING = '最佳|本次|最差|於%Y-%M-%D使用csTimer計時|完成/總計: %d|最佳單次|%mk 次平均|%mk 次去頭尾平均|去頭尾平均:%v{(標準差=%sgm)}|平均:%v|時間列表:|從%s到%e|總共耗時:%d|目標';
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
var PROPERTY_PRINTCOMM = '在統計列表中顯示註解';
var PROPERTY_PRINTDATE = '在統計列表中顯示日期';
var PROPERTY_SUMMARY = '在時間清單前顯示摘要';
var PROPERTY_IMRENAME = '創建後立即重新命名階段';
var PROPERTY_SCR2SS = '更換打亂模式時創建新階段';
var PROPERTY_SS2SCR = '更換階段時恢復打亂模式';
var PROPERTY_SS2PHASES = '更換階段時恢復多次計時';
var PROPERTY_STATINV = '顛倒時間清單';
var PROPERTY_STATSSUM = '在成績清單中顯示總和';
var PROPERTY_STATTHRES = '顯示階段最快的目標時間';
var PROPERTY_STATBPA = '顥示最快的可能平均';
var PROPERTY_STATWPA = '顥示最慢的可能平均';
var PROPERTY_STATAL = '統計指標';
var PROPERTY_STATALU = '自訂統計指標';
var PROPERTY_HLPBS = '突顯個人最佳';
var PROPERTY_HLPBS_STR = 'Dark orange as WCA|As link color|Bolder|None';
var PROPERTY_DELMUL = '允許同時刪除多個成績';
var PROPERTY_TOOLSFUNC = '選擇的功能';
var PROPERTY_TRIM = '刪減數據中的資料數';
var PROPERTY_TRIMR = 'Number of solves trimmed at worse side';
var PROPERTY_TRIM_MED = '中位數';
var PROPERTY_STKHEAD = '使用stackmat狀態資訊';
var PROPERTY_TOOLPOS = '工具面板位置';
var PROPERTY_TOOLPOS_STR = '下面|浮動|上面';
var PROPERTY_HIDEFULLSOL = '逐步顯示解法';
var PROPERTY_IMPPREV = '載入更舊的數據';
var PROPERTY_AUTOEXP = '(每100轉)自動匯出';
var PROPERTY_AUTOEXP_OPT = '從不|匯出成檔案|使用csTimer ID|使用WCA帳號|使用Google帳號|Alert Only';
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
var SHOW_DIFF_LABEL = '顯示與上次的相差時間';
var SHOW_DIFF_LABEL_STR = '快綠慢紅|快紅慢綠|一般|無';
var USE_LOGOHINT = '圖標中的提示訊息';
var TOOLS_SCRGEN = '打亂製造器';
var SCRGEN_NSCR = '打亂總數';
var SCRGEN_PRE = '前綴';
var SCRGEN_GEN = '生成打亂!';
var VRCREPLAY_TITLE = '虛擬重播';
var VRCREPLAY_ORI = 'raw ori|auto ori';
var VRCREPLAY_SHARE = '分享連結';
var GIIKER_CONNECT = '點擊連線';
var GIIKER_RESET = 'Reset (Mark Solved)';
var GIIKER_REQMACMSG = '請輸入你的裝置的 MAC 位址 (xx:xx:xx:xx:xx:xx). 你能在 chrome://bluetooth-internals/#devices 找到你的 MAC 位址, 或是調整以下的選項來讓 csTimer 自動取得它: \nChrome: 打開 chrome://flags/#enable-experimental-web-platform-features\nBluefy: 打開 Enable BLE Advertisements';
var GIIKER_NOBLEMSG = '藍牙 API 無法使用, 請確認 https 使用權, 確認裝置上已經開啟, 再確認 Chrome 的 chrome://flags/#enable-experimental-web-platform-features 已經啟用';
var PROPERTY_SHOWAD = '顯示廣告 (重新讀取後生效)';
var PROPERTY_GIIORI = '方塊方向';
var LGHINT_INVALID = '無效的數值!';
var LGHINT_NETERR = '網路錯誤!';
var LGHINT_SERVERR = '伺服器錯誤!';
var LGHINT_SUBMITED = '已提交';
var LGHINT_SSBEST = '階段最佳%s!';
var LGHINT_SCRCOPY = '已複製打亂';
var LGHINT_LINKCOPY = '分享網址已複製';
var LGHINT_SOLVCOPY = 'Solve copied';
var LGHINT_SORT0 = '已經排列好了';
var LGHINT_IMPORTED = '匯入%d個階段';
var LGHINT_IMPORT0 = '没有匯入任何階段';
var LGHINT_BTCONSUC = '藍牙連接成功';
var LGHINT_BTDISCON = '藍牙連線中斷.';
var LGHINT_BTNOTSUP = '不支援你的智慧魔術方塊';
var LGHINT_BTINVMAC = '無效的 MAC 位址, 無法連接到你的智慧魔術方塊';
var LGHINT_AEXPABT = '自動匯出中止';
var LGHINT_AEXPSUC = 'Auto export success';
var LGHINT_AEXPFAL = '自動匯出失敗';
var EASY_SCRAMBLE_HINT = 'Change length to limit upper bound of solution length, input 2 digits to limit both lower (<= 8) and upper bound';
