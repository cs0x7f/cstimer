var OK_LANG = 'OK';
var CANCEL_LANG = 'Annuleren';
var RESET_LANG = 'Reset';
var ABOUT_LANG = 'Over';
var ZOOM_LANG = 'Zoom';
var BUTTON_TIME_LIST = 'Lijst<br>Tijden';
var BUTTON_OPTIONS = 'Opties';
var BUTTON_EXPORT = 'EXPORT';
var BUTTON_DONATE = 'DONATE';
var PROPERTY_USEINS = 'Gebruik WCA inspectie';
var PROPERTY_USEINS_STR = 'Always|Except BLD|Never';
var PROPERTY_VOICEINS = 'Stem alarm bij WCA inspection: ';
var PROPERTY_VOICEINS_STR = 'geen|mannelijke stem|vrouwlijke stem';
var PROPERTY_PHASES = 'Meerfasig: ';
var PROPERTY_TIMERSIZE = 'Grootte timer: ';
var PROPERTY_USEMILLI = 'Gebruik milliseconden';
var PROPERTY_SMALLADP = 'Gebruik klein lettertype na de komma';
var PROPERTY_SCRSIZE = 'Grootte scramble: ';
var PROPERTY_SCRMONO = 'Monospace scramble';
var PROPERTY_SCRLIM = 'Limiteer de hoogte van scramble vlak';
var PROPERTY_SCRALIGN = 'Uitlijnen van scramble vlak: ';
var PROPERTY_SCRALIGN_STR = 'midden|links|rechts';
var EXPORT_DATAEXPORT = 'Gegevens Importeren/Exporteren';
var EXPORT_TOFILE = 'Exporteren naar bestand';
var EXPORT_FROMFILE = 'Importeren van bestand';
var EXPORT_TOSERV = 'Exporteren naar server';
var EXPORT_FROMSERV = 'Importeren van server';
var EXPORT_FROMOTHER = 'Import session(s) from other timers';
var EXPORT_USERID = 'Voer aub je account in (alleen letters en cijfers): ';
var EXPORT_INVID = 'Alleen letters en cijfers zijn toegestaan!';
var EXPORT_ERROR = 'Er zijn fouten opgetreden...';
var EXPORT_NODATA = 'Geen gegevens gevonden in je account';
var EXPORT_UPLOADED = 'Succesvol geupload';
var BUTTON_SCRAMBLE = 'SCRA-<br>MBLE';
var BUTTON_TOOLS = 'Hulpmi-<br>ddelen';
var IMAGE_UNAVAILABLE = 'Niet beschikbaar voor dit type scramble';
var TOOLS_SELECTFUNC = 'Functie: ';
var TOOLS_CROSS = 'Los kruis op';
var TOOLS_EOLINE = 'Los EOLine op';
var TOOLS_ROUX1 = 'Los Roux S1 op';
var TOOLS_GIIKER = 'Giiker Cube';
var TOOLS_IMAGE = 'Teken scramble';
var TOOLS_STATS = 'Statistiek';
var TOOLS_DISTRIBUTION = 'Verdeling tijden';
var TOOLS_TREND = 'tijd trend';
var TOOLS_METRONOME = 'metronome';
var TOOLS_CFMTIME = 'Confirm time';
var PROPERTY_IMGSIZE = 'Tekstgrootte scramble: ';
var TIMER_INSPECT = 'Inspectie';
var TIMER_SOLVE = 'Oplossen';
var PROPERTY_USEMOUSE = 'gebruik muis stopwatch';
var PROPERTY_TIMEU = 'Stopwatch update is: ';
var PROPERTY_TIMEU_STR = 'update|0.1s|seconden|inspectie|geen';
var PROPERTY_PRETIME = 'Spatiebalk ingedrukt houden voor (seconde(n)): ';
var PROPERTY_ENTERING = 'Tijden meten met';
var PROPERTY_ENTERING_STR = 'stopwatch|typen|stackmat|MoYuTimer|virtueel|Giiker';
var PROPERTY_COLOR = 'Selecteer kleurenschema: ';
var PROPERTY_COLORS = 'Lettertype kleur: |Kleur achtergrond: |Board kleur: |Kleur knop: |Kleur link: |Kleur logo: |Logo bgkleur: ';
var PROPERTY_VIEW = 'UI style is:';
var PROPERTY_VIEW_STR = 'Auto|Mobile|Desktop';
var COLOR_EXPORT = 'Bewaar aub de tekst voor importeren: ';
var COLOR_IMPORT = 'Bewaar aub de tekst voor exporteren: ';
var COLOR_FAIL = 'Incorrecte gegevens, Importeren Mislukt';
var PROPERTY_FONTCOLOR_STR = 'Zwart|Wit';
var PROPERTY_COLOR_STR = 'Willekeurig|Stijl1|Stijl2|Stijl3|Zwart|Wit|Stijl6|Handmatig|export...|import...';
var PROPERTY_FONT = 'Selecteer lettertype timer: ';
var PROPERTY_FONT_STR = 'Willekeurig digitaal|Normaal|Digitaal1|Digitaal2|Digitaal3|Digitaal4|Digitaal5';
var PROPERTY_FORMAT = 'Tijdsindeling: ';
var PROPERTY_USEKSC = 'Gebruik sneltoetsen';
var PROPERTY_NTOOLS = 'Aantal hulpmiddelen';
var PROPERTY_AHIDE = 'Hide All Elements When Timing';
var SCRAMBLE_LAST = 'Laatste';
var SCRAMBLE_NEXT = 'Volgende';
var SCRAMBLE_SCRAMBLE = ' Scramble';
var SCRAMBLE_LENGTH = 'Lengte';
var SCRAMBLE_INPUT = 'Scramble(s) invoeren';
var PROPERTY_VRCMP = 'multi-phase: ';
var PROPERTY_VRCMPS = 'None|CFOP|CF+OP|CFFFFOP|Roux';
var PROPERTY_GIIKERVRC = 'Show virtual Giiker cube';
var PROPERTY_GIISOK_DELAY = 'Mark scrambled if stay: ';
var PROPERTY_GIISOK_DELAYS = '2s|3s|4s|5s|Never|Correctly scrambled';
var PROPERTY_GIISOK_KEY = 'Mark scrambled with spacebar';
var PROPERTY_GIISOK_MOVE = 'Mark scrambled by doing: ';
var PROPERTY_GIISOK_MOVES = 'U4, R4, etc|(U U\')2, (U\' U)2, etc|Never';
var PROPERTY_GIISBEEP = 'Beep when mark scrambled';
var PROPERTY_GIIRST = 'Reset Giiker cube when connect: ';
var PROPERTY_GIIRSTS = 'Always|Prompt|Never';
var CONFIRM_GIIRST = 'Reset Giiker cube as solved?';
var PROPERTY_GIIAED = 'Auto hardware error detection';
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
		['3x3 ft', "333ft", 0],
		['clock', "clkwca", 0],
		['megaminx', "mgmp", -70],
		['pyraminx', "pyrso", -10],
		['skewb', "skbso", 0],
		['sq1', "sqrs", 0],
		['4x4 bld', "444bld", -40],
		['5x5 bld', "555bld", -60],
		['3x3 mbld', "r3ni", 5]
	]],
	['Invoer', [
		['??', "input", 0]
	]],
	['===WCA===', [
		['--', "blank", 0]
	]],
	['2x2x2', [
		["WCA", "222so", 0],
		['Optimale willekeurige staat', "222o", 0],
		['3-gen', "2223", 25],
		['EG', "222eg", 0],
		['EG0', "222eg0", 0],
		['EG1', "222eg1", 0],
		['EG2', "222eg2", 0]
	]],
	['3x3x3', [
		["WCA", "333", 0],
		['Oude methode', "333o", 25],
		['3x3x3 voor beginners', "333noob", 25],
		['Alleen randen', "edges", 0],
		['Alleen hoeken', "corners", 0],
		['Laatste laag', "ll", 0],
		['ZB laatste laag', "zbll", 0],
		['Hoeken laatste laag', "cll", 0],
		['Randen laatste laag', "ell", 0],
		['Laatste zes randen', "lse", 0],
		['Laatste zes randen&ltM,U&gt', "lsemu", 0],
		['Roux L10P', "cmll", 0],
		['Kruis opgelost', "f2l", 0],
		['Laatste slot + laatste laag', "lsll2", 0],
		['2GLL', "2gll", 0],
		['ZBLS', "zbls", 0],
		['ZZLL', "zzll", 0],
		['PLL', "pll", 0],
		['EOLine', "eoline", 0],
		['Makkelijk kruis', 'easyc', 3]
	]],
	['4x4x4', [
		["WCA", "444wca", 40],
		['SiGN', "444", 40],
		['Willekeurige staat', "444o", 0],
		['YJ', "444yj", 40],
		['4x4x4 randen', "4edge", 8],
		['R,r,U,u', "RrUu", 40]
	]],
	['5x5x5', [
		["WCA", "555wca", 60],
		['SiGN', "555", 60],
		['5x5x5 randen', "5edge", 8]
	]],
	['6x6x6', [
		["WCA", "666wca", 80],
		['SiGN', "666si", 80],
		['prefix', "666p", 80],
		['suffix', "666s", 80],
		['6x6x6 randen', "6edge", 8]
	]],
	['7x7x7', [
		["WCA", "777wca", 100],
		['SiGN', "777si", 100],
		['prefix', "777p", 100],
		['suffix', "777s", 100],
		['7x7x7 randen', "7edge", 8]
	]],
	['Clock', [
		['jaap', "clk", 0],
		['wca', "clkwca", 0],
		['optimal', "clko", 0],
		['concise', "clkc", 0],
		['Efficiente knop volgorde', "clke", 0]
	]],
	['Megaminx', [
		["WCA", "mgmp", 70],
		['Carrot', "mgmc", 70],
		['Oude methode', "mgmo", 70]
	]],
	['Pyraminx', [
		["WCA", "pyrso", 10],
		['Optimale willekeurige staat', "pyro", 0],
		['Willekeurige zetten', "pyrm", 25]
	]],
	['Square-1', [
		["WCA", "sqrs", 0],
		['vlak draait metrisch', "sq1h", 40],
		['draai metrisch', "sq1t", 20]
	]],
	['Skewb', [
		["WCA", "skbso", 0],
		['U L R B', "skb", 25]
	]],
	['===OVERIGE===', [
		['--', "blank", 0]
	]],
	['15 puzzle', [
		['Zetten', "15p", 80],
		['Blanko zetten', "15pm", 80]
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
		['11x11x11', "111111", 120]
	]],
	['Gear Cube', [
		['Willekeurige staat', "gearso", 0],
		['Optimale willekeurige staat', "gearo", 0],
		['3-gen', "gear", 10]
	]],
	['Cmetrick', [
		[' ', "cm3", 25]
	]],
	['Cmetrick Mini', [
		[' ', "cm2", 25]
	]],
	['Gigaminx', [
		['Pochmann', "giga", 300]
	]],
	['Helicopter Cube', [
		[' ', "heli", 40]
	]],
	['Redi Cube', [
		['MoYu', "redim", 8],
		['old', "redi", 20]
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
	['Square-2', [
		[' ', "sq2", 20]
	]],
	['Super Floppy', [
		[' ', "sfl", 25]
	]],
	['Super Square-1', [
		['twist metric', "ssq1t", 20]
	]],
	['UFO', [
		['Jaap style', "ufo", 25]
	]],
	['Other', [
		['FTO (Face-Turning Octahedron)', "fto", 25]
	]],
	['===SPECIAAL===', [
		['--', "blank", 0]
	]],
	['3x3x3 subsets', [
		['2-generator R,U', "2gen", 25],
		['2-generator L,U', "2genl", 25],
		['Roux-generator M,U', "roux", 25],
		['3-generator F,R,U', "3gen_F", 25],
		['3-generator R,U,L', "3gen_L", 25],
		['3-generator R,r,U', "RrU", 25],
		['Alleen halve draaien', "half", 25],
		['last slot + last layer (old)', "lsll", 15]
	]],
	['Bandaged Cube', [
		['Bicube', "bic", 30],
		['Square-1 /,(1,0)', "bsq", 25]
	]],
	['Megaminx subsets', [
		['2-generator R,U', "minx2g", 30],
		['last slot + last layer', "mlsll", 20]
	]],
	['Relays', [
		['lots of 3x3x3s', "r3", 5],
		['234 relay', "r234", 0],
		['2345 relay', "r2345", 0],
		['23456 relay', "r23456", 0],
		['234567 relay', "r234567", 0]
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
var STATS_CFM_RESET = 'Herstel alle tijden van deze sessie?';
var STATS_CFM_DELSS = 'Verwijder deze sessie?';
var STATS_CFM_DELMUL = 'Het aantal verwijderde waarden van de huidige index?';
var STATS_CFM_DELETE = 'Deze tijd verwijderen?';
var STATS_COMMENT = 'Opmerking';
var STATS_DATE = 'Date';
var STATS_CURROUND = 'Gegevens actuele ronde';
var STATS_CURSESSION = 'Gegevens actuele sessie';
var STATS_EXPORTCSV = 'Export CSV';
var STATS_SSMGR_TITLE = 'Session Manager';
var STATS_SSMGR_NAME = 'Name';
var STATS_SSMGR_DETAIL = 'Session Details';
var STATS_SSMGR_OP = 'Operation';
var STATS_ALERTMG = 'Merge all times in current session to the end of selected session?';
var STATS_ALERTSPL = 'Number of latest times split from current session?';
var STATS_ALERTSPL = 'Should split or leave 1 time at least';
var STATS_AVG = 'Gemiddelde';
var STATS_SOLVE = 'Opgelost';
var STATS_TIME = 'Tijd';
var STATS_SESSION = 'Sessie';
var STATS_SESSION_NAME = 'Sessie Naam';
var STATS_STRING = 'Beste|Actuele|Slechtste|Gegenereerd door csTimer op %Y-%M-%D|opgelost/totaal: %d|enkele|mean van %mk|avg of %mk|Gemiddelde: %v{ (s = %sgm)}|Mean: %v|Lijst met tijden:|solving from %s to %e';
var STATS_PREC = 'precisie tijdsverdeling: ';
var STATS_PREC_STR = 'auto|0.1s|0.2s|0.5s|1s|2s|5s|10s|20s|50s|100s';
var STATS_TYPELEN = 'lijst %d type|lijst %d lengte|average|mean';
var PROPERTY_PRINTSCR = 'afdrukken scramble(s) in statistieken';
var PROPERTY_PRINTDATE = 'print solving date in statistics';
var PROPERTY_SUMMARY = 'samenvatting tonen voor tijdlijst';
var PROPERTY_IMRENAME = 'hernoem sessie direct na aanmaken';
var PROPERTY_SCR2SS = 'maak nieuwe sessie bij wisselen van scramble type';
var PROPERTY_SS2SCR = 'herstel scramble tytpe bij wisselen van sessie';
var PROPERTY_SS2PHASES = 'herstel multi-fase tijdmeting bij wisselen van sessie';
var PROPERTY_STATINV = 'Omgekeerde tijdenlijst';
var PROPERTY_STATAL = 'Statistische indicatoren: ';
var PROPERTY_DELMUL = 'Inschakelen meervoudige verwijdering';
var MODULE_NAMES = {
	"ui": 'display',
	"color": 'Kleur',
	"timer": 'Timer',
	"vrc": 'virtual&<br>Giiker',
	"kernel": 'Global',
	"scramble": 'scramble',
	"stats": 'Statistiek',
	"tools": 'Hulpmiddelen'
};
var BGIMAGE_URL = 'Voer URL in';
var BGIMAGE_INVALID = 'Ongeldige URL';
var BGIMAGE_OPACITY = 'Transparantie achtergrondafbeelding: ';
var BGIMAGE_IMAGE = 'Achtergrondafbeelding: ';
var BGIMAGE_IMAGE_STR = 'Geen|Automatischl|CCT';
var SHOW_AVG_LABEL = 'Toon gemiddelde';
var USE_LOGOHINT = 'Hint messages in logo';
var TOOLS_SCRGEN = 'ScrambleGenerator';
var SCRGEN_NSCR = 'Aantal scrambles: ';
var SCRGEN_PRE = 'prefix: ';
var SCRGEN_GEN = 'Genereer scrambles!';
