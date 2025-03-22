<h1>csTimer Version <?php echo $version;?> - Professioneller Speedcubing/Training Timer</h1>
<?php include('lang.php') ?>
<h2>Einführung</h2>
<p>csTimer ist ein professionelles Timingprogramm für Rubik's cube Speedsolver, es enthält:</p>
<ul>
<li>Eine große Anzahl an scramble Algorithmen, einschließlich <strong>aller offizieller WCA Events</strong>, verschiedener Rätsel, <strong>Übungs Scrambles</strong> für spezielle Unterschritte (z.B. <strong>F2L, OLL, PLL, ZBLL</strong>, außerdem kann es Fälle filtern), usw</li>
<li>Viele Statistikfunktionen, es unterstützt <strong>Zeitschaltuhren</strong>; <strong>beliebig viele Sitzungen</strong>, Sitzungen teilen/zusammenfügen, usw.</li>
<li>Verschiedene Lösungen, wie <strong>Cross, Xcross, 2x2x2 face, Skewb Face, SQ1 shape</strong>, um diese Unterschritte zu erlernen oder zu trainieren.</li>
<li>Andere Hilfswerkzeuge wie Scramble-Bilder, 8-Sekunden Inspektions (Stimmen-) Alarm, Metronom-, Stapel-Scramble Generator, usw.</li>
<li>Backup-Funktion, um das Verlieren von Daten zu vermeiden, können sie Backups in ihren lokalen Dateien, auf den Servern von csTimer oder in den Google-Speichern speichern.</li>
</ul>
<p>csTimer unterstützt die meisten modernen Desktop-Browser, auf dem Handy und Tablet-PC. Sie können csTimer zu Ihrem Startbildschirm hinzufügen, wodurch es als normale App fungiert.</p>
<p>csTimer nutzt den Browser-Cache, der den Traffic nur dann verbraucht, wenn Sie ihn zum ersten Mal öffnen. Danach kann csTimer ohne Netzwerkverbindung funktionieren (außer Funktionen wie Sicherungen)</p>
<h3>Copyright</h3>
<p>csTimer ist eine Open-Source-Software, die dem GPLv3 folgt. Wenn du Vorschläge oder Kommentare zu csTimer hast, sende es bitte <a class="click" href="https://github.com/cs0x7f/cstimer/issues" title="">hier</a></p>
<p>Geschrieben von: <a href="mailto:cs0x7f@gmail.com"> Shuang Chen (cs0x7f@gmail.com) </a></p>
<p>UI erstellt von: <a href="mailto:liebe7@126.com">Yue Zhang (liebe7@126.com)</a></p>
<h2>Basicfunktionen</h2>
<ul>
<li><strong>Starten des Timers</strong> Halte die Leertaste (oder die linke und die rechte Strg-Taste oder den Bildschirm auf Mobilgeräten) gedrückt und warten Sie bis der Timer grün wird. Der Timer beginnt, sobald man die Tasten oder den Bildschirm loslässt. Zum Stoppen des Timers und Aufzeichnen der Zeit eine beliebige Taste drücken.</li>
<li><strong>UI-Beschreibung</strong> - Es gibt 6 Tasten in der Nähe des Logos von csTimer: Optionen, exportieren, Scramble, Zeitliste, Spenden, Werkzeuge. Klicken Sie auf <strong>Scramble</strong>, <strong>Zeitliste</strong> oder <strong>Werkzeuge</strong> um das entsprechende Funktionsfenster zu öffnen.</li>
<li><strong>Scramble Panel</strong> - Im Scramble Panel kannst du den Scramble-Typ wählen, setze Länge und Case Filter fest (falls verfügbar), zeige den vorherigen Scramble oder generiere den nächsten Scramble.</li>
<li><strong>Zeitliste</strong> - Im Zeitlistenfenster können Sie den Sitzungsmanager öffnen, indem sie auf "Sitzungen" klicken. Hier können Sie durch die drei Punkte Rechts Sitzungen wählen, hinzufügen oder löschen. Hier können sie auch die aktuellen single/averages, die besten single/averages und die volle Zeitliste einsehen.</li>
<li><strong>Werkzeuge-Panel</strong> - Im Werkzeugfenster können sie spezielle Hilfsfunktionen wie Scramble-Bilder, Scramble Generatoren, Solver und viele andere Arten von Statistiken auswählen.</li>
</ul>
<h2>Tastenkombinationen</h2>
<table class="table" style="display: inline-block;">
<tr><th>Taste(n)</th><td>Funktion</td></tr>
<tr><th>Alt + 1</th><td>Scramble-Art zu Square-1</td></tr>
<tr><th>Alt + 2 ~ 7</th><td>Scramble-Art zu 2x2x2~7x7x7</td></tr>
<tr><th>Alt + p/m/c/s</th><td>Scramble-Art zu Pyraminx/Megaminx/Clock/Skweb</td></tr>
<tr><th>Alt + i</th><td>Scramble-Art zu Eingabe</td></tr>
<tr><th>Alt + d</th><td>Entfernt alle Solves aus der aktuellen Sitzung</td></tr>
<tr><th>Ctrl/Alt + z</th><td>Entfernt den letzten Solve</td></tr>
<tr><th>Alt + nach oben/unten</th><td>Zur nächsten/vorherigen Sitzung</td></tr>
<tr><th>Alt + links/rechts</th><td>Vorheriges/Nächstes Scramble anzeigen</td></tr>
<tr><th>Ctrl + 1/2/3</th><td>Der letzte Solve ist OK/+2/DNF</td></tr>
<tr><th>Ctrl + Alt + t/i/s/v/g/q/b/l</th><td>Zeiten mit Timer/Tastatur/Stackmat/virtuellem Cube/Bluetooth Cube/qcube/Bluetooth Timer/last layer eingeben</td></tr>
</table>

