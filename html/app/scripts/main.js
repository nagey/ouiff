require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        angular: '../bower_components/angular/angular',
        'angular-ui': '../bower_components/angular-ui/build/angular-ui',
        bootstrap: 'vendor/bootstrap'
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    }
});

require(
  [
  'app', 
  'jquery', 
  'bootstrap', 
  'angular',
  'BestOfCtrl'
  ], function (app, $, bootstrap, angular_blank, BestOfCtrl) {
    'use strict';
    // use app here
    console.log(app);
    console.log('Running jQuery %s', $().jquery);

    app = angular.module("fest", []).config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
      $locationProvider.html5Mode(true);
    }]);

    console.log(BestOfCtrl);

    app.controller("BestOfCtrl", ["$location", "$scope", BestOfCtrl]);
    
    
    $(document).ready(function () {
      angular.bootstrap(document, ["fest"]);
    })
});
