/*global define, console */
/*jshint sub:true */
define(['angular'], function () {
    'use strict';

    var User = function ($resource, $window, $rootScope, $http) {
      var hasStatus = false;
      var loggedIn = false;
      var userObj;
      var onceLoggedInStack = [];

      var loginUser = function (user) {
        console.log("in loginUser", user);
        console.log("stack 0",onceLoggedInStack[0]); 
        if (user) {
          console.log("inside user block");
          hasStatus = true;
          loggedIn = true;
          userObj = user;
          
          console.log("processing stack");
          // Fire callbacks in the "onceLoggedInStack"
          var cb;
          while (!!(cb = onceLoggedInStack.pop())) {
            console.log("onceloggedinstack callback", cb);
            cb(userObj);
          }
          $rootScope.$broadcast("userLogin", user);
        }
      };

      var logoutUser = function () {
        loggedIn = false;
        userObj = undefined;
        $rootScope.$broadcast("userLogout");
      };

      $window["sendUser"] = function (user) {
        console.log("in sendUser");
        if (user.profileList) {
          loginUser(user);
        }
      };

      this.onceLoggedIn = function (cb) {
        if (loggedIn && (typeof cb === "function")) {
          cb(userObj);
        }
        else if (typeof cb === "function") {
          onceLoggedInStack.push(cb);
        }
      };

      this.status = function (cb) {
        if (hasStatus) {
          if (!loggedIn) {
            if (typeof cb === 'function') {
              cb({"loggedIn": loggedIn});
            }
            else {
              return {"loggedIn": loggedIn};
            }
          }
          else {
            if (typeof cb === 'function') {
              cb({"loggedIn": loggedIn, "profile": userObj});
            }
            else {
              return {"loggedIn": loggedIn, "profile": userObj};
            }
          }
        }
        else {
          $http({method: 'GET', url: '/auth/status'}).
            success(function(data) {
              console.log("return from auth status: ", data);
              if (data.status) {
                loginUser(data.user);
                if (typeof cb === 'function') {
                  cb({"loggedIn": loggedIn, "profile": userObj});
                }
              }
              else {
                if (typeof cb === 'function') {
                  cb({"loggedIn": loggedIn});
                }
              }
            }).error(function () {
              if (typeof cb === 'function') {
                cb({"loggedIn": loggedIn });
              }
            });
        }
      };

      this.logout = function () {
        $http({method: "GET", url: "/auth/logout"}).
          success(function () {
            logoutUser();
          });
      };

      this.status(function (user) {
        console.log("User Status", user);
      });

    };

    User.$inject = ["$resource", "$window", "$rootScope", "$http"];

    return User;
  });