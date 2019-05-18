const {
    userCreateValidator,
    userLoginValidator,
    articleValidator
} = require('../services/validator');

const bodyParser = require('body-parser');

const Handler = require('../controllers/request_handler')
const Response = require('../controllers/respondent')

//  проверка логирования
const { isLoggedIn, loggedCheker } = require('../controllers/logged.js');

// подгрузка публик файлов
const { getFile } = require('../controllers/get.js');

const Debug = require('../controllers/debug');

const initAuthControllers = (app, passport) => {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    const urlencodedParser = bodyParser.urlencoded({ extended: false });

    // -- PAGES --

    app.get('/', urlencodedParser, Response.index);
    app.get('/register', Response.register);
    app.get('/sign_In', Response.signin);
    app.get('/home', isLoggedIn, Response.home);
    app.get('/createArticle', isLoggedIn, Response.createArticle);
    app.get('/logout', Response.logout);
    app.get('/post/:id/', Handler.getArticle, Response.showArticle);
    app.get('/author/:login', Response.authorProfile )

    // -- ARTICLES API -- 
    
    app.get('/post/:id/non_parsed', Handler.getArticle, Response.jsonArticle);
    // app.post('/post/:id/update', тут тоже чекаем Handler.getArticle) // TODO
    app.post('/post/:id/delete', loggedCheker, /* проверка на владельца статьи или админа */ Handler.removeArticle, Response.responseSuccess)
    app.post('/top', urlencodedParser, Handler.getTopArticles, Response.getTopArticles)

    // - COMMENTS API - по идее это часть апи предыдущего но я решил вынести это в отдельный блочок
    
    app.get('/post/:id/comments', urlencodedParser, Handler.getComments, Response.getComments);
    app.post('/post/:id/pushComment', isLoggedIn, urlencodedParser, Handler.pushComment, Response.freshCurrentPage);
    
    // -- FILE API --

    app.get('/public/:filefolder/:filename', Handler.getFile, getFile);
    
    // -- (L)USERS API --
    
    app.post(
        '/createArticle',
        isLoggedIn,
        urlencodedParser,
        articleValidator,
        /* отправить на модерацию */
        Handler.pushArticle,
        Response.redirectToArticle
    );
    
    app.post(
        '/register',
        urlencodedParser,
        userCreateValidator,
        passport.authenticate('local-signup', {
            successRedirect: '/',
            failureRedirect: '/register'
        })
    );

    app.post(
        '/sign_In',
        urlencodedParser,
        userLoginValidator,
        passport.authenticate('local-signin', {
            successRedirect: '/',
            failureRedirect: '/sign_In'
        })
    );
};

module.exports = {
    initAuthControllers
};
