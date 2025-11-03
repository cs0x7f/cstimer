var OK_LANG = 'Ok';
var CANCEL_LANG = 'Annulla';
var RESET_LANG = 'Azzera';
var ABOUT_LANG = 'Info';
var ZOOM_LANG = 'Zoom';
var COPY_LANG = 'Copia';
var BUTTON_TIME_LIST = 'LISTA<br>TEMPI';
var BUTTON_OPTIONS = 'OPZIONI';
var BUTTON_EXPORT = 'ESPORTA';
var BUTTON_DONATE = 'DONA';
var PROPERTY_SR = 'Con sessione';
var PROPERTY_USEINS = 'Usa ispezione (WCA)';
var PROPERTY_USEINS_STR = 'Sempre (sotto)|Sempre (sopra)|Sempre tranne BLD (sotto)|Sempre tranne BLD (sopra)|Mai';
var PROPERTY_SHOWINS = 'Mostra un\\\'icona quando è abilitata l\\\'ispezione';
var PROPERTY_VOICEINS = 'avviso vocale dell\'ispezione WCA';
var PROPERTY_VOICEINS_STR = 'nessuna|voce maschile|voce femminile';
var PROPERTY_VOICEVOL = 'Volume della Voce';
var PROPERTY_PHASES = 'Multi-fase';
var PROPERTY_TIMERSIZE = 'Dimensione cronometro';
var PROPERTY_USEMILLI = 'Usa millisecondi';
var PROPERTY_SMALLADP = 'Usa font piccolo dopo il punto decimale';
var PROPERTY_SCRSIZE = 'Lunghezza scramble';
var PROPERTY_SCRMONO = 'Scramble con singolo spazio';
var PROPERTY_SCRLIM = 'Limita l\'altezza dell\'area di scramble';
var PROPERTY_SCRALIGN = 'Allineamento area di scramble';
var PROPERTY_SCRALIGN_STR = 'centro|sinistra|destra';
var PROPERTY_SCRWRAP = 'Scramble Wrap';
var PROPERTY_SCRWRAP_STR = 'Bilanciato|Normale';
var PROPERTY_SCRNEUT = 'Color neutral';
var PROPERTY_SCRNEUT_STR = 'Nessuna|Una faccia|Due facce|Sei facce';
var PROPERTY_SCREQPR = 'Probabilità degli stati per scramble di training';
var PROPERTY_SCREQPR_STR = 'Attuale|Uguale|Ordine casuale';
var PROPERTY_SCRFAST = 'Usa scramble veloce per il 4x4x4 (non ufficiale)';
var PROPERTY_SCRKEYM = 'Etichetta le mosse principali nello scramble';
var PROPERTY_SCRCLK = 'Azione al click sullo scramble';
var PROPERTY_SCRCLK_STR = 'Nessuna|Copia|Prossimo scramble';
var PROPERTY_WNDSCR = 'Stile visualizzazione scramble';
var PROPERTY_WNDSTAT = 'Stile visualizzazione statistiche';
var PROPERTY_WNDTOOL = 'Stile visualizzazione strumenti';
var PROPERTY_WND_STR = 'Normale|Piano';
var EXPORT_DATAEXPORT = 'Importa/Esporta Dati';
var EXPORT_TOFILE = 'Esporta su file';
var EXPORT_FROMFILE = 'Importa da file';
var EXPORT_TOSERV = 'Esporta su server';
var EXPORT_FROMSERV = 'Importa da server';
var EXPORT_FROMOTHER = 'Importa sessione(i) da altri timer';
var EXPORT_USERID = 'Per favore inserisci il tuo account (solo caratteri dell\'alfabeto o numeri)';
var EXPORT_INVID = 'Solo caratteri dell\'alfabeto o numeri sono ammessi!';
var EXPORT_ERROR = 'Si sono verificati degli errori...';
var EXPORT_NODATA = 'Nessuna informazione trovata per il tuo account';
var EXPORT_UPLOADED = 'Caricato con successo';
var EXPORT_CODEPROMPT = 'Salva questo codice o scrivi il codice salvato per importare';
var EXPORT_ONLYOPT = 'Esporta/Importa solo opzioni';
var EXPORT_ACCOUNT = 'Esporta account';
var EXPORT_LOGINGGL = 'Accedi usando account Google';
var EXPORT_LOGINWCA = 'Accedi tramite account WCA';
var EXPORT_LOGOUTCFM = 'Confermi uscita?';
var EXPORT_LOGINAUTHED = 'Autorizzato<br>Caricamento Dati...';
var EXPORT_AEXPALERT = 'Più di %d risoluzioni dall\'ultimo backup';
var EXPORT_WHICH = 'Tu hai %d file(s), quale dovrebbe essere importato?';
var EXPORT_WHICH_ITEM = '%s risoluzioni, caricate il %t';
var IMPORT_FINAL_CONFIRM = 'Questo sovrascriverà tutti i dati locali! Modificherà %d sessioni, aggiungerà %a risoluzioni e ne rimuoverà %r solves. Confermi l\\\'import dei dati?';
var BUTTON_SCRAMBLE = 'SCRA<br>MBLE';
var BUTTON_TOOLS = 'STRU-<br>MENTI';
var IMAGE_UNAVAILABLE = 'Non disponibile per questo tipo di scramble';
var TOOLS_SELECTFUNC = 'Funzione';
var TOOLS_CROSS = 'Risoluzione croce';
var TOOLS_EOLINE = 'Risoluzione EOLine';
var TOOLS_ROUX1 = 'Risoluzione Roux S1';
var TOOLS_222FACE = '2x2x2 face';
var TOOLS_GIIKER = 'Cubo Giiker';
var TOOLS_IMAGE = 'Disegna scramble';
var TOOLS_STATS = 'Statistiche';
var TOOLS_HUGESTATS = 'Statistiche cross-session';
var TOOLS_DISTRIBUTION = 'Distribuzione temporale';
var TOOLS_TREND = 'trend dei tempi';
var TOOLS_METRONOME = 'metronomo';
var TOOLS_RECONS = 'Ricostruzione';
var TOOLS_RECONS_NODATA = 'Nessuna soluzione trovata';
var TOOLS_RECONS_TITLE = 'insp|exec|turn|tps';
var TOOLS_TRAINSTAT = 'Statistiche di Training';
var TOOLS_BLDHELPER = 'Assistente BLD';
var TOOLS_CFMTIME = 'Conferma tempo';
var TOOLS_SOLVERS = 'Risolutori';
var TOOLS_DLYSTAT = 'Statistiche giornaliere';
var TOOLS_DLYSTAT1 = 'Periodo|Inizio del giorno|Settimana';
var TOOLS_DLYSTAT_OPT1 = 'giorno|settimana|mese|anno';
var TOOLS_DLYSTAT_OPT2 = 'Dom|Lun|Mar|Mer|Gio|Ven|Sab';
var TOOLS_SYNCSEED = 'Scramble comune';
var TOOLS_SYNCSEED_SEED = 'Seme';
var TOOLS_SYNCSEED_INPUT = 'Inserisci seme';
var TOOLS_SYNCSEED_30S = 'Usa seme 30s';
var TOOLS_SYNCSEED_HELP = 'Se abilitato, lo scramble dipende unicamente dal seme e dai settaggi specifici';
var TOOLS_SYNCSEED_DISABLE = 'Disabilita seme corrente';
var TOOLS_SYNCSEED_INPUTA = 'Inserisci un valore (a-zA-Z0-9) come seme';
var TOOLS_BATTLE = 'Gara online';
var TOOLS_BATTLE_HEAD = 'Room|Join Room';
var TOOLS_BATTLE_TITLE = 'Rango|Stato|Tempo';
var TOOLS_BATTLE_STATUS = 'Pronto|Ispezione|Soluzione|Risolto|Perso';
var TOOLS_BATTLE_INFO = 'Entra nella stanza della gara con un tuo amico per gareggiare insieme';
var TOOLS_BATTLE_JOINALERT = 'Per favore inserisci l\'ID della stanza';
var TOOLS_BATTLE_LEAVEALERT = 'Lascia la stanza corrente';
var OLCOMP_UPDATELIST = 'Aggiorna Lista Competizioni';
var OLCOMP_VIEWRESULT = 'Vedi il risultato';
var OLCOMP_VIEWMYRESULT = 'I miei progressi';
var OLCOMP_START = 'Inizia!';
var OLCOMP_SUBMIT = 'Invia!';
var OLCOMP_SUBMITAS = 'Invia come:';
var OLCOMP_WCANOTICE = 'Invia come il tuo account WCA? (Rientra nel tuo account se non è stato riconosciuto dopo aver inviato)';
var OLCOMP_OLCOMP = 'Competizione Online';
var OLCOMP_ANONYM = 'Anonimo';
var OLCOMP_ME = 'Io';
var OLCOMP_WCAACCOUNT = 'Account WCA';
var OLCOMP_ABORT = 'Interrompi la competizione e mostra il risultato?';
var OLCOMP_WITHANONYM = 'Con Anonym';
var PROPERTY_IMGSIZE = 'Dimensione della visualizzazione dello scramble';
var PROPERTY_IMGREP = 'Mostra le animazioni del cubo virtuale al click sull\\\'immagine dello scramble';
var TIMER_INSPECT = 'Ispezione	';
var TIMER_SOLVE = 'Risoluzione';
var PROPERTY_USEMOUSE = 'usa il mouse per cronometrare';
var PROPERTY_TIMEU = 'L\'aggiornamento del cronometro e\'';
var PROPERTY_TIMEU_STR = 'Aggiorna|0.1s|secondi|inspezione|none';
var PROPERTY_PRETIME = 'Tempo di attesa dopo la pressione del tasto spazio (secondo(i))';
var PROPERTY_ENTERING = 'Inizia a cronometrare in';
var PROPERTY_ENTERING_STR = 'cronometro|digita|stackmat|MoYuTimer|virtuale|Bluetooth Cube|qCube|Bluetooth Timer|last layer training';
var PROPERTY_INTUNIT = 'Unità quando si digita un intero';
var PROPERTY_INTUNIT_STR = 'secondo|centisecondo|millisecondo';
var PROPERTY_COLOR = 'Seleziona tema colori';
var PROPERTY_COLORS = 'colore del testo|coloro dello sfondo|board color|colore bottoni|colore links|colore del Logo|colore di sfondo del Logo';
var PROPERTY_VIEW = 'Lo stile dell\'interfaccia è';
var PROPERTY_VIEW_STR = 'Auto|Mobile|Desktop';
var PROPERTY_UIDESIGN = 'Il design dell\'interfaccia è';
var PROPERTY_UIDESIGN_STR = 'Normale|Material design|Normale senza ombre|Material design senza ombre';
var COLOR_EXPORT = 'Conservare il codice per l\'import';
var COLOR_IMPORT = 'Inserire il codice di export';
var COLOR_FAIL = 'Dati incorretti, importazione fallita';
var PROPERTY_FONTCOLOR_STR = 'nero|bianco';
var PROPERTY_COLOR_STR = 'manuale|import/export...|casuale|stile1|stile2|stile3|nero|bianco|stile6|solarized dark|solarized light';
var PROPERTY_FONT = 'Seleziona il carattere del cronometro';
var PROPERTY_FONT_STR = 'digitale casuale|normale|digitale1|digitale2|digitale3|digitale4|digitale5';
var PROPERTY_FORMAT = 'Formato tempo';
var PROPERTY_USEKSC = 'Usa abbreviazioni da tastiea';
var PROPERTY_USEGES = 'usa controllo gestuale';
var PROPERTY_NTOOLS = 'Numero di strumenti';
var PROPERTY_AHIDE = 'Nascondi tutti gli elementi quando mi cronometro';
var SCRAMBLE_LAST = 'Ultimo';
var SCRAMBLE_NEXT = 'Prossimo';
var SCRAMBLE_SCRAMBLE = ' scramble';
var SCRAMBLE_SCRAMBLING = 'Scrambling';
var SCRAMBLE_LENGTH = 'Lunghezza';
var SCRAMBLE_INPUT = 'Inserisci Scramble';
var SCRAMBLE_INPUTTYPE = 'Tipo di scramble';
var PROPERTY_VRCSPEED = 'Velocità VCR (tps)';
var PROPERTY_VRCORI = 'Orientamento cubo virtuale';
var PROPERTY_VRCMP = 'multi-fase';
var PROPERTY_VRCMPS = 'Nessuno|CFOP|CF+OP|CFFFFOP|CFFFFOOPP|Roux';
var PROPERTY_GIIKERVRC = 'Mostra cubo Giiker virtuale';
var PROPERTY_GIISOK_DELAY = 'Considera scrambled dopo un\'attesa di';
var PROPERTY_GIISOK_DELAYS = '2s|3s|4s|5s|Mai|Mischiato corretamente';
var PROPERTY_GIISOK_KEY = 'Considera scrambled alla pressione di barra spazio';
var PROPERTY_GIISOK_MOVE = 'Considera scrambled quando esegue';
var PROPERTY_GIISOK_MOVES = 'U4,R4,etc|(U U\')2, (U\' U)2, etc|Mai';
var PROPERTY_GIISBEEP = 'Avviso sonoro a fine scramble';
var PROPERTY_GIIRST = 'Reset Giiker cube quando viene connesso';
var PROPERTY_GIIRSTS = 'Sempre|Chiedi|Mai';
var PROPERTY_GIIMODE = 'Bluetooth Cube Mode';
var PROPERTY_GIIMODES = 'Normale|Allenamento|Allenamento continuo';
var PROPERTY_VRCAH = 'Pezzi inutili nei cubi grandi';
var PROPERTY_VRCAHS = 'Hide|Border|Color|Show';
var CONFIRM_GIIRST = 'Reset Giiker cube come risolto?';
var PROPERTY_GIIAED = 'Rilevazione automatica errori hardware';
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
		['sq1', "sqrs", 0],
		['4x4 bld', "444bld", -40],
		['5x5 bld', "555bld", -60],
		['3x3 mbld', "r3ni", 5]
	]],
	['Ingresso', [
		['外部', "input", 0],
		['Competizione', "remoteComp", 0],
		['Gara online', "remoteBattle", 0],
		['Remote', "remoteOther", 0]
	]],
	['===WCA===', [
		['--', "blank", 0]
	]],
	['3x3x3', [
		["stato casuale (WCA)", "333", 0],
		['mossa casuale', "333o", 25],
		['3x3x3 per nabbi', "333noob", 25],
		['solo spigoli', "edges", 0],
		['solo angoli', "corners", 0],
		['Assistente BLD', "nocache_333bldspec", 0],
		['Pattern Tool', "nocache_333patspec", 0],
		['3x3 ft', "333ft", 0],
		['Custom', "333custom", 0]
	]],
	['3x3x3 CFOP', [
		['PLL', "pll", 0],
		['OLL', "oll", 0],
		['last slot + last layer', "lsll2", 0],
		['last layer', "ll", 0],
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
		['croce risolta', "f2l", 0],
		['EOLine', "eoline", 0],
		['EO Cross', "eocross", 0],
		['croce facile', "easyc", 3],
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
		["stato casuale (WCA)", "222so", 0],
		['ottimale', "222o", 0],
		['3-gen', "2223", 25],
		['EG', "222eg", 0],
		['CLL', "222eg0", 0],
		['EG1', "222eg1", 0],
		['EG2', "222eg2", 0],
		['TCLL+', "222tcp", 0],
		['TCLL-', "222tcn", 0],
		['TCLL', "222tc", 0],
		['LS', "222lsall", 0],
		['Nesuna barra', "222nb", 0]
	]],
	['4x4x4', [
		["WCA", "444wca", -40],
		['mossa casuale', "444m", 40],
		['SiGN', "444", 40],
		['YJ', "444yj", 40],
		['spigoli 4x4x4', "4edge", 0],
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
		['spigoli 5x5x5', "5edge", 8]
	]],
	['6x6x6', [
		["WCA", "666wca", 80],
		['SiGN', "666si", 80],
		['prefisso', "666p", 80],
		['suffisso', "666s", 80],
		['6x6x6 bordi', "6edge", 8]
	]],
	['7x7x7', [
		["WCA", "777wca", 100],
		['SiGN', "777si", 100],
		['prefisso', "777p", 100],
		['suffisso', "777s", 100],
		['7x7x7 bordi', "7edge", 8]
	]],
	['Clock', [
		['WCA', "clkwca", 0],
		['Wca (old)', "clkwcab", 0],
		['WCA w/o y2', "clknf", 0],
		['jaap', "clk", 0],
		['ottimale', "clko", 0],
		['conciso', "clkc", 0],
		['Ordine pin efficiente', "clke", 0]
	]],
	['Megaminx', [
		["WCA", "mgmp", 70],
		['Carota', "mgmc", 70],
		['vecchio stile', "mgmo", 70],
		['2-generatore R,U', "minx2g", 30],
		['Ultimo slot + ultimo strato', "mlsll", 0],
		['PLL', "mgmpll", 0],
		['Last Layer', "mgmll", 0]
	]],
	['Pyraminx', [
		["stato casuale (WCA)", "pyrso", 10],
		['ottimale', "pyro", 0],
		['mossa casuale', "pyrm", 25],
		['L4E', "pyrl4e", 0],
		['4 tips', "pyr4c", 0],
		['No bar', "pyrnb", 0]
	]],
	['Skewb', [
		["stato casuale (WCA)", "skbso", 0],
		['ottimale', "skbo", 0],
		['mossa casuale', "skb", 25],
		['No bar', "skbnb", 0]
	]],
	['Square-1', [
		["stato casuale (WCA)", "sqrs", 0],
		["CSP", "sqrcsp", 0],
		["PLL", "sq1pll", 0],
		['Giro della faccia metrica', "sq1h", 40],
		['torsione metrica', "sq1t", 20]
	]],
	['===ALTRO===', [
		['--', "blank", 0]
	]],
	['15 puzzle', [
		['stato casuale URLD', "15prp", 0],
		['stato casuale ^<>v', "15prap", 0],
		['stato casuale Blank', "15prmp", 0],
		['mossa casuale URLD', "15p", 80],
		['mossa casuale ^<>v', "15pat", 80],
		['mossa casuale Blank', "15pm", 80]
	]],
	['8 puzzle', [
		['stato casuale URLD', "8prp", 0],
		['stato casuale ^<>v', "8prap", 0],
		['stato casuale Blank', "8prmp", 0]
	]],
	['LxMxN', [
		['1x3x3 (Cubo Floppy)', "133", 0],
		['2x2x3 (Cubo a Torre)', "223", 0],
		['2x2x3 (Domino)', "233", 25],
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
		['stato casuale', "gearso", 0],
		['ottimale', "gearo", 0],
		['mossa casuale', "gear", 10]
	]],
	['Kilominx', [
		['stato casuale', "klmso", 0],
		['Pochmann', "klmp", 30]
	]],
	['Gigaminx', [
		['Pochmann', "giga", 300]
	]],
	['Crazy Puzzle', [
		['Crazy 3x3x3', "crz3a", 30]
	]],
	['Cmetrico', [
		['Cmetrico', "cm3", 25],
		['Cmetrico Mini', "cm2", 25]
	]],
	['Cubo Elicottero', [
		['Heli copter', "heli", 40],
		['Curvy copter', "helicv", 40],
		['2x2 Heli random move', "heli2x2", 70],
		['2x2 Heli by group', "heli2x2g", 5]
	]],
	['Cubo Redi', [
		['stato casuale', "rediso", 0],
		['MoYu', "redim", 8],
		['mossa casuale', "redi", 20]
	]],
	['Dino Cube', [
		['stato casuale', "dinoso", 0],
		['ottimale', "dinoo", 0]
	]],
	['Ivy cube', [
		['stato casuale', "ivyso", 0],
		['ottimale', "ivyo", 0],
		['mossa casuale', "ivy", 10]
	]],
	['Master Pyraminx', [
		['stato casuale', "mpyrso", 0],
		['mossa casuale', "mpyr", 42]
	]],
	['Pyraminx Crystal', [
		['Pochmann', "prcp", 70],
		['vecchio stile', "prco", 70]
	]],
	['Cubo Siamese', [
		['Blocco 1x1x3', "sia113", 25],
		['Blocco 1x2x3', "sia123", 25],
		['Blocco 2x2x2', "sia222", 25]
	]],
	['Square', [
		['Square-2', "sq2", 20],
		['Super Square-1', "ssq1t", 20]
	]],
	['Super Floppy', [
		[' ', "sfl", 25]
	]],
	['UFO', [
		['Stile Jaap', "ufo", 25]
	]],
	['FTO (Giro faccia Ottaedro)', [
		['stato casuale', "ftoso", 0],
		['mossa casuale', "fto", 30],
		['L3T', "ftol3t", 0],
		['L3T+LBT', "ftol4t", 0],
		['TCP', "ftotcp", 0],
		['edges only', "ftoedge", 0],
		['centers only', "ftocent", 0],
		['corners only', "ftocorn", 0],
		['Diamond stato casuale', "dmdso", 0]
	]],
	['Icosahedron', [
		['Icosamate mossa casuale', "ctico", 60]
	]],
	['===SPECIALI===', [
		['--', "blank", 0]
	]],
	['Sottoinsieme 3x3x3', [
		['2-generatore R,U', "2gen", 0],
		['2-generatore L,U', "2genl", 0],
		['Roux-generatore M,U', "roux", 0],
		['3-generatore F,R,U', "3gen_F", 0],
		['3-generatore R,U,L', "3gen_L", 0],
		['3-generatore R,r,U', "RrU", 0],
		['Domino Subgroup', "333drud", 0],
		['Solo mezzi giri', "half", 0],
		['Ultimo slot + Ultimo strato (vecchio)', "lsll", 15]
	]],
	['Cubo Bendato', [
		['Cubo BI', "bic", 30],
		['Square-1 /,(1,0)', "bsq", 25]
	]],
	['Relay', [
		['tanti 3x3x3', "r3", 5],
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
	['ruota la faccia in alto', 'ruota la faccia in basso'],
	['ruota la faccia a destra', 'ruota la faccia a sinistra'],
	['ruota la faccia frontale', 'ruota la faccia posteriore']
];
var SCRAMBLE_NOOBSS = ' ruota orario 90 gradi,| ruota antiorario 90 gradi,| ruota 180 gradi,';
var SCROPT_TITLE = 'Opzioni di scramble';
var SCROPT_BTNALL = 'Full';
var SCROPT_BTNNONE = 'Clear';
var SCROPT_EMPTYALT = 'Per favore seleziona almeno un caso';
var STATS_CFM_RESET = 'Azzera tutti i tempi in questa sessione?';
var STATS_CFM_DELSS = 'eliminare la sessione [%s]?';
var STATS_CFM_DELMUL = 'Quanti tempi eliminare a partire dall\'indice corrente?';
var STATS_CFM_DELETE = 'Camcella questo tempo?';
var STATS_COMMENT = 'Commento';
var STATS_REVIEW = 'Revisione';
var STATS_DATE = 'Data';
var STATS_SSSTAT = '1-solve stat.';
var STATS_SSRETRY = 'Riprova';
var STATS_CURROUND = 'Statistiche del Turno Corrente';
var STATS_CURSESSION = 'Statistiche della Sessione Corrente';
var STATS_CURSPLIT = 'Fase %d della sessione corrente di statistiche';
var STATS_EXPORTCSV = 'Esporta CSV';
var STATS_SSMGR_TITLE = 'Gestore Sessioni';
var STATS_SSMGR_NAME = 'Nome';
var STATS_SSMGR_DETAIL = 'Dettagli sessione';
var STATS_SSMGR_OPS = 'Rinomina|Crea|Dividi|Unisci|Elimina|Ordina|Merge&Dedupe';
var STATS_SSMGR_ORDER = 'Ordina per scramble';
var STATS_SSMGR_ODCFM = 'Ordina le sessioni per scramble?';
var STATS_SSMGR_SORTCFM = '%d solve(s) will be reordered, confirm?';
var STATS_ALERTMG = 'Unire tutti i tempi nella sessione [%f] alla fine della sessione [%t]?';
var STATS_PROMPTSPL = 'Numero degli ultimi tempi da separare dalla sessione [%s]?';
var STATS_ALERTSPL = 'Dovrebbe essere diviso o essere lasciato almeno una volta';
var STATS_AVG = 'media';
var STATS_SUM = 'Somma';
var STATS_SOLVE = 'risoluzione';
var STATS_TIME = 'tempo';
var STATS_SESSION = 'Sessione';
var STATS_SESSION_NAME = 'Rinomina sessione';
var STATS_SESSION_NAMEC = 'Nome della nuova sessione';
var STATS_STRING = 'migliore|corrente|peggiore|Generato Da csTimer il %Y-%M-%D|risoluzioni/totale: %d|singolo|media di %mk|avg su %mk|Avg   : %v{ (σ = %sgm)}|Media : %v|Lista Tempi:|solving from %s to %e|Totally spent: %d|target';
var STATS_PREC = 'Precisione distribuzione temporale';
var STATS_PREC_STR = 'auto|0.1s|0.2s|0.5s|1s|2s|5s|10s|20s|50s|100s';
var STATS_TYPELEN = 'lista %d tipo|lista %d lunghezza|average|mean';
var STATS_STATCLR = 'Abilita lo svuotamento della sessione';
var STATS_ABSIDX = 'Mostra indice assoluto nel report statistiche';
var STATS_XSESSION_DATE = 'qualsiasi data|ultime 24 ore|ultimi 7 giorni|ultimi 30 giorni|ultimi 365 giorni';
var STATS_XSESSION_NAME = 'qualsiasi nome';
var STATS_XSESSION_SCR = 'qualsiasi scramble';
var STATS_XSESSION_CALC = 'Calc';
var STATS_RSFORSS = 'Mostra statistiche quando si seleziona il numero della risoluzione ';
var PROPERTY_PRINTSCR = 'Stampa scramble(s) con le statistiche';
var PROPERTY_PRINTCOMM = 'stampa commenti con le statistiche';
var PROPERTY_PRINTDATE = 'visualizza la data di risoluzione nelle statistiche';
var PROPERTY_SUMMARY = 'mostra riepilogo prima della lista dei tempi';
var PROPERTY_IMRENAME = 'rinomina la sessione subito dopo la creazione';
var PROPERTY_SCR2SS = 'crea una nuova sessione quando si cambia tipo di scramble';
var PROPERTY_SS2SCR = 'ripristina il tipo di scramble quando si cambia la sessione';
var PROPERTY_SS2PHASES = 'ripristina multi-fase al cambio di sessione';
var PROPERTY_STATINV = 'Lista tempi invertita';
var PROPERTY_STATSSUM = 'Mostra la somma nella lista tempi';
var PROPERTY_STATTHRES = 'Show target time for session best';
var PROPERTY_STATBPA = 'Mostra la migliore media possibile (best possible average - BPA)';
var PROPERTY_STATWPA = 'Mostra la peggiore media possibile (worst possible average - WPA)';
var PROPERTY_STATAL = 'Indicatori statistici';
var PROPERTY_STATALU = 'Indicatore statistico personalizzato';
var PROPERTY_HLPBS = 'Highlight PBs';
var PROPERTY_HLPBS_STR = 'Dark orange as WCA|As link color|Bolder|None';
var PROPERTY_DELMUL = 'Abilita eliminazione multipla';
var PROPERTY_TOOLSFUNC = 'Funzione selezionata';
var PROPERTY_TRIM = 'Numero di soluzioni eliminate da ogni lato';
var PROPERTY_TRIMR = 'Numero risoluzioni peggiori non conteggiate ';
var PROPERTY_TRIM_MED = 'Mediana';
var PROPERTY_STKHEAD = 'Usa informationi sullo stato dello Stackmat';
var PROPERTY_TOOLPOS = 'Posizione del pannello strumenti';
var PROPERTY_TOOLPOS_STR = 'In basso|Libero|In alto';
var PROPERTY_HIDEFULLSOL = 'Mostra la soluzione progressivamente';
var PROPERTY_IMPPREV = 'Importa dati precedenti';
var PROPERTY_AUTOEXP = 'Auto Export (per 100 solves)';
var PROPERTY_AUTOEXP_OPT = 'Mai|File locale|Con ID csTimer|Con account WCA|Con account Google|Solo avviso';
var PROPERTY_SCRASIZE = 'Dimensione auto scramble';
var MODULE_NAMES = {
	"kernel": 'globale',
	"ui": 'schermo',
	"color": 'colori',
	"timer": 'cronometro',
	"scramble": 'scramble',
	"stats": 'statistiche',
	"tools": 'strumenti',
	"vrc": 'virtuale&<br>bluetooth'
};
var BGIMAGE_URL = 'Inserire url dell\'immagine';
var BGIMAGE_INVALID = 'URL non valida';
var BGIMAGE_OPACITY = 'Opacità immagine di sfondo';
var BGIMAGE_IMAGE = 'Immagine di sfondo';
var BGIMAGE_IMAGE_STR = 'nessuna|manuale|CCT';
var SHOW_AVG_LABEL = 'Mostra svg sotto al cronometro';
var SHOW_DIFF_LABEL = 'Mostra etichetta Differenza';
var SHOW_DIFF_LABEL_STR = '-Verde+Rosso|-Rosso+Verde|Normale|Nessuno';
var USE_LOGOHINT = 'Suggerimenti nel logo';
var TOOLS_SCRGEN = 'Generatore di scramble';
var SCRGEN_NSCR = 'Numbero di scrambles';
var SCRGEN_PRE = 'Prefisso';
var SCRGEN_GEN = 'Genera Scrambles!';
var VRCREPLAY_TITLE = 'Virtual Replay';
var VRCREPLAY_ORI = 'raw ori|auto ori';
var VRCREPLAY_SHARE = 'share link';
var GIIKER_CONNECT = 'Premi per connetterti';
var GIIKER_RESET = 'Reset (Mark Solved)';
var GIIKER_REQMACMSG = 'Per favore inserisci il MAC address del tuo smart hardware (xx:xx:xx:xx:xx:xx). Puo trovare il MAC address usando chrome://bluetooth-internals/#devices, oppure abilitando csTimer ad ottenerlo automaticamente:\nIn Chrome: Abilita chrome://flags/#enable-experimental-web-platform-features\nIn Bluefy: Abilita Enable BLE Advertisements';
var GIIKER_NOBLEMSG = 'L\\\'API Bluetooth non è disponibile. Assicurati ci sia accesso https, verifica che il bluetooth sia abilitato sul tuo dispositivo, e conferma con chrome al link chrome://flags/#enable-experimental-web-platform-features che la feature sia abilitata';
var PROPERTY_SHOWAD = 'Mostra avvisi commerciali';
var PROPERTY_GIIORI = 'Orientamento del cubo';
var LGHINT_INVALID = 'Valore invalido!';
var LGHINT_NETERR = 'Errore Network!';
var LGHINT_SERVERR = 'Errore Server!';
var LGHINT_SUBMITED = 'Submitted';
var LGHINT_SSBEST = 'Session best %s!';
var LGHINT_SCRCOPY = 'Scramble copied';
var LGHINT_LINKCOPY = 'Share link copiato';
var LGHINT_SOLVCOPY = 'Risoluzione copiata';
var LGHINT_SORT0 = 'Gia ordinato';
var LGHINT_IMPORTED = 'Importa %d sessioni';
var LGHINT_IMPORT0 = 'Nessuna sessione importata';
var LGHINT_BTCONSUC = 'Bluetooth Connesso';
var LGHINT_BTDISCON = 'Bluetooth Disconnesso';
var LGHINT_BTNOTSUP = 'Il tuo smart cube non è supportato';
var LGHINT_BTINVMAC = 'Non è un MAC address valido, non posso connettere il tuo smart cube';
var LGHINT_AEXPABT = 'Auto export interrotto';
var LGHINT_AEXPSUC = 'Auto export completato';
var LGHINT_AEXPFAL = 'Auto export fallito';
var EASY_SCRAMBLE_HINT = 'Cambia la lunghezza per limitare superiormente la lunghezza della soluzione; inserisci 2 cifre per limitare sia inferiormente (≤ 8) che superiormente.';
