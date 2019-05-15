const replicas = require("../../config/replicas")
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
    
    email.addEventListener('input', () => {
            if (email.validity.valid) {
                hideError(emailError)
            }
            else {
                showError(emailError, replicas.validators.strEmailError )
            }
        },
        false
    );

    password.addEventListener('input', () => {
        if(password.validity.valid) {
            hideError(passwordError)
        }
        else {
            showError(passwordError, replicas.validators.strPasswordError)    
        }

        
    })

    document.addEventListener('submit', event => {
            if (!email.validity.valid && !password.validity.valid) {
                showError(emailError, replicas.validators.strEventEmailError)
                event.preventDefault();
            }
        },
        false
    );
}
