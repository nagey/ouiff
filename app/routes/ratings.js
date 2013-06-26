module.exports = function (app) {
  'use strict';
  
  app.post("/rate/:media_id", function (req, res) {
    app.extras.mongo.media.find({id: req.params.media_id}, function (err, docs) {
      if (docs.length != 1) {
        res.status(404).send("Could not find specified media");
      }
      else {
        var foundMedia = docs[0];
        var ratingDocument = {
          id: foundMedia.id,
          tags: foundMedia.tags,
          author: {username: foundMedia.user.username, id: foundMedia.user.id },
          //rater: { username: req.user.username, id: req.user.id},
          score: req.body.score,
          review: req.body.review,
          created_at: new Date()
        };
        app.extras.mongo.ratings.insert(ratingDocument);
        res.send({"status": "OK" });
      }
    });
  });
};