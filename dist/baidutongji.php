<script type="text/javascript">
var _hmt = _hmt || [];
$(function() {
	var hm = document.createElement("script");
	hm.src = "//hm.baidu.com/hm.js?474c635761856d5056d56c73b5e2fc4b";
	var s = document.getElementsByTagName("script")[0];
	s.parentNode.insertBefore(hm, s);
	if (kernel.getProp && kernel.getProp('showad')) {
		var ad = document.createElement("script");
		ad.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6967007473251468';
		ad.setAttribute('async', 'true');
		ad.setAttribute('crossorigin', 'anonymous');
		s.parentNode.insertBefore(ad, s);
	}
	kernel.regListener('baidu', 'property', function(signal, value) {
		setTimeout(function() {
			_hmt.push(['_trackEvent', 'color', kernel.exportColor && kernel.exportColor()]);
		}, 500);
	}, /^color$/);
});
</script>
