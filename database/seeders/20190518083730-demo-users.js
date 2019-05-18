'use strict';

const rand = require("../../services/random")

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('users', [{
        email: rand.stringGenerator(rand.randInt(7,20)) + "@mail.ru",
        username: rand.stringGenerator(rand.randInt(5,15)),
        password: rand.stringGenerator(rand.randInt(5,25))
      }], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});

  }
};
