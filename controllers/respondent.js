function getComments(req, res, next) {
    res.json(res.values.Comments);
}

function getTopArticles(req, res, next) {
    res.json(res.values.TopArticles);
}

module.exports = {
    getComments,
    //pushComment,
    getTopArticles
};