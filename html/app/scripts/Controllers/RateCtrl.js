/*global define */
define(['angular', 'jquery'], function () {
    'use strict';

    return function RateCtrl($scope, $rootScope, user, $http) {

      $scope.rate = 0;
      $scope.isReadonly = false;

      $scope.submitRating = function (){
        user.status(function(status){
          if(status.loggedIn){
            var ratingPost = {
              'id': $rootScope.activeVid,
              'review': $scope.message,
              'score': $scope.rate
            };
            $http.post("/rate/"+ratingPost.id, ratingPost).success(function () {
              $rootScope.$broadcast('close_modal');
            }).error(function () {
              //console.log("error: ", d,s,h,c);
            });

          }else{
            $rootScope.$broadcast('auth_request'/*, [1,2,3]*/);
          }
        });
      };
    };
});