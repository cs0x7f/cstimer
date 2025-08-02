<h1>csTimer verze <?php echo $version;?> - Profesionální časovač pro speedcubing</h1>
<?php include('lang.php') ?>
<h2>Úvod</h2>
<p>csTimer je profesionální časovač pro speedcubery, tento program poskytuje:</p>
<ul>
<li>Několik různých míchacích algoritmů pro <strong>všechny oficiální WCA eventy</strong>, různé hlavolamy, <strong> tréninkové míchání </strong> pro konkrétní dílčí kroky (např. <strong> F2L, OLL, PLL, ZBLL, umí filtrovat případy </strong>), atd.</li>
<li>Mnoho statistických funkcí, podporuje <strong> dělené časování</strong>; <strong>Jakýkoli počet relací</strong>, rozdělení / sloučení relací atd.</li>
<li>Různé druhy řešitelů, jako je <strong> Kříž, Xcross, první strana 2x2x2 první strana Skewbu, tvar SQ1</strong>, pro výuku a trénování těchto dílčích kroků.</li>
<li>Další pomocné nástroje, jako je zobrazení zamíchání, (hlasové) upozornění pro inspekci, metronom, generátor sad zamíchání, atd.</li>
<li>Funkce zálohování. Chcete-li se vyhnout ztrátě dat, můžete zálohovat řešení do vašich místních souborů, serveru csTimer nebo do úložiště Google.</li>
</ul>
<p>csTimer podporuje většinu moderních prohlížečů. Na mobilních telefonech a tabletech můžete přidat csTimer na svou domovskou obrazovku a bude fungovat jako nativní aplikace.</p>
<p>csTimer využívá mezipaměti prohlížeče, která používá internet pouze při prvním otevření, poté je csTimer schopen pracovat bez připojení k síti (s výjimkou funkcí jako je zálohování)</p>
<h3>Copyright</h3>
<p>csTimer je open source software pod licencí GPLv3. Pokud máte nějaké návrhy nebo připomínky k csTimeru, podělte se o ně prosím <a class="click" href="https://github.com/cs0x7f/cstimer/issues" title="">zde</a></p>
<p>Napsal: <a href="mailto:cs0x7f@gmail.com">Shuang Chen (cs0x7f@gmail.com)</a></p>
<p>UI designoval: <a href="mailto:liebe7@126.com">Yue Zhang (liebe7@126.com)</a></p>
<h2>Základní funkce</h2>
<ul>
<li><strong>Jak začít měření času</strong> - Podržte mezerník (nebo obě, levou a pravou, klávesy Ctrl. Na mobilních zařízeních se dotkněte obrazovky) a počkejte, až čas zezelená. Časovač začne měřit, jakmile se mezerník uvolní. Stisknutím libovolné klávesy zastavíte měření a čas se zaznamená.</li>
<li><strong>Popis uživatelského rozhraní</strong> - V blízkosti loga csTimer je 6 tlačítek: nastavení, export, scramble, seznam časů, finanční podpora pro vývojáře a nástroje. Klikněte na <strong>scramble</strong>, <strong>seznam časů</strong> nebo <strong>nástroje</strong> k otevření odpovídajícího panelu funkcí.</li>
<li><strong>Panel Scramble</strong> - Na panelu Scramble můžete vybrat typ a délku míchání a filtr velikosti písmen (pokud je k dispozici), zobrazit předchozí a vygenerovat další zamíchání.</li>
<li><strong>Panel Seznam časů</strong> - Na panelu Seznam časů můžete otevřít správce relací kliknutím na „Session“. Zde můžete vybrat, přidat nebo odstranit relaci, vyprázdnit relaci, prohlédnout aktuální singl / průměr, nejlepší singl / průměr a celý seznam.</li>
<li><strong>Panel nástrojů</strong> - Na panelu nástrojů můžete vybrat konkrétní pomocné funkce, včetně obrázku aktuálního zamíchání, generátoru scramblů, solverů, dalších druhů statistik atd.</li>
</ul>
<h2>Klávesové zkratky</h2>
<table class="table" style="display: inline-block;">
<tr><th>Key</th><td>Funkce</td></tr>
<tr><th>Alt + 1</th><td>Nastavit typ míchání na Square-1</td></tr>
<tr><th>Alt + 2 ~ 7</th><td>Nastavit typ míchání na 2x2x2-7x7x7</td></tr>
<tr><th>Alt + p/m/c/s</th><td>Nastavit typ míchání na pyra/megaminx/clock/skewb</td></tr>
<tr><th>Alt + i</th><td>Nastavit druh míchání na vstup</td></tr>
<tr><th>Alt + d</th><td>Odebrat všechny složení v aktuální relaci</td></tr>
<tr><th>Ctrl/Alt + z</th><td>Odstranit nejnovější složení</td></tr>
<tr><th>Alt + špika nahoru / šipka dolů</th><td>Přejít na další / předchozí relaci</td></tr>
<tr><th>Alt + šipka vlevo / šipka vpravo</th><td>Display last/next scramble</td></tr>
<tr><th>Ctrl + 1/2/3</th><td>The latest solve is OK/+2/DNF</td></tr>
<tr><th>Ctrl + Alt + t/i/s/v/g/q/b/l</th><td>Entering in times with timer/typing/stackmat/virtual/bluetooth cube/qcube/bluetooth timer/last layer</td></tr>
</table>

