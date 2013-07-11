/*global module, console, require */
module.exports = function (app) {
  'use strict';
  var Twit = require("twit");
  var FB = require("fb");
  
  var validateRating = function (rating) {
    if (!rating.review) {
      rating.review = "Check out this Film on #15sfest http://15sfest.com/social/watch/"+rating.id;
    }
    if (rating.review.indexOf("http://15sfest.com/social/watch/") === -1) {
      rating.review += " http://15sfest.com/social/watch/"+rating.id;
    }
    rating.score = parseInt(rating.score,10);
    return rating;
  };
  
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
          //ratingDocument.shares = ["facebook", "twitter"];
          //ratingDocument.review = "this video is great!";
          ratingDocument = validateRating(ratingDocument);
          var twitterCallback = function () {};
          var facebookCallback = function (res) { console.log(res); };
          console.log(req.user.tokens);
          if (ratingDocument.shares) {
            for (var network in ratingDocument.shares) {
              switch (ratingDocument.shares[network]) {
                case "facebook":
                  if (!req.user.tokens.facebook) break;
                  FB.setAccessToken(req.user.tokens.facebook[0]);
                  FB.api("/me/video.rates", 'post', {"rating:value": ratingDocument.score, "rating:scale": 5, "rating:normalized_value": ratingDocument.score*0.2, "review_text": ratingDocument.review, "movie": "http://15sfest.com/watch/"+ratingDocument.id}, facebookCallback);
                  // something
                  break;
                case "twitter":
                  if (!req.user.tokens.twitter) break;
                  var T = new Twit({
                    consumer_key: app.extras.twitter.consumerKey,
                    consumer_secret: app.extras.twitter.consumerSecret,
                    access_token: req.user.tokens.twitter[0],
                    access_token_secret: req.user.tokens.twitter[1]
                  });
                  T.post("/statuses/update", {status: ratingDocument.review}, twitterCallback);
                  //something else
                  break;
              }
            }
          }
          app.extras.mongo.ratings.insert(ratingDocument, function (err, docs) {
            if (err) app.extras.stathat.track("database error", 1);
            if (docs) app.extras.stathat.track("rating - new rating submitted", ratingDocument.score);
          });
          res.send({"status": "OK" });
        }
      });
    }
  });
};