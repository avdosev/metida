module.exports = function(sequelize, Sequelize) {
    return sequelize.define('user', {
        id: {autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
        firstname: {type: Sequelize.STRING, notEmpty: true},
        lastname: {type: Sequelize.STRING, notEmpty: true},
        username: {type: Sequelize.TEXT},
        about: {type: Sequelize.TEXT},
        email: {type: Sequelize.STRING, validate: {isEmail: true}},
        password: {type: Sequelize.STRING, allowNull: false},
        last_login: {type: Sequelize.DATE},
        avatar: {type: Sequelize.STRING},
        activatedEmail: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        status: {
            type: Sequelize.ENUM('offline', 'online'),
            defaultValue: 'offline'
        }
    });
};
