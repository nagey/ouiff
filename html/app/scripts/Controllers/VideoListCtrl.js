/*global define */
define(['angular', 'jquery', 'angular-modal'], function (angular, $, angular_modal) {
    'use strict';

    return function VideoListCtrl($location, $scope, $rootScope, media, user) {

      media.index();
      media.index();

      $scope.modal = {};

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
        $scope.modal.videoSrc = item.videos.standard_resolution.url;
        $rootScope.activeVid = item.id;
        $rootScope.$broadcast('open_modal', {display: 'video', vid: item.id, vid_src:item.videos.standard_resolution.url});
      }

    };
});