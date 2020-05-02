<h1>csTimer v <?php echo $version;?> - 專業的魔術方塊速解計時器</h1>
<?php include('lang.php') ?>
<h2>簡介</h2>
<p>csTimer是專為速解魔術方塊打造的計時器，它包含了：</p>
<ul>
<li>非常多種打亂方法，包括<strong>所有WCA的官方項目</strong>、其他變體方塊、某些項目的<strong>訓練用打亂</strong>(如<strong>F2L、OLL、PLL、ZBLL</strong>，提供篩選case的功能)等。</li>
<li>許多統計功能，還有<strong>多段測速</strong>、<strong>無限量的測速階段</strong>，也支援階段的分割/合併等。</li>
<li>多種速解小幫手，像是<strong>十字、Xcross、2x2x2一面、Skewb一面、sq-1回正</strong>讓練習變得更簡單。</li>
<li>其他好用工具，像顯示打亂後的樣子、8秒與12秒的提醒、節拍器、批次打亂生成等。</li>
<li>備份功能。為了以防資料不見，可以把成績下載到電腦中、存在csTimer伺服器裡或存在Google雲端空間。</li>
</ul>
<p>csTimer支援大多數的桌面、手機與平板瀏覽器。你可以把csTimer加到手機的主畫面中，運作起來就像APP一樣。</p>
<p>csTimer使用了瀏覽器的快取，代表只有第一次上線的時候會佔流量。在那之後，即使要離線使用也沒關係。(備份等功能除外)</p>
<h3>版權</h3>
<p>csTimer是使用GPLv3的開放源始碼軟體。 如果對csTimer有任何的建議或問題，可以到<a class="click" href="https://github.com/cs0x7f/cstimer/issues">這裡</a>提交</p>
<p>作者：<a href="mailto:cs0x7f@gmail.com">陳霜(陈霜)(cs0x7f@gmail.com)</a></p>
<p>使用者介面設計：<a href="mailto:liebe7@126.com">張悅(张悦)(liebe7@126.com)</a></p>
<h2>基本功能</h2>
<ul>
<li><strong>如何開始計時</strong> - 按著空白鍵(或是同時按下左右Ctrl鍵，用觸控螢幕的話是按著螢幕)直到數字變成綠色。一旦手離開，計時器就會開始，直到任何鍵被按下。成績會記錄在瀏覽器中。</li>
<li><strong>使用者介面解說</strong> - 在csTimer的圖示附近有六個按鈕，分別是設定、匯出、打亂、成績列表、資助我們、工具。點擊<strong>打亂</strong>、<strong>成績列表</strong>、<strong>工具</strong>會打開相對應的面板。</li>
<li><strong>打亂面板</strong> - 在打亂面板中，你可以選擇打亂的形式、設定打亂的長度、(如果支援的話)篩選case、檢視上一個打亂、產生下一個打亂。</li>
<li><strong>成績列表</strong> - 在成績面板中，可以按「階段」按鈕打開階段管理員。在管理員中，可以選擇/增加/刪除階段、清空階段、檢視目前的單次/平均、檢視最佳單次/平均，與檢視完整的成績紀錄。</li>
<li><strong>工具</strong> - 在工具面板中，可以選擇要使用的輔助工具，如劃出打亂圖形、打亂生成器、速解小幫手、統計功能等。</li>
</ul>
<h2>快捷鍵</h2>
<table class="table" style="display: inline-block;">
<tr><th>按鍵</th><td>功能</td></tr>
<tr><th>Alt+1</th><td>切換到Square-1打亂。</td></tr>
<tr><th>Alt+2~7</th><td>切換到2x2x2~7x7x7打亂。</td></tr>
<tr><th>Alt+P/M/C/S</th><td>切換到金字塔/十二面體/魔錶/斜轉打亂。</td></tr>
<tr><th>Alt+I</th><td>切換到輸入模式。</td></tr>
<tr><th>Alt+D</th><td>清空本階段的紀錄。</td></tr>
<tr><th>Alt+Z</th><td>刪除最後一個成績。</td></tr>
<tr><th>Alt+上/下</th><td>上一個/下一個階段。</td></tr>
<tr><th>Alt+左/右</th><td>顯示上一個/下一個打亂。</td></tr>
<tr><th>Ctrl+1/2/3</th><td>這一轉是正常/+2/DNF</td></tr>
</table>

</table>

