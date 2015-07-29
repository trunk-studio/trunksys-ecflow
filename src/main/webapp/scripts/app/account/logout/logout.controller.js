'use strict';

angular.module('ecflowApp')
    .controller('LogoutController', function (Auth) {
        Auth.logout();
    });
