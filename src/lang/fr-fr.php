<h1>csTimer version <?php echo $version;?> - Chronomètre Professionnel de Speedcubing</h1>
<?php include('lang.php') ?>
<h2>Introduction</h2>
<p>csTimer est un chronomètre professionnel conçu pour les speedcubers. Il permet de :</p>
<ul>
<li>Générer des mélanges pour <strong>toutes les épreuves officielles de la WCA</strong> ainsi que pour d'autres puzzles non officiels. Il permet aussi de générer des <strong>mélanges pour s'entraîner</strong> sur des étapes spécifiques (par ex. <strong>F2L, OLL, PLL, ZBLL</strong>, avec filtre des différents cas), etc.</li>
<li>Accéder à de nombreuses fonctions statistiques : enregistrer les <strong>temps de passage</strong>; <strong>un nombre illimité de sessions</strong>, fusion/séparation de session, etc.</li>
<li>Utiliser des solveurs pour différentes étapes : <strong>Croix, Croix étendue, Face 2x2x2, Face Skewb, Forme du SQ1</strong>, aussi bien pour apprendre que pour s'entraîner.</li>
<li>Utiliser des outils annexes : affichage du mélange sous forme d'aperçu, alerte vocale aux 8 secondes d'inspection, métronome, génération de mélanges par lot, etc.</li>
<li>Sauvegarder vos résolutions sur le serveur de csTimer ou sur Google Storage, ou les exporter sous forme de fichier.</li>
</ul>
<p>csTimer fonctionne avec la plupart des navigateurs modernes sur ordinateurs, smartphones et tablettes. Vous pouvez ajouter csTimer à votre écran d'accueil, il se lancera alors comme une application native.</p>
<p>Parce qu'il utilise le cache de votre navigateur, csTimer ne sollicite votre bande passante que lorsque vous chargez la page pour la première fois. csTimer peut ensuite fonctionner hors connexion internet (sauf pour les fonctionnalités telles que la sauvegarde)</p>
<h3>Droits d'auteur (Copyright)</h3>
<p>csTimer est un logiciel Open Source sous licence GPLv3. Si vous avez des suggestions ou des commentaires sur csTimer, veuillez les soumettre <a class="click" href="https://github.com/cs0x7f/cstimer/issues" title="">ici</a></p>
<p>Codé par: <a href="mailto:cs0x7f@gmail.com">Chen Shuang (cs0x7f@gmail.com)</a></p>
<p>Interface utilisateur (UI) conçue par: <a href="mailto:liebe7@126.com">Yue Zhang (liebe7@126.com)</a></p>
<h2>Fonctionnalités de base</h2>
<ul>
<li><strong>Comment chronométrer</strong> - Pressez la barre d'espace  / ou les deux touches Ctrl gauche et droite (ou touchez l'écran sur les appareils mobiles). Attendez que le chronomètre passe au vert. Il démarre dès que vous relâchez la barre d'espace. Pour arrêter le chronomètre, tapez sur n'importe quelle touche ; votre temps de résolution est alors enregistré.</li>
<li><strong>Description de l'interface</strong> - Il y a 6 boutons près du logo csTimer : Options, Exporter, Mélange, Mes Temps, Faire un don, Outils. Cliquez sur <strong>Mélange</strong>, <strong>Mes Temps</strong> ou <strong>Outils</strong> pour ouvrir le panneau de fonctions correspondant.</li>
<li><strong>Panneau de mélange</strong> - Dans le panneau Mélange, vous pouvez sélectionner le type de mélange, définir la longueur du mélange, filtrer par cas (si disponible), revoir le mélange précédent, générer le mélange suivant.</li>
<li><strong>Panneau Mes Temps</strong> - Dans le panneau Mes Temps, cliquez sur "Session" pour afficher le gestionnaire de sessions. Vous pouvez sélectionner/ajouter/supprimer des sessions. Vous pouvez afficher le single/la moyenne actuelle, le meilleur single/la meilleure moyenne et la liste de tous vos temps. Le bouton"X" à droite du sélecteur de session permet de remettre une session à zéro.</li>
<li><strong>Panneau Outils</strong> - Dans ce panneau, vous pouvez sélectionner des fonctions auxiliaires spécifiques telles que l'aperçu du mélange, le générateur de mélanges, des solvers et d'autres types de statistiques.</li>
</ul>
<h2>Raccourcis clavier</h2>
<table class="table" style="display: inline-block;">
<tr><th>Touche</th><td>Fonctionnalité</td></tr>
<tr><th>Alt + 1</th><td>Type de mélange pour Square-1</td></tr>
<tr><th>Alt + 2 ~ 7</th><td>Type de mélange pour 2x2x2~7x7x7</td></tr>
<tr><th>Alt + p/m/c/s</th><td>Type de mélange pour pyra/megaminx/clock/skewb</td></tr>
<tr><th>Alt + i</th><td>Type de mélange à saisir</td></tr>
<tr><th>Alt + d</th><td>Supprimer toutes les résolutions de la session en cours</td></tr>
<tr><th>Ctrl/Alt + z</th><td>Supprimer la dernière résolution</td></tr>
<tr><th>Alt + haut/bas</th><td>Aller à la session suivante/précédente</td></tr>
<tr><th>Alt + gauche/droite</th><td>Afficher le mélange précédent /suivant</td></tr>
<tr><th>Ctrl + 1/2/3</th><td>La dernière résolution est OK/+2/DNF</td></tr>
<tr><th>Ctrl + Alt + t/i/s/v/g/q/b/l</th><td>Entering in times with timer/typing/stackmat/virtual/bluetooth cube/qcube/bluetooth timer/last layer</td></tr>
</table>

