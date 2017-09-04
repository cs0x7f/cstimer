<h1>csTimer versi&#243;n 12/12/2015 - Cron&#243;metro profesional de speedcubing y entrenamiento</h1>
<?php include('lang.php') ?>
<p>csTimer est&#225; dise&#241;ado para speedcubers. Soporta mezclas de numerosos tipos de puzzles, incluyendo <b>todos los puzzles oficializados por la WCA</b>; integra un <b>solucionador de Xcross y EOline</b>; soporta estad&#237;sticas, <b>distintas fases en los tiempos (multi-fase)</b> y varias funciones que tambi&#233;n incluyen software similar como los 15 segundos de inspecci&#243;n que permite la WCA, etc.</p>
<p>Este cron&#243;metro funciona con la mayor&#237;a de navegadores, como Chrome (recomendado), Firefox, Opera o versiones superiores a IE7. Tami&#233;n funciona en iPad, iPhone y la mayor parte de dispositivos Android. </p>
<p> --- Programado por: <a class="click" href="mailto:cs0x7f@gmail.com">Shuang Chen (cs0x7f@gmail.com)</a><br>
 --- Interfaz dise&#241;ada por: <a class="click" href="mailto:liebe7@126.com">Yue Zhang (liebe7@126.com)</a><br></p>
<h2>Introducci&#243;n</h2>
<ul>
<li><b>Cron&#243;metro</b> - Soporta la inspecci&#243;n de la WCA, tiempos multi-fase, introducci&#243;n de tiempos manualmente, confirmaci&#243;n de tiempos (OK/+2/DNF). La precisi&#243;n es de mil&#233;simas de segundo.</li>
<li><b>Mezclas</b> - Soporta las mezclas de todos los puzzles de la WCA, al igual que un alto n&#250;mero de mezclas de puzzles no oficiales y de entrenamientos, como s&#243;lo deshacer aristas o esquinas, o la &#250;ltima capa.</li>
<li><b>Estad&#237;sticas</b> - Muestra el average de 5/12 din&#225;micamente. Exporta las estad&#237;sticas de la sesi&#243;n, incluyendo el mejor average de 5/12.</li>
<li><b>Herramientas</b> - Soporta la resoluci&#243;n de la cruz en varias caras, Xcross (cruz extendida)y EOLine, adem&#225;s de imagen de la mezcla para cubos NxNxN.</li>
</ul>
<h2>Detalles</h2>
csTimer has sido testeado en Firefox, Chrome y Safari. Tambi&#233;n funciona muy bien en iPad (testeado por oyyq).
<h3>Cron&#243;metro</h3>
<ul>
 <li><b>Tradicional</b> - Pulse la barra espaciadora hasta que el color del cron&#243;metro se torne verde. El tiempo empezar&#225; a contar cuando suelte la tecla y guardar&#225; el tiempo obtenido cuando vuelva a presionar la tecla.</li>
 <li><b>Tiempo de presi&#243;n</b> - Al igual que un stack, csTiemr soporta el tiempo de presi&#243;n antes de empezar el tiempo. Mantenga pulsada la barra espaciadora durante un tiempo antes de soltarla. </li>
 <li><b>Inspecci&#243;n de la WCA</b> - csTimer soporta el tiempo de inspecci&#243;n descrito en el reglamento de la WCA. Si se activa, el cron&#243;metro comenzar&#225; la inspecci&#243;n cuando se inicie.</li>
 <li><b>Tiempos multi-fase</b> - csTimer soporta los tiempos multi-fase. Puedes establecer el n&#250;mero de fases, y pulsar varias veces la barra espaciadora para delimitarlas.</li>
 <li><b>Introducci&#243;n con teclado</b> - Si quiere usar otro cron&#243;metro, como un stack, puede introducir los tiempos manualmente</li>
 <li><b>OK/+2/DNF</b> - Si se activa esta funci&#243;n, aparecer&#225; un mensaje de confirmaci&#243;n. Podr&#225; seleccionar si la resoluci&#243;n es correcta, con +2 o DNF. El valor por defecto puede variar dependiendo del tiempo de inspecci&#243;n.</li>
 <li><b>Precisi&#243;n</b> - La precisi&#243;n del cron&#243;metro de una mil&#233;sima (0.001), pero puede mostrarse como 0.01s. </li>
 <li><b>Formato de tiempos</b> - Puede establecer el formato de los tiempos para activar o desactivar los minutos u horas, mostr&#225;ndose como: "hh:mm:ss.XX(X)" o "mm:ss.XX(X)".</li>
 <li><b>Frecuencia del cron&#243;metro</b> - A su elecci&#243;n, el cron&#243;metro puede no mostrarse, con la frecuencia en segundos o en tiempo real.</li>
 <li><b>Tama&#241;o del cron&#243;metro</b> - Para adaptarse a monitores de distintos tama&#241;os, puede establecer el tama&#241;o del cron&#243;metro.</li>
 <li><b>Color de la interfaz</b> - Hay muchos estilos de colores. Elija el que quiera.</li>
