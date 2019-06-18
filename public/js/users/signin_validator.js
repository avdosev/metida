import { users as validators } from "../errorString.js"
import { showError, hideError, errorHandler, checkValidation, getJsonOptions, queryToServer } from "../helpers.js"

document.addEventListener('DOMContentLoaded', () => {

    const email = document.querySelector('#email');
    const emailError = document.querySelector('.emailError');
    const passwordError = document.querySelector('.passwordError');
    const serverError = document.querySelector(".serverError")

    const password = document.querySelector('#password')
    const sendBtn = document.querySelector("#submit")
    
    
    email.addEventListener('input', () => {
        hideError(serverError)
        checkValidation(email, emailError, validators.strEmailError)
    });

    password.addEventListener('input', () => {
        hideError(serverError)
        checkValidation(password, passwordError, validators.strPasswordError)
    })


    sendBtn.addEventListener('click', (event) => {
            if ( !email.value.match(validators.emailRegExp) )  { //пусть будет так
                showError(emailError, validators.strEventEmailError)
            }
            else if(!password.value.match(validators.passwordRegExp) ) {
                showError(passwordError, validators.strPasswordError)
            }
            else { // валидация на фронте пройдена, делаем запрос к серверу и смотрим на его ответ
                const options = getJsonOptions(email.value, password.value)
                queryToServer(options, serverError, "/sign_In")

            }
        },
        false
    );
})


