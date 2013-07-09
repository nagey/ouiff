/*global define */
define(['angular', 'jquery'], function (angular, $) {
    'use strict';

    return function ProfileCtrl($scope, $location, $routeParams, user) {
        console.log('ProfileCtrl user',user);
        user.status(function(status){
        	
        	if(status.loggedIn){
        		console.log('ProfileCtrl user profile',status.profile);
        		$scope.profile = status.profile
        	}else{
        		$location.path('/login');
        	}
        });
    };
});