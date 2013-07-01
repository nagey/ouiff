/*global define */
define(['angular', 'jquery'], function (angular, $) {
    'use strict';

    return function RateCtrl($scope, $rootScope, user) {

      $scope.rate = 0;
      $scope.isReadonly = false;

      $scope.$on('open_modal', function(event, data) {
        console.log('RateCtrl| e:'+event,data);
        $scope.vid = data.vid;
      });

      $scope.$watch('rate', function(newValue, oldValue) {
        if(newValue != oldValue){
          user.status(function(status){
            if(status.loggedIn){
              var ratingPost = {
                'id': $rootScope.activeVid,
                'profile':status.profile,
                'message': $scope.message,
                'rate': $scope.rate
              }
              console.log('RATE OBJ',ratingPost);
            }else{
              $rootScope.$broadcast('auth_request'/*, [1,2,3]*/);
            }
          });
        }
      });
    };
});