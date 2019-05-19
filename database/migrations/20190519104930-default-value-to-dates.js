'use strict';

const tables = [
    "articles",
    "users",
    "comments",
]

module.exports = {
  up: (queryInterface, Sequelize) => {
    for (var i in tables)  {
        return queryInterface.changeColumn(tables[i], 'createdAt', {
            type: Sequelize.DATE,
            allowNull: false,
            defalultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }).then(() => {
            return queryInterface.changeColumn(tables[i], 'updatedAt', {
                type: Sequelize.DATE,
                allowNull: false,
                defalultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            })
        }).then( () => continue)
    }   
  },

  down: (queryInterface, Sequelize) => {
    for (var i in tables)  {
        return queryInterface.changeColumn(tables[i], 'createdAt', {
            type: Sequelize.DATE,
            allowNull: false
        }).then(() => {
            return queryInterface.changeColumn(tables[i], 'updatedAt', {
                type: Sequelize.DATE,
                allowNull: false
            })
        })
    }
  }
};
