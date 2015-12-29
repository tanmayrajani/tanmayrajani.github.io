var myApp = angular.module('myApp',[]);
myApp.factory('Data',function () {
		return {message: ""}
});

myApp.filter('play',function (Data) {
	return function (text) {
		text = text.substring(text.lastIndexOf("\n")+1);
		var index = text.indexOf(':');
		if(index>-1){
			var first = text.substring(0,index);
			var last = text.substring(index+1);
			$(".showtime").css(first,last);
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
