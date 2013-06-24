'use strict';

var express = require('express')
  , RedisStore = require('connect-redis')(express)
  , redis = require('redis')
  , https = require('https')
  , http = require('http')
  , path = require('path')
  , socket = require('socket.io')
  , passportSocketIo = require("passport.socketio")
  , ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn
  , mongojs = require('mongojs')
  , Resource = require('express-resource')
  , fs = require('fs');


var app = express();
app.set('env', process.env.NODE_ENV || 'development');

app.config = {};
app.config.sessionSecret = 'sumoftwosquares';


app.extras = {};
app.extras.cookieParser = express.cookieParser(app.config.sessionSecret);
app.extras.Instagram = require("instagram-node-lib");

app.extras.Instagram.set('client_id', '6527838fef5e4f0790a2aa7c9ddbc158');
app.extras.Instagram.set('client_secret', '80d7a8a4247e498ab6df545f9c5806d2');


app.extras.redisClient = redis.createClient();
app.extras.sessionStore = new RedisStore({
  client: app.extras.redisClient
});

app.extras.ensureLoggedIn = ensureLoggedIn;
app.extras.passport = require('passport');

var mongo = mongojs.connect('15sfest', ['instagramSubscriptionUpdates','users', 'media', 'tags']);
mongo.users.ensureIndex({email:1}, {unique:false});
mongo.users.ensureIndex({'facebook.id':1}, {unique:true, sparse:true});
mongo.users.ensureIndex({'twitter.id':1}, {unique:true, sparse:true});
mongo.media.ensureIndex({id:1}, {unique:true, sparse:true});
mongo.tags.ensureIndex({tag:1}, {unique:true, sparse:true});
app.extras.mongo = mongo;


// CORS Config
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}
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
    store: app.extras.sessionStore,
  }));
  app.use(app.extras.passport.initialize());
  app.use(app.extras.passport.session());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});



var routes = {};
fs.readdirSync(__dirname+'/routes/').forEach(function(file){
  var route_fname = __dirname + '/routes/' + file;
  var route_name = path.basename(route_fname, '.js');
  if(route_name[0] !== "."){ 
    routes[route_name] = require(route_fname)(app);
  }
});

var resources = {};
fs.readdirSync(__dirname+'/resources/').forEach(function(file){
  var resource_fname = __dirname + '/resources/' + file;
  var resource_name = path.basename(resource_fname, '.js');
  if(resource_name[0] !== "."){ 
    app.resource(resource_name, require(resource_fname)(app));
    //resources[resource_name] = require(resource_fname)(app);
  }
});

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});





