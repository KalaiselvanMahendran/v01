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
