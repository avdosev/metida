const validators = { ////поправить
    strEmailError: 'Проверьте правильность введенного e-mail', 
    strPasswordError: 'Пароль должен содержать более 5 символов', 
    strEventEmailError: 'Вводи почту правильно', 
    strRepasswordError: 'Введенные пароли не совпадают', 
    strLoginError: 'Логин должен состоять более чем из 3 символов',
    emailRegExp: new RegExp('.+@.+\\..+'),
    passwordRegExp: new RegExp('.{5,}'),
    loginRegExp: new RegExp('.{3,}')
}

document.addEventListener('DOMContentLoaded', start);

function start() {
    const emailError = document.querySelector('.emailError');
    const loginError = document.querySelector('.loginError');
    const passwordError = document.querySelector('.passwordError');
    const repasswordError = document.querySelector('.repasswordError');
    const serverError = document.querySelector(".serverError")

    const email = document.getElementById('email');
    const login = document.getElementById("login")
    const password = document.querySelector('#password')
    const repassword = document.getElementById("repassword")
    const submitBtn = document.querySelector("#submit")


    function showError(widget, str) {
        widget.innerHTML = str;
        widget.className = 'error active';
    }

    function hideError(widget) {
        widget.innerHTML = '';
        widget.className = 'error';
    }

    function checkValidation(widget, errorSpan, strError, checkPassword=false) {
        if (widget.validity.valid) {
            hideError(errorSpan)
            if(checkPassword) 
                passwordEqualRepassword()
        }
        else {
            showError(errorSpan, strError)
        }
    }

    function passwordEqualRepassword() {
        if (password.value == repassword.value) {
            hideError(repasswordError)
            return true
        }
        else {
            showError(repasswordError, validators.strRepasswordError)
            return false
        }
    }

    email.addEventListener('input', () => {
        hideError(serverError)
        checkValidation(email, emailError, validators.strEmailError)
    });

    password.addEventListener('input', () => {
        hideError(serverError)
        checkValidation(password, passwordError, validators.strPasswordError, true)
    })

    login.addEventListener('input', () => {
        hideError(serverError)
        checkValidation(login, loginError, validators.strLoginError)
    })

    repassword.addEventListener('input', () => {
        hideError(serverError)
        checkValidation(repassword, repasswordError, validators.strRepasswordError, true)
    })

    function errorHandler(err) {
        showError(serverError, err)
    }


    submitBtn.addEventListener('click', () => {       
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
            fetch("/register", options).then(response => {
                if (response.ok) {
                    document.location.href = "/"
                } else {
                    errorHandler(response.text().then(errorHandler))
                }
            }).catch(err => {
                console.error(err)
            })
        }
    },
    false
);

}
