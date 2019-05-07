module.exports = (sequelize, Sequelize) => {
    const Article = sequelize.define('article', {
        id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
        header: { type: Sequelize.STRING, allowNull: false },
        disclaimer: { type: Sequelize.TEXT, allowNull: false }, // TODO!!! fix allowNULL - false , и при добавлении делать дисклеймер
        content: { type: Sequelize.TEXT, allowNull: false },
        raiting: { type: Sequelize.INTEGER, allowNull: true }
    });

    return Article;
};
