/*global define */
define(['jquery', 'angular'], function ($) {
    'use strict';

    var TagCtrl = function ($scope, media) {
      $scope.tpl = 'templates/tags.html';

      media.tags(function(tags){
        console.log("tags",tags);
        $scope.tags = tags;
      });
    };

    TagCtrl.$inject = ["$scope", "media"];

    return TagCtrl;
  });