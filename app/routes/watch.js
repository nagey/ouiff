/*global module */
module.exports = function (app) {
  app.get("/social/watch/:media", function (req, res) {
    app.extras.stathat.track("social watch", 1);  
    app.extras.mongo.media.find({id: req.params.media}, function (err, docs) {
      if (err) {
        app.extras.stathat.track("db error", 1);
        res.redirect("http://15sfest.com");
      }
      else {
        res.render("watch", { media: docs[0] });      
      }
    });
  });
  
};