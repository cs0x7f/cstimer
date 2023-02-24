<h1>csTimer גרסה <?php echo $version;?> - טיימר קיובינג רשמי</h1>
<?php include('lang.php') ?>
<h2>הקדמה</h2>
<p>csTimer הוא טיימר מקצועי שעוצב במיוחד לפותרי קוביה הונגרית, הוא מספק:</p>
<ul>
<li>כמות גדולה מאוד של עירבובים כולל העירבובים של כל התחרויות של הWCA, פאזלים אחרים, עירבובי תרגול לשלבים ספציפיים(F2L, OLL, PLL, ZBLL) וכו'</li>
<li>הרבה אופציות לסטטיסטיקות, זה מזהה <strong>ספליטס</strong>;<strong>כל מספר סשנים</strong>, לפרק סשן/לשלב סשנים, וכו'.</li>
<li>הרבה פותרים כמו <strong>Cross, Xcross, 2x2x2 face, Skewb Face, SQ1 shape</strong>, ללימוד או אימון לחלקים של הפתירה</li>
<li>כלים אחרים, כמו תמונת ערבוב, קול ב8 שניות אינספקשן, מטרונום, מייצר ערבובים, וכו'.</li>
<li>פונקציית גיבוי, בשביל להתחמק מאיבוד מידע, אתה יכול לגבות את הפתירות שלך לקבצים מקומיים, לשרתים של csTimer, או לאחסון גוגל.</li>
</ul>
<p>csTimer תומך ברוב הדפדפנים המודרניים, בטלפון ובטאבלט, אתה יכול להוסיף את csTimer למסך הבית שלך, והוא יעבוד כאפליקציה.</p>
<p>csTimer משתמש בהיסטוריית דפדפנים, שמשתמשת במשאבים רק כשאתה פותח אותה בפעם הראשונה, אחרי זה, csTimer יכול לעבוד בלי חיבור אינטרנט (חוץ מפונקציות כמו גיבוי).</p>
<h3>זכויות יוצרים</h3>
<p>csTimer הוא תוכנת open source העוקבת אחרי הGPLv3. אם יש לך רעיון או תגובות על csTimer, בבקשה הגש אותם <a class="click" href="https://github.com/cs0x7f/cstimer/issues" title="">פה</a></p>
<p>נכתב על ידי: <a href="mailto:cs0x7f@gmail.com">Shuang Chen (cs0x7f@gmail.com)</a></p>
<p>ממשק עוצב על ידי <a href="mailto:liebe7@126.com">Yue Zhang (liebe7@126.com)</a></p>
<h2>פונקציות בסיסיות</h2>
<ul>
<li></strong>איך להתחיל למדוד זמן** - לחץ על מקש הרווח (או על שני מקשי הCtrl, הימני והשמאלי, או לחץ על המסך במכשירי מובייל) וחכה שהטיימר יהפוך לירוק, הטיימר יתחיל למדוד זמן ברגע שמקש הרווח ישוחרר. לחץ על כל מקש כדי להפסיק את הטיימר וזמן הפתירה ישמר.</li></li>
<li><strong>תיאור ממשק</strong> - ישנם 6 כפתורים ליד הלוגו של csTimer: הגדרות, יצוא, ערבוב, רשימת זמנים, תרומות, כלים, תלחץ על ה<strong>ערבוב</strong>, <strong>רשימת זמנים</strong>, <strong>כלים</strong> כדי לפתוח את הפאנל המתאים.</li>
<li><strong>פאנל ערבובים</strong> - בפאנל הערבובים, אתה יכול לבחור סוג ערבוב, לשנות את אורך הערבוב ולבחור מקרים ספציפיים (אם זמין), לראות ערבובים קודמים, וליצור את הערבוב הבא.</li>
<li><strong>פאנל רשימת זמנים</strong> - בפאנל רשימת הזמנים, אתה יכול לפתוח את מנהל הסשנים עם לחיצה על "סשן", בחר\הוסף\מחק סשנים, רוקן סשן עם הבוחר והכפתור ליד, ואז אתה יכול לראות את הסינגל\ממוצע הנוכחי, הסינגל\ממוצע הכי טובים, ואת רשימת הזמנים המלאה.</li>
<li><strong>פאנל כלים</strong> - בפאנל הכלים, אתה יכול לבחור פונקציות ספציפיות, הכוללות תמונת ערבוב, מייצר ערבובים, פותרים, סוגי סטטיסטיקות שונים, וכו'.</ul></li>
</ul>
<h2>קיצורי מקלדת</h2>
<table class="table" style="display: inline-block;">
<tr><th>מקש</th><td>פונקציה</td></tr>
<tr><th>Alt + 1</th><td>שינוי עירבוב לSquare-1.</td></tr>
<tr><th>Alt + 2 ~ 7</th><td>שינוי עירבוב ל2x2x2~7x7x7.</td></tr>
<tr><th>Alt + p/m/c/s</th><td>שינוי עירבוב לפיראמינקס/מגהמינקס/שעון/סקיוב.</td></tr>
<tr><th>Alt + i</th><td>שינוי עירבוב להכנסה ידנית.</td></tr>
<tr><th>Alt + d</th><td>מחק את כל הזמנים בסשן הנוכחי.</td></tr>
<tr><th>Alt + z</th><td>מחק את הזמן האחרון.</td></tr>
<tr><th>למעלה/למטה + Alt</th><td>לסשן הבא/הקודם.</td></tr>
<tr><th>שמאל/ימין + Alt</th><td>הצג בלגון אחרון/הבא.</td></tr>
<tr><th>Ctrl + 1/2/3</th><td>הזמן האחרון הוא OK/+2/DNF</td></tr>
</table>
</table>
<table class="table" id="vrckey" style="display: inline-block;">
<tr><th colspan=10>מפת מקשים לקוביה וירטואלית</th></tr><tr>
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

