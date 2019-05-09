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
        if (article) {
            res.article = article;
            next();
        } else {
            res.render('error_page');
        }
    });
}

function getTopRatingArticlesFromSQL(begin, end, callback) {
}

function getTopDateArticlesFromSQL(begin, end, callback) {
    // SELECT * FROM `table` WHERE `date` BETWEEN '2010-10-21 0:00:00' AND '2012-10-21 23:59:59'
    Article.findAll({
        attributes: [
            'id', 'header', 'disclaimer'
        ],
        where: {
            createdAt: {
                [Op.gte]: new Date(1999, 11, 11), // просто дата можно вместо нее любую другую
            }
        }, 
        order: [
            ['createdAt', 'DESC']
        ]
    }).then((values) => {
        // TODO!!! filter interval
        callback(values, null);
    }).catch((error) => {
        callback([], error)
    });
}

function getTopInterestedArticleFromSQL(begin, end, callback) {

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

    const fnc = FuncByType[type];
    const callback = (value, error) => {
        if (error) 
            console.log(error);
        initValues(res)            
        res.values.TopArticles = value;
        next()
    }
    if (fnc != undefined) {
        fnc(begin, end, callback);
    } else {
        callback([], 'not found function type request of toptypefnc')
    }
    
}

function pushArticleToSQL(req, res, next) {
    const header = req.values.header;
    const content = req.values.content;
    const disclaimer = req.values.disclaimer;

    initValues(res)

    try {
        Article.create({ header, content, disclaimer })
        .catch(error => {
            console.error(error)
            res.values.SuccessPushArticle = false
            next()
        })
        .then((value) => {
            res.values.SuccessPushArticle = true
            res.values.PostId = value.dataValues.id;
            next()
        })
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getArticleFromSQL,
    pushArticleToSQL,
    getTopArticles
};
