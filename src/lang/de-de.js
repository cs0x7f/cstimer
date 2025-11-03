var OK_LANG = 'OK';
var CANCEL_LANG = 'Abbrechen';
var RESET_LANG = 'Zurücksetzen';
var ABOUT_LANG = 'Über uns';
var ZOOM_LANG = 'Vergrößerung';
var COPY_LANG = 'Kopieren';
var BUTTON_TIME_LIST = 'Liste der<br>Zeiten';
var BUTTON_OPTIONS = 'Optionen';
var BUTTON_EXPORT = 'Export';
var BUTTON_DONATE = 'Spenden';
var PROPERTY_SR = 'Mit Sitzung';
var PROPERTY_USEINS = 'WCA-Inspektion benutzen';
var PROPERTY_USEINS_STR = 'Immer (unten)|Immer (oben)|Ausgenommen blind (unten)|Ausgenommen blind (oben)|Nie';
var PROPERTY_SHOWINS = 'Symbol anzeigen, wenn Inspektion aktiviert ist';
var PROPERTY_VOICEINS = 'Sprachansage für WCA-Inspektion';
var PROPERTY_VOICEINS_STR = 'keine|männliche Stimme|weibliche Stimme';
var PROPERTY_VOICEVOL = 'Sprachlautstärke';
var PROPERTY_PHASES = 'Multi-Phase';
var PROPERTY_TIMERSIZE = 'Timer-Größe';
var PROPERTY_USEMILLI = 'Millisekunden benutzen';
var PROPERTY_SMALLADP = 'kleine Schrift nach dem Komma benutzen';
var PROPERTY_SCRSIZE = 'Scramble-Größe';
var PROPERTY_SCRMONO = 'Monospace-Scramble';
var PROPERTY_SCRLIM = 'Die Höhe des Scramble-Bereichs begrenzen';
var PROPERTY_SCRALIGN = 'Aurichtung des Scramble-Bereichs';
var PROPERTY_SCRALIGN_STR = 'mittig|links|rechts';
var PROPERTY_SCRWRAP = 'Scramble Wechsel';
var PROPERTY_SCRWRAP_STR = 'Ausgeglichen|Normal';
var PROPERTY_SCRNEUT = 'Farbneutral';
var PROPERTY_SCRNEUT_STR = 'None|Single face|Double faces|Six faces';
var PROPERTY_SCREQPR = 'Wahrscheinlichkeiten für Training-Scrambles';
var PROPERTY_SCREQPR_STR = 'Aktuelle|Gleiche|Zufällige Reihenfolge';
var PROPERTY_SCRFAST = 'schnellen Scramble für 4x4x4 verwenden (inoffiziell)';
var PROPERTY_SCRKEYM = 'Schlüssel-Züge im Scramble hervorheben';
var PROPERTY_SCRCLK = 'Aktion beim klicken des scrambles';
var PROPERTY_SCRCLK_STR = 'Nichts|Kopieren|nächster Scramble';
var PROPERTY_WNDSCR = 'Scramble-Panel Anzeige-Stil';
var PROPERTY_WNDSTAT = 'Statistik-Panel Anzeige-Stil';
var PROPERTY_WNDTOOL = 'Werkzeug-Panel Anzeige-Stil';
var PROPERTY_WND_STR = 'Normal|Flach';
var EXPORT_DATAEXPORT = 'Daten-Import/Export';
var EXPORT_TOFILE = 'in Datei exportieren';
var EXPORT_FROMFILE = 'von Datei importieren';
var EXPORT_TOSERV = 'auf Server exportieren';
var EXPORT_FROMSERV = 'von Server importieren';
var EXPORT_FROMOTHER = 'Sitzung(en) von anderen Timern importieren';
var EXPORT_USERID = 'Bitte trage deinen Account ein (nur Buchstaben und Zahlen)';
var EXPORT_INVID = 'Nur Buchstaben und Zahlen sind erlaubt!';
var EXPORT_ERROR = 'Ein Fehler ist aufgetreten.';
var EXPORT_NODATA = 'Für deinen Account wurden keine Daten gefunden.';
var EXPORT_UPLOADED = 'Erfolgreich hochgeladen';
var EXPORT_CODEPROMPT = 'Speichere diesen Code, oder schreibe einen gespeicherten Code um zu importieren';
var EXPORT_ONLYOPT = 'nur Export/Import Optionen';
var EXPORT_ACCOUNT = 'Konten exportieren';
var EXPORT_LOGINGGL = 'Mit Google-Konto einloggen';
var EXPORT_LOGINWCA = 'Mit WCA-Konto einloggen';
var EXPORT_LOGOUTCFM = 'Bestätige Abmeldung?';
var EXPORT_LOGINAUTHED = 'Autorisiert<br>Daten werden geladen...';
var EXPORT_AEXPALERT = 'Mehr als %d Solves seit dem letzten Backup';
var EXPORT_WHICH = 'Es gibt %d Datei(en), welche soll(en) importiert werden?';
var EXPORT_WHICH_ITEM = '%s Solve(s), hochgeladen um %t';
var IMPORT_FINAL_CONFIRM = 'Dadurch werden alle lokale Daten überschrieben! Bestätigen, um Daten zu importieren?';
var BUTTON_SCRAMBLE = 'SCRA<br>MBLE';
var BUTTON_TOOLS = 'Werkzeuge';
var IMAGE_UNAVAILABLE = 'Für diesen Scramble-Typ nicht verfügbar';
var TOOLS_SELECTFUNC = 'Funktion';
var TOOLS_CROSS = 'Kreuz lösen';
var TOOLS_EOLINE = 'EOLine Lösen';
var TOOLS_ROUX1 = 'Roux ersten Block lösen';
var TOOLS_222FACE = '2x2x2 Würfel';
var TOOLS_GIIKER = 'Giiker Cube';
var TOOLS_IMAGE = 'Scramble zeichnen';
var TOOLS_STATS = 'Statistiken';
var TOOLS_HUGESTATS = 'sitzungsübergreifende Statistiken';
var TOOLS_DISTRIBUTION = 'Zeitverteilung';
var TOOLS_TREND = 'Zeit-Trend';
var TOOLS_METRONOME = 'Metronom';
var TOOLS_RECONS = 'Rekonstruieren';
var TOOLS_RECONS_NODATA = 'Keine Lösung gefunden.';
var TOOLS_RECONS_TITLE = 'insp|exec|turns|tps';
var TOOLS_TRAINSTAT = 'Trainingsstatistik';
var TOOLS_BLDHELPER = 'BLD-Helfer';
var TOOLS_CFMTIME = 'Zeit bestätigen';
var TOOLS_SOLVERS = 'Löser';
var TOOLS_DLYSTAT = 'Tägliche Statistik';
var TOOLS_DLYSTAT1 = 'Zeitraum|Anfang des/der Tages|Woche';
var TOOLS_DLYSTAT_OPT1 = 'Tag|Woche|Monat|Jahr';
var TOOLS_DLYSTAT_OPT2 = 'So|Mo|Di|Mi|Do|Fr|Sa';
var TOOLS_SYNCSEED = 'Gemeinsamen Scramble';
var TOOLS_SYNCSEED_SEED = 'Seed';
var TOOLS_SYNCSEED_INPUT = 'Eingabe Seed';
var TOOLS_SYNCSEED_30S = 'Benutzte 30s Seed';
var TOOLS_SYNCSEED_HELP = 'Wenn aktiviert, hängt Scramble nur von den Seed- und Scramble-Einstellungen ab.';
var TOOLS_SYNCSEED_DISABLE = 'Aktuellen Seed deaktivieren?';
var TOOLS_SYNCSEED_INPUTA = 'Gebe einen Wert (a-zA-Z0-9) als Seed ein';
var TOOLS_BATTLE = 'Online-Kampf';
var TOOLS_BATTLE_HEAD = 'Raum|Raum beitreten';
var TOOLS_BATTLE_TITLE = 'Rang|Status|Zeit';
var TOOLS_BATTLE_STATUS = 'Bereit|Inspektion|Solving|Solved|Verloren';
var TOOLS_BATTLE_INFO = 'Trete einem Battle-Room mit deinem Freund bei, um gegen ihn anzutreten.';
var TOOLS_BATTLE_JOINALERT = 'Bitte die Raum-ID eingeben';
var TOOLS_BATTLE_LEAVEALERT = 'Aktuellen Raum verlassen';
var OLCOMP_UPDATELIST = 'Wettbewerbsliste aktualisieren';
var OLCOMP_VIEWRESULT = 'Ergebisse betrachten';
var OLCOMP_VIEWMYRESULT = 'Verlauf';
var OLCOMP_START = 'Start!';
var OLCOMP_SUBMIT = 'Senden!';
var OLCOMP_SUBMITAS = 'Absenden als: ';
var OLCOMP_WCANOTICE = 'Als Ihr WCA-Konto absenden? (Erneut anmelden, wenn es nach dem Absenden nicht erkannt wurde)';
var OLCOMP_OLCOMP = 'Online Competition';
var OLCOMP_ANONYM = 'Anonym';
var OLCOMP_ME = 'Ich';
var OLCOMP_WCAACCOUNT = 'WCA Account';
var OLCOMP_ABORT = 'Wettbewerb abbrechen und Ergebnisse zeigen?';
var OLCOMP_WITHANONYM = 'Mit Anonymität';
var PROPERTY_IMGSIZE = 'Scramble-Bild Größe';
var PROPERTY_IMGREP = 'virtuelle Cube-Animation beim Klicken auf die Scramble-Abbildung anzeigen';
var TIMER_INSPECT = 'Inspektion';
var TIMER_SOLVE = 'Lösen';
var PROPERTY_USEMOUSE = 'Maus-Timer verwenden';
var PROPERTY_TIMEU = 'Timer-Update ist';
var PROPERTY_TIMEU_STR = 'Update|0.1s|Sekunden|Inspektion|keine';
var PROPERTY_PRETIME = 'wie lange die Leertaste drücken (Sekunde(n))';
var PROPERTY_ENTERING = 'Zeiten eintragen mit';
var PROPERTY_ENTERING_STR = 'Timer|Tippen|Stackmat|MoYuTimer|virtuell|Bluetooth Cube|qCube|Bluetooth Timer|Last-Layer-Training';
var PROPERTY_INTUNIT = 'Einheit bei der Eingabe einer Zahl';
var PROPERTY_INTUNIT_STR = 'Sekunde|Hundertstelsekunde|Millisekunde';
var PROPERTY_COLOR = 'Farbschema wählen';
var PROPERTY_COLORS = 'Schriftfarbe|Hintergrundfarbe|Panelfarbe|Knopffarbe|Linkfarbe|Logofarbe|Logo-Hintergrund';
var PROPERTY_VIEW = 'Stil der Benutzeroberfläche';
var PROPERTY_VIEW_STR = 'Auto|Mobile|Desktop';
var PROPERTY_UIDESIGN = 'Design der Benutzeroberfläch';
var PROPERTY_UIDESIGN_STR = 'Normal|Material design|Normal w/o shadows|Material design w/o shadows';
var COLOR_EXPORT = 'Bitte den Text für den Import speichern';
var COLOR_IMPORT = 'Bitte den exportierten Text einfügen';
var COLOR_FAIL = 'Falsche Daten, Import fehlgeschlagen';
var PROPERTY_FONTCOLOR_STR = 'schwarz|weiß';
var PROPERTY_COLOR_STR = 'manuell|Import/Export...|zufällig|Stil 1|Stil 2|Stil 3|schwarz|weiß|Stil 6|solarized dark|solarized light';
var PROPERTY_FONT = 'Timer-Schriftart wählen';
var PROPERTY_FONT_STR = 'zufällig digital|normal|digital 1|digital 2|digital 3|digital 4|digital 5';
var PROPERTY_FORMAT = 'Zeitformat';
var PROPERTY_USEKSC = 'Tastenkombinationen benutzen';
var PROPERTY_USEGES = 'Gestensteuerug benutzen';
var PROPERTY_NTOOLS = 'Anzahl der Werkzeuge';
var PROPERTY_AHIDE = 'Alle Elemente während des Timens verstecken';
var SCRAMBLE_LAST = 'letzter';
var SCRAMBLE_NEXT = 'nächster';
var SCRAMBLE_SCRAMBLE = 'Scramble';
var SCRAMBLE_SCRAMBLING = 'Scrambling';
var SCRAMBLE_LENGTH = 'Länge';
var SCRAMBLE_INPUT = 'Scramble(s) eingeben';
var SCRAMBLE_INPUTTYPE = 'Scramble-Art';
var PROPERTY_VRCSPEED = 'VRC Grundgeschwindigkeit (TPS)';
var PROPERTY_VRCORI = 'Ausrichtung virtueller Cube';
var PROPERTY_VRCMP = 'Multi-Phase';
var PROPERTY_VRCMPS = 'Keine|CFOP|CF+OP|CFFFFOP|CFFFFOOPP|Roux';
var PROPERTY_GIIKERVRC = 'Virtuellen Giiker Cube zeigen';
var PROPERTY_GIISOK_DELAY = 'Ende des Scrambles durch Warten anzeigen';
var PROPERTY_GIISOK_DELAYS = '2s|3s|4s|5s|Nie|korrekt gescramblet';
var PROPERTY_GIISOK_KEY = 'Ende des Scrambles mit Leertaste anzeigen';
var PROPERTY_GIISOK_MOVE = 'Ende des Scrambles anzeigen mit';
var PROPERTY_GIISOK_MOVES = 'U4, R4 etc.|(U U\')2, (U\' U)2, ect.|Nie';
var PROPERTY_GIISBEEP = 'Beep am Ende des Scrambles';
var PROPERTY_GIIRST = 'Giiker Cube bei Verbindung zurück setzen';
var PROPERTY_GIIRSTS = 'Immer|Nachfragen|Nie';
var PROPERTY_GIIMODE = 'Bluetooth Würfel-Modus';
var PROPERTY_GIIMODES = 'Normal|Training|Kontinuierliches Training';
var PROPERTY_VRCAH = 'Nutzlose Steine in großem Würfel';
var PROPERTY_VRCAHS = 'Verbergen|Rahmen|Farbe|Anzeigen';
var CONFIRM_GIIRST = 'Giiker Cube als gelöst zurück setzen?';
var PROPERTY_GIIAED = 'Automatische Hardware-Fehler-Erkennung';
var scrdata = [
	['WCA', [
		['3x3x3', "333", 0],
		['2x2x2', "222so", 0],
		['4x4x4', "444wca", -40],
		['5x5x5', "555wca", -60],
		['6x6x6', "666wca", -80],
		['7x7x7', "777wca", -100],
		['3x3 blind', "333ni", 0],
		['3x3 Fewest Moves', "333fm", 0],
		['3x3 einhändig', "333oh", 0],
		['Clock', "clkwca", 0],
		['Megaminx', "mgmp", -70],
		['Pyraminx', "pyrso", -10],
		['Skewb', "skbso", 0],
		['Square-1', "sqrs", 0],
		['4x4 blind', "444bld", -40],
		['5x5 blind', "555bld", -60],
		['3x3 Multiblind', "r3ni", 5]
	]],
	['Eingabe', [
		['Extern', "input", 0],
		['Competition', "remoteComp", 0],
		['Online-Kampf', "remoteBattle", 0],
		['Remote', "remoteOther", 0]
	]],
	['===WCA===', [
		['--', "blank", 0]
	]],
	['3x3x3', [
		["zufälliger Status (WCA)", "333", 0],
		['zufällige Bewegung', "333o", 25],
		['3x3x3 für Anfänger', "333noob", 25],
		['nur Kanten', "edges", 0],
		['nur Ecken', "corners", 0],
		['BLD-Helfer', "nocache_333bldspec", 0],
		['Pattern Tool', "nocache_333patspec", 0],
		['3x3 mit Füßen', "333ft", 0],
		['Angepasst', "333custom", 0]
	]],
	['3x3x3 CFOP', [
		['PLL', "pll", 0],
		['OLL', "oll", 0],
		['letzter Slot + letzte Schicht', "lsll2", 0],
		['letze Schicht', "ll", 0],
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
		['Kreuz gelöst', "f2l", 0],
		['EOLine', "eoline", 0],
		['EO Cross', "eocross", 0],
		['einfaches Kreuz', "easyc", 3],
		['Einfaches X-Cross', "easyxc", 4]
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
		["zufälliger Status (WCA)", "222so", 0],
		['optimal', "222o", 0],
		['3-gen', "2223", 25],
		['EG', "222eg", 0],
		['CLL', "222eg0", 0],
		['EG1', "222eg1", 0],
		['EG2', "222eg2", 0],
		['TCLL+', "222tcp", 0],
		['TCLL-', "222tcn", 0],
		['TCLL', "222tc", 0],
		['LS', "222lsall", 0],
		['Keine Bar', "222nb", 0]
	]],
	['4x4x4', [
		["WCA", "444wca", -40],
		['Zufalls-Zugfolge', "444m", 40],
		['SiGN', "444", 40],
		['YJ', "444yj", 40],
		['4x4x4 Kanten', "4edge", 0],
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
		['5x5x5 Kanten', "5edge", 8]
	]],
	['6x6x6', [
		["WCA", "666wca", 80],
		['SiGN', "666si", 80],
		['Präfix', "666p", 80],
		['Suffix', "666s", 80],
		['6x6x6 Kanten', "6edge", 8]
	]],
	['7x7x7', [
		["WCA", "777wca", 100],
		['SiGN', "777si", 100],
		['Präfix', "777p", 100],
		['Suffix', "777s", 100],
		['7x7x7 Kanten', "7edge", 8]
	]],
	['Clock', [
		['WCA', "clkwca", 0],
		['WCA (old)', "clkwcab", 0],
		['WCA w/o y2', "clknf", 0],
		['jaap', "clk", 0],
		['optimal', "clko", 0],
		['präzise', "clkc", 0],
		['effiziente Pin-Reihenfolge', "clke", 0]
	]],
	['Megaminx', [
		["WCA", "mgmp", 70],
		['Karott', "mgmc", 70],
		['alter Stil', "mgmo", 70],
		['2-generator R,U', "minx2g", 30],
		['letzer Slot + letzte Schicht', "mlsll", 0],
		['PLL', "mgmpll", 0],
		['Last Layer', "mgmll", 0]
	]],
	['Pyraminx', [
		["zufälliger Status (WCA)", "pyrso", 10],
		['optimal', "pyro", 0],
		['zufällige Bewegung', "pyrm", 25],
		['L4E', "pyrl4e", 0],
		['4 tips', "pyr4c", 0],
		['No bar', "pyrnb", 0]
	]],
	['Skewb', [
		["zufälliger Status (WCA)", "skbso", 0],
		['optimal', "skbo", 0],
		['zufällige Bewegung', "skb", 25],
		['No bar', "skbnb", 0]
	]],
	['Square-1', [
		["zufälliger Status (WCA)", "sqrs", 0],
		["CSP", "sqrcsp", 0],
		["PLL", "sq1pll", 0],
		['Flächen-Zug-Metrik', "sq1h", 40],
		['Zug-Metrik', "sq1t", 20]
	]],
	['===Andere===', [
		['--', "blank", 0]
	]],
	['15-Puzzle', [
		['zufälliger Status URLD', "15prp", 0],
		['zufälliger Status ^<>v', "15prap", 0],
		['zufälliger Status Blank', "15prmp", 0],
		['zufällige Bewegung URLD', "15p", 80],
		['zufällige Bewegung ^<>v', "15pat", 80],
		['zufällige Bewegung Blank', "15pm", 80]
	]],
	['8 puzzle', [
		['zufälliger Status URLD', "8prp", 0],
		['zufälliger Status ^<>v', "8prap", 0],
		['zufälliger Status Blank', "8prmp", 0]
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
		['zufälliger Status', "gearso", 0],
		['optimal', "gearo", 0],
		['zufällige Bewegung', "gear", 10]
	]],
	['Kilominx', [
		['zufälliger Status', "klmso", 0],
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
	['c', [
		['zufälliger Status', "rediso", 0],
		['MoYu', "redim", 8],
		['zufällige Bewegung', "redi", 20]
	]],
	['Dino Cube', [
		['zufälliger Status', "dinoso", 0],
		['optimal', "dinoo", 0]
	]],
	['Ivy cube', [
		['zufälliger Status', "ivyso", 0],
		['optimal', "ivyo", 0],
		['zufällige Bewegung', "ivy", 10]
	]],
	['Master Pyraminx', [
		['zufälliger Status', "mpyrso", 0],
		['zufällige Bewegung', "mpyr", 42]
	]],
	['Pyraminx Crystal', [
		['Pochmann', "prcp", 70],
		['alter Stil', "prco", 70]
	]],
	['Siamesischer Cube', [
		['1x1x3 Block', "sia113", 25],
		['1x2x3 Block', "sia123", 25],
		['2x2x2 Block', "sia222", 25]
	]],
	['Square', [
		['Square-2', "sq2", 20],
		['Super Square-1', "ssq1t", 20]
	]],
	['Super Floppy', [
		[' ', "sfl", 25]
	]],
	['UFO', [
		['Jaap Stil', "ufo", 25]
	]],
	['FTO (Face-Turning Octahedron)', [
		['zufälliger Status', "ftoso", 0],
		['zufällige Bewegung', "fto", 30],
		['L3T', "ftol3t", 0],
		['L3T+LBT', "ftol4t", 0],
		['TCP', "ftotcp", 0],
		['edges only', "ftoedge", 0],
		['centers only', "ftocent", 0],
		['corners only', "ftocorn", 0],
		['Diamond zufälliger Status', "dmdso", 0]
	]],
	['Icosahedron', [
		['Icosamate zufällige Bewegung', "ctico", 60]
	]],
	['===Spezial===', [
		['--', "blank", 0]
	]],
	['3x3x3 Teilmengen', [
		['2-generator R,U', "2gen", 0],
		['2-generator L,U', "2genl", 0],
		['Roux-generator M,U', "roux", 0],
		['3-generator F,R,U', "3gen_F", 0],
		['3-generator R,U,L', "3gen_L", 0],
		['3-generator R,r,U', "RrU", 0],
		['Domino Subgroup', "333drud", 0],
		['nur 180°-Drehungen', "half", 0],
		['letzter Slot + letzte Schicht (alt)', "lsll", 15]
	]],
	['Bandagierter Cube', [
		['Bicube', "bic", 30],
		['Square-1 /,(1,0)', "bsq", 25]
	]],
	['Staffeln', [
		['viele 3x3x3', "r3", 5],
		['234 Staffel', "r234", 0],
		['2345 Staffel', "r2345", 0],
		['23456 Staffel', "r23456", 0],
		['234567 Staffel', "r234567", 0],
		['234 Staffel (WCA)', "r234w", 0],
		['2345 Staffel (WCA)', "r2345w", 0],
		['23456 Staffel (WCA)', "r23456w", 0],
		['234567 Staffel (WCA)', "r234567w", 0],
		['Mini Guildford', "rmngf", 0]
	]],
	['===Witze===', [
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
	['drehe die obere Fläche', 'drehe die untere Fläche'],
	['drehe die rechte Fläche', 'drehe die linke Fläche'],
	['drehe die vordere Fläche', 'drehe die hintere Fläche']
];
var SCRAMBLE_NOOBSS = 'um 90° im Uhrzeigersinn, |um 90° gegen den Uhrzeigersinn, | um 180°';
var SCROPT_TITLE = 'Scramble Optionen';
var SCROPT_BTNALL = 'Voll';
var SCROPT_BTNNONE = 'Zurücksetzen';
var SCROPT_EMPTYALT = 'Bitte wählen Sie mindestens eine Option aus';
var STATS_CFM_RESET = 'alle zeiten in dieser Sitzung zurück setzen?';
var STATS_CFM_DELSS = 'Sitzung [%s] löschen?';
var STATS_CFM_DELMUL = 'Anzahl der zu löschenden Einträge ab aktuellem Index?';
var STATS_CFM_DELETE = 'diese Zeit löschen?';
var STATS_COMMENT = 'Kommentar';
var STATS_REVIEW = 'Rezension';
var STATS_DATE = 'Datum';
var STATS_SSSTAT = '1-Zeit Statistik';
var STATS_SSRETRY = 'Erneut versuchen';
var STATS_CURROUND = 'Statistiken der aktuellen Runde';
var STATS_CURSESSION = 'Statistiken der aktuellen Sitzung';
var STATS_CURSPLIT = 'Statistiken der Phase %d der aktuellen Sitzung';
var STATS_EXPORTCSV = 'CSV exportieren';
var STATS_SSMGR_TITLE = 'Sitzungs-Manager';
var STATS_SSMGR_NAME = 'Name';
var STATS_SSMGR_DETAIL = 'Sitzungs-Details';
var STATS_SSMGR_OPS = 'Umbenennen|Erstellen|Aufteilen|Vereinigen|Löschen|Sortieren|Merge&Dedupe';
var STATS_SSMGR_ORDER = 'Nach Scramble sortieren';
var STATS_SSMGR_ODCFM = 'Alle Sitzungen nach Scramble sortieren?';
var STATS_SSMGR_SORTCFM = '%d Zeit(en) werden neu angeordnet, bestätigen?';
var STATS_ALERTMG = 'Alle Zeiten der Sitzung [%f] an das Ende von Sitzung [%t] anfügen?';
var STATS_PROMPTSPL = 'Nummer des neuesten Zeit-Splits der Sitzung [%s]?';
var STATS_ALERTSPL = 'Soll geteilt werden, oder mindestens eine Zeit übrig lassen';
var STATS_AVG = 'Mittelwert';
var STATS_SUM = 'Summe';
var STATS_SOLVE = 'Versuch';
var STATS_TIME = 'Zeit';
var STATS_SESSION = 'Sitzung';
var STATS_SESSION_NAME = 'Sitzungsnamen ändern';
var STATS_SESSION_NAMEC = 'Name der neuen Sitzung';
var STATS_STRING = 'bester|aktueller|schlechtester|generiert durch csTimer am %D.%M.%Y|Versuch/Total: %d|Single|Mittelwert von %mk|Durchschnitt von %mk|Durchschnitte: %v{ (σ = %sgm)}|Mittelwert: %v|Zeitenliste:|lösen von %s bis %e|Gesamtzeit: %d|target';
var STATS_PREC = 'Genauigkeit des Histograms';
var STATS_PREC_STR = 'automatisch|0.1s|0.2s|0.5s|1s|2s|5s|10s|20s|50s|100s';
var STATS_TYPELEN = 'Liste %d Typ|Liste %d Länge|Durchschnitt|Mittelwert';
var STATS_STATCLR = 'Leeren von Sitzungen zulassen';
var STATS_ABSIDX = 'Absoluten Index im Statistik-Report anzeigen';
var STATS_XSESSION_DATE = 'jedes Datum|letzten 24 Stunden|letzten 7 Tage|letzten 30 Tage|letzten 365 Tage';
var STATS_XSESSION_NAME = 'jeder Name';
var STATS_XSESSION_SCR = 'jeder Scramble';
var STATS_XSESSION_CALC = 'Berechnen';
var STATS_RSFORSS = 'Zeige Statistik, when die Zeitnummer angeklickt wird';
var PROPERTY_PRINTSCR = 'Scramble(s) in den Statistiken anzeigen';
var PROPERTY_PRINTCOMM = 'Kommentare in den Statistiken anzeigen';
var PROPERTY_PRINTDATE = 'Datum des Solves in den Statistiken anzeigen';
var PROPERTY_SUMMARY = 'Zusammenfassung vor der Zeiten-Liste anzeigen';
var PROPERTY_IMRENAME = 'Sitzung direkt nach der Erstellung umbenennen';
var PROPERTY_SCR2SS = 'neue Sitzung erstellen, wenn Scramble-Typ gewechselt wird';
var PROPERTY_SS2SCR = 'Scramble-Typ wiederherstellen wenn Sitzung gewechselt wird';
var PROPERTY_SS2PHASES = 'Multi-Phase Timen wiederherstellen, wenn Sitzung gewechselt wird';
var PROPERTY_STATINV = 'umgekehrte Zeitliste';
var PROPERTY_STATSSUM = 'Summe in der Zeitliste anzeigen';
var PROPERTY_STATTHRES = 'Zielzeit für das beste Ergebnis einer Session anzeigen';
var PROPERTY_STATBPA = 'Bestmöglichen Durchschnitt (BPA) anzeigen';
var PROPERTY_STATWPA = 'Schlechtesten möglichen Durchschnitt anzeigen (WPA)';
var PROPERTY_STATAL = 'Statistische Indikatoren';
var PROPERTY_STATALU = 'Angepasster statistischer Indikator';
var PROPERTY_HLPBS = 'PBs hervorheben';
var PROPERTY_HLPBS_STR = 'Dunkelorange wie WCA|Wie Link-Farbe|Fett|Ohne';
var PROPERTY_DELMUL = 'Mehrfach-Löschung aktivieren';
var PROPERTY_TOOLSFUNC = 'Ausgewählte Funktionen';
var PROPERTY_TRIM = 'Anzahl der Versuche, die auf beiden Seiten getrimmt wurden';
var PROPERTY_TRIMR = 'Anzahl der schlechtesten, entfernten Solves';
var PROPERTY_TRIM_MED = 'Median';
var PROPERTY_STKHEAD = 'Benutze die Stackmat Statusinformationen';
var PROPERTY_TOOLPOS = 'Werkzeug-Panel Position';
var PROPERTY_TOOLPOS_STR = 'Unten|Float|Oben';
var PROPERTY_HIDEFULLSOL = 'Zeige die Lösungen schrittweise an';
var PROPERTY_IMPPREV = 'Veraltete Daten importieren?';
var PROPERTY_AUTOEXP = 'Autoexport (alle 100 solves)';
var PROPERTY_AUTOEXP_OPT = 'Nie|In Datei|Mit csTimer ID|Mit WCA Account|Mit Google Account|Alert Only';
var PROPERTY_SCRASIZE = 'Automatische Scramble Größe';
var MODULE_NAMES = {
	"kernel": 'global',
	"ui": 'Anzeige',
	"color": 'Farbe',
	"timer": 'Stoppuhr',
	"scramble": 'Scramble',
	"stats": 'Statistiken',
	"tools": 'Werkzeuge',
	"vrc": 'virtueller<br>Giiker'
};
var BGIMAGE_URL = 'Bitte Bild-URL eingeben';
var BGIMAGE_INVALID = 'Ungültige URL';
var BGIMAGE_OPACITY = 'Deckkraft des Hintergrundbilds';
var BGIMAGE_IMAGE = 'Hintergrundbild';
var BGIMAGE_IMAGE_STR = 'keine|manuell|CCT';
var SHOW_AVG_LABEL = 'Durchnitts-Label anzeigen';
var SHOW_DIFF_LABEL = 'Differenzlabel anzeigen';
var SHOW_DIFF_LABEL_STR = '-Grün +Rot|-Rot +Grün|Normal|Ohne';
var USE_LOGOHINT = 'Hinweis-Meldungen im Logo';
var TOOLS_SCRGEN = 'Scramble-Generator';
var SCRGEN_NSCR = 'Anzahl der Scrambles';
var SCRGEN_PRE = 'Präfix';
var SCRGEN_GEN = 'Scrambles Generieren!';
var VRCREPLAY_TITLE = 'Virtuelle Wiederholung';
var VRCREPLAY_ORI = 'raw ori|automatische ori';
var VRCREPLAY_SHARE = 'Link teilen';
var GIIKER_CONNECT = 'Klicke zum Verbinden';
var GIIKER_RESET = 'Zurücksetzen (als gelöst markieren)';
var GIIKER_REQMACMSG = 'Bitte geben Sie die MAC-Adresse Ihres Smart-Geräts (xx:xx:xx:xx:xx:xx) ein. Die MAC-Adresse finden Sie unter chrome://bluetooth-internals/#devices. Alternativ können Sie die folgenden Einstellungen vornehmen, damit csTimer diese automatisch abrufen kann:\nChrome: Aktivieren Sie chrome://flags/#enable-experimental-web-platform-features\nBluefy: Aktivieren Sie "Enable BLE Advertisements" ("Aktiviere BLE Anzeigen")';
var GIIKER_NOBLEMSG = 'Bluetooth-API ist nicht verfügbar. Stellen Sie sicher, dass die Seite über https aufgerufen wurde, überprüfen Sie, ob Bluetooth auf Ihrem Gerät aktiviert ist, und versuchen Sie, die Seite in Chrome mit der Einstellung chrome://flags/#enable-experimental-web-platform-features neu zu laden.';
var PROPERTY_SHOWAD = 'Werbung anzeigen (wird nach erneutem Laden angewendet)';
var PROPERTY_GIIORI = 'Cube-Ausrichtung';
var LGHINT_INVALID = 'Ungültiger Wert!';
var LGHINT_NETERR = 'Netzwerkfehler!';
var LGHINT_SERVERR = 'Serverfehler!';
var LGHINT_SUBMITED = 'Übertragen';
var LGHINT_SSBEST = 'Beste/r %s der Sitzung';
var LGHINT_SCRCOPY = 'Scramble kopiert';
var LGHINT_LINKCOPY = 'Freigabelink wurde kopiert';
var LGHINT_SOLVCOPY = 'Solve kopiert';
var LGHINT_SORT0 = 'Bereits sortiert';
var LGHINT_IMPORTED = '%d Sitzung(en) importiert';
var LGHINT_IMPORT0 = 'Keine Sitzung importiert';
var LGHINT_BTCONSUC = 'Bluetooth erfolgreich verbunden';
var LGHINT_BTDISCON = 'Bluetooth-Verbindung getrennt';
var LGHINT_BTNOTSUP = 'Der Smart-Cube wird nicht unterstützt';
var LGHINT_BTINVMAC = 'Ungültige MAC-Adresse, es kann keine Verbindung zum Smart-Cube hergestellt werden';
var LGHINT_AEXPABT = 'Automatischer Export abgebrochen';
var LGHINT_AEXPSUC = 'Automatischer Export erfolgreich';
var LGHINT_AEXPFAL = 'Automatischer Export fehlgeschlagen';
var EASY_SCRAMBLE_HINT = 'Ändere die Länge, um die Lösungslänge nach oben zu begrenzen. Gebe 2 Ziffern ein um sowohl die untere (<= 8) als auch die obere Grenze festzulegen.';
