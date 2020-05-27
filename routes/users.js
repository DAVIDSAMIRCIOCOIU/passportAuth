const express = require("express");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

/* GET users listing. */
router.get("/login", function(req, res, next) {
    res.render("login");
  });

  /* GET users listing. */
router.post("/login", function(req, res, next) {
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/users/login"
    })(req, res, next);
  });

  // Register
  router.get("/register", (req, res, next) => {
    res.render('register');
  });

router.post('/register', (req, res) => {
  const user = new User({
    username: req.body.email,
    password: req.body.password
  });
  // Encrypt pw
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      if (err) return next(err);
      user.password = hash; 
      // Store user
      user.save((err) => {
        if(!err) {
          console.log("User saved: " + user);
          res.redirect("/users/login");
        } else {
          console.log(err);
        }
      });
    });
  });

  
});
  
  module.exports = router;