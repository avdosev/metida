
loadArt = (art) => { //подаем сюжа ссылку на бд
    const Articles = art;
    (req, res, next) => {
      const text = {
        text: req.body.art
      }
      Articles.create(text) //такого нет, а почему
        .then(console.log("step1")) ;
    }
}


module.exports = {
    loadArt 
  }