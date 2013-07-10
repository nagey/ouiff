/*global define */
define(['angular', 'jquery', 'angular-modal'], function () {
    'use strict';

    var VideoListCtrl = function ($location, $scope, media) {

      media.index();

      $scope.modal = {};

      $scope.videos = [];

      //console.log("$location.parse(url):",$location.$$parse("http://15sfest.com/watch/489918443045812158_582588") );
      media.bestOf(function (result) {
        $scope.videos[0] = {
            title: "Highest Rated",
            css: "best-of",
            span: 6,
            videos: result
          };
      },4);
      media.featured(function (result) {
        $scope.videos[1] = {
          title: "Featured", 
          css: "featured",
          span: 3,
          videos: result
        };
      },2);
      media.index(function (result) {
        $scope.videos[2] = {
          title: "Latest",
          css: "latest",
          span: 3,
          videos: result
        };
      },2);

      $scope.imgClick = function (item){
        $location.prevPath = $location.path();
        $location.path('/watch/'+ item.id);
      };

    };

    VideoListCtrl.$inject = ["$location", "$scope", "media"];

    return VideoListCtrl;
  });
