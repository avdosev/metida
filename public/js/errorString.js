
const headers = { 
    strHeaderError: 'Заголовок должен быть длиннее', 
    strDisclaimerError: 'Дисклеймер должен быть длиннее', 
    strContentError: 'Контент должен быть длиннее', 

    strEventHeaderError: 'Тебе не стыдно?',  //ивенты происходят после непройденной валидации после клика по кнопке отправить
    strDisclaimerEventError: 'Почему ты такой немногословный?',
    strContentEventError: 'Все совсем плохо? Напиши мне на почту, побеседуем',

    headerRegExp: new RegExp('.{10,}'), //это должно конечно же повторяться в хтмл файле для css изменений
    disclaimerRegExp: new RegExp('.{10,}'),
    conentRegExp: new RegExp('.{10,}')
}

const users = { 
    strEmailError: 'Проверьте правильность введенного e-mail', 
    strPasswordError: 'Пароль должен содержать более 5 символов', 
    strRepasswordError: 'Введенные пароли не совпадают', 
    strLoginError: 'Логин должен состоять более чем из 3 символов',

    strEventEmailError: 'Вводи почту правильно', 
    
    emailRegExp: new RegExp('.+@.+\\..+'),
    passwordRegExp: new RegExp('.{5,}'),
    loginRegExp: new RegExp('.{3,}')
}


const comment = { 
    commentError: "Коммент уж слишком маленький. Прям как ...",
    commentEventError: "Коммент не удовлетворяет требованиям",
    commentRegExp: new RegExp("^.{6,}")
}

export { users, headers, comment }
