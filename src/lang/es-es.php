<h1>csTimer versión <?php echo $version;?> - Cronómetro profesional para Speedcubing.</h1>
<?php include('lang.php') ?>
<h2>Introducción</h2>
<p>csTimer es un programa de temporización profesionalmente diseñado para Speedcubers y aficionados del Cubo de Rubik. csTimer ofrece:</p>
<ul>
<li>Variedad de algoritmos para mezclar distintos tipos de puzzles, incluyendo <strong>todos los eventos oficiales de la WCA</strong>, amplia variedad de twisty puzzles, <strong>mezclas para entrenar</strong> pasos específicos de las resoluciones (como <strong>F2L, OLL, PLL, ZBLL</strong>, además de tener la capacidad de filtrar casos), etc</li>
<li>Plenitud de estadísticas, permite <strong>cronometrar por fases</strong>; tener <strong>cualquier cantidad de sesiones</strong>, además de poder fusionarlas o separarlas, etc.</li>
<li>Variedad de guías para resolver pasos como <strong>La cruz, X-cross, Primera cara del 2x2x2 o del Skewb, Cubeshape del SQ-1, etc</strong>, para aprenderlos o entrenarlos.</li>
<li>Otras herramientas auxiliares, como imagen de la mezcla, alerta de inspección (Con voz) a los 8 y a los 12 segundos, metrónomo, generador de múltiples mezclas, etc.</li>
<li>Copias de seguridad. Para evitar la pérdida de datos, puedes guardar tus tiempos en archivos locales, el servidor de csTimer, o en almacenamiento de Google.</li>
</ul>
<p>csTimer puede usarse en la mayoría de navegadores modernos, en celular, tablet y PC, en todos estos puedes añador csTimer a tu pantalla principal y funcionará como una aplicación nativa.</p>
<p>csTimer usa el caché del navegador, lo cual consume bando de ancha solo cuando lo abres por primera vez, así que, después de eso, csTimer puede funcionar sin conexión a internet (excepto para funciones como copias de seguridad).</p>
<h3>Copyright (Derechos de Autor)</h3>
<p>csTimer es un software de código abierto (Open Source) que sigue GPLv3. Si tienes sugerencias o comentarios respecto a csTimer, por favor coméntanos <a class="click" href="https://github.com/cs0x7f/cstimer/issues" title="">aquí</a></p>
<p>Escrito por: <a href="mailto:cs0x7f@gmail.com">Shuang Chen (cs0x7f@gmail.com)</a></p>
<p>Interfaz diseñada por: <a href="mailto:liebe7@126.com">Yue Zhang (liebe7@126.com)</a></p>
<h2>Funciones básicas:</h2>
<ul>
<li><strong>Cómo empezar el tiempo</strong> - Mantén presionada la barra espaciadora (También sirven los Ctrl derecho e izquierdo, o presionar la pantalla en dispositivos táctiles), y espera a que el contador se ponga verde. Este empezará a correr una vez se suelte la barra espaciadora, al acabar la resolución, presiona cualquier tecla, el tiempo parará y quedará registrado.</li>
<li><strong>Descripción de la interfaz</strong> - Hay seis botones cerca al logo de csTimer: Opciones, Exportar, Mezclas, Lista de tiempos, Donar y Herramientas. Haz click en <strong>Mezclas</strong>, <strong>Lista de tiempos</strong>, <strong>Herramientas</strong> para abrir el panel de función correspondiente.</li>
<li><strong>Pánel de mezclas</strong> - En el Pánel de mezclas, puedes seleccionar el tipo de mezcla, su longitud y filtro de casos (Solo disponible para ciertos tipos de mezclas), también puedes revisar la última mezcla y generar una siguiente.</li>
<li><strong>Pánel de Lista de tiempos</strong> - En el pánel de Lista de tiempos, puedes abrir el gestor de sesiones haciendo click en "Sesión", puedes seleccionar, añadir, vaciar o eliminar sesiones usando el selector y el botón junto a este, además, puedes ver el single y el promedio actual, y la lista de tiempos completa.</li>
<li><strong>Pánel de herramientas</strong> - En el pánel de herramientas puedes seleccionar funciones auxiliares específicas, incluyendo imagen de mezcla, generadores de mezclas, guías, otros tipos de estadísticas, etc.</li>
</ul>
<h2>Atajos de teclado</h2>
<table class="table" style="display: inline-block;">
<tr><th>Key</th><td>Function</td></tr>
<tr><th>Alt + 1</th><td>Tipo de mezcla para square-1</td></tr>
<tr><th>Alt + 2 ~ 7</th><td>Tipo de mezcla para 2x2x2~7x7x7</td></tr>
<tr><th>Alt + p/m/c/s</th><td>Scramble type to pyra/megaminx/clock/skewb</td></tr>
<tr><th>Alt + i</th><td>Scramble type to input</td></tr>
<tr><th>Alt + d</th><td>Eliminar todas las resoluciones en la sesión actual</td></tr>
<tr><th>Ctrl/Alt + z</th><td>Eliminar la última resolución</td></tr>
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
<tr><th>Left</th><td>Última mezcla</td></tr>
<tr><th>Right</th><td>Next scramble</td></tr>
<tr><th>Down left</th><td>Add comment to the latest solve</td></tr>
<tr><th>Down</th><td>Remove the latest solve</td></tr>
<tr><th>Down right</th><td>Check the latest solve</td></tr>
</table>

