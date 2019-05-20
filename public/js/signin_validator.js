const validators = { ////неприемлимо
    strEmailError:  'Я же просил ввести емейл. Не зли меня',
    strPasswordError: 'Пароль должен быть больше 5 символов',
    strEventEmailError: 'Вводи почту правильно',
    strRepasswordError: 'Пароли не совпадают.',
    strLoginError: 'Логин должен быть больше 3 символов'
}

document.addEventListener('DOMContentLoaded', start);

function start() {
    var email = document.querySelector('#email');
    var emailError = document.querySelector('.emailError');
    var passwordError = document.querySelector('.passwordError');
    var password = document.querySelector('#password')
    
    function showError(spanError, str) {
        spanError.innerHTML = str;
        spanError.className = 'error active';
    }

    function hideError(spanError) {
        spanError.innerHTML = '';
        spanError.className = 'error';
    }

    function checkValidation(widget, errorSpan, strError) {
        if (widget.validity.valid) {
            hideError(errorSpan)
        }
        else {
            showError(errorSpan, strError)
        }
    }
    
    email.addEventListener('input', () => {
        checkValidation(email, emailError, validators.strEmailError)
    });

    password.addEventListener('input', () => {
        checkValidation(password, passwordError, validators.strPasswordError)
    })

    document.addEventListener('submit', event => {
            if (!email.validity.valid && !password.validity.valid) {
                showError(emailError, validators.strEventEmailError)
                event.preventDefault();
            }
            else { // валидация на фронте пройдена, делаем запрос к серверу и смотрим на его ответ
                const options = { method: "post", 
                    body: { 
                        "email": email.value,
                        "password": password.value
                    } 
                }
                fetch("/sign_In", options).then( value => {
                    console.log("Ответ вернулся к сане " +value) //ничего не возвращется
                }).catch(err, value => {
                    console.log("Ошибка вернулась к сане " +err)
                    console.log(value)

                })

            }
        },
        false
    );
}
