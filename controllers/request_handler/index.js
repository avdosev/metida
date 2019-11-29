// Articles

const Article = require('./article');

// Comments

const Comments = require('./comments');

// Users

const Users = require('./user');

module.exports = {
    ...Comments,
    ...Article,
    ...Users,
};