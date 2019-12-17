<h1>csTimer version <?php echo $version;?> - 魔方竞速训练专用计时器</h1>
<?php include('lang.php') ?>
<h2>简介</h2>
<p>csTimer是专门为魔方爱好者精心设计的一款专业计时软件，它提供了：</p>
<ul>
<li>各类打乱公式，包括<strong>所有WCA官方项目打乱</strong>、异形魔方打乱、特定阶段的<strong>训练打乱</strong>（如<strong>F2L OLL PLL ZBLL</strong>，并可筛选情况）等</li>
<li>丰富的成绩统计功能；它支持<strong>分段计时</strong>；<strong>任意数量分组</strong>，分组可拆分、合并等</li>
<li>各种求解器，如<strong>Cross、Xcross、二阶一面、Skewb一层、SQ1复形</strong>等，方便魔方爱好者学习相关玩法</li>
<li>其他辅助工具，如打乱图案、8秒观察（语音）提醒、节拍器、打乱批量生成等</li>
<li>备份功能，为了避免丢失，你可以将成绩备份到本地文件、csTimer的服务器或Google存储</li>
</ul>
<p>csTimer支持大部分桌面浏览器。在手机、平板电脑上，你可以把csTimer添加到你的屏幕，它将和本地app一样</p>
<p>csTimer利用了浏览器的本地缓存功能，只有第一次打开它时会消耗流量。此后即便网络连接断开，csTimer也可以正常工作（除了备份等功能）</p>
<h3>版权信息</h3>
<p>csTimer是开源软件，遵循GPLv3协议。 如果你对csTimer有任何建议或意见，请提交到<a class="click" href="https://github.com/cs0x7f/cstimer/issues">这里</a></p>
<p>功能设计：<a href="mailto:cs0x7f@gmail.com">陈霜 (cs0x7f@gmail.com)</a></p>
<p>界面美工：<a href="mailto:liebe7@126.com">张悦 (liebe7@126.com)</a></p>
<h2>基础功能</h2>
<ul>
<li><strong>如何开始计时</strong> - 按住空格键（或同时按下左右Ctrl按键，触碰手机屏幕），等待计时器变成绿色。松开空格的同时计时器将开始计时。再次按下任意按键计时停止，并记录此次复原魔方时间。</li>
<li><strong>界面说明</strong> - csTimer的Logo附近有6个按钮，分别为：设置、导出、打乱、成绩列表、捐赠、工具。点击<strong>打乱</strong>、<strong>成绩列表</strong>、<strong>工具</strong>可以打开对应的功能面板。</li>
<li><strong>打乱面板</strong> - 在打乱面板中，你可以设置当前打乱类型，设置打乱长度及可能出现的情况（如果支持的话），回顾上一条打乱，产生下一条打乱。</li>
<li><strong>成绩列表面板</strong> - 在成绩列表面板中，你可以通过点击“分组”打开分组管理，选择、添加、删除分组，清空分组。查看当前的单次、平均，最快的单次、平均，以及完整的成绩列表。</li>
<li><strong>工具面板</strong> - 在工具面板中你可以选择特定的辅助功能，包括打乱图案、打乱生成器、求解器、其他丰富的成绩统计信息等。</li>
</ul>
<h2>快捷键表</h2>
<table class="table" style="display: inline-block;">
<tr><th>快捷键</th><td>功能</td></tr>
<tr><th>Alt + 1</th><td>打乱类型切换至 Square-1</td></tr>
<tr><th>Alt + 2 ~ 7</th><td>打乱类型切换至 二~七阶魔方</td></tr>
<tr><th>Alt + p/m/c/s</th><td>打乱类型切换至 金字塔/五魔方/魔表/斜转魔方</td></tr>
<tr><th>Alt + i</th><td>打乱类型切换至 手动输入</td></tr>
<tr><th>Alt + d</th><td>删除统计功能中本组所有成绩</td></tr>
<tr><th>Alt + z</th><td>删除统计功能中本组最新的一个成绩</td></tr>
<tr><th>Alt + 上/下</th><td>统计列表切换到下/上一分组</td></tr>
<tr><th>Alt + 左/右</th><td>显示上/下一条打乱公式</td></tr>
<tr><th>Ctrl + 1/2/3</th><td>将最新成绩的完成状态改为 OK/+2/DNF</td></tr>
</table>

