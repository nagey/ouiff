/*global define */
define(['angular', 'jquery'], function (angular, $) {
    'use strict';

    return function RateCtrl($scope, $rootScope, user) {

      $scope.rate = 0;
      $scope.isReadonly = false;

      $scope.$watch('rate', function(newValue, oldValue) {
        if(newValue != oldValue){
          user.status(function(status){
            if(status.loggedIn){
              $rootScope.$broadcast('share_request'/*, [1,2,3]*/);
            }else{
              $rootScope.$broadcast('auth_request'/*, [1,2,3]*/);
            }
          });
        }
      });
    };
});