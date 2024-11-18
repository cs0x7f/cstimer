<h1>csTimer wersja <?php echo $version;?> - Profesjonalny Timer do Speedcubingu</h1>
<?php include('lang.php') ?>
<h2>Wprowadzenie</h2>
<p>csTimer jest profesjonalnym timerem zaprojektowanym dla speedcuberów, który zawiera:</p>
<ul>
<li>Wiele algorytmów mieszania,w tym <strong>wszystkich oficjalnych konkurencji WCA</strong>, Odmiany dla podwójnych łamigłówek, <strong>treningowe algorytmy</strong> dla konkretnych podetapów (np. <strong>F2L, OLL, PLL, ZBLL</strong>)</li>
<li>Mnóstwo funkcji statystycznych, obsługuje <strong>rozkład czasów</strong>; <strong>Dowolna liczba sesji</strong>, rozdzielenie/scalanie sesji itp.</li>
<li>Odmiany rozwiązywania, takie jak <strong>Cross, Xcross, face 2x2x2, Skewb Face, SQ1 shape</strong>, do nauki etapów układania.</li>
<li>Inne narzędzia pomocnicze, takie jak wizualizacja scrambla, sygnał głosowy preinspekcji po 8 sekundach, metronomy, generator serii scrambli itp.</li>
<li>Funkcja kopii zapasowej, aby uniknąć utraty danych, możesz wykonać kopię zapasową swoich ułożeń do plików lokalnych, serwera csTimera lub dysku Google.</li>
</ul>
<p>csTimer obsługuje większość nowoczesnych przeglądarek stacjonarnych, na telefonie komórkowym i tablecie, możesz dodać csTimer do ekranu głównego i będzie działać jako natywna aplikacja.</p>
<p>csTimer korzysta z pamięci podręcznej przeglądarki, która zużywa internet tylko wtedy, gdy otwierasz go po raz pierwszy, Następnie csTimer jest w stanie działać bez połączenia sieciowego (z wyjątkiem funkcji takich jak kopia zapasowa)</p>
<h3>Copyright</h3>
<p>csTimer jest oprogramowaniem open source, które jest zgodne z GPLv3. Jeśli masz jakieś sugestie lub komentarze dotyczące csTimer, prosimy o przesłanie ich <a class="click" href="https://github.com/cs0x7f/cstimer/issues" title="">tutaj</a></p>
<p>Stworzone przez: <a href="mailto:cs0x7f@gmail.com">Shuang Chen (cs0x7f@gmail.com)</a></p>
<p>Interfejs użytkownika zaprojektowany przez: <a href="mailto:liebe7@126.com">Yue Zhang (liebe7@126.com)</a></p>
<h2>Podstawowe funkcje</h2>
<ul>
<li><strong>Jak rozpocząć odliczanie</strong> - Przytrzymaj spację (lub klawisze Ctrl z lewej i prawej, lub dotknij ekranu na urządzeniach mobilnych) i poczekaj, aż zegar zmieni kolor na zielony, zegar rozpocznie liczenie po zwolnieniu spacji, naciśnij dowolny klawisz, aby zatrzymać czas, który zostanie zapisany.</li>
<li><strong>Opis interfejsu użytkownika</strong> - Istnieje 6 przycisków w pobliżu logo csTimer: opcje, eksportuj, scramble, lista czasów, darowizna, narzędzia, kliknij <strong>scramble</strong>, <strong>lista czasów/0&gt;, </strong>opcje** , aby otworzyć odpowiedni panel funkcji.</li></li>
<li><strong>Scramble Panel</strong> - W panelu Scramble możesz wybrać typ scramble'a, ustaw zwijaną długość i filtr liter (jeśli dostępny), sprawdź poprzedni scramble, wygeneruj następny scramblel.</li>
<li><strong>Panel listy czasów</strong> - W panelu listy czasów możesz otworzyć menedżer sesji klikając "Sesja", wybierz/dodaj/usuń sesje, wyczyść sesje klikając przycisk "x" obok listy sesji, następnie możesz wyświetlić bieżącą pojedynczą/średnią, najlepszą pojedynczą/średnią i pełną listę czasu.</li>
<li><strong>Panel narzędzi</strong> - W panelu narzędzi możesz wybrać określone funkcje pomocnicze, w tym widok scrambla, generatory scrambli, ilość ułożeń i inne rodzaje danych statystycznych.</ul></li>
</ul>
<h2>Skróty klawiszowe</h2>
<table class="table" style="display: inline-block;">
<tr><th>Przycisk</th><td>Funkcja</td></tr>
<tr><th>Alt + 1</th><td>Typ mieszania do Square-1</td></tr>
<tr><th>Alt + 2 ~ 7</th><td>Typ mieszania do 2x2-7x7</td></tr>
<tr><th>Alt + p/m/c/s</th><td>Typ mieszania do pyra/mega/clock/skewb</td></tr>
<tr><th>Alt + i</th><td>Wprowadź scrambla</td></tr>
<tr><th>Alt + d</th><td>Usuń wszystkie ułożenia w sesji</td></tr>
<tr><th>Ctrl/Alt + z</th><td>Usuń najnowszy czas</td></tr>
<tr><th>Alt + strzałka w góre/dół</th><td>Następna/poprzednia sesja</td></tr>
<tr><th>Alt + strzałka w lewo/prawo</th><td>Pokaż poprzedni/następny scramble</td></tr>
<tr><th>Ctrl + 1/2/3</th><td>Ustaw najnowszy czas na OK/+2/DNF</td></tr>
<tr><th>Ctrl + Alt + t/i/s/v/g/q/b/l</th><td>Wprowadź czasy przez timer/pisanie/stackmat/kostka wirtualna/kostka bluetooth/qcube/timer bluetooth/ostatnia warstwa</td></tr>
</table>

