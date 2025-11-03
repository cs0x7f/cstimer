var OK_LANG = 'OK';
var CANCEL_LANG = 'Prekini';
var RESET_LANG = 'Resetiraj';
var ABOUT_LANG = 'Informacije';
var ZOOM_LANG = 'Povećaj';
var COPY_LANG = 'Copy';
var BUTTON_TIME_LIST = 'IZLISTAJ<br>VREMENA';
var BUTTON_OPTIONS = 'OPCIJE';
var BUTTON_EXPORT = 'IZVEZI';
var BUTTON_DONATE = 'DONIRAJ';
var PROPERTY_SR = 'Unutar sesije';
var PROPERTY_USEINS = 'koristi WCA inspekciju';
var PROPERTY_USEINS_STR = 'Always (down)|Always (up)|Except BLD (down)|Except BLD (up)|Never';
var PROPERTY_SHOWINS = 'Show an icon when inspection is enabled';
var PROPERTY_VOICEINS = 'glasovno upozorenje za WCA inspekciju';
var PROPERTY_VOICEINS_STR = 'bez glasa|muški glas|ženski glas';
var PROPERTY_VOICEVOL = 'Glasnoća glasa';
var PROPERTY_PHASES = 'višefazno';
var PROPERTY_TIMERSIZE = 'veličina štoperice';
var PROPERTY_USEMILLI = 'koristi milisekunde';
var PROPERTY_SMALLADP = 'koristi manji font nakon decimalne točke';
var PROPERTY_SCRSIZE = 'veličina scramble-a';
var PROPERTY_SCRMONO = 'mono-razmaknut scramble';
var PROPERTY_SCRLIM = 'Ograniči visinu okvira za scramble';
var PROPERTY_SCRALIGN = 'Poravnanje okvira za scramble';
var PROPERTY_SCRALIGN_STR = 'centrirano|lijevo|desno';
var PROPERTY_SCRWRAP = 'Scramble Wrap';
var PROPERTY_SCRWRAP_STR = 'Balanced|Normal';
var PROPERTY_SCRNEUT = 'Color neutral';
var PROPERTY_SCRNEUT_STR = 'None|Single face|Double faces|Six faces';
var PROPERTY_SCREQPR = 'Probabilities for training-scramble states';
var PROPERTY_SCREQPR_STR = 'Actual|Equal|Random order';
var PROPERTY_SCRFAST = 'Korištenje brzog rastavljanja za 4x4x4 (nije sluzbeno)';
var PROPERTY_SCRKEYM = 'Označi ključne poteze u scrambleu';
var PROPERTY_SCRCLK = 'Akcija prilikom klika na scramble';
var PROPERTY_SCRCLK_STR = 'Ništa|Kopiraj|Sljedeći scramble';
var PROPERTY_WNDSCR = 'Stil prikaza scramble panela';
var PROPERTY_WNDSTAT = 'Stil prikaza panela statistike';
var PROPERTY_WNDTOOL = 'Stil prikaza panela alata';
var PROPERTY_WND_STR = 'Normalno|Ravno';
var EXPORT_DATAEXPORT = 'Uvezi/izvezi podatke';
var EXPORT_TOFILE = 'Izvezi u datoteku';
var EXPORT_FROMFILE = 'Uvezi iz datoteke';
var EXPORT_TOSERV = 'Izvezi na server';
var EXPORT_FROMSERV = 'Uvezi iz servera';
var EXPORT_FROMOTHER = 'Uvezi sesije iz drugih štoperica';
var EXPORT_USERID = 'Unesi svoj korisnički račun (samo slova ili brojevi)';
var EXPORT_INVID = 'Dozvoljena su samo slova ili brojevi!';
var EXPORT_ERROR = 'Dogodile su se neke greške...';
var EXPORT_NODATA = 'Nema pronađenih podataka za navedeni korisnički račun';
var EXPORT_UPLOADED = 'Uspješno preneseno';
var EXPORT_CODEPROMPT = 'Spremi ovaj kod ili utipkaj spremljeni kod za uvoz';
var EXPORT_ONLYOPT = 'Uvezi/Izvezi samo Postavke';
var EXPORT_ACCOUNT = 'Izvezi račune';
var EXPORT_LOGINGGL = 'Prijavi se putem Google računa';
var EXPORT_LOGINWCA = 'Prijavi se putem WCA Računa';
var EXPORT_LOGOUTCFM = 'Potvrđuješ odjavu?';
var EXPORT_LOGINAUTHED = 'Authorizirano<br>Povlačenje podataka...';
var EXPORT_AEXPALERT = 'More than %d solves since last backup';
var EXPORT_WHICH = 'You have %d file(s), which one should be imported?';
var EXPORT_WHICH_ITEM = '%s solve(s), uploaded at %t';
var IMPORT_FINAL_CONFIRM = 'Ovo će obrisati sve lokalne podatke! Modificirat će %d sesije, dodati %a i obrisati barem %r slaganja. Potvrđuješ uvoz podataka?';
var BUTTON_SCRAMBLE = 'SCRA-<br>MBLE';
var BUTTON_TOOLS = 'ALATI';
var IMAGE_UNAVAILABLE = 'Nedostupno za ovaj tip scramble-a';
var TOOLS_SELECTFUNC = 'Funkcija';
var TOOLS_CROSS = 'složi križ';
var TOOLS_EOLINE = 'složi EOLine';
var TOOLS_ROUX1 = 'složi Roux S1';
var TOOLS_222FACE = '2x2x2 strana';
var TOOLS_GIIKER = 'Giiker Kocka';
var TOOLS_IMAGE = 'prikaži scramble';
var TOOLS_STATS = 'Statistika';
var TOOLS_HUGESTATS = 'statistika međusesija';
var TOOLS_DISTRIBUTION = 'distribucija vremena';
var TOOLS_TREND = 'trend vremena';
var TOOLS_METRONOME = 'metronom';
var TOOLS_RECONS = 'Rekonstruiraj';
var TOOLS_RECONS_NODATA = 'Nema pronađenog rješenja.';
var TOOLS_RECONS_TITLE = 'insp|exec|turn|tps';
var TOOLS_TRAINSTAT = 'Statistike treninga';
var TOOLS_BLDHELPER = 'BLD pomoćnik';
var TOOLS_CFMTIME = 'Potvrdi vrijeme';
var TOOLS_SOLVERS = 'Solveri';
var TOOLS_DLYSTAT = 'Daily Statistics';
var TOOLS_DLYSTAT1 = 'Period|Start of Day|Week';
var TOOLS_DLYSTAT_OPT1 = 'day|week|month|year';
var TOOLS_DLYSTAT_OPT2 = 'Sun|Mon|Tue|Wed|Thu|Fri|Sat';
var TOOLS_SYNCSEED = 'Učestali scrambleovi';
var TOOLS_SYNCSEED_SEED = 'Seed';
var TOOLS_SYNCSEED_INPUT = 'Input Seed';
var TOOLS_SYNCSEED_30S = 'Koristi 30s Seed';
var TOOLS_SYNCSEED_HELP = 'Ukoliko je uključeno, scramble će ovisiti samo o seedu i postavkama scramblea.';
var TOOLS_SYNCSEED_DISABLE = 'Onemogući trenutni seed?';
var TOOLS_SYNCSEED_INPUTA = 'Unesi vrijednost (a-zA-Z0-9) kao seed';
var TOOLS_BATTLE = 'Online battle';
var TOOLS_BATTLE_HEAD = 'Room|Join Room';
var TOOLS_BATTLE_TITLE = 'Rank|Status|Time';
var TOOLS_BATTLE_STATUS = 'Ready|Inspect|Solving|Solved|Lost';
var TOOLS_BATTLE_INFO = 'Join a battle room with your friend, then you will battle together.';
var TOOLS_BATTLE_JOINALERT = 'Please input the room ID';
var TOOLS_BATTLE_LEAVEALERT = 'Leave current room';
var OLCOMP_UPDATELIST = 'Ažuriraj listu natjecanja';
var OLCOMP_VIEWRESULT = 'Vidi rezultate';
var OLCOMP_VIEWMYRESULT = 'Moja povijest';
var OLCOMP_START = 'Započni!';
var OLCOMP_SUBMIT = 'Pošalji!';
var OLCOMP_SUBMITAS = 'Pošalji kao:';
var OLCOMP_WCANOTICE = 'Pošalji kao svoj WCA Račun? (Ponovno se prijavi ako nije prepoznato prilikom slanja)';
var OLCOMP_OLCOMP = 'Online natjecanje';
var OLCOMP_ANONYM = 'Anonimno';
var OLCOMP_ME = 'Ja';
var OLCOMP_WCAACCOUNT = 'WCA Račun';
var OLCOMP_ABORT = 'Prekini natjecanje i prikaži rezultate?';
var OLCOMP_WITHANONYM = 'S anonimnim';
var PROPERTY_IMGSIZE = 'Veličina prikaza scramble-a';
var PROPERTY_IMGREP = 'Show virtual cube animation when clicking scramble image';
var TIMER_INSPECT = 'inspekcija';
var TIMER_SOLVE = 'slaganje';
var PROPERTY_USEMOUSE = 'koristi miš kao štopericu';
var PROPERTY_TIMEU = 'prikaz štoperice je';
var PROPERTY_TIMEU_STR = 'normalan|0.1s|sekunde|inspekcija|bez prikaza';
var PROPERTY_PRETIME = 'vrijeme držanja tipke space" (sekunda/e)"';
var PROPERTY_ENTERING = 'unošenje vremena s/sa';
var PROPERTY_ENTERING_STR = 'štopericom|utipkavanjem|stackmat štoperica|MoYuTimer|virtualno|Bluetooth Cube|qCube|Bluetooth Timer|last layer training';
var PROPERTY_INTUNIT = 'Mjera prilikom unosa brojčanog tipa podatka';
var PROPERTY_INTUNIT_STR = 'sekunda|stotinka|milisekunda';
var PROPERTY_COLOR = 'odaberi temu';
var PROPERTY_COLORS = 'boja fonta|boja pozadine|boja ploče|boja gumba|boja veze|boja logotipa|boja pozadine logotipa';
var PROPERTY_VIEW = 'stil korisničkog sučelja je';
var PROPERTY_VIEW_STR = 'Automatski|Mobilni|Desktop';
var PROPERTY_UIDESIGN = 'UI dizajn je';
var PROPERTY_UIDESIGN_STR = 'Normalan|Material dizajn|Normalan bez sjene|Material dizajn bez sjene';
var COLOR_EXPORT = 'Spremi string za uvoz';
var COLOR_IMPORT = 'Unesi izvezeni string';
var COLOR_FAIL = 'Netočni podatci, uvoz neuspješan';
var PROPERTY_FONTCOLOR_STR = 'crno|bijelo';
var PROPERTY_COLOR_STR = 'ručno|uvezi/izvezi...|nasumično|stil1|stil2|stil3|crno|bijelo|stil6|solarized dark|solarized light';
var PROPERTY_FONT = 'odaberi font štoperice';
var PROPERTY_FONT_STR = 'nasumično digitlni|normalan|digitalni1|digitalni2|digitalni3|digitalni4|digitalni5';
var PROPERTY_FORMAT = 'format vremena';
var PROPERTY_USEKSC = 'koristi prečace s tipkovnice';
var PROPERTY_USEGES = 'use gesture control';
var PROPERTY_NTOOLS = 'broj alata';
var PROPERTY_AHIDE = 'Sakrij sve elemente dok štoperica mjeri vrijeme';
var SCRAMBLE_LAST = 'prethodni';
var SCRAMBLE_NEXT = 'sljedeći';
var SCRAMBLE_SCRAMBLE = ' scramble';
var SCRAMBLE_SCRAMBLING = 'Scrambling';
var SCRAMBLE_LENGTH = 'dužina';
var SCRAMBLE_INPUT = 'Unesi scramble/ove)';
var SCRAMBLE_INPUTTYPE = 'Scramble type';
var PROPERTY_VRCSPEED = 'VRC bazna brzina (tps)';
var PROPERTY_VRCORI = 'Virtual cube orientation';
var PROPERTY_VRCMP = 'multi-phase';
var PROPERTY_VRCMPS = 'Ništa|CFOP|CF+OP|CFFFFOP|CFFFFOOPP|Roux';
var PROPERTY_GIIKERVRC = 'Prikaži virtualnu bluetooth kocku';
var PROPERTY_GIISOK_DELAY = 'Označi kraj scramblea čekanjem';
var PROPERTY_GIISOK_DELAYS = '2s|3s|4s|5s|Nikad|Točno scrambleano';
var PROPERTY_GIISOK_KEY = 'Mark scrambled with spacebar';
var PROPERTY_GIISOK_MOVE = 'Mark scrambled by doing';
var PROPERTY_GIISOK_MOVES = 'U4, R4, itd|(U U\')2, (U\' U)2, itd|Nikad';
var PROPERTY_GIISBEEP = 'Zapišti kada je kocka scrambleana';
var PROPERTY_GIIRST = 'Resetiraj bluetooth kocku prilikom povezivanja';
var PROPERTY_GIIRSTS = 'Uvijek|Pitaj|Nikad';
var PROPERTY_GIIMODE = 'Bluetooth Cube Mode';
var PROPERTY_GIIMODES = 'Normal|Training|Continuous training';
var PROPERTY_VRCAH = 'Useless pieces in huge cube';
var PROPERTY_VRCAHS = 'Hide|Border|Color|Show';
var CONFIRM_GIIRST = 'Resetiraj bluetooth kocku kao složenu?';
var PROPERTY_GIIAED = 'Automatsko prepoznavanje hardver greške';
var scrdata = [
	['WCA', [
		['3x3x3', "333", 0],
		['2x2x2', "222so", 0],
		['4x4x4', "444wca", -40],
		['5x5x5', "555wca", -60],
		['6x6x6', "666wca", -80],
		['7x7x7', "777wca", -100],
		['3x3 naslijepo', "333ni", 0],
		['3x3 najmanje poteza', "333fm", 0],
		['3x3 ojednoručno', "333oh", 0],
		['sat', "clkwca", 0],
		['megaminx', "mgmp", -70],
		['pyraminx', "pyrso", -10],
		['skewb', "skbso", 0],
		['sq1', "sqrs", 0],
		['4x4 naslijepo', "444bld", -40],
		['5x5 naslijepo', "555bld", -60],
		['3x3 višestruko naslijepo', "r3ni", 5]
	]],
	['Ulaz', [
		['Eksterno', "input", 0],
		['Natjecanje', "remoteComp", 0],
		['Online battle', "remoteBattle", 0],
		['Remote', "remoteOther", 0]
	]],
	['===WCA===', [
		['--', "blank", 0]
	]],
	['3x3x3', [
		["nasumično stanje (WCA)", "333", 0],
		['nasumični potez', "333o", 25],
		['3x3x3 za noob-ove', "333noob", 25],
		['samo rubni dijelovi', "edges", 0],
		['samo korneri', "corners", 0],
		['BLD pomoćnik', "nocache_333bldspec", 0],
		['Pattern Tool', "nocache_333patspec", 0],
		['3x3 s nogama', "333ft", 0],
		['Prilagođeno', "333custom", 0]
	]],
	['3x3x3 CFOP', [
		['PLL', "pll", 0],
		['OLL', "oll", 0],
		['zadnji slot + zadnji sloj', "lsll2", 0],
		['zadnji sloj', "ll", 0],
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
		['složeni križ', "f2l", 0],
		['EOLine', "eoline", 0],
		['EO Cross', "eocross", 0],
		['lagani križ', "easyc", 3],
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
		["nasumično stanje (WCA)", "222so", 0],
		['optimalno', "222o", 0],
		['3-gen', "2223", 25],
		['EG', "222eg", 0],
		['CLL', "222eg0", 0],
		['EG1', "222eg1", 0],
		['EG2', "222eg2", 0],
		['TCLL+', "222tcp", 0],
		['TCLL-', "222tcn", 0],
		['TCLL', "222tc", 0],
		['LS', "222lsall", 0],
		['Bez Bar-a', "222nb", 0]
	]],
	['4x4x4', [
		["WCA", "444wca", -40],
		['nasumični potez', "444m", 40],
		['SiGN', "444", 40],
		['YJ', "444yj", 40],
		['4x4x4 rubni dijelovi', "4edge", 0],
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
		['5x5x5 rubni dijelovi', "5edge", 8]
	]],
	['6x6x6', [
		["WCA", "666wca", 80],
		['SiGN', "666si", 80],
		['prefiks', "666p", 80],
		['sufiks', "666s", 80],
		['6x6x6 rubni dijelovi', "6edge", 8]
	]],
	['7x7x7', [
		["WCA", "777wca", 100],
		['SiGN', "777si", 100],
		['prefiks', "777p", 100],
		['sufiks', "777s", 100],
		['7x7x7 rubni dijelovi', "7edge", 8]
	]],
	['Clock', [
		['WCA', "clkwca", 0],
		['Scramble_podatci_sat_ (old)', "clkwcab", 0],
		['WCA w/o y2', "clknf", 0],
		['jaap', "clk", 0],
		['optimalno', "clko", 0],
		['sažet', "clkc", 0],
		['efektivan red pin-ova', "clke", 0]
	]],
	['Megaminx', [
		["WCA", "mgmp", 70],
		['Carrot', "mgmc", 70],
		['stari stil', "mgmo", 70],
		['2-generator R,U', "minx2g", 30],
		['zadnji slot + zadnji sloj', "mlsll", 0],
		['PLL', "mgmpll", 0],
		['Last Layer', "mgmll", 0]
	]],
	['Pyraminx', [
		["nasumično stanje (WCA)", "pyrso", 10],
		['optimalno', "pyro", 0],
		['nasumični potez', "pyrm", 25],
		['L4E', "pyrl4e", 0],
		['4 tips', "pyr4c", 0],
		['No bar', "pyrnb", 0]
	]],
	['Skewb', [
		["nasumično stanje (WCA)", "skbso", 0],
		['optimalno', "skbo", 0],
		['nasumični potez', "skb", 25],
		['No bar', "skbnb", 0]
	]],
	['Square-1', [
		["nasumično stanje (WCA)", "sqrs", 0],
		["CSP", "sqrcsp", 0],
		["PLL", "sq1pll", 0],
		['face-turn metrika', "sq1h", 40],
		['twist metrika', "sq1t", 20]
	]],
	['===OSTALO===', [
		['--', "blank", 0]
	]],
	['15 puzzle', [
		['nasumično stanje URLD', "15prp", 0],
		['nasumično stanje ^<>v', "15prap", 0],
		['nasumično stanje Blank', "15prmp", 0],
		['nasumični potez URLD', "15p", 80],
		['nasumični potez ^<>v', "15pat", 80],
		['nasumični potez Blank', "15pm", 80]
	]],
	['8 puzzle', [
		['nasumično stanje URLD', "8prp", 0],
		['nasumično stanje ^<>v', "8prap", 0],
		['nasumično stanje Blank', "8prmp", 0]
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
		['nasumično stanje', "gearso", 0],
		['optimalno', "gearo", 0],
		['nasumični potez', "gear", 10]
	]],
	['Kilominx', [
		['nasumično stanje', "klmso", 0],
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
		['nasumično stanje', "rediso", 0],
		['MoYu', "redim", 8],
		['nasumični potez', "redi", 20]
	]],
	['Dino Cube', [
		['nasumično stanje', "dinoso", 0],
		['optimalno', "dinoo", 0]
	]],
	['Ivy kocka', [
		['nasumično stanje', "ivyso", 0],
		['optimalno', "ivyo", 0],
		['nasumični potez', "ivy", 10]
	]],
	['Master Pyraminx', [
		['nasumično stanje', "mpyrso", 0],
		['nasumični potez', "mpyr", 42]
	]],
	['Pyraminx Crystal', [
		['Pochmann', "prcp", 70],
		['stari stil', "prco", 70]
	]],
	['Siamese Cube', [
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
		['Jaap stil', "ufo", 25]
	]],
	['FTO (Face-Turning Octahedron)', [
		['nasumično stanje', "ftoso", 0],
		['nasumični potez', "fto", 30],
		['L3T', "ftol3t", 0],
		['L3T+LBT', "ftol4t", 0],
		['TCP', "ftotcp", 0],
		['edges only', "ftoedge", 0],
		['centers only', "ftocent", 0],
		['corners only', "ftocorn", 0],
		['Diamond nasumično stanje', "dmdso", 0]
	]],
	['Icosahedron', [
		['Icosamate nasumični potez', "ctico", 60]
	]],
	['===SPECIJALNO===', [
		['--', "blank", 0]
	]],
	['3x3x3 subset-ovi', [
		['2-generator R,U', "2gen", 0],
		['2-generator L,U', "2genl", 0],
		['Roux-generator M,U', "roux", 0],
		['3-generator F,R,U', "3gen_F", 0],
		['3-generator R,U,L', "3gen_L", 0],
		['3-generator R,r,U', "RrU", 0],
		['Domino Subgroup', "333drud", 0],
		['samo polovični potezi', "half", 0],
		['zadnji slot + zadnji sloj (stari stil)', "lsll", 15]
	]],
	['Bandaged Cube', [
		['Bicube', "bic", 30],
		['Square-1 /,(1,0)', "bsq", 25]
	]],
	['Maratoni', [
		['puno 3x3x3 kocaka', "r3", 5],
		['234 maraton', "r234", 0],
		['2345 maraton', "r2345", 0],
		['23456 maraton', "r23456", 0],
		['234567 maraton', "r234567", 0],
		['234 maraton (WCA)', "r234w", 0],
		['2345 maraton (WCA)', "r2345w", 0],
		['23456 maraton (WCA)', "r23456w", 0],
		['234567 maraton (WCA)', "r234567w", 0],
		['Mini Guildford', "rmngf", 0]
	]],
	['===ŠALE===', [
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
	['okreni gornju stranu', 'okreni donju stranu'],
	['okreni desnu stranu', 'okreni lijevu stranu'],
	['okreni prednju stranu', 'okreni stražnju stranu']
];
var SCRAMBLE_NOOBSS = ' u smjeru kazaljke na satu za 90°,| suprotno smjeru kazaljke na satu za 90°,| za 180°,';
var SCROPT_TITLE = 'Opcije scramblea';
var SCROPT_BTNALL = 'Potpuni';
var SCROPT_BTNNONE = 'Očisti';
var SCROPT_EMPTYALT = 'Molimo odaberite najmanje jedan case';
var STATS_CFM_RESET = 'resetiraj sva vremena u ovoj sesiji?';
var STATS_CFM_DELSS = 'obriši sesiju [%s]?';
var STATS_CFM_DELMUL = 'Broj izbrisanih vrijednosti iz trenutnog indeksa?';
var STATS_CFM_DELETE = 'obrisati ovo vrijeme?';
var STATS_COMMENT = 'Komentar';
var STATS_REVIEW = 'Recenzija';
var STATS_DATE = 'Datum';
var STATS_SSSTAT = 'Statistika jednog slaganja';
var STATS_SSRETRY = 'Retry';
var STATS_CURROUND = 'Trenutna statistika runde';
var STATS_CURSESSION = 'Trenutna statistika sesije';
var STATS_CURSPLIT = 'Faza %d trenutne statistike sesije';
var STATS_EXPORTCSV = 'Izvezi CSV';
var STATS_SSMGR_TITLE = 'Upravitelj sesije';
var STATS_SSMGR_NAME = 'Ime';
var STATS_SSMGR_DETAIL = 'Detalji sesije';
var STATS_SSMGR_OPS = 'Preimenuj|Kreiraj|Razdvoji|Spoji|Obriši|Sortiraj|Merge&Dedupe';
var STATS_SSMGR_ORDER = 'Poredaj po scrambleu';
var STATS_SSMGR_ODCFM = 'Sortiraj sve sesije po scrambleu?';
var STATS_SSMGR_SORTCFM = '%d slaganje/a će biti obrisano, sigurno?';
var STATS_ALERTMG = 'Spoji sva vremena u sesiji  [%f] s krajem sesije [%t]?';
var STATS_PROMPTSPL = 'Broj posljednjih vremena razdjeljenih iz sesije [%s]?';
var STATS_ALERTSPL = 'Potrebno razdvojiti ili ostaviti barem jedno vrijeme';
var STATS_AVG = 'srednja vrijednost';
var STATS_SUM = 'sum';
var STATS_SOLVE = 'slaganje';
var STATS_TIME = 'vrijeme';
var STATS_SESSION = 'Sesija';
var STATS_SESSION_NAME = 'Uredi ime sesije';
var STATS_SESSION_NAMEC = 'Ime nove sesije';
var STATS_STRING = 'najbolje|trenutno|najgore|Generirao csTimer %Y-%M-%D|slaganja/total: %d|pojedinačno|srednja vrijednost od %mk|prosjek od %mk|Prosjek: %v{ (σ = %sgm)}|Srednja vrijednost: %v|Lista vremena:|solving from %s to %e|Totally spent: %d|target';
var STATS_PREC = 'preciznost raspona vremena';
var STATS_PREC_STR = 'automatska|0.1s|0.2s|0.5s|1s|2s|5s|10s|20s|50s|100s';
var STATS_TYPELEN = 'izlistaj %d tip|izlistaj %d dužinu|prosjek|srednju vrijednost';
var STATS_STATCLR = 'Omogući brisanje sesije';
var STATS_ABSIDX = 'Prikaži apsolutni index u statističkom izvješću';
var STATS_XSESSION_DATE = 'bilo koji datum|zadnja 24 sata|zadnjih 7 dana|zadnjih 30 dana|zadnjih 365 dana';
var STATS_XSESSION_NAME = 'bilo koje ime';
var STATS_XSESSION_SCR = 'bilo koji scramble';
var STATS_XSESSION_CALC = 'Izračun';
var STATS_RSFORSS = 'Prikaži statistiku prilikom klika na broj slaganja';
var PROPERTY_PRINTSCR = 'ispiši scramble/ove u statistici';
var PROPERTY_PRINTCOMM = 'print comment(s) in statistics';
var PROPERTY_PRINTDATE = 'ispiši podatke o slaganju u statistici';
var PROPERTY_SUMMARY = 'prikaži sažetak prije liste vremena';
var PROPERTY_IMRENAME = 'preimenuj sesiju odmah nakon kreiranja';
var PROPERTY_SCR2SS = 'kreiraj novu sesiju kada se promijeni tip scramble-a';
var PROPERTY_SS2SCR = 'vrati tip scramble-a nakon prebacivanja sesije';
var PROPERTY_SS2PHASES = 'vrati multi-phase štopanje prilikom promjene sesije';
var PROPERTY_STATINV = 'Obrnuta lista vremena';
var PROPERTY_STATSSUM = 'Show sum in time list';
var PROPERTY_STATTHRES = 'Prikaži ciljano vrijeme za najbolje vrijeme sesije';
var PROPERTY_STATBPA = 'Show best possible average (BPA)';
var PROPERTY_STATWPA = 'Show worst possible average (WPA)';
var PROPERTY_STATAL = 'Statistički indikatori';
var PROPERTY_STATALU = 'Personalizirani statistički indikator';
var PROPERTY_HLPBS = 'Highlight PBs';
var PROPERTY_HLPBS_STR = 'Dark orange as WCA|As link color|Bolder|None';
var PROPERTY_DELMUL = 'Omogući višestruko brisanje';
var PROPERTY_TOOLSFUNC = 'Odabrane funkcije';
var PROPERTY_TRIM = 'Broj slaganja "odrezanih" sa svake strane';
var PROPERTY_TRIMR = 'Number of solves trimmed at worse side';
var PROPERTY_TRIM_MED = 'Medijan';
var PROPERTY_STKHEAD = 'Koristi informacije Stackmat statusa';
var PROPERTY_TOOLPOS = 'Tools panel position';
var PROPERTY_TOOLPOS_STR = 'Bottom|Float|Top';
var PROPERTY_HIDEFULLSOL = 'Prikaži progresivno rješenje';
var PROPERTY_IMPPREV = 'Uvezi ne najnovije podatke';
var PROPERTY_AUTOEXP = 'Automatsko izvezivanje (po 100 slaganja)';
var PROPERTY_AUTOEXP_OPT = 'Nikad|U datoteku|S csTimer IDjem|S WCA Računom|S Google Računom|Alert Only';
var PROPERTY_SCRASIZE = 'Automatska veličina scramblea';
var MODULE_NAMES = {
	"kernel": 'globalno',
	"ui": 'zaslon',
	"color": 'boja',
	"timer": 'štoperica',
	"scramble": 'scramble',
	"stats": 'statistika',
	"tools": 'alati',
	"vrc": 'virtualno&<br>bluetooth'
};
var BGIMAGE_URL = 'unesi url slike';
var BGIMAGE_INVALID = 'nevažeći url';
var BGIMAGE_OPACITY = 'providnost pozadinske slike';
var BGIMAGE_IMAGE = 'pozadinska slika';
var BGIMAGE_IMAGE_STR = 'ništa|ručno|CCT';
var SHOW_AVG_LABEL = 'Prikaži oznaku prosjeka';
var SHOW_DIFF_LABEL = 'Show Difference Label';
var SHOW_DIFF_LABEL_STR = '-Green+Red|-Red+Green|Normal|None';
var USE_LOGOHINT = 'Poruke savjeta u logotipu';
var TOOLS_SCRGEN = 'Generator scramble-ova';
var SCRGEN_NSCR = 'Broj scramble-ova';
var SCRGEN_PRE = 'prefiks';
var SCRGEN_GEN = 'Generiraj scramble-ove!';
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
