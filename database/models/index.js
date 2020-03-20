'use strict';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
import databaseConfig from '../config/database.js';
const config = databaseConfig[env];
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);
const db = {};

fs.readdirSync(__dirname)
    .filter(file=> file.indexOf('.') !== 0 && file !== 'index.js')
    .forEach(file => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
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

export default db;
