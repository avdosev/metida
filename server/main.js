var path = require('path');
var express = require('express');
const port = 7080;
var app = express();

app.set('view-engine', 'ejs');
app.use(express.static(path.join(__dirname, '/../public')));


app.get('/', (req, res, next) => {
    //res.render('register', {data: "ko" });
})


app.get('/login', (req, res, next) => {
    //res.render('register');
    res.send("Пароль логин и все такие предоставь"); //это какая-то дрисня, нужно рендерить файл
});

app.get('/signIn', (req, res, next) => {
    res.send("Пароль логин создай");
});

// app.get('/articles/:name', (req, res, next) => {
//     res.render('index', {newsId: req.params.name});
// });






app.listen(port);

console.log('e');