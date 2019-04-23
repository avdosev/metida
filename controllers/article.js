const articlesInit = require('../models/articles');
const models = require('../models');
const Article = articlesInit(models.sequelize, models.Sequelize); // здесь точно косяк тк я не понимаю как работать с бд
//const Article = models.article; // здесь точно косяк тк я не понимаю как работать с бд

function getArticleFromSQL(req, res, next) {
    console.log(req.params.id)
    Article.findOne({ where: { id: req.params.id } }).then((user) => {
       if(user) {
           res.user = user;
           next();
        } else {
            res.render('error_page')
        }

        //res.render('post', {authorised : req.isAuthenticated(), name : user.header, text: user.content})

    }); //value/column //первое значение - полученное от клиента - второе - название столбца в бд, в которой ищем айди, который равен первому аргументу
    
    
}

function pushArticleToSQL(req, res, next) {
    console.log(req.body.header)
    console.log(req.body.art)

    try {
        Article.create( {header: req.body.header, content: req.body.art } );
    } catch(error) {
        console.error(error);
    }
    res.redirect('/');
    //next(); //render
}

module.exports = {
    getArticleFromSQL,
    pushArticleToSQL
}