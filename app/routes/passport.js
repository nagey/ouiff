module.exports = function (app) {
  "use strict";
  
  var LocalStrategy = require('passport-local').Strategy;
  var FacebookStrategy = require('passport-facebook').Strategy;
  var TwitterStrategy = require('passport-twitter').Strategy;
  var InstagramStrategy = require('passport-instagram').Strategy;
  
  var ObjectId = require("mongojs").ObjectId;
  
  var createOrUpdateUser = function (req, profile, done) {
    if (!req.user) {
      var userObject = {};
      userObject.socialProfiles = {};
    }
    else {
      userObject = req.user;
    }
    userObject.socialProfiles[profile.provider] = profile;
    switch (profile.provider) {
      case 'instagram':
        userObject.instagramConnected = true;
        if (!userObject.username) userObject.username = profile._json.data.username;
        if (!userObject.displayName) userObject.displayName = profile._json.data.name;
        if (!userObject.profilePicture) userObject.profilePicture = profile._json.data.profile_picture;
        if (!userObject.website) userObject.website = profile._json.data.website;
        if (!userObject.bio) userObject.bio = profile._json.data.bio;
        break;
      case 'facebook':
        if (!userObject.username) userObject.username = profile._json.username;
        if (!userObject.displayName) userObject.displayName = profile._json.name;
        if (!userObject.gender) userObject.gender = profile._json.gender;
        if (!userObject.email) userObject.email = profile._json.email;
        if (!userObject.hometown) userObject.hometown = profile._json.hometown.name;
        if (!userObject.location) userObject.location = profile._json.location.name;
        break;
      case 'twitter':
        if (!userObject.username) userObject.username = profile._json.screen_name;
        if (!userObject.displayName) userObject.displayName = profile._json.name;
        if (!userObject.profilePicture) userObject.profilePicture = profile._json.profile_image_url;
        if (!userObject.website) userObject.website = profile._json.url;
        if (!userObject.bio) userObject.bio = profile._json.description;
        if (!userObject.location) userObject.location = profile._json.location;
        break;
    }
    
    var mongoCallback = function (err, docs) {
      if (err) {
        done(err, null);
      }
      else {
        if (typeof docs == "Array") done(null, docs[0]);
        else done(null, userObject);
      }
    }
    
    if (req.user) {
      app.extras.mongo.users.update({_id: req.user._id}, userObject, mongoCallback);
    }
    else {
      app.extras.mongo.users.insert(userObject, mongoCallback);
    }
    
  }
  
  var fetchOrCreateUser = function (req, profile, done) {
    if (req.user) {
      createOrUpdateUser(req, profile, done);
    }
    else {
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
          createOrUpdateUser(req, profile, done);
        }
      });
    }
  } 
  
  // Setup Instagram
  app.extras.passport.use(new InstagramStrategy({
      clientID: app.extras.instagram.clientId,
      clientSecret: app.extras.instagram.clientSecret,
      callbackURL: app.config.appProtocol+"://"+app.config.appDomain+"/auth/instagram/callback",
      passReqToCallback: true
    },
    function (req, accessToken, refeshToken, profile, done) {
      fetchOrCreateUser(req, profile, done);
    }
  ));
  
  
  // Setup Facebook
  app.extras.passport.use(new FacebookStrategy({
      clientID:     app.extras.facebook.appId,
      clientSecret: app.extras.facebook.appSecret,
      callbackURL:  app.config.appProtocol+"://"+app.config.appDomain+"/auth/facebook/callback",
      passReqToCallback: true
    },
    function (req, accessToken, refreshToken, profile, done) {
      fetchOrCreateUser(req, profile, done);
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
      fetchOrCreateUser(req, profile, done);
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
    var sanitizedUser = req.user;
    delete sanitizedUser.socialProfiles;
    res.send(req.user);
  });
  
};