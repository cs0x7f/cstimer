var OK_LANG = 'Okej';
var CANCEL_LANG = 'Avbryt';
var RESET_LANG = 'Återställ';
var ABOUT_LANG = 'Om';
var ZOOM_LANG = 'Zooma';
var COPY_LANG = 'Copy';
var BUTTON_TIME_LIST = 'LISTA<br>TIDER';
var BUTTON_OPTIONS = 'ALTERNATIV';
var BUTTON_EXPORT = 'EXPORTERA';
var BUTTON_DONATE = 'DONERA';
var PROPERTY_SR = 'Med session';
var PROPERTY_USEINS = 'använd WCA inspektion';
var PROPERTY_USEINS_STR = 'Always (down)|Always (up)|Except BLD (down)|Except BLD (up)|Never';
var PROPERTY_SHOWINS = 'Show an icon when inspection is enabled';
var PROPERTY_VOICEINS = 'röstvarning av WCA inspekton';
var PROPERTY_VOICEINS_STR = 'ingen|manlig röst|kvinnlig röst';
var PROPERTY_VOICEVOL = 'Röstvolym';
var PROPERTY_PHASES = 'flera faser';
var PROPERTY_TIMERSIZE = 'Timerstorlek';
var PROPERTY_USEMILLI = 'Använd millisekunder';
var PROPERTY_SMALLADP = 'Använd små tecken efter decimaltecknet';
var PROPERTY_SCRSIZE = 'Blandningsstorlek';
var PROPERTY_SCRMONO = 'Fastbredd blandning';
var PROPERTY_SCRLIM = 'Begränsa höjden av blandningsområdet';
var PROPERTY_SCRALIGN = 'Anpassning av blandningsområdet';
var PROPERTY_SCRALIGN_STR = 'Mitten|Vänster|Höger';
var PROPERTY_SCRWRAP = 'Scramble Wrap';
var PROPERTY_SCRWRAP_STR = 'Balanced|Normal';
var PROPERTY_SCRNEUT = 'Color neutral';
var PROPERTY_SCRNEUT_STR = 'None|Single face|Double faces|Six faces';
var PROPERTY_SCREQPR = 'Probabilities for training-scramble states';
var PROPERTY_SCREQPR_STR = 'Actual|Equal|Random order';
var PROPERTY_SCRFAST = 'Använd snabb blandning för 4x4x4 (ej officiell)';
var PROPERTY_SCRKEYM = 'Markeringsnyckeln flyttas i blandning';
var PROPERTY_SCRCLK = 'Händelse vid tryckning på blanda';
var PROPERTY_SCRCLK_STR = 'Ingen|Kopiera|Nästa blandning';
var PROPERTY_WNDSCR = 'Blandningspanel display stil';
var PROPERTY_WNDSTAT = 'Statistikspanel display stil';
var PROPERTY_WNDTOOL = 'Verktygspanel display stil';
var PROPERTY_WND_STR = 'Normal|Platt';
var EXPORT_DATAEXPORT = 'Data Importering/Exportering';
var EXPORT_TOFILE = 'Exportera till fil';
var EXPORT_FROMFILE = 'Importera från fil';
var EXPORT_TOSERV = 'Exportera till server';
var EXPORT_FROMSERV = 'Importera från server';
var EXPORT_FROMOTHER = 'Importera session(er) från andra timers';
var EXPORT_USERID = 'Vänligen ange ditt konto (endast alfabetet eller nummer)';
var EXPORT_INVID = 'Endast alfabetet eller nummer är tillåtna!';
var EXPORT_ERROR = 'Några problem uppstod...';
var EXPORT_NODATA = 'Inga uppgifter hittades för ditt konto';
var EXPORT_UPLOADED = 'Uppladdad';
var EXPORT_CODEPROMPT = 'Spara den här koden, eller skriv in den sparade koden som ska importeras';
var EXPORT_ONLYOPT = 'Exportera/Importera endast inställningar';
var EXPORT_ACCOUNT = 'Exportera konton';
var EXPORT_LOGINGGL = 'Logga in med Google-konto';
var EXPORT_LOGINWCA = 'Logga in med WCA-konto';
var EXPORT_LOGOUTCFM = 'Bekräfta att logga ut?';
var EXPORT_LOGINAUTHED = 'Godkänd<br>hämtar data...';
var EXPORT_AEXPALERT = 'More than %d solves since last backup';
var EXPORT_WHICH = 'You have %d file(s), which one should be imported?';
var EXPORT_WHICH_ITEM = '%s solve(s), uploaded at %t';
var IMPORT_FINAL_CONFIRM = 'Detta kommer att överskrida all lokal data! Det kommer att ändra %d sessioner,  lägga till %a och ta bort %r lösningar åtminstone. Bekräfta att importera data?';
var BUTTON_SCRAMBLE = 'BLAN<br>NING';
var BUTTON_TOOLS = 'VERKTYG';
var IMAGE_UNAVAILABLE = 'Inte tillgänglig för den här blandningstypen';
var TOOLS_SELECTFUNC = 'Funktion';
var TOOLS_CROSS = 'Kors';
var TOOLS_EOLINE = 'EOLine';
var TOOLS_ROUX1 = 'Roux S1';
var TOOLS_222FACE = '2x2x2 sida';
var TOOLS_GIIKER = 'Giiker Cube';
var TOOLS_IMAGE = 'Bild på blandning';
var TOOLS_STATS = 'Statistik';
var TOOLS_HUGESTATS = 'kors-session statistik';
var TOOLS_DISTRIBUTION = 'Tidsfördelning';
var TOOLS_TREND = 'Tidsutveckling';
var TOOLS_METRONOME = 'Metronom';
var TOOLS_RECONS = 'Reconstruct';
var TOOLS_RECONS_NODATA = 'No solution found.';
var TOOLS_RECONS_TITLE = 'insp|exec|turn|tps';
var TOOLS_TRAINSTAT = 'Training Stat.';
var TOOLS_BLDHELPER = 'BLD Helper';
var TOOLS_CFMTIME = 'Bekräfta tid';
var TOOLS_SOLVERS = 'Lösare';
var TOOLS_DLYSTAT = 'Daily Statistics';
var TOOLS_DLYSTAT1 = 'Period|Start of Day|Week';
var TOOLS_DLYSTAT_OPT1 = 'day|week|month|year';
var TOOLS_DLYSTAT_OPT2 = 'Sun|Mon|Tue|Wed|Thu|Fri|Sat';
var TOOLS_SYNCSEED = 'Vanlig blandning';
var TOOLS_SYNCSEED_SEED = 'Frö';
var TOOLS_SYNCSEED_INPUT = 'Mata in frö';
var TOOLS_SYNCSEED_30S = 'Använd 30s frö';
var TOOLS_SYNCSEED_HELP = 'If enabled, scramble will only depend on the seed and scramble settings.';
var TOOLS_SYNCSEED_DISABLE = 'Inaktivera nuvarande frö?';
var TOOLS_SYNCSEED_INPUTA = 'Ange ett värde (a-zA-Z0-9) som frö';
var TOOLS_BATTLE = 'Online battle';
var TOOLS_BATTLE_HEAD = 'Room|Join Room';
var TOOLS_BATTLE_TITLE = 'Rank|Status|Time';
var TOOLS_BATTLE_STATUS = 'Ready|Inspect|Solving|Solved|Lost';
var TOOLS_BATTLE_INFO = 'Join a battle room with your friend, then you will battle together.';
var TOOLS_BATTLE_JOINALERT = 'Please input the room ID';
var TOOLS_BATTLE_LEAVEALERT = 'Leave current room';
var OLCOMP_UPDATELIST = 'Uppdatera tävlingslista';
var OLCOMP_VIEWRESULT = 'Visa resultat';
var OLCOMP_VIEWMYRESULT = 'Min historik';
var OLCOMP_START = 'Starta!';
var OLCOMP_SUBMIT = 'Skicka in!';
var OLCOMP_SUBMITAS = 'Skicka in som: ';
var OLCOMP_WCANOTICE = 'Skicka in som ditt WCA-konto? (Logga in på nytt om den inte känns igen efter inlämning)';
var OLCOMP_OLCOMP = 'Onlinetävling';
var OLCOMP_ANONYM = 'Anonym';
var OLCOMP_ME = 'Jag';
var OLCOMP_WCAACCOUNT = 'WCA Konto';
var OLCOMP_ABORT = 'Avbryt tävlingen och visa resultat?';
var OLCOMP_WITHANONYM = 'Med Anonym';
var PROPERTY_IMGSIZE = 'Blandningsbildstorlek';
var PROPERTY_IMGREP = 'Show virtual cube animation when clicking scramble image';
var TIMER_INSPECT = 'Inspektera';
var TIMER_SOLVE = 'Lös';
var PROPERTY_USEMOUSE = 'Använd mustimer';
var PROPERTY_TIMEU = 'Timeruppdateringen är';
var PROPERTY_TIMEU_STR = 'uppdatera|0.1s|sekunder|inspektion|ingen';
var PROPERTY_PRETIME = 'Tid för att hålla mellanslagstangenten nere(sekund(er))';
var PROPERTY_ENTERING = 'Ange tider med';
var PROPERTY_ENTERING_STR = 'timer|mata in|stackmat|MoYu timer|virtuell|Bluetooth Cube|qCube|Bluetooth Timer|last layer training';
var PROPERTY_INTUNIT = 'Enhet vid inmatning av heltal';
var PROPERTY_INTUNIT_STR = 'sekund|centisekund|millisekund';
var PROPERTY_COLOR = 'Välj färgtema';
var PROPERTY_COLORS = 'teckensnitt färg|bakgrunden färg|styrelsen färg|knappen färg|länk färg|Logo färg|logotyp bakgrund färg';
var PROPERTY_VIEW = 'UI stil är';
var PROPERTY_VIEW_STR = 'Auto|Mobil|Dator';
var PROPERTY_UIDESIGN = 'UI design är';
var PROPERTY_UIDESIGN_STR = 'Normal|Materialdesign|Normal m/u skuggor|Materialdesign m/u skuggor';
var COLOR_EXPORT = 'Vänligen spara strängen för importering';
var COLOR_IMPORT = 'Vänligen ange strängen som ska exporteras';
var COLOR_FAIL = 'Felaktig data, importering misslyckad';
var PROPERTY_FONTCOLOR_STR = 'Svart|Vit';
var PROPERTY_COLOR_STR = 'manuell|importera/exportera...|random|stil1|stil2|stil3|svart|vit|stil6|soliserat mörkt|soliserat ljus';
var PROPERTY_FONT = 'Timerns teckensnitt';
var PROPERTY_FONT_STR = 'slumpmässig digital|normal|digital1|digital2|digital3|digital4|digital5';
var PROPERTY_FORMAT = 'Tidsformat';
var PROPERTY_USEKSC = 'använd tangentborsgenväg';
var PROPERTY_USEGES = 'use gesture control';
var PROPERTY_NTOOLS = 'Antal verktyg';
var PROPERTY_AHIDE = 'Göm allt när timern tar tid';
var SCRAMBLE_LAST = 'senaste';
var SCRAMBLE_NEXT = 'nästa';
var SCRAMBLE_SCRAMBLE = ' blandning';
var SCRAMBLE_SCRAMBLING = 'Scrambling';
var SCRAMBLE_LENGTH = 'längd';
var SCRAMBLE_INPUT = 'Mata in Blandning(ar)';
var SCRAMBLE_INPUTTYPE = 'Scramble type';
var PROPERTY_VRCSPEED = 'VRC bashastighet (tps)';
var PROPERTY_VRCORI = 'Virtual cube orientation';
var PROPERTY_VRCMP = 'Flera faser';
var PROPERTY_VRCMPS = 'Ingen|CFOP|CF+OP|CFFFFOP|CFFFFOOPP|Roux';
var PROPERTY_GIIKERVRC = 'Visa virtuell Giiker cube';
var PROPERTY_GIISOK_DELAY = 'Markera blandad om stannat på blandat i antal sekunder';
var PROPERTY_GIISOK_DELAYS = '2s|3s|4s|5s|Aldrig|Korrekt blandat';
var PROPERTY_GIISOK_KEY = 'Markera blandad med mellanslagstangenten';
var PROPERTY_GIISOK_MOVE = 'Markera blandad genom att göra';
var PROPERTY_GIISOK_MOVES = 'U4, R4, etc|(U U\')2, (U\' U)2, etc|Never';
var PROPERTY_GIISBEEP = 'Pip när blandning markeras';
var PROPERTY_GIIRST = 'Återställ Giiker cube när den är ansluten';
var PROPERTY_GIIRSTS = 'Alltid|Prompt|Aldrig';
var PROPERTY_GIIMODE = 'Bluetooth Cube Mode';
var PROPERTY_GIIMODES = 'Normal|Training|Continuous training';
var PROPERTY_VRCAH = 'Useless pieces in huge cube';
var PROPERTY_VRCAHS = 'Hide|Border|Color|Show';
var CONFIRM_GIIRST = 'Återställ Giiker cube när den är löst?';
var PROPERTY_GIIAED = 'Automatisk identifiering av maskinvarufel';
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
		['Pyraminx', "pyrso", -10],
		['Skewb', "skbso", 0],
		['sq1', "sqrs", 0],
		['4x4 bld', "444bld", -40],
		['5x5 bld', "555bld", -60],
		['3x3 mbld', "r3ni", 5]
	]],
	['Mata in', [
		['Extern', "input", 0],
		['Tävling', "remoteComp", 0],
		['Online battle', "remoteBattle", 0],
		['Remote', "remoteOther", 0]
	]],
	['===WCA===', [
		['--', "blank", 0]
	]],
	['3x3x3', [
		["Slumpmässigt tillstånd (WCA)", "333", 0],
		['Slumpmässigt drag', "333o", 25],
		['3x3x3 för nybörjare', "333noob", 25],
		['endast kanter', "edges", 0],
		['endast hörn', "corners", 0],
		['BLD Helper', "nocache_333bldspec", 0],
		['Pattern Tool', "nocache_333patspec", 0],
		['3x3 ft', "333ft", 0],
		['Custom', "333custom", 0]
	]],
	['3x3x3 CFOP', [
		['PLL', "pll", 0],
		['OLL', "oll", 0],
		['sista f2l paret + sista lagret', "lsll2", 0],
		['sista lagret', "ll", 0],
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
		['korset löst', "f2l", 0],
		['EOLine', "eoline", 0],
		['EO Cross', "eocross", 0],
		['enkelt kors', "easyc", 3],
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
		["Slumpmässigt tillstånd (WCA)", "222so", 0],
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
		['Ingen bar', "222nb", 0]
	]],
	['4x4x4', [
		["WCA", "444wca", -40],
		['slumpmässigt drag', "444m", 40],
		['Tecken', "444", 40],
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
		['Tecken', "555", 60],
		['5x5x5 kanter', "5edge", 8]
	]],
	['6x6x6', [
		["WCA", "666wca", 80],
		['Tecken', "666si", 80],
		['prefix', "666p", 80],
		['suffix', "666s", 80],
		['6x6x6 kanter', "6edge", 8]
	]],
	['7x7x7', [
		["WCA", "777wca", 100],
		['Tecken', "777si", 100],
		['prefix', "777p", 100],
		['suffix', "777s", 100],
		['7x7x7 kanter', "7edge", 8]
	]],
	['Clock', [
		['WCA', "clkwca", 0],
		['wca (old)', "clkwcab", 0],
		['WCA w/o y2', "clknf", 0],
		['jaap', "clk", 0],
		['Optimal', "clko", 0],
		['koncis', "clkc", 0],
		['effektiv pinordning', "clke", 0]
	]],
	['Megaminx', [
		["WCA", "mgmp", 70],
		['Morot', "mgmc", 70],
		['gammal stil', "mgmo", 70],
		['2-generator R,U', "minx2g", 30],
		['sista f2l paret + sista lagret', "mlsll", 0],
		['PLL', "mgmpll", 0],
		['Last Layer', "mgmll", 0]
	]],
	['Pyraminx', [
		["Slumpmässigt tillstånd (WCA)", "pyrso", 10],
		['Optimal', "pyro", 0],
		['Slumpmässigt drag', "pyrm", 25],
		['L4E', "pyrl4e", 0],
		['4 tips', "pyr4c", 0],
		['No bar', "pyrnb", 0]
	]],
	['Skewb', [
		["Slumpmässigt tillstånd (WCA)", "skbso", 0],
		['Optimal', "skbo", 0],
		['Slumpmässigt drag', "skb", 25],
		['No bar', "skbnb", 0]
	]],
	['Square-1', [
		["Slumpmässigt tillstånd (WCA)", "sqrs", 0],
		["CSP", "sqrcsp", 0],
		["PLL", "sq1pll", 0],
		['face turn metric', "sq1h", 40],
		['twist metric', "sq1t", 20]
	]],
	['===Annat===', [
		['--', "blank", 0]
	]],
	['15 pussel', [
		['Slumpmässigt tillstånd URLD', "15prp", 0],
		['Slumpmässigt tillstånd ^<>v', "15prap", 0],
		['Slumpmässigt tillstånd Blank', "15prmp", 0],
		['Slumpmässigt drag URLD', "15p", 80],
		['Slumpmässigt drag ^<>v', "15pat", 80],
		['Slumpmässigt drag Blank', "15pm", 80]
	]],
	['8 puzzle', [
		['Slumpmässigt tillstånd URLD', "8prp", 0],
		['Slumpmässigt tillstånd ^<>v', "8prap", 0],
		['Slumpmässigt tillstånd Blank', "8prmp", 0]
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
		['Slumpmässigt tillstånd', "gearso", 0],
		['Optimal', "gearo", 0],
		['Slumpmässigt drag', "gear", 10]
	]],
	['Kilominx', [
		['Slumpmässigt tillstånd', "klmso", 0],
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
		['Slumpmässigt tillstånd', "rediso", 0],
		['MoYu', "redim", 8],
		['Slumpmässigt drag', "redi", 20]
	]],
	['Dino Cube', [
		['Slumpmässigt tillstånd', "dinoso", 0],
		['Optimal', "dinoo", 0]
	]],
	['Ivy cube', [
		['Slumpmässigt tillstånd', "ivyso", 0],
		['Optimal', "ivyo", 0],
		['Slumpmässigt drag', "ivy", 10]
	]],
	['Master Pyraminx', [
		['Slumpmässigt tillstånd', "mpyrso", 0],
		['Slumpmässigt drag', "mpyr", 42]
	]],
	['Pyraminx Crystal', [
		['Pochmann', "prcp", 70],
		['gammal stil', "prco", 70]
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
		['Jaap stil', "ufo", 25]
	]],
	['FTO (Face-Turning Octahedron)', [
		['Slumpmässigt tillstånd', "ftoso", 0],
		['Slumpmässigt drag', "fto", 30],
		['L3T', "ftol3t", 0],
		['L3T+LBT', "ftol4t", 0],
		['TCP', "ftotcp", 0],
		['edges only', "ftoedge", 0],
		['centers only', "ftocent", 0],
		['corners only', "ftocorn", 0],
		['Diamond Slumpmässigt tillstånd', "dmdso", 0]
	]],
	['Icosahedron', [
		['Icosamate Slumpmässigt drag', "ctico", 60]
	]],
	['===SPECIELLA===', [
		['--', "blank", 0]
	]],
	['3x3x3 subsets', [
		['2-generator R,U', "2gen", 0],
		['2-generator L,U', "2genl", 0],
		['Roux-generator M,U', "roux", 0],
		['3-generator F,R,U', "3gen_F", 0],
		['3-generator R,U,L', "3gen_L", 0],
		['3.generator R,r,U', "RrU", 0],
		['Domino Subgroup', "333drud", 0],
		['endast halva drag', "half", 0],
		['sista f2l paret + sista lagret (gammal)', "lsll", 15]
	]],
	['Bandaged Cube', [
		['Bicube', "bic", 30],
		['Square-1 /,(1,0)', "bsq", 25]
	]],
	['Relays', [
		['massor av 3x3x3', "r3", 5],
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
	['===SKÄMT===', [
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
	['vrid den övre sidan', 'vrid den undre sidan'],
	['vrid den högra sidan', 'vrid den vänstra sidan'],
	['vrid den främsta sidan', 'vrid den bakre sidan']
];
var SCRAMBLE_NOOBSS = ' medurs med 90 grader,| moturs med 90 grader,| med 180 grader';
var SCROPT_TITLE = 'Scramble Options';
var SCROPT_BTNALL = 'Full';
var SCROPT_BTNNONE = 'Clear';
var SCROPT_EMPTYALT = 'Please select at least one case';
var STATS_CFM_RESET = 'Återställ alla tider i den här sessionen?';
var STATS_CFM_DELSS = 'Ta bort sessioner [%s]?';
var STATS_CFM_DELMUL = 'Antalet borttagna värden från nuvarande Index?';
var STATS_CFM_DELETE = 'Ta bort den här tiden?';
var STATS_COMMENT = 'Kommentar';
var STATS_REVIEW = 'Granksa';
var STATS_DATE = 'Datum';
var STATS_SSSTAT = 'Lösningens statistik';
var STATS_SSRETRY = 'Retry';
var STATS_CURROUND = 'Nuvarande rundas statistik';
var STATS_CURSESSION = 'Nuvarande sessionsstatistik';
var STATS_CURSPLIT = 'Fas %d av nuvarande sessionsstatistik';
var STATS_EXPORTCSV = 'Exportera CSV';
var STATS_SSMGR_TITLE = 'Sessionshanterare';
var STATS_SSMGR_NAME = 'Namn';
var STATS_SSMGR_DETAIL = 'Sessionsdetaljer';
var STATS_SSMGR_OPS = 'Döpa|Skapa|Dela|Sammanfoga|Radera|Sort|Merge&Dedupe';
var STATS_SSMGR_ORDER = 'Sortera efter blandning';
var STATS_SSMGR_ODCFM = 'Sortera alla sessioner efter blandning?';
var STATS_SSMGR_SORTCFM = '%d Lösning(ar) kommer att bli omårdnad(e)';
var STATS_ALERTMG = 'Sammanfoga alla tider i sessionen [%f] till slutet av sessionen [%t]?';
var STATS_PROMPTSPL = 'Antal senaste tider delade från sessionen [%s]?';
var STATS_ALERTSPL = 'Bör delas eller lämnas 1 gång';
var STATS_AVG = 'mean';
var STATS_SUM = 'sum';
var STATS_SOLVE = 'lösning';
var STATS_TIME = 'tid';
var STATS_SESSION = 'Session';
var STATS_SESSION_NAME = 'Redigera sessionsnamn';
var STATS_SESSION_NAMEC = 'Namn på den nya sessionen';
var STATS_STRING = 'bästa|nuvarande|sämsta|Genererad av csTimer %Y-%M-%D|lösningar/totalt: %d|enda|mean of %mk|avg of %mk| Average: %v{ (σ = %sgm)}| Mean: %v|Tidslista|löser från %s till %e|Totalt spenderat: %d|target';
var STATS_PREC = 'tidsfördelningsprecision';
var STATS_PREC_STR = 'automatisk|0.1s|0.2s|0.5s|1s|2s|5s|10s|20s|50s|100s';
var STATS_TYPELEN = 'Lista %d typ|Lista %d längd|Average|Mean';
var STATS_STATCLR = 'Aktivera tömning av sessionen';
var STATS_ABSIDX = 'Visa absolut index i statistikrapporten';
var STATS_XSESSION_DATE = 'vilket datum som helst|senaste 24 timmarna|senaste 7 dagarna|senaste 30 dagarna|senaste 365 dagarna';
var STATS_XSESSION_NAME = 'något namn';
var STATS_XSESSION_SCR = 'någon blandning';
var STATS_XSESSION_CALC = 'Kalkyl';
var STATS_RSFORSS = 'Visa statistik. när du klickar lös nummer';
var PROPERTY_PRINTSCR = 'Visa blandning(ar) i statistik';
var PROPERTY_PRINTCOMM = 'print comment(s) in statistics';
var PROPERTY_PRINTDATE = 'Visa lösningens datum i statistik';
var PROPERTY_SUMMARY = 'Visa sammanfattning före tidslistan';
var PROPERTY_IMRENAME = 'Namnge session omedelbart efter skapande';
var PROPERTY_SCR2SS = 'Skapa ny session vid växling av blandningstyp';
var PROPERTY_SS2SCR = 'Återställ blandningstyp vid byte av session';
var PROPERTY_SS2PHASES = 'Återställ flerfastidtagning vid växling av session';
var PROPERTY_STATINV = 'Omvänd tidslista';
var PROPERTY_STATSSUM = 'Show sum in time list';
var PROPERTY_STATTHRES = 'Show target time for session best';
var PROPERTY_STATBPA = 'Show best possible average (BPA)';
var PROPERTY_STATWPA = 'Show worst possible average (WPA)';
var PROPERTY_STATAL = 'Statistiska indikatorer';
var PROPERTY_STATALU = 'Anpassad statistiskindikator';
var PROPERTY_HLPBS = 'Highlight PBs';
var PROPERTY_HLPBS_STR = 'Dark orange as WCA|As link color|Bolder|None';
var PROPERTY_DELMUL = 'Aktivera flera borttagningar';
var PROPERTY_TOOLSFUNC = 'Valda Funktioner';
var PROPERTY_TRIM = 'Antal lösningar trimmade på varje sida';
var PROPERTY_TRIMR = 'Number of solves trimmed at worse side';
var PROPERTY_TRIM_MED = 'Median';
var PROPERTY_STKHEAD = 'Använd Stackmatstatusinformation';
var PROPERTY_TOOLPOS = 'Tools panel position';
var PROPERTY_TOOLPOS_STR = 'Bottom|Float|Top';
var PROPERTY_HIDEFULLSOL = 'Visa lösning proggressivt';
var PROPERTY_IMPPREV = 'Importera icke-senaste data';
var PROPERTY_AUTOEXP = 'Automatisk exportering (per 100 lösningar)';
var PROPERTY_AUTOEXP_OPT = 'Aldrig|Till fil|Med csTimer ID|Med WCA konot|Med Google konot|Alert Only';
var PROPERTY_SCRASIZE = 'Automatisk blandningsstorlek';
var MODULE_NAMES = {
	"kernel": 'Global',
	"ui": 'Display',
	"color": 'Färg',
	"timer": 'Timer',
	"scramble": 'Blandning',
	"stats": 'Statistik',
	"tools": 'Verktyg',
	"vrc": 'Virtuell&<br>Giiker'
};
var BGIMAGE_URL = 'Vänligen skriv in bildens URL';
var BGIMAGE_INVALID = 'Ogiltig URL';
var BGIMAGE_OPACITY = 'Bakgrundsbildens opacitet';
var BGIMAGE_IMAGE = 'Bakgrundsbild';
var BGIMAGE_IMAGE_STR = 'Ingen|Manuell|CCT';
var SHOW_AVG_LABEL = 'Visa average markering';
var SHOW_DIFF_LABEL = 'Show Difference Label';
var SHOW_DIFF_LABEL_STR = '-Green+Red|-Red+Green|Normal|None';
var USE_LOGOHINT = 'Tipsmeddelanden i logotypen';
var TOOLS_SCRGEN = 'Blandningsgenerator';
var SCRGEN_NSCR = 'Antal blandningar';
var SCRGEN_PRE = 'prefix';
var SCRGEN_GEN = 'Generera Blandningar!';
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
