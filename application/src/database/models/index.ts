import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';


const dirname = path.resolve(__dirname)


import {Sequelize} from "sequelize";
const env = process.env.NODE_ENV || 'development';
import databaseConfig from '../config/database';
const config = databaseConfig[env];

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

interface IDB {
    [name :string]: any
}

console.log(fs.readdirSync(dirname))

const db: IDB = fs.readdirSync(dirname)
    .filter(file=> file !== 'index.js' && path.extname(file) !== ".map" )
    .map(file => sequelize.import(path.join(dirname, file)))
    .reduce((models, model) => {

        models[model.name] = model;
        return models;
    }, {});
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
