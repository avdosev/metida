'use strict';

const rand = require("../../services/random")

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('articles', [{
        header: rand.stringGenerator(rand.randInt(20, 65)),
        disclaimer: rand.stringGenerator(rand.randInt(20,200)),
        content: rand.stringGenerator(rand.randInt(1000, 20000)),
        authorId: rand.randInt(0,200)
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('articles', null, {});
  }
};
