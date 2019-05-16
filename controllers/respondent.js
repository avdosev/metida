function getComments(req, res, next) {
    res.json(res.values.comments);
}

function getTopArticles(req, res, next) {
    res.json(res.values.TopArticles);
}

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
 
function responseSuccess(req, res) {
    let resstr = 'success', opcode = 200
    if (res.values)
        if (res.values.success === false) {
            resstr = 'fail'
        }
    res.statusCode = opcode
    res.send(resstr)
}

const authController = require('./service.js');

module.exports = {
    getComments,
    //pushComment,
    getTopArticles,
    redirectToArticle,
    jsonArticle,
    ...authController,
    responseSuccess
};