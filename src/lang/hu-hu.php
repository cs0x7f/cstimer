<h1>csTimer <?php echo $version;?> verzió - Profi Gyorskockás/Gyakorló Időmérő</h1>
<?php include('lang.php') ?>
<h2>Bevezetés</h2>
<p>A csTimer egy profi időmérő program gyorskockások számára. A program tartalmaz:</p>
<ul>
<li>Több keverési algoritmust, ide értve <strong>minden hivatalos WCA eseményt</strong>, különböző forgatós kirakókat, <strong>gyakorló keveréseket</strong> különböző lépésekhez (pl. <strong>F2L, OLL, PLL, ZBLL</strong>, és szűri is az eseteket), stb.</li>
<li>Számos statisztikai funkciót, melyek támogatják a <strong>több lépéses mérést</strong>, végtelen számú időszakot</strong>, időszakok szétválasztását/egyesítését, stb.</li>
<li>Több különböző kirakót, pédául a <strong>Cross, Xcross, 2x2x2 oldal, Skewb oldal, SQ1 alak</strong> megoldókat ezen lépések tanulásához és gyakorlásához.</li>
<li>Egyéb segédprogramokat, például keverési képet, 8 másodperces memorizációs (hang) figyelmeztést, metronómot, csoportos keverés generálást, stb.</li>
<li>Az adatvesztés elkerülése érdekében mentési funkciót, elmentheted kirakásaid helyi file-ként, a csTimer szerverre vagy a Google tárhelyedre.</li>
</ul>
<p>A csTimer támogatja a legtöbb modern böngészőt, mobilon és tableten a kezdőképernyőhöz is hozzáadhatod, így alkalmazásként fog működni.</p>
<p>A csTimer kihasználja a böngésző gyorsítótára adta lehetőségeket, így csak akkor használja a hálózatot, mikor először megnyitod. Ezután a csTimer offline is működik (kivéve a mentési funkciók)</p>
<h3>Copyright</h3>
<p>A csTimer egy nyílt forráskodó program, a GPLv3 alatt létezik. Ha valamilyen javaslatod vagy megjegyzésed van a csTimer-t illetően, kérlek küldd el <a class="click" href="https://github.com/cs0x7f/cstimer/issues" title="">ide</a></p>
<p>Írta: <a href="mailto:cs0x7f@gmail.com">Shuang Chen (cs0x7f@gmail.com)</a></p>
<p>A UI-t tervezte: <a href="mailto:liebe7@126.com">Yue Zhang (liebe7@126.com)</a></p>
<h2>Alapvető funkciók</h2>
<ul>
<li><strong>A mérés indítása</strong> - Tartsd lenyomva a szóköz billentyűt (vagy a bal- és a jobb Ctrl billentyűt egyszerre, vagy érintsd meg a kijelzőt mobil eszközökön), és várd meg amíg az óra zöldre vált. A mérés a szóköz elengedésekor fog elindulni, megállításához pedig bármelyik gomb megnyomása megfelelő és a megoldási idő feljegyzésre kerül.</li>
<li><strong>A UI leírása</strong> - 6 gomb található a csTimer logo mellett: opciók, exportálás, keverés, idők mutatása, adományozás és eszközök. Kattints a <strong>keverés</strong>, <strong>idők mutatása</strong> és az <strong>eszközök</strong> gombra a megfelelő panel megnyitásához.</li>
<li><strong>Keverés panel</strong> - A Keverő panelen kiválaszthatod a keverés típusát, beállíthatod a keverés hosszát és eset szűrőket is ahol lehetséges. Áttekintheted a korábbi keveréseket, generálhatsz újakat és kézileg is bevihetsz keverési sorozatokat.</li>
<li><strong>Idők mutatása panel</strong> - Az Idők mutatása panelen az "Időszak"  feliratra kattintva megnyílik az Időszak kezelő, ahol kiválaszthatsz-, hozzáadhatsz-, törölhetsz időszakokat. Mellette található az időszak kiválasztó gomb, és az "X" gombbal kiürítheted az időszak listáját. Ezek alatt találod a pillanatnyi- és a legjobb egyszeri ill. átlagos időidet, alattuk pedig a teljes időlistát.</li>
<li><strong>Eszközök panel</strong> - Az Eszközök panelen különféle külső funkciók közül választhatsz mint pl. keverési kép, keverés generátorok, megoldók, további statisztikák, stb.</li>
</ul>
<h2>Gyorsbillentyűk</h2>
<table class="table" style="display: inline-block;">
<tr><th>Gomb</th><td>Funkció</td></tr>
<tr><th>Alt + 1</th><td>Square-1 keverés kiválasztása</td></tr>
<tr><th>Alt + 2 ~ 7</th><td>2x2x2~7x7x7 keverés kiválasztása</td></tr>
<tr><th>Alt + p/m/c/s</th><td>Pyra/megaminx/óra/skewb keverés kiválasztása</td></tr>
<tr><th>Alt + i</th><td>Kézzel bevitt keverés kiválasztása</td></tr>
<tr><th>Alt + d</th><td>Remove all solves in current session</td></tr>
<tr><th>Ctrl/Alt + z</th><td>Remove the latest solve</td></tr>
<tr><th>Alt + up/down</th><td>To next/last session</td></tr>
<tr><th>Alt + left/right</th><td>Display last/next scramble</td></tr>
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
<tr><th colspan=10>Virtuális kocka térkép</th></tr>
</table>

