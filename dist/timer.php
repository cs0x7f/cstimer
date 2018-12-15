<?php
// if ($_SERVER['HTTP_HOST'] == "www.cstimer.net" && !isset($_REQUEST['noredirect'])) {
//   header("HTTP/1.1 301 Moved Permanently"); 
//   header("Location: https://cstimer.net".$_SERVER["REQUEST_URI"]);
//   die(0);
// }
// if ($_SERVER['HTTP_HOST'] == "cstimer.net" && !((!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || $_SERVER['SERVER_PORT'] == 443)) {
//   header("HTTP/1.1 301 Moved Permanently"); 
//   header("Location: https://cstimer.net".$_SERVER["REQUEST_URI"]);
//   die(0);
// }
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html manifest="cache.manifest">
 <head>
  <meta http-equiv="content-type" content="text/html; charset=UTF-8">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <meta name="format-detection" content="telephone=no">
  <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
  <link rel="apple-touch-icon" href="cstimer512x512.png">
  <link rel="manifest" href="cstimer.webmanifest">
<?php include('lang/langDet.php');?>
  <script type="text/javascript"><?php include('lang/'.$lang.'.js');?></script>
  <link rel='stylesheet' type='text/css' href='css/style.css'>
  <script type="text/javascript" src="js/jquery.min.js"></script>
  <script type="text/javascript" src="js/cstimer.js"></script>
<?php include('baidutongji.php') ?>
</head>
<body>
<div id="leftbar">
  <div class="mybutton c1"><div><span></span><span class="icon">&#59796;</span></div></div>
  <div class="mybutton c2"><div><span></span><span class="icon">&#59846;</span></div></div>
  <div class="mybutton c3"><div><span></span><span class="icon">&#59648;</span></div></div>
  <div id="logo" class="mybutton"><div><span>csTimer</span></div></div>
  <div class="mybutton c4"><div><span></span><span class="icon">&#59835;</span></div></div>
  <div class="mybutton c5"><div><span></span><span class="icon">&#59710;</span></div></div>
  <div class="mybutton c6"><div><span></span><span class="icon">&#59795;</span></div></div>
</div>
<div id="gray"></div>
<div><img id="bgImage"></div>
<div id="about" style="display:none;">
<?php include('lang/'.$lang.'.php') ?>
</div>
<table id="timer" border="0"><tbody>
<tr><td id="container">
<div id="touch"></div>
<div id="lcd"></div>
<div id="avgstr"></div>
</td></tr>
</tbody></table>
<table border="0" style="position:absolute; right:0%; height:100%;"><tbody>
<tr><td id="multiphase"></td></tr>
</tbody></table>
</body></html>
