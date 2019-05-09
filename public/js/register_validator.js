document.addEventListener('DOMContentLoaded', start);

function start() {
    var form = document.getElementsByTagName('form')[0];
    var email = document.getElementById('email');
    var emailError = document.querySelector('.emailError');
    var passwordError = document.querySelector('.passwordError');
    var repasswordError = document.querySelector('.repasswordError');
    var loginError = document.querySelector('.loginError');
    var password = document.querySelector('#password')
    var login = document.getElementById("login")
    var repassword = document.getElementById("repassword")

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

            if (password.value == repassword.value) {
                repasswordError.innerHTML = '';
                repasswordError.className = 'error';
            }
            else {
                repasswordError.innerHTML = 'Пароли не совпадают. Ты пидр';
                repasswordError.className = 'error active';
            }
        }
        else {
            passwordError.innerHTML = 'Пароль должен быть больше 5 символов';
            passwordError.className = 'error active';
        }
    })


    login.addEventListener('input', event => {
        if(login.validity.valid) {
            loginError.innerHTML = '';
            loginError.className = 'error';
        }
        else {
            loginError.innerHTML = 'Логин больше 3 символов';
            loginError.className = 'error active';
        }
    })

    repassword.addEventListener('input', event => {
        if(repassword.validity.valid) {
            repasswordError.innerHTML = '';
            repasswordError.className = 'error';
            
            if (password.value == repassword.value) {
                repasswordError.innerHTML = '';
                repasswordError.className = 'error';
            }
            else {
                repasswordError.innerHTML = 'Пароли не совпадают. Ты пидр';
                repasswordError.className = 'error active';
            }
        }
        else {
            repasswordError.innerHTML = 'Пароль должен быть больше 5 символов';
            repasswordError.className = 'error active';
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
