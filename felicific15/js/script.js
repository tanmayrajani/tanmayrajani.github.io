$(window).load(function() { $("#spinner").fadeOut("slow"); });
// $(document).ready(function(){
// 	if($('div').hasClass('active')){
// 		//if($('div'))
// 	}
// });

$(function() {
	$.getJSON('js/document.json', function(data) {
		var template = '<center class="titlecenter"><h2>{{technical.ce.first.name}}</h2></center><ul><li>Slogan: {{technical.ce.first.slogan}}</li><li>Date: {{technical.ce.first.date}}</li><li>Description: {{technical.ce.first.description}}</li></ul>';
	    //var template = $('#ce-temp').html();
	    var info = Mustache.to_html(template, data);
	    $('#ce-third').html(info);
	});
});