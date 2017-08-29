'use strict';

app.controller('categoryCtrl', function ($scope, $http) {

	$scope.category = {};

	var refresh = function(){
		$http.get('/api/category').then(function(response){
			$scope.categories = response.data.data;
			console.log($scope.categories);
		});
	}

	refresh();

	$scope.submit = function() {
		$http.post('/api/category', $scope.category).then(function(response){
			refresh();
		});
	}

	$scope.update = function(categoryId) {
		$http.get('/api/category/' + categoryId).then(function(response){
			$scope.category = response.data.data;
			console.log($scope.category);
		})
	}

});
