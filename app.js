import * as path from 'path';

import express from 'express';
const app = express();
import passport from 'passport';
import session from 'express-session';
import favicon from 'serve-favicon';

import models from './database/models/index.js';


import initAuthControllers from './routes/index.js';
import loadPassportStrategies from './controllers/users.js';
import config from "./config/index.js";
const { port, imgDir, mainDir } = config;

async function start() {
    console.log('Workspace initialization...');

    // For Passport
    app.use(
        session({
            secret: config.secretKey,
            resave: true,
            saveUninitialized: true
        })
    ); // session secret
    app.use(passport.initialize()); //возможно, нужно чистить сессии
    app.use(passport.session()); // persistent login sessions

    app.set('views', './views');
    app.set('views', path.join(mainDir, 'views'));
    app.set('view engine', 'pug');

    app.use(favicon(path.join(imgDir, 'logo.ico')));

    //app.use(logRequest); // логирование всех (или тех что никак не обработались) запросов

    initAuthControllers(app, passport);
    loadPassportStrategies(passport);

    console.log('Connect to Database...');
    try {
        await models.sequelize.sync();
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