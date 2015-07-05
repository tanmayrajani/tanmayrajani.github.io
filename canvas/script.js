var f=0,turn=0;
var x;
var y;
var user="";
var check=new Array();
var canvas = document.getElementById("canvas");
for(var i=0;i<9;i++) check[i]=0;

function youLost(){
		alert("You Lost !! xD ");
		var z=confirm("Wanna play again ?? ");
		if(z==0) window.close();
		document.location.reload();	
}
//helper function// Actually draws naughts at passed coordinates.. :)
function naught(ax,ay)
{
	if (canvas.getContext) {
       var ctx = canvas.getContext("2d");
		ctx.beginPath();
      	ctx.arc(37.5+ax,37.5+ay,20, 0, 2 * Math.PI, false);
      	ctx.fillStyle = 'white';
      	ctx.fill();
      	ctx.lineWidth = 7;
      	ctx.stroke();
	}
}
function crossthis(num){
	switch(num){
		case 1:Cross(400,200); 
			   check[1]=2;
			   break;
		case 2:Cross(470,200); 
			   check[2]=2;
			   break;
		case 3:Cross(540,200); 
			   check[3]=2;
			   break;
		case 4:Cross(400,270); 
			   check[4]=2;
			   break;
		case 5:Cross(470,270); 
			   check[5]=2;
			   break;
		case 6:Cross(540,270); 
			   check[6]=2;
			   break;
		case 7:Cross(400,340); 
			   check[7]=2;
			   break;
		case 8:Cross(470,340); 
			   check[8]=2;
			   break;
		case 9:Cross(540,340); 
			   check[9]=2;
			   break;			   
	}
}
function naughtthis(num){
	switch(num){
		case 1:naught(400,200); 
			   check[1]=1;
			   break;
		case 2:naught(470,200); 
			   check[2]=1;
			   break;
		case 3:naught(540,200); 
			   check[3]=1;
			   break;
		case 4:naught(400,270); 
			   check[4]=1;
			   break;
		case 5:naught(470,270); 
			   check[5]=1;
			   break;
		case 6:naught(540,270); 
			   check[6]=1;
			   break;
		case 7:naught(400,340); 
			   check[7]=1;
			   break;
		case 8:naught(470,340); 
			   check[8]=1;
			   break;
		case 9:naught(540,340); 
			   check[9]=1;
			   break;			   
	}
}

