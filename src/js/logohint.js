"use strict";

var logohint = execMain(function() {

	var msgList = [];
	var curMsg;
	var logo;
	var logocc;

	var isMouseIn = false;
	var enabled = false;

	function msgFinished() {
		curMsg = undefined;
		render();
	}

	function render() {
		if (isMouseIn) {
			logocc.removeClass('hint');
			logocc.html('ABOUT');
			curMsg = undefined;
			return;
		}
		if (curMsg != undefined) {
			return;
		}
		curMsg = msgList.shift();
		if (curMsg == undefined) {
			logocc.removeClass('hint');
			logocc.html('csTimer');
			return;
		}
		var logow = logo.width();
		logocc.html('<div class="pad" style="width: ' + logow + 'px; ">csTimer</div>' +
			'<span class="msg">' + curMsg + '</span>' +
			'<div class="pad" style="width:' + logow + 'px; margin-right:' + (-logow) + 'px;">csTimer</div>');
		logocc.removeClass('hint');
		var duration = (curMsg.length + 15) * 0.1 + 's';
		logocc.css({
			'-webkit-animation-duration': duration,
			'-moz-animation-duration': duration,
			'animation-duration': duration
		});
		setTimeout(function() {
			logocc.addClass('hint');
		});
	}

	function checkAnimation() {
		var animation = false,
			domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
			elem = document.createElement('div');
		if (elem.style.animationName !== undefined) {
			return true;
		}
		if (animation === false) {
			for (var i = 0; i < domPrefixes.length; i++) {
				if (elem.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
					return true;
				}
			}
		}
		return false;
	}

	$(function() {
		logo = $('#logo');
		logocc = logo.children().children();
		logocc.bind('oanimationend animationend webkitAnimationEnd', msgFinished);
		var about = $('#about');
		var title = about.children('h1').appendTo(kernel.temp).html();
		logo.mouseenter(function() {
			isMouseIn = true;
			render();
		});
		logo.mouseleave(function() {
			isMouseIn = false;
			render();
		});
		logo.click(function() {
			if (location.protocol != 'https:' && $.confirm('Your access to csTimer is unsafe. Press OK for safe access.')) {
				location.protocol = 'https:';
			}
			about.show();
			kernel.showDialog([about, 0, undefined, 0], 'logo', title);
		});
		about.hide();
		kernel.regProp('kernel', 'useLogo', 0, USE_LOGOHINT, [true], 1);


		enabled = checkAnimation();
	});

	return {
		push: function(msg) {
			if (!enabled || !kernel.getProp('useLogo', true)) {
				return;
			}
			msgList.push(msg);
			render();
		}
	};
});
