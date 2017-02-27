var app = angular.module('healthMapApp', []);

app.controller('healthMapCtrl', function($scope, $http, $compile, $window) {
	
	
	/* Start get tweets*/
	/*$scope.loadTweets = function() {

		$http({
			method : "GET",
			url : '/getTweets',			
		}).success(function(data) {
			
			if (data.statusCode === 200) {
				
			}
			else {
				
			}
				
		}).error(function(error) {
			
		});*/

		var twts = [];
		var socket = io.connect();
		socket.on('tweets', function(data){
			/*for( i=0; i<data.length; i++){
				console.log("Inside socket event: " + data[i].text);
				twts.push(data[i].text)
			}*/
			
			$scope.displayTweets =data[0];
			console.log($scope.displayTweets);
		});
		
	//}; /* End get tweets*/
	
});/* End controller*/
