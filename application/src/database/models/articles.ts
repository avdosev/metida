module.exports = (connection, Sequelize) => {
    return connection.define('article', {
        id: {autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
        header: {type: Sequelize.STRING, allowNull: false},
        disclaimer: {type: Sequelize.TEXT, allowNull: false}, // TODO!!! fix allowNULL - false , и при добавлении делать дисклеймер
        content: {type: Sequelize.TEXT, allowNull: false},
        likes: {type: Sequelize.INTEGER, defaultValue: 0},
        dislikes: {type: Sequelize.INTEGER, defaultValue: 0},
        // authorId: { type: Sequelize.INTEGER, allowNull: false }
    });
};
