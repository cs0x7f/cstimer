<script type="text/javascript">
var _hmt = _hmt || [];
(function() {
	var waitCnt = 0;
	function asyncExec() {
		if (++waitCnt < 5) {
			$(asyncExec);
			return;
		}
		setTimeout(function() {
			DEBUG && console.log('[adstat] start loading async scripts');
			var hm = document.createElement("script");
			hm.src = "//hm.baidu.com/hm.js?474c635761856d5056d56c73b5e2fc4b";
			hm.setAttribute('async', 'true');
			var s = document.getElementsByTagName("script")[0];
			s.parentNode.insertBefore(hm, s);
		}, 500);
	}
	$(asyncExec);
})();
</script>
