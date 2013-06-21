

module.exports = function (app) {
  "use strict";
    
  app.get('/instagram/subscription/:tagname/callback', function(req,res) {
    console.log("Query", req.query);
    console.log("Parameters", req.params);
    res.send(req.query["hub.challenge"]);
  });
  
  app.post('/instagram/subscription/:tagname/callback', function(req,res) {
    console.log("Query", req.query);
    console.log("Parameters", req.params);
    console.log("Body", req.body);
    req.body.created_at = new Date();
    req.body.tag = req.params.tagname;
    app.extras.mongo.instagramSubscriptionUpdates.insert(req.body, function (err, docs) {
      if (err) console.log("error on mongo insert", err);
      if (docs) console.log("inserted instagram API subscription call", docs);
    })
    res.send(req.query["hub.challenge"]);
  });
  

}