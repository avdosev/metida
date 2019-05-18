function redirectToArticle(req, res, next) {
    // по идее этого здесь быть не должно но тогда сервак станет еще более модульным что не совсем хорошо так что пусть будет здесь
    if (!res.values.SuccessPushArticle) {
        res.render('error_page')
        return ;
    }
    const id = res.values.article.id
    const url = `/post/${id}`
    res.redirect(url)
}

function jsonArticle(req, res) {
    if (res.values.article)
        res.json(res.values.article)
    else {
        res.statusCode = 404;
        res.send('not found')
    }
}

function jsonValuesWith(arr) {
    return function(req, res) {
        const obj = new Object;
        for (let i = 0; i < arr.length; i++) {
            const key = arr[i]
            if (res.values.hasOwnProperty(key)) {
                obj[key] = res.values[key]
            }
        }
        res.json(obj)
    }
}

const renderPage = require('./page');

module.exports = {
    redirectToArticle,
    jsonArticle,
    renderPage,
    jsonValuesWith
};