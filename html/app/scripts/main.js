require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        angular: '../bower_components/angular/angular',
        "ng-resource": '../bower_components/angular-resource/angular-resource.min',
        'angular-ui': '../bower_components/angular-ui/build/angular-ui',
        'modal': '../bower_components/sass-bootstrap/js/bootstrap-modal',
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

  ['app'], function (app) {
    'use strict';
    // use app here
    console.log(app);
    console.log('Running jQuery %s', $().jquery);


});
