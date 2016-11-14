<h1>csTimer  versie 2015.12.12 - Professionele Speedcubing/Training Timer</h1>
<?php include('lang.php') ?>
<p>csTimer is ontwikkeld voor speedcubers. Het cre&euml;ert scrambles voor vele types puzzles, waaronder <b>Alle officiele puzzels erkend door het WCA.</b>; Het is ge&iuml;ntegreerd met <b>Xcross solver en eoline solver</b>; Het ondersteunt tijd statistiek, <b>meerfasige timing</b> en verscheidene andere functies zoals: 15s' inspectie vastgesteld door het WCA, etc.</p>
<p>De timer werkt naar behoren op de meeste browsers zoals: Chrome (aanbevolen), Firefox, Opera, Internet Explorer 7+. Ook werkt csTimer op iPad, iPhone en de meeste Android toestellen. </p>
<p> --- Geschreven door:  <a class="click" href="mailto:cs0x7f@gmail.com">Shuang Chen (cs0x7f@gmail.com)</a><br>
 --- UI gemaakt door: <a class="click" href="mailto:liebe7@126.com">Yue Zhang (liebe7@126.com)</a><br></p>
<h2>Introductie</h2>
<ul>
<li><b>Timer</b> - Ondersteunt WCA inspectie, meerfasige timing, Input via toetsenbord, bevestig OK/+2/DNF. De nauwkeurigheid is 0.001s.</li>
<li><b>Scramble</b> - Ondersteunt alle WCA scrambles. Een groot aantal aan onoffici&euml;le en training scrambles, Alleen rand/hoek, Laatste laag.</li>
<li><b>Statistiek</b> - Geeft continu gemiddelde van 5/12 laatste solves. Exporteer statistieken van actuele sessie, meegerekend beste gemiddelde of 5/12 etc.</li>
<li><b>Hulpmiddelen</b> - Ondersteunt meerfasig kruis , Xcross(uitgebreid kruis), EOLine. Scramble afbeelding for NxNxN kubus.</li>
</ul>
<h2>Details</h2>
csTimer is gestest op Firefox, Chrome en Safari. Ook werkt het op de iPad (getest door oyyq).
<h3>Timer</h3>
<ul>
 <li><b>Traditioneel</b> - Druk op de spatiebalk totdat de kleur van de cijvers groen wordt. De meting start zodra je de spatiebalk los laat en slaat de tijd op zodra je opnieuw op de spatiebalk drukt.</li>
 <li><b>Indruktijd</b> - Net zoals stackmat ondersteunt csTimer een indruktijd. Je moet de spatiebalk een moment ingedrukt houden voordat je kan starten. </li>
 <li><b>WCA inspectie</b> - csTimer ondersteunt inspectietijd zoals beschreven in het regelement van het WCA. Als het is ingesteld zal de timer overgaan in inspectietijd nadat je de timer hebt gestart. .</li>
 <li><b>Meerfasige timing</b> - De timer ondersteunt meerfasige timing. Je kan het aantal fases instellen en kan dan meerdere keren op de spatiebalk drukken.</li>
 <li><b>Invoer met toetsenbord</b> -Mocht je een externe timer willen gebruiken, zoals een stackmat, dan is het mogelijk om de tijd handmatig in te voeren.</li>
 <li><b>OK/+2/DNF</b> - Als deze functie is ingesteld zal je een bevestiging krijgen na een solve. Je selecteerd daarin of de kubus OK, +2 of DNF is. De standaardwaarde kan afhangen van je inspecietijd. </li>
 <li><b>Nauwkeurigheid</b> -De nauwkeurigheid van csTimer is 0.001s ofwel 1 milliseconden, het wordt aangegeven als 0,01s.</li>
 <li><b>Tijd formaat</b> - Je kan de tijd zo instellen dat minuten en uren niet worden getoond (hh:mm:ss.XX.(X)) of (mm:ss.XX(X))</li>
 <li><b>Timer update</b> - Voor sommige metingen kan je de tijd instellen op: geen, seconden of real-time.</li>
 <li><b>Lettertype</b> - Voor het optimaliseren van het comfort heeft csTimer gezorgd voor een aanpasbaar lettertype. Zo kan je zelf aanpassen hoe groot de timer is.</li>
 <li><b>Kleuren</b> - csTimer heeft veel kleuren, cre&euml;er je eigen timer!</li>
