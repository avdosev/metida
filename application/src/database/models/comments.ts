module.exports = (connection, Sequelize) => {
    return connection.define('comments', {
        id: {autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
        commentAuthorId: {type: Sequelize.INTEGER, allowNull: false},
        text: {type: Sequelize.TEXT, allowNull: false}, // текст комментария
        articleId: {type: Sequelize.INTEGER, allowNull: false}, // айди статьи, к которой был оставлен коммент
        answeringId: {type: Sequelize.INTEGER, allowNull: true}, // важно! это айди(первый пункт), коммента на который прилетел ответ, если коммент к статье, но тут NULL
        raiting: {type: Sequelize.INTEGER, allowNull: true} // лукасы на
    });
};
