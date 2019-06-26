// Articles

const Article = require('./article');

// Comments

const Comments = require('./comments');

module.exports = {
    ...Comments,
    ...Article,
}