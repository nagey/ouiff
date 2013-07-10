/*global define, angular, document */
define([
  'jquery',
  'Controllers/VideoListCtrl',
  'Controllers/RateCtrl',
  'Controllers/AuthCtrl',
  'Controllers/VideoCtrl',
	'Controllers/ProfileCtrl',
  'Services/Media',
  'Services/User',
  'Controllers/LightboxCtrl',
  'Utils/menuScroll',
  "ng-resource",
  'bootstrap',
  'angular',
  'angular-modal'
], function ($, VideoListCtrl, RateCtrl, AuthCtrl, VideoCtrl, ProfileCtrl, Media, User, LightboxCtrl) {
    'use strict';

    var app = angular.module("fest", ["ngResource", 'ui.bootstrap']).config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {

      $locationProvider.html5Mode(false);

      $routeProvider.
        when('/watch', {templateUrl: 'templates/watch.html',   controller: VideoListCtrl}).
        when('/watch/:videoId', {templateUrl: 'templates/modal.html', controller: LightboxCtrl}).
        when('/login', {templateUrl: 'templates/modal.html', controller: LightboxCtrl}).
        when('/profile', {templateUrl: 'templates/profile.html', controller: ProfileCtrl}).
        when('/profile/:userId', {templateUrl: 'templates/profile.html', controller: ProfileCtrl}).
        otherwise({redirectTo: '/watch'});
    }]);

    app.controller("AuthCtrl", AuthCtrl);
    app.controller("LightboxCtrl", LightboxCtrl);
    app.controller("ProfileCtrl", ProfileCtrl);
    app.controller("RateCtrl", RateCtrl);
    app.controller("VideoListCtrl", VideoListCtrl);
    app.controller("VideoCtrl", VideoCtrl);

    app.service("media", Media);
    app.service("user", User);

    $(document).ready(function () {
      angular.bootstrap(document, ["fest"]);
    });

    return;
  });