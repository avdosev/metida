
register = (req, res, next) => {
  res.render("register", { authorised : req.isAuthenticated()});
};

signin = (req, res, next) => {
  res.render("signin", { authorised : req.isAuthenticated() });
};

createArticle = (req, res, next) => {
  res.render("createArticle", { authorised : req.isAuthenticated() });
};

home = (req, res, next) => {
  res.render('home', { authorised : req.isAuthenticated() }
)};

logout = (req, res, next) => {
  req.session.destroy((err) =>{
    res.redirect("/");
  });
};

index = (req, res, next) => {
  res.render('index', { authorised : req.isAuthenticated() } );
}

module.exports = {
  register,
  signin,
  home,
  createArticle,
  index,
  logout
}