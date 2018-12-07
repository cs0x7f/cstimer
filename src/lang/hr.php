<h1>csTimer  verzija 2018.12.07 - Profesionalna &#353;toperica za brzo slaganje Rubikove kocke</h1>
<?php include('lang.php') ?>
<p>csTimer je dizajniran za brzo slaganje Rubikove kocke. Podr&#382;ava scramble-ove raznih vrsta slagalica i <b>svih WCA slu&#382;benih disciplina</b>; Integrirani su <b>Xcross solver i eoline solver</b>; Podr&#382;ava statistiku vremena, <b>vi&#353;efazno &#353;topanje</b> i ostale funckije podr&#382;ane od strane ostalih sličnih softvera poput: 15s' inspekcije određenih od strane WCA, itd.</p>
<p>&#353;toperica radi vrlo dobro na ve&#263;ini preglednika, kao &#353;to su: Chrome(preporučljivo), Firefox, Opera, IE7+. Također radi na iPad-u, iPhone-u i na ve&#263;ini Android platformi. </p>
<p> --- Developer: <a class="click" href="mailto:cs0x7f@gmail.com">Shuang Chen (cs0x7f@gmail.com)</a><br>
 --- Korisničko sučelje dizajnirao: <a class="click" href="mailto:liebe7@126.com">Yue Zhang (liebe7@126.com)</a><br></p>
<h2>Uvod</h2>
<ul>
<li><b>&#353;toperica</b> - Podr&#353;ka WCA inspekcije, vi&#353;efaznog &#353;topanja, uno&#353;enja putem tipkovnice, potvrđivanje OK/+2/DNF. Preciznost je 0.001s.</li>
<li><b>Scramble</b> - Podr&#353;ka svih WCA scramble-ova. Veliki broj neslu&#382;benih i "trening" scramble-ova, kao &#353;to su: samo rubovi/korneri, zadnji sloj.</li>
<li><b>Statistika</b> - Dinamički prikaz prosjeka od 5/12. Izvoz statistike trenutne sesije, uključuju&#263;i najbolji prosjek od 5/12 itd.</li>
<li><b>Alati</b> - Podr&#353;ka slaganja vi&#353;estrukih kri&#382;eva, X-kri&#382;eva (produ&#382;eni kri&#382;), EOLine. Prikaz scramble-a za NxNxN kocke.</li>
</ul>
<h2>Detalji</h2>
csTimer je testiran na Firefox-u, Chrome-u i Safari-ju. Također, radi vrlo dobro na iPad-u (testirao oyyq).
<h3>&#353;toperica</h3>
<ul>
 <li><b>Tradicionalna</b> - Pritisnite tipku 'Space' dok se boja fonta ne promijeni u zelenu. &#353;topanje &#263;e se pokrenuti kada pustite tipku i vrijeme &#263;e se snimiti nakon &#353;to opet pritisnete tipku 'Space'.</li>
 <li><b>Vrijeme pritiska</b> - Kao i Stackmat &#353;toperica, csTimer podr&#382;ava vrijeme pritiska. Trebate zadr&#382;ati tipku 'Space' malo du&#382;e prije nego ju pustite. </li>
 <li><b>WCA inspekcija</b> - csTimer podr&#382;ava vrijeme inspekcije kao &#353;to je obja&#353;njeno u WCA Regulations. Ukoliko je omogu&#263;ena,  &#353;toperica &#263;e biti u stanju inspekcije prije nego je pokrenete.</li>
 <li><b>Vi&#353;efazno &#353;topanje</b> - &#353;toperica podr&#382;ava vi&#353;efazno &#353;topanje. Mo&#382;ete postaviti broj faza i mo&#382;ete pritisnuti tipku 'Space' vi&#353;e puta.</li>
 <li><b>Unos tipkovnicom</b> - Ukoliko &#382;elite koristiti eksternu &#353;topericu, kao &#353;to je Stackmat, mo&#382;ete unijeti vremena ručno.</li>
 <li><b>OK/+2/DNF</b> - Ukoliko je ova funkcija omogu&#263;ena, prikazat &#263;e Vam se okvir. Trebate odabrati je li slo&#382;eno stanje (zavr&#353;no stanje) OK, +2 ili DNF. Postavljena vrijednost mo&#382;e ovisiti o vremenu inspekcije.</li>
 <li><b>Preciznost</b> - Preciznost &#353;toperice je 0.001s ili 1 millisekunda and i mo&#382;e se prikazivati kao 0.01s. </li>
 <li><b>Format vremena</b> - Mo&#382;ete postaviti format vremena na 'minute' ili 'sate', kao &#353;to su: hh:mm:ss.XX(X) ili mm:ss.XX(X)".</li>
 <li><b>Prikaz vremena</b> - Prikaz vremena mo&#382;e biti postavljen na ni&#353;ta, sekunde ili real-time (u&#382;ivo).</li>
 <li><b>Veličina fonta</b> - Kako bi se prilagodili ekranima različitih veličina, mo&#382;ete postaviti veličinu fonta &#353;toperice.</li>
 <li><b>Stil boja</b> - Postoji mnogo stilova boja. Odaberite onaj koji Vam se sviđa.</li>
