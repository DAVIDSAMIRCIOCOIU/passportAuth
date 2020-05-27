var express = require("express");
var router = express.Router();

function checkUserSession(req, res, next) {
    if (!req.user) {
      res.redirect("/users/login");
    }
    else if(req.isAuthenticated()) {
      next();
    }
  }

/* GET home page. */
router.get("/", checkUserSession, function(req, res, next) {
    res.render('homepage');
    next();
  });

  module.exports = router;