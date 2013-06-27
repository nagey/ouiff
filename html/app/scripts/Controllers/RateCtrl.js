/*global define */
define(['angular', 'jquery'], function (angular, $) {
    'use strict';

    return function RateCtrl($location, $scope, media) {


      $scope.rate = 2;
      $scope.isReadonly = false;
    };
});