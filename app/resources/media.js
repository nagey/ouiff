module.exports = function (app) {
  "use strict"
  
  var media = {};
  
  media.index = function(req, res){
    app.extras.mongo.media.find({}, {id: 1}, function (err, docs) {
      if (err) {
        res.status(500).send("Error: err");
      }
      else {
        res.send(docs);
      }
      
    });
  };

  media.show = function(req, res){
    app.extras.mongo.media.find({id: req.params.medium}, function (err,docs) {
      if (err) {
        res.status(500).send("Error: err");
      }
      else if (docs.length === 1) {
        res.send(docs[0]);
      }
      else {
        res.status(404).send({status: "Not Found"})
      }
    });
  };
  
  return media;
  
};
