/*global define */
define(['angular'], function (angular ) {
    'use strict';

    return function User($resource, $window, $rootScope, $http) {
      var hasStatus = false;
      var loggedIn = false;
      var userObj;
      this.username = false;
      this.profilePicture = false;
      this.displayName = false;

      var loginUser = function (user) {
        this.username = user.username;
        this.profilePicture = user.profilePicture;
        this.displayName = user.displayName;
        $rootScope.$broadcast("userLogin", user);
      }

      $window.sendUser = function (user) {
        if (user.profileList) {
          loggedIn = true;
          userObj = user;
          loginUser(userObj);
        }
      }
      
      this.status = function () {
        if (hasStatus) {
          if (!loggedIn) return {"loggedIn": loggedIn};
          else return {"loggedIn": loggedIn, "profile": userObj};
        }
        else {
          $http({method: 'GET', url: '/auth/status'}).
            success(function(data, status, headers, config) {
              if (data.status) {
                hasStatus = true;
                loginUser(data.user);
              }
            });
        }
      }
      
      
      this.status();
    }
});