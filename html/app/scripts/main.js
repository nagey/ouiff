require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery.min',
        angular: '../bower_components/angular/angular.min',
        "ng-resource": '../bower_components/angular-resource/angular-resource.min',
        'angular-ui': '../bower_components/angular-ui/build/angular-ui.min',
        bootstrap: 'vendor/bootstrap'
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        "angular-ui" : {
            deps: ["jquery", "jquery-ui", "angular"]
        },
        "ng-resource" : {
            deps: ["angular"]
        },
    }
});

require(
  [
  'app', 
  'jquery', 
  'bootstrap', 
  'angular',
  'ng-resource',
  'BestOfCtrl'
  ], function (app, $, bootstrap, angular_blank, angular_resource_blank, BestOfCtrl) {
    'use strict';
    // use app here
    console.log(app);
    console.log('Running jQuery %s', $().jquery);

    app = angular.module("fest", ["ngResource"]).config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
      $locationProvider.html5Mode(true);
    }]);


    app.controller("BestOfCtrl", ["$location", "$scope", "media", BestOfCtrl]);
    
    app.service("media", ["$resource", function ($resource) {
      var User = $resource('http://15sfest.com/media/:id', {id:'@id'});
      
      this.index = function () {
        var user = User.get({}, function() {
          console.log(user);
        });
      }
    }]);
    
    
    $(document).ready(function () {
      angular.bootstrap(document, ["fest"]);
    })
});
