const register = (req, res ) => {
    res.render('register', { authorised: req.isAuthenticated() });
};

const signin = (req, res ) => {
    res.render('sign_In', { authorised: req.isAuthenticated() });
};

const createArticle = (req, res) => {
    res.render('create_article', { authorised: req.isAuthenticated() });
};

const home = (req, res ) => {
    res.render('home', { authorised: req.isAuthenticated() });
};

const showArticle = (req, res ) => {
    res.render('post', {
        authorised: req.isAuthenticated(),
        name: res.values.article.header,
        text: res.values.article.content,
        id:   res.values.article.id
    });
};

const logout = (req, res ) => {
    req.session.destroy(err => {
        res.redirect('/');
    });
};

const index = (req, res ) => {
    res.render('index', {
        authorised: req.isAuthenticated()
    });
};

const errorPage = (req, res ) => {
    res.render('error_page');
};

const freshCurrentPage = (req,res,next) => {
    let currentUrl = req.url;
    if ( req.url.indexOf("pushComment") != -1) { //т.е. мы только что запушили коммент и нам надо катиться назад, на*уй
        currentUrl = req.url.slice(0, currentUrl.lastIndexOf('/')); // это выглядит оч странно
    }
    console.log('fresh current page to url: ', currentUrl)
    res.redirect(currentUrl)
    
};

const authorProfile = (req, res ) => {
    console.log(req.values)
    res.render('profile', { authorised: req.isAuthenticated() });
}


module.exports = {
    register,
    signin,
    home,
    createArticle,
    errorPage,
    index,
    showArticle,
    logout,
    freshCurrentPage,
    authorProfile
};
