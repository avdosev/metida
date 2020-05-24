import express from 'express';

import * as Handler from '../controllers/request_handler/index.js';
import * as Response from '../controllers/respondent.js';

import {
    userCreateValidator,
    userLoginValidator,
    articleValidator
} from '../services/validator.js';
import {verifyToken} from "../controllers/logged.js";

// тут будет нормальное REST API

export default () => {
    const router = express.Router();

    // -- ARTICLES API -- 
    
    router.get('/post/:id', Handler.getArticle, Response.jsonValue('article'));
    router.put('/post/:id', Handler.updateArticle, Response.jsonValuesWith(['success']))
    router.delete('/post/:id', verifyToken, /* проверка на владельца статьи или админа */ Handler.removeArticle, Response.jsonValuesWith(['success']))
    router.post('/article', verifyToken, articleValidator, /* отправить на модерацию */ Handler.pushArticle, Response.redirectToArticle);
    
    router.get('/top', Handler.getTopArticles, Response.jsonValue('TopArticles'))
    
    // - COMMENTS API - по идее это часть апи предыдущего но я решил вынести это в отдельный блочок
    // я из будущего: и правильно сделал
    
    router.get ('/post/:id/comments', Handler.getComments, Response.jsonValue("comments"));
    router.post('/post/:id/comments', verifyToken, Handler.pushComment, Response.jsonValuesWith(['success']));
    router.put ('/post/:id/comments');

    router.get('/author/:login', Handler.getUserInfo, Response.jsonValue('userInfo') );
    

    return router
}