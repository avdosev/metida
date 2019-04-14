
register = (req, res, next) => {
  res.render("register");
};

signin = (req, res, next) => {
  res.render("signin");
};

dashboard = (req, res, next) => {
  res.render("dashboard");
};

createArticle = (req, res, next) => {
  res.render("createArticle");
};

logout = (req, res, next) => {
  req.session.destroy(function(err) {
    res.redirect("/");
  });
};


module.exports = {
  register,
  signin,
  dashboard,
  createArticle,
  logout
}