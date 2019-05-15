function isLoggedIn(req, res, next) {
    //топовая проверка на допуск юзера до страницы 
    if (req.isAuthenticated()) return next();
    res.redirect('/sign_In');
}

module.exports = {
    isLoggedIn
};
