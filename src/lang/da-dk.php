<h1>csTimer version <?php echo $version;?> - Professionel Speedcubing/Trænings stopur</h1>
<?php include('lang.php') ?>
<h2>Introduktion</h2>
<p>csTimer er et professionelt stopur designet til hurtigløsere af professorterninger, der giver:</p>
<ul>
<li>Mængden af blandingsalgoritmer, herunder <strong>alle WCA-officielle begivenheder</strong>varianter af specielle terninger, <strong>træningsbladninger</strong> for specifikke deltrin (f. eks. . <strong>F2L, OLL, PLL, ZBLL</strong>, og kan filtrere tilfælde) osv.</li>
<li>Mange statistikfunktioner, understøttelse af <strong>tidsdelt tiddstagning</strong>; <strong>Uendeligt antal sessioner</strong>, sessions-opdeling/sammenskædning osv.</li>
<li>Adskillelige muligheder, som <strong>Kryds, Xkryds, 2x2x2 side, Skæv side, SQ1 form</strong>, for læring eller træning af disse deltring</li>
<li>Andre tillægsværktøj, som for eksempel blandingsbillede, 8-sekunders inspektion (stemme) advarsel, metronom, parti-blandingsgenerator osv.</li>
<li>Backup funktion, For at undgå manglende data, kan du sikkerhedskopiere dine løsninger til lokale filer, csTimers' servere eller Google.</li>
</ul>
<p>csTimer understøtter de fleste moderne browsere, på mobiltelefon og tablet, du kan tilføje csTimer til din startskærm, og det vil fungere som en integreret APP.</p>
<p>csTimer udnytter browser-cache, som kun bruger trafik, når du åbner den for første gang. Derefter er csTimer i stand til at arbejde uden netværksforbindelse (undtagen funktioner som backup)</p>
<h3>Ophavsret</h3>
<p>csTimer er open source software, der følger GPLv3. Hvis du har forslag eller kommentarer til csTimer, bedes du indsende dem <a class="click" href="https://github.com/cs0x7f/cstimer/issues" title="">her</a></p>
<p>Skrevet af: <a href="mailto:cs0x7f@gmail.com">Shuang Chen (cs0x7f@gmail.com)</a></p>
<p>UI designet af: <a href="mailto:liebe7@126.com">Yue Zhang (liebe7@ 126.com)</a></p>
<h2>Basis funktioner</h2>
<ul>
<li><strong>Hvordan starter du tidstagning</strong> - Hold mellemrumstasten (eller både venstre og højre CTRL taster, eller rør skærmen på mobile enheder) og vent på, at tiden bliver grøn. Stopuret vil starte når mellemrumstasten er sluppet. Tryk på en hvilken som helst tast for at stoppe tiden og løsningstiden vil være registreret.</li>
<li><strong>UI beskrivelse</strong> - Der er 6 knapper nær logoet af csTimer: Valg, eksport, blanding, list tider, doner, værktøj, klik på <strong>blanding</strong>, <strong>list tider</strong>, <strong>værktøj</strong> for at åbne det tilsvarende funktionspanel.</li>
<li><strong>Blandings panel</strong> - I blandingspanelet, kan du vælge blandingstype, sætte blandingslængde og tilfælde-filter (hvis tilgængeligt), gennemgå tidligere blandinger generere næste blandning.</li>
<li><strong>Listetider panel</strong> - I tidslistepanel, kan du åbne sessioner ved at klikke "Session", vælge/tilføje/slette session, tøm session med knappen ved siden af, så du kan se nuværende enkelt/gennemsnit, bedste enkelt/gennemsnit, og hele tidslisten.</li>
<li><strong>Værktøjspanel</strong> - I værktøjspanelet kan du vælge specifikke hjælpefunktioner, herunder blandingsbillede, blandingsgeneratorer, løsere, andre former for statistik osv.</li>
</ul>
<h2>Genvejstaster</h2>
<table class="table" style="display: inline-block;">
<tr><th>Tast</th><td>Funktion</td></tr>
<tr><th>Alt + 1</th><td>Blandingstype Firkant-1.</td></tr>
<tr><th>Alt + 2 ~ 7</th><td>Blandingstype 2x2x2~7x7x7.</td></tr>
<tr><th>Alt + p/m/c/s</th><td>Blandingstype pyra/megaminx/ur/skewb.</td></tr>
<tr><th>Alt + i</th><td>Blandingstype input.</td></tr>
<tr><th>Alt + d</th><td>Fjern alle tider i den aktuelle session.</td></tr>
<tr><th>Alt+Z</th><td>Fjern den seneste tid.</td></tr>
<tr><th>Alt + ↑/↓</th><td>Til næste/sidste session.</td></tr>
<tr><th>Alt + ←/→</th><td>Vis sidste/næste blanding.</td></tr>
<tr><th>Ctrl + 1/2/3</th><td>Den sidste tid er OK/+2/DNF</td></tr>
</table>
</table>
<table class="table" id="vrckey" style="display: inline-block;">
<tr><th colspan=10>Virtuel Terning Nøglekort</th></tr><tr>
<td>1<br><br></td><td>2<br><br></td><td>3<br><span>&lt;</span></td><td>4<br><span>&gt;</span></td><td>5<br><span>M</span></td>
<td>6<br><span>M</span></td><td>7<br><span>&lt;</span></td><td>8<br><span>&gt;</span></td><td>9<br><br></td><td>0<br><br></td>
</tr><tr>
<td>Q<br><span> z'</span></td><td>W<br><span>  B</span></td><td>E<br><span> L'</span></td><td>R<br><span>Lw'</span></td><td>T<br><span>  x</span></td> 
<td>Y<br><span>  x</span></td><td>U<br><span> Rw</span></td><td>I<br><span>  R</span></td><td>O<br><span> B'</span></td><td>P<br><span>  z</span></td> 
</tr><tr>
<td>A<br><span> y'</span></td><td>S<br><span>  D</span></td><td>D<br><span>  L</span></td><td>F<br><span> U'</span></td><td>G<br><span> F'</span></td>
<td>H<br><span>  F</span></td><td>J<br><span>  U</span></td><td>K<br><span> R'</span></td><td>L<br><span> D'</span></td><td>;<br><span>  y</span></td>
</tr><tr>
<td>Z<br><span> Dw</span></td><td>X<br><span> M'</span></td><td>C<br><span>Uw'</span></td><td>V<br><span> Lw</span></td><td>B<br><span> x'</span></td>
<td>N<br><span> x'</span></td><td>M<br><span>Rw'</span></td><td>,<br><span> Uw</span></td><td>.<br><span> M'</span></td><td>/<br><span>Dw'</span></td>
</tr>
</table>

