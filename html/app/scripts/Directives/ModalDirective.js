/*global define */
define(['angular'], function (angular ) {
  'use strict';
  return function ModalDirective () {
    return {
      restrict: 'E',
      transclude: true,
      scope: { source: "@" },
      controller: function($scope, $element) {
        console.log('ModalDirective');

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
          $scope.display = data.display;
          $scope.isOpen = true;
        });

        $scope.closeModal = function (){
          $scope.isOpen = false;
        }
        $scope.videoInit = function(){
          $('#modal-content video').bind('ended',function(e){
            $scope.display = "rank";
            $scope.$apply();
          })
        }
      },
      link: function($scope, $element, attrs){

      },
      template:
        '<div id="modal-window" modal="isOpen" close="closeModal()" >'+
          '<div class="modal-body">'+
            '<div id="modal-content" ng-switch on="display">' +
                '<video ng-switch-when="video" ng-init="videoInit()" id="video" width="auto" height="auto" controls>'+
                  '<source id="source" ng-src="{{source}}" />'+
                '</video>'+
                '<div ng-switch-when="rank" ng-include="tpl.rank"></div>'+
                '<div ng-switch-when="share" ng-include="tpl.share"></div>'+
                '<div ng-switch-when="auth" ng-include="tpl.auth"></div>'+
            '</div>'+
          '</div>'+
        '</div>',
      replace: true
    };
  }
});