const bCrypt = require("bcrypt-nodejs");
const { validationResult } = require('express-validator/check');

const loadPasportStrategies = (passport, user) => {
  const User = user;
  const LocalStrategy = require("passport-local").Strategy;

  passport.serializeUser((user, done) => { 
    done(null, user.id);
  });

  // для логаута (камингаута)
  passport.deserializeUser((id, done) => { 
    User.findById(id).then((user)  => { //находим юзера
      if (user) {
        done(null, user.get()); //нашли
      } else {
        done(user.errors, null); //не нашли
      }
    });
  });

  passport.use(
    "local-signup",
    new LocalStrategy({
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    }, 
      (req, email, password, done) => {
        
        const generateHash = (password)  => {
          return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
        };

        const errors = validationResult(req);
        if (!errors.isEmpty() ) {
          done(null, false );
          throw new Error("Что-то пошло не так", { errors: errors.array()});
        }

        User.findOne({ where: { email: email } }).then((user) =>  {
          if (user) {
            return done(null, false, 
              req.flash('message','email already used')); //req флеш не робит так как хочу я
          } else {
            const userPassword = generateHash(password);
            console.log(req.body.login);
            const data = {
              email: email,
              username: req.body.login,
              password: userPassword, // зашифрованный
              
            };

            User.create(data).then( (newUser, created) => {
              if (!newUser) {
                done(null, false);
                throw new Error("Что-то пошло не так");
              }

              if (newUser) {
                console.log("User " + req.body.email + " registration succesful")
                return done(null, newUser); //все ок
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
              done(null, false);
              throw new Error("Email does not exist")
            }

            if (!isValidPassword(user.password, password)) {
              done(null, false);
              throw new Error("Incorrect password.")
            }

            const userinfo = user.get();
              return done(null, userinfo);
          })
          .catch(  (err) => {
            
            console.log("Ошибка :", err); //у нас произошла ошибка выше по коду и мы начали
            done(null, false);
            
            //throw new Error( "Что-то пошло не так.")
            
          });
      }
    )
  );
};

module.exports = {
  loadPasportStrategies
}
