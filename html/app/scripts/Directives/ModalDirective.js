/*global define */
define(['angular'], function () {
  'use strict';
  return function ModalDirective () {
    return {
      restrict: 'E',
      transclude: true,
      scope: { source: "@" },
      controller: undefined,
      link: function($scope, $element){
          var v = $($element).find("#videoPlayer")[0];
          $(v).bind("ended", function() {
            console.log("video ended - link function of ModalDirective");
          });
          console.log(v);
        },
      template:
        '<div id="modal-window" modal="isOpen" close="closeModal()" >'+
          '<div class="modal-body row">'+
            '<div id="modal-content" class="span6">' +
              '<div class="row" >' +
                '<video id="videoPlayer" class="span6" width="auto" height="auto" controls>'+
                  '<source id="source" ng-src="{{source}}" />'+
                '</video>'+
              '</div>'+
              //'<div ng-switch on="display">'+
                //'<div class="row" ng-switch-when="video" ng-include="tpl.videoControls"></div>'+
                //'<div class="row" ng-switch-when="rank" ng-include="tpl.rank"></div>'+
                //'<div class="row" ng-switch-when="auth" ng-include="tpl.auth"></div>'+
              //'</div>'+
            '</div>'+
          '</div>'+
        '</div>',
      replace: true
    };
  };
});