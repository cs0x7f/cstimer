<h1>csTimer  version 2015.12.12 - 魔方竞速训练专用计时器</h1>
<?php include('lang.php') ?>
<p>csTimer是专门为魔方爱好者精心设计的一款专业计时软件，是迄今为止功能最全面、界面最友好、使用最便捷的在线版网页魔方计时器。它提供各类魔方的打乱公式，WCA规则下的<b>所有官方比赛打乱</b>；它集成了<b>Xcross求解模块和eoline求解模块</b>以方便魔方爱好者学习相关玩法；它提供了丰富的成绩统计功能；它支持<b>分段计时</b>；以及很多同类软件经常提供的功能，包括：WCA规则中的15秒观察，启动前长按空格等。</p>
<p>该软件支持多种浏览器平台，包括：chrome(推荐), firefox, safari, opera, IE7+。同时还支持ipad, iphone以及大部分触屏Android手机或平板电脑。</p>
<p>功能设计：<a class="click" href="mailto:cs0x7f@gmail.com">陈霜 (cs0x7f@gmail.com)</a>
<br>界面美工：<a class="click" href="mailto:liebe7@126.com">张悦 (liebe7@126.com)</a><br></p>
<h2>功能简介</h2>
<ul>
<li><b>计时功能</b> - 提供传统魔方魔方计时器的功能，同时支持WCA观察，分段计时，手动输入成绩，确认+2/DNF。计时精度可达到0.001秒。</li>
<li><b>打乱功能</b> - 提供所有WCA官方规范打乱，大量非官方魔方打乱及各种训练打乱，包括：角块，棱块，顶层，F2L训练等。</li>
<li><b>统计功能</b> - 提供动态显示的5次，12次平均及实时总平均时间，同时可以导出成绩统计信息，包括最快5次平均，12次平均等各信息。</li>
<li><b>附加功能</b> - 支持六面十字、Xcross（拓展十字）的求解，EOLine求解，部分魔方打乱状态显示。</li>
</ul>
<h2>具体功能说明</h2>
本网页魔方计时器所有功能经过测试，在Firefox Chrome Safari浏览器下均工作良好。同时经过测试，本魔方计时器同时还支持ipad及部分其他平板电脑。
<h3>计时功能</h3>
<ul>
 <li><b>常规计时</b> - 与大部分网页魔方计时器类似，按住空格，松开的同时计时器将开始计时。再次按下任意按键计时停止，并记录此次复原魔方时间。</li>
 <li><b>启动僵直</b> - 与stackmat等各类魔方计时器一样，该网页魔方计时器支持启动僵直，即在启动之前须要按住空格一段时间，当然启动所需的时间是可设置的。</li>
 <li><b>WCA观察</b> - 该魔方计时器集成了WCA规则中15秒观察的功能，如启用该选项，启动计时器后将首先进入15秒观察阶段，再次启动计时器才会进入复原时间。</li>
 <li><b>分段计时</b> - 该计时器支持分段计时，可在设置面板中设定阶段数量。每次复原过程中，你需要多次按下任意键，以记录分段时间。</li>
 <li><b>手动输入</b> - 如果你使用外部的魔方计时器，例如stackmat等，你可以选择手动直接输入成绩。</li>
 <li><b>完成状态</b> - 勾选该选项后，在每一次计时结束后都会弹出一个窗口，选择此次复原时间的有效性，如不设置该项，则默认成绩有效或根据观察时间判定。</li>
 <li><b>显示精度</b> - 该网页魔方计时器支持显示精确到0.01秒或0.001秒，但无论如何设置，内部记录时间以0.001秒为准，所以设置为0.01秒并不会损失精度。</li>
 <li><b>显示格式</b> - 你可以通过选择显示格式来控制该网页计时器的显示格式（例如"hh:mm:ss.XX(X)"或"mm:ss.XX(X)"等）。</li>
 <li><b>更新方式</b> - 处于某些考虑，该魔方计时器提供三种计时器更新方式：不更新/仅更新到秒/实时更新。</li>
 <li><b>字体大小</b> - 为了适应不同大小的显示器，该魔方计时器支持设置计时器字体大小。</li>
 <li><b>配色方案</b> - 该魔方计时器提供了多种配色方案，可以在设置面板中选择你喜欢的那种。</li>
