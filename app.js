const path = require('path');
const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const favicon = require('serve-favicon');
const models = require('./database/models');


const { initAuthControllers } = require('./routes/main.js');
const { loadPasportStrategies } = require('./controllers/users');
const config = require("./config")
const { port, imgDir } = config;
// For Passport
app.use(
    session({ secret: config.secretKey, resave: true, saveUninitialized: true })
); // session secret
app.use(passport.initialize()); //возможно, нужно чистить сессии
app.use(passport.session()); // persistent login sessions

app.set('views', './views');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(imgDir, 'logo.ico')));

//app.use(logRequest); // логирование всех (или тех что никак не обработались) запросов

initAuthControllers(app, passport);
loadPasportStrategies(passport, models.user);

models.sequelize
    .sync()
    .then(() => {
        console.log('Nice! Database looks fine');
    })
    .catch(err => {
        console.log('Something went wrong with the Database Update!');
        console.log("Crashed with error: "+ err)
    });

app.listen(port, err => {
    if (!err) console.log('Server started on ' + port + ' port');
    else console.log('Server not started');
});


module.exports = app
