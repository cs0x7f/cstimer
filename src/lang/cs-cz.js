var OK_LANG = 'Ok';
var CANCEL_LANG = 'Zrušit';
var RESET_LANG = 'Resetovat';
var ABOUT_LANG = 'O aplikaci';
var ZOOM_LANG = 'Přiblížení';
var COPY_LANG = 'Kopírovat';
var BUTTON_TIME_LIST = 'seznam časů';
var BUTTON_OPTIONS = 'Nastavení';
var BUTTON_EXPORT = 'EXPORTOVAT';
var BUTTON_DONATE = 'DAROVAT';
var PROPERTY_SR = 'S relací';
var PROPERTY_USEINS = 'použít WCA inspekci';
var PROPERTY_USEINS_STR = 'Vždy (dolů)|Vždy (nahoru)|Kromě BLD (dolů)|Kromě BLD (nahoru)|Nikdy';
var PROPERTY_SHOWINS = 'Zobrazit ikonu, když je povolena inspekce';
var PROPERTY_VOICEINS = 'hlasové upozornění při WCA inspekci';
var PROPERTY_VOICEINS_STR = 'žádný|mužský hlas|ženský hlas';
var PROPERTY_VOICEVOL = 'Hlasitost hlasu';
var PROPERTY_PHASES = 'multi-fáze';
var PROPERTY_TIMERSIZE = 'velikost timeru';
var PROPERTY_USEMILLI = 'použít milisekundy';
var PROPERTY_SMALLADP = 'použít malé písmo za desetinnou';
var PROPERTY_SCRSIZE = 'velikost scramblu';
var PROPERTY_SCRMONO = 'neproporcionální scramble';
var PROPERTY_SCRLIM = 'Omezit výšku v oblasti scramblu';
var PROPERTY_SCRALIGN = 'Zarovnání scramble oblasti';
var PROPERTY_SCRALIGN_STR = 'střed|vlevo|vpravo';
var PROPERTY_SCRWRAP = 'Scramble Wrap';
var PROPERTY_SCRWRAP_STR = 'Balanced|Normal';
var PROPERTY_SCRNEUT = 'Barevně neutrální';
var PROPERTY_SCRNEUT_STR = 'Žádné|Jedna strana|Dvojité strany|Šest stran';
var PROPERTY_SCREQPR = 'Probabilities for training-scramble states';
var PROPERTY_SCREQPR_STR = 'Actual|Equal|Random order';
var PROPERTY_SCRFAST = 'Použít rychlí scramble pro 4x4x4(neoficiální)';
var PROPERTY_SCRKEYM = 'Klíčovy krok pohybů v zamíchání';
var PROPERTY_SCRCLK = 'Akce při kliknutí na scramble';
var PROPERTY_SCRCLK_STR = 'Nic|Kopírovat|Další zamíchání';
var PROPERTY_WNDSCR = 'Styl zobrazení panelu s scramblem';
var PROPERTY_WNDSTAT = 'Styl zobrazení panelu Statistiky';
var PROPERTY_WNDTOOL = 'Styl zobrazení panelu nástrojů';
var PROPERTY_WND_STR = 'Normální|Plochý';
var EXPORT_DATAEXPORT = 'Import/Export dat';
var EXPORT_TOFILE = 'Exportovat do souboru';
var EXPORT_FROMFILE = 'Importovat ze souboru';
var EXPORT_TOSERV = 'Exportovat do serveru';
var EXPORT_FROMSERV = 'Importovat ze serveru';
var EXPORT_FROMOTHER = 'Importovat relace z jiných časovačů';
var EXPORT_USERID = 'Zadejte prosím váš účet (pouze abecedy nebo číslo)';
var EXPORT_INVID = 'Jenom abeceda nebo čísla jsou povolena!';
var EXPORT_ERROR = 'Došlo k chybám...';
var EXPORT_NODATA = 'Nenalezena žádná data pro tvůj účet';
var EXPORT_UPLOADED = 'Úspěšně nahráno';
var EXPORT_CODEPROMPT = 'Uložit tento kód, nebo napsat uložený kód pro import';
var EXPORT_ONLYOPT = 'jen Exportovací/Importovací Nastavení';
var EXPORT_ACCOUNT = 'Exportovat Účty';
var EXPORT_LOGINGGL = 'Přihlásit Pomocí Google Účtu';
var EXPORT_LOGINWCA = 'Přihlásit Pomocí WCA Účtu';
var EXPORT_LOGOUTCFM = 'Potvrdit odhlášení?';
var EXPORT_LOGINAUTHED = 'Autorizováno<br>Načítání Dat...';
var EXPORT_AEXPALERT = 'More than %d solves since last backup';
var EXPORT_WHICH = 'You have %d file(s), which one should be imported?';
var EXPORT_WHICH_ITEM = '%s solve(s), uploaded at %t';
var IMPORT_FINAL_CONFIRM = 'Toto přepíše všechna lokální data! Upraví %d relací, přidá alespoň %a odstraní %r řešení. Potvrdit import dat?';
var BUTTON_SCRAMBLE = 'Scramble';
var BUTTON_TOOLS = 'NÁSTROJE';
var IMAGE_UNAVAILABLE = 'Nedostupné pro tento typ scramblu';
var TOOLS_SELECTFUNC = 'Funkce';
var TOOLS_CROSS = 'složit kříž';
var TOOLS_EOLINE = 'složit EOLine';
var TOOLS_ROUX1 = 'složit Roux S1';
var TOOLS_222FACE = 'strana 2x2x2';
var TOOLS_GIIKER = 'Giiker kostka';
var TOOLS_IMAGE = 'nakreslit scramble';
var TOOLS_STATS = 'Statistiky';
var TOOLS_HUGESTATS = 'statistiky kříže';
var TOOLS_DISTRIBUTION = 'distribuce času';
var TOOLS_TREND = 'trend času';
var TOOLS_METRONOME = 'metronom';
var TOOLS_RECONS = 'Rekonstruovat';
var TOOLS_RECONS_NODATA = 'Nebylo nalezeno žádné řešení.';
var TOOLS_RECONS_TITLE = 'insp|exec|turn|tps';
var TOOLS_TRAINSTAT = 'Training Stat.';
var TOOLS_BLDHELPER = 'BLD Helper';
var TOOLS_CFMTIME = 'Potvrďte čas';
var TOOLS_SOLVERS = 'Solvery';
var TOOLS_DLYSTAT = 'Daily Statistics';
var TOOLS_DLYSTAT1 = 'Period|Start of Day|Week';
var TOOLS_DLYSTAT_OPT1 = 'day|week|month|year';
var TOOLS_DLYSTAT_OPT2 = 'Ne|Po|Út|St|Čt|Pá|So';
var TOOLS_SYNCSEED = 'Společné zamíchání';
var TOOLS_SYNCSEED_SEED = 'Seed';
var TOOLS_SYNCSEED_INPUT = 'Vstupní seed';
var TOOLS_SYNCSEED_30S = 'Použít 30s seed';
var TOOLS_SYNCSEED_HELP = 'Při zapnutí bude zamíchání závislé pouze na seedu a nastavení zamíchání.';
var TOOLS_SYNCSEED_DISABLE = 'Vypnout aktuální seed?';
var TOOLS_SYNCSEED_INPUTA = 'Vložte hodnotu (a-zA-Z0-9) jako seed';
var TOOLS_BATTLE = 'Online battle';
var TOOLS_BATTLE_HEAD = 'Room|Join Room';
var TOOLS_BATTLE_TITLE = 'Rank|Status|Time';
var TOOLS_BATTLE_STATUS = 'Ready|Inspect|Solving|Solved|Lost';
var TOOLS_BATTLE_INFO = 'Join a battle room with your friend, then you will battle together.';
var TOOLS_BATTLE_JOINALERT = 'Please input the room ID';
var TOOLS_BATTLE_LEAVEALERT = 'Leave current room';
var OLCOMP_UPDATELIST = 'Aktualizovat seznam soutěží';
var OLCOMP_VIEWRESULT = 'Zobrazit výsledek';
var OLCOMP_VIEWMYRESULT = 'Moje historie';
var OLCOMP_START = 'Začít!';
var OLCOMP_SUBMIT = 'Potvrdit!';
var OLCOMP_SUBMITAS = 'Potvrdit jako: ';
var OLCOMP_WCANOTICE = 'Potvrdit jako váš WCA účet? (Přihlašte se znovu pokud není účet po odeslání rozpoznán)';
var OLCOMP_OLCOMP = 'Online soutěž';
var OLCOMP_ANONYM = 'Anonym';
var OLCOMP_ME = 'Já';
var OLCOMP_WCAACCOUNT = 'Účet WCA';
var OLCOMP_ABORT = 'Zrušit soutěž a ukázat výsledky?';
var OLCOMP_WITHANONYM = 'S Anonymem';
var PROPERTY_IMGSIZE = 'Velikost zamíchaného obrázku';
var PROPERTY_IMGREP = 'Show virtual cube animation when clicking scramble image';
var TIMER_INSPECT = 'zkontrolovat';
var TIMER_SOLVE = 'vyřešit';
var PROPERTY_USEMOUSE = 'použít časovač pomocí myši';
var PROPERTY_TIMEU = 'aktualizace timeru je';
var PROPERTY_TIMEU_STR = 'aktualizovat|0.1s|sekund|inspekce|nic';
var PROPERTY_PRETIME = 'čas držení mezery dole(sekund)';
var PROPERTY_ENTERING = 'vstup v dobách s';
var PROPERTY_ENTERING_STR = 'timer|psaní|Stackmat|MoYu timer |virtuální kosta|Bluetooth Cube|qCube|Bluetooth Timer|last layer training';
var PROPERTY_INTUNIT = 'Jednotka při zadávání celého čísla';
var PROPERTY_INTUNIT_STR = 'sekunda|setina|tisícina';
var PROPERTY_COLOR = 'vybrat schéma barev';
var PROPERTY_COLORS = 'barva písma|barva pozadí|barva desky|barva tlačítka|odkaz barva|barva Loga|barva pozadí Loga';
var PROPERTY_VIEW = 'styl uživatelského rozhraní je';
var PROPERTY_VIEW_STR = 'Automaticky|Mobil|Obrazovka';
var PROPERTY_UIDESIGN = 'UI design je';
var PROPERTY_UIDESIGN_STR = 'Normální|Materiální design|Normální w/o stíny|Materiální design w/o stíny';
var COLOR_EXPORT = 'Prosím uložte soubor pro importování';
var COLOR_IMPORT = 'Prosím vložte exportovaný soubor';
var COLOR_FAIL = 'Špatná Data, Import Se Nepovedl';
var PROPERTY_FONTCOLOR_STR = 'černá|bíla';
var PROPERTY_COLOR_STR = 'ručně|importovat/exportovat...|náhodně|styl1|styl2|styl3|černá|bílá|styl6|slunečně tmavé|slunečně světlé';
var PROPERTY_FONT = 'vyberte písmo časovače';
var PROPERTY_FONT_STR = 'náhodně digitální|normální|digitální1|digitánlí2|digitální3|digitální4|digitální5';
var PROPERTY_FORMAT = 'formát času';
var PROPERTY_USEKSC = 'použít klávesové zkratky';
var PROPERTY_USEGES = 'use gesture control';
var PROPERTY_NTOOLS = 'počet nástrojů';
var PROPERTY_AHIDE = 'Skrýt všechny prvky při časování';
var SCRAMBLE_LAST = 'poslední';
var SCRAMBLE_NEXT = 'další';
var SCRAMBLE_SCRAMBLE = ' scramble';
var SCRAMBLE_SCRAMBLING = 'Scrambling';
var SCRAMBLE_LENGTH = 'délka';
var SCRAMBLE_INPUT = 'vstupní zamíchání';
var SCRAMBLE_INPUTTYPE = 'Scramble type';
var PROPERTY_VRCSPEED = 'VRS základní rychlost (tps)';
var PROPERTY_VRCORI = 'Virtual cube orientation';
var PROPERTY_VRCMP = 'vícefázové';
var PROPERTY_VRCMPS = 'Nic|CFOP|CF+OP|CFFFFOP|CFFFFOOPP|Roux';
var PROPERTY_GIIKERVRC = 'Zobrazit virtuální Giiker kostku';
var PROPERTY_GIISOK_DELAY = 'Označit zamíchání pokud stojí';
var PROPERTY_GIISOK_DELAYS = '2s|3s|4s|5s|Nikdy|Správně zamícháno';
var PROPERTY_GIISOK_KEY = 'Označit zamíchaní s mezerou';
var PROPERTY_GIISOK_MOVE = 'Oznacit zamíchání s děláním';
var PROPERTY_GIISOK_MOVES = 'U4, R4, atd...|(U U\')2, (U\' U)2, atd...|Nikdy';
var PROPERTY_GIISBEEP = 'Pípnout když je zamícháno';
var PROPERTY_GIIRST = 'Restartovat Giiker kostku při připojení';
var PROPERTY_GIIRSTS = 'Vždy|rychle|nikdy';
var PROPERTY_GIIMODE = 'Bluetooth Cube Mode';
var PROPERTY_GIIMODES = 'Normal|Training|Continuous training';
var PROPERTY_VRCAH = 'Useless pieces in huge cube';
var PROPERTY_VRCAHS = 'Hide|Border|Color|Show';
var CONFIRM_GIIRST = 'Resetovat Giiker kostku jako zamíchanou?';
var PROPERTY_GIIAED = 'Automatická detekce hardwarové chyby';
var scrdata = [
	['WCA', [
		['3x3x3', "333", 0],
		['2x2x2', "222so", 0],
		['4x4x4', "444wca", -40],
		['5x5x5', "555wca", -60],
		['6x6x6', "666wca", -80],
		['7x7x7', "777wca", -100],
		['3x3 bld', "333ni", 0],
		['3x3 fm', "333fm", 0],
		['3x3 oh', "333oh", 0],
		['clock', "clkwca", 0],
		['megaminx', "mgmp", -70],
		['pyraminx', "pyrso", -10],
		['skewb', "skbso", 0],
		['square-1', "sqrs", 0],
		['4x4 bld', "444bld", -40],
		['5x5 bld', "555bld", -60],
		['3x3 mbld', "r3ni", 5]
	]],
	['Vstup', [
		['Extern', "input", 0],
		['Soutěž', "remoteComp", 0],
		['Online battle', "remoteBattle", 0],
		['Remote', "remoteOther", 0]
	]],
	['===WCA===', [
		['--', "blank", 0]
	]],
	['3x3x3', [
		["náhodný stav (WCA)", "333", 0],
		['náhodný tah', "333o", 25],
		['3x3x3 pro nooby', "333noob", 25],
		['pouze hrany', "edges", 0],
		['pouze rohy', "corners", 0],
		['BLD Helper', "nocache_333bldspec", 0],
		['Pattern Tool', "nocache_333patspec", 0],
		['3x3 ft', "333ft", 0],
		['Custom', "333custom", 0]
	]],
	['3x3x3 CFOP', [
		['PLL', "pll", 0],
		['OLL', "oll", 0],
		['poslední slot + poslední vrstva', "lsll2", 0],
		['poslední vrstva', "ll", 0],
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
		['kříž složený', "f2l", 0],
		['EOLine', "eoline", 0],
		['EO Cross', "eocross", 0],
		['jednoduchý kříž', "easyc", 3],
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
		["náhodný stav (WCA)", "222so", 0],
		['optimální', "222o", 0],
		['3-gen', "2223", 25],
		['EG', "222eg", 0],
		['CLL', "222eg0", 0],
		['EG1', "222eg1", 0],
		['EG2', "222eg2", 0],
		['TCLL+', "222tcp", 0],
		['TCLL-', "222tcn", 0],
		['TCLL', "222tc", 0],
		['LS', "222lsall", 0],
		['Žádný blok', "222nb", 0]
	]],
	['4x4x4', [
		["WCA", "444wca", -40],
		['náhodný pohyb', "444m", 40],
		['SiGN', "444", 40],
		['YJ', "444yj", 40],
		['4x4x4 hrany', "4edge", 0],
		['R, r, U, u', "RrUu", 40],
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
		['5x5x5 hrany', "5edge", 8]
	]],
	['6x6x6', [
		["WCA", "666wca", 80],
		['SiGN', "666si", 80],
		['prefix', "666p", 80],
		['přípona', "666s", 80],
		['6x6x6 strany', "6edge", 8]
	]],
	['7x7x7', [
		["WCA", "777wca", 100],
		['SiGN', "777si", 100],
		['předpona', "777p", 100],
		['přípona', "777s", 100],
		['7x7x7 hrany', "7edge", 8]
	]],
	['Hodiny', [
		['WCA', "clkwca", 0],
		['wca (old)', "clkwcab", 0],
		['WCA w/o y2', "clknf", 0],
		['věci', "clk", 0],
		['optimální', "clko", 0],
		['stručně', "clkc", 0],
		['efektivní pin řád', "clke", 0]
	]],
	['Megaminx', [
		["WCA", "mgmp", 70],
		['Mrkev', "mgmc", 70],
		['starý styl', "mgmo", 70],
		['2-generátor R,U', "minx2g", 30],
		['poslední slot + poslední vrstva', "mlsll", 0],
		['PLL', "mgmpll", 0],
		['Last Layer', "mgmll", 0]
	]],
	['Pyraminx', [
		["náhodný stav (WCA)", "pyrso", 10],
		['optimální', "pyro", 0],
		['náhodný tah', "pyrm", 25],
		['L4E', "pyrl4e", 0],
		['4 tips', "pyr4c", 0],
		['No bar', "pyrnb", 0]
	]],
	['Skewb', [
		["náhodný stav (WCA)", "skbso", 0],
		['optimální', "skbo", 0],
		['náhodný tah', "skb", 25],
		['No bar', "skbnb", 0]
	]],
	['Square-1', [
		["náhodný stav (WCA)", "sqrs", 0],
		["CSP", "sqrcsp", 0],
		["PLL", "sq1pll", 0],
		['přední metrické otočení', "sq1h", 40],
		['metrický twist', "sq1t", 20]
	]],
	['=== OSTATNÍ ===', [
		['--', "blank", 0]
	]],
	['15 puzzle', [
		['náhodný stav URLD', "15prp", 0],
		['náhodný stav ^<>v', "15prap", 0],
		['náhodný stav Blank', "15prmp", 0],
		['náhodný tah URLD', "15p", 80],
		['náhodný tah ^<>v', "15pat", 80],
		['náhodný tah Blank', "15pm", 80]
	]],
	['8 puzzle', [
		['náhodný stav URLD', "8prp", 0],
		['náhodný stav ^<>v', "8prap", 0],
		['náhodný stav Blank', "8prmp", 0]
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
		['náhodný stav', "gearso", 0],
		['optimální', "gearo", 0],
		['náhodný tah', "gear", 10]
	]],
	['Kilominx', [
		['náhodný stav', "klmso", 0],
		['Pochmann', "klmp", 30]
	]],
	['Gigaminx', [
		['Pochmann', "giga", 300]
	]],
	['Crazy Puzzle', [
		['Crazy 3x3x3', "crz3a", 30]
	]],
	['Cmetrick', [
		['Cmetrick', "cm3", 25],
		['Malý Cmetrick', "cm2", 25]
	]],
	['Helicopter Cube', [
		['Heli copter', "heli", 40],
		['Curvy copter', "helicv", 40],
		['2x2 Heli random move', "heli2x2", 70],
		['2x2 Heli by group', "heli2x2g", 5]
	]],
	['Redi Cube', [
		['náhodný stav', "rediso", 0],
		['MoYu', "redim", 8],
		['náhodný tah', "redi", 20]
	]],
	['Dino Cube', [
		['náhodný stav', "dinoso", 0],
		['optimální', "dinoo", 0]
	]],
	['Ivy cube', [
		['náhodný stav', "ivyso", 0],
		['optimální', "ivyo", 0],
		['náhodný tah', "ivy", 10]
	]],
	['Master Pyraminx', [
		['náhodný stav', "mpyrso", 0],
		['náhodný tah', "mpyr", 42]
	]],
	['Pyraminx krystal', [
		['Pochmann', "prcp", 70],
		['starý styl', "prco", 70]
	]],
	['Siamská kostka', [
		['1x1x3 blok', "sia113", 25],
		['1x2x3 blok', "sia123", 25],
		['2x2x2 blok', "sia222", 25]
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
	['PSO (Přední Soutěžní Osmistěn)', [
		['náhodný stav', "ftoso", 0],
		['náhodný tah', "fto", 30],
		['L3T', "ftol3t", 0],
		['L3T+LBT', "ftol4t", 0],
		['TCP', "ftotcp", 0],
		['edges only', "ftoedge", 0],
		['centers only', "ftocent", 0],
		['corners only', "ftocorn", 0],
		['Diamond náhodný stav', "dmdso", 0]
	]],
	['Icosahedron', [
		['Icosamate náhodný tah', "ctico", 60]
	]],
	['==SPECIÁLNÍ==', [
		['--', "blank", 0]
	]],
	['3 x 3 x 3 podskupiny', [
		['2-generátor R,U', "2gen", 0],
		['2-generátor L.U', "2genl", 0],
		['Roux-generátor M,U', "roux", 0],
		['3-generátor F,R,U', "3gen_F", 0],
		['3-generátor R,U,L', "3gen_L", 0],
		['3-generátor R,r,U', "RrU", 0],
		['Domino Subgroup', "333drud", 0],
		['jen polovina otáčení', "half", 0],
		['poslední slot + poslední vrstva (starý)', "lsll", 15]
	]],
	['Bangaged Kostka', [
		['Bicube', "bic", 30],
		['Čtverec-1 /,(1,0)', "bsq", 25]
	]],
	['Relace', [
		['spousta 3x3x3', "r3", 5],
		['234 relace', "r234", 0],
		['2345 relace', "r2345", 0],
		['23456 relace', "r23456", 0],
		['234567 relace', "r234567", 0],
		['234 relace (WCA)', "r234w", 0],
		['2345 relace (WCA)', "r2345w", 0],
		['23456 relace (WCA)', "r23456w", 0],
		['234567 relace (WCA)', "r234567w", 0],
		['Mini Guildford', "rmngf", 0]
	]],
	['==VTIPY==', [
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
	['otočit vrchní stranu', 'otočit spodní stranu'],
	['otočit pravou stranu', 'otočit levou stranu'],
	['otočit přední stranu', 'otočit zadní stranu']
];
var SCRAMBLE_NOOBSS = ' po směru hodin po 90 stupních,| proti směru hodin po 90 stupních,| po 180 supních,';
var SCROPT_TITLE = 'Scramble Options';
var SCROPT_BTNALL = 'Full';
var SCROPT_BTNNONE = 'Vyčistit';
var SCROPT_EMPTYALT = 'Vyberte prosím alespoň jeden případ';
var STATS_CFM_RESET = 'resetovat všechny časy v této relaci?';
var STATS_CFM_DELSS = 'smazat relaci [%s]?';
var STATS_CFM_DELMUL = 'Číslo Smazaných Hodnot Z Aktuálního Indexu?';
var STATS_CFM_DELETE = 'smazat tento čas?';
var STATS_COMMENT = 'Okomentovat';
var STATS_REVIEW = 'Zkontrolovat';
var STATS_DATE = 'Datum';
var STATS_SSSTAT = 'statistika jednoho řešení';
var STATS_SSRETRY = 'Znovu';
var STATS_CURROUND = 'Statistiky Aktuálního Kola';
var STATS_CURSESSION = 'Statistiky Aktuální relace';
var STATS_CURSPLIT = 'Fáze %d Aktuální Statistiky Relace';
var STATS_EXPORTCSV = 'Exportovat CSV';
var STATS_SSMGR_TITLE = 'Správce Relací';
var STATS_SSMGR_NAME = 'Jméno';
var STATS_SSMGR_DETAIL = 'Detaily Relace';
var STATS_SSMGR_OPS = 'Přejmenovat|Vytvořit|Spojit|Rozpojit|Smazat|Seřadit|Merge&Dedupe';
var STATS_SSMGR_ORDER = 'Seřadit podle zamíchání';
var STATS_SSMGR_ODCFM = 'Řadit všechni relace jako zamíchání?';
var STATS_SSMGR_SORTCFM = '%d řešení bude přeuspořádáno, potvrdit?';
var STATS_ALERTMG = 'Spojit všechny časy v relaci [%f] do konce relace[%t]?';
var STATS_PROMPTSPL = 'Spojit počet posledních časů z relace[%s]?';
var STATS_ALERTSPL = 'Mělo by se rozdělit nebo nechat alespoň 1';
var STATS_AVG = 'průměr';
var STATS_SUM = 'sum';
var STATS_SOLVE = 'vyřešit';
var STATS_TIME = 'čas';
var STATS_SESSION = 'Session';
var STATS_SESSION_NAME = 'Upravit jméno relace';
var STATS_SESSION_NAMEC = 'Jméno nové relace';
var STATS_STRING = 'nejlepší|aktuální|nejhorší|Generováno Časovačem na %D-%M-%Y|složení/celkem: %d|samotný|průměr %mk|průměrný z %mk|Průměrný: %v{(σ = %sgm)}|Pruměrný: %v|Časový List:|řešení %s do %e|Celkem utraceno: %d|target';
var STATS_PREC = 'precize distribuce času';
var STATS_PREC_STR = 'automaticky|0.1s|0.2s|0.5s|1s|2s|5s|10s|20s|50s|100s';
var STATS_TYPELEN = 'list %d typ|list %d délka|průměrný|průměr';
var STATS_STATCLR = 'Povolit vyprázdňování relace';
var STATS_ABSIDX = 'Zomrazit abolutní index ve zprávě o statistice';
var STATS_XSESSION_DATE = 'jakékoliv datum|minulých 24 hodin|minulých 7 dnů|minulých 30 dnů|minulých 365 dnů';
var STATS_XSESSION_NAME = 'jakkékoliv jméno';
var STATS_XSESSION_SCR = 'jakékoliv zamíchání';
var STATS_XSESSION_CALC = 'Calc';
var STATS_RSFORSS = 'Zobrazit statistiku při kliknutí na číslo solvu';
var PROPERTY_PRINTSCR = 'zobrazit zamíchání ve statistikách';
var PROPERTY_PRINTCOMM = 'print comment(s) in statistics';
var PROPERTY_PRINTDATE = 'zobrazit datum složení ve statistikách';
var PROPERTY_SUMMARY = 'zobrazit shrnutí před časovím listem';
var PROPERTY_IMRENAME = 'přejmenovat relaci ihned po vytvoření';
var PROPERTY_SCR2SS = 'vytvořit novou relaci při změně typu zamíchání';
var PROPERTY_SS2SCR = 'obnovit typ zamíchání při změně relace';
var PROPERTY_SS2PHASES = 'obnovit vícefázové časování při relaci';
var PROPERTY_STATINV = 'Obrátit časový list';
var PROPERTY_STATSSUM = 'Show sum in time list';
var PROPERTY_STATTHRES = 'Show target time for session best';
var PROPERTY_STATBPA = 'Show best possible average (BPA)';
var PROPERTY_STATWPA = 'Show worst possible average (WPA)';
var PROPERTY_STATAL = 'Statistické indikátory';
var PROPERTY_STATALU = 'Přispůsobený statický indikátor';
var PROPERTY_HLPBS = 'Highlight PBs';
var PROPERTY_HLPBS_STR = 'Dark orange as WCA|As link color|Bolder|None';
var PROPERTY_DELMUL = 'Povolit Více Odstranění';
var PROPERTY_TOOLSFUNC = 'Vybraná Funkce';
var PROPERTY_TRIM = 'Počet nejhorších/nejlepších nepočítaných solvů';
var PROPERTY_TRIMR = 'Počet složení použitích na nejhorší straně';
var PROPERTY_TRIM_MED = 'Medián';
var PROPERTY_STKHEAD = 'Použít Informace O Stavu Stackmatu';
var PROPERTY_TOOLPOS = 'Tools panel position';
var PROPERTY_TOOLPOS_STR = 'Bottom|Float|Top';
var PROPERTY_HIDEFULLSOL = 'Ukázat řešení postupně';
var PROPERTY_IMPPREV = 'Importovat ne-poslední data';
var PROPERTY_AUTOEXP = 'Automatický export dat (po 100 solvech)';
var PROPERTY_AUTOEXP_OPT = 'Nikdy|Do souboru|s csTimer ID|S účtem WCA|S účtem Google|Alert Only';
var PROPERTY_SCRASIZE = 'Automatická velikost scramblu';
var MODULE_NAMES = {
	"kernel": 'globální',
	"ui": 'displej',
	"color": 'barva',
	"timer": 'časovač',
	"scramble": 'zamíchání',
	"stats": 'statistiky',
	"tools": 'nástroje',
	"vrc": 'virtuální&<br>Giiker'
};
var BGIMAGE_URL = 'prosím vložte url obrázku';
var BGIMAGE_INVALID = 'neplatná adresa url';
var BGIMAGE_OPACITY = 'průhlednost pozadí obrázku';
var BGIMAGE_IMAGE = 'pozadí obrázku';
var BGIMAGE_IMAGE_STR = 'žádný|manuální|CCT';
var SHOW_AVG_LABEL = 'Zobrazit Průměrný Popisek';
var SHOW_DIFF_LABEL = 'Show Difference Label';
var SHOW_DIFF_LABEL_STR = '-Zelená+Červená|-Červená+Zelená|Normální|Žádný';
var USE_LOGOHINT = 'Upozornění v logu';
var TOOLS_SCRGEN = 'Generátor Zamíchání';
var SCRGEN_NSCR = 'Počet zamíchání';
var SCRGEN_PRE = 'předpona';
var SCRGEN_GEN = 'Generovat Zamíchání!';
var VRCREPLAY_TITLE = 'Virtual Replay';
var VRCREPLAY_ORI = 'raw ori|auto ori';
var VRCREPLAY_SHARE = 'share link';
var GIIKER_CONNECT = 'Click to connect';
var GIIKER_RESET = 'Reset (Mark Solved)';
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
