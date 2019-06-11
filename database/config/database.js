require('dotenv').config();
console.log(process.env)
module.exports = 
{
    "development": {
        "username": process.env.USERNAME,
        "password": process.env.PASSWORD,
        "database": process.env.DATABASE,
        "host": process.env.HOST,
        "dialect": "mysql",
        "logging": false
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
}
