/*global define */
define(['angular', 'jquery', 'angular-modal'], function () {
    'use strict';

    var TagVideoListCtrl = function ($location, $routeParams, $scope, media) {

      $scope.videos = [];
      $scope.tag = $routeParams.tag;

      media.topMediaByTag($scope.tag, function(result){
        $scope.videos[0] = {
            title: "Highest Rated",
            css: "best-of",
            span: 12,
            videos: result
          };
      }, 4);

      media.mediaByTag($scope.tag, function(result){
        $scope.videos[1] = {
            title: "Latest",
            css: "latest",
            span: 12,
            videos: result
          };
      });

      $scope.imgClick = function (item){
        $location.prevPath = $location.path();
        $location.path('/watch/'+ item.id);
      };

    };

    TagVideoListCtrl.$inject = ["$location",  "$routeParams", "$scope", "media"];

    return TagVideoListCtrl;
  });
