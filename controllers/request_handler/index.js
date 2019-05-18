// Articles

const Article = require('./article');

// Comments

const Comments = require('./comments');

// Other

function getFile(req, res, next) {
    const FileName = req.url.match('\\w+/\\w+\\.\\w*$')[0];

    req.values = req.values ? req.values : new Object;

    req.values.FileName = FileName;

    next()
}

module.exports = {
    ...Comments,
    ...Article,
    getFile
}