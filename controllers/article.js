const articlesInit = require('../models/articles');
const models = require('../models');
const Article = articlesInit(models.sequelize, models.Sequelize); // здесь точно косяк тк я не понимаю как работать с бд
const { Op } = require('sequelize')

function initValues(req) {
    if (!req.values) {
        req.values = new Object;
    }
}

function getArticleFromSQL(req, res, next) {
    const id = req.values.id;
    Article.findOne({ where: { id } }).then(article => {
        initValues(res)
        res.values.article = article;
        next();
    });
}

function getTopRatingArticlesFromSQL(begin, end, minDate, callback) {

}

function getTopDateArticlesFromSQL(begin, end, minDate, callback) {
    // SELECT * FROM `table` WHERE `date` BETWEEN '2010-10-21 0:00:00' AND '2012-10-21 23:59:59'
    let count = end-begin
    count = count < 0 ? -count : count;
    Article.findAll({
        attributes: [
            'id', 'header', 'disclaimer'
        ],
        where: {
            createdAt: {
                [Op.gte]: minDate, // просто дата можно вместо нее любую другую
            }
        }, 
        order: [
            ['createdAt', 'DESC']
        ],
        offset: begin, 
        limit: count
    }).then((values) => {
        // TODO!!! filter interval
        callback(values, null);
    }).catch((error) => {
        callback([], error)
    });
}

function getTopInterestedArticleFromSQL(begin, end, minDate, callback) {

}
// getTopFromSQL
// здесь предполагается что будет три входных параметра
// первый начальный индекс топа
// второй конечный индекс
// третий тип(см ниже)
const FuncByType = {
    'rating': getTopRatingArticlesFromSQL,
    'date': getTopDateArticlesFromSQL,
    'interested': getTopInterestedArticleFromSQL
};

function getTopArticles(req, res, next) {
    const begin = req.values.begin;
    const end = req.values.end;
    const type = req.values.type;
    const minDate = req.values.minDate;

    const fnc = FuncByType[type];

    const callback = (value, error) => {
        if (error) 
            console.log(error);
        initValues(res)            
        res.values.TopArticles = value;
        next()
    }
    
    if (fnc != undefined) {
        fnc(begin, end, minDate, callback);
    } else {
        callback([], 'not found function type request of toptypefnc')
    }
    
}

function pushArticleToSQL(req, res, next) {
    const article = req.values.article

    initValues(res)

    try {
        Article.create(article)
        .catch(error => {
            console.error(error)
            res.values.SuccessPushArticle = false
            next()
        })
        .then((value) => {
            res.values.SuccessPushArticle = true
            res.values.article = value.dataValues;
            next()
        })
    } catch (error) {
        console.error(error);
    }
}

function updateArticle(req, res, next) {
    const article = req.values.article
    Article.update({
        content: article.content,
        header: article.header,
        disclaimer: article.disclaimer
    }, {
        where: {
            id: article.id
        }
    })
    .catch(error => {
        console.error(error)
        res.values.success = false
        next()
    })
    .then((value) => {
        res.values.success = true
        res.values.article = value.dataValues;
        next()
    })
}

function removeArticle(req, res, next) {
    const article = req.values.article
    Article.destroy({
        where: {
          id: article.id
        },
        truncate: true /* this will ignore where and truncate the table instead */
    });
}

module.exports = {
    getArticleFromSQL,
    pushArticleToSQL,
    getTopArticles,
    updateArticle
};
