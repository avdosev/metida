const bodyParser = require('body-parser'); 


loadArt = (req, res, next) => { //подаем сюжа ссылку на бд
  req.use(bodyParser.urlencoded({ extended: true }));
  req.use(bodyParser.json());
  const urlencodedParser = bodyParser.urlencoded({extended: false});
    //const Articles = art;
    //console.log(Articles);
    const text = {
      text: req.body.art
    }
    console.log(text.text);
    
    // function ffa(textOfArticle) {
      Articles.create(text) //такого нет, а почему
        .then(console.log("step1")) ;
//    }
}


module.exports = {
    loadArt 
  }