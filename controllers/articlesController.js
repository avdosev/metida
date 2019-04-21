

loadArt = (req, res, next) => { //подаем сюжа ссылку на бд

    //const Articles = art;
    //console.log(Articles);
    //const text = {
    //   text: req.body.art
    // }
    // console.log(text.text);
    
    // function ffa(textOfArticle) {
//       Articles.create(text) //такого нет, а почему
//         .then(console.log("step1")) ;
// //    }
}


function updateRecord(nameOfDB, columns, conditions) { //Например, столбец почты
    //sequalize.query('UPDATE ' + nameOfDB + ' SET '+ columns + ' WHERE ' + conditions)
    //UPDATE UsersDB.users SET email WHERE id='req.body.id'
}

function getUserId() {
    //SELECT ID FROM UsersDB.users WHERE email=req.body.email
}
module.exports = {
    loadArt 
  }