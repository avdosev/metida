const authController = require("../controllers/authcontroller.js");
const { userCreateValidator, userLoginValidator } = require('../services/validator');
const bodyParser = require('body-parser'); 
const { pushArticleToSQL, getArticleFromSQL } = require('../controllers/article.js');

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
  app.get('/post/:id', getArticleFromSQL, authController.articles);

  app.post("/createArticle", urlencodedParser, /*отправить на модерацию */ 
    pushArticleToSQL );


  app.post("/register", urlencodedParser, userCreateValidator, 
      passport.authenticate("local-signup", {
      successRedirect: "/",
      failureRedirect: "/register",
      }
      ));

  app.post("/signin", urlencodedParser, userLoginValidator, passport.authenticate("local-signin", {
      successRedirect: "/",
      failureRedirect: "/signin",
      failureFlash : true 
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
