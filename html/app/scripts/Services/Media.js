/*global define */
define(['angular'], function (angular ) {
    'use strict';

    return function Media($resource) {
      var Media = $resource('http://15sfest.com/media/:id', {id:'@id'});
      
      this.index = function (cb, count) {
        Media.query(function(result) {
          if (typeof cb === "function") cb(result.splice(0,count));
        });
      }
      
      this.bestOf = function (cb, count) {
        Media.query(function (result) {
          if (typeof cb === "function") cb(result.splice(0,count));
        });
      }

      this.featured = function (cb, count) {
        Media.query(function (result) {
          if (typeof cb === "function") cb(result.splice(0,count));
        });
      }

      //this.index();
    }
});