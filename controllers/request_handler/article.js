function initValues(req) {
    if (!req.values) {
        req.values = new Object;
    }
}

const articleApi = require('../../services/article')
const markdown = require('../../services/markdown')

function updateArticle(req, res, next) {
    const id = req.params.id
    const header = req.body.header;
    const content = req.body.art;
    const disclaimer = req.body.disclaimer;
    
    initValues(res)
    
    articleApi.updateArticle(
        id,
        header,
        markdown.MarkdownToHtml(content), 
        markdown.MarkdownToHtml(disclaimer)
    ).then((value) => {
        res.values.article = value.dataValues
        res.values.success = true
    }).catch(error => {
        console.error(error)
        res.values.success = true
    })
}

function pushArticle(req, res, next) {
    const header = req.body.header;
    const content = req.body.art;
    const disclaimer = req.body.disclaimer;
    const authorId = req.user.id;
    
    initValues(res)
    
    articleApi.pushArticle( 
        header, 
        markdown.MarkdownToHtml(content), 
        markdown.MarkdownToHtml(disclaimer), 
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

function getTopArticles(req, res, next) {
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

function getArticle(req, res, next) {
    const id = req.params.id

    articleApi.getArticle(id).then(article => {
        initValues(res)
        res.values.article = article;
        next();
    });
}

function removeArticle(req, res, next) {
    const id = req.params.id
    const authorId = req.user.id

    articleApi.removeArticle(id, authorId)
    .then((value) => {
        initValues(res)
        next()
    });
}

module.exports = {
    getArticle,
    pushArticle,
    getTopArticles,
    updateArticle,
    removeArticle
};
