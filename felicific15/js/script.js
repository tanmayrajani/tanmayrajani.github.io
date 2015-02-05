$(window).load(function() { $("#spinner").fadeOut("slow"); });

$(function() {
	$('.letsgo').click(function() {
		$('.menu').css('visibility','visible');
		$('.menu1').css('visibility','visible');
	});

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
		var index,len;
		var day=['monday', 'tuesday','wednesday','thursday','friday'];
		var branch=['ce', 'ec','ic','it','civil','mech','chem','mba','bmca','robotics','robo2'];
		var nos=[7,10,11,8,9];
		var nos2=[7,10,11,8,9,7,7,7,7,1,1];
		var eventNo=['first','second','third','fourth','fifth','sixth','seventh','eighth','ninth','tenth','eleventh'];
		var str,str2,template2,template,info2,info,template3,info3;

		for (index = 0, len = branch.length; index < len; ++index) {
			for (var i = 1; i <= nos2[index]; i++) {
				template = '<center class="titlecenter"><h2>{{technical.'+branch[index]+'.'+eventNo[i-1]+'.name}}</h2></center><center><b class="slogan">{{technical.'+branch[index]+'.'+eventNo[i-1]+'.slogan}}</b></center><table class="event-table"><tr class="trr"><td>Description:&nbsp;</td><td>{{technical.'+branch[index]+'.'+eventNo[i-1]+'.description}}</td> </tr><tr class="trr"><td>Team size:</td><td>{{technical.'+branch[index]+'.'+eventNo[i-1]+'.teamsize}}</td></tr><tr class="trr"><td>Fees:</td><td>{{technical.'+branch[index]+'.'+eventNo[i-1]+'.fees}}</td></tr><tr class="trr"><td>Date-Time:&nbsp;</td><td>{{technical.'+branch[index]+'.'+eventNo[i-1]+'.date}}</td></tr><tr class="trr"><td>Contact:</td><td>{{technical.'+branch[index]+'.'+eventNo[i-1]+'.co-ordinator}}, {{technical.'+branch[index]+'.'+eventNo[i-1]+'.contact}}</td></tr></table><a class="details" href="#'+branch[index]+'"><button class="butt1">Events Home</button></a><a class="details" href="#'+branch[index]+'-'+eventNo[i-1]+'2"><button class="butt">Details</button></a>';
				template3 = '<center class="titlecenter"><h2>{{technical.'+branch[index]+'.'+eventNo[i-1]+'.name}}</h2></center><table class="event-table"><tr class="trr"><td>Details:&nbsp;</td><td class="det">{{technical.'+branch[index]+'.'+eventNo[i-1]+'.details}}</td> </tr><tr class="trr"><td>Rules:</td><td class="rul">{{technical.'+branch[index]+'.'+eventNo[i-1]+'.rules}}</td></tr></table><a class="details" href="#'+branch[index]+'-'+eventNo[i-1]+'"><button class="butt"><< Back</button></a>';
				info = Mustache.to_html(template, data);
				info3 = Mustache.to_html(template3, data);
				str='#'+branch[index]+'-'+eventNo[i-1];
				str2=str+'2';
				$(str).html(info);
				$(str2).html(info3);
			}
		}

	    for (index = 0, len = day.length; index < len; ++index) {
		    for (var i = 1; i <= nos[index]; i++) {
		   		template2 = '<center><h2 class="titlecenter">{{cultural.'+day[index]+'.'+eventNo[i-1]+'.name}}</h2><table class="cult-event" cellspacing="15px" cellpadding="5px"><tr class="trr"><td>Time</td><td>{{cultural.'+day[index]+'.'+eventNo[i-1]+'.time}}</td> </tr><tr class="trr"><td>Place:</td><td>{{cultural.'+day[index]+'.'+eventNo[i-1]+'.place}}</td></tr><tr class="trr"><td>Fees:</td><td>{{cultural.'+day[index]+'.'+eventNo[i-1]+'.fees}}</td></tr><tr class="trr"><td>Co-ordinators:&nbsp;</td><td>{{cultural.'+day[index]+'.'+eventNo[i-1]+'.co-ordinators.c1}}, {{cultural.'+day[index]+'.'+eventNo[i-1]+'.co-ordinators.p1}}<br>{{cultural.'+day[index]+'.'+eventNo[i-1]+'.co-ordinators.c2}}, {{cultural.'+day[index]+'.'+eventNo[i-1]+'.co-ordinators.p2}}</td></tr></table></center><a class="details" href="#'+day[index]+'"><button class="butt3"><< Back</button></a>';
	    		info2 = Mustache.to_html(template2, data);
	    		str='#'+day[index]+'-'+eventNo[i-1];
	    		$(str).html(info2);
		   	}
		}
	});
});
