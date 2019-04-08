const { User } = require('../models') // так я не понял епта почему тут нет цепочечных инклудов 
// сасатъ это не инклуды из си
// скорее всего когда ты вызываешь функцию require то тебе возвращается module.export
// из-за чего ты должен писать конструкцию "const { **** }"
// ПС:возможно ето не так

const { validationResult } = require('express-validator/check');

const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "metidaSQL",
    password: "1234"
});

function create(req, res, next) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }

    connection.connect();
    
    var counter=0;
    //INSERT INTO CUSTOMERS (ID,email,login,password) VALUES (1,'snippet@mail.ru', 'sanya', 'passwd');
    connection.query("INSERT INTO usersDB.users (ID, email,login,password) VALUES (" + counter + ", '" + req.body.email + "' , '" + req.body.login + "' , '" + req.body.password + "')", function(err, rows, fields){
        if(err) return console.log(err);//ой а что выше за монстр 
        //counter++; //и так плюсует из-за свойств созданного поля(см readme)
    })
    
    connection.query("SELECT * FROM usersDB.users", function(err, rows, fields){
        if(err) return console.log(err);
        console.log(rows);
    }) //функция отладки

    connection.end(function(err){ //вылет сервера происходит не из-за этого
        if(err) return console.log(err);
        console.log("Disconnect");
    });

    res.send(req.body); 

    // const salt = bcrypt.genSaltSync(10);
    // reg.password = bcrypt.hashSync(reg.password, salt);
    // console.log(reg);
    // res.send(reg); 
    // проверяем есть ли данные поля в нашей бд, и если есть, идем нахер
}

function login(req, res, next) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
}

module.exports = {
    create,
    login
}