</table>

<table class="table" id="vrckey" style="display: inline-block;">
<tr><th colspan=10>虚拟魔方按键表</th></tr><tr>
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

<h2>设置项明细</h2>
<ul>
<li><strong data="opt_ahide">计时过程中隐藏所有元素</strong>. 在计时过程中隐藏打乱、成绩列表、工具栏及Logo。</li>
<li><strong data="opt_useMilli">显示到0.001秒</strong>. 展示时间的时候显示毫秒位。无论是否启用，csTimer内部的计时精度均为1毫秒。</li>
<li><strong data="opt_timeFormat">时间格式</strong>. 展示时间的格式。</li>
<li><strong data="opt_atexpa">自动导出（每100次还原）</strong>. 如果勾选，每隔100次还原csTimer会自动导出成绩到指定的地方，文件、csTimer服务器或是Google存储。</li>
<li><strong data="opt_expp">导入非最新数据</strong>. 如果你上传过多次成绩，勾选此项的话，每次导入时可以从最近上传的最多10个备份中选择一个导入。如果你不慎上传了一个空的备份，这个选项能帮你找回之前的数据。</li>
<li><strong data="opt_useLogo">在Logo中提示信息</strong>. csTimer的Logo会作为一个信息展示面板，提示各种你可能关注的信息，如打破PB等。</li>
<li><strong data="opt_showAvg">显示平均标签</strong>. 在主界面的数字下面显示两行标签，分别是当前的两个平均成绩，默认是ao5和ao12。</li>
<li><strong data="opt_zoom">缩放</strong>. 你可以通过此选项调整所有元素的大小。</li>
<li><strong data="opt_font">选择计时器字体</strong>. 主计时器字体。</li>
<li><strong data="opt_uidesign">界面设计为</strong>. 你可以通过此选项把界面切换成材料设计样式，或隐藏阴影。</li>
<li><strong data="opt_view">界面风格显示为</strong>. 在桌面版和移动版（也可以理解为横屏和竖屏）之间切换。</li>
<li><strong data="opt_wndScr">打乱区显示样式</strong>. 把打乱面板嵌到背景里。</li>
<li><strong data="opt_wndStat">统计区显示样式</strong>. 把成绩列表面板嵌到背景里。</li>
<li><strong data="opt_wndTool">工具区显示样式</strong>. 把工具面板嵌到背景里。</li>
<li><strong data="opt_bgImgO">背景图片不透明度</strong>. 背景图片的不透明度。</li>
<li><strong data="opt_bgImgS">背景图片</strong>. 你可以选择自己的图片作为计时器背景图，但由于浏览器的安全限制，只能用https开头的图片链接。</li>
<li><strong data="opt_timerSize">计时器大小</strong>. 设置主计时器的大小。</li>
<li><strong data="opt_smallADP">小数点后使用小字体</strong>. 主计时器的小数点后的数字用相对较小的字体。</li>
<li><strong data="opt_useMouse">启用鼠标计时</strong>. 使用鼠标开始计时器，当然，用键盘开始计时也依然可用。</li>
<li><strong data="opt_useIns">使用WCA观察</strong>. 使用WCA观察阶段，即15秒倒计时，如果观察时间超过 15 秒，会自动进行+2/DNF判罚。</li>
<li><strong data="opt_voiceIns">WCA观察语音提示</strong>. 在观察到8秒/12秒时发出语音提醒，模拟WCA比赛时裁判的提醒。</li>
<li><strong data="opt_voiceVol">语音音量</strong>. 上述提醒的音量。</li>
<li><strong data="opt_input">产生成绩通过</strong>. csTimer可以通过多种途径产生成绩，它支持手动输入，自动从Stackmat读取，连接到蓝牙智能魔方，或使用键盘控制的虚拟魔方，当然还包括最基础的键盘计时。</li>
<li><strong data="opt_intUN">输入整数时的单位</strong>. 当你在输入框中输入XXX时，它代表的时间时XXX秒还是X.XX秒还是0.XXX秒？</li>
<li><strong data="opt_timeU">计时器更新方式</strong>. 计时过程中主计时器如何更新。</li>
<li><strong data="opt_preTime">开始前按住空格时间（秒）</strong>. 在计时器变绿之前需要按住空格多久。</li>
<li><strong data="opt_phases">多阶段测速</strong>. 分阶段的数目，计时过程中可以按下任意按钮记录子阶段时间。</li>
<li><strong data="opt_stkHead">使用Stackmat状态信息</strong>. Stackmat会传输它的状态信息，如左右触碰区是否有感应等，csTimer可以利用这些信息，但由于数据传输差错，有的时候会产生意外行为。</li>
<li><strong data="opt_scrSize">打乱字体大小</strong>. 打乱文本的大小。</li>
<li><strong data="opt_scrASize">自动打乱字体大小</strong>. 打乱文本的大小将根据打乱公式的长度自动调整，这个选项和上一个选项共同生效。</li>
<li><strong data="opt_scrMono">等宽字体打乱</strong>. 使用等宽字体显示打乱公式。</li>
<li><strong data="opt_scrLim">限制打乱区的高度</strong>. 当打乱区域太高时，将会出现滚动条，以避免打乱面板继续升高。</li>
<li><strong data="opt_scrAlign">打乱区对齐方式</strong>. 整个打乱区域的对齐方式，包括打乱类型选项等。</li>
<li><strong data="opt_preScr">pre-scramble</strong>. 在打乱公式前的预转动，主要用于虚拟魔方和打乱图案。</li>
<li><strong data="opt_scrFast">四阶魔方使用快速打乱（非官方）</strong>. WCA官方的4x4x4打乱需要大量的计算资源，可以通过勾选此选项来启用4x4x4随即转动打乱代替。</li>
<li><strong data="opt_scrKeyM">标记打乱中的关键转动</strong>. 标记打乱中的关键步骤，例如对于SQ1打乱会标记处让形状离开正方形的那一步。</li>
<li><strong data="opt_scrClk">点击打乱时的动作</strong>. 当您点击打乱公式时触发的行为，复制打乱或生成下一个打乱公式。</li>
<li><strong data="opt_trim">首尾各删去几个成绩</strong>. 当计算去尾平均时从最好和最坏处舍弃的成绩比例。</li>
<li><strong data="opt_statsum">成绩列表前显示摘要</strong>. 在成绩列表前显示分组统计表。</li>
<li><strong data="opt_printScr">成绩统计中显示打乱</strong>. 在轮次统计中显示打乱公式。</li>
<li><strong data="opt_printDate">成绩统计中显示日期</strong>. 在轮次统计中显示还原时间日期。</li>
<li><strong data="opt_imrename">新建分组时重命名</strong>. 创建分组后立即重名该分组。</li>
<li><strong data="opt_scr2ss">改变打乱类型时新建分组</strong>. 当切换打乱类型时，将创建一个新的分组。</li>
<li><strong data="opt_statinv">倒序显示成绩列表</strong>. 倒叙显示成绩列表，从而最近的还原会显示在成绩列表的最下面。</li>
<li><strong data="opt_statclr">启用分组清空</strong>. 当禁用时，一个‘+’按钮（用于创建分组）会代替分组选择项边上的‘X’按钮，即当你点击这个按钮时会创建一个空的分组而不是删除整个分组。</li>
<li><strong data="opt_absidx">在统计报告中显示绝对索引</strong>. 在轮次统计中显示成绩的绝对位置而不是1~还原个数（如对于mo3就是1/2/3）。</li>
<li><strong data="opt_rsfor1s">点击还原序号时显示统计</strong>. 当点击成绩列表的第一列时，显示该单次还原的轮次统计信息。</li>
<li><strong data="opt_statal">统计指标</strong>. 统计表中的统计指标，如果需要自定义，目前支持aoX和boX。</li>
<li><strong data="opt_delmul">启用批量删除</strong>. 能够从某个成绩开始删除多个成绩，为了避免误解，这个选择的成绩会是所有删除成绩中最早的那个。</li>
<li><strong data="opt_disPrec">时间分布显示精度</strong>. 成绩分布工具的时间间隔。</li>
<li><strong data="opt_solSpl">逐步显示解法</strong>. 如果勾选，求解器会只显示解法长度，接着你可以一步一步查看解法，不勾选的话求解器则会直接显示完整的解法。</li>
<li><strong data="opt_imgSize">打乱图案大小</strong>. 设置打乱图案的大小。</li>
<li><strong data="opt_NTools">工具栏数量</strong>. csTimer支持同时显示至多4个工具。</li>
<li><strong data="opt_useKSC">使用键盘快捷键</strong>. 你可以使用快捷键切换打乱类型，产生下一个打乱，或在分组之间切换。</li>
<li><strong data="opt_vrcSpeed">VRC基础速度 (tps)</strong>. 虚拟魔方的基础转动速度，如果积累了多个转动待执行，虚拟魔方会加速转动。</li>
<li><strong data="opt_vrcMP">多阶段测速</strong>. 对于虚拟魔方和蓝牙魔法，csTimer支持自动多阶段拆分。</li>
<li><strong data="opt_giiVRC">显示虚拟蓝牙魔方</strong>. 当与蓝牙魔方连接时在主计时界面显示一个虚拟魔方。</li>
<li><strong data="opt_giiSD">保持几秒后标记已打乱</strong>. 对于蓝牙魔方，csTimer不知道哪些转动是打乱，哪些转动时还原。</li>
<li><strong data="opt_giiSK">使用空格标记已打乱</strong>. 通过空格标记蓝牙魔方为已打乱，此后的任何转动都会触发计时开始。</li>
<li><strong data="opt_giiSM">使用转动标记已打乱</strong>. 在蓝牙魔方上执行特定转动序列就会标记当前状态为已打乱。</li>
<li><strong data="opt_giiBS">标记已打乱时发出嘀声</strong>. 当识别到某个标记已打乱的信号时发出滴声。</li>
<li><strong data="opt_giiRST">连接时重置蓝牙魔方</strong>. 当连接蓝牙魔方时，csTimer会检查魔方是否还原，如果没有，可能是由于一些硬件问题也可能是魔方真的没还原。</li>
<li><strong data="opt_giiAED">自动硬件错误检测</strong>. 有一些蓝牙魔方会因为硬件问题丢失一些转动，csTimer会试着发现这样的情况。</li>
</ul>
<h2>工具说明</h2>
<ul>
<li><strong data="tool_scrgen">打乱生成器</strong>. 通过这个工具，你可以一键批量生成最多999个打乱。</li>
<li><strong data="tool_cfm">确认成绩</strong>. 这个工具用来查看当前还原，包括它的备注、打乱公式、还原日期及实时重构（如果可用的话），你在成绩列表中点击某个还原时弹出的也是这个对应的对话框。</li>
<li><strong data="tool_hugestats">跨分组统计</strong>. 通过这个工具你可以做一些跨分组的统计。</li>
<li><strong data="tool_stats">统计数据</strong>. 与成绩列表面板里的统计表类似的统计表。</li>
<li><strong data="tool_distribution">时间分布</strong>. 时间分布及稳定性统计工具。&lt;X Y/Z代表当前分组中一共有Y个还原小于X秒，最近的所有Z个还原都小于X秒。</li>
<li><strong data="tool_trend">时间趋势</strong>. 显示当前分组中所有成绩的趋势曲线。</li>
<li><strong data="tool_dlystat">Daily Statistics</strong>. 以天/周/月/年的维度统计还原次数。</li>
<li><strong data="tool_image">打乱图案</strong>. 打乱图案，用于确认打乱是否正确，支持所有WCA官方项目。</li>
<li><strong data="tool_roux1">求解器 &gt; 桥式S1</strong>. 桥式第一阶段求解器，还原一个1x2x3块。</li>
<li><strong data="tool_eoline">求解器 &gt; EOLine</strong>. EO line求解器，还原所有12个棱块的方向，及DF和DB棱的位置。</li>
<li><strong data="tool_cross">求解器 &gt; 十字</strong>. 十字求解器，还原DF、DL、DR、DB四个棱块。</li>
<li><strong data="tool_222face">求解器 &gt; 二阶一面</strong>. 二阶一面求解，还原二阶魔方的一面。</li>
<li><strong data="tool_333cf">求解器 &gt; Cross + F2L</strong>. 十字及F2L求解，通过计算机搜索求解十字和四组F2L，因此解法可能和人类解法大相径庭。</li>
<li><strong data="tool_333roux">求解器 &gt; Roux S1 + S2</strong>. 桥式第一阶段和第二阶段求解器，它首先在左边求解一个1x2x3块，然乎再右边使用R, M, r, U扩展出另一个1x2x3块。</li>
<li><strong data="tool_333petrus">求解器 &gt; 2x2x2 + 2x2x3</strong>. Petrus第一阶段和第二阶段求解器，它首先在左边求解一个2x2x2块，然后再把它扩展成2x2x3。</li>
<li><strong data="tool_333zz">求解器 &gt; EOLine + ZZF2L</strong>. EOLine及ZZF2L求解器，它首先求解出一个EOLine，然后求解左右两个1x2x3块之一，接着求解另一个1x2x3块。</li>
<li><strong data="tool_sq1cs">求解器 &gt; SQ1 S1 + S2</strong>. SQ1阶段1及阶段2求解器，它首先计算SQ1的复形，然后分离U面与D面色块。</li>
<li><strong data="tool_pyrv">求解器 &gt; Pyraminx V</strong>. 金字塔V求解，它还原3个角块和两个棱块，从而形成一个‘V’图案。</li>
<li><strong data="tool_skbl1">求解器 &gt; Skewb Face</strong>. 斜转一面求解，它会求解斜转的一层，更具体地说，围绕1个中心还原4个相邻的角块。</li>
<li><strong data="tool_giikerutil">蓝牙魔方</strong>. 用于蓝牙魔方的辅助工具，可以显示当前状态、电量、实时解法重构等。</li>
<li><strong data="tool_if">InsertionFinder</strong>. 插入查找工具，用于最少步。</li>
<li><strong data="tool_mtrnm">节拍器</strong>. 节拍器，除了可以按特定频率发出滴声，你还可以让它在还原开始后的特定时间发出滴声。</li>
<li><strong data="tool_onlinecomp">线上比赛</strong>. 在线比赛，你可以用WCA账号登陆，然后和全世界的魔方速拧玩家用同一组打乱比赛。</li>
<li><strong data="tool_stackmatutil">stackmat</strong>. 用于Stackmat的辅助工具，可以显示状态、信号功率、噪声等。</li>
</ul>
<h2>链接</h2>
<ul>
<li><a class="click" href="https://cubingchina.com/">粗饼 中国魔方赛事网</a></li>
<li><a class="click" href="/new/">csTimer测试版</a></li>
<li><a class="click" href="/src/">csTimer测试版未压缩</a></li>
<li><a class="click" href="https://github.com/cs0x7f/cstimer">csTimer源代码</a></li>
<li><a class="click" href="/old3/">csTimer version 2015.12.12</a></li>
<li><a class="click" href="/old2/">csTimer version 2012.3.15</a></li>
<li><a class="click" href="/old/">csTimer version 2012.2.29</a></li>
</ul>
<h2>更多配色方案</h2>
<?php include('color.php') ?>
<div class="donate" style="line-height:1.5em;">
<p>感谢您愿意支持csTimer！ 您的捐赠将用于支持我们后续的开发和维护费用。</p>
<p>如果您希望通过PayPal为我们提供捐赠，请单击下面的按钮或通过<a class="click" href="https://www.paypal.me/cs0x7f">PayPal.me</a></p>
<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
<input type="hidden" name="cmd" value="_s-xclick">
<input type="hidden" name="hosted_button_id" value="NW25HME3QUEZY">
<input type="image" src="data:image/gif;base64,R0lGODlhkAAvAPc/AHZ2dnWky/7ou//UkiosLf7iqwBXn87e7aempjir4v/25pO20/+xOM6qkepCOTBps+vr7C1stIODgyVCa9ft+O6dSfnXu8/Pzr60lYzN6+pXVr/W6f7en/+vNPODacU1PSGX1J6jmzN1ttSkVO+AM/jNtv+tL//JdUBedarL42lXXnJwa/TBjPWzhO7c1I92RP3l2kxjhuPi4yKh3GbC7mJhUf/tyv+6Tvzm5Z7C3v7fo3mJov7z8giU146Ui5kAAN7Jm7W8yH+Mi+7VpP+pJkW16lBZVMro9mG34r65oufw+chIUf7SjGvG8P+rKiV1u3+JhK6rlf/Gbf/Me97NoxGb2DBUc//CY5OTk/7Yk/Omd++nNyWExpunuFSu3QCH06PZ8u7csypyuF6+7PX8/Wd6l/+0Ps7Do6yNRPuxN7vi9v62RFBqelG15nCBhr+OPBA+at+dNJ9/QyN9wCtwtyiMzEBRV2B1gP7ZmI+csSJ7v3B/gv+6UQwOD56fjP6zPmB0fkBgef64ST9XfYBvSXBpTRA7Y/+/Wf/w0//z3C48cv+9Vv/gsP/67/7pwf/sz//9+f7mtf7ksP7gp+yRM+gzMcnJyWpqavb29fn5+vLx8dnZ2dLS0tXV1d3d3Rk3ZUNERUCBt2g5Xu7ZqyBsq2CWw/Lz98iBP6+FPsXL1Lm5ucHBwYs4UpyamY1nU+Xn7Y6NjP/nw/GtZrKxsYB3WvydIRBhor+YVO5mZUBVYOmmqe7Tm/FoOOaNj3BjY6uzwPKYWSBJb1xTRP/363CCi/bImc+UNeKXTP3w5v748vCmWc7Am2FlYcm8vP/lu1CMvVBeYPqmGsuPWN/q8924cpKMguvKqqWvva6wpPvfzMTIznBqUv/+/bLN5v+3SDBKWzJMdOrDne+yUNdnbTCGxtja4T92mpW93//CYCeFx97Stt7Qq++OVPCIQP/bnZ+HV+i8kPOrhvipkPK1nHKCnVW36Fe46ByJy+WnauHSxyUaBr+RRAAzZv+ZM////8wAACH5BAEAAD8ALAAAAACQAC8AAAj/AH8IHEiwoEGD/RIqXMiwocOHECNKnCjxoMWLGDNa7GeGSaxhkEKKHEmypMmTKFOqXElyWCwm3vppnEkTYz8+zhrp3Mmzp8+fQIMKHUq0qDM+Mmsqpdkvi4KnUKNKnUq1qtWrWLNqjeou6dKvB/sxSkS2rNmzaNOqXcu2rdu3aBl5BUu33wlEePPq3cu3r9+/gAMLHux3yly6S504ssG4sePHkCNLnky5suXLk00gBtsPnaPPoEOLHh2Cn2nTVrCNXs36c2k4oNXxg926tu3W6A5v1khEioDfwIMLH06MX7BAgYLNDjO8uXMBxfmF+J2EX6Dn2LNjl0Jkd81+HQ5F/xpPvrz584H4JSFvRf34dUnOnJ9fPr318UL4CSEfJsl6+gAGeB46HejmXVh/3MCEJAw26OCDD5o2SoPKnTGKffxYMaEP/LjB4Chw8HNGhKetIwkb/ETBoBunwRECg9YxeId+koAIx4QQ5thgFjf8YeCBBXEkyA14FGDkkUgmeeQyGRpJxYzBFMDiHRik50MBGPCDgpH5uZEkkyjMKEQByo1SwIxWROFHiFQUYAUcBVBh2pj5janknUfqwIcgZvwI5ED9rCGoIFlMYuihiCZqKIenmQYHBokCwg8UkwyhZaVwwDFEohzukWUwlgYzCRCzbTrJHvz4MAkK/EwiKT+ADP+RqamK1jpJFnwIuoaff/7AkRnAmiFFFjoUa+yxyEpqBQrMQgFEsVGwehoGxZqmAxSpIquDpH7ooByqbOjAISDGYguFDqwCAQeKKGC7h7bwFuvOCcECy+uf/TCg774MHDJFFhwELPDAAbeHAcEcZAmHH6Tys0vArO4ChxUIc9DeMhxgaxoUGU8qMIp+dMwqBii8yQ8QFROcxRTo8LvvvUD2Y0IHNNds8w0456zzDabtjDMt/NBywy38TJAzM/zkws8tPvPMD84jnMb0O/xAAzU/hohzA9BJ36A0P8w0vTMDNpdtAswH9uOECWy37fbbb7/Bjx1wmyAH1oQYMnfbhJj/ZkTdctPNthGmsb2F3jUUorccbN/NDyom1GBaHHVXXrcTaKftxOacd+6556jY8cLnmxNuR+iFcC63IXGQHvrom4deA+fGEM7PN6jQbocRm8thByGkBx985mkTYfzxyCev/PLMIy85Ic1HL/301CdPfNouZ6/99tzru882WG/R/fjkl1/+9Wmvscj67Lfv/vvwxw9N0SPEb//9+Odv/669MnXFCQAMoAAHSMACGvCACEygAhdIwCugD19TGIAEJ0jBClrwghjMoAY3yMEOUtAw/VtKP6TAiBKa8IQoTKEKV8jCFrrwhTAsoRQeGMJa9MMjj8ihDnfIwx768IdADKIQ/4cIxJf0oxYhRIwNKcLEJjrxiUxMohSnSMUqWvGKWMyiFrfIxS568YtgDKMYx0jGMoZREWhMoxrXuMaB+OONcIyjHOU4kHqMgQZjqEcREjADENSBC3oQAx0iMJALWOKQiEykIhF5gYE0Y5GQVGQzrsjGSlbSjXPM5BwHcscm4LENfPQjIJ8wyIGsQpOo9McqTJlKTa7SimgUxQcqQcsPiAKNKjgFJXZ5ChWgEZOtzCQnm0DMPIbyj3ogJSEFoopgzlEVA1FFJqZJzWpak5rQhCUraMlNWrLCFbsM5y5doQhgOjOOnKRBMUHZR2SS8gEDmcU54ziLeGLinvjMpz7xWf9PK4qim910AAnEKU4VDAQPaYgGIvxhC1uUwgD+CIUBDEAKf+Rgom/kZAIoAAY1qAEMYMhACnJwjg3QAZ4CQcA84YiAgSBAEzCNqUxnGtOWWvEDuNCABgDKC15Q4hjKEGcFpOHGBaCBCRcNgEQ3YAARbCAH/iDFRDfgD076Awz+OEIGyIAEf2xACf7ohj9Q+gOVgkICAFiBPyQAihJooQGwwAIo5soMf9i0rBCIQQx2AIFfxCAVqfhrKnawgy6UIQ8QuCsVl+CPV+BAF73QhQt0UQJ5hMMULrAGPIpRDBewwI0HsAU1JDoNih5goqUwBVP9YYAFVFUgM0AlN6bxRrL/tsIfc+0DAUBBAH+ww60ECC5ve9uKgbQCAp8owwQgMIgJlCEIn5hAHvQ6gQmUAwLFteI43sgDf5iCB694xRtlYAF8aOKNyCiHLDBpC3MYIBSlDYU/UiDVUjzDAAEwQCle+4MZ9KAKRZhBFb7wBVHqgQ4nHQgW/BHc3uqWGVqYRzxWAABQMJgAmsCCgmXwCXp84hqfiMEnupDcEMeguuWQgYat2AvvvhEHb3wFDJLRgGQgwxT+yEcy/FEBTD4UokwNQABSkF8RTHSiIuAvCHrgBQocwavnOMA53khbssJipW+ExUBgweHmxmAQOwCHiGWg170OYhCd0LIVl4ALBzhA/wM53akHfHqMY8hCFhVQhixOAUyK+mMBrT0yKe4bgA1IlL91uIcX4kiGOZJVAnJshTCqsYIV6EMYNYAjDIAhgYFIwBOgDrUntPGLX4ha1J32J0C5KVCChtOgAsEyHAfChXTYOh3kEIEYRMDrB4jgAY8+JzJaQAISpPoHEtiEspfN7GYv+9hUVMQ2V/1NV1OCnOZc6UDmwO05JFMMEYgAsMdNVgAE0wJaKHaxATAQAHTi3fCOt7zhzW5YKkKW3LQlLnXJS1+WM9ayriodfvCEghtckIMkd7k1mQwLtKAd6lZ3vX8AAE5Y/OIYz/jFJx5tS3r8lwCX9Q8GLoaSlxzB4UFWOFnV+sZkZKMELQBGxGdOghUMZAUXyLnOd85zndvc3h+3ZLbnOZBwGz3lKi/3JZbO9KY7nekT98XTp+50X9AlIAA7" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
</form>
<p>你也可以通过支付宝转账的方式为我们提供资助，请付款至该账户，或扫描后面的二维码：cs0x7f@gmail.com</p>
<p><img style="display:inline-block; width:10em; height:10em;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABsCAIAAAAABMCaAAABoklEQVR42u3aUY6DMAwFQO5/6e0JViq1XwjO5LOqIAxSHJ5z/RnlcSGACHEk4hUY/974i/9/83vlXl3PBREixPmIpYX25oNVrl95GV3PBREixLMQ05OuXD9RoG5fByJEiBCfnDREiBAhDkashAulTTJEiBAhbhJAJIKM41IciBAhLkOMNHQ2+P313T6IECEuQ9z60FBTcYjMDSJEiCMRKx//K4tMYvNcOkwAESLEoxBXNukTwW1XKAsRIsRzEZ9CqUAkClQpxYEIEeIYxApo1+b2qeK2xRcLRIgQH0dMLPaVSVeg080piBAhzkdMB59dQWn6BTxWnSFChLgtYrqAlCYdPmwVCWUhQoQ4HjFRZBIHCBIbeIgQIUJs/WhPLPDhxhlEiBDPQkyPdIFKo99OtiFChPhqxHRzZ+Xho3SwAhEixLMQ0wt/2wOEN+dtoSxEiBDHIO7QhFrZtLr94iFChAgx1AzqKmgrwwiIECFC7ERMh69dG2yIECFCXBFAVIpAegP/mhQHIkSIUcSVjar0hjkeJEOECHEkovFjIUUAEeKU8QE0apeVMce/LwAAAABJRU5ErkJggg=="></p>
<p>再次感谢您的捐赠！</p>
</div>