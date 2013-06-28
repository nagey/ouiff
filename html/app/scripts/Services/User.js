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
        if (user) {
          this.username = user.username;
          this.profilePicture = user.profilePicture;
          this.displayName = user.displayName;
          $rootScope.$broadcast("userLogin", user);
        }
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
            else return {"loggedIn": loggedIn};
          }
          else {
            if (typeof cb == 'function') {
              cb({"loggedIn": loggedIn, "profile": userObj});
            }
            else return {"loggedIn": loggedIn, "profile": userObj};
          }
        }
        else {
          $http({method: 'GET', url: '/auth/status'}).
            success(function(data, status, headers, config) {
              console.log("return from auth status: ", data);
              if (data.status) {
                hasStatus = true;
                loginUser(data.user);
                if (typeof cb == 'function') {
                  cb({"loggedIn": loggedIn, "profile": userObj});
                }
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
      
      
      this.status(function (user) {
        console.log("User Status", user);
      });
    }
});