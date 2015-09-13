var dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var allMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var currentDate = new Date(); 
var dates = [["Fri","Jan",1,2015]];
var calIndex,ci;
var day=5,dat=2,mon=1,year=2015;
var monthCheck=0,count=0,jsonEvents;
var flag=false;
var events=[];

function leapYear(year){
  return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

function addingEvents (jsonEvents) {	
	jsonEvents.forEach(function (e) {
		events.push([[Number(e["startTime"].substring(16,18)),Number(e["startTime"].substring(19,21)),Number(e["startTime"].substring(22,24)),e["startTime"].substring(4,7),Number(e["startTime"].substring(8,10)),Number(e["startTime"].substring(11,15))],[Number(e["endTime"].substring(16,18)),Number(e["endTime"].substring(19,21)),Number(e["endTime"].substring(22,24)),e["endTime"].substring(4,7),Number(e["endTime"].substring(8,10)),Number(e["endTime"].substring(11,15))],e["title"]]);
	})
}

function updateEvents (date,mon,year) {
	$(".vertical").html("");
	flag=false;
	for (index = 0; index < events.length; ++index) {
		if((events[index][0][4]==date && events[index][0][3]==mon && events[index][0][5]==year) || (events[index][1][4]==date && events[index][1][3]==mon && events[index][1][5]==year)){
			flag=true;
			for (var p = 0; p < 2; p++) {     
		        if(events[index][p][0]==0) events[index][p][0]="00";
		        if(events[index][p][1]==0) events[index][p][1]="00";
		        if(events[index][p][2]==0) events[index][p][2]="00";
		    }

			$(".vertical").append('<div class="col s8 m12 l12"><div class="card blue-grey darken-1"><div class="card-content white-text"><span class="card-title"><b>'+events[index][2]+'</b></span><span class="right mono">'+date+' '+mon+', '+year+'</span><p class="mono">'+events[index][0][0]+':'+events[index][0][1]+':'+events[index][0][2]+' to '+events[index][1][0]+':'+events[index][1][1]+':'+events[index][1][2]+'</p></div><div class="card-action right"><a href="#" class="edi" onclick="editEvent('+index+','+date+',\''+mon+'\','+year+');"><i class="material-icons">edit</i></a><a href="#" class="del" onclick="delEvent('+index+','+date+',\''+mon+'\','+year+');"><i class="material-icons">delete</i></a></div></div></div>');
		}
	}
	if(!flag) $(".vertical").append('<h6 class="center nothing">No events to display!</h6>');
}


for (var i = 0; i < 3; i++) {
	while(1){
		dates.push([dayNames[day],monthNames[mon-1],dat,year]);
		if(dat==allMonths[monthCheck]){
			if(mon==12) mon=1
			else if(mon==1){
				if(leapYear(year)) allMonths[1]=29;
				else allMonths[1]=28;
				mon++;
			}
			else mon++;

			if(monthCheck==11){
				monthCheck=0;
				flag=true;	
			} 
			else monthCheck++;
			dat=1;
		}
		else dat++;

		if(day==6) day=0;
		else day++;
		if(flag){
			count=0;
			flag=false;
			year++;
			break;
		} 
		else count++;
	}
}

function goAhead () {
	$(".showtime").text(currentDate.getDate()+" "+monthNames[currentDate.getMonth()].substring(0,3)+", "+currentDate.getFullYear());
	updateEvents(currentDate.getDate(),monthNames[currentDate.getMonth()].substring(0,3),currentDate.getFullYear());
	for (var i = 0; i < dates.length; i++) {
		if(dayNames.indexOf(dates[i][0])==currentDate.getDay()){
			if(dates[i][2]==currentDate.getDate()){
				if(dates[i][1]==monthNames[currentDate.getMonth()]){
					if(dates[i][3]==currentDate.getFullYear()){
						calIndex=i;
						ci=i;
					}
				}
			}
		}
	}
}

function delEvent (index,date,mon,year) {
	if(confirm("Are you sure you want to delete this event?")){
		events.splice(index,1);
		updateEvents(date,mon,year);
	}
}

function editEvent (index,date,mon,year) {
	$('#modal2').openModal();
	$('.title3').val(events[index][2]);
	$('.ddate3').val(events[index][0][4]+' '+events[index][0][3]+', '+events[index][0][5]);
	$('.ddate4').val(events[index][1][4]+' '+events[index][1][3]+', '+events[index][1][5]);
	$('.h3').val(events[index][0][0]);
	$('.m3').val(events[index][0][1]);
	$('.s3').val(events[index][0][2]);
	$('.h4').val(events[index][1][0]);
	$('.m4').val(events[index][1][1]);
	$('.s4').val(events[index][1][2]);
	$('.index').val(index);
}

$(document).ready(function(){
	$.getJSON('sample-data.json', function(data) {         
		jsonEvents=data;
		addingEvents(jsonEvents);
		goAhead();
	});
	$('.modal-trigger').leanModal();
	$('.datepicker').pickadate({
    selectMonths: true, 
    selectYears: 3
  });
});

$(".lt").click(function (e) {
	calIndex--;
	$(".showtime").text(dates[calIndex][2]+" "+dates[calIndex][1]+", "+dates[calIndex][3]);
	updateEvents(dates[calIndex][2],dates[calIndex][1],dates[calIndex][3]);
})

$(".gt").click(function (e) {
	calIndex++;
	$(".showtime").text(dates[calIndex][2]+" "+dates[calIndex][1]+", "+dates[calIndex][3]);
	updateEvents(dates[calIndex][2],dates[calIndex][1],dates[calIndex][3]);	
})

$(document).keydown(function(e) {
    switch(e.which) {
        case 37: calIndex--;
		$(".showtime").text(dates[calIndex][2]+" "+dates[calIndex][1]+", "+dates[calIndex][3]);
		updateEvents(dates[calIndex][2],dates[calIndex][1],dates[calIndex][3]);
        break;

        case 39: calIndex++;
		$(".showtime").text(dates[calIndex][2]+" "+dates[calIndex][1]+", "+dates[calIndex][3]);
		updateEvents(dates[calIndex][2],dates[calIndex][1],dates[calIndex][3]);	
        break;

        default: return; 
    }
    e.preventDefault();
});

$(".today").click(function (e) {
	$(".showtime").text(currentDate.getDate()+" "+monthNames[currentDate.getMonth()].substring(0,3)+", "+currentDate.getFullYear());
	updateEvents(currentDate.getDate(),monthNames[currentDate.getMonth()].substring(0,3),currentDate.getFullYear());
	calIndex=ci;
})

$(".create-button").click(function () {
	if($(".ddate1").val() && $(".ddate2").val() && $(".title1").val() && $(".h1").val() && $(".m1").val() && $(".s1").val() && $(".h2").val() && $(".m2").val() && $(".s2").val() ){

		events.push([[$(".h1").val(),$(".m1").val(),$(".s1").val(),$(".ddate1").val().substring($(".ddate1").val().indexOf(" ")+1,$(".ddate1").val().indexOf(" ")+4),$(".ddate1").val().substring(0,$(".ddate1").val().indexOf(" ")),$(".ddate1").val().substring($(".ddate1").val().indexOf(",")+2,$(".ddate1").val().length)],[$(".h2").val(),$(".m2").val(),$(".s2").val(),$(".ddate2").val().substring($(".ddate2").val().indexOf(" ")+1,$(".ddate2").val().indexOf(" ")+4),$(".ddate2").val().substring(0,$(".ddate2").val().indexOf(" ")),$(".ddate2").val().substring($(".ddate2").val().indexOf(",")+2,$(".ddate2").val().length)],$(".title1").val()]);

		updateEvents($(".ddate1").val().substring(0,$(".ddate1").val().indexOf(" ")),$(".ddate1").val().substring($(".ddate1").val().indexOf(" ")+1,$(".ddate1").val().indexOf(" ")+4),$(".ddate1").val().substring($(".ddate1").val().indexOf(",")+2,$(".ddate1").val().length));
	}	
})

$(".update-button").click(function () {
	if($(".ddate3").val() && $(".ddate4").val() && $(".title3").val() && $(".h3").val() && $(".m3").val() && $(".s3").val() && $(".h4").val() && $(".m4").val() && $(".s4").val() ){

		index = $(".index").val();
		events[index][2]=$(".title3").val();

		events[index][0][3] = $(".ddate3").val().substring($(".ddate3").val().indexOf(" ")+1,$(".ddate3").val().indexOf(" ")+4);
		events[index][0][4] = $(".ddate3").val().substring(0,$(".ddate3").val().indexOf(" "));
		events[index][0][5] = $(".ddate3").val().substring($(".ddate3").val().indexOf(",")+2,$(".ddate3").val().length);
		events[index][1][3] = $(".ddate4").val().substring($(".ddate4").val().indexOf(" ")+1,$(".ddate4").val().indexOf(" ")+4);
		events[index][1][4] = $(".ddate4").val().substring(0,$(".ddate4").val().indexOf(" "));
		events[index][1][5] = $(".ddate4").val().substring($(".ddate4").val().indexOf(",")+2,$(".ddate4").val().length);
		events[index][0][0] = $('.h3').val();
		events[index][0][1] = $('.m3').val();
		events[index][0][2] = $('.s3').val();
		events[index][1][0] = $('.h4').val();
		events[index][1][1] = $('.m4').val();
		events[index][1][2] = $('.s4').val();

		updateEvents($(".ddate3").val().substring(0,$(".ddate3").val().indexOf(" ")),$(".ddate3").val().substring($(".ddate3").val().indexOf(" ")+1,$(".ddate3").val().indexOf(" ")+4),$(".ddate3").val().substring($(".ddate3").val().indexOf(",")+2,$(".ddate3").val().length));
		$('#modal2').closeModal();
	}	
})

