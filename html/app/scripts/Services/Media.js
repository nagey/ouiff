/*global define */
define(['angular'], function (angular ) {
    'use strict';

    return function Media($resource) {
      var User = $resource('http://15sfest.com/media/:id', {id:'@id'});

      this.index = function () {
        var user = User.query(function() {
          console.log(user);
        });
      }
      this.index();
    }
});