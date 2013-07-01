/*global define */
define([
	'jquery',
	'bootstrap', 
    'angular',
    'angular-modal',
    'Controllers/VideoListCtrl',
    'Controllers/RateCtrl',
    'Controllers/AuthCtrl',
  	'Controllers/ShareCtrl',
    'Services/Media',
    'Services/User',
    'Directives/VidDirective',
    "ng-resource"
  ], function ($, bootstrap, angular_blank, angular_modal, VideoListCtrl, RateCtrl, AuthCtrl, ShareCtrl, Media, User, VidDirective) {
    'use strict';

    var app = angular.module("fest", ["ngResource", 'ui.bootstrap']).config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
      $locationProvider.html5Mode(true);
    }]);

    app.controller("RateCtrl", ["$scope", '$rootScope', "user", RateCtrl]);
    app.controller("VideoListCtrl", ["$location", "$scope", "media", "user", VideoListCtrl]);
    app.controller("AuthCtrl", ["$scope", AuthCtrl]);
    app.controller("ShareCtrl", ["$scope", ShareCtrl]);
    app.directive('vid', VidDirective);
    
    app.service("media", ["$resource", "$rootScope", Media]);
    app.service("user", ["$resource", "$window", "$rootScope", "$http", User]);
    

    $(document).ready(function () {
      angular.bootstrap(document, ["fest"]);
    })

    return '\'Allo \'Allo!';
});