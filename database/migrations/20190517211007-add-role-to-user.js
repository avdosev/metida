'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'role', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'user' // да, я знаю, что это код дмириева, но нам тоже надо это инсертнуть в таблицу
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('user', 'role');
  }
};
