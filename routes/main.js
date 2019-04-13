const authController = require("../controllers/authcontroller.js");
const { userCreateValidator, userLoginValidator } = require('../services/validator');
const bodyParser = require('body-parser'); 

module.exports = function(app, passport) {
    
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
  
  app.get("/dashboard", isLoggedIn, authController.dashboard);

  app.get("/logout", authController.logout);

  app.post("/signin", urlencodedParser, userLoginValidator, passport.authenticate("local-signin", {
      successRedirect: "/dashboard",
      failureRedirect: "/signin"
    })
  );

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) 
        return next();
    res.redirect("/signin");
  }
};
