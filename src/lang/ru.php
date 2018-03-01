<h1>csTimer  версия 2017.12.10 - Профессиональный Тренировочный Таймер</h1>
<?php include('lang.php') ?>
<p>csTimer был разработан для собирающего кубера. Он поддерживает типы многих скрамблов разных головоломок включая <b>все офицальные пазлы WCA</b>; Он интегрировал с <b>Xcross сброщиком и eoline сборщиком</b>; Он поддерживает статистику времени, <b>multi-phase таймминг</b> и некоторые другие функции поддержаные другими программами как: 15с' рассмотр принятый WCA, и т.д.</p>
<p>Таймер неплохо работает на многих браузерах, как: chrome(рекомендованно), firefox, opera, IE7+. Также работает на ipad, iphone и многие устройства платформы Android. </p>
<p> --- Написано: <a class="click" href="mailto:cs0x7f@gmail.com">Шуан Ченом (cs0x7f@gmail.com)</a><br>
 --- UI разработан: <a class="click" href="mailto:liebe7@126.com">Юэ Чжаном (liebe7@126.com)</a><br></p>
<h2>Представление</h2>
<ul>
<li><b>Таймер</b> - Поддержка WCA рассмотра, multi-phase тайминг, вставка через клавиатуры, подтвердить OK/+2/DNF. Аккуратонсть 0.001с.</li>
<li><b>Скрамбл</b> - Поддержка всех скрамблов WCA. Большое количество неофицальных и тренировочных скрамблов, как: ребра/углы только, последний слой.</li>
<li><b>Статистика</b> - Показывает average 5/12 динамично. Загрузка статистик текущей сессии, включая лучший average 5/12 и т.д.</li>
<li><b>Инструменты</b> - Поддержка сборки multi-face креста, Xcross(продолженный крест), EOLine. Изображение Скрамбла для NxNxN куба.</li>
</ul>
<h2>Детали</h2>
csTimer был протестирован на Firefox, Chrome и Safari. Также он неплохо работает на ipad(протестированно oyyq).
<h3>Таймер</h3>
<ul>
 <li><b>Традиционный</b> - Нажмите на кнопку 'пробел' пока цвет шрифта не переключится на зеленый. Время начнется когда вы отпустите кнопку и рекорд запишется когда вы нажмете кнопку снова.</li>
 <li><b>Время нажатия</b> - Также как stackmat, csTimer поддерживает время нажатия. Вы должны нажимать на кнопку 'пробел' некоторое время прежде чем отпускать. </li>
 <li><b>WCA рассмотр</b> - csTimer поддерживает рассмотр как это описано в правилах wca. Если включено, таймер будет в режиме рассмотра после того как вы его начали.</li>
 <li><b>Multi-phase тайминг</b> - таймер поддерживает multi-phase таймминг. Вы можете поставить число фаз(ы), и можете нажать на кнопку пробел несколько раз.</li>
 <li><b>Вставка клавиатурой</b> - если хотите внешний таймер как stackmat, вы можете вставить время мануально.</li>
 <li><b>OK/+2/DNF</b> - если эта функция включена, появится подтверждающий диалог. Вы должны выбрать сборку (финальное положение) если OK, +2 или DNF. Обычное время может зависить от времени на рассмотр.</li>
 <li><b>Аккуратность</b> - аккуратность таймера 0.001с или 1 милисекунда, и может быть показано до 0.01с. </li>
 <li><b>Формат времени</b> - Вы можете поставить формат времени чтобы выключить/включить 'минуты' или 'часы', как: hh:mm:ss.XX(X) или mm:ss.XX(X)".</li>
 <li><b>Обновление таймера</b> - По каким то причинам, обновление таймера можно поставить на: нет, секунды или реальное время.</li>
 <li><b>Размер шрифта</b> - Для адаптации к монитрам разных размеров, вы можете поставить размер шрифта таймера.</li>
 <li><b>Стиль цвета</b> - Здесь много стилей цвета. Выберите то что вам нравится.</li>
</ul>
<h3>Скрамбл</h3>
<ul>
 <li><b>WCA Оффицальный Скрамблер</b> - csTimer поддерживает всех официальных скрамблеров wca, как: случайная позиция скрамблер 2x2x2, 3x3x3, пирамидка, скваер, clock. Случайные движения скрамблер 4x4x4, 5x5x5, 6x6x6, 7x7x7, мегаминкс.</li>
 <li><b>CFOP Тренировка</b> - Для метода CFOP, специальный скрамблы поддержаные csTimer: скрамбл последнего слоя, последний слой + один слот, последний слой + 4 слота.</li>
 <li><b>Другие Методы 3x3x3</b> - Чтобы улучшить CFOP, специальные скрамблы поддержаные csTimer: ZBLL, углы/ребра последнего слоя, RUL генератор.</li>
 <li><b>Roux Тренировка</b> - Для метода Roux, специальные скрамблы поддержаные csTimer: последние шесть ребер, l10p.</li>
 <li><b>Тренировка Больших Кубов</b> - Для больших кубов, специальные скрамблы поддержаные csTimer: скрамбл ребер 4x4x4, 5x5x5, 6x6x6, 7x7x7.</li>
 <li><b>3x3x3 BLD Тренировка</b> - Для 3x3x3 bld, специальные скрамблы поддержаные СsTimer: только ребра/углы заскрамблены.</li>
 <li><b>Другие Головоломки</b> - csTimer также поддерживает большое количество головоломок не входящих в wca.</li>
