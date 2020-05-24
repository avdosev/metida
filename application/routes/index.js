import express from 'express'
import config from '../config/index.js';

import {
    userCreateValidator,
    userLoginValidator,
    articleValidator
} from '../services/validator.js';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const bodyParser = require('body-parser');
const cors = require('cors');

import * as Handler from '../controllers/request_handler/index.js';
import * as Response from '../controllers/respondent.js';

//  проверка логирования
import { isLoggedIn, loggedCheker } from '../controllers/logged.js';

import ApiRouterCreator from './api.js';
import {registrationUser, signinUser} from "../controllers/users.js";

const ApiRouter = ApiRouterCreator();

const initAuthControllers = (app) => {
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    const urlencodedParser = bodyParser.urlencoded({ extended: false });

    // -- API --

    app.use('/api', ApiRouter);



    // -- ARTICLES API -- 
    
    app.get('/post/:id/non_parsed', Handler.getArticle, Response.jsonValue('article'));
    app.post('/post/:id/update', Handler.updateArticle, Response.jsonValuesWith(['success']))
    app.post('/post/:id/delete', loggedCheker, /* проверка на владельца статьи или админа */ Handler.removeArticle, Response.jsonValuesWith(['success']))
    app.post('/top', urlencodedParser, Handler.getTopArticles, Response.jsonValue('TopArticles'))
    app.post('/createArticle', isLoggedIn, urlencodedParser, articleValidator, /* отправить на модерацию */ Handler.pushArticle, Response.redirectToArticle);
    
    // - COMMENTS API - по идее это часть апи предыдущего но я решил вынести это в отдельный блочок
    
    app.get('/post/:id/comments', urlencodedParser, Handler.getComments, Response.jsonValue("comments"));
    app.post('/post/:id/pushComment', isLoggedIn, urlencodedParser, Handler.pushComment, Response.jsonValuesWith(['success']));
    
    // -- FILE API --

    app.use('/public',  express.static(config.mainDir + '/public' ));

    // -- EMAIL API -- // TO DO

    app.post("/emailConfirmed/:email", /*сделать get запрос на /emailMessage*/ /*отправить полученный хтмл в сообщении*/  /*изменить в бд подтвержение емейла на тру*/ ) //это кнопочка из сообщения
    app.get("/emailMessage", Response.renderPage.emailMessage) // нужно только для того, чтобы проверить как будет выглядить сообщение(и запросить с этой странице его текст)
    app.get("/emailConfirmed/:email", Response.renderPage.emailConfirmed) //для того, чтобы пользователь увидел успешное сообщение
    
    // -- (L)USERS API --

    app.post(
        '/register',
        urlencodedParser,
        userCreateValidator,
        registrationUser
        // passport.authenticate('local-signup', {
        //     successRedirect: '/',
        //     failureRedirect: '/register'
        // }),
    );

    app.post(
        '/sign_In',
        urlencodedParser,
        userLoginValidator,
        signinUser

        // passport.authenticate('local-signin', {
        //     successRedirect: '/',
        //     failureRedirect: '/sign_In'
        // })
    );


};

export default initAuthControllers;