<h2>Opciók részletezése</h2>
<ul>
<li><strong data="opt_ahide">Összes elem elrejtése mérés közben</strong>. A logó- és az összes panel eltüntetése időméréskor.</li>
<li><strong data="opt_useMilli">milliszekundum használata</strong>. Ezredmásodperc megjelenítése. (A beállítástól függetlenül az időmérés ezredmásodperced pontossággal történik.)</li>
<li><strong data="opt_timeFormat">idő formátum</strong>. Megjelenített idők formátuma.</li>
<li><strong data="opt_atexpa">Automatikus exportálás (100 kirakásonként)</strong>. Ezt bejelölve, a csTimer 100 megoldásonként automatikusan elmenti az adatokat egy választott helyre: egy helyi fájlba, a csTimer szerverére vagy a Google tárhelyedre.</li>
<li><strong data="opt_expp">A régebbi adatok importálása</strong>. Ha több mentést is feltöltöttél, importálhatod az utolsó 10-ből bármelyiket, így ha véletlenül üres mentést töltesz fel, ez az opció segít visszaállítani a megoldásaidat.</li>
<li><strong data="opt_useLogo">Tippek a logóban</strong>. csTimer's Logo will serve as an information display panel that prompts for a variety of information you may be interested in, such as breaking PB.</li>
<li><strong data="opt_showAvg">Avg Label mutatása</strong>. Two lines of labels are displayed below the the main timer, the current two averages, ao5 and ao12 by default.</li>
<li><strong data="opt_zoom">Nagyítás</strong>. You can adjust sizes of all elements by this option.</li>
<li><strong data="opt_font">időmérő betűtípusa</strong>. Font of the main timer.</li>
<li><strong data="opt_uidesign">Az oldal stílusa</strong>. You can switch ui design to material-like, or hide shadows by this option.</li>
<li><strong data="opt_view">A felület stílusa</strong>. Switch between desktop and mobile views.</li>
<li><strong data="opt_wndScr">Keverési panel stílusa</strong>. Make scramble panel embedded into background.</li>
<li><strong data="opt_wndStat">Statisztikai panel stílusa</strong>. Make list times panel embedded into background.</li>
<li><strong data="opt_wndTool">Eszközök panel stílusa</strong>. Make tool panel embedded into background.</li>
<li><strong data="opt_bgImgO">háttérkép halványsága</strong>. Opacity of the background image.</li>
<li><strong data="opt_bgImgS">háttérkép</strong>. You can select your own image as the background image, however, only https urls are available due to security constraint of the browser.</li>
<li><strong data="opt_timerSize">időmérő mérete</strong>. Set the size of main timer.</li>
<li><strong data="opt_smallADP">kisebb számok használata a tizedespont után</strong>. Use a smaller font size after the digital point in main timer.</li>
<li><strong data="opt_color">színséma választása</strong>. Select color schemes of csTimer. Click csTimer's logo to show more color schemes.</li>
<li><strong data="opt_useMouse">egér használata időmérőként</strong>. Use mouse to start timer, keyboard-trigger will also be available.</li>
<li><strong data="opt_useIns">WCA memorizációs ideje</strong>. Enable WCA inspection procedure, which is a 15-second countdown, auto +2/DNF penalty will also be enabled if you inspecting more than 15 seconds.</li>
<li><strong data="opt_voiceIns">WCA megnézési figyelmeztetés hangja</strong>. Alert at 8s/12s of inspection, to simulate the alert from judge in WCA competitions.</li>
<li><strong data="opt_voiceVol">Hang hangereje</strong>. Voice level of the alert above.</li>
<li><strong data="opt_input">eredmény bevitele</strong>. csTimer is able to add solves by several ways, it supports manually input, automatically record from a stackmat timer, connect to a bluetooth smart cube or play virtual Rubik's cube, besides keyboard timing.</li>
<li><strong data="opt_intUN">Mértékegység egész megadásakor</strong>. When you type an integer XXX in the input box, what does it mean, XXX second or XXX centisecond or XXX millisecond?</li>
<li><strong data="opt_timeU">időmérő beállítása</strong>. How timer is updated when timing.</li>
<li><strong data="opt_preTime">a szóköz lenttartásának az ideje (másodpercben)</strong>. How long the space bar should be held before the timer turns green.</li>
<li><strong data="opt_phases">több fázis</strong>. Number of phases, press any key to mark a split point when timing.</li>
<li><strong data="opt_stkHead">A Stackmat státuszának használata</strong>. Stackmat will report its state, e.g. whether left or right area is touched, then csTimer is able to use these information, however, the data error might occur and cause unexpected behavior.</li>
<li><strong data="opt_scrSize">keverés mérete</strong>. Size of the scramble text.</li>
<li><strong data="opt_scrASize">Automatikus keverésméret</strong>. The size of the scramble text will be automatically adjusted by the length of the scramble, which works with together previous option.</li>
<li><strong data="opt_scrMono">Keverés megjelenítése monospace betűtípussal</strong>. Use monospaced font for scramble text.</li>
<li><strong data="opt_scrLim">Keverési terület magasságának korlátozása</strong>. When the scramble area is too high, a scroll bar will occur to avoid the raising of the scramble panel.</li>
<li><strong data="opt_scrAlign">Keverési terület elhelyezése</strong>. Alignment of the whole scramble area, include scramble type selector.</li>
<li><strong data="opt_preScr">pre-scramble</strong>. Pre moves before scramble, which is used for virtual Rubik's cube and scramble image.</li>
<li><strong data="opt_scrNeut">Color neutral</strong>. If turned on, the position/first-layer color of some training scrambles will be random.</li>
<li><strong data="opt_scrEqPr">Probabilities for training-scramble states</strong>. For training scrambles, the probability of each case can be set to: follow the probability of the actual solving process; or let all cases appear with equal probability; or let all cases appear randomly in sequence (that is, to ensure that all N cases appear at least once in the next 2 N scrambles).</li>
<li><strong data="opt_scrFast">Gyors keverés használata 4x4x4-hez (nem hivatalos)</strong>. WCA official 4x4x4 scramble requires huge computation resources, select this option to use a random-move scramble for 4x4x4 instead.</li>
<li><strong data="opt_scrKeyM">Fő mozdulat(ok) megjelölése a keverésben</strong>. Mark a key move in the scramble, e.g. the move that take the state away from square shape in SQ1 scrambles.</li>
<li><strong data="opt_scrClk">Akció a keverésre kattintáskor</strong>. Behavior when you click on the scramble text, copy scramble or generate next scramble.</li>
<li><strong data="opt_trim">A kétoldalt levágott megoldások száma</strong>. Number of solves trimmed at head and tail of solves when calculating average.</li>
<li><strong data="opt_statsum">összegzés mutatása az időlista előtt</strong>. Show the statistics table before time list.</li>
<li><strong data="opt_statthres">Show target time for session best</strong>. In the statistics table, the time required to refresh personal best after next solve is displayed. "N/A" means the next solve will not refresh PB no matter how fast it is, "&#8734;" means any time except DNF will refresh PB.</li>
<li><strong data="opt_printScr">Keverések nyomtatása a statisztikában</strong>. Print scramble in round statistics dialog.</li>
<li><strong data="opt_printDate">megoldási dátum megjelenítése a statisztikákban</strong>. Print solving date in round statistics dialog.</li>
<li><strong data="opt_imrename">a létrehozott időszak azonnali átnevezése</strong>. Immediately rename a session after creating it.</li>
<li><strong data="opt_scr2ss">keverés váltásakor új időszak létrehozása</strong>. When switching scramble type, a new session will be created.</li>
<li><strong data="opt_statinv">Időlista megfordítása</strong>. Invert the time list, thus, latest solves will at the bottom of the time list.</li>
<li><strong data="opt_statclr">Az időszak kiürítésének engedélyezése</strong>. When disabled, an '+' button (for session creating) will replace the 'X' button besides the session selector, thus, when clicked, a new empty session will be created instead of clearing the whole session.</li>
<li><strong data="opt_absidx">Abszolút index mutatása a statisztikákban</strong>. Show absolute index in the session instead of 1 to number of solves (e.g. 1/2/3 for mo3) in round statistics.</li>
<li><strong data="opt_rsfor1s">A kirakás számra kattintva mutassa a statisztikát</strong>. When click the first row of the time list, show a round statistics for a single solve.</li>
<li><strong data="opt_statal">Statisztikai jelölők</strong>. Statistical indicator for the statistics table, when customizing, aoX and moX are available.</li>
<li><strong data="opt_delmul">Több elem törlésének engedélyezése</strong>. Able to delete multiple solves starts from a solve, for avoid misunderstand, the selected solve will be the oldest solve to delete.</li>
<li><strong data="opt_disPrec">Idő kijelzés pontossága</strong>. Time interval for the time distribution tool.</li>
<li><strong data="opt_solSpl">A megoldás lépésenkénti mutatása</strong>. If selected, only the length of a solution from a solver is displayed, and you can view the solution one move by one move, otherwise, the whole solution is displayed.</li>
<li><strong data="opt_imgSize">Keverési kép mérete</strong>. Set the size of scramble image.</li>
<li><strong data="opt_NTools">eszközök száma</strong>. csTimer is able to show up to 4 tools simultaneously.</li>
<li><strong data="opt_useKSC">billentyűparancsok használata</strong>. Use keyboard shortcut to switch scramble type, generate next scramble, switch between sessions. Click csTimer's logo to show details.</li>
<li><strong data="opt_useGES">use gesture control</strong>. Use gestures (swiping in different directions) to switch OK/+2/DNF, add comments, generate next scramble, etc. Also available on non-touch screen devices when mouse timer is enabled. Click csTimer's logo to show details.</li>
<li><strong data="opt_vrcSpeed">VRC alap sebessége (tps)</strong>. Base turn speed of the virtual Rubik's cube, the turn will be speed up if there are multiple moves to turn.</li>
<li><strong data="opt_vrcMP">többfázisú</strong>. Automatic multi-phase split for virtual Rubik's cube and bluetooth cube.</li>
<li><strong data="opt_giiMode">Bluetooth Cube Mode</strong>. Usage mode of smart cube: In normal mode, you need to manually scramble the cube until it is consistent with the scrambled state; in training mode, after pressing the space (or touching the screen on the touch screen), the virtual cube will directly change to the scrambled state. You need to solve virtual cube partially (depends on scramble, e.g. permutation of last layer is not checked in oll training) instead of physical cube; In continuous training mode, in addition to training mode, once the virtual cube is solved, you will directly enter the next solve without pressing space. You can also press ESC (on a touch screen, hold the screen for 2 seconds) to exit the solve.</li>
<li><strong data="opt_giiVRC">Virtuális Giiker kocka mutatása</strong>. Show a virtual Rubik's cube in the main timer when connecting to a bluetooth cube.</li>
<li><strong data="opt_giiSD">Megjelőlés kevertként ekkor:</strong>. For a bluetooth cube, csTimer cannot know whether a move is from for scrambling or solving.</li>
<li><strong data="opt_giiSK">Megjelőlés kevertként szóközzel</strong>. When the space bar is pressed, the bluetooth cube is marked scrambled, any turns after that will treated as the start of timing.</li>
<li><strong data="opt_giiSM">Megjelelés keverként a következővel</strong>. Use specific move sequences on the bluetooth cube to mark scrambled.</li>
<li><strong data="opt_giiBS">Hangjelzés kevertnek jelöléskor</strong>. Beep when some of scramble-finish signal is triggered.</li>
<li><strong data="opt_giiRST">Giiker kocka visszaállítása csatlakozáskor</strong>. When connecting to a bluetooth cube, csTimer will detect whether it is solved, if not, there might be some hardware problems or the cube is really unsolved.</li>
<li><strong data="opt_giiAED">Automatikus hardver hiba érzékelés</strong>. Some bluetooth cubes will loss some of moves due to hardware failure, csTimer will try to detect such case.</li>
</ul>
<h2>Tools detail</h2>
<ul>
<li><strong data="tool_scrgen">KeverésGenerátor</strong>. You are able to generate up to 999 scrambles with one click by this tool.</li>
<li><strong data="tool_cfm">Idő megerősítése</strong>. Tool to view current solves with its comment, scramble, solving date and reconstruction if available, which is also the dialog when you click on a solve.</li>
<li><strong data="tool_hugestats">több szakasz statisztikái</strong>. You are able to do cross-session statistics with this tool.</li>
<li><strong data="tool_stats">Statisztikák</strong>. Statistic table similar with the table in the list times panel.</li>
<li><strong data="tool_distribution">idő megoszlása</strong>. Time distribution and stability analysis, &lt;X Y/Z means there are totally Z solves less than X seconds, and all of the latest Y solves are less than X seconds in the session.</li>
<li><strong data="tool_trend">idő trend</strong>. Shows a trend curve of all solves in current session.</li>
<li><strong data="tool_dlystat">Daily Statistics</strong>. Count number of solves each day/week/month/year.</li>
<li><strong data="tool_image">Keverés mutatása</strong>. Scramble image to verify a correct scramble, all WCA puzzles are supported.</li>
<li><strong data="tool_roux1">Kirakók &gt; Roux S1 megoldása</strong>. Roux 1st step solver, which solves a 1x2x3 block.</li>
<li><strong data="tool_eoline">Kirakók &gt; EOLine megoldása</strong>. EO line solver, which solves orientations of all 12 edges, and positions of DF and DB edges.</li>
<li><strong data="tool_cross">Kirakók &gt; kereszt megoldása</strong>. Cross solver, which solve DF, DL, DR, DB edges.</li>
<li><strong data="tool_222face">Kirakók &gt; 2x2x2 oldal</strong>. 2x2x2 face solver, which solves a face of 2x2x2 cube.</li>
<li><strong data="tool_333cf">Kirakók &gt; Cross + F2L</strong>. Cross and F2L solver, which solves Cross and 4 F2Ls with computer search, so the solution might be far from human solutions.</li>
<li><strong data="tool_333roux">Kirakók &gt; Roux S1 + S2</strong>. Roux 1st and 2nd step solver, which firstly solves a 1x2x3 block on the left face and then expend another 1x2x3 block on the right face with R, M, r, U.</li>
<li><strong data="tool_333petrus">Kirakók &gt; 2x2x2 + 2x2x3</strong>. Petrus 1st and 2nd step solver, which firstly solves an 2x2x2 block on the left and then expend it to a 2x2x3 on the left.</li>
<li><strong data="tool_333zz">Kirakók &gt; EOLine + ZZF2L</strong>. Eoline and ZZF2L solver, which firstly solves the EOLine and then solve one of left 1x2x3 or right 1x2x3 and the solve the other 2x2x3.</li>
<li><strong data="tool_sq1cs">Kirakók &gt; SQ1 S1 + S2</strong>. SQ1 1st and 2nd step solver, which firstly solves the shape of SQ1 and then split U pieces and D pieces.</li>
<li><strong data="tool_pyrv">Kirakók &gt; Pyraminx V</strong>. Pyraminx V solver, which solves three corners and two edges to shape into a 'V' pattern for pyraminx.</li>
<li><strong data="tool_skbl1">Kirakók &gt; Skewb Face</strong>. Skewb face solver, which solves a layer of skewb, more specifically, 1 center and 4 neighbor corners.</li>
<li><strong data="tool_giikerutil">Giiker kocka</strong>. Auxiliary tool for bluetooth cube, which is able to show current state, battery power, real-time reconstruction etc.</li>
<li><strong data="tool_mtrnm">metronóm</strong>. Metronome, besides beeping at specific frequency, you make it beep at specific time after starting solve as well.</li>
<li><strong data="tool_syncseed">Közös keverés</strong>. Using same scrambles with friends by setting a common seed.</li>
<li><strong data="tool_stackmatutil">stackmat</strong>. Auxiliary tool for Stackmat, which is able to view the status, power and noise level of the signal, etc.</li>
</ul>
<h2>Linkek</h2>
<ul>
<li><a class="click" href="https://cubingchina.com/" title="">Cubing China</a></li>
<li><a class="click" href="/new/" title="">csTimer béta verzió</a></li>
<li><a class="click" href="/src/" title="">csTimer béta verzió tömörítetlen fájlokkal</a></li>
<li><a class="click" href="https://github.com/cs0x7f/cstimer" title="">csTimer forráskód</a></li>
<li><a class="click" href="/2019.12.24/" title="">csTimer version 2019.12.24</a></li>
<li><a class="click" href="/2018.11.05/" title="">csTimer version 2018.11.05</a></li>
<li><a class="click" href="/2015.12.12/" title="">csTimer version 2015.12.12</a></li>
<li><a class="click" href="/2012.03.15/" title="">csTimer version 2012.03.15</a></li>
<li><a class="click" href="/2012.02.29/" title="">csTimer version 2012.02.29</a></li>
</ul>
<h2>Színsémák</h2>
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
<p>Köszönjük a csTimer részére nyújtott nagylelkű támogatásodat.  Az adományodat a csTimer fejlesztésére és fenntartására fordítjuk.</p>
<p>Ha PayPal-on keresztül szeretnéd adományodat eljuttatni hozzánk, kérlek kattints a lenti gombra vagy a <a class="click" href="https://www.paypal.me/cs0x7f" title="">PayPal.me</a> linkre.</p>
<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
<input type="hidden" name="cmd" value="_s-xclick">
<input type="hidden" name="hosted_button_id" value="NW25HME3QUEZY">
<input type="image" src="data:image/gif;base64,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" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
</form>
<p>Megtalálhatsz bennünket Alipay-el is ha beolvasod a következő két dimenziós kódot vagy utalhatsz erre a számlánkra is: cs0x7f@gmail.com</p>
<p><img style="display:inline-block; width:10em; height:10em;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABsCAIAAAAABMCaAAABoklEQVR42u3aUY6DMAwFQO5/6e0JViq1XwjO5LOqIAxSHJ5z/RnlcSGACHEk4hUY/974i/9/83vlXl3PBREixPmIpYX25oNVrl95GV3PBREixLMQ05OuXD9RoG5fByJEiBCfnDREiBAhDkashAulTTJEiBAhbhJAJIKM41IciBAhLkOMNHQ2+P313T6IECEuQ9z60FBTcYjMDSJEiCMRKx//K4tMYvNcOkwAESLEoxBXNukTwW1XKAsRIsRzEZ9CqUAkClQpxYEIEeIYxApo1+b2qeK2xRcLRIgQH0dMLPaVSVeg080piBAhzkdMB59dQWn6BTxWnSFChLgtYrqAlCYdPmwVCWUhQoQ4HjFRZBIHCBIbeIgQIUJs/WhPLPDhxhlEiBDPQkyPdIFKo99OtiFChPhqxHRzZ+Xho3SwAhEixLMQ0wt/2wOEN+dtoSxEiBDHIO7QhFrZtLr94iFChAgx1AzqKmgrwwiIECFC7ERMh69dG2yIECFCXBFAVIpAegP/mhQHIkSIUcSVjar0hjkeJEOECHEkovFjIUUAEeKU8QE0apeVMce/LwAAAABJRU5ErkJggg=="></p>
<p>Még egyszer, köszönjük nagylelkű támogatásodat!</p>
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