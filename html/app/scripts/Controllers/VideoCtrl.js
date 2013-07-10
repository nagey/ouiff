/*global define */
define(['jquery', 'angular'], function ($) {
    'use strict';

    var VideoCtrl = function ($scope) {
        $scope.bindListener = function(){

          $('#play-btn, #videoPlayer').bind('click',function(){
            var video = document.getElementById("videoPlayer");
            if($('#control-window').hasClass('playing')) {
              video.pause();
            }
            else {
              video.play();
            }

            $('#control-window').toggleClass('playing');
          });

          $('#mute-btn').bind('click',function(){
            if($('#control-window').hasClass('muted')) {
              $('#videoPlayer').prop('muted', false);
            }
            else {
              $('#videoPlayer').prop('muted', true);
            }

            $('#control-window').toggleClass('muted');
          });
        };
      };

    VideoCtrl.$inject = ["$scope"];

    return VideoCtrl;
  });