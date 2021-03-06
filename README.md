# Процент готовности проекта

## 69.9%

## Развертка


#### Развертка на Windows машине

Для установки всех пакетов и запуска сервера:

Команды терминала клиента:

    cd client
    yarn install
    yarn start
    
Команды терминала сервера:

    cd application
    yarn install
    yarn start

Команды MySQL Command Line:

    create database usersDB2; 
    create user 'metidaSQL'@'localhost' identified with mysql_native_password by '123456';
    grant all privileges on usersDB2.* to 'metidaSQL'@'localhost';

Сделать бекап БД:

    mysqldump -h HOST -u USERNAME -pPASSWORD DATABASE > backup.sql
    mysql -u root -p usersDB2 < backup.sql


Пароль написан слитно, это не ошибка

Таблицы и поля в ней создадутся автоматически

#### Развертка на Heroku

Разворачивается автоматически при пуше в мастер

## Metida API

Основная [WIKI](https://github.com/avdosev/metida/wiki/Server-API) по API метиды)

Наш сервер имеет уникальное многофункциональное, удобное и не продуманное апи, [тут](https://github.com/avdosev/metida/wiki/Server-API) можно чекнуть, что ретюрнят основные методы и что нужно для их нормальной работы. Удачного знакомства с апи.

## Npm команды сервера

    npm run inspect:lint

Позволяет пройтись по всем джс файлам, и вывести все предупреждения линтера
    
    npm run lintFixWarnings

Попытается автоматически исправить ошибки, выведенные командной выше

    npm run inspect:mocha

Наши тесты

    npm run inspect:allConcurency

Все тесты вместе выполнить в многопотоке 

    npm run inspect:all

Все тесты выполнить вместе 

## Код стайл

<p> Да, возможно, не всем нравится за ним следить, но это важно, т.к. проект развивается, и становится все больше и больше (на момент написания было окло 3-3.5к строк), за этим достаточно тяжело следить так, что хотя бы код стайл должен быть плюс-минус одинаковым
<p> Венгерской нотации я думаю смысла придерживаться нет (хотя это топово особенно для жабкаскрипт), но есть минимальный набор:

1. отступы: 4 пробела
1. отступы от комментов один пробел: /* вот так */ или // вот так 
2. название файлов и папок(сиротам не понять) в змеином стайле: вот_так.файл
3. в то время как весь код в верблюжьем стайле: слышьЯВызываюПокемона()
4. функции должны быть с максимально понятным названием 


Теперь, если ты сделал что-то, и не смог исправить ошибку, или просто нашел баг в работе и не смог сразу поправить, возможно, стоит создать issue с этой ошибкой, чтобы она мозолила глаза и кто-нибудь(хм) ее пофиксил

## Хочу помочь проекту, но не знаю как

* ~~задавать вопросы админу~~
* чекнуть вкладку проджектс на гитхабе и увидить что нужно и над чем идет работа 
* чекнуть [wiki](https://github.com/avdosev/metida/wiki/) со всем необходимым

## FAQ

Я хочу забить таблицу рандомными значениями

    npx sequelize-cli db:seed:all

### MySQL error

Обновились поля в БД и у тебя интерпретатор выдает что-то вроде:

    Error: Unknown column 'puk' in 'field list'

#### Варианты решения проблемы на локалке:
    
1. Добавь новый столбец в локальную БД с соблюдением типов:

        ALTER TABLE <db>.<table> ADD COLUMN <puk> <type> (<size>)

1. Для этого были придуманы миграции

        npx sequelize db:migrate

    > Миграцию необходимо для этого написать, очевидно

#### Что же делать на Heroku?
1. Только миграции, см heroku

### Nodemailer errors
#### Ошибка портов
    { [Error: connect ECONNREFUSED]
    code: 'ECONNREFUSED',
    errno: 'ECONNREFUSED',
    syscall: 'connect' }

  Проверь настроки файрволла

#### Ошибка хз
    Please\n534-5.7.14 log in via your web browser and then try again.\n534-5.7.14  Learn more at\n534 5.7.14  https://support.google.com/mail/answer/78754 h123sm9284819qkf.5 - gsmtp',
    responseCode: 534,
    command: 'AUTH PLAIN' }

Не решено

### Heroku 
#### App problem    
    »   Error: Missing required flag:
    »     -a, --app APP  app to run command against
    »   See more help with --help

Указать `-a metida`

#### Heroku migrations

    Команда для миграции


## Наша команда 

### Фулстек разработчики
<a href="https://github.com/avdosev"><img src="https://avatars0.githubusercontent.com/u/39769345?s=460&v=4" alt="avdosev" width="50" height="50"> </a>
<a href="https://github.com/Sapfir0"> <img src="https://avatars0.githubusercontent.com/u/37454791?s=460&v=4" alt="Sapfir0" width="50" height="50"> </a>

### Верстка и дизайн
<a href="https://github.com/Kolyamba-mamba"><img src="https://avatars0.githubusercontent.com/u/36818700?s=460&v=4" alt="Kolyamba-mamba" width="50" height="50"> </a>

### QA
<a href="https://github.com/tankistqazwsx"><img src="https://avatars0.githubusercontent.com/u/10173245?s=460&v=4" alt="tankistqazwsx" width="50" height="50"> </a>

### Благодарности
<a href="https://github.com/unterumarmung"><img src="https://avatars0.githubusercontent.com/u/39276703?s=460&u=d185412c39977cc3144135eba1c1d5c26ddc0580&v=4" alt="unterumarmung" width="50" height="50"> </a>

