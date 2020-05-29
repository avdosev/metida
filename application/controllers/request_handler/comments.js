import * as commentApi from '../../services/comments.js';
import * as markdown from '../../services/markdown.js';

function initValues(req) {
    if (!req.values) {
        req.values = {};
    }
}

function getComments(req, res, next) {
    const articleId = req.params.id;
    initValues(res)
    commentApi.getAllCommentsByArticle(articleId)
    .then(comments => {
        res.values.comments = comments;
        next()
    }).catch((err) => {
        console.log(err)
        res.values.comments = []
        next()
    });
}

function pushComment(req, res, next) {
    const articleId = req.body.articleId;
    const author = req.body.userId;
    const text = req.body.comment;

    if(text == undefined) {
        console.error("Текст коммента до сюда не дошел. req.body.comment == undefined")
        return
    }
    let answeringId
    if (req.body.answeringId)
        answeringId = req.body.answeringId
    else if (req.query.answeringId)
        answeringId = req.query.answeringId
    else 
        answeringId = null; // Этот нейминг важно(нет можно просто имена заменить) соблюсти для фронтендера
    
    
    commentApi.pushComment(
        articleId, 
        author, 
        markdown.MarkdownToHtml(text), 
        answeringId
    ).then(value => {
        initValues(res)
        res.values.success = true; 
        next()
    }).catch(error => {
        initValues(res)
        res.values.success = false;
        console.error(error);
        next()
    })
}

export {
    getComments,
    pushComment
};
