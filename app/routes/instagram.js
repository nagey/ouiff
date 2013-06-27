module.exports = function (app) {
  "use strict";
  
  app.extras.Instagram.set('client_id', app.extras.instagram.clientId);
  app.extras.Instagram.set('client_secret', app.extras.instagram.clientSecret);
  
  
  var geocoder = require("geocoder");
  
  var ObjectId = require('mongojs').ObjectId;
  
  function processGeocodeResult(result) {
    var locationObject = {};
    if (result.status === "OK") {
      result = result.results;
      for (var r in result) {
        for (var c in result[r].address_components) {
          for (var t in result[r].address_components[c].types) {
            var tt = result[r].address_components[c].types[t];
            if ( (tt === "country") || (tt == "political") ) {
              locationObject.country = result[r].address_components[c].short_name.toLowerCase();
              app.extras.stathat.track("geocode - found country",1);
            }
          }
        }
      }
    }
    if (!locationObject.country) app.extras.stathat.track("geocode - could not find country",1);
    return locationObject;
  }
  
  function getCountryAndInsert(media) {
    if ((media.location) && ((media.location.latitude) && (media.location.longitude))) {
      geocoder.reverseGeocode(media.location.latitude, media.location.longitude, function (err, result) {
        var locationObject = processGeocodeResult(result);
        if (locationObject.country) { 
          media.location.country = locationObject.country;
        }
        app.extras.mongo.media.insert(media, function (err, docs) {
          if (err) app.extras.stathat.track("database error", 1);
          if (docs) app.extras.stathat.track("instagram - new media", docs.length);
        });
      });
    }
    else {
      if (!media.location) media.location = {};
      if (!media.location.country) media.location.country = '';
      app.extras.mongo.media.insert(media, function (err, docs) {
        if (err) app.extras.stathat.track("database error", 1);
        if (docs) app.extras.stathat.track("instagram - new media", docs.length);
      });
    }
  }
  
  function getCountryAndUpdate(document) {
    geocoder.reverseGeocode(document.location.latitude, document.location.longitude, function (err, result) {
      var locationObject = processGeocodeResult(result);
      if (locationObject.country) { 
        document.location.country = locationObject.country;
      }
      app.extras.mongo.media.update({_id: document._id}, document);
    });
  }
  
  function updateMediaTableWithCountries() {
    app.extras.mongo.media.find({}, function (err, docs) {
      for (var d in docs) {
        if (docs[d].location) { getCountryAndUpdate(docs[d]); }
      }
    });
  }
  
  function getNewMedia(tagName) {
    var minTagId = "instagram_media_min_id_"+tagName;

    app.extras.stathat.track("instagram - fetching media", 1);

    app.extras.redisClient.get(minTagId, function (err, my_min_id) {
      if (err) { 
        console.log("error on redis retrieval", err) 
        app.extras.stathat.track("redis error",1);
      }
      app.extras.Instagram.tags.recent({ name: tagName,
        min_id: my_min_id,
        complete: function (data, pagination) {
          if (pagination.min_tag_id) {
            app.extras.redisClient.set(minTagId, pagination.min_tag_id);
          }
          app.extras.stathat.track("instagram - media from API", data.length);
          for (var m in data) {
            getCountryAndInsert(data[m]);
          }
          //app.extras.mongo.media.insert(data);
          for (var i in data) {
            var tagList = [];
            for (var t in data[i].tags) {
              tagList.push({tag:data[i].tags[t]});
            }
            app.extras.mongo.tags.insert(tagList, function (err, docs) {
              if (err) app.extras.stathat.track("database error", 1);
              if (docs) app.extras.stathat.track("new tags", docs.length);
            });
          }
          if (data.length) {
            getNewMedia(tagName);
          }
        }
      });
    });
  }
  
  function subscribeToTag(tagName) {
    app.extras.Instagram.tags.subscribe({ 
      object_id: tagName,
      callback_url: app.config.appProtocol + "://" + app.config.appDomain + "/instagram/subscription/"+ tagName +"/callback"
    });
  }

  subscribeToTag("15sfest");

  app.get('/instagram/subscription/:tagname/callback', function (req,res) {
    res.send(req.query["hub.challenge"]);
    app.extras.stathat.track("instagram - new subscription",1);
  });
  
  app.post('/instagram/subscription/:tagname/callback', function (req,res) {
    for (var item in req.body) {
      req.body[item].created_at = new Date();
      req.body[item].tag = req.params.tagname;
    }
    app.extras.mongo.instagramSubscriptionUpdates.insert(req.body, function (err, docs) {
      if (err) {
        app.extras.stathat.track("database error",1);
      }
      if (docs){
        app.extras.stathat.track("instagram - subscription update",1);
        getNewMedia(req.params.tagname);
      }
    });
    res.send(req.query["hub.challenge"]);
  });
  
  app.get('/instagram/forceUpdate/:tagname/:min_tag', function (req, res) {
    getNewMedia(req.params.tagname, req.params.min_tag);
    res.send("OK");
  });
  
  app.get("/instagram/getCountries", function (req, res) {
    updateMediaTableWithCountries();
    res.send("OK");
  });
  

}