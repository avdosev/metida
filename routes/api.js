const express = require('express');
const router = express.Router();

// тут будет нормальное REST API

module.exports = () => {

    // -- ARTICLES API -- 
    
    router.get('/post/:id', Handler.getArticle, Response.jsonValue('article'));
    router.put('/post/:id', Handler.updateArticle, Response.jsonValuesWith(['success']))
    router.delete('/post/:id', loggedCheker, /* проверка на владельца статьи или админа */ Handler.removeArticle, Response.jsonValuesWith(['success']))
    router.post('/article', isLoggedIn, articleValidator, /* отправить на модерацию */ Handler.pushArticle, Response.redirectToArticle);
    
    router.get('/top', Handler.getTopArticles, Response.jsonValue('TopArticles'))
    
    // - COMMENTS API - по идее это часть апи предыдущего но я решил вынести это в отдельный блочок
    // я из будущего: и правильно сделал
    
    router.get ('/post/:id/comments', urlencodedParser, Handler.getComments, Response.jsonValue("comments"));
    router.post('/post/:id/comments', isLoggedIn, urlencodedParser, Handler.pushComment, Response.jsonValuesWith(['success']));
    router.put ('/post/:id/comments')
    

    return router
}