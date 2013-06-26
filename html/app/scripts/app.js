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
    
    app.service("media", ["$resource", Media]);
    

    console.log('add vid')

    $(document).ready(function () {
      angular.bootstrap(document, ["fest"]);
    })

    return '\'Allo \'Allo!';
});