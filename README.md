<h1> Процент готовности проекта </h1>

<h2> 1.2% </h2>

npm install 

<p>Если ты пришел и не понимаешь что тут происходит, я тебе расскажу хотя бы про структуру проекта

<h3> /config </h3>
<h4>Настройки базы данных </h4>
<p>Рекомендую создать такой же аккаунт с таким же логином и паролем

<h3>/routes</h3>
<h4>Маршрутизация </h4>
<p>Реализовано пока всего-лишь несколько переходов по сайту

<h3>/controllers</h3>
<h4>Работа с регистрацией юзера </h4>
<p> Файл, который должен соединяться с таблицей юзеров в БД и проверять на соответствие поля

<h3>/services</h3>
<h4>Непосредственная валидация на стороне сервера</h4>

<h3>/public</h3>
<h4>Лицо сайта </h4>
<p>Ой, там нет html файлов. Возможно, я к ним еще вернусь, но не сегодня. Там лежат стили, картинки и фронтендовые скрипты вроде валидации ввода

<h3>/views</h3>
<h4>Предтрансляционные html файлы </h4>
<p>Файлы pug(мопс ахах) браузер транслирует в html файлы. 

<h3>/views/modules </h3>
<h4>Элементы сайта, которые должны отображаться больше, чем на одной странице.</h4>
<p>Чтобы не копировать код(dry ofc), мы создаем отельный файлик, который инклудим с требуемой страницы. Конечно же, для наших файлов-модулей необходим и стайл модуль, поэтому кидаем такие же модульные стили в /public/css/modules

<h3>/models, /migrations, /seeders</h3>
<h4>Работа с БД</h4>
<p>Cоздаем юзера SqlDbg с паролем 1234. Мне пох, что это в открытом доступе. Команды для справки:
<p>http://docs.sequelizejs.com/manual/migrations.html
<p> Пока чет не робит миграция 

<h3>/bin</h3>
<p>Есть идея создать там точку входа, чтобы именно файл www, отвечал за саму инициализацию сервера, как в express-generator


<p>Теперь, если ты сделал что-то, и не смог исправить ошибку, или просто нашел баг в работе и не смог сразу поправить, возможно, стоит создать issue с этой ошибкой, чтобы она мозолила глаза и кто-нибудь(хм) ее пофиксил

