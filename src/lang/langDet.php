<?php
$version = "2020.05.02";

function prefered_language($available_languages, $req_lang) {
  if ($req_lang == "auto" && isset($_SERVER['HTTP_ACCEPT_LANGUAGE'])) {
    $req_lang = $_SERVER['HTTP_ACCEPT_LANGUAGE'];
  }
  $req_lang = strtolower($req_lang);
  foreach ($available_languages as $avail_lang) {
    if (substr($req_lang, 0, 5) == $avail_lang) {
      return $avail_lang;
    }
  }
  foreach ($available_languages as $avail_lang) {
    if (substr($req_lang, 0, 2) == substr($avail_lang, 0, 2)) {
      return $avail_lang;
    }
  }
  return 'en-us';
}

if (isset($_REQUEST["lang"]) && !empty($_REQUEST["lang"])) {
  $req_lang = $_REQUEST['lang'];
} else if (isset($_COOKIE["lang"]) && !empty($_COOKIE["lang"])) {
  $req_lang = $_COOKIE['lang'];
} else {
  $req_lang = "auto";
}
if ($req_lang == "cn") {
  $req_lang = "zh-cn";
}

$lang = prefered_language(array("en-us", "ca-es", "cs-cz", "da-dk", "de-de", "el-gr", "es-es", "fa-ir", "fi-fi", "fr-fr", "he-il", "hr-hr", "hu-hu", "it-it", "ja-jp", "ko-kr", "nl-nl", "no-no", "pl-pl", "pt-pt", "ro-ro", "ru-ru", "sk-sk", "sr-sp", "sv-se", "tr-tr", "uk-ua", "vi-vn", "zh-cn", "zh-tw"), $req_lang);

if ($lang == "en-us") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Professional Rubik's Cube Speedsolving/Training Timer </title>
<?php } else if ($lang == "ca-es") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Professional Rubik's Cube Speedsolving/Training Timer </title>
<?php } else if ($lang == "cs-cz") { ?>
  <meta name="keywords" content="časovač, csčasovač, časovač pro rubikovu kostku, online časovač, web časovač">
  <title> csČasovač - Pofesionální Speedsolving/Training Časovač pro Rubikovu Kostku </title>
<?php } else if ($lang == "da-dk") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Professionel Rubik's Cube Speedsolving/Trænings Timer </title>
<?php } else if ($lang == "de-de") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Professioneller Rubik's Cube Speedsolving/Training Timer </title>
<?php } else if ($lang == "el-gr") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Professional Rubik's Cube Speedsolving/Training Timer </title>
<?php } else if ($lang == "es-es") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Cronómetro profesional de speedcubing y entrenamiento </title>
<?php } else if ($lang == "fa-ir") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Professional Rubik's Cube Speedsolving/Training Timer </title>
<?php } else if ($lang == "fi-fi") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Professional Rubik's Cube Speedsolving/Training Timer </title>
<?php } else if ($lang == "fr-fr") { ?>
  <meta name="keywords" content="timer, cstimer, timer de Rubik's Cube, timer en ligne, timer web">
  <title> csTimer - Timer professionnel de resolution/entrainement au Rubik's Cube </title>
<?php } else if ($lang == "he-il") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Professional Rubik's Cube Speedsolving/Training Timer </title>
<?php } else if ($lang == "hr-hr") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Profesionalna štoperica za brzo slaganje Rubikove kocke </title>
<?php } else if ($lang == "hu-hu") { ?>
  <meta name="keywords" content="időmérő, cstimer, Rubik kocka időmérő, online időmérő, webes időmérő">
  <title> csTimer - Professzionбlis Gyorskockбzу/Gyakorlу Idхmйrх </title>
<?php } else if ($lang == "it-it") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Cronometro Professionale per Speedcubing/Allenamento </title>
<?php } else if ($lang == "ja-jp") { ?>
  <meta name="keywords" content="タイマー, cstimer, ルービックキューブタイマー, オンラインタイマー, webタイマー">
  <title> csTimer - Professional Rubik's Cube Speedsolving/Training Timer </title>
<?php } else if ($lang == "ko-kr") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - 큐브 연습용 초시계 </title>
<?php } else if ($lang == "nl-nl") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Professional Rubik's Cube Speedsolving/Training Timer </title>
<?php } else if ($lang == "no-no") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Professional Rubik's Cube Speedsolving/Training Timer </title>
<?php } else if ($lang == "pl-pl") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Profesjonalny Timer do Speedsolvingu/Treningu </title>
<?php } else if ($lang == "pt-pt") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Professional Rubik's Cube Speedsolving/Training Timer </title>
<?php } else if ($lang == "ro-ro") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Professional Rubik's Cube Speedsolving/Training Timer </title>
<?php } else if ($lang == "ru-ru") { ?>
  <meta name="keywords" content="таймер, cstimer, таймер для кубика рубика, онлайн таймер, веб-таймер">
  <title> csTimer - Профессиональный тренировочный таймер для кубика Рубика </title>
<?php } else if ($lang == "sk-sk") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Professional Rubik's Cube Speedsolving/Training Timer </title>
<?php } else if ($lang == "sr-sp") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Professional Rubik's Cube Speedsolving/Training Timer </title>
<?php } else if ($lang == "sv-se") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Professionell Rubiks kub speedsolving/tränings timer </title>
<?php } else if ($lang == "tr-tr") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - profesyonel Rubik Küpü Çözüm/Antreman Kronometresi </title>
<?php } else if ($lang == "uk-ua") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Professional Rubik's Cube Speedsolving/Training Timer </title>
<?php } else if ($lang == "vi-vn") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Trang tính giờ / huẩn luyện chuyên nghiệp cho rubik's cube solver </title>
<?php } else if ($lang == "zh-cn") { ?>
  <meta name="keywords" content="计时器, cstimer, 魔方计时器, 在线计时器, 网页计时器">
  <title> csTimer - 魔方竞速训练专用计时器 </title>
<?php } else if ($lang == "zh-tw") { ?>
  <meta name="keywords" content="計時器, cstimer, 魔術方塊計時器, 線上計時器">
  <title> csTimer - 專業的魔術方塊速解計時器 </title>
<?php } else { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Professional Rubik's Cube Speedsolving/Training Timer </title>
<?php } ?>
  <script type="text/javascript">
var CSTIMER_VERSION = '<?php echo $version; ?>';
var LANG_SET = '|en-us|ca-es|cs-cz|da-dk|de-de|el-gr|es-es|fa-ir|fi-fi|fr-fr|he-il|hr-hr|hu-hu|it-it|ja-jp|ko-kr|nl-nl|no-no|pl-pl|pt-pt|ro-ro|ru-ru|sk-sk|sr-sp|sv-se|tr-tr|uk-ua|vi-vn|zh-cn|zh-tw';
var LANG_STR = 'English|Català|Čeština|Dansk|Deutsch|Ελληνικά|Español|فارسی|Suomi|Français|עברית|Hrvatski|Magyar|Italiano|日本語|한국어|Nederlands|Norsk|Polski|Português|Română|Pусский|Slovenčina|Српски|Svenska|Türkçe|Українська|Tiếng Việt|简体中文|繁體中文';
var LANG_CUR = '<?php echo $lang; ?>';
<?php include('lang/'.$lang.'.js');?>
  </script>
