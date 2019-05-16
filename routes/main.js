const {
    userCreateValidator,
    userLoginValidator,
    articleValidator
} = require('../services/validator');

const bodyParser = require('body-parser');

// загрузка/выгрузка стате
const {
    pushArticleToSQL,
    getArticleFromSQL,
    getTopArticles,
    updateArticle, 
    removeArticle
} = require('../controllers/article.js');

const {
    pushCommentToSQL,
    getCommentsFromSQL
} = require('../controllers/comments.js');

const Handler = require('../controllers/request_handler.js')
const Respondent = require('../controllers/respondent.js')

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

    app.get('/', urlencodedParser, Respondent.index);
    app.get('/register', Respondent.register);
    app.get('/sign_In', Respondent.signin);
    app.get('/home', isLoggedIn, Respondent.home);
    app.get('/createArticle', isLoggedIn, Respondent.createArticle);
    app.get('/logout', Respondent.logout);
    app.get('/post/:id/', Handler.getArticleId, getArticleFromSQL, Respondent.showArticle);
    app.get('/author/:login', Respondent.authorProfile )

    // -- ARTICLES API -- 
    
    app.get('/post/:id/non_parsed', Handler.getArticleId, getArticleFromSQL, Respondent.jsonArticle);
    // app.post('/post/:id/update', Handler.getArticle) // TODO
    app.post('/post/:id/delete', loggedCheker, Handler.getArticleIdWithAuthor, removeArticle, Respondent.responseSuccess)
    app.get('/top', urlencodedParser, Handler.getTopArticle, getTopArticles, Respondent.getTopArticles)

    // - COMMENTS API - по идее это часть апи предыдущего но я решил вынести это в отдельный блочок
    
    app.get('/post/:id/comments', urlencodedParser, Handler.getComments, getCommentsFromSQL, Respondent.getComments);
    app.post('/post/:id/pushComment', isLoggedIn, urlencodedParser, Handler.pushComment, 
        Debug.logRequestValues, pushCommentToSQL, Respondent.freshCurrentPage
    );
    
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
        pushArticleToSQL,
        Respondent.redirectToArticle
    );
    
    app.post(
        '/register',
        urlencodedParser,
        userCreateValidator,
        passport.authenticate('local-signup', {
            successRedirect: '/',
            failureRedirect: '/register',
            failureFlash:true
        })
    );

    app.post(
        '/sign_In',
        urlencodedParser,
        userLoginValidator,
        passport.authenticate('local-signin', {
            successRedirect: '/',
            failureRedirect: '/sign_In',
            failureFlash: true
        })
    );
};

module.exports = {
    initAuthControllers
};
