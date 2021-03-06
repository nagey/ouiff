/*jslint stupid:true, node:true */

var stathat = require("stathat");

function main() {
  'use strict';

  var express = require('express'),
    RedisStore = require('connect-redis')(express),
    redis = require('redis'),
    http = require('http'),
    path = require('path'),
    ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn,
    mongojs = require('mongojs'),
    fs = require('fs')/*,
    gzippo = require('gzippo')*/;


  var app = express();
  app.set('env', process.env.NODE_ENV || 'development');

  app.config = {};
  app.config.sessionSecret = 'sumoftwosquares';


  app.extras = {};
  app.extras.cookieParser = express.cookieParser(app.config.sessionSecret);
  app.extras.Instagram = require("instagram-node-lib");
  app.extras.passport = require('passport');
  app.extras.stathat = stathat;

  app.extras.twitter = {};
  app.extras.twitter.consumerKey = 'D8JARxxwjzdE2P65kws46A';
  app.extras.twitter.consumerSecret = '8XpcCNjE76iMNxnvNDiyeBiTaVexOFdtX8XtvRPU';

  app.extras.facebook = {};
  app.extras.facebook.appId = "191931704300142";
  app.extras.facebook.appSecret = "ae09cb72ff51543cee03ad32ffcb5f9c";

  app.extras.instagram = {};
  app.extras.instagram.clientId = '6527838fef5e4f0790a2aa7c9ddbc158';
  app.extras.instagram.clientSecret = '80d7a8a4247e498ab6df545f9c5806d2';

  app.extras.orion = {};
  app.extras.orion.listid = "81c5f38d6031ef48d1ee088b786626a7";
  app.extras.orion.clientId = "a84e30b65a3c2f4d70d631b3dd52163a";
  app.extras.orion.clientApiKey = "8884b359f9dff9ca9c65b5ced3832da2032292870f1f7aea";

  app.extras.user = {};
  app.extras.user.hasPermission = function (user, permission) {
    var hasPermission = false;
    if (!user.permissions) {
      return false;
    }
    if (typeof permission === "array") {
      permission.forEach(permission, function (element) {
        if (user.permissions.indexOf(element) > -1) {
          hasPermission = true;
        }
      });
    } else {
      if (user.permissions.indexOf(permission) > -1) {
        hasPermission = true;
      }
    }
    return hasPermission;
  }


  app.extras.redisClient = redis.createClient();
  app.extras.sessionStore = new RedisStore({
    client: app.extras.redisClient
  });

  app.extras.ensureLoggedIn = ensureLoggedIn;
  app.extras.passport = require('passport');

  var mongo = mongojs.connect('15sfest', ['instagramSubscriptionUpdates','users', 'media', 'tags', "ratings"]);
  mongo.users.ensureIndex({email:1}, {unique:false});
  mongo.users.ensureIndex({'facebook.id':1}, {unique:true, sparse:true});
  mongo.users.ensureIndex({'twitter.id':1}, {unique:true, sparse:true});
  mongo.media.ensureIndex({id:1}, {unique:true, sparse:true});
  mongo.tags.ensureIndex({tag:1}, {unique:true, sparse:true});
  mongo.ratings.ensureIndex({id:1, "rater.id":1}, {unique:true});
  app.extras.mongo = mongo;


  // CORS Config
  var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    if ('OPTIONS' === req.method) {
      res.send(200);
    }
    else {
      next();
    }
  };
  app.use(allowCrossDomain);
  // END CORS Config


  var serverPort, server;

  app.configure('production', function() {

    serverPort = 3000;
    server = http.createServer(app);

    app.config.appDomain = "15sfest.com";
    app.config.appProtocol = "http";
    app.use(express.logger('prod'));

  });

  app.configure('development', function(){
    app.use(express.errorHandler());
    server = http.createServer(app);

    app.config.appDomain = "15sfest.com";
    app.config.appProtocol = "http";
    app.use(express.logger('dev'));
  });

  app.configure(function(){
    app.set('port', process.env.PORT || serverPort || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.extras.cookieParser);
    app.use(express.session({
      store: app.extras.sessionStore
    }));
    app.use(app.extras.passport.initialize());
    app.use(app.extras.passport.session());
    app.use(app.router);
    app.use(require('stylus').middleware(__dirname + '/public'));
    app.use(express["static"](path.join(__dirname, 'public')));
    //app.use(gzippo.staticGzip(__dirname, 'public'));
    //app.use(gzippo.compress());
  });



  var routes = {};
  fs.readdirSync(__dirname+'/routes/').forEach(function(file){
    var route_fname = __dirname + '/routes/' + file;
    var route_name = path.basename(route_fname, '.js');
    if(route_name[0] !== "."){ 
      routes[route_name] = require(route_fname)(app);
    }
  });


  server.listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
  });
}

stathat.track = function (counter, amount, cb) {
  "use strict";
  if (!cb) {
   cb = function () {};
  }
  stathat.trackEZCount("15sfest@nagey.com", counter, amount, cb);
};


var cluster = require('cluster');
if (cluster.isMaster) {
  var forkIt = function (cpu, count) {
    "use strict";
    console.log("Forking new process for CPU "+count+" a "+cpu.model);
    cluster.fork();
  };

  var os = require('os');
  os.cpus().forEach(forkIt);
}
else {
  // NOTE: Only worker 1 will fire the instagram subscription, if worker 1 dies before this happens, no subscription :(
  console.log("Starting worker "+cluster.worker.id);
  main();
}

cluster.on('exit', function (worker) {
  "use strict";
  stathat.track("worker process died", 1);
  console.log('Worker ' + worker.id + ' died');
  cluster.fork();
});