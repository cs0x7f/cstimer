<h1>csTimer version <?php echo $version;?> - スピードキューブ練習用タイマー</h1>
<?php include('lang.php') ?>
<h2>説明</h2>
<p>csTimerはスピードキューバーのために設計されたタイマーであり、以下のような機能を持ちます：</p>
<ul>
<li>多種多様なスクランブルアルゴリズム：<strong>全てのWCA公式種目</strong>、その他の回転パズル、特定のサブステップに対する<strong>練習用スクランブル</strong>(例：<strong>F2L, OLL, PLL, ZBLL</strong>。ケースの絞り込みも可能)など。</li>
<li>豊富な統計機能：<strong>スプリットタイム計測</strong>、<strong>任意個のセッション作成</strong>、セッションの分割/マージなど。</li>
<li>多くのソルバー：<strong>クロス、X-Cross、2x2x2の一面、スキューブの一面、スクエア1の成形</strong>などのサブステップの学習／練習に利用できます。</li>
<li>その他の補助ツール：スクランブル描画、インスペクションタイムの(音声による)8秒のコール、メトロノーム、スクランブルジェネレーターなど。</li>
<li>バックアップ機能：データの消失を防ぐために、ソルブ情報をローカルファイルに保存したり、csTimerのサーバーやGoogle ストレージにアップロードできます。</li>
</ul>
<p>csTimerはモダンなデスクトップブラウザのほとんどをサポートしています。スマートフォンやタブレットPCでは、csTimerをホームスクリーンに追加することで、ネイティブアプリと同様に使用できます。</p>
<p>csTimerはブラウザキャッシュを利用しています。そのため、初回起動時のみ通信が必要ですが、それ以降はネット接続なしで使用することが可能です。(バックアップ機能などを除く)</p>
<h3>コピーライト</h3>
<p>csTimerはGPLv3に準拠するオープンソースソフトウェアです。 csTimerに対する提案や意見などは、<a class="click" href="https://github.com/cs0x7f/cstimer/issues">こちら</a>にお寄せください。</p>
<p>作者：<a href="mailto:cs0x7f@gmail.com">Shuang Chen (cs0x7f@gmail.com)</a></p>
<p>UIデザイン：<a href="mailto:liebe7@126.com">Yue Zhang (liebe7@126.com)</a></p>
<h2>基本機能</h2>
<ul>
<li><strong>タイマーをスタートさせる</strong> - スペースバー(または左右両方のCtrlキー、またはモバイル端末のタッチスクリーン)を、タイマーが緑色になるまで押さえてください。スペースバーを離すと同時に計測が始まり、任意のキーが押されたときに計測が終了され、タイムが記録されます。</li>
<li><strong>UIの説明</strong> - csTimerのロゴの周りに6つのボタンがあります：オプション、エクスポート、スクランブル、タイム一覧、寄付、ツール。<strong>スクランブル</strong>、<strong>タイム一覧</strong>、<strong>ツール</strong>を押すと、それに対応するパネルが開きます。</li>
<li><strong>スクランブルパネル</strong> - スクランブルパネルでは、スクランブルの種類を選んだり、(可能ならば)スクランブルの長さやケースを指定したり、前のスクランブルを見返したり、次のスクランブルを生成したりできます。</li>
<li><strong>タイム一覧パネル</strong> - タイム一覧パネルでは、"セッション"を押してセッションマネージャーを開き、セッションの選択/追加/削除が行えます。セッションを選択すると、現在の単発/平均記録と、ベスト単発/平均記録、そしてすべてのタイムを参照できます。</li>
<li><strong>ツールパネル</strong> - ツールパネルで機能を選択すると、スクランブル描画、スクランブル生成、ソルバー、統計情報などが利用できます。</li>
</ul>
<h2>キーボードショートカット</h2>
<table class="table" style="display: inline-block;">
<tr><th>キー</th><td>動作</td></tr>
<tr><th>Alt + 1</th><td>スクランブルの種類をスクエア1に変更</td></tr>
<tr><th>Alt + 2 ~ 7</th><td>スクランブルの種類を2x2x2～7x7x7に変更</td></tr>
<tr><th>Alt + p/m/c/s</th><td>スクランブルの種類をピラミンクス/メガミンクス/クロック/スキューブに変更</td></tr>
<tr><th>Alt + i</th><td>スクランブルの種類を「入力」に変更</td></tr>
<tr><th>Alt + d</th><td>現在のセッションのタイムをすべて削除</td></tr>
<tr><th>Alt + z</th><td>最後のタイムを削除</td></tr>
<tr><th>Alt + ↑/↓</th><td>前/次のセッションに移動</td></tr>
<tr><th>Alt + ←/→</th><td>前/次のスクランブルを表示</td></tr>
<tr><th>Ctrl + 1/2/3</th><td>最後のタイムをOK/+2/DNFにする</td></tr>
</table>

