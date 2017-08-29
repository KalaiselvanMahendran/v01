'use strict';

app.controller('categoryCtrl', function ($scope) {

	$scope.category = {};

	$scope.submit = function() {
		console.log($scope.category);
	}

});
