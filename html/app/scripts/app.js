/*global define */
define([
	'jquery',
	'bootstrap', 
    'angular',
    'angular-modal',
    'Controllers/VideoListCtrl',
  	'Controllers/RateCtrl',
    'Services/Media',
    'Services/User',
    'Directives/VidDirective',
    "ng-resource"
  ], function ($, bootstrap, angular_blank, angular_modal, VideoListCtrl, RateCtrl, Media, User, VidDirective) {
    'use strict';

    var app = angular.module("fest", ["ngResource", 'ui.bootstrap']).config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
      $locationProvider.html5Mode(true);
    }]);

    app.controller("VideoListCtrl", ["$location", "$scope", "media", VideoListCtrl]);
    app.controller("RateCtrl", ["$location", "$scope", "media", RateCtrl]);
    app.directive('vid', VidDirective);
    
    app.service("media", ["$resource", Media]);
    app.service("user", ["$resource", "$window", "$rootScope", User]);
    

    console.log('add vid')

    $(document).ready(function () {
      angular.bootstrap(document, ["fest"]);
    })

    return '\'Allo \'Allo!';
});