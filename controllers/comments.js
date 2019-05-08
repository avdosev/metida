const commentsInit = require('../models/comments');
const models = require('../models');
const Comment = commentsInit(models.sequelize, models.Sequelize); 
const User = models.User;

function initValues(req) {
    if (!req.values) {
        req.values = new Object;
    }
}

function getCommentsFromSQL(req, res, next) {
    const PostId = req.values.PostId;
    initValues(res)
    Comment.findAll({ where: { articleId: PostId } }).then(comment => {
        res.values.Comments = comment;
        next()
    }).catch(() => {
        res.values.Comments = []
        next()
    });
}

function pushCommentToSQL(req, res, next) {
    const ArticleId = req.values.ArticleId;
    const AuthorId = req.values.AuthorId;
    const TextComment = req.values.TextComment;
    const AnsweringId = req.values.AnsweringId;
   
    initValues(res)
    
    Comment.create({
        author: AuthorId,
        text: TextComment,
        articleId: ArticleId, 
        answeringId: AnsweringId 
    }).then(() => {
        res.values.SuccessPushComment = true;
        next()
        //res.send('sucsesfull puk');
    }).catch(error => {
        res.values.SuccessPushComment = false;
        console.error(error);
        next()
        //res.send('error')
    })
}

module.exports = {
    getCommentsFromSQL,
    pushCommentToSQL
};
