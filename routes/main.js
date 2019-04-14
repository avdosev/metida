const authController = require("../controllers/authcontroller.js");
const { userCreateValidator, userLoginValidator } = require('../services/validator');
const bodyParser = require('body-parser'); 

module.exports = (app, passport) => {
    
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  const urlencodedParser = bodyParser.urlencoded({extended: false});

  app.get("/register", authController.register);

  app.get("/signin", authController.signin);

  app.post("/register", urlencodedParser, userCreateValidator,  passport.authenticate("local-signup", {
      successRedirect: "/dashboard",
      failureRedirect: "/register"
    })
  );

  app.get("/", (req, res, next) => {
    res.render('index');
  });
  //дашборд - это уведомление о успешной авторизации юзера
  //т.к. у меня не работает отлов ошибок, мне нужен этот костыль
  app.get("/dashboard", isLoggedIn, authController.dashboard);

  app.get("/createArticle", isLoggedIn, authController.createArticle)

  app.get("/logout", authController.logout);

  app.post("/signin", urlencodedParser, userLoginValidator, passport.authenticate("local-signin", {
      successRedirect: "/dashboard",
      failureRedirect: "/signin"
    })
  );

  function isLoggedIn(req, res, next) { //топовая проверка на допуск юзера до страницы /createArticle
    if (req.isAuthenticated()) 
        return next();
    res.redirect("/signin");
  }
};
