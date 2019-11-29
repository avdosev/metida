'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var config = require(path.join(__dirname, '..', 'config', 'database.js'))[env];
var sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);
var db = {};

fs.readdirSync(__dirname)
    .filter(function(file) {
        return file.indexOf('.') !== 0 && file !== 'index.js';
    })
    .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

// Relations
// db.article.hasMany(db.comments, {as: 'articleId'});
//
db.user.hasMany(db.article, {
    foreignKey: {
        name: 'authorId',
        allowNull: false
    }
});
db.article.belongsTo(db.user, {foreignKey: 'authorId'})

db.user.hasMany(db.comments, {
    foreignKey: {
        name: 'commentAuthorId',
        allowNull: false
    }
});
db.comments.belongsTo(db.user, {foreignKey: 'commentAuthorId'})


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
