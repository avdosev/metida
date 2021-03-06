import dotenv from 'dotenv';
dotenv.config();

export default {
    "development": {
        "username": process.env.LOGIN,
        "password": process.env.PASSWORD,
        "database": process.env.DATABASE,
        "host": process.env.HOST,
        "dialect": "mysql",
        "logging": true
    },
    "test": {
        "username": "metidaSQL",
        "password": "123456",
        "database": "usersDB2",
        "host": "127.0.0.1",
        "dialect": "mysql",
        "logging": true
    },
    "production": {
        "username": process.env.USERNAME,
        "password": process.env.PASSWORD,
        "database": process.env.DATABASE,
        "host": process.env.HOST,
        "dialect": "mysql",
        "logging": false
    }
};
