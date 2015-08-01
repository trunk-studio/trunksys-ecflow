'use strict';

angular.module('ecflowApp')
    .controller('CustomerDetailController', function ($scope, $rootScope, $stateParams, entity, Customer) {
        $scope.customer = entity;
        $scope.load = function (id) {
            Customer.get({id: id}, function(result) {
                $scope.customer = result;
            });
        };
        $rootScope.$on('ecflowApp:customerUpdate', function(event, result) {
            $scope.customer = result;
        });
    });
