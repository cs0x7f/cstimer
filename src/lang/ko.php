<h1>csTimer version 2018.11.05 - 큐브 연습용 초시계</h1>
<?php include('lang.php') ?>
<p>csTimer는 큐브 애호가들을 위해 특별히 고안된 시간 측정 소프트웨어로, 가장 포괄적이고 사용하기 쉬운 온라인 초시계입니다. csTimer는 <b>모든 WCA 공식 종목</b>을 비롯해 다양한 트위스티
    퍼즐의 섞기를 제공합니다. 또한 초보자가 큐브 맞추기를 보다 수월하게 익힐 수 있도록 <b>Xcross 및 EOLine 도우미</b>를 탑재하였으며, 통계 기능, <b>다단계 측정</b>, (WCA 규정에
    따른) 15초 미리보기 등 다양한 편의기능을 갖추고 있습니다.</p>
<p>csTimer는 크롬(권장), 파이어폭스, 사파리, 오페라, IE7+ 등 다양한 브라우저를 지원합니다. 물론 아이패드, 아이폰 및 대부분의 안드로이드 단말기에서도 사용할 수 있습니다.</p>
<p> --- 프로그램 제작: <a class="click" href="mailto:cs0x7f@gmail.com">Shuang Chen (cs0x7f@gmail.com)</a><br>
    --- UI 디자인: <a class="click" href="mailto:liebe7@126.com">Yue Zhang (liebe7@126.com)</a><br></p>
<h2>기능 소개</h2>
<ul>
    <li><b>초시계 기능</b> - WCA 미리보기, 다단계 측정, 측정 결과 수동 입력, 벌칙(+2/DNF) 등의 기능을 지원합니다. 표시 정확도는 최대 0.001초 입니다.</li>
    <li><b>섞기 기능</b> - 모든 WCA 종목 및 여러 트위스티 퍼즐의 섞기와 더불어, 모서리, 귀퉁이, F2L(CFOP), 맨 위층 등 다양한 연습용 섞기를 지원합니다.</li>
    <li><b>통계 기능</b> - 5회/12회 및 전체 평균을 실시간으로 보여주며, 5회/12회 최고 평균 등을 포함한 모둠 통계 정보의 내보내기 기능을 지원합니다.</li>
    <li><b>부가 기능</b> - 6가지 면에 대한 십자, Xcross(확장된 십자), EOLine의 풀이 및 NxNxN 큐브의 섞인 상태 표시를 지원합니다.</li>
</ul>
<h2>기능 상세 설명</h2>
csTimer는 크롬, 파이어폭스, 사파리에서 정상 작동을 확인했습니다. 또한 아이패드 및 일부 태블릿 PC에서도 정상 작동을 확인했습니다.
<h3>초시계 기능</h3>
<ul>
    <li><b>시간 측정</b> - 먼저 스페이스바를 눌러 화면의 글자가 초록색으로 바뀔 때까지 기다립니다. 그 다음 손가락을 자판에서 떼면 시간 측정이 시작되고, 퍼즐을 맞춘 뒤 아무 키나 누르면 측정이
        종료되고 시간이 기록됩니다.
    </li>
    <li><b>시동 전 대기</b> - csTimer는 스택매트와 마찬가지로 시동 전 대기 기능을 지원합니다. 따라서 시간을 측정하기 위해서는 스페이스바를 떼기 전에 잠시 동안 기다려야 합니다. 물론 시동을
        위한 대기 시간은 설정에서 조절할 수 있습니다.
    </li>
    <li><b>WCA 미리보기</b> - csTimer는 WCA 규정에 따른 15초 미리보기 기능을 지원합니다. 이 기능을 허용하면, 초시계를 시동했을 때 먼저 15초 미리보기 상태로 진입하게 됩니다.</li>
    <li><b>다단계 측정</b> - csTimer는 다단계 측정 기능을 지원합니다. 이 기능을 허용하면, 퍼즐을 맞추는 도중에 아무 키나 눌러 (설정한 횟수만큼) 분할 시간을 기록할 수 있습니다.</li>
    <li><b>수동 입력</b> - 만약 스택매트 등의 외부 기기 사용을 희망하는 경우, 스스로 측정한 시간을 csTimer에 직접 입력할 수 있습니다.</li>
    <li><b>벌칙 적용</b> - 이 기능을 허용하면, 시간 측정 후 벌칙 적용을 위한 창이 등장합니다. 이 기능을 허용하지 않으면 (미리보기 시간을 초과하지 않는 이상) 모든 측정 결과가 유효한 것으로
        간주됩니다.
    </li>
    <li><b>표시 정확도</b> - csTimer의 표시 정확도는 최대 0.001초입니다. 설정에서 표시 단위를 0.01초로 변경할 수 있으나, 소프트웨어 내부에 기록되는 측정 단위는 0.001초이므로 실제로
        정확도가 감소하거나 하지는 않습니다.
    </li>
    <li><b>표시 형식</b> - 시간을 표시할 때 '분' 또는 '시간' 단위를 허용할지 말지를 설정할 수 있습니다. ("hh:mm:ss.XX(X)" 또는 "mm:ss.XX(X)" 등)</li>
    <li><b>갱신 방식</b> - 시간 측정 중 초시계의 갱신 방식을 본인이 원하는 대로 설정할 수 있습니다. (없음, 1초, 실시간 등)</li>
    <li><b>글꼴 크기</b> - csTimer는 다양한 크기의 화면에 대응할 수 있도록 글꼴 크기 조절 기능을 지원합니다.</li>
    <li><b>색채 배합</b> - csTimer는 다양한 종류의 색 주제를 제공하고 있습니다. 만약 마음에 드는 조합이 없다면 직접 자신의 입맛대로 꾸며보세요!</li>
