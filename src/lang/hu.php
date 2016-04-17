<h1>csTimer 2015.12.12-es verzi&#x0443; - Professzion&#x0431;lis Gyorskock&#x0431;z&#x0443;/Gyakorl&#x0443; Id&#x0445;m&#x0439;r&#x0445;</h1>
<?php include('lang.php') ?>
<p>A "csTimer" a Rubik kock&#x0431;z&#x0443;knak lett kifejlesztve. Kever&#x0439;seket ad <b>az &#x0446;sszes WCA &#x0431;ltal t&#x0431;mogatott kock&#x0431;khoz</b>; statisztik&#x0431;t ad az eddigi eredm&#x0439;nyekr&#x0445;l, <b>t&#x0446;bbf&#x0431;zis&#x044a; id&#x0445;m&#x0439;r&#x0439;sre k&#x0439;pes</b>&#x0439;s m&#x0439;g rengeteg m&#x0431;s dologra k&#x0439;pes, mint a t&#x0446;bbi hasonl&#x0443; program, mint p&#x0439;ld&#x0431;ul a 15 mp-es WCA &#x0431;ltal el&#x0445;&#x043d;rt memoriz&#x0431;ci&#x0443;s id&#x0445;, stb.</p>
<p>Az id&#x0445;z&#x043d;t&#x0445; a legt&#x0446;bb b&#x0446;ng&#x0439;sz&#x0445;ben t&#x0446;k&#x0439;letesen m&#x044b;k&#x0446;dik, mint: Google Chrome (aj&#x0431;nlott), Firefox, Opera, Int.Exp. 7 f&#x0446;l&#x0446;tt. Szint&#x0439;n m&#x044b;k&#x0446;dik iPad-en, iPhone-on &#x0439;s a legt&#x0446;bb Android platformon. </p>
<p> --- &#x041d;rta: <a class="click" href="mailto:cs0x7f@gmail.com">Shuang Chen (cs0x7f@gmail.com)</a><br>
 --- A fel&#x044c;letet (UI) tervezte: <a class="click" href="mailto:liebe7@126.com">Yue Zhang (liebe7@126.com)</a><br></p>
