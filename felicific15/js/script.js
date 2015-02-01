$(window).load(function() { $("#spinner").fadeOut("slow"); });

$(function() {
	$('.ce-link, .it-link, .mba-link, .mon-link').click(function() {
		$('.slide').removeClass('slide-cyan').removeClass('slide-purple').removeClass('slide-green').removeClass('slide-brown').addClass('slide-blue');
		$('body').removeClass('body-cyan').removeClass('body-purple').removeClass('body-green').removeClass('body-brown').addClass('body-blue');
	});

	$('.civil-link, .ic-link, .mech-link, .thu-link').click(function() {
		$('.slide').removeClass('slide-cyan').removeClass('slide-blue').removeClass('slide-green').removeClass('slide-brown').addClass('slide-purple');
		$('body').removeClass('body-cyan').removeClass('body-blue').removeClass('body-green').removeClass('body-brown').addClass('body-purple');
	});

	$('.chem-link, .mba-link, .robo-link, .wed-link').click(function() {
		$('.slide').removeClass('slide-cyan').removeClass('slide-purple').removeClass('slide-green').removeClass('slide-blue').addClass('slide-brown');
		$('body').removeClass('body-cyan').removeClass('body-purple').removeClass('body-green').removeClass('body-blue').addClass('body-brown');
	});

	$('.ec-link, .bmca-link, .tue-link, .fri-link').click(function() {
		$('.slide').removeClass('slide-cyan').removeClass('slide-purple').removeClass('slide-blue').removeClass('slide-brown').addClass('slide-green');
		$('body').removeClass('body-cyan').removeClass('body-purple').removeClass('body-blue').removeClass('body-brown').addClass('body-green');
	});

	$('.tech, .cultural').click(function() {
		$('.slide').removeClass('slide-green').removeClass('slide-purple').removeClass('slide-blue').removeClass('slide-brown').addClass('slide-cyan');
		$('body').removeClass('body-green').removeClass('body-purple').removeClass('body-blue').removeClass('body-brown').addClass('body-cyan');
	});


	$.getJSON('js/document.json', function(data) {
		var branch;
		var eventNo;
		var day;

		var template = '<center class="titlecenter"><h2>{{technical.'+branch+'.first.name}}</h2></center><ul><li>Slogan: {{technical.ce.first.slogan}}</li><li>Date: {{technical.ce.first.date}}</li><li>Description: {{technical.ce.first.description}}</li></ul>';
	    var info = Mustache.to_html(template, data);
	    $('#ce-third').html(info);

	    var template2 = '<center><h2 class="titlecenter">{{cultural.monday.first.name}}</h2><table class="cult-event"><tr class="trr"><td>Time</td><td>{{cultural.monday.first.time}}</td> </tr><tr class="trr"><td>Place:</td><td>{{cultural.monday.first.place}}</td></tr><tr class="trr"><td>Fees:</td><td>{{cultural.monday.first.fees}}</td></tr><tr class="trr"><td>Co-ordinators:&nbsp;</td><td>{{cultural.monday.first.co-ordinators.c1}}, {{cultural.monday.first.co-ordinators.p1}}<br>{{cultural.monday.first.co-ordinators.c2}}, {{cultural.monday.first.co-ordinators.p2}}</td></tr></table></center><a class="details" href="#monday"><button class="butt"><< Back</button></a>';
	    var info2 = Mustache.to_html(template2, data);
	    $('#monday-second').html(info2);







	});
});