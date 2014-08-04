var moves = 0;

$.fn.extend({ 
	 disableSelection: function() { 
		  this.each(function() { 
			  if (typeof this.onselectstart != 'undefined') {
				   this.onselectstart = function() { return false; };
			  } else if (typeof this.style.MozUserSelect != 'undefined') {
				   this.style.MozUserSelect = 'none';
			  } else {
				  this.onmousedown = function() { return false; };
			  }
		  }); 
	  } 
});

$(document).ready(function() {	
    $("div").find("button").on("click",function(){
		//if(moves==0) Example1.Timer.toggle();
		moves++;
		$(document).find("#moves").html(moves);
		$('div > button:contains("__")').toggleClass(".blacky");
		for(var i=1;i<5;++i){
			if($(".p"+$(this).data("check"+i)).text()=="__"){
				checker_func("check"+i,$(this));
			}
		}
		function checker_func(check,this_){
			var x = this_.text();
			this_.text("__");
			this_.parent().find('.p'+this_.data(check)).text(x);
		}
	});
//----------------------------------key event handling----------------------------------------------------
	$(document).bind('keydown', function(e) { 
		if (e.which == 38 || e.which == 87){
			keyyy(1,2,3,4,-4);
		}
		
		if (e.which == 37 || e.which == 65){
			keyyy(1,5,9,13,-1);
		}
		
		if (e.which == 39 || e.which == 68){
			keyyy(4,8,12,16,1);
		}
		
		if (e.which == 40 || e.which == 83){
			keyyy(13,14,15,16,4);
		}
		
		function keyyy(not1,not2,not3,not4,change){
				//if(moves==0) Example1.Timer.toggle();
				moves++;
				$(document).find("#moves").html(moves);
				var xx = $('div > button:contains("__")').data("val");
				if(xx!=not1 && xx!=not2 && xx!=not3 && xx!=not4){
					var k = xx+change;
					var store = $("div > button[data-val="+k+"]").text();
					$('div > button:contains("__")').text(store);
					$("div > button[data-val='"+k+"']").text("__");
				}
		}
	});
//-----------------------------------------------------------------------------------------------------------
var	shuffle = function(v){
		for(var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
			return v;
	};
	
	$('div').find('.rand').on('click',function(){
		if(confirm('You sure you want to shuffle it?\nAll your progress will be lost !!')){
			moves=0;
			$(document).find("#moves").html(moves);
			shuff_mine($(this));
			Example1.Timer.toggle();
		}
	});
	
	function submitted(this_){
	  	var k = 0;
		for(var i=1;i<16;++i)
			if(this_.parent().find('.p'+i).text()!=i){
				k=2;
				break;
			}
		if(k!=2) return true;
		return false;
	}
	
	$('div').find('.subm').on('click',function(){
		if(submitted($(this))){
			alert('You solved in '+moves+' moves.\nTime taken is '+$('#stopwatch').text()+'.\nCongrats BTW !!');
			moves=0;
			$(document).find("#moves").html(moves);
			shuff_mine($(this));
		}
		else{
			alert('Its OK my friend\nHard Luck This time!! :(');
			moves=0;
			$(document).find("#moves").html(moves);
			shuff_mine($(this));
		}
		Example1.Timer.toggle();
	});
	
	function shuff_mine(this_){
		var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, '__'];
		var shuffled_a = shuffle(a);
		for(var i=1;i<17;++i)
			$(this_).parent().find('.p'+i).text(a[i-1]);
		if(not_solvable(shuffled_a)) shuff_mine(this_);
	}
	
	// not_solvable(this_,a) returns true if not solvable
	function not_solvable(a){
		var less=0;
		for(var i=0;i<15;++i){
			if(a[i]!="__"){
				for(var j=i+1,count=0;j<16;++j){
					if(a[j]=="__" || a[j]>a[i]) continue;
					else if(a[j]<a[i]) count++;
				}
				less+=count;
			}
		}
		for(i=0;i<16;++i){
			if(a[i]=="__"){
				var x = i;
				if((x >= 0 && x < 4) || (x > 7 && x < 12)){
					if(less % 2 == 1) return false;
					return true;
				}
				else{
					if(less % 2 === 0) return false;
					return true;
				}
			}
		}
	}
	
	shuff_mine($(this).children().children());
	
	$("html").bind("contextmenu",function(){
		
       return false;
    }); 
	
	$('html').disableSelection();
});


//------------------------------for timer ---------------------------------------------------

