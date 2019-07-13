const path = require('path');
const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const favicon = require('serve-favicon');
const models = require('./database/models');


const { initAuthControllers } = require('./routes');
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

async function start() {
    console.log('Connect to Database...')
    try {
        await models.sequelize.sync()
        console.log('Nice! Database looks fine');
    } catch (err) {
        console.log(`
        Something went wrong with the Database Update!\n
        Crashed with error: ${err}
        `)
    }

    try {
        await app.listen(port)
        console.log('Server started on ' + port + ' port');
    } catch (err) {
        console.log(`Server not started with error: ${err}`);
    }
}

start().catch(console.error);

module.exports = app
