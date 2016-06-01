<h1>csTimer  bản 2015.12.12 - Speedcube chuyên nghiệp/huẩn luyện timer</h1>
<?php include('lang.php') ?>
<p>CSTimer được thiết kế cho speedcuber. Được dịch bởi Long Regain. Nó hỗ trợ scramble cho nhiều loại cube <b>toàn bộ cube của WCA</b>; nó còn hỗ trợ cho <b>Xcross solver và eoline solver</b>; Nó thống kê thành tích , <b>Cho phép chia ra và tính thời gian thành nhiều đợt</b> và 1 số chức năng cơ bàn như: 15s' chuẩn bị như WCA, blo bla ble...</p>
<p>CStimer có thể sử dụng rất tốt hầu hết với mọi browser, như: chrome(khuyến khích sử dụng), firefox, opera, blo bla... Và nó cũng hỗ trở ipad, iphone và tất cả các thiết bị android. </p>
<p> --- Chủ mưu bởi: <a class="click" href="mailto:cs0x7f@gmail.com">Shuang Chen (cs0x7f@gmail.com)</a><br>
 --- Thiết kế bởi: <a class="click" href="mailto:liebe7@126.com">Yue Zhang (liebe7@126.com)</a><br></p>
<h2>Giới thiệu</h2>
<ul>
<li><b>Timer</b> - Hỗ trợ thời gian chuẩn bị của WCA, chia ra thành nhiều đợt tính giờ, cảm ứng với bàn phím ,xác nhận OK/+2/DNF. tốc độ cảm ứng là 0.001s.</li>
<li><b>Scramble</b> - hỗ trợ với mọi cube của WCA. Số lượng lớn những cube biến thể và những scramble để luyện tập, như: chỉ cạnh/gọc, tầng cuối.</li>
<li><b>Thành tích</b> - cho xem avg 5/12 một cách chính xác. Xuất thành tích và mục hiện tại, bao gồm PB single, best 5/12 blo bla...</li>
<li><b>Hộp công cụ</b> - Hỗ trợ nhiều loại cross, Xcross(extended cross), EOLine. ảnh scramble cho NxNxN cube.</li>
</ul>
<h2>Chi tiết</h2>
csTimer đã đc thử nghiệm trên firefox, Chrome và Safari. Và hoạt động cực tốt cho Ipan(thử nghiệm trên oyyq).
<h3>Timer</h3>
<ul>
 <li><b>Truyền thống</b> - giứ nút SPACE đến khi màu chữ chuyển sang màu xanh là cây. Thời gian sẽ bắt đầu tính cho đến khi bạn bầm SPACE 1 lần nữa.</li>
 <li><b>Bấm nút</b> - giống như stackmat, csTimer giữ thời gian khi giữ SPACE.Bạn phải giữ SPACE 1 vài giây rồi mới được thả ra. </li>
 <li><b>WCA inspection</b> - csTimer hỗ trợ thời gian chuận bị theo như luật của WCA. Khi chức năng inspect được bật lên, Thời gian chuận bị sẽ được tính trước khi bạn giải cube.</li>
 <li><b>chia đợt</b> - CStimer cho phép bạn chia ra thành nhiểu đợt khi tính thời gian. bạn có thể tự cài đặt số đợt. </li>
 <li><b>Cắm stackmat</b> - Nếu bạn muốn sử dụng stackmat, bạn phải mua 1 loại dây cắm đặc biệt và cắm nó vào máy.</li>
 <li><b>OK/+2/DNF</b> - Nếu bạn cắm stackmat thì nó sẽ hiện lên hiện 1 bảng thông báo xác nhận đã cắm. Nhưng bạn sẽ phải chọn hoặc là +2 hay DNF. Nếu không làm gì, thời gian sẽ giữ nguyên.</li>
 <li><b>độ nhạy bén</b> - CStimer có thể tính tới 0.001s. </li>
 <li><b>Thể loại đồng hộ</b> - bạn có thể chỉnh thời gian hiện thị như: hh:mm:ss.XX(X) hoặc mm:ss.XX(X)".</li>
 <li><b>cập nhập thời gian</b> - timer có thể cập nhập theo: không cập nhập, theo giây hoặc thời gian thực.</li>
 <li><b>Style</b> - bạn có thể chỉnh kích cỡ cho CStimer.</li>
 <li><b>Màu</b> - Có rất nhiều màu và phong cách để bạn có thể chọn.</li>
