'use strict';

angular.module('ecflowApp').controller('CustomerDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'Customer',
        function($scope, $stateParams, $modalInstance, entity, Customer) {

        $scope.customer = entity;
        $scope.load = function(id) {
            Customer.get({id : id}, function(result) {
                $scope.customer = result;
            });
        };

        var onSaveFinished = function (result) {
            $scope.$emit('ecflowApp:customerUpdate', result);
            $modalInstance.close(result);
        };

        $scope.save = function () {
            if ($scope.customer.id != null) {
                Customer.update($scope.customer, onSaveFinished);
            } else {
                Customer.save($scope.customer, onSaveFinished);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);
