const path = require("path");
const express = require("express");
const app = express();
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");
const models = require("./models");


const { loadPasportStrategies } = require("./controllers/users");
const { initAuthControllers } = require("./routes/main.js");
const { logRequest } = require("./debug.js");

const port = 7080;

// For BodyParser
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

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


app.use(logRequest); // логирование всех (или тех что никак не обработались) запросов

const authRoute = initAuthControllers(app, passport);

loadPasportStrategies(passport, models.user);

//Sync Database
models.sequelize
  .sync()
  .then(function() {
    console.log("Nice! Database looks fine");
  })
  .catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!");
  });

app.listen(port, function(err) {
  if (!err) console.log("Server started on " + port + " port");
  else console.log(err);
});
