const commentsInit = require('../models/comments');
const models = require('../models');
const Comment = commentsInit(models.sequelize, models.Sequelize); 
const User = models.User;


function getCommentFromSQL(req, res, next) {

    Comment.findOne({ where: { id: /* */  } }).then(comment => {
        if (comment) {
            res.comment = comment;
            next();
        }
    });
}

function pushCommentToSQL(req, res, next) {
    console.log(req.body.comment);
    //тут надо понять что делать с логином юзера
    //User.findOne({ where: { id: req.params.id } }).then(article => { }

    try {
        Comment.create({/*author: ,*/  text: req.body.comment});
    } catch (error) {
        console.error(error);
    }
    // res.redirect('/'); // я бы не оч хотел попасть в начало после не успешного написания статьи
    next(); //render
}

module.exports = {
    getArticleFromSQL,
    pushArticleToSQL
};
