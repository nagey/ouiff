module.exports = function (app) {
  'use strict';
  
  app.post("/rate/:media_id", function (req, res) {
    app.extras.mongo.media.find({id: req.params.media_id}, function (err, docs) {
      if (docs.length != 1) {
        res.status(404).send("Could not find specified media");
        app.extras.stathat.track("rating - rating on invalid media", 1);
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
          created_at: new Date()
        };
        app.extras.mongo.ratings.insert(ratingDocument, function (err, docs) {
          if (err) app.extras.stathat.track("database error", 1);
          if (docs) app.extras.stathat.track("rating - new rating submitted", 1);
        });
        res.send({"status": "OK" });
      }
    });
  });
};