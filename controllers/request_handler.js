
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
    const begin = 1;
    const end = 10;
    const type = 'date';

    initValues(req);

    req.values.begin = begin;
    req.values.end = end;
    req.values.type = type;

    next()
}

function getArticle(req, res, next) {
    const id = req.params.id

    initValues(req);

    req.values.id = id;

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
    const answeringId = req.body.answeringId ? req.body.answeringId : null; // Этот нейминг важно(нет можно просто имена заменить) соблюсти для фронтендера

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
    getArticle,
    getComments,
    pushComment,
    getFile
}