<h2>Bevezet&#x0445;</h2>
<ul>
<li><b>Id&#x0445;m&#x0439;r&#x0445;</b> - T&#x0431;mogatja a WCA szabv&#x0431;nyait, a t&#x0446;bbf&#x0431;zis&#x044a; id&#x0445;m&#x0439;r&#x0439;st, a billenty&#x044b;zetr&#x0445;l val&#x0443; bevitelt, elfogadja az OK/+2/DNF &#x0431;ll&#x0431;sokat. Pontoss&#x0431;ga 0.001 mp.</li>
<li><b>Kever&#x0439;s</b> - T&#x0431;mogatja a WCA kever&#x0439;si szab&#x0431;lyait. Nagy sz&#x0431;m&#x044a; nem hivatalos kever&#x0439;seket lehet vele gener&#x0431;lni, mint: csak az &#x0439;lek vagy sarkok, utols&#x0445; r&#x0439;teg kever&#x0439;se.</li>
<li><b>Statisztik&#x0431;k</b> - Mutatja az 5. &#x0439;s 12. m&#x0439;r&#x0439;s ut&#x0431;ni &#x0431;tlagokat. Az adott id&#x0445;szak statisztik&#x0431;it is mutatja, benne az 5. &#x0439;s 12. m&#x0439;r&#x0439;s ut&#x0431;ni legjobb eredm&#x0439;nyt.</li>
<li><b>Eszk&#x0446;z&#x0446;k</b> - Kever&#x0439;si k&#x0439;pet mutat a k&#x044c;l&#x0446;mb&#x0446;z&#x0445; kock&#x0431;khoz.</li>
</ul>
<h2>R&#x0439;szletek</h2>
<h3>Id&#x0445;m&#x0439;r&#x0445;</h3>
<ul>
 <li><b>Egyszer&#x044b;</b> - Nyomd le a 'sz&#x0443;k&#x0446;z' billenty&#x044b;t, am&#x043d;g nem v&#x0431;ltozik z&#x0446;ldre a sz&#x0446;veg sz&#x043d;ne. A m&#x0439;r&#x0439;s akkor kezd&#x0445;dik, amikor elengeded a billenty&#x044b;t &#x0439;s akkor &#x0431;ll le, amikor &#x044a;jra lenyomod azt.</li>
 <li><b>Nyomvatart&#x0431;si id&#x0445;</b> - Ahogy a stackmatn&#x0439;l, a csTimer is enged&#x0439;lyezi a nyomvatart&#x0431;si id&#x0445;t. Lenyomva tarthatod a billenty&#x044b;t, am&#x043d;g k&#x0439;szen nem &#x0431;llsz az ind&#x043d;t&#x0431;sra. </li>
 <li><b>WCA memoriz&#x0431;ci&#x0443;s id&#x0445;</b> - csTimer t&#x0431;mogatja a WCA szab&#x0431;lyzat&#x0431;ban le&#x043d;rt memoriz&#x0431;ci&#x0443;s id&#x0445;t. Ha enged&#x0439;lyezve van, akkor az id&#x0445;m&#x0439;r&#x0445; memoriz&#x0431;ci&#x0443;s id&#x0445;ben lesz az elind&#x043d;t&#x0431;s ut&#x0431;n.</li>
 <li><b>T&#x0446;bbf&#x0431;zis&#x044a; id&#x0445;m&#x0439;r&#x0439;s</b> - Az id&#x0445;m&#x0439;r&#x0445; t&#x0431;mogatja a t&#x0446;bbf&#x0431;zis&#x044a; id&#x0445;m&#x0439;r&#x0439;st. Be&#x0431;ll&#x043d;thatod a f&#x0431;zisok sz&#x0431;m&#x0431;t &#x0439;s lenyomhatod a sz&#x0443;k&#x0446;z billenty&#x044b;t annyiszor, ah&#x0431;ny f&#x0431;zis be van &#x0431;ll&#x043d;tva.</li>
 <li><b>Billenty&#x044b;zeti bevitel</b> - Ha szeretn&#x0439;l m&#x0431;s, nem az id&#x0445;m&#x0439;r&#x0445;vel m&#x0439;rt eredm&#x0439;nyt bevinni, beviheted ezt a billenty&#x044b;zeteddel..</li>
 <li><b>OK/+2/DNF</b> - Ha ez a funkci&#x0443; el&#x0439;rhet&#x0445;re van &#x0431;ll&#x043d;tva, fel fog ugrani egy p&#x0431;rbesz&#x0439;dablak a m&#x0439;r&#x0439;s ut&#x0431;n. Be tudod &#x0431;ll&#x043d;tani a m&#x0439;r&#x0439;s v&#x0439;g&#x0439;n, hogy az rendben volt (OK), szab&#x0431;lytalan volt (+2 mp), vagy nem megoldottnak min&#x0445;s&#x043d;ted (DNF). Az eredm&#x0439;nyben szerepelhet a vizsg&#x0431;lati id&#x0445; is.</li>
 <li><b>Pontoss&#x0431;g</b> - Az id&#x0445;m&#x0439;r&#x0445; pontoss&#x0431;ga lehet 3, vagy 2 tizedes jegy&#x044b;. (pl.: 9.062 / 9.06) </li>
 <li><b>Id&#x0445; form&#x0431;tum</b> - Az id&#x0445; form&#x0431;tumot be&#x0431;ll&#x043d;thatod 'percre' vagy '&#x0443;r&#x0431;ra', mint: hh:mm:ss.XX(X) vagy mm:ss.XX(X)".</li>
 <li><b>Bet&#x044b;m&#x0439;ret</b> - A k&#x044c;l&#x0446;mb&#x0446;z&#x0445; monitorok m&#x0439;retei miatt be&#x0431;ll&#x043d;thatod az id&#x0445;m&#x0439;r&#x0445; bet&#x044b;m&#x0439;ret&#x0439;t.</li>
 <li><b>Sz&#x043d;ns&#x0439;ma</b> - Sz&#x043d;ns&#x0439;m&#x0431;ink k&#x0446;z&#x044c;l szabadon v&#x0431;logathatsz..</li>
</ul>
<h3>Kever&#x0439;s</h3>
<ul>
 <li><b>WCA Hivatalos Kever&#x0445;</b> - A csTimer az &#x0446;sszes WCA hivatalos kever&#x0445;j&#x0439;t t&#x0431;mogatja, mint pl.: 2x2x2, 3x3x3, Pyraminx, Square-1, clock, 4x4x4, 5x5x5, 6x6x6, 7x7x7, Megaminx.</li>
 <li><b>CFOP Gyakorl&#x0431;s</b> - A CFOP met&#x0443;dushoz a csTimer speci&#x0431;lis kever&#x0439;seket t&#x0431;mogat.</li>
 <li><b>Roux Gyakorl&#x0431;s</b> - A Roux met&#x0443;dus gyakorl&#x0431;s&#x0431;hoz a csTimer speci&#x0431;lis kever&#x0439;seket t&#x0431;mogat.</li>
 <li><b>Nagyobb m&#x0439;ret&#x044b; kock&#x0431;khoz</b> - A nagyobb kock&#x0431;khoz a csTimer t&#x0431;mogatja a nagyobb kever&#x0439;seket: 4x4x4, 5x5x5, 6x6x6, 7x7x7 -es kever&#x0439;sek.</li>
 <li><b>3x3x3 BLD Gyakorl&#x0431;s</b> - A 3x3x3 BLD (vakon kirak&#x0431;shoz) speci&#x0431;lis kever&#x0439;seket t&#x0431;mogat az id&#x0445;m&#x0439;r&#x0445;: csak az &#x0439;lek vagy csak a sarkok vannak &#x0446;sszekeverve.</li>
