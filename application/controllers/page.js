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

const article = (req, res ) => {
    res.render('post', {
        authorised: req.isAuthenticated(),
        name: res.values.article.header,
        disclaimer: res.values.article.disclaimer,
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

const authorProfile = (req, res ) => {
    res.render('profile', { authorised: req.isAuthenticated(), userInfo: res.values.userInfo });
};

const errorPage = (req, res ) => {
    res.render('error_page');
};

const emailMessage = (req, res ) => {
    res.render('email_message');
}

const emailConfirmed = (req, res ) => {
    res.render('email_confirmed');
}


export {
    register,
    signin,
    home,
    createArticle,
    errorPage,
    index,
    article,
    logout,
    authorProfile,
    emailMessage,
    emailConfirmed  
};
