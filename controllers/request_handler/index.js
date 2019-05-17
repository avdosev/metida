
function initValues(req) {
    if (!req.values) {
        req.values = new Object;
    }
}

// Articles

function pushArticle(req, res, next) {
    //console.log(req.body)
    const header = req.body.header;
    const content = req.body.art;
    const disclaimer = req.body.disclaimer;
    const authorId = req.user.id;

    initValues(req)

    req.values.article = { 
        header, 
        content, 
        disclaimer, 
        authorId 
    }

    next()
}

function getTopArticle(req, res, next) {
    const begin = req.body.begin ? req.body.begin : 0;
    const end = req.body.end ? req.body.end : 10;
    const type = req.body.type ? req.body.type : 'date';
    const minDate = req.body.minDate ? new Date(req.body.minDate) : new Date(1999, 11, 11);

    initValues(req)

    req.values.begin = begin;
    req.values.end = end;
    req.values.type = type;
    req.values.minDate = minDate;

    next()
}

function getArticleId(req, res, next) {
    const id = req.params.id

    initValues(req)

    req.values.article = { id };

    next()
}

function getArticleIdWithAuthor(req, res, next) {
    const id = req.params.id
    const authorId = req.user.id

    initValues(req)

    req.values.article = { id, authorId };

    next()
}


// Comments
const Comments = require('./comments');

// Other

function getFile(req, res, next) {
    const FileName = req.url.match('\\w+/\\w+\\.\\w*$')[0];

    initValues(req)

    req.values.FileName = FileName;

    next()
}

module.exports = {
    pushArticle,
    getTopArticle,
    getArticleId,
    getArticleIdWithAuthor,
    getFile,
    ...Comments
}