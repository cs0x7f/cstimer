<h1>csTimer bản 2018.11.05 - Speedcube chuyên nghiệp/huẩn luyện timer</h1>
<?php include('lang.php') ?>
<p>Được dịch bởi Long Regain. CSTimer được thiết kế cho speedcuber. Nó hỗ trợ scramble cho nhiều loại cube <b>toàn bộ
        cube của WCA</b>; nó còn hỗ trợ cho <b>Xcross solver và eoline solver</b>; Nó thống kê thành tích , <b>Cho phép
        chia ra và tính thời gian thành nhiều đợt</b> và 1 số chức năng cơ bàn như: 15s' chuẩn bị như WCA, blo bla
    ble...</p>
<p>CStimer có thể sử dụng rất tốt hầu hết với mọi browser, như: chrome(khuyến khích sử dụng), firefox, opera, blo bla...
    Và nó cũng hỗ trở ipad, iphone và tất cả các thiết bị android. </p>
<p> --- Chủ mưu bởi: <a class="click" href="mailto:cs0x7f@gmail.com">Shuang Chen (cs0x7f@gmail.com)</a><br>
    --- Thiết kế bởi: <a class="click" href="mailto:liebe7@126.com">Yue Zhang (liebe7@126.com)</a><br></p>
<h2>Giới thiệu</h2>
<ul>
    <li><b>Timer</b> - Hỗ trợ thời gian chuẩn bị của WCA, chia ra thành nhiều đợt tính giờ, cảm ứng với bàn phím ,xác
        nhận OK/+2/DNF. tốc độ cảm ứng là 0.001s.
    </li>
    <li><b>Scramble</b> - hỗ trợ với mọi cube của WCA. Số lượng lớn những cube biến thể và những scramble để luyện tập,
        như: chỉ cạnh/gọc, tầng cuối.
    </li>
    <li><b>Thành tích</b> - cho xem avg 5/12 một cách chính xác. Xuất thành tích và mục hiện tại, bao gồm PB single,
        best 5/12 blo bla...
    </li>
    <li><b>Hộp công cụ</b> - Hỗ trợ nhiều loại cross, Xcross(extended cross), EOLine. ảnh scramble cho NxNxN cube.</li>
</ul>
<h2>Chi tiết</h2>
csTimer đã đc thử nghiệm trên firefox, Chrome và Safari. Và hoạt động cực tốt cho Ipan(thử nghiệm trên oyyq).
<h3>Timer</h3>
<ul>
    <li><b>Truyền thống</b> - giứ nút SPACE đến khi màu chữ chuyển sang màu xanh là cây. Thời gian sẽ bắt đầu tính cho
        đến khi bạn bầm SPACE 1 lần nữa.
    </li>
    <li><b>Bấm nút</b> - giống như stackmat, csTimer giữ thời gian khi giữ SPACE.Bạn phải giữ SPACE 1 vài giây rồi mới
        được thả ra.
    </li>
    <li><b>WCA inspection</b> - csTimer hỗ trợ thời gian chuận bị theo như luật của WCA. Khi chức năng inspect được bật
        lên, Thời gian chuận bị sẽ được tính trước khi bạn giải cube.
    </li>
    <li><b>chia đợt tính thời gian </b> - CStimer cho phép bạn chia ra thành nhiểu đợt khi tính thời gian. bạn có thể tự
        cài đặt số đợt.
    </li>
    <li><b>kết nối với stackmat</b> - Nếu bạn muốn sử dụng stackmat, bạn phải mua 1 loại dây cắm đặc biệt và cắm nó vào
        máy.
    </li>
    <li><b>OK/+2/DNF</b> - Nếu bạn cắm stackmat thì nó sẽ hiện lên hiện 1 bảng thông báo xác nhận đã cắm. Nhưng bạn sẽ
        phải chọn hoặc là +2 hay DNF. Nếu không làm gì, thời gian sẽ giữ nguyên.
    </li>
    <li><b>độ nhạy bén</b> - CStimer chính xác từng 0.001s.</li>
    <li><b>Thể loại đồng hộ</b> - bạn có thể chỉnh thời gian hiện thị như: hh:mm:ss.XX(X) hoặc mm:ss.XX(X)".</li>
    <li><b>cập nhập thời gian</b> - timer có thể cập nhập theo: không cập nhập, theo giây hoặc thời gian thực.</li>
    <li><b>kích cỡ</b> - bạn có thể chỉnh kích cỡ cho CStimer.</li>
    <li><b>Màu</b> - Có rất nhiều màu và phong cách để bạn có thể chọn.</li>
