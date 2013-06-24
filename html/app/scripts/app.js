/*global define */
define([
	'jquery',
	'bootstrap', 
  	'angular',
  	'VideoListCtrl',
    "ng-resource"
  ], function ($, bootstrap, angular_blank, VideoListCtrl) {
    'use strict';

    var app = angular.module("fest", ["ngResource"]).config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
      $locationProvider.html5Mode(true);
    }]);

    app.controller("VideoListCtrl", ["$location", "$scope", "media", VideoListCtrl]);
    
    app.service("media", ["$resource", function ($resource) {
      var User = $resource('http://15sfest.com/media/:id', {id:'@id'});
      console.log("media service");
      
      this.index = function () {
        var user = User.get({}, function() {
          console.log(user);
        });
      }
      this.index();
    }]);
    
    
    $(document).ready(function () {
      angular.bootstrap(document, ["fest"]);
    })

    return '\'Allo \'Allo!';
});