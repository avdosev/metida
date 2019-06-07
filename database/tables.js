const models = require('./models');

console.log(models)

const articlesInit = models.articles
const commentsInit = models.comments
const usersInit = models.user

const Article = articlesInit(models.sequelize, models.Sequelize);
const Comment = commentsInit(models.sequelize, models.Sequelize); 
const User = usersInit(models.sequelize, models.Sequelize); 

module.exports = {
    Article,
    Comment,
    User
}