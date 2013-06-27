/*global define */
define(['angular'], function (angular ) {
    'use strict';

    return function User($resource, $window, $rootScope) {
      var loggedIn = false;
      var userObj;
      $window.sendUser = function (user) {
        if (user.profileList) {
          loggedIn = true;
          userObj = user;
          $rootScope.$broadcast("userLogin", userObj);
        }
      }
      
      this.status = function () {
        if (!loggedIn) return {"loggedIn": loggedIn};
        else return {"loggedIn": loggedIn, "profile": userObj};
      }
    }
});