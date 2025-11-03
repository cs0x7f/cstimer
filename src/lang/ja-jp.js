var OK_LANG = 'OK';
var CANCEL_LANG = 'キャンセル';
var RESET_LANG = 'リセット';
var ABOUT_LANG = '概要';
var ZOOM_LANG = '拡大';
var COPY_LANG = 'Copy';
var BUTTON_TIME_LIST = 'タイム<br>一覧';
var BUTTON_OPTIONS = 'オプション';
var BUTTON_EXPORT = 'エクスポート';
var BUTTON_DONATE = '寄付';
var PROPERTY_SR = 'セッションごと';
var PROPERTY_USEINS = 'WCA インスペクションの使用';
var PROPERTY_USEINS_STR = 'Always (down)|Always (up)|Except BLD (down)|Except BLD (up)|Never';
var PROPERTY_SHOWINS = 'インスペクション中にアイコンを表示する';
var PROPERTY_VOICEINS = 'WCA インスペクションの音声警告';
var PROPERTY_VOICEINS_STR = '利用しない|男性の声|女性の声';
var PROPERTY_VOICEVOL = '音量';
var PROPERTY_PHASES = 'マルチフェイズ';
var PROPERTY_TIMERSIZE = 'タイマー サイズ';
var PROPERTY_USEMILLI = 'ミリ秒を使用';
var PROPERTY_SMALLADP = '小数点の後に小さいフォントを使用する';
var PROPERTY_SCRSIZE = 'スクランブルサイズ';
var PROPERTY_SCRMONO = '等幅スクランブル';
var PROPERTY_SCRLIM = 'スクランブル領域の高さ制限';
var PROPERTY_SCRALIGN = 'スクランブルエリアの左右配置';
var PROPERTY_SCRALIGN_STR = '中央|左|右';
var PROPERTY_SCRWRAP = 'Scramble Wrap';
var PROPERTY_SCRWRAP_STR = 'Balanced|Normal';
var PROPERTY_SCRNEUT = 'Color neutral';
var PROPERTY_SCRNEUT_STR = 'None|Single face|Double faces|Six faces';
var PROPERTY_SCREQPR = 'Probabilities for training-scramble states';
var PROPERTY_SCREQPR_STR = 'Actual|Equal|Random order';
var PROPERTY_SCRFAST = '4x4x4の高速スクランブルを利用する(非公式)';
var PROPERTY_SCRKEYM = 'スクランブルの主要な動きにラベルをつける';
var PROPERTY_SCRCLK = 'スクランブルをクリックしたときの動作';
var PROPERTY_SCRCLK_STR = '何もしない|コピー|次のスクランブル';
var PROPERTY_WNDSCR = 'スクランブルパネルの表示スタイル';
var PROPERTY_WNDSTAT = '統計パネルの表示スタイル';
var PROPERTY_WNDTOOL = 'ツールパネルの表示スタイル';
var PROPERTY_WND_STR = '通常|フラット';
var EXPORT_DATAEXPORT = 'データのインポート/エクスポート';
var EXPORT_TOFILE = 'ファイルにエクスポート';
var EXPORT_FROMFILE = 'ファイルからインポート';
var EXPORT_TOSERV = 'サーバーにエクスポート';
var EXPORT_FROMSERV = 'サーバーからインポート';
var EXPORT_FROMOTHER = '他のタイマーからセッションをインポート';
var EXPORT_USERID = 'あなたのアカウントを入力してください(英数字のみ)';
var EXPORT_INVID = '入力は英数字のみです！';
var EXPORT_ERROR = 'エラーが発生しました。';
var EXPORT_NODATA = 'あなたのアカウントにはデータがありません。';
var EXPORT_UPLOADED = 'アップロードに成功しました。';
var EXPORT_CODEPROMPT = 'このコードを保存するか、保存したインポートコードを入力してください。';
var EXPORT_ONLYOPT = 'オプションのみエクスポート/インポート';
var EXPORT_ACCOUNT = 'アカウントのエクスポート';
var EXPORT_LOGINGGL = 'Googleアカウントでログイン';
var EXPORT_LOGINWCA = 'WCAアカウントでログイン';
var EXPORT_LOGOUTCFM = 'ログアウトしてもよいですか？';
var EXPORT_LOGINAUTHED = '認可されました。<br>データ取得中...';
var EXPORT_AEXPALERT = 'More than %d solves since last backup';
var EXPORT_WHICH = 'You have %d file(s), which one should be imported?';
var EXPORT_WHICH_ITEM = '%s solve(s), uploaded at %t';
var IMPORT_FINAL_CONFIRM = 'この操作はローカルデータを上書きします！ %d 個のセッションが変更され、少なくとも %a 個のソルブが追加され %r 個のソルブが削除されます。 インポートを実行しますか？';
var BUTTON_SCRAMBLE = 'スクラ-<br>ンブル';
var BUTTON_TOOLS = 'ツール';
var IMAGE_UNAVAILABLE = 'このスクランブルタイプでは利用できません';
var TOOLS_SELECTFUNC = '機能';
var TOOLS_CROSS = 'クロスソルブ';
var TOOLS_EOLINE = 'EOLineソルブ';
var TOOLS_ROUX1 = 'Roux S1 ソルブ';
var TOOLS_222FACE = '2x2x2 一面ソルブ';
var TOOLS_GIIKER = 'Giiker キューブ';
var TOOLS_IMAGE = 'スクランブルの描画';
var TOOLS_STATS = '統計情報';
var TOOLS_HUGESTATS = 'クロスセッションの統計情報';
var TOOLS_DISTRIBUTION = 'タイム分布';
var TOOLS_TREND = 'タイムトレンド';
var TOOLS_METRONOME = 'メトロノーム';
var TOOLS_RECONS = 'Reconstruct';
var TOOLS_RECONS_NODATA = '解法が見つかりませんでした。';
var TOOLS_RECONS_TITLE = 'insp|exec|turn|tps';
var TOOLS_TRAINSTAT = 'トレーニング統計';
var TOOLS_BLDHELPER = 'BLDヘルパー';
var TOOLS_CFMTIME = 'タイム確認';
var TOOLS_SOLVERS = 'ソルバー';
var TOOLS_DLYSTAT = '日別の統計';
var TOOLS_DLYSTAT1 = '期間|開始日|週';
var TOOLS_DLYSTAT_OPT1 = '日|週|月|年';
var TOOLS_DLYSTAT_OPT2 = '日|月|火|水|木|金|土';
var TOOLS_SYNCSEED = '共通スクランブル';
var TOOLS_SYNCSEED_SEED = 'シード値';
var TOOLS_SYNCSEED_INPUT = 'シード値の入力';
var TOOLS_SYNCSEED_30S = '30秒シード値の利用';
var TOOLS_SYNCSEED_HELP = '有効な場合、スクランブルはシードとスクランブル設定のみに依存します。';
var TOOLS_SYNCSEED_DISABLE = '現在のシード値を無効にしますか？';
var TOOLS_SYNCSEED_INPUTA = 'シード値の値 (a-zA-Z0-9) を入力';
var TOOLS_BATTLE = 'オンライン対戦';
var TOOLS_BATTLE_HEAD = 'ルーム|ルームに参加';
var TOOLS_BATTLE_TITLE = '順位|状態|タイム';
var TOOLS_BATTLE_STATUS = '準備完了|インスペクション|ソルブ中|ソルブ完了|切断';
var TOOLS_BATTLE_INFO = '友達と同じルームに参加し、対戦することができます。';
var TOOLS_BATTLE_JOINALERT = 'ルームIDを入力してください';
var TOOLS_BATTLE_LEAVEALERT = '現在のルームを離れる';
var OLCOMP_UPDATELIST = '大会リストの更新';
var OLCOMP_VIEWRESULT = '結果表示';
var OLCOMP_VIEWMYRESULT = '履歴';
var OLCOMP_START = 'スタート!';
var OLCOMP_SUBMIT = '送信!';
var OLCOMP_SUBMITAS = 'ユーザー名を指定して送信: ';
var OLCOMP_WCANOTICE = 'WCAアカウントとして送信 (動作しない場合は再ログインしてください)';
var OLCOMP_OLCOMP = 'オンライン大会';
var OLCOMP_ANONYM = '匿名';
var OLCOMP_ME = '自分';
var OLCOMP_WCAACCOUNT = 'WCAアカウント';
var OLCOMP_ABORT = '大会を中止して結果を表示しますか？';
var OLCOMP_WITHANONYM = '匿名';
var PROPERTY_IMGSIZE = 'スクランブルのイメージサイズ';
var PROPERTY_IMGREP = 'Show virtual cube animation when clicking scramble image';
var TIMER_INSPECT = 'インスペクション';
var TIMER_SOLVE = '計測中';
var PROPERTY_USEMOUSE = 'マウスタイマーの使用';
var PROPERTY_TIMEU = 'タイマー更新間隔';
var PROPERTY_TIMEU_STR = '随時|0.1s|秒|インスペクション|なし';
var PROPERTY_PRETIME = 'スペースキーを押し続ける時間(秒)';
var PROPERTY_ENTERING = 'タイム入力方法';
var PROPERTY_ENTERING_STR = 'タイマー|タイピング|スタックマット|MoyuTimer|バーチャル|Bluetooth Cube|qCube|Bluetooth Timer|last layer training';
var PROPERTY_INTUNIT = '整数を入力するときの単位';
var PROPERTY_INTUNIT_STR = '1秒|1/100秒|ミリ秒';
var PROPERTY_COLOR = 'カラーテーマの選択';
var PROPERTY_COLORS = '文字|背景|ボード|ボタン|リンク|ロゴ|ロゴ背景';
var PROPERTY_VIEW = 'UIスタイル';
var PROPERTY_VIEW_STR = '自動|モバイル|デスクトップ';
var PROPERTY_UIDESIGN = 'UIデザイン';
var PROPERTY_UIDESIGN_STR = '通常|マテリアルデザイン|通常（影なし）|マテリアルデザイン（影なし）';
var COLOR_EXPORT = 'インポート用にこの文字列を保存してください。';
var COLOR_IMPORT = 'エクスポートされた文字列を入力してください。';
var COLOR_FAIL = '不正データです。インポートに失敗しました。';
var PROPERTY_FONTCOLOR_STR = '黒|白';
var PROPERTY_COLOR_STR = '手動|インポート/エクスポート|ランダム|スタイル1|スタイル2|スタイル2|黒|白|スタイル6|ソラリゼーション ダーク|ソラリゼーション ライト';
var PROPERTY_FONT = 'タイマーフォントの選択';
var PROPERTY_FONT_STR = 'ランダムデジタル|通常|デジタル1|デジタル2|デジタル3|デジタル4|デジタル5';
var PROPERTY_FORMAT = '時間形式';
var PROPERTY_USEKSC = 'キーボードショートカットを有効にする';
var PROPERTY_USEGES = 'use gesture control';
var PROPERTY_NTOOLS = 'ツール表示数';
var PROPERTY_AHIDE = '記録中はすべての要素を非表示にする';
var SCRAMBLE_LAST = '前';
var SCRAMBLE_NEXT = '次';
var SCRAMBLE_SCRAMBLE = 'スクランブル';
var SCRAMBLE_SCRAMBLING = 'スクランブル';
var SCRAMBLE_LENGTH = '長さ';
var SCRAMBLE_INPUT = 'スクランブルの入力';
var SCRAMBLE_INPUTTYPE = 'Scramble type';
var PROPERTY_VRCSPEED = 'VRCの基本速度(tps)';
var PROPERTY_VRCORI = 'Virtual cube orientation';
var PROPERTY_VRCMP = 'マルチフェイズ';
var PROPERTY_VRCMPS = 'なし|CFOP|CF+OP|CFFFFOP|CFFFFOOPP|Roux';
var PROPERTY_GIIKERVRC = '仮想Giikerキューブの表示';
var PROPERTY_GIISOK_DELAY = '時間経過でスクランブル状態とみなす';
var PROPERTY_GIISOK_DELAYS = '2秒|3秒|4秒|5秒|行わない|正しくスクランブルされた時';
var PROPERTY_GIISOK_KEY = 'スペースバーでスクランブルとみなす';
var PROPERTY_GIISOK_MOVE = 'スクランブルとみなす条件';
var PROPERTY_GIISOK_MOVES = 'U4, R4, など|(U U\')2, (U\' U)2, など|行わない';
var PROPERTY_GIISBEEP = 'スクランブルされたときにビープ音を鳴らす';
var PROPERTY_GIIRST = '接続時にGiikerキューブをリセットする';
var PROPERTY_GIIRSTS = '常に|プロンプトを表示|行わない';
var PROPERTY_GIIMODE = 'Bluetoothキューブモード';
var PROPERTY_GIIMODES = 'Normal|Training|Continuous training';
var PROPERTY_VRCAH = '巨大なキューブにおける重要でないパーツ';
var PROPERTY_VRCAHS = '隠す|ボーダー|色|表示';
var CONFIRM_GIIRST = 'Giikerキューブをソルブ状態にリセットしますか？';
var PROPERTY_GIIAED = 'ハードウェアエラーの自動検知';
var scrdata = [
	['WCA', [
		['3x3x3', "333", 0],
		['2x2x2', "222so", 0],
		['4x4x4', "444wca", -40],
		['5x5x5', "555wca", -60],
		['6x6x6', "666wca", -80],
		['7x7x7', "777wca", -100],
		['3x3目隠し', "333ni", 0],
		['3x3最少手数', "333fm", 0],
		['3x3片手', "333oh", 0],
		['クロック', "clkwca", 0],
		['メガミンクス', "mgmp", -70],
		['ピラミンクス', "pyrso", -10],
		['スキューブ', "skbso", 0],
		['スクエア１', "sqrs", 0],
		['4x4目隠し', "444bld", -40],
		['5x5目隠し', "555bld", -60],
		['3x3複数目隠し', "r3ni", 5]
	]],
	['入力', [
		['外部', "input", 0],
		['大会', "remoteComp", 0],
		['オンライン対戦', "remoteBattle", 0],
		['Remote', "remoteOther", 0]
	]],
	['===WCA===', [
		['--', "blank", 0]
	]],
	['3x3x3', [
		["ランダム状態 (WCA)", "333", 0],
		['ランダムムーブ', "333o", 25],
		['3x3x3 for noobs', "333noob", 25],
		['エッジのみ', "edges", 0],
		['コーナーのみ', "corners", 0],
		['BLDヘルパー', "nocache_333bldspec", 0],
		['Pattern Tool', "nocache_333patspec", 0],
		['3x3足', "333ft", 0],
		['カスタム', "333custom", 0]
	]],
	['3x3x3 CFOP', [
		['PLL', "pll", 0],
		['OLL', "oll", 0],
		['last slot + last layer', "lsll2", 0],
		['last layer', "ll", 0],
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
		['cross solved', "f2l", 0],
		['EOLine', "eoline", 0],
		['EO Cross', "eocross", 0],
		['easy cross', "easyc", 3],
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
		["ランダム状態 (WCA)", "222so", 0],
		['最適', "222o", 0],
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
		['random move', "444m", 40],
		['SiGN', "444", 40],
		['YJ', "444yj", 40],
		['4x4x4 edges', "4edge", 0],
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
	['クロック', [
		['WCA', "clkwca", 0],
		['wca (old)', "clkwcab", 0],
		['WCA w/o y2', "clknf", 0],
		['jaap', "clk", 0],
		['最適', "clko", 0],
		['concise', "clkc", 0],
		['efficient pin order', "clke", 0]
	]],
	['メガミンクス', [
		["WCA", "mgmp", 70],
		['Carrot', "mgmc", 70],
		['old style', "mgmo", 70],
		['2-generator R,U', "minx2g", 30],
		['last slot + last layer', "mlsll", 0],
		['PLL', "mgmpll", 0],
		['Last Layer', "mgmll", 0]
	]],
	['ピラミンクス', [
		["ランダム状態 (WCA)", "pyrso", 10],
		['最適', "pyro", 0],
		['ランダムムーブ', "pyrm", 25],
		['L4E', "pyrl4e", 0],
		['4 tips', "pyr4c", 0],
		['No bar', "pyrnb", 0]
	]],
	['スキューブ', [
		["ランダム状態 (WCA)", "skbso", 0],
		['最適', "skbo", 0],
		['ランダムムーブ', "skb", 25],
		['No bar', "skbnb", 0]
	]],
	['スクエア１', [
		["ランダム状態 (WCA)", "sqrs", 0],
		["CSP", "sqrcsp", 0],
		["PLL", "sq1pll", 0],
		['face turn metric', "sq1h", 40],
		['twist metric', "sq1t", 20]
	]],
	['===その他===', [
		['--', "blank", 0]
	]],
	['15 puzzle', [
		['ランダム状態 URLD', "15prp", 0],
		['ランダム状態 ^<>v', "15prap", 0],
		['ランダム状態 Blank', "15prmp", 0],
		['ランダムムーブ URLD', "15p", 80],
		['ランダムムーブ ^<>v', "15pat", 80],
		['ランダムムーブ Blank', "15pm", 80]
	]],
	['8 puzzle', [
		['ランダム状態 URLD', "8prp", 0],
		['ランダム状態 ^<>v', "8prap", 0],
		['ランダム状態 Blank', "8prmp", 0]
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
		['11x11x11', "111111", 120],
		['NxNxN', "cubennn", 12],
		['Mirror Blocks', "mrbl", 0]
	]],
	['Gear Cube', [
		['ランダム状態', "gearso", 0],
		['最適', "gearo", 0],
		['ランダムムーブ', "gear", 10]
	]],
	['Kilominx', [
		['ランダム状態', "klmso", 0],
		['Pochmann', "klmp", 30]
	]],
	['ギガミンクス', [
		['Pochmann', "giga", 300]
	]],
	['Crazy Puzzle', [
		['Crazy 3x3x3', "crz3a", 30]
	]],
	['Cmetrick', [
		['Cmetrick', "cm3", 25],
		['Cmetrick Mini', "cm2", 25]
	]],
	['Helicopter Cube', [
		['Heli copter', "heli", 40],
		['Curvy copter', "helicv", 40],
		['2x2 Heli random move', "heli2x2", 70],
		['2x2 Heli by group', "heli2x2g", 5]
	]],
	['Redi Cube', [
		['ランダム状態', "rediso", 0],
		['MoYu', "redim", 8],
		['ランダムムーブ', "redi", 20]
	]],
	['Dino Cube', [
		['ランダム状態', "dinoso", 0],
		['最適', "dinoo", 0]
	]],
	['アイビーキューブ', [
		['ランダム状態', "ivyso", 0],
		['最適', "ivyo", 0],
		['ランダムムーブ', "ivy", 10]
	]],
	['Master Pyraminx', [
		['ランダム状態', "mpyrso", 0],
		['ランダムムーブ', "mpyr", 42]
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
	['Square', [
		['Square-2', "sq2", 20],
		['Super Square-1', "ssq1t", 20]
	]],
	['Super Floppy', [
		[' ', "sfl", 25]
	]],
	['UFO', [
		['Jaap style', "ufo", 25]
	]],
	['FTO (Face-Turning Octahedron)', [
		['ランダム状態', "ftoso", 0],
		['ランダムムーブ', "fto", 30],
		['L3T', "ftol3t", 0],
		['L3T+LBT', "ftol4t", 0],
		['TCP', "ftotcp", 0],
		['edges only', "ftoedge", 0],
		['centers only', "ftocent", 0],
		['corners only', "ftocorn", 0],
		['Diamond ランダム状態', "dmdso", 0]
	]],
	['Icosahedron', [
		['Icosamate ランダムムーブ', "ctico", 60]
	]],
	['===SPECIAL===', [
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
	['turn the top face', 'turn the bottom face'],
	['turn the right face', 'turn the left face'],
	['turn the front face', 'turn the back face']
];
var SCRAMBLE_NOOBSS = ' clockwise by 90 degrees,| counterclockwise by 90 degrees,| by 180 degrees,';
var SCROPT_TITLE = 'スクランブル設定';
var SCROPT_BTNALL = '全選択';
var SCROPT_BTNNONE = '選択解除';
var SCROPT_EMPTYALT = '少なくとも1つのケースを選択してください';
var STATS_CFM_RESET = 'このセッションの全タイムをリセットしますか？';
var STATS_CFM_DELSS = 'セッション [%s] を削除しますか？';
var STATS_CFM_DELMUL = '現在のインデックスから削除する値の個数は？';
var STATS_CFM_DELETE = 'このタイムを削除しますか？';
var STATS_COMMENT = 'コメント';
var STATS_REVIEW = 'レビュー';
var STATS_DATE = '日時';
var STATS_SSSTAT = '単発の統計';
var STATS_SSRETRY = 'Retry';
var STATS_CURROUND = '現在のラウンドの統計情報';
var STATS_CURSESSION = '現在のセッションの統計情報';
var STATS_CURSPLIT = '現在のセッションのフェイズ %d の統計情報';
var STATS_EXPORTCSV = 'CSVでエクスポート';
var STATS_SSMGR_TITLE = 'セッションマネージャー';
var STATS_SSMGR_NAME = '名前';
var STATS_SSMGR_DETAIL = 'セッション詳細';
var STATS_SSMGR_OPS = '名前変更|作成|分割|マージ|削除|Sort|Merge&Dedupe';
var STATS_SSMGR_ORDER = 'スクランブル順に並べる';
var STATS_SSMGR_ODCFM = 'すべてのセッションをスクランブル順に並べますか？';
var STATS_SSMGR_SORTCFM = '%d 回のソルブを並び替えます、よろしいですか？';
var STATS_ALERTMG = 'セッション [%f] のすべてのタイムをセッション [%t] の最後にマージしますか？';
var STATS_PROMPTSPL = 'セッション [%s] から分割する最新のタイム数';
var STATS_ALERTSPL = '少なくとも１つのタイムを残すか、分割する必要があります';
var STATS_AVG = '平均';
var STATS_SUM = '合計';
var STATS_SOLVE = 'ソルブ';
var STATS_TIME = 'タイム';
var STATS_SESSION = 'セッション';
var STATS_SESSION_NAME = 'セッション名の編集';
var STATS_SESSION_NAMEC = '新しいセッションの名前';
var STATS_STRING = 'ベスト|現在|ワースト|csTimerによって %Y-%M-%D に生成|ソルブ数/合計: %d|single|mean of %mk|avg of %mk|Average: %v{ (σ = %sgm)}|Mean: %v|タイム一覧:|%s から %e までのソルブ|総経過時間: %d|target';
var STATS_PREC = 'タイム分布の精度';
var STATS_PREC_STR = '自動|0.1秒|0.2秒|0.5秒|1秒|2秒|5秒|10秒|20秒|50秒|100秒';
var STATS_TYPELEN = 'リスト %d の種類|リスト %d の長さ|average|mean';
var STATS_STATCLR = 'セッションを空にすることを許可';
var STATS_ABSIDX = '統計報告に絶対指数を表示';
var STATS_XSESSION_DATE = '全期間|24時間|7日|30日|365日';
var STATS_XSESSION_NAME = '全セッション';
var STATS_XSESSION_SCR = '全スクランブル';
var STATS_XSESSION_CALC = '計算';
var STATS_RSFORSS = 'ソルブ番号をクリックしたときに統計を表示';
var PROPERTY_PRINTSCR = '統計情報にスクランブルを表示';
var PROPERTY_PRINTCOMM = 'print comment(s) in statistics';
var PROPERTY_PRINTDATE = '統計情報にソルブ日時を表示';
var PROPERTY_SUMMARY = 'タイム一覧の前にサマリーを表示';
var PROPERTY_IMRENAME = 'セッション作成後すぐに名前を変更する';
var PROPERTY_SCR2SS = 'スクランブルのタイプを変更したとき新しいセッションを作成';
var PROPERTY_SS2SCR = 'セッションを切り替えたときスクランブルを元に戻す';
var PROPERTY_SS2PHASES = 'セッションを切り替えたときマルチフェイズの記録を元に戻す';
var PROPERTY_STATINV = '逆順のタイム一覧';
var PROPERTY_STATSSUM = 'タイム一覧に合計を表示';
var PROPERTY_STATTHRES = 'セッションベスト記録のための目標タイムを表示';
var PROPERTY_STATBPA = 'Show best possible average (BPA)';
var PROPERTY_STATWPA = 'Show worst possible average (WPA)';
var PROPERTY_STATAL = '統計指標';
var PROPERTY_STATALU = 'カスタム統計指標';
var PROPERTY_HLPBS = 'Highlight PBs';
var PROPERTY_HLPBS_STR = 'Dark orange as WCA|As link color|Bolder|None';
var PROPERTY_DELMUL = '複数削除を有効にする';
var PROPERTY_TOOLSFUNC = '機能選択';
var PROPERTY_TRIM = '片側で除外するソルブ数';
var PROPERTY_TRIMR = 'ワースト記録側から除外するソルブ数';
var PROPERTY_TRIM_MED = '中央値';
var PROPERTY_STKHEAD = 'スタックマットのステータス情報を利用する';
var PROPERTY_TOOLPOS = 'ツールパネルの位置';
var PROPERTY_TOOLPOS_STR = '下|フロート|上';
var PROPERTY_HIDEFULLSOL = '解法を段階的に表示';
var PROPERTY_IMPPREV = '最新でないデータをインポート';
var PROPERTY_AUTOEXP = 'オートエクスポート (100ソルブごと)';
var PROPERTY_AUTOEXP_OPT = '保存しない|ファイルに保存|csTimer IDに保存|WCAアカウントに保存|Googleアカウントに保存|Alert Only';
var PROPERTY_SCRASIZE = '自動スクランブルのサイズ';
var MODULE_NAMES = {
	"kernel": 'グローバル',
	"ui": '表示',
	"color": '色',
	"timer": 'タイマー',
	"scramble": 'スクランブル',
	"stats": '統計情報',
	"tools": 'ツール',
	"vrc": '仮想・<br>Giiker'
};
var BGIMAGE_URL = '画像のURLを入力してください。';
var BGIMAGE_INVALID = '無効なURL';
var BGIMAGE_OPACITY = '背景画像の透過度';
var BGIMAGE_IMAGE = '背景画像';
var BGIMAGE_IMAGE_STR = 'なし|マニュアル|CCT';
var SHOW_AVG_LABEL = 'アベレージのラベルを表示';
var SHOW_DIFF_LABEL = '差分のラベルを表示';
var SHOW_DIFF_LABEL_STR = '-緑+赤|-赤+緑|通常|なし';
var USE_LOGOHINT = 'ロゴにメッセージヒントを表示';
var TOOLS_SCRGEN = 'スクランブルジェネレーター';
var SCRGEN_NSCR = 'スクランブル数';
var SCRGEN_PRE = 'プレフィクス';
var SCRGEN_GEN = 'スクランブル生成！';
var VRCREPLAY_TITLE = '仮想リプレイ';
var VRCREPLAY_ORI = '元の向き|自動の向き';
var VRCREPLAY_SHARE = 'リンクを共有';
var GIIKER_CONNECT = 'クリックして接続';
var GIIKER_RESET = 'リセット (ソルブ済み)';
var GIIKER_REQMACMSG = 'Please enter the MAC address of your smart hardware (xx:xx:xx:xx:xx:xx). You can find the MAC address through chrome://bluetooth-internals/#devices, or modify following options to let csTimer automatically obtain it:\nChrome: Turn on chrome://flags/#enable-experimental-web-platform-features\nBluefy: Turn on Enable BLE Advertisements';
var GIIKER_NOBLEMSG = 'Bluetooth API is not available. Ensure https access, check bluetooth is enabled on your device, and try chrome with chrome://flags/#enable-experimental-web-platform-features enabled';
var PROPERTY_SHOWAD = '広告を表示 (リロード後に有効)';
var PROPERTY_GIIORI = 'キューブの向き';
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
