import express from 'express'
import config from '../config/index.ts';

import {
    userCreateValidator,
    userLoginValidator,
    articleValidator
} from '../services/validator.js';

import bodyParser from 'body-parser'
import cors from 'cors'
import compression from 'compression';


import Handler from '../controllers/request_handler.js';
import * as Response from '../controllers/respondent.js';


import ApiRouterCreator from './api.js';
import {registrationUser, signinUser} from "../controllers/users.js";
import {verifyToken, sendSuccess} from "../controllers/logged.js";
import {initClientControllers} from "./client.js"

const ApiRouter = ApiRouterCreator();

const initAuthControllers = (app) => {
    app.use(cors());
    app.use(compression());

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    const urlencodedParser = bodyParser.urlencoded({ extended: false });

    // -- API --


    app.use('/api', ApiRouter);

    if (process.env.NODE_ENV === 'production') {
        initClientControllers(app)
    }

    // -- ARTICLES API -- 
    
    app.get('/post/:id/non_parsed', Handler.getArticle, Response.jsonValue('article'));
    app.post('/post/:id/update', Handler.updateArticle, Response.jsonValuesWith(['success']))
    app.post('/post/:id/delete', verifyToken, /* проверка на владельца статьи или админа */ Handler.removeArticle, Response.jsonValuesWith(['success']))
    app.post('/top', urlencodedParser, Handler.getTopArticles, Response.jsonValue('TopArticles'))
    app.post('/createArticle', verifyToken, urlencodedParser, articleValidator, /* отправить на модерацию */  Handler.pushArticle, Response.redirectToArticle);
    
    // - COMMENTS API - по идее это часть апи предыдущего но я решил вынести это в отдельный блочок
    
    app.get('/post/:id/comments', urlencodedParser, Handler.getComments, Response.jsonValue("comments"));
    app.post('/post/:id/pushComment', verifyToken, urlencodedParser, Handler.pushComment, Response.jsonValuesWith(['success']));
    
    // -- FILE API --

    app.use('/public',  express.static(config.mainDir + '/public' ));

    // -- EMAIL API -- // TO DO

    app.post("/emailConfirmed/:email", /*сделать get запрос на /emailMessage*/ /*отправить полученный хтмл в сообщении*/  /*изменить в бд подтвержение емейла на тру*/ ) //это кнопочка из сообщения
    app.get("/emailMessage", Response.renderPage.emailMessage) // нужно только для того, чтобы проверить как будет выглядить сообщение(и запросить с этой странице его текст)
    app.get("/emailConfirmed/:email", Response.renderPage.emailConfirmed) //для того, чтобы пользователь увидел успешное сообщение
    
    // -- (L)USERS API --

    app.post('/register', urlencodedParser, userCreateValidator, registrationUser);

    app.post('/sign_In', urlencodedParser, userLoginValidator, signinUser);

    app.post('/isAuth', urlencodedParser, verifyToken, sendSuccess)


};

export default initAuthControllers;
