module.exports = (sequelize, Sequelize) => {
    const Image = sequelize.define('images', {
        id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
        image: { type: Sequelize.BLOB, allowNull: false } //до 16 мегабайт инфы
    });

    return Image;
};
