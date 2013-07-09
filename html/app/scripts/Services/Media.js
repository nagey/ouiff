/*global define */
define(['angular'], function (angular ) {
    'use strict';

    return function Media($resource, $rootScope) {
      var MediaRsc = $resource('http://15sfest.com/media/:id', {id:'@id'});
      var FeaturedMedia = $resource('http://15sfest.com/media/featured/:id', {id:'@id'});
      var BestMedia = $resource('http://15sfest.com/media/top/:id', {id:'@id'});
      var userMedia = false; 

      var returnResults = function(result) {
        if (!count) count = result.length;
        if (typeof cb === "function") cb(result.splice(offset,count));
      };

      $rootScope.$on("userLogin", function (user) {
        userMedia = $resource("http://15sfest.com/media/user/"+user.username, {id: "@id"});
      });
      
      this.index = function (cb, count, offset) {
        if (!offset) offset = 0;
        MediaRsc.query(returnResults);
      };
      
      this.bestOf = function (cb, count, offset) {
        if (!offset) offset = 0;
        BestMedia.query(returnResults);
      };

      this.featured = function (cb, count, offset) {
        if (!offset) offset = 0;
        FeaturedMedia.query(returnResults);
      };

      this.mediaById = function (id, cb){
        var clip = MediaRsc.get({id: id}, function(result) {
          if (typeof cb === "function") cb(clip);
          else return clip;
        });
      };
      
      this.mediaCurrentUser = function (cb, count, offset) {
        if (!offset) offset = 0;
        userMedia.query(returnResults);
      };
      
      this.mediaByUser = function (username, cb, count, offset) {
        if (!offset) offset = 0;
        var mediaResource = $resource("http://15sfest.com/media/user/"+username, {id: "@id"});
        mediaResource.query(returnResults);
      };
      
      this.mediaByTag = function (tag, cb, count, offset) {
        var tagMedia = $resource("http://15sfest.com/media/tag/"+tag, {id: "@id"});
        tagMedia.query(returnResults);
      };
      
      this.topMediaByTag = function (tag, cb, count, offset) {
        var tagMedia = $resource("http://15sfest.com/media/tag/"+tag+"/top", {id: "@id"});
        tagMedia.query(returnResults);
      };

    };
});