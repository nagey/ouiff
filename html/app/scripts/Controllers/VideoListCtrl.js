/*global define */
define(['angular', 'jquery', 'angular-modal'], function (angular, $, angular_modal) {
    'use strict';

    return function VideoListCtrl($location, $scope, media, user) {

      media.index();
      media.index();

      $scope.modal = {};
      $scope.modal.isOpen = false;

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
        $scope.modal.isOpen = true
        $scope.modal.videoSrc = item.videos.standard_resolution.url;

        $("#video").bind("ended", function() {
          console.log('video ended');
        });

        $('.modal').bind('click',function(){
          console.log('click');
        })
      }

      $scope.closeModal = function (){
        $scope.modal.isOpen = false;
      }

    };
});