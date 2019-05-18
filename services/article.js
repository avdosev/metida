const articlesInit = require('../database/models/articles');
const models = require('../database/models');
const Article = articlesInit(models.sequelize, models.Sequelize); // здесь точно косяк тк я не понимаю как работать с бд
const { Op } = require('sequelize')

function getArticle(ArticleId) {
    return Article.findOne({ 
        where: {
            id: ArticleId
        }
    })
}

function pushArticle(header, content, disclaimer, authorId) {
    return Article.create({
        header,
        content,
        disclaimer,
        authorId
    })
}

function updateArticle(articleId, content, header, disclaimer) {
    return Article.update({
        content: content,
        header: header,
        disclaimer: disclaimer
    }, {
        where: {
            id: articleId
        }
    })
}

function removeArticle(articleId, authorId) {
    return Article.destroy({
        where: {
          id: articleId,
          authorId: authorId
        }
    })
}

function getTopArticles(begin, end, fncType, otherData) {
    // getTopFromSQL
    // здесь предполагается что будет три входных параметра
    // первый начальный индекс топа
    // второй конечный индекс
    // третий тип(см ниже)
    const FuncByType = {
        'rating': getTopRatingArticlesFromSQL,
        'date': getTopDateArticlesFromSQL,
        'interested': getTopInterestedArticleFromSQL,
        'author': getArticlesByAuthor,
    };
    
    const fnc = FuncByType[fncType];
    
    if (fnc != undefined) {
        let count = end-begin
        count = count < 0 ? -count : count;
        return fnc(begin, count, otherData);
    } else {
        return new Promise.reject('not found function type request of toptypefnc');
    }
}

module.exports = {
    getArticle,
    pushArticle,
    updateArticle,
    removeArticle,
    getTopArticles
};

/// Top page requests

function getArticlesByAuthor(begin, count, otherData) {
    Article.findAll({
        attributes: [
            'id', 'header', 'disclaimer'
        ],
        where: {
            authorId: otherData.authorId
        }, 
        order: [
            ['createdAt', 'DESC']
        ],
        offset: begin, 
        limit: count
    });
}

function getTopRatingArticlesFromSQL(begin, count, otherData) {

}

function getTopDateArticlesFromSQL(begin, count, otherData) {
    // SELECT * FROM `table` WHERE `date` BETWEEN '2010-10-21 0:00:00' AND '2012-10-21 23:59:59'
    return Article.findAll({
        attributes: [
            'id', 'header', 'disclaimer'
        ],
        where: {
            createdAt: {
                [Op.gte]: otherData.minDate, // просто дата можно вместо нее любую другую
            }
        }, 
        order: [
            ['createdAt', 'DESC']
        ],
        offset: begin, 
        limit: count
    });
}

function getTopInterestedArticleFromSQL(begin, count, otherData) {

}