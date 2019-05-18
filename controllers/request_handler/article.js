function initValues(req) {
    if (!req.values) {
        req.values = new Object;
    }
}

const articleApi = require('../../services/article')

function updateArticle(req, res, next) {
    const id = req.params.id
    const header = req.body.header;
    const content = req.body.art;
    const disclaimer = req.body.disclaimer;
    
    articleApi.updateArticle(
        id,
        content,
        header,
        disclaimer
    ).catch(error => {
        console.error(error)
        initValues(res)
        res.values.success = false
        next()
    })
    .then((value) => {
        initValues(res)
        res.values.success = true
        res.values.article = value.dataValues;
        next()
    })
}

function pushArticle(req, res, next) {
    const header = req.body.header;
    const content = req.body.art;
    const disclaimer = req.body.disclaimer;
    const authorId = req.user.id;
    
    articleApi.pushArticle( 
        header, 
        content, 
        disclaimer, 
        authorId 
    ).then((value) => {
        initValues(res)
        res.values.SuccessPushArticle = true
        res.values.article = value.dataValues;
        next()
    }).catch(error => {
        console.error(error)
        initValues(res)
        res.values.SuccessPushArticle = false
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
        console.log(value);
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
