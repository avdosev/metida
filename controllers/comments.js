const commentsInit = require('../models/comments');
const models = require('../models');
const Comment = commentsInit(models.sequelize, models.Sequelize); 
const User = models.User;


function getCommentsFromSQL(req, res, next) {
    console.log(req.body);
    
    const PostId = req.params.id;

    Comment.findAll({ where: { articleId: PostId } }).then(comment => {
        if (comment) {
            console.log(comment);
        }
    });
}

function pushCommentToSQL(req, res, next) {
    console.log(req.body);
    const PostId = req.params.id;
    console.log(PostId)
    const AuthorId = 'puk'; // TODO fix
    const TextComment = req.body.comment;
    const AnsweringId = null;
    try {
        Comment.create({
            author: AuthorId,
            text: TextComment,
            articleId: PostId, 
            answeringId: AnsweringId 
        }).then(() => {
            res.send('sucsesfull puk');
        });
    } catch (error) {
        console.error(error);
        // res.redirect('/'); // хз что тут должно быть епта
    }
}

module.exports = {
    getCommentsFromSQL,
    pushCommentToSQL
};
