const models = require('../models');
const Article = models.article; // здесь точно косяк тк я не понимаю как работать с бд

function getArticleFromSQL(req, res, next) {
    console.log(req.params.id)
    Article.findOne({ where: { id: req.params.id } }).then((user) => {
       if(user) {
            console.log("user == true? rly?");
       }
        console.log(user.header);
        console.log(user.content);

        res.render('post', {authorised : req.isAuthenticated(), name : user.header, text: user.content})
    }); //value/column //первое значение - полученное от клиента - второе - название столбца в бд, в которой ищем айди, который равен первому аргументу
    
    
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