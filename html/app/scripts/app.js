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
  	'Controllers/ProfileCtrl',
    'Services/Media',
    'Services/User',
    'Controllers/LightboxCtrl',
    'Utils/menuScroll',
    "ng-resource"
  ], function ($, bootstrap, angular_blank, angular_modal, VideoListCtrl, RateCtrl, AuthCtrl, VideoCtrl, ProfileCtrl, Media, User, LightboxCtrl) {
    'use strict';

    var app = angular.module("fest", ["ngResource", 'ui.bootstrap']).config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
      
      $locationProvider.html5Mode(false);

      $routeProvider.
        when('', {templateUrl: 'templates/watch.html',   controller: VideoListCtrl}).
        when('/watch', {templateUrl: 'templates/watch.html',   controller: VideoListCtrl}).
        when('/watch/:videoId', {templateUrl: 'templates/modal.html', controller: LightboxCtrl}).
        when('/login', {templateUrl: 'templates/modal.html', controller: LightboxCtrl}).
        when('/profile', {templateUrl: 'templates/user.html', controller: ProfileCtrl}).
        when('/profile/:userId', {templateUrl: 'templates/user.html', controller: ProfileCtrl}).
        otherwise({redirectTo: '/watch'});
    }]);

    app.controller("RateCtrl", ["$scope", '$rootScope', "user", "$http", RateCtrl]);
    app.controller("VideoListCtrl", ["$location", "$scope", '$rootScope',"media", "user", VideoListCtrl]);
    app.controller("AuthCtrl", ["$location", "$scope", '$rootScope', "user", AuthCtrl]);
    app.controller("LightboxCtrl", ["$scope", "$location", "$route", "$routeParams", "$rootScope", "$timeout", "media", LightboxCtrl]);
    app.controller("VideoCtrl", ["$scope",  VideoCtrl]);
    app.controller("ProfileCtrl", ["$scope", "$routeParams", "user", ProfileCtrl]);
    
    app.service("media", ["$resource", "$rootScope", Media]);
    app.service("user", ["$resource", "$window", "$rootScope", "$http", User]);
    
    $(document).ready(function () {
      angular.bootstrap(document, ["fest"]);
    })

    return '\'Allo \'Allo!';
});