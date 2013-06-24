/*global define */
define([
	'jquery',
	'bootstrap', 
  	'angular',
  	'VideoListCtrl'
  ], function ($, bootstrap, angular_blank, VideoListCtrl) {
    'use strict';

    var app = angular.module("fest", []).config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
      $locationProvider.html5Mode(true);
    }]);

    app.controller("VideoListCtrl", ["$location", "$scope", VideoListCtrl]);
    
    $(document).ready(function () {
      angular.bootstrap(document, ["fest"]);
    })

    return '\'Allo \'Allo!';
});