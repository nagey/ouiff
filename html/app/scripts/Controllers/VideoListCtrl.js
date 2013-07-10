/*global define */
define(['angular', 'jquery', 'angular-modal'], function () {
    'use strict';

    var VideoListCtrl = function ($location, $scope, media) {

      media.index();

      $scope.modal = {};
      //console.log("$location.parse(url):",$location.$$parse("http://15sfest.com/watch/489918443045812158_582588") );
      media.bestOf(function (result) {
        $scope.bestOfList = result;
      },4);
      media.featured(function (result) {
        $scope.featuredList = result;
      },2);
      media.index(function (result) {
        $scope.latestList = result;
      },2);

      $scope.imgClick = function (item){
        $location.prevPath = $location.path();
        $location.path('/watch/'+ item.id);
      };

    };

    VideoListCtrl.$inject = ["$location", "$scope", "media"];

    return VideoListCtrl;
  });
