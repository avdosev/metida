import { showError, hideError, checkValidation } from "../components/Pages/input_error.js";

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
        checkValidation(email, emailError, validators.email.error_str)
    });

    login.addEventListener('input', () => {
        hideError(serverError)
        checkValidation(login, loginError, validators.login.error_str)
    })
    
    password.addEventListener('input', () => {
        hideError(serverError)
        checkValidation(password, passwordError, validators.password.error_str, passwordEqualRepassword)
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
        if ( !email.value.match(validators.email.regexp) )  { //пусть будет так
            showError(emailError, validators.email.EventError[0]) 
        } else if(!login.value.match(validators.login.regexp )  ) {
            showError(loginError, validators.login.error_str  )
        } else if(!password.value.match(validators.password.regexp ) ) {
            showError(passwordError, validators.password.error_str )
        } else if(!repassword.value.match(validators.password.regexp) ) { //вторая регулярка не нужна
            showError(repasswordError, validators.password.repeat)
        } else if( !passwordEqualRepassword() ) {
            showError(passwordError, validators.password.error_str)
        } else { // валидация на фронте пройдена, делаем запрос к серверу и смотрим на его ответ
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
                    document.location.href = document.referrer || "/"
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
