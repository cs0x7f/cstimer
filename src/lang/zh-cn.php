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
<li><strong data="opt_zoom">缩放</strong>. You can adjust sizes of all elements by this option.</li>
<li><strong data="opt_font">选择计时器字体</strong>. Font of the main timer.</li>
<li><strong data="opt_uidesign">界面设计为</strong>. You can switch ui design to material-like, or hide shadows by this option.</li>
<li><strong data="opt_view">界面风格显示为</strong>. Switch between desktop and mobile views.</li>
<li><strong data="opt_wndScr">打乱区显示样式</strong>. Make scramble panel embedded into background.</li>
<li><strong data="opt_wndStat">统计区显示样式</strong>. Make list times panel embedded into background.</li>
<li><strong data="opt_wndTool">工具区显示样式</strong>. Make tool panel embedded into background.</li>
<li><strong data="opt_bgImgO">背景图片不透明度</strong>. Opacity of the background image.</li>
<li><strong data="opt_bgImgS">背景图片</strong>. You can select your own image as the background image, however, only https urls are available due to security constraint of the browser.</li>
<li><strong data="opt_timerSize">计时器大小</strong>. Set the size of main timer.</li>
<li><strong data="opt_smallADP">小数点后使用小字体</strong>. Use a smaller font size after the digital point in main timer.</li>
<li><strong data="opt_useMouse">启用鼠标计时</strong>. Use mouse to start timer, keyboard-trigger will also be available.</li>
<li><strong data="opt_useIns">使用WCA观察</strong>. Enable WCA inspection procedure, which is a 15-second countdown, auto +2/DNF penalty will also be enabled if you inspecting more than 15 seconds.</li>
<li><strong data="opt_voiceIns">WCA观察语音提示</strong>. Alert at 8s/12s of inspection, to simulate the alert from judge in WCA competitions.</li>
<li><strong data="opt_voiceVol">语音音量</strong>. Voice level of the alert above.</li>
<li><strong data="opt_input">产生成绩通过</strong>. csTimer is able to add solves by several ways, it supports manually input, automatically record from a stackmat timer, connect to a bluetooth smart cube or play virtual Rubik's cube, besides keyboard timing.</li>
<li><strong data="opt_intUN">输入整数时的单位</strong>. When you type an integer XXX in the input box, what does it mean, XXX second or XXX centisecond or XXX millisecond?</li>
<li><strong data="opt_timeU">计时器更新方式</strong>. How timer is updated when timing.</li>
<li><strong data="opt_preTime">开始前按住空格时间（秒）</strong>. How long the space bar should be held before the timer turns green.</li>
<li><strong data="opt_phases">多阶段测速</strong>. Number of phases, press any key to mark a split point when timing.</li>
<li><strong data="opt_stkHead">使用Stackmat状态信息</strong>. Stackmat will report its state, e.g. whether left or right area is touched, then csTimer is able to use these information, however, the data error might occur and cause unexpected behavior.</li>
<li><strong data="opt_scrSize">打乱字体大小</strong>. Size of the scramble text.</li>
<li><strong data="opt_scrASize">自动打乱字体大小</strong>. The size of the scramble text will be automatically adjusted by the length of the scramble, which works with together previous option.</li>
<li><strong data="opt_scrMono">等宽字体打乱</strong>. Use monospaced font for scramble text.</li>
<li><strong data="opt_scrLim">限制打乱区的高度</strong>. When the scramble area is too high, a scroll bar will occur to avoid the raising of the scramble panel.</li>
<li><strong data="opt_scrAlign">打乱区对齐方式</strong>. Alignment of the whole scramble area, include scramble type selector.</li>
<li><strong data="opt_preScr">pre-scramble</strong>. Pre moves before scramble, which is used for virtual Rubik's cube and scramble image.</li>
<li><strong data="opt_scrFast">四阶魔方使用快速打乱（非官方）</strong>. WCA official 4x4x4 scramble requires huge computation resources, select this option to use a random-move scramble for 4x4x4 instead.</li>
<li><strong data="opt_scrKeyM">标记打乱中的关键转动</strong>. Mark a key move in the scramble, e.g. the move that take the state away from square shape in SQ1 scrambles.</li>
<li><strong data="opt_scrClk">点击打乱时的动作</strong>. Behavior when you click on the scramble text, copy scramble or generate next scramble.</li>
<li><strong data="opt_trim">首尾各删去几个成绩</strong>. Number of solves trimmed at head and tail of solves when calculating average.</li>
<li><strong data="opt_statsum">成绩列表前显示摘要</strong>. Show the statistics table before time list.</li>
<li><strong data="opt_printScr">成绩统计中显示打乱</strong>. Print scramble in round statistics dialog.</li>
<li><strong data="opt_printDate">成绩统计中显示日期</strong>. Print solving date in round statistics dialog.</li>
<li><strong data="opt_imrename">新建分组时重命名</strong>. Immediately rename a session after creating it.</li>
<li><strong data="opt_scr2ss">改变打乱类型时新建分组</strong>. When switching scramble type, a new session will be created.</li>
<li><strong data="opt_statinv">倒序显示成绩列表</strong>. Invert the time list, thus, latest solves will at the bottom of the time list.</li>
<li><strong data="opt_statclr">启用分组清空</strong>. When disabled, an '+' button (for session creating) will replace the 'X' button besides the session selector, thus, when clicked, a new empty session will be created instead of clearing the whole session.</li>
<li><strong data="opt_absidx">在统计报告中显示绝对索引</strong>. Show absolute index in the session instead of 1 to number of solves (e.g. 1/2/3 for mo3) in round statistics.</li>
<li><strong data="opt_rsfor1s">点击还原序号时显示统计</strong>. When click the first row of the time list, show a round statistics for a single solve.</li>
<li><strong data="opt_statal">统计指标</strong>. Statistical indicator for the statistics table, when customizing, aoX and moX are available.</li>
<li><strong data="opt_delmul">启用批量删除</strong>. Able to delete multiple solves starts from a solve, for avoid misunderstand, the selected solve will be the oldest solve to delete.</li>
<li><strong data="opt_disPrec">时间分布显示精度</strong>. Time interval for the time distribution tool.</li>
<li><strong data="opt_solSpl">逐步显示解法</strong>. If selected, only the length of a solution from a solver is displayed, and you can view the solution one move by one move, otherwise, the whole solution is displayed.</li>
<li><strong data="opt_imgSize">打乱图案大小</strong>. Set the size of scramble image.</li>
<li><strong data="opt_NTools">工具栏数量</strong>. csTimer is able to show up to 4 tools simultaneously.</li>
<li><strong data="opt_useKSC">使用键盘快捷键</strong>. Use keyboard shortcut to switch scramble type, generate next scramble, switch between sessions, etc.</li>
<li><strong data="opt_vrcSpeed">VRC基础速度 (tps)</strong>. Base turn speed of the virtual Rubik's cube, the turn will be speed up if there are multiple moves to turn.</li>
<li><strong data="opt_vrcMP">多阶段测速</strong>. Automatic multi-phase split for virtual Rubik's cube and bluetooth cube.</li>
<li><strong data="opt_giiVRC">显示虚拟蓝牙魔方</strong>. Show a virtual Rubik's cube in the main timer when connecting to a bluetooth cube.</li>
<li><strong data="opt_giiSD">保持几秒后标记已打乱</strong>. For a bluetooth cube, csTimer cannot know whether a move is from for scrambling or solving.</li>
<li><strong data="opt_giiSK">使用空格标记已打乱</strong>. When the space bar is pressed, the bluetooth cube is marked scrambled, any turns after that will treated as the start of timing.</li>
<li><strong data="opt_giiSM">使用转动标记已打乱</strong>. Use specific move sequences on the bluetooth cube to mark scrambled.</li>
<li><strong data="opt_giiBS">标记已打乱时发出嘀声</strong>. Beep when some of scramble-finish signal is triggered.</li>
<li><strong data="opt_giiRST">连接时重置蓝牙魔方</strong>. When connecting to a bluetooth cube, csTimer will detect whether it is solved, if not, there might be some hardware problems or the cube is really unsolved.</li>
<li><strong data="opt_giiAED">自动硬件错误检测</strong>. Some bluetooth cubes will loss some of moves due to hardware failure, csTimer will try to detect such hardware.</li>
</ul>
<h2>工具说明</h2>
<ul>
<li><strong data="tool_scrgen">打乱生成器</strong>. TO_BE_FILLED</li>
<li><strong data="tool_cfm">确认成绩</strong>. TO_BE_FILLED</li>
<li><strong data="tool_hugestats">跨分组统计</strong>. TO_BE_FILLED</li>
<li><strong data="tool_stats">统计数据</strong>. TO_BE_FILLED</li>
<li><strong data="tool_distribution">时间分布</strong>. TO_BE_FILLED</li>
<li><strong data="tool_trend">时间趋势</strong>. TO_BE_FILLED</li>
<li><strong data="tool_dlystat">Daily Statistics</strong>. TO_BE_FILLED</li>
<li><strong data="tool_image">打乱图案</strong>. TO_BE_FILLED</li>
<li><strong data="tool_roux1">求解器 &gt; 桥式S1</strong>. TO_BE_FILLED</li>
<li><strong data="tool_eoline">求解器 &gt; EOLine</strong>. TO_BE_FILLED</li>
<li><strong data="tool_cross">求解器 &gt; 十字</strong>. TO_BE_FILLED</li>
<li><strong data="tool_222face">求解器 &gt; 二阶一面</strong>. TO_BE_FILLED</li>
<li><strong data="tool_333cf">求解器 &gt; Cross + F2L</strong>. TO_BE_FILLED</li>
<li><strong data="tool_333roux">求解器 &gt; Roux S1 + S2</strong>. TO_BE_FILLED</li>
<li><strong data="tool_333petrus">求解器 &gt; 2x2x2 + 2x2x3</strong>. TO_BE_FILLED</li>
<li><strong data="tool_333zz">求解器 &gt; EOLine + ZZF2L</strong>. TO_BE_FILLED</li>
<li><strong data="tool_sq1cs">求解器 &gt; SQ1 S1 + S2</strong>. TO_BE_FILLED</li>
<li><strong data="tool_pyrv">求解器 &gt; Pyraminx V</strong>. TO_BE_FILLED</li>
<li><strong data="tool_skbl1">求解器 &gt; Skewb Face</strong>. TO_BE_FILLED</li>
<li><strong data="tool_giikerutil">蓝牙魔方</strong>. TO_BE_FILLED</li>
<li><strong data="tool_if">InsertionFinder</strong>. TO_BE_FILLED</li>
<li><strong data="tool_mtrnm">节拍器</strong>. TO_BE_FILLED</li>
<li><strong data="tool_onlinecomp">线上比赛</strong>. TO_BE_FILLED</li>
<li><strong data="tool_stackmatutil">stackmat</strong>. TO_BE_FILLED</li>
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
<input type="image" src="data:image/gif;base64,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" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
</form>
<p>你也可以通过支付宝转账的方式为我们提供资助，请付款至该账户，或扫描后面的二维码：cs0x7f@gmail.com</p>
<p><img style="display:inline-block; width:10em; height:10em;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABsCAIAAAAABMCaAAABoklEQVR42u3aUY6DMAwFQO5/6e0JViq1XwjO5LOqIAxSHJ5z/RnlcSGACHEk4hUY/974i/9/83vlXl3PBREixPmIpYX25oNVrl95GV3PBREixLMQ05OuXD9RoG5fByJEiBCfnDREiBAhDkashAulTTJEiBAhbhJAJIKM41IciBAhLkOMNHQ2+P313T6IECEuQ9z60FBTcYjMDSJEiCMRKx//K4tMYvNcOkwAESLEoxBXNukTwW1XKAsRIsRzEZ9CqUAkClQpxYEIEeIYxApo1+b2qeK2xRcLRIgQH0dMLPaVSVeg080piBAhzkdMB59dQWn6BTxWnSFChLgtYrqAlCYdPmwVCWUhQoQ4HjFRZBIHCBIbeIgQIUJs/WhPLPDhxhlEiBDPQkyPdIFKo99OtiFChPhqxHRzZ+Xho3SwAhEixLMQ0wt/2wOEN+dtoSxEiBDHIO7QhFrZtLr94iFChAgx1AzqKmgrwwiIECFC7ERMh69dG2yIECFCXBFAVIpAegP/mhQHIkSIUcSVjar0hjkeJEOECHEkovFjIUUAEeKU8QE0apeVMce/LwAAAABJRU5ErkJggg=="></p>
<p>再次感谢您的捐赠！</p>
</div>