</table>

<table class="table" id="vrckey" style="display: inline-block;">
<tr><th colspan=10>仮想キューブのキー割り当て</th></tr><tr>
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

<h2>オプションの詳細</h2>
<ul>
<li><strong data="opt_ahide">記録中はすべての要素を非表示にする</strong>. 計測中にロゴとすべてのパネルを非表示にします。</li>
<li><strong data="opt_useMilli">ミリ秒を使用</strong>. ミリ秒まで表示を行います。このオプションに関係なく、csTimerの計測は内部的には1ミリ秒単位で行われます。</li>
<li><strong data="opt_timeFormat">時間形式</strong>. タイムの表示形式を指定します。</li>
<li><strong data="opt_atexpa">オートエクスポート (100ソルブごと)</strong>. これが有効な場合、csTimerは100ソルブごとに自動的に指定された場所(ローカルファイル、サーバー、Google ストレージ)にエクスポートを行います。</li>
<li><strong data="opt_expp">最新でないデータをインポート</strong>. エクスポートを複数回行っている場合、直近10個のバックアップから好きなものを選んでインポートできます。間違ったデータをアップロードしたとき、このオプションがデータを復元する助けになるでしょう。</li>
<li><strong data="opt_useLogo">ロゴにメッセージヒントを表示</strong>. csTimerのロゴ部分にさまざまな情報が表示されるようになります(PBの更新など)。</li>
<li><strong data="opt_showAvg">アベレージのラベルを表示</strong>. タイマーの下に現在の平均記録を2つ表示します。デフォルトではao5とao12を表示します。</li>
<li><strong data="opt_zoom">拡大</strong>. すべての要素の表示サイズを調節します。</li>
<li><strong data="opt_font">タイマーフォントの選択</strong>. タイマーのフォントを指定します。</li>
<li><strong data="opt_uidesign">UIデザイン</strong>. UI表示をマテリアルデザインにするか、影を表示するかを切り替えます。</li>
<li><strong data="opt_view">UIスタイル</strong>. デスクトップ表示とモバイル表示を切り替えます。</li>
<li><strong data="opt_wndScr">スクランブルパネルの表示スタイル</strong>. スクランブルパネルをフラット表示にします。</li>
<li><strong data="opt_wndStat">統計パネルの表示スタイル</strong>. タイム一覧パネルをフラット表示にします。</li>
<li><strong data="opt_wndTool">ツールパネルの表示スタイル</strong>. ツールパネルをフラット表示にします。</li>
<li><strong data="opt_bgImgO">背景画像の透過度</strong>. 背景の透過度を指定します。</li>
<li><strong data="opt_bgImgS">背景画像</strong>. 背景画像を指定します。ブラウザのセキュリティ的制約により、httpsで始まるURLのみが指定可能です。</li>
<li><strong data="opt_timerSize">タイマー サイズ</strong>. タイマーの大きさを指定します。</li>
<li><strong data="opt_smallADP">小数点の後に小さいフォントを使用する</strong>. タイマーの小数点より後ろの数字を小さくします。</li>
<li><strong data="opt_useMouse">マウスタイマーの使用</strong>. マウスでタイマースタートを行います。キーボードによる操作も可能なままになります。</li>
<li><strong data="opt_useIns">WCA インスペクションの使用</strong>. WCA形式のインスペクションタイムを有効にします。15秒のカウントダウンおよび、15秒超過ペナルティの+2/DNFの付与を自動的に行います。</li>
<li><strong data="opt_voiceIns">WCA インスペクションの音声警告</strong>. WCA公式大会のジャッジと同様に、8秒/12秒のコールを音声で行います。</li>
<li><strong data="opt_voiceVol">音量</strong>. 上述のコールの音量を指定します。</li>
<li><strong data="opt_input">タイム入力方法</strong>. csTimerにソルブを追加する方法を指定します。キーボードによる計測の他に、手動入力、スタックマットタイマーからの自動入力、Blueetothスマートキューブや仮想キューブが使えます。</li>
<li><strong data="opt_intUN">整数を入力するときの単位</strong>. タイム入力欄にXXXという数を入力したとき、それを秒単位か、0.01秒単位か、0.001秒単位として認識するかを指定します。</li>
<li><strong data="opt_timeU">タイマー更新間隔</strong>. 計測中にタイマーを更新する頻度を指定します。</li>
<li><strong data="opt_preTime">スペースキーを押し続ける時間(秒)</strong>. スペースバーをどれだけ押し続けたらタイマーを緑色にするかを指定します。</li>
<li><strong data="opt_phases">マルチフェイズ</strong>. フェーズ数を設定します。計測中に任意のキーを押すことで、スプリットタイムを記録できます。</li>
<li><strong data="opt_stkHead">スタックマットのステータス情報を利用する</strong>. スタックマットは、左と右のどちらのセンサーが押されているか等の情報を出力しています。csTimerはそのような情報も取得できますが、データ読み取りにエラーが生じると予期せぬ動作を招く可能性があります。</li>
<li><strong data="opt_scrSize">スクランブルサイズ</strong>. スクランブルの表示サイズを指定します。</li>
<li><strong data="opt_scrASize">自動スクランブルのサイズ</strong>. スクランブルの長さに応じて表示サイズを調整します。このオプションは上述のサイズ指定と連動します。</li>
<li><strong data="opt_scrMono">等幅スクランブル</strong>. スクランブルを等幅フォントで表示します。</li>
<li><strong data="opt_scrLim">スクランブル領域の高さ制限</strong>. 長いスクランブルを表示する際に、スクランブルパネルが大きくなりすぎないようにスクロールバーを表示します。</li>
<li><strong data="opt_scrAlign">スクランブルエリアの左右配置</strong>. スクランブルパネルの(セレクタを含んだ)文字寄せ位置を指定します。</li>
<li><strong data="opt_preScr">pre-scramble</strong>. スクランブルの前に行う回転を指定します。このオプションは仮想キューブとスクランブル描画に適用されます。</li>
<li><strong data="opt_scrFast">4x4x4の高速スクランブルを利用する(非公式)</strong>. WCA公式の4x4x4スクランブルは計算コストが高いため、このオプションを設定してランダムムーブでスクランブルを生成させることができます。</li>
<li><strong data="opt_scrKeyM">スクランブルの主要な動きにラベルをつける</strong>. スクランブルの重要な部分に印を付けます。例えば、スクエア1のスクランブル中で長方形が崩れるような部分です。</li>
<li><strong data="opt_scrClk">スクランブルをクリックしたときの動作</strong>. スクランブル表示をクリックしたとき、スクランブルをコピーするか、次のスクランブルを生成するか指定します。</li>
<li><strong data="opt_trim">片側で除外するソルブ数</strong>. 平均を計算するとき、上下何%を除外するかを指定します。</li>
<li><strong data="opt_statsum">タイム一覧の前にサマリーを表示</strong>. タイム一覧の前に統計テーブルを表示します。</li>
<li><strong data="opt_printScr">統計情報にスクランブルを表示</strong>. 統計情報ダイアログにスクランブルを表示します。</li>
<li><strong data="opt_printDate">統計情報にソルブ日時を表示</strong>. 統計情報ダイアログにソルブ日時を表示します。</li>
<li><strong data="opt_imrename">セッション作成後すぐに名前を変更する</strong>. セッション作成直後に名前変更を行います。</li>
<li><strong data="opt_scr2ss">スクランブルのタイプを変更したとき新しいセッションを作成</strong>. スクランブルの種類を変更したとき、新しいセッションを作成します。</li>
<li><strong data="opt_statinv">逆順のタイム一覧</strong>. タイム一覧を反転させます。つまり、最後のソルブがリストの一番下に表示されます。</li>
<li><strong data="opt_statclr">セッションを空にすることを許可</strong>. このオプションが無効な場合、セッション選択画面の'X'ボタンが'+'ボタン(セッション作成)に置き換わります。つまり、セッションを削除する代わりに空のセッションを作成するようになります。</li>
<li><strong data="opt_absidx">統計報告に絶対指数を表示</strong>. 統計情報ダイアログで、1から始まる番号(例：mo3なら1/2/3)の代わりに、ソルブ自体の番号を表示します。</li>
<li><strong data="opt_rsfor1s">ソルブ番号をクリックしたときに統計を表示</strong>. タイム一覧の最初の列をクリックしたとき、そのソルブの統計情報を表示します。</li>
<li><strong data="opt_statal">統計指標</strong>. タイム一覧に表示する統計指標をカスタマイズします。aoXとmoXが指定できます。</li>
<li><strong data="opt_delmul">複数削除を有効にする</strong>. ソルブを複数削除できるようにします。操作ミスを防ぐため、選択されたソルブが削除されるソルブのうち最も古いものとして処理されます。</li>
<li><strong data="opt_disPrec">タイム分布の精度</strong>. タイム分布ツールのタイムの区切り方を指定します。</li>
<li><strong data="opt_solSpl">解法を段階的に表示</strong>. 有効な場合、ソルバーはまず手数のみを表示し、解法を1手ずつ見られるようになります。無効な場合、最初から解法全体が表示されます。</li>
<li><strong data="opt_imgSize">スクランブルのイメージサイズ</strong>. スクランブル描画のサイズを指定します。</li>
<li><strong data="opt_NTools">ツール表示数</strong>. csTimerは最大4つのツールを同時に表示できます。</li>
<li><strong data="opt_useKSC">キーボードショートカットを有効にする</strong>. キーボードショートカットを有効にし、スクランブルの種類変更、次のスクランブル取得、セッションの移動などを行えるようにします。</li>
<li><strong data="opt_vrcSpeed">VRCの基本速度(tps)</strong>. 仮想キューブの表示速度を指定します。回転が累積されてくると、速度は上がります。</li>
<li><strong data="opt_vrcMP">マルチフェイズ</strong>. 仮想キューブやスマートキューブ使用時に、フェーズごとのスプリットタイム測定を自動で行います。</li>
<li><strong data="opt_giiVRC">仮想Giikerキューブの表示</strong>. スマートキューブ接続時に、メイン画面に仮想キューブを表示します。</li>
<li><strong data="opt_giiSD">時間経過でスクランブル状態とみなす</strong>. スマートキューブ接続時に、csTimerはある回転がスクランブルによるものかソルブによるものか特定できません。</li>
<li><strong data="opt_giiSK">スペースバーでスクランブルとみなす</strong>. スペースキーを押すと、スマートキューブをスクランブル済とみなし、回転と同時に計測を開始するようになります。</li>
<li><strong data="opt_giiSM">スクランブルとみなす条件</strong>. スマートキューブのスクランブル完了を示すために、特定の手順を使うようにします。</li>
<li><strong data="opt_giiBS">スクランブルされたときにビープ音を鳴らす</strong>. スクランブル完了時にビープ音を鳴らします。</li>
<li><strong data="opt_giiRST">接続時にGiikerキューブをリセットする</strong>. スマートキューブ接続時に、キューブがソルブ済であるかをcsTimerが確認します。ソルブ済でない場合は、ハードウェア的な問題があるか、キューブが本当にソルブされていない可能性があります。</li>
<li><strong data="opt_giiAED">ハードウェアエラーの自動検知</strong>. スマートキューブの中には、ハードウェア的な問題により回転が抜け落ちてしまうものがあります。csTimerはそのような問題を検出しようと試みます。</li>
</ul>
<h2>ツールの詳細</h2>
<ul>
<li><strong data="tool_scrgen">スクランブルジェネレーター</strong>. ワンクリックで最大999個のスクランブルを生成できます。</li>
<li><strong data="tool_cfm">タイム確認</strong>. 現在のソルブのコメント、スクランブル、ソルブ日時、(可能であれば)reconstructionを表示します。ソルブをクリックしても同じものが表示されます。</li>
<li><strong data="tool_hugestats">クロスセッションの統計情報</strong>. 複数セッションにわたる統計情報を確認します。</li>
<li><strong data="tool_stats">統計情報</strong>. タイム一覧に表示されるものと同様の統計情報を表示します。</li>
<li><strong data="tool_distribution">タイム分布</strong>. タイム分布と安定性分析を表示します。&lt;X Y/Zという表示は、X秒未満のソルブがY個存在し、直近Z個のソルブがすべてX秒未満であるということを意味します。</li>
<li><strong data="tool_trend">タイムトレンド</strong>. 現在のセッションのトレンド曲線を表示します。</li>
<li><strong data="tool_dlystat">Daily Statistics</strong>. 日/週/月/年ごとのソルブ回数を表示します。</li>
<li><strong data="tool_image">スクランブルの描画</strong>. スクランブルが正しいか確認するためのスクランブル描画を表示します。全WCA種目に対応しています。</li>
<li><strong data="tool_roux1">ソルバー &gt; Roux S1 ソルブ</strong>. RouxのFirst Blockソルバーです。1x2x3ブロックを作ります。</li>
<li><strong data="tool_eoline">ソルバー &gt; EOLineソルブ</strong>. EOLineソルバーです。エッジ12個全てのEOが正しく、DFエッジとDBエッジの位置が正しい状態を作ります。</li>
<li><strong data="tool_cross">ソルバー &gt; クロスソルブ</strong>. クロスソルバーです。DF, DL, DR, DBエッジを解きます。</li>
<li><strong data="tool_222face">ソルバー &gt; 2x2x2 一面ソルブ</strong>. 2x2x2一面ソルバーです。2x2x2の一面を作ります。</li>
<li><strong data="tool_333cf">ソルバー &gt; Cross + F2L</strong>. クロスとF2Lのソルバーです。クロスと4つのF2Lをコンピュータ探索で行うため、人間の解き方とは異なる場合があります。</li>
<li><strong data="tool_333roux">ソルバー &gt; Roux S1 + S2</strong>. RouxのFirst BlockおよびSecond Blockのソルバーです。まず1x2x3ブロックをL面に作り、R, M, r, Uを用いてR面にもう一つの1x2x3ブロックを作ります。</li>
<li><strong data="tool_333petrus">ソルバー &gt; 2x2x2 + 2x2x3</strong>. Petrusメソッドの第1ステップと第2ステップのソルバーです。まず左側に2x2x2ブロックを作り、それを2x2x3に拡張します。</li>
<li><strong data="tool_333zz">ソルバー &gt; EOLine + ZZF2L</strong>. EOLineとZZF2Lのソルバーです。まずEOLineを解いて、左側か右側に1x2x3ブロックを作り、それを2x2x3に拡張します。</li>
<li><strong data="tool_sq1cs">ソルバー &gt; SQ1 S1 + S2</strong>. スクエア1の第1ステップと第2ステップのソルバーです。まず成形を行い、U面とD面の色を揃えます。</li>
<li><strong data="tool_pyrv">ソルバー &gt; Pyraminx V</strong>. ピラミンクスのVソルバーです。3つのコーナーと2つのエッジを解き、'V'のパターンを作ります。</li>
<li><strong data="tool_skbl1">ソルバー &gt; Skewb Face</strong>. スキューブの一面ソルバーです。具体的には、1つのセンターとそれに対応する4つのコーナーを揃えます。</li>
<li><strong data="tool_giikerutil">Giiker キューブ</strong>. スマートキューブの補助ツールです。現在の状態や、バッテリー残量や、リアルタイムのreconstructionなどを表示します。</li>
<li><strong data="tool_if">InsertionFinder</strong>. FMCで用いるInsertion finderです。</li>
<li><strong data="tool_mtrnm">メトロノーム</strong>. 特定の周期で音を鳴らすメトロノームです。ソルブ開始から特定の時間が経過したときにも音を鳴らせます。</li>
<li><strong data="tool_onlinecomp">オンライン大会</strong>. オンライン大会です。WCAアカウントでログインすることができ、世界中のスピードキューバーと同じスクランブルを用いて競うことができます。</li>
<li><strong data="tool_stackmatutil">stackmat</strong>. スタックタイマーの補助ツールです。接続状態を確認したり、信号強度やノイズレベルなどを表示できます。</li>
</ul>
<h2>リンク</h2>
<ul>
<li><a class="click" href="https://cubingchina.com/">Cubing China</a></li>
<li><a class="click" href="/new/">csTimer ベータ版</a></li>
<li><a class="click" href="/src/">csTimer ベータ版(未圧縮)</a></li>
<li><a class="click" href="https://github.com/cs0x7f/cstimer">csTimer ソースコード</a></li>
<li><a class="click" href="/old3/">csTimer version 2015.12.12</a></li>
<li><a class="click" href="/old2/">csTimer version 2012.3.15</a></li>
<li><a class="click" href="/old/">csTimer version 2012.2.29</a></li>
</ul>
<h2>配色</h2>
<?php include('color.php') ?>
<div class="donate" style="line-height:1.5em;">
<p>csTimerをサポートいただきありがとうございます！ あなたの寄付は、開発・保守に必要なコストの補填に活用されます。</p>
<p>PayPal経由で寄付していただくには、下記のボタンをクリックするか、<a class="click" href="https://www.paypal.me/cs0x7f">PayPal.me</a>を経由してください。</p>
<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
<input type="hidden" name="cmd" value="_s-xclick">
<input type="hidden" name="hosted_button_id" value="NW25HME3QUEZY">
<input type="image" src="data:image/gif;base64,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" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
</form>
<p>Alipayを用いた寄付も可能です。下記の2次元コードを読み取るか、次のアカウントにお支払いください： cs0x7f@gmail.com</p>
<p><img style="display:inline-block; width:10em; height:10em;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABsCAIAAAAABMCaAAABoklEQVR42u3aUY6DMAwFQO5/6e0JViq1XwjO5LOqIAxSHJ5z/RnlcSGACHEk4hUY/974i/9/83vlXl3PBREixPmIpYX25oNVrl95GV3PBREixLMQ05OuXD9RoG5fByJEiBCfnDREiBAhDkashAulTTJEiBAhbhJAJIKM41IciBAhLkOMNHQ2+P313T6IECEuQ9z60FBTcYjMDSJEiCMRKx//K4tMYvNcOkwAESLEoxBXNukTwW1XKAsRIsRzEZ9CqUAkClQpxYEIEeIYxApo1+b2qeK2xRcLRIgQH0dMLPaVSVeg080piBAhzkdMB59dQWn6BTxWnSFChLgtYrqAlCYdPmwVCWUhQoQ4HjFRZBIHCBIbeIgQIUJs/WhPLPDhxhlEiBDPQkyPdIFKo99OtiFChPhqxHRzZ+Xho3SwAhEixLMQ0wt/2wOEN+dtoSxEiBDHIO7QhFrZtLr94iFChAgx1AzqKmgrwwiIECFC7ERMh69dG2yIECFCXBFAVIpAegP/mhQHIkSIUcSVjar0hjkeJEOECHEkovFjIUUAEeKU8QE0apeVMce/LwAAAABJRU5ErkJggg=="></p>
<p>ご寄付いただきありがとうございます！</p>
</div>