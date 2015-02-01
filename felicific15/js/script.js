$(window).load(function() { $("#spinner").fadeOut("slow"); });

$(function() {
	$('.ce-link, .it-link, .mba-link').click(function() {
		$('.slide').removeClass('slide-cyan').removeClass('slide-purple').removeClass('slide-green').removeClass('slide-brown').addClass('slide-blue');
		$('body').removeClass('body-cyan').removeClass('body-purple').removeClass('body-green').removeClass('body-brown').addClass('body-blue');
	});

	$('.civil-link, .ic-link, .mech-link').click(function() {
		$('.slide').removeClass('slide-cyan').removeClass('slide-blue').removeClass('slide-green').removeClass('slide-brown').addClass('slide-purple');
		$('body').removeClass('body-cyan').removeClass('body-blue').removeClass('body-green').removeClass('body-brown').addClass('body-purple');
	});

	$('.chem-link, .mba-link, .robo-link').click(function() {
		$('.slide').removeClass('slide-cyan').removeClass('slide-purple').removeClass('slide-green').removeClass('slide-blue').addClass('slide-brown');
		$('body').removeClass('body-cyan').removeClass('body-purple').removeClass('body-green').removeClass('body-blue').addClass('body-brown');
	});

	$('.ec-link, .bmca-link').click(function() {
		$('.slide').removeClass('slide-cyan').removeClass('slide-purple').removeClass('slide-blue').removeClass('slide-brown').addClass('slide-green');
		$('body').removeClass('body-cyan').removeClass('body-purple').removeClass('body-blue').removeClass('body-brown').addClass('body-green');
	});


	$.getJSON('js/document.json', function(data) {
		var branch;
		var eventNo;

		var template = '<center class="titlecenter"><h2>{{technical.ce.first.name}}</h2></center><ul><li>Slogan: {{technical.ce.first.slogan}}</li><li>Date: {{technical.ce.first.date}}</li><li>Description: {{technical.ce.first.description}}</li></ul>';
	    var info = Mustache.to_html(template, data);
	    $('#ce-third').html(info);
	});
});