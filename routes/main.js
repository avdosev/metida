const authController = require("../controllers/authcontroller.js");
const { userCreateValidator, userLoginValidator } = require('../services/validator');
const bodyParser = require('body-parser'); 

const initAuthControllers = (app, passport) => {

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  const urlencodedParser = bodyParser.urlencoded({extended: false});

  app.get("/register", authController.register);

  app.get("/signin", authController.signin);

  app.post("/register", urlencodedParser, userCreateValidator,  passport.authenticate("local-signup", {
      successRedirect: "/",
      failureRedirect: "/register"
    })
  );

  app.get("/", (req, res, next) => {
    if ( req.isAuthenticated() )
      auth = true;
    else auth = false;
    res.render('index', { authorised : auth } );
  });

  app.get("/home", isLoggedIn, (req, res, next) => {
    res.render('home');
  });

  app.post("/update", urlencodedParser, userCreateValidator, ); //возможно пойдет createValidator

  //дашборд - это уведомление о успешной авторизации юзера
  //т.к. у меня не работает отлов ошибок, мне нужен этот костыль
  //уже нет
  //ответил я сам себе

  app.get("/createArticle", isLoggedIn, authController.createArticle);

  // app.get("/post/id", (req,res,next) => {
  //   req.
  //   res.send(id);
  // })

  app.post("/createArticle", );

  app.get("/logout", authController.logout);

  app.post("/signin", urlencodedParser, userLoginValidator, passport.authenticate("local-signin", {
      successRedirect: "/",
      failureRedirect: "/signin"
    })
  );

  function isLoggedIn(req, res, next) { //топовая проверка на допуск юзера до страницы /createArticle
    if (req.isAuthenticated()) 
        return next();
    res.redirect("/signin");
  }
};


module.exports = {
  initAuthControllers
}
