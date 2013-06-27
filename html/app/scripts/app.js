/*global define */
define([
	'jquery',
	'bootstrap', 
    'angular',
    'angular-modal',
    'Controllers/VideoListCtrl',
    'Controllers/RateCtrl',
  	'Controllers/AuthCtrl',
    'Services/Media',
    'Services/User',
    'Directives/VidDirective',
    "ng-resource"
  ], function ($, bootstrap, angular_blank, angular_modal, VideoListCtrl, RateCtrl, AuthCtrl, Media, User, VidDirective) {
    'use strict';

    var app = angular.module("fest", ["ngResource", 'ui.bootstrap']).config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
      $locationProvider.html5Mode(true);
    }]);

    app.controller("VideoListCtrl", ["$location", "$scope", "media", "user", VideoListCtrl]);
    app.controller("RateCtrl", ["$scope", '$rootScope', RateCtrl]);
    app.controller("AuthCtrl", ["$scope", AuthCtrl]);
    app.directive('vid', VidDirective);
    
    app.service("media", ["$resource", Media]);
    app.service("user", ["$resource", "$window", "$rootScope", User]);
    

    $(document).ready(function () {
      angular.bootstrap(document, ["fest"]);
    })

    return '\'Allo \'Allo!';
});