/*global define */
define([
	'jquery',
	'bootstrap', 
    'angular',
    'modal',
  	'VideoListCtrl',
    "ng-resource"
  ], function ($, bootstrap, angular_blank, modal, VideoListCtrl) {
    'use strict';

    var app = angular.module("fest", []).config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
      $locationProvider.html5Mode(true);
    }]);

    app.controller("VideoListCtrl", ["$location", "$scope", VideoListCtrl]);
    
    
    app.service("media", ["$resource", function ($resource) {
      var User = $resource('http://15sfest.com/media/:id', {id:'@id'});
      
      this.index = function () {
        var user = User.get({}, function() {
          console.log(user);
        });
      }
    }]);
    
    
    
    $(document).ready(function () {
      angular.bootstrap(document, ["fest"]);
    })

    return '\'Allo \'Allo!';
});