</ul>
<h3>Scramble</h3>
<ul>
    <li><b>WCA Official Scrambler</b> - csTimer scramble cho tất cả WCA cube, như: random-state scrambler của 2x2x2,
        3x3x3, pyraminx, square-1, clock. Random-move scrambler of 4x4x4, 5x5x5, 6x6x6, 7x7x7, megaminx.
    </li>
    <li><b>CFOP Training</b> - đối với CFOP, có rất nhiều chức năng scramble như: chỉ scramble tầng cuối, tầng cuối +
        F2L cuối, Cross đã được solve.
    </li>
    <li><b>Other 3x3x3 Methods</b> - đối với CFOP nâng cao ,CStimer hỗ trợ scramble đặc biệt như: ZBLL, corners/edges of
        last layer, RUL genr.
    </li>
    <li><b>Roux Training</b> - đối với roux, sẽ có scramble đặc biệt cho: last six edge, l10p.</li>
    <li><b>Big Cube Training</b> - đối với big cube, CStimer hỗ trợ scramble đặc biệt như: scramble of edges of 4x4x4,
        5x5x5, 6x6x6, 7x7x7.
    </li>
    <li><b>3x3x3 BLD Training</b> - đối vớir 3x3x3 bld,CStimer hỗ trợ: chỉ scramble cạnh/ góc.</li>
    <li><b>Other Puzzles</b> - csTimer cũng hỗ trợ rất nhiều cube biến thể khác.</li>
</ul>
<h3>Thành tích</h3>
<ul>
    <li><b>Bảng thành tích</b> - có 5 bảng thành tích. tất cả đều dược sắp xếp gọn gàng, dễ nhìn.</li>
    <li><b>Bảng avg</b> - Bạn có thể thấy nó ở bảng thành tích.</li>
    <li><b>Avg of 5</b> - Sau khi giải 5 lần, CStimer sẽ tính ra con số trung bình trong 5 lần giải đó.</li>
    <li><b>Avg of 12 </b> - Sau khi giải 12 lần, CStimer sẽ tính ra con số trung bình trong 12 lần giải đó.</li>
    <li><b>Chi tiết về thành tích</b> - Bạn có thể tùy chọn avg của xx trong tùy chọn.</li>
    <li><b>Thêm comment </b> - Nếu bạn lập được best, bạn có thể thể hiện cảm xúc của mình trong phần comment ở mỗi lần
        giải.
    </li>
    <li><b>Xóa thời gian, mục</b> - Bạn có thể xóa từng thời gian một hoặc có thể xóa cả mục bằng cách bấm vào nút X ở
        bảng thành tích.
    </li>