</ul>
<h3>Статистика</h3>
<ul>
 <li><b>Multi Сессия</b> - Здесь 5 сессий времени. Все функции статистики ориентированы по сессии.</li>
 <li><b>Average сессии</b> - Вы можете найти average сессии внизу на табличке времени.</li>
 <li><b>Динамический ao5</b> - После больше 5 сборок, вы можете посмотреть ваш average of 5 на колонке 'ao5' и получить деталь нажимая на клетку.</li>
 <li><b>Динамический ao12</b> - После больше 12 сборок, вы можете посмотреть ваш average of 12 на колонке 'ao12' и получить деталь нажимая на клетку.</li>
 <li><b>Детали статистики</b> - Нажмите на клетку которая содержит average сессии, и вы получите детали текущей сессии.</li>
 <li><b>добавить комментарии</b> - Нажмите на клетку которая содержит время сборки, и вы сможете поставить OK/+2/DNF или комментарии.</li>
 <li><b>удалить время/сессию</b> - Кликните на индекс прежде времени, И вы сможете удалить все время в ряд. Или кликните на кнопку 'X' чтобы удалить все время в текущей сессии.</li>
</ul>
<h3>Клавиатурное Сокращение</h3>
<ul>
 <table class="table" style="display: inline-block;">
  <tr><th>функции</th><td>кнопок</td></tr>
  <tr><th>Alt + 1</th><td>Тип скрамбла Скваер.</td></tr>
  <tr><th>Alt + 2 ~ 7</th><td>Тип скрамбла 2x2x2~7x7x7.</td></tr>
  <tr><th>Alt + p/m/c/s</th><td>Тип скрамбла пира/мегаминкс/clock/скьюб.</td></tr>
  <tr><th>Alt + i</th><td>Выбрать тип скрамбла.</td></tr>
  <tr><th>Alt + d</th><td>Удалить все время в текущей сессии.</td></tr>
  <tr><th>Alt + z</th><td>Удалить последнее время.</td></tr>
  <tr><th>Alt + up/down</th><td>К следующей/последней сессии.</td></tr>
  <tr><th>Alt + left/rightt</th><td>Показать последний/следующий скрамбл.</td></tr>
  <tr><th>Ctrl + 1/2/3</th><td>Последнее время OK/+2/DNF</td></tr>
 </table>
 <table class="table" id="vrckey" style="display: inline-block;">
  <tr><th colspan=10>Карта Кнопок Виртуального Куба</th></tr><tr>
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
<h2>Ссылки</h2>
<ul>
<li><a class="click" href="http://cubingchina.com/">Кубинг Китай, оффициальный китайский спидкубинговый сайт.</a></li>
<li><a class="click" href="/old2/">csTimer версия 2012.3.15 (only zh-cn)</a></li>
<li><a class="click" href="/old/">csTimer версия 2012.2.29 (only zh-cn)</a></li>
<li><a class="click" href="/src/">csTimer с некомперссированными файлами</a></li>
<li><a class="click" href="https://github.com/cs0x7f/cstimer">источный код csTimer</a></li>
</ul>
<h2>Цветовые схемы</h2>
  <?php include('color.php') ?>
<div class="donate" style="line-height:1.5em;">
<p>Спасибо за интерес в поддержке csTimer!</p>
<p>Пожертвования будут использованы для разработчиков или экипировочных покупок. </p>
<p>Вы можете пожертвовать через PayPal используя кнопку ниже или <a href="https://www.paypal.me/cs0x7f" class="click"> via PayPal.me</a>. </p>
<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
<input type="hidden" name="cmd" value="_s-xclick">
<input type="hidden" name="hosted_button_id" value="NW25HME3QUEZY">
<input type="image" src="data:image/gif;base64,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" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
</form>
<p>Также можно пожертвовать через Alipay на следующий аккаунт: <br>cs0x7f@gmail.com</p>
<p><img style="display:inline-block; width:10em; height:10em;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABsCAIAAAAABMCaAAABoklEQVR42u3aUY6DMAwFQO5/6e0JViq1XwjO5LOqIAxSHJ5z/RnlcSGACHEk4hUY/974i/9/83vlXl3PBREixPmIpYX25oNVrl95GV3PBREixLMQ05OuXD9RoG5fByJEiBCfnDREiBAhDkashAulTTJEiBAhbhJAJIKM41IciBAhLkOMNHQ2+P313T6IECEuQ9z60FBTcYjMDSJEiCMRKx//K4tMYvNcOkwAESLEoxBXNukTwW1XKAsRIsRzEZ9CqUAkClQpxYEIEeIYxApo1+b2qeK2xRcLRIgQH0dMLPaVSVeg080piBAhzkdMB59dQWn6BTxWnSFChLgtYrqAlCYdPmwVCWUhQoQ4HjFRZBIHCBIbeIgQIUJs/WhPLPDhxhlEiBDPQkyPdIFKo99OtiFChPhqxHRzZ+Xho3SwAhEixLMQ0wt/2wOEN+dtoSxEiBDHIO7QhFrZtLr94iFChAgx1AzqKmgrwwiIECFC7ERMh69dG2yIECFCXBFAVIpAegP/mhQHIkSIUcSVjar0hjkeJEOECHEkovFjIUUAEeKU8QE0apeVMce/LwAAAABJRU5ErkJggg=="></p>
<p>Ваша поддержка учтена!</p>
</div>
