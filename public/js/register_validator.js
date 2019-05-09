document.addEventListener('DOMContentLoaded', start);
///мне нихуя не нравится что мы не используем функции из валидации в авторизации, но пох

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

    email.addEventListener('input', event => {
        if (email.validity.valid) {
                hideError(emailError)
            }
            else {
                showError(emailError,'Я же просил ввести емейл. Не зли меня')
            }
        },
        false
    );

    password.addEventListener('input', event => {
        if(password.validity.valid) {
            hideError(passwordError)

            if (password.value == repassword.value) {
                hideError(repasswordError)
            }
            else {
                showError(repasswordError, 'Пароли не совпадают. Ты пидр')
            }
        }
        else {
            showError(passwordError, 'Пароль должен быть больше 5 символов')
        }
    })


    login.addEventListener('input', event => {
        if(login.validity.valid) {
            hideError(loginError)
        }
        else {
            showError(loginError,'Логин больше 3 символов')
        }
    })

    repassword.addEventListener('input', event => {
        if(repassword.validity.valid) {
            hideError(repasswordError)

            if (password.value == repassword.value) {
                hideError(repasswordError)
            }
            else {
                showError(repasswordError,'Пароли не совпадают. Ты пидр')
            }
        }
        else {
            showError(repasswordError,'Пароль должен быть больше 5 символов')

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
