/*global define */
define(['angular'], function (angular ) {
    'use strict';

    return function Media($resource, $rootScope) {
      var MediaRsc = $resource('http://15sfest.com/media/:id', {id:'@id'});
      var FeaturedMedia = $resource('http://15sfest.com/media/featured/:id', {id:'@id'});
      var BestMedia = $resource('http://15sfest.com/media/top/:id', {id:'@id'});
      var userMedia = false; 

      $rootScope.$on("userLogin", function (user) {
        userMedia = $resource("http://15sfest.com/media/user/"+user.username, {id: "@is"});
      });
      
      this.index = function (cb, count) {
        MediaRsc.query(function(result) {
          if (typeof cb === "function") cb(result.splice(0,count));
        });
      };
      
      this.bestOf = function (cb, count) {
        BestMedia.query(function (result) {
          if (typeof cb === "function") cb(result.splice(0,count));
        });
      };

      this.featured = function (cb, count) {
        FeaturedMedia.query(function (result) {
          if (typeof cb === "function") cb(result.splice(0,count));
        });
      };

      this.mediaById = function (id, cb){
        var clip = MediaRsc.get({id: id}, function(result) {
          if (typeof cb === "function") cb(clip);
          else return clip;
        });
      };

    };
});