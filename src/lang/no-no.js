var OK_LANG = 'OK';
var CANCEL_LANG = 'Avbryt';
var RESET_LANG = 'Restart';
var ABOUT_LANG = 'Om';
var ZOOM_LANG = 'Zoom';
var COPY_LANG = 'Copy';
var BUTTON_TIME_LIST = 'Vis<br>Tider';
var BUTTON_OPTIONS = 'Innstillinger';
var BUTTON_EXPORT = 'Last Opp';
var BUTTON_DONATE = 'Doner';
var PROPERTY_SR = 'Med økt';
var PROPERTY_USEINS = 'bruk WCA inspeksjon';
var PROPERTY_USEINS_STR = 'Always (down)|Always (up)|Except BLD (down)|Except BLD (up)|Never';
var PROPERTY_SHOWINS = 'Show an icon when inspection is enabled';
var PROPERTY_VOICEINS = 'stemmealarm på WCA inspeksjonstid';
var PROPERTY_VOICEINS_STR = 'ingen|mannestemme|kvinnestemme';
var PROPERTY_VOICEVOL = 'Talevolum';
var PROPERTY_PHASES = 'fler-faset';
var PROPERTY_TIMERSIZE = 'timer størrelse';
var PROPERTY_USEMILLI = 'bruk millisekunder';
var PROPERTY_SMALLADP = 'bruk liten font etter desimalplass';
var PROPERTY_SCRSIZE = 'blandings størrelse';
var PROPERTY_SCRMONO = 'monospasert blanding (skriftype med lik bredde.)';
var PROPERTY_SCRLIM = 'Begrens høyden av blandingsområde';
var PROPERTY_SCRALIGN = 'Juster blandingsområde';
var PROPERTY_SCRALIGN_STR = 'sentrum|lvenstre|høyre';
var PROPERTY_SCRWRAP = 'Scramble Wrap';
var PROPERTY_SCRWRAP_STR = 'Balanced|Normal';
var PROPERTY_SCRNEUT = 'Color neutral';
var PROPERTY_SCRNEUT_STR = 'None|Single face|Double faces|Six faces';
var PROPERTY_SCREQPR = 'Probabilities for training-scramble states';
var PROPERTY_SCREQPR_STR = 'Actual|Equal|Random order';
var PROPERTY_SCRFAST = 'Bruker rask blanding til 4x4x4 (uoffisielt)';
var PROPERTY_SCRKEYM = 'Merk viktige trekk i blanding';
var PROPERTY_SCRCLK = 'Handling ved klikk av blanding';
var PROPERTY_SCRCLK_STR = 'Ingen|kopiering|Neste blanding';
var PROPERTY_WNDSCR = 'Blanding panel stil';
var PROPERTY_WNDSTAT = 'Visningsstil for statistikk';
var PROPERTY_WNDTOOL = 'Verktøy panel stil';
var PROPERTY_WND_STR = 'Normal|Flat';
var EXPORT_DATAEXPORT = 'Data Import/Eksport';
var EXPORT_TOFILE = 'Eksporter til fil';
var EXPORT_FROMFILE = 'Importer fra fil';
var EXPORT_TOSERV = 'Eksporter til server';
var EXPORT_FROMSERV = 'Importer fra server';
var EXPORT_FROMOTHER = 'Importer økter(er) fra andre tidtakere';
var EXPORT_USERID = 'Vennligst skriv inn kontoen din (bare bokstaver eller nummer)';
var EXPORT_INVID = 'Bare bokstaver og tall tillat!';
var EXPORT_ERROR = 'Feil oppstod...';
var EXPORT_NODATA = 'Ingen data funnet for din konto';
var EXPORT_UPLOADED = 'Opplasting fullført';
var EXPORT_CODEPROMPT = 'Lagre denne koden, eller skriv lagret kode for å importere';
var EXPORT_ONLYOPT = 'eksport/ import bare alternativer';
var EXPORT_ACCOUNT = 'Eksporter kontoer';
var EXPORT_LOGINGGL = 'Logg inn med Google-konto';
var EXPORT_LOGINWCA = 'Logg inn med WCA-konto';
var EXPORT_LOGOUTCFM = 'Bekreft utlogging?';
var EXPORT_LOGINAUTHED = 'Godkjent<br>Henter data...';
var EXPORT_AEXPALERT = 'More than %d solves since last backup';
var EXPORT_WHICH = 'You have %d file(s), which one should be imported?';
var EXPORT_WHICH_ITEM = '%s solve(s), uploaded at %t';
var IMPORT_FINAL_CONFIRM = 'Dette vil overskrive alle lokale data! Det vil endre %d økter, legge til %a og fjerne %r løst minst. Bekreft import av data?';
var BUTTON_SCRAMBLE = 'BLAN -<br>DING';
var BUTTON_TOOLS = 'VERKTØY';
var IMAGE_UNAVAILABLE = 'Utilgjengelig med denne bandingstypen';
var TOOLS_SELECTFUNC = 'Funksjon';
var TOOLS_CROSS = 'kryss';
var TOOLS_EOLINE = 'EOlinje';
var TOOLS_ROUX1 = 'Roux S1';
var TOOLS_222FACE = '2x2x2 side';
var TOOLS_GIIKER = 'Smart kube';
var TOOLS_IMAGE = 'Tegn blanding';
var TOOLS_STATS = 'Statistikk';
var TOOLS_HUGESTATS = 'kryss-seksjon statistikker';
var TOOLS_DISTRIBUTION = 'tidsfordeling';
var TOOLS_TREND = 'Tids-trend';
var TOOLS_METRONOME = 'metronom';
var TOOLS_RECONS = 'Reconstruct';
var TOOLS_RECONS_NODATA = 'No solution found.';
var TOOLS_RECONS_TITLE = 'insp|exec|turn|tps';
var TOOLS_TRAINSTAT = 'Training Stat.';
var TOOLS_BLDHELPER = 'BLD Helper';
var TOOLS_CFMTIME = 'Bekreft tid';
var TOOLS_SOLVERS = 'Løsere';
var TOOLS_DLYSTAT = 'Daily Statistics';
var TOOLS_DLYSTAT1 = 'Period|Start of Day|Week';
var TOOLS_DLYSTAT_OPT1 = 'day|week|month|year';
var TOOLS_DLYSTAT_OPT2 = 'Sun|Mon|Tue|Wed|Thu|Fri|Sat';
var TOOLS_SYNCSEED = 'Vanlig blanding';
var TOOLS_SYNCSEED_SEED = 'Hovednøkkel';
var TOOLS_SYNCSEED_INPUT = 'putt inn løsningsnøkkel';
var TOOLS_SYNCSEED_30S = 'Bruk 30s løsningsnøkkel';
var TOOLS_SYNCSEED_HELP = 'Hvis aktivert vil blanding bare avhenge av hovednøkkelen og blandings-innstillinger.';
var TOOLS_SYNCSEED_DISABLE = 'Deaktiver nåværende hovednøkkel?';
var TOOLS_SYNCSEED_INPUTA = 'Putt ';
var TOOLS_BATTLE = 'Online battle';
var TOOLS_BATTLE_HEAD = 'Room|Join Room';
var TOOLS_BATTLE_TITLE = 'Rank|Status|Time';
var TOOLS_BATTLE_STATUS = 'Ready|Inspect|Solving|Solved|Lost';
var TOOLS_BATTLE_INFO = 'Join a battle room with your friend, then you will battle together.';
var TOOLS_BATTLE_JOINALERT = 'Please input the room ID';
var TOOLS_BATTLE_LEAVEALERT = 'Leave current room';
var OLCOMP_UPDATELIST = 'Oppdater konkurranselisten';
var OLCOMP_VIEWRESULT = 'Se resultater';
var OLCOMP_VIEWMYRESULT = 'Min historikk';
var OLCOMP_START = 'Start!';
var OLCOMP_SUBMIT = 'Send inn!';
var OLCOMP_SUBMITAS = 'Send inn som:';
var OLCOMP_WCANOTICE = 'Sende inn som din WCA-Konto? (Logg inn på nytt dersom den ikke gjenkjennes etter sending)';
var OLCOMP_OLCOMP = 'Konkurranse på nett';
var OLCOMP_ANONYM = 'Anonym';
var OLCOMP_ME = 'Meg';
var OLCOMP_WCAACCOUNT = 'WCA Konto';
var OLCOMP_ABORT = 'Avbryte konkurranse og vis resultater?';
var OLCOMP_WITHANONYM = 'Anonym';
var PROPERTY_IMGSIZE = 'Blandings størrelse';
var PROPERTY_IMGREP = 'Show virtual cube animation when clicking scramble image';
var TIMER_INSPECT = 'inspeksjon';
var TIMER_SOLVE = 'løs';
var PROPERTY_USEMOUSE = 'Bruk mus som tidtaker';
var PROPERTY_TIMEU = 'Timer oppdatering er';
var PROPERTY_TIMEU_STR = 'oppdater|0.1s|sekunder|inspeksjon|ingen';
var PROPERTY_PRETIME = 'tid å holde mellomromstasten nede(sekund(er))';
var PROPERTY_ENTERING = 'Skriv inn tider med';
var PROPERTY_ENTERING_STR = 'Tidtaker|Skrive|Stackmat|MoYuTidtaker|virtuell|Bluetooth Cube|qCube|Bluetooth Timer|last layer training';
var PROPERTY_INTUNIT = 'Enhet når du går inn i et heltall';
var PROPERTY_INTUNIT_STR = 'Sekund|deltidsekund|millisikund';
var PROPERTY_COLOR = 'velg fargetema';
var PROPERTY_COLORS = 'font farge|bakgrunnsfarge|brettfarge|knappfarge|lenkefarge|Logofarge|Logo bgfarge';
var PROPERTY_VIEW = 'UI stil er';
var PROPERTY_VIEW_STR = 'Automatisk|Telefon|Skrivebord';
var PROPERTY_UIDESIGN = 'UI design er';
var PROPERTY_UIDESIGN_STR = 'normal|Material utseende|Normal w/o skygge|Material utseende w/o skygge';
var COLOR_EXPORT = 'Lagre strengen for import';
var COLOR_IMPORT = 'Vennligst skriv inn strengen som er eksportert';
var COLOR_FAIL = 'Feil Data, Import feilet';
var PROPERTY_FONTCOLOR_STR = 'svart|hvit';
var PROPERTY_COLOR_STR = 'Manuell|importer/eksporter|tilfeldig|stil1|stil2|stil3|svart|hvit|stil6|solskinnet mørk|solskinnet lys';
var PROPERTY_FONT = 'velg skrifttype på tidtaker';
var PROPERTY_FONT_STR = 'tilfeldig digital|normal|digital1|digital2|digital3|digital4|digital5';
var PROPERTY_FORMAT = 'Tidsformat';
var PROPERTY_USEKSC = 'bruk snarvei på tastatur';
var PROPERTY_USEGES = 'use gesture control';
var PROPERTY_NTOOLS = 'antall verktøy';
var PROPERTY_AHIDE = 'Skjul alle elementer under kubeløsing';
var SCRAMBLE_LAST = 'siste';
var SCRAMBLE_NEXT = 'neste';
var SCRAMBLE_SCRAMBLE = 'blanding';
var SCRAMBLE_SCRAMBLING = 'Scrambling';
var SCRAMBLE_LENGTH = 'lengde';
var SCRAMBLE_INPUT = 'Skriv inn Blanding(er)';
var SCRAMBLE_INPUTTYPE = 'Scramble type';
var PROPERTY_VRCSPEED = 'VRC gjennomsnittshastighet (tps)';
var PROPERTY_VRCORI = 'Virtual cube orientation';
var PROPERTY_VRCMP = 'fler-faset';
var PROPERTY_VRCMPS = 'Ingen|CFOP|CF+OP|CFFFFOP|CFFFFOOPP|Roux';
var PROPERTY_GIIKERVRC = 'Vis virtuell smartkube';
var PROPERTY_GIISOK_DELAY = 'marker blandet hvis du holder deg';
var PROPERTY_GIISOK_DELAYS = '2s|3s|4s|5s|Aldri|korrekt blandet';
var PROPERTY_GIISOK_KEY = 'Marker blandet med mellomromstast';
var PROPERTY_GIISOK_MOVE = 'Marker blandet ved å gjøre';
var PROPERTY_GIISOK_MOVES = 'U4, R4, osv|(U U\')2, (U\' U)2 osv|Aldri';
var PROPERTY_GIISBEEP = 'pip når blandingen markeres';
var PROPERTY_GIIRST = 'Reset smartkube når tilkoblet';
var PROPERTY_GIIRSTS = 'Alltid|Spør|Aldri';
var PROPERTY_GIIMODE = 'Bluetooth Cube Mode';
var PROPERTY_GIIMODES = 'Normal|Training|Continuous training';
var PROPERTY_VRCAH = 'Useless pieces in huge cube';
var PROPERTY_VRCAHS = 'Hide|Border|Color|Show';
var CONFIRM_GIIRST = 'Reset smart kube som løst?';
var PROPERTY_GIIAED = 'Automatisk oppdagelse av feil på maskinvare';
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
		['3x3 OH (One Handed)', "333oh", 0],
		['Clock', "clkwca", 0],
		['Megaminx', "mgmp", -70],
		['Pyraminx', "pyrso", -10],
		['Skewb', "skbso", 0],
		['Square-1', "sqrs", 0],
		['4x4 bld', "444bld", -40],
		['5x5 bld', "555bld", -60],
		['3x3 mbld', "r3ni", 5]
	]],
	['Input', [
		['Extern', "input", 0],
		['Konkurranse', "remoteComp", 0],
		['Online battle', "remoteBattle", 0],
		['Remote', "remoteOther", 0]
	]],
	['===WCA===', [
		['--', "blank", 0]
	]],
	['3x3x3', [
		["tilfeldig tilstand (WCA)", "333", 0],
		['Tilfeldig trekk', "333o", 25],
		['3x3x3 for nybegynnere', "333noob", 25],
		['Bare kanter', "edges", 0],
		['Bare hjørner', "corners", 0],
		['BLD Helper', "nocache_333bldspec", 0],
		['Pattern Tool', "nocache_333patspec", 0],
		['3x3 ft', "333ft", 0],
		['Custom', "333custom", 0]
	]],
	['3x3x3 CFOP', [
		['PLL', "pll", 0],
		['OLL', "oll", 0],
		['Siste F2L plass + Siste rad', "lsll2", 0],
		['Siste rad', "ll", 0],
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
		['Krysset løst', "f2l", 0],
		['EOLinje', "eoline", 0],
		['EO Cross', "eocross", 0],
		['lett kryss', "easyc", 3],
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
		["tilfeldig tilstand (WCA)", "222so", 0],
		['Optimalt', "222o", 0],
		['3-gen', "2223", 25],
		['EG', "222eg", 0],
		['CLL', "222eg0", 0],
		['EG1', "222eg1", 0],
		['EG2', "222eg2", 0],
		['TCLL+', "222tcp", 0],
		['TCLL-', "222tcn", 0],
		['TCLL', "222tc", 0],
		['LS', "222lsall", 0],
		['Ingen bar', "222nb", 0]
	]],
	['4x4x4', [
		["WCA", "444wca", -40],
		['tilfeldig trekk', "444m", 40],
		['SiGN', "444", 40],
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
		['prefiks', "666p", 80],
		['suffiks', "666s", 80],
		['6x6x6 kanter', "6edge", 8]
	]],
	['7x7x7', [
		["WCA", "777wca", 100],
		['SiGN', "777si", 100],
		['prefiks', "777p", 100],
		['suffiks', "777s", 100],
		['7x7x7 kanter', "7edge", 8]
	]],
	['Klokke', [
		['WCA', "clkwca", 0],
		['wca (old)', "clkwcab", 0],
		['WCA w/o y2', "clknf", 0],
		['Jaap', "clk", 0],
		['Optimalt', "clko", 0],
		['konkav', "clkc", 0],
		['Effektiv pin rekkefølge', "clke", 0]
	]],
	['Megaminx', [
		["WCA", "mgmp", 70],
		['Gulrot', "mgmc", 70],
		['gammel stil', "mgmo", 70],
		['2-generatorer R,r,U', "minx2g", 30],
		['Siste plass + siste lag', "mlsll", 0],
		['PLL', "mgmpll", 0],
		['Last Layer', "mgmll", 0]
	]],
	['Pyraminx', [
		["tilfeldig tilstand (WCA)", "pyrso", 10],
		['Optimalt', "pyro", 0],
		['Tilfeldig trekk', "pyrm", 25],
		['L4E', "pyrl4e", 0],
		['4 tips', "pyr4c", 0],
		['No bar', "pyrnb", 0]
	]],
	['Skewb', [
		["tilfeldig tilstand (WCA)", "skbso", 0],
		['Optimalt', "skbo", 0],
		['Tilfeldig trekk', "skb", 25],
		['No bar', "skbnb", 0]
	]],
	['Square-1', [
		["tilfeldig tilstand (WCA)", "sqrs", 0],
		["CSP", "sqrcsp", 0],
		["PLL", "sq1pll", 0],
		['Måling av rotering til frontsiden', "sq1h", 40],
		['Vri metrisk', "sq1t", 20]
	]],
	['===ANDRE===', [
		['--', "blank", 0]
	]],
	['15 puslespill', [
		['tilfeldig tilstand URLD', "15prp", 0],
		['tilfeldig tilstand ^<>v', "15prap", 0],
		['tilfeldig tilstand Blank', "15prmp", 0],
		['Tilfeldig trekk URLD', "15p", 80],
		['Tilfeldig trekk ^<>v', "15pat", 80],
		['Tilfeldig trekk Blank', "15pm", 80]
	]],
	['8 puzzle', [
		['tilfeldig tilstand URLD', "8prp", 0],
		['tilfeldig tilstand ^<>v', "8prap", 0],
		['tilfeldig tilstand Blank', "8prmp", 0]
	]],
	['LxMxN', [
		['1x3x3 (Floppy kube)', "133", 0],
		['2x2x3 (tårn kube)', "223", 0],
		['2x3x3 (Domino kube)', "233", 25],
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
	['Tannhjul kube', [
		['tilfeldig tilstand', "gearso", 0],
		['Optimalt', "gearo", 0],
		['Tilfeldig trekk', "gear", 10]
	]],
	['Kilominx', [
		['tilfeldig tilstand', "klmso", 0],
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
		['Cmetrick Mini', "cm2", 25]
	]],
	['Helikopter kube', [
		['Heli copter', "heli", 40],
		['Curvy copter', "helicv", 40],
		['2x2 Heli random move', "heli2x2", 70],
		['2x2 Heli by group', "heli2x2g", 5]
	]],
	['Redi kube', [
		['tilfeldig tilstand', "rediso", 0],
		['MoYu', "redim", 8],
		['Tilfeldig trekk', "redi", 20]
	]],
	['Dino Cube', [
		['tilfeldig tilstand', "dinoso", 0],
		['Optimalt', "dinoo", 0]
	]],
	['Ivy kube', [
		['tilfeldig tilstand', "ivyso", 0],
		['Optimalt', "ivyo", 0],
		['Tilfeldig trekk', "ivy", 10]
	]],
	['Master Pyraminx', [
		['tilfeldig tilstand', "mpyrso", 0],
		['Tilfeldig trekk', "mpyr", 42]
	]],
	['Pyraminx krystall', [
		['Pochmann', "prcp", 70],
		['Gammel stil', "prco", 70]
	]],
	['Siamesisk kube', [
		['1x1x3 blokk', "sia113", 25],
		['1x2x3 blokk', "sia123", 25],
		['2x2x2 kube', "sia222", 25]
	]],
	['Square', [
		['Square-2', "sq2", 20],
		['Super Square-1', "ssq1t", 20]
	]],
	['Super Floppy', [
		[' ', "sfl", 25]
	]],
	['UFO', [
		['Jaap stil', "ufo", 25]
	]],
	['FTO (Side Vridende Oktahedron)', [
		['tilfeldig tilstand', "ftoso", 0],
		['Tilfeldig trekk', "fto", 30],
		['L3T', "ftol3t", 0],
		['L3T+LBT', "ftol4t", 0],
		['TCP', "ftotcp", 0],
		['edges only', "ftoedge", 0],
		['centers only', "ftocent", 0],
		['corners only', "ftocorn", 0],
		['Diamond tilfeldig tilstand', "dmdso", 0]
	]],
	['Icosahedron', [
		['Icosamate Tilfeldig trekk', "ctico", 60]
	]],
	['===SPESIELLE===', [
		['--', "blank", 0]
	]],
	['3x3x3 undersett', [
		['2-generator R,U', "2gen", 0],
		['2-generator L,U', "2genl", 0],
		['Roux-generator M,U', "roux", 0],
		['3-generator F,R,U', "3gen_F", 0],
		['3-generator R,U,L', "3gen_L", 0],
		['3-generatorer R,r,U', "RrU", 0],
		['Domino Subgroup', "333drud", 0],
		['bare halvrotasjoner', "half", 0],
		['siste plass + siste lag (gammel)', "lsll", 15]
	]],
	['Bandasjert Kube', [
		['Bikube', "bic", 30],
		['Square-1 /,(1,0)', "bsq", 25]
	]],
	['Overganger', [
		['Mange 3x3x3', "r3", 5],
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
	['===SPØK===', [
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
	['snu toppsiden', 'Roter nedre flate '],
	['Roter høyre side', 'Roter venstre side'],
	['Roter fronten', 'Roter baksiden ']
];
var SCRAMBLE_NOOBSS = 'Med klokken 90 grader,| mot klokken 90 grader,| 180 grader,';
var SCROPT_TITLE = 'Scramble Options';
var SCROPT_BTNALL = 'Full';
var SCROPT_BTNNONE = 'Clear';
var SCROPT_EMPTYALT = 'Please select at least one case';
var STATS_CFM_RESET = 'Resett alle tidene i denne økten';
var STATS_CFM_DELSS = 'slett økten [%s]?';
var STATS_CFM_DELMUL = 'Antall slettede verdier fra gjeldende indeks?';
var STATS_CFM_DELETE = 'Slett denne tiden';
var STATS_COMMENT = 'Kommenter';
var STATS_REVIEW = 'Gjennomgå';
var STATS_DATE = 'Dato';
var STATS_SSSTAT = '1-løsningsstatistikk';
var STATS_SSRETRY = 'Retry';
var STATS_CURROUND = 'Gjeldende rundestatistikk';
var STATS_CURSESSION = 'Gjeldende øktstatistikk';
var STATS_CURSPLIT = 'Fase %d av gjeldende øktstatistikk';
var STATS_EXPORTCSV = 'Eksportér CSV';
var STATS_SSMGR_TITLE = 'Øktbehandler';
var STATS_SSMGR_NAME = 'Navn';
var STATS_SSMGR_DETAIL = 'Øktdetaljer';
var STATS_SSMGR_OPS = 'Gi nytt navn|Opprett|Del opp|Slå sammen|Slett|Sorter|Merge&Dedupe';
var STATS_SSMGR_ORDER = 'Sorter etter blandinger';
var STATS_SSMGR_ODCFM = 'Sorter alle økter etter blandinger';
var STATS_SSMGR_SORTCFM = '%d løst vil bli bestilt, bekreft?';
var STATS_ALERTMG = 'Flett alle tider i økten [%f] til slutten av økten [%t]?';
var STATS_PROMPTSPL = 'Antall siste tider delt opp fra økt [%s]?';
var STATS_ALERTSPL = 'Skal splitte eller forlate hvertfall 1 tid';
var STATS_AVG = 'Gjennomsnitt';
var STATS_SUM = 'sum';
var STATS_SOLVE = 'løs';
var STATS_TIME = 'tid';
var STATS_SESSION = 'Økt';
var STATS_SESSION_NAME = 'Rediger navn på økt';
var STATS_SESSION_NAMEC = 'Navn på ny økt';
var STATS_STRING = 'best|current|worst|Generated By csTimer on %Y-%M-%D|solves/total: %d|single|mean of %mk|avg of %mk|Average: %v{ (σ = %sgm)}|Mean: %v|Time List:|solving from %s to %e|Totally spent: %d|target';
var STATS_PREC = 'presisjon av tidsfordelingen';
var STATS_PREC_STR = 'auto|0,1s|0,2s|0,5s|1s|2s|5s|10s|20s|50s|100s';
var STATS_TYPELEN = 'list %d type|list %d length|average|mean';
var STATS_STATCLR = 'Aktiver tømming av økt';
var STATS_ABSIDX = 'Vis absolutt indeks i statistikk rapport';
var STATS_XSESSION_DATE = 'hvilken som helst dato|siste 24 timer|siste 7 dager|siste 30 dager|siste 365 dager';
var STATS_XSESSION_NAME = 'hvilket som helst navn';
var STATS_XSESSION_SCR = 'hvilken som helst blanding';
var STATS_XSESSION_CALC = 'Calc';
var STATS_RSFORSS = 'Vis status ved klikk på løsningsnummer';
var PROPERTY_PRINTSCR = 'print blanding(er) i statistikken';
var PROPERTY_PRINTCOMM = 'print comment(s) in statistics';
var PROPERTY_PRINTDATE = 'print løsningsdato i statistikkene';
var PROPERTY_SUMMARY = 'Vis sammendrag før listen med tider';
var PROPERTY_IMRENAME = 'gi økten nytt navn umiddelbart etter opprettelse';
var PROPERTY_SCR2SS = 'Opprett ny økt når blandingstype blir byttet';
var PROPERTY_SS2SCR = 'Gjenopprett blandingstype når økt skiftes';
var PROPERTY_SS2PHASES = 'gjennopprette flerfaset tidtaking når du bytter økt';
var PROPERTY_STATINV = 'Hvis tider i omvendt rekkefølge';
var PROPERTY_STATSSUM = 'Vis sum i tidsliste';
var PROPERTY_STATTHRES = 'Show target time for session best';
var PROPERTY_STATBPA = 'Show best possible average (BPA)';
var PROPERTY_STATWPA = 'Show worst possible average (WPA)';
var PROPERTY_STATAL = 'Statistiske indikatorer';
var PROPERTY_STATALU = 'Tilpasset statistisk indikator';
var PROPERTY_HLPBS = 'Highlight PBs';
var PROPERTY_HLPBS_STR = 'Dark orange as WCA|As link color|Bolder|None';
var PROPERTY_DELMUL = 'Aktiver sletting av flere';
var PROPERTY_TOOLSFUNC = 'Valgte funksjoner';
var PROPERTY_TRIM = 'Antall avskåret løser ved hver side';
var PROPERTY_TRIMR = 'Number of solves trimmed at worse side';
var PROPERTY_TRIM_MED = 'Median';
var PROPERTY_STKHEAD = 'bruk stackmat status informasjon';
var PROPERTY_TOOLPOS = 'Tools panel position';
var PROPERTY_TOOLPOS_STR = 'Bottom|Float|Top';
var PROPERTY_HIDEFULLSOL = 'Vis løsning progressivt';
var PROPERTY_IMPPREV = 'Importer ikke-nyeste data';
var PROPERTY_AUTOEXP = 'Automatisk eksport (hver 100 gang)';
var PROPERTY_AUTOEXP_OPT = 'Aldri|til fil|Med CsTimer ID|Med WCA bruker|Med Google bruker|Alert Only';
var PROPERTY_SCRASIZE = 'Automatisk blandingsstørrelse';
var MODULE_NAMES = {
	"kernel": 'Globalt',
	"ui": 'Skjerm',
	"color": 'Farge',
	"timer": 'Tidtaker',
	"scramble": 'Blanding',
	"stats": 'Statistikk',
	"tools": 'Verktøy',
	"vrc": 'Virtuell&<br>Bluetooth'
};
var BGIMAGE_URL = 'skriv inn bildets URL';
var BGIMAGE_INVALID = 'Ugyldig url';
var BGIMAGE_OPACITY = 'bakgrunnsbilde opasitet';
var BGIMAGE_IMAGE = 'Bakgrunnsbilde';
var BGIMAGE_IMAGE_STR = 'ingen|manuelt|CCT';
var SHOW_AVG_LABEL = 'Vis snitt etikett';
var SHOW_DIFF_LABEL = 'Show Difference Label';
var SHOW_DIFF_LABEL_STR = '-Green+Red|-Red+Green|Normal|None';
var USE_LOGOHINT = 'Hint meldinger i logo';
var TOOLS_SCRGEN = 'Blandingsgenerator';
var SCRGEN_NSCR = 'Antall blandingstyper';
var SCRGEN_PRE = 'Prefix';
var SCRGEN_GEN = 'Generer blandinger';
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
