/*global define */
define(['angular', 'jquery'], function (angular, $) {
    'use strict';

    return function ShareCtrl($scope, user) {
      $scope.services = [
        {name: "Instagram", checked: false},
        {name: "Facebook", checked: false},
        {name: "Twitter", checked: false}
      ];
    };
});