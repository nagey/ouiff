/*global define */
define([
	'jquery',
	'bootstrap', 
    'angular',
    'angular-modal',
  	'Controllers/VideoListCtrl',
    'Services/Media',
    'Directives/VidDirective',
    "ng-resource"
  ], function ($, bootstrap, angular_blank, angular_modal, VideoListCtrl, Media, VidDirective) {
    'use strict';

    var app = angular.module("fest", ["ngResource", 'ui.bootstrap']).config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
      $locationProvider.html5Mode(true);
    }]);

    app.controller("VideoListCtrl", ["$location", "$scope", "media", VideoListCtrl]);
    app.directive('vid', VidDirective);
    
    app.service("media", ["$resource", Media]);
    

    console.log('add vid')

    $(document).ready(function () {
      angular.bootstrap(document, ["fest"]);
    })

    return '\'Allo \'Allo!';
});