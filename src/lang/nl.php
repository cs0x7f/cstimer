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
<input type="image" src="data:image/gif;base64,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" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
</form>
<p>You can also donate through Alipay to the following account: <br>cs0x7f@gmail.com</p>
<p><img style="display:inline-block; width:10em; height:10em;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABsCAIAAAAABMCaAAABoklEQVR42u3aUY6DMAwFQO5/6e0JViq1XwjO5LOqIAxSHJ5z/RnlcSGACHEk4hUY/974i/9/83vlXl3PBREixPmIpYX25oNVrl95GV3PBREixLMQ05OuXD9RoG5fByJEiBCfnDREiBAhDkashAulTTJEiBAhbhJAJIKM41IciBAhLkOMNHQ2+P313T6IECEuQ9z60FBTcYjMDSJEiCMRKx//K4tMYvNcOkwAESLEoxBXNukTwW1XKAsRIsRzEZ9CqUAkClQpxYEIEeIYxApo1+b2qeK2xRcLRIgQH0dMLPaVSVeg080piBAhzkdMB59dQWn6BTxWnSFChLgtYrqAlCYdPmwVCWUhQoQ4HjFRZBIHCBIbeIgQIUJs/WhPLPDhxhlEiBDPQkyPdIFKo99OtiFChPhqxHRzZ+Xho3SwAhEixLMQ0wt/2wOEN+dtoSxEiBDHIO7QhFrZtLr94iFChAgx1AzqKmgrwwiIECFC7ERMh69dG2yIECFCXBFAVIpAegP/mhQHIkSIUcSVjar0hjkeJEOECHEkovFjIUUAEeKU8QE0apeVMce/LwAAAABJRU5ErkJggg=="></p>
<p>Your support is greatly appreciated!</p>
</div>
