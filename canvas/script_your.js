var f=0,turn=0;
var x,y;
var user="";
var check=new Array();
for(var i=0;i<9;i++) check[i]=0;
var canvas = document.getElementById("canvas");
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
		alert("You start !!");
		turn1();
		turn=1;
    }	
}

function youLost(){
		alert("You Lost !! xD ");
		var z=confirm("Wanna play again ?? ");
		if(z==0) window.close();
		document.location.reload();	
}
//helper function// Actually draws naughts at passed coordinates.. :)
function naught(ax,ay){
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
		crossthis(5);
	}
	if(!check[2] && (x>480 && x<535 )&&(y>210 && y<265))	{
		naughtthis(2);  
		user+=2;
		turn=2;
		crossthis(1);
	}
	if(!check[3] && (x>550 && x<605 )&&(y>210 && y<265))	{
		naughtthis(3);  
		user+=3;
		turn=2;
		crossthis(5);
	}
	if(!check[4] && (x>410 && x<465 )&&(y>280 && y<335))	{
		naughtthis(4);  
		user+=4;
		turn=2;
		crossthis(1);
	}
	if(!check[5] && (x>480 && x<535 )&&(y>280 && y<335))	{
		naughtthis(5);  	
		user+=5;
		turn=2;
		crossthis(1);
	}
	if(!check[6] && (x>550 && x<605 )&&(y>280 && y<335))	{
		naughtthis(6);  	
		user+=6;
		turn=2;
		crossthis(9);
	}
	if(!check[7] && (x>410 && x<465 )&&(y>350 && y<405))	{
		naughtthis(7);  	
		user+=7;
		turn=2;
		crossthis(5);
	}
	if(!check[8] && (x>480 && x<535 )&&(y>350 && y<405))	{
		naughtthis(8);  	
		user+=8;
		turn=2;
		crossthis(9);
	}
	if(!check[9] && (x>550 && x<605 )&&(y>350 && y<405))	{
		naughtthis(9);  	
		user+=9;
		turn=2;
		crossthis(5);
	}	
}

function naughterT3(x){
	naughtthis(x);  
	turn=3;
	user+=x;
}

function turn2(){	
	x=event.clientX;
	y=event.clientY;
	if(!check[1] && (x>410 && x<465 )&&(y>210 && y<265)){
		switch(user){
			case "3":naughterT3(1);
					crossthis(2);
					break;
			case "6":naughterT3(1);
					crossthis(7);
					break;
			case "9":
			case "7":
					naughterT3(1);
					crossthis(4);
					break;
			case "8":naughterT3(1);
					crossthis(3);
					break;
		}
	}
	
	if(!check[2] && (x>480 && x<535 )&&(y>210 && y<265)){
		switch(user){
			case "9":
			case "1":
					naughterT3(2);
					crossthis(3);
					break;
			case "7":
			case "3":
					naughterT3(2);
					crossthis(1);
					break;
			case "8":
			case "6":
			case "4":
					naughterT3(2);
					crossthis(5);
					break;
			case "5":naughterT3(2);
					crossthis(8);
					break;
		}
	}

	if(!check[3] && (x>550 && x<605 )&&(y>210 && y<265)){
		switch(user){
			case "1":
			case "7":
					naughterT3(3);
					crossthis(2);		
					break;
			case "2":naughterT3(3);
					crossthis(7);
					break;
			case "4":
			case "8":
					naughterT3(3);
					crossthis(5);
					break;
			case "5":
			case "6":
					naughterT3(3);
					crossthis(7);
					break;
			case "9":
					naughterT3(3);
					crossthis(6);
					break;
		}
	}	
	
	if(!check[4] && (x>410 && x<465 )&&(y>280 && y<335)){
		switch(user){
			case "1":naughterT3(4); 
					crossthis(7);
					break;
			case "2":
			case "6":
			case "8":
					naughterT3(4); 
					crossthis(5);
					break;
			case "3":
			case "7":
					naughterT3(4); 
					crossthis(1);
					break;
			case "5":
					naughterT3(4); 
					crossthis(6);
					break;
			case "9":
					naughterT3(4); 
					crossthis(3);
					break;
		}
	}

	if(!check[5] && (x>480 && x<535 )&&(y>280 && y<335)){
		switch(user){
			case "2":naughterT3(5);
					crossthis(8);
					break;
			case "4":naughterT3(5); 
					crossthis(6);
					break;	
			case "6":naughterT3(5); 
					crossthis(4);
					break;	
			case "8":naughterT3(5); 
					crossthis(2);
					break;	
		}
	}
	
	if(!check[6] && (x>550 && x<605 )&&(y>280 && y<335)){
		switch(user){
			case "1":
			case "9":naughterT3(6); 
					crossthis(3);
					break;	
			case "2":
			case "4":
			case "8":naughterT3(6); 
					crossthis(5);
					break;	
			case "3":
			case "7":naughterT3(6); 
					crossthis(9);
					break;	
			case "5":naughterT3(6); 
					crossthis(4);
					break;	

		}
	}
	
	if(!check[7] && (x>410 && x<465 )&&(y>350 && y<405)){
		switch(user){
			case "3":
			case "1":naughterT3(7); 
					crossthis(4);
					break;	
			case "2":
			case "6":naughterT3(7); 
					crossthis(5);
					break;	
			case "4":
			case "5":
			case "8":naughterT3(7); 
					crossthis(3);
					break;	
			case "9":naughterT3(7); 
					crossthis(8);
					break;	
		}
	}
	
	if(!check[8] && (x>480 && x<535 )&&(y>350 && y<405)){
		switch(user){
			case "1":
			case "9":naughterT3(8); 
					crossthis(7);
					break;	
			case "2":
			case "4":
			case "6":naughterT3(8); 
					crossthis(5);
					break;	
			case "3":
			case "7":naughterT3(8); 
					crossthis(9);
					break;	
			case "5":naughterT3(8); 
					crossthis(2);
					break;	
		}
	}
	
	if(!check[9] && (x>550 && x<605 )&&(y>350 && y<405)){
		switch(user){
			case "1":
			case "3":naughterT3(9); 
					crossthis(6);
					break;
			case "4":naughterT3(9); 
					crossthis(7);
					break;
			case "2":	
			case "5":naughterT3(9); 
					crossthis(3);
					break;	
			case "7":naughterT3(9); 
					crossthis(8);
					break;	
		}
	}	
}

