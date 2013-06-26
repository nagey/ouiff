module.exports = function (app) {
  "use strict";
  
  var LocalStrategy = require('passport-local').Strategy;
  var FacebookStrategy = require('passport-facebook').Strategy;
  var TwitterStrategy = require('passport-twitter').Strategy;
  var InstagramStrategy = require('passport-instagram').Strategy;
  
  var ObjectId = require("mongojs").ObjectId;
  
  
  var fetchOrCreateUser = function (profile, done) {
    var selectorString = "socialProfiles." + profile.provider + ".id";
    var queryObject = {};
    queryObject[selectorString] = profile.id;
    app.extras.mongo.users.find(queryObject, function (err, docs) {
      if (err) {
        done(err,null);
        return;
      }
      if (docs.length === 1) done(null, docs[0]);
      else if (docs.length > 1) done("Contact Support", null);
      else {
        var userObject = {};
        userObject.socialProfiles = {};
        userObject.socialProfiles[profile.provider] = profile;
        if (profile.provider == "instagram") {
          userObject.instagramConnected = true;
        }
        app.extras.mongo.users.insert(userObject, function (err, docs) {
          if (err) {
            done(err, null);
          }
          else {
            done(null, docs[0]);
          }
        });
      }
    });
  } 
  
  // Setup Instagram
  app.extras.passport.use(new InstagramStrategy({
      clientID: app.extras.instagram.clientId,
      clientSecret: app.extras.instagram.clientSecret,
      callbackURL: app.config.appProtocol+"://"+app.config.appDomain+"/auth/instagram/callback"
    },
    function (accessToken, refeshToken, profile, done) {
      fetchOrCreateUser(profile, done);
    }
  ));
  
  
  // Setup Facebook
  app.extras.passport.use(new FacebookStrategy({
      clientID:     app.extras.facebook.appId,
      clientSecret: app.extras.facebook.appSecret,
      callbackURL:  app.config.appProtocol+"://"+app.config.appDomain+"/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      var userRecord = {
        facebook: profile,
        email: profile.emails[0].value,
        displayName: profile.displayName
      };
      userRecord.facebook.accessToken = accessToken;
      userRecord.facebook.refreshToken = refreshToken;
      User.findOrCreate(userRecord, function (user) {
        done(null, user);
      });
    }
  ));
  
  
  // Setup Twitter
  app.extras.passport.use(new TwitterStrategy({
      consumerKey: app.extras.twitter.consumerKey,
      consumerSecret: app.extras.twitter.consumerSecret,
      callbackURL: app.config.appProtocol+"://"+app.config.appDomain+"/auth/twitter/callback"
    },
    function(token, tokenSecret, profile, done) {
      var userRecord = {
        twitter: profile,
        displayName: profile.displayName
      }
      userRecord.twitter.token = token;
      userRecord.twitter.tokenSecret = tokenSecret;
      User.findOrCreate(userRecord, function (user) {
        done(null, user);
      });
    }
  ));
  
  
  // User to Session & Back
  app.extras.passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  app.extras.passport.deserializeUser(function(id,done) {
    console.log('deserializing user', id);
    app.extras.mongo.users.find({"_id":ObjectId(id)}).toArray(function(err,docs) {
      done('',docs[0]);
    });
  });
  
  //Authentication Routes
  app.get('/auth/facebook', app.extras.passport.authenticate('facebook', {scope: ['email']}));
  app.get('/auth/facebook/callback', 
    app.extras.passport.authenticate('facebook', 
      { 
        successReturnToOrRedirect: '/auth/success',
        failureRedirect: '/auth/failed' 
      })
    );


  app.get('/auth/twitter', app.extras.passport.authenticate('twitter'));
  app.get('/auth/twitter/callback', 
    app.extras.passport.authenticate('twitter', 
      { 
        successReturnToOrRedirect: '/auth/success',
        failureRedirect: '/auth/failed' 
      })
  );
  
  app.get('/auth/instagram', app.extras.passport.authenticate('instagram'));
  app.get('/auth/instagram/callback', 
    app.extras.passport.authenticate('instagram', 
      { 
        successReturnToOrRedirect: '/auth/success',
        failureRedirect: '/auth/failed' 
      })
  );
  
  app.get("/auth/failed", function (req, res) {
    res.status(401).send("Authentication Failed");
  });
  
  app.get("/auth/success", function (req, res) {
    res.send(req.user);
  });
  
};