function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {str = '0' + str;}
    return str;
}
function formatTime(time) {
    var min = parseInt(time / 6000),
        sec = parseInt(time / 100) - (min * 60),
        hundredths = pad(time - (sec * 100) - (min * 6000), 2);
    return (min > 0 ? pad(min, 2) : "00") + ":" + pad(sec, 2) + ":" + hundredths;
}

var Example1 = function() {
    var $stopwatch, // Stopwatch element on the page
        incrementTime = 70, // Timer speed in milliseconds
        currentTime = 0, // Current time in hundredths of a second
        updateTimer = function() {
            $stopwatch.html(formatTime(currentTime));
            currentTime += incrementTime / 10;
        },
        init = function() {
            $stopwatch = $('#stopwatch');
            Example1.Timer = $.timer(updateTimer, incrementTime, true);
        };
    this.resetStopwatch = function() {
        currentTime = 0;
        this.Timer.stop().once();
    };
    $(init);
};
/*function pad(e,t){var n=""+e;while(n.length<t){n="0"+n}return n}function formatTime(e){var t=parseInt(e/6e3),n=parseInt(e/100)-t*60,r=pad(e-n*100-t*6e3,2);return(t>0?pad(t,2):"00")+":"+pad(n,2)+":"+r}var moves=0;$.fn.extend({disableSelection:function(){this.each(function(){if(typeof this.onselectstart!="undefined"){this.onselectstart=function(){return false}}else if(typeof this.style.MozUserSelect!="undefined"){this.style.MozUserSelect="none"}else{this.onmousedown=function(){return false}}})}});$(document).ready(function(){function t(e){var t=0;for(var n=1;n<16;++n)if(e.parent().find(".p"+n).text()!=n){t=2;break}if(t!=2)return true;return false}function n(t){var i=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,"__"];var s=e(i);for(var o=1;o<17;++o)$(t).parent().find(".p"+o).text(i[o-1]);if(r(s))n(t)}function r(e){var t=0;for(var n=0;n<15;++n){if(e[n]!="__"){for(var r=n+1,i=0;r<16;++r){if(e[r]=="__"||e[r]>e[n])continue;else if(e[r]<e[n])i++}t+=i}}for(n=0;n<16;++n){if(e[n]=="__"){var s=n;if(s>=0&&s<4||s>7&&s<12){if(t%2==1)return false;return true}else{if(t%2===0)return false;return true}}}}$("div").find("button").on("click",function(){function t(e,t){var n=t.text();t.text("__");t.parent().find(".p"+t.data(e)).text(n)}moves++;$(document).find("#moves").html(moves);$('div > button:contains("__")').toggleClass(".blacky");for(var e=1;e<5;++e){if($(".p"+$(this).data("check"+e)).text()=="__"){t("check"+e,$(this))}}});$(document).bind("keydown",function(e){function t(e,t,n,r,i){moves++;$(document).find("#moves").html(moves);var s=$('div > button:contains("__")').data("val");if(s!=e&&s!=t&&s!=n&&s!=r){var o=s+i;var u=$("div > button[data-val="+o+"]").text();$('div > button:contains("__")').text(u);$("div > button[data-val='"+o+"']").text("__")}}if(e.which==38||e.which==87){t(1,2,3,4,-4)}if(e.which==37||e.which==65){t(1,5,9,13,-1)}if(e.which==39||e.which==68){t(4,8,12,16,1)}if(e.which==40||e.which==83){t(13,14,15,16,4)}});var e=function(e){for(var t,n,r=e.length;r;t=parseInt(Math.random()*r),n=e[--r],e[r]=e[t],e[t]=n);return e};$("div").find(".rand").on("click",function(){if(confirm("You sure you want to shuffle it?\nAll your progress will be lost !!")){moves=0;$(document).find("#moves").html(moves);n($(this));Example1.Timer.toggle()}});$("div").find(".subm").on("click",function(){if(t($(this))){alert("You solved in "+moves+" moves.\nTime taken is "+$("#stopwatch").text()+".\nCongrats BTW !!");moves=0;$(document).find("#moves").html(moves);n($(this))}else{alert("Its OK my friend\nHard Luck This time!! :(");moves=0;$(document).find("#moves").html(moves);n($(this))}Example1.Timer.toggle()});n($(this).children().children());$("html").bind("contextmenu",function(){return false});$("html").disableSelection()});var Example1=function(){var e,t=70,n=0,r=function(){e.html(formatTime(n));n+=t/10},i=function(){e=$("#stopwatch");Example1.Timer=$.timer(r,t,true)};this.resetStopwatch=function(){n=0;this.Timer.stop().once()};$(i)}*/