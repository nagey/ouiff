/*global define, angular*/
define(['jquery', 'angular'], function () {
    'use strict';

    var TagCtrl = function ($scope, $location, media) {
      $scope.tpl = 'templates/tags.html';
      $scope.allBtn = {};

      console.log('TagCtrl');
      media.tags(function(tags){
        console.log("tags",tags);
        $scope.tags = tags;
      });

      $scope.predicate = '-number';


      $scope.$on('$routeChangeSuccess', function(scope, current){

        angular.forEach($scope.tags, function(value){
          if(value.tag === current.params.tag){
            value.classes = "hilite";
          }else{
            value.classes = "";
          }
        });
        if(current.params.tag){
          $scope.allBtn.classes = "";
        }else{
          $scope.allBtn.classes = "hilite";
        }
      });

      $scope.tagClick = function (tag){
        $location.path('/categories/'+ tag);
      };
    };

    TagCtrl.$inject = ["$scope", "$location","media"];

    return TagCtrl;
  });