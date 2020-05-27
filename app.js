const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const bcrypt = require('bcrypt');
const passport = require("passport");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const cookieSession = require("cookie-session");

var app = express();

require("./config/passport")();

// Db setup
mongoose.connect('mongodb://localhost:27017/myPassportDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.set("useCreateIndex", true);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
    cookieSession({
      maxAge: 14400,
      keys: ["HELLODEARLPEOPLEFROMYOUTUBE"]
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(cookieParser());

  app.use("/", indexRouter);
app.use("/users", usersRouter);

// Deployed on Heroku
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Server started at port: ${port}`);
});