<table class="table" style="display: inline-block;">
<tr><th>Gest</th><td>Funkcja</td></tr>
<tr><th>Up left</th><td>Ostatni czas to DNF</td></tr>
<tr><th>Up</th><td>Ostatni czas to +2</td></tr>
<tr><th>Up right</th><td>Ostatni czas jest OK</td></tr>
<tr><th>Left</th><td>Ostatni scramble</td></tr>
<tr><th>Right</th><td>Poprzedni scramble</td></tr>
<tr><th>Down left</th><td>Dodaj komentarz do poprzedniego ułożenia</td></tr>
<tr><th>Down</th><td>Usuń ostatnie ułożenie</td></tr>
<tr><th>Down right</th><td>Sprawdź ostatnie ułożenie</td></tr>
</table>

<table class="table" id="vrckey" style="display: inline-block;">
<tr><th colspan=10>Klawisze Kostki Wirtualnej</th></tr>
</table>

<h2>Opis opcji</h2>
<ul>
<li><strong data="opt_ahide">Ukryj wszystkie elementy podczas układania</strong>. Ukryj logo i wszystkie panele w czasie układania</li>
<li><strong data="opt_useMilli">użyj milisekund</strong>. Wyświetlanie cyfry milisekundowej, bez względu na to, czy jest ona znacząca, wewnętrzna dokładność czasowa csTimer wynosi 1 milisekundę.</li>
<li><strong data="opt_timeFormat">format czasu</strong>. Format wyświetlenia czasu.</li>
<li><strong data="opt_atexpa">Automatyczny eksport (co 100 rozwiązań)</strong>. Jeśli zaznaczone, csTimer automatycznie wyeksportuje rozwiązania co 100 rozwiązań do określonego miejsca, lokalnego pliku, serwera csTimer lub Google Storage.</li>
<li><strong data="opt_expp">Importuj starsze dane</strong>. Jeśli przesłałeś wiele kopii zapasowych, możesz zaimportować jedną z maksymalnie 10 ostatnio przesłanych kopii zapasowych, jeśli przypadkowo wgrasz pustą kopię zapasową, ta opcja pomoże Ci odzyskać swoje rozwiązania.</li>
<li><strong data="opt_useLogo">Wiadomości w logo</strong>. Logo csTimera będzie służyło jako panel do wyświetlania ciekawych informacji, takich jak pobicie własnego rekordu.</li>
<li><strong data="opt_showAvg">Wyświetl etykietę średniego czasu</strong>. Pod głównym minutnikiem wyświetlane są dwa linie etykiet, domyślnie jest to średnia ao5 i ao12.</li>
<li><strong data="opt_zoom">Zbliż</strong>. Możesz dostosować rozmiary wszystkich elementów za pomocą tej opcji.</li>
<li><strong data="opt_font">wybierz czcionkę timera</strong>. Czcionka głównego licznika.</li>
<li><strong data="opt_uidesign">Styl interfejsu użytkownika: </strong>. Możesz przełączyć wygląd interfejsu użytkownika na podobne do materiałów lub ukryć cienie za pomocą tej opcji.</li>
<li><strong data="opt_view">Styl interfejsu</strong>. Przełęcz między widokiem dla urządzeń mobilnych i stacjonarnych.</li>
<li><strong data="opt_wndScr">Styl wyświetlania panelu mieszania</strong>. Panel scrambli osadzony w tle.</li>
<li><strong data="opt_wndStat">Styl wyświetlania panelu statystyk</strong>. Panel czasów osadzony w tle.</li>
<li><strong data="opt_wndTool">Styl wyświetlania panelu narzędzi</strong>. Panel narzędzi osadzony w tle.</li>
<li><strong data="opt_bgImgO">przezroczystość obrazu tła</strong>. Przezroczystość obrazu tła.</li>
<li><strong data="opt_bgImgS">tło</strong>. Możesz wybrać własny obraz jako obraz tła, jednak tylko adresy https są dopuszczane ze względu na ograniczenia bezpieczeństwa przeglądarki.</li>
<li><strong data="opt_timerSize">rozmiar timera</strong>. Ustaw rozmiar głównego zegara.</li>
<li><strong data="opt_smallADP">używaj małej czcionki dla części dziesiętnych</strong>. Użyj mniejszego rozmiaru czcionki dla cyfr po przecinku w głównym liczniku.</li>
<li><strong data="opt_color">wybierz kolor motywu</strong>. Ustaw kolory csTimer'a Kliknij w logo csTimer'a aby pokazać więcej opcji kolorystycznych</li>
<li><strong data="opt_useMouse">Używaj minutnika myszką i klawiaturą</strong>. Użyj myszki, aby uruchomić timer. Wyzwalanie przy użyciu klawiatury będzie również dostępne.</li>
<li><strong data="opt_useIns">użyj inspekcji WCA</strong>. Włącz preinspekcje WCA, która jest 15-sekundowym odliczaniem, automatyczna kara +2/DNF będzie zastosowana, jeżeli przekroczysz czas.</li>
<li><strong data="opt_voiceIns">ostrzeżenie głosowe inspekcji WCA</strong>. Ostrzeżenie przy 8/12 sekundach preinspekcji w celu symulacji ostrzeżenia ze strony sędziego na zawodach WCA.</li>
<li><strong data="opt_voiceVol">Głośność głosu</strong>. Wysoki poziom głośności ostrzeżenia.</li>
<li><strong data="opt_input">wprowadzanie czasów poprzez</strong>. csTimer jest w stanie dodawać rozwiązania na kilka sposobów, obsługuje ręczne wprowadzanie danych, automatycznie rejestrowanie z zegara stackmat, połącz się do inteligentnej kostki bluetooth lub użyj wirtualnej kostki Rubika, poza timerem sterowanym klawiaturą.</li>
<li><strong data="opt_intUN">Jednostka przy wstawaniu liczby całkowitej</strong>. Kiedy wpisujesz liczbę całkowitą XXX w polu wejściowym, to są to sekundy, setne sekundy, czy milisekundy?</li>
<li><strong data="opt_timeU">Aktualizacja czasu jest</strong>. Jak często zegar jest aktualizowany.</li>
<li><strong data="opt_preTime">Czas trzymania spacji (sekundy)</strong>. Jak długo trzeba trzymać spacje, aby zegar zaświecił się na zielono.</li>
<li><strong data="opt_phases">wielofazowe</strong>. Liczba faz, naciśnij dowolny klawisz, aby oznaczyć punkt podziału ułożenia.</li>
<li><strong data="opt_stkHead">Użyj informacji o stanie Stackmat</strong>. Stackmat podaje swój stan, np. prawy pad timera jest dotknięty, csTimer może używać tych informacji, jednak błędy w transmisji mogą powodować nieoczekiwane zachowania.</li>
<li><strong data="opt_scrSize">wielkość scramble&#x27;a</strong>. Rozmiar scrambla</li>
<li><strong data="opt_scrASize">Automatyczny rozmiar scrambla</strong>. Rozmiar tekstu scrambla zostanie automatycznie dostosowany o długość scrambla, działa razem z poprzednią opcją.</li>
<li><strong data="opt_scrMono">Algorytm mieszania o stałej szerokości znaków</strong>. Użyj czcionki o stałej szerokości dla scrambla</li>
<li><strong data="opt_scrLim">Limit wysokości pola ze scramblem</strong>. Gdy obszar scrambla jest zbyt wysoki, pojawi się pasek przewijania, aby uniknąć zwiększenia wysokości pola scrambla</li>
<li><strong data="opt_scrAlign">Wyrównanie tekstu w polu mieszania</strong>. Wyrównanie tekstu scrambla</li>
<li><strong data="opt_preScr">pre-scramble</strong>. Ruchy uwzględniane przed scramblem podczas tworzenia podglądu scrambla i wirtualnej kostki</li>
<li><strong data="opt_scrNeut">Kolor neutralny</strong>. Jeżeli włączone na pozycji/pierwszej warstwie kolory niektórych scrambli treningowych będą losowe</li>
<li><strong data="opt_scrEqPr">Probabilities for training-scramble states</strong>. For training scrambles, the probability of each case can be set to: follow the probability of the actual solving process; or let all cases appear with equal probability; or let all cases appear randomly in sequence (that is, to ensure that all N cases appear at least once in the next 2 N scrambles).</li>
<li><strong data="opt_scrFast">Używanie szybkiego algorytmu mieszającego dla 4x4x4 (nieoficjalny)</strong>. Oficjalny scramble 4x4x4 WCA wymaga ogromnych zasobów obliczeniowych, wybierz tę opcję, aby scramble używał losowych ruchów</li>
<li><strong data="opt_scrKeyM">Oznacz kluczowe ruchy w scramble&#x27;u</strong>. Mark a key move in the scramble, e.g. the move that take the state away from square shape in SQ1 scrambles.</li>
<li><strong data="opt_scrClk">Akcja po kliknięciu na scramble</strong>. Zachowanie po kliknięciu na scramble'a, skopiuj scramble lub wygeneruj następne scramble.</li>
<li><strong data="opt_trim">Liczba ułożeń niebranych pod uwagę</strong>. Liczba ułożeń z każdej strony (najlepszych i najgorszych), które nie są uwzględniane podczas obliczania średniej z ułożeń.</li>
<li><strong data="opt_statsum">pokaż podsumowanie przed listą czasu</strong>. Pokaż tabelę statystyk przed listą czasów.</li>
<li><strong data="opt_statthres">Show target time for session best</strong>. In the statistics table, the time required to refresh personal best after next solve is displayed. "N/A" means the next solve will not refresh PB no matter how fast it is, "&#8734;" means any time except DNF will refresh PB.</li>
<li><strong data="opt_printScr">Dołącz algorytmy mieszania do statystyk </strong>. Pokaż scrambla w oknie statystyk ułożenia.</li>
<li><strong data="opt_printDate">Dołącz datę ułożenia do statystyk</strong>. Pokaż datę rozwiązania w oknie statystyk rundy.</li>
<li><strong data="opt_imrename">zmień nazwę sesji po utworzeniu</strong>. Natychmiast zmień nazwę sesji po jej utworzeniu.</li>
<li><strong data="opt_scr2ss">utwórz nową sesję po przełączaniu typu scrambla</strong>. Po przełączeniu typu scrambla zostanie utworzona nowa sesja.</li>
<li><strong data="opt_statinv">Odwrotna kolejność na liście czasów </strong>. Odwróć listę czasu, tym samym najnowsze rozwiązania znajdą się na dole listy czasu.</li>
<li><strong data="opt_statclr">Włącz opróżnianie sesji</strong>. Po wyłączeniu, przycisk '+' (do tworzenia sesji) zastąpi przycisk 'X' obok selektora sesji, więc po kliknięciu zostanie utworzona nowa pusta sesja zamiast czyszczenia całej sesji.</li>
<li><strong data="opt_absidx">Pokaż indeks bezwzględny w raporcie statystycznym</strong>. Pokaż indeks bezwzględny w sesji zamiast od 1 do liczby rozwiązań (np. 1/2/3 dla mo3) w statystykach rundy.</li>
<li><strong data="opt_rsfor1s">Pokaż statystykę po kliknięciu numeru rozwiązania</strong>. Po kliknięciu pierwszego wiersza listy czasów pokaż statystyki rundy dla pojedynczego rozwiązania.</li>
<li><strong data="opt_statal">Wskaźniki statystyczne</strong>. Wskaźniki statystyczne dla tabeli, pokazywane, jeżeli jest możliwość wyliczenia.</li>
<li><strong data="opt_delmul">Włącz usuwanie wielu wierszy</strong>. Pozwól na usunięcie wielu wyników. Dla uniknięcia przypadkowego usunięcia.</li>
<li><strong data="opt_disPrec">dokładność rozkładu czasowego</strong>. Przedział czasu dla narzędzia rozkładu czasu.</li>
<li><strong data="opt_solSpl">Pokaż stopniowo rozwiązanie</strong>. If selected, only the length of a solution from a solver is displayed, and you can view the solution one move by one move, otherwise, the whole solution is displayed.</li>
<li><strong data="opt_imgSize">Rozmiar grafiki algorytmu mieszającego</strong>. Ustaw rozmiar obrazu scramble'a.</li>
<li><strong data="opt_NTools">liczba narzędzi</strong>. csTimer jest w stanie pokazać jednocześnie maksymalnie 4 narzędzia.</li>
<li><strong data="opt_useKSC">użyj skrótu klawiszowego</strong>. Use keyboard shortcut to switch scramble type, generate next scramble, switch between sessions. Click csTimer's logo to show details.</li>
<li><strong data="opt_useGES">Użyj sterowania gestami</strong>. Use gestures (swiping in different directions) to switch OK/+2/DNF, add comments, generate next scramble, etc. Also available on non-touch screen devices when mouse timer is enabled. Click csTimer's logo to show details.</li>
<li><strong data="opt_vrcSpeed">Prędkość bazowa VRC (tps)</strong>. Base turn speed of the virtual Rubik's cube, the turn will be speed up if there are multiple moves to turn.</li>
<li><strong data="opt_vrcMP">wielofazowe</strong>. Automatyczny wielofazowy podział dla wirtualnej kostki Rubika i kostki bluetooth.</li>
<li><strong data="opt_giiMode">Tryb kostki bluetooth</strong>. Usage mode of smart cube: In normal mode, you need to manually scramble the cube until it is consistent with the scrambled state; in training mode, after pressing the space (or touching the screen on the touch screen), the virtual cube will directly change to the scrambled state. You need to solve virtual cube partially (depends on scramble, e.g. permutation of last layer is not checked in oll training) instead of physical cube; In continuous training mode, in addition to training mode, once the virtual cube is solved, you will directly enter the next solve without pressing space. You can also press ESC (on a touch screen, hold the screen for 2 seconds) to exit the solve.</li>
<li><strong data="opt_giiVRC">Pokaż wirtualną kostkę bluetooth</strong>. Pokaż wirtualną kostkę Rubika w głównym timerze podczas łączenia się z kostką bluetooth.</li>
<li><strong data="opt_giiSD">Oznacz jako pomieszany po bezruchu</strong>. Dla kostek bluetooth csTimer nie może wiedzieć, czy ruch jest w celu scrambingu czy rozwiązania.</li>
<li><strong data="opt_giiSK">Oznacz jako pomieszane po wciśnięciu spacji</strong>. Po naciśnięciu spacji kostka bluetooth jest pomieszana, obrót będzie traktowany jako rozpoczęcie liczenia czasu.</li>
<li><strong data="opt_giiSM">Oznacz jako pomieszane, po wykonaniu ruchu</strong>. Użyj określonych sekwencji ruchów na kostce bluetooth, aby powiadomić, że kostka jest pomieszana.</li>
<li><strong data="opt_giiBS">Sygnał dźwiękowy, kiedy pomieszano</strong>. Sygnał dźwiękowy, kiedy kostka jest ułożona.</li>
<li><strong data="opt_giiRST">Zresetuj kostkę bluetooth podczas podłączenia</strong>. Podczas łączenia się z kostką bluetooth csTimer wykryje, czy jest ułożona, jeśli nie, mogą pojawić się pewne problemy ze sprzętem lub kostka jest naprawdę nierozwiązana.</li>
<li><strong data="opt_giiAED">Automatyczne wykrywanie błędów sprzętowych</strong>. Niektóre układanki bluetooth mogą tracić połączenie, csTimer spróbuje wykryć taki przypadek.</li>
</ul>
<h2>Narzędzia</h2>
<ul>
<li><strong data="tool_scrgen">GeneratorScrambli</strong>. Możesz wygenerować maksymalnie 999 scrambli za pomocą jednego kliknięcia tym narzędziem.</li>
<li><strong data="tool_cfm">Potwierdź czas</strong>. Narzędzie do wyświetlania bieżących rozwiązań z komentarzem, scramblem, datą rozwiązania i rekonstrukcję, jeśli jest dostępna, pokazuje się także po kliknięciu czasu ułożenia.</li>
<li><strong data="tool_hugestats">Statystyki międzysesji</strong>. Możesz przejrzeć statystyki wielu sesji za pomocą tego narzędzia.</li>
<li><strong data="tool_stats">Statystyki</strong>. Tabela statystyczna podobna z tabelą w panelu listy czasów.</li>
<li><strong data="tool_distribution">Rozkład czasu</strong>. Rozkład czasu i analiza stabilności, &lt;X Y/Z oznacza, że całkowicie Y rozwiązuje mniej niż X sekund, i wszystkie ostatnie rozwiązania Z są mniejsze niż X sekund w sesji.</li>
<li><strong data="tool_trend">trend czasowy</strong>. Pokazuje krzywą trendu dla wszystkich rozwiązań w bieżącej sesji.</li>
<li><strong data="tool_dlystat">Daily Statistics</strong>. Policz liczbę ułożeń każdego dnia/tygodnia/miesiąca/roku.</li>
<li><strong data="tool_image">Narysuj algorytm mieszający</strong>. Wyświetl podgląd scrambla, aby zweryfikować poprawność mieszania, wszystkie układanki WCA są wspierane.</li>
<li><strong data="tool_roux1">Rozwiązujący &gt; Roux S1</strong>. Roux 1st step solver, which solves a 1x2x3 block.</li>
<li><strong data="tool_eoline">Rozwiązujący &gt; EOLine</strong>. EO line solver, which solves orientations of all 12 edges, and positions of DF and DB edges.</li>
<li><strong data="tool_cross">Rozwiązujący &gt; krzyżyk</strong>. Cross solver, which solve DF, DL, DR, DB edges.</li>
<li><strong data="tool_222face">Rozwiązujący &gt; 2x2x2 bok</strong>. 2x2x2 face solver, which solves a face of 2x2x2 cube.</li>
<li><strong data="tool_333cf">Rozwiązujący &gt; Cross + F2L</strong>. Cross and F2L solver, which solves Cross and 4 F2Ls with computer search, so the solution might be far from human solutions.</li>
<li><strong data="tool_333roux">Rozwiązujący &gt; Roux S1 + S2</strong>. Roux 1st and 2nd step solver, which firstly solves a 1x2x3 block on the left face and then expend another 1x2x3 block on the right face with R, M, r, U.</li>
<li><strong data="tool_333petrus">Rozwiązujący &gt; 2x2x2 + 2x2x3</strong>. Petrus 1st and 2nd step solver, which firstly solves an 2x2x2 block on the left and then expend it to a 2x2x3 on the left.</li>
<li><strong data="tool_333zz">Rozwiązujący &gt; EOLine + ZZF2L</strong>. Eoline and ZZF2L solver, which firstly solves the EOLine and then solve one of left 1x2x3 or right 1x2x3 and the solve the other 2x2x3.</li>
<li><strong data="tool_sq1cs">Rozwiązujący &gt; SQ1 S1 + S2</strong>. SQ1 1st and 2nd step solver, which firstly solves the shape of SQ1 and then split U pieces and D pieces.</li>
<li><strong data="tool_pyrv">Rozwiązujący &gt; Pyraminx V</strong>. Pyraminx V solver, which solves three corners and two edges to shape into a 'V' pattern for pyraminx.</li>
<li><strong data="tool_skbl1">Rozwiązujący &gt; Skewb Face</strong>. Skewb face solver, which solves a layer of skewb, more specifically, 1 center and 4 neighbor corners.</li>
<li><strong data="tool_giikerutil">Kostka Bluetooth</strong>. Pomocnicze narzędzie dla kostki Bluetooth, które może pokazywać aktualny stan urządzenia, poziom naładowania baterii, widok w czasie rzeczywistym itp.</li>
<li><strong data="tool_mtrnm">Metronom</strong>. Metronom, oprócz dzwaniania z określoną częstotliwością, wywołuje dźwięk w określonym czasie po rozpoczęciu rozwiązywania.</li>
<li><strong data="tool_syncseed">Pospolity Scramble</strong>. Używaj tych samych scrambli z przyjaciółmi, ustawiając ten sam seed.</li>
<li><strong data="tool_stackmatutil">stackmat</strong>. Narzędzie pomocnicze dla Stackmat, które jest w stanie wyświetlić stan, moc sygnału i poziom szumów.</li>
</ul>
<h2>Linki</h2>
<ul>
<li><a class="click" href="https://cubingchina.com/" title="">Cubing China</a></li>
<li><a class="click" href="/new/" title="">csTimer — wersja beta</a></li>
<li><a class="click" href="/src/" title="">csTimer — wersja beta z nieskompresowanymi plikami</a></li>
<li><a class="click" href="https://github.com/cs0x7f/cstimer" title="">csTimer — kod źródłowy</a></li>
<li><a class="click" href="/2019.12.24/" title="">csTimer version 2019.12.24</a></li>
<li><a class="click" href="/2018.11.05/" title="">csTimer version 2018.11.05</a></li>
<li><a class="click" href="/2015.12.12/" title="">csTimer version 2015.12.12</a></li>
<li><a class="click" href="/2012.03.15/" title="">csTimer version 2012.03.15</a></li>
<li><a class="click" href="/2012.02.29/" title="">csTimer version 2012.02.29</a></li>
</ul>
<h2>Schematy kolorów</h2>
<?php include('color.php') ?>
<div class="donate helptable" style="line-height:1.5em;">
<h2>Hardware compatible with csTimer</h2>
<p>In addition to timing by keyboard, csTimer also supports Bluetooth Smart Cubes and Smart Timers.</p>
<p>If you use a smart cube, csTimer will record the detailed solution of each of your solves and provide more statistics and practice functions (e.g. CFOP automatic segmentation, etc.)</p>
<ul>
<li><a class="click" href="https://www.amazon.com/dp/B0CGDHVJBL?tag=cstimer-20#" title="">Gan 12 ui FreePlay</a></li>
<li><a class="click" href="https://www.amazon.com/dp/B083TW9WFT?tag=cstimer-20#" title="">Gan Halo Bluetooth Timer</a></li>
</ul>
<h2>Recommended products</h2>
<p>Here are some professional cubes or hardwares.</p>
<ul>
<li><a class="click" href="https://www.amazon.com/dp/B0182KR2LO?tag=cstimer-20#" title="">G5 Stackmat</a></li>
<li><a class="click" href="https://www.amazon.com/dp/B086PNKX2P?tag=cstimer-20#" title="">Gan 356 M</a></li>
</ul>
<h2>Donate directly</h2>
<p>Dziękujemy za chęć wsparcia csTimer! Twoja darowizna zostanie wykorzystana do pokrycia kosztów rozwoju i utrzymania.</p>
<p>Jeśli chcesz zaoferować darowiznę za pośrednictwem PayPal, kliknij poniższy przycisk lub kliknij <a class="click" href="https://www.paypal.me/cs0x7f" title="">PayPal.me</a>.</p>
<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
<input type="hidden" name="cmd" value="_s-xclick">
<input type="hidden" name="hosted_button_id" value="NW25HME3QUEZY">
<input type="image" src="data:image/gif;base64,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" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
</form>
<p>Możesz również wesprzeć nas przez Alipay, zeskanować kod lub wpłacić darowiznę na konto: cs0x7f@gmail.com</p>
<p><img style="display:inline-block; width:10em; height:10em;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABsCAIAAAAABMCaAAABoklEQVR42u3aUY6DMAwFQO5/6e0JViq1XwjO5LOqIAxSHJ5z/RnlcSGACHEk4hUY/974i/9/83vlXl3PBREixPmIpYX25oNVrl95GV3PBREixLMQ05OuXD9RoG5fByJEiBCfnDREiBAhDkashAulTTJEiBAhbhJAJIKM41IciBAhLkOMNHQ2+P313T6IECEuQ9z60FBTcYjMDSJEiCMRKx//K4tMYvNcOkwAESLEoxBXNukTwW1XKAsRIsRzEZ9CqUAkClQpxYEIEeIYxApo1+b2qeK2xRcLRIgQH0dMLPaVSVeg080piBAhzkdMB59dQWn6BTxWnSFChLgtYrqAlCYdPmwVCWUhQoQ4HjFRZBIHCBIbeIgQIUJs/WhPLPDhxhlEiBDPQkyPdIFKo99OtiFChPhqxHRzZ+Xho3SwAhEixLMQ0wt/2wOEN+dtoSxEiBDHIO7QhFrZtLr94iFChAgx1AzqKmgrwwiIECFC7ERMh69dG2yIECFCXBFAVIpAegP/mhQHIkSIUcSVjar0hjkeJEOECHEkovFjIUUAEeKU8QE0apeVMce/LwAAAABJRU5ErkJggg=="></p>
<p>Dziękujemy za wsparcie!</p>
</div>
<div class="instruction">
<p><strong>In case of failure check that Bluetooth is enabled on your system!</strong></p>
<p>Browser you are using must support Web Bluetooth API. Consider using compatible browser, the best choice is:</p>
<ul>
<li>Chrome on macOS, Linux, Android or Windows</li>
<li>Bluefy on iOS</li>
</ul>
<p>Also you can check complete list of <a class="click" href="https://github.com/WebBluetoothCG/web-bluetooth/blob/main/implementation-status.md" title="">supported browsers</a>.</p>
<p>For some bluetooth cubes, we need you to provide the MAC address of your cube to decrypt the data. <strong>csTimer is able to automatically read MAC address of the cube if you properly setup your browser:</strong></p>
<ul>
<li>Chrome: enable chrome://flags/#enable-experimental-web-platform-features flag in browser settings.</li>
<li>Bluefy: turn on Enable BLE Advertisements option in browser settings.</li>
</ul>
<p>If you have difficulties with cube MAC address, you may read <a class="click" href="https://gist.github.com/afedotov/52057533a8b27a0277598160c384ae71" title="">GAN Smart Cubes MAC address FAQ</a>.</p>
</div>