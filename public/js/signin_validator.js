//import { validators }  from './replicas/replicas';
const validators = { ////неприемлимо
    strEmailError:  'Я же просил ввести емейл. Не зли меня',
    strPasswordError: 'Пароль должен быть больше 5 символов',
    strEventEmailError: 'Вводи почту правильно',
    strRepasswordError: 'Пароли не совпадают.',
    strLoginError: 'Логин должен быть больше 3 символов'
}

document.addEventListener('DOMContentLoaded', start);
// function asyncScript(src, callback) {
//     const script = document.createElement('script')
//     script.src = src;
//     script.async = true;
//     script.onload = callback;
//     document.head.appendChild(script)
// }

function include(url) {
    var script = document.createElement('script');
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}

function start() {
    //asyncScript("./replicas/replicas")
    include("./replicas")

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
    
    email.addEventListener('input', () => {
            if (email.validity.valid) {
                hideError(emailError)
            }
            else {
                showError(emailError, validators.strEmailError )
            }
        },
        false
    );

    password.addEventListener('input', () => {
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