<table class="table" id="vrckey" style="display: inline-block;">
<tr><th colspan=10>Mapa de teclas para Cubo virtual</th></tr>
</table>

<h2>Detalles de las opciones.</h2>
<ul>
<li><strong data="opt_ahide">Ocultar todos los elementos cuando se cronometra</strong>. Ocultar el logo y todos los páneles cuando se cronometra.</li>
<li><strong data="opt_useMilli">Usar milisegundos</strong>. Mostrar el dígito de los milisegundos (No importa si se muestra o no, la precisión interna de csTimer es de un milisegundo).</li>
<li><strong data="opt_timeFormat">Formato de tiempos</strong>. Formato del tiempo para mostrar.</li>
<li><strong data="opt_atexpa">Auto Exportación (por 100 soluciones)</strong>. Si se activa, csTimer exportará los tiempos automáticamente una vez cada 100 resoluciones al lugar especificado, archivo local, servidor de csTimer o almacenamiento de Google.</li>
<li><strong data="opt_expp">Importar datos no actualizados</strong>. Si has exportado múltiples copias de seguridad, puedes importar de una de las 10 copias más recientes. En caso de que accidentalmente exportes una copia vacía, esta opción te ayudará a recuperar tus tiempos.</li>
<li><strong data="opt_useLogo">Mensajes de sugerencias en el logo</strong>. El logo de csTimer sirve como una pantalla para mostrar información de interés, tal como romper récords personales.</li>
<li><strong data="opt_showAvg">Mostrar la información de avg</strong>. Dos líneas de información son mostradas bajo el cronómetro principal, los promedios de 5 y 12 actuales, por defecto, aunque pueden modificarse estos valores.</li>
<li><strong data="opt_zoom">Distancia de visión</strong>. Puedes ajustar los tamaños de todos los elementos con esta opción.</li>
<li><strong data="opt_font">Selecciona la fuente del cronómetro</strong>. Fuente del cronómetro principal.</li>
<li><strong data="opt_uidesign">El diseño de interfaz de usuario es</strong>. Puedes cambiar el diseño de la interfaz por uno más material, u ocultar las sombras con esta opción.</li>
<li><strong data="opt_view">Estilo de la interfaz del usuario</strong>. Cambiar entre modo de Computador o modo de Móviles.</li>
<li><strong data="opt_wndScr">Estilo de la visualización del panel del scramble</strong>. Hacer que el pánel de mezcla se incruste en el fondo.</li>
<li><strong data="opt_wndStat">Estilo de visualización del panel de las estadísticas</strong>. Hacer que el pánel de la lista de tiempos se junte con el fondo</li>
<li><strong data="opt_wndTool">Estilo de la visualización del panel de las herramientas</strong>. Hacer que el pánel de herramientas se junte con el fondo.</li>
<li><strong data="opt_bgImgO">Opacidad de la imagen de fondo</strong>. Opacidad de la imagen del fondo.</li>
<li><strong data="opt_bgImgS">Imagen de fondo</strong>. Puedes seleccionar tu propia imagen como fondo de pantalla, sin embargo, solo las URL en formato HTTPS están disponibles debido a la restricción de seguridad del navegador.</li>
<li><strong data="opt_timerSize">Tamaño del cronómetro</strong>. Establece el tamaño del cronómetro principal</li>
<li><strong data="opt_smallADP">Usar fuente pequeña después del punto decimal</strong>. Utilizar un tamaño de fuente más pequeño para los números después del punto decimal</li>
<li><strong data="opt_color">Selecciona el color</strong>. Select color schemes of csTimer. Click csTimer's logo to show more color schemes.</li>
<li><strong data="opt_useMouse">Usar cronómetro del ratón</strong>. Usar el ratón para iniciar el cronómetro, el inicio con el teclado seguirá disponible</li>
<li><strong data="opt_useIns">Usar inspección de WCA</strong>. Habilitar el procedimiento de inspección de la WCA, que es una cuenta regresiva de 15 segundos, la penalización automática de +2/DNF también será habilitada para cuando inspecciones durante más de 15 segundos</li>
<li><strong data="opt_voiceIns">voz de alerta en la inspección de la WCA</strong>. Alerta a los 8/12 segundos de inspección simulando la alerta del juez en las competiciones de la WCA</li>
<li><strong data="opt_voiceVol">Volumen de voz</strong>. Nivel de sonido de la alerta anterior</li>
<li><strong data="opt_input">Introducir tiempos con</strong>. csTimer permite agregar soluciones de diversas maneras, soporta subida manual, grabación automática desde un cronómetro Stackmat, conexión a un cubo inteligente vía bluetooth o juegue al cubo de Rubik virtual, además del cronometrado vía teclado</li>
<li><strong data="opt_intUN">Unidad al introducir un entero</strong>. Cuando ingresa un número entero XXX en el cuadro de entrada, ¿Qué significa, segundo XXX, centésima de segundo XXX, o milésima de segundo XXX?</li>
<li><strong data="opt_timeU">Frecuencia del cronómetro</strong>. Como se actualiza el cronómetro durante el cronometrado</li>
<li><strong data="opt_preTime">Tiempo manteniendo la barra espaciadora (en segundo(s))</strong>. Cuánto tiempo debe mantenerse pulsada la barra espaciadora antes de que el temporizador inicie</li>
<li><strong data="opt_phases">Multi-fase</strong>. Número de fases, presione cualquier tecla para marcar una división durante el cronometrado</li>
<li><strong data="opt_stkHead">Usar información de estado de Stackmat</strong>. El cronómetro Stackmat reportará su estado, por ej.: Qué área, ya sea derecha o izquierda es presionada, luego csTimer será capaz de utilizar esa información, de todas formas, un error de datos puede ocurrir y causar una situación inesperada</li>
<li><strong data="opt_scrSize">Tamaño de la mezcla</strong>. Tamaño del texto de la mezcla</li>
<li><strong data="opt_scrASize">Tamaño de la mezcla automático</strong>. El tamaño del texto de la mezcla será ajustado automáticamente según el largo de la misma, que funciona con la opción previa</li>
<li><strong data="opt_scrMono">Mezcla monoespaciada</strong>. Usar fuente monoespaciada para el texto de la mezcla</li>
<li><strong data="opt_scrLim">Limitar la altura de la zona de mezcla</strong>. Cuando el área del scramble es demasiado alta, se producirá una barra de desplazamiento para evitar el aumento del panel de mezcla.</li>
<li><strong data="opt_scrAlign">Alineación del área de scramble</strong>. La alineación de la zona entera de la mezcla, incluye selector de tipo de mezcla.</li>
<li><strong data="opt_preScr">pre-scramble</strong>. Movimientos previos a la mezcla, que se usan con el cubo de Rubik virtual e imagen de mezcla</li>
<li><strong data="opt_scrNeut">Color neutral</strong>. If turned on, the position/first-layer color of some training scrambles will be random.</li>
<li><strong data="opt_scrEqPr">Probabilities for training-scramble states</strong>. For training scrambles, the probability of each case can be set to: follow the probability of the actual solving process; or let all cases appear with equal probability; or let all cases appear randomly in sequence (that is, to ensure that all N cases appear at least once in the next 2 N scrambles).</li>
<li><strong data="opt_scrFast">Usar scramble rápido para 4x4x4 (no oficial)</strong>. La mezcla 4x4x4 oficial de la WCA requiere una alta cantidad de recursos de cálculo, selecciona esta opción para utilizar una mezcla basada en movimientos al azar para el 4x4x4</li>
<li><strong data="opt_scrKeyM">Movimiento(s) clave de la etiqueta en el scramble</strong>. Marque un movimiento clave en la mezcla, por ej.: el movimiento que quita el estado de forma cuadrada en las mezclas de SQ1</li>
<li><strong data="opt_scrClk">Acción al hacer clic en mezcla</strong>. Comportamiento al hacer clic en el texto de la mezcla, copiar la mezcla o generar la siguiente mezcla.</li>
<li><strong data="opt_trim">Cantidad de soluciones recortadas a cada lado</strong>. Eliminar la primera y última solución cuando se calcula el promedio de soluciones</li>
<li><strong data="opt_statsum">mostrar resumen antes de la lista de tiempos</strong>. Mostrar la tabla de estadísticas antes de la lista de tiempo.</li>
<li><strong data="opt_statthres">Show target time for session best</strong>. In the statistics table, the time required to refresh personal best after next solve is displayed. "N/A" means the next solve will not refresh PB no matter how fast it is, "&#8734;" means any time except DNF will refresh PB.</li>
<li><strong data="opt_printScr">Publicar mezcla(s) en las estadísticas.</strong>. Mostrar la mezcla en el cuadro de estadísticas redondo</li>
<li><strong data="opt_printDate">imprimir fecha de resolución en estadísticas</strong>. Mostrar la fecha de la solución en el cuadro de estadísticas</li>
<li><strong data="opt_imrename">renombrar sesión inmediatamente después de la creación</strong>. Renombrar inmediatamente una sesión después de crearla.</li>
<li><strong data="opt_scr2ss">crear una nueva sesión al cambiar el tipo de scramble</strong>. Al cambiar el tipo de scramble, se creará una nueva sesión.</li>
<li><strong data="opt_statinv">Lista de tiempo inversa</strong>. Invierte la lista de tiempos, por lo tanto, las últimas soluciones estarán al final de la lista de tiempo.</li>
<li><strong data="opt_statclr">Habilitar vaciado de sesión</strong>. Cuando está desactivado, un botón '+' (para crear una sesión) reemplazará el botón 'X' del selector de sesiones, Por lo tanto, al hacer clic se creará una nueva sesión vacía en lugar de borrar toda la sesión.</li>
<li><strong data="opt_absidx">Mostrar índice absoluto en el informe de estadísticas</strong>. Mostrar índice absoluto en la sesión en lugar de 1 a número de soluciones (por ejemplo, 1/2/3 para mo3) en estadísticas redondeadas.</li>
<li><strong data="opt_rsfor1s">Mostrar estadística al hacer clic en resolver número</strong>. Cuando haga clic en la primera fila de la lista de tiempos, muestre una estadística redondeada para una sola solución.</li>
<li><strong data="opt_statal">Indicadores estáticos</strong>. Indicador estático para la tabla de estadísticas, al personalizar, aoX y moX están disponibles.</li>
<li><strong data="opt_delmul">Habilitar eliminación múltiple</strong>. la posibilidad de eluminiar múltiples soluciones comienza desde una solución, para evitar malentendidos, la solución seleccionada será la más antigua a eliminar.</li>
<li><strong data="opt_disPrec">Precisión de la distribución de tiempos</strong>. Intervalo de tiempo para la herramienta de distribución de tiempo.</li>
<li><strong data="opt_solSpl">Mostrar la solución progresivamente</strong>. Si se selecciona, solo se muestra la longitud de la solución de la solución, y usted puede ver la solución paso a paso, de lo contrario, toda la solución se muestra.</li>
<li><strong data="opt_imgSize">Tamaño de la imagen de la mezcla</strong>. Establecer el tamaño de la imagen de la mezcla.</li>
<li><strong data="opt_NTools">Número de herramientas</strong>. csTimer puede mostrar hasta 4 herramientas simultáneamente</li>
<li><strong data="opt_useKSC">Usar atajos de teclado</strong>. Use keyboard shortcut to switch scramble type, generate next scramble, switch between sessions. Click csTimer's logo to show details.</li>
<li><strong data="opt_useGES">use gesture control</strong>. Use gestures (swiping in different directions) to switch OK/+2/DNF, add comments, generate next scramble, etc. Also available on non-touch screen devices when mouse timer is enabled. Click csTimer's logo to show details.</li>
<li><strong data="opt_vrcSpeed">Velocidad base VRC (Giros por segundo)</strong>. Velocidad básica de giro del cubo virtual de Rubik, el giro se acelerará si hay múltiples movimientos para girar.</li>
<li><strong data="opt_vrcMP">Multi-fase</strong>. División multi-fase automática para cubo de Rubik virtual y Bluetooth.</li>
<li><strong data="opt_giiMode">Bluetooth Cube Mode</strong>. Usage mode of smart cube: In normal mode, you need to manually scramble the cube until it is consistent with the scrambled state; in training mode, after pressing the space (or touching the screen on the touch screen), the virtual cube will directly change to the scrambled state. You need to solve virtual cube partially (depends on scramble, e.g. permutation of last layer is not checked in oll training) instead of physical cube; In continuous training mode, in addition to training mode, once the virtual cube is solved, you will directly enter the next solve without pressing space. You can also press ESC (on a touch screen, hold the screen for 2 seconds) to exit the solve.</li>
<li><strong data="opt_giiVRC">Mostral cubo Giiker virtual</strong>. Mostrar un cubo de Rubik virtual en el cronómetro principal cuando se conecta a un cubo bluetooth.</li>
<li><strong data="opt_giiSD">Indicar el final del scramble por el tiempo de espera</strong>. Para un cubo bluetooth, csTimer no puede saber si un movimiento de mezcla o resolución.</li>
<li><strong data="opt_giiSK">Indicar fin del scramble con la barra espaciadora</strong>. Cuando se presiona la barra espaciadora, el cubo bluetooth se marcará como mezclado, cualquier movimiento después eso se tomará como el comienzo del cronómetro.</li>
<li><strong data="opt_giiSM">Indicar fin del scramble haciendo</strong>. Usa secuencias específicas de movimiento en el cubo bluetooth para marcar la mezcla.</li>
<li><strong data="opt_giiBS">Sonar cuando el cubo esté scrambleado</strong>. Suena cuando se activa alguna señal de finalización de mezcla.</li>
<li><strong data="opt_giiRST">Resetear el cubo Bluetooth cuando se conecte</strong>. Cuando se conecta a un cubo Bluetooth, csTimer detectará si está resuelto, si no, puede haber algunos problemas de hardware o el cubo está realmente sin resolver.</li>
<li><strong data="opt_giiAED">Detección de errores de hardware automática</strong>. Algunos cubos bluetooth perderán algunos movimientos debido a fallos de hardware, csTimer intentará detectar este caso.</li>
</ul>
<h2>Detalles de herramientas</h2>
<ul>
<li><strong data="tool_scrgen">Generador de mezcla</strong>. Usted puede generar hasta 999 mezclas con un solo clic con esta herramienta.</li>
<li><strong data="tool_cfm">Confirmar tiempo </strong>. Herramienta para ver las soluciones actuales con su comentario, mezcla, fecha de resolución y la reconstrucción si está disponible, que es también el diálogo cuando hace clic en una solución.</li>
<li><strong data="tool_hugestats">estadísticas de la sesión de cruz</strong>. Usted puede hacer estadísticas de sesiones cruzadas con esta herramienta.</li>
<li><strong data="tool_stats">Estadísticas</strong>. Tabla de estadística similar con la tabla en el panel de tiempos de la lista.</li>
<li><strong data="tool_distribution">Distribución de tiempos</strong>. La distribución del tiempo y el análisis de estabilidad, &lt;X Y/Z significa que hay soluciones Y totalmente inferiores a X segundos, y todas las últimas soluciones Z son menos de X segundos en la sesión.</li>
<li><strong data="tool_trend">Tendencia del tiempo</strong>. Muestra una curva de tendencia de todas las soluciones en la sesión actual.</li>
<li><strong data="tool_dlystat">Daily Statistics</strong>. Número de soluciones cada día/semana/mes/año.</li>
<li><strong data="tool_image">Imagen de la mezcla</strong>. Imagen de la mezcla para verificar una mezcla correcta, todas las mezclas de la WCA son soportadas.</li>
<li><strong data="tool_roux1">Solucionadores &gt; Resolver Roux S1</strong>. Resolver el primer paso de Roux, que resuelve un bloque de 1x2x3.</li>
<li><strong data="tool_eoline">Solucionadores &gt; Resolver EOLine</strong>. Solucionador de línea EO, que resuelve las orientaciones de los 12 bordes, y las posiciones de los bordes DF y DB.</li>
<li><strong data="tool_cross">Solucionadores &gt; Resolver cruz</strong>. Resolución de la cruz, que resuelve DF, DL, DR, DB bordes.</li>
<li><strong data="tool_222face">Solucionadores &gt; Cara 2x2x2</strong>. Resolución de cara 2x2x2, que resuelve una cara de cubo 2x2x2.</li>
<li><strong data="tool_333cf">Solucionadores &gt; Cross + F2L</strong>. Resolución de la cruz y F2L, que resuelve la cruz y 4 F2Ls con búsqueda informática, por lo que la solución podría estar lejos de soluciones humanas.</li>
<li><strong data="tool_333roux">Solucionadores &gt; Roux S1 + S2</strong>. Resolver primer y segundo paso de Roux que en primer lugar resuelve un bloque 1x2x3 en la cara izquierda y luego añade otro bloque 1x2x3 en la cara derecha con R, M, r, U.</li>
<li><strong data="tool_333petrus">Solucionadores &gt; 2x2x2 + 2x2x3</strong>. Resolver el primer y segundo paso de Petrus, que resuelve primero un bloque 2x2x2 a la izquierda y luego añádelo a un 2x2x3 a la izquierda.</li>
<li><strong data="tool_333zz">Solucionadores &gt; EOLine + ZZF2L</strong>. Resolución de Eoline y ZZF2L, que resuelve primero el EOLine y luego resuelve uno de la izquierda 1x2x3 o la derecha 1x2x3 y el resto de 2x2x3.</li>
<li><strong data="tool_sq1cs">Solucionadores &gt; SQ1 S1 + S2</strong>. Resolución de primer y segundo paso, que primero resuelve la forma de SQ1 y luego divide las piezas U y las piezas D.</li>
<li><strong data="tool_pyrv">Solucionadores &gt; Pyraminx V</strong>. Resolución del Pyraminx V, que resuelve tres esquinas y dos bordes para formar un patrón 'V' para Pyraminx.</li>
<li><strong data="tool_skbl1">Solucionadores &gt; Skewb Face</strong>. Resolución de la cara Skewb, que resuelve una capa de Skewb, más específicamente, 1 centro y 4 esquinas adyacentes.</li>
<li><strong data="tool_giikerutil">Cubo Giiker</strong>. Herramienta auxiliar para el cubo bluetooth, que es capaz de mostrar el estado actual, la potencia de la batería, la reconstrucción en tiempo real, etc.</li>
<li><strong data="tool_mtrnm">Metrónomo</strong>. Metronome, besides beeping at specific frequency, you make it beep at specific time after starting solve as well.</li>
<li><strong data="tool_syncseed">Mezclado común</strong>. Utilizar las mismas mezclas con amigos al establecer una semilla común.</li>
<li><strong data="tool_stackmatutil">stackmat</strong>. Herramienta auxiliar para Stackmat, que es capaz de ver el estado, potencia y nivel de ruido de la señal, etc.</li>
</ul>
<h2>Enlaces</h2>
<ul>
<li><a class="click" href="https://cubingchina.com/" title="">Cubing China </a></li>
<li><a class="click" href="/new/" title="">csTimer version beta</a></li>
<li><a class="click" href="/src/" title="">Versión beta de CsTimer sin archivos comprimidos</a></li>
<li><a class="click" href="https://github.com/cs0x7f/cstimer" title="">Código central de CsTimer</a></li>
<li><a class="click" href="/2019.12.24/" title="">csTimer version 2019.12.24</a></li>
<li><a class="click" href="/2018.11.05/" title="">csTimer version 2018.11.05</a></li>
<li><a class="click" href="/2015.12.12/" title="">csTimer version 2015.12.12</a></li>
<li><a class="click" href="/2012.03.15/" title="">csTimer version 2012.03.15</a></li>
<li><a class="click" href="/2012.02.29/" title="">csTimer version 2012.02.29</a></li>
</ul>
<h2>Modelos de colores</h2>
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
<p>¡Muchas gracias por apoyar a CsTimer! Tu donación será usada para apoyar nuestro desarrollo y mantenimiento en términos de costo.</p>
<p>Sí tú prefieres hacer tú donación por PayPal, por favor haga clic en el link o entre en <a class="click" href="https://www.paypal.me/cs0x7f" title="">PayPal.me</a>.</p>
<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
<input type="hidden" name="cmd" value="_s-xclick">
<input type="hidden" name="hosted_button_id" value="NW25HME3QUEZY">
<input type="image" src="data:image/gif;base64,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" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
</form>
<p>También puede apoyarnos usando Alipay escaneando el siguiente código o pagando a la siguiente cuenta: cs0x7f@gmail.com</p>
<p><img style="display:inline-block; width:10em; height:10em;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABsCAIAAAAABMCaAAABoklEQVR42u3aUY6DMAwFQO5/6e0JViq1XwjO5LOqIAxSHJ5z/RnlcSGACHEk4hUY/974i/9/83vlXl3PBREixPmIpYX25oNVrl95GV3PBREixLMQ05OuXD9RoG5fByJEiBCfnDREiBAhDkashAulTTJEiBAhbhJAJIKM41IciBAhLkOMNHQ2+P313T6IECEuQ9z60FBTcYjMDSJEiCMRKx//K4tMYvNcOkwAESLEoxBXNukTwW1XKAsRIsRzEZ9CqUAkClQpxYEIEeIYxApo1+b2qeK2xRcLRIgQH0dMLPaVSVeg080piBAhzkdMB59dQWn6BTxWnSFChLgtYrqAlCYdPmwVCWUhQoQ4HjFRZBIHCBIbeIgQIUJs/WhPLPDhxhlEiBDPQkyPdIFKo99OtiFChPhqxHRzZ+Xho3SwAhEixLMQ0wt/2wOEN+dtoSxEiBDHIO7QhFrZtLr94iFChAgx1AzqKmgrwwiIECFC7ERMh69dG2yIECFCXBFAVIpAegP/mhQHIkSIUcSVjar0hjkeJEOECHEkovFjIUUAEeKU8QE0apeVMce/LwAAAABJRU5ErkJggg=="></p>
<p>¡Muchas gracias otra vez por la donación!</p>
</div>
<div class="instruction">
<p><strong>¡En caso de fallo, compruebe que el Bluetooth está activado en tu sistema!</strong></p>
<p>El navegador que estás utilizando debe ser compatible con Web Bluetooth API. Considere el uso del navegador compatible, la mejor opción es:</p>
<ul>
<li>Chrome en macOS, Linux, Android o Windows</li>
<li>Bluefy en iOS</li>
</ul>
<p>Also you can check complete list of <a class="click" href="https://github.com/WebBluetoothCG/web-bluetooth/blob/main/implementation-status.md" title="">supported browsers</a>.</p>
<p>For some bluetooth cubes, we need you to provide the MAC address of your cube to decrypt the data. <strong>csTimer is able to automatically read MAC address of the cube if you properly setup your browser:</strong></p>
<ul>
<li>Chrome: enable chrome://flags/#enable-experimental-web-platform-features flag in browser settings.</li>
<li>Bluefy: turn on Enable BLE Advertisements option in browser settings.</li>
</ul>
<p>If you have difficulties with cube MAC address, you may read <a class="click" href="https://gist.github.com/afedotov/52057533a8b27a0277598160c384ae71" title="">GAN Smart Cubes MAC address FAQ</a>.</p>
</div>