
register = (req, res, next) => {
  res.render("register", { authorised : req.isAuthenticated()});
};

signin = (req, res, next) => {
  res.render("signin", { authorised : req.isAuthenticated() });
};

createArticle = (req, res, next) => {
  res.render("create_article", { authorised : req.isAuthenticated() });
};

home = (req, res, next) => {
  res.render('home', { authorised : req.isAuthenticated() }
)};

articles = (req,res,next) => {   
  var textToInsert = 'Unable to load text.';
  var nameToInsert = 'Unable to load name.'; // значения по умолчанию
  // потом надо переделать на sql
  nameToInsert = "Test " + req.params.id;
  textToInsert = "Nullam convallis sed risus ac laoreet. Vestibulum venenatis mi vel nisl tempor imper."
  // res.nameToInsert = nameToInsert;
  // res.textToInsert = textToInsert;
  ////ыыыыыы как вынести этот блок, чтобы мы получали на вход эти переменные
  res.render('post', {authorised : req.isAuthenticated(), name : nameToInsert, text: textToInsert}
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
  articles,
  logout
}