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
    'Directives/ModalDirective',
    "ng-resource"
  ], function ($, bootstrap, angular_blank, angular_modal, VideoListCtrl, RateCtrl, AuthCtrl, ShareCtrl, Media, User, ModalDirective) {
    'use strict';

    var app = angular.module("fest", ["ngResource", 'ui.bootstrap']).config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
      $locationProvider.html5Mode(true);
    }]);

    app.controller("RateCtrl", ["$scope", '$rootScope', "user", RateCtrl]);
    app.controller("VideoListCtrl", ["$location", "$scope", '$rootScope',"media", "user", VideoListCtrl]);
    app.controller("AuthCtrl", ["$scope", '$rootScope', "user", AuthCtrl]);
    //app.controller("ShareCtrl", ["$scope", "$rootScope", 'user', ShareCtrl]);
    app.directive('lightbox', ModalDirective);
    
    app.service("media", ["$resource", "$rootScope", Media]);
    app.service("user", ["$resource", "$window", "$rootScope", "$http", User]);
    

    $(document).ready(function () {
      angular.bootstrap(document, ["fest"]);
    })

    return '\'Allo \'Allo!';
});