</ul>
<h3>Scramble</h3>
<ul>
 <li><b>WCA Slu&#382;beni Scrambler</b> - csTimer podr&#382;ava sve WCA slu&#382;bene scramble-ove, kao &#353;to su: scramble-ovi nasumičnog stanja za 2x2x2, 3x3x3, Pyraminx, Square-1, Clock. Nasumični scramble-ovi za 4x4x4, 5x5x5, 6x6x6, 7x7x7, Megaminx.</li>
 <li><b>CFOP trening</b> - Za CFOP metodu, specijalni scramble-ovi podr&#382;ani u csTimer-u su: scramble za zadnji sloj, zadnji sloj + jedan slot, zadnji sloj  + 4 slot-a.</li>
 <li><b>Ostale 3x3x3 metode</b> - Za napredak u CFOP-u, specijalni scramble-ovi podr&#382;ani u csTimer-u su: ZBLL, korneri/rubovi zadnjeg sloja, RUL generator.</li>
 <li><b>Roux trening</b> - Za Roux metodu, specijalni scramble-ovi podr&#382;ani u csTimer-u su: zadnjih 6 rubnih dijelova, l10p.</li>
 <li><b>Trening za 'velike' kocke</b> - Za velike kocke. specijalni scramble-ovi podr&#382;ani u csTimer-u su: scramble rubnih dijelova 4x4x4, 5x5x5, 6x6x6, 7x7x7.</li>
 <li><b>3x3x3 naslijepo trening</b> - Za 3x3x3 naslijepo, specijalni scramble-ovi podr&#382;ani u csTimer-u su: scramble-ani samo korneri/rubni dijelovi.</li>
 <li><b>Ostale puzzle</b> - csTimer also supports a huge number of puzzles which is not wca's puzzles.</li>
</ul>
<h3>Statistika</h3>
<ul>
 <li><b>Vi&#353;estruke sesije</b> - Postoji 5 sesija za bilje&#382;enje vremena. Sve statističke funkcije su orijentirane za pojedinačne sesije.</li>
 <li><b>Prosjek sesije</b> - Prosjek sesije mo&#382;ete prona&#263;i na dnu tablice s vremenima.</li>
 <li><b>Dinamični ao5</b> - Nakon vi&#353;e od 5 slaganja, mo&#382;ete pogledati svoj prosjek od 5 u 'ao5' stupcu i vidjeti detalje klikom na &#263;eliju.</li>
 <li><b>Dinamični ao12</b> - Nakon vi&#353;e od 12 slaganja,mo&#382;ete provjeriti svoj prosjek od 12 u 'ao12' i vidjeti detalje klikom na &#263;eliju.</li>
 <li><b>Statistički detalji</b> - Klikom na &#263;elije koje sadr&#382;e prosjek sesije, mo&#382;ete vidjeti detalje trenutne sesije.</li>
 <li><b>Dodaj komentare</b> - Klikom na &#263;eliju koja sadr&#382;i vrijeme slaganja, mo&#382;ete postaviti vrijeme na OK/+2/DNF ili ga komentirati.</li>
 <li><b>Obri&#353;i vrijeme/sesiju</b> - Klikom na indeks ispred vremena, mo&#382;ete obrisati vrijeme u tom redu ili klikom na 'X' gumb mo&#382;ete obrisati sva vremena u sesiji.</li>
