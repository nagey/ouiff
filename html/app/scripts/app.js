/*global define */
define([
	'jquery',
	'bootstrap', 
    'angular',
    'angular-modal',
    'Controllers/VideoListCtrl',
    'Controllers/RateCtrl',
    'Controllers/AuthCtrl',
  	'Controllers/ShareCtrl',
    'Services/Media',
    'Services/User',
    'Controllers/LightboxCtrl',
    "ng-resource"
  ], function ($, bootstrap, angular_blank, angular_modal, VideoListCtrl, RateCtrl, AuthCtrl, ShareCtrl, Media, User, LightboxCtrl) {
    'use strict';

    var app = angular.module("fest", ["ngResource", 'ui.bootstrap']).config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
      $locationProvider.html5Mode(true);
    }]);

    //console.log(LightboxCtrl,"iodasjo");
    app.controller("RateCtrl", ["$scope", '$rootScope', "user", "$http", RateCtrl]);
    app.controller("VideoListCtrl", ["$location", "$scope", '$rootScope',"media", "user", VideoListCtrl]);
    app.controller("AuthCtrl", ["$scope", '$rootScope', "user", AuthCtrl]);
    //app.controller("ShareCtrl", ["$scope", "$rootScope", 'user', ShareCtrl]);
    app.controller("LightboxCtrl", ["$scope", "$rootScope", "$timeout", LightboxCtrl]);
    
    app.service("media", ["$resource", "$rootScope", Media]);
    app.service("user", ["$resource", "$window", "$rootScope", "$http", User]);
    

    $(document).ready(function () {
      angular.bootstrap(document, ["fest"]);
    })

    return '\'Allo \'Allo!';
});