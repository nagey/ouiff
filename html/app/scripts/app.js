/*global define */
define([
	'jquery',
	'bootstrap', 
    'angular',
    'angular-modal',
  	'Controllers/VideoListCtrl',
    'Services/Media',
    "ng-resource"
  ], function ($, bootstrap, angular_blank, angular_modal, VideoListCtrl, Media) {
    'use strict';

    var app = angular.module("fest", ["ngResource", 'ui.bootstrap']).config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
      $locationProvider.html5Mode(true);
    }]);

    app.controller("VideoListCtrl", ["$location", "$scope", "media", VideoListCtrl]);
    
    app.service("media", ["$resource", Media]);
    
    
    $(document).ready(function () {
      angular.bootstrap(document, ["fest"]);
    })

    return '\'Allo \'Allo!';
});