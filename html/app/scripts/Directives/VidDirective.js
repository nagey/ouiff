/*global define */
define(['angular'], function (angular ) {
  'use strict';
  return function VidDirective () {
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
  }
});