</ul>
<h3>Statisztik&#x0431;k</h3>
<ul>
 <li><b>T&#x0446;bb id&#x0445;szak</b> - 5 id&#x0445;szak vehet&#x0445; fel az id&#x0445;m&#x0439;r&#x0445;vel. Minden statisztika id&#x0445;szak-orient&#x0431;lt.</li>
 <li><b>Id&#x0445;szak-&#x0431;tlag</b> - Az id&#x0445;szak-&#x0431;tlag azi d&#x0445;z&#x043d;t&#x0445; alatt tal&#x0431;lhat&#x0443;.</li>
 <li><b>5. eredm&#x0439;ny dinamika</b> - Az &#x0446;t&#x0446;dik eredm&#x0439;ny ut&#x0431;n l&#x0431;that&#x0443; az 5 eredm&#x0439;ny &#x0431;tlaga (average of 5: "ao5") &#x0439;s a sz&#x0446;vegre kattintva a r&#x0439;szleteket is meg lehet tudni.</li>
 <li><b>12. eredm&#x0439;ny dinamika</b> - A tizenkettedik eredm&#x0439;ny ut&#x0431;n l&#x0431;that&#x0443; az 12 eredm&#x0439;ny &#x0431;tlaga (average of 12: "ao12") &#x0439;s a sz&#x0446;vegre kattintva a r&#x0439;szleteket is meg lehet tudni.</li>
 <li><b>Statisztika r&#x0439;szletek</b> - A statisztik&#x0431;ra kattintva az adott id&#x0445;szak &#x0431;tlaga l&#x0431;that&#x0443;.</li>
 <li><b>Megjegyz&#x0439;s hozz&#x0431;ad&#x0431;sa</b> - Az ededm&#x0439;nyid&#x0445;re kattintva az id&#x0445;t be lehet &#x0431;ll&#x043d;tani OK-ra, hozz&#x0431; lehet adni 2 mp-et, be lehet &#x0431;ll&#x043d;tani DNF-re, illetve egy&#x0439;b megjegyz&#x0439;st lehet hozz&#x0431;adni.</li>
 <li><b>Eredm&#x0439;ny vagy id&#x0445;szak t&#x0446;rl&#x0439;se</b> - Az eredm&#x0439;nyre kattintva megjelenik a p&#x0431;rbesz&#x0439;dablak, ahol az X-re kattintva t&#x0446;r&#x0446;lhet&#x0445; az. Id&#x0445;szakot a fels&#x0445; X-re kattintva lehet t&#x0446;r&#x0446;lni.</li>
</ul>
<h3>Billenty&#x044b;zet parancsok</h3>
<ul>
 <table class="table" style="display: inline-block;">
  <tr><th>billenty&#x044b;</th><td>funkci&#x0443;</td></tr>
  <tr><th>Alt + 1</th><td>Square-1 t&#x043d;pus&#x044a; kock&#x0431;hoz val&#x0443; kever&#x0439;s.</td></tr>
  <tr><th>Alt + 2-t&#x0445;l 7-ig</th><td>2x2x2-t&#x0445;l 7x7x7-szeres kock&#x0431;khoz val&#x0443; kever&#x0439;s.</td></tr>
  <tr><th>Alt + p/m/c/s</th><td>Pyraminx, megaminx, clock &#x0439;s skewb kock&#x0431;khoz val&#x0443; kever&#x0439;s. </td></tr>
  <tr><th>Alt + i</th><td>Kever&#x0439;s bevitele.</td></tr>
  <tr><th>Alt + d</th><td>Az aktu&#x0431;lis id&#x0445;szak &#x0446;sszes eredm&#x0439;ny&#x0439;nek az elt&#x0431;vol&#x043d;t&#x0431;sa.</td></tr>
  <tr><th>Alt + z</th><td>Az utols&#x0445; eredm&#x0439;ny elt&#x0431;vol&#x043d;t&#x0431;sa.</td></tr>
  <tr><th>Alt + fel/le</th><td>Az el&#x0445;z&#x0445;/k&#x0446;vetkez&#x0445; id&#x0445;szakhoz l&#x0439;p&#x0439;s.</td></tr>
  <tr><th>Alt + balra/jobbra</th><td>Az utols&#x0443;/k&#x0446;vetkez&#x0445; kever&#x0439;s mutat&#x0431;sa.</td></tr>
  <tr><th>Ctrl + 1/2/3</th><td>Az utols&#x0443; eredm&#x0439;ny OK/+2 mp/DNF.</td></tr>
 </table>
 <table class="table" id="vrckey" style="display: inline-block;">
  <tr><th colspan=10>Kocka oldalainak beviteli gombjai</th></tr><tr>
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
<h2>Linkek</h2>
<ul>
<li><a class="click" href="/">csTimer blog</a></li>
<li><a class="click" href="http://cubingchina.com/">Cubing China, a k&#x043d;nai gyorskock&#x0431;z&#x0443;k hivatalos weboldala</a></li>
<li><a class="click" href="/old2/">csTimer 2012.03.15-&#x0446;s verzi&#x0443;ja (csak k&#x043d;nai nyelven el&#x0439;rhet&#x0445;)</a></li>
<li><a class="click" href="/old/">csTimer 2012.02.29-es verzi&#x0443;ja (csak k&#x043d;nai nyelven el&#x0439;rhet&#x0445;)</a></li>
</ul>