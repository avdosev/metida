const bCrypt = require("bcrypt-nodejs");
const { validationResult } = require('express-validator/check');

const loadPasportStrategies = (passport, user) => {
  const User = user;
  const LocalStrategy = require("passport-local").Strategy;

  passport.serializeUser((user, done)  =>{
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser((id, done)  =>{
    User.findById(id).then((user)  => {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });

  passport.use(
    "local-signup",
    new LocalStrategy({ usernameField: "email",
        passwordField: "password",
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      (req, email, password, done) => {
        const generateHash = (password)  => {
          return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
        };

        const errors = validationResult(req);
        if (!errors.isEmpty() ) {
          return done(null, false, { errors: errors.array()});
        }

        User.findOne({ where: { email: email } }).then((user) =>  {
          if (user) {
            return done(null, false, { message: "That email is already taken" });
          } else {
            const userPassword = generateHash(password);
            console.log(req.body.login);
            const data = {
              email: email,
              username: req.body.login,
              password: userPassword, //зашифрованный
              
            };

            User.create(data).then( (newUser, created) => {
              if (!newUser) {
                return done(null, false);
              }

              if (newUser) {
                return done(null, newUser);
              }
            });
          }
        });
      }
    )
  );

  



  //LOCAL SIGNIN
  passport.use(
    "local-signin",
    new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true  //позволяет нам передать весь запрос на обратный вызов
      },

      (req, email, password, done) => {
        const User = user;

        const isValidPassword = (userpass, password) => {
          return bCrypt.compareSync(password, userpass);
        };

        User.findOne({ where: { email: email } })
          .then(function(user) {
            if (!user) {
              return done(null, false, { message: "Email does not exist" });
            }

            if (!isValidPassword(user.password, password)) {
              //return new Error({ error: "Incorrect password." })
              return done(null, false, { message: "Incorrect password." });
            }

            const userinfo = user.get();
              return done(null, userinfo);
          })
          .catch(function(err) {
            console.log("Error:", err);
            return done(null, false, {
              message: "Something went wrong with your Signin"
            });
          });
      }
    )
  );
};

module.exports = {
  loadPasportStrategies
}
