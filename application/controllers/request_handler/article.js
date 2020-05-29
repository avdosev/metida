function initValues(req) {
    if (!req.values) {
        req.values = new Object;
    }
}

import * as articleApi from '../../services/article.js';
import * as markdown from '../../services/markdown.js';

export function updateArticle(req, res, next) {
    const id = req.params.id
    const header = req.body.header;
    const content = req.body.art;
    const disclaimer = req.body.disclaimer;
    
    initValues(res)
    
    articleApi.updateArticle(
        id,
        markdown.MarkdownToHtml(content), 
        header,
        markdown.MarkdownToHtml(disclaimer)
    ).then((value) => {
        res.values.article = value.dataValues;
        res.values.success = true;
    }).catch(error => {
        console.error(error);
        res.values.success = true;
    })
}

export function pushArticle(req, res, next) {
    const {header, content, disclaimer} = req.body
    const authorId = req.userId;
    
    initValues(res)

    articleApi.pushArticle( 
        header, 
        content,
        disclaimer,
        authorId 
    ).then((value) => {
        res.values.success = true
        res.values.article = value.dataValues;
        next()
    }).catch(error => {
        console.error(error)
        res.values.success = false
        next()
    })
}

export function getTopArticles(req, res, next) {
    const begin = req.body.begin ? req.body.begin : 0;
    const end = req.body.end ? req.body.end : 10;
    const type = req.body.type ? req.body.type : 'date';
    const minDate = req.body.minDate ? new Date(req.body.minDate) : new Date(1999, 11, 11);
    
    initValues(res)            

    articleApi.getTopArticles(
        begin, end, type, 
        { 
            minDate
        }
    ).then(value => {
        res.values.TopArticles = value;
        next()
    }).catch(error => {
        console.error(error);
        res.values.TopArticles = [];
        next()
    })
}

export function getArticle(req, res, next) {
    const id = req.params.id;

    articleApi.getArticle(id).then(article => {
        initValues(res)
        res.values.article = article;
        next();
    });
}

export function removeArticle(req, res, next) {
    const id = req.params.id;
    const authorId = req.user.id;

    articleApi.removeArticle(id, authorId)
    .then((value) => {
        initValues(res);
        res.values.success = true;
        next()
    }).catch(error => {
        console.error(error);
        res.values.success = true;
        next()
    });
}

