/*global define */
define(['angular', 'jquery'], function (angular, $) {
    'use strict';

    return function AuthCtrl($scope) {
      console.log('authCtrl');

      $scope.services = [
      	{name: "Instagram", url: "/auth/instagram"},
      	{name: "Facebook", url: "/auth/facebook"},
      	{name: "Twitter", url: "/auth/twitter"}
      ];

      $scope.login = function(service){
      	window.open(service.url, '_blank');
      }
    };
});