/*global define */
define(['angular'], function (angular ) {
    'use strict';

    return function Media($resource, $rootScope) {
      var MediaRsc = $resource('http://15sfest.com/media/:id', {id:'@id'});
      var FeaturedMedia = $resource('http://15sfest.com/media/featured/:id', {id:'@id'});
      var BestMedia = $resource('http://15sfest.com/media/top/:id', {id:'@id'});
      var userMedia = false; 

      $rootScope.$on("userLogin", function (user) {
        userMedia = $resource("http://15sfest.com/media/user/"+user.username, {id: "@id"});
      });
      
      this.index = function (cb, count, offset) {
        if (!offset) offset = 0;
        MediaRsc.query(function(result) {
          if (typeof cb === "function") cb(result.splice(offset,count));
        });
      };
      
      this.bestOf = function (cb, count, offset) {
        if (!offset) offset = 0;
        BestMedia.query(function (result) {
          if (typeof cb === "function") cb(result.splice(offset,count));
        });
      };

      this.featured = function (cb, count, offset) {
        if (!offset) offset = 0;
        FeaturedMedia.query(function (result) {
          if (typeof cb === "function") cb(result.splice(offset,count));
        });
      };

      this.mediaById = function (id, cb){
        var clip = MediaRsc.get({id: id}, function(result) {
          if (typeof cb === "function") cb(clip);
          else return clip;
        });
      };
      
      this.mediaCurrentUser = function (cb, count, offset) {
        if (!offset) offset = 0;
        userMedia.query(function (result) {
          if (typeof cb === "function") cb(result.splice(offset, count));
        });
      };
      
      this.mediaByUser = function (username, cb, count, offset) {
        if (!offset) offset = 0;
        var mediaResource = $resource("http://15sfest.com/media/user/"+username, {id: "@id"});
        mediaResource.query(function(result) {
          if (typeof cb === "function") cb(result.splice(offset,count));
        });
      };

    };
});