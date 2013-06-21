

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
    res.send(req.query["hub.challenge"]);
  });
  

}