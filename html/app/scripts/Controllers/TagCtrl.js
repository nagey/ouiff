/*global define */
define(['jquery', 'angular'], function () {
    'use strict';

    var TagCtrl = function ($scope, $location, media) {
      $scope.tpl = 'templates/tags.html';

      media.tags(function(tags){
        console.log("tags",tags);
        $scope.tags = tags;
      });

      $scope.tagClick = function (tag){
        $location.path('/categories/'+ tag);
      };
    };

    TagCtrl.$inject = ["$scope", "$location","media"];

    return TagCtrl;
  });