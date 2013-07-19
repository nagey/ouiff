/*global define */
define(['jquery', 'angular'], function ($) {
    'use strict';

    var VideoCtrl = function ($scope, user, media) {

      };

    VideoCtrl.$inject = ["$scope"];
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


    };


    return VideoCtrl;
  });