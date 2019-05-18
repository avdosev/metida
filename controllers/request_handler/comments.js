const commentApi = require('../../services/comments');


function initValues(req) {
    if (!req.values) {
        req.values = new Object;
    }
}

function getComments(req, res, next) {
    const articleId = req.params.id;
    initValues(res)
    commentApi.getAllCommentsByArticle(articleId)
    .then(comments => {
        res.values.comments = comments;
        next()
    }).catch(() => {
        res.values.comments = []
        next()
    });
}

function pushComment(req, res, next) {
    const articleId = req.params.id;
    const author = req.user.username; // TODO fix
    const text = req.body.comment;
    
    let answeringId
    if (req.body.answeringId)
        answeringId = req.body.answeringId
    else if (req.query.answeringId)
        answeringId = req.query.answeringId
    else 
        answeringId = null; // Этот нейминг важно(нет можно просто имена заменить) соблюсти для фронтендера
    
    
    commentApi.pushComment(articleId, author, text, answeringId)
    .then(value => {
        initValues(res)
        res.values.SuccessPushComment = true; //из-за этого у меня крашилось
        next()
    }).catch(error => {
        initValues(res)
        res.values.SuccessPushComment = false;
        console.error(error);
        next()
    })
}

module.exports = {
    getComments,
    pushComment
};
