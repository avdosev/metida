import path from 'path';

import express from 'express';
import session from 'express-session';

import models from './database/models/index.js';


import initAuthControllers from './routes/index.js';
import { port, mainDir, secretKey } from './config/index.js';

async function start() {
    console.log('Workspace initialization...');
    
    const app = express();
    // For Passport
    app.use(
        session({
            secret: secretKey,
            resave: true,
            saveUninitialized: true
        })
    ); // session secret


    app.set('views', './views');
    app.set('views', path.join(mainDir, 'views'));
    app.set('view engine', 'pug');


    //app.use(logRequest); // логирование всех (или тех что никак не обработались) запросов

    initAuthControllers(app);

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
        await app.listen(port);
        console.log('Server started on ' + port + ' port');
    } catch (err) {
        console.log(`Server not started with error: ${err}`);
    }
}

start().catch(console.error);