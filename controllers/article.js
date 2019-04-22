const articlesInit = require('../models/articles');
const models = require('../models');
const Article = articlesInit(models.sequelize, models.Sequelize); // здесь точно косяк тк я не понимаю как работать с бд

function getArticleFromSQL(req, res, next) {
    const id = 13465;
    console.log("article:", Article);
    Article.findOne({id}, (err, data) => {
        console.log("promise");
        console.log(`err: ${err}`);
        console.log(`data: ${data}`);
    }); //value/column //первое значение - полученное от клиента - второе - название столбца в бд, в которой ищем айди, который равен первому аргументу
    
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