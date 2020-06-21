import db from '../database/models';
const { user: User, article: Article } = db;
import * as Comment from './comments';

import sequelize from 'sequelize';
const Op = sequelize.Op;

function getArticle(ArticleId: number) {
    return Article.findOne({ 
        where: {
            id: ArticleId
        }
    })
}

function pushArticle(header: string, content: string, disclaimer: string, authorId) {
    return Article.create({
        header,
        content,
        disclaimer,
        authorId
    })
}

function updateArticle(articleId: number, content: string, header: string, disclaimer: string) {
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

async function removeArticle(articleId: number, authorId: number) {
    const destroy = await Article.destroy({
        where: {
            id: articleId,
            authorId: authorId
        }
    });
    if (destroy)
        Comment.removeAllCommentsByArticle(articleId)
    return destroy;
}

function getTopArticles(begin: number, end: number, fncType: any, otherData: any) {
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
        return Promise.reject('not found function type request of toptypefnc');
    }
}

export {
    getArticle,
    pushArticle,
    updateArticle,
    removeArticle,
    getTopArticles
};

/// Top page requests

function getArticlesByAuthor(begin: number, count: number, otherData: any) {
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

function getTopRatingArticlesFromSQL(begin: number, count: number, otherData: any) {

}

function getTopDateArticlesFromSQL(begin: number, count: number, otherData: any) {
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

function getTopInterestedArticleFromSQL(begin: number, count: number, otherData: any) {

}