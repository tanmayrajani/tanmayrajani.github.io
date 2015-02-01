$(window).load(function() { $("#spinner").fadeOut("slow"); });

$(function() {
	$('.ce-link, .ec-link, .mba-link, .robo-link').click(function() {
		$('.slide').removeClass('slide-cyan').removeClass('slide-purple').removeClass('slide-d-orange').addClass('slide-blue');
		$('body').removeClass('body-cyan').removeClass('body-purple').removeClass('body-d-orange').addClass('body-blue');
	});

	$('.civil-link, .it-link, .bmca-link').click(function() {
		$('.slide').removeClass('slide-cyan').removeClass('slide-blue').removeClass('slide-d-orange').addClass('slide-purple');
		$('body').removeClass('body-cyan').removeClass('body-blue').removeClass('body-d-orange').addClass('body-purple');
	});

	$('.chem-link, .ic-link, .mech-link').click(function() {
		$('.slide').removeClass('slide-cyan').removeClass('slide-purple').removeClass('slide-blue').addClass('slide-d-orange');
		$('body').removeClass('body-cyan').removeClass('body-purple').removeClass('body-blue').addClass('body-d-orange');
	});

	$.getJSON('js/document.json', function(data) {
		var branch;
		var eventNo;

		var template = '<center class="titlecenter"><h2>{{technical.ce.first.name}}</h2></center><ul><li>Slogan: {{technical.ce.first.slogan}}</li><li>Date: {{technical.ce.first.date}}</li><li>Description: {{technical.ce.first.description}}</li></ul>';
	    var info = Mustache.to_html(template, data);
	    $('#ce-third').html(info);
	});
});