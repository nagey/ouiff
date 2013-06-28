/*global define */
define(['angular', 'jquery'], function (angular, $) {
    'use strict';

    return function AuthCtrl($scope) {
      console.log('authCtrl');

      $scope.services = [
      	{name: "Instagram", url: "/auth/instagram", w: 575, h:400},
      	{name: "Facebook", url: "/auth/facebook", w: 500, h:200},
      	{name: "Twitter", url: "/auth/twitter", w: 575, h:400}
      ];

      $scope.login = function(service){
        var w = service.w;
        var h = service.h;
        var title = service.name+" Login";
        var left = (screen.width/2)-(w/2);
        var top = (screen.height/2)-(h/2);
        return window.open(service.url, 
          title, 
          'toolbar=no,'+
          ' location=no,'+
          ' directories=no,'+
          ' status=no,'+
          ' menubar=no,'+
          ' scrollbars=no,'+
          ' resizable=no,'+
          ' copyhistory=no,'+
          ' width='+w+
          ', height='+h+
          ', top='+top+
          ', left='+left);      
        }
    };
});