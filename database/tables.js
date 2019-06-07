const models = require('./models');

const Article = models.articles
const Comment = models.comments
const User = models.user

module.exports = {
    Article,
    Comment,
    User
}