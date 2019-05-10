
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
    const authorId = req.values.userId;

    initValues(req)

    req.values.header = header;
    req.values.content = content;
    req.values.disclaimer = disclaimer;
    req.values.authorId = authorId

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
    const PostId = req.params.id;

    initValues(req)

    req.values.PostId = PostId;

    next()
}

function pushComment(req, res, next) {
    const ArticleId = req.params.id;
    const AuthorId = 'puk'; // TODO fix
    const TextComment = req.body.comment;
    const AnsweringId = null;

    initValues(req)

    req.values.ArticleId = ArticleId;
    req.values.AuthorId = AuthorId;
    req.values.TextComment = TextComment;
    req.values.AnsweringId = AnsweringId;

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