<h1>csTimer версии <?php echo $version;?> - профессиональный спидкубинг/тренировачный таймер</h1>
<?php include('lang.php') ?>
<h2>Введение</h2>
<p>csTimer - это профессиональный таймер, предназначенный для спидкуберов, он предоставляет:</p>
<ul>
<li>Amounts of scramble algorithms, including <strong>all WCA official events</strong>, varieties of twisty puzzles, <strong>training scramble</strong> for specific sub steps (e.g. <strong>F2L, OLL, PLL, ZBLL</strong>, and can filter cases), etc</li>
<li>Plenty of statistics functions, it supports <strong>time-split timing</strong>; <strong>Any number of sessions</strong>, session split/merge, etc.</li>
<li>Varieties of solver, such as <strong>Cross, Xcross, 2x2x2 face, Skewb Face, SQ1 shape</strong>, for learning or training these sub steps.</li>
<li>Other auxiliary tools, such as scramble image, 8-second inspection (voice) alert, metronome, batch-scramble generator, etc.</li>
<li>Backup function, For avoiding data missing, you can backup your solves to local files, csTimer's server or Google storage.</li>
</ul>
<p>csTimer supports most of modern desktop browsers, on mobile phone and tablet PC, you can add csTimer to your home screen, and it will work as a native APP.</p>
<p>csTimer takes advantage of browser cache, which consumes traffic only when you open it for the first time, after that, csTimer is able to work without network connection (except for functions like backup)</p>
<h3>Авторские права</h3>
<p>csTimer - это программное обеспечение с открытым исходным кодом, которое использует GPLv3. Если у вас есть предложения или комментарии к csTimer, пожалуйста, отправьте их <a class="click" href="https://github.com/cs0x7f/cstimer/issues" title="">сюда</a></p>
<p>Автор: <a href="mailto:cs0x7f@gmail.com">Shuang Chen (cs0x7f@gmail.com)</a></p>
<p>Пользовательский интерфейс: <a href="mailto:liebe7@126.com">Yue Zhang (liebe7@126.com)</a></p>
<h2>Основные функции</h2>
<ul>
<li><strong>Как засекать время</strong> - Зажмите пробел (или обе клавиши Ctrl, или нажмите экрана на мобильном устройстве) и дожидайтесь, пока таймер не загорится зелёным, он запустится как только пробел перестанет удерживаться, нажмите любую клавишу для остановки таймера, и время сборки будет записано.</li>
<li><strong>Описание интерфейса</strong> - Возле логотипа csTimer 6 кнопок: настройки, экспорт, скрамбл, список времен, пожертвование, инструменты, нажмите на <strong>скрамбл</strong>, <strong>список времен</strong>, <strong>инструменты</strong> чтобы открыть соответствующую панель управления.</li>
<li><strong>Панель скрамблинга</strong> - В панели Скрамблинга, вы можете выбрать тип скрамбла, установить длину скрамбла и фильтрация случаев (при наличии), посмотреть предыдущий скрамбл, сгенерировать следующий скрамбл.</li>
<li><strong>List times panel</strong> - In the list times panel, you can open session manager by clicking "Session", select/add/delete sessions, empty session by the selector and the button next to, then you can view the current single/average, best single/average, and the full time list.</li>
<li><strong>Tools panel</strong> - In the tool panel, you can select specific auxiliary functions, including scramble image, scramble generators, solvers, other kinds of statistics, etc.</li>
</ul>
<h2>Сочетание клавиш</h2>
<table class="table" style="display: inline-block;">
<tr><th>Клавиша</th><td>Функция</td></tr>
<tr><th>Alt + 1</th><td>Тип скрамбла для Скваера-1.</td></tr>
<tr><th>Alt + 2 ~ 7</th><td>Scramble type to 2x2x2~7x7x7.</td></tr>
<tr><th>Alt + p/m/c/s</th><td>Тип скрамбла в пираминкса/мегаминкса/клока/скьюба.</td></tr>
<tr><th>Alt + i</th><td>Scramble type to input.</td></tr>
<tr><th>Alt + d</th><td>Remove all times in current session.</td></tr>
<tr><th>Alt + z</th><td>Remove the latest time.</td></tr>
<tr><th>Alt + up/down</th><td>To next/last session.</td></tr>
<tr><th>Alt + left/right</th><td>Display last/next scramble.</td></tr>
<tr><th>Ctrl + 1/2/3</th><td>Последнее время: ОК/+2/DNF</td></tr>
</table>
</table>
<table class="table" id="vrckey" style="display: inline-block;">
<tr><th colspan=10>Virtual Cube Key Map</th></tr><tr>
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