<table class="table" style="display: inline-block;">
<tr><th>Gesture</th><td>Function</td></tr>
<tr><th>Up left</th><td>The latest solve is DNF</td></tr>
<tr><th>Up</th><td>The latest solve is +2</td></tr>
<tr><th>Up right</th><td>The latest solve is OK</td></tr>
<tr><th>Left</th><td>Last scramble</td></tr>
<tr><th>Right</th><td>Next scramble</td></tr>
<tr><th>Down left</th><td>Add comment to the latest solve</td></tr>
<tr><th>Down</th><td>Remove the latest solve</td></tr>
<tr><th>Down right</th><td>Check the latest solve</td></tr>
</table>

<table class="table" id="vrckey" style="display: inline-block;">
<tr><th colspan=10>Klávesy pro otáčení virtuální kostky</th></tr>
</table>

<h2>Podrobnosti nastavení</h2>
<ul>
<li><strong data="opt_ahide">Skrýt všechny prvky při časování</strong>. Skrýt logo a všechny panely při řešení.</li>
<li><strong data="opt_useMilli">použít milisekundy</strong>. Zobrazit milisekundy, nezávisle na tom, či je tato možnost zvolena, csTimer vždy měří s přesností na 1 milisekundu.</li>
<li><strong data="opt_timeFormat">formát času</strong>. Zobrazený formát času.</li>
<li><strong data="opt_atexpa">Automatický export dat (po 100 solvech)</strong>. Je-li zaškrtnuto, csTimer bude po 100 solvech solvy automaticky exportovat na předem určené místo (soubor, csTimer server, Google úložiště).</li>
<li><strong data="opt_expp">Importovat ne-poslední data</strong>. Pokud máte uloženo více záloh, můžete importovat jednu z 10 nejčerstvějších. Pokud omylem exportujete prázdnou zálohu, tato možnost Vám pomůže zachránit Vaše solvy.</li>
<li><strong data="opt_useLogo">Upozornění v logu</strong>. Logo csTimeru bude sloužit jako informační panel - bude Vás informovat o různých věcech, například novém PB.</li>
<li><strong data="opt_showAvg">Zobrazit Průměrný Popisek</strong>. Na 2 řádcích pod časem se budou zobrazovat současné průměry - defaultně ao5 a ao12.</li>
<li><strong data="opt_zoom">Přiblížení</strong>. Tady můžete upravovat velikost všech prvků na stránce.</li>
<li><strong data="opt_font">vyberte písmo časovače</strong>. Font hlavního ukazatele času.</li>
<li><strong data="opt_uidesign">UI design je</strong>. Tady můžete přepnout design uživatelského rozhraní na materiální, či skrýt stíny.</li>
<li><strong data="opt_view">styl uživatelského rozhraní je</strong>. Přepnutí mezi verzí pro počítač a mobil.</li>
<li><strong data="opt_wndScr">Styl zobrazení panelu s scramblem</strong>. Možnost mít scramble zabudovaný do pozadí.</li>
<li><strong data="opt_wndStat">Styl zobrazení panelu Statistiky</strong>. Možnost mít seznam časů zabudovaný do pozadí.</li>
<li><strong data="opt_wndTool">Styl zobrazení panelu nástrojů</strong>. Možnost mít panel nástrojů zabudovaný do pozadí.</li>
<li><strong data="opt_bgImgO">průhlednost pozadí obrázku</strong>. Průhlednost obrázku na pozadí.</li>
<li><strong data="opt_bgImgS">pozadí obrázku</strong>. Zde můžete zvolit vlastní obrázek pozadí. Avšak kvůli bezpečnosti jsou povoleny jen https url.</li>
<li><strong data="opt_timerSize">velikost timeru</strong>. Nastavení velikosti hlavního timeru.</li>
<li><strong data="opt_smallADP">použít malé písmo za desetinnou</strong>. Použití menší velikosti písma za desetinnou čárkou hlavního timeru.</li>
<li><strong data="opt_color">vybrat schéma barev</strong>. Select color schemes of csTimer. Click csTimer's logo to show more color schemes.</li>
<li><strong data="opt_useMouse">použít časovač pomocí myši</strong>. Použití myši k začátku měření.</li>
<li><strong data="opt_useIns">použít WCA inspekci</strong>. Povolit WCA inspekci - 15 sekundový odpočet, také automatické +2/DNF, pokud Vám trvá inspekce déle než 15 sekund.</li>
<li><strong data="opt_voiceIns">hlasové upozornění při WCA inspekci</strong>. Upozornění, že uběhlo 8/12 sekund z inspekce. (Napodobení judge na WCA soutěžích)</li>
<li><strong data="opt_voiceVol">Hlasitost hlasu</strong>. Hlasové upozornění.</li>
<li><strong data="opt_input">vstup v dobách s</strong>. csTimer umí přidávat solvy různými způsoby: manuálně, automaticky ze stackmatu, po připojení k chytré bluetooth kostce, z virtuální Rubikovy kostky a samozřejmě pomocí mezerníku.</li>
<li><strong data="opt_intUN">Jednotka při zadávání celého čísla</strong>. Pokud zapíšete čas jako XXX, co to znamená? XXX sekund, setin, milisekund?</li>
<li><strong data="opt_timeU">aktualizace timeru je</strong>. Jak často se mění timer při měření.</li>
<li><strong data="opt_preTime">čas držení mezery dole(sekund)</strong>. Jak dlouho by měl být mezerník stisknut, než timer zezelená.</li>
<li><strong data="opt_phases">multi-fáze</strong>. Počet fází. Zmáčkněte jakoukoliv klávesu pro začátek další fáze.</li>
<li><strong data="opt_stkHead">Použít Informace O Stavu Stackmatu</strong>. Stackmat ohlásí svůj stav - je li levá či pravá strana držena, pak tyto informace může využít csTimer. Avšak může dojít k chybám a neočekávanému chování.</li>
<li><strong data="opt_scrSize">velikost scramblu</strong>. Velikost písma scramblu.</li>
<li><strong data="opt_scrASize">Automatická velikost scramblu</strong>. Velikost scramblu se přizpůsobí délce scramblu. Funguje s předchozí možností.</li>
<li><strong data="opt_scrMono">neproporcionální scramble</strong>. Použití neproporcionálního fontu pro scramble.</li>
<li><strong data="opt_scrLim">Omezit výšku v oblasti scramblu</strong>. Je-li scramble moc dlouhý, objeví se scroll bar, aby se panel scramblu nemusel zvětšovat.</li>
<li><strong data="opt_scrAlign">Zarovnání scramble oblasti</strong>. Zarovnání celé oblasti scramblu, včetně nastavení typu scramblu.</li>
<li><strong data="opt_preScr">pre-scramble</strong>. Tahy před scramblem. Použito pro virtuální kostku a vykreslený scramble.</li>
<li><strong data="opt_scrNeut">Barevně neutrální</strong>. If turned on, the position/first-layer color of some training scrambles will be random.</li>
<li><strong data="opt_scrEqPr">Probabilities for training-scramble states</strong>. For training scrambles, the probability of each case can be set to: follow the probability of the actual solving process; or let all cases appear with equal probability; or let all cases appear randomly in sequence (that is, to ensure that all N cases appear at least once in the next 2 N scrambles).</li>
<li><strong data="opt_scrFast">Použít rychlí scramble pro 4x4x4(neoficiální)</strong>. Oficiální scrambly pro 4x4x4 jsou náročné na vygenerování. Tato možnost změní scrambly pro 4x4x4 na random-move.</li>
<li><strong data="opt_scrKeyM">Klíčovy krok pohybů v zamíchání</strong>. Cube</li>
<li><strong data="opt_scrClk">Akce při kliknutí na scramble</strong>. Co se stane, kliknete-li na scramble. Zkopíruje aktuální, či vygeneruje další.</li>
<li><strong data="opt_trim">Počet nejhorších/nejlepších nepočítaných solvů</strong>. Kolik nejhorších/nejlepších solvů solvů se škrtá při počítání průměru.</li>
<li><strong data="opt_statsum">zobrazit shrnutí před časovím listem</strong>. Statistiky před seznamem časů.</li>
<li><strong data="opt_statthres">Show target time for session best</strong>. In the statistics table, the time required to refresh personal best after next solve is displayed. "N/A" means the next solve will not refresh PB no matter how fast it is, "&#8734;" means any time except DNF will refresh PB.</li>
<li><strong data="opt_printScr">zobrazit zamíchání ve statistikách</strong>. Vypsat scramble ve statistikách kola.</li>
<li><strong data="opt_printDate">zobrazit datum složení ve statistikách</strong>. Viz výše pro datum složení.</li>
<li><strong data="opt_imrename">přejmenovat relaci ihned po vytvoření</strong>. Okamžitě po vytvoření přejmenovat relaci.</li>
<li><strong data="opt_scr2ss">vytvořit novou relaci při změně typu zamíchání</strong>. Při změně scramblu bude vytvořená nová relace.</li>
<li><strong data="opt_statinv">Obrátit časový list</strong>. Otočit seznam časů. Nejnovější solvy budou dole.</li>
<li><strong data="opt_statclr">Povolit vyprázdňování relace</strong>. Není-li zaškrtnuto, '+' nahradí 'X' vedle výběru relace a po kliknutí bude vytvořena nová relace, místo smazání všech časů z aktuální.</li>
<li><strong data="opt_absidx">Zomrazit abolutní index ve zprávě o statistice</strong>. Show absolute index in the session instead of 1 to number of solves (e.g. 1/2/3 for mo3) in round statistics.</li>
<li><strong data="opt_rsfor1s">Zobrazit statistiku při kliknutí na číslo solvu</strong>. When click the first row of the time list, show a round statistics for a single solve.</li>
<li><strong data="opt_statal">Statistické indikátory</strong>. Statistický indikátor pro tabulku statistik. AoX a moX jsou k dispozici.</li>
<li><strong data="opt_delmul">Povolit Více Odstranění</strong>. Able to delete multiple solves starts from a solve, for avoid misunderstand, the selected solve will be the oldest solve to delete.</li>
<li><strong data="opt_disPrec">precize distribuce času</strong>. Časový interval pro nástroj distribuce časů.</li>
<li><strong data="opt_solSpl">Ukázat řešení postupně</strong>. If selected, only the length of a solution from a solver is displayed, and you can view the solution one move by one move, otherwise, the whole solution is displayed.</li>
<li><strong data="opt_imgSize">Velikost zamíchaného obrázku</strong>. Nastavit velikost vykresleného scramblu.</li>
<li><strong data="opt_NTools">počet nástrojů</strong>. csTimer může ukazovat až 4 nástroje zároveň.</li>
<li><strong data="opt_useKSC">použít klávesové zkratky</strong>. Use keyboard shortcut to switch scramble type, generate next scramble, switch between sessions. Click csTimer's logo to show details.</li>
<li><strong data="opt_useGES">use gesture control</strong>. Use gestures (swiping in different directions) to switch OK/+2/DNF, add comments, generate next scramble, etc. Also available on non-touch screen devices when mouse timer is enabled. Click csTimer's logo to show details.</li>
<li><strong data="opt_vrcSpeed">VRS základní rychlost (tps)</strong>. Základní rychlost otáčení virtuální kostky. Bude zrychleno, pokud se má provést víc tahů.</li>
<li><strong data="opt_vrcMP">vícefázové</strong>. Automatic multi-phase split for virtual Rubik's cube and bluetooth cube.</li>
<li><strong data="opt_giiMode">Bluetooth Cube Mode</strong>. Usage mode of smart cube: In normal mode, you need to manually scramble the cube until it is consistent with the scrambled state; in training mode, after pressing the space (or touching the screen on the touch screen), the virtual cube will directly change to the scrambled state. You need to solve virtual cube partially (depends on scramble, e.g. permutation of last layer is not checked in oll training) instead of physical cube; In continuous training mode, in addition to training mode, once the virtual cube is solved, you will directly enter the next solve without pressing space. You can also press ESC (on a touch screen, hold the screen for 2 seconds) to exit the solve.</li>
<li><strong data="opt_giiVRC">Zobrazit virtuální Giiker kostku</strong>. Show a virtual Rubik's cube in the main timer when connecting to a bluetooth cube.</li>
<li><strong data="opt_giiSD">Označit zamíchání pokud stojí</strong>. For a bluetooth cube, csTimer cannot know whether a move is from for scrambling or solving.</li>
<li><strong data="opt_giiSK">Označit zamíchaní s mezerou</strong>. When the space bar is pressed, the bluetooth cube is marked scrambled, any turns after that will treated as the start of timing.</li>
<li><strong data="opt_giiSM">Oznacit zamíchání s děláním</strong>. Use specific move sequences on the bluetooth cube to mark scrambled.</li>
<li><strong data="opt_giiBS">Pípnout když je zamícháno</strong>. Beep when some of scramble-finish signal is triggered.</li>
<li><strong data="opt_giiRST">Restartovat Giiker kostku při připojení</strong>. When connecting to a bluetooth cube, csTimer will detect whether it is solved, if not, there might be some hardware problems or the cube is really unsolved.</li>
<li><strong data="opt_giiAED">Automatická detekce hardwarové chyby</strong>. Some bluetooth cubes will loss some of moves due to hardware failure, csTimer will try to detect such case.</li>
</ul>
<h2>Podrobnosti nástrojů</h2>
<ul>
<li><strong data="tool_scrgen">Generátor Zamíchání</strong>. Tímto nástrojem můžete vygenerovat až 999 scramblů jedním kliknutím.</li>
<li><strong data="tool_cfm">Potvrďte čas</strong>. Tool to view current solves with its comment, scramble, solving date and reconstruction if available, which is also the dialog when you click on a solve.</li>
<li><strong data="tool_hugestats">statistiky kříže</strong>. Statistiky z více relací.</li>
<li><strong data="tool_stats">Statistiky</strong>. Tabulka statistik.</li>
<li><strong data="tool_distribution">distribuce času</strong>. Analýza distribuce časů a stability. &lt;X Y/Z znamená, že je celkem Y solvů pod X a posledních Z solvů v relaci je pod X.</li>
<li><strong data="tool_trend">trend času</strong>. Ukazuje trend všech solvů v aktuální relaci.</li>
<li><strong data="tool_dlystat">Daily Statistics</strong>. Počítá solvy za každý den/týden/měsíc/rok.</li>
<li><strong data="tool_image">nakreslit scramble</strong>. Vykreslený scramble pro potvrzení správnosti scramblu. Všechny WCA kostky jsou podporovány.</li>
<li><strong data="tool_roux1">Solvery &gt; složit Roux S1</strong>. Roux 1st step solver, which solves a 1x2x3 block.</li>
<li><strong data="tool_eoline">Solvery &gt; složit EOLine</strong>. EO line solver, which solves orientations of all 12 edges, and positions of DF and DB edges.</li>
<li><strong data="tool_cross">Solvery &gt; složit kříž</strong>. Složí kříž: DF, DL, DR a DB hrany.</li>
<li><strong data="tool_222face">Solvery &gt; strana 2x2x2</strong>. Složí jednu stranu na 2x2x2.</li>
<li><strong data="tool_333cf">Solvery &gt; Cross + F2L</strong>. Cross and F2L solver, which solves Cross and 4 F2Ls with computer search, so the solution might be far from human solutions.</li>
<li><strong data="tool_333roux">Solvery &gt; Roux S1 + S2</strong>. Roux 1st and 2nd step solver, which firstly solves a 1x2x3 block on the left face and then expend another 1x2x3 block on the right face with R, M, r, U.</li>
<li><strong data="tool_333petrus">Solvery &gt; 2x2x2 + 2x2x3</strong>. Petrus 1st and 2nd step solver, which firstly solves an 2x2x2 block on the left and then expend it to a 2x2x3 on the left.</li>
<li><strong data="tool_333zz">Solvery &gt; EOLine + ZZF2L</strong>. Eoline and ZZF2L solver, which firstly solves the EOLine and then solve one of left 1x2x3 or right 1x2x3 and the solve the other 2x2x3.</li>
<li><strong data="tool_sq1cs">Solvery &gt; SQ1 S1 + S2</strong>. SQ1 1st and 2nd step solver, which firstly solves the shape of SQ1 and then split U pieces and D pieces.</li>
<li><strong data="tool_pyrv">Solvery &gt; Pyraminx V</strong>. Složí V na pyraminxu. Tedy 3 středy a dvě hrany mezi nimi.</li>
<li><strong data="tool_skbl1">Solvery &gt; Skewb Face</strong>. Skewb face solver, which solves a layer of skewb, more specifically, 1 center and 4 neighbor corners.</li>
<li><strong data="tool_giikerutil">Giiker kostka</strong>. Auxiliary tool for bluetooth cube, which is able to show current state, battery power, real-time reconstruction etc.</li>
<li><strong data="tool_mtrnm">metronom</strong>. Metronome, besides beeping at specific frequency, you make it beep at specific time after starting solve as well.</li>
<li><strong data="tool_syncseed">Společné zamíchání</strong>. Using same scrambles with friends by setting a common seed.</li>
<li><strong data="tool_stackmatutil">stackmat</strong>. Auxiliary tool for Stackmat, which is able to view the status, power and noise level of the signal, etc.</li>
</ul>
<h2>Odkazy</h2>
<ul>
<li><a class="click" href="https://cubingchina.com/" title="">Cubing China</a></li>
<li><a class="click" href="/new/" title="">csTimer beta verze</a></li>
<li><a class="click" href="/src/" title="">csTimer beta verze s nekomprimovanými soubory</a></li>
<li><a class="click" href="https://github.com/cs0x7f/cstimer" title="">zdrojový kód csTimeru</a></li>
<li><a class="click" href="/2019.12.24/" title="">csTimer version 2019.12.24</a></li>
<li><a class="click" href="/2018.11.05/" title="">csTimer version 2018.11.05</a></li>
<li><a class="click" href="/2015.12.12/" title="">csTimer version 2015.12.12</a></li>
<li><a class="click" href="/2012.03.15/" title="">csTimer version 2012.03.15</a></li>
<li><a class="click" href="/2012.02.29/" title="">csTimer version 2012.02.29</a></li>
</ul>
<h2>Barevná schémata</h2>
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
<p>Děkujeme za vaši ochotu podpořit csTimer! Váš dar bude použit na podporu našich nákladů na vývoj a údržbu.</p>
<p>Pokud byste nám chtěli nabídnout příspěvek prostřednictvím PayPalu, klikněte na tlačítko níže nebo přes <a class="click" href="https://www.paypal.me/cs0x7f" title="">PayPal.me</a>.</p>
<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
<input type="hidden" name="cmd" value="_s-xclick">
<input type="hidden" name="hosted_button_id" value="NW25HME3QUEZY">
<input type="image" src="data:image/gif;base64,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" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
</form>
<p>Můžete nás také podpořit přes Alipay, naskenujte následující dvojrozměrný kód nebo prosím zaplaťte na účet: cs0x7f@gmail.com</p>
<p><img style="display:inline-block; width:10em; height:10em;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABsCAIAAAAABMCaAAABoklEQVR42u3aUY6DMAwFQO5/6e0JViq1XwjO5LOqIAxSHJ5z/RnlcSGACHEk4hUY/974i/9/83vlXl3PBREixPmIpYX25oNVrl95GV3PBREixLMQ05OuXD9RoG5fByJEiBCfnDREiBAhDkashAulTTJEiBAhbhJAJIKM41IciBAhLkOMNHQ2+P313T6IECEuQ9z60FBTcYjMDSJEiCMRKx//K4tMYvNcOkwAESLEoxBXNukTwW1XKAsRIsRzEZ9CqUAkClQpxYEIEeIYxApo1+b2qeK2xRcLRIgQH0dMLPaVSVeg080piBAhzkdMB59dQWn6BTxWnSFChLgtYrqAlCYdPmwVCWUhQoQ4HjFRZBIHCBIbeIgQIUJs/WhPLPDhxhlEiBDPQkyPdIFKo99OtiFChPhqxHRzZ+Xho3SwAhEixLMQ0wt/2wOEN+dtoSxEiBDHIO7QhFrZtLr94iFChAgx1AzqKmgrwwiIECFC7ERMh69dG2yIECFCXBFAVIpAegP/mhQHIkSIUcSVjar0hjkeJEOECHEkovFjIUUAEeKU8QE0apeVMce/LwAAAABJRU5ErkJggg=="></p>
<p>Znovu děkujeme za Váš dar!</p>
</div>
<div class="instruction">
<p><strong>In case of failure check that Bluetooth is enabled on your system!</strong></p>
<p>Browser you are using must support Web Bluetooth API. Consider using compatible browser, the best choice is:</p>
<ul>
<li>Chrome on macOS, Linux, Android or Windows</li>
<li>Bluefy on iOS</li>
</ul>
<p>Also you can check complete list of <a class="click" href="https://github.com/WebBluetoothCG/web-bluetooth/blob/main/implementation-status.md" title="">supported browsers</a>.</p>
<p>For some bluetooth cubes, we need you to provide the MAC address of your cube to decrypt the data. <strong>csTimer is able to automatically read MAC address of the cube if you properly setup your browser:</strong></p>
<ul>
<li>Chrome: enable chrome://flags/#enable-experimental-web-platform-features flag in browser settings.</li>
<li>Bluefy: turn on Enable BLE Advertisements option in browser settings.</li>
</ul>
<p>If you have difficulties with cube MAC address, you may read <a class="click" href="https://gist.github.com/afedotov/52057533a8b27a0277598160c384ae71" title="">GAN Smart Cubes MAC address FAQ</a>.</p>
</div>