<table class="table" style="display: inline-block;">
<tr><th>Geste</th><td>Funktion</td></tr>
<tr><th>Nach oben links</th><td>Der letzte Solve ist ein DNF</td></tr>
<tr><th>Nach oben</th><td>Der letzte Solve ist +2</td></tr>
<tr><th>Nach oben rechts</th><td>Der letzte Solve ist OK</td></tr>
<tr><th>Nach links</th><td>Letztes Scramble</td></tr>
<tr><th>Nach rechts</th><td>Nächstes Scramble</td></tr>
<tr><th>Nach unten links</th><td>Kommentar zum letzten Solve hinzufügen</td></tr>
<tr><th>Nach unten</th><td>Entferne den letzten Solve</td></tr>
<tr><th>Nach unten rechts</th><td>Überprüfe den letzten Solve</td></tr>
</table>

<table class="table" id="vrckey" style="display: inline-block;">
<tr><th colspan=10>Virtuelle Cube Key Map</th></tr>
</table>

<h2>Optionsdetails</h2>
<ul>
<li><strong data="opt_ahide">Alle Elemente während des Timens verstecken</strong>. Logo und alle Panele beim Timing ausblenden.</li>
<li><strong data="opt_useMilli">Millisekunden benutzen</strong>. Zeigt die Millisekunden, unabhängig davon ob sie aktiviert ist, an. Die Timinggenauigkeit von csTimer beträgt 1 Millisekunde.</li>
<li><strong data="opt_timeFormat">Zeitformat</strong>. Zeitformat zum Anzeigen.</li>
<li><strong data="opt_atexpa">Autoexport (alle 100 solves)</strong>. Falls angekreuzt wird der csTimer automatisch nach 100 Solves die Solves zum eigens ausgewählten Ort (Lokale Datei, csTimer Server, Google Speicher) exportieren.</li>
<li><strong data="opt_expp">Veraltete Daten importieren?</strong>. Sollten Sie mehrere Sicherungen hochgeladen haben, können Sie eines der 10 neuesten Sicherungen importieren. Sollten Sie aus Versehen eine leere Sicherung hochgeladen haben, hilft Ihnen diese Option beim Abrufen der Lösungen.</li>
<li><strong data="opt_useLogo">Hinweis-Meldungen im Logo</strong>. csTimers Logo wird Ihnen als eine Informationsanzeige dienen, welche Ihnen eine Vielzahl von Informationen ausgibt, die Sie interessieren, zB. wie bricht man seinen persönlichen Rekord.</li>
<li><strong data="opt_showAvg">Durchnitts-Label anzeigen</strong>. Es werden Ihnen zwei Informationen unter dem Haupt-Timer ausgegeben, die aktuellen Durchschnittswerte, ao5 und ao12 im Normalfall.</li>
<li><strong data="opt_zoom">Vergrößerung</strong>. Sie können mit dieser Option die Größen aller Elemente anpassen.</li>
<li><strong data="opt_font">Timer-Schriftart wählen</strong>. Schriftart des Haupt-Timers.</li>
<li><strong data="opt_uidesign">Design der Benutzeroberfläch</strong>. Sie können das UI-Design auf material-ähnlich wechseln, oder die Schatten verstecken.</li>
<li><strong data="opt_view">Stil der Benutzeroberfläche</strong>. Wechseln Sie zwischen der Desktop- und der mobilen Ansicht.</li>
<li><strong data="opt_wndScr">Scramble-Panel Anzeige-Stil</strong>. Scramble-Panel in den Hintergrund einbetten.</li>
<li><strong data="opt_wndStat">Statistik-Panel Anzeige-Stil</strong>. Betten sie die Listenzeiten in den Hintergrund ein.</li>
<li><strong data="opt_wndTool">Werkzeug-Panel Anzeige-Stil</strong>. Werkzeug-Panel in den Hintergrund einbetten.</li>
<li><strong data="opt_bgImgO">Deckkraft des Hintergrundbilds</strong>. Deckkraft des Hintergrundbilds.</li>
<li><strong data="opt_bgImgS">Hintergrundbild</strong>. Sie können Ihr eigenes Bild als Hintergrundbild auswählen. Aufgrund der Sicherheitsbeschränkung des Browsers sind jedoch nur http-Urls verfügbar.</li>
<li><strong data="opt_timerSize">Timer-Größe</strong>. Legen Sie die Größe des Haupt-Timers fest.</li>
<li><strong data="opt_smallADP">kleine Schrift nach dem Komma benutzen</strong>. Verwenden sie eine kleinere Schriftgröße nach dem Dezimalpunkt im Haupt-Timer.</li>
<li><strong data="opt_color">Farbschema wählen</strong>. Farbschema für csTimer auswählen Auf das csTimer-Logo klicken, um weitere Farbschemata anzuzeigen.</li>
<li><strong data="opt_useMouse">Maus-Timer verwenden</strong>. Starten Sie den Timer mit der Maus oder der Tastatur.</li>
<li><strong data="opt_useIns">WCA-Inspektion benutzen</strong>. Aktiviere einen WCA Inspektor, welcher ein 15 sec Countdown ist. Es werden automatisch +2 sec/DNF-Strafen aktiviert, wenn sie mehr als 15 sekunden Inspizieren.</li>
<li><strong data="opt_voiceIns">Sprachansage für WCA-Inspektion</strong>. Hinweis nach 8s/12s Inspektionszeit, ähnlich wie bei einem WCA-Wettbewerb</li>
<li><strong data="opt_voiceVol">Sprachlautstärke</strong>. Lautstärke des obigen Hinweises</li>
<li><strong data="opt_input">Zeiten eintragen mit</strong>. csTimer unterstützt verschiedene Wege, Solves hinzuzfügen, darunter, neben Tastaturgesteuerter Messung: manuelles Eintragen, automatische Messung mit stackmat-Timer, Bluetooth-Smart-Cubes oder virtueller Würfel</li>
<li><strong data="opt_intUN">Einheit bei der Eingabe einer Zahl</strong>. Eingabe einer Dreistelligen Zahl in Sekunden, Centisekunden oder Millisekunden?</li>
<li><strong data="opt_timeU">Timer-Update ist</strong>. Wie der Timer beim Stoppen aktualisiert wird.</li>
<li><strong data="opt_preTime">wie lange die Leertaste drücken (Sekunde(n))</strong>. Wie lange die Leertaste gedückt werden muss bevor der Timer grün wird.</li>
<li><strong data="opt_phases">Multi-Phase</strong>. Anzahl der Phasen, die beim Stoppen durch einen Tastendruck getrennt werden können.</li>
<li><strong data="opt_stkHead">Benutze die Stackmat Statusinformationen</strong>. Stackmat meldet seinen Status, z.B. ob der Bereich links oder rechts berührt wird, sodass diese Informationen verwendet werden können. Es können jedoch Datenfehler auftreten und unerwartetes Verhalten verursachen.</li>
<li><strong data="opt_scrSize">Scramble-Größe</strong>. Größe des Scramble-Textes</li>
<li><strong data="opt_scrASize">Automatische Scramble Größe</strong>. Die Größe des Scramble-Textes wird automatisch an die Länge angepasst, was mit der vorigen Option kompatibel ist.</li>
<li><strong data="opt_scrMono">Monospace-Scramble</strong>. Monospace-Schrift für den Scramble-Text verwenden</li>
<li><strong data="opt_scrLim">Die Höhe des Scramble-Bereichs begrenzen</strong>. Wenn der Scramble-Bereich zu groß wird, erscheint eine Scrollbar um eine weitere Vergrößerung zu vermeiden.</li>
<li><strong data="opt_scrAlign">Aurichtung des Scramble-Bereichs</strong>. Ausrichtung des gesamten Scramble-Bereiches, inklusive Scamble-Typ-Auswahl</li>
<li><strong data="opt_preScr">pre-scramble</strong>. Moves vor dem eigentlichen Scramble, welche für den virtuellen Cube und Scramble-Bilder verwendet werden</li>
<li><strong data="opt_scrNeut">Farbneutral</strong>. Wenn aktiviert, wird die Positions-/first-layer-Farbe einiger Trainings-Scrambls zufällig sein.</li>
<li><strong data="opt_scrEqPr">Wahrscheinlichkeiten für Training-Scrambles</strong>. For training scrambles, the probability of each case can be set to: follow the probability of the actual solving process; or let all cases appear with equal probability; or let all cases appear randomly in sequence (that is, to ensure that all N cases appear at least once in the next 2 N scrambles).</li>
<li><strong data="opt_scrFast">schnellen Scramble für 4x4x4 verwenden (inoffiziell)</strong>. Offizielle WCA 4x4x4-Scrambles benötigen große Mengen an Rechenleistung, wählen Sie diese Option um stattdessen zufällig generierte Scrambles zu verwenden</li>
<li><strong data="opt_scrKeyM">Schlüssel-Züge im Scramble hervorheben</strong>. Markiere einen entscheidenden Move in dem Scramble, z. B. den Schritt, der die quadratische Form in SQ1-Scrambles zerstört</li>
<li><strong data="opt_scrClk">Aktion beim klicken des scrambles</strong>. Verhalten beim anklicken des Scrambles, kopieren oder neu generieren</li>
<li><strong data="opt_trim">Anzahl der Versuche, die auf beiden Seiten getrimmt wurden</strong>. Anzahl der besten und schlechtesten Zeiten die bei Durchschnitten ignoriert werden</li>
<li><strong data="opt_statsum">Zusammenfassung vor der Zeiten-Liste anzeigen</strong>. Statistiken vor Zeiten anzeigen</li>
<li><strong data="opt_statthres">Zielzeit für das beste Ergebnis einer Session anzeigen</strong>. In der Statistik-Tabelle wird die Zeit angezeigt, die benötigt wird, um im nächsten Solve eine neue persönliche Bestzeit zu erreichen. "N/A" bedeutet, das im nächsten Solve keine neue PB erreicht werden kann, "&#8734;" bedeutet, dass jede Zeit außer einem DNF zu einer neuen PB führt.</li>
<li><strong data="opt_printScr">Scramble(s) in den Statistiken anzeigen</strong>. Scramble im runden Statistikdialog anzeigen.</li>
<li><strong data="opt_printDate">Datum des Solves in den Statistiken anzeigen</strong>. Datum im runden Statistikdialog anzeigen.</li>
<li><strong data="opt_imrename">Sitzung direkt nach der Erstellung umbenennen</strong>. Sitzung nach dem Erstellen sofort umbenennen.</li>
<li><strong data="opt_scr2ss">neue Sitzung erstellen, wenn Scramble-Typ gewechselt wird</strong>. Beim wechseln des Scramble-Typs eine neue Sitzung erstellen.</li>
<li><strong data="opt_statinv">umgekehrte Zeitliste</strong>. Zeitenliste umkehren, sodass die neusten Zeiten am Ende der Liste stehen</li>
<li><strong data="opt_statclr">Leeren von Sitzungen zulassen</strong>. Wenn deaktiviert, wird ein "+"-Buttons (zum Erstellen einer Sitzung) anstelle des "X"-Buttons neben der Sitzungsauswahl angezeigt. So wird bei einem Klick eine neue Sitzung erstellt, anstatt die gesamte Sitzung zurückzusetzen.</li>
<li><strong data="opt_absidx">Absoluten Index im Statistik-Report anzeigen</strong>. Zeige den absoluten Index in einer Session anstelle der Zahl von 1 bis zur gesamten Anzahl an Solves (z. B. 1/2/3 for mo3) in runden Statistiken.</li>
<li><strong data="opt_rsfor1s">Zeige Statistik, when die Zeitnummer angeklickt wird</strong>. Bei Klick auf die erste Zeile in der Zeitenliste, wird eine runde Statistik für einen einzlenen Solve angezeigt.</li>
<li><strong data="opt_statal">Statistische Indikatoren</strong>. statistische Anzeige für die Statistik-Tabelle, wenn Anpassungen für aoX und moX zur Verfügung stehen</li>
<li><strong data="opt_delmul">Mehrfach-Löschung aktivieren</strong>. Möglichkeit zum Löschen mehrerer Solves beginnend von einem ausgewählten Solve (der ausgewählte Solve ist der älteste zu löschende Solve)</li>
<li><strong data="opt_disPrec">Genauigkeit des Histograms</strong>. Zeitintervall für das Zeitverteilungswerkzeug.</li>
<li><strong data="opt_solSpl">Zeige die Lösungen schrittweise an</strong>. Wenn ausgewählt, wird nur die Länge der Lösung eines Solvers angezeigt und die Lösung kann Zug für Zug angezeigt werden. Ansonsten wird die gesamte Lösung angezeigt.</li>
<li><strong data="opt_imgSize">Scramble-Bild Größe</strong>. Setzt die Größe der Scramble-Abbildung.</li>
<li><strong data="opt_NTools">Anzahl der Werkzeuge</strong>. csTimer ist in der Lage, bis zu 4 Werkzeuge gleichzeitig zu zeigen.</li>
<li><strong data="opt_useKSC">Tastenkombinationen benutzen</strong>. Tastenkombinationen verwenden, um den Scramble-Typ zu wechseln, das nächste Sramble zu generieren und zwischen verschiedenen Sessions zu wechseln. Für weitere Details auf das csTimer-Logo klicken.</li>
<li><strong data="opt_useGES">Gestensteuerug benutzen</strong>. Gesten (Wischen in verschiedene Richtungen) zum Auswählen von OK/+2/DNF, dem Hinzufügen von Kommentaren, dem Generieren des nächsten Scrambles und weiterem verwenden. Auch auf Geräten ohne Touchscreen, wenn der Maus-Timer aktiviert ist. Für weitere Details auf das csTimer-Logo klicken.</li>
<li><strong data="opt_vrcSpeed">VRC Grundgeschwindigkeit (TPS)</strong>. Basisgeschwindigkeit des virtuellen Cubes; die Geschwindigkeit wird bei mehreren nachzuholenden Zügen erhöht</li>
<li><strong data="opt_vrcMP">Multi-Phase</strong>. Automatische Mehrphasen-Aufteilung für virtuelle und Bluetooth-Cubes.</li>
<li><strong data="opt_giiMode">Bluetooth Würfel-Modus</strong>. Verwendung eines Smart Cubes: Im normalen Modus muss der Cube manuell nach dem vorgegebenen Scramble gescrambelt werden; im Trainingsmodus wird der Cube nach Drücken der Leertaste (oder dem Berühren des Bildschirms bei Touchscreens) direkt in den gescrambelten Zustand versetzt. Der virtuelle Cube muss im Gegensatz zu physischen Cubes teilweise gelöst sein (abhängig vom Scramble, z. B. wird PLL während OLL-Trainings nicht überprüft). Im fortlaufenden Trainingsmodus, als Erweiterung des normalen Trainingsmodus, wird nach dem Lösen des virtuellen Cubes direkt der nächste Solve begonnen. Sie können auch ESC drücken (oder auf einem Touchscreen den Bildschirm für zwei Sekunden berühren), um den Solve zu beenden.</li>
<li><strong data="opt_giiVRC">Virtuellen Giiker Cube zeigen</strong>. Zeigt einen virtuellen Cube im Haupt-Timer während der Verbindung zu einem Bluetooth-Cube an.</li>
<li><strong data="opt_giiSD">Ende des Scrambles durch Warten anzeigen</strong>. Bei Bluetooth-Cubes kann csTimer nicht wissen, ob ein Move zum Schrambling oder zum Lösen gehört</li>
<li><strong data="opt_giiSK">Ende des Scrambles mit Leertaste anzeigen</strong>. Beim Drücken der Leertaste wird der Bluetooth-Cube als gescrambelt markiert, alle folgenden Züge starten den Timer.</li>
<li><strong data="opt_giiSM">Ende des Scrambles anzeigen mit</strong>. Verwende bestimmte Zug-Sequenzen, um den Bluetooth-cube als gescrambelt zu markieren.</li>
<li><strong data="opt_giiBS">Beep am Ende des Scrambles</strong>. Nach Abschluss des Scramblens piepen</li>
<li><strong data="opt_giiRST">Giiker Cube bei Verbindung zurück setzen</strong>. Beim Verbinden eines Bluetooth-Cubes wird csTimer erkennen, ob dieser gelöst ist. Wenn nicht, gibt es entweder Hardware-Probleme oder der Würfel ist wirklich ungelöst.</li>
<li><strong data="opt_giiAED">Automatische Hardware-Fehler-Erkennung</strong>. Einige Bluetooth-Würfel verlieren einige Schritte aufgrund von Hardware-Fehlern, csTimer wird versuchen, solche Fälle zu erkennen.</li>
</ul>
<h2>Werkzeug-Details</h2>
<ul>
<li><strong data="tool_scrgen">Scramble-Generator</strong>. Mit diesem Werkzeug können bis zu 999 Scrambles mit einem Klick generiert werden.</li>
<li><strong data="tool_cfm">Zeit bestätigen</strong>. Werkzeug, um den aktuellen Solve mit zugehörigem Kommentar, Scramble, Datum und, falls verfügbar, Rekonstruktionsmöglichkeit anzuzeigen (gleicher Dialog wie beim Anklicken eines Solves).</li>
<li><strong data="tool_hugestats">sitzungsübergreifende Statistiken</strong>. Mit diesem Werkzeug können sitzungsübergreifende Statistiken erstellt werden.</li>
<li><strong data="tool_stats">Statistiken</strong>. Statistik-Tabelle, ähnlich zu der Tabelle in der Zeitenliste.</li>
<li><strong data="tool_distribution">Zeitverteilung</strong>. Zeitverteilungs- und Kontinuitätsanalyse, &lt;X Y/Z bedeutet, dass es insgesamt Z Solves unter X Sekunden gibt, und alle der letzten Y Solves in der Session unter X Sekunden sind.</li>
<li><strong data="tool_trend">Zeit-Trend</strong>. Zeigt eine Trendkurve aller Solves in der aktuellen Sitzung an.</li>
<li><strong data="tool_dlystat">Daily Statistics</strong>. Zählt die Anzahl der Solves pro Tag/Woche/Monat/Jahr.</li>
<li><strong data="tool_image">Scramble zeichnen</strong>. Scramble-Abbildung zur Überprüfung des korrekten Scrambles, alle WCA-Puzzles werden unterstützt</li>
<li><strong data="tool_roux1">Löser &gt; Roux ersten Block lösen</strong>. Roux-1. Schritt-Löser, der einen 1x2x3 Block löst.</li>
<li><strong data="tool_eoline">Löser &gt; EOLine Lösen</strong>. EO-Line-Löser, der die Ausrichtung aller 12 Kanten und die Positionen der DF- und DB-Kanten löst.</li>
<li><strong data="tool_cross">Löser &gt; Kreuz lösen</strong>. Kreuz-Löser, der die DF-, DL-,DR und DB-Kante löst.</li>
<li><strong data="tool_222face">Löser &gt; 2x2x2 Würfel</strong>. 2x2x2-Seiten-Löser, der eine Seite von einem 2x2x2-Würfel löst.</li>
<li><strong data="tool_333cf">Löser &gt; Cross + F2L</strong>. Cross- und F2L-Solver, der Cross und 4 F2Ls mit Computersuche löst, so dass die Lösung weit von menschlichen Lösungen entfernt sein kann.</li>
<li><strong data="tool_333roux">Löser &gt; Roux S1 + S2</strong>. Roux-1. und 2. Schritt-Löser, der zuerst einen 1x2x3-Block auf der linken Seite und dann einen weiteren 1x2x3-Block auf der rechten Seite mit R-, M, r- und U-Zügen löst.</li>
<li><strong data="tool_333petrus">Löser &gt; 2x2x2 + 2x2x3</strong>. Petrus-1. und 2. Schritt-Löser, der zuerst einen 2x2x2-Block auf der linken Seiten löst und diesen dann zu einem 2x2x3-Block auf der linken Seite erweitert.</li>
<li><strong data="tool_333zz">Löser &gt; EOLine + ZZF2L</strong>. EO-Line und ZZ-F2L-Löser, der zuerst die EO-Line, dann den linken 1x2x3-Block oder den rechten 1x2x3-Block löst und anschließend den anderen 1x2x3-Block löst.</li>
<li><strong data="tool_sq1cs">Löser &gt; SQ1 S1 + S2</strong>. SQ1-1. und 2. Schritt-Löser, der zuerst die Form des SQ1 löst und dann die U- und D-Teile trennt.</li>
<li><strong data="tool_pyrv">Löser &gt; Pyraminx V</strong>. Pyraminx-V-Löser, der drei Ecken und zwei Kanten löst, um V-Muster zu erzeugen.</li>
<li><strong data="tool_skbl1">Löser &gt; Skewb Face</strong>. Skewb-1-Seite-Löser, der eine Ebene des Skewb's, also 1 Mitte und 4 benachbarte Ecken löst.</li>
<li><strong data="tool_giikerutil">Giiker Cube</strong>. Zusatzwerkzeug für Bluetooth-Würfel, das den aktuellen Zustand, die Akkuladung, die Echtzeit-Rekonstruktion usw. anzeigen kann.</li>
<li><strong data="tool_mtrnm">Metronom</strong>. Metronom: Piept in einem bestimmten Takt und/oder zu einer bestimmten Zeit nach dem Starten des Solves.</li>
<li><strong data="tool_syncseed">Gemeinsamen Scramble</strong>. Benutze die gleichen Scrambles mit Freunden, indem gemeinsame "Seeds" verwendet werden.</li>
<li><strong data="tool_stackmatutil">stackmat</strong>. Zusatzwerkzeug für Stackmat, das den Status, den Akkustand, den Geräuschpegel des Signals usw. anzeigen kann.</li>
</ul>
<h2>Links</h2>
<ul>
<li><a class="click" href="https://cubingchina.com/" title="">Cubing China</a></li>
<li><a class="click" href="/new/" title="">csTimer Beta Version</a></li>
<li><a class="click" href="/src/" title="">csTimer Beta Version mit unkomprimierten Dateien</a></li>
<li><a class="click" href="https://github.com/cs0x7f/cstimer" title="">csTimer-Quellcode</a></li>
<li><a class="click" href="/2019.12.24/" title="">csTimer version 2019.12.24</a></li>
<li><a class="click" href="/2018.11.05/" title="">csTimer version 2018.11.05</a></li>
<li><a class="click" href="/2015.12.12/" title="">csTimer version 2015.12.12</a></li>
<li><a class="click" href="/2012.03.15/" title="">csTimer version 2012.03.15</a></li>
<li><a class="click" href="/2012.02.29/" title="">csTimer version 2012.02.29</a></li>
</ul>
<h2>Farbschemen</h2>
<?php include('color.php') ?>
<div class="donate helptable" style="line-height:1.5em;">
<h2>mit csTimer kompatible Hardware</h2>
<p>Neben der Tastatur unterstützt csTimer auch Bluetooth Smart-Cubes und Smart-Timers zum Stoppen von Zeiten.</p>
<p>Bei der Nutzung eines Smart-Cubes zeichnet csTimer die detaillierte Lösung jedes Solves auf und stellt erweiterte Statistiken und praktische Funktionen wie beispielsweise automatische CFOP-Einteilung bereit</p>
<ul>
<li><a class="click" href="https://www.amazon.com/dp/B0CGDHVJBL?tag=cstimer-20#" title="">Gan 12 ui FreePlay</a></li>
<li><a class="click" href="https://www.amazon.com/dp/B083TW9WFT?tag=cstimer-20#" title="">Gan Halo Bluetooth Timer</a></li>
</ul>
<h2>Empfohlene Produkte</h2>
<p>Hier sind einige professionelle Würfel und Zubehör</p>
<ul>
<li><a class="click" href="https://www.amazon.com/dp/B0182KR2LO?tag=cstimer-20#" title="">G5 Stackmat</a></li>
<li><a class="click" href="https://www.amazon.com/dp/B086PNKX2P?tag=cstimer-20#" title="">Gan 356 M</a></li>
</ul>
<h2>Direkt spenden</h2>
<p>Danke für deinen Wunsch, csTimer zu unterstützen! Deine Spende wird verwendet werden, um Entwicklungs- und Instandhaltungskosten zu decken.</p>
<p>Wenn du uns über PayPal unterstützen willst, klicke den folgenden Knopf oder gehe auf <a class="click" href="https://www.paypal.me/cs0x7f" title="">PayPal.me</a>.</p>
<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
<input type="hidden" name="cmd" value="_s-xclick">
<input type="hidden" name="hosted_button_id" value="NW25HME3QUEZY">
<input type="image" src="data:image/gif;base64,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" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
</form>
<p>Du kannst uns auch auf Alipay unterstützen, scanne dazu den Code ein oder sende deine Spende an cs0x7f@gmail.com</p>
<p><img style="display:inline-block; width:10em; height:10em;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABsCAIAAAAABMCaAAABoklEQVR42u3aUY6DMAwFQO5/6e0JViq1XwjO5LOqIAxSHJ5z/RnlcSGACHEk4hUY/974i/9/83vlXl3PBREixPmIpYX25oNVrl95GV3PBREixLMQ05OuXD9RoG5fByJEiBCfnDREiBAhDkashAulTTJEiBAhbhJAJIKM41IciBAhLkOMNHQ2+P313T6IECEuQ9z60FBTcYjMDSJEiCMRKx//K4tMYvNcOkwAESLEoxBXNukTwW1XKAsRIsRzEZ9CqUAkClQpxYEIEeIYxApo1+b2qeK2xRcLRIgQH0dMLPaVSVeg080piBAhzkdMB59dQWn6BTxWnSFChLgtYrqAlCYdPmwVCWUhQoQ4HjFRZBIHCBIbeIgQIUJs/WhPLPDhxhlEiBDPQkyPdIFKo99OtiFChPhqxHRzZ+Xho3SwAhEixLMQ0wt/2wOEN+dtoSxEiBDHIO7QhFrZtLr94iFChAgx1AzqKmgrwwiIECFC7ERMh69dG2yIECFCXBFAVIpAegP/mhQHIkSIUcSVjar0hjkeJEOECHEkovFjIUUAEeKU8QE0apeVMce/LwAAAABJRU5ErkJggg=="></p>
<p>Danke nochmals für deine Spende!</p>
</div>
<div class="instruction">
<p><strong>Überprüfe im Fehlerfall, ob Bluetooth auf dem System aktiviert ist!</strong></p>
<p>Der verwendete Browser muss die Web-Bluetooth-API unterstützen. Verwende bitte einen kompatiblen Browser, die beste Wahl ist:</p>
<ul>
<li>Chrome in macOS, Linux, Android oder Windows</li>
<li>Bluefy in iOS</li>
</ul>
<p><a class="click" href="https://github.com/WebBluetoothCG/web-bluetooth/blob/main/implementation-status.md" title="">Hier können sie eine vollständige Liste aller unterstützter Browser abrufen.</a></p>
<p>Für einige Bluetooth-Cubes muss zudem die MAC-Adresse angegeben werden, um die Daten zu entschlüsseln. <strong>csTimer kann diese bei richtigen Browser-Einstellungen automatisch auslesen.</strong></p>
<ul>
<li>Chrome: aktiviere chrome://flags/#enable-experimental-web-platform-features in den Browsereinstellungen</li>
<li>Bluefy: aktiviere die "Enable BLE Advertisements"-Option in den Browsereinstellungen</li>
</ul>
<p>Lesen Sie bei Schwierigkeiten mit der MAC-Adresse des Cubes bitte die <a class="click" href="https://gist.github.com/afedotov/52057533a8b27a0277598160c384ae71" title="">GAN Smart-Cubes MAC-Adresse FAQ</a></p>
</div>