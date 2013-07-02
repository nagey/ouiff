/*global define */
define(['angular', 'jquery'], function (angular, $) {
  'use strict';

  return function LightboxCtrl($scope, $rootScope, $timeout) {
    $scope.tpl={};
    $scope.isOpen = false;

    $scope.tpl.rank = 'templates/rate.html';
    $scope.tpl.videoControls = 'templates/videoControls.html';
    $scope.tpl.auth = 'templates/auth.html';


    $scope.$on('share_request', function(event, data) {
      $scope.display = "share";
    });

    $scope.$on('auth_request', function(event, data) {
      $scope.display = "auth";
    });

    $scope.$on('open_modal', function(event, data) {
      $scope.source = data.vid_src;
      $scope.display = data.display;
      $scope.setHandler = true;
      console.log($scope.display);
      $scope.isOpen = true;
    });

    $scope.$watch("setHandler", function(newv, old) {
      if (newv == old) {
        return;
      }
      if (!newv){
        return;
      }
      $timeout(function() {
        $scope.setHandler = false;
        console.log("in timeout");
        $('#videoPlayer').bind('ended',function(e){
          console.log('@@@#####rd@')
          $scope.display = "rate";
          console.log($scope.display);
          $scope.$apply();
        });
      }, 500);
    });

    $scope.$on('close_modal', function(event, data) {
      $scope.closeModal();
    });

    $scope.$on('userLogin', function(event, data) {
      if($scope.isOpen){
        $scope.closeModal();
        $scope.$apply();
      }
    });

    $scope.closeModal = function (){
      $scope.isOpen = false;
    }


  };
});