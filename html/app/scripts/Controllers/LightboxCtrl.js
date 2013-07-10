/*global define, console */
define(['angular', 'jquery'], function (angular, $) {
  'use strict';

  return function LightboxCtrl( $scope, $location, $route, $routeParams, $rootScope, $timeout, media) {
    $scope.tpl={};
    $scope.isOpen = false;
    $scope.opts = {
      backdropFade: true,
      dialogFade:true
    };

    $scope.tpl.rate = 'templates/rate.html';
    $scope.tpl.videoControls = 'templates/videoControls.html';
    $scope.tpl.auth = 'templates/auth.html';
    $scope.pathArr = [];


    // Event Listeners
    $scope.$on('auth_request', function() {
      $scope.display = "auth";
    });
    
    $scope.$on('close_modal', function(event, data) {

      $scope.closeModal();
    });

    $scope.$on('userLogin', function() {
      if($scope.isOpen){
        $scope.closeModal();
        $scope.$apply();
      }
    });

    // Scope Listeners
    $scope.$watch("setHandler", function(newv, old) {
      if (newv == old) {
        return;
      }
      if (!newv){
        return;
      }
      $timeout(function() {
        $scope.setHandler = false;
        $('#videoPlayer').bind('ended',function(){
          $scope.display = "rate";
          $scope.$apply();
        });
      }, 500);
    });



    // Functions
    $scope.closeModal = function (){
      console.log('$route',$route);
      $location.path($location.prevPath);
      $scope.isOpen = false;
    };

    if($routeParams.videoId){
        media.mediaById($routeParams.videoId, function (result) {
          $scope.videoItem = result;
          $rootScope.activeVid = $scope.videoItem.id;

          $scope.source = $scope.videoItem.videos.standard_resolution.url;
          $scope.display = 'video';
          $scope.setHandler = true;
          $scope.isOpen = true;
      });
    }else if($location.$$path == '/login'){

      $scope.display = 'auth';
      $scope.isOpen = true;
    }
    
    
  };
});