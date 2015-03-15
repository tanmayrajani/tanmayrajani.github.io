$(document).ready(function() {
	var url = window.location.href;
	var but = url.split('/');
	if(but[but.length - 2] == 'answer' || but[but.length - 2] == 'answers'){

		var main_div = document.getElementsByClassName('Answer ActionBar');
		var download_button = document.createElement('div');
		download_button.setAttribute("class", "action_item");
		var db = document.createElement('a');
		db.setAttribute("id", "download");
		db.style.color = "rgb(153,153,153)";
		db.href = "#";
		db.innerHTML = "Download";
		download_button.appendChild(db);
		main_div[0].appendChild(download_button);

		db.onclick = function(e){
			var q = document.getElementsByClassName("_ShareSection")[0];
			if(q!=null){
				q.innerHTML="Quora\nAnswers";
				q.setAttribute("class","qlogo");
			} else{
				var q = document.getElementsByClassName("qlogo")[0];
				q.innerHTML="Quora\nAnswers";
			}
		  	window.print();
		  	if(q!=null) q.innerHTML="";
		}
	}
	else if(but[but.length - 2] == 'Posts' || (but[2]!='www.quora.com' && but[3]!='')){
		var main_div = document.getElementsByClassName('ActionBar Post');
		var download_button = document.createElement('div');
		download_button.setAttribute("class", "action_item");
		var db = document.createElement('a');
		db.setAttribute("id", "download");
		db.style.color = "rgb(153,153,153)";
		db.href = "#";
		db.innerHTML = "Download";
		download_button.appendChild(db);
		main_div[0].appendChild(download_button);

		db.onclick = function(e){
			var q = document.getElementsByClassName("_ShareSection")[0];
			if(q!=null){
				q.innerHTML="Quora\nAnswers";
				q.setAttribute("class","qlogo");
			} else{
				var q = document.getElementsByClassName("qlogo")[0];
				q.innerHTML="Quora\nAnswers";
			}
		  	window.print();
		  	if(q!=null) q.innerHTML="";
		}
	}
});