function turn1(){
	x=event.clientX;
	y=event.clientY;
	if(!check[1] && (x>410 && x<465 )&&(y>210 && y<265))	{
		naughtthis(1);  
		user+=1;
		turn=2;
		crossthis(9);
	}
	if(!check[2] && (x>480 && x<535 )&&(y>210 && y<265))	{
		naughtthis(2);  
		user+=2;
		turn=2;
		crossthis(9);
	}
	if(!check[3] && (x>550 && x<605 )&&(y>210 && y<265))	{
		naughtthis(3);  
		user+=3;
		turn=2;
		crossthis(9);
	}
	if(!check[4] && (x>410 && x<465 )&&(y>280 && y<335))	{
		naughtthis(4);  
		user+=4;
		turn=2;
		crossthis(9);
	}
	if(!check[5] && (x>480 && x<535 )&&(y>280 && y<335))	{
		naughtthis(5);  	
		user+=5;
		turn=2;
		crossthis(3);
	}
	if(!check[6] && (x>550 && x<605 )&&(y>280 && y<335))	{
		naughtthis(6);  	
		user+=6;
		turn=2;
		crossthis(9);
	}
	// 7 is my default first position... ;)
	if(!check[8] && (x>480 && x<535 )&&(y>350 && y<405))	{
		naughtthis(8);  	
		user+=8;
		crossthis(1);
		turn=2;
	}
	if(!check[9] && (x>550 && x<605 )&&(y>350 && y<405))	{
		naughtthis(9);  	
		user+=9;
		crossthis(1);
		turn=2;
	}	
}
//User's 2nd turn ll be held here.. and Computer's 2nd turn as well !!
function turn2(){	
	x=event.clientX;
	y=event.clientY;
	//Losing condition
	if(!check[1] && (x>410 && x<465 )&&(y>210 && y<265) && (user=="2" || user=="3" || user=="4" || user=="6"))	{
		naughtthis(1);  
		crossthis(8);
		youLost();
		//alert("you clicked at 2 !");
	}
	
	if(!check[1] && (x>410 && x<465 )&&(y>210 && y<265) && user=="5")	{
		naughtthis(1);  
		crossthis(9);
		turn=3;
	}
	//Losing Condition
	if(!check[2] && (x>480 && x<535 )&&(y>210 && y<265) && (user=="1" || user=="3" || user=="4" || user=="6"))	{
		naughtthis(2);  
		crossthis(8);
		youLost();
	}
	//Another Losing Condition
	if(!check[2] && (x>480 && x<535 )&&(y>210 && y<265) && (user=="8" || user=="9"))	{
		naughtthis(2);  
		crossthis(4);
		youLost();
	}
	if(!check[2] && (x>480 && x<535 )&&(y>210 && y<265) && (user=="5"))	{
		naughtthis(2);  
		crossthis(8);
		turn=3;
	}
	//Losing Condition
	if(!check[3] && (x>550 && x<605 )&&(y>210 && y<265) && (user=="1" || user=="2" || user=="4" || user=="6"))	{
		naught(3);  
		crossthis(8);
		youLost();
	}	
	//Another Losing Condition
	if(!check[3] && (x>550 && x<605 )&&(y>210 && y<265) && (user=="8" || user=="9"))	{
		naughtthis(3);  
		crossthis(4);
		youLost();
	}
	//Losing Condition
	if(!check[4] && (x>410 && x<465 )&&(y>280 && y<335) && (user=="1" || user=="2" || user=="3" || user=="6"))	{
		naughtthis(4); 
		crossthis(8);
		youLost();
	}
	
	if(!check[4] && (x>410 && x<465 )&&(y>280 && y<335) && (user=="5"))	{
		naughtthis(4); 
		crossthis(6);
		turn=3;
	}
	if(!check[4] && (x>410 && x<465 )&&(y>280 && y<335) && (user=="8" || user=="9"))	{
		naughtthis(4); 
		crossthis(3);
		turn=3;
	}	
	//Losing Condition
	if(!check[5] && (x>480 && x<535 )&&(y>280 && y<335) && (user=="1" || user=="2" || user=="3" || user=="6" || user=="4"))	{
		naughtthis(5);  	
		crossthis(8);
		youLost();
	}
	
	if(!check[5] && (x>480 && x<535 )&&(y>280 && y<335) && (user=="8" || user=="9"))	{
		naughtthis(5);  	
		crossthis(4);
		youLost();
	}
	//Losing Condition
	if(!check[6] && (x>550 && x<605 )&&(y>280 && y<335) && (user=="1" || user=="2" || user=="3" || user=="4"))	{
		naughtthis(6);  	
		crossthis(8);
		youLost();
	}
	//Another Losing Condition
	if(!check[6] && (x>550 && x<605 )&&(y>280 && y<335) && (user=="8" || user=="9"))	{
		naughtthis(6);  	
		crossthis(4);
		youLost();
	}
	if(!check[6] && (x>550 && x<605 )&&(y>280 && y<335) && user=="5")	{
		naughtthis(6);  	
		crossthis(4);
		turn=3;
	}
	// 7 is my default first position... ;)
	if(!check[8] && (x>480 && x<535 )&&(y>350 && y<405) && user=="4")	{
		naughtthis(8);
		crossthis(3);
		turn=3;
	}
	if(!check[8] && (x>480 && x<535 )&&(y>350 && y<405) && user=="2")	{
		naughtthis(8);
		crossthis(5);
		turn=3;
	}
	if(!check[8] && (x>480 && x<535 )&&(y>350 && y<405) && (user=="1" || user=="4"))	{
		naughtthis(8);
		crossthis(3);
		turn=3;
	}
	if(!check[8] && (x>480 && x<535 )&&(y>350 && y<405) && (user=="3" || user=="6"))	{
		naughtthis(8);  	
		crossthis(1);
		turn=3;
	}
	
	if(!check[8] && (x>480 && x<535 )&&(y>350 && y<405) && user=="5")	{
		naughtthis(8);
		crossthis(2);
		turn=3;
	}
	if(!check[8] && (x>480 && x<535 )&&(y>350 && y<405) && user=="9")	{
		naughtthis(8);  	
		crossthis(4);
		youLost();
	}
	if(!check[9] && (x>550 && x<605 )&&(y>350 && y<405) && user=="5")	{
		naughtthis(9);  	
		crossthis(1);
		turn=3;
	}	
	if(!check[9] && (x>550 && x<605 )&&(y>350 && y<405) && user=="8")	{
		naughtthis(9);  	
		crossthis(4);
		youLost();
	}	
}
function getinfo3(){
	x=event.clientX;
	y=event.clientY;

		if(!check[1] && (x>410 && x<465)&&(y>210 && y<265)) {
				naughtthis(1);
				turn=4; //return turn;
		}
		if(!check[2] && (x>480 && x<535 )&&(y>210 && y<265)) {
				naughtthis(2);
				turn=4; //return turn;
		}
		if(!check[3] && (x>550 && x<605 )&&(y>210 && y<265)) {
				naughtthis(3);
				turn=4; //return turn;
		}
		if(!check[4] && (x>410 && x<465 )&&(y>280 && y<335)) {
				naughtthis(4);
				turn=4; //return turn;
		}
		if(!check[5] && (x>480 && x<535 )&&(y>280 && y<335)) {
				naughtthis(5);
				turn=4; //return turn;
		}
		if(!check[6] && (x>550 && x<605 )&&(y>280 && y<335)) {
				naughtthis(6);
				turn=4; //return turn;
		}
		if(!check[8] && (x>480 && x<535 )&&(y>350 && y<405)) {
				naughtthis(8);
				turn=4; //return turn;
		}
		if(!check[9] && (x>550 && x<605 )&&(y>350 && y<405)) {
				naughtthis(9);
				turn=4;// return turn;
		}
		while(turn!=4) getinfo();
}
function getinfo4(){
	x=event.clientX;
	y=event.clientY;

		if(!check[1] && (x>410 && x<465)&&(y>210 && y<265)) {
				naughtthis(1);
				turn=5; //return turn;
		}
		if(!check[2] && (x>480 && x<535 )&&(y>210 && y<265)) {
				naughtthis(2);
				turn=5; //return turn;
		}
		if(!check[3] && (x>550 && x<605 )&&(y>210 && y<265)) {
				naughtthis(3);
				turn=5; //return turn;
		}
		if(!check[4] && (x>410 && x<465 )&&(y>280 && y<335)) {
				naughtthis(4);
				turn=5; //return turn;
		}
		if(!check[5] && (x>480 && x<535 )&&(y>280 && y<335)) {
				naughtthis(5);
				turn=5; //return turn;
		}
		if(!check[6] && (x>550 && x<605 )&&(y>280 && y<335)) {
				naughtthis(6);
				turn=5; //return turn;
		}
		if(!check[8] && (x>480 && x<535 )&&(y>350 && y<405)) {
				naughtthis(8);
				turn=5; //return turn;
		}
		if(!check[9] && (x>550 && x<605 )&&(y>350 && y<405)) {
				naughtthis(9);
				turn=5;// return turn;
		}
		while(turn!=5) getinfo();
}
function crossChecker(a,b,c){
			var t=0;
			if(check[a]==2 && check[b]==2 && !check[c]) {
				crossthis(c);
				t=2;
			}
			if(t==2) return 1;
			if(check[b]==2 && check[c]==2 && !check[a]) {
				crossthis(a);
				t=2;
			}
			if(t==2) return 1;
			if(check[a]==2 && check[c]==2 && !check[b]){
				crossthis(b);
				t=2;
			}
			if(t==2) return 1;
			else return 0;
}
function naughtChecker(a,b,c){
			var y=0;
			if(check[a]==1 && check[b]==1 && !check[c]) {
				crossthis(c);
				y=2;
			}
			if(y==2) return 1;
			if(check[b]==1 && check[c]==1 && !check[a]) {
				crossthis(a);
				y=2;
			}
			if(y==2) return 1;
			if(check[a]==1 && check[c]==1 && !check[b]){
				crossthis(b);
				y=2;
			}
			if(y==2) return 1;
			else return 0;
}

