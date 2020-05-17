export function isLoggedIn(req, res, next) {
    //топовая проверка на допуск юзера до страницы 
    if (req.isAuthenticated()) return next();
    res.redirect('/sign_In');
}

export function loggedCheker(req, res, next) {
    if (req.isAuthenticated()) return next();
    
    res.statusCode = 401
    res.json({
        message: 'you are not logged'
    })
}
