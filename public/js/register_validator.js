const replicas = require('../../config/replicas');

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

    email.addEventListener('input', () => {
        if (email.validity.valid) {
                hideError(emailError)
            }
            else {
                showError(emailError, replicas.validators.strEmailError)
            }
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
                showError(repasswordError, replicas.validators.strRepasswordError)
            }
        }
        else {
            showError(passwordError, replicas.validators.strPasswordError)
        }
    })


    login.addEventListener('input', () => {
        if(login.validity.valid) {
            hideError(loginError)
        }
        else {
            showError(loginError, replicas.validators.strLoginError )
        }
    })

    repassword.addEventListener('input', () => {
        if(repassword.validity.valid) {
            hideError(repasswordError)

            if (password.value == repassword.value) {
                hideError(repasswordError)
            }
            else {
                showError(repasswordError, replicas.validators.strRepasswordError)
            }
        }
        else {
            showError(repasswordError, replicas.validators.strPasswordError)

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
