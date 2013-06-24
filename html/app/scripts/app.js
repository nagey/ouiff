/*global define */
define([
	'jquery',
	'bootstrap', 
  	'angular',
  	'BestOfCtrl'
  ], function ($, bootstrap, angular_blank, BestOfCtrl) {
    'use strict';

    var app = angular.module("fest", []).config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
      $locationProvider.html5Mode(true);
    }]);

    app.controller("BestOfCtrl", ["$location", "$scope", BestOfCtrl]);
    
    $(document).ready(function () {
      angular.bootstrap(document, ["fest"]);
    })

    return '\'Allo \'Allo!';
});