<h2>Detaljer omkring indstillinger</h2>
<ul>
<li><strong data="opt_ahide">Gem alle elementer når du tager tid</strong>. Skjul logo og alle paneler under tidstagning.</li>
<li><strong data="opt_useMilli">brug millisekunder</strong>. Vis millisekund, uanset om det er kontrolleret, nøjagtigheden af csTimer er 1 millisekund.</li>
<li><strong data="opt_timeFormat">tids format</strong>. Tidsformat der skal vises.</li>
<li><strong data="opt_atexpa">Auto Export (per 100 løsning)</strong>. Hvis ifyldt, vil csTimer automatisk eksportere løsningerne pr. 100 løsning til det angivne sted, lokal fil, csTimer server eller Google Storage.</li>
<li><strong data="opt_expp">Importer ikke-seneste data</strong>. Hvis du har uploadet flere sikkerhedskopier, kan du importere fra en af de til 10 senest uploadede sikkerhedskopier, hvis du ved et uheld uploader en tom backup, vil denne indstilling hjælpe dig med at hente dine løsninger.</li>
<li><strong data="opt_useLogo">Tip beskeder i logo</strong>. csTimers Logo vil fungere som et displaypanel, der anmoder om en række oplysninger, du kan være interesseret i, såsom at slå din personlige rekord.</li>
<li><strong data="opt_showAvg">Vis Gns Etiket</strong>. To linjer af etiketter er vist under stopuret, de nuværende to gennemsnit, som standard; ao5 og ao12.</li>
<li><strong data="opt_zoom">Zoom</strong>. Du kan med denne indstilling, justere størrelser af alle elementer.</li>
<li><strong data="opt_font">Vælg timerens font</strong>. Skrifttype for stopuret.</li>
<li><strong data="opt_uidesign">UI design er</strong>. Du kan med denne indstilling ændre UI design til materiale-lignende eller skjule skygger.</li>
<li><strong data="opt_view">UI stil er</strong>. Skift mellem skrivebords- og mobilvisning.</li>
<li><strong data="opt_wndScr">Blandingspanel visuelle stil</strong>. Gør blandingspanel indlejret.</li>
<li><strong data="opt_wndStat">Statistikpanel visuelle stil</strong>. Gør tidslistepanel indlejret.</li>
<li><strong data="opt_wndTool">Værktøjpanels visuelle stil</strong>. Gør værktøjsspanel indlejret.</li>
<li><strong data="opt_bgImgO">baggrunds billede gennemsigtigheds</strong>. Gennemsigtighed af baggrundsbilledet.</li>
<li><strong data="opt_bgImgS">baggrunds billede</strong>. Du kan vælge dit eget billede som baggrundsbillede, dog kun fra https webadresser, på grund af sikkerhedskravet i browseren.</li>
<li><strong data="opt_timerSize">timer størrelse</strong>. Indstil størrelsen på stopuret.</li>
<li><strong data="opt_smallADP">brug lille font efter decimal punkt</strong>. Brug en mindre skriftstørrelse for decimaler i stopuret.</li>
<li><strong data="opt_useMouse">Brug musetimer</strong>. Brug musen til at starte stopuret, genvejstaster vil også være tilgængelig.</li>
<li><strong data="opt_useIns">brug WCA inspektion</strong>. Aktiver WCA inspektion procedure, som er en 15-sekunders nedtælling, automatisk +2/DNF straf vil også være aktiveret, hvis du inspicerer i mere end 15 sekunder.</li>
<li><strong data="opt_voiceIns">stemme advarsel af WCA inspektion</strong>. Advarsel ved 8/12'erne af inspektion, for at simulere advarsel fra dommer i WCA-konkurrencer.</li>
<li><strong data="opt_voiceVol">Stemme lydstyrke</strong>. Stemmeniveau af førnævnte advarsel.</li>
<li><strong data="opt_input">Put tid ind med</strong>. csTimer er i stand til at tilføje løsninger på flere måder; Manuelt input, Automatisk optagelse via et stackmat-ur, oprette forbindelse til en bluetooth terning eller virtuel professor terning, keyboard stopur.</li>
<li><strong data="opt_intUN">Enhed ved indtastning af heltal</strong>. Måleenheden når du indtaster et heltal XXX i input-boksen (sekunder, centisekunder eller millisekunder)?</li>
<li><strong data="opt_timeU">Timer opdatering er</strong>. Hvordan stopuret opdateres under tidstagning.</li>
<li><strong data="opt_preTime">Tid at holde mellemrumsknappen inde(sekunder(s))</strong>. Hvor længe mellemrumstasten skal holdes før stopuret bliver grøn.</li>
<li><strong data="opt_phases">multi-fase</strong>. Antal faser: Tryk på en tast for at markere et splittid, under tidstagning.</li>
<li><strong data="opt_stkHead">Brug Stackmat status information</strong>. Stackmat vil rapportere sin status, eks. om venstre eller højre område er rørt, så csTimer er i stand til at bruge disse oplysninger, bemærk dog at datafejl kan opstå og forårsage uventet adfærd.</li>
<li><strong data="opt_scrSize">blanding størrelse</strong>. Størrelse på blandingstekst.</li>
<li><strong data="opt_scrASize">Automatisk blandingsstørrelse</strong>. Størrelsen af blandingsteksten justeres automatisk med afhængig af blandingen, hvilket hænger sammen med tidligere indstilling.</li>
<li><strong data="opt_scrMono">monospaced blanding</strong>. Brug monospace skrifttype til blandingstekst.</li>
<li><strong data="opt_scrLim">Begræns højden af blandings området</strong>. I tilfælde af blandingsteksten fylder mere end der er plads til, vil der vises en rullebjælke for at undgå at forstørre blandingspanelet.</li>
<li><strong data="opt_scrAlign">Justering af blandings området</strong>. Justering af hele blandingsområdet, inkluderer valg af blandingstype.</li>
<li><strong data="opt_preScr">pre-scramble</strong>. Pre rotationer før blanding, som bruges til virtuelle professorterninger og blandingsbillede.</li>
<li><strong data="opt_scrFast">Brug hurtig blanding til 4x4x4 (ikke officiel)</strong>. Oficielle WCA blandinger kræver mange beregnings resurser. Brug denne indstilling for tilfældig blanding af 4x4x4.</li>
<li><strong data="opt_scrKeyM">Marker nøgle rotationer i blanding</strong>. Marker et nøgletræk i blandingen, f.eks. det træk, der tager tilstanden væk fra dets firkantede form i SQ1-blandinger.</li>
<li><strong data="opt_scrClk">Handling ved klik på blanding</strong>. Handling når du klikker på blandingsteksten; Kopiér blanding eller generer næste blanding.</li>
<li><strong data="opt_trim">Antal af løsninger fjernet på hver side</strong>. Antal af løsninger fjernet i top og bund af løsninger ved beregning af gennemsnit.</li>
<li><strong data="opt_statsum">vis sammendrag inden tidslisten</strong>. Vis statistiktabellen før tidslisten.</li>
<li><strong data="opt_printScr">print blanding(erne) i statistikker</strong>. Udskriv blanding i statistik.</li>
<li><strong data="opt_printDate">Udskriv løsningsdato i statistik</strong>. Udskriv løsningdato i statistik.</li>
<li><strong data="opt_imrename">omdøb session umiddelbart efter oprettelsen</strong>. Omdøb session efter oprettelse.</li>
<li><strong data="opt_scr2ss">Opret ny session, når du skifter blandings type</strong>. Opret session ved skift af blandingstype.</li>
<li><strong data="opt_statinv">Omvendt tidsliste</strong>. Invertere tidslisten, således de seneste løsninger er i bunden af tidslisten.</li>
<li><strong data="opt_statclr">Aktivér tømning af session</strong>. Når deaktiveret, vil en '+'-knap (til oprettelse af session) erstatte 'X'-knappen ved siden af sessionsvælgeren, så når du klikker på knappen, vil der blive oprettet en ny session i stedet for at rydde sessionen.</li>
<li><strong data="opt_absidx">Vis absolut indeks i statistikrapport</strong>. Vis absolut indeks i session i stedet for 1 til antal løsninger (eks. 1/2/3 for mo3) i runde statistikker.</li>
<li><strong data="opt_rsfor1s">Vis statistik når du klikker på løsning</strong>. Når du klikker på den første række af tidslisten, vises en afrundet statistik for en enkelt løsning.</li>
<li><strong data="opt_statal">Statistiske indikatorer</strong>. Statistisk indikator for statistikktabel (aoX og moX er tilgængelig).</li>
<li><strong data="opt_delmul">Tillad flere sletninger</strong>. Mulighed for at slette flere tider/løsninger, for at undgå misforståelser vil den valgte tid/løsningen være den ældste tid/løsningen som slettes.</li>
<li><strong data="opt_disPrec">tidsfordeling præcision</strong>. Tidsinterval for tidsfordelingsværktøjet.</li>
<li><strong data="opt_solSpl">Vis løsning progressivt</strong>. Hvis valgt, vises kun længden af en løsning, og man kan se løsningen trin for trin, ellers vises hele  løsningen.</li>
<li><strong data="opt_imgSize">Blandings billed størrelse</strong>. Størrelsen af blandingsbillede.</li>
<li><strong data="opt_NTools">nummer af værktøj</strong>. csTimer er i stand til at vise op til 4 værktøjer samtidigt.</li>
<li><strong data="opt_useKSC">brug tastatur genvej</strong>. Brug tastaturgenveje til at skifte blandingstype, generere næste blanding, skifte mellem sessioner osv.</li>
<li><strong data="opt_vrcSpeed">VRC base hastighed (TPS)</strong>. Basis rotationshastighed på den virutelle professorterning. Hastigheden vil stige, hvis der er flere træk.</li>
<li><strong data="opt_vrcMP">flerfaset</strong>. Automatisk flerfase deling for virtuel professorterning og bluetooth terning.</li>
<li><strong data="opt_giiVRC">Vis virtuel Bluetooth terning</strong>. Vis en virtuel professorterning i stopuret ved tilslutning af en bluetooth terning.</li>
<li><strong data="opt_giiSD">Marker blandet efter pause i blanding</strong>. For en bluetooth terning, kan csTimer ikke vide, om et træk er til en blanding eller løsning.</li>
<li><strong data="opt_giiSK">Marker blandet med mellemrumstast</strong>. Når mellemrumstasten trykkes, er bluetooth terningen markeret blandet. Ethvert træk efter, vil behandles som start af løsning og start af stopuret.</li>
<li><strong data="opt_giiSM">Marker blandet ved udførelse</strong>. Brug specifikke sekvenser på bluetooth terningen for at registrere den som blandet.</li>
<li><strong data="opt_giiBS">Bip ved blandet markering </strong>. Bip når nogle af sekvnerserne registreres.</li>
<li><strong data="opt_giiRST">Nulstil bluetooth terning ved tilslutning</strong>. Ved tilslutning til en bluetooth terning, vil csTimer opdage, om den er løst. Hvis ikke, kan det være nogle hardware problemer, eller at terningen ikker er løst.</li>
<li><strong data="opt_giiAED">Automatisk hardware fejl opdagelse</strong>. Nogle bluetooth terninger vil miste nogle træk på grund af hardwarefejl, csTimer vil forsøge at opdage sådanne tilfælde.</li>
</ul>
<h2>Værktøjs detaljer</h2>
<ul>
<li><strong data="tool_scrgen">BlandingsGenerator</strong>. Du er i stand til at generere op til 999 blandinger med et enkelt klik med dette værktøj.</li>
<li><strong data="tool_cfm">Bekræft tid</strong>. Værktøj til at se nuværende løsninger med kommentarer, blanding, løsningsdato og rekonstruktion hvis tilgængelig, hvilket også er dialogen du ser, når du klikker på en løsning.</li>
<li><strong data="tool_hugestats">Krydssessions statistik</strong>. Du er i stand til at udføre kryds-session statistik med dette værktøj.</li>
<li><strong data="tool_stats">Statistiker</strong>. Statistisktabel i stil med tabellen i tidslistepanelet.</li>
<li><strong data="tool_distribution">Tidsfordeling</strong>. Tidsfordeling og stabilitetsanalyse, &lt;X Y/Z betyder, at der i alt Y løsninger mindre end X sekunder, og alle de nyeste Z løsninger er mindre end X sekunder i nuværende session.</li>
<li><strong data="tool_trend">Tidsudvikling</strong>. Viser en trendkurve for alle løsninger i den aktuelle session.</li>
<li><strong data="tool_dlystat">Daily Statistics</strong>. Tæl antallet af løsninger pr. dag/uge/måned/år.</li>
<li><strong data="tool_image">tegn blanding</strong>. Blandingsbillede for at bekræfte en korrekt blanding, alle WCA terninger understøttes.</li>
<li><strong data="tool_roux1">Løsere &gt; løs Roux S1</strong>. Roux 1 trings løser, som løser en 1x2x3 blok.</li>
<li><strong data="tool_eoline">Løsere &gt; løs EOLine</strong>. EO linje løser, som løser orienteringer af alle 12 kanter, og positioner af DF og DB kanter.</li>
<li><strong data="tool_cross">Løsere &gt; løs kryds</strong>. Kryds løser, som løser DF, DL, DR, DB kanter.</li>
<li><strong data="tool_222face">Løsere &gt; 2x2x2 side</strong>. 2x2x2 side løser, som løser én side på en 2x2x2 terning.</li>
<li><strong data="tool_333cf">Løsere &gt; Cross + F2L</strong>. Kryds og F2L løser, som løser kryds og 4 F2L med AI, så løsningen kan adskille sig betydeligt fra menneskelige løsninger.</li>
<li><strong data="tool_333roux">Løsere &gt; Roux S1 + S2</strong>. Roux 1. og 2. trins løser, som først løser en 1x2x3 blok på venstre side og derefter en 1x2x3 blok på højre side med R, M, r, U.</li>
<li><strong data="tool_333petrus">Løsere &gt; 2x2x2 + 2x2x3</strong>. Petrus 1. og 2. trin løser, som først løser en 2x2x2 blok til venstre og derefter udvider den til 2x2x2x3 på venstre side.</li>
<li><strong data="tool_333zz">Løsere &gt; EOLine + ZZF2L</strong>. Eoline og ZZF2L løser, som først løser EOLine og derefter løser en af venstre 1x2x3 eller højre 1x2x3 og til sidst den anden 2x2x3.</li>
<li><strong data="tool_sq1cs">Løsere &gt; SQ1 S1 + S2</strong>. FK1 1. og 2. trin løser, som først løser formen af FK1 og derefter opdeler U og D stykker.</li>
<li><strong data="tool_pyrv">Løsere &gt; Pyraminx V</strong>. Pyraminx V løser, som løser tre hjørner og to kanter og former et 'V' mønster til pyraminx.</li>
<li><strong data="tool_skbl1">Løsere &gt; Skewb Face</strong>. Skewb side solver, som løser et lag af skewb, dvs. 1 midt og 4 nabohjørner.</li>
<li><strong data="tool_giikerutil">Bluetooth Terning</strong>. Hjælpeværktøj til bluetooth-terning, som er i stand til at vise nuværende status, batteristrøm, rekonstruktion i realtid osv.</li>
<li><strong data="tool_if">InsertionFinder</strong>. Indsættelse finder til FMC (Fewest Move Challenge).</li>
<li><strong data="tool_mtrnm">metronom</strong>. Metronom, ud over at bippe ved en bestemt frekvens, bippes også ved et bestemt tidspunkt efter at påbegyndt løsning.</li>
<li><strong data="tool_onlinecomp">Online konkurrence</strong>. Online konkurrence, så du kan logge ind med din WCA-konto og konkurrere mod alle hastighedsløsere rundt om i verden med samme blandinger.</li>
<li><strong data="tool_stackmatutil">stackmat</strong>. Hjælpeværktøj til Stackmat, som er i stand til at se status, effekt og støjniveau på signalet, osv.</li>
</ul>
<h2>Links</h2>
<ul>
<li><a class="click" href="https://cubingchina.com/" title="">Cubing China</a></li>
<li><a class="click" href="/new/" title="">csTimer beta version</a></li>
<li><a class="click" href="/src/" title="">csTimer beta version med ukomprimerede filer</a></li>
<li><a class="click" href="https://github.com/cs0x7f/cstimer" title="">csTimer kildekode</a></li>
<li><a class="click" href="/old3/" title="">csTimer version 2015.12.12</a></li>
<li><a class="click" href="/old2/" title="">csTimer version 2012.3.15</a></li>
<li><a class="click" href="/old/" title="">csTimer version 2012.2.29</a></li>
</ul>
<h2>Farveskemaer</h2>
<?php include('color.php') ?>
<div class="donate" style="line-height:1.5em;">
<p>Tak for din støtte til csTimer! Din donation vil blive brugt til at understøtte vores udviklings- og vedligeholdelsesomkostninger.</p>
<p>Hvis du ønsker at give en donation via PayPal, skal du klikke på knappen nedenfor eller via <a class="click" href="https://www.paypal.me/cs0x7f" title="">PayPal.me</a>.</p>
<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
<input type="hidden" name="cmd" value="_s-xclick">
<input type="hidden" name="hosted_button_id" value="NW25HME3QUEZY">
<input type="image" src="data:image/gif;base64,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" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
</form>
<p>Du kan også donere til os med Alipay ved at skanne den næste todimensionelle kode eller betale til kontoen: cs0x7f@gmail.com</p>
<p><img style="display:inline-block; width:10em; height:10em;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABsCAIAAAAABMCaAAABoklEQVR42u3aUY6DMAwFQO5/6e0JViq1XwjO5LOqIAxSHJ5z/RnlcSGACHEk4hUY/974i/9/83vlXl3PBREixPmIpYX25oNVrl95GV3PBREixLMQ05OuXD9RoG5fByJEiBCfnDREiBAhDkashAulTTJEiBAhbhJAJIKM41IciBAhLkOMNHQ2+P313T6IECEuQ9z60FBTcYjMDSJEiCMRKx//K4tMYvNcOkwAESLEoxBXNukTwW1XKAsRIsRzEZ9CqUAkClQpxYEIEeIYxApo1+b2qeK2xRcLRIgQH0dMLPaVSVeg080piBAhzkdMB59dQWn6BTxWnSFChLgtYrqAlCYdPmwVCWUhQoQ4HjFRZBIHCBIbeIgQIUJs/WhPLPDhxhlEiBDPQkyPdIFKo99OtiFChPhqxHRzZ+Xho3SwAhEixLMQ0wt/2wOEN+dtoSxEiBDHIO7QhFrZtLr94iFChAgx1AzqKmgrwwiIECFC7ERMh69dG2yIECFCXBFAVIpAegP/mhQHIkSIUcSVjar0hjkeJEOECHEkovFjIUUAEeKU8QE0apeVMce/LwAAAABJRU5ErkJggg=="></p>
<p>Mange TAK for din donation</p>
</div>