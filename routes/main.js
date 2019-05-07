const authController = require('../controllers/service.js');
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
    getTopArticles
} = require('../controllers/article.js');

const {
    pushCommentToSQL,
    getCommentsFromSQL
} = require('../controllers/comments.js');

//  проверка логирования
const { isLoggedIn } = require('../controllers/logged.js');

// подгрузка публик файлов
const { getFile } = require('../controllers/get.js');

const { logRequest } = require('../controllers/debug');

const initAuthControllers = (app, passport) => {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    const urlencodedParser = bodyParser.urlencoded({ extended: false });

    app.get('/', urlencodedParser, getTopArticles, authController.index);
    app.get('/register', authController.register);
    app.get('/signin', authController.signin);
    app.get('/home', isLoggedIn, authController.home);
    app.get('/createArticle', /*isLoggedIn,*/ authController.createArticle);
    app.get('/logout', authController.logout);
    app.get('/post/:id', getArticleFromSQL, authController.articles);
    app.get('/post/:id/comments', getCommentsFromSQL);
    app.get('/public/:filefolder/:filename', logRequest, getFile);
    app.get('/top', urlencodedParser, getTopArticles, (req, res) => {
        res.json(res.articles);
        
        console.log(res.articles[0].header);
        console.log(res.articles[0].disclaimer);

    })

    app.post('/post/:id/pushComment', urlencodedParser, pushCommentToSQL)
    

    app.post(
        '/createArticle',
        urlencodedParser,
        articleValidator, 
        /* отправить на модерацию */
        pushArticleToSQL,
        (req, res) => {
            res.render('success_page') // Не обязательно это
        }//не верно, роутим на /post/:id
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
        '/signin',
        urlencodedParser,
        userLoginValidator,
        passport.authenticate('local-signin', {
            successRedirect: '/',
            failureRedirect: '/signin',
            failureFlash: true
        })
    );
};

module.exports = {
    initAuthControllers
};
