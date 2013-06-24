/*global define */
define(['angular', 'jquery'], function (angular, $) {
    'use strict';

    return function BestOfCtrl($location, $scope, media) {

      media.index();
      console.log("loaded bestof");
      $scope.myvar = "asopdijasoidcj";
    };
});