<h2>Option details</h2>
<ul>
<li><strong data="opt_ahide">скрывать все элементы когда идёт время</strong>. Скрывать логотип и все панели во время сборки.</li>
<li><strong data="opt_useMilli">использовать миллисекунды</strong>. Отображать цифру миллисекунды. Внутренняя точность csTimer составляет 1 миллисекунду независимо от настройки.</li>
<li><strong data="opt_timeFormat">формат времени</strong>. Формат времени для отображения.</li>
<li><strong data="opt_atexpa">Авто-экспорт (по 100 сборок)</strong>. Если отмечено, csTimer автоматически будет экспортировать сборки каждые 100 сборок в указанное место, локальный файл, сервер csTimer или Google Storage.</li>
<li><strong data="opt_expp">Import non-latest data</strong>. Если вы загрузили несколько резервных копий, вы можете импортировать одну из 10 последних загруженных. Если вы случайное загрузите пустую резервную копию, эта опция поможет вам восстановить свои сборки.</li>
<li><strong data="opt_useLogo">Подсказки в логотипе</strong>. Логотип csTimer будет служить в качестве информационной панели показывающей информацию которая может быть вам интересна, например при новом личном рекорде.</li>
<li><strong data="opt_showAvg">Показывать Таблицу Avg</strong>. Две строки будут показываться ниже основного таймера с двумя средними, по умолчанию - Ao5 и Ao12</li>
<li><strong data="opt_zoom">Увеличить</strong>. Вы можете настроить размеры всех элементов с помощью этой опции.</li>
<li><strong data="opt_font">выберите шрифт таймера</strong>. Шрифт основного таймера.</li>
<li><strong data="opt_uidesign">Дизайн интерфейса</strong>. Вы можете переключить дизайн интерфейса на материальный или спрятать тени с помощью этой опции.</li>
<li><strong data="opt_view">Стиль интерфейса</strong>. Переключение между компьютерным и мобильном видом.</li>
<li><strong data="opt_wndScr">Стиль панели со скрамблом</strong>. Сделать панель скрамбла встроенной в фон.</li>
<li><strong data="opt_wndStat">Стиль панели статистики</strong>. Сделать список времени сборок встроенной в фон.</li>
<li><strong data="opt_wndTool">Стиль отображения панели инструментов</strong>. Сделать панель инструментов встроенной в фон.</li>
<li><strong data="opt_bgImgO">прозрачность фонового изображения</strong>. Прозрачность фона.</li>
<li><strong data="opt_bgImgS">фоновое изображение</strong>. Вы можете выбрать свое собственное изображение как фоновое, но доступны только HTTPS адреса из-за ограничения безопасности браузера.</li>
<li><strong data="opt_timerSize">размер таймера</strong>. Установить размер основного таймера.</li>
<li><strong data="opt_smallADP">использовать маленький шрифт после десятичной точки</strong>. Использовать меньший размер шрифта после точки в основном таймере.</li>
<li><strong data="opt_useMouse">использовать таймер мышкой</strong>. Использовать мышь, чтобы запускать таймер. Запуск клавиатурой тоже будет доступен.</li>
<li><strong data="opt_useIns">использовать WCA инспекцию</strong>. Включить инспекцию WCA в виде отсчета в 15 секунд, автоматически даёт +2/DNF штраф, если инспекция идёт дольше 15 секунд.</li>
<li><strong data="opt_voiceIns">голосовое предупреждение при инспекции</strong>. Предупреждать после 8/12 секунд инспекции, имитируя предупреждение от судьи в соревнованиях WCA.</li>
<li><strong data="opt_voiceVol">Громкость голоса</strong>. Громкость предупреждающего голоса.</li>
<li><strong data="opt_input">вставлять время с</strong>. csTimer может добавлять сборки разными способами, кроме клавиатуры он поддерживает ввод вручную, автоматическую запись времени из стакмата и подключение к смарт-кубу по bluetooth</li>
<li><strong data="opt_intUN">Unit when entering an integer</strong>. Когда вы вводите целое число XXX в поле ввода, что означает, XXX секунд или XXX наносекунд, или XXX миллисекунд?</li>
<li><strong data="opt_timeU">обновление таймера</strong>. Как часто обновляется таймер.</li>
<li><strong data="opt_preTime">время пространства(секунд)</strong>. Как долго пробел должен удерживаться перед тем, как таймер станет зелёным.</li>
<li><strong data="opt_phases">число этапов</strong>. Количество фаз, нажмите любую клавишу, чтобы отметить разделение</li>
<li><strong data="opt_stkHead">Использовать информацию о статусе Stackmat</strong>. Стакмат будет сообщать о своем состоянии, например прикосновение с левой или правой частью, затем csTimer может использовать эту информацию, но ошибка может привести к непредсказуемому поведению.</li>
<li><strong data="opt_scrSize">размер скрамбла</strong>. Размер текста скрамбла.</li>
<li><strong data="opt_scrASize">Размер автоматического скрамбла</strong>. Размер текста скрамбла будет автоматически подстраиваться под длину скрамбла. Работает с прошлой опцией.</li>
<li><strong data="opt_scrMono">моноширинный скрамбл</strong>. Использовать моноширинный шрифт для текста скрамбла.</li>
<li><strong data="opt_scrLim">Ограничить высоту зоны скрамбла</strong>. Когда зона скрамбла слишком высока появится полоса прокрутки, чтобы избежать поднятия панели</li>
<li><strong data="opt_scrAlign">Выравнивание зоны скрамбла</strong>. Выравнивание всей зоны скрамбла, включая выбор вида скрамбла.</li>
<li><strong data="opt_preScr">pre-scramble</strong>. Pre moves before scramble, which is used for virtual Rubik's cube and scramble image.</li>
<li><strong data="opt_scrFast">Использовать быстрый скрамбл для 4х4х4(неофициально)</strong>. Официальный WCA метод скрамблинга требует огромных вычислительных ресурсов, выберите эту опцию, чтобы использовать скрамблинг случайными поворотами.</li>
<li><strong data="opt_scrKeyM">Главный(ые) ход(ы) в скрамбле</strong>. Mark a key move in the scramble, e.g. the move that take the state away from square shape in SQ1 scrambles.</li>
<li><strong data="opt_scrClk">Действие при нажатии на скрамбл</strong>. Поведение когда нажимается текст скрамбла - копировать скрамбл или сгенерировать новый скрамбл.</li>
<li><strong data="opt_trim">Number of solves trimmed at each side</strong>. Количество сборок от лучших до худших которые не учитывается при расчете среднего</li>
<li><strong data="opt_statsum">как суммарный после списка времени</strong>. Показывать окно статистики перед списком времени.</li>
<li><strong data="opt_printScr">печатать скрамблы в статистику</strong>. Print scramble in round statistics dialog.</li>
<li><strong data="opt_printDate">Добавлять дату сборки в статистику</strong>. Print solving date in round statistics dialog.</li>
<li><strong data="opt_imrename">переименовать сессию сразу же после создания</strong>. Immediately rename a session after creating it.</li>
<li><strong data="opt_scr2ss">создавать новую сессию при измене типа скрамбла</strong>. When switching scramble type, a new session will be created.</li>
<li><strong data="opt_statinv">обратный список времени</strong>. Invert the time list, thus, latest solves will at the bottom of the time list.</li>
<li><strong data="opt_statclr">Включить удаление сессии</strong>. When disabled, an '+' button (for session creating) will replace the 'X' button besides the session selector, thus, when clicked, a new empty session will be created instead of clearing the whole session.</li>
<li><strong data="opt_absidx">Показать абсолютный индекс в отчете статистики</strong>. Show absolute index in the session instead of 1 to number of solves (e.g. 1/2/3 for mo3) in round statistics.</li>
<li><strong data="opt_rsfor1s">Show stat. when clicking solve number</strong>. When click the first row of the time list, show a round statistics for a single solve.</li>
<li><strong data="opt_statal">Статистические индикаторы</strong>. Statistical indicator for the statistics table, when customizing, aoX and moX are available.</li>
<li><strong data="opt_delmul">Включить множественное удаление</strong>. Able to delete multiple solves starts from a solve, for avoid misunderstand, the selected solve will be the oldest solve to delete.</li>
<li><strong data="opt_disPrec">точное распределение времени</strong>. Time interval for the time distribution tool.</li>
<li><strong data="opt_solSpl">Show solution progressively</strong>. If selected, only the length of a solution from a solver is displayed, and you can view the solution one move by one move, otherwise, the whole solution is displayed.</li>
<li><strong data="opt_imgSize">Размер изображения скрамбла</strong>. Set the size of scramble image.</li>
<li><strong data="opt_NTools">количество инструментов</strong>. csTimer is able to show up to 4 tools simultaneously.</li>
<li><strong data="opt_useKSC">использовать сокращение на клавиатуре</strong>. Use keyboard shortcut to switch scramble type, generate next scramble, switch between sessions, etc.</li>
<li><strong data="opt_vrcSpeed">Стандартная скорость вращение виртуального куба(вращений в секунду)</strong>. Base turn speed of the virtual Rubik's cube, the turn will be speed up if there are multiple moves to turn.</li>
<li><strong data="opt_vrcMP">мульти-фаза</strong>. Automatic multi-phase split for virtual Rubik's cube and bluetooth cube.</li>
<li><strong data="opt_giiVRC">Показать виртуальный Giiker Cube</strong>. Show a virtual Rubik's cube in the main timer when connecting to a bluetooth cube.</li>
<li><strong data="opt_giiSD">Отметить заскрамбленным если</strong>. For a bluetooth cube, csTimer cannot know whether a move is from for scrambling or solving.</li>
<li><strong data="opt_giiSK">Отметить заскрамбленным с помощью пробела</strong>. When the space bar is pressed, the bluetooth cube is marked scrambled, any turns after that will treated as the start of timing.</li>
<li><strong data="opt_giiSM">Отметить заскрамбленным, делая</strong>. Use specific move sequences on the bluetooth cube to mark scrambled.</li>
<li><strong data="opt_giiBS">Бикать, когда помечено заскрамбленным</strong>. Beep when some of scramble-finish signal is triggered.</li>
<li><strong data="opt_giiRST">Сбросить Giiker куб при подключении</strong>. When connecting to a bluetooth cube, csTimer will detect whether it is solved, if not, there might be some hardware problems or the cube is really unsolved.</li>
<li><strong data="opt_giiAED">Автоопределение аппаратной ошибки</strong>. Some bluetooth cubes will loss some of moves due to hardware failure, csTimer will try to detect such case.</li>
</ul>
<h2>Подробности инструментов</h2>
<ul>
<li><strong data="tool_scrgen">ГенераторСкрамблов</strong>. Вы можете сгенерировать до 999 скрамблов одним кликом при помощи этого инструмента.</li>
<li><strong data="tool_cfm">Подтвердить время</strong>. Tool to view current solves with its comment, scramble, solving date and reconstruction if available, which is also the dialog when you click on a solve.</li>
<li><strong data="tool_hugestats">межсессионная статистика</strong>. You are able to do cross-session statistics with this tool.</li>
<li><strong data="tool_stats">Статистика</strong>. Statistic table similar with the table in the list times panel.</li>
<li><strong data="tool_distribution">распределение времени</strong>. Time distribution and stability analysis, &lt;X Y/Z means there are totally Y solves less than X seconds, and all of the latest Z solves are less than X seconds in the session.</li>
<li><strong data="tool_trend">тенденция времени</strong>. Shows a trend curve of all solves in current session.</li>
<li><strong data="tool_dlystat">Daily Statistics</strong>. Count number of solves each day/week/month/year.</li>
<li><strong data="tool_image">нарисовать скрамбл</strong>. Scramble image to verify a correct scramble, all WCA puzzles are supported.</li>
<li><strong data="tool_roux1">Cборщики &gt; собрать Roux S1</strong>. Roux 1st step solver, which solves a 1x2x3 block.</li>
<li><strong data="tool_eoline">Cборщики &gt; собрать EOLine</strong>. EO line solver, which solves orientations of all 12 edges, and positions of DF and DB edges.</li>
<li><strong data="tool_cross">Cборщики &gt; собрать крест</strong>. Cross solver, which solve DF, DL, DR, DB edges.</li>
<li><strong data="tool_222face">Cборщики &gt; Сторона 2х2х2</strong>. Сборщик стороны 2х2х2, который собирает сторону куба 2х2х2.</li>
<li><strong data="tool_333cf">Cборщики &gt; Cross + F2L</strong>. Сборщик креста и F2L, собирающий крест и 4 пары при помощи компьютерного поиска, поэтому решение может быть далеко от человеческого.</li>
<li><strong data="tool_333roux">Cборщики &gt; Roux S1 + S2</strong>. Сборщик Ру 1-го и 2-го, который сначала решает 1x2x3 блок на левой стороне и затем делает еще 1 блок 1x2x3 на правой стороне с помощью движений R, M, r, U.</li>
<li><strong data="tool_333petrus">Cборщики &gt; 2x2x2 + 2x2x3</strong>. Сборщик 1-го и 2-го шага Petrus, который сначала собирает блок 2х2х2 слева, и затем увеличивает его до 2х2х3 слева.</li>
<li><strong data="tool_333zz">Cборщики &gt; EOLine + ZZF2L</strong>. Сборщик Eoline и ZZF2L, который сначала решает EOLine, а затем собирает 1x2x3 слева или справа, потом собирает оставшийся 2x2x3.</li>
<li><strong data="tool_sq1cs">Cборщики &gt; SQ1 S1 + S2</strong>. Сборщик 1-го и 2-го шагов скваера, который сначала собирает кубическую форму скваера, а затем разделяет верхние и нижние части.</li>
<li><strong data="tool_pyrv">Cборщики &gt; Pyraminx V</strong>. Сборщик V для пирамидки, который сначала собирает 3 угла и 2 ребра в форму буквы 'V' для пирамидки.</li>
<li><strong data="tool_skbl1">Cборщики &gt; Skewb Face</strong>. Сборщик стороны скьюба, который собирает его слой, а точнее, 1 центр и 4 соседние угла.</li>
<li><strong data="tool_giikerutil">Giiker Cube</strong>. Дополнительный инструмент для Bluetooth-куба, который способен показать состояние, зарядку, реконструкцию в режиме реального времени и т.д.</li>
<li><strong data="tool_if">InsertionFinder</strong>. Поиск вставки для сборки на количество ходов.</li>
<li><strong data="tool_mtrnm">метроном</strong>. Метроном, помимо издавания звуков на специальной частоте, вы можете заставить его издавать звуки в определенное время даже после начала сборки.</li>
<li><strong data="tool_onlinecomp">Онлайн соревнование</strong>. Онлайн-соревнование, где вы можете войти через аккаунт WCA и соревноваться со спидкуберами со всего мира с одинаковыми скрамблами.</li>
<li><strong data="tool_stackmatutil">stackmat</strong>. Дополнительный инструмент для Stackmat, способный просматривать статус, мощность и шум сигнала, и т.д.</li>
</ul>
<h2>Ссылки</h2>
<ul>
<li><a class="click" href="https://cubingchina.com/" title="">Кубинг в Китае</a></li>
<li><a class="click" href="/new/" title="">Бета-версия csTimer</a></li>
<li><a class="click" href="/src/" title="">Бета-версия csTimer с несжатыми файлами</a></li>
<li><a class="click" href="https://github.com/cs0x7f/cstimer" title="">Исходный код csTimer</a></li>
<li><a class="click" href="/old3/" title="">csTimer, версия 2015.12.12</a></li>
<li><a class="click" href="/old2/" title="">csTimer, версия 2012.3.15</a></li>
<li><a class="click" href="/old/" title="">csTimer, версия 2012.2.29</a></li>
</ul>
<h2>Цветовые схемы</h2>
<?php include('color.php') ?>
<div class="donate" style="line-height:1.5em;">
<p>Спасибо за желание поддержать csTimer! Ваше пожертвование будет использовано, чтобы поддержать нашу разработку и оплатить обслуживание.</p>
<p>Если вы желаете совершить пожертвование через PayPal, нажмите на кнопку ниже или же через <a class="click" href="https://www.paypal.me/cs0x7f" title="">PayPal.me</a>.</p>
<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
<input type="hidden" name="cmd" value="_s-xclick">
<input type="hidden" name="hosted_button_id" value="NW25HME3QUEZY">
<input type="image" src="data:image/gif;base64,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" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
</form>
<p>Вы также можете финансировать нас через Alipay, отсканируйте следующий двухмерный код, или же переведите на эту почту: cs0x7f@gmail.com</p>
<p><img style="display:inline-block; width:10em; height:10em;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABsCAIAAAAABMCaAAABoklEQVR42u3aUY6DMAwFQO5/6e0JViq1XwjO5LOqIAxSHJ5z/RnlcSGACHEk4hUY/974i/9/83vlXl3PBREixPmIpYX25oNVrl95GV3PBREixLMQ05OuXD9RoG5fByJEiBCfnDREiBAhDkashAulTTJEiBAhbhJAJIKM41IciBAhLkOMNHQ2+P313T6IECEuQ9z60FBTcYjMDSJEiCMRKx//K4tMYvNcOkwAESLEoxBXNukTwW1XKAsRIsRzEZ9CqUAkClQpxYEIEeIYxApo1+b2qeK2xRcLRIgQH0dMLPaVSVeg080piBAhzkdMB59dQWn6BTxWnSFChLgtYrqAlCYdPmwVCWUhQoQ4HjFRZBIHCBIbeIgQIUJs/WhPLPDhxhlEiBDPQkyPdIFKo99OtiFChPhqxHRzZ+Xho3SwAhEixLMQ0wt/2wOEN+dtoSxEiBDHIO7QhFrZtLr94iFChAgx1AzqKmgrwwiIECFC7ERMh69dG2yIECFCXBFAVIpAegP/mhQHIkSIUcSVjar0hjkeJEOECHEkovFjIUUAEeKU8QE0apeVMce/LwAAAABJRU5ErkJggg=="></p>
<p>Ещё раз спасибо за пожертвование!</p>
</div>