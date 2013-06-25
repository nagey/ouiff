/*global define */
define([
	'jquery',
	'bootstrap', 
    'angular',
    'angular-modal',
  	'Controllers/VideoListCtrl',
    "ng-resource"
  ], function ($, bootstrap, angular_blank, angular_modal, VideoListCtrl) {
    'use strict';

    var app = angular.module("fest", ["ngResource", 'ui.bootstrap']).config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
      $locationProvider.html5Mode(true);
    }]);

    app.controller("VideoListCtrl", ["$location", "$scope", "media", VideoListCtrl]).
      directive('vid', function() {
          return {
            restrict: 'E',
            transclude: true,
            scope: { source: "@" },
            controller: function($scope, $element) {
              $scope.tpl={};
              $scope.tpl.rank = 'templates/rate.html';
              $scope.tpl.share = 'templates/share.html';

              $scope.tpl.active = $scope.tpl.rank;

              $($element).children('video').bind('ended',function(e){
                
                $scope.tpl.active = $scope.tpl.share;
                console.log($scope.tpl.active);
              });
            },
            link: function($scope, element, attrs){
              /*$(element).children('video').bind('ended',function(e){
                console.log('its over');
                $scope.tpl.active = $scope.tpl.share;
              })*/
            },
            template:
              '<div class="video-container">' +
                '<video id="video" width="auto" height="auto" controls>'+
                  '<source id="source" ng-src="{{source}}" />'+
                '</video>'+
              '<div ng-include="tpl.active"></div>'+
              '</div>',
            replace: true
          };
      });
    
    app.service("media", ["$resource", function ($resource) {
      var User = $resource('http://15sfest.com/media/:id', {id:'@id'});
      console.log("media service");
      
      this.index = function () {
        var user = User.query(function() {
          console.log(user);
        });
      }
      this.index();
    }]);

    /*angular.module('components', []).
      directive('vid', function() {
        return {
          restrict: 'E',
          transclude: true,
          scope: {},
          controller: function($scope, $element) {
            $scope.test = 'Test 123, Test 123';
            console.log('HA!');
          },
          template:
            '<div class="video-container">' +
              '<video width="auto" height="auto" controls>'+
                '<source ng-src="{{modal.videoSrc}}" />'+
              '</video>'+
              '<div class="tab-content" ng-transclude></div>' +
            '</div>',
          replace: true
        };
    })*/
    console.log('add vid')

    $(document).ready(function () {
      angular.bootstrap(document, ["fest"]);
    })

    return '\'Allo \'Allo!';
});