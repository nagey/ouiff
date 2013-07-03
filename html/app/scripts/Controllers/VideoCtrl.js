/*global define */
define(['angular', 'jquery'], function (angular, $) {
    'use strict';

    return function VideoCtrl($scope) {
      console.log('VideoCtrl');
        $scope.bindListener = function(){
          console.log('hi all');
          $('#mute-btn').bind('click',function(){
            var video = document.getElementById("Video1");
            console.log('click!',$("#videoPlayer"));
            
          })
        }
    };
});