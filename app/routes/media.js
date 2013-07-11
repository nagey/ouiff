/*global module, console */
module.exports = function (app) {
  "use strict";
  
  var resultDocument = { };
  
  var fetchAndSendMedia = function (query, res) {
    app.extras.mongo.media.find(query, resultDocument).sort({"created_time": -1}).limit(10, function (err,docs) {
      if (err) {
        res.status(500).send("Error: "+ err);
        app.extras.stathat.track("database error", 1);
      }
      else {
        res.send(docs);
      }
    });
  };
  
  var fetchAndSendTopMedia = function (query, res) {
    var aggregationOptions = [ 
      { $match: query },
      { $group: 
        { _id: "$id", 
        score: { $avg : "$score" }
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
      else {
        // Get Media IDs of Rated videos
        var mediaIds = docs.map(function (element) {
          return element._id;
        });
        app.extras.mongo.media.find({id:{$in: mediaIds}}, function (err, media) {
          if (err) {
            app.extras.stathat.track("database error", 1);
            res.status(500).send("Error: "+err);
          }
          else {
            var mediaObj = {};
            media.forEach(function (element) {
              mediaObj[element.id] = element;
            });
            docs.forEach(function (element, index, array) {
              if (mediaObj[element._id]) {
                mediaObj[element._id].score = element.score; 
                array[index] = mediaObj[element._id];
              }
            });
            res.send(docs);
          }
        });
      }
    });
  };
  
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
    fetchAndSendTopMedia({}, res);
  });
  
  app.get("/media/tag", function (req, res) {
    app.extras.stathat.track("tags - fetch list", 1);
    var tagCounter = [
      {
        "$unwind" : "$tags"
      },
      {
        "$group" : {
          "_id" : "$tags",
          "number" : {
            "$sum" : 1
          }
        }
      }
    ];
    app.extras.mongo.media.aggregate(tagCounter, function (err, docs) {
      if (err) {
        console.log(err);
        app.extras.stathat.track("database error", 1);
        res.status(500).send("database error");
      }
      else res.send(docs);
    });
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
    app.extras.stathat.track("media - fetch for user",1);
    var queryUser = req.params.queryUser + '';
    var userType = "user.";
    userType += (Number(queryUser) === parseInt(queryUser,10)) ? "id" : "username";
    var queryDoc = {};
    queryDoc[userType] = req.params.queryUser;
    
    fetchAndSendMedia(queryDoc, res);
  });

  app.get("/media/:medium", function(req, res){
    app.extras.stathat.track("media - fetch media", 1);
    app.extras.mongo.media.find({id: req.params.medium}, function (err,docs) {
      if (err) {
        res.status(500).send("Error: ", err, docs);
        app.extras.stathat.track("database error", 1);
      }
      else if (docs.length === 1) {
        res.send(docs[0]);
      }
      else {
        res.status(404).send({status: "Not Found"});
      }
    });
  });
  
  //return media;*/
  
};
