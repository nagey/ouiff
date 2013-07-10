/*global define */
define(['angular', 'jquery'], function () {
    'use strict';

    var RateCtrl = function ($scope, $location, $rootScope, user, $http) {

      $scope.rate = 0;
      $scope.isReadonly = false;

      $scope.submitRating = function (){

        user.onceLoggedIn(function(){
          var ratingPost = {
            'id': $rootScope.activeVid,
            'review': $scope.message,
            'score': $scope.rate
          };
          $http.post("/rate/"+ratingPost.id, ratingPost).success(function () {

            $rootScope.$broadcast('close_modal');
            console.log('HEY');
          }).error(function () {
          //console.log("error: ", d,s,h,c);
          });
        });

        user.status(function(status){
          if(!status.loggedIn){
            $rootScope.$broadcast('auth_request'/*, [1,2,3]*/);
          }
        });

      };
    };

    RateCtrl.$inject = ["$scope", "$rootScope", "user", "$http"];

    return RateCtrl;
  });