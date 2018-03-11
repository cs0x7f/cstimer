var OK_LANG = 'OK';
var CANCEL_LANG = 'Annuler';
var RESET_LANG = 'Défaut';
var ABOUT_LANG = 'À propos';
var ZOOM_LANG = 'Zoom';
var BUTTON_TIME_LIST = 'LISTE<br>TEMPS';
var BUTTON_OPTIONS = 'Options';
var BUTTON_EXPORT = 'Exporter';
var BUTTON_DONATE = 'Faire une donation';
var PROPERTY_USEINS = 'Utiliser l\'inspection WCA';
var PROPERTY_VOICEINS = 'Voix d\'alerte de l\'inspection WCA : ';
var PROPERTY_VOICEINS_STR = 'Aucune|Voix masculine|Voix féminine';
var PROPERTY_USECFM = 'Confirmer le temps (OK/+2/DNF)';
var PROPERTY_PHASES = 'Multi-phase : ';
var PROPERTY_TIMERSIZE = 'Taille du chronomètre : ';
var CFMDIV_CURTIME = 'Le temps est : ';
var PROPERTY_USEMILLI = 'Utiliser les millisecondes';
var PROPERTY_SMALLADP = 'Utiliser une petite police après la virgule des décimales';
var PROPERTY_SCRSIZE = 'Taille du mélange : ';
var PROPERTY_SCRMONO = 'Mélange à espacement fixe';
var PROPERTY_SCRLIM = 'Limiter la taille de la zone de mélange';
var PROPERTY_SCRALIGN = 'Alignement de la zone de mélange : ';
var PROPERTY_SCRALIGN_STR = 'Centrer|Gauche|Droite';
var EXPORT_DATAEXPORT = 'Importer/Exporter des données';
var EXPORT_TOFILE = 'Exporters vers';
var EXPORT_FROMFILE = 'Importer de';
var EXPORT_TOSERV = 'Exporter vers un serveur';
var EXPORT_FROMSERV = 'Importer d\'un serveur';
var EXPORT_USERID = 'S\'il vous plaît, rentrez votre compte (seulement des lettres ou des chiffres) : ';
var EXPORT_INVID = 'Seul sont autorisés les lettres et les chiffres !';
var EXPORT_ERROR = 'Des erreurs se sont produites...';
var EXPORT_NODATA = 'Aucune donnée n\'a été trouvé sur votre compte';
var EXPORT_UPLOADED = 'Envoyé avec succès';
var BUTTON_SCRAMBLE = 'MELA-<br>NGE';
var BUTTON_TOOLS = 'OUTILS';
var IMAGE_UNAVAILABLE = 'Non disponible pour ce type de mélange';
var TOOLS_SELECTFUNC = 'Fonction : ';
var TOOLS_CROSS = 'Résoudre la croix';
var TOOLS_EOLINE = 'Résoudre l\'EOLine';
var TOOLS_IMAGE = 'Schéma du mélange';
var TOOLS_STATS = 'Statistiques';
var TOOLS_DISTRIBUTION = 'Répartition des temps';
var TOOLS_TREND = 'Tendance des temps';
var PROPERTY_IMGSIZE = 'Taille de l\'image du mélange : ';
var TIMER_INSPECT = 'Inspection';
var TIMER_SOLVE = 'Résolution';
var PROPERTY_USEMOUSE = 'use mouse timer';
var PROPERTY_TIMEU = 'Rafraîchissement du chronomètre : ';
var PROPERTY_TIMEU_STR = 'Normal|0.1s|Secondes|Inspection|Non';
var PROPERTY_PRETIME = 'Tenir la barre d\'espace appuyée pendant (en secondes) : ';
var PROPERTY_ENTERING = 'Entrer les temps avec ';
var PROPERTY_ENTERING_STR = 'Clavier|Manuellement|Stackmat|Virtuel';
var PROPERTY_COLOR = 'Couleur du thème : ';
var PROPERTY_COLORS = 'Couleur de la police : |Couleur de fond : |Couleur de panneau : |Couleur de bouton : |Couleur de lien : |Couleur du logo : |Couleur  de fond du logo : ';
var PROPERTY_VIEW = 'Le style de l\'interface est :';
var PROPERTY_VIEW_STR = 'Auto|Mobile|Bureau';
var COLOR_EXPORT = 'Please save the string for import: ';
var COLOR_IMPORT = 'Please input the string exported: ';
var COLOR_FAIL = 'Données incorrectes, Importation échoué';
var PROPERTY_FONTCOLOR_STR = 'Noir|Blanc';
var PROPERTY_COLOR_STR = 'Aléatoire|Style1|Style2|Style3|Noir|Blanc|Style6|Personnalisée|Exporter...|Importer...';
var PROPERTY_FONT = 'Police du chronomètre : ';
var PROPERTY_FONT_STR = 'Digital aléatoire|Normal|Digital1|Digital2|Digital3|Digital4|Digital5';
var PROPERTY_FORMAT = 'Format du temps : '
var PROPERTY_USEKSC = 'Utiliser les raccourcis clavier';
var PROPERTY_NTOOLS = 'Nombre d\'outils';
var PROPERTY_AHIDE = 'Cacher tous les éléments lors du chronométrage';
var SCRAMBLE_LAST = 'Dernier';
var SCRAMBLE_NEXT = 'Prochain';
var SCRAMBLE_SCRAMBLE = ' Mélange';
var SCRAMBLE_LENGTH = 'Longueur';
var SCRAMBLE_INPUT = 'Entrer mélange(s)';
var scrdata = [
	['WCA', [
		['3x3x3', "333", 0],
		['4x4x4', "444wca", -40],
		['5x5x5', "555wca", -60],
		['2x2x2', "222so", 0],
		['3x3 bld', "333ni", 0],
		['3x3 oh', "333oh", 0],
		['3x3 fm', "333fm", 0],
		['3x3 ft', "333ft", 0],
		['megaminx', "mgmp", -70],
		['pyraminx', "pyrso", -10],
		['sq1', "sqrs", 0],
		['clock', "clkwca", 0],
		['skewb', "skbso", 0],
		['6x6x6', "666wca", -80],
		['7x7x7', "777wca", -100],
		['4x4 bld', "444bld", -40],
		['5x5 bld', "555bld", -60],
		['3x3 mbld', "r3ni", 5]
	]],
	['Entrer', [
		['外部', "input", 0]
	]],
	['===WCA===', [
		['--', "blank", 0]
	]],
	['2x2x2', [
		["WCA", "222so", 0],
		['Algorithme optimal', "222o", 0],
		['3-gen', "2223", 25],
		['EG', "222eg", 0],
		['EG0', "222eg0", 0],
		['EG1', "222eg1", 0],
		['EG2', "222eg2", 0]
	]],
	['3x3x3', [
		["WCA", "333", 0],
		['Ancien style', "333o", 25],
		['3x3x3 pour débutants', "333noob", 25],
		['Arêtes seulement', "edges", 0],
		['Coins seulement', "corners", 0],
		['Dernier étage', "ll", 0],
		['Dernier étage (ZB)', "zbll", 0],
		['Coins du dernier étage', "cll", 0],
		['Arêtes du dernier étage', "ell", 0],
		['Six dernières arêtes', "lse", 0],
		['Six dernières arêtes&ltM,U&gt', "lsemu", 0],
		['Roux L10P', "cmll", 0],
		['Croix résolue', "f2l", 0],
		['Dernier slot + dernier étage', "lsll2", 0],
		['2GLL', "2gll", 0],
		['ZBLS', "zbls", 0],
		['ZZLL', "zzll", 0],
		['PLL', "pll", 0],
		['EOLine', "eoline", 0],
		['Croix facile', 'easyc', 3]
	]],
	['4x4x4', [
		["WCA", "444wca", 40],
		['SiGN', "444", 40],
		['Position aléatoire', "444o", 0],
		['YJ', "444yj", 40],
		['Arêtes 4x4x4', "4edge", 8],
		['R,r,U,u', "RrUu", 40]
	]],
	['5x5x5', [
		["WCA", "555wca", 60],
		['SiGN', "555", 60],
		['Arêtes 5x5x5', "5edge", 8]
	]],
	['6x6x6', [
		["WCA", "666wca", 80],
		['SiGN', "666si", 80],
		['Préfixe', "666p", 80],
		['Suffixe', "666s", 80],
		['Arêtes 6x6x6', "6edge", 8]
	]],
	['7x7x7', [
		["WCA", "777wca", 100],
		['SiGN', "777si", 100],
		['Préfixe', "777p", 100],
		['Suffixe', "777s", 100],
		['Arêtes 7x7x7', "7edge", 8]
	]],
	['Clock', [
		['jaap', "clk", 0],
		['wca', "clkwca", 0],
		['optimal', "clko", 0],
		['Concis', "clkc", 0],
		['Ordre des boutons fixe', "clke", 0]
	]],
	['Megaminx', [
		["WCA", "mgmp", 70],
		['Carrot', "mgmc", 70],
		['Ancien style', "mgmo", 70]
	]],
	['Pyraminx', [
		["WCA", "pyrso", 10],
		['Position aléatoire optimale', "pyro", 0],
		['Mouvements aléatoires', "pyrm", 25]
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
		['Pièces', "15p", 80],
		['Case vide', "15pm", 80]
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
		['Position aléatoire', "gearso", 0],
		['Position aléatoire optimale', "gearo", 0],
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
		[' ', "redi", 20]
	]],
	['Pyraminx Crystal', [
		['Pochmann', "prcp", 70],
		['Ancien style', "prco", 70]
	]],
	['Siamese Cube', [
		['Bloc 1x1x3', "sia113", 25],
		['Block 1x2x3', "sia123", 25],
		['Bloc 2x2x2', "sia222", 25]
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
	['Subsets 3x3x3', [
		['Générateur R,U', "2gen", 25],
		['Générateur L,U', "2genl", 25],
		['Générateur Roux M,U', "roux", 25],
		['Générateur F,R,U', "3gen_F", 25],
		['Générateur R,U,L', "3gen_L", 25],
		['Générateur R,r,U', "RrU", 25],
		['Demi-tours seulement', "half", 25],
		['Dernier slot + dernier étage (ancien)', "lsll", 15]
	]],
	['Bandaged Cube', [
		['Bicube', "bic", 30],
		['Square-1 /,(1,0)', "bsq", 25]
	]],
	['Subsets megaminx', [
		['Générateur R,U', "minx2g", 30],
		['Dernier slot + dernier étage', "mlsll", 20]
	]],
	['Relais', [
		['Plusieurs 3x3x3', "r3", 5],
		['Relai 234', "r234", 0],
		['Relai 2345', "r2345", 0],
		['Relai 23456', "r23456", 0],
		['Relai 234567', "r234567", 0]
	]],
	['===BLAGUES===', [
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
	['Tourne la face du haut', 'Tourne la face du bas'],
	['Tourne la face de droite', 'Tourne la face de gauche'],
	['Tourne la face de devant', 'Tourne la face de derrière']
];
var SCRAMBLE_NOOBSS = ' de 90 degrés dans le sens des aiguilles d\'une montre, | de 90 degrés dans le sens inverse des aiguilles d\'une montre, | de 180 degrés, ';
var STATS_CFM_RESET = 'Effacer tous les temps de cette session ?';
var STATS_CFM_DELSS = 'Effacer cette session ?';
var STATS_CFM_DELMUL = 'Nombre de valeurs effacées de l\'index en cours ?';
var STATS_CFM_DELETE = 'Effacer ce temps ?';
var STATS_COMMENT = 'Commentaire : ';
var STATS_CURROUND = 'Statistiques de la moyenne';
var STATS_CURSESSION = 'Statistiques de la session en cours';
var STATS_AVG = 'Moyenne';
var STATS_SOLVE = 'Résolution';
var STATS_TIME = 'Temps';
var STATS_SESSION = 'Session';
var STATS_SESSION_NAME = 'Nom de la session';
var STATS_STRING = 'Meilleure|En cours|Moins bonne|Généré par csTimer le %Y-%M-%D|Résolutions/Total: %d|Résolution|Moyenne sur %mk|Moyenne élaguée sur %mk|Moyenne élaguée: %v{ (σ = %sgm)}|Moyenne: %v|Liste des temps:';
var STATS_PREC = 'Précision de la répartition des temps: ';
var STATS_PREC_STR = 'Auto|0.1s|0.2s|0.5s|1s|2s|5s|10s|20s|50s|100s';
var STATS_TYPELEN = 'list %d type|list %d length|average|mean';
var PROPERTY_PRINTSCR = 'Montrer les mélanges dans les statistiques';
var PROPERTY_SUMMARY = 'Montrer le résumé avant la liste de temps';
var PROPERTY_IMRENAME = 'Renommer la session immédiatement après création';
var PROPERTY_SCR2SS = 'Créer une nouvelle session lors du changement de type de mélange';
var PROPERTY_SS2SCR = 'Restaurer le type de mélange lors d\'un changement de session';
var PROPERTY_SS2PHASES = 'restore multi-phase timing when switching session';
var PROPERTY_STATINV = 'Inverser la liste des temps';
var PROPERTY_STATAL = 'Indiquateurs statistiques : ';
var PROPERTY_DELMUL = 'Activer la suppression multiple';
var MODULE_NAMES = {
	"ui": 'Affichage',
	"color": 'Couleur',
	"timer": 'Chronomètre',
	"kernel": 'Global',
	"scramble": 'Mélange',
	"stats": 'Statistiques',
	"tools": 'Outils'
};
var BGIMAGE_URL = 'Entrez l\'adresse URL de l\'image';
var BGIMAGE_INVALID = 'Adresse invalide';
var BGIMAGE_OPACITY = 'Opacité de l\'image de fond : ';
var BGIMAGE_IMAGE = 'Image de fond : ';
var BGIMAGE_IMAGE_STR = 'Aucune|Personnalisée|CCT';
var SHOW_AVG_LABEL = 'Afficher les moyennes en cours';
var TOOLS_SCRGEN = 'Générateur de mélange';
var SCRGEN_NSCR = 'Nombre de mélanges : ';
var SCRGEN_PRE = 'Préfixe : ';
var SCRGEN_GEN = 'Générer des mélanges !';
