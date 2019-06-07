const models = require('./models');

const Article = models.article
const Comment = models.comments
const User = models.user

module.exports = {
    Article,
    Comment,
    User
}