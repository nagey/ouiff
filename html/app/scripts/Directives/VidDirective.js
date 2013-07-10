/*global define */
define(['angular'], function () {
  'use strict';
  return function VidDirective () {
    return {
      restrict: 'E',
      transclude: true,
      scope: { source: "@" },
      controller: function($scope) {
        $scope.tpl={};
        $scope.displays={};
        $scope.tpl.rank = 'templates/rate.html';
        $scope.tpl.share = 'templates/share.html';
        $scope.tpl.auth = 'templates/auth.html';

        $scope.displays.showVideo = true;
        $scope.displays.showRank = false;
        $scope.displays.showShare = false;
        $scope.displays.showAuth = false;

        $scope.$on('share_request', function() {
          console.log('share_request');
          for (var i in $scope.displays){
            $scope.displays[i] = false;
          }
          $scope.displays.showShare = true;
        });

        $scope.$on('auth_request', function() {
          console.log('auth_request');
          for (var i in $scope.displays){
            $scope.displays[i] = false;
          }
          $scope.displays.showAuth = true;
        });

      },
      link: function($scope, $element){
        $($element).children('video').bind('ended',function(){
          $scope.displays.showVideo = false;
          $scope.displays.showRank = true;
          $scope.$apply();
        });
      },
      template:
        '<div id="modal-content" >' +
            '<video ng-show="displays.showVideo" id="video" width="auto" height="auto" controls>'+
              '<source id="source" ng-src="{{source}}" />'+
            '</video>'+
            '<div ng-show="displays.showRank" ng-include="tpl.rank"></div>'+
            '<div ng-show="displays.showShare" ng-include="tpl.share"></div>'+
            '<div ng-show="displays.showAuth" ng-include="tpl.auth"></div>'+
        '</div>',
      replace: true
    };
  };
});