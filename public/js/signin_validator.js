//import { validators }  from './replicas/replicas';
const validators = { ////неприемлимо
    strEmailError:  'Я же просил ввести емейл. Не зли меня',
    strPasswordError: 'Пароль должен быть больше 5 символов',
    strEventEmailError: 'Вводи почту правильно',
    strRepasswordError: 'Пароли не совпадают.',
    strLoginError: 'Логин должен быть больше 3 символов'
}

document.addEventListener('DOMContentLoaded', start);

function start() {
    var email = document.getElementById('email');
    var emailError = document.querySelector('.emailError');
    var passwordError = document.querySelector('.passwordError');
    var password = document.querySelector('#password')

    function showError(widget, str) {
        widget.innerHTML = str;
        widget.className = 'error active';
    }

    function hideError(widget) {
        widget.innerHTML = '';
        widget.className = 'error';
    }
    
    email.addEventListener('change', () => {
            if (email.validity.valid) {
                hideError(emailError)
            }
            else {
                showError(emailError, validators.strEmailError )
            }
        },
        false
    );

    password.addEventListener('change', () => {
        if(password.validity.valid) {
            hideError(passwordError)
        }
        else {
            showError(passwordError, validators.strPasswordError)    
        }

        
    })

    document.addEventListener('submit', event => {
            if (!email.validity.valid && !password.validity.valid) {
                showError(emailError, validators.strEventEmailError)
                event.preventDefault();
            }
        },
        false
    );
}
