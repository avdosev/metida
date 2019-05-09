function getComments(req, res, next) {
    res.json(res.values.Comments);
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
    const id = res.values.PostId
    const url = `/post/${id}`
    res.redirect(url)
}

module.exports = {
    getComments,
    //pushComment,
    getTopArticles,
    redirectToArticle
};