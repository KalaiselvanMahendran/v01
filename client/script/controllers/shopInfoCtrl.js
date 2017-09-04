'use strict';

app.controller('shopInfoCtrl', function ($scope, $aside, $http) {

	$scope.user = {};

    var refresh = function() {
        $http.get('/api/users').then(function(response){
            $scope.users = response.data.data;
        });
    }

    refresh();

    $scope.openAside = function (position, actionName) {
        $aside.open({
            templateUrl: 'asideContent.html',
            placement: position,
            size: 'lg',
            backdrop: true,
            controller: function ($scope, $http, $uibModalInstance) {
                $scope.actionMethod = actionName;
                $scope.showMessage = false;

				$scope.days = [
								{day: "Monday", value: 1},
								{day: "Tuesday", value: 2},
								{day: "Wednesday", value: 3},
								{day: "Thursday", value: 4},
								{day: "Friday", value: 5},
								{day: "Saturday", value: 6},
								{day: "Sunday", value: 0}
							];

				$scope.categories = [{name: "Puncture Shop", value: 1}, {name: "Mechanic Shop", value: 2}, {name: "Petrol Bunk", value: 3}]

				$scope.vehicles = [{name: "All", value: 1}, {name: "Car", value: 2}, {name: "Bike", value: 3}, {name: "Lorry", value: 4}, {name: "Bus", value: 5}, {name: "Truck", value: 6}];

                // create
                $scope.ok = function (e) {
                    if($scope.user.confirm_password != $scope.user.password || $scope.user.password != $scope.user.confirm_password) {
                        $scope.showMessage = true;
                        $scope.alertType = 'danger';
                        $scope.message = "password doesn't match";
                    }
                    else {
                        $scope.showMessage = false;
                        $http.post('/api/signup', $scope.user).then(function(response){
                            $scope.showMessage = true;
                            $scope.alertType = 'success';
                            $scope.message = response.data.message;
                            $scope.user = {};
                        });
                        // $uibModalInstance.close();
                        // e.stopPropagation();
                    }
                };

                // cancel
                $scope.cancel = function (e) {
                    $uibModalInstance.dismiss();
                    e.stopPropagation();
                };
            }
        });
    };

	$scope.submit = function() {
		console.log($scope.user);
	}

});
