
const emailRow = document.getElementsByName("email")[0]
const passwordRow = document.getElementsByName("password")
var error = document.querySelector('.error');
console.log(emailRow)
// const email = emailRow[0].value
// const password = passwordRow[0].value

email.addEventListener("input", function (event) {

  if (email.validity.valid) {
    error.innerHTML = ""; // Сбросить содержимое сообщения
    error.className = "error"; // Сбросить визуальное состояние сообщения
  }
}, false);


document.addEventListener("submit", function (event) {

  if (!email.validity.valid) {
    error.innerHTML = "I expect an e-mail, darling!";
    error.className = "error active";
    
    event.preventDefault();
  }
}, false);



// function validationLogin(email, password) {
    
//     if ( !!email.exec("^([\\w-]+\\.)*[\\w-]+\\@\\w+\\.\\w+$") ) {
//         return false, "It's not email"
//     }
//     //я бля аутирую
//     if ( !!password.match(".{5,}") ) {
//         return false, "It's not password"
//     }
//     return true
// }