'use strict';

angular.module('ecflowApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


