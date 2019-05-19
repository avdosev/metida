function redirectToArticle(req, res, next) {
    // по идее этого здесь быть не должно но тогда сервак станет еще более модульным что не совсем хорошо так что пусть будет здесь
    if (!res.values.success) {
        res.render('error_page')
        return ;
    }
    const id = res.values.article.id
    const url = `/post/${id}`
    res.redirect(url)
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

function jsonValue(key) {
    return function (req, res, next) {
        if (res.values[key])
            res.json(res.values[key])
        else {
            res.statusCode = 404;
            res.json({
                message: 'not found'
            })
        }
    }
}

const renderPage = require('./page');

module.exports = {
    redirectToArticle,
    renderPage,
    jsonValuesWith,
    jsonValue
};