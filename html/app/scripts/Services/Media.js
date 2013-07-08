/*global define */
define(['angular'], function (angular ) {
    'use strict';

    return function Media($resource, $rootScope) {
      var Media = $resource('http://15sfest.com/media/:id', {id:'@id'});
      var FeaturedMedia = $resource('http://15sfest.com/media/featured/:id', {id:'@id'});
      var BestMedia = $resource('http://15sfest.com/media/top/:id', {id:'@id'});
      var userMedia = false; 

      $rootScope.$on("userLogin", function (user) {
        userMedia = $resource("http://15sfest.com/media/user/"+user.username, {id: "@is"});
      });
      
      this.index = function (cb, count) {
        Media.query(function(result) {
          if (typeof cb === "function") cb(result.splice(0,count));
        });
      }
      
      this.bestOf = function (cb, count) {
        BestMedia.query(function (result) {
          if (typeof cb === "function") cb(result.splice(0,count));
        });
      }

      this.featured = function (cb, count) {
        FeaturedMedia.query(function (result) {
          if (typeof cb === "function") cb(result.splice(0,count));
        });
      }

      this.mediaById = function (cb, id){
        Media.query(function(result) {
          if (typeof cb === "function") cb(result.splice(0,1));
        });
      }

      //this.index();
    }
});