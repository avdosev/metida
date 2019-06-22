import { showError, hideError, checkValidation,  } from "/public/js/modules/input_error.js";

document.addEventListener('DOMContentLoaded', start);

async function start() {
    // запрос на джсончик
    const validators = await 
        fetch('/public/json/input_errors.json').then(response => {
            if (response.ok)
                return response.json()
            else 
                console.log('с джсоном какая то проблема', response)
        })
    
    const sendBtn = document.querySelector("#submit")
    
    email.addEventListener('input', () => {
        hideError(serverError)
        checkValidation(email, emailError, validators.email.Error)
    });

    password.addEventListener('input', () => {
        hideError(serverError)
        checkValidation(password, passwordError, validators.password.Error)
    })

    function errorHandler(err) {
        showError(serverError, err)
    }


    sendBtn.addEventListener('click', (event) => {
        if ( !email.value.match(validators.emailRegExp) )  { //пусть будет так
            showError(emailError, validators.strEventEmailError)
        } else if(!password.value.match(validators.passwordRegExp) ) {
            showError(passwordError, validators.strPasswordError)
        } else { // валидация на фронте пройдена, делаем запрос к серверу и смотрим на его ответ
            console.log("запрос")
            const options = {
                method:"post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "email": email.value,
                    "password": password.value
                })
            }
            fetch("/sign_In", options).then(response => {
                if (response.ok) {
                    document.location.href = "/"
                } else {
                    response.text().then(errorHandler)
                }
            }).catch((err) => {
                console.error(err)
            })
        }
    },
    false
    );
}
