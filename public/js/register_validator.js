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
      
    const serverError = document.querySelector("#serverError")
    const submitBtn = document.querySelector("#submit")

    email.addEventListener('input', () => {
        hideError(serverError)
        checkValidation(email, emailError, validators.email.Error)
    });

    login.addEventListener('input', () => {
        hideError(serverError)
        checkValidation(login, loginError, validators.login.Error)
    })
    
    password.addEventListener('input', () => {
        hideError(serverError)
        checkValidation(password, passwordError, validators.password.Error, passwordEqualRepassword)
    })

    repassword.addEventListener('input', () => {
        hideError(serverError)
        checkValidation(repassword, repasswordError, validators.password.repeat, passwordEqualRepassword)
    })
    
    // helpers
    function errorHandler(err) {
        showError(serverError, err)
    }
    
    function passwordEqualRepassword() {
        if (password.value == repassword.value) {
            hideError(repasswordError)
            return true
        }
        else {
            showError(repasswordError, validators.password.repeat)
            return false
        }
    }
    
    submitBtn.addEventListener('click', async () => {
        // Ниже адок       
        if ( !email.value.match(validators.emailRegExp) )  { //пусть будет так
            showError(emailError, validators.strEventEmailError)
        } else if(!login.value.match(validators.loginRegExp) ) {
            showError(loginError, validators.strLoginError)
        } else if(!password.value.match(validators.passwordRegExp) ) {
            showError(passwordError, validators.strPasswordError)
        } else if(!repassword.value.match(validators.passwordRegExp) ) { //вторая регулярка не нужна
            showError(repasswordError, validators.strRepasswordError)
        } else if( !passwordEqualRepassword() ) {
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
                    "login": login.value,
                    "password": password.value
                })
            }
            try {
                let response = await fetch("/register", options)
                if (response.ok) {
                    document.location.href = "/"
                } else {
                    errorHandler( await response.text() )
                }
            } catch(err) {
                console.error(err)
            }
        }
    },
    false
    );
}
