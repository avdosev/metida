var flash = require('connect-flash');

const path = require("path");
const express = require("express");
const app = express();
const passport = require("passport");
const session = require("express-session");
const models = require("./models");

app.use(flash());

const { initAuthControllers } = require("./routes/main.js");
const { loadPasportStrategies } = require("./controllers/users");
const { port, imgDir } = require("./config/server.js");



// For Passport
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


//For Handlebars
app.set("views", "./views");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

const favicon = require('serve-favicon');
app.use(favicon(path.join(imgDir, 'favicon.ico')));

//app.use(logRequest); // логирование всех (или тех что никак не обработались) запросов

const authRoute = initAuthControllers(app, passport);
loadPasportStrategies(passport, models.user);
  
  
models.sequelize
  .sync()
  .then( () => {
    console.log("Nice! Database looks fine");
  })
  .catch( (err) => {
    console.log("Something went wrong with the Database Update!");
  });


app.listen(port, (err) => {
  if (!err) 
    console.log("Server started on " + port + " port");
  else 
    console.log("Server not started");
});