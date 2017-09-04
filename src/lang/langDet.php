<?php 
$req_lang = "en";
$lang = "en";
$lang_list = array("en" => "en", "zh" => "cn", "es" => "es", "fr" => "fr", "hu" => "hu", "it" => "it", "ko" => "ko", "nl" => "nl", "vi" => "vi", "pt" => "pt");

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
  <meta name="keywords" content="cstimer, 计时器, 魔方计时器, 在线计时器, 网页计时器, 网页魔方计时器">
  <meta name="description" content="csTimer是迄今为止功能最全面、界面最友好、使用最便捷的在线版网页魔方计时器：提供三阶魔方、N阶魔方、各种异形魔方的打乱；提供多种成绩统计功能；可离线保存成绩的魔方计时器；提供符合WCA官方所有打乱的魔方计时器；提供各类训练功能，如cross，F2L，OPLL，盲拧，高阶对棱功能的魔方计时器等。">
  <title> csTimer - 魔方竞速训练专用计时器 </title>
<?php } else if ($lang == "es") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Cronómetro profesional de speedcubing y entrenamiento </title>
<?php } else if ($lang == "fr") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Professional Rubik's Cube Speedsolving/Training Timer </title>
<?php } else if ($lang == "hu") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Professzionбlis Gyorskockбzу/Gyakorlу Idхmйrх </title>
<?php } else if ($lang == "it") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Cronometro Professionale per Speedcubing/Allenamento </title>
<?php } else if ($lang == "ko") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - 전문 큐브 타이머 </title>
<?php } else if ($lang == "nl") { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Professionele Speedcubing/Training Timer </title>
<?php } else if ($lang == "vi") { ?>
  <meta name="keywords" content="đồi hồ bấm giờ, cstimer, tính giờ cho rubik, tính giờ trục tuyến, web tính giờ">
  <title> csTimer - Trang tính giờ / huẩn luyện chuyên nghiệp cho rubik's cube solver </title>
<?php } else { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Professional Rubik's Cube Speedsolving/Training Timer </title>
<?php } ?>