<table class="table" id="vrckey" style="display: inline-block;">
<tr><th colspan=10>虛擬方塊按鍵</th></tr><tr>
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

<h2>設定</h2>
<ul>
<li><strong data="opt_ahide">計時期間隱藏所有物件</strong>. 在計時的時候隱藏所有物件。</li>
<li><strong data="opt_useMilli">精確到毫秒</strong>. 顯示到毫秒。無論這個選項有沒有被勾選，csTimer的精確度都是1毫秒。</li>
<li><strong data="opt_timeFormat">時間格式</strong>. 顯示成績的格式。</li>
<li><strong data="opt_atexpa">(每100轉)自動匯出</strong>. 如果勾選的話，csTimer會每100轉輸出一次成績到電腦、csTimer伺服器，或Google雲端。</li>
<li><strong data="opt_expp">載入更舊的數據</strong>. 如果上傳了超過一個備份檔，可以在這裡匯入最近的10個檔案。如果你不小心匯入了空檔案的話，這個選項可以協助你取回之前的資料。</li>
<li><strong data="opt_useLogo">圖標中的提示訊息</strong>. csTimer的圖示會在破PB時以跑馬燈的形式顯示資訊。</li>
<li><strong data="opt_showAvg">顯示「平均」標籤</strong>. 在計時器下方會顯示兩行平均，預設是5次平均與12次平均。</li>
<li><strong data="opt_zoom">縮放</strong>. 在這個選項中可以調整所有物件的大小。</li>
<li><strong data="opt_font">計時器字體</strong>. 計時器的字型。</li>
<li><strong data="opt_uidesign">UI設計</strong>. 在這個選項中可以調整UI的設計，像去除陰影或材質設計。</li>
<li><strong data="opt_view">UI 介面樣式</strong>. 切換成桌面板或行動版。</li>
<li><strong data="opt_wndScr">打亂面板顯示樣式</strong>. 讓打亂面板嵌入到背景中。</li>
<li><strong data="opt_wndStat">統計面板顯示樣式</strong>. 讓成績列表嵌入到背景中。</li>
<li><strong data="opt_wndTool">工具面板顯示樣式</strong>. 讓工具面板嵌入到背景中。</li>
<li><strong data="opt_bgImgO">背景圖片不透明度</strong>. 背景圖片的透明度。</li>
<li><strong data="opt_bgImgS">背景圖片</strong>. 你可以自訂背景圖片，但由於瀏覽器安全性的關係，只能嵌入https的圖片連結。</li>
<li><strong data="opt_timerSize">計時器大小</strong>. 計時器的字體大小。</li>
<li><strong data="opt_smallADP">小數點後使用小型字體</strong>. 小數點後的字體縮小顯示。</li>
<li><strong data="opt_useMouse">使用滑鼠計時</strong>. 用滑鼠控制計時器，開啟這個選項後依然可以使用鍵盤。</li>
<li><strong data="opt_useIns">使用WCA觀察</strong>. 使用WCA的15秒觀察，如果超過15秒的話會自動+2/DNF。</li>
<li><strong data="opt_voiceIns">WCA觀察人聲提醒</strong>. 為了符合WCA的裁判規定，在觀察8秒/12秒時提醒。</li>
<li><strong data="opt_voiceVol">語音音量</strong>. 上述提醒的音量大小。</li>
<li><strong data="opt_input">輸入時間使用</strong>. csTimer提供其他紀錄成績的方法，包括手動輸入、從比賽用計時器輸入、使用藍芽連接的智慧方塊，或是在螢幕中顯示虛擬方塊。</li>
<li><strong data="opt_intUN">輸入整數時的單位</strong>. 輸入整數XXX的時候，是代表XXX秒、XXX百分秒還是XXX毫秒？</li>
<li><strong data="opt_timeU">時間更新頻率</strong>. 計時器的更新頻率。</li>
<li><strong data="opt_preTime">按壓空白鍵時間(秒)</strong>. 在計時開始前要按壓多久。</li>
<li><strong data="opt_phases">多階段計時</strong>. 分段計時的分段數。在計時中按任意按鍵可以進入下一階段。</li>
<li><strong data="opt_stkHead">使用stackmat狀態資訊</strong>. SS計時器會輸出它的狀態，像左右邊有沒有被接觸到等等。csTimer可以這些藉由資訊來判斷計時器是否正常。</li>
<li><strong data="opt_scrSize">打亂字體大小</strong>. 打亂的字體大小。</li>
<li><strong data="opt_scrASize">自動調整打亂字體大小</strong>. 打亂的字體大小會隨打亂長度而改變。這個選項跟上一個選項會互相配合。</li>
<li><strong data="opt_scrMono">等寬字體打亂</strong>. 用等寬字體顯示打亂。</li>
<li><strong data="opt_scrLim">限制打亂區高度</strong>. 如果打亂面板的位置太高的話，會顯示捲軸以避免打亂區出格。</li>
<li><strong data="opt_scrAlign">打亂對齊</strong>. 打亂區與打亂選擇器的對齊狀況。</li>
<li><strong data="opt_preScr">pre-scramble</strong>. 在打亂前的前置動作。這個選項會影響虛擬方塊跟打亂圖形的顯示。</li>
<li><strong data="opt_scrFast">4x4x4使用快速打亂(非官方)</strong>. WCA的官方4x4x4打亂方法很吃運算資源。如果要改成4x4x4的隨機步驟打亂，可以勾選這個選項。</li>
<li><strong data="opt_scrKeyM">打亂中標記關鍵步驟</strong>. 標記打亂中的關鍵步驟，例如sq-1打亂中離開正方形的那一個步驟。</li>
<li><strong data="opt_scrClk">點擊打亂時的動作</strong>. 點擊打亂公式後會發生的事情：複製本次打亂或生成下一組打亂。</li>
<li><strong data="opt_trim">刪減數據中的資料數</strong>. 計算平均時要去掉的頭尾數據量。</li>
<li><strong data="opt_statsum">在時間清單前顯示摘要</strong>. 在時間列表前顯示統計資料。</li>
<li><strong data="opt_printScr">在統計列表中顯示打亂</strong>. 在數據欄中顯示打亂。</li>
<li><strong data="opt_printDate">在統計列表中顯示日期</strong>. 在數據欄中顯示日期。</li>
<li><strong data="opt_imrename">創建後立即重新命名階段</strong>. 在創建階段後立即重新命名。</li>
<li><strong data="opt_scr2ss">更換打亂模式時創建新階段</strong>. 在改變打亂形式時，創建新的階段。</li>
<li><strong data="opt_statinv">顛倒時間清單</strong>. 顛倒顯示成績，使得最舊的成績位於最上方。</li>
<li><strong data="opt_statclr">允許階段空白</strong>. 關閉時，創建階段的「+」按鈕會取代「X」按鈕。也就是說，按下按鈕時會創鍵一個新的階段，而不是清除本階段。</li>
<li><strong data="opt_absidx">統計報告中顯示絕對索引</strong>. 在輸出成績時，以絕對索引的方式輸出。也就是說，時間列表的索引值不會從1開始，而是它在成績紀錄中的位置。</li>
<li><strong data="opt_rsfor1s">點擊編號時顯示統計資料</strong>. 如果點擊某筆成績的編號，會顯示它的成績列表。</li>
<li><strong data="opt_statal">統計指標</strong>. 在左側成績欄顯示的統計指標。如果要自訂的話，可以使用aoX(X次去頭尾平均)跟moX(X次不去頭尾平均)。</li>
<li><strong data="opt_delmul">允許同時刪除多個成績</strong>. 可以從某轉開始刪除較新的n筆成績。</li>
<li><strong data="opt_disPrec">時間分布精確度</strong>. 在使用時間分布小工具的時候所顯示的精確度。</li>
<li><strong data="opt_solSpl">逐步顯示解法</strong>. 如果這個選項設為開啟，小幫手提供的步驟只會顯示一部份，必須一步一步點開來看。如果沒有開啟的話，就會一次看到所有步驟。</li>
<li><strong data="opt_imgSize">打亂圖示大小</strong>. 選擇打亂圖形的大小。</li>
<li><strong data="opt_NTools">工具數量</strong>. csTimer可以同時顯示4個小工具。</li>
<li><strong data="opt_useKSC">使用快捷鍵</strong>. 用鍵盤快捷鍵來切換打亂模式、生成下一個打亂、切換階段等。</li>
<li><strong data="opt_vrcSpeed">VRC基準速度(轉/秒)</strong>. 使用虛擬方塊時的基礎轉動速度。如果有很多步驟要做的話，會自動跳過某些動畫。</li>
<li><strong data="opt_vrcMP">分項計時</strong>. 在使用虛擬方塊或藍芽方塊時自動使用多階段計時。</li>
<li><strong data="opt_giiVRC">顯示虛擬計客魔方</strong>. 連接藍芽方塊時在螢幕中顯示虛擬方塊。</li>
<li><strong data="opt_giiSD">停滯時當作已打亂</strong>. 使用藍牙方塊時，csTimer不知道現在的操作是打亂的一部分還是在復原。如果這個選項設為開啟，停頓過久會視為打亂結束。</li>
<li><strong data="opt_giiSK">按下空白鍵標記打亂完成</strong>. 按下空白鍵時，藍牙方塊會被視為打亂完成，接下來進行任何轉動都會開始計時。</li>
<li><strong data="opt_giiSM">以特殊動作標記打亂</strong>. 用一組特定的動作來標記藍牙方塊已打亂完成。</li>
<li><strong data="opt_giiBS">打亂完成時發出聲音</strong>. 打亂完成動作觸發時發出嗶聲。</li>
<li><strong data="opt_giiRST">連接時重置計客魔方</strong>. 連接到藍牙方塊時，csTimer會偵測方塊是否已復原。如果沒有的話，可能是真的沒有復原，也可能是硬體上出了問題。</li>
<li><strong data="opt_giiAED">自動硬體錯誤偵測</strong>. 有些作工拙劣(X)的藍牙方塊會不小心漏掉幾步，csTimer會試著從軟體面偵測這樣的狀況。</li>
</ul>
<h2>小工具說明</h2>
<ul>
<li><strong data="tool_scrgen">打亂製造器</strong>. 用這個工具可以一次創造最多999組打亂。</li>
<li><strong data="tool_cfm">確認時間</strong>. 用這個工具可以看見這轉的詳細資料，包括打亂、駐記、日期跟解法(如果有的話)，說穿了就是按下成績會跳出來的那個對話框。</li>
<li><strong data="tool_hugestats">跨階段統計</strong>. 用這個工具可以看見跨階段的統計數據。</li>
<li><strong data="tool_stats">統計</strong>. 類似左側時間列表的小面板。</li>
<li><strong data="tool_distribution">分階段計時</strong>. 時間分佈跟穩定度分析，&lt;X Y/Z代表少於X秒的總共有Y轉，而且最近有Z轉小於X秒。</li>
<li><strong data="tool_trend">時間趨勢</strong>. 顯示現階段的時間分佈曲線。</li>
<li><strong data="tool_dlystat">Daily Statistics</strong>. 計算每年/每週/每月/每年的復原次數。</li>
<li><strong data="tool_image">畫出打亂圖形</strong>. 顯示本次打亂後的樣子，支援所有的WCA方塊。</li>
<li><strong data="tool_roux1">速解小幫手 &gt; 解好橋式左橋</strong>. 解好橋式的第一步，也就是左下方的1x2x3。</li>
<li><strong data="tool_eoline">速解小幫手 &gt; 解好EOLine</strong>. 解好EO line，也就是會轉正所有的邊，並且解好底面的直線。</li>
<li><strong data="tool_cross">速解小幫手 &gt; 解好十字</strong>. 解好底面十字。</li>
<li><strong data="tool_222face">速解小幫手 &gt; 2x2x2 一面</strong>. 解好2x2x2底面。</li>
<li><strong data="tool_333cf">速解小幫手 &gt; Cross + F2L</strong>. 一次解好前兩層。因為要解的東西太多，它輸出的解法通常會超出人腦的計算量。</li>
<li><strong data="tool_333roux">速解小幫手 &gt; Roux S1 + S2</strong>. 橋事前兩步驟的小幫手。它會先解好左下角的1x2x3，再用R, M, r, U解出右邊的1x2x3。</li>
<li><strong data="tool_333petrus">速解小幫手 &gt; 2x2x2 + 2x2x3</strong>. Petrus前兩步的小幫手。它會先解好左下方的2x2x2後，再擴展成2x2x3。</li>
<li><strong data="tool_333zz">速解小幫手 &gt; EOLine + ZZF2L</strong>. EO line與ZZF2L的小幫手。解好EO line之後，它會以ZZ的方式先解好一側的1x2x3，再擴展成2x2x3(也就是前兩層)。</li>
<li><strong data="tool_sq1cs">速解小幫手 &gt; SQ1 S1 + S2</strong>. Sq-1前兩步驟的小幫手。它會讓方塊回正後，再使U、D面的顏色一致。</li>
<li><strong data="tool_pyrv">速解小幫手 &gt; Pyraminx V</strong>. 金字塔「V」的小幫手。它會解好成V字型的三個角與兩個邊。</li>
<li><strong data="tool_skbl1">速解小幫手 &gt; Skewb Face</strong>. 解好斜轉方塊的一面一層。</li>
<li><strong data="tool_giikerutil">計客魔方</strong>. 藍牙方塊專用的小工具。它會顯示目前方塊的狀態、電池電量、上一轉解法等。</li>
<li><strong data="tool_if">InsertionFinder</strong>. FMC做Insertion用的輔助工具。</li>
<li><strong data="tool_mtrnm">節拍器</strong>. 你可以自由設定節拍速度，也可以設成開始計時的時候啟動。</li>
<li><strong data="tool_onlinecomp">線上比賽</strong>. 用WCA帳號登入後，可以在這裡與全世界的玩家一起參加線上小比賽。</li>
<li><strong data="tool_stackmatutil">stackmat</strong>. SS計時器的附加工具。可以在這裡看見計時器的狀態、訊號強度跟雜訊大小。</li>
</ul>
<h2>連結</h2>
<ul>
<li><a class="click" href="https://cubingchina.com/">粗餅</a></li>
<li><a class="click" href="/new/">csTimer 測試板</a></li>
<li><a class="click" href="/src/">沒有壓縮檔的csTimer</a></li>
<li><a class="click" href="https://github.com/cs0x7f/cstimer">csTimer的原始碼</a></li>
<li><a class="click" href="/old3/">csTimer 2015.12.12版</a></li>
<li><a class="click" href="/old2/">csTimer 2012.3.15版</a></li>
<li><a class="click" href="/old/">csTimer 2012.2.29版</a></li>
</ul>
<h2>配色方案</h2>
<?php include('color.php') ?>
<div class="donate" style="line-height:1.5em;">
<p>csTimer感謝你的資助！ 你的捐款會用作開發經費跟維護成本。</p>
<p>如果想要使用PayPal捐款的話，可以按下面的按鈕或是<a class="click" href="https://www.paypal.me/cs0x7f">這個連結</a>。</p>
<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
<input type="hidden" name="cmd" value="_s-xclick">
<input type="hidden" name="hosted_button_id" value="NW25HME3QUEZY">
<input type="image" src="data:image/gif;base64,R0lGODlhkAAvAPc/AHZ2dnWky/7ou//UkiosLf7iqwBXn87e7aempjir4v/25pO20/+xOM6qkepCOTBps+vr7C1stIODgyVCa9ft+O6dSfnXu8/Pzr60lYzN6+pXVr/W6f7en/+vNPODacU1PSGX1J6jmzN1ttSkVO+AM/jNtv+tL//JdUBedarL42lXXnJwa/TBjPWzhO7c1I92RP3l2kxjhuPi4yKh3GbC7mJhUf/tyv+6Tvzm5Z7C3v7fo3mJov7z8giU146Ui5kAAN7Jm7W8yH+Mi+7VpP+pJkW16lBZVMro9mG34r65oufw+chIUf7SjGvG8P+rKiV1u3+JhK6rlf/Gbf/Me97NoxGb2DBUc//CY5OTk/7Yk/Omd++nNyWExpunuFSu3QCH06PZ8u7csypyuF6+7PX8/Wd6l/+0Ps7Do6yNRPuxN7vi9v62RFBqelG15nCBhr+OPBA+at+dNJ9/QyN9wCtwtyiMzEBRV2B1gP7ZmI+csSJ7v3B/gv+6UQwOD56fjP6zPmB0fkBgef64ST9XfYBvSXBpTRA7Y/+/Wf/w0//z3C48cv+9Vv/gsP/67/7pwf/sz//9+f7mtf7ksP7gp+yRM+gzMcnJyWpqavb29fn5+vLx8dnZ2dLS0tXV1d3d3Rk3ZUNERUCBt2g5Xu7ZqyBsq2CWw/Lz98iBP6+FPsXL1Lm5ucHBwYs4UpyamY1nU+Xn7Y6NjP/nw/GtZrKxsYB3WvydIRBhor+YVO5mZUBVYOmmqe7Tm/FoOOaNj3BjY6uzwPKYWSBJb1xTRP/363CCi/bImc+UNeKXTP3w5v748vCmWc7Am2FlYcm8vP/lu1CMvVBeYPqmGsuPWN/q8924cpKMguvKqqWvva6wpPvfzMTIznBqUv/+/bLN5v+3SDBKWzJMdOrDne+yUNdnbTCGxtja4T92mpW93//CYCeFx97Stt7Qq++OVPCIQP/bnZ+HV+i8kPOrhvipkPK1nHKCnVW36Fe46ByJy+WnauHSxyUaBr+RRAAzZv+ZM////8wAACH5BAEAAD8ALAAAAACQAC8AAAj/AH8IHEiwoEGD/RIqXMiwocOHECNKnCjxoMWLGDNa7GeGSaxhkEKKHEmypMmTKFOqXElyWCwm3vppnEkTYz8+zhrp3Mmzp8+fQIMKHUq0qDM+Mmsqpdkvi4KnUKNKnUq1qtWrWLNqjeou6dKvB/sxSkS2rNmzaNOqXcu2rdu3aBl5BUu33wlEePPq3cu3r9+/gAMLHux3yly6S504ssG4sePHkCNLnky5suXLk00gBtsPnaPPoEOLHh2Cn2nTVrCNXs36c2k4oNXxg926tu3W6A5v1khEioDfwIMLH06MX7BAgYLNDjO8uXMBxfmF+J2EX6Dn2LNjl0Jkd81+HQ5F/xpPvrz584H4JSFvRf34dUnOnJ9fPr318UL4CSEfJsl6+gAGeB46HejmXVh/3MCEJAw26OCDD5o2SoPKnTGKffxYMaEP/LjB4Chw8HNGhKetIwkb/ETBoBunwRECg9YxeId+koAIx4QQ5thgFjf8YeCBBXEkyA14FGDkkUgmeeQyGRpJxYzBFMDiHRik50MBGPCDgpH5uZEkkyjMKEQByo1SwIxWROFHiFQUYAUcBVBh2pj5janknUfqwIcgZvwI5ED9rCGoIFlMYuihiCZqKIenmQYHBokCwg8UkwyhZaVwwDFEohzukWUwlgYzCRCzbTrJHvz4MAkK/EwiKT+ADP+RqamK1jpJFnwIuoaff/7AkRnAmiFFFjoUa+yxyEpqBQrMQgFEsVGwehoGxZqmAxSpIquDpH7ooByqbOjAISDGYguFDqwCAQeKKGC7h7bwFuvOCcECy+uf/TCg774MHDJFFhwELPDAAbeHAcEcZAmHH6Tys0vArO4ChxUIc9DeMhxgaxoUGU8qMIp+dMwqBii8yQ8QFROcxRTo8LvvvUD2Y0IHNNds8w0456zzDabtjDMt/NBywy38TJAzM/zkws8tPvPMD84jnMb0O/xAAzU/hohzA9BJ36A0P8w0vTMDNpdtAswH9uOECWy37fbbb7/Bjx1wmyAH1oQYMnfbhJj/ZkTdctPNthGmsb2F3jUUorccbN/NDyom1GBaHHVXXrcTaKftxOacd+6556jY8cLnmxNuR+iFcC63IXGQHvrom4deA+fGEM7PN6jQbocRm8thByGkBx985mkTYfzxyCev/PLMIy85Ic1HL/301CdPfNouZ6/99tzru882WG/R/fjkl1/+9Wmvscj67Lfv/vvwxw9N0SPEb//9+Odv/669MnXFCQAMoAAHSMACGvCACEygAhdIwCugD19TGIAEJ0jBClrwghjMoAY3yMEOUtAw/VtKP6TAiBKa8IQoTKEKV8jCFrrwhTAsoRQeGMJa9MMjj8ihDnfIwx768IdADKIQ/4cIxJf0oxYhRIwNKcLEJjrxiUxMohSnSMUqWvGKWMyiFrfIxS568YtgDKMYx0jGMoZREWhMoxrXuMaB+OONcIyjHOU4kHqMgQZjqEcREjADENSBC3oQAx0iMJALWOKQiEykIhF5gYE0Y5GQVGQzrsjGSlbSjXPM5BwHcscm4LENfPQjIJ8wyIGsQpOo9McqTJlKTa7SimgUxQcqQcsPiAKNKjgFJXZ5ChWgEZOtzCQnm0DMPIbyj3ogJSEFoopgzlEVA1FFJqZJzWpak5rQhCUraMlNWrLCFbsM5y5doQhgOjOOnKRBMUHZR2SS8gEDmcU54ziLeGLinvjMpz7xWf9PK4qim910AAnEKU4VDAQPaYgGIvxhC1uUwgD+CIUBDEAKf+Rgom/kZAIoAAY1qAEMYMhACnJwjg3QAZ4CQcA84YiAgSBAEzCNqUxnGtOWWvEDuNCABgDKC15Q4hjKEGcFpOHGBaCBCRcNgEQ3YAARbCAH/iDFRDfgD076Awz+OEIGyIAEf2xACf7ohj9Q+gOVgkICAFiBPyQAihJooQGwwAIo5soMf9i0rBCIQQx2AIFfxCAVqfhrKnawgy6UIQ8QuCsVl+CPV+BAF73QhQt0UQJ5hMMULrAGPIpRDBewwI0HsAU1JDoNih5goqUwBVP9YYAFVFUgM0AlN6bxRrL/tsIfc+0DAUBBAH+ww60ECC5ve9uKgbQCAp8owwQgMIgJlCEIn5hAHvQ6gQmUAwLFteI43sgDf5iCB694xRtlYAF8aOKNyCiHLDBpC3MYIBSlDYU/UiDVUjzDAAEwQCle+4MZ9KAKRZhBFb7wBVHqgQ4nHQgW/BHc3uqWGVqYRzxWAABQMJgAmsCCgmXwCXp84hqfiMEnupDcEMeguuWQgYat2AvvvhEHb3wFDJLRgGQgwxT+yEcy/FEBTD4UokwNQABSkF8RTHSiIuAvCHrgBQocwavnOMA53khbssJipW+ExUBgweHmxmAQOwCHiGWg170OYhCd0LIVl4ALBzhA/wM53akHfHqMY8hCFhVQhixOAUyK+mMBrT0yKe4bgA1IlL91uIcX4kiGOZJVAnJshTCqsYIV6EMYNYAjDIAhgYFIwBOgDrUntPGLX4ha1J32J0C5KVCChtOgAsEyHAfChXTYOh3kEIEYRMDrB4jgAY8+JzJaQAISpPoHEtiEspfN7GYv+9hUVMQ2V/1NV1OCnOZc6UDmwO05JFMMEYgAsMdNVgAE0wJaKHaxATAQAHTi3fCOt7zhzW5YKkKW3LQlLnXJS1+WM9ayriodfvCEghtckIMkd7k1mQwLtKAd6lZ3vX8AAE5Y/OIYz/jFJx5tS3r8lwCX9Q8GLoaSlxzB4UFWOFnV+sZkZKMELQBGxGdOghUMZAUXyLnOd85zndvc3h+3ZLbnOZBwGz3lKi/3JZbO9KY7nekT98XTp+50X9AlIAA7" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
</form>
<p>你也可以在支付保上面捐款，只要掃一下底下的QR Code，或是轉帳給cs0x7f@gmail.com。</p>
<p><img style="display:inline-block; width:10em; height:10em;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABsCAIAAAAABMCaAAABoklEQVR42u3aUY6DMAwFQO5/6e0JViq1XwjO5LOqIAxSHJ5z/RnlcSGACHEk4hUY/974i/9/83vlXl3PBREixPmIpYX25oNVrl95GV3PBREixLMQ05OuXD9RoG5fByJEiBCfnDREiBAhDkashAulTTJEiBAhbhJAJIKM41IciBAhLkOMNHQ2+P313T6IECEuQ9z60FBTcYjMDSJEiCMRKx//K4tMYvNcOkwAESLEoxBXNukTwW1XKAsRIsRzEZ9CqUAkClQpxYEIEeIYxApo1+b2qeK2xRcLRIgQH0dMLPaVSVeg080piBAhzkdMB59dQWn6BTxWnSFChLgtYrqAlCYdPmwVCWUhQoQ4HjFRZBIHCBIbeIgQIUJs/WhPLPDhxhlEiBDPQkyPdIFKo99OtiFChPhqxHRzZ+Xho3SwAhEixLMQ0wt/2wOEN+dtoSxEiBDHIO7QhFrZtLr94iFChAgx1AzqKmgrwwiIECFC7ERMh69dG2yIECFCXBFAVIpAegP/mhQHIkSIUcSVjar0hjkeJEOECHEkovFjIUUAEeKU8QE0apeVMce/LwAAAABJRU5ErkJggg=="></p>
<p>再次感謝你的支持！</p>
</div>