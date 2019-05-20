const validators = { ////поправить
    strEmailError:  'Я же просил ввести емейл. Не зли меня',
    strPasswordError: 'Пароль должен быть больше 5 символов',
    strEventEmailError: 'Вводи почту правильно',
    strRepasswordError: 'Пароли не совпадают.',
    strLoginError: 'Логин должен быть больше 3 символов'
}

document.addEventListener('DOMContentLoaded', start);

function start() {
    var emailError = document.querySelector('.emailError');
    var loginError = document.querySelector('.loginError');
    var passwordError = document.querySelector('.passwordError');
    var repasswordError = document.querySelector('.repasswordError');

    var email = document.getElementById('email');
    var login = document.getElementById("login")
    var password = document.querySelector('#password')
    var repassword = document.getElementById("repassword")

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
        }
        else {
            showError(repasswordError, validators.strRepasswordError)
        }
    }

    email.addEventListener('input', () => {
        checkValidation(email, emailError, validators.strEmailError)
    });

    password.addEventListener('input', () => {
        checkValidation(password, passwordError, validators.strPasswordError, true)
    })


    login.addEventListener('change', () => {
        checkValidation(login, loginError, validators.strLoginError)
    })

    repassword.addEventListener('input', () => {
        checkValidation(repassword, repasswordError, validators.strRepasswordError, true)
    })


    document.addEventListener('submit', event => {
            if (!email.validity.valid || !password.validity.valid || !repassword.validity.valid || !login.validity.valid || password.value != repassword.value) {
                showError(emailError, validators.strEventEmailError) /// тут надо сделать получше, но мне лень прока   
                event.preventDefault();                
            }
            //если все валидно, то отправляет форму
        },
        false
    );
}
