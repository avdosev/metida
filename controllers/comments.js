const commentsInit = require('../models/comments');
const models = require('../models');
const Comment = commentsInit(models.sequelize, models.Sequelize); 

function initValues(req) {
    if (!req.values) {
        req.values = new Object;
    }
}

function getCommentsFromSQL(req, res, next) {
    const commentValues = req.values.comment;
    initValues(res)

    Comment.findAll({ where: commentValues }).then(comment => {
        res.values.comments = comment;
        next()
    }).catch(() => {
        res.values.comments = []
        next()
    });
}

function pushCommentToSQL(req, res, next) {
    const comment = req.values.comment;
    initValues(res)
    
    Comment.create(comment)
    .then(() => {
        res.values.SuccessPushComment = true;
        next()
    }).catch(error => {
        res.values.SuccessPushComment = false;
        console.error(error);
        next()
    })
}

module.exports = {
    getCommentsFromSQL,
    pushCommentToSQL
};
