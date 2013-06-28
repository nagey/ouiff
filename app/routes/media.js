module.exports = function (app) {
  "use strict"
  
  var media = {};
  
  var resultDocument = { };
  
  function fetchAndSendMedia(query, res) {
    app.extras.mongo.media.find(query, resultDocument).sort({"created_time": -1}).limit(10, function (err,docs) {
      if (err) {
        res.status(500).send("Error: "+ err);
        app.extras.stathat.track("database error", 1);
      }
      else res.send(docs);
    });
  }
  
  function fetchAndSendTopMedia(query, res) {
    var aggregationOptions = [ 
      { $match: query },
      { $group: 
        { _id: "$id", 
        score: { $avg : "$score" },
        }
      },
      { $sort: { score: -1 } },
      { $limit: 10 }
    ];
    console.log(aggregationOptions);
    app.extras.mongo.ratings.aggregate(aggregationOptions, function (err, docs) {
      if (err) {
        app.extras.stathat.track("database error", 1);
        res.status(500).send("Error: "+err);
      }
      else res.send(docs);
    });
  }
  
  app.get("/media", function(req, res){
    app.extras.stathat.track("media - fetch all", 1);
    fetchAndSendMedia({},res);
    
  });

  app.get("/media/featured", function (req, res) {
    app.extras.stathat.track("media - fetch featured", 1);
    fetchAndSendMedia({featured: true}, res);
  });

  app.get("/media/top", function (req,res) {
    app.extras.stathat.track("media - fetch top", 1);
    // Leaving this sending all media until we get some things with ratings
    //fetchAndSendTopMedia({}, res);
    fetchAndSendMedia({}, res);
  });
  
  app.get("/media/tag/:tag", function (req, res) {
    app.extras.stathat.track("media - fetch "+req.params.tag, 1);
    var queryDoc = {
      tags: req.params.tag
    };
    fetchAndSendMedia(queryDoc, res);
  });
  
  app.get("/media/tag/:tag/top", function (req, res) {
    var queryDoc = {
      tags: req.params.tag
    };
    fetchAndSendTopMedia(queryDoc, res);
  });

  app.get("/media/user/:queryUser", function (req, res) {
    app.extras.stathat.track("media - fetch for user "+req.params.queryUser, 1);
    var queryUser = req.params.queryUser + '';
    var userType = "user.";
    userType += (Number(queryUser) === parseInt(queryUser)) ? "id" : "username";
    var queryDoc = {};
    queryDoc[userType] = req.params.queryUser;
    
    fetchAndSendMedia(queryDoc, res);
  });

  app.get("/media/:medium", function(req, res){
    app.extras.stathat.track("media - fetch media "+req.params.medium, 1);
    app.extras.mongo.media.find({id: req.params.medium}, function (err,docs) {
      if (err) {
        res.status(500).send("Error: ", err, docs);
        app.extras.stathat.track("database error", 1);
      }
      else if (docs.length === 1) {
        res.send(docs[0]);
      }
      else {
        res.status(404).send({status: "Not Found"})
      }
    });
  });
  
  //return media;*/
  
};
