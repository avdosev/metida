import db from '../database/models';
const { user: User, comments: Comment } = db;

function removeAllCommentsByArticle(articleId, authorId) {
    return Comment.destroy({ //артикл не объявлен
        where: {
            articleId
        }
    })
}

function removeComment(сommentId) {
    // здесь будет куча ассинхронно-рекурсивных запросов к бд
    // либо хитрый sql запрос
    // но пока здесь будет лежать этот коммент
    // DELETE FROM <db.table> WHERE id=commentID //ладно я хз //сверху такой же вроде
    // очень хитро
}

function getAllCommentsByArticle(articleId) {
    return Comment.findAll({
        where: {
            articleId
        },
        include: [{
            // inner join
            model: User,
            as: 'user',
            attributes: [
                'username', 'about', 'lastname', 'firstname', 'avatar'
            ]
        }]
    })
}

function pushComment(articleId, author, text, answeringId) {
    return Comment.create({
        articleId, 
        commentAuthorId: author,
        text,
        answeringId
    })
}

export {
    getAllCommentsByArticle,
    removeAllCommentsByArticle,
    pushComment
}