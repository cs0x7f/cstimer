<h1>csTimer version 2018.11.05 - Professionel Speedcubing/Tr&aelig;nings Timer</h1>
<?php include('lang.php') ?>
<p>csTimer er designet for speedsolving cuber. Den st&oslash;tter scrambles af mange typer af puzzles inklurederet <b>alle
        WCA's officielle puzzle</b>; Den er integreret med <b> Xcross l&oslash;ser og eoline l&oslash;ser </b>; Den st&oslash;tter
    tids statistikker, <b>multi-fase timing</b> og andre funktioner st&oslash;ttet af anndre lignende software som: 15s'
    inspektion definerede af WCA, etc.</p>
<p>Timeren virker godt
    p&aring; de fleste browsere, f.eks: chrome(anbefalet), firefox, opera, IE7+. Og den virker ogs&aring; p&aring; ipad,
    iphone og det meste af Android-platformen. </p>
<p> --- Skrevet af: <a class="click" href="mailto:cs0x7f@gmail.com">Shuang Chen (cs0x7f@gmail.com)</a><br>
    --- UI designet af: <a class="click" href="mailto:liebe7@126.com">Yue Zhang (liebe7@126.com)</a><br></p>
<h2>Introduktion</h2>
<ul>
    <li><b>Timer</b> - St&oslash;tter wca inspektion, multi-fase timing, indtastning via tastatur, bekr&aelig;ft OK / +
        2 / DNF. Akkurathed er 0.001s.
    </li>
    <li><b>Blanding</b> - St&oslash;tter alle wca blandinger. K&aelig;mpe antal uofficielle og tr&aelig;nings
        blandinger, som f.eks .: kun kant / hj&oslash;rne, sidste lag.
    </li>
    <li><b>Statistikker</b> - Vis gennemsnitligt 5/12 dynamisk. Export statistikker for den aktuelle session inkluderer
        bedste gennemsnit p&aring; 5/12 osv.
    </li>
    <li><b>Tools</b> - St&oslash;tter l&oslash;sning af krydset, Xcross(udvidet kryds), EOLine. Blandings billede for
        NxNxN cube.
    </li>
</ul>
<h2>Detaljer</h2>
csTimer er blevet testet p&aring; Firefox, Chrome og Safari. Og det virker ogs&aring; godt p&aring; ipad (testet af oyyq).
<h3>Timer</h3>
<ul>
    <li><b>Traditionel</b> - Tryk p&aring; 'mellemrum'-tasten, indtil skrifttypens farve skifter gr&oslash;n. Timingen
        starter, n&aring;r du slipper n&oslash;glen og registrerer opl&oslash;sningstiden, n&aring;r du trykker p&aring;
        tasten igen.
    </li>
    <li><b>Presse tid</b> - Samme som stackmat, csTimer underst&oslash;tter presningstid. Du skal holde
        'mellemrums'-tasten et stykke tid, f&oslash;r du frigiver det.
    </li>
    <li><b>WCA inspektion</b> - csTimer underst&oslash;tter inspektionstiden beskrevet i wca's regulering. Hvis den er
        aktiveret, vil timeren v&aelig;re ved inspektionstilstand efter at du har startet den.
    </li>
    <li><b>Multi-fase timing</b> - Timeren underst&oslash;tter multifase timing. Du kan indstille antallet af fase(r),
        og du kan trykke flere gange p&aring; mellemrumstasten.
    </li>
    <li><b>Inds&aelig;t med keyboard</b> - Hvis du vil bruge ekstern timer som stackmat, kan du indtaste tid manuelt
    </li>
    <li><b>OK/+2/DNF</b> - Hvis denne funktion er aktiveret, vises en bekr&aelig;ftelsesdialog. Du skal v&aelig;lge, om
        l&oslash;sningen (finish tilstand) er OK, +2 eller DNF. Standardv&aelig;rdien kan afh&aelig;nge af
        inspektionstiden.
    </li>
    <li><b>Accuracy</b> - n&oslash;jagtigheden af ??timeren er 0,001 eller 1 millisekund, og kan vises til 0,01 s.</li>
    <li><b>Time format</b> - Du kan indstille tidsformatet til at deaktivere / aktivere 'minutter' eller 'timer', f.eks
        .: hh: mm: ss.XX (X) eller mm: ss.XX (X) ".
    </li>
    <li><b>Timer update</b> - Af nogle &aring;rsager kan opdatering af timer v&aelig;re indstillet til: ingen, sekunder
        eller realtid.
    </li>
    <li><b>Font size</b> - For at tilpasse sk&aelig;rme med forskellige st&oslash;rrelser, kan du indstille typografiens
        formatst&oslash;rrelse.
    </li>
    <li><b>Color style</b> - Der er mange farveformater. V&aelig;lg den du kan lide.</li>
