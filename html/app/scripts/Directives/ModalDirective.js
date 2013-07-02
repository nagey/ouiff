/*global define */
define(['angular'], function (angular ) {
  'use strict';
  return function ModalDirective () {
    return {
      restrict: 'E',
      transclude: true,
      scope: { source: "@" },
      controller: function($scope, $rootScope, $element) {

        $scope.tpl={};
        $scope.displays={};

        $scope.isOpen= false;

        $scope.tpl.rank = 'templates/rate.html';
        $scope.tpl.share = 'templates/share.html';
        $scope.tpl.auth = 'templates/auth.html';


        $scope.$on('share_request', function(event, data) {
          $scope.display = "share";
        });

        $scope.$on('auth_request', function(event, data) {
          $scope.display = "auth";
        });

        $scope.$on('open_modal', function(event, data) {
          console.log('ModalDirective| e:'+event,data);
          $scope.display = data.display;
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

        $scope.closeModal = function (){
          $scope.isOpen = false;
        }
        $scope.videoInit = function(){
          $('#modal-content video').bind('ended',function(e){
            $scope.display = "rank";
            $scope.$apply();
          });

        }
      },
      link: function($scope, $element, attrs){

      },
      template:
        '<div id="modal-window" modal="isOpen" close="closeModal()" >'+
          '<div class="modal-body row">'+
            '<div id="modal-content" class="span6" ng-switch on="display">' +
              '<div class="row" ng-switch-when="video" ng-init="videoInit()">' +
                '<video id="video" class="span6" width="auto" height="auto" controls>'+
                  '<source id="source" ng-src="{{source}}" />'+
                '</video>'+
              '</div>'+
              '<div class="row" ng-switch-when="rank" ng-include="tpl.rank"></div>'+
              '<div class="row" ng-switch-when="auth" ng-include="tpl.auth"></div>'+
            '</div>'+
          '</div>'+
        '</div>',
      replace: true
    };
  }
});