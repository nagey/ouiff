/*global define */
define(['angular', 'jquery'], function (angular, $) {
    'use strict';

    return function VideoCtrl($scope) {
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
  });