function turn3(){
	getinfo3();
	var ans=0;
		for(var i=1;i==1;i++){
			if(crossChecker(1,2,3)) break;
			if(crossChecker(4,5,6)) break;
			if(crossChecker(7,8,9)) break;

			if(crossChecker(1,4,7)) break;
			if(crossChecker(2,5,8)) break;
			if(crossChecker(3,6,9)) break;

			if(crossChecker(1,5,9)) break;
			if(crossChecker(3,5,7)) break;			
		}
			if((check[9]==2 && check[3]==2 && check[6]==2) || (check[1]==2 && check[4]==2 && check[7]==2) || (check[8]==2 && check[5]==2 && check[2]==2)
			 || (check[1]==2 && check[2]==2 && check[3]==2) || (check[4]==2 && check[5]==2 && check[6]==2) || (check[7]==2 && check[8]==2 && check[9]==2)
			 || (check[1]==2 && check[9]==2 && check[5]==2) || (check[3]==2 && check[5]==2 && check[7]==2))	youLost();
//----------------------checking that user cannot win---------------------------- :)
		for(var i=1;i==1;i++){
			if(naughtChecker(1,2,3)) break;
			if(naughtChecker(4,5,6)) break;
			if(naughtChecker(7,8,9)) break;

			if(naughtChecker(2,5,8)) break;
			if(naughtChecker(3,6,9)) break;

			if(naughtChecker(1,5,9)) break;
		}
}
function turn4(){
	getinfo4();
	for(var i=1;i==1;++i){
		if(check[1]==2 && check[3]==2 && !check[2]) {
			crossthis(2);
			youLost(); break;				 
		}
		if(check[1]==2 && check[7]==2 && !check[4]) {
			crossthis(4);
			youLost(); break;				 
		}
		if(check[3]==2 && check[9]==2 && !check[6]) {
			crossthis(6);
			youLost(); break;				 
		}
		if(check[7]==2 && check[9]==2 && !check[8]) {
			crossthis(470,340);
			youLost(); break;				 
		}
	
		var po=0;
		for(var i=0;i<9;i++) {	
			if(!check[i]) {
				po=1;
				crossthis(i);
			}
		}
	}
	if(po==1){
		alert("Well played !! Match Drawn !!");
		var z=confirm("Wanna play again ?? ");
		if(z==0) window.close();
		document.location.reload();
	}
}
//The following function drives NaughtDrawing functionality 
//main function that controls everything
function drawNaught()
{
	switch(turn)
	{
		case 1: turn1();
				break;
		case 2: turn2();
				break;
		case 3: turn3();
				break;
		case 4: turn4();
				break;
		default: alert("Don't press anywhere!!");
	}	
}
//This is onload function
function drawBlock(){
	alert("Let's play Tic Tac Toe !! Beat me if you can !!!"); 
	var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
       var ctx = canvas.getContext("2d");
	   //drawing 3x3 platform
		ctx.fillRect(400,200,75,75);//1st column 
	    ctx.clearRect(410,210,55,55);
		ctx.fillRect(400,270,75,75);//4
	    ctx.clearRect(410,280,55,55);
		ctx.fillRect(400,340,75,75);//7
	    ctx.clearRect(410,350,55,55);
		
		ctx.fillRect(470,200,75,75);//2nd Column
	    ctx.clearRect(480,210,55,55);
		ctx.fillRect(470,270,75,75);//5
	    ctx.clearRect(480,280,55,55);
		ctx.fillRect(470,340,75,75);//8
	    ctx.clearRect(480,350,55,55);
		
		ctx.fillRect(540,200,75,75);//3rd Column
	    ctx.clearRect(550,210,55,55);
		ctx.fillRect(540,270,75,75);//6
	    ctx.clearRect(550,280,55,55);
		ctx.fillRect(540,340,75,75);//9
	    ctx.clearRect(550,350,55,55);
		alert("I'll start !!");
		Cross(400,340);
		turn=1;
		check[7]=2;
		alert("It's your turn !! ;)");	
    }	
}
//helper function drawing crosses at passed coordinates
function Cross(ax,ay){
	 if (canvas.getContext) {
       var ctx = canvas.getContext("2d");
		ctx.beginPath();
    	ctx.moveTo(15+ax,15+ay);
    	ctx.lineTo(25+ax,15+ay);
    	ctx.lineTo(60+ax,60+ay);
    	ctx.lineTo(50+ax,60+ay);
    	ctx.fill();
		ctx.stroke();
		
		ctx.beginPath();
    	ctx.moveTo(15+ax,60+ay);
    	ctx.lineTo(25+ax,60+ay);
    	ctx.lineTo(60+ax,15+ay);
    	ctx.lineTo(50+ax,15+ay);
    	ctx.fill();
		ctx.stroke();
	 }
}
function driver(){
	drawBlock();
}          