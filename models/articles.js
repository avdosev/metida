module.exports = function(sequelize, Sequelize) {
  
  const Article = sequelize.define("article", {
    id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
    header: { type: Sequelize.STRING, allowNull: false },
    content: { type: Sequelize.STRING, allowNull: false }
    // raiting: { type: Sequelize.INTEGER, allowNull: true }
  });

  return Article;
};