</ul>
<h3>섞기 기능</h3>
<ul>
    <li><b>WCA 규격 섞기</b> - csTimer는 다음의 모든 WCA 규격 섞기를 지원합니다: 2x2x2, 3x3x3, 피라밍크스, 스퀘어-1, 클락의 무작위 상태 섞기 및 4x4x4, 5x5x5,
        6x6x6, 7x7x7, 메가밍크스의 무작위 수순 섞기.
    </li>
    <li><b>CFOP법 연습</b> - CFOP법 연습을 위해 제공되는 섞기로는 다음이 있습니다: 맨 위층, 맨 위층+홈통 1개, 맨 위층+홈통 4개.</li>
    <li><b>기타 3x3x3 부분해법</b> - CFOP 파생 해법의 연습을 위한 섞기로는 다음이 있습니다: ZBLL, CLL, ELL, RUL 생성자.</li>
    <li><b>루법 연습</b> - 루(Roux)법 연습을 위한 섞기로는 다음이 있습니다: 마지막 여섯 모서리(LSE), 마지막 여섯 모서리+맨 위층 네 귀퉁이(CMLL).</li>
    <li><b>다단큐브 연습</b> - 다단큐브 연습을 위한 섞기로는 다음이 있습니다: 4x4x4, 5x5x5, 6x6x6, 7x7x7 모서리부터 맞추기.</li>
    <li><b>3x3x3 눈가리기 연습</b> - 3x3x3 눈가리기 연습을 위한 섞기로는 다음이 있습니다: 모서리만/귀퉁이만 섞기.</li>
    <li><b>기타 퍼즐</b> - csTimer는 WCA 공식 종목이 아닌 퍼즐에 대해서도 여전히 수많은 종류의 섞기를 제공합니다.</li>
</ul>
<h3>통계 기능</h3>
<ul>
    <li><b>모둠 구분</b> - 시간목록 창의 맨 첫 줄은 모둠 선택 칸입니다. 이 칸에서 모둠의 종류를 변경/추가할 수 있으며, 각 모둠의 퍼즐(섞기) 유형을 서로 다르게 지정할 수 있습니다. 모든 측정
        결과는 모둠 단위로 기록되며, 각 모둠의 통계는 독립적으로 산출됩니다.
    </li>
    <li><b>실시간 평균</b> - 현재 모둠의 측정 횟수와 실시간 전체 평균이 시간목록 위에 굵은 글씨로 표시됩니다.</li>
    <li><b>동적 5회평</b> - 측정 횟수가 5회에 도달한 뒤부터 시간목록의 'ao5' 열에 5회 절단평균이 실시간으로 표시되며, 그 중 원하는 값을 눌러 상세 정보를 표시하거나 내보낼 수 있습니다.
    </li>
    <li><b>동적 12회평</b> - 측정 횟수가 12회에 도달한 뒤부터 시간목록의 'ao12' 열에 12회 절단평균이 실시간으로 표시되며, 그 중 원하는 값을 눌러 상세 정보를 표시하거나 내보낼 수
        있습니다.
    </li>
    <li><b>통계 상세 정보</b> - 실시간 평균이 표시되는 부분을 누르면 모둠 통계 정보 창이 나타나면서 측정된 시간, 설명, 벌칙 적용 여부 등이 표시됩니다.</li>
    <li><b>벌칙 적용/설명 추가</b> - 시간이 적혀있는 칸에 화살표를 올려놓으면 해당 시간에 벌칙(OK/+2/DNF)을 적용하거나 설명을 기입할 수 있는 작은 창이 나타납니다.</li>
    <li><b>시간 삭제/모둠 초기화</b> - 시간이 적혀있는 칸에 화살표를 옮긴 뒤 나타나는 창에서 'X' 단추를 눌러 해당 시간을 삭제하거나, 모둠 선택 칸 옆의 'X' 단추를 눌러 해당 모둠의 시간목록을
        초기화할 수 있습니다.
    </li>
