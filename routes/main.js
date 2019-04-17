const authController = require("../controllers/authcontroller.js");
const { userCreateValidator, userLoginValidator } = require('../services/validator');
const bodyParser = require('body-parser'); 

const initAuthControllers = (app, passport) => {

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  const urlencodedParser = bodyParser.urlencoded({extended: false});


  app.get("/", authController.index );
  app.get("/register", authController.register);
  app.get("/signin", authController.signin);
  app.get("/home", isLoggedIn, authController.home);
  app.get("/createArticle", isLoggedIn, authController.createArticle);
  app.get("/logout", authController.logout);
  app.get('/post/:id', getArticleFromSQL , authController.articles);
  

  function getArticleFromSQL(req, res, next) {

    next();
  }
  


  app.post("/register", urlencodedParser, userCreateValidator,  passport.authenticate("local-signup", {
    successRedirect: "/",
    failureRedirect: "/register"
    }), 
    (req, res, next) => {
      console.log("ВОЗВРАТ ОТВЕТА " +req);
    }
  );

  app.post("/signin", urlencodedParser, userLoginValidator, passport.authenticate("local-signin", {
      successRedirect: "/",
      failureRedirect: "/signin"
    })
  );
  //app.use( authController.errorPage);

  function isLoggedIn(req, res, next) { //топовая проверка на допуск юзера до страницы /createArticle
    if (req.isAuthenticated()) 
        return next();
    res.redirect("/signin");
  }
};


module.exports = {
  initAuthControllers
}
