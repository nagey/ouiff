/*global define */
define(['angular'], function() {
  'use strict';
  // Setup Google Analytics Tracking for different views and paths
  var Analytics = function($rootScope, $window, $location) {
    var track = function() {
      if ($window._gaq) {
        $window._gaq.push(['_trackPageview', $location.path()]);
      }
      else if (ga) {
        console.log('using ga')l
        ga('send', {'hitType': 'pageview', 'page': $location.path()});
      }
      else if ($window.ga) {
        console.log('using $window.ga');
        $window.ga('send', {'hitType': 'pageview', 'page': $location.path()});
      }
      else {
        console.log("can't find gaq");
      }
    };
    $rootScope.$on('$routeChangeSuccess', track);
  };

  Analytics.$inject = ['$rootScope', '$window', '$location'];

  return Analytics;

});