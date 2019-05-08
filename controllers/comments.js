const commentsInit = require('../models/comments');
const models = require('../models');
const Comment = commentsInit(models.sequelize, models.Sequelize); 
const User = models.User;


function getCommentsFromSQL(req, res, next) {
    const PostId = req.values.PostId;

    Comment.findAll({ where: { articleId: PostId } }).then(comment => {
        if (comment) {
            for (var i=0; i<comment.length; i++) {
                console.log(comment[i].text);
            }
        }
    });
}

function pushCommentToSQL(req, res, next) {
    const ArticleId = req.values.ArticleId;
    const AuthorId = req.values.AuthorId;
    const TextComment = req.values.TextComment;
    const AnsweringId = req.values.AnsweringId;
   
    Comment.create({
        author: AuthorId,
        text: TextComment,
        articleId: ArticleId, 
        answeringId: AnsweringId 
    }).then(() => {
        res.send('sucsesfull puk');
    }).catch( (error) => {
        console.error(error);
        res.send('error')
    })
}

module.exports = {
    getCommentsFromSQL,
    pushCommentToSQL
};
