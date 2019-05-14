# Процент готовности проекта

## 25.6%

### CI

>когда некит добавит для своего репа поддержку, надо изменить ссылку ниже

[![Build Status](https://travis-ci.com/Sapfir0/metida.svg?branch=master)](https://travis-ci.com/Sapfir0/metida)

We use travis CI, someday we can use [our](https://github.com/Sapfir0/pyCI) service.


### Развертка на linux машине

Есть [небольшой](https://github.com/Sapfir0/scriptForOurLife/tree/master/deploymentMetida) скрипт, поднимающий сервер на unix)

### Развертка на Windows машине

Для установки всех пакетов и запуска сервера:

Команды терминала:

    npm i
    npm start

Команды MySQL Command Line:

    create database usersDB2; 
    create user 'metidaSQL'@'localhost' identified with mysql_native_password by '123456';
    grant all privileges on usersDB2.* to 'metidaSQL'@'localhost';

Таблицы и поля в ней создадутся автоматически

## Metida API

наш сервер имеет уникальное многофункциональное удобное и не продуманное апи ниже можно чекнуть что ретюрнят основные методы и что нужно для их нормальной работы
#### get
1. /post/:id/ - сформированную статью (html, в будущем возможен json)
1. /post/:id/non_parsed - Не сформированная статья в json
1. /post/:id/comments - json массив внутри которого все комментарии в отсортированном по дате порядке
1. /public/:filefolder/:filename - файл лежаший на сервере css/js/img/json предназначеный для общего пользования
1. /top - определенное количество статей в заданом порядке и количестве

other : получаете сгенерированный html

#### post 
1. /createArticle - создается запись к бд на вход статья. Для отправки требуется регистрация юзера
1. /post/:id/pushComment - вкидывание коммента, если answeringId не задан или равен null то считается что это ответ на статью в противном случае на комментарий
1. /register - аналогично следующему
1. /signin - аналогично предыдущему

## Код стайл

<p> Да, возможно, не всем нравится за ним следить, но это важно, т.к. проект развивается, и становится все больше и больше (на момент написания было окло 1-1.5к строк), за этим достаточно тяжело следить так, что хотя бы код стайл должен быть плюс-минус одинаковым
<p> Венгерской нотации я думаю смысла придерживаться нет (хотя это топово особенно для жабкаскрипт), но есть минимальный набор:

1. отступы: 4 пробела
1. отступы от комментов один пробел: /* вот так */ или // вот так 
2. название файлов и папок(сиротам не понять) в змеином стайле: вот_так.файл
3. в то время как весь код в верблюжьем стайле: слышьЯВызываюПокемона()
4. функции должны быть с максимально понятным названием 


Теперь, если ты сделал что-то, и не смог исправить ошибку, или просто нашел баг в работе и не смог сразу поправить, возможно, стоит создать issue с этой ошибкой, чтобы она мозолила глаза и кто-нибудь(хм) ее пофиксил

## FAQ

### MySql error

Если обновились поля в БД и у тебя интерпретатор выдает что-то вроде:

    Error: Unknown column 'puk' in 'field list'

, то тогда, либо добавь новый столбец в локальную БД с соблюдением типов, либо очисти ее
    
    drop table usersDB2.pukTable;  

### Nodemailer MySql error

    { [Error: connect ECONNREFUSED]
    code: 'ECONNREFUSED',
    errno: 'ECONNREFUSED',
    syscall: 'connect' }

Это проблема файрвола, фикси сам



## Структура проекта

Если ты пришел и не понимаешь что тут происходит, я тебе расскажу хотя бы про структуру проекта

### /config

#### Настройки базы данных

Рекомендую создать такой же аккаунт с таким же логином и паролем(см выше)

### /routes

#### Маршрутизация

Реализовано пока всего-лишь несколько переходов по сайту.

### /controllers

#### Работа с регистрацией юзера

Файл, который должен соединяться с таблицей юзеров в БД и проверять на соответствие поля

### /services

#### Непосредственная валидация на стороне сервера

### /public

#### Лицо сайта

Ой, там нет html файлов. Возможно, я к ним еще вернусь, но не сегодня. Там лежат стили, картинки и фронтендовые скрипты вроде валидации ввода

### /views

#### Предтрансляционные html файлы

Файлы pug(мопс ахах) браузер транслирует в html файлы. Надо перейти на реакт

### /views/modules

#### Элементы сайта, которые должны отображаться больше, чем на одной странице.

Чтобы не копировать код(dry ofc), мы создаем отельный файлик, который инклудим с требуемой страницы. Конечно же, для наших файлов-модулей необходим и стайл модуль, поэтому кидаем такие же модульные стили в /public/css/modules

### Docker

Это контейнер ![](https://im0-tub-ru.yandex.net/i?id=9c8143a2c07d5d1b78dbad9b2567a6ae-l&n=13)

Создание контейнера

    docker build .
    docker images
    docker run  
