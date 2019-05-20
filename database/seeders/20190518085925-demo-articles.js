'use strict';

const rand = require("../../services/random")

const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

module.exports = {
  up: (queryInterface, Sequelize) => {
    let arr = []
    for(let i = 0; i < 100; i++) { //нужно придумать как сделать этот код N раз
      arr.push(new Object({
        header: lorem.generateSentences(1),
        disclaimer: lorem.generateParagraphs(1),
        content: lorem.generateParagraphs(10) ,
        authorId: rand.randInt(0,200)
      }))
    }
    return queryInterface.bulkInsert('articles', arr, {}) ;
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('articles', null, {});
  }
};
