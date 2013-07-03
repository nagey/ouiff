/*global define */
define(['angular', 'jquery'], function (angular, $) {
    'use strict';

    return function VideoCtrl($scope) {
      console.log('VideoCtrl');
        $scope.bindListener = function(){

          $('#videoPlayer').bind('click',function(){
            var video = document.getElementById("videoPlayer");

            if($('#control-window').hasClass('playing'))
              video.pause();
            else
              video.play();

            $('#control-window').toggleClass('playing');
          });

          $('#mute-btn').bind('click',function(){
            console.log($('#videoPlayer').prop('muted'))
            if($('#control-window').hasClass('muted'))
              $('#videoPlayer').prop('muted', false);
            else
              $('#videoPlayer').prop('muted', true);

            $('#control-window').toggleClass('muted');
          });
        }
    };
});