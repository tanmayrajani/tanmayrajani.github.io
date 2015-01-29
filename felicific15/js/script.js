$(window).load(function() { $("#spinner").fadeOut("slow"); });
// $(document).ready(function(){
// 	if($('div').hasClass('active')){
// 		//if($('div'))
// 	}
// });

$(function() {
	$.getJSON('js/document.json', function(data) {
	    var template = $('#ce-temp').html();
	    var info = Mustache.to_html(template, data);
	    $('#ce-third').html(info);
	});
});