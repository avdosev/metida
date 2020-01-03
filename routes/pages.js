const express = require('express');
const router = express.Router();

const Handler = require('../controllers/request_handler')
const Response = require('../controllers/respondent')


const { isLoggedIn } = require('../controllers/logged.js');

module.exports = () => {
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
    router.get('/google06214f17a13757ad.html', Response.renderPage.googleSuccess)

    return router
};