</ul>
<h3>打乱功能</h3>
<ul>
 <li><b>WCA规范打乱</b> - csTimer提供所有WCA项目在WCA要求下的打乱，包括：二阶魔方、三阶魔方、金字塔、Square-1、魔表 这五类魔方的随机状态打乱，四阶魔方、五阶魔方、六阶魔方、七阶魔方、五魔方的随机步数打乱。</li>
 <li><b>CFOP阶段训练</b> - 对于CFOP法，csTimer提供的训练打乱有：仅打乱顶层、顶层+一组F2L，顶层+四组F2L。</li>
 <li><b>三阶其他阶段训练</b> - 对于CFOP法的变种或优化版本，csTimer提供的训练打乱有：仅打乱ZBLL，顶层角块，顶层棱块，RUL生成集打乱。</li>
 <li><b>桥式阶段训练</b> - 对于桥式解法，csTimer提供的训练打乱有：仅打乱最后六棱(lse)，最后六棱+顶层四角(l10p)。</li>
 <li><b>高阶阶段训练</b> - 对于高阶魔方降阶法，csTimer提供的训练打乱有：四阶魔方、五阶魔方、六阶魔方、七阶魔方仅打乱棱块。</li>
 <li><b>三阶盲拧阶段训练</b> - 对于三阶盲拧，csTimer提供的训练打乱有：仅打乱所有棱块，仅打乱所有角块。</li>
 <li><b>其他非WCA项目魔方</b> - 对于非WCA官方项目的魔方，csTimer依然提供大量打乱支持。</li>
</ul>
<h3>统计功能</h3>
<ul>
 <li><b>成绩分组</b> - 成绩统计第一行“Session”即为组选择栏。为了适用不同魔方的计时，所有成绩统计以组为单位统计，各组之间独立。</li>
 <li><b>实时平均</b> - 当前组的实时总平均成绩将会加粗显示在统计栏的最下方，单击该单元格可以显示/导出此次还原的详细统计信息。</li>
 <li><b>动态5次平均</b> - 还原次数达到5次后，在成绩统计栏的ao5列中将会实时显示5次去尾平均时间，单击单元格可以显示/导出详细信息。</li>
 <li><b>动态12次平均</b> - 还原次数达到12次后，在成绩统计栏的ao12列中将会实时显示12次去尾平均时间，单击单元格可以显示/导出详细信息。</li>
 <li><b>详细统计信息</b> - 单击实时平均所在单元格会显示详细信息栏，信息包括最快5，12次平均等，同时可显示所有成绩/注释/有效性。</li>
 <li><b>添加有效性/注释</b> - 单击某个还原时间所在的单元格后，屏幕上将会弹出一个窗口，用于设置该成绩的有效性(OK/+2/DNF)及注释信息。</li>
 <li><b>删除成绩</b> - 单击某次成绩左侧的序号可删除该成绩，单击顶部边上的“X”按钮可以删除该组所有成绩。</li>
</ul>
<h3>快捷键</h3>
<ul>
 <table class="table" style="display: inline-block;">
  <tr><th>快捷键</th><td>功能</td></tr>
  <tr><th>Alt + 1</th><td>打乱类型切换至 Square-1</td></tr>
  <tr><th>Alt + 2 ~ 7</th><td>打乱类型切换至 二~七阶魔方</td></tr>
  <tr><th>Alt + p/m/c/s</th><td>打乱类型切换至 金字塔/五魔方/魔表/斜转魔方</td></tr>
  <tr><th>Alt + i</th><td>将当前打乱类型切换至 手动输入</td></tr>
  <tr><th>Alt + d</th><td>删除统计功能中本组所有成绩</td></tr>
  <tr><th>Alt + z</th><td>删除统计功能中本组最新的一个成绩</td></tr>
  <tr><th>Alt + 上/下</th><td>统计列表切换到下/上一分组</td></tr>
  <tr><th>Alt + 左/右</th><td>显示上/下一条魔方打乱公式</td></tr>
  <tr><th>Ctrl + 1/2/3</th><td>将最新成绩的完成状态改为 OK/+2/DNF</td></tr>
 </table>
 <table class="table" id="vrckey" style="display: inline-block;">
  <tr><th colspan=10>虚拟魔方按键表</th></tr><tr>
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
<h2>链接</h2>
<ul>
<li><a class="click" href="/">cstimer博客</a></li>
<li><a class="click" href="http://cubingchina.com/">粗饼 中国魔方赛事网</a></li>
<li><a class="click" href="/old2/">csTimer version 2012.3.15</a></li>
<li><a class="click" href="/old/">csTimer version 2012.2.29</a></li>
</ul>