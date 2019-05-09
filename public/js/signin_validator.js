document.addEventListener('DOMContentLoaded', start);

function start() {
    var form = document.getElementsByTagName('form')[0];
    var email = document.getElementById('email');
    var emailError = document.querySelector('.emailError');
    var passwordError = document.querySelector('.passwordError');
    var submit = document.querySelector("#submit")
    var password = document.querySelector('#password')

    email.addEventListener('input', event => {
            console.log(email.validity.valid);
            if (email.validity.valid) {
                emailError.innerHTML = '';
                emailError.className = 'error';
            }
            else {
                emailError.innerHTML = 'Я же просил ввести емейл. Не зли меня';
                emailError.className = 'error active';
            }
        },
        false
    );

    password.addEventListener('input', event => {
        if(password.validity.valid) {
            passwordError.innerHTML = '';
            passwordError.className = 'error';
        }
        else {
            passwordError.innerHTML = 'Пароль должен быть больше 5 символов';
            passwordError.className = 'error active';
        }

        
    })

    document.addEventListener('submit', event => {
            console.log('ЖМЯК');
            if (!email.validity.valid && !password.validity.valid) {
                emailError.innerHTML = 'Вводи почту дядя';
                emailError.className = 'error active';
                event.preventDefault();
            }
        },
        false
    );
}
