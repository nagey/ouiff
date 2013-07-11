/*global define */
define(['angular'], function(angular) {
  'use strict';
  // Setup Google Analytics Tracking for different views and paths
  angular.module('fest.services.analytics', []).service('analytics', [
      '$rootScope', '$window', '$location', function($rootScope, $window, $location) {
        var track = function() {
          $window._gaq.push(['_trackPageview', $location.path()]);
        };
        $rootScope.$on('$routeChangeSuccess', track);
      }
    ]);
});