var OK_LANG = 'OK';
var CANCEL_LANG = 'Prekini';
var RESET_LANG = 'Resetiraj';
var ABOUT_LANG = 'Informacije';
var ZOOM_LANG = 'Povećaj';
var BUTTON_TIME_LIST = 'IZLISTAJ<br>VREMENA';
var BUTTON_OPTIONS = 'OPCIJE';
var BUTTON_EXPORT = 'IZVEZI';
var BUTTON_DONATE = 'DONIRAJ';
var PROPERTY_USEINS = 'koristi WCA inspekciju';
var PROPERTY_USEINS_STR = 'Always|Except BLD|Never';
var PROPERTY_VOICEINS = 'glasovno upozorenje za WCA inspekciju: ';
var PROPERTY_VOICEINS_STR = 'bez glasa|muški glas|ženski glas';
var PROPERTY_PHASES = 'višefazno: ';
var PROPERTY_TIMERSIZE = 'veličina štoperice: ';
var PROPERTY_USEMILLI = 'koristi milisekunde';
var PROPERTY_SMALLADP = 'koristi manji font nakon decimalne točke';
var PROPERTY_SCRSIZE = 'veličina scramble-a: ';
var PROPERTY_SCRMONO = 'mono-razmaknut scramble';
var PROPERTY_SCRLIM = 'Ograniči visinu okvira za scramble';
var PROPERTY_SCRALIGN = 'Poravnanje okvira za scramble: ';
var PROPERTY_SCRALIGN_STR = 'centrirano|lijevo|desno';
var EXPORT_DATAEXPORT = 'Uvezi/izvezi podatke';
var EXPORT_TOFILE = 'Izvezi u datoteku';
var EXPORT_FROMFILE = 'Uvezi iz datoteke';
var EXPORT_TOSERV = 'Izvezi na server';
var EXPORT_FROMSERV = 'Uvezi iz servera';
var EXPORT_FROMOTHER = 'Import session(s) from other timers';
var EXPORT_USERID = 'Unesi svoj korisnički račun (samo slova ili brojevi): ';
var EXPORT_INVID = 'Dozvoljena su samo slova ili brojevi!';
var EXPORT_ERROR = 'Dogodile su se neke greške...';
var EXPORT_NODATA = 'Nema pronađenih podataka za navedeni korisnički račun';
var EXPORT_UPLOADED = 'Uspješno preneseno';
var BUTTON_SCRAMBLE = 'SCRA-<br>MBLE';
var BUTTON_TOOLS = 'ALATI';
var IMAGE_UNAVAILABLE = 'Nedostupno za ovaj tip scramble-a';
var TOOLS_SELECTFUNC = 'Funkcija: ';
var TOOLS_CROSS = 'složi križ';
var TOOLS_EOLINE = 'složi EOLine';
var TOOLS_ROUX1 = 'složi Roux S1';
var TOOLS_GIIKER = 'Giiker Cube';
var TOOLS_IMAGE = 'prikaži scramble';
var TOOLS_STATS = 'Statistika';
var TOOLS_DISTRIBUTION = 'distribucija vremena';
var TOOLS_TREND = 'trend vremena';
var TOOLS_METRONOME = 'metronome';
var PROPERTY_IMGSIZE = 'Veličina prikaza scramble-a: ';
var TIMER_INSPECT = 'inspekcija';
var TIMER_SOLVE = 'slaganje';
var PROPERTY_USEMOUSE = 'koristi miš kao štopericu';
var PROPERTY_TIMEU = 'prikaz štoperice je: ';
var PROPERTY_TIMEU_STR = 'normalan|0.1s|sekunde|inspekcija|bez prikaza';
var PROPERTY_PRETIME = 'vrijeme držanja tipke "space" (sekunda/e): ';
var PROPERTY_ENTERING = 'unošenje vremena s/sa ';
var PROPERTY_ENTERING_STR = 'štopericom|utipkavanjem|stackmat štoperica|MoYuTimer|virtualno|Giiker';
var PROPERTY_COLOR = 'odaberi temu: ';
var PROPERTY_COLORS = 'boja fonta: |boja pozadine: |boja ploče: |boja gumba: |boja logotipa: |boja pozadine logotipa: ';
var PROPERTY_VIEW = 'stil korisničkog sučelja je:';
var PROPERTY_VIEW_STR = 'Automatski|Mobilni|Desktop';
var COLOR_EXPORT = 'Spremi string za uvoz: ';
var COLOR_IMPORT = 'Unesi izvezeni string: ';
var COLOR_FAIL = 'Netočni podatci, uvoz neuspješan';
var PROPERTY_FONTCOLOR_STR = 'crno|bijelo';
var PROPERTY_COLOR_STR = 'nasumično|stil1|stil2|stil3|crno|bijelo|stil6|ručno|izvezi...|uvezi...';
var PROPERTY_FONT = 'odaberi font štoperice: ';
var PROPERTY_FONT_STR = 'nasumično digitlni|normalan|digitalni1|digitalni2|digitalni3|digitalni4|digitalni5';
var PROPERTY_FORMAT = 'format vremena: ';
var PROPERTY_USEKSC = 'koristi prečace s tipkovnice';
var PROPERTY_NTOOLS = 'broj alata';
var PROPERTY_AHIDE = 'Sakrij sve elemente dok štoperica mjeri vrijeme';
var SCRAMBLE_LAST = 'prethodni';
var SCRAMBLE_NEXT = 'slijedeći';
var SCRAMBLE_SCRAMBLE = ' scramble';
var SCRAMBLE_LENGTH = 'dužina';
var SCRAMBLE_INPUT = 'Unesi scramble/ove)';
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
		['4x4x4', "444wca", -40],
		['5x5x5', "555wca", -60],
		['2x2x2', "222so", 0],
		['3x3 naslijepo', "333ni", 0],
		['3x3 ojednoručno', "333oh", 0],
		['3x3 najmanje poteza', "333fm", 0],
		['3x3 s nogama', "333ft", 0],
		['megaminx', "mgmp", -70],
		['pyraminx', "pyrso", -10],
		['sq1', "sqrs", 0],
		['clock', "clkwca", 0],
		['skewb', "skbso", 0],
		['6x6x6', "666wca", -80],
		['7x7x7', "777wca", -100],
		['4x4 naslijepo', "444bld", -40],
		['5x5 naslijepo', "555bld", -60],
		['3x3 višestruko naslijepo', "r3ni", 5]
	]],
	['Input', [
		['Eksterno', "input", 0]
	]],
	['===WCA===', [
		['--', "blank", 0]
	]],
	['2x2x2', [
		["WCA", "222so", 0],
		['optimalno nasumično stanje', "222o", 0],
		['3-gen', "2223", 25],
		['EG', "222eg", 0],
		['EG0', "222eg0", 0],
		['EG1', "222eg1", 0],
		['EG2', "222eg2", 0]
	]],
	['3x3x3', [
		["WCA", "333", 0],
		['stari stil', "333o", 25],
		['3x3x3 za noob-ove', "333noob", 25],
		['samo rubni dijelovi', "edges", 0],
		['samo korneri', "corners", 0],
		['zadnji sloj', "ll", 0],
		['zb zadnjeg sloja', "zbll", 0],
		['korneri zadnjeg sloja', "cll", 0],
		['rubni dijelovi zadnjeg sloja', "ell", 0],
		['zadnjih 6 rubnih dijelova', "lse", 0],
		['zadnjih 6 rubnih dijelova&ltM,U&gt', "lsemu", 0],
		['Roux L10P', "cmll", 0],
		['složeni križ', "f2l", 0],
		['zadnji slot + zadnji sloj', "lsll2", 0],
		['2GLL', "2gll", 0],
		['ZBLS', "zbls", 0],
		['ZZLL', "zzll", 0],
		['PLL', "pll", 0],
		['EOLine', "eoline", 0],
		['lagani križ', 'easyc', 3]
	]],
	['4x4x4', [
		["WCA", "444wca", 40],
		['SiGN', "444", 40],
		['nasumično stanje ', "444o", 0],
		['YJ', "444yj", 40],
		['4x4x4 rubni dijelovi', "4edge", 8],
		['R,r,U,u', "RrUu", 40]
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
		['jaap', "clk", 0],
		['wca', "clkwca", 0],
		['optimal', "clko", 0],
		['sažet', "clkc", 0],
		['efektivan red pin-ova', "clke", 0]
	]],
	['Megaminx', [
		["WCA", "mgmp", 70],
		['Carrot', "mgmc", 70],
		['stari stil', "mgmo", 70]
	]],
	['Pyraminx', [
		["WCA", "pyrso", 10],
		['optimalno nasumično stanje', "pyro", 0],
		['nasumični potezi', "pyrm", 25]
	]],
	['Square-1', [
		["WCA", "sqrs", 0],
		['face turn metric', "sq1h", 40],
		['twist metric', "sq1t", 20]
	]],
	['Skewb', [
		["WCA", "skbso", 0],
		['U L R B', "skb", 25]
	]],
	['===OTHER===', [
		['--', "blank", 0]
	]],
	['15 puzzle', [
		['micanje dijelova', "15p", 80],
		['prazni potezi', "15pm", 80]
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
		['nasumično stanje', "gearso", 0],
		['optimalno nasumično stanje', "gearo", 0],
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
		['stari stil', "prco", 70]
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
	['===SPECIAL===', [
		['--', "blank", 0]
	]],
	['3x3x3 subset-ovi', [
		['2-generator R,U', "2gen", 25],
		['2-generator L,U', "2genl", 25],
		['Roux-generator M,U', "roux", 25],
		['3-generator F,R,U', "3gen_F", 25],
		['3-generator R,U,L', "3gen_L", 25],
		['3-generator R,r,U', "RrU", 25],
		['samo polovični potezi', "half", 25],
		['zadnji slot + zadnji sloj (stari stil)', "lsll", 15]
	]],
	['Bandaged Cube', [
		['Bicube', "bic", 30],
		['Square-1 /,(1,0)', "bsq", 25]
	]],
	['Megaminx subsets', [
		['2-generator R,U', "minx2g", 30],
		['zadnji slot + zadnji sloj', "mlsll", 20]
	]],
	['Relays', [
		['puno 3x3x3 kocaka', "r3", 5],
		['234 maraton', "r234", 0],
		['2345 maraton', "r2345", 0],
		['23456 maraton', "r23456", 0],
		['234567 maraton', "r234567", 0]
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
	['okreni gornju stranu', 'okreni donju stranu'],
	['okreni desnu stranu', 'okreni lijevu stranu'],
	['okreni prednju stranu', 'okreni stražnju stranu']
];
var SCRAMBLE_NOOBSS = ' u smjeru kazaljke na satu za 90°,| suprotno smjeru kazaljke na satu za 90°,| za 180°,';
var STATS_CFM_RESET = 'resetiraj sva vremena u ovoj sesiji?';
var STATS_CFM_DELSS = 'obrisati ovu sesiju?';
var STATS_CFM_DELMUL = 'Broj izbrisanih vrijednosti iz trenutnog indeksa?';
var STATS_CFM_DELETE = 'obrisati ovo vrijeme?';
var STATS_COMMENT = 'Komentar:';
var STATS_CURROUND = 'Current Round Statistics';
var STATS_CURSESSION = 'Current Session Statistics';
var STATS_SSMGR_TITLE = 'Session Manager';
var STATS_SSMGR_NAME = 'Name';
var STATS_SSMGR_DETAIL = 'Session Details';
var STATS_SSMGR_OP = 'Operation';
var STATS_AVG = 'srednja vrijednost';
var STATS_SOLVE = 'slaganje';
var STATS_TIME = 'vrijeme';
var STATS_SESSION = 'Sesija';
var STATS_SESSION_NAME = 'Ime sesije';
var STATS_STRING = 'najbolje|trenutno|najgore|Generirao csTimer %Y-%M-%D|slaganja/total: %d|pojedinačno|srednja vrijednost od %mk|prosjek od %mk|Prosjek: %v{ (σ = %sgm)}|Srednja vrijednost: %v|Lista vremena:|solving from %s to %e';
var STATS_PREC = 'preciznost raspona vremena: ';
var STATS_PREC_STR = 'automatska|0.1s|0.2s|0.5s|1s|2s|5s|10s|20s|50s|100s';
var STATS_TYPELEN = 'izlistaj %d tip|izlistaj %d dužinu|prosjek|srednju vrijednost';
var PROPERTY_PRINTSCR = 'ispiši scramble/ove u statistici';
var PROPERTY_PRINTDATE = 'print solving date in statistics';
var PROPERTY_SUMMARY = 'prikaži sažetak prije liste vremena';
var PROPERTY_IMRENAME = 'preimenuj sesiju odmah nakon kreiranja';
var PROPERTY_SCR2SS = 'kreiraj novu sesiju kada se promijeni tip scramble-a';
var PROPERTY_SS2SCR = 'vrati tip scramble-a nakon prebacivanja sesije';
var PROPERTY_SS2PHASES = 'restore multi-phase timing when switching session';
var PROPERTY_STATINV = 'Inverse time list';
var PROPERTY_STATAL = 'Statistički indikatori: ';
var PROPERTY_DELMUL = 'Omogući višestruko brisanje';
var MODULE_NAMES = {
	"ui": 'display',
	"color": 'boja',
	"timer": 'štoperica',
	"vrc": 'virtual&<br>Giiker',
	"kernel": 'globalno',
	"scramble": 'scramble',
	"stats": 'statistika',
	"tools": 'alati'
};
var BGIMAGE_URL = 'unesi url slike';
var BGIMAGE_INVALID = 'nevažeći url';
var BGIMAGE_OPACITY = 'providnost pozadinske slike: ';
var BGIMAGE_IMAGE = 'pozadinska slika: ';
var BGIMAGE_IMAGE_STR = 'ništa|ručno|CCT';
var SHOW_AVG_LABEL = 'Prikaži oznaku prosjeka';
var TOOLS_SCRGEN = 'Generator scramble-ova';
var SCRGEN_NSCR = 'Broj scramble-ova: ';
var SCRGEN_PRE = 'prefiks: ';
var SCRGEN_GEN = 'Generiraj scramble-ove!';