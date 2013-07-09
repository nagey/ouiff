/*global define */
define(['angular', 'jquery'], function (angular, $) {
    'use strict';

    return function UserCtrl($scope, $routeParams, user) {
        console.log('UserCtrl',$routeParams);
    };
});