function getinfo(i){
	x=event.clientX;
	y=event.clientY;
		if(!check[1] && (x>410 && x<465)&&(y>210 && y<265)) {
				naughtthis(1);
				turn=i+1; //return turn;
		}
		if(!check[2] && (x>480 && x<535 )&&(y>210 && y<265)) {
				naughtthis(2);
				turn=i+1; //return turn;
		}
		if(!check[3] && (x>550 && x<605 )&&(y>210 && y<265)) {
				naughtthis(3);
				turn=i+1; //return turn;
		}
		if(!check[4] && (x>410 && x<465 )&&(y>280 && y<335)) {
				naughtthis(4);
				turn=i+1; //return turn;
		}
		if(!check[5] && (x>480 && x<535 )&&(y>280 && y<335)) {
				naughtthis(5);
				turn=i+1; //return turn;
		}
		if(!check[6] && (x>550 && x<605 )&&(y>280 && y<335)) {
				naughtthis(6);
				turn=i+1; //return turn;
		}
		if(!check[7] && (x>410 && x<465 )&&(y>350 && y<405)) {
				naughtthis(7);
				turn=i+1; //return turn;
		}
		if(!check[8] && (x>480 && x<535 )&&(y>350 && y<405)) {
				naughtthis(8);
				turn=i+1; //return turn;
		}
		if(!check[9] && (x>550 && x<605 )&&(y>350 && y<405)) {
				naughtthis(9);
				turn=i+1;// return turn;
		}
		while(turn!=(i+1)) getinfo(i);
}

var t=0;
function crossChecker(a,b,c){
		
			if(check[a]==2 && check[b]==2 && !check[c]) {
				crossthis(c);
				t=2;
				if(turn==5) t++;
				return 1;
			}
			if(check[b]==2 && check[c]==2 && !check[a]) {
				crossthis(a);
				t=2;
				if(turn==5) t++;
				return 1;
			}
			if(check[a]==2 && check[c]==2 && !check[b]){
				crossthis(b);
				t=2;
				if(turn==5) t++;
				return 1;
			}
			
			return 0;
}
var yy=0;
function naughtChecker(a,b,c){
			
			if(check[a]==1 && check[b]==1 && !check[c]) {
				crossthis(c);
				yy=2;
				if(turn==5) yy++;
				return 1;
			}
			if(check[b]==1 && check[c]==1 && !check[a]) {
				crossthis(a);
				yy=2;
				if(turn==5) yy++;
				return 1;
			}
			if(check[a]==1 && check[c]==1 && !check[b]){
				crossthis(b);
				yy=2;
				if(turn==5) yy++;
				return 1;
			}
			
			return 0;
}

function common(){
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
			 || (check[1]==2 && check[9]==2 && check[5]==2) || (check[3]==2 && check[5]==2 && check[7]==2)){	youLost(); ans=3;} 
//----------------------checking that user cannot win---------------------------- :)
	if(ans!=3)for(var i=1;i==1;i++){
				if(naughtChecker(1,2,3)) break;
				if(naughtChecker(4,5,6)) break;
				if(naughtChecker(7,8,9)) break;

				if(naughtChecker(1,4,7)) break;
				if(naughtChecker(2,5,8)) break;
				if(naughtChecker(3,6,9)) break;
	
				if(naughtChecker(1,5,9)) break;
				if(naughtChecker(3,5,7)) break;
			  }
}
var k=0;
function turn3(){
	getinfo(3);
	var ans=0;
	common();	
	if(t!=2 && yy!=2){
		for(var i=1;i<8;i++){
			if(check[i]==0) {
				crossthis(i);
				break;
			}
		}
	}
}

function turn4(){
	getinfo(4);
	var ans=0;
	common();	
	if(t!=3 && yy!=3){
		for(var i=1;i<8;i++){
			if(check[i]==0) {
				crossthis(i);
				break;
			}
		}
	}
}

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
		case 5: getinfo(5);
				alert("Well played !! Match drawn !!");
				var z=confirm("Wanna play again ?? ");
				if(z==0) window.close();
				document.location.reload();	
				break;
		default: alert("Don't press anywhere!!");
	}
}