</ul>
<h3>Scramble</h3>
<ul>
 <li><b>WCA Offici&euml;le Scrambler</b> - csTimer ondersteunt alle offici&euml;le WCA scramblers, zoals: willekeurige staat scrambler voor 2x2x2, 3x3x3, pyraminx, square-1, clock. Willekeurige zetten scrambler voor 4x4x4, 5x5x5, 6x6x6, 7x7x7, megaminx.</li>
 <li><b>CFOP Training</b> - Voor de CFOP methode heeft csTimer speciale scrambles gemaakt. Deze bestaat uit: Last layer scramble, Last layer + &eacute;&eacute;n slot, last layer + 4 slots.</li>
 <li><b>Overige 3x3x3 Methoden</b> - Voor verbetering van CFOP heeft csTimer speciale scrambles ontwikkeld, waaronder: ZBLL, randen/hoeken van last layer, RUL generator.</li>
 <li><b>Roux Training</b> - Voor de Roux method heeft csTimer een speciale scramble gemaakt: Laatste zeg randen, l10p.</li>
 <li><b>Grote kubus training</b> - Grote kubussen worden door csTimer ondersteunt door de volgende scrambles: scramble van hoeken voor 4x4x4, 5x5x5, 6x6x6, 7x7x7.</li>
 <li><b>3x3x3 BLD Training</b> - Voor 3x3x3 bld heeft csTimer specialte scrambles gemaakt: Alleen randen/hoeken scrambled.</li>
 <li><b>Overige Puzzels</b> - csTimer ondersteunt ook een groot aantal puzzels dat niet is ondersteund door het WCA.</li>
</ul>
<h3>Statistieken</h3>
<ul>
 <li><b>Multi-sessie</b> - Er zijn 5 sessies van tijd, alle statistieken functioneren volgens de sessies.</li>
 <li><b>Sessie gemiddelden</b> - Je kan je gemiddelden vinden onder aan je tabel.</li>
 <li><b>Dynamisch ao5</b> - Na 5 solves kan je je gemiddelden uit 5 inzien in de 'ao5' kolom. Meer informatie is beschikbaar door op deze kolom te klikken.</li>
 <li><b>Dynamische ao12</b> -  Na 12 solves kan je je gemiddelden uit 12 inzien in de 'ao12' kolom. Meer informatie is beschikbaar door op deze kolom te klikken.</li>
 <li><b>Details</b> - Klik op de kolom met gemiddelde sessie voor een gedetailleerd overzicht van je actuele sessie.</li>
 <li><b>Opmerking</b> - Klik op de kolom met de opgeloste tijd. Je kan bij die tijd OK/+2/DNF &oacute;f een opmerking plaatsen. </li>
 <li><b>Verwijder tijd/sessie</b> - Klik op de index v&oacute;&oacute;r de kolom met tijd. Je kan die tijd verwijderen of op 'X' klikken naast Sessies om alle tijden uit die sessie te verwijderen.</li>
