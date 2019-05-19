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

    app.get('/', urlencodedParser, Response.renderPage.index);
    app.get('/register', Response.renderPage.register);
    app.get('/sign_In', Response.renderPage.signin);
    app.get('/home', isLoggedIn, Response.renderPage.home);
    app.get('/createArticle', isLoggedIn, Response.renderPage.createArticle);
    app.get('/logout', Response.renderPage.logout);
    app.get('/post/:id/', Handler.getArticle, Response.renderPage.article);
    app.get('/author/:login', Response.renderPage.authorProfile )

    // -- ARTICLES API -- 
    
    app.get('/post/:id/non_parsed', Handler.getArticle, Response.jsonValuesWith(['article']));
    app.post('/post/:id/update', Handler.updateArticle, Response.jsonValuesWith(['success']))
    app.post('/post/:id/delete', loggedCheker, /* проверка на владельца статьи или админа */ Handler.removeArticle, Response.jsonValuesWith(['success']))
    app.post('/top', urlencodedParser, Handler.getTopArticles, Response.jsonValuesWith(["TopArticles"]))

    // - COMMENTS API - по идее это часть апи предыдущего но я решил вынести это в отдельный блочок
    
    app.get('/post/:id/comments', urlencodedParser, Handler.getComments, Response.jsonValuesWith(["comments"]));
    app.post('/post/:id/pushComment', isLoggedIn, urlencodedParser, Handler.pushComment, Response.jsonValuesWith(['success']));
    
    // -- FILE API --

    app.get('/public/:filefolder/:filename', Handler.getFile, getFile);

    // -- EMAIL API -- // TO DO

    app.post("/emailConfirmed/:email", /*сделать get запрос на /emailMessage*/ /*отправить полученный хтмл в сообщении*/  /*изменить в бд подтвержение емейла на тру*/ ) //это кнопочка из сообщения
    app.get("/emailMessage", Response.renderPage.emailMessage) // нужно только для того, чтобы проверить как будет выглядить сообщение(и запросить с этой странице его текст)
    app.get("/emailConfirmed/:email", Response.renderPage.emailConfirmed) //для того, чтобы пользователь увидел успешное сообщение
    
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
        urlencodedParser, Debug.logRequest,
        userCreateValidator,
        passport.authenticate('local-signup', {
            successRedirect: '/',
            failureRedirect: '/register'
        })
    );

    app.post(
        '/sign_In', 
        urlencodedParser, Debug.logRequest,
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
