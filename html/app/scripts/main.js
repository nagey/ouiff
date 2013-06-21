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

require(['app', 'jquery', 'bootstrap'], function (app, $) {
    'use strict';
    // use app here
    console.log(app);
    console.log('Running jQuery %s', $().jquery);
});
