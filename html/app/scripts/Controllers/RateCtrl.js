/*global define */
define(['angular', 'jquery'], function (angular, $) {
    'use strict';

    return function RateCtrl($scope, $rootScope) {


      $scope.rate = 0;
      $scope.isReadonly = false;
      //console.log($rootscope);
      $scope.$watch('rate', function(newValue, oldValue) {
        if(newValue != oldValue){
          console.log('auth_request'); 
          //shardedService.broadcastEvent('auth_request');
          $rootScope.$broadcast('auth_request'/*, [1,2,3]*/);
        }
      });
    };
});