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
		var branch,actualDay,actualNo;
		var index,len;
		var day=['monday', 'tuesday','wednesday','thursday','friday'];
		var nos=[7,10,11,8,9];
		var eventNo=['first','second','third','fourth','fifth','sixth','seventh','eighth','nineth','tenth','eleventh'];
		var str,template2,info2;
		//var template = '<center class="titlecenter"><h2>{{technical.'+branch+'.first.name}}</h2></center><ul><li>Slogan: {{technical.ce.first.slogan}}</li><li>Date: {{technical.ce.first.date}}</li><li>Description: {{technical.ce.first.description}}</li></ul>';
	    //var info = Mustache.to_html(template, data);
	    //$('#ce-third').html(info);

	    for (index = 0, len = day.length; index < len; ++index) {
		    actualDay = day[index];
		    actualNo = nos[index];
		    for (var i = 1; i <= actualNo; i++) {
		   		template2 = '<center><h2 class="titlecenter">{{cultural.'+actualDay+'.'+eventNo[i-1]+'.name}}</h2><table class="cult-event" cellspacing="15px" cellpadding="5px"><tr class="trr"><td>Time</td><td>{{cultural.'+actualDay+'.'+eventNo[i-1]+'.time}}</td> </tr><tr class="trr"><td>Place:</td><td>{{cultural.'+actualDay+'.'+eventNo[i-1]+'.place}}</td></tr><tr class="trr"><td>Fees:</td><td>{{cultural.'+actualDay+'.'+eventNo[i-1]+'.fees}}</td></tr><tr class="trr"><td>Co-ordinators:&nbsp;</td><td>{{cultural.'+actualDay+'.'+eventNo[i-1]+'.co-ordinators.c1}}, {{cultural.'+actualDay+'.'+eventNo[i-1]+'.co-ordinators.p1}}<br>{{cultural.'+actualDay+'.'+eventNo[i-1]+'.co-ordinators.c2}}, {{cultural.'+actualDay+'.'+eventNo[i-1]+'.co-ordinators.p2}}</td></tr></table></center><a class="details" href="#'+actualDay+'"><button class="butt3"><< Back</button></a>';
	    		info2 = Mustache.to_html(template2, data);
	    		str=actualDay+'-'+eventNo[i-1];
	    		$(str).html(info2);
		   	}
		}
	});
});