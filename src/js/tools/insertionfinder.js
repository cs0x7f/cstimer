var insertionFinder = execMain(function() {
	var scrambleInput = $('<textarea rows="3" style="width: 100%" />');
	var skeletonInput = $('<textarea rows="3" style="width: 100%" />');
	var resultOutput = $('<textarea rows="5" style="width: 100%" readonly />');
	var button = $('<input type="button">').val("submit").click(submit);
	var div = $('<div />').css('text-align', 'center');
		
	function submit() {
//		console.log("submit");
		$.ajax({
			url: "http://mf.qiyuuu.com/api/if.cube", 
			dataType:'jsonp', 
			data: {
				"scramble": scrambleInput.val(), 
				"skeleton": skeletonInput.val()
			}, 
			success: function(data, textStatus, jqXHR) {
//				console.log(data)
				if (data["validate"]) {
					resultOutput.val(data["url"]);
					getData(data["url"]);
				} else {
					resultOutput.val("Error. Because of parity or scramble/skeleton overflow. ");
				}
			}
		});
	}
		
	function getData(url) {
		$.ajax({
			url: url, 
			dataType:'jsonp', 
			success: function(data, textStatus, jqXHR) {
//				console.log(data)
				resultOutput.val(data["result"].replace(/<br \/>/g, '').replace(/^\s+|\s+$/g, ''));
			}
		});		
	}

	function execFunc(fdiv) {
		if (!fdiv) {
			return;
		}
		fdiv.empty().append(div);
		button.unbind("click").click(submit);
	}

	$(function() {
		div.append("scramble:", "<br>", scrambleInput, "<br>", "skeleton:", "<br>", skeletonInput, "<br>", button, "<br>", resultOutput);
		tools.regTool('if', 'InsertionFinder', execFunc);
	});
});