</ul>
<h3>Prečaci tipkovnice</h3>
<ul>
 <table class="table" style="display: inline-block;">
  <tr><th>key</th><td>function</td></tr>
  <tr><th>Alt + 1</th><td>Scramble za Square-1.</td></tr>
  <tr><th>Alt + 2 ~ 7</th><td>Scramble za 2x2x2~7x7x7.</td></tr>
  <tr><th>Alt + p/m/c/s</th><td>Scramble za pyra/megaminx/clock/skewb.</td></tr>
  <tr><th>Alt + i</th><td>Scramble koji se unosi.</td></tr>
  <tr><th>Alt + d</th><td>Brisanje svih vremena u trenutnoj sesiji.</td></tr>
  <tr><th>Alt + z</th><td>Brisanje posljednjeg vremena.</td></tr>
  <tr><th>Alt + up/down</th><td>U slijede&#263;u/zadnju sesiju.</td></tr>
  <tr><th>Alt + left/rightt</th><td>Prika&#382;i zadnji/slijede&#263;i scramble.</td></tr>
  <tr><th>Ctrl + 1/2/3</th><td>Posljednje vrijeme je OK/+2/DNF</td></tr>
 </table>
 <table class="table" id="vrckey" style="display: inline-block;">
  <tr><th colspan=10>Virtual Cube Key Map</th></tr><tr>
   <td>1<br><br></td> <td>2<br><br></td> <td>3<br><span>&lt;</span></td> <td>4<br><span>&gt;</span></td> <td>5<br><span>M</span></td>
   <td>6<br><span>M</span></td> <td>7<br><span>&lt;</span></td> <td>8<br><span>&gt;</span></td> <td>9<br><br></td> <td>0<br><br></td>
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
<h2>Linkovi</h2>
<ul>
<li><a class="click" href="http://cubingchina.com/">Cubing China, slu&#382;bena kineska speedcubing web-stranica</a></li>
<li><a class="click" href="/old2/">csTimer verzija 2012.3.15 (samo zh-cn)</a></li>
<li><a class="click" href="/old/">csTimer verzija 2012.2.29 (samo zh-cn)</a></li>
<li><a class="click" href="/src/">csTimer s dekompresiranim datotekama</a></li>
<li><a class="click" href="https://github.com/cs0x7f/cstimer">izvorni kod csTimer-a</a></li>
</ul>
<h2>Color Schemes</h2>
  <?php include('color.php') ?>