</ul>
<h3>Mezcla</h3>
<ul>
 <li><b>Mezclador Oficial de la WCA</b> - csTimer soporta todos los puzzles del mezclador oficial de la WCA, como: mezclador  de estado aleatorio de 2x2x2, 3x3x3, pyraminx, square-1 o clock. Tambi&#233;n, mezlcador de movimientos aleatorios de 4x4x4, 5x5x5, 6x6x6, 7x7x7, megaminx.</li>
 <li><b>Entrenamiento de CFOP</b> - Para el m&#233;todo CFOP, csTimer soporta mezlas especiales, como: mezclador de la &#250;ltima capa, &#250;ltima capa y &#250;ltimo hueco, &#250;ltima capa y cuatro huecos.</li>
 <li><b>otros m&#233;todos de 3x3x3</b> - Para mejorar CFOP, csTimer soporta mezcals especiales como: ZBLL, aristas o esquinas de la &#250;ltima capa o mezclas de solo R, U y L.</li>
 <li><b>Entrenamiento de Roux</b> - Para el m&#233;todo roux, csTimer soporta mezclas especiales como: &#250;ltimas seis aristas o l10p.</li>
 <li><b>Entrenamiento de cubos grandes</b> - Para cubos grandes, csTimer soporta mezclas para aristas de 4x4x4, 5x5x5, 6x6x6 y 7x7x7.</li>
 <li><b>Entrenamiento de 3x3x3 a ciegas</b> - Para 3x3x3 a ciegas, csTimer soporta mezlcas para aristas o esquinas.</li>
 <li><b>Otros puzzles</b> - csTimer tambi&#233;n soporta un gran n&#250;mero de puzzles no oficiales.</li>
</ul>
<h3>Estad&#237;sticas</h3>
<ul>
 <li><b>Multisesi&#243;n</b> - Hay cinco sesiones de tiempos. Todas las estad&#237;sticas se centran en una &#250;nica sesi&#243;n.</li>
 <li><b>Media de la sesi&#243;n</b> - Puede encontrar la media de la sesi&#243;n al final de la tabla de tiempos.</li>
<li><b>Ao5 din&#225;mico</b> - Despu&#233;s de cinco tiemps, puede ver en el average de 5 de esos tiempos en la columna de ao5 y tener m&#225;s detalles haciendo click en la celda.</li>
 <li><b>Ao12 din&#225;mico</b> - Despu&#233;s de doce tiemps, puede ver en el average de 12 de esos tiempos en la columna de ao12 y tener m&#225;s detalles haciendo click en la celda.</li>
 <li><b>Detalles de las estad&#237;sticas</b> - Haga click en la celda que contiene la media de la sesi&#243;n y obtendr&#225; los detalles de dicha sesi&#243;n.</li>
 <li><b>A&#241;adir comentarios</b> - Haga click en la celda que coneitene el tiempo de una resoluci&#243;n y podr&#225; establecer el tiempo como correcto, con +2 o DNF, o bien a&#241;adir comentarios.</li>
 <li><b>Eliminar tiempo/sesi&#243;n</b> - Si hace click en el tiempo, puede eliminarlo pulsando en el bot&#243;n X de la ventana que aparece. O pulse en el bot&#243;n "X" encima de la lista de tiempos para eliminar todos los tiempos de la sesi&#243;n.</li>
</ul>
<h3>Atajos de teclado</h3>
<ul>
 <table class="table" style="display: inline-block;">
  <tr><th>Tecla</th><td>Funci&#243;n</td></tr>
  <tr><th>Alt + 1</th><td>Cambia a mezcla de Square-1.</td></tr>
  <tr><th>Alt + 2 ~ 7</th><td>Cambia mezcla a 2x2x2~7x7x7.</td></tr>
  <tr><th>Alt + p/m/c/s</th><td>Cambia mezcla a pyra/megaminx/clock/skewb.</td></tr>
  <tr><th>Alt + i</th><td>Cambia la mezcla a introducci&#243;n manual.</td></tr>
  <tr><th>Alt + d</th><td>Eliminar todos los tiempos de la sesi&#243;n actual.</td></tr>
  <tr><th>Alt + z</th><td>Eliminar el &#250;ltimo tiempo.</td></tr>
  <tr><th>Alt + up/down</th><td>Ir a la siguiente/anterior sesi&#243;n.</td></tr>
  <tr><th>Alt + left/right</th><td>Mostrar &#250;ltima/siguiente mezcla.</td></tr>
  <tr><th>Ctrl + 1/2/3</th><td>El &#250;ltimo tiempo es OK/+2/DNF</td></tr>
 </table>
 <table class="table" id="vrckey" style="display: inline-block;">
  <tr><th colspan=10>Virtual Cube Key Map</th></tr><tr>
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
<li><a class="click" href="/old2/">csTimer versi&#243;n del 15/3/2012 (s&#243;lo en chino)</a></li>
<li><a class="click" href="/old/">csTimer versi&#243;n del 29/2/2012 (s&#243;lo en chino)</a></li>
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