<table class="table" style="display: inline-block;">
<tr><th>Geste</th><td>Fonctionnalité</td></tr>
<tr><th>Haut gauche</th><td>La dernière résolution est DNF</td></tr>
<tr><th>Haut</th><td>La dernière résolution est +2</td></tr>
<tr><th>Haut droite</th><td>La dernière résolution est OK</td></tr>
<tr><th>Gauche</th><td>Dernier mélange</td></tr>
<tr><th>Droite</th><td>Prochain mélange</td></tr>
<tr><th>Bas gauche</th><td>Commenter la dernière résolution</td></tr>
<tr><th>Bas</th><td>Supprimer la dernière résolution</td></tr>
<tr><th>Bas droite</th><td>Revoir la dernière résolution</td></tr>
</table>

<table class="table" id="vrckey" style="display: inline-block;">
<tr><th colspan=10>Raccourcis du cube virtuel</th></tr>
</table>

<h2>Descriptions des options</h2>
<ul>
<li><strong data="opt_ahide">Cacher tous les éléments lors du chronométrage</strong>. Cacher le logo et tous les panneaux lors du chronométrage.</li>
<li><strong data="opt_useMilli">Utiliser les millisecondes</strong>. Afficher les millisecondes. Si cette fonction est désactivée, la précision du chronométrage reste néanmoins de 1 milliseconde.</li>
<li><strong data="opt_timeFormat">Format du temps</strong>. Format du temps à afficher.</li>
<li><strong data="opt_atexpa">Exportation automatique (par 100 résolutions)</strong>. Si la fonction est activée, csTimer exporte automatiquement vos temps toutes les 100 résolutions vers l'endroit spécifié (fichier local, server de csTimer ou stockage Google).</li>
<li><strong data="opt_expp">Importer d&#x27;anciennes données</strong>. Si vous avez chargé plusieurs sauvegardes, vous pouvez importer 1 à 10 des sauvegardes les plus récemment chargées. Si vous avez accidentellement chargé une sauvegarde vide, cette option vous aidera à récupérer vos résolutions.</li>
<li><strong data="opt_useLogo">Afficher des messages dans le bloc du logo</strong>. Le panneau du logo csTimer peut afficher des informations pertinentes pour vous ; par exemple le fait que vous venez de battre votre PB.</li>
<li><strong data="opt_showAvg">Afficher les moyennes en cours</strong>. Vos moyennes en cours s'affichent sous le chronomètre principal : ao5 (Average of 5) et ao12 (Average of 12).</li>
<li><strong data="opt_zoom">Zoom</strong>. Cette option vous permet d'ajuster la taille de tous les éléments.</li>
<li><strong data="opt_font">Police du chronomètre</strong>. Police de caractères du chronomètre</li>
<li><strong data="opt_uidesign">L&#x27;interface utilisateur est</strong>. Cette option permet d'afficher l'interface en "material design", ou d'en masquer les ombres.</li>
<li><strong data="opt_view">Type d&#x27;interface</strong>. Basculer entre l'affichage bureau et mobile.</li>
<li><strong data="opt_wndScr">Style du panneau Mélange</strong>. Incruster le mélange dans l'arrière-plan.</li>
<li><strong data="opt_wndStat">Style du panneau Statistiques</strong>. Incruster la liste des temps dans l'arrière-plan.</li>
<li><strong data="opt_wndTool">Style du panneau Outils</strong>. Incruster la boîte à outils dans l'arrière-plan.</li>
<li><strong data="opt_bgImgO">Opacité du fond </strong>. Opacité de l'image d'arrière-plan.</li>
<li><strong data="opt_bgImgS">Image de fond</strong>. Vous pouvez afficher votre propre image en arrière-plan mais seules les urls en https fonctionnent à cause des contraintes de sécurité du navigateur.</li>
<li><strong data="opt_timerSize">Taille du chronomètre</strong>. Définir la taille du chronomètre principal.</li>
<li><strong data="opt_smallADP">Utiliser une petite police pour les décimales</strong>. Utiliser une police plus petite pour les décimales du chronomètre principal.</li>
<li><strong data="opt_color">Couleur du thème</strong>. Select color schemes of csTimer. Click csTimer's logo to show more color schemes.</li>
<li><strong data="opt_useMouse">Lancer le chonomètre avec la souris</strong>. Utiliser la souris pour démarrer le chronomètre. Le clavier sera toujours utilisable.</li>
<li><strong data="opt_useIns">Utiliser l&#x27;inspection WCA</strong>. Activer la procédure d'inspection WCA ce qui correspond à un compte-à-rebours de 15 secondes et des pénalités +2/DNF automatiques si vous dépassez.</li>
<li><strong data="opt_voiceIns">Voix de l&#x27;inspection WCA</strong>. Alerte vocale à 8 et 12 secondes, pour simuler le comportement des juges en compétitions WCA.</li>
<li><strong data="opt_voiceVol">Volume de la voix d&#x27;inspection</strong>. Volume de l'alerte vocale.</li>
<li><strong data="opt_input">Entrer les temps avec</strong>. csTimer est capable d'ajouter des résolutions de différentes façons. En plus du chronométrage au clavier, il prend en charge la saisie manuelle, l'enregistrement automatique depuis un timer Stackmat, la connection à un cube Bluetooth, ou l'utilisation d'un Rubik's Cube virtuel.</li>
<li><strong data="opt_intUN">Unité de saisie des nombres</strong>. Quand vous entrer un entier XXX dans le champ de saisie, cela correspond-il à des secondes, des centièmes ou des millièmes ?</li>
<li><strong data="opt_timeU">Rafraîchissement du chronomètre</strong>. Rafraîchissement du temps lors du chronométrage.</li>
<li><strong data="opt_preTime">Presser la barre d&#x27;espace pendant (en secondes)</strong>. Durée pendant laquelle la barre d'espace doit être maintenue enfoncée avant que le chronomètre passe au vert.</li>
<li><strong data="opt_phases">Multi-phase</strong>. Nombre de phases, tapez sur n'importe quelle touche pour marquer un point de scission lors du chronométrage.</li>
<li><strong data="opt_stkHead">Utiliser les informations d&#x27;état du Stackmat</strong>. Le Stackmat rapportera son état. Ainsi, csTimer pourra par ex. savoir que le capteur gauche ou droit a été activé. Notez que des erreurs peuvent survenir et causer un comportement inattendu.</li>
<li><strong data="opt_scrSize">Taille du mélange</strong>. Taille de texte du mélange.</li>
<li><strong data="opt_scrASize">Taille du mélange automatique</strong>. La taille du texte s'ajuste automatiquement à la longueur du mélange (fonctionne avec l'option précédente).</li>
<li><strong data="opt_scrMono">Mélange à espacement fixe</strong>. Utilisez une police à espacement unique pour le mélange.</li>
<li><strong data="opt_scrLim">Limiter la taille de la zone de mélange</strong>. Permet de scroller dans le panneau du mélange pour éviter qu'il s'étire en hauteur et cache le chronomètre.</li>
<li><strong data="opt_scrAlign">Alignement de la zone de mélange</strong>. Alignement de toute la zone de mélange, y compris le sélecteur du type de mélange.</li>
<li><strong data="opt_preScr">pre-scramble</strong>. Mouvements préparatoires avant le mélange - utilisé pour le Rubik's cube virtuel et l'aperçu du mélange.</li>
<li><strong data="opt_scrNeut">Couleur neutre</strong>. If turned on, the position/first-layer color of some training scrambles will be random.</li>
<li><strong data="opt_scrEqPr">Probabilités des états des mélanges d&#x27;entrainement</strong>. For training scrambles, the probability of each case can be set to: follow the probability of the actual solving process; or let all cases appear with equal probability; or let all cases appear randomly in sequence (that is, to ensure that all N cases appear at least once in the next 2 N scrambles).</li>
<li><strong data="opt_scrFast">Utiliser des mélanges rapides pour 4x4x4 (non officiel)</strong>. Les mélanges 4x4x4 officiels de la WCA requièrent d'énormes ressources de calcul. Sélectionnez cette option pour utiliser plutôt un mélange 4x4x4 aléatoire.</li>
<li><strong data="opt_scrKeyM">Indiquer le(s) mouvement(s) clé(s) dans Mélange</strong>. Marquer un mouvement clé dans le mélange, par exemple le mouvement qui fait quitter la forme carrée dans les mélanges SQ1.</li>
<li><strong data="opt_scrClk">Quand le mélange est cliqué</strong>. Action lorsque vous cliquez sur le mélange : copier le mélange ou générer un nouveau mélange.</li>
<li><strong data="opt_trim">Nombre de résolutions élaguées à chaque extrémité.</strong>. Nombre de résolutions élaguées lors du calcul de la moyenne (moins bonnes et meilleures)</li>
<li><strong data="opt_statsum">Montrer le résumé avant la liste de temps</strong>. Afficher le tableau des statistiques avant la liste des temps.</li>
<li><strong data="opt_statthres">Afficher le temps cible de la meilleure session</strong>. In the statistics table, the time required to refresh personal best after next solve is displayed. "N/A" means the next solve will not refresh PB no matter how fast it is, "&#8734;" means any time except DNF will refresh PB.</li>
<li><strong data="opt_printScr">Afficher les mélanges dans les stats</strong>. Afficher le mélange dans les popups de statistiques.</li>
<li><strong data="opt_printDate">Afficher la date des résolutions dans les stats</strong>. Afficher la date de résolution dans les popups de statistiques.</li>
<li><strong data="opt_imrename">Renommer la session immédiatement après création</strong>. Renommer une session juste après sa création.</li>
<li><strong data="opt_scr2ss">Créer une nouvelle session lors du changement de type de mélange</strong>. Modifier le type de mélange démarre une nouvelle session.</li>
<li><strong data="opt_statinv">Inverser la liste des temps</strong>. Inverser la liste de temps ; les résolutions les plus récentes s'affichent alors en bas de la liste.</li>
<li><strong data="opt_statclr">Autoriser la suppression de tous les temps d&#x27;une session</strong>. Quand cette option est désactivée, le bouton 'X' à côté du sélecteur de session est remplacé par un bouton "+".  Un clic sur le + crée une nouvelle session au lieu d'effacer la session en cours.</li>
<li><strong data="opt_absidx">Montrer les indices absolus dans les reports statistiques</strong>. Affiche le numéro dans la session au lieu du numéro dans le round (par exemple 1/2/3 pour la Moyenne des 3).</li>
<li><strong data="opt_rsfor1s">Afficher les stats en cliquant sur le numéro d&#x27;une résolution</strong>. Affiche les statistiques d'une résolution en cliquant sur un numéro de résolution dans la liste.</li>
<li><strong data="opt_statal">Indicateurs statistiques</strong>. Indicateur pour le tableau de statistiques, lors de la personnalisation, aoX et moX sont disponibles.</li>
<li><strong data="opt_delmul">Activer la suppression multiple</strong>. Possibilité de supprimer plusieurs résolutions à partir d'une résolution. La résolution sélectionnée sera la plus ancienne résolution supprimée.</li>
<li><strong data="opt_disPrec">Précision de la répartition des temps</strong>. Intervalle de temps pour l'outil de distribution des temps.</li>
<li><strong data="opt_solSpl">Afficher la solution progressivement</strong>. Si sélectionné, seule s'affiche la partie de la solution tenant dans la largeur du solveur, mouvement par mouvement. Si déselectionné, la solution complète est affichée.</li>
<li><strong data="opt_imgSize">Taille de l&#x27;aperçu du mélange</strong>. Définit la taille de l'aperçu du mélange.</li>
<li><strong data="opt_NTools">Nombre d&#x27;outils</strong>. csTimer peut afficher jusqu'à 4 outils simultanément.</li>
<li><strong data="opt_useKSC">Utiliser les raccourcis clavier</strong>. Use keyboard shortcut to switch scramble type, generate next scramble, switch between sessions. Click csTimer's logo to show details.</li>
<li><strong data="opt_useGES">utiliser le contrôle gestuel</strong>. Use gestures (swiping in different directions) to switch OK/+2/DNF, add comments, generate next scramble, etc. Also available on non-touch screen devices when mouse timer is enabled. Click csTimer's logo to show details.</li>
<li><strong data="opt_vrcSpeed">Vitesse de base du cube virtuel (tps)</strong>. Vitesse de base des mouvements du Rubik's Cube virtuel ; la vitesse sera accélérée s'il y a plusieurs mouvements à effectuer.</li>
<li><strong data="opt_vrcMP">multi-phase</strong>. Séparation automatique des différentes phases de résolution sur Rubik's cube virtuel and cubes Bluetooth.</li>
<li><strong data="opt_giiMode">Mode Cube Bluetooth</strong>. Usage mode of smart cube: In normal mode, you need to manually scramble the cube until it is consistent with the scrambled state; in training mode, after pressing the space (or touching the screen on the touch screen), the virtual cube will directly change to the scrambled state. You need to solve virtual cube partially (depends on scramble, e.g. permutation of last layer is not checked in oll training) instead of physical cube; In continuous training mode, in addition to training mode, once the virtual cube is solved, you will directly enter the next solve without pressing space. You can also press ESC (on a touch screen, hold the screen for 2 seconds) to exit the solve.</li>
<li><strong data="opt_giiVRC">Montrer le Giiker Cube virtuel</strong>. Lors de la connexion d'un cube bluetooth, afficher un Rubik's cube virtuel dans le panneau du chronomètre.</li>
<li><strong data="opt_giiSD">Considérer le cube comme mélangé si immobile pendant</strong>. Avec un cube Bluetooth, csTimer ne peut pas identifier si un mouvement fait partie du mélange ou de la résolution.</li>
<li><strong data="opt_giiSK">Considérer le cube comme mélangé avec la barre d&#x27;espace</strong>. Dès que vous pressez la barre d'espace, le cube Bluetooth est considéré comme mélangé. Tout mouvement va alors déclencher le chronomètre.</li>
<li><strong data="opt_giiSM">Considérer le cube comme mélangé en faisant</strong>. Réaliser une séquence de mouvements spécifique sur le cube Bluetooth pour le déclarer mélangé.</li>
<li><strong data="opt_giiBS">Bip quand le cube est considéré comme mélangé</strong>. Bip lorsque le signal de fin de mélange est déclenché.</li>
<li><strong data="opt_giiRST">Remettre le Giiker Cube à zéro quand il se connecte</strong>. Lors de la connexion d'un cube Bluetooth, csTimer détecte s'il est résolu. Si tel n'est pas le cas, cela signifie qu'il y a un problème matériel ou que le cube n'est pas entièrement résolu.</li>
<li><strong data="opt_giiAED">Détection automatique d&#x27;erreur hardware</strong>. Certains cubes Bluetooth peuvent perdre des mouvements en cas de panne matérielle. csTimer essaiera de détecter ces problèmes.</li>
</ul>
<h2>Descriptions des outils</h2>
<ul>
<li><strong data="tool_scrgen">Générateur de mélange</strong>. Cet outil vous permet de générer jusqu'à 999 mélanges en un seul clic.</li>
<li><strong data="tool_cfm">Confirmation du temps</strong>. Outil affichant les résolutions actuelles avec leur commentaire, mélange, date de résolution et reconstruction, si disponible ; c'est également la boîte de dialogue qui s'ouvre quand vous cliquez sur une résolution.</li>
<li><strong data="tool_hugestats">Stats sur plusieurs sessions</strong>. Cet outil consolide les statistiques de plusieurs sessions.</li>
<li><strong data="tool_stats">Statistiques</strong>. Tableau statistique similaire à celui du panneau des temps.</li>
<li><strong data="tool_distribution">Répartition des temps</strong>. Analyse de la distribution des temps et de la stabilité, &lt;X Y/Z signifient que Y résolutions sont en-dessous de X secondes, et que les Z dernières résolutions de la session sont en-dessous de X secondes.</li>
<li><strong data="tool_trend">Tendance des temps</strong>. Affiche une courbe de tendance pour les résolutions de la session en cours.</li>
<li><strong data="tool_dlystat">Daily Statistics</strong>. Nombre de résolutions par jour /semaine /mois /année.</li>
<li><strong data="tool_image">aperçu du mélange</strong>. Aperçu permettant de vérifier un mélange. Disponible pour tous les puzzles WCA.</li>
<li><strong data="tool_roux1">Solveurs &gt; Résoudre 1er bloc Roux</strong>. Solveur Roux 1ère étape ; résout un bloc 1x2x3.</li>
<li><strong data="tool_eoline">Solveurs &gt; Résoudre l&#x27;EOLine</strong>. Solveur EO line : résout l'orientation des 12 arêtes, et la position des arêtes DF et DB.</li>
<li><strong data="tool_cross">Solveurs &gt; Résoudre la croix</strong>. Solveur de croix ; résolution des arêtes DF, DL, DR, DB.</li>
<li><strong data="tool_222face">Solveurs &gt; Face de 2x2x2</strong>. Solveur 2x2x2 ; résolution d'une face de 2x2x2.</li>
<li><strong data="tool_333cf">Solveurs &gt; Cross + F2L</strong>. Solveur de la croix et des 4 F2L. Cette résolution par ordinateur peut être très différente d'une résolution humaine.</li>
<li><strong data="tool_333roux">Solveurs &gt; Roux S1 + S2</strong>. Solveur Roux 1ère et 2ème étape. Résout d'abord un bloc 1x2x3 sur la face gauche, puis un bloc 1x2x3 sur la face droite, avec R, M, r, U.</li>
<li><strong data="tool_333petrus">Solveurs &gt; 2x2x2 + 2x2x3</strong>. Solveur Petrus 1ère et 2ème étape. Résout d'abord un bloc 2x2x2 à gauche, puis l'étend en un bloc 2x2x3 à gauche.</li>
<li><strong data="tool_333zz">Solveurs &gt; EOLine + ZZF2L</strong>. Solveur Eoline et ZZF2L. Résout d'abord l' EOLine, puis résout un bloc de 1x2x3 à gauche ou à droite, puis l'autre 2x2x3.</li>
<li><strong data="tool_sq1cs">Solveurs &gt; SQ1 S1 + S2</strong>. Solveur 1ère et 2ème étapes du Square-1 ; résolution de la forme du Square-1 puis séparation des pièces sur les faces U et D.</li>
<li><strong data="tool_pyrv">Solveurs &gt; Pyraminx V</strong>. Solveur Pyraminx V.  Résout trois coins et deux arêtes pour former un motif en V.</li>
<li><strong data="tool_skbl1">Solveurs &gt; Skewb Face</strong>. Solveur d'une face de Skewb ; résout un étage du Skewb, plus spécifiquement 1 centre et les 4 coins adjacents.</li>
<li><strong data="tool_giikerutil">Cube Bluetooth</strong>. Outil auxiliaire pour cubes Bluetooth. Affiche l'état actuel, le niveau de batterie, la résolution en temps réel, etc.</li>
<li><strong data="tool_mtrnm">Métronome</strong>. En plus de bipper à une fréquence spécifique, le métronome peut également être réglé pour bipper à un moment précis après le début de la résolution.</li>
<li><strong data="tool_syncseed">Mélange classique</strong>. Utiliser les mêmes mélanges que vos amis en définissant une "seed" commune.</li>
<li><strong data="tool_stackmatutil">stackmat</strong>. Outil auxiliaire pour Stackmat. Affiche l'état, le niveau de batterie, le volume du signal sonore, etc.</li>
</ul>
<h2>Liens</h2>
<ul>
<li><a class="click" href="https://cubingchina.com/" title="">Cubing China</a></li>
<li><a class="click" href="/new/" title="">Version beta de csTimer</a></li>
<li><a class="click" href="/src/" title="">Version beta de csTimer avec fichiers non-compressés</a></li>
<li><a class="click" href="https://github.com/cs0x7f/cstimer" title="">Code source de csTimer</a></li>
<li><a class="click" href="/2019.12.24/" title="">csTimer version 2019.12.24</a></li>
<li><a class="click" href="/2018.11.05/" title="">csTimer version 2018.11.05</a></li>
<li><a class="click" href="/2015.12.12/" title="">csTimer version 2015.12.12</a></li>
<li><a class="click" href="/2012.03.15/" title="">csTimer version 2012.03.15</a></li>
<li><a class="click" href="/2012.02.29/" title="">csTimer version 2012.02.29</a></li>
</ul>
<h2>Palettes de couleurs</h2>
<?php include('color.php') ?>
<div class="donate helptable" style="line-height:1.5em;">
<h2>Hardware compatible with csTimer</h2>
<p>In addition to timing by keyboard, csTimer also supports Bluetooth Smart Cubes and Smart Timers.</p>
<p>If you use a smart cube, csTimer will record the detailed solution of each of your solves and provide more statistics and practice functions (e.g. CFOP automatic segmentation, etc.)</p>
<ul>
<li><a class="click" href="https://www.amazon.com/dp/B0CGDHVJBL?tag=cstimer-20#" title="">Gan 12 ui FreePlay</a></li>
<li><a class="click" href="https://www.amazon.com/dp/B083TW9WFT?tag=cstimer-20#" title="">Gan Halo Bluetooth Timer</a></li>
</ul>
<h2>Recommended products</h2>
<p>Here are some professional cubes or hardwares.</p>
<ul>
<li><a class="click" href="https://www.amazon.com/dp/B0182KR2LO?tag=cstimer-20#" title="">G5 Stackmat</a></li>
<li><a class="click" href="https://www.amazon.com/dp/B086PNKX2P?tag=cstimer-20#" title="">Gan 356 M</a></li>
</ul>
<h2>Donate directly</h2>
<p>Merci de votre précieux soutien à csTimer !  Votre don nous aidera à couvrir nos coûts de développement et de maintenance.</p>
<p>Si vous souhaitez nous faire un don via PayPal, veuillez cliquer sur le bouton ci-dessous ou passer par <a class="click" href="https://www.paypal.me/cs0x7f" title="">PayPal.me</a>.</p>
<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
<input type="hidden" name="cmd" value="_s-xclick">
<input type="hidden" name="hosted_button_id" value="NW25HME3QUEZY">
<input type="image" src="data:image/gif;base64,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" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
</form>
<p>Vous pouvez également nous financer par Alipay, scanner le code bidimensionnel suivant ou payer sur ce compte : cs0x7f@gmail.com</p>
<p><img style="display:inline-block; width:10em; height:10em;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABsCAIAAAAABMCaAAABoklEQVR42u3aUY6DMAwFQO5/6e0JViq1XwjO5LOqIAxSHJ5z/RnlcSGACHEk4hUY/974i/9/83vlXl3PBREixPmIpYX25oNVrl95GV3PBREixLMQ05OuXD9RoG5fByJEiBCfnDREiBAhDkashAulTTJEiBAhbhJAJIKM41IciBAhLkOMNHQ2+P313T6IECEuQ9z60FBTcYjMDSJEiCMRKx//K4tMYvNcOkwAESLEoxBXNukTwW1XKAsRIsRzEZ9CqUAkClQpxYEIEeIYxApo1+b2qeK2xRcLRIgQH0dMLPaVSVeg080piBAhzkdMB59dQWn6BTxWnSFChLgtYrqAlCYdPmwVCWUhQoQ4HjFRZBIHCBIbeIgQIUJs/WhPLPDhxhlEiBDPQkyPdIFKo99OtiFChPhqxHRzZ+Xho3SwAhEixLMQ0wt/2wOEN+dtoSxEiBDHIO7QhFrZtLr94iFChAgx1AzqKmgrwwiIECFC7ERMh69dG2yIECFCXBFAVIpAegP/mhQHIkSIUcSVjar0hjkeJEOECHEkovFjIUUAEeKU8QE0apeVMce/LwAAAABJRU5ErkJggg=="></p>
<p>Merci encore pour votre don !</p>
</div>
<div class="instruction">
<p><strong>En cas d'échec, vérifiez que le Bluetooth est bien activé sur votre système.</strong></p>
<p>Votre navigateur doit prendre en charge l'API Web Bluetooth. Choisissez le meilleur navigateur compatible :</p>
<ul>
<li>Chrome sur macOS, Linux, Android ou Windows</li>
<li>Bluefy sur iOS</li>
</ul>
<p>Vous pouvez également consulter cette liste complète des <a class="click" href="https://github.com/WebBluetoothCG/web-bluetooth/blob/main/implementation-status.md" title="">navigateurs pris en charge</a>.</p>
<p>Avec certains cubes Bluetooth, nous avons besoin de l'adresse MAC de votre cube pour déchiffrer les données. <strong>csTimer est capable de lire automatiquement l'adresse MAC du cube si vous configurez correctement votre navigateur :</strong></p>
<ul>
<li>Chrome : activez le flag chrome://flags/#enable-experimental-web-platform-features dans les paramètres du navigateur.</li>
<li>Bluefy: activez l'option Enable BLE Advertisements dans les paramètres du navigateur.</li>
</ul>
<p>Si vous rencontrez des difficultés avec l'adresse MAC du cube, veuillez consulter la FAQ <a class="click" href="https://gist.github.com/afedotov/52057533a8b27a0277598160c384ae71" title="">"GAN Smart Cubes MAC address"</a>.</p>
</div>