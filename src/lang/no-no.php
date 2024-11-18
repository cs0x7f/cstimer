<h1>csTimer versjon <?php echo $version;?> - Profesjonell Hurtigkubing/Øvelse tidtaker</h1>
<?php include('lang.php') ?>
<h2>Inntroduksjon</h2>
<p>csTimer er et profesjonelt tidttakingssprogram designet for Rubik’s kube løsere, den inkluderer:</p>
<ul>
<li>Mengder med blandingsalgoritmer, inkludert <strong>alle WCA offisielle konkurranser</strong>, varianter av vridende leker, <strong>øvelsesblanding,</strong> for bestemte undertrinn (e. <strong>F2L, OLL, PLL, ZBLL</strong>, og kan filtrere tilfeller), osv.</li>
<li>Mange statistikkfunksjoner, støtter <strong>tiddelt tidtaking</strong>; <strong>Uansett antall økter</strong>, øktsplitting/sammenslåing osv.</li>
<li>Verksteder, som <strong>Kryss, Xkryss, 2x2x2 side, Skewb side, SQ1 form</strong>, for læring eller øving av disse understegene.</li>
<li>Andre tilleggsverktøy, for eksempel blandingsbilde, 8-sekunders inspeksjon (stemme) varsel, metronom, generator for flere blandinger samtidig osv.</li>
<li>Sikkerhetskopiering, For å unngå å miste data, kan du sikkerhetskopiere tidene/løsningene til lokale filer, csTimers server eller Google-lagring.</li>
</ul>
<p>CsTimer støtter mesteparten av moderne nettlesere, på mobiltelefon, nettbrett og datamaskin. Du kan legge til csTimer på hjem-skjerm, og den vil fungere som en vanlig app.</p>
<p>CsTimer tar i bruk nettleser cache, som innhenter data bare første gang du åpner den. Etter det kan man bruke csTimer uten nettverkstilgang. (Gjelder ikke funksjoner som backup)</p>
<h3>Kopirett</h3>
<p>csTimer er en åpen ressurs som følger GPLv3. Hvis du har forslag eller kommentarer til csTimer, vær så snill og send det inn her</p>
<p>Skrevet av: Shuang Chen (cs0x7f@gmail.com)</p>
<p>UI er designet av: Yue Zhang (liebe7@126.com)</p>
<h2>Enkle funksjoner</h2>
<ul>
<li>Hvordan starte tiden - Hold nede mellomromsknappen (eller begge Ctrl knappen, eller trykk på skjermen på mobiltelefonen) og vent til lyset blir grønt, tiden vil starte med en gang du slipper knappen(e). Trykk deretter på hvilken som helst knapp på tastaturet eller skjermen, og tiden vil bli lagret og vist på skjermen.</li>
<li><strong>UI beskrivelse</strong> - Det finnes 6 knapper nær logoen til csTimer: innstillinger, overfør, blandinger, tider, doner, hjelpemidler. Klikk på <strong>blandinger</strong>, <strong>tider</strong>,<strong>hjelpemidler</strong> For å åpne gjeldende funksjon.</li>
<li>Blande panel. I blande panelet kan du velge blandetype, lage neste blanding og sette blandingslengde</li>
<li><strong>Listetider panel</strong> - I listetider panel, kan du åpne økt  ved å klikke "Økt", velge/legge til/slette økter, tøm økt med velgeren og knappen ved siden av, så kan du se nåverende singel/gjennomsnitt, beste singel/gjennomsnitt, og hele tidslisten.</li>
<li>verktøy-panel</li>
</ul>
<h2>Snarveier</h2>
<table class="table" style="display: inline-block;">
<tr><th>Key</th><td>Function</td></tr>
<tr><th>Alt + 1</th><td>Scramble type to Square-1</td></tr>
<tr><th>Alt + 2 ~ 7</th><td>Scramble type to 2x2x2~7x7x7</td></tr>
<tr><th>Alt + p/m/c/s</th><td>Scramble type to pyra/megaminx/clock/skewb</td></tr>
<tr><th>Alt + i</th><td>Scramble type to input</td></tr>
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
<tr><th colspan=10>Virtuell kube tast kart</th></tr>
</table>

