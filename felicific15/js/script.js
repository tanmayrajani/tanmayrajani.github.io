$(window).load(function(){
	$("#spinner").fadeOut("slow");
	$("a.roll-link").click(function(){
		var xxx = Math.random()*100;
		if(xxx <25){
			$(".slide").removeClass("slide-cyan").removeClass("slide-purple").removeClass("slide-green").removeClass("slide-brown").addClass("slide-blue");
			$("body").removeClass("body-cyan").removeClass("body-purple").removeClass("body-green").removeClass("body-brown").addClass("body-blue");	
		}
		else if(xxx<50){
			$(".slide").removeClass("slide-cyan").removeClass("slide-blue").removeClass("slide-green").removeClass("slide-brown").addClass("slide-purple");
			$("body").removeClass("body-cyan").removeClass("body-blue").removeClass("body-green").removeClass("body-brown").addClass("body-purple");
		}
		else if(xxx<75){
			$(".slide").removeClass("slide-cyan").removeClass("slide-purple").removeClass("slide-green").removeClass("slide-blue").addClass("slide-brown");
			$("body").removeClass("body-cyan").removeClass("body-purple").removeClass("body-green").removeClass("body-blue").addClass("body-brown");
		}
		else{
			$(".slide").removeClass("slide-cyan").removeClass("slide-purple").removeClass("slide-blue").removeClass("slide-brown").addClass("slide-green");
			$("body").removeClass("body-cyan").removeClass("body-purple").removeClass("body-blue").removeClass("body-brown").addClass("body-green");
		}
	});
	$.getJSON("js/technical.json",function(e){var t,s,l,a,r,n,c,d,o,t=["ce","ec","ic","it","civil","mech","chem","mba","bmca","robotics","robo2"],i=[7,10,11,8,9,7,7,7,7,1,1],b=["first","second","third","fourth","fifth","sixth","seventh","eighth","ninth","tenth","eleventh"];for(s=0,l=t.length;l>s;++s)for(var u=1;u<=i[s];u++)n='<center class="titlecenter"><h2>{{{technical.'+t[s]+"."+b[u-1]+'.name}}}</h2></center><center><b class="slogan">{{{technical.'+t[s]+"."+b[u-1]+'.tagline}}}</b></center><table class="event-table"><tr class="trr"><td>Description:&nbsp;</td><td>{{{technical.'+t[s]+"."+b[u-1]+'.description}}}</td> </tr><tr class="trr"><td>Team size:</td><td>{{{technical.'+t[s]+"."+b[u-1]+'.team}}}</td></tr><tr class="trr"><td>Fees:</td><td>{{{technical.'+t[s]+"."+b[u-1]+'.fees}}}</td></tr><tr class="trr"><td>Date-Time:&nbsp;</td><td>{{{technical.'+t[s]+"."+b[u-1]+'.time}}}</td></tr><tr class="trr"><td>Contact:</td><td>{{{technical.'+t[s]+"."+b[u-1]+".contactperson}}}, {{{technical."+t[s]+"."+b[u-1]+'.contactnumber}}}</td></tr></table><a class="details" href="#'+t[s]+'"><button class="butt1">Events Home</button></a><a class="details" href="#'+t[s]+"-"+b[u-1]+'2"><button class="butt">Details</button></a>',d='<center class="titlecenter"><h2>{{{technical.'+t[s]+"."+b[u-1]+'.name}}}</h2></center><table class="event-table"><tr class="trr"><td>Details:&nbsp;</td><td class="det">{{{technical.'+t[s]+"."+b[u-1]+'.round}}}</td> </tr><tr class="trr"><td>Rules:</td><td class="rul">{{{technical.'+t[s]+"."+b[u-1]+'.rules}}}</td></tr></table><a class="details" href="#'+t[s]+"-"+b[u-1]+'"><button class="butt"><< Back</button></a>',c=Mustache.to_html(n,e),o=Mustache.to_html(d,e),a="#"+t[s]+"-"+b[u-1],r=a+"2",$(a).html(c),$(r).html(o)}),$.getJSON("js/document.json",function(e){var t,s,l,a,r,n=["monday","tuesday","wednesday","thursday","friday"],c=[7,10,11,8,9],d=["first","second","third","fourth","fifth","sixth","seventh","eighth","ninth","tenth","eleventh"];for(t=0,s=n.length;s>t;++t)for(var o=1;o<=c[t];o++)a='<center><h2 class="titlecenter">{{{cultural.'+n[t]+"."+d[o-1]+'.name}}}</h2><table class="cult-event" cellspacing="15px" cellpadding="5px"><tr class="trr"><td>Time</td><td>{{{cultural.'+n[t]+"."+d[o-1]+'.time}}}</td> </tr><tr class="trr"><td>Place:</td><td>{{{cultural.'+n[t]+"."+d[o-1]+'.place}}}</td></tr><tr class="trr"><td>Fees:</td><td>{{{cultural.'+n[t]+"."+d[o-1]+'.fees}}}</td></tr><tr class="trr"><td>Co-ordinators:&nbsp;</td><td>{{{cultural.'+n[t]+"."+d[o-1]+".co-ordinators.c1}}}, {{{cultural."+n[t]+"."+d[o-1]+".co-ordinators.p1}}}<br>{{{cultural."+n[t]+"."+d[o-1]+".co-ordinators.c2}}}, {{{cultural."+n[t]+"."+d[o-1]+'.co-ordinators.p2}}}</td></tr></table></center><a class="details" href="#'+n[t]+'"><button class="butt3"><< Back</button></a>',r=Mustache.to_html(a,e),l="#"+n[t]+"-"+d[o-1],$(l).html(r)})
});
