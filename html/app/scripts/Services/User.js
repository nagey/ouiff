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
      
      this.status = function (cb) {
        if (hasStatus) {
          if (!loggedIn) {
            if (typeof cb == 'function') {
              cb({"loggedIn": loggedIn});
            }
            return {"loggedIn": loggedIn};
          }
          else {
            if (typeof cb == 'function') {
              cb({"loggedIn": loggedIn, "profile": userObj});
            }
            return {"loggedIn": loggedIn, "profile": userObj};
          }
        }
        else {
          $http({method: 'GET', url: '/auth/status'}).
            success(function(data, status, headers, config) {
              if (data.status) {
                hasStatus = true;
                if (typeof cb == 'function') {
                  cb({"loggedIn": loggedIn, "profile": userObj});
                }
                loginUser(data.user);
              }
              else {
                if (typeof cb == 'function') {
                  cb({"loggedIn": loggedIn});
                }
              }
            }).error(function () {
              if (typeof cb == 'function') {
                cb({"loggedIn": loggedIn });
              }
            });
        }
      }
      
      
      this.status();
    }
});