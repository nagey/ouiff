/*global define */
define(['angular', 'jquery'], function (angular, $) {
    'use strict';

    return function BestOfCtrl($location, $scope, media) {

      media.index();
      console.log("loaded bestof");
      $scope.myvar = "asopdijasoidcj";

      $scope.bestOfList = [
      	{name: 'photo 1', url: 'images/suki.jpeg'},
      	{name: 'photo 2', url: 'images/suki.jpeg'},
      	{name: 'photo 3', url: 'images/suki.jpeg'},
      	{name: 'photo 4', url: 'images/suki.jpeg'}
      ]
    };
});