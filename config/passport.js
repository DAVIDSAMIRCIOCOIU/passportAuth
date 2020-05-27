const passport = require("passport");
const bcrypt = require('bcrypt');
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

module.exports = function() {
    passport.use(
      new LocalStrategy({ usernameField: "email" }, function(
        email,
        password,
        done
      ) {
        User.findOne({ username: email }, function(err, user) {
          console.log(user);
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, { message: "Incorrect username." });
          }
          // Decrypt password
          bcrypt.compare(password, user.password, function(err, res) {
            if (err) return done(err);
            if (res === false) {
              return done(null, false, { message: 'Incorrect password.' });
            } else {
              return done(null, user);
            }
          });
        });
      })
    );
    
    // serializer
    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });
  
    passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
        done(err, user);
      });
    });
  };
  