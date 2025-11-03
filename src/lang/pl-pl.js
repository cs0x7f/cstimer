var OK_LANG = 'OK';
var CANCEL_LANG = 'Anuluj';
var RESET_LANG = 'Resetuj';
var ABOUT_LANG = 'O nas';
var ZOOM_LANG = 'Zbliż';
var COPY_LANG = 'Kopiuj';
var BUTTON_TIME_LIST = 'LISTA<br>CZASÓW';
var BUTTON_OPTIONS = 'OPCJE';
var BUTTON_EXPORT = 'EKSPORTUJ';
var BUTTON_DONATE = 'DAROWIZNA';
var PROPERTY_SR = 'Dla sesji';
var PROPERTY_USEINS = 'użyj inspekcji WCA';
var PROPERTY_USEINS_STR = 'Always (down)|Always (up)|Except BLD (down)|Except BLD (up)|Never';
var PROPERTY_SHOWINS = 'Pokaż ikonę, gdy inspekcja jest włączona';
var PROPERTY_VOICEINS = 'ostrzeżenie głosowe inspekcji WCA';
var PROPERTY_VOICEINS_STR = 'brak|męski głos|żeński głos';
var PROPERTY_VOICEVOL = 'Głośność głosu';
var PROPERTY_PHASES = 'wielofazowe';
var PROPERTY_TIMERSIZE = 'rozmiar timera';
var PROPERTY_USEMILLI = 'użyj milisekund';
var PROPERTY_SMALLADP = 'używaj małej czcionki dla części dziesiętnych';
var PROPERTY_SCRSIZE = 'wielkość scramble\'a';
var PROPERTY_SCRMONO = 'Algorytm mieszania o stałej szerokości znaków';
var PROPERTY_SCRLIM = 'Limit wysokości pola ze scramblem';
var PROPERTY_SCRALIGN = 'Wyrównanie tekstu w polu mieszania';
var PROPERTY_SCRALIGN_STR = 'Środek|Lewa|Prawa';
var PROPERTY_SCRWRAP = 'Scramble Wrap';
var PROPERTY_SCRWRAP_STR = 'Balanced|Normal';
var PROPERTY_SCRNEUT = 'Kolor neutralny';
var PROPERTY_SCRNEUT_STR = 'Nic|Jedna ścianka|Dwie ścianki|Sześć ścianek';
var PROPERTY_SCREQPR = 'Probabilities for training-scramble states';
var PROPERTY_SCREQPR_STR = 'Actual|Equal|Random order';
var PROPERTY_SCRFAST = 'Używanie szybkiego algorytmu mieszającego dla 4x4x4 (nieoficjalny)';
var PROPERTY_SCRKEYM = 'Oznacz kluczowe ruchy w scramble\'u';
var PROPERTY_SCRCLK = 'Akcja po kliknięciu na scramble';
var PROPERTY_SCRCLK_STR = 'Brak|Kopiuj|Następny scramble';
var PROPERTY_WNDSCR = 'Styl wyświetlania panelu mieszania';
var PROPERTY_WNDSTAT = 'Styl wyświetlania panelu statystyk';
var PROPERTY_WNDTOOL = 'Styl wyświetlania panelu narzędzi';
var PROPERTY_WND_STR = 'Normalny|Przeźroczysty';
var EXPORT_DATAEXPORT = 'Importuj/Eksportuj zapisane dane';
var EXPORT_TOFILE = 'Eksportuj do pliku';
var EXPORT_FROMFILE = 'Importuj z pliku';
var EXPORT_TOSERV = 'Eksportuj do serwera';
var EXPORT_FROMSERV = 'Importuj ze serwera';
var EXPORT_FROMOTHER = 'Importuj czasy z innego timera';
var EXPORT_USERID = 'Proszę wprowadzić swoje konto (tylko litery i cyfry)';
var EXPORT_INVID = 'Dozwolone tylko litery alfabetu i cyfry!';
var EXPORT_ERROR = 'Wystąpił błąd...';
var EXPORT_NODATA = 'Na twoim koncie nie ma danych';
var EXPORT_UPLOADED = 'Przesyłanie zakończone powodzeniem';
var EXPORT_CODEPROMPT = 'Zapisz ten kod, lub wpisz zapisany kod do importu';
var EXPORT_ONLYOPT = 'Importuj/Eksportuj ustawienia';
var EXPORT_ACCOUNT = 'Eksportuj konto';
var EXPORT_LOGINGGL = 'Zaloguj się przy użyciu konta Google';
var EXPORT_LOGINWCA = 'Zaloguj się przy użyciu konta WCA';
var EXPORT_LOGOUTCFM = 'Czy na pewno chcesz się wylogować?';
var EXPORT_LOGINAUTHED = 'Autoryzowano<br>Pobierania danych...';
var EXPORT_AEXPALERT = 'More than %d solves since last backup';
var EXPORT_WHICH = 'Masz %d plik/i/ów, który powinien zostać zaimportowany?';
var EXPORT_WHICH_ITEM = '%s solve(s), uploaded at %t';
var IMPORT_FINAL_CONFIRM = 'To spowoduje to nadpisanie wszystkich lokalnych danych! Zmodyfikuje to sesje %d, doda %a i usunie %r rozwiązań. Potwierdzasz importowanie danych?';
var BUTTON_SCRAMBLE = 'POMIE-<br>SZAJ';
var BUTTON_TOOLS = 'NARZĘDZIA';
var IMAGE_UNAVAILABLE = 'Niedostępne dla tego typu scrambla';
var TOOLS_SELECTFUNC = 'Funkcja';
var TOOLS_CROSS = 'krzyżyk';
var TOOLS_EOLINE = 'EOLine';
var TOOLS_ROUX1 = 'Roux S1';
var TOOLS_222FACE = '2x2x2 bok';
var TOOLS_GIIKER = 'Kostka Bluetooth';
var TOOLS_IMAGE = 'Narysuj algorytm mieszający';
var TOOLS_STATS = 'Statystyki';
var TOOLS_HUGESTATS = 'Statystyki międzysesji';
var TOOLS_DISTRIBUTION = 'Rozkład czasu';
var TOOLS_TREND = 'trend czasowy';
var TOOLS_METRONOME = 'Metronom';
var TOOLS_RECONS = 'Rekonstrukcja';
var TOOLS_RECONS_NODATA = 'Nie znaleziono rozwiązania.';
var TOOLS_RECONS_TITLE = 'insp|exec|turn|tps';
var TOOLS_TRAINSTAT = 'Statystyki treningowe';
var TOOLS_BLDHELPER = 'Pomoc do blinda';
var TOOLS_CFMTIME = 'Potwierdź czas';
var TOOLS_SOLVERS = 'Rozwiązujący';
var TOOLS_DLYSTAT = 'Statystyki Dnia';
var TOOLS_DLYSTAT1 = 'Period|Start of Day|Week';
var TOOLS_DLYSTAT_OPT1 = 'dzień|tydzień|miesiąc|rok';
var TOOLS_DLYSTAT_OPT2 = 'Niedz|Pon|Wt|Śr|Czw|Pt|Sob';
var TOOLS_SYNCSEED = 'Pospolity Scramble';
var TOOLS_SYNCSEED_SEED = 'Seed';
var TOOLS_SYNCSEED_INPUT = 'Wprowadź Seed';
var TOOLS_SYNCSEED_30S = 'Użyj 30s seeda';
var TOOLS_SYNCSEED_HELP = 'Jeśli włączone, scramble będzie zależeć tylko od ustawień seeda i scramble\'a.';
var TOOLS_SYNCSEED_DISABLE = 'Wyłączyć bieżący seed?';
var TOOLS_SYNCSEED_INPUTA = 'Wprowadź seeda (a-zA-Z0-9)';
var TOOLS_BATTLE = 'Bitwa online';
var TOOLS_BATTLE_HEAD = 'Pokój|Dołącz do Pokoju';
var TOOLS_BATTLE_TITLE = 'Ranking|Status|Czas';
var TOOLS_BATTLE_STATUS = 'Gotowy|Inspekcja|Układa|Ułożył|Przegrał';
var TOOLS_BATTLE_INFO = 'Dołącz do pokoju bitewnego ze swoim przyjacielem, wtedy będziesz walczyć razem.';
var TOOLS_BATTLE_JOINALERT = 'Wprowadź identyfikator pokoju';
var TOOLS_BATTLE_LEAVEALERT = 'Opuść bieżący pokój';
var OLCOMP_UPDATELIST = 'Zaktualizuj listę zawodów';
var OLCOMP_VIEWRESULT = 'Pokaż wyniki';
var OLCOMP_VIEWMYRESULT = 'Moja historia';
var OLCOMP_START = 'Start!';
var OLCOMP_SUBMIT = 'Zatwierdź!';
var OLCOMP_SUBMITAS = 'Prześlij jako: ';
var OLCOMP_WCANOTICE = 'Przesłać przy użyciu twojego konta WCA? (Zaloguj się ponownie, jeśli nie zostanie rozpoznane po przesłaniu)';
var OLCOMP_OLCOMP = 'Zawody online';
var OLCOMP_ANONYM = 'Anonim';
var OLCOMP_ME = 'Ja';
var OLCOMP_WCAACCOUNT = 'Konto WCA';
var OLCOMP_ABORT = 'Przerwać konkurencję i pokazać wyniki?';
var OLCOMP_WITHANONYM = 'Z anonimowym użytkownikiem ';
var PROPERTY_IMGSIZE = 'Rozmiar grafiki algorytmu mieszającego';
var PROPERTY_IMGREP = 'Pokaż animacje kostki wirtualnej, po kliknięciu w zdjęcie scrambla';
var TIMER_INSPECT = 'inspekcja';
var TIMER_SOLVE = 'układanie';
var PROPERTY_USEMOUSE = 'Używaj minutnika myszką i klawiaturą';
var PROPERTY_TIMEU = 'Aktualizacja czasu jest';
var PROPERTY_TIMEU_STR = 'aktualizacja|0.1s|sekunda|inspekcja|brak';
var PROPERTY_PRETIME = 'Czas trzymania spacji (sekundy)';
var PROPERTY_ENTERING = 'wprowadzanie czasów poprzez';
var PROPERTY_ENTERING_STR = 'timer|wprowadź czas|stackmat|MoYuTimer|virtual|Bluetooth Cube|qCube|Bluetooth Timer|last layer training';
var PROPERTY_INTUNIT = 'Jednostka przy wstawaniu liczby całkowitej';
var PROPERTY_INTUNIT_STR = 'sekundy|setne sekundy|milisekundy';
var PROPERTY_COLOR = 'wybierz kolor motywu';
var PROPERTY_COLORS = 'kolor tekstu|kolor tła|kolor tablicy|kolor przycisków|kolor odnośników|kolor logo|kolor tła logo';
var PROPERTY_VIEW = 'Styl interfejsu';
var PROPERTY_VIEW_STR = 'Automatyczny|Mobilny|Komputer';
var PROPERTY_UIDESIGN = 'Styl interfejsu użytkownika: ';
var PROPERTY_UIDESIGN_STR = 'Normalny|Material design|Normalny bez cieniów|Material design bez cieniów';
var COLOR_EXPORT = 'Proszę zapisać tekst do importu';
var COLOR_IMPORT = 'Wprowadź dane do importu';
var COLOR_FAIL = 'Nieprawidłowe dane, import nie powiódł się';
var PROPERTY_FONTCOLOR_STR = 'czarny|biały';
var PROPERTY_COLOR_STR = 'własny|import/eksport...|losowy|style1|style2|style3|czarny|biały|style6|ciemny|jasny';
var PROPERTY_FONT = 'wybierz czcionkę timera';
var PROPERTY_FONT_STR = 'cyfra losowa|normalna|cyfrowa1|cyfrowa2|cyfrowa3|cyfrowa4|cyfrowa5';
var PROPERTY_FORMAT = 'format czasu';
var PROPERTY_USEKSC = 'użyj skrótu klawiszowego';
var PROPERTY_USEGES = 'Użyj sterowania gestami';
var PROPERTY_NTOOLS = 'liczba narzędzi';
var PROPERTY_AHIDE = 'Ukryj wszystkie elementy podczas układania';
var SCRAMBLE_LAST = 'ostatni';
var SCRAMBLE_NEXT = 'następny';
var SCRAMBLE_SCRAMBLE = ' scramble';
var SCRAMBLE_SCRAMBLING = 'Mieszanie';
var SCRAMBLE_LENGTH = 'długość';
var SCRAMBLE_INPUT = 'Wprowadź algorytm(y) mieszania';
var SCRAMBLE_INPUTTYPE = 'Typ pomieszania';
var PROPERTY_VRCSPEED = 'Prędkość bazowa VRC (tps)';
var PROPERTY_VRCORI = 'Wirtualna orientacja kostki';
var PROPERTY_VRCMP = 'wielofazowe';
var PROPERTY_VRCMPS = 'None|CFOP|CF+OP|CFFFFOP|CFFFFOOPP|Roux';
var PROPERTY_GIIKERVRC = 'Pokaż wirtualną kostkę bluetooth';
var PROPERTY_GIISOK_DELAY = 'Oznacz jako pomieszany po bezruchu';
var PROPERTY_GIISOK_DELAYS = '2s|3s|4s|5s|Nigdy|Prawidłowo pomieszany';
var PROPERTY_GIISOK_KEY = 'Oznacz jako pomieszane po wciśnięciu spacji';
var PROPERTY_GIISOK_MOVE = 'Oznacz jako pomieszane, po wykonaniu ruchu';
var PROPERTY_GIISOK_MOVES = 'U4, R4, itp|(U U\')2, (U\' U)2, itp|Nigdy';
var PROPERTY_GIISBEEP = 'Sygnał dźwiękowy, kiedy pomieszano';
var PROPERTY_GIIRST = 'Zresetuj kostkę bluetooth podczas podłączenia';
var PROPERTY_GIIRSTS = 'Zawsze|Odrazu|Nigdy';
var PROPERTY_GIIMODE = 'Tryb kostki bluetooth';
var PROPERTY_GIIMODES = 'Normal|Training|Continuous training';
var PROPERTY_VRCAH = 'Bezużyteczne części w dużej kostce';
var PROPERTY_VRCAHS = 'Hide|Border|Color|Show';
var CONFIRM_GIIRST = 'Zresetuj kostkę bluetooth podczas podłączenia?';
var PROPERTY_GIIAED = 'Automatyczne wykrywanie błędów sprzętowych';
var scrdata = [
	['WCA', [
		['3x3x3', "333", 0],
		['2x2x2', "222so", 0],
		['4x4x4', "444wca", -40],
		['5x5x5', "555wca", -60],
		['6x6x6', "666wca", -80],
		['7x7x7', "777wca", -100],
		['3x3x3 bez patrzenia', "333ni", 0],
		['3x3x3 FM', "333fm", 0],
		['3x3x3 jedną ręką', "333oh", 0],
		['clock', "clkwca", 0],
		['megaminx', "mgmp", -70],
		['pyraminx', "pyrso", -10],
		['skewb', "skbso", 0],
		['square-1', "sqrs", 0],
		['4x4x4 bez patrzenia', "444bld", -40],
		['5x5x5 bez patrzenia', "555bld", -60],
		['3x3x3 wiele kostek bez patrzenia', "r3ni", 5]
	]],
	['Wprowadź', [
		['Zewnętrzny', "input", 0],
		['Zawody', "remoteComp", 0],
		['Bitwa online', "remoteBattle", 0],
		['Remote', "remoteOther", 0]
	]],
	['===WCA===', [
		['--', "blank", 0]
	]],
	['3x3x3', [
		["stan losowy (WCA)", "333", 0],
		['losowy ruch', "333o", 25],
		['3x3x3 dla noobów', "333noob", 25],
		['tylko krawędzie', "edges", 0],
		['tylko narożniki', "corners", 0],
		['Pomoc do blinda', "nocache_333bldspec", 0],
		['Pattern Tool', "nocache_333patspec", 0],
		['3x3x3 stopami', "333ft", 0],
		['Własny', "333custom", 0]
	]],
	['3x3x3 CFOP', [
		['PLL', "pll", 0],
		['OLL', "oll", 0],
		['ostatni para + ostatnia warstwa', "lsll2", 0],
		['ostatnia warstwa', "ll", 0],
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
		['krzyż ułożony', "f2l", 0],
		['EOLine', "eoline", 0],
		['EO Cross', "eocross", 0],
		['łatwy krzyż', "easyc", 3],
		['Łatwy xcross', "easyxc", 4]
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
		["stan losowy (WCA)", "222so", 0],
		['optymalny', "222o", 0],
		['3-gen', "2223", 25],
		['EG', "222eg", 0],
		['CLL', "222eg0", 0],
		['EG1', "222eg1", 0],
		['EG2', "222eg2", 0],
		['TCLL+', "222tcp", 0],
		['TCLL-', "222tcn", 0],
		['TCLL', "222tc", 0],
		['LS', "222lsall", 0],
		['Brak paska', "222nb", 0]
	]],
	['4x4x4', [
		["WCA", "444wca", -40],
		['losowe ruchy', "444m", 40],
		['SiGN', "444", 40],
		['YJ', "444yj", 40],
		['4x4x4 krawędzie', "4edge", 0],
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
		['5x5x5 krawędzie', "5edge", 8]
	]],
	['6x6x6', [
		["WCA", "666wca", 80],
		['SiGN', "666si", 80],
		['prefiks', "666p", 80],
		['suffix', "666s", 80],
		['6x6x6 krawędzie', "6edge", 8]
	]],
	['7x7x7', [
		["WCA", "777wca", 100],
		['SiGN', "777si", 100],
		['prefiks', "777p", 100],
		['suffix', "777s", 100],
		['7x7x7 krawędzie', "7edge", 8]
	]],
	['Zegar', [
		['WCA', "clkwca", 0],
		['wca (old)', "clkwcab", 0],
		['WCA w/o y2', "clknf", 0],
		['jaap', "clk", 0],
		['optymalny', "clko", 0],
		['concise', "clkc", 0],
		['efektywna kolejność pinów', "clke", 0]
	]],
	['Megaminx', [
		["WCA", "mgmp", 70],
		['Marchew', "mgmc", 70],
		['stary styl', "mgmo", 70],
		['tylko ruchy R,U', "minx2g", 30],
		['ostatni para + ostatnia warstwa', "mlsll", 0],
		['PLL', "mgmpll", 0],
		['Last Layer', "mgmll", 0]
	]],
	['Pyraminx', [
		["stan losowy (WCA)", "pyrso", 10],
		['optymalny', "pyro", 0],
		['losowy ruch', "pyrm", 25],
		['L4E', "pyrl4e", 0],
		['4 tips', "pyr4c", 0],
		['No bar', "pyrnb", 0]
	]],
	['Skewb', [
		["stan losowy (WCA)", "skbso", 0],
		['optymalny', "skbo", 0],
		['losowy ruch', "skb", 25],
		['No bar', "skbnb", 0]
	]],
	['Square-1', [
		["stan losowy (WCA)", "sqrs", 0],
		["CSP", "sqrcsp", 0],
		["PLL", "sq1pll", 0],
		['face turn metric', "sq1h", 40],
		['twist metric', "sq1t", 20]
	]],
	['===INNE===', [
		['--', "blank", 0]
	]],
	['15 puzzle', [
		['stan losowy URLD', "15prp", 0],
		['stan losowy ^<>v', "15prap", 0],
		['stan losowy Blank', "15prmp", 0],
		['losowy ruch URLD', "15p", 80],
		['losowy ruch ^<>v', "15pat", 80],
		['losowy ruch Blank', "15pm", 80]
	]],
	['8 puzzle', [
		['stan losowy URLD', "8prp", 0],
		['stan losowy ^<>v', "8prap", 0],
		['stan losowy Blank', "8prmp", 0]
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
	['Gear cube', [
		['stan losowy', "gearso", 0],
		['optymalny', "gearo", 0],
		['losowy ruch', "gear", 10]
	]],
	['Kilominx', [
		['stan losowy', "klmso", 0],
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
		['stan losowy', "rediso", 0],
		['MoYu', "redim", 8],
		['losowy ruch', "redi", 20]
	]],
	['Dino Cube', [
		['stan losowy', "dinoso", 0],
		['optymalny', "dinoo", 0]
	]],
	['Ivy cube', [
		['stan losowy', "ivyso", 0],
		['optymalny', "ivyo", 0],
		['losowy ruch', "ivy", 10]
	]],
	['Master Pyraminx', [
		['stan losowy', "mpyrso", 0],
		['losowy ruch', "mpyr", 42]
	]],
	['Pyraminx Crystal', [
		['Pochmann', "prcp", 70],
		['stary styl', "prco", 70]
	]],
	['Siamese Cube', [
		['1x1x3', "sia113", 25],
		['1x2x3', "sia123", 25],
		['2x2x2', "sia222", 25]
	]],
	['Square', [
		['Square-2', "sq2", 20],
		['Super Square-1', "ssq1t", 20]
	]],
	['Super Floppy', [
		[' ', "sfl", 25]
	]],
	['UFO', [
		['Styl Jaap', "ufo", 25]
	]],
	['FTO (Face-Turning Octahedron)', [
		['stan losowy', "ftoso", 0],
		['losowy ruch', "fto", 30],
		['L3T', "ftol3t", 0],
		['L3T+LBT', "ftol4t", 0],
		['TCP', "ftotcp", 0],
		['edges only', "ftoedge", 0],
		['centers only', "ftocent", 0],
		['corners only', "ftocorn", 0],
		['Diamond stan losowy', "dmdso", 0]
	]],
	['Icosahedron', [
		['Icosamate losowy ruch', "ctico", 60]
	]],
	['===SPECIALNE===', [
		['--', "blank", 0]
	]],
	['3x3x3 etapy', [
		['tylko ruchy R,U', "2gen", 0],
		['tylko ruchy L,U', "2genl", 0],
		['tylko ruchy M,U (Roux)', "roux", 0],
		['tylko ruchy F,R,U', "3gen_F", 0],
		['tylko ruchy R,U,L', "3gen_L", 0],
		['tylko ruchy R,r,U', "RrU", 0],
		['Domino Subgroup', "333drud", 0],
		['tylko podwójne ruchy', "half", 0],
		['ostatni slot + ostatnia warstwa', "lsll", 15]
	]],
	['Bandaged Cube', [
		['Bicube', "bic", 30],
		['tylko ruchy /,(1,0) (Square-1)', "bsq", 25]
	]],
	['Relays', [
		['wiele 3x3x3', "r3", 5],
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
	['===ŻARTY===', [
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
	['przekręć górną warstwę', 'przekręć dolną warstwę'],
	['przekręć prawą ściankę', 'przekręć lewą ściankę'],
	['przekręć przednią ściankę', 'przekręć tylnią ściankę']
];
var SCRAMBLE_NOOBSS = ' w kierunku zgodnym z ruchem wskazówek zegara o 90 stopni,| w kierunku przeciwnym do ruchu wskazówek zegara o 90 stopni,| o 180 stopni';
var SCROPT_TITLE = 'Opcje scrambla';
var SCROPT_BTNALL = 'Wszystkie';
var SCROPT_BTNNONE = 'Wyczyść';
var SCROPT_EMPTYALT = 'Proszę wybrać co najmniej jeden';
var STATS_CFM_RESET = 'usunąć wszystkie czasy w tej sesji?';
var STATS_CFM_DELSS = 'usunąć sesję?';
var STATS_CFM_DELMUL = 'Liczba usuniętych wartości z bieżącego indeksu?';
var STATS_CFM_DELETE = 'usunąć ten czas?';
var STATS_COMMENT = 'Komentarz';
var STATS_REVIEW = 'Przegląd';
var STATS_DATE = 'Data';
var STATS_SSSTAT = 'statystyka 1 rozwiązania';
var STATS_SSRETRY = 'Spróbuj ponownie';
var STATS_CURROUND = 'Aktualne statystyki';
var STATS_CURSESSION = 'Statystyki bieżącej sesji';
var STATS_CURSPLIT = 'Faza %d bieżących statystyk sesji';
var STATS_EXPORTCSV = 'Eksportuj do CSV';
var STATS_SSMGR_TITLE = 'Zarządzanie sesją';
var STATS_SSMGR_NAME = 'Nazwa';
var STATS_SSMGR_DETAIL = 'Szczegóły sesji';
var STATS_SSMGR_OPS = 'Zmień nazwę|Utwórz|Podziel|Scal|Usuń|Sortuj|Merge&Dedupe';
var STATS_SSMGR_ORDER = 'Sortuj według scrambla';
var STATS_SSMGR_ODCFM = 'Sortować wszystkie sesje według scrambla?';
var STATS_SSMGR_SORTCFM = '%d rozwiązań zostanie zmienionych, potwierdzasz?';
var STATS_ALERTMG = 'Dołączyć wszystkie czasy z sesji [%f] do sesji [%t]?';
var STATS_PROMPTSPL = 'Ile ostatnich czasów odłączyć od sesji [%s]?';
var STATS_ALERTSPL = 'Powinien rozdzielić lub zostawić co najmniej 1 czas.';
var STATS_AVG = 'średnia';
var STATS_SUM = 'Suma';
var STATS_SOLVE = 'Ułożenie ';
var STATS_TIME = 'czas';
var STATS_SESSION = 'Sesja';
var STATS_SESSION_NAME = 'Edytuj nazwę sesji';
var STATS_SESSION_NAMEC = 'Nazwa nowej sesji';
var STATS_STRING = 'najlepszy|obecny|najgorszy|Wygenerowane przez csTimer dnia %Y-%M-%D|rozwiązania/sumaryczne: %d|pojedyncze|średnia z %mk|Średnia z %mk|Średnia: %v{ ({ = %sgm)}|Średnia: %v|Lista czasów:|rozwiązanie z %s do %e|Łącznie: %d|target';
var STATS_PREC = 'dokładność rozkładu czasowego';
var STATS_PREC_STR = 'auto|0.1s|0.2s|0.5s|1s|2s|5s|10s|20s|50s|100s';
var STATS_TYPELEN = 'lista %d typ|lista %d długość|average|mean';
var STATS_STATCLR = 'Włącz opróżnianie sesji';
var STATS_ABSIDX = 'Pokaż indeks bezwzględny w raporcie statystycznym';
var STATS_XSESSION_DATE = 'dowolna data|ostatnie 24 godziny|ostatnie 7 dni|ostatnie 30 dni|ostatnie 365 dni';
var STATS_XSESSION_NAME = 'nazwa';
var STATS_XSESSION_SCR = 'dowolny scramble';
var STATS_XSESSION_CALC = 'Calc';
var STATS_RSFORSS = 'Pokaż statystykę po kliknięciu numeru rozwiązania';
var PROPERTY_PRINTSCR = 'Dołącz algorytmy mieszania do statystyk ';
var PROPERTY_PRINTCOMM = 'Pokaż komentarze w statystykach';
var PROPERTY_PRINTDATE = 'Dołącz datę ułożenia do statystyk';
var PROPERTY_SUMMARY = 'pokaż podsumowanie przed listą czasu';
var PROPERTY_IMRENAME = 'zmień nazwę sesji po utworzeniu';
var PROPERTY_SCR2SS = 'utwórz nową sesję po przełączaniu typu scrambla';
var PROPERTY_SS2SCR = 'przywróć typ scrambla po przełączaniu sesji';
var PROPERTY_SS2PHASES = 'przywróć wielofazowy czas podczas przełączania sesji';
var PROPERTY_STATINV = 'Odwrotna kolejność na liście czasów ';
var PROPERTY_STATSSUM = 'Pokaż sumę w liście czasów';
var PROPERTY_STATTHRES = 'Show target time for session best';
var PROPERTY_STATBPA = 'Pokaż najlepszą możliwą średnią (BPA)';
var PROPERTY_STATWPA = 'Pokaż najgorszą możliwą średnią (WPA)';
var PROPERTY_STATAL = 'Wskaźniki statystyczne';
var PROPERTY_STATALU = 'Niestandardowy wskaźnik statystyczny';
var PROPERTY_HLPBS = 'Zaznacz rekordy (PB)';
var PROPERTY_HLPBS_STR = 'Dark orange as WCA|As link color|Bolder|None';
var PROPERTY_DELMUL = 'Włącz usuwanie wielu wierszy';
var PROPERTY_TOOLSFUNC = 'Wybrane funkcje';
var PROPERTY_TRIM = 'Liczba ułożeń niebranych pod uwagę';
var PROPERTY_TRIMR = 'Ilość czasów usuwanych z najgorszych';
var PROPERTY_TRIM_MED = 'Mediana';
var PROPERTY_STKHEAD = 'Użyj informacji o stanie Stackmat';
var PROPERTY_TOOLPOS = 'Pozycja panelu narzędzi';
var PROPERTY_TOOLPOS_STR = 'Bottom|Float|Top';
var PROPERTY_HIDEFULLSOL = 'Pokaż stopniowo rozwiązanie';
var PROPERTY_IMPPREV = 'Importuj starsze dane';
var PROPERTY_AUTOEXP = 'Automatyczny eksport (co 100 rozwiązań)';
var PROPERTY_AUTOEXP_OPT = 'Nie eksportuj|Do pliku|przy użyciu csTimer ID|przy użyciu konta WCA|przy użyciu konta Google|Alert Only';
var PROPERTY_SCRASIZE = 'Automatyczny rozmiar scrambla';
var MODULE_NAMES = {
	"kernel": 'globalnie',
	"ui": 'wyświetlanie',
	"color": 'kolor',
	"timer": 'timer',
	"scramble": 'scramble',
	"stats": 'statystyki',
	"tools": 'narzędzia',
	"vrc": 'virtual&<br>bluetooth'
};
var BGIMAGE_URL = 'podaj url obrazka';
var BGIMAGE_INVALID = 'niepoprawny url';
var BGIMAGE_OPACITY = 'przezroczystość obrazu tła';
var BGIMAGE_IMAGE = 'tło';
var BGIMAGE_IMAGE_STR = 'brak|manualnie|CCT';
var SHOW_AVG_LABEL = 'Wyświetl etykietę średniego czasu';
var SHOW_DIFF_LABEL = 'Pokaż różnice czasów';
var SHOW_DIFF_LABEL_STR = '-Green+Red|-Red+Green|Normal|None';
var USE_LOGOHINT = 'Wiadomości w logo';
var TOOLS_SCRGEN = 'GeneratorScrambli';
var SCRGEN_NSCR = 'Liczba scramblów';
var SCRGEN_PRE = 'prefiks';
var SCRGEN_GEN = 'Generuj algorytmy mieszające!';
var VRCREPLAY_TITLE = 'Wirtualna powtórka';
var VRCREPLAY_ORI = 'raw ori|auto ori';
var VRCREPLAY_SHARE = 'udostępnij link';
var GIIKER_CONNECT = 'Kliknij, aby połączyć';
var GIIKER_RESET = 'Resetuj (Oznacz jako rozwiązane)';
var GIIKER_REQMACMSG = 'Please enter the MAC address of your smart hardware (xx:xx:xx:xx:xx:xx). You can find the MAC address through chrome://bluetooth-internals/#devices, or modify following options to let csTimer automatically obtain it:\nChrome: Turn on chrome://flags/#enable-experimental-web-platform-features\nBluefy: Turn on Enable BLE Advertisements';
var GIIKER_NOBLEMSG = 'Bluetooth API is not available. Ensure https access, check bluetooth is enabled on your device, and try chrome with chrome://flags/#enable-experimental-web-platform-features enabled';
var PROPERTY_SHOWAD = 'Pokaż reklamy (zmienia się po przeładowaniu)';
var PROPERTY_GIIORI = 'Orientacja kostki';
var LGHINT_INVALID = 'Zła wartość!';
var LGHINT_NETERR = 'Błąd sieci!';
var LGHINT_SERVERR = 'Błąd serwera';
var LGHINT_SUBMITED = 'Submitted';
var LGHINT_SSBEST = 'Najlepszy czas sesji %s';
var LGHINT_SCRCOPY = 'Scramble skopiowany';
var LGHINT_LINKCOPY = 'Skopiowano link udostępnienia';
var LGHINT_SOLVCOPY = 'Ułożenie skopiowane';
var LGHINT_SORT0 = 'Już posortowane';
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
