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

        $scope.showVideo = true;
        $scope.showRank = false;
        $scope.showShare = false;
      },
      link: function($scope, $element, attrs){
        $($element).children('video').bind('ended',function(e){
          $scope.showVideo = false;
          $scope.showRank = true;
          $scope.$apply()
        })
      },
      template:
        '<div class="video-container">' +
          '<video ng-show="showVideo" id="video" width="auto" height="auto" controls>'+
            '<source id="source" ng-src="{{source}}" />'+
          '</video>'+
          '<div ng-show="showRank" ng-include="tpl.rank"></div>'+
          '<div ng-show="showShare" ng-include="tpl.share"></div>'+
        '</div>',
      replace: true
    };
  }
});