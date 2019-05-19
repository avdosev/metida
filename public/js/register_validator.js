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

    function checkValidation(widget, errorSpan, strError) {
        if (widget.validity.valid) {
            hideError(errorSpan)
        }
        else {
            showError(errorSpan, strError)
        }
    }

    email.addEventListener('change', () => {
        checkValidation(email, emailError, validators.strEmailError)
        },
        false
    );

    password.addEventListener('input', () => {
        if(password.validity.valid) {
            hideError(passwordError)

            if (password.value == repassword.value) {
                hideError(repasswordError)
            }
            else {
                showError(repasswordError, validators.strRepasswordError)
            }
        }
        else {
            showError(passwordError, validators.strPasswordError)
        }
    })


    login.addEventListener('change', () => {
        checkValidation(login, loginError, validators.strLoginError)
    })

    repassword.addEventListener('input', () => {
        if(repassword.validity.valid) {
            hideError(repasswordError)

            if (password.value == repassword.value) {
                hideError(repasswordError)
            }
            else {
                showError(repasswordError, validators.strRepasswordError)
            }
        }
        else {
            showError(repasswordError, validators.strPasswordError)

        }
    })


    document.addEventListener('submit', event => {
            console.log('ЖМЯК'); //тут будет проеб, т.к. это проверяет только по хтмл паттернам
            //если пароли не равны, нас все равно пустят
            if (!email.validity.valid || !password.validity.valid || !repassword.validity.valid || !login.validity.valid || password.value != repassword.value) {
                    event.preventDefault();                
            }
            //если все валидно, то отправляет форму
        },
        false
    );
}
