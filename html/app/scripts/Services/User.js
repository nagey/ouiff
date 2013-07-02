/*global define */
define(['angular'], function (angular ) {
    'use strict';

    return function User($resource, $window, $rootScope, $http) {
      var hasStatus = false;
      var loggedIn = false;
      var userObj;

      var loginUser = function (user) {
        //console.log("in loginUser", user, $rootScope);
        if (user) {
          hasStatus = true;
          console.log('loggedIn',user);
          loggedIn = true;
          userObj = user;
          $rootScope.$broadcast("userLogin", user);
        }
      }

      $window.sendUser = function (user) {
        //console.log("in sendUser");
        if (user.profileList) {
          loginUser(user);
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