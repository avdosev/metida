register = (req, res, next) => {
    res.render('register', { authorised: req.isAuthenticated() });
};

signin = (req, res, next) => {
    res.render('signin', { authorised: req.isAuthenticated() });
};

createArticle = (req, res, next) => {
    res.render('create_article', { authorised: req.isAuthenticated() });
};

home = (req, res, next) => {
    res.render('home', { authorised: req.isAuthenticated() });
};

articles = (req, res, next) => {
    res.render('post', {
        authorised: req.isAuthenticated(),
        name: res.article.header,
        text: res.article.content
    });
};

logout = (req, res, next) => {
    req.session.destroy(err => {
        res.redirect('/');
    });
};

index = (req, res, next) => {
    res.render('index', {
        authorised: req.isAuthenticated(),
        countOfArticles: 2, ///////////////////////////////FIX 
        header: res.articles[0].header,
        disclaimer: res.articles[0].disclaimer
    });
};

errorPage = (req, res, next) => {
    res.render('error_page');
};

module.exports = {
    register,
    signin,
    home,
    createArticle,
    errorPage,
    index,
    articles,
    logout
};
