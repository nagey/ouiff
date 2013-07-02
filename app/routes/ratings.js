module.exports = function (app) {
  'use strict';
  var Twit = require("twit");
  var FB = require("fb");
  
  app.post("/rate/:media_id", function (req, res) {
    if (!req.user) {
      app.extras.stathat.track("rating - user not logged in");
      res.send({"status": "Not Logged In"});
    }
    else {
      app.extras.mongo.media.find({id: req.params.media_id}, function (err, docs) {
        if (docs.length != 1) {
          app.extras.stathat.track("rating - rating on invalid media", 1);
          res.status(404).send("Could not find specified media");
        }
        else {
          var foundMedia = docs[0];
          var ratingDocument = {
            id: foundMedia.id,
            tags: foundMedia.tags,
            author: {username: foundMedia.user.username, id: foundMedia.user.id },
            rater: { username: req.user.username, id: req.user._id},
            score: req.body.score,
            review: req.body.review,
            shares: req.body.shares,
            created_at: new Date()
          };
          if (ratingDocument.shares) {
            for (var network in ratingDocument.shares) {
              switch (ratingDocument.shares[network]) {
                case "facebook":
                  FB.setAccessToken(req.user.tokens.facebook[0]);
                  FB.api("/me/video.rates", 'post', {"rating:value": ratingDocument.score, "rating:scale": 5, "rating:normalized_value": ratingDocument.score*.2, "review_text": ratingDocument.review, "movie": "http://15sfest.com/watch/"+ratingDocument.id}, function (res) { console.log(res); });
                  // something
                  break;
                case "twitter":
                  var T = new Twit({
                    consumer_key: app.twitter.consumerKey,
                    consumer_secret: app.twitter.consumerSecret,
                    access_token: req.user.tokens.twitter[0],
                    access_token_secret: req.user.tokens.twitter[1]
                  });
                  T.post("/statuses/update", {status: ratingDocument.review});
                  //something else
                  break;
              }
            }
          }
          app.extras.mongo.ratings.insert(ratingDocument, function (err, docs) {
            if (err) app.extras.stathat.track("database error", 1);
            if (docs) app.extras.stathat.track("rating - new rating submitted", 1);
          });
          res.send({"status": "OK" });
        }
      });
    }
  });
};