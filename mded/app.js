var myApp = angular.module('myApp',[]);
myApp.factory('Data',function () {
    return {message: ""}
});

myApp.filter('play',function (Data) {
    return function (text) {

        var $http = angular.injector(["ng"]).get("$http");
        $http.post('http://api.github.com/markdown/raw', text , {headers:{'Content-Type':'text/plain'}}).then(function(res){
            Data.dddd = res.data;
            console.log(Data.dddd);
            //return Data.dddd;
        });
        return Data.dddd;
    }
})

function FirstCtrl($scope,Data){
    $scope.data = Data;
}

function SecondCtrl($scope,Data){
    $scope.data = Data;
}

myApp.directive('bindHtmlUnsafe', function( $compile ) {
    return function( $scope, $element, $attrs ) {

        var compile = function( newHTML ) { // Create re-useable compile function
            newHTML = $compile(newHTML)($scope); // Compile html
            $element.html('').append(newHTML); // Clear and append it
        };

        var htmlName = $attrs.bindHtmlUnsafe; // Get the name of the variable
                                              // Where the HTML is stored

        $scope.$watch(htmlName, function( newHTML ) { // Watch for changes to
            // the HTML
            if(!newHTML) return;
            compile(newHTML);   // Compile it
        });

    };
});