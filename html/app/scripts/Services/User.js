/*global define, console */
/*jshint sub:true */
define(['angular'], function () {
    'use strict';

    var User = function ($resource, $window, $rootScope, $http) {
      var hasStatus = false;
      var loggedIn = false;
      var userObj;
      var onceLoggedInStacks = { any: []};

      var loginUser = function (user) {
        console.log("in loginUser", user);
        if (user) {
          hasStatus = true;
          loggedIn = true;
          userObj = user;

          // Fire callbacks in the "onceLoggedInStacks"
          var cb;
          while (!!(cb = onceLoggedInStacks.any.pop())) {
            console.log("firing any callback", cb);
            cb(userObj);
          }
          userObj.profileList.forEach(function (element) {
            if (onceLoggedInStacks[element]) {
              while (!!(cb = onceLoggedInStacks[element].pop())) {
                console.log("firing " + element + " callback", cb);
                cb(userObj);
              }
            }
          });
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

      this.onceLoggedIn = function (var1, var2) {
        var cb, service;
        if (typeof var1 === "function") {
          cb = var1;
          service = "any";
        }
        else if ((typeof var1 === "string") && (typeof var2 === "function")) {
          cb = var2;
          service = var1;
        }
        else {
          return;
        }

        var insertCallback = function () {
          onceLoggedInStacks[service] = onceLoggedInStacks[service] || [];
          onceLoggedInStacks[service].push(cb);
        };

        if (loggedIn) {
          if ((service === 'any') || (userObj.profileList.indexOf(service) !== -1)) {
            cb(userObj);
          }
          else {
            insertCallback();
          }
        }
        else {
          insertCallback();
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