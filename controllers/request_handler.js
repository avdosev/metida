
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

    initValues(req);

    req.values.begin = begin;
    req.values.end = end;
    req.values.type = type;
    req.values.minDate = minDate;

    next()
}

function getArticleId(req, res, next) {
    const id = req.params.id

    initValues(req);

    req.values.article = { id };

    next()
}

function getArticleIdWithAuthor(req, res, next) {
    const id = req.params.id
    const authorId = req.user.id

    initValues(req);

    req.values.article = { id, authorId };

    next()
}


// Comments

function getComments(req, res, next) {
    const articleId = req.params.id;

    initValues(req)

    req.values.comment = {
        articleId
    };

    next()
}

function pushComment(req, res, next) {
    const articleId = req.params.id;
    const author = req.user.username; // TODO fix
    const text = req.body.comment;
    
    let answeringId
    if (req.body.answeringId)
        answeringId = req.body.answeringId
    else if (req.query.answeringId)
        answeringId = req.query.answeringId
    else 
        answeringId = null; // Этот нейминг важно(нет можно просто имена заменить) соблюсти для фронтендера

    initValues(req)

    req.values.comment = { 
        articleId, 
        author, 
        text, 
        answeringId 
    }

    next()
}

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
    getComments,
    pushComment,
    getFile
}