</ul>
<h3>Phím tắt</h3>
<ul>
    <table class="table" style="display: inline-block;">
        <tr>
            <th>key</th>
            <td>function</td>
        </tr>
        <tr>
            <th>Alt + 1</th>
            <td>Scramble type to Square-1.</td>
        </tr>
        <tr>
            <th>Alt + 2 ~ 7</th>
            <td>Scramble type to 2x2x2~7x7x7.</td>
        </tr>
        <tr>
            <th>Alt + p/m/c/s</th>
            <td>Scramble type to pyra/megaminx/clock/skewb.</td>
        </tr>
        <tr>
            <th>Alt + i</th>
            <td>Scramble type to input.</td>
        </tr>
        <tr>
            <th>Alt + d</th>
            <td>Remove all times in current session.</td>
        </tr>
        <tr>
            <th>Alt + z</th>
            <td>Remove the latest time.</td>
        </tr>
        <tr>
            <th>Alt + up/down</th>
            <td>To next/last session.</td>
        </tr>
        <tr>
            <th>Alt + left/rightt</th>
            <td>Display last/next scramble.</td>
        </tr>
        <tr>
            <th>Ctrl + 1/2/3</th>
            <td>The latest time is OK/+2/DNF</td>
        </tr>
    </table>
    <table class="table" id="vrckey" style="display: inline-block;">
        <tr>
            <th colspan=10>Virtual Cube Key Map</th>
        </tr>
        <tr>
            <td>1<br><br></td>
            <td>2<br><br></td>
            <td>3<br><span>&lt;</span></td>
            <td>4<br><span>&gt;</span></td>
            <td>5<br><span>M</span></td>
            <td>6<br><span>M</span></td>
            <td>7<br><span>&lt;</span></td>
            <td>8<br><span>&gt;</span></td>
            <td>9<br><br></td>
            <td>0<br><br></td>
        </tr>
        <tr>
            <td>Q<br><span> z'</span></td>
            <td>W<br><span>  B</span></td>
            <td>E<br><span> L'</span></td>
            <td>R<br><span>Lw'</span></td>
            <td>T<br><span>  x</span></td>
            <td>Y<br><span>  x</span></td>
            <td>U<br><span> Rw</span></td>
            <td>I<br><span>  R</span></td>
            <td>O<br><span> B'</span></td>
            <td>P<br><span>  z</span></td>
        </tr>
        <tr>
            <td>A<br><span> y'</span></td>
            <td>S<br><span>  D</span></td>
            <td>D<br><span>  L</span></td>
            <td>F<br><span> U'</span></td>
            <td>G<br><span> F'</span></td>
            <td>H<br><span>  F</span></td>
            <td>J<br><span>  U</span></td>
            <td>K<br><span> R'</span></td>
            <td>L<br><span> D'</span></td>
            <td>;<br><span>  y</span></td>
        </tr>
        <tr>
            <td>Z<br><span> Dw</span></td>
            <td>X<br><span> M'</span></td>
            <td>C<br><span>Uw'</span></td>
            <td>V<br><span> Lw</span></td>
            <td>B<br><span> x'</span></td>
            <td>N<br><span> x'</span></td>
            <td>M<br><span>Rw'</span></td>
            <td>,<br><span> Uw</span></td>
            <td>.<br><span> M'</span></td>
            <td>/<br><span>Dw'</span></td>
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
<h2>Color Schemes</h2>
<?php include('color.php') ?>
<div class="donate" style="line-height:1.5em;">
    <p>Thank you for your interest in supporting csTimer!</p>
    <p>Donations will be used to support our developers and purchase equipment. </p>
    <p>You can donate through PayPal using the button below or <a href="https://www.paypal.me/cs0x7f" class="click"> via
            PayPal.me</a>. </p>
    <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
        <input type="hidden" name="cmd" value="_s-xclick">
        <input type="hidden" name="hosted_button_id" value="NW25HME3QUEZY">
        <input type="image"
               src="data:image/gif;base64,R0lGODlhkAAvAPc/AHZ2dnWky/7ou//UkiosLf7iqwBXn87e7aempjir4v/25pO20/+xOM6qkepCOTBps+vr7C1stIODgyVCa9ft+O6dSfnXu8/Pzr60lYzN6+pXVr/W6f7en/+vNPODacU1PSGX1J6jmzN1ttSkVO+AM/jNtv+tL//JdUBedarL42lXXnJwa/TBjPWzhO7c1I92RP3l2kxjhuPi4yKh3GbC7mJhUf/tyv+6Tvzm5Z7C3v7fo3mJov7z8giU146Ui5kAAN7Jm7W8yH+Mi+7VpP+pJkW16lBZVMro9mG34r65oufw+chIUf7SjGvG8P+rKiV1u3+JhK6rlf/Gbf/Me97NoxGb2DBUc//CY5OTk/7Yk/Omd++nNyWExpunuFSu3QCH06PZ8u7csypyuF6+7PX8/Wd6l/+0Ps7Do6yNRPuxN7vi9v62RFBqelG15nCBhr+OPBA+at+dNJ9/QyN9wCtwtyiMzEBRV2B1gP7ZmI+csSJ7v3B/gv+6UQwOD56fjP6zPmB0fkBgef64ST9XfYBvSXBpTRA7Y/+/Wf/w0//z3C48cv+9Vv/gsP/67/7pwf/sz//9+f7mtf7ksP7gp+yRM+gzMcnJyWpqavb29fn5+vLx8dnZ2dLS0tXV1d3d3Rk3ZUNERUCBt2g5Xu7ZqyBsq2CWw/Lz98iBP6+FPsXL1Lm5ucHBwYs4UpyamY1nU+Xn7Y6NjP/nw/GtZrKxsYB3WvydIRBhor+YVO5mZUBVYOmmqe7Tm/FoOOaNj3BjY6uzwPKYWSBJb1xTRP/363CCi/bImc+UNeKXTP3w5v748vCmWc7Am2FlYcm8vP/lu1CMvVBeYPqmGsuPWN/q8924cpKMguvKqqWvva6wpPvfzMTIznBqUv/+/bLN5v+3SDBKWzJMdOrDne+yUNdnbTCGxtja4T92mpW93//CYCeFx97Stt7Qq++OVPCIQP/bnZ+HV+i8kPOrhvipkPK1nHKCnVW36Fe46ByJy+WnauHSxyUaBr+RRAAzZv+ZM////8wAACH5BAEAAD8ALAAAAACQAC8AAAj/AH8IHEiwoEGD/RIqXMiwocOHECNKnCjxoMWLGDNa7GeGSaxhkEKKHEmypMmTKFOqXElyWCwm3vppnEkTYz8+zhrp3Mmzp8+fQIMKHUq0qDM+Mmsqpdkvi4KnUKNKnUq1qtWrWLNqjeou6dKvB/sxSkS2rNmzaNOqXcu2rdu3aBl5BUu33wlEePPq3cu3r9+/gAMLHux3yly6S504ssG4sePHkCNLnky5suXLk00gBtsPnaPPoEOLHh2Cn2nTVrCNXs36c2k4oNXxg926tu3W6A5v1khEioDfwIMLH06MX7BAgYLNDjO8uXMBxfmF+J2EX6Dn2LNjl0Jkd81+HQ5F/xpPvrz584H4JSFvRf34dUnOnJ9fPr318UL4CSEfJsl6+gAGeB46HejmXVh/3MCEJAw26OCDD5o2SoPKnTGKffxYMaEP/LjB4Chw8HNGhKetIwkb/ETBoBunwRECg9YxeId+koAIx4QQ5thgFjf8YeCBBXEkyA14FGDkkUgmeeQyGRpJxYzBFMDiHRik50MBGPCDgpH5uZEkkyjMKEQByo1SwIxWROFHiFQUYAUcBVBh2pj5janknUfqwIcgZvwI5ED9rCGoIFlMYuihiCZqKIenmQYHBokCwg8UkwyhZaVwwDFEohzukWUwlgYzCRCzbTrJHvz4MAkK/EwiKT+ADP+RqamK1jpJFnwIuoaff/7AkRnAmiFFFjoUa+yxyEpqBQrMQgFEsVGwehoGxZqmAxSpIquDpH7ooByqbOjAISDGYguFDqwCAQeKKGC7h7bwFuvOCcECy+uf/TCg774MHDJFFhwELPDAAbeHAcEcZAmHH6Tys0vArO4ChxUIc9DeMhxgaxoUGU8qMIp+dMwqBii8yQ8QFROcxRTo8LvvvUD2Y0IHNNds8w0456zzDabtjDMt/NBywy38TJAzM/zkws8tPvPMD84jnMb0O/xAAzU/hohzA9BJ36A0P8w0vTMDNpdtAswH9uOECWy37fbbb7/Bjx1wmyAH1oQYMnfbhJj/ZkTdctPNthGmsb2F3jUUorccbN/NDyom1GBaHHVXXrcTaKftxOacd+6556jY8cLnmxNuR+iFcC63IXGQHvrom4deA+fGEM7PN6jQbocRm8thByGkBx985mkTYfzxyCev/PLMIy85Ic1HL/301CdPfNouZ6/99tzru882WG/R/fjkl1/+9Wmvscj67Lfv/vvwxw9N0SPEb//9+Odv/669MnXFCQAMoAAHSMACGvCACEygAhdIwCugD19TGIAEJ0jBClrwghjMoAY3yMEOUtAw/VtKP6TAiBKa8IQoTKEKV8jCFrrwhTAsoRQeGMJa9MMjj8ihDnfIwx768IdADKIQ/4cIxJf0oxYhRIwNKcLEJjrxiUxMohSnSMUqWvGKWMyiFrfIxS568YtgDKMYx0jGMoZREWhMoxrXuMaB+OONcIyjHOU4kHqMgQZjqEcREjADENSBC3oQAx0iMJALWOKQiEykIhF5gYE0Y5GQVGQzrsjGSlbSjXPM5BwHcscm4LENfPQjIJ8wyIGsQpOo9McqTJlKTa7SimgUxQcqQcsPiAKNKjgFJXZ5ChWgEZOtzCQnm0DMPIbyj3ogJSEFoopgzlEVA1FFJqZJzWpak5rQhCUraMlNWrLCFbsM5y5doQhgOjOOnKRBMUHZR2SS8gEDmcU54ziLeGLinvjMpz7xWf9PK4qim910AAnEKU4VDAQPaYgGIvxhC1uUwgD+CIUBDEAKf+Rgom/kZAIoAAY1qAEMYMhACnJwjg3QAZ4CQcA84YiAgSBAEzCNqUxnGtOWWvEDuNCABgDKC15Q4hjKEGcFpOHGBaCBCRcNgEQ3YAARbCAH/iDFRDfgD076Awz+OEIGyIAEf2xACf7ohj9Q+gOVgkICAFiBPyQAihJooQGwwAIo5soMf9i0rBCIQQx2AIFfxCAVqfhrKnawgy6UIQ8QuCsVl+CPV+BAF73QhQt0UQJ5hMMULrAGPIpRDBewwI0HsAU1JDoNih5goqUwBVP9YYAFVFUgM0AlN6bxRrL/tsIfc+0DAUBBAH+ww60ECC5ve9uKgbQCAp8owwQgMIgJlCEIn5hAHvQ6gQmUAwLFteI43sgDf5iCB694xRtlYAF8aOKNyCiHLDBpC3MYIBSlDYU/UiDVUjzDAAEwQCle+4MZ9KAKRZhBFb7wBVHqgQ4nHQgW/BHc3uqWGVqYRzxWAABQMJgAmsCCgmXwCXp84hqfiMEnupDcEMeguuWQgYat2AvvvhEHb3wFDJLRgGQgwxT+yEcy/FEBTD4UokwNQABSkF8RTHSiIuAvCHrgBQocwavnOMA53khbssJipW+ExUBgweHmxmAQOwCHiGWg170OYhCd0LIVl4ALBzhA/wM53akHfHqMY8hCFhVQhixOAUyK+mMBrT0yKe4bgA1IlL91uIcX4kiGOZJVAnJshTCqsYIV6EMYNYAjDIAhgYFIwBOgDrUntPGLX4ha1J32J0C5KVCChtOgAsEyHAfChXTYOh3kEIEYRMDrB4jgAY8+JzJaQAISpPoHEtiEspfN7GYv+9hUVMQ2V/1NV1OCnOZc6UDmwO05JFMMEYgAsMdNVgAE0wJaKHaxATAQAHTi3fCOt7zhzW5YKkKW3LQlLnXJS1+WM9ayriodfvCEghtckIMkd7k1mQwLtKAd6lZ3vX8AAE5Y/OIYz/jFJx5tS3r8lwCX9Q8GLoaSlxzB4UFWOFnV+sZkZKMELQBGxGdOghUMZAUXyLnOd85zndvc3h+3ZLbnOZBwGz3lKi/3JZbO9KY7nekT98XTp+50X9AlIAA7"
               border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
    </form>
    <p>You can also donate through Alipay to the following account: <br>cs0x7f@gmail.com</p>
    <p><img style="display:inline-block; width:10em; height:10em;"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABsCAIAAAAABMCaAAABoklEQVR42u3aUY6DMAwFQO5/6e0JViq1XwjO5LOqIAxSHJ5z/RnlcSGACHEk4hUY/974i/9/83vlXl3PBREixPmIpYX25oNVrl95GV3PBREixLMQ05OuXD9RoG5fByJEiBCfnDREiBAhDkashAulTTJEiBAhbhJAJIKM41IciBAhLkOMNHQ2+P313T6IECEuQ9z60FBTcYjMDSJEiCMRKx//K4tMYvNcOkwAESLEoxBXNukTwW1XKAsRIsRzEZ9CqUAkClQpxYEIEeIYxApo1+b2qeK2xRcLRIgQH0dMLPaVSVeg080piBAhzkdMB59dQWn6BTxWnSFChLgtYrqAlCYdPmwVCWUhQoQ4HjFRZBIHCBIbeIgQIUJs/WhPLPDhxhlEiBDPQkyPdIFKo99OtiFChPhqxHRzZ+Xho3SwAhEixLMQ0wt/2wOEN+dtoSxEiBDHIO7QhFrZtLr94iFChAgx1AzqKmgrwwiIECFC7ERMh69dG2yIECFCXBFAVIpAegP/mhQHIkSIUcSVjar0hjkeJEOECHEkovFjIUUAEeKU8QE0apeVMce/LwAAAABJRU5ErkJggg==">
    </p>
    <p>Your support is greatly appreciated!</p>
</div>
