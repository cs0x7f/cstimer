<script type="text/javascript">
var _hmt = _hmt || [];
$(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?474c635761856d5056d56c73b5e2fc4b";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
});
kernel.regListener('baidu', 'property', function(signal, value) {
  _hmt.push(['_trackEvent', 'color', kernel.exportColor()]);
}, /^color$/);
</script>
