const express = require('express');
const router = express.Router();

const Handler = require('../controllers/request_handler')
const Response = require('../controllers/respondent')

const {
    userCreateValidator,
    userLoginValidator,
    articleValidator
} = require('../services/validator');

//  проверка логирования
const { loggedCheker } = require('../controllers/logged.js');

// тут будет нормальное REST API

module.exports = () => {

    // -- ARTICLES API -- 
    
    router.get('/post/:id', Handler.getArticle, Response.jsonValue('article'));
    router.put('/post/:id', Handler.updateArticle, Response.jsonValuesWith(['success']))
    router.delete('/post/:id', loggedCheker, /* проверка на владельца статьи или админа */ Handler.removeArticle, Response.jsonValuesWith(['success']))
    router.post('/article', loggedCheker, articleValidator, /* отправить на модерацию */ Handler.pushArticle, Response.redirectToArticle);
    
    router.get('/top', Handler.getTopArticles, Response.jsonValue('TopArticles'))
    
    // - COMMENTS API - по идее это часть апи предыдущего но я решил вынести это в отдельный блочок
    // я из будущего: и правильно сделал
    
    router.get ('/post/:id/comments', Handler.getComments, Response.jsonValue("comments"));
    router.post('/post/:id/comments', loggedCheker, Handler.pushComment, Response.jsonValuesWith(['success']));
    router.put ('/post/:id/comments');

    router.get('/author/:login', Handler.getUserInfo, Response.jsonValue('userInfo') );
    

    return router
}