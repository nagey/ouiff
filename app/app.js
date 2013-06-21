'use strict';

var express = require('express')
  , RedisStore = require('connect-redis')(express)
  , https = require('https')
  , http = require('http')
  , path = require('path')
  , socket = require('socket.io')
  , passportSocketIo = require("passport.socketio")
  , ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn
  , mongojs = require('mongojs')
  , fs = require('fs')
  , Instagram = require("instagram-node-lib");


var app = express();
app.set('env', process.env.NODE_ENV || 'development');

app.config = {};
app.config.sessionSecret = 'sumoftwosquares';



app.extras = {};
app.extras.cookieParser = express.cookieParser(app.config.sessionSecret);
app.extras.sessionStore = new RedisStore();
app.extras.ensureLoggedIn = ensureLoggedIn;
app.extras.passport = require('passport');

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

  app.config.appDomain = "localhost:3000";
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


server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});



/*Instagram.set('client_id', '6527838fef5e4f0790a2aa7c9ddbc158');
Instagram.set('client_secret', '80d7a8a4247e498ab6df545f9c5806d2');

Instagram.tags.info({
  name: '15sfest',
  complete: function(data){
    console.log(data);
  }
});

var tagName = '15sfest';
Instagram.tags.subscribe({ 
  object_id: tagName,
  callback_url: "http://15sfest.com/instagram/callback?tag=" + tagName 
});*/