</ul>
<h3>Blanding</h3>
<ul>
    <li><b>WCA Officiel Blander</b> - csTimer underst&oslash;tter alle wca's officielle scrambler, s&aring;som:
        random-state scrambler p&aring; 2x2x2, 3x3x3, pyraminx, square-1, ur. Tilf&aelig;ldig bev&aelig;gelse af 4x4x4,
        5x5x5, 6x6x6, 7x7x7, megaminx.
    </li>
    <li><b>CFOP Tr&aelig;ning</b> - For CFOP-metoden er specielle scrambles underst&oslash;ttet af csTimer: scramble af
        sidste lag, sidste lag + en slot, sidste lag + 4 slots.
    </li>
    <li><b>Andre 3x3x3 metoder</b> - Til forbedring af CFOP er specielle scrambles underst&oslash;ttet af csTimer: ZBLL,
        hj&oslash;rner / kanter af sidste lag, RUL generator..
    </li>
    <li><b>Roux Tr&aelig;ning</b> - Til Roux-metoden er specielle scrambles underst&oslash;ttet af csTimer: sidste seks
        kant, l10p.
    </li>
    <li><b>Stor cube tr&aelig;ning</b> - Til stor terning er specielle scrambles underst&oslash;ttet af csTimer:
        scramble af kanter af 4x4x4, 5x5x5, 6x6x6, 7x7x7.
    </li>
    <li><b>3x3x3 BLD Tr&aelig;ning</b> - Til 3x3x3 bld er specielle scrambles underst&oslash;ttet af csTimer: Kun kanter
        / hj&oslash;rner krypteret.
    </li>
    <li><b>Andre Puzzles</b> - csTimer underst&oslash;tter ogs&aring; et stort antal puzzles, som ikke er wca's puzzles.
    </li>
</ul>
<h3>Statistikker</h3>
<ul>
    <li><b>Multi Session</b> - Der er 5 session(er) af tid. Alle statistiske funktioner er sessionsorienterede.</li>
    <li><b>Session gennemsnit</b> - Du kan finde session gennemsnittet nederst i timetabellen.</li>
    <li><b>Dynamisk ga5</b> - Efter at du har l&oslash;st den mere end 5 gange, kan du kontrollere dit gennemsnit p&aring;
        5 i 'ga5' kolonnen og f&aring; detaljer ved at klikke p&aring; cellen.
    </li>
    <li><b>Dynamisk ga12</b> - Efter at du har l&oslash;st den mere end 12 gange, kan du kontrollere dit gennemsnit p&aring;
        12 ved 'ga12' kolonnen og f&aring; detaljer ved at klikke p&aring; cellen.
    </li>
    <li><b>Statistisk detaljer</b> - Klik p&aring; cellen, der indeholder sessionsgennemsnit, du f&aring;r detaljerne i
        den aktuelle session.
    </li>
    <li><b>add comments</b> - Klik p&aring; cellen, der indeholder en l&oslash;sningstid, du kan indstille tiden til OK
        / + 2 / DNF eller kommentarer.
    </li>
    <li><b>delete time/session</b> - Klik p&aring; indekset f&oslash;r tid, du kan slette tiden i samme r&aelig;kke.
        Eller klik p&aring; 'X' knappen for at fjerne alle gange i den aktuelle session.
    </li>