<div class="donate" style="line-height:1.5em;">
<p>Hvala na interesu za podr&#382;avanje csTimer-a!</p>
<p>Donacije &#263;e se koristiti za podr&#353;ku programerima i za kupovinu opreme. /p>
<p>Mo&#382;ete donirati preko PayPal-a koriste&#263;i gumb ispod ili <a href="https://www.paypal.me/cs0x7f" class="click"> via PayPal.me</a>. </p>
<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
<input type="hidden" name="cmd" value="_s-xclick">
<input type="hidden" name="hosted_button_id" value="NW25HME3QUEZY">
<input type="image" src="data:image/gif;base64,R0lGODlhkAAvAPc/AHZ2dnWky/7ou//UkiosLf7iqwBXn87e7aempjir4v/25pO20/+xOM6qkepCOTBps+vr7C1stIODgyVCa9ft+O6dSfnXu8/Pzr60lYzN6+pXVr/W6f7en/+vNPODacU1PSGX1J6jmzN1ttSkVO+AM/jNtv+tL//JdUBedarL42lXXnJwa/TBjPWzhO7c1I92RP3l2kxjhuPi4yKh3GbC7mJhUf/tyv+6Tvzm5Z7C3v7fo3mJov7z8giU146Ui5kAAN7Jm7W8yH+Mi+7VpP+pJkW16lBZVMro9mG34r65oufw+chIUf7SjGvG8P+rKiV1u3+JhK6rlf/Gbf/Me97NoxGb2DBUc//CY5OTk/7Yk/Omd++nNyWExpunuFSu3QCH06PZ8u7csypyuF6+7PX8/Wd6l/+0Ps7Do6yNRPuxN7vi9v62RFBqelG15nCBhr+OPBA+at+dNJ9/QyN9wCtwtyiMzEBRV2B1gP7ZmI+csSJ7v3B/gv+6UQwOD56fjP6zPmB0fkBgef64ST9XfYBvSXBpTRA7Y/+/Wf/w0//z3C48cv+9Vv/gsP/67/7pwf/sz//9+f7mtf7ksP7gp+yRM+gzMcnJyWpqavb29fn5+vLx8dnZ2dLS0tXV1d3d3Rk3ZUNERUCBt2g5Xu7ZqyBsq2CWw/Lz98iBP6+FPsXL1Lm5ucHBwYs4UpyamY1nU+Xn7Y6NjP/nw/GtZrKxsYB3WvydIRBhor+YVO5mZUBVYOmmqe7Tm/FoOOaNj3BjY6uzwPKYWSBJb1xTRP/363CCi/bImc+UNeKXTP3w5v748vCmWc7Am2FlYcm8vP/lu1CMvVBeYPqmGsuPWN/q8924cpKMguvKqqWvva6wpPvfzMTIznBqUv/+/bLN5v+3SDBKWzJMdOrDne+yUNdnbTCGxtja4T92mpW93//CYCeFx97Stt7Qq++OVPCIQP/bnZ+HV+i8kPOrhvipkPK1nHKCnVW36Fe46ByJy+WnauHSxyUaBr+RRAAzZv+ZM////8wAACH5BAEAAD8ALAAAAACQAC8AAAj/AH8IHEiwoEGD/RIqXMiwocOHECNKnCjxoMWLGDNa7GeGSaxhkEKKHEmypMmTKFOqXElyWCwm3vppnEkTYz8+zhrp3Mmzp8+fQIMKHUq0qDM+Mmsqpdkvi4KnUKNKnUq1qtWrWLNqjeou6dKvB/sxSkS2rNmzaNOqXcu2rdu3aBl5BUu33wlEePPq3cu3r9+/gAMLHux3yly6S504ssG4sePHkCNLnky5suXLk00gBtsPnaPPoEOLHh2Cn2nTVrCNXs36c2k4oNXxg926tu3W6A5v1khEioDfwIMLH06MX7BAgYLNDjO8uXMBxfmF+J2EX6Dn2LNjl0Jkd81+HQ5F/xpPvrz584H4JSFvRf34dUnOnJ9fPr318UL4CSEfJsl6+gAGeB46HejmXVh/3MCEJAw26OCDD5o2SoPKnTGKffxYMaEP/LjB4Chw8HNGhKetIwkb/ETBoBunwRECg9YxeId+koAIx4QQ5thgFjf8YeCBBXEkyA14FGDkkUgmeeQyGRpJxYzBFMDiHRik50MBGPCDgpH5uZEkkyjMKEQByo1SwIxWROFHiFQUYAUcBVBh2pj5janknUfqwIcgZvwI5ED9rCGoIFlMYuihiCZqKIenmQYHBokCwg8UkwyhZaVwwDFEohzukWUwlgYzCRCzbTrJHvz4MAkK/EwiKT+ADP+RqamK1jpJFnwIuoaff/7AkRnAmiFFFjoUa+yxyEpqBQrMQgFEsVGwehoGxZqmAxSpIquDpH7ooByqbOjAISDGYguFDqwCAQeKKGC7h7bwFuvOCcECy+uf/TCg774MHDJFFhwELPDAAbeHAcEcZAmHH6Tys0vArO4ChxUIc9DeMhxgaxoUGU8qMIp+dMwqBii8yQ8QFROcxRTo8LvvvUD2Y0IHNNds8w0456zzDabtjDMt/NBywy38TJAzM/zkws8tPvPMD84jnMb0O/xAAzU/hohzA9BJ36A0P8w0vTMDNpdtAswH9uOECWy37fbbb7/Bjx1wmyAH1oQYMnfbhJj/ZkTdctPNthGmsb2F3jUUorccbN/NDyom1GBaHHVXXrcTaKftxOacd+6556jY8cLnmxNuR+iFcC63IXGQHvrom4deA+fGEM7PN6jQbocRm8thByGkBx985mkTYfzxyCev/PLMIy85Ic1HL/301CdPfNouZ6/99tzru882WG/R/fjkl1/+9Wmvscj67Lfv/vvwxw9N0SPEb//9+Odv/669MnXFCQAMoAAHSMACGvCACEygAhdIwCugD19TGIAEJ0jBClrwghjMoAY3yMEOUtAw/VtKP6TAiBKa8IQoTKEKV8jCFrrwhTAsoRQeGMJa9MMjj8ihDnfIwx768IdADKIQ/4cIxJf0oxYhRIwNKcLEJjrxiUxMohSnSMUqWvGKWMyiFrfIxS568YtgDKMYx0jGMoZREWhMoxrXuMaB+OONcIyjHOU4kHqMgQZjqEcREjADENSBC3oQAx0iMJALWOKQiEykIhF5gYE0Y5GQVGQzrsjGSlbSjXPM5BwHcscm4LENfPQjIJ8wyIGsQpOo9McqTJlKTa7SimgUxQcqQcsPiAKNKjgFJXZ5ChWgEZOtzCQnm0DMPIbyj3ogJSEFoopgzlEVA1FFJqZJzWpak5rQhCUraMlNWrLCFbsM5y5doQhgOjOOnKRBMUHZR2SS8gEDmcU54ziLeGLinvjMpz7xWf9PK4qim910AAnEKU4VDAQPaYgGIvxhC1uUwgD+CIUBDEAKf+Rgom/kZAIoAAY1qAEMYMhACnJwjg3QAZ4CQcA84YiAgSBAEzCNqUxnGtOWWvEDuNCABgDKC15Q4hjKEGcFpOHGBaCBCRcNgEQ3YAARbCAH/iDFRDfgD076Awz+OEIGyIAEf2xACf7ohj9Q+gOVgkICAFiBPyQAihJooQGwwAIo5soMf9i0rBCIQQx2AIFfxCAVqfhrKnawgy6UIQ8QuCsVl+CPV+BAF73QhQt0UQJ5hMMULrAGPIpRDBewwI0HsAU1JDoNih5goqUwBVP9YYAFVFUgM0AlN6bxRrL/tsIfc+0DAUBBAH+ww60ECC5ve9uKgbQCAp8owwQgMIgJlCEIn5hAHvQ6gQmUAwLFteI43sgDf5iCB694xRtlYAF8aOKNyCiHLDBpC3MYIBSlDYU/UiDVUjzDAAEwQCle+4MZ9KAKRZhBFb7wBVHqgQ4nHQgW/BHc3uqWGVqYRzxWAABQMJgAmsCCgmXwCXp84hqfiMEnupDcEMeguuWQgYat2AvvvhEHb3wFDJLRgGQgwxT+yEcy/FEBTD4UokwNQABSkF8RTHSiIuAvCHrgBQocwavnOMA53khbssJipW+ExUBgweHmxmAQOwCHiGWg170OYhCd0LIVl4ALBzhA/wM53akHfHqMY8hCFhVQhixOAUyK+mMBrT0yKe4bgA1IlL91uIcX4kiGOZJVAnJshTCqsYIV6EMYNYAjDIAhgYFIwBOgDrUntPGLX4ha1J32J0C5KVCChtOgAsEyHAfChXTYOh3kEIEYRMDrB4jgAY8+JzJaQAISpPoHEtiEspfN7GYv+9hUVMQ2V/1NV1OCnOZc6UDmwO05JFMMEYgAsMdNVgAE0wJaKHaxATAQAHTi3fCOt7zhzW5YKkKW3LQlLnXJS1+WM9ayriodfvCEghtckIMkd7k1mQwLtKAd6lZ3vX8AAE5Y/OIYz/jFJx5tS3r8lwCX9Q8GLoaSlxzB4UFWOFnV+sZkZKMELQBGxGdOghUMZAUXyLnOd85zndvc3h+3ZLbnOZBwGz3lKi/3JZbO9KY7nekT98XTp+50X9AlIAA7" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
</form>
<p>Također, mo&#382;ete donirati preko AliPay-a na slijede&#263;i račun: <br>cs0x7f@gmail.com</p>
<p><img style="display:inline-block; width:10em; height:10em;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABsCAIAAAAABMCaAAABoklEQVR42u3aUY6DMAwFQO5/6e0JViq1XwjO5LOqIAxSHJ5z/RnlcSGACHEk4hUY/974i/9/83vlXl3PBREixPmIpYX25oNVrl95GV3PBREixLMQ05OuXD9RoG5fByJEiBCfnDREiBAhDkashAulTTJEiBAhbhJAJIKM41IciBAhLkOMNHQ2+P313T6IECEuQ9z60FBTcYjMDSJEiCMRKx//K4tMYvNcOkwAESLEoxBXNukTwW1XKAsRIsRzEZ9CqUAkClQpxYEIEeIYxApo1+b2qeK2xRcLRIgQH0dMLPaVSVeg080piBAhzkdMB59dQWn6BTxWnSFChLgtYrqAlCYdPmwVCWUhQoQ4HjFRZBIHCBIbeIgQIUJs/WhPLPDhxhlEiBDPQkyPdIFKo99OtiFChPhqxHRzZ+Xho3SwAhEixLMQ0wt/2wOEN+dtoSxEiBDHIO7QhFrZtLr94iFChAgx1AzqKmgrwwiIECFC7ERMh69dG2yIECFCXBFAVIpAegP/mhQHIkSIUcSVjar0hjkeJEOECHEkovFjIUUAEeKU8QE0apeVMce/LwAAAABJRU5ErkJggg=="></p>
<p>Va&#353;a podr&#353;ka je veoma cijenjena!</p>
</div>