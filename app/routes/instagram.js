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
            }
          }
        }
      }
    }
    return locationObject;
  }
  
  function getCountryAndInsert(media) {
    geocoder.reverseGeocode(media.location.latitude, media.location.longitude, function (err, result) {
      var locationObject = processGeocodeResult(result);
      if (locationObject.country) { 
        media.location.country = locationObject.country;
      }
      app.extras.mongo.media.insert(media);
    });
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

    console.log("getting media for ",tagName);

    app.extras.redisClient.get(minTagId, function (err, my_min_id) {
      if (err) { console.log("error on redis retrieval", err) }
      app.extras.Instagram.tags.recent({ name: tagName,
        min_id: my_min_id,
        complete: function (data, pagination) {
          if (pagination.min_tag_id) {
            app.extras.redisClient.set(minTagId, pagination.min_tag_id);
          }
          for (var m in data) {
            getCountryAndInsert(data[m]);
          }
          //app.extras.mongo.media.insert(data);
          for (var i in data) {
            var tagList = [];
            for (var t in data[i].tags) {
              tagList.push({tag:data[i].tags[t]});
            }
            app.extras.mongo.tags.insert(tagList);
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
    console.log("Query", req.query);
    console.log("Parameters", req.params);
    res.send(req.query["hub.challenge"]);
  });
  
  app.post('/instagram/subscription/:tagname/callback', function (req,res) {
    console.log("Query", req.query);
    console.log("Parameters", req.params);
    console.log("Body", req.body);
    for (var item in req.body) {
      req.body[item].created_at = new Date();
      req.body[item].tag = req.params.tagname;
    }
    app.extras.mongo.instagramSubscriptionUpdates.insert(req.body, function (err, docs) {
      if (err) console.log("error on mongo insert", err);
      if (docs){
        console.log("inserted instagram API subscription call", docs);
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