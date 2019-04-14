module.exports = function(sequelize, Sequelize) {
  
  const Article = sequelize.define("article", {
    id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
    text: { type: Sequelize.STRING, allowNull: false },

  });

  return Article;
};
