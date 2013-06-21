

module.exports = function (app) {
  "use strict";
  
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
          mongo.media.insert(data);
          if (data.length) {
            getNewMedia(tagName);
          }
        }
      });
    });
  }
    
  app.get('/instagram/subscription/:tagname/callback', function(req,res) {
    console.log("Query", req.query);
    console.log("Parameters", req.params);
    res.send(req.query["hub.challenge"]);
  });
  
  app.post('/instagram/subscription/:tagname/callback', function(req,res) {
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
    })
    res.send(req.query["hub.challenge"]);
  });
  

}