</ul>
<h3>Scramble</h3>
<ul>
 <li><b>WCA Official Scrambler</b> - csTimer scramble cho tất cả WCA cube, như: random-state scrambler của 2x2x2, 3x3x3, pyraminx, square-1, clock. Random-move scrambler of 4x4x4, 5x5x5, 6x6x6, 7x7x7, megaminx.</li>
 <li><b>CFOP Training</b> - đối với CFOP, có rất nhiều chức năng scramble như: chỉ scramble tầng cuối, tầng cuối + F2L cuối, Cross đã được solve.</li>
 <li><b>Other 3x3x3 Methods</b> - đối với CFOP nâng cao ,CStimer hỗ trợ scramble đặc biệt như: ZBLL, corners/edges of last layer, RUL genr.</li>
 <li><b>Roux Training</b> - đối với roux, sẽ có scramble đặc biệt cho: last six edge, l10p.</li>
 <li><b>Big Cube Training</b> - đối với big cube, CStimer hỗ trợ scramble đặc biệt như: scramble of edges of 4x4x4, 5x5x5, 6x6x6, 7x7x7.</li>
 <li><b>3x3x3 BLD Training</b> - đối vớir 3x3x3 bld,CStimer hỗ trợ: chỉ scramble cạnh/ góc.</li>
 <li><b>Other Puzzles</b> - csTimer cũng hỗ trợ rất nhiều cube biến thể khác.</li>
</ul>
<h3>Thành tích</h3>
<ul>
 <li><b>Multi Session</b> - There're 5 session(s) of time. All statistics function is session-oriented.</li>
 <li><b>Session average</b> - You may find session average at the bottom of the time table.</li>
 <li><b>Dynamic ao5</b> - After solving more than 5 times, you may check your average of 5 at 'ao5' column and get detail by clicking the cell.</li>
 <li><b>Dynamic ao12</b> - After solving more than 12 times, you may check your average of 12 at 'ao12' column and get detail by clicking the cell.</li>
 <li><b>Statistics detials</b> - Click the cell which contains session average, you'll get the detail of current session.</li>
 <li><b>add comments</b> - Click the cell which contains a solving time, you may set the time to OK/+2/DNF or comments.</li>
 <li><b>delete time/session</b> - Click the index before time, You may delete the time at the same row. Or click the 'X' button to remove all times in the current session.</li>
</ul>
<h3>Keyboard Shortcut</h3>
<ul>
 <table class="table" style="display: inline-block;">
  <tr><th>key</th><td>function</td></tr>
  <tr><th>Alt + 1</th><td>Scramble type to Square-1.</td></tr>
  <tr><th>Alt + 2 ~ 7</th><td>Scramble type to 2x2x2~7x7x7.</td></tr>
  <tr><th>Alt + p/m/c/s</th><td>Scramble type to pyra/megaminx/clock/skewb.</td></tr>
  <tr><th>Alt + i</th><td>Scramble type to input.</td></tr>
  <tr><th>Alt + d</th><td>Remove all times in current session.</td></tr>
  <tr><th>Alt + z</th><td>Remove the latest time.</td></tr>
  <tr><th>Alt + up/down</th><td>To next/last session.</td></tr>
  <tr><th>Alt + left/rightt</th><td>Display last/next scramble.</td></tr>
  <tr><th>Ctrl + 1/2/3</th><td>The latest time is OK/+2/DNF</td></tr>
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
<li><a class="click" href="/old2/">csTimer version 2012.3.15 (only zh-cn)</a></li>
<li><a class="click" href="/old/">csTimer version 2012.2.29 (only zh-cn)</a></li>
<li><a class="click" href="/src/">csTimer with uncompressed files</a></li>
<li><a class="click" href="https://github.com/cs0x7f/cstimer">source code of csTimer</a></li>
</ul>
