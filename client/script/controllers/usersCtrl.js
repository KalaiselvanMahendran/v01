'use strict';

app.controller('usersCtrl', function ($scope, $aside) {

	$scope.user = {};

    $scope.openAside = function (position, actionName) {
        $aside.open({
            templateUrl: 'asideContent.html',
            placement: position,
            size: 'md',
            backdrop: true,
            controller: function ($scope, $uibModalInstance) {
                $scope.actionMethod = actionName;
                $scope.ok = function (e) {
                    $uibModalInstance.close();
                    e.stopPropagation();
                };
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