</ul>
<h3>단축키</h3>
<ul>
    <table class="table" style="display: inline-block;">
        <tr>
            <th>단축키</th>
            <td>기능</td>
        </tr>
        <tr>
            <th>Alt + 1</th>
            <td>섞기 유형을 스퀘어-1로 전환합니다.</td>
        </tr>
        <tr>
            <th>Alt + 2 ~ 7</th>
            <td>섞기 유형을 2x2x2~7x7x7로 전환합니다.</td>
        </tr>
        <tr>
            <th>Alt + p/m/c/s</th>
            <td>섞기 유형을 피라/메가밍크스/클락/스큐브로 전환합니다.</td>
        </tr>
        <tr>
            <th>Alt + i</th>
            <td>섞기 유형을 수동 입력으로 전환합니다.</td>
        </tr>
        <tr>
            <th>Alt + d</th>
            <td>현재 모둠의 시간목록을 초기화합니다.</td>
        </tr>
        <tr>
            <th>Alt + z</th>
            <td>현재 모둠에서 가장 마지막에 측정된 시간을 삭제합니다.</td>
        </tr>
        <tr>
            <th>Alt + 위/아래</th>
            <td>이전/다음 모둠으로 전환합니다.</td>
        </tr>
        <tr>
            <th>Alt + 왼쪽/오른쪽</th>
            <td>이전/다음 섞기 공식을 표시합니다.</td>
        </tr>
        <tr>
            <th>Ctrl + 1/2/3</th>
            <td>가장 마지막에 측정된 시간에 'OK/+2/DNF'를 적용합니다.</td>
        </tr>
    </table>
    <table class="table" id="vrckey" style="display: inline-block;">
        <tr>
            <th colspan=10>가상 큐브 키 설정</th>
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
<h2>링크</h2>
<ul>
    <li><a class="click" href="http://cubingchina.com/">Cubing China: 중국 큐브 대회 공식 웹사이트</a></li>
    <li><a class="click" href="/old2/">csTimer version 2012.3.15 (only zh-cn)</a></li>
    <li><a class="click" href="/old/">csTimer version 2012.2.29 (only zh-cn)</a></li>
    <li><a class="click" href="/src/">csTimer with uncompressed files</a></li>
    <li><a class="click" href="https://github.com/cs0x7f/cstimer">source code of csTimer</a></li>
</ul>
<h2>색채 배합</h2>
<?php include('color.php') ?>
<div class="donate" style="line-height:1.5em;">
    <p>csTimer의 후원에 관심을 가져주셔서 감사합니다! 기부해주신 금액은 저희들의 후속 개발과 유지비에 사용될 예정입니다.</p>
    <p>후원을 희망하시는 분들께서는 페이팔(PayPal)을 이용하여 아래의 단추나 <a href="https://www.paypal.me/cs0x7f" class="click"> PayPal.me</a>에서
        기부하실 수 있습니다. </p>
    <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
        <input type="hidden" name="cmd" value="_s-xclick">
        <input type="hidden" name="hosted_button_id" value="NW25HME3QUEZY">
        <input type="image"
               src="data:image/gif;base64,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"
               border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
    </form>
    <p>그 밖에도 알리페이(Alipay)를 이용하여 QR코드를 스캔하거나 다음 계좌를 통해 기부하실 수 있습니다: <br>cs0x7f@gmail.com</p>
    <p><img style="display:inline-block; width:10em; height:10em;"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABsCAIAAAAABMCaAAABoklEQVR42u3aUY6DMAwFQO5/6e0JViq1XwjO5LOqIAxSHJ5z/RnlcSGACHEk4hUY/974i/9/83vlXl3PBREixPmIpYX25oNVrl95GV3PBREixLMQ05OuXD9RoG5fByJEiBCfnDREiBAhDkashAulTTJEiBAhbhJAJIKM41IciBAhLkOMNHQ2+P313T6IECEuQ9z60FBTcYjMDSJEiCMRKx//K4tMYvNcOkwAESLEoxBXNukTwW1XKAsRIsRzEZ9CqUAkClQpxYEIEeIYxApo1+b2qeK2xRcLRIgQH0dMLPaVSVeg080piBAhzkdMB59dQWn6BTxWnSFChLgtYrqAlCYdPmwVCWUhQoQ4HjFRZBIHCBIbeIgQIUJs/WhPLPDhxhlEiBDPQkyPdIFKo99OtiFChPhqxHRzZ+Xho3SwAhEixLMQ0wt/2wOEN+dtoSxEiBDHIO7QhFrZtLr94iFChAgx1AzqKmgrwwiIECFC7ERMh69dG2yIECFCXBFAVIpAegP/mhQHIkSIUcSVjar0hjkeJEOECHEkovFjIUUAEeKU8QE0apeVMce/LwAAAABJRU5ErkJggg==">
    </p>
    <p>귀하의 후원에 진심으로 감사드립니다!</p>
</div>
