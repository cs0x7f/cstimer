<?php
$version = "2019.01.06";

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

if(isset($_REQUEST["lang"]) && !empty($_REQUEST["lang"])) {
  $req_lang = $_REQUEST['lang'];
} else {
  $req_lang = "auto";
}
if ($req_lang == "cn") {
  $req_lang = "zh-cn";
}

$lang = prefered_language(array("en-us", "ca-es", "cs-cz", "da-dk", "de-de", "es-es", "fi-fi", "fr-fr", "he-il", "hr-hr", "hu-hu", "it-it", "ja-jp", "ko-kr", "nl-nl", "pl-pl", "pt-pt", "ro-ro", "ru-ru", "sk-sk", "tr-tr", "vi-vn", "zh-cn"), $req_lang);

if ($lang == "en-us") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Professional Rubik's Cube Speedsolving/Training Timer </title>
<?php } else if ($lang == "ca-es") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Professional Rubik's Cube Speedsolving/Training Timer </title>
<?php } else if ($lang == "cs-cz") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Professional Rubik's Cube Speedsolving/Training Timer </title>
<?php } else if ($lang == "da-dk") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Professionel Rubik's Cube Speedsolving/Trænings Timer </title>
<?php } else if ($lang == "de-de") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Professioneller Rubik's Cube Speedsolving/Training Timer </title>
<?php } else if ($lang == "es-es") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Cronómetro profesional de speedcubing y entrenamiento </title>
<?php } else if ($lang == "fi-fi") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Professional Rubik's Cube Speedsolving/Training Timer </title>
<?php } else if ($lang == "fr-fr") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Professional Rubik's Cube Speedsolving/Training Timer </title>
<?php } else if ($lang == "he-il") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Professional Rubik's Cube Speedsolving/Training Timer </title>
<?php } else if ($lang == "hr-hr") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Profesionalna štoperica za brzo slaganje Rubikove kocke </title>
<?php } else if ($lang == "hu-hu") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Professzionбlis Gyorskockбzу/Gyakorlу Idхmйrх </title>
<?php } else if ($lang == "it-it") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Cronometro Professionale per Speedcubing/Allenamento </title>
<?php } else if ($lang == "ja-jp") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Professional Rubik's Cube Speedsolving/Training Timer </title>
<?php } else if ($lang == "ko-kr") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - 큐브 연습용 초시계 </title>
<?php } else if ($lang == "nl-nl") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Professional Rubik's Cube Speedsolving/Training Timer </title>
<?php } else if ($lang == "pl-pl") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Professional Rubik's Cube Speedsolving/Training Timer </title>
<?php } else if ($lang == "pt-pt") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Professional Rubik's Cube Speedsolving/Training Timer </title>
<?php } else if ($lang == "ro-ro") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Professional Rubik's Cube Speedsolving/Training Timer </title>
<?php } else if ($lang == "ru-ru") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Профессиональный тренировочный таймер для кубика Рубика </title>
<?php } else if ($lang == "sk-sk") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Professional Rubik's Cube Speedsolving/Training Timer </title>
<?php } else if ($lang == "tr-tr") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - profesyonel Rubik Küpü Çözüm/Antreman Kronometresi </title>
<?php } else if ($lang == "vi-vn") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Trang tính giờ / huẩn luyện chuyên nghiệp cho rubik's cube solver </title>
<?php } else if ($lang == "zh-cn") { ?>
  <meta name="keywords" content="计时器, cstimer, 魔方计时器, 在线计时器, 网页计时器">
  <title> csTimer - 魔方竞速训练专用计时器 </title>
<?php } else { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Professional Rubik's Cube Speedsolving/Training Timer </title>
<?php } ?>
  <script type="text/javascript">
var LANG_SET = '|en-us|ca-es|cs-cz|da-dk|de-de|es-es|fi-fi|fr-fr|he-il|hr-hr|hu-hu|it-it|ja-jp|ko-kr|nl-nl|pl-pl|pt-pt|ro-ro|ru-ru|sk-sk|tr-tr|vi-vn|zh-cn';
var LANG_STR = 'English|Català|Čeština|Dansk|Deutsch|Español|Suomi|Français|עברית|Hrvatski|Magyar|Italiano|日本語|한국어|Nederlands|Polski|Português|Română|Pусский|Slovenčina|Türkçe|Tiếng Việt|简体中文';
var LANG_CUR = '<?php echo $lang; ?>';
<?php include('lang/'.$lang.'.js');?>
  </script>
