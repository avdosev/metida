const path = require("path");
const express = require("express");
const app = express();
const passport = require("passport");
const session = require("express-session");
const models = require("./models");

const port = 7080;

// For Passport
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


//For Handlebars
app.set("views", "./views");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

const favicon = require('serve-favicon');
app.use(favicon(path.join(__dirname,'public','img','favicon.ico')));


const authRoute = require("./routes/main.js")(app, passport);

require("./controllers/users")(passport, models.user);

models.sequelize
  .sync()
  .then(function() {
    console.log("Nice! Database looks fine");
  })
  .catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!");
  });


app.listen(port, (err) => {
  if (!err) 
    console.log("Server started on " + port + " port");
  else 
    console.log(err);
});
