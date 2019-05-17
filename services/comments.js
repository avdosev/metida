const commentsInit = require('../database/models/comments');
const models = require('../database/models');
const Comment = commentsInit(models.sequelize, models.Sequelize); 

function removeAllCommentsByArticle(articleId, authorId) {
    return Article.destroy({
        where: {
          id: articleId,
          authorId: authorId
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
        }
    })
}

function pushComment(articleId, author, text, answeringId) {
    return Comment.create({
        articleId, 
        author, 
        text,
        answeringId
    })
}

module.exports = {
    getAllCommentsByArticle,
    removeAllCommentsByArticle,
    pushComment
}