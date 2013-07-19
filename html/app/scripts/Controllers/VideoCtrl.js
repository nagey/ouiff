/*global define */
define(['jquery', 'angular'], function ($) {
    'use strict';

    var VideoCtrl = function ($scope, user, media) {

      $scope.featureMedia = function () {
        media.featureMedia($scope.videoItem.id, $scope.videoItem.featured);
        $scope.videoItem.featured = !$scope.videoItem.featured;
      };

      $scope.playVideo = function() {
        var video = document.getElementById("videoPlayer");
        if($('#control-window').hasClass('playing')) {
          video.pause();
        }
        else {
          video.play();
        }

        $('#control-window').toggleClass('playing');
      };

      $scope.muteVideo = function(){
        if($('#control-window').hasClass('muted')) {
          $('#videoPlayer').prop('muted', false);
        }
        else {
          $('#videoPlayer').prop('muted', true);
        }

        $('#control-window').toggleClass('muted');
      };

      $scope.canFeature = user.hasPermission("feature_media");

    };

    VideoCtrl.$inject = ["$scope", "user", "media"];

    return VideoCtrl;
  });