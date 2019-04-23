const articlesInit = require('../models/articles');
const models = require('../models');
const Article = articlesInit(models.sequelize, models.Sequelize); // здесь точно косяк тк я не понимаю как работать с бд

function getArticleFromSQL(req, res, next) {
    console.log(req.params.id);
    Article.findOne({ where: { id: req.params.id } }).then(article => {
        if (article) {
            res.article = article;
            next();
        } else {
            res.render('error_page');
        }
    });
}

function pushArticleToSQL(req, res, next) {
    console.log(req.body.header);
    console.log(req.body.art);

    try {
        Article.create({ header: req.body.header, content: req.body.art });
    } catch (error) {
        console.error(error);
    }
    // res.redirect('/'); // я бы не оч хотел попасть в начало после не успешного написания статьи
    // next(); //render
}

module.exports = {
    getArticleFromSQL,
    pushArticleToSQL
};
