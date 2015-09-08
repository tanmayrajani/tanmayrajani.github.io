var myApp = angular.module('myApp',[]);
myApp.factory('Data',function () {
		return {message: ""}
});

myApp.filter('play',function (Data) {
	return function (text) {
		text = text.substring(text.lastIndexOf("\n")+1);
		//console.log(text);
		var index = text.indexOf(':');
		if(index>-1){
			var first = text.substring(0,index);
			var last = text.substring(index+1);
			//console.log(first+" : "+last);
			$(".showtime").css(first,last);
			// if(text.substring(text.length-1)==';'){
			//  	$(".ohyes").val($(".ohyes").val()+"\n");
			// } 
		}
		return text;
	}
})

function FirstCtrl($scope,Data){
	$scope.data = Data;
}

function SecondCtrl($scope,Data){
	$scope.data = Data;
}
