/*global define, screen, console, angular */
define(['angular', 'jquery'], function () {
    'use strict';

    var AuthCtrl = function ($location, $scope, user, $window) {

      $scope.services = [
        {name: "Instagram", key:'instagram', url: "/auth/instagram", w: 575, h:400, checked: false, auth: false},
        {name: "Facebook", key:'facebook', url: "/auth/facebook", w: 500, h:200, checked: false, auth: false},
        {name: "Twitter", key:'twitter', url: "/auth/twitter", w: 575, h:400, checked: false, auth: false}
      ];

      $scope.loggedIn = false;
      $scope.profile = {};

      $scope.$on('userLogin', function() {
        $scope.checkStatus();
      });

      $scope.$on('connectService', function(e, service) {
        console.log('connectService', service);
        angular.forEach($scope.services, function(value) {
          if(service === value.key){
            console.log(value);
            $scope.login(value);
          }
        });
      });

      $scope.openAuth = function(){
        $location.path('/login');
      };
      $scope.openProfile = function(){
        $location.path('/profile');
      };

      $scope.checkStatus = function(){
        var setServiceLoggedIn = function(service){
          return function() {
            $scope.services[service].checked = true;
            $scope.services[service].auth = true;
          };
        };
        user.status(function(status){
          if(status.loggedIn){
            $scope.loggedIn = true;
            $scope.profile = status.profile;
            for(var i in $scope.profile.profileList){
              for(var j in $scope.services){
                if($scope.profile.profileList[i] === $scope.services[j].key){
                  user.onceLoggedIn($scope.services[j].key, setServiceLoggedIn(j));
                  break;
                }
              }
            }
          }
        });
      };

      $scope.login = function(service){
        if(!service.auth){
          var w = service.w;
          var h = service.h;
          var title = service.name+" Login";
          var left = (screen.width/2)-(w/2);
          var top = (screen.height/2)-(h/2);

          console.log('connect to  service',service);

          return $window.open(service.url,
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
    };

    AuthCtrl.$inject = ["$location", "$scope", "user", "$window", "analytics"];

    return AuthCtrl;
  });