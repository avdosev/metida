const authController = require('../controllers/service.js');
const {
    userCreateValidator,
    userLoginValidator
} = require('../services/validator');
const bodyParser = require('body-parser');

// загрузка/выгрузка стате
const {
    pushArticleToSQL,
    getArticleFromSQL
} = require('../controllers/article.js');

//  проверка логирования
const { isLoggedIn } = require('../controllers/logged.js');

// подгрузка публик файлов
const { getFile } = require('../controllers/get.js');

const { logRequest } = require('../controllers/debug');

const initAuthControllers = (app, passport) => {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    const urlencodedParser = bodyParser.urlencoded({ extended: false });

    app.get('/', authController.index);
    app.get('/register', authController.register);
    app.get('/signin', authController.signin);
    app.get('/home', isLoggedIn, authController.home);
    app.get('/createArticle', /*isLoggedIn,*/ authController.createArticle);
    app.get('/logout', authController.logout);
    app.get('/post/:id', getArticleFromSQL, authController.articles);
    app.get('/public/:filefolder/:filename', logRequest, getFile);

    app.post(
        '/createArticle',
        urlencodedParser /*отправить на модерацию */,
        pushArticleToSQL
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