<h2>Innstillinger for detaljer</h2>
<ul>
<li><strong data="opt_ahide">Skjul alle elementer under kubeløsing</strong>. Skjul logo og alle paneler nå du tar tiden</li>
<li><strong data="opt_useMilli">bruk millisekunder</strong>. Vis millisekund sifferet, uansett om det er valgt, den interne tidsnøyaktigheten til csTimer 1 millisekund.</li>
<li><strong data="opt_timeFormat">Tidsformat</strong>. Tidsformat som skal vises.</li>
<li><strong data="opt_atexpa">Automatisk eksport (hver 100 gang)</strong>. Hvis krysset av, vil csTimer eksportere tidene automatisk etter 100 tider/løsninger, til den spesifikke plassen, lokale filer, csTimer server, eller Google Lagring.</li>
<li><strong data="opt_expp">Importer ikke-nyeste data</strong>. Hvis du har lastet opp flere sikkerhetskopier, kan du importere fra 1 opptil de 10 siste opplastede sikkerhetskopiene, dersom du ved et uhell laster opp en tom sikkerhetskopi, vil dette alternativet hjelpe deg med å hente dine tider.</li>
<li><strong data="opt_useLogo">Hint meldinger i logo</strong>. csTimers Logo vil fungere som et informasjonsvisningspanel som spør om en rekke opplysninger du kan være interessert i, for eksempel å slå en personlig rekord.</li>
<li><strong data="opt_showAvg">Vis snitt etikett</strong>. Under hovedtidtakeren er det vist to linjer. Foreløpig gjennomsnitt av 5 og av 12. (Ao5 og Ao12 er valgt som standard)</li>
<li><strong data="opt_zoom">Zoom</strong>. Her kan du justere størrelsen på alle elementer.</li>
<li><strong data="opt_font">velg skrifttype på tidtaker</strong>. Skrifttype til hovedtidstakeren</li>
<li><strong data="opt_uidesign">UI design er</strong>. Du kan bytte ui design til material, eller skjule skygger for dette alternativet.</li>
<li><strong data="opt_view">UI stil er</strong>. Bytt mellom skrivebord og mobilvisning</li>
<li><strong data="opt_wndScr">Blanding panel stil</strong>. Lag blandingspanel integrert i bakgrunnen.</li>
<li><strong data="opt_wndStat">Visningsstil for statistikk</strong>. Lag listetidspanelet innebygd i bakgrunnen.</li>
<li><strong data="opt_wndTool">Verktøy panel stil</strong>. Lag verktøypanel integrert i bakgrunnen.</li>
<li><strong data="opt_bgImgO">bakgrunnsbilde opasitet</strong>. Bakgrunnens synlighet.</li>
<li><strong data="opt_bgImgS">Bakgrunnsbilde</strong>. Du kan velge ditt eget bilde som bakgrunnsbilde, men kun https URL'er er tilgjengelige på grunn av sikkerhetsbegrensninger i nettleseren.</li>
<li><strong data="opt_timerSize">timer størrelse</strong>. Angi størrelsen på hovedtidstakeren</li>
<li><strong data="opt_smallADP">bruk liten font etter desimalplass</strong>. Bruke en mindre skriftstørrelse etter et digitalt punkt i hovedtidstakeren.</li>
<li><strong data="opt_color">velg fargetema</strong>. Select color schemes of csTimer. Click csTimer's logo to show more color schemes.</li>
<li><strong data="opt_useMouse">Bruk mus som tidtaker</strong>. Bruk datamus til å starte tiden.Tastatur-aktivering vil fortsatt være tilgjengelig.</li>
<li><strong data="opt_useIns">bruk WCA inspeksjon</strong>. Aktiver WCA inspeksjonsprosedyre, som er en 15 sekunders nedtelling, automatisk +2/DNF-straff, vil bli aktivert hvis du inspiserer mer enn 15 sekunder.</li>
<li><strong data="opt_voiceIns">stemmealarm på WCA inspeksjonstid</strong>. Varsel når du har brukt 8 og 12 sekunder av undersøkelsen, for å simulere varsler fra en dommer i en offisiell WCA konkurranse.</li>
<li><strong data="opt_voiceVol">Talevolum</strong>. Stemmevolum av varsel ovenfor.</li>
<li><strong data="opt_input">Skriv inn tider med</strong>. csTimer kan legge til tider/løsninger på flere måter, den støtter innskrivning av resultat, automatisk opptak fra en stackmattimer, koble til en bluetooth smart kube eller spill med virtual Rubiks kube, bortsett fra tastatur tidtaking.</li>
<li><strong data="opt_intUN">Enhet når du går inn i et heltall</strong>. Når du skriver et heltall XXX i innboksen, hva betyr det, XXX sekund eller XXX centisecond eller XXX millisecond?</li>
<li><strong data="opt_timeU">Timer oppdatering er</strong>. Hvordan tiden er oppdatert når du tar tiden.</li>
<li><strong data="opt_preTime">tid å holde mellomromstasten nede(sekund(er))</strong>. Hvor lenge du må holde nede mellomromstasten før tidtakeren blir grønn</li>
<li><strong data="opt_phases">fler-faset</strong>. Antall faser, trykk på en tast for å markere et delt punkt ved tidtakingen.</li>
<li><strong data="opt_stkHead">bruk stackmat status informasjon</strong>. Stackmat vil rapportere tilstand, f.eks. om venstre eller høyre område er berørt, deretter csTimer kan bruke denne informasjonen, men datafeilen kan oppstå og forårsake uventet oppførsel.</li>
<li><strong data="opt_scrSize">blandings størrelse</strong>. Størrelse på blandingsteksten.</li>
<li><strong data="opt_scrASize">Automatisk blandingsstørrelse</strong>. Størrelsen på blandingsteksten vil automatisk bli justert med lengden på blandingen, som fungerer sammen med tidligere alternativ.</li>
<li><strong data="opt_scrMono">monospasert blanding (skriftype med lik bredde.)</strong>. Bruk monospaced skrift (skrifttype med lik bredde) for blandingstekst.</li>
<li><strong data="opt_scrLim">Begrens høyden av blandingsområde</strong>. Når blandingsområdet er for høyt, vil det oppstå en rullebar for å unngå heving av panelet.</li>
<li><strong data="opt_scrAlign">Juster blandingsområde</strong>. Justering av hele blandingsområdet inkluderer blandingstypevelger.</li>
<li><strong data="opt_preScr">pre-scramble</strong>. Pre trekk før blanding, som er brukt til virtuell Rubiks kube og visuell framstilling av blanding.</li>
<li><strong data="opt_scrNeut">Color neutral</strong>. If turned on, the position/first-layer color of some training scrambles will be random.</li>
<li><strong data="opt_scrEqPr">Probabilities for training-scramble states</strong>. For training scrambles, the probability of each case can be set to: follow the probability of the actual solving process; or let all cases appear with equal probability; or let all cases appear randomly in sequence (that is, to ensure that all N cases appear at least once in the next 2 N scrambles).</li>
<li><strong data="opt_scrFast">Bruker rask blanding til 4x4x4 (uoffisielt)</strong>. WCA offisielle 4x4x4 blanding krever store beregningsressurser. Velg dette alternativet for å bruke en tilfeldig blanding for 4x4x4 i stedet.</li>
<li><strong data="opt_scrKeyM">Merk viktige trekk i blanding</strong>. Marker et viktig trekk i blandingen, f.eks. trekk som forandrer formen fra kvadratisk til en annen form i SQ1-blandinger.</li>
<li><strong data="opt_scrClk">Handling ved klikk av blanding</strong>. Hva som skjer når du klikker på blandingsteksten, kopier blanding eller generer neste blanding.</li>
<li><strong data="opt_trim">Antall avskåret løser ved hver side</strong>. Antall tider som blir trimmet ved hodet og halen når gjennomsnittet blir kalkulert.</li>
<li><strong data="opt_statsum">Vis sammendrag før listen med tider</strong>. Vis statistikk-tabellen før tidslisten.</li>
<li><strong data="opt_statthres">Show target time for session best</strong>. In the statistics table, the time required to refresh personal best after next solve is displayed. "N/A" means the next solve will not refresh PB no matter how fast it is, "&#8734;" means any time except DNF will refresh PB.</li>
<li><strong data="opt_printScr">print blanding(er) i statistikken</strong>. Print blandingen i rund statistikk dialog.</li>
<li><strong data="opt_printDate">print løsningsdato i statistikkene</strong>. Print blandingen i rund statistik dialog.</li>
<li><strong data="opt_imrename">gi økten nytt navn umiddelbart etter opprettelse</strong>. Gi straks navn til økten etter at den er opprettet.</li>
<li><strong data="opt_scr2ss">Opprett ny økt når blandingstype blir byttet</strong>. Når du bytter blandingstype, en ny økt blir laget.</li>
<li><strong data="opt_statinv">Hvis tider i omvendt rekkefølge</strong>. Snu på tidslisten, så den nyeste tidene/løsningene er nå på bunnen av tidslisten.</li>
<li><strong data="opt_statclr">Aktiver tømming av økt</strong>. Når deaktivert vil en '+' knapp (for oppretting av økt) erstatte 'X'-knappen i tillegg til øktvelgeren, Derfor, når du klikker, opprettes en ny tom økt i stedet for å fjerne hele økten.</li>
<li><strong data="opt_absidx">Vis absolutt indeks i statistikk rapport</strong>. Vis den absolutte indeks i økten, i stedet for 1 til antall tider/løsninger, (f.eks 1/2/3 for mo3) i  rundestatistikk.</li>
<li><strong data="opt_rsfor1s">Vis status ved klikk på løsningsnummer</strong>. Når du klikker den første raden i tidslisten, vises det en rundestatistikk for en enkelt tid/løsning.</li>
<li><strong data="opt_statal">Statistiske indikatorer</strong>. Statistisk indikator for statistikktabellen, når du tilpasser er  aoX og moX tilgjengelig.</li>
<li><strong data="opt_delmul">Aktiver sletting av flere</strong>. I stand til å slette flere tider/løsninger, for å unngå misforståelser vil den valgte tiden/løsningen være det eldste tiden/løsningen som slettes.</li>
<li><strong data="opt_disPrec">presisjon av tidsfordelingen</strong>. Tidsintervall for tidsfordelingsverktøyet.</li>
<li><strong data="opt_solSpl">Vis løsning progressivt</strong>. Hvis valgt, vises bare lengden på en løsning fra en løser, og man kan se løsningen steg for steg, ellers blir hele  løsningen vist.</li>
<li><strong data="opt_imgSize">Blandings størrelse</strong>. Velg størrelse på skriften til blandingen.</li>
<li><strong data="opt_NTools">antall verktøy</strong>. csTimer kan vise opp til 4 verktøy samtidig.</li>
<li><strong data="opt_useKSC">bruk snarvei på tastatur</strong>. Use keyboard shortcut to switch scramble type, generate next scramble, switch between sessions. Click csTimer's logo to show details.</li>
<li><strong data="opt_useGES">use gesture control</strong>. Use gestures (swiping in different directions) to switch OK/+2/DNF, add comments, generate next scramble, etc. Also available on non-touch screen devices when mouse timer is enabled. Click csTimer's logo to show details.</li>
<li><strong data="opt_vrcSpeed">VRC gjennomsnittshastighet (tps)</strong>. Utgansspunkt for hastigheten på den virtuelle rubik's kuben, tps vil øke hvis det er flere trekk.</li>
<li><strong data="opt_vrcMP">fler-faset</strong>. Automatisk flerfasedeling for virtuell Rubiks kube og smartkube.</li>
<li><strong data="opt_giiMode">Bluetooth Cube Mode</strong>. Usage mode of smart cube: In normal mode, you need to manually scramble the cube until it is consistent with the scrambled state; in training mode, after pressing the space (or touching the screen on the touch screen), the virtual cube will directly change to the scrambled state. You need to solve virtual cube partially (depends on scramble, e.g. permutation of last layer is not checked in oll training) instead of physical cube; In continuous training mode, in addition to training mode, once the virtual cube is solved, you will directly enter the next solve without pressing space. You can also press ESC (on a touch screen, hold the screen for 2 seconds) to exit the solve.</li>
<li><strong data="opt_giiVRC">Vis virtuell smartkube</strong>. Vis en virtuell Rubiks kube på skjermen når en rubiks kube med Bluetooth er koblet til.</li>
<li><strong data="opt_giiSD">marker blandet hvis du holder deg</strong>. for en smartkube, kan ikke csTimer vite om kuben er et trekk fra blandet eller løst</li>
<li><strong data="opt_giiSK">Marker blandet med mellomromstast</strong>. når mellomromknappen er trykket ned, vil smartkuben bli markert blandet, hvis du vrir etter det vi det starte tiden</li>
<li><strong data="opt_giiSM">Marker blandet ved å gjøre</strong>. Bruk spesifikke sekvenser på smartkuben for å merke blandet.</li>
<li><strong data="opt_giiBS">pip når blandingen markeres</strong>. Pip når blandingen er ferdig.</li>
<li><strong data="opt_giiRST">Reset smartkube når tilkoblet</strong>. Når du kobler til en smartkube, vil csTimer finne ut om den er løst, hvis ikke, kan det være noen problemer med maskinvaren eller kuben er uløst.</li>
<li><strong data="opt_giiAED">Automatisk oppdagelse av feil på maskinvare</strong>. Noen smartkuber vil ikke få med seg alle trekkene på grunn av maskinvarefeil, csTimer vil prøve å oppdage sånne tilfeller.</li>
</ul>
<h2>Verktøy detaljer</h2>
<ul>
<li><strong data="tool_scrgen">Blandingsgenerator</strong>. Du kan generere opp til 999 blandinger med ett klikk på dette verktøyet.</li>
<li><strong data="tool_cfm">Bekreft tid</strong>. Verktøy for å vise aktuelle tider/løsninger med kommentarer, blandinger, Løsningsdatoer og rekonstruksjoner hvis tilgjengelig, noe som også står i dialogen når du klikker på en løsning.</li>
<li><strong data="tool_hugestats">kryss-seksjon statistikker</strong>. Med dette verktøyet er det mulig å få statistikk over alle øktene.</li>
<li><strong data="tool_stats">Statistikk</strong>. Statistikk-tabellen er lik tabellen i tidslistepanelet.</li>
<li><strong data="tool_distribution">tidsfordeling</strong>. Tidsfordeling og stabilitetsanalyse &lt;X Y/Z betyr at det er totalt Y tider/løsninger mindre enn X sekunder, og alle de siste Z løsningene er mindre enn X sekunder i økten.</li>
<li><strong data="tool_trend">Tids-trend</strong>. Viser en trendkurve til alle tider/løsninger under denne økten.</li>
<li><strong data="tool_dlystat">Daily Statistics</strong>. Antall tider/løsninger hver dag/uke/måned/år.</li>
<li><strong data="tool_image">Tegn blanding</strong>. Blandingsbilde kan verifiseres riktig blanding, alle WCA-leker støttes.</li>
<li><strong data="tool_roux1">Løsere &gt; Roux S1</strong>. Roux 1. steg blir løst, som løser en 1x2x3-blokk.</li>
<li><strong data="tool_eoline">Løsere &gt; EOlinje</strong>. EO-linjeløsning, som løser retning av alle 12 kantene og posisjoner for DF og DB-kanter.</li>
<li><strong data="tool_cross">Løsere &gt; kryss</strong>. Kryss-løser som løser DF, DL. DR og DB kanter</li>
<li><strong data="tool_222face">Løsere &gt; 2x2x2 side</strong>. 2x2x2 side løser, som løser en side av en 2x2x2 kube.</li>
<li><strong data="tool_333cf">Løsere &gt; Cross + F2L</strong>. Kryss og F2L-løser, som løser Kryss og hele F2L med datasøk, så løsningen kan være langt unna menneskelige løsninger.</li>
<li><strong data="tool_333roux">Løsere &gt; Roux S1 + S2</strong>. Roux 1. og 2. trinnsløser, som først løser en 1x2x3-blokk på venstre side og deretter utvider enda 1x2x3-blokk på høyre side med R, M, r, U.</li>
<li><strong data="tool_333petrus">Løsere &gt; 2x2x2 + 2x2x3</strong>. Petrus 1. og 2. trinnsløser, som først løser en 2x2x2 blokk til venstre for den og deretter utvider den til 2x2x3 til venstre.</li>
<li><strong data="tool_333zz">Løsere &gt; EOLine + ZZF2L</strong>. Eoline og ZZF2L-løser, som først løser EOLine og deretter løser én av venstre 1x2x3 eller høyre 1x2x3 og løser den andre 2x2x3.</li>
<li><strong data="tool_sq1cs">Løsere &gt; SQ1 S1 + S2</strong>. SQ1 første og andre stegløser, som først løser formen på SQ1 og etter det deler U-delene og d-delene</li>
<li><strong data="tool_pyrv">Løsere &gt; Pyraminx V</strong>. Pyraminx V løser, som løser tre hjørner og to kanter til å forme en V-form for pyraminx</li>
<li><strong data="tool_skbl1">Løsere &gt; Skewb Face</strong>. Skewb fjes løser, som løser et lag av skewben, mer konkret 1 senter og 4 nabohjørner.</li>
<li><strong data="tool_giikerutil">Smart kube</strong>. Tilleggsverktøy for smartkube, som kan vise nåværende tilstand, batteristrøm, ombygging i sanntid osv.</li>
<li><strong data="tool_mtrnm">metronom</strong>. Metronome, besides beeping at specific frequency, you make it beep at specific time after starting solve as well.</li>
<li><strong data="tool_syncseed">Vanlig blanding</strong>. Using same scrambles with friends by setting a common seed.</li>
<li><strong data="tool_stackmatutil">stackmat</strong>. Auxiliary tool for Stackmat, which is able to view the status, power and noise level of the signal, etc.</li>
</ul>
<h2>Linker</h2>
<ul>
<li><a class="click" href="https://cubingchina.com/" title="">Kina kubing</a></li>
<li><a class="click" href="/new/" title="">CsTimer beta versjon</a></li>
<li><a class="click" href="/src/" title="">csTimer betaversjon med ukomprimerte filer</a></li>
<li><a class="click" href="https://github.com/cs0x7f/cstimer" title="">CsTimer kildekode</a></li>
<li><a class="click" href="/2019.12.24/" title="">csTimer version 2019.12.24</a></li>
<li><a class="click" href="/2018.11.05/" title="">csTimer version 2018.11.05</a></li>
<li><a class="click" href="/2015.12.12/" title="">csTimer version 2015.12.12</a></li>
<li><a class="click" href="/2012.03.15/" title="">csTimer version 2012.03.15</a></li>
<li><a class="click" href="/2012.02.29/" title="">csTimer version 2012.02.29</a></li>
</ul>
<h2>Fargetema</h2>
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
<p>Takk for din villighet til å støtte csTimer! Donasjonen din vil bli brukt til å støtte våre utvikling- og vedlikeholdskostnader.</p>
<p>Hvis du ønsker å gi oss en donasjon via PayPal, vennligst klikk på knappen under eller gjennom <a class="click" href="https://www.paypal.me/cs0x7f" title="">PayPal.me</a>.</p>
<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
<input type="hidden" name="cmd" value="_s-xclick">
<input type="hidden" name="hosted_button_id" value="NW25HME3QUEZY">
<input type="image" src="data:image/gif;base64,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" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
</form>
<p>Du kan også finansiere oss med Alipay, skann den neste todimensjonale koden eller betal til kontoen: cs0x7f@gmail.com</p>
<p><img style="display:inline-block; width:10em; height:10em;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABsCAIAAAAABMCaAAABoklEQVR42u3aUY6DMAwFQO5/6e0JViq1XwjO5LOqIAxSHJ5z/RnlcSGACHEk4hUY/974i/9/83vlXl3PBREixPmIpYX25oNVrl95GV3PBREixLMQ05OuXD9RoG5fByJEiBCfnDREiBAhDkashAulTTJEiBAhbhJAJIKM41IciBAhLkOMNHQ2+P313T6IECEuQ9z60FBTcYjMDSJEiCMRKx//K4tMYvNcOkwAESLEoxBXNukTwW1XKAsRIsRzEZ9CqUAkClQpxYEIEeIYxApo1+b2qeK2xRcLRIgQH0dMLPaVSVeg080piBAhzkdMB59dQWn6BTxWnSFChLgtYrqAlCYdPmwVCWUhQoQ4HjFRZBIHCBIbeIgQIUJs/WhPLPDhxhlEiBDPQkyPdIFKo99OtiFChPhqxHRzZ+Xho3SwAhEixLMQ0wt/2wOEN+dtoSxEiBDHIO7QhFrZtLr94iFChAgx1AzqKmgrwwiIECFC7ERMh69dG2yIECFCXBFAVIpAegP/mhQHIkSIUcSVjar0hjkeJEOECHEkovFjIUUAEeKU8QE0apeVMce/LwAAAABJRU5ErkJggg=="></p>
<p>Takk igjen for donasjonen</p>
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