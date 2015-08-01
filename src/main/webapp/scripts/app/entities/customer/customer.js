'use strict';

angular.module('ecflowApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('customer', {
                parent: 'entity',
                url: '/customers',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'ecflowApp.customer.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/customer/customers.html',
                        controller: 'CustomerController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('customer');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('customer.detail', {
                parent: 'entity',
                url: '/customer/{id}',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'ecflowApp.customer.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/customer/customer-detail.html',
                        controller: 'CustomerDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('customer');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Customer', function($stateParams, Customer) {
                        return Customer.get({id : $stateParams.id});
                    }]
                }
            })
            .state('customer.new', {
                parent: 'customer',
                url: '/new',
                data: {
                    roles: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/customer/customer-dialog.html',
                        controller: 'CustomerDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {ssn: null, email: null, phone1: null, phone2: null, id: null};
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('customer', null, { reload: true });
                    }, function() {
                        $state.go('customer');
                    })
                }]
            })
            .state('customer.edit', {
                parent: 'customer',
                url: '/{id}/edit',
                data: {
                    roles: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/customer/customer-dialog.html',
                        controller: 'CustomerDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Customer', function(Customer) {
                                return Customer.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('customer', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
