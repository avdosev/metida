import express from 'express';

import * as Handler from '../controllers/request_handler/index.js';
import * as Response from '../controllers/respondent.js';


import { isLoggedIn } from '../controllers/logged.js';

export default function() {
    const router = express.Router();
    router.get('/', Response.renderPage.index);
    router.get('/register', Response.renderPage.register);
    router.get('/sign_In', Response.renderPage.signin);
    router.get('/home', isLoggedIn, Response.renderPage.home);
    router.get('/createArticle', isLoggedIn, Response.renderPage.createArticle);
    router.get('/logout', Response.renderPage.logout);
    router.get('/post/:id/', Handler.getArticle, Response.renderPage.article);
    router.get('/author/:login', Handler.getUserInfo, Response.renderPage.authorProfile );
    router.get('/offline', (req, res) => {
        res.render('offline')
    });

    return router
};