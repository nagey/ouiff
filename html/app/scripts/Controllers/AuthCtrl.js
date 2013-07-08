/*global define */
define(['angular', 'jquery'], function (angular, $) {
    'use strict';

    return function AuthCtrl($location, $scope, $rootScope, user) {
      
      $scope.services = [
      	{name: "Instagram", key:'instagram', url: "/auth/instagram", w: 575, h:400, checked: false, auth: false},
      	{name: "Facebook", key:'facebook', url: "/auth/facebook", w: 500, h:200, checked: false, auth: false},
      	{name: "Twitter", key:'twitter', url: "/auth/twitter", w: 575, h:400, checked: false, auth: false}
      ];

      $scope.loggedIn = false;
      $scope.profile = {}

      $scope.$on('userLogin', function(event, data) {
        $scope.checkStatus();
      });

      $scope.openAuth = function(){
        $//rootScope.$broadcast('open_modal', {display: 'auth'});
        $location.path('/login');
      }
      $scope.checkStatus = function(){
        user.status(function(status){
          if(status.loggedIn){
            $scope.loggedIn = true;
            $scope.profile = status.profile
            for(var i in $scope.profile.profileList){
              for(var j in $scope.services){
                if($scope.profile.profileList[i] == $scope.services[j].key){
                  $scope.services[j].checked = true;
                  $scope.services[j].auth = true;
                  break;
                }
              }
            }
          }
        });
      }
      
      $scope.login = function(service){
        if(!service.auth){
          var w = service.w;
          var h = service.h;
          var title = service.name+" Login";
          var left = (screen.width/2)-(w/2);
          var top = (screen.height/2)-(h/2);

          console.log('connect to  service',service);
          
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
        }
    };
});