<h2>פרטי האפשרויות</h2>
<ul>
<li><strong data="opt_ahide">החבא את כל האלמנטים כאשר מודד זמן</strong>. הסתר לוגו ואת כל הפאנלים בזמן המדידה.</li>
<li><strong data="opt_useMilli">השתמש באלפיות שנייה</strong>. הצג את צג המאיות, לא משנה אם מסומן, הדיוק של csTimer הוא מאיה אחת</li>
<li><strong data="opt_timeFormat">פורמט זמן</strong>. פורמט הזמן להציג</li>
<li><strong data="opt_atexpa">יצוא אוטומטי (כל 100 פתירות)</strong>. אם יסומן, csTimer ייצא את הפתירות אוטומטית כל 100 פתירות למיקום ספציפי, קובץ מקומי, שרת csTimer, או אחסון גוגל.</li>
<li><strong data="opt_expp">יבא מידע לא עדכני</strong>. If you've uploaded multiple backups, you can import from one of the up to 10 most recently uploaded backups, if you accidentally upload an empty backup, this option will help you retrieve your solves.</li>
<li><strong data="opt_useLogo">Hint messages in logo</strong>. csTimer's Logo will serve as an information display panel that prompts for a variety of information you may be interested in, such as breaking PB.</li>
<li><strong data="opt_showAvg">הראה ממוצע מתחת לטיימר</strong>. Two lines of labels are displayed below the the main timer, the current two averages, ao5 and ao12 by default.</li>
<li><strong data="opt_zoom">שנה מרחק מתצוגה</strong>. You can adjust sizes of all elements by this option.</li>
<li><strong data="opt_font">תבחר גופן לטיימר</strong>. Font of the main timer.</li>
<li><strong data="opt_uidesign">UI design is</strong>. You can switch ui design to material-like, or hide shadows by this option.</li>
<li><strong data="opt_view">סגנון ממשק משתמש הוא</strong>. Switch between desktop and mobile views.</li>
<li><strong data="opt_wndScr">סגנון תצוגה של לוח הבלגון</strong>. Make scramble panel embedded into background.</li>
<li><strong data="opt_wndStat">סגנון תצוגת לוח סטטיסטיקות</strong>. Make list times panel embedded into background.</li>
<li><strong data="opt_wndTool">סגנון תצוגת לוח כלים</strong>. Make tool panel embedded into background.</li>
<li><strong data="opt_bgImgO">שקיפות תמונת רקע</strong>. Opacity of the background image.</li>
<li><strong data="opt_bgImgS">תמונת רקע</strong>. You can select your own image as the background image, however, only https urls are available due to security constraint of the browser.</li>
<li><strong data="opt_timerSize">גודל טיימר</strong>. Set the size of main timer.</li>
<li><strong data="opt_smallADP">השתמש בגופן קטן אחרי נקודה עשרונית</strong>. Use a smaller font size after the digital point in main timer.</li>
<li><strong data="opt_useMouse">שימוש בטיימר עם העכבר</strong>. Use mouse to start timer, keyboard-trigger will also be available.</li>
<li><strong data="opt_useIns">השתמש בסקירת WCA</strong>. Enable WCA inspection procedure, which is a 15-second countdown, auto +2/DNF penalty will also be enabled if you inspecting more than 15 seconds.</li>
<li><strong data="opt_voiceIns">התראה קולית של סקירת WCA</strong>. Alert at 8s/12s of inspection, to simulate the alert from judge in WCA competitions.</li>
<li><strong data="opt_voiceVol">עוצמת שמע</strong>. Voice level of the alert above.</li>
<li><strong data="opt_input">הזן זמנים עם</strong>. csTimer is able to add solves by several ways, it supports manually input, automatically record from a stackmat timer, connect to a bluetooth smart cube or play virtual Rubik's cube, besides keyboard timing.</li>
<li><strong data="opt_intUN">יחידה כשמכניסים מספר</strong>. When you type an integer XXX in the input box, what does it mean, XXX second or XXX centisecond or XXX millisecond?</li>
<li><strong data="opt_timeU">עדכון הטיימר הוא</strong>. How timer is updated when timing.</li>
<li><strong data="opt_preTime">זמן השארת מקש הרווח לחוץ(שנייה(ות))</strong>. How long the space bar should be held before the timer turns green.</li>
<li><strong data="opt_phases">רב-שלבי</strong>. Number of phases, press any key to mark a split point when timing.</li>
<li><strong data="opt_stkHead">Use Stackmat Status Information</strong>. Stackmat will report its state, e.g. whether left or right area is touched, then csTimer is able to use these information, however, the data error might occur and cause unexpected behavior.</li>
<li><strong data="opt_scrSize">גודל בלגון</strong>. גודל כתב הבלגון.</li>
<li><strong data="opt_scrASize">גודל ערבוב אוטומטי</strong>. הגודל של כתב הבלגון יותאם באופן אוטומטי לפי אורך הבלגון, עובד גם עם האפשרות הקודמת.</li>
<li><strong data="opt_scrMono">רווח יחיד בבלגון</strong>. Use monospaced font for scramble text.</li>
<li><strong data="opt_scrLim">הגבל את גובה אזור הבלגון</strong>. When the scramble area is too high, a scroll bar will occur to avoid the raising of the scramble panel.</li>
<li><strong data="opt_scrAlign">יישור אזור הבלגון</strong>. Alignment of the whole scramble area, include scramble type selector.</li>
<li><strong data="opt_preScr">pre-scramble</strong>. Pre moves before scramble, which is used for virtual Rubik's cube and scramble image.</li>
<li><strong data="opt_scrFast">משתמש בבלגון מהיר ל-4×4×4 (לא רשמי)</strong>. WCA official 4x4x4 scramble requires huge computation resources, select this option to use a random-move scramble for 4x4x4 instead.</li>
<li><strong data="opt_scrKeyM">סמן מהלך(י) מפתח בבלגון</strong>. Mark a key move in the scramble, e.g. the move that take the state away from square shape in SQ1 scrambles.</li>
<li><strong data="opt_scrClk">Action when clicking scramble</strong>. Behavior when you click on the scramble text, copy scramble or generate next scramble.</li>
<li><strong data="opt_trim">כמות פתירות חתוכה מכל צד</strong>. Number of solves trimmed at head and tail of solves when calculating average.</li>
<li><strong data="opt_statsum">הראה סיכום לפני רשימת זמנים</strong>. Show the statistics table before time list.</li>
<li><strong data="opt_printScr">הראה ערבוב(ים) בסטטיסטיקות</strong>. Print scramble in round statistics dialog.</li>
<li><strong data="opt_printDate">הראה תאריך בסטטיסטיקות</strong>. Print solving date in round statistics dialog.</li>
<li><strong data="opt_imrename">שנה שם סשן ישר אחרי יצירה</strong>. Immediately rename a session after creating it.</li>
<li><strong data="opt_scr2ss">תיצור סשן חדש כשמחליפים סוג ערבוב</strong>. When switching scramble type, a new session will be created.</li>
<li><strong data="opt_statinv">להפוך רשימת זמנים</strong>. Invert the time list, thus, latest solves will at the bottom of the time list.</li>
<li><strong data="opt_statclr">להפעיל ריקון סשנים</strong>. When disabled, an '+' button (for session creating) will replace the 'X' button besides the session selector, thus, when clicked, a new empty session will be created instead of clearing the whole session.</li>
<li><strong data="opt_absidx">Show absolute index in statistics report</strong>. Show absolute index in the session instead of 1 to number of solves (e.g. 1/2/3 for mo3) in round statistics.</li>
<li><strong data="opt_rsfor1s">הראה סטטיסטיקות כשלוחצים על מספר פתירה</strong>. When click the first row of the time list, show a round statistics for a single solve.</li>
<li><strong data="opt_statal">אינדקטורים סטטיסטיים</strong>. Statistical indicator for the statistics table, when customizing, aoX and moX are available.</li>
<li><strong data="opt_delmul">להפעיל מחיקה מרובה</strong>. Able to delete multiple solves starts from a solve, for avoid misunderstand, the selected solve will be the oldest solve to delete.</li>
<li><strong data="opt_disPrec">דיוק פריסת זמנים</strong>. Time interval for the time distribution tool.</li>
<li><strong data="opt_solSpl">Show solution progressively</strong>. If selected, only the length of a solution from a solver is displayed, and you can view the solution one move by one move, otherwise, the whole solution is displayed.</li>
<li><strong data="opt_imgSize">גודל תמונת בלגון</strong>. Set the size of scramble image.</li>
<li><strong data="opt_NTools">מספר כלים</strong>. csTimer is able to show up to 4 tools simultaneously.</li>
<li><strong data="opt_useKSC">השתמש בקיצורי מקלדת</strong>. Use keyboard shortcut to switch scramble type, generate next scramble, switch between sessions, etc.</li>
<li><strong data="opt_vrcSpeed">VRC base speed (tps)</strong>. Base turn speed of the virtual Rubik's cube, the turn will be speed up if there are multiple moves to turn.</li>
<li><strong data="opt_vrcMP">רב-שלבי</strong>. Automatic multi-phase split for virtual Rubik's cube and bluetooth cube.</li>
<li><strong data="opt_giiVRC">הראה קובייה דיגיטלית</strong>. Show a virtual Rubik's cube in the main timer when connecting to a bluetooth cube.</li>
<li><strong data="opt_giiSD">Mark scrambled if stay</strong>. For a bluetooth cube, csTimer cannot know whether a move is from for scrambling or solving.</li>
<li><strong data="opt_giiSK">סמן מבולגן עם רווח</strong>. When the space bar is pressed, the bluetooth cube is marked scrambled, any turns after that will treated as the start of timing.</li>
<li><strong data="opt_giiSM">Mark scrambled by doing</strong>. Use specific move sequences on the bluetooth cube to mark scrambled.</li>
<li><strong data="opt_giiBS">Beep when mark scrambled</strong>. Beep when some of scramble-finish signal is triggered.</li>
<li><strong data="opt_giiRST">אפס קוביית בלוטות&#x27; כאשר מחובר</strong>. When connecting to a bluetooth cube, csTimer will detect whether it is solved, if not, there might be some hardware problems or the cube is really unsolved.</li>
<li><strong data="opt_giiAED">Auto hardware error detection</strong>. ייתכן שכמה קוביות בלוטות' לא יקלטו כמה מהמהלכים בעקבות תקלה בחומרה, csTimer ינסה לאתר מקרים כאלה.</li>
</ul>
<h2>פרטי הכלים</h2>
<ul>
<li><strong data="tool_scrgen">מייצר ערבובים</strong>. You are able to generate up to 999 scrambles with one click by this tool.</li>
<li><strong data="tool_cfm">אשר זמן</strong>. Tool to view current solves with its comment, scramble, solving date and reconstruction if available, which is also the dialog when you click on a solve.</li>
<li><strong data="tool_hugestats">סטטיסטיקות רשימת פלוס</strong>. You are able to do cross-session statistics with this tool.</li>
<li><strong data="tool_stats">סטטיסטיקות</strong>. Statistic table similar with the table in the list times panel.</li>
<li><strong data="tool_distribution">חלוקת זמן</strong>. Time distribution and stability analysis, &lt;X Y/Z means there are totally Y solves less than X seconds, and all of the latest Z solves are less than X seconds in the session.</li>
<li><strong data="tool_trend">מגמת זמן</strong>. Shows a trend curve of all solves in current session.</li>
<li><strong data="tool_dlystat">Daily Statistics</strong>. Count number of solves each day/week/month/year.</li>
<li><strong data="tool_image">בלגון חדש</strong>. Scramble image to verify a correct scramble, all WCA puzzles are supported.</li>
<li><strong data="tool_roux1">פותרים &gt; פתור Roux S1</strong>. Roux 1st step solver, which solves a 1x2x3 block.</li>
<li><strong data="tool_eoline">פותרים &gt; פתור EOLine</strong>. EO line solver, which solves orientations of all 12 edges, and positions of DF and DB edges.</li>
<li><strong data="tool_cross">פותרים &gt; פתור פלוס</strong>. Cross solver, which solve DF, DL, DR, DB edges.</li>
<li><strong data="tool_222face">פותרים &gt; פאת 2x2x2</strong>. 2x2x2 face solver, which solves a face of 2x2x2 cube.</li>
<li><strong data="tool_333cf">פותרים &gt; Cross + F2L</strong>. Cross and F2L solver, which solves Cross and 4 F2Ls with computer search, so the solution might be far from human solutions.</li>
<li><strong data="tool_333roux">פותרים &gt; Roux S1 + S2</strong>. Roux 1st and 2nd step solver, which firstly solves a 1x2x3 block on the left face and then expend another 1x2x3 block on the right face with R, M, r, U.</li>
<li><strong data="tool_333petrus">פותרים &gt; 2x2x2 + 2x2x3</strong>. Petrus 1st and 2nd step solver, which firstly solves an 2x2x2 block on the left and then expend it to a 2x2x3 on the left.</li>
<li><strong data="tool_333zz">פותרים &gt; EOLine + ZZF2L</strong>. Eoline and ZZF2L solver, which firstly solves the EOLine and then solve one of left 1x2x3 or right 1x2x3 and the solve the other 2x2x3.</li>
<li><strong data="tool_sq1cs">פותרים &gt; SQ1 S1 + S2</strong>. SQ1 1st and 2nd step solver, which firstly solves the shape of SQ1 and then split U pieces and D pieces.</li>
<li><strong data="tool_pyrv">פותרים &gt; Pyraminx V</strong>. Pyraminx V solver, which solves three corners and two edges to shape into a 'V' pattern for pyraminx.</li>
<li><strong data="tool_skbl1">פותרים &gt; Skewb Face</strong>. Skewb face solver, which solves a layer of skewb, more specifically, 1 center and 4 neighbor corners.</li>
<li><strong data="tool_giikerutil">קוביית Giiker</strong>. Auxiliary tool for bluetooth cube, which is able to show current state, battery power, real-time reconstruction etc.</li>
<li><strong data="tool_if">InsertionFinder</strong>. Insertion finder, which is for FMC.</li>
<li><strong data="tool_mtrnm">מטרונום</strong>. Metronome, besides beeping at specific frequency, you make it beep at specific time after starting solve as well.</li>
<li><strong data="tool_onlinecomp">תחרות אונליין</strong>. Online competition, so you can login with WCA account and compete with all speedsolvers around the world with same scrambles.</li>
<li><strong data="tool_stackmatutil">stackmat</strong>. Auxiliary tool for Stackmat, which is able to view the status, power and noise level of the signal, etc.</li>
</ul>
<h2>Links</h2>
<ul>
<li><a class="click" href="https://cubingchina.com/" title="">Cubing China</a></li>
<li><a class="click" href="/new/" title="">csTimer גרסת בטא</a></li>
<li><a class="click" href="/src/" title="">csTimer beta version with uncompressed files</a></li>
<li><a class="click" href="https://github.com/cs0x7f/cstimer" title="">csTimer קוד מקור</a></li>
<li><a class="click" href="/old3/" title="">csTimer גרסה 2015.12.12</a></li>
<li><a class="click" href="/old2/" title="">csTimer גרסה 2012.3.15</a></li>
<li><a class="click" href="/old/" title="">csTimer גרסה 2012.2.29</a></li>
</ul>
<h2>סכימת הצבעים</h2>
<?php include('color.php') ?>
<div class="donate" style="line-height:1.5em;">
<p>Thank you for your willingness to support csTimer! Your donation will be used to support our development and maintenance costs.</p>
<p>If you would like to offer us a donation through PayPal, please click the button below or through <a class="click" href="https://www.paypal.me/cs0x7f" title="">PayPal.me</a>.</p>
<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
<input type="hidden" name="cmd" value="_s-xclick">
<input type="hidden" name="hosted_button_id" value="NW25HME3QUEZY">
<input type="image" src="data:image/gif;base64,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" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
</form>
<p>You can also fund us by Alipay, scan the next two-dimensional code or please pay to the account: cs0x7f@gmail.com</p>
<p><img style="display:inline-block; width:10em; height:10em;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABsCAIAAAAABMCaAAABoklEQVR42u3aUY6DMAwFQO5/6e0JViq1XwjO5LOqIAxSHJ5z/RnlcSGACHEk4hUY/974i/9/83vlXl3PBREixPmIpYX25oNVrl95GV3PBREixLMQ05OuXD9RoG5fByJEiBCfnDREiBAhDkashAulTTJEiBAhbhJAJIKM41IciBAhLkOMNHQ2+P313T6IECEuQ9z60FBTcYjMDSJEiCMRKx//K4tMYvNcOkwAESLEoxBXNukTwW1XKAsRIsRzEZ9CqUAkClQpxYEIEeIYxApo1+b2qeK2xRcLRIgQH0dMLPaVSVeg080piBAhzkdMB59dQWn6BTxWnSFChLgtYrqAlCYdPmwVCWUhQoQ4HjFRZBIHCBIbeIgQIUJs/WhPLPDhxhlEiBDPQkyPdIFKo99OtiFChPhqxHRzZ+Xho3SwAhEixLMQ0wt/2wOEN+dtoSxEiBDHIO7QhFrZtLr94iFChAgx1AzqKmgrwwiIECFC7ERMh69dG2yIECFCXBFAVIpAegP/mhQHIkSIUcSVjar0hjkeJEOECHEkovFjIUUAEeKU8QE0apeVMce/LwAAAABJRU5ErkJggg=="></p>
<p>שוב פעם, תודה רבה על תרומתך!</p>
</div>