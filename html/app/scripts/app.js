/*global define */
define([
	'jquery',
	'bootstrap', 
    'angular',
    'angular-modal',
    'Controllers/VideoListCtrl',
    'Controllers/RateCtrl',
    'Controllers/AuthCtrl',
    'Controllers/VideoCtrl',
  	'Controllers/UserCtrl',
    'Services/Media',
    'Services/User',
    'Controllers/LightboxCtrl',
    'Utils/menuScroll',
    "ng-resource"
  ], function ($, bootstrap, angular_blank, angular_modal, VideoListCtrl, RateCtrl, AuthCtrl, VideoCtrl, UserCtrl, Media, User, LightboxCtrl) {
    'use strict';

    var app = angular.module("fest", ["ngResource", 'ui.bootstrap']).config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
      
      $locationProvider.html5Mode(false);

      $routeProvider.
        when('', {templateUrl: 'templates/watch.html',   controller: VideoListCtrl}).
        when('/watch', {templateUrl: 'templates/watch.html',   controller: VideoListCtrl}).
        when('/watch/:videoId', {templateUrl: 'templates/modal.html', controller: LightboxCtrl}).
        when('/login', {templateUrl: 'templates/modal.html', controller: LightboxCtrl}).
        when('/user', {templateUrl: 'templates/user.html', controller: UserCtrl}).
        when('/user/:userId', {templateUrl: 'templates/user.html', controller: UserCtrl}).
        otherwise({redirectTo: '/watch'});
    }]);

    app.controller("RateCtrl", ["$scope", '$rootScope', "user", "$http", RateCtrl]);
    app.controller("VideoListCtrl", ["$location", "$scope", '$rootScope',"media", "user", VideoListCtrl]);
    app.controller("AuthCtrl", ["$location", "$scope", '$rootScope', "user", AuthCtrl]);
    app.controller("LightboxCtrl", ["$scope", "$location", "$route", "$routeParams", "$rootScope", "$timeout", "media", LightboxCtrl]);
    app.controller("VideoCtrl", ["$scope",  VideoCtrl]);
    app.controller("UserCtrl", ["$scope", "$routeParams", "user", UserCtrl]);
    
    app.service("media", ["$resource", "$rootScope", Media]);
    app.service("user", ["$resource", "$window", "$rootScope", "$http", User]);
    
    $(document).ready(function () {
      angular.bootstrap(document, ["fest"]);
    })

    return '\'Allo \'Allo!';
});