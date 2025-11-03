var OK_LANG = 'OK';
var CANCEL_LANG = 'Annuleren';
var RESET_LANG = 'Herstel';
var ABOUT_LANG = 'Over';
var ZOOM_LANG = 'Inzoomen';
var COPY_LANG = 'Kopiëren';
var BUTTON_TIME_LIST = 'Lijst<br>Tijden';
var BUTTON_OPTIONS = 'Opties';
var BUTTON_EXPORT = 'Exporteren';
var BUTTON_DONATE = 'Doneren';
var PROPERTY_SR = 'With session';
var PROPERTY_USEINS = 'Gebruik WCA inspectie';
var PROPERTY_USEINS_STR = 'Altijd (beneden)|Altijd (boven)|Behalve BLD (beneden)|Behalve BLD (boven)|Nooit';
var PROPERTY_SHOWINS = 'Toon een pictogram wanneer inspectie is ingeschakeld';
var PROPERTY_VOICEINS = 'Stem alarm bij WCA inspection';
var PROPERTY_VOICEINS_STR = 'geen|mannelijke stem|vrouwlijke stem';
var PROPERTY_VOICEVOL = 'Voice volume';
var PROPERTY_PHASES = 'Meerfasig';
var PROPERTY_TIMERSIZE = 'Grootte timer';
var PROPERTY_USEMILLI = 'Gebruik milliseconden';
var PROPERTY_SMALLADP = 'Gebruik klein lettertype na de komma';
var PROPERTY_SCRSIZE = 'Grootte scramble';
var PROPERTY_SCRMONO = 'Monospace scramble';
var PROPERTY_SCRLIM = 'Limiteer de hoogte van scramble vlak';
var PROPERTY_SCRALIGN = 'Uitlijnen van scramble vlak';
var PROPERTY_SCRALIGN_STR = 'midden|links|rechts';
var PROPERTY_SCRWRAP = 'Scramble Wrap';
var PROPERTY_SCRWRAP_STR = 'Balanced|Normal';
var PROPERTY_SCRNEUT = 'Kleur neutraal';
var PROPERTY_SCRNEUT_STR = 'Geen|Enig zijde|Dubbel zijdes|Zes zijdes';
var PROPERTY_SCREQPR = 'Probabilities for training-scramble states';
var PROPERTY_SCREQPR_STR = 'Actual|Equal|Random order';
var PROPERTY_SCRFAST = 'Gebruik snelle scramble voor 4x4x4 (niet-officiëel)';
var PROPERTY_SCRKEYM = 'Label sleutelbeweging (en) in scramble';
var PROPERTY_SCRCLK = 'Actie bij klikken op scramble';
var PROPERTY_SCRCLK_STR = 'Geen|Kopiëren|Volgende scramble';
var PROPERTY_WNDSCR = 'Scramble paneel scherm stijl';
var PROPERTY_WNDSTAT = 'Statistieken paneel scherm style';
var PROPERTY_WNDTOOL = 'Gereedschappen paneel scherm stijl';
var PROPERTY_WND_STR = 'Normaal|Plat';
var EXPORT_DATAEXPORT = 'Gegevens Importeren/Exporteren';
var EXPORT_TOFILE = 'Exporteren naar bestand';
var EXPORT_FROMFILE = 'Importeren van bestand';
var EXPORT_TOSERV = 'Exporteren naar server';
var EXPORT_FROMSERV = 'Importeren van server';
var EXPORT_FROMOTHER = 'Importeer sessie(s) van andere timers';
var EXPORT_USERID = 'Voer aub je account in (alleen letters en cijfers)';
var EXPORT_INVID = 'Alleen letters en cijfers zijn toegestaan!';
var EXPORT_ERROR = 'Er zijn fouten opgetreden...';
var EXPORT_NODATA = 'Geen gegevens gevonden in je account';
var EXPORT_UPLOADED = 'Succesvol geupload';
var EXPORT_CODEPROMPT = 'Save this code, or type saved code to import';
var EXPORT_ONLYOPT = 'Alleen opties exporteren/importeren';
var EXPORT_ACCOUNT = 'Accounts exporteren';
var EXPORT_LOGINGGL = 'Login met behulp van Google-account';
var EXPORT_LOGINWCA = 'Inloggen met WCA Account';
var EXPORT_LOGOUTCFM = 'Bevestigen om uit te loggen?';
var EXPORT_LOGINAUTHED = 'Geautoriseerde<br>gegevens ophalen...';
var EXPORT_AEXPALERT = 'More than %d solves since last backup';
var EXPORT_WHICH = 'You have %d file(s), which one should be imported?';
var EXPORT_WHICH_ITEM = '%s solve(s), uploaded at %t';
var IMPORT_FINAL_CONFIRM = 'This will override all local data! It will modify %d sessions, add %a and remove %r solves at least. Confirm to import data?';
var BUTTON_SCRAMBLE = 'SCRA-<br>MBLE';
var BUTTON_TOOLS = 'Hulpmi-<br>ddelen';
var IMAGE_UNAVAILABLE = 'Niet beschikbaar voor dit type scramble';
var TOOLS_SELECTFUNC = 'Functie';
var TOOLS_CROSS = 'Los kruis op';
var TOOLS_EOLINE = 'Los EOLine op';
var TOOLS_ROUX1 = 'Los Roux S1 op';
var TOOLS_222FACE = '2x2x2 kant';
var TOOLS_GIIKER = 'Giiker Kubus';
var TOOLS_IMAGE = 'Teken scramble';
var TOOLS_STATS = 'Statistiek';
var TOOLS_HUGESTATS = 'gekruiste-sessie statistieken';
var TOOLS_DISTRIBUTION = 'Verdeling tijden';
var TOOLS_TREND = 'tijd trend';
var TOOLS_METRONOME = 'metronoom';
var TOOLS_RECONS = 'Reconstrueer';
var TOOLS_RECONS_NODATA = 'No solution found.';
var TOOLS_RECONS_TITLE = 'insp|exec|turn|tps';
var TOOLS_TRAINSTAT = 'Training Stat.';
var TOOLS_BLDHELPER = 'BLD Helper';
var TOOLS_CFMTIME = 'Bevestig tijd';
var TOOLS_SOLVERS = 'Oplossers';
var TOOLS_DLYSTAT = 'Daily Statistics';
var TOOLS_DLYSTAT1 = 'Period|Start of Day|Week';
var TOOLS_DLYSTAT_OPT1 = 'day|week|month|year';
var TOOLS_DLYSTAT_OPT2 = 'Sun|Mon|Tue|Wed|Thu|Fri|Sat';
var TOOLS_SYNCSEED = 'Common Scramble';
var TOOLS_SYNCSEED_SEED = 'Seed';
var TOOLS_SYNCSEED_INPUT = 'Input Seed';
var TOOLS_SYNCSEED_30S = 'Use 30s Seed';
var TOOLS_SYNCSEED_HELP = 'If enabled, scramble will only depend on the seed and scramble settings.';
var TOOLS_SYNCSEED_DISABLE = 'Disable current seed?';
var TOOLS_SYNCSEED_INPUTA = 'Input a value (a-zA-Z0-9) as seed';
var TOOLS_BATTLE = 'Online battle';
var TOOLS_BATTLE_HEAD = 'Room|Join Room';
var TOOLS_BATTLE_TITLE = 'Rank|Status|Time';
var TOOLS_BATTLE_STATUS = 'Ready|Inspect|Solving|Solved|Lost';
var TOOLS_BATTLE_INFO = 'Join a battle room with your friend, then you will battle together.';
var TOOLS_BATTLE_JOINALERT = 'Please input the room ID';
var TOOLS_BATTLE_LEAVEALERT = 'Leave current room';
var OLCOMP_UPDATELIST = 'Update Competition List';
var OLCOMP_VIEWRESULT = 'Toon resultaat';
var OLCOMP_VIEWMYRESULT = 'Mijn geschiedenis';
var OLCOMP_START = 'Start!';
var OLCOMP_SUBMIT = 'Versturen';
var OLCOMP_SUBMITAS = 'Verstuur als:';
var OLCOMP_WCANOTICE = 'Submit As Your WCA Account? (Relogin if not recognized after submitting)';
var OLCOMP_OLCOMP = 'Online competitie';
var OLCOMP_ANONYM = 'Anoniem';
var OLCOMP_ME = 'Mij';
var OLCOMP_WCAACCOUNT = 'WCA Account';
var OLCOMP_ABORT = 'Competitie afbreken en resultaten laten zien?';
var OLCOMP_WITHANONYM = 'Met anoniem';
var PROPERTY_IMGSIZE = 'Tekstgrootte scramble';
var PROPERTY_IMGREP = 'Laat virtuele kubus animatie zien wanneer je clickt op de foto van de scramble';
var TIMER_INSPECT = 'Inspectie';
var TIMER_SOLVE = 'Oplossen';
var PROPERTY_USEMOUSE = 'gebruik muis stopwatch';
var PROPERTY_TIMEU = 'Stopwatch update is';
var PROPERTY_TIMEU_STR = 'update|0.1s|seconden|inspectie|geen';
var PROPERTY_PRETIME = 'Spatiebalk ingedrukt houden voor (seconde(n))';
var PROPERTY_ENTERING = 'Tijden meten met';
var PROPERTY_ENTERING_STR = 'stopwatch|typen|stackmat|MoYuTimer|virtueel|Bluetooth Cube|qCube|Bluetooth Timer|last layer training';
var PROPERTY_INTUNIT = 'Unit when entering an integer';
var PROPERTY_INTUNIT_STR = 'second|centisecond|millisecond';
var PROPERTY_COLOR = 'Selecteer kleurenschema';
var PROPERTY_COLORS = 'Lettertype kleur|Kleur achtergrond|Board kleur|Kleur knop|Kleur link|Kleur logo|Logo bgkleur';
var PROPERTY_VIEW = 'Ui stijl is';
var PROPERTY_VIEW_STR = 'Automatisch|Mobiel|Desktop';
var PROPERTY_UIDESIGN = 'UI ontwerp is';
var PROPERTY_UIDESIGN_STR = 'Normaal|Materiaal ontwerp|Normaal zonder shaduwen|Materiaal ontwerp zonder schaduwen';
var COLOR_EXPORT = 'Bewaar aub de tekst voor importeren';
var COLOR_IMPORT = 'Bewaar aub de tekst voor exporteren';
var COLOR_FAIL = 'Incorrecte gegevens, Importeren Mislukt';
var PROPERTY_FONTCOLOR_STR = 'Zwart|Wit';
var PROPERTY_COLOR_STR = 'Handmatig|import/export...|Willekeurig|Stijl1|Stijl2|Stijl3|Zwart|Wit|Stijl6|solarized dark|solarized light';
var PROPERTY_FONT = 'Selecteer lettertype timer';
var PROPERTY_FONT_STR = 'Willekeurig digitaal|Normaal|Digitaal1|Digitaal2|Digitaal3|Digitaal4|Digitaal5';
var PROPERTY_FORMAT = 'Tijdsindeling';
var PROPERTY_USEKSC = 'Gebruik sneltoetsen';
var PROPERTY_USEGES = 'Gebruik gebaren controle';
var PROPERTY_NTOOLS = 'Aantal hulpmiddelen';
var PROPERTY_AHIDE = 'Verberg Alle Elementen wanneer je aan het timen bent';
var SCRAMBLE_LAST = 'Laatste';
var SCRAMBLE_NEXT = 'Volgende';
var SCRAMBLE_SCRAMBLE = ' Scramble';
var SCRAMBLE_SCRAMBLING = 'Mixen';
var SCRAMBLE_LENGTH = 'Lengte';
var SCRAMBLE_INPUT = 'Scramble(s) invoeren';
var SCRAMBLE_INPUTTYPE = 'Scramble type';
var PROPERTY_VRCSPEED = 'VRC basissnelheid (tps)';
var PROPERTY_VRCORI = 'Virtual cube orientation';
var PROPERTY_VRCMP = 'meerfasig';
var PROPERTY_VRCMPS = 'Geen|CFOP|CF+OP|CFFFFOP|CFFFFOOPP|Roux';
var PROPERTY_GIIKERVRC = 'Laat virtuele Giiker kubus zien';
var PROPERTY_GIISOK_DELAY = 'Markeer gescrambled';
var PROPERTY_GIISOK_DELAYS = '2s|3s|4s|5s|Nooit|Goed gescrambled';
var PROPERTY_GIISOK_KEY = 'Markeer gescrabbeld met spatie balk';
var PROPERTY_GIISOK_MOVE = 'Markeer gemixt door te doen';
var PROPERTY_GIISOK_MOVES = 'U4, R4, etc|(U U\')2, (U\' U)2, etc|Never';
var PROPERTY_GIISBEEP = 'Piep als hussel is gemarkeerd';
var PROPERTY_GIIRST = 'Reset bluetooth cube wanneer aangesloten';
var PROPERTY_GIIRSTS = 'Altijd|Vraag|Nooit';
var PROPERTY_GIIMODE = 'Bluetooth Cube Mode';
var PROPERTY_GIIMODES = 'Normal|Training|Continuous training';
var PROPERTY_VRCAH = 'Useless pieces in huge cube';
var PROPERTY_VRCAHS = 'Hide|Border|Color|Show';
var CONFIRM_GIIRST = 'Reset bluetooth cube als opgelost?';
var PROPERTY_GIIAED = 'Automatische hardware fout-detectie';
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
		['klok', "clkwca", 0],
		['megaminx', "mgmp", -70],
		['pyraminx', "pyrso", -10],
		['Skewb', "skbso", 0],
		['sq1', "sqrs", 0],
		['4x bld', "444bld", -40],
		['5x5 bld', "555bld", -60],
		['3x3 mbld', "r3ni", 5]
	]],
	['Invoer', [
		['??', "input", 0],
		['Competitie', "remoteComp", 0],
		['Online battle', "remoteBattle", 0],
		['Remote', "remoteOther", 0]
	]],
	['===WCA===', [
		['--', "blank", 0]
	]],
	['3x3x3', [
		["willekeurige staat (WCA)", "333", 0],
		['willekeurige draai', "333o", 25],
		['3x3x3 voor beginners', "333noob", 25],
		['Alleen randen', "edges", 0],
		['Alleen hoeken', "corners", 0],
		['BLD Helper', "nocache_333bldspec", 0],
		['Pattern Tool', "nocache_333patspec", 0],
		['3x3 ft', "333ft", 0],
		['Aangepast', "333custom", 0]
	]],
	['3x3x3 CFOP', [
		['PLL', "pll", 0],
		['OLL', "oll", 0],
		['Laatste slot + laatste laag', "lsll2", 0],
		['Laatste laag', "ll", 0],
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
		['Kruis opgelost', "f2l", 0],
		['EOLine', "eoline", 0],
		['EO Cross', "eocross", 0],
		['Makkelijk kruis', "easyc", 3],
		['eenvoudig xkruis', "easyxc", 4]
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
		["willekeurige staat (WCA)", "222so", 0],
		['optimaal', "222o", 0],
		['derde generatie', "2223", 25],
		['EG', "222eg", 0],
		['CLL', "222eg0", 0],
		['EG1', "222eg1", 0],
		['EG2', "222eg2", 0],
		['TCLL+', "222tcp", 0],
		['TCLL-', "222tcn", 0],
		['TCLL', "222tc", 0],
		['LS', "222lsall", 0],
		['Geen balk', "222nb", 0]
	]],
	['4x4x4', [
		["WCA", "444wca", -40],
		['willekeurige draai', "444m", 40],
		['SiGN', "444", 40],
		['YJ', "444yj", 40],
		['4x4x4 randen', "4edge", 0],
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
		['5x5x5 randen', "5edge", 8]
	]],
	['6x6x6', [
		["WCA", "666wca", 80],
		['SiGN', "666si", 80],
		['voorvoegsel', "666p", 80],
		['achtervoegsel', "666s", 80],
		['6x6x6 randen', "6edge", 8]
	]],
	['7x7x7', [
		["WCA", "777wca", 100],
		['SiGN', "777si", 100],
		['voorvoegsel', "777p", 100],
		['achtervoegsel', "777s", 100],
		['7x7x7 randen', "7edge", 8]
	]],
	['Klok', [
		['WCA', "clkwca", 0],
		['wca (old)', "clkwcab", 0],
		['WCA w/o y2', "clknf", 0],
		['jaap', "clk", 0],
		['optimaal', "clko", 0],
		['beknopt', "clkc", 0],
		['Efficiente knop volgorde', "clke", 0]
	]],
	['Megaminx', [
		["WCA", "mgmp", 70],
		['Wortel', "mgmc", 70],
		['Oude methode', "mgmo", 70],
		['2-generator R,U', "minx2g", 30],
		['Laatste slot + laatste laag', "mlsll", 0],
		['PLL', "mgmpll", 0],
		['Last Layer', "mgmll", 0]
	]],
	['Pyraminx', [
		["willekeurige staat (WCA)", "pyrso", 10],
		['optimaal', "pyro", 0],
		['willekeurige draai', "pyrm", 25],
		['L4E', "pyrl4e", 0],
		['4 tips', "pyr4c", 0],
		['No bar', "pyrnb", 0]
	]],
	['Skewb', [
		["willekeurige staat (WCA)", "skbso", 0],
		['optimaal', "skbo", 0],
		['willekeurige draai', "skb", 25],
		['No bar', "skbnb", 0]
	]],
	['Square-1', [
		["willekeurige staat (WCA)", "sqrs", 0],
		["CSP", "sqrcsp", 0],
		["PLL", "sq1pll", 0],
		['vlak draait metrisch', "sq1h", 40],
		['draai metrisch', "sq1t", 20]
	]],
	['===OVERIGE===', [
		['--', "blank", 0]
	]],
	['15 puzzel', [
		['willekeurige staat URLD', "15prp", 0],
		['willekeurige staat ^<>v', "15prap", 0],
		['willekeurige staat Blank', "15prmp", 0],
		['willekeurige draai URLD', "15p", 80],
		['willekeurige draai ^<>v', "15pat", 80],
		['willekeurige draai Blank', "15pm", 80]
	]],
	['8 puzzle', [
		['willekeurige staat URLD', "8prp", 0],
		['willekeurige staat ^<>v', "8prap", 0],
		['willekeurige staat Blank', "8prmp", 0]
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
		['willekeurige staat', "gearso", 0],
		['optimaal', "gearo", 0],
		['willekeurige draai', "gear", 10]
	]],
	['Kilominx', [
		['willekeurige staat', "klmso", 0],
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
	['Helicopter Cube', [
		['Heli copter', "heli", 40],
		['Curvy copter', "helicv", 40],
		['2x2 Heli random move', "heli2x2", 70],
		['2x2 Heli by group', "heli2x2g", 5]
	]],
	['Redi Cube', [
		['willekeurige staat', "rediso", 0],
		['MoYu', "redim", 8],
		['willekeurige draai', "redi", 20]
	]],
	['Dino Cube', [
		['willekeurige staat', "dinoso", 0],
		['optimaal', "dinoo", 0]
	]],
	['Ivy cube', [
		['willekeurige staat', "ivyso", 0],
		['optimaal', "ivyo", 0],
		['willekeurige draai', "ivy", 10]
	]],
	['Master Pyraminx', [
		['willekeurige staat', "mpyrso", 0],
		['willekeurige draai', "mpyr", 42]
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
		['willekeurige staat', "ftoso", 0],
		['willekeurige draai', "fto", 30],
		['L3T', "ftol3t", 0],
		['L3T+LBT', "ftol4t", 0],
		['TCP', "ftotcp", 0],
		['edges only', "ftoedge", 0],
		['centers only', "ftocent", 0],
		['corners only', "ftocorn", 0],
		['Diamond willekeurige staat', "dmdso", 0]
	]],
	['Icosahedron', [
		['Icosamate willekeurige draai', "ctico", 60]
	]],
	['===SPECIAAL===', [
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
		['Alleen halve draaien', "half", 0],
		['Laatste slot + laatste laag (oud)', "lsll", 15]
	]],
	['Bandaged Kubus', [
		['Bicube', "bic", 30],
		['Square-1 /,(0,1)', "bsq", 25]
	]],
	['Relays', [
		['Veel 3x3x3s', "r3", 5],
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
	['===GRAPPEN===', [
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
	['Draai de bovenkant', 'Draai de onderkant'],
	['Draai de rechterkant', 'Draai de onderkant'],
	['Draai de voorkant', 'Draai de achterkant']
];
var SCRAMBLE_NOOBSS = ' 90 graden met de klok mee,| 90 graden tegen de klok in,| 180 graden,';
var SCROPT_TITLE = 'Scramble Opties';
var SCROPT_BTNALL = 'Full';
var SCROPT_BTNNONE = 'Clear';
var SCROPT_EMPTYALT = 'Please select at least one case';
var STATS_CFM_RESET = 'Herstel alle tijden van deze sessie?';
var STATS_CFM_DELSS = 'sessie [%s] verwijderen?';
var STATS_CFM_DELMUL = 'Het aantal verwijderde waarden van de huidige index?';
var STATS_CFM_DELETE = 'Deze tijd verwijderen?';
var STATS_COMMENT = 'Opmerking';
var STATS_REVIEW = 'Beoordelen';
var STATS_DATE = 'Datum';
var STATS_SSSTAT = '1-solve stat.';
var STATS_SSRETRY = 'Opnieuw Proberen';
var STATS_CURROUND = 'Gegevens actuele ronde';
var STATS_CURSESSION = 'Gegevens actuele sessie';
var STATS_CURSPLIT = 'Fass %d van de Huidige Sessie Statistieken';
var STATS_EXPORTCSV = 'Exporteer CSV';
var STATS_SSMGR_TITLE = 'Sessie manager';
var STATS_SSMGR_NAME = 'Naam';
var STATS_SSMGR_DETAIL = 'Sessie details';
var STATS_SSMGR_OPS = 'Hernoemen|Maken|Delen|Bijeenvoegen|Verwijderen|Sorteren|Merge&Dedupe';
var STATS_SSMGR_ORDER = 'Sorteer op scramble';
var STATS_SSMGR_ODCFM = 'Alle sessies sorteren op scramble?';
var STATS_SSMGR_SORTCFM = '%d solve(s) will be reordered, confirm?';
var STATS_ALERTMG = 'Voeg alle tijden bijeen in sessie [%f] naar het eind vam sessie %t';
var STATS_PROMPTSPL = 'Nummer van de laatste tijden die je wilt delen van sessie [%s]?';
var STATS_ALERTSPL = 'Moet minstens 1 keer worden gesplitst worden';
var STATS_AVG = 'Gemiddelde';
var STATS_SUM = 'som';
var STATS_SOLVE = 'Opgelost';
var STATS_TIME = 'Tijd';
var STATS_SESSION = 'Sessie';
var STATS_SESSION_NAME = 'Verander sessie naam';
var STATS_SESSION_NAMEC = 'Naam van de nieuwe sessie';
var STATS_STRING = 'Beste|Actuele|Slechtste|Gegenereerd door csTimer op %Y-%M-%D|opgelost/totaal: %d|enkele|mean van %mk|avg of %mk|Gemiddelde: %v{ (s = %sgm)}|Mean: %v|Lijst met tijden:|solving from %s to %e|Totally spent: %d|target';
var STATS_PREC = 'precisie tijdsverdeling';
var STATS_PREC_STR = 'Automatisch|0.1s|0.2s|0.5s|1s|2s|5s|10s|20s|50s|100s';
var STATS_TYPELEN = 'lijst %d type|lijst %d lengte|average|mean';
var STATS_STATCLR = 'Schakel sessie leegmaken in';
var STATS_ABSIDX = 'Laat absolute index in statistiek rapport';
var STATS_XSESSION_DATE = 'any date|past 24 hours|past 7 days|past 30 days|past 365 days';
var STATS_XSESSION_NAME = 'elke naam';
var STATS_XSESSION_SCR = 'any scramble';
var STATS_XSESSION_CALC = 'Calc';
var STATS_RSFORSS = 'Show stat. when clicking solve number';
var PROPERTY_PRINTSCR = 'afdrukken scramble(s) in statistieken';
var PROPERTY_PRINTCOMM = 'print comment(s) in statistics';
var PROPERTY_PRINTDATE = 'druk oplossingsdatum in statistieken';
var PROPERTY_SUMMARY = 'samenvatting tonen voor tijdlijst';
var PROPERTY_IMRENAME = 'hernoem sessie direct na aanmaken';
var PROPERTY_SCR2SS = 'maak nieuwe sessie bij wisselen van scramble type';
var PROPERTY_SS2SCR = 'herstel scramble tytpe bij wisselen van sessie';
var PROPERTY_SS2PHASES = 'herstel multi-fase tijdmeting bij wisselen van sessie';
var PROPERTY_STATINV = 'Omgekeerde tijdenlijst';
var PROPERTY_STATSSUM = 'Laat som zien in tijdenlijst';
var PROPERTY_STATTHRES = 'Doeltijd voor sessie beste tijd weergeven';
var PROPERTY_STATBPA = 'Laat best mogelijke gemiddelde zien (BPA)';
var PROPERTY_STATWPA = 'Laat slechts mogelijke gemiddelde zien (WPA)';
var PROPERTY_STATAL = 'Statistische indicatoren';
var PROPERTY_STATALU = 'Customized statistical indicator';
var PROPERTY_HLPBS = 'PBs Markeren';
var PROPERTY_HLPBS_STR = 'Dark orange as WCA|As link color|Bolder|None';
var PROPERTY_DELMUL = 'Inschakelen meervoudige verwijdering';
var PROPERTY_TOOLSFUNC = 'Selected Functions';
var PROPERTY_TRIM = 'Number of solves trimmed at better side';
var PROPERTY_TRIMR = 'Number of solves trimmed at worse side';
var PROPERTY_TRIM_MED = 'Median';
var PROPERTY_STKHEAD = 'Use Stackmat Status Information';
var PROPERTY_TOOLPOS = 'Tools panel position';
var PROPERTY_TOOLPOS_STR = 'Bottom|Float|Top';
var PROPERTY_HIDEFULLSOL = 'Show solution progressively';
var PROPERTY_IMPPREV = 'Importeer niet-nieuwste gegevens';
var PROPERTY_AUTOEXP = 'Automatisch exporteren (per 100 solves)';
var PROPERTY_AUTOEXP_OPT = 'Nooit|Naar bestand|Met csTimer ID|Met WCA Account|Met Google Account|Alert Only';
var PROPERTY_SCRASIZE = 'Automatische scramble grootte';
var MODULE_NAMES = {
	"kernel": 'Global',
	"ui": 'Weergave',
	"color": 'Kleur',
	"timer": 'Timer',
	"scramble": 'scramble',
	"stats": 'Statistiek',
	"tools": 'Hulpmiddelen',
	"vrc": 'virtueel &<br>bluetooth'
};
var BGIMAGE_URL = 'Voer URL in';
var BGIMAGE_INVALID = 'Ongeldige URL';
var BGIMAGE_OPACITY = 'Transparantie achtergrondafbeelding';
var BGIMAGE_IMAGE = 'Achtergrondafbeelding';
var BGIMAGE_IMAGE_STR = 'Geen|Automatischl|CCT';
var SHOW_AVG_LABEL = 'Toon gemiddelde';
var SHOW_DIFF_LABEL = 'Laat labelverschil zien';
var SHOW_DIFF_LABEL_STR = '-Green+Red|-Red+Green|Normal|None';
var USE_LOGOHINT = 'Hint berichten in logo';
var TOOLS_SCRGEN = 'ScrambleGenerator';
var SCRGEN_NSCR = 'Aantal scrambles';
var SCRGEN_PRE = 'prefix';
var SCRGEN_GEN = 'Genereer scrambles!';
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
