<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html class="p100">
 <head>
  <meta http-equiv="content-type" content="text/html; charset=UTF-8">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <meta name="format-detection" content="telephone=no">
  <meta name="viewport" content="width=500, user-scalable=no">
  <link rel="manifest" href="cstimer.webmanifest">
<?php include('lang/langDet.php');?>
  <link rel='stylesheet' type='text/css' href='css/style.css'>
  <script type="text/javascript" src="js/lib/jquery-1.8.0.js"></script>
  <script type="text/javascript" src="js/lib/utillib.js"></script>
  <script type="text/javascript" src="js/lib/sha256.js"></script>
  <script type="text/javascript" src="js/lib/isaac.js"></script>
  <script type="text/javascript" src="js/lib/mathlib.js"></script>
  <script type="text/javascript" src="js/lib/grouplib.js"></script>
  <script type="text/javascript" src="js/lib/poly3dlib.js"></script>
  <script type="text/javascript" src="js/lib/pat3x3.js"></script>
  <script type="text/javascript" src="js/lib/sbtree.js"></script>
  <script type="text/javascript" src="js/lib/sqlfile.js"></script>
  <script type="text/javascript" src="js/lib/tdconverter.js"></script>
  <script type="text/javascript" src="js/lib/lzstring.js"></script>
  <script type="text/javascript" src="js/lib/min2phase.js"></script>
  <script type="text/javascript" src="js/lib/cubeutil.js"></script>
  <script type="text/javascript" src="js/lib/puzzlefactory.js"></script>
  <script type="text/javascript" src="js/kernel.js"></script>
  <script type="text/javascript" src="js/export.js"></script>
  <script type="text/javascript" src="js/logohint.js"></script>
  <script type="text/javascript" src="js/timer.js"></script>
  <script type="text/javascript" src="js/timer/input.js"></script>
  <script type="text/javascript" src="js/timer/stackmat.js"></script>
  <script type="text/javascript" src="js/timer/bttimer.js"></script>
  <script type="text/javascript" src="js/timer/virtual.js"></script>
  <script type="text/javascript" src="js/timer/giiker.js"></script>
  <script type="text/javascript" src="js/solver/ftocta.js"></script>
  <script type="text/javascript" src="js/solver/kilominx.js"></script>
  <script type="text/javascript" src="js/scramble/scramble.js"></script>
  <script type="text/javascript" src="js/scramble/megascramble.js"></script>
  <script type="text/javascript" src="js/scramble/scramble_333_edit.js"></script>
  <script type="text/javascript" src="js/scramble/scramble_444.js"></script>
  <script type="text/javascript" src="js/scramble/scramble_sq1_new.js"></script>
  <script type="text/javascript" src="js/scramble/pyraminx.js"></script>
  <script type="text/javascript" src="js/scramble/skewb.js"></script>
  <script type="text/javascript" src="js/scramble/2x2x2.js"></script>
  <script type="text/javascript" src="js/scramble/gearcube.js"></script>
  <script type="text/javascript" src="js/scramble/1x3x3.js"></script>
  <script type="text/javascript" src="js/scramble/2x2x3.js"></script>
  <script type="text/javascript" src="js/scramble/clock.js"></script>
  <script type="text/javascript" src="js/scramble/333lse.js"></script>
  <script type="text/javascript" src="js/scramble/mgmlsll.js"></script>
  <script type="text/javascript" src="js/scramble/kilominx.js"></script>
  <script type="text/javascript" src="js/scramble/scramble_fto.js"></script>
  <script type="text/javascript" src="js/scramble/redi.js"></script>
  <script type="text/javascript" src="js/scramble/slide.js"></script>
  <script type="text/javascript" src="js/scramble/utilscramble.js"></script>
  <script type="text/javascript" src="js/lib/storage.js"></script>
  <script type="text/javascript" src="js/stats/timestat.js"></script>
  <script type="text/javascript" src="js/stats/stats.js"></script>
  <script type="text/javascript" src="js/stats/stattool.js"></script>
  <script type="text/javascript" src="js/stats/trend.js"></script>
  <script type="text/javascript" src="js/stats/distribution.js"></script>
  <script type="text/javascript" src="js/stats/hugestat.js"></script>
  <script type="text/javascript" src="js/stats/dlystat.js"></script>
  <script type="text/javascript" src="js/stats/recons.js"></script>
  <script type="text/javascript" src="js/stats/trainstat.js"></script>
  <script type="text/javascript" src="js/tools/tools.js"></script>
  <script type="text/javascript" src="js/tools/image.js"></script>
  <script type="text/javascript" src="js/tools/cross.js"></script>
  <script type="text/javascript" src="js/tools/eoline.js"></script>
  <script type="text/javascript" src="js/tools/roux1.js"></script>
  <script type="text/javascript" src="js/tools/gsolver.js"></script>
  <script type="text/javascript" src="js/tools/thistlethwaite.js"></script>
  <script type="text/javascript" src="js/tools/pat3x3gen.js"></script>
  <script type="text/javascript" src="js/tools/bluetoothutil.js"></script>
  <script type="text/javascript" src="js/tools/metronome.js"></script>
  <script type="text/javascript" src="js/tools/onlinecomp.js"></script>
  <script type="text/javascript" src="js/tools/battle.js"></script>
  <script type="text/javascript" src="js/tools/syncseed.js"></script>
  <script type="text/javascript" src="js/tools/bldhelper.js"></script>
  <script type="text/javascript" src="js/twisty/twistyreplay.js"></script>
  <script type="text/javascript" src="js/shortcut.js"></script>
  <script type="text/javascript" src="js/help.js"></script>
  <script type="text/javascript" src="js/hardware/stackmat.js"></script>
  <script type="text/javascript" src="js/tools/stackmatutil.js"></script>
  <script type="text/javascript" src="js/hardware/bluetooth.js"></script>
  <script type="text/javascript" src="js/hardware/giikercube.js"></script>
  <script type="text/javascript" src="js/hardware/gocube.js"></script>
  <script type="text/javascript" src="js/hardware/gancube.js"></script>
  <script type="text/javascript" src="js/hardware/moyucube.js"></script>
  <script type="text/javascript" src="js/hardware/moyu32cube.js"></script>
  <script type="text/javascript" src="js/hardware/qiyicube.js"></script>
  <script type="text/javascript" src="js/hardware/gantimer.js"></script>
  <script type="text/javascript" src="js/hardware/qiyitimer.js"></script>
  <script type="text/javascript" src="js/worker.js"></script>
  <script type="text/javascript" src="js/lib/threemin.js"></script>
  <script type="text/javascript" src="js/lib/pnltri.js"></script>
  <script type="text/javascript" src="js/twisty/twisty.js"></script>
  <script type="text/javascript" src="js/twisty/twistynnn.js"></script>
  <script type="text/javascript" src="js/twisty/twistysq1.js"></script>
  <script type="text/javascript" src="js/twisty/twistyskb.js"></script>
  <script type="text/javascript" src="js/twisty/twistyclk.js"></script>
  <script type="text/javascript" src="js/twisty/twistypoly.js"></script>
  <script type="text/javascript" src="js/twisty/qcube.js"></script>
  <script type="text/javascript" src="js/twisty/qcubennn.js"></script>
  <script type="text/javascript" src="js/twisty/qcubeminx.js"></script>
  <script type="text/javascript" src="js/twisty/qcubeclk.js"></script>
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
<div id="lcd"></div>
<div id="avgstr"></div>
</td></tr>
</tbody></table>
<table id="rtimer" border="0" style="position:absolute; right:0%; height:100%;"><tbody>
<tr><td id="multiphase"></td></tr>
</tbody></table>
</body></html>