</ul>
<h3>Sneltoetsen</h3>
<ul>
 <table class="table" style="display: inline-block;">
  <tr><th>key</th><td>Functie</td></tr>
  <tr><th>Alt + 1</th><td>Scramble type naar Square-1.</td></tr>
  <tr><th>Alt + 2 ~ 7</th><td>Scramble type naar 2x2x2~7x7x7.</td></tr>
  <tr><th>Alt + p/m/c/s</th><td>Scramble type naar pyra/megaminx/clock/skewb.</td></tr>
  <tr><th>Alt + i</th><td>Scramble type naar input.</td></tr>
  <tr><th>Alt + d</th><td>Verwijder alle tijden uit de actuele sessie.</td></tr>
  <tr><th>Alt + z</th><td>Verwijder de laatste tijd.</td></tr>
  <tr><th>Alt + up/down</th><td>Naar volgende/laatste sessie.</td></tr>
  <tr><th>Alt + left/rightt</th><td>Toont laatste/volgende scramble.</td></tr>
  <tr><th>Ctrl + 1/2/3</th><td>De laatste tijd is OK/+2/DNF.</td></tr>
 </table>
 <table class="table" id="vrckey" style="display: inline-block;">
  <tr><th colspan=10>Virtuele kubus notatie</th></tr><tr>
   <td>1<br><br></td> <td>2<br><br></td> <td>3<br><span>&lt;</span></td> <td>4<br><span>&gt;</span></td> <td>5<br><br></td>
   <td>6<br><br></td> <td>7<br><span>&lt;</span></td> <td>8<br><span>&gt;</span></td> <td>9<br><br></td> <td>0<br><br></td>
  </tr><tr>
   <td>Q<br><span> z'</span></td> <td>W<br><span>  B</span></td> <td>E<br><span> L'</span></td> <td>R<br><span>Lw'</span></td> <td>T<br><span>  x</span></td> 
   <td>Y<br><span>  x</span></td> <td>U<br><span> Rw</span></td> <td>I<br><span>  R</span></td> <td>O<br><span> B'</span></td> <td>P<br><span>  z</span></td> 
  </tr><tr>
   <td>A<br><span> y'</span></td> <td>S<br><span>  D</span></td> <td>D<br><span>  L</span></td> <td>F<br><span> U'</span></td> <td>G<br><span> F'</span></td>
   <td>H<br><span>  F</span></td> <td>J<br><span>  U</span></td> <td>K<br><span> R'</span></td> <td>L<br><span> D'</span></td> <td>;<br><span>  y</span></td>
  </tr><tr>
   <td>Z<br><span> Dw</span></td> <td>X<br><span> M'</span></td> <td>C<br><span>Uw'</span></td> <td>V<br><span> Lw</span></td> <td>B<br><span> x'</span></td>
   <td>N<br><span> x'</span></td> <td>M<br><span>Rw'</span></td> <td>,<br><span> Uw</span></td> <td>.<br><span> M'</span></td> <td>/<br><span>Dw'</span></td>
  </tr>
 </table>
</ul>
<h2>Links</h2>
<ul>
<li><a class="click" href="http://cubingchina.com/">Cubing China, the official Chinese speedcubing website</a></li>
<li><a class="click" href="/old2/">csTimer version 2012.3.15 (only zh-cn)</a></li>
<li><a class="click" href="/old/">csTimer version 2012.2.29 (only zh-cn)</a></li>
<li><a class="click" href="/src/">csTimer with uncompressed files</a></li>
<li><a class="click" href="https://github.com/cs0x7f/cstimer">source code of csTimer</a></li>
</ul>
<div class="donate" style="line-height:1.5em;">
<p>Thank you for your interest in supporting csTimer!</p>
<p>Donations will be used to support our developers and purchase equipment. </p>
<p>You can donate through PayPal using the button below or <a href="https://www.paypal.me/cs0x7f" class="click"> via PayPal.me</a>. </p>
<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
<input type="hidden" name="cmd" value="_s-xclick">
<input type="hidden" name="hosted_button_id" value="NW25HME3QUEZY">
<input type="image" src="https://www.paypal.com/en_US/i/btn/btn_paynowCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
<img alt="" border="0" src="https://www.paypalobjects.com/zh_XC/i/scr/pixel.gif" width="1" height="1">
</form>
<p>You can also donate through Alipay to the following account: <br>cs0x7f@gmail.com</p>
<p><img style="display:inline-block; width:10em; height:10em;" src="data:image/png;base64,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"></p>
<p>Your support is greatly appreciated!</p>
</div>
