

module.exports = function (app) {
  "use strict";
  
  app.get('/instagram/subscription/callback', function(req,res) {
  		res.send("foo");
  	});
}