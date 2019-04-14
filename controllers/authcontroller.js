
register = (req, res, next) => {
  res.render("register");
};

signin = (req, res, next) => {
  res.render("signin");
};

createArticle = (req, res, next) => {
  res.render("createArticle");
};

logout = (req, res, next) => {
  req.session.destroy((err) =>{
    res.redirect("/");
  });
};


module.exports = {
  register,
  signin,
  createArticle,
  logout
}