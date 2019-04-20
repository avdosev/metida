
loadArt = (art) => { //подаем сюжа ссылку на бд
    const Articles = art;
    //console.log(Articles);
    
    (req, res, next) => { //как запустить эту херню с реком
      const text = {
        text: req.body.art
      }
      console.log(text.text);
      Articles.create(text) //такого нет, а почему
        .then(console.log("step1")) ;
    }
}


module.exports = {
    loadArt 
  }