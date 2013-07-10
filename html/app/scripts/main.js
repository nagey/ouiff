require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        angular: '../bower_components/angular-unstable/angular',
        "ng-resource": '../bower_components/angular-resource/angular-resource.min',
        'angular-ui': '../bower_components/angular-ui/build/angular-ui',
        'angular-modal': '../bower_components/angular-ui-bootstrap/dist/ui-bootstrap-tpls-0.4.0',
        bootstrap: 'vendor/bootstrap'
      },
      shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
          },
          "angular-ui" : {
            deps: ["jquery", "angular"]
          },
          "ng-resource" : {
            deps: ["angular"]
          },
          "angular-modal" : {
            deps: ["angular-ui"]
          }
        }
      });

require(

  ['app'], function () {
    'use strict';
    // use app here
    //console.log(app);
   // console.log('Running jQuery %s', $().jquery);
  });
