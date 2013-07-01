/*global define */
define(['angular', 'jquery'], function (angular, $) {
    'use strict';

    return function ShareCtrl($scope,  $rootScope, user) {
      $scope.services = [
        {name: "Instagram", checked: false, key: "instagram", auth: false},
        {name: "Facebook", checked: false, key: "facebook", auth: false},
        {name: "Twitter", checked: false, key: "twitter", auth: false}
      ];
      $scope.loggedIn = true;
      $scope.profile = {};

      user.status(function(status){
        if(status.loggedIn){
          $scope.loggedIn = true;
          $scope.profile = status.profile;
          for(var i in $scope.profile.profileList){
          	for(var j in $scope.services){
          		if($scope.profile.profileList[i] == $scope.services[j].key){
          			$scope.services[j].checked = true;
          			$scope.services[j].auth = true;
          			break;
          		}
          	}
          }
        }
      });

      $scope.checkAuth = function(service){
      	if(!service.auth){
      		$rootScope.$broadcast('auth_login', service);
      	}
      }
    };
});