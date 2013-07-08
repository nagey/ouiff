/*global define */
define(['angular', 'jquery'], function (angular, $) {
  'use strict';

  return function LightboxCtrl( $scope, $location, $route, $routeParams, $rootScope, $timeout, media) {

    $scope.tpl={};
    $scope.isOpen = false;

    $scope.tpl.rate = 'templates/rate.html';
    $scope.tpl.videoControls = 'templates/videoControls.html';
    $scope.tpl.auth = 'templates/auth.html';
    $scope.pathArr = [];


    // Event Listeners
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
      $scope.isOpen = true;
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

    // Scope Listeners
    $scope.$watch(function() {return $location.path();}, function(newv, old) {
      if (newv == old) return;
      if (!newv) return;
      $scope.checkURL();
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
        $('#videoPlayer').bind('ended',function(e){
          $scope.display = "rate";
          $scope.$apply();
        });
      }, 500);
    });

    

    $scope.closeModal = function (){
      $location.path('');
      $scope.isOpen = false;
    }

    $scope.checkURL = function (){
      console.log('checkURL')
      $scope.pathArr = $location.$$path.split('/')
      if($scope.pathArr[1] == "watch"){
        media.mediaById(function (result) {
          $scope.videoItem = result[0];
          $rootScope.activeVid = $scope.videoItem.id;

          $scope.source = $scope.videoItem.videos.standard_resolution.url;
          $scope.display = 'video';
          $scope.setHandler = true;
          $scope.isOpen = true;
        },$scope.pathArr[2]);
        console.log("$route",$route);
        console.log("$scope",$scope);
        console.log("$routeParams",$routeParams);
        //$scope.$apply();
      }else if($scope.pathArr[1] == "login"){
        console.log('in auth', $location)
        $scope.display = 'auth';
        $scope.isOpen = true;
      }
    }

    $scope.pathArr = $location.$$path.split('/')
    $scope.checkURL();

  };
});