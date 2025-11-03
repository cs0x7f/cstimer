var OK_LANG = 'OK';
var CANCEL_LANG = 'Fortryd';
var RESET_LANG = 'Nulstil';
var ABOUT_LANG = 'Omkring';
var ZOOM_LANG = 'Zoom';
var COPY_LANG = 'Copy';
var BUTTON_TIME_LIST = 'List tider';
var BUTTON_OPTIONS = 'Indstillinger';
var BUTTON_EXPORT = 'Upload';
var BUTTON_DONATE = 'Doner';
var PROPERTY_SR = 'Med session';
var PROPERTY_USEINS = 'brug WCA inspektion';
var PROPERTY_USEINS_STR = 'Always (down)|Always (up)|Except BLD (down)|Except BLD (up)|Never';
var PROPERTY_SHOWINS = 'Vis et ikon når inspektion er aktiveret';
var PROPERTY_VOICEINS = 'stemme advarsel af WCA inspektion';
var PROPERTY_VOICEINS_STR = 'ingen|mandlig stemme|kvindelig stemme';
var PROPERTY_VOICEVOL = 'Stemme lydstyrke';
var PROPERTY_PHASES = 'multi-fase';
var PROPERTY_TIMERSIZE = 'timer størrelse';
var PROPERTY_USEMILLI = 'brug millisekunder';
var PROPERTY_SMALLADP = 'brug lille font efter decimal punkt';
var PROPERTY_SCRSIZE = 'blanding størrelse';
var PROPERTY_SCRMONO = 'monospaced blanding';
var PROPERTY_SCRLIM = 'Begræns højden af blandings området';
var PROPERTY_SCRALIGN = 'Justering af blandings området';
var PROPERTY_SCRALIGN_STR = 'centrum|venstre|højre';
var PROPERTY_SCRWRAP = 'Scramble Wrap';
var PROPERTY_SCRWRAP_STR = 'Balanced|Normal';
var PROPERTY_SCRNEUT = 'Color neutral';
var PROPERTY_SCRNEUT_STR = 'None|Single face|Double faces|Six faces';
var PROPERTY_SCREQPR = 'Probabilities for training-scramble states';
var PROPERTY_SCREQPR_STR = 'Actual|Equal|Random order';
var PROPERTY_SCRFAST = 'Brug hurtig blanding til 4x4x4 (ikke officiel)';
var PROPERTY_SCRKEYM = 'Marker nøgle rotationer i blanding';
var PROPERTY_SCRCLK = 'Handling ved klik på blanding';
var PROPERTY_SCRCLK_STR = 'Ingen|Kopiér|Næste blanding';
var PROPERTY_WNDSCR = 'Blandingspanel visuelle stil';
var PROPERTY_WNDSTAT = 'Statistikpanel visuelle stil';
var PROPERTY_WNDTOOL = 'Værktøjpanels visuelle stil';
var PROPERTY_WND_STR = 'Normal|Flad';
var EXPORT_DATAEXPORT = 'Import/eksport af data';
var EXPORT_TOFILE = 'Export til fil';
var EXPORT_FROMFILE = 'Import til fil';
var EXPORT_TOSERV = 'Export til server';
var EXPORT_FROMSERV = 'Import fra server';
var EXPORT_FROMOTHER = 'Importer session(er) fra andre stopure';
var EXPORT_USERID = 'Vær venlig og sæt din konto ind (kun alfabetisk eller nummere)';
var EXPORT_INVID = 'Kun alfabetiks eller nummere er tilladt!';
var EXPORT_ERROR = 'Nogle fejl opstod...';
var EXPORT_NODATA = 'Ingen data fundet på din konto';
var EXPORT_UPLOADED = 'Upload fuldført';
var EXPORT_CODEPROMPT = 'Gem denne kode, eller indtast gemte kode for at importere';
var EXPORT_ONLYOPT = 'Eksporter/Importer kun Valg';
var EXPORT_ACCOUNT = 'Eksporter Konti';
var EXPORT_LOGINGGL = 'Login med Google konto';
var EXPORT_LOGINWCA = 'Login med WCA konto';
var EXPORT_LOGOUTCFM = 'Bekræft for at logge ud?';
var EXPORT_LOGINAUTHED = 'Autoriseret<br>Henter data...';
var EXPORT_AEXPALERT = 'More than %d solves since last backup';
var EXPORT_WHICH = 'You have %d file(s), which one should be imported?';
var EXPORT_WHICH_ITEM = '%s solve(s), uploaded at %t';
var IMPORT_FINAL_CONFIRM = 'Dette vil overstyre alle lokal data! Det vil ændre %d sessioner, tilføje %a og fjerne mindst %r løsninger. Bekræft for at importere data?';
var BUTTON_SCRAMBLE = 'Blanding';
var BUTTON_TOOLS = 'Værktøj';
var IMAGE_UNAVAILABLE = 'Utilgængelig for denne blandings type';
var TOOLS_SELECTFUNC = 'Funktion';
var TOOLS_CROSS = 'løs kryds';
var TOOLS_EOLINE = 'løs EOLine';
var TOOLS_ROUX1 = 'løs Roux S1';
var TOOLS_222FACE = '2x2x2 side';
var TOOLS_GIIKER = 'Bluetooth Terning';
var TOOLS_IMAGE = 'vis blanding';
var TOOLS_STATS = 'Statistiker';
var TOOLS_HUGESTATS = 'Krydssessions statistik';
var TOOLS_DISTRIBUTION = 'Tidsfordeling';
var TOOLS_TREND = 'Tidsudvikling';
var TOOLS_METRONOME = 'metronom';
var TOOLS_RECONS = 'Rekonstruer';
var TOOLS_RECONS_NODATA = 'Ingen løsning fundet.';
var TOOLS_RECONS_TITLE = 'inspektion|løsning|træk|tps';
var TOOLS_TRAINSTAT = 'Træningsstatistik';
var TOOLS_BLDHELPER = 'BLD hjælper';
var TOOLS_CFMTIME = 'Bekræft tid';
var TOOLS_SOLVERS = 'Løsere';
var TOOLS_DLYSTAT = 'Daglig statistik';
var TOOLS_DLYSTAT1 = 'Periode|Start af dag|uge';
var TOOLS_DLYSTAT_OPT1 = 'dag|uge|måned|år';
var TOOLS_DLYSTAT_OPT2 = 'Søn|Man|Tir|Ons|Tor|Fre|Lør';
var TOOLS_SYNCSEED = 'Regulær blanding';
var TOOLS_SYNCSEED_SEED = 'Frø';
var TOOLS_SYNCSEED_INPUT = 'Input frø';
var TOOLS_SYNCSEED_30S = 'Brug 30s Frø';
var TOOLS_SYNCSEED_HELP = 'Hvis aktiveret, vil blanding kun afhænge af seed og blandingsindstillinger.';
var TOOLS_SYNCSEED_DISABLE = 'Deaktivér nuværende frø?';
var TOOLS_SYNCSEED_INPUTA = 'Indtast en værdi ([a-z][A-Z][0-9]) som frø';
var TOOLS_BATTLE = 'Online battle';
var TOOLS_BATTLE_HEAD = 'Rum|Deltag i rum';
var TOOLS_BATTLE_TITLE = 'Rang|Status|Tid';
var TOOLS_BATTLE_STATUS = 'Klar|Inspicér|Løs|Løst|Tabt';
var TOOLS_BATTLE_INFO = 'Deltag i et kamplokale med din ven, så kan i kæmpe sammen.';
var TOOLS_BATTLE_JOINALERT = 'Angiv rum ID';
var TOOLS_BATTLE_LEAVEALERT = 'Forlad nuværende rum';
var OLCOMP_UPDATELIST = 'Opdater konkurrenceliste';
var OLCOMP_VIEWRESULT = 'Vis Resultat';
var OLCOMP_VIEWMYRESULT = 'Min Historik';
var OLCOMP_START = 'Start!';
var OLCOMP_SUBMIT = 'Indsend';
var OLCOMP_SUBMITAS = 'Indsend som: ';
var OLCOMP_WCANOTICE = 'Indsend som din WCA-konto? (Login igen hvis ikke genkendt efter indsendelse)';
var OLCOMP_OLCOMP = 'Online konkurrence';
var OLCOMP_ANONYM = 'Anonym';
var OLCOMP_ME = 'Mig';
var OLCOMP_WCAACCOUNT = 'WCA Konto';
var OLCOMP_ABORT = 'Afbryd konkurrence og vis resultater?';
var OLCOMP_WITHANONYM = 'Med Anonym';
var PROPERTY_IMGSIZE = 'Blandings billed størrelse';
var PROPERTY_IMGREP = 'Show virtual cube animation when clicking scramble image';
var TIMER_INSPECT = 'Inspektion';
var TIMER_SOLVE = 'Løs';
var PROPERTY_USEMOUSE = 'Brug musetimer';
var PROPERTY_TIMEU = 'Timer opdatering er';
var PROPERTY_TIMEU_STR = 'Opdatering|0.1s|sekunder|inspektion|ingen';
var PROPERTY_PRETIME = 'Tid at holde mellemrumsknappen inde(sekunder(s))';
var PROPERTY_ENTERING = 'Put tid ind med';
var PROPERTY_ENTERING_STR = 'timer|skrive|stackmat|MoYuTimer|virtuel|Bluetooth Cube|qCube|Bluetooth Timer|last layer training';
var PROPERTY_INTUNIT = 'Enhed ved indtastning af heltal';
var PROPERTY_INTUNIT_STR = 'sekund|centisekund|milisekund';
var PROPERTY_COLOR = 'vælg farve tema';
var PROPERTY_COLORS = 'font farve|baggrunds farve|bord farve|knappe farve|link farve| Logo farve| Logo baggrundsfarve';
var PROPERTY_VIEW = 'UI stil er';
var PROPERTY_VIEW_STR = 'Automatisk|Mobil|Skrivebord';
var PROPERTY_UIDESIGN = 'UI design er';
var PROPERTY_UIDESIGN_STR = 'Normal|Materialedesign|Normal m/u skygger|Materialedesign m/u skygger';
var COLOR_EXPORT = 'Vær venlig og gem stringen for import';
var COLOR_IMPORT = 'Vær venlig og input stringen exported';
var COLOR_FAIL = 'Inkorrekt Date, Import fejlede';
var PROPERTY_FONTCOLOR_STR = 'Sort|Hvid';
var PROPERTY_COLOR_STR = 'manual|import/export...|Tilfældig|stil1|stil2|stil3|sort|hvid|stil6|solarized dark|solarized light';
var PROPERTY_FONT = 'Vælg timerens font';
var PROPERTY_FONT_STR = 'Tilfældig digital|normal|digital1|digital2|digital3|digital4|digital5';
var PROPERTY_FORMAT = 'tids format';
var PROPERTY_USEKSC = 'brug tastatur genvej';
var PROPERTY_USEGES = 'use gesture control';
var PROPERTY_NTOOLS = 'nummer af værktøj';
var PROPERTY_AHIDE = 'Gem alle elementer når du tager tid';
var SCRAMBLE_LAST = 'sidste';
var SCRAMBLE_NEXT = 'næste';
var SCRAMBLE_SCRAMBLE = 'blanding';
var SCRAMBLE_SCRAMBLING = 'Blander';
var SCRAMBLE_LENGTH = 'længde';
var SCRAMBLE_INPUT = 'input blanding(er)';
var SCRAMBLE_INPUTTYPE = 'Scramble type';
var PROPERTY_VRCSPEED = 'VRC base hastighed (TPS)';
var PROPERTY_VRCORI = 'Virtual cube orientation';
var PROPERTY_VRCMP = 'flerfaset';
var PROPERTY_VRCMPS = 'Ingen|CFOP|CF+OP|CFFFFOP|CFFFFOOPP|Roux';
var PROPERTY_GIIKERVRC = 'Vis virtuel Bluetooth terning';
var PROPERTY_GIISOK_DELAY = 'Marker blandet efter pause i blanding';
var PROPERTY_GIISOK_DELAYS = '2s|3s|4s|5s|Aldrig|Korrekt blandet';
var PROPERTY_GIISOK_KEY = 'Marker blandet med mellemrumstast';
var PROPERTY_GIISOK_MOVE = 'Marker blandet ved udførelse';
var PROPERTY_GIISOK_MOVES = 'U4, R4 osv.|(U U\')2, (U\' U)2, osv.|Aldrig';
var PROPERTY_GIISBEEP = 'Bip ved blandet markering ';
var PROPERTY_GIIRST = 'Nulstil bluetooth terning ved tilslutning';
var PROPERTY_GIIRSTS = 'Altid|Spørg|Aldrig';
var PROPERTY_GIIMODE = 'Blueetooth Cube Mode';
var PROPERTY_GIIMODES = 'Normal|Training|Continuous training';
var PROPERTY_VRCAH = 'Ubrugelige dele i stor terning';
var PROPERTY_VRCAHS = 'Skjul|Kant|Farve|Vis';
var CONFIRM_GIIRST = 'Nulstil bluetooth terning som løst?';
var PROPERTY_GIIAED = 'Automatisk hardware fejl opdagelse';
var scrdata = [
	['WCA', [
		['3x3x3', "333", 0],
		['2x2x2', "222so", 0],
		['4x4x4', "444wca", -40],
		['5x5x5', "555wca", -60],
		['6x6x6', "666wca", -80],
		['7x7x7', "777wca", -100],
		['3x3 BLD', "333ni", 0],
		['3x3 FM', "333fm", 0],
		['3x3 eh', "333oh", 0],
		['Ur', "clkwca", 0],
		['megaminx', "mgmp", -70],
		['pyraminx', "pyrso", -10],
		['skewb', "skbso", 0],
		['Fk1', "sqrs", 0],
		['4x4 BLD', "444bld", -40],
		['5x5 BLD', "555bld", -60],
		['3x3 MBLD', "r3ni", 5]
	]],
	['Input', [
		['Ekstern', "input", 0],
		['Konkurrence', "remoteComp", 0],
		['Online battle', "remoteBattle", 0],
		['Remote', "remoteOther", 0]
	]],
	['===WCA===', [
		['--', "blank", 0]
	]],
	['3x3x3', [
		["tilfældig tilstand (WCA)", "333", 0],
		['tilfældig træk', "333o", 25],
		['3x3x3 til nybegyndere', "333noob", 25],
		['kun kanter', "edges", 0],
		['kun hjørner', "corners", 0],
		['BLD hjælper', "nocache_333bldspec", 0],
		['Pattern Tool', "nocache_333patspec", 0],
		['3x3 FT', "333ft", 0],
		['Brugertilpasset', "333custom", 0]
	]],
	['3x3x3 CFOP', [
		['PLL', "pll", 0],
		['OLL', "oll", 0],
		['sidste plads + sidste lag', "lsll2", 0],
		['sidste lag', "ll", 0],
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
		['Krydset løst', "f2l", 0],
		['EOLine', "eoline", 0],
		['EO Cross', "eocross", 0],
		['Nemt kryds', "easyc", 3],
		['Let xcross', "easyxc", 4]
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
		["tilfældig tilstand (WCA)", "222so", 0],
		['Optimal', "222o", 0],
		['3-gen', "2223", 25],
		['EG', "222eg", 0],
		['CLL', "222eg0", 0],
		['EG1', "222eg1", 0],
		['EG2', "222eg2", 0],
		['TCLL+', "222tcp", 0],
		['TCLL-', "222tcn", 0],
		['TCLL', "222tc", 0],
		['LS', "222lsall", 0],
		['Ingen værktøjslinje', "222nb", 0]
	]],
	['4x4x4', [
		["WCA", "444wca", -40],
		['tilfældig træk', "444m", 40],
		['SIGN', "444", 40],
		['YJ', "444yj", 40],
		['4x4x4 kanter', "4edge", 0],
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
		['5x5x5 kanter', "5edge", 8]
	]],
	['6x6x6', [
		["WCA", "666wca", 80],
		['SiGN', "666si", 80],
		['præfiks', "666p", 80],
		['Suffiks', "666s", 80],
		['6x6x6 kanter', "6edge", 8]
	]],
	['7x7x7', [
		["WCA", "777wca", 100],
		['SIGN', "777si", 100],
		['præfiks', "777p", 100],
		['Suffiks', "777s", 100],
		['7x7x7 kanter', "7edge", 8]
	]],
	['Ur', [
		['WCA', "clkwca", 0],
		['WCA (old)', "clkwcab", 0],
		['WCA w/o y2', "clknf", 0],
		['jaap', "clk", 0],
		['Optimal', "clko", 0],
		['kortfattet', "clkc", 0],
		['Effektiv pin rækkefølge', "clke", 0]
	]],
	['Megaminx', [
		["WCA", "mgmp", 70],
		['Gulerod', "mgmc", 70],
		['gammel stil', "mgmo", 70],
		['2-generator R,U', "minx2g", 30],
		['sidste plads + sidste lag', "mlsll", 0],
		['PLL', "mgmpll", 0],
		['Last Layer', "mgmll", 0]
	]],
	['Pyraminx', [
		["tilfældig tilstand (WCA)", "pyrso", 10],
		['Optimal', "pyro", 0],
		['tilfældig træk', "pyrm", 25],
		['L4E', "pyrl4e", 0],
		['4 tips', "pyr4c", 0],
		['No bar', "pyrnb", 0]
	]],
	['Skewb', [
		["tilfældig tilstand (WCA)", "skbso", 0],
		['Optimal', "skbo", 0],
		['tilfældig træk', "skb", 25],
		['No bar', "skbnb", 0]
	]],
	['Firkant-1', [
		["tilfældig tilstand (WCA)", "sqrs", 0],
		["CSP", "sqrcsp", 0],
		["PLL", "sq1pll", 0],
		['side rotér metrik', "sq1h", 40],
		['dreje metrik', "sq1t", 20]
	]],
	['===ANDRE===', [
		['--', "blank", 0]
	]],
	['15 puslespil', [
		['tilfældig tilstand URLD', "15prp", 0],
		['tilfældig tilstand ^<>v', "15prap", 0],
		['tilfældig tilstand Blank', "15prmp", 0],
		['tilfældig træk URLD', "15p", 80],
		['tilfældig træk ^<>v', "15pat", 80],
		['tilfældig træk Blank', "15pm", 80]
	]],
	['8 puzzle', [
		['tilfældig tilstand URLD', "8prp", 0],
		['tilfældig tilstand ^<>v', "8prap", 0],
		['tilfældig tilstand Blank', "8prmp", 0]
	]],
	['LxMxN', [
		['1x3x3 (Floppy Terning)', "133", 0],
		['2x2x3 (Tårn Terning)', "223", 0],
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
	['Tandhjul Terning', [
		['tilfældig tilstand', "gearso", 0],
		['Optimal', "gearo", 0],
		['tilfældig træk', "gear", 10]
	]],
	['Kilominx', [
		['tilfældig tilstand', "klmso", 0],
		['Pochmann', "klmp", 30]
	]],
	['Gigaminx', [
		['Pochmann', "giga", 300]
	]],
	['Crazy Puzzle', [
		['Crazy 3x3x3', "crz3a", 30]
	]],
	['Cmetrik', [
		['Cmetrik', "cm3", 25],
		['Mini Cmetrik', "cm2", 25]
	]],
	['Helikopter Terning', [
		['Heli copter', "heli", 40],
		['Curvy copter', "helicv", 40],
		['2x2 Heli random move', "heli2x2", 70],
		['2x2 Heli by group', "heli2x2g", 5]
	]],
	['Redi Cube', [
		['tilfældig tilstand', "rediso", 0],
		['MoYu', "redim", 8],
		['tilfældig træk', "redi", 20]
	]],
	['Dino Cube', [
		['tilfældig tilstand', "dinoso", 0],
		['Optimal', "dinoo", 0]
	]],
	['Ivy Terning', [
		['tilfældig tilstand', "ivyso", 0],
		['Optimal', "ivyo", 0],
		['tilfældig træk', "ivy", 10]
	]],
	['Master Pyraminx', [
		['tilfældig tilstand', "mpyrso", 0],
		['tilfældig træk', "mpyr", 42]
	]],
	['Pyraminx Krystal', [
		['Pochmann', "prcp", 70],
		['Gammel stil', "prco", 70]
	]],
	['Siamesisk Terning', [
		['1x1x3 blok', "sia113", 25],
		['1x2x3 blok', "sia123", 25],
		['2x2x2 blok', "sia222", 25]
	]],
	['Square', [
		['Firkant-2', "sq2", 20],
		['Super Firkant-1', "ssq1t", 20]
	]],
	['Super Floppy', [
		[' ', "sfl", 25]
	]],
	['UFO', [
		['Jaap stil', "ufo", 25]
	]],
	['FTO (Side Rotér Oktahedron)', [
		['tilfældig tilstand', "ftoso", 0],
		['tilfældig træk', "fto", 30],
		['L3T', "ftol3t", 0],
		['L3T+LBT', "ftol4t", 0],
		['TCP', "ftotcp", 0],
		['edges only', "ftoedge", 0],
		['centers only', "ftocent", 0],
		['corners only', "ftocorn", 0],
		['Diamond tilfældig tilstand', "dmdso", 0]
	]],
	['Icosahedron', [
		['Icosamate tilfældig træk', "ctico", 60]
	]],
	['===SPECIEL===', [
		['--', "blank", 0]
	]],
	['3x3x3 delmængde', [
		['2-generator R,U', "2gen", 0],
		['2-generator L,U', "2genl", 0],
		['Roux-generator M,U', "roux", 0],
		['3-generator F,R,U', "3gen_F", 0],
		['3-generator R,U,L', "3gen_L", 0],
		['3-generator R,r,U', "RrU", 0],
		['Domino Subgroup', "333drud", 0],
		['kun halv-rotationer', "half", 0],
		['sidste plads + sidste lag (gammel)', "lsll", 15]
	]],
	['Sammensmeltet terning', [
		['Bi-terning', "bic", 30],
		['Firkant-1 /,(1,0)', "bsq", 25]
	]],
	['Stafet', [
		['mange 3x3x3', "r3", 5],
		['234 stafet', "r234", 0],
		['2345 stafet', "r2345", 0],
		['23456 stafet', "r23456", 0],
		['234567 stafet', "r234567", 0],
		['234 stafet (WCA)', "r234w", 0],
		['2345 stafet (WCA)', "r2345w", 0],
		['23456 stafet (WCA)', "r23456w", 0],
		['234567 stafet (WCA)', "r234567w", 0],
		['Mini Guildford', "rmngf", 0]
	]],
	['===SJOV===', [
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
	['vend top siden', ' vend bund siden'],
	['vend højre side', 'vend venstre side'],
	['vend front siden', 'vend bagsiden']
];
var SCRAMBLE_NOOBSS = 'med uret af 90 grader,| mod uret af 90 grader,| af 180 degrees,';
var SCROPT_TITLE = 'Indstillinger for blanding';
var SCROPT_BTNALL = 'Komplet';
var SCROPT_BTNNONE = 'Nulstil';
var SCROPT_EMPTYALT = 'Vælg mindst en case';
var STATS_CFM_RESET = 'Nulstil alle tider i denne session??';
var STATS_CFM_DELSS = 'slet session [%s]?';
var STATS_CFM_DELMUL = 'Antallet af slettede værdier fra nuværende indeks?';
var STATS_CFM_DELETE = 'Slet denne tid?';
var STATS_COMMENT = 'Kommenter';
var STATS_REVIEW = 'Anmeldelse';
var STATS_DATE = 'Dato';
var STATS_SSSTAT = '1-løsningsstatistik';
var STATS_SSRETRY = 'Retry';
var STATS_CURROUND = 'Nuværrende runde statistikker';
var STATS_CURSESSION = 'Nuværende session statistikker';
var STATS_CURSPLIT = 'Fase %d af aktuelle sessionsstatistik';
var STATS_EXPORTCSV = 'Eksportér CSV';
var STATS_SSMGR_TITLE = 'Sessionsmanager';
var STATS_SSMGR_NAME = 'Navn';
var STATS_SSMGR_DETAIL = 'Sessionsdetaljer';
var STATS_SSMGR_OPS = 'Omdøb|Opret|Del|Saml|Slet|Sorter|Merge&Dedupe';
var STATS_SSMGR_ORDER = 'Sorter efter blanding';
var STATS_SSMGR_ODCFM = 'Sortér alle sessioner efter blanding?';
var STATS_SSMGR_SORTCFM = '%d løst(e) vil blive omsorteret , bekræft?';
var STATS_ALERTMG = 'Sammenflet alle tider i session [%f] til slutningen af session [%t]?';
var STATS_PROMPTSPL = 'Antal seneste tider opdelt fra session [%s]?';
var STATS_ALERTSPL = 'Bør opdele eller efterlade mindst 1 tid';
var STATS_AVG = 'Mean';
var STATS_SUM = 'sum';
var STATS_SOLVE = 'Løs';
var STATS_TIME = 'Tid';
var STATS_SESSION = 'Session';
var STATS_SESSION_NAME = 'Rediger sessionsnavn';
var STATS_SESSION_NAMEC = 'Navn på den nye session';
var STATS_STRING = 'bedste|nuværrende|værste|Genereret af csTimer på %Y-%M-%D|løsninger/total: %d|single|mean af %mk| gns af %mk|Gennemsnit: %v{ (s = %sgm)}|Mean: %v|Tid Liste:|solving from %s to %e|Totally spent: %d|target';
var STATS_PREC = 'tidsfordeling præcision';
var STATS_PREC_STR = 'auto|0.1s|0.2s|0.5s|1s|2s|5s|10s|20s|50s|100s';
var STATS_TYPELEN = 'liste %d type|liste %d længde|gennemsnit|mean';
var STATS_STATCLR = 'Aktivér tømning af session';
var STATS_ABSIDX = 'Vis absolut indeks i statistikrapport';
var STATS_XSESSION_DATE = 'alle datoer|seneste dag|seneste uge|seneste måned|seneste år';
var STATS_XSESSION_NAME = 'hvilket som helst navn';
var STATS_XSESSION_SCR = 'Tilfældig blanding';
var STATS_XSESSION_CALC = 'Beregn';
var STATS_RSFORSS = 'Vis statistik når du klikker på løsning';
var PROPERTY_PRINTSCR = 'print blanding(erne) i statistikker';
var PROPERTY_PRINTCOMM = 'print comment(s) in statistics';
var PROPERTY_PRINTDATE = 'Udskriv løsningsdato i statistik';
var PROPERTY_SUMMARY = 'vis sammendrag inden tidslisten';
var PROPERTY_IMRENAME = 'omdøb session umiddelbart efter oprettelsen';
var PROPERTY_SCR2SS = 'Opret ny session, når du skifter blandings type';
var PROPERTY_SS2SCR = 'Gendan blandingstype, når du skifter session';
var PROPERTY_SS2PHASES = 'gendan multi-fase-tidstagning ved skift af session';
var PROPERTY_STATINV = 'Omvendt tidsliste';
var PROPERTY_STATSSUM = 'Vis sum i tidslisten';
var PROPERTY_STATTHRES = 'Vis måltid for sessionen bedst';
var PROPERTY_STATBPA = 'Show best possible average (BPA)';
var PROPERTY_STATWPA = 'Show worst possible average (WPA)';
var PROPERTY_STATAL = 'Statistiske indikatorer';
var PROPERTY_STATALU = 'Tilpasset statistisk indikator';
var PROPERTY_HLPBS = 'Highlight PBs';
var PROPERTY_HLPBS_STR = 'Dark orange as WCA|As link color|Bolder|None';
var PROPERTY_DELMUL = 'Tillad flere sletninger';
var PROPERTY_TOOLSFUNC = 'Valgte funktioner';
var PROPERTY_TRIM = 'Antal af de bedste løsninger fjernet';
var PROPERTY_TRIMR = 'Antal af de værste løsninger fjernet';
var PROPERTY_TRIM_MED = 'Median';
var PROPERTY_STKHEAD = 'Brug Stackmat status information';
var PROPERTY_TOOLPOS = 'Værktøjspanel position';
var PROPERTY_TOOLPOS_STR = 'Bund|Flydende|Top';
var PROPERTY_HIDEFULLSOL = 'Vis løsning progressivt';
var PROPERTY_IMPPREV = 'Importer ikke-seneste data';
var PROPERTY_AUTOEXP = 'Auto Export (per 100 løsning)';
var PROPERTY_AUTOEXP_OPT = 'Aldrig|Til fil|Med csTimer ID|Med WCA konto|Med Google konto|Alert Only';
var PROPERTY_SCRASIZE = 'Automatisk blandingsstørrelse';
var MODULE_NAMES = {
	"kernel": 'global',
	"ui": 'skærm',
	"color": 'farve',
	"timer": 'stopur',
	"scramble": 'blanding',
	"stats": 'statistik',
	"tools": 'værktøj',
	"vrc": 'virtuel&<br>bluetooth'
};
var BGIMAGE_URL = 'Vør venlig og sæt billedets url';
var BGIMAGE_INVALID = 'ugyldig url';
var BGIMAGE_OPACITY = 'baggrunds billede gennemsigtigheds';
var BGIMAGE_IMAGE = 'baggrunds billede';
var BGIMAGE_IMAGE_STR = 'ingen|manual|CCT';
var SHOW_AVG_LABEL = 'Vis Gns Etiket';
var SHOW_DIFF_LABEL = 'Vis tidsforskel';
var SHOW_DIFF_LABEL_STR = '-Grøn+Rød|-Red+Grøn|Normal|Ingen';
var USE_LOGOHINT = 'Tip beskeder i logo';
var TOOLS_SCRGEN = 'BlandingsGenerator';
var SCRGEN_NSCR = 'Nummere af blandinger';
var SCRGEN_PRE = 'præfiks';
var SCRGEN_GEN = 'Frembringe Blandinger!';
var VRCREPLAY_TITLE = 'Virtuel Replay';
var VRCREPLAY_ORI = 'rå ori|auto ori';
var VRCREPLAY_SHARE = 'Del link';
var GIIKER_CONNECT = 'Klik for at oprette forbindelse';
var GIIKER_RESET = 'Nulstil (Markér Løst)';
var GIIKER_REQMACMSG = 'Please enter the MAC address of your smart hardware (xx:xx:xx:xx:xx:xx). You can find the MAC address through chrome://bluetooth-internals/#devices, or modify following options to let csTimer automatically obtain it:\nChrome: Turn on chrome://flags/#enable-experimental-web-platform-features\nBluefy: Turn on Enable BLE Advertisements';
var GIIKER_NOBLEMSG = 'Bluetooth API is not available. Ensure https access, check bluetooth is enabled on your device, and try chrome with chrome://flags/#enable-experimental-web-platform-features enabled';
var PROPERTY_SHOWAD = 'Vis reklamer (træder i kraft efter genindlæsning)';
var PROPERTY_GIIORI = 'Terningens orientering';
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
