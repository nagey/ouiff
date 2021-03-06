/*global module, require, console */
/*jslint sub:true */
module.exports = function (app) {
  "use strict";
  
  var FacebookStrategy = require('passport-facebook').Strategy;
  var TwitterStrategy = require('passport-twitter').Strategy;
  var InstagramStrategy = require('passport-instagram').Strategy;
  
  var ObjectId = require("mongojs").ObjectId;
  
  var validator = require("validator");
  
  var http = require("http");

  var subscribeToOrionList = function (userObject) {
    try {
      validator.check(userObject.email).isEmail();
      
      var options = {
        hostname: 'api.createsend.com',
        port: 80,
        path: '/api/v3/subscribers/' + app.extras.orion.listId + '.xml',
        method: 'POST'
      };

      var postBody = {
        "EmailAddress" : userObject.email,
        "Name" : userObject.displayName
      };

      var req = http.request(options, function(res) {
        if (res.statusCode === 200) {
          app.extras.stathat.track("email subscription new user", 1);
        }
        else {
          app.extras.stathat.track("email subscription error", 1);
        }
      });

      req.on('error', function() {
        app.extras.stathat.track("email subscription api error", 1);
      });

      req.write(postBody);
      req.end();
    }
    catch (e) {
      return;
    }
  };
  
  var createOrUpdateUser = function (req, profile, done, token1, token2) {
    var userObject;
    if (!req.user) {
      userObject = {};
      userObject.socialProfiles = {};
      userObject.profileList = [];
    }
    else {
      userObject = JSON.parse(JSON.stringify(req.user));
      userObject._id = new ObjectId(userObject._id);
      if (!userObject.profileList) {
        userObject.profileList = [];
      }
    }
    userObject.tokens = userObject.tokens || {};
    userObject.tokens[profile.provider] = [token1, token2];
    userObject.socialProfiles[profile.provider] = profile;
    if (userObject.profileList.indexOf(profile.provider) === -1) {
      userObject.profileList.push(profile.provider);
    }
    console.log(userObject.profileList.indexOf(profile.provider), profile.provider);
    switch (profile.provider) {
      case 'instagram':
        userObject.instagramConnected = true;
        if (!userObject.username) {
          userObject.username = profile._json.data.username;
        }
        if (!userObject.displayName) {
          userObject.displayName = profile._json.data.name;
        }
        if (!userObject.profilePicture) {
          userObject.profilePicture = profile._json.data.profile_picture;
        }
        if (!userObject.website) {
          userObject.website = profile._json.data.website;
        }
        if (!userObject.bio) {
          userObject.bio = profile._json.data.bio;
        }
        break;
      case 'facebook':
        if (!userObject.username) {
          userObject.username = profile._json.username;
        }
        if (!userObject.displayName) {
          userObject.displayName = profile._json.name;
        }
        if (!userObject.gender) {
          userObject.gender = profile._json.gender;
        }
        if (!userObject.email) {
          userObject.email = profile._json.email;
        }
        if (!userObject.hometown) {
          userObject.hometown = profile._json.hometown.name;
        }
        if (!userObject.location) {
          userObject.location = profile._json.location.name;
        }
        break;
      case 'twitter':
        if (!userObject.username) {
          userObject.username = profile._json.screen_name;
        }
        if (!userObject.displayName) {
          userObject.displayName = profile._json.name;
        }
        if (!userObject.profilePicture) {
          userObject.profilePicture = profile._json.profile_image_url;
        }
        if (!userObject.website) {
          userObject.website = profile._json.url;
        }
        if (!userObject.bio) {
          userObject.bio = profile._json.description;
        }
        if (!userObject.location) {
          userObject.location = profile._json.location;
        }
        break;
    }
    
    var mongoCallback = function (err, docs) {
      if (err) {
        done(err, null);
        app.extras.stathat.track("database error", 1);
        app.extras.stathat.track("user - "+ profile.provider+" - database error", 1);
      }
      else {
        if (typeof docs === "Array") {
          done(null, docs[0]);
        }
        else {
          done(null, userObject);
        }
      }
    };
        
    if (req.user) {
      if ((!req.user.socialProfiles[profile.provider]) || ((req.user.socialProfiles[profile.provider]) && (req.user.socialProfiles[profile.provider]._raw !== userObject.socialProfiles[profile.provider]._raw))) {
        //console.log("req.user: ",JSON.stringify(req.user));
        //console.log("userObject: ", JSON.stringify(userObject));
        if (!req.user.socialProfiles[profile.provider]) {
          app.extras.stathat.track("user - "+ profile.provider+" - connection to existing user", 1);
        }
        else {
          app.extras.stathat.track("user - "+ profile.provider+" - profile update", 1);
        }
        app.extras.mongo.users.update({_id: req.user._id}, userObject, mongoCallback);
        if (!req.user.email && userObject.email) {
          subscribeToOrionList(userObject);
        }
      }
      else {
        console.log("User Object unchanged");
        if ((!req.user.tokens) || (!req.user.tokens[profile.provider]) || (req.user.tokens[profile.provider][0] != token1) || (req.user.tokens[profile.provider][1] != token2)) {
          req.user.tokens = req.user.tokens || {};
          req.user.tokens[profile.provider] = [token1, token2];
          var providerTokens = "tokens."+profile.provider;
          var updateDocument = {$set: {}};
          updateDocument["$set"][providerTokens] = [token1, token2];
          app.extras.mongo.users.update({_id: req.user._id}, updateDocument);
        }
        done(null, userObject);
      }
    }
    else {
        app.extras.stathat.track("user - "+ profile.provider+" - new user registration", 1);
        app.extras.mongo.users.insert(userObject, mongoCallback);
        if (userObject.email) {
          subscribeToOrionList(userObject);
        }
    }
    
  };
  
  var fetchOrCreateUser = function (req, profile, done, token1, token2) {
    if (req.user) {
      createOrUpdateUser(req, profile, done, token1, token2);
    }
    else {
      var selectorString = "socialProfiles." + profile.provider + ".id";
      var queryObject = {};
      queryObject[selectorString] = profile.id;
      app.extras.mongo.users.find(queryObject, function (err, docs) {
        if (err) {
          app.extras.stathat.track("user - "+ profile.provider+" - database error on find", 1);
          app.extras.stathat.track("database error", 1);
          done(err,null);
          return;
        }
        if (docs.length === 1) {
          app.extras.stathat.track("user - "+ profile.provider+" - successful login", 1);
          if ((!docs[0].tokens) || (docs[0].tokens[profile.provider][0] !== token1) || (docs[0].tokens[profile.provider][1]) !== token2) {
            var providerTokens = "tokens."+profile.provider;
            var updateDocument = {$set: {}};
            updateDocument["$set"][providerTokens] = [token1, token2];
            app.extras.mongo.users.update({_id: docs[0]._id}, updateDocument);
          }
          done(null, docs[0]);
        }
        else if (docs.length > 1) {
          app.extras.stathat.track("user - "+ profile.provider+" - multiple users found", 1);
          app.extras.stathat.track("database error", 1);
          done("Contact Support", null);
        }
        else {
          createOrUpdateUser(req, profile, done, token1, token2);
        }
      });
    }
  }; 
  
  // Setup Instagram
  app.extras.passport.use(new InstagramStrategy({
      clientID: app.extras.instagram.clientId,
      clientSecret: app.extras.instagram.clientSecret,
      callbackURL: app.config.appProtocol+"://"+app.config.appDomain+"/auth/instagram/callback",
      passReqToCallback: true
    },
    function (req, accessToken, refreshToken, profile, done) {
      fetchOrCreateUser(req, profile, done, accessToken, refreshToken);
    }
  ));
  
  
  FacebookStrategy.prototype.autorizationParams = function () {
    return {display: "popup"};
  };
  
  // Setup Facebook
  app.extras.passport.use(new FacebookStrategy({
      clientID:     app.extras.facebook.appId,
      clientSecret: app.extras.facebook.appSecret,
      callbackURL:  app.config.appProtocol+"://"+app.config.appDomain+"/auth/facebook/callback",
      passReqToCallback: true
    },
    function (req, accessToken, refreshToken, profile, done) {
      fetchOrCreateUser(req, profile, done, accessToken, refreshToken);
    }
  ));
  
  
  // Setup Twitter
  app.extras.passport.use(new TwitterStrategy({
      consumerKey: app.extras.twitter.consumerKey,
      consumerSecret: app.extras.twitter.consumerSecret,
      callbackURL: app.config.appProtocol+"://"+app.config.appDomain+"/auth/twitter/callback",
      passReqToCallback: true
    },
    function (req, token, tokenSecret, profile, done) {
      fetchOrCreateUser(req, profile, done, token, tokenSecret);
    }
  ));
  
  var trackLogin = function (service, status) {
    return function (req, res, next) {
      app.extras.stathat.track("login - "+ service+" - "+status, 1);  
      next();
    };
  };
  
  
  // User to Session & Back
  app.extras.passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  app.extras.passport.deserializeUser(function(id,done) {
    console.log('deserializing user', id);
    app.extras.mongo.users.find({"_id":new ObjectId(id)}).toArray(function(err,docs) {
      done('',docs[0]);
    });
  });
  
  //Authentication Routes
  app.get('/auth/facebook', trackLogin("facebook", "start"), app.extras.passport.authenticate('facebook', {scope: ['email', 'publish_actions']}));
  app.get('/auth/facebook/callback', trackLogin("facebook", "complete"), 
    app.extras.passport.authenticate('facebook', 
      { 
        successReturnToOrRedirect: '/auth/success',
        failureRedirect: '/auth/failed' 
      })
    );


  app.get('/auth/twitter', trackLogin("twitter", "start"), app.extras.passport.authenticate('twitter'));
  app.get('/auth/twitter/callback', trackLogin("twitter", "complete"),
    app.extras.passport.authenticate('twitter', 
      { 
        successReturnToOrRedirect: '/auth/success',
        failureRedirect: '/auth/failed' 
      })
  );
  
  app.get('/auth/instagram', trackLogin("instagram", "start"), app.extras.passport.authenticate('instagram'));
  app.get('/auth/instagram/callback', trackLogin("instagram", "complete"),
    app.extras.passport.authenticate('instagram', 
      { 
        successReturnToOrRedirect: '/auth/success',
        failureRedirect: '/auth/failed' 
      })
  );
  
  app.post("/auth/setEmail", function (req, res) {
    try {
      validator.check(req.body.email).isEmail();
      req.user.email = req.body.email;
      subscribeToOrionList(req.user);
      if (req.user) {
        app.extras.mongo.users.update({_id: req.user._id}, {$set: {"email": req.body.email}}, function (err, docs) {
          console.log(err,docs);
        });
        res.send({"success": true});
      }
    }
    catch (e) {
      console.log(e);
    }
    res.redirect("/auth/success");
  });
  
  app.get("/auth/failed", function (req, res) {
    app.extras.stathat.track("login - failure", 1);  
    res.status(401).send("Authentication Failed");
  });
  
  app.get("/auth/success", function (req, res) {
    app.extras.stathat.track("login - success", 1);
    if (req.user) {
      var sanitizedUser = req.user;
      delete sanitizedUser.socialProfiles;
      if (req.user.email) {
        res.render("auth-success", { user: sanitizedUser });
      }
      else {
        res.render("auth-getEmail");
      }
    }
    else {
      res.redirect("/");
    }
  });

  var prepareUser = function (user, safe) {
    user.socialLinks = {};
    if (user.socialProfiles.twitter) {
      user.socialLinks.twitter = "http://twitter.com/" + user.socialProfiles.twitter.username;
    }
    if (user.socialProfiles.facebook) {
      user.socialLinks.facebook = user.socialProfiles.facebook.profileUrl;
    }
    if (user.socialProfiles.instagram) {
      user.socialLinks.instagram = "http://instagram.com/" + user.socialProfiles.instagram.username;
    }
    delete user.socialProfiles;
    if (!safe) {
      delete user.tokens;
      delete user.providerTokens;
    }
    
    return user;
  };
  
  app.get("/auth/status", function (req, res) {
    if (req.user) {
      res.send({"status": true, "user": prepareUser(req.user, true)});
    }
    else {
      res.send({"status": false});
    }
  });

  app.get("/auth/status/:userId", function (req, res) {
    app.extras.mongo.users.find({username: req.params.userId}, function (err, docs) {
      console.log(err,docs);
      if (err) {
        app.extras.stathat.track("user - database error on find", 1);
        app.extras.stathat.track("database error", 1);
        res.status(500).send({"status": "db error"});
      }
      else if (docs.length > 1) {
        app.extras.stathat.track("user - multiple users found", 1);
        app.extras.stathat.track("database error", 1);
        res.status(500).send({"status": "db error"});
      }
      else if (docs.length === 0) {
        res.send({"status": "maybe", "user" : {"username" : req.params.userId}});
      }
      else {
        var user = prepareUser(docs[0]);
        res.send({"status": true, "user": user});
      }
    });
  });
  
  app.get("/auth/logout", function (req, res) {
    req.logout();
    res.send("OK");
  });
  
};