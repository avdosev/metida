const models = require('../models');
const Article = models.article;

function getArticleFromSQL(req, res, next) {
    console.log(Article);
    Article.findById(req.params.id, id); //value/column //первое значение - полученное от клиента - второе - название столбца в бд, в которой ищем айди, который равен первому аргументу
    next(); //render
}

function pushArticleToSQL(req, res, next) {
    try {
        Article.create( {header: req.body.header, content: req.body.art } );
    } catch(error) {
        console.error(error);
    }
    next(); //render
}

module.exports = {
    getArticleFromSQL,
    pushArticleToSQL
}