</ul>
<h3>Keyboard Shortcut</h3>
<ul>
    <table class="table" style="display: inline-block;">
        <tr>
            <th>key</th>
            <td>function</td>
        </tr>
        <tr>
            <th>Alt + 1</th>
            <td>Scramble type to Square-1.</td>
        </tr>
        <tr>
            <th>Alt + 2 ~ 7</th>
            <td>Scramble type to 2x2x2~7x7x7.</td>
        </tr>
        <tr>
            <th>Alt + p/m/c/s</th>
            <td>Scramble type to pyra/megaminx/clock/skewb.</td>
        </tr>
        <tr>
            <th>Alt + i</th>
            <td>Blanding type til indeks.</td>
        </tr>
        <tr>
            <th>Alt + d</th>
            <td>Slet alle tider i denne session</td>
        </tr>
        <tr>
            <th>Alt + z</th>
            <td>Slet den sidste tid</td>
        </tr>
        <tr>
            <th>Alt + up/down</th>
            <td>Til n&aelig;ste/sidste session.</td>
        </tr>
        <tr>
            <th>Alt + left/rightt</th>
            <td>Vis sidste/n&aelig;ste blanding.</td>
        </tr>
        <tr>
            <th>Ctrl + 1/2/3</th>
            <td> Den sidste tid er OK/+2/DNF</td>
        </tr>
    </table>
    <table class="table" id="vrckey" style="display: inline-block;">
        <tr>
            <th colspan=10>Virtual Cube Key Map</th>
        </tr>
        <tr>
            <td>1<br><br></td>
            <td>2<br><br></td>
            <td>3<br><span>&lt;</span></td>
            <td>4<br><span>&gt;</span></td>
            <td>5<br><span>M</span></td>
            <td>6<br><span>M</span></td>
            <td>7<br><span>&lt;</span></td>
            <td>8<br><span>&gt;</span></td>
            <td>9<br><br></td>
            <td>0<br><br></td>
        </tr>
        <tr>
            <td>Q<br><span> z'</span></td>
            <td>W<br><span>  B</span></td>
            <td>E<br><span> L'</span></td>
            <td>R<br><span>Lw'</span></td>
            <td>T<br><span>  x</span></td>
            <td>Y<br><span>  x</span></td>
            <td>U<br><span> Rw</span></td>
            <td>I<br><span>  R</span></td>
            <td>O<br><span> B'</span></td>
            <td>P<br><span>  z</span></td>
        </tr>
        <tr>
            <td>A<br><span> y'</span></td>
            <td>S<br><span>  D</span></td>
            <td>D<br><span>  L</span></td>
            <td>F<br><span> U'</span></td>
            <td>G<br><span> F'</span></td>
            <td>H<br><span>  F</span></td>
            <td>J<br><span>  U</span></td>
            <td>K<br><span> R'</span></td>
            <td>L<br><span> D'</span></td>
            <td>;<br><span>  y</span></td>
        </tr>
        <tr>
            <td>Z<br><span> Dw</span></td>
            <td>X<br><span> M'</span></td>
            <td>C<br><span>Uw'</span></td>
            <td>V<br><span> Lw</span></td>
            <td>B<br><span> x'</span></td>
            <td>N<br><span> x'</span></td>
            <td>M<br><span>Rw'</span></td>
            <td>,<br><span> Uw</span></td>
            <td>.<br><span> M'</span></td>
            <td>/<br><span>Dw'</span></td>
        </tr>
    </table>
</ul>
<h2>Links</h2>
<ul>
    <li><a class="click" href="http://cubingchina.com/">Cubing China, den officielle kinesiske speedcubing side </a>
    </li>
    <li><a class="click" href="/old2/">csTimer version 2012.3.15 (only zh-cn)</a></li>
    <li><a class="click" href="/old/">csTimer version 2012.2.29 (only zh-cn)</a></li>
    <li><a class="click" href="/src/">csTimer med ukomprimerede filer</a></li>
    <li><a class="click" href="https://github.com/cs0x7f/cstimer">source kode af csTimer</a></li>
</ul>
<h2>Color Schemes</h2>
<?php include('color.php') ?>
<div class="donate" style="line-height:1.5em;">
    <p>Tak for din interesse for at st&oslash;tte csTimer!</p>
    <p>Donationer vil blive brugt til at underst&oslash;tte vores udviklere og k&oslash;bsudstyr. </p>
    <p> Du kan donere via PayPal ved hj&aelig;lp af knappen nedenfor eller<a href="https://www.paypal.me/cs0x7f"
                                                                             class="click"> via. PayPal.me</a>. </p>
    <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
        <input type="hidden" name="cmd" value="_s-xclick">
        <input type="hidden" name="hosted_button_id" value="NW25HME3QUEZY">
        <input type="image"
               src="data:image/gif;base64,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"
               border="0" name="submit" alt="PayPal - Den sikre, og nemmere m&aring;de at betale online!">
    </form>
    <p>Du kan ogs&aring; donere gennem Alipay til denne konto: <br>cs0x7f@gmail.com</p>
    <p><img style="display:inline-block; width:10em; height:10em;"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABsCAIAAAAABMCaAAABoklEQVR42u3aUY6DMAwFQO5/6e0JViq1XwjO5LOqIAxSHJ5z/RnlcSGACHEk4hUY/974i/9/83vlXl3PBREixPmIpYX25oNVrl95GV3PBREixLMQ05OuXD9RoG5fByJEiBCfnDREiBAhDkashAulTTJEiBAhbhJAJIKM41IciBAhLkOMNHQ2+P313T6IECEuQ9z60FBTcYjMDSJEiCMRKx//K4tMYvNcOkwAESLEoxBXNukTwW1XKAsRIsRzEZ9CqUAkClQpxYEIEeIYxApo1+b2qeK2xRcLRIgQH0dMLPaVSVeg080piBAhzkdMB59dQWn6BTxWnSFChLgtYrqAlCYdPmwVCWUhQoQ4HjFRZBIHCBIbeIgQIUJs/WhPLPDhxhlEiBDPQkyPdIFKo99OtiFChPhqxHRzZ+Xho3SwAhEixLMQ0wt/2wOEN+dtoSxEiBDHIO7QhFrZtLr94iFChAgx1AzqKmgrwwiIECFC7ERMh69dG2yIECFCXBFAVIpAegP/mhQHIkSIUcSVjar0hjkeJEOECHEkovFjIUUAEeKU8QE0apeVMce/LwAAAABJRU5ErkJggg==">
    </p>
    <p>Dit support er meget v&aelig;rdsat!</p>
</div>