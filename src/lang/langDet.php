<?php
$version = "2019.01.06";
$req_lang = "en";
$lang = "en";
$lang_list = array("en" => "en", "zh" => "cn", "es" => "es", "fr" => "fr", "hu" => "hu", "it" => "it", "ko" => "ko", "nl" => "nl", "vi" => "vi", "pt" => "pt", "da" => "da", "hr" => "hr", "tr" => "tr", "ru" => "ru", "de" => "de");

if(isset($_SERVER['HTTP_ACCEPT_LANGUAGE']) && !empty($_SERVER['HTTP_ACCEPT_LANGUAGE'])) {
  $req_lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 4);
}

if(isset($_REQUEST["lang"]) && !empty($_REQUEST["lang"])) {
  $req_lang = $_REQUEST['lang'];
}

foreach ($lang_list as $key => $value) {
  if (preg_match("/".$key."/i", $req_lang)) {
    $lang = $value;
  }
}

if ($lang == "cn") { ?>
  <meta name="keywords" content="计时器, cstimer, 魔方计时器, 在线计时器, 网页计时器">
  <title> csTimer - 魔方竞速训练专用计时器 </title>
<?php } else if ($lang == "es") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Cronómetro profesional de speedcubing y entrenamiento </title>
<?php } else if ($lang == "hu") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Professzionбlis Gyorskockбzу/Gyakorlу Idхmйrх </title>
<?php } else if ($lang == "it") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Cronometro Professionale per Speedcubing/Allenamento </title>
<?php } else if ($lang == "ko") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - 큐브 연습용 초시계 </title>
<?php } else if ($lang == "vi") { ?>
  <meta name="keywords" content="đồi hồ bấm giờ, cstimer, tính giờ cho rubik, tính giờ trục tuyến, web tính giờ">
  <title> csTimer - Trang tính giờ / huẩn luyện chuyên nghiệp cho rubik's cube solver </title>
<?php } else if ($lang == "da") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Professionel Rubik's Cube Speedsolving/Trænings Timer </title>
<?php } else if ($lang == "hr") { ?>
  <meta name="keywords" content="štoperica, cstimer, štoperica za rubikovu kocku, online štoperica, web štoperica">
  <title> csTimer - Profesionalna štoperica za brzo slaganje Rubikove kocke </title>
<?php } else if ($lang == "tr") { ?>
  <meta name="keywords" content="Kronometre, cstimer, rubik küpü kronometresi, internet kronometresi, web kronometresi">
  <title> csTimer - profesyonel Rubik Küpü Çözüm/Antreman Kronometresi </title>
<?php } else if ($lang == "ru") { ?>
  <meta name="keywords" content="таймер, кстаймер, таймер кубик рубика, онлайн таймер, время">
  <title> csTimer - Профессиональный тренировочный таймер для кубика Рубика </title>
<?php } else { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Professional Rubik's Cube Speedsolving/Training Timer </title>
<?php } ?>
  <script type="text/javascript">
var LANG_SET = '|en|zh-cn|es|fr|hu|it|ko|nl|vi|pt|da|hr|tr|ru|de';
var LANG_STR = 'English|简体中文|Español|Français|Magyar|Italiano|한국어|Nederlands|Tiếng Việt|Português|Dansk|Hrvatski|Türkçe|Pусский|Deutsch';
<?php include('lang/'.$lang.'.js');?>
  </script>
